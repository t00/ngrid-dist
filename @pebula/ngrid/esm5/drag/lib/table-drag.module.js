/**
 * @fileoverview added by tsickle
 * Generated from: lib/table-drag.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PblNgridModule, provideCommon, ngridPlugin } from '@pebula/ngrid';
import { CdkLazyDropList, CdkLazyDrag, PblDragHandle } from './drag-and-drop/core/lazy-drag-drop';
import { PblNgridRowReorderPluginDirective, PblNgridRowDragDirective, ROW_REORDER_PLUGIN_KEY } from './drag-and-drop/row/row-reorder-plugin';
import { PblNgridColumnReorderPluginDirective, PblNgridColumnDragDirective, COL_REORDER_PLUGIN_KEY } from './drag-and-drop/column/column-reorder-plugin';
import { PblNgridCellDraggerRefDirective } from './drag-and-drop/column/cell-dragger-ref';
import { colReorderExtendGrid } from './drag-and-drop/column/extend-grid';
import { PblNgridAggregationContainerDirective } from './drag-and-drop/column/aggregation-column';
import { PblNgridDragResizeComponent, COL_RESIZE_PLUGIN_KEY } from './column-resize/column-resize.component';
import { PblNgridCellResizerRefDirective } from './column-resize/cell-resizer-ref';
import { colResizeExtendGrid } from './column-resize/extend-grid';
import { DragPluginDefaultTemplatesComponent } from './default-settings.component';
/**
 * @return {?}
 */
export function ngridPlugins() {
    return [
        ngridPlugin({ id: ROW_REORDER_PLUGIN_KEY }, PblNgridRowReorderPluginDirective),
        ngridPlugin({ id: COL_REORDER_PLUGIN_KEY, runOnce: colReorderExtendGrid }, PblNgridColumnReorderPluginDirective),
        ngridPlugin({ id: COL_RESIZE_PLUGIN_KEY, runOnce: colResizeExtendGrid }, PblNgridDragResizeComponent),
    ];
}
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
    PblNgridDragModule.NGRID_PLUGIN = ngridPlugins();
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
                    // TODO: remove when ViewEngine is no longer supported by angular (V11 ???)
                    entryComponents: [DragPluginDefaultTemplatesComponent]
                },] }
    ];
    return PblNgridDragModule;
}());
export { PblNgridDragModule };
if (false) {
    /** @type {?} */
    PblNgridDragModule.NGRID_PLUGIN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZHJhZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvdGFibGUtZHJhZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXhELE9BQU8sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNsRyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsd0JBQXdCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3SSxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsMkJBQTJCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN6SixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUMxRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUUxRSxPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUVsRyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RyxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNuRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVsRSxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7OztBQUVuRixNQUFNLFVBQVUsWUFBWTtJQUMxQixPQUFPO1FBQ0wsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLHNCQUFzQixFQUFFLEVBQUUsaUNBQWlDLENBQUM7UUFDOUUsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLHNCQUFzQixFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxFQUFFLG9DQUFvQyxDQUFDO1FBQ2hILFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSwyQkFBMkIsQ0FBQztLQUN0RyxDQUFBO0FBQ0gsQ0FBQztBQUVEO0lBQUE7SUFtQ0EsQ0FBQzs7OztJQU5RLHVDQUFvQjs7O0lBQTNCO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsU0FBUyxFQUFFLGFBQWEsQ0FBRSxDQUFFLEVBQUUsU0FBUyxFQUFFLG1DQUFtQyxFQUFFLENBQUUsQ0FBQztTQUNsRixDQUFDO0lBQ0osQ0FBQztJQVBlLCtCQUFZLEdBQUcsWUFBWSxFQUFFLENBQUM7O2dCQTNCL0MsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGNBQWM7d0JBQ2QsY0FBYztxQkFDZjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osbUNBQW1DO3dCQUNuQyxlQUFlLEVBQUUsV0FBVyxFQUFFLGFBQWE7d0JBQzNDLGlDQUFpQyxFQUFFLHdCQUF3Qjt3QkFDM0Qsb0NBQW9DLEVBQUUsMkJBQTJCLEVBQUUsK0JBQStCO3dCQUNsRyxxQ0FBcUM7d0JBQ3JDLDJCQUEyQixFQUFFLCtCQUErQjtxQkFDN0Q7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGNBQWM7d0JBQ2QsZUFBZSxFQUFFLFdBQVcsRUFBRSxhQUFhO3dCQUMzQyxpQ0FBaUMsRUFBRSx3QkFBd0I7d0JBQzNELG9DQUFvQyxFQUFFLDJCQUEyQixFQUFFLCtCQUErQjt3QkFDbEcscUNBQXFDO3dCQUNyQywyQkFBMkIsRUFBRSwrQkFBK0I7cUJBQzdEOztvQkFFRCxlQUFlLEVBQUUsQ0FBRSxtQ0FBbUMsQ0FBRTtpQkFDekQ7O0lBV0QseUJBQUM7Q0FBQSxBQW5DRCxJQW1DQztTQVZZLGtCQUFrQjs7O0lBRTdCLGdDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcblxuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUsIHByb3ZpZGVDb21tb24sIG5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCB7IENka0xhenlEcm9wTGlzdCwgQ2RrTGF6eURyYWcsIFBibERyYWdIYW5kbGUgfSBmcm9tICcuL2RyYWctYW5kLWRyb3AvY29yZS9sYXp5LWRyYWctZHJvcCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmUsIFBibE5ncmlkUm93RHJhZ0RpcmVjdGl2ZSwgUk9XX1JFT1JERVJfUExVR0lOX0tFWSB9IGZyb20gJy4vZHJhZy1hbmQtZHJvcC9yb3cvcm93LXJlb3JkZXItcGx1Z2luJztcbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZSwgUGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlLCBDT0xfUkVPUkRFUl9QTFVHSU5fS0VZIH0gZnJvbSAnLi9kcmFnLWFuZC1kcm9wL2NvbHVtbi9jb2x1bW4tcmVvcmRlci1wbHVnaW4nO1xuaW1wb3J0IHsgUGJsTmdyaWRDZWxsRHJhZ2dlclJlZkRpcmVjdGl2ZSB9IGZyb20gJy4vZHJhZy1hbmQtZHJvcC9jb2x1bW4vY2VsbC1kcmFnZ2VyLXJlZic7XG5pbXBvcnQgeyBjb2xSZW9yZGVyRXh0ZW5kR3JpZCB9IGZyb20gJy4vZHJhZy1hbmQtZHJvcC9jb2x1bW4vZXh0ZW5kLWdyaWQnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZEFnZ3JlZ2F0aW9uQ29udGFpbmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9kcmFnLWFuZC1kcm9wL2NvbHVtbi9hZ2dyZWdhdGlvbi1jb2x1bW4nO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZERyYWdSZXNpemVDb21wb25lbnQsIENPTF9SRVNJWkVfUExVR0lOX0tFWSB9IGZyb20gJy4vY29sdW1uLXJlc2l6ZS9jb2x1bW4tcmVzaXplLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxSZXNpemVyUmVmRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4tcmVzaXplL2NlbGwtcmVzaXplci1yZWYnO1xuaW1wb3J0IHsgY29sUmVzaXplRXh0ZW5kR3JpZCB9IGZyb20gJy4vY29sdW1uLXJlc2l6ZS9leHRlbmQtZ3JpZCc7XG5cbmltcG9ydCB7IERyYWdQbHVnaW5EZWZhdWx0VGVtcGxhdGVzQ29tcG9uZW50IH0gZnJvbSAnLi9kZWZhdWx0LXNldHRpbmdzLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBuZ3JpZFBsdWdpbnMoKSB7XG4gIHJldHVybiBbXG4gICAgbmdyaWRQbHVnaW4oeyBpZDogUk9XX1JFT1JERVJfUExVR0lOX0tFWSB9LCBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmUpLFxuICAgIG5ncmlkUGx1Z2luKHsgaWQ6IENPTF9SRU9SREVSX1BMVUdJTl9LRVksIHJ1bk9uY2U6IGNvbFJlb3JkZXJFeHRlbmRHcmlkIH0sIFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZSksXG4gICAgbmdyaWRQbHVnaW4oeyBpZDogQ09MX1JFU0laRV9QTFVHSU5fS0VZLCBydW5PbmNlOiBjb2xSZXNpemVFeHRlbmRHcmlkIH0sIFBibE5ncmlkRHJhZ1Jlc2l6ZUNvbXBvbmVudCksXG4gIF1cbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBQYmxOZ3JpZE1vZHVsZSxcbiAgICBEcmFnRHJvcE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEcmFnUGx1Z2luRGVmYXVsdFRlbXBsYXRlc0NvbXBvbmVudCxcbiAgICBDZGtMYXp5RHJvcExpc3QsIENka0xhenlEcmFnLCBQYmxEcmFnSGFuZGxlLFxuICAgIFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZSwgUGJsTmdyaWRSb3dEcmFnRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZSwgUGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlLCBQYmxOZ3JpZENlbGxEcmFnZ2VyUmVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkQWdncmVnYXRpb25Db250YWluZXJEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWREcmFnUmVzaXplQ29tcG9uZW50LCBQYmxOZ3JpZENlbGxSZXNpemVyUmVmRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRHJhZ0Ryb3BNb2R1bGUsXG4gICAgQ2RrTGF6eURyb3BMaXN0LCBDZGtMYXp5RHJhZywgUGJsRHJhZ0hhbmRsZSxcbiAgICBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmUsIFBibE5ncmlkUm93RHJhZ0RpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmUsIFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZSwgUGJsTmdyaWRDZWxsRHJhZ2dlclJlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEFnZ3JlZ2F0aW9uQ29udGFpbmVyRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkRHJhZ1Jlc2l6ZUNvbXBvbmVudCwgUGJsTmdyaWRDZWxsUmVzaXplclJlZkRpcmVjdGl2ZSxcbiAgXSxcbiAgLy8gVE9ETzogcmVtb3ZlIHdoZW4gVmlld0VuZ2luZSBpcyBubyBsb25nZXIgc3VwcG9ydGVkIGJ5IGFuZ3VsYXIgKFYxMSA/Pz8pXG4gIGVudHJ5Q29tcG9uZW50czogWyBEcmFnUGx1Z2luRGVmYXVsdFRlbXBsYXRlc0NvbXBvbmVudCBdXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRHJhZ01vZHVsZSB7XG5cbiAgc3RhdGljIHJlYWRvbmx5IE5HUklEX1BMVUdJTiA9IG5ncmlkUGx1Z2lucygpO1xuXG4gIHN0YXRpYyB3aXRoRGVmYXVsdFRlbXBsYXRlcygpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFBibE5ncmlkRHJhZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogUGJsTmdyaWREcmFnTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBwcm92aWRlQ29tbW9uKCBbIHsgY29tcG9uZW50OiBEcmFnUGx1Z2luRGVmYXVsdFRlbXBsYXRlc0NvbXBvbmVudCB9IF0pLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==