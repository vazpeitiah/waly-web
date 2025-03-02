import { useState, ReactNode } from 'react'

import ConfirmDialog from '@/components/confirm-dialog/confirm-dialog'
import { ConfirmContext } from '@/hooks/use-confirm'
import { ConfirmParams } from '@/utils/types'

const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [resolveFn, setResolveFn] = useState<(value: boolean) => void>()
  const [confirmParams, setConfirmParams] = useState<ConfirmParams | null>(null)

  const confirm = (params: ConfirmParams): Promise<boolean> => {
    setConfirmParams(params)
    setIsOpen(true)
    return new Promise((resolve) => {
      setResolveFn(() => resolve)
    })
  }

  const handleConfirm = () => {
    setIsOpen(false)
    resolveFn?.(true)
  }

  const handleCancel = () => {
    setIsOpen(false)
    resolveFn?.(false)
  }

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <ConfirmDialog
        isOpen={isOpen}
        title={confirmParams?.title}
        description={confirmParams?.description}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  )
}

export default ConfirmProvider
