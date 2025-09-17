"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Calendar, Download, BarChart3, PieChart, LineChart } from "lucide-react"
import { SpendingChart } from "@/components/spending-chart"
import { CategoryBreakdown } from "@/components/category-breakdown"
import { TrendAnalysis } from "@/components/trend-analysis"
import { MonthlyComparison } from "@/components/monthly-comparison"
import { FinancialInsights } from "@/components/financial-insights"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function LaporanPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const [selectedPeriod, setSelectedPeriod] = useState("bulan-ini")
  const [selectedChart, setSelectedChart] = useState("pengeluaran")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Laporan & Analisis</h1>
            <p className="text-gray-600">Analisis mendalam keuangan Anda</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minggu-ini">Minggu Ini</SelectItem>
                <SelectItem value="bulan-ini">Bulan Ini</SelectItem>
                <SelectItem value="3-bulan">3 Bulan Terakhir</SelectItem>
                <SelectItem value="6-bulan">6 Bulan Terakhir</SelectItem>
                <SelectItem value="tahun-ini">Tahun Ini</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Ekspor
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Pengeluaran</p>
                  <p className="text-2xl font-bold">Rp 8.5M</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-200" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+12% dari bulan lalu</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Pemasukan</p>
                  <p className="text-2xl font-bold">Rp 12M</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-200" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+8% dari bulan lalu</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Rata-rata Harian</p>
                  <p className="text-2xl font-bold">Rp 275K</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-200" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingDown className="w-4 h-4 mr-1" />
                <span className="text-sm">-5% dari bulan lalu</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Efisiensi Budget</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
                <PieChart className="w-8 h-8 text-orange-200" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+3% dari bulan lalu</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Selection */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5" />
                Visualisasi Data
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={selectedChart === "pengeluaran" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedChart("pengeluaran")}
                >
                  Pengeluaran
                </Button>
                <Button
                  variant={selectedChart === "kategori" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedChart("kategori")}
                >
                  Kategori
                </Button>
                <Button
                  variant={selectedChart === "trend" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedChart("trend")}
                >
                  Trend
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {selectedChart === "pengeluaran" && <SpendingChart />}
            {selectedChart === "kategori" && <CategoryBreakdown />}
            {selectedChart === "trend" && <TrendAnalysis />}
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <Tabs defaultValue="perbandingan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="perbandingan">Perbandingan Bulanan</TabsTrigger>
            <TabsTrigger value="insights">Insights Keuangan</TabsTrigger>
            <TabsTrigger value="prediksi">Prediksi & Rekomendasi</TabsTrigger>
          </TabsList>

          <TabsContent value="perbandingan">
            <MonthlyComparison />
          </TabsContent>

          <TabsContent value="insights">
            <FinancialInsights />
          </TabsContent>

          <TabsContent value="prediksi">
            <Card>
              <CardHeader>
                <CardTitle>Prediksi & Rekomendasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-blue-900">Prediksi Pengeluaran Bulan Depan</h4>
                        <p className="text-blue-700 text-sm mt-1">
                          Berdasarkan pola pengeluaran, estimasi pengeluaran bulan depan: <strong>Rp 9.2M</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-green-900">Rekomendasi Penghematan</h4>
                        <p className="text-green-700 text-sm mt-1">
                          Kurangi pengeluaran kategori "Hiburan" sebesar 20% untuk menghemat <strong>Rp 400K</strong>{" "}
                          per bulan
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-orange-900">Target Tabungan</h4>
                        <p className="text-orange-700 text-sm mt-1">
                          Dengan pola saat ini, Anda dapat mencapai target tabungan "Liburan" dalam{" "}
                          <strong>8 bulan</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
