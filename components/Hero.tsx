'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function Hero() {
  const router = useRouter()

  return (
    <div className="relative h-[500px] flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1920')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Cada propiedad tiene una historia
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-white mb-10">
          Un hogar que espera un nuevo comienzo
        </h2>

        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <Button 
            size="lg" 
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => router.push('/publicar')}
          >
            Poner en venta
          </Button>
          
          <Button 
            size="lg"
            variant="outline" 
            className="bg-white text-gray-900 hover:bg-gray-100"
            onClick={() => router.push('/search')}
          >
            Encontrar tu hogar
          </Button>
        </div>
      </div>
    </div>
  )
}

