import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Users, Calendar, BarChart, Settings, LogOut, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-primary">Painel Administrativo</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/">
              <Button variant="outline" size="icon">
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Sair</span>
              </Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="grid gap-4 py-4">
                  <Link href="/admin" className="flex items-center gap-2 text-sm font-medium">
                    <BarChart className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link href="/admin/profissionais" className="flex items-center gap-2 text-sm font-medium">
                    <Users className="h-4 w-4" />
                    Profissionais
                  </Link>
                  <Link href="/admin/agendas" className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="h-4 w-4" />
                    Agendas
                  </Link>
                  <Link href="/admin/configuracoes" className="flex items-center gap-2 text-sm font-medium">
                    <Settings className="h-4 w-4" />
                    Configurações
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <Link
              href="/admin"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <BarChart className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/profissionais"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Users className="h-4 w-4" />
              Profissionais
            </Link>
            <Link
              href="/admin/agendas"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Calendar className="h-4 w-4" />
              Agendas
            </Link>
            <Link
              href="/admin/configuracoes"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className="h-4 w-4" />
              Configurações
            </Link>
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

