export interface MachineType {
  id: string
  name: string
  icon: string
  description: string
  retrofitCapabilities: string[]
}

export interface ProcessStep {
  step: number
  title: string
  description: string
  icon: string
}

export interface ComparisonData {
  oldImage: string
  newImage: string
  oldLabel: string
  newLabel: string
  features: {
    old: string[]
    new: string[]
  }
}

export interface ValueProposition {
  title: string
  value: string
  description: string
  benefits: string[]
}
