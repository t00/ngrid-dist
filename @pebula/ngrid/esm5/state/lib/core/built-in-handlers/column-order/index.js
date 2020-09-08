/**
 * @fileoverview added by tsickle
 * Generated from: lib/core/built-in-handlers/column-order/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { createStateChunkHandler } from '../../handling';
import { stateVisor } from '../../state-visor';
/**
 * @return {?}
 */
export function registerColumnOrderHandlers() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvYnVpbHQtaW4taGFuZGxlcnMvY29sdW1uLW9yZGVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRy9DLE1BQU0sVUFBVSwyQkFBMkI7SUFDekMsVUFBVSxDQUFDLHdCQUF3QixDQUNqQyxhQUFhLEVBQ2I7UUFDRSxhQUFhOzs7O1FBQUUsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBbEIsQ0FBa0IsQ0FBQTtRQUN4QyxZQUFZOzs7O1FBQUUsVUFBQSxLQUFLO1lBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO2dCQUN0QixLQUFLLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQzthQUN4QjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFBO0tBQ0YsQ0FDRixDQUFDO0lBRUYsdUJBQXVCLENBQUMsYUFBYSxDQUFDO1NBQ25DLFVBQVUsQ0FBQyxhQUFhLENBQUM7U0FDekIsU0FBUzs7Ozs7SUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLElBQUssT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxFQUFuQyxDQUFtQyxFQUFFO1NBQzlELFdBQVc7Ozs7OztJQUFFLFVBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxHQUFHO1FBQzFCLElBQUEsbUJBQU0sRUFBRSxlQUFJOztZQUNoQixRQUFnQztRQUU1QixJQUFBLGtEQUFnQjtRQUN4QixJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtZQUNqRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN0RCxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRTs7d0JBQ3BDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hELElBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQ1gsT0FBTztxQkFDUjs7d0JBQ0ssTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3RCxRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2hELE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ25DO2FBQ0Y7U0FDRjtRQUNELG1FQUFtRTtRQUNuRSxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLG1CQUFBLEdBQUcsQ0FBQyxPQUFPLEVBQTRCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM1RztJQUNILENBQUMsRUFBQztTQUNELFFBQVEsRUFBRSxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgY3JlYXRlU3RhdGVDaHVua0hhbmRsZXIgfSBmcm9tICcuLi8uLi9oYW5kbGluZyc7XG5pbXBvcnQgeyBzdGF0ZVZpc29yIH0gZnJvbSAnLi4vLi4vc3RhdGUtdmlzb3InO1xuaW1wb3J0IHsgUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2luZGV4JztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQ29sdW1uT3JkZXJIYW5kbGVycygpIHtcbiAgc3RhdGVWaXNvci5yZWdpc3RlclJvb3RDaHVua1NlY3Rpb24oXG4gICAgJ2NvbHVtbk9yZGVyJyxcbiAgICB7XG4gICAgICBzb3VyY2VNYXRjaGVyOiBjdHggPT4gY3R4LmdyaWQuY29sdW1uQXBpLFxuICAgICAgc3RhdGVNYXRjaGVyOiBzdGF0ZSA9PiB7XG4gICAgICAgIGlmICghc3RhdGUuY29sdW1uT3JkZXIpIHtcbiAgICAgICAgICBzdGF0ZS5jb2x1bW5PcmRlciA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgY3JlYXRlU3RhdGVDaHVua0hhbmRsZXIoJ2NvbHVtbk9yZGVyJylcbiAgICAuaGFuZGxlS2V5cygnY29sdW1uT3JkZXInKVxuICAgIC5zZXJpYWxpemUoIChrZXksIGN0eCkgPT4gY3R4LnNvdXJjZS52aXNpYmxlQ29sdW1uSWRzLnNsaWNlKCkgKVxuICAgIC5kZXNlcmlhbGl6ZSggKGtleSwgY29sdW1uT3JkZXIsIGN0eCkgPT4ge1xuICAgICAgY29uc3QgeyBleHRBcGksIGdyaWQgfSA9IGN0eDtcbiAgICAgIGxldCBsYXN0TW92ZTogW1BibENvbHVtbiwgUGJsQ29sdW1uXTtcblxuICAgICAgY29uc3QgeyB2aXNpYmxlQ29sdW1uSWRzIH0gPSBncmlkLmNvbHVtbkFwaTtcbiAgICAgIGlmIChjb2x1bW5PcmRlciAmJiBjb2x1bW5PcmRlci5sZW5ndGggPT09IHZpc2libGVDb2x1bW5JZHMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjb2x1bW5PcmRlci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIGlmIChjb2x1bW5PcmRlcltpXSAhPT0gdmlzaWJsZUNvbHVtbklkc1tpXSkge1xuICAgICAgICAgICAgY29uc3QgY29sdW1uID0gZ3JpZC5jb2x1bW5BcGkuZmluZENvbHVtbihjb2x1bW5PcmRlcltpXSk7XG4gICAgICAgICAgICBpZiAoIWNvbHVtbikge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhbmNob3IgPSBncmlkLmNvbHVtbkFwaS5maW5kQ29sdW1uKHZpc2libGVDb2x1bW5JZHNbaV0pO1xuICAgICAgICAgICAgbGFzdE1vdmUgPSBbY29sdW1uLCBhbmNob3JdO1xuICAgICAgICAgICAgZ3JpZC5jb2x1bW5BcGkubW92ZUNvbHVtbihjb2x1bW4sIGFuY2hvciwgdHJ1ZSk7XG4gICAgICAgICAgICBleHRBcGkuY29sdW1uU3RvcmUudXBkYXRlR3JvdXBzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBXaXRoIHRoaXMgcmV2ZXJ0L3JlZG8gb2YgdGhlIGxhc3QgbW92ZSB3ZSBqdXN0IHRyaWdnZXIgYSByZWRyYXcuXG4gICAgICBpZiAobGFzdE1vdmUpIHtcbiAgICAgICAgZ3JpZC5jb2x1bW5BcGkubW92ZUNvbHVtbihsYXN0TW92ZVsxXSwgbGFzdE1vdmVbMF0sIHRydWUpO1xuICAgICAgICBncmlkLmNvbHVtbkFwaS5tb3ZlQ29sdW1uKGxhc3RNb3ZlWzBdLCBsYXN0TW92ZVsxXSwgKGN0eC5vcHRpb25zIGFzIFBibE5ncmlkU3RhdGVMb2FkT3B0aW9ucykuYXZvaWRSZWRyYXcpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLnJlZ2lzdGVyKCk7XG4gIH1cbiJdfQ==