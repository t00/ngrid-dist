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
                entryComponents: [PblPaginatorComponent, MatPaginator]
            },] }
];
/** @nocollapse */
PblNgridPaginatorModule.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcGFnaW5hdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvcGFnaW5hdG9yLyIsInNvdXJjZXMiOlsibGliL3RhYmxlLXBhZ2luYXRvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFVcEUsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7SUFDbEMsWUFBWSxFQUE0QixFQUFFLFFBQWtCO1FBQzFELHlGQUF5RjtRQUN6RixFQUFFLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVELENBQUM7OztZQVZGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxjQUFjLENBQUU7Z0JBQ2pILFlBQVksRUFBRSxDQUFFLHFCQUFxQixDQUFFO2dCQUN2QyxPQUFPLEVBQUUsQ0FBRSxxQkFBcUIsQ0FBRTtnQkFDbEMsZUFBZSxFQUFFLENBQUUscUJBQXFCLEVBQUUsWUFBWSxDQUFFO2FBQ3pEOzs7O1lBakJrQix3QkFBd0I7WUFBRSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRQYWdpbmF0b3IsIE1hdFBhZ2luYXRvck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBNYXRTZWxlY3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHsgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcblxuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibFBhZ2luYXRvckNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtcGFnaW5hdG9yLmNvbXBvbmVudCc7XG4vLyBUT0RPOiBSZW1vdmUgTWF0UGFnaW5hdG9yTW9kdWxlIGFuZCB0aGUgaW5pdGlhbCBjb2RlIGluIHRoZSBjb25zdHJ1Y3RvclxuLy8gc2V0IHRoZSBzdHlsZXMgaW4gdGhlIFNDU1MuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFsgQ29tbW9uTW9kdWxlLCBNYXRQYWdpbmF0b3JNb2R1bGUsIE1hdFNlbGVjdE1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBQYmxOZ3JpZE1vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6IFsgUGJsUGFnaW5hdG9yQ29tcG9uZW50IF0sXG4gIGV4cG9ydHM6IFsgUGJsUGFnaW5hdG9yQ29tcG9uZW50IF0sXG4gIGVudHJ5Q29tcG9uZW50czogWyBQYmxQYWdpbmF0b3JDb21wb25lbnQsIE1hdFBhZ2luYXRvciBdXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkUGFnaW5hdG9yTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoY2Y6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgLy8gdGhpcyBpcyBhIHdvcmthcm91bmQgdG8gZW5zdXJlIENTUyBmcm9tIG1hdCBzbGlkZXIgaXMgbG9hZGVkLCBvdGhlcndpc2UgaXQgaXMgb21pdHRlZC5cbiAgICBjZi5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShNYXRQYWdpbmF0b3IpLmNyZWF0ZShpbmplY3Rvcik7XG4gIH1cbn1cbiJdfQ==