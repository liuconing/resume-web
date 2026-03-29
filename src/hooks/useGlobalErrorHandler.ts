export interface GlobalError {
  ok: boolean
  code: string
  message: any
  detail: string
}

export const handleGlobalError = (error: GlobalError) => {
  return
}
