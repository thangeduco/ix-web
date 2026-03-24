import './RankingNationalPage.css'
import { Card } from '@/shared/components/Card'
import { Button } from '@/shared/components/Button'
import { PageHeader } from '@/shared/components/PageHeader'
import { MetricGrid } from '@/shared/components/MetricGrid'
import { DataTable } from '@/shared/components/DataTable'
import { StatusPill } from '@/shared/components/StatusPill'
import { featureApiMap } from '@/shared/services/featureApiMap'
import { rankingMock } from '../mocks/ranking.mock'

export function RankingNationalPage() {
  const featureApi = featureApiMap['ranking']
  const metrics = rankingMock.metrics
  const table = rankingMock.table

  return (
    <div className="rankingnational-page ix-page">
      <PageHeader
        eyebrow="Ranking"
        title="Bảng xếp hạng toàn quốc"
        subtitle="Theo dõi vị trí và thành tích trên toàn hệ thống."
        actions={{
          primary: 'Tải dữ liệu',
          secondary: 'Xem API',
        }}
      />

      <div className="rankingnational-page__hero">
        <Card>
          <div className="rankingnational-page__hero-content">
            <div>
              <p className="rankingnational-page__lead">
                Màn hình này được scaffold theo feature <strong>ranking</strong>, có mock data riêng
                và đã nối sẵn danh sách endpoint từ iX-core.
              </p>
              <div className="rankingnational-page__api">
                <span>API chính:</span>
                <code>{featureApi.primary}</code>
              </div>
            </div>
            <div className="rankingnational-page__actions">
              <Button>Thao tác chính</Button>
              <Button variant="secondary">Mở cấu hình</Button>
            </div>
          </div>
        </Card>
      </div>

      <MetricGrid items={metrics} />

      <div className="rankingnational-page__content">
        <Card>
          <div className="rankingnational-page__section-head">
            <h2>Dữ liệu minh họa</h2>
            <StatusPill tone="warning">Mock data</StatusPill>
          </div>
          <DataTable columns={table.columns} rows={table.rows} />
        </Card>

        <Card>
          <div className="rankingnational-page__section-head">
            <h2>Ghi chú triển khai</h2>
            <StatusPill tone="success">Ready</StatusPill>
          </div>
          <ul className="rankingnational-page__notes">
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
