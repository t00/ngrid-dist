import { __decorate, __metadata } from 'tslib';
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
class Clipboard {
    /**
     * @param {?} document
     */
    constructor(document) {
        this._document = document;
    }
    /**
     * Copies the provided text into the user's clipboard.
     *
     * @param {?} text The string to copy.
     * @return {?} Whether the operation was successful.
     */
    copy(text) {
        /** @type {?} */
        const pendingCopy = this.beginCopy(text);
        /** @type {?} */
        const successful = pendingCopy.copy();
        pendingCopy.destroy();
        return successful;
    }
    /**
     * Prepares a string to be copied later. This is useful for large strings
     * which take too long to successfully render and be copied in the same tick.
     *
     * The caller must call `destroy` on the returned `PendingCopy`.
     *
     * @param {?} text The string to copy.
     * @return {?} the pending copy operation.
     */
    beginCopy(text) {
        return new PendingCopy(text, this._document);
    }
}
Clipboard.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
Clipboard.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ Clipboard.ngInjectableDef = ɵɵdefineInjectable({ factory: function Clipboard_Factory() { return new Clipboard(ɵɵinject(DOCUMENT)); }, token: Clipboard, providedIn: "root" });
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
class PendingCopy {
    /**
     * @param {?} text
     * @param {?} _document
     */
    constructor(text, _document) {
        this._document = _document;
        /** @type {?} */
        const textarea = this._textarea = this._document.createElement('textarea');
        // Hide the element for display and accessibility.
        textarea.setAttribute('style', 'opacity: 0;');
        textarea.setAttribute('aria-hidden', 'true');
        textarea.value = text;
        this._document.body.appendChild(textarea);
    }
    /**
     * Finishes copying the text.
     * @return {?}
     */
    copy() {
        /** @type {?} */
        const textarea = this._textarea;
        /** @type {?} */
        let successful = false;
        try { // Older browsers could throw if copy is not supported.
            if (textarea) {
                /** @type {?} */
                const currentFocus = document.activeElement;
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
    }
    /**
     * Cleans up DOM changes used to perform the copy operation.
     * @return {?}
     */
    destroy() {
        if (this._textarea) {
            this._document.body.removeChild(this._textarea);
            this._textarea = undefined;
        }
    }
}
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

var PblNgridClipboardPlugin_1;
/** @type {?} */
const IS_OSX = /^mac/.test(navigator.platform.toLowerCase());
/** @type {?} */
const DEFAULT_CELL_SEP = '\t';
/** @type {?} */
const DEFAULT_ROW_SEP = '\n';
/** @type {?} */
const PLUGIN_KEY = 'clipboard';
let PblNgridClipboardPlugin = PblNgridClipboardPlugin_1 = class PblNgridClipboardPlugin {
    /**
     * @param {?} grid
     * @param {?} injector
     * @param {?} pluginCtrl
     */
    constructor(grid, injector, pluginCtrl) {
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
    static create(grid, injector) {
        /** @type {?} */
        const pluginCtrl = PblNgridPluginController.find(grid);
        return new PblNgridClipboardPlugin_1(grid, injector, pluginCtrl);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._removePlugin(this.grid);
    }
    /**
     * @protected
     * @param {?} event
     * @return {?}
     */
    isCopyEvent(event) {
        if (event instanceof KeyboardEvent && event.key === 'c') {
            if ((!IS_OSX && event.ctrlKey) || (IS_OSX && event.metaKey)) {
                return true;
            }
        }
        return false;
    }
    /**
     * @protected
     * @return {?}
     */
    doCopy() {
        const { cellSeparator, rowSeparator } = this.config.get('clipboard', {});
        const { rows, minIndex } = this.getSelectedRowData(this.grid);
        /** @type {?} */
        const createRow = (/**
         * @param {?} row
         * @return {?}
         */
        (row) => row.slice(minIndex).join(this.clpCellSep || cellSeparator || DEFAULT_CELL_SEP));
        // For each row (collection of items), slice the initial items that are not copied across all selections
        this.clipboard.copy(rows.map(createRow).join(this.clpRowSep || rowSeparator || DEFAULT_ROW_SEP));
        // TODO: Consider using `beginCopy` to support large copy operations
    }
    /**
     * @protected
     * @param {?} grid
     * @return {?}
     */
    getSelectedRowData(grid) {
        const { columnApi, contextApi } = grid;
        /** @type {?} */
        const data = new Map();
        // The minIndex represents the first column being copied out of all visible columns (0 being the first visible column).
        // For every selected cell, the column is tracked and it's index is being set to `minIndex` if it is lower then the current `minIndex` (Math.Min).
        // We start with the biggest int but right away get a valid column index...
        // Later on, each row is sliced to remove the items in indices lower then the `minIndex`.
        //
        // All of this is to make the paste start without leading cell separators.
        /** @type {?} */
        let minIndex = Number.MAX_SAFE_INTEGER;
        for (const point of contextApi.selectedCells) {
            /** @type {?} */
            const col = columnApi.columns[point.colIndex];
            if (col) {
                /** @type {?} */
                const colIndex = columnApi.renderIndexOf(col);
                if (colIndex > -1) {
                    /** @type {?} */
                    const rowIndex = contextApi.findRowInCache(point.rowIdent).dataIndex;
                    /** @type {?} */
                    const dataItem = col.getValue(grid.ds.source[rowIndex]);
                    /** @type {?} */
                    const row = data.get(point.rowIdent) || [];
                    row[colIndex] = dataItem;
                    data.set(point.rowIdent, row);
                    minIndex = Math.min(minIndex, colIndex);
                }
            }
        }
        return {
            minIndex,
            rows: Array.from(data.values()),
        };
    }
    /**
     * @private
     * @return {?}
     */
    init() {
        this._removePlugin = this.pluginCtrl.setPlugin(PLUGIN_KEY, this);
        if (!this.pluginCtrl.hasPlugin('targetEvents')) {
            this.pluginCtrl.createPlugin('targetEvents');
        }
        /** @type {?} */
        const targetEvents = this.pluginCtrl.getPlugin('targetEvents');
        targetEvents.keyDown
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => this.isCopyEvent(event.source))), UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => this.doCopy()));
    }
};
PblNgridClipboardPlugin.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: Injector },
    { type: PblNgridPluginController }
];
PblNgridClipboardPlugin.decorators = [
    { type: Directive, args: [{ selector: 'pbl-ngrid[clipboard]', exportAs: 'pblNgridClipboard' },] }
];
/** @nocollapse */
PblNgridClipboardPlugin.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: Injector },
    { type: PblNgridPluginController }
];
PblNgridClipboardPlugin.propDecorators = {
    clpCellSep: [{ type: Input }],
    clpRowSep: [{ type: Input }]
};
PblNgridClipboardPlugin = PblNgridClipboardPlugin_1 = __decorate([
    TablePlugin({ id: PLUGIN_KEY, factory: 'create' }),
    UnRx(),
    __metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
], PblNgridClipboardPlugin);
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
class PblNgridClipboardPluginModule {
    /**
     * @param {?} parentModule
     * @param {?} configService
     */
    constructor(parentModule, configService) {
        if (parentModule) {
            return;
        }
        PblNgridPluginController.created
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            const config = configService.get(PLUGIN_KEY, {});
            if (config.autoEnable === true) {
                /** @type {?} */
                const pluginCtrl = event.controller;
                pluginCtrl.events
                    .pipe(filter((/**
                 * @param {?} e
                 * @return {?}
                 */
                e => e.kind === 'onInit')), first())
                    .subscribe((/**
                 * @param {?} e
                 * @return {?}
                 */
                e => {
                    if (!pluginCtrl.hasPlugin(PLUGIN_KEY)) {
                        pluginCtrl.createPlugin(PLUGIN_KEY);
                    }
                }));
            }
        }));
    }
}
PblNgridClipboardPluginModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, PblNgridModule, PblNgridTargetEventsModule],
                declarations: [PblNgridClipboardPlugin],
                exports: [PblNgridClipboardPlugin],
            },] }
];
/** @nocollapse */
PblNgridClipboardPluginModule.ctorParameters = () => [
    { type: PblNgridClipboardPluginModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: PblNgridConfigService }
];

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
