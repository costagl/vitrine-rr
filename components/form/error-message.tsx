import { AlertCircle } from "lucide-react"

interface ErrorMessageProps {
  message: string
  show: boolean
}

export function ErrorMessage({ message, show }: ErrorMessageProps) {
  if (!show) return null

  return (
    <div className="text-red-500 text-sm flex items-center mt-1">
      <AlertCircle className="h-4 w-4 mr-1" />
      {message}
    </div>
  )
}
