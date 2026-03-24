import './WeeklyReviewPage.css'
import { Card } from '@/shared/components/Card'
import { Button } from '@/shared/components/Button'
import { PageHeader } from '@/shared/components/PageHeader'
import { MetricGrid } from '@/shared/components/MetricGrid'
import { DataTable } from '@/shared/components/DataTable'
import { StatusPill } from '@/shared/components/StatusPill'
import { featureApiMap } from '@/shared/services/featureApiMap'
import { teacherMock } from '../mocks/teacher.mock'

export function WeeklyReviewPage() {
  const featureApi = featureApiMap['teacher']
  const metrics = teacherMock.metrics
  const table = teacherMock.table

  return (
    <div className="weeklyreview-page ix-page">
      <PageHeader
        eyebrow="Teacher"
        title="Đánh giá tuần"
        subtitle="Cho điểm, nhận xét và giao việc cho phụ huynh."
        actions={{
          primary: 'Tải dữ liệu',
          secondary: 'Xem API',
        }}
      />

      <div className="weeklyreview-page__hero">
        <Card>
          <div className="weeklyreview-page__hero-content">
            <div>
              <p className="weeklyreview-page__lead">
                Màn hình này được scaffold theo feature <strong>teacher</strong>, có mock data riêng
                và đã nối sẵn danh sách endpoint từ iX-core.
              </p>
              <div className="weeklyreview-page__api">
                <span>API chính:</span>
                <code>{featureApi.primary}</code>
              </div>
            </div>
            <div className="weeklyreview-page__actions">
              <Button>Thao tác chính</Button>
              <Button variant="secondary">Mở cấu hình</Button>
            </div>
          </div>
        </Card>
      </div>

      <MetricGrid items={metrics} />

      <div className="weeklyreview-page__content">
        <Card>
          <div className="weeklyreview-page__section-head">
            <h2>Dữ liệu minh họa</h2>
            <StatusPill tone="warning">Mock data</StatusPill>
          </div>
          <DataTable columns={table.columns} rows={table.rows} />
        </Card>

        <Card>
          <div className="weeklyreview-page__section-head">
            <h2>Ghi chú triển khai</h2>
            <StatusPill tone="success">Ready</StatusPill>
          </div>
          <ul className="weeklyreview-page__notes">
            <li>Tách riêng file .tsx và file .css cho từng page.</li>
            <li>Tái sử dụng component chung từ shared/components.</li>
            <li>Mock data nằm riêng theo từng feature.</li>
            <li>Service API đã trỏ sẵn tới iX-core.</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
