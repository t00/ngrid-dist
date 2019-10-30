/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
        for (var columns_1 = tslib_1.__values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
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
        for (var _b = tslib_1.__values((/** @type {?} */ (['header', 'footer']))), _c = _b.next(); !_c.done; _c = _b.next()) {
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
            for (var _b = tslib_1.__values(src.cols), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                        for (var source_1 = tslib_1.__values(source), source_1_1 = source_1.next(); !source_1_1.done; source_1_1 = source_1.next()) {
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
                        for (var headerGroupSource_1 = tslib_1.__values(headerGroupSource), headerGroupSource_1_1 = headerGroupSource_1.next(); !headerGroupSource_1_1.done; headerGroupSource_1_1 = headerGroupSource_1.next()) {
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
                                for (var _b = tslib_1.__values(rowState.cols), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                        for (var metaRowsState_1 = tslib_1.__values(metaRowsState), metaRowsState_1_1 = metaRowsState_1.next(); !metaRowsState_1_1.done; metaRowsState_1_1 = metaRowsState_1.next()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvYnVpbHQtaW4taGFuZGxlcnMvY29sdW1uLWRlZi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBK0QsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25HLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUcvQyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7Ozs7O0FBRTVELFNBQVMsK0JBQStCLENBQXlDLFlBQW9CLEVBQUUsR0FBeUMsRUFBRSxPQUFlOzs7UUFDekosWUFBWSxHQUFHLEVBQUU7O1FBQ3ZCLEtBQWtCLElBQUEsWUFBQSxpQkFBQSxPQUFPLENBQUEsZ0NBQUEscURBQUU7WUFBdEIsSUFBTSxHQUFHLG9CQUFBOztnQkFDTixDQUFDLEdBQWlDLG1CQUFBLEVBQUUsRUFBTztZQUNqRCxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDeEMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0Qjs7Ozs7Ozs7O0lBQ0QsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQzs7Ozs7Ozs7QUFHRCxTQUFTLDRCQUE0QixDQUFDLElBQWUsRUFBRSxLQUFnRCxFQUFFLEdBQXlDOztJQUN4SSxJQUFBLG9DQUFXO0lBQ1gsSUFBQSx3QkFBSzs7UUFDYiwrQkFBbUIsbUJBQUEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQThCLDZDQUFFO1lBQWxFLElBQU0sSUFBSSxXQUFBOzs7Z0JBRVAsR0FBRyxHQUFHLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENB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LENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxRQUFRLEVBQXJELENBQXFELEVBQUU7NEJBQzNILEdBQUcsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztvREFDakMsUUFBUTs7b0NBQ1gsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTs7OztnQ0FBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxFQUFFLEtBQUssUUFBUSxDQUFDLEVBQUUsRUFBcEIsQ0FBb0IsRUFBQztnQ0FDckQsSUFBSSxHQUFHLEVBQUU7O3dDQUNELGNBQWMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQzs7d0NBQ3pELFNBQVMsR0FBRyxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU07b0NBQ3pELEdBQUcsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztpQ0FDaEQ7OztnQ0FOSCxLQUF1QixJQUFBLEtBQUEsaUJBQUEsUUFBUSxDQUFDLElBQUksQ0FBQSxnQkFBQTtvQ0FBL0IsSUFBTSxRQUFRLFdBQUE7NENBQVIsUUFBUTtpQ0FPbEI7Ozs7Ozs7Ozt5QkFDRjs7O3dCQWJILEtBQXVCLElBQUEsa0JBQUEsaUJBQUEsYUFBYSxDQUFBLDRDQUFBOzRCQUEvQixJQUFNLFFBQVEsMEJBQUE7b0NBQVIsUUFBUTt5QkFjbEI7Ozs7Ozs7OztpQkFDRjtnQkFDRCxNQUFNO1lBQ1IsS0FBSyxhQUFhO2dCQUNoQixNQUFNO1NBQ1Q7SUFDSCxDQUFDLEVBQUM7U0FDRCxRQUFRLEVBQUUsQ0FBQztJQUVaLDhCQUE4QixFQUFFLENBQUM7QUFDckMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCwgUGJsQ29sdW1uRGVmaW5pdGlvbiwgUGJsQ29sdW1uLCB1dGlscyB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgY3JlYXRlU3RhdGVDaHVua0hhbmRsZXIgfSBmcm9tICcuLi8uLi9oYW5kbGluZyc7XG5pbXBvcnQgeyBzdGF0ZVZpc29yIH0gZnJvbSAnLi4vLi4vc3RhdGUtdmlzb3InO1xuaW1wb3J0IHsgU3RhdGVDaHVua3MsIFBibE5ncmlkU3RhdGVDaHVua0NvbnRleHQgfSBmcm9tICcuLi8uLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgUGJsTmdyaWRNZXRhUm93U2V0U3RhdGUsIFBibE5ncmlkTWV0YUNvbHVtblN0YXRlLCBQYmxOZ3JpZEdyb3VwQ29sdW1uU3RhdGUsIFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldFN0YXRlIH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQgeyByZWdpc3RlckNvbHVtbkRlZkNoaWxkSGFuZGxlcnMgfSBmcm9tICcuL2NoaWxkcmVuJztcblxuZnVuY3Rpb24gcnVuQ2hpbGRDaHVua3NGb3JSb3dNZXRhQ29sdW1uczxUQ29sLCBUQ2hpbGQgZXh0ZW5kcyBrZXlvZiBTdGF0ZUNodW5rcz4oY2hpbGRDaHVua0lkOiBUQ2hpbGQsIGN0eDogUGJsTmdyaWRTdGF0ZUNodW5rQ29udGV4dDxcImNvbHVtbnNcIj4sIGNvbHVtbnM6IFRDb2xbXSkge1xuICBjb25zdCBzdGF0ZUNvbHVtbnMgPSBbXTtcbiAgZm9yIChjb25zdCBjb2wgb2YgY29sdW1ucykge1xuICAgIGNvbnN0IGM6IFN0YXRlQ2h1bmtzW1RDaGlsZF1bJ3N0YXRlJ10gPSB7fSBhcyBhbnk7XG4gICAgY3R4LnJ1bkNoaWxkQ2h1bmsoY2hpbGRDaHVua0lkLCBjLCBjb2wpO1xuICAgIHN0YXRlQ29sdW1ucy5wdXNoKGMpO1xuICB9XG4gIHJldHVybiBzdGF0ZUNvbHVtbnM7XG59XG5cbi8qKiBSdW5zIHRoZSBwcm9jZXNzIGZvciB0aGUgYGhlYWRlcmAgYW5kIGBmb290ZXJgIHNlY3Rpb25zIGluIHRoZSBgdGFibGVgIHNlY3Rpb24gKGlmIHRoZXkgZXhpc3QpICovXG5mdW5jdGlvbiBydW5DaGlsZENodW5rRm9yRGF0YU1ldGFSb3dzKG1vZGU6ICdzJyB8ICdkJywgc3RhdGU6IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldFN0YXRlWyd0YWJsZSddLCBjdHg6IFBibE5ncmlkU3RhdGVDaHVua0NvbnRleHQ8XCJjb2x1bW5zXCI+KSB7XG4gIGNvbnN0IHsgY29sdW1uU3RvcmUgfSA9IGN0eC5leHRBcGk7XG4gIGNvbnN0IHsgdGFibGUgfSA9IGN0eC5zb3VyY2U7XG4gIGZvciAoY29uc3Qga2luZCBvZiBbJ2hlYWRlcicsICdmb290ZXInXSBhcyBBcnJheTwnaGVhZGVyJyB8ICdmb290ZXInPikge1xuICAgIC8vIFRoaXMgaXMgYSBtYXBwaW5nIG9mIHRoZSBmcm9tLT50byByZWxhdGlvbnNoaXAgKGkuZSBzZXJpYWxpemluZyBvciBkZXNlcmlhbGl6aW5nKVxuICAgIGNvbnN0IHNyYyA9IG1vZGUgPT09ICdzJyA/IHRhYmxlIDogc3RhdGU7XG4gICAgY29uc3QgZGVzdCA9IHNyYyA9PT0gdGFibGUgPyBzdGF0ZSA6IHRhYmxlO1xuXG4gICAgLy8gd2UgbmVlZCB0byBoYXZlIGEgc291cmNlXG4gICAgaWYgKHNyY1traW5kXSkge1xuICAgICAgY29uc3QgYWN0aXZlID0ga2luZCA9PT0gJ2hlYWRlcicgPyBjb2x1bW5TdG9yZS5oZWFkZXJDb2x1bW5EZWYgOiBjb2x1bW5TdG9yZS5mb290ZXJDb2x1bW5EZWY7XG4gICAgICBpZiAoIWRlc3Rba2luZF0pIHsgZGVzdFtraW5kXSA9IHt9OyB9XG4gICAgICBjdHgucnVuQ2hpbGRDaHVuaygnZGF0YU1ldGFSb3cnLCBzdGF0ZVtraW5kXSwgdGFibGVba2luZF0sIHsga2luZCwgYWN0aXZlIH0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBydW5DaGlsZENodW5rc0ZvclJvd0RhdGFDb2x1bW5zKG1vZGU6ICdzJyB8ICdkJywgc3RhdGU6IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldFN0YXRlWyd0YWJsZSddLCBjdHg6IFBibE5ncmlkU3RhdGVDaHVua0NvbnRleHQ8XCJjb2x1bW5zXCI+KSB7XG4gIGNvbnN0IHsgdGFibGUgfSA9IGN0eC5zb3VyY2U7XG4gIGNvbnN0IHNyYyA9IG1vZGUgPT09ICdzJyA/IHRhYmxlIDogc3RhdGU7XG5cbiAgY29uc3QgcmVzb2x2ZSA9IHNyYyA9PT0gc3RhdGVcbiAgICA/IGNvbCA9PiAoeyBjb2xTdGF0ZTogY29sLCBwYmxDb2x1bW46IHRhYmxlLmNvbHMuZmluZCggdENvbCA9PiAodXRpbHMuaXNQYmxDb2x1bW4odENvbCkgJiYgdENvbC5vcmdQcm9wID09PSBjb2wucHJvcCkgfHwgKHRDb2wuaWQgPT09IGNvbC5pZCB8fCB0Q29sLnByb3AgPT09IGNvbC5wcm9wKSApIH0pXG4gICAgOiBjb2wgPT4gKHsgY29sU3RhdGU6IHN0YXRlLmNvbHNbc3RhdGUuY29scy5wdXNoKHt9IGFzIGFueSkgLSAxXSAsIHBibENvbHVtbjogdXRpbHMuaXNQYmxDb2x1bW4oY29sKSAmJiBjb2wgfSlcbiAgO1xuXG4gIGlmIChzcmMuY29scyAmJiBzcmMuY29scy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBjb2wgb2Ygc3JjLmNvbHMpIHtcbiAgICAgIGNvbnN0IHsgY29sU3RhdGUsIHBibENvbHVtbiB9ID0gcmVzb2x2ZShjb2wpXG5cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHBibENvbHVtbjogdXRpbHMuaXNQYmxDb2x1bW4ocGJsQ29sdW1uKSAmJiBwYmxDb2x1bW4sXG4gICAgICAgIGFjdGl2ZUNvbHVtbjogY3R4LmdyaWQuY29sdW1uQXBpLmZpbmRDb2x1bW4oY29sLmlkIHx8IGNvbC5wcm9wKSxcbiAgICAgIH1cbiAgICAgIGN0eC5ydW5DaGlsZENodW5rKCdkYXRhQ29sdW1uJywgY29sU3RhdGUsIHBibENvbHVtbiwgZGF0YSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckNvbHVtbkRlZkhhbmRsZXJzKCkge1xuICBzdGF0ZVZpc29yLnJlZ2lzdGVyUm9vdENodW5rU2VjdGlvbihcbiAgICAnY29sdW1ucycsXG4gICAge1xuICAgICAgc291cmNlTWF0Y2hlcjogY3R4ID0+IGN0eC5ncmlkLmNvbHVtbnMsXG4gICAgICBzdGF0ZU1hdGNoZXI6IHN0YXRlID0+IHN0YXRlLmNvbHVtbnMgfHwgKHN0YXRlLmNvbHVtbnMgPSB7XG4gICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgY29sczogW10sXG4gICAgICAgIH0sXG4gICAgICAgIGhlYWRlcjogW10sXG4gICAgICAgIGZvb3RlcjogW10sXG4gICAgICAgIGhlYWRlckdyb3VwOiBbXSxcbiAgICAgIH0pXG4gICAgfVxuICApO1xuXG4gIGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyKCdjb2x1bW5zJylcbiAgICAuaGFuZGxlS2V5cygndGFibGUnLCAnaGVhZGVyJywgJ2hlYWRlckdyb3VwJywgJ2Zvb3RlcicpXG4gICAgLnNlcmlhbGl6ZSggKGtleSwgY3R4KSA9PiB7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlICd0YWJsZSc6XG4gICAgICAgICAgY29uc3Qgc3RhdGU6IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldFN0YXRlWyd0YWJsZSddID0geyBjb2xzOiBbXSB9O1xuICAgICAgICAgIHJ1bkNoaWxkQ2h1bmtGb3JEYXRhTWV0YVJvd3MoJ3MnLCBzdGF0ZSwgY3R4KTtcbiAgICAgICAgICBydW5DaGlsZENodW5rc0ZvclJvd0RhdGFDb2x1bW5zKCdzJywgc3RhdGUsIGN0eCk7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IGN0eC5zb3VyY2Vba2V5XTtcbiAgICAgICAgICBpZiAoc291cmNlICYmIHNvdXJjZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCByb3dzID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJvdyBvZiBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gY3R4LmV4dEFwaS5jb2x1bW5TdG9yZS5tZXRhQ29sdW1uSWRzW2tleV0uZmluZCggciA9PiAhci5pc0dyb3VwICYmIHIucm93RGVmLnJvd0luZGV4ID09PSByb3cucm93SW5kZXggKTtcbiAgICAgICAgICAgICAgY29uc3QgcjogUGJsTmdyaWRNZXRhUm93U2V0U3RhdGU8UGJsTmdyaWRNZXRhQ29sdW1uU3RhdGU+ID0ge30gYXMgYW55O1xuICAgICAgICAgICAgICBjdHgucnVuQ2hpbGRDaHVuaygnbWV0YVJvdycsIHIsIHJvdyk7XG4gICAgICAgICAgICAgIHIuY29scyA9IHJ1bkNoaWxkQ2h1bmtzRm9yUm93TWV0YUNvbHVtbnMoJ21ldGFDb2x1bW4nLCBjdHgsIHJvdy5jb2xzKTtcbiAgICAgICAgICAgICAgcm93cy5wdXNoKHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJvd3M7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdoZWFkZXJHcm91cCc6XG4gICAgICAgICAgY29uc3QgaGVhZGVyR3JvdXBTb3VyY2UgPSBjdHguc291cmNlLmhlYWRlckdyb3VwO1xuICAgICAgICAgIGlmIChoZWFkZXJHcm91cFNvdXJjZSAmJiBoZWFkZXJHcm91cFNvdXJjZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCByb3dzID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJvdyBvZiBoZWFkZXJHcm91cFNvdXJjZSkge1xuICAgICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBjdHguZXh0QXBpLmNvbHVtblN0b3JlLm1ldGFDb2x1bW5JZHMuaGVhZGVyLmZpbmQoIHIgPT4gIXIuaXNHcm91cCAmJiByLnJvd0RlZi5yb3dJbmRleCA9PT0gcm93LnJvd0luZGV4ICk7XG4gICAgICAgICAgICAgIGNvbnN0IHI6IFBibE5ncmlkTWV0YVJvd1NldFN0YXRlPFBibE5ncmlkR3JvdXBDb2x1bW5TdGF0ZT4gPSB7fSBhcyBhbnk7XG4gICAgICAgICAgICAgIGN0eC5ydW5DaGlsZENodW5rKCdtZXRhR3JvdXBSb3cnLCByLCByb3cpO1xuICAgICAgICAgICAgICByLmNvbHMgPSBydW5DaGlsZENodW5rc0ZvclJvd01ldGFDb2x1bW5zKCdtZXRhQ29sdW1uJywgY3R4LCByb3cuY29scyk7XG4gICAgICAgICAgICAgIHJvd3MucHVzaChyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByb3dzO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KVxuICAgIC5kZXNlcmlhbGl6ZSggKGtleSwgc3RhdGVWYWx1ZSwgY3R4KSA9PiB7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlICd0YWJsZSc6XG4gICAgICAgICAgY29uc3Qgc3RhdGUgPSBzdGF0ZVZhbHVlIGFzIFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldFN0YXRlWyd0YWJsZSddO1xuICAgICAgICAgIHJ1bkNoaWxkQ2h1bmtGb3JEYXRhTWV0YVJvd3MoJ2QnLCBzdGF0ZSwgY3R4KTtcbiAgICAgICAgICBydW5DaGlsZENodW5rc0ZvclJvd0RhdGFDb2x1bW5zKCdkJywgc3RhdGUsIGN0eCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgY29uc3Qgc291cmNlID0gY3R4LnNvdXJjZVtrZXldO1xuICAgICAgICAgIGNvbnN0IG1ldGFSb3dzU3RhdGUgPSBzdGF0ZVZhbHVlIGFzIFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldFN0YXRlWydoZWFkZXInXTtcbiAgICAgICAgICBpZiAobWV0YVJvd3NTdGF0ZSAmJiBtZXRhUm93c1N0YXRlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgcm93U3RhdGUgb2YgbWV0YVJvd3NTdGF0ZSkge1xuICAgICAgICAgICAgICBjb25zdCByb3cgPSBzb3VyY2UuZmluZCggciA9PiByLnJvd0luZGV4ID09PSByb3dTdGF0ZS5yb3dJbmRleCApO1xuICAgICAgICAgICAgICBpZiAocm93KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gY3R4LmV4dEFwaS5jb2x1bW5TdG9yZS5tZXRhQ29sdW1uSWRzW2tleV0uZmluZCggciA9PiAhci5pc0dyb3VwICYmIHIucm93RGVmLnJvd0luZGV4ID09PSByb3dTdGF0ZS5yb3dJbmRleCApO1xuICAgICAgICAgICAgICAgIGN0eC5ydW5DaGlsZENodW5rKCdtZXRhUm93Jywgcm93U3RhdGUsIHJvdyk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjb2xTdGF0ZSBvZiByb3dTdGF0ZS5jb2xzKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSByb3cuY29scy5maW5kKCByID0+IHIuaWQgPT09IGNvbFN0YXRlLmlkKTtcbiAgICAgICAgICAgICAgICAgIGlmIChjb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlQ29sU3RvcmUgPSBjdHguZXh0QXBpLmNvbHVtblN0b3JlLmZpbmQoY29sU3RhdGUuaWQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVDb2wgPSBhY3RpdmVDb2xTdG9yZSAmJiBhY3RpdmVDb2xTdG9yZS5oZWFkZXI7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5ydW5DaGlsZENodW5rKCdtZXRhQ29sdW1uJywgY29sU3RhdGUsIGNvbCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdoZWFkZXJHcm91cCc6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSlcbiAgICAucmVnaXN0ZXIoKTtcblxuICAgIHJlZ2lzdGVyQ29sdW1uRGVmQ2hpbGRIYW5kbGVycygpO1xufVxuXG5leHBvcnQge1xuICBQYmxOZ3JpZE1ldGFDb2x1bW5TdGF0ZSxcbiAgUGJsTmdyaWRHcm91cENvbHVtblN0YXRlLFxuICBQYmxOZ3JpZENvbHVtblN0YXRlLFxuICBQYmxOZ3JpZE1ldGFSb3dTdGF0ZSxcbiAgUGJsTmdyaWRNZXRhUm93U2V0U3RhdGUsXG4gIFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldFN0YXRlLFxufSBmcm9tICcuL21vZGVsJztcbiJdfQ==