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

export default function NuevaSimulacionPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    interestRate: '',
    maxLoanTerm: '',
    minDownPayment: '',
    maxLoanAmount: '',
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
    router.push('/admin/simulaciones')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Nombre de la Simulación</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="type">Tipo de Financiamiento</Label>
        <Select onValueChange={handleSelectChange('type')}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hipotecario">Crédito hipotecario</SelectItem>
            <SelectItem value="casaPropia">Crédito Casa Propia</SelectItem>
            <SelectItem value="procrearII">Crédito Procrear II</SelectItem>
            <SelectItem value="programasProvincialesMunicipales">Programas para provincias, municipios y organizaciones</SelectItem>
            <SelectItem value="privado">Financiamiento Privado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="interestRate">Tasa de Interés Anual (%)</Label>
        <Input id="interestRate" name="interestRate" type="number" step="0.01" value={formData.interestRate} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="maxLoanTerm">Plazo Máximo del Préstamo (años)</Label>
        <Input id="maxLoanTerm" name="maxLoanTerm" type="number" value={formData.maxLoanTerm} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="minDownPayment">Pago Inicial Mínimo (%)</Label>
        <Input id="minDownPayment" name="minDownPayment" type="number" step="0.01" value={formData.minDownPayment} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="maxLoanAmount">Monto Máximo del Préstamo</Label>
        <Input id="maxLoanAmount" name="maxLoanAmount" type="number" value={formData.maxLoanAmount} onChange={handleInputChange} required />
      </div>

      <Button type="submit">Crear Opción de Simulación</Button>
    </form>
  )
}

