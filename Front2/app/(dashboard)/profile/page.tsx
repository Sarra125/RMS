"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"
import { Settings, LogOut } from "lucide-react"

export default function ProfilePage() {
  const { user, logout } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Gérez votre profil utilisateur</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Informations du Profil</CardTitle>
            <CardDescription>Vos informations personnelles et paramètres de compte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/professional-woman-avatar.png" />
                <AvatarFallback className="text-2xl">{user?.email.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">{user?.email}</h3>
                <p className="text-sm text-gray-500">Administrateur</p>
              </div>
            </div>

            {/* User Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-md">{user?.email}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rôle</label>
                  <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-md">Administrateur</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Dernière connexion</label>
                <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-md">
                  {new Date().toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button disabled variant="outline" className="flex items-center space-x-2 bg-transparent">
                <Settings className="h-4 w-4" />
                <span>Modifier profil</span>
              </Button>
              <Button onClick={logout} variant="destructive" className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Se déconnecter</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Paramètres du Compte</CardTitle>
            <CardDescription>Configuration et préférences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Notifications par email</h4>
                  <p className="text-sm text-gray-600">Recevoir les alertes de prix et rapports</p>
                </div>
                <Button disabled variant="outline" size="sm">
                  Configurer
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Préférences d'affichage</h4>
                  <p className="text-sm text-gray-600">Thème, langue et format des données</p>
                </div>
                <Button disabled variant="outline" size="sm">
                  Modifier
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Sécurité</h4>
                  <p className="text-sm text-gray-600">Changer le mot de passe et authentification</p>
                </div>
                <Button disabled variant="outline" size="sm">
                  Gérer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
