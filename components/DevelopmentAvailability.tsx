import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DevelopmentData {
  totalUnits: number
  availableUnits: number
  floors: number
  unitsPerFloor: number
  unitStatus: {
    id: number
    status: 'available' | 'sold' | 'reserved'
    isFinished: boolean
  }[]
}

interface DevelopmentAvailabilityProps {
  data: DevelopmentData
}

const statusColors = {
  available: 'bg-green-500',
  sold: 'bg-red-500',
  reserved: 'bg-yellow-500'
}

export default function DevelopmentAvailability({ data }: DevelopmentAvailabilityProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <p>Total de unidades: {data.totalUnits}</p>
        <p>Unidades disponibles: {data.availableUnits}</p>
      </div>
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-2">
            {Array.from({ length: data.floors }, (_, floorIndex) => (
              <div key={floorIndex} className="flex items-center">
                <span className="w-12 text-right mr-2">Piso {data.floors - floorIndex}</span>
                <div className="flex-1 grid grid-cols-4 gap-2">
                  {data.unitStatus
                    .filter((unit) => Math.floor((unit.id - 1) / data.unitsPerFloor) === data.floors - floorIndex - 1)
                    .map((unit) => (
                      <TooltipProvider key={unit.id}>
                        <Tooltip>
                          <TooltipTrigger>
                            <div 
                              className={`w-full h-8 ${statusColors[unit.status]} ${unit.isFinished ? 'opacity-100' : 'opacity-50'}`}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Unidad {unit.id}</p>
                            <p>Estado: {unit.status}</p>
                            <p>{unit.isFinished ? 'Terminada' : 'En construcción'}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 mr-2" />
          <span>Disponible</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 mr-2" />
          <span>Reservada</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 mr-2" />
          <span>Vendida</span>
        </div>
      </div>
    </div>
  )
}

