/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/utils/unrx.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    const ALL_HANDLERS_TOKEN = {};
    /** @type {?} */
    const notifierStore = new WeakMap();
    /**
     * @param {?} component
     * @param {?=} create
     * @return {?}
     */
    function getNotifier(component, create = false) {
        /** @type {?} */
        let notifier = notifierStore.get(component);
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
    function kill(killGroup, ...subKillGroup) {
        if (subKillGroup.length === 0) {
            killAll(killGroup);
        }
        else {
            /** @type {?} */
            const notifier = getNotifier(killGroup);
            if (notifier) {
                for (const h of subKillGroup) {
                    notifier.next(h);
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
        (source) => source.pipe(takeUntil(getNotifier(killGroup, true).pipe(filter((/**
         * @param {?} h
         * @return {?}
         */
        h => h === ALL_HANDLERS_TOKEN || (subKillGroup && h === subKillGroup)))))));
    }
    unrx.pipe = pipe;
    /**
     * @param {?} obj
     * @return {?}
     */
    function killAll(obj) {
        /** @type {?} */
        const notifier = getNotifier(obj);
        if (notifier) {
            notifier.next(ALL_HANDLERS_TOKEN);
            notifier.complete();
            notifierStore.delete(obj);
        }
    }
})(unrx || (unrx = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5yeC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC91dGlscy91bnJ4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FBYW5ELE1BQU0sVUFBVSxJQUFJLENBQUksU0FBYyxFQUFFLFlBQWtCO0lBQ3hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBSSxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDL0MsQ0FBQztBQUVELFdBQWlCLElBQUk7O1VBQ2Isa0JBQWtCLEdBQUcsRUFBRTs7VUFDdkIsYUFBYSxHQUFHLElBQUksT0FBTyxFQUFxQjs7Ozs7O0lBRXRELFNBQVMsV0FBVyxDQUFDLFNBQWMsRUFBRSxNQUFNLEdBQUcsS0FBSzs7WUFDN0MsUUFBUSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUNoQyxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQyxDQUFDO1NBQzdEO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7Ozs7O0lBZUQsU0FBZ0IsSUFBSSxDQUFDLFNBQWMsRUFBRSxHQUFHLFlBQW1CO1FBQ3pELElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3BCO2FBQU07O2tCQUNDLFFBQVEsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3ZDLElBQUksUUFBUSxFQUFFO2dCQUNaLEtBQUssTUFBTSxDQUFDLElBQUksWUFBWSxFQUFFO29CQUM1QixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNsQjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBWGUsU0FBSSxPQVduQixDQUFBOzs7Ozs7OztJQUdELFNBQWdCLElBQUksQ0FBSSxTQUFjLEVBQUUsWUFBa0I7UUFDeEQ7Ozs7UUFBTyxDQUFDLE1BQXFCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQzNDLFNBQVMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1FBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssa0JBQWtCLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxLQUFLLFlBQVksQ0FBRSxFQUFFLENBQUMsQ0FBQyxDQUMvSCxFQUFDO0lBQ0osQ0FBQztJQUplLFNBQUksT0FJbkIsQ0FBQTs7Ozs7SUFFRCxTQUFTLE9BQU8sQ0FBQyxHQUFROztjQUNqQixRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQztRQUNqQyxJQUFJLFFBQVEsRUFBRTtZQUNaLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNsQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7QUFDSCxDQUFDLEVBckRnQixJQUFJLEtBQUosSUFBSSxRQXFEcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBFbWl0cyB0aGUgdmFsdWVzIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBvYnNlcnZhYmxlIHVudGlsIGEga2lsbCBzaWduYWwgaXMgc2VudCB0byB0aGUgZ3JvdXAuXG4gKiBZb3UgY2FuIGFsc28gc3BlY2lmeSBhIGBzdWJLaWxsR3JvdXBgIHdoaWNoIGNhbiBiZSB1c2VkIHRvIGtpbGwgc3BlY2lmaWMgc3Vic2NyaXB0aW9ucyB3aXRoaW4gYSBncm91cC5cbiAqXG4gKiBXaGVuIGEgYGtpbGxHcm91cGAgaXMgXCJraWxsZWRcIiBhbGwgYHN1YktpbGxHcm91cGAgYXJlIGtpbGxlZCBhcyB3ZWxsLiBXaGVuIGEgYHN1YktpbGxHcm91cGAgaXMgXCJraWxsZWRcIiB0aGUgZ3JvdXAgcmVtYWluc1xuICogYXMgd2VsbCBhcyBvdGhlciBcInN1YktpbGxHcm91cFwiIHJlZ2lzdGVyZWQgZm9yIHRoYXQgZ3JvdXAuXG4gKlxuICogPiBXQVJOSU5HOiBEbyBub3QgYXBwbHkgb3BlcmF0b3JzIHRoYXQgc3Vic2NyaWJlIGludGVybmFsbHkgKGUuZy4gY29tYmluZUxhdGVzdCwgc3dpdGNoTWFwKSBhZnRlciB0aGUgYGtpbGxPbkRlc3Ryb3lgIG9wZXJhdG9yLlxuICogSW50ZXJuYWwgc3Vic2NyaXB0aW9ucyB3aWxsIG5vdCB1bnN1YnNjcmliZSBhdXRvbWF0aWNhbGx5LlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIHtAbGluayBodHRwczovL2Jsb2cuYW5ndWxhcmluZGVwdGguY29tL3J4anMtYXZvaWRpbmctdGFrZXVudGlsLWxlYWtzLWZiNTE4MmQwNDdlZiB8IHRoaXMgYmxvZyBwb3N0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5yeDxUPihraWxsR3JvdXA6IGFueSwgc3ViS2lsbEdyb3VwPzogYW55KTogKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiB1bnJ4LnBpcGU8VD4oa2lsbEdyb3VwLCBzdWJLaWxsR3JvdXApO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIHVucngge1xuICBjb25zdCBBTExfSEFORExFUlNfVE9LRU4gPSB7fTtcbiAgY29uc3Qgbm90aWZpZXJTdG9yZSA9IG5ldyBXZWFrTWFwPGFueSwgU3ViamVjdDxhbnk+PigpO1xuXG4gIGZ1bmN0aW9uIGdldE5vdGlmaWVyKGNvbXBvbmVudDogYW55LCBjcmVhdGUgPSBmYWxzZSk6IFN1YmplY3Q8YW55PiB8IHVuZGVmaW5lZCB7XG4gICAgbGV0IG5vdGlmaWVyID0gbm90aWZpZXJTdG9yZS5nZXQoY29tcG9uZW50KTtcbiAgICBpZiAoIW5vdGlmaWVyICYmIGNyZWF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgbm90aWZpZXJTdG9yZS5zZXQoY29tcG9uZW50LCBub3RpZmllciA9IG5ldyBTdWJqZWN0PGFueT4oKSk7XG4gICAgfVxuICAgIHJldHVybiBub3RpZmllcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgXCJraWxsXCIgc2lnbmFsIHRvIHRoZSBzcGVjaWZpZWQgYGtpbGxHcm91cGAuXG4gICAqIFRoaXMgd2lsbCBpbW1lZGlhdGVseSB1bnN1YnNjcmliZSBhbGwgc3Vic2NyaXB0aW9ucyB3aXRoIHRoZSBgdW5yeGAgcGlwZSByZWdpc3RlcmVkIHVuZGVyIHRoZSBzcGVjaWZpZWQgYGtpbGxHcm91cGAuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGUgZW50aXJlIGBraWxsR3JvdXBgIGlzIGRlc3Ryb3llZC5cbiAgICovXG4gIGV4cG9ydCBmdW5jdGlvbiBraWxsKGtpbGxHcm91cDogYW55KTogdm9pZDtcbiAgLyoqXG4gICAqIFNlbmQgYSBcImtpbGxcIiBzaWduYWwgdG8gYSBzcGVjaWZpYyBgc3ViS2lsbEdyb3VwYCBpbiB0aGUgc3BlY2lmaWVkIGBraWxsR3JvdXBgLlxuICAgKiBUaGlzIHdpbGwgaW1tZWRpYXRlbHkgdW5zdWJzY3JpYmUgYWxsIHN1YnNjcmlwdGlvbnMgd2l0aCB0aGUgYHVucnhgIHBpcGUgcmVnaXN0ZXJlZCB1bmRlciB0aGUgc3BlY2lmaWVkIGBraWxsR3JvdXBgIGFuZCBgc3ViS2lsbEdyb3VwYC5cbiAgICpcbiAgICovXG4gIGV4cG9ydCBmdW5jdGlvbiBraWxsKGtpbGxHcm91cDogYW55LCAuLi5zdWJLaWxsR3JvdXA6IGFueVtdKTogdm9pZDtcbiAgZXhwb3J0IGZ1bmN0aW9uIGtpbGwoa2lsbEdyb3VwOiBhbnksIC4uLnN1YktpbGxHcm91cDogYW55W10pOiB2b2lkIHtcbiAgICBpZiAoc3ViS2lsbEdyb3VwLmxlbmd0aCA9PT0gMCkge1xuICAgICAga2lsbEFsbChraWxsR3JvdXApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBub3RpZmllciA9IGdldE5vdGlmaWVyKGtpbGxHcm91cCk7XG4gICAgICBpZiAobm90aWZpZXIpIHtcbiAgICAgICAgZm9yIChjb25zdCBoIG9mIHN1YktpbGxHcm91cCkge1xuICAgICAgICAgIG5vdGlmaWVyLm5leHQoaCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKioge0Bpbmhlcml0ZG9jIHVucnh9ICovXG4gIGV4cG9ydCBmdW5jdGlvbiBwaXBlPFQ+KGtpbGxHcm91cDogYW55LCBzdWJLaWxsR3JvdXA/OiBhbnkpOiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gc291cmNlLnBpcGUoXG4gICAgICB0YWtlVW50aWwoZ2V0Tm90aWZpZXIoa2lsbEdyb3VwLCB0cnVlKS5waXBlKGZpbHRlciggaCA9PiBoID09PSBBTExfSEFORExFUlNfVE9LRU4gfHwgKHN1YktpbGxHcm91cCAmJiBoID09PSBzdWJLaWxsR3JvdXAgKSApKSlcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24ga2lsbEFsbChvYmo6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IG5vdGlmaWVyID0gZ2V0Tm90aWZpZXIob2JqKTtcbiAgICBpZiAobm90aWZpZXIpIHtcbiAgICAgIG5vdGlmaWVyLm5leHQoQUxMX0hBTkRMRVJTX1RPS0VOKTtcbiAgICAgIG5vdGlmaWVyLmNvbXBsZXRlKCk7XG4gICAgICBub3RpZmllclN0b3JlLmRlbGV0ZShvYmopO1xuICAgIH1cbiAgfVxufVxuIl19