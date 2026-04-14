// src/features/student/components/class-dashboard/StudentWeekDetailTable.tsx
type StudentWeekDetailRow = {
  label: string
  score: string
  sticker: string
  rank: string
  action: string
}

type StudentWeekDetailTableProps = {
  rows: StudentWeekDetailRow[]
}

export function StudentWeekDetailTable({
  rows,
}: StudentWeekDetailTableProps) {
  return (
    <div className="student-dashboard-body__table-section">
      <h3 className="student-dashboard-body__table-title">Bảng điểm chi tiết</h3>

      <div className="student-dashboard-body__table-wrap">
        <table className="student-dashboard-body__table">
          <thead>
            <tr>
              <th>Nội dung</th>
              <th>Điểm</th>
              <th>Sticker</th>
              <th>Xếp hạng lớp</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td className="student-dashboard-body__table-highlight">
                  {row.score}
                </td>
                <td>{row.sticker}</td>
                <td>{row.rank}</td>
                <td>
                  <button
                    type="button"
                    className="student-dashboard-body__text-action"
                  >
                    {row.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}