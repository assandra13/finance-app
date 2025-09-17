"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search, X } from "lucide-react"

const categories = [
  "Semua Kategori",
  "Makanan",
  "Transportasi",
  "Belanja",
  "Rumah",
  "Hiburan",
  "Kesehatan",
  "Pendidikan",
  "Gaji",
  "Investasi",
]

const timeFilters = ["Semua Waktu", "Hari Ini", "Minggu Ini", "Bulan Ini", "3 Bulan Terakhir"]

export function TransactionFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori")
  const [selectedTime, setSelectedTime] = useState("Bulan Ini")
  const [selectedType, setSelectedType] = useState("Semua")
  const [showFilters, setShowFilters] = useState(false)

  const activeFiltersCount = [selectedCategory, selectedTime, selectedType].filter(
    (filter) => !["Semua Kategori", "Semua Waktu", "Semua"].includes(filter),
  ).length

  const clearFilters = () => {
    setSelectedCategory("Semua Kategori")
    setSelectedTime("Semua Waktu")
    setSelectedType("Semua")
    setSearchTerm("")
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        {/* Search and Filter Toggle */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari transaksi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-transparent"
          >
            <Filter className="h-4 w-4" />
            Filter
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Transaction Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Jenis Transaksi</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Semua">Semua</SelectItem>
                    <SelectItem value="Pemasukan">Pemasukan</SelectItem>
                    <SelectItem value="Pengeluaran">Pengeluaran</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Kategori</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time Period */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Periode</label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeFilters.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters and Clear */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex flex-wrap gap-2">
                  {selectedType !== "Semua" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {selectedType}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedType("Semua")} />
                    </Badge>
                  )}
                  {selectedCategory !== "Semua Kategori" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {selectedCategory}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("Semua Kategori")} />
                    </Badge>
                  )}
                  {selectedTime !== "Semua Waktu" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {selectedTime}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedTime("Semua Waktu")} />
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Hapus Semua
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
