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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvY2xpcGJvYXJkLyIsInNvdXJjZXMiOlsibGliL2NsaXBib2FyZC5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBSXRFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBOEIxRyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDOztJQUN0RCxnQkFBZ0IsR0FBRyxJQUFJOztJQUN2QixlQUFlLEdBQUcsSUFBSTs7QUFFNUIsTUFBTSxLQUFPLFVBQVUsR0FBZ0IsV0FBVzs7SUE4QmhELGlDQUFtQixJQUE0QixFQUFZLFFBQWtCLEVBQVksVUFBb0M7UUFBMUcsU0FBSSxHQUFKLElBQUksQ0FBd0I7UUFBWSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVksZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFDM0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUE7UUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7Z0NBN0JVLHVCQUF1Qjs7Ozs7O0lBRTNCLDhCQUFNOzs7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QUFDO0NBQUEsSUFBQTtTQXRHWSx1QkFBdUI7Ozs7Ozs7O0lBWWxDLDZDQUE0Qjs7Ozs7OztJQU81Qiw0Q0FBMkI7Ozs7O0lBRTNCLHlDQUFzQzs7Ozs7SUFDdEMsNENBQTZCOzs7OztJQUM3QixnREFBeUQ7O0lBRTdDLHVDQUFtQzs7Ozs7SUFBRSwyQ0FBNEI7Ozs7O0lBQUUsNkNBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3RvciwgT25EZXN0cm95LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBpbXBvcnQgeyBDbGlwYm9hcmQgfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL2NsaXBib2FyZCc7XG4vLyBUT0RPOiByZW1vdmUgaW50ZXJuYWwgaW1wbGVtZW50YXRpb24gaW4gdGhlIG5leHQgdmVyc2lvbiBvZiBjZGstZXhwZXJpbWVudGFsIChyaWdodCBhZnRlciA4LjEuMylcbmltcG9ydCB7IENsaXBib2FyZCB9IGZyb20gJy4vY2xpcGJvYXJkLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBOZ3JpZFBsdWdpbiwgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBjbGlwYm9hcmQ/OiBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbjtcbiAgfVxuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMge1xuICAgIGNsaXBib2FyZDoga2V5b2YgdHlwZW9mIFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luO1xuICB9XG59XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9ncmlkL3NlcnZpY2VzL2NvbmZpZycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIGNsaXBib2FyZD86IHtcbiAgICAgIC8qKiBXaGVuIHNldCB0byB0cnVlIHdpbGwgZW5hYmxlIHRoZSBjbGlwYm9hcmQgcGx1Z2luIG9uIGFsbCBncmlkIGluc3RhbmNlcyBieSBkZWZhdWx0LiAqL1xuICAgICAgYXV0b0VuYWJsZT86IGJvb2xlYW47XG4gICAgICAvKipcbiAgICAgICAqIFRoZSBzZXBhcmF0b3IgdG8gdXNlIHdoZW4gbXVsdGlwbGUgY2VsbHMgYXJlIGNvcGllZFxuICAgICAgICogQGRlZmF1bHQgXFx0XG4gICAgICAgKi9cbiAgICAgIGNlbGxTZXBhcmF0b3I/OiBzdHJpbmc7XG4gICAgICAvKipcbiAgICAgICAqIFRoZSBzZXBhcmF0b3IgdG8gdXNlIHdoZW4gbXVsdGlwbGUgcm93cyBhcmUgY29waWVkXG4gICAgICAgKiBAZGVmYXVsdCBcXG5cbiAgICAgICAqL1xuICAgICAgcm93U2VwYXJhdG9yPzogc3RyaW5nO1xuICAgIH07XG4gIH1cbn1cblxuY29uc3QgSVNfT1NYID0gL15tYWMvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCkpXG5jb25zdCBERUZBVUxUX0NFTExfU0VQID0gJ1xcdCc7XG5jb25zdCBERUZBVUxUX1JPV19TRVAgPSAnXFxuJztcblxuZXhwb3J0IGNvbnN0IFBMVUdJTl9LRVk6ICdjbGlwYm9hcmQnID0gJ2NsaXBib2FyZCc7XG5cbkBOZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZLCBmYWN0b3J5OiAnY3JlYXRlJyB9KVxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAncGJsLW5ncmlkW2NsaXBib2FyZF0nLCBleHBvcnRBczogJ3BibE5ncmlkQ2xpcGJvYXJkJyB9KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBzdGF0aWMgY3JlYXRlKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50LCBpbmplY3RvcjogSW5qZWN0b3IpOiBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbiB7XG4gICAgY29uc3QgcGx1Z2luQ3RybCA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKGdyaWQpO1xuICAgIHJldHVybiBuZXcgUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW4oZ3JpZCwgaW5qZWN0b3IsIHBsdWdpbkN0cmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBzZXBhcmF0b3IgdG8gdXNlIHdoZW4gbXVsdGlwbGUgY2VsbHMgYXJlIGNvcGllZC5cbiAgICogSWYgbm90IHNldCwgdGFrZW4gZnJvbSBgUGJsTmdyaWRDb25maWcuY2xpcGJvYXJkLmNlbGxTZXBhcmF0b3JgXG4gICAqIEBkZWZhdWx0IFxcdFxuICAgKi9cbiAgQElucHV0KCkgY2xwQ2VsbFNlcDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgc2VwYXJhdG9yIHRvIHVzZSB3aGVuIG11bHRpcGxlIHJvd3MgYXJlIGNvcGllZFxuICAgKiBJZiBub3Qgc2V0LCB0YWtlbiBmcm9tIGBQYmxOZ3JpZENvbmZpZy5jbGlwYm9hcmQucm93U2VwYXJhdG9yYFxuICAgKiBAZGVmYXVsdCBcXG5cbiAgICovXG4gIEBJbnB1dCgpIGNscFJvd1NlcDogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2U7XG4gIHByaXZhdGUgY2xpcGJvYXJkOiBDbGlwYm9hcmQ7XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50KSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLCBwcm90ZWN0ZWQgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgdGhpcy5jb25maWcgPSBpbmplY3Rvci5nZXQoUGJsTmdyaWRDb25maWdTZXJ2aWNlKVxuICAgIHRoaXMuY2xpcGJvYXJkID0gaW5qZWN0b3IuZ2V0KENsaXBib2FyZCk7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy5ncmlkKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0NvcHlFdmVudChldmVudDogRXZlbnQpOiBib29sZWFuIHtcbiAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50ICYmIGV2ZW50LmtleSA9PT0gJ2MnKSB7XG4gICAgICBpZiAoKCFJU19PU1ggJiYgZXZlbnQuY3RybEtleSkgfHwgKElTX09TWCAmJiBldmVudC5tZXRhS2V5KSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRvQ29weSgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNlbGxTZXBhcmF0b3IsIHJvd1NlcGFyYXRvciB9ID0gdGhpcy5jb25maWcuZ2V0KCdjbGlwYm9hcmQnLCB7fSk7XG4gICAgY29uc3QgeyByb3dzLCBtaW5JbmRleCB9ID0gdGhpcy5nZXRTZWxlY3RlZFJvd0RhdGEodGhpcy5ncmlkKTtcbiAgICBjb25zdCBjcmVhdGVSb3cgPSAocm93OiBhbnlbXSkgPT4gcm93LnNsaWNlKG1pbkluZGV4KS5qb2luKHRoaXMuY2xwQ2VsbFNlcCB8fCBjZWxsU2VwYXJhdG9yIHx8IERFRkFVTFRfQ0VMTF9TRVApO1xuICAgIC8vIEZvciBlYWNoIHJvdyAoY29sbGVjdGlvbiBvZiBpdGVtcyksIHNsaWNlIHRoZSBpbml0aWFsIGl0ZW1zIHRoYXQgYXJlIG5vdCBjb3BpZWQgYWNyb3NzIGFsbCBzZWxlY3Rpb25zXG5cbiAgICB0aGlzLmNsaXBib2FyZC5jb3B5KHJvd3MubWFwKGNyZWF0ZVJvdykuam9pbih0aGlzLmNscFJvd1NlcCB8fCByb3dTZXBhcmF0b3IgfHwgREVGQVVMVF9ST1dfU0VQKSk7XG4gICAgLy8gVE9ETzogQ29uc2lkZXIgdXNpbmcgYGJlZ2luQ29weWAgdG8gc3VwcG9ydCBsYXJnZSBjb3B5IG9wZXJhdGlvbnNcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTZWxlY3RlZFJvd0RhdGEoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQpIHtcbiAgICBjb25zdCB7IGNvbHVtbkFwaSwgY29udGV4dEFwaSB9ID0gZ3JpZDtcbiAgICBjb25zdCBkYXRhID0gbmV3IE1hcDxhbnksIGFueVtdPigpO1xuXG4gICAgLy8gVGhlIG1pbkluZGV4IHJlcHJlc2VudHMgdGhlIGZpcnN0IGNvbHVtbiBiZWluZyBjb3BpZWQgb3V0IG9mIGFsbCB2aXNpYmxlIGNvbHVtbnMgKDAgYmVpbmcgdGhlIGZpcnN0IHZpc2libGUgY29sdW1uKS5cbiAgICAvLyBGb3IgZXZlcnkgc2VsZWN0ZWQgY2VsbCwgdGhlIGNvbHVtbiBpcyB0cmFja2VkIGFuZCBpdCdzIGluZGV4IGlzIGJlaW5nIHNldCB0byBgbWluSW5kZXhgIGlmIGl0IGlzIGxvd2VyIHRoZW4gdGhlIGN1cnJlbnQgYG1pbkluZGV4YCAoTWF0aC5NaW4pLlxuICAgIC8vIFdlIHN0YXJ0IHdpdGggdGhlIGJpZ2dlc3QgaW50IGJ1dCByaWdodCBhd2F5IGdldCBhIHZhbGlkIGNvbHVtbiBpbmRleC4uLlxuICAgIC8vIExhdGVyIG9uLCBlYWNoIHJvdyBpcyBzbGljZWQgdG8gcmVtb3ZlIHRoZSBpdGVtcyBpbiBpbmRpY2VzIGxvd2VyIHRoZW4gdGhlIGBtaW5JbmRleGAuXG4gICAgLy9cbiAgICAvLyBBbGwgb2YgdGhpcyBpcyB0byBtYWtlIHRoZSBwYXN0ZSBzdGFydCB3aXRob3V0IGxlYWRpbmcgY2VsbCBzZXBhcmF0b3JzLlxuICAgIGxldCBtaW5JbmRleCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuXG4gICAgZm9yIChjb25zdCBwb2ludCBvZiBjb250ZXh0QXBpLnNlbGVjdGVkQ2VsbHMpIHtcbiAgICAgIGNvbnN0IGNvbCA9IGNvbHVtbkFwaS5jb2x1bW5zW3BvaW50LmNvbEluZGV4XTtcbiAgICAgIGlmIChjb2wpIHtcbiAgICAgICAgY29uc3QgY29sSW5kZXggPSBjb2x1bW5BcGkucmVuZGVySW5kZXhPZihjb2wpO1xuICAgICAgICBpZiAoY29sSW5kZXggPiAtMSkge1xuICAgICAgICAgIGNvbnN0IHJvd0luZGV4ID0gY29udGV4dEFwaS5maW5kUm93SW5DYWNoZShwb2ludC5yb3dJZGVudCkuZGF0YUluZGV4O1xuICAgICAgICAgIGNvbnN0IGRhdGFJdGVtID0gY29sLmdldFZhbHVlKGdyaWQuZHMuc291cmNlW3Jvd0luZGV4XSk7XG4gICAgICAgICAgY29uc3Qgcm93ID0gZGF0YS5nZXQocG9pbnQucm93SWRlbnQpIHx8IFtdO1xuICAgICAgICAgIHJvd1tjb2xJbmRleF0gPSBkYXRhSXRlbTtcbiAgICAgICAgICBkYXRhLnNldChwb2ludC5yb3dJZGVudCwgcm93KTtcbiAgICAgICAgICBtaW5JbmRleCA9IE1hdGgubWluKG1pbkluZGV4LCBjb2xJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWluSW5kZXgsXG4gICAgICByb3dzOiBBcnJheS5mcm9tKGRhdGEudmFsdWVzKCkpLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gdGhpcy5wbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIGlmICghdGhpcy5wbHVnaW5DdHJsLmhhc1BsdWdpbigndGFyZ2V0RXZlbnRzJykpIHtcbiAgICAgIHRoaXMucGx1Z2luQ3RybC5jcmVhdGVQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldEV2ZW50cyA9IHRoaXMucGx1Z2luQ3RybC5nZXRQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xuICAgIHRhcmdldEV2ZW50cy5rZXlEb3duXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCBldmVudCA9PiB0aGlzLmlzQ29weUV2ZW50KGV2ZW50LnNvdXJjZSkgKSxcbiAgICAgICAgVW5SeCh0aGlzKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4gdGhpcy5kb0NvcHkoKSApO1xuICB9XG59XG4iXX0=