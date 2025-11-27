"use client"

import { useState, useEffect } from "react"

const REMEMBER_ME_KEY = "vitrine_remember_me"
const REMEMBERED_EMAIL_KEY = "vitrine_remembered_email"

export function useRememberMe() {
  // ✅ Carrega o estado inicial diretamente no useState.
  const [rememberMe, setRememberMe] = useState(() => {
    // A função é executada apenas uma vez na primeira renderização.
    if (typeof window !== "undefined") {
      const savedRememberMe = localStorage.getItem(REMEMBER_ME_KEY) === "true"
      return savedRememberMe
    }
    return false
  })

  // ✅ Carrega o email de forma dependente do rememberMe salvo.
  const [rememberedEmail, setRememberedEmail] = useState(() => {
    if (typeof window !== "undefined") {
      const savedRememberMe = localStorage.getItem(REMEMBER_ME_KEY) === "true"
      const savedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY) || ""
    
      // Retorna o email salvo APENAS se a opção 'rememberMe' também estiver marcada.
      return savedRememberMe ? savedEmail : ""
    }
    return ""
  })
  
  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked)

    if (typeof window !== "undefined") {
      if (checked) {
        localStorage.setItem(REMEMBER_ME_KEY, "true")
      } else {
        // Se desmarcar, limpar dados salvos
        localStorage.removeItem(REMEMBER_ME_KEY)
        localStorage.removeItem(REMEMBERED_EMAIL_KEY)
        setRememberedEmail("")
      }
    }
  }

  const saveEmailIfRemembered = (email: string) => {
    if (typeof window !== "undefined" && rememberMe) {
      localStorage.setItem(REMEMBERED_EMAIL_KEY, email)
      setRememberedEmail(email)
    }
  }

  const clearRememberedData = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(REMEMBER_ME_KEY)
      localStorage.removeItem(REMEMBERED_EMAIL_KEY)
      setRememberMe(false)
      setRememberedEmail("")
    }
  }

  return {
    rememberMe,
    rememberedEmail,
    handleRememberMeChange,
    saveEmailIfRemembered,
    clearRememberedData,
  }
}
