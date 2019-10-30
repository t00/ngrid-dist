import { __values, __assign, __read, __spread, __decorate, __metadata, __extends } from 'tslib';
import { PblNgridPluginController, utils, PblNgridComponent, TablePlugin, PblNgridModule, PblNgridConfigService } from '@pebula/ngrid';
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
var _instance;
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
var  /**
 * @template T
 */
StateVisor = /** @class */ (function () {
    function StateVisor() {
        this.rootChunkSections = new Map();
        this.chunkHandlers = new Map();
    }
    /**
     * @return {?}
     */
    StateVisor.get = /**
     * @return {?}
     */
    function () { return _instance || (_instance = new StateVisor()); };
    /**
     * @template Z
     * @param {?} chunkId
     * @param {?} config
     * @return {?}
     */
    StateVisor.prototype.registerRootChunkSection = /**
     * @template Z
     * @param {?} chunkId
     * @param {?} config
     * @return {?}
     */
    function (chunkId, config) {
        if (!this.rootChunkSections.has(chunkId)) {
            this.rootChunkSections.set(chunkId, config);
        }
    };
    /**
     * @template Z
     * @param {?} chunkHandlerDefs
     * @return {?}
     */
    StateVisor.prototype.registerChunkHandlerDefinition = /**
     * @template Z
     * @param {?} chunkHandlerDefs
     * @return {?}
     */
    function (chunkHandlerDefs) {
        var chunkId = chunkHandlerDefs.chunkId;
        /** @type {?} */
        var handlersForGroup = this.chunkHandlers.get(chunkId) || [];
        handlersForGroup.push(chunkHandlerDefs);
        this.chunkHandlers.set(chunkId, handlersForGroup);
    };
    /**
     * @return {?}
     */
    StateVisor.prototype.getRootSections = /**
     * @return {?}
     */
    function () {
        return Array.from(this.rootChunkSections.entries());
    };
    /**
     * @param {?} chunkId
     * @return {?}
     */
    StateVisor.prototype.getDefinitionsForSection = /**
     * @param {?} chunkId
     * @return {?}
     */
    function (chunkId) {
        return this.chunkHandlers.get(chunkId) || [];
    };
    return StateVisor;
}());
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
var stateVisor = StateVisor.get();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PblNgridLocalStoragePersistAdapter = /** @class */ (function () {
    function PblNgridLocalStoragePersistAdapter() {
    }
    /**
     * @param {?} id
     * @param {?} state
     * @return {?}
     */
    PblNgridLocalStoragePersistAdapter.prototype.save = /**
     * @param {?} id
     * @param {?} state
     * @return {?}
     */
    function (id, state) {
        try {
            /** @type {?} */
            var store = this.loadGlobalStateStore();
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
    };
    /**
     * @param {?} id
     * @return {?}
     */
    PblNgridLocalStoragePersistAdapter.prototype.load = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return Promise.resolve(this.loadGlobalStateStore()[id] || (/** @type {?} */ ({})));
    };
    /**
     * @param {?} id
     * @return {?}
     */
    PblNgridLocalStoragePersistAdapter.prototype.exists = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var store = this.loadGlobalStateStore() || {};
        return Promise.resolve(id in store);
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridLocalStoragePersistAdapter.prototype.loadGlobalStateStore = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var raw = localStorage.getItem(PblNgridLocalStoragePersistAdapter.globalStateKey);
        return raw ? JSON.parse(raw) : {};
    };
    /**
     * @private
     * @param {?} store
     * @return {?}
     */
    PblNgridLocalStoragePersistAdapter.prototype.saveGlobalStateStore = /**
     * @private
     * @param {?} store
     * @return {?}
     */
    function (store) {
        localStorage.setItem(PblNgridLocalStoragePersistAdapter.globalStateKey, JSON.stringify(store));
    };
    PblNgridLocalStoragePersistAdapter.globalStateKey = 'pebulaNgridState';
    return PblNgridLocalStoragePersistAdapter;
}());
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
var  /**
 * @template T, Z
 */
