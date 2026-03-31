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

export function DatePicker({ selected, onSelect }) {

  return (
    <Popover>
      <PopoverTrigger aschild={true}>
        <Button
          variant="outline"
          data-empty={!selected}
          className="justify-between text-left font-normal w-full text-(--accent) border-(--accent) transition-colors"
        >
          {selected ? format(selected, "PPP", {locale: es}) : <span>Elige una fecha</span>}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-15 rounded-lg border bg-(--background-light) text-(--text)" >
        <Calendar
          mode="single"
          locale={es}
          selected={selected}
          onSelect={onSelect}
          defaultMonth={selected}
          classNames={{day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 rounded-md transition-colors"}}
        />
      </PopoverContent>
    </Popover>
  )
}
