/**
 * @fileoverview added by tsickle
 * Generated from: lib/clipboard.plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __values } from "tslib";
import { filter } from 'rxjs/operators';
import { Directive, Injector, Input } from '@angular/core';
// import { Clipboard } from '@angular/cdk-experimental/clipboard';
// TODO: remove internal implementation in the next version of cdk-experimental (right after 8.1.3)
import { Clipboard } from './clipboard.service';
import { PblNgridComponent, PblNgridPluginController, PblNgridConfigService, utils } from '@pebula/ngrid';
/** @type {?} */
var IS_OSX = /^mac/.test(navigator.platform.toLowerCase());
/** @type {?} */
var DEFAULT_CELL_SEP = '\t';
/** @type {?} */
var DEFAULT_ROW_SEP = '\n';
/** @type {?} */
export var PLUGIN_KEY = 'clipboard';
var PblNgridClipboardPlugin = /** @class */ (function () {
    function PblNgridClipboardPlugin(grid, injector, pluginCtrl) {
        this.grid = grid;
        this.injector = injector;
        this.pluginCtrl = pluginCtrl;
        this.config = injector.get(PblNgridConfigService);
        this.clipboard = injector.get(Clipboard);
        this.init();
    }
    /**
     * @param {?} grid
     * @param {?} injector
     * @return {?}
     */
    PblNgridClipboardPlugin.create = /**
     * @param {?} grid
     * @param {?} injector
     * @return {?}
     */
    function (grid, injector) {
        /** @type {?} */
        var pluginCtrl = PblNgridPluginController.find(grid);
        return new PblNgridClipboardPlugin(grid, injector, pluginCtrl);
    };
    /**
     * @return {?}
     */
    PblNgridClipboardPlugin.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        utils.unrx.kill(this);
        this._removePlugin(this.grid);
    };
    /**
     * @protected
     * @param {?} event
     * @return {?}
     */
    PblNgridClipboardPlugin.prototype.isCopyEvent = /**
     * @protected
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event instanceof KeyboardEvent && event.key === 'c') {
            if ((!IS_OSX && event.ctrlKey) || (IS_OSX && event.metaKey)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @protected
     * @return {?}
     */
    PblNgridClipboardPlugin.prototype.doCopy = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        var _a = this.config.get('clipboard', {}), cellSeparator = _a.cellSeparator, rowSeparator = _a.rowSeparator;
        var _b = this.getSelectedRowData(this.grid), rows = _b.rows, minIndex = _b.minIndex;
        /** @type {?} */
        var createRow = (/**
         * @param {?} row
         * @return {?}
         */
        function (row) { return row.slice(minIndex).join(_this.clpCellSep || cellSeparator || DEFAULT_CELL_SEP); });
        // For each row (collection of items), slice the initial items that are not copied across all selections
        this.clipboard.copy(rows.map(createRow).join(this.clpRowSep || rowSeparator || DEFAULT_ROW_SEP));
        // TODO: Consider using `beginCopy` to support large copy operations
    };
    /**
     * @protected
     * @param {?} grid
     * @return {?}
     */
    PblNgridClipboardPlugin.prototype.getSelectedRowData = /**
     * @protected
     * @param {?} grid
     * @return {?}
     */
    function (grid) {
        var e_1, _a;
        var columnApi = grid.columnApi, contextApi = grid.contextApi;
        /** @type {?} */
        var data = new Map();
        // The minIndex represents the first column being copied out of all visible columns (0 being the first visible column).
        // For every selected cell, the column is tracked and it's index is being set to `minIndex` if it is lower then the current `minIndex` (Math.Min).
        // We start with the biggest int but right away get a valid column index...
        // Later on, each row is sliced to remove the items in indices lower then the `minIndex`.
        //
        // All of this is to make the paste start without leading cell separators.
        /** @type {?} */
        var minIndex = Number.MAX_SAFE_INTEGER;
        try {
            for (var _b = __values(contextApi.selectedCells), _c = _b.next(); !_c.done; _c = _b.next()) {
                var point = _c.value;
                /** @type {?} */
                var col = columnApi.columns[point.colIndex];
                if (col) {
                    /** @type {?} */
                    var colIndex = columnApi.renderIndexOf(col);
                    if (colIndex > -1) {
                        /** @type {?} */
                        var rowIndex = contextApi.findRowInCache(point.rowIdent).dataIndex;
                        /** @type {?} */
                        var dataItem = col.getValue(grid.ds.source[rowIndex]);
                        /** @type {?} */
                        var row = data.get(point.rowIdent) || [];
                        row[colIndex] = dataItem;
                        data.set(point.rowIdent, row);
                        minIndex = Math.min(minIndex, colIndex);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // contextApi.selectedCells are un-ordered, their order is based on the order in which user have selected cells.
        // It means that the row's will not paste in the proper order unless we re-order them based on the data index.
        // This is a very native and simple implementation that will hold most copy actions 1k +-
        // TODO: Consider a better logic, taking performance into consideration.
        /** @type {?} */
        var entries = Array.from(data.entries());
        entries.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) {
            /** @type {?} */
            var aIndex = contextApi.findRowInCache(a[0]).dataIndex;
            /** @type {?} */
            var bIndex = contextApi.findRowInCache(b[0]).dataIndex;
            if (aIndex < bIndex) {
                return -1;
            }
            else {
                return 1;
            }
        }));
        return {
            minIndex: minIndex,
            rows: entries.map((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e[1]; })),
        };
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridClipboardPlugin.prototype.init = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._removePlugin = this.pluginCtrl.setPlugin(PLUGIN_KEY, this);
        if (!this.pluginCtrl.hasPlugin('targetEvents')) {
            this.pluginCtrl.createPlugin('targetEvents');
        }
        /** @type {?} */
        var targetEvents = this.pluginCtrl.getPlugin('targetEvents');
        targetEvents.keyDown
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.isCopyEvent(event.source); })), utils.unrx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.doCopy(); }));
    };
    PblNgridClipboardPlugin.decorators = [
        { type: Directive, args: [{ selector: 'pbl-ngrid[clipboard]', exportAs: 'pblNgridClipboard' },] }
    ];
    /** @nocollapse */
    PblNgridClipboardPlugin.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
    PblNgridClipboardPlugin.propDecorators = {
        clpCellSep: [{ type: Input }],
        clpRowSep: [{ type: Input }]
    };
    return PblNgridClipboardPlugin;
}());
export { PblNgridClipboardPlugin };
if (false) {
    /**
     * The separator to use when multiple cells are copied.
     * If not set, taken from `PblNgridConfig.clipboard.cellSeparator`
     * \@default \t
     * @type {?}
     */
    PblNgridClipboardPlugin.prototype.clpCellSep;
    /**
     * The separator to use when multiple rows are copied
     * If not set, taken from `PblNgridConfig.clipboard.rowSeparator`
     * \@default \n
     * @type {?}
     */
    PblNgridClipboardPlugin.prototype.clpRowSep;
    /**
     * @type {?}
     * @private
     */
    PblNgridClipboardPlugin.prototype.config;
    /**
     * @type {?}
     * @private
     */
    PblNgridClipboardPlugin.prototype.clipboard;
    /**
     * @type {?}
     * @private
     */
    PblNgridClipboardPlugin.prototype._removePlugin;
    /** @type {?} */
    PblNgridClipboardPlugin.prototype.grid;
    /**
     * @type {?}
     * @protected
     */
    PblNgridClipboardPlugin.prototype.injector;
    /**
     * @type {?}
     * @protected
     */
    PblNgridClipboardPlugin.prototype.pluginCtrl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvY2xpcGJvYXJkLyIsInNvdXJjZXMiOlsibGliL2NsaXBib2FyZC5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFhLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBSXRFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQThCcEcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7SUFDdEQsZ0JBQWdCLEdBQUcsSUFBSTs7SUFDdkIsZUFBZSxHQUFHLElBQUk7O0FBRTVCLE1BQU0sS0FBTyxVQUFVLEdBQWdCLFdBQVc7QUFFbEQ7SUEwQkUsaUNBQW1CLElBQTRCLEVBQVksUUFBa0IsRUFBWSxVQUFvQztRQUExRyxTQUFJLEdBQUosSUFBSSxDQUF3QjtRQUFZLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBWSxlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUMzSCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7O0lBM0JNLDhCQUFNOzs7OztJQUFiLFVBQWMsSUFBdUIsRUFBRSxRQUFrQjs7WUFDakQsVUFBVSxHQUFHLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEQsT0FBTyxJQUFJLHVCQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDakUsQ0FBQzs7OztJQTBCRCw2Q0FBVzs7O0lBQVg7UUFDRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7SUFFUyw2Q0FBVzs7Ozs7SUFBckIsVUFBc0IsS0FBWTtRQUNoQyxJQUFJLEtBQUssWUFBWSxhQUFhLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQUU7WUFDdkQsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzNELE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7SUFFUyx3Q0FBTTs7OztJQUFoQjtRQUFBLGlCQVFDO1FBUE8sSUFBQSxxQ0FBa0UsRUFBaEUsZ0NBQWEsRUFBRSw4QkFBaUQ7UUFDbEUsSUFBQSx1Q0FBdUQsRUFBckQsY0FBSSxFQUFFLHNCQUErQzs7WUFDdkQsU0FBUzs7OztRQUFHLFVBQUMsR0FBVSxJQUFLLE9BQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsSUFBSSxhQUFhLElBQUksZ0JBQWdCLENBQUMsRUFBOUUsQ0FBOEUsQ0FBQTtRQUNoSCx3R0FBd0c7UUFFeEcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxZQUFZLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQztRQUNqRyxvRUFBb0U7SUFDdEUsQ0FBQzs7Ozs7O0lBRVMsb0RBQWtCOzs7OztJQUE1QixVQUE2QixJQUF1Qjs7UUFDMUMsSUFBQSwwQkFBUyxFQUFFLDRCQUFVOztZQUN2QixJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQWM7Ozs7Ozs7O1lBUTlCLFFBQVEsR0FBRyxNQUFNLENBQUMsZ0JBQWdCOztZQUV0QyxLQUFvQixJQUFBLEtBQUEsU0FBQSxVQUFVLENBQUMsYUFBYSxDQUFBLGdCQUFBLDRCQUFFO2dCQUF6QyxJQUFNLEtBQUssV0FBQTs7b0JBQ1IsR0FBRyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztnQkFDN0MsSUFBSSxHQUFHLEVBQUU7O3dCQUNELFFBQVEsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztvQkFDN0MsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUU7OzRCQUNYLFFBQVEsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTOzs0QkFDOUQsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7OzRCQUNqRCxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTt3QkFDMUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQzt3QkFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUM5QixRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7cUJBQ3pDO2lCQUNGO2FBQ0Y7Ozs7Ozs7Ozs7Ozs7O1lBT0ssT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxJQUFJOzs7OztRQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7O2dCQUNWLE1BQU0sR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7O2dCQUNsRCxNQUFNLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO1lBQ3hELElBQUksTUFBTSxHQUFHLE1BQU0sRUFBRTtnQkFDbkIsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNYO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxDQUFDO2FBQ1Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU87WUFDTCxRQUFRLFVBQUE7WUFDUixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUc7Ozs7WUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBSixDQUFJLEVBQUU7U0FDL0IsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRU8sc0NBQUk7Ozs7SUFBWjtRQUFBLGlCQWNDO1FBYkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFakUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzlDOztZQUVLLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7UUFDOUQsWUFBWSxDQUFDLE9BQU87YUFDakIsSUFBSSxDQUNILE1BQU07Ozs7UUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUE5QixDQUE4QixFQUFFLEVBQ2pELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2pCO2FBQ0EsU0FBUzs7OztRQUFFLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLE1BQU0sRUFBRSxFQUFiLENBQWEsRUFBRSxDQUFDO0lBQ3pDLENBQUM7O2dCQXZIRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFOzs7O2dCQXBDckUsaUJBQWlCO2dCQU5OLFFBQVE7Z0JBTUEsd0JBQXdCOzs7NkJBaURqRCxLQUFLOzRCQU9MLEtBQUs7O0lBb0dSLDhCQUFDO0NBQUEsQUF4SEQsSUF3SEM7U0F2SFksdUJBQXVCOzs7Ozs7OztJQVlsQyw2Q0FBNEI7Ozs7Ozs7SUFPNUIsNENBQTJCOzs7OztJQUUzQix5Q0FBc0M7Ozs7O0lBQ3RDLDRDQUE2Qjs7Ozs7SUFDN0IsZ0RBQXlEOztJQUU3Qyx1Q0FBbUM7Ozs7O0lBQUUsMkNBQTRCOzs7OztJQUFFLDZDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5qZWN0b3IsIE9uRGVzdHJveSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy8gaW1wb3J0IHsgQ2xpcGJvYXJkIH0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9jbGlwYm9hcmQnO1xuLy8gVE9ETzogcmVtb3ZlIGludGVybmFsIGltcGxlbWVudGF0aW9uIGluIHRoZSBuZXh0IHZlcnNpb24gb2YgY2RrLWV4cGVyaW1lbnRhbCAocmlnaHQgYWZ0ZXIgOC4xLjMpXG5pbXBvcnQgeyBDbGlwYm9hcmQgfSBmcm9tICcuL2NsaXBib2FyZC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRDb25maWdTZXJ2aWNlLCB1dGlscyB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgY2xpcGJvYXJkPzogUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW47XG4gIH1cbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzIHtcbiAgICBjbGlwYm9hcmQ6IGtleW9mIHR5cGVvZiBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbjtcbiAgfVxufVxuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZ3JpZC9zZXJ2aWNlcy9jb25maWcnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcbiAgICBjbGlwYm9hcmQ/OiB7XG4gICAgICAvKiogV2hlbiBzZXQgdG8gdHJ1ZSB3aWxsIGVuYWJsZSB0aGUgY2xpcGJvYXJkIHBsdWdpbiBvbiBhbGwgZ3JpZCBpbnN0YW5jZXMgYnkgZGVmYXVsdC4gKi9cbiAgICAgIGF1dG9FbmFibGU/OiBib29sZWFuO1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgc2VwYXJhdG9yIHRvIHVzZSB3aGVuIG11bHRpcGxlIGNlbGxzIGFyZSBjb3BpZWRcbiAgICAgICAqIEBkZWZhdWx0IFxcdFxuICAgICAgICovXG4gICAgICBjZWxsU2VwYXJhdG9yPzogc3RyaW5nO1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgc2VwYXJhdG9yIHRvIHVzZSB3aGVuIG11bHRpcGxlIHJvd3MgYXJlIGNvcGllZFxuICAgICAgICogQGRlZmF1bHQgXFxuXG4gICAgICAgKi9cbiAgICAgIHJvd1NlcGFyYXRvcj86IHN0cmluZztcbiAgICB9O1xuICB9XG59XG5cbmNvbnN0IElTX09TWCA9IC9ebWFjLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpKVxuY29uc3QgREVGQVVMVF9DRUxMX1NFUCA9ICdcXHQnO1xuY29uc3QgREVGQVVMVF9ST1dfU0VQID0gJ1xcbic7XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAnY2xpcGJvYXJkJyA9ICdjbGlwYm9hcmQnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbY2xpcGJvYXJkXScsIGV4cG9ydEFzOiAncGJsTmdyaWRDbGlwYm9hcmQnIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHN0YXRpYyBjcmVhdGUoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQsIGluamVjdG9yOiBJbmplY3Rvcik6IFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luIHtcbiAgICBjb25zdCBwbHVnaW5DdHJsID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQoZ3JpZCk7XG4gICAgcmV0dXJuIG5ldyBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbihncmlkLCBpbmplY3RvciwgcGx1Z2luQ3RybCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHNlcGFyYXRvciB0byB1c2Ugd2hlbiBtdWx0aXBsZSBjZWxscyBhcmUgY29waWVkLlxuICAgKiBJZiBub3Qgc2V0LCB0YWtlbiBmcm9tIGBQYmxOZ3JpZENvbmZpZy5jbGlwYm9hcmQuY2VsbFNlcGFyYXRvcmBcbiAgICogQGRlZmF1bHQgXFx0XG4gICAqL1xuICBASW5wdXQoKSBjbHBDZWxsU2VwOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBzZXBhcmF0b3IgdG8gdXNlIHdoZW4gbXVsdGlwbGUgcm93cyBhcmUgY29waWVkXG4gICAqIElmIG5vdCBzZXQsIHRha2VuIGZyb20gYFBibE5ncmlkQ29uZmlnLmNsaXBib2FyZC5yb3dTZXBhcmF0b3JgXG4gICAqIEBkZWZhdWx0IFxcblxuICAgKi9cbiAgQElucHV0KCkgY2xwUm93U2VwOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjb25maWc6IFBibE5ncmlkQ29uZmlnU2VydmljZTtcbiAgcHJpdmF0ZSBjbGlwYm9hcmQ6IENsaXBib2FyZDtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3IsIHByb3RlY3RlZCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGluamVjdG9yLmdldChQYmxOZ3JpZENvbmZpZ1NlcnZpY2UpXG4gICAgdGhpcy5jbGlwYm9hcmQgPSBpbmplY3Rvci5nZXQoQ2xpcGJvYXJkKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHV0aWxzLnVucngua2lsbCh0aGlzKTtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy5ncmlkKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0NvcHlFdmVudChldmVudDogRXZlbnQpOiBib29sZWFuIHtcbiAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50ICYmIGV2ZW50LmtleSA9PT0gJ2MnKSB7XG4gICAgICBpZiAoKCFJU19PU1ggJiYgZXZlbnQuY3RybEtleSkgfHwgKElTX09TWCAmJiBldmVudC5tZXRhS2V5KSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRvQ29weSgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNlbGxTZXBhcmF0b3IsIHJvd1NlcGFyYXRvciB9ID0gdGhpcy5jb25maWcuZ2V0KCdjbGlwYm9hcmQnLCB7fSk7XG4gICAgY29uc3QgeyByb3dzLCBtaW5JbmRleCB9ID0gdGhpcy5nZXRTZWxlY3RlZFJvd0RhdGEodGhpcy5ncmlkKTtcbiAgICBjb25zdCBjcmVhdGVSb3cgPSAocm93OiBhbnlbXSkgPT4gcm93LnNsaWNlKG1pbkluZGV4KS5qb2luKHRoaXMuY2xwQ2VsbFNlcCB8fCBjZWxsU2VwYXJhdG9yIHx8IERFRkFVTFRfQ0VMTF9TRVApO1xuICAgIC8vIEZvciBlYWNoIHJvdyAoY29sbGVjdGlvbiBvZiBpdGVtcyksIHNsaWNlIHRoZSBpbml0aWFsIGl0ZW1zIHRoYXQgYXJlIG5vdCBjb3BpZWQgYWNyb3NzIGFsbCBzZWxlY3Rpb25zXG5cbiAgICB0aGlzLmNsaXBib2FyZC5jb3B5KHJvd3MubWFwKGNyZWF0ZVJvdykuam9pbih0aGlzLmNscFJvd1NlcCB8fCByb3dTZXBhcmF0b3IgfHwgREVGQVVMVF9ST1dfU0VQKSk7XG4gICAgLy8gVE9ETzogQ29uc2lkZXIgdXNpbmcgYGJlZ2luQ29weWAgdG8gc3VwcG9ydCBsYXJnZSBjb3B5IG9wZXJhdGlvbnNcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTZWxlY3RlZFJvd0RhdGEoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQpIHtcbiAgICBjb25zdCB7IGNvbHVtbkFwaSwgY29udGV4dEFwaSB9ID0gZ3JpZDtcbiAgICBjb25zdCBkYXRhID0gbmV3IE1hcDxhbnksIGFueVtdPigpO1xuXG4gICAgLy8gVGhlIG1pbkluZGV4IHJlcHJlc2VudHMgdGhlIGZpcnN0IGNvbHVtbiBiZWluZyBjb3BpZWQgb3V0IG9mIGFsbCB2aXNpYmxlIGNvbHVtbnMgKDAgYmVpbmcgdGhlIGZpcnN0IHZpc2libGUgY29sdW1uKS5cbiAgICAvLyBGb3IgZXZlcnkgc2VsZWN0ZWQgY2VsbCwgdGhlIGNvbHVtbiBpcyB0cmFja2VkIGFuZCBpdCdzIGluZGV4IGlzIGJlaW5nIHNldCB0byBgbWluSW5kZXhgIGlmIGl0IGlzIGxvd2VyIHRoZW4gdGhlIGN1cnJlbnQgYG1pbkluZGV4YCAoTWF0aC5NaW4pLlxuICAgIC8vIFdlIHN0YXJ0IHdpdGggdGhlIGJpZ2dlc3QgaW50IGJ1dCByaWdodCBhd2F5IGdldCBhIHZhbGlkIGNvbHVtbiBpbmRleC4uLlxuICAgIC8vIExhdGVyIG9uLCBlYWNoIHJvdyBpcyBzbGljZWQgdG8gcmVtb3ZlIHRoZSBpdGVtcyBpbiBpbmRpY2VzIGxvd2VyIHRoZW4gdGhlIGBtaW5JbmRleGAuXG4gICAgLy9cbiAgICAvLyBBbGwgb2YgdGhpcyBpcyB0byBtYWtlIHRoZSBwYXN0ZSBzdGFydCB3aXRob3V0IGxlYWRpbmcgY2VsbCBzZXBhcmF0b3JzLlxuICAgIGxldCBtaW5JbmRleCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuXG4gICAgZm9yIChjb25zdCBwb2ludCBvZiBjb250ZXh0QXBpLnNlbGVjdGVkQ2VsbHMpIHtcbiAgICAgIGNvbnN0IGNvbCA9IGNvbHVtbkFwaS5jb2x1bW5zW3BvaW50LmNvbEluZGV4XTtcbiAgICAgIGlmIChjb2wpIHtcbiAgICAgICAgY29uc3QgY29sSW5kZXggPSBjb2x1bW5BcGkucmVuZGVySW5kZXhPZihjb2wpO1xuICAgICAgICBpZiAoY29sSW5kZXggPiAtMSkge1xuICAgICAgICAgIGNvbnN0IHJvd0luZGV4ID0gY29udGV4dEFwaS5maW5kUm93SW5DYWNoZShwb2ludC5yb3dJZGVudCkuZGF0YUluZGV4O1xuICAgICAgICAgIGNvbnN0IGRhdGFJdGVtID0gY29sLmdldFZhbHVlKGdyaWQuZHMuc291cmNlW3Jvd0luZGV4XSk7XG4gICAgICAgICAgY29uc3Qgcm93ID0gZGF0YS5nZXQocG9pbnQucm93SWRlbnQpIHx8IFtdO1xuICAgICAgICAgIHJvd1tjb2xJbmRleF0gPSBkYXRhSXRlbTtcbiAgICAgICAgICBkYXRhLnNldChwb2ludC5yb3dJZGVudCwgcm93KTtcbiAgICAgICAgICBtaW5JbmRleCA9IE1hdGgubWluKG1pbkluZGV4LCBjb2xJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb250ZXh0QXBpLnNlbGVjdGVkQ2VsbHMgYXJlIHVuLW9yZGVyZWQsIHRoZWlyIG9yZGVyIGlzIGJhc2VkIG9uIHRoZSBvcmRlciBpbiB3aGljaCB1c2VyIGhhdmUgc2VsZWN0ZWQgY2VsbHMuXG4gICAgLy8gSXQgbWVhbnMgdGhhdCB0aGUgcm93J3Mgd2lsbCBub3QgcGFzdGUgaW4gdGhlIHByb3BlciBvcmRlciB1bmxlc3Mgd2UgcmUtb3JkZXIgdGhlbSBiYXNlZCBvbiB0aGUgZGF0YSBpbmRleC5cbiAgICAvLyBUaGlzIGlzIGEgdmVyeSBuYXRpdmUgYW5kIHNpbXBsZSBpbXBsZW1lbnRhdGlvbiB0aGF0IHdpbGwgaG9sZCBtb3N0IGNvcHkgYWN0aW9ucyAxayArLVxuICAgIC8vIFRPRE86IENvbnNpZGVyIGEgYmV0dGVyIGxvZ2ljLCB0YWtpbmcgcGVyZm9ybWFuY2UgaW50byBjb25zaWRlcmF0aW9uLlxuXG4gICAgY29uc3QgZW50cmllcyA9IEFycmF5LmZyb20oZGF0YS5lbnRyaWVzKCkpO1xuICAgIGVudHJpZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgYUluZGV4ID0gY29udGV4dEFwaS5maW5kUm93SW5DYWNoZShhWzBdKS5kYXRhSW5kZXg7XG4gICAgICBjb25zdCBiSW5kZXggPSBjb250ZXh0QXBpLmZpbmRSb3dJbkNhY2hlKGJbMF0pLmRhdGFJbmRleDtcbiAgICAgIGlmIChhSW5kZXggPCBiSW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWluSW5kZXgsXG4gICAgICByb3dzOiBlbnRyaWVzLm1hcCggZSA9PiBlWzFdICksXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSB0aGlzLnBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgaWYgKCF0aGlzLnBsdWdpbkN0cmwuaGFzUGx1Z2luKCd0YXJnZXRFdmVudHMnKSkge1xuICAgICAgdGhpcy5wbHVnaW5DdHJsLmNyZWF0ZVBsdWdpbigndGFyZ2V0RXZlbnRzJyk7XG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0RXZlbnRzID0gdGhpcy5wbHVnaW5DdHJsLmdldFBsdWdpbigndGFyZ2V0RXZlbnRzJyk7XG4gICAgdGFyZ2V0RXZlbnRzLmtleURvd25cbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoIGV2ZW50ID0+IHRoaXMuaXNDb3B5RXZlbnQoZXZlbnQuc291cmNlKSApLFxuICAgICAgICB1dGlscy51bnJ4KHRoaXMpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB0aGlzLmRvQ29weSgpICk7XG4gIH1cbn1cbiJdfQ==