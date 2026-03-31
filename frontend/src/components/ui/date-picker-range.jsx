"use client"

import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const DatePickerWithRange = ({ date, setDate, onSelect }) => {
    const [tempDate, setTempDate] = useState(date);
    useEffect(() => {
        setTempDate(date);
    }, [date]);
  return (
    <Field className=" w-60 text-(--text) h-full flex align-middle justify-center flex-col">
      <Popover
        onOpenChange={(open) => {
          if (!open) {
            setDate(tempDate);
            onSelect(date?.from, date?.to);
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-range"
            className="justify-start px-2.5 font-normal bg-(--background-light) text-(--text) w-full"
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd MMM, y", { locale: es })} -{" "}
                  {format(date.to, "dd MMM, y", { locale: es })}
                </>
              ) : (
                format(date.from, "dd MMM, y", {locale: es})
              )
            ) : (
              <span>Elija un rango de fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-(--background-light) text-(--text)" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            locale={es}
            classNames={{day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 rounded-md transition-colors"}}
            className="z-15 top-10 left-10 rounded-lg"
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
