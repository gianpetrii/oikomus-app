'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type FinancingType = 'hipotecario' | 'casaPropia' | 'procrearII' | 'programasProvincialesMunicipales' | 'privado'

interface SimulationResult {
  id: string
  type: FinancingType
  monthlyPayment: number
  totalInterest: number
  totalAmount: number
  amortizationSchedule: {
    month: number
    payment: number
    principal: number
    interest: number
    balance: number
  }[]
}

export default function SimuladorPage() {
  const [simulations, setSimulations] = useState<SimulationResult[]>([])
  const [activeTab, setActiveTab] = useState('new')
  const [financingType, setFinancingType] = useState<FinancingType>('hipotecario')
  const [propertyValue, setPropertyValue] = useState('')
  const [downPayment, setDownPayment] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')

  const handleSimulate = () => {
    const loanAmount = Number(propertyValue) - Number(downPayment)
    const monthlyRate = Number(interestRate) / 100 / 12
    const totalPayments = Number(loanTerm) * 12

    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1)

    let balance = loanAmount
    const amortizationSchedule = []

    for (let month = 1; month <= totalPayments; month++) {
      const interest = balance * monthlyRate
      const principal = monthlyPayment - interest
      balance -= principal

      amortizationSchedule.push({
        month,
        payment: monthlyPayment,
        principal,
        interest,
        balance: balance > 0 ? balance : 0
      })
    }

    const totalInterest = amortizationSchedule.reduce((sum, payment) => sum + payment.interest, 0)
    const totalAmount = loanAmount + totalInterest

    const newSimulation: SimulationResult = {
      id: Date.now().toString(),
      type: financingType,
      monthlyPayment,
      totalInterest,
      totalAmount,
      amortizationSchedule
    }

    setSimulations([...simulations, newSimulation])
    setActiveTab(newSimulation.id)
  }

  const renderSimulationForm = () => (
    <form className="space-y-4">
      <div>
        <Label htmlFor="financingType">Tipo de Financiamiento</Label>
        <Select value={financingType} onValueChange={(value: FinancingType) => setFinancingType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar tipo de financiamiento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hipotecario">Créditos hipotecarios</SelectItem>
            <SelectItem value="casaPropia">Créditos Casa Propia</SelectItem>
            <SelectItem value="procrearII">Créditos Procrear II</SelectItem>
            <SelectItem value="programasProvincialesMunicipales">Programas para provincias, municipios y organizaciones</SelectItem>
            <SelectItem value="privado">Financiamiento Privado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="propertyValue">Valor de la Propiedad</Label>
        <Input
          id="propertyValue"
          type="number"
          value={propertyValue}
          onChange={(e) => setPropertyValue(e.target.value)}
          placeholder="Ingrese el valor de la propiedad"
        />
      </div>
      
      <div>
        <Label htmlFor="downPayment">Pago Inicial</Label>
        <Input
          id="downPayment"
          type="number"
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
          placeholder="Ingrese el pago inicial"
        />
      </div>
      
      <div>
        <Label htmlFor="interestRate">Tasa de Interés Anual (%)</Label>
        <Input
          id="interestRate"
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="Ingrese la tasa de interés anual"
        />
      </div>
      
      <div>
        <Label htmlFor="loanTerm">Plazo del Préstamo (años)</Label>
        <Input
          id="loanTerm"
          type="number"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
          placeholder="Ingrese el plazo del préstamo en años"
        />
      </div>
      
      <Button type="button" onClick={handleSimulate}>Simular</Button>
    </form>
  )

  const renderSimulationResult = (simulation: SimulationResult) => (
    <div className="space-y-4">
      <div>
        <Label>Pago Mensual</Label>
        <p className="text-2xl font-bold">${simulation.monthlyPayment.toFixed(2)}</p>
      </div>
      <div>
        <Label>Total de Intereses</Label>
        <p className="text-2xl font-bold">${simulation.totalInterest.toFixed(2)}</p>
      </div>
      <div>
        <Label>Monto Total a Pagar</Label>
        <p className="text-2xl font-bold">${simulation.totalAmount.toFixed(2)}</p>
      </div>
      
      <div>
        <Label>Tabla de Amortización</Label>
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mes</TableHead>
                <TableHead>Pago</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Interés</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {simulation.amortizationSchedule.map((row) => (
                <TableRow key={row.month}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>${row.payment.toFixed(2)}</TableCell>
                  <TableCell>${row.principal.toFixed(2)}</TableCell>
                  <TableCell>${row.interest.toFixed(2)}</TableCell>
                  <TableCell>${row.balance.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )

  const renderComparisonChart = () => {
    const chartData = simulations.map(sim => ({
      name: sim.type,
      monthlyPayment: sim.monthlyPayment,
      totalInterest: sim.totalInterest,
      totalAmount: sim.totalAmount
    }))

    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comparación de Simulaciones</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="monthlyPayment" name="Pago Mensual" stroke="#8884d8" />
            <Line type="monotone" dataKey="totalInterest" name="Total de Intereses" stroke="#82ca9d" />
            <Line type="monotone" dataKey="totalAmount" name="Monto Total" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Simulador de Financiamiento</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Datos del Financiamiento</CardTitle>
          </CardHeader>
          <CardContent>
            {renderSimulationForm()}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resultados de la Simulación</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="new">Nueva Simulación</TabsTrigger>
                {simulations.map(sim => (
                  <TabsTrigger key={sim.id} value={sim.id}>{sim.type}</TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="new">
                <p>Complete el formulario y haga clic en "Simular" para ver los resultados.</p>
              </TabsContent>
              {simulations.map(sim => (
                <TabsContent key={sim.id} value={sim.id}>
                  {renderSimulationResult(sim)}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {simulations.length > 0 && renderComparisonChart()}
    </main>
  )
}

