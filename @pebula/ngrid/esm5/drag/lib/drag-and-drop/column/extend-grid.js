/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { PblColumn, PblColumnGroup } from '@pebula/ngrid';
/**
 * @this {?}
 * @param {?} column
 * @return {?}
 */
function checkGroupLockConstraint(column) {
    var e_1, _a;
    try {
        for (var _b = tslib_1.__values(this.groups), _c = _b.next(); !_c.done; _c = _b.next()) {
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
export function extendGrid() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kLWdyaWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvZHJhZy1hbmQtZHJvcC9jb2x1bW4vZXh0ZW5kLWdyaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBbUQxRCxTQUFTLHdCQUF3QixDQUFrQixNQUFpQjs7O1FBQ2xFLEtBQWlCLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsTUFBTSxDQUFBLGdCQUFBLDRCQUFFO1lBQXpCLElBQU0sRUFBRSxXQUFBOztnQkFDTCxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM5QyxPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7Ozs7Ozs7OztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQzs7OztBQUVELE1BQU0sVUFBVSxVQUFVO0lBQ3hCLFNBQVMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxjQUFjLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTdDLFNBQVMsQ0FBQyxTQUFTLENBQUMsd0JBQXdCOzs7OztJQUFHLFVBQTJCLE1BQWlCO1FBQ3pGLE9BQU8sd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BHLENBQUMsQ0FBQSxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibENvbHVtbiwgUGJsQ29sdW1uR3JvdXAgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2dyaWQvY29sdW1ucy9jb2x1bW4nIHtcbiAgaW50ZXJmYWNlIFBibENvbHVtbiB7XG5cbiAgICByZW9yZGVyOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFdoZW4gdHJ1ZSwgdGhlIGl0ZW0gY2FuIGJlIHJlb3JkZXJlZCBiYXNlZCBvbiB0aGUgYHJlb3JkZXJgIHByb3BlcnR5IGJ1dFxuICAgICAqIHdpbGwgbm90IG1vdmUgKGJ1ZGdlKSB3aGVuIG90aGVyIGl0ZW1zIGFyZSByZW9yZGVyZWQuXG4gICAgICovXG4gICAgd29udEJ1ZGdlOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBieSBzd2l0Y2hpbmcgYmV0d2VlbiB0aGlzIGNvbHVtbiBhbmQgdGhlIHByb3ZpZGVkIGNvbHVtbiB0aGUgYGxvY2tDb2x1bW5zYCBjb25zdHJhaW50IGlzIHRyaWdnZXJlZC5cbiAgICAgKiBUaGUgbG9ja0NvbHVtbnMgY29uc3RyYWludCBpcyBzZXQgb24gYSBncm91cCBhbmQgcmVzdHJpY3Qgc3BsaXR0aW5nIG9mIGdyb3Vwcy5cbiAgICAgKiBBIENvbHVtbiB3aXRoIGEgbG9ja2VkIGdyb3VwIHdpbGwgbm90IGJlIGFsbG93ZWQgdG8gbGVhdmUgdGhlIGdyb3VwIG5vciBuZXcgaXRlbXMgYXJlIGFsbG93ZWQgdGhhdCBzcGxpdCB0aGUgZ3JvdXAuXG4gICAgICpcbiAgICAgKiBUaGUgcHJvY2VzcyB3aWxsIGNoZWNrIGJvdGggc2NlbmFyaW9zLlxuICAgICAqL1xuICAgIGNoZWNrR3JvdXBMb2NrQ29uc3RyYWludChjb2x1bW46IFBibENvbHVtbik6IGJvb2xlYW47XG4gIH1cbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2dyaWQvY29sdW1ucy9ncm91cC1jb2x1bW4nIHtcbiAgaW50ZXJmYWNlIFBibENvbHVtbkdyb3VwIHtcbiAgICAvKipcbiAgICAgKiBMb2NrIGNvbHVtbiBpbiB0aGUgZ3JvdXAsIHByZXZlbnRpbmcgdGhlIGdyb3VwIGZyb20gc3BsaXR0aW5nLlxuICAgICAqIFNwbGl0dGluZyBpcyBibG9jayBhY3RpdmVseSAoY29sdW1uIGZyb20gdGhlIGdyb3VwIGRyYWdnZWQgb3V0c2lkZSkgYW5kIHBhc3NpdmVseSAoY29sdW1uIG91dHNpZGUgb2YgdGhlIGdyb3VwIGRyYWdnaW5nIGludG8gdGhlIGdyb3VwKS5cbiAgICAgKi9cbiAgICBsb2NrQ29sdW1ucz86IGJvb2xlYW47XG4gIH1cbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2dyaWQvY29sdW1ucy90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsQ29sdW1uRGVmaW5pdGlvbiB7XG4gICAgcmVvcmRlcj86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogV2hlbiB0cnVlLCB0aGUgaXRlbSBjYW4gYmUgcmVvcmRlcmVkIGJhc2VkIG9uIHRoZSBgcmVvcmRlcmAgcHJvcGVydHkgYnV0XG4gICAgICogd2lsbCBub3QgbW92ZSAoYnVkZ2UpIHdoZW4gb3RoZXIgaXRlbXMgYXJlIHJlb3JkZXJlZC5cbiAgICAgKi9cbiAgICB3b250QnVkZ2U/OiBib29sZWFuO1xuICB9XG4gIGludGVyZmFjZSBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24ge1xuICAgIC8qKlxuICAgICAqIExvY2sgY29sdW1uIGluIHRoZSBncm91cCwgcHJldmVudGluZyB0aGUgZ3JvdXAgZnJvbSBzcGxpdHRpbmcuXG4gICAgICogU3BsaXR0aW5nIGlzIGJsb2NrIGFjdGl2ZWx5IChjb2x1bW4gZnJvbSB0aGUgZ3JvdXAgZHJhZ2dlZCBvdXRzaWRlKSBhbmQgcGFzc2l2ZWx5IChjb2x1bW4gb3V0c2lkZSBvZiB0aGUgZ3JvdXAgZHJhZ2dpbmcgaW50byB0aGUgZ3JvdXApLlxuICAgICAqL1xuICAgIGxvY2tDb2x1bW5zPzogYm9vbGVhbjtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0dyb3VwTG9ja0NvbnN0cmFpbnQodGhpczogUGJsQ29sdW1uLCBjb2x1bW46IFBibENvbHVtbik6IGJvb2xlYW4ge1xuICBmb3IgKGNvbnN0IGlkIG9mIHRoaXMuZ3JvdXBzKSB7XG4gICAgY29uc3QgZyA9IHRoaXMuZ3JvdXBTdG9yZS5maW5kKGlkKTtcbiAgICBpZiAoZyAmJiBnLmxvY2tDb2x1bW5zICYmICFjb2x1bW4uaXNJbkdyb3VwKGcpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kR3JpZCgpOiB2b2lkIHtcbiAgUGJsQ29sdW1uLmV4dGVuZFByb3BlcnR5KCdyZW9yZGVyJyk7XG4gIFBibENvbHVtbi5leHRlbmRQcm9wZXJ0eSgnd29udEJ1ZGdlJyk7XG4gIFBibENvbHVtbkdyb3VwLmV4dGVuZFByb3BlcnR5KCdsb2NrQ29sdW1ucycpO1xuXG4gIFBibENvbHVtbi5wcm90b3R5cGUuY2hlY2tHcm91cExvY2tDb25zdHJhaW50ID0gZnVuY3Rpb24gKHRoaXM6IFBibENvbHVtbiwgY29sdW1uOiBQYmxDb2x1bW4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gY2hlY2tHcm91cExvY2tDb25zdHJhaW50LmNhbGwodGhpcywgY29sdW1uKSAmJiBjaGVja0dyb3VwTG9ja0NvbnN0cmFpbnQuY2FsbChjb2x1bW4sIHRoaXMpO1xuICB9O1xufVxuXG4iXX0=