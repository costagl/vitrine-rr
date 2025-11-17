"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import { StepPersonalInfo } from "@/components/form/step-personal-info"
import { StepStoreInfo } from "@/components/form/step-store-info"
import { StepCredentials } from "@/components/form/step-credentials"
import { useMultiStepForm } from "@/hooks/use-multi-step-form"
import { useFormHandlers } from "@/hooks/use-form-handlers"
import { Interface } from "readline"

export default function MultiStepForm() {
  const {
    step,
    formData,
    errors,
    attempted,
    isSubmitting,
    setFormData,
    setErrors,
    handleNext,
    handleBack,
    handleSubmit,
  } = useMultiStepForm()

  const { handleChange, handleCPFOrCNPJChange, handlePhoneChange, handleSelectChange } = useFormHandlers(
    formData,
    setFormData,
    setErrors,
  )

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Cadastro de Usuário"
      case 2:
        return "Informações da Loja"
      case 3:
        return "Credenciais de Acesso"
      default:
        return "Cadastro"
    }
  }

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Preencha suas informações pessoais"
      case 2:
        return "Informe os dados da sua loja"
      case 3:
        return "Configure suas credenciais de acesso"
      default:
        return ""
    }
  }

  const stepProps = {
    formData,
    errors,
    attempted,
    onChange: handleChange,
    onSelectChange: handleSelectChange,
    onCPFOrCNPJChange: handleCPFOrCNPJChange,
    onPhoneChange: handlePhoneChange,
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="bg-white">
            <CardTitle className="text-2xl">{getStepTitle()}</CardTitle>
            <CardDescription>{getStepDescription()}</CardDescription>
          </CardHeader>

          <CardContent className="relative overflow-hidden p-0">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${(step - 1) * 100}%)` }}
            >
              <StepPersonalInfo {...stepProps} />
              <StepStoreInfo {...stepProps} />
              <StepCredentials {...stepProps} />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t p-6">
            {step > 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
                  Voltar
                </Button>
              </motion.div>
            )}

            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={step === 1 ? "ml-auto" : ""}
            >
              {step < 3 ? (
                <Button onClick={handleNext} disabled={isSubmitting}>
                  Prosseguir
                </Button>
              ) : (
                <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                </Button>
              )}
            </motion.div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
