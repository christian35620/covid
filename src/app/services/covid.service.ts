import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { CountryReport, CountryReportAdapter, CountryApi } from "../model/country-report.model"

import { map, tap, shareReplay, switchMap } from "rxjs/operators"
import { Observable, of, timer } from "rxjs"

const CACHE_SIZE = 1
const REFRESH_INTERVAL = 600000 //retrieve data every 10min
@Injectable({
    providedIn: "root",
})
export class CovidService {
    private countries: CountryApi[]

    constructor(private http: HttpClient, private adapter: CountryReportAdapter) {
        console.log("servicio listo")
    }

    getQuery(query: string) {
        const url = `https://api.covid19api.com/${query}`
        // const url = `http://localhost:3000/${query}`
        return this.http.get(url)
    }

    getCountriesSummary(): Observable<CountryApi[]> {
        if (!this.countries) {
            // Set up timer that ticks every X milliseconds
            const timer$ = timer(0, REFRESH_INTERVAL)

            // For each tick make an http request to fetch new data
            return timer$.pipe(
                switchMap(() => this.getSummary()),
                tap((items) => (this.countries = items)),
                shareReplay(CACHE_SIZE)
            )
        }

        return of(this.countries)
    }

    getSummary(): Observable<CountryApi[]> {
        return this.getQuery(`summary`) //
            .pipe(map((item: any) => item.Countries))
    }

    // getCountryConfirmed(country: string): Observable<CountryReport> {
    //     return this.getQuery(`live/country/${country}/status/confirmed`) //
    //         .pipe(map((data: any[]) => data.map((item) => this.adapter.adapt(item))[data.length - 1]))
    // }
}
