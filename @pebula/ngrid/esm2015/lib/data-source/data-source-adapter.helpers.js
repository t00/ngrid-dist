/**
 * @fileoverview added by tsickle
 * Generated from: lib/data-source/data-source-adapter.helpers.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const EMPTY = Object.freeze({});
/** @type {?} */
export const DEEP_COMPARATORS = {
    /**
     * @param {?} prev
     * @param {?} curr
     * @return {?}
     */
    filter(prev, curr) {
        return prev.filter === curr.filter
            && prev.type == curr.type;
        // TODO: deep compare columns
        // && (prev.columns || []).join() === (curr.columns || []).join();
    },
    /**
     * @param {?} prev
     * @param {?} curr
     * @return {?}
     */
    sort(prev, curr) {
        if (prev.column === curr.column) {
            /** @type {?} */
            const pSort = prev.sort || {};
            /** @type {?} */
            const cSort = curr.sort || {};
            return pSort.order === cSort.order && pSort.sortFn === cSort.sortFn;
        }
    },
    /**
     * @param {?} prev
     * @param {?} curr
     * @return {?}
     */
    data(prev, curr) {
        return prev === curr;
    }
};
/**
 * @template T
 * @param {?} change
 * @return {?}
 */
export function fromRefreshDataWrapper(change) {
    return {
        changed: change.changed,
        prev: change.prev.data,
        curr: change.hasOwnProperty('curr') ? change.curr.data : change.prev.data,
    };
}
/**
 * @template P
 * @param {?} type
 * @param {?} value
 * @param {?} cache
 * @return {?}
 */
