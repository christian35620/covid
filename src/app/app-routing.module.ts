import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { HomeComponent } from "./components/home/home.component"
import { DataCountryComponent } from "./components/data-country/data-country.component"
import { ContactComponent } from "./components/contact/contact.component"
import { DatacardComponent } from "./components/datacard/datacard.component"

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "dataCountry", component: DataCountryComponent },
    { path: "contact", component: ContactComponent },
    { path: "", pathMatch: "full", redirectTo: "home" },
    { path: "**", pathMatch: "full", redirectTo: "home" },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
