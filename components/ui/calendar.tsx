"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = {
  className?: string;
  classNames?: Record<string, string>;
  onDateRangeChange?: (startDate: Date, endDate: Date) => void;
}

function Calendar({
  className,
  classNames,
  onDateRangeChange,
}: CalendarProps) {
  const [startDate, setStartDate] = React.useState<string | null>(null)
  const [endDate, setEndDate] = React.useState<string | null>(null)

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value)
    if (onDateRangeChange && e.target.value && endDate) {
      onDateRangeChange(new Date(e.target.value), new Date(endDate))
    }
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value)
    if (onDateRangeChange && startDate && e.target.value) {
      onDateRangeChange(new Date(startDate), new Date(e.target.value))
    }
  }

  return (
    <div className={cn("p-5", className)}>
      <div className="flex items-center space-x-2">
        <div className="flex flex-col w-1/2">
          <label htmlFor="startDate" className="text-sm font-medium text-gray-700">Date de début</label>
          <input
            id="startDate"
            type="date"
            value={startDate || ""}
            onChange={handleStartDateChange}
            className={cn("p-2 border rounded-md")}
          />
        </div>
        
        <div className="flex flex-col w-1/2">
          <label htmlFor="endDate" className="text-sm font-medium text-gray-700">Date de fin</label>
          <input
            id="endDate"
            type="date"
            value={endDate || ""}
            onChange={handleEndDateChange}
            className={cn("p-2 border rounded-md")}
          />
        </div>
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }