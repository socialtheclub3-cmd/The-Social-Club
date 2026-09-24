import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
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
            <Shield size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black">
            {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
        </div>

        <div className="bg-white dark:bg-[#1A1A1A] p-8 md:p-12 rounded-[2rem] shadow-xl border border-[#1E1E1E]/5 dark:border-white/5 space-y-8 text-sm md:text-base leading-relaxed">
          {isAr ? (
            <>
              <p className="font-bold text-[#A78BFA]">آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</p>
              <section>
                <h2 className="text-2xl font-black mb-4">1. مقدمة</h2>
                <p>نحن في "The Social Club" نلتزم بحماية خصوصيتك وبياناتك الشخصية. توضح هذه السياسة كيف نقوم بجمع واستخدام وحماية معلوماتك عند استخدام موقعنا وخدماتنا.</p>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">2. المعلومات التي نجمعها</h2>
                <p>قد نقوم بجمع البيانات التالية:</p>
                <ul className="list-disc list-inside mt-2 space-y-2 opacity-80">
                  <li>الاسم ومعلومات الاتصال (البريد الإلكتروني، رقم الهاتف).</li>
                  <li>معلومات حول شركتك وميزانيتك التسويقية.</li>
                  <li>بيانات الاستخدام وملفات تعريف الارتباط (Cookies) لتحسين تجربتك.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">3. كيف نستخدم معلوماتك</h2>
                <p>نستخدم هذه البيانات للأغراض التالية:</p>
                <ul className="list-disc list-inside mt-2 space-y-2 opacity-80">
                  <li>التواصل معك لتقديم خدماتنا الاستشارية والتسويقية.</li>
                  <li>تحسين تجربة المستخدم على موقعنا.</li>
                  <li>إرسال تحديثات أو عروض ترويجية (إذا وافقت على ذلك).</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">4. أمن البيانات</h2>
                <p>نتخذ إجراءات أمنية صارمة وتشفير متقدم لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التسريب. لا نقوم ببيع أو مشاركة بياناتك مع أي طرف ثالث لأغراض تجارية دون موافقتك.</p>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">5. تواصل معنا</h2>
                <p>إذا كانت لديك أي أسئلة حول سياسة الخصوصية، يمكنك التواصل معنا عبر: <br/>
                <a href="mailto:socialtheclub.3@gmail.com" className="text-[#A78BFA] font-bold">socialtheclub.3@gmail.com</a></p>
              </section>
            </>
          ) : (
            <>
              <p className="font-bold text-[#A78BFA]">Last Updated: {new Date().toLocaleDateString('en-US')}</p>
              <section>
                <h2 className="text-2xl font-black mb-4">1. Introduction</h2>
                <p>At "The Social Club", we are committed to protecting your privacy and personal data. This policy explains how we collect, use, and protect your information when you use our website and services.</p>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">2. Information We Collect</h2>
                <p>We may collect the following data:</p>
                <ul className="list-disc list-inside mt-2 space-y-2 opacity-80">
                  <li>Name and contact information (Email, Phone Number).</li>
                  <li>Information about your company and marketing budget.</li>
                  <li>Usage data and cookies to improve your experience.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">3. How We Use Your Information</h2>
                <p>We use this data for the following purposes:</p>
                <ul className="list-disc list-inside mt-2 space-y-2 opacity-80">
                  <li>Communicating with you to provide our consulting and marketing services.</li>
                  <li>Improving the user experience on our website.</li>
                  <li>Sending updates or promotional offers (if you opted in).</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">4. Data Security</h2>
                <p>We take strict security measures and advanced encryption to protect your personal information from unauthorized access or disclosure. We do not sell or share your data with third parties for commercial purposes without your consent.</p>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">5. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at: <br/>
                <a href="mailto:socialtheclub.3@gmail.com" className="text-[#A78BFA] font-bold">socialtheclub.3@gmail.com</a></p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Privacy;
