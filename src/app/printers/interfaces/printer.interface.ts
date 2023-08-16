export interface Printer {
    _id: Object
    brand: string
    model: string
    img_url: string[]
    description: string
    price: number
    category: string
    color: boolean
    rentable: boolean
    powerConsumption: string
    dimensions: string
    printVelocity: string
    maxPrintSize: string
    maxPrintSizeSimple: string
    maxPaperWeight: string
    duplexUnit: boolean
    paperSizes: string
    applicableOS: string
  }