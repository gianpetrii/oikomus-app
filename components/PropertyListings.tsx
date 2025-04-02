'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import PropertyCard from './PropertyCard'

const sections = [
  {
    title: 'Departamentos en alquiler más vistos',
    properties: Array(6).fill({
      title: 'Departamento en Palermo',
      price: 150000,
      location: 'Palermo, Buenos Aires',
      image: '/placeholder.svg?height=200&width=300',
      bedrooms: 2,
      bathrooms: 1,
      area: 45
    })
  },
  {
    title: 'Las propiedades recién publicadas',
    properties: Array(6).fill({
      title: 'Casa en Belgrano',
      price: 200000,
      location: 'Belgrano, Buenos Aires',
      image: '/placeholder.svg?height=200&width=300',
      bedrooms: 3,
      bathrooms: 2,
      area: 120
    })
  },
  {
    title: 'Propiedades que bajaron de precio',
    properties: Array(6).fill({
      title: 'PH en Villa Crespo',
      price: 130000,
      location: 'Villa Crespo, Buenos Aires',
      image: '/placeholder.svg?height=200&width=300',
      bedrooms: 2,
      bathrooms: 1,
      area: 60
    })
  }
]

export default function PropertyListings() {
  const scrollContainerRefs = useRef<(HTMLDivElement | null)[]>([])

  const scroll = (index: number, direction: 'left' | 'right') => {
    const container = scrollContainerRefs.current[index]
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-12">
      {sections.map((section, index) => (
        <div key={section.title}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll(index, 'left')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll(index, 'right')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div
            ref={el => scrollContainerRefs.current[index] = el}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          >
            {section.properties.map((property, propertyIndex) => (
              <div key={`${section.title}-${propertyIndex}`} className="snap-start">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

