'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Building, 
  MapPin, 
  Landmark, 
  Users, 
  Home,
  TrendingUp,
  Clock,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

// Datos simulados para estadísticas
const estadisticas = {
  propiedades: {
    total: 458,
    activas: 352,
    pendientes: 42,
    inactivas: 64,
    nuevasEstaSemana: 24
  },
  agentes: {
    total: 35,
    activos: 28,
    inactivos: 7,
    nuevosEsteMes: 4
  },
  ubicaciones: {
    provincias: 12,
    ciudades: 56,
    barrios: 284
  },
  actividad: [
    { accion: 'Propiedad agregada', descripcion: 'Apartamento en Palermo', tiempo: '2 horas' },
    { accion: 'Barrio actualizado', descripcion: 'Belgrano', tiempo: '5 horas' },
    { accion: 'Agente desactivado', descripcion: 'Juan Pérez', tiempo: '1 día' },
    { accion: 'Propiedad modificada', descripcion: 'Casa en Nordelta', tiempo: '1 día' },
    { accion: 'Ciudad agregada', descripcion: 'San Carlos de Bariloche', tiempo: '2 días' },
  ],
  alertas: [
    { tipo: 'problema', mensaje: '3 propiedades con datos incompletos' },
    { tipo: 'recordatorio', mensaje: '12 propiedades pendientes de revisión' },
    { tipo: 'info', mensaje: 'Recuerde mantener actualizados los precios' },
  ]
}

export default function AdminDashboardPage() {
  const router = useRouter()

  // Tarjetas de acceso rápido
  const tarjetasAcceso = [
    { 
      titulo: 'Inmuebles',
      descripcion: 'Gestione propiedades en venta y alquiler',
      icono: <Building className="h-5 w-5" />,
      color: 'bg-blue-500',
      ruta: '/admin/propiedades'
    },
    { 
      titulo: 'Provincias',
      descripcion: 'Administre las provincias del sistema',
      icono: <MapPin className="h-5 w-5" />,
      color: 'bg-green-500',
      ruta: '/admin/provincias'
    },
    { 
      titulo: 'Ciudades',
      descripcion: 'Gestione ciudades y localidades',
      icono: <Landmark className="h-5 w-5" />,
      color: 'bg-purple-500',
      ruta: '/admin/ciudades'
    },
    { 
      titulo: 'Barrios',
      descripcion: 'Administre los barrios por ciudad',
      icono: <Home className="h-5 w-5" />,
      color: 'bg-amber-500',
      ruta: '/admin/barrios'
    },
    { 
      titulo: 'Agentes',
      descripcion: 'Gestione agentes inmobiliarios',
      icono: <Users className="h-5 w-5" />,
      color: 'bg-rose-500',
      ruta: '/admin/vendedores'
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-1">Bienvenido al panel de administración de Oikomus</p>
      </div>
      
      {/* Tarjetas de estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Propiedades</CardTitle>
            <CardDescription>Resumen de inmuebles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{estadisticas.propiedades.total}</div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-500">Activas</span>
                <span className="font-medium">{estadisticas.propiedades.activas}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Pendientes</span>
                <span className="font-medium">{estadisticas.propiedades.pendientes}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Inactivas</span>
                <span className="font-medium">{estadisticas.propiedades.inactivas}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Nuevas (7d)</span>
                <span className="font-medium">{estadisticas.propiedades.nuevasEstaSemana}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push('/admin/propiedades')}>
              Ver propiedades
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Agentes inmobiliarios</CardTitle>
            <CardDescription>Resumen de agentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{estadisticas.agentes.total}</div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-500">Activos</span>
                <span className="font-medium">{estadisticas.agentes.activos}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Inactivos</span>
                <span className="font-medium">{estadisticas.agentes.inactivos}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Nuevos (30d)</span>
                <span className="font-medium">{estadisticas.agentes.nuevosEsteMes}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push('/admin/vendedores')}>
              Ver agentes
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Ubicaciones</CardTitle>
            <CardDescription>Geografía del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-xl font-bold">{estadisticas.ubicaciones.provincias}</span>
                <span className="text-gray-500 mt-1">Provincias</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-xl font-bold">{estadisticas.ubicaciones.ciudades}</span>
                <span className="text-gray-500 mt-1">Ciudades</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-xl font-bold">{estadisticas.ubicaciones.barrios}</span>
                <span className="text-gray-500 mt-1">Barrios</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-2">
            <Button variant="outline" className="w-full" size="sm" onClick={() => router.push('/admin/provincias')}>
              Provincias
            </Button>
            <Button variant="outline" className="w-full" size="sm" onClick={() => router.push('/admin/ciudades')}>
              Ciudades
            </Button>
            <Button variant="outline" className="w-full" size="sm" onClick={() => router.push('/admin/barrios')}>
              Barrios
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Accesos rápidos */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Accesos rápidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {tarjetasAcceso.map((tarjeta, index) => (
            <Card key={index} className="overflow-hidden">
              <div className={`${tarjeta.color} h-1`}></div>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`${tarjeta.color} bg-opacity-15 p-2 rounded-full`}>
                    {tarjeta.icono}
                  </div>
                  <CardTitle className="text-lg">{tarjeta.titulo}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-gray-500">
                {tarjeta.descripcion}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" onClick={() => router.push(tarjeta.ruta)}>
                  Gestionar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Actividad reciente y alertas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-gray-500" />
              <CardTitle className="text-lg">Actividad reciente</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {estadisticas.actividad.map((item, index) => (
                <div key={index} className="flex justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium">{item.accion}</div>
                    <div className="text-sm text-gray-500">{item.descripcion}</div>
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    Hace {item.tiempo}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-gray-500" />
              <CardTitle className="text-lg">Alertas y recordatorios</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {estadisticas.alertas.map((alerta, index) => (
                <div key={index} className={`p-3 rounded-lg ${
                  alerta.tipo === 'problema' 
                    ? 'bg-red-50 text-red-700' 
                    : alerta.tipo === 'recordatorio'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-blue-50 text-blue-700'
                }`}>
                  {alerta.mensaje}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 