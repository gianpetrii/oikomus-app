'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function NuevoBarrioPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    province: '',
    city: '',
    description: '',
    population: '',
    area: '',
    averagePrice: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos al backend
    console.log(formData)
    router.push('/admin/barrios')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Nombre del Barrio</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="province">Provincia</Label>
        <Select onValueChange={handleSelectChange('province')}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buenosaires">Buenos Aires</SelectItem>
            <SelectItem value="cordoba">Córdoba</SelectItem>
            <SelectItem value="santafe">Santa Fe</SelectItem>
            {/* Agregar más provincias según sea necesario */}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="city">Ciudad</Label>
        <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="population">Población</Label>
        <Input id="population" name="population" type="number" value={formData.population} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="area">Área (km²)</Label>
        <Input id="area" name="area" type="number" value={formData.area} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="averagePrice">Precio Promedio (USD/m²)</Label>
        <Input id="averagePrice" name="averagePrice" type="number" value={formData.averagePrice} onChange={handleInputChange} required />
      </div>

      <Button type="submit">Crear Barrio</Button>
    </form>
  )
}

