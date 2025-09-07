"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HOTELS } from "@/lib/constants"
import { format, addDays } from "date-fns"
import { fr } from "date-fns/locale"

interface RateData {
  hotel: string
  prices: number[]
}

// Generate mock rate data for a full year
const generateRateData = (): RateData[] => {
  return HOTELS.slice(0, 10).map((hotel) => ({
    hotel,
    prices: Array.from(
      { length: 365 },
      () => Math.floor(Math.random() * 200) + 150 + 100, // Prices between 250-450 (+100 dinars)
    ),
  }))
}

export default function RateShopperPage() {
  const [rateData, setRateData] = useState<RateData[]>([])
  const currentDate = new Date("2025-07-07")

  useEffect(() => {
    setRateData(generateRateData())
  }, [])

  const dates = Array.from({ length: 365 }, (_, i) => addDays(currentDate, i))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Rate Shopper</h1>
        <p className="text-gray-600">Comparaison des prix des concurrents</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Prix des concurrents
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              TND
            </Badge>
          </CardTitle>
          <CardDescription>Tarifs du jour des concurrents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-900 sticky left-0 bg-white z-10">Hôtel</th>
                  {dates.slice(0, 30).map((date, index) => (
                    <th key={index} className="text-center p-3 font-medium text-gray-900 min-w-[80px]">
                      <div className="flex flex-col">
                        <span className="text-xs">
                          {index === 0 ? "Aujourd'hui" : format(date, "dd/MM", { locale: fr })}
                        </span>
                        <span className="text-xs text-gray-500">{format(date, "MMM", { locale: fr })}</span>
                      </div>
                    </th>
                  ))}
                  <th className="text-center p-3 font-medium text-gray-900">...</th>
                </tr>
              </thead>
              <tbody>
                {rateData.map((hotel, hotelIndex) => (
                  <tr key={hotelIndex} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900 max-w-[200px] sticky left-0 bg-white">
                      <div className="truncate" title={hotel.hotel}>
                        {hotel.hotel}
                      </div>
                    </td>
                    {hotel.prices.slice(0, 30).map((price, priceIndex) => (
                      <td key={priceIndex} className="text-center p-3">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                          {price}
                        </Badge>
                      </td>
                    ))}
                    <td className="text-center p-3">
                      <span className="text-xs text-gray-500">+335 jours</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Affichage des 30 premiers jours sur 365 jours disponibles.
              <span className="text-blue-600 cursor-pointer hover:underline ml-1">
                Faire défiler horizontalement pour voir plus →
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Prix moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(
                rateData.reduce((sum, hotel) => sum + hotel.prices.slice(0, 30).reduce((a, b) => a + b, 0) / 30, 0) /
                  rateData.length,
              )}{" "}
              TND
            </div>
            <p className="text-sm text-gray-600">Sur 30 jours affichés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Prix minimum</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.min(...rateData.flatMap((hotel) => hotel.prices.slice(0, 30)))} TND
            </div>
            <p className="text-sm text-gray-600">Le plus bas tarif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Prix maximum</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {Math.max(...rateData.flatMap((hotel) => hotel.prices.slice(0, 30)))} TND
            </div>
            <p className="text-sm text-gray-600">Le plus haut tarif</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
