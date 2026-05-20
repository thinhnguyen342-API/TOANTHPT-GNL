export interface ClassSchedule {
  id: string;
  className: string;
  grade: '9' | '10' | '11' | '12';
  timeRaw: string;
  timeFormatted: string;
  days: string[];
  startDate: string;
  status: 'active' | 'upcoming' | 'full';
  level: string; // "Cơ bản đến Nâng cao", "Chuyên sâu & Luyện đề", v.v.
  description: string;
}

export interface Teacher {
  name: string;
  role: string;
  degree: string;
  specialty: string;
  phone: string;
  zaloUrl: string;
  avatarPlaceholder: string; // Tên viết tắt hoặc mô tả ảnh
  avatarUrl: string;
  characteristics: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  school: string;
  scoreBefore: number | string;
  scoreAfter: number;
  achievement: string;
  content: string;
  cohort: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Registration {
  id: string;
  studentName: string;
  parentPhone: string;
  grade: string;
  classInterest: string;
  targetGoal: string;
  timestamp: string;
}