export function createChangeContainer(type, value, cache) {
    if (type === 'pagination') {
        /** @type {?} */
        const pagination = (/** @type {?} */ ((value || {})));
        /** @type {?} */
        const cached = cache['pagination'];
        // we compare weak because we dont want changes from undefined to null etc...
        /** @type {?} */
        const changedKeys = (/** @type {?} */ (Object.keys(pagination).filter((/**
         * @param {?} k
         * @return {?}
         */
        k => cached[k] != pagination[k][1] && k !== 'total'))));
        /** @type {?} */
        const event = {
            changed: changedKeys.length > 0,
            page: createNotChangedEvent(cached.page),
            perPage: createNotChangedEvent(cached.perPage),
        };
        if (event.changed) {
            for (const k of changedKeys) {
                event[k].changed = true;
                event[k].prev = pagination[k][0];
                event[k].curr = cached[k] = pagination[k][1];
            }
        }
        return (/** @type {?} */ (event));
    }
    else {
        value = value || EMPTY;
        /** @type {?} */
        const cachedValue = cache[type];
        if (value === cachedValue) {
            return (/** @type {?} */ (createNotChangedEvent(cachedValue)));
        }
        else if (value !== EMPTY && cachedValue !== EMPTY) {
            /** @type {?} */
            const fn = DEEP_COMPARATORS[(/** @type {?} */ (type))];
            if (fn(cachedValue, (/** @type {?} */ (value)))) {
                return (/** @type {?} */ (createNotChangedEvent(cachedValue)));
            }
        }
        cache[type] = (/** @type {?} */ (value));
        return (/** @type {?} */ ({ changed: true, prev: cachedValue, curr: value }));
    }
}
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
function createNotChangedEvent(value) {
    return { changed: false, prev: value, curr: value };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2UtYWRhcHRlci5oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9kYXRhLXNvdXJjZS9kYXRhLXNvdXJjZS1hZGFwdGVyLmhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBV0EsTUFBTSxPQUFPLEtBQUssR0FBUSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQzs7QUFPM0MsTUFBTSxPQUFPLGdCQUFnQixHQUFzRDs7Ozs7O0lBQ2pGLE1BQU0sQ0FBQyxJQUFzQixFQUFFLElBQXNCO1FBQ25ELE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTTtlQUM3QixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsNkJBQTZCO1FBQzdCLGtFQUFrRTtJQUN0RSxDQUFDOzs7Ozs7SUFDRCxJQUFJLENBQUMsSUFBa0MsRUFBRSxJQUFrQztRQUN6RSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTs7a0JBQ3pCLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7O2tCQUN2QixLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQzdCLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUNyRTtJQUNILENBQUM7Ozs7OztJQUNELElBQUksQ0FBQyxJQUE2QixFQUFFLElBQTZCO1FBQy9ELE9BQU8sSUFBSSxLQUFLLElBQUksQ0FBQztJQUN2QixDQUFDO0NBQ0Y7Ozs7OztBQUVELE1BQU0sVUFBVSxzQkFBc0IsQ0FBSSxNQUF5RDtJQUNqRyxPQUFPO1FBQ0wsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1FBQ3ZCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7UUFDdEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7S0FDMUUsQ0FBQztBQUNKLENBQUM7Ozs7Ozs7O0FBSUQsTUFBTSxVQUFVLHFCQUFxQixDQUE0QyxJQUFPLEVBQ1AsS0FBaUIsRUFDakIsS0FBZ0M7SUFDL0csSUFBSSxJQUFJLEtBQUssWUFBWSxFQUFFOztjQUNuQixVQUFVLEdBQXdDLG1CQUFBLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxFQUFPOztjQUN0RSxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQzs7O2NBRTVCLFdBQVcsR0FBcUQsbUJBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNOzs7O1FBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxPQUFPLEVBQUMsRUFBTzs7Y0FFM0osS0FBSyxHQUFtRDtZQUM1RCxPQUFPLEVBQUUsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQy9CLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3hDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQy9DO1FBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2pCLEtBQUssTUFBTSxDQUFDLElBQUksV0FBVyxFQUFFO2dCQUMzQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDeEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QztTQUNGO1FBQ0QsT0FBTyxtQkFBQSxLQUFLLEVBQTZCLENBQUM7S0FDM0M7U0FBTTtRQUNMLEtBQUssR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDOztjQUNqQixXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUMvQixJQUFJLEtBQUssS0FBSyxXQUFXLEVBQUU7WUFDekIsT0FBTyxtQkFBQSxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsRUFBTyxDQUFDO1NBQ2xEO2FBQU0sSUFBSSxLQUFLLEtBQUssS0FBSyxJQUFJLFdBQVcsS0FBSyxLQUFLLEVBQUU7O2tCQUM3QyxFQUFFLEdBQXdGLGdCQUFnQixDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDO1lBQzdILElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxtQkFBQSxLQUFLLEVBQU8sQ0FBQyxFQUFFO2dCQUNqQyxPQUFPLG1CQUFBLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxFQUFPLENBQUM7YUFDbEQ7U0FDRjtRQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxtQkFBQSxLQUFLLEVBQU8sQ0FBQztRQUMzQixPQUFPLG1CQUFBLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBTyxDQUFDO0tBQ2pFO0FBQ0gsQ0FBQzs7Ozs7O0FBRUQsU0FBUyxxQkFBcUIsQ0FBSSxLQUFRO0lBQ3hDLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3RELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZERhdGFTb3VyY2VTb3J0Q2hhbmdlLCBEYXRhU291cmNlRmlsdGVyIH0gZnJvbSAnLi90eXBlcyc7XG5cbmltcG9ydCB7XG4gIFJlZnJlc2hEYXRhV3JhcHBlcixcbiAgUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2UsXG4gIFBibERhdGFTb3VyY2VUcmlnZ2VycyxcbiAgUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZSxcbiAgUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQsXG4gIFRyaWdnZXJDaGFuZ2VkRXZlbnRGb3IsXG59IGZyb20gJy4vZGF0YS1zb3VyY2UtYWRhcHRlci50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBFTVBUWTogYW55ID0gT2JqZWN0LmZyZWV6ZSh7fSk7XG5cbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCB0eXBlIERFRVBfQ09NUEFSQVRPUlM8SyBleHRlbmRzIGtleW9mIFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGU+ID0ge1xuICBbUCBpbiBLXT86IChwcmV2OiBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlW1BdLCBjdXJyOiBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlW1BdKSA9PiBib29sZWFuO1xufTtcblxuZXhwb3J0IGNvbnN0IERFRVBfQ09NUEFSQVRPUlM6IERFRVBfQ09NUEFSQVRPUlM8a2V5b2YgUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZT4gPSB7XG4gIGZpbHRlcihwcmV2OiBEYXRhU291cmNlRmlsdGVyLCBjdXJyOiBEYXRhU291cmNlRmlsdGVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHByZXYuZmlsdGVyID09PSBjdXJyLmZpbHRlclxuICAgICAgJiYgcHJldi50eXBlID09IGN1cnIudHlwZTtcbiAgICAgIC8vIFRPRE86IGRlZXAgY29tcGFyZSBjb2x1bW5zXG4gICAgICAvLyAmJiAocHJldi5jb2x1bW5zIHx8IFtdKS5qb2luKCkgPT09IChjdXJyLmNvbHVtbnMgfHwgW10pLmpvaW4oKTtcbiAgfSxcbiAgc29ydChwcmV2OiBQYmxOZ3JpZERhdGFTb3VyY2VTb3J0Q2hhbmdlLCBjdXJyOiBQYmxOZ3JpZERhdGFTb3VyY2VTb3J0Q2hhbmdlKTogYm9vbGVhbiB7XG4gICAgaWYgKHByZXYuY29sdW1uID09PSBjdXJyLmNvbHVtbikge1xuICAgICAgY29uc3QgcFNvcnQgPSBwcmV2LnNvcnQgfHwge307XG4gICAgICBjb25zdCBjU29ydCA9IGN1cnIuc29ydCB8fCB7fTtcbiAgICAgIHJldHVybiBwU29ydC5vcmRlciA9PT0gY1NvcnQub3JkZXIgJiYgcFNvcnQuc29ydEZuID09PSBjU29ydC5zb3J0Rm47XG4gICAgfVxuICB9LFxuICBkYXRhKHByZXY6IFJlZnJlc2hEYXRhV3JhcHBlcjxhbnk+LCBjdXJyOiBSZWZyZXNoRGF0YVdyYXBwZXI8YW55Pik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBwcmV2ID09PSBjdXJyO1xuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVJlZnJlc2hEYXRhV3JhcHBlcjxUPihjaGFuZ2U6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlPFJlZnJlc2hEYXRhV3JhcHBlcjxUPj4pOiBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZTxUPiB7XG4gIHJldHVybiB7XG4gICAgY2hhbmdlZDogY2hhbmdlLmNoYW5nZWQsXG4gICAgcHJldjogY2hhbmdlLnByZXYuZGF0YSxcbiAgICBjdXJyOiBjaGFuZ2UuaGFzT3duUHJvcGVydHkoJ2N1cnInKSA/IGNoYW5nZS5jdXJyLmRhdGEgOiBjaGFuZ2UucHJldi5kYXRhLFxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBDb1ZhbHVlPFAgZXh0ZW5kcyBrZXlvZiBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlPiA9IFAgZXh0ZW5kcyBrZXlvZiBQYmxEYXRhU291cmNlVHJpZ2dlcnMgPyBQYmxEYXRhU291cmNlVHJpZ2dlcnNbUF0gOiBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlW1BdO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2hhbmdlQ29udGFpbmVyPFAgZXh0ZW5kcyBrZXlvZiBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlPih0eXBlOiBQLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IENvVmFsdWU8UD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZTogUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZSk6IFRyaWdnZXJDaGFuZ2VkRXZlbnRGb3I8UD4ge1xuICBpZiAodHlwZSA9PT0gJ3BhZ2luYXRpb24nKSB7XG4gICAgY29uc3QgcGFnaW5hdGlvbjogUGJsRGF0YVNvdXJjZVRyaWdnZXJzWydwYWdpbmF0aW9uJ10gPSAodmFsdWUgfHwge30pIGFzIGFueTtcbiAgICBjb25zdCBjYWNoZWQgPSBjYWNoZVsncGFnaW5hdGlvbiddO1xuICAgIC8vIHdlIGNvbXBhcmUgd2VhayBiZWNhdXNlIHdlIGRvbnQgd2FudCBjaGFuZ2VzIGZyb20gdW5kZWZpbmVkIHRvIG51bGwgZXRjLi4uXG4gICAgY29uc3QgY2hhbmdlZEtleXM6IEFycmF5PGtleW9mIFBibERhdGFTb3VyY2VUcmlnZ2Vyc1sncGFnaW5hdGlvbiddPiA9IE9iamVjdC5rZXlzKHBhZ2luYXRpb24pLmZpbHRlciggayA9PiBjYWNoZWRba10gIT0gcGFnaW5hdGlvbltrXVsxXSAmJiBrICE9PSAndG90YWwnKSBhcyBhbnk7XG5cbiAgICBjb25zdCBldmVudDogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnRbJ3BhZ2luYXRpb24nXSA9IHtcbiAgICAgIGNoYW5nZWQ6IGNoYW5nZWRLZXlzLmxlbmd0aCA+IDAsXG4gICAgICBwYWdlOiBjcmVhdGVOb3RDaGFuZ2VkRXZlbnQoY2FjaGVkLnBhZ2UpLFxuICAgICAgcGVyUGFnZTogY3JlYXRlTm90Q2hhbmdlZEV2ZW50KGNhY2hlZC5wZXJQYWdlKSxcbiAgICB9O1xuICAgIGlmIChldmVudC5jaGFuZ2VkKSB7XG4gICAgICBmb3IgKGNvbnN0IGsgb2YgY2hhbmdlZEtleXMpIHtcbiAgICAgICAgZXZlbnRba10uY2hhbmdlZCA9IHRydWU7XG4gICAgICAgIGV2ZW50W2tdLnByZXYgPSBwYWdpbmF0aW9uW2tdWzBdO1xuICAgICAgICBldmVudFtrXS5jdXJyID0gY2FjaGVkW2tdID0gcGFnaW5hdGlvbltrXVsxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGV2ZW50IGFzIFRyaWdnZXJDaGFuZ2VkRXZlbnRGb3I8UD47XG4gIH0gZWxzZSB7XG4gICAgdmFsdWUgPSB2YWx1ZSB8fCBFTVBUWTtcbiAgICBjb25zdCBjYWNoZWRWYWx1ZSA9IGNhY2hlW3R5cGVdO1xuICAgIGlmICh2YWx1ZSA9PT0gY2FjaGVkVmFsdWUpIHtcbiAgICAgIHJldHVybiBjcmVhdGVOb3RDaGFuZ2VkRXZlbnQoY2FjaGVkVmFsdWUpIGFzIGFueTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSBFTVBUWSAmJiBjYWNoZWRWYWx1ZSAhPT0gRU1QVFkpIHtcbiAgICAgIGNvbnN0IGZuOiAocHJldjogUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZVtQXSwgY3VycjogUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZVtQXSkgPT4gYm9vbGVhbiA9IERFRVBfQ09NUEFSQVRPUlNbdHlwZSBhcyBhbnldO1xuICAgICAgaWYgKGZuKGNhY2hlZFZhbHVlLCB2YWx1ZSBhcyBhbnkpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVOb3RDaGFuZ2VkRXZlbnQoY2FjaGVkVmFsdWUpIGFzIGFueTtcbiAgICAgIH1cbiAgICB9XG4gICAgY2FjaGVbdHlwZV0gPSB2YWx1ZSBhcyBhbnk7XG4gICAgcmV0dXJuIHsgY2hhbmdlZDogdHJ1ZSwgcHJldjogY2FjaGVkVmFsdWUsIGN1cnI6IHZhbHVlIH0gYXMgYW55O1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vdENoYW5nZWRFdmVudDxUPih2YWx1ZTogVCk6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlPFQ+IHtcbiAgcmV0dXJuIHsgY2hhbmdlZDogZmFsc2UsIHByZXY6IHZhbHVlLCBjdXJyOiB2YWx1ZSB9O1xufVxuIl19