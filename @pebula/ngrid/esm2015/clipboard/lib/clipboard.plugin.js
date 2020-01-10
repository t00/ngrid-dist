import * as tslib_1 from "tslib";
var PblNgridClipboardPlugin_1;
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { filter } from 'rxjs/operators';
import { Directive, Injector, OnDestroy, Input } from '@angular/core';
// import { Clipboard } from '@angular/cdk-experimental/clipboard';
// TODO: remove internal implementation in the next version of cdk-experimental (right after 8.1.3)
import { Clipboard } from './clipboard.service';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, NgridPlugin, PblNgridConfigService } from '@pebula/ngrid';
/** @type {?} */
const IS_OSX = /^mac/.test(navigator.platform.toLowerCase());
/** @type {?} */
const DEFAULT_CELL_SEP = '\t';
/** @type {?} */
const DEFAULT_ROW_SEP = '\n';
/** @type {?} */
export const PLUGIN_KEY = 'clipboard';
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
PblNgridClipboardPlugin = PblNgridClipboardPlugin_1 = tslib_1.__decorate([
    NgridPlugin({ id: PLUGIN_KEY, factory: 'create' }),
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
], PblNgridClipboardPlugin);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvY2xpcGJvYXJkLyIsInNvdXJjZXMiOlsibGliL2NsaXBib2FyZC5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUl0RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFaEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZUFBZSxDQUFDOztNQThCMUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7TUFDdEQsZ0JBQWdCLEdBQUcsSUFBSTs7TUFDdkIsZUFBZSxHQUFHLElBQUk7O0FBRTVCLE1BQU0sT0FBTyxVQUFVLEdBQWdCLFdBQVc7SUFLckMsdUJBQXVCLHFDQUF2Qix1QkFBdUI7Ozs7OztJQXlCbEMsWUFBbUIsSUFBNEIsRUFBWSxRQUFrQixFQUFZLFVBQW9DO1FBQTFHLFNBQUksR0FBSixJQUFJLENBQXdCO1FBQVksYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFZLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBQzNILElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1FBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDOzs7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QUEyQjs7Ozs7SUFFM0IseUNBQXNDOzs7OztJQUN0Qyw0Q0FBNkI7Ozs7O0lBQzdCLGdEQUF5RDs7SUFFN0MsdUNBQW1DOzs7OztJQUFFLDJDQUE0Qjs7Ozs7SUFBRSw2Q0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdG9yLCBPbkRlc3Ryb3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8vIGltcG9ydCB7IENsaXBib2FyZCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvY2xpcGJvYXJkJztcbi8vIFRPRE86IHJlbW92ZSBpbnRlcm5hbCBpbXBsZW1lbnRhdGlvbiBpbiB0aGUgbmV4dCB2ZXJzaW9uIG9mIGNkay1leHBlcmltZW50YWwgKHJpZ2h0IGFmdGVyIDguMS4zKVxuaW1wb3J0IHsgQ2xpcGJvYXJkIH0gZnJvbSAnLi9jbGlwYm9hcmQuc2VydmljZSc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIE5ncmlkUGx1Z2luLCBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIGNsaXBib2FyZD86IFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luO1xuICB9XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3RvcmllcyB7XG4gICAgY2xpcGJvYXJkOiBrZXlvZiB0eXBlb2YgUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW47XG4gIH1cbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2dyaWQvc2VydmljZXMvY29uZmlnJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgY2xpcGJvYXJkPzoge1xuICAgICAgLyoqIFdoZW4gc2V0IHRvIHRydWUgd2lsbCBlbmFibGUgdGhlIGNsaXBib2FyZCBwbHVnaW4gb24gYWxsIGdyaWQgaW5zdGFuY2VzIGJ5IGRlZmF1bHQuICovXG4gICAgICBhdXRvRW5hYmxlPzogYm9vbGVhbjtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIHNlcGFyYXRvciB0byB1c2Ugd2hlbiBtdWx0aXBsZSBjZWxscyBhcmUgY29waWVkXG4gICAgICAgKiBAZGVmYXVsdCBcXHRcbiAgICAgICAqL1xuICAgICAgY2VsbFNlcGFyYXRvcj86IHN0cmluZztcbiAgICAgIC8qKlxuICAgICAgICogVGhlIHNlcGFyYXRvciB0byB1c2Ugd2hlbiBtdWx0aXBsZSByb3dzIGFyZSBjb3BpZWRcbiAgICAgICAqIEBkZWZhdWx0IFxcblxuICAgICAgICovXG4gICAgICByb3dTZXBhcmF0b3I/OiBzdHJpbmc7XG4gICAgfTtcbiAgfVxufVxuXG5jb25zdCBJU19PU1ggPSAvXm1hYy8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0udG9Mb3dlckNhc2UoKSlcbmNvbnN0IERFRkFVTFRfQ0VMTF9TRVAgPSAnXFx0JztcbmNvbnN0IERFRkFVTFRfUk9XX1NFUCA9ICdcXG4nO1xuXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ2NsaXBib2FyZCcgPSAnY2xpcGJvYXJkJztcblxuQE5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVksIGZhY3Rvcnk6ICdjcmVhdGUnIH0pXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbY2xpcGJvYXJkXScsIGV4cG9ydEFzOiAncGJsTmdyaWRDbGlwYm9hcmQnIH0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHN0YXRpYyBjcmVhdGUoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQsIGluamVjdG9yOiBJbmplY3Rvcik6IFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luIHtcbiAgICBjb25zdCBwbHVnaW5DdHJsID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQoZ3JpZCk7XG4gICAgcmV0dXJuIG5ldyBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbihncmlkLCBpbmplY3RvciwgcGx1Z2luQ3RybCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHNlcGFyYXRvciB0byB1c2Ugd2hlbiBtdWx0aXBsZSBjZWxscyBhcmUgY29waWVkLlxuICAgKiBJZiBub3Qgc2V0LCB0YWtlbiBmcm9tIGBQYmxOZ3JpZENvbmZpZy5jbGlwYm9hcmQuY2VsbFNlcGFyYXRvcmBcbiAgICogQGRlZmF1bHQgXFx0XG4gICAqL1xuICBASW5wdXQoKSBjbHBDZWxsU2VwOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBzZXBhcmF0b3IgdG8gdXNlIHdoZW4gbXVsdGlwbGUgcm93cyBhcmUgY29waWVkXG4gICAqIElmIG5vdCBzZXQsIHRha2VuIGZyb20gYFBibE5ncmlkQ29uZmlnLmNsaXBib2FyZC5yb3dTZXBhcmF0b3JgXG4gICAqIEBkZWZhdWx0IFxcblxuICAgKi9cbiAgQElucHV0KCkgY2xwUm93U2VwOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjb25maWc6IFBibE5ncmlkQ29uZmlnU2VydmljZTtcbiAgcHJpdmF0ZSBjbGlwYm9hcmQ6IENsaXBib2FyZDtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3IsIHByb3RlY3RlZCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGluamVjdG9yLmdldChQYmxOZ3JpZENvbmZpZ1NlcnZpY2UpXG4gICAgdGhpcy5jbGlwYm9hcmQgPSBpbmplY3Rvci5nZXQoQ2xpcGJvYXJkKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLmdyaWQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzQ29weUV2ZW50KGV2ZW50OiBFdmVudCk6IGJvb2xlYW4ge1xuICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQgJiYgZXZlbnQua2V5ID09PSAnYycpIHtcbiAgICAgIGlmICgoIUlTX09TWCAmJiBldmVudC5jdHJsS2V5KSB8fCAoSVNfT1NYICYmIGV2ZW50Lm1ldGFLZXkpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgZG9Db3B5KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY2VsbFNlcGFyYXRvciwgcm93U2VwYXJhdG9yIH0gPSB0aGlzLmNvbmZpZy5nZXQoJ2NsaXBib2FyZCcsIHt9KTtcbiAgICBjb25zdCB7IHJvd3MsIG1pbkluZGV4IH0gPSB0aGlzLmdldFNlbGVjdGVkUm93RGF0YSh0aGlzLmdyaWQpO1xuICAgIGNvbnN0IGNyZWF0ZVJvdyA9IChyb3c6IGFueVtdKSA9PiByb3cuc2xpY2UobWluSW5kZXgpLmpvaW4odGhpcy5jbHBDZWxsU2VwIHx8IGNlbGxTZXBhcmF0b3IgfHwgREVGQVVMVF9DRUxMX1NFUCk7XG4gICAgLy8gRm9yIGVhY2ggcm93IChjb2xsZWN0aW9uIG9mIGl0ZW1zKSwgc2xpY2UgdGhlIGluaXRpYWwgaXRlbXMgdGhhdCBhcmUgbm90IGNvcGllZCBhY3Jvc3MgYWxsIHNlbGVjdGlvbnNcblxuICAgIHRoaXMuY2xpcGJvYXJkLmNvcHkocm93cy5tYXAoY3JlYXRlUm93KS5qb2luKHRoaXMuY2xwUm93U2VwIHx8IHJvd1NlcGFyYXRvciB8fCBERUZBVUxUX1JPV19TRVApKTtcbiAgICAvLyBUT0RPOiBDb25zaWRlciB1c2luZyBgYmVnaW5Db3B5YCB0byBzdXBwb3J0IGxhcmdlIGNvcHkgb3BlcmF0aW9uc1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFNlbGVjdGVkUm93RGF0YShncmlkOiBQYmxOZ3JpZENvbXBvbmVudCkge1xuICAgIGNvbnN0IHsgY29sdW1uQXBpLCBjb250ZXh0QXBpIH0gPSBncmlkO1xuICAgIGNvbnN0IGRhdGEgPSBuZXcgTWFwPGFueSwgYW55W10+KCk7XG5cbiAgICAvLyBUaGUgbWluSW5kZXggcmVwcmVzZW50cyB0aGUgZmlyc3QgY29sdW1uIGJlaW5nIGNvcGllZCBvdXQgb2YgYWxsIHZpc2libGUgY29sdW1ucyAoMCBiZWluZyB0aGUgZmlyc3QgdmlzaWJsZSBjb2x1bW4pLlxuICAgIC8vIEZvciBldmVyeSBzZWxlY3RlZCBjZWxsLCB0aGUgY29sdW1uIGlzIHRyYWNrZWQgYW5kIGl0J3MgaW5kZXggaXMgYmVpbmcgc2V0IHRvIGBtaW5JbmRleGAgaWYgaXQgaXMgbG93ZXIgdGhlbiB0aGUgY3VycmVudCBgbWluSW5kZXhgIChNYXRoLk1pbikuXG4gICAgLy8gV2Ugc3RhcnQgd2l0aCB0aGUgYmlnZ2VzdCBpbnQgYnV0IHJpZ2h0IGF3YXkgZ2V0IGEgdmFsaWQgY29sdW1uIGluZGV4Li4uXG4gICAgLy8gTGF0ZXIgb24sIGVhY2ggcm93IGlzIHNsaWNlZCB0byByZW1vdmUgdGhlIGl0ZW1zIGluIGluZGljZXMgbG93ZXIgdGhlbiB0aGUgYG1pbkluZGV4YC5cbiAgICAvL1xuICAgIC8vIEFsbCBvZiB0aGlzIGlzIHRvIG1ha2UgdGhlIHBhc3RlIHN0YXJ0IHdpdGhvdXQgbGVhZGluZyBjZWxsIHNlcGFyYXRvcnMuXG4gICAgbGV0IG1pbkluZGV4ID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG5cbiAgICBmb3IgKGNvbnN0IHBvaW50IG9mIGNvbnRleHRBcGkuc2VsZWN0ZWRDZWxscykge1xuICAgICAgY29uc3QgY29sID0gY29sdW1uQXBpLmNvbHVtbnNbcG9pbnQuY29sSW5kZXhdO1xuICAgICAgaWYgKGNvbCkge1xuICAgICAgICBjb25zdCBjb2xJbmRleCA9IGNvbHVtbkFwaS5yZW5kZXJJbmRleE9mKGNvbCk7XG4gICAgICAgIGlmIChjb2xJbmRleCA+IC0xKSB7XG4gICAgICAgICAgY29uc3Qgcm93SW5kZXggPSBjb250ZXh0QXBpLmZpbmRSb3dJbkNhY2hlKHBvaW50LnJvd0lkZW50KS5kYXRhSW5kZXg7XG4gICAgICAgICAgY29uc3QgZGF0YUl0ZW0gPSBjb2wuZ2V0VmFsdWUoZ3JpZC5kcy5zb3VyY2Vbcm93SW5kZXhdKTtcbiAgICAgICAgICBjb25zdCByb3cgPSBkYXRhLmdldChwb2ludC5yb3dJZGVudCkgfHwgW107XG4gICAgICAgICAgcm93W2NvbEluZGV4XSA9IGRhdGFJdGVtO1xuICAgICAgICAgIGRhdGEuc2V0KHBvaW50LnJvd0lkZW50LCByb3cpO1xuICAgICAgICAgIG1pbkluZGV4ID0gTWF0aC5taW4obWluSW5kZXgsIGNvbEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBtaW5JbmRleCxcbiAgICAgIHJvd3M6IEFycmF5LmZyb20oZGF0YS52YWx1ZXMoKSksXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSB0aGlzLnBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgaWYgKCF0aGlzLnBsdWdpbkN0cmwuaGFzUGx1Z2luKCd0YXJnZXRFdmVudHMnKSkge1xuICAgICAgdGhpcy5wbHVnaW5DdHJsLmNyZWF0ZVBsdWdpbigndGFyZ2V0RXZlbnRzJyk7XG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0RXZlbnRzID0gdGhpcy5wbHVnaW5DdHJsLmdldFBsdWdpbigndGFyZ2V0RXZlbnRzJyk7XG4gICAgdGFyZ2V0RXZlbnRzLmtleURvd25cbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoIGV2ZW50ID0+IHRoaXMuaXNDb3B5RXZlbnQoZXZlbnQuc291cmNlKSApLFxuICAgICAgICBVblJ4KHRoaXMpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB0aGlzLmRvQ29weSgpICk7XG4gIH1cbn1cbiJdfQ==