PblNgridStateChunkHandlerHost = /** @class */ (function () {
    function PblNgridStateChunkHandlerHost(chunkId) {
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
    PblNgridStateChunkHandlerHost.prototype.handleKeys = /**
     * @template THIS
     * @this {THIS}
     * @param {...?} keys
     * @return {THIS}
     */
    function () {
        var e_1, _a;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var k = keys_1_1.value;
                (/** @type {?} */ (this)).keys.add(k);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return (/** @type {?} */ (this));
    };
    /**
     * Required keys are keys that cannot get excluded.
     * Either by adding the to the `exclude` option or by omitting them from the `include` option.
     */
    /**
     * Required keys are keys that cannot get excluded.
     * Either by adding the to the `exclude` option or by omitting them from the `include` option.
     * @template THIS
     * @this {THIS}
     * @param {...?} keys
     * @return {THIS}
     */
    PblNgridStateChunkHandlerHost.prototype.requiredKeys = /**
     * Required keys are keys that cannot get excluded.
     * Either by adding the to the `exclude` option or by omitting them from the `include` option.
     * @template THIS
     * @this {THIS}
     * @param {...?} keys
     * @return {THIS}
     */
    function () {
        var e_2, _a;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        try {
            for (var keys_2 = __values(keys), keys_2_1 = keys_2.next(); !keys_2_1.done; keys_2_1 = keys_2.next()) {
                var k = keys_2_1.value;
                (/** @type {?} */ (this)).keys.add(k);
                (/** @type {?} */ (this)).rKeys.add(k);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (keys_2_1 && !keys_2_1.done && (_a = keys_2.return)) _a.call(keys_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return (/** @type {?} */ (this));
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} fn
     * @return {THIS}
     */
    PblNgridStateChunkHandlerHost.prototype.serialize = /**
     * @template THIS
     * @this {THIS}
     * @param {?} fn
     * @return {THIS}
     */
    function (fn) {
        (/** @type {?} */ (this)).sFn = fn;
        return (/** @type {?} */ (this));
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} fn
     * @return {THIS}
     */
    PblNgridStateChunkHandlerHost.prototype.deserialize = /**
     * @template THIS
     * @this {THIS}
     * @param {?} fn
     * @return {THIS}
     */
    function (fn) {
        (/** @type {?} */ (this)).dFn = fn;
        return (/** @type {?} */ (this));
    };
    /**
     * @return {?}
     */
    PblNgridStateChunkHandlerHost.prototype.register = /**
     * @return {?}
     */
    function () {
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
    };
    return PblNgridStateChunkHandlerHost;
}());
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
var PblNgridIdAttributeIdentResolver = /** @class */ (function () {
    function PblNgridIdAttributeIdentResolver() {
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    PblNgridIdAttributeIdentResolver.prototype.resolveId = /**
     * @param {?} ctx
     * @return {?}
     */
    function (ctx) {
        return ctx.grid.id;
    };
    return PblNgridIdAttributeIdentResolver;
}());

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
    var id = options.identResolver.resolveId(createChunkSectionContext(grid, options));
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
    var e_1, _a;
    /** @type {?} */
    var keyPredicate = stateKeyPredicateFactory(def.chunkId, ctx.options);
    try {
        for (var _b = __values(def.keys), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (!keyPredicate || def.rKeys.indexOf(key) > -1 || keyPredicate((/** @type {?} */ (key)))) {
                state[key] = def.serialize(key, ctx);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
/**
 * @param {?} def
 * @param {?} state
 * @param {?} ctx
 * @return {?}
 */
function deserialize(def, state, ctx) {
    var e_2, _a;
    /** @type {?} */
    var keyPredicate = stateKeyPredicateFactory(def.chunkId, ctx.options);
    try {
        for (var _b = __values(def.keys), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (key in state) {
                if (!keyPredicate || def.rKeys.indexOf(key) > -1 || keyPredicate((/** @type {?} */ (key)))) {
                    def.deserialize(key, state[key], ctx);
                }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
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
        var opt = options;
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
    var controller = PblNgridPluginController.find(grid);
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
    return { grid: grid, extApi: getExtApi(grid), options: options };
}
/**
 * @template T
 * @param {?} sectionContext
 * @param {?} chunkConfig
 * @param {?} mode
 * @return {?}
 */
function createChunkContext(sectionContext, chunkConfig, mode) {
    return __assign({}, sectionContext, { source: chunkConfig.sourceMatcher(sectionContext), runChildChunk: /**
         * @template TChild
         * @param {?} childChunkId
         * @param {?} state
         * @param {?} source
         * @param {?=} data
         * @return {?}
         */
        function (childChunkId, state, source, data) {
            var e_3, _a;
            /** @type {?} */
            var childContext = __assign({}, sectionContext, { source: source, data: data });
            /** @type {?} */
            var defs = stateVisor.getDefinitionsForSection(childChunkId);
            /** @type {?} */
            var action = mode === 'serialize' ? serialize : deserialize;
            try {
                for (var defs_1 = __values(defs), defs_1_1 = defs_1.next(); !defs_1_1.done; defs_1_1 = defs_1.next()) {
                    var def = defs_1_1.value;
                    action(def, state, childContext);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (defs_1_1 && !defs_1_1.done && (_a = defs_1.return)) _a.call(defs_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        } });
}
/**
 * @param {?} chunkId
 * @param {?} options
 * @param {?=} rootPredicate
 * @return {?}
 */
function stateKeyPredicateFactory(chunkId, options, rootPredicate) {
    if (rootPredicate === void 0) { rootPredicate = false; }
    // TODO: chunkId ans options include/exclude combination does not change
    // we need to cache it... e.g. each column def will create a new predicate if we don't cache.
    /** @type {?} */
    var filter = options.include || options.exclude;
    if (filter) {
        // -1: Exclude, 1: Include
        /** @type {?} */
        var mode = filter === options.include ? 1 : -1;
        /** @type {?} */
        var chunkFilter_1 = filter[chunkId];
        if (typeof chunkFilter_1 === 'boolean') {
            return mode === 1
                ? (/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) { return chunkFilter_1; })
                : (/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) { return !chunkFilter_1; });
        }
        else if (Array.isArray(chunkFilter_1)) {
            if (rootPredicate) {
                // root predicate is for RootStateChunks and when set to true
                // the key itself has no impact on the predicate. If the filter is boolean nothing changes
                // but if it's an array, the array is ignored and considered as true ignoring the key because a key does not existing when checking the root
                return (/**
                 * @param {?} k
                 * @return {?}
                 */
                function (k) { return true; });
            }
            else {
                return mode === 1
                    ? (/**
                     * @param {?} key
                     * @return {?}
                     */
                    function (key) { return chunkFilter_1.indexOf(key) > -1; })
                    : (/**
                     * @param {?} key
                     * @return {?}
                     */
                    function (key) { return chunkFilter_1.indexOf(key) === -1; });
            }
        }
        else if (mode === 1) {
            return (/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return false; });
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
    function () {
        options = normalizeOptions('save', options);
        /** @type {?} */
        var id = resolveId(grid, options);
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
    function () {
        var e_1, _a, e_2, _b;
        options = normalizeOptions('save', options);
        /** @type {?} */
        var id = resolveId(grid, options);
        /** @type {?} */
        var state = (/** @type {?} */ ({}));
        /** @type {?} */
        var context = createChunkSectionContext(grid, options);
        try {
            for (var _c = __values(stateVisor.getRootSections()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), chunkId = _e[0], chunkConfig = _e[1];
                /** @type {?} */
                var keyPredicate = stateKeyPredicateFactory(chunkId, options, true);
                if (!keyPredicate || keyPredicate(chunkId)) {
                    /** @type {?} */
                    var sectionState = chunkConfig.stateMatcher(state);
                    /** @type {?} */
                    var chunkContext = createChunkContext(context, chunkConfig, 'serialize');
                    /** @type {?} */
                    var defs = stateVisor.getDefinitionsForSection(chunkId);
                    try {
                        for (var defs_1 = __values(defs), defs_1_1 = defs_1.next(); !defs_1_1.done; defs_1_1 = defs_1.next()) {
                            var def = defs_1_1.value;
                            serialize(def, sectionState, chunkContext);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (defs_1_1 && !defs_1_1.done && (_b = defs_1.return)) _b.call(defs_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
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
    function () {
        options = normalizeOptions('load', options);
        /** @type {?} */
        var id = resolveId(grid, options);
        return options.persistenceAdapter.load(id)
            .then((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            var e_3, _a, e_4, _b;
            /** @type {?} */
            var context = createChunkSectionContext(grid, options);
            try {
                for (var _c = __values(stateVisor.getRootSections()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = __read(_d.value, 2), chunkId = _e[0], chunkConfig = _e[1];
                    /** @type {?} */
                    var keyPredicate = stateKeyPredicateFactory(chunkId, options, true);
                    if (!keyPredicate || keyPredicate(chunkId)) {
                        /** @type {?} */
                        var sectionState = chunkConfig.stateMatcher(state);
                        /** @type {?} */
                        var chunkContext = createChunkContext(context, chunkConfig, 'deserialize');
                        /** @type {?} */
                        var defs = stateVisor.getDefinitionsForSection(chunkId);
                        try {
                            for (var defs_2 = __values(defs), defs_2_1 = defs_2.next(); !defs_2_1.done; defs_2_1 = defs_2.next()) {
                                var def = defs_2_1.value;
                                deserialize(def, sectionState, chunkContext);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (defs_2_1 && !defs_2_1.done && (_b = defs_2.return)) _b.call(defs_2);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
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
        function (ctx) { return ctx.grid; }),
        stateMatcher: (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.grid || (state.grid = (/** @type {?} */ ({}))); })
    });
    createStateChunkHandler('grid')
        .handleKeys('showHeader', 'showFooter', 'focusMode', 'usePagination', 'hideColumns', 'fallbackMinHeight')
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    function (key, ctx) { return ctx.source[key]; }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    function (key, stateValue, ctx) {
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
    function (key, ctx) {
        /** @type {?} */
        var c = ctx.data.activeColumn || ctx.data.pblColumn;
        if (c) {
            switch (key) {
                case 'prop':
                    return c.orgProp;
                default:
                    break;
            }
        }
        /** @type {?} */
        var value = c ? c[key] : ctx.source[key];
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
    function (key, stateValue, ctx) {
        var activeColumn = ctx.data.activeColumn;
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
                    var typeValue = ctx.source[key];
                    /** @type {?} */
                    var stateTypeDef = (/** @type {?} */ (stateValue));
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
    function (key, ctx) {
        /** @type {?} */
        var active = ctx.data.active || ctx.source;
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
    function (key, stateValue, ctx) {
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
    function (key, ctx) {
        return ctx.source[key];
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    function (key, stateValue, ctx) {
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
    function (key, ctx) {
        return ctx.source[key];
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    function (key, stateValue, ctx) {
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
    function (key, ctx) {
        return ctx.source[key];
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    function (key, stateValue, ctx) {
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
    function (key, ctx) {
        return ctx.source[key];
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    function (key, stateValue, ctx) {
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
    var e_1, _a;
    /** @type {?} */
    var stateColumns = [];
    try {
        for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
            var col = columns_1_1.value;
            /** @type {?} */
            var c = (/** @type {?} */ ({}));
            ctx.runChildChunk(childChunkId, c, col);
            stateColumns.push(c);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
        }
        finally { if (e_1) throw e_1.error; }
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
    var e_2, _a;
    var columnStore = ctx.extApi.columnStore;
    var table = ctx.source.table;
    try {
        for (var _b = __values((/** @type {?} */ (['header', 'footer']))), _c = _b.next(); !_c.done; _c = _b.next()) {
            var kind = _c.value;
            // This is a mapping of the from->to relationship (i.e serializing or deserializing)
            /** @type {?} */
            var src = mode === 's' ? table : state;
            /** @type {?} */
            var dest = src === table ? state : table;
            // we need to have a source
            if (src[kind]) {
                /** @type {?} */
                var active = kind === 'header' ? columnStore.headerColumnDef : columnStore.footerColumnDef;
                if (!dest[kind]) {
                    dest[kind] = {};
                }
                ctx.runChildChunk('dataMetaRow', state[kind], table[kind], { kind: kind, active: active });
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
/**
 * @param {?} mode
 * @param {?} state
 * @param {?} ctx
 * @return {?}
 */
function runChildChunksForRowDataColumns(mode, state, ctx) {
    var e_3, _a;
    var table = ctx.source.table;
    /** @type {?} */
    var src = mode === 's' ? table : state;
    /** @type {?} */
    var resolve = src === state
        ? (/**
         * @param {?} col
         * @return {?}
         */
        function (col) { return ({ colState: col, pblColumn: table.cols.find((/**
             * @param {?} tCol
             * @return {?}
             */
            function (tCol) { return (utils.isPblColumn(tCol) && tCol.orgProp === col.prop) || (tCol.id === col.id || tCol.prop === col.prop); })) }); })
        : (/**
         * @param {?} col
         * @return {?}
         */
        function (col) { return ({ colState: state.cols[state.cols.push((/** @type {?} */ ({}))) - 1], pblColumn: utils.isPblColumn(col) && col }); });
    if (src.cols && src.cols.length > 0) {
        try {
            for (var _b = __values(src.cols), _c = _b.next(); !_c.done; _c = _b.next()) {
                var col = _c.value;
                var _d = resolve(col), colState = _d.colState, pblColumn = _d.pblColumn;
                /** @type {?} */
                var data = {
                    pblColumn: utils.isPblColumn(pblColumn) && pblColumn,
                    activeColumn: ctx.grid.columnApi.findColumn(col.id || col.prop),
                };
                ctx.runChildChunk('dataColumn', colState, pblColumn, data);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
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
        function (ctx) { return ctx.grid.columns; }),
        stateMatcher: (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.columns || (state.columns = {
            table: {
                cols: [],
            },
            header: [],
            footer: [],
            headerGroup: [],
        }); })
    });
    createStateChunkHandler('columns')
        .handleKeys('table', 'header', 'headerGroup', 'footer')
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    function (key, ctx) {
        var e_4, _a, e_5, _b;
        switch (key) {
            case 'table':
                /** @type {?} */
                var state = { cols: [] };
                runChildChunkForDataMetaRows('s', state, ctx);
                runChildChunksForRowDataColumns('s', state, ctx);
                return state;
            case 'header':
            case 'footer':
                /** @type {?} */
                var source = ctx.source[key];
                if (source && source.length > 0) {
                    /** @type {?} */
                    var rows = [];
                    var _loop_1 = function (row) {
                        /** @type {?} */
                        var active = ctx.extApi.columnStore.metaColumnIds[key].find((/**
                         * @param {?} r
                         * @return {?}
                         */
                        function (r) { return !r.isGroup && r.rowDef.rowIndex === row.rowIndex; }));
                        /** @type {?} */
                        var r = (/** @type {?} */ ({}));
                        ctx.runChildChunk('metaRow', r, row);
                        r.cols = runChildChunksForRowMetaColumns('metaColumn', ctx, row.cols);
                        rows.push(r);
                    };
                    try {
                        for (var source_1 = __values(source), source_1_1 = source_1.next(); !source_1_1.done; source_1_1 = source_1.next()) {
                            var row = source_1_1.value;
                            _loop_1(row);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (source_1_1 && !source_1_1.done && (_a = source_1.return)) _a.call(source_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    return rows;
                }
                break;
            case 'headerGroup':
                /** @type {?} */
                var headerGroupSource = ctx.source.headerGroup;
                if (headerGroupSource && headerGroupSource.length > 0) {
                    /** @type {?} */
                    var rows = [];
                    var _loop_2 = function (row) {
                        /** @type {?} */
                        var active = ctx.extApi.columnStore.metaColumnIds.header.find((/**
                         * @param {?} r
                         * @return {?}
                         */
                        function (r) { return !r.isGroup && r.rowDef.rowIndex === row.rowIndex; }));
                        /** @type {?} */
                        var r = (/** @type {?} */ ({}));
                        ctx.runChildChunk('metaGroupRow', r, row);
                        r.cols = runChildChunksForRowMetaColumns('metaColumn', ctx, row.cols);
                        rows.push(r);
                    };
                    try {
                        for (var headerGroupSource_1 = __values(headerGroupSource), headerGroupSource_1_1 = headerGroupSource_1.next(); !headerGroupSource_1_1.done; headerGroupSource_1_1 = headerGroupSource_1.next()) {
                            var row = headerGroupSource_1_1.value;
                            _loop_2(row);
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (headerGroupSource_1_1 && !headerGroupSource_1_1.done && (_b = headerGroupSource_1.return)) _b.call(headerGroupSource_1);
                        }
                        finally { if (e_5) throw e_5.error; }
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
    function (key, stateValue, ctx) {
        var e_6, _a;
        switch (key) {
            case 'table':
                /** @type {?} */
                var state = (/** @type {?} */ (stateValue));
                runChildChunkForDataMetaRows('d', state, ctx);
                runChildChunksForRowDataColumns('d', state, ctx);
                break;
            case 'header':
            case 'footer':
                /** @type {?} */
                var source = ctx.source[key];
                /** @type {?} */
                var metaRowsState = (/** @type {?} */ (stateValue));
                if (metaRowsState && metaRowsState.length > 0) {
                    var _loop_3 = function (rowState) {
                        var e_7, _a;
                        /** @type {?} */
                        var row = source.find((/**
                         * @param {?} r
                         * @return {?}
                         */
                        function (r) { return r.rowIndex === rowState.rowIndex; }));
                        if (row) {
                            /** @type {?} */
                            var active = ctx.extApi.columnStore.metaColumnIds[key].find((/**
                             * @param {?} r
                             * @return {?}
                             */
                            function (r) { return !r.isGroup && r.rowDef.rowIndex === rowState.rowIndex; }));
                            ctx.runChildChunk('metaRow', rowState, row);
                            var _loop_4 = function (colState) {
                                /** @type {?} */
                                var col = row.cols.find((/**
                                 * @param {?} r
                                 * @return {?}
                                 */
                                function (r) { return r.id === colState.id; }));
                                if (col) {
                                    /** @type {?} */
                                    var activeColStore = ctx.extApi.columnStore.find(colState.id);
                                    /** @type {?} */
                                    var activeCol = activeColStore && activeColStore.header;
                                    ctx.runChildChunk('metaColumn', colState, col);
                                }
                            };
                            try {
                                for (var _b = __values(rowState.cols), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var colState = _c.value;
                                    _loop_4(colState);
                                }
                            }
                            catch (e_7_1) { e_7 = { error: e_7_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_7) throw e_7.error; }
                            }
                        }
                    };
                    try {
                        for (var metaRowsState_1 = __values(metaRowsState), metaRowsState_1_1 = metaRowsState_1.next(); !metaRowsState_1_1.done; metaRowsState_1_1 = metaRowsState_1.next()) {
                            var rowState = metaRowsState_1_1.value;
                            _loop_3(rowState);
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (metaRowsState_1_1 && !metaRowsState_1_1.done && (_a = metaRowsState_1.return)) _a.call(metaRowsState_1);
                        }
                        finally { if (e_6) throw e_6.error; }
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
        function (ctx) { return ctx.grid.columnApi; }),
        stateMatcher: (/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
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
    function (key, ctx) { return ctx.source.visibleColumnIds.slice(); }))
        .deserialize((/**
     * @param {?} key
     * @param {?} columnOrder
     * @param {?} ctx
     * @return {?}
     */
    function (key, columnOrder, ctx) {
        var extApi = ctx.extApi, grid = ctx.grid;
        /** @type {?} */
        var lastMove;
        var visibleColumnIds = grid.columnApi.visibleColumnIds;
        if (columnOrder && columnOrder.length === visibleColumnIds.length) {
            for (var i = 0, len = columnOrder.length; i < len; i++) {
                if (columnOrder[i] !== visibleColumnIds[i]) {
                    /** @type {?} */
                    var column = grid.columnApi.findColumn(columnOrder[i]);
                    if (!column) {
                        return;
                    }
                    /** @type {?} */
                    var anchor = grid.columnApi.findColumn(visibleColumnIds[i]);
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
function userSessionPref() {
    var e_1, _a;
    var basedOn = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        basedOn[_i] = arguments[_i];
    }
    /** @type {?} */
    var resultFilter = {
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
        try {
            for (var basedOn_1 = __values(basedOn), basedOn_1_1 = basedOn_1.next(); !basedOn_1_1.done; basedOn_1_1 = basedOn_1.next()) {
                var b = basedOn_1_1.value;
                mergeStateChunkKeyFilter(resultFilter, b);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (basedOn_1_1 && !basedOn_1_1.done && (_a = basedOn_1.return)) _a.call(basedOn_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
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
    var e_2, _a;
    try {
        for (var _b = __values(Object.keys(mergeTail)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var k = _c.value;
            /** @type {?} */
            var tailValue = mergeTail[k];
            if (k in mergeHead) {
                /** @type {?} */
                var tailHead = mergeHead[k];
                if (Array.isArray(tailHead) && Array.isArray(tailValue)) {
                    /** @type {?} */
                    var s = new Set(__spread(tailHead, tailValue));
                    mergeHead[k] = Array.from(s.values());
                }
            }
            else {
                mergeHead[k] = mergeTail[k];
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
var PLUGIN_KEY = 'state';
var PblNgridStatePlugin = /** @class */ (function () {
    function PblNgridStatePlugin(grid, injector, pluginCtrl) {
        var _this = this;
        this.grid = grid;
        this.injector = injector;
        this.pluginCtrl = pluginCtrl;
        this._events = new Subject();
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        this.afterLoadState = this._events.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.phase === 'load' && e.position === 'after'; })), mapTo(undefined));
        this.afterSaveState = this._events.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.phase === 'save' && e.position === 'after'; })), mapTo(undefined));
        this.onError = this._events.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return !!e.error; })), map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return ({ phase: e.phase, error: e.error }); })));
        pluginCtrl.events
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.kind === 'onInvalidateHeaders'; })), take(1))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var initialLoadOptions = __assign({}, (_this.loadOptions || {}), { avoidRedraw: true });
            hasState(grid, initialLoadOptions)
                .then((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value) {
                    return _this._load(initialLoadOptions);
                }
            }))
                .then((/**
             * @return {?}
             */
            function () {
                pluginCtrl.events
                    .pipe(filter((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return e.kind === 'onResizeRow'; })), skip(1), debounceTime(500))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return _this.save(); }));
            }));
        }));
        pluginCtrl.events
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.kind === 'onDestroy') {
                event.wait(_this.save());
                _this._events.complete();
            }
        }));
    }
    PblNgridStatePlugin_1 = PblNgridStatePlugin;
    /**
     * @param {?} table
     * @param {?} injector
     * @return {?}
     */
    PblNgridStatePlugin.create = /**
     * @param {?} table
     * @param {?} injector
     * @return {?}
     */
    function (table, injector) {
        /** @type {?} */
        var pluginCtrl = PblNgridPluginController.find(table);
        return new PblNgridStatePlugin_1(table, injector, pluginCtrl);
    };
    /**
     * @return {?}
     */
    PblNgridStatePlugin.prototype.load = /**
     * @return {?}
     */
    function () {
        return this._load(this.loadOptions);
    };
    /**
     * @return {?}
     */
    PblNgridStatePlugin.prototype.save = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return saveState(this.grid, this.saveOptions)
            .then((/**
         * @return {?}
         */
        function () { return _this._events.next({ phase: 'save', position: 'after' }); }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this._events.next({ phase: 'save', position: 'after', error: error }); }));
    };
    /**
     * @return {?}
     */
    PblNgridStatePlugin.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this._removePlugin(this.grid);
    };
    /**
     * @private
     * @param {?} loadOptions
     * @return {?}
     */
    PblNgridStatePlugin.prototype._load = /**
     * @private
     * @param {?} loadOptions
     * @return {?}
     */
    function (loadOptions) {
        var _this = this;
        return loadState(this.grid, loadOptions)
            .then((/**
         * @return {?}
         */
        function () { return _this._events.next({ phase: 'load', position: 'after' }); }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this._events.next({ phase: 'load', position: 'after', error: error }); }));
    };
    var PblNgridStatePlugin_1;
    PblNgridStatePlugin.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
    PblNgridStatePlugin = PblNgridStatePlugin_1 = __decorate([
        TablePlugin({ id: PLUGIN_KEY, factory: 'create', runOnce: registerBuiltInHandlers }),
        UnRx(),
        __metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
    ], PblNgridStatePlugin);
    return PblNgridStatePlugin;
}());
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
var PblNgridStatePluginDirective = /** @class */ (function (_super) {
    __extends(PblNgridStatePluginDirective, _super);
    function PblNgridStatePluginDirective(grid, injector, pluginCtrl) {
        var _this = _super.call(this, grid, injector, pluginCtrl) || this;
        _this.loadOptions = { include: userSessionPref() };
        _this.saveOptions = { include: userSessionPref() };
        return _this;
    }
    /**
     * @return {?}
     */
    PblNgridStatePluginDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy();
    };
    PblNgridStatePluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
    PblNgridStatePluginDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'pbl-ngrid[persistState]',
                    // tslint:disable-line:directive-selector
                    outputs: ['afterLoadState', 'afterSaveState', 'onError'],
                },] }
    ];
    /** @nocollapse */
    PblNgridStatePluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
    PblNgridStatePluginDirective.propDecorators = {
        loadOptions: [{ type: Input }],
        saveOptions: [{ type: Input }]
    };
    PblNgridStatePluginDirective = __decorate([
        UnRx(),
        __metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
    ], PblNgridStatePluginDirective);
    return PblNgridStatePluginDirective;
}(PblNgridStatePlugin));
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
var PblNgridStatePluginModule = /** @class */ (function () {
    function PblNgridStatePluginModule(parentModule, configService) {
        if (parentModule) {
            return;
        }
        PblNgridPluginController.created
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var targetEventsConfig = configService.get(PLUGIN_KEY);
            if (targetEventsConfig && targetEventsConfig.autoEnable === true) {
                /** @type {?} */
                var pluginCtrl_1 = event.controller;
                /** @type {?} */
                var subscription_1 = pluginCtrl_1.events
                    .subscribe((/**
                 * @param {?} evt
                 * @return {?}
                 */
                function (evt) {
                    if (evt.kind === 'onInit') {
                        if (!pluginCtrl_1.hasPlugin(PLUGIN_KEY)) {
                            /** @type {?} */
                            var instance = pluginCtrl_1.createPlugin(PLUGIN_KEY);
                            if (targetEventsConfig.autoEnableOptions) {
                                instance.loadOptions = targetEventsConfig.autoEnableOptions.loadOptions;
                                instance.saveOptions = targetEventsConfig.autoEnableOptions.saveOptions;
                            }
                        }
                        subscription_1.unsubscribe();
                        subscription_1 = undefined;
                    }
                }));
            }
        }));
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
    PblNgridStatePluginModule.ctorParameters = function () { return [
        { type: PblNgridStatePluginModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: PblNgridConfigService }
    ]; };
    return PblNgridStatePluginModule;
}());

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
