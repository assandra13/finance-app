"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const data = [
  { name: "Jan", pengeluaran: 7200000, pemasukan: 12000000 },
  { name: "Feb", pengeluaran: 8100000, pemasukan: 11500000 },
  { name: "Mar", pengeluaran: 7800000, pemasukan: 12200000 },
  { name: "Apr", pengeluaran: 8500000, pemasukan: 12000000 },
  { name: "Mei", pengeluaran: 7900000, pemasukan: 11800000 },
  { name: "Jun", pengeluaran: 8300000, pemasukan: 12100000 },
]

export function SpendingChart() {
  return (
    <div className="space-y-6">
      <div className="h-80">
        <h3 className="text-lg font-semibold mb-4">Trend Pengeluaran vs Pemasukan</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
            <Tooltip
              formatter={(value: number) => [`Rp ${(value / 1000000).toFixed(1)}M`, ""]}
              labelFormatter={(label) => `Bulan ${label}`}
            />
            <Line type="monotone" dataKey="pengeluaran" stroke="#ef4444" strokeWidth={3} name="Pengeluaran" />
            <Line type="monotone" dataKey="pemasukan" stroke="#22c55e" strokeWidth={3} name="Pemasukan" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="h-80">
        <h3 className="text-lg font-semibold mb-4">Perbandingan Bulanan</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
            <Tooltip
              formatter={(value: number) => [`Rp ${(value / 1000000).toFixed(1)}M`, ""]}
              labelFormatter={(label) => `Bulan ${label}`}
            />
            <Bar dataKey="pengeluaran" fill="#ef4444" name="Pengeluaran" />
            <Bar dataKey="pemasukan" fill="#22c55e" name="Pemasukan" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
