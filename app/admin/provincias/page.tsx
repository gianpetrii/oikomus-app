'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
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
import {
  getProvincias,
  crearProvincia,
  actualizarProvincia,
  eliminarProvincia,
  Provincia
} from '@/lib/db-admin'

export default function ProvinciasPage() {
  const [provincias, setProvincias] = useState<Provincia[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [provinciaActual, setProvinciaActual] = useState<Provincia>({ id: '', nombre: '', codigo: '', pais: 'Argentina' })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  // Cargar provincias
  useEffect(() => {
    const fetchProvincias = async () => {
      try {
        setIsLoading(true)
        const data = await getProvincias()
        setProvincias(data)
      } catch (error) {
        console.error('Error al cargar provincias:', error)
        toast.error('Error al cargar las provincias')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProvincias()
  }, [])

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
  const abrirModalEditar = (provincia: Provincia) => {
    setProvinciaActual(provincia)
    setModalAbierto(true)
  }

  // Función para eliminar provincia
  const handleEliminarProvincia = async (id: string) => {
    if (confirm('¿Está seguro que desea eliminar esta provincia?')) {
      try {
        setIsDeleting(id)
        await eliminarProvincia(id)
        setProvincias(provincias.filter((provincia) => provincia.id !== id))
        toast.success('Provincia eliminada correctamente')
      } catch (error: any) {
        console.error('Error al eliminar provincia:', error)
        toast.error(error.message || 'Error al eliminar la provincia')
      } finally {
        setIsDeleting(null)
      }
    }
  }

  // Función para guardar provincia (nueva o editada)
  const guardarProvincia = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsSaving(true)
      
      if (provinciaActual.id) {
        // Editar existente
        await actualizarProvincia(provinciaActual.id, {
          nombre: provinciaActual.nombre,
          codigo: provinciaActual.codigo,
          pais: provinciaActual.pais
        })
        
        setProvincias(
          provincias.map((p) => (p.id === provinciaActual.id ? provinciaActual : p))
        )
        
        toast.success('Provincia actualizada correctamente')
      } else {
        // Crear nueva
        const id = await crearProvincia({
          nombre: provinciaActual.nombre,
          codigo: provinciaActual.codigo,
          pais: provinciaActual.pais
        })
        
        const nuevaProvincia = {
          ...provinciaActual,
          id
        }
        
        setProvincias([...provincias, nuevaProvincia])
        toast.success('Provincia creada correctamente')
      }
      
      setModalAbierto(false)
    } catch (error) {
      console.error('Error al guardar provincia:', error)
      toast.error('Error al guardar la provincia')
    } finally {
      setIsSaving(false)
    }
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

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
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
                        onClick={() => handleEliminarProvincia(provincia.id!)}
                        disabled={isDeleting === provincia.id}
                      >
                        {isDeleting === provincia.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
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
      )}

      {/* Modal para agregar/editar provincia */}
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
                  disabled={isSaving}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    'Guardar'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 