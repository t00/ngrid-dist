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
    event => {
        if (event.kind === 'onDataSource') {
            const { curr, prev } = event;
            if (prev && prev.hostGrid === plugin.grid) {
                prev.hostGrid = undefined;
            }
            if (curr) {
                curr.hostGrid = plugin.grid;
            }
        }
        else if (event.kind === 'onDestroy') {
            /** @type {?} */
            const ds = plugin.grid.ds;
            if (ds.hostGrid === plugin.grid) {
                ds.hostGrid = undefined;
            }
        }
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZC10by1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2JpbmQtdG8tZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFTQSxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsTUFBNkI7SUFDNUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7O0lBQUUsS0FBSyxDQUFDLEVBQUU7UUFDL0IsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGNBQWMsRUFBRTtrQkFDM0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSztZQUM1QixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO2FBQzNCO1lBQ0QsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQzdCO1NBQ0Y7YUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFOztrQkFDL0IsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QixJQUFJLEVBQUUsQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDL0IsRUFBRSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7YUFDekI7U0FDRjtJQUNILENBQUMsRUFBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udGV4dCB9IGZyb20gJy4uL2V4dC9wbHVnaW4tY29udHJvbCc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4vbmdyaWQuY29tcG9uZW50JztcblxuZGVjbGFyZSBtb2R1bGUgJy4uL2RhdGEtc291cmNlL2RhdGEtc291cmNlJyB7XG4gIGludGVyZmFjZSBQYmxEYXRhU291cmNlPFQgPSBhbnksIFREYXRhID0gYW55PiB7XG4gICAgaG9zdEdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRUb0RhdGFTb3VyY2UocGx1Z2luOiBQYmxOZ3JpZFBsdWdpbkNvbnRleHQpOiB2b2lkIHtcbiAgcGx1Z2luLmV2ZW50cy5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uRGF0YVNvdXJjZScpIHtcbiAgICAgIGNvbnN0IHsgY3VyciwgcHJldiB9ID0gZXZlbnQ7XG4gICAgICBpZiAocHJldiAmJiBwcmV2Lmhvc3RHcmlkID09PSBwbHVnaW4uZ3JpZCkge1xuICAgICAgICBwcmV2Lmhvc3RHcmlkID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnIpIHtcbiAgICAgICAgY3Vyci5ob3N0R3JpZCA9IHBsdWdpbi5ncmlkO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2luZCA9PT0gJ29uRGVzdHJveScpIHtcbiAgICAgIGNvbnN0IGRzID0gcGx1Z2luLmdyaWQuZHM7XG4gICAgICBpZiAoZHMuaG9zdEdyaWQgPT09IHBsdWdpbi5ncmlkKSB7XG4gICAgICAgIGRzLmhvc3RHcmlkID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG4iXX0=