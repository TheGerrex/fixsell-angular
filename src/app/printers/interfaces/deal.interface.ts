import { Consumible } from './consumible.interface';
import { Printer } from './printer.interface';

export interface Deal {
  id: number;
  printer: Printer;
  consumible: Consumible;
  dealEndDate: Date;
  dealStartDate: Date;
  dealPrice: number;
  dealCurrency: string;
  dealDiscountPercentage: number;
  dealDescription: string;
}

// events
export interface EventData {
  id: string;
  image: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  deals: Deal; // Array of Deal IDs
}
