import { PblNgridPluginController, utils, TablePlugin, PblNgridComponent, PblNgridModule, PblNgridConfigService } from '@pebula/ngrid';
import { __decorate, __metadata } from 'tslib';
import { Subject } from 'rxjs';
import { filter, mapTo, map, take, skip, debounceTime } from 'rxjs/operators';
import { Injector, Directive, Input, NgModule, Optional, SkipSelf } from '@angular/core';
import { UnRx } from '@pebula/utils';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let _instance;
/**
 * @record
 * @template T
 */
function PblNgridStateChunkSectionConfig() { }
if (false) {
    /** @type {?} */
    PblNgridStateChunkSectionConfig.prototype.stateMatcher;
    /** @type {?} */
    PblNgridStateChunkSectionConfig.prototype.sourceMatcher;
}
/**
 * @template T
 */
class StateVisor {
    /**
     * @private
     */
    constructor() {
        this.rootChunkSections = new Map();
        this.chunkHandlers = new Map();
    }
    /**
     * @return {?}
     */
    static get() { return _instance || (_instance = new StateVisor()); }
    /**
     * @template Z
     * @param {?} chunkId
     * @param {?} config
     * @return {?}
     */
    registerRootChunkSection(chunkId, config) {
        if (!this.rootChunkSections.has(chunkId)) {
            this.rootChunkSections.set(chunkId, config);
        }
    }
    /**
     * @template Z
     * @param {?} chunkHandlerDefs
     * @return {?}
     */
    registerChunkHandlerDefinition(chunkHandlerDefs) {
        const { chunkId } = chunkHandlerDefs;
        /** @type {?} */
        const handlersForGroup = this.chunkHandlers.get(chunkId) || [];
        handlersForGroup.push(chunkHandlerDefs);
        this.chunkHandlers.set(chunkId, handlersForGroup);
    }
    /**
     * @return {?}
     */
    getRootSections() {
        return Array.from(this.rootChunkSections.entries());
    }
    /**
     * @param {?} chunkId
     * @return {?}
     */
    getDefinitionsForSection(chunkId) {
        return this.chunkHandlers.get(chunkId) || [];
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    StateVisor.prototype.rootChunkSections;
    /**
     * @type {?}
     * @private
     */
    StateVisor.prototype.chunkHandlers;
}
/** @type {?} */
const stateVisor = StateVisor.get();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PblNgridLocalStoragePersistAdapter {
    /**
     * @param {?} id
     * @param {?} state
     * @return {?}
     */
    save(id, state) {
        try {
            /** @type {?} */
            const store = this.loadGlobalStateStore();
            store[id] = state;
            if (!state.__metadata__) {
                state.__metadata__ = (/** @type {?} */ ({}));
            }
            state.__metadata__.updatedAt = new Date().toISOString();
            this.saveGlobalStateStore(store);
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * @param {?} id
     * @return {?}
     */
    load(id) {
        return Promise.resolve(this.loadGlobalStateStore()[id] || (/** @type {?} */ ({})));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    exists(id) {
        /** @type {?} */
        const store = this.loadGlobalStateStore() || {};
        return Promise.resolve(id in store);
    }
    /**
     * @private
     * @return {?}
     */
    loadGlobalStateStore() {
        /** @type {?} */
        const raw = localStorage.getItem(PblNgridLocalStoragePersistAdapter.globalStateKey);
        return raw ? JSON.parse(raw) : {};
    }
    /**
     * @private
     * @param {?} store
     * @return {?}
     */
    saveGlobalStateStore(store) {
        localStorage.setItem(PblNgridLocalStoragePersistAdapter.globalStateKey, JSON.stringify(store));
    }
}
PblNgridLocalStoragePersistAdapter.globalStateKey = 'pebulaNgridState';
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridLocalStoragePersistAdapter.globalStateKey;
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
 * @template TState, TValue, TData, TKeyless
 */
function StateChunkItem() { }
if (false) {
    /** @type {?} */
    StateChunkItem.prototype.state;
    /** @type {?|undefined} */
    StateChunkItem.prototype.value;
    /** @type {?|undefined} */
    StateChunkItem.prototype.data;
    /** @type {?} */
    StateChunkItem.prototype.keyless;
}
/**
 * @record
 */
function RootStateChunks() { }
/**
 * @record
 */
function StateChunks() { }
/**
 * @record
 */
function PblNgridStateContext() { }
if (false) {
    /** @type {?} */
    PblNgridStateContext.prototype.grid;
    /** @type {?} */
    PblNgridStateContext.prototype.extApi;
    /** @type {?} */
    PblNgridStateContext.prototype.options;
}
/**
 * @record
 */
function PblNgridStateChunkSectionContext() { }
/**
 * @record
 * @template T
 */
function PblNgridStateChunkContext() { }
if (false) {
    /** @type {?} */
    PblNgridStateChunkContext.prototype.source;
    /** @type {?|undefined} */
    PblNgridStateChunkContext.prototype.data;
    /**
     * @template TChild
     * @param {?} childChunkId
     * @param {?} state
     * @param {?} source
     * @param {?=} data
     * @return {?}
     */
    PblNgridStateChunkContext.prototype.runChildChunk = function (childChunkId, state, source, data) { };
}
/**
 * @record
 */
function PblNgridStateMetadata() { }
if (false) {
    /** @type {?} */
    PblNgridStateMetadata.prototype.updatedAt;
}
/**
 * @record
 */
function PblNgridGlobalState() { }
if (false) {
    /** @type {?} */
    PblNgridGlobalState.prototype.__metadata__;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An interface for datasource specific logical units that can load and save state objects.
 *
 * For example, `PblNgridLocalStoragePersistAdapter` is an adapter that can loan and save the state
 * from the local storage.
 * @record
 */
function PblNgridPersistAdapter() { }
if (false) {
    /**
     * @param {?} id
     * @param {?} state
     * @return {?}
     */
    PblNgridPersistAdapter.prototype.save = function (id, state) { };
    /**
     * @param {?} id
     * @return {?}
     */
    PblNgridPersistAdapter.prototype.load = function (id) { };
    /**
     * @param {?} id
     * @return {?}
     */
    PblNgridPersistAdapter.prototype.exists = function (id) { };
}
/**
 * An interface for logical units that can resolve a unique id for a grid.
 *
 * For example, `PblNgridIdAttributeIdentResolver` is a resolver that will resolve an id from the
 * `id` property of the grid (`PblNgridComponent.id`) which is bound to the `id` attribute of the grid (`<pbl-ngrid id="SOME ID"></pbl-ngrid>`).
 * @record
 */
function PblNgridIdentResolver() { }
if (false) {
    /**
     * @param {?} ctx
     * @return {?}
     */
    PblNgridIdentResolver.prototype.resolveId = function (ctx) { };
}
/**
 * The context provided when resolving an id (`PblNgridIdentResolver`).
 * @record
 */
function PblNgridIdentResolverContext() { }
/**
 * @record
 */
function PblNgridStateSaveOptions() { }
if (false) {
    /**
     * The adapter to use for persistance.
     * \@default PblNgridLocalStoragePersistAdapter
     * @type {?|undefined}
     */
    PblNgridStateSaveOptions.prototype.persistenceAdapter;
    /**
     * The resolver used to get the unique id for an instance of the grid.
     * If not set default's to the id property of `PblNgridComponent` which is the id attribute of `<pbl-ngrid>`
     * \@default PblNgridIdAttributeIdentResolver
     * @type {?|undefined}
     */
    PblNgridStateSaveOptions.prototype.identResolver;
    /**
     * Instruction of chunk and chunk keys to include when serializing / deserializing.
     * Include is strict, only the included chunks and keys are used, everything else is ignored.
     *
     * If `include` and `exclude` are set, `include` wins.
     *
     * Note that when using include with child chunks you must include the root chunk of the child chunk, if not
     * the root chunk is skipped and so the child.
     *
     * For example, to include the `width` key of the `dataColumn` child chunk we must also include the `columns` root chunk.
     *
     * ```ts
     *   const obj: StateChunkKeyFilter = {
     *     columns: true,
     *     dataColumn: [
     *       'width',
     *     ]
     *   };
     * ```
     *
     * We can also use the wildcard `true` to include all items in a chunk:
     *
     * ```ts
     *   const obj: StateChunkKeyFilter = {
     *     columns: true,
     *     dataColumn: true,
     *   };
     * ```
     *
     * Same specificity rule apply here as well, `columns: true` alone will not include all of it's child chunks so we must add `dataColumn: true`.
     * Vice versa, `dataColumn: true` alone will not get included because it's parent (`columns`) is blocked
     * @type {?|undefined}
     */
    PblNgridStateSaveOptions.prototype.include;
    /**
     * Instruction of chunk and chunk keys to exclude when serializing / deserializing.
     * Exclude is not strict, all known chunks and keys are used unless they are excluded and so will be ignored
     *
     * If `include` and `exclude` are set, `include` wins.
     *
     * @type {?|undefined}
     */
    PblNgridStateSaveOptions.prototype.exclude;
}
/**
 * @record
 */
function PblNgridStateLoadOptions() { }
if (false) {
    /**
     * When set to `overwrite`, state values will run over existing runtime values.
     * When set to `merge`, state values will not run over existing runtime values and only update values that are not set.
     * \@default overwrite
     * @type {?|undefined}
     */
    PblNgridStateLoadOptions.prototype.strategy;
    /**
     * When set to true the loading process will try to avoid the use of grid methods that force an immediate redrew.
     * Usually, redrawing is not a problem but in some cases it is required, for example, avoiding redraws is useful when
     * we load the state after the columns are initiated but before the grid draws them, in this case some of the data is
     * missing because it depend on updates from the draw process.
     *
     * We use the term `avoid` because the state plugin is extensible so a plugin can also apply state for it's own use.
     * Because of that we can't guarantee that no redraw is performed.
     * @type {?|undefined}
     */
    PblNgridStateLoadOptions.prototype.avoidRedraw;
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
 * @template T, Z
 */
class PblNgridStateChunkHandlerHost {
    /**
     * @param {?} chunkId
     */
    constructor(chunkId) {
        this.chunkId = chunkId;
        this.keys = new Set();
        this.rKeys = new Set();
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {...?} keys
     * @return {THIS}
     */
    handleKeys(...keys) {
        for (const k of keys) {
            (/** @type {?} */ (this)).keys.add(k);
        }
        return (/** @type {?} */ (this));
    }
    /**
     * Required keys are keys that cannot get excluded.
     * Either by adding the to the `exclude` option or by omitting them from the `include` option.
     * @template THIS
     * @this {THIS}
     * @param {...?} keys
     * @return {THIS}
     */
    requiredKeys(...keys) {
        for (const k of keys) {
            (/** @type {?} */ (this)).keys.add(k);
            (/** @type {?} */ (this)).rKeys.add(k);
        }
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} fn
     * @return {THIS}
     */
    serialize(fn) {
        (/** @type {?} */ (this)).sFn = fn;
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} fn
     * @return {THIS}
     */
    deserialize(fn) {
        (/** @type {?} */ (this)).dFn = fn;
        return (/** @type {?} */ (this));
    }
    /**
     * @return {?}
     */
    register() {
        if (this.keys.size === 0) {
            throw new Error('Invalid state chunk handler, no keys defined.');
        }
        if (!this.sFn) {
            throw new Error('Invalid state chunk handler, missing serialize handler.');
        }
        if (!this.dFn) {
            throw new Error('Invalid state chunk handler, missing deserialize handler.');
        }
        stateVisor.registerChunkHandlerDefinition({
            chunkId: this.chunkId,
            keys: Array.from(this.keys.values()),
            rKeys: Array.from(this.rKeys.values()),
            serialize: this.sFn,
            deserialize: this.dFn,
        });
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridStateChunkHandlerHost.prototype.keys;
    /**
     * @type {?}
     * @private
     */
    PblNgridStateChunkHandlerHost.prototype.rKeys;
    /**
     * @type {?}
     * @private
     */
    PblNgridStateChunkHandlerHost.prototype.sFn;
    /**
     * @type {?}
     * @private
     */
    PblNgridStateChunkHandlerHost.prototype.dFn;
    /**
     * @type {?}
     * @private
     */
    PblNgridStateChunkHandlerHost.prototype.chunkId;
}
/**
 * @record
 * @template T, Z
 */
function PblNgridStateChunkHandlerDefinition() { }
if (false) {
    /** @type {?} */
    PblNgridStateChunkHandlerDefinition.prototype.chunkId;
    /** @type {?} */
    PblNgridStateChunkHandlerDefinition.prototype.keys;
    /** @type {?} */
    PblNgridStateChunkHandlerDefinition.prototype.rKeys;
    /** @type {?} */
    PblNgridStateChunkHandlerDefinition.prototype.serialize;
    /** @type {?} */
    PblNgridStateChunkHandlerDefinition.prototype.deserialize;
}
/**
 * @template T
 * @param {?} section
 * @return {?}
 */
function createStateChunkHandler(section) {
    return new PblNgridStateChunkHandlerHost(section);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PblNgridIdAttributeIdentResolver {
    /**
     * @param {?} ctx
     * @return {?}
     */
    resolveId(ctx) {
        return ctx.grid.id;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} grid
 * @param {?=} options
 * @return {?}
 */
function resolveId(grid, options) {
    /** @type {?} */
    const id = options.identResolver.resolveId(createChunkSectionContext(grid, options));
    if (!id) {
        throw new Error('Could not resolve a unique id for an ngrid instance, state is disabled');
    }
    return id;
}
/**
 * @param {?} def
 * @param {?} state
 * @param {?} ctx
 * @return {?}
 */
function serialize(def, state, ctx) {
    /** @type {?} */
    const keyPredicate = stateKeyPredicateFactory(def.chunkId, ctx.options);
    for (const key of def.keys) {
        if (!keyPredicate || def.rKeys.indexOf(key) > -1 || keyPredicate((/** @type {?} */ (key)))) {
            state[key] = def.serialize(key, ctx);
        }
    }
}
/**
 * @param {?} def
 * @param {?} state
 * @param {?} ctx
 * @return {?}
 */
function deserialize(def, state, ctx) {
    /** @type {?} */
    const keyPredicate = stateKeyPredicateFactory(def.chunkId, ctx.options);
    for (const key of def.keys) {
        if (key in state) {
            if (!keyPredicate || def.rKeys.indexOf(key) > -1 || keyPredicate((/** @type {?} */ (key)))) {
                def.deserialize(key, state[key], ctx);
            }
        }
    }
}
/**
 * @param {?} mode
 * @param {?=} options
 * @return {?}
 */
function normalizeOptions(mode, options) {
    if (!options) {
        options = (/** @type {?} */ ({}));
    }
    if (!options.persistenceAdapter) {
        options.persistenceAdapter = new PblNgridLocalStoragePersistAdapter();
    }
    if (!options.identResolver) {
        options.identResolver = new PblNgridIdAttributeIdentResolver();
    }
    if (mode === 'load') {
        /** @type {?} */
        const opt = options;
        if (!opt.strategy) {
            opt.strategy = 'overwrite';
        }
    }
    return options;
}
/**
 * @param {?} grid
 * @return {?}
 */
function getExtApi(grid) {
    /** @type {?} */
    const controller = PblNgridPluginController.find(grid);
    if (controller) {
        return controller.extApi;
    }
}
/**
 * @param {?} grid
 * @param {?} options
 * @return {?}
 */
function createChunkSectionContext(grid, options) {
    return { grid, extApi: getExtApi(grid), options };
}
/**
 * @template T
 * @param {?} sectionContext
 * @param {?} chunkConfig
 * @param {?} mode
 * @return {?}
 */
function createChunkContext(sectionContext, chunkConfig, mode) {
    return Object.assign({}, sectionContext, { source: chunkConfig.sourceMatcher(sectionContext), /**
         * @template TChild
         * @param {?} childChunkId
         * @param {?} state
         * @param {?} source
         * @param {?=} data
         * @return {?}
         */
        runChildChunk(childChunkId, state, source, data) {
            /** @type {?} */
            const childContext = Object.assign({}, sectionContext, { source, data });
            /** @type {?} */
            const defs = stateVisor.getDefinitionsForSection(childChunkId);
            /** @type {?} */
            const action = mode === 'serialize' ? serialize : deserialize;
            for (const def of defs) {
                action(def, state, childContext);
            }
        } });
}
/**
 * @param {?} chunkId
 * @param {?} options
 * @param {?=} rootPredicate
 * @return {?}
 */
function stateKeyPredicateFactory(chunkId, options, rootPredicate = false) {
    // TODO: chunkId ans options include/exclude combination does not change
    // we need to cache it... e.g. each column def will create a new predicate if we don't cache.
    /** @type {?} */
    const filter = options.include || options.exclude;
    if (filter) {
        // -1: Exclude, 1: Include
        /** @type {?} */
        const mode = filter === options.include ? 1 : -1;
        /** @type {?} */
        const chunkFilter = filter[chunkId];
        if (typeof chunkFilter === 'boolean') {
            return mode === 1
                ? (/**
                 * @param {?} key
                 * @return {?}
                 */
                (key) => chunkFilter)
                : (/**
                 * @param {?} key
                 * @return {?}
                 */
                (key) => !chunkFilter);
        }
        else if (Array.isArray(chunkFilter)) {
            if (rootPredicate) {
                // root predicate is for RootStateChunks and when set to true
                // the key itself has no impact on the predicate. If the filter is boolean nothing changes
                // but if it's an array, the array is ignored and considered as true ignoring the key because a key does not existing when checking the root
                return (/**
                 * @param {?} k
                 * @return {?}
                 */
                k => true);
            }
            else {
                return mode === 1
                    ? (/**
                     * @param {?} key
                     * @return {?}
                     */
                    (key) => chunkFilter.indexOf(key) > -1)
                    : (/**
                     * @param {?} key
                     * @return {?}
                     */
                    (key) => chunkFilter.indexOf(key) === -1);
            }
        }
        else if (mode === 1) {
            return (/**
             * @param {?} key
             * @return {?}
             */
            (key) => false);
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} grid
 * @param {?=} options
 * @return {?}
 */
function hasState(grid, options) {
    return Promise.resolve()
        .then((/**
     * @return {?}
     */
    () => {
        options = normalizeOptions('save', options);
        /** @type {?} */
        const id = resolveId(grid, options);
        return options.persistenceAdapter.exists(id);
    }));
}
/**
 * @param {?} grid
 * @param {?=} options
 * @return {?}
 */
function saveState(grid, options) {
    return Promise.resolve()
        .then((/**
     * @return {?}
     */
    () => {
        options = normalizeOptions('save', options);
        /** @type {?} */
        const id = resolveId(grid, options);
        /** @type {?} */
        const state = (/** @type {?} */ ({}));
        /** @type {?} */
        const context = createChunkSectionContext(grid, options);
        for (const [chunkId, chunkConfig] of stateVisor.getRootSections()) {
            /** @type {?} */
            const keyPredicate = stateKeyPredicateFactory(chunkId, options, true);
            if (!keyPredicate || keyPredicate(chunkId)) {
                /** @type {?} */
                const sectionState = chunkConfig.stateMatcher(state);
                /** @type {?} */
                const chunkContext = createChunkContext(context, chunkConfig, 'serialize');
                /** @type {?} */
                const defs = stateVisor.getDefinitionsForSection(chunkId);
                for (const def of defs) {
                    serialize(def, sectionState, chunkContext);
                }
            }
        }
        return options.persistenceAdapter.save(id, state);
    }));
}
/**
 * @param {?} grid
 * @param {?=} options
 * @return {?}
 */
function loadState(grid, options) {
    return Promise.resolve()
        .then((/**
     * @return {?}
     */
    () => {
        options = normalizeOptions('load', options);
        /** @type {?} */
        const id = resolveId(grid, options);
        return options.persistenceAdapter.load(id)
            .then((/**
         * @param {?} state
         * @return {?}
         */
        state => {
            /** @type {?} */
            const context = createChunkSectionContext(grid, options);
            for (const [chunkId, chunkConfig] of stateVisor.getRootSections()) {
                /** @type {?} */
                const keyPredicate = stateKeyPredicateFactory(chunkId, options, true);
                if (!keyPredicate || keyPredicate(chunkId)) {
                    /** @type {?} */
                    const sectionState = chunkConfig.stateMatcher(state);
                    /** @type {?} */
                    const chunkContext = createChunkContext(context, chunkConfig, 'deserialize');
                    /** @type {?} */
                    const defs = stateVisor.getDefinitionsForSection(chunkId);
                    for (const def of defs) {
                        deserialize(def, sectionState, chunkContext);
                    }
                }
            }
            return state;
        }));
    }));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function PblNgridSurfaceState() { }
/**
 * @return {?}
 */
function registerGridHandlers() {
    stateVisor.registerRootChunkSection('grid', {
        sourceMatcher: (/**
         * @param {?} ctx
         * @return {?}
         */
        ctx => ctx.grid),
        stateMatcher: (/**
         * @param {?} state
         * @return {?}
         */
        state => state.grid || (state.grid = (/** @type {?} */ ({}))))
    });
    createStateChunkHandler('grid')
        .handleKeys('showHeader', 'showFooter', 'focusMode', 'usePagination', 'hideColumns', 'fallbackMinHeight')
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    (key, ctx) => ctx.source[key]))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    (key, stateValue, ctx) => {
        // We must assert the type starting from 3.5 onwards
        // See "Fixes to unsound writes to indexed access types" in https://devblogs.microsoft.com/typescript/announcing-typescript-3-5
        ctx.source[(/** @type {?} */ (key))] = stateValue;
    }))
        .register();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function registerColumnDefChildHandlers() {
    /* ====================================================================================================================================================== */
    createStateChunkHandler('dataColumn')
        .requiredKeys('id', 'prop')
        .handleKeys('label', 'css', 'type', 'width', 'minWidth', 'maxWidth', // PblNgridBaseColumnState (all optional)
    'headerType', 'footerType', 'sort', 'sortAlias', 'editable', 'pin' // All Optional
    )
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    (key, ctx) => {
        /** @type {?} */
        const c = ctx.data.activeColumn || ctx.data.pblColumn;
        if (c) {
            switch (key) {
                case 'prop':
                    return c.orgProp;
                default:
                    break;
            }
        }
        /** @type {?} */
        const value = c ? c[key] : ctx.source[key];
        switch (key) {
            case 'sort':
                if (typeof value === 'boolean') {
                    return value;
                }
                else {
                    return;
                }
            default:
                break;
        }
        return value;
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    (key, stateValue, ctx) => {
        const { activeColumn } = ctx.data;
        if (activeColumn) {
            switch (key) {
                case 'width':
                    activeColumn.updateWidth(true, (/** @type {?} */ (stateValue)));
                    break;
            }
        }
        if (ctx.source) {
            switch (key) {
                case 'prop':
                    return;
                case 'type':
                case 'headerType':
                case 'footerType':
                    /** @type {?} */
                    const typeValue = ctx.source[key];
                    /** @type {?} */
                    const stateTypeDef = (/** @type {?} */ (stateValue));
                    if (stateTypeDef && typeof stateTypeDef !== 'string' && typeValue && typeof typeValue !== 'string') {
                        typeValue.name = stateTypeDef.name;
                        if (stateTypeDef.data) {
                            typeValue.data = Object.assign(typeValue.data || {}, stateTypeDef.data);
                        }
                        return;
                    }
                    break;
            }
            // We must assert the type starting from 3.5 onwards
            // See "Fixes to unsound writes to indexed access types" in https://devblogs.microsoft.com/typescript/announcing-typescript-3-5
            ctx.source[(/** @type {?} */ (key))] = stateValue;
        }
    }))
        .register();
    /* ====================================================================================================================================================== */
    createStateChunkHandler('dataMetaRow')
        .handleKeys('rowClassName', 'type') // All Optional
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    (key, ctx) => {
        /** @type {?} */
        const active = ctx.data.active || ctx.source;
        if (active) {
            return active[key];
        }
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    (key, stateValue, ctx) => {
        // We must assert the type starting from 3.5 onwards
        // See "Fixes to unsound writes to indexed access types" in https://devblogs.microsoft.com/typescript/announcing-typescript-3-5
        ctx.source[key] = (/** @type {?} */ (stateValue));
    }))
        .register();
    /* ====================================================================================================================================================== */
    createStateChunkHandler('metaRow')
        // Note that we are not handling `cols`, this should be called from the parent, as a different child chunk handling process for each column
        .handleKeys('rowClassName', 'type', // All Optional like dataMetaRow
    'rowIndex')
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    (key, ctx) => {
        return ctx.source[key];
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    (key, stateValue, ctx) => {
    }))
        .register();
    /* ====================================================================================================================================================== */
    createStateChunkHandler('metaGroupRow')
        // Note that we are not handling `cols`, this should be called from the parent, as a different child chunk handling process for each column
        .handleKeys('rowClassName', 'type', // All Optional like dataMetaRow
    'rowIndex')
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    (key, ctx) => {
        return ctx.source[key];
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    (key, stateValue, ctx) => {
    }))
        .register();
    /* ====================================================================================================================================================== */
    createStateChunkHandler('metaColumn')
        .requiredKeys('kind', 'rowIndex')
        .handleKeys('id', 'label', 'css', 'type', 'width', 'minWidth', 'maxWidth')
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    (key, ctx) => {
        return ctx.source[key];
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    (key, stateValue, ctx) => {
    }))
        .register();
    /* ====================================================================================================================================================== */
    createStateChunkHandler('metaGroupColumn')
        .requiredKeys('prop', 'rowIndex', 'span')
        .handleKeys('id', 'label', 'css', 'type', 'width', 'minWidth', 'maxWidth')
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    (key, ctx) => {
        return ctx.source[key];
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    (key, stateValue, ctx) => {
    }))
        .register();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template TCol, TChild
 * @param {?} childChunkId
 * @param {?} ctx
 * @param {?} columns
 * @return {?}
 */
function runChildChunksForRowMetaColumns(childChunkId, ctx, columns) {
    /** @type {?} */
    const stateColumns = [];
    for (const col of columns) {
        /** @type {?} */
        const c = (/** @type {?} */ ({}));
        ctx.runChildChunk(childChunkId, c, col);
        stateColumns.push(c);
    }
    return stateColumns;
}
/**
 * Runs the process for the `header` and `footer` sections in the `table` section (if they exist)
 * @param {?} mode
 * @param {?} state
 * @param {?} ctx
 * @return {?}
 */
function runChildChunkForDataMetaRows(mode, state, ctx) {
    const { columnStore } = ctx.extApi;
    const { table } = ctx.source;
    for (const kind of (/** @type {?} */ (['header', 'footer']))) {
        // This is a mapping of the from->to relationship (i.e serializing or deserializing)
        /** @type {?} */
        const src = mode === 's' ? table : state;
        /** @type {?} */
        const dest = src === table ? state : table;
        // we need to have a source
        if (src[kind]) {
            /** @type {?} */
            const active = kind === 'header' ? columnStore.headerColumnDef : columnStore.footerColumnDef;
            if (!dest[kind]) {
                dest[kind] = {};
            }
            ctx.runChildChunk('dataMetaRow', state[kind], table[kind], { kind, active });
        }
    }
}
/**
 * @param {?} mode
 * @param {?} state
 * @param {?} ctx
 * @return {?}
 */
function runChildChunksForRowDataColumns(mode, state, ctx) {
    const { table } = ctx.source;
    /** @type {?} */
    const src = mode === 's' ? table : state;
    /** @type {?} */
    const resolve = src === state
        ? (/**
         * @param {?} col
         * @return {?}
         */
        col => ({ colState: col, pblColumn: table.cols.find((/**
             * @param {?} tCol
             * @return {?}
             */
            tCol => (utils.isPblColumn(tCol) && tCol.orgProp === col.prop) || (tCol.id === col.id || tCol.prop === col.prop))) }))
        : (/**
         * @param {?} col
         * @return {?}
         */
        col => ({ colState: state.cols[state.cols.push((/** @type {?} */ ({}))) - 1], pblColumn: utils.isPblColumn(col) && col }));
    if (src.cols && src.cols.length > 0) {
        for (const col of src.cols) {
            const { colState, pblColumn } = resolve(col);
            /** @type {?} */
            const data = {
                pblColumn: utils.isPblColumn(pblColumn) && pblColumn,
                activeColumn: ctx.grid.columnApi.findColumn(col.id || col.prop),
            };
            ctx.runChildChunk('dataColumn', colState, pblColumn, data);
        }
    }
}
/**
 * @return {?}
 */
function registerColumnDefHandlers() {
    stateVisor.registerRootChunkSection('columns', {
        sourceMatcher: (/**
         * @param {?} ctx
         * @return {?}
         */
        ctx => ctx.grid.columns),
        stateMatcher: (/**
         * @param {?} state
         * @return {?}
         */
        state => state.columns || (state.columns = {
            table: {
                cols: [],
            },
            header: [],
            footer: [],
            headerGroup: [],
        }))
    });
    createStateChunkHandler('columns')
        .handleKeys('table', 'header', 'headerGroup', 'footer')
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    (key, ctx) => {
        switch (key) {
            case 'table':
                /** @type {?} */
                const state = { cols: [] };
                runChildChunkForDataMetaRows('s', state, ctx);
                runChildChunksForRowDataColumns('s', state, ctx);
                return state;
            case 'header':
            case 'footer':
                /** @type {?} */
                const source = ctx.source[key];
                if (source && source.length > 0) {
                    /** @type {?} */
                    const rows = [];
                    for (const row of source) {
                        /** @type {?} */
                        const active = ctx.extApi.columnStore.metaColumnIds[key].find((/**
                         * @param {?} r
                         * @return {?}
                         */
                        r => !r.isGroup && r.rowDef.rowIndex === row.rowIndex));
                        /** @type {?} */
                        const r = (/** @type {?} */ ({}));
                        ctx.runChildChunk('metaRow', r, row);
                        r.cols = runChildChunksForRowMetaColumns('metaColumn', ctx, row.cols);
                        rows.push(r);
                    }
                    return rows;
                }
                break;
            case 'headerGroup':
                /** @type {?} */
                const headerGroupSource = ctx.source.headerGroup;
                if (headerGroupSource && headerGroupSource.length > 0) {
                    /** @type {?} */
                    const rows = [];
                    for (const row of headerGroupSource) {
                        /** @type {?} */
                        const active = ctx.extApi.columnStore.metaColumnIds.header.find((/**
                         * @param {?} r
                         * @return {?}
                         */
                        r => !r.isGroup && r.rowDef.rowIndex === row.rowIndex));
                        /** @type {?} */
                        const r = (/** @type {?} */ ({}));
                        ctx.runChildChunk('metaGroupRow', r, row);
                        r.cols = runChildChunksForRowMetaColumns('metaColumn', ctx, row.cols);
                        rows.push(r);
                    }
                    return rows;
                }
                break;
        }
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    (key, stateValue, ctx) => {
        switch (key) {
            case 'table':
                /** @type {?} */
                const state = (/** @type {?} */ (stateValue));
                runChildChunkForDataMetaRows('d', state, ctx);
                runChildChunksForRowDataColumns('d', state, ctx);
                break;
            case 'header':
            case 'footer':
                /** @type {?} */
                const source = ctx.source[key];
                /** @type {?} */
                const metaRowsState = (/** @type {?} */ (stateValue));
                if (metaRowsState && metaRowsState.length > 0) {
                    for (const rowState of metaRowsState) {
                        /** @type {?} */
                        const row = source.find((/**
                         * @param {?} r
                         * @return {?}
                         */
                        r => r.rowIndex === rowState.rowIndex));
                        if (row) {
                            /** @type {?} */
                            const active = ctx.extApi.columnStore.metaColumnIds[key].find((/**
                             * @param {?} r
                             * @return {?}
                             */
                            r => !r.isGroup && r.rowDef.rowIndex === rowState.rowIndex));
                            ctx.runChildChunk('metaRow', rowState, row);
                            for (const colState of rowState.cols) {
                                /** @type {?} */
                                const col = row.cols.find((/**
                                 * @param {?} r
                                 * @return {?}
                                 */
                                r => r.id === colState.id));
                                if (col) {
                                    /** @type {?} */
                                    const activeColStore = ctx.extApi.columnStore.find(colState.id);
                                    /** @type {?} */
                                    const activeCol = activeColStore && activeColStore.header;
                                    ctx.runChildChunk('metaColumn', colState, col);
                                }
                            }
                        }
                    }
                }
                break;
            case 'headerGroup':
                break;
        }
    }))
        .register();
    registerColumnDefChildHandlers();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function registerColumnOrderHandlers() {
    stateVisor.registerRootChunkSection('columnOrder', {
        sourceMatcher: (/**
         * @param {?} ctx
         * @return {?}
         */
        ctx => ctx.grid.columnApi),
        stateMatcher: (/**
         * @param {?} state
         * @return {?}
         */
        state => {
            if (!state.columnOrder) {
                state.columnOrder = [];
            }
            return state;
        })
    });
    createStateChunkHandler('columnOrder')
        .handleKeys('columnOrder')
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    (key, ctx) => ctx.source.visibleColumnIds.slice()))
        .deserialize((/**
     * @param {?} key
     * @param {?} columnOrder
     * @param {?} ctx
     * @return {?}
     */
    (key, columnOrder, ctx) => {
        const { extApi, grid } = ctx;
        /** @type {?} */
        let lastMove;
        const { visibleColumnIds } = grid.columnApi;
        if (columnOrder && columnOrder.length === visibleColumnIds.length) {
            for (let i = 0, len = columnOrder.length; i < len; i++) {
                if (columnOrder[i] !== visibleColumnIds[i]) {
                    /** @type {?} */
                    const column = grid.columnApi.findColumn(columnOrder[i]);
                    if (!column) {
                        return;
                    }
                    /** @type {?} */
                    const anchor = grid.columnApi.findColumn(visibleColumnIds[i]);
                    lastMove = [column, anchor];
                    grid.columnApi.moveColumn(column, anchor, true);
                    extApi.columnStore.updateGroups();
                }
            }
        }
        // With this revert/redo of the last move we just trigger a redraw.
        if (lastMove) {
            grid.columnApi.moveColumn(lastMove[1], lastMove[0], true);
            grid.columnApi.moveColumn(lastMove[0], lastMove[1], ((/** @type {?} */ (ctx.options))).avoidRedraw);
        }
    }))
        .register();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function PblNgridBuiltInGlobalState() { }
if (false) {
    /** @type {?} */
    PblNgridBuiltInGlobalState.prototype.grid;
    /** @type {?} */
    PblNgridBuiltInGlobalState.prototype.columns;
    /** @type {?} */
    PblNgridBuiltInGlobalState.prototype.columnOrder;
}
/**
 * @record
 */
function BuiltInRootStateChunks() { }
if (false) {
    /**
     * A state chunk that handles serialization of primitive properties on the grid instance (PblNgridComponent)
     *
     * - key/value chunk.
     * - root chunk.
     * @type {?}
     */
    BuiltInRootStateChunks.prototype.grid;
    /**
     * A state chunk that handles serialization of the entire column definition set.
     *
     * It include a limited set of keys that you can control (include/exclude).
     * Based on the keys processed, additional child chunks are processed, based on the processed key and object it represents.
     *
     * - key/value chunk.
     * - has children chunks
     * - root chunk.
     * @type {?}
     */
    BuiltInRootStateChunks.prototype.columns;
    /**
     * A state chunk that handles serialization of the current column order.
     * This is a keyless chunk, in this case an array, so you can only include / exclude it as a whole.
     *
     * - keyless chunk.
     * - root chunk.
     * @type {?}
     */
    BuiltInRootStateChunks.prototype.columnOrder;
}
/**
 * @record
 */
function BuiltInStateChunks() { }
if (false) {
    /**
     * A state chunk that handles serialization of meta columns (header / footer).
     *
     * This is a child chunk of the `columns` root chunk
     * @type {?}
     */
    BuiltInStateChunks.prototype.metaColumn;
    /**
     * A state chunk that handles serialization of meta group columns (header group).
     *
     * This is a child chunk of the `columns` root chunk
     * @type {?}
     */
    BuiltInStateChunks.prototype.metaGroupColumn;
    /**
     * A state chunk that handles serialization of data columns.
     *
     * This is a child chunk of the `columns` root chunk
     * @type {?}
     */
    BuiltInStateChunks.prototype.dataColumn;
    /**
     * A state chunk that handles serialization of meta rows (A row with header / footer column).
     *
     * This is a child chunk of the `columns` root chunk
     *
     * Note that a `metaRow` does not refer to that main header/footer rows, it only refers to additional meta rows.
     * The `dataMetaRow` section chunk is the one referring to the main header/footer rows
     * @type {?}
     */
    BuiltInStateChunks.prototype.metaRow;
    /**
     * A state chunk that handles serialization of meta group rows (A row with header group columns).
     *
     * This is a child chunk of the `columns` root chunk
     * @type {?}
     */
    BuiltInStateChunks.prototype.metaGroupRow;
    /**
     * A state chunk that handles serialization of data rows (A row with data columns).
     *
     * This is a child chunk of the `columns` root chunk
     * @type {?}
     */
    BuiltInStateChunks.prototype.dataMetaRow;
}
/**
 * @record
 */
function DataColumnBuiltInStateChunkExtraData() { }
if (false) {
    /**
     * The `PblColumn` instance, if found.
     * If no instance is found it means that the source (`PblNgridComponent.columns`) contains `PblNgridColumnDefinitions`.
     *
     * Implementation must fallback to using `ctx.source` if `pblColumn` is not provided.
     * @type {?|undefined}
     */
    DataColumnBuiltInStateChunkExtraData.prototype.pblColumn;
    /**
     * The `PblColumn` instance that is currently in the grid's column store, if found.
     * The currently active column is not `pblColumn`, the store always has a copy of all columns.
     *
     * If provided, it is not a replacement for `pblColumn`, both require updates. Use the `activeColumn` to save/load the data that
     * change during runtime.
     * @type {?|undefined}
     */
    DataColumnBuiltInStateChunkExtraData.prototype.activeColumn;
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
 * Return's the `User Preferences` preset which focuses on saving and restoring state that the user
 * can define and would want to restore between sessions.
 *
 * For example, saving column width's which the user might have changed using the mouse or any other custom way provided to him (through API).
 * Saving the column order, so if the user re-ordered the table the order can be loaded back again...
 * @param {...?} basedOn
 * @return {?}
 */
function userSessionPref(...basedOn) {
    /** @type {?} */
    const resultFilter = {
        grid: [
            'hideColumns',
            'showFooter',
            'showHeader',
        ],
        columnOrder: true,
        columns: ['table'],
        dataColumn: [
            'width',
        ]
    };
    if (basedOn.length > 0) {
        for (const b of basedOn)
            mergeStateChunkKeyFilter(resultFilter, b);
    }
    return resultFilter;
}
/**
 * Merge a head and tail chunk filters so keys from tail will be merged into head if:
 *
 * - The key does not exist in head
 * - The key exist in head but the value of it is an Array and the value of tail is an Array as well.
 *   In such case, both array's are merged into a single unique array.
 * @param {?} mergeHead
 * @param {?} mergeTail
 * @return {?}
 */
function mergeStateChunkKeyFilter(mergeHead, mergeTail) {
    for (const k of Object.keys(mergeTail)) {
        /** @type {?} */
        const tailValue = mergeTail[k];
        if (k in mergeHead) {
            /** @type {?} */
            const tailHead = mergeHead[k];
            if (Array.isArray(tailHead) && Array.isArray(tailValue)) {
                /** @type {?} */
                const s = new Set([...tailHead, ...tailValue]);
                mergeHead[k] = Array.from(s.values());
            }
        }
        else {
            mergeHead[k] = mergeTail[k];
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function registerBuiltInHandlers() {
    registerGridHandlers();
    registerColumnOrderHandlers();
    registerColumnDefHandlers();
}

var PblNgridStatePlugin_1;
/**
 * @record
 */
function InternalStatePluginEvents() { }
if (false) {
    /** @type {?} */
    InternalStatePluginEvents.prototype.phase;
    /** @type {?} */
    InternalStatePluginEvents.prototype.position;
    /** @type {?|undefined} */
    InternalStatePluginEvents.prototype.error;
}
/** @type {?} */
const PLUGIN_KEY = 'state';
let PblNgridStatePlugin = PblNgridStatePlugin_1 = class PblNgridStatePlugin {
    /**
     * @param {?} grid
     * @param {?} injector
     * @param {?} pluginCtrl
     */
    constructor(grid, injector, pluginCtrl) {
        this.grid = grid;
        this.injector = injector;
        this.pluginCtrl = pluginCtrl;
        this._events = new Subject();
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        this.afterLoadState = this._events.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => e.phase === 'load' && e.position === 'after')), mapTo(undefined));
        this.afterSaveState = this._events.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => e.phase === 'save' && e.position === 'after')), mapTo(undefined));
        this.onError = this._events.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => !!e.error)), map((/**
         * @param {?} e
         * @return {?}
         */
        e => ({ phase: e.phase, error: e.error }))));
        pluginCtrl.events
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => e.kind === 'onInvalidateHeaders')), take(1))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            const initialLoadOptions = Object.assign({}, (this.loadOptions || {}), { avoidRedraw: true });
            hasState(grid, initialLoadOptions)
                .then((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                if (value) {
                    return this._load(initialLoadOptions);
                }
            }))
                .then((/**
             * @return {?}
             */
            () => {
                pluginCtrl.events
                    .pipe(filter((/**
                 * @param {?} e
                 * @return {?}
                 */
                e => e.kind === 'onResizeRow')), skip(1), debounceTime(500))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                event => this.save()));
            }));
        }));
        pluginCtrl.events
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.kind === 'onDestroy') {
                event.wait(this.save());
                this._events.complete();
            }
        }));
    }
    /**
     * @param {?} table
     * @param {?} injector
     * @return {?}
     */
    static create(table, injector) {
        /** @type {?} */
        const pluginCtrl = PblNgridPluginController.find(table);
        return new PblNgridStatePlugin_1(table, injector, pluginCtrl);
    }
    /**
     * @return {?}
     */
    load() {
        return this._load(this.loadOptions);
    }
    /**
     * @return {?}
     */
    save() {
        return saveState(this.grid, this.saveOptions)
            .then((/**
         * @return {?}
         */
        () => this._events.next({ phase: 'save', position: 'after' })))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        error => this._events.next({ phase: 'save', position: 'after', error })));
    }
    /**
     * @return {?}
     */
    destroy() {
        this._removePlugin(this.grid);
    }
    /**
     * @private
     * @param {?} loadOptions
     * @return {?}
     */
    _load(loadOptions) {
        return loadState(this.grid, loadOptions)
            .then((/**
         * @return {?}
         */
        () => this._events.next({ phase: 'load', position: 'after' })))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        error => this._events.next({ phase: 'load', position: 'after', error })));
    }
};
PblNgridStatePlugin = PblNgridStatePlugin_1 = __decorate([
    TablePlugin({ id: PLUGIN_KEY, factory: 'create', runOnce: registerBuiltInHandlers }),
    UnRx(),
    __metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
], PblNgridStatePlugin);
if (false) {
    /** @type {?} */
    PblNgridStatePlugin.prototype.loadOptions;
    /** @type {?} */
    PblNgridStatePlugin.prototype.saveOptions;
    /** @type {?} */
    PblNgridStatePlugin.prototype.afterLoadState;
    /** @type {?} */
    PblNgridStatePlugin.prototype.afterSaveState;
    /** @type {?} */
    PblNgridStatePlugin.prototype.onError;
    /**
     * @type {?}
     * @private
     */
    PblNgridStatePlugin.prototype._removePlugin;
    /**
     * @type {?}
     * @private
     */
    PblNgridStatePlugin.prototype._events;
    /** @type {?} */
    PblNgridStatePlugin.prototype.grid;
    /**
     * @type {?}
     * @protected
     */
    PblNgridStatePlugin.prototype.injector;
    /**
     * @type {?}
     * @protected
     */
    PblNgridStatePlugin.prototype.pluginCtrl;
}
let PblNgridStatePluginDirective = class PblNgridStatePluginDirective extends PblNgridStatePlugin {
    /**
     * @param {?} grid
     * @param {?} injector
     * @param {?} pluginCtrl
     */
    constructor(grid, injector, pluginCtrl) {
        super(grid, injector, pluginCtrl);
        this.loadOptions = { include: userSessionPref() };
        this.saveOptions = { include: userSessionPref() };
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy();
    }
};
PblNgridStatePluginDirective.decorators = [
    { type: Directive, args: [{
                selector: 'pbl-ngrid[persistState]',
                // tslint:disable-line:directive-selector
                outputs: ['afterLoadState', 'afterSaveState', 'onError'],
            },] }
];
/** @nocollapse */
PblNgridStatePluginDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: Injector },
    { type: PblNgridPluginController }
];
PblNgridStatePluginDirective.propDecorators = {
    loadOptions: [{ type: Input }],
    saveOptions: [{ type: Input }]
};
PblNgridStatePluginDirective = __decorate([
    UnRx(),
    __metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
], PblNgridStatePluginDirective);
if (false) {
    /** @type {?} */
    PblNgridStatePluginDirective.prototype.loadOptions;
    /** @type {?} */
    PblNgridStatePluginDirective.prototype.saveOptions;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PblNgridStatePluginModule {
    /**
     * @param {?} parentModule
     * @param {?} configService
     */
    constructor(parentModule, configService) {
        if (parentModule) {
            return;
        }
        PblNgridPluginController.created
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            const targetEventsConfig = configService.get(PLUGIN_KEY);
            if (targetEventsConfig && targetEventsConfig.autoEnable === true) {
                /** @type {?} */
                const pluginCtrl = event.controller;
                /** @type {?} */
                let subscription = pluginCtrl.events
                    .subscribe((/**
                 * @param {?} evt
                 * @return {?}
                 */
                evt => {
                    if (evt.kind === 'onInit') {
                        if (!pluginCtrl.hasPlugin(PLUGIN_KEY)) {
                            /** @type {?} */
                            const instance = pluginCtrl.createPlugin(PLUGIN_KEY);
                            if (targetEventsConfig.autoEnableOptions) {
                                instance.loadOptions = targetEventsConfig.autoEnableOptions.loadOptions;
                                instance.saveOptions = targetEventsConfig.autoEnableOptions.saveOptions;
                            }
                        }
                        subscription.unsubscribe();
                        subscription = undefined;
                    }
                }));
            }
        }));
    }
}
PblNgridStatePluginModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    PblNgridModule,
                ],
                declarations: [
                    PblNgridStatePluginDirective,
                ],
                exports: [
                    PblNgridStatePluginDirective,
                ],
                providers: [],
                entryComponents: [],
            },] }
];
/** @nocollapse */
PblNgridStatePluginModule.ctorParameters = () => [
    { type: PblNgridStatePluginModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: PblNgridConfigService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PblNgridLocalStoragePersistAdapter, PblNgridStatePlugin, PblNgridStatePluginModule, StateVisor, createStateChunkHandler, hasState, loadState, registerColumnDefHandlers, registerColumnOrderHandlers, registerGridHandlers, saveState, stateVisor, userSessionPref, _instance as ɵa, PblNgridStateChunkHandlerHost as ɵb, PLUGIN_KEY as ɵc, PblNgridStatePluginDirective as ɵd, registerBuiltInHandlers as ɵe };
//# sourceMappingURL=pebula-ngrid-state.js.map
