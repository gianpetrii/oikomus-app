import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Bed, Bath, Square } from 'lucide-react'

interface PropertyCardProps {
  property: {
    id: number
    title: string
    price: number
    location: string
    image: string
    bedrooms: number
    bathrooms: number
    area: number
  }
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/propiedad/${property.id}`}>
      <Card className="w-[300px] hover:border-primary transition-colors">
        <CardContent className="p-0">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-[200px] object-cover rounded-t-lg"
          />
          <div className="p-4">
            <p className="text-2xl font-bold mb-2">
              ${property.price.toLocaleString()}
            </p>
            <h3 className="font-medium mb-1">{property.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{property.location}</p>
            <div className="flex justify-between text-gray-600 text-sm">
              <span className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                {property.bedrooms}
              </span>
              <span className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                {property.bathrooms}
              </span>
              <span className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                {property.area} m²
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

