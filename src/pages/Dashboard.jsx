import { motion } from 'framer-motion'
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  LineChart as LineChartIcon,
  ShoppingBag,
  Users,
} from 'lucide-react'
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import StatCard from '../components/ui/StatCard'

const revenueData = [
  { month: 'Jan', revenue: 54000 },
  { month: 'Feb', revenue: 62000 },
  { month: 'Mar', revenue: 58000 },
  { month: 'Apr', revenue: 71000 },
  { month: 'May', revenue: 84000 },
  { month: 'Jun', revenue: 76000 },
  { month: 'Jul', revenue: 92000 },
  { month: 'Aug', revenue: 101000 },
  { month: 'Sep', revenue: 98000 },
  { month: 'Oct', revenue: 108000 },
  { month: 'Nov', revenue: 119000 },
  { month: 'Dec', revenue: 128430 },
]

const deviceData = [
  { name: 'Desktop', value: 52 },
  { name: 'Mobile', value: 34 },
  { name: 'Tablet', value: 14 },
]

const deviceColors = ['#2563eb', '#38bdf8', '#14b8a6']

const activityItems = [
  {
    title: 'User John registered',
    time: '2 min ago',
    detail: 'Growth team onboarded a new user.',
  },
  {
    title: 'Order #1289 placed',
    time: '12 min ago',
    detail: 'New enterprise plan purchased.',
  },
  {
    title: 'Weekly report generated',
    time: '1 hour ago',
    detail: 'Performance report sent to managers.',
  },
  {
    title: 'Server health check completed',
    time: '3 hours ago',
    detail: 'All systems running smoothly.',
  },
]

const stats = [
  {
    title: 'Revenue',
    value: '$128,430',
    change: '+12.4%',
    changeLabel: 'from last month',
    icon: CreditCard,
    trend: 'up',
  },
  {
    title: 'Active Users',
    value: '8,420',
    change: '+5.1%',
    changeLabel: 'from last month',
    icon: Users,
    trend: 'up',
  },
  {
    title: 'Orders',
    value: '1,280',
    change: '-2.1%',
    changeLabel: 'from last month',
    icon: ShoppingBag,
    trend: 'down',
  },
  {
    title: 'Conversion Rate',
    value: '4.6%',
    change: '+0.3%',
    changeLabel: 'from last month',
    icon: Activity,
    trend: 'up',
  },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border border-border bg-card px-4 py-3 text-sm shadow-card">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-base font-semibold">${Number(payload[0].value).toLocaleString()}</p>
      </div>
    )
  }
  return null
}

// === إعدادات الحركة (Framer Motion Variants) ===
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // التاخير بين كل عنصر والتاني (جزء من الثانية)
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 }, // بيبدأ مخفي ونازل لتحت شوية
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 300, damping: 24 } 
  }, // بيظهر ويطلع لمكانه الطبيعي بنعومة
}

const Dashboard = () => {
  return (
    // استخدام motion.div الحاوية اللي بتشغل الأنيميشن لكل العناصر اللي جواها
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          // كل كارت بياخد حركة لوحده
          <motion.div key={stat.title} variants={itemVariants}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <motion.div variants={itemVariants} className="glass-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">Revenue Overview</h3>
              <p className="text-sm text-muted-foreground">Last 12 months performance</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +18% YoY
            </div>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1 }} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--card))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-6">
          <div>
            <h3 className="text-lg font-semibold">Traffic by Device</h3>
            <p className="text-sm text-muted-foreground">Session distribution</p>
          </div>
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={entry.name} fill={deviceColors[index % deviceColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--card))',
                      borderRadius: 16,
                      border: '1px solid hsl(var(--border))',
                    }}
                    formatter={(value) => [`${value}%`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-2">
              {deviceData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: deviceColors[index] }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <motion.div variants={itemVariants} className="glass-card p-6">
          <div className="flex items-center gap-2">
            <LineChartIcon className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          <div className="mt-6 space-y-4">
            {activityItems.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-6">
          <h3 className="text-lg font-semibold">Performance Highlights</h3>
          <p className="text-sm text-muted-foreground">Weekly key indicators</p>
          <div className="mt-6 space-y-4">
            {[
              { label: 'Net Promoter Score', value: '72' },
              { label: 'Average Response Time', value: '1.8s' },
              { label: 'Uptime', value: '99.98%' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </motion.div>
  )
}

export default Dashboard