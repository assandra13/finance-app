"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Calendar } from "lucide-react"

const monthlyData = [
  {
    month: "Juni 2024",
    income: 12000000,
    expense: 8500000,
    savings: 3500000,
    budgetEfficiency: 85,
    topCategory: "Makanan",
    trend: "up",
  },
  {
    month: "Mei 2024",
    income: 11800000,
    expense: 7900000,
    savings: 3900000,
    budgetEfficiency: 88,
    topCategory: "Makanan",
    trend: "down",
  },
  {
    month: "April 2024",
    income: 12000000,
    expense: 8500000,
    savings: 3500000,
    budgetEfficiency: 82,
    topCategory: "Transportasi",
    trend: "up",
  },
  {
    month: "Maret 2024",
    income: 12200000,
    expense: 7800000,
    savings: 4400000,
    budgetEfficiency: 90,
    topCategory: "Makanan",
    trend: "down",
  },
]

export function MonthlyComparison() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {monthlyData.map((data, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5" />
                  {data.month}
                </CardTitle>
                <Badge variant={data.trend === "up" ? "destructive" : "default"}>
                  {data.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {data.trend === "up" ? "Naik" : "Turun"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Pemasukan</p>
                  <p className="font-semibold text-green-600">Rp {(data.income / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pengeluaran</p>
                  <p className="font-semibold text-red-600">Rp {(data.expense / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tabungan</p>
                  <p className="font-semibold text-blue-600">Rp {(data.savings / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Efisiensi Budget</p>
                  <p className="font-semibold">{data.budgetEfficiency}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kategori Tertinggi</p>
                  <p className="font-semibold">{data.topCategory}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Perbandingan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Bulan Terbaik</h4>
              <p className="text-green-700">Maret 2024</p>
              <p className="text-sm text-green-600">Efisiensi budget 90%</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Rata-rata Tabungan</h4>
              <p className="text-blue-700">Rp 3.8M per bulan</p>
              <p className="text-sm text-blue-600">32% dari pemasukan</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Kategori Dominan</h4>
              <p className="text-orange-700">Makanan</p>
              <p className="text-sm text-orange-600">75% dari total bulan</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
