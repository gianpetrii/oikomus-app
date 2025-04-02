import { FileText, BookOpen, Info } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

const infoItems = [
  {
    icon: FileText,
    title: 'Requisitos para comprar',
    description: 'Conocé los requisitos para comprar una propiedad.',
    href: '/requisitos'
  },
  {
    icon: BookOpen,
    title: 'Guía para comprar',
    description: 'Paso a paso y superfácil, todo lo que necesitás saber para comprar.',
    href: '/guia'
  },
  {
    icon: Info,
    title: 'Conocé Oikomus',
    description: 'Toda la información sobre cómo usar nuestro portal ¡y mucho más!',
    href: '/about'
  }
]

export default function InfoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {infoItems.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.title} className="group hover:border-primary transition-colors">
            <CardContent className="p-6">
              <Icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

