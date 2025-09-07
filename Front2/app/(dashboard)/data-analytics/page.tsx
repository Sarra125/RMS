"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { EVENTS, ROOM_TYPES } from "@/lib/constants"
import { useToast } from "@/hooks/use-toast"

interface DataPoint {
  Paid_price: number
  nbre_res: number
  event: string
  type_de_chambre: string
}

interface OLSResult {
  event: string
  coefficient: number
  std_error: number
  t_statistic: number
  p_value: number
  r_squared: number
}

const EVENT_COLORS = {
  no_promo: "#3B82F6", // Blue
  is_promo: "#F59E0B", // Orange
  "is-week-end": "#10B981", // Green
  is_week_end_promo: "#EF4444", // Red
}

// Mock OLS results data
const mockOLSResults: OLSResult[] = [
  { event: "no_promo", coefficient: -0.6125, std_error: 0.002, t_statistic: -246.561, p_value: 0.0, r_squared: 0.603 },
  {
    event: "is-week-end",
    coefficient: -130.7637,
    std_error: 0.354,
    t_statistic: -368.932,
    p_value: 0.0,
    r_squared: 0.603,
  },
  { event: "is_promo", coefficient: -59.4339, std_error: 0.322, t_statistic: -184.746, p_value: 0.0, r_squared: 0.603 },
  {
    event: "is_week_end_promo",
    coefficient: -176.9598,
    std_error: 0.563,
    t_statistic: -314.285,
    p_value: 0.0,
    r_squared: 0.603,
  },
]

const MONTHS = [
  { value: "1", label: "Janvier" },
  { value: "2", label: "Février" },
  { value: "3", label: "Mars" },
  { value: "4", label: "Avril" },
  { value: "5", label: "Mai" },
  { value: "6", label: "Juin" },
  { value: "7", label: "Juillet" },
  { value: "8", label: "Août" },
  { value: "9", label: "Septembre" },
  { value: "10", label: "Octobre" },
  { value: "11", label: "Novembre" },
  { value: "12", label: "Décembre" },
]

