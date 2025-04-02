'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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
  const [activeTab, setActiveTab] = useState('overview')

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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="loans">Préstamos</TabsTrigger>
          <TabsTrigger value="payments">Historial de Pagos</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
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
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={loanBalanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="balance" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="loans">
          <Card>
            <CardHeader>
              <CardTitle>Préstamos Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Préstamo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Monto Original</TableHead>
                    <TableHead>Balance Actual</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>LOAN-001</TableCell>
                    <TableCell>Hipoteca</TableCell>
                    <TableCell>$200,000</TableCell>
                    <TableCell>$180,000</TableCell>
                    <TableCell>Activo</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>LOAN-002</TableCell>
                    <TableCell>Préstamo Personal</TableCell>
                    <TableCell>$10,000</TableCell>
                    <TableCell>$5,000</TableCell>
                    <TableCell>Activo</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Pagos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>${payment.amount}</TableCell>
                      <TableCell>{payment.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

