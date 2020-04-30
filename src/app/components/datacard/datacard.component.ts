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
        this.stateInit()
        this.suscription = this.covid.getCountriesSummary().subscribe((countries: CountryApi[]) => {
            this.countries = countries

            this.router.params.subscribe((params) => {
                if (Object.keys(params).length !== 0) {
                    this.confirmedCases = this.getCountrySummary(params.country)
                    this.stateSuccesful()
                } else {
                    this.stateInit()
                }
            })
        })
    }

    ngOnDestroy() {
        this.suscription.unsubscribe()
    }

    getCountrySummary(countryName: string): CountryReport {
        this.stateLoading()
        if (this.countries) {
            const foundCountry = this.countries.find((country) => country.Slug === countryName)
            return this.adapter.adapt(foundCountry)
        }
    }

    stateInit() {
        this.loading = false
        this.error = false
        this.warning = false
        this.iniciar = true
        this.mensajeError = "Select a country to see COVID-19 confirmed cases"
        this.showCountry = false
    }

    stateLoading() {
        this.loading = true
        this.error = false
        this.warning = false
        this.iniciar = false
        this.mensajeError = ""
        this.showCountry = false
    }

    stateError() {
        this.loading = false
        this.error = true
        this.warning = false
        this.iniciar = false
        this.mensajeError = "There was an error conecting to the server"
        this.showCountry = false
    }

    stateWarning() {
        this.loading = false
        this.error = false
        this.warning = true
        this.iniciar = false
        this.mensajeError = "There is no data for this country"
        this.showCountry = false
    }

    stateSuccesful() {
        this.loading = false
        this.error = false
        this.warning = false
        this.iniciar = false
        this.mensajeError = ""
        this.showCountry = true
    }
}
