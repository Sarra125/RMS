"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"

export default function ExportsExcelPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [bookingLead, setBookingLead] = useState("")
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    if (!selectedDate || !bookingLead) {
      alert("Veuillez sélectionner une date et saisir le booking lead")
      return
    }

    setIsExporting(true)
    try {
      const response = await fetch(
        `/api/export/excel?date=${format(selectedDate, "yyyy-MM-dd")}&bookingLead=${bookingLead}`,
      )
      const data = await response.json()

      if (data.length === 0) {
        alert("Aucune donnée trouvée pour les paramètres sélectionnés")
        return
      }

      // Create CSV content
      const headers = ["Date", "My Price", "Median Price", "Suggested Price", "Action", "Type de Chambre"]
      const csvContent = [
        headers.join(","),
        ...data.map((row: any) =>
          [row.date, row.my_price, row.median_price, row.suggested_price, row.action, row.type_de_chambre].join(","),
        ),
      ].join("\n")

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `export_${format(selectedDate, "yyyy-MM-dd")}_lead${bookingLead}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error exporting data:", error)
      alert("Erreur lors de l'export des données")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Exports Excel</h1>
        <p className="text-gray-600">Génération et téléchargement de rapports Excel</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Export des données de tarification</CardTitle>
          <CardDescription>
            Exportez les données de la table final_price en sélectionnant une date et un booking lead
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Selection */}
            <div className="space-y-2">
              <Label>Date de sélection</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP", { locale: fr }) : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    defaultMonth={new Date(2025, 6)} // July 2025
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Booking Lead Input */}
            <div className="space-y-2">
              <Label htmlFor="bookingLead">Booking Lead</Label>
              <Input
                id="bookingLead"
                type="number"
                placeholder="Saisir le booking lead (ex: 15)"
                value={bookingLead}
                onChange={(e) => setBookingLead(e.target.value)}
                min="0"
                max="90"
              />
            </div>
          </div>

          {/* Export Button */}
          <div className="flex justify-center pt-4">
            <Button onClick={handleExport} disabled={isExporting || !selectedDate || !bookingLead} size="lg">
              <Download className="mr-2 h-4 w-4" />
              {isExporting ? "Export en cours..." : "Exporter vers Excel"}
            </Button>
          </div>

          {/* Information Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-blue-900 mb-2">Colonnes exportées :</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Date</li>
                <li>• My Price</li>
                <li>• Median Price</li>
                <li>• Suggested Price</li>
                <li>• Action</li>
                <li>• Type de Chambre</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
