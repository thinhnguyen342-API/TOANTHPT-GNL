import React, { useState, useMemo } from 'react';
import MathPracticeArena from './MathPracticeArena';
import { 
  BookOpen, Search, Copy, Check, Info, FileCode, CheckCircle2, 
  Download, ZoomIn, ZoomOut, Maximize2, Minimize2, ChevronRight, ChevronLeft, Sparkles 
} from 'lucide-react';

interface ShapeItem {
  name: string;
  formula: string;
  id: string;
  latexEx: string;
}

export default function MathLibrarySection() {
  const [activePageId, setActivePageId] = useState<string>('page1');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Search state for shapes inside active page
  const [shapeSearchTerm, setShapeSearchTerm] = useState('');
  
  // Selected shape for showing detailed LaTeX drawer
  const [selectedShapeId, setSelectedShapeId] = useState<string>('h_tam_giac');

  // Lightbox Modal States
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  // Handbook catalog mapping directly to the 4 generated glorious images
  const handbookPages = useMemo(() => [
    {
      id: 'page1',
      title: 'Trang 1: Chuyên Đề Hình Học Phẳng (2D)',
      subtitle: 'Trực quan hóa toàn bộ hệ thức lượng, công thức Heron, tam giác đều, elip và đa hình phẳng.',
      imagePath: '/src/assets/images/flat_geometry_handbook_1779265171576.png',
      color: 'from-blue-600 to-indigo-700',
      tag: 'Cơ Bản & Nền Tảng (Lớp 9-10)',
      accentColor: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      shapes: [
        { 
          id: 'h_tam_giac',
          name: 'Hình Tam Giác Thường', 
          formula: 'S = ½ a.h_a = abc/4R = p.r = √(p(p-a)(p-b)(p-c))', 
          latexEx: `\\begin{ex}[Sổ tay Hình phẳng - Tam giác thường]
Cho tam giác $ABC$ có độ dài các cạnh $a, b, c$, nửa chu vi $p$, bán kính ngoại tiếp $R$, nội tiếp $r$.
Các công thức diện tích cần nhớ:
\\[ S = \\frac{1}{2} a \\cdot h_a = \\frac{abc}{4R} = p \\cdot r = \\sqrt{p(p-a)(p-b)(p-c)} \\]
\\end{ex}`
        },
        { 
          id: 'h_tam_giac_vuong',
          name: 'Hình Tam Giác Vuông', 
          formula: 'S = ½ AB.AC = ½ BC.AH | 1/AH² = 1/AB² + 1/AC²', 
          latexEx: `\\begin{ex}[Sổ tay Hình phẳng - Tam giác vuông]
Cho tam giác $ABC$ vuông tại $A$ với đường cao $AH$ có:
\\[ S = \\frac{1}{2} AB \\cdot AC = \\frac{1}{2} BC \\cdot AH \\]
Hệ thức lượng nghịch đảo đường cao đặc trưng:
\\[ \\frac{1}{AH^2} = \\frac{1}{AB^2} + \\frac{1}{AC^2} \\]
\\end{ex}`
        },
        { 
          id: 'h_tam_giac_deu',
          name: 'Hình Tam Giác Đều', 
          formula: 'AH = a√3/2 | S = a²√3/4', 
          latexEx: `\\begin{ex}[Sổ tay Hình phẳng - Tam giác đều]
Cho tam giác đều $ABC$ có cạnh bằng $a$. Khi đó:
\\[ \\text{Chiều cao } AH = \\frac{a\\sqrt{3}}{2}, \\quad \\text{Diện tích } S = \\frac{a^2\\sqrt{3}}{4} \\]
\\end{ex}`
        },
        { 
          id: 'h_vuong',
          name: 'Hình Vuông', 
          formula: 'S = a² | C = 4a | Đường chéo d = a√2', 
          latexEx: `\\begin{ex}[Sổ tay Hình phẳng - Hình vuông]
Cho hình vuông có cạnh độ dài $a$:
\\[ \\text{Diện tích } S = a^2, \\quad \\text{Chu vi } C = 4a, \\quad \\text{Đường chéo } d = a\\sqrt{2} \\]
\\end{ex}`
        },
        { 
          id: 'h_chu_nhat',
          name: 'Hình Chữ Nhật', 
          formula: 'S = a × b | C = 2 × (a + b) | d = √(a² + b²)', 
          latexEx: `\\begin{ex}[Sổ tay Hình phẳng - Hình chữ nhật]
Cho hình chữ nhật có kích thước chiều dài $a$ và chiều rộng $b$:
\\[ \\text{Diện tích } S = a \\cdot b, \\quad \\text{Chu vi } C = 2(a+b) \\]
\\end{ex}`
        },
        { 
          id: 'h_binh_hanh',
          name: 'Hình Bình Hành', 
          formula: 'S = a × h | C = 2 × (a + b)', 
          latexEx: `\\begin{ex}[Sổ tay Hình phẳng - Hình bình hành]
Cho hình bình hành có cạnh đáy $a$, chiều cao ứng với đáy là $h$, cạnh kề là $b$:
\\[ \\text{Diện tích } S = a \\cdot h, \\quad \\text{Chu vi } C = 2(a+b) \\]
\\end{ex}`
        },
        { 
          id: 'h_thoi',
          name: 'Hình Thoi', 
          formula: 'S = ½ d₁ · d₂ = a² · sin A', 
          latexEx: `\\begin{ex}[Sổ tay Hình phẳng - Hình thoi]
Cho hình thoi có cạnh $a$ và hai góc đường chéo vuông góc $d_1, d_2$:
\\[ S = \\frac{1}{2} d_1 \\cdot d_2 = a^2 \\sin A \\]
\\end{ex}`
        },
        { 
          id: 'h_thang',
          name: 'Hình Thang', 
          formula: 'S = ½ (a + b) × h', 
          latexEx: `\\begin{ex}[Sổ tay Hình phẳng - Hình thang]
Cho hình thang có đáy lớn $b$, đáy bé $a$, và chiều cao nối thẳng đứng là $h$:
\\[ S = \\frac{a+b}{2} \\cdot h \\]
\\end{ex}`
        },
        { 
          id: 'h_tu_giac_cheo_vuong',
          name: 'Tứ Giác 2 Chéo Vuông Góc', 
          formula: 'S = ½ AC · BD (AC ⊥ BD)', 
          latexEx: `\\begin{ex}[Sổ tay Hình phẳng - Tứ giác vuông chéo]
Cho tứ giác lồi $ABCD$ có hai đường chéo $AC$ và $BD$ vuông góc tại $O$.
\\[ \\text{Diện tích tứ giác: } S = \\frac{1}{2} AC \\cdot BD \\]
\\end{ex}`
        },
        { 
          id: 'h_elip',
          name: 'Hình Elip (2D)', 
          formula: 'S = π · a · b (a: nửa trục lớn, b: nửa trục bé)', 
          latexEx: `\\begin{ex}[Sổ tay Hình phẳng - Đường Elip]
Cho hình Elip có phương trình chính tắc $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$:
\\[ S = \\pi a b \\quad (a: \\text{bán trục lớn}, b: \\text{bán trục bé}) \\]
\\end{ex}`
        },
        { 
          id: 'h_tron',
          name: 'Hình Tròn', 
          formula: 'S = πr² | Chu vi C = 2πr', 
          latexEx: `\\begin{ex}[Sổ tay Hình phẳng - Hình tròn]
Cho đường tròn có bán kính $r$:
\\[ S = \\pi r^2 \\quad \\text{và} \\quad P = 2\\pi r \\]
\\end{ex}`
        }
      ]
    },
    {
      id: 'page2',
      title: 'Trang 2: Khối Đa Diện & 3D Cơ Bản',
      subtitle: 'Sổ tay thể tích lăng trụ đáy biến đổi, mái nhà, chỏm cầu, nón trụ tròn xoay phổ biến.',
      imagePath: '/src/assets/images/basic_solids_handbook_1779265209052.png',
      color: 'from-emerald-500 to-teal-750',
      tag: 'Trọng Tâm Luyện Thi THPT (9+)',
      accentColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      shapes: [
        { 
          id: 'k_lang_tru_day_bien_doi',
          name: 'Lăng Trụ Đáy Biến Đổi', 
          formula: 'Công thức Simpson: V = h/6 · (A₁ + 4A_m + A₂)', 
          latexEx: `\\begin{ex}[Sổ tay Đa diện - Lăng trụ đáy biến đổi]
Áp dụng công thức Simpson cải tiến tính thể tích khối lăng trụ có đáy thay đổi:
\\[ V = \\frac{h}{6} (A_1 + 4 A_m + A_2) \\]
Trong đó: $A_1, A_2$ là diện tích hai đáy, $A_m$ là diện tích mặt thiết diện song song chính giữa khối.
\\end{ex}`
        },
        { 
          id: 'k_mai_nha',
          name: 'Khối Lập Cụ "Mái Nhà"', 
          formula: 'V = (L · h / 6) · (2a + a₁)', 
          latexEx: `\\begin{ex}[Sổ tay Đa diện - Khối mái nhà]
Khối mái nhà có đáy hình chữ nhật rộng $a$, dài $L$, cạnh đỉnh song song dài $a_1$, cao $h$:
\\[ V = \\frac{L \\cdot h}{6} (2a + a_1) \\]
\\end{ex}`
        },
        { 
          id: 'k_cau',
          name: 'Khối Cầu', 
          formula: 'S = 4πR² | V = 4/3 πR³', 
          latexEx: `\\begin{ex}[Sổ tay Đa diện - Khối cầu]
Thể tích và diện tích bề mặt khối cầu bán kính $R$:
\\[ V = \\frac{4}{3} \\pi R^3 \\quad \\text{và} \\quad S = 4\\pi R^2 \\]
\\end{ex}`
        },
        { 
          id: 'k_chom_cau',
          name: 'Khối Chỏm Cầu', 
          formula: 'S = 2πRh | V = πh²(R - h/3) = 1/6 πh(3r² + h²)', 
          latexEx: `\\begin{ex}[Sổ tay Đa diện - Khối chỏm cầu]
Chỏm cầu cắt ra từ mặt cầu mẹ bán kính $R$, chiều cao chỏm $h$, bán kính đáy dẹt $r$:
\\[ V = \\pi h^2 \\left(R - \\frac{h}{3}\\right) = \\frac{1}{6}\\pi h(3r^2 + h^2) \\]
\\end{ex}`
        },
        { 
          id: 'k_doi_cau',
          name: 'Khối Đới Cầu', 
          formula: 'V = 1/6 πh(3r₁² + 3r₂² + h²)', 
          latexEx: `\\begin{ex}[Sổ tay Đa diện - Khối đới cầu]
Khối đới cầu giới hạn bởi 2 mặt phẳng cắt song song có khoảng cách là $h$:
\\[ V = \\frac{1}{6}\\pi h(3r_1^2 + 3r_2^2 + h^2) \\]
\\end{ex}`
        },
        { 
          id: 'k_non',
          name: 'Khối Nón Tròn Xoay', 
          formula: 'S_xq = πrl | S_tp = πrl + πr² | V = 1/3 πr²h', 
          latexEx: `\\begin{ex}[Sổ tay Đa diện - Khối nón]
Khối nón có chiều cao $h$, bán kính đáy $r$, độ dài đường sinh $l$:
\\[ S_{xq} = \\pi r l, \\quad S_{tp} = \\pi r (l + r), \\quad V = \\frac{1}{3} \\pi r^2 h \\]
\\end{ex}`
        },
        { 
          id: 'k_tru',
          name: 'Khối Trụ Tròn Xoay', 
          formula: 'S_xq = 2πrl | V = πr²h', 
          latexEx: `\\begin{ex}[Sổ tay Đa diện - Khối trụ]
Khối trụ có chiều cao $h$, bán kính đáy $r$:
\\[ S_{xq} = 2\\pi r h, \\quad V = \\pi r^2 h \\]
\\end{ex}`
        },
        { 
          id: 'k_tru_cut',
          name: 'Khối Trụ Cụt', 
          formula: 'V = πr² · ((h₁ + h₂)/2)', 
          latexEx: `\\begin{ex}[Sổ tay Đa diện - Khối trụ cụt]
Khối trụ bị cắt chéo có chiều cao thấp nhất $h_1$ và cao nhất $h_2$, bán kính đáy $r$:
\\[ V = \\pi r^2 \\left(\\frac{h_1 + h_2}{2}\\right) \\]
\\end{ex}`
        },
        { 
          id: 'k_non_cut',
          name: 'Khối Nón Cụt', 
          formula: 'V = 1/3 πh(R² + r² + R · r)', 
          latexEx: `\\begin{ex}[Sổ tay Đa diện - Khối nón cụt]
Nón cụt có chiều cao hạ đứng $h$, bán kính đáy lớn $R$, đáy bé $r$:
\\[ V = \\frac{1}{3}\\pi h (R^2 + r^2 + Rr) \\]
\\end{ex}`
        }
      ]
    },
    {
      id: 'page3',
      title: 'Trang 3: Khối Tròn Xoay & Tích Phân Nâng Cao',
      subtitle: 'Nghiên cứu các mô hình Viviani đỉnh chuỗi, chóp đáy dẹt elip, cycloid xoay rực rỡ.',
      imagePath: '/src/assets/images/advanced_3d_handbook_1779265192572.png',
      color: 'from-pink-500 to-rose-600',
      tag: 'Khảo Sát Tuyển Chọn (ĐGNL & HSG)',
      accentColor: 'text-pink-600 bg-pink-50 border-pink-100',
      shapes: [
        { 
          id: 'k_viviani',
          name: 'Khối Vật Thể Viviani', 
          formula: 'V = 2/3 R³ · (π - 4/3)', 
          latexEx: `\\begin{ex}[Sổ tay Tích phân - Khối Viviani]
Khối vật thể Viviani giới hạn đồng thời bên trong mặt cầu bán kính $R$ và mặt trụ tròn xoay $r=R/2$:
\\[ V = \\frac{2}{3} R^3 \\left(\\pi - \\frac{4}{3}\\right) \\]
\\end{ex}`
        },
        { 
          id: 'k_giao_3_tru',
          name: 'Giao 3 Hình Trụ (Tricylinder)', 
          formula: 'V = 8 · (2 - √2) · r³', 
          latexEx: `\\begin{ex}[Sổ tay Tích phân - Tricylinder]
Thể tích phần giao nhau của 3 hình trụ tròn xoay cùng bán kính $r$ cắt vuông góc tại tâm:
\\[ V = 8(2 - \\sqrt{2}) r^3 \\]
\\end{ex}`
        },
        { 
          id: 'k_elipsoid',
          name: 'Khối Elipsoid (3D)', 
          formula: 'V = 4/3 π · a · b · c', 
          latexEx: `\\begin{ex}[Sổ tay Tích phân - Khối Elipsoid]
Khối Elipsoid xoay có 3 bán trục thẳng đứng là $a, b, c$:
\\[ V = \\frac{4}{3}\\pi a b c \\]
\\end{ex}`
        },
        { 
          id: 'k_mat_cat_bien_thien',
          name: 'Thiết Diện Biến Thiên', 
          formula: 'V = ∫ [s(x)]² dx', 
          latexEx: `\\begin{ex}[Sổ tay Tích phân - Diện tích thiết diện]
Thể tích vật thể nằm giữa hai mặt phẳng vuông góc với trục $Ox$ tại $x=a$ và $x=b$:
\\[ V = \\int_{a}^{b} S(x) \\, dx = \\int_{a}^{b} [s(x)]^2 \\, dx \\]
\\end{ex}`
        },
        { 
          id: 'k_chop_day_elip',
          name: 'Khối Chóp Đáy Elip', 
          formula: 'V = 1/3 π · a · b · h', 
          latexEx: `\\begin{ex}[Sổ tay Tích phân - Chóp đáy elip]
Khối chóp cao $h$ có đáy là hình elip tạo bởi nửa trục lớn $a$, nửa trục nhỏ $b$:
\\[ V = \\frac{1}{3} \\pi a b h \\]
\\end{ex}`
        },
        { 
          id: 'k_chop_cut_hyperbol',
          name: 'Chóp Cụt Hyperbol', 
          formula: 'V = πa² [ (h+k) + (h³+k³)/(3b²) ]', 
          latexEx: `\\begin{ex}[Sổ tay Tích phân - Chóp cụt Hyperbol]
Tính toán theo phương trình xoay tiệm cận hyperbol:
\\[ V = \\pi a^2 \\left[ (h+k) + \\frac{h^3+k^3}{3b^2} \\right] \\]
\\end{ex}`
        },
        { 
          id: 'k_trai_anh_dao',
          name: 'Khối Trái Anh Đào (Cherry)', 
          formula: 'V = 8/3 π · a³ (Xoay đường Cardioid)', 
          latexEx: `\\begin{ex}[Sổ tay Tích phân - Khối trái anh đào]
Quay một đường hình học Cardioid đối xứng có bán kính $a$ quanh trục đối xứng:
\\[ V = \\frac{8}{3} \\pi a^3 \\]
\\end{ex}`
        },
        { 
          id: 'k_xuyen_sao',
          name: 'Xuyến Sao 4 Cánh Astroid', 
          formula: 'V = 32/105 π · a³', 
          latexEx: `\\begin{ex}[Sổ tay Tích phân - Xuyến sao Astroid]
Quay vòng xuyến hình sao bốn cánh Astroid quanh trục hoành:
\\[ V = \\frac{32}{105}\\pi a^3 \\]
\\end{ex}`
        },
        { 
          id: 'k_giot_nuoc',
          name: 'Khối Giọt Nước (Piriform)', 
          formula: 'V = 1/20 π · a² · h', 
          latexEx: `\\begin{ex}[Sổ tay Tích phân - Khối giọt nước]
Quay đường cong Piriform xoay quanh trục đối xứng, với độ mở $a$ và chiều cao bầu $h$:
\\[ V = \\frac{1}{20} \\pi a^2 h \\]
\\end{ex}`
        },
        { 
          id: 'k_cycloid_xoay',
          name: 'Vật Thể Tròn Xoay Cycloid', 
          formula: 'V = 5π² · a³', 
          latexEx: `\\begin{ex}[Sổ tay Tích phân - Tròn xoay Cycloid]
Quay hình tạo bới một nhánh đường Cycloid $y = a(1 - \\cos t)$ quanh trục hoành đáy phẳng:
\\[ V = 5\\pi^2 a^3 \\]
\\end{ex}`
        }
      ]
    },
    {
      id: 'page4',
      title: 'Trang 4: Giao Khối & Tích Phân Chuyên Sâu',
      subtitle: 'Khám phá khối lập phương trượt, Napkin Ring, khối cầu nội tiếp, nêm Viviani độc quyền.',
      imagePath: '/src/assets/images/complex_integrals_handbook_1779265227731.png',
      color: 'from-amber-500 to-orange-655',
      tag: 'Khai Phá Vận Dụng Cao (Điểm 10 Tuyệt Đối)',
      accentColor: 'text-amber-650 bg-amber-50 border-amber-100',
      shapes: [
        { 
          id: 'k_hinh_xuyen',
          name: 'Khối Hình Xuyến (Torus)', 
          formula: 'V = ¼ π² (R + r)(R - r)²', 
          latexEx: `\\begin{ex}[Sổ tay Nâng Cao - Khối hình xuyến Torus]
Khối donut phao bơi có bán kính vòng lớn $R$ và bán kính vòng trong $r$:
\\[ V = \\frac{1}{4}\\pi^2 (R+r)(R-r)^2 \\]
\\end{ex}`
        },
        { 
          id: 'k_cau_noi_tiep',
          name: 'Cầu Nội Tiếp Tứ Diện', 
          formula: 'r = 3V / S_tp', 
          latexEx: `\\begin{ex}[Sổ tay Nâng Cao - Cầu nội tiếp tứ diện]
Bán kính mặt cầu nội tiếp tứ diện có thể tích $V$ và tổng diện tích toàn phần $S_{tp}$:
\\[ r = \\frac{3V}{S_{tp}} \\]
\\end{ex}`
        },
        { 
          id: 'k_nem_tru_1',
          name: 'Nêm Trụ Loại 1 (Viviani Slice)', 
          formula: 'V = 2/3 r³ · tan α', 
          latexEx: `\\begin{ex}[Sổ tay Nâng Cao - Khối nêm trụ loại 1]
Phần hình trụ bị phẳng cắt xiên một góc $\\alpha$ đi qua tâm đáy tròn bán kính $r$:
\\[ V = \\frac{2}{3} r^3 \\tan \\alpha \\]
\\end{ex}`
        },
        { 
          id: 'k_nem_loai_2',
          name: 'Khối Nêm Trụ Loại 2', 
          formula: 'V = (π - 2/3) · r³ · tan α', 
          latexEx: `\\begin{ex}[Sổ tay Nâng Cao - Khối nêm trụ loại 2]
Tích phân khối nêm loại hai tạo thành có góc vát đáy tròn xoay bán kính $r$:
\\[ V = \\left(\\pi - \\frac{2}{3}\\right) r^3 \\tan \\alpha \\]
\\end{ex}`
        },
        { 
          id: 'k_vong_nhan',
          name: 'Vòng Nhẫn (Napkin Ring)', 
          formula: 'V = 1/6 π · h³ (cao h không phụ thuộc R)', 
          latexEx: `\\begin{ex}[Sổ tay Nâng Cao - Napkin Ring Theorem]
Thể tích của phần khối cầu còn lại sau khi khoan lỗ hình trụ xuyên tâm cao $h$:
\\[ V = \\frac{\\pi h^3}{6} \\]
\\end{ex}`
        },
        { 
          id: 'k_giao_2_tru',
          name: 'Giao 2 Hình Trụ Vuông Góc', 
          formula: 'V = 16/3 r³ (Khối Steinmetz)', 
          latexEx: `\\begin{ex}[Sổ tay Nâng Cao - Khối Steinmetz]
Phần giao nhau của hai đường ống trụ tròn xoay có bán kính đáy $r$ đặt cắt vuông góc:
\\[ V = \\frac{16}{3} r^3 \\]
\\end{ex}`
        },
        { 
          id: 'k_parabol_xoay',
          name: 'Khối Parabol Quanh Ox', 
          formula: 'V = π(√b²-4ac)² / 30 |a|', 
          latexEx: `\\begin{ex}[Sổ tay Nâng Cao - Paraboloid vặn Ox]
Áp dụng công thức tính thể tích vật thể dẹt quay quanh Ox tạo từ hàm parabol bậc hai:
\\[ V = \\frac{\\pi(\\sqrt{b^2 - 4ac})^2}{30|a|} \\]
\\end{ex}`
        },
        { 
          id: 'k_parabol',
          name: 'Khối Parabol Tròn Xoay', 
          formula: 'V = ½ πr²h', 
          latexEx: `\\begin{ex}[Sổ tay Nâng Cao - Khối Parabol]
Thể tích khối parabol cao đứng $h$, bán kính miệng cốc xoay đáy $r$:
\\[ V = \\frac{1}{2} \\pi r^2 h \\]
\\end{ex}`
        }
      ]
    }
  ], []);

  // Retrieve active page info
  const activePage = useMemo(() => {
    return handbookPages.find(p => p.id === activePageId) || handbookPages[0];
  }, [activePageId, handbookPages]);

  // Filter shapes in active page index sidebar based on tiny search bar
  const filteredPageShapes = useMemo(() => {
    return activePage.shapes.filter(s => 
      s.name.toLowerCase().includes(shapeSearchTerm.toLowerCase()) ||
      s.formula.toLowerCase().includes(shapeSearchTerm.toLowerCase())
    );
  }, [activePage, shapeSearchTerm]);

  // Auto select first shape of active page if previous selection belongs to another page
  React.useEffect(() => {
    if (activePage.shapes.length > 0) {
      // Find if active page has the currently selected shape, else select first
      const hasShape = activePage.shapes.some(s => s.id === selectedShapeId);
      if (!hasShape) {
        setSelectedShapeId(activePage.shapes[0].id);
      }
    }
    setShapeSearchTerm('');
  }, [activePageId, activePage, selectedShapeId]);

  // Retrieve details of the active selected shape inside list
  const activeShape = useMemo(() => {
    return activePage.shapes.find(s => s.id === selectedShapeId) || activePage.shapes[0];
  }, [selectedShapeId, activePage]);

  // Handle Copy Standard Code helper
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrevPage = () => {
    const currentIndex = handbookPages.findIndex(p => p.id === activePageId);
    const prevIndex = (currentIndex - 1 + handbookPages.length) % handbookPages.length;
    setActivePageId(handbookPages[prevIndex].id);
  };

  const handleNextPage = () => {
    const currentIndex = handbookPages.findIndex(p => p.id === activePageId);
    const nextIndex = (currentIndex + 1) % handbookPages.length;
    setActivePageId(handbookPages[nextIndex].id);
  };

  return (
    <section className="py-10 sm:py-20 bg-slate-50 relative border-t border-b border-slate-200/50" id="library-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER DESIGN */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-xs font-bold text-brand-blue-light uppercase tracking-widest bg-blue-50 px-3.5 py-2 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-amber animate-pulse animate-duration-1000" /> Sổ tay học thuật độc quyền Thạc sĩ
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight text-slate-900 mt-4 px-1">
            Thư Viện Sổ Tay Công Thức Bằng Ảnh Trực Quan
          </h2>
          <p className="text-xs sm:text-base text-slate-600 mt-2 px-2">
            Được số hóa trực tiếp từ tài nguyên bản quyền của thầy cô bằng mô hình đồ họa trực quan, sắc nét 100%. Nhấn vào ảnh để phóng to HD xem rõ mọi hằng số và tích phân ôn tập nước rút cực đơn giản!
          </p>
        </div>

        {/* TOP LEVEL NAVIGATION TABS (THE 4 HANDBOOK PAGES) */}
        {/* On mobile screens, this changes into high-performance physics horizontal swipe scroll ribbon with snap guides */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-2.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/60 mb-6 sm:mb-8 scrollbar-none snap-x snap-mandatory">
          {handbookPages.map((page) => {
            const isActive = activePageId === page.id;
            return (
              <button
                key={page.id}
                onClick={() => {
                  setActivePageId(page.id);
                }}
                className={`p-3 rounded-xl transition-all duration-300 text-left cursor-pointer flex flex-col justify-between h-16 sm:h-20 border relative overflow-hidden shrink-0 w-[72vw] sm:w-[45vw] md:w-auto snap-center group select-none ${
                  isActive 
                    ? `bg-white border-slate-200 shadow-md ring-2 ring-indigo-500/10` 
                    : 'bg-transparent border-transparent hover:bg-white/55 text-slate-600'
                }`}
              >
                {/* Visual colored pill indicator */}
                <span className={`text-[8px] sm:text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md inline-block w-fit ${
                  isActive ? 'bg-gradient-to-r ' + page.color + ' text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {page.id.toUpperCase()}
                </span>
                
                <span className={`text-xs sm:text-sm font-extrabold font-display leading-tight mt-1 truncate ${
                  isActive ? 'text-slate-900' : 'text-slate-700'
                }`}>
                  {page.title.split(': ')[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* INDICATOR FOR MOBILE SWIPE */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mb-6 text-[10px] font-semibold text-slate-400">
          <span>Vuốt sang ngang ↔ để xem thêm chuyên đề toán khác</span>
        </div>

        {/* CONTAINER WORKSPACE FOR SELECTIVE HANDBOOK SHEETS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* LEFT AREA: INTERACTIVE SHEET DISPLAY CARD WITH CLICK-TO-ZOOM */}
          <div className="lg:col-span-7 space-y-4">
            <div 
              className="bg-white border border-slate-250 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-lg relative overflow-hidden group/card hover:shadow-xl transition-all duration-300 bg-slate-950/5 border border-slate-200/90"
              id="handbook-sheet-viewport"
            >
              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5">
                <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest bg-slate-900/95 text-white px-2.5 py-1 rounded-full inline-block backdrop-blur-md shadow-md border border-white/10">
                  {activePage.tag}
                </span>
                <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest bg-emerald-500 text-white px-2 py-0.5 rounded-full inline-block shadow-md">
                  HD SẮC NÉT
                </span>
              </div>

              {/* Title inside page card */}
              <div className="pb-3 border-b border-slate-100 mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">{activePage.title}</h3>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{activePage.subtitle}</p>
                </div>
                
                {/* Full Expansion indicator */}
                <button
                  onClick={() => {
                    setIsLightboxOpen(true);
                    setZoomScale(1.1);
                  }}
                  className="p-2 sm:p-2.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100/60 rounded-xl text-indigo-600 transition-colors cursor-pointer min-w-[38px] min-h-[38px] flex items-center justify-center"
                  title="Xem kích thước đầy đủ HD"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* SHEET IMAGE FRAME WITH TOUCH ARROWS */}
              <div 
                className="aspect-[3/4] relative rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-slate-100 group/img shadow-inner"
              >
                {/* Left Overlay Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevPage();
                  }}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-slate-900/65 hover:bg-slate-900/85 text-white rounded-full transition-all cursor-pointer flex items-center justify-center border border-white/10 opacity-80 sm:opacity-0 sm:group-hover/img:opacity-100 min-w-[40px] min-h-[40px] active:scale-95 shadow-md"
                  title="Trang trước"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right Overlay Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextPage();
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-slate-900/65 hover:bg-slate-900/85 text-white rounded-full transition-all cursor-pointer flex items-center justify-center border border-white/10 opacity-80 sm:opacity-0 sm:group-hover/img:opacity-100 min-w-[40px] min-h-[40px] active:scale-95 shadow-md"
                  title="Trang sau"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <img
                  src={activePage.imagePath}
                  alt={activePage.title}
                  onClick={() => {
                    setIsLightboxOpen(true);
                    setZoomScale(1.1);
                  }}
                  className="w-full h-full object-contain object-center transition-transform duration-500 hover:scale-[1.015] cursor-zoom-in"
                  referrerPolicy="no-referrer"
                />
                
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="bg-white/95 px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-1.5 font-bold text-xs text-slate-900 backdrop-blur-sm">
                    <Maximize2 className="w-3.5 h-3.5 text-indigo-600 animate-bounce" />
                    <span>Chạm để phóng to ảnh HD</span>
                  </div>
                </div>
              </div>

              {/* Interactive Help Footer bar */}
              <div className="pt-3 border-t border-slate-150 mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                <span className="font-semibold flex items-center gap-1.5 text-left text-slate-600 w-full sm:w-auto">
                  <Info className="w-4 h-4 text-indigo-505 shrink-0" /> Gõ tìm kiếm hoặc nhấp chọn để lấy code LaTeX "ex" tương ứng mục lục bên phải.
                </span>
                <button
                  onClick={() => {
                    setIsLightboxOpen(true);
                    setZoomScale(1.3);
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-wide cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98]"
                >
                  <ZoomIn className="w-4 h-4" /> BẬT CHẾ ĐỘ PHÓNG TO HD
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT AREA: FORMULA CODE EXTRACTOR DRAWER / SHAPES DIRECTORY */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Shapes list inside selected page */}
            <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm space-y-3.5 max-h-[350px] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-600" /> Công thức nổi bật ở trang này
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {activePage.shapes.length} mục
                  </span>
                </div>

                {/* Micro Search within page */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Tìm nhanh hình hoặc từ khóa thể tích..."
                    value={shapeSearchTerm}
                    onChange={(e) => setShapeSearchTerm(e.target.value)}
                    className="w-full text-xs font-semibold pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:bg-white outline-none transition-all min-h-[36px]"
                  />
                </div>
              </div>

              {/* Scrollable shapes guide list */}
              <div className="overflow-y-auto pr-1 flex-1 space-y-1 scrollbar-thin max-h-[200px]">
                {filteredPageShapes.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs font-semibold">
                    Không tìm thấy từ khóa phù hợp
                  </div>
                ) : (
                  filteredPageShapes.map((shape) => {
                    const isSelected = selectedShapeId === shape.id;
                    return (
                      <button
                        key={shape.id}
                        onClick={() => setSelectedShapeId(shape.id)}
                        className={`w-full text-left p-2.5 rounded-lg transition-all flex items-center justify-between border cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-50/70 border-indigo-200 text-indigo-700 ring-1 ring-indigo-500/10'
                            : 'bg-white border-transparent hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex flex-col pr-2">
                          <span className="text-xs font-bold leading-tight">{shape.name}</span>
                          <span className="text-[10px] text-slate-400 mt-0.5 font-mono truncate max-w-[190px] xs:max-w-[240px] sm:max-w-[320px] lg:max-w-[160px]">{shape.formula}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isSelected ? 'translate-x-1 text-indigo-500' : ''}`} />
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* LATEX CODE EXTRACTOR EX COMPONENT DECK */}
            {activeShape && (
              <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-lg bg-indigo-50 text-indigo-600 font-bold font-mono text-xs flex items-center justify-center shrink-0">ex</span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">Mã nguồn LaTeX "môi trường ex"</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate">{activeShape.name}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(activeShape.latexEx, activeShape.id)}
                    className="text-[11px] text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-bold cursor-pointer transition-colors bg-indigo-50 px-2.5 py-1.5 rounded-lg border border-indigo-100/60 shrink-0 active:scale-95"
                  >
                    {copiedId === activeShape.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-700">Đã chép!</span>
                      </>
                    ) : (
                      <>
                        <FileCode className="w-3.5 h-3.5" />
                        <span>Chép code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Học sinh tự luyện tập / Giáo viên tạo đề nhanh:</p>
                  <pre className="bg-slate-900 text-slate-200 text-[10px] sm:text-xs font-mono p-3.5 rounded-xl overflow-x-auto border border-slate-800 max-h-52 selection:bg-slate-700 select-all leading-relaxed scrollbar-thin">
                    {activeShape.latexEx}
                  </pre>
                </div>

                <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl flex items-start gap-2 text-[11px] sm:text-xs text-indigo-700">
                  <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>Toàn bộ code sinh câu hỏi trên được cấu trúc bằng môi trường <strong>{"\\begin{ex}...\\end{ex}"}</strong> chuẩn định dạng toán Latex mới nhất, giúp soạn thảo đề thi mượt mà nhất.</span>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* DETAILED LIGHTBOX MODAL WITH FULL RES SCROLLING & ZOOM CONTROLS */}
        {isLightboxOpen && (
          <div 
            className="fixed inset-0 z-50 bg-slate-950/98 flex flex-col justify-between p-3 sm:p-4"
            id="images-hd-lightbox"
          >
            {/* Lightbox top header controls - beautifully redesigned to stay responsive on phones */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-white border-b border-slate-800 pb-3 gap-3">
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0"></span>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold font-display text-white truncate">{activePage.title}</h3>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 truncate">Sổ tay gốc bởi Thạc sĩ Thầy Thịnh biên soạn cực nét</p>
                </div>
              </div>

              {/* Buttons panel with comfortable tap zones */}
              <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto border-t border-slate-800/80 pt-2.5 sm:pt-0 sm:border-0">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {/* Zoom out button */}
                  <button
                    onClick={() => setZoomScale(prev => Math.max(0.6, prev - 0.2))}
                    className="p-2 bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center border border-slate-850 hover:border-slate-700"
                    title="Thu nhỏ"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>

                  {/* Display zoom percentage */}
                  <span className="text-[11px] font-mono text-slate-400 px-1 font-bold min-w-[42px] text-center">
                    {Math.round(zoomScale * 100)}%
                  </span>

                  {/* Zoom in button */}
                  <button
                    onClick={() => setZoomScale(prev => Math.min(3, prev + 0.2))}
                    className="p-2 bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center border border-slate-850 hover:border-slate-700"
                    title="Phóng to"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>

                  {/* Reset zoom */}
                  <button
                    onClick={() => setZoomScale(1)}
                    className="px-2.5 py-1.5 bg-slate-850 hover:bg-slate-800 text-[10px] font-bold text-slate-350 hover:text-white rounded-lg transition-colors cursor-pointer border border-slate-700/40 min-h-[36px]"
                  >
                    100%
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 text-xs active:scale-95 min-h-[36px]"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Đóng lại</span>
                </button>
              </div>
            </div>

            {/* LIGHTBOX MAIN WRAPPED SCROLLABLE IMAGE VIEWPORT */}
            <div className="flex-1 overflow-auto flex items-center justify-center p-2 cursor-grab active:cursor-grabbing max-h-[78vh] sm:max-h-[82vh]">
              <div 
                className="transition-transform duration-150 origin-center bg-white rounded-xl shadow-2xl p-2 sm:p-5"
                style={{ transform: `scale(${zoomScale})` }}
              >
                <img
                  src={activePage.imagePath}
                  alt={activePage.title}
                  className="max-h-[66vh] sm:max-h-[70vh] w-auto max-w-full h-auto object-contain select-none shadow-sm"
                  referrerPolicy="no-referrer"
                  onDoubleClick={() => {
                    // Double click to toggle zoom quickly
                    setZoomScale(prev => prev === 1 ? 1.6 : 1);
                  }}
                />
              </div>
            </div>

            {/* Instruction footer inside lightbox overlay */}
            <div className="text-center text-[10px] sm:text-xs text-slate-400 border-t border-slate-800 pt-3 flex flex-col sm:flex-row justify-between items-center gap-3.5">
              <span className="hidden sm:inline">💡 Thầy cô và học sinh có thể dùng con lăn chuột để kéo, cuộn, nháy đúp chuột để thu phóng góc học tập nhanh.</span>
              <span className="sm:hidden">💡 Dùng 2 ngón tay chạm/vuốt để phóng to thu nhỏ sơ đồ nhanh. Nháy đúp để phóng to 1.6x.</span>
              <a 
                href={activePage.imagePath} 
                download={`ToanThacSi_${activePage.id}`}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-indigo-200 font-bold flex items-center gap-1.5 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all cursor-pointer w-full sm:w-auto justify-center shadow-lg shadow-indigo-600/10 text-xs font-display active:scale-95 min-h-[38px]"
              >
                <Download className="w-3.5 h-3.5" /> Tải về ảnh gốc phân giải cao
              </a>
            </div>

          </div>
        )}

        {/* MATHS PRACTICE ENTRANCE ARENA */}
        <div className="mt-12">
          <MathPracticeArena />
        </div>

      </div>
    </section>
  );
}
