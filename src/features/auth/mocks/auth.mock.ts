export const authMock = {
  hero: {
    badge: 'iX Education',
    title: 'Chào mừng quay lại',
    subtitle: 'Tiếp tục hành trình học tập cùng iX Education',
    description:
      'Đăng nhập để theo dõi tiến độ học tập, nhiệm vụ đang mở và kết quả mới nhất của bạn.',
  },

  form: {
    identifierLabel: 'Email / SĐT',
    identifierPlaceholder: 'name@example.com hoặc số điện thoại',
    passwordLabel: 'Mật khẩu',
    passwordPlaceholder: '••••••••',
    rememberLabel: 'Ghi nhớ đăng nhập',
    forgotPasswordLabel: 'Quên mật khẩu?',
    forgotPasswordHref: '/quen-mat-khau',
    submitLabel: 'Đăng nhập',
    registerPrompt: 'Chưa có tài khoản?',
    registerActionLabel: 'Đăng ký ngay',
    registerActionHref: '/dang-ky',
    termsText:
      'Bằng cách đăng nhập, bạn đồng ý với Điều khoản và Chính sách bảo mật của iX Education.',
  },

  keys: ['registerBenefits', 'socialProviders'],

  registerBenefits: [
    'Theo dõi tiến độ học theo tuần',
    'Nhận huy hiệu và động lực học tập',
    'Phụ huynh đồng hành cùng kết quả học tập',
  ],

  socialProviders: [
    {
      key: 'google',
      label: 'Google',
      iconType: 'image',
      iconSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDLCfBHwntE6sw-gjonMV87bZ4nI3AT9QLhTrFJHPSoG9JQbV4-zIEXA7Ak7XJuxUgWAGKPI6A2aMb53VCUSNU7MVzZ3JIKCqjJrOCiKEjSkrcVlT9nza-HUQxqDrFvijuo_RMqSI9I3KKsSpNZNPl0M882hfQvyUZ-N_GkJDbIgaIyh4hRkZWCxaWgtp5pTBuKAr9vEArLyYtwemGVkWsxQv_MyniU5a7Rjc117bqHXbFz3mUDsVtcm3x-WhmuJteb9yc1NYTfqT4',
      alt: 'Google',
    },
    {
      key: 'facebook',
      label: 'Facebook',
      iconType: 'symbol',
      iconName: 'thumb_up',
    },
  ],

  metrics: [
    { label: 'Hoàn thành', value: '92%', hint: 'Tuần này' },
    { label: 'Điểm TB', value: '8.8', hint: 'Theo iX-core' },
    { label: 'Nhiệm vụ', value: '12', hint: 'Còn 3 việc' },
    { label: 'Xếp hạng', value: 'Top 5', hint: 'Trong scope' },
  ],

  table: {
    columns: ['Mục', 'Giá trị', 'Trạng thái'],
    rows: [
      ['Bản ghi 1', 'auth-001', 'Sẵn sàng'],
      ['Bản ghi 2', 'auth-002', 'Đang xử lý'],
      ['Bản ghi 3', 'auth-003', 'Hoàn tất'],
    ],
  },
}