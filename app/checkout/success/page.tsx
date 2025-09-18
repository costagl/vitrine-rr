"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

const plans: Record<string, { name: string; price: number }> = {
  basico: { name: "Básico", price: 29 },
  profissional: { name: "Profissional", price: 79 },
  empresarial: { name: "Empresarial", price: 199 },
}

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("plano") || "basico"
  const selectedPlan = plans[planId] || plans.basico

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <Card>
          <CardHeader className="pb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Pagamento Aprovado!</CardTitle>
            <CardDescription>Seu plano {selectedPlan.name} foi ativado com sucesso</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Detalhes da compra:</h3>
              <div className="flex justify-between items-center">
                <span>Plano {selectedPlan.name}</span>
                <span className="font-semibold">R$ {selectedPlan.price}/mês</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                Um email de confirmação foi enviado para você com todos os detalhes da sua assinatura.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link href="/dashboard">
                    Acessar Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/planos">Ver outros planos</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
