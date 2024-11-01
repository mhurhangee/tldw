import { Button } from '@/components/ui/button'

interface AnalysisOptionsProps {
  onOptionSelect: (option: string) => void
  disabled: boolean
}

export default function AnalysisOptions({ onOptionSelect, disabled }: AnalysisOptionsProps) {
  const options = ['Summary', 'Key Points', 'Main Message']

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Analysis Options</h2>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onOptionSelect(option)}
            variant="outline"
            disabled={disabled}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}