import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
  const { lang } = useApp();
  const isAr = lang === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F4EE] dark:bg-[#121212] pt-24 pb-16 text-[#1E1E1E] dark:text-white transition-colors duration-300">
      <div className="container-custom max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="text-[#A78BFA] font-bold hover:underline">
            {isAr ? '← العودة للرئيسية' : '← Back to Home'}
          </Link>
        </div>
        
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#A78BFA] to-[#FF8FB1] flex items-center justify-center text-white shadow-lg">
            <CheckCircle size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black">
            {isAr ? 'شروط الاستخدام' : 'Terms of Service'}
          </h1>
        </div>

        <div className="bg-white dark:bg-[#1A1A1A] p-8 md:p-12 rounded-[2rem] shadow-xl border border-[#1E1E1E]/5 dark:border-white/5 space-y-8 text-sm md:text-base leading-relaxed">
          {isAr ? (
            <>
              <p className="font-bold text-[#A78BFA]">آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</p>
              <section>
                <h2 className="text-2xl font-black mb-4">1. القبول بالشروط</h2>
                <p>باستخدامك لموقع "The Social Club" أو التعاقد معنا لتقديم خدمات تسويقية، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، يُرجى عدم استخدام موقعنا.</p>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">2. الخدمات المقدمة</h2>
                <p>نحن وكالة نمو رقمي نقدم خدمات (التسويق الإلكتروني، تطوير الويب، جلب العملاء المحتملين). تخضع كافة اتفاقيات العمل والمشاريع لعقود منفصلة تحدد النطاق الزمني والتكلفة بشكل مفصل.</p>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">3. حقوق الملكية الفكرية</h2>
                <p>جميع المحتويات الموجودة على هذا الموقع (النصوص، التصاميم، الشعارات، الصور) هي ملك لـ "The Social Club" ولا يجوز نسخها أو استخدامها دون إذن كتابي مسبق.</p>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">4. إخلاء المسؤولية</h2>
                <p>نحن نبذل قصارى جهدنا لتقديم أفضل النتائج التسويقية، ولكننا لا نضمن عوائد استثمار محددة (ROI) حيث تخضع النتائج لمتغيرات السوق والمنافسة.</p>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">5. التعديلات</h2>
                <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر التغييرات على هذه الصفحة وتصبح سارية المفعول فور نشرها.</p>
              </section>
            </>
          ) : (
            <>
              <p className="font-bold text-[#A78BFA]">Last Updated: {new Date().toLocaleDateString('en-US')}</p>
              <section>
                <h2 className="text-2xl font-black mb-4">1. Acceptance of Terms</h2>
                <p>By accessing or using the "The Social Club" website or engaging our marketing services, you agree to be bound by these Terms of Service. If you do not agree to any part of these terms, please do not use our website.</p>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">2. Services Provided</h2>
                <p>We are a digital growth agency offering services such as digital marketing, web development, and lead generation. All business engagements are subject to separate proposals outlining scope, timeline, and cost.</p>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">3. Intellectual Property Rights</h2>
                <p>All content on this website (text, designs, logos, images) is the property of "The Social Club" and may not be copied or used without prior written permission.</p>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">4. Disclaimer</h2>
                <p>We strive to deliver the best possible marketing results, but we do not guarantee specific returns on investment (ROI) as results are subject to market variables and competition.</p>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">5. Modifications</h2>
                <p>We reserve the right to modify these terms at any time. Changes will be posted on this page and are effective immediately upon posting.</p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terms;
