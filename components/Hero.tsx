'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Hero() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [propertyType, setPropertyType] = useState('terrenos-lotes')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchQuery)}&type=${propertyType}`)
  }

  return (
    <div className="relative h-[500px] flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1920')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
          Encontrá tu hogar financiado
        </h1>

        <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex gap-2">
          <Select 
            defaultValue="terrenos-lotes"
            onValueChange={setPropertyType}
          >
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Tipo de propiedad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casas">Casas</SelectItem>
              <SelectItem value="departamentos">Departamentos</SelectItem>
              <SelectItem value="ph">PH</SelectItem>
              <SelectItem value="quintas">Quintas</SelectItem>
              <SelectItem value="garages">Garages</SelectItem>
              <SelectItem value="oficinas-comerciales">Oficinas comerciales</SelectItem>
              <SelectItem value="locales-comerciales">Locales comerciales</SelectItem>
              <SelectItem value="bodegas-galpones">Bodegas / Galpones</SelectItem>
              <SelectItem value="depositos">Depósitos</SelectItem>
              <SelectItem value="campos">Campos</SelectItem>
              <SelectItem value="terrenos-lotes">Terrenos / Lotes</SelectItem>
              <SelectItem value="todos">Todos</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Ingresá ubicaciones o características (ej: pileta)"
              className="w-full bg-white pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <Button type="submit" size="lg" className="bg-orange-500 hover:bg-orange-600">
            Buscar
          </Button>
        </form>
      </div>
    </div>
  )
}

