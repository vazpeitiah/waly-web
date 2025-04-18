import { renderHook, act } from '@testing-library/react'
import { useDateRange } from '../../src/hooks/use-date-range'
import { startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns'
import { DateRange } from '@/utils/types'

describe('useDateRange', () => {
  it('should initialize with the provided initial range', () => {
    const initialRange: DateRange = [
      new Date(2023, 0, 1),
      new Date(2023, 0, 31),
    ]
    const { result } = renderHook(() => useDateRange({ initialRange }))

    expect(result.current.dateRange).toEqual(initialRange)
  })

  it('should set the date range to the current month when handleCurrentMonth is called', () => {
    const { result } = renderHook(() =>
      useDateRange({ initialRange: [null, null] }),
    )

    act(() => {
      result.current.handleCurrentMonth()
    })

    const now = new Date()
    expect(result.current.dateRange).toEqual([
      startOfMonth(now),
      endOfMonth(now),
    ])
  })

  it('should set the date range to the previous month when handlePreviousMonth is called', () => {
    const initialRange: DateRange = [
      new Date(2023, 1, 1),
      new Date(2023, 1, 28),
    ]
    const { result } = renderHook(() => useDateRange({ initialRange }))

    act(() => {
      result.current.handlePreviousMonth()
    })

    const previousMonth = subMonths(initialRange[0]!, 1)
    expect(result.current.dateRange).toEqual([
      startOfMonth(previousMonth),
      endOfMonth(previousMonth),
    ])
  })

  it('should set the date range to the next month when handleNextMonth is called', () => {
    const initialRange: DateRange = [
      new Date(2023, 1, 1),
      new Date(2023, 1, 28),
    ]
    const { result } = renderHook(() => useDateRange({ initialRange }))

    act(() => {
      result.current.handleNextMonth()
    })

    const nextMonth = addMonths(initialRange[0]!, 1)
    expect(result.current.dateRange).toEqual([
      startOfMonth(nextMonth),
      endOfMonth(nextMonth),
    ])
  })

  it('should not update the date range if handlePreviousMonth is called with a null start date', () => {
    const { result } = renderHook(() =>
      useDateRange({ initialRange: [null, null] }),
    )

    act(() => {
      result.current.handlePreviousMonth()
    })

    expect(result.current.dateRange).toEqual([null, null])
  })

  it('should not update the date range if handleNextMonth is called with a null start date', () => {
    const { result } = renderHook(() =>
      useDateRange({ initialRange: [null, null] }),
    )

    act(() => {
      result.current.handleNextMonth()
    })

    expect(result.current.dateRange).toEqual([null, null])
  })
})
