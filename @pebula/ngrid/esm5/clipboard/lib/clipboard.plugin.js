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
import { PblNgridComponent, PblNgridPluginController, TablePlugin, PblNgridConfigService } from '@pebula/ngrid';
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
        return {
            minIndex: minIndex,
            rows: Array.from(data.values()),
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
        TablePlugin({ id: PLUGIN_KEY, factory: 'create' }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvY2xpcGJvYXJkLyIsInNvdXJjZXMiOlsibGliL2NsaXBib2FyZC5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBSXRFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBOEIxRyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDOztJQUN0RCxnQkFBZ0IsR0FBRyxJQUFJOztJQUN2QixlQUFlLEdBQUcsSUFBSTs7QUFFNUIsTUFBTSxLQUFPLFVBQVUsR0FBZ0IsV0FBVzs7SUE4QmhELGlDQUFtQixJQUE0QixFQUFZLFFBQWtCLEVBQVksVUFBb0M7UUFBMUcsU0FBSSxHQUFKLElBQUksQ0FBd0I7UUFBWSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVksZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFDM0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUE7UUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7Z0NBN0JVLHVCQUF1Qjs7Ozs7O0lBRTNCLDhCQUFNOzs7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QUFDO0NBQUEsSUFBQTtTQXRHWSx1QkFBdUI7Ozs7Ozs7O0lBWWxDLDZDQUE0Qjs7Ozs7OztJQU81Qiw0Q0FBMkI7Ozs7O0lBRTNCLHlDQUFzQzs7Ozs7SUFDdEMsNENBQTZCOzs7OztJQUM3QixnREFBeUQ7O0lBRTdDLHVDQUFtQzs7Ozs7SUFBRSwyQ0FBNEI7Ozs7O0lBQUUsNkNBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3RvciwgT25EZXN0cm95LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBpbXBvcnQgeyBDbGlwYm9hcmQgfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL2NsaXBib2FyZCc7XG4vLyBUT0RPOiByZW1vdmUgaW50ZXJuYWwgaW1wbGVtZW50YXRpb24gaW4gdGhlIG5leHQgdmVyc2lvbiBvZiBjZGstZXhwZXJpbWVudGFsIChyaWdodCBhZnRlciA4LjEuMylcbmltcG9ydCB7IENsaXBib2FyZCB9IGZyb20gJy4vY2xpcGJvYXJkLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBUYWJsZVBsdWdpbiwgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBjbGlwYm9hcmQ/OiBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbjtcbiAgfVxuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMge1xuICAgIGNsaXBib2FyZDoga2V5b2YgdHlwZW9mIFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luO1xuICB9XG59XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi90YWJsZS9zZXJ2aWNlcy9jb25maWcnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcbiAgICBjbGlwYm9hcmQ/OiB7XG4gICAgICAvKiogV2hlbiBzZXQgdG8gdHJ1ZSB3aWxsIGVuYWJsZSB0aGUgY2xpcGJvYXJkIHBsdWdpbiBvbiBhbGwgZ3JpZCBpbnN0YW5jZXMgYnkgZGVmYXVsdC4gKi9cbiAgICAgIGF1dG9FbmFibGU/OiBib29sZWFuO1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgc2VwYXJhdG9yIHRvIHVzZSB3aGVuIG11bHRpcGxlIGNlbGxzIGFyZSBjb3BpZWRcbiAgICAgICAqIEBkZWZhdWx0IFxcdFxuICAgICAgICovXG4gICAgICBjZWxsU2VwYXJhdG9yPzogc3RyaW5nO1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgc2VwYXJhdG9yIHRvIHVzZSB3aGVuIG11bHRpcGxlIHJvd3MgYXJlIGNvcGllZFxuICAgICAgICogQGRlZmF1bHQgXFxuXG4gICAgICAgKi9cbiAgICAgIHJvd1NlcGFyYXRvcj86IHN0cmluZztcbiAgICB9O1xuICB9XG59XG5cbmNvbnN0IElTX09TWCA9IC9ebWFjLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpKVxuY29uc3QgREVGQVVMVF9DRUxMX1NFUCA9ICdcXHQnO1xuY29uc3QgREVGQVVMVF9ST1dfU0VQID0gJ1xcbic7XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAnY2xpcGJvYXJkJyA9ICdjbGlwYm9hcmQnO1xuXG5AVGFibGVQbHVnaW4oeyBpZDogUExVR0lOX0tFWSwgZmFjdG9yeTogJ2NyZWF0ZScgfSlcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZFtjbGlwYm9hcmRdJywgZXhwb3J0QXM6ICdwYmxOZ3JpZENsaXBib2FyZCcgfSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgc3RhdGljIGNyZWF0ZShncmlkOiBQYmxOZ3JpZENvbXBvbmVudCwgaW5qZWN0b3I6IEluamVjdG9yKTogUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW4ge1xuICAgIGNvbnN0IHBsdWdpbkN0cmwgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZChncmlkKTtcbiAgICByZXR1cm4gbmV3IFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luKGdyaWQsIGluamVjdG9yLCBwbHVnaW5DdHJsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgc2VwYXJhdG9yIHRvIHVzZSB3aGVuIG11bHRpcGxlIGNlbGxzIGFyZSBjb3BpZWQuXG4gICAqIElmIG5vdCBzZXQsIHRha2VuIGZyb20gYFBibE5ncmlkQ29uZmlnLmNsaXBib2FyZC5jZWxsU2VwYXJhdG9yYFxuICAgKiBAZGVmYXVsdCBcXHRcbiAgICovXG4gIEBJbnB1dCgpIGNscENlbGxTZXA6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHNlcGFyYXRvciB0byB1c2Ugd2hlbiBtdWx0aXBsZSByb3dzIGFyZSBjb3BpZWRcbiAgICogSWYgbm90IHNldCwgdGFrZW4gZnJvbSBgUGJsTmdyaWRDb25maWcuY2xpcGJvYXJkLnJvd1NlcGFyYXRvcmBcbiAgICogQGRlZmF1bHQgXFxuXG4gICAqL1xuICBASW5wdXQoKSBjbHBSb3dTZXA6IHN0cmluZztcblxuICBwcml2YXRlIGNvbmZpZzogUGJsTmdyaWRDb25maWdTZXJ2aWNlO1xuICBwcml2YXRlIGNsaXBib2FyZDogQ2xpcGJvYXJkO1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46IChncmlkOiBQYmxOZ3JpZENvbXBvbmVudCkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvciwgcHJvdGVjdGVkIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcikge1xuICAgIHRoaXMuY29uZmlnID0gaW5qZWN0b3IuZ2V0KFBibE5ncmlkQ29uZmlnU2VydmljZSlcbiAgICB0aGlzLmNsaXBib2FyZCA9IGluamVjdG9yLmdldChDbGlwYm9hcmQpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMuZ3JpZCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNDb3B5RXZlbnQoZXZlbnQ6IEV2ZW50KTogYm9vbGVhbiB7XG4gICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCAmJiBldmVudC5rZXkgPT09ICdjJykge1xuICAgICAgaWYgKCghSVNfT1NYICYmIGV2ZW50LmN0cmxLZXkpIHx8IChJU19PU1ggJiYgZXZlbnQubWV0YUtleSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkb0NvcHkoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjZWxsU2VwYXJhdG9yLCByb3dTZXBhcmF0b3IgfSA9IHRoaXMuY29uZmlnLmdldCgnY2xpcGJvYXJkJywge30pO1xuICAgIGNvbnN0IHsgcm93cywgbWluSW5kZXggfSA9IHRoaXMuZ2V0U2VsZWN0ZWRSb3dEYXRhKHRoaXMuZ3JpZCk7XG4gICAgY29uc3QgY3JlYXRlUm93ID0gKHJvdzogYW55W10pID0+IHJvdy5zbGljZShtaW5JbmRleCkuam9pbih0aGlzLmNscENlbGxTZXAgfHwgY2VsbFNlcGFyYXRvciB8fCBERUZBVUxUX0NFTExfU0VQKTtcbiAgICAvLyBGb3IgZWFjaCByb3cgKGNvbGxlY3Rpb24gb2YgaXRlbXMpLCBzbGljZSB0aGUgaW5pdGlhbCBpdGVtcyB0aGF0IGFyZSBub3QgY29waWVkIGFjcm9zcyBhbGwgc2VsZWN0aW9uc1xuXG4gICAgdGhpcy5jbGlwYm9hcmQuY29weShyb3dzLm1hcChjcmVhdGVSb3cpLmpvaW4odGhpcy5jbHBSb3dTZXAgfHwgcm93U2VwYXJhdG9yIHx8IERFRkFVTFRfUk9XX1NFUCkpO1xuICAgIC8vIFRPRE86IENvbnNpZGVyIHVzaW5nIGBiZWdpbkNvcHlgIHRvIHN1cHBvcnQgbGFyZ2UgY29weSBvcGVyYXRpb25zXG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0U2VsZWN0ZWRSb3dEYXRhKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50KSB7XG4gICAgY29uc3QgeyBjb2x1bW5BcGksIGNvbnRleHRBcGkgfSA9IGdyaWQ7XG4gICAgY29uc3QgZGF0YSA9IG5ldyBNYXA8YW55LCBhbnlbXT4oKTtcblxuICAgIC8vIFRoZSBtaW5JbmRleCByZXByZXNlbnRzIHRoZSBmaXJzdCBjb2x1bW4gYmVpbmcgY29waWVkIG91dCBvZiBhbGwgdmlzaWJsZSBjb2x1bW5zICgwIGJlaW5nIHRoZSBmaXJzdCB2aXNpYmxlIGNvbHVtbikuXG4gICAgLy8gRm9yIGV2ZXJ5IHNlbGVjdGVkIGNlbGwsIHRoZSBjb2x1bW4gaXMgdHJhY2tlZCBhbmQgaXQncyBpbmRleCBpcyBiZWluZyBzZXQgdG8gYG1pbkluZGV4YCBpZiBpdCBpcyBsb3dlciB0aGVuIHRoZSBjdXJyZW50IGBtaW5JbmRleGAgKE1hdGguTWluKS5cbiAgICAvLyBXZSBzdGFydCB3aXRoIHRoZSBiaWdnZXN0IGludCBidXQgcmlnaHQgYXdheSBnZXQgYSB2YWxpZCBjb2x1bW4gaW5kZXguLi5cbiAgICAvLyBMYXRlciBvbiwgZWFjaCByb3cgaXMgc2xpY2VkIHRvIHJlbW92ZSB0aGUgaXRlbXMgaW4gaW5kaWNlcyBsb3dlciB0aGVuIHRoZSBgbWluSW5kZXhgLlxuICAgIC8vXG4gICAgLy8gQWxsIG9mIHRoaXMgaXMgdG8gbWFrZSB0aGUgcGFzdGUgc3RhcnQgd2l0aG91dCBsZWFkaW5nIGNlbGwgc2VwYXJhdG9ycy5cbiAgICBsZXQgbWluSW5kZXggPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcblxuICAgIGZvciAoY29uc3QgcG9pbnQgb2YgY29udGV4dEFwaS5zZWxlY3RlZENlbGxzKSB7XG4gICAgICBjb25zdCBjb2wgPSBjb2x1bW5BcGkuY29sdW1uc1twb2ludC5jb2xJbmRleF07XG4gICAgICBpZiAoY29sKSB7XG4gICAgICAgIGNvbnN0IGNvbEluZGV4ID0gY29sdW1uQXBpLnJlbmRlckluZGV4T2YoY29sKTtcbiAgICAgICAgaWYgKGNvbEluZGV4ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCByb3dJbmRleCA9IGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUocG9pbnQucm93SWRlbnQpLmRhdGFJbmRleDtcbiAgICAgICAgICBjb25zdCBkYXRhSXRlbSA9IGNvbC5nZXRWYWx1ZShncmlkLmRzLnNvdXJjZVtyb3dJbmRleF0pO1xuICAgICAgICAgIGNvbnN0IHJvdyA9IGRhdGEuZ2V0KHBvaW50LnJvd0lkZW50KSB8fCBbXTtcbiAgICAgICAgICByb3dbY29sSW5kZXhdID0gZGF0YUl0ZW07XG4gICAgICAgICAgZGF0YS5zZXQocG9pbnQucm93SWRlbnQsIHJvdyk7XG4gICAgICAgICAgbWluSW5kZXggPSBNYXRoLm1pbihtaW5JbmRleCwgY29sSW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1pbkluZGV4LFxuICAgICAgcm93czogQXJyYXkuZnJvbShkYXRhLnZhbHVlcygpKSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHRoaXMucGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG5cbiAgICBpZiAoIXRoaXMucGx1Z2luQ3RybC5oYXNQbHVnaW4oJ3RhcmdldEV2ZW50cycpKSB7XG4gICAgICB0aGlzLnBsdWdpbkN0cmwuY3JlYXRlUGx1Z2luKCd0YXJnZXRFdmVudHMnKTtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRFdmVudHMgPSB0aGlzLnBsdWdpbkN0cmwuZ2V0UGx1Z2luKCd0YXJnZXRFdmVudHMnKTtcbiAgICB0YXJnZXRFdmVudHMua2V5RG93blxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlciggZXZlbnQgPT4gdGhpcy5pc0NvcHlFdmVudChldmVudC5zb3VyY2UpICksXG4gICAgICAgIFVuUngodGhpcylcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHRoaXMuZG9Db3B5KCkgKTtcbiAgfVxufVxuIl19