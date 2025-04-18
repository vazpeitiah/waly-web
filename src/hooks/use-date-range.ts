import { useState } from 'react'
import { startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns'
import { DateRange } from '@/utils/types'

export function useDateRange({
  initialRange = [null, null],
}: {
  initialRange: DateRange
}) {
  const [dateRange, setDateRange] = useState<DateRange>(initialRange)

  const handleCurrentMonth = () => {
    const now = new Date()
    setDateRange([startOfMonth(now), endOfMonth(now)])
  }

  const handlePreviousMonth = () => {
    const [start] = dateRange
    if (!start) return
    const previous = subMonths(start, 1)
    setDateRange([startOfMonth(previous), endOfMonth(previous)])
  }

  const handleNextMonth = () => {
    const [start] = dateRange
    if (!start) return
    const next = addMonths(start, 1)
    setDateRange([startOfMonth(next), endOfMonth(next)])
  }

  return {
    dateRange,
    setDateRange,
    handleCurrentMonth,
    handlePreviousMonth,
    handleNextMonth,
  }
}
