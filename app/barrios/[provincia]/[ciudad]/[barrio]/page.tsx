'use client'

import { useState } from 'react'
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

interface NeighborhoodPageProps {
  params: {
    provincia: string
    ciudad: string
    barrio: string
  }
}

export default function NeighborhoodPage({ params }: NeighborhoodPageProps) {
  const [mapLayers, setMapLayers] = useState({
    ciclovias: false,
    subte: false,
    educacion: false
  })

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

          <Tabs defaultValue="about" className="mb-8">
            <TabsList>
              <TabsTrigger value="about">Sobre el barrio</TabsTrigger>
              <TabsTrigger value="map">Mapa</TabsTrigger>
              <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about">
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
            </TabsContent>

            <TabsContent value="map">
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-4 mb-4">
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={mapLayers.ciclovias}
                        onCheckedChange={(checked) => 
                          setMapLayers(prev => ({ ...prev, ciclovias: checked as boolean }))
                        }
                      />
                      <span>Ciclovías</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={mapLayers.subte}
                        onCheckedChange={(checked) => 
                          setMapLayers(prev => ({ ...prev, subte: checked as boolean }))
                        }
                      />
                      <span>Estaciones de Subte</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={mapLayers.educacion}
                        onCheckedChange={(checked) => 
                          setMapLayers(prev => ({ ...prev, educacion: checked as boolean }))
                        }
                      />
                      <span>Establecimientos Educativos</span>
                    </label>
                  </div>
                  <div className="h-[400px] bg-gray-100 rounded-lg">
                    {/* Aquí iría el mapa */}
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Mapa interactivo
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-bold mb-4 text-center">Rentabilidad del Alquiler</h3>
                    <div className="space-y-4 text-center">
                      <div>
                        <p className="text-sm text-gray-500">Retorno bruto</p>
                        <p className="text-2xl font-bold text-green-500">
                          {neighborhoodData.stats.rental.gross}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Mensual</p>
                        <p className="text-2xl font-bold text-red-500">
                          {neighborhoodData.stats.rental.monthly}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Anual</p>
                        <p className="text-2xl font-bold text-green-500">
                          {neighborhoodData.stats.rental.annual}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-bold mb-4 text-center">Valor del m²</h3>
                    <p className="text-3xl font-bold text-primary">
                      {neighborhoodData.stats.pricePerM2}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-bold mb-4 text-center">Demografía</h3>
                    <div className="space-y-4 text-center">
                      <div>
                        <p className="text-sm text-gray-500">Población</p>
                        <p className="text-2xl font-bold">{neighborhoodData.stats.population.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Densidad (hab/km²)</p>
                        <p className="text-2xl font-bold">{neighborhoodData.stats.density.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Edad promedio</p>
                        <p className="text-2xl font-bold">{neighborhoodData.stats.averageAge}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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

