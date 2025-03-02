import { ConfirmParams } from '@/utils/types'
import { createContext, useContext } from 'react'

interface ConfirmContextType {
  confirm: (params: ConfirmParams) => Promise<boolean>
}

export const ConfirmContext = createContext<ConfirmContextType | null>(null)

export function useConfirm() {
  const context = useContext(ConfirmContext)
  if (!context) {
    throw new Error('useConfirm debe usarse dentro de ConfirmProvider')
  }
  return context
}
