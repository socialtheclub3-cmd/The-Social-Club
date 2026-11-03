// Serializable CaseStudy interfaces (icons stored as strings, not React.ElementType)
// This allows storage in localStorage and Firestore

export type ResultIconKey = 'TrendingUp' | 'Users' | 'DollarSign' | 'Target';

export interface StorableResult {
  icon: ResultIconKey;
  value: string;
  label: string;
  labelAr: string;
  color: string;
}

export interface StorableCaseStudy {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  gradient: string;
  industry: string;
  industryAr: string;
  timeline: string;
  challenge: string;
  challengeAr: string;
  solution: string;
  solutionAr: string;
  results: StorableResult[];
  deliverables: string[];
  deliverablesAr: string[];
  tags?: string[];
  tagsAr?: string[];
  description?: string;
  descriptionAr?: string;
  logo?: string;
  isFeatured?: boolean;
  order?: number;
}

export const defaultCaseStudies: StorableCaseStudy[] = [
  {
    id: 'bloom',
    name: 'Bloom Fashion Studio',
    nameAr: 'بلوم للأزياء الفاخرة',
    category: 'Direct to Consumer · E-Commerce',
    categoryAr: 'متجر إلكتروني · بيع مباشر للمستهلك',
    gradient: 'linear-gradient(135deg, #FF8FB1 0%, #A78BFA 100%)',
    industry: 'E-Commerce & Retail',
    industryAr: 'التجارة الإلكترونية',
    timeline: 'Results in first 90 days',
    challenge:
      'Bloom had a beautiful physical boutique but a slow, poorly converting online store. Their social media was inconsistent, and return on ad spend was below 1.2x, making paid growth unprofitable.',
    challengeAr:
      'كانت بلوم تمتلك بوتيك فيزيائي جميل لكن متجرها الإلكتروني كان بطيئاً وضعيف التحويل. كان التواجد على منصات التواصل غير منتظم، وعائد الإنفاق الإعلاني أقل من 1.2x مما يجعل النمو المدفوع غير مجدٍ.',
    solution:
      'We rebuilt their e-commerce experience as a high-speed, mobile-first headless store with conversion-focused UX. We then deployed performance creative testing across Meta Ads — iterating on 30+ ad creatives monthly — until we found the winning hooks that resonated with their target audience.',
    solutionAr:
      'أعدنا بناء تجربة التسوق الإلكتروني كمتجر headless سريع يركز على الهاتف المحمول مع تصميم تجربة مستخدم محورها التحويل. أطلقنا بعدها اختبارات إعلانات إبداعية مكثفة على ميتا — مكررين أكثر من 30 إعلاناً شهرياً — حتى وجدنا الصيغ الفائزة.',
    results: [
      { icon: 'TrendingUp', value: '3.4x', label: 'Return on Ad Spend', labelAr: 'عائد الإنفاق الإعلاني', color: '#FF8FB1' },
      { icon: 'DollarSign', value: '+180%', label: 'Average Order Value', labelAr: 'زيادة متوسط قيمة الطلب', color: '#A78BFA' },
      { icon: 'Users', value: '2.9x', label: 'Repeat Purchase Rate', labelAr: 'معدل تكرار الشراء', color: '#22C55E' },
      { icon: 'Target', value: '-55%', label: 'Page Load Time', labelAr: 'تحسن سرعة الموقع', color: '#F59E0B' },
    ],
    deliverables: [
      'Headless e-commerce store (React)',
      '30+ ad creative variations tested',
      'Email & SMS nurturing sequences',
      'Conversion rate optimization',
      'Influencer collaboration strategy',
    ],
    deliverablesAr: [
      'متجر إلكتروني Headless بتقنية React',
      'اختبار 30+ تصميم إعلاني مختلف',
      'سلاسل بريد إلكتروني وSMS تلقائية',
      'تحسين معدل التحويل (CRO)',
      'استراتيجية التعاون مع المؤثرين',
    ],
    tags: ['E-Commerce', 'Creative Ads', 'CRO'],
    tagsAr: ['تصميم متجر', 'تسويق رقمي', 'تحسين تحويلات'],
    description: 'High-speed headless e-commerce store with performance creative testing driving 3.4x return on ad spend in first 90 days.',
    descriptionAr: 'متجر إلكتروني عالي الأداء مع حملات محتوى إبداعي رفعت متوسط سلة الشراء ومعدل تكرار الطلبات.',
    order: 1,
  },
  {
    id: 'strata',
    name: 'Strata Cloud Solutions',
    nameAr: 'ستراتا للحلول السحابية',
    category: 'B2B Enterprise · SaaS Lead Generation',
    categoryAr: 'شركات B2B · جلب عملاء SaaS',
    gradient: 'linear-gradient(135deg, #1E1E1E 0%, #FF8A3D 100%)',
    industry: 'B2B & SaaS',
    industryAr: 'B2B والبرمجيات',
    timeline: 'Results in 60 days',
    challenge:
      'Strata had a powerful cloud product but a generic website that failed to communicate technical value to enterprise buyers. Their sales team was spending too much time on cold outreach with low conversion rates.',
    challengeAr:
      'كانت ستراتا تمتلك منتجاً سحابياً قوياً لكن موقعها العادي كان يفشل في إيصال القيمة التقنية لمشتري المؤسسات. كان فريق المبيعات يُضيّع وقتاً كبيراً في التواصل البارد بمعدلات تحويل ضعيفة.',
    solution:
      'We created an interactive SaaS landing experience with live product demos, ROI calculators, and automated qualification sequences. Paired with LinkedIn and Google demand-gen campaigns targeting C-suite executives, we built a self-qualifying inbound pipeline that booked demos on autopilot.',
    solutionAr:
      'أنشأنا تجربة صفحة هبوط تفاعلية تشمل عروضاً توضيحية حية وحاسبات ROI ومتسلسلات تأهيل تلقائية. جنباً إلى جنب مع حملات LinkedIn وGoogle تستهدف المسؤولين التنفيذيين، بنينا خط أنابيب وارد يحجز العروض التوضيحية تلقائياً.',
    results: [
      { icon: 'Users', value: '40+', label: 'Executive Demos / Month', labelAr: 'عرض توضيحي تنفيذي شهرياً', color: '#FF8A3D' },
      { icon: 'TrendingUp', value: '6.2x', label: 'Pipeline Growth', labelAr: 'نمو خط الأنابيب', color: '#22C55E' },
      { icon: 'DollarSign', value: '-68%', label: 'Cost Per Demo Booked', labelAr: 'انخفاض تكلفة الحجز', color: '#A78BFA' },
      { icon: 'Target', value: '92%', label: 'Lead Quality Score', labelAr: 'نقاط جودة العملاء', color: '#F59E0B' },
    ],
    deliverables: [
      'Interactive SaaS landing page',
      'LinkedIn & Google demand gen campaigns',
      'Automated demo booking system',
      'Lead scoring & CRM automation',
      'C-suite targeted content strategy',
    ],
    deliverablesAr: [
      'صفحة هبوط تفاعلية للـ SaaS',
      'حملات LinkedIn وGoogle للطلب',
      'نظام حجز تلقائي للعروض التوضيحية',
      'تقييم العملاء وأتمتة CRM',
      'استراتيجية محتوى مستهدفة للمسؤولين',
    ],
    tags: ['Custom Web', 'CRM Automation', 'Lead Gen'],
    tagsAr: ['موقع مخصص', 'أتمتة CRM', 'جلب عملاء'],
    description: 'Interactive SaaS landing experience paired with automated qualification sequences booking 40+ executive demos monthly.',
    descriptionAr: 'بناء صفحة هبوط تقنية فائقة الإقناع مع نظام تأهيل تلقائي للمكالمات الاستشارية لكبار المديرين التنفيذيين.',
    order: 2,
  },
  {
    id: 'eduguide',
    name: 'EduGuide Chatbot',
    nameAr: 'إديوجايد شات بوت',
    category: 'Education · Conversational AI',
    categoryAr: 'التعليم · الذكاء الاصطناعي',
    gradient: 'linear-gradient(135deg, #7ED6B7 0%, #1E1E1E 100%)',
    logo: '/eduguide-logo.jpg',
    industry: 'Education Services',
    industryAr: 'الخدمات التعليمية',
    timeline: 'Results in 30 days',
    challenge:
      'The student service center was overwhelmed with repetitive inquiries about admissions, schedules, and exams. Response times were slow, and students were frustrated with the lack of instant support.',
    challengeAr:
      'كان مركز خدمة الطلاب غارقاً في الاستفسارات المتكررة حول القبول، الجداول، والامتحانات. كانت أوقات الرد بطيئة، وكان الطلاب يشعرون بالإحباط بسبب غياب الدعم الفوري.',
    solution:
      'We developed "EduGuide", an intelligent conversational AI chatbot integrated directly into their website and WhatsApp. It automatically resolves 85% of standard student queries 24/7, routing only complex issues to human advisors.',
    solutionAr:
      'قمنا بتطوير "إديوجايد"، وهو شات بوت ذكي متكامل مع موقعهم وواتساب. يقوم بحل 85٪ من استفسارات الطلاب الشائعة تلقائياً على مدار الساعة، ويحول الحالات المعقدة فقط للمستشارين البشريين.',
    results: [
      { icon: 'Users', value: '10k+', label: 'Students Assisted', labelAr: 'طالب تمت مساعدته', color: '#7ED6B7' },
      { icon: 'TrendingUp', value: '85%', label: 'Auto-Resolution Rate', labelAr: 'معدل الحل التلقائي', color: '#22C55E' },
      { icon: 'Target', value: '< 2s', label: 'Average Response Time', labelAr: 'متوسط سرعة الرد', color: '#FF8A3D' },
      { icon: 'DollarSign', value: '-60%', label: 'Support Costs', labelAr: 'انخفاض تكاليف الدعم', color: '#A78BFA' },
    ],
    deliverables: [
      'Custom NLP Chatbot Development',
      'WhatsApp Business API Integration',
      'Student Portal Web Widget',
      'Analytics & Training Dashboard',
    ],
    deliverablesAr: [
      'تطوير شات بوت ذكي مخصص',
      'الربط مع واتساب أعمال (API)',
      'أداة محادثة ذكية على بوابة الطلاب',
      'لوحة تحكم وتقارير الأداء',
    ],
    tags: ['AI Chatbot', 'Customer Support', 'Automation'],
    tagsAr: ['ذكاء اصطناعي', 'خدمة عملاء', 'أتمتة'],
    description: 'An intelligent student service chatbot providing 24/7 support and resolving 85% of queries automatically.',
    descriptionAr: 'بناء شات بوت ذكي لخدمة الطلاب على مدار الساعة، مما قلل ضغط الاستفسارات بنسبة 85%.',
    order: 3,
  },
];

