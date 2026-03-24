import type { PublicPageData, PublicCourseTab } from '../types/public.types'

type PublicCourse = PublicCourseTab['courses'][number]

const courseImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBQJ9rXQVwuI1VAo3nBWnQeYb5BKejrCW9shFcCeBlEscj0KOJ36ba3ztxInAKFS9-cxqkmUmG1wHCLHsnuMz8ybqTFLH-Jq6sKhWip3WohrGi-qh3Tv7o1QPUHqLelMK3DvotSM--AkpavLET-gwceZA2nmU4RRVCFBHbsmYPvhydszmpB7mK5GvzZfhbm08esIJvicRLVXKgHKBfbrIXK6nImKWhIG3p_zuf_LyKi-8quaw6XgBI6SpSYMYuxBC6ToD1RQBbuln8',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCYHZdX8R0fZZs7moqawkC0fuuDxCYakTX-SYSWYZEqsw1Lbf8830h52_mwNxe441N85t5of1lCWZkZ-kTy9MnRrfVX7XLh_7AjWoUwzwYFdvpQkZuMK0LBI0BbhxrXSuB5msVz5vKhFqdVkGW6q99WActKDUqb6yMSyXfwybgVoUKOEfQhrEKwQFjH5yfqZkFWyWGaWFF9nb8Tu_1N_uMckRYAhH6BbGEVfW4y0y1QiRsj9VUQ0xfOj4J2kJQFveF_-s02I88yC64',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDUHr9Iyhu-o4JlVzsnnf_V_OL99Mn6DYl3PXFGYnvXicxWCqnFppyEbL9_A4HFpvJWMmBiAEYWQjhxUK8_1H2cNOIUi5OVjb3U8BI92VrNardSc0m8silWPUaRW7tw0K7I8M3ZowdeqvNbOyaZPc8evsCKdlu9gF8GaH_2TGyTZ2vho-pA0y-o5I37AzSXNmQLHeNT0F-FVfpoqcy8azihCoc1Xs5wzAFUDCgEEb4-BdylNr-53Ps6ZLOoG5mh3c81w4KueCDKkxw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB4vrMoR0CRpqImB6glpw3At5UrQ_j0CiAFHUEhlImAdP5KYVIgLx9cqxHh0miF5SAfeMOfa28eblvp5z2H56LyMj7_GhjmPQVvZxdZFbaNPuYEFKeKkDPRnx4hyUYTdd_WE9aNzY6NoI_5ucKWZEfoEGVsTV9CweDlCL5et0cldbbBQnYC9zkAelM2P1-tH69XFzZbJcy4SZyRheKuT8vH4DD3UeeInBHHf5_SpRlKNNpEu6KCOSfRox8Trzrf5U6yT_47MneB-iE',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAPDsvqLsmq_dTTfFsXVgkaMWNtT0Y-RIBlmAo2PlRnU7rBrOyXLXcHZHIKF56_UrmUkhpOkF6DnyIGqEze7GUWcUhfaUHRs-w1QUeQVEygYRfapwwvG6kU0IUwcOAMCI8Hzf9UBY1KEi8ZyDNYZZkwOqRE68Sw4oLdyLmyJF8hlKR98dS0yqdCvtj8p1-qXg31XOQ3eH6PI_5-M3RrudDAtCHbfkwoBfcyJ0pjg3-XOogOb4XUga6OzVpJ1lL1CNw7uW_DUftIb7c',
]

const primaryDescriptors = [
  {
    suffix: 'Cơ bản',
    description:
      'Giúp học sinh nắm chắc nền tảng, hiểu đúng kiến thức trọng tâm và tự tin học tốt trên lớp.',
  },
  {
    suffix: 'Bám sát SGK',
    description:
      'Học theo sách giáo khoa với ví dụ trực quan, dễ hiểu và phù hợp với từng bài học trên lớp.',
  },
  {
    suffix: 'Luyện tập',
    description:
      'Tăng phản xạ giải toán qua hệ thống bài tập từ cơ bản đến vận dụng theo từng chủ đề.',
  },
  {
    suffix: 'Nâng cao',
    description:
      'Phát triển tư duy logic, rèn kỹ năng phân tích và giải các bài toán khó hơn mức cơ bản.',
  },
  {
    suffix: 'Chuyên đề',
    description:
      'Đi sâu vào từng mảng kiến thức quan trọng để học sinh hiểu sâu, nhớ lâu và vận dụng tốt.',
  },
  {
    suffix: 'Ôn tập tổng hợp',
    description:
      'Hệ thống lại kiến thức toàn diện, củng cố lỗ hổng và chuẩn bị tốt cho các bài kiểm tra định kỳ.',
  },
]

