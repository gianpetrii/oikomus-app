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
import { Checkbox } from "@/components/ui/checkbox"

export default function NuevaPropiedadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    operationType: '',
    propertyType: '',
    location: '',
    area: '',
    rooms: '',
    bathrooms: '',
    parkingSpaces: '',
    age: '',
    condition: '',
    floors: '',
    acceptsPets: false,
    hasElevator: false,
    amenities: [] as string[],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleAmenityChange = (amenity: string) => (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter(a => a !== amenity)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos al backend
    console.log(formData)
    router.push('/admin/propiedades')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="price">Precio</Label>
        <Input id="price" name="price" type="number" value={formData.price} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="operationType">Tipo de Operación</Label>
        <Select onValueChange={handleSelectChange('operationType')}>
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
        <Label htmlFor="propertyType">Tipo de Propiedad</Label>
        <Select onValueChange={handleSelectChange('propertyType')}>
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
        <Label htmlFor="location">Ubicación</Label>
        <Input id="location" name="location" value={formData.location} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="area">Superficie (m²)</Label>
        <Input id="area" name="area" type="number" value={formData.area} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="rooms">Ambientes</Label>
        <Input id="rooms" name="rooms" type="number" value={formData.rooms} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="bathrooms">Baños</Label>
        <Input id="bathrooms" name="bathrooms" type="number" value={formData.bathrooms} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="parkingSpaces">Cocheras</Label>
        <Input id="parkingSpaces" name="parkingSpaces" type="number" value={formData.parkingSpaces} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="age">Antigüedad</Label>
        <Input id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="condition">Estado</Label>
        <Select onValueChange={handleSelectChange('condition')}>
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
        <Label htmlFor="floors">Plantas</Label>
        <Input id="floors" name="floors" type="number" value={formData.floors} onChange={handleInputChange} required />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="acceptsPets"
          checked={formData.acceptsPets}
          onCheckedChange={handleCheckboxChange('acceptsPets')}
        />
        <Label htmlFor="acceptsPets">Acepta Mascotas</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="hasElevator"
          checked={formData.hasElevator}
          onCheckedChange={handleCheckboxChange('hasElevator')}
        />
        <Label htmlFor="hasElevator">Ascensor</Label>
      </div>

      <div>
        <Label>Amenities</Label>
        <div className="grid grid-cols-2 gap-2">
          {['Piscina', 'Gimnasio', 'Seguridad 24hs', 'Balcón', 'Terraza', 'Parrilla', 'Laundry'].map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={formData.amenities.includes(amenity)}
                onCheckedChange={handleAmenityChange(amenity)}
              />
              <Label htmlFor={amenity}>{amenity}</Label>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit">Crear Propiedad</Button>
    </form>
  )
}

