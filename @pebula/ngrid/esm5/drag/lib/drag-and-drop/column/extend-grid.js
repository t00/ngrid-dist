/**
 * @fileoverview added by tsickle
 * Generated from: lib/drag-and-drop/column/extend-grid.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __values } from "tslib";
import { PblColumn, PblColumnGroup } from '@pebula/ngrid';
/**
 * @this {?}
 * @param {?} column
 * @return {?}
 */
function checkGroupLockConstraint(column) {
    var e_1, _a;
    try {
        for (var _b = __values(this.groups), _c = _b.next(); !_c.done; _c = _b.next()) {
            var id = _c.value;
            /** @type {?} */
            var g = this.groupStore.find(id);
            if (g && g.lockColumns && !column.isInGroup(g)) {
                return false;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return true;
}
/**
 * @return {?}
 */
export function colReorderExtendGrid() {
    PblColumn.extendProperty('reorder');
    PblColumn.extendProperty('wontBudge');
    PblColumnGroup.extendProperty('lockColumns');
    PblColumn.prototype.checkGroupLockConstraint = (/**
     * @this {?}
     * @param {?} column
     * @return {?}
     */
    function (column) {
        return checkGroupLockConstraint.call(this, column) && checkGroupLockConstraint.call(column, this);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kLWdyaWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvZHJhZy1hbmQtZHJvcC9jb2x1bW4vZXh0ZW5kLWdyaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQW1EMUQsU0FBUyx3QkFBd0IsQ0FBa0IsTUFBaUI7OztRQUNsRSxLQUFpQixJQUFBLEtBQUEsU0FBQSxJQUFJLENBQUMsTUFBTSxDQUFBLGdCQUFBLDRCQUFFO1lBQXpCLElBQU0sRUFBRSxXQUFBOztnQkFDTCxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM5QyxPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7Ozs7Ozs7OztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQzs7OztBQUVELE1BQU0sVUFBVSxvQkFBb0I7SUFDbEMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxTQUFTLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RDLGNBQWMsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFN0MsU0FBUyxDQUFDLFNBQVMsQ0FBQyx3QkFBd0I7Ozs7O0lBQUcsVUFBMkIsTUFBaUI7UUFDekYsT0FBTyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLHdCQUF3QixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEcsQ0FBQyxDQUFBLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsQ29sdW1uLCBQYmxDb2x1bW5Hcm91cCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZ3JpZC9jb2x1bW5zL2NvbHVtbicge1xuICBpbnRlcmZhY2UgUGJsQ29sdW1uIHtcblxuICAgIHJlb3JkZXI6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogV2hlbiB0cnVlLCB0aGUgaXRlbSBjYW4gYmUgcmVvcmRlcmVkIGJhc2VkIG9uIHRoZSBgcmVvcmRlcmAgcHJvcGVydHkgYnV0XG4gICAgICogd2lsbCBub3QgbW92ZSAoYnVkZ2UpIHdoZW4gb3RoZXIgaXRlbXMgYXJlIHJlb3JkZXJlZC5cbiAgICAgKi9cbiAgICB3b250QnVkZ2U6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIGJ5IHN3aXRjaGluZyBiZXR3ZWVuIHRoaXMgY29sdW1uIGFuZCB0aGUgcHJvdmlkZWQgY29sdW1uIHRoZSBgbG9ja0NvbHVtbnNgIGNvbnN0cmFpbnQgaXMgdHJpZ2dlcmVkLlxuICAgICAqIFRoZSBsb2NrQ29sdW1ucyBjb25zdHJhaW50IGlzIHNldCBvbiBhIGdyb3VwIGFuZCByZXN0cmljdCBzcGxpdHRpbmcgb2YgZ3JvdXBzLlxuICAgICAqIEEgQ29sdW1uIHdpdGggYSBsb2NrZWQgZ3JvdXAgd2lsbCBub3QgYmUgYWxsb3dlZCB0byBsZWF2ZSB0aGUgZ3JvdXAgbm9yIG5ldyBpdGVtcyBhcmUgYWxsb3dlZCB0aGF0IHNwbGl0IHRoZSBncm91cC5cbiAgICAgKlxuICAgICAqIFRoZSBwcm9jZXNzIHdpbGwgY2hlY2sgYm90aCBzY2VuYXJpb3MuXG4gICAgICovXG4gICAgY2hlY2tHcm91cExvY2tDb25zdHJhaW50KGNvbHVtbjogUGJsQ29sdW1uKTogYm9vbGVhbjtcbiAgfVxufVxuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZ3JpZC9jb2x1bW5zL2dyb3VwLWNvbHVtbicge1xuICBpbnRlcmZhY2UgUGJsQ29sdW1uR3JvdXAge1xuICAgIC8qKlxuICAgICAqIExvY2sgY29sdW1uIGluIHRoZSBncm91cCwgcHJldmVudGluZyB0aGUgZ3JvdXAgZnJvbSBzcGxpdHRpbmcuXG4gICAgICogU3BsaXR0aW5nIGlzIGJsb2NrIGFjdGl2ZWx5IChjb2x1bW4gZnJvbSB0aGUgZ3JvdXAgZHJhZ2dlZCBvdXRzaWRlKSBhbmQgcGFzc2l2ZWx5IChjb2x1bW4gb3V0c2lkZSBvZiB0aGUgZ3JvdXAgZHJhZ2dpbmcgaW50byB0aGUgZ3JvdXApLlxuICAgICAqL1xuICAgIGxvY2tDb2x1bW5zPzogYm9vbGVhbjtcbiAgfVxufVxuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZ3JpZC9jb2x1bW5zL3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxDb2x1bW5EZWZpbml0aW9uIHtcbiAgICByZW9yZGVyPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBXaGVuIHRydWUsIHRoZSBpdGVtIGNhbiBiZSByZW9yZGVyZWQgYmFzZWQgb24gdGhlIGByZW9yZGVyYCBwcm9wZXJ0eSBidXRcbiAgICAgKiB3aWxsIG5vdCBtb3ZlIChidWRnZSkgd2hlbiBvdGhlciBpdGVtcyBhcmUgcmVvcmRlcmVkLlxuICAgICAqL1xuICAgIHdvbnRCdWRnZT86IGJvb2xlYW47XG4gIH1cbiAgaW50ZXJmYWNlIFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbiB7XG4gICAgLyoqXG4gICAgICogTG9jayBjb2x1bW4gaW4gdGhlIGdyb3VwLCBwcmV2ZW50aW5nIHRoZSBncm91cCBmcm9tIHNwbGl0dGluZy5cbiAgICAgKiBTcGxpdHRpbmcgaXMgYmxvY2sgYWN0aXZlbHkgKGNvbHVtbiBmcm9tIHRoZSBncm91cCBkcmFnZ2VkIG91dHNpZGUpIGFuZCBwYXNzaXZlbHkgKGNvbHVtbiBvdXRzaWRlIG9mIHRoZSBncm91cCBkcmFnZ2luZyBpbnRvIHRoZSBncm91cCkuXG4gICAgICovXG4gICAgbG9ja0NvbHVtbnM/OiBib29sZWFuO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrR3JvdXBMb2NrQ29uc3RyYWludCh0aGlzOiBQYmxDb2x1bW4sIGNvbHVtbjogUGJsQ29sdW1uKTogYm9vbGVhbiB7XG4gIGZvciAoY29uc3QgaWQgb2YgdGhpcy5ncm91cHMpIHtcbiAgICBjb25zdCBnID0gdGhpcy5ncm91cFN0b3JlLmZpbmQoaWQpO1xuICAgIGlmIChnICYmIGcubG9ja0NvbHVtbnMgJiYgIWNvbHVtbi5pc0luR3JvdXAoZykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xSZW9yZGVyRXh0ZW5kR3JpZCgpOiB2b2lkIHtcbiAgUGJsQ29sdW1uLmV4dGVuZFByb3BlcnR5KCdyZW9yZGVyJyk7XG4gIFBibENvbHVtbi5leHRlbmRQcm9wZXJ0eSgnd29udEJ1ZGdlJyk7XG4gIFBibENvbHVtbkdyb3VwLmV4dGVuZFByb3BlcnR5KCdsb2NrQ29sdW1ucycpO1xuXG4gIFBibENvbHVtbi5wcm90b3R5cGUuY2hlY2tHcm91cExvY2tDb25zdHJhaW50ID0gZnVuY3Rpb24gKHRoaXM6IFBibENvbHVtbiwgY29sdW1uOiBQYmxDb2x1bW4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gY2hlY2tHcm91cExvY2tDb25zdHJhaW50LmNhbGwodGhpcywgY29sdW1uKSAmJiBjaGVja0dyb3VwTG9ja0NvbnN0cmFpbnQuY2FsbChjb2x1bW4sIHRoaXMpO1xuICB9O1xufVxuXG4iXX0=