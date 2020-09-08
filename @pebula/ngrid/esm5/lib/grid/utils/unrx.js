/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/utils/unrx.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __values } from "tslib";
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
/**
 * Emits the values emitted by the source observable until a kill signal is sent to the group.
 * You can also specify a `subKillGroup` which can be used to kill specific subscriptions within a group.
 *
 * When a `killGroup` is "killed" all `subKillGroup` are killed as well. When a `subKillGroup` is "killed" the group remains
 * as well as other "subKillGroup" registered for that group.
 *
 * > WARNING: Do not apply operators that subscribe internally (e.g. combineLatest, switchMap) after the `killOnDestroy` operator.
 * Internal subscriptions will not unsubscribe automatically.
 * For more information see {\@link https://blog.angularindepth.com/rxjs-avoiding-takeuntil-leaks-fb5182d047ef | this blog post}
 * @template T
 * @param {?} killGroup
 * @param {?=} subKillGroup
 * @return {?}
 */
export function unrx(killGroup, subKillGroup) {
    return unrx.pipe(killGroup, subKillGroup);
}
(function (unrx) {
    /** @type {?} */
    var ALL_HANDLERS_TOKEN = {};
    /** @type {?} */
    var notifierStore = new WeakMap();
    /**
     * @param {?} component
     * @param {?=} create
     * @return {?}
     */
    function getNotifier(component, create) {
        if (create === void 0) { create = false; }
        /** @type {?} */
        var notifier = notifierStore.get(component);
        if (!notifier && create === true) {
            notifierStore.set(component, notifier = new Subject());
        }
        return notifier;
    }
    /**
     * @param {?} killGroup
     * @param {...?} subKillGroup
     * @return {?}
     */
    function kill(killGroup) {
        var e_1, _a;
        var subKillGroup = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            subKillGroup[_i - 1] = arguments[_i];
        }
        if (subKillGroup.length === 0) {
            killAll(killGroup);
        }
        else {
            /** @type {?} */
            var notifier = getNotifier(killGroup);
            if (notifier) {
                try {
                    for (var subKillGroup_1 = __values(subKillGroup), subKillGroup_1_1 = subKillGroup_1.next(); !subKillGroup_1_1.done; subKillGroup_1_1 = subKillGroup_1.next()) {
                        var h = subKillGroup_1_1.value;
                        notifier.next(h);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (subKillGroup_1_1 && !subKillGroup_1_1.done && (_a = subKillGroup_1.return)) _a.call(subKillGroup_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
    }
    unrx.kill = kill;
    /**
     * {\@inheritdoc unrx}
     * @template T
     * @param {?} killGroup
     * @param {?=} subKillGroup
     * @return {?}
     */
    function pipe(killGroup, subKillGroup) {
        return (/**
         * @param {?} source
         * @return {?}
         */
        function (source) { return source.pipe(takeUntil(getNotifier(killGroup, true).pipe(filter((/**
         * @param {?} h
         * @return {?}
         */
        function (h) { return h === ALL_HANDLERS_TOKEN || (subKillGroup && h === subKillGroup); }))))); });
    }
    unrx.pipe = pipe;
    /**
     * @param {?} obj
     * @return {?}
     */
    function killAll(obj) {
        /** @type {?} */
        var notifier = getNotifier(obj);
        if (notifier) {
            notifier.next(ALL_HANDLERS_TOKEN);
            notifier.complete();
            notifierStore.delete(obj);
        }
    }
})(unrx || (unrx = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5yeC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC91dGlscy91bnJ4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQWFuRCxNQUFNLFVBQVUsSUFBSSxDQUFJLFNBQWMsRUFBRSxZQUFrQjtJQUN4RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUksU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFFRCxXQUFpQixJQUFJOztRQUNiLGtCQUFrQixHQUFHLEVBQUU7O1FBQ3ZCLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBcUI7Ozs7OztJQUV0RCxTQUFTLFdBQVcsQ0FBQyxTQUFjLEVBQUUsTUFBYztRQUFkLHVCQUFBLEVBQUEsY0FBYzs7WUFDN0MsUUFBUSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUNoQyxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQyxDQUFDO1NBQzdEO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7Ozs7O0lBZUQsU0FBZ0IsSUFBSSxDQUFDLFNBQWM7O1FBQUUsc0JBQXNCO2FBQXRCLFVBQXNCLEVBQXRCLHFCQUFzQixFQUF0QixJQUFzQjtZQUF0QixxQ0FBc0I7O1FBQ3pELElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3BCO2FBQU07O2dCQUNDLFFBQVEsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3ZDLElBQUksUUFBUSxFQUFFOztvQkFDWixLQUFnQixJQUFBLGlCQUFBLFNBQUEsWUFBWSxDQUFBLDBDQUFBLG9FQUFFO3dCQUF6QixJQUFNLENBQUMseUJBQUE7d0JBQ1YsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDbEI7Ozs7Ozs7OzthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBWGUsU0FBSSxPQVduQixDQUFBOzs7Ozs7OztJQUdELFNBQWdCLElBQUksQ0FBSSxTQUFjLEVBQUUsWUFBa0I7UUFDeEQ7Ozs7UUFBTyxVQUFDLE1BQXFCLElBQUssT0FBQSxNQUFNLENBQUMsSUFBSSxDQUMzQyxTQUFTLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztRQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLGtCQUFrQixJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsS0FBSyxZQUFZLENBQUUsRUFBakUsQ0FBaUUsRUFBRSxDQUFDLENBQUMsQ0FDL0gsRUFGaUMsQ0FFakMsRUFBQztJQUNKLENBQUM7SUFKZSxTQUFJLE9BSW5CLENBQUE7Ozs7O0lBRUQsU0FBUyxPQUFPLENBQUMsR0FBUTs7WUFDakIsUUFBUSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFDakMsSUFBSSxRQUFRLEVBQUU7WUFDWixRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BCLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDM0I7SUFDSCxDQUFDO0FBQ0gsQ0FBQyxFQXJEZ0IsSUFBSSxLQUFKLElBQUksUUFxRHBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogRW1pdHMgdGhlIHZhbHVlcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2Ugb2JzZXJ2YWJsZSB1bnRpbCBhIGtpbGwgc2lnbmFsIGlzIHNlbnQgdG8gdGhlIGdyb3VwLlxuICogWW91IGNhbiBhbHNvIHNwZWNpZnkgYSBgc3ViS2lsbEdyb3VwYCB3aGljaCBjYW4gYmUgdXNlZCB0byBraWxsIHNwZWNpZmljIHN1YnNjcmlwdGlvbnMgd2l0aGluIGEgZ3JvdXAuXG4gKlxuICogV2hlbiBhIGBraWxsR3JvdXBgIGlzIFwia2lsbGVkXCIgYWxsIGBzdWJLaWxsR3JvdXBgIGFyZSBraWxsZWQgYXMgd2VsbC4gV2hlbiBhIGBzdWJLaWxsR3JvdXBgIGlzIFwia2lsbGVkXCIgdGhlIGdyb3VwIHJlbWFpbnNcbiAqIGFzIHdlbGwgYXMgb3RoZXIgXCJzdWJLaWxsR3JvdXBcIiByZWdpc3RlcmVkIGZvciB0aGF0IGdyb3VwLlxuICpcbiAqID4gV0FSTklORzogRG8gbm90IGFwcGx5IG9wZXJhdG9ycyB0aGF0IHN1YnNjcmliZSBpbnRlcm5hbGx5IChlLmcuIGNvbWJpbmVMYXRlc3QsIHN3aXRjaE1hcCkgYWZ0ZXIgdGhlIGBraWxsT25EZXN0cm95YCBvcGVyYXRvci5cbiAqIEludGVybmFsIHN1YnNjcmlwdGlvbnMgd2lsbCBub3QgdW5zdWJzY3JpYmUgYXV0b21hdGljYWxseS5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSB7QGxpbmsgaHR0cHM6Ly9ibG9nLmFuZ3VsYXJpbmRlcHRoLmNvbS9yeGpzLWF2b2lkaW5nLXRha2V1bnRpbC1sZWFrcy1mYjUxODJkMDQ3ZWYgfCB0aGlzIGJsb2cgcG9zdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVucng8VD4oa2lsbEdyb3VwOiBhbnksIHN1YktpbGxHcm91cD86IGFueSk6IChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gdW5yeC5waXBlPFQ+KGtpbGxHcm91cCwgc3ViS2lsbEdyb3VwKTtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSB1bnJ4IHtcbiAgY29uc3QgQUxMX0hBTkRMRVJTX1RPS0VOID0ge307XG4gIGNvbnN0IG5vdGlmaWVyU3RvcmUgPSBuZXcgV2Vha01hcDxhbnksIFN1YmplY3Q8YW55Pj4oKTtcblxuICBmdW5jdGlvbiBnZXROb3RpZmllcihjb21wb25lbnQ6IGFueSwgY3JlYXRlID0gZmFsc2UpOiBTdWJqZWN0PGFueT4gfCB1bmRlZmluZWQge1xuICAgIGxldCBub3RpZmllciA9IG5vdGlmaWVyU3RvcmUuZ2V0KGNvbXBvbmVudCk7XG4gICAgaWYgKCFub3RpZmllciAmJiBjcmVhdGUgPT09IHRydWUpIHtcbiAgICAgIG5vdGlmaWVyU3RvcmUuc2V0KGNvbXBvbmVudCwgbm90aWZpZXIgPSBuZXcgU3ViamVjdDxhbnk+KCkpO1xuICAgIH1cbiAgICByZXR1cm4gbm90aWZpZXI7XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBhIFwia2lsbFwiIHNpZ25hbCB0byB0aGUgc3BlY2lmaWVkIGBraWxsR3JvdXBgLlxuICAgKiBUaGlzIHdpbGwgaW1tZWRpYXRlbHkgdW5zdWJzY3JpYmUgYWxsIHN1YnNjcmlwdGlvbnMgd2l0aCB0aGUgYHVucnhgIHBpcGUgcmVnaXN0ZXJlZCB1bmRlciB0aGUgc3BlY2lmaWVkIGBraWxsR3JvdXBgLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhlIGVudGlyZSBga2lsbEdyb3VwYCBpcyBkZXN0cm95ZWQuXG4gICAqL1xuICBleHBvcnQgZnVuY3Rpb24ga2lsbChraWxsR3JvdXA6IGFueSk6IHZvaWQ7XG4gIC8qKlxuICAgKiBTZW5kIGEgXCJraWxsXCIgc2lnbmFsIHRvIGEgc3BlY2lmaWMgYHN1YktpbGxHcm91cGAgaW4gdGhlIHNwZWNpZmllZCBga2lsbEdyb3VwYC5cbiAgICogVGhpcyB3aWxsIGltbWVkaWF0ZWx5IHVuc3Vic2NyaWJlIGFsbCBzdWJzY3JpcHRpb25zIHdpdGggdGhlIGB1bnJ4YCBwaXBlIHJlZ2lzdGVyZWQgdW5kZXIgdGhlIHNwZWNpZmllZCBga2lsbEdyb3VwYCBhbmQgYHN1YktpbGxHcm91cGAuXG4gICAqXG4gICAqL1xuICBleHBvcnQgZnVuY3Rpb24ga2lsbChraWxsR3JvdXA6IGFueSwgLi4uc3ViS2lsbEdyb3VwOiBhbnlbXSk6IHZvaWQ7XG4gIGV4cG9ydCBmdW5jdGlvbiBraWxsKGtpbGxHcm91cDogYW55LCAuLi5zdWJLaWxsR3JvdXA6IGFueVtdKTogdm9pZCB7XG4gICAgaWYgKHN1YktpbGxHcm91cC5sZW5ndGggPT09IDApIHtcbiAgICAgIGtpbGxBbGwoa2lsbEdyb3VwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgbm90aWZpZXIgPSBnZXROb3RpZmllcihraWxsR3JvdXApO1xuICAgICAgaWYgKG5vdGlmaWVyKSB7XG4gICAgICAgIGZvciAoY29uc3QgaCBvZiBzdWJLaWxsR3JvdXApIHtcbiAgICAgICAgICBub3RpZmllci5uZXh0KGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIHtAaW5oZXJpdGRvYyB1bnJ4fSAqL1xuICBleHBvcnQgZnVuY3Rpb24gcGlwZTxUPihraWxsR3JvdXA6IGFueSwgc3ViS2lsbEdyb3VwPzogYW55KTogKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IHNvdXJjZS5waXBlKFxuICAgICAgdGFrZVVudGlsKGdldE5vdGlmaWVyKGtpbGxHcm91cCwgdHJ1ZSkucGlwZShmaWx0ZXIoIGggPT4gaCA9PT0gQUxMX0hBTkRMRVJTX1RPS0VOIHx8IChzdWJLaWxsR3JvdXAgJiYgaCA9PT0gc3ViS2lsbEdyb3VwICkgKSkpXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGtpbGxBbGwob2JqOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBub3RpZmllciA9IGdldE5vdGlmaWVyKG9iaik7XG4gICAgaWYgKG5vdGlmaWVyKSB7XG4gICAgICBub3RpZmllci5uZXh0KEFMTF9IQU5ETEVSU19UT0tFTik7XG4gICAgICBub3RpZmllci5jb21wbGV0ZSgpO1xuICAgICAgbm90aWZpZXJTdG9yZS5kZWxldGUob2JqKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==