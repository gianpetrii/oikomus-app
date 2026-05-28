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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  getBarrios,
  crearBarrio,
  actualizarBarrio,
  eliminarBarrio,
  getCiudades,
  Barrio,
  Ciudad
} from '@/lib/db-admin'

export default function BarriosPage() {
  const [barrios, setBarrios] = useState<Barrio[]>([])
  const [ciudades, setCiudades] = useState<Ciudad[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [barrioActual, setBarrioActual] = useState<Barrio>({ 
    id: '', 
    nombre: '', 
    ciudadId: '', 
    ciudadNombre: '',
    provinciaId: '',
    provinciaNombre: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  // Cargar barrios y ciudades
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [barriosData, ciudadesData] = await Promise.all([
          getBarrios(),
          getCiudades()
        ])
        setBarrios(barriosData)
        setCiudades(ciudadesData)
      } catch (error) {
        console.error('Error al cargar datos:', error)
        toast.error('Error al cargar los datos')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filtrar barrios por búsqueda
  const barriosFiltrados = barrios.filter(
    (barrio) =>
      barrio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (barrio.ciudadNombre?.toLowerCase().includes(busqueda.toLowerCase()) || '') ||
      (barrio.provinciaNombre?.toLowerCase().includes(busqueda.toLowerCase()) || '')
  )

  // Función para abrir modal de nuevo barrio
  const abrirModalNuevo = () => {
    setBarrioActual({ 
      id: '', 
      nombre: '', 
      ciudadId: '', 
      ciudadNombre: '',
      provinciaId: '',
      provinciaNombre: ''
    })
    setModalAbierto(true)
  }

  // Función para abrir modal de edición
  const abrirModalEditar = (barrio: Barrio) => {
    setBarrioActual(barrio)
    setModalAbierto(true)
  }

  // Función para eliminar barrio
  const handleEliminarBarrio = async (id: string) => {
    if (confirm('¿Está seguro que desea eliminar este barrio?')) {
      try {
        setIsDeleting(id)
        await eliminarBarrio(id)
        setBarrios(barrios.filter((barrio) => barrio.id !== id))
        toast.success('Barrio eliminado correctamente')
      } catch (error: any) {
        console.error('Error al eliminar barrio:', error)
        toast.error(error.message || 'Error al eliminar el barrio')
      } finally {
        setIsDeleting(null)
      }
    }
  }

  // Función para guardar barrio (nuevo o editado)
  const guardarBarrio = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!barrioActual.ciudadId) {
      toast.error('Debe seleccionar una ciudad')
      return
    }
    
    try {
      setIsSaving(true)
      
      if (barrioActual.id) {
        // Editar existente
        await actualizarBarrio(barrioActual.id, {
          nombre: barrioActual.nombre,
          ciudadId: barrioActual.ciudadId
        })
        
        // Actualizar la lista local
        const ciudadSeleccionada = ciudades.find(c => c.id === barrioActual.ciudadId)
        const barrioActualizado = {
          ...barrioActual,
          ciudadNombre: ciudadSeleccionada?.nombre || '',
          provinciaId: ciudadSeleccionada?.provinciaId || '',
          provinciaNombre: ciudadSeleccionada?.provinciaNombre || ''
        }
        
        setBarrios(
          barrios.map((b) => (b.id === barrioActual.id ? barrioActualizado : b))
        )
        
        toast.success('Barrio actualizado correctamente')
      } else {
        // Crear nuevo
        const id = await crearBarrio({
          nombre: barrioActual.nombre,
          ciudadId: barrioActual.ciudadId,
          provinciaId: '', // Este valor será rellenado por la función crearBarrio
          provinciaNombre: ''
        })
        
        // Obtener datos de la ciudad seleccionada
        const ciudadSeleccionada = ciudades.find(c => c.id === barrioActual.ciudadId)
        
        const nuevoBarrio = {
          ...barrioActual,
          id,
          ciudadNombre: ciudadSeleccionada?.nombre || '',
          provinciaId: ciudadSeleccionada?.provinciaId || '',
          provinciaNombre: ciudadSeleccionada?.provinciaNombre || ''
        }
        
        setBarrios([...barrios, nuevoBarrio])
        toast.success('Barrio creado correctamente')
      }
      
      setModalAbierto(false)
    } catch (error) {
      console.error('Error al guardar barrio:', error)
      toast.error('Error al guardar el barrio')
    } finally {
      setIsSaving(false)
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
                <TableHead>Ciudad</TableHead>
                <TableHead>Provincia</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {barriosFiltrados.length > 0 ? (
                barriosFiltrados.map((barrio) => (
                  <TableRow key={barrio.id}>
                    <TableCell className="font-medium">{barrio.nombre}</TableCell>
                    <TableCell>{barrio.ciudadNombre}</TableCell>
                    <TableCell>{barrio.provinciaNombre}</TableCell>
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
                        onClick={() => handleEliminarBarrio(barrio.id!)}
                        disabled={isDeleting === barrio.id}
                      >
                        {isDeleting === barrio.id ? (
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
                    No se encontraron barrios
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

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
                  value={barrioActual.ciudadId} 
                  onValueChange={(ciudadId) => setBarrioActual({ ...barrioActual, ciudadId })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    {ciudades.map((ciudad) => (
                      <SelectItem key={ciudad.id} value={ciudad.id!}>
                        {ciudad.nombre} ({ciudad.provinciaNombre})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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