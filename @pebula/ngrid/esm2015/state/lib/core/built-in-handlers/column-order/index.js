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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvYnVpbHQtaW4taGFuZGxlcnMvY29sdW1uLW9yZGVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRy9DLE1BQU0sVUFBVSwyQkFBMkI7SUFDekMsVUFBVSxDQUFDLHdCQUF3QixDQUNqQyxhQUFhLEVBQ2I7UUFDRSxhQUFhOzs7O1FBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQTtRQUN4QyxZQUFZOzs7O1FBQUUsS0FBSyxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RCLEtBQUssQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO2FBQ3hCO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUE7S0FDRixDQUNGLENBQUM7SUFFRix1QkFBdUIsQ0FBQyxhQUFhLENBQUM7U0FDbkMsVUFBVSxDQUFDLGFBQWEsQ0FBQztTQUN6QixTQUFTOzs7OztJQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsRUFBRTtTQUM5RCxXQUFXOzs7Ozs7SUFBRSxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLEVBQUU7Y0FDaEMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRzs7WUFDeEIsUUFBZ0M7Y0FFOUIsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTO1FBQzNDLElBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssZ0JBQWdCLENBQUMsTUFBTSxFQUFFO1lBQ2pFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RELElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFOzswQkFDcEMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEQsSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDWCxPQUFPO3FCQUNSOzswQkFDSyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdELFFBQVEsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDaEQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDbkM7YUFDRjtTQUNGO1FBQ0QsbUVBQW1FO1FBQ25FLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsbUJBQUEsR0FBRyxDQUFDLE9BQU8sRUFBNEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzVHO0lBQ0gsQ0FBQyxFQUFDO1NBQ0QsUUFBUSxFQUFFLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBjcmVhdGVTdGF0ZUNodW5rSGFuZGxlciB9IGZyb20gJy4uLy4uL2hhbmRsaW5nJztcbmltcG9ydCB7IHN0YXRlVmlzb3IgfSBmcm9tICcuLi8uLi9zdGF0ZS12aXNvcic7XG5pbXBvcnQgeyBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnMgfSBmcm9tICcuLi8uLi9tb2RlbHMvaW5kZXgnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDb2x1bW5PcmRlckhhbmRsZXJzKCkge1xuICBzdGF0ZVZpc29yLnJlZ2lzdGVyUm9vdENodW5rU2VjdGlvbihcbiAgICAnY29sdW1uT3JkZXInLFxuICAgIHtcbiAgICAgIHNvdXJjZU1hdGNoZXI6IGN0eCA9PiBjdHguZ3JpZC5jb2x1bW5BcGksXG4gICAgICBzdGF0ZU1hdGNoZXI6IHN0YXRlID0+IHtcbiAgICAgICAgaWYgKCFzdGF0ZS5jb2x1bW5PcmRlcikge1xuICAgICAgICAgIHN0YXRlLmNvbHVtbk9yZGVyID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICBjcmVhdGVTdGF0ZUNodW5rSGFuZGxlcignY29sdW1uT3JkZXInKVxuICAgIC5oYW5kbGVLZXlzKCdjb2x1bW5PcmRlcicpXG4gICAgLnNlcmlhbGl6ZSggKGtleSwgY3R4KSA9PiBjdHguc291cmNlLnZpc2libGVDb2x1bW5JZHMuc2xpY2UoKSApXG4gICAgLmRlc2VyaWFsaXplKCAoa2V5LCBjb2x1bW5PcmRlciwgY3R4KSA9PiB7XG4gICAgICBjb25zdCB7IGV4dEFwaSwgZ3JpZCB9ID0gY3R4O1xuICAgICAgbGV0IGxhc3RNb3ZlOiBbUGJsQ29sdW1uLCBQYmxDb2x1bW5dO1xuXG4gICAgICBjb25zdCB7IHZpc2libGVDb2x1bW5JZHMgfSA9IGdyaWQuY29sdW1uQXBpO1xuICAgICAgaWYgKGNvbHVtbk9yZGVyICYmIGNvbHVtbk9yZGVyLmxlbmd0aCA9PT0gdmlzaWJsZUNvbHVtbklkcy5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNvbHVtbk9yZGVyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGNvbHVtbk9yZGVyW2ldICE9PSB2aXNpYmxlQ29sdW1uSWRzW2ldKSB7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW4gPSBncmlkLmNvbHVtbkFwaS5maW5kQ29sdW1uKGNvbHVtbk9yZGVyW2ldKTtcbiAgICAgICAgICAgIGlmICghY29sdW1uKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IGdyaWQuY29sdW1uQXBpLmZpbmRDb2x1bW4odmlzaWJsZUNvbHVtbklkc1tpXSk7XG4gICAgICAgICAgICBsYXN0TW92ZSA9IFtjb2x1bW4sIGFuY2hvcl07XG4gICAgICAgICAgICBncmlkLmNvbHVtbkFwaS5tb3ZlQ29sdW1uKGNvbHVtbiwgYW5jaG9yLCB0cnVlKTtcbiAgICAgICAgICAgIGV4dEFwaS5jb2x1bW5TdG9yZS51cGRhdGVHcm91cHMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFdpdGggdGhpcyByZXZlcnQvcmVkbyBvZiB0aGUgbGFzdCBtb3ZlIHdlIGp1c3QgdHJpZ2dlciBhIHJlZHJhdy5cbiAgICAgIGlmIChsYXN0TW92ZSkge1xuICAgICAgICBncmlkLmNvbHVtbkFwaS5tb3ZlQ29sdW1uKGxhc3RNb3ZlWzFdLCBsYXN0TW92ZVswXSwgdHJ1ZSk7XG4gICAgICAgIGdyaWQuY29sdW1uQXBpLm1vdmVDb2x1bW4obGFzdE1vdmVbMF0sIGxhc3RNb3ZlWzFdLCAoY3R4Lm9wdGlvbnMgYXMgUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zKS5hdm9pZFJlZHJhdyk7XG4gICAgICB9XG4gICAgfSlcbiAgICAucmVnaXN0ZXIoKTtcbiAgfVxuIl19