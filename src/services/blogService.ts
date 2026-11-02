import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { blogPosts as defaultBlogPosts } from '../data/blogData';
import type { BlogPost } from '../data/blogData';

export { defaultBlogPosts };

const STORAGE_KEY = 'tsc_blog_database';

export const blogService = {
  // Local storage fallback
  getPostsLocal: (): BlogPost[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return defaultBlogPosts;
      const parsed: BlogPost[] = JSON.parse(data);
      return parsed.length > 0 ? parsed : defaultBlogPosts;
    } catch (e) {
      return defaultBlogPosts;
    }
  },

  // Subscribe to real-time changes
  subscribe: (callback: (posts: BlogPost[]) => void): (() => void) => {
    // Deliver local posts immediately so the page is NEVER blank
    const localPosts = blogService.getPostsLocal();
    callback(localPosts);

    if (db) {
      const unsubscribe = onSnapshot(collection(db, 'blog_posts'), (snapshot) => {
        let posts = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as BlogPost));
        
        // If Firestore is empty, use defaults and save them to Firestore
        if (posts.length === 0) {
          posts = defaultBlogPosts;
          defaultBlogPosts.forEach(p => {
             setDoc(doc(db!, 'blog_posts', p.id), p).catch(() => {});
          });
        }
        
        // Simple sort by date (descending) based on JS date parsing of the string
        posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        callback(posts);
      }, (error) => {
        console.warn("Firestore blog subscription fallback to local:", error);
        callback(blogService.getPostsLocal());
      });
      return unsubscribe;
    } else {
      const update = () => callback(blogService.getPostsLocal());
      window.addEventListener('tsc_blog_updated', update);
      update();
      return () => window.removeEventListener('tsc_blog_updated', update);
    }
  },

  savePost: async (post: BlogPost): Promise<BlogPost> => {
    if (db) {
      try {
        await setDoc(doc(db!, 'blog_posts', post.id), post);
      } catch (e) {
        console.error("Error saving blog to Firestore", e);
      }
    } else {
      const posts = blogService.getPostsLocal();
      const existingIdx = posts.findIndex(p => p.id === post.id);
      if (existingIdx >= 0) {
        posts[existingIdx] = post;
      } else {
        posts.unshift(post);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      window.dispatchEvent(new Event('tsc_blog_updated'));
    }
    return post;
  },

  deletePost: async (id: string): Promise<void> => {
    if (db) {
      await deleteDoc(doc(db!, 'blog_posts', id));
    } else {
      const posts = blogService.getPostsLocal();
      const filtered = posts.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new Event('tsc_blog_updated'));
    }
  }
};
