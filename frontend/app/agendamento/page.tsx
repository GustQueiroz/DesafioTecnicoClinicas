"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Tipo para representar um horário disponível
type Horario = {
  id: number
  profissionalId: number
  data: Date
  hora: string
  status: "livre" | "ocupado"
}

// Tipo para representar um profissional
type Profissional = {
  id: number
  nome: string
  especialidade: string
}

// Tipo para representar uma consulta agendada
type Consulta = {
  id: number
  profissionalId: number
  data: Date
  hora: string
  status: "agendada" | "realizada" | "cancelada"
}

export default function AgendamentoPage() {
  // Estado para a data selecionada no calendário
  const [data, setData] = useState<Date | undefined>(new Date())

  // Estado para a especialidade selecionada
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState<string>("")

  // Estado para o profissional selecionado
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<string>("")

  // Estado para o horário selecionado
  const [horarioSelecionado, setHorarioSelecionado] = useState<Horario | null>(null)

  // Estado para controlar o diálogo de confirmação
  const [dialogoConfirmacao, setDialogoConfirmacao] = useState(false)

  // Lista de especialidades (simulada)
  const especialidades = ["Cardiologia", "Dermatologia", "Ortopedia", "Pediatria", "Psiquiatria", "Neurologia"]

  // Lista de profissionais (simulada)
  const profissionais: Profissional[] = [
    { id: 1, nome: "Dr. João Silva", especialidade: "Cardiologia" },
    { id: 2, nome: "Dra. Maria Costa", especialidade: "Dermatologia" },
    { id: 3, nome: "Dr. Pedro Oliveira", especialidade: "Ortopedia" },
    { id: 4, nome: "Dra. Ana Santos", especialidade: "Pediatria" },
    { id: 5, nome: "Dr. Carlos Mendes", especialidade: "Psiquiatria" },
    { id: 6, nome: "Dra. Juliana Lima", especialidade: "Neurologia" },
  ]

  // Lista de horários disponíveis (simulada)
  const [horarios, setHorarios] = useState<Horario[]>([
    { id: 1, profissionalId: 1, data: new Date(), hora: "08:00", status: "livre" },
    { id: 2, profissionalId: 1, data: new Date(), hora: "09:00", status: "ocupado" },
    { id: 3, profissionalId: 1, data: new Date(), hora: "10:00", status: "livre" },
    { id: 4, profissionalId: 2, data: new Date(), hora: "13:00", status: "livre" },
    { id: 5, profissionalId: 2, data: new Date(), hora: "14:00", status: "ocupado" },
    { id: 6, profissionalId: 3, data: new Date(), hora: "15:00", status: "livre" },
    { id: 7, profissionalId: 4, data: new Date(), hora: "08:30", status: "livre" },
    { id: 8, profissionalId: 5, data: new Date(), hora: "16:00", status: "livre" },
    { id: 9, profissionalId: 6, data: new Date(), hora: "17:30", status: "livre" },
  ])

  // Lista de consultas agendadas (simulada)
  const [consultas, setConsultas] = useState<Consulta[]>([
    {
      id: 1,
      profissionalId: 2,
      data: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      hora: "10:00",
      status: "realizada",
    },
    {
      id: 2,
      profissionalId: 3,
      data: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      hora: "14:30",
      status: "agendada",
    },
  ])

  // Filtra os profissionais pela especialidade selecionada
  const profissionaisFiltrados = profissionais.filter(
    (p) => !especialidadeSelecionada || p.especialidade === especialidadeSelecionada,
  )

  // Filtra os horários pelo profissional selecionado e pela data
  const horariosFiltrados = horarios.filter((h) => {
    const mesmaData = data && h.data.toDateString() === data.toDateString()
    const mesmoProfissional = !profissionalSelecionado || h.profissionalId.toString() === profissionalSelecionado
    return mesmaData && mesmoProfissional && h.status === "livre"
  })

  // Função para agendar uma consulta
  const agendarConsulta = () => {
    if (horarioSelecionado) {
      // Adiciona a consulta à lista de consultas agendadas
      const novaConsulta: Consulta = {
        id: consultas.length > 0 ? Math.max(...consultas.map((c) => c.id)) + 1 : 1,
        profissionalId: horarioSelecionado.profissionalId,
        data: horarioSelecionado.data,
        hora: horarioSelecionado.hora,
        status: "agendada",
      }
      setConsultas([...consultas, novaConsulta])

      // Atualiza o status do horário para ocupado
      setHorarios(horarios.map((h) => (h.id === horarioSelecionado.id ? { ...h, status: "ocupado" } : h)))

      // Limpa o horário selecionado e fecha o diálogo
      setHorarioSelecionado(null)
      setDialogoConfirmacao(false)
    }
  }

  // Função para cancelar uma consulta
  const cancelarConsulta = (id: number) => {
    if (confirm("Tem certeza que deseja cancelar esta consulta?")) {
      // Atualiza o status da consulta para cancelada
      setConsultas(consultas.map((c) => (c.id === id ? { ...c, status: "cancelada" } : c)))

      // Encontra a consulta cancelada
      const consultaCancelada = consultas.find((c) => c.id === id)

      if (consultaCancelada) {
        // Encontra o horário correspondente à consulta
        const horarioCorrespondente = horarios.find(
          (h) =>
            h.profissionalId === consultaCancelada.profissionalId &&
            h.data.toDateString() === consultaCancelada.data.toDateString() &&
            h.hora === consultaCancelada.hora,
        )

        // Se encontrar o horário, atualiza seu status para livre
        if (horarioCorrespondente) {
          setHorarios(horarios.map((h) => (h.id === horarioCorrespondente.id ? { ...h, status: "livre" } : h)))
        }
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Agendamento de Consultas</h1>
        <p className="text-muted-foreground">Agende sua consulta de forma rápida e prática.</p>
      </div>

      <Tabs defaultValue="agendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="agendar">Agendar Consulta</TabsTrigger>
          <TabsTrigger value="minhas">Minhas Consultas</TabsTrigger>
        </TabsList>

        <TabsContent value="agendar" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <Calendar
                    mode="single"
                    selected={data}
                    onSelect={setData}
                    className="rounded-md border"
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                      date > new Date(new Date().setDate(new Date().getDate() + 30))
                    }
                  />
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label htmlFor="especialidade">Especialidade</Label>
                <Select
                  value={especialidadeSelecionada}
                  onValueChange={(value) => {
                    setEspecialidadeSelecionada(value)
                    setProfissionalSelecionado("")
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as especialidades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as especialidades</SelectItem>
                    {especialidades.map((esp) => (
                      <SelectItem key={esp} value={esp}>
                        {esp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profissional">Profissional</Label>
                <Select value={profissionalSelecionado} onValueChange={setProfissionalSelecionado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os profissionais" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os profissionais</SelectItem>
                    {profissionaisFiltrados.map((p) => (
                      <SelectItem key={p.id} value={p.id.toString()}>
                        {p.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">
                Horários disponíveis para {data ? data.toLocaleDateString("pt-BR") : "hoje"}
              </h2>

              {horariosFiltrados.length === 0 ? (
                <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                  <div className="text-center">
                    <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-semibold">Nenhum horário disponível</h3>
                    <p className="text-sm text-muted-foreground">
                      Não há horários disponíveis para esta data ou profissional.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {horariosFiltrados.map((horario) => {
                    const profissional = profissionais.find((p) => p.id === horario.profissionalId)
                    return (
                      <Card
                        key={horario.id}
                        className="cursor-pointer hover:border-primary"
                        onClick={() => {
                          setHorarioSelecionado(horario)
                          setDialogoConfirmacao(true)
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="font-medium">{horario.hora}</div>
                          <div className="text-sm text-muted-foreground mt-1">{profissional?.nome}</div>
                          <div className="text-xs text-muted-foreground">{profissional?.especialidade}</div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <Dialog open={dialogoConfirmacao} onOpenChange={setDialogoConfirmacao}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmar Agendamento</DialogTitle>
                <DialogDescription>
                  Você está prestes a agendar uma consulta. Confirme os detalhes abaixo.
                </DialogDescription>
              </DialogHeader>
              {horarioSelecionado && (
                <div className="py-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium">Data</p>
                        <p className="text-sm text-muted-foreground">
                          {horarioSelecionado.data.toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Horário</p>
                        <p className="text-sm text-muted-foreground">{horarioSelecionado.hora}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Profissional</p>
                      <p className="text-sm text-muted-foreground">
                        {profissionais.find((p) => p.id === horarioSelecionado.profissionalId)?.nome}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Especialidade</p>
                      <p className="text-sm text-muted-foreground">
                        {profissionais.find((p) => p.id === horarioSelecionado.profissionalId)?.especialidade}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogoConfirmacao(false)}>
                  Cancelar
                </Button>
                <Button onClick={agendarConsulta}>Confirmar Agendamento</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="minhas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Minhas Consultas</CardTitle>
              <CardDescription>Visualize e gerencie suas consultas agendadas.</CardDescription>
            </CardHeader>
            <CardContent>
              {consultas.filter((c) => c.status !== "cancelada").length === 0 ? (
                <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                  <div className="text-center">
                    <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-semibold">Nenhuma consulta agendada</h3>
                    <p className="text-sm text-muted-foreground">Você não possui consultas agendadas no momento.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {consultas
                    .filter((c) => c.status !== "cancelada")
                    .sort((a, b) => a.data.getTime() - b.data.getTime())
                    .map((consulta) => {
                      const profissional = profissionais.find((p) => p.id === consulta.profissionalId)
                      return (
                        <div key={consulta.id} className="flex items-center justify-between rounded-lg border p-4">
                          <div>
                            <p className="font-medium">{profissional?.nome}</p>
                            <p className="text-sm text-muted-foreground">{profissional?.especialidade}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-sm">
                                {consulta.data.toLocaleDateString("pt-BR")} às {consulta.hora}
                              </p>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  consulta.status === "agendada"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                }`}
                              >
                                {consulta.status === "agendada" ? "Agendada" : "Realizada"}
                              </span>
                            </div>
                          </div>
                          {consulta.status === "agendada" && (
                            <Button variant="outline" size="sm" onClick={() => cancelarConsulta(consulta.id)}>
                              Cancelar
                            </Button>
                          )}
                        </div>
                      )
                    })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

