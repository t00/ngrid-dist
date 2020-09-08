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
export class PblNgridPaginatorModule {
    /**
     * @param {?} cf
     * @param {?} injector
     */
    constructor(cf, injector) {
        // this is a workaround to ensure CSS from mat slider is loaded, otherwise it is omitted.
        cf.resolveComponentFactory(MatPaginator).create(injector);
    }
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
PblNgridPaginatorModule.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcGFnaW5hdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvcGFnaW5hdG9yLyIsInNvdXJjZXMiOlsibGliL3RhYmxlLXBhZ2luYXRvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBV3BFLE1BQU0sT0FBTyx1QkFBdUI7Ozs7O0lBQ2xDLFlBQVksRUFBNEIsRUFBRSxRQUFrQjtRQUMxRCx5RkFBeUY7UUFDekYsRUFBRSxDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1RCxDQUFDOzs7WUFYRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFFO2dCQUNqSCxZQUFZLEVBQUUsQ0FBRSxxQkFBcUIsQ0FBRTtnQkFDdkMsT0FBTyxFQUFFLENBQUUscUJBQXFCLENBQUU7O2dCQUVsQyxlQUFlLEVBQUUsQ0FBRSxxQkFBcUIsRUFBRSxZQUFZLENBQUU7YUFDekQ7Ozs7WUFsQmtCLHdCQUF3QjtZQUFFLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdFBhZ2luYXRvciwgTWF0UGFnaW5hdG9yTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcGFnaW5hdG9yJztcbmltcG9ydCB7IE1hdFNlbGVjdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZE1vZHVsZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsUGFnaW5hdG9yQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1wYWdpbmF0b3IuY29tcG9uZW50Jztcbi8vIFRPRE86IFJlbW92ZSBNYXRQYWdpbmF0b3JNb2R1bGUgYW5kIHRoZSBpbml0aWFsIGNvZGUgaW4gdGhlIGNvbnN0cnVjdG9yXG4vLyBzZXQgdGhlIHN0eWxlcyBpbiB0aGUgU0NTUy5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIE1hdFBhZ2luYXRvck1vZHVsZSwgTWF0U2VsZWN0TW9kdWxlLCBNYXRUb29sdGlwTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIFBibE5ncmlkTW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBQYmxQYWdpbmF0b3JDb21wb25lbnQgXSxcbiAgZXhwb3J0czogWyBQYmxQYWdpbmF0b3JDb21wb25lbnQgXSxcbiAgLy8gVE9ETzogcmVtb3ZlIHdoZW4gVmlld0VuZ2luZSBpcyBubyBsb25nZXIgc3VwcG9ydGVkIGJ5IGFuZ3VsYXIgKFYxMSA/Pz8pXG4gIGVudHJ5Q29tcG9uZW50czogWyBQYmxQYWdpbmF0b3JDb21wb25lbnQsIE1hdFBhZ2luYXRvciBdXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkUGFnaW5hdG9yTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoY2Y6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgLy8gdGhpcyBpcyBhIHdvcmthcm91bmQgdG8gZW5zdXJlIENTUyBmcm9tIG1hdCBzbGlkZXIgaXMgbG9hZGVkLCBvdGhlcndpc2UgaXQgaXMgb21pdHRlZC5cbiAgICBjZi5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShNYXRQYWdpbmF0b3IpLmNyZWF0ZShpbmplY3Rvcik7XG4gIH1cbn1cbiJdfQ==