import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { HomeComponent } from "./components/home/home.component"
import { ContactComponent } from "./components/contact/contact.component"
import { DataCountryComponent } from "./components/data-country/data-country.component"
import { NavbarComponent } from "./components/shared/navbar/navbar.component"
import { DatacardComponent } from "./components/datacard/datacard.component"

@NgModule({
    declarations: [
        AppComponent, //
        HomeComponent,
        ContactComponent,
        DataCountryComponent,
        NavbarComponent,
        DatacardComponent,
    ],
    imports: [
        BrowserModule, //
        HttpClientModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
