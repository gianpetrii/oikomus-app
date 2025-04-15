'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, UserPlus, Mail, Phone, Eye, EyeOff } from 'lucide-react'
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
import { Checkbox } from '@/components/ui/checkbox'

// Datos de ejemplo para agentes
const agentesEjemplo = [
  { 
    id: '1', 
    nombre: 'Laura Rodríguez', 
    email: 'laura.r@oikomus.com',
    telefono: '+54 11 5555-1234',
    zonas: ['Palermo', 'Recoleta', 'Belgrano'],
    especialidad: 'Apartamentos de lujo',
    activo: true,
    foto: 'https://randomuser.me/api/portraits/women/65.jpg',
    creado: '2023-10-15'
  },
  { 
    id: '2', 
    nombre: 'Martín Gómez', 
    email: 'martin.g@oikomus.com',
    telefono: '+54 11 5555-5678',
    zonas: ['Caballito', 'Villa Crespo', 'Almagro'],
    especialidad: 'Casas familiares',
    activo: true,
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    creado: '2023-08-22'
  },
  { 
    id: '3', 
    nombre: 'Carolina Méndez', 
    email: 'carolina.m@oikomus.com',
    telefono: '+54 11 5555-9876',
    zonas: ['Puerto Madero', 'San Telmo', 'Retiro'],
    especialidad: 'Propiedades de inversión',
    activo: false,
    foto: 'https://randomuser.me/api/portraits/women/45.jpg',
    creado: '2023-12-05'
  },
]

