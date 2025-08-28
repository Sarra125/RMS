"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, BarChart3, TrendingUp, DollarSign, Calendar } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate authentication
    if (email === "abdelkadersarra4@gmail.com" && password === "12345678") {
      // Successful login - redirect to dashboard
      window.location.href = "/dashboard"
    } else {
      setError("Email ou mot de passe incorrect")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center space-x-4 transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <div className="relative">
                <Image
                  src="/images/ey-logo.png"
                  alt="EY Logo"
                  width={60}
                  height={40}
                  className="object-contain transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/10 rounded-lg blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-semibold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                  Revenue Management System
                </h1>
                <p className="text-sm text-muted-foreground">Optimisation intelligente des tarifs hôteliers</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-120px)]">
          {/* Left side - Hero content */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-balance text-foreground bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent animate-gradient-x">
                Maximisez vos revenus hôteliers avec l'IA
              </h2>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Notre système de Revenue Management utilise des techniques de Machine Learning avancées pour optimiser
                automatiquement vos tarifs en fonction de la demande et maximiser votre rentabilité.
              </p>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: BarChart3, title: "Analyse Prédictive", desc: "Prévisions précises", delay: "delay-300" },
                { icon: TrendingUp, title: "Optimisation Prix", desc: "Tarifs dynamiques", delay: "delay-400" },
                { icon: DollarSign, title: "ROI Maximisé", desc: "Revenus optimisés", delay: "delay-500" },
                { icon: Calendar, title: "Temps Réel", desc: "Ajustements instantanés", delay: "delay-600" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`group flex items-center space-x-3 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 ${feature.delay} ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                >
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300 group-hover:scale-110 transform">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div
              className={`flex space-x-8 pt-6 border-t border-border/50 transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              {[
                { value: "+25%", label: "Revenus moyens" },
                { value: "95%", label: "Précision prédictions" },
                { value: "24/7", label: "Monitoring automatique" },
              ].map((stat, index) => (
                <div key={index} className="group cursor-default">
                  <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Login form */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-1000 delay-400 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
          >
            <Card className="w-full max-w-md bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Connexion Revenue Manager
                </CardTitle>
                <CardDescription className="text-center">
                  Accédez à votre tableau de bord de gestion des revenus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre.email@ey.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-primary/50"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-colors duration-200"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors duration-200" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors duration-200" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive" className="animate-in slide-in-from-top-2 duration-300">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                        <span>Connexion...</span>
                      </div>
                    ) : (
                      "Se connecter"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center space-y-1">
                  <p className="text-sm text-muted-foreground">Développé dans le cadre du stage EY</p>
                  <p className="text-xs text-muted-foreground">Système de Revenue Management Hôtelier</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`border-t border-border/50 bg-card/80 backdrop-blur-xl mt-12 relative z-10 transition-all duration-1000 delay-800 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/ey-logo.png"
                alt="EY Logo"
                width={40}
                height={26}
                className="object-contain hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm text-muted-foreground">© 2025 EY. Tous droits réservés.</p>
            </div>
            <div className="text-sm text-muted-foreground">Projet de fin d'études - Revenue Management System</div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  )
}
