"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { RefreshCw } from "lucide-react"

const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
]

export default function PerformanceDoublePage() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasData, setHasData] = useState(false)

  const fetchPerformanceData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/bh/performance?type=double`)
      const result = await response.json()

      const transformedData = result.map((item: any) => ({
        month: MONTHS[item.arr_month - 1],
        revpar: item.avg_revpar,
        adr: (400 * item.avg_revpar) / item.avg_reservations,
        occupancy: item.avg_occupancy * 100, // Convert to percentage
      }))

      setData(transformedData)
      setHasData(true)
    } catch (error) {
      console.error("Error fetching performance data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance - Chambres Double</h1>
          <p className="text-gray-600">Analyse des performances des chambres double</p>
        </div>
        <Button onClick={fetchPerformanceData} disabled={isLoading} className="flex items-center gap-2">
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Chargement..." : "Actualiser les données"}
        </Button>
      </div>

      {!hasData ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardHeader className="text-center">
            <CardTitle className="text-gray-600">Données de performance</CardTitle>
            <CardDescription>
              Cliquez sur "Actualiser les données" pour charger les métriques de performance
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {/* RevPAR Chart */}
          <Card>
            <CardHeader>
              <CardTitle>RevPAR - Revenus par chambre disponible</CardTitle>
              <CardDescription>Variation des revenus par chambre disponible par mois</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revpar" fill="#3b82f6" name="RevPAR" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* ADR Chart */}
          <Card>
            <CardHeader>
              <CardTitle>ADR - Prix moyen évolutif</CardTitle>
              <CardDescription>Évolution du prix moyen des chambres double</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="adr" stroke="#10b981" strokeWidth={2} name="ADR" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Occupancy Rate Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Taux d'occupation</CardTitle>
              <CardDescription>Analyse des pics de remplissage par mois</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.3}
                    name="Taux d'occupation (%)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
