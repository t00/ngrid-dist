/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, DragDrop } from '@angular/cdk/drag-drop';
import { PblNgridModule, provideCommon } from '@pebula/ngrid';
import { PblDragDrop } from './drag-and-drop/core/drag-drop';
import { CdkLazyDropList, CdkLazyDrag, PblDragHandle } from './drag-and-drop/core/lazy-drag-drop';
import { PblNgridRowReorderPluginDirective, PblNgridRowDragDirective } from './drag-and-drop/row/row-reorder-plugin';
import { PblNgridColumnReorderPluginDirective, PblNgridColumnDragDirective } from './drag-and-drop/column/column-reorder-plugin';
import { PblNgridCellDraggerRefDirective } from './drag-and-drop/column/cell-dragger-ref';
import { PblNgridAggregationContainerDirective } from './drag-and-drop/column/aggregation-column';
import { PblNgridDragResizeComponent } from './column-resize/column-resize.component';
import { PblNgridCellResizerRefDirective } from './column-resize/cell-resizer-ref';
import { DragPluginDefaultTemplatesComponent } from './default-settings.component';
var PblNgridDragModule = /** @class */ (function () {
    function PblNgridDragModule() {
    }
    /**
     * @return {?}
     */
    PblNgridDragModule.withDefaultTemplates = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: PblNgridDragModule,
            providers: provideCommon([{ component: DragPluginDefaultTemplatesComponent }]),
        };
    };
    PblNgridDragModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        PblNgridModule,
                        DragDropModule
                    ],
                    declarations: [
                        DragPluginDefaultTemplatesComponent,
                        CdkLazyDropList, CdkLazyDrag, PblDragHandle,
                        PblNgridRowReorderPluginDirective, PblNgridRowDragDirective,
                        PblNgridColumnReorderPluginDirective, PblNgridColumnDragDirective, PblNgridCellDraggerRefDirective,
                        PblNgridAggregationContainerDirective,
                        PblNgridDragResizeComponent, PblNgridCellResizerRefDirective,
                    ],
                    exports: [
                        DragDropModule,
                        CdkLazyDropList, CdkLazyDrag, PblDragHandle,
                        PblNgridRowReorderPluginDirective, PblNgridRowDragDirective,
                        PblNgridColumnReorderPluginDirective, PblNgridColumnDragDirective, PblNgridCellDraggerRefDirective,
                        PblNgridAggregationContainerDirective,
                        PblNgridDragResizeComponent, PblNgridCellResizerRefDirective,
                    ],
                    providers: [
                        PblDragDrop,
                        { provide: DragDrop, useExisting: PblDragDrop },
                    ],
                    entryComponents: [DragPluginDefaultTemplatesComponent],
                },] }
    ];
    return PblNgridDragModule;
}());
export { PblNgridDragModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZHJhZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvdGFibGUtZHJhZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRWxFLE9BQU8sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNsRyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNySCxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNqSSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUMxRixPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUVsRyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN0RixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVuRixPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVuRjtJQUFBO0lBb0NBLENBQUM7Ozs7SUFOUSx1Q0FBb0I7OztJQUEzQjtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFNBQVMsRUFBRSxhQUFhLENBQUUsQ0FBRSxFQUFFLFNBQVMsRUFBRSxtQ0FBbUMsRUFBRSxDQUFFLENBQUM7U0FDbEYsQ0FBQztJQUNKLENBQUM7O2dCQW5DRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCxjQUFjO3FCQUNmO29CQUNELFlBQVksRUFBRTt3QkFDWixtQ0FBbUM7d0JBQ25DLGVBQWUsRUFBRSxXQUFXLEVBQUUsYUFBYTt3QkFDM0MsaUNBQWlDLEVBQUUsd0JBQXdCO3dCQUMzRCxvQ0FBb0MsRUFBRSwyQkFBMkIsRUFBRSwrQkFBK0I7d0JBQ2xHLHFDQUFxQzt3QkFDckMsMkJBQTJCLEVBQUUsK0JBQStCO3FCQUM3RDtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsY0FBYzt3QkFDZCxlQUFlLEVBQUUsV0FBVyxFQUFFLGFBQWE7d0JBQzNDLGlDQUFpQyxFQUFFLHdCQUF3Qjt3QkFDM0Qsb0NBQW9DLEVBQUUsMkJBQTJCLEVBQUUsK0JBQStCO3dCQUNsRyxxQ0FBcUM7d0JBQ3JDLDJCQUEyQixFQUFFLCtCQUErQjtxQkFDN0Q7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULFdBQVc7d0JBQ1gsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUU7cUJBQ2hEO29CQUNELGVBQWUsRUFBRSxDQUFFLG1DQUFtQyxDQUFFO2lCQUN6RDs7SUFTRCx5QkFBQztDQUFBLEFBcENELElBb0NDO1NBUlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEcmFnRHJvcE1vZHVsZSwgRHJhZ0Ryb3AgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcblxuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUsIHByb3ZpZGVDb21tb24gfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuaW1wb3J0IHsgUGJsRHJhZ0Ryb3AgfSBmcm9tICcuL2RyYWctYW5kLWRyb3AvY29yZS9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgQ2RrTGF6eURyb3BMaXN0LCBDZGtMYXp5RHJhZywgUGJsRHJhZ0hhbmRsZSB9IGZyb20gJy4vZHJhZy1hbmQtZHJvcC9jb3JlL2xhenktZHJhZy1kcm9wJztcbmltcG9ydCB7IFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZSwgUGJsTmdyaWRSb3dEcmFnRGlyZWN0aXZlIH0gZnJvbSAnLi9kcmFnLWFuZC1kcm9wL3Jvdy9yb3ctcmVvcmRlci1wbHVnaW4nO1xuaW1wb3J0IHsgUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlLCBQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmUgfSBmcm9tICcuL2RyYWctYW5kLWRyb3AvY29sdW1uL2NvbHVtbi1yZW9yZGVyLXBsdWdpbic7XG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxEcmFnZ2VyUmVmRGlyZWN0aXZlIH0gZnJvbSAnLi9kcmFnLWFuZC1kcm9wL2NvbHVtbi9jZWxsLWRyYWdnZXItcmVmJztcbmltcG9ydCB7IFBibE5ncmlkQWdncmVnYXRpb25Db250YWluZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RyYWctYW5kLWRyb3AvY29sdW1uL2FnZ3JlZ2F0aW9uLWNvbHVtbic7XG5cbmltcG9ydCB7IFBibE5ncmlkRHJhZ1Jlc2l6ZUNvbXBvbmVudCB9IGZyb20gJy4vY29sdW1uLXJlc2l6ZS9jb2x1bW4tcmVzaXplLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxSZXNpemVyUmVmRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4tcmVzaXplL2NlbGwtcmVzaXplci1yZWYnO1xuXG5pbXBvcnQgeyBEcmFnUGx1Z2luRGVmYXVsdFRlbXBsYXRlc0NvbXBvbmVudCB9IGZyb20gJy4vZGVmYXVsdC1zZXR0aW5ncy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFBibE5ncmlkTW9kdWxlLFxuICAgIERyYWdEcm9wTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERyYWdQbHVnaW5EZWZhdWx0VGVtcGxhdGVzQ29tcG9uZW50LFxuICAgIENka0xhenlEcm9wTGlzdCwgQ2RrTGF6eURyYWcsIFBibERyYWdIYW5kbGUsXG4gICAgUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlLCBQYmxOZ3JpZFJvd0RyYWdEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlLCBQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmUsIFBibE5ncmlkQ2VsbERyYWdnZXJSZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRBZ2dyZWdhdGlvbkNvbnRhaW5lckRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZERyYWdSZXNpemVDb21wb25lbnQsIFBibE5ncmlkQ2VsbFJlc2l6ZXJSZWZEaXJlY3RpdmUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEcmFnRHJvcE1vZHVsZSxcbiAgICBDZGtMYXp5RHJvcExpc3QsIENka0xhenlEcmFnLCBQYmxEcmFnSGFuZGxlLFxuICAgIFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZSwgUGJsTmdyaWRSb3dEcmFnRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZSwgUGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlLCBQYmxOZ3JpZENlbGxEcmFnZ2VyUmVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkQWdncmVnYXRpb25Db250YWluZXJEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWREcmFnUmVzaXplQ29tcG9uZW50LCBQYmxOZ3JpZENlbGxSZXNpemVyUmVmRGlyZWN0aXZlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBQYmxEcmFnRHJvcCxcbiAgICB7IHByb3ZpZGU6IERyYWdEcm9wLCB1c2VFeGlzdGluZzogUGJsRHJhZ0Ryb3AgfSxcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbIERyYWdQbHVnaW5EZWZhdWx0VGVtcGxhdGVzQ29tcG9uZW50IF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRHJhZ01vZHVsZSB7XG5cbiAgc3RhdGljIHdpdGhEZWZhdWx0VGVtcGxhdGVzKCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogUGJsTmdyaWREcmFnTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBwcm92aWRlQ29tbW9uKCBbIHsgY29tcG9uZW50OiBEcmFnUGx1Z2luRGVmYXVsdFRlbXBsYXRlc0NvbXBvbmVudCB9IF0pLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==