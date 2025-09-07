"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { BarChart3, TrendingUp, DollarSign, Calendar } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const success = await login(email, password)

    if (success) {
      toast({
        title: "Connexion réussie",
        description: "Redirection vers le tableau de bord...",
      })
      router.push("/parametres")
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Content */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16">
        <div className="max-w-lg">
          {/* Logo and title */}
          <div className="flex items-center mb-8">
            <Image src="/ey-logo-new.png" alt="EY Logo" width={60} height={60} className="mr-4" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Revenue Management System</h1>
              <p className="text-sm text-gray-600">Optimisation intelligente des tarifs hôteliers</p>
            </div>
          </div>

          {/* Main heading */}
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Maximisez vos revenus hôteliers avec l'IA
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Notre système de Revenue Management utilise des techniques de Machine Learning avancées pour optimiser
            automatiquement vos tarifs en fonction de la demande et maximiser votre rentabilité.
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <BarChart3 className="w-8 h-8 text-gray-700 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Analyse Prédictive</h3>
              <p className="text-sm text-gray-600">Prévisions précises</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <TrendingUp className="w-8 h-8 text-gray-700 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Optimisation Prix</h3>
              <p className="text-sm text-gray-600">Tarifs dynamiques</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <DollarSign className="w-8 h-8 text-gray-700 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">ROI Maximisé</h3>
              <p className="text-sm text-gray-600">Revenus optimisés</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <Calendar className="w-8 h-8 text-gray-700 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Temps Réel</h3>
              <p className="text-sm text-gray-600">Ajustements instantanés</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex space-x-8 mb-8">
            <div>
              <div className="text-3xl font-bold text-gray-900">+25%</div>
              <div className="text-sm text-gray-600">Revenus moyens</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Précision prédictions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Monitoring automatique</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full max-w-md bg-white flex flex-col justify-center px-8 shadow-xl">
        <div className="w-full max-w-sm mx-auto">
          <Card className="border-0 shadow-none">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">Connexion </CardTitle>
              <CardDescription className="text-gray-600">
                Accédez à votre tableau de bord de gestion des revenus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@ey.com"
                    required
                    className="h-12 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-900 font-medium">
                    Mot de passe
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    required
                    className="h-12 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-semibold transition-colors duration-200 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Connexion...</span>
                    </div>
                  ) : (
                    "Se connecter"
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500">Développé dans le cadre du stage EY</p>
                <p className="text-xs text-gray-500 mt-1">Système de Revenue Management Hôtelier</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
