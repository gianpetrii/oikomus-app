import { Bike, Building2, GraduationCap, MapPin, TreesIcon as Tree, Hospital, Bus, Info } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Export generateStaticParams for static site generation
export function generateStaticParams() {
  // Add all neighborhood parameters that should be pre-rendered
  // For demo purposes, we'll return some example values
  return [
    { provincia: 'buenos-aires', ciudad: 'capital-federal', barrio: 'palermo' },
    { provincia: 'buenos-aires', ciudad: 'capital-federal', barrio: 'belgrano' },
    { provincia: 'buenos-aires', ciudad: 'capital-federal', barrio: 'recoleta' }
  ]
}

interface NeighborhoodPageProps {
  params: {
    provincia: string
    ciudad: string
    barrio: string
  }
}

// This is a static page that gets pre-rendered at build time
export default function NeighborhoodPage({ params }: NeighborhoodPageProps) {
  // Mock data - en una aplicación real vendría de una API
  const neighborhoodData = {
    name: 'Palermo',
    description: 'Se posicionó como el barrio "estrella" de la ciudad por su exponencial crecimiento en las últimas décadas con propuestas inmobiliarias, gastronómicas, de moda, diseño y arte, junto con los espacios verdes más atractivos.',
    about: 'Es el barrio de mayor extensión dentro de la ciudad y se lo divide informalmente en sub-barrios: Palermo Hollywood -un polo de productoras audiovisuales-, Palermo Soho -con una enorme oferta gastronómica- o Palermo Chico -más residencial-. Gran parte de su superficie está ocupada por los bosques de Palermo con el Rosedal y el Planetario. Destaca también el Jardín Botánico, diseñado por el paisajista Carlos Thays.',
    stats: {
      rental: {
        gross: '4,09%',
        monthly: '-4,31%',
        annual: '28,42%'
      },
      pricePerM2: 'US$ 3.209',
      infrastructure: {
        bikeLanes: 29,
        culturalSpaces: 313,
        greenSpaces: 15,
        hospitals: 5,
        educationCenters: 87,
        publicTransport: 42
      },
      population: 225970,
      density: 12500,
      averageAge: 35
    },
    lastUpdate: '05-12-2024',
    propertyListings: {
      sale: {
        apartments: { count: 358, monthlyVariation: 2.5, sixMonthVariation: 8.7 },
        houses: { count: 127, monthlyVariation: -1.2, sixMonthVariation: 5.3 }
      },
      rent: {
        apartments: { count: 245, monthlyVariation: 3.8, sixMonthVariation: 12.1 },
        houses: { count: 89, monthlyVariation: 0.9, sixMonthVariation: 4.2 }
      }
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{neighborhoodData.name}</h1>
          <p className="text-xl text-gray-600 mb-8">{neighborhoodData.description}</p>

          {/* Static pre-rendered tabs with default content */}
          <div className="mb-8">
            <div className="border-b">
              <div className="flex">
                <div className="px-4 py-2 text-sm font-medium text-primary border-b-2 border-primary">
                  Sobre el barrio
                </div>
                <div className="px-4 py-2 text-sm font-medium text-gray-500">
                  Mapa
                </div>
                <div className="px-4 py-2 text-sm font-medium text-gray-500">
                  Estadísticas
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <img
                    src="/placeholder.svg?height=300&width=800"
                    alt={neighborhoodData.name}
                    className="w-full h-[300px] object-cover rounded-lg mb-6"
                  />
                  <p className="text-gray-600">{neighborhoodData.about}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Static stats display */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Infrastructure stats cards */}
            <TooltipProvider>
              <Card>
                <CardContent className="p-4 flex flex-col items-center gap-3">
                  <Bike className="h-8 w-8 text-primary" />
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Ciclovías</p>
                    <p className="text-xl font-bold">{neighborhoodData.stats.infrastructure.bikeLanes}</p>
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Kilómetros de ciclovías en el barrio</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>

              <Card><CardContent className="p-4 flex flex-col items-center gap-3">
                  <Building2 className="h-8 w-8 text-primary" />
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Espacios culturales</p>
                    <p className="text-xl font-bold">{neighborhoodData.stats.infrastructure.culturalSpaces}</p>
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Número de espacios culturales en el barrio</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex flex-col items-center gap-3">
                  <Tree className="h-8 w-8 text-primary" />
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Espacios verdes</p>
                    <p className="text-xl font-bold">{neighborhoodData.stats.infrastructure.greenSpaces}</p>
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Número de parques y plazas en el barrio</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex flex-col items-center gap-3">
                  <Hospital className="h-8 w-8 text-primary" />
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Hospitales</p>
                    <p className="text-xl font-bold">{neighborhoodData.stats.infrastructure.hospitals}</p>
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Número de hospitales y centros de salud en el barrio</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex flex-col items-center gap-3">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Centros educativos</p>
                    <p className="text-xl font-bold">{neighborhoodData.stats.infrastructure.educationCenters}</p>
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Número de escuelas, colegios y universidades en el barrio</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex flex-col items-center gap-3">
                  <Bus className="h-8 w-8 text-primary" />
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Transportes públicos</p>
                    <p className="text-xl font-bold">{neighborhoodData.stats.infrastructure.publicTransport}</p>
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Número de líneas de transporte público que sirven al barrio</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>
            </TooltipProvider>
          </div>
        </div>

        <div>
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Propiedades en {neighborhoodData.name}</h3>
              <div className="space-y-4">
                <div className="w-full p-3 rounded-lg border">
                  <p className="font-medium">Departamentos en venta</p>
                  <p className="text-sm text-gray-500">{neighborhoodData.propertyListings.sale.apartments.count} propiedades</p>
                  <div className="flex justify-between text-xs mt-2">
                    <span className="text-blue-500">
                      {neighborhoodData.propertyListings.sale.apartments.monthlyVariation > 0 ? '+' : ''}
                      {neighborhoodData.propertyListings.sale.apartments.monthlyVariation}% último mes
                    </span>
                    <span className="text-green-500">
                      {neighborhoodData.propertyListings.sale.apartments.sixMonthVariation > 0 ? '+' : ''}
                      {neighborhoodData.propertyListings.sale.apartments.sixMonthVariation}% últimos 6 meses
                    </span>
                  </div>
                </div>
                <div className="w-full p-3 rounded-lg border">
                  <p className="font-medium">Departamentos en alquiler</p>
                  <p className="text-sm text-gray-500">{neighborhoodData.propertyListings.rent.apartments.count} propiedades</p>
                  <div className="flex justify-between text-xs mt-2">
                    <span className="text-blue-500">
                      {neighborhoodData.propertyListings.rent.apartments.monthlyVariation > 0 ? '+' : ''}
                      {neighborhoodData.propertyListings.rent.apartments.monthlyVariation}% último mes
                    </span>
                    <span className="text-green-500">
                      {neighborhoodData.propertyListings.rent.apartments.sixMonthVariation > 0 ? '+' : ''}
                      {neighborhoodData.propertyListings.rent.apartments.sixMonthVariation}% últimos 6 meses
                    </span>
                  </div>
                </div>
                <div className="w-full p-3 rounded-lg border">
                  <p className="font-medium">Casas en venta</p>
                  <p className="text-sm text-gray-500">{neighborhoodData.propertyListings.sale.houses.count} propiedades</p>
                  <div className="flex justify-between text-xs mt-2">
                    <span className="text-blue-500">
                      {neighborhoodData.propertyListings.sale.houses.monthlyVariation > 0 ? '+' : ''}
                      {neighborhoodData.propertyListings.sale.houses.monthlyVariation}% último mes
                    </span>
                    <span className="text-green-500">
                      {neighborhoodData.propertyListings.sale.houses.sixMonthVariation > 0 ? '+' : ''}
                      {neighborhoodData.propertyListings.sale.houses.sixMonthVariation}% últimos 6 meses
                    </span>
                  </div>
                </div>
                <div className="w-full p-3 rounded-lg border">
                  <p className="font-medium">Casas en alquiler</p>
                  <p className="text-sm text-gray-500">{neighborhoodData.propertyListings.rent.houses.count} propiedades</p>
                  <div className="flex justify-between text-xs mt-2">
                    <span className="text-blue-500">
                      {neighborhoodData.propertyListings.rent.houses.monthlyVariation > 0 ? '+' : ''}
                      {neighborhoodData.propertyListings.rent.houses.monthlyVariation}% último mes
                    </span>
                    <span className="text-green-500">
                      {neighborhoodData.propertyListings.rent.houses.sixMonthVariation > 0 ? '+' : ''}
                      {neighborhoodData.propertyListings.rent.houses.sixMonthVariation}% últimos 6 meses
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

