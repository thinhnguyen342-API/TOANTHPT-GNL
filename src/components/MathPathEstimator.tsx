import { useState } from 'react';
import { Sparkles, Trophy, BookOpen, Clock, ChevronRight, Check } from 'lucide-react';

interface EstimatorResult {
  recommendedClass: string;
  focusTopics: string[];
  estimatedHours: number;
  strategy: string;
  successRate: string;
  buttonClassId: string;
}

export default function MathPathEstimator() {
  const [grade, setGrade] = useState<'9' | '10' | '11' | '12'>('12');
  const [currentScore, setCurrentScore] = useState<string>('5-7');
  const [targetScore, setTargetScore] = useState<string>('8-9');

  // Simple rule-based engine to determine custom roadmap
  const calculateRoadmap = (): EstimatorResult => {
    if (grade === '12') {
      if (currentScore === 'under5') {
        return {
          recommendedClass: 'Lớp 12B (Lớp học lấy lại gốc & Bồi dưỡng lấy 8+)',
          focusTopics: [
            'Hệ thống hóa toàn bộ lý thuyết hàm số lý thuyết trọng tâm.',
            'Phục hồi kĩ năng biến đổi mũ - logarit cơ bản.',
            'Kỹ năng đọc đồ thị & xử lý phương trình lượng giác bằng sơ đồ.',
            'Công thức tính nhanh thể tích khối đa diện.'
          ],
          estimatedHours: 48,
          strategy: 'Tập trung bù đọng rỗng kiến thức, rèn luyện lấp đầy các câu hỏi nhận biết và thông hiểu (Mức độ 1 & 2 trong đề thi THPT QG). Chưa vội học phần vận dụng cao.',
          successRate: '92% học viên lấy lại gốc và đạt từ 7.5đ - 8.2đ sau 3 tháng.',
          buttonClassId: 'l12b'
        };
      } else if (currentScore === '5-7') {
        return {
          recommendedClass: 'Lớp 12B hoặc Lớp 12A (Chuyển tiếp nâng cao)',
          focusTopics: [
            'Phân tích đồ thị hàm số chứa dấu giá trị tuyệt đối.',
            'Công thức giải nhanh tọa độ hóa không gian Oxyz.',
            'Xử lý cực trị hình học không gian.',
            'Tính đơn điệu và cực trị hàm số liên kết.'
          ],
          estimatedHours: 64,
          strategy: 'Tập trung rèn luyện phản xạ tăng tốc ở 35 câu đầu dưới 15 phút, giải quyết chắc chắn các câu thông hiểu - vận dụng để tiến sâu vào vùng điểm 8.0 - 8.8.',
          successRate: '88% đạt trên 8.5 điểm trong kỳ thi chính thức.',
          buttonClassId: 'l12b'
        };
      } else {
        return {
          recommendedClass: 'Lớp 12A (Lớp chuyên sâu vận dụng cao 9+)',
          focusTopics: [
            'Phương pháp hàm số đặc trưng trong phương trình mũ - logarit.',
            'Cực trị số phức vận dụng cao (hình học & đại số).',
            'Tích phân hàm ẩn và hệ thức truy hồi.',
            'Giải nhanh toán thực tế và đề toán ĐGNL ĐHQG.'
          ],
          estimatedHours: 80,
          strategy: 'Chuyên đề thực chiến các câu hỏi lấy điểm 9+ trong đề thi THPT QG và ĐGNL. Rèn luyện kĩ năng phản xạ giải đề nâng cao, tối đa hóa thời gian làm bài.',
          successRate: '95% học viên lớp 12A đỗ nguyện vọng 1 Đại học TOP đầu.',
          buttonClassId: 'l12a'
        };
      }
    } else if (grade === '11') {
      return {
        recommendedClass: 'Lớp 11 (Toán 11 chất lượng cao)',
        focusTopics: [
          'Giải tích 11: Tổ hợp - Xác suất nâng cao, cấp số cộng số nhân.',
          'Giới hạn & Liên tục của chuỗi số hàm số.',
          'Vectơ trong không gian & Quan hệ vuông góc (Khó nhất lớp 11).',
          'Đạo hàm & Tiếp tuyến của đồ thị hàm số.'
        ],
        estimatedHours: 54,
        strategy: 'Học vượt chương trình học khoa học để có nhiều thời gian luyện đề sớm cho kỳ thi THPT Quốc Gia từ đầu năm lớp 12.',
        successRate: '90% học sinh đứng TOP đầu học tập tại trường sau 2 tháng học.',
        buttonClassId: 'l11'
      };
    } else if (grade === '10') {
      return {
        recommendedClass: 'Lớp 10 (Nền tảng Toán cấp 3 & Tư duy logic)',
        focusTopics: [
          'Mệnh đề tập hợp & Phương pháp chứng minh toán học.',
          'Hàm số bậc hai và ứng dụng đồ thị nâng cao.',
          'Hệ thức lượng trong tam giác và ứng dụng thực tế vector.',
          'Phương pháp tọa độ hóa Oxy & Đường tròn.'
        ],
        estimatedHours: 40,
        strategy: 'Làm quen tư duy mới tại cấp trung học phổ thông, giảm thiểu bỡ ngỡ giữa cách học tự luận sâu rộng lớp 9 và lý thuyết trắc nghiệm đa năng lớp 10.',
        successRate: '100% học viên tự tin vượt qua chuỗi bài kiểm tra đầu tiên đạt điểm 8.0+.',
        buttonClassId: 'l10'
      };
    } else {
      return {
        recommendedClass: 'Lớp 9 (Chuyên đề Chinh phục Kỳ thi vào 10)',
        focusTopics: [
          'Kỹ thuật biến đổi rút gọn biểu thức chứa căn bậc hai cực nhanh.',
          'Biện luận nghiệm phương trình bậc hai & Định lý Vi-ét nâng cao.',
          'Hình học chuyên đề: Chứng minh tứ giác nội tiếp, điểm cố định và cực trị hình học.',
          'Giải bài toán bằng cách lập phương trình/hệ phương trình thực tế.'
        ],
        estimatedHours: 72,
        strategy: 'Hệ thống hóa toàn diện các chuyên đề cấu trúc đề thi tuyển sinh lớp 10 của Sở GD&ĐT. Thực chiến 30+ bộ đề thi thử chất lượng cao từ cơ bản đến nâng cao bậc nhất.',
        successRate: '96.5% học sinh đỗ trường Công lập nguyện vọng 1 và Chuyên Toán.',
        buttonClassId: 'l9'
      };
    }
  };

  const currentResult = calculateRoadmap();

  return (
    <div id="estimator-section" className="bg-white rounded-3xl border border-blue-100 shadow-xl overflow-hidden glow-blue">
      {/* Target headers */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-royal text-white p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-500/20 backdrop-blur-md rounded-lg text-brand-amber">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-blue-200">Công cụ độc quyền</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-display leading-tight">Thiết Kế Lộ Trình Toán Bứt Phá</h3>
        <p className="text-xs sm:text-sm text-blue-100 mt-1">Chỉ với 3 giây để nhận đánh giá chi tiết định hướng mục tiêu học tập từ Thạc Sĩ.</p>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Form Side */}
          <div className="space-y-6">
            {/* Step 1: Grade Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-brand-blue-light text-xs font-bold">1</span>
                Chọn khối lớp học hiện tại:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['9', '10', '11', '12'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrade(g)}
                    className={`py-2.5 rounded-xl border text-center font-semibold transition-all duration-200 cursor-pointer ${
                      grade === g
                        ? 'bg-brand-blue-light border-brand-blue-light text-white shadow-md scale-[1.03]'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Lớp {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Current Score Selection (Only for grade 12 to detail results, others are automatic) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-brand-blue-light text-xs font-bold">2</span>
                Mức điểm trung bình hiện tại môn Toán:
              </label>
              {grade === '12' ? (
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentScore('under5')}
                    className={`p-2.5 rounded-xl border text-sm text-center font-medium transition-all cursor-pointer ${
                      currentScore === 'under5'
                        ? 'bg-brand-blue-light border-brand-blue-light text-white shadow-md'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Yếu / Mất gốc (&lt; 5.0)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentScore('5-7')}
                    className={`p-2.5 rounded-xl border text-sm text-center font-medium transition-all cursor-pointer ${
                      currentScore === '5-7'
                        ? 'bg-brand-blue-light border-brand-blue-light text-white shadow-md'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Khá (5.0 - 7.5)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentScore('8up')}
                    className={`p-2.5 rounded-xl border text-sm text-center font-medium transition-all cursor-pointer ${
                      currentScore === '8up'
                        ? 'bg-brand-blue-light border-brand-blue-light text-white shadow-md'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Vững vàng (&gt; 7.5)
                  </button>
                </div>
              ) : (
                <div className="bg-gray-50 text-gray-500 rounded-xl p-3 border border-gray-150 text-xs">
                  Chương trình Lớp {grade} bao gồm phân hóa sâu từ mất gốc đến nâng cao trong cấu trúc giảng dạy đồng bộ của thầy cô.
                </div>
              )}
            </div>

            {/* Step 3: Target Target Score */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-brand-blue-light text-xs font-bold">3</span>
                Kỳ vọng điểm số đạt được mục tiêu:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTargetScore('under8')}
                  disabled={grade !== '12' && currentScore === '8up'}
                  className={`p-2.5 rounded-xl border text-sm text-center font-medium transition-all cursor-pointer ${
                    targetScore === 'under8'
                      ? 'bg-brand-blue text-white'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Đạt Điểm 7.5 - 8.0
                </button>
                <button
                  type="button"
                  onClick={() => setTargetScore('8-9')}
                  className={`p-2.5 rounded-xl border text-sm text-center font-medium transition-all cursor-pointer ${
                    targetScore === '8-9'
                      ? 'bg-brand-blue text-white'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Đạt Điểm 8.0 - 9.0
                </button>
                <button
                  type="button"
                  onClick={() => setTargetScore('9up')}
                  className={`p-2.5 rounded-xl border text-sm text-center font-medium transition-all cursor-pointer ${
                    targetScore === '9up'
                      ? 'bg-brand-blue text-white'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Xây dựng Điểm 9.5+
                </button>
              </div>
            </div>
          </div>

          {/* Results Side */}
          <div className="bg-slate-50 border border-slate-150 rounded-2xl p-6 relative flex flex-col justify-between">
            <div className="absolute top-4 right-4 text-brand-orange">
              <Trophy className="w-8 h-8 opacity-20" />
            </div>

            <div className="space-y-5">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-brand-orange/10 text-brand-orange rounded-full">Lộ Trình Đề Xuất</span>
                <h4 className="text-lg font-bold text-brand-blue font-display mt-2">{currentResult.recommendedClass}</h4>
              </div>

              <div>
                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-brand-blue-light" /> nội dung trọng tâm thiết yếu:
                </h5>
                <ul className="space-y-1.5">
                  {currentResult.focusTopics.map((topic, i) => (
                    <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                      <Check className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  Phương án sư phạm tối ưu:
                </h5>
                <p className="text-xs text-gray-600 italic leading-relaxed">{currentResult.strategy}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-emerald shrink-0" />
                <div>
                  <div className="text-sm font-bold text-gray-800">{currentResult.estimatedHours} giờ học trực tiếp</div>
                  <div className="text-[10px] text-gray-400">Cam kết {currentResult.successRate}</div>
                </div>
              </div>

              {/* Scroll directly to scheduling/registration */}
              <a
                href="#register-form"
                onClick={(e) => {
                  const el = document.getElementById('register-form');
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-brand-emerald hover:bg-brand-teal text-white font-semibold text-xs py-2.5 px-4 rounded-xl text-center shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-1 cursor-pointer"
              >
                Nhận Lộ Trình Tư Vấn
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
