'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { neighborhoodsData } from './mockData'

export default function NeighborhoodsPage() {
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProvinces = neighborhoodsData.provinces.filter(province => 
    province.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Explorar barrios</h1>
        <p className="text-gray-600">
          Conocé en detalle cada barrio: datos demográficos, servicios, 
          infraestructura y mercado inmobiliario.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Buscar provincia, ciudad o barrio"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedProvince} onValueChange={setSelectedProvince}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Provincia" />
          </SelectTrigger>
          <SelectContent>
            {neighborhoodsData.provinces.map(province => (
              <SelectItem key={province.name} value={province.name}>
                {province.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Ciudad" />
          </SelectTrigger>
          <SelectContent>
            {selectedProvince && 
              neighborhoodsData.provinces
                .find(p => p.name === selectedProvince)
                ?.cities.map(city => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))
            }
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-8">
        {filteredProvinces.map(province => (
          <div key={province.name}>
            <h2 className="text-2xl font-semibold mb-4">{province.name}</h2>
            <div className="space-y-6">
              {province.cities.map(city => (
                <div key={city.name}>
                  <h3 className="text-xl font-medium mb-3">{city.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {city.neighborhoods.map(neighborhood => (
                      <Link
                        key={neighborhood.name}
                        href={`/barrios/${province.name.toLowerCase()}/${city.name.toLowerCase()}/${neighborhood.name.toLowerCase()}`}
                        className="flex flex-col p-4 rounded-lg border hover:border-primary transition-colors"
                      >
                        <span className="text-lg font-medium mb-2">{neighborhood.name}</span>
                        <div className="h-40 bg-gray-200 rounded-lg mb-2">
                          {/* Aquí iría el mapa del barrio */}
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            Mapa de {neighborhood.name}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Ver detalles</span>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

