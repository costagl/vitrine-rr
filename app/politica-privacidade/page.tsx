import Navbar from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Calendar, Lock, Eye, UserCheck, Database } from "lucide-react";

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Política de Privacidade</h1>
          <div className="flex items-center justify-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Última atualização: 15 de Janeiro de 2024</span>
            </div>
            <Badge variant="secondary">LGPD Compliant</Badge>
          </div>
        </div>

        {/* Resumo Executivo */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-800 mb-2">
                  Resumo da Nossa Política
                </h3>
                <p className="text-green-700 mb-3">
                  Respeitamos sua privacidade e estamos comprometidos com a
                  proteção de seus dados pessoais. Esta política explica como
                  coletamos, usamos e protegemos suas informações.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span>Dados criptografados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>Transparência total</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    <span>Controle do usuário</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* 1. Informações Gerais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                1. Informações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                A Vitrine Tecnologia Ltda., inscrita no CNPJ 00.000.000/0001-00,
                com sede na R. Virgulino José de Oliveira, 74, Resende-RJ, é a
                controladora dos dados pessoais coletados através da plataforma
                Vitrine.
              </p>
              <p>
                Esta política está em conformidade com a Lei Geral de Proteção
                de Dados (LGPD) e demais regulamentações aplicáveis sobre
                proteção de dados pessoais.
              </p>
            </CardContent>
          </Card>

          {/* 2. Dados Coletados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                2. Dados que Coletamos
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h4>2.1 Dados Fornecidos Diretamente</h4>
              <ul>
                <li>
                  <strong>Dados de cadastro:</strong> Nome, email, CPF/CNPJ,
                  telefone, data de nascimento
                </li>
                <li>
                  <strong>Dados da loja:</strong> Nome da loja, categoria,
                  descrição, endereço
                </li>
                <li>
                  <strong>Dados de pagamento:</strong> Informações bancárias
                  para recebimento
                </li>
                <li>
                  <strong>Conteúdo:</strong> Produtos, imagens, descrições
                  publicadas na loja
                </li>
              </ul>

              <h4>2.2 Dados Coletados Automaticamente</h4>
              <ul>
                <li>
                  <strong>Dados de navegação:</strong> IP, navegador, sistema
                  operacional
                </li>
                <li>
                  <strong>Cookies:</strong> Preferências, sessão, análise de uso
                </li>
                <li>
                  <strong>Logs de acesso:</strong> Horários, páginas visitadas,
                  ações realizadas
                </li>
                <li>
                  <strong>Dados de performance:</strong> Velocidade de
                  carregamento, erros
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 3. Finalidades do Tratamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                3. Como Usamos Seus Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h4>3.1 Prestação de Serviços</h4>
              <ul>
                <li>Criar e manter sua conta na plataforma</li>
                <li>Processar pagamentos e transações</li>
                <li>Fornecer suporte técnico e atendimento</li>
                <li>Personalizar sua experiência na plataforma</li>
              </ul>

              <h4>3.2 Comunicação</h4>
              <ul>
                <li>Enviar notificações sobre pedidos e vendas</li>
                <li>Comunicar atualizações da plataforma</li>
                <li>Responder dúvidas e solicitações</li>
                <li>Enviar newsletters (com seu consentimento)</li>
              </ul>

              <h4>3.3 Melhorias e Análises</h4>
              <ul>
                <li>Analisar uso da plataforma para melhorias</li>
                <li>Desenvolver novos recursos e funcionalidades</li>
                <li>Realizar pesquisas de satisfação</li>
                <li>Gerar estatísticas agregadas e anônimas</li>
              </ul>
            </CardContent>
          </Card>

          {/* 4. Base Legal */}
          <Card>
            <CardHeader>
              <CardTitle>4. Base Legal para o Tratamento</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Tratamos seus dados pessoais com base nas seguintes hipóteses
                legais:
              </p>
              <ul>
                <li>
                  <strong>Execução de contrato:</strong> Para prestação dos
                  serviços contratados
                </li>
                <li>
                  <strong>Consentimento:</strong> Para comunicações de marketing
                  e cookies não essenciais
                </li>
                <li>
                  <strong>Legítimo interesse:</strong> Para melhorias da
                  plataforma e prevenção de fraudes
                </li>
                <li>
                  <strong>Cumprimento de obrigação legal:</strong> Para atender
                  exigências fiscais e regulatórias
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 5. Compartilhamento de Dados */}
          <Card>
            <CardHeader>
              <CardTitle>5. Compartilhamento de Dados</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h4>5.1 Quando Compartilhamos</h4>
              <p>
                Seus dados podem ser compartilhados nas seguintes situações:
              </p>
              <ul>
                <li>
                  <strong>Prestadores de serviço:</strong> Gateways de
                  pagamento, correios, hospedagem
                </li>
                <li>
                  <strong>Obrigações legais:</strong> Autoridades competentes
                  quando exigido por lei
                </li>
                <li>
                  <strong>Proteção de direitos:</strong> Para proteger nossos
                  direitos e de terceiros
                </li>
                <li>
                  <strong>Transações corporativas:</strong> Em caso de fusão,
                  aquisição ou venda
                </li>
              </ul>

              <h4>5.2 Proteções Aplicadas</h4>
              <p>Quando compartilhamos dados, garantimos:</p>
              <ul>
                <li>Contratos de proteção de dados com terceiros</li>
                <li>Compartilhamento apenas do necessário</li>
                <li>Verificação das práticas de segurança dos parceiros</li>
                <li>Monitoramento do uso adequado dos dados</li>
              </ul>
            </CardContent>
          </Card>

          {/* 6. Segurança */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                6. Segurança dos Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h4>6.1 Medidas Técnicas</h4>
              <ul>
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Firewalls e sistemas de detecção de intrusão</li>
                <li>Backups regulares e seguros</li>
                <li>Atualizações constantes de segurança</li>
              </ul>

              <h4>6.2 Medidas Organizacionais</h4>
              <ul>
                <li>Treinamento regular da equipe sobre privacidade</li>
                <li>Controle de acesso baseado em necessidade</li>
                <li>Políticas internas de proteção de dados</li>
                <li>Auditorias periódicas de segurança</li>
              </ul>
            </CardContent>
          </Card>

          {/* 7. Retenção de Dados */}
          <Card>
            <CardHeader>
              <CardTitle>7. Retenção de Dados</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>Mantemos seus dados pelo tempo necessário para:</p>
              <ul>
                <li>
                  <strong>Conta ativa:</strong> Durante toda a vigência da conta
                </li>
                <li>
                  <strong>Dados fiscais:</strong> 5 anos após o encerramento
                  (obrigação legal)
                </li>
                <li>
                  <strong>Logs de segurança:</strong> 6 meses para investigação
                  de incidentes
                </li>
                <li>
                  <strong>Dados de marketing:</strong> Até a retirada do
                  consentimento
                </li>
              </ul>
              <p>
                Após os prazos de retenção, os dados são excluídos de forma
                segura e irreversível.
              </p>
            </CardContent>
          </Card>

          {/* 8. Seus Direitos */}
          <Card>
            <CardHeader>
              <CardTitle>8. Seus Direitos</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>Conforme a LGPD, você tem os seguintes direitos:</p>
              <ul>
                <li>
                  <strong>Acesso:</strong> Saber quais dados temos sobre você
                </li>
                <li>
                  <strong>Correção:</strong> Corrigir dados incompletos ou
                  incorretos
                </li>
                <li>
                  <strong>Exclusão:</strong> Solicitar a remoção de seus dados
                </li>
                <li>
                  <strong>Portabilidade:</strong> Receber seus dados em formato
                  estruturado
                </li>
                <li>
                  <strong>Oposição:</strong> Se opor ao tratamento em certas
                  situações
                </li>
                <li>
                  <strong>Revogação:</strong> Retirar consentimento a qualquer
                  momento
                </li>
              </ul>
              <p>
                Para exercer seus direitos, entre em contato através do email:
                <strong>privacidade@vitrine.com.br</strong>
              </p>
            </CardContent>
          </Card>

          {/* 9. Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>9. Cookies e Tecnologias Similares</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h4>9.1 Tipos de Cookies</h4>
              <ul>
                <li>
                  <strong>Essenciais:</strong> Necessários para funcionamento da
                  plataforma
                </li>
                <li>
                  <strong>Performance:</strong> Para análise de uso e melhorias
                </li>
                <li>
                  <strong>Funcionais:</strong> Para lembrar preferências do
                  usuário
                </li>
                <li>
                  <strong>Marketing:</strong> Para personalização de anúncios
                  (com consentimento)
                </li>
              </ul>

              <h4>9.2 Gerenciamento</h4>
              <p>
                Você pode gerenciar cookies através das configurações do seu
                navegador ou através do nosso painel de preferências de cookies.
              </p>
            </CardContent>
          </Card>

          {/* 10. Transferência Internacional */}
          <Card>
            <CardHeader>
              <CardTitle>10. Transferência Internacional</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Alguns de nossos prestadores de serviço podem estar localizados
                fora do Brasil. Quando isso ocorre, garantimos:
              </p>
              <ul>
                <li>Adequação do país de destino às normas de proteção</li>
                <li>Cláusulas contratuais padrão de proteção</li>
                <li>Certificações internacionais de segurança</li>
                <li>Monitoramento contínuo da conformidade</li>
              </ul>
            </CardContent>
          </Card>

          {/* 11. Menores de Idade */}
          <Card>
            <CardHeader>
              <CardTitle>11. Menores de Idade</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Nossa plataforma não é destinada a menores de 18 anos. Não
                coletamos intencionalmente dados de menores sem autorização dos
                responsáveis legais.
              </p>
              <p>
                Se tomarmos conhecimento de que coletamos dados de menores sem
                autorização, tomaremos medidas para excluir essas informações.
              </p>
            </CardContent>
          </Card>

          {/* 12. Alterações */}
          <Card>
            <CardHeader>
              <CardTitle>12. Alterações nesta Política</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Esta política pode ser atualizada periodicamente. Quando isso
                ocorrer:
              </p>
              <ul>
                <li>Notificaremos através da plataforma ou email</li>
                <li>Destacaremos as principais mudanças</li>
                <li>Manteremos versões anteriores disponíveis</li>
                <li>Respeitaremos direitos adquiridos</li>
              </ul>
            </CardContent>
          </Card>

          {/* 13. Contato */}
          <Card>
            <CardHeader>
              <CardTitle>13. Contato e DPO</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h4>13.1 Encarregado de Dados (DPO)</h4>
              <p>
                Nosso Encarregado de Proteção de Dados pode ser contatado
                através do email:
                <strong>dpo@vitrine.com.br</strong>
              </p>

              <h4>13.2 Outros Contatos</h4>
              <ul>
                <li>
                  <strong>Dúvidas gerais:</strong> privacidade@vitrine.com.br
                </li>
                <li>
                  <strong>Exercício de direitos:</strong>{" "}
                  direitos@vitrine.com.br
                </li>
                <li>
                  <strong>Incidentes de segurança:</strong>{" "}
                  seguranca@vitrine.com.br
                </li>
              </ul>

              <h4>13.3 Autoridade Nacional</h4>
              <p>
                Você também pode contatar a Autoridade Nacional de Proteção de
                Dados (ANPD) através do site: <strong>gov.br/anpd</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
