// src/features/student/components/class-dashboard/StudentWeekSummaryTable.tsx
type StudentWeekSummaryRow = {
  label: string
  value: string
  rank: string
  action: string
}

type StudentWeekSummaryTableProps = {
  rows: StudentWeekSummaryRow[]
}

export function StudentWeekSummaryTable({
  rows,
}: StudentWeekSummaryTableProps) {
  return (
    <div className="student-dashboard-body__table-section">
      <h3 className="student-dashboard-body__table-title">Kết quả tuần</h3>

      <div className="student-dashboard-body__table-wrap">
        <table className="student-dashboard-body__table">
          <thead>
            <tr>
              <th>Nội dung</th>
              <th>Kết quả</th>
              <th>Xếp hạng lớp</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td className="student-dashboard-body__table-highlight">
                  {row.value}
                </td>
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