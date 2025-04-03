// Static page for build export

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Export generateStaticParams for static site generation
export function generateStaticParams() {
  // Add client IDs to pre-render at build time
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ]
}

const paymentHistory = [
  { id: 1, date: '2023-05-01', amount: 1500, status: 'Pagado' },
  { id: 2, date: '2023-04-01', amount: 1500, status: 'Pagado' },
  { id: 3, date: '2023-03-01', amount: 1500, status: 'Pagado' },
  { id: 4, date: '2023-02-01', amount: 1500, status: 'Atrasado' },
  { id: 5, date: '2023-01-01', amount: 1500, status: 'Pagado' },
]

const loanBalanceData = [
  { month: 'Ene', balance: 50000 },
  { month: 'Feb', balance: 48500 },
  { month: 'Mar', balance: 47000 },
  { month: 'Abr', balance: 45500 },
  { month: 'May', balance: 44000 },
]

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  // Mock client data
  const client = {
    id: params.id,
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '1234567890',
    address: 'Calle Falsa 123, Springfield',
    totalLoans: 2,
    totalBalance: 44000,
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Detalle del Cliente</h1>
        <Button variant="outline">Editar Cliente</Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Nombre:</p>
              <p>{client.name}</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>{client.email}</p>
            </div>
            <div>
              <p className="font-semibold">Teléfono:</p>
              <p>{client.phone}</p>
            </div>
            <div>
              <p className="font-semibold">Dirección:</p>
              <p>{client.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Static tab display with overview tab pre-selected */}
      <div>
        <div className="flex border-b mb-4">
          <div className="px-4 py-2 text-sm font-medium text-primary border-b-2 border-primary">
            Resumen
          </div>
          <div className="px-4 py-2 text-sm font-medium text-gray-500">
            Préstamos
          </div>
          <div className="px-4 py-2 text-sm font-medium text-gray-500">
            Historial de Pagos
          </div>
        </div>
      
        <Card>
          <CardHeader>
            <CardTitle>Resumen Financiero</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Total de Préstamos:</p>
                <p>{client.totalLoans}</p>
              </div>
              <div>
                <p className="font-semibold">Balance Total:</p>
                <p>${client.totalBalance.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Balance del Préstamo</h3>
              {/* Static chart representation */}
              <div className="h-[300px] bg-gray-100 rounded flex items-center justify-center">
                Gráfico de Balance del Préstamo
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

