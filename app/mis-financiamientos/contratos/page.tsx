'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import Link from 'next/link'

const initialContracts = [
  { id: 1, client: 'Juan Pérez', type: 'Hipoteca', amount: '$250,000', status: 'Activo' },
  { id: 2, client: 'María García', type: 'Préstamo Personal', amount: '$50,000', status: 'Finalizado' },
  { id: 3, client: 'Carlos López', type: 'Hipoteca', amount: '$300,000', status: 'Activo' },
]

export default function ContratosPage() {
  const [contracts, setContracts] = useState(initialContracts)

  const handleDelete = (id: number) => {
    setContracts(contracts.filter(contract => contract.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Contratos</h1>
        <Button>Nuevo Contrato</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell>{contract.client}</TableCell>
              <TableCell>{contract.type}</TableCell>
              <TableCell>{contract.amount}</TableCell>
              <TableCell>{contract.status}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/mis-financiamientos/contratos/${contract.id}`}>Ver detalles</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(contract.id)}
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

