"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { REGIONS } from "@/lib/constants"

interface HotelSettings {
  nombre_etoiles: string
  location: string
  type: string
  nbre_rooms_single: string
  nbre_rooms_double: string
  nbre_rooms_family: string
  region_name: string
}

export default function ParametresPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<HotelSettings>({
    nombre_etoiles: "",
    location: "",
    type: "",
    nbre_rooms_single: "",
    nbre_rooms_double: "",
    nbre_rooms_family: "",
    region_name: "",
  })

  const handleSave = () => {
    // Mock save functionality
    toast({
      title: "Paramètres sauvegardés",
      description: "Les métadonnées de l'hôtel ont été mises à jour avec succès.",
    })
  }

  const handleReset = () => {
    setSettings({
      nombre_etoiles: "",
      location: "",
      type: "",
      nbre_rooms_single: "",
      nbre_rooms_double: "",
      nbre_rooms_family: "",
      region_name: "",
    })
    toast({
      title: "Paramètres réinitialisés",
      description: "Tous les champs ont été remis à zéro.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600">Configuration des métadonnées de l'hôtel</p>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Métadonnées Hôtel</CardTitle>
          <CardDescription>Configurez les informations de base de votre établissement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre d'étoiles */}
            <div className="space-y-2">
              <Label htmlFor="nombre_etoiles">Nombre d'étoiles</Label>
              <Select
                value={settings.nombre_etoiles}
                onValueChange={(value) => setSettings((prev) => ({ ...prev, nombre_etoiles: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le nombre d'étoiles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 étoiles</SelectItem>
                  <SelectItem value="4">4 étoiles</SelectItem>
                  <SelectItem value="5">5 étoiles</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Localisation</Label>
              <Select
                value={settings.location}
                onValueChange={(value) => setSettings((prev) => ({ ...prev, location: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la localisation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seaside">Bord de mer</SelectItem>
                  <SelectItem value="city">Ville</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Type d'hôtel</Label>
              <Select
                value={settings.type}
                onValueChange={(value) => setSettings((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resort">Resort</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Région */}
            <div className="space-y-2">
              <Label htmlFor="region_name">Région</Label>
              <Select
                value={settings.region_name}
                onValueChange={(value) => setSettings((prev) => ({ ...prev, region_name: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la région" />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Nombre de chambres */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Nombre de chambres par type</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nbre_rooms_single">Chambres Single</Label>
                <Input
                  id="nbre_rooms_single"
                  type="number"
                  placeholder="0"
                  value={settings.nbre_rooms_single}
                  onChange={(e) => setSettings((prev) => ({ ...prev, nbre_rooms_single: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nbre_rooms_double">Chambres Double</Label>
                <Input
                  id="nbre_rooms_double"
                  type="number"
                  placeholder="0"
                  value={settings.nbre_rooms_double}
                  onChange={(e) => setSettings((prev) => ({ ...prev, nbre_rooms_double: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nbre_rooms_family">Chambres Family</Label>
                <Input
                  id="nbre_rooms_family"
                  type="number"
                  placeholder="0"
                  value={settings.nbre_rooms_family}
                  onChange={(e) => setSettings((prev) => ({ ...prev, nbre_rooms_family: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              Enregistrer
            </Button>
            <Button onClick={handleReset} variant="outline">
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
