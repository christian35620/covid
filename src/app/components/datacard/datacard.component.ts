import { Component, OnInit, OnDestroy } from "@angular/core"
import { CovidService } from "src/app/services/covid.service"
import { ActivatedRoute } from "@angular/router"
import { Subscription } from "rxjs"
import { CountryApi, CountryReport, CountryReportAdapter } from "src/app/model/country-report.model"
import { StateHandlerService } from "src/app/services/state-handler.service"

@Component({
    selector: "app-datacard",
    templateUrl: "./datacard.component.html",
    styleUrls: ["./datacard.component.scss"],
})
export class DatacardComponent implements OnInit, OnDestroy {
    private suscription: Subscription
    countries: CountryApi[]
    countryReport: CountryReport

    get iniciar(): boolean {
        return this.state.iniciar
    }

    get loading(): boolean {
        return this.state.loading
    }

    get showCountry(): boolean {
        return this.state.showCountry
    }

    get warning(): boolean {
        return this.state.warning
    }
    get error(): boolean {
        return this.state.error
    }
    get mensajeError(): string {
        return this.state.mensajeError
    }

    constructor(
        private covid: CovidService, //
        private state: StateHandlerService,
        private router: ActivatedRoute,
        private adapter: CountryReportAdapter
    ) {}

    ngOnInit(): void {
        this.state.Init()
        this.subscribeToCountriesService()
    }

    subscribeToCountriesService() {
        this.suscription = this.covid.getCountriesSummary().subscribe((countries: CountryApi[]) => {
            this.countries = countries
            this.getCountryForRouteParams()
        })
    }

    getCountryForRouteParams() {
        this.router.params.subscribe((params) => {
            if (Object.keys(params).length !== 0) {
                this.countryReport = this.getCountrySummary(params.country)
                this.state.Succesful()
            } else {
                this.state.Init()
            }
        })
    }

    getCountrySummary(countryName: string): CountryReport {
        this.state.Loading()
        if (this.countries) {
            const foundCountry = this.countries.find((country) => country.Slug === countryName)
            return this.adapter.adapt(foundCountry)
        }
    }

    ngOnDestroy() {
        this.suscription.unsubscribe()
    }
}
