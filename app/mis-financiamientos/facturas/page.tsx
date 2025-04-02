'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import Link from 'next/link'

const initialInvoices = [
  { id: 1, client: 'Juan Pérez', amount: '$1,500', date: '2023-05-15', status: 'Pagada' },
  { id: 2, client: 'María García', amount: '$2,000', date: '2023-05-20', status: 'Pendiente' },
  { id: 3, client: 'Carlos López', amount: '$1,800', date: '2023-05-25', status: 'Pagada' },
]

export default function FacturasPage() {
  const [invoices, setInvoices] = useState(initialInvoices)

  const handleDelete = (id: number) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Facturas</h1>
        <Button>Generar Factura</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.client}</TableCell>
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/mis-financiamientos/facturas/${invoice.id}`}>Ver factura</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(invoice.id)}
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

