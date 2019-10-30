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
    event => {
        if (event.kind === 'onDataSource') {
            const { curr, prev } = event;
            if (prev && prev.hostGrid === plugin.table) {
                prev.hostGrid = undefined;
            }
            if (curr) {
                curr.hostGrid = plugin.table;
            }
        }
        else if (event.kind === 'onDestroy') {
            /** @type {?} */
            const ds = plugin.table.ds;
            if (ds.hostGrid === plugin.table) {
                ds.hostGrid = undefined;
            }
        }
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZC10by1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9iaW5kLXRvLWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFTQSxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsTUFBNkI7SUFDNUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7O0lBQUUsS0FBSyxDQUFDLEVBQUU7UUFDL0IsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGNBQWMsRUFBRTtrQkFDM0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSztZQUM1QixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO2FBQzNCO1lBQ0QsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQzlCO1NBQ0Y7YUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFOztrQkFDL0IsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMxQixJQUFJLEVBQUUsQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDaEMsRUFBRSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7YUFDekI7U0FDRjtJQUNILENBQUMsRUFBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udGV4dCB9IGZyb20gJy4uL2V4dC9wbHVnaW4tY29udHJvbCc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4vdGFibGUuY29tcG9uZW50JztcblxuZGVjbGFyZSBtb2R1bGUgJy4uL2RhdGEtc291cmNlL2RhdGEtc291cmNlJyB7XG4gIGludGVyZmFjZSBQYmxEYXRhU291cmNlPFQgPSBhbnksIFREYXRhID0gYW55PiB7XG4gICAgaG9zdEdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRUb0RhdGFTb3VyY2UocGx1Z2luOiBQYmxOZ3JpZFBsdWdpbkNvbnRleHQpOiB2b2lkIHtcbiAgcGx1Z2luLmV2ZW50cy5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uRGF0YVNvdXJjZScpIHtcbiAgICAgIGNvbnN0IHsgY3VyciwgcHJldiB9ID0gZXZlbnQ7XG4gICAgICBpZiAocHJldiAmJiBwcmV2Lmhvc3RHcmlkID09PSBwbHVnaW4udGFibGUpIHtcbiAgICAgICAgcHJldi5ob3N0R3JpZCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyKSB7XG4gICAgICAgIGN1cnIuaG9zdEdyaWQgPSBwbHVnaW4udGFibGU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChldmVudC5raW5kID09PSAnb25EZXN0cm95Jykge1xuICAgICAgY29uc3QgZHMgPSBwbHVnaW4udGFibGUuZHM7XG4gICAgICBpZiAoZHMuaG9zdEdyaWQgPT09IHBsdWdpbi50YWJsZSkge1xuICAgICAgICBkcy5ob3N0R3JpZCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIl19