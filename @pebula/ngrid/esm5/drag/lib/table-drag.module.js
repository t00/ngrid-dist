/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
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
                    ],
                    entryComponents: [DragPluginDefaultTemplatesComponent],
                },] }
    ];
    return PblNgridDragModule;
}());
export { PblNgridDragModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZHJhZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvdGFibGUtZHJhZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFZLE1BQU0sd0JBQXdCLENBQUM7QUFFbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3JILE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2pJLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRWxHLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRW5GLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRW5GO0lBQUE7SUFtQ0EsQ0FBQzs7OztJQU5RLHVDQUFvQjs7O0lBQTNCO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsU0FBUyxFQUFFLGFBQWEsQ0FBRSxDQUFFLEVBQUUsU0FBUyxFQUFFLG1DQUFtQyxFQUFFLENBQUUsQ0FBQztTQUNsRixDQUFDO0lBQ0osQ0FBQzs7Z0JBbENGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixjQUFjO3dCQUNkLGNBQWM7cUJBQ2Y7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLG1DQUFtQzt3QkFDbkMsZUFBZSxFQUFFLFdBQVcsRUFBRSxhQUFhO3dCQUMzQyxpQ0FBaUMsRUFBRSx3QkFBd0I7d0JBQzNELG9DQUFvQyxFQUFFLDJCQUEyQixFQUFFLCtCQUErQjt3QkFDbEcscUNBQXFDO3dCQUNyQywyQkFBMkIsRUFBRSwrQkFBK0I7cUJBQzdEO29CQUNELE9BQU8sRUFBRTt3QkFDUCxjQUFjO3dCQUNkLGVBQWUsRUFBRSxXQUFXLEVBQUUsYUFBYTt3QkFDM0MsaUNBQWlDLEVBQUUsd0JBQXdCO3dCQUMzRCxvQ0FBb0MsRUFBRSwyQkFBMkIsRUFBRSwrQkFBK0I7d0JBQ2xHLHFDQUFxQzt3QkFDckMsMkJBQTJCLEVBQUUsK0JBQStCO3FCQUM3RDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsV0FBVztxQkFDWjtvQkFDRCxlQUFlLEVBQUUsQ0FBRSxtQ0FBbUMsQ0FBRTtpQkFDekQ7O0lBU0QseUJBQUM7Q0FBQSxBQW5DRCxJQW1DQztTQVJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IERyYWdEcm9wTW9kdWxlLCBEcmFnRHJvcCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xyXG5cclxuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUsIHByb3ZpZGVDb21tb24gfSBmcm9tICdAcGVidWxhL25ncmlkJztcclxuXHJcbmltcG9ydCB7IFBibERyYWdEcm9wIH0gZnJvbSAnLi9kcmFnLWFuZC1kcm9wL2NvcmUvZHJhZy1kcm9wJztcclxuaW1wb3J0IHsgQ2RrTGF6eURyb3BMaXN0LCBDZGtMYXp5RHJhZywgUGJsRHJhZ0hhbmRsZSB9IGZyb20gJy4vZHJhZy1hbmQtZHJvcC9jb3JlL2xhenktZHJhZy1kcm9wJztcclxuaW1wb3J0IHsgUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlLCBQYmxOZ3JpZFJvd0RyYWdEaXJlY3RpdmUgfSBmcm9tICcuL2RyYWctYW5kLWRyb3Avcm93L3Jvdy1yZW9yZGVyLXBsdWdpbic7XHJcbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZSwgUGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlIH0gZnJvbSAnLi9kcmFnLWFuZC1kcm9wL2NvbHVtbi9jb2x1bW4tcmVvcmRlci1wbHVnaW4nO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxEcmFnZ2VyUmVmRGlyZWN0aXZlIH0gZnJvbSAnLi9kcmFnLWFuZC1kcm9wL2NvbHVtbi9jZWxsLWRyYWdnZXItcmVmJztcclxuaW1wb3J0IHsgUGJsTmdyaWRBZ2dyZWdhdGlvbkNvbnRhaW5lckRpcmVjdGl2ZSB9IGZyb20gJy4vZHJhZy1hbmQtZHJvcC9jb2x1bW4vYWdncmVnYXRpb24tY29sdW1uJztcclxuXHJcbmltcG9ydCB7IFBibE5ncmlkRHJhZ1Jlc2l6ZUNvbXBvbmVudCB9IGZyb20gJy4vY29sdW1uLXJlc2l6ZS9jb2x1bW4tcmVzaXplLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBibE5ncmlkQ2VsbFJlc2l6ZXJSZWZEaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi1yZXNpemUvY2VsbC1yZXNpemVyLXJlZic7XHJcblxyXG5pbXBvcnQgeyBEcmFnUGx1Z2luRGVmYXVsdFRlbXBsYXRlc0NvbXBvbmVudCB9IGZyb20gJy4vZGVmYXVsdC1zZXR0aW5ncy5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBQYmxOZ3JpZE1vZHVsZSxcclxuICAgIERyYWdEcm9wTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIERyYWdQbHVnaW5EZWZhdWx0VGVtcGxhdGVzQ29tcG9uZW50LFxyXG4gICAgQ2RrTGF6eURyb3BMaXN0LCBDZGtMYXp5RHJhZywgUGJsRHJhZ0hhbmRsZSxcclxuICAgIFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZSwgUGJsTmdyaWRSb3dEcmFnRGlyZWN0aXZlLFxyXG4gICAgUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlLCBQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmUsIFBibE5ncmlkQ2VsbERyYWdnZXJSZWZEaXJlY3RpdmUsXHJcbiAgICBQYmxOZ3JpZEFnZ3JlZ2F0aW9uQ29udGFpbmVyRGlyZWN0aXZlLFxyXG4gICAgUGJsTmdyaWREcmFnUmVzaXplQ29tcG9uZW50LCBQYmxOZ3JpZENlbGxSZXNpemVyUmVmRGlyZWN0aXZlLFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRHJhZ0Ryb3BNb2R1bGUsXHJcbiAgICBDZGtMYXp5RHJvcExpc3QsIENka0xhenlEcmFnLCBQYmxEcmFnSGFuZGxlLFxyXG4gICAgUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlLCBQYmxOZ3JpZFJvd0RyYWdEaXJlY3RpdmUsXHJcbiAgICBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmUsIFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZSwgUGJsTmdyaWRDZWxsRHJhZ2dlclJlZkRpcmVjdGl2ZSxcclxuICAgIFBibE5ncmlkQWdncmVnYXRpb25Db250YWluZXJEaXJlY3RpdmUsXHJcbiAgICBQYmxOZ3JpZERyYWdSZXNpemVDb21wb25lbnQsIFBibE5ncmlkQ2VsbFJlc2l6ZXJSZWZEaXJlY3RpdmUsXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIFBibERyYWdEcm9wLFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbIERyYWdQbHVnaW5EZWZhdWx0VGVtcGxhdGVzQ29tcG9uZW50IF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERyYWdNb2R1bGUge1xyXG5cclxuICBzdGF0aWMgd2l0aERlZmF1bHRUZW1wbGF0ZXMoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogUGJsTmdyaWREcmFnTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IHByb3ZpZGVDb21tb24oIFsgeyBjb21wb25lbnQ6IERyYWdQbHVnaW5EZWZhdWx0VGVtcGxhdGVzQ29tcG9uZW50IH0gXSksXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=