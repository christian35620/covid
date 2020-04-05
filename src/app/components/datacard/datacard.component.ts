import { Component, OnInit, Input, AfterViewInit } from "@angular/core"
import { CovidService } from "src/app/services/covid.service"

@Component({
    selector: "app-datacard",
    templateUrl: "./datacard.component.html",
    styleUrls: ["./datacard.component.scss"],
})
export class DatacardComponent implements OnInit {
    private _showCountry: string = ""
    confirmedCases: any
    loading: boolean
    error: boolean
    warning: boolean = false
    mensajeError: string
    iniciar: boolean

    get showCountry(): string {
        return this._showCountry
    }

    @Input()
    set showCountry(value: string) {
        this._showCountry = value
        this.loading = true
        this.error = false
        this.warning = false
        this.iniciar = false
        if (value) {
            this.covid
                .getCountryConfirmed(this.showCountry) //
                .subscribe(
                    (data) => {
                        this.confirmedCases = data
                        this.loading = false
                        if (data === undefined) {
                            this.mensajeError = "There is no data for this country"
                            this.warning = true
                        }
                    },
                    (errorServicio) => {
                        this.error = true
                        this.loading = false
                        this.mensajeError = "No server connection"
                    }
                )
        } else {
            this.mensajeError = "Select a country to see COVID-19 confirmed cases"
            this.loading = false
            this.iniciar = true
        }
    }

    constructor(private covid: CovidService) {}

    ngOnInit(): void {}
}
