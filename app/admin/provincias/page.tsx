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

// Datos de ejemplo para provincias
const provinciasEjemplo = [
  { id: '1', nombre: 'Buenos Aires', codigo: 'BA', pais: 'Argentina' },
  { id: '2', nombre: 'Córdoba', codigo: 'CBA', pais: 'Argentina' },
  { id: '3', nombre: 'Santa Fe', codigo: 'SF', pais: 'Argentina' },
  { id: '4', nombre: 'Mendoza', codigo: 'MDZ', pais: 'Argentina' },
  { id: '5', nombre: 'Tucumán', codigo: 'TUC', pais: 'Argentina' },
]

export default function ProvinciasPage() {
  const [provincias, setProvincias] = useState(provinciasEjemplo)
  const [busqueda, setBusqueda] = useState('')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [provinciaActual, setProvinciaActual] = useState({ id: '', nombre: '', codigo: '', pais: 'Argentina' })

  // Filtrar provincias por búsqueda
  const provinciasFiltradas = provincias.filter(
    (provincia) =>
      provincia.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      provincia.codigo.toLowerCase().includes(busqueda.toLowerCase())
  )

  // Función para abrir modal de nueva provincia
  const abrirModalNueva = () => {
    setProvinciaActual({ id: '', nombre: '', codigo: '', pais: 'Argentina' })
    setModalAbierto(true)
  }

  // Función para abrir modal de edición
  const abrirModalEditar = (provincia) => {
    setProvinciaActual(provincia)
    setModalAbierto(true)
  }

  // Función para eliminar provincia (solo de muestra)
  const eliminarProvincia = (id) => {
    if (confirm('¿Está seguro que desea eliminar esta provincia?')) {
      setProvincias(provincias.filter((provincia) => provincia.id !== id))
    }
  }

  // Función para guardar provincia (nueva o editada)
  const guardarProvincia = (e) => {
    e.preventDefault()
    
    if (provinciaActual.id) {
      // Editar existente
      setProvincias(
        provincias.map((p) => (p.id === provinciaActual.id ? provinciaActual : p))
      )
    } else {
      // Crear nueva con ID generado
      const nuevaProvincia = {
        ...provinciaActual,
        id: Date.now().toString(),
      }
      setProvincias([...provincias, nuevaProvincia])
    }
    
    setModalAbierto(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Provincias</h1>
        <Button onClick={abrirModalNueva}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Provincia
        </Button>
      </div>

      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="Buscar por nombre o código..."
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
              <TableHead>Código</TableHead>
              <TableHead>País</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {provinciasFiltradas.length > 0 ? (
              provinciasFiltradas.map((provincia) => (
                <TableRow key={provincia.id}>
                  <TableCell className="font-medium">{provincia.nombre}</TableCell>
                  <TableCell>{provincia.codigo}</TableCell>
                  <TableCell>{provincia.pais}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => abrirModalEditar(provincia)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => eliminarProvincia(provincia.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No se encontraron provincias
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal para agregar/editar provincia (simplificado) */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {provinciaActual.id ? 'Editar Provincia' : 'Nueva Provincia'}
            </h2>
            
            <form onSubmit={guardarProvincia} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="nombre" className="block font-medium">
                  Nombre
                </label>
                <Input
                  id="nombre"
                  value={provinciaActual.nombre}
                  onChange={(e) => setProvinciaActual({ ...provinciaActual, nombre: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="codigo" className="block font-medium">
                  Código
                </label>
                <Input
                  id="codigo"
                  value={provinciaActual.codigo}
                  onChange={(e) => setProvinciaActual({ ...provinciaActual, codigo: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="pais" className="block font-medium">
                  País
                </label>
                <Input
                  id="pais"
                  value={provinciaActual.pais}
                  onChange={(e) => setProvinciaActual({ ...provinciaActual, pais: e.target.value })}
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