const secondaryDescriptors = [
  {
    suffix: 'Cơ bản',
    description:
      'Củng cố kiến thức cốt lõi, giúp học sinh học chắc đại số và hình học ngay từ nền móng.',
  },
  {
    suffix: 'Bám sát SGK',
    description:
      'Bài giảng đi sát chương trình học chính khóa, giúp học sinh theo kịp trên lớp và làm bài tốt hơn.',
  },
  {
    suffix: 'Luyện đề',
    description:
      'Rèn kỹ năng giải đề theo cấu trúc kiểm tra thường gặp, tăng tốc độ và độ chính xác khi làm bài.',
  },
  {
    suffix: 'Nâng cao',
    description:
      'Mở rộng kiến thức và tăng chiều sâu tư duy với các dạng toán thách thức hơn cho học sinh khá giỏi.',
  },
  {
    suffix: 'Chuyên đề trọng tâm',
    description:
      'Tập trung theo các chuyên đề quan trọng, giúp học sinh xử lý tốt các dạng toán hay xuất hiện trong đề thi.',
  },
  {
    suffix: 'Bứt phá điểm số',
    description:
      'Thiết kế cho mục tiêu cải thiện điểm nhanh, học chắc phần yếu và bứt phá trong thời gian ngắn.',
  },
]

const highSchoolDescriptors = [
  {
    suffix: 'Cơ bản',
    description:
      'Hệ thống nền tảng vững chắc cho học sinh THPT, phù hợp với quá trình học chính khóa hằng ngày.',
  },
  {
    suffix: 'Bám sát SGK',
    description:
      'Bài học bám sát chương trình THPT, giúp học sinh hiểu sâu bài giảng trên lớp và làm bài kiểm tra tốt.',
  },
  {
    suffix: 'Luyện đề',
    description:
      'Rèn chiến lược làm đề, tăng tốc độ xử lý và phân bổ thời gian hiệu quả cho các kỳ kiểm tra quan trọng.',
  },
  {
    suffix: 'Nâng cao',
    description:
      'Phát triển năng lực giải toán ở mức cao hơn, phù hợp với học sinh muốn chinh phục điểm số nổi bật.',
  },
  {
    suffix: 'Chuyên đề trọng tâm',
    description:
      'Tổng hợp và đào sâu các chuyên đề then chốt thường gặp trong học tập và thi cử bậc THPT.',
  },
  {
    suffix: 'Ôn thi mục tiêu cao',
    description:
      'Định hướng cho học sinh có mục tiêu điểm cao, với lộ trình học rõ ràng và chiến lược ôn tập hiệu quả.',
  },
]

const createCoursesForGrade = (
  levelPrefix: string,
  levelLabel: string,
  grade: number,
  total: number,
  descriptors: Array<{ suffix: string; description: string }>,
): PublicCourse[] =>
  Array.from({ length: total }, (_, index) => {
    const descriptor = descriptors[index % descriptors.length]

    return {
      id: `${levelPrefix}-grade-${grade}-course-${index + 1}`,
      title: `Toán lớp ${grade} - ${descriptor.suffix}`,
      description: descriptor.description,
      levelLabel: `${levelLabel} · LỚP ${grade}`,
      progress: 0,
      image: courseImages[index % courseImages.length],
    }
  })

const primaryCourses: PublicCourse[] = [
  ...createCoursesForGrade('primary', 'TIỂU HỌC', 1, 4, primaryDescriptors),
  ...createCoursesForGrade('primary', 'TIỂU HỌC', 2, 4, primaryDescriptors),
  ...createCoursesForGrade('primary', 'TIỂU HỌC', 3, 5, primaryDescriptors),
  ...createCoursesForGrade('primary', 'TIỂU HỌC', 4, 5, primaryDescriptors),
  ...createCoursesForGrade('primary', 'TIỂU HỌC', 5, 6, primaryDescriptors),
]

