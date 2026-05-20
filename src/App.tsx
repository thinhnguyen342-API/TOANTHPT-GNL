import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import {
  Award,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Compass,
  ExternalLink,
  GraduationCap,
  Info,
  MapPin,
  Menu,
  Phone,
  PhoneCall,
  Send,
  Sparkles,
  Star,
  ThumbsUp,
  TrendingUp,
  X,
  Users,
  CheckSquare,
  Layers,
  ArrowRight,
  Camera,
  Upload,
  Link,
  Database,
  Copy
} from 'lucide-react';

import { classSchedules, teachers, testimonials, faqItems } from './data';
import { ClassSchedule, Registration } from './types';
import MathPathEstimator from './components/MathPathEstimator';

const APPS_SCRIPT_CODE = `function doGet(e) {
  return HtmlService.createHtmlOutput("<h3 style='font-family:sans-serif; text-align:center; padding-top:40px; color:#1e293b;'>Hệ thống tích hợp Google Sheets của Trung Tâm Toán Thạc Sĩ đang hoạt động tốt!</h3>");
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000); // Đợi tối đa 15 giây để tránh ghi trùng lặp dữ liệu
  
  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();
    
    // Khởi tạo dòng tiêu đề nếu trang tính học đang rỗng hoàn toàn
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thời gian đăng ký", 
        "Họ tên học sinh", 
        "Số điện thoại liên lạc", 
        "Lớp học", 
        "Khóa học đăng ký", 
        "Mục tiêu hướng tới", 
        "Ghi chú bổ sung"
      ]);
      
      var headerRange = sheet.getRange(1, 1, 1, 7);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#f1f5f9");
      headerRange.setHorizontalAlignment("center");
    }
    
    // Parse dữ liệu từ yêu cầu gửi đến
    var data = JSON.parse(e.postData.contents);
    
    // Ghi dữ liệu học viên
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("vi-VN"),
      data.studentName || "",
      data.parentPhone || "",
      "Lớp " + (data.grade || ""),
      data.classInterest || "",
      data.targetGoal || "",
      data.customNotes || ""
    ]);
    
    sheet.autoResizeColumns(1, 7);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success", "message": "Ghi dữ liệu thành công" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`;

