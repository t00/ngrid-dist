/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { filter } from 'rxjs/operators';
import { Directive, Injector, OnDestroy, Input } from '@angular/core';
// import { Clipboard } from '@angular/cdk-experimental/clipboard';
// TODO: remove internal implementation in the next version of cdk-experimental (right after 8.1.3)
import { Clipboard } from './clipboard.service';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, NgridPlugin, PblNgridConfigService } from '@pebula/ngrid';
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
    PblNgridClipboardPlugin_1 = PblNgridClipboardPlugin;
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
        return new PblNgridClipboardPlugin_1(grid, injector, pluginCtrl);
    };
    /**
     * @return {?}
     */
    PblNgridClipboardPlugin.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
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
            for (var _b = tslib_1.__values(contextApi.selectedCells), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        function (event) { return _this.isCopyEvent(event.source); })), UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.doCopy(); }));
    };
    var PblNgridClipboardPlugin_1;
    PblNgridClipboardPlugin.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
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
    PblNgridClipboardPlugin = PblNgridClipboardPlugin_1 = tslib_1.__decorate([
        NgridPlugin({ id: PLUGIN_KEY, factory: 'create' }),
        UnRx(),
        tslib_1.__metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
    ], PblNgridClipboardPlugin);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvY2xpcGJvYXJkLyIsInNvdXJjZXMiOlsibGliL2NsaXBib2FyZC5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBSXRFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBOEIxRyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDOztJQUN0RCxnQkFBZ0IsR0FBRyxJQUFJOztJQUN2QixlQUFlLEdBQUcsSUFBSTs7QUFFNUIsTUFBTSxLQUFPLFVBQVUsR0FBZ0IsV0FBVzs7SUE4QmhELGlDQUFtQixJQUE0QixFQUFZLFFBQWtCLEVBQVksVUFBb0M7UUFBMUcsU0FBSSxHQUFKLElBQUksQ0FBd0I7UUFBWSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVksZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFDM0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUE7UUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7Z0NBN0JVLHVCQUF1Qjs7Ozs7O0lBRTNCLDhCQUFNOzs7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QUFLLElBQUksT0FBQSxLQUFJLENBQUMsTUFBTSxFQUFFLEVBQWIsQ0FBYSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7O2dCQTVGd0IsaUJBQWlCO2dCQUEyQixRQUFRO2dCQUF3Qix3QkFBd0I7OztnQkEzQjlILFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7Ozs7Z0JBckNyRSxpQkFBaUI7Z0JBUE4sUUFBUTtnQkFPQSx3QkFBd0I7Ozs2QkFtRGpELEtBQUs7NEJBT0wsS0FBSzs7SUFuQkssdUJBQXVCO1FBSG5DLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO1FBRWxELElBQUksRUFBRTtpREEwQm9CLGlCQUFpQixFQUEyQixRQUFRLEVBQXdCLHdCQUF3QjtPQXpCbEgsdUJBQXVCLENBc0huQztJQUFELDhCQUFDO0NBQUEsSUFBQTtTQXRIWSx1QkFBdUI7Ozs7Ozs7O0lBWWxDLDZDQUE0Qjs7Ozs7OztJQU81Qiw0Q0FBMkI7Ozs7O0lBRTNCLHlDQUFzQzs7Ozs7SUFDdEMsNENBQTZCOzs7OztJQUM3QixnREFBeUQ7O0lBRTdDLHVDQUFtQzs7Ozs7SUFBRSwyQ0FBNEI7Ozs7O0lBQUUsNkNBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdG9yLCBPbkRlc3Ryb3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vLyBpbXBvcnQgeyBDbGlwYm9hcmQgfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL2NsaXBib2FyZCc7XHJcbi8vIFRPRE86IHJlbW92ZSBpbnRlcm5hbCBpbXBsZW1lbnRhdGlvbiBpbiB0aGUgbmV4dCB2ZXJzaW9uIG9mIGNkay1leHBlcmltZW50YWwgKHJpZ2h0IGFmdGVyIDguMS4zKVxyXG5pbXBvcnQgeyBDbGlwYm9hcmQgfSBmcm9tICcuL2NsaXBib2FyZC5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcclxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgTmdyaWRQbHVnaW4sIFBibE5ncmlkQ29uZmlnU2VydmljZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xyXG5cclxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xyXG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XHJcbiAgICBjbGlwYm9hcmQ/OiBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbjtcclxuICB9XHJcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzIHtcclxuICAgIGNsaXBib2FyZDoga2V5b2YgdHlwZW9mIFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luO1xyXG4gIH1cclxufVxyXG5cclxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2dyaWQvc2VydmljZXMvY29uZmlnJyB7XHJcbiAgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcclxuICAgIGNsaXBib2FyZD86IHtcclxuICAgICAgLyoqIFdoZW4gc2V0IHRvIHRydWUgd2lsbCBlbmFibGUgdGhlIGNsaXBib2FyZCBwbHVnaW4gb24gYWxsIGdyaWQgaW5zdGFuY2VzIGJ5IGRlZmF1bHQuICovXHJcbiAgICAgIGF1dG9FbmFibGU/OiBib29sZWFuO1xyXG4gICAgICAvKipcclxuICAgICAgICogVGhlIHNlcGFyYXRvciB0byB1c2Ugd2hlbiBtdWx0aXBsZSBjZWxscyBhcmUgY29waWVkXHJcbiAgICAgICAqIEBkZWZhdWx0IFxcdFxyXG4gICAgICAgKi9cclxuICAgICAgY2VsbFNlcGFyYXRvcj86IHN0cmluZztcclxuICAgICAgLyoqXHJcbiAgICAgICAqIFRoZSBzZXBhcmF0b3IgdG8gdXNlIHdoZW4gbXVsdGlwbGUgcm93cyBhcmUgY29waWVkXHJcbiAgICAgICAqIEBkZWZhdWx0IFxcblxyXG4gICAgICAgKi9cclxuICAgICAgcm93U2VwYXJhdG9yPzogc3RyaW5nO1xyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IElTX09TWCA9IC9ebWFjLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpKVxyXG5jb25zdCBERUZBVUxUX0NFTExfU0VQID0gJ1xcdCc7XHJcbmNvbnN0IERFRkFVTFRfUk9XX1NFUCA9ICdcXG4nO1xyXG5cclxuZXhwb3J0IGNvbnN0IFBMVUdJTl9LRVk6ICdjbGlwYm9hcmQnID0gJ2NsaXBib2FyZCc7XHJcblxyXG5ATmdyaWRQbHVnaW4oeyBpZDogUExVR0lOX0tFWSwgZmFjdG9yeTogJ2NyZWF0ZScgfSlcclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAncGJsLW5ncmlkW2NsaXBib2FyZF0nLCBleHBvcnRBczogJ3BibE5ncmlkQ2xpcGJvYXJkJyB9KVxyXG5AVW5SeCgpXHJcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcblxyXG4gIHN0YXRpYyBjcmVhdGUoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQsIGluamVjdG9yOiBJbmplY3Rvcik6IFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luIHtcclxuICAgIGNvbnN0IHBsdWdpbkN0cmwgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZChncmlkKTtcclxuICAgIHJldHVybiBuZXcgUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW4oZ3JpZCwgaW5qZWN0b3IsIHBsdWdpbkN0cmwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNlcGFyYXRvciB0byB1c2Ugd2hlbiBtdWx0aXBsZSBjZWxscyBhcmUgY29waWVkLlxyXG4gICAqIElmIG5vdCBzZXQsIHRha2VuIGZyb20gYFBibE5ncmlkQ29uZmlnLmNsaXBib2FyZC5jZWxsU2VwYXJhdG9yYFxyXG4gICAqIEBkZWZhdWx0IFxcdFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNscENlbGxTZXA6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNlcGFyYXRvciB0byB1c2Ugd2hlbiBtdWx0aXBsZSByb3dzIGFyZSBjb3BpZWRcclxuICAgKiBJZiBub3Qgc2V0LCB0YWtlbiBmcm9tIGBQYmxOZ3JpZENvbmZpZy5jbGlwYm9hcmQucm93U2VwYXJhdG9yYFxyXG4gICAqIEBkZWZhdWx0IFxcblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNscFJvd1NlcDogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIGNvbmZpZzogUGJsTmdyaWRDb25maWdTZXJ2aWNlO1xyXG4gIHByaXZhdGUgY2xpcGJvYXJkOiBDbGlwYm9hcmQ7XHJcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQpID0+IHZvaWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLCBwcm90ZWN0ZWQgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XHJcbiAgICB0aGlzLmNvbmZpZyA9IGluamVjdG9yLmdldChQYmxOZ3JpZENvbmZpZ1NlcnZpY2UpXHJcbiAgICB0aGlzLmNsaXBib2FyZCA9IGluamVjdG9yLmdldChDbGlwYm9hcmQpO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLmdyaWQpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGlzQ29weUV2ZW50KGV2ZW50OiBFdmVudCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCAmJiBldmVudC5rZXkgPT09ICdjJykge1xyXG4gICAgICBpZiAoKCFJU19PU1ggJiYgZXZlbnQuY3RybEtleSkgfHwgKElTX09TWCAmJiBldmVudC5tZXRhS2V5KSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZG9Db3B5KCk6IHZvaWQge1xyXG4gICAgY29uc3QgeyBjZWxsU2VwYXJhdG9yLCByb3dTZXBhcmF0b3IgfSA9IHRoaXMuY29uZmlnLmdldCgnY2xpcGJvYXJkJywge30pO1xyXG4gICAgY29uc3QgeyByb3dzLCBtaW5JbmRleCB9ID0gdGhpcy5nZXRTZWxlY3RlZFJvd0RhdGEodGhpcy5ncmlkKTtcclxuICAgIGNvbnN0IGNyZWF0ZVJvdyA9IChyb3c6IGFueVtdKSA9PiByb3cuc2xpY2UobWluSW5kZXgpLmpvaW4odGhpcy5jbHBDZWxsU2VwIHx8IGNlbGxTZXBhcmF0b3IgfHwgREVGQVVMVF9DRUxMX1NFUCk7XHJcbiAgICAvLyBGb3IgZWFjaCByb3cgKGNvbGxlY3Rpb24gb2YgaXRlbXMpLCBzbGljZSB0aGUgaW5pdGlhbCBpdGVtcyB0aGF0IGFyZSBub3QgY29waWVkIGFjcm9zcyBhbGwgc2VsZWN0aW9uc1xyXG5cclxuICAgIHRoaXMuY2xpcGJvYXJkLmNvcHkocm93cy5tYXAoY3JlYXRlUm93KS5qb2luKHRoaXMuY2xwUm93U2VwIHx8IHJvd1NlcGFyYXRvciB8fCBERUZBVUxUX1JPV19TRVApKTtcclxuICAgIC8vIFRPRE86IENvbnNpZGVyIHVzaW5nIGBiZWdpbkNvcHlgIHRvIHN1cHBvcnQgbGFyZ2UgY29weSBvcGVyYXRpb25zXHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0U2VsZWN0ZWRSb3dEYXRhKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50KSB7XHJcbiAgICBjb25zdCB7IGNvbHVtbkFwaSwgY29udGV4dEFwaSB9ID0gZ3JpZDtcclxuICAgIGNvbnN0IGRhdGEgPSBuZXcgTWFwPGFueSwgYW55W10+KCk7XHJcblxyXG4gICAgLy8gVGhlIG1pbkluZGV4IHJlcHJlc2VudHMgdGhlIGZpcnN0IGNvbHVtbiBiZWluZyBjb3BpZWQgb3V0IG9mIGFsbCB2aXNpYmxlIGNvbHVtbnMgKDAgYmVpbmcgdGhlIGZpcnN0IHZpc2libGUgY29sdW1uKS5cclxuICAgIC8vIEZvciBldmVyeSBzZWxlY3RlZCBjZWxsLCB0aGUgY29sdW1uIGlzIHRyYWNrZWQgYW5kIGl0J3MgaW5kZXggaXMgYmVpbmcgc2V0IHRvIGBtaW5JbmRleGAgaWYgaXQgaXMgbG93ZXIgdGhlbiB0aGUgY3VycmVudCBgbWluSW5kZXhgIChNYXRoLk1pbikuXHJcbiAgICAvLyBXZSBzdGFydCB3aXRoIHRoZSBiaWdnZXN0IGludCBidXQgcmlnaHQgYXdheSBnZXQgYSB2YWxpZCBjb2x1bW4gaW5kZXguLi5cclxuICAgIC8vIExhdGVyIG9uLCBlYWNoIHJvdyBpcyBzbGljZWQgdG8gcmVtb3ZlIHRoZSBpdGVtcyBpbiBpbmRpY2VzIGxvd2VyIHRoZW4gdGhlIGBtaW5JbmRleGAuXHJcbiAgICAvL1xyXG4gICAgLy8gQWxsIG9mIHRoaXMgaXMgdG8gbWFrZSB0aGUgcGFzdGUgc3RhcnQgd2l0aG91dCBsZWFkaW5nIGNlbGwgc2VwYXJhdG9ycy5cclxuICAgIGxldCBtaW5JbmRleCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xyXG5cclxuICAgIGZvciAoY29uc3QgcG9pbnQgb2YgY29udGV4dEFwaS5zZWxlY3RlZENlbGxzKSB7XHJcbiAgICAgIGNvbnN0IGNvbCA9IGNvbHVtbkFwaS5jb2x1bW5zW3BvaW50LmNvbEluZGV4XTtcclxuICAgICAgaWYgKGNvbCkge1xyXG4gICAgICAgIGNvbnN0IGNvbEluZGV4ID0gY29sdW1uQXBpLnJlbmRlckluZGV4T2YoY29sKTtcclxuICAgICAgICBpZiAoY29sSW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgY29uc3Qgcm93SW5kZXggPSBjb250ZXh0QXBpLmZpbmRSb3dJbkNhY2hlKHBvaW50LnJvd0lkZW50KS5kYXRhSW5kZXg7XHJcbiAgICAgICAgICBjb25zdCBkYXRhSXRlbSA9IGNvbC5nZXRWYWx1ZShncmlkLmRzLnNvdXJjZVtyb3dJbmRleF0pO1xyXG4gICAgICAgICAgY29uc3Qgcm93ID0gZGF0YS5nZXQocG9pbnQucm93SWRlbnQpIHx8IFtdO1xyXG4gICAgICAgICAgcm93W2NvbEluZGV4XSA9IGRhdGFJdGVtO1xyXG4gICAgICAgICAgZGF0YS5zZXQocG9pbnQucm93SWRlbnQsIHJvdyk7XHJcbiAgICAgICAgICBtaW5JbmRleCA9IE1hdGgubWluKG1pbkluZGV4LCBjb2xJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29udGV4dEFwaS5zZWxlY3RlZENlbGxzIGFyZSB1bi1vcmRlcmVkLCB0aGVpciBvcmRlciBpcyBiYXNlZCBvbiB0aGUgb3JkZXIgaW4gd2hpY2ggdXNlciBoYXZlIHNlbGVjdGVkIGNlbGxzLlxyXG4gICAgLy8gSXQgbWVhbnMgdGhhdCB0aGUgcm93J3Mgd2lsbCBub3QgcGFzdGUgaW4gdGhlIHByb3BlciBvcmRlciB1bmxlc3Mgd2UgcmUtb3JkZXIgdGhlbSBiYXNlZCBvbiB0aGUgZGF0YSBpbmRleC5cclxuICAgIC8vIFRoaXMgaXMgYSB2ZXJ5IG5hdGl2ZSBhbmQgc2ltcGxlIGltcGxlbWVudGF0aW9uIHRoYXQgd2lsbCBob2xkIG1vc3QgY29weSBhY3Rpb25zIDFrICstXHJcbiAgICAvLyBUT0RPOiBDb25zaWRlciBhIGJldHRlciBsb2dpYywgdGFraW5nIHBlcmZvcm1hbmNlIGludG8gY29uc2lkZXJhdGlvbi5cclxuXHJcbiAgICBjb25zdCBlbnRyaWVzID0gQXJyYXkuZnJvbShkYXRhLmVudHJpZXMoKSk7XHJcbiAgICBlbnRyaWVzLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgY29uc3QgYUluZGV4ID0gY29udGV4dEFwaS5maW5kUm93SW5DYWNoZShhWzBdKS5kYXRhSW5kZXg7XHJcbiAgICAgIGNvbnN0IGJJbmRleCA9IGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUoYlswXSkuZGF0YUluZGV4O1xyXG4gICAgICBpZiAoYUluZGV4IDwgYkluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtaW5JbmRleCxcclxuICAgICAgcm93czogZW50cmllcy5tYXAoIGUgPT4gZVsxXSApLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHRoaXMucGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XHJcblxyXG4gICAgaWYgKCF0aGlzLnBsdWdpbkN0cmwuaGFzUGx1Z2luKCd0YXJnZXRFdmVudHMnKSkge1xyXG4gICAgICB0aGlzLnBsdWdpbkN0cmwuY3JlYXRlUGx1Z2luKCd0YXJnZXRFdmVudHMnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0YXJnZXRFdmVudHMgPSB0aGlzLnBsdWdpbkN0cmwuZ2V0UGx1Z2luKCd0YXJnZXRFdmVudHMnKTtcclxuICAgIHRhcmdldEV2ZW50cy5rZXlEb3duXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGZpbHRlciggZXZlbnQgPT4gdGhpcy5pc0NvcHlFdmVudChldmVudC5zb3VyY2UpICksXHJcbiAgICAgICAgVW5SeCh0aGlzKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHRoaXMuZG9Db3B5KCkgKTtcclxuICB9XHJcbn1cclxuIl19