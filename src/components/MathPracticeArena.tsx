import React, { useState } from 'react';
import { Check, X, Copy, RotateCcw, ShieldAlert, Award, FileSpreadsheet, Eye } from 'lucide-react';

interface QuestionTrueFalse {
  id: string;
  label: string;
  assertion: string;
  correctAnswer: 'true' | 'false';
  explanation: string;
}

export default function MathPracticeArena() {
  const [activeTab, setActiveTab] = useState<'multiple' | 'true_false' | 'short'>('multiple');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // States for Multiple Choice QA
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [multipleChecked, setMultipleChecked] = useState(false);

  // States for True/False QA
  const [tfAnswers, setTfAnswers] = useState<Record<string, 'true' | 'false' | null>>({
    tf_a: null,
    tf_b: null,
    tf_c: null,
    tf_d: null,
  });
  const [tfChecked, setTfChecked] = useState(false);

  // States for Short Answer QA
  const [shortAnswerInput, setShortAnswerInput] = useState('');
  const [shortChecked, setShortChecked] = useState(false);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Multiple Choice Question Config
  const mcQuestion = {
    title: "Câu 1: Khối Vật Thể Viviani Nâng Cao",
    questionHtml: "Tính thể tích $V$ của khối vật thể Viviani giới hạn đồng thời bên trong mặt cầu bán kính $R = 3$ và bên trong mặt trụ tròn xoay có trục đi qua tâm cầu và bán kính đáy bằng $1.5$.",
    options: [
      { id: 'A', text: '18 * (π - 4/3)', formulaHtml: '18 \\cdot (\\pi - \\frac{4}{3})', correct: true },
      { id: 'B', text: '6 * (π - 4/3)', formulaHtml: '6 \\cdot (\\pi - \\frac{4}{3})', correct: false },
      { id: 'C', text: '16/3 * (π - 4/3)', formulaHtml: '\\frac{16}{3} \\cdot (\\pi - \\frac{4}{3})', correct: false },
      { id: 'D', text: '12 * (π - 4/3)', formulaHtml: '12 \\cdot (\\pi - \\frac{4}{3})', correct: false },
    ],
    explanation: "Áp dụng trực tiếp công thức tích phân nâng cao từ tài liệu học tập của Toán Thạc Sĩ: V = 2/3 * R³ * (π - 4/3). Thay R = 3 vào ta có V = (2/3) * 27 * (π - 4/3) = 18 * (π - 4/3).",
    latexEx: `\\begin{ex}[Trắc nghiệm nhiều lựa chọn - Câu hỏi Viviani]
Tính thể tích $V$ của khối vật thể Viviani giới hạn đồng thời bên trong mặt cầu bán kính $R = 3$ và bên trong mặt trụ tròn xoay có trục đi qua tâm đường tròn lớn của mặt cầu.
\\choice
{\\true $V = 18\\left(\\pi - \\frac{4}{3}\\right)$}
{$V = 6\\left(\\pi - \\frac{4}{3}\\right)$}
{$V = \\frac{16}{3}\\left(\\pi - \\frac{4}{3}\\right)$}
{$V = 12\\left(\\pi - \\frac{4}{3}\\right)$}
\\loigiai{
Áp dụng công thức thể tích khối Viviani: $V = \\frac{2}{3} R^3 \\left(\\pi - \\frac{4}{3}\\right)$.
Với $R = 3$, ta có: $V = \\frac{2}{3} \\cdot 3^3 \\cdot \\left(\\pi - \\frac{4}{3}\\right) = 18\\left(\\pi - \\frac{4}{3}\\right)$.
}
\\end{ex}`
  };

  // True/False assertions Config
  const tfQuestions: QuestionTrueFalse[] = [
    {
      id: 'tf_a',
      label: 'a)',
      assertion: 'Diện tích mặt cong của phần chỏm cầu trên là S = 20π.',
      correctAnswer: 'true',
      explanation: 'Công thức S = 2πRh. Với R = 5 và h = 2 => S = 2 * π * 5 * 2 = 20π (Khẳng định ĐÚNG).'
    },
    {
      id: 'tf_b',
      label: 'b)',
      assertion: 'Bán kính đường tròn mặt phẳng cắt cắt chỏm r = 4.',
      correctAnswer: 'true',
      explanation: 'Theo Pi-ta-go ta có r² = R² - (R-h)² = 5² - (5-2)² = 25 - 9 = 16 => r = 4 (Khẳng định ĐÚNG).'
    },
    {
      id: 'tf_c',
      label: 'c)',
      assertion: 'Thể tích khối chỏm cầu này bằng 52π/3.',
      correctAnswer: 'true',
      explanation: 'Tính theo công thức V = π * h² * (R - h/3) = π * 4 * (5 - 2/3) = 4π * 13/3 = 52π/3 (Khẳng định ĐÚNG).'
    },
    {
      id: 'tf_d',
      label: 'd)',
      assertion: 'Nếu ta giữ nguyên chiều cao h = 2 và gấp đôi bán kính cầu mẹ R = 10, thể tích chỏm cầu thu hồi sẽ gấp hai lần ban đầu.',
      correctAnswer: 'false',
      explanation: 'Ta thấy V = π * h² * (R - h/3). Khi R tăng lên gấp đôi, thể tích mới là V\' = π * 4 * (10 - 2/3) = 4π * 28/3 = 112π/3. Tỉ số V\' / V = 112/52 = 28/13 ≈ 2.15 lần chứ không phải đúng 2 lần (Khẳng định SAI).'
    }
  ];

  const tfLatexEx = `\\begin{ex}[Câu hỏi Đúng/Sai - Chỏm cầu]
Cho khối chỏm cầu cắt bớt ra từ khối cầu mẹ bán kính $R = 5$, chiều cao phần chỏm cầu thu lại là $h = 2$. Các phát biểu sau đây là đúng hay sai?
\\choiceTF
{\\true a) Diện tích mặt cong của chỏm cầu bằng $20\\pi$.}
{\\true b) Bán kính của đường tròn cắt dẹt phần đáy chỏm cầu là $r = 4$.}
{\\true c) Thể tích của phần khối chỏm cầu là $V = \\frac{52\\pi}{3}$.}
{\\false d) Nếu giữ nguyên chiều cao $h = 2$, nhân đôi bán kính cầu mẹ $R = 10$ thì thể tích chỏm cầu tăng đúng hai lần.}
\\loigiai{
a) $S = 2\\pi Rh = 20\\pi$. (Đúng) \\\\
b) $r = \\sqrt{R^2 - (R-h)^2} = \\sqrt{25-9} = 4$. (Đúng) \\\\
c) $V = \\pi h^2\\left(R-\\frac{h}{3}\\right) = \\pi \\cdot 4 \\cdot \\left(5 - \\frac{2}{3}\\right) = \\frac{52\\pi}{3}$. (Đúng) \\\\
d) Khi thay đổi, thể tích mới là $\\frac{112\\pi}{3}$, tỉ lệ tăng $2.15$ lần. (Sai)
}
\\end{ex}`;

  // Short Answer Config
  const shortQuestion = {
    title: "Câu 3: Tính toán nhanh Thể tích lăng trụ cụt Mái Nhà",
    questionHtml: "Cho khối \"Mái Nhà\" (lăng trụ cụt) có đáy là một hình chữ nhật kích thước chiều rộng a = 4, chiều dài L = 6. Cạnh đỉnh mác nhọn song song với chiều dài đáy và có độ dài a₁ = 2. Chiều cao từ đỉnh mác đến mặt phẳng đáy h = 3. Hãy tính thể tích V của khối đa diện này.",
    solutionNumber: "30",
    explanation: "Dựa vào công thức độc quyền: V = (L * h / 6) * (2a + a_1). Thay số ta được: V = (6 * 3 / 6) * (2 * 4 + 2) = 3 * (8 + 2) = 30 m³. Giá trị cần điền là số nguyên 30.",
    latexEx: `\\begin{ex}[Bài toán Trả lời ngắn - Khối Mái nhà]
Cho khối lăng trụ cụt "Mái Nhà" có đáy hình chữ nhật rộng $a = 4$, dài $L = 6$. Miệng song song đáy có cạnh bóp $a_1 = 2$, chiều cao nối thẳng đứng $h = 3$. Tính thể tích $V$ của khối này.
\\loigiai{
Áp dụng công thức lăng trụ cụt mái nhà:
\\[ V = \\frac{L \\cdot h}{6}(2a + a_1) = \\frac{6 \\cdot 3}{6}(2\\cdot 4 + 2) = 3 \\cdot 10 = 30. \\]
Học sinh tự động điền giá trị số: $30$.
}
\\end{ex}`
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xl" id="practice-arena">
      
      {/* HEADER COZY BAR */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-brand-blue-light to-brand-royal flex items-center justify-center text-white font-mono select-none text-sm sm:text-base shrink-0">
            ex
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold font-display text-white truncate">Góc Khảo Thí Trực Quan</h3>
            <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">Chuẩn khung đề thi trắc nghiệm Bộ GD&ĐT mới nhất</p>
          </div>
        </div>

        {/* TAB BUTTONS - Horizontal Fluid Ribbon on Mobile with no wrap */}
        <div className="flex items-center p-1 bg-slate-800 rounded-xl border border-slate-700/60 text-[11px] sm:text-xs text-slate-300 font-semibold overflow-x-auto w-full md:w-auto scrollbar-none flex-nowrap">
          <button 
            onClick={() => setActiveTab('multiple')} 
            className={`px-3.5 py-2 rounded-lg transition-all shrink-0 cursor-pointer ${activeTab === 'multiple' ? 'bg-brand-blue-light text-white shadow-md' : 'hover:text-white'}`}
          >
            Trắc Nghiệm (A,B,C,D)
          </button>
          <button 
            onClick={() => setActiveTab('true_false')} 
            className={`px-3.5 py-2 rounded-lg transition-all shrink-0 cursor-pointer ${activeTab === 'true_false' ? 'bg-brand-blue-light text-white shadow-md' : 'hover:text-white'}`}
          >
            Đúng / Sai
          </button>
          <button 
            onClick={() => setActiveTab('short')} 
            className={`px-3.5 py-2 rounded-lg transition-all shrink-0 cursor-pointer ${activeTab === 'short' ? 'bg-brand-blue-light text-white shadow-md' : 'hover:text-white'}`}
          >
            Trả Lời Ngắn
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* ==================== TAB 1: MULTIPLE CHOICE ==================== */}
        {activeTab === 'multiple' && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-brand-blue" />
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">TRẮC NGHIỆM ĐỀ BÀI</span>
                <button 
                  onClick={() => copyToClipboard(mcQuestion.latexEx, 'mc_latex')}
                  className="text-xs text-slate-500 hover:text-brand-blue-light flex items-center gap-1.5 font-bold cursor-pointer transition-colors"
                >
                  {copiedId === 'mc_latex' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600">Đã sao chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép mã đề ex (LaTeX)</span>
                    </>
                  )}
                </button>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{mcQuestion.title}</h4>
              <p className="text-xs sm:text-sm text-slate-700 mt-2 font-medium leading-relaxed bg-white/70 p-3 rounded-lg border border-slate-100 italic">
                "{mcQuestion.questionHtml}"
              </p>
            </div>

            {/* Options layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mcQuestion.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                let cardStyle = "border-slate-200 bg-white text-slate-800 hover:bg-slate-50";
                
                if (isSelected && !multipleChecked) {
                  cardStyle = "border-brand-blue-light bg-blue-50/40 text-brand-blue";
                } else if (multipleChecked) {
                  if (opt.correct) {
                    cardStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/10";
                  } else if (isSelected && !opt.correct) {
                    cardStyle = "border-red-400 bg-red-50 text-red-800";
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={multipleChecked}
                    onClick={() => setSelectedOption(opt.id)}
                    className={`p-4 border rounded-2xl flex items-center gap-3 text-left font-semibold transition-all text-xs sm:text-sm cursor-pointer ${cardStyle}`}
                  >
                    <div className={`w-6 h-6 rounded-lg font-mono flex items-center justify-center shrink-0 border text-xs ${
                      isSelected 
                        ? 'bg-brand-blue-light text-white border-brand-blue-light' 
                        : 'border-slate-300 text-slate-600 bg-slate-50'
                    }`}>
                      {opt.id}
                    </div>
                    <div>
                      <span className="block font-medium">{opt.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Answer Control Action */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-500 font-medium">Chọn một đáp án đúng nhất và nhấn kiểm tra kết quả.</div>
              <div className="flex sm:justify-end gap-2.5">
                {multipleChecked && (
                  <button
                    onClick={() => {
                      setSelectedOption(null);
                      setMultipleChecked(false);
                    }}
                    className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Thử lại
                  </button>
                )}
                <button
                  disabled={!selectedOption || multipleChecked}
                  onClick={() => setMultipleChecked(true)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition-all flex items-center justify-center gap-1.5 ${
                    !selectedOption || multipleChecked 
                      ? 'bg-slate-200 text-slate-400 border-none cursor-not-allowed shadow-none' 
                      : 'bg-brand-blue-light hover:bg-brand-blue cursor-pointer'
                  }`}
                >
                  <Check className="w-4 h-4" /> Kiểm Tra Kết Quả
                </button>
              </div>
            </div>

            {/* Explanation box */}
            {multipleChecked && (
              <div className="p-5 bg-gradient-to-br from-blue-50 to-emerald-50/30 border border-blue-150 rounded-2xl animate-fadeIn">
                <div className="flex items-center gap-2 text-brand-blue-light font-display font-bold text-xs uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4" /> Chi tiết đáp án từ Thạc Sĩ
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {mcQuestion.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 2: TRUE / FALSE ==================== */}
        {activeTab === 'true_false' && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-brand-emerald" />
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-[10px] font-bold text-brand-emerald uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded">MÔ HÌNH KHẲNG ĐỊNH ĐÚNG/SAI</span>
                <button 
                  onClick={() => copyToClipboard(tfLatexEx, 'tf_latex')}
                  className="text-xs text-slate-500 hover:text-brand-blue-light flex items-center gap-1.5 font-bold cursor-pointer transition-colors"
                >
                  {copiedId === 'tf_latex' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600">Đã sao chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép mã đề ex (LaTeX)</span>
                    </>
                  )}
                </button>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">Câu 2: Kiểm Định Chất Lượng Chỏm Cầu</h4>
              <p className="text-xs sm:text-sm text-slate-700 mt-2 font-medium leading-relaxed bg-white/70 p-3 rounded-lg border border-slate-100 italic">
                "Cho khối chỏm cầu có chiều cao phần cắt dẹt h = 2, bán kính khối cầu mẹ ban đầu là R = 5. Hãy đánh giá các khẳng định dưới đây bằng cách chọn Đúng (Đ) hoặc Sai (S)."
              </p>
            </div>

            {/* Assertion list */}
            <div className="space-y-3">
              {tfQuestions.map((q) => {
                const selectedVal = tfAnswers[q.id];
                const isCorrect = selectedVal === q.correctAnswer;
                
                return (
                  <div key={q.id} className="border border-slate-150 rounded-2xl p-4 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="font-mono font-bold text-brand-emerald text-sm pt-0.5 shrink-0">{q.label}</span>
                      <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">{q.assertion}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 justify-end w-full md:w-auto">
                      {/* TRUE BUTTON */}
                      <button
                        disabled={tfChecked}
                        onClick={() => setTfAnswers(prev => ({ ...prev, [q.id]: 'true' }))}
                        className={`w-1/2 md:w-16 h-10 rounded-xl text-xs sm:text-sm font-bold transition-all border shrink-0 flex items-center justify-center ${
                          selectedVal === 'true'
                            ? tfChecked 
                              ? q.correctAnswer === 'true'
                                ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' 
                                : 'bg-red-500 text-white border-red-500 shadow-sm'
                              : 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        } cursor-pointer active:scale-95`}
                      >
                        Đúng
                      </button>

                      {/* FALSE BUTTON */}
                      <button
                        disabled={tfChecked}
                        onClick={() => setTfAnswers(prev => ({ ...prev, [q.id]: 'false' }))}
                        className={`w-1/2 md:w-16 h-10 rounded-xl text-xs sm:text-sm font-bold transition-all border shrink-0 flex items-center justify-center ${
                          selectedVal === 'false'
                            ? tfChecked
                              ? q.correctAnswer === 'false'
                                ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' 
                                : 'bg-red-500 text-white border-red-500 shadow-sm'
                              : 'bg-slate-700 text-white border-slate-700 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        } cursor-pointer active:scale-95`}
                      >
                        Sai
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions for T/F */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-500 font-medium">Trả lời đầy đủ cả 4 khẳng định và nhấn kiểm tra.</div>
              <div className="flex sm:justify-end gap-2.5">
                {tfChecked && (
                  <button
                    onClick={() => {
                      setTfAnswers({ tf_a: null, tf_b: null, tf_c: null, tf_d: null });
                      setTfChecked(false);
                    }}
                    className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Thử lại
                  </button>
                )}
                <button
                  disabled={Object.values(tfAnswers).some(v => v === null) || tfChecked}
                  onClick={() => setTfChecked(true)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition-all flex items-center justify-center gap-1.5 ${
                    Object.values(tfAnswers).some(v => v === null) || tfChecked
                      ? 'bg-slate-200 text-slate-400 border-none cursor-not-allowed shadow-none' 
                      : 'bg-brand-emerald hover:bg-brand-teal cursor-pointer'
                  }`}
                >
                  <Check className="w-4 h-4" /> Kiểm Tra Tất Cả
                </button>
              </div>
            </div>

            {/* TF Explanations */}
            {tfChecked && (
              <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50/20 border border-emerald-150 rounded-2xl space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2 text-brand-emerald font-display font-bold text-xs uppercase tracking-wider">
                  <Award className="w-4 h-4" /> Phân tích sư phạm các khẳng định
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {tfQuestions.map((q) => {
                    const isCorrect = tfAnswers[q.id] === q.correctAnswer;
                    return (
                      <div key={q.id} className="p-3 bg-white rounded-xl border border-slate-100 flex flex-col justify-between">
                        <div>
                          <span className="font-bold text-slate-800">{q.label} {q.correctAnswer === 'true' ? '[ ĐÚNG ]' : '[ SAI ]'}</span>
                          <p className="text-slate-500 mt-1 italic">"{q.assertion}"</p>
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-slate-50 flex items-start gap-1.5 text-slate-600">
                          {isCorrect ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          )}
                          <span>{q.explanation}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 3: SHORT ANSWER ==================== */}
        {activeTab === 'short' && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-brand-orange" />
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest bg-orange-50 px-2 py-1 rounded">TRẢ LỜI NGẮN SỐ THỰC</span>
                <button 
                  onClick={() => copyToClipboard(shortQuestion.latexEx, 'short_latex')}
                  className="text-xs text-slate-500 hover:text-brand-blue-light flex items-center gap-1.5 font-bold cursor-pointer transition-colors"
                >
                  {copiedId === 'short_latex' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600">Đã sao chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép mã đề ex (LaTeX)</span>
                    </>
                  )}
                </button>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{shortQuestion.title}</h4>
              <p className="text-xs sm:text-sm text-slate-700 mt-2 font-medium leading-relaxed bg-white/70 p-3 rounded-lg border border-slate-100 italic">
                "{shortQuestion.questionHtml}"
              </p>
            </div>

            {/* Answer Input Area */}
            <div className="max-w-md mx-auto p-5 bg-white border border-slate-150 rounded-2xl text-center space-y-4">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest">Điền đáp số là một số nguyên duy nhất</label>
              
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  disabled={shortChecked}
                  value={shortAnswerInput}
                  onChange={(e) => setShortAnswerInput(e.target.value.replace(/[^0-9]/g, ''))} // only allow digits
                  placeholder="Ví dụ: 30"
                  className="w-full text-center text-xl font-extrabold text-slate-900 tracking-wider px-4 py-3 bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl outline-none transition-colors"
                />
                
                {shortChecked && (
                  <div className="absolute right-3 top-3.5 flex items-center gap-1 text-emerald-500">
                    {shortAnswerInput.trim() === shortQuestion.solutionNumber ? (
                      <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <Check className="w-4 h-4 text-emerald-500" /> Đúng rồi!
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs font-bold text-red-600">
                        <X className="w-4 h-4 text-red-500" /> Sai mẫu số
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex justify-center gap-2">
                {shortChecked && (
                  <button
                    onClick={() => {
                      setShortAnswerInput('');
                      setShortChecked(false);
                    }}
                    className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Luyện lại
                  </button>
                )}
                <button
                  disabled={!shortAnswerInput.trim() || shortChecked}
                  onClick={() => setShortChecked(true)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition-all flex items-center justify-center gap-1.5 ${
                    !shortAnswerInput.trim() || shortChecked
                      ? 'bg-slate-200 text-slate-400 border-none cursor-not-allowed shadow-none' 
                      : 'bg-brand-orange hover:bg-opacity-95 cursor-pointer'
                  }`}
                >
                  <Check className="w-4 h-4" /> Kiểm Tra Đáp Án
                </button>
              </div>
            </div>

            {/* Explanation Area */}
            {shortChecked && (
              <div className="p-5 bg-gradient-to-br from-orange-50 to-amber-50/10 border border-orange-150 rounded-2xl animate-fadeIn">
                <div className="flex items-center gap-2 text-brand-orange font-display font-bold text-xs uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4" /> Phương pháp giải chi tiết
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                  Đáp án đúng: <strong className="text-brand-orange font-bold text-base">{shortQuestion.solutionNumber}</strong>.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  {shortQuestion.explanation}
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
