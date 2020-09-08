/**
 * @fileoverview added by tsickle
 * Generated from: lib/clipboard.plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { filter } from 'rxjs/operators';
import { Directive, Injector, Input } from '@angular/core';
// import { Clipboard } from '@angular/cdk-experimental/clipboard';
// TODO: remove internal implementation in the next version of cdk-experimental (right after 8.1.3)
import { Clipboard } from './clipboard.service';
import { PblNgridComponent, PblNgridPluginController, PblNgridConfigService, utils } from '@pebula/ngrid';
/** @type {?} */
const IS_OSX = /^mac/.test(navigator.platform.toLowerCase());
/** @type {?} */
const DEFAULT_CELL_SEP = '\t';
/** @type {?} */
const DEFAULT_ROW_SEP = '\n';
/** @type {?} */
export const PLUGIN_KEY = 'clipboard';
export class PblNgridClipboardPlugin {
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
        return new PblNgridClipboardPlugin(grid, injector, pluginCtrl);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        utils.unrx.kill(this);
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
        // contextApi.selectedCells are un-ordered, their order is based on the order in which user have selected cells.
        // It means that the row's will not paste in the proper order unless we re-order them based on the data index.
        // This is a very native and simple implementation that will hold most copy actions 1k +-
        // TODO: Consider a better logic, taking performance into consideration.
        /** @type {?} */
        const entries = Array.from(data.entries());
        entries.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => {
            /** @type {?} */
            const aIndex = contextApi.findRowInCache(a[0]).dataIndex;
            /** @type {?} */
            const bIndex = contextApi.findRowInCache(b[0]).dataIndex;
            if (aIndex < bIndex) {
                return -1;
            }
            else {
                return 1;
            }
        }));
        return {
            minIndex,
            rows: entries.map((/**
             * @param {?} e
             * @return {?}
             */
            e => e[1])),
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
        event => this.isCopyEvent(event.source))), utils.unrx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => this.doCopy()));
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvY2xpcGJvYXJkLyIsInNvdXJjZXMiOlsibGliL2NsaXBib2FyZC5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQWEsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFJdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWhELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O01BOEJwRyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDOztNQUN0RCxnQkFBZ0IsR0FBRyxJQUFJOztNQUN2QixlQUFlLEdBQUcsSUFBSTs7QUFFNUIsTUFBTSxPQUFPLFVBQVUsR0FBZ0IsV0FBVztBQUdsRCxNQUFNLE9BQU8sdUJBQXVCOzs7Ozs7SUF5QmxDLFlBQW1CLElBQTRCLEVBQVksUUFBa0IsRUFBWSxVQUFvQztRQUExRyxTQUFJLEdBQUosSUFBSSxDQUF3QjtRQUFZLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBWSxlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUMzSCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7O0lBM0JELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBdUIsRUFBRSxRQUFrQjs7Y0FDakQsVUFB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QU0sRUFBRSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7O1lBdkhGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7Ozs7WUFwQ3JFLGlCQUFpQjtZQU5OLFFBQVE7WUFNQSx3QkFBd0I7Ozt5QkFpRGpELEtBQUs7d0JBT0wsS0FBSzs7Ozs7Ozs7O0lBUE4sNkNBQTRCOzs7Ozs7O0lBTzVCLDRDQUEyQjs7Ozs7SUFFM0IseUNBQXNDOzs7OztJQUN0Qyw0Q0FBNkI7Ozs7O0lBQzdCLGdEQUF5RDs7SUFFN0MsdUNBQW1DOzs7OztJQUFFLDJDQUE0Qjs7Ozs7SUFBRSw2Q0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdG9yLCBPbkRlc3Ryb3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8vIGltcG9ydCB7IENsaXBib2FyZCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvY2xpcGJvYXJkJztcbi8vIFRPRE86IHJlbW92ZSBpbnRlcm5hbCBpbXBsZW1lbnRhdGlvbiBpbiB0aGUgbmV4dCB2ZXJzaW9uIG9mIGNkay1leHBlcmltZW50YWwgKHJpZ2h0IGFmdGVyIDguMS4zKVxuaW1wb3J0IHsgQ2xpcGJvYXJkIH0gZnJvbSAnLi9jbGlwYm9hcmQuc2VydmljZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkQ29uZmlnU2VydmljZSwgdXRpbHMgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIGNsaXBib2FyZD86IFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luO1xuICB9XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3RvcmllcyB7XG4gICAgY2xpcGJvYXJkOiBrZXlvZiB0eXBlb2YgUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW47XG4gIH1cbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2dyaWQvc2VydmljZXMvY29uZmlnJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgY2xpcGJvYXJkPzoge1xuICAgICAgLyoqIFdoZW4gc2V0IHRvIHRydWUgd2lsbCBlbmFibGUgdGhlIGNsaXBib2FyZCBwbHVnaW4gb24gYWxsIGdyaWQgaW5zdGFuY2VzIGJ5IGRlZmF1bHQuICovXG4gICAgICBhdXRvRW5hYmxlPzogYm9vbGVhbjtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIHNlcGFyYXRvciB0byB1c2Ugd2hlbiBtdWx0aXBsZSBjZWxscyBhcmUgY29waWVkXG4gICAgICAgKiBAZGVmYXVsdCBcXHRcbiAgICAgICAqL1xuICAgICAgY2VsbFNlcGFyYXRvcj86IHN0cmluZztcbiAgICAgIC8qKlxuICAgICAgICogVGhlIHNlcGFyYXRvciB0byB1c2Ugd2hlbiBtdWx0aXBsZSByb3dzIGFyZSBjb3BpZWRcbiAgICAgICAqIEBkZWZhdWx0IFxcblxuICAgICAgICovXG4gICAgICByb3dTZXBhcmF0b3I/OiBzdHJpbmc7XG4gICAgfTtcbiAgfVxufVxuXG5jb25zdCBJU19PU1ggPSAvXm1hYy8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0udG9Mb3dlckNhc2UoKSlcbmNvbnN0IERFRkFVTFRfQ0VMTF9TRVAgPSAnXFx0JztcbmNvbnN0IERFRkFVTFRfUk9XX1NFUCA9ICdcXG4nO1xuXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ2NsaXBib2FyZCcgPSAnY2xpcGJvYXJkJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAncGJsLW5ncmlkW2NsaXBib2FyZF0nLCBleHBvcnRBczogJ3BibE5ncmlkQ2xpcGJvYXJkJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBzdGF0aWMgY3JlYXRlKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50LCBpbmplY3RvcjogSW5qZWN0b3IpOiBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbiB7XG4gICAgY29uc3QgcGx1Z2luQ3RybCA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKGdyaWQpO1xuICAgIHJldHVybiBuZXcgUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW4oZ3JpZCwgaW5qZWN0b3IsIHBsdWdpbkN0cmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBzZXBhcmF0b3IgdG8gdXNlIHdoZW4gbXVsdGlwbGUgY2VsbHMgYXJlIGNvcGllZC5cbiAgICogSWYgbm90IHNldCwgdGFrZW4gZnJvbSBgUGJsTmdyaWRDb25maWcuY2xpcGJvYXJkLmNlbGxTZXBhcmF0b3JgXG4gICAqIEBkZWZhdWx0IFxcdFxuICAgKi9cbiAgQElucHV0KCkgY2xwQ2VsbFNlcDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgc2VwYXJhdG9yIHRvIHVzZSB3aGVuIG11bHRpcGxlIHJvd3MgYXJlIGNvcGllZFxuICAgKiBJZiBub3Qgc2V0LCB0YWtlbiBmcm9tIGBQYmxOZ3JpZENvbmZpZy5jbGlwYm9hcmQucm93U2VwYXJhdG9yYFxuICAgKiBAZGVmYXVsdCBcXG5cbiAgICovXG4gIEBJbnB1dCgpIGNscFJvd1NlcDogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2U7XG4gIHByaXZhdGUgY2xpcGJvYXJkOiBDbGlwYm9hcmQ7XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50KSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLCBwcm90ZWN0ZWQgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgdGhpcy5jb25maWcgPSBpbmplY3Rvci5nZXQoUGJsTmdyaWRDb25maWdTZXJ2aWNlKVxuICAgIHRoaXMuY2xpcGJvYXJkID0gaW5qZWN0b3IuZ2V0KENsaXBib2FyZCk7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB1dGlscy51bnJ4LmtpbGwodGhpcyk7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMuZ3JpZCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNDb3B5RXZlbnQoZXZlbnQ6IEV2ZW50KTogYm9vbGVhbiB7XG4gICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCAmJiBldmVudC5rZXkgPT09ICdjJykge1xuICAgICAgaWYgKCghSVNfT1NYICYmIGV2ZW50LmN0cmxLZXkpIHx8IChJU19PU1ggJiYgZXZlbnQubWV0YUtleSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkb0NvcHkoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjZWxsU2VwYXJhdG9yLCByb3dTZXBhcmF0b3IgfSA9IHRoaXMuY29uZmlnLmdldCgnY2xpcGJvYXJkJywge30pO1xuICAgIGNvbnN0IHsgcm93cywgbWluSW5kZXggfSA9IHRoaXMuZ2V0U2VsZWN0ZWRSb3dEYXRhKHRoaXMuZ3JpZCk7XG4gICAgY29uc3QgY3JlYXRlUm93ID0gKHJvdzogYW55W10pID0+IHJvdy5zbGljZShtaW5JbmRleCkuam9pbih0aGlzLmNscENlbGxTZXAgfHwgY2VsbFNlcGFyYXRvciB8fCBERUZBVUxUX0NFTExfU0VQKTtcbiAgICAvLyBGb3IgZWFjaCByb3cgKGNvbGxlY3Rpb24gb2YgaXRlbXMpLCBzbGljZSB0aGUgaW5pdGlhbCBpdGVtcyB0aGF0IGFyZSBub3QgY29waWVkIGFjcm9zcyBhbGwgc2VsZWN0aW9uc1xuXG4gICAgdGhpcy5jbGlwYm9hcmQuY29weShyb3dzLm1hcChjcmVhdGVSb3cpLmpvaW4odGhpcy5jbHBSb3dTZXAgfHwgcm93U2VwYXJhdG9yIHx8IERFRkFVTFRfUk9XX1NFUCkpO1xuICAgIC8vIFRPRE86IENvbnNpZGVyIHVzaW5nIGBiZWdpbkNvcHlgIHRvIHN1cHBvcnQgbGFyZ2UgY29weSBvcGVyYXRpb25zXG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0U2VsZWN0ZWRSb3dEYXRhKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50KSB7XG4gICAgY29uc3QgeyBjb2x1bW5BcGksIGNvbnRleHRBcGkgfSA9IGdyaWQ7XG4gICAgY29uc3QgZGF0YSA9IG5ldyBNYXA8YW55LCBhbnlbXT4oKTtcblxuICAgIC8vIFRoZSBtaW5JbmRleCByZXByZXNlbnRzIHRoZSBmaXJzdCBjb2x1bW4gYmVpbmcgY29waWVkIG91dCBvZiBhbGwgdmlzaWJsZSBjb2x1bW5zICgwIGJlaW5nIHRoZSBmaXJzdCB2aXNpYmxlIGNvbHVtbikuXG4gICAgLy8gRm9yIGV2ZXJ5IHNlbGVjdGVkIGNlbGwsIHRoZSBjb2x1bW4gaXMgdHJhY2tlZCBhbmQgaXQncyBpbmRleCBpcyBiZWluZyBzZXQgdG8gYG1pbkluZGV4YCBpZiBpdCBpcyBsb3dlciB0aGVuIHRoZSBjdXJyZW50IGBtaW5JbmRleGAgKE1hdGguTWluKS5cbiAgICAvLyBXZSBzdGFydCB3aXRoIHRoZSBiaWdnZXN0IGludCBidXQgcmlnaHQgYXdheSBnZXQgYSB2YWxpZCBjb2x1bW4gaW5kZXguLi5cbiAgICAvLyBMYXRlciBvbiwgZWFjaCByb3cgaXMgc2xpY2VkIHRvIHJlbW92ZSB0aGUgaXRlbXMgaW4gaW5kaWNlcyBsb3dlciB0aGVuIHRoZSBgbWluSW5kZXhgLlxuICAgIC8vXG4gICAgLy8gQWxsIG9mIHRoaXMgaXMgdG8gbWFrZSB0aGUgcGFzdGUgc3RhcnQgd2l0aG91dCBsZWFkaW5nIGNlbGwgc2VwYXJhdG9ycy5cbiAgICBsZXQgbWluSW5kZXggPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcblxuICAgIGZvciAoY29uc3QgcG9pbnQgb2YgY29udGV4dEFwaS5zZWxlY3RlZENlbGxzKSB7XG4gICAgICBjb25zdCBjb2wgPSBjb2x1bW5BcGkuY29sdW1uc1twb2ludC5jb2xJbmRleF07XG4gICAgICBpZiAoY29sKSB7XG4gICAgICAgIGNvbnN0IGNvbEluZGV4ID0gY29sdW1uQXBpLnJlbmRlckluZGV4T2YoY29sKTtcbiAgICAgICAgaWYgKGNvbEluZGV4ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCByb3dJbmRleCA9IGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUocG9pbnQucm93SWRlbnQpLmRhdGFJbmRleDtcbiAgICAgICAgICBjb25zdCBkYXRhSXRlbSA9IGNvbC5nZXRWYWx1ZShncmlkLmRzLnNvdXJjZVtyb3dJbmRleF0pO1xuICAgICAgICAgIGNvbnN0IHJvdyA9IGRhdGEuZ2V0KHBvaW50LnJvd0lkZW50KSB8fCBbXTtcbiAgICAgICAgICByb3dbY29sSW5kZXhdID0gZGF0YUl0ZW07XG4gICAgICAgICAgZGF0YS5zZXQocG9pbnQucm93SWRlbnQsIHJvdyk7XG4gICAgICAgICAgbWluSW5kZXggPSBNYXRoLm1pbihtaW5JbmRleCwgY29sSW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY29udGV4dEFwaS5zZWxlY3RlZENlbGxzIGFyZSB1bi1vcmRlcmVkLCB0aGVpciBvcmRlciBpcyBiYXNlZCBvbiB0aGUgb3JkZXIgaW4gd2hpY2ggdXNlciBoYXZlIHNlbGVjdGVkIGNlbGxzLlxuICAgIC8vIEl0IG1lYW5zIHRoYXQgdGhlIHJvdydzIHdpbGwgbm90IHBhc3RlIGluIHRoZSBwcm9wZXIgb3JkZXIgdW5sZXNzIHdlIHJlLW9yZGVyIHRoZW0gYmFzZWQgb24gdGhlIGRhdGEgaW5kZXguXG4gICAgLy8gVGhpcyBpcyBhIHZlcnkgbmF0aXZlIGFuZCBzaW1wbGUgaW1wbGVtZW50YXRpb24gdGhhdCB3aWxsIGhvbGQgbW9zdCBjb3B5IGFjdGlvbnMgMWsgKy1cbiAgICAvLyBUT0RPOiBDb25zaWRlciBhIGJldHRlciBsb2dpYywgdGFraW5nIHBlcmZvcm1hbmNlIGludG8gY29uc2lkZXJhdGlvbi5cblxuICAgIGNvbnN0IGVudHJpZXMgPSBBcnJheS5mcm9tKGRhdGEuZW50cmllcygpKTtcbiAgICBlbnRyaWVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IGFJbmRleCA9IGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUoYVswXSkuZGF0YUluZGV4O1xuICAgICAgY29uc3QgYkluZGV4ID0gY29udGV4dEFwaS5maW5kUm93SW5DYWNoZShiWzBdKS5kYXRhSW5kZXg7XG4gICAgICBpZiAoYUluZGV4IDwgYkluZGV4KSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1pbkluZGV4LFxuICAgICAgcm93czogZW50cmllcy5tYXAoIGUgPT4gZVsxXSApLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gdGhpcy5wbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIGlmICghdGhpcy5wbHVnaW5DdHJsLmhhc1BsdWdpbigndGFyZ2V0RXZlbnRzJykpIHtcbiAgICAgIHRoaXMucGx1Z2luQ3RybC5jcmVhdGVQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldEV2ZW50cyA9IHRoaXMucGx1Z2luQ3RybC5nZXRQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xuICAgIHRhcmdldEV2ZW50cy5rZXlEb3duXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCBldmVudCA9PiB0aGlzLmlzQ29weUV2ZW50KGV2ZW50LnNvdXJjZSkgKSxcbiAgICAgICAgdXRpbHMudW5yeCh0aGlzKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4gdGhpcy5kb0NvcHkoKSApO1xuICB9XG59XG4iXX0=