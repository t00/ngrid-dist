/**
 * @fileoverview added by tsickle
 * Generated from: lib/core/utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export function serialize(def, state, ctx) {
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
export function deserialize(def, state, ctx) {
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
export function getExtApi(grid) {
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
export function createChunkSectionContext(grid, options) {
    return { grid, extApi: getExtApi(grid), options };
}
/**
 * @template T
 * @param {?} sectionContext
 * @param {?} chunkConfig
 * @param {?} mode
 * @return {?}
 */
export function createChunkContext(sectionContext, chunkConfig, mode) {
    return Object.assign(Object.assign({}, sectionContext), { source: chunkConfig.sourceMatcher(sectionContext), /**
         * @template TChild
         * @param {?} childChunkId
         * @param {?} state
         * @param {?} source
         * @param {?=} data
         * @return {?}
         */
        runChildChunk(childChunkId, state, source, data) {
            /** @type {?} */
            const childContext = Object.assign(Object.assign({}, sectionContext), { source, data });
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
export function stateKeyPredicateFactory(chunkId, options, rootPredicate = false) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQXFCLHdCQUF3QixFQUF3QixNQUFNLGVBQWUsQ0FBQztBQVVsRyxPQUFPLEVBQUUsVUFBVSxFQUFtQyxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7O0FBUTFFLE1BQU0sVUFBVSxTQUFTLENBQUMsSUFBdUIsRUFBRSxPQUE4Qjs7VUFDekUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwRixJQUFJLENBQUMsRUFBRSxFQUFFO1FBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO0tBQzNGO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxHQUE2QyxFQUFFLEtBQVUsRUFBRSxHQUFtQzs7VUFDaEgsWUFBWSxHQUFHLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUN2RSxLQUFLLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7UUFDMUIsSUFBSSxDQUFDLFlBQVksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxZQUFZLENBQUMsbUJBQUEsR0FBRyxFQUFVLENBQUMsRUFBRTtZQUMvRSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUs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Z3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQge1xuICBSb290U3RhdGVDaHVua3MsXG4gIFN0YXRlQ2h1bmtzLFxuICBQYmxOZ3JpZFN0YXRlQ2h1bmtTZWN0aW9uQ29udGV4dCxcbiAgUGJsTmdyaWRTdGF0ZUNodW5rQ29udGV4dCxcbiAgUGJsTmdyaWRTdGF0ZU9wdGlvbnMsXG4gIFBibE5ncmlkU3RhdGVMb2FkT3B0aW9ucyxcbn0gZnJvbSAnLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgUGJsTmdyaWRTdGF0ZUNodW5rSGFuZGxlckRlZmluaXRpb24gfSBmcm9tICcuL2hhbmRsaW5nL2Jhc2UnO1xuaW1wb3J0IHsgc3RhdGVWaXNvciwgUGJsTmdyaWRTdGF0ZUNodW5rU2VjdGlvbkNvbmZpZyB9IGZyb20gJy4vc3RhdGUtdmlzb3InO1xuaW1wb3J0IHsgUGJsTmdyaWRMb2NhbFN0b3JhZ2VQZXJzaXN0QWRhcHRlciB9IGZyb20gJy4vcGVyc2lzdGFuY2UvbG9jYWwtc3RvcmFnZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZElkQXR0cmlidXRlSWRlbnRSZXNvbHZlciB9IGZyb20gJy4vaWRlbnRpZmljYXRpb24vaW5kZXgnO1xuXG4vKipcbiAqIFBpY2sgUGFydGlhbCBObyBQYXJ0aWFsXG4gKiBMaWtlIFBpY2sgYnV0IHNvbWUgYXJlIHBhcnRpYWwgc29tZSBhcmUgbm90IHBhcnRpYWxcbiAqL1xuZXhwb3J0IHR5cGUgUGlja1BOUDxULCBQIGV4dGVuZHMga2V5b2YgVCwgTlAgZXh0ZW5kcyBrZXlvZiBUPiA9IFBhcnRpYWw8UGljazxULCBQPj4gJiBQaWNrPFQsIE5QPlxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUlkKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50LCBvcHRpb25zPzogUGJsTmdyaWRTdGF0ZU9wdGlvbnMpOiBzdHJpbmcge1xuICBjb25zdCBpZCA9IG9wdGlvbnMuaWRlbnRSZXNvbHZlci5yZXNvbHZlSWQoY3JlYXRlQ2h1bmtTZWN0aW9uQ29udGV4dChncmlkLCBvcHRpb25zKSk7XG4gIGlmICghaWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCByZXNvbHZlIGEgdW5pcXVlIGlkIGZvciBhbiBuZ3JpZCBpbnN0YW5jZSwgc3RhdGUgaXMgZGlzYWJsZWQnKTtcbiAgfVxuICByZXR1cm4gaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemUoZGVmOiBQYmxOZ3JpZFN0YXRlQ2h1bmtIYW5kbGVyRGVmaW5pdGlvbjxhbnk+LCBzdGF0ZTogYW55LCBjdHg6IFBibE5ncmlkU3RhdGVDaHVua0NvbnRleHQ8YW55Pik6IHZvaWQge1xuICBjb25zdCBrZXlQcmVkaWNhdGUgPSBzdGF0ZUtleVByZWRpY2F0ZUZhY3RvcnkoZGVmLmNodW5rSWQsIGN0eC5vcHRpb25zKTtcbiAgZm9yIChjb25zdCBrZXkgb2YgZGVmLmtleXMpIHtcbiAgICBpZiAoIWtleVByZWRpY2F0ZSB8fCBkZWYucktleXMuaW5kZXhPZihrZXkpID4gLTEgfHwga2V5UHJlZGljYXRlKGtleSBhcyBzdHJpbmcpKSB7XG4gICAgICBzdGF0ZVtrZXldID0gZGVmLnNlcmlhbGl6ZShrZXksIGN0eCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXNlcmlhbGl6ZShkZWY6IFBibE5ncmlkU3RhdGVDaHVua0hhbmRsZXJEZWZpbml0aW9uPGFueT4sIHN0YXRlOiBhbnksIGN0eDogUGJsTmdyaWRTdGF0ZUNodW5rQ29udGV4dDxhbnk+KTogdm9pZCB7XG4gIGNvbnN0IGtleVByZWRpY2F0ZSA9IHN0YXRlS2V5UHJlZGljYXRlRmFjdG9yeShkZWYuY2h1bmtJZCwgY3R4Lm9wdGlvbnMpO1xuICBmb3IgKGNvbnN0IGtleSBvZiBkZWYua2V5cykge1xuICAgIGlmIChrZXkgaW4gc3RhdGUpIHtcbiAgICAgIGlmICgha2V5UHJlZGljYXRlIHx8IGRlZi5yS2V5cy5pbmRleE9mKGtleSkgPiAtMSB8fCBrZXlQcmVkaWNhdGUoa2V5IGFzIHN0cmluZykpIHtcbiAgICAgICAgZGVmLmRlc2VyaWFsaXplKGtleSwgc3RhdGVba2V5XSwgY3R4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZU9wdGlvbnMobW9kZTogJ3NhdmUnLCBvcHRpb25zPzogUGJsTmdyaWRTdGF0ZU9wdGlvbnMpOiBQYmxOZ3JpZFN0YXRlT3B0aW9ucztcbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVPcHRpb25zKG1vZGU6ICdsb2FkJywgb3B0aW9ucz86IFBibE5ncmlkU3RhdGVMb2FkT3B0aW9ucyk6IFBibE5ncmlkU3RhdGVMb2FkT3B0aW9ucztcbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVPcHRpb25zKG1vZGU6ICdzYXZlJyB8ICdsb2FkJywgb3B0aW9ucz86IFBibE5ncmlkU3RhdGVPcHRpb25zIHwgUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zKTogUGJsTmdyaWRTdGF0ZU9wdGlvbnMgfCBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnMge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge30gYXMgYW55O1xuICB9XG5cbiAgaWYgKCFvcHRpb25zLnBlcnNpc3RlbmNlQWRhcHRlcikge1xuICAgIG9wdGlvbnMucGVyc2lzdGVuY2VBZGFwdGVyID0gbmV3IFBibE5ncmlkTG9jYWxTdG9yYWdlUGVyc2lzdEFkYXB0ZXIoKTtcbiAgfVxuICBpZiAoIW9wdGlvbnMuaWRlbnRSZXNvbHZlcikge1xuICAgIG9wdGlvbnMuaWRlbnRSZXNvbHZlciA9IG5ldyBQYmxOZ3JpZElkQXR0cmlidXRlSWRlbnRSZXNvbHZlcigpO1xuICB9XG5cbiAgaWYgKG1vZGUgPT09ICdsb2FkJykge1xuICAgIGNvbnN0IG9wdDogUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zID0gb3B0aW9ucztcbiAgICBpZiAoIW9wdC5zdHJhdGVneSkge1xuICAgICAgb3B0LnN0cmF0ZWd5ID0gJ292ZXJ3cml0ZSdcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3B0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEV4dEFwaShncmlkOiBQYmxOZ3JpZENvbXBvbmVudCk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpIHtcbiAgY29uc3QgY29udHJvbGxlciA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKGdyaWQpO1xuICBpZiAoY29udHJvbGxlcikge1xuICAgIHJldHVybiBjb250cm9sbGVyLmV4dEFwaTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2h1bmtTZWN0aW9uQ29udGV4dChncmlkOiBQYmxOZ3JpZENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFBibE5ncmlkU3RhdGVPcHRpb25zIHwgUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zKTogUGJsTmdyaWRTdGF0ZUNodW5rU2VjdGlvbkNvbnRleHQge1xuICByZXR1cm4geyBncmlkLCBleHRBcGk6IGdldEV4dEFwaShncmlkKSwgb3B0aW9ucyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2h1bmtDb250ZXh0PFQgZXh0ZW5kcyBrZXlvZiBSb290U3RhdGVDaHVua3M+KHNlY3Rpb25Db250ZXh0OiBQYmxOZ3JpZFN0YXRlQ2h1bmtTZWN0aW9uQ29udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHVua0NvbmZpZzogUGJsTmdyaWRTdGF0ZUNodW5rU2VjdGlvbkNvbmZpZzxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiAnc2VyaWFsaXplJyB8ICdkZXNlcmlhbGl6ZScpOiBQYmxOZ3JpZFN0YXRlQ2h1bmtDb250ZXh0PFQ+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5zZWN0aW9uQ29udGV4dCxcbiAgICBzb3VyY2U6IGNodW5rQ29uZmlnLnNvdXJjZU1hdGNoZXIoc2VjdGlvbkNvbnRleHQpLFxuICAgIHJ1bkNoaWxkQ2h1bms8VENoaWxkIGV4dGVuZHMga2V5b2YgU3RhdGVDaHVua3M+KGNoaWxkQ2h1bmtJZDogVENoaWxkLCBzdGF0ZTogU3RhdGVDaHVua3NbVENoaWxkXVsnc3RhdGUnXSwgc291cmNlOiBTdGF0ZUNodW5rc1tUQ2hpbGRdWyd2YWx1ZSddLCBkYXRhPzogU3RhdGVDaHVua3NbVENoaWxkXVsnZGF0YSddKSB7XG4gICAgICBjb25zdCBjaGlsZENvbnRleHQgPSB7IC4uLnNlY3Rpb25Db250ZXh0LCBzb3VyY2UsIGRhdGEgfTtcbiAgICAgIGNvbnN0IGRlZnMgPSBzdGF0ZVZpc29yLmdldERlZmluaXRpb25zRm9yU2VjdGlvbihjaGlsZENodW5rSWQpO1xuXG4gICAgICBjb25zdCBhY3Rpb24gPSBtb2RlID09PSAnc2VyaWFsaXplJyA/IHNlcmlhbGl6ZSA6IGRlc2VyaWFsaXplO1xuICAgICAgZm9yIChjb25zdCBkZWYgb2YgZGVmcykge1xuICAgICAgICBhY3Rpb24oZGVmLCBzdGF0ZSwgY2hpbGRDb250ZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXRlS2V5UHJlZGljYXRlRmFjdG9yeShjaHVua0lkOiBrZXlvZiBTdGF0ZUNodW5rcywgb3B0aW9uczogUGJsTmdyaWRTdGF0ZU9wdGlvbnMsIHJvb3RQcmVkaWNhdGUgPSBmYWxzZSk6ICgoa2V5OiBzdHJpbmcpID0+IGJvb2xlYW4pIHwgdW5kZWZpbmVkIHtcbiAgLy8gVE9ETzogY2h1bmtJZCBhbnMgb3B0aW9ucyBpbmNsdWRlL2V4Y2x1ZGUgY29tYmluYXRpb24gZG9lcyBub3QgY2hhbmdlXG4gIC8vIHdlIG5lZWQgdG8gY2FjaGUgaXQuLi4gZS5nLiBlYWNoIGNvbHVtbiBkZWYgd2lsbCBjcmVhdGUgYSBuZXcgcHJlZGljYXRlIGlmIHdlIGRvbid0IGNhY2hlLlxuICBjb25zdCBmaWx0ZXIgPSBvcHRpb25zLmluY2x1ZGUgfHwgb3B0aW9ucy5leGNsdWRlO1xuICBpZiAoZmlsdGVyKSB7XG4gICAgLy8gLTE6IEV4Y2x1ZGUsIDE6IEluY2x1ZGVcbiAgICBjb25zdCBtb2RlOiAtMSB8IDEgPSBmaWx0ZXIgPT09IG9wdGlvbnMuaW5jbHVkZSA/IDEgOiAtMTtcbiAgICBjb25zdCBjaHVua0ZpbHRlcjogYm9vbGVhbiB8IHN0cmluZ1tdID0gZmlsdGVyW2NodW5rSWRdO1xuICAgIGlmICh0eXBlb2YgY2h1bmtGaWx0ZXIgPT09ICdib29sZWFuJykge1xuICAgICAgcmV0dXJuIG1vZGUgPT09IDFcbiAgICAgICAgPyAoa2V5OiBzdHJpbmcpID0+IGNodW5rRmlsdGVyXG4gICAgICAgIDogKGtleTogc3RyaW5nKSA9PiAhY2h1bmtGaWx0ZXJcbiAgICAgIDtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY2h1bmtGaWx0ZXIpKSB7XG4gICAgICBpZiAocm9vdFByZWRpY2F0ZSkge1xuICAgICAgICAvLyByb290IHByZWRpY2F0ZSBpcyBmb3IgUm9vdFN0YXRlQ2h1bmtzIGFuZCB3aGVuIHNldCB0byB0cnVlXG4gICAgICAgIC8vIHRoZSBrZXkgaXRzZWxmIGhhcyBubyBpbXBhY3Qgb24gdGhlIHByZWRpY2F0ZS4gSWYgdGhlIGZpbHRlciBpcyBib29sZWFuIG5vdGhpbmcgY2hhbmdlc1xuICAgICAgICAvLyBidXQgaWYgaXQncyBhbiBhcnJheSwgdGhlIGFycmF5IGlzIGlnbm9yZWQgYW5kIGNvbnNpZGVyZWQgYXMgdHJ1ZSBpZ25vcmluZyB0aGUga2V5IGJlY2F1c2UgYSBrZXkgZG9lcyBub3QgZXhpc3Rpbmcgd2hlbiBjaGVja2luZyB0aGUgcm9vdFxuICAgICAgICByZXR1cm4gayA9PiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1vZGUgPT09IDFcbiAgICAgICAgICA/IChrZXk6IHN0cmluZykgPT4gY2h1bmtGaWx0ZXIuaW5kZXhPZihrZXkpID4gLTFcbiAgICAgICAgICA6IChrZXk6IHN0cmluZykgPT4gY2h1bmtGaWx0ZXIuaW5kZXhPZihrZXkpID09PSAtMVxuICAgICAgICA7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtb2RlID09PSAxKSB7XG4gICAgICByZXR1cm4gKGtleTogc3RyaW5nKSA9PiBmYWxzZVxuICAgIH1cbiAgfVxufVxuXG4iXX0=