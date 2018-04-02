import { SearchFilterPipe } from './../pipes/search-filter.pipe';
import { SharedService } from './../services/shared.service';
import { AlertsLoaderService } from "./../services/alerts-loader.service";
import { AddressComponent } from "./../components/address/address.component";
import { WarrantyComponent } from "./../components/warranty/warranty.component";
import { RentOrLeaseComponent } from "./../components/rent-or-lease/rent-or-lease.component";
import { LoanComponent } from "./../components/loan/loan.component";
import { LicenseComponent } from "./../components/license/license.component";
import { MaintenanceComponent } from "./../components/maintenance/maintenance.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeaderComponent } from "../components/header/header.component";
import { LoginComponent } from "../components/login/login.component";
import { SideNavComponent } from "../components/side-nav/side-nav.component";
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { BuildingComponent } from "../components/building/building.component";
import { BuildingListComponent } from "../components/building/building-list/building-list.component";
import { AddBuildingComponent } from "../components/building/add-building/add-building.component";
import { VehicleComponent } from "../components/vehicle/vehicle.component";
import { OtherComponent } from "../components/other/other.component";
import { EquipmentComponent } from "../components/equipment/equipment.component";
import { AddEquipmentComponent } from "../components/equipment/add-equipment/add-equipment.component";
import { EquipmentListComponent } from "../components/equipment/equipment-list/equipment-list.component";
import { AddVehicleComponent } from "../components/vehicle/add-vehicle/add-vehicle.component";
import { VehicleListComponent } from "../components/vehicle/vehicle-list/vehicle-list.component";
import { AddOtherAssetsComponent } from "../components/other/add-other-assets/add-other-assets.component";
import { OtherAssetsListComponent } from "../components/other/other-assets-list/other-assets-list.component";
import { RouterModule } from "@angular/router";
import { PaginationModule } from "ngx-pagination-bootstrap";
import { InspectionComponent } from "../components/inspection/inspection.component";
import { PolicyComponent } from "../components/policy/policy.component";
import { ServiceComponent } from "../components/service/service.component";
import { SupportingDocumentsComponent } from "../components/supporting-documents/supporting-documents.component";
import { AjaxLoaderComponent } from "../components/ajax-loader/ajax-loader.component";
import { SearchComponent } from "../components/search/search.component";
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ErrorMessageComponent } from "../components/error-message/error-message.component";
import { SuccessMessageComponent } from "../components/success-message/success-message.component";
import { OwlDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { UserLookupComponent } from '../components/user-lookup/user-lookup.component';
import { SummaryComponent } from '../components/summary/summary.component';


export const MY_MOMENT_FORMATS = {
    parseInput: 'DD/MM/YYYY HH:mm:ss',
    fullPickerInput: 'DD/MM/YYYY HH:mm:ss',
    datePickerInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
};




@NgModule({
    declarations: [
        HeaderComponent,
        LoginComponent,
        SideNavComponent,
        DashboardComponent,
        BuildingComponent,
        BuildingListComponent,
        AddBuildingComponent,
        VehicleComponent,
        OtherComponent,
        EquipmentComponent,
        AddEquipmentComponent,
        EquipmentListComponent,
        AddVehicleComponent,
        VehicleListComponent,
        AddOtherAssetsComponent,
        OtherAssetsListComponent,
        MaintenanceComponent,
        InspectionComponent,
        LicenseComponent,
        LoanComponent,
        PolicyComponent,
        RentOrLeaseComponent,
        ServiceComponent,
        WarrantyComponent,
        SupportingDocumentsComponent,
        AddressComponent,
        AjaxLoaderComponent,
        ErrorMessageComponent,
        SuccessMessageComponent,
        SearchComponent,
        SearchFilterPipe,
        UserLookupComponent,
        SummaryComponent
    ],
    imports: [FormsModule, CommonModule, RouterModule,
        PaginationModule, SelectDropDownModule, 
        OwlDateTimeModule,
        OwlMomentDateTimeModule,],
    providers: [AlertsLoaderService,
        { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS },
    ],
    exports: [FormsModule, CommonModule],
    entryComponents: [DashboardComponent, AjaxLoaderComponent, ErrorMessageComponent, 
        SuccessMessageComponent, SearchComponent, UserLookupComponent]
})
export class CoreModule { }
