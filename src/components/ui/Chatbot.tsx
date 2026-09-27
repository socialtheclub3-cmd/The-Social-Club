import React, { useState, useEffect, useRef } from 'react';
import { X, Send, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { leadsService } from '../../services/leadsService';

type FlowState = 'menu' | 'asking_name' | 'asking_phone';

type Message = {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  options?: { label: string; action: string }[];
};

const Chatbot: React.FC = () => {
  const { lang } = useApp();
  const isAr = lang === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Conversational Form State
  const [flowState, setFlowState] = useState<FlowState>('menu');
  const [inputText, setInputText] = useState('');
  const [leadData, setLeadData] = useState({ name: '', phone: '' });

  // Clear messages when language changes so it can re-greet in the new language
  useEffect(() => {
    setMessages([]);
    setFlowState('menu');
    setLeadData({ name: '', phone: '' });
  }, [lang]);

  // Initial Greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: isAr ? 'أهلاً بيك في The Social Club 👋 أقدر أساعدك إزاي النهاردة؟' : 'Welcome to The Social Club 👋 How can I help you today?',
          sender: 'bot',
          options: [
            { label: isAr ? 'إيه هي خدماتكم؟' : 'What are your services?', action: 'services' },
            { label: isAr ? 'عايز أعرف الأسعار' : 'I want to know pricing', action: 'pricing' },
            { label: isAr ? 'أحجز استشارة مجانية' : 'Book a free consultation', action: 'book' }
          ]
        }
      ]);
    }
  }, [isOpen, isAr, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOptionClick = (option: { label: string; action: string }) => {
    // Add user message
    const userMsg: Message = { id: Date.now(), text: option.label, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);

    // Simulate bot thinking
    setTimeout(() => {
      let botResponse: Message;
      
      switch (option.action) {
        case 'services':
          botResponse = {
            id: Date.now() + 1,
            text: isAr 
              ? 'إحنا وكالة نمو رقمي متكاملة. بنقدم:\n- التسويق الرقمي وإدارة السوشيال ميديا\n- تصميم وتطوير المواقع\n- تحسين محركات البحث (SEO)\n- توليد العملاء المحتملين (Lead Gen)' 
              : 'We are a full-stack growth agency offering:\n- Digital Marketing & SMM\n- Web Design & Dev\n- SEO\n- Lead Generation',
            sender: 'bot',
            options: [
              { label: isAr ? 'عايز أحجز استشارة' : 'Book a consultation', action: 'book' },
              { label: isAr ? 'الرجوع للقائمة' : 'Back to menu', action: 'menu' }
            ]
          };
          break;
        case 'pricing':
          botResponse = {
            id: Date.now() + 1,
            text: isAr 
              ? 'باقاتنا بتبدأ من $1,000 وتصل لـ $5,000+ حسب حجم مشروعك وأهدافك. الأفضل نتكلم في ميتنج عشان نحدد الباقة الأنسب ليك.' 
              : 'Our packages start at $1,000 up to $5,000+ depending on your goals. It\'s best to discuss this on a quick call.',
            sender: 'bot',
            options: [
              { label: isAr ? 'أحجز الميتنج دلوقتي' : 'Book a meeting now', action: 'book' },
              { label: isAr ? 'الرجوع للقائمة' : 'Back to menu', action: 'menu' }
            ]
          };
          break;
        case 'book':
          botResponse = {
            id: Date.now() + 1,
            text: isAr 
              ? 'خطوة ممتازة! خلينا نبدأ.. ممكن أعرف اسم حضرتك؟' 
              : 'Great step! Let\'s get started. May I have your name?',
            sender: 'bot'
          };
          setFlowState('asking_name');
          break;
        case 'goto_contact':
          setIsOpen(false);
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          return; // No message added
        case 'menu':
        default:
          botResponse = {
            id: Date.now() + 1,
            text: isAr ? 'تؤمر بإيه تاني؟' : 'What else can I do for you?',
            sender: 'bot',
            options: [
              { label: isAr ? 'إيه هي خدماتكم؟' : 'What are your services?', action: 'services' },
              { label: isAr ? 'عايز أعرف الأسعار' : 'I want to know pricing', action: 'pricing' },
              { label: isAr ? 'أحجز استشارة مجانية' : 'Book a free consultation', action: 'book' }
            ]
          };
          break;
      }
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  const handleTextInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || flowState === 'menu') return;

    const userText = inputText.trim();
    setInputText('');

    // Add user message
    const userMsg: Message = { id: Date.now(), text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      let botResponse: Message;

      if (flowState === 'asking_name') {
        setLeadData(prev => ({ ...prev, name: userText }));
        botResponse = {
          id: Date.now() + 1,
          text: isAr 
            ? `أهلاً بيك يا ${userText}! 🌟 رقم تليفونك كام عشان فريقنا يتواصل معاك؟`
            : `Nice to meet you, ${userText}! 🌟 What's your phone number so our team can reach you?`,
          sender: 'bot'
        };
        setFlowState('asking_phone');
      } 
      else if (flowState === 'asking_phone') {
        // Save the lead
        leadsService.saveLead({
          name: leadData.name,
          phone: userText,
          email: 'Captured via Chatbot', // default
          company: '',
          service: 'General Consultation', // default from chat
          budget: '',
          projectDetails: 'Lead captured directly through the Chatbot.'
        });

        botResponse = {
          id: Date.now() + 1,
          text: isAr 
            ? 'تم استلام بياناتك بنجاح! 🎉 فريقنا هيكلمك في أقرب وقت. تقدر تستكشف الموقع براحتك دلوقتي.'
            : 'Your request is received successfully! 🎉 Our team will call you ASAP. Feel free to explore the site.',
          sender: 'bot',
          options: [
            { label: isAr ? 'الرجوع للقائمة' : 'Back to menu', action: 'menu' }
          ]
        };
        setFlowState('menu');
      } else {
        return; // safety
      }

      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button (Draggable) */}
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={{ top: -800, bottom: 800, left: -800, right: 800 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`fixed bottom-6 ${isAr ? 'right-6' : 'left-6'} z-40 ${isOpen ? 'hidden' : ''}`}
        style={{ touchAction: 'none' }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-[#1E1E1E] dark:bg-white text-white dark:text-[#1E1E1E] flex items-center justify-center shadow-lg shadow-black/20 overflow-hidden group hover:scale-110 active:scale-95 transition-transform"
          style={{ cursor: 'grab' }}
        >
          <Sparkles size={24} className="group-hover:animate-pulse text-[#A78BFA]" />
        </button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-0 sm:bottom-6 ${isAr ? 'sm:right-6' : 'sm:left-6'} z-50 w-full sm:w-[380px] h-[85vh] sm:h-[500px] max-h-[800px] bg-white dark:bg-[#1C1C1C] sm:rounded-2xl shadow-2xl border-t sm:border border-[#1E1E1E]/10 dark:border-white/10 flex flex-col overflow-hidden`}
            dir={isAr ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="bg-[#1E1E1E] dark:bg-white p-4 flex items-center justify-between text-white dark:text-[#1E1E1E]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 dark:bg-black/5 flex items-center justify-center backdrop-blur-sm">
                  <Sparkles size={16} className="text-[#A78BFA]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">The Social Club Assistant</h3>
                  <p className="text-[10px] opacity-70">{isAr ? 'متصل الآن' : 'Online'}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 dark:hover:bg-black/5 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FBF6EF]/50 dark:bg-[#121212]/50">
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user' 
                        ? 'bg-[#A78BFA] text-[#1E1E1E] font-medium rounded-tr-sm rtl:rounded-tl-sm rtl:rounded-tr-2xl' 
                        : 'bg-white dark:bg-[#2A2A2A] text-[#1E1E1E] dark:text-white border border-[#1E1E1E]/5 dark:border-white/5 rounded-tl-sm rtl:rounded-tr-sm rtl:rounded-tl-2xl shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  
                  {/* Options */}
                  {msg.options && (
                    <div className="flex flex-col gap-2 mt-2 w-full pr-8 rtl:pl-8 rtl:pr-0">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(opt)}
                          className="text-left rtl:text-right px-4 py-2.5 rounded-xl text-xs font-bold bg-[#A78BFA]/10 text-[#A78BFA] hover:bg-[#A78BFA] hover:text-[#1E1E1E] transition-colors border border-[#A78BFA]/20 flex items-center justify-between group"
                        >
                          <span>{opt.label}</span>
                          <ChevronRight size={14} className="rtl:rotate-180 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer / Input */}
            <form onSubmit={handleTextInput} className="p-3 border-t border-[#1E1E1E]/5 dark:border-white/5 bg-white dark:bg-[#1C1C1C] flex gap-2">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  flowState === 'menu' 
                    ? (isAr ? 'اختر من الخيارات المتاحة...' : 'Choose an option above...')
                    : (isAr ? 'اكتب ردك هنا...' : 'Type your reply here...')
                }
                disabled={flowState === 'menu'}
                className="flex-1 bg-[#F8F4EE] dark:bg-[#121212] rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#A78BFA] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <button 
                type="submit"
                disabled={flowState === 'menu' || !inputText.trim()} 
                className="w-10 h-10 rounded-xl bg-[#A78BFA] text-white flex items-center justify-center disabled:bg-[#1E1E1E]/20 disabled:dark:bg-white/20 disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} className={isAr ? 'rotate-180' : ''} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
