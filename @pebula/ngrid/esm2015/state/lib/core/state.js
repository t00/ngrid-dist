/**
 * @fileoverview added by tsickle
 * Generated from: lib/core/state.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { stateVisor } from './state-visor';
import * as U from './utils';
/**
 * @param {?} grid
 * @param {?=} options
 * @return {?}
 */
export function hasState(grid, options) {
    return Promise.resolve()
        .then((/**
     * @return {?}
     */
    () => {
        options = U.normalizeOptions('save', options);
        /** @type {?} */
        const id = U.resolveId(grid, options);
        return options.persistenceAdapter.exists(id);
    }));
}
/**
 * @param {?} grid
 * @param {?=} options
 * @return {?}
 */
export function saveState(grid, options) {
    return Promise.resolve()
        .then((/**
     * @return {?}
     */
    () => {
        options = U.normalizeOptions('save', options);
        /** @type {?} */
        const id = U.resolveId(grid, options);
        /** @type {?} */
        const state = (/** @type {?} */ ({}));
        /** @type {?} */
        const context = U.createChunkSectionContext(grid, options);
        for (const [chunkId, chunkConfig] of stateVisor.getRootSections()) {
            /** @type {?} */
            const keyPredicate = U.stateKeyPredicateFactory(chunkId, options, true);
            if (!keyPredicate || keyPredicate(chunkId)) {
                /** @type {?} */
                const sectionState = chunkConfig.stateMatcher(state);
                /** @type {?} */
                const chunkContext = U.createChunkContext(context, chunkConfig, 'serialize');
                /** @type {?} */
                const defs = stateVisor.getDefinitionsForSection(chunkId);
                for (const def of defs) {
                    U.serialize(def, sectionState, chunkContext);
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
export function loadState(grid, options) {
    return Promise.resolve()
        .then((/**
     * @return {?}
     */
    () => {
        options = U.normalizeOptions('load', options);
        /** @type {?} */
        const id = U.resolveId(grid, options);
        return options.persistenceAdapter.load(id)
            .then((/**
         * @param {?} state
         * @return {?}
         */
        state => {
            /** @type {?} */
            const context = U.createChunkSectionContext(grid, options);
            for (const [chunkId, chunkConfig] of stateVisor.getRootSections()) {
                /** @type {?} */
                const keyPredicate = U.stateKeyPredicateFactory(chunkId, options, true);
                if (!keyPredicate || keyPredicate(chunkId)) {
                    /** @type {?} */
                    const sectionState = chunkConfig.stateMatcher(state);
                    /** @type {?} */
                    const chunkContext = U.createChunkContext(context, chunkConfig, 'deserialize');
                    /** @type {?} */
                    const defs = stateVisor.getDefinitionsForSection(chunkId);
                    for (const def of defs) {
                        U.deserialize(def, sectionState, chunkContext);
                    }
                }
            }
            return state;
        }));
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDOzs7Ozs7QUFFN0IsTUFBTSxVQUFVLFFBQVEsQ0FBQyxJQUF1QixFQUFFLE9BQThCO0lBQzlFLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRTtTQUNyQixJQUFJOzs7SUFBRSxHQUFHLEVBQUU7UUFDVixPQUFPLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQzs7Y0FDeEMsRUFBRSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztRQUNyQyxPQUFPLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQyxFQUFDLENBQUM7QUFDUCxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLElBQXVCLEVBQUUsT0FBa0M7SUFDbkYsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFO1NBQ3JCLElBQUk7OztJQUFFLEdBQUcsRUFBRTtRQUNWLE9BQU8sR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDOztjQUN4QyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDOztjQUMvQixLQUFLLEdBQXdCLG1CQUFBLEVBQUUsRUFBTzs7Y0FDdEMsT0FBTyxHQUFHLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO1FBRTFELEtBQUssTUFBTSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsSUFBSSxVQUFVLENBQUMsZUFBZSxFQUFFLEVBQUU7O2tCQUMzRCxZQUFZLEdBQUcsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDO1lBRXZFLElBQUksQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFOztzQkFDcEMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDOztzQkFDOUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQzs7c0JBRXRFLElBQUksR0FBRyxVQUFVLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDO2dCQUN6RCxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtvQkFDdEIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO2lCQUM5QzthQUNGO1NBQ0Y7UUFDRCxPQUFPLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BELENBQUMsRUFBQyxDQUFDO0FBQ1AsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxJQUF1QixFQUFFLE9BQWtDO0lBQ25GLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRTtTQUNyQixJQUFJOzs7SUFBRSxHQUFHLEVBQUU7UUFDVixPQUFPLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQzs7Y0FDeEMsRUFBRSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztRQUNyQyxPQUFPLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2FBQ3ZDLElBQUk7Ozs7UUFBRSxLQUFLLENBQUMsRUFBRTs7a0JBQ1AsT0FBTyxHQUFHLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO1lBRTFELEtBQUssTUFBTSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsSUFBSSxVQUFVLENBQUMsZUFBZSxFQUFFLEVBQUU7O3NCQUMzRCxZQUFZLEdBQUcsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDO2dCQUV2RSxJQUFJLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTs7MEJBQ3BDLFlBQVksR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQzs7MEJBQzlDLFlBQVksR0FBRyxDQUFDLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUM7OzBCQUV4RSxJQUFJLEdBQUcsVUFBVSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQztvQkFDekQsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7d0JBQ3RCLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztxQkFDaEQ7aUJBQ0Y7YUFDRjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDLEVBQUMsQ0FBQztBQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRHbG9iYWxTdGF0ZSwgUGJsTmdyaWRTdGF0ZU9wdGlvbnMsIFBibE5ncmlkU3RhdGVTYXZlT3B0aW9ucywgUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zIH0gZnJvbSAnLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgc3RhdGVWaXNvciB9IGZyb20gJy4vc3RhdGUtdmlzb3InO1xuaW1wb3J0ICogYXMgVSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1N0YXRlKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50LCBvcHRpb25zPzogUGJsTmdyaWRTdGF0ZU9wdGlvbnMpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgLnRoZW4oICgpID0+IHtcbiAgICAgIG9wdGlvbnMgPSBVLm5vcm1hbGl6ZU9wdGlvbnMoJ3NhdmUnLCBvcHRpb25zKTtcbiAgICAgIGNvbnN0IGlkID0gVS5yZXNvbHZlSWQoZ3JpZCwgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gb3B0aW9ucy5wZXJzaXN0ZW5jZUFkYXB0ZXIuZXhpc3RzKGlkKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVTdGF0ZShncmlkOiBQYmxOZ3JpZENvbXBvbmVudCwgb3B0aW9ucz86IFBibE5ncmlkU3RhdGVTYXZlT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAudGhlbiggKCkgPT4ge1xuICAgICAgb3B0aW9ucyA9IFUubm9ybWFsaXplT3B0aW9ucygnc2F2ZScsIG9wdGlvbnMpO1xuICAgICAgY29uc3QgaWQgPSBVLnJlc29sdmVJZChncmlkLCBvcHRpb25zKTtcbiAgICAgIGNvbnN0IHN0YXRlOiBQYmxOZ3JpZEdsb2JhbFN0YXRlID0ge30gYXMgYW55O1xuICAgICAgY29uc3QgY29udGV4dCA9IFUuY3JlYXRlQ2h1bmtTZWN0aW9uQ29udGV4dChncmlkLCBvcHRpb25zKTtcblxuICAgICAgZm9yIChjb25zdCBbY2h1bmtJZCwgY2h1bmtDb25maWddIG9mIHN0YXRlVmlzb3IuZ2V0Um9vdFNlY3Rpb25zKCkpIHtcbiAgICAgICAgY29uc3Qga2V5UHJlZGljYXRlID0gVS5zdGF0ZUtleVByZWRpY2F0ZUZhY3RvcnkoY2h1bmtJZCwgb3B0aW9ucywgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKCFrZXlQcmVkaWNhdGUgfHwga2V5UHJlZGljYXRlKGNodW5rSWQpKSB7XG4gICAgICAgICAgY29uc3Qgc2VjdGlvblN0YXRlID0gY2h1bmtDb25maWcuc3RhdGVNYXRjaGVyKHN0YXRlKTtcbiAgICAgICAgICBjb25zdCBjaHVua0NvbnRleHQgPSBVLmNyZWF0ZUNodW5rQ29udGV4dChjb250ZXh0LCBjaHVua0NvbmZpZywgJ3NlcmlhbGl6ZScpO1xuXG4gICAgICAgICAgY29uc3QgZGVmcyA9IHN0YXRlVmlzb3IuZ2V0RGVmaW5pdGlvbnNGb3JTZWN0aW9uKGNodW5rSWQpO1xuICAgICAgICAgIGZvciAoY29uc3QgZGVmIG9mIGRlZnMpIHtcbiAgICAgICAgICAgIFUuc2VyaWFsaXplKGRlZiwgc2VjdGlvblN0YXRlLCBjaHVua0NvbnRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9wdGlvbnMucGVyc2lzdGVuY2VBZGFwdGVyLnNhdmUoaWQsIHN0YXRlKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRTdGF0ZShncmlkOiBQYmxOZ3JpZENvbXBvbmVudCwgb3B0aW9ucz86IFBibE5ncmlkU3RhdGVMb2FkT3B0aW9ucyk6IFByb21pc2U8UGJsTmdyaWRHbG9iYWxTdGF0ZT4ge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAudGhlbiggKCkgPT4ge1xuICAgICAgb3B0aW9ucyA9IFUubm9ybWFsaXplT3B0aW9ucygnbG9hZCcsIG9wdGlvbnMpO1xuICAgICAgY29uc3QgaWQgPSBVLnJlc29sdmVJZChncmlkLCBvcHRpb25zKTtcbiAgICAgIHJldHVybiBvcHRpb25zLnBlcnNpc3RlbmNlQWRhcHRlci5sb2FkKGlkKVxuICAgICAgICAudGhlbiggc3RhdGUgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSBVLmNyZWF0ZUNodW5rU2VjdGlvbkNvbnRleHQoZ3JpZCwgb3B0aW9ucyk7XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IFtjaHVua0lkLCBjaHVua0NvbmZpZ10gb2Ygc3RhdGVWaXNvci5nZXRSb290U2VjdGlvbnMoKSkge1xuICAgICAgICAgICAgY29uc3Qga2V5UHJlZGljYXRlID0gVS5zdGF0ZUtleVByZWRpY2F0ZUZhY3RvcnkoY2h1bmtJZCwgb3B0aW9ucywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmICgha2V5UHJlZGljYXRlIHx8IGtleVByZWRpY2F0ZShjaHVua0lkKSkge1xuICAgICAgICAgICAgICBjb25zdCBzZWN0aW9uU3RhdGUgPSBjaHVua0NvbmZpZy5zdGF0ZU1hdGNoZXIoc3RhdGUpO1xuICAgICAgICAgICAgICBjb25zdCBjaHVua0NvbnRleHQgPSBVLmNyZWF0ZUNodW5rQ29udGV4dChjb250ZXh0LCBjaHVua0NvbmZpZywgJ2Rlc2VyaWFsaXplJyk7XG5cbiAgICAgICAgICAgICAgY29uc3QgZGVmcyA9IHN0YXRlVmlzb3IuZ2V0RGVmaW5pdGlvbnNGb3JTZWN0aW9uKGNodW5rSWQpO1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IGRlZiBvZiBkZWZzKSB7XG4gICAgICAgICAgICAgICAgVS5kZXNlcmlhbGl6ZShkZWYsIHNlY3Rpb25TdGF0ZSwgY2h1bmtDb250ZXh0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4iXX0=