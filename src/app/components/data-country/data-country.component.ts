import { Component, OnInit } from "@angular/core"
import * as data from "../../../assets/countries/paises.json"

@Component({
    selector: "app-data-country",
    templateUrl: "./data-country.component.html",
    styleUrls: ["./data-country.component.scss"],
})
export class DataCountryComponent implements OnInit {
    countries: any[] = (data as any).default // lista proveniente de paises.json

    constructor() {}

    ngOnInit(): void {}
}
