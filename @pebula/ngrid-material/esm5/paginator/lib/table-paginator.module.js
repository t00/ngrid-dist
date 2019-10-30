/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, ComponentFactoryResolver, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { PblNgridModule } from '@pebula/ngrid';
import { PblPaginatorComponent } from './table-paginator.component';
// TODO: Remove MatPaginatorModule and the initial code in the constructor
// set the styles in the SCSS.
var PblNgridPaginatorModule = /** @class */ (function () {
    function PblNgridPaginatorModule(cf, injector) {
        // this is a workaround to ensure CSS from mat slider is loaded, otherwise it is omitted.
        cf.resolveComponentFactory(MatPaginator).create(injector);
    }
    PblNgridPaginatorModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MatPaginatorModule, MatSelectModule, MatTooltipModule, MatButtonModule, PblNgridModule],
                    declarations: [PblPaginatorComponent],
                    exports: [PblPaginatorComponent],
                    entryComponents: [PblPaginatorComponent, MatPaginator]
                },] }
    ];
    /** @nocollapse */
    PblNgridPaginatorModule.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: Injector }
    ]; };
    return PblNgridPaginatorModule;
}());
export { PblNgridPaginatorModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcGFnaW5hdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvcGFnaW5hdG9yLyIsInNvdXJjZXMiOlsibGliL3RhYmxlLXBhZ2luYXRvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFJcEU7SUFPRSxpQ0FBWSxFQUE0QixFQUFFLFFBQWtCO1FBQzFELHlGQUF5RjtRQUN6RixFQUFFLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVELENBQUM7O2dCQVZGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxjQUFjLENBQUU7b0JBQ2pILFlBQVksRUFBRSxDQUFFLHFCQUFxQixDQUFFO29CQUN2QyxPQUFPLEVBQUUsQ0FBRSxxQkFBcUIsQ0FBRTtvQkFDbEMsZUFBZSxFQUFFLENBQUUscUJBQXFCLEVBQUUsWUFBWSxDQUFFO2lCQUN6RDs7OztnQkFqQmtCLHdCQUF3QjtnQkFBRSxRQUFROztJQXVCckQsOEJBQUM7Q0FBQSxBQVhELElBV0M7U0FMWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdFBhZ2luYXRvciwgTWF0UGFnaW5hdG9yTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcGFnaW5hdG9yJztcbmltcG9ydCB7IE1hdFNlbGVjdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZE1vZHVsZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsUGFnaW5hdG9yQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1wYWdpbmF0b3IuY29tcG9uZW50Jztcbi8vIFRPRE86IFJlbW92ZSBNYXRQYWdpbmF0b3JNb2R1bGUgYW5kIHRoZSBpbml0aWFsIGNvZGUgaW4gdGhlIGNvbnN0cnVjdG9yXG4vLyBzZXQgdGhlIHN0eWxlcyBpbiB0aGUgU0NTUy5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIE1hdFBhZ2luYXRvck1vZHVsZSwgTWF0U2VsZWN0TW9kdWxlLCBNYXRUb29sdGlwTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIFBibE5ncmlkTW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBQYmxQYWdpbmF0b3JDb21wb25lbnQgXSxcbiAgZXhwb3J0czogWyBQYmxQYWdpbmF0b3JDb21wb25lbnQgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbIFBibFBhZ2luYXRvckNvbXBvbmVudCwgTWF0UGFnaW5hdG9yIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRQYWdpbmF0b3JNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihjZjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAvLyB0aGlzIGlzIGEgd29ya2Fyb3VuZCB0byBlbnN1cmUgQ1NTIGZyb20gbWF0IHNsaWRlciBpcyBsb2FkZWQsIG90aGVyd2lzZSBpdCBpcyBvbWl0dGVkLlxuICAgIGNmLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE1hdFBhZ2luYXRvcikuY3JlYXRlKGluamVjdG9yKTtcbiAgfVxufVxuIl19