export default function App() {
  // Mobile menu control
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load custom teacher images from localStorage if set (e.g. real photo link or uploaded files)
  const [teacherImages, setTeacherImages] = useState<{ [key: string]: string }>(() => {
    const th = localStorage.getItem('img_thay_thinh');
    const nh = localStorage.getItem('img_co_nhu');
    // Filter out old placeholder paths
    const realTh = (th && !th.includes('/src/assets/images/')) ? th : 'https://lh3.googleusercontent.com/d/1gsXqEjCkZo-Cslc9KDmVYpuP84NG6WtQ';
    const realNh = (nh && !nh.includes('/src/assets/images/')) ? nh : 'https://lh3.googleusercontent.com/d/1u6Vy0-b_6r2cIMdPoqgXXazIqhztZmIi';
    return {
      'Thầy Nguyễn Đăng Thịnh': realTh,
      'Cô Nguyễn Thị Quỳnh Như': realNh,
    };
  });

  // Teacher photo edit dialog states
  const [editingTeacher, setEditingTeacher] = useState<null | { name: string; key: string }>(null);
  const [inputPhotoUrl, setInputPhotoUrl] = useState<string>('');

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setInputPhotoUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Class filtering states
  const [selectedGrade, setSelectedGrade] = useState<'All' | '9' | '10' | '11' | '12'>('All');

  // Interactive Registration Form state
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [parentPhone, setParentPhone] = useState<string>('');
  const [studentGrade, setStudentGrade] = useState<string>('12');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [targetGoal, setTargetGoal] = useState<string>('Thi Đại học TOP đầu');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Google Sheet integration states
  const [sheetsWebappUrl, setSheetsWebappUrl] = useState<string>(() => {
    return localStorage.getItem('sigma_math_gsheet_url') || '';
  });
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const [isCopySuccess, setIsCopySuccess] = useState(false);
  const [isSendingToSheet, setIsSendingToSheet] = useState(false);

  // Personal local history of registrations to show persistence
  const [myRegistrations, setMyRegistrations] = useState<Registration[]>([]);

  // FAQ Accordion states
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq1');

  // Floating CTA mini menu open on mobile trigger
  const [isCtaMenuOpen, setIsCtaMenuOpen] = useState(false);

  // Quote switcher state
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const inspirationalQuotes = [
    {
      content: "Thành công là kết quả của sự hoàn hảo, làm việc chăm chỉ, học hỏi từ thất bại, lòng trung thành và sự kiên trì.",
      author: "Colin Powell"
    },
    {
      content: "Kỷ luật là cầu nối giữa mục tiêu và thành tựu.",
      author: "Jim Rohn"
    },
    {
      content: "Đam mê là năng lượng. Hãy cảm nhận sức mạnh đến từ việc tập trung vào những gì làm bạn hứng thú.",
      author: "Oprah Winfrey"
    },
    {
      content: "Sự kiên trì không phải là một cuộc chạy đua đường dài; nó là nhiều cuộc chạy đua ngắn liên tiếp nhau.",
      author: "Walter Elliot"
    },
    {
      content: "Thất bại chỉ là cơ hội để bắt đầu lại một cách thông minh hơn.",
      author: "Henry Ford"
    },
    {
      content: "Đừng sợ thất bại. Không phải thất bại, mà là mục tiêu quá thấp mới là tội lỗi. Trong những nỗ lực lớn lao, ngay cả thất bại cũng là vinh quang.",
      author: "Bruce Lee"
    },
    {
      content: "Sự khác biệt giữa những người thành công và những người khác không phải là sự thiếu hụt sức mạnh, không phải là sự thiếu hụt kiến thức, mà đúng hơn là sự thiếu hụt ý chí.",
      author: "Vince Lombardi"
    }
  ];

  // Auto rotate quotes every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Load registration history from local storage on load
  useEffect(() => {
    const saved = localStorage.getItem('sigma_math_registrations');
    if (saved) {
      try {
        setMyRegistrations(JSON.parse(saved));
      } catch (e) {
        console.error('Lỗi phân tích số liệu đăng ký cũ.');
      }
    }
  }, []);

  // Filtered schedules
  const filteredSchedules = selectedGrade === 'All'
    ? classSchedules
    : classSchedules.filter(s => s.grade === selectedGrade);

  // Form Submission Handler
  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !parentPhone) {
      alert('Vui lòng điền họ tên học sinh và số điện thoại liên lạc.');
      return;
    }

    const matchedClass = classSchedules.find(s => s.id === selectedClassId);
    const classNameChosen = matchedClass ? matchedClass.className : `Toán học Lớp ${studentGrade}`;

    const timestampStr = new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

    const newReg: Registration = {
      id: 'reg_' + Date.now(),
      studentName: fullName,
      parentPhone: parentPhone,
      grade: studentGrade,
      classInterest: classNameChosen,
      targetGoal: targetGoal,
      timestamp: timestampStr
    };

    const updated = [newReg, ...myRegistrations];
    setMyRegistrations(updated);
    localStorage.setItem('sigma_math_registrations', JSON.stringify(updated));

    const savedName = fullName;
    const phoneToSubmit = parentPhone;
    const gradeToSubmit = studentGrade;
    const targetToSubmit = targetGoal;
    const noteToSubmit = customNotes;

    // Reset fields except phone if they want to submit another child
    setFullName('');
    setCustomNotes('');
    setSuccessMessage(`Đăng ký thành công! Hệ thống đã ghi nhận thông tin học tập của em ${savedName} vào danh sách trực tiếp do Thầy Thịnh / Cô Như phụ trách.`);
    
    // Automatically close success notice after 8 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 8000);

    // Send to Google Sheets webapp via post (if set up)
    const sheetsUrlFromStorage = localStorage.getItem('sigma_math_gsheet_url') || sheetsWebappUrl;
    if (sheetsUrlFromStorage) {
      setIsSendingToSheet(true);
      try {
        const payload = {
          timestamp: timestampStr,
          studentName: savedName,
          parentPhone: phoneToSubmit,
          grade: gradeToSubmit,
          classInterest: classNameChosen,
          targetGoal: targetToSubmit,
          customNotes: noteToSubmit
        };
        
        await fetch(sheetsUrlFromStorage.trim(), {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });
        console.log('Form data sent successfully to Google Sheets Web App');
      } catch (err) {
        console.error('Failed to submit form data to Google Sheets:', err);
      } finally {
        setIsSendingToSheet(false);
      }
    }
  };

  // Helper to pre-select class grade and populate registration state
  const handleQuickRegister = (schedule: ClassSchedule) => {
    setSelectedClassId(schedule.id);
    setStudentGrade(schedule.grade);
    const targetElement = document.getElementById('register-form');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-brand-blue-light selection:text-white">
      
      {/* 1. INTERACTIVE HEADER/NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo area */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-blue-light flex items-center justify-center text-white shadow-md">
                <span className="font-display font-black text-xl tracking-tight">∑</span>
              </div>
              <div>
                <span className="block font-display font-extrabold text-lg text-brand-blue tracking-tight uppercase leading-tight">TOÁN THẠC SĨ</span>
                <span className="block text-[11px] font-semibold text-brand-emerald tracking-wide uppercase">Thầy Thịnh & Cô Như</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#about-section" className="text-sm font-medium text-slate-600 hover:text-brand-blue-light transition-colors">Giáo Viên</a>
              <a href="#schedule-section" className="text-sm font-medium text-slate-600 hover:text-brand-blue-light transition-colors">Lịch Học & Lộ Trình</a>
              <a href="#estimator-section" className="text-sm font-medium text-slate-600 hover:text-brand-blue-light transition-colors">Thiết Kế Lộ Trình</a>
              <a href="#faq-section" className="text-sm font-medium text-slate-600 hover:text-brand-blue-light transition-colors">Hỏi Đáp Góp Ý</a>
              <a href="#register-form" className="text-sm font-medium text-slate-600 hover:text-brand-blue-light transition-colors font-semibold px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700">Tư Vấn Miễn Phí</a>
            </nav>

            {/* Desktop Action Handles */}
            <div className="hidden lg:flex items-center gap-3">
              <a 
                href="https://zalo.me/0902312328" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 border border-blue-100 text-brand-blue-light hover:bg-blue-50/50 rounded-xl text-xs font-bold transition-all"
                id="nav-zalo-thinh"
              >
                <span>Zalo Thầy Thịnh</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="#register-form" 
                className="px-5 py-2.5 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
                id="nav-join-now"
              >
                Đăng Ký Khảo Sát
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-100 px-4 py-6 space-y-4 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2">
              <a
                href="#about-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-medium text-slate-700"
              >
                <Users className="w-4 h-4 text-brand-blue-light" />
                <span>Giảng viên</span>
              </a>
              <a
                href="#schedule-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-medium text-slate-700"
              >
                <Calendar className="w-4 h-4 text-brand-emerald" />
                <span>Lịch học</span>
              </a>
              <a
                href="#estimator-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-medium text-slate-700"
              >
                <Compass className="w-4 h-4 text-brand-amber" />
                <span>Lộ trình điểm</span>
              </a>
              <a
                href="#faq-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-medium text-slate-700"
              >
                <Info className="w-4 h-4 text-slate-500" />
                <span>Hỏi đáp</span>
              </a>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">Liên hệ nhanh</div>
              <div className="flex flex-col gap-2">
                <a 
                  href="https://zalo.me/0902312328" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 border border-blue-50 hover:bg-blue-50/50 rounded-xl text-sm font-semibold text-brand-blue-light"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Thầy Nguyễn Đăng Thịnh
                  </span>
                  <span className="text-xs text-brand-blue hover:underline">0902.312.328</span>
                </a>
                <a 
                  href="https://zalo.me/0917427741" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 border border-emerald-50 hover:bg-emerald-50/50 rounded-xl text-sm font-semibold text-brand-emerald"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Cô Nguyễn Thị Quỳnh Như
                  </span>
                  <span className="text-xs text-brand-teal hover:underline">0917.427.741</span>
                </a>
              </div>
            </div>

            <a
              href="#register-form"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-3.5 bg-brand-blue hover:bg-brand-royal text-white text-center font-bold rounded-xl shadow-md cursor-pointer"
            >
              Đăng Ký Học Thử Ngay
            </a>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50/50 pt-16 pb-20 sm:pb-28">
        
        {/* Abstract mathematical watermark / glowing shape */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-brand-blue-light/5 to-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Highlight Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-brand-blue-light text-xs sm:text-sm font-semibold tracking-wide uppercase mx-auto lg:mx-0">
                <Sparkles className="w-4 h-4 text-brand-amber animate-pulse" />
                <span>Bứt phá tư duy Toán học đỉnh cao </span>
              </div>

              {/* Bold inspiring title requested */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] tracking-tight text-slate-900">
                Vượt Qua <span className="bg-gradient-to-r from-brand-blue-light to-brand-blue bg-clip-text text-transparent">Mọi Giới Hạn</span> Học Thuật Môn Toán
              </h1>

              {/* M.Sc degree highlight requested */}
              <p className="text-lg text-slate-600 font-sans max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Trực tiếp giảng dạy bởi <strong className="text-brand-blue font-bold">Thạc sĩ Khoa học bậc Toán học (M.Sc.)</strong> chuyên bồi dưỡng bứt phá điểm số từ <strong className="text-brand-emerald font-bold">Cơ bản đến Nâng cao</strong> và <strong className="text-brand-orange font-bold">Luyện thi Đánh giá năng lực, Tốt nghiệp THPT và Tuyển sinh lớp 10 Công lập</strong>.
              </p>

              {/* Key benefit points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-semibold text-slate-700 text-sm py-4 max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckSquare className="w-5 h-5 text-brand-emerald shrink-0" />
                  <span>Sỹ số giới hạn</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckSquare className="w-5 h-5 text-brand-emerald shrink-0" />
                  <span>Cam kết tiến bộ vượt bậc</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckSquare className="w-5 h-5 text-brand-emerald shrink-0" />
                  <span>Học thử 1 buổi miễn phí</span>
                </div>
              </div>

              {/* CTAs requested */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4">
                <a
                  href="#schedule-section"
                  className="px-8 py-4 bg-brand-blue hover:bg-brand-royal text-white text-base font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 text-center flex items-center justify-center gap-2 cursor-pointer"
                  id="hero-cta-schedule"
                >
                  <Calendar className="w-5 h-5" />
                  Xem Lịch Học & Học Phí
                </a>
                <a
                  href="#register-form"
                  className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-base font-bold rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 text-center flex items-center justify-center gap-2 cursor-pointer animate-bounce-slow"
                  id="hero-cta-contact"
                >
                  <PhoneCall className="w-5 h-5 text-brand-emerald" />
                  Liên Hệ Đăng Ký Ngay
                </a>
              </div>

              {/* Success highlights */}
              <div className="pt-6 border-t border-slate-150 flex flex-wrap justify-center lg:justify-start items-center gap-x-8 gap-y-3 text-slate-500 text-xs text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1">
                  <span className="text-yellow-400 flex">
                    {[1, 2, 3, 4, 5].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </span>
                  <span className="font-bold text-slate-700">100% Phụ huynh</span> hài lòng phản hồi tích cực
                </div>
                <div>Đạt tỉ lệ <strong className="text-brand-blue-light">96% học sinh đỗ đúng nguyện vọng</strong> đã đăng ký</div>
              </div>

            </div>

            {/* Right Display Image Column / Dashboard Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
                {/* Decorative geometries representing Mathematics */}
                <div className="absolute -top-6 -right-6 lg:-right-10 w-24 h-24 bg-brand-amber/10 rounded-xl -rotate-12 flex items-center justify-center font-display font-black text-4xl text-brand-orange select-none animate-pulse">
                  f(x)
                </div>
                <div className="absolute -bottom-6 -left-6 lg:-left-10 w-20 h-20 bg-brand-emerald/10 rounded-full flex items-center justify-center font-display font-extrabold text-2xl text-brand-emerald select-none">
                  πr²
                </div>

                {/* Main Hero Card layout simulating high quality maths workspace */}
                <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 glow-blue">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">lộ trình bứt phá . io</span>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50">
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="text-brand-amber font-semibold uppercase tracking-wider">Ôn thi THPT Quốc Gia</span>
                        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Tự tin 100%</span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-display mb-1">Chuyên Đề Luyện Câu Vận Dụng Cao (9+)</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Pháp bảo bí quyết biến đổi tích phân hàm ẩn, cực trị số phức phối hợp hình học tọa độ Oxyz.</p>
                    </div>

                    <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50">
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="text-brand-blue-light font-semibold uppercase tracking-wider">Thi tuyển sinh lớp 10</span>
                        <span className="text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded">Bứt phá tốt</span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-display mb-1">Chinh Phục Câu Hình Học Thực Tế & Số Học</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Học thuật chứng minh tứ giác nội tiếp & các dạng toán lượng giác thực tế độc đáo, dễ hiểu.</p>
                    </div>

                    {/* Quick interactive math trivia/tip */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-blue-500/20 text-center min-h-[160px] flex flex-col justify-between transition-all duration-300 relative group overflow-hidden">
                      <div className="absolute top-2 right-3 flex gap-2 z-10">
                        <button 
                          onClick={() => setCurrentQuoteIndex((prev) => (prev - 1 + inspirationalQuotes.length) % inspirationalQuotes.length)}
                          className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors text-xs"
                          title="Trước"
                        >
                          &larr;
                        </button>
                        <button 
                          onClick={() => setCurrentQuoteIndex((prev) => (prev + 1) % inspirationalQuotes.length)}
                          className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors text-xs"
                          title="Sau"
                        >
                          &rarr;
                        </button>
                      </div>
                      
                      <div className="my-auto">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-2">Triết lý học hành & vươn lên</div>
                        <div className="text-xs sm:text-sm font-sans text-brand-amber font-medium italic px-2 leading-relaxed animate-fadeIn">
                          "{inspirationalQuotes[currentQuoteIndex].content}"
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-450 font-semibold tracking-wider mt-3">
                        - {inspirationalQuotes[currentQuoteIndex].author}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 pt-5 border-t border-slate-800 text-center">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold font-display text-white">96.5%</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Học sinh đỗ nguyện vọng 1</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold font-display text-brand-emerald">9.2+</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Điểm thi TB Nhóm nâng cao</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CORE VALUES & METHODOLOGY SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-emerald uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full">Triết lý sư phạm ưu việt</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight text-slate-900 mt-3">
              Phương Pháp Dạy Học Bản Chất - Không Học Vẹt, Không Rập Khuôn
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Chúng tôi tin rằng học Toán không phải là ghi nhớ máy móc các cấu trúc đề mà là rèn luyện tư duy logic vững chãi, giải phóng sự nhạy bén của trí tuệ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1 */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl hover:scale-[1.02] hover:bg-white hover:shadow-xl transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-brand-orange mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900 mb-2">Đội Ngũ Master Đẳng Cấp</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Giảng viên trực tiếp giảng dạy đều có văn bằng Thạc sĩ Toán học xuất sắc từ các trường đại học uy tín hàng đầu TP.HCM, giỏi thực chiến ôn thi nước rút.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl hover:scale-[1.02] hover:bg-white hover:shadow-xl transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-brand-blue-light mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900 mb-2">Bản Đồ Tư Duy Chuẩn Hoá</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Mỗi dạng toán được bóc tách dưới góc nhìn cốt lõi bản chất lý thuyết, sơ đồ hóa cách phân biệt định lí, phát triển phản xạ tự luận chuyên nghiệp.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl hover:scale-[1.02] hover:bg-white hover:shadow-xl transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-brand-emerald mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900 mb-2">Đồng Hành Cá Nhân Hóa</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Học sinh được phân bổ nhóm học phù hợp đúng năng lực. Bản báo cáo học tập định lượng sau mỗi buổi được cập nhật nhanh, báo điểm trực tiếp tới phụ huynh.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl hover:scale-[1.02] hover:bg-white hover:shadow-xl transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-6">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900 mb-2">Tài Liệu Độc Quyền</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hệ thống giáo án thông minh liên tục cập nhật theo cấu trúc đề thi THPT, ĐGNL mới nhất. Bài tập mẫu được thầy cô quay dựng giải chi tiết từng bước.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. TEACHER PROFILE SECTION (Giới thiệu Giáo viên) */}
      <section id="about-section" className="py-20 bg-slate-50 relative overflow-hidden">
        
        {/* Visual elements */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-blue-light uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">Người dẫn đường tận tụy</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight text-slate-900 mt-3">
              Gặp Gỡ Đội Ngũ Sáng Lập & Giảng Viên
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Học sinh được sát cánh trực tiếp cùng hai Thạc sĩ Toán học tâm huyết với bề dày nghiên cứu, sư phạm chuẩn mực và sự tận tụy trong từng dòng bài giảng.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
            
            {/* Card 1: Thầy Nguyễn Đăng Thịnh */}
            <div className="bg-white rounded-3xl border border-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
              {/* Teacher graphic/photo side */}
              <div className="w-full md:w-2/5 relative min-h-[320px] overflow-hidden flex flex-col justify-between text-white p-8">
                {/* Visual mathematical grids background */}
                <div className="absolute inset-0 opacity-5 font-mono text-[10px] p-4 select-none leading-relaxed overflow-hidden z-20 pointer-events-none">
                  lim(x→∞) f(x) f'(x) dx dz ∫ y²+x² = r² f''(x)&gt;0 (x-h)² + (y-k)² = r² (a+b)ⁿ = Σ C(n,k) ax² + bx + c = 0...
                </div>
                
                {/* Real photo */}
                <img
                  src={teacherImages['Thầy Nguyễn Đăng Thịnh']}
                  alt={teachers[0].name}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105 z-0"
                  referrerPolicy="no-referrer"
                />
                
                {/* Custom Edit Button */}
                <div className="absolute top-4 right-4 z-40">
                  <button
                    onClick={() => {
                      setEditingTeacher({ name: 'Thầy Nguyễn Đăng Thịnh', key: 'img_thay_thinh' });
                      setInputPhotoUrl(teacherImages['Thầy Nguyễn Đăng Thịnh'] || '');
                    }}
                    className="p-1.5 bg-slate-900/70 hover:bg-slate-950 text-white rounded-lg transition-all border border-white/20 flex items-center gap-1 cursor-pointer shadow-md hover:scale-105 active:scale-95"
                    title="Cấu hình ảnh thật của Thầy Thịnh"
                  >
                    <Camera className="w-3.5 h-3.5 text-white" />
                    <span className="text-[10px] font-bold pr-0.5 text-white">Chèn ảnh thật</span>
                  </button>
                </div>
                
                {/* Professional overlay gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/10 z-10"></div>
                
                <div className="relative z-30">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-blue/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-md">
                    M.Sc in Calculus
                  </span>
                </div>

                <div className="relative z-30 text-center md:text-left">
                  <h3 className="text-xl font-bold font-display leading-tight text-white">{teachers[0].name}</h3>
                  <p className="text-xs text-blue-200 mt-1">{teachers[0].degree}</p>
                </div>
              </div>

              {/* Description side */}
              <div className="w-full md:w-3/5 p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold bg-blue-50 text-brand-blue-light px-2 py-0.5 rounded-md">Lớp 12 & Ôn Cường Độ Cao</span>
                    <span className="text-[11px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md text-nowrap">Chuyên Giải tích</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Lý lịch khoa học & Giảng dạy</h4>
                  <ul className="space-y-2.5">
                    {teachers[0].characteristics.map((char, index) => (
                      <li key={index} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-brand-blue-light shrink-0 mt-0.5" />
                        <span>{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs">
                    <div className="text-slate-400 font-medium">Zalo & Điện thoại trực tiếp</div>
                    <div className="text-sm font-bold text-slate-800">0902.312.328</div>
                  </div>
                  <a
                    href="https://zalo.me/0902312328"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-5 py-3 bg-brand-blue-light hover:bg-brand-blue text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg"
                    id="zalo-thay-thinh"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Chat Zalo Thầy Thịnh
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2: Cô Nguyễn Thị Quỳnh Như */}
            <div className="bg-white rounded-3xl border border-emerald-50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
              {/* Teacher graphic/photo side */}
              <div className="w-full md:w-2/5 relative min-h-[320px] overflow-hidden flex flex-col justify-between text-white p-8">
                {/* Visual mathematical grids background */}
                <div className="absolute inset-0 opacity-5 font-mono text-[10px] p-4 select-none leading-relaxed overflow-hidden z-20 pointer-events-none">
                  A = πr² y = ax+b sin²x + cos²x = 1 a² + b² = c² d/dx [f(x)] log_a(x) lim_n→∞ ... f(x)=x³ dx dy dy/dx...
                </div>

                {/* Real photo */}
                <img
                  src={teacherImages['Cô Nguyễn Thị Quỳnh Như']}
                  alt={teachers[1].name}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105 z-0"
                  referrerPolicy="no-referrer"
                />

                {/* Custom Edit Button */}
                <div className="absolute top-4 right-4 z-40">
                  <button
                    onClick={() => {
                      setEditingTeacher({ name: 'Cô Nguyễn Thị Quỳnh Như', key: 'img_co_nhu' });
                      setInputPhotoUrl(teacherImages['Cô Nguyễn Thị Quỳnh Như'] || '');
                    }}
                    className="p-1.5 bg-slate-900/70 hover:bg-slate-950 text-white rounded-lg transition-all border border-white/20 flex items-center gap-1 cursor-pointer shadow-md hover:scale-105 active:scale-95"
                    title="Cấu hình ảnh thật của Cô Như"
                  >
                    <Camera className="w-3.5 h-3.5 text-white" />
                    <span className="text-[10px] font-bold pr-0.5 text-white">Chèn ảnh thật</span>
                  </button>
                </div>

                {/* Professional overlay gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/10 z-10"></div>

                <div className="relative z-30">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-emerald/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-md">
                    M.Sc of Pedagogy
                  </span>
                </div>

                <div className="relative z-30 text-center md:text-left">
                  <h3 className="text-xl font-bold font-display leading-tight text-white">{teachers[1].name}</h3>
                  <p className="text-xs text-emerald-100 mt-1">{teachers[1].degree}</p>
                </div>
              </div>

              {/* Description side */}
              <div className="w-full md:w-3/5 p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold bg-emerald-50 text-brand-emerald px-2 py-0.5 rounded-md">Xây Nền & Tư Duy Toàn Diện</span>
                    <span className="text-[11px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md text-nowrap">Chuyên Sư phạm toán</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Lý lịch khoa học & Giảng dạy</h4>
                  <ul className="space-y-2.5">
                    {teachers[1].characteristics.map((char, index) => (
                      <li key={index} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                        <span>{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs">
                    <div className="text-slate-400 font-medium">Zalo & Điện thoại trực tiếp</div>
                    <div className="text-sm font-bold text-slate-800">0917.427.741</div>
                  </div>
                  <a
                    href="https://zalo.me/0917427741"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-5 py-3 bg-brand-emerald hover:bg-brand-teal text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg"
                    id="zalo-co-nhu"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Chat Zalo Cô Như
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. SCHEDULE & LEARNING ROADMAP SECTION (Lịch học & Lộ trình) */}
      <section id="schedule-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-orange-50 px-3 py-1.5 rounded-full">Thời khóa biểu hiện tại</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight text-slate-900 mt-3">
              Chương Trình Khai Giảng - Nhận Lớp Ngay
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Các lớp học được khai giảng trải dài từ tháng 6 đến tháng 9 chuẩn bị kiến thức vượt bậc, tích hợp đầy đủ lộ trình cho năm học từ căn bản tới nâng cao.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedGrade('All')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedGrade === 'All'
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              Tất Cả Lớp Toán
            </button>
            <button
              onClick={() => setSelectedGrade('12')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedGrade === '12'
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              Lớp 12 (Ôn thi THPT & ĐGNL)
            </button>
            <button
              onClick={() => setSelectedGrade('11')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedGrade === '11'
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              Lớp 11
            </button>
            <button
              onClick={() => setSelectedGrade('10')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedGrade === '10'
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              Lớp 10 (Chương trình mới THPT)
            </button>
            <button
              onClick={() => setSelectedGrade('9')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedGrade === '9'
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              Lớp 9 (Chuyên Đề Tuyển Sinh 10)
            </button>
          </div>

          {/* Interactive Responsive Grid containing class listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSchedules.map((schedule) => {
              const parsedStartDate = new Date(schedule.startDate.split('/').reverse().join('-'));
              const isFarFuture = parsedStartDate > new Date();

              return (
                <div 
                  key={schedule.id}
                  className="bg-white rounded-2xl border border-slate-150 hover:border-brand-blue-light/30 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    {/* Badge top labels */}
                    <div className="flex items-center justify-between">
                      <span className="font-display font-extrabold text-xl text-brand-blue">{schedule.className}</span>
                      
                      {/* Live registration dynamic state */}
                      {schedule.status === 'upcoming' ? (
                        <span className="text-[10px] font-bold px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          Sắp Khai Giảng
                        </span>
                      ) : schedule.status === 'active' ? (
                        <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-50 text-brand-emerald border border-emerald-100 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                          Đang Diễn Ra
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2.5 py-1 bg-red-50 text-red-700 border border-red-100 rounded-full">
                          Đầy Sỹ Số
                        </span>
                      )}
                    </div>

                    {/* Quality statement */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Đặc điểm chương trình</h4>
                      <p className="text-xs text-slate-800 font-semibold mt-1 italic">{schedule.level}</p>
                    </div>

                    {/* Schedule times beautifully formatted */}
                    <div className="space-y-2 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Clock className="w-4 h-4 text-brand-blue-light shrink-0" />
                        <span>Giờ học: <strong className="text-slate-800 font-semibold">{schedule.timeFormatted} ({schedule.timeRaw})</strong></span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Calendar className="w-4 h-4 text-brand-blue-light shrink-0" />
                        <span className="flex items-center gap-1">
                          Lịch học: 
                          {schedule.days.map((day, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded text-[11px]">
                              {day}
                            </span>
                          ))}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Award className="w-4 h-4 text-brand-emerald shrink-0" />
                        <span>Ngày bắt đầu: <strong className="text-brand-emerald font-semibold">{schedule.startDate}</strong></span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed pt-2">
                      {schedule.description}
                    </p>
                  </div>

                  {/* Actions footer */}
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-500 font-medium">Sỹ số giới hạn</span>
                    <button
                      onClick={() => handleQuickRegister(schedule)}
                      className="px-4 py-2 bg-brand-emerald hover:bg-brand-teal text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                      id={`register-class-${schedule.id}`}
                    >
                      Đăng Ký Trực Tiếp
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Estimation Callout Widget */}
          <div className="mt-16 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 bg-brand-orange/10 text-brand-orange rounded-full uppercase tracking-widest">Tìm kiếm khóa học phù hợp?</span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">Bốc Đầu Học Khắc Phục Khuyết Điểm Cực Hay với Lộ Trình Riêng</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hãy sử dụng bộ lọc kế hoạch tự động của trung tâm để thiết lập mục tiêu điểm số và nhận ngay phân tích sư phạm gợi ý cho Thầy Thịnh / Cô Như xem xét.
              </p>
            </div>
            <a 
              href="#estimator-section" 
              className="bg-brand-blue hover:bg-brand-royal text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
            >
              Dùng Thử Bộ Thiết Kế Lộ Trình 
            </a>
          </div>

        </div>
      </section>

      {/* 6. DYNAMIC MATH ROADMAP CALCULATOR SECTION */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-blue-light uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">Tính năng cao cấp</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight text-slate-900 mt-3">
              Cá Nhân Hóa Giáo Án Theo Năng Lực Học Sinh
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Nhập nhanh kết quả học lực hiện tại để hệ thống phân tích chương trình thích hợp. Bản kế hoạch được truyền trực tiếp qua kênh liên lạc của Thạc sĩ.
            </p>
          </div>

          <MathPathEstimator />

        </div>
      </section>

      {/* 7. INSPIRATIONAL SUCCESS PHILOSOPHY SECTION */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Subtle decorative background equations */}
        <div className="absolute top-10 right-0 w-80 h-80 bg-blue-50/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-80 h-80 bg-teal-50/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-emerald uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full">Góc truyền cảm hứng</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight text-slate-900 mt-3 animate-fadeIn">
              Triết Lý Thành Công & Động Lực Học Tập
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Tại Toán Thạc Sĩ, chúng tôi không chỉ truyền thụ kiến thức mà còn xây dựng bệ phóng tư duy, rèn luyện bản lĩnh kiên trì để học sinh vững vàng chinh phục mọi đỉnh cao.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Quote 1: Jim Rohn */}
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-100/80 rounded-3xl p-8 flex flex-col justify-between relative hover:shadow-xl hover:border-brand-blue-light/10 hover:-translate-y-1 transition-all duration-300">
              <span className="absolute top-4 right-6 text-7xl font-serif font-bold text-blue-500/10 select-none">“</span>
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-blue-50 text-brand-blue-light rounded-md">Kỷ luật & Tự giác</span>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium italic pt-2">
                  "Kỷ luật là cầu nối giữa mục tiêu và thành tựu."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-display font-extrabold text-xs text-brand-blue">
                  JR
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Jim Rohn</h4>
                  <p className="text-[10px] text-slate-500">Chuyên gia Triết lý Phát triển Cá nhân</p>
                </div>
              </div>
            </div>

            {/* Quote 2: Colin Powell */}
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-100/80 rounded-3xl p-8 flex flex-col justify-between relative hover:shadow-xl hover:border-brand-blue-light/10 hover:-translate-y-1 transition-all duration-300">
              <span className="absolute top-4 right-6 text-7xl font-serif font-bold text-emerald-500/10 select-none">“</span>
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-emerald-50 text-brand-emerald rounded-md">Kiên trì & Chăm chỉ</span>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium italic pt-2">
                  "Thành công là kết quả của sự hoàn hảo, làm việc chăm chỉ, học hỏi từ thất bại, lòng trung thành và sự kiên trì."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-display font-extrabold text-xs text-brand-teal">
                  CP
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Colin Powell</h4>
                  <p className="text-[10px] text-slate-500">Chính trị gia & Tướng lĩnh danh tiếng</p>
                </div>
              </div>
            </div>

            {/* Quote 3: Vince Lombardi */}
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-100/80 rounded-3xl p-8 flex flex-col justify-between relative hover:shadow-xl hover:border-brand-blue-light/10 hover:-translate-y-1 transition-all duration-300">
              <span className="absolute top-4 right-6 text-7xl font-serif font-bold text-orange-500/10 select-none">“</span>
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-orange-50 text-brand-orange rounded-md">Khát vọng & Ý chí</span>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium italic pt-2">
                  "Sự khác biệt giữa những người thành công và những người khác không phải là sự thiếu hụt sức mạnh, không phải là sự thiếu hụt kiến thức, mà đúng hơn là sự thiếu hụt ý chí."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-display font-extrabold text-xs text-brand-orange">
                  VL
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Vince Lombardi</h4>
                  <p className="text-[10px] text-slate-500">Huyền thoại Sư phạm & Huấn luyện viên</p>
                </div>
              </div>
            </div>

            {/* Quote 4: Henry Ford */}
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-100/80 rounded-3xl p-8 flex flex-col justify-between relative hover:shadow-xl hover:border-brand-emerald/10 hover:-translate-y-1 transition-all duration-300">
              <span className="absolute top-4 right-6 text-7xl font-serif font-bold text-teal-500/10 select-none">“</span>
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-teal-50 text-teal-700 rounded-md">Trải nghiệm & Bản lĩnh</span>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium italic pt-2">
                  "Thất bại chỉ là cơ hội để bắt đầu lại một cách thông minh hơn."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center font-display font-extrabold text-xs text-brand-teal">
                  HF
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Henry Ford</h4>
                  <p className="text-[10px] text-slate-500">Nhà phát minh & Doanh nhân vĩ đại</p>
                </div>
              </div>
            </div>

            {/* Quote 5: Oprah Winfrey */}
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-100/80 rounded-3xl p-8 flex flex-col justify-between relative hover:shadow-xl hover:border-brand-orange/10 hover:-translate-y-1 transition-all duration-300">
              <span className="absolute top-4 right-6 text-7xl font-serif font-bold text-purple-500/10 select-none">“</span>
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md">Đam mê & Tập trung</span>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium italic pt-2">
                  "Đam mê là năng lượng. Hãy cảm nhận sức mạnh đến từ việc tập trung vào những gì làm bạn hứng thú."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-display font-extrabold text-xs text-purple-750">
                  OW
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Oprah Winfrey</h4>
                  <p className="text-[10px] text-slate-500">Nữ hoàng truyền thông & Nhà hoạt động xã hội</p>
                </div>
              </div>
            </div>

            {/* Quote 6: Walter Elliot */}
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-100/80 rounded-3xl p-8 flex flex-col justify-between relative hover:shadow-xl hover:border-brand-blue/10 hover:-translate-y-1 transition-all duration-300">
              <span className="absolute top-4 right-6 text-7xl font-serif font-bold text-pink-500/10 select-none">“</span>
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-rose-50 text-rose-700 rounded-md">Từng bước nhỏ vững chãi</span>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium italic pt-2">
                  "Sự kiên trì không phải là một cuộc chạy đua đường dài; nó là nhiều cuộc chạy đua ngắn liên tiếp nhau."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center font-display font-extrabold text-xs text-rose-700">
                  WE
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Walter Elliot</h4>
                  <p className="text-[10px] text-slate-500">Chính trị gia & Nhà văn học xuất sắc</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. CONTACT & REGISTRATION SECTION */}
      <section id="register-form" className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column: Direct registration form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald animate-pulse" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Đăng ký khảo sát năng lực miễn phí</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display leading-tight text-slate-900">
                  Phụ Huynh & Học Sinh Đăng Ký Tư Vấn
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Đăng ký ngay lớp Toán trực tiếp do Thầy Nguyễn Đăng Thịnh & Cô Nguyễn Thị Quỳnh Như trực tiếp giảng dạy. Sau khi nộp danh sách khảo sát, thầy cô sẽ gọi điện tư vấn phân lớp học thích hợp nhất với trình độ thực tế của em.
                </p>

                {successMessage && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-brand-teal rounded-xl text-xs sm:text-sm font-semibold flex items-start gap-2.5 animate-fadeIn">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>{successMessage}</span>
                  </div>
                )}

                <form onSubmit={handleRegisterSubmit} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Họ tên học sinh <strong className="text-red-500">*</strong></label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Nguyễn Văn A"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-brand-blue-light focus:ring-1 focus:ring-brand-blue-light rounded-xl text-sm transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Số điện thoại Phụ huynh / Học sinh <strong className="text-red-500">*</strong></label>
                      <input
                        type="tel"
                        required
                        placeholder="Ví dụ: 0902312328"
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-brand-blue-light focus:ring-1 focus:ring-brand-blue-light rounded-xl text-sm transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Lớp học đăng ký</label>
                      <select
                        value={studentGrade}
                        onChange={(e) => setStudentGrade(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none cursor-pointer"
                      >
                        <option value="12">Lớp 12 - Luyện thi TN THPT & ĐGNL</option>
                        <option value="11">Lớp 11 - Học bứt phá khoa học</option>
                        <option value="10">Lớp 10 - Nền tảng kì diệu THPT</option>
                        <option value="9">Lớp 9 - Tuyển sinh lớp 10 bứt tốc</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Ưu tiên khóa học mong muốn</label>
                      <select
                        value={selectedClassId}
                        onChange={(e) => setSelectedClassId(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none cursor-pointer"
                      >
                        <option value="">-- Chọn Khóa khai giảng cụ thể (Nếu có) --</option>
                        {classSchedules.map((s) => (
                          <option key={s.id} value={s.id}>{s.className} ({s.timeFormatted} - {s.days.join(', ')})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Mục tiêu học tập hướng tới</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Cải thiện mất gốc Toán hình học, Ôn thi chuyên toán, đậu đại học bách khoa..."
                      value={targetGoal}
                      onChange={(e) => setTargetGoal(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-brand-blue-light focus:ring-1 focus:ring-brand-blue-light rounded-xl text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Ghi chú gửi thầy cô (Không bắt buộc)</label>
                    <textarea
                      rows={3}
                      placeholder="Thông tin thêm về học lực hiện tại môn Toán của con..."
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-brand-blue-light focus:ring-1 focus:ring-brand-blue-light rounded-xl text-sm outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-blue hover:bg-brand-royal text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                    id="submit-registration-btn"
                  >
                    <Send className="w-5 h-5" />
                    Gửi Đăng Ký Kiểm Tra Năng Lực & Học Thử
                  </button>
                </form>
              </div>

              {/* Show registration history locally to demonstrate active feedback */}
              {myRegistrations.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Lịch sử đăng ký của bạn trên máy này</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {myRegistrations.map((reg) => (
                      <div key={reg.id} className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between gap-4 text-xs">
                        <div>
                          <strong className="text-slate-800">{reg.studentName}</strong> -{' '}
                          <span className="text-slate-500">{reg.classInterest}</span>
                        </div>
                        <div className="flex items-center gap-1 text-brand-emerald font-semibold">
                          <Check className="w-4 h-4" />
                          <span>Hệ thống đã nhận ({reg.timestamp})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Dynamic Maps / Contact cards */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8">
              
              {/* Direct support information wrapper */}
              <div className="bg-gradient-to-tr from-brand-blue to-brand-royal text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-display text-white">Liên Hệ Trực Tiếp Để Đăng Ký</h3>
                  <p className="text-xs text-blue-100 mt-1">Lớp ôn thi toán chất lượng cao quy mô sỹ số nhỏ Thầy Thịnh Cô Như.</p>
                </div>

                <div className="space-y-4">
                  {/* Thay Thinh details */}
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                    <div className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">Thầy Nguyễn Đăng Thịnh (M.Sc)</div>
                    <div className="text-sm font-bold flex items-center justify-between">
                      <span>Điện thoại / Zalo: 0902.312.328</span>
                      <a 
                        href="tel:0902312328" 
                        className="p-1 px-2.5 bg-brand-emerald text-white text-[10px] rounded-lg hover:bg-brand-teal transition-colors"
                      >
                        Gọi ngay
                      </a>
                    </div>
                  </div>

                  {/* Co Nhu details */}
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                    <div className="text-[10px] uppercase font-bold text-teal-200 tracking-wider">Cô Nguyễn Thị Quỳnh Như (M.Sc)</div>
                    <div className="text-sm font-bold flex items-center justify-between">
                      <span>Điện thoại / Zalo: 0917.427.741</span>
                      <a 
                        href="tel:0917427741" 
                        className="p-1 px-2.5 bg-brand-emerald text-white text-[10px] rounded-lg hover:bg-brand-teal transition-colors"
                      >
                        Gọi ngay
                      </a>
                    </div>
                  </div>
                </div>

                {/* Important notices */}
                <div className="pt-4 border-t border-white/10 text-xs text-blue-200 leading-relaxed flex items-start gap-2">
                  <Info className="w-5 h-5 shrink-0 text-brand-amber mt-0.5" />
                  <span>
                    Học sinh tới học vui lòng liên hệ trước với Thầy Thịnh hoặc Cô Như để xếp lịch làm bài test chất lượng đầu vào (miễn phí), giúp thầy cô thấu hiểu thực lực chuẩn xác trước khi xếp lớp.
                  </span>
                </div>
              </div>

              {/* Location Map Placeholder Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <MapPin className="w-4 h-4 text-brand-orange" /> Địa Điểm Học Tập Trực Tiếp
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Học tập khang trang trực tiếp tại các cơ sở liên kết trung tâm chuẩn sư phạm, trang trí tràn đầy cảm hứng học liệu và hệ thống thông gió tiện nghi.
                  </p>
                </div>

                {/* Styled Vector Map Component */}
                <div className="my-4 bg-slate-900 text-slate-100 rounded-xl p-4 text-center border border-slate-800 relative overflow-hidden min-h-[140px] flex flex-col justify-center items-center">
                  {/* Subtle math watermark behind visual placeholder */}
                  <div className="absolute inset-0 opacity-10 font-mono text-[10px] select-none text-left p-2 overflow-hidden leading-tight">
                    Σ(x) y-axis x-axis graph vectors x² + y² = r² coordinate grid [0,0] [4,3] quadrant...
                  </div>
                  
                  <div className="relative z-10 space-y-2">
                    <MapPin className="w-8 h-8 text-brand-orange animate-bounce mx-auto" />
                    <div className="text-xs font-bold text-white font-display">Trung Tâm Liên Kết Phân Bổ Tiện Lợi</div>
                    <div className="text-[10px] text-slate-400">TP. Hồ Chí Minh (Liên hệ trực tiếp để chọn cơ sở gần bạn nhất)</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400 font-medium">Bảo mật thông tin đăng ký tuyệt đối</span>
                  <span className="text-[10px] font-bold text-brand-emerald bg-emerald-50 px-2 py-0.5 rounded">Hệ thống mở 24/7</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 9. FAQ / QUESTIONS SECTION (Accordion style) */}
      <section id="faq-section" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-brand-blue-light uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">Phụ huynh băn khoăn?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight text-slate-900 mt-3">
              Những Câu Hỏi Thường Gặp
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Giải đáp tổng hợp chi tiết nhất những băn khoăn của các bậc phụ huynh và các em học sinh khi đăng ký học Toán cùng Thầy Thịnh & Cô Như.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item) => {
              const isExpanded = expandedFaqId === item.id;
              return (
                <div 
                  key={item.id}
                  className="bg-slate-50 border border-slate-150 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : item.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                    id={`faq-btn-${item.id}`}
                  >
                    <span className="text-sm font-bold text-slate-900 pr-4">{item.question}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-brand-blue-light shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="px-6 pb-5 pt-1 border-t border-slate-200/50 animate-slideDown">
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. PREMIUM FOOTER */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-900">
            
            {/* Logo description */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue-light to-brand-royal flex items-center justify-center text-white font-display font-black text-lg shadow-inner">
                  ∑
                </div>
                <div>
                  <h3 className="font-display font-black text-sm text-white tracking-wider uppercase leading-tight">TOÁN THẠC SĨ</h3>
                  <p className="text-[10px] text-brand-emerald font-bold uppercase">Thầy Thịnh & Cô Như</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                Đơn vị bồi dưỡng kiến thức Toán học chất lượng cao từ cơ bản tới nâng cao vận dụng. Chuyên sâu rèn luyện bứt phá điểm số tối ưu kết quả thi THPT, ĐGNL & Lớp 10 Công lập.
              </p>
            </div>

            {/* Quick links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Chương Trình Học</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#schedule-section" className="hover:text-white transition-colors">Ôn thi THPT Quốc Gia (Lớp 12A & 12B)</a></li>
                <li><a href="#schedule-section" className="hover:text-white transition-colors">Bồi dưỡng Toán lớp 11</a></li>
                <li><a href="#schedule-section" className="hover:text-white transition-colors">Bồi dưỡng Toán lớp 10 mới</a></li>
                <li><a href="#schedule-section" className="hover:text-white transition-colors">Ôn thi Lớp 9 vào 10 chuyên sâu</a></li>
              </ul>
            </div>

            {/* Support channels */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Kênh Liên hệ Trực tiếp</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Phụ huynh vui lòng liên hệ Zalo hoặc số điện thoại hotline để hẹn giờ kiểm tra đầu vào của con:</p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-white font-semibold">Thầy Thịnh (Thạc sĩ Giải tích):</span>
                  <a href="tel:0902312328" className="text-brand-blue-light font-bold hover:underline">0902.312.328</a>
                </div>
                <div className="flex justify-between items-center bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-white font-semibold">Cô Như (Thạc sĩ Toán học):</span>
                  <a href="tel:0917427741" className="text-brand-emerald font-bold hover:underline">0917.427.741</a>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div>
              © 2026 Trung Tâm Toán Học Thạc Sĩ - Thầy Thịnh / Cô Như. All Rights Reserved.
            </div>
            <div className="flex items-center gap-4">
              <a href="#about-section" className="hover:text-slate-400 transition-colors">Về thầy cô</a>
              <span>•</span>
              <a href="#register-form" className="hover:text-slate-400 transition-colors">Quy trình học thử</a>
              <span>•</span>
              <span className="text-brand-emerald font-semibold">Tự hào kiến thiết ước mơ tri thức Việt</span>
              <span>•</span>
              <button 
                onClick={() => setIsSheetModalOpen(true)}
                className="text-slate-600 hover:text-brand-blue-light transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 inline-flex font-medium"
              >
                <Database className="w-3.5 h-3.5 shrink-0" />
                <span>Kết nối Google Sheet</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* 11. FLOATING INTERACTIVE CTA IN BOTTOM CORNER */}
      <div className="fixed bottom-6 right-6 z-[99]">
        
        {/* Toggleable Action Hub */}
        <div className="relative flex flex-col items-end">
          
          {/* Subtle pop-up contact sub-options */}
          {isCtaMenuOpen && (
            <div className="mb-3 bg-white border border-slate-150 rounded-2xl shadow-2xl p-4 w-72 space-y-3 animate-slideUp text-slate-800">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase text-brand-blue tracking-wider">Hỗ Trợ Zalo Trực Tiếp</span>
                <button 
                  onClick={() => setIsCtaMenuOpen(false)}
                  className="p-1 rounded hover:bg-slate-100 cursor-pointer text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                <a 
                  href="https://zalo.me/0902312328"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 hover:bg-blue-50/50 rounded-xl border border-blue-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={teacherImages['Thầy Nguyễn Đăng Thịnh']}
                      alt={teachers[0].name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold group-hover:text-brand-blue-light transition-colors">Thầy Thịnh (Thạc sĩ Giải tích)</div>
                    <div className="text-[10px] text-slate-500">Zalo: 0902312328 • Nhắn tin ngay</div>
                  </div>
                </a>

                <a 
                  href="https://zalo.me/0917427741"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 hover:bg-emerald-50/50 rounded-xl border border-emerald-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={teacherImages['Cô Nguyễn Thị Quỳnh Như']}
                      alt={teachers[1].name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold group-hover:text-brand-emerald transition-colors">Cô Như (Thạc sĩ Toán học)</div>
                    <div className="text-[10px] text-slate-500">Zalo: 0917427741 • Nhắn tin ngay</div>
                  </div>
                </a>
              </div>
              <p className="text-[9px] text-slate-400 italic text-center">Bấm để tự động mở ứng dụng Zalo chat tức thì</p>
            </div>
          )}

          {/* Core Primary CTA Pulse button */}
          <button
            onClick={() => setIsCtaMenuOpen(!isCtaMenuOpen)}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-blue-light to-brand-emerald text-white flex flex-col items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer relative group"
            id="floating-zalo-cta"
            aria-label="Contact via Zalo"
          >
            {/* Absolute custom glowing ring animation */}
            <span className="absolute inset-x-0 inset-y-0 rounded-full border-4 border-brand-blue-light animate-ping opacity-25 pointer-events-none" />
            
            {/* Zalo branding SVG represent */}
            <svg 
              className="w-8 h-8 fill-current text-white group-hover:rotate-12 transition-transform duration-200" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.119 2 11.2c0 2.915 1.5 5.515 3.864 7.152a.81.81 0 01.32.721c-.085.602-.452 2.224-.509 2.477-.07.31-.226.792.056.985.163.111.45.03.626-.065.253-.135 2.19-.135 2.875-.76s1.613-.67 1.613-.67a11.1 11.1 0 001.155.06c5.523 0 10-4.12 10-9.2C22 6.119 17.523 2 12 2z" />
            </svg>
            <span className="text-[8px] font-bold tracking-tight uppercase leading-none mt-0.5">Zalo Chat</span>
          </button>

        </div>

      </div>

      {/* Premium Photo Modal */}
      {editingTeacher && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden text-slate-800 animate-scaleUp">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue-light flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Dùng ảnh thật của Thầy Cô</h3>
                  <p className="text-[11px] text-slate-400">Thiết lập ảnh thực tế thay cho ảnh minh họa AI</p>
                </div>
              </div>
              <button 
                onClick={() => setEditingTeacher(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Thầy cô đang chọn</span>
                <div className="bg-slate-50 p-2.5 rounded-xl text-xs font-bold text-slate-800 border border-slate-100">
                  {editingTeacher.name}
                </div>
              </div>

              {/* Method 1: Upload real image file */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Cách 1: Tải file ảnh thực tế (PNG/JPG/WEBP)</span>
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-200 hover:border-brand-blue-light rounded-xl cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-all group">
                  <div className="flex flex-col items-center justify-center pt-3 pb-3">
                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-brand-blue-light transition-colors mb-1.5" />
                    <p className="text-[11px] text-slate-500 font-medium text-center px-4">Click để chọn file ảnh thật từ máy của bạn</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">PNG, JPG, JPEG (Load trực tiếp ngay tức thì)</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageFileChange} 
                  />
                </label>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink mx-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Hoặc</span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

              {/* Method 2: Insert URL */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-700 block">Cách 2: Chèn link ảnh thật (Facebook, Zalo, Drive...)</span>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Link className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    value={inputPhotoUrl.startsWith('data:') ? '' : inputPhotoUrl}
                    onChange={(e) => setInputPhotoUrl(e.target.value)}
                    placeholder="https://example.com/anh_that_cua_thay_co.jpg"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-brand-blue-light focus:border-brand-blue-light outline-none"
                  />
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Dán link ảnh từ bất kì nguồn nào (Zalo, Facebook, Google Drive công khai, v.v.). Link ảnh sẽ được tải trực tiếp.
                </p>
              </div>

              {/* Reset to AI default */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-500">Đặt lại ảnh mẫu AI?</span>
                <button
                  type="button"
                  onClick={() => {
                    const defaultUrl = editingTeacher.key === 'img_thay_thinh' ? teachers[0].avatarUrl : teachers[1].avatarUrl;
                    setInputPhotoUrl(defaultUrl);
                  }}
                  className="text-xs font-bold text-brand-blue-light hover:text-brand-blue cursor-pointer transition-colors"
                >
                  Khôi phục ảnh mẫu gốc
                </button>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingTeacher(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-white text-slate-600 rounded-xl text-xs font-bold cursor-pointer transition-all"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={() => {
                  if (editingTeacher) {
                    localStorage.setItem(editingTeacher.key, inputPhotoUrl);
                    setTeacherImages(prev => ({
                      ...prev,
                      [editingTeacher.name]: inputPhotoUrl
                    }));
                    setEditingTeacher(null);
                  }
                }}
                className="px-5 py-2.5 bg-brand-blue-light hover:bg-brand-blue text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-md hover:shadow-lg"
              >
                Áp dụng ảnh thật
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 12. Google Sheets Integration Modal */}
      {isSheetModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 text-slate-800 animate-scaleUp">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">Tích Hợp Google Sheets</h3>
                  <p className="text-xs text-slate-400">Tự động đồng bộ danh sách học sinh đăng ký tư vấn sang Google Sheet của thầy cô</p>
                </div>
              </div>
              <button 
                onClick={() => setIsSheetModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Instructions section  */}
              <div className="space-y-3">
                <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider block">Các bước thiết lập nhanh trong 2 phút:</span>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-normal">
                  <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-700 block text-xs">Bước 1: Mở Apps Script</span>
                    <p className="text-slate-500 text-[11px]">
                      Mở file Google Sheet của thầy cô, chọn <b>Tiện ích mở rộng</b> &gt; <b>Apps Script</b>.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-700 block text-xs">Bước 2: Dán Code bên dưới</span>
                    <p className="text-slate-500 text-[11px]">
                      Xóa sạch mã cũ trong tệp <code className="bg-slate-200/60 px-1 py-0.5 rounded text-[10px]">Mã.gs</code>, dán toàn bộ đoạn mã Apps Script bên dưới vào rồi nhấn <b>Ghi lại (Ctrl + S)</b>.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-700 block text-xs">Bước 3: Triển khai Web App</span>
                    <p className="text-slate-500 text-[11px]">
                      Nhấp <b>Triển khai</b> &gt; <b>Triển khai mới</b>. Chọn loại <b>Ứng dụng web</b>. Đặt quyền truy cập là <b>Mọi người (Anyone)</b>. Nhấn "Triển khai", sao chép URL rồi dán vào ô bên dưới.
                    </p>
                  </div>
                </div>
              </div>

              {/* Code copy block */}
              <div className="space-y-1.5 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Mã Google Apps Script cần sao chép:</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(APPS_SCRIPT_CODE);
                      setIsCopySuccess(true);
                      setTimeout(() => setIsCopySuccess(false), 2000);
                    }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5 transition-all ${
                      isCopySuccess 
                        ? 'bg-emerald-500 text-white shadow-md' 
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {isCopySuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Đã sao chép Apps Script!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép mã nguồn</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <pre className="p-4 bg-slate-900 text-slate-300 text-[10px] sm:text-[11px] font-mono rounded-xl overflow-x-auto max-h-40 shadow-inner border border-slate-950">
                    {APPS_SCRIPT_CODE}
                  </pre>
                  <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none rounded-b-xl"></div>
                </div>
              </div>

              {/* URL Input Form */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                  Cấu hình URL ứng dụng web (Web App URL):
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Database className="w-4 h-4 text-emerald-500" />
                  </span>
                  <input
                    type="text"
                    value={sheetsWebappUrl}
                    onChange={(e) => setSheetsWebappUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycbz..._WjC/exec"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none shadow-sm placeholder:text-slate-400"
                  />
                </div>
                
                {sheetsWebappUrl ? (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2 text-emerald-800 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                    <span>Tích hợp Google Sheets đang <b>KÍCH HOẠT</b>. Mọi lượt đăng ký của học sinh sẽ tự động cập nhật ngay lập tức.</span>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-800 text-[11px]">
                    <span>Hiện thông tin đang được thu thập lưu tại Local Storage trên trình duyệt của học viên. Thầy cô hãy kết nối URL để lưu trữ vĩnh viễn trên Sheets nhé!</span>
                  </div>
                )}
              </div>

              {/* Target Sheet display info */}
              <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 text-[11px] leading-relaxed text-slate-500 space-y-1">
                <span className="font-extrabold text-slate-700 block">Link bảng tính đích:</span>
                <a 
                  href="https://docs.google.com/spreadsheets/d/1HB1g-7cYY2Lk__-oGH6TpImVkSlbrWhA8bciGCFJIik/edit?usp=sharing"
                  target="_blank" 
                  rel="noreferrer"
                  className="text-brand-blue-light font-bold flex items-center gap-1 hover:underline break-all"
                >
                  <span>https://docs.google.com/spreadsheets/d/1HB1g-7cYY2Lk__-oGH6TpImVkSlbrWhA8bciGCFJIik/edit?usp=sharing</span>
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Thầy cô có muốn xóa tích hợp Google Sheet này?')) {
                    localStorage.removeItem('sigma_math_gsheet_url');
                    setSheetsWebappUrl('');
                    setIsSheetModalOpen(false);
                    alert('Đã xóa cấu hình thành công.');
                  }
                }}
                className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl"
              >
                Hủy kết nối
              </button>
              
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsSheetModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold cursor-pointer transition-all"
                >
                  Đóng lại
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const cleanUrl = sheetsWebappUrl.trim();
                    if (!cleanUrl || !cleanUrl.includes('script.google.com')) {
                      alert('Vui lòng dán đúng định dạng URL Apps Script (có dạng https://script.google.com/macros/s/.../exec)');
                      return;
                    }
                    localStorage.setItem('sigma_math_gsheet_url', cleanUrl);
                    setIsSheetModalOpen(false);
                    alert('Kết nối thành công! Toàn bộ đăng ký tư vấn mới sẽ tự động cập nhật ngay tức thì.');
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-md hover:shadow-lg"
                >
                  Lưu cấu hình
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
