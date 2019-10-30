/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Return's the `User Preferences` preset which focuses on saving and restoring state that the user
 * can define and would want to restore between sessions.
 *
 * For example, saving column width's which the user might have changed using the mouse or any other custom way provided to him (through API).
 * Saving the column order, so if the user re-ordered the table the order can be loaded back again...
 * @param {...?} basedOn
 * @return {?}
 */
export function userSessionPref(...basedOn) {
    /** @type {?} */
    const resultFilter = {
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
        for (const b of basedOn)
            mergeStateChunkKeyFilter(resultFilter, b);
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
    for (const k of Object.keys(mergeTail)) {
        /** @type {?} */
        const tailValue = mergeTail[k];
        if (k in mergeHead) {
            /** @type {?} */
            const tailHead = mergeHead[k];
            if (Array.isArray(tailHead) && Array.isArray(tailValue)) {
                /** @type {?} */
                const s = new Set([...tailHead, ...tailValue]);
                mergeHead[k] = Array.from(s.values());
            }
        }
        else {
            mergeHead[k] = mergeTail[k];
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2V0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RhdGUvIiwic291cmNlcyI6WyJsaWIvcHJlc2V0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBU0EsTUFBTSxVQUFVLGVBQWUsQ0FBQyxHQUFHLE9BQThCOztVQUN6RCxZQUFZLEdBQXdCO1FBQ3hDLElBQUksRUFBRTtZQUNKLGFBQWE7WUFDYixZQUFZO1lBQ1osWUFBWTtTQUNiO1FBQ0QsV0FBVyxFQUFFLElBQUk7UUFDakIsT0FBTyxFQUFFLENBQUUsT0FBTyxDQUFFO1FBQ3BCLFVBQVUsRUFBRTtZQUNWLE9BQU87U0FDUjtLQUNGO0lBRUQsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN0QixLQUFLLE1BQU0sQ0FBQyxJQUFJLE9BQU87WUFDdkIsd0JBQXdCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzNDO0lBRUQsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQzs7Ozs7Ozs7Ozs7QUFVRCxTQUFTLHdCQUF3QixDQUFDLFNBQThCLEVBQUUsU0FBOEI7SUFDOUYsS0FBSyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFOztjQUNoQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxTQUFTLEVBQUU7O2tCQUNaLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFOztzQkFDakQsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFTLENBQUMsR0FBRyxRQUFRLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQztnQkFDdEQsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7YUFDdkM7U0FDRjthQUFNO1lBQ0wsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QjtLQUNGO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YXRlQ2h1bmtLZXlGaWx0ZXIgfSBmcm9tICcuL2NvcmUvbW9kZWxzL2luZGV4JztcblxuLyoqXG4gKiBSZXR1cm4ncyB0aGUgYFVzZXIgUHJlZmVyZW5jZXNgIHByZXNldCB3aGljaCBmb2N1c2VzIG9uIHNhdmluZyBhbmQgcmVzdG9yaW5nIHN0YXRlIHRoYXQgdGhlIHVzZXJcbiAqIGNhbiBkZWZpbmUgYW5kIHdvdWxkIHdhbnQgdG8gcmVzdG9yZSBiZXR3ZWVuIHNlc3Npb25zLlxuICpcbiAqIEZvciBleGFtcGxlLCBzYXZpbmcgY29sdW1uIHdpZHRoJ3Mgd2hpY2ggdGhlIHVzZXIgbWlnaHQgaGF2ZSBjaGFuZ2VkIHVzaW5nIHRoZSBtb3VzZSBvciBhbnkgb3RoZXIgY3VzdG9tIHdheSBwcm92aWRlZCB0byBoaW0gKHRocm91Z2ggQVBJKS5cbiAqIFNhdmluZyB0aGUgY29sdW1uIG9yZGVyLCBzbyBpZiB0aGUgdXNlciByZS1vcmRlcmVkIHRoZSB0YWJsZSB0aGUgb3JkZXIgY2FuIGJlIGxvYWRlZCBiYWNrIGFnYWluLi4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VyU2Vzc2lvblByZWYoLi4uYmFzZWRPbjogU3RhdGVDaHVua0tleUZpbHRlcltdKTogU3RhdGVDaHVua0tleUZpbHRlciB7XG4gIGNvbnN0IHJlc3VsdEZpbHRlcjogU3RhdGVDaHVua0tleUZpbHRlciA9IHtcbiAgICBncmlkOiBbXG4gICAgICAnaGlkZUNvbHVtbnMnLFxuICAgICAgJ3Nob3dGb290ZXInLFxuICAgICAgJ3Nob3dIZWFkZXInLFxuICAgIF0sXG4gICAgY29sdW1uT3JkZXI6IHRydWUsXG4gICAgY29sdW1uczogWyAndGFibGUnIF0sXG4gICAgZGF0YUNvbHVtbjogW1xuICAgICAgJ3dpZHRoJyxcbiAgICBdXG4gIH1cblxuICBpZiAoYmFzZWRPbi5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBiIG9mIGJhc2VkT24pXG4gICAgbWVyZ2VTdGF0ZUNodW5rS2V5RmlsdGVyKHJlc3VsdEZpbHRlciwgYik7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0RmlsdGVyO1xufVxuXG5cbi8qKlxuICogTWVyZ2UgYSBoZWFkIGFuZCB0YWlsIGNodW5rIGZpbHRlcnMgc28ga2V5cyBmcm9tIHRhaWwgd2lsbCBiZSBtZXJnZWQgaW50byBoZWFkIGlmOlxuICpcbiAqIC0gVGhlIGtleSBkb2VzIG5vdCBleGlzdCBpbiBoZWFkXG4gKiAtIFRoZSBrZXkgZXhpc3QgaW4gaGVhZCBidXQgdGhlIHZhbHVlIG9mIGl0IGlzIGFuIEFycmF5IGFuZCB0aGUgdmFsdWUgb2YgdGFpbCBpcyBhbiBBcnJheSBhcyB3ZWxsLlxuICogICBJbiBzdWNoIGNhc2UsIGJvdGggYXJyYXkncyBhcmUgbWVyZ2VkIGludG8gYSBzaW5nbGUgdW5pcXVlIGFycmF5LlxuICovXG5mdW5jdGlvbiBtZXJnZVN0YXRlQ2h1bmtLZXlGaWx0ZXIobWVyZ2VIZWFkOiBTdGF0ZUNodW5rS2V5RmlsdGVyLCBtZXJnZVRhaWw6IFN0YXRlQ2h1bmtLZXlGaWx0ZXIpIHtcbiAgZm9yIChjb25zdCBrIG9mIE9iamVjdC5rZXlzKG1lcmdlVGFpbCkpIHtcbiAgICBjb25zdCB0YWlsVmFsdWUgPSBtZXJnZVRhaWxba107XG4gICAgaWYgKGsgaW4gbWVyZ2VIZWFkKSB7XG4gICAgICBjb25zdCB0YWlsSGVhZCA9IG1lcmdlSGVhZFtrXTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRhaWxIZWFkKSAmJiBBcnJheS5pc0FycmF5KHRhaWxWYWx1ZSkpIHtcbiAgICAgICAgY29uc3QgcyA9IG5ldyBTZXQ8c3RyaW5nPihbLi4udGFpbEhlYWQsIC4uLnRhaWxWYWx1ZV0pO1xuICAgICAgICBtZXJnZUhlYWRba10gPSBBcnJheS5mcm9tKHMudmFsdWVzKCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtZXJnZUhlYWRba10gPSBtZXJnZVRhaWxba107XG4gICAgfVxuICB9XG59XG4iXX0=