import type React from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PlanosPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Escolha o plano ideal para você
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Oferecemos diferentes opções para atender às suas necessidades. Comece
          gratuitamente e faça upgrade conforme seu negócio cresce.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Plano Básico */}
        <Card className="flex flex-col border-border">
          <CardHeader>
            <CardTitle className="text-2xl">Básico</CardTitle>
            <CardDescription>Ideal para iniciantes</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">R$29</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3">
              <PlanFeature>Até 5 produtos</PlanFeature>
              <PlanFeature>Análises básicas</PlanFeature>
              <PlanFeature>Suporte por email</PlanFeature>
              <PlanFeature>Personalização limitada</PlanFeature>
              <PlanFeature>1GB de armazenamento</PlanFeature>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/checkout?plano=basico">Começar agora</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Plano Profissional */}
        <Card className="flex flex-col relative border-primary">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
            Mais popular
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Profissional</CardTitle>
            <CardDescription>
              Perfeito para negócios em crescimento
            </CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">R$79</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3">
              <PlanFeature>Até 50 produtos</PlanFeature>
              <PlanFeature>Análises avançadas</PlanFeature>
              <PlanFeature>Suporte prioritário</PlanFeature>
              <PlanFeature>Personalização completa</PlanFeature>
              <PlanFeature>10GB de armazenamento</PlanFeature>
              <PlanFeature>Integrações com APIs</PlanFeature>
              <PlanFeature>Relatórios personalizados</PlanFeature>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/checkout?plano=profissional">Escolher plano</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Plano Empresarial */}
        <Card className="flex flex-col border-border">
          <CardHeader>
            <CardTitle className="text-2xl">Empresarial</CardTitle>
            <CardDescription>Para grandes empresas</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">R$199</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3">
              <PlanFeature>Produtos ilimitados</PlanFeature>
              <PlanFeature>Análises em tempo real</PlanFeature>
              <PlanFeature>Suporte 24/7</PlanFeature>
              <PlanFeature>Personalização avançada</PlanFeature>
              <PlanFeature>100GB de armazenamento</PlanFeature>
              <PlanFeature>API dedicada</PlanFeature>
              <PlanFeature>Relatórios avançados</PlanFeature>
              <PlanFeature>Acesso multi-usuário</PlanFeature>
              <PlanFeature>Backup automático</PlanFeature>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/checkout?plano=empresarial">Começar agora</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Precisa de algo personalizado?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Entre em contato com nossa equipe para discutir um plano que atenda
          perfeitamente às necessidades específicas da sua empresa.
        </p>
        <Button asChild variant="outline">
          <Link href="/contato">Fale conosco</Link>
        </Button>
      </div>
    </div>
  );
}

function PlanFeature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center">
      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}
