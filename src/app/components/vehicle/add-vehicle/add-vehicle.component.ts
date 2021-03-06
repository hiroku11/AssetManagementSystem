import { SharedService } from "./../../../services/shared.service";
import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import { ApiService } from "../../../services/api.services";
import { AlertsLoaderService } from "../../../services/alerts-loader.service";
import { ActivatedRoute, Params } from "@angular/router";
import { UserLookupComponent } from "../../user-lookup/user-lookup.component";

@Component({
    selector: "app-add-vehicle",
    templateUrl: "./add-vehicle.component.html",
    styleUrls: ["./add-vehicle.component.scss"]
})
export class AddVehicleComponent implements OnInit {
    vehicle: any;
    public currentTab: any;
    public tabs: any;
    public dropDownsData: any;
    public editMode: boolean;
    componentRef: any;
    constructor(
        private _sharedService: SharedService,
        private _apiService: ApiService,
        private _alertsService: AlertsLoaderService,
        private route: ActivatedRoute,
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        this.initVehicle();
        this.tabs = this._sharedService.getTabstoShow(this.vehicle);
        this.currentTab = this.tabs[0];
        this.dropDownsData = this._sharedService.dropDownsData;
        this._sharedService.dropDownsService.subscribe(data => {
            this.dropDownsData = data;
        });

    }
    ngOnInit() {
        this.dropDownsData = this._sharedService.dropDownsData;
        this.route.params.subscribe((params: Params) => {
            let Id = params["id"];
            if (Id) {
                this.getVehicleById(Id);
                this.editMode = true;
            }

        });
    }
    selectCompareFunction(item1: any, item2: any) {
        if (item1 == null || item2 == null) {
            return false;
        }
        return item1.id == item2.id;
    }

    initVehicle() {
        this.vehicle = {
            id: null,
            assets: null,
            statusFlag: null,
            vehicleRegistrationId: null,
            engineNumber: null,
            chasisNumber: null,
            make: null,
            model: null,
            commentDescription: null,
            vehicleDamageTypes: [],
            assetCategory: {
                id: "VEHICLE",
                description: "Vehicle"
            },
            addresses: [],
            insurancePolicies: null,
            rentalOrLeaseAgreements: null,
            loanAgreements: null,
            annualMaintenanceContracts: null,
            licenses: null,
            warrantyAgreements: null,
            inspections: null,
            services: null,
            existingInsurancePolicies: null,
            existingRentalOrLeaseAgreements: null,
            existingLoanAgreements: null,
            existingAnnualMaintenanceContracts: null,
            existingLicenses: null,
            existingWarrantyAgreements: null,
            existingInspections: null,
            existingServices: null,
            assignees: null,
            vehicleDamageTypeOther: null,
            assetCondition: {
                id: null
            },
            assetStatus: {
                id: null
            },
            assetType: {
                id: null
            },
            assetConditionOther: null,
            assetStatusOther: null,
            assetTypeOther: null,
            yearOfManufacturing: null,
            monthOfManufacturing: {
                id: null
            },
            motApplicable: null,
            motStartDateTime: null,
            motEndDateTime: null,
            motObtainedDate: null,
            motAuthorityName: null,
            motPlace: null,
            taxApplicable: null,
            taxStartDateTime: null,
            taxEndDateTime: null,
            taxAmount: null,
            vehicleType: {
                id: null
            },
            vehicleTypeOther: null,
            organization: {
                id: null
            },
            department: {
                id: null
            },
            regulatoryCompliance: null,
            regulatoryAuthorityName: null,
            regCompObtainedDate: null,
            fireExits: null,
            fireExitsLoc: null,
            fireExtinguishers: null,
            fireExtinguisherLoc: null,
            amcPresent: "N",
            insurancePresent: "N",
            loanPresent: "N",
            licensePresent: "N",
            warrantyPresent: "N",
            inspectionPresent: "N",
            servicePresent: "N",
            rentalOrLeasePresent: "N",
            fireExtinguisherTypes: []
        };
    }
    getVehicleById(id: number) {
        this._apiService.get("/vehicle/vehicleId/" + id).subscribe(
            data => {
                this.vehicle = data;
                this.updateTabs();
            },
            error => {
                this._alertsService.error(
                    "Unable to get vehicle details. Try Again."
                );
            }
        );
    }
    changeTab(tab: string) {
        if (!this.vehicle.id) {
            this._alertsService.error("Please save vehicle details first.");
            return;
        }
        this.currentTab = tab;
    }
    updateTabs() {
        this.tabs = this._sharedService.getTabstoShow(this.vehicle);
    }

    addedToAsset($event: any) {
        this.vehicle = $event;
    }
    save() {
        this._apiService
            .createOrUpdateVehicle(
            "/vehicle/create-or-update-vehicle",
            this.vehicle
            )
            .subscribe(
            data => {
                this.vehicle = data;
                this._alertsService.success(
                    "Vehicle details successfully saved."
                );
                //this.initVehicle();
            },
            error => {
                this._alertsService.error(
                    "Some error occured while saving vehicle details."
                );
            }
            );
    }
    userLookup() {
        if (!this.vehicle.id) {
            this._alertsService.error("Please save vehicle details.");
            return;
        }
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
            UserLookupComponent
        );
        this.componentRef = this.viewContainerRef.createComponent(componentFactory);
        this.componentRef.instance.assetType = 'vehicle';
        this.componentRef.instance.assignUser.subscribe((data) => {
            this.assignUser(data);
        });
        this.componentRef.instance.closeModal.subscribe(() => {
            this.closeModal();
        });
    }
    closeModal() {
        this.componentRef.instance.assignUser.unsubscribe();
        this.componentRef.instance.closeModal.unsubscribe();
        this.componentRef.destroy();
    }
    assignUser(user: any) {
        if (!this.vehicle.id) {
            this.vehicle.assignees == null ? this.vehicle.assignees = [] : "";
            this.vehicle.assignees.push(user);
            return;
        }
        this._apiService.put(`/vehicle/add-assignee-to-vehicle-by-user-id/vehicleId/${this.vehicle.id}/userId/${user.id}`, null).subscribe(
            (data) => {
                this.vehicle = data;
                this._alertsService.success("Vehicle successfully assigned to user.")
            },
            (error) => {
                this._alertsService.error("Some error occured try again.")
            }
        )
    }


    deleteAssignee(user: any) {
        this._apiService.delete(`/vehicle/remove-assignee-from-vehicle-by-user-id/vehicleId/${this.vehicle.id}/userId/${user.id}`).subscribe(
            (data) => {
                this.vehicle = data;
                this._alertsService.success("Assignee successfully removed from vehicle.");
            },
            (error) => {
                this._alertsService.error("Some error occured try again.");
            }
        )
    }
}
