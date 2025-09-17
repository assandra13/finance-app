"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, Target, PiggyBank, CreditCard, Calendar } from "lucide-react"

const insights = [
  {
    type: "warning",
    icon: AlertTriangle,
    title: "Pengeluaran Makanan Tinggi",
    description: "Pengeluaran makanan 40% lebih tinggi dari rata-rata nasional",
    action: "Pertimbangkan memasak di rumah lebih sering",
    impact: "Potensi penghematan Rp 800K/bulan",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    type: "success",
    icon: CheckCircle,
    title: "Target Tabungan Tercapai",
    description: "Anda berhasil menabung 30% dari penghasilan bulan ini",
    action: "Pertahankan kebiasaan menabung yang baik",
    impact: "Target tahunan akan tercapai 2 bulan lebih cepat",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    type: "info",
    icon: Target,
    title: "Peluang Investasi",
    description: "Surplus dana Rp 2M dapat diinvestasikan",
    action: "Pertimbangkan investasi reksa dana atau deposito",
    impact: "Potensi return 8-12% per tahun",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    type: "warning",
    icon: CreditCard,
    title: "Penggunaan Kartu Kredit Meningkat",
    description: "Penggunaan kartu kredit naik 25% dari bulan lalu",
    action: "Monitor penggunaan dan bayar tepat waktu",
    impact: "Hindari bunga dan denda keterlambatan",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
]

const financialHealth = {
  score: 78,
  factors: [
    { name: "Rasio Tabungan", score: 85, target: 80 },
    { name: "Diversifikasi Pengeluaran", score: 72, target: 75 },
    { name: "Konsistensi Budget", score: 80, target: 85 },
    { name: "Emergency Fund", score: 65, target: 90 },
    { name: "Debt-to-Income Ratio", score: 88, target: 70 },
  ],
}

export function FinancialInsights() {
  return (
    <div className="space-y-6">
      {/* Financial Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="w-5 h-5" />
            Skor Kesehatan Keuangan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">{financialHealth.score}</div>
              <div className="text-sm text-gray-600">dari 100</div>
            </div>
            <div className="flex-1">
              <Progress value={financialHealth.score} className="h-3" />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>Buruk</span>
                <span>Baik</span>
                <span>Sangat Baik</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {financialHealth.factors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{factor.name}</span>
                    <span className="text-sm text-gray-600">
                      {factor.score}/{factor.target}
                    </span>
                  </div>
                  <Progress value={(factor.score / factor.target) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <div className="grid gap-4">
        <h3 className="text-lg font-semibold">Insights & Rekomendasi</h3>
        {insights.map((insight, index) => {
          const IconComponent = insight.icon
          return (
            <Card key={index} className={`${insight.bgColor} ${insight.borderColor} border-2`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <IconComponent className={`w-6 h-6 ${insight.color} mt-1`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{insight.title}</h4>
                      <Badge variant={insight.type === "success" ? "default" : "secondary"}>
                        {insight.type === "success" ? "Bagus" : insight.type === "warning" ? "Perhatian" : "Info"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{insight.description}</p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Rekomendasi: {insight.action}</p>
                      <p className="text-sm text-gray-600">Dampak: {insight.impact}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Spending Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Pola Pengeluaran
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Hari dalam Seminggu</h4>
              <div className="space-y-2">
                {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((day, index) => {
                  const amounts = [180000, 150000, 200000, 170000, 220000, 350000, 280000]
                  const maxAmount = Math.max(...amounts)
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm w-16">{day}</span>
                      <div className="flex-1 mx-3">
                        <Progress value={(amounts[index] / maxAmount) * 100} className="h-2" />
                      </div>
                      <span className="text-sm font-medium w-20 text-right">
                        Rp {(amounts[index] / 1000).toFixed(0)}K
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Waktu dalam Sehari</h4>
              <div className="space-y-2">
                {["Pagi (06-12)", "Siang (12-18)", "Malam (18-24)", "Dini Hari (00-06)"].map((time, index) => {
                  const amounts = [120000, 280000, 180000, 20000]
                  const maxAmount = Math.max(...amounts)
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm w-24">{time}</span>
                      <div className="flex-1 mx-3">
                        <Progress value={(amounts[index] / maxAmount) * 100} className="h-2" />
                      </div>
                      <span className="text-sm font-medium w-20 text-right">
                        Rp {(amounts[index] / 1000).toFixed(0)}K
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
