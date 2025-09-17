"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const pieData = [
  { name: "Makanan", value: 2800000, color: "#ef4444" },
  { name: "Transportasi", value: 1500000, color: "#f97316" },
  { name: "Belanja", value: 1200000, color: "#eab308" },
  { name: "Hiburan", value: 800000, color: "#22c55e" },
  { name: "Kesehatan", value: 600000, color: "#3b82f6" },
  { name: "Pendidikan", value: 400000, color: "#8b5cf6" },
  { name: "Lainnya", value: 1200000, color: "#6b7280" },
]

const barData = [
  { kategori: "Makanan", budget: 3000000, actual: 2800000 },
  { kategori: "Transportasi", budget: 1800000, actual: 1500000 },
  { kategori: "Belanja", budget: 1000000, actual: 1200000 },
  { kategori: "Hiburan", budget: 600000, actual: 800000 },
  { kategori: "Kesehatan", budget: 500000, actual: 600000 },
  { kategori: "Pendidikan", budget: 400000, actual: 400000 },
]

export function CategoryBreakdown() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Distribusi Pengeluaran</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`Rp ${(value / 1000000).toFixed(1)}M`, "Pengeluaran"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Budget vs Aktual</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                <YAxis dataKey="kategori" type="category" width={80} />
                <Tooltip formatter={(value: number) => [`Rp ${(value / 1000000).toFixed(1)}M`, ""]} />
                <Bar dataKey="budget" fill="#e5e7eb" name="Budget" />
                <Bar dataKey="actual" fill="#3b82f6" name="Aktual" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Details */}
      <div className="grid gap-4">
        <h3 className="text-lg font-semibold">Detail Kategori</h3>
        <div className="grid gap-3">
          {pieData.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                <span className="font-medium">{category.name}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">Rp {(category.value / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-gray-500">
                  {((category.value / pieData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
