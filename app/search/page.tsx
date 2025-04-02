'use client'

import { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import PropertyCard from '@/components/PropertyCard'

type CheckboxState = 'unchecked' | 'checked' | 'indeterminate'

export default function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  // Estados para los filtros
  const [operationType, setOperationType] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [areaRange, setAreaRange] = useState([0, 500])
  const [rooms, setRooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [parkingSpaces, setParkingSpaces] = useState('')
  const [ageRange, setAgeRange] = useState([0, 100])
  const [publicationDateRange, setPublicationDateRange] = useState([0, 365])
  const [amenities, setAmenities] = useState<Record<string, CheckboxState>>({})
  const [propertyCondition, setPropertyCondition] = useState('')
  const [floors, setFloors] = useState('')
  const [acceptsPets, setAcceptsPets] = useState<CheckboxState>('unchecked')
  const [hasElevator, setHasElevator] = useState<CheckboxState>('unchecked')

  // Mock results
  const results = Array(12).fill({
    id: 1,
    title: 'Departamento en Palermo',
    price: 150000,
    location: 'Palermo, Buenos Aires',
    image: '/placeholder.svg?height=200&width=300',
    bedrooms: 2,
    bathrooms: 1,
    area: 45
  }).map((item, index) => ({
    ...item,
    id: index + 1
  }))

  const amenitiesList = [
    'Piscina', 'Gimnasio', 'Seguridad 24hs', 'Balcón', 'Terraza', 'Parrilla', 'Laundry'
  ]

  const handleCheckboxChange = (name: string, currentState: CheckboxState) => {
    const nextState: Record<CheckboxState, CheckboxState> = {
      'unchecked': 'checked',
      'checked': 'indeterminate',
      'indeterminate': 'unchecked'
    }
    return nextState[currentState]
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar con filtros */}
        <aside className="md:w-64 shrink-0">
          <Card className="p-4 sticky top-4 space-y-6">
            <div>
              <Label>Tipo de Operación</Label>
              <Select onValueChange={setOperationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="venta">Venta</SelectItem>
                  <SelectItem value="alquiler">Alquiler</SelectItem>
                  <SelectItem value="alquiler_temporal">Alquiler Temporal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tipo de Propiedad</Label>
              <Select onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="departamento">Departamento</SelectItem>
                  <SelectItem value="ph">PH</SelectItem>
                  <SelectItem value="terreno">Terreno</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Ubicación</Label>
              <Input 
                type="text" 
                placeholder="Ingrese ubicación" 
                onChange={(e) => setLocation(e.target.value)} 
              />
            </div>

            <div>
              <Label>Precio</Label>
              <Slider
                min={0}
                max={1000000}
                step={1000}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>${priceRange[0].toLocaleString()}</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            <div>
              <Label>Superficie (m²)</Label>
              <Slider
                min={0}
                max={500}
                step={10}
                value={areaRange}
                onValueChange={setAreaRange}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{areaRange[0]} m²</span>
                <span>{areaRange[1]} m²</span>
              </div>
            </div>

            <div>
              <Label>Ambientes</Label>
              <Select onValueChange={setRooms}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, '6+'].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Baños</Label>
              <Select onValueChange={setBathrooms}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, '5+'].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Cocheras</Label>
              <Select onValueChange={setParkingSpaces}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, '4+'].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Antigüedad (años)</Label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={ageRange}
                onValueChange={setAgeRange}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{ageRange[0]} años</span>
                <span>{ageRange[1]} años</span>
              </div>
            </div>

            <div>
              <Label>Fecha de Publicación (días)</Label>
              <Slider
                min={0}
                max={365}
                step={1}
                value={publicationDateRange}
                onValueChange={setPublicationDateRange}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>Hace {publicationDateRange[0]} días</span>
                <span>Hace {publicationDateRange[1]} días</span>
              </div>
            </div>

            <div>
              <Label>Servicios y Comodidades</Label>
              <div className="space-y-2 mt-2">
                {amenitiesList.map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <Checkbox
                      id={amenity}
                      checked={amenities[amenity] === 'checked'}
                      onCheckedChange={() => {
                        setAmenities(prev => ({
                          ...prev,
                          [amenity]: handleCheckboxChange(amenity, prev[amenity] || 'unchecked')
                        }))
                      }}
                      data-state={amenities[amenity]}
                    />
                    <label
                      htmlFor={amenity}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Estado del Inmueble</Label>
              <Select onValueChange={setPropertyCondition}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nuevo">Nuevo</SelectItem>
                  <SelectItem value="usado">Usado</SelectItem>
                  <SelectItem value="a_estrenar">A estrenar</SelectItem>
                  <SelectItem value="en_construccion">En construcción</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Plantas</Label>
              <Select onValueChange={setFloors}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, '4+'].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptsPets"
                checked={acceptsPets === 'checked'}
                onCheckedChange={() => setAcceptsPets(prev => handleCheckboxChange('acceptsPets', prev))}
                data-state={acceptsPets}
              />
              <label
                htmlFor="acceptsPets"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Acepta Mascotas
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasElevator"
                checked={hasElevator === 'checked'}
                onCheckedChange={() => setHasElevator(prev => handleCheckboxChange('hasElevator', prev))}
                data-state={hasElevator}
              />
              <label
                htmlFor="hasElevator"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ascensor
              </label>
            </div>

            <Button className="w-full">Aplicar Filtros</Button>
          </Card>
        </aside>

        {/* Resultados */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

