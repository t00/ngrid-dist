/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/bind-to-datasource.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} plugin
 * @return {?}
 */
export function bindToDataSource(plugin) {
    plugin.events.subscribe((/**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.kind === 'onDataSource') {
            var curr = event.curr, prev = event.prev;
            if (prev && prev.hostGrid === plugin.grid) {
                prev.hostGrid = undefined;
            }
            if (curr) {
                curr.hostGrid = plugin.grid;
            }
        }
        else if (event.kind === 'onDestroy') {
            /** @type {?} */
            var ds = plugin.grid.ds;
            if (ds.hostGrid === plugin.grid) {
                ds.hostGrid = undefined;
            }
        }
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZC10by1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2JpbmQtdG8tZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFTQSxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsTUFBNkI7SUFDNUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7O0lBQUUsVUFBQSxLQUFLO1FBQzVCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxjQUFjLEVBQUU7WUFDekIsSUFBQSxpQkFBSSxFQUFFLGlCQUFJO1lBQ2xCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7YUFDM0I7WUFDRCxJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDN0I7U0FDRjthQUFNLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7O2dCQUMvQixFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3pCLElBQUksRUFBRSxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUMvQixFQUFFLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQzthQUN6QjtTQUNGO0lBQ0gsQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250ZXh0IH0gZnJvbSAnLi4vZXh0L3BsdWdpbi1jb250cm9sJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3JpZC5jb21wb25lbnQnO1xuXG5kZWNsYXJlIG1vZHVsZSAnLi4vZGF0YS1zb3VyY2UvZGF0YS1zb3VyY2UnIHtcbiAgaW50ZXJmYWNlIFBibERhdGFTb3VyY2U8VCA9IGFueSwgVERhdGEgPSBhbnk+IHtcbiAgICBob3N0R3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD5cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYmluZFRvRGF0YVNvdXJjZShwbHVnaW46IFBibE5ncmlkUGx1Z2luQ29udGV4dCk6IHZvaWQge1xuICBwbHVnaW4uZXZlbnRzLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgIGlmIChldmVudC5raW5kID09PSAnb25EYXRhU291cmNlJykge1xuICAgICAgY29uc3QgeyBjdXJyLCBwcmV2IH0gPSBldmVudDtcbiAgICAgIGlmIChwcmV2ICYmIHByZXYuaG9zdEdyaWQgPT09IHBsdWdpbi5ncmlkKSB7XG4gICAgICAgIHByZXYuaG9zdEdyaWQgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAoY3Vycikge1xuICAgICAgICBjdXJyLmhvc3RHcmlkID0gcGx1Z2luLmdyaWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChldmVudC5raW5kID09PSAnb25EZXN0cm95Jykge1xuICAgICAgY29uc3QgZHMgPSBwbHVnaW4uZ3JpZC5kcztcbiAgICAgIGlmIChkcy5ob3N0R3JpZCA9PT0gcGx1Z2luLmdyaWQpIHtcbiAgICAgICAgZHMuaG9zdEdyaWQgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==