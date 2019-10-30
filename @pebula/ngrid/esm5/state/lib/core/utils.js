/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { PblNgridPluginController } from '@pebula/ngrid';
import { stateVisor } from './state-visor';
import { PblNgridLocalStoragePersistAdapter } from './persistance/local-storage';
import { PblNgridIdAttributeIdentResolver } from './identification/index';
/**
 * @param {?} grid
 * @param {?=} options
 * @return {?}
 */
export function resolveId(grid, options) {
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
export function serialize(def, state, ctx) {
    var e_1, _a;
    /** @type {?} */
    var keyPredicate = stateKeyPredicateFactory(def.chunkId, ctx.options);
    try {
        for (var _b = tslib_1.__values(def.keys), _c = _b.next(); !_c.done; _c = _b.next()) {
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
export function deserialize(def, state, ctx) {
    var e_2, _a;
    /** @type {?} */
    var keyPredicate = stateKeyPredicateFactory(def.chunkId, ctx.options);
    try {
        for (var _b = tslib_1.__values(def.keys), _c = _b.next(); !_c.done; _c = _b.next()) {
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
export function normalizeOptions(mode, options) {
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
export function getExtApi(grid) {
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
export function createChunkSectionContext(grid, options) {
    return { grid: grid, extApi: getExtApi(grid), options: options };
}
/**
 * @template T
 * @param {?} sectionContext
 * @param {?} chunkConfig
 * @param {?} mode
 * @return {?}
 */
export function createChunkContext(sectionContext, chunkConfig, mode) {
    return tslib_1.__assign({}, sectionContext, { source: chunkConfig.sourceMatcher(sectionContext), runChildChunk: /**
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
            var childContext = tslib_1.__assign({}, sectionContext, { source: source, data: data });
            /** @type {?} */
            var defs = stateVisor.getDefinitionsForSection(childChunkId);
            /** @type {?} */
            var action = mode === 'serialize' ? serialize : deserialize;
            try {
                for (var defs_1 = tslib_1.__values(defs), defs_1_1 = defs_1.next(); !defs_1_1.done; defs_1_1 = defs_1.next()) {
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
export function stateKeyPredicateFactory(chunkId, options, rootPredicate) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQXFCLHdCQUF3QixFQUF3QixNQUFNLGVBQWUsQ0FBQztBQVVsRyxPQUFPLEVBQUUsVUFBVSxFQUFtQyxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7O0FBUTFFLE1BQU0sVUFBVSxTQUFTLENBQUMsSUFBdUIsRUFBRSxPQUE4Qjs7UUFDekUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwRixJQUFJLENBQUMsRUFBRSxFQUFFO1FBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO0tBQzNGO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxHQUE2QyxFQUFFLEtBQVUsRUFBRSxHQUFtQzs7O1FBQ2hILFlBQVksR0FBRyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUM7O1FBQ3ZFLEtBQWtCLElBQUEsS0FBQSxpQkFBQSxHQUFHLENBQUMsSUFBSSxDQUFBLGdCQUFBLDRCQUFFO1lBQXZCLElBQU0sR0FBRyxXQUFBO1lBQ1osSUFBSSxDQUFDLFlBQVksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxZQUFZLENBQUMsbUJBQUEsR0FBRyxFQUFVLENBQUMsRUFBRTtnQkFDL0UsS0FBSyxDQUFDLEdBQUcsQ0FB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QUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQS9CLENBQStCLENBQUEsQ0FDbkQ7YUFDRjtTQUNGO2FBQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQ3JCOzs7O1lBQU8sVUFBQyxHQUFXLElBQUssT0FBQSxLQUFLLEVBQUwsQ0FBSyxFQUFBO1NBQzlCO0tBQ0Y7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7XG4gIFJvb3RTdGF0ZUNodW5rcyxcbiAgU3RhdGVDaHVua3MsXG4gIFBibE5ncmlkU3RhdGVDaHVua1NlY3Rpb25Db250ZXh0LFxuICBQYmxOZ3JpZFN0YXRlQ2h1bmtDb250ZXh0LFxuICBQYmxOZ3JpZFN0YXRlT3B0aW9ucyxcbiAgUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zLFxufSBmcm9tICcuL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFN0YXRlQ2h1bmtIYW5kbGVyRGVmaW5pdGlvbiB9IGZyb20gJy4vaGFuZGxpbmcvYmFzZSc7XG5pbXBvcnQgeyBzdGF0ZVZpc29yLCBQYmxOZ3JpZFN0YXRlQ2h1bmtTZWN0aW9uQ29uZmlnIH0gZnJvbSAnLi9zdGF0ZS12aXNvcic7XG5pbXBvcnQgeyBQYmxOZ3JpZExvY2FsU3RvcmFnZVBlcnNpc3RBZGFwdGVyIH0gZnJvbSAnLi9wZXJzaXN0YW5jZS9sb2NhbC1zdG9yYWdlJztcbmltcG9ydCB7IFBibE5ncmlkSWRBdHRyaWJ1dGVJZGVudFJlc29sdmVyIH0gZnJvbSAnLi9pZGVudGlmaWNhdGlvbi9pbmRleCc7XG5cbi8qKlxuICogUGljayBQYXJ0aWFsIE5vIFBhcnRpYWxcbiAqIExpa2UgUGljayBidXQgc29tZSBhcmUgcGFydGlhbCBzb21lIGFyZSBub3QgcGFydGlhbFxuICovXG5leHBvcnQgdHlwZSBQaWNrUE5QPFQsIFAgZXh0ZW5kcyBrZXlvZiBULCBOUCBleHRlbmRzIGtleW9mIFQ+ID0gUGFydGlhbDxQaWNrPFQsIFA+PiAmIFBpY2s8VCwgTlA+XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlSWQoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQsIG9wdGlvbnM/OiBQYmxOZ3JpZFN0YXRlT3B0aW9ucyk6IHN0cmluZyB7XG4gIGNvbnN0IGlkID0gb3B0aW9ucy5pZGVudFJlc29sdmVyLnJlc29sdmVJZChjcmVhdGVDaHVua1NlY3Rpb25Db250ZXh0KGdyaWQsIG9wdGlvbnMpKTtcbiAgaWYgKCFpZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHJlc29sdmUgYSB1bmlxdWUgaWQgZm9yIGFuIG5ncmlkIGluc3RhbmNlLCBzdGF0ZSBpcyBkaXNhYmxlZCcpO1xuICB9XG4gIHJldHVybiBpZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZShkZWY6IFBibE5ncmlkU3RhdGVDaHVua0hhbmRsZXJEZWZpbml0aW9uPGFueT4sIHN0YXRlOiBhbnksIGN0eDogUGJsTmdyaWRTdGF0ZUNodW5rQ29udGV4dDxhbnk+KTogdm9pZCB7XG4gIGNvbnN0IGtleVByZWRpY2F0ZSA9IHN0YXRlS2V5UHJlZGljYXRlRmFjdG9yeShkZWYuY2h1bmtJZCwgY3R4Lm9wdGlvbnMpO1xuICBmb3IgKGNvbnN0IGtleSBvZiBkZWYua2V5cykge1xuICAgIGlmICgha2V5UHJlZGljYXRlIHx8IGRlZi5yS2V5cy5pbmRleE9mKGtleSkgPiAtMSB8fCBrZXlQcmVkaWNhdGUoa2V5IGFzIHN0cmluZykpIHtcbiAgICAgIHN0YXRlW2tleV0gPSBkZWYuc2VyaWFsaXplKGtleSwgY3R4KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc2VyaWFsaXplKGRlZjogUGJsTmdyaWRTdGF0ZUNodW5rSGFuZGxlckRlZmluaXRpb248YW55Piwgc3RhdGU6IGFueSwgY3R4OiBQYmxOZ3JpZFN0YXRlQ2h1bmtDb250ZXh0PGFueT4pOiB2b2lkIHtcbiAgY29uc3Qga2V5UHJlZGljYXRlID0gc3RhdGVLZXlQcmVkaWNhdGVGYWN0b3J5KGRlZi5jaHVua0lkLCBjdHgub3B0aW9ucyk7XG4gIGZvciAoY29uc3Qga2V5IG9mIGRlZi5rZXlzKSB7XG4gICAgaWYgKGtleSBpbiBzdGF0ZSkge1xuICAgICAgaWYgKCFrZXlQcmVkaWNhdGUgfHwgZGVmLnJLZXlzLmluZGV4T2Yoa2V5KSA+IC0xIHx8IGtleVByZWRpY2F0ZShrZXkgYXMgc3RyaW5nKSkge1xuICAgICAgICBkZWYuZGVzZXJpYWxpemUoa2V5LCBzdGF0ZVtrZXldLCBjdHgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplT3B0aW9ucyhtb2RlOiAnc2F2ZScsIG9wdGlvbnM/OiBQYmxOZ3JpZFN0YXRlT3B0aW9ucyk6IFBibE5ncmlkU3RhdGVPcHRpb25zO1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZU9wdGlvbnMobW9kZTogJ2xvYWQnLCBvcHRpb25zPzogUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zKTogUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zO1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZU9wdGlvbnMobW9kZTogJ3NhdmUnIHwgJ2xvYWQnLCBvcHRpb25zPzogUGJsTmdyaWRTdGF0ZU9wdGlvbnMgfCBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnMpOiBQYmxOZ3JpZFN0YXRlT3B0aW9ucyB8IFBibE5ncmlkU3RhdGVMb2FkT3B0aW9ucyB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fSBhcyBhbnk7XG4gIH1cblxuICBpZiAoIW9wdGlvbnMucGVyc2lzdGVuY2VBZGFwdGVyKSB7XG4gICAgb3B0aW9ucy5wZXJzaXN0ZW5jZUFkYXB0ZXIgPSBuZXcgUGJsTmdyaWRMb2NhbFN0b3JhZ2VQZXJzaXN0QWRhcHRlcigpO1xuICB9XG4gIGlmICghb3B0aW9ucy5pZGVudFJlc29sdmVyKSB7XG4gICAgb3B0aW9ucy5pZGVudFJlc29sdmVyID0gbmV3IFBibE5ncmlkSWRBdHRyaWJ1dGVJZGVudFJlc29sdmVyKCk7XG4gIH1cblxuICBpZiAobW9kZSA9PT0gJ2xvYWQnKSB7XG4gICAgY29uc3Qgb3B0OiBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnMgPSBvcHRpb25zO1xuICAgIGlmICghb3B0LnN0cmF0ZWd5KSB7XG4gICAgICBvcHQuc3RyYXRlZ3kgPSAnb3ZlcndyaXRlJ1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvcHRpb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXh0QXBpKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50KTogUGJsTmdyaWRFeHRlbnNpb25BcGkge1xuICBjb25zdCBjb250cm9sbGVyID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQoZ3JpZCk7XG4gIGlmIChjb250cm9sbGVyKSB7XG4gICAgcmV0dXJuIGNvbnRyb2xsZXIuZXh0QXBpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDaHVua1NlY3Rpb25Db250ZXh0KGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogUGJsTmdyaWRTdGF0ZU9wdGlvbnMgfCBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnMpOiBQYmxOZ3JpZFN0YXRlQ2h1bmtTZWN0aW9uQ29udGV4dCB7XG4gIHJldHVybiB7IGdyaWQsIGV4dEFwaTogZ2V0RXh0QXBpKGdyaWQpLCBvcHRpb25zIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDaHVua0NvbnRleHQ8VCBleHRlbmRzIGtleW9mIFJvb3RTdGF0ZUNodW5rcz4oc2VjdGlvbkNvbnRleHQ6IFBibE5ncmlkU3RhdGVDaHVua1NlY3Rpb25Db250ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNodW5rQ29uZmlnOiBQYmxOZ3JpZFN0YXRlQ2h1bmtTZWN0aW9uQ29uZmlnPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6ICdzZXJpYWxpemUnIHwgJ2Rlc2VyaWFsaXplJyk6IFBibE5ncmlkU3RhdGVDaHVua0NvbnRleHQ8VD4ge1xuICByZXR1cm4ge1xuICAgIC4uLnNlY3Rpb25Db250ZXh0LFxuICAgIHNvdXJjZTogY2h1bmtDb25maWcuc291cmNlTWF0Y2hlcihzZWN0aW9uQ29udGV4dCksXG4gICAgcnVuQ2hpbGRDaHVuazxUQ2hpbGQgZXh0ZW5kcyBrZXlvZiBTdGF0ZUNodW5rcz4oY2hpbGRDaHVua0lkOiBUQ2hpbGQsIHN0YXRlOiBTdGF0ZUNodW5rc1tUQ2hpbGRdWydzdGF0ZSddLCBzb3VyY2U6IFN0YXRlQ2h1bmtzW1RDaGlsZF1bJ3ZhbHVlJ10sIGRhdGE/OiBTdGF0ZUNodW5rc1tUQ2hpbGRdWydkYXRhJ10pIHtcbiAgICAgIGNvbnN0IGNoaWxkQ29udGV4dCA9IHsgLi4uc2VjdGlvbkNvbnRleHQsIHNvdXJjZSwgZGF0YSB9O1xuICAgICAgY29uc3QgZGVmcyA9IHN0YXRlVmlzb3IuZ2V0RGVmaW5pdGlvbnNGb3JTZWN0aW9uKGNoaWxkQ2h1bmtJZCk7XG5cbiAgICAgIGNvbnN0IGFjdGlvbiA9IG1vZGUgPT09ICdzZXJpYWxpemUnID8gc2VyaWFsaXplIDogZGVzZXJpYWxpemU7XG4gICAgICBmb3IgKGNvbnN0IGRlZiBvZiBkZWZzKSB7XG4gICAgICAgIGFjdGlvbihkZWYsIHN0YXRlLCBjaGlsZENvbnRleHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhdGVLZXlQcmVkaWNhdGVGYWN0b3J5KGNodW5rSWQ6IGtleW9mIFN0YXRlQ2h1bmtzLCBvcHRpb25zOiBQYmxOZ3JpZFN0YXRlT3B0aW9ucywgcm9vdFByZWRpY2F0ZSA9IGZhbHNlKTogKChrZXk6IHN0cmluZykgPT4gYm9vbGVhbikgfCB1bmRlZmluZWQge1xuICAvLyBUT0RPOiBjaHVua0lkIGFucyBvcHRpb25zIGluY2x1ZGUvZXhjbHVkZSBjb21iaW5hdGlvbiBkb2VzIG5vdCBjaGFuZ2VcbiAgLy8gd2UgbmVlZCB0byBjYWNoZSBpdC4uLiBlLmcuIGVhY2ggY29sdW1uIGRlZiB3aWxsIGNyZWF0ZSBhIG5ldyBwcmVkaWNhdGUgaWYgd2UgZG9uJ3QgY2FjaGUuXG4gIGNvbnN0IGZpbHRlciA9IG9wdGlvbnMuaW5jbHVkZSB8fCBvcHRpb25zLmV4Y2x1ZGU7XG4gIGlmIChmaWx0ZXIpIHtcbiAgICAvLyAtMTogRXhjbHVkZSwgMTogSW5jbHVkZVxuICAgIGNvbnN0IG1vZGU6IC0xIHwgMSA9IGZpbHRlciA9PT0gb3B0aW9ucy5pbmNsdWRlID8gMSA6IC0xO1xuICAgIGNvbnN0IGNodW5rRmlsdGVyOiBib29sZWFuIHwgc3RyaW5nW10gPSBmaWx0ZXJbY2h1bmtJZF07XG4gICAgaWYgKHR5cGVvZiBjaHVua0ZpbHRlciA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICByZXR1cm4gbW9kZSA9PT0gMVxuICAgICAgICA/IChrZXk6IHN0cmluZykgPT4gY2h1bmtGaWx0ZXJcbiAgICAgICAgOiAoa2V5OiBzdHJpbmcpID0+ICFjaHVua0ZpbHRlclxuICAgICAgO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjaHVua0ZpbHRlcikpIHtcbiAgICAgIGlmIChyb290UHJlZGljYXRlKSB7XG4gICAgICAgIC8vIHJvb3QgcHJlZGljYXRlIGlzIGZvciBSb290U3RhdGVDaHVua3MgYW5kIHdoZW4gc2V0IHRvIHRydWVcbiAgICAgICAgLy8gdGhlIGtleSBpdHNlbGYgaGFzIG5vIGltcGFjdCBvbiB0aGUgcHJlZGljYXRlLiBJZiB0aGUgZmlsdGVyIGlzIGJvb2xlYW4gbm90aGluZyBjaGFuZ2VzXG4gICAgICAgIC8vIGJ1dCBpZiBpdCdzIGFuIGFycmF5LCB0aGUgYXJyYXkgaXMgaWdub3JlZCBhbmQgY29uc2lkZXJlZCBhcyB0cnVlIGlnbm9yaW5nIHRoZSBrZXkgYmVjYXVzZSBhIGtleSBkb2VzIG5vdCBleGlzdGluZyB3aGVuIGNoZWNraW5nIHRoZSByb290XG4gICAgICAgIHJldHVybiBrID0+IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbW9kZSA9PT0gMVxuICAgICAgICAgID8gKGtleTogc3RyaW5nKSA9PiBjaHVua0ZpbHRlci5pbmRleE9mKGtleSkgPiAtMVxuICAgICAgICAgIDogKGtleTogc3RyaW5nKSA9PiBjaHVua0ZpbHRlci5pbmRleE9mKGtleSkgPT09IC0xXG4gICAgICAgIDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09IDEpIHtcbiAgICAgIHJldHVybiAoa2V5OiBzdHJpbmcpID0+IGZhbHNlXG4gICAgfVxuICB9XG59XG5cbiJdfQ==