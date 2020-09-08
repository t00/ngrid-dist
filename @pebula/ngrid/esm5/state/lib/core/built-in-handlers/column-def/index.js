/**
 * @fileoverview added by tsickle
 * Generated from: lib/core/built-in-handlers/column-def/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __values } from "tslib";
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
export function registerColumnDefHandlers() {
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
                                for (var _b = (e_7 = void 0, __values(rowState.cols)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvYnVpbHQtaW4taGFuZGxlcnMvY29sdW1uLWRlZi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQStELEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHL0MsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sWUFBWSxDQUFDOzs7Ozs7OztBQUU1RCxTQUFTLCtCQUErQixDQUF5QyxZQUFvQixFQUFFLEdBQXlDLEVBQUUsT0FBZTs7O1FBQ3pKLFlBQVksR0FBRyxFQUFFOztRQUN2QixLQUFrQixJQUFBLFlBQUEsU0FBQSxPQUFPLENBQUEsZ0NBQUEscURBQUU7WUFBdEIsSUFBTSxHQUFHLG9CQUFBOztnQkFDTixDQUFDLEdBQWlDLG1CQUFBLEVBQUUsRUFBTztZQUNqRCxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDeEMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0Qjs7Ozs7Ozs7O0lBQ0QsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQzs7Ozs7Ozs7QUFHRCxTQUFTLDRCQUE0QixDQUFDLElBQWUsRUFBRSxLQUFnRCxFQUFFLEdBQXlDOztJQUN4SSxJQUFBLG9DQUFXO0lBQ1gsSUFBQSx3QkFBSzs7UUFDYix1QkFBbUIsbUJBQUEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQThCLDZDQUFFO1lBQWxFLElBQU0sSUFBSSxXQUFBOzs7Z0JBRVAsR0FBRyxHQUFHLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENB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QUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxRQUFRLEVBQXJELENBQXFELEVBQUU7NEJBQzNILEdBQUcsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztvREFDakMsUUFBUTs7b0NBQ1gsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTs7OztnQ0FBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxFQUFFLEtBQUssUUFBUSxDQUFDLEVBQUUsRUFBcEIsQ0FBb0IsRUFBQztnQ0FDckQsSUFBSSxHQUFHLEVBQUU7O3dDQUNELGNBQWMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQzs7d0NBQ3pELFNBQVMsR0FBRyxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU07b0NBQ3pELEdBQUcsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztpQ0FDaEQ7OztnQ0FOSCxLQUF1QixJQUFBLG9CQUFBLFNBQUEsUUFBUSxDQUFDLElBQUksQ0FBQSxDQUFBLGdCQUFBO29DQUEvQixJQUFNLFFBQVEsV0FBQTs0Q0FBUixRQUFRO2lDQU9sQjs7Ozs7Ozs7O3lCQUNGOzs7d0JBYkgsS0FBdUIsSUFBQSxrQkFBQSxTQUFBLGFBQWEsQ0FBQSw0Q0FBQTs0QkFBL0IsSUFBTSxRQUFRLDBCQUFBO29DQUFSLFFBQVE7eUJBY2xCOzs7Ozs7Ozs7aUJBQ0Y7Z0JBQ0QsTUFBTTtZQUNSLEtBQUssYUFBYTtnQkFDaEIsTUFBTTtTQUNUO0lBQ0gsQ0FBQyxFQUFDO1NBQ0QsUUFBUSxFQUFFLENBQUM7SUFFWiw4QkFBOEIsRUFBRSxDQUFDO0FBQ3JDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQsIFBibENvbHVtbkRlZmluaXRpb24sIFBibENvbHVtbiwgdXRpbHMgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyIH0gZnJvbSAnLi4vLi4vaGFuZGxpbmcnO1xuaW1wb3J0IHsgc3RhdGVWaXNvciB9IGZyb20gJy4uLy4uL3N0YXRlLXZpc29yJztcbmltcG9ydCB7IFN0YXRlQ2h1bmtzLCBQYmxOZ3JpZFN0YXRlQ2h1bmtDb250ZXh0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IFBibE5ncmlkTWV0YVJvd1NldFN0YXRlLCBQYmxOZ3JpZE1ldGFDb2x1bW5TdGF0ZSwgUGJsTmdyaWRHcm91cENvbHVtblN0YXRlLCBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZSB9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHsgcmVnaXN0ZXJDb2x1bW5EZWZDaGlsZEhhbmRsZXJzIH0gZnJvbSAnLi9jaGlsZHJlbic7XG5cbmZ1bmN0aW9uIHJ1bkNoaWxkQ2h1bmtzRm9yUm93TWV0YUNvbHVtbnM8VENvbCwgVENoaWxkIGV4dGVuZHMga2V5b2YgU3RhdGVDaHVua3M+KGNoaWxkQ2h1bmtJZDogVENoaWxkLCBjdHg6IFBibE5ncmlkU3RhdGVDaHVua0NvbnRleHQ8XCJjb2x1bW5zXCI+LCBjb2x1bW5zOiBUQ29sW10pIHtcbiAgY29uc3Qgc3RhdGVDb2x1bW5zID0gW107XG4gIGZvciAoY29uc3QgY29sIG9mIGNvbHVtbnMpIHtcbiAgICBjb25zdCBjOiBTdGF0ZUNodW5rc1tUQ2hpbGRdWydzdGF0ZSddID0ge30gYXMgYW55O1xuICAgIGN0eC5ydW5DaGlsZENodW5rKGNoaWxkQ2h1bmtJZCwgYywgY29sKTtcbiAgICBzdGF0ZUNvbHVtbnMucHVzaChjKTtcbiAgfVxuICByZXR1cm4gc3RhdGVDb2x1bW5zO1xufVxuXG4vKiogUnVucyB0aGUgcHJvY2VzcyBmb3IgdGhlIGBoZWFkZXJgIGFuZCBgZm9vdGVyYCBzZWN0aW9ucyBpbiB0aGUgYHRhYmxlYCBzZWN0aW9uIChpZiB0aGV5IGV4aXN0KSAqL1xuZnVuY3Rpb24gcnVuQ2hpbGRDaHVua0ZvckRhdGFNZXRhUm93cyhtb2RlOiAncycgfCAnZCcsIHN0YXRlOiBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZVsndGFibGUnXSwgY3R4OiBQYmxOZ3JpZFN0YXRlQ2h1bmtDb250ZXh0PFwiY29sdW1uc1wiPikge1xuICBjb25zdCB7IGNvbHVtblN0b3JlIH0gPSBjdHguZXh0QXBpO1xuICBjb25zdCB7IHRhYmxlIH0gPSBjdHguc291cmNlO1xuICBmb3IgKGNvbnN0IGtpbmQgb2YgWydoZWFkZXInLCAnZm9vdGVyJ10gYXMgQXJyYXk8J2hlYWRlcicgfCAnZm9vdGVyJz4pIHtcbiAgICAvLyBUaGlzIGlzIGEgbWFwcGluZyBvZiB0aGUgZnJvbS0+dG8gcmVsYXRpb25zaGlwIChpLmUgc2VyaWFsaXppbmcgb3IgZGVzZXJpYWxpemluZylcbiAgICBjb25zdCBzcmMgPSBtb2RlID09PSAncycgPyB0YWJsZSA6IHN0YXRlO1xuICAgIGNvbnN0IGRlc3QgPSBzcmMgPT09IHRhYmxlID8gc3RhdGUgOiB0YWJsZTtcblxuICAgIC8vIHdlIG5lZWQgdG8gaGF2ZSBhIHNvdXJjZVxuICAgIGlmIChzcmNba2luZF0pIHtcbiAgICAgIGNvbnN0IGFjdGl2ZSA9IGtpbmQgPT09ICdoZWFkZXInID8gY29sdW1uU3RvcmUuaGVhZGVyQ29sdW1uRGVmIDogY29sdW1uU3RvcmUuZm9vdGVyQ29sdW1uRGVmO1xuICAgICAgaWYgKCFkZXN0W2tpbmRdKSB7IGRlc3Rba2luZF0gPSB7fTsgfVxuICAgICAgY3R4LnJ1bkNoaWxkQ2h1bmsoJ2RhdGFNZXRhUm93Jywgc3RhdGVba2luZF0sIHRhYmxlW2tpbmRdLCB7IGtpbmQsIGFjdGl2ZSB9KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcnVuQ2hpbGRDaHVua3NGb3JSb3dEYXRhQ29sdW1ucyhtb2RlOiAncycgfCAnZCcsIHN0YXRlOiBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZVsndGFibGUnXSwgY3R4OiBQYmxOZ3JpZFN0YXRlQ2h1bmtDb250ZXh0PFwiY29sdW1uc1wiPikge1xuICBjb25zdCB7IHRhYmxlIH0gPSBjdHguc291cmNlO1xuICBjb25zdCBzcmMgPSBtb2RlID09PSAncycgPyB0YWJsZSA6IHN0YXRlO1xuXG4gIGNvbnN0IHJlc29sdmUgPSBzcmMgPT09IHN0YXRlXG4gICAgPyBjb2wgPT4gKHsgY29sU3RhdGU6IGNvbCwgcGJsQ29sdW1uOiB0YWJsZS5jb2xzLmZpbmQoIHRDb2wgPT4gKHV0aWxzLmlzUGJsQ29sdW1uKHRDb2wpICYmIHRDb2wub3JnUHJvcCA9PT0gY29sLnByb3ApIHx8ICh0Q29sLmlkID09PSBjb2wuaWQgfHwgdENvbC5wcm9wID09PSBjb2wucHJvcCkgKSB9KVxuICAgIDogY29sID0+ICh7IGNvbFN0YXRlOiBzdGF0ZS5jb2xzW3N0YXRlLmNvbHMucHVzaCh7fSBhcyBhbnkpIC0gMV0gLCBwYmxDb2x1bW46IHV0aWxzLmlzUGJsQ29sdW1uKGNvbCkgJiYgY29sIH0pXG4gIDtcblxuICBpZiAoc3JjLmNvbHMgJiYgc3JjLmNvbHMubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgY29sIG9mIHNyYy5jb2xzKSB7XG4gICAgICBjb25zdCB7IGNvbFN0YXRlLCBwYmxDb2x1bW4gfSA9IHJlc29sdmUoY29sKVxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBwYmxDb2x1bW46IHV0aWxzLmlzUGJsQ29sdW1uKHBibENvbHVtbikgJiYgcGJsQ29sdW1uLFxuICAgICAgICBhY3RpdmVDb2x1bW46IGN0eC5ncmlkLmNvbHVtbkFwaS5maW5kQ29sdW1uKGNvbC5pZCB8fCBjb2wucHJvcCksXG4gICAgICB9XG4gICAgICBjdHgucnVuQ2hpbGRDaHVuaygnZGF0YUNvbHVtbicsIGNvbFN0YXRlLCBwYmxDb2x1bW4sIGRhdGEpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDb2x1bW5EZWZIYW5kbGVycygpIHtcbiAgc3RhdGVWaXNvci5yZWdpc3RlclJvb3RDaHVua1NlY3Rpb24oXG4gICAgJ2NvbHVtbnMnLFxuICAgIHtcbiAgICAgIHNvdXJjZU1hdGNoZXI6IGN0eCA9PiBjdHguZ3JpZC5jb2x1bW5zLFxuICAgICAgc3RhdGVNYXRjaGVyOiBzdGF0ZSA9PiBzdGF0ZS5jb2x1bW5zIHx8IChzdGF0ZS5jb2x1bW5zID0ge1xuICAgICAgICB0YWJsZToge1xuICAgICAgICAgIGNvbHM6IFtdLFxuICAgICAgICB9LFxuICAgICAgICBoZWFkZXI6IFtdLFxuICAgICAgICBmb290ZXI6IFtdLFxuICAgICAgICBoZWFkZXJHcm91cDogW10sXG4gICAgICB9KVxuICAgIH1cbiAgKTtcblxuICBjcmVhdGVTdGF0ZUNodW5rSGFuZGxlcignY29sdW1ucycpXG4gICAgLmhhbmRsZUtleXMoJ3RhYmxlJywgJ2hlYWRlcicsICdoZWFkZXJHcm91cCcsICdmb290ZXInKVxuICAgIC5zZXJpYWxpemUoIChrZXksIGN0eCkgPT4ge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAndGFibGUnOlxuICAgICAgICAgIGNvbnN0IHN0YXRlOiBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZVsndGFibGUnXSA9IHsgY29sczogW10gfTtcbiAgICAgICAgICBydW5DaGlsZENodW5rRm9yRGF0YU1ldGFSb3dzKCdzJywgc3RhdGUsIGN0eCk7XG4gICAgICAgICAgcnVuQ2hpbGRDaHVua3NGb3JSb3dEYXRhQ29sdW1ucygncycsIHN0YXRlLCBjdHgpO1xuICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICBjb25zdCBzb3VyY2UgPSBjdHguc291cmNlW2tleV07XG4gICAgICAgICAgaWYgKHNvdXJjZSAmJiBzb3VyY2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3Qgcm93cyA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCByb3cgb2Ygc291cmNlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IGN0eC5leHRBcGkuY29sdW1uU3RvcmUubWV0YUNvbHVtbklkc1trZXldLmZpbmQoIHIgPT4gIXIuaXNHcm91cCAmJiByLnJvd0RlZi5yb3dJbmRleCA9PT0gcm93LnJvd0luZGV4ICk7XG4gICAgICAgICAgICAgIGNvbnN0IHI6IFBibE5ncmlkTWV0YVJvd1NldFN0YXRlPFBibE5ncmlkTWV0YUNvbHVtblN0YXRlPiA9IHt9IGFzIGFueTtcbiAgICAgICAgICAgICAgY3R4LnJ1bkNoaWxkQ2h1bmsoJ21ldGFSb3cnLCByLCByb3cpO1xuICAgICAgICAgICAgICByLmNvbHMgPSBydW5DaGlsZENodW5rc0ZvclJvd01ldGFDb2x1bW5zKCdtZXRhQ29sdW1uJywgY3R4LCByb3cuY29scyk7XG4gICAgICAgICAgICAgIHJvd3MucHVzaChyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByb3dzO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaGVhZGVyR3JvdXAnOlxuICAgICAgICAgIGNvbnN0IGhlYWRlckdyb3VwU291cmNlID0gY3R4LnNvdXJjZS5oZWFkZXJHcm91cDtcbiAgICAgICAgICBpZiAoaGVhZGVyR3JvdXBTb3VyY2UgJiYgaGVhZGVyR3JvdXBTb3VyY2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3Qgcm93cyA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCByb3cgb2YgaGVhZGVyR3JvdXBTb3VyY2UpIHtcbiAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gY3R4LmV4dEFwaS5jb2x1bW5TdG9yZS5tZXRhQ29sdW1uSWRzLmhlYWRlci5maW5kKCByID0+ICFyLmlzR3JvdXAgJiYgci5yb3dEZWYucm93SW5kZXggPT09IHJvdy5yb3dJbmRleCApO1xuICAgICAgICAgICAgICBjb25zdCByOiBQYmxOZ3JpZE1ldGFSb3dTZXRTdGF0ZTxQYmxOZ3JpZEdyb3VwQ29sdW1uU3RhdGU+ID0ge30gYXMgYW55O1xuICAgICAgICAgICAgICBjdHgucnVuQ2hpbGRDaHVuaygnbWV0YUdyb3VwUm93Jywgciwgcm93KTtcbiAgICAgICAgICAgICAgci5jb2xzID0gcnVuQ2hpbGRDaHVua3NGb3JSb3dNZXRhQ29sdW1ucygnbWV0YUNvbHVtbicsIGN0eCwgcm93LmNvbHMpO1xuICAgICAgICAgICAgICByb3dzLnB1c2gocik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcm93cztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSlcbiAgICAuZGVzZXJpYWxpemUoIChrZXksIHN0YXRlVmFsdWUsIGN0eCkgPT4ge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAndGFibGUnOlxuICAgICAgICAgIGNvbnN0IHN0YXRlID0gc3RhdGVWYWx1ZSBhcyBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZVsndGFibGUnXTtcbiAgICAgICAgICBydW5DaGlsZENodW5rRm9yRGF0YU1ldGFSb3dzKCdkJywgc3RhdGUsIGN0eCk7XG4gICAgICAgICAgcnVuQ2hpbGRDaHVua3NGb3JSb3dEYXRhQ29sdW1ucygnZCcsIHN0YXRlLCBjdHgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IGN0eC5zb3VyY2Vba2V5XTtcbiAgICAgICAgICBjb25zdCBtZXRhUm93c1N0YXRlID0gc3RhdGVWYWx1ZSBhcyBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZVsnaGVhZGVyJ107XG4gICAgICAgICAgaWYgKG1ldGFSb3dzU3RhdGUgJiYgbWV0YVJvd3NTdGF0ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJvd1N0YXRlIG9mIG1ldGFSb3dzU3RhdGUpIHtcbiAgICAgICAgICAgICAgY29uc3Qgcm93ID0gc291cmNlLmZpbmQoIHIgPT4gci5yb3dJbmRleCA9PT0gcm93U3RhdGUucm93SW5kZXggKTtcbiAgICAgICAgICAgICAgaWYgKHJvdykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IGN0eC5leHRBcGkuY29sdW1uU3RvcmUubWV0YUNvbHVtbklkc1trZXldLmZpbmQoIHIgPT4gIXIuaXNHcm91cCAmJiByLnJvd0RlZi5yb3dJbmRleCA9PT0gcm93U3RhdGUucm93SW5kZXggKTtcbiAgICAgICAgICAgICAgICBjdHgucnVuQ2hpbGRDaHVuaygnbWV0YVJvdycsIHJvd1N0YXRlLCByb3cpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY29sU3RhdGUgb2Ygcm93U3RhdGUuY29scykge1xuICAgICAgICAgICAgICAgICAgY29uc3QgY29sID0gcm93LmNvbHMuZmluZCggciA9PiByLmlkID09PSBjb2xTdGF0ZS5pZCk7XG4gICAgICAgICAgICAgICAgICBpZiAoY29sKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUNvbFN0b3JlID0gY3R4LmV4dEFwaS5jb2x1bW5TdG9yZS5maW5kKGNvbFN0YXRlLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlQ29sID0gYWN0aXZlQ29sU3RvcmUgJiYgYWN0aXZlQ29sU3RvcmUuaGVhZGVyO1xuICAgICAgICAgICAgICAgICAgICBjdHgucnVuQ2hpbGRDaHVuaygnbWV0YUNvbHVtbicsIGNvbFN0YXRlLCBjb2wpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaGVhZGVyR3JvdXAnOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pXG4gICAgLnJlZ2lzdGVyKCk7XG5cbiAgICByZWdpc3RlckNvbHVtbkRlZkNoaWxkSGFuZGxlcnMoKTtcbn1cblxuZXhwb3J0IHtcbiAgUGJsTmdyaWRNZXRhQ29sdW1uU3RhdGUsXG4gIFBibE5ncmlkR3JvdXBDb2x1bW5TdGF0ZSxcbiAgUGJsTmdyaWRDb2x1bW5TdGF0ZSxcbiAgUGJsTmdyaWRNZXRhUm93U3RhdGUsXG4gIFBibE5ncmlkTWV0YVJvd1NldFN0YXRlLFxuICBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZSxcbn0gZnJvbSAnLi9tb2RlbCc7XG4iXX0=