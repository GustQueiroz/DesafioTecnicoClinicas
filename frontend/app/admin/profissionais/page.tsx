"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Plus, Pencil, Trash2 } from "lucide-react"

// Tipo para representar um profissional
type Profissional = {
  id: number
  nome: string
  especialidade: string
  email: string
  telefone: string
}

export default function ProfissionaisPage() {
  // Estado para armazenar a lista de profissionais
  const [profissionais, setProfissionais] = useState<Profissional[]>([
    {
      id: 1,
      nome: "Dr. João Silva",
      especialidade: "Cardiologia",
      email: "joao.silva@clinica.com",
      telefone: "(11) 98765-4321",
    },
    {
      id: 2,
      nome: "Dra. Maria Costa",
      especialidade: "Dermatologia",
      email: "maria.costa@clinica.com",
      telefone: "(11) 91234-5678",
    },
    {
      id: 3,
      nome: "Dr. Pedro Oliveira",
      especialidade: "Ortopedia",
      email: "pedro.oliveira@clinica.com",
      telefone: "(11) 99876-5432",
    },
  ])

  // Estado para o formulário de novo profissional
  const [novoProfissional, setNovoProfissional] = useState<Omit<Profissional, "id">>({
    nome: "",
    especialidade: "",
    email: "",
    telefone: "",
  })

  // Estado para controlar o diálogo de edição
  const [editandoProfissional, setEditandoProfissional] = useState<Profissional | null>(null)
  const [dialogoAberto, setDialogoAberto] = useState(false)

  // Função para adicionar um novo profissional
  const adicionarProfissional = () => {
    const id = profissionais.length > 0 ? Math.max(...profissionais.map((p) => p.id)) + 1 : 1
    setProfissionais([...profissionais, { id, ...novoProfissional }])
    setNovoProfissional({ nome: "", especialidade: "", email: "", telefone: "" })
    setDialogoAberto(false)
  }

  // Função para iniciar a edição de um profissional
  const iniciarEdicao = (profissional: Profissional) => {
    setEditandoProfissional(profissional)
    setDialogoAberto(true)
  }

  // Função para salvar as alterações de um profissional
  const salvarEdicao = () => {
    if (editandoProfissional) {
      setProfissionais(profissionais.map((p) => (p.id === editandoProfissional.id ? editandoProfissional : p)))
      setEditandoProfissional(null)
      setDialogoAberto(false)
    }
  }

  // Função para excluir um profissional
  const excluirProfissional = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este profissional?")) {
      setProfissionais(profissionais.filter((p) => p.id !== id))
    }
  }

  // Função para formatar o telefone enquanto o usuário digita
  const formatarTelefone = (valor: string) => {
    const telefone = valor.replace(/\D/g, "")
    if (telefone.length <= 11) {
      return telefone.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2")
    }
    return telefone
      .substring(0, 11)
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profissionais</h1>
          <p className="text-muted-foreground">Gerencie os profissionais da sua clínica.</p>
        </div>
        <Dialog open={dialogoAberto} onOpenChange={setDialogoAberto}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Profissional
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editandoProfissional ? "Editar Profissional" : "Novo Profissional"}</DialogTitle>
              <DialogDescription>Preencha os dados do profissional abaixo.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={editandoProfissional ? editandoProfissional.nome : novoProfissional.nome}
                  onChange={(e) =>
                    editandoProfissional
                      ? setEditandoProfissional({ ...editandoProfissional, nome: e.target.value })
                      : setNovoProfissional({ ...novoProfissional, nome: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="especialidade">Especialidade</Label>
                <Select
                  value={editandoProfissional ? editandoProfissional.especialidade : novoProfissional.especialidade}
                  onValueChange={(value) =>
                    editandoProfissional
                      ? setEditandoProfissional({ ...editandoProfissional, especialidade: value })
                      : setNovoProfissional({ ...novoProfissional, especialidade: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cardiologia">Cardiologia</SelectItem>
                    <SelectItem value="Dermatologia">Dermatologia</SelectItem>
                    <SelectItem value="Ortopedia">Ortopedia</SelectItem>
                    <SelectItem value="Pediatria">Pediatria</SelectItem>
                    <SelectItem value="Psiquiatria">Psiquiatria</SelectItem>
                    <SelectItem value="Neurologia">Neurologia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={editandoProfissional ? editandoProfissional.email : novoProfissional.email}
                  onChange={(e) =>
                    editandoProfissional
                      ? setEditandoProfissional({ ...editandoProfissional, email: e.target.value })
                      : setNovoProfissional({ ...novoProfissional, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={editandoProfissional ? editandoProfissional.telefone : novoProfissional.telefone}
                  onChange={(e) => {
                    const telefoneFormatado = formatarTelefone(e.target.value)
                    editandoProfissional
                      ? setEditandoProfissional({ ...editandoProfissional, telefone: telefoneFormatado })
                      : setNovoProfissional({ ...novoProfissional, telefone: telefoneFormatado })
                  }}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogoAberto(false)}>
                Cancelar
              </Button>
              <Button onClick={editandoProfissional ? salvarEdicao : adicionarProfissional}>
                {editandoProfissional ? "Salvar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Especialidade</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profissionais.map((profissional) => (
              <TableRow key={profissional.id}>
                <TableCell className="font-medium">{profissional.nome}</TableCell>
                <TableCell>{profissional.especialidade}</TableCell>
                <TableCell>{profissional.email}</TableCell>
                <TableCell>{profissional.telefone}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => iniciarEdicao(profissional)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => excluirProfissional(profissional.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

