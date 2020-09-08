/**
 * @fileoverview added by tsickle
 * Generated from: lib/core/built-in-handlers/grid-primitives/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { createStateChunkHandler } from '../../handling';
import { stateVisor } from '../../state-visor';
/**
 * @record
 */
export function PblNgridSurfaceState() { }
/**
 * @return {?}
 */
export function registerGridHandlers() {
    stateVisor.registerRootChunkSection('grid', {
        sourceMatcher: (/**
         * @param {?} ctx
         * @return {?}
         */
        ctx => ctx.grid),
        stateMatcher: (/**
         * @param {?} state
         * @return {?}
         */
        state => state.grid || (state.grid = (/** @type {?} */ ({}))))
    });
    createStateChunkHandler('grid')
        .handleKeys('showHeader', 'showFooter', 'focusMode', 'usePagination', 'hideColumns', 'fallbackMinHeight')
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    (key, ctx) => ctx.source[key]))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    (key, stateValue, ctx) => {
        // We must assert the type starting from 3.5 onwards
        // See "Fixes to unsound writes to indexed access types" in https://devblogs.microsoft.com/typescript/announcing-typescript-3-5
        ctx.source[(/** @type {?} */ (key))] = stateValue;
    }))
        .register();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvYnVpbHQtaW4taGFuZGxlcnMvZ3JpZC1wcmltaXRpdmVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRS9DLDBDQUtPOzs7O0FBRVAsTUFBTSxVQUFVLG9CQUFvQjtJQUNsQyxVQUFVLENBQUMsd0JBQXdCLENBQ2pDLE1BQU0sRUFDTjtRQUNFLGFBQWE7Ozs7UUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUE7UUFDOUIsWUFBWTs7OztRQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsbUJBQUEsRUFBRSxFQUFPLENBQUMsQ0FBQTtLQUM5RCxDQUNGLENBQUM7SUFFRix1QkFBdUIsQ0FBQyxNQUFNLENBQUM7U0FDNUIsVUFBVSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsbUJBQW1CLENBQUM7U0FDeEcsU0FBUzs7Ozs7SUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7U0FDMUMsV0FBVzs7Ozs7O0lBQUUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3JDLG9EQUFvRDtRQUNwRCwrSEFBK0g7UUFDL0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxtQkFBQSxHQUFHLEVBQU8sQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUN0QyxDQUFDLEVBQUM7U0FDRCxRQUFRLEVBQUUsQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBpY2tQTlAgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBjcmVhdGVTdGF0ZUNodW5rSGFuZGxlciB9IGZyb20gJy4uLy4uL2hhbmRsaW5nJztcbmltcG9ydCB7IHN0YXRlVmlzb3IgfSBmcm9tICcuLi8uLi9zdGF0ZS12aXNvcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRTdXJmYWNlU3RhdGUgZXh0ZW5kc1xuICBQaWNrUE5QIDxcbiAgICBQYmxOZ3JpZENvbXBvbmVudCxcbiAgICAnc2hvd0hlYWRlcicgfCAnc2hvd0Zvb3RlcicgfCAnZm9jdXNNb2RlJyB8ICd1c2VQYWdpbmF0aW9uJyB8ICdoaWRlQ29sdW1ucycgfCAnZmFsbGJhY2tNaW5IZWlnaHQnLFxuICAgIG5ldmVyXG4gID4geyB9XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckdyaWRIYW5kbGVycygpIHtcbiAgc3RhdGVWaXNvci5yZWdpc3RlclJvb3RDaHVua1NlY3Rpb24oXG4gICAgJ2dyaWQnLFxuICAgIHtcbiAgICAgIHNvdXJjZU1hdGNoZXI6IGN0eCA9PiBjdHguZ3JpZCxcbiAgICAgIHN0YXRlTWF0Y2hlcjogc3RhdGUgPT4gc3RhdGUuZ3JpZCB8fCAoc3RhdGUuZ3JpZCA9IHt9IGFzIGFueSlcbiAgICB9XG4gICk7XG5cbiAgY3JlYXRlU3RhdGVDaHVua0hhbmRsZXIoJ2dyaWQnKVxuICAgIC5oYW5kbGVLZXlzKCdzaG93SGVhZGVyJywgJ3Nob3dGb290ZXInLCAnZm9jdXNNb2RlJywgJ3VzZVBhZ2luYXRpb24nLCAnaGlkZUNvbHVtbnMnLCAnZmFsbGJhY2tNaW5IZWlnaHQnKVxuICAgIC5zZXJpYWxpemUoIChrZXksIGN0eCkgPT4gY3R4LnNvdXJjZVtrZXldIClcbiAgICAuZGVzZXJpYWxpemUoIChrZXksIHN0YXRlVmFsdWUsIGN0eCkgPT4ge1xuICAgICAgLy8gV2UgbXVzdCBhc3NlcnQgdGhlIHR5cGUgc3RhcnRpbmcgZnJvbSAzLjUgb253YXJkc1xuICAgICAgLy8gU2VlIFwiRml4ZXMgdG8gdW5zb3VuZCB3cml0ZXMgdG8gaW5kZXhlZCBhY2Nlc3MgdHlwZXNcIiBpbiBodHRwczovL2RldmJsb2dzLm1pY3Jvc29mdC5jb20vdHlwZXNjcmlwdC9hbm5vdW5jaW5nLXR5cGVzY3JpcHQtMy01XG4gICAgICBjdHguc291cmNlW2tleSBhcyBhbnldID0gc3RhdGVWYWx1ZTtcbiAgICB9KVxuICAgIC5yZWdpc3RlcigpO1xufVxuIl19