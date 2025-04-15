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
import { Textarea } from '@/components/ui/textarea'

// Datos de ejemplo para barrios
const barriosEjemplo = [
  { 
    id: '1', 
    nombre: 'Palermo', 
    ciudad: 'Buenos Aires', 
    provincia: 'Buenos Aires',
    descripcion: 'Barrio bohemio y cultural de Buenos Aires', 
    nivelSocioeconomico: 'Alto' 
  },
  { 
    id: '2', 
    nombre: 'Recoleta', 
    ciudad: 'Buenos Aires', 
    provincia: 'Buenos Aires',
    descripcion: 'Barrio elegante y tradicional de Buenos Aires', 
    nivelSocioeconomico: 'Alto' 
  },
  { 
    id: '3', 
    nombre: 'Nueva Córdoba', 
    ciudad: 'Córdoba', 
    provincia: 'Córdoba',
    descripcion: 'Barrio universitario y moderno', 
    nivelSocioeconomico: 'Medio-Alto' 
  },
  { 
    id: '4', 
    nombre: 'Fisherton', 
    ciudad: 'Rosario', 
    provincia: 'Santa Fe',
    descripcion: 'Barrio residencial de casas bajas', 
    nivelSocioeconomico: 'Medio-Alto' 
  },
]

// Datos de ejemplo para ciudades (para el selector)
const ciudadesEjemplo = [
  { id: '1', nombre: 'Buenos Aires', provincia: 'Buenos Aires' },
  { id: '2', nombre: 'La Plata', provincia: 'Buenos Aires' },
  { id: '3', nombre: 'Córdoba', provincia: 'Córdoba' },
  { id: '4', nombre: 'Rosario', provincia: 'Santa Fe' },
  { id: '5', nombre: 'Mendoza', provincia: 'Mendoza' },
]

export default function BarriosPage() {
  const [barrios, setBarrios] = useState(barriosEjemplo)
  const [busqueda, setBusqueda] = useState('')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [barrioActual, setBarrioActual] = useState({ 
    id: '', 
    nombre: '', 
    ciudad: '', 
    provincia: '', 
    descripcion: '',
    nivelSocioeconomico: ''
  })

  // Filtrar barrios por búsqueda
  const barriosFiltrados = barrios.filter(
    (barrio) =>
      barrio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      barrio.ciudad.toLowerCase().includes(busqueda.toLowerCase()) ||
      barrio.provincia.toLowerCase().includes(busqueda.toLowerCase())
  )

  // Función para abrir modal de nuevo barrio
  const abrirModalNuevo = () => {
    setBarrioActual({ 
      id: '', 
      nombre: '', 
      ciudad: '', 
      provincia: '', 
      descripcion: '',
      nivelSocioeconomico: ''
    })
    setModalAbierto(true)
  }

  // Función para abrir modal de edición
  const abrirModalEditar = (barrio) => {
    setBarrioActual(barrio)
    setModalAbierto(true)
  }

  // Función para eliminar barrio (solo de muestra)
  const eliminarBarrio = (id) => {
    if (confirm('¿Está seguro que desea eliminar este barrio?')) {
      setBarrios(barrios.filter((barrio) => barrio.id !== id))
    }
  }

  // Función para guardar barrio (nuevo o editado)
  const guardarBarrio = (e) => {
    e.preventDefault()
    
    if (barrioActual.id) {
      // Editar existente
      setBarrios(
        barrios.map((b) => (b.id === barrioActual.id ? barrioActual : b))
      )
    } else {
      // Crear nuevo con ID generado
      const nuevoBarrio = {
        ...barrioActual,
        id: Date.now().toString(),
      }
      setBarrios([...barrios, nuevoBarrio])
    }
    
    setModalAbierto(false)
  }

  // Función para actualizar la provincia basada en la ciudad seleccionada
  const actualizarProvincia = (ciudadNombre) => {
    const ciudadSeleccionada = ciudadesEjemplo.find(ciudad => ciudad.nombre === ciudadNombre)
    
    if (ciudadSeleccionada) {
      setBarrioActual({
        ...barrioActual,
        ciudad: ciudadNombre,
        provincia: ciudadSeleccionada.provincia
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Barrios</h1>
        <Button onClick={abrirModalNuevo}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Barrio
        </Button>
      </div>

      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="Buscar por nombre, ciudad o provincia..."
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
              <TableHead>Ciudad</TableHead>
              <TableHead>Provincia</TableHead>
              <TableHead>Nivel Socioeconómico</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {barriosFiltrados.length > 0 ? (
              barriosFiltrados.map((barrio) => (
                <TableRow key={barrio.id}>
                  <TableCell className="font-medium">{barrio.nombre}</TableCell>
                  <TableCell>{barrio.ciudad}</TableCell>
                  <TableCell>{barrio.provincia}</TableCell>
                  <TableCell>{barrio.nivelSocioeconomico}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => abrirModalEditar(barrio)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => eliminarBarrio(barrio.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No se encontraron barrios
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal para agregar/editar barrio */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {barrioActual.id ? 'Editar Barrio' : 'Nuevo Barrio'}
            </h2>
            
            <form onSubmit={guardarBarrio} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="nombre" className="block font-medium">
                  Nombre
                </label>
                <Input
                  id="nombre"
                  value={barrioActual.nombre}
                  onChange={(e) => setBarrioActual({ ...barrioActual, nombre: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="ciudad" className="block font-medium">
                  Ciudad
                </label>
                <Select 
                  value={barrioActual.ciudad} 
                  onValueChange={actualizarProvincia}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    {ciudadesEjemplo.map((ciudad) => (
                      <SelectItem key={ciudad.id} value={ciudad.nombre}>
                        {ciudad.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="provincia" className="block font-medium">
                  Provincia
                </label>
                <Input
                  id="provincia"
                  value={barrioActual.provincia}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="nivelSocioeconomico" className="block font-medium">
                  Nivel Socioeconómico
                </label>
                <Select 
                  value={barrioActual.nivelSocioeconomico} 
                  onValueChange={(nivel) => setBarrioActual({ ...barrioActual, nivelSocioeconomico: nivel })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alto">Alto</SelectItem>
                    <SelectItem value="Medio-Alto">Medio-Alto</SelectItem>
                    <SelectItem value="Medio">Medio</SelectItem>
                    <SelectItem value="Medio-Bajo">Medio-Bajo</SelectItem>
                    <SelectItem value="Bajo">Bajo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="descripcion" className="block font-medium">
                  Descripción
                </label>
                <Textarea
                  id="descripcion"
                  value={barrioActual.descripcion}
                  onChange={(e) => setBarrioActual({ ...barrioActual, descripcion: e.target.value })}
                  rows={3}
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