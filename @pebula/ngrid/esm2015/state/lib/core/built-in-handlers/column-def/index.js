/**
 * @fileoverview added by tsickle
 * Generated from: lib/core/built-in-handlers/column-def/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvYnVpbHQtaW4taGFuZGxlcnMvY29sdW1uLWRlZi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBK0QsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25HLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUcvQyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7Ozs7O0FBRTVELFNBQVMsK0JBQStCLENBQXlDLFlBQW9CLEVBQUUsR0FBeUMsRUFBRSxPQUFlOztVQUN6SixZQUFZLEdBQUcsRUFBRTtJQUN2QixLQUFLLE1BQU0sR0FBRyxJQUFJLE9BQU8sRUFBRTs7Y0FDbkIsQ0FBQyxHQUFpQyxtQkFBQSxFQUFFLEVBQU87UUFDakQsR0FBRyxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEI7SUFDRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDOzs7Ozs7OztBQUdELFNBQVMsNEJBQTRCLENBQUMsSUFBZSxFQUFFLEtBQWdELEVBQUUsR0FBeUM7VUFDMUksRUFBRSxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTTtVQUM1QixFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNO0lBQzVCLEtBQUssTUFBTSxJQUFJLElBQUksbUJBQUEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQThCLEVBQUU7OztjQUUvRCxHQUFHLEdBQUcsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLOztjQUNsQyxJQUFJLEdBQUcsR0FBRyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLO1FBRTFDLDJCQUEyQjtRQUMzQixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTs7a0JBQ1AsTUFBTSxHQUFHLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxlQUFlO1lBQzVGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUFFO1lBQ3JDLEdBQUcsQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUM5RTtLQUNGO0FBQ0gsQ0FBQzs7Ozs7OztBQUVELFNBQVMsK0JBQStCLENBQUMsSUFBZSxFQUFFLEtBQWdELEVBQUUsR0FBeUM7VUFDN0ksRUFBRSxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTTs7VUFDdEIsR0FBRyxHQUFHLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSzs7VUFFbEMsT0FBTyxHQUFHLEdBQUcsS0FBSyxLQUFLO1FBQzNCLENBQUM7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUk7Ozs7WUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDNUssQ0FBQzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFBLEVBQUUsRUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUcsU0FBUyxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUdoSCxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ25DLEtBQUssTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtrQkFDcEIsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7a0JBRXRDLElBQUksR0FBRztnQkFDWCxTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTO2dCQUNwRCxZQUFZLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQzthQUNoRTtZQUNELEdBQUcsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUQ7S0FDRjtBQUNILENBQUM7Ozs7QUFFRCxNQUFNLFVBQVUseUJBQXlCO0lBQ3ZDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FDakMsU0FBUyxFQUNUO1FBQ0UsYUFBYTs7OztRQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDdEMsWUFBWTs7OztRQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUc7WUFDdkQsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxFQUFFO2FBQ1Q7WUFDRCxNQUFNLEVBQUUsRUFBRTtZQUNWLE1BQU0sRUFBRSxFQUFFO1lBQ1YsV0FBVyxFQUFFLEVBQUU7U0FDaEIsQ0FBQyxDQUFBO0tBQ0gsQ0FDRixDQUFDO0lBRUYsdUJBQXVCLENBQUMsU0FBUyxDQUFDO1NBQy9CLFVBQVUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxRQUFRLENBQUM7U0FDdEQsU0FBUzs7Ozs7SUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUN2QixRQUFRLEdBQUcsRUFBRTtZQUNYLEtBQUssT0FBTzs7c0JBQ0osS0FBSyxHQUE4QyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7Z0JBQ3JFLDRCQUE0QixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzlDLCtCQUErQixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2pELE9BQU8sS0FBSyxDQUFDO1lBQ2YsS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLFFBQVE7O3NCQUNMLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDOUIsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7OzBCQUN6QixJQUFJLEdBQUcsRUFBRTtvQkFDZixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRTs7OEJBQ2xCLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSTs7Ozt3QkFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxHQUFHLENBQUMsUUFBUSxFQUFFOzs4QkFDaEgsQ0FBQyxHQUFxRCxtQkFBQSxFQUFFLEVBQU87d0JBQ3JFLEdBQUcsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDckMsQ0FBQyxDQUFDLElBQUksR0FBRywrQkFBK0IsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDZDtvQkFDRCxPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFDRCxNQUFNO1lBQ1IsS0FBSyxhQUFhOztzQkFDVixpQkFBaUIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVc7Z0JBQ2hELElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7MEJBQy9DLElBQUksR0FBRyxFQUFFO29CQUNmLEtBQUssTUFBTSxHQUFHLElBQUksaUJBQWlCLEVBQUU7OzhCQUM3QixNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJOzs7O3dCQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLEdBQUcsQ0FBQyxRQUFRLEVBQUU7OzhCQUNsSCxDQUFDLEdBQXNELG1CQUFBLEVBQUUsRUFBTzt3QkFDdEUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUMxQyxDQUFDLENBQUMsSUFBSSxHQUFHLCtCQUErQixDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0RSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNkO29CQUNELE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUNELE1BQU07U0FDVDtJQUNILENBQUMsRUFBQztTQUNELFdBQVc7Ozs7OztJQUFFLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNyQyxRQUFRLEdBQUcsRUFBRTtZQUNYLEtBQUssT0FBTzs7c0JBQ0osS0FBSyxHQUFHLG1CQUFBLFVBQVUsRUFBNkM7Z0JBQ3JFLDRCQUE0QixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzlDLCtCQUErQixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2pELE1BQU07WUFDUixLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssUUFBUTs7c0JBQ0wsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDOztzQkFDeEIsYUFBYSxHQUFHLG1CQUFBLFVBQVUsRUFBOEM7Z0JBQzlFLElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUM3QyxLQUFLLE1BQU0sUUFBUSxJQUFJLGFBQWEsRUFBRTs7OEJBQzlCLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSTs7Ozt3QkFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLFFBQVEsRUFBRTt3QkFDaEUsSUFBSSxHQUFHLEVBQUU7O2tDQUNELE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSTs7Ozs0QkFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsUUFBUSxFQUFFOzRCQUMzSCxHQUFHLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBQzVDLEtBQUssTUFBTSxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTs7c0NBQzlCLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7Ozs7Z0NBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLFFBQVEsQ0FBQyxFQUFFLEVBQUM7Z0NBQ3JELElBQUksR0FBRyxFQUFFOzswQ0FDRCxjQUFjLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7OzBDQUN6RCxTQUFTLEdBQUcsY0FBYyxJQUFJLGNBQWMsQ0FBQyxNQUFNO29DQUN6RCxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7aUNBQ2hEOzZCQUNGO3lCQUNGO3FCQUNGO2lCQUNGO2dCQUNELE1BQU07WUFDUixLQUFLLGFBQWE7Z0JBQ2hCLE1BQU07U0FDVDtJQUNILENBQUMsRUFBQztTQUNELFFBQVEsRUFBRSxDQUFDO0lBRVosOEJBQThCLEVBQUUsQ0FBQztBQUNyQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0LCBQYmxDb2x1bW5EZWZpbml0aW9uLCBQYmxDb2x1bW4sIHV0aWxzIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBjcmVhdGVTdGF0ZUNodW5rSGFuZGxlciB9IGZyb20gJy4uLy4uL2hhbmRsaW5nJztcbmltcG9ydCB7IHN0YXRlVmlzb3IgfSBmcm9tICcuLi8uLi9zdGF0ZS12aXNvcic7XG5pbXBvcnQgeyBTdGF0ZUNodW5rcywgUGJsTmdyaWRTdGF0ZUNodW5rQ29udGV4dCB9IGZyb20gJy4uLy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFSb3dTZXRTdGF0ZSwgUGJsTmdyaWRNZXRhQ29sdW1uU3RhdGUsIFBibE5ncmlkR3JvdXBDb2x1bW5TdGF0ZSwgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0U3RhdGUgfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7IHJlZ2lzdGVyQ29sdW1uRGVmQ2hpbGRIYW5kbGVycyB9IGZyb20gJy4vY2hpbGRyZW4nO1xuXG5mdW5jdGlvbiBydW5DaGlsZENodW5rc0ZvclJvd01ldGFDb2x1bW5zPFRDb2wsIFRDaGlsZCBleHRlbmRzIGtleW9mIFN0YXRlQ2h1bmtzPihjaGlsZENodW5rSWQ6IFRDaGlsZCwgY3R4OiBQYmxOZ3JpZFN0YXRlQ2h1bmtDb250ZXh0PFwiY29sdW1uc1wiPiwgY29sdW1uczogVENvbFtdKSB7XG4gIGNvbnN0IHN0YXRlQ29sdW1ucyA9IFtdO1xuICBmb3IgKGNvbnN0IGNvbCBvZiBjb2x1bW5zKSB7XG4gICAgY29uc3QgYzogU3RhdGVDaHVua3NbVENoaWxkXVsnc3RhdGUnXSA9IHt9IGFzIGFueTtcbiAgICBjdHgucnVuQ2hpbGRDaHVuayhjaGlsZENodW5rSWQsIGMsIGNvbCk7XG4gICAgc3RhdGVDb2x1bW5zLnB1c2goYyk7XG4gIH1cbiAgcmV0dXJuIHN0YXRlQ29sdW1ucztcbn1cblxuLyoqIFJ1bnMgdGhlIHByb2Nlc3MgZm9yIHRoZSBgaGVhZGVyYCBhbmQgYGZvb3RlcmAgc2VjdGlvbnMgaW4gdGhlIGB0YWJsZWAgc2VjdGlvbiAoaWYgdGhleSBleGlzdCkgKi9cbmZ1bmN0aW9uIHJ1bkNoaWxkQ2h1bmtGb3JEYXRhTWV0YVJvd3MobW9kZTogJ3MnIHwgJ2QnLCBzdGF0ZTogUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0U3RhdGVbJ3RhYmxlJ10sIGN0eDogUGJsTmdyaWRTdGF0ZUNodW5rQ29udGV4dDxcImNvbHVtbnNcIj4pIHtcbiAgY29uc3QgeyBjb2x1bW5TdG9yZSB9ID0gY3R4LmV4dEFwaTtcbiAgY29uc3QgeyB0YWJsZSB9ID0gY3R4LnNvdXJjZTtcbiAgZm9yIChjb25zdCBraW5kIG9mIFsnaGVhZGVyJywgJ2Zvb3RlciddIGFzIEFycmF5PCdoZWFkZXInIHwgJ2Zvb3Rlcic+KSB7XG4gICAgLy8gVGhpcyBpcyBhIG1hcHBpbmcgb2YgdGhlIGZyb20tPnRvIHJlbGF0aW9uc2hpcCAoaS5lIHNlcmlhbGl6aW5nIG9yIGRlc2VyaWFsaXppbmcpXG4gICAgY29uc3Qgc3JjID0gbW9kZSA9PT0gJ3MnID8gdGFibGUgOiBzdGF0ZTtcbiAgICBjb25zdCBkZXN0ID0gc3JjID09PSB0YWJsZSA/IHN0YXRlIDogdGFibGU7XG5cbiAgICAvLyB3ZSBuZWVkIHRvIGhhdmUgYSBzb3VyY2VcbiAgICBpZiAoc3JjW2tpbmRdKSB7XG4gICAgICBjb25zdCBhY3RpdmUgPSBraW5kID09PSAnaGVhZGVyJyA/IGNvbHVtblN0b3JlLmhlYWRlckNvbHVtbkRlZiA6IGNvbHVtblN0b3JlLmZvb3RlckNvbHVtbkRlZjtcbiAgICAgIGlmICghZGVzdFtraW5kXSkgeyBkZXN0W2tpbmRdID0ge307IH1cbiAgICAgIGN0eC5ydW5DaGlsZENodW5rKCdkYXRhTWV0YVJvdycsIHN0YXRlW2tpbmRdLCB0YWJsZVtraW5kXSwgeyBraW5kLCBhY3RpdmUgfSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJ1bkNoaWxkQ2h1bmtzRm9yUm93RGF0YUNvbHVtbnMobW9kZTogJ3MnIHwgJ2QnLCBzdGF0ZTogUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0U3RhdGVbJ3RhYmxlJ10sIGN0eDogUGJsTmdyaWRTdGF0ZUNodW5rQ29udGV4dDxcImNvbHVtbnNcIj4pIHtcbiAgY29uc3QgeyB0YWJsZSB9ID0gY3R4LnNvdXJjZTtcbiAgY29uc3Qgc3JjID0gbW9kZSA9PT0gJ3MnID8gdGFibGUgOiBzdGF0ZTtcblxuICBjb25zdCByZXNvbHZlID0gc3JjID09PSBzdGF0ZVxuICAgID8gY29sID0+ICh7IGNvbFN0YXRlOiBjb2wsIHBibENvbHVtbjogdGFibGUuY29scy5maW5kKCB0Q29sID0+ICh1dGlscy5pc1BibENvbHVtbih0Q29sKSAmJiB0Q29sLm9yZ1Byb3AgPT09IGNvbC5wcm9wKSB8fCAodENvbC5pZCA9PT0gY29sLmlkIHx8IHRDb2wucHJvcCA9PT0gY29sLnByb3ApICkgfSlcbiAgICA6IGNvbCA9PiAoeyBjb2xTdGF0ZTogc3RhdGUuY29sc1tzdGF0ZS5jb2xzLnB1c2goe30gYXMgYW55KSAtIDFdICwgcGJsQ29sdW1uOiB1dGlscy5pc1BibENvbHVtbihjb2wpICYmIGNvbCB9KVxuICA7XG5cbiAgaWYgKHNyYy5jb2xzICYmIHNyYy5jb2xzLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IGNvbCBvZiBzcmMuY29scykge1xuICAgICAgY29uc3QgeyBjb2xTdGF0ZSwgcGJsQ29sdW1uIH0gPSByZXNvbHZlKGNvbClcblxuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgcGJsQ29sdW1uOiB1dGlscy5pc1BibENvbHVtbihwYmxDb2x1bW4pICYmIHBibENvbHVtbixcbiAgICAgICAgYWN0aXZlQ29sdW1uOiBjdHguZ3JpZC5jb2x1bW5BcGkuZmluZENvbHVtbihjb2wuaWQgfHwgY29sLnByb3ApLFxuICAgICAgfVxuICAgICAgY3R4LnJ1bkNoaWxkQ2h1bmsoJ2RhdGFDb2x1bW4nLCBjb2xTdGF0ZSwgcGJsQ29sdW1uLCBkYXRhKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQ29sdW1uRGVmSGFuZGxlcnMoKSB7XG4gIHN0YXRlVmlzb3IucmVnaXN0ZXJSb290Q2h1bmtTZWN0aW9uKFxuICAgICdjb2x1bW5zJyxcbiAgICB7XG4gICAgICBzb3VyY2VNYXRjaGVyOiBjdHggPT4gY3R4LmdyaWQuY29sdW1ucyxcbiAgICAgIHN0YXRlTWF0Y2hlcjogc3RhdGUgPT4gc3RhdGUuY29sdW1ucyB8fCAoc3RhdGUuY29sdW1ucyA9IHtcbiAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICBjb2xzOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAgaGVhZGVyOiBbXSxcbiAgICAgICAgZm9vdGVyOiBbXSxcbiAgICAgICAgaGVhZGVyR3JvdXA6IFtdLFxuICAgICAgfSlcbiAgICB9XG4gICk7XG5cbiAgY3JlYXRlU3RhdGVDaHVua0hhbmRsZXIoJ2NvbHVtbnMnKVxuICAgIC5oYW5kbGVLZXlzKCd0YWJsZScsICdoZWFkZXInLCAnaGVhZGVyR3JvdXAnLCAnZm9vdGVyJylcbiAgICAuc2VyaWFsaXplKCAoa2V5LCBjdHgpID0+IHtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgJ3RhYmxlJzpcbiAgICAgICAgICBjb25zdCBzdGF0ZTogUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0U3RhdGVbJ3RhYmxlJ10gPSB7IGNvbHM6IFtdIH07XG4gICAgICAgICAgcnVuQ2hpbGRDaHVua0ZvckRhdGFNZXRhUm93cygncycsIHN0YXRlLCBjdHgpO1xuICAgICAgICAgIHJ1bkNoaWxkQ2h1bmtzRm9yUm93RGF0YUNvbHVtbnMoJ3MnLCBzdGF0ZSwgY3R4KTtcbiAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgY29uc3Qgc291cmNlID0gY3R4LnNvdXJjZVtrZXldO1xuICAgICAgICAgIGlmIChzb3VyY2UgJiYgc291cmNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd3MgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgcm93IG9mIHNvdXJjZSkge1xuICAgICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBjdHguZXh0QXBpLmNvbHVtblN0b3JlLm1ldGFDb2x1bW5JZHNba2V5XS5maW5kKCByID0+ICFyLmlzR3JvdXAgJiYgci5yb3dEZWYucm93SW5kZXggPT09IHJvdy5yb3dJbmRleCApO1xuICAgICAgICAgICAgICBjb25zdCByOiBQYmxOZ3JpZE1ldGFSb3dTZXRTdGF0ZTxQYmxOZ3JpZE1ldGFDb2x1bW5TdGF0ZT4gPSB7fSBhcyBhbnk7XG4gICAgICAgICAgICAgIGN0eC5ydW5DaGlsZENodW5rKCdtZXRhUm93Jywgciwgcm93KTtcbiAgICAgICAgICAgICAgci5jb2xzID0gcnVuQ2hpbGRDaHVua3NGb3JSb3dNZXRhQ29sdW1ucygnbWV0YUNvbHVtbicsIGN0eCwgcm93LmNvbHMpO1xuICAgICAgICAgICAgICByb3dzLnB1c2gocik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcm93cztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2hlYWRlckdyb3VwJzpcbiAgICAgICAgICBjb25zdCBoZWFkZXJHcm91cFNvdXJjZSA9IGN0eC5zb3VyY2UuaGVhZGVyR3JvdXA7XG4gICAgICAgICAgaWYgKGhlYWRlckdyb3VwU291cmNlICYmIGhlYWRlckdyb3VwU291cmNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd3MgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgcm93IG9mIGhlYWRlckdyb3VwU291cmNlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IGN0eC5leHRBcGkuY29sdW1uU3RvcmUubWV0YUNvbHVtbklkcy5oZWFkZXIuZmluZCggciA9PiAhci5pc0dyb3VwICYmIHIucm93RGVmLnJvd0luZGV4ID09PSByb3cucm93SW5kZXggKTtcbiAgICAgICAgICAgICAgY29uc3QgcjogUGJsTmdyaWRNZXRhUm93U2V0U3RhdGU8UGJsTmdyaWRHcm91cENvbHVtblN0YXRlPiA9IHt9IGFzIGFueTtcbiAgICAgICAgICAgICAgY3R4LnJ1bkNoaWxkQ2h1bmsoJ21ldGFHcm91cFJvdycsIHIsIHJvdyk7XG4gICAgICAgICAgICAgIHIuY29scyA9IHJ1bkNoaWxkQ2h1bmtzRm9yUm93TWV0YUNvbHVtbnMoJ21ldGFDb2x1bW4nLCBjdHgsIHJvdy5jb2xzKTtcbiAgICAgICAgICAgICAgcm93cy5wdXNoKHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJvd3M7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmRlc2VyaWFsaXplKCAoa2V5LCBzdGF0ZVZhbHVlLCBjdHgpID0+IHtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgJ3RhYmxlJzpcbiAgICAgICAgICBjb25zdCBzdGF0ZSA9IHN0YXRlVmFsdWUgYXMgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0U3RhdGVbJ3RhYmxlJ107XG4gICAgICAgICAgcnVuQ2hpbGRDaHVua0ZvckRhdGFNZXRhUm93cygnZCcsIHN0YXRlLCBjdHgpO1xuICAgICAgICAgIHJ1bkNoaWxkQ2h1bmtzRm9yUm93RGF0YUNvbHVtbnMoJ2QnLCBzdGF0ZSwgY3R4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICBjb25zdCBzb3VyY2UgPSBjdHguc291cmNlW2tleV07XG4gICAgICAgICAgY29uc3QgbWV0YVJvd3NTdGF0ZSA9IHN0YXRlVmFsdWUgYXMgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0U3RhdGVbJ2hlYWRlciddO1xuICAgICAgICAgIGlmIChtZXRhUm93c1N0YXRlICYmIG1ldGFSb3dzU3RhdGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCByb3dTdGF0ZSBvZiBtZXRhUm93c1N0YXRlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHNvdXJjZS5maW5kKCByID0+IHIucm93SW5kZXggPT09IHJvd1N0YXRlLnJvd0luZGV4ICk7XG4gICAgICAgICAgICAgIGlmIChyb3cpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBjdHguZXh0QXBpLmNvbHVtblN0b3JlLm1ldGFDb2x1bW5JZHNba2V5XS5maW5kKCByID0+ICFyLmlzR3JvdXAgJiYgci5yb3dEZWYucm93SW5kZXggPT09IHJvd1N0YXRlLnJvd0luZGV4ICk7XG4gICAgICAgICAgICAgICAgY3R4LnJ1bkNoaWxkQ2h1bmsoJ21ldGFSb3cnLCByb3dTdGF0ZSwgcm93KTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNvbFN0YXRlIG9mIHJvd1N0YXRlLmNvbHMpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbCA9IHJvdy5jb2xzLmZpbmQoIHIgPT4gci5pZCA9PT0gY29sU3RhdGUuaWQpO1xuICAgICAgICAgICAgICAgICAgaWYgKGNvbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVDb2xTdG9yZSA9IGN0eC5leHRBcGkuY29sdW1uU3RvcmUuZmluZChjb2xTdGF0ZS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUNvbCA9IGFjdGl2ZUNvbFN0b3JlICYmIGFjdGl2ZUNvbFN0b3JlLmhlYWRlcjtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnJ1bkNoaWxkQ2h1bmsoJ21ldGFDb2x1bW4nLCBjb2xTdGF0ZSwgY29sKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2hlYWRlckdyb3VwJzpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KVxuICAgIC5yZWdpc3RlcigpO1xuXG4gICAgcmVnaXN0ZXJDb2x1bW5EZWZDaGlsZEhhbmRsZXJzKCk7XG59XG5cbmV4cG9ydCB7XG4gIFBibE5ncmlkTWV0YUNvbHVtblN0YXRlLFxuICBQYmxOZ3JpZEdyb3VwQ29sdW1uU3RhdGUsXG4gIFBibE5ncmlkQ29sdW1uU3RhdGUsXG4gIFBibE5ncmlkTWV0YVJvd1N0YXRlLFxuICBQYmxOZ3JpZE1ldGFSb3dTZXRTdGF0ZSxcbiAgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0U3RhdGUsXG59IGZyb20gJy4vbW9kZWwnO1xuIl19