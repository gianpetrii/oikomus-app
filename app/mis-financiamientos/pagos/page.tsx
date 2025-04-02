'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import Link from 'next/link'

const initialPayments = [
  { id: 1, client: 'Juan Pérez', amount: '$1,500', date: '2023-05-15', method: 'Tarjeta de crédito' },
  { id: 2, client: 'María García', amount: '$2,000', date: '2023-05-20', method: 'Transferencia bancaria' },
  { id: 3, client: 'Carlos López', amount: '$1,800', date: '2023-05-25', method: 'Efectivo' },
]

export default function PagosPage() {
  const [payments, setPayments] = useState(initialPayments)

  const handleDelete = (id: number) => {
    setPayments(payments.filter(payment => payment.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pagos</h1>
        <Button>Registrar Pago</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Método</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.client}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell>{payment.method}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/mis-financiamientos/pagos/${payment.id}`}>Ver detalles</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(payment.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

