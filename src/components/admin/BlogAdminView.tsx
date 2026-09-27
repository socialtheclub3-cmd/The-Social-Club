import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';
import { blogService } from '../../services/blogService';
import type { BlogPost } from '../../data/blogData';

interface BlogAdminViewProps {
  isAr: boolean;
}

const emptyPost: BlogPost = {
  id: '',
  title: '',
  titleAr: '',
  excerpt: '',
  excerptAr: '',
  content: '',
  contentAr: '',
  category: 'Marketing',
  categoryAr: 'تسويق',
  author: 'The Social Club',
  authorAr: 'ذا سوشيال كلوب',
  date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  dateAr: new Date().toLocaleDateString('ar-EG', { month: 'long', day: 'numeric', year: 'numeric' }),
  image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=800'
};

const BlogAdminView: React.FC<BlogAdminViewProps> = ({ isAr }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const unsubscribe = blogService.subscribe((data) => setPosts(data));
    return () => unsubscribe();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    
    // Auto-generate ID if empty
    let postToSave = { ...editingPost };
    if (!postToSave.id) {
      postToSave.id = postToSave.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      if (!postToSave.id) postToSave.id = `post-${Date.now()}`;
    }

    await blogService.savePost(postToSave);
    setEditingPost(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(isAr ? 'هل أنت متأكد من حذف المقال؟' : 'Are you sure you want to delete this post?')) {
      await blogService.deletePost(id);
    }
  };

  if (editingPost) {
    return (
      <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-3xl border border-[#1E1E1E]/8 dark:border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black">{isAr ? 'إضافة / تعديل مقال' : 'Add / Edit Post'}</h2>
          <button 
            onClick={() => setEditingPost(null)}
            className="text-xs font-bold text-gray-500 hover:text-gray-700"
          >
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold mb-2">Title (EN)</label>
              <input 
                required
                type="text" 
                value={editingPost.title}
                onChange={e => setEditingPost({...editingPost, title: e.target.value})}
                className="w-full px-4 py-2 bg-[#F8F4EE] dark:bg-[#111] rounded-xl border border-transparent focus:border-[#A78BFA] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-2">العنوان (AR)</label>
              <input 
                required
                type="text" 
                value={editingPost.titleAr}
                onChange={e => setEditingPost({...editingPost, titleAr: e.target.value})}
                className="w-full px-4 py-2 bg-[#F8F4EE] dark:bg-[#111] rounded-xl border border-transparent focus:border-[#A78BFA] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-2">Excerpt (EN)</label>
              <textarea 
                required
                value={editingPost.excerpt}
                onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})}
                className="w-full px-4 py-2 bg-[#F8F4EE] dark:bg-[#111] rounded-xl border border-transparent focus:border-[#A78BFA] outline-none h-20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-2">النبذة (AR)</label>
              <textarea 
                required
                value={editingPost.excerptAr}
                onChange={e => setEditingPost({...editingPost, excerptAr: e.target.value})}
                className="w-full px-4 py-2 bg-[#F8F4EE] dark:bg-[#111] rounded-xl border border-transparent focus:border-[#A78BFA] outline-none h-20"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-bold mb-2">Cover Image URL</label>
              <input 
                required
                type="text" 
                value={editingPost.image}
                onChange={e => setEditingPost({...editingPost, image: e.target.value})}
                className="w-full px-4 py-2 bg-[#F8F4EE] dark:bg-[#111] rounded-xl border border-transparent focus:border-[#A78BFA] outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold mb-2">Content (EN) - Use Markdown (### for titles)</label>
              <textarea 
                required
                value={editingPost.content}
                onChange={e => setEditingPost({...editingPost, content: e.target.value})}
                className="w-full px-4 py-2 bg-[#F8F4EE] dark:bg-[#111] rounded-xl border border-transparent focus:border-[#A78BFA] outline-none h-48"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-bold mb-2">المحتوى (AR) - استخدم Markdown</label>
              <textarea 
                required
                value={editingPost.contentAr}
                onChange={e => setEditingPost({...editingPost, contentAr: e.target.value})}
                className="w-full px-4 py-2 bg-[#F8F4EE] dark:bg-[#111] rounded-xl border border-transparent focus:border-[#A78BFA] outline-none h-48"
              />
            </div>
          </div>
          
          <button type="submit" className="px-6 py-3 bg-[#A78BFA] text-[#1E1E1E] font-bold rounded-xl shadow-lg">
            {isAr ? 'حفظ المقال' : 'Save Post'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl border border-[#1E1E1E]/8 dark:border-white/10 overflow-hidden shadow-xs p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-black">{isAr ? 'إدارة المدونة' : 'Blog Management'}</h2>
          <p className="text-sm text-[#1E1E1E]/60 dark:text-white/60">{isAr ? 'إضافة وتعديل مقالات المدونة' : 'Add and manage blog posts'}</p>
        </div>
        <button
          onClick={() => setEditingPost(emptyPost)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#A78BFA] text-[#1E1E1E] font-bold shadow-sm hover:scale-105 transition-all"
        >
          <PlusCircle size={16} />
          <span>{isAr ? 'مقال جديد' : 'New Post'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map(post => (
          <div key={post.id} className="flex gap-4 p-4 bg-[#F8F4EE] dark:bg-[#111] rounded-2xl border border-[#1E1E1E]/5 dark:border-white/5">
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-bold text-sm line-clamp-2 mb-1">{isAr ? post.titleAr : post.title}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1"><FileText size={12}/> {isAr ? post.categoryAr : post.category}</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button 
                  onClick={() => setEditingPost(post)}
                  className="px-3 py-1.5 bg-[#1E1E1E]/10 dark:bg-white/10 rounded-lg text-xs font-bold hover:bg-[#A78BFA] hover:text-[#1E1E1E]"
                >
                  {isAr ? 'تعديل' : 'Edit'}
                </button>
                <button 
                  onClick={() => handleDelete(post.id)}
                  className="px-3 py-1.5 text-rose-500 bg-rose-500/10 rounded-lg text-xs font-bold hover:bg-rose-500 hover:text-white"
                >
                  {isAr ? 'حذف' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogAdminView;
