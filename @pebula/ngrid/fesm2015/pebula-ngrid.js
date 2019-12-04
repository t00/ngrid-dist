import { ReplaySubject, Subject, combineLatest, of, isObservable, from, asapScheduler, BehaviorSubject, animationFrameScheduler, fromEventPattern, fromEvent, race, timer } from 'rxjs';
import { InjectionToken, Injectable, Optional, Inject, ɵɵdefineInjectable, ɵɵinject, isDevMode, SkipSelf, Directive, TemplateRef, ElementRef, Component, Input, Attribute, Injector, ViewContainerRef, ChangeDetectorRef, IterableDiffers, NgZone, forwardRef, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, ViewChildren, EventEmitter, Output, ANALYZE_FOR_ENTRY_COMPONENTS, NgModule, NgModuleRef, Self } from '@angular/core';
import { DataSource, CdkRowDef, CdkHeaderRowDef, CdkFooterRowDef, CDK_ROW_TEMPLATE, CdkRow, CdkColumnDef, CdkHeaderCell, CdkCell, CdkFooterCell, CdkTable, CDK_TABLE_TEMPLATE, CdkTableModule } from '@angular/cdk/table';
import { __decorate, __metadata } from 'tslib';
import ResizeObserver from 'resize-observer-polyfill';
import { map, filter as filter$1, debounceTime, switchMap, tap, observeOn, mapTo, skip, buffer, auditTime, take, startWith, pairwise, first, takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { UnRx, removeFromArray } from '@pebula/utils';
import { SelectionModel } from '@angular/cdk/collections';
import { moveItemInArray as moveItemInArray$1 } from '@angular/cdk/drag-drop';
import { DOCUMENT, CommonModule } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Directionality } from '@angular/cdk/bidi';
import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY, CdkVirtualScrollViewport, CdkScrollable, ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { ItemSizeAverager, AutoSizeVirtualScrollStrategy, ScrollingModule as ScrollingModule$1 } from '@angular/cdk-experimental/scrolling';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function PblNgridConfig() { }
if (false) {
    /** @type {?|undefined} */
    PblNgridConfig.prototype.table;
}
/** @type {?} */
const DEFAULT_TABLE_CONFIG = {
    showHeader: true,
    showFooter: false,
    noFiller: false,
};
/** @type {?} */
const PEB_NGRID_CONFIG = new InjectionToken('PEB_NGRID_CONFIG');
class PblNgridConfigService {
    /**
     * @param {?} _config
     */
    constructor(_config) {
        this.config = new Map();
        this.configNotify = new Map();
        if (_config) {
            for (const key of Object.keys(_config)) {
                ((/** @type {?} */ (this.config))).set(key, _config[key]);
            }
        }
        /** @type {?} */
        const gridConfig = this.config.get('table') || {};
        this.config.set('table', Object.assign({}, DEFAULT_TABLE_CONFIG, gridConfig));
    }
    /**
     * @param {?} section
     * @return {?}
     */
    has(section) {
        return this.config.has(section);
    }
    /**
     * @template T
     * @param {?} section
     * @param {?=} fallback
     * @return {?}
     */
    get(section, fallback) {
        return this.config.get(section) || fallback;
    }
    /**
     * @template T
     * @param {?} section
     * @param {?} value
     * @return {?}
     */
    set(section, value) {
        /** @type {?} */
        const prev = this.get(section);
        value = Object.assign({}, value);
        Object.freeze(value);
        this.config.set(section, value);
        this.notify(section, value, prev);
    }
    /**
     * @template T
     * @param {?} section
     * @return {?}
     */
    onUpdate(section) {
        return this.getGetNotifier(section);
    }
    /**
     * @private
     * @template T
     * @param {?} section
     * @return {?}
     */
    getGetNotifier(section) {
        /** @type {?} */
        let notifier = this.configNotify.get(section);
        if (!notifier) {
            this.configNotify.set(section, notifier = new ReplaySubject(1));
        }
        return notifier;
    }
    /**
     * @private
     * @template T
     * @param {?} section
     * @param {?} curr
     * @param {?} prev
     * @return {?}
     */
    notify(section, curr, prev) {
        this.getGetNotifier(section).next({ curr, prev });
    }
}
PblNgridConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
PblNgridConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [PEB_NGRID_CONFIG,] }] }
];
/** @nocollapse */ PblNgridConfigService.ngInjectableDef = ɵɵdefineInjectable({ factory: function PblNgridConfigService_Factory() { return new PblNgridConfigService(ɵɵinject(PEB_NGRID_CONFIG, 8)); }, token: PblNgridConfigService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridConfigService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    PblNgridConfigService.prototype.configNotify;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@internal
 * @type {?}
 */
const PLUGIN_STORE = new Map();
/**
 * @record
 * @template P
 */
function NgridPluginMetadata() { }
if (false) {
    /** @type {?} */
    NgridPluginMetadata.prototype.id;
    /** @type {?|undefined} */
    NgridPluginMetadata.prototype.factory;
    /** @type {?|undefined} */
    NgridPluginMetadata.prototype.runOnce;
}
/**
 * @param {?} metadata
 * @return {?}
 */
function NgridPlugin(metadata) {
    if (metadata.runOnce) {
        metadata.runOnce();
    }
    return (/**
     * @param {?} target
     * @return {?}
     */
    target => {
        PLUGIN_STORE.set(metadata.id, Object.assign({}, metadata, { target }));
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NGRID_PLUGIN_CONTEXT = new WeakMap();
/**
 * \@internal
 * @template T
 */
class PblNgridPluginContext {
    /**
     * @private
     */
    constructor() {
        this._events = new Subject();
        this.events = this._events.asObservable();
    }
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
    /**
     * @template T
     * @param {?} table
     * @param {?} injector
     * @param {?} extApi
     * @return {?}
     */
    static create(table, injector, extApi) {
        if (NGRID_PLUGIN_CONTEXT.has(table)) {
            throw new Error(`Table is already registered for extensions.`);
        }
        /** @type {?} */
        const instance = new PblNgridPluginContext();
        NGRID_PLUGIN_CONTEXT.set(table, instance);
        instance.grid = table;
        instance.injector = injector;
        instance.extApi = extApi;
        instance.controller = new PblNgridPluginController(instance);
        return instance;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    emitEvent(event) {
        this._events.next(event);
    }
    /**
     * @return {?}
     */
    destroy() {
        if (!NGRID_PLUGIN_CONTEXT.has(this.grid)) {
            throw new Error(`Table is not registered.`);
        }
        this._events.complete();
        NGRID_PLUGIN_CONTEXT.delete(this.grid);
    }
}
if (false) {
    /** @type {?} */
    PblNgridPluginContext.prototype.grid;
    /** @type {?} */
    PblNgridPluginContext.prototype.injector;
    /** @type {?} */
    PblNgridPluginContext.prototype.extApi;
    /** @type {?} */
    PblNgridPluginContext.prototype.controller;
    /** @type {?} */
    PblNgridPluginContext.prototype.events;
    /**
     * @type {?}
     * @private
     */
    PblNgridPluginContext.prototype._events;
}
/**
 * @template T
 */
class PblNgridPluginController {
    /**
     * @param {?} context
     */
    constructor(context) {
        this.context = context;
        this.plugins = new Map();
        this.grid = context.grid;
        this.extApi = context.extApi;
        this.events = context.events;
        PblNgridPluginController.created$.next({ table: this.grid, controller: this });
    }
    /**
     * @return {?}
     */
    get injector() { return this.context.injector; }
    /**
     * @template T
     * @param {?} grid
     * @return {?}
     */
    static find(grid) {
        /** @type {?} */
        const context = NGRID_PLUGIN_CONTEXT.get(grid);
        if (context) {
            return context.controller;
        }
    }
    /**
     * @template P
     * @param {?} name
     * @return {?}
     */
    hasPlugin(name) {
        return this.plugins.has(name);
    }
    /**
     * @template P
     * @param {?} name
     * @return {?}
     */
    getPlugin(name) {
        return (/** @type {?} */ (this.plugins.get(name)));
    }
    /**
     * Registers the `plugin` with the `name` with the `table`
     * @template P
     * @param {?} name
     * @param {?} plugin
     * @return {?}
     */
    setPlugin(name, plugin) {
        if (!PLUGIN_STORE.has(name)) {
            throw new Error(`Unknown plugin ${name}.`);
        }
        if (this.plugins.has(name)) {
            throw new Error(`Plugin ${name} is not registered for this table.`);
        }
        this.plugins.set(name, plugin);
        return (/**
         * @param {?} tbl
         * @return {?}
         */
        (tbl) => this.grid === tbl && this.plugins.delete(name));
    }
    /**
     * @template P
     * @param {?} name
     * @return {?}
     */
    createPlugin(name) {
        if (!PLUGIN_STORE.has(name)) {
            throw new Error(`Unknown plugin ${name}.`);
        }
        /** @type {?} */
        const metadata = PLUGIN_STORE.get(name);
        /** @type {?} */
        const methodName = metadata.factory;
        if (!methodName) {
            throw new Error(`Invalid plugin configuration for ${name}, no factory metadata.`);
        }
        else if (typeof metadata.target[methodName] !== 'function') {
            throw new Error(`Invalid plugin configuration for ${name}, factory metadata does not point to a function.`);
        }
        return metadata.target[methodName](this.grid, this.context.injector);
    }
}
PblNgridPluginController.created$ = new Subject();
PblNgridPluginController.created = PblNgridPluginController.created$.asObservable();
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridPluginController.created$;
    /** @type {?} */
    PblNgridPluginController.created;
    /** @type {?} */
    PblNgridPluginController.prototype.extApi;
    /** @type {?} */
    PblNgridPluginController.prototype.events;
    /**
     * @type {?}
     * @private
     */
    PblNgridPluginController.prototype.grid;
    /**
     * @type {?}
     * @private
     */
    PblNgridPluginController.prototype.plugins;
    /**
     * @type {?}
     * @private
     */
    PblNgridPluginController.prototype.context;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const EXT_API_TOKEN = new InjectionToken('PBL_NGRID_EXTERNAL_API');
/**
 * @record
 * @template T
 */
function PblNgridExtensionApi() { }
if (false) {
    /** @type {?} */
    PblNgridExtensionApi.prototype.grid;
    /** @type {?} */
    PblNgridExtensionApi.prototype.element;
    /** @type {?} */
    PblNgridExtensionApi.prototype.cdkTable;
    /** @type {?} */
    PblNgridExtensionApi.prototype.columnStore;
    /** @type {?} */
    PblNgridExtensionApi.prototype.contextApi;
    /** @type {?} */
    PblNgridExtensionApi.prototype.events;
    /** @type {?} */
    PblNgridExtensionApi.prototype.metaRowService;
    /**
     * @param {?} fn
     * @return {?}
     */
    PblNgridExtensionApi.prototype.onInit = function (fn) { };
    /**
     * @param {?} viewport
     * @return {?}
     */
    PblNgridExtensionApi.prototype.setViewport = function (viewport) { };
    /**
     * @return {?}
     */
    PblNgridExtensionApi.prototype.dynamicColumnWidthFactory = function () { };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @param {?} columns
 * @return {?}
 */
function createFilter(value, columns) {
    return value === undefined
        ? undefined
        : {
            columns,
            type: typeof value === 'function' ? 'predicate' : 'value',
            filter: value
        };
}
/**
 * @template T
 * @param {?} rawData
 * @param {?} filter
 * @return {?}
 */
function filter(rawData, filter) {
    if (!filter || !rawData || rawData.length === 0) {
        return rawData;
    }
    else {
        /** @type {?} */
        const cols = filter.columns;
        if (filter.type === 'predicate') {
            /** @type {?} */
            const value = (/** @type {?} */ (filter.filter));
            return rawData.filter((/**
             * @param {?} v
             * @return {?}
             */
            v => value(v, cols)));
        }
        else if (filter.type === 'value') {
            /** @type {?} */
            const value = typeof filter.filter.toLowerCase === 'function' ? filter.filter.toLowerCase() : filter.filter;
            return rawData.filter((/**
             * @param {?} row
             * @return {?}
             */
            row => cols.some((/**
             * @param {?} col
             * @return {?}
             */
            col => {
                /** @type {?} */
                const predicate = col.filter || genericColumnPredicate;
                return predicate(col.filter ? filter.filter : value, col.getValue(row), row, col);
            }))));
        }
    }
    return rawData;
}
/**
 * A generic column predicate that compares the inclusion (text) of the value in the column value.
 * @type {?}
 */
const genericColumnPredicate = (/**
 * @param {?} filterValue
 * @param {?} colValue
 * @param {?=} row
 * @param {?=} col
 * @return {?}
 */
(filterValue, colValue, row, col) => {
    return colValue && colValue.toString().toLowerCase().includes(filterValue);
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Apply sorting on a collection, based on column and sort definitions.
 * If the sort definition doesn't have a sorting function the default sorter is used.
 * @template T
 * @param {?} column
 * @param {?} sort
 * @param {?} data
 * @return {?}
 */
function applySort(column, sort, data) {
    if (!sort || !sort.order) {
        return data;
    }
    /** @type {?} */
    const sortFn = typeof sort.sortFn === 'function'
        ? sort.sortFn
        : typeof column.sort === 'function'
            ? column.sort
            : defaultSorter;
    return column && data
        ? sortFn(column, sort, data.slice())
        : data || [];
}
/**
 * @template T
 * @param {?} column
 * @param {?} sort
 * @param {?} data
 * @return {?}
 */
function defaultSorter(column, sort, data) {
    return data.sort((/**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    (a, b) => {
        /** @type {?} */
        let valueA = column.getValue(a);
        /** @type {?} */
        let valueB = column.getValue(b);
        valueA = isNaN(+valueA) ? valueA : +valueA;
        valueB = isNaN(+valueB) ? valueB : +valueB;
        return (valueA < valueB ? -1 : valueA === valueB ? 0 : 1) * (sort.order === 'asc' ? 1 : -1);
    }));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const EMPTY = Object.freeze({});
/** @type {?} */
const DEEP_COMPARATORS = {
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
function fromRefreshDataWrapper(change) {
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
function createChangeContainer(type, value, cache) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CUSTOM_BEHAVIOR_TRIGGER_KEYS = ['sort', 'filter', 'pagination'];
/** @type {?} */
const TRIGGER_KEYS = [...CUSTOM_BEHAVIOR_TRIGGER_KEYS, 'data'];
/** @type {?} */
const SOURCE_CHANGING_TOKEN = {};
const ɵ0 = EMPTY;
/** @type {?} */
const DEFAULT_INITIAL_CACHE_STATE = { filter: EMPTY, sort: EMPTY, pagination: {}, data: ɵ0 };
/**
 * An adapter that handles changes
 * @template T, TData
 */
class PblDataSourceAdapter {
    /**
     * A Data Source adapter contains flow logic for the datasource and subsequent emissions of datasource instances.
     * The logic is determined by the combination of the config object and the sourceFactory provided to this adapter, making this adapter actually a container.
     *
     * There are 4 triggers that are responsible for datasource emissions, when one of them is triggered it will invoke the `sourceFactory`
     * returning a new datasource, i.e. a new datasource emission.
     *
     * The triggers are: filter, sort, pagination and refresh.
     *
     * The refresh trigger does not effect the input sent to the `sourceFactory` function, it is just a mean to initiate a call to create a new
     * datasource without changing previous flow variables.
     * It's important to note that calling `sourceFactory` with the same input 2 or more times does not guarantee identical response. For example
     * calling a remote server that might change it's data between calls.
     *
     * All other triggers (3) will change the input sent to the `sourceFactory` function which will use them to return a datasource.
     *
     * The input sent to `sourceFactory` is the values that each of the 3 triggers yields, when one trigger changes a new value for it is sent
     * and the last values of the other 2 triggers is sent with it. i.e. the combination of the last known value for all 3 triggers is sent.
     *
     * To enable smart caching and data management `sourceFactory` does not get the raw values of each trigger. `sourceFactory` will get
     * an event object that contains metadata about each trigger, whether it triggered the change or not as well as old and new values.
     *
     * The returned value from `sourceFactory` is then used as the datasource, applying all triggers that are not overridden by the user.
     * The returned value of `sourceFactory` can be a `DataSourceOf` or `false`.
     *   - `DataSourceOf` means a valid datasource, either observable/promise of array or an array.
     *   - `false` means skip, returning false will instruct the adapter to skip execution for this trigger cycle.
     *
     * Using a trigger is a binary configuration option, when a trigger is turned on it means that changes to it will be passed to the `sourceFactory`.
     * When a trigger is turned off it is not listened to and `undefined` will be sent as a value for it to the `sourceFactory`.
     *
     * The adapter comes with built in flow logic for all 3 triggers, when a trigger is turned off the adapter will take the result of `sourceFactory` and
     * apply the default behavior to it.
     *
     * For all triggers, the default behavior means client implementation. For filtering, client side filtering. For sorting, client side sorting.
     * For Pagination, client side pagination.
     *
     * You can opt in to one or more triggers and implement your own behavior inside the `sourceFactory`
     * @param {?} sourceFactory - A function that returns the datasource based on flow instructions.
     * The instructions are optional, they might or might not exist depending on the configuration of the adapter.
     * When `sourceFactory` returns false the entire trigger cycle is skipped.
     * @param {?=} config - A configuration object describing how this adapter should behave.
     */
    constructor(sourceFactory, config) {
        this.sourceFactory = sourceFactory;
        this.config = Object.assign({}, config || {});
        this.initStreams();
    }
    /**
     * @return {?}
     */
    dispose() {
        this._refresh$.complete();
        this._onSourceChange$.complete();
    }
    /**
     * @param {?=} data
     * @return {?}
     */
    refresh(data) {
        this._refresh$.next({ data });
    }
    /**
     * Clears the cache from any existing datasource trigger such as filter, sort etc.
     * @template P
     * @param {?} cacheKey
     * @return {?} The cached value or null if not there.
     */
    clearCache(cacheKey) {
        if (cacheKey in this.cache) {
            /** @type {?} */
            const prev = this.cache[cacheKey];
            this.cache[cacheKey] = DEFAULT_INITIAL_CACHE_STATE[cacheKey];
            return prev;
        }
        else {
            return null;
        }
    }
    /**
     * @param {?} paginator
     * @return {?}
     */
    setPaginator(paginator) {
        this.paginator = paginator;
    }
    /**
     * @param {?} filter$
     * @param {?} sort$
     * @param {?} pagination$
     * @param {?=} initialState
     * @return {?}
     */
    updateProcessingLogic(filter$, sort$, pagination$, initialState = {}) {
        /** @type {?} */
        let updates = -1;
        /** @type {?} */
        const changedFilter = (/**
         * @param {?} e
         * @return {?}
         */
        e => updates === -1 || e.changed);
        /** @type {?} */
        const skipUpdate = (/**
         * @param {?} o
         * @return {?}
         */
        (o) => o.skipUpdate !== true);
        this._lastSource = undefined;
        this.cache = Object.assign({}, DEFAULT_INITIAL_CACHE_STATE, initialState);
        /** @type {?} */
        const combine = [
            filter$.pipe(map((/**
             * @param {?} value
             * @return {?}
             */
            value => createChangeContainer('filter', value, this.cache))), filter$1(changedFilter)),
            sort$.pipe(filter$1(skipUpdate), map((/**
             * @param {?} value
             * @return {?}
             */
            value => createChangeContainer('sort', value, this.cache))), filter$1(changedFilter)),
            pagination$.pipe(map((/**
             * @param {?} value
             * @return {?}
             */
            value => createChangeContainer('pagination', value, this.cache))), filter$1(changedFilter)),
            this._refresh$.pipe(map((/**
             * @param {?} value
             * @return {?}
             */
            value => fromRefreshDataWrapper(createChangeContainer('data', value, this.cache)))), filter$1(changedFilter)),
        ];
        /** @type {?} */
        const hasCustomBehavior = CUSTOM_BEHAVIOR_TRIGGER_KEYS.some((/**
         * @param {?} key
         * @return {?}
         */
        key => !!this.config[key]));
        return combineLatest(combine[0], combine[1], combine[2], combine[3])
            .pipe(
        // Defer to next loop cycle, until no more incoming.
        // We use an async schedular here (instead of asapSchedular) because we want to have the largest debounce window without compromising integrity
        // With an async schedular we know we will run after all micro-tasks but before "real" async operations.
        debounceTime(0), switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        ([filter, sort, pagination, data]) => {
            updates++; // if first, will be 0 now (starts from -1).
            // if first, will be 0 now (starts from -1).
            /** @type {?} */
            const event = {
                filter,
                sort,
                pagination,
                data,
                isInitial: updates === 0,
                updateTotalLength: (/**
                 * @param {?} totalLength
                 * @return {?}
                 */
                (totalLength) => {
                    if (this.paginator) {
                        this.paginator.total = totalLength;
                    }
                })
            };
            /** @type {?} */
            const runHandle = data.changed
                || (hasCustomBehavior && CUSTOM_BEHAVIOR_TRIGGER_KEYS.some((/**
                 * @param {?} k
                 * @return {?}
                 */
                k => !!this.config[k] && event[k].changed)));
            if (runHandle) {
                return this.runHandle(event).pipe(tap((/**
                 * @return {?}
                 */
                () => event.data.changed = true)), // if the user didn't return "false" from his handler, we infer data was changed!
                map((/**
                 * @param {?} data
                 * @return {?}
                 */
                data => ({ event, data }))));
            }
            else {
                return of({ event, data: this._lastSource });
            }
        })), map((/**
         * @param {?} response
         * @return {?}
         */
        response => {
            /** @type {?} */
            const config = this.config;
            /** @type {?} */
            const event = response.event;
            // mark which of the triggers has changes
            // The logic is based on the user's configuration and the incoming event
            /** @type {?} */
            const withChanges = {};
            for (const key of CUSTOM_BEHAVIOR_TRIGGER_KEYS) {
                if (!config[key] && (event.isInitial || event[key].changed)) {
                    withChanges[key] = true;
                }
            }
            // When data changed, apply some logic (caching, operational, etc...)
            if (event.data.changed) {
                // cache the data when it has changed.
                this._lastSource = response.data;
                if (config.sort) {
                    // When the user is sorting (i.e. server sorting), the last sort cached is always the last source we get from the user.
                    this._lastSortedSource = this._lastSource;
                }
                else {
                    // When user is NOT sorting (we sort locally) AND the data has changed we need to apply sorting on it
                    // this might already be true (if sorting was the trigger)...
                    withChanges.sort = true;
                    // because we sort and then filter, filtering updates are also triggered by sort updated
                    withChanges.filter = true;
                }
                if (config.filter) {
                    // When the user is filtering (i.e. server filtering), the last filter cached is always the last source we get from the user.
                    this._lastFilteredSource = this._lastSource;
                }
                else {
                    // When user is NOT filtering (we filter locally) AND the data has changed we need to apply filtering on it
                    // this might already be true (if filtering was the trigger)...
                    withChanges.filter = true;
                }
            }
            // When user is NOT applying pagination (we paginate locally) AND if we (sort OR filter) locally we also need to paginate locally
            if (!config.pagination && (withChanges.sort || withChanges.filter)) {
                withChanges.pagination = true;
            }
            // Now, apply: sort --> filter --> pagination     ( ORDER MATTERS!!! )
            if (withChanges.sort) {
                this._lastSortedSource = this.applySort(this._lastSource, event.sort.curr || event.sort.prev);
            }
            /** @type {?} */
            let data = this._lastSortedSource;
            // we check if filter was asked, but also if we have a filter we re-run
            // Only sorting is cached at this point filtering is always calculated
            if (withChanges.filter || (event.filter.curr && event.filter.curr.filter)) {
                data = this._lastFilteredSource = this.applyFilter(data, event.filter.curr || event.filter.prev);
            }
            if (withChanges.pagination) {
                data = this.applyPagination(data);
            }
            /** @type {?} */
            const clonedEvent = Object.assign({}, event);
            // We use `combineLatest` which caches pervious events, only new events are replaced.
            // We need to mark everything as NOT CHANGED, so subsequent calls will not have their changed flag set to true.
            //
            // We also clone the object so we can pass on the proper values.
            // We create shallow clones so complex objects (column in sort, user data in data) will not throw on circular.
            // For pagination we deep clone because it contains primitives and we need to also clone the internal change objects.
            for (const k of TRIGGER_KEYS) {
                clonedEvent[k] = k === 'pagination'
                    ? JSON.parse(JSON.stringify(event[k]))
                    : Object.assign({}, event[k]);
                event[k].changed = false;
            }
            event.pagination.page.changed = event.pagination.perPage.changed = false;
            return {
                event: clonedEvent,
                data,
                sorted: this._lastSortedSource,
                filtered: this._lastFilteredSource,
            };
        })));
    }
    /**
     * @protected
     * @param {?} data
     * @param {?} dataSourceFilter
     * @return {?}
     */
    applyFilter(data, dataSourceFilter) {
        data = filter(data, dataSourceFilter);
        if (!this.config.pagination) {
            this.resetPagination(data.length);
        }
        return data;
    }
    /**
     * @protected
     * @param {?} data
     * @param {?} event
     * @return {?}
     */
    applySort(data, event) {
        return applySort(event.column, event.sort, data);
    }
    /**
     * @protected
     * @param {?} data
     * @return {?}
     */
    applyPagination(data) {
        if (this.paginator) {
            // Set the rendered rows length to the virtual page size. Fill in the data provided
            // from the index start until the end index or pagination size, whichever is smaller.
            /** @type {?} */
            const range = this.paginator.range;
            return data.slice(range[0], range[1]);
        }
        return data;
    }
    /**
     * @protected
     * @param {?} totalLength
     * @return {?}
     */
    resetPagination(totalLength) {
        if (this.paginator) {
            this.paginator.total = totalLength;
            this.paginator.page = totalLength > 0 ? 1 : 0;
        }
    }
    /* Note:  Currently this is only used in the constructor.
                However, if called elsewhere (i.e. if we can re-init the adapter) we need to track all code that is using
                `onSourceChanged` and or `onSourceChanging` and make it support the replacement of the observable.
                Because the API is public it will probably won't work so the best solution might be to switch
                `onSourceChanged` and `onSourceChanging` to subjects that are alive always and emit them internally in this class. */
    /**
     * @private
     * @return {?}
     */
    initStreams() {
        this._onSourceChange$ = new Subject();
        this.onSourceChanged = this._onSourceChange$.pipe(filter$1((/**
         * @param {?} d
         * @return {?}
         */
        d => d !== SOURCE_CHANGING_TOKEN)));
        this.onSourceChanging = this._onSourceChange$.pipe(filter$1((/**
         * @param {?} d
         * @return {?}
         */
        d => d === SOURCE_CHANGING_TOKEN)));
        this._refresh$ = new Subject();
        this._lastSource = undefined;
    }
    /**
     * Execute the user-provided function that returns the data collection.
     * This method wraps each of the triggers with a container providing metadata for the trigger. (Old value, was changed? and new value if changed)
     * This is where all cache logic is managed (createChangeContainer).
     *
     * To build a data collection the information from all triggers is required, even if it was not changed.
     * When a trigger is fired with a new value the new value replaces the old value for the trigger and all other triggers will keep their old value.
     * Sending the triggers to the handlers is not enough, we also need to the handlers which of the trigger's have change so they can return
     * data without doing redundant work.
     * For example, fetching paginated data from the server requires a call whenever the pages changes but if the filtering is local for the current page
     * and the filter trigger is fired the handler needs to know that pagination did not change so it will not go and fetch data from the server.
     *
     * The handler can return several data structures, observable, promise, array or false.
     * This method will normalize the response into an observable and notify that the source changed (onSourceChanged).
     *
     * When the response is false that handler wants to skip this cycle, this means that onSourceChanged will not emit and
     * a dead-end observable is returned (observable that will never emit).
     * @private
     * @param {?} event
     * @return {?}
     */
    runHandle(event) {
        this._onSourceChange$.next(SOURCE_CHANGING_TOKEN);
        /** @type {?} */
        const result = this.sourceFactory(event);
        if (result === false) {
            return (/** @type {?} */ (of(false).pipe(filter$1((/**
             * @return {?}
             */
            () => false))))); // stop emissions if got false.
        }
        /** @type {?} */
        const obs = isObservable(result)
            ? result
            : Array.isArray(result)
                ? of(result)
                : from(result) // promise...
        ;
        return obs.pipe(
        // run as a micro-task
        observeOn(asapScheduler, 0), map((/**
         * @param {?} data
         * @return {?}
         */
        data => Array.isArray(data) ? data : [])), tap((/**
         * @param {?} data
         * @return {?}
         */
        data => this._onSourceChange$.next(data))));
    }
}
if (false) {
    /** @type {?} */
    PblDataSourceAdapter.prototype.onSourceChanged;
    /** @type {?} */
    PblDataSourceAdapter.prototype.onSourceChanging;
    /**
     * @type {?}
     * @protected
     */
    PblDataSourceAdapter.prototype.paginator;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceAdapter.prototype.config;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceAdapter.prototype.cache;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceAdapter.prototype._onSourceChange$;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceAdapter.prototype._refresh$;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceAdapter.prototype._lastSource;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceAdapter.prototype._lastSortedSource;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceAdapter.prototype._lastFilteredSource;
    /** @type {?} */
    PblDataSourceAdapter.prototype.sourceFactory;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An object with properties representing the change in the paginator.
 * Each property point to a tuple with 2 items.
 * The first item is the old value, the 2nd item is the new value.
 *
 * The properties that can change are page, perPage and total.
 * @record
 * @template T
 */
function PblPaginatorChangeEvent() { }
if (false) {
    /** @type {?|undefined} */
    PblPaginatorChangeEvent.prototype.page;
    /** @type {?|undefined} */
    PblPaginatorChangeEvent.prototype.perPage;
    /** @type {?|undefined} */
    PblPaginatorChangeEvent.prototype.total;
}
/**
 * @record
 * @template TPage
 */
function PblPaginator() { }
if (false) {
    /** @type {?} */
    PblPaginator.prototype.kind;
    /**
     * When true will assume that the datasource represents a single page.
     * This is common in server side pagination where pervious data is not cached and each pages is fetched and set as is, i.e. the datasource
     * represents a single page at a time.
     *
     * For example, consider a paginator with 10 items per page, pointing to page 4.
     * When `noCacheMode` is set to `true` the range is [30, 39]
     * When `noCacheMode` is set to `false` the range is [0, 9]
     * @type {?}
     */
    PblPaginator.prototype.noCacheMode;
    /** @type {?} */
    PblPaginator.prototype.perPage;
    /** @type {?} */
    PblPaginator.prototype.page;
    /** @type {?} */
    PblPaginator.prototype.total;
    /** @type {?} */
    PblPaginator.prototype.totalPages;
    /** @type {?} */
    PblPaginator.prototype.range;
    /** @type {?} */
    PblPaginator.prototype.onChange;
    /**
     * @return {?}
     */
    PblPaginator.prototype.reset = function () { };
    /**
     * @param {?} value
     * @return {?}
     */
    PblPaginator.prototype.canMove = function (value) { };
    /**
     * @return {?}
     */
    PblPaginator.prototype.hasNext = function () { };
    /**
     * @return {?}
     */
    PblPaginator.prototype.hasPrev = function () { };
    /**
     * @param {?} value
     * @return {?}
     */
    PblPaginator.prototype.move = function (value) { };
    /**
     * @return {?}
     */
    PblPaginator.prototype.nextPage = function () { };
    /**
     * @return {?}
     */
    PblPaginator.prototype.prevPage = function () { };
}
class PblTokenPaginator {
    constructor() {
        this.kind = 'token';
        this._perPage = 10;
        this._total = 0;
        this.onChange$ = new BehaviorSubject({ page: [null, null] });
        this.onChange = this.onChange$.asObservable();
        this.reset();
    }
    /**
     * @return {?}
     */
    get perPage() { return this._perPage; }
    /**
     * @param {?} value
     * @return {?}
     */
    set perPage(value) {
        if (value < 1) {
            throw new Error(`Invalid total size value ${value}`);
        }
        if (this._perPage !== value) {
            /** @type {?} */
            const changes = { perPage: [this._perPage, this._perPage = value] };
            this.emit(changes);
        }
    }
    /**
     * @return {?}
     */
    get page() { return this._page; }
    /**
     * @param {?} value
     * @return {?}
     */
    set page(value) {
        if (this._page !== value) {
            /** @type {?} */
            const idx = this._tokens.indexOf(value);
            if (idx === -1) {
                throw new Error(`Invalid page token ${value}`);
            }
            this._cursor = idx;
            /** @type {?} */
            const prev = this._page;
            this._page = value;
            this.emit({ page: [prev, value] });
        }
    }
    /**
     * @return {?}
     */
    get total() { return this._total; }
    /**
     * @param {?} value
     * @return {?}
     */
    set total(value) {
        /** @type {?} */
        const changes = { total: [this._total, this._total = value] };
        this.emit(changes);
    }
    /**
     * @return {?}
     */
    get totalPages() {
        return this._tokens.length;
    }
    /**
     * @return {?}
     */
    get range() {
        if (!this._range) {
            /** @type {?} */
            const start = (this._cursor) * this.perPage;
            /** @type {?} */
            const end = Math.min(this._total, start + this.perPage);
            this._range = this.noCacheMode
                ? [0, end - start]
                : [start, end];
        }
        return this._range;
    }
    /**
     * @return {?}
     */
    reset() {
        this._tokens = [null];
        this._cursor = 0;
        this._total = 0;
        this.page = null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    canMove(value) {
        return this._tokens.indexOf(value) > -1;
    }
    /**
     * @return {?}
     */
    hasNext() { return this._cursor < this._tokens.length - 1; }
    /**
     * @return {?}
     */
    hasPrev() { return this._cursor > 0; }
    /**
     * @param {?} value
     * @return {?}
     */
    move(value) { this.page = value; }
    /**
     * @return {?}
     */
    nextPage() { this.page = this._tokens[++this._cursor]; }
    /**
     * @return {?}
     */
    prevPage() { this.page = this._tokens[--this._cursor]; }
    /**
     * @param {?} value
     * @return {?}
     */
    addNext(value) {
        /** @type {?} */
        const nextPointer = this._cursor + 1;
        // if next pointer is not like what we got, set it and delete all after (invalidate them)
        if (this._tokens[nextPointer] !== value) {
            this._tokens[nextPointer] = value;
            this._tokens.splice(nextPointer + 1);
        }
    }
    /**
     * @private
     * @param {?} changes
     * @return {?}
     */
    emit(changes) {
        this._range = undefined;
        if (this.queuedChanges) {
            Object.assign(this.queuedChanges, changes);
        }
        else {
            this.queuedChanges = changes;
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.queuedChanges = undefined;
                this.onChange$.next(changes);
            }));
        }
    }
}
if (false) {
    /** @type {?} */
    PblTokenPaginator.prototype.kind;
    /** @type {?} */
    PblTokenPaginator.prototype.noCacheMode;
    /** @type {?} */
    PblTokenPaginator.prototype.onChange;
    /**
     * @type {?}
     * @protected
     */
    PblTokenPaginator.prototype.onChange$;
    /**
     * @type {?}
     * @protected
     */
    PblTokenPaginator.prototype.queuedChanges;
    /**
     * @type {?}
     * @protected
     */
    PblTokenPaginator.prototype._range;
    /**
     * @type {?}
     * @protected
     */
    PblTokenPaginator.prototype._perPage;
    /**
     * @type {?}
     * @protected
     */
    PblTokenPaginator.prototype._page;
    /**
     * @type {?}
     * @protected
     */
    PblTokenPaginator.prototype._total;
    /**
     * @type {?}
     * @protected
     */
    PblTokenPaginator.prototype._tokens;
    /**
     * @type {?}
     * @protected
     */
    PblTokenPaginator.prototype._cursor;
}
class PblPagingPaginator {
    constructor() {
        this.kind = 'pageNumber';
        this._total = 0;
        this._perPage = 10;
        this._page = 1;
        this._totalPages = 0;
        this.onChange$ = new BehaviorSubject({ page: [null, 1] });
        this.onChange = this.onChange$.asObservable();
    }
    /**
     * @return {?}
     */
    get perPage() { return this._perPage; }
    /**
     * @param {?} value
     * @return {?}
     */
    set perPage(value) {
        if (value < 1) {
            throw new Error(`Invalid total size value ${value}`);
        }
        if (this._perPage !== value) {
            /** @type {?} */
            const changes = { perPage: [this._perPage, this._perPage = value] };
            /** @type {?} */
            const prev = this._page;
            this.calcPages();
            if (prev !== this._page) {
                changes.page = [prev, this._page];
            }
            this.emit(changes);
        }
    }
    /**
     * Get / Set the current page
     * @return {?}
     */
    get page() { return this._page; }
    /**
     * @param {?} value
     * @return {?}
     */
    set page(value) {
        if (value < 0 || value > this._totalPages) {
            throw new Error(`Invalid page index ${value}`);
        }
        if (this._page !== value) {
            /** @type {?} */
            const prev = this._page;
            this._page = value;
            this.emit({ page: [prev, value] });
        }
    }
    /**
     * @return {?}
     */
    get total() { return this._total; }
    /**
     * @param {?} value
     * @return {?}
     */
    set total(value) {
        if (value < 0) {
            throw new Error(`Invalid total size value ${value}`);
        }
        if (this._total !== value) {
            /** @type {?} */
            const changes = { total: [this._total, this._total = value] };
            /** @type {?} */
            const prev = this._page;
            this.calcPages();
            if (prev !== this._page) {
                changes.page = [prev, this._page];
            }
            this.emit(changes);
        }
    }
    /**
     * The amount of pages in this paginator
     * @return {?}
     */
    get totalPages() {
        return this._totalPages;
    }
    /**
     * @return {?}
     */
    get range() {
        if (!this._range) {
            /** @type {?} */
            const start = (this.page - 1) * this.perPage;
            /** @type {?} */
            const end = Math.min(this._total, start + this.perPage);
            this._range = this.noCacheMode
                ? [0, end - start]
                : [start, end];
        }
        return this._range;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    canMove(value) {
        /** @type {?} */
        const p = this._page + value;
        return p >= 1 && p <= this.totalPages;
    }
    /**
     * @return {?}
     */
    hasNext() { return this.canMove(1); }
    /**
     * @return {?}
     */
    hasPrev() { return this.canMove(-1); }
    /**
     * @param {?} value
     * @return {?}
     */
    move(value) { this.page = this._page + value; }
    /**
     * @return {?}
     */
    nextPage() { this.move(1); }
    /**
     * @return {?}
     */
    prevPage() { this.move(-1); }
    /**
     * @return {?}
     */
    reset() {
        this.page = 1;
    }
    /**
     * Calculate the number of pages.
     * returns true if the current page has changed due to calculation. (current page \> new pages value)
     * @protected
     * @return {?}
     */
    calcPages() {
        this._totalPages = Math.ceil(this._total / this.perPage);
        if (this._totalPages > 0 && this._page > this._totalPages) {
            this.page = this._totalPages;
        }
    }
    /**
     * @private
     * @param {?} changes
     * @return {?}
     */
    emit(changes) {
        this._range = undefined;
        if (this.queuedChanges) {
            Object.assign(this.queuedChanges, changes);
        }
        else {
            this.queuedChanges = changes;
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.queuedChanges = undefined;
                this.onChange$.next(changes);
            }));
        }
    }
}
if (false) {
    /** @type {?} */
    PblPagingPaginator.prototype.kind;
    /** @type {?} */
    PblPagingPaginator.prototype.noCacheMode;
    /** @type {?} */
    PblPagingPaginator.prototype.onChange;
    /**
     * @type {?}
     * @protected
     */
    PblPagingPaginator.prototype.onChange$;
    /**
     * @type {?}
     * @private
     */
    PblPagingPaginator.prototype._total;
    /**
     * @type {?}
     * @private
     */
    PblPagingPaginator.prototype._perPage;
    /**
     * @type {?}
     * @private
     */
    PblPagingPaginator.prototype._page;
    /**
     * @type {?}
     * @private
     */
    PblPagingPaginator.prototype._totalPages;
    /**
     * @type {?}
     * @private
     */
    PblPagingPaginator.prototype._range;
    /**
     * @type {?}
     * @private
     */
    PblPagingPaginator.prototype.queuedChanges;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PROCESSING_SUBSCRIPTION_GROUP = {};
/**
 * @record
 */
function PblDataSourceOptions() { }
if (false) {
    /**
     * When set to True will not disconnect upon table disconnection, otherwise does.
     * @type {?|undefined}
     */
    PblDataSourceOptions.prototype.keepAlive;
    /**
     * Skip the first trigger emission.
     * Use this for late binding, usually with a call to refresh() on the data source.
     *
     * Note that only the internal trigger call is skipped, a custom calls to refresh will go through
     * @type {?|undefined}
     */
    PblDataSourceOptions.prototype.skipInitial;
}
/**
 * @template T, TData
 */
class PblDataSource extends DataSource {
    /**
     * @param {?} adapter
     * @param {?=} options
     */
    constructor(adapter, options) {
        super();
        this._selection = new SelectionModel(true, []);
        this._tableConnectionChange$ = new Subject();
        this._onRenderDataChanging = new Subject();
        this._renderData$ = new BehaviorSubject([]);
        this._filter$ = new BehaviorSubject(undefined);
        this._sort$ = new BehaviorSubject({ column: null, sort: null, skipUpdate: false });
        this._onError$ = new Subject();
        options = options || {};
        this.adapter = adapter;
        this.onSourceChanging = this._adapter.onSourceChanging;
        // emit source changed event every time adapter gets new data
        this.onSourceChanged = this.adapter.onSourceChanged
            .pipe(observeOn(asapScheduler, 0), // emit on the end of the current turn (micro-task) to ensure `onSourceChanged` emission in `_updateProcessingLogic` run's first.
        mapTo(undefined));
        this.onRenderDataChanging = this._onRenderDataChanging.asObservable();
        this.onRenderedDataChanged = this._renderData$.pipe(skip(1), mapTo(undefined));
        this.onError = this._onError$.asObservable();
        this.tableConnectionChange = this._tableConnectionChange$.asObservable();
        this.keepAlive = options.keepAlive || false;
        this.skipInitial = options.skipInitial || false;
        this.sortChange = this._sort$.asObservable();
    }
    /**
     * @return {?}
     */
    get pagination() { return this._pagination; }
    /**
     * @param {?} value
     * @return {?}
     */
    set pagination(value) {
        if (this._pagination !== value) {
            this._pagination = value;
            switch (value) {
                case 'pageNumber':
                    this._paginator = new PblPagingPaginator();
                    break;
                case 'token':
                    this._paginator = new PblTokenPaginator();
                    break;
                default:
                    this._paginator = undefined;
                    break;
            }
            if (this._adapter) {
                this._adapter.setPaginator(this._paginator);
            }
        }
    }
    /**
     * @return {?}
     */
    get adapter() { return this._adapter; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set adapter(value) {
        if (this._adapter !== value) {
            this._adapter = value;
            if (this.pagination) {
                this._adapter.setPaginator(this._paginator);
            }
        }
    }
    // TODO(1.0.0): remove
    /**
     * @deprecated BREAKING CHANGE: removed in 1.0.0 - Use renderedData instead.
     * @return {?}
     */
    get renderedRows() { return this._renderData$.value || []; }
    /**
     * Returns the starting index of the rendered data
     * @return {?}
     */
    get renderStart() { return this._lastRange ? this._lastRange.start : 0; }
    /**
     * @return {?}
     */
    get renderLength() { return this._renderData$.value.length; }
    /**
     * @return {?}
     */
    get renderedData() { return this._renderData$.value || []; }
    /**
     * The `source` with sorting applied.
     * Valid only when sorting is performed client-side.
     *
     * To get real-time notifications use `onRenderDataChanging`.
     * The sorted data is updated just before `onRenderDataChanging` fire.
     * @return {?}
     */
    get sortedData() { return (this._lastAdapterEvent && this._lastAdapterEvent.sorted) || []; }
    ;
    /**
     * The `source` with filtering applied.
     * Valid only when filtering is performed client-side.
     * If sorting is applied as well, the filtered results are also sorted.
     *
     * To get real-time notifications use `onRenderDataChanging`.
     * The filtered data is updated just before `onRenderDataChanging` fire.
     * @return {?}
     */
    get filteredData() { return (this._lastAdapterEvent && this._lastAdapterEvent.filtered) || []; }
    ;
    /**
     * @return {?}
     */
    get filter() { return this._filter$.value; }
    /**
     * @return {?}
     */
    get sort() { return this._sort$.value; }
    /**
     * @return {?}
     */
    get paginator() { return this._paginator; }
    /**
     * @return {?}
     */
    get length() { return this.source.length; }
    /**
     * @return {?}
     */
    get source() { return this._source || []; }
    /**
     * Represents selected items on the data source.
     * @return {?}
     */
    get selection() { return this._selection; }
    /**
     * A custom trigger that invokes a manual data source change with the provided data value in the `data` property at tht event.
     * @param {?=} data
     * @return {?}
     */
    refresh(data) {
        if (this._tableConnected) {
            this._adapter.refresh(data);
        }
        else {
            this._lastRefresh = data;
        }
    }
    /**
     * @param {?=} value
     * @param {?=} columns
     * @return {?}
     */
    setFilter(value, columns) {
        if (value && typeof value !== 'function' && (!columns || columns.length === 0)) {
            throw new Error('Invalid filter definitions, columns are mandatory when using a single value input.');
        }
        this._filter$.next(createFilter(value, columns || []));
    }
    /**
     * Refresh the filters result.
     *
     * Note that this should only be used when using a predicate function filter and not the simple value filter.
     * In general the filter is refreshed every time it is set and each time the data is updated so manually refreshing a value filter
     * has no impact.
     *
     * For custom predicate function filters this might be useful.
     *
     * @return {?}
     */
    syncFilter() {
        /** @type {?} */
        const currentFilter = this._adapter.clearCache('filter');
        if (currentFilter) {
            this.setFilter(currentFilter.filter, currentFilter.columns);
        }
    }
    /**
     * @param {?=} column
     * @param {?=} sort
     * @param {?=} skipUpdate
     * @return {?}
     */
    setSort(column, sort, skipUpdate = false) {
        if (!column || typeof column === 'boolean') {
            this._sort$.next({ column: null, sort: {}, skipUpdate: !!column });
        }
        else {
            this._sort$.next({ column, sort, skipUpdate });
        }
    }
    /**
     * @return {?}
     */
    dispose() {
        if (!this._disposed) {
            UnRx.kill(this);
            this._adapter.dispose();
            this._onRenderDataChanging.complete();
            this._renderData$.complete();
            this._filter$.complete();
            this._sort$.complete();
            this._onError$.complete();
            this._disposed = true;
        }
    }
    /**
     * @param {?} cv
     * @return {?}
     */
    disconnect(cv) {
        this._lastRefresh = undefined;
        this._tableConnectionChange$.next(this._tableConnected = false);
        if (this.keepAlive === false) {
            this.dispose();
        }
    }
    /**
     * @param {?} cv
     * @return {?}
     */
    connect(cv) {
        if (this._disposed) {
            throw new Error('PblDataSource is disposed. Use `keepAlive` if you move datasource between tables.');
        }
        this._tableConnected = true;
        this._updateProcessingLogic(cv);
        this._tableConnectionChange$.next(this._tableConnected);
        return this._renderData$;
    }
    /**
     * Move's an item (in the entire source) from one index to the other, pushing the item in the destination one item backwards.
     *
     * Note that if the rendered data is a subset of the entire source (i.e virtual scroll & range) the indices are considered
     * local to the rendered view and are translated to fit the entire source.
     *
     * Tp disable this behavior, set the `absolute` parameter to `true`
     * @param {?} fromIndex
     * @param {?} toIndex
     * @param {?=} absolute
     * @return {?}
     */
    moveItem(fromIndex, toIndex, absolute = false) {
        if (absolute !== true && this._lastRange) {
            fromIndex = this._lastRange.start + fromIndex;
            toIndex = this._lastRange.start + toIndex;
        }
        if (this.length > 0) {
            moveItemInArray$1(this._source, fromIndex, toIndex);
            /** @type {?} */
            const data = this._lastRange
                ? this._source.slice(this._lastRange.start, this._lastRange.end)
                : this._source;
            this._renderData$.next(data);
        }
    }
    /**
     * @private
     * @param {?} cv
     * @return {?}
     */
    _updateProcessingLogic(cv) {
        /** @type {?} */
        const initialState = { filter: this.filter, sort: this.sort };
        /** @type {?} */
        const paginator = this._paginator;
        if (paginator) {
            initialState.pagination = { page: paginator.page, perPage: paginator.perPage };
        }
        /** @type {?} */
        const stream = this._adapter.updateProcessingLogic(this._filter$, this._sort$, paginator ? paginator.onChange : of(undefined), initialState);
        UnRx.kill(this, PROCESSING_SUBSCRIPTION_GROUP);
        /** @type {?} */
        const trimToRange = (/**
         * @param {?} range
         * @param {?} data
         * @return {?}
         */
        (range, data) => data.slice(range.start, range.end));
        /** @type {?} */
        let skipViewChange;
        /** @type {?} */
        let lastEmittedSource;
        cv.viewChange
            .pipe(UnRx(this, PROCESSING_SUBSCRIPTION_GROUP))
            .subscribe((/**
         * @param {?} range
         * @return {?}
         */
        range => {
            if (this._lastRange && this._lastRange.start === range.start && this._lastRange.end === range.end) {
                return;
            }
            this._lastRange = range;
            if (!skipViewChange) {
                if (range && lastEmittedSource && lastEmittedSource.length) {
                    this._renderData$.next(trimToRange(this._lastRange, lastEmittedSource));
                }
            }
        }));
        stream
            .pipe(UnRx(this, PROCESSING_SUBSCRIPTION_GROUP), tap((/**
         * @param {?} result
         * @return {?}
         */
        result => {
            lastEmittedSource = result.data;
            skipViewChange = true;
            this._onRenderDataChanging.next(this._lastAdapterEvent = result);
        })))
            .subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ({ data }) => {
            if (this._lastRange && data && data.length) {
                data = trimToRange(this._lastRange, data);
            }
            this._renderData$.next(data);
            skipViewChange = false;
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => { this._onError$.next(error); }));
        this._adapter.onSourceChanged
            .pipe(UnRx(this, PROCESSING_SUBSCRIPTION_GROUP))
            .subscribe((/**
         * @param {?} source
         * @return {?}
         */
        source => this._source = source || []));
        if (this._lastRefresh !== undefined) {
            this._adapter.refresh(this._lastRefresh);
            this._lastRefresh = undefined;
        }
        else if (!this.skipInitial) {
            // _refresh$ is a Subject, we must emit once so combineLatest will work
            this.refresh();
        }
    }
}
if (false) {
    /**
     * An observable that emit events when an new incoming source is expected, before calling the trigger handler to get the new source.
     * This even is usually followed by the `onSourceChanged` event but not always. This is because the trigger handler
     * can cancel the operation (when it returns false) which means an `onSourceChanged` event will not fire.
     *
     * Emissions occur when the trigger handler is invoked and also when the trigger handler returned an observable and the observable emits.
     *
     * > Note that a micro-task delays is applied between the `onSourceChanging` subsequent `onSourceChanged` event (when emitted).
     * @type {?}
     */
    PblDataSource.prototype.onSourceChanging;
    /**
     * An observable that emit events when a new source has been received from the trigger handler but before any processing is applied.
     * Emissions occur when the trigger handler is invoked and also when the trigger handler returned an observable and the observable emits.
     *
     * Examples: Calling `refresh()`, filter / sort / pagination events.
     *
     * > Note that the `onSourceChanged` fired before the data is rendered ane before any client-side filter/sort/pagination are applied.
     * It only indicates that the source data-set is now updated and the grid is about to apply logic on the data-set and then render it.
     * @type {?}
     */
    PblDataSource.prototype.onSourceChanged;
    /**
     * An observable that emit events when new source has been received from the trigger handler and after it was processed.
     * Emissions will occur after `onSourceChanged` event has been fired.
     *
     * The main difference between `onSourceChanged` and `onRenderDataChanging` is local processing performed in the datasource.
     * These are usually client-side operations like filter/sort/pagination. If all of these events are handled manually (custom)
     * in the trigger handler then `onSourceChanged` and `onRenderDataChanging` have no difference.
     *
     * > Note that `onRenderDataChanging` and `onRenderedDataChanged` are not closely related as `onRenderedDataChanged` fires at
     * a much more rapid pace (virtual scroll). The name `onRenderDataChanging` might change in the future.
     * @type {?}
     */
    PblDataSource.prototype.onRenderDataChanging;
    /**
     * An observable that emit events when the grid is about to render data.
     * The rendered data is updated when the source changed or when the grid is in virtual scroll mode and the user is scrolling.
     *
     * Each emission reflects a change in the data that the grid is rendering.
     * @type {?}
     */
    PblDataSource.prototype.onRenderedDataChanged;
    /** @type {?} */
    PblDataSource.prototype.onError;
    /**
     * An event that fires when the connection state to a table has changed.
     * @type {?}
     */
    PblDataSource.prototype.tableConnectionChange;
    /** @type {?} */
    PblDataSource.prototype.sortChange;
    /**
     * When set to True will not disconnect upon table disconnection, otherwise unsubscribe from the
     * datasource when the table disconnects.
     * @type {?}
     */
    PblDataSource.prototype.keepAlive;
    /**
     * Skip the first trigger emission.
     * Use this for late binding, usually with a call to refresh() on the data source.
     *
     * Note that only the internal trigger call is skipped, a custom calls to refresh will go through
     * @type {?}
     */
    PblDataSource.prototype.skipInitial;
    /**
     * @type {?}
     * @protected
     */
    PblDataSource.prototype._selection;
    /**
     * @type {?}
     * @protected
     */
    PblDataSource.prototype._tableConnectionChange$;
    /**
     * @type {?}
     * @protected
     */
    PblDataSource.prototype._onRenderDataChanging;
    /**
     * @type {?}
     * @protected
     */
    PblDataSource.prototype._renderData$;
    /**
     * @type {?}
     * @protected
     */
    PblDataSource.prototype._filter$;
    /**
     * @type {?}
     * @protected
     */
    PblDataSource.prototype._sort$;
    /**
     * @type {?}
     * @protected
     */
    PblDataSource.prototype._onError$;
    /**
     * @type {?}
     * @protected
     */
    PblDataSource.prototype._paginator;
    /**
     * @type {?}
     * @private
     */
    PblDataSource.prototype._pagination;
    /**
     * @type {?}
     * @private
     */
    PblDataSource.prototype._adapter;
    /**
     * @type {?}
     * @private
     */
    PblDataSource.prototype._source;
    /**
     * @type {?}
     * @private
     */
    PblDataSource.prototype._disposed;
    /**
     * @type {?}
     * @private
     */
    PblDataSource.prototype._tableConnected;
    /**
     * @type {?}
     * @private
     */
    PblDataSource.prototype._lastRefresh;
    /**
     * @type {?}
     * @private
     */
    PblDataSource.prototype._lastRange;
    /**
     * @type {?}
     * @private
     */
    PblDataSource.prototype._lastAdapterEvent;
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template T
 */
function AdapterParams() { }
if (false) {
    /** @type {?|undefined} */
    AdapterParams.prototype.onTrigger;
    /** @type {?|undefined} */
    AdapterParams.prototype.customTriggers;
}
/**
 * @template T, TData
 */
class PblDataSourceFactory {
    constructor() {
        this._adapter = {};
        this._dsOptions = {};
    }
    /**
     * Set the main trigger handler.
     * The trigger handler is the core of the datasource, responsible for returning the data collection.
     *
     * By default the handler is triggered only when the datasource is required.
     * This can happened when:
     *   - The table connected to the datasource.
     *   - A manual call to `PblDataSource.refresh()` was invoked.
     *
     * There are additional triggers (filter/sort/pagination) which occur when their values change, e.g. when
     * a filter has change or when a page in the paginator was changed.
     *
     * By default, these triggers are handled automatically, resulting in a client-side behavior for each of them.
     * For example, a client side paginator will move to the next page based on an already existing data collection (no need to fetch from the server).
     *
     * To handle additional trigger you need to explicitly set them using `setCustomTriggers`.
     * @template THIS
     * @this {THIS}
     * @param {?} handler
     * @return {THIS}
     */
    onTrigger(handler) {
        (/** @type {?} */ (this))._adapter.onTrigger = handler;
        return (/** @type {?} */ (this));
    }
    /**
     * A list of triggers that will be handled by the trigger handler.
     * By default all triggers are handled by the adapter, resulting in a client-side filter/sort/pagiantion that works out of the box.
     * To implement server side filtering, sorting and/or pagination specify which should be handled by the on trigger handler.
     *
     * You can mix and match, e.g. support only paging from the server, or only paging and sorting, and leave filtering for the client side.
     * @template THIS
     * @this {THIS}
     * @param {...?} triggers
     * @return {THIS}
     */
    setCustomTriggers(...triggers) {
        if (triggers.length === 0) {
            (/** @type {?} */ (this))._adapter.customTriggers = false;
        }
        else {
            /** @type {?} */
            const customTriggers = (/** @type {?} */ (this))._adapter.customTriggers = {};
            for (const t of triggers) {
                customTriggers[t] = true;
            }
        }
        return (/** @type {?} */ (this));
    }
    /**
     * Skip the first trigger emission.
     * Use this for late binding, usually with a call to refresh() on the data source.
     *
     * Note that only the internal trigger call is skipped, a custom calls to refresh will go through
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    skipInitialTrigger() {
        (/** @type {?} */ (this))._dsOptions.skipInitial = true;
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    keepAlive() {
        (/** @type {?} */ (this))._dsOptions.keepAlive = true;
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} handler
     * @return {THIS}
     */
    onCreated(handler) {
        (/** @type {?} */ (this))._onCreated = handler;
        return (/** @type {?} */ (this));
    }
    /**
     * @return {?}
     */
    create() {
        /** @type {?} */
        const _adapter = this._adapter;
        /** @type {?} */
        const adapter = new PblDataSourceAdapter(_adapter.onTrigger, _adapter.customTriggers || false);
        /** @type {?} */
        const ds = new PblDataSource(adapter, this._dsOptions);
        if (this._onCreated) {
            this._onCreated(ds);
        }
        return ds;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblDataSourceFactory.prototype._adapter;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceFactory.prototype._dsOptions;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceFactory.prototype._onCreated;
}
/**
 * @template T, TData
 * @return {?}
 */
function createDS() {
    return new PblDataSourceFactory();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// https://stackoverflow.com/questions/49579094/typescript-conditional-types-filter-out-readonly-properties-pick-only-requir

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Given an object (item) and a path, returns the value at the path
 * @param {?} item
 * @param {?} col
 * @return {?}
 */
function deepPathGet(item, col) {
    if (col.path) {
        for (const p of col.path) {
            item = item[p];
            if (!item)
                return;
        }
    }
    return item[col.prop];
}
/**
 * Given an object (item) and a path, returns the value at the path
 * @param {?} item
 * @param {?} col
 * @param {?} value
 * @return {?}
 */
function deepPathSet(item, col, value) {
    if (col.path) {
        for (const p of col.path) {
            item = item[p];
            if (!item)
                return;
        }
    }
    item[col.prop] = value;
}
/**
 * Updates the column sizes of the columns provided based on the column definition metadata for each column.
 * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
 * @param {?} rowWidth
 * @param {?} tableColumns
 * @param {?} metaColumns
 * @return {?}
 */
function resetColumnWidths(rowWidth, tableColumns, metaColumns) {
    const { pct, px } = rowWidth.defaultColumnWidth;
    /** @type {?} */
    const defaultWidth = `calc(${pct}% - ${px}px)`;
    for (const c of tableColumns) {
        c.setDefaultWidth(defaultWidth);
        c.updateWidth();
    }
    for (const m of metaColumns) {
        for (const c of [m.header, m.footer]) {
            if (c) {
                c.updateWidth('');
            }
        }
        // We don't handle groups because they are handled by `PblNgridComponent.resizeRows()`
        // which set the width for each.
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
/**
 * @record
 */
function PblColumnTypeDefinitionDataMap() { }
/**
 * Optional value to be used by the template when rendering the cell.
 * Any value is allowed, including functions which allow complex scenarios, for example rendering a cell based on values from other cells.
 * @record
 */
function PblBaseColumnDefinition() { }
if (false) {
    /**
     * A Unique ID for the column.
     * The ID must be unique across all columns, regardless of the type.
     * Columns with identical ID will share result in identical template.
     *
     * For example, having a header column and a footer column with the same id will result in the same cell presentation for both.
     *
     * > The ID is mandatory. Some implementation might use other values to auto-generate it and some might require it explicitly.
     * This is what it is optional.
     * @type {?|undefined}
     */
    PblBaseColumnDefinition.prototype.id;
    /** @type {?|undefined} */
    PblBaseColumnDefinition.prototype.label;
    /**
     * The type of the values in this column.
     * This is an additional level for matching columns to templates, grouping templates for a type.
     * @type {?|undefined}
     */
    PblBaseColumnDefinition.prototype.type;
    /**
     * CSS class that get applied on the header and cell.
     * You can apply unique header/cell styles using the element name.
     * @type {?|undefined}
     */
    PblBaseColumnDefinition.prototype.css;
    /**
     * The width in px or % in the following format: ##% or ##px
     * Examples: '50%', '50px'
     * @type {?|undefined}
     */
    PblBaseColumnDefinition.prototype.width;
    /**
     * This minimum width in pixels
     * This is an absolute value, thus a number.
     * @type {?|undefined}
     */
    PblBaseColumnDefinition.prototype.minWidth;
    /**
     * This maximum width in pixels
     * This is an absolute value, thus a number.
     * @type {?|undefined}
     */
    PblBaseColumnDefinition.prototype.maxWidth;
    /**
     * A place to store things...
     * This must be an object, values are shadow-copied so persist data between multiple plugins.
     * @type {?|undefined}
     */
    PblBaseColumnDefinition.prototype.data;
}
/**
 * @record
 */
function PblMetaColumnDefinition() { }
if (false) {
    /**
     * A Unique ID for the column.
     * @type {?}
     */
    PblMetaColumnDefinition.prototype.id;
    /** @type {?} */
    PblMetaColumnDefinition.prototype.kind;
    /**
     * The index (zero based) of the header row this column is attached to, used for multi-header setup.
     * When not set (undefined) the index is considered the LAST index.
     * @type {?}
     */
    PblMetaColumnDefinition.prototype.rowIndex;
}
/**
 * @record
 */
function PblColumnGroupDefinition() { }
if (false) {
    /**
     * A Unique ID for the column.
     * Auto-generated from the property
     * @type {?|undefined}
     */
    PblColumnGroupDefinition.prototype.id;
    /**
     * The index (zero based) of the header row this header group column is attached to, used for multi-header setup.
     * @type {?}
     */
    PblColumnGroupDefinition.prototype.rowIndex;
    /**
     * The grid's column that is the first child column for this group.
     * @type {?}
     */
    PblColumnGroupDefinition.prototype.prop;
    /**
     * The total span of the group (excluding the first child - i.e. prop).
     * The span and prop are used to get the child columns of this group.
     * The span is not dynamic, once the columns are set they don't change.
     *
     * For example, if a we have a span of 2 and the column at the 2nd position is hidden it will still count as
     * being spanned although the UI will span only 1 column... (because the 2nd is hidden...)
     * @type {?}
     */
    PblColumnGroupDefinition.prototype.span;
}
/**
 * @record
 */
function PblColumnDefinition() { }
if (false) {
    /**
     * A Unique ID for the column.
     * Whe not set (recommend) it is auto-generated by concatenating the values of `prop` and ,
     * If you set this value manually, make sure it does not conflict with other columns!
     * @type {?|undefined}
     */
    PblColumnDefinition.prototype.id;
    /**
     * When set, defines this column as the primary index of the data-set with all values in this column being unique.
     * @type {?|undefined}
     */
    PblColumnDefinition.prototype.pIndex;
    /**
     * The property to display (from the row element)
     * You can use dot notation to display deep paths.
     * @type {?}
     */
    PblColumnDefinition.prototype.prop;
    /** @type {?|undefined} */
    PblColumnDefinition.prototype.headerType;
    /** @type {?|undefined} */
    PblColumnDefinition.prototype.footerType;
    /**
     * A path to a nested object, relative to the row element.
     * The grid will display `prop` from the object referenced by `path`.
     *
     * You can also use dot notation directly from `prop`.
     *
     * Example:
     * prop: "street"
     * path: [ "myInstance", "user", "address"
     *
     * is identical to:
     * prop: "myInstance.user.address.street"
     *
     * @type {?|undefined}
     */
    PblColumnDefinition.prototype.path;
    /** @type {?|undefined} */
    PblColumnDefinition.prototype.sort;
    /**
     * A custom predicate function to filter rows using the current column.
     *
     * Valid only when filtering by value.
     * See `PblDataSource.setFilter` for more information.
     * @type {?|undefined}
     */
    PblColumnDefinition.prototype.filter;
    /**
     * Indicates if the grid is editable or not.
     * Note that an editable also requires an edit template to qualify as editable, this flag alone is not enough.
     * @type {?|undefined}
     */
    PblColumnDefinition.prototype.editable;
    /** @type {?|undefined} */
    PblColumnDefinition.prototype.pin;
    /**
     * @deprecated BREAKING CHANGE 1.0.0 - Use `alias` instead.
     * @type {?|undefined}
     */
    PblColumnDefinition.prototype.sortAlias;
    /**
     * An alias used to identify the column.
     * Useful when the server provides sort/filter metadata that does not have a 1:1 match with the column names.
     * e.g. Deep path props, property name convention mismatch, etc...
     * @type {?|undefined}
     */
    PblColumnDefinition.prototype.alias;
    /**
     * Optional transformer that control the value output from the combination of a column and a row.
     * The value returned from this transformer will be returned from `PblColumn.getValue`
     * @type {?|undefined}
     */
    PblColumnDefinition.prototype.transform;
}
/**
 * @record
 */
function PblMetaRowDefinitions() { }
if (false) {
    /** @type {?|undefined} */
    PblMetaRowDefinitions.prototype.rowClassName;
    /** @type {?|undefined} */
    PblMetaRowDefinitions.prototype.type;
}
/**
 * Represent a list of meta column's that together form a META ROW.
 * In other words, this is the definition of a row, using it's building blocks - the columns.
 *
 * > A row in the grid represents a row in the datasource, A **meta row** does not, it can represent anything.
 * Meta rows are header, footer and header group.
 * @record
 * @template T
 */
function PblColumnSet() { }
if (false) {
    /** @type {?} */
    PblColumnSet.prototype.rowIndex;
    /** @type {?} */
    PblColumnSet.prototype.cols;
}
/**
 * Represent a complete column definition set for a grid. (table, header, footer and headerGroup columns).
 *
 * `PblNgridColumnDefinitionSet` contains POJO objects (simple JSON like objects) for each column type (`PblColumnDefinition`, `PblMetaColumnDefinition` and `PblColumnGroupDefinition`)
 * which are later used to create runtime instance for each column type (`PblColumn`, `PblMetaColumn` and `PblColumnGroup`)
 *
 * Because `PblNgridColumnDefinitionSet` contains POJO objects it can be serialized easily.
 * @record
 */
function PblNgridColumnDefinitionSet() { }
if (false) {
    /** @type {?} */
    PblNgridColumnDefinitionSet.prototype.table;
    /** @type {?} */
    PblNgridColumnDefinitionSet.prototype.header;
    /** @type {?} */
    PblNgridColumnDefinitionSet.prototype.footer;
    /** @type {?} */
    PblNgridColumnDefinitionSet.prototype.headerGroup;
}
/**
 * Represent a complete column set for a grid. (table, header, footer and headerGroup columns).
 *
 * `PblNgridColumnSet` contains runtime instances of for each column type (`PblColumn`, `PblMetaColumn` and `PblColumnGroup`)
 * which
 * @record
 */
function PblNgridColumnSet() { }
if (false) {
    /** @type {?} */
    PblNgridColumnSet.prototype.table;
    /** @type {?} */
    PblNgridColumnSet.prototype.header;
    /** @type {?} */
    PblNgridColumnSet.prototype.footer;
    /** @type {?} */
    PblNgridColumnSet.prototype.headerGroup;
    /** @type {?} */
    PblNgridColumnSet.prototype.groupStore;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const RE_PARSE_STYLE_LENGTH_UNIT = /((?:\d*\.)?\d+)(%|px)$/;
/**
 * @param {?} exp
 * @return {?}
 */
function parseStyleWidth(exp) {
    /** @type {?} */
    const match = RE_PARSE_STYLE_LENGTH_UNIT.exec(exp);
    if (match) {
        return { value: Number(match[1]), type: (/** @type {?} */ (match[2])) };
    }
}
/**
 * @template T
 * @param {?} def
 * @param {?} target
 * @return {?}
 */
function initDefinitions(def, target) {
    /** @type {?} */
    const copyKeys = ['id', 'label', 'css', 'minWidth', 'width', 'maxWidth', 'type'];
    copyKeys.forEach((/**
     * @param {?} k
     * @return {?}
     */
    k => k in def && (target[k] = def[k])));
    if (def.data) {
        target.data = Object.assign(target.data || {}, def.data);
    }
}
/**
 * @param {?} obj
 * @return {?}
 */
function isColumnDefinition(obj) {
    // TODO: Get rid of this duckt-type type matching. Accept solid instances in PblTable.columns instead of interfaces.
    return !!obj.prop && !obj.hasOwnProperty('span');
}
/**
 * @param {?} obj
 * @return {?}
 */
function isColumnGroupDefinition(obj) {
    // TODO: Get rid of this duckt-type type matching. Accept solid instances in PblTable.columns instead of interfaces.
    return !!obj.prop && obj.hasOwnProperty('span');
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PBL_NGRID_META_COLUMN_MARK = Symbol('PblMetaColumn');
/** @type {?} */
const CLONE_PROPERTIES = ['kind', 'rowIndex'];
/**
 * @param {?} def
 * @return {?}
 */
function isPblMetaColumn(def) {
    return def instanceof PblMetaColumn || (def && def[PBL_NGRID_META_COLUMN_MARK] === true);
}
class PblMetaColumn {
    /**
     * @param {?} def
     */
    constructor(def) {
        /**
         * A place to store things...
         * This must be an object, values are shadow-copied so persist data between multiple plugins.
         */
        this.data = {};
        this.defaultWidth = '';
        this[PBL_NGRID_META_COLUMN_MARK] = true;
        initDefinitions(def, this);
        for (const prop of CLONE_PROPERTIES) {
            if (prop in def) {
                this[(/** @type {?} */ (prop))] = def[prop];
            }
        }
        if (!isPblMetaColumn(def)) {
            if (typeof def.type === 'string') {
                this.type = (/** @type {?} */ ({ name: def.type }));
            }
        }
    }
    /**
     * The width in px or % in the following format: ##% or ##px
     * Examples: '50%', '50px'
     * @return {?}
     */
    get width() { return this._width; }
    /**
     * @param {?} value
     * @return {?}
     */
    set width(value) {
        if (value !== this._width) {
            this._parsedWidth = parseStyleWidth(this._width = value);
            /** @type {?} */
            const isFixedWidth = this._parsedWidth && this._parsedWidth.type === 'px';
            Object.defineProperty(this, 'isFixedWidth', { value: isFixedWidth, configurable: true });
        }
    }
    //#endregion PblMetaColumnDefinition
    /**
     * @return {?}
     */
    get parsedWidth() { return this._parsedWidth; }
    /**
     * The column def for this column.
     * @return {?}
     */
    get columnDef() { return this._columnDef; }
    /**
     * @param {?} name
     * @return {?}
     */
    static extendProperty(name) {
        if (CLONE_PROPERTIES.indexOf(name) === -1) {
            CLONE_PROPERTIES.push(name);
        }
    }
    /**
     * @param {?} columnDef
     * @return {?}
     */
    attach(columnDef) {
        this.detach();
        this._columnDef = columnDef;
        this.columnDef.updateWidth(this.width || this.defaultWidth, 'attach');
    }
    /**
     * @return {?}
     */
    detach() {
        this._columnDef = undefined;
    }
    /**
     * @param {?} fallbackDefault
     * @return {?}
     */
    updateWidth(fallbackDefault) {
        this.defaultWidth = fallbackDefault || '';
        if (this.columnDef) {
            this.columnDef.updateWidth(this.width || fallbackDefault, 'update');
        }
    }
}
if (false) {
    /**
     * A Unique ID for the column.
     * The ID must be unique across all columns, regardless of the type.
     * Columns with identical ID will share result in identical template.
     *
     * For example, having a header column and a footer column with the same id will result in the same cell presentation for both.
     * @type {?}
     */
    PblMetaColumn.prototype.id;
    /** @type {?} */
    PblMetaColumn.prototype.label;
    /**
     * The type of the values in this column.
     * This is an additional level for matching columns to templates, grouping templates for a type.
     * @type {?}
     */
    PblMetaColumn.prototype.type;
    /**
     * CSS class that get applied on the header and cell.
     * You can apply unique header/cell styles using the element name.
     * @type {?}
     */
    PblMetaColumn.prototype.css;
    /**
     * This minimum width in pixels
     * This is an absolute value, thus a number.
     * @type {?}
     */
    PblMetaColumn.prototype.minWidth;
    /**
     * This maximum width in pixels
     * This is an absolute value, thus a number.
     * @type {?}
     */
    PblMetaColumn.prototype.maxWidth;
    /**
     * A place to store things...
     * This must be an object, values are shadow-copied so persist data between multiple plugins.
     * @type {?}
     */
    PblMetaColumn.prototype.data;
    /** @type {?} */
    PblMetaColumn.prototype.kind;
    /**
     * The index (zero based) of the header row this column is attached to, used for multi-header setup.
     * When not set (undefined) the index is considered the LAST index.
     *
     * If you want to setup a multi header grid with 2 header rows, set this to 0 for the first header row and for the 2nd header
     * row do not set a rowIndex.
     * @type {?}
     */
    PblMetaColumn.prototype.rowIndex;
    /**
     * Used by pbl-ngrid to apply a custom header/footer cell template, or the default when not set.
     * \@internal
     * @type {?}
     */
    PblMetaColumn.prototype.template;
    /**
     * When true indicates that the width is set with type pixels.
     * \@internal
     * @type {?}
     */
    PblMetaColumn.prototype.isFixedWidth;
    /**
     * @type {?}
     * @private
     */
    PblMetaColumn.prototype._width;
    /**
     * @type {?}
     * @private
     */
    PblMetaColumn.prototype._parsedWidth;
    /**
     * @type {?}
     * @private
     */
    PblMetaColumn.prototype._columnDef;
    /**
     * @type {?}
     * @private
     */
    PblMetaColumn.prototype.defaultWidth;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PBL_NGRID_COLUMN_GROUP_MARK = Symbol('PblColumnGroup');
/** @type {?} */
const CLONE_PROPERTIES$1 = [];
/**
 * @param {?} def
 * @return {?}
 */
function isPblColumnGroup(def) {
    return def instanceof PblColumnGroup || (def && def[PBL_NGRID_COLUMN_GROUP_MARK] === true);
}
/**
 * @param {?} value
 * @return {?}
 */
function getId(value) {
    return typeof value === 'string' ? value : value.id;
}
class PblColumnGroupStore {
    constructor() {
        this.store = new Map();
        this._all = [];
    }
    /**
     * @return {?}
     */
    get all() { return this._all; }
    /**
     * Attach a column to a group.
     * @param {?} group
     * @param {?} column
     * @return {?}
     */
    attach(group, column) {
        /** @type {?} */
        const g = this._find(group);
        if (g) {
            g.activeColumns.add(getId(column));
            return true;
        }
        return false;
    }
    /**
     * Detach a column from a group.
     * @param {?} group
     * @param {?} column
     * @return {?}
     */
    detach(group, column) {
        /** @type {?} */
        const g = this._find(group);
        if (g) {
            return g.activeColumns.delete(getId(column));
        }
        return false;
    }
    /**
     * Returns a list of `PblColumnGroup` that does not have columns attached.
     * @return {?}
     */
    findGhosts() {
        return Array.from(this.store.values())
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        item => item.activeColumns.size === 0))
            .map((/**
         * @param {?} item
         * @return {?}
         */
        item => item.group));
    }
    /**
     * @param {?} group
     * @return {?}
     */
    add(group) {
        this.store.set(group.id, { group, activeColumns: new Set() });
        this.updateAll();
    }
    /**
     * @param {?} group
     * @return {?}
     */
    remove(group) {
        /** @type {?} */
        const g = this.find(group);
        if (g && this.store.delete(g.id)) {
            this.updateAll();
            return true;
        }
        return false;
    }
    /**
     * @param {?} group
     * @return {?}
     */
    find(group) {
        /** @type {?} */
        const g = this._find(group);
        if (g) {
            return g.group;
        }
    }
    /**
     * @return {?}
     */
    clone() {
        /** @type {?} */
        const c = new PblColumnGroupStore();
        c.store = new Map(this.store);
        c.updateAll();
        return c;
    }
    /**
     * @private
     * @param {?} group
     * @return {?}
     */
    _find(group) {
        return this.store.get(getId(group));
    }
    /**
     * @private
     * @return {?}
     */
    updateAll() {
        this._all = Array.from(this.store.values()).map((/**
         * @param {?} item
         * @return {?}
         */
        item => item.group));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblColumnGroupStore.prototype.store;
    /**
     * @type {?}
     * @private
     */
    PblColumnGroupStore.prototype._all;
}
class PblColumnGroup extends PblMetaColumn {
    /**
     * @param {?} def
     * @param {?} columns
     * @param {?=} placeholder
     */
    constructor(def, columns, placeholder = false) {
        super(isPblColumnGroup(def)
            ? def
            : Object.assign({ id: `group-${def.prop}-span-${def.span}-row-${def.rowIndex}`, kind: (/** @type {?} */ ('header')) }, ((/** @type {?} */ (def)))));
        this.placeholder = placeholder;
        this[PBL_NGRID_COLUMN_GROUP_MARK] = true;
        this.prop = def.prop;
        this.span = def.span;
        this.columns = columns;
        for (const c of columns) {
            c.markInGroup(this);
        }
        for (const prop of CLONE_PROPERTIES$1) {
            if (prop in def) {
                this[(/** @type {?} */ (prop))] = def[prop];
            }
        }
    }
    //#endregion PblColumnGroupDefinition
    /**
     * Returns the visible state of the column.
     * The column is visible if AT LEAST ONE child column is visible (i.e. not hidden)
     * @return {?}
     */
    get isVisible() {
        return this.columns.some((/**
         * @param {?} c
         * @return {?}
         */
        c => !c.hidden));
    }
    /**
     * @param {?} name
     * @return {?}
     */
    static extendProperty(name) {
        if (CLONE_PROPERTIES$1.indexOf(name) === -1) {
            CLONE_PROPERTIES$1.push(name);
        }
    }
    /**
     * @param {?=} columns
     * @return {?}
     */
    createSlave(columns = []) {
        /** @type {?} */
        const slave = new PblColumnGroup(this, columns);
        slave.id += '-slave' + Date.now();
        slave.slaveOf = this;
        slave.template = this.template;
        return slave;
    }
    /**
     * @param {?} newColumn
     * @return {?}
     */
    replace(newColumn) {
        const { id } = newColumn;
        /** @type {?} */
        const idx = this.columns.findIndex((/**
         * @param {?} c
         * @return {?}
         */
        c => c.id === id));
        if (idx > -1) {
            this.columns.splice(idx, 1, newColumn);
            return true;
        }
        return false;
    }
}
if (false) {
    /**
     * The grid's column that is the first child column for this group.
     * @type {?}
     */
    PblColumnGroup.prototype.prop;
    /**
     * The total span of the group (excluding the first child - i.e. prop).
     * The span and prop are used to get the child columns of this group.
     * The span is not dynamic, once the columns are set they don't change.
     *
     * For example, if a we have a span of 2 and the column at the 2nd position is hidden it will still count as
     * being spanned although the UI will span only 1 column... (because the 2nd is hidden...)
     * @type {?}
     */
    PblColumnGroup.prototype.span;
    /**
     * The column def for this column.
     * @type {?}
     */
    PblColumnGroup.prototype.columnDef;
    /**
     * When set, this column is a cloned column of an existing column caused by a split.
     * \@internal
     * @type {?}
     */
    PblColumnGroup.prototype.slaveOf;
    /**
     * \@internal
     * @type {?}
     */
    PblColumnGroup.prototype.columns;
    /** @type {?} */
    PblColumnGroup.prototype.placeholder;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PBL_NGRID_COLUMN_MARK = Symbol('PblColumn');
/** @type {?} */
const CLONE_PROPERTIES$2 = ['pIndex', 'transform', 'filter', 'sort', 'alias', 'headerType', 'footerType', 'pin'];
/**
 * @param {?} def
 * @return {?}
 */
function isPblColumn(def) {
    return def instanceof PblColumn || (def && def[PBL_NGRID_COLUMN_MARK] === true);
}
class PblColumn {
    /**
     * @param {?} def
     * @param {?=} groupStore
     */
    constructor(def, groupStore) {
        /**
         * A place to store things...
         * This must be an object, values are shadow-copied so persist data between multiple plugins.
         */
        this.data = {};
        this.defaultWidth = '';
        /**
         * Groups that this column belongs to.
         * WARNING: DO NOT ADD/REMOVE GROUPS DIRECTLY, USE markInGroup/markNotInGroup.
         */
        this._groups = new Set();
        this[PBL_NGRID_COLUMN_MARK] = true;
        if (isPblColumn(def)) {
            initDefinitions(def, this);
            this.prop = def.prop;
            this.path = def.path;
            this.orgProp = def.orgProp;
            this.groupStore = groupStore || def.groupStore;
            this._groups = new Set(def._groups);
            for (const id of Array.from(def._groups.values())) {
                /** @type {?} */
                const g = this.groupStore.find(id);
                if (g) {
                    this.markInGroup(g);
                    g.replace(this);
                }
            }
        }
        else {
            /** @type {?} */
            const path = def.path || def.prop.split('.');
            /** @type {?} */
            const prop = def.path ? def.prop : path.pop();
            def = Object.create(def);
            def.id = def.id || def.prop || def.label;
            def.label = 'label' in def ? def.label : prop;
            if (typeof def.type === 'string') {
                def.type = (/** @type {?} */ ({ name: def.type }));
            }
            if (typeof def.headerType === 'string') {
                def.headerType = (/** @type {?} */ ({ name: def.headerType }));
            }
            if (typeof def.footerType === 'string') {
                def.footerType = (/** @type {?} */ ({ name: def.footerType }));
            }
            initDefinitions(def, this);
            this.groupStore = groupStore || new PblColumnGroupStore();
            this.prop = prop;
            this.orgProp = def.prop;
            if (path.length) {
                this.path = path;
            }
        }
        for (const prop of CLONE_PROPERTIES$2) {
            if (prop in def) {
                this[(/** @type {?} */ (prop))] = def[prop];
            }
        }
    }
    /**
     * The width in px or % in the following format: ##% or ##px
     * Examples: '50%', '50px'
     * @return {?}
     */
    get width() { return this._width; }
    /**
     * @param {?} value
     * @return {?}
     */
    set width(value) {
        if (value !== this._width) {
            this._parsedWidth = parseStyleWidth(this._width = value);
            /** @type {?} */
            const isFixedWidth = this._parsedWidth && this._parsedWidth.type === 'px';
            Object.defineProperty(this, 'isFixedWidth', { value: isFixedWidth, configurable: true });
        }
    }
    /**
     * @return {?}
     */
    get parsedWidth() { return this._parsedWidth; }
    // TODO(1.0.0): remove
    /**
     * @deprecated BREAKING CHANGE 1.0.0 - Use `alias` instead.
     * @return {?}
     */
    get sortAlias() { return this.alias; }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortAlias(value) { this.alias = value; }
    /**
     * The column def for this column.
     * @return {?}
     */
    get columnDef() { return this._columnDef; }
    /**
     * @return {?}
     */
    get groups() { return Array.from(this._groups.values()); }
    /**
     * @param {?} name
     * @return {?}
     */
    static extendProperty(name) {
        if (CLONE_PROPERTIES$2.indexOf(name) === -1) {
            CLONE_PROPERTIES$2.push(name);
        }
    }
    /**
     * @param {?} columnDef
     * @return {?}
     */
    attach(columnDef) {
        this.detach();
        this._columnDef = columnDef;
        if (this.defaultWidth) {
            this.columnDef.updateWidth(this.width || this.defaultWidth, 'attach');
        }
    }
    /**
     * @return {?}
     */
    detach() {
        this._columnDef = undefined;
    }
    /**
     * @param {?} defaultWidth
     * @return {?}
     */
    setDefaultWidth(defaultWidth) {
        this.defaultWidth = defaultWidth;
    }
    /**
     * @param {?=} width
     * @return {?}
     */
    updateWidth(width) {
        if (width) {
            this.width = width;
        }
        const { columnDef } = this;
        if (columnDef) {
            columnDef.updateWidth(this.width || this.defaultWidth || '', 'update');
        }
    }
    /**
     * Get the value this column points to in the provided row
     * @template T
     * @param {?} row
     * @return {?}
     */
    getValue(row) {
        if (this.transform) {
            return this.transform(deepPathGet(row, this), row, this);
        }
        return deepPathGet(row, this);
    }
    /**
     * Set a value in the provided row where this column points to
     * @param {?} row
     * @param {?} value
     * @return {?}
     */
    setValue(row, value) {
        return deepPathSet(row, this, value);
    }
    /**
     * Mark's that this column belong to the provided group.
     * \> Note that this internal to the column and does not effect the group in any way.
     * @param {?} g
     * @return {?}
     */
    markInGroup(g) {
        this.groupStore.attach(g, this);
        this._groups.add(g.id);
    }
    /**
     * Mark's that this column does not belong to the provided group.
     * \> Note that this internal to the column and does not effect the group in any way.
     * @param {?} g
     * @return {?}
     */
    markNotInGroup(g) {
        this.groupStore.detach(g, this);
        return this._groups.delete(g.id);
    }
    /**
     * @param {?} g
     * @return {?}
     */
    isInGroup(g) {
        return this._groups.has(g.id);
    }
    /**
     * @param {?} rowIndex
     * @return {?}
     */
    getGroupOfRow(rowIndex) {
        /** @type {?} */
        const groupIds = this.groups;
        for (const id of groupIds) {
            /** @type {?} */
            const g = this.groupStore.find(id);
            if (g && g.rowIndex === rowIndex) {
                return g;
            }
        }
    }
    /**
     * @param {?} columnGroups
     * @param {?} groupExists
     * @return {?}
     */
    groupLogic(columnGroups, groupExists) {
        const [gPrev, gCurr, gNext] = columnGroups;
        // STATE: This column has same group of previous column, nothing to do.
        if (gCurr === gPrev) {
            return gCurr;
        }
        // STATE: The group exists in one of the columns BUT NOT in the LAST COLUMN (i.e: Its a slave split)
        if (groupExists) {
            // If the previous sibling group is a slave and this group is the origin of the slave, convert this group to the slave.
            if (gPrev && gCurr === gPrev.slaveOf) {
                return gPrev;
            }
            if (gNext && gCurr === gNext.slaveOf) {
                return gNext;
            }
            // Otherwise create the slave.
            /** @type {?} */
            const g = gCurr.createSlave([this]);
            this.groupStore.add(g);
            // If the current group is a placeholder and either the previous OR next sibling group is a placeholder as well
            // we want to group them together, although they are not related, because they both have identical headers (empty header).
            // Note that we still create the salve, we just don't use it.
            if (gCurr.placeholder) {
                /** @type {?} */
                const prevPH = gPrev && gPrev.placeholder;
                /** @type {?} */
                const nextPH = gNext && gNext.slaveOf && gNext.placeholder;
                /** @type {?} */
                const groupWithPlaceholder = prevPH ? gPrev : nextPH ? gNext : undefined;
                // const groupWithPlaceholder = prevPH && gPrev;
                if (groupWithPlaceholder) {
                    return groupWithPlaceholder;
                }
            }
            return g;
        }
        // STATE: The group IS a slave and it is set AFTER an item that belongs to the group it is slave of.
        else if (gCurr.slaveOf && gPrev) {
            if (gCurr.slaveOf === gPrev) {
                return gCurr.slaveOf;
            }
            if (gCurr.slaveOf === gPrev.slaveOf) {
                return gPrev;
            }
        }
        // STATE: The group IS a slave and it is set BEFORE an item that belongs to the group it is slave of.
        else if (gCurr.slaveOf && gNext) {
            if (gCurr.slaveOf === gNext) {
                return gCurr.slaveOf;
            }
        }
        return gCurr;
    }
    /**
     * Calculates if the column width is locked by a maximum by checking if the given width is equal to the max width.
     * If the result of the calculation (true/false) does not equal the previous lock state it will set the new lock state
     * and return true.
     * Otherwise return false.
     * \@internal
     * @param {?} actualWidth
     * @return {?}
     */
    checkMaxWidthLock(actualWidth) {
        if (actualWidth === this.maxWidth) {
            if (!this.maxWidthLock) {
                this.maxWidthLock = true;
                return true;
            }
        }
        else if (this.maxWidthLock) {
            this.maxWidthLock = false;
            return true;
        }
        return false;
    }
}
if (false) {
    /** @type {?} */
    PblColumn.prototype.id;
    /**
     * When set, defines this column as the primary index of the data-set with all values in this column being unique.
     * @type {?}
     */
    PblColumn.prototype.pIndex;
    /** @type {?} */
    PblColumn.prototype.label;
    /**
     * CSS class that get applied on the header and cell.
     * You can apply unique header/cell styles using the element name.
     * @type {?}
     */
    PblColumn.prototype.css;
    /**
     * This minimum width in pixels
     * This is an absolute value, thus a number.
     * @type {?}
     */
    PblColumn.prototype.minWidth;
    /**
     * This maximum width in pixels
     * This is an absolute value, thus a number.
     * @type {?}
     */
    PblColumn.prototype.maxWidth;
    /**
     * A place to store things...
     * This must be an object, values are shadow-copied so persist data between multiple plugins.
     * @type {?}
     */
    PblColumn.prototype.data;
    /**
     * The property to display (from the row element)
     * You can use dot notation to display deep paths.
     * @type {?}
     */
    PblColumn.prototype.prop;
    /**
     * A path to a nested object, relative to the row element.
     * The table will display `prop` from the object referenced by `path`.
     *
     * You can also use dot notation directly from `prop`.
     *
     * Example:
     * prop: "street"
     * path: [ "myInstance", "user", "address"
     *
     * is identical to:
     * prop: "myInstance.user.address.street"
     *
     * @type {?}
     */
    PblColumn.prototype.path;
    /**
     * The type of the values in this column.
     * This is an additional level for matching columns to templates, grouping templates for a type.
     * @type {?}
     */
    PblColumn.prototype.type;
    /** @type {?} */
    PblColumn.prototype.headerType;
    /** @type {?} */
    PblColumn.prototype.footerType;
    /** @type {?} */
    PblColumn.prototype.sort;
    /**
     * A custom predicate function to filter rows using the current column.
     *
     * Valid only when filtering by value.
     * See `PblDataSource.setFilter` for more information.
     * @type {?}
     */
    PblColumn.prototype.filter;
    /**
     * Marks the table as editable. An editable column also requires an edit template to qualify as editable, this flag alone is not enough.
     *
     * Note that this flag only effect the CSS class added to the cell.
     * @type {?}
     */
    PblColumn.prototype.editable;
    /** @type {?} */
    PblColumn.prototype.pin;
    /**
     * An alias used to identify the column.
     * Useful when the server provides sort/filter metadata that does not have a 1:1 match with the column names.
     * e.g. Deep path props, property name convention mismatch, etc...
     * @type {?}
     */
    PblColumn.prototype.alias;
    /**
     * Optional transformer that control the value output from the combination of a column and a row.
     * The value returned from this transformer will be returned from `PblColumn.getValue`
     * @type {?}
     */
    PblColumn.prototype.transform;
    /**
     * The original value of `prop`.
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.orgProp;
    /**
     * Used by pbl-ngrid to apply custom cell template, or the default when not set.
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.cellTpl;
    /**
     * Used by pbl-ngrid to apply custom cell template, or the default when not set.
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.editorTpl;
    /**
     * Used by pbl-ngrid to apply a custom header cell template, or the default when not set.
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.headerCellTpl;
    /**
     * Used by pbl-ngrid to apply a custom footer cell template, or the default when not set.
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.footerCellTpl;
    /**
     * Used by the library as a logical flag representing the column hidden state.
     * This flag does not effect the UI, changing it will not change he hidden state in the UI.
     * Do not set this value manually.
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.hidden;
    /**
     * When true indicates that the width is set with type pixels.
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.isFixedWidth;
    /**
     * An on-demand size info object, populated by `PblColumnSizeObserver`
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.sizeInfo;
    /**
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.maxWidthLock;
    /**
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.groupStore;
    /**
     * @type {?}
     * @private
     */
    PblColumn.prototype._width;
    /**
     * @type {?}
     * @private
     */
    PblColumn.prototype._parsedWidth;
    /**
     * @type {?}
     * @private
     */
    PblColumn.prototype._columnDef;
    /**
     * @type {?}
     * @private
     */
    PblColumn.prototype.defaultWidth;
    /**
     * Groups that this column belongs to.
     * WARNING: DO NOT ADD/REMOVE GROUPS DIRECTLY, USE markInGroup/markNotInGroup.
     * @type {?}
     * @private
     */
    PblColumn.prototype._groups;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PblColumnFactory {
    constructor() {
        this._raw = { table: { cols: [] }, header: [], footer: [], headerGroup: [] };
        this._defaults = {
            table: (/** @type {?} */ ({})),
            header: (/** @type {?} */ ({})),
            footer: (/** @type {?} */ ({})),
        };
        this._currentHeaderRow = 0;
        this._currentFooterRow = 0;
    }
    /**
     * @return {?}
     */
    get currentHeaderRow() { return this._currentHeaderRow; }
    /**
     * @return {?}
     */
    get currentFooterRow() { return this._currentFooterRow; }
    /**
     * @param {?} defs
     * @return {?}
     */
    static fromDefinitionSet(defs) {
        /** @type {?} */
        const f = new PblColumnFactory();
        Object.assign(f._raw, defs);
        return f;
    }
    /**
     * @return {?}
     */
    build() {
        const { _defaults, _raw } = this;
        /** @type {?} */
        const groupStore = new PblColumnGroupStore();
        /** @type {?} */
        const table = {
            header: _raw.table.header,
            footer: _raw.table.footer,
            cols: _raw.table.cols.map((/**
             * @param {?} d
             * @return {?}
             */
            d => new PblColumn(Object.assign({}, _defaults.table, d), groupStore))),
        };
        /** @type {?} */
        const header = _raw.header.map((/**
         * @param {?} h
         * @return {?}
         */
        h => ({
            rowIndex: h.rowIndex,
            rowClassName: h.rowClassName,
            type: h.type || 'fixed',
            cols: h.cols.map((/**
             * @param {?} c
             * @return {?}
             */
            c => new PblMetaColumn(Object.assign({}, _defaults.header, c)))),
        })));
        /** @type {?} */
        const footer = _raw.footer.map((/**
         * @param {?} f
         * @return {?}
         */
        f => ({
            rowIndex: f.rowIndex,
            rowClassName: f.rowClassName,
            type: f.type || 'fixed',
            cols: f.cols.map((/**
             * @param {?} c
             * @return {?}
             */
            c => new PblMetaColumn(Object.assign({}, _defaults.footer, c))))
        })));
        /** @type {?} */
        const headerGroup = _raw.headerGroup.map((/**
         * @param {?} hg
         * @return {?}
         */
        hg => ({
            rowIndex: hg.rowIndex,
            rowClassName: hg.rowClassName,
            type: hg.type || 'fixed',
            cols: this.buildHeaderGroups(hg.rowIndex, hg.cols, table.cols).map((/**
             * @param {?} g
             * @return {?}
             */
            g => {
                groupStore.add(g);
                return g;
            })),
        })));
        return {
            groupStore,
            table,
            header,
            footer,
            headerGroup,
        };
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} def
     * @param {?=} type
     * @return {THIS}
     */
    default(def, type = 'table') {
        (/** @type {?} */ (this))._defaults[type] = def;
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {...?} defs
     * @return {THIS}
     */
    table(...defs) {
        /** @type {?} */
        const rowOptions = ((/** @type {?} */ (defs[0]))).prop ? {} : (/** @type {?} */ (defs.shift()));
        const { header, footer } = rowOptions;
        Object.assign((/** @type {?} */ (this))._raw.table, { header, footer });
        (/** @type {?} */ (this))._raw.table.cols.push(...(/** @type {?} */ (defs)));
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {...?} defs
     * @return {THIS}
     */
    header(...defs) {
        /** @type {?} */
        const rowIndex = (/** @type {?} */ (this))._currentHeaderRow++;
        /** @type {?} */
        const rowOptions = (/** @type {?} */ (this)).processRowOptions(defs);
        /** @type {?} */
        const rowClassName = (/** @type {?} */ (this)).genRowClass(rowOptions, rowIndex);
        /** @type {?} */
        const headers = defs.map((/**
         * @param {?} d
         * @return {?}
         */
        (d) => {
            /** @type {?} */
            const def = {
                id: d.id,
                kind: 'header',
                rowIndex
            };
            return Object.assign(def, d);
        }));
        (/** @type {?} */ (this))._raw.header.push({
            rowIndex,
            rowClassName,
            cols: headers,
            type: (rowOptions && rowOptions.type) || 'fixed',
        });
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {...?} defs
     * @return {THIS}
     */
    footer(...defs) {
        /** @type {?} */
        const rowIndex = (/** @type {?} */ (this))._currentFooterRow++;
        /** @type {?} */
        const rowOptions = (/** @type {?} */ (this)).processRowOptions(defs);
        /** @type {?} */
        const rowClassName = (/** @type {?} */ (this)).genRowClass(rowOptions, rowIndex);
        /** @type {?} */
        const footers = defs.map((/**
         * @param {?} d
         * @return {?}
         */
        (d) => {
            /** @type {?} */
            const def = {
                id: d.id,
                kind: 'footer',
                rowIndex
            };
            return Object.assign(def, d);
        }));
        (/** @type {?} */ (this))._raw.footer.push({
            rowIndex,
            rowClassName,
            cols: footers,
            type: (rowOptions && rowOptions.type) || 'fixed',
        });
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {...?} defs
     * @return {THIS}
     */
    headerGroup(...defs) {
        /** @type {?} */
        const rowIndex = (/** @type {?} */ (this))._currentHeaderRow++;
        /** @type {?} */
        const rowOptions = (/** @type {?} */ (this)).processRowOptions(defs, 'prop');
        /** @type {?} */
        const rowClassName = (/** @type {?} */ (this)).genRowClass(rowOptions, rowIndex);
        /** @type {?} */
        const headerGroups = defs.map((/**
         * @param {?} d
         * @return {?}
         */
        d => Object.assign({ rowIndex }, d)));
        (/** @type {?} */ (this))._raw.headerGroup.push({
            rowIndex,
            rowClassName,
            cols: headerGroups,
            type: (rowOptions && rowOptions.type) || 'fixed',
        });
        return (/** @type {?} */ (this));
    }
    /**
     * @private
     * @param {?} defs
     * @param {?=} mustHaveProperty
     * @return {?}
     */
    processRowOptions(defs, mustHaveProperty = 'id') {
        return defs[0][mustHaveProperty] ? undefined : defs.shift();
    }
    /**
     * @private
     * @param {?} rowOptions
     * @param {?} fallbackRowIndex
     * @return {?}
     */
    genRowClass(rowOptions, fallbackRowIndex) {
        return (rowOptions && rowOptions.rowClassName) || `pbl-ngrid-row-index-${fallbackRowIndex.toString()}`;
    }
    /**
     * @private
     * @param {?} rowIndex
     * @param {?} headerGroupDefs
     * @param {?} table
     * @return {?}
     */
    buildHeaderGroups(rowIndex, headerGroupDefs, table) {
        /** @type {?} */
        const headerGroup = [];
        // Building of header group rows requires some work.
        // The user defined groups might not cover all columns, creating gaps between group columns so we need to add placeholder groups to cover these gaps.
        // Moreover, the user might not specify a `prop`, which we might need to complete.
        // We do that for each header group row.
        //
        // The end goal is to return a list of `PblColumnGroup` that span over the entire columns of the grid.
        //
        // The logic is as follows:
        // For each column in the grid, find a matching column group - a group pointing at the column by having the same `prop`
        // If found, check it's span and skip X amount of columns where X is the span.
        // If a span is not defined then treat it as a greedy group that spans over all columns ahead until the next column that has a matching group column.
        //
        // If a column does not have a matching group column, search for group columns without a `prop` specified and when found set their `prop` to the current
        // column so we will now use them as if it's a user provided group for this column...
        //
        // If no group columns exists (or left), we create an ad-hoc group column and we will now use them as if it's a user provided group for this column...
        //
        /** @type {?} */
        const tableDefs = table.slice();
        /** @type {?} */
        const defs = headerGroupDefs.slice();
        for (let i = 0, len = tableDefs.length; i < len; i++) {
            /** @type {?} */
            const orgProp = tableDefs[i].orgProp;
            /** @type {?} */
            const idx = defs.findIndex((/**
             * @param {?} d
             * @return {?}
             */
            d => d.prop === orgProp));
            /** @type {?} */
            const columnGroupDef = idx !== -1
                ? defs.splice(idx, 1)[0]
                : defs.find((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => !d.prop)) || { prop: orgProp, rowIndex, span: undefined };
            /** @type {?} */
            const placeholder = idx === -1 && !!columnGroupDef.prop;
            columnGroupDef.prop = orgProp;
            columnGroupDef.rowIndex = rowIndex;
            /** @type {?} */
            let take = columnGroupDef.span;
            if (!(take >= 0)) {
                take = 0;
                for (let z = i + 1; z < len; z++) {
                    if (defs.findIndex((/**
                     * @param {?} d
                     * @return {?}
                     */
                    d => d.prop === tableDefs[z].orgProp)) === -1) {
                        take++;
                    }
                    else {
                        break;
                    }
                }
            }
            columnGroupDef.span = take;
            /** @type {?} */
            const group = new PblColumnGroup(columnGroupDef, tableDefs.slice(i, i + take + 1), placeholder);
            headerGroup.push(group);
            i += take;
        }
        return headerGroup;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblColumnFactory.prototype._raw;
    /**
     * @type {?}
     * @private
     */
    PblColumnFactory.prototype._defaults;
    /**
     * @type {?}
     * @private
     */
    PblColumnFactory.prototype._currentHeaderRow;
    /**
     * @type {?}
     * @private
     */
    PblColumnFactory.prototype._currentFooterRow;
}
/**
 * @return {?}
 */
function columnFactory() {
    return new PblColumnFactory();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A column width object representing the relative column using a combination of percentage and pixels.
 *
 * The percentage represent the total width of the column
 * The pixels represent the total fixed width, in pixels, that other columns occupy (these are columns with absolute width set).
 *
 * In a DOM element, the `ColumnWidth` object is represented via the `width` style property
 * and the value is set using the `calc()` CSS function: `width: calc({pct}% - {px}px);`.
 *
 * For example, the `ColumnWidth` object  `{ pct: 33, px: 25 }` is translated to `width: calc(33% - 25px);`
 *
 * \@internal
 * @record
 */
function ColumnWidth() { }
if (false) {
    /** @type {?} */
    ColumnWidth.prototype.pct;
    /** @type {?} */
    ColumnWidth.prototype.px;
}
/**
 * A column width calculator that, based on all of the columns, calculates the default column width
 * and minimum required row width.
 *
 * The default column width is the width for all columns that does not have a width setting defined.
 * In addition, a `minimumRowWidth` is calculated, which represents the minimum width required width of the row, i.e. table.
 *
 * The `StaticColumnWidthLogic` does not take into account real-time DOM measurements (especially box-model metadata), hence "static".
 * It performs the calculation based on "dry" `PblColumn` metadata input from the user.
 *
 * The `StaticColumnWidthLogic` is less accurate and best used as a measurement baseline followed by a more accurate calculation.
 * This is why it outputs a default column width and not a column specific width.
 */
class StaticColumnWidthLogic {
    constructor() {
        this._agg = {
            pct: 0,
            // total agg fixed %
            px: 0,
            // total agg fixed px
            minRowWidth: 0,
            // total agg of min width
            pctCount: 0,
            // total columns with fixed %
            pxCount: 0,
            // total columns with fixed px
            count: 0 // total columns without a fixed value
        };
    }
    /**
     * @return {?}
     */
    get minimumRowWidth() { return this._agg.minRowWidth; }
    /**
     * Returns the calculated default width for a column.
     * This is the width for columns that does not have a specific width, adjusting them to fit the table.
     * It's important to run this method AFTER aggregating all columns through `addColumn()`.
     * The result contains 2 values, pct and px.
     * pct is the total width in percent that the column should spread taking into account columns with fixed % width.
     * px is the total width in pixels that the column should shrink taking into account columns with fixed pixel width.
     *
     * The algorithm is simple:
     *  1) Sum all columns with fixed percent width
     *  2) From the entire row width (100%) deduct the total fixed width (step 1).
     *     This result represents the % left for all columns without a fixed width (percent and pixel).
     *  3) Sum all columns with fixed pixel width.
     *     The result represent the total amount of width in pixel taken by columns with fixed width.
     *  4) Count all the columns without a fixed width.
     *
     *  For 2 & 3 we get values that we need to spread even between all of the columns without fixed width (percent and pixel).
     *  The exact width is the total percent left (2) minus the total width in pixel taken by columns with fixed with.
     *  We now need to divide the result from 2 & 3 by the result from 4.
     *
     * Both values should be used together on the `width` style property using the `calc` function:
     * e.g.: `calc(${pct}% - ${px}px)`
     *
     * This value is calculated every time it is called, use it once all columns are added.
     * @return {?}
     */
    get defaultColumnWidth() {
        /** @type {?} */
        const agg = this._agg;
        /** @type {?} */
        const pct = (100 - agg.pct) / agg.count;
        /** @type {?} */
        const px = agg.px / agg.count;
        return { pct, px };
    }
    /**
     * @param {?} column
     * @return {?}
     */
    addColumn(column) {
        /** @type {?} */
        const agg = this._agg;
        /** @type {?} */
        const width = column.parsedWidth;
        /** @type {?} */
        let minWidth = column.minWidth || 0;
        if (width) {
            switch (width.type) {
                case '%':
                    agg.pctCount += 1;
                    agg.pct += width.value;
                    break;
                case 'px':
                    agg.pxCount += 1;
                    agg.px += width.value;
                    minWidth = width.value;
                    break;
                default:
                    throw new Error(`Invalid width "${column.width}" in column ${column.prop}. Valid values are ##% or ##px (50% / 50px)`);
            }
        }
        else if (column.maxWidthLock) {
            agg.pxCount += 1;
            agg.px += column.maxWidth;
        }
        else {
            agg.count += 1;
        }
        agg.minRowWidth += minWidth;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    StaticColumnWidthLogic.prototype._agg;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function PblMetaColumnStore() { }
if (false) {
    /** @type {?} */
    PblMetaColumnStore.prototype.id;
    /** @type {?|undefined} */
    PblMetaColumnStore.prototype.header;
    /** @type {?|undefined} */
    PblMetaColumnStore.prototype.footer;
    /** @type {?|undefined} */
    PblMetaColumnStore.prototype.headerGroup;
    /** @type {?|undefined} */
    PblMetaColumnStore.prototype.footerGroup;
}
/**
 * @record
 */
function PblColumnStoreMetaRow() { }
if (false) {
    /** @type {?} */
    PblColumnStoreMetaRow.prototype.rowDef;
    /** @type {?} */
    PblColumnStoreMetaRow.prototype.keys;
    /** @type {?|undefined} */
    PblColumnStoreMetaRow.prototype.isGroup;
}
class PblColumnStore {
    constructor() {
        this._groupBy = [];
        this.byId = new Map();
        this.resetIds();
        this.resetColumns();
    }
    /**
     * @return {?}
     */
    get primary() { return this._primary; }
    /**
     * @param {?} value
     * @return {?}
     */
    set hidden(value) {
        this._hidden = value;
        this.setHidden();
    }
    /**
     * @return {?}
     */
    get groupBy() { return this._groupBy; }
    /**
     * @return {?}
     */
    get groupStore() { return this._groupStore; }
    /**
     * @param {...?} column
     * @return {?}
     */
    addGroupBy(...column) {
        this.groupBy.push(...column);
        this.setHidden();
    }
    /**
     * @param {...?} column
     * @return {?}
     */
    removeGroupBy(...column) {
        for (const c of column) {
            /** @type {?} */
            const idx = this.groupBy.findIndex((/**
             * @param {?} gbc
             * @return {?}
             */
            gbc => gbc.id === c.id));
            if (idx > -1) {
                this.groupBy.splice(idx, 1);
            }
        }
        this.setHidden();
    }
    /**
     * Move the provided `column` to the position of the `anchor` column.
     * The new location of the anchor column will be it's original location plus or minus 1, depending on the delta between
     * the columns. If the origin of the `column` is before the `anchor` then the anchor's new position is minus one, otherwise plus 1.
     * @param {?} column
     * @param {?} anchor
     * @return {?}
     */
    moveColumn(column, anchor) {
        const { columns, columnIds, allColumns } = this;
        /** @type {?} */
        let anchorIndex = columns.indexOf(anchor);
        /** @type {?} */
        let columnIndex = columns.indexOf(column);
        if (anchorIndex > -1 && columnIndex > -1) {
            moveItemInArray(columnIds, columnIndex, anchorIndex);
            moveItemInArray(columns, columnIndex, anchorIndex);
            if (this._allHidden && this._allHidden.length > 0) {
                anchorIndex = allColumns.indexOf(anchor);
                columnIndex = allColumns.indexOf(column);
            }
            moveItemInArray(allColumns, columnIndex, anchorIndex);
            return true;
        }
    }
    /**
     * @param {?} col1
     * @param {?} col2
     * @return {?}
     */
    swapColumns(col1, col2) {
        /** @type {?} */
        let col1Index = this.columns.indexOf(col1);
        /** @type {?} */
        let col2Index = this.columns.indexOf(col2);
        if (col1Index > -1 && col2Index > -1) {
            const { columns, columnIds, allColumns } = this;
            columns[col1Index] = col2;
            columns[col2Index] = col1;
            columnIds[col1Index] = col2.id;
            columnIds[col2Index] = col1.id;
            if (this._allHidden && this._allHidden.length > 0) {
                col1Index = allColumns.indexOf(col1);
                col2Index = allColumns.indexOf(col2);
            }
            allColumns[col1Index] = col2;
            allColumns[col2Index] = col1;
            return true;
        }
        return false;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    find(id) {
        return this.byId.get(id);
    }
    /**
     * @return {?}
     */
    getAllHeaderGroup() {
        return this._groupStore ? this._groupStore.all : [];
    }
    /**
     * @return {?}
     */
    getStaticWidth() {
        /** @type {?} */
        const rowWidth = new StaticColumnWidthLogic();
        for (const column of this.columns) {
            rowWidth.addColumn(column);
        }
        return rowWidth;
    }
    /**
     * @param {?} columnOrDefinitionSet
     * @return {?}
     */
    invalidate(columnOrDefinitionSet) {
        /** @type {?} */
        const columnSet = this.lastSet = 'groupStore' in columnOrDefinitionSet
            ? columnOrDefinitionSet
            : PblColumnFactory.fromDefinitionSet(columnOrDefinitionSet).build();
        const { groupStore, table, header, footer, headerGroup } = columnSet;
        this._groupStore = groupStore.clone();
        /** @type {?} */
        const rowWidth = new StaticColumnWidthLogic();
        this.resetColumns();
        this.resetIds();
        /** @type {?} */
        const hidden = this._allHidden = (this._hidden || []).concat(this._groupBy.map((/**
         * @param {?} c
         * @return {?}
         */
        c => c.id)));
        this.headerColumnDef = {
            rowClassName: (table.header && table.header.rowClassName) || '',
            type: (table.header && table.header.type) || 'fixed',
        };
        this.footerColumnDef = {
            rowClassName: (table.footer && table.footer.rowClassName) || '',
            type: (table.footer && table.footer.type) || 'fixed',
        };
        this._primary = undefined;
        for (const def of table.cols) {
            /** @type {?} */
            let column;
            column = new PblColumn(def, this.groupStore);
            /** @type {?} */
            const columnRecord = this.getColumnRecord(column.id);
            columnRecord.data = column;
            this.allColumns.push(column);
            column.hidden = hidden.indexOf(column.id) > -1;
            if (!column.hidden) {
                this.columns.push(column);
                this.columnIds.push(column.id);
                rowWidth.addColumn(column);
            }
            if (column.pIndex) {
                if (this._primary && isDevMode()) {
                    console.warn(`Multiple primary index columns defined: previous: "${this._primary.id}", current: "${column.id}"`);
                }
                this._primary = column;
            }
        }
        for (const rowDef of header) {
            /** @type {?} */
            const keys = [];
            for (const def of rowDef.cols) {
                /** @type {?} */
                const metaCol = this.getColumnRecord(def.id, this.metaColumns);
                /** @type {?} */
                const column = metaCol.header || (metaCol.header = new PblMetaColumn(def));
                keys.push(column.id);
            }
            this._metaRows.header[rowDef.rowIndex] = { rowDef, keys };
        }
        for (const rowDef of headerGroup) {
            this._updateGroup(rowDef);
        }
        for (const rowDef of footer) {
            /** @type {?} */
            const keys = [];
            for (const def of rowDef.cols) {
                /** @type {?} */
                const metaCol = this.getColumnRecord(def.id, this.metaColumns);
                /** @type {?} */
                const column = metaCol.footer || (metaCol.footer = new PblMetaColumn(def));
                keys.push(column.id);
            }
            this._metaRows.footer.push({ rowDef, keys });
        }
        resetColumnWidths(rowWidth, this.columns, this.metaColumns);
    }
    /**
     * @param {...?} rowIndex
     * @return {?}
     */
    updateGroups(...rowIndex) {
        if (rowIndex.length === 0) {
            for (const rowDef of this.lastSet.headerGroup) {
                this._updateGroup(rowDef);
            }
        }
        else {
            /** @type {?} */
            const rows = rowIndex.slice();
            for (const rowDef of this.lastSet.headerGroup) {
                /** @type {?} */
                const idx = rows.indexOf(rowDef.rowIndex);
                if (idx > -1) {
                    rows.splice(idx, 1);
                    this._updateGroup(rowDef);
                    if (rows.length === 0) {
                        return;
                    }
                }
            }
        }
    }
    /**
     * @private
     * @param {?} columnSet
     * @return {?}
     */
    _updateGroup(columnSet) {
        /** @type {?} */
        const keys = [];
        /** @type {?} */
        const allKeys = [];
        /** @type {?} */
        const groups = [];
        for (let tIndex = 0; tIndex < this.columns.length; tIndex++) {
            /** @type {?} */
            const columns = [this.columns[tIndex - 1], this.columns[tIndex], this.columns[tIndex + 1]];
            /** @type {?} */
            const columnGroups = columns.map((/**
             * @param {?} c
             * @return {?}
             */
            c => c ? c.getGroupOfRow(columnSet.rowIndex) : undefined));
            // true when the group exists in one of the columns BUT NOT in the LAST COLUMN (i.e: Its a slave split)
            /** @type {?} */
            const groupExists = groups.lastIndexOf(columnGroups[1]) !== -1;
            /** @type {?} */
            const column = columns[1];
            /** @type {?} */
            const gColumn = column.groupLogic((/** @type {?} */ (columnGroups)), groupExists);
            if (gColumn !== columnGroups[1]) {
                column.markNotInGroup(columnGroups[1]);
                column.markInGroup(gColumn);
            }
            /** @type {?} */
            const metaCol = this.getColumnRecord(gColumn.id, this.metaColumns);
            if (!metaCol.headerGroup) {
                metaCol.headerGroup = gColumn;
            }
            if (groups.lastIndexOf(gColumn) === -1) {
                allKeys.push(gColumn.id);
                if (gColumn.isVisible) {
                    keys.push(gColumn.id);
                }
            }
            gColumn.replace(column);
            groups.push(gColumn);
        }
        for (const ghost of this._groupStore.findGhosts()) {
            if (ghost.rowIndex === columnSet.rowIndex) {
                const { id } = ghost;
                /** @type {?} */
                let idx = allKeys.indexOf(id);
                if (idx !== -1) {
                    allKeys.splice(idx, 1);
                    idx = keys.indexOf(id);
                    if (idx !== -1) {
                        keys.splice(idx, 1);
                    }
                    this.metaColumns.splice(this.metaColumns.findIndex((/**
                     * @param {?} m
                     * @return {?}
                     */
                    m => m.id === id)), 1);
                }
                this._groupStore.remove(ghost);
            }
        }
        this.updateMetaRow('header', columnSet.rowIndex, { rowDef: columnSet, keys, allKeys, isGroup: true });
    }
    /**
     * @private
     * @template P
     * @param {?} type
     * @param {?} rowIndex
     * @param {?} value
     * @return {?}
     */
    updateMetaRow(type, rowIndex, value) {
        /** @type {?} */
        const curr = this._metaRows[type][rowIndex] || {};
        this._metaRows[type][rowIndex] = Object.assign(curr, value);
    }
    /**
     * @private
     * @template T
     * @param {?} id
     * @param {?=} collection
     * @return {?}
     */
    getColumnRecord(id, collection) {
        /** @type {?} */
        let columnRecord = this.byId.get(id);
        if (!columnRecord) {
            this.byId.set(id, columnRecord = { id });
            if (collection) {
                collection.push((/** @type {?} */ (columnRecord)));
            }
        }
        return (/** @type {?} */ (columnRecord));
    }
    /**
     * @private
     * @return {?}
     */
    setHidden() {
        this._allHidden = (this._hidden || []).concat(this._groupBy.map((/**
         * @param {?} c
         * @return {?}
         */
        c => c.id)));
        this.columnIds = [];
        this.columns = [];
        for (const c of this.allColumns) {
            c.hidden = this._allHidden.indexOf(c.id) > -1;
            if (!c.hidden) {
                this.columns.push(c);
                this.columnIds.push(c.id);
            }
        }
        for (const h of this._metaRows.header) {
            if (h.isGroup) {
                h.keys = h.allKeys.filter((/**
                 * @param {?} key
                 * @return {?}
                 */
                key => this.find(key).headerGroup.isVisible));
            }
        }
        resetColumnWidths(this.getStaticWidth(), this.columns, this.metaColumns);
    }
    /**
     * @private
     * @return {?}
     */
    resetColumns() {
        this.allColumns = [];
        this.columns = [];
        this.metaColumns = [];
        this.byId.clear();
    }
    /**
     * @private
     * @return {?}
     */
    resetIds() {
        this.columnIds = [];
        this._metaRows = this.metaColumnIds = { header: [], footer: [] };
    }
}
if (false) {
    /** @type {?} */
    PblColumnStore.prototype.metaColumnIds;
    /** @type {?} */
    PblColumnStore.prototype.metaColumns;
    /** @type {?} */
    PblColumnStore.prototype.columnIds;
    /** @type {?} */
    PblColumnStore.prototype.columns;
    /** @type {?} */
    PblColumnStore.prototype.allColumns;
    /** @type {?} */
    PblColumnStore.prototype.headerColumnDef;
    /** @type {?} */
    PblColumnStore.prototype.footerColumnDef;
    /**
     * @type {?}
     * @private
     */
    PblColumnStore.prototype._primary;
    /**
     * @type {?}
     * @private
     */
    PblColumnStore.prototype._metaRows;
    /**
     * @type {?}
     * @private
     */
    PblColumnStore.prototype._hidden;
    /**
     * @type {?}
     * @private
     */
    PblColumnStore.prototype._allHidden;
    /**
     * @type {?}
     * @private
     */
    PblColumnStore.prototype._groupBy;
    /**
     * @type {?}
     * @private
     */
    PblColumnStore.prototype.byId;
    /**
     * @type {?}
     * @private
     */
    PblColumnStore.prototype._groupStore;
    /**
     * @type {?}
     * @private
     */
    PblColumnStore.prototype.lastSet;
}
/**
 * Moves an item one index in an array to another.
 * @template T
 * @param {?} array Array in which to move the item.
 * @param {?} fromIndex Starting index of the item.
 * @param {?} toIndex Index to which the item should be moved.
 * @return {?}
 */
function moveItemInArray(array, fromIndex, toIndex) {
    /** @type {?} */
    const from = clamp(fromIndex, array.length - 1);
    /** @type {?} */
    const to = clamp(toIndex, array.length - 1);
    if (from === to) {
        return;
    }
    /** @type {?} */
    const target = array[from];
    /** @type {?} */
    const delta = to < from ? -1 : 1;
    for (let i = from; i !== to; i += delta) {
        array[i] = array[i + delta];
    }
    array[to] = target;
}
/**
 * Clamps a number between zero and a maximum.
 * @param {?} value
 * @param {?} max
 * @return {?}
 */
function clamp(value, max) {
    return Math.max(0, Math.min(max, value));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ColumnSizeInfo {
    /**
     * @param {?} target
     */
    constructor(target) {
        this.target = target;
    }
    /**
     * @return {?}
     */
    get column() { return this._column; }
    /**
     * @param {?} value
     * @return {?}
     */
    set column(value) { this.attachColumn(value); }
    /**
     * @param {?} column
     * @return {?}
     */
    attachColumn(column) {
        this.detachColumn();
        if (column) {
            column.sizeInfo = this;
        }
        this._column = column;
    }
    /**
     * @return {?}
     */
    detachColumn() {
        if (this._column) {
            this._column.sizeInfo = undefined;
            this._column = undefined;
        }
    }
    /**
     * @return {?}
     */
    updateSize() {
        if (this.column && !this.column.columnDef.isDragging) {
            /** @type {?} */
            const el = this.target;
            /** @type {?} */
            const rect = el.getBoundingClientRect();
            this.width = rect.width;
            this.height = rect.height;
            this.style = getComputedStyle(el);
            this.column.columnDef.onResize();
        }
    }
}
if (false) {
    /**
     * The height of the column (subpixel resolution)
     * @type {?}
     */
    ColumnSizeInfo.prototype.height;
    /**
     * The width of the column (subpixel resolution)
     * Note that this is the not the content width.
     * @type {?}
     */
    ColumnSizeInfo.prototype.width;
    /**
     * The computed style for this cell.
     * @type {?}
     */
    ColumnSizeInfo.prototype.style;
    /**
     * @type {?}
     * @protected
     */
    ColumnSizeInfo.prototype._column;
    /** @type {?} */
    ColumnSizeInfo.prototype.target;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function RegistryChangedEvent() { }
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
function PblNgridSingleRegistryMap() { }
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
function PblNgridMultiRegistryMap() { }
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
PblNgridRegistryService.ctorParameters = () => [
    { type: PblNgridRegistryService }
];
PblNgridRegistryService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
PblNgridRegistryService.ctorParameters = () => [
    { type: PblNgridRegistryService, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
/** @nocollapse */ PblNgridRegistryService.ngInjectableDef = ɵɵdefineInjectable({ factory: function PblNgridRegistryService_Factory() { return new PblNgridRegistryService(ɵɵinject(PblNgridRegistryService, 12)); }, token: PblNgridRegistryService, providedIn: "root" });
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
PblNgridRegistryService = __decorate([
    UnRx(),
    __metadata("design:paramtypes", [PblNgridRegistryService])
], PblNgridRegistryService);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function PblNgridCellDefDirectiveBase() { }
if (false) {
    /** @type {?} */
    PblNgridCellDefDirectiveBase.prototype.name;
    /** @type {?} */
    PblNgridCellDefDirectiveBase.prototype.type;
}
/**
 * @abstract
 * @template Z
 */
class PblNgridBaseCellDef {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        this.tRef = tRef;
        this.registry = registry;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // TODO: listen to property changes (name) and re-register cell
        if (this instanceof PblNgridHeaderCellDefDirective) {
            this.registry.addMulti('headerCell', this);
        }
        else if (this instanceof PblNgridCellDefDirective) {
            this.registry.addMulti('tableCell', this);
        }
        else if (this instanceof PblNgridEditorCellDefDirective) {
            this.registry.addMulti('editorCell', this);
        }
        else if (this instanceof PblNgridFooterCellDefDirective) {
            this.registry.addMulti('footerCell', this);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this instanceof PblNgridHeaderCellDefDirective) {
            this.registry.removeMulti('headerCell', this);
        }
        else if (this instanceof PblNgridCellDefDirective) {
            this.registry.removeMulti('tableCell', this);
        }
        else if (this instanceof PblNgridEditorCellDefDirective) {
            this.registry.removeMulti('editorCell', this);
        }
        else if (this instanceof PblNgridFooterCellDefDirective) {
            this.registry.removeMulti('footerCell', this);
        }
    }
}
if (false) {
    /** @type {?} */
    PblNgridBaseCellDef.prototype.name;
    /** @type {?} */
    PblNgridBaseCellDef.prototype.type;
    /** @type {?} */
    PblNgridBaseCellDef.prototype.tRef;
    /**
     * @type {?}
     * @protected
     */
    PblNgridBaseCellDef.prototype.registry;
}
/**
 * Header Cell definition for the pbl-ngrid.
 * Captures the template of a column's data row header cell as well as header cell-specific properties.
 *
 * `pblNgridHeaderCellDef` does the same thing that `matHeaderCellDef` and `cdkHeaderCellDef` do with one difference,
 * `pblNgridHeaderCellDef` is independent and does not require a column definition parent, instead it accept the ID of
 * the header cell.
 *
 * NOTE: Defining '*' as id will declare the header cell template as default, replacing the table's default header cell template.
 *
 * Make sure you set the proper id of the property you want to override.
 * When the `id` is set explicitly in the table column definition, this is not a problem but when if it's not set
 * the table generates a unique id based on a logic. If `name` is set the name is used, if no name is set
 * the `prop` is used (full with dot notation).
 * @template T
 */
class PblNgridHeaderCellDefDirective extends PblNgridBaseCellDef {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) { super(tRef, registry); }
}
PblNgridHeaderCellDefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblNgridHeaderCellDef], [pblNgridHeaderCellTypeDef]',
                inputs: [
                    'name:pblNgridHeaderCellDef',
                    'type:pblNgridHeaderCellTypeDef',
                ]
            },] }
];
/** @nocollapse */
PblNgridHeaderCellDefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
/**
 * Cell definition for the pbl-ngrid.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 *
 * `pblNgridCellDef` does the same thing that `matCellDef` and `cdkCellDef` do with one difference, `pblNgridCellDef` is
 * independent and does not require a column definition parent, instead it accept the ID of the cell.
 *
 * NOTE: Defining '*' as id will declare the cell template as default, replacing the table's default cell template.
 *
 * Make sure you set the proper id of the property you want to override.
 * When the `id` is set explicitly in the table column definition, this is not a problem but when if it's not set
 * the table generates a unique id based on a logic. If `name` is set the name is used, if no name is set
 * the `prop` is used (full with dot notation).
 * @template T, P
 */
class PblNgridCellDefDirective extends PblNgridBaseCellDef {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) { super(tRef, registry); }
}
PblNgridCellDefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblNgridCellDef], [pblNgridCellTypeDef]',
                inputs: [
                    'name:pblNgridCellDef',
                    'type:pblNgridCellTypeDef',
                ]
            },] }
];
/** @nocollapse */
PblNgridCellDefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
if (false) {
    /** @type {?} */
    PblNgridCellDefDirective.prototype.type;
}
/**
 * @template T, P
 */
class PblNgridEditorCellDefDirective extends PblNgridBaseCellDef {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) { super(tRef, registry); }
}
PblNgridEditorCellDefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblNgridCellEditorDef], [pblNgridCellEditorTypeDef]',
                inputs: [
                    'name:pblNgridCellEditorDef',
                    'type:pblNgridCellEditorTypeDef',
                ]
            },] }
];
/** @nocollapse */
PblNgridEditorCellDefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
if (false) {
    /** @type {?} */
    PblNgridEditorCellDefDirective.prototype.type;
}
/**
 * @template T
 */
class PblNgridFooterCellDefDirective extends PblNgridBaseCellDef {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) { super(tRef, registry); }
}
PblNgridFooterCellDefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblNgridFooterCellDef], [pblNgridFooterCellTypeDef]',
                inputs: [
                    'name:pblNgridFooterCellDef',
                    'type:pblNgridFooterCellTypeDef',
                ]
            },] }
];
/** @nocollapse */
PblNgridFooterCellDefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
/**
 * @template T
 * @param {?} cellDefs
 * @param {?} colDef
 * @param {?=} searchParent
 * @return {?}
 */
function findCellDefById(cellDefs, colDef, searchParent) {
    for (const cellDef of cellDefs) {
        if (cellDef.type) {
            if (colDef.type && cellDef.type === colDef.type.name) {
                return cellDef;
            }
        }
        else {
            /** @type {?} */
            const id = cellDef.name;
            if (id === colDef.id) {
                return cellDef;
            }
        }
    }
}
/**
 * @template T
 * @param {?} registry
 * @param {?} colDef
 * @param {?} kind
 * @param {?=} searchParent
 * @return {?}
 */
function findCellDef(registry, colDef, kind, searchParent) {
    /** @type {?} */
    const cellDefs = registry.getMulti(kind);
    if (cellDefs) {
        /** @type {?} */
        let type;
        if (isPblColumn(colDef)) {
            switch (kind) {
                case 'headerCell':
                    if (colDef.headerType) {
                        type = { id: colDef.id, type: colDef.headerType };
                    }
                    break;
                case 'footerCell':
                    if (colDef.footerType) {
                        type = { id: colDef.id, type: colDef.footerType };
                    }
                    break;
            }
        }
        if (!type) {
            type = colDef;
        }
        /** @type {?} */
        const match = findCellDefById(cellDefs, type);
        if (match) {
            return match;
        }
    }
    if (searchParent && registry.parent) {
        return findCellDef(registry.parent, (/** @type {?} */ (colDef)), (/** @type {?} */ (kind)), searchParent);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template T
 */
function CellContextState() { }
if (false) {
    /** @type {?} */
    CellContextState.prototype.editing;
    /** @type {?} */
    CellContextState.prototype.focused;
    /** @type {?} */
    CellContextState.prototype.selected;
}
/**
 * @record
 * @template T
 */
function RowContextState() { }
if (false) {
    /** @type {?} */
    RowContextState.prototype.identity;
    /** @type {?} */
    RowContextState.prototype.dataIndex;
    /** @type {?} */
    RowContextState.prototype.cells;
    /** @type {?} */
    RowContextState.prototype.firstRender;
}
/**
 * A reference to a data cell on the grid.
 * @record
 */
function GridDataPoint() { }
if (false) {
    /**
     * The row identity.
     * If the grid was set with an identity property use the value of the identity otherwise, use the location of the row in the datasource.
     * @type {?}
     */
    GridDataPoint.prototype.rowIdent;
    /**
     * The column index, relative to the column definition set provided to the grid.
     * Note that this is the absolute position, including hidden columns.
     * @type {?}
     */
    GridDataPoint.prototype.colIndex;
}
/**
 * @record
 */
function PblNgridFocusChangedEvent() { }
if (false) {
    /** @type {?} */
    PblNgridFocusChangedEvent.prototype.prev;
    /** @type {?} */
    PblNgridFocusChangedEvent.prototype.curr;
}
/**
 * @record
 */
function PblNgridSelectionChangedEvent() { }
if (false) {
    /** @type {?} */
    PblNgridSelectionChangedEvent.prototype.added;
    /** @type {?} */
    PblNgridSelectionChangedEvent.prototype.removed;
}
/**
 * @record
 * @template T, TCol
 */
function PblNgridMetaCellContext() { }
if (false) {
    /** @type {?} */
    PblNgridMetaCellContext.prototype.$implicit;
    /** @type {?} */
    PblNgridMetaCellContext.prototype.col;
    /**
     * @deprecated use grid instead
     * @type {?}
     */
    PblNgridMetaCellContext.prototype.table;
    /** @type {?} */
    PblNgridMetaCellContext.prototype.grid;
}
/**
 * @record
 * @template T, P
 */
function PblNgridCellContext() { }
if (false) {
    /** @type {?} */
    PblNgridCellContext.prototype.rowContext;
    /** @type {?} */
    PblNgridCellContext.prototype.$implicit;
    /** @type {?} */
    PblNgridCellContext.prototype.row;
    /** @type {?} */
    PblNgridCellContext.prototype.value;
    /** @type {?} */
    PblNgridCellContext.prototype.col;
    /**
     * @deprecated use grid instead
     * @type {?}
     */
    PblNgridCellContext.prototype.table;
    /** @type {?} */
    PblNgridCellContext.prototype.grid;
    /** @type {?} */
    PblNgridCellContext.prototype.index;
    /** @type {?} */
    PblNgridCellContext.prototype.editing;
    /** @type {?} */
    PblNgridCellContext.prototype.focused;
    /** @type {?} */
    PblNgridCellContext.prototype.selected;
    /**
     * @param {?=} markForCheck
     * @return {?}
     */
    PblNgridCellContext.prototype.startEdit = function (markForCheck) { };
    /**
     * @param {?=} markForCheck
     * @return {?}
     */
    PblNgridCellContext.prototype.stopEdit = function (markForCheck) { };
}
/**
 * @record
 * @template T
 */
function PblNgridRowContext() { }
if (false) {
    /** @type {?} */
    PblNgridRowContext.prototype.identity;
    /**
     * When true, it is the first time that the row is rendered.
     * Once the row leaves the view this will be false and will not change.
     *
     * Note that rendered items might appear outside of the viewport if virtual scroll is not set and
     * when set but the row is rendered as part of the buffer.
     *
     * This is relevant only when virtual scroll is set.
     * @type {?}
     */
    PblNgridRowContext.prototype.firstRender;
    /**
     * When true, indicates that the row is rendered outside of the viewport.
     *
     * The indicator is updated when rows are rendered (i.e. not live, on scroll events).
     * Understanding this behavior is important!!!
     *
     * For live updated, you can use `updateOutOfViewState()` to trigger updates from a scroll stream. (keep track on performance)
     *
     * Note that when virtual scroll is enabled `true` indicates a buffer row.
     * @type {?}
     */
    PblNgridRowContext.prototype.outOfView;
    /**
     * @deprecated use grid instead
     * @type {?}
     */
    PblNgridRowContext.prototype.table;
    /** @type {?} */
    PblNgridRowContext.prototype.grid;
    /**
     * Returns the length of cells context stored in this row
     * @type {?}
     */
    PblNgridRowContext.prototype.length;
    /**
     * @param {?} index
     * @return {?}
     */
    PblNgridRowContext.prototype.cell = function (index) { };
    /**
     * Returns a shallow copy of the current cell's context array.
     * @return {?}
     */
    PblNgridRowContext.prototype.getCells = function () { };
    /**
     * Updates the `outOfView` property.
     * @return {?}
     */
    PblNgridRowContext.prototype.updateOutOfViewState = function () { };
}
/**
 * @record
 * @template T
 */
function PblNgridContextApi() { }
if (false) {
    /**
     * The reference to currently focused cell context.
     * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
     *
     * > Note that when virtual scroll is enabled the currently focused cell does not have to exist in the view.
     * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
     * @type {?}
     */
    PblNgridContextApi.prototype.focusedCell;
    /**
     * Notify when the focus has changed.
     *
     * > Note that the notification is not immediate, it will occur on the closest micro-task after the change.
     * @type {?}
     */
    PblNgridContextApi.prototype.focusChanged;
    /**
     * The reference to currently selected range of cell's context.
     * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
     *
     * > Note that when virtual scroll is enabled the currently selected cells does not have to exist in the view.
     * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
     * @type {?}
     */
    PblNgridContextApi.prototype.selectedCells;
    /**
     * Notify when the selected cells has changed.
     * @type {?}
     */
    PblNgridContextApi.prototype.selectionChanged;
    /**
     * Focus the provided cell.
     * If a cell is not provided will un-focus (blur) the currently focused cell (if there is one).
     * @param {?=} cellRef A Reference to the cell
     * @param {?=} markForCheck Mark the row for change detection
     * @return {?}
     */
    PblNgridContextApi.prototype.focusCell = function (cellRef, markForCheck) { };
    /**
     * Select all provided cells.
     * @param {?} cellRefs
     * @param {?=} markForCheck Mark the row for change detection
     * @param {?=} clearCurrent Clear the current selection before applying the new selection.
     * Default to false (add to current).
     * @return {?}
     */
    PblNgridContextApi.prototype.selectCells = function (cellRefs, markForCheck, clearCurrent) { };
    /**
     * Unselect all provided cells.
     * If cells are not provided will un-select all currently selected cells.
     * @param {?=} cellRefs
     * @param {?=} markForCheck Mark the row for change detection
     * @return {?}
     */
    PblNgridContextApi.prototype.unselectCells = function (cellRefs, markForCheck) { };
    /**
     * Clear the current context.
     * This method will reset the context of all cells.
     *
     * In most cases, you do not need to run this method because it will automatically run when
     * the datasource is replaced (entire datasource instance).
     *
     * However, if you are keeping the same datasource but switching data internally (onTrigger)
     * you can clear the context using this method.
     * @return {?}
     */
    PblNgridContextApi.prototype.clear = function () { };
    /**
     * Try to find a specific row context, using the row identity, in the current view.
     * If the row is not in the view (or even not in the cache) it will return undefined, otherwise returns the row's context instance (`PblRowContext`)
     * @param {?} rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
     * @return {?}
     */
    PblNgridContextApi.prototype.findRowInView = function (rowIdentity) { };
    /**
     * Try to find a specific row context, using the row identity, in the context cache.
     * Note that the cache does not hold the context itself but only the state that can later be used to retrieve a context instance. The context instance
     * is only used as context for rows in view.
     * @param {?} rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
     * @return {?}
     */
    PblNgridContextApi.prototype.findRowInCache = function (rowIdentity) { };
    /**
     * Try to find a specific row context, using the row identity, in the context cache.
     * Note that the cache does not hold the context itself but only the state that can later be used to retrieve a context instance. The context instance
     * is only used as context for rows in view.
     * @param {?} rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
     * @param {?} offset When set, returns the row at the offset from the row with the provided row identity. Can be any numeric value (e.g 5, -6, 4).
     * @param {?} create Whether to create a new state if the current state does not exist.
     * @return {?}
     */
    PblNgridContextApi.prototype.findRowInCache = function (rowIdentity, offset, create) { };
    /**
     * Get the row context in the specified index.
     *
     * The specified index refers to the rendered index and not the index in the data store.
     * If you are not using virtual scroll the rendered index is the same as the data index.
     *
     * > You can transform data < -- > render index's using the data source.
     * @param {?} rowIndex The RENDER index position of the row.
     * @return {?}
     */
    PblNgridContextApi.prototype.getRow = function (rowIndex) { };
    /**
     * @param {?} cell
     * @return {?}
     */
    PblNgridContextApi.prototype.getCell = function (cell) { };
    /**
     * Get the cell context in the specific row index and column index
     * @param {?} rowIndex The index position of the row.
     * @param {?} colIndex The index position of the column.
     * @return {?}
     */
    PblNgridContextApi.prototype.getCell = function (rowIndex, colIndex) { };
    /**
     * @param {?} cell
     * @return {?}
     */
    PblNgridContextApi.prototype.getDataItem = function (cell) { };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T, TCol
 */
class MetaCellContext {
    /**
     * @protected
     */
    constructor() { }
    /**
     * @return {?}
     */
    get $implicit() { return this; }
    /**
     * @deprecated use grid instead
     * @return {?}
     */
    get table() { return this.grid; }
    ;
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
    /**
     * @template T, TCol
     * @param {?} col
     * @param {?} grid
     * @return {?}
     */
    static create(col, grid) {
        /** @type {?} */
        const instance = new MetaCellContext();
        instance.col = col;
        instance.grid = grid;
        return instance;
    }
}
if (false) {
    /** @type {?} */
    MetaCellContext.prototype.col;
    /** @type {?} */
    MetaCellContext.prototype.grid;
    /* Skipping unhandled member: ;*/
}
/**
 * @template T
 */
class PblCellContext {
    /**
     * @protected
     */
    constructor() {
        this._editing = false;
        this._focused = false;
        this._selected = false;
    }
    /**
     * @return {?}
     */
    get $implicit() { return this; }
    /**
     * @return {?}
     */
    get row() { return this.rowContext.$implicit; }
    ;
    /**
     * @return {?}
     */
    get value() { return this.col.getValue(this.row); }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) { this.col.setValue(this.row, v); }
    /**
     * @return {?}
     */
    get rowContext() { return this._rowContext; }
    /**
     * @return {?}
     */
    get editing() { return this._editing; }
    /**
     * @return {?}
     */
    get focused() { return this._focused; }
    /**
     * @return {?}
     */
    get selected() { return this._selected; }
    /**
     * @deprecated use grid instead
     * @return {?}
     */
    get table() { return this.grid; }
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
    /**
     * @template T
     * @param {?} rowContext
     * @param {?} col
     * @param {?} extApi
     * @return {?}
     */
    static create(rowContext, col, extApi) {
        /** @type {?} */
        const instance = new PblCellContext();
        instance._rowContext = rowContext;
        instance.col = col;
        instance.extApi = extApi;
        Object.defineProperties(instance, {
            grid: { value: extApi.grid },
            index: { value: extApi.grid.columnApi.indexOf(col) },
        });
        return instance;
    }
    /**
     * @template T
     * @return {?}
     */
    static defaultState() {
        return { editing: false, focused: false, selected: false };
    }
    /**
     * @return {?}
     */
    clone() {
        /** @type {?} */
        const ctx = PblCellContext.create(this._rowContext, this.col, this.extApi);
        ctx.fromState(this.getState(), this._rowContext, true);
        return ctx;
    }
    /**
     * @return {?}
     */
    getState() {
        return {
            editing: this._editing,
            focused: this._focused,
            selected: this._selected,
        };
    }
    /**
     * @param {?} state
     * @param {?} rowContext
     * @param {?=} skipRowUpdate
     * @return {?}
     */
    fromState(state, rowContext, skipRowUpdate) {
        /** @type {?} */
        const requiresReset = !skipRowUpdate && this._editing === state.editing;
        this._rowContext = rowContext;
        this._editing = state.editing;
        this._focused = state.focused;
        this._selected = state.selected;
        if (requiresReset) {
            rowContext.updateCell(this);
        }
    }
    /**
     * @param {?=} markForCheck
     * @return {?}
     */
    startEdit(markForCheck) {
        if (this.col.editorTpl && !this.editing) {
            this._editing = true;
            this._rowContext.updateCell(this);
            if (markForCheck) {
                this.grid._cdkTable.syncRows('data', true, this.rowContext.index);
            }
        }
    }
    /**
     * @param {?=} markForCheck
     * @return {?}
     */
    stopEdit(markForCheck) {
        if (this.editing && !this.grid.viewport.isScrolling) {
            this._editing = false;
            this._rowContext.updateCell(this);
            if (markForCheck) {
                this.grid._cdkTable.syncRows('data', this.rowContext.index);
            }
        }
    }
}
if (false) {
    /** @type {?} */
    PblCellContext.prototype.grid;
    /** @type {?} */
    PblCellContext.prototype.index;
    /**
     * @type {?}
     * @private
     */
    PblCellContext.prototype._editing;
    /**
     * @type {?}
     * @private
     */
    PblCellContext.prototype._focused;
    /**
     * @type {?}
     * @private
     */
    PblCellContext.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    PblCellContext.prototype._rowContext;
    /** @type {?} */
    PblCellContext.prototype.col;
    /**
     * @type {?}
     * @private
     */
    PblCellContext.prototype.extApi;
    /* Skipping unhandled member: ;*/
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class PblRowContext {
    /**
     * @param {?} identity
     * @param {?} dataIndex
     * @param {?} extApi
     */
    constructor(identity, dataIndex, extApi) {
        this.identity = identity;
        this.dataIndex = dataIndex;
        this.extApi = extApi;
        /*  TODO: material2#14198
                The row context come from the `cdk` and it can be of 2 types, depending if multiple row templates are used or not.
                `index` is used for single row template mode and `renderIndex` for multi row template mode.
        
                There library and/or plugins require access to the rendered index and having 2 locations is a problem...
                It's a bug trap, adding more complexity and some time access issue because the `CdkTable` instance is not always available.
        
                This is a workaround for have a single location for the rendered index.
                I chose to `index` as the single location although `renderIndex` will probably be chosen by the material team.
                This is because it's less likely to occur as most tables does not have multi row templates (detail row)
                A refactor will have to be done in the future.
                There is a pending issue to do so in https://github.com/angular/material2/issues/14198
                Also related: https://github.com/angular/material2/issues/14199
            */
        /** @type {?} */
        const applyWorkaround = extApi.cdkTable.multiTemplateDataRows;
        if (applyWorkaround) {
            Object.defineProperty(this, 'index', { get: (/**
                 * @return {?}
                 */
                function () { return this.renderIndex; }) });
        }
        this.grid = this.table = extApi.grid;
        /** @type {?} */
        const cells = this.cells = [];
        const { columns } = extApi.grid.columnApi;
        /** @type {?} */
        const len = columns.length;
        for (let columnIndex = 0; columnIndex < len; columnIndex++) {
            /** @type {?} */
            const cellContext = PblCellContext.create(this, columns[columnIndex], extApi);
            cells.push(cellContext);
        }
    }
    /**
     * Returns the length of cells context stored in this row
     * @return {?}
     */
    get length() {
        return (this.cells && this.cells.length) || 0;
    }
    /**
     * @return {?}
     */
    get pblRowContext() { return this; }
    /**
     * @param {?} value
     * @return {?}
     */
    set pblRowContext(value) { }
    /**
     * @template T
     * @param {?} identity
     * @param {?} dataIndex
     * @param {?} cellsCount
     * @return {?}
     */
    static defaultState(identity, dataIndex, cellsCount) {
        /** @type {?} */
        const cells = [];
        for (let i = 0; i < cellsCount; i++) {
            cells.push(PblCellContext.defaultState());
        }
        return { identity, dataIndex, cells, firstRender: true };
    }
    /**
     * @return {?}
     */
    getState() {
        return {
            identity: this.identity,
            dataIndex: this.dataIndex,
            firstRender: this.firstRender,
            cells: this.cells.map((/**
             * @param {?} c
             * @return {?}
             */
            c => c.getState())),
        };
    }
    /**
     * @param {?} state
     * @return {?}
     */
    fromState(state) {
        this.identity = state.identity;
        this.firstRender = state.firstRender;
        this.dataIndex = state.dataIndex;
        for (let i = 0, len = this.cells.length; i < len; i++) {
            this.cells[i].fromState(state.cells[i], this);
        }
    }
    /**
     * @param {?} context
     * @return {?}
     */
    updateContext(context) {
        context.dataIndex = this.dataIndex;
        Object.assign(this, context);
    }
    /**
     * Returns the cell context for the column at the specified position.
     * > The position is relative to ALL columns (NOT RENDERED COLUMNS)
     * @param {?} index
     * @return {?}
     */
    cell(index) {
        /** @type {?} */
        const idx = typeof index === 'number' ? index : this.grid.columnApi.indexOf(index);
        return this.cells[idx];
    }
    /**
     * @return {?}
     */
    getCells() {
        return (this.cells && this.cells.slice()) || [];
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    updateCell(cell) {
        this.cells[cell.index] = cell.clone();
    }
    /**
     * Updates the `outOfView` property.
     * @return {?}
     */
    updateOutOfViewState() {
        this.extApi.contextApi.updateOutOfViewState(this);
    }
}
if (false) {
    /**
     * Data for the row that this cell is located within.
     * @type {?}
     */
    PblRowContext.prototype.$implicit;
    /**
     * Index of the data object in the provided data array.
     * @type {?}
     */
    PblRowContext.prototype.index;
    /**
     * Index location of the rendered row that this cell is located within.
     * @type {?}
     */
    PblRowContext.prototype.renderIndex;
    /**
     * Length of the number of total rows.
     * @type {?}
     */
    PblRowContext.prototype.count;
    /**
     * True if this cell is contained in the first row.
     * @type {?}
     */
    PblRowContext.prototype.first;
    /**
     * True if this cell is contained in the last row.
     * @type {?}
     */
    PblRowContext.prototype.last;
    /**
     * True if this cell is contained in a row with an even-numbered index.
     * @type {?}
     */
    PblRowContext.prototype.even;
    /**
     * True if this cell is contained in a row with an odd-numbered index.
     * @type {?}
     */
    PblRowContext.prototype.odd;
    /** @type {?} */
    PblRowContext.prototype.gridInstance;
    /** @type {?} */
    PblRowContext.prototype.firstRender;
    /** @type {?} */
    PblRowContext.prototype.outOfView;
    /**
     * @deprecated use grid instead
     * @type {?}
     */
    PblRowContext.prototype.table;
    /** @type {?} */
    PblRowContext.prototype.grid;
    /**
     * @type {?}
     * @private
     */
    PblRowContext.prototype.cells;
    /** @type {?} */
    PblRowContext.prototype.identity;
    /** @type {?} */
    PblRowContext.prototype.dataIndex;
    /**
     * @type {?}
     * @private
     */
    PblRowContext.prototype.extApi;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * IE 11 compatible matches implementation.
 * @param {?} element
 * @param {?} selector
 * @return {?}
 */
function matches(element, selector) {
    return element.matches ?
        element.matches(selector) :
        ((/** @type {?} */ (element)))['msMatchesSelector'](selector);
}
/**
 * IE 11 compatible closest implementation.
 * @param {?} element
 * @param {?} selector
 * @return {?}
 */
function closest(element, selector) {
    if (!(element instanceof Node)) {
        return null;
    }
    /** @type {?} */
    let curr = element;
    while (curr != null && !(curr instanceof Element && matches(curr, selector))) {
        curr = curr.parentNode;
    }
    return (/** @type {?} */ ((curr || null)));
}
/**
 * @param {?} el
 * @return {?}
 */
function findRowRenderedIndex(el) {
    /** @type {?} */
    const rows = Array.from(closest(el, 'pbl-cdk-table').querySelectorAll('pbl-ngrid-row'));
    return rows.indexOf(el);
}
/**
 * @param {?} el
 * @return {?}
 */
function findCellRenderedIndex(el) {
    /** @type {?} */
    const rowEl = (/** @type {?} */ (closest(el, 'pbl-ngrid-row')));
    /** @type {?} */
    const cells = Array.from(rowEl.querySelectorAll('pbl-ngrid-cell'));
    return [findRowRenderedIndex(rowEl), cells.indexOf(el)];
}
/**
 * Resolves the context from one of the possible types in `CellReference`.
 * If the context is within the view it will return the `PblCellContext instance, otherwise it will
 * return a tuple with the first item being the row context state and the seconds item pointing to the cell index.
 *
 * If no context is found, returns undefined.
 * @param {?} cellRef
 * @param {?} context
 * @return {?}
 */
function resolveCellReference(cellRef, context) {
    /** @type {?} */
    let rowIdent;
    /** @type {?} */
    let colIndex;
    if (isGridDataPoint(cellRef)) {
        rowIdent = cellRef.rowIdent;
        colIndex = cellRef.colIndex;
    }
    else if (isCellContext(cellRef)) {
        rowIdent = cellRef.rowContext.identity;
        colIndex = cellRef.index;
    }
    else {
        const [r, c] = findCellRenderedIndex(cellRef);
        /** @type {?} */
        const rowContext = context.viewCache.get(r);
        if (rowContext) {
            /** @type {?} */
            const column = context.columnApi.findColumnAt(c);
            /** @type {?} */
            const columnIndex = context.columnApi.indexOf(column);
            return rowContext.cell(columnIndex);
        }
        else {
            return;
        }
    }
    /** @type {?} */
    const rowState = context.cache.get(rowIdent);
    if (rowState) {
        /** @type {?} */
        const rowContext = context.extApi.grid.contextApi.findRowInView(rowState.identity);
        if (rowContext) {
            return rowContext.cell(colIndex);
        }
        else {
            /** @type {?} */
            const cellState = rowState.cells[colIndex];
            if (cellState) {
                return [rowState, colIndex];
            }
        }
    }
}
/**
 * @param {?} obj
 * @return {?}
 */
function isGridDataPoint(obj) {
    return 'rowIdent' in obj && 'colIndex' in obj;
}
/**
 * @param {?} obj
 * @return {?}
 */
function isCellContext(obj) {
    return 'rowContext' in obj && 'index' in obj;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class ContextApi {
    /**
     * @param {?} extApi
     */
    constructor(extApi) {
        this.extApi = extApi;
        this.viewCache = new Map();
        this.cache = new Map();
        this.activeSelected = [];
        this.focusChanged$ = new BehaviorSubject({ prev: undefined, curr: undefined });
        this.selectionChanged$ = new Subject();
        /**
         * Notify when the focus has changed.
         *
         * > Note that the notification is not immediate, it will occur on the closest micro-task after the change.
         */
        this.focusChanged = this.focusChanged$
            .pipe(buffer(this.focusChanged$.pipe(debounceTime(0, asapScheduler))), map((/**
         * @param {?} events
         * @return {?}
         */
        events => ({ prev: events[0].prev, curr: events[events.length - 1].curr }))));
        /**
         * Notify when the selected cells has changed.
         */
        this.selectionChanged = this.selectionChanged$.asObservable();
        this.vcRef = extApi.cdkTable._rowOutlet.viewContainer;
        this.columnApi = extApi.grid.columnApi;
        extApi.events
            .pipe(filter$1((/**
         * @param {?} e
         * @return {?}
         */
        e => e.kind === 'onDestroy')))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => this.destroy()));
        /** @type {?} */
        const updateContext = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const viewPortRect = this.getViewRect();
            /** @type {?} */
            const lastView = new Set(Array.from(this.viewCache.values()).map((/**
             * @param {?} v
             * @return {?}
             */
            v => v.identity)));
            /** @type {?} */
            const unmatchedRefs = new Map();
            /** @type {?} */
            let keepProcessOutOfView = !!viewPortRect;
            for (let i = 0, len = this.vcRef.length; i < len; i++) {
                /** @type {?} */
                const viewRef = this.findViewRef(i);
                /** @type {?} */
                const rowContext = this.findRowContext(viewRef, i);
                this.viewCache.set(i, rowContext);
                lastView.delete(rowContext.identity);
                // Identity did not change but context did change
                // This is probably due to trackBy with index reference or that matched data on some property but the actual data reference changed.
                // We log these and handle them later, they come in pair and we need to switch the context between the values in the pair.
                // The pair is a 2 item tuple - 1st item is new index, 2nd item is the old index.
                // We build the pairs, each pair is a switch
                if (viewRef.context.$implicit !== rowContext.$implicit) {
                    /** @type {?} */
                    let pair = unmatchedRefs.get(rowContext.$implicit) || [-1, -1];
                    pair[1] = i;
                    unmatchedRefs.set(rowContext.$implicit, pair);
                    pair = unmatchedRefs.get(viewRef.context.$implicit) || [-1, -1];
                    pair[0] = i;
                    unmatchedRefs.set(viewRef.context.$implicit, pair);
                }
                if (keepProcessOutOfView) {
                    keepProcessOutOfView = processOutOfView(viewRef, viewPortRect, 'top');
                }
            }
            if (unmatchedRefs.size > 0) {
                // We have pairs but we can't just start switching because when the items move or swap we need
                // to update their values and so we need to cache one of them.
                // The operation will effect all items (N) between then origin and destination.
                // When N === 2 its a swap, when N > 2 its a move.
                // In both cases the first and last operations share the same object.
                // Also, we need to make sure that the order of operations does not use the same row as the source more then once.
                // For example, If I copy row 5 to to row 4 and then 4 to 3 I need to start from 3->4->5, if I do 5->4->3 I will get 5 in all rows.
                //
                // We use the source (pair[1]) for sorting, the sort order depends on the direction of the move (up/down).
                /** @type {?} */
                const arr = Array.from(unmatchedRefs.entries()).filter((/**
                 * @param {?} entry
                 * @return {?}
                 */
                entry => {
                    /** @type {?} */
                    const pair = entry[1];
                    if (pair[0] === -1) {
                        return false;
                    }
                    else if (pair[1] === -1) {
                        /** @type {?} */
                        const to = this.viewCache.get(pair[0]);
                        to.$implicit = entry[0];
                        return false;
                    }
                    return true;
                })).map((/**
                 * @param {?} entry
                 * @return {?}
                 */
                entry => entry[1]));
                unmatchedRefs.clear();
                if (arr.length) {
                    /** @type {?} */
                    const sortFn = arr[arr.length - 1][0] - arr[arr.length - 1][1] > 0 // check sort direction
                        ? (/**
                         * @param {?} a
                         * @param {?} b
                         * @return {?}
                         */
                        (a, b) => b[1] - a[1])
                        : (/**
                         * @param {?} a
                         * @param {?} b
                         * @return {?}
                         */
                        (a, b) => a[1] - b[1]);
                    arr.sort(sortFn);
                    /** @type {?} */
                    const lastOp = {
                        data: this.viewCache.get(arr[0][0]).$implicit,
                        state: this.viewCache.get(arr[0][0]).getState(),
                        pair: arr.pop(),
                    };
                    for (const pair of arr) {
                        // What we're doing here is switching the context wrapped by `RotContext` while the `RowContext` preserve it's identity.
                        // Each row context has a state, which is valid for it's current context, if we switch context we must switch state as well and also
                        // cache it.
                        /** @type {?} */
                        const to = this.viewCache.get(pair[0]);
                        /** @type {?} */
                        const from = this.viewCache.get(pair[1]);
                        /** @type {?} */
                        const state = from.getState();
                        state.identity = to.identity;
                        this.cache.set(to.identity, state);
                        to.fromState(state);
                        to.$implicit = from.$implicit;
                    }
                    /** @type {?} */
                    const to = this.viewCache.get(lastOp.pair[0]);
                    lastOp.state.identity = to.identity;
                    this.cache.set(to.identity, lastOp.state);
                    to.fromState(lastOp.state);
                    to.$implicit = lastOp.data;
                }
            }
            if (viewPortRect) {
                for (let i = this.vcRef.length - 1; i > -1; i--) {
                    if (!processOutOfView(this.findViewRef(i), viewPortRect, 'bottom')) {
                        break;
                    }
                }
            }
            lastView.forEach((/**
             * @param {?} ident
             * @return {?}
             */
            ident => this.cache.get(ident).firstRender = false));
        });
        updateContext();
        extApi.cdkTable.onRenderRows.subscribe(updateContext);
    }
    /**
     * The reference to currently focused cell context.
     * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
     *
     * > Note that when virtual scroll is enabled the currently focused cell does not have to exist in the view.
     * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
     * @return {?}
     */
    get focusedCell() {
        return this.activeFocused ? Object.assign({}, this.activeFocused) : undefined;
    }
    /**
     * The reference to currently selected range of cell's context.
     * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
     *
     * > Note that when virtual scroll is enabled the currently selected cells does not have to exist in the view.
     * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
     * @return {?}
     */
    get selectedCells() {
        return this.activeSelected.slice();
    }
    /**
     * Focus the provided cell.
     * If a cell is not provided will un-focus (blur) the currently focused cell (if there is one).
     * @param {?=} cellRef A Reference to the cell
     * @param {?=} markForCheck Mark the row for change detection
     * @return {?}
     */
    focusCell(cellRef, markForCheck) {
        if (!cellRef || cellRef === true) {
            if (this.activeFocused) {
                const { rowIdent, colIndex } = this.activeFocused;
                this.activeFocused = undefined;
                this.updateState(rowIdent, colIndex, { focused: false });
                this.emitFocusChanged(this.activeFocused);
                if (markForCheck) {
                    /** @type {?} */
                    const rowContext = this.findRowInView(rowIdent);
                    if (rowContext) {
                        this.extApi.grid._cdkTable.syncRows('data', rowContext.index);
                    }
                }
            }
        }
        else {
            /** @type {?} */
            const ref = resolveCellReference(cellRef, (/** @type {?} */ (this)));
            if (ref) {
                this.focusCell(markForCheck);
                if (ref instanceof PblCellContext) {
                    if (!ref.focused && !this.extApi.grid.viewport.isScrolling) {
                        this.updateState(ref.rowContext.identity, ref.index, { focused: true });
                        this.activeFocused = { rowIdent: ref.rowContext.identity, colIndex: ref.index };
                        this.selectCells([this.activeFocused], markForCheck, true);
                        if (markForCheck) {
                            this.extApi.grid._cdkTable.syncRows('data', ref.rowContext.index);
                        }
                    }
                }
                else {
                    this.updateState(ref[0].identity, ref[1], { focused: true });
                    this.activeFocused = { rowIdent: ref[0].identity, colIndex: ref[1] };
                }
                this.emitFocusChanged(this.activeFocused);
            }
        }
    }
    /**
     * Select all provided cells.
     * @param {?} cellRefs
     * @param {?=} markForCheck Mark the row for change detection
     * @param {?=} clearCurrent Clear the current selection before applying the new selection.
     * Default to false (add to current).
     * @return {?}
     */
    selectCells(cellRefs, markForCheck, clearCurrent) {
        /** @type {?} */
        const toMarkRendered = new Set();
        if (clearCurrent) {
            this.unselectCells();
        }
        /** @type {?} */
        const added = [];
        for (const cellRef of cellRefs) {
            /** @type {?} */
            const ref = resolveCellReference(cellRef, (/** @type {?} */ (this)));
            if (ref instanceof PblCellContext) {
                if (!ref.selected && !this.extApi.grid.viewport.isScrolling) {
                    /** @type {?} */
                    const rowIdent = ref.rowContext.identity;
                    /** @type {?} */
                    const colIndex = ref.index;
                    this.updateState(rowIdent, colIndex, { selected: true });
                    /** @type {?} */
                    const dataPoint = { rowIdent, colIndex };
                    this.activeSelected.push(dataPoint);
                    added.push(dataPoint);
                    if (markForCheck) {
                        toMarkRendered.add(ref.rowContext.index);
                    }
                }
            }
            else if (ref) {
                const [rowState, colIndex] = ref;
                if (!rowState.cells[colIndex].selected) {
                    this.updateState(rowState.identity, colIndex, { selected: true });
                    this.activeSelected.push({ rowIdent: rowState.identity, colIndex });
                }
            }
        }
        if (toMarkRendered.size > 0) {
            this.extApi.grid._cdkTable.syncRows('data', ...Array.from(toMarkRendered.values()));
        }
        this.selectionChanged$.next({ added, removed: [] });
    }
    /**
     * Unselect all provided cells.
     * If cells are not provided will un-select all currently selected cells.
     * @param {?=} cellRefs
     * @param {?=} markForCheck Mark the row for change detection
     * @return {?}
     */
    unselectCells(cellRefs, markForCheck) {
        /** @type {?} */
        const toMarkRendered = new Set();
        /** @type {?} */
        let toUnselect = this.activeSelected;
        /** @type {?} */
        let removeAll = true;
        if (Array.isArray(cellRefs)) {
            toUnselect = cellRefs;
            removeAll = false;
        }
        else {
            markForCheck = !!cellRefs;
            this.activeSelected = [];
        }
        /** @type {?} */
        const removed = [];
        for (const cellRef of toUnselect) {
            /** @type {?} */
            const ref = resolveCellReference(cellRef, (/** @type {?} */ (this)));
            if (ref instanceof PblCellContext) {
                if (ref.selected) {
                    /** @type {?} */
                    const rowIdent = ref.rowContext.identity;
                    /** @type {?} */
                    const colIndex = ref.index;
                    this.updateState(rowIdent, colIndex, { selected: false });
                    if (!removeAll) {
                        /** @type {?} */
                        const wasRemoved = removeFromArray(this.activeSelected, (/**
                         * @param {?} item
                         * @return {?}
                         */
                        item => item.colIndex === colIndex && item.rowIdent === rowIdent));
                        if (wasRemoved) {
                            removed.push({ rowIdent, colIndex });
                        }
                    }
                    if (markForCheck) {
                        toMarkRendered.add(ref.rowContext.index);
                    }
                }
            }
            else if (ref) {
                const [rowState, colIndex] = ref;
                if (rowState.cells[colIndex].selected) {
                    this.updateState(rowState.identity, colIndex, { selected: false });
                    if (!removeAll) {
                        /** @type {?} */
                        const wasRemoved = removeFromArray(this.activeSelected, (/**
                         * @param {?} item
                         * @return {?}
                         */
                        item => item.colIndex === colIndex && item.rowIdent === rowState.identity));
                        if (wasRemoved) {
                            removed.push({ rowIdent: rowState.identity, colIndex });
                        }
                    }
                }
            }
        }
        if (toMarkRendered.size > 0) {
            this.extApi.grid._cdkTable.syncRows('data', ...Array.from(toMarkRendered.values()));
        }
        this.selectionChanged$.next({ added: [], removed });
    }
    /**
     * @return {?}
     */
    clear() {
        for (let i = 0, len = this.vcRef.length; i < len; i++) {
            /** @type {?} */
            const viewRef = this.findViewRef(i);
            viewRef.context.pblRowContext = undefined;
        }
        this.viewCache.clear();
        this.cache.clear();
    }
    /**
     * @param {?} row
     * @return {?}
     */
    getRow(row) {
        /** @type {?} */
        const index = typeof row === 'number' ? row : findRowRenderedIndex(row);
        return this.rowContext(index);
    }
    /**
     * @param {?} rowOrCellElement
     * @param {?=} col
     * @return {?}
     */
    getCell(rowOrCellElement, col) {
        if (typeof rowOrCellElement === 'number') {
            /** @type {?} */
            const rowContext = this.rowContext(rowOrCellElement);
            if (rowContext) {
                return rowContext.cell(col);
            }
        }
        else {
            /** @type {?} */
            const ref = resolveCellReference(rowOrCellElement, (/** @type {?} */ (this)));
            if (ref instanceof PblCellContext) {
                return ref;
            }
        }
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    getDataItem(cell) {
        /** @type {?} */
        const ref = resolveCellReference(cell, (/** @type {?} */ (this)));
        if (ref instanceof PblCellContext) {
            return ref.col.getValue(ref.rowContext.$implicit);
        }
        else if (ref) {
            /** @type {?} */
            const row = this.extApi.grid.ds.source[ref[0].dataIndex];
            /** @type {?} */
            const column = this.extApi.grid.columnApi.findColumnAt(ref[1]);
            return column.getValue(row);
        }
    }
    /**
     * @param {?} renderRowIndex
     * @param {?} column
     * @return {?}
     */
    createCellContext(renderRowIndex, column) {
        /** @type {?} */
        const rowContext = this.rowContext(renderRowIndex);
        /** @type {?} */
        const colIndex = this.columnApi.indexOf(column);
        return rowContext.cell(colIndex);
    }
    /**
     * @param {?} renderRowIndex
     * @return {?}
     */
    rowContext(renderRowIndex) {
        return this.viewCache.get(renderRowIndex);
    }
    /**
     * @param {?} rowContext
     * @return {?}
     */
    updateOutOfViewState(rowContext) {
        /** @type {?} */
        const viewPortRect = this.getViewRect();
        /** @type {?} */
        const viewRef = this.findViewRef(rowContext.index);
        processOutOfView(viewRef, viewPortRect);
    }
    /**
     * @param {?} rowIdentity
     * @param {?} rowStateOrCellIndex
     * @param {?=} cellState
     * @return {?}
     */
    updateState(rowIdentity, rowStateOrCellIndex, cellState) {
        /** @type {?} */
        const currentRowState = this.cache.get(rowIdentity);
        if (currentRowState) {
            if (typeof rowStateOrCellIndex === 'number') {
                /** @type {?} */
                const currentCellState = currentRowState.cells[rowStateOrCellIndex];
                if (currentCellState) {
                    Object.assign(currentCellState, cellState);
                }
            }
            else {
                Object.assign(currentRowState, rowStateOrCellIndex);
            }
            /** @type {?} */
            const rowContext = this.findRowInView(rowIdentity);
            if (rowContext) {
                rowContext.fromState(currentRowState);
            }
        }
    }
    /**
     * Try to find a specific row, using the row identity, in the current view.
     * If the row is not in the view (or even not in the cache) it will return undefined, otherwise returns the row's context instance (`PblRowContext`)
     * @param {?} rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
     * @return {?}
     */
    findRowInView(rowIdentity) {
        /** @type {?} */
        const rowState = this.cache.get(rowIdentity);
        if (rowState) {
            /** @type {?} */
            const renderRowIndex = rowState.dataIndex - this.extApi.grid.ds.renderStart;
            /** @type {?} */
            const rowContext = this.viewCache.get(renderRowIndex);
            if (rowContext && rowContext.identity === rowIdentity) {
                return rowContext;
            }
        }
    }
    /**
     * @param {?} rowIdentity
     * @param {?=} offset
     * @param {?=} create
     * @return {?}
     */
    findRowInCache(rowIdentity, offset, create) {
        /** @type {?} */
        const rowState = this.cache.get(rowIdentity);
        if (!offset) {
            return rowState;
        }
        else {
            /** @type {?} */
            const dataIndex = rowState.dataIndex + offset;
            /** @type {?} */
            const identity = this.getRowIdentity(dataIndex);
            if (identity !== null) {
                /** @type {?} */
                let result = this.findRowInCache(identity);
                if (!result && create && dataIndex < this.extApi.grid.ds.length) {
                    result = PblRowContext.defaultState(identity, dataIndex, this.columnApi.columns.length);
                    this.cache.set(identity, result);
                }
                return result;
            }
        }
    }
    /**
     * @param {?} dataIndex
     * @param {?=} context
     * @return {?}
     */
    getRowIdentity(dataIndex, context) {
        const { ds } = this.extApi.grid;
        const { primary } = this.extApi.columnStore;
        /** @type {?} */
        const row = context ? context.$implicit : ds.source[dataIndex];
        if (!row) {
            return null;
        }
        else {
            return primary ? primary.getValue(row) : dataIndex;
        }
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    findViewRef(index) {
        return (/** @type {?} */ (this.vcRef.get(index)));
    }
    /**
     * Find/Update/Create the `RowContext` for the provided `EmbeddedViewRef` at the provided render position.
     *
     * A `RowContext` object is a wrapper for the internal context of a row in `CdkTable` with the purpose of
     * extending it for the grid features.
     *
     * The process has 2 layers of cache:
     *
     * - `RowContext` objects are stored in a view cache which is synced with the `CdkTable` row outlet viewRefs.
     * Each view ref (row) has a matching record in the `RowContext` view cache.
     *
     * - `RowContextState` object are stored in a cache which is synced with the items in the data source.
     * Each item in the datasource has a matching row `RowContextState` item (lazy), which is used to persist context
     * when `RowContext` goes in/out of the viewport.
     *
     * @private
     * @param {?} viewRef The `EmbeddedViewRef` holding the context that the returned `RowContext` should wrap
     * @param {?} renderRowIndex The position of the view, relative to other rows.
     * The position is required for caching the context state when a specific row is thrown out of the viewport (virtual scroll).
     * Each `RowContext` gets a unique identity using the position relative to the current render range in the data source.
     * @return {?}
     */
    findRowContext(viewRef, renderRowIndex) {
        const { context } = viewRef;
        /** @type {?} */
        const dataIndex = this.extApi.grid.ds.renderStart + renderRowIndex;
        /** @type {?} */
        const identity = this.getRowIdentity(dataIndex, viewRef.context);
        /** @type {?} */
        let rowContext = (/** @type {?} */ (context.pblRowContext));
        if (!this.cache.has(identity)) {
            this.cache.set(identity, PblRowContext.defaultState(identity, dataIndex, this.columnApi.columns.length));
        }
        if (!rowContext) {
            rowContext = context.pblRowContext = new PblRowContext(identity, dataIndex, this.extApi);
            rowContext.updateContext(context);
            viewRef.onDestroy((/**
             * @return {?}
             */
            () => {
                this.viewCache.delete(renderRowIndex);
                context.pblRowContext = undefined;
            }));
        }
        else if (rowContext.identity !== identity) {
            // save old state before applying new state
            this.cache.set(rowContext.identity, rowContext.getState());
            rowContext.updateContext(context);
            // We
            /** @type {?} */
            const gap = dataIndex - rowContext.dataIndex;
            if (gap > 0) {
                /** @type {?} */
                const siblingViewRef = this.findViewRef(renderRowIndex + gap);
                /** @type {?} */
                const siblingRowContext = siblingViewRef && (/** @type {?} */ (siblingViewRef.context.pblRowContext));
                if (siblingRowContext) {
                    this.cache.set(siblingRowContext.identity, siblingRowContext.getState());
                }
            }
        }
        else {
            return rowContext;
        }
        rowContext.fromState(this.cache.get(identity));
        return rowContext;
    }
    /**
     * @private
     * @return {?}
     */
    getViewRect() {
        return this.extApi.grid.viewport.elementRef.nativeElement.getBoundingClientRect();
    }
    /**
     * @private
     * @param {?} curr
     * @return {?}
     */
    emitFocusChanged(curr) {
        this.focusChanged$.next({
            prev: this.focusChanged$.value.curr,
            curr,
        });
    }
    /**
     * @private
     * @return {?}
     */
    destroy() {
        this.focusChanged$.complete();
        this.selectionChanged$.complete();
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.viewCache;
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.cache;
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.vcRef;
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.columnApi;
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.activeFocused;
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.activeSelected;
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.focusChanged$;
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.selectionChanged$;
    /**
     * Notify when the focus has changed.
     *
     * > Note that the notification is not immediate, it will occur on the closest micro-task after the change.
     * @type {?}
     */
    ContextApi.prototype.focusChanged;
    /**
     * Notify when the selected cells has changed.
     * @type {?}
     */
    ContextApi.prototype.selectionChanged;
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.extApi;
}
/**
 * @param {?} viewRef
 * @param {?} viewPortRect
 * @param {?=} location
 * @return {?}
 */
function processOutOfView(viewRef, viewPortRect, location) {
    /** @type {?} */
    const el = viewRef.rootNodes[0];
    /** @type {?} */
    const rowContext = viewRef.context.pblRowContext;
    /** @type {?} */
    const elRect = el.getBoundingClientRect();
    /** @type {?} */
    let isInsideOfView;
    switch (location) {
        case 'top':
            isInsideOfView = elRect.bottom >= viewPortRect.top;
            break;
        case 'bottom':
            isInsideOfView = elRect.top <= viewPortRect.bottom;
            break;
        default:
            isInsideOfView = (elRect.bottom >= viewPortRect.top && elRect.top <= viewPortRect.bottom);
            break;
    }
    if (isInsideOfView) {
        if (!rowContext.outOfView) {
            return false;
        }
        rowContext.outOfView = false;
    }
    else {
        rowContext.outOfView = true;
    }
    return true;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function BoxModelSpaceStrategy() { }
if (false) {
    /**
     * @param {?} col
     * @return {?}
     */
    BoxModelSpaceStrategy.prototype.cell = function (col) { };
    /**
     * @param {?} col
     * @return {?}
     */
    BoxModelSpaceStrategy.prototype.groupCell = function (col) { };
    /**
     * @param {?} cols
     * @return {?}
     */
    BoxModelSpaceStrategy.prototype.group = function (cols) { };
}
/**
 * A column width calculator that calculates column width for a specific column or a group of columns.
 * It also provide the minimum required row width for the total columns added up to that point.
 *
 * The `DynamicColumnWidthLogic` takes into account real-time DOM measurements (especially box-model metadata), hence "dynamic".
 * It performs the calculation based on `PblColumn` and actual DOM size metadata.
 *
 * The `DynamicColumnWidthLogic` has 3 responsibilities:
 *
 * - It is responsible for enforcing the `maxWidth` boundary constraint for every column it processes by calculating the actual width
 * of a column and calling `PblColumn.checkMaxWidthLock` to verify if max width lock has changed due to the new actual width.
 *
 * - It calculates the absolute width for a group of columns, so `PblCdkVirtualScrollViewportComponentGroupColumn` can have an exact size that wraps it's children.
 *
 * - It calculates the `minimumRowWidth`, which represents the minimum width required width of the row, i.e. table.
 *
 * > Note that an instance of `DynamicColumnWidthLogic` represents a one-time pass for all columns, for every run a new instance is required.
 */
class DynamicColumnWidthLogic {
    /**
     * @param {?} strategy
     */
    constructor(strategy) {
        this.strategy = strategy;
        this.cols = new Map();
        this._minimumRowWidth = 0;
    }
    /**
     * @return {?}
     */
    get minimumRowWidth() { return this._minimumRowWidth; }
    ;
    /**
     * Returns a breakout of the width of the column, breaking it into the width of the content and the rest of the width
     * @param {?} columnInfo
     * @return {?}
     */
    widthBreakout(columnInfo) {
        return widthBreakout(this.strategy, columnInfo);
    }
    /**
     * Add a column to the calculation.
     *
     * The operation will update the minimum required width and trigger a `checkMaxWidthLock` on the column.
     * If the max width lock has changed the `maxWidthLockChanged` is set to true.
     *
     * A column that was previously added is ignored.
     *
     * Note that once `maxWidthLockChanged` is set to true it will never change.
     * @param {?} columnInfo
     * @return {?}
     */
    addColumn(columnInfo) {
        if (!this.cols.has(columnInfo)) {
            const { column } = columnInfo;
            /** @type {?} */
            let minWidth = column.minWidth || 0;
            if (column.isFixedWidth) {
                minWidth = Math.max(column.parsedWidth.value, minWidth);
            }
            /** @type {?} */
            const nonContent = this.strategy.cell(columnInfo);
            /** @type {?} */
            const width = minWidth + nonContent;
            this.cols.set(columnInfo, width);
            this._minimumRowWidth += width;
            if (column.maxWidth) {
                /** @type {?} */
                const actualWidth = columnInfo.width - nonContent;
                if (column.checkMaxWidthLock(actualWidth)) {
                    this.maxWidthLockChanged = true;
                }
            }
        }
    }
    /**
     * Run each of the columns through `addColumn` and returns the sum of the width all columns using
     * the box model space strategy.
     *
     * The result represents the absolute width to be used in a `PblColumnGroup`.
     *
     * > Note that when a table has multiple column-group rows each column is the child of multiple group column, hence calling `addColumn` with the
     * same group more then once. However, since `addColumn()` ignores columns it already processed it is safe.
     * @param {?} columnInfos
     * @return {?}
     */
    addGroup(columnInfos) {
        /** @type {?} */
        let sum = 0;
        for (const c of columnInfos) {
            this.addColumn(c);
            sum += c.width;
        }
        sum -= this.strategy.group(columnInfos);
        return sum;
    }
}
if (false) {
    /**
     * When true, it indicates that one (or more) columns has changed the max width lock state.
     * \@readonly
     * @type {?}
     */
    DynamicColumnWidthLogic.prototype.maxWidthLockChanged;
    /**
     * @type {?}
     * @private
     */
    DynamicColumnWidthLogic.prototype.cols;
    /**
     * @type {?}
     * @private
     */
    DynamicColumnWidthLogic.prototype._minimumRowWidth;
    /** @type {?} */
    DynamicColumnWidthLogic.prototype.strategy;
    /* Skipping unhandled member: ;*/
}
/**
 * Returns a breakout of the width of the column, breaking it into the width of the content and the rest of the width
 * @param {?} strategy
 * @param {?} columnInfo
 * @return {?}
 */
function widthBreakout(strategy, columnInfo) {
    /** @type {?} */
    const nonContent = strategy.cell(columnInfo);
    return {
        content: columnInfo.width - nonContent,
        nonContent,
    };
}
/** @type {?} */
const DYNAMIC_PADDING_BOX_MODEL_SPACE_STRATEGY = {
    /**
     * @param {?} col
     * @return {?}
     */
    cell(col) {
        /** @type {?} */
        const style = col.style;
        return parseInt(style.paddingLeft) + parseInt(style.paddingRight);
    },
    /**
     * @param {?} col
     * @return {?}
     */
    groupCell(col) {
        return 0;
    },
    /**
     * @param {?} cols
     * @return {?}
     */
    group(cols) {
        /** @type {?} */
        const len = cols.length;
        return len > 0 ? parseInt(cols[0].style.paddingLeft) + parseInt(cols[len - 1].style.paddingRight) : 0;
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function AutoSizeToFitOptions() { }
if (false) {
    /**
     * When `px` will force all columns width to be in fixed pixels
     * When `%` will force all column width to be in %
     * otherwise (default) the width will be set in the same format it was originally set.
     * e.g.: If width was `33%` the new width will also be in %, or if width not set the new width will not be set as well.
     *
     * Does not apply when columnBehavior is set and returns a value.
     * @type {?|undefined}
     */
    AutoSizeToFitOptions.prototype.forceWidthType;
    /**
     * When true will keep the `minWidth` column definition (when set), otherwise will clear it.
     * Does not apply when columnBehavior is set and returns a value.
     * @type {?|undefined}
     */
    AutoSizeToFitOptions.prototype.keepMinWidth;
    /**
     * When true will keep the `maxWidth` column definition (when set), otherwise will clear it.
     * Does not apply when columnBehavior is set and returns a value.
     * @type {?|undefined}
     */
    AutoSizeToFitOptions.prototype.keepMaxWidth;
    /**
     * A function for per-column fine tuning of the process.
     * The function receives the `PblColumn`, its relative width (in %, 0 to 1) and total width (in pixels) and should return
     * an object describing how it should auto fit.
     *
     * When the function returns undefined the options are taken from the root.
     * @param {?} column
     * @return {?}
     */
    AutoSizeToFitOptions.prototype.columnBehavior = function (column) { };
}
/**
 * @template T
 */
class ColumnApi {
    /**
     * @private
     */
    constructor() { }
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
    /**
     * @template T
     * @param {?} grid
     * @param {?} store
     * @param {?} extApi
     * @return {?}
     */
    static create(grid, store, extApi) {
        /** @type {?} */
        const instance = new ColumnApi();
        instance.grid = grid;
        instance.store = store;
        instance.extApi = extApi;
        return instance;
    }
    /**
     * @return {?}
     */
    get groupByColumns() { return this.store.groupBy; }
    /**
     * @return {?}
     */
    get visibleColumnIds() { return this.store.columnIds; }
    /**
     * @return {?}
     */
    get visibleColumns() { return this.store.columns; }
    /**
     * @return {?}
     */
    get columns() { return this.store.allColumns; }
    /**
     * @return {?}
     */
    get totalColumnWidthChange() {
        if (!this._totalColumnWidthChange) {
            this._totalColumnWidthChange = this.extApi.events
                .pipe(filter$1((/**
             * @param {?} event
             * @return {?}
             */
            event => event.kind === 'onResizeRow')), map((/**
             * @param {?} e
             * @return {?}
             */
            e => this.grid.columnApi.visibleColumns.reduce((/**
             * @param {?} p
             * @param {?} c
             * @return {?}
             */
            (p, c) => p + c.sizeInfo.width), 0))));
        }
        return this._totalColumnWidthChange;
    }
    /**
     * Returns the `PblColumn` at the specified index from the list of rendered columns (i.e. not hidden).
     * @param {?} renderColumnIndex
     * @return {?}
     */
    findColumnAt(renderColumnIndex) {
        return this.store.columns[renderColumnIndex];
    }
    /**
     * Returns the column matching provided `id`.
     *
     * The search is performed on all known columns.
     * @param {?} id
     * @return {?}
     */
    findColumn(id) {
        /** @type {?} */
        const result = this.store.find(id);
        if (result) {
            return result.data;
        }
    }
    /**
     * Returns the render index of column or -1 if not found.
     *
     * The render index represents the current location of the column in the group of visible columns.
     * @param {?} column
     * @return {?}
     */
    renderIndexOf(column) {
        /** @type {?} */
        const c = typeof column === 'string' ? this.findColumn(column) : column;
        return this.store.columns.indexOf(c);
    }
    /**
     * Returns the index of a column or -1 if not found.
     * @param {?} column
     * @return {?}
     */
    indexOf(column) {
        /** @type {?} */
        const c = typeof column === 'string' ? this.findColumn(column) : column;
        return this.store.allColumns.indexOf(c);
    }
    /**
     * Update the width of the column with the provided width.
     *
     * The width is set in px or % in the following format: ##% or ##px
     * Examples: '50%', '50px'
     *
     * Resizing the column will trigger a table width resizing event, updating column group if necessary.
     * @param {?} column
     * @param {?} width
     * @return {?}
     */
    resizeColumn(column, width) {
        column.updateWidth(width);
        // this.grid.resetColumnsWidth();
        // this.grid.resizeColumns();
    }
    /**
     * Resize the column to best fit it's content.
     *
     * - Content: All of the cells rendered for this column (header, data and footer cells).
     * - Best fit: The width of the cell with the height width measured.
     *
     * The best fit found (width) is then used to call `resizeColumn()`.
     * @param {?} column
     * @return {?}
     */
    autoSizeColumn(column) {
        /** @type {?} */
        const size = this.findColumnAutoSize(column);
        this.resizeColumn(column, `${size}px`);
    }
    // tslint:disable-line:unified-signatures
    /**
     * @param {...?} columns
     * @return {?}
     */
    autoSizeColumns(...columns) {
        /** @type {?} */
        const cols = columns.length > 0 ? columns : this.visibleColumns;
        for (const column of cols) {
            /** @type {?} */
            const size = this.findColumnAutoSize(column);
            column.updateWidth(`${size}px`);
        }
        // this.grid.resetColumnsWidth();
        // this.grid.resizeColumns();
    }
    /**
     * For each visible column in the table, resize the width to a proportional width relative to the total width provided.
     * @param {?} totalWidth
     * @param {?=} options
     * @return {?}
     */
    autoSizeToFit(totalWidth, options = {}) {
        /** @type {?} */
        const wLogic = this.extApi.dynamicColumnWidthFactory();
        const { visibleColumns } = this;
        /** @type {?} */
        const columnBehavior = options.columnBehavior || (/** @type {?} */ (((/**
         * @return {?}
         */
        () => options))));
        /** @type {?} */
        let overflowTotalWidth = 0;
        /** @type {?} */
        let totalMinWidth = 0;
        /** @type {?} */
        const withMinWidth = [];
        /** @type {?} */
        const widthBreakouts = visibleColumns.map((/**
         * @param {?} column
         * @param {?} index
         * @return {?}
         */
        (column, index) => {
            /** @type {?} */
            const widthBreakout = wLogic.widthBreakout(column.sizeInfo);
            /** @type {?} */
            const instructions = Object.assign({}, (columnBehavior(column) || {}), options);
            overflowTotalWidth += widthBreakout.content;
            totalWidth -= widthBreakout.nonContent;
            if (instructions.keepMinWidth && column.minWidth) {
                totalMinWidth += column.minWidth;
                withMinWidth.push(index);
            }
            return Object.assign({}, widthBreakout, { instructions });
        }));
        /** @type {?} */
        const p = totalMinWidth / totalWidth;
        /** @type {?} */
        const level = (overflowTotalWidth * p - totalMinWidth) / (1 - p);
        for (const i of withMinWidth) {
            /** @type {?} */
            const addition = level * (visibleColumns[i].minWidth / totalMinWidth);
            widthBreakouts[i].content += addition;
            overflowTotalWidth += addition;
        }
        for (let i = 0; i < visibleColumns.length; i++) {
            /** @type {?} */
            const widthBreakout = widthBreakouts[i];
            /** @type {?} */
            const instructions = widthBreakout.instructions;
            /** @type {?} */
            const column = visibleColumns[i];
            /** @type {?} */
            const r = widthBreakout.content / overflowTotalWidth;
            if (!instructions.keepMinWidth || !column.minWidth) {
                column.minWidth = undefined;
            }
            if (!instructions.keepMaxWidth || !column.maxWidth) {
                column.maxWidth = undefined;
                column.checkMaxWidthLock(column.sizeInfo.width); // if its locked, we need to release...
            }
            // There are 3 scenarios when updating the column
            // 1) if it's a fixed width or we're force into fixed width
            // 2) Not fixed width and width is set (%)
            // 3) Not fixed width an width is not set ( the width depends on the calculated `defaultWidth` done in `this.grid.resetColumnsWidth()` )
            /** @type {?} */
            let width;
            const { forceWidthType } = instructions;
            if (forceWidthType === 'px' || (!forceWidthType && column.isFixedWidth)) { // (1)
                width = `${totalWidth * r}px`;
            }
            else if (forceWidthType === '%' || (!forceWidthType && column.width)) { // (2)
                width = `${100 * r}%`;
            } // else (3) -> the update is skipped and it will run through resetColumnsWidth
            if (width) {
                column.updateWidth(width);
            }
        }
        // we now reset the column widths, this will calculate a new `defaultWidth` and set it in all columns but the relevant ones are column from (3)
        // It will also mark all columnDefs for check
        this.grid.resetColumnsWidth();
        this.grid.resizeColumns();
    }
    // tslint:disable-line:unified-signatures
    /**
     * @param {?} column
     * @param {?} anchor
     * @param {?=} skipRedraw
     * @return {?}
     */
    moveColumn(column, anchor, skipRedraw) {
        if (isPblColumn(anchor)) {
            /** @type {?} */
            const result = column === anchor ? false : this.store.moveColumn(column, anchor);
            if (result && skipRedraw !== true) {
                this.afterColumnPositionChange();
            }
            return result;
        }
        else {
            /** @type {?} */
            const a = this.findColumnAt(anchor);
            return a ? this.moveColumn(column, a) : false;
        }
    }
    /**
     * Swap positions between 2 existing columns.
     * @param {?} col1
     * @param {?} col2
     * @param {?=} skipRedraw
     * @return {?}
     */
    swapColumns(col1, col2, skipRedraw) {
        /** @type {?} */
        const result = this.store.swapColumns(col1, col2);
        if (result && skipRedraw !== true) {
            this.afterColumnPositionChange();
        }
        return result;
    }
    /**
     * @param {...?} column
     * @return {?}
     */
    addGroupBy(...column) { this.store.addGroupBy(...column); }
    /**
     * @param {...?} column
     * @return {?}
     */
    removeGroupBy(...column) { this.store.removeGroupBy(...column); }
    /**
     * @private
     * @param {?} column
     * @return {?}
     */
    findColumnAutoSize(column) {
        const { columnDef } = column;
        /** @type {?} */
        const cells = columnDef.queryCellElements();
        /** @type {?} */
        let size = 0;
        for (const c of cells) {
            /** @type {?} */
            const element = (/** @type {?} */ ((c.firstElementChild || c)));
            if (element.scrollWidth > size) {
                size = element.scrollWidth + 1;
                // we add 1 pixel because `element.scrollWidth` does not support subpixel values, the width is converted to an integer removing subpixel values (fractions).
            }
        }
        return size;
    }
    /**
     * @private
     * @return {?}
     */
    afterColumnPositionChange() {
        this.extApi.contextApi.clear();
        this.store.updateGroups();
        this.grid.resetColumnsWidth();
        this.grid.resizeColumns();
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ColumnApi.prototype.grid;
    /**
     * @type {?}
     * @private
     */
    ColumnApi.prototype.store;
    /**
     * @type {?}
     * @private
     */
    ColumnApi.prototype.extApi;
    /**
     * @type {?}
     * @private
     */
    ColumnApi.prototype._totalColumnWidthChange;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function metaRowSectionFactory() {
    return { fixed: [], row: [], sticky: [], all: [] };
}
/**
 * @record
 */
function MetaRowSection() { }
if (false) {
    /** @type {?} */
    MetaRowSection.prototype.fixed;
    /** @type {?} */
    MetaRowSection.prototype.row;
    /** @type {?} */
    MetaRowSection.prototype.sticky;
    /** @type {?} */
    MetaRowSection.prototype.all;
}
/**
 * @template T
 */
class PblNgridMetaRowService {
    /**
     * @param {?} extApi
     */
    constructor(extApi) {
        this.extApi = extApi;
        this.header = metaRowSectionFactory();
        this.footer = metaRowSectionFactory();
        this.sync$ = new Subject();
        this.hzScroll$ = new Subject();
        this.sync = this.sync$ // TODO: complete
            .pipe(debounceTime(0, asapScheduler));
        this.hzScroll = this.hzScroll$.asObservable();
        extApi.onInit((/**
         * @return {?}
         */
        () => {
            const { grid } = extApi;
            /** @type {?} */
            let hzOffset = grid.viewport.measureScrollOffset('start');
            /** @type {?} */
            let trackScroll = true;
            grid.viewport.elementScrolled()
                .pipe(filter$1((/**
             * @return {?}
             */
            () => trackScroll)), auditTime(0, animationFrameScheduler))
                .subscribe((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const newOffset = grid.viewport.measureScrollOffset('start');
                if (hzOffset !== newOffset) {
                    this.hzScroll$.next(hzOffset = newOffset);
                }
                else if (grid.viewport.isScrolling) {
                    trackScroll = false;
                    grid.viewport.scrolling
                        .pipe(take(1))
                        .subscribe((/**
                     * @return {?}
                     */
                    () => trackScroll = true));
                }
            }), null, (/**
             * @return {?}
             */
            () => this.hzScroll$.complete()));
        }));
    }
    /**
     * @param {?} metaRow
     * @return {?}
     */
    addMetaRow(metaRow) {
        const { columnStore } = this.extApi;
        const { header, footer } = columnStore.metaColumnIds;
        /** @type {?} */
        const rowDef = metaRow.meta;
        if (rowDef === columnStore.headerColumnDef) {
            if (metaRow.gridWidthRow === true) {
                this.gridWidthRow = { rowDef, el: metaRow.elRef.nativeElement };
                this.header.all.push(rowDef);
            }
            else {
                this.addToSection(this.header, metaRow, columnStore.metaColumnIds.header.length);
            }
        }
        else if (rowDef === columnStore.footerColumnDef) {
            this.addToSection(this.footer, metaRow, 0);
        }
        else {
            /** @type {?} */
            let index = header.findIndex((/**
             * @param {?} h
             * @return {?}
             */
            h => h.rowDef === rowDef));
            if (index > -1) {
                this.addToSection(this.header, metaRow, index);
            }
            else {
                index = footer.findIndex((/**
                 * @param {?} h
                 * @return {?}
                 */
                h => h.rowDef === rowDef));
                if (index > -1) {
                    this.addToSection(this.footer, metaRow, index);
                }
                else {
                    throw new Error('Invalid operation');
                }
            }
        }
        this.sync$.next();
    }
    /**
     * @param {?} metaRow
     * @return {?}
     */
    removeMetaRow(metaRow) {
        /** @type {?} */
        const rowDef = metaRow.meta;
        /** @type {?} */
        let index = this.header.all.indexOf(metaRow.meta);
        if (index > -1) {
            this.header.all.splice(index, 1);
            index = this.header[rowDef.type].findIndex((/**
             * @param {?} h
             * @return {?}
             */
            h => h.rowDef === rowDef));
            this.header[rowDef.type].splice(index, 1);
        }
        else if ((index = this.footer.all.indexOf(metaRow.meta)) > -1) {
            this.footer.all.splice(index, 1);
            index = this.footer[rowDef.type].findIndex((/**
             * @param {?} h
             * @return {?}
             */
            h => h.rowDef === rowDef));
            this.footer[rowDef.type].splice(index, 1);
        }
    }
    /**
     * @private
     * @param {?} section
     * @param {?} metaRow
     * @param {?} index
     * @return {?}
     */
    addToSection(section, metaRow, index) {
        /** @type {?} */
        const rowDef = metaRow.meta;
        section[rowDef.type].push({ index, rowDef, el: metaRow.elRef.nativeElement });
        section.all.push(rowDef);
    }
}
PblNgridMetaRowService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PblNgridMetaRowService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [EXT_API_TOKEN,] }] }
];
if (false) {
    /** @type {?} */
    PblNgridMetaRowService.prototype.gridWidthRow;
    /** @type {?} */
    PblNgridMetaRowService.prototype.header;
    /** @type {?} */
    PblNgridMetaRowService.prototype.footer;
    /** @type {?} */
    PblNgridMetaRowService.prototype.sync;
    /** @type {?} */
    PblNgridMetaRowService.prototype.hzScroll;
    /**
     * @type {?}
     * @private
     */
    PblNgridMetaRowService.prototype.sync$;
    /**
     * @type {?}
     * @private
     */
    PblNgridMetaRowService.prototype.hzScroll$;
    /** @type {?} */
    PblNgridMetaRowService.prototype.extApi;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let PblNgridMetaRowContainerComponent = class PblNgridMetaRowContainerComponent {
    /**
     * @param {?} metaRows
     * @param {?} elRef
     */
    constructor(metaRows, elRef) {
        this.metaRows = metaRows;
        this.element = elRef.nativeElement;
        metaRows.sync.pipe(UnRx(this)).subscribe((/**
         * @return {?}
         */
        () => this.syncRowDefinitions()));
        this.metaRows.extApi.events
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.kind === 'onResizeRow') {
                this._innerWidth = this.metaRows.extApi.grid.viewport.innerWidth;
                this._minWidth = this.metaRows.extApi.cdkTable.minWidth;
                this._width = Math.max(this._innerWidth, this._minWidth);
            }
        }));
        this._width$ = this.metaRows.extApi.grid.columnApi.totalColumnWidthChange;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        if (this._type !== value) {
            this.init(value);
        }
    }
    ;
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    init(type) {
        if (type === 'header') {
            this._type = type;
        }
        else {
            this._type = 'footer';
        }
        /** @type {?} */
        const scrollContainerElement = this.element;
        scrollContainerElement.scrollLeft = this.metaRows.extApi.grid.viewport.measureScrollOffset('start');
        this.metaRows.hzScroll
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} offset
         * @return {?}
         */
        offset => scrollContainerElement.scrollLeft = offset));
        this.metaRows.extApi.cdkTable.onRenderRows
            .pipe(UnRx(this))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._innerWidth = this.metaRows.extApi.grid.viewport.innerWidth;
            this._width = Math.max(this._innerWidth, this._minWidth);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    syncRowDefinitions() {
        /** @type {?} */
        const isHeader = this._type === 'header';
        /** @type {?} */
        const section = isHeader ? this.metaRows.header : this.metaRows.footer;
        /** @type {?} */
        const widthContainer = this.element.firstElementChild;
        /** @type {?} */
        const container = widthContainer.nextElementSibling;
        if (isHeader) {
            widthContainer.appendChild(this.metaRows.gridWidthRow.el);
        }
        for (const def of section.fixed) {
            container.appendChild(def.el);
        }
    }
};
PblNgridMetaRowContainerComponent.ctorParameters = () => [
    { type: PblNgridMetaRowService },
    { type: ElementRef }
];
PblNgridMetaRowContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'div[pbl-ngrid-fixed-meta-row-container]',
                template: `<div class="pbl-cdk-table" [style.width.px]="_width"></div><div class="pbl-cdk-table" [style.width.px]="_width$ | async"></div>`,
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    style: 'flex: 0 0 auto; overflow: hidden;',
                    '[style.width.px]': '_innerWidth',
                }
            }] }
];
/** @nocollapse */
PblNgridMetaRowContainerComponent.ctorParameters = () => [
    { type: PblNgridMetaRowService },
    { type: ElementRef }
];
PblNgridMetaRowContainerComponent.propDecorators = {
    type: [{ type: Input, args: ['pbl-ngrid-fixed-meta-row-container',] }]
};
PblNgridMetaRowContainerComponent = __decorate([
    UnRx(),
    __metadata("design:paramtypes", [PblNgridMetaRowService, ElementRef])
], PblNgridMetaRowContainerComponent);
if (false) {
    /**
     * The inner width of the grid, the viewport width of a row.
     * The width of the grid minus scroll bar.
     * @type {?}
     */
    PblNgridMetaRowContainerComponent.prototype._innerWidth;
    /** @type {?} */
    PblNgridMetaRowContainerComponent.prototype._minWidth;
    /** @type {?} */
    PblNgridMetaRowContainerComponent.prototype._width;
    /** @type {?} */
    PblNgridMetaRowContainerComponent.prototype._width$;
    /**
     * @type {?}
     * @private
     */
    PblNgridMetaRowContainerComponent.prototype._type;
    /**
     * @type {?}
     * @private
     */
    PblNgridMetaRowContainerComponent.prototype.element;
    /** @type {?} */
    PblNgridMetaRowContainerComponent.prototype.metaRows;
    /* Skipping unhandled member: ;*/
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let PblMetaRowDirective = class PblMetaRowDirective {
    /**
     * @param {?} metaRows
     * @param {?} elRef
     * @param {?} gridWidthRow
     */
    constructor(metaRows, elRef, gridWidthRow) {
        this.metaRows = metaRows;
        this.elRef = elRef;
        this.gridWidthRow = gridWidthRow !== null;
    }
    // tslint:disable-next-line:no-input-rename
    /**
     * @return {?}
     */
    get meta() { return this._meta; }
    /**
     * @param {?} value
     * @return {?}
     */
    set meta(value) {
        if (value !== this._meta) {
            this.update(value);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.metaRows.removeMetaRow(this);
    }
    /**
     * @private
     * @param {?} meta
     * @return {?}
     */
    update(meta) {
        /** @type {?} */
        const oldMeta = this._meta;
        if (oldMeta) {
            if (oldMeta.rowClassName) {
                this.elRef.nativeElement.classList.remove(oldMeta.rowClassName);
            }
            this.metaRows.removeMetaRow(this);
        }
        this._meta = meta;
        if (meta) {
            if (meta.rowClassName) {
                this.elRef.nativeElement.classList.add(meta.rowClassName);
            }
            this.metaRows.addMetaRow(this);
        }
    }
};
PblMetaRowDirective.ctorParameters = () => [
    { type: PblNgridMetaRowService },
    { type: ElementRef },
    { type: undefined }
];
PblMetaRowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblMetaRow]',
            },] }
];
/** @nocollapse */
PblMetaRowDirective.ctorParameters = () => [
    { type: PblNgridMetaRowService },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Attribute, args: ['gridWidthRow',] }] }
];
PblMetaRowDirective.propDecorators = {
    meta: [{ type: Input, args: ['pblMetaRow',] }]
};
PblMetaRowDirective = __decorate([
    UnRx(),
    __metadata("design:paramtypes", [PblNgridMetaRowService,
        ElementRef, Object])
], PblMetaRowDirective);
if (false) {
    /** @type {?} */
    PblMetaRowDirective.prototype.gridWidthRow;
    /**
     * @type {?}
     * @private
     */
    PblMetaRowDirective.prototype._meta;
    /** @type {?} */
    PblMetaRowDirective.prototype.metaRows;
    /** @type {?} */
    PblMetaRowDirective.prototype.elRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} plugin
 * @return {?}
 */
function bindToDataSource(plugin) {
    plugin.events.subscribe((/**
     * @param {?} event
     * @return {?}
     */
    event => {
        if (event.kind === 'onDataSource') {
            const { curr, prev } = event;
            if (prev && prev.hostGrid === plugin.grid) {
                prev.hostGrid = undefined;
            }
            if (curr) {
                curr.hostGrid = plugin.grid;
            }
        }
        else if (event.kind === 'onDestroy') {
            /** @type {?} */
            const ds = plugin.grid.ds;
            if (ds.hostGrid === plugin.grid) {
                ds.hostGrid = undefined;
            }
        }
    }));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} store
 * @param {?} identityProp
 * @return {?}
 */
function setIdentityProp(store, identityProp) {
    if (store.allColumns.length > 0 && identityProp) {
        // STATES:
        //    1: identityProp but also primary
        //    2: identityProp, no primary, AND not found
        //    3: identityProp, no primary but found.
        /** @type {?} */
        let state = 1;
        if (!store.primary) {
            state = 2;
            /** @type {?} */
            const column = store.find(identityProp);
            if (column && column.data) {
                state = 3;
                store['_primary'] = column.data;
            }
        }
        if (isDevMode()) {
            /** @type {?} */
            const genericMsg = `The [identityProp] input is deprecated, please remove it and use "pIndex" on the column definition instead.`;
            switch (state) {
                case 1:
                    console.warn(`${genericMsg}
Found column "${store.primary.id}" defined with the new method (pIndex), ignoring "${identityProp}" set in [identityProp]`);
                    break;
                case 2:
                    console.warn(`${genericMsg}
Could not find a column defined with the new method (pIndex).
Trying to locate the column "${identityProp}" defined in [identityProp] FAILED! with no match.
AN IDENTITY COLUMN WAS NOT SET`);
                    break;
                case 3:
                    console.warn(`${genericMsg}
Could not find a column defined with the new method (pIndex).
Trying to locate the column "${identityProp}" defined in [identityProp] SUCCEEDED!.
USING "${identityProp}" AS THE IDENTITY COLUMN.`);
                    break;
            }
        }
    }
}

var PblNgridComponent_1;
/**
 * @param {?} grid
 * @return {?}
 */
function internalApiFactory(grid) { return grid._extApi; }
/**
 * @param {?} grid
 * @return {?}
 */
function pluginControllerFactory(grid) { return grid._plugin.controller; }
/**
 * @param {?} grid
 * @return {?}
 */
function metaRowServiceFactory(grid) { return grid._extApi.metaRowService; }
/**
 * @template T
 */
let PblNgridComponent = PblNgridComponent_1 = /**
 * @template T
 */
class PblNgridComponent {
    /**
     * @param {?} injector
     * @param {?} vcRef
     * @param {?} elRef
     * @param {?} differs
     * @param {?} ngZone
     * @param {?} cdr
     * @param {?} config
     * @param {?} registry
     * @param {?} id
     */
    constructor(injector, vcRef, elRef, differs, ngZone, cdr, config, registry, id) {
        this.elRef = elRef;
        this.differs = differs;
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.config = config;
        this.registry = registry;
        this.id = id;
        this.rowClassUpdateFreq = 'item';
        this.rowFocus = '';
        this.cellFocus = '';
        this._fallbackMinHeight = 0;
        this._store = new PblColumnStore();
        this._noCachePaginator = false;
        /** @type {?} */
        const gridConfig = config.get('table');
        this.showHeader = gridConfig.showHeader;
        this.showFooter = gridConfig.showFooter;
        this.noFiller = gridConfig.noFiller;
        this.initExtApi();
        this.columnApi = ColumnApi.create(this, this._store, this._extApi);
        this.initPlugins(injector, elRef, vcRef);
    }
    /**
     * Show/Hide the header row.
     * Default: true
     * @return {?}
     */
    get showHeader() { return this._showHeader; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set showHeader(value) {
        this._showHeader = coerceBooleanProperty(value);
    }
    /**
     * Show/Hide the footer row.
     * Default: false
     * @return {?}
     */
    get showFooter() { return this._showFooter; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set showFooter(value) {
        this._showFooter = coerceBooleanProperty(value);
    }
    /**
     * When true, the filler is disabled.
     * @return {?}
     */
    get noFiller() { return this._noFiller; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set noFiller(value) {
        this._noFiller = coerceBooleanProperty(value);
    }
    /// TODO(shlomiassaf): Remove in 1.0.0
    /**
     * @deprecated Use `pIndex` in the column definition. (Removed in 1.0.0)
     * @return {?}
     */
    get identityProp() { return this.__identityProp; }
    /**
     * @param {?} value
     * @return {?}
     */
    set identityProp(value) { this.__identityProp = value; setIdentityProp(this._store, value); }
    /**
     * The grid's source of data
     *
     * \@remarks
     * The grid's source of data, which can be provided in 2 ways:
     *
     * - DataSourceOf<T>
     * - PblDataSource<T>
     *
     * The grid only works with `PblDataSource<T>`, `DataSourceOf<T>` is a shortcut for providing
     * the data array directly.
     *
     * `DataSourceOf<T>` can be:
     *
     * - Simple data array (each object represents one grid row)
     * - Promise for a data array
     * - Stream that emits a data array each time the array changes
     *
     * When a `DataSourceOf<T>` is provided it is converted into an instance of `PblDataSource<T>`.
     *
     * To access the `PblDataSource<T>` instance use the `ds` property (readonly).
     *
     * It is highly recommended to use `PblDataSource<T>` directly, the datasource factory makes it easy.
     * For example, when an array is provided the factory is used to convert it to a datasource:
     *
     * ```typescript
     * const collection: T[] = [];
     * const pblDataSource = createDS<T>().onTrigger( () => collection ).create();
     * ```
     *
     * > This is a write-only (setter) property that triggers the `setDataSource` method.
     * @param {?} value
     * @return {?}
     */
    set dataSource(value) {
        if (value instanceof PblDataSource) {
            this.setDataSource(value);
        }
        else {
            this.setDataSource(createDS().onTrigger((/**
             * @return {?}
             */
            () => value || [])).create());
        }
    }
    /**
     * @return {?}
     */
    get ds() { return this._dataSource; }
    ;
    /**
     * @return {?}
     */
    get usePagination() { return this._pagination; }
    /**
     * @param {?} value
     * @return {?}
     */
    set usePagination(value) {
        if (((/** @type {?} */ (value))) === '') {
            value = 'pageNumber';
        }
        if (value !== this._pagination) {
            this._pagination = value;
            this.setupPaginator();
        }
    }
    /**
     * @return {?}
     */
    get noCachePaginator() { return this._noCachePaginator; }
    /**
     * @param {?} value
     * @return {?}
     */
    set noCachePaginator(value) {
        value = coerceBooleanProperty(value);
        if (this._noCachePaginator !== value) {
            this._noCachePaginator = value;
            if (this.ds && this.ds.paginator) {
                this.ds.paginator.noCacheMode = value;
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hideColumns(value) {
        this._hideColumns = value;
        this._hideColumnsDirty = true;
    }
    /**
     * A fallback height for "the inner scroll container".
     * The fallback is used only when it LOWER than the rendered height, so no empty gaps are created when setting the fallback.
     *
     * The "inner scroll container" is the area in which all data rows are rendered and all meta (header/footer) rows that are of type "row" or "sticky".
     * The "inner scroll container" is defined to consume all the height left after all external objects are rendered.
     * External objects can be fixed meta rows (header/footer), pagination row, action row etc...
     *
     * If the grid does not have a height (% or px) the "inner scroll container" will always have no height (0).
     * If the grid has a height, the "inner scroll container" will get the height left, which can also be 0 if there are a lot of external objects.
     *
     * To solve the no-height problem we use the fallbackMinHeight property.
     *
     * When virtual scroll is disabled and fallbackMinHeight is not set the grid will set the "inner scroll container" height to show all rows.
     *
     * Note that when using a fixed (px) height for the grid, if the height of all external objects + the height of the "inner scroll container" is greater then
     * the grid's height a vertical scroll bar will show.
     * If the "inner scroll container"s height will be lower then it's rendered content height and additional vertical scroll bar will appear, which is, usually, not good.
     *
     * To avoid this, don't use fallbackMinHeight together with a fixed height for the grid. Instead use fallbackMinHeight together with a min height for the grid.
     * @return {?}
     */
    get fallbackMinHeight() { return this._fallbackMinHeight; }
    /**
     * @param {?} value
     * @return {?}
     */
    set fallbackMinHeight(value) {
        value = coerceNumberProperty(value);
        if (this._fallbackMinHeight !== value) {
            this._fallbackMinHeight = value;
        }
    }
    /**
     * @return {?}
     */
    get metaColumnIds() { return this._store.metaColumnIds; }
    /**
     * @return {?}
     */
    get metaColumns() { return this._store.metaColumns; }
    /**
     * @return {?}
     */
    get columnRowDef() { return { header: this._store.headerColumnDef, footer: this._store.footerColumnDef }; }
    /**
     * @return {?}
     */
    get contextApi() { return this._extApi.contextApi; }
    /**
     * @return {?}
     */
    get viewport() { return this._viewport; }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this._hideColumnsDirty) {
            this._hideColumnsDirty = false;
            /** @type {?} */
            const value = this._hideColumns;
            if (!this._colHideDiffer && value) {
                try {
                    this._colHideDiffer = this.differs.find(value).create();
                }
                catch (e) {
                    throw new Error(`Cannot find a differ supporting object '${value}. hideColumns only supports binding to Iterables such as Arrays.`);
                }
            }
        }
        if (this._colHideDiffer) {
            /** @type {?} */
            const hideColumns = this._hideColumns || [];
            /** @type {?} */
            const changes = this._colHideDiffer.diff(hideColumns);
            if (changes) {
                this._store.hidden = hideColumns;
                this._minimumRowWidth = '';
                // TODO(shlomiassaf) [perf, 4]: Right now we attach all columns, we can improve it by attaching only those "added" (we know them from "changes")
                this.attachCustomCellTemplates();
                this.attachCustomHeaderCellTemplates();
                this._cdkTable.syncRows('header');
            }
            if (!this._hideColumns) {
                this._colHideDiffer = undefined;
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // no need to unsubscribe, the reg service is per grid instance and it will destroy when this grid destroy.
        // Also, at this point initial changes from templates provided in the content are already inside so they will not trigger
        // the order here is very important, because component top of this grid will fire life cycle hooks AFTER this component
        // so if we have a top level component registering a template on top it will not show unless we listen.
        this.registry.changes.subscribe((/**
         * @param {?} changes
         * @return {?}
         */
        changes => {
            /** @type {?} */
            let gridCell = false;
            /** @type {?} */
            let headerFooterCell = false;
            for (const c of changes) {
                switch (c.type) {
                    case 'tableCell':
                        gridCell = true;
                        break;
                    case 'headerCell':
                    case 'footerCell':
                        headerFooterCell = true;
                        break;
                    case 'noData':
                        this.setupNoData();
                        break;
                    case 'paginator':
                        this.setupPaginator();
                        break;
                }
            }
            if (gridCell) {
                this.attachCustomCellTemplates();
            }
            if (headerFooterCell) {
                this.attachCustomHeaderCellTemplates();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.invalidateColumns();
        Object.defineProperty(this, 'isInit', { value: true });
        this._plugin.emitEvent({ kind: 'onInit' });
        this.setupPaginator();
        // Adding a div before the footer row view reference, this div will be used to fill up the space between header & footer rows
        /** @type {?} */
        const div = document.createElement('div');
        div.classList.add('pbl-ngrid-empty-spacer');
        this._cdkTable._element.insertBefore(div, this._cdkTable._footerRowOutlet.elementRef.nativeElement);
        this.listenToResize();
        // The following code will catch context focused events, find the HTML element of the cell and focus it.
        this.contextApi.focusChanged
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.curr) {
                /** @type {?} */
                const rowContext = this.contextApi.findRowInView(event.curr.rowIdent);
                if (rowContext) {
                    /** @type {?} */
                    const view = (/** @type {?} */ (this._cdkTable._rowOutlet.viewContainer.get(rowContext.index)));
                    if (view) {
                        /** @type {?} */
                        const cellViewIndex = this.columnApi.renderIndexOf(this.columnApi.columns[event.curr.colIndex]);
                        /** @type {?} */
                        const cellElement = view.rootNodes[0].querySelectorAll('pbl-ngrid-cell')[cellViewIndex];
                        if (cellElement) {
                            cellElement.focus();
                        }
                    }
                }
            }
        }));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        let processColumns = false;
        if (changes.focusMode) {
            this.rowFocus = this.focusMode === 'row' ? 0 : '';
            this.cellFocus = this.focusMode === 'cell' ? 0 : '';
        }
        if (changes.columns && this.isInit) {
            processColumns = true;
        }
        if (processColumns === true) {
            this.invalidateColumns();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        /** @type {?} */
        const destroy = (/**
         * @return {?}
         */
        () => {
            this._plugin.destroy();
            if (this._viewport) {
                this._cdkTable.detachViewPort();
            }
        });
        /** @type {?} */
        let p;
        this._plugin.emitEvent({ kind: 'onDestroy', wait: (/**
             * @param {?} _p
             * @return {?}
             */
            (_p) => p = _p) });
        if (p) {
            p.then(destroy).catch(destroy);
        }
        else {
            destroy();
        }
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackBy(index, item) {
        return index;
    }
    /**
     * @param {?=} columnOrSortAlias
     * @param {?=} sort
     * @param {?=} skipUpdate
     * @return {?}
     */
    setSort(columnOrSortAlias, sort, skipUpdate = false) {
        if (!columnOrSortAlias || typeof columnOrSortAlias === 'boolean') {
            this.ds.setSort(!!columnOrSortAlias);
            return;
        }
        /** @type {?} */
        let column;
        if (typeof columnOrSortAlias === 'string') {
            column = this._store.columns.find((/**
             * @param {?} c
             * @return {?}
             */
            c => c.alias ? c.alias === columnOrSortAlias : (c.sort && c.id === columnOrSortAlias)));
            if (!column && isDevMode()) {
                console.warn(`Could not find column with alias "${columnOrSortAlias}".`);
                return;
            }
        }
        else {
            column = columnOrSortAlias;
        }
        this.ds.setSort(column, sort, skipUpdate);
    }
    /**
     * @param {?=} value
     * @param {?=} columns
     * @return {?}
     */
    setFilter(value, columns) {
        if (arguments.length > 0) {
            /** @type {?} */
            let columnInstances;
            if (Array.isArray(columns) && typeof columns[0] === 'string') {
                columnInstances = [];
                for (const colId of columns) {
                    /** @type {?} */
                    const column = this._store.columns.find((/**
                     * @param {?} c
                     * @return {?}
                     */
                    c => c.alias ? c.alias === colId : (c.id === colId)));
                    if (!column && isDevMode()) {
                        console.warn(`Could not find column with alias ${colId} "${colId}".`);
                        return;
                    }
                    columnInstances.push(column);
                }
            }
            else {
                columnInstances = (/** @type {?} */ (columns));
            }
            this.ds.setFilter(value, columnInstances);
        }
        else {
            this.ds.setFilter();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setDataSource(value) {
        if (this._dataSource !== value) {
            // KILL ALL subscriptions for the previous datasource.
            if (this._dataSource) {
                UnRx.kill(this, this._dataSource);
            }
            /** @type {?} */
            const prev = this._dataSource;
            this._dataSource = value;
            this._cdkTable.dataSource = (/** @type {?} */ (value));
            this.setupPaginator();
            this.setupNoData(false);
            // clear the context, new datasource
            this._extApi.contextApi.clear();
            this._plugin.emitEvent({
                kind: 'onDataSource',
                prev,
                curr: value
            });
            if (value) {
                if (isDevMode()) {
                    value.onError.pipe(UnRx(this, value)).subscribe(console.error.bind(console));
                }
                // We register to this event because it fires before the entire data-changing process starts.
                // This is required because `onRenderDataChanging` is fired async, just before the data is emitted.
                // Its not enough to clear the context when `setDataSource` is called, we also need to handle `refresh` calls which will not
                // trigger this method.
                value.onSourceChanging.pipe(UnRx(this, value)).subscribe((/**
                 * @return {?}
                 */
                () => this._extApi.contextApi.clear()));
                // Run CD, scheduled as a micro-task, after each rendering
                value.onRenderDataChanging
                    .pipe(filter$1((/**
                 * @param {?} __0
                 * @return {?}
                 */
                ({ event }) => !event.isInitial && (event.pagination.changed || event.sort.changed || event.filter.changed))), 
                // Context between the operations are not supported at the moment
                // Event for client side operations...
                // TODO: can we remove this? we clear the context with `onSourceChanging`
                tap((/**
                 * @return {?}
                 */
                () => !this._store.primary && this._extApi.contextApi.clear())), switchMap((/**
                 * @return {?}
                 */
                () => value.onRenderedDataChanged.pipe(take(1), mapTo(this.ds.renderLength)))), observeOn(asapScheduler), UnRx(this, value))
                    .subscribe((/**
                 * @param {?} previousRenderLength
                 * @return {?}
                 */
                previousRenderLength => {
                    // If the number of rendered items has changed the grid will update the data and run CD on it.
                    // so we only update the rows.
                    const { cdkTable } = this._extApi;
                    if (previousRenderLength === this.ds.renderLength) {
                        cdkTable.syncRows(true);
                    }
                    else {
                        cdkTable.syncRows('header', true);
                        cdkTable.syncRows('footer', true);
                    }
                }));
                // Handling no data overlay
                // Handling fallback minimum height.
                value.onRenderedDataChanged
                    .pipe(map((/**
                 * @return {?}
                 */
                () => this.ds.renderLength)), startWith(null), pairwise(), tap((/**
                 * @param {?} __0
                 * @return {?}
                 */
                ([prev, curr]) => {
                    /** @type {?} */
                    const noDataShowing = !!this._noDateEmbeddedVRef;
                    if ((curr > 0 && noDataShowing) || (curr === 0 && !noDataShowing)) {
                        this.setupNoData();
                    }
                })), observeOn(animationFrameScheduler), // ww want to give the browser time to remove/add rows
                UnRx(this, value))
                    .subscribe((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const el = this.viewport.elementRef.nativeElement;
                    if (this.ds.renderLength > 0 && this._fallbackMinHeight > 0) {
                        /** @type {?} */
                        const h = Math.min(this._fallbackMinHeight, this.viewport.measureRenderedContentSize());
                        el.style.minHeight = h + 'px';
                    }
                    else {
                        el.style.minHeight = this.viewport.enabled ? null : this.viewport.measureRenderedContentSize() + 'px';
                        // TODO: When viewport is disabled, we can skip the call to measureRenderedContentSize() and let the browser
                        // do the job by setting `contain: unset` in `pbl-cdk-virtual-scroll-viewport`
                        // el.style.minHeight = null;
                        // el.style.contain = this.viewport.enabled ? null : 'unset';
                        // UPDATE: This will not work because it will cause the width to be incorrect when used with vScrollNone
                        // TODO: Check why?
                    }
                }));
            }
        }
    }
    /**
     * Invalidates the header, including a full rebuild of column headers
     * @return {?}
     */
    invalidateColumns() {
        this._plugin.emitEvent({ kind: 'beforeInvalidateHeaders' });
        /** @type {?} */
        const rebuildRows = this._store.allColumns.length > 0;
        this._extApi.contextApi.clear();
        this._store.invalidate(this.columns);
        setIdentityProp(this._store, this.__identityProp); /// TODO(shlomiassaf): Remove in 1.0.0
        this.attachCustomCellTemplates();
        this.attachCustomHeaderCellTemplates();
        this._cdkTable.clearHeaderRowDefs();
        this._cdkTable.clearFooterRowDefs();
        // this.cdr.markForCheck();
        this.cdr.detectChanges();
        // after invalidating the headers we now have optional header/headerGroups/footer rows added
        // we need to update the template with this data which will create new rows (header/footer)
        this.resetHeaderRowDefs();
        this.resetFooterRowDefs();
        this.cdr.markForCheck();
        /*  Now we will force clearing all data rows and creating them back again if this is not the first time we invalidate the columns...
    
            Why? first, some background:
    
            Invalidating the store will result in new `PblColumn` instances (cloned or completely new) held inside a new array (all arrays in the store are re-created on invalidate)
            New array and new instances will also result in new directive instances of `PblNgridColumnDef` for every column.
    
            Each data row has data cells with the `PblNgridCellDirective` directive (`pbl-ngrid-cell`).
            `PblNgridCellDirective` has a reference to `PblNgridColumnDef` through dependency injection, i.e. it will not update through change detection!
    
            Now, the problem:
            The `CdkTable` will cache rows and their cells, reusing them for performance.
            This means that the `PblNgridColumnDef` instance inside each cell will not change.
            So, creating new columns and columnDefs will result in stale cells with reference to dead instances of `PblColumn` and `PblNgridColumnDef`.
    
            One solution is to refactor `PblNgridCellDirective` to get the `PblNgridColumnDef` through data binding.
            While this will work it will put more work on each cell while doing CD and will require complex logic to handle each change because `PblNgridCellDirective`
            also create a context which has reference to a column thus a new context is required.
            Keeping track for all references will be difficult and bugs are likely to occur, which are hard to track.
    
            The simplest solution is to force the grid to render all data rows from scratch which will destroy the cache and all cell's with it, creating new one's with proper reference.
    
            The simple solution is currently preferred because:
    
            - It is easier to implement.
            - It is easier to assess the impact.
            - It effects a single operation (changing to resetting columns) that rarely happen
    
            The only issue is with the `CdkTable` encapsulating the method `_forceRenderDataRows()` which is what we need.
            The workaround is to assign `multiTemplateDataRows` with the same value it already has, which will cause `_forceRenderDataRows` to fire.
            `multiTemplateDataRows` is a getter that triggers `_forceRenderDataRows` without checking the value changed, perfect fit.
            There is a risk with `multiTemplateDataRows` being changed...
         */
        if (rebuildRows) {
            this._cdkTable.multiTemplateDataRows = this._cdkTable.multiTemplateDataRows;
        }
        this._plugin.emitEvent({ kind: 'onInvalidateHeaders' });
    }
    /**
     * Updates the column sizes for all columns in the grid based on the column definition metadata for each column.
     * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
     * @return {?}
     */
    resetColumnsWidth() {
        resetColumnWidths(this._store.getStaticWidth(), this._store.columns, this._store.metaColumns);
    }
    /**
     * Update the size of all group columns in the grid based on the size of their visible children (not hidden).
     * @param {?=} dynamicWidthLogic - Optional logic container, if not set a new one is created.
     * @return {?}
     */
    syncColumnGroupsSize(dynamicWidthLogic) {
        if (!dynamicWidthLogic) {
            dynamicWidthLogic = this._extApi.dynamicColumnWidthFactory();
        }
        // From all meta columns (header/footer/headerGroup) we filter only `headerGroup` columns.
        // For each we calculate it's width from all of the columns that the headerGroup "groups".
        // We use the same strategy and the same RowWidthDynamicAggregator instance which will prevent duplicate calculations.
        // Note that we might have multiple header groups, i.e. same columns on multiple groups with different row index.
        for (const g of this._store.getAllHeaderGroup()) {
            // We go over all columns because g.columns does not represent the current owned columns of the group
            // it is static, representing the initial state.
            // Only columns hold their group owners.
            // TODO: find way to improve iteration
            /** @type {?} */
            const colSizeInfos = this._store.columns.filter((/**
             * @param {?} c
             * @return {?}
             */
            c => !c.hidden && c.isInGroup(g))).map((/**
             * @param {?} c
             * @return {?}
             */
            c => c.sizeInfo));
            if (colSizeInfos.length > 0) {
                /** @type {?} */
                const groupWidth = dynamicWidthLogic.addGroup(colSizeInfos);
                g.minWidth = groupWidth;
                g.updateWidth(`${groupWidth}px`);
            }
            else {
                g.minWidth = undefined;
                g.updateWidth(`0px`);
            }
        }
    }
    /**
     * @param {?=} columns
     * @return {?}
     */
    resizeColumns(columns) {
        if (!columns) {
            columns = this._store.columns;
        }
        // protect from per-mature resize.
        // Will happen on additional header/header-group rows AND ALSO when vScrollNone is set
        // This will cause size not to populate because it takes time to render the rows, since it's not virtual and happens immediately.
        // TODO: find a better protection.
        if (!columns[0].sizeInfo) {
            return;
        }
        // stores and calculates width for columns added to it. Aggregate's the total width of all added columns.
        /** @type {?} */
        const rowWidth = this._extApi.dynamicColumnWidthFactory();
        this.syncColumnGroupsSize(rowWidth);
        // if this is a grid without groups
        if (rowWidth.minimumRowWidth === 0) {
            rowWidth.addGroup(columns.map((/**
             * @param {?} c
             * @return {?}
             */
            c => c.sizeInfo)));
        }
        // if the max lock state has changed we need to update re-calculate the static width's again.
        if (rowWidth.maxWidthLockChanged) {
            resetColumnWidths(this._store.getStaticWidth(), this._store.columns, this._store.metaColumns);
            this.resizeColumns(columns);
            return;
        }
        if (!this._minimumRowWidth) {
            // We calculate the total minimum width of the grid
            // We do it once, to set the minimum width based on the initial setup.
            // Note that we don't apply strategy here, we want the entire length of the grid!
            this._cdkTable.minWidth = rowWidth.minimumRowWidth;
        }
        this.ngZone.run((/**
         * @return {?}
         */
        () => {
            this._cdkTable.syncRows('header');
            this._plugin.emitEvent({ kind: 'onResizeRow' });
        }));
    }
    /**
     * Create an embedded view before or after the user projected content.
     * @template C
     * @param {?} location
     * @param {?} templateRef
     * @param {?=} context
     * @param {?=} index
     * @return {?}
     */
    createView(location, templateRef, context, index) {
        /** @type {?} */
        const vcRef = this.getInternalVcRef(location);
        /** @type {?} */
        const view = vcRef.createEmbeddedView(templateRef, context, index);
        view.detectChanges();
        return view;
    }
    /**
     * Remove an already created embedded view.
     * @param {?} view - The view to remove
     * @param {?} location - The location, if not set defaults to `before`
     * @return {?} true when a view was removed, false when not. (did not exist in the view container for the provided location)
     */
    removeView(view, location) {
        /** @type {?} */
        const vcRef = this.getInternalVcRef(location);
        /** @type {?} */
        const idx = vcRef.indexOf(view);
        if (idx === -1) {
            return false;
        }
        else {
            vcRef.remove(idx);
            return true;
        }
    }
    /**
     * Resize all visible columns to fit content of the grid.
     * @param {?=} options
     * @return {?}
     */
    autoSizeColumnToFit(options) {
        const { innerWidth, outerWidth } = this.viewport;
        // calculate auto-size on the width without scroll bar and take box model gaps into account
        // TODO: if no scroll bar exists the calc will not include it, next if more rows are added a scroll bar will appear...
        this.columnApi.autoSizeToFit(outerWidth - (outerWidth - innerWidth), options);
    }
    /**
     * @return {?}
     */
    findInitialRowHeight() {
        /** @type {?} */
        let rowElement;
        if (this._cdkTable._rowOutlet.viewContainer.length) {
            /** @type {?} */
            const viewRef = (/** @type {?} */ (this._cdkTable._rowOutlet.viewContainer.get(0)));
            rowElement = viewRef.rootNodes[0];
            /** @type {?} */
            const height = getComputedStyle(rowElement).height;
            return parseInt(height, 10);
        }
        else if (this._vcRefBeforeContent) {
            rowElement = this._vcRefBeforeContent.length > 0
                ? ((/** @type {?} */ (this._vcRefBeforeContent.get(this._vcRefBeforeContent.length - 1)))).rootNodes[0]
                : this._vcRefBeforeContent.element.nativeElement;
            rowElement = (/** @type {?} */ (rowElement.nextElementSibling));
            rowElement.style.display = '';
            /** @type {?} */
            const height = getComputedStyle(rowElement).height;
            rowElement.style.display = 'none';
            return parseInt(height, 10);
        }
    }
    /**
     * @param {...?} cls
     * @return {?}
     */
    addClass(...cls) {
        for (const c of cls) {
            this.elRef.nativeElement.classList.add(c);
        }
    }
    /**
     * @param {...?} cls
     * @return {?}
     */
    removeClass(...cls) {
        for (const c of cls) {
            this.elRef.nativeElement.classList.remove(c);
        }
    }
    /**
     * @private
     * @param {?} injector
     * @param {?} elRef
     * @param {?} vcRef
     * @return {?}
     */
    initPlugins(injector, elRef, vcRef) {
        // Create an injector for the extensions/plugins
        // This injector allow plugins (that choose so) to provide a factory function for runtime use.
        // I.E: as if they we're created by angular via template...
        // This allows seamless plugin-to-plugin dependencies without requiring specific template syntax.
        // And also allows auto plugin binding (app wide) without the need for template syntax.
        /** @type {?} */
        const pluginInjector = Injector.create({
            providers: [
                { provide: ViewContainerRef, useValue: vcRef },
                { provide: ElementRef, useValue: elRef },
                { provide: ChangeDetectorRef, useValue: this.cdr },
            ],
            parent: injector,
        });
        this._plugin = PblNgridPluginContext.create(this, pluginInjector, this._extApi);
        bindToDataSource(this._plugin);
    }
    /**
     * @private
     * @return {?}
     */
    listenToResize() {
        /** @type {?} */
        let resizeObserver;
        /** @type {?} */
        const ro$ = fromEventPattern((/**
         * @param {?} handler
         * @return {?}
         */
        handler => {
            if (!resizeObserver) {
                resizeObserver = new ResizeObserver(handler);
                resizeObserver.observe(this.elRef.nativeElement);
            }
        }), (/**
         * @param {?} handler
         * @return {?}
         */
        handler => {
            if (resizeObserver) {
                resizeObserver.unobserve(this.elRef.nativeElement);
                resizeObserver.disconnect();
                resizeObserver = undefined;
            }
        }));
        // Skip the first emission
        // Debounce all resizes until the next complete animation frame without a resize
        // finally maps to the entries collection
        // SKIP:  We should skip the first emission (`skip(1)`) before we debounce, since its called upon calling "observe" on the resizeObserver.
        //        The problem is that some grid might require this because they do change size.
        //        An example is a grid in a mat-tab that is hidden, the grid will hit the resize one when we focus the tab
        //        which will require a resize handling because it's initial size is 0
        //        To workaround this, we only skip elements not yet added to the DOM, which means they will not trigger a resize event.
        /** @type {?} */
        let skipValue = document.body.contains(this.elRef.nativeElement) ? 1 : 0;
        ro$
            .pipe(skip(skipValue), debounceTime(0, animationFrameScheduler), UnRx(this))
            .subscribe((/**
         * @param {?} args
         * @return {?}
         */
        (args) => {
            if (skipValue === 0) {
                skipValue = 1;
                /** @type {?} */
                const columns = this._store.columns;
                columns.forEach((/**
                 * @param {?} c
                 * @return {?}
                 */
                c => c.sizeInfo.updateSize()));
            }
            this.onResize(args[0]);
        }));
    }
    /**
     * @private
     * @param {?} entries
     * @return {?}
     */
    onResize(entries) {
        if (this._viewport) {
            this._viewport.checkViewportSize();
        }
        // this.resetColumnsWidth();
        this.resizeColumns();
    }
    /**
     * @private
     * @return {?}
     */
    initExtApi() {
        /** @type {?} */
        let onInit = [];
        /** @type {?} */
        const extApi = {
            grid: this,
            element: this.elRef.nativeElement,
            /**
             * @return {?}
             */
            get cdkTable() { return extApi.grid._cdkTable; },
            /**
             * @return {?}
             */
            get events() { return extApi.grid._plugin.events; },
            /**
             * @return {?}
             */
            get contextApi() {
                Object.defineProperty(this, 'contextApi', { value: new ContextApi(extApi) });
                return extApi.contextApi;
            },
            /**
             * @return {?}
             */
            get metaRowService() {
                Object.defineProperty(this, 'metaRowService', { value: new PblNgridMetaRowService(extApi) });
                return extApi.metaRowService;
            },
            onInit: (/**
             * @param {?} fn
             * @return {?}
             */
            (fn) => {
                if (extApi.grid.isInit) {
                    fn();
                }
                else {
                    if (onInit.length === 0) {
                        /** @type {?} */
                        let u = extApi.events.subscribe((/**
                         * @param {?} e
                         * @return {?}
                         */
                        e => {
                            if (e.kind === 'onInit') {
                                for (const onInitFn of onInit) {
                                    onInitFn();
                                }
                                u.unsubscribe();
                                onInit = u = undefined;
                            }
                        }));
                    }
                    onInit.push(fn);
                }
            }),
            columnStore: this._store,
            setViewport: (/**
             * @param {?} viewport
             * @return {?}
             */
            (viewport) => this._viewport = viewport),
            dynamicColumnWidthFactory: (/**
             * @return {?}
             */
            () => {
                return new DynamicColumnWidthLogic(DYNAMIC_PADDING_BOX_MODEL_SPACE_STRATEGY);
            })
        };
        this._extApi = extApi;
    }
    /**
     * @private
     * @param {?=} force
     * @return {?}
     */
    setupNoData(force) {
        if (this._noDateEmbeddedVRef) {
            this.removeView(this._noDateEmbeddedVRef, 'beforeContent');
            this._noDateEmbeddedVRef = undefined;
        }
        if (force === false) {
            return;
        }
        /** @type {?} */
        const noData = this._dataSource && this._dataSource.renderLength === 0;
        if (noData) {
            this.addClass('pbl-ngrid-empty');
        }
        else {
            this.removeClass('pbl-ngrid-empty');
        }
        if (noData || force === true) {
            /** @type {?} */
            const noDataTemplate = this.registry.getSingle('noData');
            if (noDataTemplate) {
                this._noDateEmbeddedVRef = this.createView('beforeContent', noDataTemplate.tRef, { $implicit: this }, 0);
            }
        }
    }
    /**
     * @private
     * @param {?} location
     * @return {?}
     */
    getInternalVcRef(location) {
        return location === 'beforeTable'
            ? this._vcRefBeforeTable
            : location === 'beforeContent' ? this._vcRefBeforeContent : this._vcRefAfterContent;
    }
    /**
     * @private
     * @return {?}
     */
    setupPaginator() {
        /** @type {?} */
        const paginationKillKey = 'pblPaginationKillKey';
        /** @type {?} */
        const usePagination = this.ds && this.usePagination;
        if (usePagination) {
            this.ds.pagination = this._pagination;
            if (this.ds.paginator) {
                this.ds.paginator.noCacheMode = this._noCachePaginator;
            }
        }
        if (this.isInit) {
            UnRx.kill(this, paginationKillKey);
            if (this._paginatorEmbeddedVRef) {
                this.removeView(this._paginatorEmbeddedVRef, 'beforeContent');
                this._paginatorEmbeddedVRef = undefined;
            }
            if (usePagination) {
                /** @type {?} */
                const paginatorTemplate = this.registry.getSingle('paginator');
                if (paginatorTemplate) {
                    this._paginatorEmbeddedVRef = this.createView('beforeContent', paginatorTemplate.tRef, { $implicit: this });
                }
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    attachCustomCellTemplates() {
        for (const col of this._store.columns) {
            /** @type {?} */
            const cell = findCellDef(this.registry, col, 'tableCell', true);
            if (cell) {
                col.cellTpl = cell.tRef;
            }
            else {
                /** @type {?} */
                const defaultCellTemplate = this.registry.getMultiDefault('tableCell');
                col.cellTpl = defaultCellTemplate ? defaultCellTemplate.tRef : this._fbTableCell;
            }
            /** @type {?} */
            const editorCell = findCellDef(this.registry, col, 'editorCell', true);
            if (editorCell) {
                col.editorTpl = editorCell.tRef;
            }
            else {
                /** @type {?} */
                const defaultCellTemplate = this.registry.getMultiDefault('editorCell');
                col.editorTpl = defaultCellTemplate ? defaultCellTemplate.tRef : undefined;
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    attachCustomHeaderCellTemplates() {
        /** @type {?} */
        const columns = [].concat(this._store.columns, this._store.metaColumns);
        /** @type {?} */
        const defaultHeaderCellTemplate = this.registry.getMultiDefault('headerCell') || { tRef: this._fbHeaderCell };
        /** @type {?} */
        const defaultFooterCellTemplate = this.registry.getMultiDefault('footerCell') || { tRef: this._fbFooterCell };
        for (const col of columns) {
            if (isPblColumn(col)) {
                /** @type {?} */
                const headerCellDef = findCellDef(this.registry, col, 'headerCell', true) || defaultHeaderCellTemplate;
                /** @type {?} */
                const footerCellDef = findCellDef(this.registry, col, 'footerCell', true) || defaultFooterCellTemplate;
                col.headerCellTpl = headerCellDef.tRef;
                col.footerCellTpl = footerCellDef.tRef;
            }
            else {
                if (col.header) {
                    /** @type {?} */
                    const headerCellDef = findCellDef(this.registry, col.header, 'headerCell', true) || defaultHeaderCellTemplate;
                    col.header.template = headerCellDef.tRef;
                }
                if (col.headerGroup) {
                    /** @type {?} */
                    const headerCellDef = findCellDef(this.registry, col.headerGroup, 'headerCell', true) || defaultHeaderCellTemplate;
                    col.headerGroup.template = headerCellDef.tRef;
                }
                if (col.footer) {
                    /** @type {?} */
                    const footerCellDef = findCellDef(this.registry, col.footer, 'footerCell', true) || defaultFooterCellTemplate;
                    col.footer.template = footerCellDef.tRef;
                }
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    resetHeaderRowDefs() {
        if (this._headerRowDefs) {
            // The grid header (main, with column names) is always the last row def (index 0)
            // Because we want it to show last (after custom headers, group headers...) we first need to pull it and then push.
            this._cdkTable.clearHeaderRowDefs();
            /** @type {?} */
            const arr = this._headerRowDefs.toArray();
            arr.push(arr.shift());
            for (const rowDef of arr) {
                this._cdkTable.addHeaderRowDef(rowDef);
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    resetFooterRowDefs() {
        if (this._footerRowDefs) {
            this._cdkTable.clearFooterRowDefs();
            for (const rowDef of this._footerRowDefs.toArray()) {
                this._cdkTable.addFooterRowDef(rowDef);
            }
        }
    }
};
PblNgridComponent.ctorParameters = () => [
    { type: Injector },
    { type: ViewContainerRef },
    { type: ElementRef },
    { type: IterableDiffers },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: PblNgridConfigService },
    { type: PblNgridRegistryService },
    { type: String }
];
PblNgridComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-ngrid',
                template: "<!-- GRID HEADER ROW DEF - THE MAIN HEADER OF THE GRID -->\n<cdk-header-row *cdkHeaderRowDef=\"columnApi.visibleColumnIds; sticky: columnRowDef.header?.type === 'sticky'\"\n                [pblMetaRow]=\"columnRowDef.header\"\n                data-rowtype=\"header\"\n                class=\"pbl-ngrid-header-row pbl-ngrid-header-row-main\"\n                [class.pbl-ngrid-row-hidden]=\"!showHeader\"></cdk-header-row>\n\n<!-- DUPLICATE HEADER FOR THE MAIN HEADER, NEVER SEEN (NOT VISUAL), USED FOR RESIZING -->\n<cdk-header-row *cdkHeaderRowDef=\"columnApi.visibleColumnIds;\"\n                [pblMetaRow]=\"columnRowDef.header\" gridWidthRow\n                data-rowtype=\"header\"\n                class=\"pbl-ngrid-header-row pbl-ngrid-row-visually-hidden\"></cdk-header-row>\n\n<!-- MULTI-HEADER ROW DEF & MULTI-HEADER GROUP ROW DEFINITION TEMPLATES -->\n<ng-container *ngFor=\"let row of metaColumnIds.header;\">\n  <cdk-header-row *cdkHeaderRowDef=\"row.keys; sticky: row.rowDef.type === 'sticky'\"\n                  [pblMetaRow]=\"row.rowDef\"\n                  data-rowtype=\"meta-header\" class=\"pbl-ngrid-header-row\"\n                  [class.pbl-meta-group-row]=\"row.isGroup\"></cdk-header-row>\n</ng-container>\n\n<!-- GRID FOOTER ROW DEF -->\n<cdk-footer-row *cdkFooterRowDef=\"columnApi.visibleColumnIds; sticky: columnRowDef.footer?.type === 'sticky'\"\n                [pblMetaRow]=\"columnRowDef.footer\"\n                data-rowtype=\"footer\"\n                class=\"pbl-ngrid-footer-row\"\n                [class.pbl-ngrid-row-hidden]=\"!showFooter\"></cdk-footer-row> <!-- GRID FOOTER ROW DEF -->\n<!-- MULTI-FOOTER ROW DEF -->\n<ng-container *ngFor=\"let row of metaColumnIds.footer\">   <!-- MULTI-FOOTER ROW DEF -->\n  <cdk-footer-row *cdkFooterRowDef=\"row.keys; sticky: row.rowDef.type === 'sticky'\"\n                  [pblMetaRow]=\"row.rowDef\"\n                  data-rowtype=\"meta-footer\" class=\"pbl-ngrid-footer-row\"\n                  [class.pbl-meta-group-row]=\"row.isGroup\"></cdk-footer-row>\n</ng-container>\n\n<div class=\"pbl-ngrid-container\">\n  <ng-container #beforeTable></ng-container>\n  <div pbl-ngrid-fixed-meta-row-container=\"header\"></div>\n  <pbl-cdk-virtual-scroll-viewport class=\"pbl-ngrid-scroll-container\"\n                                   [stickyRowHeaderContainer]=\"stickyRowHeaderContainer\" [stickyRowFooterContainer]=\"stickyRowFooterContainer\">\n    <pbl-cdk-table tabindex=\"-1\">\n      <!-- Row templates. The columns used are set at the row template level -->\n\n      <!-- MULTI-HEADER/FOOTER CELL DEF -->\n      <ng-container *ngFor=\"let meta of metaColumns\">\n        <ng-container *ngIf=\"(meta.header || meta.headerGroup) as c\" [pblNgridColumnDef]=\"c\">\n          <pbl-ngrid-header-cell #hCell=\"ngridHeaderCell\" *cdkHeaderCellDef>\n            <ng-container *ngTemplateOutlet=\"c.template; context: hCell.cellCtx\"></ng-container>\n          </pbl-ngrid-header-cell>\n        </ng-container>\n        <ng-container *ngIf=\"meta.footer as c\" [pblNgridColumnDef]=\"c\">\n          <pbl-ngrid-footer-cell #fCell=\"ngridFooterCell\" *cdkFooterCellDef>\n            <ng-container *ngTemplateOutlet=\"c.template; context: fCell.cellCtx\"></ng-container>\n          </pbl-ngrid-footer-cell>\n        </ng-container>\n      </ng-container>\n      <!-- MULTI-HEADER/FOOTER CELL DEF -->\n\n      <!-- HEADER-RECORD-FOOTER CELL DEF -->\n      <ng-container *ngFor=\"let c of columnApi.visibleColumns;\" [pblNgridColumnDef]=\"c\">\n        <!-- GRID HEADER CELL DEF -->\n        <pbl-ngrid-header-cell *cdkHeaderCellDef=\"let row\" [observeSize]=\"c\"></pbl-ngrid-header-cell>\n\n        <!-- RECORD CELL DEF -->\n        <pbl-ngrid-cell #cell=\"pblNgridCell\" *cdkCellDef=\"let row; pblRowContext as pblRowContext\"\n                        [rowCtx]=\"pblRowContext\" [attr.tabindex]=\"cellFocus\" [attr.id]=\"c.id\">\n          <ng-container *ngTemplateOutlet=\"cell.cellCtx?.editing ? c.editorTpl : c.cellTpl; context: cell.cellCtx\"></ng-container>\n        </pbl-ngrid-cell>\n\n        <!-- GRID FOOTER CELL DEF -->\n        <pbl-ngrid-footer-cell #fCell=\"ngridFooterCell\" *cdkFooterCellDef>\n          <ng-container *ngTemplateOutlet=\"c.footerCellTpl; context: fCell.cellCtx\"></ng-container>\n        </pbl-ngrid-footer-cell>\n      </ng-container>\n      <!-- HEADER-RECORD-FOOTER CELL DEF -->\n\n      <!-- GRID RECORD ROW DEFINITION TEMPLATES -->\n      <pbl-ngrid-row *cdkRowDef=\"let row; columns: columnApi.visibleColumnIds;\" [row]=\"row\"></pbl-ngrid-row>\n      <!-- GRID RECORD ROW DEFINITION TEMPLATES -->\n    </pbl-cdk-table>\n  </pbl-cdk-virtual-scroll-viewport>\n  <div pbl-ngrid-fixed-meta-row-container=\"footer\"></div>\n  <ng-container #beforeContent>\n    <!-- This dummy row is used to extract an initial row height -->\n    <pbl-ngrid-row row style=\"display: none\"></pbl-ngrid-row>\n  </ng-container>\n  <ng-content></ng-content>\n  <ng-container #afterContent></ng-container>\n\n  <!-- Placeholder for header/footer scroll containers that will get populated with header/meta roles when the following conditions are met:\n       - Virtual scrolling is enabled\n       - Rows are rendered in the viewport\n       - Container is scrolling\n\n       The placeholder is fixed so the browsers does not use sticky positioning while scrolling, which takes the rows out of view while scrolling.\n       While scrolling the rows are moved into this placeholder and when scrolling ends they return to their original positioning.\n\n       The actual rows are added into the internal div, within the placeholder.\n       The top container get the proper width and the internal header gets the scroll offset (horizontal) that matches the current offset.\n       This has an effect only when scrolling with the wheel within a long scrolling session.\n\n       Implementation is in the virtual scroll viewport (more precisely in `PblVirtualScrollForOf`)\n  -->\n  <div #stickyRowHeaderContainer class=\"pbl-ngrid-sticky-row-scroll-container\"><div [style.minWidth.px]=\"_cdkTable?.minWidth\"></div></div> <!-- HEADERS -->\n  <div #stickyRowFooterContainer class=\"pbl-ngrid-sticky-row-scroll-container\"><div [style.minWidth.px]=\"_cdkTable?.minWidth\"></div></div> <!-- FOOTERS -->\n</div>\n\n<ng-template #fbTableCell let-value=\"value\"><div>{{value}}</div></ng-template>\n<ng-template #fbHeaderCell let-column=\"col\"><div>{{column.label}}</div></ng-template>\n<ng-template #fbFooterCell let-column=\"col\"><div>{{column.label}}</div></ng-template>\n",
                providers: [
                    PblNgridRegistryService,
                    {
                        provide: PblNgridPluginController,
                        useFactory: pluginControllerFactory,
                        deps: [forwardRef((/**
                             * @return {?}
                             */
                            () => PblNgridComponent_1))],
                    },
                    {
                        provide: EXT_API_TOKEN,
                        useFactory: internalApiFactory,
                        deps: [forwardRef((/**
                             * @return {?}
                             */
                            () => PblNgridComponent_1))],
                    },
                    {
                        provide: PblNgridMetaRowService,
                        useFactory: metaRowServiceFactory,
                        deps: [forwardRef((/**
                             * @return {?}
                             */
                            () => PblNgridComponent_1))],
                    }
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["pbl-ngrid{display:block}.pbl-ngrid-row-visually-hidden{border-top:0;border-bottom:0;clip:rect(0 0 0 0);height:0;min-height:0;max-height:0;overflow:hidden!important;visibility:collapse!important;outline:0;-webkit-appearance:none;-moz-appearance:none}.pbl-ngrid-row-hidden{display:none!important}.pbl-ngrid-container{position:relative;height:100%;width:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;box-sizing:border-box;display:-webkit-box;display:flex;overflow:auto;min-height:inherit}.pbl-ngrid-scroll-container{-webkit-box-flex:1;flex:1 1 auto;box-sizing:border-box;min-height:auto}.pbl-ngrid-scroll-container.cdk-virtual-scroll-disabled{-webkit-box-flex:1;flex:1 0 auto}.pbl-ngrid-sticky-row-scroll-container{position:fixed;overflow:hidden}.pbl-ngrid-empty-spacer{display:none}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper{min-height:100%;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-flex:1;flex:1 1 100%}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table>*{-webkit-box-flex:0;flex:0 0 auto}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table>.pbl-ngrid-empty-spacer{display:block;-webkit-box-flex:1;flex:1 1 auto}.pbl-ngrid-scrolling pbl-cdk-table{pointer-events:none}"]
            }] }
];
/** @nocollapse */
PblNgridComponent.ctorParameters = () => [
    { type: Injector },
    { type: ViewContainerRef },
    { type: ElementRef },
    { type: IterableDiffers },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: PblNgridConfigService },
    { type: PblNgridRegistryService },
    { type: String, decorators: [{ type: Attribute, args: ['id',] }] }
];
PblNgridComponent.propDecorators = {
    showHeader: [{ type: Input }],
    showFooter: [{ type: Input }],
    noFiller: [{ type: Input }],
    focusMode: [{ type: Input }],
    identityProp: [{ type: Input }],
    dataSource: [{ type: Input }],
    usePagination: [{ type: Input }],
    noCachePaginator: [{ type: Input }],
    columns: [{ type: Input }],
    hideColumns: [{ type: Input }],
    fallbackMinHeight: [{ type: Input }],
    rowClassUpdate: [{ type: Input }],
    rowClassUpdateFreq: [{ type: Input }],
    _vcRefBeforeTable: [{ type: ViewChild, args: ['beforeTable', { read: ViewContainerRef, static: true },] }],
    _vcRefBeforeContent: [{ type: ViewChild, args: ['beforeContent', { read: ViewContainerRef, static: true },] }],
    _vcRefAfterContent: [{ type: ViewChild, args: ['afterContent', { read: ViewContainerRef, static: true },] }],
    _fbTableCell: [{ type: ViewChild, args: ['fbTableCell', { read: TemplateRef, static: true },] }],
    _fbHeaderCell: [{ type: ViewChild, args: ['fbHeaderCell', { read: TemplateRef, static: true },] }],
    _fbFooterCell: [{ type: ViewChild, args: ['fbFooterCell', { read: TemplateRef, static: true },] }],
    _tableRowDef: [{ type: ViewChild, args: [CdkRowDef, { static: true },] }],
    _headerRowDefs: [{ type: ViewChildren, args: [CdkHeaderRowDef,] }],
    _footerRowDefs: [{ type: ViewChildren, args: [CdkFooterRowDef,] }]
};
/**
 * @template T
 */
PblNgridComponent = PblNgridComponent_1 = __decorate([
    UnRx(),
    __metadata("design:paramtypes", [Injector, ViewContainerRef,
        ElementRef,
        IterableDiffers,
        NgZone,
        ChangeDetectorRef,
        PblNgridConfigService,
        PblNgridRegistryService, String])
], PblNgridComponent);
if (false) {
    /** @type {?} */
    PblNgridComponent.prototype._showHeader;
    /** @type {?} */
    PblNgridComponent.prototype._showFooter;
    /** @type {?} */
    PblNgridComponent.prototype._noFiller;
    /**
     * Set's the behavior of the grid when tabbing.
     * The default behavior is none (rows and cells are not focusable)
     *
     * Note that the focus mode has an effect on other functions, for example a detail row will toggle (open/close) using
     * ENTER / SPACE only when focusMode is set to `row`.
     * @type {?}
     */
    PblNgridComponent.prototype.focusMode;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype.__identityProp;
    /**
     * The column definitions for this grid.
     * @type {?}
     */
    PblNgridComponent.prototype.columns;
    /** @type {?} */
    PblNgridComponent.prototype.rowClassUpdate;
    /** @type {?} */
    PblNgridComponent.prototype.rowClassUpdateFreq;
    /** @type {?} */
    PblNgridComponent.prototype.rowFocus;
    /** @type {?} */
    PblNgridComponent.prototype.cellFocus;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._fallbackMinHeight;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._dataSource;
    /** @type {?} */
    PblNgridComponent.prototype._vcRefBeforeTable;
    /** @type {?} */
    PblNgridComponent.prototype._vcRefBeforeContent;
    /** @type {?} */
    PblNgridComponent.prototype._vcRefAfterContent;
    /** @type {?} */
    PblNgridComponent.prototype._fbTableCell;
    /** @type {?} */
    PblNgridComponent.prototype._fbHeaderCell;
    /** @type {?} */
    PblNgridComponent.prototype._fbFooterCell;
    /** @type {?} */
    PblNgridComponent.prototype._tableRowDef;
    /** @type {?} */
    PblNgridComponent.prototype._headerRowDefs;
    /** @type {?} */
    PblNgridComponent.prototype._footerRowDefs;
    /**
     * True when the component is initialized (after AfterViewInit)
     * @type {?}
     */
    PblNgridComponent.prototype.isInit;
    /** @type {?} */
    PblNgridComponent.prototype.columnApi;
    /** @type {?} */
    PblNgridComponent.prototype._cdkTable;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._store;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._hideColumnsDirty;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._hideColumns;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._colHideDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._noDateEmbeddedVRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._paginatorEmbeddedVRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._pagination;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._noCachePaginator;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._minimumRowWidth;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._viewport;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._plugin;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._extApi;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype.elRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype.differs;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype.config;
    /** @type {?} */
    PblNgridComponent.prototype.registry;
    /** @type {?} */
    PblNgridComponent.prototype.id;
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// https://github.com/angular/angular/blob/0bf810022a80ba1cbcff8aa471063a6f1352abbe/packages/common/src/directives/styling_differ.ts
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Used to diff and convert ngStyle/ngClass instructions into [style] and [class] bindings.
 *
 * ngStyle and ngClass both accept various forms of input and behave differently than that
 * of how [style] and [class] behave in Angular.
 *
 * The differences are:
 *  - ngStyle and ngClass both **watch** their binding values for changes each time CD runs
 *    while [style] and [class] bindings do not (they check for identity changes)
 *  - ngStyle allows for unit-based keys (e.g. `{'max-width.px':value}`) and [style] does not
 *  - ngClass supports arrays of class values and [class] only accepts map and string values
 *  - ngClass allows for multiple className keys (space-separated) within an array or map
 *     (as the * key) while [class] only accepts a simple key/value map object
 *
 * Having Angular understand and adapt to all the different forms of behavior is complicated
 * and unnecessary. Instead, ngClass and ngStyle should have their input values be converted
 * into something that the core-level [style] and [class] bindings understand.
 *
 * This [StylingDiffer] class handles this conversion by creating a new input value each time
 * the inner representation of the binding value have changed.
 *
 * ## Why do we care about ngStyle/ngClass?
 * The styling algorithm code (documented inside of `render3/interfaces/styling.ts`) needs to
 * respect and understand the styling values emitted through ngStyle and ngClass (when they
 * are present and used in a template).
 *
 * Instead of having these directives manage styling on their own, they should be included
 * into the Angular styling algorithm that exists for [style] and [class] bindings.
 *
 * Here's why:
 *
 * - If ngStyle/ngClass is used in combination with [style]/[class] bindings then the
 *   styles and classes would fall out of sync and be applied and updated at
 *   inconsistent times
 * - Both ngClass/ngStyle do not respect [class.name] and [style.prop] bindings
 *   (they will write over them given the right combination of events)
 *
 *   ```
 *   <!-- if `w1` is updated then it will always override `w2`
 *        if `w2` is updated then it will always override `w1`
 *        if both are updated at the same time then `w1` wins -->
 *   <div [ngStyle]="{width:w1}" [style.width]="w2">...</div>
 *
 *   <!-- if `w1` is updated then it will always lose to `w2`
 *        if `w2` is updated then it will always override `w1`
 *        if both are updated at the same time then `w2` wins -->
 *   <div [style]="{width:w1}" [style.width]="w2">...</div>
 *   ```
 * - ngClass/ngStyle were written as a directives and made use of maps, closures and other
 *   expensive data structures which were evaluated each time CD runs
 * @template T
 */
class StylingDiffer {
    /**
     * @param {?} _name
     * @param {?} _options
     */
    constructor(_name, _options) {
        this._name = _name;
        this._options = _options;
        this.value = null;
        this._lastSetValue = null;
        this._lastSetValueType = 0 /* Null */;
        this._lastSetValueIdentityChange = false;
    }
    /**
     * Sets (updates) the styling value within the differ.
     *
     * Only when `hasValueChanged` is called then this new value will be evaluted
     * and checked against the previous value.
     *
     * @param {?} value the new styling value provided from the ngClass/ngStyle binding
     * @return {?}
     */
    setValue(value) {
        if (Array.isArray(value)) {
            this._lastSetValueType = 4 /* Array */;
        }
        else if (value instanceof Set) {
            this._lastSetValueType = 8 /* Set */;
        }
        else if (value && typeof value === 'string') {
            if (!(this._options & 4 /* AllowStringValue */)) {
                throw new Error(this._name + ' string values are not allowed');
            }
            this._lastSetValueType = 1 /* String */;
        }
        else {
            this._lastSetValueType = value ? 2 /* Map */ : 0 /* Null */;
        }
        this._lastSetValueIdentityChange = true;
        this._lastSetValue = value || null;
    }
    /**
     * Determines whether or not the value has changed.
     *
     * This function can be called right after `setValue()` is called, but it can also be
     * called incase the existing value (if it's a collection) changes internally. If the
     * value is indeed a collection it will do the necessary diffing work and produce a
     * new object value as assign that to `value`.
     *
     * @return {?} whether or not the value has changed in some way.
     */
    hasValueChanged() {
        /** @type {?} */
        let valueHasChanged = this._lastSetValueIdentityChange;
        if (!valueHasChanged && !(this._lastSetValueType & 14 /* Collection */))
            return false;
        /** @type {?} */
        let finalValue = null;
        /** @type {?} */
        const trimValues = (this._options & 1 /* TrimProperties */) ? true : false;
        /** @type {?} */
        const parseOutUnits = (this._options & 8 /* AllowUnits */) ? true : false;
        /** @type {?} */
        const allowSubKeys = (this._options & 2 /* AllowSubKeys */) ? true : false;
        switch (this._lastSetValueType) {
            // case 1: [input]="string"
            case 1 /* String */:
                /** @type {?} */
                const tokens = ((/** @type {?} */ (this._lastSetValue))).split(/\s+/g);
                if (this._options & 16 /* ForceAsMap */) {
                    finalValue = {};
                    tokens.forEach((/**
                     * @param {?} token
                     * @param {?} i
                     * @return {?}
                     */
                    (token, i) => ((/** @type {?} */ (finalValue)))[token] = true));
                }
                else {
                    finalValue = tokens.reduce((/**
                     * @param {?} str
                     * @param {?} token
                     * @param {?} i
                     * @return {?}
                     */
                    (str, token, i) => str + (i ? ' ' : '') + token));
                }
                break;
            // case 2: [input]="{key:value}"
            case 2 /* Map */:
                /** @type {?} */
                const map = (/** @type {?} */ (this._lastSetValue));
                /** @type {?} */
                const keys = Object.keys(map);
                if (!valueHasChanged) {
                    if (this.value) {
                        // we know that the classExp value exists and that it is
                        // a map (otherwise an identity change would have occurred)
                        valueHasChanged = mapHasChanged(keys, (/** @type {?} */ (this.value)), map);
                    }
                    else {
                        valueHasChanged = true;
                    }
                }
                if (valueHasChanged) {
                    finalValue =
                        bulidMapFromValues(this._name, trimValues, parseOutUnits, allowSubKeys, map, keys);
                }
                break;
            // case 3a: [input]="[str1, str2, ...]"
            // case 3b: [input]="Set"
            case 4 /* Array */:
            case 8 /* Set */:
                /** @type {?} */
                const values = Array.from((/** @type {?} */ (this._lastSetValue)));
                if (!valueHasChanged) {
                    /** @type {?} */
                    const keys = Object.keys((/** @type {?} */ (this.value)));
                    valueHasChanged = !arrayEqualsArray(keys, values);
                }
                if (valueHasChanged) {
                    finalValue =
                        bulidMapFromValues(this._name, trimValues, parseOutUnits, allowSubKeys, values);
                }
                break;
            // case 4: [input]="null|undefined"
            default:
                finalValue = null;
                break;
        }
        if (valueHasChanged) {
            ((/** @type {?} */ (this))).value = (/** @type {?} */ (finalValue));
        }
        return valueHasChanged;
    }
}
if (false) {
    /** @type {?} */
    StylingDiffer.prototype.value;
    /**
     * @type {?}
     * @private
     */
    StylingDiffer.prototype._lastSetValue;
    /**
     * @type {?}
     * @private
     */
    StylingDiffer.prototype._lastSetValueType;
    /**
     * @type {?}
     * @private
     */
    StylingDiffer.prototype._lastSetValueIdentityChange;
    /**
     * @type {?}
     * @private
     */
    StylingDiffer.prototype._name;
    /**
     * @type {?}
     * @private
     */
    StylingDiffer.prototype._options;
}
/** @enum {number} */
const StylingDifferOptions = {
    None: 0,
    TrimProperties: 1,
    AllowSubKeys: 2,
    AllowStringValue: 4,
    AllowUnits: 8,
    ForceAsMap: 16,
};
/** @enum {number} */
const StylingDifferValueTypes = {
    Null: 0,
    String: 1,
    Map: 2,
    Array: 4,
    Set: 8,
    Collection: 14,
};
/**
 * builds and returns a map based on the values input value
 *
 * If the `keys` param is provided then the `values` param is treated as a
 * string map. Otherwise `values` is treated as a string array.
 * @param {?} errorPrefix
 * @param {?} trim
 * @param {?} parseOutUnits
 * @param {?} allowSubKeys
 * @param {?} values
 * @param {?=} keys
 * @return {?}
 */
function bulidMapFromValues(errorPrefix, trim, parseOutUnits, allowSubKeys, values, keys) {
    /** @type {?} */
    const map = {};
    if (keys) {
        // case 1: map
        for (let i = 0; i < keys.length; i++) {
            /** @type {?} */
            let key = keys[i];
            key = trim ? key.trim() : key;
            /** @type {?} */
            const value = ((/** @type {?} */ (values)))[key];
            setMapValues(map, key, value, parseOutUnits, allowSubKeys);
        }
    }
    else {
        // case 2: array
        for (let i = 0; i < values.length; i++) {
            /** @type {?} */
            let value = ((/** @type {?} */ (values)))[i];
            assertValidValue(errorPrefix, value);
            value = trim ? value.trim() : value;
            setMapValues(map, value, true, false, allowSubKeys);
        }
    }
    return map;
}
/**
 * @param {?} errorPrefix
 * @param {?} value
 * @return {?}
 */
function assertValidValue(errorPrefix, value) {
    if (typeof value !== 'string') {
        throw new Error(`${errorPrefix} can only toggle CSS classes expressed as strings, got ${value}`);
    }
}
/**
 * @param {?} map
 * @param {?} key
 * @param {?} value
 * @param {?} parseOutUnits
 * @param {?} allowSubKeys
 * @return {?}
 */
function setMapValues(map, key, value, parseOutUnits, allowSubKeys) {
    if (allowSubKeys && key.indexOf(' ') > 0) {
        /** @type {?} */
        const innerKeys = key.split(/\s+/g);
        for (let j = 0; j < innerKeys.length; j++) {
            setIndividualMapValue(map, innerKeys[j], value, parseOutUnits);
        }
    }
    else {
        setIndividualMapValue(map, key, value, parseOutUnits);
    }
}
/**
 * @param {?} map
 * @param {?} key
 * @param {?} value
 * @param {?} parseOutUnits
 * @return {?}
 */
function setIndividualMapValue(map, key, value, parseOutUnits) {
    if (parseOutUnits) {
        /** @type {?} */
        const values = normalizeStyleKeyAndValue(key, value);
        value = values.value;
        key = values.key;
    }
    map[key] = value;
}
/**
 * @param {?} key
 * @param {?} value
 * @return {?}
 */
function normalizeStyleKeyAndValue(key, value) {
    /** @type {?} */
    const index = key.indexOf('.');
    if (index > 0) {
        /** @type {?} */
        const unit = key.substr(index + 1);
        key = key.substring(0, index);
        if (value != null) { // we should not convert null values to string
            value += unit;
        }
    }
    return { key, value };
}
/**
 * @param {?} keys
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function mapHasChanged(keys, a, b) {
    /** @type {?} */
    const oldKeys = Object.keys(a);
    /** @type {?} */
    const newKeys = keys;
    // the keys are different which means the map changed
    if (!arrayEqualsArray(oldKeys, newKeys)) {
        return true;
    }
    for (let i = 0; i < newKeys.length; i++) {
        /** @type {?} */
        const key = newKeys[i];
        if (a[key] !== b[key]) {
            return true;
        }
    }
    return false;
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function arrayEqualsArray(a, b) {
    if (a && b) {
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++) {
            if (b.indexOf(a[i]) === -1)
                return false;
        }
        return true;
    }
    return false;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PBL_NGRID_ROW_TEMPLATE = `<ng-content select=".pbl-ngrid-row-prefix"></ng-content>${CDK_ROW_TEMPLATE}<ng-content select=".pbl-ngrid-row-suffix"></ng-content>`;
/**
 * @template T
 */
class PblNgridRowComponent extends CdkRow {
    /**
     * @param {?} extApi
     * @param {?} el
     */
    constructor(extApi, el) {
        super();
        this.extApi = extApi;
        this.el = el;
        if (extApi) {
            this.grid = extApi.grid;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set row(value) { value && this.updateRow(); }
    /**
     * @return {?}
     */
    updateRow() {
        if (this.extApi) {
            if (!(this.rowRenderIndex >= 0)) {
                this.getRend();
            }
            this.context = this.extApi.contextApi.rowContext(this.rowRenderIndex);
            this.el.nativeElement.setAttribute('row-id', (/** @type {?} */ (this.context.dataIndex)));
            this.el.nativeElement.setAttribute('row-key', this.context.identity);
            if (this.grid.rowClassUpdate && this.grid.rowClassUpdateFreq === 'item') {
                this.updateHostClass();
            }
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.grid.rowClassUpdate && this.grid.rowClassUpdateFreq === 'ngDoCheck') {
            this.updateHostClass();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.extApi) {
            if (!this.grid) {
                throw new Error('"pbl-ngrid-row" is used outside the scope of a grid, you must provide a grid instance.');
            }
            /** @type {?} */
            const controller = PblNgridPluginController.find(this.grid);
            this.extApi = controller.extApi;
            this.updateRow();
        }
    }
    /**
     * @return {?}
     */
    getRend() {
        /** @type {?} */
        const vcRef = this.extApi.cdkTable._rowOutlet.viewContainer;
        /** @type {?} */
        const len = vcRef.length - 1;
        for (let i = len; i > -1; i--) {
            /** @type {?} */
            const viewRef = (/** @type {?} */ (vcRef.get(i)));
            if (viewRef.rootNodes[0] === this.el.nativeElement) {
                this.rowRenderIndex = i;
                break;
            }
        }
    }
    /**
     * @protected
     * @return {?}
     */
    updateHostClass() {
        if (this.context) {
            /** @type {?} */
            const el = this.el.nativeElement;
            // if there is an updater, work with it
            // otherwise, clear previous classes that got applied (assumed a live binding change of the updater function)
            // users should be aware to tear down the updater only when they want to stop this feature, if the goal is just to toggle on/off
            // it's better to set the frequency to `none` and return nothing from the function (replace it) so the differ is not nuked.
            if (this.grid.rowClassUpdate) {
                if (!this._classDiffer) {
                    this._classDiffer = new StylingDiffer('NgClass', 1 /* TrimProperties */ | 2 /* AllowSubKeys */ | 4 /* AllowStringValue */ | 16 /* ForceAsMap */);
                    this._lastClass = new Set();
                }
                /** @type {?} */
                const newValue = this.grid.rowClassUpdate(this.context);
                this._classDiffer.setValue(newValue);
                if (this._classDiffer.hasValueChanged()) {
                    /** @type {?} */
                    const lastClass = this._lastClass;
                    this._lastClass = new Set();
                    /** @type {?} */
                    const value = this._classDiffer.value || {};
                    for (const key of Object.keys(value)) {
                        if (value[key]) {
                            el.classList.add(key);
                            this._lastClass.add(key);
                        }
                        else {
                            el.classList.remove(key);
                        }
                        lastClass.delete(key);
                    }
                    if (lastClass.size > 0) {
                        for (const key of lastClass.values()) {
                            el.classList.remove(key);
                        }
                    }
                }
            }
            else if (this._classDiffer) {
                /** @type {?} */
                const value = this._classDiffer.value || {};
                this._classDiffer = this._lastClass = undefined;
                for (const key of Object.keys(value)) {
                    el.classList.remove(key);
                }
            }
        }
    }
}
PblNgridRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-ngrid-row[row]',
                template: PBL_NGRID_ROW_TEMPLATE,
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    'class': 'pbl-ngrid-row',
                    'role': 'row',
                },
                providers: [
                    { provide: CdkRow, useExisting: PblNgridRowComponent }
                ],
                exportAs: 'pblNgridRow',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
PblNgridRowComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [EXT_API_TOKEN,] }] },
    { type: ElementRef }
];
PblNgridRowComponent.propDecorators = {
    row: [{ type: Input }],
    grid: [{ type: Input }]
};
if (false) {
    /**
     * Optional grid instance, required only if the row is declared outside the scope of the grid.
     * @type {?}
     */
    PblNgridRowComponent.prototype.grid;
    /** @type {?} */
    PblNgridRowComponent.prototype.rowRenderIndex;
    /** @type {?} */
    PblNgridRowComponent.prototype.context;
    /**
     * @type {?}
     * @private
     */
    PblNgridRowComponent.prototype._classDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridRowComponent.prototype._lastClass;
    /**
     * @type {?}
     * @protected
     */
    PblNgridRowComponent.prototype.extApi;
    /**
     * @type {?}
     * @protected
     */
    PblNgridRowComponent.prototype.el;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T, TKind
 */
class PblNgridSingleTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        this.tRef = tRef;
        this.registry = registry;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.registry.setSingle(this.kind, (/** @type {?} */ (this)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.registry.setSingle(this.kind, undefined);
    }
}
if (false) {
    /** @type {?} */
    PblNgridSingleTemplateRegistry.prototype.kind;
    /** @type {?} */
    PblNgridSingleTemplateRegistry.prototype.tRef;
    /**
     * @type {?}
     * @protected
     */
    PblNgridSingleTemplateRegistry.prototype.registry;
}
/**
 * @abstract
 * @template T, TKind
 */
class PblNgridMultiTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        this.tRef = tRef;
        this.registry = registry;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.registry.addMulti(this.kind, (/** @type {?} */ (this)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.registry.removeMulti(this.kind, (/** @type {?} */ (this)));
    }
}
if (false) {
    /** @type {?} */
    PblNgridMultiTemplateRegistry.prototype.name;
    /** @type {?} */
    PblNgridMultiTemplateRegistry.prototype.kind;
    /** @type {?} */
    PblNgridMultiTemplateRegistry.prototype.tRef;
    /**
     * @type {?}
     * @protected
     */
    PblNgridMultiTemplateRegistry.prototype.registry;
}
/**
 * @abstract
 * @template T, TKind
 */
class PblNgridMultiComponentRegistry {
}
if (false) {
    /** @type {?} */
    PblNgridMultiComponentRegistry.prototype.name;
    /** @type {?} */
    PblNgridMultiComponentRegistry.prototype.kind;
    /**
     * When set to true the component will be created with projected content.
     * Setting to true does not ensure projection, the projection is determined by the context creating the component.
     *
     * For example, In the context of `dataHeaderExtensions` the projection will be the content of the cell, other implementations
     * might not include a projection.
     * @type {?}
     */
    PblNgridMultiComponentRegistry.prototype.projectContent;
    /**
     * @abstract
     * @param {?} context
     * @return {?}
     */
    PblNgridMultiComponentRegistry.prototype.getFactory = function (context) { };
}
/**
 * @template T
 */
class PblNgridDataHeaderExtensionContext extends MetaCellContext {
    /**
     * @protected
     */
    constructor() { super(); }
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
    /**
     * @template T
     * @param {?} headerCell
     * @param {?} injector
     * @return {?}
     */
    static createDateHeaderCtx(headerCell, injector) {
        /** @type {?} */
        const instance = new PblNgridDataHeaderExtensionContext();
        instance.col = headerCell.columnDef.column;
        instance.grid = headerCell.grid;
        Object.defineProperty(instance, 'injector', { value: injector });
        return instance;
    }
}
if (false) {
    /** @type {?} */
    PblNgridDataHeaderExtensionContext.prototype.injector;
}
/**
 * @record
 * @template T
 */
function PblNgridDataHeaderExtensionRef() { }
if (false) {
    /**
     * @param {?} context
     * @return {?}
     */
    PblNgridDataHeaderExtensionRef.prototype.shouldRender = function (context) { };
}
/**
 * A generic, multi-purpose template reference for data header extensions.
 * The template's context is `PblNgridDataHeaderExtensionContext`:
 *
 * ```ts
 * interface PblNgridDataHeaderExtensionContext {
 *   col: PblMetaColumn;
 *   grid: PblNgridComponent<any>;
 *   injector: Injector;
 * }
 * ```
 *
 * By default it will render if registered but it is possible to provide a predicate to conditionally load it.
 *
 * ```html
 * <div *pblNgridHeaderExtensionRef="let ctx"></div>
 * ````
 *
 * Or with a `shouldRender` predicate:
 *
 * ```html
 * <div *pblNgridHeaderExtensionRef="shouldRender; let ctx"></div>
 * ```
 *
 * And in the component the template is defined on:
 *
 * ```ts
 * class MyComponent {
 *
 *   shouldRender = (context: PblNgridDataHeaderExtensionContext) => {
 *     // Some code returning true or false
 *   }
 * }
 * ```
 *
 * Note that the `shouldRender` predicate is run once when the header initialize.
 */
class PblNgridHeaderExtensionRefDirective extends PblNgridMultiTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        super(tRef, registry);
        this.name = 'genericHeaderExtension-' + PblNgridHeaderExtensionRefDirective._id++;
        this.kind = 'dataHeaderExtensions';
    }
}
PblNgridHeaderExtensionRefDirective._id = 0;
PblNgridHeaderExtensionRefDirective.decorators = [
    { type: Directive, args: [{ selector: '[pblNgridHeaderExtensionRef]' },] }
];
/** @nocollapse */
PblNgridHeaderExtensionRefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
PblNgridHeaderExtensionRefDirective.propDecorators = {
    shouldRender: [{ type: Input, args: ['pblNgridHeaderExtensionRef',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridHeaderExtensionRefDirective._id;
    /** @type {?} */
    PblNgridHeaderExtensionRefDirective.prototype.name;
    /** @type {?} */
    PblNgridHeaderExtensionRefDirective.prototype.kind;
    /** @type {?} */
    PblNgridHeaderExtensionRefDirective.prototype.shouldRender;
}
/**
 * Marks the element as the display element for pagination
 */
class PblNgridPaginatorRefDirective extends PblNgridSingleTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        super(tRef, registry);
        this.kind = 'paginator';
    }
}
PblNgridPaginatorRefDirective.decorators = [
    { type: Directive, args: [{ selector: '[pblNgridPaginatorRef]' },] }
];
/** @nocollapse */
PblNgridPaginatorRefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
if (false) {
    /** @type {?} */
    PblNgridPaginatorRefDirective.prototype.kind;
}
/**
 * Marks the element as the display element when grid has no data.
 *
 * \@example
 * ```html
 *   <pbl-ngrid>
 *     <div *pblNgridNoDataRef style="height: 100%; display: flex; align-items: center; justify-content: center">
 *       <span>No Data</span>
 *     </div>
 *   </pbl-ngrid>
 * ```
 */
class PblNgridNoDataRefDirective extends PblNgridSingleTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        super(tRef, registry);
        this.kind = 'noData';
    }
}
PblNgridNoDataRefDirective.decorators = [
    { type: Directive, args: [{ selector: '[pblNgridNoDataRef]' },] }
];
/** @nocollapse */
PblNgridNoDataRefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
if (false) {
    /** @type {?} */
    PblNgridNoDataRefDirective.prototype.kind;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A directive that marks the template as a projected section inside the grid.
 * The location of the project content is set by the position input.
 *
 * Note that this directive can only be set as the content inside the grid.
 */
class PblNgridOuterSectionDirective {
    // tslint:disable-line:no-input-rename
    /**
     * @param {?} grid
     * @param {?} tRef
     */
    constructor(grid, tRef) {
        this.grid = grid;
        this.tRef = tRef;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.grid.createView(this.position === 'bottom' ? 'beforeContent' : 'beforeTable', this.tRef);
    }
}
PblNgridOuterSectionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblNgridOuterSection]',
                inputs: ['position:pblNgridOuterSection'] // tslint:disable-line:use-input-property-decorator
            },] }
];
/** @nocollapse */
PblNgridOuterSectionDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    PblNgridOuterSectionDirective.prototype.position;
    /**
     * @type {?}
     * @private
     */
    PblNgridOuterSectionDirective.prototype.grid;
    /**
     * @type {?}
     * @private
     */
    PblNgridOuterSectionDirective.prototype.tRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This file contains constants shared between modules (files) that if not extract will cause a circular dependency
 */
/** @type {?} */
const COLUMN_NAME_CSS_PREFIX = 'pbl-ngrid-column';
/** @type {?} */
const COLUMN_EDITABLE_CELL_CLASS = 'pbl-ngrid-editable-cell';
/**
 * Returns a css class unique to the column
 * @param {?} columnDef
 * @return {?}
 */
function uniqueColumnCss(columnDef) {
    return `${COLUMN_NAME_CSS_PREFIX}-${columnDef.cssClassFriendlyName}`;
}
/**
 * Returns a css class unique to the type of the column (columns might share types)
 * @param {?} type
 * @return {?}
 */
function uniqueColumnTypeCss(type) {
    return `${COLUMN_NAME_CSS_PREFIX}-type-${type.name}`;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function WidthChangeEvent() { }
if (false) {
    /** @type {?} */
    WidthChangeEvent.prototype.reason;
}
/**
 * Represents a runtime column definition for a user-defined column definitions.
 *
 * User defined column definitions are `PblColumn`, `PblMetaColumn`, `PblColumnGroup` etc...
 * They represent static column definitions and `PblNgridColumnDef` is the runtime instance of them.
 *
 * @template T
 */
class PblNgridColumnDef extends CdkColumnDef {
    /**
     * @param {?} extApi
     */
    constructor(extApi) {
        super();
        this.extApi = extApi;
        this.isDragging = false;
        /**
         * An event emitted when width of this column has changed.
         */
        this.widthChange = new EventEmitter();
        /**
         * The complete width definition for the column.
         *
         * There are 2 width sets (tuple):
         * - [0]: The source width definitions as set in static column definition instance
         * - [1]: The absolute width definitions, as currently set in the DOM (getBoundingClientRect())
         *
         * Each set is made up of 3 primitive width definitions: MIN-WIDTH, WIDTH and MAX-WIDTH.
         * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
         */
        this._widths = [];
        this.grid = this.table = extApi.grid;
        /** @type {?} */
        const s = extApi.dynamicColumnWidthFactory().strategy;
        this.widthBreakout = (/**
         * @param {?} c
         * @return {?}
         */
        c => widthBreakout(s, c));
    }
    /**
     * @return {?}
     */
    get column() { return this._column; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set column(value) { this.attach(value); }
    /**
     * The absolute width definitions, as currently set in the DOM (getBoundingClientRect()).
     * If no measurements exists yet, return the user defined width's.
     *
     * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
     * @return {?}
     */
    get widths() { return this._widths[1]; }
    /**
     * The last net width of the column.
     * The net width is the absolute width of the column, without padding, border etc...
     * @return {?}
     */
    get netWidth() { return this._netWidth; }
    /**
     * Update the "widths" for this column and when width has changed.
     *
     * The "widths" are the 3 values representing a width of a cell: [minWidth, width, maxWidth],
     * this method is given the width and will calculate the minWidth and maxWidth based on the column definitions.
     *
     * If at least one value of "widths" has changed, fires the `widthChange` event with the `reason` provided.
     *
     * The reason can be used to optionally update the relevant cells, based on the source (reason) of the update.
     * - attach: This runtime column definition instance was attached to a static column definition instance.
     * - update: The width value was updated in the static column definition instance , which triggered a width update to the runtime column definition instance
     * - resize: A resize event to the header PblColumn cell was triggered, the width of the static column definition is not updated, only the runtime value is.
     *
     * Note that this updates the width of the column-def instance, not the column definitions width itself.
     * Only when `reason === 'update'` it means that the column definition was updated and triggered this update
     *
     * @param {?} width The new width
     * @param {?} reason The reason for this change
     * @return {?}
     */
    updateWidth(width, reason) {
        const { isFixedWidth, parsedWidth } = this._column;
        /*  Setting the minimum width is based on the input.
                If the original width is pixel fixed we will take the maximum between it and the min width.
                If not, we will the take minWidth.
                If none of the above worked we will try to see if the current width is set with %, if so it will be our min width.
            */
        /** @type {?} */
        const minWidthPx = isFixedWidth
            ? Math.max(this._column.parsedWidth.value, this._column.minWidth || 0)
            : this._column.minWidth;
        /** @type {?} */
        let minWidth = minWidthPx && `${minWidthPx}px`;
        if (!minWidth && parsedWidth && parsedWidth.type === '%') {
            minWidth = width;
        }
        /** @type {?} */
        const maxWidth = isFixedWidth
            ? Math.min(this._column.parsedWidth.value, this._column.maxWidth || this._column.parsedWidth.value)
            : this._column.maxWidth;
        /** @type {?} */
        const newWidths = (/** @type {?} */ ([minWidth || '', width, maxWidth ? `${maxWidth}px` : width]));
        if (reason === 'resize') {
            this._widths[1] = newWidths;
            this.widthChange.emit({ reason });
        }
        else {
            /** @type {?} */
            const prev = this._widths[0] || [];
            this._widths[0] = newWidths;
            if (!this._widths[1]) {
                this._widths[1] = newWidths;
            }
            for (let i = 0; i < 3; i++) {
                if (prev[i] !== newWidths[i]) {
                    this.widthChange.emit({ reason });
                    break;
                }
            }
        }
    }
    /**
     * Apply the current absolute width definitions (minWidth, width, maxWidth) onto an element.
     * @param {?} element
     * @return {?}
     */
    applyWidth(element) { setWidth(element, this.widths); }
    /**
     * Apply the source width definitions )set in static column definition instance) onto an element.
     * @param {?} element
     * @return {?}
     */
    applySourceWidth(element) { setWidth(element, this._widths[0]); }
    /**
     * Query for cell elements related to this column definition.
     *
     * This query is not cached - cache in implementation.
     * @param {...?} filter
     * @return {?}
     */
    queryCellElements(...filter) {
        /** @type {?} */
        const cssId = `.${uniqueColumnCss(this)}`;
        /** @type {?} */
        const query = [];
        if (filter.length === 0) {
            query.push(cssId);
        }
        else {
            for (const f of filter) {
                switch (f) {
                    case 'table':
                        query.push(`.pbl-ngrid-cell${cssId}`);
                        break;
                    case 'header':
                        query.push(`.pbl-ngrid-header-cell${cssId}:not(.pbl-header-group-cell)`);
                        break;
                    case 'headerGroup':
                        query.push(`.pbl-header-group-cell${cssId}`);
                        break;
                    case 'footer':
                        query.push(`.pbl-ngrid-footer-cell${cssId}:not(.pbl-footer-group-cell)`);
                        break;
                    case 'footerGroup':
                        query.push(`.pbl-footer-group-cell${cssId}`);
                        break;
                }
            }
        }
        // we query from the master table container and not CDKTable because of fixed meta rows
        return query.length === 0 ? [] : (/** @type {?} */ (Array.from(this.extApi.element.querySelectorAll(query.join(', ')))));
    }
    /**
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.detach();
        this.widthChange.complete();
    }
    /**
     * @return {?}
     */
    onResize() {
        if (isPblColumn(this.column)) {
            /** @type {?} */
            const prevNetWidth = this._netWidth;
            this._netWidth = this.widthBreakout(this.column.sizeInfo).content;
            if (prevNetWidth !== this._netWidth) {
                /** @type {?} */
                const width = `${this._netWidth}px`;
                this.updateWidth(width, 'resize');
            }
        }
    }
    /**
     * @param {?=} pin
     * @return {?}
     */
    updatePin(pin) {
        this.sticky = this.stickyEnd = false;
        switch (pin) {
            case 'start':
                this.sticky = true;
                break;
            case 'end':
                this.stickyEnd = true;
                break;
        }
        if (this.grid.isInit) {
            this.grid._cdkTable.updateStickyColumnStyles();
        }
    }
    /**
     * @private
     * @param {?} column
     * @return {?}
     */
    attach(column) {
        if (this._column !== column) {
            this.detach();
            if (column) {
                this._column = column;
                ((/** @type {?} */ (column))).attach(this);
                this.name = column.id.replace(/ /g, '_');
                if (isPblColumn(column)) {
                    this.updatePin(column.pin);
                }
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    detach() {
        if (this._column) {
            this._column.detach();
            this._column = undefined;
        }
    }
}
PblNgridColumnDef.decorators = [
    { type: Directive, args: [{
                selector: '[pblNgridColumnDef]',
                providers: [
                    { provide: CdkColumnDef, useExisting: PblNgridColumnDef },
                    { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: PblNgridColumnDef }
                ],
            },] }
];
/** @nocollapse */
PblNgridColumnDef.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [EXT_API_TOKEN,] }] }
];
PblNgridColumnDef.propDecorators = {
    column: [{ type: Input, args: ['pblNgridColumnDef',] }],
    widthChange: [{ type: Output, args: ['pblNgridColumnDefWidthChange',] }]
};
if (false) {
    /** @type {?} */
    PblNgridColumnDef.prototype.isDragging;
    /**
     * @deprecated use grid instead
     * @type {?}
     */
    PblNgridColumnDef.prototype.table;
    /** @type {?} */
    PblNgridColumnDef.prototype.grid;
    /**
     * An event emitted when width of this column has changed.
     * @type {?}
     */
    PblNgridColumnDef.prototype.widthChange;
    /**
     * @type {?}
     * @private
     */
    PblNgridColumnDef.prototype._column;
    /**
     * The complete width definition for the column.
     *
     * There are 2 width sets (tuple):
     * - [0]: The source width definitions as set in static column definition instance
     * - [1]: The absolute width definitions, as currently set in the DOM (getBoundingClientRect())
     *
     * Each set is made up of 3 primitive width definitions: MIN-WIDTH, WIDTH and MAX-WIDTH.
     * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
     * @type {?}
     * @private
     */
    PblNgridColumnDef.prototype._widths;
    /**
     * The last net width of the column.
     * The net width is the absolute width of the column, without padding, border etc...
     * @type {?}
     * @private
     */
    PblNgridColumnDef.prototype._netWidth;
    /**
     * @type {?}
     * @private
     */
    PblNgridColumnDef.prototype.widthBreakout;
    /**
     * @type {?}
     * @protected
     */
    PblNgridColumnDef.prototype.extApi;
    /* Skipping unhandled member: ;*/
}
/**
 * Set the widths of an HTMLElement
 * @param {?} el The element to set widths to
 * @param {?} widths The widths, a tuple of 3 strings [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
 * @return {?}
 */
function setWidth(el, widths) {
    el.style.minWidth = widths[0];
    el.style.width = widths[1];
    el.style.maxWidth = widths[2];
    // TODO(shlomiassaf)[perf, 4]: Instead of using a tuple for width, use a CSSStyleDeclaration object and just assign the props
    // This will avoid the additional check for %
    // We will need to implement it in all places that `_widths` is updated in `PblNgridColumnDef`
    // Another TODO is to cache the previous `boxSizing` in any case the column definition changes.
    // When the column does not have an explicit `minWidth` set and when the `width` is set explicitly to a % value
    // the logic in `PblNgridColumnDef.updateWidth` will set `minWidth` to the same value in `width`
    // This will cause an overflow unless we apply the border-box model
    if (widths[0] && widths[0].endsWith('%')) {
        el.style.boxSizing = 'border-box';
    }
    else {
        el.style.boxSizing = 'content-box';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const HEADER_GROUP_CSS = `pbl-header-group-cell`;
/** @type {?} */
const HEADER_GROUP_PLACE_HOLDER_CSS = `pbl-header-group-cell-placeholder`;
/**
 * @param {?} el
 * @param {?} column
 * @return {?}
 */
function initCellElement(el, column) {
    el.classList.add(uniqueColumnCss(column.columnDef));
    if (column.type) {
        el.classList.add(uniqueColumnTypeCss(column.type));
    }
    if (column.css) {
        /** @type {?} */
        const css = column.css.split(' ');
        for (const c of css) {
            el.classList.add(c);
        }
    }
}
/**
 * @param {?} el
 * @param {?} column
 * @return {?}
 */
function initDataCellElement(el, column) {
    if (column.editable && column.editorTpl) {
        el.classList.add(COLUMN_EDITABLE_CELL_CLASS);
    }
}
/** @type {?} */
const lastDataHeaderExtensions = new Map();
/**
 * @this {?}
 * @return {?}
 */
function applyWidth() {
    this.columnDef.applyWidth(this.el);
}
/**
 * @this {?}
 * @return {?}
 */
function applySourceWidth() {
    this.columnDef.applySourceWidth(this.el);
}
/**
 * Header cell component.
 * The header cell component will render the header cell template and add the proper classes and role.
 *
 * It is also responsible for creating and managing the any `dataHeaderExtensions` registered in the registry.
 * These extensions add features to the cells either as a template instance or as a component instance.
 * Examples: Sorting behavior, drag&drop/resize handlers, menus etc...
 * @template T
 */
let PblNgridHeaderCellComponent = /**
 * Header cell component.
 * The header cell component will render the header cell template and add the proper classes and role.
 *
 * It is also responsible for creating and managing the any `dataHeaderExtensions` registered in the registry.
 * These extensions add features to the cells either as a template instance or as a component instance.
 * Examples: Sorting behavior, drag&drop/resize handlers, menus etc...
 * @template T
 */
class PblNgridHeaderCellComponent extends CdkHeaderCell {
    /**
     * @param {?} columnDef
     * @param {?} grid
     * @param {?} elementRef
     * @param {?} zone
     */
    constructor(columnDef, grid, elementRef, zone) {
        super(columnDef, elementRef);
        this.columnDef = columnDef;
        this.grid = grid;
        this.elementRef = elementRef;
        this.zone = zone;
        this.table = grid;
        /** @type {?} */
        const column = columnDef.column;
        /** @type {?} */
        const el = this.el = elementRef.nativeElement;
        if (isPblColumnGroup(column)) {
            el.classList.add(HEADER_GROUP_CSS);
            if (column.placeholder) {
                el.classList.add(HEADER_GROUP_PLACE_HOLDER_CSS);
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const col = this.columnDef.column;
        /** @type {?} */
        let predicate;
        /** @type {?} */
        let view;
        /** @type {?} */
        let widthUpdater;
        if (isPblColumn(col)) {
            /** @type {?} */
            const gridWidthRow = this.el.parentElement.hasAttribute('gridWidthRow');
            widthUpdater = gridWidthRow ? applySourceWidth : applyWidth;
            predicate = (/**
             * @param {?} event
             * @return {?}
             */
            event => (!gridWidthRow && event.reason !== 'update') || (gridWidthRow && event.reason !== 'resize'));
            view = !gridWidthRow ? this.initMainHeaderColumnView(col) : undefined;
        }
        else {
            widthUpdater = applySourceWidth;
            predicate = (/**
             * @param {?} event
             * @return {?}
             */
            event => event.reason !== 'resize');
            view = this.initMetaHeaderColumnView(col);
        }
        this.columnDef.widthChange
            .pipe(filter$1(predicate), UnRx(this))
            .subscribe(widthUpdater.bind(this));
        view && view.detectChanges();
        widthUpdater.call(this);
        initCellElement(this.el, col);
    }
    /**
     * @protected
     * @param {?} col
     * @return {?}
     */
    initMainHeaderColumnView(col) {
        this.cellCtx = PblNgridDataHeaderExtensionContext.createDateHeaderCtx((/** @type {?} */ (this)), this.vcRef.injector);
        /** @type {?} */
        const context = (/** @type {?} */ (this.cellCtx));
        /** @type {?} */
        const view = this.vcRef.createEmbeddedView(col.headerCellTpl, context);
        this.zone.onStable
            .pipe(first())
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.runHeaderExtensions(context, (/** @type {?} */ (view)));
            /** @type {?} */
            const v = this.vcRef.get(0);
            // at this point the view might get destroyed, its possible...
            if (!v.destroyed) {
                v.detectChanges();
            }
        }));
        return view;
    }
    /**
     * @protected
     * @param {?} col
     * @return {?}
     */
    initMetaHeaderColumnView(col) {
        this.cellCtx = MetaCellContext.create(col, this.grid);
        return this.vcRef.createEmbeddedView(col.template, this.cellCtx);
    }
    /**
     * @protected
     * @param {?} context
     * @param {?} view
     * @return {?}
     */
    runHeaderExtensions(context, view) {
        // we collect the first header extension for each unique name only once per grid instance
        /** @type {?} */
        let extensions = lastDataHeaderExtensions.get(this.grid);
        if (!extensions) {
            /** @type {?} */
            const dataHeaderExtensions = new Map();
            this.grid.registry.forMulti('dataHeaderExtensions', (/**
             * @param {?} values
             * @return {?}
             */
            values => {
                for (const value of values) {
                    if (!dataHeaderExtensions.has(value.name)) {
                        dataHeaderExtensions.set(value.name, value);
                    }
                }
            }));
            extensions = Array.from(dataHeaderExtensions.values());
            lastDataHeaderExtensions.set(this.grid, extensions);
            // destroy it on the next turn, we know all cells will render on the same turn.
            this.zone.onStable.pipe(first()).subscribe((/**
             * @return {?}
             */
            () => lastDataHeaderExtensions.delete(this.grid)));
        }
        let { rootNodes } = view;
        for (const ext of extensions) {
            if (!ext.shouldRender || ext.shouldRender(context)) {
                if (ext instanceof PblNgridMultiTemplateRegistry) {
                    /** @type {?} */
                    const extView = this.vcRef.createEmbeddedView(ext.tRef, context);
                    extView.markForCheck();
                }
                else if (ext instanceof PblNgridMultiComponentRegistry) {
                    rootNodes = this.createComponent(ext, context, rootNodes);
                }
            }
        }
    }
    /**
     * @protected
     * @param {?} ext
     * @param {?} context
     * @param {?} rootNodes
     * @return {?}
     */
    createComponent(ext, context, rootNodes) {
        /** @type {?} */
        const factory = ext.getFactory(context);
        /** @type {?} */
        const projectedContent = [];
        if (ext.projectContent) {
            projectedContent.push(rootNodes);
        }
        /** @type {?} */
        const cmpRef = this.vcRef.createComponent(factory, 0, null, projectedContent);
        if (ext.projectContent) {
            rootNodes = [cmpRef.location.nativeElement];
        }
        if (ext.onCreated) {
            ext.onCreated(context, cmpRef);
        }
        return rootNodes;
    }
};
PblNgridHeaderCellComponent.ctorParameters = () => [
    { type: PblNgridColumnDef },
    { type: PblNgridComponent },
    { type: ElementRef },
    { type: NgZone }
];
PblNgridHeaderCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-ngrid-header-cell',
                host: {
                    class: 'pbl-ngrid-header-cell',
                    role: 'columnheader',
                },
                exportAs: 'ngridHeaderCell',
                template: `<ng-container #vcRef></ng-container>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
PblNgridHeaderCellComponent.ctorParameters = () => [
    { type: PblNgridColumnDef },
    { type: PblNgridComponent },
    { type: ElementRef },
    { type: NgZone }
];
PblNgridHeaderCellComponent.propDecorators = {
    vcRef: [{ type: ViewChild, args: ['vcRef', { read: ViewContainerRef, static: true },] }]
};
/**
 * Header cell component.
 * The header cell component will render the header cell template and add the proper classes and role.
 *
 * It is also responsible for creating and managing the any `dataHeaderExtensions` registered in the registry.
 * These extensions add features to the cells either as a template instance or as a component instance.
 * Examples: Sorting behavior, drag&drop/resize handlers, menus etc...
 * @template T
 */
PblNgridHeaderCellComponent = __decorate([
    UnRx(),
    __metadata("design:paramtypes", [PblNgridColumnDef,
        PblNgridComponent,
        ElementRef,
        NgZone])
], PblNgridHeaderCellComponent);
if (false) {
    /** @type {?} */
    PblNgridHeaderCellComponent.prototype.vcRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridHeaderCellComponent.prototype.el;
    /** @type {?} */
    PblNgridHeaderCellComponent.prototype.cellCtx;
    /**
     * @deprecated use grid instead
     * @type {?}
     */
    PblNgridHeaderCellComponent.prototype.table;
    /** @type {?} */
    PblNgridHeaderCellComponent.prototype.columnDef;
    /** @type {?} */
    PblNgridHeaderCellComponent.prototype.grid;
    /** @type {?} */
    PblNgridHeaderCellComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridHeaderCellComponent.prototype.zone;
}
/**
 * Cell template container that adds the right classes and role.
 */
let PblNgridCellDirective = /**
 * Cell template container that adds the right classes and role.
 */
class PblNgridCellDirective extends CdkCell {
    /**
     * @param {?} colDef
     * @param {?} elementRef
     */
    constructor(colDef, elementRef) {
        super(colDef, elementRef);
        this.colDef = colDef;
        this.focused = false;
        this.selected = false;
        this.colIndex = this.colDef.grid.columnApi.indexOf((/** @type {?} */ (colDef.column)));
        this.el = elementRef.nativeElement;
        colDef.applyWidth(this.el);
        initCellElement(this.el, colDef.column);
        initDataCellElement(this.el, colDef.column);
        /*  Apply width changes to this data cell
            We don't update "update" events because they are followed by a resize event which will update the absolute value (px) */
        colDef.widthChange
            .pipe(filter$1((/**
         * @param {?} event
         * @return {?}
         */
        event => event.reason !== 'update')), UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => this.colDef.applyWidth(this.el)));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set rowCtx(value) {
        if (value !== this._rowCtx) {
            this._rowCtx = value;
            this.ngDoCheck();
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this._rowCtx) {
            /** @type {?} */
            const cellContext = this.cellCtx = this._rowCtx.cell(this.colIndex);
            if (cellContext.focused !== this.focused) {
                if (this.focused = cellContext.focused) {
                    this.el.classList.add('pbl-ngrid-cell-focused');
                }
                else {
                    this.el.classList.remove('pbl-ngrid-cell-focused');
                }
            }
            if (this.cellCtx.selected !== this.selected) {
                if (this.selected = cellContext.selected) {
                    this.el.classList.add('pbl-ngrid-cell-selected');
                }
                else {
                    this.el.classList.remove('pbl-ngrid-cell-selected');
                }
            }
        }
    }
};
PblNgridCellDirective.ctorParameters = () => [
    { type: PblNgridColumnDef },
    { type: ElementRef }
];
PblNgridCellDirective.decorators = [
    { type: Directive, args: [{
                selector: 'pbl-ngrid-cell',
                host: {
                    'class': 'pbl-ngrid-cell',
                    'role': 'gridcell',
                },
                exportAs: 'pblNgridCell',
            },] }
];
/** @nocollapse */
PblNgridCellDirective.ctorParameters = () => [
    { type: PblNgridColumnDef },
    { type: ElementRef }
];
PblNgridCellDirective.propDecorators = {
    rowCtx: [{ type: Input }]
};
/**
 * Cell template container that adds the right classes and role.
 */
PblNgridCellDirective = __decorate([
    UnRx(),
    __metadata("design:paramtypes", [PblNgridColumnDef, ElementRef])
], PblNgridCellDirective);
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridCellDirective.prototype._rowCtx;
    /** @type {?} */
    PblNgridCellDirective.prototype.cellCtx;
    /**
     * The position of the column def among all columns regardless of visibility.
     * @type {?}
     * @private
     */
    PblNgridCellDirective.prototype.colIndex;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellDirective.prototype.focused;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellDirective.prototype.selected;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellDirective.prototype.colDef;
}
let PblNgridFooterCellDirective = class PblNgridFooterCellDirective extends CdkFooterCell {
    /**
     * @param {?} columnDef
     * @param {?} grid
     * @param {?} elementRef
     */
    constructor(columnDef, grid, elementRef) {
        super(columnDef, elementRef);
        this.columnDef = columnDef;
        this.grid = grid;
        this.table = grid;
        this.el = elementRef.nativeElement;
        /** @type {?} */
        const column = columnDef.column;
        applyWidth.call(this);
        initCellElement(this.el, column);
        columnDef.widthChange
            .pipe(filter$1((/**
         * @param {?} event
         * @return {?}
         */
        event => event.reason !== 'update')), UnRx(this))
            .subscribe(applyWidth.bind(this));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.cellCtx = MetaCellContext.create(this.columnDef.column, this.grid);
    }
};
PblNgridFooterCellDirective.ctorParameters = () => [
    { type: PblNgridColumnDef },
    { type: PblNgridComponent },
    { type: ElementRef }
];
PblNgridFooterCellDirective.decorators = [
    { type: Directive, args: [{
                selector: 'pbl-ngrid-footer-cell',
                host: {
                    'class': 'pbl-ngrid-footer-cell',
                    'role': 'gridcell',
                },
                exportAs: 'ngridFooterCell',
            },] }
];
/** @nocollapse */
PblNgridFooterCellDirective.ctorParameters = () => [
    { type: PblNgridColumnDef },
    { type: PblNgridComponent },
    { type: ElementRef }
];
PblNgridFooterCellDirective = __decorate([
    UnRx(),
    __metadata("design:paramtypes", [PblNgridColumnDef,
        PblNgridComponent,
        ElementRef])
], PblNgridFooterCellDirective);
if (false) {
    /** @type {?} */
    PblNgridFooterCellDirective.prototype.cellCtx;
    /**
     * @deprecated use grid instead
     * @type {?}
     */
    PblNgridFooterCellDirective.prototype.table;
    /**
     * @type {?}
     * @private
     */
    PblNgridFooterCellDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    PblNgridFooterCellDirective.prototype.columnDef;
    /** @type {?} */
    PblNgridFooterCellDirective.prototype.grid;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
    We're using `StylingDiffer`, which is an exact copy of the style differ used for `ngStyle` and `ngClass`.
    The class is not exposed so we use a hard-copy.
    `StylingDiffer` is used only when IVY is enabled but here we've adopted it to be used in both modes. (pre IVY and IVY)
*/
/**
 * Bind to the class / style attributes of the container of a cell template.
 * For class bindings use [ngridCellClass] and for style bindings use [ngridCellStyle].
 *
 * This is like [ngClass] or [ngStyle] but not for the host of the directive but to it's parent.
 *
 * - [ngridCellClass] accepts the same type of values that [ngClass] does.
 * - [ngridCellStyle] accepts the same type of values that [ngStyle] does.
 *
 * ## Example
 *
 * We want to create a new cell type called "balance" that represents the balance of a bank account.
 * We also want to have different background color, green if the account balance if positive and red if it's negative.
 *
 * ```html
 * <div *pblNgridCellTypeDef="'balance'; value as value"
 *      [ngClass]="value < 0 ? 'balance-negative' : 'balance-positive'">{{ value  }}
 * </div>
 * ```
 *
 * The example above will work but the background will not fill the entire cell, only the `div` it is applied on.
 * This is because the container of the `div` has internal styling that apply padding (among other styles) to the cell.
 *
 * The container is controlled internally by ngrid, but you can access it's style / class attributes using this directive.
 *
 * ```html
 * <div *pblNgridCellTypeDef="'balance'; value as value"
 *      [ngridCellClass]="value < 0 ? 'balance-negative' : 'balance-positive'">{{ value  }}
 * </div>
 * ```
 *
 * > Because style / class is applied on the parent and the parent can have multiple children it is possible to apply this directive
 * on multiple children, do not do this as it will have unexpected results.
 */
class PblNgridCellStyling {
    /**
     * @param {?} elRef
     */
    constructor(elRef) {
        this.elRef = elRef;
        this._lastStyle = new Set();
        this._lastClass = new Set();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set style(value) {
        if (!this._styleDiffer) {
            this._styleDiffer = new StylingDiffer('NgStyle', 8 /* AllowUnits */);
        }
        this._styleDiffer.setValue(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set klass(value) {
        if (!this._classDiffer) {
            this._classDiffer = new StylingDiffer('NgClass', 1 /* TrimProperties */ | 2 /* AllowSubKeys */ | 4 /* AllowStringValue */ | 16 /* ForceAsMap */);
        }
        this._classDiffer.setValue(value);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._parent = this.elRef.nativeElement.parentElement;
        this.updateParent();
    }
    /**
     * @return {?}
     */
    ngDoCheck() { this, this.updateParent(); }
    /**
     * @private
     * @return {?}
     */
    updateParent() {
        if (this._parent) {
            if (this._styleDiffer && this._styleDiffer.hasValueChanged()) {
                /** @type {?} */
                const lastStyle = this._lastStyle;
                this._lastStyle = new Set();
                for (const key of Object.keys(this._styleDiffer.value)) {
                    this._parent.style[key] = this._styleDiffer.value[key];
                    lastStyle.delete(key);
                    this._lastStyle.add(key);
                }
                if (lastStyle.size > 0) {
                    for (const key of lastStyle.values()) {
                        this._parent.style[key] = null;
                    }
                }
            }
            if (this._classDiffer && this._classDiffer.hasValueChanged()) {
                /** @type {?} */
                const lastClass = this._lastClass;
                this._lastClass = new Set();
                for (const key of Object.keys(this._classDiffer.value)) {
                    if (this._classDiffer.value[key]) {
                        this._parent.classList.add(key);
                        this._lastClass.add(key);
                    }
                    else {
                        this._parent.classList.remove(key);
                    }
                    lastClass.delete(key);
                }
                if (lastClass.size > 0) {
                    for (const key of lastClass.values()) {
                        this._parent.classList.remove(key);
                    }
                }
            }
        }
    }
}
PblNgridCellStyling.decorators = [
    { type: Directive, args: [{ selector: '[ngridCellStyle], [ngridCellClass]' },] }
];
/** @nocollapse */
PblNgridCellStyling.ctorParameters = () => [
    { type: ElementRef }
];
PblNgridCellStyling.propDecorators = {
    style: [{ type: Input, args: ['ngridCellStyle',] }],
    klass: [{ type: Input, args: ['ngridCellClass',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridCellStyling.prototype._styleDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellStyling.prototype._classDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellStyling.prototype._parent;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellStyling.prototype._lastStyle;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellStyling.prototype._lastClass;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellStyling.prototype.elRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PblNgridCellEditAutoFocusDirective {
    /**
     * @param {?} elRef
     * @param {?} ngZone
     */
    constructor(elRef, ngZone) {
        this.elRef = elRef;
        this.ngZone = ngZone;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const doFocus = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const context = this.context;
            context.rowContext.updateOutOfViewState();
            if (context.editing && !context.rowContext.outOfView) {
                this.elRef.nativeElement.focus();
            }
        });
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            Promise.resolve().then((/**
             * @return {?}
             */
            () => {
                if (!this._destroyed) {
                    const { viewport } = this.context.grid;
                    if (viewport && viewport.isScrolling) {
                        viewport.scrolling.pipe(take(1)).subscribe(doFocus);
                    }
                    else {
                        doFocus();
                    }
                }
            }));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyed = true;
    }
}
PblNgridCellEditAutoFocusDirective.decorators = [
    { type: Directive, args: [{ selector: '[pblCellEditAutoFocus]' },] }
];
/** @nocollapse */
PblNgridCellEditAutoFocusDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
PblNgridCellEditAutoFocusDirective.propDecorators = {
    context: [{ type: Input, args: ['pblCellEditAutoFocus',] }]
};
if (false) {
    /** @type {?} */
    PblNgridCellEditAutoFocusDirective.prototype.context;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellEditAutoFocusDirective.prototype._destroyed;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellEditAutoFocusDirective.prototype.elRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellEditAutoFocusDirective.prototype.ngZone;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Returns the split range from an aggregated range.
 * An aggregated range describes the range of header, data and footer rows currently in view.
 * This function will split the range into core section, each having it's own range.
 *
 * Note that an aggregated range can span over a single section, all sections or just 2 sections.
 * If a section is not part of the aggregated range it's range is invalid, i.e: ListRange.start >= ListRange.end.
 *
 * @param {?} range The aggregated range
 * @param {?} headerLen The total length of header rows in the grid
 * @param {?} dataLen The total length of data rows in the grid
 * @return {?} A tuple containing the ranges [header, data, footer].
 */
function splitRange(range, headerLen, dataLen) {
    return [
        { start: range.start, end: headerLen },
        { start: Math.max(0, range.start - headerLen), end: Math.max(0, range.end - headerLen) },
        { start: 0, end: Math.max(0, range.end - (dataLen + headerLen)) },
    ];
}
/**
 * Update sticky positioning values to the rows to match virtual scroll content offset.
 * This function should run after `CdkTable` updated the sticky rows.
 *
 * ## Why
 * `CdkTable` applies sticky positioning to rows by setting top/bottom value to `0px`.
 * Virtual scroll use's a container with an offset to simulate the scrolling.
 *
 * The 2 does not work together, the virtual scroll offset will throw the sticky row out of bound, thus the top/bottom value must be compensated
 * based on the offset.
 * @param {?} offset
 * @param {?} rows
 * @param {?} stickyState
 * @param {?} type
 * @return {?}
 */
function updateStickyRows(offset, rows, stickyState, type) {
    /** @type {?} */
    const coeff = type === 'top' ? -1 : 1;
    /** @type {?} */
    let agg = 0;
    if (coeff === 1) {
        rows = rows.slice().reverse();
    }
    for (const i in rows) {
        if (stickyState[i]) {
            /** @type {?} */
            const row = rows[i];
            row.style[type] = `${coeff * (offset + (coeff * agg))}px`;
            agg += row.getBoundingClientRect().height; // TODO: cache this and update cache actively (size change)
            row.style.display = null;
        }
    }
}
/**
 * Measures the combined size (width for horizontal orientation, height for vertical) of all items
 * in the specified view within the specified range.
 * Throws an error if the range includes items that are not currently rendered.
 *
 * > This is function is identical to `CdkVirtualForOf.measureRangeSize` with minor adjustments
 * @param {?} viewContainer
 * @param {?} range
 * @param {?} renderedRange
 * @param {?} orientation
 * @param {?=} stickyState
 * @return {?}
 */
function measureRangeSize(viewContainer, range, renderedRange, orientation, stickyState = []) {
    if (range.start >= range.end) {
        return 0;
    }
    if (range.start < renderedRange.start || range.end > renderedRange.end) {
        throw Error(`Error: attempted to measure an item that isn't rendered.`);
    }
    // The index into the list of rendered views for the first item in the range.
    /** @type {?} */
    const renderedStartIndex = range.start - renderedRange.start;
    // The length of the range we're measuring.
    /** @type {?} */
    const rangeLen = range.end - range.start;
    // Loop over all root nodes for all items in the range and sum up their size.
    /** @type {?} */
    let totalSize = 0;
    /** @type {?} */
    let i = rangeLen;
    while (i--) {
        /** @type {?} */
        const index = i + renderedStartIndex;
        if (!stickyState[index]) {
            /** @type {?} */
            const view = (/** @type {?} */ (viewContainer.get(index)));
            /** @type {?} */
            let j = view ? view.rootNodes.length : 0;
            while (j--) {
                totalSize += getSize(orientation, view.rootNodes[j]);
            }
        }
    }
    return totalSize;
}
/**
 * Helper to extract size from a DOM Node.
 * @param {?} orientation
 * @param {?} node
 * @return {?}
 */
function getSize(orientation, node) {
    /** @type {?} */
    const el = (/** @type {?} */ (node));
    if (!el.getBoundingClientRect) {
        return 0;
    }
    /** @type {?} */
    const rect = el.getBoundingClientRect();
    return orientation == 'horizontal' ? rect.width : rect.height;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A class that manages the life cycle of sticky meta rows (header & footer) while scrolling.
 * Sticky meta rows are moved to containers outside of the table so they do not depend on the `position: sticky` property.
 *
 * For `position: sticky` to work, a reference position is required (`top` for header, `bottom` for footer) which must reflect the current
 * offset measured by the virtual scroll viewport (this position compensate the offset of virtual scroll so the position is leveled, i.e. like top 0)
 *
 * When the user scroll's:
 * - The offset changes by the browser
 * - The virtual scroll will detect the new offset and update the wrapper with the new offset.
 *
 * There is a time gap between the operations above which causes rows to flicker in and out of view, this is why we move them to a fixed location.
 */
class MetaRowStickyScroll {
    /**
     * @param {?} viewport
     * @param {?} viewPortEl
     * @param {?} metaRows
     */
    constructor(viewport, viewPortEl, metaRows) {
        this.viewport = viewport;
        this.viewPortEl = viewPortEl;
        this.metaRows = metaRows;
        this.runningHeader = false;
        this.runningFooter = false;
        this.canMoveHeader = true;
        this.canMoveFooter = true;
        this.movedFooterRows = [];
        this.movedHeaderRows = [];
    }
    /**
     * @return {?}
     */
    canMove() {
        return this.canMoveHeader || this.canMoveFooter;
    }
    /**
     * @return {?}
     */
    isRunning() {
        return this.runningHeader || this.runningFooter;
    }
    /**
     * @param {?} offset
     * @param {?} viewPortElRect
     * @return {?}
     */
    move(offset, viewPortElRect) {
        this.moveHeader(offset, viewPortElRect);
        this.moveFooter(offset, viewPortElRect);
        return this.isRunning() && !this.canMoveHeader && !this.canMoveFooter;
    }
    /**
     * @param {?} renderedContentOffset
     * @return {?}
     */
    restore(renderedContentOffset) {
        const { header, footer } = this.metaRows;
        if (this.restoreHeader()) {
            updateStickyRows(renderedContentOffset, header.rows, header.sticky, 'top');
        }
        if (this.restoreFooter()) {
            updateStickyRows(renderedContentOffset, footer.rows, footer.sticky, 'bottom');
        }
    }
    /**
     * @private
     * @param {?} offset
     * @param {?} viewPortElRect
     * @return {?}
     */
    moveHeader(offset, viewPortElRect) {
        if (!this.runningHeader || this.canMoveHeader) {
            this.runningHeader = true;
            this.canMoveHeader = false;
            /** @type {?} */
            const stickyAndRendered = [];
            /** @type {?} */
            const headerRows = this.metaRows.header;
            /** @type {?} */
            let mostTopRect;
            for (let i = 0, len = headerRows.rows.length; i < len; i++) {
                /** @type {?} */
                const rowEl = headerRows.rows[i];
                if (headerRows.sticky[i]) {
                    /** @type {?} */
                    const elRect = rowEl.getBoundingClientRect();
                    if (headerRows.rendered[i]) {
                        /** @type {?} */
                        const calc = elRect.top - viewPortElRect.top - offset;
                        // if after the scroll the element is still in view, return
                        if (calc >= 0 || -calc < viewPortElRect.height) {
                            this.canMoveHeader = true;
                            return;
                        }
                    }
                    if (!mostTopRect) {
                        mostTopRect = elRect;
                    }
                    stickyAndRendered.push(i);
                }
            }
            if (stickyAndRendered.length) {
                this.viewport.stickyRowHeaderContainer.style.top = mostTopRect.top + 'px';
                this.cloneAndMoveRow(this.viewport.stickyRowHeaderContainer, headerRows.rows, stickyAndRendered, this.movedHeaderRows);
            }
        }
    }
    /**
     * @private
     * @param {?} offset
     * @param {?} viewPortElRect
     * @return {?}
     */
    moveFooter(offset, viewPortElRect) {
        if (!this.runningFooter || this.canMoveFooter) {
            this.runningFooter = true;
            this.canMoveFooter = false;
            /** @type {?} */
            const stickyAndRendered = [];
            /** @type {?} */
            const footerRows = this.metaRows.footer;
            /** @type {?} */
            let mostTopRect;
            for (let i = 0, len = footerRows.rows.length; i < len; i++) {
                /** @type {?} */
                const rowEl = footerRows.rows[i];
                if (footerRows.sticky[i]) {
                    /** @type {?} */
                    const elRect = rowEl.getBoundingClientRect();
                    if (footerRows.rendered[i]) {
                        /** @type {?} */
                        const calc = elRect.bottom - viewPortElRect.bottom + offset;
                        // if after the scroll the element is still in view, return
                        if (calc >= 0 && calc < viewPortElRect.height) {
                            this.canMoveFooter = true;
                            return;
                        }
                    }
                    mostTopRect = elRect;
                    stickyAndRendered.push(i);
                }
            }
            if (stickyAndRendered.length) {
                this.viewport.stickyRowFooterContainer.style.bottom = `calc(100% - ${mostTopRect.bottom}px)`;
                this.cloneAndMoveRow(this.viewport.stickyRowFooterContainer, footerRows.rows, stickyAndRendered, this.movedFooterRows);
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    restoreHeader() {
        if (this.runningHeader) {
            /** @type {?} */
            const movedHeaderRows = this.movedHeaderRows;
            this.movedHeaderRows = [];
            this.restoreRows(movedHeaderRows, this.metaRows.header.rows);
            this.runningHeader = false;
            this.canMoveHeader = true;
            return true;
        }
        return false;
    }
    /**
     * @private
     * @return {?}
     */
    restoreFooter() {
        if (this.runningFooter) {
            /** @type {?} */
            const movedFooterRows = this.movedFooterRows;
            this.movedFooterRows = [];
            this.restoreRows(movedFooterRows, this.metaRows.footer.rows);
            this.runningFooter = false;
            this.canMoveFooter = true;
            return true;
        }
        return false;
    }
    /**
     * @private
     * @param {?} stickyRowContainer
     * @param {?} rows
     * @param {?} stickyAndRendered
     * @param {?} restoreRef
     * @return {?}
     */
    cloneAndMoveRow(stickyRowContainer, rows, stickyAndRendered, restoreRef) {
        /** @type {?} */
        const innerRowContainer = (/** @type {?} */ (stickyRowContainer.firstElementChild));
        stickyRowContainer.style.width = this.viewport.innerWidth + 'px';
        innerRowContainer.style.transform = `translateX(-${this.viewPortEl.scrollLeft}px)`;
        for (const i of stickyAndRendered) {
            /** @type {?} */
            const rowEl = rows[i];
            /** @type {?} */
            const clone = (/** @type {?} */ (rowEl.cloneNode()));
            clone.style.width = '0';
            rowEl.style.top = rowEl.style.bottom = rowEl.style.position = '';
            rowEl.parentElement.insertBefore(clone, rowEl);
            innerRowContainer.appendChild(rowEl);
            restoreRef.push([rowEl, clone, i]);
            // Assign the clone to be the sticky row element, this will ensure that stick row updates
            // will set the `top` on an actual element in the viewport, thus updating with each layout reflow.
            // if not set, when we return the original row it's `top` value will be true but will not show because it will not trigger a reflow.
            rows[i] = clone;
        }
    }
    /**
     * @private
     * @param {?} restoreRef
     * @param {?} rows
     * @return {?}
     */
    restoreRows(restoreRef, rows) {
        for (const [rowEl, clone, index] of restoreRef) {
            rowEl.style.position = clone.style.position;
            rowEl.style.zIndex = clone.style.zIndex;
            rowEl.style.top = clone.style.top;
            rowEl.style.bottom = clone.style.bottom;
            clone.parentElement.insertBefore(rowEl, clone);
            clone.parentElement.removeChild(clone);
            rows[index] = rowEl;
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.runningHeader;
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.runningFooter;
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.canMoveHeader;
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.canMoveFooter;
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.movedFooterRows;
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.movedHeaderRows;
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.viewport;
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.viewPortEl;
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.metaRows;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const FIXED_HEADER_MODE = true;
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function sortByIndex(a, b) { return a.index - b.index; }
;
/**
 * @record
 */
function NgeVirtualTableRowInfo() { }
if (false) {
    /** @type {?} */
    NgeVirtualTableRowInfo.prototype.headerLength;
    /** @type {?} */
    NgeVirtualTableRowInfo.prototype.rowLength;
    /** @type {?} */
    NgeVirtualTableRowInfo.prototype.footerLength;
}
/**
 * @template T
 */
class PblVirtualScrollForOf {
    /**
     * @param {?} extApi
     * @param {?} ngZone
     */
    constructor(extApi, ngZone) {
        this.ngZone = ngZone;
        this.destroyed = new Subject();
        this.renderedContentOffset = 0;
        /**
         * The length of meta rows [0] = header [1] = footer
         */
        this.metaRows = [0, 0];
        this.header = { rows: (/** @type {?} */ ([])), sticky: (/** @type {?} */ ([])), rendered: (/** @type {?} */ ([])) };
        this.footer = { rows: (/** @type {?} */ ([])), sticky: (/** @type {?} */ ([])), rendered: (/** @type {?} */ ([])) };
        this.grid = extApi.grid;
        this.cdkTable = extApi.cdkTable;
        this.viewport = extApi.grid.viewport;
        this.viewChange = this.cdkTable.viewChange;
        PblNgridPluginController.find(extApi.grid).events
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.kind === 'onDataSource') {
                this.detachView();
                this.attachView(event.curr);
            }
        }));
        this.attachView(extApi.grid.ds);
        extApi.metaRowService.sync
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const headers = extApi.metaRowService.header.row.concat(extApi.metaRowService.header.sticky).sort(sortByIndex);
            /** @type {?} */
            const footers = extApi.metaRowService.footer.row.concat(extApi.metaRowService.footer.sticky).sort(sortByIndex);
            this.header.rows = headers.map((/**
             * @param {?} h
             * @return {?}
             */
            h => h.el));
            this.header.sticky = headers.map((/**
             * @param {?} h
             * @return {?}
             */
            h => h.rowDef.type === 'sticky'));
            this.footer.rows = footers.map((/**
             * @param {?} h
             * @return {?}
             */
            h => h.el));
            this.footer.sticky = footers.map((/**
             * @param {?} h
             * @return {?}
             */
            h => h.rowDef.type === 'sticky'));
            updateStickyRows(this.renderedContentOffset, this.header.rows, this.header.sticky, 'top');
            updateStickyRows(this.renderedContentOffset, this.footer.rows, this.footer.sticky, 'bottom');
        }));
        if (FIXED_HEADER_MODE) {
            /** @type {?} */
            let offset = 0;
            /** @type {?} */
            const viewPort = this.viewport.elementRef.nativeElement;
            /** @type {?} */
            const metaRowStickyScroll = new MetaRowStickyScroll(this.viewport, viewPort, { header: this.header, footer: this.footer });
            /** @type {?} */
            let scrollPosition;
            /** @type {?} */
            const wheelListen = (/**
             * @return {?}
             */
            () => viewPort.addEventListener('wheel', handler, true));
            /** @type {?} */
            const wheelUnListen = (/**
             * @return {?}
             */
            () => viewPort.removeEventListener('wheel', handler, true));
            /** @type {?} */
            const updateScrollPosition = (/**
             * @return {?}
             */
            () => scrollPosition = (this.viewport.measureScrollOffset()) / (this.viewport.scrollHeight - this.viewport.getViewportSize()));
            /** @type {?} */
            const handler = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                if (event.deltaY) {
                    if ((scrollPosition === 1 && event.deltaY > 0) || (offset === 0 && event.deltaY < 0)) {
                        return;
                    }
                    /** @type {?} */
                    let newOffset = offset + event.deltaY;
                    newOffset = Math.min(this.viewport.scrollHeight, Math.max(0, newOffset));
                    if (newOffset !== offset) {
                        offset = newOffset;
                        if (metaRowStickyScroll.canMove() && metaRowStickyScroll.move(event.deltaY, viewPort.getBoundingClientRect())) {
                            /** @type {?} */
                            const scrollEnd$ = this.viewport.scrolling.pipe(filter$1((/**
                             * @param {?} s
                             * @return {?}
                             */
                            s => !s)));
                            /** @type {?} */
                            const restore = (/**
                             * @return {?}
                             */
                            () => {
                                metaRowStickyScroll.restore(this.renderedContentOffset);
                                updateScrollPosition();
                            });
                            /** @type {?} */
                            let removedEvent = false;
                            if (this.viewport.wheelMode !== 'blocking') {
                                /** @type {?} */
                                const wheelMode = this.viewport.wheelMode;
                                if (wheelMode === 'passive') {
                                    wheelUnListen();
                                    this.viewport.scrolling.pipe(debounceTime(150), filter$1((/**
                                     * @param {?} s
                                     * @return {?}
                                     */
                                    s => !s)), take(1))
                                        .subscribe((/**
                                     * @return {?}
                                     */
                                    () => {
                                        restore();
                                        wheelListen();
                                    }));
                                }
                                else {
                                    this.viewport.scrollFrameRate
                                        .pipe(takeUntil(scrollEnd$.pipe(take(1))))
                                        .subscribe((/**
                                     * @param {?} frameRate
                                     * @return {?}
                                     */
                                    frameRate => {
                                        if (!removedEvent && frameRate < wheelMode) {
                                            wheelUnListen();
                                            removedEvent = true;
                                        }
                                    }), null, (/**
                                     * @return {?}
                                     */
                                    () => {
                                        /** @type {?} */
                                        const lastWheel$ = fromEvent(viewPort, 'wheel').pipe(debounceTime(50), take(1));
                                        race(lastWheel$, (/** @type {?} */ (timer(51))))
                                            .subscribe((/**
                                         * @return {?}
                                         */
                                        () => {
                                            restore();
                                            if (removedEvent) {
                                                wheelListen();
                                            }
                                        }));
                                        // we restore back after 100 ms, for some reason, if it's immediate, we hit a cycle of wheel/scroll/no-scroll and not wheel/scroll/WAIIIIIT/no-scrol
                                        // TODO: maybe we can measure time between no-scrolling and wheel to find this MS value
                                        //        OR, register a temp `wheel` listener that will detect wheel end and re-register the original handler.
                                    }));
                                }
                            }
                            else {
                                scrollEnd$.pipe(take(1)).subscribe(restore);
                            }
                        }
                    }
                    this.viewport.scrollToOffset(offset);
                    event.preventDefault();
                    event.stopPropagation();
                    return true;
                }
            });
            updateScrollPosition();
            wheelListen();
            this.viewport.scrolling.subscribe((/**
             * @param {?} isScrolling
             * @return {?}
             */
            isScrolling => {
                if (!isScrolling) {
                    offset = this.viewport.measureScrollOffset();
                }
            }));
        }
        this.viewport.offsetChange
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} offset
         * @return {?}
         */
        offset => {
            if (this.renderedContentOffset !== offset) {
                this.renderedContentOffset = offset;
                updateStickyRows(offset, this.header.rows, this.header.sticky, 'top');
                updateStickyRows(offset, this.footer.rows, this.footer.sticky, 'bottom');
            }
        }));
    }
    /**
     * @return {?}
     */
    get headerLength() { return this.header.rows.length; }
    /**
     * @return {?}
     */
    get rowLength() { return this.vcRefs.data.length; }
    /**
     * @return {?}
     */
    get footerLength() { return this.footer.rows.length; }
    /**
     * @private
     * @return {?}
     */
    get vcRefs() {
        /** @type {?} */
        const value = {
            header: this.cdkTable._headerRowOutlet.viewContainer,
            data: this.cdkTable._rowOutlet.viewContainer,
            footer: this.cdkTable._footerRowOutlet.viewContainer,
        };
        Object.defineProperty(this, 'vcRefs', { value, configurable: true });
        return value;
    }
    /**
     * Measures the combined size (width for horizontal orientation, height for vertical) of all items
     * in the specified range. Throws an error if the range includes items that are not currently
     * rendered.
     * @param {?} range
     * @param {?} orientation
     * @return {?}
     */
    measureRangeSize(range, orientation) {
        if (range.start >= range.end) {
            return 0;
        }
        /** @type {?} */
        const renderedRanges = this._renderedRanges;
        /** @type {?} */
        const ranges = splitRange(range, this.metaRows[0], this.ds.length);
        /** @type {?} */
        const stickyStates = [this.header.sticky, [], this.footer.sticky];
        /** @type {?} */
        const vcRefs = [this.vcRefs.header, this.vcRefs.data, this.vcRefs.footer];
        /** @type {?} */
        const vcRefSizeReducer = (/**
         * @param {?} total
         * @param {?} vcRef
         * @param {?} index
         * @return {?}
         */
        (total, vcRef, index) => {
            return total + measureRangeSize(vcRef, ranges[index], renderedRanges[index], orientation, stickyStates[index]);
        });
        return vcRefs.reduce(vcRefSizeReducer, 0);
    }
    /**
     * @return {?}
     */
    destroy() {
        this.detachView();
        this.destroyed.next();
        this.destroyed.complete();
    }
    /**
     * @private
     * @param {?} ds
     * @return {?}
     */
    attachView(ds) {
        if (ds) {
            this.ds = ds;
            this._renderedRanges = [{ start: 0, end: 0 }, this.cdkTable.viewChange.value, { start: 0, end: 0 }];
            this.viewport.renderedRangeStream
                .pipe(takeUntil(this.destroyed))
                .subscribe((/**
             * @param {?} range
             * @return {?}
             */
            range => {
                if (this.headerLength + this.footerLength === 0) { // if no row/sticky meta rows, move on...
                    this._renderedRanges = [{ start: 0, end: 0 }, range, { start: 0, end: 0 }];
                    return this.cdkTable.viewChange.next(range);
                }
                /*  WHAT IS GOING ON HERE? */
                /*  Table rows are split into 3 sections: Header, Data, Footer.
                    In the virtual playground only DATA rows are dynamic. Header & Footer rows are fixed.
      
                    The `CdkTable` works the same, also have the same sections with a stream API for DATA rows only.
                    `CdkTable.viewChange.next(RANGE)` will emit to the datasource which will result in a new data section from the datasource.
      
                    `CdkTable` alone does not support virtual scrolling, to achieve it we use a virtual scroll viewport which wraps the entire `CdkTable`.
                    This means that ALL sections are wrapped (hence scrolled over) but only DATA rows are moving...
      
                    Each emission of `ListRange` in `renderedRangeStream` is based on size calculation of ALL sections (see `measureRangeSize` above)
                    and we need to extract the relevant range for DATA rows only and pass it on to the grid.
      
                    To make this work we need to extract Header/Footer rows based on the starting position of the range and handle them as well.
                    Because the grid will only handle the scrolling of DATA rows we need to update HEADER/FOOTER rows to show/hide based on the range.
      
                    Because Header/Footer rows are fixed we do this by hiding them with `display: none`, unless they are sticky / pinned.
                    One exception is the main header row, which we hide virtually because we need it to render and reflect the cell size.
      
                    We first extract the actual ranges for each section and update the `CdkTable` with the DATA row range.
                    We then wait for the rows to render, which is the time for us to also "render" Header/Footer rows...
                    We don't "render" them per-se, they are already rendered, we just show/hide them based on the range and state (sticky).
                    This is important, hiding will cause the total height of the scroll container to shrink to the size it should be.
                    We defer this operation to run AFTER the rows are rendered (not immediately) because an immediate change will trigger
                    a change in the scroll container size resulting in a scroll event that will bring us back here but this time with
                    a height that does not fit the range. Immediate change removes rows (Header/Footer) before the new range is applied.
                    Only after the rows are rendered we can show/hide the Header/Footer rows.
                */
                // Extracting actual ranges for each section.
                this._renderedRanges = splitRange(range, this.metaRows[0], ds.length);
                const [header, data, footer] = this._renderedRanges;
                this.cdkTable.onRenderRows.pipe(take(1)).subscribe((/**
                 * @return {?}
                 */
                () => {
                    // We update the header DOM elements in reverse, skipping the last (first when reversed) DOM element.
                    // The skipped element is the grid's header row that must keep track of the layout for internal size calculation (e.g. group header rows).
                    // An hidden row is one that is out of range AND not sticky
                    if (this.headerLength > 0) {
                        /** @type {?} */
                        const htmlRows = this.header.rows;
                        /** @type {?} */
                        const renderedRows = this.header.rendered;
                        /** @type {?} */
                        const stickyRows = this.header.sticky;
                        /** @type {?} */
                        let rowIndex = 0;
                        for (const len = this.header.sticky.length - 1; rowIndex < len; rowIndex++) {
                            // assign rendered state + if not rendered and not sticky, set display to "none"
                            htmlRows[rowIndex].style.display = !(renderedRows[rowIndex] = rowIndex >= header.start) && !stickyRows[rowIndex]
                                ? 'none'
                                : null;
                        }
                        // Here we update the main header row, when we need to hide it we apply a class that will hide it virtually, i.e. not showing but keeping internal layout.
                        if (!(renderedRows[rowIndex] = rowIndex >= header.start) && !stickyRows[rowIndex]) {
                            htmlRows[rowIndex].classList.add('pbl-ngrid-row-visually-hidden');
                        }
                        else if (this.grid.showHeader && htmlRows[rowIndex]) {
                            htmlRows[rowIndex].classList.remove('pbl-ngrid-row-visually-hidden');
                        }
                    }
                    if (this.footerLength > 0) {
                        /** @type {?} */
                        const htmlRows = this.footer.rows;
                        /** @type {?} */
                        const renderedRows = this.footer.rendered;
                        /** @type {?} */
                        const stickyRows = this.footer.sticky;
                        /** @type {?} */
                        let rowIndex = 0;
                        for (const len = this.footer.sticky.length; rowIndex < len; rowIndex++) {
                            // assign rendered state + if not rendered and not sticky, set display to "none"
                            htmlRows[rowIndex].style.display = !(renderedRows[rowIndex] = rowIndex < footer.end) && !stickyRows[rowIndex]
                                ? 'none'
                                : null;
                        }
                    }
                }));
                this.cdkTable.viewChange.next(data);
            }));
            // add meta rows to the total row count.
            this.dataStream = ds.onRenderDataChanging
                .pipe(takeUntil(this.destroyed), map((/**
             * @param {?} __0
             * @return {?}
             */
            ({ data }) => {
                /** @type {?} */
                const metaRows = this.metaRows = [this.header.rows.length, this.footer.rows.length];
                return new Array(data.length + metaRows[0] + metaRows[1]);
            })));
            ds.onRenderedDataChanged
                .pipe(takeUntil(this.destroyed), map((/**
             * @return {?}
             */
            () => ds.length)), startWith(0), pairwise(), filter$1((/**
             * @param {?} __0
             * @return {?}
             */
            ([prev, curr]) => prev !== curr)))
                .subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            ([prev, curr]) => {
                this.ngZone.onStable.pipe(take(1)).subscribe((/**
                 * @return {?}
                 */
                () => this.viewport.onSourceLengthChange(prev, curr)));
            }));
            this.viewport.attach((/** @type {?} */ (this)));
        }
    }
    /**
     * @private
     * @return {?}
     */
    detachView() {
        this.ds = undefined;
        this.viewport.detach();
    }
}
if (false) {
    /** @type {?} */
    PblVirtualScrollForOf.prototype.viewChange;
    /** @type {?} */
    PblVirtualScrollForOf.prototype.dataStream;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.destroyed;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.ds;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.renderedContentOffset;
    /**
     * A tuple containing the last known ranges [header, data, footer]
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype._renderedRanges;
    /**
     * The length of meta rows [0] = header [1] = footer
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.metaRows;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.header;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.footer;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.grid;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.cdkTable;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.viewport;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.ngZone;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Wrapper for the CdkTable that extends it's functionality to support various table features.
 * This wrapper also applies Material Design table styles (i.e. `MatTable` styles).
 *
 * Most of the extensions are done using mixins, this is mostly for clarity and separation of the features added.
 * This approach will allow easy removal when a feature is no longer required/implemented natively.
 * @template T
 */
class PblCdkTableComponent extends CdkTable {
    /**
     * @param {?} _differs
     * @param {?} _changeDetectorRef
     * @param {?} _elementRef
     * @param {?} role
     * @param {?} _dir
     * @param {?} injector
     * @param {?} grid
     * @param {?} extApi
     * @param {?=} _document
     * @param {?=} platform
     */
    constructor(_differs, _changeDetectorRef, _elementRef, role, _dir, injector, grid, extApi, _document, platform) {
        super(_differs, _changeDetectorRef, _elementRef, role, _dir, _document, platform);
        this.injector = injector;
        this.grid = grid;
        this.extApi = extApi;
        this._minWidth = null;
        //#endregion CSS-CLASS-CONTROL
        //#region CLEAR-ROW-DEFS
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        this._cachedRowDefs = { header: new Set(), footer: new Set() }; //tslint:disable-line
        this.grid._cdkTable = this;
        this.trackBy = this.grid.trackBy;
        extApi.events.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            if (e.kind === 'beforeInvalidateHeaders') {
                if (this._lastSticky) {
                    this._lastSticky.queryCellElements('header', 'table', 'footer')
                        .forEach((/**
                     * @param {?} el
                     * @return {?}
                     */
                    el => el.classList.remove('pbl-ngrid-sticky-start')));
                    this._lastSticky = undefined;
                }
                if (this._lastStickyEnd) {
                    this._lastStickyEnd.queryCellElements('header', 'table', 'footer')
                        .forEach((/**
                     * @param {?} el
                     * @return {?}
                     */
                    el => el.classList.remove('pbl-ngrid-sticky-end')));
                    this._lastStickyEnd = undefined;
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    get _element() { return this._elementRef.nativeElement; }
    /**
     * @return {?}
     */
    get onRenderRows() {
        if (!this.onRenderRows$) {
            this.onRenderRows$ = new Subject();
        }
        return this.onRenderRows$.asObservable();
    }
    /**
     * @return {?}
     */
    get minWidth() { return this._minWidth; }
    /**
     * @param {?} value
     * @return {?}
     */
    set minWidth(value) {
        this._minWidth = value || null;
        this._element.style.minWidth = value ? value + 'px' : null;
    }
    /**
     * @return {?}
     */
    updateStickyColumnStyles() {
        if (this._isStickyPending) {
            return;
        }
        this._isStickyPending = true;
        Promise.resolve()
            .then((/**
         * @return {?}
         */
        () => {
            this._isStickyPending = false;
            this._updateStickyColumnStyles();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.onRenderRows$) {
            this.onRenderRows$.complete();
        }
        this.virtualScrollDestroy();
    }
    //#region CSS-CLASS-CONTROL
    /**
     * @param {?} cssClassName
     * @return {?}
     */
    addClass(cssClassName) {
        this._element.classList.add(cssClassName);
    }
    /**
     * @param {?} cssClassName
     * @return {?}
     */
    removeClass(cssClassName) {
        this._element.classList.remove(cssClassName);
    }
    //tslint:disable-line
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    /**
     * @param {?} headerRowDef
     * @return {?}
     */
    addHeaderRowDef(headerRowDef) {
        super.addHeaderRowDef(headerRowDef);
        this._cachedRowDefs.header.add(headerRowDef);
    }
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    /**
     * @return {?}
     */
    clearHeaderRowDefs() {
        const { header } = this._cachedRowDefs;
        for (const rowDef of Array.from(header.values())) {
            this.removeHeaderRowDef(rowDef);
        }
        header.clear();
    }
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    /**
     * @param {?} footerRowDef
     * @return {?}
     */
    addFooterRowDef(footerRowDef) {
        super.addFooterRowDef(footerRowDef);
        this._cachedRowDefs.footer.add(footerRowDef);
    }
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    /**
     * @return {?}
     */
    clearFooterRowDefs() {
        const { footer } = this._cachedRowDefs;
        for (const rowDef of Array.from(footer.values())) {
            this.removeFooterRowDef(rowDef);
        }
        footer.clear();
    }
    //tslint:disable-line
    /**
     * @return {?}
     */
    attachViewPort() {
        this.detachViewPort();
        this.forOf = new PblVirtualScrollForOf(this.extApi, this.injector.get(NgZone));
    }
    /**
     * @return {?}
     */
    detachViewPort() {
        if (this.forOf) {
            this.forOf.destroy();
            this.forOf = undefined;
        }
    }
    /**
     * @private
     * @return {?}
     */
    virtualScrollDestroy() {
        super.ngOnDestroy();
        this.detachViewPort();
    }
    //#endregion VIRTUAL-SCROLL
    /**
     * An alias for `_cacheRowDefs()`
     * @return {?}
     */
    updateRowDefCache() {
        ((/** @type {?} */ (this)))._cacheRowDefs();
    }
    /**
     * @return {?}
     */
    renderRows() {
        super.renderRows();
        // The problem of inheritance right at your face
        // Because material does not allow us to control the context generation for a row we need to get clever.
        // https://github.com/angular/components/issues/14199
        // TODO: If they do allow controlling context generation, remove this and apply their solution.
        /** @type {?} */
        const viewContainer = this._rowOutlet.viewContainer;
        for (let renderIndex = 0, count = viewContainer.length; renderIndex < count; renderIndex++) {
            /** @type {?} */
            const viewRef = (/** @type {?} */ (viewContainer.get(renderIndex)));
            /** @type {?} */
            const context = viewRef.context;
            context.gridInstance = this.grid;
        }
        if (this.onRenderRows$) {
            this.onRenderRows$.next(this._rowOutlet);
        }
    }
    /**
     * @param {?=} rowType
     * @param {...?} rows
     * @return {?}
     */
    syncRows(rowType = false, ...rows) {
        /** @type {?} */
        const detectChanges = typeof rowType === 'boolean'
            ? rowType
            : typeof rows[0] === 'boolean'
                ? rows.shift()
                : false;
        /** @type {?} */
        let vcRef;
        switch (rowType) {
            case 'header':
                vcRef = this._headerRowOutlet.viewContainer;
                break;
            case 'data':
                vcRef = this._rowOutlet.viewContainer;
                break;
            case 'footer':
                vcRef = this._footerRowOutlet.viewContainer;
                break;
            default: // boolean or 'all'
                this._changeDetectorRef.markForCheck();
                if (detectChanges) {
                    this._changeDetectorRef.detectChanges();
                }
                return;
        }
        /** @type {?} */
        const useSpecificRows = rows.length > 0;
        /** @type {?} */
        const count = useSpecificRows ? rows.length : vcRef.length;
        for (let renderIndex = 0; renderIndex < count; renderIndex++) {
            /** @type {?} */
            const viewRef = (/** @type {?} */ (vcRef.get(useSpecificRows ? rows[renderIndex] : renderIndex)));
            if (viewRef) {
                viewRef.markForCheck();
                if (detectChanges) {
                    viewRef.detectChanges();
                }
            }
        }
    }
    /**
     * @return {?}
     */
    pblForceRenderDataRows() {
        try {
            ((/** @type {?} */ (this)))._forceRenderDataRows();
        }
        catch (ex) {
            this.multiTemplateDataRows = this.multiTemplateDataRows;
        }
    }
    /**
     * @private
     * @return {?}
     */
    _updateStickyColumnStyles() {
        /** @type {?} */
        const columns = this.grid.columnApi.visibleColumns;
        /** @type {?} */
        let sticky;
        /** @type {?} */
        let stickyEnd;
        for (let i = 0, len = columns.length; i < len; i++) {
            if (columns[i].columnDef && columns[i].columnDef.sticky) {
                sticky = columns[i].columnDef;
            }
        }
        for (let i = columns.length - 1; i > -1; i--) {
            if (columns[i].columnDef && columns[i].columnDef.stickyEnd) {
                stickyEnd = columns[i].columnDef;
            }
        }
        if (this._lastSticky) {
            this._lastSticky.queryCellElements('header', 'table', 'footer')
                .forEach((/**
             * @param {?} el
             * @return {?}
             */
            el => el.classList.remove('pbl-ngrid-sticky-start')));
        }
        if (sticky) {
            sticky.queryCellElements('header', 'table', 'footer')
                .forEach((/**
             * @param {?} el
             * @return {?}
             */
            el => el.classList.add('pbl-ngrid-sticky-start')));
        }
        this._lastSticky = sticky;
        if (this._lastStickyEnd) {
            this._lastStickyEnd.queryCellElements('header', 'table', 'footer')
                .forEach((/**
             * @param {?} el
             * @return {?}
             */
            el => el.classList.remove('pbl-ngrid-sticky-end')));
        }
        if (stickyEnd) {
            stickyEnd.queryCellElements('header', 'table', 'footer')
                .forEach((/**
             * @param {?} el
             * @return {?}
             */
            el => el.classList.add('pbl-ngrid-sticky-end')));
        }
        this._lastStickyEnd = stickyEnd;
        super.updateStickyColumnStyles();
    }
}
PblCdkTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-cdk-table',
                exportAs: 'pblCdkTable',
                template: CDK_TABLE_TEMPLATE,
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    'class': 'pbl-cdk-table',
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".pbl-cdk-table{display:block}.pbl-ngrid-footer-row,.pbl-ngrid-header-row,.pbl-ngrid-row{display:-webkit-box;display:flex;border-width:0 0 1px;border-style:solid;-webkit-box-align:center;align-items:center;box-sizing:border-box;position:relative}.pbl-ngrid-footer-row::after,.pbl-ngrid-header-row::after,.pbl-ngrid-row::after{display:inline-block;min-height:inherit;content:''}.pbl-ngrid-cell,.pbl-ngrid-footer-cell,.pbl-ngrid-header-cell{-webkit-box-flex:1;flex:1;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;overflow:hidden;word-wrap:break-word;min-height:inherit}.pbl-ngrid-header-cell.pbl-header-group-cell{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.pbl-ngrid-header-cell.pbl-header-group-cell.pbl-header-group-cell-placeholder{border:none}.pbl-ngrid-footer-cell,.pbl-ngrid-header-cell{position:relative}.pbl-ngrid-cell{cursor:default;outline:0}.pbl-ngrid-editable-cell{cursor:text}"]
            }] }
];
/** @nocollapse */
PblCdkTableComponent.ctorParameters = () => [
    { type: IterableDiffers },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: String, decorators: [{ type: Attribute, args: ['role',] }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: Injector },
    { type: PblNgridComponent },
    { type: undefined, decorators: [{ type: Inject, args: [EXT_API_TOKEN,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Platform }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblCdkTableComponent.prototype._minWidth;
    /**
     * @type {?}
     * @private
     */
    PblCdkTableComponent.prototype.onRenderRows$;
    /**
     * @type {?}
     * @private
     */
    PblCdkTableComponent.prototype._lastSticky;
    /**
     * @type {?}
     * @private
     */
    PblCdkTableComponent.prototype._lastStickyEnd;
    /**
     * @type {?}
     * @private
     */
    PblCdkTableComponent.prototype._isStickyPending;
    /**
     * @type {?}
     * @private
     */
    PblCdkTableComponent.prototype._cachedRowDefs;
    /**
     * @type {?}
     * @private
     */
    PblCdkTableComponent.prototype.forOf;
    /**
     * @type {?}
     * @protected
     */
    PblCdkTableComponent.prototype.injector;
    /**
     * @type {?}
     * @protected
     */
    PblCdkTableComponent.prototype.grid;
    /**
     * @type {?}
     * @protected
     */
    PblCdkTableComponent.prototype.extApi;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PBL_NGRID_MAP = new Map();
class PblNgridGroupHeaderSizeController {
    /**
     * @param {?} grid
     */
    constructor(grid) {
        this.grid = grid;
        this.columns = [];
        this.entries = new WeakMap();
        this.ro = new ResizeObserver((/**
         * @param {?} entries
         * @return {?}
         */
        entries => {
            requestAnimationFrame((/**
             * @return {?}
             */
            () => this.onResize(entries)));
        }));
    }
    /**
     * @param {?} table
     * @return {?}
     */
    static get(table) {
        /** @type {?} */
        let controller = PBL_NGRID_MAP.get(table);
        if (!controller) {
            controller = new PblNgridGroupHeaderSizeController(table);
            PBL_NGRID_MAP.set(table, controller);
        }
        return controller;
    }
    /**
     * @param {?} col
     * @return {?}
     */
    has(col) {
        return this.columns.indexOf(col) !== -1;
    }
    /**
     * @param {?} column
     * @return {?}
     */
    hasColumn(column) {
        return this.columns.some((/**
         * @param {?} c
         * @return {?}
         */
        c => c.column === column));
    }
    /**
     * @param {?} col
     * @return {?}
     */
    add(col) {
        this.entries.set(col.target, col);
        this.ro.observe(col.target);
        this.columns.push(col);
    }
    /**
     * @param {?} col
     * @return {?}
     */
    remove(col) {
        this.ro.unobserve(col.target);
        this.entries.delete(col.target);
        /** @type {?} */
        const idx = this.columns.indexOf(col);
        if (idx > -1) {
            this.columns.splice(idx, 1);
        }
        if (this.columns.length === 0) {
            this.ro.disconnect();
            PBL_NGRID_MAP.delete(this.grid);
        }
    }
    /**
     * @private
     * @param {?} entries
     * @return {?}
     */
    onResize(entries) {
        /** @type {?} */
        const resized = [];
        for (const entry of entries) {
            /** @type {?} */
            const o = this.entries.get(entry.target);
            if (o) {
                resized.push(o);
            }
        }
        if (resized.length > 0) {
            /** @type {?} */
            let isDragging = false;
            for (const c of resized) {
                isDragging = isDragging || c.column.columnDef.isDragging;
                c.updateSize();
            }
            if (!isDragging) {
                this.grid.resizeColumns(this.columns.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                c => c.column)));
            }
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridGroupHeaderSizeController.prototype.entries;
    /**
     * @type {?}
     * @private
     */
    PblNgridGroupHeaderSizeController.prototype.ro;
    /**
     * @type {?}
     * @private
     */
    PblNgridGroupHeaderSizeController.prototype.columns;
    /**
     * @type {?}
     * @private
     */
    PblNgridGroupHeaderSizeController.prototype.grid;
}
/**
 * A directive that listen to size changes from the element of a cell, using ResizeObserver.
 * When a change occurs it will emit it to the PblTable host of this directive, along with all other observed columns for the table.
 *
 * In other words, all columns of a table, marked with `PblColumnSizeObserver`, will be sent.
 *
 * Because most of the size changes concern all columns of a row and because ResizeObserver will emit them all in the same event
 * an entire row should emit once, with all columns.
 */
class PblColumnSizeObserver extends ColumnSizeInfo {
    /**
     * @param {?} el
     * @param {?} table
     */
    constructor(el, table) {
        super(el.nativeElement);
        this.controller = PblNgridGroupHeaderSizeController.get(table);
    }
    /**
     * @return {?}
     */
    get column() { return this._column; }
    /**
     * @param {?} value
     * @return {?}
     */
    set column(value) { this.attachColumn(value); }
    /**
     * @param {?} column
     * @return {?}
     */
    attachColumn(column) {
        if (!this.controller.hasColumn(column)) {
            super.attachColumn(column);
            this.updateSize();
        }
        else {
            this._column = column;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.column || !this.controller.hasColumn(this.column)) {
            this.controller.add(this);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.controller.remove(this);
        this.detachColumn();
    }
}
PblColumnSizeObserver.decorators = [
    { type: Directive, args: [{ selector: 'pbl-ngrid-cell[observeSize], pbl-ngrid-header-cell[observeSize]' },] }
];
/** @nocollapse */
PblColumnSizeObserver.ctorParameters = () => [
    { type: ElementRef },
    { type: PblNgridComponent }
];
PblColumnSizeObserver.propDecorators = {
    column: [{ type: Input, args: ['observeSize',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblColumnSizeObserver.prototype.controller;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const noop = (/**
 * @param {?=} nv
 * @param {?=} nv1
 * @return {?}
 */
function (nv, nv1) { });
const ɵ0$1 = noop;
class NoVirtualScrollStrategy {
    constructor() {
        this.attach = noop;
        this.detach = noop;
        this.onContentScrolled = noop;
        this.onDataLengthChanged = noop;
        this.onContentRendered = noop;
        this.onRenderedOffsetChanged = noop;
        this.scrollToIndex = noop;
    }
}
if (false) {
    /** @type {?} */
    NoVirtualScrollStrategy.prototype.scrolledIndexChange;
    /** @type {?} */
    NoVirtualScrollStrategy.prototype.attach;
    /** @type {?} */
    NoVirtualScrollStrategy.prototype.detach;
    /** @type {?} */
    NoVirtualScrollStrategy.prototype.onContentScrolled;
    /** @type {?} */
    NoVirtualScrollStrategy.prototype.onDataLengthChanged;
    /** @type {?} */
    NoVirtualScrollStrategy.prototype.onContentRendered;
    /** @type {?} */
    NoVirtualScrollStrategy.prototype.onRenderedOffsetChanged;
    /** @type {?} */
    NoVirtualScrollStrategy.prototype.scrollToIndex;
}
class TableItemSizeAverager extends ItemSizeAverager {
    /**
     * @param {?} range
     * @param {?} size
     * @return {?}
     */
    addSample(range, size) {
        if (this.rowInfo && this.rowInfo.rowLength === 0) {
            this.reset();
        }
        else {
            super.addSample(range, size);
        }
    }
    /**
     * A temp workaround to solve the actual vs wanted rendered row issue in `CdkVirtualScrollViewport`
     *
     * `CdkVirtualScrollViewport.getRenderedRange()` return the rows that the virtual container want's the grid to render
     * however, the actual rendered rows might be different. This is a problem especially in init, when the rendered rows are actually 0
     * but `CdkVirtualScrollViewport.getRenderedRange()` return the initial range of rows that should be rendered. This results in a wrong
     * calculation of the average item size in `ItemSizeAverager`
     *
     * SEE: https://github.com/angular/material2/blob/a9e550e5bf93cd68c342d1a50d8576d8f3812ebe/src/cdk/scrolling/virtual-scroll-viewport.ts#L212-L220
     * @param {?} rowInfo
     * @return {?}
     */
    setRowInfo(rowInfo) {
        this.rowInfo = rowInfo;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    TableItemSizeAverager.prototype.rowInfo;
}
class PblNgridFixedSizeVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
    /**
     * @param {?} itemSize
     * @param {?} minBufferPx
     * @param {?} maxBufferPx
     */
    constructor(itemSize, minBufferPx, maxBufferPx) {
        super(itemSize, minBufferPx, maxBufferPx);
        this.itemSize = itemSize;
    }
    /**
     * @param {?} viewport
     * @return {?}
     */
    attach(viewport) {
        super.attach(this._ngridViewport = viewport);
    }
    /**
     * @return {?}
     */
    onContentScrolled() {
        // https://github.com/shlomiassaf/ngrid/issues/11
        // This is a workaround an issue with FixedSizeVirtualScrollStrategy
        // When:
        //    - The rendered data is changed so the data length is now LOWER then the current range (end - start)
        //    - The rendering direction is towards the top (start > end)
        //
        // For the issue to occur a big gap between the data length and the range length (gap), which does not happen on normal scrolling
        // but only when the data source is replaced (e.g. filtering).
        //
        // In such cases `onDataLengthChanged` is called which will call `_updateRenderedRange` which will calculate a new range
        // that is big, it will give the `start` a new value which creates the big gap.
        // It will then calculate a new "end" and leave the "start" so we have a big gap, larger then the viewport size.
        // After that it will create the new offset which is the itemSize * start, which is a bit lower then the offset but is large and again does not fit the viewport size
        // The scroll change will trigger `onContentScrolled` which will call `_updateRenderedRange` again,
        // with the same outcome, reducing the offset slightly, calling `onContentScrolled` again.
        // It will repeat until reaching the proper offset.
        //
        // The amount of offset reduced each time is approx the size of the buffers. (mix/max Buffer).
        //
        // This strategy is here only because of this error, it will let the initial update run and catch it's subsequent scroll event.
        if (!this._ngridViewport) {
            return;
        }
        let { start, end } = this._ngridViewport.getRenderedRange();
        /** @type {?} */
        const rangeLength = end - start;
        /** @type {?} */
        const dataLength = this._ngridViewport.getDataLength();
        if (rangeLength < 0 && dataLength < -rangeLength) {
            start = dataLength - end;
            this._ngridViewport.setRenderedRange({ start, end });
            this._ngridViewport.setRenderedContentOffset(this.itemSize * start);
            // this._scrolledIndexChange.next(Math.floor(firstVisibleIndex));
        }
        else {
            super.onContentScrolled();
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridFixedSizeVirtualScrollStrategy.prototype._ngridViewport;
    /**
     * @type {?}
     * @private
     */
    PblNgridFixedSizeVirtualScrollStrategy.prototype.itemSize;
}
class TableAutoSizeVirtualScrollStrategy extends AutoSizeVirtualScrollStrategy {
    /**
     * @param {?} minBufferPx
     * @param {?} maxBufferPx
     * @param {?=} averager
     */
    constructor(minBufferPx, maxBufferPx, averager = new TableItemSizeAverager()) {
        super(minBufferPx, maxBufferPx, averager);
        this.averager = averager;
    }
}
if (false) {
    /** @type {?} */
    TableAutoSizeVirtualScrollStrategy.prototype.averager;
}
/** @type {?} */
const TYPES = ['vScrollAuto', 'vScrollFixed', 'vScrollNone'];
/**
 * @param {?} directive
 * @return {?}
 */
function _vScrollStrategyFactory(directive) {
    return directive._scrollStrategy;
}
/**
 * A virtual scroll strategy that supports unknown or dynamic size items.
 */
class PblCdkVirtualScrollDirective {
    /**
     * @param {?} el
     * @param {?} grid
     */
    constructor(el, grid) {
        this.grid = grid;
        this._minBufferPx = 100;
        this._maxBufferPx = 200;
        /** @type {?} */
        const types = TYPES.filter((/**
         * @param {?} t
         * @return {?}
         */
        t => el.nativeElement.hasAttribute(t)));
        if (types.length > 1) {
            throw new Error(`Invalid vScroll instruction, only one value is allow: ${JSON.stringify(types)}`);
        }
        else {
            this._type = types[0];
        }
    }
    /**
     * The size of the items in the list (in pixels).
     * Valid for `vScrollFixed` only!
     *
     * Default: 20
     * @return {?}
     */
    get vScrollAuto() { return this._vScrollAuto; }
    /**
     * @param {?} value
     * @return {?}
     */
    set vScrollAuto(value) { this._vScrollAuto = coerceNumberProperty(value); }
    /**
     * The size of the items in the list (in pixels).
     * Valid for `vScrollFixed` only!
     *
     * Default: 20
     * @return {?}
     */
    get vScrollFixed() { return this._vScrollFixed; }
    /**
     * @param {?} value
     * @return {?}
     */
    set vScrollFixed(value) { this._vScrollFixed = value; }
    /**
     * The minimum amount of buffer rendered beyond the viewport (in pixels).
     * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
     *
     * Valid for `vScrollAuto` and `vScrollFixed` only!
     * Default: 100
     * @return {?}
     */
    get minBufferPx() { return this._minBufferPx; }
    /**
     * @param {?} value
     * @return {?}
     */
    set minBufferPx(value) { this._minBufferPx = coerceNumberProperty(value); }
    /**
     * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
     *
     * Valid for `vScrollAuto` and `vScrollFixed` only!
     * Default: 100
     * @return {?}
     */
    get maxBufferPx() { return this._maxBufferPx; }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxBufferPx(value) { this._maxBufferPx = coerceNumberProperty(value); }
    /**
     * @return {?}
     */
    get wheelMode() { return this._wheelMode; }
    /**
     * @param {?} value
     * @return {?}
     */
    set wheelMode(value) {
        switch (value) {
            case 'passive':
            case 'blocking':
                this._wheelMode = value;
                break;
            default:
                /** @type {?} */
                const wheelMode = coerceNumberProperty(value);
                if (wheelMode && wheelMode >= 1 && wheelMode <= 60) {
                    this._wheelMode = wheelMode;
                }
                break;
        }
    }
    /**
     * @return {?}
     */
    get type() { return this._type; }
    ;
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this._type) {
            if ('_vScrollFixed' in (/** @type {?} */ (this))) {
                this._type = 'vScrollFixed';
            }
            else if ('_vScrollAuto' in (/** @type {?} */ (this))) {
                this._type = 'vScrollAuto';
            }
            else {
                this._type = 'vScrollNone';
            }
        }
        switch (this.type) {
            case 'vScrollFixed':
                if (!this._vScrollFixed) {
                    this.vScrollFixed = this.grid.findInitialRowHeight() || 48;
                }
                this._scrollStrategy = new PblNgridFixedSizeVirtualScrollStrategy(this.vScrollFixed, this.minBufferPx, this.maxBufferPx);
                break;
            case 'vScrollAuto':
                if (!this._vScrollAuto) {
                    this._vScrollAuto = this.grid.findInitialRowHeight() || 48;
                }
                this._scrollStrategy = new TableAutoSizeVirtualScrollStrategy(this.minBufferPx, this.maxBufferPx, new TableItemSizeAverager(this._vScrollAuto));
                break;
            default:
                this._scrollStrategy = new NoVirtualScrollStrategy();
                break;
        }
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this._scrollStrategy) {
            switch (this.type) {
                case 'vScrollFixed':
                    ((/** @type {?} */ (this._scrollStrategy)))
                        .updateItemAndBufferSize(this.vScrollFixed, this.minBufferPx, this.maxBufferPx);
                    break;
                case 'vScrollAuto':
                    ((/** @type {?} */ (this._scrollStrategy)))
                        .updateBufferSize(this.minBufferPx, this.maxBufferPx);
                    break;
                default:
                    break;
            }
        }
    }
    /**
     * @return {?}
     */
    get scrolledIndexChange() { return this._scrollStrategy.scrolledIndexChange; }
    /**
     * @param {?} value
     * @return {?}
     */
    set scrolledIndexChange(value) { this._scrollStrategy.scrolledIndexChange = value; }
    /**
     * @param {?} viewport
     * @return {?}
     */
    attach(viewport) { this._scrollStrategy.attach(viewport); }
    /**
     * @return {?}
     */
    detach() { this._scrollStrategy.detach(); }
    /**
     * @return {?}
     */
    onContentScrolled() { this._scrollStrategy.onContentScrolled(); }
    /**
     * @return {?}
     */
    onDataLengthChanged() { this._scrollStrategy.onDataLengthChanged(); }
    /**
     * @return {?}
     */
    onContentRendered() { this._scrollStrategy.onContentRendered(); }
    /**
     * @return {?}
     */
    onRenderedOffsetChanged() { this._scrollStrategy.onRenderedOffsetChanged(); }
    /**
     * @param {?} index
     * @param {?} behavior
     * @return {?}
     */
    scrollToIndex(index, behavior) { this._scrollStrategy.scrollToIndex(index, behavior); }
}
PblCdkVirtualScrollDirective.decorators = [
    { type: Directive, args: [{
                selector: 'pbl-ngrid[vScrollAuto], pbl-ngrid[vScrollFixed], pbl-ngrid[vScrollNone]',
                providers: [{
                        provide: VIRTUAL_SCROLL_STRATEGY,
                        useExisting: PblCdkVirtualScrollDirective,
                    }],
            },] }
];
/** @nocollapse */
PblCdkVirtualScrollDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: PblNgridComponent }
];
PblCdkVirtualScrollDirective.propDecorators = {
    vScrollAuto: [{ type: Input }],
    vScrollFixed: [{ type: Input }],
    minBufferPx: [{ type: Input }],
    maxBufferPx: [{ type: Input }],
    wheelMode: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    PblCdkVirtualScrollDirective.prototype._vScrollAuto;
    /** @type {?} */
    PblCdkVirtualScrollDirective.prototype._vScrollFixed;
    /** @type {?} */
    PblCdkVirtualScrollDirective.prototype._minBufferPx;
    /** @type {?} */
    PblCdkVirtualScrollDirective.prototype._maxBufferPx;
    /** @type {?} */
    PblCdkVirtualScrollDirective.prototype._wheelMode;
    /**
     * The scroll strategy used by this directive.
     * @type {?}
     */
    PblCdkVirtualScrollDirective.prototype._scrollStrategy;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollDirective.prototype._type;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollDirective.prototype.grid;
    /* Skipping unhandled member: ;*/
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} config
 * @param {?=} scrollStrategy
 * @return {?}
 */
function resolveScrollStrategy(config, scrollStrategy) {
    if (!scrollStrategy && config.has('virtualScroll')) {
        /** @type {?} */
        const virtualScrollConfig = config.get('virtualScroll');
        if (typeof virtualScrollConfig.defaultStrategy === 'function') {
            scrollStrategy = virtualScrollConfig.defaultStrategy();
        }
    }
    return scrollStrategy || new TableAutoSizeVirtualScrollStrategy(100, 200);
}
let PblCdkVirtualScrollViewportComponent = class PblCdkVirtualScrollViewportComponent extends CdkVirtualScrollViewport {
    /**
     * @param {?} elementRef
     * @param {?} cdr
     * @param {?} ngZone
     * @param {?} config
     * @param {?} pblScrollStrategy
     * @param {?} dir
     * @param {?} scrollDispatcher
     * @param {?} pluginCtrl
     * @param {?} grid
     */
    constructor(elementRef, cdr, ngZone, config, pblScrollStrategy, dir, scrollDispatcher, pluginCtrl, grid) {
        super(elementRef, cdr, ngZone, pblScrollStrategy = resolveScrollStrategy(config, pblScrollStrategy), dir, scrollDispatcher);
        this.cdr = cdr;
        this.pblScrollStrategy = pblScrollStrategy;
        this.grid = grid;
        /**
         * Event emitted when the scrolling state of rows in the grid changes.
         * When scrolling starts `true` is emitted and when the scrolling ends `false` is emitted.
         *
         * The grid is in "scrolling" state from the first scroll event and until 2 animation frames
         * have passed without a scroll event.
         *
         * When scrolling, the emitted value is the direction: -1 or 1
         * When not scrolling, the emitted value is 0.
         *
         * NOTE: This event runs outside the angular zone.
         */
        this.scrolling = new EventEmitter();
        /**
         * Emits an estimation of the current frame rate while scrolling, in a 500ms interval.
         *
         * The frame rate value is the average frame rate from all measurements since the scrolling began.
         * To estimate the frame rate, a significant number of measurements is required so value is emitted every 500 ms.
         * This means that a single scroll or short scroll bursts will not result in a `scrollFrameRate` emissions.
         *
         * Valid on when virtual scrolling is enabled.
         *
         * NOTE: This event runs outside the angular zone.
         *
         * In the future the measurement logic might be replaced with the Frame Timing API
         * See:
         * - https://developers.google.com/web/updates/2014/11/frame-timing-api
         * - https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
         * - https://github.com/googlearchive/frame-timing-polyfill/wiki/Explainer
         */
        this.scrollFrameRate = new EventEmitter();
        /**
         * The `scrollHeight` of the virtual scroll viewport.
         * The `scrollHeight` is updated by the virtual scroll (update logic and frequency depends on the strategy implementation) through
         * the `setTotalContentSize(size)` method. The input size is used to position a dummy spacer element at a position that mimics the `scrollHeight`.
         *
         * In theory, the size sent to `setTotalContentSize` should equal the `scrollHeight` value, once the browser update's the layout.
         * In reality it does not happen, sometimes they are not equal. Setting a size will result in a different `scrollHeight`.
         * This might be due to changes in measurements when handling sticky meta rows (moving back and forth)
         *
         * Because the position of the dummy spacer element is set through DI the layout will run in the next micro-task after the call to `setTotalContentSize`.
         */
        this.scrollHeight = 0;
        this.ngeRenderedContentSize = 0;
        /// TODO(shlomiassaf): Remove when not supporting 8.1.2 and below
        /// COMPATIBILITY 8.1.2- <-> 8.1.3+
        /**
         * A string representing the `style.width` property value to be used for the spacer element.
         */
        this._totalContentWidth = '';
        /**
         * A string representing the `style.height` property value to be used for the spacer element.
         */
        this._totalContentHeight = '';
        /**
         * The transform used to scale the spacer to the same size as all content, including content that
         * is not currently rendered.
         * @deprecated
         */
        this._totalContentSizeTransform = '';
        this.offsetChange$ = new Subject();
        this._isScrolling = false;
        if (config.has('virtualScroll')) {
            this.wheelModeDefault = config.get('virtualScroll').wheelMode;
        }
        config.onUpdate('virtualScroll').pipe(UnRx(this)).subscribe((/**
         * @param {?} change
         * @return {?}
         */
        change => this.wheelModeDefault = change.curr.wheelMode));
        if (pblScrollStrategy instanceof PblCdkVirtualScrollDirective) {
            this.enabled = pblScrollStrategy.type !== 'vScrollNone';
        }
        else {
            this.enabled = !(pblScrollStrategy instanceof NoVirtualScrollStrategy);
        }
        pluginCtrl.extApi.setViewport(this);
        this.offsetChange = this.offsetChange$.asObservable();
        this._minWidth$ = grid.columnApi.totalColumnWidthChange;
    }
    /**
     * @return {?}
     */
    get isScrolling() { return this._isScrolling; }
    /**
     * @return {?}
     */
    get wheelMode() {
        return ((/** @type {?} */ (this.pblScrollStrategy))).wheelMode || this.wheelModeDefault || 'passive';
    }
    /**
     * @return {?}
     */
    get innerWidth() {
        /** @type {?} */
        const innerWidthHelper = (/** @type {?} */ (this.elementRef.nativeElement.querySelector('.cdk-virtual-scroll-inner-width')));
        return innerWidthHelper.getBoundingClientRect().width;
    }
    /**
     * @return {?}
     */
    get outerWidth() {
        return this.elementRef.nativeElement.getBoundingClientRect().width;
    }
    /**
     * @return {?}
     */
    get innerHeight() {
        /** @type {?} */
        const innerWidthHelper = (/** @type {?} */ (this.elementRef.nativeElement.querySelector('.cdk-virtual-scroll-inner-width')));
        return innerWidthHelper.getBoundingClientRect().height;
    }
    /**
     * @return {?}
     */
    get outerHeight() {
        return this.elementRef.nativeElement.getBoundingClientRect().height;
    }
    /**
     * @return {?}
     */
    get scrollWidth() {
        return this.elementRef.nativeElement.scrollWidth;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.enabled) {
            super.ngOnInit();
        }
        else {
            CdkScrollable.prototype.ngOnInit.call(this);
        }
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => this.initScrollWatcher()));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // If virtual scroll is disabled (`NoVirtualScrollStrategy`) we need to disable any effect applied
        // by the viewport, wrapping the content injected to it.
        // The main effect is the grid having height 0 at all times, unless the height is explicitly set.
        // This happens because the content taking out of the layout, wrapped in absolute positioning.
        // Additionally, the host itself (viewport) is set to contain: strict.
        const { grid } = this;
        if (this.enabled) {
            grid._cdkTable.attachViewPort();
        }
        this.scrolling
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} isScrolling
         * @return {?}
         */
        isScrolling => {
            this._isScrolling = !!isScrolling;
            if (isScrolling) {
                grid.addClass('pbl-ngrid-scrolling');
            }
            else {
                grid.removeClass('pbl-ngrid-scrolling');
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.offsetChange$.complete();
    }
    /**
     * @param {?} size
     * @return {?}
     */
    setTotalContentSize(size) {
        super.setTotalContentSize(size);
        // TODO(shlomiassaf)[perf, 3]: run this once... (aggregate all calls within the same animation frame)
        requestAnimationFrame((/**
         * @return {?}
         */
        () => {
            this.scrollHeight = this.elementRef.nativeElement.scrollHeight; //size;
            this.updateFiller();
            // We must trigger a change detection cycle because the filler div element is updated through bindings
            this.cdr.markForCheck();
        }));
    }
    /**
     * @return {?}
     */
    checkViewportSize() {
        // TODO: Check for changes in `CdkVirtualScrollViewport` source code, when resizing is handled!
        // see https://github.com/angular/material2/blob/28fb3abe77c5336e4739c820584ec99c23f1ae38/src/cdk/scrolling/virtual-scroll-viewport.ts#L341
        /** @type {?} */
        const prev = this.getViewportSize();
        super.checkViewportSize();
        if (prev !== this.getViewportSize()) {
            this.updateFiller();
        }
    }
    /**
     * Measure the combined size of all of the rendered items.
     * @return {?}
     */
    measureRenderedContentSize() {
        /** @type {?} */
        let size = super.measureRenderedContentSize();
        if (this.orientation === 'vertical') {
            size -= this.stickyRowHeaderContainer.offsetHeight + this.stickyRowFooterContainer.offsetHeight;
            // Compensate for hz scroll bar, if exists, only in non virtual scroll mode.
            if (!this.enabled) {
                size += this.outerHeight - this.innerHeight;
            }
        }
        return this.ngeRenderedContentSize = size;
    }
    /**
     * @private
     * @return {?}
     */
    updateFiller() {
        this.measureRenderedContentSize();
        if (this.grid.noFiller) {
            this.pblFillerHeight = undefined;
        }
        else {
            this.pblFillerHeight = this.getViewportSize() >= this.ngeRenderedContentSize ?
                `calc(100% - ${this.ngeRenderedContentSize}px)`
                : undefined;
        }
    }
    /**
     * @param {?} prev
     * @param {?} curr
     * @return {?}
     */
    onSourceLengthChange(prev, curr) {
        this.checkViewportSize();
        this.updateFiller();
    }
    /**
     * @param {?} forOf
     * @return {?}
     */
    attach(forOf) {
        super.attach(forOf);
        /** @type {?} */
        const scrollStrategy = this.pblScrollStrategy instanceof PblCdkVirtualScrollDirective
            ? this.pblScrollStrategy._scrollStrategy
            : this.pblScrollStrategy;
        if (scrollStrategy instanceof TableAutoSizeVirtualScrollStrategy) {
            scrollStrategy.averager.setRowInfo(forOf);
        }
    }
    /**
     * @param {?} offset
     * @param {?=} to
     * @return {?}
     */
    setRenderedContentOffset(offset, to = 'to-start') {
        super.setRenderedContentOffset(offset, to);
        if (this.enabled) {
            if (this.offset !== offset) {
                this.offset = offset;
                if (!this.isCDPending) {
                    this.isCDPending = true;
                    /** @type {?} */
                    const syncTransform = (/**
                     * @return {?}
                     */
                    () => { });
                    this.ngZone.runOutsideAngular((/**
                     * @return {?}
                     */
                    () => Promise.resolve()
                        .then((/**
                     * @return {?}
                     */
                    () => syncTransform()))
                        .then((/**
                     * @return {?}
                     */
                    () => {
                        this.isCDPending = false;
                        this.offsetChange$.next(this.offset);
                    }))));
                }
            }
        }
    }
    /**
     * Init the scrolling watcher which track scroll events an emits `scrolling` and `scrollFrameRate` events.
     * @private
     * @return {?}
     */
    initScrollWatcher() {
        /** @type {?} */
        let scrolling = 0;
        /** @type {?} */
        let lastOffset = this.measureScrollOffset();
        this.elementScrolled()
            .subscribe((/**
         * @return {?}
         */
        () => {
            /*  `scrolling` is a boolean flag that turns on with the first `scroll` events and ends after 2 browser animation frames have passed without a `scroll` event.
                This is an attempt to detect a scroll end event, which does not exist.
    
                `scrollFrameRate` is a number that represent a rough estimation of the frame rate by measuring the time passed between each request animation frame
                while the `scrolling` state is true. The frame rate value is the average frame rate from all measurements since the scrolling began.
                To estimate the frame rate, a significant number of measurements is required so value is emitted every 500 ms.
                This means that a single scroll or short scroll bursts will not result in a `scrollFrameRate` emissions.
    
            */
            if (scrolling === 0) {
                /*  The measure array holds values required for frame rate measurements.
                              [0] Storage for last timestamp taken
                              [1] The sum of all measurements taken (a measurement is the time between 2 snapshots)
                              [2] The count of all measurements
                              [3] The sum of all measurements taken WITHIN the current buffer window. This buffer is flushed into [1] every X ms (see buggerWindow const).
                          */
                /** @type {?} */
                const bufferWindow = 499;
                /** @type {?} */
                const measure = [performance.now(), 0, 0, 0];
                /** @type {?} */
                const offset = this.measureScrollOffset();
                if (lastOffset === offset) {
                    return;
                }
                /** @type {?} */
                const delta = lastOffset < offset ? 1 : -1;
                this.scrolling.next(delta);
                /** @type {?} */
                const raf = (/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const time = -measure[0] + (measure[0] = performance.now());
                    if (time > 5) {
                        measure[1] += time;
                        measure[2] += 1;
                    }
                    if (scrolling === -1) {
                        scrolling = 0;
                        lastOffset = this.measureScrollOffset();
                        this.scrolling.next(0);
                    }
                    else {
                        if (measure[1] > bufferWindow) {
                            measure[3] += measure[1];
                            measure[1] = 0;
                            this.scrollFrameRate.emit(1000 / (measure[3] / measure[2]));
                        }
                        scrolling = scrolling === 1 ? -1 : 1;
                        requestAnimationFrame(raf);
                    }
                });
                requestAnimationFrame(raf);
            }
            scrolling++;
        }));
    }
};
PblCdkVirtualScrollViewportComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: PblNgridConfigService },
    { type: undefined },
    { type: Directionality },
    { type: ScrollDispatcher },
    { type: PblNgridPluginController },
    { type: PblNgridComponent }
];
PblCdkVirtualScrollViewportComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-cdk-virtual-scroll-viewport',
                template: "<p class=\"cdk-virtual-scroll-inner-width\"></p>\n<ng-content select=\".cdk-virtual-scroll-before-content-wrapper\"></ng-content>\n<!--\n  Wrap the rendered content in an element that will be used to offset it based on the scroll\n  position.\n-->\n<div #contentWrapper [class.cdk-virtual-scroll-content-wrapper]=\"enabled\" style=\"width: 100%\" [style.minWidth.px]=\"_minWidth$ | async\">\n  <ng-content></ng-content>\n</div>\n\n<!--\n  Spacer used to force the scrolling container to the correct size for the *total* number of items\n  so that the scrollbar captures the size of the entire data set.\n-->\n<div *ngIf=\"enabled\" class=\"cdk-virtual-scroll-spacer\"\n     [style.width]=\"_totalContentWidth\" [style.height]=\"_totalContentHeight\"\n     [style.transform]=\"_totalContentSizeTransform\"></div>\n<div *ngIf=\"pblFillerHeight && enabled\"\n    class=\"pbl-ngrid-space-fill\"\n    [style.minWidth.px]=\"_minWidth$ | async\"\n    [style.top.px]=\"ngeRenderedContentSize\"\n    [style.height]=\"pblFillerHeight\"></div>\n",
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    class: 'cdk-virtual-scroll-viewport',
                    '[class.cdk-virtual-scroll-disabled]': '!enabled',
                    '[class.cdk-virtual-scroll-orientation-horizontal]': 'orientation === "horizontal"',
                    '[class.cdk-virtual-scroll-orientation-vertical]': 'orientation === "vertical"'
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["pbl-cdk-virtual-scroll-viewport{display:block;position:relative;overflow:auto;contain:strict;-webkit-transform:translateZ(0);transform:translateZ(0);will-change:scroll-position;-webkit-overflow-scrolling:touch}pbl-cdk-virtual-scroll-viewport .cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] pbl-cdk-virtual-scroll-viewport .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-inner-width{width:100%;height:100%;position:absolute;margin:0!important;padding:0!important}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:0}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:0}.cdk-virtual-scroll-spacer{position:absolute;top:0;left:0;height:1px;width:1px;-webkit-transform-origin:0 0;transform-origin:0 0}[dir=rtl] .cdk-virtual-scroll-spacer{right:0;left:auto;-webkit-transform-origin:100% 0;transform-origin:100% 0}.pbl-ngrid-space-fill{position:absolute;left:0;width:100%}"]
            }] }
];
/** @nocollapse */
PblCdkVirtualScrollViewportComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: PblNgridConfigService },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [VIRTUAL_SCROLL_STRATEGY,] }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: ScrollDispatcher },
    { type: PblNgridPluginController },
    { type: PblNgridComponent }
];
PblCdkVirtualScrollViewportComponent.propDecorators = {
    stickyRowHeaderContainer: [{ type: Input }],
    stickyRowFooterContainer: [{ type: Input }],
    scrolling: [{ type: Output }],
    scrollFrameRate: [{ type: Output }]
};
PblCdkVirtualScrollViewportComponent = __decorate([
    UnRx(),
    __metadata("design:paramtypes", [ElementRef,
        ChangeDetectorRef,
        NgZone,
        PblNgridConfigService, Object, Directionality,
        ScrollDispatcher,
        PblNgridPluginController,
        PblNgridComponent])
], PblCdkVirtualScrollViewportComponent);
if (false) {
    /** @type {?} */
    PblCdkVirtualScrollViewportComponent.prototype.enabled;
    /**
     * Emits the offset (in pixels) of the rendered content every time it changes.
     * The emission is done OUTSIDE of angular (i.e. no change detection cycle is triggered).
     *
     * Note that when not enabled (i.e `NoVirtualScrollStrategy` is used) there are no emissions.
     * @type {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.offsetChange;
    /** @type {?} */
    PblCdkVirtualScrollViewportComponent.prototype.stickyRowHeaderContainer;
    /** @type {?} */
    PblCdkVirtualScrollViewportComponent.prototype.stickyRowFooterContainer;
    /**
     * Event emitted when the scrolling state of rows in the grid changes.
     * When scrolling starts `true` is emitted and when the scrolling ends `false` is emitted.
     *
     * The grid is in "scrolling" state from the first scroll event and until 2 animation frames
     * have passed without a scroll event.
     *
     * When scrolling, the emitted value is the direction: -1 or 1
     * When not scrolling, the emitted value is 0.
     *
     * NOTE: This event runs outside the angular zone.
     * @type {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.scrolling;
    /**
     * Emits an estimation of the current frame rate while scrolling, in a 500ms interval.
     *
     * The frame rate value is the average frame rate from all measurements since the scrolling began.
     * To estimate the frame rate, a significant number of measurements is required so value is emitted every 500 ms.
     * This means that a single scroll or short scroll bursts will not result in a `scrollFrameRate` emissions.
     *
     * Valid on when virtual scrolling is enabled.
     *
     * NOTE: This event runs outside the angular zone.
     *
     * In the future the measurement logic might be replaced with the Frame Timing API
     * See:
     * - https://developers.google.com/web/updates/2014/11/frame-timing-api
     * - https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
     * - https://github.com/googlearchive/frame-timing-polyfill/wiki/Explainer
     * @type {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.scrollFrameRate;
    /**
     * The `scrollHeight` of the virtual scroll viewport.
     * The `scrollHeight` is updated by the virtual scroll (update logic and frequency depends on the strategy implementation) through
     * the `setTotalContentSize(size)` method. The input size is used to position a dummy spacer element at a position that mimics the `scrollHeight`.
     *
     * In theory, the size sent to `setTotalContentSize` should equal the `scrollHeight` value, once the browser update's the layout.
     * In reality it does not happen, sometimes they are not equal. Setting a size will result in a different `scrollHeight`.
     * This might be due to changes in measurements when handling sticky meta rows (moving back and forth)
     *
     * Because the position of the dummy spacer element is set through DI the layout will run in the next micro-task after the call to `setTotalContentSize`.
     * @type {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.scrollHeight;
    /** @type {?} */
    PblCdkVirtualScrollViewportComponent.prototype.ngeRenderedContentSize;
    /** @type {?} */
    PblCdkVirtualScrollViewportComponent.prototype.pblFillerHeight;
    /**
     * A string representing the `style.width` property value to be used for the spacer element.
     * @type {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype._totalContentWidth;
    /**
     * A string representing the `style.height` property value to be used for the spacer element.
     * @type {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype._totalContentHeight;
    /**
     * The transform used to scale the spacer to the same size as all content, including content that
     * is not currently rendered.
     * @deprecated
     * @type {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype._totalContentSizeTransform;
    /** @type {?} */
    PblCdkVirtualScrollViewportComponent.prototype._minWidth$;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollViewportComponent.prototype.offsetChange$;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollViewportComponent.prototype.offset;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollViewportComponent.prototype.isCDPending;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollViewportComponent.prototype._isScrolling;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollViewportComponent.prototype.wheelModeDefault;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollViewportComponent.prototype.cdr;
    /** @type {?} */
    PblCdkVirtualScrollViewportComponent.prototype.pblScrollStrategy;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollViewportComponent.prototype.grid;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class PblNgridScrolling {
    /**
     * @param {?} table
     * @param {?} pluginCtrl
     * @param {?} zone
     */
    constructor(table, pluginCtrl, zone) {
        /**
         * Event emitted when the scrolling state of rows in the table changes.
         * When scrolling starts `true` is emitted and when the scrolling ends `false` is emitted.
         *
         * The table is in "scrolling" state from the first scroll event and until 2 animation frames
         * have passed without a scroll event.
         *
         * When scrolling, the emitted value is the direction: -1 or 1
         * When not scrolling, the emitted value is 0.
         *
         * NOTE: This event runs outside the angular zone.
         */
        this.scrolling = new EventEmitter();
        /** @type {?} */
        let subscription = pluginCtrl.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.kind === 'onInit') {
                const { viewport } = table;
                if (viewport) {
                    viewport.scrolling.subscribe((/**
                     * @param {?} isScrolling
                     * @return {?}
                     */
                    isScrolling => zone.run((/**
                     * @return {?}
                     */
                    () => this.scrolling.next(isScrolling)))));
                }
                subscription.unsubscribe();
                subscription = undefined;
            }
        }));
    }
}
PblNgridScrolling.decorators = [
    { type: Directive, args: [{
                selector: 'pbl-ngrid[scrolling]'
            },] }
];
/** @nocollapse */
PblNgridScrolling.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: PblNgridPluginController },
    { type: NgZone }
];
PblNgridScrolling.propDecorators = {
    scrolling: [{ type: Output }]
};
if (false) {
    /**
     * Event emitted when the scrolling state of rows in the table changes.
     * When scrolling starts `true` is emitted and when the scrolling ends `false` is emitted.
     *
     * The table is in "scrolling" state from the first scroll event and until 2 animation frames
     * have passed without a scroll event.
     *
     * When scrolling, the emitted value is the direction: -1 or 1
     * When not scrolling, the emitted value is 0.
     *
     * NOTE: This event runs outside the angular zone.
     * @type {?}
     */
    PblNgridScrolling.prototype.scrolling;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const COMMON_TABLE_TEMPLATE_INIT = new InjectionToken('COMMON TABLE TEMPLATE INIT');
/**
 * @record
 */
function CommonTemplateInit() { }
if (false) {
    /** @type {?} */
    CommonTemplateInit.prototype.component;
    /**
     * When true will use the root registry service (for templates).
     * Otherwise, uses the provided registry from the dependency tree.
     * @type {?|undefined}
     */
    CommonTemplateInit.prototype.root;
}
/**
 * @param {?} components
 * @return {?}
 */
function provideCommon(components) {
    return [
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: components },
        { provide: COMMON_TABLE_TEMPLATE_INIT, multi: true, useValue: components },
    ];
}
class PblNgridModule {
    /**
     * @param {?} ngRef
     * @param {?} registry
     * @param {?} components
     */
    constructor(ngRef, registry, components) {
        if (components) {
            for (const multi of components) {
                for (const c of multi) {
                    if (c.root) {
                        registry = registry.getRoot();
                    }
                    PblNgridModule.loadCommonTemplates(ngRef, c.component, { registry, destroy: true });
                }
            }
        }
    }
    /**
     * @param {?} config
     * @param {?} components
     * @return {?}
     */
    static forRoot(config, components) {
        return {
            ngModule: PblNgridModule,
            providers: [
                { provide: PEB_NGRID_CONFIG, useValue: config },
                PblNgridConfigService,
                provideCommon(components),
            ]
        };
    }
    /**
     * @param {?} components
     * @return {?}
     */
    static withCommon(components) {
        return {
            ngModule: PblNgridModule,
            providers: provideCommon(components),
        };
    }
    /**
     * @template T
     * @param {?} ngRef
     * @param {?} component
     * @param {?=} options
     * @return {?}
     */
    static loadCommonTemplates(ngRef, component, options) {
        let { injector } = ngRef;
        const { registry, destroy } = options || ((/** @type {?} */ ({})));
        if (registry) {
            injector = Injector.create({
                providers: [{ provide: PblNgridRegistryService, useValue: registry.getRoot() }],
                parent: ngRef.injector
            });
        }
        /** @type {?} */
        const cmpRef = ngRef.componentFactoryResolver.resolveComponentFactory(component).create(injector);
        cmpRef.changeDetectorRef.detectChanges();
        if (destroy) {
            ngRef.onDestroy((/**
             * @return {?}
             */
            () => {
                try {
                    cmpRef.destroy();
                }
                catch (err) { }
            }));
        }
        return cmpRef;
    }
}
PblNgridModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ScrollingModule, ScrollingModule$1,
                    CdkTableModule,
                ],
                declarations: [
                    PblNgridMetaRowContainerComponent, PblMetaRowDirective,
                    PblCdkTableComponent,
                    PblNgridColumnDef,
                    PblNgridRowComponent,
                    PblNgridCellStyling,
                    PblNgridOuterSectionDirective,
                    PblNgridHeaderExtensionRefDirective,
                    PblNgridNoDataRefDirective,
                    PblNgridPaginatorRefDirective,
                    PblNgridHeaderCellDefDirective,
                    PblNgridFooterCellDefDirective,
                    PblNgridCellDefDirective, PblNgridEditorCellDefDirective,
                    PblNgridHeaderCellComponent,
                    PblNgridCellDirective,
                    PblNgridFooterCellDirective,
                    PblColumnSizeObserver,
                    PblCdkVirtualScrollViewportComponent, PblCdkVirtualScrollDirective, PblNgridScrolling,
                    PblNgridCellEditAutoFocusDirective,
                    PblNgridComponent,
                ],
                exports: [
                    PblNgridRowComponent,
                    PblNgridCellStyling,
                    PblNgridOuterSectionDirective,
                    PblNgridHeaderExtensionRefDirective,
                    PblNgridNoDataRefDirective,
                    PblNgridPaginatorRefDirective,
                    PblNgridHeaderCellDefDirective,
                    PblNgridFooterCellDefDirective,
                    PblNgridCellDefDirective, PblNgridEditorCellDefDirective, PblNgridScrolling,
                    PblNgridHeaderCellComponent,
                    PblNgridCellDirective,
                    PblNgridFooterCellDirective,
                    PblColumnSizeObserver,
                    PblCdkVirtualScrollDirective,
                    PblNgridCellEditAutoFocusDirective,
                    PblNgridComponent,
                ],
            },] }
];
/** @nocollapse */
PblNgridModule.ctorParameters = () => [
    { type: NgModuleRef },
    { type: PblNgridRegistryService },
    { type: Array, decorators: [{ type: Inject, args: [COMMON_TABLE_TEMPLATE_INIT,] }, { type: Optional }, { type: Self }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const utils = {
    isPblColumn,
    isPblMetaColumn,
    isPblColumnGroup,
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ColumnApi, EXT_API_TOKEN, NgridPlugin, NoVirtualScrollStrategy, PBL_NGRID_ROW_TEMPLATE, PEB_NGRID_CONFIG, PblColumn, PblColumnFactory, PblColumnGroup, PblDataSource, PblDataSourceAdapter, PblDataSourceFactory, PblMetaColumn, PblNgridCellDefDirective, PblNgridCellStyling, PblNgridComponent, PblNgridConfigService, PblNgridDataHeaderExtensionContext, PblNgridFooterCellDefDirective, PblNgridHeaderCellDefDirective, PblNgridModule, PblNgridMultiComponentRegistry, PblNgridMultiTemplateRegistry, PblNgridNoDataRefDirective, PblNgridPluginController, PblNgridRegistryService, PblNgridRowComponent, PblNgridSingleTemplateRegistry, PblPagingPaginator, PblRowContext, PblTokenPaginator, TableAutoSizeVirtualScrollStrategy, applySort, columnFactory, createDS, isPblColumn, isPblColumnGroup, isPblMetaColumn, provideCommon, utils, PblNgridHeaderExtensionRefDirective as ɵa, PblNgridPaginatorRefDirective as ɵb, PblNgridOuterSectionDirective as ɵc, PblNgridHeaderCellComponent as ɵd, PblNgridCellDirective as ɵe, PblNgridFooterCellDirective as ɵf, PblNgridBaseCellDef as ɵg, PblNgridEditorCellDefDirective as ɵh, PblNgridColumnDef as ɵi, PblNgridCellEditAutoFocusDirective as ɵj, PblNgridMetaRowContainerComponent as ɵk, PblMetaRowDirective as ɵl, PblNgridMetaRowService as ɵm, PblColumnGroupStore as ɵn, ColumnSizeInfo as ɵo, MetaCellContext as ɵp, PblCdkTableComponent as ɵq, internalApiFactory as ɵr, pluginControllerFactory as ɵs, metaRowServiceFactory as ɵt, PblColumnSizeObserver as ɵu, PblCdkVirtualScrollViewportComponent as ɵv, PblCdkVirtualScrollDirective as ɵw, PblNgridScrolling as ɵx, PblNgridPluginContext as ɵy, COMMON_TABLE_TEMPLATE_INIT as ɵz };
//# sourceMappingURL=pebula-ngrid.js.map
