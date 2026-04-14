// src/shared/components/MetricGrid.tsx

import './MetricGrid.css'

export function MetricGrid({ items }: { items: { label: string; value: string; hint?: string }[] }) {
  return (
    <div className="metric-grid">
      {items.map((item) => (
        <div className="metric-grid__card" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          {item.hint ? <small>{item.hint}</small> : null}
        </div>
      ))}
    </div>
  )
}