const middleSchoolCourses: PublicCourse[] = [
  ...createCoursesForGrade('middle', 'THCS', 6, 6, secondaryDescriptors),
  ...createCoursesForGrade('middle', 'THCS', 7, 6, secondaryDescriptors),
  ...createCoursesForGrade('middle', 'THCS', 8, 6, secondaryDescriptors),
  ...createCoursesForGrade('middle', 'THCS', 9, 6, secondaryDescriptors),
]

const highSchoolCourses: PublicCourse[] = [
  ...createCoursesForGrade('high', 'THPT', 10, 6, highSchoolDescriptors),
  ...createCoursesForGrade('high', 'THPT', 11, 6, highSchoolDescriptors),
  ...createCoursesForGrade('high', 'THPT', 12, 6, highSchoolDescriptors),
]

export const publicMock: PublicPageData = {
  hero: {
    title: 'Mỗi học sinh',
    titleHighlight: 'một cách học riêng',
    description:
      '“Vì lợi ích mười năm trồng cây, vì lợi ích trăm năm trồng người.” iX mang đến sự đồng hành của gia đình, thầy cô và bạn bè. Cùng con tìm đúng cách học của mình, giúp con tiến bộ vững vàng từng ngày.',
    primaryAction: {
      label: 'Bắt đầu học ngay',
      href: '#',
    },
    secondaryAction: {
      label: 'Xem bản demo',
      href: '#',
    },
  },

  courseTabs: [
    {
      id: 'primary-school',
      label: 'Tiểu học',
      courses: primaryCourses,
    },
    {
      id: 'middle-school',
      label: 'THCS',
      courses: middleSchoolCourses,
    },
    {
      id: 'high-school',
      label: 'THPT',
      courses: highSchoolCourses,
    },
  ],

  testimonials: [
    {
      id: 'testimonial-1',
      quote:
        'IX không chỉ dạy tôi giải toán, mà còn giúp tôi biết cách phân tích vấn đề rõ ràng hơn trong học tập.',
      studentName: 'Nguyễn Minh Anh',
      studentTitle: 'Chuyên Toán - ĐHQG',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDUHr9Iyhu-o4JlVzsnnf_V_OL99Mn6DYl3PXFGYnvXicxWCqnFppyEbL9_A4HFpvJWMmBiAEYWQjhxUK8_1H2cNOIUi5OVjb3U8BI92VrNardSc0m8silWPUaRW7tw0K7I8M3ZowdeqvNbOyaZPc8evsCKdlu9gF8GaH_2TGyTZ2vho-pA0y-o5I37AzSXNmQLHeNT0F-FVfpoqcy8azihCoc1Xs5wzAFUDCgEEb4-BdylNr-53Ps6ZLOoG5mh3c81w4KueCDKkxw',
    },
    {
      id: 'testimonial-2',
      quote:
        'Phương pháp học cá nhân hóa ở đây thực sự hiệu quả. Tôi đã cải thiện điểm số từ trung bình lên giỏi chỉ sau 3 tháng.',
      studentName: 'Lê Bảo Vy',
      studentTitle: 'Thủ khoa đầu vào khối A1',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB4vrMoR0CRpqImB6glpw3At5UrQ_j0CiAFHUEhlImAdP5KYVIgLx9cqxHh0miF5SAfeMOfa28eblvp5z2H56LyMj7_GhjmPQVvZxdZFbaNPuYEFKeKkDPRnx4hyUYTdd_WE9aNzY6NoI_5ucKWZEfoEGVsTV9CweDlCL5et0cldbbBQnYC9zkAelM2P1-tH69XFzZbJcy4SZyRheKuT8vH4DD3UeeInBHHf5_SpRlKNNpEu6KCOSfRox8Trzrf5U6yT_47MneB-iE',
      featured: true,
    },
    {
      id: 'testimonial-3',
      quote:
        'Giao diện trực quan và bài giảng dễ hiểu giúp tôi tập trung hoàn toàn vào kiến thức.',
      studentName: 'Trần Hoàng Nam',
      studentTitle: 'Học sinh lớp 12, Hà Nội',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAPDsvqLsmq_dTTfFsXVgkaMWNtT0Y-RIBlmAo2PlRnU7rBrOyXLXcHZHIKF56_UrmUkhpOkF6DnyIGqEze7GUWcUhfaUHRs-w1QUeQVEygYRfapwwvG6kU0IUwcOAMCI8Hzf9UBY1KEi8ZyDNYZZkwOqRE68Sw4oLdyLmyJF8hlKR98dS0yqdCvtj8p1-qXg31XOQ3eH6PI_5-M3RrudDAtCHbfkwoBfcyJ0pjg3-XOogOb4XUga6OzVpJ1lL1CNw7uW_DUftIb7c',
    },
    {
      id: 'testimonial-4',
      quote:
        'Tôi thích cách hệ thống chia nhỏ lộ trình học. Mỗi ngày tiến một chút nhưng rất chắc.',
      studentName: 'Phạm Gia Hân',
      studentTitle: 'Học sinh lớp 8, Hải Phòng',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCYHZdX8R0fZZs7moqawkC0fuuDxCYakTX-SYSWYZEqsw1Lbf8830h52_mwNxe441N85t5of1lCWZkZ-kTy9MnRrfVX7XLh_7AjWoUwzwYFdvpQkZuMK0LBI0BbhxrXSuB5msVz5vKhFqdVkGW6q99WActKDUqb6yMSyXfwybgVoUKOEfQhrEKwQFjH5yfqZkFWyWGaWFF9nb8Tu_1N_uMckRYAhH6BbGEVfW4y0y1QiRsj9VUQ0xfOj4J2kJQFveF_-s02I88yC64',
    },
    {
      id: 'testimonial-5',
      quote:
        'Các bài luyện tập có độ khó tăng dần nên tôi không bị ngợp mà vẫn tiến bộ đều.',
      studentName: 'Vũ Đức Long',
      studentTitle: 'Học sinh lớp 9, Nam Định',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBQJ9rXQVwuI1VAo3nBWnQeYb5BKejrCW9shFcCeBlEscj0KOJ36ba3ztxInAKFS9-cxqkmUmG1wHCLHsnuMz8ybqTFLH-Jq6sKhWip3WohrGi-qh3Tv7o1QPUHqLelMK3DvotSM--AkpavLET-gwceZA2nmU4RRVCFBHbsmYPvhydszmpB7mK5GvzZfhbm08esIJvicRLVXKgHKBfbrIXK6nImKWhIG3p_zuf_LyKi-8quaw6XgBI6SpSYMYuxBC6ToD1RQBbuln8',
    },
    {
      id: 'testimonial-6',
      quote:
        'Con tôi trước đây rất sợ Toán, nhưng sau vài tuần học đã chủ động ngồi vào bàn học mỗi tối.',
      studentName: 'Ngô Thu Trang',
      studentTitle: 'Phụ huynh học sinh lớp 6',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDUHr9Iyhu-o4JlVzsnnf_V_OL99Mn6DYl3PXFGYnvXicxWCqnFppyEbL9_A4HFpvJWMmBiAEYWQjhxUK8_1H2cNOIUi5OVjb3U8BI92VrNardSc0m8silWPUaRW7tw0K7I8M3ZowdeqvNbOyaZPc8evsCKdlu9gF8GaH_2TGyTZ2vho-pA0y-o5I37AzSXNmQLHeNT0F-FVfpoqcy8azihCoc1Xs5wzAFUDCgEEb4-BdylNr-53Ps6ZLOoG5mh3c81w4KueCDKkxw',
    },
    {
      id: 'testimonial-7',
      quote:
        'Tôi đánh giá cao phần giải thích lỗi sai. Nhờ đó tôi biết mình yếu ở đâu để sửa đúng chỗ.',
      studentName: 'Bùi Khánh Linh',
      studentTitle: 'Học sinh lớp 7, TP.HCM',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB4vrMoR0CRpqImB6glpw3At5UrQ_j0CiAFHUEhlImAdP5KYVIgLx9cqxHh0miF5SAfeMOfa28eblvp5z2H56LyMj7_GhjmPQVvZxdZFbaNPuYEFKeKkDPRnx4hyUYTdd_WE9aNzY6NoI_5ucKWZEfoEGVsTV9CweDlCL5et0cldbbBQnYC9zkAelM2P1-tH69XFzZbJcy4SZyRheKuT8vH4DD3UeeInBHHf5_SpRlKNNpEu6KCOSfRox8Trzrf5U6yT_47MneB-iE',
      featured: true,
    },
    {
      id: 'testimonial-8',
      quote:
        'Video ngắn gọn, không lan man, phù hợp với học sinh cần tập trung và học nhanh.',
      studentName: 'Đặng Quốc Bảo',
      studentTitle: 'Học sinh lớp 10, Đà Nẵng',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAPDsvqLsmq_dTTfFsXVgkaMWNtT0Y-RIBlmAo2PlRnU7rBrOyXLXcHZHIKF56_UrmUkhpOkF6DnyIGqEze7GUWcUhfaUHRs-w1QUeQVEygYRfapwwvG6kU0IUwcOAMCI8Hzf9UBY1KEi8ZyDNYZZkwOqRE68Sw4oLdyLmyJF8hlKR98dS0yqdCvtj8p1-qXg31XOQ3eH6PI_5-M3RrudDAtCHbfkwoBfcyJ0pjg3-XOogOb4XUga6OzVpJ1lL1CNw7uW_DUftIb7c',
    },
    {
      id: 'testimonial-9',
      quote:
        'Các chuyên đề nâng cao rất hay, giúp tôi luyện tư duy cho kỳ thi học sinh giỏi.',
      studentName: 'Mai Phương Thảo',
      studentTitle: 'Học sinh lớp 11, Bắc Ninh',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCYHZdX8R0fZZs7moqawkC0fuuDxCYakTX-SYSWYZEqsw1Lbf8830h52_mwNxe441N85t5of1lCWZkZ-kTy9MnRrfVX7XLh_7AjWoUwzwYFdvpQkZuMK0LBI0BbhxrXSuB5msVz5vKhFqdVkGW6q99WActKDUqb6yMSyXfwybgVoUKOEfQhrEKwQFjH5yfqZkFWyWGaWFF9nb8Tu_1N_uMckRYAhH6BbGEVfW4y0y1QiRsj9VUQ0xfOj4J2kJQFveF_-s02I88yC64',
    },
    {
      id: 'testimonial-10',
      quote:
        'Bố mẹ tôi rất thích vì có thể theo dõi tiến độ học và biết khi nào tôi cần hỗ trợ thêm.',
      studentName: 'Đỗ Tuấn Kiệt',
      studentTitle: 'Học sinh lớp 8, Nghệ An',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBQJ9rXQVwuI1VAo3nBWnQeYb5BKejrCW9shFcCeBlEscj0KOJ36ba3ztxInAKFS9-cxqkmUmG1wHCLHsnuMz8ybqTFLH-Jq6sKhWip3WohrGi-qh3Tv7o1QPUHqLelMK3DvotSM--AkpavLET-gwceZA2nmU4RRVCFBHbsmYPvhydszmpB7mK5GvzZfhbm08esIJvicRLVXKgHKBfbrIXK6nImKWhIG3p_zuf_LyKi-8quaw6XgBI6SpSYMYuxBC6ToD1RQBbuln8',
      featured: true,
    },
    {
      id: 'testimonial-11',
      quote:
        'Tôi từng mất gốc một số phần đại số, nhưng học theo lộ trình ở đây đã giúp tôi tự tin trở lại.',
      studentName: 'Lý Ngọc Hà',
      studentTitle: 'Học sinh lớp 9, Thái Bình',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDUHr9Iyhu-o4JlVzsnnf_V_OL99Mn6DYl3PXFGYnvXicxWCqnFppyEbL9_A4HFpvJWMmBiAEYWQjhxUK8_1H2cNOIUi5OVjb3U8BI92VrNardSc0m8silWPUaRW7tw0K7I8M3ZowdeqvNbOyaZPc8evsCKdlu9gF8GaH_2TGyTZ2vho-pA0y-o5I37AzSXNmQLHeNT0F-FVfpoqcy8azihCoc1Xs5wzAFUDCgEEb4-BdylNr-53Ps6ZLOoG5mh3c81w4KueCDKkxw',
    },
    {
      id: 'testimonial-12',
      quote:
        'Điều tôi thích nhất là mỗi bài học đều có mục tiêu rõ ràng, học xong biết ngay mình đạt được gì.',
      studentName: 'Hoàng Yến Nhi',
      studentTitle: 'Học sinh lớp 6, Huế',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB4vrMoR0CRpqImB6glpw3At5UrQ_j0CiAFHUEhlImAdP5KYVIgLx9cqxHh0miF5SAfeMOfa28eblvp5z2H56LyMj7_GhjmPQVvZxdZFbaNPuYEFKeKkDPRnx4hyUYTdd_WE9aNzY6NoI_5ucKWZEfoEGVsTV9CweDlCL5et0cldbbBQnYC9zkAelM2P1-tH69XFzZbJcy4SZyRheKuT8vH4DD3UeeInBHHf5_SpRlKNNpEu6KCOSfRox8Trzrf5U6yT_47MneB-iE',
    },
    {
      id: 'testimonial-13',
      quote:
        'Phần luyện đề rất sát thực tế, giúp tôi quen áp lực thời gian trước khi đi thi.',
      studentName: 'Tạ Minh Khang',
      studentTitle: 'Học sinh lớp 12, Cần Thơ',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAPDsvqLsmq_dTTfFsXVgkaMWNtT0Y-RIBlmAo2PlRnU7rBrOyXLXcHZHIKF56_UrmUkhpOkF6DnyIGqEze7GUWcUhfaUHRs-w1QUeQVEygYRfapwwvG6kU0IUwcOAMCI8Hzf9UBY1KEi8ZyDNYZZkwOqRE68Sw4oLdyLmyJF8hlKR98dS0yqdCvtj8p1-qXg31XOQ3eH6PI_5-M3RrudDAtCHbfkwoBfcyJ0pjg3-XOogOb4XUga6OzVpJ1lL1CNw7uW_DUftIb7c',
    },
    {
      id: 'testimonial-14',
      quote:
        'Con tôi học đều hơn hẳn vì mỗi buổi học đều có cảm giác vừa sức và có động lực hoàn thành.',
      studentName: 'Trịnh Mai Phương',
      studentTitle: 'Phụ huynh học sinh lớp 5',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCYHZdX8R0fZZs7moqawkC0fuuDxCYakTX-SYSWYZEqsw1Lbf8830h52_mwNxe441N85t5of1lCWZkZ-kTy9MnRrfVX7XLh_7AjWoUwzwYFdvpQkZuMK0LBI0BbhxrXSuB5msVz5vKhFqdVkGW6q99WActKDUqb6yMSyXfwybgVoUKOEfQhrEKwQFjH5yfqZkFWyWGaWFF9nb8Tu_1N_uMckRYAhH6BbGEVfW4y0y1QiRsj9VUQ0xfOj4J2kJQFveF_-s02I88yC64',
    },
    {
      id: 'testimonial-15',
      quote:
        'Từ khi học ở IX, tôi không còn thấy Toán là môn khô khan nữa mà là môn rất thú vị để khám phá.',
      studentName: 'Chu Nhật Minh',
      studentTitle: 'Học sinh lớp 7, Quảng Ninh',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBQJ9rXQVwuI1VAo3nBWnQeYb5BKejrCW9shFcCeBlEscj0KOJ36ba3ztxInAKFS9-cxqkmUmG1wHCLHsnuMz8ybqTFLH-Jq6sKhWip3WohrGi-qh3Tv7o1QPUHqLelMK3DvotSM--AkpavLET-gwceZA2nmU4RRVCFBHbsmYPvhydszmpB7mK5GvzZfhbm08esIJvicRLVXKgHKBfbrIXK6nImKWhIG3p_zuf_LyKi-8quaw6XgBI6SpSYMYuxBC6ToD1RQBbuln8',
    },
  ],
}