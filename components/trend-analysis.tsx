"use client"

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

const trendData = [
  { bulan: "Jan", makanan: 2500000, transportasi: 1200000, belanja: 800000, hiburan: 600000 },
  { bulan: "Feb", makanan: 2700000, transportasi: 1400000, belanja: 900000, hiburan: 700000 },
  { bulan: "Mar", makanan: 2600000, transportasi: 1300000, belanja: 1100000, hiburan: 650000 },
  { bulan: "Apr", makanan: 2800000, transportasi: 1500000, belanja: 1200000, hiburan: 800000 },
  { bulan: "Mei", makanan: 2750000, transportasi: 1450000, belanja: 1000000, hiburan: 750000 },
  { bulan: "Jun", makanan: 2800000, transportasi: 1500000, belanja: 1200000, hiburan: 800000 },
]

const insights = [
  {
    category: "Makanan",
    trend: "up",
    change: "+12%",
    description: "Pengeluaran makanan meningkat signifikan bulan ini",
    color: "text-red-600",
  },
  {
    category: "Transportasi",
    trend: "up",
    change: "+8%",
    description: "Kenaikan biaya transportasi karena kenaikan BBM",
    color: "text-red-600",
  },
  {
    category: "Belanja",
    trend: "down",
    change: "-5%",
    description: "Pengeluaran belanja menurun dari bulan lalu",
    color: "text-green-600",
  },
  {
    category: "Hiburan",
    trend: "up",
    change: "+15%",
    description: "Peningkatan pengeluaran hiburan di akhir pekan",
    color: "text-red-600",
  },
]

export function TrendAnalysis() {
  return (
    <div className="space-y-6">
      <div className="h-80">
        <h3 className="text-lg font-semibold mb-4">Trend Pengeluaran per Kategori</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bulan" />
            <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
            <Tooltip
              formatter={(value: number) => [`Rp ${(value / 1000000).toFixed(1)}M`, ""]}
              labelFormatter={(label) => `Bulan ${label}`}
            />
            <Area
              type="monotone"
              dataKey="makanan"
              stackId="1"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.6}
              name="Makanan"
            />
            <Area
              type="monotone"
              dataKey="transportasi"
              stackId="1"
              stroke="#f97316"
              fill="#f97316"
              fillOpacity={0.6}
              name="Transportasi"
            />
            <Area
              type="monotone"
              dataKey="belanja"
              stackId="1"
              stroke="#eab308"
              fill="#eab308"
              fillOpacity={0.6}
              name="Belanja"
            />
            <Area
              type="monotone"
              dataKey="hiburan"
              stackId="1"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.6}
              name="Hiburan"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Analisis Trend</h3>
        <div className="grid gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <div className="flex items-center gap-3">
                {insight.trend === "up" ? (
                  <TrendingUp className="w-5 h-5 text-red-500" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-green-500" />
                )}
                <div>
                  <div className="font-medium">{insight.category}</div>
                  <div className="text-sm text-gray-600">{insight.description}</div>
                </div>
              </div>
              <div className={`font-semibold ${insight.color}`}>{insight.change}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
