import { __values, __spread } from 'tslib';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
function unrx(killGroup, subKillGroup) {
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
/**
 * @template T
 * @param {?=} component
 * @param {?=} handler
 * @return {?}
 */
function UnRx(component, handler) {
    return component
        ? unrx(component, handler)
        : UnRx.decorateComponent;
}
(function (UnRx) {
    /** @type {?} */
    var originalOnDestroyFunctionStore = new Map();
    /**
     * @return {?}
     */
    function ngOnDestroy() {
        /** @type {?} */
        var oldNgOnDestroy = originalOnDestroyFunctionStore.get(this.constructor);
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
        var proto = target.prototype;
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
    function kill(component) {
        var tokens = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tokens[_i - 1] = arguments[_i];
        }
        unrx.kill.apply(unrx, __spread([component], tokens));
    }
    UnRx.kill = kill;
})(UnRx || (UnRx = {}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} arr
 * @param {?} value
 * @return {?}
 */
function removeFromArray(arr, value) {
    if (Array.isArray(value)) {
        return value.map((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return _removeFromArray(arr, v); }));
    }
    else if (typeof value === 'function') {
        /** @type {?} */
        var idx = arr.findIndex((/** @type {?} */ (value)));
        if (idx > -1) {
            arr.splice(idx, 1);
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return _removeFromArray(arr, value);
    }
}
/**
 * @template T
 * @param {?} arr
 * @param {?} value
 * @return {?}
 */
function _removeFromArray(arr, value) {
    /** @type {?} */
    var idx = arr.indexOf(value);
    if (idx > -1) {
        arr.splice(idx, 1);
        return true;
    }
    else {
        return false;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { UnRx, removeFromArray, unrx as ɵa };
//# sourceMappingURL=pebula-utils.js.map
