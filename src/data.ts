import { ClassSchedule, Teacher, Testimonial, FAQItem } from './types';

export const classSchedules: ClassSchedule[] = [
  {
    id: 'l12a',
    className: 'Lớp 12A',
    grade: '12',
    timeRaw: "3h15' - 4h45' Chiều",
    timeFormatted: '15:15 - 16:45',
    days: ['T2', 'T4'],
    startDate: '01/06/2026',
    status: 'active',
    level: 'Ôn thi THPT Quốc Gia & ĐGNL chuyên sâu',
    description: 'Chương trình thiết kế dành riêng cho học sinh chinh phục điểm 8.5+, tập trung phương pháp giải đề nhanh, tư duy bản chất Toán học và kỹ thuật xử lý câu vận dụng cao.'
  },
  {
    id: 'l12b',
    className: 'Lớp 12B',
    grade: '12',
    timeRaw: "5h15' - 6h45' Chiều",
    timeFormatted: '17:15 - 18:45',
    days: ['T3', 'T6'],
    startDate: '01/06/2026',
    status: 'active',
    level: 'Bồi dưỡng Toàn diện - Đạt 8+ dễ dàng',
    description: 'Bảo bối xây dựng nền tảng vững vàng, lấp lỗ hổng kiến thức từ các lớp dưới, rèn luyện kỹ năng thực hành bài bản, chuẩn hóa cấu trúc đề thi của Bộ Giáo Dục.'
  },
  {
    id: 'l11',
    className: 'Lớp 11',
    grade: '11',
    timeRaw: "3h15' - 4h45' Chiều",
    timeFormatted: '15:15 - 16:45',
    days: ['T5', 'T6'],
    startDate: '15/06/2026',
    status: 'active',
    level: 'Toán 11 chất lượng cao (Học bứt phá)',
    description: 'Trọng tâm vào các phần hóc búa của Toán 11 mới như Tổ hợp xác suất, Giới hạn hàm số và Hình học không gian vectơ. Tạo đà vững vàng cho năm cuối cấp.'
  },
  {
    id: 'l10',
    className: 'Lớp 10',
    grade: '10',
    timeRaw: "5h15' - 6h45' Chiều",
    timeFormatted: '17:15 - 18:45',
    days: ['T2', 'T4'],
    startDate: '01/09/2026',
    status: 'active',
    level: 'Nền tảng Toán cấp 3 & Làm quen tư duy THPT',
    description: 'Khai phá sớm kiến thức lớp 10 mới. Giúp học sinh chuyển cấp không bị ngợp trước phương pháp dạy học lý luận logic và đa dạng hóa bài toán tự luận kết hợp trắc nghiệm.'
  },
  {
    id: 'l9',
    className: 'Lớp 9',
    grade: '9',
    timeRaw: "3h00' - 4h30' Chiều",
    timeFormatted: '15:00 - 16:30',
    days: ['T7', 'CN'],
    startDate: '01/06/2026',
    status: 'active',
    level: 'Ôn thi Tuyển sinh vào Lớp 10 Công lập',
    description: 'Khóa học sống còn để bứt phá đạt điểm cao trong kỳ thi Tuyển sinh 10 khó khăn. Rèn luyện kĩ năng giải toán thực tế, dạng toán nâng cao hệ thống đường tròn và phương trình bậc 2.'
  }
];

