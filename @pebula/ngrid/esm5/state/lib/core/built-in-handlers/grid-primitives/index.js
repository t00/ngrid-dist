/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvYnVpbHQtaW4taGFuZGxlcnMvZ3JpZC1wcmltaXRpdmVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7QUFFL0MsMENBS087Ozs7QUFFUCxNQUFNLFVBQVUsb0JBQW9CO0lBQ2xDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FDakMsTUFBTSxFQUNOO1FBQ0UsYUFBYTs7OztRQUFFLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBUixDQUFRLENBQUE7UUFDOUIsWUFBWTs7OztRQUFFLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsbUJBQUEsRUFBRSxFQUFPLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQTtLQUM5RCxDQUNGLENBQUM7SUFFRix1QkFBdUIsQ0FBQyxNQUFNLENBQUM7U0FDNUIsVUFBVSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsbUJBQW1CLENBQUM7U0FDeEcsU0FBUzs7Ozs7SUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLElBQUssT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFmLENBQWUsRUFBRTtTQUMxQyxXQUFXOzs7Ozs7SUFBRSxVQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsR0FBRztRQUNqQyxvREFBb0Q7UUFDcEQsK0hBQStIO1FBQy9ILEdBQUcsQ0FBQyxNQUFNLENBQUMsbUJBQUEsR0FBRyxFQUFPLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDdEMsQ0FBQyxFQUFDO1NBQ0QsUUFBUSxFQUFFLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQaWNrUE5QIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgY3JlYXRlU3RhdGVDaHVua0hhbmRsZXIgfSBmcm9tICcuLi8uLi9oYW5kbGluZyc7XG5pbXBvcnQgeyBzdGF0ZVZpc29yIH0gZnJvbSAnLi4vLi4vc3RhdGUtdmlzb3InO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkU3VyZmFjZVN0YXRlIGV4dGVuZHNcbiAgUGlja1BOUCA8XG4gICAgUGJsTmdyaWRDb21wb25lbnQsXG4gICAgJ3Nob3dIZWFkZXInIHwgJ3Nob3dGb290ZXInIHwgJ2ZvY3VzTW9kZScgfCAndXNlUGFnaW5hdGlvbicgfCAnaGlkZUNvbHVtbnMnIHwgJ2ZhbGxiYWNrTWluSGVpZ2h0JyxcbiAgICBuZXZlclxuICA+IHsgfVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJHcmlkSGFuZGxlcnMoKSB7XG4gIHN0YXRlVmlzb3IucmVnaXN0ZXJSb290Q2h1bmtTZWN0aW9uKFxuICAgICdncmlkJyxcbiAgICB7XG4gICAgICBzb3VyY2VNYXRjaGVyOiBjdHggPT4gY3R4LmdyaWQsXG4gICAgICBzdGF0ZU1hdGNoZXI6IHN0YXRlID0+IHN0YXRlLmdyaWQgfHwgKHN0YXRlLmdyaWQgPSB7fSBhcyBhbnkpXG4gICAgfVxuICApO1xuXG4gIGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyKCdncmlkJylcbiAgICAuaGFuZGxlS2V5cygnc2hvd0hlYWRlcicsICdzaG93Rm9vdGVyJywgJ2ZvY3VzTW9kZScsICd1c2VQYWdpbmF0aW9uJywgJ2hpZGVDb2x1bW5zJywgJ2ZhbGxiYWNrTWluSGVpZ2h0JylcbiAgICAuc2VyaWFsaXplKCAoa2V5LCBjdHgpID0+IGN0eC5zb3VyY2Vba2V5XSApXG4gICAgLmRlc2VyaWFsaXplKCAoa2V5LCBzdGF0ZVZhbHVlLCBjdHgpID0+IHtcbiAgICAgIC8vIFdlIG11c3QgYXNzZXJ0IHRoZSB0eXBlIHN0YXJ0aW5nIGZyb20gMy41IG9ud2FyZHNcbiAgICAgIC8vIFNlZSBcIkZpeGVzIHRvIHVuc291bmQgd3JpdGVzIHRvIGluZGV4ZWQgYWNjZXNzIHR5cGVzXCIgaW4gaHR0cHM6Ly9kZXZibG9ncy5taWNyb3NvZnQuY29tL3R5cGVzY3JpcHQvYW5ub3VuY2luZy10eXBlc2NyaXB0LTMtNVxuICAgICAgY3R4LnNvdXJjZVtrZXkgYXMgYW55XSA9IHN0YXRlVmFsdWU7XG4gICAgfSlcbiAgICAucmVnaXN0ZXIoKTtcbn1cbiJdfQ==