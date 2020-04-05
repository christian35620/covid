import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

import { map } from "rxjs/operators"

@Injectable({
    providedIn: "root",
})
export class CovidService {
    constructor(private http: HttpClient) {
        console.log("servicio listo")
    }

    getQuery(query: string) {
        const url = `https://api.covid19api.com/${query}`

        return this.http.get(url)
    }

    getCountries() {
        return this.getQuery("countries") //
    }

    getCountryConfirmed(country: string) {
        return this.getQuery(`live/country/${country}/status/confirmed`) //2020-04-03T06:31:30.441Z
            .pipe(map((data: any) => data[data.length - 1]))
    }
}
