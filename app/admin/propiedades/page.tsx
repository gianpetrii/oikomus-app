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

// Datos de ejemplo para propiedades
const propiedadesEjemplo = [
  {
    id: '1',
    titulo: 'Apartamento moderno en el centro',
    tipo: 'Apartamento',
    barrio: 'Centro',
    ciudad: 'Buenos Aires',
    precio: 120000,
    status: 'Activo',
  },
  {
    id: '2',
    titulo: 'Casa familiar con jardín',
    tipo: 'Casa',
    barrio: 'Palermo',
    ciudad: 'Buenos Aires',
    precio: 250000,
    status: 'Activo',
  },
  {
    id: '3',
    titulo: 'Oficina ejecutiva en torre corporativa',
    tipo: 'Oficina',
    barrio: 'Puerto Madero',
    ciudad: 'Buenos Aires',
    precio: 180000,
    status: 'Pendiente',
  },
]

export default function PropiedadesPage() {
  const [propiedades, setPropiedades] = useState(propiedadesEjemplo)
  const [busqueda, setBusqueda] = useState('')

  // Filtrar propiedades por búsqueda
  const propiedadesFiltradas = propiedades.filter(
    (propiedad) =>
      propiedad.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      propiedad.barrio.toLowerCase().includes(busqueda.toLowerCase()) ||
      propiedad.ciudad.toLowerCase().includes(busqueda.toLowerCase())
  )

  // Función para eliminar propiedad (solo de muestra)
  const eliminarPropiedad = (id: string) => {
    // En una aplicación real, aquí se haría una llamada a la API
    if (confirm('¿Está seguro que desea eliminar esta propiedad?')) {
      setPropiedades(propiedades.filter((propiedad) => propiedad.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Inmuebles</h1>
        <Link href="/admin/propiedades/nueva">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Agregar Inmueble
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="Buscar por título, barrio o ciudad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Barrio</TableHead>
              <TableHead>Ciudad</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {propiedadesFiltradas.length > 0 ? (
              propiedadesFiltradas.map((propiedad) => (
                <TableRow key={propiedad.id}>
                  <TableCell className="font-medium">{propiedad.titulo}</TableCell>
                  <TableCell>{propiedad.tipo}</TableCell>
                  <TableCell>{propiedad.barrio}</TableCell>
                  <TableCell>{propiedad.ciudad}</TableCell>
                  <TableCell>${propiedad.precio.toLocaleString()}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        propiedad.status === 'Activo'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {propiedad.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link href={`/admin/propiedades/editar/${propiedad.id}`}>
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => eliminarPropiedad(propiedad.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  No se encontraron propiedades
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 