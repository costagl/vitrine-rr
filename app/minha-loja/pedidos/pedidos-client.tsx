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
import axios from "axios"
import { API_BASE_URL } from "@/config/api-url"

// A interface foi atualizada para refletir a nova estrutura de dados
interface EnderecoEntrega {
  enderecoEntregaId: number
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  cep: string
}

interface ItemPedido {
  idProduto: number
  titulo: string
  quantidade: number
  precoUnitario: number
  precoTotal: number
}

interface Pedido {
  idPedido: number
  idLoja: number
  idEnderecoEntrega: number
  dataPedido: string
  status: string
  valorTotal: number
  freteValor: number
  itensPedido: ItemPedido[]
}

interface Cliente {
  cpf: string
  nomeCompleto: string
  email: string
  telefone: string
  dataCriacao: string
  enderecoEntrega: EnderecoEntrega
  pedidos: Pedido[]
}

// Interface para a lista "plana" de pedidos que será usada no estado
interface PedidoDetalhado extends Pedido {
  nomeCompleto: string;
  email: string;
  cpfCliente: string;
}

const statusConfig: { [key: string]: { label: string; variant: "secondary" | "default" | "destructive"; color: string } } = {
  "1": { label: "Pendente", variant: "secondary", color: "bg-gray-100 text-gray-800" },
  "2": { label: "Processando", variant: "default", color: "bg-blue-100 text-blue-800" },
  "3": { label: "Enviado", variant: "default", color: "bg-purple-100 text-purple-800" },
  "4": { label: "Entregue", variant: "default", color: "bg-green-100 text-green-800" },
  "5": { label: "Cancelado", variant: "destructive", color: "bg-red-100 text-red-800" },
};

export function PedidosClient() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const { token, isLoading: authTokenLoading } = useAuthToken()
  const idLoja = user?.loja?.id

  const [orders, setOrders] = useState<PedidoDetalhado[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")

  const handleToggleExpand = (orderId: number) => {
    setExpandedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]));
  };

  useEffect(() => {
    if (idLoja) {
      axios
        .get(`${API_BASE_URL}/pedido/listar/${idLoja}`)
        .then((response) => {
          const clientes: Cliente[] = response.data
          const allPedidos: PedidoDetalhado[] = clientes.flatMap((cliente) =>
            (cliente.pedidos || []).map((pedido) => ({
              ...pedido,
              nomeCompleto: cliente.nomeCompleto,
              email: cliente.email,
              cpfCliente: cliente.cpf,
              itensPedido: pedido.itensPedido || [], // Garante que itensPedido seja sempre um array
            })),
          );
          setOrders(allPedidos)
        })
        .catch((error) => {
          console.error("Erro ao buscar pedidos:", error)
        })
    }
  }, [idLoja])

  // Filtrar pedidos
  const filteredOrders = useMemo(() => {
    let filtered = [...orders]

    // Filtro de busca
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.idPedido.toString().includes(searchLower) ||
          order.nomeCompleto.toLowerCase().includes(searchLower) ||
          order.cpfCliente.toLowerCase().includes(searchLower),
      )
    }

    // Filtro de status
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status.toString() === statusFilter)
    }

    // Filtro de data
    if (dateFilter !== "all") {
      const today = new Date()
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.dataPedido)
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

    return filtered.sort((a, b) => new Date(b.dataPedido).getTime() - new Date(a.dataPedido).getTime())
  }, [orders, searchQuery, statusFilter, dateFilter])

  // Estatísticas
  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "1").length,
      processing: orders.filter((o) => o.status === "2").length,
      revenue: orders.filter((o) => o.status !== "5").reduce((sum, o) => sum + o.valorTotal, 0),
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
                  placeholder="Buscar por ID, Nome ou CPF do cliente..."
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
                  <SelectItem value="1">Pendente</SelectItem>
                  <SelectItem value="2">Processando</SelectItem>
                  <SelectItem value="3">Enviado</SelectItem>
                  <SelectItem value="4">Entregue</SelectItem>
                  <SelectItem value="5">Cancelado</SelectItem>
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
                  <div key={order.idPedido} className="border rounded-lg overflow-hidden transition-all">
                    <div
                      onClick={() => handleToggleExpand(order.idPedido)}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Pedido #{order.idPedido}</span>
                          <Badge className={(statusConfig as any)[order.status]?.color}>
                            {(statusConfig as any)[order.status]?.label || "Pendente"}
                          </Badge>
                        </div>
                        <div className="text-sm font-semibold">{order.nomeCompleto}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.email}
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 md:mt-0">
                        <div className="text-right">
                          <div className="font-semibold text-lg">
                            {order.valorTotal.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(order.dataPedido).toLocaleDateString("pt-BR")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {expandedOrders.includes(order.idPedido) && (
                      <div className="p-4 bg-muted border-t">
                        <h4 className="font-semibold mb-2 text-sm">Itens do Pedido</h4>
                        <div className="space-y-2">
                          {order.itensPedido.map((item: ItemPedido, index: number) => (
                            <div key={index} className="flex justify-between text-sm items-center">
                              <div>
                                <span className="font-medium"> {"> "}{item.titulo}</span>
                                <span className="text-muted-foreground"> (Qtd: {item.quantidade})</span>
                              </div>
                              <span className="font-mono text-xs">
                                {item.precoTotal.toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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