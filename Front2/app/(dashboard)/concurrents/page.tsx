"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HOTELS } from "@/lib/constants"
import { Star, RefreshCw } from "lucide-react"

interface Competitor {
  name: string
  rating: "Fort" | "Moyen" | "Faible"
  stars: number
}

// Generate mock competitor data
const generateCompetitors = (): Competitor[] =>
  HOTELS.map((hotel) => ({
    name: hotel,
    rating: ["Fort", "Moyen", "Faible"][Math.floor(Math.random() * 3)] as "Fort" | "Moyen" | "Faible",
    stars: Math.floor(Math.random() * 3) + 3, // 3-5 stars
  }))

const getRatingColor = (rating: string) => {
  switch (rating) {
    case "Fort":
      return "bg-red-100 text-red-800 border-red-200"
    case "Moyen":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Faible":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function ConcurrentsPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    // Simulate loading and fresh data update
    const loadCompetitors = () => {
      setIsLoading(true)
      setTimeout(() => {
        setCompetitors(generateCompetitors())
        setLastUpdate(new Date())
        setIsLoading(false)
      }, 1500) // Simulate network delay
    }

    loadCompetitors()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Concurrents</h1>
          <p className="text-gray-600">Analyse de la force concurrentielle des hôtels</p>
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <RefreshCw className="h-6 w-6 animate-spin text-yellow-500" />
            <span className="text-lg text-gray-600">Mise à jour des données concurrentielles...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Concurrents</h1>
          <p className="text-gray-600">Analyse de la force concurrentielle des hôtels</p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Données mises à jour</span>
          </div>
          <p className="text-xs text-gray-500">{lastUpdate.toLocaleTimeString("fr-FR")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitors.map((competitor, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight">{competitor.name}</CardTitle>
                  <div className="flex items-center mt-2">
                    {Array.from({ length: competitor.stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">{competitor.stars} étoiles</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Force concurrentielle</span>
                <Badge variant="outline" className={getRatingColor(competitor.rating)}>
                  {competitor.rating}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistiques</CardTitle>
          <CardDescription>Répartition de la force concurrentielle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {competitors.filter((c) => c.rating === "Fort").length}
              </div>
              <div className="text-sm text-gray-600">Concurrence forte</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {competitors.filter((c) => c.rating === "Moyen").length}
              </div>
              <div className="text-sm text-gray-600">Concurrence moyenne</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {competitors.filter((c) => c.rating === "Faible").length}
              </div>
              <div className="text-sm text-gray-600">Concurrence faible</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
