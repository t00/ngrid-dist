/**
 * @fileoverview added by tsickle
 * Generated from: lib/ext/grid-ext-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/** @type {?} */
export const EXT_API_TOKEN = new InjectionToken('PBL_NGRID_EXTERNAL_API');
/**
 * @record
 * @template T
 */
export function PblNgridExtensionApi() { }
if (false) {
    /** @type {?} */
    PblNgridExtensionApi.prototype.grid;
    /** @type {?} */
    PblNgridExtensionApi.prototype.element;
    /** @type {?} */
    PblNgridExtensionApi.prototype.cdkTable;
    /** @type {?} */
    PblNgridExtensionApi.prototype.columnStore;
    /** @type {?} */
    PblNgridExtensionApi.prototype.contextApi;
    /** @type {?} */
    PblNgridExtensionApi.prototype.events;
    /** @type {?} */
    PblNgridExtensionApi.prototype.metaRowService;
    /**
     * @param {?} fn
     * @return {?}
     */
    PblNgridExtensionApi.prototype.onInit = function (fn) { };
    /**
     * @param {?} viewport
     * @return {?}
     */
    PblNgridExtensionApi.prototype.setViewport = function (viewport) { };
    /**
     * @return {?}
     */
    PblNgridExtensionApi.prototype.dynamicColumnWidthFactory = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1leHQtYXBpLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9leHQvZ3JpZC1leHQtYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFXL0MsTUFBTSxPQUFPLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQzs7Ozs7QUFFekUsMENBV0M7OztJQVZDLG9DQUEyQjs7SUFDM0IsdUNBQXFCOztJQUNyQix3Q0FBa0M7O0lBQ2xDLDJDQUE0Qjs7SUFDNUIsMENBQTBCOztJQUMxQixzQ0FBbUM7O0lBQ25DLDhDQUF1Qzs7Ozs7SUFDdkMsMERBQTZCOzs7OztJQUM3QixxRUFBa0U7Ozs7SUFDbEUsMkVBQXFEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGJsQ2RrVGFibGVDb21wb25lbnQgfSBmcm9tICcuLi9ncmlkL3BibC1jZGstdGFibGUvcGJsLWNkay10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udGV4dEFwaSB9IGZyb20gJy4uL2dyaWQvY29udGV4dC9hcGknO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9ncmlkL25ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxDb2x1bW5TdG9yZSB9IGZyb20gJy4uL2dyaWQvY29sdW1ucy9jb2x1bW4tc3RvcmUnO1xuaW1wb3J0IHsgRHluYW1pY0NvbHVtbldpZHRoTG9naWMgfSBmcm9tICcuLi9ncmlkL2NvbC13aWR0aC1sb2dpYy9keW5hbWljLWNvbHVtbi13aWR0aCc7XG5pbXBvcnQgeyBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQgfSBmcm9tICcuLi9ncmlkL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudCdcbmltcG9ydCB7IFBibE5ncmlkRXZlbnRzIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlIH0gZnJvbSAnLi4vZ3JpZC9tZXRhLXJvd3MvaW5kZXgnO1xuXG5leHBvcnQgY29uc3QgRVhUX0FQSV9UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbignUEJMX05HUklEX0VYVEVSTkFMX0FQSScpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQgPSBhbnk+IHtcbiAgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD47XG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBjZGtUYWJsZTogUGJsQ2RrVGFibGVDb21wb25lbnQ8VD47XG4gIGNvbHVtblN0b3JlOiBQYmxDb2x1bW5TdG9yZTtcbiAgY29udGV4dEFwaTogQ29udGV4dEFwaTxUPjtcbiAgZXZlbnRzOiBPYnNlcnZhYmxlPFBibE5ncmlkRXZlbnRzPjtcbiAgbWV0YVJvd1NlcnZpY2U6IFBibE5ncmlkTWV0YVJvd1NlcnZpY2U7XG4gIG9uSW5pdChmbjogKCkgPT4gdm9pZCk6IHZvaWQ7XG4gIHNldFZpZXdwb3J0KHZpZXdwb3J0OiBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQpOiB2b2lkO1xuICBkeW5hbWljQ29sdW1uV2lkdGhGYWN0b3J5KCk6IER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljO1xufVxuIl19