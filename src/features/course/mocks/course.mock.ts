// src/features/course/mocks/course.mock.ts
export const courseMock = {
  keys: ['courseFilters', 'courseCards', 'courseWeeks'],
  metrics: [{'label': 'Hoàn thành', 'value': '92%', 'hint': 'Tuần này'}, {'label': 'Điểm TB', 'value': '8.8', 'hint': 'Theo iX-core'}, {'label': 'Nhiệm vụ', 'value': '12', 'hint': 'Còn 3 việc'}, {'label': 'Xếp hạng', 'value': 'Top 5', 'hint': 'Trong scope'}],
  table: {
    columns: ['Mục', 'Giá trị', 'Trạng thái'],
    rows: [
      ['Bản ghi 1', 'course-001', 'Sẵn sàng'],
      ['Bản ghi 2', 'course-002', 'Đang xử lý'],
      ['Bản ghi 3', 'course-003', 'Hoàn tất']
    ]
  }
}
