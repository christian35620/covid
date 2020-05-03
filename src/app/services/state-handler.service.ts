import { Injectable } from "@angular/core"

@Injectable({
    providedIn: "root",
})
export class StateHandlerService {
    iniciar: boolean
    showCountry: boolean
    loading: boolean
    error: boolean
    warning: boolean
    mensajeError: string

    constructor() {}

    Init() {
        this.loading = false
        this.error = false
        this.warning = false
        this.iniciar = true
        this.mensajeError = "Select a country to see COVID-19 confirmed cases"
        this.showCountry = false
    }

    Loading() {
        this.loading = true
        this.error = false
        this.warning = false
        this.iniciar = false
        this.mensajeError = ""
        this.showCountry = false
    }

    Error() {
        this.loading = false
        this.error = true
        this.warning = false
        this.iniciar = false
        this.mensajeError = "There was an error conecting to the server"
        this.showCountry = false
    }

    Warning() {
        this.loading = false
        this.error = false
        this.warning = true
        this.iniciar = false
        this.mensajeError = "There is no data for this country"
        this.showCountry = false
    }

    Succesful() {
        this.loading = false
        this.error = false
        this.warning = false
        this.iniciar = false
        this.mensajeError = ""
        this.showCountry = true
    }
}
