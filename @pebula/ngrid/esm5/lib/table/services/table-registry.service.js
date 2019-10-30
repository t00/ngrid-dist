/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Subject } from 'rxjs';
import { Injectable, Optional, SkipSelf, } from '@angular/core';
import { UnRx } from '@pebula/utils';
import * as i0 from "@angular/core";
/**
 * @record
 */
export function RegistryChangedEvent() { }
if (false) {
    /** @type {?} */
    RegistryChangedEvent.prototype.op;
    /** @type {?} */
    RegistryChangedEvent.prototype.type;
    /** @type {?} */
    RegistryChangedEvent.prototype.value;
}
/**
 * A map of valid single-item value that can be registered, and their type.
 * @record
 */
export function PblNgridSingleRegistryMap() { }
if (false) {
    /** @type {?|undefined} */
    PblNgridSingleRegistryMap.prototype.noData;
    /** @type {?|undefined} */
    PblNgridSingleRegistryMap.prototype.paginator;
}
/**
 * A map of valid multi-item value that can be registered, and their type (the single type, i.e. T in Array<T>)
 * @record
 */
export function PblNgridMultiRegistryMap() { }
if (false) {
    /** @type {?|undefined} */
    PblNgridMultiRegistryMap.prototype.headerCell;
    /** @type {?|undefined} */
    PblNgridMultiRegistryMap.prototype.tableCell;
    /** @type {?|undefined} */
    PblNgridMultiRegistryMap.prototype.editorCell;
    /** @type {?|undefined} */
    PblNgridMultiRegistryMap.prototype.footerCell;
    /** @type {?|undefined} */
    PblNgridMultiRegistryMap.prototype.dataHeaderExtensions;
}
/**
 * A Registry for templates of table parts.
 *
 * The registry is hierarchical, where each instance of a registry has a parent which allows cascading templates.
 * The hierarchy is manged by angular DI.
 *
 * > The root registry does not have a parent.
 *
 * Each instance of a registry (including root) is a hierarchy by itself, composed of 2 internal levels.
 * The first level (L1 below) is used for fixed templates, the second level (L2 below) is used for dynamic templates.
 *
 * - Root Registry
 *   - Child Registry
 *     - ChildOfChild Registry
 *
 * In the example above there are 3 registries: Root, Child and ChildOfChild.
 *
 * When searching for a template in `ChildOfChild` it will search in the following order (top to bottom):
 *   - ChildOfChild
 *   - Child
 *   - Root
 *
 * If a registry does not contain the template the search will move to the next one.
 */
