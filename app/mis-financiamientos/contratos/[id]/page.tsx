// Page for static site generation

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Export generateStaticParams for static site generation
export function generateStaticParams() {
  // Add contract IDs to pre-render at build time
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ]
}

const paymentSchedule = [
  { date: '2023-06-01', principal: 1000, interest: 500, balance: 48500 },
  { date: '2023-07-01', principal: 1050, interest: 450, balance: 47450 },
  { date: '2023-08-01', principal: 1100, interest: 400, balance: 46350 },
  { date: '2023-09-01', principal: 1150, interest: 350, balance: 45200 },
  { date: '2023-10-01', principal: 1200, interest: 300, balance: 44000 },
]

const paymentBreakdown = [
  { name: 'Principal', value: 44000 },
  { name: 'Interés', value: 6000 },
]

export default function ContractDetailPage({ params }: { params: { id: string } }) {
  // Mock contract data
  const contract = {
    id: params.id,
    clientName: 'Juan Pérez',
    type: 'Hipoteca',
    amount: 50000,
    interestRate: 5.5,
    term: 30,
    startDate: '2023-05-01',
    status: 'Activo',
  }

  // Pre-calculate for static rendering
  const monthlyPayment = ((contract.amount * (contract.interestRate / 100 / 12)) / 
    (1 - Math.pow(1 + (contract.interestRate / 100 / 12), -contract.term * 12))).toFixed(2);
  const totalPayment = (Number(monthlyPayment) * contract.term * 12).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Detalle del Contrato</h1>
        <Button variant="outline">Editar Contrato</Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="font-semibold">Cliente:</p>
              <p>{contract.clientName}</p>
            </div>
            <div>
              <p className="font-semibold">Tipo de Contrato:</p>
              <p>{contract.type}</p>
            </div>
            <div>
              <p className="font-semibold">Monto:</p>
              <p>${contract.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold">Tasa de Interés:</p>
              <p>{contract.interestRate}%</p>
            </div>
            <div>
              <p className="font-semibold">Plazo:</p>
              <p>{contract.term} años</p>
            </div>
            <div>
              <p className="font-semibold">Fecha de Inicio:</p>
              <p>{contract.startDate}</p>
            </div>
            <div>
              <p className="font-semibold">Estado:</p>
              <p>{contract.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        {/* Static tab rendering with Overview tab content */}
        <div className="flex border-b mb-4">
          <div className="px-4 py-2 text-sm font-medium text-primary border-b-2 border-primary">
            Resumen
          </div>
          <div className="px-4 py-2 text-sm font-medium text-gray-500">
            Calendario de Pagos
          </div>
          <div className="px-4 py-2 text-sm font-medium text-gray-500">
            Documentos
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resumen del Contrato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Desglose de Pagos</h3>
              {/* Static chart representation */}
              <div className="h-[300px] bg-gray-100 rounded flex items-center justify-center">
                Gráfico de Desglose de Pagos
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Información Adicional</h3>
              <p>Cuota mensual estimada: ${monthlyPayment}</p>
              <p>Total a pagar: ${totalPayment}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

