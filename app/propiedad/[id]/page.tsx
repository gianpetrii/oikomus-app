import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Square, MapPin, Building2, Calendar, PocketIcon as Pool, Wifi, Car, Flag, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PropertyCard from '@/components/PropertyCard'
import DevelopmentAvailability from '@/components/DevelopmentAvailability'
import PropertyChat from '@/components/PropertyChat'

// Export generateStaticParams to generate all needed paths at build time
export function generateStaticParams() {
  // Add all property IDs that should be pre-rendered at build time
  // For demo purposes, we'll return some example IDs
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ]
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  // Mock data - in a real app, this would come from an API
  const property = {
    id: params.id,
    title: 'Casa Urbana Zapata',
    price: 716000,
    location: 'Zapata 251, Coghlan, Capital Federal',
    description: `Casa Urbana Zapata en Coghlan
    
    Este proyecto de diseño exclusivo, ubicado en el límite entre los barrios de Núñez y Coghlan, a tan solo cuatro cuadras de Belgrano, ofrece una propuesta de confort que combina calidad de vida, tranquilidad y acceso inmediato a servicios y conectividad urbana.

    Desarrollado por Sami Desarrollos, este proyecto cuenta con estudios de arquitectura reconocidos por su trayectoria y premios en concursos nacionales e internacionales.`,
    images: Array(6).fill('/placeholder.svg?height=600&width=800'),
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    covered_area: 200,
    total_units: 8,
    available_units: 4,
    amenities: [
      { name: 'Piscina', icon: Pool },
      { name: 'Wi-Fi', icon: Wifi },
      { name: 'Cochera', icon: Car },
      { name: 'Terraza', icon: Flag }
    ],
    units: [
      {
        id: 1,
        name: 'Unidad 1',
        price: 716000,
        area: 250,
        floorplan: '/placeholder.svg?height=400&width=300',
        status: 'available'
      },
      {
        id: 2,
        name: 'Unidad 2',
        price: 745000,
        area: 260,
        floorplan: '/placeholder.svg?height=400&width=300',
        status: 'available'
      }
    ],
    developer: {
      name: 'LAROCCA PROPIEDADES',
      logo: '/placeholder.svg?height=50&width=150',
      code: 'Cód. del anunciante: 185/26987'
    },
    isDevelopment: true,
    developmentData: {
      totalUnits: 20,
      availableUnits: 8,
      floors: 5,
      unitsPerFloor: 4,
      unitStatus: [
        { id: 1, status: 'available', isFinished: true },
        { id: 2, status: 'sold', isFinished: true },
        { id: 3, status: 'reserved', isFinished: false },
        { id: 4, status: 'available', isFinished: false },
        // ... more units ...
      ]
    }
  }

  const similarProperties = Array(5).fill({
    id: 1,
    title: 'Departamento similar',
    price: 745000,
    location: 'Belgrano, Buenos Aires',
    image: '/placeholder.svg?height=200&width=300',
    bedrooms: 3,
    bathrooms: 2,
    area: 180
  }).map((item, index) => ({
    ...item,
    id: index + 1
  }))

  // Static pre-rendered version with default selected content
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Image Gallery - showing first image */}
      <div className="grid grid-cols-4 gap-2 h-[600px] bg-white">
        <div className="col-span-2 row-span-2 relative">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>
        {property.images.slice(1, 5).map((image, index) => (
          <div key={`image-${index + 1}`} className="relative">
            <Image
              src={image}
              alt={`${property.title} - ${index + 2}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Basic Info */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={property.developer.logo}
                  alt={property.developer.name}
                  className="h-8"
                />
                <span className="text-sm text-gray-600">{property.developer.code}</span>
              </div>

              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <p className="text-2xl font-bold text-primary mb-4">
                USD {property.price.toLocaleString()}
              </p>
              <p className="flex items-center text-gray-600 mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                {property.location}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Dormitorios</p>
                    <p className="font-semibold">{property.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Baños</p>
                    <p className="font-semibold">{property.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-semibold">{property.area} m²</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Cubierta</p>
                    <p className="font-semibold">{property.covered_area} m²</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="units" className="bg-white rounded-lg p-6 mb-8">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="units">Unidades disponibles</TabsTrigger>
                <TabsTrigger value="description">Descripción</TabsTrigger>
                {property.isDevelopment && (
                  <TabsTrigger value="availability">Disponibilidad</TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="units">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {property.units.map((unit, index) => (
                    <Card 
                      key={unit.id}
                      className={`cursor-pointer`}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold">{unit.name}</h3>
                            <p className="text-sm text-gray-600">{unit.area} m²</p>
                          </div>
                          <p className="font-bold">USD {unit.price.toLocaleString()}</p>
                        </div>
                        <img
                          src={unit.floorplan}
                          alt={`Plano ${unit.name}`}
                          className="w-full h-48 object-contain"
                        />
                        <Button className="w-full mt-4">Contactar</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="description">
                <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
              </TabsContent>

              {property.isDevelopment && (
                <TabsContent value="availability">
                  <DevelopmentAvailability data={property.developmentData} />
                </TabsContent>
              )}
            </Tabs>

            {/* Amenities */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Comodidades del emprendimiento</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.amenities.map((amenity, index) => {
                  const Icon = amenity.icon
                  return (
                    <div key={`amenity-${index}`} className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-gray-400" />
                      <span>{amenity.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Ubicación del emprendimiento</h2>
              <p className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5" />
                {property.location}
              </p>
              <div className="h-[300px] bg-gray-100 rounded-lg">
                {/* Map would go here */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Mapa
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Preguntas al anunciante</h2>
              <div className="flex gap-2">
                <Input
                  placeholder="Escribí tu pregunta para el anunciante"
                  className="flex-1"
                />
                <Button>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Report */}
            <div className="bg-gray-100 rounded-lg p-6 mb-8">
              <h3 className="font-bold mb-4">¿Tenés algún problema con este aviso?</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">La unidad ya no está disponible</Button>
                <Button variant="outline" size="sm">El precio no es real</Button>
                <Button variant="outline" size="sm">Otros motivos</Button>
              </div>
            </div>
          </div>

          <div>
            {/* Contact Form */}
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">
                  Contactate con {property.developer.name} por {property.title}
                </h3>
                <form className="space-y-4">
                  <Input type="email" placeholder="Email" />
                  <Input type="text" placeholder="Nombre" />
                  <Input type="tel" placeholder="Teléfono" />
                  <Button className="w-full">Contactar</Button>
                  <PropertyChat />
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Propiedades similares</h2>
            <Button variant="link">Ver más</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {similarProperties.slice(0, 4).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
      <PropertyChat />
    </main>
  )
}

