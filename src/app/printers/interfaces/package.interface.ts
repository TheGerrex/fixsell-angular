import { Printer } from "./printer.interface";


export interface Package {
    id: number;
    printer: Printer;
    packageDuration: number;
    packageMonthlyPrice: number;
    packageCurrency: string;
    packageEndDate: Date;
    packageStartDate: Date;
    packageDiscountPercentage: number;
    packageDescription: string;
    packagePrintsBw: number;
    packagePrintsColor: number;
    packageExtraClickPriceBw: number;
    packageExtraClickPriceColor: number;
    packageDepositPrice: number;
    packageIncludes: string[];
}