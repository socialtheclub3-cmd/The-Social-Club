import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AnimatedSection from '../components/ui/AnimatedSection';
import { blogService } from '../services/blogService';
import type { BlogPost } from '../data/blogData';
import SEO from '../components/SEO';

import { defaultBlogPosts } from '../services/blogService';

const Blog: React.FC = () => {
  const { lang } = useApp();
  const isAr = lang === 'ar';
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const local = blogService.getPostsLocal();
    return local && local.length > 0 ? local : defaultBlogPosts;
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const unsubscribe = blogService.subscribe((data) => {
      if (data && data.length > 0) {
        setPosts(data);
      } else {
        setPosts(defaultBlogPosts);
      }
    });
    return () => unsubscribe();
  }, []);

  const displayList = posts && posts.length > 0 ? posts : defaultBlogPosts;

  const categories = [
    { id: 'all', labelAr: 'جميع المقالات', labelEn: 'All Articles' },
    { id: 'Paid Advertising', labelAr: 'إعلانات مدفوعة', labelEn: 'Paid Advertising' },
    { id: 'Web Development', labelAr: 'تطوير الويب', labelEn: 'Web Development' },
    { id: 'Growth Analytics', labelAr: 'تحليلات النمو', labelEn: 'Growth Analytics' },
  ];

  const filteredPosts = selectedCategory === 'all'
    ? displayList
    : displayList.filter(
        (p) => p.category === selectedCategory || p.categoryAr === selectedCategory
      );

  return (
    <div className="pt-24 min-h-screen bg-[#FBF6EF] dark:bg-[#121212] transition-colors duration-300">
      <SEO title="Blog & Insights" description="Latest marketing insights, tips, and growth strategies from The Social Club." />
      {/* Header */}
      <section className="pt-16 pb-12 overflow-hidden">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-xs font-black uppercase tracking-widest text-[#A78BFA] mb-3">
              {isAr ? 'المركز المعرفي ودراسات الأداء' : 'KNOWLEDGE HUB & STRATEGY'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1E1E1E] dark:text-white mb-6 leading-tight">
              {isAr ? 'أحدث الرؤى والأفكار' : 'Insights & Resources'}
            </h1>
            <p className="text-[#1E1E1E]/70 dark:text-white/70 text-lg leading-relaxed mb-8">
              {isAr
                ? 'استراتيجيات عملية، تحليلات للأداء، ونصائح مجربة لمساعدتك في خفض تكلفة العميل ومضاعفة عوائد إعلاناتك.'
                : 'Actionable frameworks, CAC reduction playbooks, and conversion teardowns to help you scale profitably.'}
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#1E1E1E] text-white dark:bg-white dark:text-[#121212] shadow-md scale-105'
                      : 'bg-white/80 dark:bg-[#1E1E1E]/80 text-[#1E1E1E]/70 dark:text-white/70 hover:bg-white dark:hover:bg-[#252525] border border-[#1E1E1E]/5 dark:border-white/5'
                  }`}
                >
                  {isAr ? cat.labelAr : cat.labelEn}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredPosts.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 100}>
                <Link
                  to={`/blog/${post.id}`}
                  className="group block rounded-3xl overflow-hidden bg-white dark:bg-[#1C1C1C] border border-[#1E1E1E]/8 dark:border-white/10 card-lift h-full flex flex-col shadow-sm"
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

                    <h2 className="text-xl md:text-2xl font-black text-[#1E1E1E] dark:text-white mb-3 group-hover:text-[#A78BFA] transition-colors leading-snug">
                      {isAr ? post.titleAr : post.title}
                    </h2>
                    
                    <p className="text-sm text-[#1E1E1E]/70 dark:text-white/70 leading-relaxed flex-1">
                      {isAr ? post.excerptAr : post.excerpt}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#A78BFA] group-hover:gap-3 transition-all">
                      {isAr ? 'اقرأ المقال كاملاً' : 'Read Full Guide'}
                      <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {/* Bottom Blog CTA Banner */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1E1E1E] to-[#2E2E2E] dark:from-[#161616] dark:to-[#222] text-white text-center border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="text-xs font-black uppercase tracking-widest text-[#A78BFA] block mb-2">
                {isAr ? 'هل تريد تطبيق هذه الاستراتيجيات في مشروعك؟' : 'Ready to implement this for your brand?'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mb-4">
                {isAr
                  ? 'دعنا نبني لك المنظومة التي تحول هذه الأفكار إلى أرباح حقيقية'
                  : 'Let us engineer the custom funnel that turns attention into recurring profit.'}
              </h3>
              <p className="text-sm text-white/70 mb-8 leading-relaxed">
                {isAr
                  ? 'احجز مكالمة استكشاف وتدقيق مجانية مدتها 30 دقيقة لمراجعة حسابك الإعلاني وموقعك الحالي وتحديد فرص النمو المباشرة.'
                  : 'Book a free 30-min growth audit to analyze your ad accounts, checkout flow, and uncover immediate scaling opportunities.'}
              </p>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#A78BFA] hover:bg-[#906fe7] text-[#1E1E1E] font-black text-sm transition-all hover:scale-105 shadow-lg shadow-[#A78BFA]/30"
              >
                <span>{isAr ? 'احجز مكالمة الاستكشاف المجانية ←' : 'Claim Your Free Audit →'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
