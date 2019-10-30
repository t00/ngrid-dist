/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/** @type {?} */
export var EMPTY = Object.freeze({});
/** @type {?} */
export var DEEP_COMPARATORS = {
    filter: /**
     * @param {?} prev
     * @param {?} curr
     * @return {?}
     */
    function (prev, curr) {
        return prev.filter === curr.filter
            && prev.type == curr.type;
        // TODO: deep compare columns
        // && (prev.columns || []).join() === (curr.columns || []).join();
    },
    sort: /**
     * @param {?} prev
     * @param {?} curr
     * @return {?}
     */
    function (prev, curr) {
        if (prev.column === curr.column) {
            /** @type {?} */
            var pSort = prev.sort || {};
            /** @type {?} */
            var cSort = curr.sort || {};
            return pSort.order === cSort.order && pSort.sortFn === cSort.sortFn;
        }
    },
    data: /**
     * @param {?} prev
     * @param {?} curr
     * @return {?}
     */
    function (prev, curr) {
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
    var e_1, _a;
    if (type === 'pagination') {
        /** @type {?} */
        var pagination_1 = (/** @type {?} */ ((value || {})));
        /** @type {?} */
        var cached_1 = cache['pagination'];
        // we compare weak because we dont want changes from undefined to null etc...
        /** @type {?} */
        var changedKeys = (/** @type {?} */ (Object.keys(pagination_1).filter((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return cached_1[k] != pagination_1[k][1] && k !== 'total'; }))));
        /** @type {?} */
        var event_1 = {
            changed: changedKeys.length > 0,
            page: createNotChangedEvent(cached_1.page),
            perPage: createNotChangedEvent(cached_1.perPage),
        };
        if (event_1.changed) {
            try {
                for (var changedKeys_1 = tslib_1.__values(changedKeys), changedKeys_1_1 = changedKeys_1.next(); !changedKeys_1_1.done; changedKeys_1_1 = changedKeys_1.next()) {
                    var k = changedKeys_1_1.value;
                    event_1[k].changed = true;
                    event_1[k].prev = pagination_1[k][0];
                    event_1[k].curr = cached_1[k] = pagination_1[k][1];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (changedKeys_1_1 && !changedKeys_1_1.done && (_a = changedKeys_1.return)) _a.call(changedKeys_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return (/** @type {?} */ (event_1));
    }
    else {
        value = value || EMPTY;
        /** @type {?} */
        var cachedValue = cache[type];
        if (value === cachedValue) {
            return (/** @type {?} */ (createNotChangedEvent(cachedValue)));
        }
        else if (value !== EMPTY && cachedValue !== EMPTY) {
            /** @type {?} */
            var fn = DEEP_COMPARATORS[(/** @type {?} */ (type))];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2UtYWRhcHRlci5oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9kYXRhLXNvdXJjZS9kYXRhLXNvdXJjZS1hZGFwdGVyLmhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBV0EsTUFBTSxLQUFPLEtBQUssR0FBUSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQzs7QUFPM0MsTUFBTSxLQUFPLGdCQUFnQixHQUFzRDtJQUNqRixNQUFNOzs7OztJQUFOLFVBQU8sSUFBc0IsRUFBRSxJQUFzQjtRQUNuRCxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLE1BQU07ZUFDN0IsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzFCLDZCQUE2QjtRQUM3QixrRUFBa0U7SUFDdEUsQ0FBQztJQUNELElBQUk7Ozs7O0lBQUosVUFBSyxJQUFrQyxFQUFFLElBQWtDO1FBQ3pFLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFOztnQkFDekIsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTs7Z0JBQ3ZCLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDN0IsT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQ3JFO0lBQ0gsQ0FBQztJQUNELElBQUk7Ozs7O0lBQUosVUFBSyxJQUE2QixFQUFFLElBQTZCO1FBQy9ELE9BQU8sSUFBSSxLQUFLLElBQUksQ0FBQztJQUN2QixDQUFDO0NBQ0Y7Ozs7OztBQUVELE1BQU0sVUFBVSxzQkFBc0IsQ0FBSSxNQUF5RDtJQUNqRyxPQUFPO1FBQ0wsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1FBQ3ZCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7UUFDdEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7S0FDMUUsQ0FBQztBQUNKLENBQUM7Ozs7Ozs7O0FBSUQsTUFBTSxVQUFVLHFCQUFxQixDQUE0QyxJQUFPLEVBQ1AsS0FBaUIsRUFDakIsS0FBZ0M7O0lBQy9HLElBQUksSUFBSSxLQUFLLFlBQVksRUFBRTs7WUFDbkIsWUFBVSxHQUF3QyxtQkFBQSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsRUFBTzs7WUFDdEUsUUFBTSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7OztZQUU1QixXQUFXLEdBQXFELG1CQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBVSxDQUFDLENBQUMsTUFBTTs7OztRQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsUUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLFlBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssT0FBTyxFQUE5QyxDQUE4QyxFQUFDLEVBQU87O1lBRTNKLE9BQUssR0FBbUQ7WUFDNUQsT0FBTyxFQUFFLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUMvQixJQUFJLEVBQUUscUJBQXFCLENBQUMsUUFBTSxDQUFDLElBQUksQ0FBQztZQUN4QyxPQUFPLEVBQUUscUJBQXFCLENBQUMsUUFBTSxDQUFDLE9BQU8sQ0FBQztTQUMvQztRQUNELElBQUksT0FBSyxDQUFDLE9BQU8sRUFBRTs7Z0JBQ2pCLEtBQWdCLElBQUEsZ0JBQUEsaUJBQUEsV0FBVyxDQUFBLHdDQUFBLGlFQUFFO29CQUF4QixJQUFNLENBQUMsd0JBQUE7b0JBQ1YsT0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ3hCLE9BQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsWUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqQyxPQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzlDOzs7Ozs7Ozs7U0FDRjtRQUNELE9BQU8sbUJBQUEsT0FBSyxFQUE2QixDQUFDO0tBQzNDO1NBQU07UUFDTCxLQUFLLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQzs7WUFDakIsV0FBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDL0IsSUFBSSxLQUFLLEtBQUssV0FBVyxFQUFFO1lBQ3pCLE9BQU8sbUJBQUEscUJBQXFCLENBQUMsV0FBVyxDQUFDLEVBQU8sQ0FBQztTQUNsRDthQUFNLElBQUksS0FBSyxLQUFLLEtBQUssSUFBSSxXQUFXLEtBQUssS0FBSyxFQUFFOztnQkFDN0MsRUFBRSxHQUF3RixnQkFBZ0IsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQztZQUM3SCxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsbUJBQUEsS0FBSyxFQUFPLENBQUMsRUFBRTtnQkFDakMsT0FBTyxtQkFBQSxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsRUFBTyxDQUFDO2FBQ2xEO1NBQ0Y7UUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsbUJBQUEsS0FBSyxFQUFPLENBQUM7UUFDM0IsT0FBTyxtQkFBQSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQU8sQ0FBQztLQUNqRTtBQUNILENBQUM7Ozs7OztBQUVELFNBQVMscUJBQXFCLENBQUksS0FBUTtJQUN4QyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUN0RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWREYXRhU291cmNlU29ydENoYW5nZSwgRGF0YVNvdXJjZUZpbHRlciB9IGZyb20gJy4vdHlwZXMnO1xuXG5pbXBvcnQge1xuICBSZWZyZXNoRGF0YVdyYXBwZXIsXG4gIFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlLFxuICBQYmxEYXRhU291cmNlVHJpZ2dlcnMsXG4gIFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGUsXG4gIFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlZEV2ZW50LFxuICBUcmlnZ2VyQ2hhbmdlZEV2ZW50Rm9yLFxufSBmcm9tICcuL2RhdGEtc291cmNlLWFkYXB0ZXIudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgRU1QVFk6IGFueSA9IE9iamVjdC5mcmVlemUoe30pO1xuXG4vKiogQGludGVybmFsICovXG5leHBvcnQgdHlwZSBERUVQX0NPTVBBUkFUT1JTPEsgZXh0ZW5kcyBrZXlvZiBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlPiA9IHtcbiAgW1AgaW4gS10/OiAocHJldjogUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZVtQXSwgY3VycjogUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZVtQXSkgPT4gYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBjb25zdCBERUVQX0NPTVBBUkFUT1JTOiBERUVQX0NPTVBBUkFUT1JTPGtleW9mIFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGU+ID0ge1xuICBmaWx0ZXIocHJldjogRGF0YVNvdXJjZUZpbHRlciwgY3VycjogRGF0YVNvdXJjZUZpbHRlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBwcmV2LmZpbHRlciA9PT0gY3Vyci5maWx0ZXJcbiAgICAgICYmIHByZXYudHlwZSA9PSBjdXJyLnR5cGU7XG4gICAgICAvLyBUT0RPOiBkZWVwIGNvbXBhcmUgY29sdW1uc1xuICAgICAgLy8gJiYgKHByZXYuY29sdW1ucyB8fCBbXSkuam9pbigpID09PSAoY3Vyci5jb2x1bW5zIHx8IFtdKS5qb2luKCk7XG4gIH0sXG4gIHNvcnQocHJldjogUGJsTmdyaWREYXRhU291cmNlU29ydENoYW5nZSwgY3VycjogUGJsTmdyaWREYXRhU291cmNlU29ydENoYW5nZSk6IGJvb2xlYW4ge1xuICAgIGlmIChwcmV2LmNvbHVtbiA9PT0gY3Vyci5jb2x1bW4pIHtcbiAgICAgIGNvbnN0IHBTb3J0ID0gcHJldi5zb3J0IHx8IHt9O1xuICAgICAgY29uc3QgY1NvcnQgPSBjdXJyLnNvcnQgfHwge307XG4gICAgICByZXR1cm4gcFNvcnQub3JkZXIgPT09IGNTb3J0Lm9yZGVyICYmIHBTb3J0LnNvcnRGbiA9PT0gY1NvcnQuc29ydEZuO1xuICAgIH1cbiAgfSxcbiAgZGF0YShwcmV2OiBSZWZyZXNoRGF0YVdyYXBwZXI8YW55PiwgY3VycjogUmVmcmVzaERhdGFXcmFwcGVyPGFueT4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gcHJldiA9PT0gY3VycjtcbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21SZWZyZXNoRGF0YVdyYXBwZXI8VD4oY2hhbmdlOiBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZTxSZWZyZXNoRGF0YVdyYXBwZXI8VD4+KTogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2U8VD4ge1xuICByZXR1cm4ge1xuICAgIGNoYW5nZWQ6IGNoYW5nZS5jaGFuZ2VkLFxuICAgIHByZXY6IGNoYW5nZS5wcmV2LmRhdGEsXG4gICAgY3VycjogY2hhbmdlLmhhc093blByb3BlcnR5KCdjdXJyJykgPyBjaGFuZ2UuY3Vyci5kYXRhIDogY2hhbmdlLnByZXYuZGF0YSxcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgQ29WYWx1ZTxQIGV4dGVuZHMga2V5b2YgUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZT4gPSBQIGV4dGVuZHMga2V5b2YgUGJsRGF0YVNvdXJjZVRyaWdnZXJzID8gUGJsRGF0YVNvdXJjZVRyaWdnZXJzW1BdIDogUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZVtQXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNoYW5nZUNvbnRhaW5lcjxQIGV4dGVuZHMga2V5b2YgUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZT4odHlwZTogUCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBDb1ZhbHVlPFA+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGU6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGUpOiBUcmlnZ2VyQ2hhbmdlZEV2ZW50Rm9yPFA+IHtcbiAgaWYgKHR5cGUgPT09ICdwYWdpbmF0aW9uJykge1xuICAgIGNvbnN0IHBhZ2luYXRpb246IFBibERhdGFTb3VyY2VUcmlnZ2Vyc1sncGFnaW5hdGlvbiddID0gKHZhbHVlIHx8IHt9KSBhcyBhbnk7XG4gICAgY29uc3QgY2FjaGVkID0gY2FjaGVbJ3BhZ2luYXRpb24nXTtcbiAgICAvLyB3ZSBjb21wYXJlIHdlYWsgYmVjYXVzZSB3ZSBkb250IHdhbnQgY2hhbmdlcyBmcm9tIHVuZGVmaW5lZCB0byBudWxsIGV0Yy4uLlxuICAgIGNvbnN0IGNoYW5nZWRLZXlzOiBBcnJheTxrZXlvZiBQYmxEYXRhU291cmNlVHJpZ2dlcnNbJ3BhZ2luYXRpb24nXT4gPSBPYmplY3Qua2V5cyhwYWdpbmF0aW9uKS5maWx0ZXIoIGsgPT4gY2FjaGVkW2tdICE9IHBhZ2luYXRpb25ba11bMV0gJiYgayAhPT0gJ3RvdGFsJykgYXMgYW55O1xuXG4gICAgY29uc3QgZXZlbnQ6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlZEV2ZW50WydwYWdpbmF0aW9uJ10gPSB7XG4gICAgICBjaGFuZ2VkOiBjaGFuZ2VkS2V5cy5sZW5ndGggPiAwLFxuICAgICAgcGFnZTogY3JlYXRlTm90Q2hhbmdlZEV2ZW50KGNhY2hlZC5wYWdlKSxcbiAgICAgIHBlclBhZ2U6IGNyZWF0ZU5vdENoYW5nZWRFdmVudChjYWNoZWQucGVyUGFnZSksXG4gICAgfTtcbiAgICBpZiAoZXZlbnQuY2hhbmdlZCkge1xuICAgICAgZm9yIChjb25zdCBrIG9mIGNoYW5nZWRLZXlzKSB7XG4gICAgICAgIGV2ZW50W2tdLmNoYW5nZWQgPSB0cnVlO1xuICAgICAgICBldmVudFtrXS5wcmV2ID0gcGFnaW5hdGlvbltrXVswXTtcbiAgICAgICAgZXZlbnRba10uY3VyciA9IGNhY2hlZFtrXSA9IHBhZ2luYXRpb25ba11bMV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBldmVudCBhcyBUcmlnZ2VyQ2hhbmdlZEV2ZW50Rm9yPFA+O1xuICB9IGVsc2Uge1xuICAgIHZhbHVlID0gdmFsdWUgfHwgRU1QVFk7XG4gICAgY29uc3QgY2FjaGVkVmFsdWUgPSBjYWNoZVt0eXBlXTtcbiAgICBpZiAodmFsdWUgPT09IGNhY2hlZFZhbHVlKSB7XG4gICAgICByZXR1cm4gY3JlYXRlTm90Q2hhbmdlZEV2ZW50KGNhY2hlZFZhbHVlKSBhcyBhbnk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSAhPT0gRU1QVFkgJiYgY2FjaGVkVmFsdWUgIT09IEVNUFRZKSB7XG4gICAgICBjb25zdCBmbjogKHByZXY6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGVbUF0sIGN1cnI6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGVbUF0pID0+IGJvb2xlYW4gPSBERUVQX0NPTVBBUkFUT1JTW3R5cGUgYXMgYW55XTtcbiAgICAgIGlmIChmbihjYWNoZWRWYWx1ZSwgdmFsdWUgYXMgYW55KSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlTm90Q2hhbmdlZEV2ZW50KGNhY2hlZFZhbHVlKSBhcyBhbnk7XG4gICAgICB9XG4gICAgfVxuICAgIGNhY2hlW3R5cGVdID0gdmFsdWUgYXMgYW55O1xuICAgIHJldHVybiB7IGNoYW5nZWQ6IHRydWUsIHByZXY6IGNhY2hlZFZhbHVlLCBjdXJyOiB2YWx1ZSB9IGFzIGFueTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVOb3RDaGFuZ2VkRXZlbnQ8VD4odmFsdWU6IFQpOiBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZTxUPiB7XG4gIHJldHVybiB7IGNoYW5nZWQ6IGZhbHNlLCBwcmV2OiB2YWx1ZSwgY3VycjogdmFsdWUgfTtcbn1cbiJdfQ==