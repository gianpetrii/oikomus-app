import Link from 'next/link'
import { Home, Building2, PlusCircle, Construction } from 'lucide-react'

const navigationItems = [
  { title: 'Desarrollos', icon: Home, href: '/desarrollos' },
  { title: 'Credito Hipotecario', icon: Building2, href: '/credito-hipotecario' },
  { title: 'Publicar', icon: PlusCircle, href: '/publicar' },
  { title: 'Emprendimientos', icon: Construction, href: '/emprendimientos' },
]

export default function NavigationCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
      {navigationItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.title}
            href={item.href}
            className="flex items-center gap-3 p-4 rounded-lg border hover:border-primary transition-colors"
          >
            <Icon className="h-6 w-6 text-primary" />
            <span className="font-medium">{item.title}</span>
          </Link>
        )
      })}
    </div>
  )
}

