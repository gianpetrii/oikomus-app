'use client'

import { ReactNode, useEffect } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Home, Building, MapPin, Landmark, Users, UserCog } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  // Verificar si el usuario tiene permisos para acceder al panel
  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      toast.error('No tienes permiso para acceder al panel de administración')
      redirect('/')
    }
  }, [user, loading])

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  // Si el usuario no está autenticado o no es admin, no mostramos nada (el useEffect redirigirá)
  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-col w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Oikomus Admin</h2>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <li>
              <Link href="/admin" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <Home className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/propiedades" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <Building className="w-5 h-5 mr-3" />
                <span>Inmuebles</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/provincias" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <MapPin className="w-5 h-5 mr-3" />
                <span>Provincias</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/ciudades" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <Landmark className="w-5 h-5 mr-3" />
                <span>Ciudades</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/barrios" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <MapPin className="w-5 h-5 mr-3" />
                <span>Barrios</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/vendedores" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <Users className="w-5 h-5 mr-3" />
                <span>Agentes Inmobiliarios</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/usuarios" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <UserCog className="w-5 h-5 mr-3" />
                <span>Administrar Usuarios</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Panel de Administración</h1>
          <div className="md:hidden">
            {/* Mobile menu button - would implement toggle functionality */}
            <button className="p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

