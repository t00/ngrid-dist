/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/services/grid-registry.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { Injectable, Optional, SkipSelf, } from '@angular/core';
import { unrx } from '../utils';
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
export class PblNgridRegistryService {
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
            this._parent.changes.pipe(unrx(this)).subscribe(this.changes$);
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
        unrx.kill(this);
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
}
PblNgridRegistryService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
PblNgridRegistryService.ctorParameters = () => [
    { type: PblNgridRegistryService, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
/** @nocollapse */ PblNgridRegistryService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PblNgridRegistryService_Factory() { return new PblNgridRegistryService(i0.ɵɵinject(PblNgridRegistryService, 12)); }, token: PblNgridRegistryService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1yZWdpc3RyeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL3NlcnZpY2VzL2dyaWQtcmVnaXN0cnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUNMLFVBQVUsRUFDVixRQUFRLEVBQ1IsUUFBUSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7Ozs7O0FBZ0JoQywwQ0FJQzs7O0lBSEMsa0NBQXFCOztJQUNyQixvQ0FBdUU7O0lBQ3ZFLHFDQUFXOzs7Ozs7QUFNYiwrQ0FHQzs7O0lBRkMsMkNBQW9DOztJQUNwQyw4Q0FBMEM7Ozs7OztBQU01Qyw4Q0FRQzs7O0lBUEMsOENBQWlEOztJQUNqRCw2Q0FBMEM7O0lBQzFDLDhDQUFpRDs7SUFDakQsOENBQWlEOztJQUNqRCx3REFFbUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEJyRyxNQUFNLE9BQU8sdUJBQXVCOzs7O0lBYWxDLFlBQTRDLE9BQWlDO1FBQWpDLFlBQU8sR0FBUCxPQUFPLENBQTBCO1FBTm5FLFdBQU0sR0FBa0YsRUFBRSxDQUFDO1FBQzNGLG1CQUFjLEdBQTZCLEVBQUUsQ0FBQztRQUM5QyxhQUFRLEdBQThCLEVBQUUsQ0FBQztRQUtqRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzVDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFD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SUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZO1lBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztZQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sV0FBVyxDQUFDLE1BQXFEOztjQUNqRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNuRCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQ2xDO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2QjtJQUNILENBQUM7OztZQXBKRixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7O1lBY3NCLHVCQUF1Qix1QkFBaEUsUUFBUSxZQUFJLFFBQVE7Ozs7O0lBWGpDLDBDQUFxRDs7Ozs7SUFHckQsdUNBQW9GOzs7OztJQUVwRix5Q0FBcUc7Ozs7O0lBQ3JHLGlEQUF3RDs7Ozs7SUFDeEQsMkNBQW1EOzs7OztJQUVuRCwyQ0FBNkQ7Ozs7O0lBRWpELDBDQUFpRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIEluamVjdGFibGUsXG4gIE9wdGlvbmFsLFxuICBTa2lwU2VsZixcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgdW5yeCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7XG4gIFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRFZGl0b3JDZWxsRGVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZSxcblxuICBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeSxcbiAgUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5LFxuICBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LFxuICBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25SZWYsXG5cbiAgUGJsTmdyaWROb0RhdGFSZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkUGFnaW5hdG9yUmVmRGlyZWN0aXZlLFxufSBmcm9tICcuLi9kaXJlY3RpdmVzJztcblxuZXhwb3J0IGludGVyZmFjZSBSZWdpc3RyeUNoYW5nZWRFdmVudCB7XG4gIG9wOiAnYWRkJyB8ICdyZW1vdmUnO1xuICB0eXBlOiBrZXlvZiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXAgfCBrZXlvZiBQYmxOZ3JpZFNpbmdsZVJlZ2lzdHJ5TWFwO1xuICB2YWx1ZTogYW55O1xufVxuXG4vKipcbiAqIEEgbWFwIG9mIHZhbGlkIHNpbmdsZS1pdGVtIHZhbHVlIHRoYXQgY2FuIGJlIHJlZ2lzdGVyZWQsIGFuZCB0aGVpciB0eXBlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkU2luZ2xlUmVnaXN0cnlNYXAge1xuICBub0RhdGE/OiBQYmxOZ3JpZE5vRGF0YVJlZkRpcmVjdGl2ZTtcbiAgcGFnaW5hdG9yPzogUGJsTmdyaWRQYWdpbmF0b3JSZWZEaXJlY3RpdmU7XG59XG5cbi8qKlxuICogQSBtYXAgb2YgdmFsaWQgbXVsdGktaXRlbSB2YWx1ZSB0aGF0IGNhbiBiZSByZWdpc3RlcmVkLCBhbmQgdGhlaXIgdHlwZSAodGhlIHNpbmdsZSB0eXBlLCBpLmUuIFQgaW4gQXJyYXk8VD4pXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwIHtcbiAgaGVhZGVyQ2VsbD86IFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZTxhbnk+O1xuICB0YWJsZUNlbGw/OiBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmU8YW55PjtcbiAgZWRpdG9yQ2VsbD86IFBibE5ncmlkRWRpdG9yQ2VsbERlZkRpcmVjdGl2ZTxhbnk+O1xuICBmb290ZXJDZWxsPzogUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlPGFueT47XG4gIGRhdGFIZWFkZXJFeHRlbnNpb25zPzpcbiAgICAoUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnk8UGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgJ2RhdGFIZWFkZXJFeHRlbnNpb25zJz4gJiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25SZWYpXG4gICAgfCAoUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5PGFueSwgJ2RhdGFIZWFkZXJFeHRlbnNpb25zJz4gJiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25SZWYpO1xufVxuXG4vKipcbiAqIEEgUmVnaXN0cnkgZm9yIHRlbXBsYXRlcyBvZiB0YWJsZSBwYXJ0cy5cbiAqXG4gKiBUaGUgcmVnaXN0cnkgaXMgaGllcmFyY2hpY2FsLCB3aGVyZSBlYWNoIGluc3RhbmNlIG9mIGEgcmVnaXN0cnkgaGFzIGEgcGFyZW50IHdoaWNoIGFsbG93cyBjYXNjYWRpbmcgdGVtcGxhdGVzLlxuICogVGhlIGhpZXJhcmNoeSBpcyBtYW5nZWQgYnkgYW5ndWxhciBESS5cbiAqXG4gKiA+IFRoZSByb290IHJlZ2lzdHJ5IGRvZXMgbm90IGhhdmUgYSBwYXJlbnQuXG4gKlxuICogRWFjaCBpbnN0YW5jZSBvZiBhIHJlZ2lzdHJ5IChpbmNsdWRpbmcgcm9vdCkgaXMgYSBoaWVyYXJjaHkgYnkgaXRzZWxmLCBjb21wb3NlZCBvZiAyIGludGVybmFsIGxldmVscy5cbiAqIFRoZSBmaXJzdCBsZXZlbCAoTDEgYmVsb3cpIGlzIHVzZWQgZm9yIGZpeGVkIHRlbXBsYXRlcywgdGhlIHNlY29uZCBsZXZlbCAoTDIgYmVsb3cpIGlzIHVzZWQgZm9yIGR5bmFtaWMgdGVtcGxhdGVzLlxuICpcbiAqIC0gUm9vdCBSZWdpc3RyeVxuICogICAtIENoaWxkIFJlZ2lzdHJ5XG4gKiAgICAgLSBDaGlsZE9mQ2hpbGQgUmVnaXN0cnlcbiAqXG4gKiBJbiB0aGUgZXhhbXBsZSBhYm92ZSB0aGVyZSBhcmUgMyByZWdpc3RyaWVzOiBSb290LCBDaGlsZCBhbmQgQ2hpbGRPZkNoaWxkLlxuICpcbiAqIFdoZW4gc2VhcmNoaW5nIGZvciBhIHRlbXBsYXRlIGluIGBDaGlsZE9mQ2hpbGRgIGl0IHdpbGwgc2VhcmNoIGluIHRoZSBmb2xsb3dpbmcgb3JkZXIgKHRvcCB0byBib3R0b20pOlxuICogICAtIENoaWxkT2ZDaGlsZFxuICogICAtIENoaWxkXG4gKiAgIC0gUm9vdFxuICpcbiAqIElmIGEgcmVnaXN0cnkgZG9lcyBub3QgY29udGFpbiB0aGUgdGVtcGxhdGUgdGhlIHNlYXJjaCB3aWxsIG1vdmUgdG8gdGhlIG5leHQgb25lLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICByZWFkb25seSBjaGFuZ2VzOiBPYnNlcnZhYmxlPFJlZ2lzdHJ5Q2hhbmdlZEV2ZW50W10+O1xuICBnZXQgcGFyZW50KCk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlIHwgdW5kZWZpbmVkIHsgcmV0dXJuIHRoaXMuX3BhcmVudDsgfVxuXG4gIHByb3RlY3RlZCByb290OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSAmIHsgYnVmZmVyZWREYXRhPzogUmVnaXN0cnlDaGFuZ2VkRXZlbnRbXSB9O1xuXG4gIHByb3RlY3RlZCBfbXVsdGk6IHsgW0sgaW4ga2V5b2YgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwXTogQXJyYXk8UGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwW0tdPiB9ID0ge307XG4gIHByb3RlY3RlZCBfbXVsdGlEZWZhdWx0czogUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwID0ge307XG4gIHByb3RlY3RlZCBfc2luZ2xlczogUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcCA9IHt9O1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBjaGFuZ2VzJDogU3ViamVjdDxSZWdpc3RyeUNoYW5nZWRFdmVudFtdPjtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwcml2YXRlIF9wYXJlbnQ/OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkge1xuICAgIHRoaXMuY2hhbmdlcyQgPSBuZXcgU3ViamVjdCgpO1xuICAgIHRoaXMuY2hhbmdlcyA9IHRoaXMuY2hhbmdlcyQuYXNPYnNlcnZhYmxlKCk7XG4gICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgdGhpcy5fcGFyZW50LmNoYW5nZXMucGlwZSh1bnJ4KHRoaXMpKS5zdWJzY3JpYmUodGhpcy5jaGFuZ2VzJCk7XG4gICAgICB0aGlzLnJvb3QgPSB0aGlzLl9wYXJlbnQucm9vdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yb290ID0gdGhpcztcbiAgICB9XG4gIH1cblxuICBnZXRSb290KCk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlIHsgcmV0dXJuIHRoaXMucm9vdDsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByZWdpc3RlcmVkIHZhbHVlIGZvciB0aGUgc2luZ2xlIGBraW5kYC5cbiAgICogSWYgbm90IGZvdW5kIHdpbGwgdHJ5IHRvIHNlYXJjaCB0aGUgcGFyZW50LlxuICAgKi9cbiAgZ2V0U2luZ2xlPFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFNpbmdsZVJlZ2lzdHJ5TWFwPihraW5kOiBQKTogUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcFtQXSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3NpbmdsZXNba2luZF0gfHwgKHRoaXMuX3BhcmVudCAmJiB0aGlzLl9wYXJlbnQuZ2V0U2luZ2xlKGtpbmQpKTtcbiAgfVxuXG4gIHNldFNpbmdsZTxQIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcD4oa2luZDogUCwgdmFsdWU6IFBibE5ncmlkU2luZ2xlUmVnaXN0cnlNYXBbUF0gfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2aW91cyA9IHRoaXMuZ2V0U2luZ2xlKGtpbmQpO1xuICAgIGlmICh2YWx1ZSAhPT0gcHJldmlvdXMpIHtcbiAgICAgIHRoaXMuX3NpbmdsZXNba2luZF0gPSB2YWx1ZTtcbiAgICAgIHRoaXMuZW1pdENoYW5nZXMoeyBvcDogdmFsdWUgPyAnYWRkJyA6ICdyZW1vdmUnLCB0eXBlOiBraW5kLCB2YWx1ZSB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcmVnaXN0ZXJlZCBkZWZhdWx0IHZhbHVlIGZvciB0aGUgbXVsdGkgYGtpbmRgLlxuICAgKiBJZiBub3QgZm91bmQgd2lsbCB0cnkgdG8gc2VhcmNoIHRoZSBwYXJlbnQuXG4gICAqL1xuICBnZXRNdWx0aURlZmF1bHQ8UCBleHRlbmRzIGtleW9mIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcD4oa2luZDogUCk6IFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcFtQXSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX211bHRpRGVmYXVsdHNba2luZF0gfHwgKHRoaXMuX3BhcmVudCAmJiB0aGlzLl9wYXJlbnQuZ2V0TXVsdGlEZWZhdWx0KGtpbmQpKTtcbiAgfVxuXG4gIHNldE11bHRpRGVmYXVsdDxQIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwPihraW5kOiBQLCB2YWx1ZTogUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwW1BdIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgY29uc3QgcHJldmlvdXMgPSB0aGlzLmdldE11bHRpRGVmYXVsdChraW5kKTtcbiAgICBpZiAodmFsdWUgIT09IHByZXZpb3VzKSB7XG4gICAgICB0aGlzLl9tdWx0aURlZmF1bHRzW2tpbmRdID0gdmFsdWU7XG4gICAgICB0aGlzLmVtaXRDaGFuZ2VzKHsgb3A6IHZhbHVlID8gJ2FkZCcgOiAncmVtb3ZlJywgdHlwZToga2luZCwgdmFsdWUgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJlZ2lzdGVyZWQgdmFsdWVzIGZvciB0aGUgbXVsdGkgYGtpbmRgLlxuICAgKiBJZiBub3QgZm91bmQgV0lMTCBOT1Qgc2VhcmNoIHRoZSBwYXJlbnQuXG4gICAqL1xuICBnZXRNdWx0aTxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwPihraW5kOiBUKTogQXJyYXk8UGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwW1RdPiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX211bHRpW2tpbmRdIGFzIEFycmF5PFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcFtUXT47XG4gIH1cblxuICBhZGRNdWx0aTxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwPihraW5kOiBULCBjZWxsRGVmOiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXBbVF0pOiB2b2lkIHtcbiAgICBjb25zdCBtdWx0aSA9IHRoaXMuZ2V0TXVsdGkoa2luZCkgfHwgKHRoaXMuX211bHRpW2tpbmRdID0gW10pO1xuICAgIG11bHRpLnB1c2goY2VsbERlZik7XG4gICAgaWYgKGNlbGxEZWYubmFtZSA9PT0gJyonKSB7XG4gICAgICB0aGlzLnNldE11bHRpRGVmYXVsdChraW5kLCBjZWxsRGVmKTtcbiAgICB9XG4gICAgdGhpcy5lbWl0Q2hhbmdlcyh7IG9wOiAnYWRkJywgdHlwZToga2luZCwgdmFsdWU6IGNlbGxEZWYgfSlcbiAgfVxuXG4gIHJlbW92ZU11bHRpPFQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXA+KGtpbmQ6IFQsIGNlbGxEZWY6IFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcFtUXSk6IHZvaWQge1xuICAgIGNvbnN0IG11bHRpID0gdGhpcy5nZXRNdWx0aShraW5kKTtcbiAgICBpZiAobXVsdGkpIHtcbiAgICAgIGNvbnN0IGlkeCA9IG11bHRpLmluZGV4T2YoY2VsbERlZik7XG4gICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgbXVsdGkuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgICB0aGlzLmVtaXRDaGFuZ2VzKHsgb3A6ICdyZW1vdmUnLCB0eXBlOiBraW5kLCB2YWx1ZTogY2VsbERlZiB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYWxsIG11bHRpLXJlZ2lzdHJ5IHZhbHVlIG9mIHRoZSBwcm92aWRlZCBga2luZGAgYXNjZW5kaW5nIG9yZGVyLCBzdGFydGluZyBmcm9tIHRoZSBsYXN0IGFuY2VzdG9yICh0aGlzIHJlZ2lzdHJ5KSB1cCB0b1xuICAgKiB0aGUgcm9vdCBwYXJlbnQuXG4gICAqXG4gICAqIEVhY2ggdGltZSBhIGNvbGxlY3Rpb24gZm9yIHRoZSBga2luZGAgaXMgZm91bmQgdGhlIGhhbmRsZXIgaXMgaW52b2tlZCBhbmQgdGhlbiByZXBlYXRpbmcgdGhlIHByb2Nlc3Mgb24gdGhlIHBhcmVudC5cbiAgICogSWYgdGhlIGBraW5kYCBkb2VzIG5vdCBleGlzdCB0aGUgaGFuZGxlciBpcyBub3QgY2FsbGVkIG1vdmluZyBvbiB0byB0aGUgbmV4dCBwYXJlbnQuXG4gICAqXG4gICAqIFRvIGJhaWwgb3V0IChzdG9wIHRoZSBwcm9jZXNzIGFuZCBkb24ndCBpdGVyYXRlIHRvIHRoZSBuZXh0IHBhcmVudCksIHJldHVybiB0cnVlIGZyb20gdGhlIGhhbmRsZXIuXG4gICAqXG4gICAqIEByZXR1cm5zIFRoZSBudW1iZXIgb2YgdGltZXMgdGhhdCBoYW5kbGVyIHdhcyBpbnZva2VkLCBpLmUgMCBtZWFucyBubyBtYXRjaGVzLlxuICAgKi9cbiAgZm9yTXVsdGk8VCBleHRlbmRzIGtleW9mIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcD4oa2luZDogVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogKCAodmFsdWVzOiBBcnJheTxQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXBbVF0+KSA9PiBib29sZWFuIHwgdm9pZCkpOiBudW1iZXIge1xuICAgIGxldCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UgPSB0aGlzO1xuICAgIGxldCBoYXNTb21lID0gMDtcbiAgICB3aGlsZSAocmVnaXN0cnkpIHtcbiAgICAgIGNvbnN0IHZhbHVlcyA9IHJlZ2lzdHJ5LmdldE11bHRpKGtpbmQpO1xuICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICBoYXNTb21lKys7XG4gICAgICAgIGlmIChoYW5kbGVyKHZhbHVlcykgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlZ2lzdHJ5ID0gcmVnaXN0cnkucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gaGFzU29tZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2hhbmdlcyQuY29tcGxldGUoKTtcbiAgICB1bnJ4LmtpbGwodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogRGVsYXkgYWxsIG5vdGlmaWNhdGlvbnMgc2VudCB0aHJvdWdoIGBjaGFuZ2VzYCBhbmQgYnVmZmVyIHRoZW4gdW50aWwgbmV4dCBjYWxsIHRvIGBidWZmZXJFbmQoKWAuXG4gICAqIFdoZW4gYGJ1ZmZlckVuZCgpYCBpcyBjYWxsZWQgaXQgd2lsbCBmbHVzaCBhbGwgY2hhbmdlcy5cbiAgICpcbiAgICogPiBJdCdzIGltcG9ydGFudCB0byBub3RlIHRoYXQgYnVmZmVyaW5nIGRvZXMgbm90IGZyZWV6ZSB0aGUgcmVnaXN0cnksIGFkZGluZyBhbmQgcmVtb3ZpbmcgdGVtcGxhdGVzIHdpbGwgY2hhbmdlIHRoZVxuICAgKiByZWdpc3RyeSBhbmQgd2lsbCBlZmZlY3QgcXVlcmllcy4gQnVmZmVyaW5nIGJsb2NrIHRoZSBgY2hhbmdlc2AgZXZlbnQgc3RyZWFtIGFuZCBub3RoaW5nIG1vcmUuXG4gICAqL1xuICBidWZmZXJTdGFydCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucm9vdC5idWZmZXJlZERhdGEpIHtcbiAgICAgIHRoaXMucm9vdC5idWZmZXJlZERhdGEgPSBbXTtcbiAgICB9XG4gIH1cblxuICBidWZmZXJFbmQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucm9vdC5idWZmZXJlZERhdGEpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLnJvb3QuYnVmZmVyZWREYXRhO1xuICAgICAgdGhpcy5yb290LmJ1ZmZlcmVkRGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZW1pdENoYW5nZXMoZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBlbWl0Q2hhbmdlcyhldmVudHM6IFJlZ2lzdHJ5Q2hhbmdlZEV2ZW50IHwgUmVnaXN0cnlDaGFuZ2VkRXZlbnRbXSk6IHZvaWQge1xuICAgIGNvbnN0IGUgPSBBcnJheS5pc0FycmF5KGV2ZW50cykgPyBldmVudHMgOiBbZXZlbnRzXTtcbiAgICBpZiAodGhpcy5yb290LmJ1ZmZlcmVkRGF0YSkge1xuICAgICAgdGhpcy5yb290LmJ1ZmZlcmVkRGF0YS5wdXNoKC4uLmUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hhbmdlcyQubmV4dChlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==