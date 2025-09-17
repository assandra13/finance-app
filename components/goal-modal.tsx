"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { CalendarIcon, Home, Car, GraduationCap, Heart, Plane, Shield, Target, Gift } from "lucide-react"

const goalCategories = [
  { name: "Keamanan", icon: Shield, color: "text-red-500" },
  { name: "Properti", icon: Home, color: "text-green-500" },
  { name: "Kendaraan", icon: Car, color: "text-purple-500" },
  { name: "Pendidikan", icon: GraduationCap, color: "text-blue-500" },
  { name: "Kesehatan", icon: Heart, color: "text-pink-500" },
  { name: "Hiburan", icon: Plane, color: "text-orange-500" },
  { name: "Investasi", icon: Target, color: "text-indigo-500" },
  { name: "Lainnya", icon: Gift, color: "text-gray-500" },
]

const priorities = ["high", "medium", "low"]

interface GoalModalProps {
  isOpen: boolean
  onClose: () => void
  goal?: any
}

export function GoalModal({ isOpen, onClose, goal }: GoalModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    targetAmount: "",
    currentAmount: "",
    monthlyTarget: "",
    priority: "medium",
    deadline: new Date(),
    notes: "",
  })

  const [selectedDeadline, setSelectedDeadline] = useState<Date>()

  useEffect(() => {
    if (goal) {
      setFormData({
        name: goal.name,
        description: goal.description,
        category: goal.category,
        targetAmount: goal.targetAmount.toString(),
        currentAmount: goal.currentAmount.toString(),
        monthlyTarget: goal.monthlyTarget.toString(),
        priority: goal.priority,
        deadline: new Date(goal.deadline),
        notes: goal.notes || "",
      })
      setSelectedDeadline(new Date(goal.deadline))
    } else {
      // Reset form for new goal
      const nextYear = new Date()
      nextYear.setFullYear(nextYear.getFullYear() + 1)

      setFormData({
        name: "",
        description: "",
        category: "",
        targetAmount: "",
        currentAmount: "0",
        monthlyTarget: "",
        priority: "medium",
        deadline: nextYear,
        notes: "",
      })
      setSelectedDeadline(nextYear)
    }
  }, [goal])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Goal data:", formData)
    // In real app, this would save to database
    onClose()
  }

  const formatCurrency = (value: string) => {
    const number = Number.parseInt(value.replace(/\D/g, ""))
    if (isNaN(number)) return ""
    return new Intl.NumberFormat("id-ID").format(number)
  }

  const handleAmountChange = (field: string, value: string) => {
    const cleanValue = value.replace(/\D/g, "")
    setFormData({ ...formData, [field]: cleanValue })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{goal ? "Edit Tujuan" : "Tambah Tujuan Baru"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Goal Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nama Tujuan</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Dana Darurat, Liburan Bali"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Deskripsi singkat tujuan Anda"
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label>Kategori</Label>
            <div className="grid grid-cols-2 gap-2">
              {goalCategories.map((category) => {
                const Icon = category.icon
                const isSelected = formData.category === category.name
                return (
                  <Button
                    key={category.name}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => setFormData({ ...formData, category: category.name })}
                    className="h-auto p-3 flex items-center gap-2 justify-start bg-transparent"
                  >
                    <Icon className={`h-4 w-4 ${isSelected ? "" : category.color}`} />
                    <span className="text-sm">{category.name}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Target Amount */}
          <div className="space-y-2">
            <Label htmlFor="targetAmount">Jumlah Target</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">Rp</span>
              <Input
                id="targetAmount"
                value={formatCurrency(formData.targetAmount)}
                onChange={(e) => handleAmountChange("targetAmount", e.target.value)}
                placeholder="0"
                className="pl-10 text-right text-lg font-semibold"
                required
              />
            </div>
          </div>

          {/* Current Amount */}
          <div className="space-y-2">
            <Label htmlFor="currentAmount">Jumlah Saat Ini</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">Rp</span>
              <Input
                id="currentAmount"
                value={formatCurrency(formData.currentAmount)}
                onChange={(e) => handleAmountChange("currentAmount", e.target.value)}
                placeholder="0"
                className="pl-10 text-right"
              />
            </div>
          </div>

          {/* Monthly Target */}
          <div className="space-y-2">
            <Label htmlFor="monthlyTarget">Target Bulanan</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">Rp</span>
              <Input
                id="monthlyTarget"
                value={formatCurrency(formData.monthlyTarget)}
                onChange={(e) => handleAmountChange("monthlyTarget", e.target.value)}
                placeholder="0"
                className="pl-10 text-right"
                required
              />
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label>Prioritas</Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">Tinggi</SelectItem>
                <SelectItem value="medium">Sedang</SelectItem>
                <SelectItem value="low">Rendah</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label>Tanggal Target</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-transparent",
                    !selectedDeadline && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDeadline ? (
                    selectedDeadline.toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  ) : (
                    <span>Pilih tanggal target</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDeadline}
                  onSelect={(date) => {
                    setSelectedDeadline(date)
                    if (date) {
                      setFormData({ ...formData, deadline: date })
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Catatan (Opsional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Tambahkan catatan atau strategi untuk mencapai tujuan..."
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Batal
            </Button>
            <Button type="submit" className="flex-1">
              {goal ? "Simpan Perubahan" : "Tambah Tujuan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
