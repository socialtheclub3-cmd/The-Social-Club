import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Privacy: React.FC = () => {
  const { lang } = useApp();
  const isAr = lang === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F4EE] dark:bg-[#121212] pt-24 pb-16 text-[#1E1E1E] dark:text-white transition-colors duration-300">
      <SEO title="Privacy Policy" description="Privacy Policy for The Social Club Agency" />
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
                <h2 className="text-2xl font-black mb-4">2. المعلومات وملفات تعريف الارتباط التي نجمعها</h2>
                <p>قد نقوم بجمع البيانات التالية عند تصفحك الموقع أو تقديم طلب استشارة:</p>
                <ul className="list-disc list-inside mt-2 space-y-2 opacity-80">
                  <li><strong>معلومات التواصل المباشرة:</strong> الاسم، البريد الإلكتروني، رقم الهاتف، اسم الشركة، والميزانية المقترحة عند ملء نموذج التواصل.</li>
                  <li><strong>بيانات التحليلات الفنية:</strong> نوع المتصفح، الدولة، والصفحات التي تمت زيارتها عبر ملفات تعريف الارتباط وأدوات التحليل (مثل Google Analytics و Meta Pixel) لفهم مسار التصفح وتحسين تجربة الموقع.</li>
                  <li><strong>بيانات التفضيلات:</strong> العملة المختارة (ج.م، ر.س، د.إ، دولار) واللغة والوضع الليلي المحفوظة محلياً في متصفحك.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">3. كيف نستخدم معلوماتك</h2>
                <p>نستخدم هذه البيانات للأغراض التالية فقط:</p>
                <ul className="list-disc list-inside mt-2 space-y-2 opacity-80">
                  <li>التواصل المباشر معك لتقديم العروض والاستشارات وخطة العمل لمشروعك.</li>
                  <li>تحليل كفاءة وأداء صفحات الموقع وتحسين سرعة التصفح.</li>
                  <li>عدم مشاركة أو بيع بياناتك لأي طرف ثالث لأغراض دعائية خارجية على الإطلاق.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">4. أمن وحماية البيانات</h2>
                <p>نلتزم بحماية بياناتك باستخدام بروتوكول نقل البيانات الآمن المشفر (HTTPS / TLS 1.3) لضمان سرية الاتصال بين متصفحك وخوادمنا. كما يتم حصر الوصول للبيانات الواردة في النماذج على مستشاري النمو وفريق العمل المخول بإدارة حسابك فقط داخل بيئة سحابية آمنة.</p>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">5. تواصل معنا</h2>
                <p>إذا كانت لديك أي أسئلة حول سياسة الخصوصية أو ترغب في تعديل أو حذف بياناتك، تواصل معنا عبر: <br/>
                <a href="mailto:socialtheclub.3@gmail.com" className="text-[#A78BFA] font-bold">socialtheclub.3@gmail.com</a></p>
              </section>
            </>
          ) : (
            <>
              <p className="font-bold text-[#A78BFA]">Last Updated: {new Date().toLocaleDateString('en-US')}</p>
              <section>
                <h2 className="text-2xl font-black mb-4">1. Introduction</h2>
                <p>At "The Social Club", we are committed to protecting your privacy and personal data. This policy explains how we collect, use, and protect your information when you interact with our website and services.</p>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">2. Information & Cookies We Collect</h2>
                <p>We may collect the following data when you browse or submit an inquiry:</p>
                <ul className="list-disc list-inside mt-2 space-y-2 opacity-80">
                  <li><strong>Direct Contact Data:</strong> Name, email address, phone/WhatsApp number, company name, and marketing budget submitted via our contact forms.</li>
                  <li><strong>Analytics & Technical Data:</strong> Browser type, operating system, geolocation, and page interaction metrics via standard tools (such as Google Analytics and Meta Pixel) to improve usability.</li>
                  <li><strong>Local Preferences:</strong> Selected currency, language, and theme mode saved locally in your browser.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">3. How We Use Your Information</h2>
                <p>We use this data exclusively for:</p>
                <ul className="list-disc list-inside mt-2 space-y-2 opacity-80">
                  <li>Contacting you to prepare your growth audit, strategic roadmap, and proposals.</li>
                  <li>Monitoring site performance, preventing abuse, and optimizing conversion funnels.</li>
                  <li>We never sell, rent, or lease your private contact information to external third parties.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">4. Data Security</h2>
                <p>All traffic between your browser and our website is strictly encrypted in transit using industry-standard HTTPS / TLS. Lead records are stored within secure cloud infrastructures with role-based access restricted strictly to authorized project growth managers.</p>
              </section>
              <section>
                <h2 className="text-2xl font-black mb-4">5. Contact Us</h2>
                <p>If you have any questions or wish to request data updates/deletion, please contact us at: <br/>
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
