// Static page for build export

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Export generateStaticParams for static site generation
export function generateStaticParams() {
  // Add payment IDs to pre-render at build time
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ]
}

export default function PaymentDetailPage({ params }: { params: { id: string } }) {
  // Mock payment data
  const payment = {
    id: params.id,
    clientName: 'Juan Pérez',
    date: '2023-05-15',
    amount: 1705,
    method: 'Transferencia bancaria',
    status: 'Completado',
    relatedInvoice: 'INV-001',
    transactionId: 'TRX-12345',
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Detalle de Pago</h1>
        <Button variant="outline">Imprimir Recibo</Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="font-semibold">Cliente:</p>
              <p>{payment.clientName}</p>
            </div>
            <div>
              <p className="font-semibold">ID de Pago:</p>
              <p>{payment.id}</p>
            </div>
            <div>
              <p className="font-semibold">Fecha:</p>
              <p>{payment.date}</p>
            </div>
            <div>
              <p className="font-semibold">Monto:</p>
              <p>${payment.amount.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-semibold">Método de Pago:</p>
              <p>{payment.method}</p>
            </div>
            <div>
              <p className="font-semibold">Estado:</p>
              <p>{payment.status}</p>
            </div>
            <div>
              <p className="font-semibold">Factura Relacionada:</p>
              <p>{payment.relatedInvoice}</p>
            </div>
            <div>
              <p className="font-semibold">ID de Transacción:</p>
              <p>{payment.transactionId}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detalles de la Transacción</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Concepto</TableHead>
                <TableHead>Detalle</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Monto del Pago</TableCell>
                <TableCell>Pago completo de la factura</TableCell>
                <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Método de Pago</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell className="text-right">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fecha de Procesamiento</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell className="text-right">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Estado de la Transacción</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell className="text-right">-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notas Adicionales</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Este pago ha sido procesado y aplicado correctamente a la factura {payment.relatedInvoice}. Si tiene alguna pregunta o inquietud sobre esta transacción, por favor contacte a nuestro equipo de soporte.</p>
        </CardContent>
      </Card>
    </div>
  )
}