export default function VendedoresPage() {
  const [agentes, setAgentes] = useState(agentesEjemplo)
  const [busqueda, setBusqueda] = useState('')
  const [filtroActivo, setFiltroActivo] = useState('todos') // 'todos', 'activos', 'inactivos'
  const [modalAbierto, setModalAbierto] = useState(false)
  const [agenteActual, setAgenteActual] = useState({ 
    id: '', 
    nombre: '', 
    email: '',
    telefono: '',
    zonas: [],
    especialidad: '',
    activo: true,
    foto: '',
  })

  // Filtrar agentes por búsqueda y estado activo
  const agentesFiltrados = agentes.filter((agente) => {
    const cumpleBusqueda = 
      agente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      agente.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      agente.especialidad.toLowerCase().includes(busqueda.toLowerCase());
    
    if (filtroActivo === 'todos') return cumpleBusqueda;
    if (filtroActivo === 'activos') return cumpleBusqueda && agente.activo;
    if (filtroActivo === 'inactivos') return cumpleBusqueda && !agente.activo;
    
    return cumpleBusqueda;
  })

  // Función para abrir modal de nuevo agente
  const abrirModalNuevo = () => {
    setAgenteActual({ 
      id: '', 
      nombre: '', 
      email: '',
      telefono: '',
      zonas: [],
      especialidad: '',
      activo: true,
      foto: '',
    })
    setModalAbierto(true)
  }

  // Función para abrir modal de edición
  const abrirModalEditar = (agente) => {
    setAgenteActual(agente)
    setModalAbierto(true)
  }

  // Función para eliminar agente (solo de muestra)
  const eliminarAgente = (id) => {
    if (confirm('¿Está seguro que desea eliminar este agente?')) {
      setAgentes(agentes.filter((agente) => agente.id !== id))
    }
  }

  // Función para alternar estado activo
  const toggleEstadoActivo = (id) => {
    setAgentes(
      agentes.map((agente) => 
        agente.id === id 
          ? { ...agente, activo: !agente.activo } 
          : agente
      )
    )
  }

  // Función para guardar agente (nuevo o editado)
  const guardarAgente = (e) => {
    e.preventDefault()
    
    if (agenteActual.id) {
      // Editar existente
      setAgentes(
        agentes.map((a) => (a.id === agenteActual.id ? agenteActual : a))
      )
    } else {
      // Crear nuevo con ID generado
      const nuevoAgente = {
        ...agenteActual,
        id: Date.now().toString(),
        creado: new Date().toISOString().split('T')[0]
      }
      setAgentes([...agentes, nuevoAgente])
    }
    
    setModalAbierto(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Agentes Inmobiliarios</h1>
        <Button onClick={abrirModalNuevo}>
          <UserPlus className="mr-2 h-4 w-4" /> Agregar Agente
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Input
          placeholder="Buscar por nombre, email o especialidad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="max-w-xs"
        />
        
        <div className="flex items-center space-x-2">
          <span className="text-sm whitespace-nowrap">Mostrar:</span>
          <Select 
            value={filtroActivo} 
            onValueChange={setFiltroActivo}
          >
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="activos">Activos</SelectItem>
              <SelectItem value="inactivos">Inactivos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Especialidad</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agentesFiltrados.length > 0 ? (
              agentesFiltrados.map((agente) => (
                <TableRow key={agente.id}>
                  <TableCell>
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                      {agente.foto ? (
                        <img src={agente.foto} alt={agente.nombre} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                          {agente.nombre.charAt(0)}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{agente.nombre}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="w-3 h-3" /> {agente.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <Phone className="w-3 h-3" /> {agente.telefono}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{agente.especialidad}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs ${
                          agente.activo 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {agente.activo ? 'Activo' : 'Inactivo'}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleEstadoActivo(agente.id)}
                        title={agente.activo ? 'Desactivar agente' : 'Activar agente'}
                        className="h-6 w-6"
                      >
                        {agente.activo ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => abrirModalEditar(agente)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => eliminarAgente(agente.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No se encontraron agentes
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal para agregar/editar agente */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {agenteActual.id ? 'Editar Agente' : 'Nuevo Agente'}
            </h2>
            
            <form onSubmit={guardarAgente} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="nombre" className="block font-medium">
                  Nombre completo
                </label>
                <Input
                  id="nombre"
                  value={agenteActual.nombre}
                  onChange={(e) => setAgenteActual({ ...agenteActual, nombre: e.target.value })}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={agenteActual.email}
                    onChange={(e) => setAgenteActual({ ...agenteActual, email: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="telefono" className="block font-medium">
                    Teléfono
                  </label>
                  <Input
                    id="telefono"
                    value={agenteActual.telefono}
                    onChange={(e) => setAgenteActual({ ...agenteActual, telefono: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="especialidad" className="block font-medium">
                  Especialidad
                </label>
                <Input
                  id="especialidad"
                  value={agenteActual.especialidad}
                  onChange={(e) => setAgenteActual({ ...agenteActual, especialidad: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="foto" className="block font-medium">
                  URL de foto (opcional)
                </label>
                <Input
                  id="foto"
                  value={agenteActual.foto || ''}
                  onChange={(e) => setAgenteActual({ ...agenteActual, foto: e.target.value })}
                  placeholder="https://ejemplo.com/foto.jpg"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block font-medium mb-2">
                  Zonas de trabajo
                </label>
                <div className="border rounded-md p-3 bg-gray-50 space-y-2">
                  <p className="text-sm text-gray-500 mb-2">
                    Ingrese las zonas separadas por comas
                  </p>
                  <Textarea
                    value={agenteActual.zonas ? agenteActual.zonas.join(', ') : ''}
                    onChange={(e) => setAgenteActual({ 
                      ...agenteActual, 
                      zonas: e.target.value.split(',').map(zona => zona.trim()).filter(Boolean)
                    })}
                    placeholder="Palermo, Recoleta, Belgrano..."
                    className="min-h-24"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="activo"
                  checked={agenteActual.activo}
                  onCheckedChange={(checked) => setAgenteActual({ ...agenteActual, activo: checked === true })}
                />
                <label htmlFor="activo" className="text-sm font-medium">
                  Agente activo
                </label>
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