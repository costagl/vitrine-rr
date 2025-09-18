"use client"

import { useState, useEffect } from "react"

const REMEMBER_ME_KEY = "vitrine_remember_me"
const REMEMBERED_EMAIL_KEY = "vitrine_remembered_email"

export function useRememberMe() {
  const [rememberMe, setRememberMe] = useState(false)
  const [rememberedEmail, setRememberedEmail] = useState("")

  useEffect(() => {
    // Carregar configurações salvas ao montar o componente
    const savedRememberMe = localStorage.getItem(REMEMBER_ME_KEY) === "true"
    const savedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY) || ""

    setRememberMe(savedRememberMe)
    if (savedRememberMe && savedEmail) {
      setRememberedEmail(savedEmail)
    }
  }, [])

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked)

    if (checked) {
      localStorage.setItem(REMEMBER_ME_KEY, "true")
    } else {
      // Se desmarcar, limpar dados salvos
      localStorage.removeItem(REMEMBER_ME_KEY)
      localStorage.removeItem(REMEMBERED_EMAIL_KEY)
      setRememberedEmail("")
    }
  }

  const saveEmailIfRemembered = (email: string) => {
    if (rememberMe) {
      localStorage.setItem(REMEMBERED_EMAIL_KEY, email)
      setRememberedEmail(email)
    }
  }

  const clearRememberedData = () => {
    localStorage.removeItem(REMEMBER_ME_KEY)
    localStorage.removeItem(REMEMBERED_EMAIL_KEY)
    setRememberMe(false)
    setRememberedEmail("")
  }

  return {
    rememberMe,
    rememberedEmail,
    handleRememberMeChange,
    saveEmailIfRemembered,
    clearRememberedData,
  }
}