export const teachers: Teacher[] = [
  {
    name: 'Thầy Nguyễn Đăng Thịnh',
    role: 'Đồng sáng lập & Giảng viên chính',
    degree: 'Thạc sĩ Toán Giải tích',
    specialty: 'Chuyên luyện thi THPT Quốc Gia & thi Chuyên nước rút',
    phone: '0902312328',
    zaloUrl: 'https://zalo.me/0902312328',
    avatarPlaceholder: 'NDT',
    avatarUrl: 'https://lh3.googleusercontent.com/d/1gsXqEjCkZo-Cslc9KDmVYpuP84NG6WtQ',
    characteristics: [
      'Trên 15 năm kinh nghiệm bồi dưỡng học sinh lớp 9 ôn tuyển sinh và lớp 12 luyện thi đại học.',
      'Phong cách giảng dạy logic, tối ưu hóa các bước tư duy, chuyên đào sâu bản chất Toán Giải Tích.',
      'Học viên yêu thích nhờ sự nhiệt huyết, theo sát học lực từng học sinh để can thiệp kịp thời.'
    ]
  },
  {
    name: 'Cô Nguyễn Thị Quỳnh Như',
    role: 'Đồng sáng lập & Giảng viên chính',
    degree: 'Thạc sĩ Toán học',
    specialty: 'Chuyên gia lấy gốc, truyền cảm hứng & nâng cao học sinh toàn diện',
    phone: '0917427741',
    zaloUrl: 'https://zalo.me/0917427741',
    avatarPlaceholder: 'NTQN',
    avatarUrl: 'https://lh3.googleusercontent.com/d/1u6Vy0-b_6r2cIMdPoqgXXazIqhztZmIi',
    characteristics: [
      'Sư phạm bài bản, giàu lòng kiên nhẫn, đặc biệt nhạy bén trong việc khơi gợi tính tự học.',
      'Xây dựng hệ thống học liệu thông minh, theo dõi sát sao sự tiến bộ qua các phiếu đánh giá buổi.',
      'Chuyên trách lộ trình từ cơ bản lên nâng cao, giúp học sinh mất gốc lấy lại sự tự tin bứt phá điểm số.'
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Trần Minh Đăng',
    school: 'Chuyên Lê Hồng Phong',
    scoreBefore: '6.5',
    scoreAfter: 9.6,
    achievement: 'Đậu ĐH Bách Khoa TP.HCM (Toán 9.6 THPTQG)',
    cohort: 'Lớp 12A - Khóa 2025',
    content: 'Thầy Thịnh đã làm thay đổi hoàn toàn cách em nhìn nhận môn Toán. Trước đây em chỉ thuộc vẹt công thức, nhưng vào lớp thầy dạy em đã hiểu gốc rễ vấn đề, phản xạ nhanh trước các câu 40+.'
  },
  {
    id: 't2',
    name: 'Nguyễn Lê Quỳnh Vy',
    school: 'THPT Nguyễn Thượng Hiền',
    scoreBefore: '4.8 (mất gốc hình học)',
    scoreAfter: 8.8,
    achievement: 'Đạt điểm giỏi học kỳ & Đậu nguyện vọng 1 Ngoại Thương',
    cohort: 'Lớp 12B - Khóa 2025',
    content: 'Em từng rất sợ hình không gian lớp 11 và 12. May mắn được cô Như tỉ mỉ vẽ hình, hướng dẫn phương pháp giải từng bước vô cùng trực quan. Nhờ sự động viên sát sao của cô mà em tìm lại tình yêu môn Toán.'
  },
  {
    id: 't3',
    name: 'Phạm Hoàng Minh',
    school: 'THCS Nguyễn Du',
    scoreBefore: '6.0',
    scoreAfter: 9.25,
    achievement: 'Đậu nguyện vọng 1 Lớp 10 trường THPT Gia Định',
    cohort: 'Lớp 9 - Khóa 2025',
    content: 'Ôn thi vào 10 cực kỳ áp lực nhưng lớp học của thầy cô luôn vui vẻ và ấm áp. Thầy Thịnh luôn có những bài Toán thực tế cực kỳ hay, cô Như luôn giữ vững tinh thần giúp tụi em không bao giờ bỏ cuộc.'
  }
];

export const faqItems: FAQItem[] = [
  {
    id: 'faq1',
    question: 'Học sinh có học lực trung bình hoặc mất gốc có thể theo học được không?',
    answer: 'Hoàn toàn được! Lớp 12B và các lớp cấp dưới luôn có lộ trình lấy gốc bài bản do cô Quỳnh Như trực tiếp phụ trách. Các thầy cô luôn có phương pháp dạy phân hóa theo đúng năng lực để các em lấy lại căn bản trước khi tiến xa hơn.'
  },
  {
    id: 'faq2',
    question: 'Sỹ số mỗi phòng học là bao nhiêu và chất lượng cơ sở vật chất ra sao?',
    answer: 'Để đảm bảo sự tương tác tối đa và sát sao từng em, trung tâm giới hạn sỹ số chỉ ở mức dưới 15-20 học sinh một lớp. Phòng học máy lạnh khang trang, bảng chống lóa, hệ thống chiếu sáng chuẩn học đường, tạo môi trường học tập tập trung nhất.'
  },
  {
    id: 'faq3',
    question: 'Trung tâm có kiểm tra đánh giá tình hình học tập định kỳ cho phụ huynh không?',
    answer: 'Có, đây là điểm ưu việt của trung tâm. Sau mỗi buổi học, kết quả chuyên cần, mức độ tiếp thu bài tập của từng em đều được ghi nhận. Định kỳ hàng tháng đều có bài kiểm tra tổng hợp để gửi báo cáo trực tiếp đến phụ huynh qua Zalo.'
  },
  {
    id: 'faq4',
    question: 'Có chương trình học thử miễn phí để học sinh trải nghiệm không?',
    answer: 'Tất cả các em học sinh mới đều được tham gia kiểm tra năng lực đầu vào miễn phí và học thử trải nghiệm 1 buổi để cảm nhận không khí lớp học và phương pháp giảng dạy của Thầy Thịnh / Cô Như trước khi chính thức ghi danh.'
  }
];
