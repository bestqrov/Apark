"use client"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../../components/Card'
import { DollarSign, Wallet, TrendingUp } from 'lucide-react'
import { useDashboard } from '../../lib/hooks'

export default function DashboardPage() {
  const { data, isLoading } = useDashboard()

  if (isLoading) return <div>Chargement...</div>
  if (!data) return <div>Aucune donnée disponible</div>

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Total Revenue" amount={data.totalRevenue} icon={<DollarSign size={20} />} />
        <Card title="Total Charges" amount={data.totalCharges} icon={<Wallet size={20} />} />
        <Card title="Total Profit" amount={data.totalProfit} icon={<TrendingUp size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Revenue per Month">
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={data.monthlyRevenue}>
                <Line type="monotone" dataKey="total" stroke="#0ea5a4" strokeWidth={2} />
                <CartesianGrid stroke="#f1f5f9" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Profit per Month">
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={data.monthlyCharges.map((c:any, i:number) => ({ month: c.month, total: (data.monthlyRevenue[i]?.total || 0) - c.total }))}>
                <Line type="monotone" dataKey="total" stroke="#f97316" strokeWidth={2} />
                <CartesianGrid stroke="#f1f5f9" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
