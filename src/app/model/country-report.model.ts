import { Injectable } from "@angular/core"
import { Adapter } from "../model/adapter"

export interface CountryApi {
    Country: string //
    CountryCode: string
    Slug: string
    NewConfirmed: number
    TotalConfirmed: number
    NewDeaths: number
    TotalDeaths: number
    NewRecovered: number
    TotalRecovered: number
    Date: string
}

export class CountryReport {
    constructor(
        public country: string, //
        public date: string,
        public confirmed: number
    ) {}
}

@Injectable({
    providedIn: "root",
})
export class CountryReportAdapter implements Adapter<CountryReport> {
    adapt(item: any): CountryReport {
        return new CountryReport(item.Country, item.Date, item.TotalConfirmed) //cambiar propiedades cuando hay cambio en API
    }
}
