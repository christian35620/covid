import { Component, OnInit, OnDestroy } from "@angular/core"
import { CovidService } from "src/app/services/covid.service"
import { ActivatedRoute } from "@angular/router"
import { Subscription } from "rxjs"
import { CountryApi, CountryReport, CountryReportAdapter } from "src/app/model/country-report.model"

@Component({
    selector: "app-datacard",
    templateUrl: "./datacard.component.html",
    styleUrls: ["./datacard.component.scss"],
})
export class DatacardComponent implements OnInit, OnDestroy {
    private suscription: Subscription
    countries: CountryApi[]
    countryReport: CountryReport

    confirmedCases: any
    iniciar: boolean
    showCountry: boolean
    loading: boolean
    error: boolean
    warning: boolean
    mensajeError: string
    summary: any[] = []

    constructor(private covid: CovidService, private router: ActivatedRoute, private adapter: CountryReportAdapter) {}

    ngOnInit(): void {
        this.stateHandler("init")
        this.suscription = this.covid.getCountriesSummary().subscribe((countries: CountryApi[]) => {
            this.countries = countries

            this.router.params.subscribe((params) => {
                if (Object.keys(params).length !== 0) {
                    this.confirmedCases = this.getCountrySummary(params.country)
                    this.stateHandler("data")
                } else if (Object.keys(params).length === 0) {
                    this.stateHandler("init")
                }
            })
        })
    }

    ngOnDestroy() {
        this.suscription.unsubscribe()
    }

    // getConfirmed(country): object {
    //     return this.summary.filter((pais) => pais.Slug === country).map((item) => ({ country: item.Country, confirmed: item.TotalConfirmed, date: item.Date }))[0]
    // }

    getCountrySummary(countryName: string): CountryReport {
        this.stateHandler("loading")
        if (this.countries) {
            const foundCountry = this.countries.find((country) => country.Slug === countryName)
            return this.adapter.adapt(foundCountry)
        }
    }

    stateHandler(state: string) {
        switch (state) {
            case "init":
                this.loading = false
                this.error = false
                this.warning = false
                this.iniciar = true
                this.mensajeError = "Select a country to see COVID-19 confirmed cases"
                this.showCountry = false

                break

            case "loading":
                this.loading = true
                this.error = false
                this.warning = false
                this.iniciar = false
                this.mensajeError = ""
                this.showCountry = false

                break

            case "data":
                this.loading = false
                this.error = false
                this.warning = false
                this.iniciar = false
                this.mensajeError = ""
                this.showCountry = true

                break

            case "error":
                this.loading = false
                this.error = true
                this.warning = false
                this.iniciar = false
                this.mensajeError = "There was an error conecting to the server"
                this.showCountry = false

                break

            case "warning":
                this.loading = false
                this.error = false
                this.warning = true
                this.iniciar = false
                this.mensajeError = "There is no data for this country"
                this.showCountry = false

                break

            default:
                break
        }
    }
}
