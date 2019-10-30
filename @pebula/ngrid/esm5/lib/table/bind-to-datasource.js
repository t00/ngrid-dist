/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            if (prev && prev.hostGrid === plugin.table) {
                prev.hostGrid = undefined;
            }
            if (curr) {
                curr.hostGrid = plugin.table;
            }
        }
        else if (event.kind === 'onDestroy') {
            /** @type {?} */
            var ds = plugin.table.ds;
            if (ds.hostGrid === plugin.table) {
                ds.hostGrid = undefined;
            }
        }
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZC10by1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9iaW5kLXRvLWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFTQSxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsTUFBNkI7SUFDNUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7O0lBQUUsVUFBQSxLQUFLO1FBQzVCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxjQUFjLEVBQUU7WUFDekIsSUFBQSxpQkFBSSxFQUFFLGlCQUFJO1lBQ2xCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7YUFDM0I7WUFDRCxJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDOUI7U0FDRjthQUFNLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7O2dCQUMvQixFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzFCLElBQUksRUFBRSxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxFQUFFLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQzthQUN6QjtTQUNGO0lBQ0gsQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250ZXh0IH0gZnJvbSAnLi4vZXh0L3BsdWdpbi1jb250cm9sJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS5jb21wb25lbnQnO1xuXG5kZWNsYXJlIG1vZHVsZSAnLi4vZGF0YS1zb3VyY2UvZGF0YS1zb3VyY2UnIHtcbiAgaW50ZXJmYWNlIFBibERhdGFTb3VyY2U8VCA9IGFueSwgVERhdGEgPSBhbnk+IHtcbiAgICBob3N0R3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD5cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYmluZFRvRGF0YVNvdXJjZShwbHVnaW46IFBibE5ncmlkUGx1Z2luQ29udGV4dCk6IHZvaWQge1xuICBwbHVnaW4uZXZlbnRzLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgIGlmIChldmVudC5raW5kID09PSAnb25EYXRhU291cmNlJykge1xuICAgICAgY29uc3QgeyBjdXJyLCBwcmV2IH0gPSBldmVudDtcbiAgICAgIGlmIChwcmV2ICYmIHByZXYuaG9zdEdyaWQgPT09IHBsdWdpbi50YWJsZSkge1xuICAgICAgICBwcmV2Lmhvc3RHcmlkID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnIpIHtcbiAgICAgICAgY3Vyci5ob3N0R3JpZCA9IHBsdWdpbi50YWJsZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkRlc3Ryb3knKSB7XG4gICAgICBjb25zdCBkcyA9IHBsdWdpbi50YWJsZS5kcztcbiAgICAgIGlmIChkcy5ob3N0R3JpZCA9PT0gcGx1Z2luLnRhYmxlKSB7XG4gICAgICAgIGRzLmhvc3RHcmlkID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG4iXX0=