var PblNgridRegistryService = /** @class */ (function () {
    function PblNgridRegistryService(_parent) {
        this._parent = _parent;
        this._multi = {};
        this._multiDefaults = {};
        this._singles = {};
        this.changes$ = new Subject();
        this.changes = this.changes$.asObservable();
        if (this._parent) {
            this._parent.changes.pipe(UnRx(this)).subscribe(this.changes$);
            this.root = this._parent.root;
        }
        else {
            this.root = this;
        }
    }
    Object.defineProperty(PblNgridRegistryService.prototype, "parent", {
        get: /**
         * @return {?}
         */
        function () { return this._parent; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblNgridRegistryService.prototype.getRoot = /**
     * @return {?}
     */
    function () { return this.root; };
    /**
     * Returns the registered value for the single `kind`.
     * If not found will try to search the parent.
     */
    /**
     * Returns the registered value for the single `kind`.
     * If not found will try to search the parent.
     * @template P
     * @param {?} kind
     * @return {?}
     */
    PblNgridRegistryService.prototype.getSingle = /**
     * Returns the registered value for the single `kind`.
     * If not found will try to search the parent.
     * @template P
     * @param {?} kind
     * @return {?}
     */
    function (kind) {
        return this._singles[kind] || (this._parent && this._parent.getSingle(kind));
    };
    /**
     * @template P
     * @param {?} kind
     * @param {?} value
     * @return {?}
     */
    PblNgridRegistryService.prototype.setSingle = /**
     * @template P
     * @param {?} kind
     * @param {?} value
     * @return {?}
     */
    function (kind, value) {
        /** @type {?} */
        var previous = this.getSingle(kind);
        if (value !== previous) {
            this._singles[kind] = value;
            this.emitChanges({ op: value ? 'add' : 'remove', type: kind, value: value });
        }
    };
    /**
     * Returns the registered default value for the multi `kind`.
     * If not found will try to search the parent.
     */
    /**
     * Returns the registered default value for the multi `kind`.
     * If not found will try to search the parent.
     * @template P
     * @param {?} kind
     * @return {?}
     */
    PblNgridRegistryService.prototype.getMultiDefault = /**
     * Returns the registered default value for the multi `kind`.
     * If not found will try to search the parent.
     * @template P
     * @param {?} kind
     * @return {?}
     */
    function (kind) {
        return this._multiDefaults[kind] || (this._parent && this._parent.getMultiDefault(kind));
    };
    /**
     * @template P
     * @param {?} kind
     * @param {?} value
     * @return {?}
     */
    PblNgridRegistryService.prototype.setMultiDefault = /**
     * @template P
     * @param {?} kind
     * @param {?} value
     * @return {?}
     */
    function (kind, value) {
        /** @type {?} */
        var previous = this.getMultiDefault(kind);
        if (value !== previous) {
            this._multiDefaults[kind] = value;
            this.emitChanges({ op: value ? 'add' : 'remove', type: kind, value: value });
        }
    };
    /**
     * Returns the registered values for the multi `kind`.
     * If not found WILL NOT search the parent.
     */
    /**
     * Returns the registered values for the multi `kind`.
     * If not found WILL NOT search the parent.
     * @template T
     * @param {?} kind
     * @return {?}
     */
    PblNgridRegistryService.prototype.getMulti = /**
     * Returns the registered values for the multi `kind`.
     * If not found WILL NOT search the parent.
     * @template T
     * @param {?} kind
     * @return {?}
     */
    function (kind) {
        return (/** @type {?} */ (this._multi[kind]));
    };
    /**
     * @template T
     * @param {?} kind
     * @param {?} cellDef
     * @return {?}
     */
    PblNgridRegistryService.prototype.addMulti = /**
     * @template T
     * @param {?} kind
     * @param {?} cellDef
     * @return {?}
     */
    function (kind, cellDef) {
        /** @type {?} */
        var multi = this.getMulti(kind) || (this._multi[kind] = []);
        multi.push(cellDef);
        if (cellDef.name === '*') {
            this.setMultiDefault(kind, cellDef);
        }
        this.emitChanges({ op: 'add', type: kind, value: cellDef });
    };
    /**
     * @template T
     * @param {?} kind
     * @param {?} cellDef
     * @return {?}
     */
    PblNgridRegistryService.prototype.removeMulti = /**
     * @template T
     * @param {?} kind
     * @param {?} cellDef
     * @return {?}
     */
    function (kind, cellDef) {
        /** @type {?} */
        var multi = this.getMulti(kind);
        if (multi) {
            /** @type {?} */
            var idx = multi.indexOf(cellDef);
            if (idx > -1) {
                multi.splice(idx, 1);
            }
            this.emitChanges({ op: 'remove', type: kind, value: cellDef });
        }
    };
    /**
     * Iterate over all multi-registry value of the provided `kind` ascending order, starting from the last ancestor (this registry) up to
     * the root parent.
     *
     * Each time a collection for the `kind` is found the handler is invoked and then repeating the process on the parent.
     * If the `kind` does not exist the handler is not called moving on to the next parent.
     *
     * To bail out (stop the process and don't iterate to the next parent), return true from the handler.
     *
     * @returns The number of times that handler was invoked, i.e 0 means no matches.
     */
    /**
     * Iterate over all multi-registry value of the provided `kind` ascending order, starting from the last ancestor (this registry) up to
     * the root parent.
     *
     * Each time a collection for the `kind` is found the handler is invoked and then repeating the process on the parent.
     * If the `kind` does not exist the handler is not called moving on to the next parent.
     *
     * To bail out (stop the process and don't iterate to the next parent), return true from the handler.
     *
     * @template T
     * @param {?} kind
     * @param {?} handler
     * @return {?} The number of times that handler was invoked, i.e 0 means no matches.
     */
    PblNgridRegistryService.prototype.forMulti = /**
     * Iterate over all multi-registry value of the provided `kind` ascending order, starting from the last ancestor (this registry) up to
     * the root parent.
     *
     * Each time a collection for the `kind` is found the handler is invoked and then repeating the process on the parent.
     * If the `kind` does not exist the handler is not called moving on to the next parent.
     *
     * To bail out (stop the process and don't iterate to the next parent), return true from the handler.
     *
     * @template T
     * @param {?} kind
     * @param {?} handler
     * @return {?} The number of times that handler was invoked, i.e 0 means no matches.
     */
    function (kind, handler) {
        /** @type {?} */
        var registry = this;
        /** @type {?} */
        var hasSome = 0;
        while (registry) {
            /** @type {?} */
            var values = registry.getMulti(kind);
            if (values) {
                hasSome++;
                if (handler(values) === true) {
                    return;
                }
            }
            registry = registry.parent;
        }
        return hasSome;
    };
    /**
     * @return {?}
     */
    PblNgridRegistryService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.changes$.complete();
    };
    /**
     * Delay all notifications sent through `changes` and buffer then until next call to `bufferEnd()`.
     * When `bufferEnd()` is called it will flush all changes.
     *
     * > It's important to note that buffering does not freeze the registry, adding and removing templates will change the
     * registry and will effect queries. Buffering block the `changes` event stream and nothing more.
     */
    /**
     * Delay all notifications sent through `changes` and buffer then until next call to `bufferEnd()`.
     * When `bufferEnd()` is called it will flush all changes.
     *
     * > It's important to note that buffering does not freeze the registry, adding and removing templates will change the
     * registry and will effect queries. Buffering block the `changes` event stream and nothing more.
     * @return {?}
     */
    PblNgridRegistryService.prototype.bufferStart = /**
     * Delay all notifications sent through `changes` and buffer then until next call to `bufferEnd()`.
     * When `bufferEnd()` is called it will flush all changes.
     *
     * > It's important to note that buffering does not freeze the registry, adding and removing templates will change the
     * registry and will effect queries. Buffering block the `changes` event stream and nothing more.
     * @return {?}
     */
    function () {
        if (!this.root.bufferedData) {
            this.root.bufferedData = [];
        }
    };
    /**
     * @return {?}
     */
    PblNgridRegistryService.prototype.bufferEnd = /**
     * @return {?}
     */
    function () {
        if (this.root.bufferedData) {
            /** @type {?} */
            var data = this.root.bufferedData;
            this.root.bufferedData = undefined;
            this.emitChanges(data);
        }
    };
    /**
     * @private
     * @param {?} events
     * @return {?}
     */
    PblNgridRegistryService.prototype.emitChanges = /**
     * @private
     * @param {?} events
     * @return {?}
     */
    function (events) {
        var _a;
        /** @type {?} */
        var e = Array.isArray(events) ? events : [events];
        if (this.root.bufferedData) {
            (_a = this.root.bufferedData).push.apply(_a, tslib_1.__spread(e));
        }
        else {
            this.changes$.next(e);
        }
    };
    PblNgridRegistryService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    PblNgridRegistryService.ctorParameters = function () { return [
        { type: PblNgridRegistryService, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    /** @nocollapse */ PblNgridRegistryService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function PblNgridRegistryService_Factory() { return new PblNgridRegistryService(i0.ɵɵinject(PblNgridRegistryService, 12)); }, token: PblNgridRegistryService, providedIn: "root" });
    /**
     * A Registry for templates of table parts.
     *
     * The registry is hierarchical, where each instance of a registry has a parent which allows cascading templates.
     * The hierarchy is manged by angular DI.
     *
     * > The root registry does not have a parent.
     *
     * Each instance of a registry (including root) is a hierarchy by itself, composed of 2 internal levels.
     * The first level (L1 below) is used for fixed templates, the second level (L2 below) is used for dynamic templates.
     *
     * - Root Registry
     *   - Child Registry
     *     - ChildOfChild Registry
     *
     * In the example above there are 3 registries: Root, Child and ChildOfChild.
     *
     * When searching for a template in `ChildOfChild` it will search in the following order (top to bottom):
     *   - ChildOfChild
     *   - Child
     *   - Root
     *
     * If a registry does not contain the template the search will move to the next one.
     */
    PblNgridRegistryService = tslib_1.__decorate([
        UnRx(),
        tslib_1.__metadata("design:paramtypes", [PblNgridRegistryService])
    ], PblNgridRegistryService);
    return PblNgridRegistryService;
}());
export { PblNgridRegistryService };
if (false) {
    /** @type {?} */
    PblNgridRegistryService.prototype.changes;
    /**
     * @type {?}
     * @protected
     */
    PblNgridRegistryService.prototype.root;
    /**
     * @type {?}
     * @protected
     */
    PblNgridRegistryService.prototype._multi;
    /**
     * @type {?}
     * @protected
     */
    PblNgridRegistryService.prototype._multiDefaults;
    /**
     * @type {?}
     * @protected
     */
    PblNgridRegistryService.prototype._singles;
    /**
     * @type {?}
     * @protected
     */
    PblNgridRegistryService.prototype.changes$;
    /**
     * @type {?}
     * @private
     */
    PblNgridRegistryService.prototype._parent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcmVnaXN0cnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvc2VydmljZXMvdGFibGUtcmVnaXN0cnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUNMLFVBQVUsRUFDVixRQUFRLEVBQ1IsUUFBUSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBaUJyQywwQ0FJQzs7O0lBSEMsa0NBQXFCOztJQUNyQixvQ0FBdUU7O0lBQ3ZFLHFDQUFXOzs7Ozs7QUFNYiwrQ0FHQzs7O0lBRkMsMkNBQW9DOztJQUNwQyw4Q0FBMEM7Ozs7OztBQU01Qyw4Q0FRQzs7O0lBUEMsOENBQWlEOztJQUNqRCw2Q0FBMEM7O0lBQzFDLDhDQUFpRDs7SUFDakQsOENBQWlEOztJQUNqRCx3REFFbUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTBDbkcsaUNBQTRDLE9BQWlDO1FBQWpDLFlBQU8sR0FBUCxPQUFPLENBQTBCO1FBTm5FLFdBQU0sR0FBa0YsRUFBRSxDQUFDO1FBQzNGLG1CQUFjLEdBQTZCLEVBQUUsQ0FBQztRQUM5QyxhQUFRLEdBQThCLEVBQUUsQ0FBQztRQUtqRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzVDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMs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MkNBQW1EOzs7OztJQUVuRCwyQ0FBNkQ7Ozs7O0lBRWpELDBDQUFpRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIEluamVjdGFibGUsXG4gIE9wdGlvbmFsLFxuICBTa2lwU2VsZixcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuXG5pbXBvcnQge1xuICBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkRWRpdG9yQ2VsbERlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmUsXG5cbiAgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnksXG4gIFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeSxcbiAgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCxcbiAgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uUmVmLFxuXG4gIFBibE5ncmlkTm9EYXRhUmVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZFBhZ2luYXRvclJlZkRpcmVjdGl2ZSxcbn0gZnJvbSAnLi4vZGlyZWN0aXZlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVnaXN0cnlDaGFuZ2VkRXZlbnQge1xuICBvcDogJ2FkZCcgfCAncmVtb3ZlJztcbiAgdHlwZToga2V5b2YgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwIHwga2V5b2YgUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcDtcbiAgdmFsdWU6IGFueTtcbn1cblxuLyoqXG4gKiBBIG1hcCBvZiB2YWxpZCBzaW5nbGUtaXRlbSB2YWx1ZSB0aGF0IGNhbiBiZSByZWdpc3RlcmVkLCBhbmQgdGhlaXIgdHlwZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZFNpbmdsZVJlZ2lzdHJ5TWFwIHtcbiAgbm9EYXRhPzogUGJsTmdyaWROb0RhdGFSZWZEaXJlY3RpdmU7XG4gIHBhZ2luYXRvcj86IFBibE5ncmlkUGFnaW5hdG9yUmVmRGlyZWN0aXZlO1xufVxuXG4vKipcbiAqIEEgbWFwIG9mIHZhbGlkIG11bHRpLWl0ZW0gdmFsdWUgdGhhdCBjYW4gYmUgcmVnaXN0ZXJlZCwgYW5kIHRoZWlyIHR5cGUgKHRoZSBzaW5nbGUgdHlwZSwgaS5lLiBUIGluIEFycmF5PFQ+KVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcCB7XG4gIGhlYWRlckNlbGw/OiBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmU8YW55PjtcbiAgdGFibGVDZWxsPzogUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlPGFueT47XG4gIGVkaXRvckNlbGw/OiBQYmxOZ3JpZEVkaXRvckNlbGxEZWZEaXJlY3RpdmU8YW55PjtcbiAgZm9vdGVyQ2VsbD86IFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZTxhbnk+O1xuICBkYXRhSGVhZGVyRXh0ZW5zaW9ucz86XG4gICAgKFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5PFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsICdkYXRhSGVhZGVyRXh0ZW5zaW9ucyc+ICYgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uUmVmKVxuICAgIHwgKFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeTxhbnksICdkYXRhSGVhZGVyRXh0ZW5zaW9ucyc+ICYgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uUmVmKTtcbn1cblxuLyoqXG4gKiBBIFJlZ2lzdHJ5IGZvciB0ZW1wbGF0ZXMgb2YgdGFibGUgcGFydHMuXG4gKlxuICogVGhlIHJlZ2lzdHJ5IGlzIGhpZXJhcmNoaWNhbCwgd2hlcmUgZWFjaCBpbnN0YW5jZSBvZiBhIHJlZ2lzdHJ5IGhhcyBhIHBhcmVudCB3aGljaCBhbGxvd3MgY2FzY2FkaW5nIHRlbXBsYXRlcy5cbiAqIFRoZSBoaWVyYXJjaHkgaXMgbWFuZ2VkIGJ5IGFuZ3VsYXIgREkuXG4gKlxuICogPiBUaGUgcm9vdCByZWdpc3RyeSBkb2VzIG5vdCBoYXZlIGEgcGFyZW50LlxuICpcbiAqIEVhY2ggaW5zdGFuY2Ugb2YgYSByZWdpc3RyeSAoaW5jbHVkaW5nIHJvb3QpIGlzIGEgaGllcmFyY2h5IGJ5IGl0c2VsZiwgY29tcG9zZWQgb2YgMiBpbnRlcm5hbCBsZXZlbHMuXG4gKiBUaGUgZmlyc3QgbGV2ZWwgKEwxIGJlbG93KSBpcyB1c2VkIGZvciBmaXhlZCB0ZW1wbGF0ZXMsIHRoZSBzZWNvbmQgbGV2ZWwgKEwyIGJlbG93KSBpcyB1c2VkIGZvciBkeW5hbWljIHRlbXBsYXRlcy5cbiAqXG4gKiAtIFJvb3QgUmVnaXN0cnlcbiAqICAgLSBDaGlsZCBSZWdpc3RyeVxuICogICAgIC0gQ2hpbGRPZkNoaWxkIFJlZ2lzdHJ5XG4gKlxuICogSW4gdGhlIGV4YW1wbGUgYWJvdmUgdGhlcmUgYXJlIDMgcmVnaXN0cmllczogUm9vdCwgQ2hpbGQgYW5kIENoaWxkT2ZDaGlsZC5cbiAqXG4gKiBXaGVuIHNlYXJjaGluZyBmb3IgYSB0ZW1wbGF0ZSBpbiBgQ2hpbGRPZkNoaWxkYCBpdCB3aWxsIHNlYXJjaCBpbiB0aGUgZm9sbG93aW5nIG9yZGVyICh0b3AgdG8gYm90dG9tKTpcbiAqICAgLSBDaGlsZE9mQ2hpbGRcbiAqICAgLSBDaGlsZFxuICogICAtIFJvb3RcbiAqXG4gKiBJZiBhIHJlZ2lzdHJ5IGRvZXMgbm90IGNvbnRhaW4gdGhlIHRlbXBsYXRlIHRoZSBzZWFyY2ggd2lsbCBtb3ZlIHRvIHRoZSBuZXh0IG9uZS5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgcmVhZG9ubHkgY2hhbmdlczogT2JzZXJ2YWJsZTxSZWdpc3RyeUNoYW5nZWRFdmVudFtdPjtcbiAgZ2V0IHBhcmVudCgpOiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSB8IHVuZGVmaW5lZCB7IHJldHVybiB0aGlzLl9wYXJlbnQ7IH1cblxuICBwcm90ZWN0ZWQgcm9vdDogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UgJiB7IGJ1ZmZlcmVkRGF0YT86IFJlZ2lzdHJ5Q2hhbmdlZEV2ZW50W10gfTtcblxuICBwcm90ZWN0ZWQgX211bHRpOiB7IFtLIGluIGtleW9mIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcF06IEFycmF5PFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcFtLXT4gfSA9IHt9O1xuICBwcm90ZWN0ZWQgX211bHRpRGVmYXVsdHM6IFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcCA9IHt9O1xuICBwcm90ZWN0ZWQgX3NpbmdsZXM6IFBibE5ncmlkU2luZ2xlUmVnaXN0cnlNYXAgPSB7fTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY2hhbmdlcyQ6IFN1YmplY3Q8UmVnaXN0cnlDaGFuZ2VkRXZlbnRbXT47XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcHJpdmF0ZSBfcGFyZW50PzogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHtcbiAgICB0aGlzLmNoYW5nZXMkID0gbmV3IFN1YmplY3QoKTtcbiAgICB0aGlzLmNoYW5nZXMgPSB0aGlzLmNoYW5nZXMkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgIHRoaXMuX3BhcmVudC5jaGFuZ2VzLnBpcGUoVW5SeCh0aGlzKSkuc3Vic2NyaWJlKHRoaXMuY2hhbmdlcyQpO1xuICAgICAgdGhpcy5yb290ID0gdGhpcy5fcGFyZW50LnJvb3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucm9vdCA9IHRoaXM7XG4gICAgfVxuICB9XG5cbiAgZ2V0Um9vdCgpOiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSB7IHJldHVybiB0aGlzLnJvb3Q7IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcmVnaXN0ZXJlZCB2YWx1ZSBmb3IgdGhlIHNpbmdsZSBga2luZGAuXG4gICAqIElmIG5vdCBmb3VuZCB3aWxsIHRyeSB0byBzZWFyY2ggdGhlIHBhcmVudC5cbiAgICovXG4gIGdldFNpbmdsZTxQIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcD4oa2luZDogUCk6IFBibE5ncmlkU2luZ2xlUmVnaXN0cnlNYXBbUF0gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9zaW5nbGVzW2tpbmRdIHx8ICh0aGlzLl9wYXJlbnQgJiYgdGhpcy5fcGFyZW50LmdldFNpbmdsZShraW5kKSk7XG4gIH1cblxuICBzZXRTaW5nbGU8UCBleHRlbmRzIGtleW9mIFBibE5ncmlkU2luZ2xlUmVnaXN0cnlNYXA+KGtpbmQ6IFAsIHZhbHVlOiBQYmxOZ3JpZFNpbmdsZVJlZ2lzdHJ5TWFwW1BdIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgY29uc3QgcHJldmlvdXMgPSB0aGlzLmdldFNpbmdsZShraW5kKTtcbiAgICBpZiAodmFsdWUgIT09IHByZXZpb3VzKSB7XG4gICAgICB0aGlzLl9zaW5nbGVzW2tpbmRdID0gdmFsdWU7XG4gICAgICB0aGlzLmVtaXRDaGFuZ2VzKHsgb3A6IHZhbHVlID8gJ2FkZCcgOiAncmVtb3ZlJywgdHlwZToga2luZCwgdmFsdWUgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJlZ2lzdGVyZWQgZGVmYXVsdCB2YWx1ZSBmb3IgdGhlIG11bHRpIGBraW5kYC5cbiAgICogSWYgbm90IGZvdW5kIHdpbGwgdHJ5IHRvIHNlYXJjaCB0aGUgcGFyZW50LlxuICAgKi9cbiAgZ2V0TXVsdGlEZWZhdWx0PFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXA+KGtpbmQ6IFApOiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXBbUF0gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aURlZmF1bHRzW2tpbmRdIHx8ICh0aGlzLl9wYXJlbnQgJiYgdGhpcy5fcGFyZW50LmdldE11bHRpRGVmYXVsdChraW5kKSk7XG4gIH1cblxuICBzZXRNdWx0aURlZmF1bHQ8UCBleHRlbmRzIGtleW9mIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcD4oa2luZDogUCwgdmFsdWU6IFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcFtQXSB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIGNvbnN0IHByZXZpb3VzID0gdGhpcy5nZXRNdWx0aURlZmF1bHQoa2luZCk7XG4gICAgaWYgKHZhbHVlICE9PSBwcmV2aW91cykge1xuICAgICAgdGhpcy5fbXVsdGlEZWZhdWx0c1traW5kXSA9IHZhbHVlO1xuICAgICAgdGhpcy5lbWl0Q2hhbmdlcyh7IG9wOiB2YWx1ZSA/ICdhZGQnIDogJ3JlbW92ZScsIHR5cGU6IGtpbmQsIHZhbHVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByZWdpc3RlcmVkIHZhbHVlcyBmb3IgdGhlIG11bHRpIGBraW5kYC5cbiAgICogSWYgbm90IGZvdW5kIFdJTEwgTk9UIHNlYXJjaCB0aGUgcGFyZW50LlxuICAgKi9cbiAgZ2V0TXVsdGk8VCBleHRlbmRzIGtleW9mIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcD4oa2luZDogVCk6IEFycmF5PFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcFtUXT4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aVtraW5kXSBhcyBBcnJheTxQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXBbVF0+O1xuICB9XG5cbiAgYWRkTXVsdGk8VCBleHRlbmRzIGtleW9mIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcD4oa2luZDogVCwgY2VsbERlZjogUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwW1RdKTogdm9pZCB7XG4gICAgY29uc3QgbXVsdGkgPSB0aGlzLmdldE11bHRpKGtpbmQpIHx8ICh0aGlzLl9tdWx0aVtraW5kXSA9IFtdKTtcbiAgICBtdWx0aS5wdXNoKGNlbGxEZWYpO1xuICAgIGlmIChjZWxsRGVmLm5hbWUgPT09ICcqJykge1xuICAgICAgdGhpcy5zZXRNdWx0aURlZmF1bHQoa2luZCwgY2VsbERlZik7XG4gICAgfVxuICAgIHRoaXMuZW1pdENoYW5nZXMoeyBvcDogJ2FkZCcsIHR5cGU6IGtpbmQsIHZhbHVlOiBjZWxsRGVmIH0pXG4gIH1cblxuICByZW1vdmVNdWx0aTxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwPihraW5kOiBULCBjZWxsRGVmOiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXBbVF0pOiB2b2lkIHtcbiAgICBjb25zdCBtdWx0aSA9IHRoaXMuZ2V0TXVsdGkoa2luZCk7XG4gICAgaWYgKG11bHRpKSB7XG4gICAgICBjb25zdCBpZHggPSBtdWx0aS5pbmRleE9mKGNlbGxEZWYpO1xuICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgIG11bHRpLnNwbGljZShpZHgsIDEpO1xuICAgICAgfVxuICAgICAgdGhpcy5lbWl0Q2hhbmdlcyh7IG9wOiAncmVtb3ZlJywgdHlwZToga2luZCwgdmFsdWU6IGNlbGxEZWYgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZSBvdmVyIGFsbCBtdWx0aS1yZWdpc3RyeSB2YWx1ZSBvZiB0aGUgcHJvdmlkZWQgYGtpbmRgIGFzY2VuZGluZyBvcmRlciwgc3RhcnRpbmcgZnJvbSB0aGUgbGFzdCBhbmNlc3RvciAodGhpcyByZWdpc3RyeSkgdXAgdG9cbiAgICogdGhlIHJvb3QgcGFyZW50LlxuICAgKlxuICAgKiBFYWNoIHRpbWUgYSBjb2xsZWN0aW9uIGZvciB0aGUgYGtpbmRgIGlzIGZvdW5kIHRoZSBoYW5kbGVyIGlzIGludm9rZWQgYW5kIHRoZW4gcmVwZWF0aW5nIHRoZSBwcm9jZXNzIG9uIHRoZSBwYXJlbnQuXG4gICAqIElmIHRoZSBga2luZGAgZG9lcyBub3QgZXhpc3QgdGhlIGhhbmRsZXIgaXMgbm90IGNhbGxlZCBtb3Zpbmcgb24gdG8gdGhlIG5leHQgcGFyZW50LlxuICAgKlxuICAgKiBUbyBiYWlsIG91dCAoc3RvcCB0aGUgcHJvY2VzcyBhbmQgZG9uJ3QgaXRlcmF0ZSB0byB0aGUgbmV4dCBwYXJlbnQpLCByZXR1cm4gdHJ1ZSBmcm9tIHRoZSBoYW5kbGVyLlxuICAgKlxuICAgKiBAcmV0dXJucyBUaGUgbnVtYmVyIG9mIHRpbWVzIHRoYXQgaGFuZGxlciB3YXMgaW52b2tlZCwgaS5lIDAgbWVhbnMgbm8gbWF0Y2hlcy5cbiAgICovXG4gIGZvck11bHRpPFQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXA+KGtpbmQ6IFQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6ICggKHZhbHVlczogQXJyYXk8UGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwW1RdPikgPT4gYm9vbGVhbiB8IHZvaWQpKTogbnVtYmVyIHtcbiAgICBsZXQgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlID0gdGhpcztcbiAgICBsZXQgaGFzU29tZSA9IDA7XG4gICAgd2hpbGUgKHJlZ2lzdHJ5KSB7XG4gICAgICBjb25zdCB2YWx1ZXMgPSByZWdpc3RyeS5nZXRNdWx0aShraW5kKTtcbiAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgaGFzU29tZSsrO1xuICAgICAgICBpZiAoaGFuZGxlcih2YWx1ZXMpID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZWdpc3RyeSA9IHJlZ2lzdHJ5LnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIGhhc1NvbWU7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoYW5nZXMkLmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVsYXkgYWxsIG5vdGlmaWNhdGlvbnMgc2VudCB0aHJvdWdoIGBjaGFuZ2VzYCBhbmQgYnVmZmVyIHRoZW4gdW50aWwgbmV4dCBjYWxsIHRvIGBidWZmZXJFbmQoKWAuXG4gICAqIFdoZW4gYGJ1ZmZlckVuZCgpYCBpcyBjYWxsZWQgaXQgd2lsbCBmbHVzaCBhbGwgY2hhbmdlcy5cbiAgICpcbiAgICogPiBJdCdzIGltcG9ydGFudCB0byBub3RlIHRoYXQgYnVmZmVyaW5nIGRvZXMgbm90IGZyZWV6ZSB0aGUgcmVnaXN0cnksIGFkZGluZyBhbmQgcmVtb3ZpbmcgdGVtcGxhdGVzIHdpbGwgY2hhbmdlIHRoZVxuICAgKiByZWdpc3RyeSBhbmQgd2lsbCBlZmZlY3QgcXVlcmllcy4gQnVmZmVyaW5nIGJsb2NrIHRoZSBgY2hhbmdlc2AgZXZlbnQgc3RyZWFtIGFuZCBub3RoaW5nIG1vcmUuXG4gICAqL1xuICBidWZmZXJTdGFydCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucm9vdC5idWZmZXJlZERhdGEpIHtcbiAgICAgIHRoaXMucm9vdC5idWZmZXJlZERhdGEgPSBbXTtcbiAgICB9XG4gIH1cblxuICBidWZmZXJFbmQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucm9vdC5idWZmZXJlZERhdGEpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLnJvb3QuYnVmZmVyZWREYXRhO1xuICAgICAgdGhpcy5yb290LmJ1ZmZlcmVkRGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZW1pdENoYW5nZXMoZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBlbWl0Q2hhbmdlcyhldmVudHM6IFJlZ2lzdHJ5Q2hhbmdlZEV2ZW50IHwgUmVnaXN0cnlDaGFuZ2VkRXZlbnRbXSk6IHZvaWQge1xuICAgIGNvbnN0IGUgPSBBcnJheS5pc0FycmF5KGV2ZW50cykgPyBldmVudHMgOiBbZXZlbnRzXTtcbiAgICBpZiAodGhpcy5yb290LmJ1ZmZlcmVkRGF0YSkge1xuICAgICAgdGhpcy5yb290LmJ1ZmZlcmVkRGF0YS5wdXNoKC4uLmUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hhbmdlcyQubmV4dChlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==