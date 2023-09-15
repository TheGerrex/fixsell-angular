export interface Printer {
    _id: Object
    brand: string
    model: string
    img_url: string[]
    datasheet_url: string
    description: string
    price: number
    category: string
    color: boolean
    rentable: boolean
    functions: string
    powerConsumption: string
    dimensions: string
    printVelocity: string
    maxPrintSize: string
    maxPrintSizeSimple: string
    PrintSize: string
    maxPaperWeight: string
    duplexUnit: boolean
    paperSizes: string
    applicableOS: string
  }