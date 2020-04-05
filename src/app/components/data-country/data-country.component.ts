import { Component, OnInit } from "@angular/core"
import * as data from "../../../assets/countries/countries.json"

@Component({
    selector: "app-data-country",
    templateUrl: "./data-country.component.html",
    styleUrls: ["./data-country.component.scss"],
})
export class DataCountryComponent implements OnInit {
    countries: any[] = (data as any).default
    currentCountry: string

    constructor() {}

    ngOnInit(): void {}
}
