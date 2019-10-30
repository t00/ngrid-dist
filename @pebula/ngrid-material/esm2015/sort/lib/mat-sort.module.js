/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule, MatSortHeader } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { PblNgridModule, PblNgridRegistryService } from '@pebula/ngrid';
import { PblNgridMatSortDirective } from './mat-sort.directive';
import { MatSortExtension } from './mat-sort-component-extension';
export class PblNgridMatSortModule {
    /**
     * @param {?} registry
     * @param {?} cfr
     */
    constructor(registry, cfr) {
        this.registry = registry;
        registry.addMulti('dataHeaderExtensions', new MatSortExtension(cfr));
    }
}
PblNgridMatSortModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MatButtonModule, MatSortModule, PblNgridModule],
                declarations: [PblNgridMatSortDirective],
                exports: [PblNgridMatSortDirective, MatSortModule],
                entryComponents: [MatSortHeader],
            },] }
];
/** @nocollapse */
PblNgridMatSortModule.ctorParameters = () => [
    { type: PblNgridRegistryService },
    { type: ComponentFactoryResolver }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridMatSortModule.prototype.registry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNvcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zb3J0LyIsInNvdXJjZXMiOlsibGliL21hdC1zb3J0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQVFsRSxNQUFNLE9BQU8scUJBQXFCOzs7OztJQUNoQyxZQUFvQixRQUFpQyxFQUFFLEdBQTZCO1FBQWhFLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ25ELFFBQVEsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7OztZQVRGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxjQUFjLENBQUU7Z0JBQ3pFLFlBQVksRUFBRSxDQUFFLHdCQUF3QixDQUFFO2dCQUMxQyxPQUFPLEVBQUUsQ0FBRSx3QkFBd0IsRUFBRSxhQUFhLENBQUU7Z0JBQ3BELGVBQWUsRUFBRSxDQUFFLGFBQWEsQ0FBRTthQUNuQzs7OztZQVR3Qix1QkFBdUI7WUFMN0Isd0JBQXdCOzs7Ozs7O0lBZ0I3Qix5Q0FBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0U29ydE1vZHVsZSwgTWF0U29ydEhlYWRlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NvcnQnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcblxuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUsIFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1hdFNvcnREaXJlY3RpdmUgfSBmcm9tICcuL21hdC1zb3J0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNYXRTb3J0RXh0ZW5zaW9uIH0gZnJvbSAnLi9tYXQtc29ydC1jb21wb25lbnQtZXh0ZW5zaW9uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0U29ydE1vZHVsZSwgUGJsTmdyaWRNb2R1bGUgXSxcbiAgZGVjbGFyYXRpb25zOiBbIFBibE5ncmlkTWF0U29ydERpcmVjdGl2ZSBdLFxuICBleHBvcnRzOiBbIFBibE5ncmlkTWF0U29ydERpcmVjdGl2ZSwgTWF0U29ydE1vZHVsZSBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFsgTWF0U29ydEhlYWRlciBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE1hdFNvcnRNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICByZWdpc3RyeS5hZGRNdWx0aSgnZGF0YUhlYWRlckV4dGVuc2lvbnMnLCBuZXcgTWF0U29ydEV4dGVuc2lvbihjZnIpKTtcbiAgfVxufVxuIl19