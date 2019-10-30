/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
/**
 * @template T
 * @param {?=} component
 * @param {?=} handler
 * @return {?}
 */
export function UnRx(component, handler) {
    return component
        ? unrx(component, handler)
        : UnRx.decorateComponent;
}
(function (UnRx) {
    /** @type {?} */
    const originalOnDestroyFunctionStore = new Map();
    /**
     * @return {?}
     */
    function ngOnDestroy() {
        /** @type {?} */
        const oldNgOnDestroy = originalOnDestroyFunctionStore.get(this.constructor);
        if (oldNgOnDestroy) {
            oldNgOnDestroy.apply(this);
        }
        unrx.kill(this);
    }
    /**
     * @param {?} target
     * @return {?}
     */
    function decorateComponent(target) {
        /** @type {?} */
        const proto = target.prototype;
        if (proto.ngOnDestroy) {
            originalOnDestroyFunctionStore.set(target, proto.ngOnDestroy);
        }
        proto.ngOnDestroy = ngOnDestroy;
        return target;
    }
    UnRx.decorateComponent = decorateComponent;
    /**
     * @param {?} component
     * @param {...?} tokens
     * @return {?}
     */
    function kill(component, ...tokens) {
        unrx.kill(component, ...tokens);
    }
    UnRx.kill = kill;
})(UnRx || (UnRx = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5yeC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvdXRpbHMvIiwic291cmNlcyI6WyJsaWIvdW5yeC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FBYW5ELE1BQU0sVUFBVSxJQUFJLENBQUksU0FBYyxFQUFFLFlBQWtCO0lBQ3hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBSSxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDL0MsQ0FBQztBQUVELFdBQWlCLElBQUk7O1VBQ2Isa0JBQWtCLEdBQUcsRUFBRTs7VUFDdkIsYUFBYSxHQUFHLElBQUksT0FBTyxFQUFxQjs7Ozs7O0lBRXRELFNBQVMsV0FBVyxDQUFDLFNBQWMsRUFBRSxNQUFNLEdBQUcsS0FBSzs7WUFDN0MsUUFBUSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUNoQyxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQyxDQUFDO1NBQzdEO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7Ozs7O0lBZUQsU0FBZ0IsSUFBSSxDQUFDLFNBQWMsRUFBRSxHQUFHLFlBQW1CO1FBQ3pELElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3BCO2FBQU07O2tCQUNDLFFBQVEsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3ZDLElBQUksUUFBUSxFQUFFO2dCQUNaLEtBQUssTUFBTSxDQUFDLElBQUksWUFBWSxFQUFFO29CQUM1QixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNsQjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBWGUsU0FBSSxPQVduQixDQUFBOzs7Ozs7OztJQUdELFNBQWdCLElBQUksQ0FBSSxTQUFjLEVBQUUsWUFBa0I7UUFDeEQ7Ozs7UUFBTyxDQUFDLE1BQXFCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQzNDLFNBQVMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1FBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssa0JBQWtCLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxLQUFLLFlBQVksQ0FBRSxFQUFFLENBQUMsQ0FBQyxDQUMvSCxFQUFDO0lBQ0osQ0FBQztJQUplLFNBQUksT0FJbkIsQ0FBQTs7Ozs7SUFFRCxTQUFTLE9BQU8sQ0FBQyxHQUFROztjQUNqQixRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQztRQUNqQyxJQUFJLFFBQVEsRUFBRTtZQUNaLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNsQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7QUFDSCxDQUFDLEVBckRnQixJQUFJLEtBQUosSUFBSSxRQXFEcEI7Ozs7Ozs7QUE2RkQsTUFBTSxVQUFVLElBQUksQ0FBSSxTQUFlLEVBQUUsT0FBYTtJQUNwRCxPQUFPLFNBQVM7UUFDZCxDQUFDLENBQUMsSUFBSSxDQUFJLFNBQVMsRUFBRSxPQUFPLENBQUM7UUFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FDekI7QUFDSCxDQUFDO0FBRUQsV0FBaUIsSUFBSTs7VUFDYiw4QkFBOEIsR0FBRyxJQUFJLEdBQUcsRUFBbUI7Ozs7SUFFakUsU0FBUyxXQUFXOztjQUNaLGNBQWMsR0FBRyw4QkFBOEIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMzRSxJQUFJLGNBQWMsRUFBRTtZQUNsQixjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDOzs7OztJQUVELFNBQWdCLGlCQUFpQixDQUFDLE1BQVc7O2NBQ3JDLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUztRQUM5QixJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDckIsOEJBQThCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDL0Q7UUFDRCxLQUFLLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUNoQyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBUGUsc0JBQWlCLG9CQU9oQyxDQUFBOzs7Ozs7SUFhRCxTQUFnQixJQUFJLENBQUMsU0FBYyxFQUFFLEdBQUcsTUFBYTtRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFGZSxTQUFJLE9BRW5CLENBQUE7QUFFSCxDQUFDLEVBbkNnQixJQUFJLEtBQUosSUFBSSxRQW1DcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBFbWl0cyB0aGUgdmFsdWVzIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBvYnNlcnZhYmxlIHVudGlsIGEga2lsbCBzaWduYWwgaXMgc2VudCB0byB0aGUgZ3JvdXAuXG4gKiBZb3UgY2FuIGFsc28gc3BlY2lmeSBhIGBzdWJLaWxsR3JvdXBgIHdoaWNoIGNhbiBiZSB1c2VkIHRvIGtpbGwgc3BlY2lmaWMgc3Vic2NyaXB0aW9ucyB3aXRoaW4gYSBncm91cC5cbiAqXG4gKiBXaGVuIGEgYGtpbGxHcm91cGAgaXMgXCJraWxsZWRcIiBhbGwgYHN1YktpbGxHcm91cGAgYXJlIGtpbGxlZCBhcyB3ZWxsLiBXaGVuIGEgYHN1YktpbGxHcm91cGAgaXMgXCJraWxsZWRcIiB0aGUgZ3JvdXAgcmVtYWluc1xuICogYXMgd2VsbCBhcyBvdGhlciBcInN1YktpbGxHcm91cFwiIHJlZ2lzdGVyZWQgZm9yIHRoYXQgZ3JvdXAuXG4gKlxuICogPiBXQVJOSU5HOiBEbyBub3QgYXBwbHkgb3BlcmF0b3JzIHRoYXQgc3Vic2NyaWJlIGludGVybmFsbHkgKGUuZy4gY29tYmluZUxhdGVzdCwgc3dpdGNoTWFwKSBhZnRlciB0aGUgYGtpbGxPbkRlc3Ryb3lgIG9wZXJhdG9yLlxuICogSW50ZXJuYWwgc3Vic2NyaXB0aW9ucyB3aWxsIG5vdCB1bnN1YnNjcmliZSBhdXRvbWF0aWNhbGx5LlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIHtAbGluayBodHRwczovL2Jsb2cuYW5ndWxhcmluZGVwdGguY29tL3J4anMtYXZvaWRpbmctdGFrZXVudGlsLWxlYWtzLWZiNTE4MmQwNDdlZiB8IHRoaXMgYmxvZyBwb3N0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5yeDxUPihraWxsR3JvdXA6IGFueSwgc3ViS2lsbEdyb3VwPzogYW55KTogKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiB1bnJ4LnBpcGU8VD4oa2lsbEdyb3VwLCBzdWJLaWxsR3JvdXApO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIHVucngge1xuICBjb25zdCBBTExfSEFORExFUlNfVE9LRU4gPSB7fTtcbiAgY29uc3Qgbm90aWZpZXJTdG9yZSA9IG5ldyBXZWFrTWFwPGFueSwgU3ViamVjdDxhbnk+PigpO1xuXG4gIGZ1bmN0aW9uIGdldE5vdGlmaWVyKGNvbXBvbmVudDogYW55LCBjcmVhdGUgPSBmYWxzZSk6IFN1YmplY3Q8YW55PiB8IHVuZGVmaW5lZCB7XG4gICAgbGV0IG5vdGlmaWVyID0gbm90aWZpZXJTdG9yZS5nZXQoY29tcG9uZW50KTtcbiAgICBpZiAoIW5vdGlmaWVyICYmIGNyZWF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgbm90aWZpZXJTdG9yZS5zZXQoY29tcG9uZW50LCBub3RpZmllciA9IG5ldyBTdWJqZWN0PGFueT4oKSk7XG4gICAgfVxuICAgIHJldHVybiBub3RpZmllcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgXCJraWxsXCIgc2lnbmFsIHRvIHRoZSBzcGVjaWZpZWQgYGtpbGxHcm91cGAuXG4gICAqIFRoaXMgd2lsbCBpbW1lZGlhdGVseSB1bnN1YnNjcmliZSBhbGwgc3Vic2NyaXB0aW9ucyB3aXRoIHRoZSBgdW5yeGAgcGlwZSByZWdpc3RlcmVkIHVuZGVyIHRoZSBzcGVjaWZpZWQgYGtpbGxHcm91cGAuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGUgZW50aXJlIGBraWxsR3JvdXBgIGlzIGRlc3Ryb3llZC5cbiAgICovXG4gIGV4cG9ydCBmdW5jdGlvbiBraWxsKGtpbGxHcm91cDogYW55KTogdm9pZDtcbiAgLyoqXG4gICAqIFNlbmQgYSBcImtpbGxcIiBzaWduYWwgdG8gYSBzcGVjaWZpYyBgc3ViS2lsbEdyb3VwYCBpbiB0aGUgc3BlY2lmaWVkIGBraWxsR3JvdXBgLlxuICAgKiBUaGlzIHdpbGwgaW1tZWRpYXRlbHkgdW5zdWJzY3JpYmUgYWxsIHN1YnNjcmlwdGlvbnMgd2l0aCB0aGUgYHVucnhgIHBpcGUgcmVnaXN0ZXJlZCB1bmRlciB0aGUgc3BlY2lmaWVkIGBraWxsR3JvdXBgIGFuZCBgc3ViS2lsbEdyb3VwYC5cbiAgICpcbiAgICovXG4gIGV4cG9ydCBmdW5jdGlvbiBraWxsKGtpbGxHcm91cDogYW55LCAuLi5zdWJLaWxsR3JvdXA6IGFueVtdKTogdm9pZDtcbiAgZXhwb3J0IGZ1bmN0aW9uIGtpbGwoa2lsbEdyb3VwOiBhbnksIC4uLnN1YktpbGxHcm91cDogYW55W10pOiB2b2lkIHtcbiAgICBpZiAoc3ViS2lsbEdyb3VwLmxlbmd0aCA9PT0gMCkge1xuICAgICAga2lsbEFsbChraWxsR3JvdXApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBub3RpZmllciA9IGdldE5vdGlmaWVyKGtpbGxHcm91cCk7XG4gICAgICBpZiAobm90aWZpZXIpIHtcbiAgICAgICAgZm9yIChjb25zdCBoIG9mIHN1YktpbGxHcm91cCkge1xuICAgICAgICAgIG5vdGlmaWVyLm5leHQoaCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKioge0Bpbmhlcml0ZG9jIHVucnh9ICovXG4gIGV4cG9ydCBmdW5jdGlvbiBwaXBlPFQ+KGtpbGxHcm91cDogYW55LCBzdWJLaWxsR3JvdXA/OiBhbnkpOiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gc291cmNlLnBpcGUoXG4gICAgICB0YWtlVW50aWwoZ2V0Tm90aWZpZXIoa2lsbEdyb3VwLCB0cnVlKS5waXBlKGZpbHRlciggaCA9PiBoID09PSBBTExfSEFORExFUlNfVE9LRU4gfHwgKHN1YktpbGxHcm91cCAmJiBoID09PSBzdWJLaWxsR3JvdXAgKSApKSlcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24ga2lsbEFsbChvYmo6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IG5vdGlmaWVyID0gZ2V0Tm90aWZpZXIob2JqKTtcbiAgICBpZiAobm90aWZpZXIpIHtcbiAgICAgIG5vdGlmaWVyLm5leHQoQUxMX0hBTkRMRVJTX1RPS0VOKTtcbiAgICAgIG5vdGlmaWVyLmNvbXBsZXRlKCk7XG4gICAgICBub3RpZmllclN0b3JlLmRlbGV0ZShvYmopO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEVtaXRzIHRoZSB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgdW50aWwgdGhlIGFuZ3VsYXIgY29tcG9uZW50IGluc3RhbmNlIGlzIGRlc3Ryb3llZC4gKGBuZ09uRGVzdHJveWAgaXMgY2FsbGVkKS5cbiAqIElmIHRoZSBjb21wb25lbnQgYWxyZWFkeSBpbXBsZW1lbnRzIGBuZ09uRGVzdHJveWAgaXQgd2lsbCB3cmFwIGl0LlxuICpcbiAqIFlvdSBjYW4gYWxzbyBkZXN0cm95IG9uLWRlbWFuZCBieSBwcm92aWRpbmcgYSBoYW5kbGVyIGFuZCB1c2UgYFVuUngua2lsbGAgdG8gdW5zdWJzY3JpYmUuXG4gKiBOb3RlIHRoYXQgdXNpbmcgdGhlIHNhbWUgaGFuZGxlciBpZCBmb3IgbXVsdGlwbGUgc3Vic2NyaXB0aW9ucyB3aWxsIGtpbGwgYWxsIG9mIHRoZW0gdG9nZXRoZXIsIGkuZS4gdGhlIGhhbmRsZXIgaXMgYWxzbyBhIGdyb3VwLlxuICpcbiAqID4gV0FSTklORzogRG8gbm90IGFwcGx5IG9wZXJhdG9ycyB0aGF0IHN1YnNjcmliZSBpbnRlcm5hbGx5IChlLmcuIGNvbWJpbmVMYXRlc3QsIHN3aXRjaE1hcCkgYWZ0ZXIgdGhlIGBraWxsT25EZXN0cm95YCBvcGVyYXRvci5cbiAqIEludGVybmFsIHN1YnNjcmlwdGlvbnMgd2lsbCBub3QgdW5zdWJzY3JpYmUgYXV0b21hdGljYWxseS4gRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGh0dHBzOi8vYmxvZy5hbmd1bGFyaW5kZXB0aC5jb20vcnhqcy1hdm9pZGluZy10YWtldW50aWwtbGVha3MtZmI1MTgyZDA0N2VmXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBVblJ4PFQ+KGNvbXBvbmVudDogYW55LCBoYW5kbGVyPzogYW55KTogKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUPjtcbi8qKlxuICogQSBEZWNvcmF0b3IgdGhhdCBhZGQgc3VwcG9ydCBmb3IgYXV0b21hdGljIHVuc3Vic2NyaXB0aW9uIGluIGFuZ3VsYXIgY29tcG9uZW50cy5cbiAqXG4gKiBXaGVuIGFwcGxpZWQgb24gYSBjb21wb25lbnQsIGBVblJ4YCB3aWxsIHdyYXAgdGhlIGBuZ09uRGVzdHJveWAgbGlmZS1jeWNsZWAgaG9vayAob3IgY3JlYXRlIGlmIGRvZXNuJ3QgZXhpc3QpIGFuZCBhdXRvbWF0aWNhbGx5XG4gKiBkZXN0cm95IGFsbCBvcGVuIHN1YnNjcmlwdGlvbnMgdGhhdCBjb250YWluIHRoZSBgVW5SeGAgcGlwZSBpbiB0aGVpciBlbWlzc2lvbiBzdHJlYW0uXG4gKlxuICogQHJlbWFya3NcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgZGVtb25zdHJhdGUgYSBjb21wb25lbnQgdXNpbmcgdGhlIEhUVFAgY2xpZW50IHRvIGNhbGwgYSBzZXJ2ZXIuXG4gKiBXZSBhZGQgdGhlIGBVblJ4YCBwaXBlIHRvIHRoZSByZXNwb25zZSBvYnNlcnZhYmxlIChgcGlwZShVblJ4KHRoaXMpKWApIHNvIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQgdGhlIHN1YnNjcmlwdGlvbiBpcyBjbG9zZWQgYXMgd2VsbC5cbiAqXG4gKiBUaGlzIG1pZ2h0IHNlZW0gcmVkdW5kYW50IGJlY2F1c2UgdGhlIGBIdHRwQ2xpZW50YCB3aWxsIGF1dG9tYXRpY2FsbHkgY2xvc2UgdGhlIHN1YnNjcmlwdGlvbiBhZnRlciB0aGUgcmVzcG9uc2UgYnV0IHdoYXQgaGFwcGVuIHdoZW5cbiAqIHRoZSByZXNwb25zZSBhcnJpdmVkIEFGVEVSIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkICh1c2VyIGxlZnQgdGhlIHBhZ2UpP1xuICpcbiAqIEluIHRoaXMgY2FzZSB0aGUgc3Vic2NyaXB0aW9uIHdpbGwgZW1pdCB0aGUgcmVzcG9uc2UgYW5kIHRoZSBoYW5kbGVyIHdpbGwgcnVuLCB3ZSBkb24ndCB3YW50IHRoYXQhXG4gKlxuICogQnkgYXBwbHlpbmcgdGhlIHBpcGUgd2UgZW5zdXJlIHRoYXQgbm90aGluZyB3aWxsIHJ1biBvbmNlIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLlxuICpcbiAqIFRoZSBCSUcgQk9OVVMgaGVyZSBpcyBodHRwIGNhbmNlbGxhdGlvbiwgb25jZSBkZXN0cm95ZWQgYFVuUnhgIHdpbGwgY2xvc2UgdGhlIHN1YnNjcmlwdGlvbiB3aGljaCB3aWxsIGNhbmNlbCB0aGUgSFRUUCByZXF1ZXN0IVxuICogYGBgdHNcbiAqIGltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LWNtcCcsXG4gKiAgdGVtcGxhdGU6IGBgXG4gKiB9KVxuICogQFVuUngoKSAvLyBXaWxsIHVuLXN1YnNjcmliZSBhbGwgb3BlbiBzdWJzY3JpcHRpb25zIHdoZW4gY29tcG9uZW50IGlzIGRlc3Ryb3llZFxuICogZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50IHtcbiAqICAgc3RhdGljIFVSTCA9ICcvc29tZS1lbmRwb2ludCc7XG4gKlxuICogICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHsgfVxuICpcbiAqICAgZ2V0RGF0YSgpIHtcbiAqICAgICB0aGlzLmh0dHAuZ2V0KE15Q29tcG9uZW50LlVSTClcbiAqICAgICAgIC5waXBlKFVuUngodGhpcykpICAgICAgICAgICAgIC8vIFJlZ2lzdGVyIHRoZSBzdHJlYW0gZm9yIGF1dG8ta2lsbCBvbiBkZXN0cm95XG4gKiAgICAgICAuc3Vic2NyaWJlKCByZXNwb25zZSA9PiB7XG4gKiAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAqICAgICAgIH0pO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgaXMgYW4gaW1wcm92ZWQgdmVyc2lvbiBvZiB0aGUgcHJldmlvdXMgb25lLlxuICogQWxsIHBlbmRpbmcgcmVxdWVzdCB3aWxsIGJlIGNhbmNlbGxlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkIGJ1dCB3ZSB3aWxsIGFsc28gY2FuY2VsIGFsbCBwZW5kaW5nIHJlcXVlc3RzXG4gKiB3aGVuIGEgbmV3IHJlcXVlc3QgaXMgZmlyZWQuXG4gKlxuICogV2l0aCB0aGlzIHdlIGVuc3VyZSBzdGF0ZSBhbmQgZmxvdyBpbnRlZ3JpdHkgKG5vIHJhY2UgY29uZGl0aW9uIGJldHdlZW4gMiByZXF1ZXN0cykuXG4gKiBXZSBhbHNvIG1ha2Ugc3VyZSB0aGF0IHJlc291cmNlcyBhcmUgbm90IHdhc3RlZCAobXVsdGlwbGUgcmVkdW5kYW50IHJlcXVlc3RzLilcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqIGltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgc2VsZWN0b3I6ICdteS1jbXAnLFxuICogIHRlbXBsYXRlOiBgYFxuICogfSlcbiAqIEBVblJ4KCkgLy8gV2lsbCB1bi1zdWJzY3JpYmUgYWxsIG9wZW4gc3Vic2NyaXB0aW9ucyB3aGVuIGNvbXBvbmVudCBpcyBkZXN0cm95ZWRcbiAqIGV4cG9ydCBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKiAgIHN0YXRpYyBVUkwgPSAnL3NvbWUtZW5kcG9pbnQnO1xuICpcbiAqICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cbiAqXG4gKiAgIGdldERhdGEoKSB7XG4gKiAgICAgVW5SeC5raWxsKHRoaXMsIE15Q29tcG9uZW50LlVSTCk7IC8vIEtpbGwgKGNhbmNlbCkgcGVuZGluZyBIVFRQIHJlcXVlc3RzXG4gKiAgICAgdGhpcy5odHRwLmdldChNeUNvbXBvbmVudC5VUkwpXG4gKiAgICAgICAucGlwZShVblJ4KHRoaXMsIE15Q29tcG9uZW50LlVSTCkpIC8vIFJlZ2lzdGVyIHRoZSBzdHJlYW0gZm9yIGF1dG8ta2lsbCBvbiBkZXN0cm95IGFuZCBhZGQgYSBoYW5kbGVyIGZvciBhZC1ob2MgdW5zdWJzY3JpYmVcbiAqICAgICAgIC5zdWJzY3JpYmUoIHJlc3BvbnNlID0+IHtcbiAqICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICogICAgICAgfSk7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBpbnRlcm5hbHJlbWFya3NcbiAqIEJhc2VkIG9uIHdvcmsgZnJvbTpcbiAqICAgLSBodHRwczovL2dpdGh1Yi5jb20vdzExay9uZzItcngtY29tcG9uZW50ZGVzdHJveWVkL2Jsb2IvbWFzdGVyL3NyYy9pbmRleC50c1xuICogICAtIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM4MDA4MzM0L2FuZ3VsYXItcnhqcy13aGVuLXNob3VsZC1pLXVuc3Vic2NyaWJlLWZyb20tc3Vic2NyaXB0aW9uLzQxMTc3MTYzIzQxMTc3MTYzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBVblJ4PFQgPSBhbnk+KCk6IENsYXNzRGVjb3JhdG9yO1xuZXhwb3J0IGZ1bmN0aW9uIFVuUng8VD4oY29tcG9uZW50PzogYW55LCBoYW5kbGVyPzogYW55KTogQ2xhc3NEZWNvcmF0b3IgfCAoIChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VD4gKSB7XG4gIHJldHVybiBjb21wb25lbnRcbiAgICA/IHVucng8VD4oY29tcG9uZW50LCBoYW5kbGVyKVxuICAgIDogVW5SeC5kZWNvcmF0ZUNvbXBvbmVudFxuICA7XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgVW5SeCB7XG4gIGNvbnN0IG9yaWdpbmFsT25EZXN0cm95RnVuY3Rpb25TdG9yZSA9IG5ldyBNYXA8YW55LCAoKSA9PiB2b2lkPigpO1xuXG4gIGZ1bmN0aW9uIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IG9sZE5nT25EZXN0cm95ID0gb3JpZ2luYWxPbkRlc3Ryb3lGdW5jdGlvblN0b3JlLmdldCh0aGlzLmNvbnN0cnVjdG9yKTtcbiAgICBpZiAob2xkTmdPbkRlc3Ryb3kpIHtcbiAgICAgIG9sZE5nT25EZXN0cm95LmFwcGx5KHRoaXMpO1xuICAgIH1cbiAgICB1bnJ4LmtpbGwodGhpcyk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZGVjb3JhdGVDb21wb25lbnQodGFyZ2V0OiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IHByb3RvID0gdGFyZ2V0LnByb3RvdHlwZTtcbiAgICBpZiAocHJvdG8ubmdPbkRlc3Ryb3kpIHtcbiAgICAgIG9yaWdpbmFsT25EZXN0cm95RnVuY3Rpb25TdG9yZS5zZXQodGFyZ2V0LCBwcm90by5uZ09uRGVzdHJveSk7XG4gICAgfVxuICAgIHByb3RvLm5nT25EZXN0cm95ID0gbmdPbkRlc3Ryb3k7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgXCJraWxsXCIgc2lnbmFsIHRvIHRoZSBzcGVjaWZpZWQgYGNvbXBvbmVudGAgaW5zdGFuY2UuXG4gICAqIFRoaXMgd2lsbCBpbW1lZGlhdGVseSB1bnN1YnNjcmliZSBhbGwgc3Vic2NyaXB0aW9ucyB3aXRoIHRoZSBgVW5SeGAgcGlwZSByZWdpc3RlcmVkIHVuZGVyIHRoZSBzcGVjaWZpZWQgY29tcG9uZW50IGluc3RhbmNlLlxuICAgKi9cbiAgZXhwb3J0IGZ1bmN0aW9uIGtpbGwoa2lsbEdyb3VwOiBhbnkpOiB2b2lkO1xuICAvKipcbiAgICogU2VuZCBhIFwia2lsbFwiIHNpZ25hbCB0byBhIHNwZWNpZmljIGB0b2tlbmAgaW4gdGhlIHNwZWNpZmllZCBgY29tcG9uZW50YCBpbnN0YW5jZS5cbiAgICogVGhpcyB3aWxsIGltbWVkaWF0ZWx5IHVuc3Vic2NyaWJlIGFsbCBzdWJzY3JpcHRpb25zIHdpdGggdGhlIGBVblJ4YCBwaXBlIHJlZ2lzdGVyZWQgdW5kZXIgdGhlIHNwZWNpZmllZCBgY29tcG9uZW50YCBpbnN0YW5jZSBhbmQgYHRva2VuYC5cbiAgICpcbiAgICovXG4gIGV4cG9ydCBmdW5jdGlvbiBraWxsKGNvbXBvbmVudDogYW55LCAuLi50b2tlbnM6IGFueVtdKTogdm9pZDtcbiAgZXhwb3J0IGZ1bmN0aW9uIGtpbGwoY29tcG9uZW50OiBhbnksIC4uLnRva2VuczogYW55W10pOiB2b2lkIHtcbiAgICB1bnJ4LmtpbGwoY29tcG9uZW50LCAuLi50b2tlbnMpO1xuICB9XG5cbn1cbiJdfQ==