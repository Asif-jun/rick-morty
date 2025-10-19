// src/common/hooks/useFetch.ts
import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'

export type ErrorType = 'network' | 'notFound' | null

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorType, setErrorType] = useState<ErrorType>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setErrorType(null)

    axios
      .get<T>(url)
      .then(res => {
        if (!cancelled) {
          setData(res.data)
          setErrorType(null)
        }
      })
      .catch((err: unknown) => {
        if (cancelled) return
        const ax = err as AxiosError<{ error?: string }>
        if (ax?.response?.status === 404) {
          setErrorType('notFound')
        } else {
          setErrorType('network')
        }
        setData(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [url])

  return { data, loading, errorType }
}
