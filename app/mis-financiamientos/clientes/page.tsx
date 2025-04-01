'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import Link from 'next/link'

const initialClients = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', phone: '1234567890', status: 'Activo' },
  { id: 2, name: 'María García', email: 'maria@example.com', phone: '0987654321', status: 'Inactivo' },
  { id: 3, name: 'Carlos López', email: 'carlos@example.com', phone: '1122334455', status: 'Activo' },
]

export default function ClientesPage() {
  const [clients, setClients] = useState(initialClients)

  const handleDelete = (id: number) => {
    setClients(clients.filter(client => client.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <Button>Agregar Cliente</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>{client.status}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/mis-financiamientos/clientes/${client.id}`}>Ver</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(client.id)}
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

