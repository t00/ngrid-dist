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
let PblNgridRegistryService = /**
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
class PblNgridRegistryService {
    /**
     * @param {?=} _parent
     */
    constructor(_parent) {
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
    /**
     * @return {?}
     */
    get parent() { return this._parent; }
    /**
     * @return {?}
     */
    getRoot() { return this.root; }
    /**
     * Returns the registered value for the single `kind`.
     * If not found will try to search the parent.
     * @template P
     * @param {?} kind
     * @return {?}
     */
    getSingle(kind) {
        return this._singles[kind] || (this._parent && this._parent.getSingle(kind));
    }
    /**
     * @template P
     * @param {?} kind
     * @param {?} value
     * @return {?}
     */
    setSingle(kind, value) {
        /** @type {?} */
        const previous = this.getSingle(kind);
        if (value !== previous) {
            this._singles[kind] = value;
            this.emitChanges({ op: value ? 'add' : 'remove', type: kind, value });
        }
    }
    /**
     * Returns the registered default value for the multi `kind`.
     * If not found will try to search the parent.
     * @template P
     * @param {?} kind
     * @return {?}
     */
    getMultiDefault(kind) {
        return this._multiDefaults[kind] || (this._parent && this._parent.getMultiDefault(kind));
    }
    /**
     * @template P
     * @param {?} kind
     * @param {?} value
     * @return {?}
     */
    setMultiDefault(kind, value) {
        /** @type {?} */
        const previous = this.getMultiDefault(kind);
        if (value !== previous) {
            this._multiDefaults[kind] = value;
            this.emitChanges({ op: value ? 'add' : 'remove', type: kind, value });
        }
    }
    /**
     * Returns the registered values for the multi `kind`.
     * If not found WILL NOT search the parent.
     * @template T
     * @param {?} kind
     * @return {?}
     */
    getMulti(kind) {
        return (/** @type {?} */ (this._multi[kind]));
    }
    /**
     * @template T
     * @param {?} kind
     * @param {?} cellDef
     * @return {?}
     */
    addMulti(kind, cellDef) {
        /** @type {?} */
        const multi = this.getMulti(kind) || (this._multi[kind] = []);
        multi.push(cellDef);
        if (cellDef.name === '*') {
            this.setMultiDefault(kind, cellDef);
        }
        this.emitChanges({ op: 'add', type: kind, value: cellDef });
    }
    /**
     * @template T
     * @param {?} kind
     * @param {?} cellDef
     * @return {?}
     */
    removeMulti(kind, cellDef) {
        /** @type {?} */
        const multi = this.getMulti(kind);
        if (multi) {
            /** @type {?} */
            const idx = multi.indexOf(cellDef);
            if (idx > -1) {
                multi.splice(idx, 1);
            }
            this.emitChanges({ op: 'remove', type: kind, value: cellDef });
        }
    }
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
    forMulti(kind, handler) {
        /** @type {?} */
        let registry = this;
        /** @type {?} */
        let hasSome = 0;
        while (registry) {
            /** @type {?} */
            const values = registry.getMulti(kind);
            if (values) {
                hasSome++;
                if (handler(values) === true) {
                    return;
                }
            }
            registry = registry.parent;
        }
        return hasSome;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.changes$.complete();
    }
    /**
     * Delay all notifications sent through `changes` and buffer then until next call to `bufferEnd()`.
     * When `bufferEnd()` is called it will flush all changes.
     *
     * > It's important to note that buffering does not freeze the registry, adding and removing templates will change the
     * registry and will effect queries. Buffering block the `changes` event stream and nothing more.
     * @return {?}
     */
    bufferStart() {
        if (!this.root.bufferedData) {
            this.root.bufferedData = [];
        }
    }
    /**
     * @return {?}
     */
    bufferEnd() {
        if (this.root.bufferedData) {
            /** @type {?} */
            const data = this.root.bufferedData;
            this.root.bufferedData = undefined;
            this.emitChanges(data);
        }
    }
    /**
     * @private
     * @param {?} events
     * @return {?}
     */
    emitChanges(events) {
        /** @type {?} */
        const e = Array.isArray(events) ? events : [events];
        if (this.root.bufferedData) {
            this.root.bufferedData.push(...e);
        }
        else {
            this.changes$.next(e);
        }
    }
};
PblNgridRegistryService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
PblNgridRegistryService.ctorParameters = () => [
    { type: PblNgridRegistryService, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcmVnaXN0cnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvc2VydmljZXMvdGFibGUtcmVnaXN0cnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUNMLFVBQVUsRUFDVixRQUFRLEVBQ1IsUUFBUSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBaUJyQywwQ0FJQzs7O0lBSEMsa0NBQXFCOztJQUNyQixvQ0FBdUU7O0lBQ3ZFLHFDQUFXOzs7Ozs7QUFNYiwrQ0FHQzs7O0lBRkMsMkNBQW9DOztJQUNwQyw4Q0FBMEM7Ozs7OztBQU01Qyw4Q0FRQzs7O0lBUEMsOENBQWlEOztJQUNqRCw2Q0FBMEM7O0lBQzFDLDhDQUFpRDs7SUFDakQsOENBQWlEOztJQUNqRCx3REFFbUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNkJ4Rix1QkFBdUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQUF2Qix1QkFBdUI7Ozs7SUFhbEMsWUFBNEMsT0FBaUM7UUFBakMsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7UUFObkUsV0FBTSxHQUFrRixFQUFFLENBQUM7UUFDM0YsbUJBQWMsR0FBNkIsRUFBRSxDQUFDO1FBQzlDLGFBQVEsR0FBOEIsRUFBRSxDQUFDO1FBS2pELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDNUMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMs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QUksQ0FBQyxZQUFZO1lBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztZQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sV0FBVyxDQUFDLE1BQXFEOztjQUNqRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNuRCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQ2xDO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2QjtJQUNILENBQUM7Q0FDRixDQUFBOztZQXJKQSxVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7O1lBZXNCLHVCQUF1Qix1QkFBaEUsUUFBUSxZQUFJLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWJ0Qix1QkFBdUI7SUFEbkMsSUFBSSxFQUFFOzZDQWNpRCx1QkFBdUI7R0FibEUsdUJBQXVCLENBbUpuQztTQW5KWSx1QkFBdUI7OztJQUVsQywwQ0FBcUQ7Ozs7O0lBR3JELHVDQUFvRjs7Ozs7SUFFcEYseUNBQXFHOzs7OztJQUNyRyxpREFBd0Q7Ozs7O0lBQ3hELDJDQUFtRDs7Ozs7SUFFbkQsMkNBQTZEOzs7OztJQUVqRCwwQ0FBaUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBJbmplY3RhYmxlLFxuICBPcHRpb25hbCxcbiAgU2tpcFNlbGYsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcblxuaW1wb3J0IHtcbiAgUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZEVkaXRvckNlbGxEZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlLFxuXG4gIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5LFxuICBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnksXG4gIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsXG4gIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvblJlZixcblxuICBQYmxOZ3JpZE5vRGF0YVJlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRQYWdpbmF0b3JSZWZEaXJlY3RpdmUsXG59IGZyb20gJy4uL2RpcmVjdGl2ZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlZ2lzdHJ5Q2hhbmdlZEV2ZW50IHtcbiAgb3A6ICdhZGQnIHwgJ3JlbW92ZSc7XG4gIHR5cGU6IGtleW9mIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcCB8IGtleW9mIFBibE5ncmlkU2luZ2xlUmVnaXN0cnlNYXA7XG4gIHZhbHVlOiBhbnk7XG59XG5cbi8qKlxuICogQSBtYXAgb2YgdmFsaWQgc2luZ2xlLWl0ZW0gdmFsdWUgdGhhdCBjYW4gYmUgcmVnaXN0ZXJlZCwgYW5kIHRoZWlyIHR5cGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcCB7XG4gIG5vRGF0YT86IFBibE5ncmlkTm9EYXRhUmVmRGlyZWN0aXZlO1xuICBwYWdpbmF0b3I/OiBQYmxOZ3JpZFBhZ2luYXRvclJlZkRpcmVjdGl2ZTtcbn1cblxuLyoqXG4gKiBBIG1hcCBvZiB2YWxpZCBtdWx0aS1pdGVtIHZhbHVlIHRoYXQgY2FuIGJlIHJlZ2lzdGVyZWQsIGFuZCB0aGVpciB0eXBlICh0aGUgc2luZ2xlIHR5cGUsIGkuZS4gVCBpbiBBcnJheTxUPilcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXAge1xuICBoZWFkZXJDZWxsPzogUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlPGFueT47XG4gIHRhYmxlQ2VsbD86IFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZTxhbnk+O1xuICBlZGl0b3JDZWxsPzogUGJsTmdyaWRFZGl0b3JDZWxsRGVmRGlyZWN0aXZlPGFueT47XG4gIGZvb3RlckNlbGw/OiBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmU8YW55PjtcbiAgZGF0YUhlYWRlckV4dGVuc2lvbnM/OlxuICAgIChQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeTxQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCAnZGF0YUhlYWRlckV4dGVuc2lvbnMnPiAmIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvblJlZilcbiAgICB8IChQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnk8YW55LCAnZGF0YUhlYWRlckV4dGVuc2lvbnMnPiAmIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvblJlZik7XG59XG5cbi8qKlxuICogQSBSZWdpc3RyeSBmb3IgdGVtcGxhdGVzIG9mIHRhYmxlIHBhcnRzLlxuICpcbiAqIFRoZSByZWdpc3RyeSBpcyBoaWVyYXJjaGljYWwsIHdoZXJlIGVhY2ggaW5zdGFuY2Ugb2YgYSByZWdpc3RyeSBoYXMgYSBwYXJlbnQgd2hpY2ggYWxsb3dzIGNhc2NhZGluZyB0ZW1wbGF0ZXMuXG4gKiBUaGUgaGllcmFyY2h5IGlzIG1hbmdlZCBieSBhbmd1bGFyIERJLlxuICpcbiAqID4gVGhlIHJvb3QgcmVnaXN0cnkgZG9lcyBub3QgaGF2ZSBhIHBhcmVudC5cbiAqXG4gKiBFYWNoIGluc3RhbmNlIG9mIGEgcmVnaXN0cnkgKGluY2x1ZGluZyByb290KSBpcyBhIGhpZXJhcmNoeSBieSBpdHNlbGYsIGNvbXBvc2VkIG9mIDIgaW50ZXJuYWwgbGV2ZWxzLlxuICogVGhlIGZpcnN0IGxldmVsIChMMSBiZWxvdykgaXMgdXNlZCBmb3IgZml4ZWQgdGVtcGxhdGVzLCB0aGUgc2Vjb25kIGxldmVsIChMMiBiZWxvdykgaXMgdXNlZCBmb3IgZHluYW1pYyB0ZW1wbGF0ZXMuXG4gKlxuICogLSBSb290IFJlZ2lzdHJ5XG4gKiAgIC0gQ2hpbGQgUmVnaXN0cnlcbiAqICAgICAtIENoaWxkT2ZDaGlsZCBSZWdpc3RyeVxuICpcbiAqIEluIHRoZSBleGFtcGxlIGFib3ZlIHRoZXJlIGFyZSAzIHJlZ2lzdHJpZXM6IFJvb3QsIENoaWxkIGFuZCBDaGlsZE9mQ2hpbGQuXG4gKlxuICogV2hlbiBzZWFyY2hpbmcgZm9yIGEgdGVtcGxhdGUgaW4gYENoaWxkT2ZDaGlsZGAgaXQgd2lsbCBzZWFyY2ggaW4gdGhlIGZvbGxvd2luZyBvcmRlciAodG9wIHRvIGJvdHRvbSk6XG4gKiAgIC0gQ2hpbGRPZkNoaWxkXG4gKiAgIC0gQ2hpbGRcbiAqICAgLSBSb290XG4gKlxuICogSWYgYSByZWdpc3RyeSBkb2VzIG5vdCBjb250YWluIHRoZSB0ZW1wbGF0ZSB0aGUgc2VhcmNoIHdpbGwgbW92ZSB0byB0aGUgbmV4dCBvbmUuXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHJlYWRvbmx5IGNoYW5nZXM6IE9ic2VydmFibGU8UmVnaXN0cnlDaGFuZ2VkRXZlbnRbXT47XG4gIGdldCBwYXJlbnQoKTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UgfCB1bmRlZmluZWQgeyByZXR1cm4gdGhpcy5fcGFyZW50OyB9XG5cbiAgcHJvdGVjdGVkIHJvb3Q6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlICYgeyBidWZmZXJlZERhdGE/OiBSZWdpc3RyeUNoYW5nZWRFdmVudFtdIH07XG5cbiAgcHJvdGVjdGVkIF9tdWx0aTogeyBbSyBpbiBrZXlvZiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXBdOiBBcnJheTxQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXBbS10+IH0gPSB7fTtcbiAgcHJvdGVjdGVkIF9tdWx0aURlZmF1bHRzOiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXAgPSB7fTtcbiAgcHJvdGVjdGVkIF9zaW5nbGVzOiBQYmxOZ3JpZFNpbmdsZVJlZ2lzdHJ5TWFwID0ge307XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGNoYW5nZXMkOiBTdWJqZWN0PFJlZ2lzdHJ5Q2hhbmdlZEV2ZW50W10+O1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHByaXZhdGUgX3BhcmVudD86IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7XG4gICAgdGhpcy5jaGFuZ2VzJCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgdGhpcy5jaGFuZ2VzID0gdGhpcy5jaGFuZ2VzJC5hc09ic2VydmFibGUoKTtcbiAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICB0aGlzLl9wYXJlbnQuY2hhbmdlcy5waXBlKFVuUngodGhpcykpLnN1YnNjcmliZSh0aGlzLmNoYW5nZXMkKTtcbiAgICAgIHRoaXMucm9vdCA9IHRoaXMuX3BhcmVudC5yb290O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJvb3QgPSB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIGdldFJvb3QoKTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UgeyByZXR1cm4gdGhpcy5yb290OyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJlZ2lzdGVyZWQgdmFsdWUgZm9yIHRoZSBzaW5nbGUgYGtpbmRgLlxuICAgKiBJZiBub3QgZm91bmQgd2lsbCB0cnkgdG8gc2VhcmNoIHRoZSBwYXJlbnQuXG4gICAqL1xuICBnZXRTaW5nbGU8UCBleHRlbmRzIGtleW9mIFBibE5ncmlkU2luZ2xlUmVnaXN0cnlNYXA+KGtpbmQ6IFApOiBQYmxOZ3JpZFNpbmdsZVJlZ2lzdHJ5TWFwW1BdIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fc2luZ2xlc1traW5kXSB8fCAodGhpcy5fcGFyZW50ICYmIHRoaXMuX3BhcmVudC5nZXRTaW5nbGUoa2luZCkpO1xuICB9XG5cbiAgc2V0U2luZ2xlPFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFNpbmdsZVJlZ2lzdHJ5TWFwPihraW5kOiBQLCB2YWx1ZTogUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcFtQXSB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIGNvbnN0IHByZXZpb3VzID0gdGhpcy5nZXRTaW5nbGUoa2luZCk7XG4gICAgaWYgKHZhbHVlICE9PSBwcmV2aW91cykge1xuICAgICAgdGhpcy5fc2luZ2xlc1traW5kXSA9IHZhbHVlO1xuICAgICAgdGhpcy5lbWl0Q2hhbmdlcyh7IG9wOiB2YWx1ZSA/ICdhZGQnIDogJ3JlbW92ZScsIHR5cGU6IGtpbmQsIHZhbHVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByZWdpc3RlcmVkIGRlZmF1bHQgdmFsdWUgZm9yIHRoZSBtdWx0aSBga2luZGAuXG4gICAqIElmIG5vdCBmb3VuZCB3aWxsIHRyeSB0byBzZWFyY2ggdGhlIHBhcmVudC5cbiAgICovXG4gIGdldE11bHRpRGVmYXVsdDxQIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwPihraW5kOiBQKTogUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwW1BdIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fbXVsdGlEZWZhdWx0c1traW5kXSB8fCAodGhpcy5fcGFyZW50ICYmIHRoaXMuX3BhcmVudC5nZXRNdWx0aURlZmF1bHQoa2luZCkpO1xuICB9XG5cbiAgc2V0TXVsdGlEZWZhdWx0PFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXA+KGtpbmQ6IFAsIHZhbHVlOiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXBbUF0gfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2aW91cyA9IHRoaXMuZ2V0TXVsdGlEZWZhdWx0KGtpbmQpO1xuICAgIGlmICh2YWx1ZSAhPT0gcHJldmlvdXMpIHtcbiAgICAgIHRoaXMuX211bHRpRGVmYXVsdHNba2luZF0gPSB2YWx1ZTtcbiAgICAgIHRoaXMuZW1pdENoYW5nZXMoeyBvcDogdmFsdWUgPyAnYWRkJyA6ICdyZW1vdmUnLCB0eXBlOiBraW5kLCB2YWx1ZSB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcmVnaXN0ZXJlZCB2YWx1ZXMgZm9yIHRoZSBtdWx0aSBga2luZGAuXG4gICAqIElmIG5vdCBmb3VuZCBXSUxMIE5PVCBzZWFyY2ggdGhlIHBhcmVudC5cbiAgICovXG4gIGdldE11bHRpPFQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXA+KGtpbmQ6IFQpOiBBcnJheTxQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXBbVF0+IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fbXVsdGlba2luZF0gYXMgQXJyYXk8UGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwW1RdPjtcbiAgfVxuXG4gIGFkZE11bHRpPFQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXA+KGtpbmQ6IFQsIGNlbGxEZWY6IFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcFtUXSk6IHZvaWQge1xuICAgIGNvbnN0IG11bHRpID0gdGhpcy5nZXRNdWx0aShraW5kKSB8fCAodGhpcy5fbXVsdGlba2luZF0gPSBbXSk7XG4gICAgbXVsdGkucHVzaChjZWxsRGVmKTtcbiAgICBpZiAoY2VsbERlZi5uYW1lID09PSAnKicpIHtcbiAgICAgIHRoaXMuc2V0TXVsdGlEZWZhdWx0KGtpbmQsIGNlbGxEZWYpO1xuICAgIH1cbiAgICB0aGlzLmVtaXRDaGFuZ2VzKHsgb3A6ICdhZGQnLCB0eXBlOiBraW5kLCB2YWx1ZTogY2VsbERlZiB9KVxuICB9XG5cbiAgcmVtb3ZlTXVsdGk8VCBleHRlbmRzIGtleW9mIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcD4oa2luZDogVCwgY2VsbERlZjogUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwW1RdKTogdm9pZCB7XG4gICAgY29uc3QgbXVsdGkgPSB0aGlzLmdldE11bHRpKGtpbmQpO1xuICAgIGlmIChtdWx0aSkge1xuICAgICAgY29uc3QgaWR4ID0gbXVsdGkuaW5kZXhPZihjZWxsRGVmKTtcbiAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICBtdWx0aS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZW1pdENoYW5nZXMoeyBvcDogJ3JlbW92ZScsIHR5cGU6IGtpbmQsIHZhbHVlOiBjZWxsRGVmIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGUgb3ZlciBhbGwgbXVsdGktcmVnaXN0cnkgdmFsdWUgb2YgdGhlIHByb3ZpZGVkIGBraW5kYCBhc2NlbmRpbmcgb3JkZXIsIHN0YXJ0aW5nIGZyb20gdGhlIGxhc3QgYW5jZXN0b3IgKHRoaXMgcmVnaXN0cnkpIHVwIHRvXG4gICAqIHRoZSByb290IHBhcmVudC5cbiAgICpcbiAgICogRWFjaCB0aW1lIGEgY29sbGVjdGlvbiBmb3IgdGhlIGBraW5kYCBpcyBmb3VuZCB0aGUgaGFuZGxlciBpcyBpbnZva2VkIGFuZCB0aGVuIHJlcGVhdGluZyB0aGUgcHJvY2VzcyBvbiB0aGUgcGFyZW50LlxuICAgKiBJZiB0aGUgYGtpbmRgIGRvZXMgbm90IGV4aXN0IHRoZSBoYW5kbGVyIGlzIG5vdCBjYWxsZWQgbW92aW5nIG9uIHRvIHRoZSBuZXh0IHBhcmVudC5cbiAgICpcbiAgICogVG8gYmFpbCBvdXQgKHN0b3AgdGhlIHByb2Nlc3MgYW5kIGRvbid0IGl0ZXJhdGUgdG8gdGhlIG5leHQgcGFyZW50KSwgcmV0dXJuIHRydWUgZnJvbSB0aGUgaGFuZGxlci5cbiAgICpcbiAgICogQHJldHVybnMgVGhlIG51bWJlciBvZiB0aW1lcyB0aGF0IGhhbmRsZXIgd2FzIGludm9rZWQsIGkuZSAwIG1lYW5zIG5vIG1hdGNoZXMuXG4gICAqL1xuICBmb3JNdWx0aTxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwPihraW5kOiBULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiAoICh2YWx1ZXM6IEFycmF5PFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcFtUXT4pID0+IGJvb2xlYW4gfCB2b2lkKSk6IG51bWJlciB7XG4gICAgbGV0IHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSA9IHRoaXM7XG4gICAgbGV0IGhhc1NvbWUgPSAwO1xuICAgIHdoaWxlIChyZWdpc3RyeSkge1xuICAgICAgY29uc3QgdmFsdWVzID0gcmVnaXN0cnkuZ2V0TXVsdGkoa2luZCk7XG4gICAgICBpZiAodmFsdWVzKSB7XG4gICAgICAgIGhhc1NvbWUrKztcbiAgICAgICAgaWYgKGhhbmRsZXIodmFsdWVzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVnaXN0cnkgPSByZWdpc3RyeS5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBoYXNTb21lO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jaGFuZ2VzJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGF5IGFsbCBub3RpZmljYXRpb25zIHNlbnQgdGhyb3VnaCBgY2hhbmdlc2AgYW5kIGJ1ZmZlciB0aGVuIHVudGlsIG5leHQgY2FsbCB0byBgYnVmZmVyRW5kKClgLlxuICAgKiBXaGVuIGBidWZmZXJFbmQoKWAgaXMgY2FsbGVkIGl0IHdpbGwgZmx1c2ggYWxsIGNoYW5nZXMuXG4gICAqXG4gICAqID4gSXQncyBpbXBvcnRhbnQgdG8gbm90ZSB0aGF0IGJ1ZmZlcmluZyBkb2VzIG5vdCBmcmVlemUgdGhlIHJlZ2lzdHJ5LCBhZGRpbmcgYW5kIHJlbW92aW5nIHRlbXBsYXRlcyB3aWxsIGNoYW5nZSB0aGVcbiAgICogcmVnaXN0cnkgYW5kIHdpbGwgZWZmZWN0IHF1ZXJpZXMuIEJ1ZmZlcmluZyBibG9jayB0aGUgYGNoYW5nZXNgIGV2ZW50IHN0cmVhbSBhbmQgbm90aGluZyBtb3JlLlxuICAgKi9cbiAgYnVmZmVyU3RhcnQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJvb3QuYnVmZmVyZWREYXRhKSB7XG4gICAgICB0aGlzLnJvb3QuYnVmZmVyZWREYXRhID0gW107XG4gICAgfVxuICB9XG5cbiAgYnVmZmVyRW5kKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJvb3QuYnVmZmVyZWREYXRhKSB7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5yb290LmJ1ZmZlcmVkRGF0YTtcbiAgICAgIHRoaXMucm9vdC5idWZmZXJlZERhdGEgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmVtaXRDaGFuZ2VzKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZW1pdENoYW5nZXMoZXZlbnRzOiBSZWdpc3RyeUNoYW5nZWRFdmVudCB8IFJlZ2lzdHJ5Q2hhbmdlZEV2ZW50W10pOiB2b2lkIHtcbiAgICBjb25zdCBlID0gQXJyYXkuaXNBcnJheShldmVudHMpID8gZXZlbnRzIDogW2V2ZW50c107XG4gICAgaWYgKHRoaXMucm9vdC5idWZmZXJlZERhdGEpIHtcbiAgICAgIHRoaXMucm9vdC5idWZmZXJlZERhdGEucHVzaCguLi5lKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNoYW5nZXMkLm5leHQoZSk7XG4gICAgfVxuICB9XG59XG4iXX0=