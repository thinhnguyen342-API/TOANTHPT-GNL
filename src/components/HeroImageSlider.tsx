import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    url: 'https://lh3.googleusercontent.com/d/1-pu9aCtyggD0u1ZwujPM1iXgvjfjKsk9',
    title: 'Giải phóng tư duy toán học toàn diện',
    description: 'Sự kết hợp hoàn hảo giữa toán học trực quan sinh động và phương pháp sư phạm đỉnh cao.',
    badge: 'MÔ HÌNH HỌC TẬP TƯ DUY'
  },
  {
    url: 'https://lh3.googleusercontent.com/d/10ARWGjWX8qihi8F7OJ5ajs_0XQOMbONv',
    title: 'Học tập năng động, bứt phá giới hạn',
    description: 'Nâng cao khả năng phân tích độc lập thông qua hệ thống bài tập thực hành cô đọng.',
    badge: 'TƯ DUY ĐỘT PHÁ'
  },
  {
    url: 'https://lh3.googleusercontent.com/d/1QCYGffE-PFFzk3NzGCJR_rfTgUUaykdX',
    title: 'Chương trình dạy học chất lượng cao',
    description: 'Sát sao tiến trình học tập của từng học viên nhằm tối đa hóa cá nhân hóa hiệu quả.',
    badge: 'CHẤT LƯỢNG TIÊN PHONG'
  },
  {
    url: 'https://lh3.googleusercontent.com/d/1wD3HyLGrxzjVQ_Of4v9f7oC7RgF-SZpZ',
    title: 'Đồng hành chinh phục mọi kỳ thi lớn',
    description: 'Luyện thi chuyên Đại học, thi HSG cấp Thành phố và kỳ thi tốt nghiệp THPT Quốc Gia.',
    badge: 'LUYỆN THI ĐỈNH CAO'
  }
];

export default function HeroImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // changes slide every 5 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 375); // Half of transition duration to swap source smoothly
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 375);
  };

  const goToSlide = (slideIndex: number) => {
    if (isTransitioning || slideIndex === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(slideIndex);
      setIsTransitioning(false);
    }, 375);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-blue-100/65 bg-white group hover:shadow-3xl transition-all duration-300 z-10">
      {/* Upper Floating Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-blue/90 text-white px-3 py-1.5 rounded-full inline-block backdrop-blur-md shadow-md transition-all duration-500">
          {HERO_SLIDES[currentIndex].badge}
        </span>
      </div>

      {/* Slide Index Counter Badge */}
      <div className="absolute top-4 right-4 z-20">
        <span className="text-[10px] sm:text-xs font-semibold py-1 px-2.5 bg-slate-950/70 text-slate-200 rounded-md inline-block backdrop-blur-sm shadow-sm select-none">
          {currentIndex + 1} / {HERO_SLIDES.length}
        </span>
      </div>

      {/* Main Image Slider Frame */}
      <div className="aspect-[16/10] overflow-hidden bg-slate-950 relative w-full">
        <img
          src={HERO_SLIDES[currentIndex].url}
          alt={HERO_SLIDES[currentIndex].title}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-in-out ${
            isTransitioning ? 'opacity-30 scale-95' : 'opacity-100 scale-100 group-hover:scale-105'
          }`}
          referrerPolicy="no-referrer"
        />
        {/* Atmospheric ambient color gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent"></div>

        {/* Manual Left Arrow Controller */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-slate-950/30 text-white hover:bg-slate-900/80 rounded-full cursor-pointer z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 duration-300 border border-white/10 active:scale-95"
          id="hero-slider-prev-btn"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Manual Right Arrow Controller */}
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-slate-950/30 text-white hover:bg-slate-900/80 rounded-full cursor-pointer z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 duration-300 border border-white/10 active:scale-95"
          id="hero-slider-next-btn"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Navigation Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-slate-950/20 px-3 py-1.5 rounded-full backdrop-blur-[2px]">
          {HERO_SLIDES.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                slideIndex === currentIndex
                  ? 'bg-white w-5'
                  : 'bg-white/40 hover:bg-white/70'
              }`}
              title={`Trượt đến ảnh thứ ${slideIndex + 1}`}
              id={`hero-slider-dot-${slideIndex}`}
            />
          ))}
        </div>
      </div>

      {/* Dynamic Animated Text Footer Content synced with slide */}
      <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">
            Live Classroom Insight
          </span>
        </div>
        <h3 className={`text-base font-bold font-display leading-snug transition-all duration-500 ${
          isTransitioning ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
        }`}>
          {HERO_SLIDES[currentIndex].title}
        </h3>
        <p className={`text-xs text-slate-400 mt-1 leading-relaxed transition-all duration-500 delay-75 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}>
          {HERO_SLIDES[currentIndex].description}
        </p>
      </div>
    </div>
  );
}
