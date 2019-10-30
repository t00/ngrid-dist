/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { utils } from '@pebula/ngrid';
import { createStateChunkHandler } from '../../handling';
import { stateVisor } from '../../state-visor';
import { registerColumnDefChildHandlers } from './children';
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
export function registerColumnDefHandlers() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvYnVpbHQtaW4taGFuZGxlcnMvY29sdW1uLWRlZi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUErRCxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRy9DLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLFlBQVksQ0FBQzs7Ozs7Ozs7QUFFNUQsU0FBUywrQkFBK0IsQ0FBeUMsWUFBb0IsRUFBRSxHQUF5QyxFQUFFLE9BQWU7O1VBQ3pKLFlBQVksR0FBRyxFQUFFO0lBQ3ZCLEtBQUssTUFBTSxHQUFHLElBQUksT0FBTyxFQUFFOztjQUNuQixDQUFDLEdBQWlDLG1CQUFBLEVBQUUsRUFBTztRQUNqRCxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN0QjtJQUNELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7Ozs7Ozs7O0FBR0QsU0FBUyw0QkFBNEIsQ0FBQyxJQUFlLEVBQUUsS0FBZ0QsRUFBRSxHQUF5QztVQUMxSSxFQUFFLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNO1VBQzVCLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU07SUFDNUIsS0FBSyxNQUFNLElBQUksSUFBSSxtQkFBQSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBOEIsRUFBRTs7O2NBRS9ELEdBQUcsR0FBRyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUs7O2NBQ2xDLElBQUksR0FBRyxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUs7UUFFMUMsMkJBQTJCO1FBQzNCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFOztrQkFDUCxNQUFNLEdBQUcsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLGVBQWU7WUFDNUYsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQUU7WUFDckMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQzlFO0tBQ0Y7QUFDSCxDQUFDOzs7Ozs7O0FBRUQsU0FBUywrQkFBK0IsQ0FBQyxJQUFlLEVBQUUsS0FBZ0QsRUFBRSxHQUF5QztVQUM3SSxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNOztVQUN0QixHQUFHLEdBQUcsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLOztVQUVsQyxPQUFPLEdBQUcsR0FBRyxLQUFLLEtBQUs7UUFDM0IsQ0FBQzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSTs7OztZQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUM1SyxDQUFDOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQUEsRUFBRSxFQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRyxTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFBO0lBR2hILElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDbkMsS0FBSyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO2tCQUNwQixFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDOztrQkFFdEMsSUFBSSxHQUFHO2dCQUNYLFNBQVMsRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVM7Z0JBQ3BELFlBQVksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDO2FBQ2hFO1lBQ0QsR0FBRyxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1RDtLQUNGO0FBQ0gsQ0FBQzs7OztBQUVELE1BQU0sVUFBVSx5QkFBeUI7SUFDdkMsVUFBVSxDQUFDLHdCQUF3QixDQUNqQyxTQUFTLEVBQ1Q7UUFDRSxhQUFhOzs7O1FBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUN0QyxZQUFZOzs7O1FBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRztZQUN2RCxLQUFLLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLEVBQUU7YUFDVDtZQUNELE1BQU0sRUFBRSxFQUFFO1lBQ1YsTUFBTSxFQUFFLEVBQUU7WUFDVixXQUFXLEVBQUUsRUFBRTtTQUNoQixDQUFDLENBQUE7S0FDSCxDQUNGLENBQUM7SUFFRix1QkFBdUIsQ0FBQyxTQUFTLENBQUM7U0FDL0IsVUFBVSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLFFBQVEsQ0FBQztTQUN0RCxTQUFTOzs7OztJQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3ZCLFFBQVEsR0FBRyxFQUFFO1lBQ1gsS0FBSyxPQUFPOztzQkFDSixLQUFLLEdBQThDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtnQkFDckUsNEJBQTRCLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDOUMsK0JBQStCLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDakQsT0FBTyxLQUFLLENBQUM7WUFDZixLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssUUFBUTs7c0JBQ0wsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUM5QixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7MEJBQ3pCLElBQUksR0FBRyxFQUFFO29CQUNmLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFOzs4QkFDbEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJOzs7O3dCQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLEdBQUcsQ0FBQyxRQUFRLEVBQUU7OzhCQUNoSCxDQUFDLEdBQXFELG1CQUFBLEVBQUUsRUFBTzt3QkFDckUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUNyQyxDQUFDLENBQUMsSUFBSSxHQUFHLCtCQUErQixDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0RSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNkO29CQUNELE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUNELE1BQU07WUFDUixLQUFLLGFBQWE7O3NCQUNWLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVztnQkFDaEQsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzswQkFDL0MsSUFBSSxHQUFHLEVBQUU7b0JBQ2YsS0FBSyxNQUFNLEdBQUcsSUFBSSxpQkFBaUIsRUFBRTs7OEJBQzdCLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUk7Ozs7d0JBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEtBQUssR0FBRyxDQUFDLFFBQVEsRUFBRTs7OEJBQ2xILENBQUMsR0FBc0QsbUJBQUEsRUFBRSxFQUFPO3dCQUN0RSxHQUFHLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQzFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsK0JBQStCLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3RFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2Q7b0JBQ0QsT0FBTyxJQUFJLENBQUM7aUJBQ2I7Z0JBQ0QsTUFBTTtTQUNUO0lBQ0gsQ0FBQyxFQUFDO1NBQ0QsV0FBVzs7Ozs7O0lBQUUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3JDLFFBQVEsR0FBRyxFQUFFO1lBQ1gsS0FBSyxPQUFPOztzQkFDSixLQUFLLEdBQUcsbUJBQUEsVUFBVSxFQUE2QztnQkFDckUsNEJBQTRCLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDOUMsK0JBQStCLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDakQsTUFBTTtZQUNSLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxRQUFROztzQkFDTCxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7O3NCQUN4QixhQUFhLEdBQUcsbUJBQUEsVUFBVSxFQUE4QztnQkFDOUUsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQzdDLEtBQUssTUFBTSxRQUFRLElBQUksYUFBYSxFQUFFOzs4QkFDOUIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJOzs7O3dCQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsUUFBUSxFQUFFO3dCQUNoRSxJQUFJLEdBQUcsRUFBRTs7a0NBQ0QsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJOzs7OzRCQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxRQUFRLEVBQUU7NEJBQzNILEdBQUcsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQzs0QkFDNUMsS0FBSyxNQUFNLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFOztzQ0FDOUIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTs7OztnQ0FBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssUUFBUSxDQUFDLEVBQUUsRUFBQztnQ0FDckQsSUFBSSxHQUFHLEVBQUU7OzBDQUNELGNBQWMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQzs7MENBQ3pELFNBQVMsR0FBRyxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU07b0NBQ3pELEdBQUcsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztpQ0FDaEQ7NkJBQ0Y7eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsTUFBTTtZQUNSLEtBQUssYUFBYTtnQkFDaEIsTUFBTTtTQUNUO0lBQ0gsQ0FBQyxFQUFDO1NBQ0QsUUFBUSxFQUFFLENBQUM7SUFFWiw4QkFBOEIsRUFBRSxDQUFDO0FBQ3JDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQsIFBibENvbHVtbkRlZmluaXRpb24sIFBibENvbHVtbiwgdXRpbHMgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyIH0gZnJvbSAnLi4vLi4vaGFuZGxpbmcnO1xuaW1wb3J0IHsgc3RhdGVWaXNvciB9IGZyb20gJy4uLy4uL3N0YXRlLXZpc29yJztcbmltcG9ydCB7IFN0YXRlQ2h1bmtzLCBQYmxOZ3JpZFN0YXRlQ2h1bmtDb250ZXh0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IFBibE5ncmlkTWV0YVJvd1NldFN0YXRlLCBQYmxOZ3JpZE1ldGFDb2x1bW5TdGF0ZSwgUGJsTmdyaWRHcm91cENvbHVtblN0YXRlLCBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZSB9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHsgcmVnaXN0ZXJDb2x1bW5EZWZDaGlsZEhhbmRsZXJzIH0gZnJvbSAnLi9jaGlsZHJlbic7XG5cbmZ1bmN0aW9uIHJ1bkNoaWxkQ2h1bmtzRm9yUm93TWV0YUNvbHVtbnM8VENvbCwgVENoaWxkIGV4dGVuZHMga2V5b2YgU3RhdGVDaHVua3M+KGNoaWxkQ2h1bmtJZDogVENoaWxkLCBjdHg6IFBibE5ncmlkU3RhdGVDaHVua0NvbnRleHQ8XCJjb2x1bW5zXCI+LCBjb2x1bW5zOiBUQ29sW10pIHtcbiAgY29uc3Qgc3RhdGVDb2x1bW5zID0gW107XG4gIGZvciAoY29uc3QgY29sIG9mIGNvbHVtbnMpIHtcbiAgICBjb25zdCBjOiBTdGF0ZUNodW5rc1tUQ2hpbGRdWydzdGF0ZSddID0ge30gYXMgYW55O1xuICAgIGN0eC5ydW5DaGlsZENodW5rKGNoaWxkQ2h1bmtJZCwgYywgY29sKTtcbiAgICBzdGF0ZUNvbHVtbnMucHVzaChjKTtcbiAgfVxuICByZXR1cm4gc3RhdGVDb2x1bW5zO1xufVxuXG4vKiogUnVucyB0aGUgcHJvY2VzcyBmb3IgdGhlIGBoZWFkZXJgIGFuZCBgZm9vdGVyYCBzZWN0aW9ucyBpbiB0aGUgYHRhYmxlYCBzZWN0aW9uIChpZiB0aGV5IGV4aXN0KSAqL1xuZnVuY3Rpb24gcnVuQ2hpbGRDaHVua0ZvckRhdGFNZXRhUm93cyhtb2RlOiAncycgfCAnZCcsIHN0YXRlOiBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZVsndGFibGUnXSwgY3R4OiBQYmxOZ3JpZFN0YXRlQ2h1bmtDb250ZXh0PFwiY29sdW1uc1wiPikge1xuICBjb25zdCB7IGNvbHVtblN0b3JlIH0gPSBjdHguZXh0QXBpO1xuICBjb25zdCB7IHRhYmxlIH0gPSBjdHguc291cmNlO1xuICBmb3IgKGNvbnN0IGtpbmQgb2YgWydoZWFkZXInLCAnZm9vdGVyJ10gYXMgQXJyYXk8J2hlYWRlcicgfCAnZm9vdGVyJz4pIHtcbiAgICAvLyBUaGlzIGlzIGEgbWFwcGluZyBvZiB0aGUgZnJvbS0+dG8gcmVsYXRpb25zaGlwIChpLmUgc2VyaWFsaXppbmcgb3IgZGVzZXJpYWxpemluZylcbiAgICBjb25zdCBzcmMgPSBtb2RlID09PSAncycgPyB0YWJsZSA6IHN0YXRlO1xuICAgIGNvbnN0IGRlc3QgPSBzcmMgPT09IHRhYmxlID8gc3RhdGUgOiB0YWJsZTtcblxuICAgIC8vIHdlIG5lZWQgdG8gaGF2ZSBhIHNvdXJjZVxuICAgIGlmIChzcmNba2luZF0pIHtcbiAgICAgIGNvbnN0IGFjdGl2ZSA9IGtpbmQgPT09ICdoZWFkZXInID8gY29sdW1uU3RvcmUuaGVhZGVyQ29sdW1uRGVmIDogY29sdW1uU3RvcmUuZm9vdGVyQ29sdW1uRGVmO1xuICAgICAgaWYgKCFkZXN0W2tpbmRdKSB7IGRlc3Rba2luZF0gPSB7fTsgfVxuICAgICAgY3R4LnJ1bkNoaWxkQ2h1bmsoJ2RhdGFNZXRhUm93Jywgc3RhdGVba2luZF0sIHRhYmxlW2tpbmRdLCB7IGtpbmQsIGFjdGl2ZSB9KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcnVuQ2hpbGRDaHVua3NGb3JSb3dEYXRhQ29sdW1ucyhtb2RlOiAncycgfCAnZCcsIHN0YXRlOiBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZVsndGFibGUnXSwgY3R4OiBQYmxOZ3JpZFN0YXRlQ2h1bmtDb250ZXh0PFwiY29sdW1uc1wiPikge1xuICBjb25zdCB7IHRhYmxlIH0gPSBjdHguc291cmNlO1xuICBjb25zdCBzcmMgPSBtb2RlID09PSAncycgPyB0YWJsZSA6IHN0YXRlO1xuXG4gIGNvbnN0IHJlc29sdmUgPSBzcmMgPT09IHN0YXRlXG4gICAgPyBjb2wgPT4gKHsgY29sU3RhdGU6IGNvbCwgcGJsQ29sdW1uOiB0YWJsZS5jb2xzLmZpbmQoIHRDb2wgPT4gKHV0aWxzLmlzUGJsQ29sdW1uKHRDb2wpICYmIHRDb2wub3JnUHJvcCA9PT0gY29sLnByb3ApIHx8ICh0Q29sLmlkID09PSBjb2wuaWQgfHwgdENvbC5wcm9wID09PSBjb2wucHJvcCkgKSB9KVxuICAgIDogY29sID0+ICh7IGNvbFN0YXRlOiBzdGF0ZS5jb2xzW3N0YXRlLmNvbHMucHVzaCh7fSBhcyBhbnkpIC0gMV0gLCBwYmxDb2x1bW46IHV0aWxzLmlzUGJsQ29sdW1uKGNvbCkgJiYgY29sIH0pXG4gIDtcblxuICBpZiAoc3JjLmNvbHMgJiYgc3JjLmNvbHMubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgY29sIG9mIHNyYy5jb2xzKSB7XG4gICAgICBjb25zdCB7IGNvbFN0YXRlLCBwYmxDb2x1bW4gfSA9IHJlc29sdmUoY29sKVxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBwYmxDb2x1bW46IHV0aWxzLmlzUGJsQ29sdW1uKHBibENvbHVtbikgJiYgcGJsQ29sdW1uLFxuICAgICAgICBhY3RpdmVDb2x1bW46IGN0eC5ncmlkLmNvbHVtbkFwaS5maW5kQ29sdW1uKGNvbC5pZCB8fCBjb2wucHJvcCksXG4gICAgICB9XG4gICAgICBjdHgucnVuQ2hpbGRDaHVuaygnZGF0YUNvbHVtbicsIGNvbFN0YXRlLCBwYmxDb2x1bW4sIGRhdGEpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDb2x1bW5EZWZIYW5kbGVycygpIHtcbiAgc3RhdGVWaXNvci5yZWdpc3RlclJvb3RDaHVua1NlY3Rpb24oXG4gICAgJ2NvbHVtbnMnLFxuICAgIHtcbiAgICAgIHNvdXJjZU1hdGNoZXI6IGN0eCA9PiBjdHguZ3JpZC5jb2x1bW5zLFxuICAgICAgc3RhdGVNYXRjaGVyOiBzdGF0ZSA9PiBzdGF0ZS5jb2x1bW5zIHx8IChzdGF0ZS5jb2x1bW5zID0ge1xuICAgICAgICB0YWJsZToge1xuICAgICAgICAgIGNvbHM6IFtdLFxuICAgICAgICB9LFxuICAgICAgICBoZWFkZXI6IFtdLFxuICAgICAgICBmb290ZXI6IFtdLFxuICAgICAgICBoZWFkZXJHcm91cDogW10sXG4gICAgICB9KVxuICAgIH1cbiAgKTtcblxuICBjcmVhdGVTdGF0ZUNodW5rSGFuZGxlcignY29sdW1ucycpXG4gICAgLmhhbmRsZUtleXMoJ3RhYmxlJywgJ2hlYWRlcicsICdoZWFkZXJHcm91cCcsICdmb290ZXInKVxuICAgIC5zZXJpYWxpemUoIChrZXksIGN0eCkgPT4ge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAndGFibGUnOlxuICAgICAgICAgIGNvbnN0IHN0YXRlOiBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZVsndGFibGUnXSA9IHsgY29sczogW10gfTtcbiAgICAgICAgICBydW5DaGlsZENodW5rRm9yRGF0YU1ldGFSb3dzKCdzJywgc3RhdGUsIGN0eCk7XG4gICAgICAgICAgcnVuQ2hpbGRDaHVua3NGb3JSb3dEYXRhQ29sdW1ucygncycsIHN0YXRlLCBjdHgpO1xuICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICBjb25zdCBzb3VyY2UgPSBjdHguc291cmNlW2tleV07XG4gICAgICAgICAgaWYgKHNvdXJjZSAmJiBzb3VyY2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3Qgcm93cyA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCByb3cgb2Ygc291cmNlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IGN0eC5leHRBcGkuY29sdW1uU3RvcmUubWV0YUNvbHVtbklkc1trZXldLmZpbmQoIHIgPT4gIXIuaXNHcm91cCAmJiByLnJvd0RlZi5yb3dJbmRleCA9PT0gcm93LnJvd0luZGV4ICk7XG4gICAgICAgICAgICAgIGNvbnN0IHI6IFBibE5ncmlkTWV0YVJvd1NldFN0YXRlPFBibE5ncmlkTWV0YUNvbHVtblN0YXRlPiA9IHt9IGFzIGFueTtcbiAgICAgICAgICAgICAgY3R4LnJ1bkNoaWxkQ2h1bmsoJ21ldGFSb3cnLCByLCByb3cpO1xuICAgICAgICAgICAgICByLmNvbHMgPSBydW5DaGlsZENodW5rc0ZvclJvd01ldGFDb2x1bW5zKCdtZXRhQ29sdW1uJywgY3R4LCByb3cuY29scyk7XG4gICAgICAgICAgICAgIHJvd3MucHVzaChyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByb3dzO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaGVhZGVyR3JvdXAnOlxuICAgICAgICAgIGNvbnN0IGhlYWRlckdyb3VwU291cmNlID0gY3R4LnNvdXJjZS5oZWFkZXJHcm91cDtcbiAgICAgICAgICBpZiAoaGVhZGVyR3JvdXBTb3VyY2UgJiYgaGVhZGVyR3JvdXBTb3VyY2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3Qgcm93cyA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCByb3cgb2YgaGVhZGVyR3JvdXBTb3VyY2UpIHtcbiAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gY3R4LmV4dEFwaS5jb2x1bW5TdG9yZS5tZXRhQ29sdW1uSWRzLmhlYWRlci5maW5kKCByID0+ICFyLmlzR3JvdXAgJiYgci5yb3dEZWYucm93SW5kZXggPT09IHJvdy5yb3dJbmRleCApO1xuICAgICAgICAgICAgICBjb25zdCByOiBQYmxOZ3JpZE1ldGFSb3dTZXRTdGF0ZTxQYmxOZ3JpZEdyb3VwQ29sdW1uU3RhdGU+ID0ge30gYXMgYW55O1xuICAgICAgICAgICAgICBjdHgucnVuQ2hpbGRDaHVuaygnbWV0YUdyb3VwUm93Jywgciwgcm93KTtcbiAgICAgICAgICAgICAgci5jb2xzID0gcnVuQ2hpbGRDaHVua3NGb3JSb3dNZXRhQ29sdW1ucygnbWV0YUNvbHVtbicsIGN0eCwgcm93LmNvbHMpO1xuICAgICAgICAgICAgICByb3dzLnB1c2gocik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcm93cztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSlcbiAgICAuZGVzZXJpYWxpemUoIChrZXksIHN0YXRlVmFsdWUsIGN0eCkgPT4ge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAndGFibGUnOlxuICAgICAgICAgIGNvbnN0IHN0YXRlID0gc3RhdGVWYWx1ZSBhcyBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZVsndGFibGUnXTtcbiAgICAgICAgICBydW5DaGlsZENodW5rRm9yRGF0YU1ldGFSb3dzKCdkJywgc3RhdGUsIGN0eCk7XG4gICAgICAgICAgcnVuQ2hpbGRDaHVua3NGb3JSb3dEYXRhQ29sdW1ucygnZCcsIHN0YXRlLCBjdHgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IGN0eC5zb3VyY2Vba2V5XTtcbiAgICAgICAgICBjb25zdCBtZXRhUm93c1N0YXRlID0gc3RhdGVWYWx1ZSBhcyBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZVsnaGVhZGVyJ107XG4gICAgICAgICAgaWYgKG1ldGFSb3dzU3RhdGUgJiYgbWV0YVJvd3NTdGF0ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJvd1N0YXRlIG9mIG1ldGFSb3dzU3RhdGUpIHtcbiAgICAgICAgICAgICAgY29uc3Qgcm93ID0gc291cmNlLmZpbmQoIHIgPT4gci5yb3dJbmRleCA9PT0gcm93U3RhdGUucm93SW5kZXggKTtcbiAgICAgICAgICAgICAgaWYgKHJvdykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IGN0eC5leHRBcGkuY29sdW1uU3RvcmUubWV0YUNvbHVtbklkc1trZXldLmZpbmQoIHIgPT4gIXIuaXNHcm91cCAmJiByLnJvd0RlZi5yb3dJbmRleCA9PT0gcm93U3RhdGUucm93SW5kZXggKTtcbiAgICAgICAgICAgICAgICBjdHgucnVuQ2hpbGRDaHVuaygnbWV0YVJvdycsIHJvd1N0YXRlLCByb3cpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY29sU3RhdGUgb2Ygcm93U3RhdGUuY29scykge1xuICAgICAgICAgICAgICAgICAgY29uc3QgY29sID0gcm93LmNvbHMuZmluZCggciA9PiByLmlkID09PSBjb2xTdGF0ZS5pZCk7XG4gICAgICAgICAgICAgICAgICBpZiAoY29sKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUNvbFN0b3JlID0gY3R4LmV4dEFwaS5jb2x1bW5TdG9yZS5maW5kKGNvbFN0YXRlLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlQ29sID0gYWN0aXZlQ29sU3RvcmUgJiYgYWN0aXZlQ29sU3RvcmUuaGVhZGVyO1xuICAgICAgICAgICAgICAgICAgICBjdHgucnVuQ2hpbGRDaHVuaygnbWV0YUNvbHVtbicsIGNvbFN0YXRlLCBjb2wpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaGVhZGVyR3JvdXAnOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pXG4gICAgLnJlZ2lzdGVyKCk7XG5cbiAgICByZWdpc3RlckNvbHVtbkRlZkNoaWxkSGFuZGxlcnMoKTtcbn1cblxuZXhwb3J0IHtcbiAgUGJsTmdyaWRNZXRhQ29sdW1uU3RhdGUsXG4gIFBibE5ncmlkR3JvdXBDb2x1bW5TdGF0ZSxcbiAgUGJsTmdyaWRDb2x1bW5TdGF0ZSxcbiAgUGJsTmdyaWRNZXRhUm93U3RhdGUsXG4gIFBibE5ncmlkTWV0YVJvd1NldFN0YXRlLFxuICBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZSxcbn0gZnJvbSAnLi9tb2RlbCc7XG4iXX0=