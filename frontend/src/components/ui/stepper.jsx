import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function QuantityStepper({ value, onChange }) {
  const incrementar = () => onChange(value + 1)
  const decrementar = () => {
    if (value > 1) onChange(value - 1)
  }

  return (
    <div className="flex items-center gap-1 border border-(--accent-trans) rounded-lg p-0.5 w-fit">
      <Button 
        variant="ghost" 
        size="icon-xs" 
        onClick={decrementar}
        disabled={value <= 1}
        className="size-6 text-(--accent) hover:bg-(--background-light)"
      >
        <Minus />
      </Button>
      
      <Input
        type="number"
        value={value}
        onChange={(e) => {
          const val = parseInt(e.target.value)
          if (!isNaN(val) && val >= 1) onChange(val)
        }}
        className="h-6 w-10 border-0 bg-transparent text-center focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />

      <Button 
        variant="ghost" 
        size="icon-xs" 
        onClick={incrementar}
        className="size-6 text-(--accent) hover:bg-(--background-light)"
      >
        <Plus />
      </Button>
    </div>
  )
}