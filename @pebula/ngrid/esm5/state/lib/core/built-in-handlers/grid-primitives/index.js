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
        function (ctx) { return ctx.grid; }),
        stateMatcher: (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.grid || (state.grid = (/** @type {?} */ ({}))); })
    });
    createStateChunkHandler('grid')
        .handleKeys('showHeader', 'showFooter', 'focusMode', 'usePagination', 'hideColumns', 'fallbackMinHeight')
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    function (key, ctx) { return ctx.source[key]; }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    function (key, stateValue, ctx) {
        // We must assert the type starting from 3.5 onwards
        // See "Fixes to unsound writes to indexed access types" in https://devblogs.microsoft.com/typescript/announcing-typescript-3-5
        ctx.source[(/** @type {?} */ (key))] = stateValue;
    }))
        .register();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvYnVpbHQtaW4taGFuZGxlcnMvZ3JpZC1wcmltaXRpdmVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRS9DLDBDQUtPOzs7O0FBRVAsTUFBTSxVQUFVLG9CQUFvQjtJQUNsQyxVQUFVLENBQUMsd0JBQXdCLENBQ2pDLE1BQU0sRUFDTjtRQUNFLGFBQWE7Ozs7UUFBRSxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQVIsQ0FBUSxDQUFBO1FBQzlCLFlBQVk7Ozs7UUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLG1CQUFBLEVBQUUsRUFBTyxDQUFDLEVBQXRDLENBQXNDLENBQUE7S0FDOUQsQ0FDRixDQUFDO0lBRUYsdUJBQXVCLENBQUMsTUFBTSxDQUFDO1NBQzVCLFVBQVUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLG1CQUFtQixDQUFDO1NBQ3hHLFNBQVM7Ozs7O0lBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRyxJQUFLLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBZixDQUFlLEVBQUU7U0FDMUMsV0FBVzs7Ozs7O0lBQUUsVUFBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUc7UUFDakMsb0RBQW9EO1FBQ3BELCtIQUErSDtRQUMvSCxHQUFHLENBQUMsTUFBTSxDQUFDLG1CQUFBLEdBQUcsRUFBTyxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ3RDLENBQUMsRUFBQztTQUNELFFBQVEsRUFBRSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGlja1BOUCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyIH0gZnJvbSAnLi4vLi4vaGFuZGxpbmcnO1xuaW1wb3J0IHsgc3RhdGVWaXNvciB9IGZyb20gJy4uLy4uL3N0YXRlLXZpc29yJztcblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZFN1cmZhY2VTdGF0ZSBleHRlbmRzXG4gIFBpY2tQTlAgPFxuICAgIFBibE5ncmlkQ29tcG9uZW50LFxuICAgICdzaG93SGVhZGVyJyB8ICdzaG93Rm9vdGVyJyB8ICdmb2N1c01vZGUnIHwgJ3VzZVBhZ2luYXRpb24nIHwgJ2hpZGVDb2x1bW5zJyB8ICdmYWxsYmFja01pbkhlaWdodCcsXG4gICAgbmV2ZXJcbiAgPiB7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyR3JpZEhhbmRsZXJzKCkge1xuICBzdGF0ZVZpc29yLnJlZ2lzdGVyUm9vdENodW5rU2VjdGlvbihcbiAgICAnZ3JpZCcsXG4gICAge1xuICAgICAgc291cmNlTWF0Y2hlcjogY3R4ID0+IGN0eC5ncmlkLFxuICAgICAgc3RhdGVNYXRjaGVyOiBzdGF0ZSA9PiBzdGF0ZS5ncmlkIHx8IChzdGF0ZS5ncmlkID0ge30gYXMgYW55KVxuICAgIH1cbiAgKTtcblxuICBjcmVhdGVTdGF0ZUNodW5rSGFuZGxlcignZ3JpZCcpXG4gICAgLmhhbmRsZUtleXMoJ3Nob3dIZWFkZXInLCAnc2hvd0Zvb3RlcicsICdmb2N1c01vZGUnLCAndXNlUGFnaW5hdGlvbicsICdoaWRlQ29sdW1ucycsICdmYWxsYmFja01pbkhlaWdodCcpXG4gICAgLnNlcmlhbGl6ZSggKGtleSwgY3R4KSA9PiBjdHguc291cmNlW2tleV0gKVxuICAgIC5kZXNlcmlhbGl6ZSggKGtleSwgc3RhdGVWYWx1ZSwgY3R4KSA9PiB7XG4gICAgICAvLyBXZSBtdXN0IGFzc2VydCB0aGUgdHlwZSBzdGFydGluZyBmcm9tIDMuNSBvbndhcmRzXG4gICAgICAvLyBTZWUgXCJGaXhlcyB0byB1bnNvdW5kIHdyaXRlcyB0byBpbmRleGVkIGFjY2VzcyB0eXBlc1wiIGluIGh0dHBzOi8vZGV2YmxvZ3MubWljcm9zb2Z0LmNvbS90eXBlc2NyaXB0L2Fubm91bmNpbmctdHlwZXNjcmlwdC0zLTVcbiAgICAgIGN0eC5zb3VyY2Vba2V5IGFzIGFueV0gPSBzdGF0ZVZhbHVlO1xuICAgIH0pXG4gICAgLnJlZ2lzdGVyKCk7XG59XG4iXX0=