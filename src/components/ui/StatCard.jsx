import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

const StatCard = ({ title, value, change, changeLabel, icon: Icon, trend = 'up' }) => {
  const isUp = trend === 'up'

  return (
    <div className="glass-card p-5">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isUp
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
          }`}
        >
          {isUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {change}
        </div>
      </div>
      <div className="mt-5">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{changeLabel}</p>
      </div>
    </div>
  )
}

export default StatCard
