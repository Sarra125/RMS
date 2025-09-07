"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { QUANTILE_COLORS, CURRENT_DATE } from "@/lib/constants"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface TarificationProps {
  roomType: "single" | "double" | "family"
}

interface PricingData {
  Paid_price: number
  pred_q0_025: number
  pred_q0_5: number
  pred_q0_975: number
  rev__q0_025: number
  rev__q0_5: number
  rev__q0_975: number
  best_025: number
  best_50: number
  best_975: number
}

interface CompetitorPrice {
  Hotel_id: number
  Date: string
  Prix: number
}

interface FinalPrice {
  date: string
  suggested_price: number
}

export function TarificationBase({ roomType }: TarificationProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(CURRENT_DATE))
  const [event, setEvent] = useState("no_promo")
  const [bookingLead, setBookingLead] = useState(15)
  const [promoPercentage, setPromoPercentage] = useState("")
  const [pricingData, setPricingData] = useState<PricingData[]>([])
  const [competitorPrices, setCompetitorPrices] = useState<CompetitorPrice[]>([])
  const [finalPrices, setFinalPrices] = useState<FinalPrice[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const isCurrentDate = format(selectedDate, "yyyy-MM-dd") === CURRENT_DATE
  const roomTypeLabel = roomType.charAt(0).toUpperCase() + roomType.slice(1)

  const fetchPricingData = async () => {
    setLoading(true)
    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd")
      const eventType = event === "promo" ? "is_promo" : "no_promo"

      // Fetch Phase 1 data
      const pricingResponse = await fetch(
        `/api/bh/pricing?date=${dateStr}&type=${roomType}&event=${eventType}&lead=${bookingLead}`,
      )

      if (pricingResponse.ok) {
        const pricingResult = await pricingResponse.json()
        setPricingData(pricingResult)
      } else {
        setPricingData(generateMockPricingData())
      }

      // Fetch Phase 2 data only for current date
      if (isCurrentDate) {
        const [competitorResponse, finalPriceResponse] = await Promise.all([
          fetch(`/api/comp/prices?date=${dateStr}&type=${roomType}`),
          fetch(`/api/final-price?type=${roomType}`),
        ])

        if (competitorResponse.ok) {
          const competitorResult = await competitorResponse.json()
          setCompetitorPrices(competitorResult)
        } else {
          setCompetitorPrices(generateMockCompetitorData())
        }

        if (finalPriceResponse.ok) {
          const finalResult = await finalPriceResponse.json()
          setFinalPrices(finalResult)
        } else {
          setFinalPrices(generateMockFinalPrices())
        }
      }
    } catch (error) {
      console.error("Error fetching pricing data:", error)
      setPricingData(generateMockPricingData())
      if (isCurrentDate) {
        setCompetitorPrices(generateMockCompetitorData())
        setFinalPrices(generateMockFinalPrices())
      }
      toast({
        title: "Données simulées",
        description: "Utilisation de données de démonstration",
        variant: "default",
      })
    }
    setLoading(false)
  }

  const generateMockPricingData = (): PricingData[] => {
    const basePrice = roomType === "single" ? 650 : roomType === "double" ? 1100 : 1400
    const data = []

    for (let i = 0; i < 50; i++) {
      const price = basePrice + i * 10
      const q025 = 200 + Math.random() * 50
      const q50 = 250 + Math.random() * 50
      const q975 = 300 + Math.random() * 50

      data.push({
        Paid_price: price,
        pred_q0_025: q025,
        pred_q0_5: q50,
        pred_q0_975: q975,
        rev__q0_025: price * q025,
        rev__q0_5: price * q50,
        rev__q0_975: price * q975,
        best_025: basePrice + 50,
        best_50: basePrice + 100,
        best_975: basePrice + 150,
      })
    }
    return data
  }

  const generateMockCompetitorData = (): CompetitorPrice[] => {
    const basePrice = roomType === "single" ? 650 : roomType === "double" ? 1100 : 1400
    return Array.from({ length: 10 }, (_, i) => ({
      Hotel_id: 341 + i,
      Date: CURRENT_DATE,
      Prix: basePrice + Math.random() * 200 - 100,
    }))
  }

  const generateMockFinalPrices = (): FinalPrice[] => {
    const basePrice = roomType === "single" ? 650 : roomType === "double" ? 1100 : 1400
    return Array.from({ length: 30 }, (_, i) => ({
      date: format(new Date(Date.now() + i * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
      suggested_price: basePrice + Math.random() * 100 - 50,
    }))
  }

  useEffect(() => {
    fetchPricingData()
  }, [selectedDate, event, bookingLead, roomType])

  const optimalPrices = pricingData.length > 0 ? pricingData[0] : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tarification - Chambres {roomTypeLabel}</h1>
        <p className="text-gray-600">Optimisation des prix et analyse dynamique</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Paramètres de Tarification</CardTitle>
          <CardDescription>Configurez les paramètres pour l'optimisation des prix</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Date d'arrivée</Label>
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
                    {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: fr }) : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Événement</Label>
              <Select value={event} onValueChange={setEvent}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no_promo">No Promo</SelectItem>
                  <SelectItem value="promo">Promo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {event === "promo" && (
              <div className="space-y-2">
                <Label>Pourcentage de promo (%)</Label>
                <Input
                  type="number"
                  placeholder="10"
                  value={promoPercentage}
                  onChange={(e) => setPromoPercentage(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Booking Lead (jours)</Label>
              <Input
                type="number"
                placeholder="15"
                value={bookingLead}
                onChange={(e) => setBookingLead(Number(e.target.value) || 0)}
                min={0}
                max={90}
              />
            </div>
          </div>

          <Button onClick={fetchPricingData} disabled={loading} className="w-full md:w-auto">
            {loading ? "Calcul en cours..." : "Calculer les prix optimaux"}
          </Button>
        </CardContent>
      </Card>

      {/* Phase 1: Pricing Optimization */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Phase 1 — Pricing Optimization</h2>

        {/* Optimal Price Cards */}
        {optimalPrices && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Prix Optimal Q0.025</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" style={{ color: QUANTILE_COLORS.q0_025 }}>
                  {optimalPrices.best_025.toFixed(0)} TND
                </div>
                <p className="text-sm text-gray-600">Quantile 2.5%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Prix Optimal Q0.5</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" style={{ color: QUANTILE_COLORS.q0_5 }}>
                  {optimalPrices.best_50.toFixed(0)} TND
                </div>
                <p className="text-sm text-gray-600">Médiane</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Prix Optimal Q0.975</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" style={{ color: QUANTILE_COLORS.q0_975 }}>
                  {optimalPrices.best_975.toFixed(0)} TND
                </div>
                <p className="text-sm text-gray-600">Quantile 97.5%</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Charts A & B */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Chart A - Prédiction de Réservation par Quantile</CardTitle>
              <CardDescription>Nombre de réservations prédites selon le prix</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pricingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Paid_price" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pred_q0_025"
                    stroke={QUANTILE_COLORS.q0_025}
                    name="Q0.025"
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="pred_q0_5" stroke={QUANTILE_COLORS.q0_5} name="Q0.5" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="pred_q0_975"
                    stroke={QUANTILE_COLORS.q0_975}
                    name="Q0.975"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chart B - Revenus Prédits par Quantile</CardTitle>
              <CardDescription>Revenus prédits selon le prix avec highlights des optimaux</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pricingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Paid_price" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rev__q0_025"
                    stroke={QUANTILE_COLORS.q0_025}
                    name="Rev Q0.025"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="rev__q0_5"
                    stroke={QUANTILE_COLORS.q0_5}
                    name="Rev Q0.5"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="rev__q0_975"
                    stroke={QUANTILE_COLORS.q0_975}
                    name="Rev Q0.975"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Phase 2: Dynamic Pricing (only for current date) */}
      {isCurrentDate && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Phase 2 — Dynamic Pricing</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart C - Competitor Prices */}
            <Card>
              <CardHeader>
                <CardTitle>Chart C - Prix Concurrents vs Prix Optimal</CardTitle>
                <CardDescription>
                  Comparaison mensuelle avec les prix de la concurrence 
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={[
                      { Mois: "juillet",   H335: 410, H316: 480, H310: 430, H353: 490, H315: 365, H317: 440, H320: 520, H328: 390, H341: 470 },
                      { Mois: "août",      H335: 395, H316: 465, H310: 420, H353: 470, H315: 350, H317: 430, H320: 505, H328: 370, H341: 455 },
                      { Mois: "septembre", H335: 440, H316: 500, H310: 460, H353: 515, H315: 395, H317: 470, H320: 550, H328: 410, H341: 495 },
                      { Mois: "octobre",   H335: 460, H316: 520, H310: 480, H353: 540, H315: 375, H317: 490, H320: 570, H328: 430, H341: 510 },
                      { Mois: "novembre",  H335: 480, H316: 540, H310: 500, H353: 560, H315: 405, H317: 510, H320: 590, H328: 450, H341: 525 },
                      { Mois: "décembre",  H335: 500, H316: 560, H310: 520, H353: 580, H315: 425, H317: 530, H320: 610, H328: 470, H341: 545 },
                      { Mois: "janvier",   H335: 420, H316: 510, H310: 460, H353: 520, H315: 390, H317: 480, H320: 530, H328: 400, H341: 495 },
                      { Mois: "février",   H335: 445, H316: 495, H310: 470, H353: 505, H315: 410, H317: 465, H320: 550, H328: 415, H341: 500 },
                      { Mois: "mars",      H335: 460, H316: 520, H310: 490, H353: 530, H315: 395, H317: 485, H320: 570, H328: 430, H341: 520 },
                      { Mois: "avril",     H335: 430, H316: 505, H310: 475, H353: 510, H315: 380, H317: 470, H320: 540, H328: 410, H341: 510 },
                      { Mois: "mai",       H335: 470, H316: 540, H310: 495, H353: 560, H315: 415, H317: 500, H320: 590, H328: 435, H341: 530 },
                      { Mois: "juin",      H335: 490, H316: 560, H310: 510, H353: 580, H315: 430, H317: 520, H320: 610, H328: 450, H341: 545 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Mois" />
                    <YAxis domain={[350, 700]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="H335" stroke="#82ca9d" name="Hotel 335" />
                    <Line type="monotone" dataKey="H316" stroke="#8884d8" name="Hotel 316" />
                    <Line type="monotone" dataKey="H328" stroke="#ff7300" name="Hotel 310" />
                    <Line type="monotone" dataKey="H353" stroke="#ffc658" name="Hotel 353" />
                    <Line type="monotone" dataKey="H315" stroke="#0088FE" name="Hotel 315" />
                    <Line type="monotone" dataKey="H341" stroke="#00C49F" name="Hotel 317" />
                    <Line type="monotone" dataKey="H320" stroke="#FF8042" name="Hotel 320" />
                    <Line type="monotone" dataKey="H310" stroke="#AA336A" name="Hotel 328" />
                    <Line
                      type="monotone"
                      dataKey="H317"
                      stroke="#000000"
                      strokeWidth={3}
                      name="Hôtel étudié"
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Chart D - Price Positioning */}
            <Card>
              <CardHeader>
                <CardTitle>Chart D - Positionnement Prix</CardTitle>
                <CardDescription>Position concurrentielle par hôtel</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-6">
                {/* Chart */}
                <ResponsiveContainer width="70%" height={300}>
                  <BarChart data={competitorPrices}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Hotel_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Prix" fill="#82ca9d" name="Prix par Hôtel" />
                  </BarChart>
                </ResponsiveContainer>

                {/* Custom legend mapping IDs to Names */}
                <div className="w-1/3">
                  <h4 className="font-semibold mb-2">Légende Hôtels</h4>
                  <ul className="text-sm space-y-1">
                    {competitorPrices.map((hotel) => (
                      <li key={hotel.Hotel_id}>
                        <span className="font-bold">{hotel.Hotel_id}</span> → {hotel.Hotel_name}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart E - Final Suggested Price */}
          <Card>
            <CardHeader>
              <CardTitle>Chart E - Prix Suggéré Final</CardTitle>
              <CardDescription>Évolution du prix suggéré dans le temps</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={finalPrices}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                  dataKey="date"
                  ticks={["2025-01-01", "2025-02-01", "2025-03-01", "2025-04-01", "2025-05-01", "2025-06-01", "2025-07-01", "2025-08-01", "2025-09-01", "2025-10-01", "2025-11-01", "2025-12-01"]}
                  tickFormatter={(tick) => {
                    const monthNames = [
                      "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
                      "Juil", "Août", "Sep", "Oct", "Nov", "Déc"
                    ];
                    const monthIndex = new Date(tick).getMonth();
                    return monthNames[monthIndex];
                  }}
                />

                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="suggested_price"
                    stroke="#ff7300"
                    name="Prix Suggéré"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
