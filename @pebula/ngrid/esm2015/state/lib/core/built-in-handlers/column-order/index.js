/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvYnVpbHQtaW4taGFuZGxlcnMvY29sdW1uLW9yZGVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7QUFHL0MsTUFBTSxVQUFVLDJCQUEyQjtJQUN6QyxVQUFVLENBQUMsd0JBQXdCLENBQ2pDLGFBQWEsRUFDYjtRQUNFLGFBQWE7Ozs7UUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFBO1FBQ3hDLFlBQVk7Ozs7UUFBRSxLQUFLLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtnQkFDdEIsS0FBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7YUFDeEI7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQTtLQUNGLENBQ0YsQ0FBQztJQUVGLHVCQUF1QixDQUFDLGFBQWEsQ0FBQztTQUNuQyxVQUFVLENBQUMsYUFBYSxDQUFDO1NBQ3pCLFNBQVM7Ozs7O0lBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxFQUFFO1NBQzlELFdBQVc7Ozs7OztJQUFFLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsRUFBRTtjQUNoQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHOztZQUN4QixRQUFnQztjQUU5QixFQUFFLGdCQUFnQixFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVM7UUFDM0MsSUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7WUFDakUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdEQsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUU7OzBCQUNwQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUNYLE9BQU87cUJBQ1I7OzBCQUNLLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0QsUUFBUSxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNoRCxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUNuQzthQUNGO1NBQ0Y7UUFDRCxtRUFBbUU7UUFDbkUsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxtQkFBQSxHQUFHLENBQUMsT0FBTyxFQUE0QixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDNUc7SUFDSCxDQUFDLEVBQUM7U0FDRCxRQUFRLEVBQUUsQ0FBQztBQUNkLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyIH0gZnJvbSAnLi4vLi4vaGFuZGxpbmcnO1xuaW1wb3J0IHsgc3RhdGVWaXNvciB9IGZyb20gJy4uLy4uL3N0YXRlLXZpc29yJztcbmltcG9ydCB7IFBibE5ncmlkU3RhdGVMb2FkT3B0aW9ucyB9IGZyb20gJy4uLy4uL21vZGVscy9pbmRleCc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckNvbHVtbk9yZGVySGFuZGxlcnMoKSB7XG4gIHN0YXRlVmlzb3IucmVnaXN0ZXJSb290Q2h1bmtTZWN0aW9uKFxuICAgICdjb2x1bW5PcmRlcicsXG4gICAge1xuICAgICAgc291cmNlTWF0Y2hlcjogY3R4ID0+IGN0eC5ncmlkLmNvbHVtbkFwaSxcbiAgICAgIHN0YXRlTWF0Y2hlcjogc3RhdGUgPT4ge1xuICAgICAgICBpZiAoIXN0YXRlLmNvbHVtbk9yZGVyKSB7XG4gICAgICAgICAgc3RhdGUuY29sdW1uT3JkZXIgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyKCdjb2x1bW5PcmRlcicpXG4gICAgLmhhbmRsZUtleXMoJ2NvbHVtbk9yZGVyJylcbiAgICAuc2VyaWFsaXplKCAoa2V5LCBjdHgpID0+IGN0eC5zb3VyY2UudmlzaWJsZUNvbHVtbklkcy5zbGljZSgpIClcbiAgICAuZGVzZXJpYWxpemUoIChrZXksIGNvbHVtbk9yZGVyLCBjdHgpID0+IHtcbiAgICAgIGNvbnN0IHsgZXh0QXBpLCBncmlkIH0gPSBjdHg7XG4gICAgICBsZXQgbGFzdE1vdmU6IFtQYmxDb2x1bW4sIFBibENvbHVtbl07XG5cbiAgICAgIGNvbnN0IHsgdmlzaWJsZUNvbHVtbklkcyB9ID0gZ3JpZC5jb2x1bW5BcGk7XG4gICAgICBpZiAoY29sdW1uT3JkZXIgJiYgY29sdW1uT3JkZXIubGVuZ3RoID09PSB2aXNpYmxlQ29sdW1uSWRzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY29sdW1uT3JkZXIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBpZiAoY29sdW1uT3JkZXJbaV0gIT09IHZpc2libGVDb2x1bW5JZHNbaV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IGdyaWQuY29sdW1uQXBpLmZpbmRDb2x1bW4oY29sdW1uT3JkZXJbaV0pO1xuICAgICAgICAgICAgaWYgKCFjb2x1bW4pIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gZ3JpZC5jb2x1bW5BcGkuZmluZENvbHVtbih2aXNpYmxlQ29sdW1uSWRzW2ldKTtcbiAgICAgICAgICAgIGxhc3RNb3ZlID0gW2NvbHVtbiwgYW5jaG9yXTtcbiAgICAgICAgICAgIGdyaWQuY29sdW1uQXBpLm1vdmVDb2x1bW4oY29sdW1uLCBhbmNob3IsIHRydWUpO1xuICAgICAgICAgICAgZXh0QXBpLmNvbHVtblN0b3JlLnVwZGF0ZUdyb3VwcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gV2l0aCB0aGlzIHJldmVydC9yZWRvIG9mIHRoZSBsYXN0IG1vdmUgd2UganVzdCB0cmlnZ2VyIGEgcmVkcmF3LlxuICAgICAgaWYgKGxhc3RNb3ZlKSB7XG4gICAgICAgIGdyaWQuY29sdW1uQXBpLm1vdmVDb2x1bW4obGFzdE1vdmVbMV0sIGxhc3RNb3ZlWzBdLCB0cnVlKTtcbiAgICAgICAgZ3JpZC5jb2x1bW5BcGkubW92ZUNvbHVtbihsYXN0TW92ZVswXSwgbGFzdE1vdmVbMV0sIChjdHgub3B0aW9ucyBhcyBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnMpLmF2b2lkUmVkcmF3KTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5yZWdpc3RlcigpO1xuICB9XG4iXX0=