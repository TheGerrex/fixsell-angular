import { Printer } from "./printer.interface";

export interface Deal {
  id: number;
  printer: Printer;
  dealEndDate: Date;
  dealStartDate: Date;
  dealPrice: number;
  dealDiscountPercentage: number;
  dealDescription: string;
}