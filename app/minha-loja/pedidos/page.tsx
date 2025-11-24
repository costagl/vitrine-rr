"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import { Package, ArrowLeft, Search, Calendar, DollarSign, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useAuthToken } from "@/hooks/use-auth-token"

// Tipos
interface Order {
  id: number
  orderNumber: string
  date: string
  customerName: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: number
}

// Dados mockados para demonstração
const mockOrders: Order[] = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    date: "2024-01-20",
    customerName: "João Silva",
    status: "delivered",
    total: 299.99,
    items: 3,
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    date: "2024-01-19",
    customerName: "Maria Santos",
    status: "shipped",
    total: 149.5,
    items: 2,
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    date: "2024-01-19",
    customerName: "Pedro Costa",
    status: "processing",
    total: 89.9,
    items: 1,
  },
  {
    id: 4,
    orderNumber: "ORD-2024-004",
    date: "2024-01-18",
    customerName: "Ana Oliveira",
    status: "pending",
    total: 459.0,
    items: 5,
  },
  {
    id: 5,
    orderNumber: "ORD-2024-005",
    date: "2024-01-18",
    customerName: "Carlos Mendes",
    status: "cancelled",
    total: 199.99,
    items: 2,
  },
]

const statusConfig = {
  pending: { label: "Pendente", variant: "secondary" as const, color: "bg-gray-100 text-gray-800" },
  processing: { label: "Processando", variant: "default" as const, color: "bg-blue-100 text-blue-800" },
  shipped: { label: "Enviado", variant: "default" as const, color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Entregue", variant: "default" as const, color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelado", variant: "destructive" as const, color: "bg-red-100 text-red-800" },
}

export default function OrdersPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const { token, isLoading: authTokenLoading } = useAuthToken()

  const [orders] = useState<Order[]>(mockOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")

  // Filtrar pedidos
  const filteredOrders = useMemo(() => {
    let filtered = [...orders]

    // Filtro de busca
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchLower) ||
          order.customerName.toLowerCase().includes(searchLower),
      )
    }

    // Filtro de status
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    // Filtro de data
    if (dateFilter !== "all") {
      const today = new Date()
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date)
        const diffTime = Math.abs(today.getTime() - orderDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        switch (dateFilter) {
          case "today":
            return diffDays === 0
          case "week":
            return diffDays <= 7
          case "month":
            return diffDays <= 30
          default:
            return true
        }
      })
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [orders, searchQuery, statusFilter, dateFilter])

  // Estatísticas
  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) => o.status === "processing").length,
      revenue: orders.filter((o) => o.status !== "cancelled").reduce((sum, o) => sum + o.total, 0),
    }
  }, [orders])

  // Redirecionamento caso não esteja autenticado
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isAuthenticated) {
        router.push("/login")
      }
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isAuthenticated, router])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!authTokenLoading && !token) {
        router.push("/login")
      }
    }, 2000)

    return () => clearTimeout(timeout)
  }, [token, authTokenLoading, router])

  // Loading state
  if (authTokenLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!token) return null

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/minha-loja">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <ShoppingBag className="h-8 w-8" />
                Pedidos
              </h1>
              <p className="text-muted-foreground mt-1">{user?.loja?.nomeLoja && `Loja: ${user.loja.nomeLoja}`}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Processamento</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.processing}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.revenue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por número ou cliente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="processing">Processando</SelectItem>
                  <SelectItem value="shipped">Enviado</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Filter */}
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as datas</SelectItem>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lista de Pedidos</span>
              <Badge variant="secondary">{filteredOrders.length} pedido(s)</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {orders.length === 0
                  ? "Nenhum pedido registrado ainda."
                  : "Nenhum pedido encontrado com os filtros aplicados."}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{order.orderNumber}</span>
                        <Badge className={statusConfig[order.status].color}>{statusConfig[order.status].label}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Cliente: {order.customerName}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.items} {order.items === 1 ? "item" : "itens"}
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 md:mt-0">
                      <div className="text-right">
                        <div className="font-semibold text-lg">
                          {order.total.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString("pt-BR")}
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