export default function DataAnalyticsPage() {
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const [bookingLeadMax, setBookingLeadMax] = useState("")
  const [data, setData] = useState<DataPoint[]>([])
  const [loading, setLoading] = useState(false)
  const [hasData, setHasData] = useState(false)
  const { toast } = useToast()

  const fetchData = async () => {
    if (selectedMonths.length === 0) {
      toast({
        title: "Sélection requise",
        description: "Veuillez sélectionner au moins un mois",
        variant: "destructive",
      })
      return
    }

    if (!bookingLeadMax || isNaN(Number(bookingLeadMax))) {
      toast({
        title: "Booking Lead requis",
        description: "Veuillez entrer une valeur numérique pour le booking lead maximum",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/bh/eda?mois=${selectedMonths.join(",")}&bookingLeadMax=${bookingLeadMax}`)
      if (response.ok) {
        const result = await response.json()
        setData(result)
      } else {
        // Use mock data if API fails
        setData(generateMockData())
      }
      setHasData(true)
    } catch (error) {
      console.error("Error fetching data:", error)
      setData(generateMockData())
      setHasData(true)
      toast({
        title: "Données simulées",
        description: "Utilisation de données de démonstration",
        variant: "default",
      })
    }
    setLoading(false)
  }

  const generateMockData = (): DataPoint[] => {
    const mockData: DataPoint[] = []
    ROOM_TYPES.forEach((roomType) => {
      EVENTS.forEach((event) => {
        for (let i = 0; i < 50; i++) {
          const basePrice = roomType === "single" ? 650 : roomType === "double" ? 1100 : 1400
          const priceVariation = Math.random() * 100 - 50
          const baseReservations = event.includes("promo") ? Math.random() * 100 + 150 : Math.random() * 150 + 200

          mockData.push({
            Paid_price: basePrice + priceVariation,
            nbre_res: baseReservations + Math.random() * 50,
            event,
            type_de_chambre: roomType,
          })
        }
      })
    })
    return mockData
  }

  const handleMonthChange = (monthValue: string, checked: boolean) => {
    if (checked) {
      setSelectedMonths((prev) => [...prev, monthValue])
    } else {
      setSelectedMonths((prev) => prev.filter((m) => m !== monthValue))
    }
  }

  const getDataByRoomType = (roomType: string) => {
    return data.filter((d) => d.type_de_chambre === roomType)
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{`Event: ${data.event}`}</p>
          <p className="text-blue-600">{`Prix: ${data.Paid_price.toFixed(2)} TND`}</p>
          <p className="text-green-600">{`Réservations: ${data.nbre_res.toFixed(0)}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Data Analytics (EDA)</h1>
        <p className="text-gray-600">Analyse exploratoire des données de réservation</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
          <CardDescription>Sélectionnez les paramètres d'analyse</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-base font-medium">Mois d'arrivée (sélection multiple)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {MONTHS.map((month) => (
                  <div key={month.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`month-${month.value}`}
                      checked={selectedMonths.includes(month.value)}
                      onCheckedChange={(checked) => handleMonthChange(month.value, checked as boolean)}
                    />
                    <Label htmlFor={`month-${month.value}`} className="text-sm font-normal cursor-pointer">
                      {month.label}
                    </Label>
                  </div>
                ))}
              </div>
              {selectedMonths.length > 0 && (
                <p className="text-sm text-gray-600">
                  Mois sélectionnés:{" "}
                  {selectedMonths.map((m) => MONTHS.find((month) => month.value === m)?.label).join(", ")}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-lead">Booking Lead Maximum (jours)</Label>
              <Input
                id="booking-lead"
                type="number"
                value={bookingLeadMax}
                onChange={(e) => setBookingLeadMax(e.target.value)}
                placeholder="Entrez le nombre de jours (0-90)"
                min="0"
                max="90"
                className="w-full md:w-64"
              />
            </div>
          </div>

          <Button onClick={fetchData} disabled={loading} className="w-full md:w-auto">
            {loading ? "Actualisation en cours..." : "Actualiser les données"}
          </Button>
        </CardContent>
      </Card>

      {hasData && (
        <>
          {/* Scatter plots by room type */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {ROOM_TYPES.map((roomType) => (
              <Card key={roomType}>
                <CardHeader>
                  <CardTitle className="capitalize">Chambres {roomType}</CardTitle>
                  <CardDescription>Prix vs Nombre de réservations par événement</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" dataKey="Paid_price" name="Prix" domain={["dataMin - 50", "dataMax + 50"]} />
                      <YAxis
                        type="number"
                        dataKey="nbre_res"
                        name="Réservations"
                        domain={["dataMin - 20", "dataMax + 20"]}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      {EVENTS.map((event) => (
                        <Scatter
                          key={event}
                          name={event.replace("_", " ")}
                          data={getDataByRoomType(roomType).filter((d) => d.event === event)}
                          fill={EVENT_COLORS[event as keyof typeof EVENT_COLORS]}
                        />
                      ))}
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* OLS Results */}
          <Card>
            <CardHeader>
              <CardTitle>Résultats de Régression OLS par Événement</CardTitle>
              <CardDescription>Analyse statistique de l'impact des événements sur les réservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Événement</th>
                      <th className="text-right p-3 font-medium">Coefficient</th>
                      <th className="text-right p-3 font-medium">Erreur Standard</th>
                      <th className="text-right p-3 font-medium">Statistique t</th>
                      <th className="text-right p-3 font-medium">P-value</th>
                      <th className="text-right p-3 font-medium">R²</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOLSResults.map((result, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: EVENT_COLORS[result.event as keyof typeof EVENT_COLORS] }}
                            />
                            <span>{result.event.replace("_", " ")}</span>
                          </div>
                        </td>
                        <td className="text-right p-3">{result.coefficient.toFixed(4)}</td>
                        <td className="text-right p-3">{result.std_error.toFixed(3)}</td>
                        <td className="text-right p-3">{result.t_statistic.toFixed(3)}</td>
                        <td className="text-right p-3">{result.p_value.toFixed(3)}</td>
                        <td className="text-right p-3">{result.r_squared.toFixed(3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-600">267,975</div>
                    <p className="text-sm text-gray-600">Observations</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-green-600">0.603</div>
                    <p className="text-sm text-gray-600">R² Ajusté</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-orange-600">6.77e+04</div>
                    <p className="text-sm text-gray-600">F-statistique</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-red-600">0.000</div>
                    <p className="text-sm text-gray-600">Prob (F-stat)</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!hasData && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <p className="text-gray-600">
                Sélectionnez les paramètres et cliquez sur "Actualiser les données" pour voir l'analyse
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
