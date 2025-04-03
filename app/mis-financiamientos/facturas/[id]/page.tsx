// Static page for build export

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Export generateStaticParams for static site generation
export function generateStaticParams() {
  // Add invoice IDs to pre-render at build time
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ]
}

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  // Mock invoice data
  const invoice = {
    id: params.id,
    clientName: 'Juan Pérez',
    date: '2023-05-15',
    dueDate: '2023-06-15',
    status: 'Pendiente',
    items: [
      { description: 'Cuota de préstamo - Mayo 2023', amount: 1500 },
      { description: 'Cargo por mora', amount: 50 },
    ],
    subtotal: 1550,
    tax: 155,
    total: 1705,
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Detalle de Factura</h1>
        <div className="space-x-2">
          <Button variant="outline">Imprimir</Button>
          <Button>Marcar como Pagada</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Cliente:</p>
              <p>{invoice.clientName}</p>
            </div>
            <div>
              <p className="font-semibold">Número de Factura:</p>
              <p>{invoice.id}</p>
            </div>
            <div>
              <p className="font-semibold">Fecha de Emisión:</p>
              <p>{invoice.date}</p>
            </div>
            <div>
              <p className="font-semibold">Fecha de Vencimiento:</p>
              <p>{invoice.dueDate}</p>
            </div>
            <div>
              <p className="font-semibold">Estado:</p>
              <p>{invoice.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detalle de Factura</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-semibold">Subtotal</TableCell>
                <TableCell className="text-right">${invoice.subtotal.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Impuestos (10%)</TableCell>
                <TableCell className="text-right">${invoice.tax.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Total</TableCell>
                <TableCell className="text-right font-bold">${invoice.total.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instrucciones de Pago</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Por favor, realice el pago antes de la fecha de vencimiento utilizando uno de los siguientes métodos:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Transferencia bancaria a la cuenta: ES12 1234 5678 9012 3456 7890</li>
            <li>Pago en línea a través de nuestro portal de clientes</li>
            <li>Pago en efectivo en nuestras oficinas</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

