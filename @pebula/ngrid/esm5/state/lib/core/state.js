/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
    function () {
        options = U.normalizeOptions('save', options);
        /** @type {?} */
        var id = U.resolveId(grid, options);
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
    function () {
        var e_1, _a, e_2, _b;
        options = U.normalizeOptions('save', options);
        /** @type {?} */
        var id = U.resolveId(grid, options);
        /** @type {?} */
        var state = (/** @type {?} */ ({}));
        /** @type {?} */
        var context = U.createChunkSectionContext(grid, options);
        try {
            for (var _c = tslib_1.__values(stateVisor.getRootSections()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = tslib_1.__read(_d.value, 2), chunkId = _e[0], chunkConfig = _e[1];
                /** @type {?} */
                var keyPredicate = U.stateKeyPredicateFactory(chunkId, options, true);
                if (!keyPredicate || keyPredicate(chunkId)) {
                    /** @type {?} */
                    var sectionState = chunkConfig.stateMatcher(state);
                    /** @type {?} */
                    var chunkContext = U.createChunkContext(context, chunkConfig, 'serialize');
                    /** @type {?} */
                    var defs = stateVisor.getDefinitionsForSection(chunkId);
                    try {
                        for (var defs_1 = tslib_1.__values(defs), defs_1_1 = defs_1.next(); !defs_1_1.done; defs_1_1 = defs_1.next()) {
                            var def = defs_1_1.value;
                            U.serialize(def, sectionState, chunkContext);
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
export function loadState(grid, options) {
    return Promise.resolve()
        .then((/**
     * @return {?}
     */
    function () {
        options = U.normalizeOptions('load', options);
        /** @type {?} */
        var id = U.resolveId(grid, options);
        return options.persistenceAdapter.load(id)
            .then((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            var e_3, _a, e_4, _b;
            /** @type {?} */
            var context = U.createChunkSectionContext(grid, options);
            try {
                for (var _c = tslib_1.__values(stateVisor.getRootSections()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = tslib_1.__read(_d.value, 2), chunkId = _e[0], chunkConfig = _e[1];
                    /** @type {?} */
                    var keyPredicate = U.stateKeyPredicateFactory(chunkId, options, true);
                    if (!keyPredicate || keyPredicate(chunkId)) {
                        /** @type {?} */
                        var sectionState = chunkConfig.stateMatcher(state);
                        /** @type {?} */
                        var chunkContext = U.createChunkContext(context, chunkConfig, 'deserialize');
                        /** @type {?} */
                        var defs = stateVisor.getDefinitionsForSection(chunkId);
                        try {
                            for (var defs_2 = tslib_1.__values(defs), defs_2_1 = defs_2.next(); !defs_2_1.done; defs_2_1 = defs_2.next()) {
                                var def = defs_2_1.value;
                                U.deserialize(def, sectionState, chunkContext);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDOzs7Ozs7QUFFN0IsTUFBTSxVQUFVLFFBQVEsQ0FBQyxJQUF1QixFQUFFLE9BQThCO0lBQzlFLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRTtTQUNyQixJQUFJOzs7SUFBRTtRQUNMLE9BQU8sR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDOztZQUN4QyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO1FBQ3JDLE9BQU8sT0FBTyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDLEVBQUMsQ0FBQztBQUNQLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsSUFBdUIsRUFBRSxPQUFrQztJQUNuRixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUU7U0FDckIsSUFBSTs7O0lBQUU7O1FBQ0wsT0FBTyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7O1lBQ3hDLEVBQUUsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUM7O1lBQy9CLEtBQUssR0FBd0IsbUJBQUEsRUFBRSxFQUFPOztZQUN0QyxPQUFPLEdBQUcsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLElBQUksRUFBRSxPQUFPLENBQUM7O1lBRTFELEtBQXFDLElBQUEsS0FBQSxpQkFBQSxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQXhELElBQUEsZ0NBQXNCLEVBQXJCLGVBQU8sRUFBRSxtQkFBVzs7b0JBQ3hCLFlBQVksR0FBRyxDQUFDLENBQUMsd0JBQXdCLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUM7Z0JBRXZFLElBQUksQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFOzt3QkFDcEMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDOzt3QkFDOUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQzs7d0JBRXRFLElBQUksR0FBRyxVQUFVLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDOzt3QkFDekQsS0FBa0IsSUFBQSxTQUFBLGlCQUFBLElBQUksQ0FBQSwwQkFBQSw0Q0FBRTs0QkFBbkIsSUFBTSxHQUFHLGlCQUFBOzRCQUNaLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQzt5QkFDOUM7Ozs7Ozs7OztpQkFDRjthQUNGOzs7Ozs7Ozs7UUFDRCxPQUFPLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BELENBQUMsRUFBQyxDQUFDO0FBQ1AsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxJQUF1QixFQUFFLE9BQWtDO0lBQ25GLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRTtTQUNyQixJQUFJOzs7SUFBRTtRQUNMLE9BQU8sR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDOztZQUN4QyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO1FBQ3JDLE9BQU8sT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDdkMsSUFBSTs7OztRQUFFLFVBQUEsS0FBSzs7O2dCQUNKLE9BQU8sR0FBRyxDQUFDLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQzs7Z0JBRTFELEtBQXFDLElBQUEsS0FBQSxpQkFBQSxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUEsZ0JBQUEsNEJBQUU7b0JBQXhELElBQUEsZ0NBQXNCLEVBQXJCLGVBQU8sRUFBRSxtQkFBVzs7d0JBQ3hCLFlBQVksR0FBRyxDQUFDLENBQUMsd0JBQXdCLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUM7b0JBRXZFLElBQUksQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFOzs0QkFDcEMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDOzs0QkFDOUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQzs7NEJBRXhFLElBQUksR0FBRyxVQUFVLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDOzs0QkFDekQsS0FBa0IsSUFBQSxTQUFBLGlCQUFBLElBQUksQ0FBQSwwQkFBQSw0Q0FBRTtnQ0FBbkIsSUFBTSxHQUFHLGlCQUFBO2dDQUNaLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQzs2QkFDaEQ7Ozs7Ozs7OztxQkFDRjtpQkFDRjs7Ozs7Ozs7O1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUMsRUFBQyxDQUFDO0FBQ1AsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZEdsb2JhbFN0YXRlLCBQYmxOZ3JpZFN0YXRlT3B0aW9ucywgUGJsTmdyaWRTdGF0ZVNhdmVPcHRpb25zLCBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnMgfSBmcm9tICcuL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBzdGF0ZVZpc29yIH0gZnJvbSAnLi9zdGF0ZS12aXNvcic7XG5pbXBvcnQgKiBhcyBVIGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaGFzU3RhdGUoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQsIG9wdGlvbnM/OiBQYmxOZ3JpZFN0YXRlT3B0aW9ucyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAudGhlbiggKCkgPT4ge1xuICAgICAgb3B0aW9ucyA9IFUubm9ybWFsaXplT3B0aW9ucygnc2F2ZScsIG9wdGlvbnMpO1xuICAgICAgY29uc3QgaWQgPSBVLnJlc29sdmVJZChncmlkLCBvcHRpb25zKTtcbiAgICAgIHJldHVybiBvcHRpb25zLnBlcnNpc3RlbmNlQWRhcHRlci5leGlzdHMoaWQpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVN0YXRlKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50LCBvcHRpb25zPzogUGJsTmdyaWRTdGF0ZVNhdmVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICBvcHRpb25zID0gVS5ub3JtYWxpemVPcHRpb25zKCdzYXZlJywgb3B0aW9ucyk7XG4gICAgICBjb25zdCBpZCA9IFUucmVzb2x2ZUlkKGdyaWQsIG9wdGlvbnMpO1xuICAgICAgY29uc3Qgc3RhdGU6IFBibE5ncmlkR2xvYmFsU3RhdGUgPSB7fSBhcyBhbnk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gVS5jcmVhdGVDaHVua1NlY3Rpb25Db250ZXh0KGdyaWQsIG9wdGlvbnMpO1xuXG4gICAgICBmb3IgKGNvbnN0IFtjaHVua0lkLCBjaHVua0NvbmZpZ10gb2Ygc3RhdGVWaXNvci5nZXRSb290U2VjdGlvbnMoKSkge1xuICAgICAgICBjb25zdCBrZXlQcmVkaWNhdGUgPSBVLnN0YXRlS2V5UHJlZGljYXRlRmFjdG9yeShjaHVua0lkLCBvcHRpb25zLCB0cnVlKTtcblxuICAgICAgICBpZiAoIWtleVByZWRpY2F0ZSB8fCBrZXlQcmVkaWNhdGUoY2h1bmtJZCkpIHtcbiAgICAgICAgICBjb25zdCBzZWN0aW9uU3RhdGUgPSBjaHVua0NvbmZpZy5zdGF0ZU1hdGNoZXIoc3RhdGUpO1xuICAgICAgICAgIGNvbnN0IGNodW5rQ29udGV4dCA9IFUuY3JlYXRlQ2h1bmtDb250ZXh0KGNvbnRleHQsIGNodW5rQ29uZmlnLCAnc2VyaWFsaXplJyk7XG5cbiAgICAgICAgICBjb25zdCBkZWZzID0gc3RhdGVWaXNvci5nZXREZWZpbml0aW9uc0ZvclNlY3Rpb24oY2h1bmtJZCk7XG4gICAgICAgICAgZm9yIChjb25zdCBkZWYgb2YgZGVmcykge1xuICAgICAgICAgICAgVS5zZXJpYWxpemUoZGVmLCBzZWN0aW9uU3RhdGUsIGNodW5rQ29udGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gb3B0aW9ucy5wZXJzaXN0ZW5jZUFkYXB0ZXIuc2F2ZShpZCwgc3RhdGUpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFN0YXRlKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50LCBvcHRpb25zPzogUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zKTogUHJvbWlzZTxQYmxOZ3JpZEdsb2JhbFN0YXRlPiB7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICBvcHRpb25zID0gVS5ub3JtYWxpemVPcHRpb25zKCdsb2FkJywgb3B0aW9ucyk7XG4gICAgICBjb25zdCBpZCA9IFUucmVzb2x2ZUlkKGdyaWQsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIG9wdGlvbnMucGVyc2lzdGVuY2VBZGFwdGVyLmxvYWQoaWQpXG4gICAgICAgIC50aGVuKCBzdGF0ZSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udGV4dCA9IFUuY3JlYXRlQ2h1bmtTZWN0aW9uQ29udGV4dChncmlkLCBvcHRpb25zKTtcblxuICAgICAgICAgIGZvciAoY29uc3QgW2NodW5rSWQsIGNodW5rQ29uZmlnXSBvZiBzdGF0ZVZpc29yLmdldFJvb3RTZWN0aW9ucygpKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlQcmVkaWNhdGUgPSBVLnN0YXRlS2V5UHJlZGljYXRlRmFjdG9yeShjaHVua0lkLCBvcHRpb25zLCB0cnVlKTtcblxuICAgICAgICAgICAgaWYgKCFrZXlQcmVkaWNhdGUgfHwga2V5UHJlZGljYXRlKGNodW5rSWQpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25TdGF0ZSA9IGNodW5rQ29uZmlnLnN0YXRlTWF0Y2hlcihzdGF0ZSk7XG4gICAgICAgICAgICAgIGNvbnN0IGNodW5rQ29udGV4dCA9IFUuY3JlYXRlQ2h1bmtDb250ZXh0KGNvbnRleHQsIGNodW5rQ29uZmlnLCAnZGVzZXJpYWxpemUnKTtcblxuICAgICAgICAgICAgICBjb25zdCBkZWZzID0gc3RhdGVWaXNvci5nZXREZWZpbml0aW9uc0ZvclNlY3Rpb24oY2h1bmtJZCk7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgZGVmIG9mIGRlZnMpIHtcbiAgICAgICAgICAgICAgICBVLmRlc2VyaWFsaXplKGRlZiwgc2VjdGlvblN0YXRlLCBjaHVua0NvbnRleHQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbiJdfQ==