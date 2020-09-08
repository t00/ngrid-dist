/**
 * @fileoverview added by tsickle
 * Generated from: lib/table-paginator.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                    // TODO: remove when ViewEngine is no longer supported by angular (V11 ???)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcGFnaW5hdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvcGFnaW5hdG9yLyIsInNvdXJjZXMiOlsibGliL3RhYmxlLXBhZ2luYXRvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBSXBFO0lBUUUsaUNBQVksRUFBNEIsRUFBRSxRQUFrQjtRQUMxRCx5RkFBeUY7UUFDekYsRUFBRSxDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1RCxDQUFDOztnQkFYRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFFO29CQUNqSCxZQUFZLEVBQUUsQ0FBRSxxQkFBcUIsQ0FBRTtvQkFDdkMsT0FBTyxFQUFFLENBQUUscUJBQXFCLENBQUU7O29CQUVsQyxlQUFlLEVBQUUsQ0FBRSxxQkFBcUIsRUFBRSxZQUFZLENBQUU7aUJBQ3pEOzs7O2dCQWxCa0Isd0JBQXdCO2dCQUFFLFFBQVE7O0lBd0JyRCw4QkFBQztDQUFBLEFBWkQsSUFZQztTQUxZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0UGFnaW5hdG9yLCBNYXRQYWdpbmF0b3JNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wYWdpbmF0b3InO1xuaW1wb3J0IHsgTWF0U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5cbmltcG9ydCB7IFBibE5ncmlkTW9kdWxlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxQYWdpbmF0b3JDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLXBhZ2luYXRvci5jb21wb25lbnQnO1xuLy8gVE9ETzogUmVtb3ZlIE1hdFBhZ2luYXRvck1vZHVsZSBhbmQgdGhlIGluaXRpYWwgY29kZSBpbiB0aGUgY29uc3RydWN0b3Jcbi8vIHNldCB0aGUgc3R5bGVzIGluIHRoZSBTQ1NTLlxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSwgTWF0UGFnaW5hdG9yTW9kdWxlLCBNYXRTZWxlY3RNb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgUGJsTmdyaWRNb2R1bGUgXSxcbiAgZGVjbGFyYXRpb25zOiBbIFBibFBhZ2luYXRvckNvbXBvbmVudCBdLFxuICBleHBvcnRzOiBbIFBibFBhZ2luYXRvckNvbXBvbmVudCBdLFxuICAvLyBUT0RPOiByZW1vdmUgd2hlbiBWaWV3RW5naW5lIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgYnkgYW5ndWxhciAoVjExID8/PylcbiAgZW50cnlDb21wb25lbnRzOiBbIFBibFBhZ2luYXRvckNvbXBvbmVudCwgTWF0UGFnaW5hdG9yIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRQYWdpbmF0b3JNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihjZjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAvLyB0aGlzIGlzIGEgd29ya2Fyb3VuZCB0byBlbnN1cmUgQ1NTIGZyb20gbWF0IHNsaWRlciBpcyBsb2FkZWQsIG90aGVyd2lzZSBpdCBpcyBvbWl0dGVkLlxuICAgIGNmLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE1hdFBhZ2luYXRvcikuY3JlYXRlKGluamVjdG9yKTtcbiAgfVxufVxuIl19