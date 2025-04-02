'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, FileText, FileIcon as FileInvoice, CreditCard, Settings, LogOut } from 'lucide-react'

const sidebarItems = [
  { name: 'Inicio', href: '/mis-financiamientos', icon: Home },
  { name: 'Clientes', href: '/mis-financiamientos/clientes', icon: Users },
  { name: 'Contratos', href: '/mis-financiamientos/contratos', icon: FileText },
  { name: 'Facturas', href: '/mis-financiamientos/facturas', icon: FileInvoice },
  { name: 'Pagos', href: '/mis-financiamientos/pagos', icon: CreditCard },
  { name: 'Configuración', href: '/mis-financiamientos/configuracion', icon: Settings },
  { name: 'Oikomus', href: '/', icon: LogOut },
]

export default function FinanciamientosSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-white border-r">
      <div className="flex items-center justify-center h-16 border-b">
        <span className="text-2xl font-semibold text-primary">Mis Financiamientos</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-lg ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

