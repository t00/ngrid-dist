/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * Return's the `User Preferences` preset which focuses on saving and restoring state that the user
 * can define and would want to restore between sessions.
 *
 * For example, saving column width's which the user might have changed using the mouse or any other custom way provided to him (through API).
 * Saving the column order, so if the user re-ordered the table the order can be loaded back again...
 * @param {...?} basedOn
 * @return {?}
 */
export function userSessionPref() {
    var e_1, _a;
    var basedOn = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        basedOn[_i] = arguments[_i];
    }
    /** @type {?} */
    var resultFilter = {
        grid: [
            'hideColumns',
            'showFooter',
            'showHeader',
        ],
        columnOrder: true,
        columns: ['table'],
        dataColumn: [
            'width',
        ]
    };
    if (basedOn.length > 0) {
        try {
            for (var basedOn_1 = tslib_1.__values(basedOn), basedOn_1_1 = basedOn_1.next(); !basedOn_1_1.done; basedOn_1_1 = basedOn_1.next()) {
                var b = basedOn_1_1.value;
                mergeStateChunkKeyFilter(resultFilter, b);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (basedOn_1_1 && !basedOn_1_1.done && (_a = basedOn_1.return)) _a.call(basedOn_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return resultFilter;
}
/**
 * Merge a head and tail chunk filters so keys from tail will be merged into head if:
 *
 * - The key does not exist in head
 * - The key exist in head but the value of it is an Array and the value of tail is an Array as well.
 *   In such case, both array's are merged into a single unique array.
 * @param {?} mergeHead
 * @param {?} mergeTail
 * @return {?}
 */
function mergeStateChunkKeyFilter(mergeHead, mergeTail) {
    var e_2, _a;
    try {
        for (var _b = tslib_1.__values(Object.keys(mergeTail)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var k = _c.value;
            /** @type {?} */
            var tailValue = mergeTail[k];
            if (k in mergeHead) {
                /** @type {?} */
                var tailHead = mergeHead[k];
                if (Array.isArray(tailHead) && Array.isArray(tailValue)) {
                    /** @type {?} */
                    var s = new Set(tslib_1.__spread(tailHead, tailValue));
                    mergeHead[k] = Array.from(s.values());
                }
            }
            else {
                mergeHead[k] = mergeTail[k];
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2V0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RhdGUvIiwic291cmNlcyI6WyJsaWIvcHJlc2V0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQVNBLE1BQU0sVUFBVSxlQUFlOztJQUFDLGlCQUFpQztTQUFqQyxVQUFpQyxFQUFqQyxxQkFBaUMsRUFBakMsSUFBaUM7UUFBakMsNEJBQWlDOzs7UUFDekQsWUFBWSxHQUF3QjtRQUN4QyxJQUFJLEVBQUU7WUFDSixhQUFhO1lBQ2IsWUFBWTtZQUNaLFlBQVk7U0FDYjtRQUNELFdBQVcsRUFBRSxJQUFJO1FBQ2pCLE9BQU8sRUFBRSxDQUFFLE9BQU8sQ0FBRTtRQUNwQixVQUFVLEVBQUU7WUFDVixPQUFPO1NBQ1I7S0FDRjtJQUVELElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O1lBQ3RCLEtBQWdCLElBQUEsWUFBQSxpQkFBQSxPQUFPLENBQUEsZ0NBQUE7Z0JBQWxCLElBQU0sQ0FBQyxvQkFBQTtnQkFDWix3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFBQTs7Ozs7Ozs7O0tBQzNDO0lBRUQsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQzs7Ozs7Ozs7Ozs7QUFVRCxTQUFTLHdCQUF3QixDQUFDLFNBQThCLEVBQUUsU0FBOEI7OztRQUM5RixLQUFnQixJQUFBLEtBQUEsaUJBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtZQUFuQyxJQUFNLENBQUMsV0FBQTs7Z0JBQ0osU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLElBQUksU0FBUyxFQUFFOztvQkFDWixRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7O3dCQUNqRCxDQUFDLEdBQUcsSUFBSSxHQUFHLGtCQUFhLFFBQVEsRUFBSyxTQUFTLEVBQUU7b0JBQ3RELFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUN2QzthQUNGO2lCQUFNO2dCQUNMLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0I7U0FDRjs7Ozs7Ozs7O0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YXRlQ2h1bmtLZXlGaWx0ZXIgfSBmcm9tICcuL2NvcmUvbW9kZWxzL2luZGV4JztcblxuLyoqXG4gKiBSZXR1cm4ncyB0aGUgYFVzZXIgUHJlZmVyZW5jZXNgIHByZXNldCB3aGljaCBmb2N1c2VzIG9uIHNhdmluZyBhbmQgcmVzdG9yaW5nIHN0YXRlIHRoYXQgdGhlIHVzZXJcbiAqIGNhbiBkZWZpbmUgYW5kIHdvdWxkIHdhbnQgdG8gcmVzdG9yZSBiZXR3ZWVuIHNlc3Npb25zLlxuICpcbiAqIEZvciBleGFtcGxlLCBzYXZpbmcgY29sdW1uIHdpZHRoJ3Mgd2hpY2ggdGhlIHVzZXIgbWlnaHQgaGF2ZSBjaGFuZ2VkIHVzaW5nIHRoZSBtb3VzZSBvciBhbnkgb3RoZXIgY3VzdG9tIHdheSBwcm92aWRlZCB0byBoaW0gKHRocm91Z2ggQVBJKS5cbiAqIFNhdmluZyB0aGUgY29sdW1uIG9yZGVyLCBzbyBpZiB0aGUgdXNlciByZS1vcmRlcmVkIHRoZSB0YWJsZSB0aGUgb3JkZXIgY2FuIGJlIGxvYWRlZCBiYWNrIGFnYWluLi4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VyU2Vzc2lvblByZWYoLi4uYmFzZWRPbjogU3RhdGVDaHVua0tleUZpbHRlcltdKTogU3RhdGVDaHVua0tleUZpbHRlciB7XG4gIGNvbnN0IHJlc3VsdEZpbHRlcjogU3RhdGVDaHVua0tleUZpbHRlciA9IHtcbiAgICBncmlkOiBbXG4gICAgICAnaGlkZUNvbHVtbnMnLFxuICAgICAgJ3Nob3dGb290ZXInLFxuICAgICAgJ3Nob3dIZWFkZXInLFxuICAgIF0sXG4gICAgY29sdW1uT3JkZXI6IHRydWUsXG4gICAgY29sdW1uczogWyAndGFibGUnIF0sXG4gICAgZGF0YUNvbHVtbjogW1xuICAgICAgJ3dpZHRoJyxcbiAgICBdXG4gIH1cblxuICBpZiAoYmFzZWRPbi5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBiIG9mIGJhc2VkT24pXG4gICAgbWVyZ2VTdGF0ZUNodW5rS2V5RmlsdGVyKHJlc3VsdEZpbHRlciwgYik7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0RmlsdGVyO1xufVxuXG5cbi8qKlxuICogTWVyZ2UgYSBoZWFkIGFuZCB0YWlsIGNodW5rIGZpbHRlcnMgc28ga2V5cyBmcm9tIHRhaWwgd2lsbCBiZSBtZXJnZWQgaW50byBoZWFkIGlmOlxuICpcbiAqIC0gVGhlIGtleSBkb2VzIG5vdCBleGlzdCBpbiBoZWFkXG4gKiAtIFRoZSBrZXkgZXhpc3QgaW4gaGVhZCBidXQgdGhlIHZhbHVlIG9mIGl0IGlzIGFuIEFycmF5IGFuZCB0aGUgdmFsdWUgb2YgdGFpbCBpcyBhbiBBcnJheSBhcyB3ZWxsLlxuICogICBJbiBzdWNoIGNhc2UsIGJvdGggYXJyYXkncyBhcmUgbWVyZ2VkIGludG8gYSBzaW5nbGUgdW5pcXVlIGFycmF5LlxuICovXG5mdW5jdGlvbiBtZXJnZVN0YXRlQ2h1bmtLZXlGaWx0ZXIobWVyZ2VIZWFkOiBTdGF0ZUNodW5rS2V5RmlsdGVyLCBtZXJnZVRhaWw6IFN0YXRlQ2h1bmtLZXlGaWx0ZXIpIHtcbiAgZm9yIChjb25zdCBrIG9mIE9iamVjdC5rZXlzKG1lcmdlVGFpbCkpIHtcbiAgICBjb25zdCB0YWlsVmFsdWUgPSBtZXJnZVRhaWxba107XG4gICAgaWYgKGsgaW4gbWVyZ2VIZWFkKSB7XG4gICAgICBjb25zdCB0YWlsSGVhZCA9IG1lcmdlSGVhZFtrXTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRhaWxIZWFkKSAmJiBBcnJheS5pc0FycmF5KHRhaWxWYWx1ZSkpIHtcbiAgICAgICAgY29uc3QgcyA9IG5ldyBTZXQ8c3RyaW5nPihbLi4udGFpbEhlYWQsIC4uLnRhaWxWYWx1ZV0pO1xuICAgICAgICBtZXJnZUhlYWRba10gPSBBcnJheS5mcm9tKHMudmFsdWVzKCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtZXJnZUhlYWRba10gPSBtZXJnZVRhaWxba107XG4gICAgfVxuICB9XG59XG4iXX0=