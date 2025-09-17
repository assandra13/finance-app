"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DebtList } from "@/components/debt-list"
import { CreditList } from "@/components/credit-list"

export function DebtTabs() {
  return (
    <Tabs defaultValue="debt" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="debt">Hutang</TabsTrigger>
        <TabsTrigger value="credit">Piutang</TabsTrigger>
      </TabsList>
      <TabsContent value="debt" className="space-y-4">
        <DebtList />
      </TabsContent>
      <TabsContent value="credit" className="space-y-4">
        <CreditList />
      </TabsContent>
    </Tabs>
  )
}
