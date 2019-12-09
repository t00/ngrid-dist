import { __values, __decorate, __metadata } from 'tslib';
import { filter, first } from 'rxjs/operators';
import { Injectable, Inject, ɵɵdefineInjectable, ɵɵinject, Injector, Directive, Input, NgModule, Optional, SkipSelf } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { UnRx } from '@pebula/utils';
import { PblNgridConfigService, PblNgridPluginController, PblNgridComponent, TablePlugin, PblNgridModule } from '@pebula/ngrid';
import { PblNgridTargetEventsModule } from '@pebula/ngrid/target-events';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A service for copying text to the clipboard.
 *
 * Example usage:
 *
 * clipboard.copy("copy this text");
 */
var Clipboard = /** @class */ (function () {
    function Clipboard(document) {
        this._document = document;
    }
    /**
    * Copies the provided text into the user's clipboard.
    *
    * @param text The string to copy.
    * @returns Whether the operation was successful.
    */
    /**
     * Copies the provided text into the user's clipboard.
     *
     * @param {?} text The string to copy.
     * @return {?} Whether the operation was successful.
     */
    Clipboard.prototype.copy = /**
     * Copies the provided text into the user's clipboard.
     *
     * @param {?} text The string to copy.
     * @return {?} Whether the operation was successful.
     */
    function (text) {
        /** @type {?} */
        var pendingCopy = this.beginCopy(text);
        /** @type {?} */
        var successful = pendingCopy.copy();
        pendingCopy.destroy();
        return successful;
    };
    /**
    * Prepares a string to be copied later. This is useful for large strings
    * which take too long to successfully render and be copied in the same tick.
    *
    * The caller must call `destroy` on the returned `PendingCopy`.
    *
    * @param text The string to copy.
    * @returns the pending copy operation.
    */
    /**
     * Prepares a string to be copied later. This is useful for large strings
     * which take too long to successfully render and be copied in the same tick.
     *
     * The caller must call `destroy` on the returned `PendingCopy`.
     *
     * @param {?} text The string to copy.
     * @return {?} the pending copy operation.
     */
    Clipboard.prototype.beginCopy = /**
     * Prepares a string to be copied later. This is useful for large strings
     * which take too long to successfully render and be copied in the same tick.
     *
     * The caller must call `destroy` on the returned `PendingCopy`.
     *
     * @param {?} text The string to copy.
     * @return {?} the pending copy operation.
     */
    function (text) {
        return new PendingCopy(text, this._document);
    };
    Clipboard.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    Clipboard.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ Clipboard.ngInjectableDef = ɵɵdefineInjectable({ factory: function Clipboard_Factory() { return new Clipboard(ɵɵinject(DOCUMENT)); }, token: Clipboard, providedIn: "root" });
    return Clipboard;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    Clipboard.prototype._document;
}
/**
 * A pending copy-to-clipboard operation.
 *
 * The implementation of copying text to the clipboard modifies the DOM and
 * forces a relayout. This relayout can take too long if the string is large,
 * causing the execCommand('copy') to happen too long after the user clicked.
 * This results in the browser refusing to copy. This object lets the
 * relayout happen in a separate tick from copying by providing a copy function
 * that can be called later.
 *
 * Destroy must be called when no longer in use, regardless of whether `copy` is
 * called.
 */
var /**
 * A pending copy-to-clipboard operation.
 *
 * The implementation of copying text to the clipboard modifies the DOM and
 * forces a relayout. This relayout can take too long if the string is large,
 * causing the execCommand('copy') to happen too long after the user clicked.
 * This results in the browser refusing to copy. This object lets the
 * relayout happen in a separate tick from copying by providing a copy function
 * that can be called later.
 *
 * Destroy must be called when no longer in use, regardless of whether `copy` is
 * called.
 */
PendingCopy = /** @class */ (function () {
    function PendingCopy(text, _document) {
        this._document = _document;
        /** @type {?} */
        var textarea = this._textarea = this._document.createElement('textarea');
        // Hide the element for display and accessibility.
        textarea.setAttribute('style', 'opacity: 0;');
        textarea.setAttribute('aria-hidden', 'true');
        textarea.value = text;
        this._document.body.appendChild(textarea);
    }
    /** Finishes copying the text. */
    /**
     * Finishes copying the text.
     * @return {?}
     */
    PendingCopy.prototype.copy = /**
     * Finishes copying the text.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var textarea = this._textarea;
        /** @type {?} */
        var successful = false;
        try { // Older browsers could throw if copy is not supported.
            if (textarea) {
                /** @type {?} */
                var currentFocus = document.activeElement;
                textarea.select();
                successful = this._document.execCommand('copy');
                if (currentFocus instanceof HTMLElement) {
                    currentFocus.focus();
                }
            }
        }
        catch (_a) {
            // Discard error.
            // Initial setting of {@code successful} will represent failure here.
        }
        return successful;
    };
    /** Cleans up DOM changes used to perform the copy operation. */
    /**
     * Cleans up DOM changes used to perform the copy operation.
     * @return {?}
     */
    PendingCopy.prototype.destroy = /**
     * Cleans up DOM changes used to perform the copy operation.
     * @return {?}
     */
    function () {
        if (this._textarea) {
            this._document.body.removeChild(this._textarea);
            this._textarea = undefined;
        }
    };
    return PendingCopy;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    PendingCopy.prototype._textarea;
    /**
     * @type {?}
     * @private
     */
    PendingCopy.prototype._document;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var IS_OSX = /^mac/.test(navigator.platform.toLowerCase());
/** @type {?} */
var DEFAULT_CELL_SEP = '\t';
/** @type {?} */
var DEFAULT_ROW_SEP = '\n';
/** @type {?} */
var PLUGIN_KEY = 'clipboard';
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
    PblNgridClipboardPlugin = PblNgridClipboardPlugin_1 = __decorate([
        TablePlugin({ id: PLUGIN_KEY, factory: 'create' }),
        UnRx(),
        __metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
    ], PblNgridClipboardPlugin);
    return PblNgridClipboardPlugin;
}());
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PblNgridClipboardPluginModule = /** @class */ (function () {
    function PblNgridClipboardPluginModule(parentModule, configService) {
        if (parentModule) {
            return;
        }
        PblNgridPluginController.created
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var config = configService.get(PLUGIN_KEY, {});
            if (config.autoEnable === true) {
                /** @type {?} */
                var pluginCtrl_1 = event.controller;
                pluginCtrl_1.events
                    .pipe(filter((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return e.kind === 'onInit'; })), first())
                    .subscribe((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) {
                    if (!pluginCtrl_1.hasPlugin(PLUGIN_KEY)) {
                        pluginCtrl_1.createPlugin(PLUGIN_KEY);
                    }
                }));
            }
        }));
    }
    PblNgridClipboardPluginModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, PblNgridModule, PblNgridTargetEventsModule],
                    declarations: [PblNgridClipboardPlugin],
                    exports: [PblNgridClipboardPlugin],
                },] }
    ];
    /** @nocollapse */
    PblNgridClipboardPluginModule.ctorParameters = function () { return [
        { type: PblNgridClipboardPluginModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: PblNgridConfigService }
    ]; };
    return PblNgridClipboardPluginModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PLUGIN_KEY, PblNgridClipboardPlugin, PblNgridClipboardPluginModule };
//# sourceMappingURL=pebula-ngrid-clipboard.js.map
