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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZC10by1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2JpbmQtdG8tZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQVNBLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxNQUE2QjtJQUM1RCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7SUFBRSxVQUFBLEtBQUs7UUFDNUIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGNBQWMsRUFBRTtZQUN6QixJQUFBLGlCQUFJLEVBQUUsaUJBQUk7WUFDbEIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQzthQUMzQjtZQUNELElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQzthQUM3QjtTQUNGO2FBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTs7Z0JBQy9CLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekIsSUFBSSxFQUFFLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQy9CLEVBQUUsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO2FBQ3pCO1NBQ0Y7SUFDSCxDQUFDLEVBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRleHQgfSBmcm9tICcuLi9leHQvcGx1Z2luLWNvbnRyb2wnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuL25ncmlkLmNvbXBvbmVudCc7XG5cbmRlY2xhcmUgbW9kdWxlICcuLi9kYXRhLXNvdXJjZS9kYXRhLXNvdXJjZScge1xuICBpbnRlcmZhY2UgUGJsRGF0YVNvdXJjZTxUID0gYW55LCBURGF0YSA9IGFueT4ge1xuICAgIGhvc3RHcmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPlxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kVG9EYXRhU291cmNlKHBsdWdpbjogUGJsTmdyaWRQbHVnaW5Db250ZXh0KTogdm9pZCB7XG4gIHBsdWdpbi5ldmVudHMuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkRhdGFTb3VyY2UnKSB7XG4gICAgICBjb25zdCB7IGN1cnIsIHByZXYgfSA9IGV2ZW50O1xuICAgICAgaWYgKHByZXYgJiYgcHJldi5ob3N0R3JpZCA9PT0gcGx1Z2luLmdyaWQpIHtcbiAgICAgICAgcHJldi5ob3N0R3JpZCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyKSB7XG4gICAgICAgIGN1cnIuaG9zdEdyaWQgPSBwbHVnaW4uZ3JpZDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkRlc3Ryb3knKSB7XG4gICAgICBjb25zdCBkcyA9IHBsdWdpbi5ncmlkLmRzO1xuICAgICAgaWYgKGRzLmhvc3RHcmlkID09PSBwbHVnaW4uZ3JpZCkge1xuICAgICAgICBkcy5ob3N0R3JpZCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIl19