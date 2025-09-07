import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Compass as Compare, TrendingUp, FileText } from "lucide-react"

export default function ComparatifProduitsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Comparatif Produits</h1>
        <p className="text-gray-600">Analyse comparative des produits hôteliers</p>
      </div>

      <Card className="border-dashed border-2 border-gray-300">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <Compare className="h-12 w-12" />
          </div>
          <CardTitle className="text-gray-600">Section en développement</CardTitle>
          <CardDescription>Cette section sera disponible dans une prochaine version du système</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-500">Les fonctionnalités de comparatif incluront :</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-center space-x-2 text-gray-600">
              <Compare className="h-4 w-4" />
              <span>Comparaison multi-produits</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <TrendingUp className="h-4 w-4" />
              <span>Analyse des performances relatives</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <BarChart3 className="h-4 w-4" />
              <span>Métriques de comparaison</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <FileText className="h-4 w-4" />
              <span>Rapports comparatifs</span>
            </div>
          </div>
          <Button disabled variant="outline" className="mt-4 bg-transparent">
            Fonctionnalité à venir
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
