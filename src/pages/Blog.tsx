import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AnimatedSection from '../components/ui/AnimatedSection';
import { blogService } from '../services/blogService';
import type { BlogPost } from '../data/blogData';
import SEO from '../components/SEO';

const Blog: React.FC = () => {
  const { lang } = useApp();
  const isAr = lang === 'ar';
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const unsubscribe = blogService.subscribe((data) => setPosts(data));
    return () => unsubscribe();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-[#FBF6EF] dark:bg-[#121212] transition-colors duration-300">
      <SEO title="Blog & Insights" description="Latest marketing insights, tips, and growth strategies from The Social Club." />
      {/* Header */}
      <section className="pt-16 pb-12 overflow-hidden">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1E1E1E] dark:text-white mb-6 leading-tight">
              {isAr ? 'أحدث الرؤى والأفكار' : 'Insights & Resources'}
            </h1>
            <p className="text-[#1E1E1E]/70 dark:text-white/70 text-lg leading-relaxed">
              {isAr
                ? 'استراتيجيات، تحليلات، ودراسات حالة لمساعدتك في مضاعفة أرباحك وتوسيع نطاق أعمالك.'
                : 'Strategies, case studies, and insights to help you scale your business and dominate your market.'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {posts.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 100}>
                <Link
                  to={`/blog/${post.id}`}
                  className="group block rounded-3xl overflow-hidden bg-white dark:bg-[#1C1C1C] border border-[#1E1E1E]/8 dark:border-white/10 card-lift h-full flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={isAr ? post.titleAr : post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                    <span className={`absolute top-4 ${isAr ? 'right-4' : 'left-4'} bg-white/90 dark:bg-[#1E1E1E]/90 backdrop-blur-sm text-[#1E1E1E] dark:text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full`}>
                      {isAr ? post.categoryAr : post.category}
                    </span>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs font-semibold text-[#1E1E1E]/50 dark:text-white/50 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {isAr ? post.dateAr : post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User size={14} />
                        {isAr ? post.authorAr : post.author}
                      </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-black text-[#1E1E1E] dark:text-white mb-3 group-hover:text-[#A78BFA] transition-colors">
                      {isAr ? post.titleAr : post.title}
                    </h2>
                    
                    <p className="text-sm text-[#1E1E1E]/70 dark:text-white/70 leading-relaxed flex-1">
                      {isAr ? post.excerptAr : post.excerpt}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#A78BFA] group-hover:gap-3 transition-all">
                      {isAr ? 'اقرأ المزيد' : 'Read Article'}
                      <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
