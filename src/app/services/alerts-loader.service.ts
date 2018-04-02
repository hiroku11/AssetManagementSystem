import { HttpActionDirective } from "./../directive/http-action.directive";
import {
    Injectable,
    Injector,
    ComponentFactoryResolver,
    EmbeddedViewRef,
    ApplicationRef
} from "@angular/core";
import { AjaxLoaderComponent } from "../components/ajax-loader/ajax-loader.component";
import { SuccessMessageComponent } from "../components/success-message/success-message.component";
import { ErrorMessageComponent } from "../components/error-message/error-message.component";

@Injectable()
export class AlertsLoaderService {
    public httpActionIndicator: HttpActionDirective;
    public componentRef: any;
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {}

    showLoader() {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
            AjaxLoaderComponent
        );
        let viewContainerRef = this.httpActionIndicator.viewContainerRef;
        viewContainerRef.clear();
        this.componentRef = viewContainerRef.createComponent(componentFactory);
    }
    hideLoader() {
        this.componentRef.destroy();
    }
    success(message: string) {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
            SuccessMessageComponent
        );
        let viewContainerRef = this.httpActionIndicator.viewContainerRef;
        viewContainerRef.clear();
        this.componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentRef.instance.message = message;
        setTimeout(()=>{
            this.hideLoader();
        },2000);
    }
    error(message: string) {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
            ErrorMessageComponent
        );
        let viewContainerRef = this.httpActionIndicator.viewContainerRef;
        viewContainerRef.clear();
        this.componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentRef.instance.message = message;//this.getErrorMessage(error);
        setTimeout(()=>{
            this.hideLoader();
        },2000)
    }

    getErrorMessage(error: any) {
        return error.error.errorMessages[0].split(":")[2];

    }
}
