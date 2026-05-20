export interface FormulaItem {
  id: string;
  name: string;
  category: 'flat' | 'basic3d' | 'advanced3d' | 'special3d';
  categoryName: string;
  description: string;
  formulas: {
    name: string;
    eq: string;
    explanation?: string;
  }[];
  latexEx: string;
  svgType: string; // To draw it in React
}

export const geometryData: FormulaItem[] = [
  // CATEGORY 1: HÌNH PHẲNG (2D FLAT GEOMETRY)
  {
    id: 'h_tam_giac',
    name: 'Hình tam giác',
    category: 'flat',
    categoryName: 'Hình phẳng (2D)',
    description: 'Tam giác thường có 3 cạnh là a, b, c với đường cao h_a tương ứng hạ từ đỉnh A xuống cạnh đáy a. R là bán kính đường tròn ngoại tiếp, r là bán kính đường tròn nội tiếp, và p là nửa chu vi.',
    formulas: [
      { name: 'Diện tích (Đường cao)', eq: 'S = \\frac{1}{2} a \\cdot h_a = \\frac{1}{2} b \\cdot h_b = \\frac{1}{2} c \\cdot h_c' },
      { name: 'Diện tích (Công thức lượng giác)', eq: 'S = \\frac{1}{2} b c \\sin A = \\frac{1}{2} a c \\sin B = \\frac{1}{2} a b \\sin C' },
      { name: 'Diện tích (Ngoại tiếp R)', eq: 'S = \\frac{abc}{4R}' },
      { name: 'Diện tích (Nội tiếp r)', eq: 'S = p \\cdot r \\quad \\text{với } p = \\frac{a+b+c}{2}' },
      { name: 'Công thức Heron', eq: 'S = \\sqrt{p(p-a)(p-b)(p-c)}' }
    ],
    svgType: 'triangle',
    latexEx: `\\begin{ex}[Công thức Hình phẳng - Tam giác thường]
Cho tam giác $ABC$ có độ dài các cạnh đối diện các đỉnh $A, B, C$ lần lượt là $a, b, c$.
Đường cao hạ từ đỉnh $A$ có độ dài là $h_a$. Gọi $R, r$ lần lượt là bán kính đường tròn ngoại tiếp, nội tiếp và $p$ là nửa chu vi của tam giác.
Các công thức tính diện tích diện tích tam giác gồm:
\\begin{align*}
    &S = \\frac{1}{2} a \\cdot h_a = \\frac{1}{2} b c \\sin A \\\\
    &S = \\frac{abc}{4R} = p \\cdot r \\\\
    &S = \\sqrt{p(p-a)(p-b)(p-c)} \\quad \\text{(Công thức Heron)}
\\end{align*}
\\end{ex}`
  },
  {
    id: 'h_tam_giac_vuong',
    name: 'Hình tam giác vuông',
    category: 'flat',
    categoryName: 'Hình phẳng (2D)',
    description: 'Tam giác vuông tại đỉnh A có hai cạnh góc vuông là AB và AC, cạnh huyền là BC, và đường cao tương ứng là AH hạ xuống cạnh huyền.',
    formulas: [
      { name: 'Diện tích', eq: 'S = \\frac{AB \\cdot AC}{2} = \\frac{BC \\cdot AH}{2}' },
      { name: 'Hệ thức lượng liên quan', eq: 'AH \\cdot BC = AB \\cdot AC \\quad \\text{và} \\quad \\frac{1}{AH^2} = \\frac{1}{AB^2} + \\frac{1}{AC^2}' }
    ],
    svgType: 'right_triangle',
    latexEx: `\\begin{ex}[Công thức Hình phẳng - Tam giác vuông]
Cho tam giác $ABC$ vuông tại $A$, có đường cao $AH$ kẻ từ đỉnh vuông xuống cạnh huyền $BC$.
Diện tích của tam giác vuông được xác định bởi công thức:
\\[ S = \\frac{1}{2} AB \\cdot AC = \\frac{1}{2} BC \\cdot AH \\]
Đồng thời thỏa mãn hệ thức lượng nghịch đảo đường cao:
\\[ \\frac{1}{AH^2} = \\frac{1}{AB^2} + \\frac{1}{AC^2} \\]
\\end{ex}`
  },
  {
    id: 'h_tam_giac_deu',
    name: 'Hình tam giác đều',
    category: 'flat',
    categoryName: 'Hình phẳng (2D)',
    description: 'Tam giác đều có cả 3 cạnh bằng nhau (độ dài a). Mọi góc trong tam giác đều bằng 60 độ (\\pi/3).',
    formulas: [
      { name: 'Chiều cao (Đường cao)', eq: 'AH = \\frac{a \\sqrt{3}}{2}' },
      { name: 'Diện tích tam giác đều', eq: 'S = \\frac{a^2 \\sqrt{3}}{4}' }
    ],
    svgType: 'equilateral_triangle',
    latexEx: `\\begin{ex}[Công thức Hình phẳng - Tam giác đều]
Cho tam giác đều $ABC$ cạnh $a$. Gọi $H$ là trung điểm của cạnh $BC$.
Độ dài đường cao $AH$ và diện tích $S$ của tam giác đều được tính theo công thức:
\\[ AH = \\frac{a\\sqrt{3}}{2} \\quad \\text{và} \\quad S = \\frac{a^2\\sqrt{3}}{4} \\]
\\end{ex}`
  },
  {
    id: 'h_vuong',
    name: 'Hình vuông',
    category: 'flat',
    categoryName: 'Hình phẳng (2D)',
    description: 'Tứ giác đều có 4 cạnh bằng nhau (độ dài a) và 4 góc vuông.',
    formulas: [
      { name: 'Diện tích', eq: 'S = a^2' },
      { name: 'Chu vi', eq: 'C = 4 \\times a' },
      { name: 'Đường chéo', eq: 'd = a\\sqrt{2}' }
    ],
    svgType: 'square',
    latexEx: `\\begin{ex}[Công thức Hình phẳng - Hình vuông]
Cho hình vuông cạnh $a$.
Diện tích $S$ và chu vi $C$ và đường chéo $d$ của hình vuông được tính bằng:
\\[ S = a^2, \\quad C = 4a, \\quad d = a\\sqrt{2} \\]
\\end{ex}`
  },
  {
    id: 'h_chu_nhat',
    name: 'Hình chữ nhật',
    category: 'flat',
    categoryName: 'Hình phẳng (2D)',
    description: 'Tứ giác có 4 góc vuông, hai cặp cạnh đối diện song song và bằng nhau với chiều dài a và chiều rộng b.',
    formulas: [
      { name: 'Diện tích', eq: 'S = a \\times b' },
      { name: 'Chu vi', eq: 'C = 2 \\times (a + b)' },
      { name: 'Đường chéo', eq: 'd = \\sqrt{a^2 + b^2}' }
    ],
    svgType: 'rectangle',
    latexEx: `\\begin{ex}[Công thức Hình phẳng - Hình chữ nhật]
Cho hình chữ nhật có chiều dài $a$ và chiều rộng $b$.
Diện tích $S$ và chu vi $C$ của hình chữ nhật:
\\[ S = a \\times b, \\quad C = 2(a + b) \\]
\\end{ex}`
  },
  {
    id: 'h_binh_hanh',
    name: 'Hình bình hành',
    category: 'flat',
    categoryName: 'Hình phẳng (2D)',
    description: 'Tứ giác có hai cặp cạnh đối song song. Đáy là a, chiều cao tương ứng hạ vuông góc là h, và cạnh bên là b.',
    formulas: [
      { name: 'Diện tích', eq: 'S = a \\times h' },
      { name: 'Chu vi', eq: 'C = 2 \\times (a + b)' }
    ],
    svgType: 'parallelogram',
    latexEx: `\\begin{ex}[Công thức Hình phẳng - Hình bình hành]
Cho hình bình hành có cạnh đáy $a$, chiều cao ứng với đáy là $h$ và cạnh bên là $b$.
Diện tích $S$ và chu vi $C$ của hình bình hành được tính bởi:
\\[ S = a \\times h, \\quad C = 2(a+b) \\]
\\end{ex}`
  },
  {
    id: 'h_thoi',
    name: 'Hình thoi',
    category: 'flat',
    categoryName: 'Hình phẳng (2D)',
    description: 'Tứ giác có 4 cạnh bằng nhau (độ dài a). Có hai đường chéo vuông góc d_1 và d_2.',
    formulas: [
      { name: 'Diện tích (Đường chéo)', eq: 'S = \\frac{1}{2} d_1 \\times d_2' },
      { name: 'Diện tích (Góc)', eq: 'S = a^2 \\cdot \\sin A' },
      { name: 'Chu vi', eq: 'C = 4 \\times a' }
    ],
    svgType: 'rhombus',
    latexEx: `\\begin{ex}[Công thức Hình phẳng - Hình thoi]
Cho hình thoi có độ dài cạnh bằng $a$, độ dài hai đường chéo là $d_1$ và $d_2$.
Diện tích $S$ và chu vi $C$ của hình thoi:
\\[ S = \\frac{1}{2} d_1 \\times d_2 = a^2 \\sin A, \\quad C = 4a \\]
\\end{ex}`
  },
  {
    id: 'h_thang',
    name: 'Hình thang',
    category: 'flat',
    categoryName: 'Hình phẳng (2D)',
    description: 'Tứ giác có hai cạnh đáy đối diện song song (đáy lớn b, đáy bé a), chiều cao vuông góc giữa hai đáy là h, và hai cạnh bên là c, d.',
    formulas: [
      { name: 'Diện tích', eq: 'S = \\frac{(a+b) \\times h}{2}' },
      { name: 'Chu vi', eq: 'C = a + b + c + d' }
    ],
    svgType: 'trapezoid',
    latexEx: `\\begin{ex}[Công thức Hình phẳng - Hình thang]
Cho hình thang có độ dài hai đáy lần lượt là $a, b$ (đáy bé, đáy lớn), chiều cao ngăn cách $h$ và hai cạnh bên là $c, d$.
Diện tích $S$ và chu vi $C$ của hình thang:
\\[ S = \\frac{(a+b) \\times h}{2}, \\quad C = a+b+c+d \\]
\\end{ex}`
  },
  {
    id: 'h_tu_giac_cheo_vuong',
    name: 'Tứ giác có hai chéo vuông góc',
    category: 'flat',
    categoryName: 'Hình phẳng (2D)',
    description: 'Tứ giác bất kỳ có hai đường chéo AC và BD vuông góc với nhau tại giao điểm O.',
    formulas: [
      { name: 'Diện tích', eq: 'S = \\frac{1}{2} AC \\cdot BD' },
      { name: 'Tính chất đường chéo', eq: 'AC \\perp BD \\quad \\text{tại } O' }
    ],
    svgType: 'orthogonal_quadrilateral',
    latexEx: `\\begin{ex}[Công thức Hình phẳng - Tứ giác có hai đường chéo vuông góc]
Cho tứ giác lồi $ABCD$ có hai đường chéo $AC$ và $BD$ vuông góc với nhau tại $O$.
Diện tích của tứ giác được tính bằng nửa tích độ dài hai đường chéo:
\\[ S = \\frac{1}{2} AC \\cdot BD \\]
\\end{ex}`
  },
  {
    id: 'h_elip',
    name: 'Hình Elip',
    category: 'flat',
    categoryName: 'Hình phẳng (2D)',
    description: 'Tập hợp các điểm có tổng khoảng cách tới hai tiêu điểm là hằng số. Trục lớn có nửa độ dài là a, trục bé có nửa độ dài là b.',
    formulas: [
      { name: 'Diện tích Elip', eq: 'S = \\pi a b' },
      { name: 'Phương trình chính tắc', eq: '\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1' },
      { name: 'Hàm số biên của Elip', eq: 'y = \\pm b \\sqrt{1 - \\frac{x^2}{a^2}}' }
    ],
    svgType: 'ellipse',
    latexEx: `\\begin{ex}[Công thức Hình phẳng - Hình Elip]
Cho hình Elip có độ dài nửa trục lớn bằng $a$ và độ dài nửa trục bé bằng $b$.
Diện tích $S$ của Elip và phương trình biên đồ thị:
\\[ S = \\pi ab \\]
Phương trình chính tắc của đường Elip:
\\[ \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\Rightarrow y = \\pm b\\sqrt{1 - \\frac{x^2}{a^2}} \\]
\\end{ex}`
  },
  {
    id: 'h_tron',
    name: 'Hình tròn',
    category: 'flat',
    categoryName: 'Hình phẳng (2D)',
    description: 'Quỹ tích các điểm nằm trong mặt phẳng cách một điểm cố định (tâm O) một khoảng không đổi (bán kính r).',
    formulas: [
      { name: 'Diện tích', eq: 'S = \\pi r^2' },
      { name: 'Chu vi (Đường tròn)', eq: 'P = 2\\pi r' },
      { name: 'Phương trình chính tắc', eq: '(x-a)^2 + (y-b)^2 = R^2' }
    ],
    svgType: 'circle',
    latexEx: `\\begin{ex}[Công thức Hình phẳng - Hình tròn]
Cho hình tròn có bán kính $r$ (hoặc đường tròn tâm $I(a; b)$ bán kính $R$).
Diện tích $S$ và chu vi $P$ của hình tròn được xác định bởi:
\\[ S = \\pi r^2, \\quad P = 2\\pi r \\]
Phương trình đường tròn trong mặt phẳng tọa độ $Oxy$:
\\[ (x-a)^2 + (y-b)^2 = R^2 \\Rightarrow y = b \\pm \\sqrt{R^2 - (x-a)^2} \\]
\\end{ex}`
  },

  // CATEGORY 2: KHỐI ĐA DIỆN & TRÒN XOAY CƠ BẢN (3D BASIC)
  {
    id: 'k_lang_tru_bien_doi',
    name: 'Khối lăng trụ có đáy biến đổi',
    category: 'basic3d',
    categoryName: 'Khối 3D Cơ Bản',
    description: 'Khối đa diện có tất cả các đỉnh nằm trong hai mặt phẳng song song chứa hai đáy. Các mặt bên có thể là hình tam giác, hình thang hoặc hình bình hành.',
    formulas: [
      { name: 'Công thức Simpson (Thiết diện)', eq: 'V = \\frac{h}{6} (A_1 + 4A_m + A_2)' },
      { name: 'Chú thích ký hiệu', eq: 'A_1, A_2 \\text{ là diện tích đáy lớn, bé}.\\, A_m \\text{ là diện tích thiết diện ở chính giữa}.' }
    ],
    svgType: 'prism_variable',
    latexEx: `\\begin{ex}[Thể tích Lăng trụ đáy biến đổi - Công thức Simpson]
Xét khối đa diện có các đỉnh nằm trên hai mặt phẳng song song. Gọi $h$ là khoảng cách giữa hai đáy.
Diện tích hai đáy lần lượt là $A_1$ và $A_2$. Gọi $A_m$ là diện tích thiết diện song song cắt ở chính giữa chiều cao.
Thể tích $V$ của khối đa diện này tuân theo công thức Simpson:
\\[ V = \\frac{h}{6}(A_1 + 4A_m + A_2) \\]
\\end{ex}`
  },
  {
    id: 'k_mai_nha',
    name: 'Khối "Mái Nhà" (Lăng trụ cụt)',
    category: 'basic3d',
    categoryName: 'Khối 3D Cơ Bản',
    description: 'Khối cụt đặc biệt có đáy là một hình chữ nhật với chiều rộng a, chiều dài L. Mặt trên thu gọn chỉ còn là một đoạn thẳng (cạnh mái nhà) song song với đáy, có độ dài là a_1, chiều cao thẳng đứng hạ từ đỉnh xuống đáy là h.',
    formulas: [
      { name: 'Thể tích khối mái nhà', eq: 'V = \\frac{L \\cdot h}{6} (2a + a_1)' }
    ],
    svgType: 'roof_prism',
    latexEx: `\\begin{ex}[Thể tích Khối lăng trụ cụt "Mái Nhà"]
Xét khối mái nhà có mặt đáy là hình chữ nhật rộng $a$, dài $L$. Cạnh đỉnh là mái nhà nằm song song với mặt đáy có độ dài là $a_1$, chiều cao thẳng đứng hạ từ đỉnh xuống đáy là $h$.
Thể tích của khối mái nhà được tính:
\\[ V = \\frac{L \\cdot h}{6}(2a + a_1) \\]
\\end{ex}`
  },
  {
    id: 'k_cau',
    name: 'Khối cầu',
    category: 'basic3d',
    categoryName: 'Khối 3D Cơ Bản',
    description: 'Vật thể ba chiều được vây quanh bởi mặt cầu O có bán kính R (đường kính d = 2R).',
    formulas: [
      { name: 'Diện tích mặt cầu', eq: 'S = 4\\pi R^2 = \\pi d^2' },
      { name: 'Thể tích khối cầu', eq: 'V = \\frac{4}{3}\\pi R^3' }
    ],
    svgType: 'sphere',
    latexEx: `\\begin{ex}[Diện tích và Thể tích Khối cầu]
Cho khối cầu có bán kính $R$ và đường kính $d = 2R$.
Diện tích mặt cầu $S$ và thể tích khối cầu $V$:
\\[ S = 4\\pi R^2 = \\pi d^2 \\]
\\[ V = \\frac{4}{3}\\pi R^3 \\]
\\end{ex}`
  },
  {
    id: 'k_chom_cau',
    name: 'Khối chỏm cầu',
    category: 'basic3d',
    categoryName: 'Khối 3D Cơ Bản',
    description: 'Phần khối cầu bị cắt bớt đi bởi một mặt phẳng cắt phẳng. R là bán kính khối cầu mẹ, h là chiều cao từ đỉnh chỏm đến mặt phẳng cắt, r là bán kính của đường tròn đáy chỏm cầu cắt.',
    formulas: [
      { name: 'Diện tích mặt chỏm', eq: 'S = 2\\pi R h' },
      { name: 'Thể tích (Theo bán kính cầu R)', eq: 'V = \\pi h^2 \\left(R - \\frac{h}{3}\\right)' },
      { name: 'Thể tích (Theo bán kính đáy chỏm r)', eq: 'V = \\frac{1}{6}\\pi h (3r^2 + h^2)' }
    ],
    svgType: 'spherical_cap',
    latexEx: `\\begin{ex}[Diện tích và Thể tích Khối chỏm cầu]
Cho khối chỏm cầu có chiều cao phần bị cắt là $h$, đường tròn đáy chỏm có bán kính $r$, và bán kính của mặt cầu mẹ ban đầu là $R$.
Diện tích mặt cong của chỏm cầu:
\\[ S = 2\\pi Rh \\]
Thể tích của khối chỏm cầu được tính bằng hai cách dựa trên các tham số có sẵn:
\\[ V = \\pi h^2 \\left( R - \\frac{h}{3} \\right) = \\frac{1}{6}\\pi h(3r^2 + h^2) \\]
\\end{ex}`
  },
  {
    id: 'k_doi_cau',
    name: 'Khối đới cầu',
    category: 'basic3d',
    categoryName: 'Khối 3D Cơ Bản',
    description: 'Phần khối cầu nằm giữa hai mặt phẳng song song cắt qua khối cầu. Khoảng cách giữa hai mặt cắt là h, hai đường tròn đáy tương ứng có bán kính r_1 và r_2.',
    formulas: [
      { name: 'Thể tích đới cầu', eq: 'V = \\frac{1}{6}\\pi h (3r_1^2 + 3r_2^2 + h^2)' }
    ],
    svgType: 'spherical_segment',
    latexEx: `\\begin{ex}[Thể tích Khối đới cầu]
Xét khối đới cầu được giới hạn bởi hai mặt phẳng song song cắt qua mặt cầu. Gọi $h$ là khoảng cách giữa hai mặt phẳng, $r_1$ và $r_2$ lần lượt là bán kính của hai đường tròn đáy ở hai mặt cắt.
Thể tích của khối đới cầu:
\\[ V = \\frac{1}{6}\\pi h(3r_1^2 + 3r_2^2 + h^2) \\]
\\end{ex}`
  },
  {
    id: 'k_non',
    name: 'Khối nón',
    category: 'basic3d',
    categoryName: 'Khối 3D Cơ Bản',
    description: 'Hình nón tròn xoay được tạo thành khi quay tam giác vuông quanh một trục góc vuông. Đáy có bán kính r, chiều cao thẳng đứng h, và đường sinh có độ dài l.',
    formulas: [
      { name: 'Diện tích đáy', eq: 'S_d = \\pi r^2' },
      { name: 'Diện tích xung quanh', eq: 'S_{xq} = \\pi r l' },
      { name: 'Diện tích toàn phần', eq: 'S_{tp} = S_{xq} + S_d = \\pi r (l + r)' },
      { name: 'Thể tích', eq: 'V = \\frac{1}{3} \\pi r^2 h' },
      { name: 'Phương trình đặc trưng', eq: 'l^2 = r^2 + h^2 \\quad \\text{và Chu vi đáy: } C = 2\\pi r' }
    ],
    svgType: 'cone',
    latexEx: `\\begin{ex}[Diện tích và Thể tích Khối nón tròn xoay]
Cho khối nón có bán kính đáy $r$, chiều cao thẳng đứng $h$, và độ dài đường sinh $l$.
Mối liên hệ đặc trưng giữa các cạnh: $l^2 = r^2 + h^2$.
Các công thức tính diện tích và thể tích gồm:
\\begin{align*}
    &S_{xq} = \\pi r l, \\quad S_{tp} = \\pi r l + \\pi r^2 \\\\
    &V = \\frac{1}{3}\\pi r^2 h
\\end{align*}
\\end{ex}`
  },
  {
    id: 'k_tru',
    name: 'Khối trụ',
    category: 'basic3d',
    categoryName: 'Khối 3D Cơ Bản',
    description: 'Khối tròn xoay tạo thành khi xoay một hình chữ nhật quanh một trục cạnh của nó. Có chiều cao h, độ dài đường sinh l, và bán kính đáy r.',
    formulas: [
      { name: 'Diện tích đáy', eq: 'S_d = \\pi r^2' },
      { name: 'Diện tích xung quanh', eq: 'S_{xq} = 2\\pi r l' },
      { name: 'Diện tích toàn phần', eq: 'S_{tp} = S_{xq} + 2S_d = 2\\pi r (l + r)' },
      { name: 'Thể tích lăng trụ/trụ', eq: 'V = \\pi r^2 h \\quad \\text{với } h = l' }
    ],
    svgType: 'cylinder',
    latexEx: `\\begin{ex}[Diện tích và Thể tích Khối trụ tròn xoay]
Cho hình trụ có bán kính đường tròn đáy bằng $r$, chiều cao thẳng đứng $h$ và chiều dài đường sinh $l = h$.
Tính diện tích xung quanh, toàn phần và thể tích khối trụ theo công thức:
\\begin{align*}
    &S_{xq} = 2\\pi r l = 2\\pi r h \\\\
    &S_{tp} = 2\\pi r l + 2\\pi r^2 = 2\\pi r(h+r) \\\\
    &V = \\pi r^2 h
\\end{align*}
\\end{ex}`
  },
  {
    id: 'k_tru_cut',
    name: 'Khối trụ cụt',
    category: 'basic3d',
    categoryName: 'Khối 3D Cơ Bản',
    description: 'Hình trụ tròn xoay bị cắt chéo phẳng nghiêng ở miệng trên. Có bán kính đáy R, chiều cao thấp nhất bên lườn là h_1, và chiều cao cao nhất là h_2.',
    formulas: [
      { name: 'Diện tích xung quanh', eq: 'S_{xq} = \\pi R (h_1 + h_2)' },
      { name: 'Thể tích trụ cụt', eq: 'V = \\pi R^2 \\frac{h_1 + h_2}{2}' }
    ],
    svgType: 'cylinder_truncated',
    latexEx: `\\begin{ex}[Diện tích và Thể tích Khối trụ cụt]
Cho khối trụ cụt có bán kính đáy đường tròn bằng $R$. Mặt trên bị cắt xiên bởi một mặt phẳng nghiêng, dẫn đến chiều cao của hai cạnh lườn thấp nhất và cao nhất lần lượt là $h_1$ và $h_2$.
Khi đó ta có các công thức:
\\begin{align*}
    &S_{xq} = \\pi R(h_1 + h_2) \\\\
    &V = \\pi R^2 \\frac{h_1 + h_2}{2}
\\end{align*}
\\end{ex}`
  },
  {
    id: 'k_non_cut',
    name: 'Khối nón cụt',
    category: 'basic3d',
    categoryName: 'Khối 3D Cơ Bản',
    description: 'Phần khối nón nằm giữa mặt đáy và một mặt cắt song song với đáy. Có bán kính đáy lớn R, bán kính đáy nhỏ r, chiều cao h, và đường sinh l.',
    formulas: [
      { name: 'Đường sinh', eq: 'l^2 = h^2 + (R-r)^2' },
      { name: 'Diện tích xung quanh', eq: 'S_{xq} = \\pi (R+r)l' },
      { name: 'Thể tích nón cụt', eq: 'V = \\frac{1}{3}\\pi h (R^2 + r^2 + R \\cdot r)' }
    ],
    svgType: 'cone_truncated',
    latexEx: `\\begin{ex}[Thể tích và Diện tích Khối nón cụt]
Cho khối nón cụt tròn xoay có bán kính của đường tròn đáy lớn là $R$, bán kính đáy nhỏ là $r$, chiều cao thẳng đứng là $h$ và chiều dài đường sinh là $l$.
Phương trình đặc trưng hình nón cụt: $l^2 = h^2 + (R-r)^2$.
Diện tích xung quanh và thể tích được cho bởi:
\\[ S_{xq} = \\pi (R+r)l \\]
\\[ V = \\frac{1}{3}\\pi h(R^2 + r^2 + R \\cdot r) \\]
\\end{ex}`
  },

  // CATEGORY 3: KHỐI VẬT THỂ NÂNG CAO TRONG TÍCH PHÂN & CHÓP XOAY (3D ADVANCED & CALCULUS)
  {
    id: 'k_viviani',
    name: 'Khối vật thể Viviani',
    category: 'advanced3d',
    categoryName: 'Tích phân & Tròn Xoay 1',
    description: 'Phần không gian bị giới hạn đồng thời nằm bên trong mặt cầu bán kính R và nằm bên trong một ống trụ tròn xoay có đường kính đáy đúng bằng bán kính R của mặt cầu, đồng thời trục của mặt trụ đi qua tâm của mặt cầu.',
    formulas: [
      { name: 'Thể tích vật thể Viviani', eq: 'V = \\frac{2}{3} R^3 \\left(\\pi - \\frac{4}{3}\\right)' },
      { name: 'Ghi chú', eq: 'R là bán kính của khối cầu mẹ.' }
    ],
    svgType: 'viviani',
    latexEx: `\\begin{ex}[Bài toán Thể tích vật thể Viviani]
Vật thể Viviani là phần không gian nằm bên trong một mặt cầu bán kính $R$ và đồng thời nằm bên trong một mặt trụ tròn xoay, với điều kiện đường kính của mặt trụ bằng bán kính $R$ của mặt cầu và đường sinh của mặt trụ đi qua tâm của mặt cầu.
Bằng việc sử dụng tích phân hai lớp trong hệ tọa độ cực, ta tính được thể tích $V$ của vật thể đặc biệt này:
\\[ V = \\frac{2}{3} R^3 \\left( \\pi - \\frac{4}{3} \\right) \\]
\\end{ex}`
  },
  {
    id: 'k_3_tru_giao_nhau',
    name: 'Giao của 3 hình trụ (Tricylinder)',
    category: 'advanced3d',
    categoryName: 'Tích phân & Tròn Xoay 1',
    description: 'Khối hình học được thành lập khi cho ba khối trụ tròn có cùng bán kính r giao nhau vuông góc từng đôi một tại cùng một tâm chung.',
    formulas: [
      { name: 'Thể tích phần chung', eq: 'V = 8 (2 - \\sqrt{2}) r^3 \\approx 4.686 \\cdot r^3' }
    ],
    svgType: 'tricylinder',
    latexEx: `\\begin{ex}[Thể tích Giao ba mặt trụ tròn - Steinmetz Solid]
Xét ba hình trụ tròn có cùng bán kính $r$, trục của cả ba hình trụ trùng với các trục tọa độ $Ox, Oy, Oz$ và cắt nhau vuông góc tại tâm $O$.
Thể tích phần không gian chung (giao nhau của ba hình trụ) được xác định bằng phương pháp tích phân đa lớp:
\\[ V = 8(2-\\sqrt{2})r^3 \\]
\\end{ex}`
  },
  {
    id: 'k_elipsoid',
    name: 'Khối elip (Ellipsoid)',
    category: 'advanced3d',
    categoryName: 'Tích phân & Tròn Xoay 1',
    description: 'Vật thể 3D hình trứng/elip ba chiều có 3 bán trục thẳng góc lần lượt là a, b, c. Đây là phiên bản kéo dãn của khối cầu.',
    formulas: [
      { name: 'Thể tích Ellipsoid', eq: 'V = \\frac{4}{3}\\pi a b c' },
      { name: 'Phương trình mặt', eq: '\\frac{x^2}{a^2} + \\frac{y^2}{b^2} + \\frac{z^2}{c^2} = 1' }
    ],
    svgType: 'ellipsoid',
    latexEx: `\\begin{ex}[Thể tích Khối Ellipsoid ba chiều]
Cho khối Ellipsoid ba chiều có độ dài ba bán trục đối xứng tự do lần lượt là $a, b, c$.
Phương trình đặc trưng của biên mặt Ellipsoid trong hệ tọa độ Descardes $Oxyz$:
\\[ \\frac{x^2}{a^2} + \\frac{y^2}{b^2} + \\frac{z^2}{c^2} = 1 \\]
Thể tích của khối Ellipsoid này được xác định bởi công thức:
\\[ V = \\frac{4}{3}\\pi abc \\]
\\end{ex}`
  },
  {
    id: 'k_thiet_dien_hv',
    name: 'Học Thuyết Thiết Diện Biến Thiên',
    category: 'advanced3d',
    categoryName: 'Tích phân & Tròn Xoay 1',
    description: 'Vật thể nằm kẹp giữa hai mặt phẳng vuông góc với trục Ox tại x=a và x=b. Cắt vật thể bởi mặt phẳng bất kỳ vuông góc trục Ox tại tọa độ x có mặt cắt là một hình vuông có độ dài cạnh là s(x).',
    formulas: [
      { name: 'Diện tích mặt cắt tại x', eq: 'S(x) = [s(x)]^2' },
      { name: 'Thể tích vật thể bằng tích phân', eq: 'V = \\int_{a}^{b} [s(x)]^2 dx' }
    ],
    svgType: 'variable_square_cross_section',
    latexEx: `\\begin{ex}[Tính Thể tích vật thể có Thiết diện biến thiên - Ứng dụng Tích phân]
Một vật thể được giới hạn bởi hai mặt phẳng vuông góc với trục hoành tại $x=a$ và $x=b$.
Tại mỗi điểm có hoành độ $x$ trên đoạn $[a; b]$, ta cắt vật thể bằng một mặt phẳng vuông góc với trục $Ox$, được thiết diện thu về là một hình vuông có cạnh dài $s(x)$.
Diện tích thiết diện là $S(x) = [s(x)]^2$. Thể tích $V$ của vật thể được tính bằng tích phân:
\\[ V = \\int_{a}^{b} [s(x)]^2 dx \\]
\\end{ex}`
  },
  {
    id: 'k_chop_elip',
    name: 'Khối chóp đáy là hình elip',
    category: 'advanced3d',
    categoryName: 'Tích phân & Tròn Xoay 1',
    description: 'Khối chóp có đỉnh S đơn nhọn cao h so với mặt đáy. Điểm đặc trưng là toàn bộ nền đáy là hình dáng Elip có hai bán trục chính là a và b.',
    formulas: [
      { name: 'Thể tích chóp đáy Elip', eq: 'V = \\frac{1}{3} \\pi a b h' }
    ],
    svgType: 'pyramid_ellipse',
    latexEx: `\\begin{ex}[Thể tích Khối chóp có đáy Elip]
Cho khối chóp có chiều cao từ đỉnh đến mặt đáy bằng $h$, diện tích mặt đáy có hình dạng một đường Elip có độ dài hai bán trục lớn nhỏ lần lượt là $a$ và $b$.
Khi đó thể tích $V$ của khối chóp đáy Elip được tính:
\\[ V = \\frac{1}{3} S_{đáy} \\cdot h = \\frac{1}{3} \\pi ab h \\]
\\end{ex}`
  },
  {
    id: 'k_chop_cut_hyperbol',
    name: 'Chóp cụt Hyperbol',
    category: 'advanced3d',
    categoryName: 'Tích phân & Tròn Xoay 1',
    description: 'Khối có hai đáy tròn xoay đối xứng lượn thắt eo hyperboloid ở giữa. Biểu diễn h và k lần lượt là khoảng cách thẳng đứng từ mặt cắt đáy tới eo bóp ở giữa.',
    formulas: [
      { name: 'Thể tích cụt Hyperbol', eq: 'V = \\pi a^2 \\left[ (h + k) + \\frac{h^3 + k^3}{3b^2} \\right]' },
      { name: 'Phương trình tiệm cận biên', eq: 'x^2 = a^2 \\left( 1 + \\frac{y^2}{b^2} \\right)' }
    ],
    svgType: 'hyperboloid_segment',
    latexEx: `\\begin{ex}[Bài toán cổ thể tích chóp cụt Hyperboloid một phần]
Xét vật thể dạng đới cụt của một Hyperboloid tròn xoay một phần có phương trình biên $x^2 = a^2(1 + \\frac{y^2}{b^2})$.
Phần vật thể được giới hạn bởi hai mặt phẳng song song cắt ngang ở tọa độ $y = -h$ và $y = k$.
Thể tích phần chóp cụt thắt bụng này:
\\[ V = \\pi a^2 \\left[ (h+k) + \\frac{h^3+k^3}{3b^2} \\right] \\]
\\end{ex}`
  },
  {
    id: 'k_trai_anh_dao',
    name: 'Khối trái anh đào (Cherry)',
    category: 'advanced3d',
    categoryName: 'Tích phân & Tròn Xoay 1',
    description: 'Khối tròn xoay hoàn hảo được sinh ra bằng cách xoay toàn bộ một đường hình tim (Cardioid) xung quanh trục đối xứng chính của nó.',
    formulas: [
      { name: 'Thể tích vật thể', eq: 'V = \\frac{8}{3}\\pi a^3' },
      { name: 'Đường sinh Cardioid', eq: 'r = a(1 + \\cos\\theta)' }
    ],
    svgType: 'cherry_cardioid',
    latexEx: `\\begin{ex}[Thể tích Khối Tròn xoay Trái anh đào]
Xét đường Cardioid trong tọa độ cực có phương trình $r = a(1 + \\cos\\theta)$ với $a > 0$.
Xoay đường này quanh trục cực đối xứng trục hoành $Ox$.
Thể tích khối tròn xoay thu được (kiến lập lên hình dáng như quả anh đào):
\\[ V = \\frac{8}{3} \\pi a^3 \\]
\\end{ex}`
  },
  {
    id: 'k_xuyen_hinh_sao',
    name: 'Hình xuyến hình sao 4 cánh (Astroid)',
    category: 'advanced3d',
    categoryName: 'Tích phân & Tròn Xoay 1',
    description: 'Vật thể tròn xoay phức tạp được tạo ra khi quay toàn bộ hình sao bốn cánh Astroid xung quanh trục hoành.',
    formulas: [
      { name: 'Thể tích hình xuyến Astroid', eq: 'V = \\frac{32}{105}\\pi a^3' },
      { name: 'Phương trình biên astroid', eq: 'x^{2/3} + y^{2/3} = a^{2/3}' }
    ],
    svgType: 'astroid_revolution',
    latexEx: `\\begin{ex}[Thể tích Vật thể khi quay đường Astroid]
Cho đường hình sao bốn cánh Astroid có phương trình Descartes biểu diễn:
\\[ x^{2/3} + y^{2/3} = a^{2/3} \\]
Hàm số biểu diễn trong hệ tọa độ tham số: $x = a \\cos^3 t,\\, y = a \\sin^3 t$.
Khi cho đường cong này tự quay 360 độ xung quanh trục hoành $Ox$, thể tích khối tròn xoay phức hợp sinh ra:
\\[ V = \\frac{32}{105}\\pi a^3 \\]
\\end{ex}`
  },
  {
    id: 'k_giot_nuoc',
    name: 'Giọt nước (Piriform)',
    category: 'advanced3d',
    categoryName: 'Tích phân & Tròn Xoay 1',
    description: 'Khối tròn xoay mô phỏng hoàn hảo giọt nước rơi tự do, tạo thành bằng cách xoay đường cong Piriform xoay trục hoành. Trục h là chiều cao của giọt, a là tham số béo bụng.',
    formulas: [
      { name: 'Thể tích giọt nước', eq: 'V = \\frac{1}{20}\\pi a^2 h^3' },
      { name: 'Phương trình biên giọt nước', eq: 'y^2 = a^2 \\frac{x^3(h-x)}{h^4}' }
    ],
    svgType: 'drop_piriform',
    latexEx: `\\begin{ex}[Đồ thị và Thể tích Giọt nước Piriform]
Xét đường cong giọt nước cổ (Piriform Curve) có phương trình đại số:
\\[ y^2 = a^2 \\frac{x^3(h-x)}{h^4} \\quad (0 \\le x \\le h) \\]
Với $h$ là chiều cao tổng thể của giọt và $a$ là tham số tỉ lệ độ bự múp của giọt nước.
Tạo vật thể 3D tròn xoay bằng cách quay đường cong này quanh trục $Ox$.
Bằng phương pháp tích phân thể tích:
\\[ V = \\pi \\int_{0}^{h} y^2 dx = \\frac{1}{20} \\pi a^2 h^3 \\]
\\end{ex}`
  },
  {
    id: 'k_cycloid_xoay',
    name: 'Khối tròn xoay của Cycloid',
    category: 'advanced3d',
    categoryName: 'Tích phân & Tròn Xoay 1',
    description: 'Cho một bánh xe bán kính a lăn không trượt trên trục hoành, một điểm cố định trên vành bánh xe vạch ra một đường Cycloid. Cho cung Cycloid đơn này xoay tròn quanh trục hoành Ox.',
    formulas: [
      { name: 'Thể tích khối tròn xoay', eq: 'V = 5\\pi^2 a^3' },
      { name: 'Hệ phương trình tham số', eq: 'x = a(t - \\sin t), \\quad y = a(1 - \\cos t) \\quad (0 \\le t \\le 2\\pi)' }
    ],
    svgType: 'cycloid_revolution',
    latexEx: `\\begin{ex}[Thể tích Tròn xoay của đường Cycloid]
Cho cung Cycloid sinh bởi bánh xe bán kính $a$ lăn trên đường thẳng có phương trình tham số cực:
\\[ \\begin{cases} x = a(t - \\sin t) \\\\ y = a(1 - \\cos t) \\end{cases} \\quad t \\in [0; 2\\pi] \\]
Cho vật thể quay quanh trục hoành $Ox$. Thể tích $V$ của khối tròn xoay này được tính bằng tích phân:
\\[ V = \\pi \\int_{0}^{2\\pi a} y^2 dx = \\pi \\int_{0}^{2\\pi} y(t)^2 x'(t) dt = 5\\pi^2 a^3 \\]
\\end{ex}`
  },

  // CATEGORY 4: KHỐI CHUYÊN SÂU KHÁC (3D SPECIAL SOLIDS)
  {
    id: 'k_hinh_xuyen',
    name: 'Khối hình xuyến (Torus)',
    category: 'special3d',
    categoryName: 'Chuyên Sâu & Hình Học Đặc Biệt',
    description: 'Mặt xoay bánh Doughnut tạo thành từ quay một đường tròn bán kính r quanh một trục song song xa hơn cách tâm một khoảng R.',
    formulas: [
      { name: 'Thể tích khối Torus chính', eq: 'V = \\frac{1}{4}\\pi^2 (R+r)(R-r)^2 = 2\\pi^2 R_0 r_0^2' },
      { name: 'Mô tả tham số', eq: 'R \\text{ là bán kính ngoài}.\\, r \\text{ là bán kính trong}.' }
    ],
    svgType: 'torus',
    latexEx: `\\begin{ex}[Thể tích Khối hình xuyến Torus - Bánh Phao]
Cho hình xuyến sinh bởi chuyển động quay tròn của một đường tròn bán kính r xung quanh một trục nằm cùng mặt phẳng với đường tròn nhưng không cắt đường tròn đó và cách tâm đường tròn một khoảng R.
Thể tích $V$ của khối Torus đặc biệt này:
\\[ V = 2\\pi^2 R r^2 = \\frac{1}{4} \\pi^2 (R_{\\text{ngoài}} + R_{\\text{trong}})(R_{\\text{ngoài}} - R_{\\text{trong}})^2 \\]
\\end{ex}`
  },
  {
    id: 'k_cau_noi_tiep_tu_dien',
    name: 'Cầu nội tiếp tứ diện',
    category: 'special3d',
    categoryName: 'Chuyên Sâu & Hình Học Đặc Biệt',
    description: 'Một quả cầu nằm kín khít khàn khít bên trong, tiếp xúc trực tiếp kẹp chặt với tất cả bốn mặt phẳng của hình chóp tứ diện.',
    formulas: [
      { name: 'Bán kính quả cầu nội tiếp', eq: 'r = \\frac{3V}{S_{tp}}' },
      { name: 'Ký hiệu liên đới', eq: 'V \\text{ là thể tích tứ diện}.\\, S_{tp} \\text{ là tổng diện tích của 4 mặt}.' }
    ],
    svgType: 'tetrahedron_sphere',
    latexEx: `\\begin{ex}[Bán kính mặt cầu nội tiếp khối Tứ diện]
Cho một hình chóp tam giác (tứ diện) có tổng thể tích là $V$, diện tích toàn phần của 4 mặt phẳng bên ngoài cấu thành là $S_{tp}$.
Bán kính $r$ của mặt cầu nội tiếp tiếp xúc đồng thời 4 mặt đó:
\\[ r = \\frac{3V}{S_{tp}} \\]
\\end{ex}`
  },
  {
    id: 'k_nem_tru_1',
    name: 'Khối nêm trụ loại 1 (Cắt bánh Viviani)',
    category: 'special3d',
    categoryName: 'Chuyên Sâu & Hình Học Đặc Biệt',
    description: 'Hình nêm đặc trưng được hình thành từ một thiết diện cắt xiên xiên qua khối xi-lanh hình trụ tròn. Mặt phẳng xiên đi qua đường kính của đáy mặt trụ, tạo một góc nghiêng alpha so với đáy. Đáy hình nêm là một nửa hình tròn.',
    formulas: [
      { name: 'Chiều cao lườn cao nhất', eq: 'h = r \\tan\\alpha' },
      { name: 'Thể tích khối nêm', eq: 'V = \\frac{2}{3} r^3 \\tan\\alpha' }
    ],
    svgType: 'cylindrical_wedge_1',
    latexEx: `\\begin{ex}[Thể tích Khối nêm trụ loai 1 - Cắt bánh]
Một khối nêm hình trụ tròn được giới hạn bởi đáy là nửa đường tròn bán kính $r$, thành trụ thẳng đứng và một mặt phẳng cắt nghiêng góc $\\alpha$ đi qua đường kính đáy của trụ.
Chiều cao lớn nhất của gờ mép là $h = r\\tan\\alpha$.
Thể tích của khối nêm lồi trụ loại 1 được tính bằng tích phân mặt:
\\[ V = \\frac{2}{3} r^3 \\tan\\alpha \\]
\\end{ex}`
  },
  {
    id: 'k_nem_2',
    name: 'Khối nêm loại 2',
    category: 'special3d',
    categoryName: 'Chuyên Sâu & Hình Học Đặc Biệt',
    description: 'Hình nêm phức hợp thiết diện góc trụ mặt trong có thể tích đặc biệt.',
    formulas: [
      { name: 'Thể tích nêm đặc loại 2', eq: 'V = \\left( \\frac{\\pi}{2} - \\frac{2}{3} \\right) r^3 \\tan\\alpha' }
    ],
    svgType: 'cylindrical_wedge_2',
    latexEx: `\\begin{ex}[Thể tích Khối nêm trụ tròn loại 2]
Tương tự khối nêm loại 1 nhưng phần giới hạn bổ sung phía trong tạo ra thể tích đặc trưng:
\\[ V = \\left( \\frac{\\pi}{2} - \\frac{2}{3} \\right) r^3 \\tan\\alpha \\]
\\end{ex}`
  },
  {
    id: 'k_vong_nhan',
    name: 'Khối vòng nhẫn (Napkin Ring)',
    category: 'special3d',
    categoryName: 'Chuyên Sâu & Hình Học Đặc Biệt',
    description: 'Phần thể tích khối cầu còn sót lại sau khi ta khoan trực tiếp xuyên tâm một ống rỗng thẳng hình trụ có chiều cao h dọc qua chính tâm của nó. Điều kì lạ là thể tích này chỉ phụ thuộc vào chiều cao h của lỗ, không quan tâm bán kính khối cầu ban đầu!',
    formulas: [
      { name: 'Thể tích vòng nhẫn', eq: 'V = \\frac{\\pi h^3}{6}' },
      { name: 'Định lý đặc biệt', eq: 'Thể tích không đổi với mọi kích thước bán kính cầu R ban đầu miễn là chiều cao miệng h giữ nguyên!' }
    ],
    svgType: 'napkin_ring',
    latexEx: `\\begin{ex}[Thể tích Khối Vòng Nhẫn - Napkin Ring Theorem]
Cho khối cầu bán kính $R$ bị khoan một lỗ hình trụ xuyên tâm ở giữa có chiều cao đo thẳng đứng bằng $h$.
Định lý Napkin Ring chỉ ra rằng thể tích phần còn lại của khối cầu hoàn toàn độc lập với bán kính cầu mẹ $R$ mà chỉ phụ thuộc duy nhất vào chiều cao $h$ của lỗ khoan:
\\[ V = \\frac{\\pi h^3}{6} \\]
\\end{ex}`
  },
  {
    id: 'k_2_tru_giao',
    name: 'Giao 2 hình trụ (Bicylinder)',
    category: 'special3d',
    categoryName: 'Chuyên Sâu & Hình Học Đặc Biệt',
    description: 'Hai ống trụ tròn có cùng bán kính r ăn khớp đâm xuyên vuông góc xuyên suốt với nhau.',
    formulas: [
      { name: 'Thể tích phần giao', eq: 'V = \\frac{16}{3} r^3' },
      { name: 'Thể tích đầu sộng (Phần còn)', eq: 'V_{\\text{còn}} = \\pi r^2 h_1 + \\pi r^2 h_2 - \\frac{16}{3} r^3' }
    ],
    svgType: 'bicylinder',
    latexEx: `\\begin{ex}[Giao hai hình trụ tròn vuông góc - Steinmetz Solid]
Xét hai hình trụ tròn đều có bán kính $r$ giao nhau vuông góc từng đôi một.
Thể tích phần giao nhau chung của hai khối trụ:
\\[ V = \\frac{16}{3} r^3 \\]
Thể tích của tổng phần vỉa vỏ hai ống còn lại sau khi mài:
\\[ V_{\\text{còn}} = \\pi r^2 h_1 + \\pi r^2 h_2 - \\frac{16}{3} r^3 \\]
\\end{ex}`
  },
  {
    id: 'k_parabol_ox',
    name: 'Khối parabol quanh Ox',
    category: 'special3d',
    categoryName: 'Chuyên Sâu & Hình Học Đặc Biệt',
    description: 'Tạo bởi việc xoay tròn phần mặt phẳng kẹp giữa Parabol y = ax^2 + bx + c và trục hoành Ox đi từ giao điểm x_1 tới x_2.',
    formulas: [
      { name: 'Thể tích tròn xoay', eq: 'V = \\frac{\\pi a^2 (x_2 - x_1)^5}{30}' },
      { name: 'Phương trình hoành độ', eq: 'a x^2 + b x + c = 0 \\, \\text{có nghiệm } x_1, x_2.' }
    ],
    svgType: 'parabolic_revolution',
    latexEx: `\\begin{ex}[Thể tích Tròn xoay của Parabol xoay quanh trục Ox]
Xét hình phẳng giới hạn bởi đường Parabol $y = ax^2 + bx + c$ và trục hoành $Ox$. Giả sử phương trình có hai nghiệm phân biệt $x_1, x_2$ lần lượt là giao điểm dưới đáy.
Cho hình phẳng này quay xung quanh trục hành $Ox$, thể tích sinh ra của khối nấm Paraboloid:
\\[ V = \\pi \\int_{x_1}^{x_2} (ax^2+bx+c)^2 dx = \\frac{\\pi a^2 (x_2 - x_1)^5}{30} \\]
\\end{ex}`
  },
  {
    id: 'k_paraboloid',
    name: 'Khối paraboloid (Cố định)',
    category: 'special3d',
    categoryName: 'Chuyên Sâu & Hình Học Đặc Biệt',
    description: 'Một khối paraboloid tròn xoay cơ bản có bán kính miệng r và chiều cao tổng là h.',
    formulas: [
      { name: 'Thể tích khối', eq: 'V = \\frac{1}{2}\\pi r^2 h' }
    ],
    svgType: 'paraboloid_basic',
    latexEx: `\\begin{ex}[Thể tích Paraboloid tròn xoay thông thường]
Cho phễu Paraboloid tròn xoay có bán kính miệng bằng $r$, chiều sâu thẳng đứng là $h$.
Thể tích của lòng khối được tính:
\\[ V = \\frac{1}{2} \\pi r^2 h \\]
\\end{ex}`
  }
];
