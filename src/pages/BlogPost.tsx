import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { blogService } from '../services/blogService';
import type { BlogPost as BlogPostType } from '../data/blogData';
import AnimatedSection from '../components/ui/AnimatedSection';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { lang } = useApp();
  const navigate = useNavigate();
  const isAr = lang === 'ar';
  
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = blogService.subscribe((posts) => {
      const found = posts.find((p) => p.id === id);
      if (found) {
        setPost(found);
      } else {
        navigate('/blog');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id, navigate]);

  if (loading) return <div className="min-h-screen bg-[#FBF6EF] dark:bg-[#121212]" />;
  if (!post) return null;

  return (
    <div className="pt-24 min-h-screen bg-[#FBF6EF] dark:bg-[#121212] transition-colors duration-300">
      <article className="pb-20">
        {/* Header Image & Meta */}
        <div className="container-custom">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1E1E1E]/60 dark:text-white/60 hover:text-[#A78BFA] dark:hover:text-[#A78BFA] transition-colors mb-8"
          >
            <ArrowLeft size={16} className={isAr ? 'rotate-180' : ''} />
            {isAr ? 'العودة للمدونة' : 'Back to Blog'}
          </Link>

          <AnimatedSection className="max-w-4xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A78BFA]/10 text-[#A78BFA] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Tag size={12} />
              {isAr ? post.categoryAr : post.category}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-[#1E1E1E] dark:text-white mb-6 leading-tight">
              {isAr ? post.titleAr : post.title}
            </h1>

            <div className="flex items-center justify-center gap-6 text-xs font-semibold text-[#1E1E1E]/60 dark:text-white/60">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {isAr ? post.dateAr : post.date}
              </span>
              <span className="flex items-center gap-2">
                <User size={16} />
                {isAr ? post.authorAr : post.author}
              </span>
            </div>
          </AnimatedSection>
        </div>

        {/* Featured Image */}
        <AnimatedSection delay={100} className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-12">
          <div className="aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-[#1E1E1E]/5 dark:border-white/5">
            <img 
              src={post.image} 
              alt={isAr ? post.titleAr : post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </AnimatedSection>

        {/* Content */}
        <AnimatedSection delay={200} className="container-custom">
          <div 
            className="max-w-3xl mx-auto prose dark:prose-invert prose-headings:font-black prose-a:text-[#A78BFA] prose-img:rounded-2xl"
            style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left' }}
          >
            {/* Simple markdown parsing for our mock data (replaces ### with h3) */}
            {(isAr ? post.contentAr : post.content).split('\n').map((paragraph, idx) => {
              if (paragraph.trim().startsWith('###')) {
                return <h3 key={idx} className="text-2xl mt-8 mb-4 text-[#1E1E1E] dark:text-white">{paragraph.replace('###', '').trim()}</h3>;
              }
              if (paragraph.trim().length === 0) return null;
              return <p key={idx} className="text-[#1E1E1E]/80 dark:text-white/80 leading-loose mb-6">{paragraph.trim()}</p>;
            })}
          </div>
        </AnimatedSection>
      </article>

      {/* CTA at the bottom of post */}
      <section className="bg-brand-gradient py-16 text-center">
        <div className="container-custom max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            {isAr ? 'هل أنت مستعد لتحقيق نتائج مشابهة؟' : 'Ready to achieve similar results?'}
          </h2>
          <p className="text-white/80 mb-8">
            {isAr 
              ? 'احجز مكالمة استكشافية مجانية لتقييم فرص نمو أعمالك.' 
              : 'Book a free discovery call to evaluate your growth opportunities.'}
          </p>
          <Link 
            to="/#contact"
            className="inline-block px-8 py-4 bg-white text-[#1E1E1E] font-black rounded-xl hover:scale-105 transition-transform"
          >
            {isAr ? 'تواصل معنا' : 'Get in Touch'}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
