"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, CreditCard, Target, Calendar, TrendingUp, Wallet, Receipt, PiggyBank } from "lucide-react"

const quickActions = [
  {
    title: "Tambah Transaksi",
    description: "Catat pemasukan atau pengeluaran",
    icon: CreditCard,
    color: "bg-primary hover:bg-primary/90 text-primary-foreground",
    action: () => console.log("Add transaction"),
  },
  {
    title: "Buat Tujuan Baru",
    description: "Tetapkan target tabungan",
    icon: Target,
    color: "bg-success hover:bg-success/90 text-success-foreground",
    action: () => console.log("Create goal"),
  },
  {
    title: "Atur Tagihan",
    description: "Kelola pembayaran rutin",
    icon: Calendar,
    color: "bg-warning hover:bg-warning/90 text-warning-foreground",
    action: () => console.log("Manage bills"),
  },
  {
    title: "Lihat Laporan",
    description: "Analisis keuangan detail",
    icon: TrendingUp,
    color: "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
    action: () => console.log("View reports"),
  },
]

const financialSnapshot = [
  {
    label: "Saldo Hari Ini",
    value: "Rp 15.750.000",
    change: "+Rp 250.000",
    positive: true,
    icon: Wallet,
  },
  {
    label: "Pengeluaran Minggu Ini",
    value: "Rp 1.850.000",
    change: "-15% dari minggu lalu",
    positive: true,
    icon: Receipt,
  },
  {
    label: "Progress Tabungan",
    value: "68%",
    change: "Target bulan ini",
    positive: true,
    icon: PiggyBank,
  },
]

export function QuickActions() {
  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Aksi Cepat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  onClick={action.action}
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform bg-transparent"
                >
                  <div className={`p-2 rounded-full ${action.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{action.title}</p>
                    <p className="text-xs text-muted-foreground hidden md:block">{action.description}</p>
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Financial Snapshot */}
      <Card>
        <CardHeader>
          <CardTitle>Snapshot Keuangan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {financialSnapshot.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-semibold">{item.value}</p>
                    <p className={`text-xs ${item.positive ? "text-success" : "text-destructive"}`}>{item.change}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
