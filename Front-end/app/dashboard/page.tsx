"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Users,
  TrendingUp,
  Bed,
  BarChart3,
  DollarSign,
  FileSpreadsheet,
  Bell,
  Settings,
  User,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart,
  Cell, // Added Cell import to fix the error
} from "recharts"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const [selectedDate, setSelectedDate] = useState("")
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])
  const [bookingLead, setBookingLead] = useState("10")
  const [selectedCompetitor, setSelectedCompetitor] = useState("all")

  const toggleExpanded = (item: string) => {
    setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const handleEventChange = (event: string, checked: boolean) => {
    if (checked) {
      setSelectedEvents((prev) => [...prev, event])
    } else {
      setSelectedEvents((prev) => prev.filter((e) => e !== event))
    }
  }

  const priceVsReservationsData = [
    { price: 600, actual: 85, pred_025: 75, pred_050: 85, pred_975: 95 },
    { price: 610, actual: 90, pred_025: 80, pred_050: 90, pred_975: 100 },
    { price: 620, actual: 75, pred_025: 65, pred_050: 75, pred_975: 85 },
    { price: 630, actual: 60, pred_025: 50, pred_050: 60, pred_975: 70 },
  ]

  const competitorPricesData = [
    { month: "Jan", hotel315: 580, hotel320: 590, hotel337: 600, hotel338: 610, hotel341: 620, hotel353: 630 },
    { month: "Fév", hotel315: 570, hotel320: 580, hotel337: 590, hotel338: 600, hotel341: 610, hotel353: 620 },
    { month: "Mar", hotel315: 590, hotel320: 600, hotel337: 610, hotel338: 620, hotel341: 630, hotel353: 640 },
    { month: "Avr", hotel315: 600, hotel320: 610, hotel337: 620, hotel338: 630, hotel341: 640, hotel353: 650 },
  ]

  const competitorBarData = [
    { hotel: "315", price: 350 },
    { hotel: "320", price: 580 },
    { hotel: "337", price: 400 },
    { hotel: "338", price: 590 },
    { hotel: "341", price: 420 },
    { hotel: "353", price: 600 },
  ]

  const suggestedPricesData = [
    { month: "Jan", price: 580 },
    { month: "Fév", price: 590 },
    { month: "Mar", price: 610 },
    { month: "Avr", price: 600 },
    { month: "Mai", price: 620 },
    { month: "Juin", price: 630 },
    { month: "Juil", price: 650 },
    { month: "Août", price: 640 },
    { month: "Sep", price: 610 },
    { month: "Oct", price: 590 },
    { month: "Nov", price: 580 },
    { month: "Déc", price: 600 },
  ]

  const revenueData = [
    { price: 580, revenue_975: 52000, revenue_50: 48000, revenue_025: 44000 },
    { price: 590, revenue_975: 54900, revenue_50: 50500, revenue_025: 46100 },
    { price: 600, revenue_975: 57200, revenue_50: 52800, revenue_025: 48400 },
    { price: 610, revenue_975: 58800, revenue_50: 54200, revenue_025: 49600 },
    { price: 620, revenue_975: 46500, revenue_50: 42900, revenue_025: 39300 },
    { price: 630, revenue_975: 37800, revenue_50: 34900, revenue_025: 32000 },
  ]

  const sidebarItems = [
    { id: "concurrents", label: "Concurrents", icon: Users },
    { id: "rate-stopper", label: "Rate Stopper", icon: TrendingUp },
    {
      id: "performance",
      label: "Performance par chambre",
      icon: Bed,
      subItems: [
        { id: "single", label: "Single" },
        { id: "double", label: "Double" },
        { id: "family", label: "Family" },
      ],
    },
    { id: "comparatif", label: "Comparatif produits", icon: BarChart3 },
    {
      id: "tarification",
      label: "Tarification dynamique",
      icon: DollarSign,
      subItems: [
        { id: "tarif-single", label: "Single" },
        { id: "tarif-double", label: "Double" },
        { id: "tarif-family", label: "Family" },
      ],
    },
    { id: "exports", label: "Exports Excel", icon: FileSpreadsheet },
    { id: "alertes", label: "Alertes & Notifications", icon: Bell },
    { id: "parametres", label: "Paramètres", icon: Settings },
    { id: "profile", label: "Profile", icon: User },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "concurrents":
        const competitors = [
          {
            name: "Laico Tunis Spa & Conference Center",
            threat: "Fort",
            rating: 4.5,
            location: "Centre-ville",
            price: "650 TND",
            occupancy: 85,
          },
          {
            name: "Hotel La Maison Blanche Tunis",
            threat: "Modéré",
            rating: 4.2,
            location: "Sidi Bou Said",
            price: "580 TND",
            occupancy: 72,
          },
          {
            name: "Hotel Le Consul Tunis",
            threat: "Faible",
            rating: 3.8,
            location: "Centre-ville",
            price: "420 TND",
            occupancy: 68,
          },
          {
            name: "Hotel Majestic Tunis",
            threat: "Fort",
            rating: 4.3,
            location: "Avenue Habib Bourguiba",
            price: "620 TND",
            occupancy: 78,
          },
          {
            name: "Marigold Hotel",
            threat: "Modéré",
            rating: 3.9,
            location: "La Marsa",
            price: "480 TND",
            occupancy: 65,
          },
          {
            name: "Novotel Tunis Mohamed V",
            threat: "Fort",
            rating: 4.6,
            location: "Centre-ville",
            price: "720 TND",
            occupancy: 88,
          },
          {
            name: "Royal Victoria Hotel Tunis",
            threat: "Modéré",
            rating: 4.1,
            location: "Centre-ville",
            price: "550 TND",
            occupancy: 70,
          },
          {
            name: "Tunisia Palace Hotel",
            threat: "Fort",
            rating: 4.4,
            location: "Gammarth",
            price: "680 TND",
            occupancy: 82,
          },
          {
            name: "Kyriad Prestige City Center Tunis",
            threat: "Modéré",
            rating: 4.0,
            location: "Centre-ville",
            price: "520 TND",
            occupancy: 75,
          },
          {
            name: "Hotel Tiba",
            threat: "Faible",
            rating: 3.6,
            location: "Centre-ville",
            price: "380 TND",
            occupancy: 60,
          },
          {
            name: "Hotel Royal ASBU Tunis",
            threat: "Modéré",
            rating: 3.7,
            location: "ASBU",
            price: "450 TND",
            occupancy: 63,
          },
          {
            name: "Sheraton Tunis Hotel",
            threat: "Fort",
            rating: 4.7,
            location: "Centre-ville",
            price: "750 TND",
            occupancy: 90,
          },
          {
            name: "Hotel Carlton",
            threat: "Faible",
            rating: 3.5,
            location: "Centre-ville",
            price: "350 TND",
            occupancy: 55,
          },
        ]

        const getThreatColor = (threat: string) => {
          switch (threat) {
            case "Fort":
              return "from-red-50 to-red-25 border-red-100 text-red-700"
            case "Modéré":
              return "from-orange-50 to-orange-25 border-orange-100 text-orange-700"
            case "Faible":
              return "from-green-50 to-green-25 border-green-100 text-green-700"
            default:
              return "from-gray-50 to-gray-25 border-gray-100 text-gray-700"
          }
        }

        const getThreatBadgeColor = (threat: string) => {
          switch (threat) {
            case "Fort":
              return "bg-red-400 text-white"
            case "Modéré":
              return "bg-orange-400 text-white"
            case "Faible":
              return "bg-green-400 text-white"
            default:
              return "bg-gray-400 text-white"
          }
        }

        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-violet-50/80 to-blue-50/80 backdrop-blur-sm p-6 rounded-2xl border border-violet-200/50 shadow-lg">
              <h2 className="text-2xl font-bold mb-2 text-black">Analyse Concurrentielle</h2>
              <p className="text-black">Surveillance et analyse des concurrents directs sur le marché tunisien</p>

              {/* Summary Stats */}
              <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="bg-white/70 p-4 rounded-xl border border-violet-200/50">
                  <div className="text-2xl font-bold text-red-400">
                    {competitors.filter((c) => c.threat === "Fort").length}
                  </div>
                  <div className="text-sm text-red-400">Concurrents Forts</div>
                </div>
                <div className="bg-white/70 p-4 rounded-xl border border-violet-200/50">
                  <div className="text-2xl font-bold text-orange-300">
                    {competitors.filter((c) => c.threat === "Modéré").length}
                  </div>
                  <div className="text-sm text-orange-400">Concurrents Modérés</div>
                </div>
                <div className="bg-white/70 p-4 rounded-xl border border-violet-200/50">
                  <div className="text-2xl font-bold text-green-500">
                    {competitors.filter((c) => c.threat === "Faible").length}
                  </div>
                  <div className="text-sm text-green-500">Concurrents Faibles</div>
                </div>
                <div className="bg-white/70 p-4 rounded-xl border border-violet-200/50">
                  <div className="text-2xl font-bold text-slate-500">
                    {Math.round(competitors.reduce((acc, c) => acc + c.occupancy, 0) / competitors.length)}%
                  </div>
                  <div className="text-sm text-slate-400">Taux d'occupation moyen</div>
                </div>
              </div>
            </div>

            {/* Competitors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {competitors.map((competitor, index) => (
                <Card
                  key={index}
                  className={`bg-gradient-to-br ${getThreatColor(competitor.threat)} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-sm font-semibold leading-tight mb-2">{competitor.name}</CardTitle>
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <span>📍 {competitor.location}</span>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getThreatBadgeColor(competitor.threat)}`}
                      >
                        {competitor.threat}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {/* Rating */}
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${i < Math.floor(competitor.rating) ? "text-yellow-500" : "text-gray-300"}`}
                            >
                              ⭐
                            </span>
                          ))}
                        </div>
                        <span className="text-sm font-medium">{competitor.rating}</span>
                      </div>

                      {/* Price */}
                      <div className="grid grid-cols-1 gap-3">
                        <div className="bg-white/50 p-2 rounded-lg">
                          <div className="text-xs text-gray-600">Prix moyen</div>
                          <div className="font-semibold text-sm">{competitor.price}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 pt-6">
              <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <TrendingUp className="mr-2 h-5 w-5" />
                Analyser les Tendances
              </Button>
              <Button
                variant="outline"
                className="border-violet-300 text-violet-700 hover:bg-violet-50 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
              >
                <FileSpreadsheet className="mr-2 h-5 w-5" />
                Exporter le Rapport
              </Button>
            </div>
          </div>
        )
      case "rate-stopper":
        // Hotel ID to name mapping based on the Excel data and competitor list
        const hotelMapping: { [key: string]: string } = {
          "355": "Laico Tunis Spa & Conference Center",
          "354": "Hotel La Maison Blanche Tunis",
          "326": "Hotel Le Consul Tunis",
          "356": "Hotel Majestic Tunis",
          "343": "Marigold Hotel",
          "345": "Novotel Tunis Mohamed V",
          "350": "Royal Victoria Hotel Tunis",
          "323": "Tunisia Palace Hotel",
          "328": "Kyriad Prestige City Center Tunis",
          "307": "Hotel Tiba",
          "317": "Hotel Royal ASBU Tunis",
          "353": "Sheraton Tunis Hotel",
          "312": "Hotel Carlton",
        }

        // Sample pricing data based on the Excel screenshot
        const rateShopper = [
          { hotelId: "355", prices: [601, 601, 670, 670, 670, 569, 569] },
          { hotelId: "354", prices: [314, 314, 314, 314, 314, 314, 314] },
          { hotelId: "326", prices: [194, 194, 194, 194, 194, 194, 194] },
          { hotelId: "356", prices: [167, 168, 168, 199, 168, 168, 167] },
          { hotelId: "343", prices: [430, 430, 430, 430, 430, 430, 430] },
          { hotelId: "345", prices: [539, 547, 547, 547, 553, 522, 547] },
          { hotelId: "350", prices: [267, 267, 271, 267, 267, 267, 267] },
          { hotelId: "323", prices: [267, 238, 238, 238, 238, 238, 238] },
          { hotelId: "328", prices: [311, 279, 279, 248, 248, 238, 238] },
          { hotelId: "307", prices: [317, 298.5, 280, 280, 280, 280, 280] },
          { hotelId: "317", prices: [292, 292, 253, 333, 281, 270, 260] },
          { hotelId: "353", prices: [251, 265, 270, 329, 251, 252, 247] },
          { hotelId: "312", prices: [243, 251, 233, 258, 233, 250, 230] },
        ]

        // Generate dates starting from today
        const today = new Date()
        const dates = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today)
          date.setDate(today.getDate() + i)
          return date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
          })
        })

        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-violet-50/80 to-blue-50/80 backdrop-blur-sm p-6 rounded-2xl border border-violet-200/50 shadow-lg">
              <h2 className="text-2xl font-bold mb-2 text-violet-800">Rate Shopper</h2>
              <p className="text-violet-600">Prix concurrents en temps réel pour optimiser votre stratégie tarifaire</p>

              {/* Summary Stats */}
              <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="bg-white/70 p-4 rounded-xl border border-violet-200/50">
                  <div className="text-2xl font-bold text-violet-600">{rateShopper.length}</div>
                  <div className="text-sm text-violet-500">Concurrents surveillés</div>
                </div>
                <div className="bg-white/70 p-4 rounded-xl border border-violet-200/50">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(rateShopper.reduce((acc, hotel) => acc + hotel.prices[0], 0) / rateShopper.length)} TND
                  </div>
                  <div className="text-sm text-blue-500">Prix moyen aujourd'hui</div>
                </div>
                <div className="bg-white/70 p-4 rounded-xl border border-violet-200/50">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.min(...rateShopper.map((h) => h.prices[0]))} TND
                  </div>
                  <div className="text-sm text-green-500">Prix minimum</div>
                </div>
                <div className="bg-white/70 p-4 rounded-xl border border-violet-200/50">
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.max(...rateShopper.map((h) => h.prices[0]))} TND
                  </div>
                  <div className="text-sm text-orange-500">Prix maximum</div>
                </div>
              </div>
            </div>

            {/* Rate Shopper Table */}
            <Card className="bg-white/60 backdrop-blur-sm border-violet-200/50 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-violet-800 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Tableau des Prix Concurrents
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-violet-200">
                        <th className="text-left py-3 px-4 font-semibold text-violet-800 bg-violet-50/50 rounded-tl-lg">
                          Hôtel
                        </th>
                        {dates.map((date, index) => (
                          <th
                            key={date}
                            className={`text-center py-3 px-3 font-semibold text-violet-800 bg-violet-50/50 min-w-[80px] ${
                              index === 0 ? "bg-violet-100/70" : ""
                            } ${index === dates.length - 1 ? "rounded-tr-lg" : ""}`}
                          >
                            <div className="text-xs text-violet-600">{date}</div>
                            <div className="text-xs text-violet-500 mt-1">
                              {index === 0 ? "Aujourd'hui" : `J+${index}`}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rateShopper.map((hotel, hotelIndex) => (
                        <tr
                          key={hotel.hotelId}
                          className={`border-b border-violet-100 hover:bg-violet-50/30 transition-colors duration-200 ${
                            hotelIndex % 2 === 0 ? "bg-white/40" : "bg-violet-25/20"
                          }`}
                        >
                          <td className="py-3 px-4 font-medium text-gray-800 max-w-[200px]">
                            <div className="truncate" title={hotelMapping[hotel.hotelId]}>
                              {hotelMapping[hotel.hotelId] || `Hôtel ${hotel.hotelId}`}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">ID: {hotel.hotelId}</div>
                          </td>
                          {hotel.prices.map((price, priceIndex) => (
                            <td
                              key={priceIndex}
                              className={`text-center py-3 px-3 ${
                                priceIndex === 0 ? "bg-violet-50/50 font-semibold" : ""
                              }`}
                            >
                              <div
                                className={`text-sm ${
                                  priceIndex === 0 ? "text-violet-800 font-bold" : "text-gray-700"
                                }`}
                              >
                                {price} TND
                              </div>
                              {priceIndex > 0 && (
                                <div
                                  className={`text-xs mt-1 ${
                                    price > hotel.prices[0]
                                      ? "text-red-500"
                                      : price < hotel.prices[0]
                                        ? "text-green-500"
                                        : "text-gray-400"
                                  }`}
                                >
                                  {price > hotel.prices[0] ? "↗" : price < hotel.prices[0] ? "↘" : "→"}
                                  {price !== hotel.prices[0] ? ` ${Math.abs(price - hotel.prices[0])}` : ""}
                                </div>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 pt-4">
              <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <TrendingUp className="mr-2 h-5 w-5" />
                Actualiser les Prix
              </Button>
              <Button
                variant="outline"
                className="border-violet-300 text-violet-700 hover:bg-violet-50 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
              >
                <FileSpreadsheet className="mr-2 h-5 w-5" />
                Exporter Rate Shopper
              </Button>
            </div>
          </div>
        )
      case "tarif-single":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-violet-50/80 to-blue-50/80 backdrop-blur-sm p-6 rounded-2xl border border-violet-200/50 shadow-lg">
              <h2 className="text-2xl font-bold text-violet-800 mb-6">Tarification Dynamique - Chambre Single</h2>

              {/* Filters Row */}
              <div className="grid grid-cols-3 gap-6">
                {/* Day Calendar */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-violet-700">Jour</Label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white/70 border border-violet-200 rounded-lg hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>

                {/* Events - Only promotion and sans promotion */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-violet-700">Événements</Label>
                  <Select value={selectedEvents[0] || ""} onValueChange={(value) => setSelectedEvents([value])}>
                    <SelectTrigger className="bg-white/70 border-violet-200 hover:border-violet-300 transition-colors">
                      <SelectValue placeholder="Sélectionner un événement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promotion">Promotion</SelectItem>
                      <SelectItem value="sans_promotion">Sans promotion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Booking Lead */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-violet-700">Délai de réservation (jours)</Label>
                  <Select value={bookingLead} onValueChange={setBookingLead}>
                    <SelectTrigger className="bg-white/70 border-violet-200 hover:border-violet-300 transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 19 }, (_, i) => i * 5).map((days) => (
                        <SelectItem key={days} value={days.toString()}>
                          {days} jours
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Card className="bg-gradient-to-br from-violet-100/80 to-violet-50/60 border-violet-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-violet-600">Prix Optimal (0.975 Quantile)</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xl font-bold text-violet-800">1,635 TND</div>
                  <p className="text-xs text-violet-500 mt-1">Revenu prédit par quantile</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-100/80 to-blue-50/60 border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-blue-600">Prix Optimal (0.5 Quantile)</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xl font-bold text-blue-800">1,705 TND</div>
                  <p className="text-xs text-blue-500 mt-1">Prix recommandé</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-teal-100/80 to-teal-50/60 border-teal-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-teal-600">Prix Optimal (0.025 Quantile)</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xl font-bold text-teal-800">1,548 TND</div>
                  <p className="text-xs text-teal-500 mt-1">Prix conservateur</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Price vs Reservations */}
              <Card className="bg-white/60 backdrop-blur-sm border-violet-200/50 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-violet-800">Prix vs Réservations</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ResponsiveContainer width="100%" height={150}>
                    <ComposedChart data={priceVsReservationsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#c4b5fd" opacity={0.3} />
                      <XAxis
                        dataKey="price"
                        stroke="#7c3aed"
                        fontSize={10}
                        label={{
                          value: "Prix (TND)",
                          position: "insideBottom",
                          offset: -5,
                          style: { textAnchor: "middle", fontSize: "10px" },
                        }}
                      />
                      <YAxis
                        stroke="#7c3aed"
                        fontSize={10}
                        label={{
                          value: "Réservations",
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle", fontSize: "10px" },
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "1px solid #c4b5fd",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Bar dataKey="actual" fill="#a78bfa" opacity={0.8} radius={[2, 2, 0, 0]} />
                      <Line type="monotone" dataKey="pred_025" stroke="#06b6d4" strokeWidth={2} />
                      <Line type="monotone" dataKey="pred_050" stroke="#8b5cf6" strokeWidth={2} />
                      <Line type="monotone" dataKey="pred_975" stroke="#f59e0b" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Revenue Chart - 3 curves with same pattern */}
              <Card className="bg-white/60 backdrop-blur-sm border-blue-200/50 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-blue-800">Revenu Prédit par Quantile</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ResponsiveContainer width="100%" height={150}>
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#93c5fd" opacity={0.3} />
                      <XAxis
                        dataKey="price"
                        stroke="#1d4ed8"
                        fontSize={10}
                        label={{
                          value: "Prix (TND)",
                          position: "insideBottom",
                          offset: -5,
                          style: { textAnchor: "middle", fontSize: "10px" },
                        }}
                      />
                      <YAxis
                        stroke="#1d4ed8"
                        fontSize={10}
                        label={{
                          value: "Revenu (TND)",
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle", fontSize: "10px" },
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "1px solid #93c5fd",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Area type="monotone" dataKey="revenue_975" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="revenue_50" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.2} />
                      <Area type="monotone" dataKey="revenue_025" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Competitor Prices Line Chart */}
              <Card className="bg-white/60 backdrop-blur-sm border-purple-200/50 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-purple-800">
                    Prix Concurrents vs Prix Optimal
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={competitorPricesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d8b4fe" opacity={0.3} />
                      <XAxis
                        dataKey="month"
                        stroke="#7c3aed"
                        fontSize={10}
                        label={{
                          value: "Mois",
                          position: "insideBottom",
                          offset: -5,
                          style: { textAnchor: "middle", fontSize: "10px" },
                        }}
                      />
                      <YAxis
                        stroke="#7c3aed"
                        fontSize={10}
                        label={{
                          value: "Prix (TND)",
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle", fontSize: "10px" },
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "1px solid #d8b4fe",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Line type="monotone" dataKey="hotel315" stroke="#a78bfa" strokeWidth={2} />
                      <Line type="monotone" dataKey="hotel320" stroke="#a78bfa" strokeWidth={2} />
                      <Line type="monotone" dataKey="hotel337" stroke="#a78bfa" strokeWidth={2} />
                      <Line type="monotone" dataKey="hotel338" stroke="#a78bfa" strokeWidth={2} />
                      <Line type="monotone" dataKey="hotel341" stroke="#f59e0b" strokeWidth={3} />
                      <Line type="monotone" dataKey="hotel353" stroke="#a78bfa" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Competitor Bar Chart */}
              <Card className="bg-white/60 backdrop-blur-sm border-teal-200/50 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-teal-800">Positionnement Prix Concurrents</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={competitorBarData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#5eead4" opacity={0.3} />
                      <XAxis
                        dataKey="hotel"
                        stroke="#0d9488"
                        fontSize={10}
                        label={{
                          value: "Hôtel ID",
                          position: "insideBottom",
                          offset: -5,
                          style: { textAnchor: "middle", fontSize: "10px" },
                        }}
                      />
                      <YAxis
                        stroke="#0d9488"
                        fontSize={10}
                        label={{
                          value: "Prix (TND)",
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle", fontSize: "10px" },
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "1px solid #5eead4",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                        {competitorBarData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.hotel === "341" ? "#7c3aed" : "#a78bfa"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-violet-50/80 to-blue-50/80 backdrop-blur-sm border-violet-200/50 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-violet-800">
                  Prix Suggérés Finaux (Aujourd'hui)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart
                    data={suggestedPricesData.map((item) => ({ ...item, price: Math.round(item.price * 2.57) }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#c4b5fd" opacity={0.3} />
                    <XAxis
                      dataKey="month"
                      stroke="#7c3aed"
                      fontSize={10}
                      label={{
                        value: "Mois",
                        position: "insideBottom",
                        offset: -5,
                        style: { textAnchor: "middle", fontSize: "10px" },
                      }}
                    />
                    <YAxis
                      stroke="#7c3aed"
                      fontSize={10}
                      label={{
                        value: "Prix (TND)",
                        angle: -90,
                        position: "insideLeft",
                        style: { textAnchor: "middle", fontSize: "10px" },
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "1px solid #c4b5fd",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                      formatter={(value) => [`${value} TND`, "Prix Suggéré"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#a78bfa"
                      strokeWidth={3}
                      dot={{ fill: "#a78bfa", strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, stroke: "#a78bfa", strokeWidth: 2, fill: "#fff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="flex justify-center pt-4">
              <Button
                className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  // Export logic would go here
                  console.log("[v0] Exporting final suggested prices to Excel...")
                }}
              >
                <FileSpreadsheet className="mr-2 h-5 w-5" />
                Exporter les Prix Suggérés (Excel)
              </Button>
            </div>
          </div>
        )
      case "profile":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Profile Utilisateur</h2>
            <div className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm p-8 rounded-2xl border border-border/50 shadow-xl">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
                    <AvatarImage src="/professional-female-avatar.png" alt="Profile" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">AS</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Revenue Manager</h3>
                  <p className="text-muted-foreground text-lg">abdelkadersarra4@gmail.com</p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span>En ligne</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">
              {sidebarItems.find((item) => item.id === activeSection)?.label || "Tableau de Bord Revenue Management"}
            </h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <p className="text-foreground">
                Contenu de la section "{sidebarItems.find((item) => item.id === activeSection)?.label || "Dashboard"}"
                sera développé dans les prochaines étapes.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div
        className={`${
          sidebarOpen ? "w-72" : "w-16"
        } bg-gradient-to-b from-card/95 to-card/90 backdrop-blur-xl border-r border-border/50 transition-all duration-500 ease-in-out flex flex-col shadow-2xl`}
      >
        {/* Header */}
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img src="/images/ey-logo.png" alt="EY" className="h-10 w-auto" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="font-bold text-primary text-lg">Revenue</span>
                  <p className="text-xs text-muted-foreground">Management System</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-primary/10 rounded-xl transition-all duration-300"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <div key={item.id}>
              <Button
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start group hover:bg-primary/10 hover:scale-105 transition-all duration-300 rounded-xl ${
                  !sidebarOpen && "px-3"
                } ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/20 shadow-lg"
                    : ""
                }`}
                onClick={() => {
                  if (item.subItems) {
                    toggleExpanded(item.id)
                  } else {
                    setActiveSection(item.id)
                  }
                }}
              >
                <div
                  className={`p-2 rounded-lg ${activeSection === item.id ? "bg-primary/20" : "group-hover:bg-primary/10"} transition-all duration-300`}
                >
                  <item.icon className={`h-5 w-5 ${activeSection === item.id ? "text-primary" : ""}`} />
                </div>
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left font-medium ml-3">{item.label}</span>
                    {item.subItems &&
                      (expandedItems.includes(item.id) ? (
                        <ChevronDown className="h-4 w-4 transition-transform duration-300" />
                      ) : (
                        <ChevronRight className="h-4 w-4 transition-transform duration-300" />
                      ))}
                  </>
                )}
              </Button>

              {/* Sub-items */}
              {item.subItems && expandedItems.includes(item.id) && sidebarOpen && (
                <div className="ml-8 mt-2 space-y-1 animate-in slide-in-from-left-2 duration-300">
                  {item.subItems.map((subItem) => (
                    <Button
                      key={subItem.id}
                      variant={activeSection === subItem.id ? "secondary" : "ghost"}
                      className={`w-full justify-start text-sm hover:bg-primary/5 rounded-lg transition-all duration-300 ${
                        activeSection === subItem.id
                          ? "bg-primary/10 border-l-2 border-primary text-primary"
                          : "hover:border-l-2 hover:border-primary/30"
                      }`}
                      onClick={() => setActiveSection(subItem.id)}
                    >
                      <div className="h-2 w-2 rounded-full bg-current opacity-60 mr-3"></div>
                      {subItem.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Profile section at bottom */}
        {sidebarOpen && (
          <div className="p-4 border-t border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-primary/10 transition-all duration-300 cursor-pointer group">
              <div className="relative">
                <Avatar className="h-10 w-10 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                  <AvatarImage src="/professional-female-avatar.png" alt="Profile" />
                  <AvatarFallback className="bg-primary text-primary-foreground">AS</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors duration-300">
                  Revenue Manager
                </p>
                <p className="text-xs text-muted-foreground truncate">abdelkadersarra4@gmail.com</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-8">{renderContent()}</div>
    </div>
  )
}
