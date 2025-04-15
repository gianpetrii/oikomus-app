'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Datos de ejemplo para ciudades
const ciudadesEjemplo = [
  { id: '1', nombre: 'Buenos Aires', provincia: 'Buenos Aires', codigoPostal: '1000' },
  { id: '2', nombre: 'La Plata', provincia: 'Buenos Aires', codigoPostal: '1900' },
  { id: '3', nombre: 'Córdoba', provincia: 'Córdoba', codigoPostal: '5000' },
  { id: '4', nombre: 'Rosario', provincia: 'Santa Fe', codigoPostal: '2000' },
  { id: '5', nombre: 'Mendoza', provincia: 'Mendoza', codigoPostal: '5500' },
]

// Datos de ejemplo para provincias (para el selector)
const provinciasEjemplo = [
  { id: '1', nombre: 'Buenos Aires' },
  { id: '2', nombre: 'Córdoba' },
  { id: '3', nombre: 'Santa Fe' },
  { id: '4', nombre: 'Mendoza' },
  { id: '5', nombre: 'Tucumán' },
]

export default function CiudadesPage() {
  const [ciudades, setCiudades] = useState(ciudadesEjemplo)
  const [busqueda, setBusqueda] = useState('')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [ciudadActual, setCiudadActual] = useState({ id: '', nombre: '', provincia: '', codigoPostal: '' })

  // Filtrar ciudades por búsqueda
  const ciudadesFiltradas = ciudades.filter(
    (ciudad) =>
      ciudad.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      ciudad.provincia.toLowerCase().includes(busqueda.toLowerCase()) ||
      ciudad.codigoPostal.includes(busqueda)
  )

  // Función para abrir modal de nueva ciudad
  const abrirModalNueva = () => {
    setCiudadActual({ id: '', nombre: '', provincia: '', codigoPostal: '' })
    setModalAbierto(true)
  }

  // Función para abrir modal de edición
  const abrirModalEditar = (ciudad) => {
    setCiudadActual(ciudad)
    setModalAbierto(true)
  }

  // Función para eliminar ciudad (solo de muestra)
  const eliminarCiudad = (id) => {
    if (confirm('¿Está seguro que desea eliminar esta ciudad?')) {
      setCiudades(ciudades.filter((ciudad) => ciudad.id !== id))
    }
  }

  // Función para guardar ciudad (nueva o editada)
  const guardarCiudad = (e) => {
    e.preventDefault()
    
    if (ciudadActual.id) {
      // Editar existente
      setCiudades(
        ciudades.map((c) => (c.id === ciudadActual.id ? ciudadActual : c))
      )
    } else {
      // Crear nueva con ID generado
      const nuevaCiudad = {
        ...ciudadActual,
        id: Date.now().toString(),
      }
      setCiudades([...ciudades, nuevaCiudad])
    }
    
    setModalAbierto(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Ciudades</h1>
        <Button onClick={abrirModalNueva}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Ciudad
        </Button>
      </div>

      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="Buscar por nombre, provincia o código postal..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Provincia</TableHead>
              <TableHead>Código Postal</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ciudadesFiltradas.length > 0 ? (
              ciudadesFiltradas.map((ciudad) => (
                <TableRow key={ciudad.id}>
                  <TableCell className="font-medium">{ciudad.nombre}</TableCell>
                  <TableCell>{ciudad.provincia}</TableCell>
                  <TableCell>{ciudad.codigoPostal}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => abrirModalEditar(ciudad)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => eliminarCiudad(ciudad.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No se encontraron ciudades
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal para agregar/editar ciudad */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {ciudadActual.id ? 'Editar Ciudad' : 'Nueva Ciudad'}
            </h2>
            
            <form onSubmit={guardarCiudad} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="nombre" className="block font-medium">
                  Nombre
                </label>
                <Input
                  id="nombre"
                  value={ciudadActual.nombre}
                  onChange={(e) => setCiudadActual({ ...ciudadActual, nombre: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="provincia" className="block font-medium">
                  Provincia
                </label>
                <Select 
                  value={ciudadActual.provincia} 
                  onValueChange={(provincia) => setCiudadActual({ ...ciudadActual, provincia })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinciasEjemplo.map((provincia) => (
                      <SelectItem key={provincia.id} value={provincia.nombre}>
                        {provincia.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="codigoPostal" className="block font-medium">
                  Código Postal
                </label>
                <Input
                  id="codigoPostal"
                  value={ciudadActual.codigoPostal}
                  onChange={(e) => setCiudadActual({ ...ciudadActual, codigoPostal: e.target.value })}
                  required
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalAbierto(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 