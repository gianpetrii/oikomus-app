'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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
  const [activeTab, setActiveTab] = useState('overview')

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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="schedule">Calendario de Pagos</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Contrato</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Desglose de Pagos</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={paymentBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Información Adicional</h3>
                <p>Cuota mensual estimada: ${((contract.amount * (contract.interestRate / 100 / 12)) / (1 - Math.pow(1 + (contract.interestRate / 100 / 12), -contract.term * 12))).toFixed(2)}</p>
                <p>Total a pagar: ${(((contract.amount * (contract.interestRate / 100 / 12)) / (1 - Math.pow(1 + (contract.interestRate / 100 / 12), -contract.term * 12))) * contract.term * 12).toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Calendario de Pagos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Principal</TableHead>
                    <TableHead>Interés</TableHead>
                    <TableHead>Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentSchedule.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>${payment.principal}</TableCell>
                      <TableCell>${payment.interest}</TableCell>
                      <TableCell>${payment.balance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documentos del Contrato</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-600 hover:underline">Contrato firmado.pdf</a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">Identificación del cliente.jpg</a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">Comprobante de ingresos.pdf</a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">Historial crediticio.pdf</a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

