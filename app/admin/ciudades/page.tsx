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
import {
  getCiudades,
  crearCiudad,
  actualizarCiudad,
  eliminarCiudad,
  getProvincias,
  Ciudad,
  Provincia
} from '@/lib/db-admin'

export default function CiudadesPage() {
  const [ciudades, setCiudades] = useState<Ciudad[]>([])
  const [provincias, setProvincias] = useState<Provincia[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [ciudadActual, setCiudadActual] = useState<Ciudad>({ 
    id: '', 
    nombre: '', 
    codigo: '', 
    provinciaId: '',
    provinciaNombre: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  // Cargar ciudades y provincias
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [ciudadesData, provinciasData] = await Promise.all([
          getCiudades(),
          getProvincias()
        ])
        setCiudades(ciudadesData)
        setProvincias(provinciasData)
      } catch (error) {
        console.error('Error al cargar datos:', error)
        toast.error('Error al cargar los datos')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filtrar ciudades por búsqueda
  const ciudadesFiltradas = ciudades.filter(
    (ciudad) =>
      ciudad.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (ciudad.provinciaNombre?.toLowerCase().includes(busqueda.toLowerCase()) || '') ||
      ciudad.codigo.includes(busqueda)
  )

  // Función para abrir modal de nueva ciudad
  const abrirModalNueva = () => {
    setCiudadActual({ 
      id: '', 
      nombre: '', 
      codigo: '', 
      provinciaId: '',
      provinciaNombre: ''
    })
    setModalAbierto(true)
  }

  // Función para abrir modal de edición
  const abrirModalEditar = (ciudad: Ciudad) => {
    setCiudadActual(ciudad)
    setModalAbierto(true)
  }

  // Función para eliminar ciudad
  const handleEliminarCiudad = async (id: string) => {
    if (confirm('¿Está seguro que desea eliminar esta ciudad?')) {
      try {
        setIsDeleting(id)
        await eliminarCiudad(id)
        setCiudades(ciudades.filter((ciudad) => ciudad.id !== id))
        toast.success('Ciudad eliminada correctamente')
      } catch (error: any) {
        console.error('Error al eliminar ciudad:', error)
        toast.error(error.message || 'Error al eliminar la ciudad')
      } finally {
        setIsDeleting(null)
      }
    }
  }

  // Función para guardar ciudad (nueva o editada)
  const guardarCiudad = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!ciudadActual.provinciaId) {
      toast.error('Debe seleccionar una provincia')
      return
    }
    
    try {
      setIsSaving(true)
      
      if (ciudadActual.id) {
        // Editar existente
        await actualizarCiudad(ciudadActual.id, {
          nombre: ciudadActual.nombre,
          codigo: ciudadActual.codigo,
          provinciaId: ciudadActual.provinciaId
        })
        
        // Actualizar la lista local
        const provinciaSeleccionada = provincias.find(p => p.id === ciudadActual.provinciaId)
        const ciudadActualizada = {
          ...ciudadActual,
          provinciaNombre: provinciaSeleccionada?.nombre || ''
        }
        
        setCiudades(
          ciudades.map((c) => (c.id === ciudadActual.id ? ciudadActualizada : c))
        )
        
        toast.success('Ciudad actualizada correctamente')
      } else {
        // Crear nueva
        const id = await crearCiudad({
          nombre: ciudadActual.nombre,
          codigo: ciudadActual.codigo,
          provinciaId: ciudadActual.provinciaId
        })
        
        // Obtener nombre de la provincia seleccionada
        const provinciaSeleccionada = provincias.find(p => p.id === ciudadActual.provinciaId)
        
        const nuevaCiudad = {
          ...ciudadActual,
          id,
          provinciaNombre: provinciaSeleccionada?.nombre || ''
        }
        
        setCiudades([...ciudades, nuevaCiudad])
        toast.success('Ciudad creada correctamente')
      }
      
      setModalAbierto(false)
    } catch (error) {
      console.error('Error al guardar ciudad:', error)
      toast.error('Error al guardar la ciudad')
    } finally {
      setIsSaving(false)
    }
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
          placeholder="Buscar por nombre, provincia o código..."
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
                <TableHead>Provincia</TableHead>
                <TableHead>Código</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ciudadesFiltradas.length > 0 ? (
                ciudadesFiltradas.map((ciudad) => (
                  <TableRow key={ciudad.id}>
                    <TableCell className="font-medium">{ciudad.nombre}</TableCell>
                    <TableCell>{ciudad.provinciaNombre}</TableCell>
                    <TableCell>{ciudad.codigo}</TableCell>
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
                        onClick={() => handleEliminarCiudad(ciudad.id!)}
                        disabled={isDeleting === ciudad.id}
                      >
                        {isDeleting === ciudad.id ? (
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
                    No se encontraron ciudades
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

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
                  value={ciudadActual.provinciaId} 
                  onValueChange={(provinciaId) => setCiudadActual({ ...ciudadActual, provinciaId })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    {provincias.map((provincia) => (
                      <SelectItem key={provincia.id} value={provincia.id!}>
                        {provincia.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="codigo" className="block font-medium">
                  Código
                </label>
                <Input
                  id="codigo"
                  value={ciudadActual.codigo}
                  onChange={(e) => setCiudadActual({ ...ciudadActual, codigo: e.target.value })}
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