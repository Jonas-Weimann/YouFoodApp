import { useState } from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({ defaultValue }) {
  const [date, setDate] = useState(defaultValue || null)

  return (
    <Popover>
      <PopoverTrigger aschild={true}>
        <Button
          variant="outline"
          data-empty={!date}
          className="justify-between text-left font-normal w-full text-(--accent) border-(--accent) transition-colors"
        >
          {date ? format(date, "PPP", {locale: es}) : <span>Elige una fecha</span>}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-15 rounded-lg border bg-(--background-light) text-(--text)" >
        <Calendar
          mode="single"
          locale={es}
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
          classNames={{day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 rounded-md transition-colors"}}
        />
      </PopoverContent>
    </Popover>
  )
}
