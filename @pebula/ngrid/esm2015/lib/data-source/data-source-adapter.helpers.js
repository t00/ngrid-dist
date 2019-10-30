/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2UtYWRhcHRlci5oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9kYXRhLXNvdXJjZS9kYXRhLXNvdXJjZS1hZGFwdGVyLmhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFXQSxNQUFNLE9BQU8sS0FBSyxHQUFRLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDOztBQU8zQyxNQUFNLE9BQU8sZ0JBQWdCLEdBQXNEOzs7Ozs7SUFDakYsTUFBTSxDQUFDLElBQXNCLEVBQUUsSUFBc0I7UUFDbkQsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNO2VBQzdCLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztRQUMxQiw2QkFBNkI7UUFDN0Isa0VBQWtFO0lBQ3RFLENBQUM7Ozs7OztJQUNELElBQUksQ0FBQyxJQUFrQyxFQUFFLElBQWtDO1FBQ3pFLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFOztrQkFDekIsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTs7a0JBQ3ZCLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDN0IsT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQ3JFO0lBQ0gsQ0FBQzs7Ozs7O0lBQ0QsSUFBSSxDQUFDLElBQTZCLEVBQUUsSUFBNkI7UUFDL0QsT0FBTyxJQUFJLEtBQUssSUFBSSxDQUFDO0lBQ3ZCLENBQUM7Q0FDRjs7Ozs7O0FBRUQsTUFBTSxVQUFVLHNCQUFzQixDQUFJLE1BQXlEO0lBQ2pHLE9BQU87UUFDTCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87UUFDdkIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTtRQUN0QixJQUFJLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTtLQUMxRSxDQUFDO0FBQ0osQ0FBQzs7Ozs7Ozs7QUFJRCxNQUFNLFVBQVUscUJBQXFCLENBQTRDLElBQU8sRUFDUCxLQUFpQixFQUNqQixLQUFnQztJQUMvRyxJQUFJLElBQUksS0FBSyxZQUFZLEVBQUU7O2NBQ25CLFVBQVUsR0FBd0MsbUJBQUEsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLEVBQU87O2NBQ3RFLE1BQU0sR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDOzs7Y0FFNUIsV0FBVyxHQUFxRCxtQkFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU07Ozs7UUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLE9BQU8sRUFBQyxFQUFPOztjQUUzSixLQUFLLEdBQW1EO1lBQzVELE9BQU8sRUFBRSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDL0IsSUFBSSxFQUFFLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDeEMsT0FBTyxFQUFFLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDL0M7UUFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDakIsS0FBSyxNQUFNLENBQUMsSUFBSSxXQUFXLEVBQUU7Z0JBQzNCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzlDO1NBQ0Y7UUFDRCxPQUFPLG1CQUFBLEtBQUssRUFBNkIsQ0FBQztLQUMzQztTQUFNO1FBQ0wsS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUM7O2NBQ2pCLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksS0FBSyxLQUFLLFdBQVcsRUFBRTtZQUN6QixPQUFPLG1CQUFBLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxFQUFPLENBQUM7U0FDbEQ7YUFBTSxJQUFJLEtBQUssS0FBSyxLQUFLLElBQUksV0FBVyxLQUFLLEtBQUssRUFBRTs7a0JBQzdDLEVBQUUsR0FBd0YsZ0JBQWdCLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUM7WUFDN0gsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLG1CQUFBLEtBQUssRUFBTyxDQUFDLEVBQUU7Z0JBQ2pDLE9BQU8sbUJBQUEscUJBQXFCLENBQUMsV0FBVyxDQUFDLEVBQU8sQ0FBQzthQUNsRDtTQUNGO1FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLG1CQUFBLEtBQUssRUFBTyxDQUFDO1FBQzNCLE9BQU8sbUJBQUEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFPLENBQUM7S0FDakU7QUFDSCxDQUFDOzs7Ozs7QUFFRCxTQUFTLHFCQUFxQixDQUFJLEtBQVE7SUFDeEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDdEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibE5ncmlkRGF0YVNvdXJjZVNvcnRDaGFuZ2UsIERhdGFTb3VyY2VGaWx0ZXIgfSBmcm9tICcuL3R5cGVzJztcblxuaW1wb3J0IHtcbiAgUmVmcmVzaERhdGFXcmFwcGVyLFxuICBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZSxcbiAgUGJsRGF0YVNvdXJjZVRyaWdnZXJzLFxuICBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlLFxuICBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudCxcbiAgVHJpZ2dlckNoYW5nZWRFdmVudEZvcixcbn0gZnJvbSAnLi9kYXRhLXNvdXJjZS1hZGFwdGVyLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IEVNUFRZOiBhbnkgPSBPYmplY3QuZnJlZXplKHt9KTtcblxuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IHR5cGUgREVFUF9DT01QQVJBVE9SUzxLIGV4dGVuZHMga2V5b2YgUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZT4gPSB7XG4gIFtQIGluIEtdPzogKHByZXY6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGVbUF0sIGN1cnI6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGVbUF0pID0+IGJvb2xlYW47XG59O1xuXG5leHBvcnQgY29uc3QgREVFUF9DT01QQVJBVE9SUzogREVFUF9DT01QQVJBVE9SUzxrZXlvZiBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlPiA9IHtcbiAgZmlsdGVyKHByZXY6IERhdGFTb3VyY2VGaWx0ZXIsIGN1cnI6IERhdGFTb3VyY2VGaWx0ZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcHJldi5maWx0ZXIgPT09IGN1cnIuZmlsdGVyXG4gICAgICAmJiBwcmV2LnR5cGUgPT0gY3Vyci50eXBlO1xuICAgICAgLy8gVE9ETzogZGVlcCBjb21wYXJlIGNvbHVtbnNcbiAgICAgIC8vICYmIChwcmV2LmNvbHVtbnMgfHwgW10pLmpvaW4oKSA9PT0gKGN1cnIuY29sdW1ucyB8fCBbXSkuam9pbigpO1xuICB9LFxuICBzb3J0KHByZXY6IFBibE5ncmlkRGF0YVNvdXJjZVNvcnRDaGFuZ2UsIGN1cnI6IFBibE5ncmlkRGF0YVNvdXJjZVNvcnRDaGFuZ2UpOiBib29sZWFuIHtcbiAgICBpZiAocHJldi5jb2x1bW4gPT09IGN1cnIuY29sdW1uKSB7XG4gICAgICBjb25zdCBwU29ydCA9IHByZXYuc29ydCB8fCB7fTtcbiAgICAgIGNvbnN0IGNTb3J0ID0gY3Vyci5zb3J0IHx8IHt9O1xuICAgICAgcmV0dXJuIHBTb3J0Lm9yZGVyID09PSBjU29ydC5vcmRlciAmJiBwU29ydC5zb3J0Rm4gPT09IGNTb3J0LnNvcnRGbjtcbiAgICB9XG4gIH0sXG4gIGRhdGEocHJldjogUmVmcmVzaERhdGFXcmFwcGVyPGFueT4sIGN1cnI6IFJlZnJlc2hEYXRhV3JhcHBlcjxhbnk+KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHByZXYgPT09IGN1cnI7XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUmVmcmVzaERhdGFXcmFwcGVyPFQ+KGNoYW5nZTogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2U8UmVmcmVzaERhdGFXcmFwcGVyPFQ+Pik6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlPFQ+IHtcbiAgcmV0dXJuIHtcbiAgICBjaGFuZ2VkOiBjaGFuZ2UuY2hhbmdlZCxcbiAgICBwcmV2OiBjaGFuZ2UucHJldi5kYXRhLFxuICAgIGN1cnI6IGNoYW5nZS5oYXNPd25Qcm9wZXJ0eSgnY3VycicpID8gY2hhbmdlLmN1cnIuZGF0YSA6IGNoYW5nZS5wcmV2LmRhdGEsXG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIENvVmFsdWU8UCBleHRlbmRzIGtleW9mIFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGU+ID0gUCBleHRlbmRzIGtleW9mIFBibERhdGFTb3VyY2VUcmlnZ2VycyA/IFBibERhdGFTb3VyY2VUcmlnZ2Vyc1tQXSA6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGVbUF07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDaGFuZ2VDb250YWluZXI8UCBleHRlbmRzIGtleW9mIFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGU+KHR5cGU6IFAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogQ29WYWx1ZTxQPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlOiBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlKTogVHJpZ2dlckNoYW5nZWRFdmVudEZvcjxQPiB7XG4gIGlmICh0eXBlID09PSAncGFnaW5hdGlvbicpIHtcbiAgICBjb25zdCBwYWdpbmF0aW9uOiBQYmxEYXRhU291cmNlVHJpZ2dlcnNbJ3BhZ2luYXRpb24nXSA9ICh2YWx1ZSB8fCB7fSkgYXMgYW55O1xuICAgIGNvbnN0IGNhY2hlZCA9IGNhY2hlWydwYWdpbmF0aW9uJ107XG4gICAgLy8gd2UgY29tcGFyZSB3ZWFrIGJlY2F1c2Ugd2UgZG9udCB3YW50IGNoYW5nZXMgZnJvbSB1bmRlZmluZWQgdG8gbnVsbCBldGMuLi5cbiAgICBjb25zdCBjaGFuZ2VkS2V5czogQXJyYXk8a2V5b2YgUGJsRGF0YVNvdXJjZVRyaWdnZXJzWydwYWdpbmF0aW9uJ10+ID0gT2JqZWN0LmtleXMocGFnaW5hdGlvbikuZmlsdGVyKCBrID0+IGNhY2hlZFtrXSAhPSBwYWdpbmF0aW9uW2tdWzFdICYmIGsgIT09ICd0b3RhbCcpIGFzIGFueTtcblxuICAgIGNvbnN0IGV2ZW50OiBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudFsncGFnaW5hdGlvbiddID0ge1xuICAgICAgY2hhbmdlZDogY2hhbmdlZEtleXMubGVuZ3RoID4gMCxcbiAgICAgIHBhZ2U6IGNyZWF0ZU5vdENoYW5nZWRFdmVudChjYWNoZWQucGFnZSksXG4gICAgICBwZXJQYWdlOiBjcmVhdGVOb3RDaGFuZ2VkRXZlbnQoY2FjaGVkLnBlclBhZ2UpLFxuICAgIH07XG4gICAgaWYgKGV2ZW50LmNoYW5nZWQpIHtcbiAgICAgIGZvciAoY29uc3QgayBvZiBjaGFuZ2VkS2V5cykge1xuICAgICAgICBldmVudFtrXS5jaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgZXZlbnRba10ucHJldiA9IHBhZ2luYXRpb25ba11bMF07XG4gICAgICAgIGV2ZW50W2tdLmN1cnIgPSBjYWNoZWRba10gPSBwYWdpbmF0aW9uW2tdWzFdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZXZlbnQgYXMgVHJpZ2dlckNoYW5nZWRFdmVudEZvcjxQPjtcbiAgfSBlbHNlIHtcbiAgICB2YWx1ZSA9IHZhbHVlIHx8IEVNUFRZO1xuICAgIGNvbnN0IGNhY2hlZFZhbHVlID0gY2FjaGVbdHlwZV07XG4gICAgaWYgKHZhbHVlID09PSBjYWNoZWRWYWx1ZSkge1xuICAgICAgcmV0dXJuIGNyZWF0ZU5vdENoYW5nZWRFdmVudChjYWNoZWRWYWx1ZSkgYXMgYW55O1xuICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IEVNUFRZICYmIGNhY2hlZFZhbHVlICE9PSBFTVBUWSkge1xuICAgICAgY29uc3QgZm46IChwcmV2OiBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlW1BdLCBjdXJyOiBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlW1BdKSA9PiBib29sZWFuID0gREVFUF9DT01QQVJBVE9SU1t0eXBlIGFzIGFueV07XG4gICAgICBpZiAoZm4oY2FjaGVkVmFsdWUsIHZhbHVlIGFzIGFueSkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZU5vdENoYW5nZWRFdmVudChjYWNoZWRWYWx1ZSkgYXMgYW55O1xuICAgICAgfVxuICAgIH1cbiAgICBjYWNoZVt0eXBlXSA9IHZhbHVlIGFzIGFueTtcbiAgICByZXR1cm4geyBjaGFuZ2VkOiB0cnVlLCBwcmV2OiBjYWNoZWRWYWx1ZSwgY3VycjogdmFsdWUgfSBhcyBhbnk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlTm90Q2hhbmdlZEV2ZW50PFQ+KHZhbHVlOiBUKTogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2U8VD4ge1xuICByZXR1cm4geyBjaGFuZ2VkOiBmYWxzZSwgcHJldjogdmFsdWUsIGN1cnI6IHZhbHVlIH07XG59XG4iXX0=