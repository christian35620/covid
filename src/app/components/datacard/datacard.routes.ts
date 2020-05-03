import { Routes } from "@angular/router"
import { DatacardComponent } from "./datacard.component"

export const DATACARD_ROUTES: Routes = [
    { path: "", component: DatacardComponent },
    { path: ":country", component: DatacardComponent },
]
