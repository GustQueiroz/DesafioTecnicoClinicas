"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus, Clock } from "lucide-react"

// Tipo para representar um horário na agenda
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

export default function AgendasPage() {
  // Estado para a data selecionada no calendário
  const [data, setData] = useState<Date | undefined>(new Date())

  // Estado para o profissional selecionado
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<string>("")

  // Lista de profissionais (simulada)
  const profissionais: Profissional[] = [
    { id: 1, nome: "Dr. João Silva", especialidade: "Cardiologia" },
    { id: 2, nome: "Dra. Maria Costa", especialidade: "Dermatologia" },
    { id: 3, nome: "Dr. Pedro Oliveira", especialidade: "Ortopedia" },
  ]

  // Estado para armazenar os horários
  const [horarios, setHorarios] = useState<Horario[]>([
    { id: 1, profissionalId: 1, data: new Date(), hora: "08:00", status: "livre" },
    { id: 2, profissionalId: 1, data: new Date(), hora: "09:00", status: "ocupado" },
    { id: 3, profissionalId: 1, data: new Date(), hora: "10:00", status: "livre" },
    { id: 4, profissionalId: 1, data: new Date(), hora: "11:00", status: "livre" },
    { id: 5, profissionalId: 2, data: new Date(), hora: "13:00", status: "livre" },
    { id: 6, profissionalId: 2, data: new Date(), hora: "14:00", status: "ocupado" },
    { id: 7, profissionalId: 2, data: new Date(), hora: "15:00", status: "livre" },
    { id: 8, profissionalId: 3, data: new Date(), hora: "16:00", status: "livre" },
    { id: 9, profissionalId: 3, data: new Date(), hora: "17:00", status: "ocupado" },
  ])

  // Estado para o novo horário
  const [novoHorario, setNovoHorario] = useState({
    profissionalId: "",
    hora: "",
  })

  // Estado para controlar o diálogo
  const [dialogoAberto, setDialogoAberto] = useState(false)

  // Função para adicionar um novo horário
  const adicionarHorario = () => {
    if (data && novoHorario.profissionalId && novoHorario.hora) {
      const id = horarios.length > 0 ? Math.max(...horarios.map((h) => h.id)) + 1 : 1
      const novoItem: Horario = {
        id,
        profissionalId: Number.parseInt(novoHorario.profissionalId),
        data: new Date(data),
        hora: novoHorario.hora,
        status: "livre",
      }
      setHorarios([...horarios, novoItem])
      setNovoHorario({ profissionalId: "", hora: "" })
      setDialogoAberto(false)
    }
  }

  // Função para alternar o status de um horário
  const alternarStatus = (id: number) => {
    setHorarios(horarios.map((h) => (h.id === id ? { ...h, status: h.status === "livre" ? "ocupado" : "livre" } : h)))
  }

  // Filtra os horários pelo profissional selecionado e pela data
  const horariosFiltrados = horarios.filter((h) => {
    const mesmaData = data && h.data.toDateString() === data.toDateString()
    const mesmoProfissional = !profissionalSelecionado || h.profissionalId.toString() === profissionalSelecionado
    return mesmaData && mesmoProfissional
  })

  // Gera os horários disponíveis para seleção (de 8h às 18h, de 30 em 30 minutos)
  const horariosDisponiveis = Array.from({ length: 21 }, (_, i) => {
    const hora = Math.floor(i / 2) + 8
    const minutos = i % 2 === 0 ? "00" : "30"
    return `${hora.toString().padStart(2, "0")}:${minutos}`
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agendas</h1>
          <p className="text-muted-foreground">Gerencie as agendas dos profissionais da sua clínica.</p>
        </div>
        <Dialog open={dialogoAberto} onOpenChange={setDialogoAberto}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Horário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Horário</DialogTitle>
              <DialogDescription>Selecione o profissional e o horário para adicionar à agenda.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="profissional">Profissional</Label>
                <Select
                  value={novoHorario.profissionalId}
                  onValueChange={(value) => setNovoHorario({ ...novoHorario, profissionalId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    {profissionais.map((p) => (
                      <SelectItem key={p.id} value={p.id.toString()}>
                        {p.nome} - {p.especialidade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hora">Horário</Label>
                <Select
                  value={novoHorario.hora}
                  onValueChange={(value) => setNovoHorario({ ...novoHorario, hora: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {horariosDisponiveis.map((hora) => (
                      <SelectItem key={hora} value={hora}>
                        {hora}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogoAberto(false)}>
                Cancelar
              </Button>
              <Button onClick={adicionarHorario}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <Calendar mode="single" selected={data} onSelect={setData} className="rounded-md border" />
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="profissional-filtro">Filtrar por Profissional</Label>
            <Select value={profissionalSelecionado} onValueChange={setProfissionalSelecionado}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os profissionais" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os profissionais</SelectItem>
                {profissionais.map((p) => (
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
            Horários para {data ? data.toLocaleDateString("pt-BR") : "hoje"}
          </h2>

          {horariosFiltrados.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
              <div className="text-center">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-semibold">Nenhum horário encontrado</h3>
                <p className="text-sm text-muted-foreground">
                  Não há horários cadastrados para esta data ou profissional.
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
                    className={`cursor-pointer ${horario.status === "ocupado" ? "bg-muted" : ""}`}
                    onClick={() => alternarStatus(horario.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{horario.hora}</div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs ${
                            horario.status === "livre"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }`}
                        >
                          {horario.status === "livre" ? "Livre" : "Ocupado"}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{profissional?.nome}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

