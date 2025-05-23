"use client"

import * as React from "react"
import { format, isBefore, startOfDay } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/app/_shared/lib/utils"
import { Button } from "@/app/_shared/ui/button"
import { Calendar } from "@/app/_shared/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_shared/ui/popover"

interface DatePickerProps {
  value: Date | null
  onChange: (date: Date | undefined) => void
  disabled?: boolean
  className?: string
}

export function DatePicker({ value, onChange, disabled, className }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = React.useCallback((date: Date | undefined) => {
    onChange(date)
    // Only close the popover if a date was actually selected
    if (date) {
      setOpen(false)
    }
  }, [onChange])

  // Disable all dates before today
  const disabledDays = React.useMemo(() => {
    const today = startOfDay(new Date())
    return { before: today }
  }, [])

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>اختر التاريخ</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0" 
        align="start"
        side="bottom"
        sideOffset={4}
        style={{ zIndex: 9999 }}
        onInteractOutside={(e) => {
          // Prevent closing when clicking inside the calendar
          if (e.target instanceof HTMLElement && e.target.closest('.rdp')) {
            e.preventDefault()
          }
        }}
      >
        <Calendar
          mode="single"
          selected={value ?? undefined}
          onSelect={handleSelect}
          initialFocus
          disabled={disabled ? true : disabledDays}
          className="rounded-lg border border-gray-200/50 dark:border-gray-800/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"
        />
      </PopoverContent>
    </Popover>
  )
}
