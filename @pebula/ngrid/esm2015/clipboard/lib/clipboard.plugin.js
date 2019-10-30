import * as tslib_1 from "tslib";
var PblNgridClipboardPlugin_1;
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { filter } from 'rxjs/operators';
import { Directive, Injector, Input } from '@angular/core';
// import { Clipboard } from '@angular/cdk-experimental/clipboard';
// TODO: remove internal implementation in the next version of cdk-experimental (right after 8.1.3)
import { Clipboard } from './clipboard.service';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, TablePlugin, PblNgridConfigService } from '@pebula/ngrid';
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
    TablePlugin({ id: PLUGIN_KEY, factory: 'create' }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvY2xpcGJvYXJkLyIsInNvdXJjZXMiOlsibGliL2NsaXBib2FyZC5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFhLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBSXRFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7O01BOEIxRyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDOztNQUN0RCxnQkFBZ0IsR0FBRyxJQUFJOztNQUN2QixlQUFlLEdBQUcsSUFBSTs7QUFFNUIsTUFBTSxPQUFPLFVBQVUsR0FBZ0IsV0FBVztJQUtyQyx1QkFBdUIscUNBQXZCLHVCQUF1Qjs7Ozs7O0lBeUJsQyxZQUFtQixJQUE0QixFQUFZLFFBQWtCLEVBQVksVUFBb0M7UUFBMUcsU0FBSSxHQUFKLElBQUksQ0FBd0I7UUFBWSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVksZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFDM0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUE7UUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7Ozs7OztJQTNCRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQXVCLEVBQUUsUUFBa0I7O2NBQ2pELFVBQVUsR0FBRyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RELE9BQU8sSUFBSSx5QkFBdUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Ozs7SUEwQkQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7OztJQUVTLFdBQVcsQ0FBQyxLQUFZO1FBQ2hDLElBQUksS0FBSyxZQUFZLGFBQWEsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRTtZQUN2RCxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDM0QsT0FBTyxJQUFJLENBQUM7YUFDYjtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7OztJQUVTLE1BQU07Y0FDUixFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO2NBQ2xFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOztjQUN2RCxTQUFTOzs7O1FBQUcsQ0FBQyxHQUFVLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksYUFBYSxJQUFJLGdCQUFnQixDQUFDLENBQUE7UUFDaEgsd0dBQXdHO1FBRXhHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksWUFBWSxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDakcsb0VBQW9FO0lBQ3RFLENBQUM7Ozs7OztJQUVTLGtCQUFrQixDQUFDLElBQXVCO2NBQzVDLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxHQUFHLElBQUk7O2NBQ2hDLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBYzs7Ozs7Ozs7WUFROUIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0I7UUFFdEMsS0FBSyxNQUFNLEtBQUssSUFBSSxVQUFVLENBQUMsYUFBYSxFQUFFOztrQkFDdEMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUM3QyxJQUFJLEdBQUcsRUFBRTs7c0JBQ0QsUUFBUSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO2dCQUM3QyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRTs7MEJBQ1gsUUFBUSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVM7OzBCQUM5RCxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7MEJBQ2pELEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO29CQUMxQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDO29CQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzlCLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztpQkFDekM7YUFDRjtTQUNGO1FBRUQsT0FBTztZQUNMLFFBQVE7WUFDUixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDaEMsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRU8sSUFBSTtRQUNWLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWpFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM5Qzs7Y0FFSyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO1FBQzlELFlBQVksQ0FBQyxPQUFPO2FBQ2pCLElBQUksQ0FDSCxNQUFNOzs7O1FBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ1g7YUFDQSxTQUFTOzs7O1FBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0NBQ0YsQ0FBQTs7WUF4R0EsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTs7OztZQXJDckUsaUJBQWlCO1lBUE4sUUFBUTtZQU9BLHdCQUF3Qjs7O3lCQW1EakQsS0FBSzt3QkFPTCxLQUFLOztBQW5CSyx1QkFBdUI7SUFIbkMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFFbEQsSUFBSSxFQUFFOzZDQTBCb0IsaUJBQWlCLEVBQTJCLFFBQVEsRUFBd0Isd0JBQXdCO0dBekJsSCx1QkFBdUIsQ0FzR25DO1NBdEdZLHVCQUF1Qjs7Ozs7Ozs7SUFZbEMsNkNBQTRCOzs7Ozs7O0lBTzVCLDRDQUEyQjs7Ozs7SUFFM0IseUNBQXNDOzs7OztJQUN0Qyw0Q0FBNkI7Ozs7O0lBQzdCLGdEQUF5RDs7SUFFN0MsdUNBQW1DOzs7OztJQUFFLDJDQUE0Qjs7Ozs7SUFBRSw2Q0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdG9yLCBPbkRlc3Ryb3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8vIGltcG9ydCB7IENsaXBib2FyZCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvY2xpcGJvYXJkJztcbi8vIFRPRE86IHJlbW92ZSBpbnRlcm5hbCBpbXBsZW1lbnRhdGlvbiBpbiB0aGUgbmV4dCB2ZXJzaW9uIG9mIGNkay1leHBlcmltZW50YWwgKHJpZ2h0IGFmdGVyIDguMS4zKVxuaW1wb3J0IHsgQ2xpcGJvYXJkIH0gZnJvbSAnLi9jbGlwYm9hcmQuc2VydmljZSc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFRhYmxlUGx1Z2luLCBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIGNsaXBib2FyZD86IFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luO1xuICB9XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3RvcmllcyB7XG4gICAgY2xpcGJvYXJkOiBrZXlvZiB0eXBlb2YgUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW47XG4gIH1cbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL3RhYmxlL3NlcnZpY2VzL2NvbmZpZycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIGNsaXBib2FyZD86IHtcbiAgICAgIC8qKiBXaGVuIHNldCB0byB0cnVlIHdpbGwgZW5hYmxlIHRoZSBjbGlwYm9hcmQgcGx1Z2luIG9uIGFsbCBncmlkIGluc3RhbmNlcyBieSBkZWZhdWx0LiAqL1xuICAgICAgYXV0b0VuYWJsZT86IGJvb2xlYW47XG4gICAgICAvKipcbiAgICAgICAqIFRoZSBzZXBhcmF0b3IgdG8gdXNlIHdoZW4gbXVsdGlwbGUgY2VsbHMgYXJlIGNvcGllZFxuICAgICAgICogQGRlZmF1bHQgXFx0XG4gICAgICAgKi9cbiAgICAgIGNlbGxTZXBhcmF0b3I/OiBzdHJpbmc7XG4gICAgICAvKipcbiAgICAgICAqIFRoZSBzZXBhcmF0b3IgdG8gdXNlIHdoZW4gbXVsdGlwbGUgcm93cyBhcmUgY29waWVkXG4gICAgICAgKiBAZGVmYXVsdCBcXG5cbiAgICAgICAqL1xuICAgICAgcm93U2VwYXJhdG9yPzogc3RyaW5nO1xuICAgIH07XG4gIH1cbn1cblxuY29uc3QgSVNfT1NYID0gL15tYWMvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCkpXG5jb25zdCBERUZBVUxUX0NFTExfU0VQID0gJ1xcdCc7XG5jb25zdCBERUZBVUxUX1JPV19TRVAgPSAnXFxuJztcblxuZXhwb3J0IGNvbnN0IFBMVUdJTl9LRVk6ICdjbGlwYm9hcmQnID0gJ2NsaXBib2FyZCc7XG5cbkBUYWJsZVBsdWdpbih7IGlkOiBQTFVHSU5fS0VZLCBmYWN0b3J5OiAnY3JlYXRlJyB9KVxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAncGJsLW5ncmlkW2NsaXBib2FyZF0nLCBleHBvcnRBczogJ3BibE5ncmlkQ2xpcGJvYXJkJyB9KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBzdGF0aWMgY3JlYXRlKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50LCBpbmplY3RvcjogSW5qZWN0b3IpOiBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbiB7XG4gICAgY29uc3QgcGx1Z2luQ3RybCA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKGdyaWQpO1xuICAgIHJldHVybiBuZXcgUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW4oZ3JpZCwgaW5qZWN0b3IsIHBsdWdpbkN0cmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBzZXBhcmF0b3IgdG8gdXNlIHdoZW4gbXVsdGlwbGUgY2VsbHMgYXJlIGNvcGllZC5cbiAgICogSWYgbm90IHNldCwgdGFrZW4gZnJvbSBgUGJsTmdyaWRDb25maWcuY2xpcGJvYXJkLmNlbGxTZXBhcmF0b3JgXG4gICAqIEBkZWZhdWx0IFxcdFxuICAgKi9cbiAgQElucHV0KCkgY2xwQ2VsbFNlcDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgc2VwYXJhdG9yIHRvIHVzZSB3aGVuIG11bHRpcGxlIHJvd3MgYXJlIGNvcGllZFxuICAgKiBJZiBub3Qgc2V0LCB0YWtlbiBmcm9tIGBQYmxOZ3JpZENvbmZpZy5jbGlwYm9hcmQucm93U2VwYXJhdG9yYFxuICAgKiBAZGVmYXVsdCBcXG5cbiAgICovXG4gIEBJbnB1dCgpIGNscFJvd1NlcDogc3RyaW5nO1xuXG4gIHByaXZhdGUgY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2U7XG4gIHByaXZhdGUgY2xpcGJvYXJkOiBDbGlwYm9hcmQ7XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50KSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLCBwcm90ZWN0ZWQgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgdGhpcy5jb25maWcgPSBpbmplY3Rvci5nZXQoUGJsTmdyaWRDb25maWdTZXJ2aWNlKVxuICAgIHRoaXMuY2xpcGJvYXJkID0gaW5qZWN0b3IuZ2V0KENsaXBib2FyZCk7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy5ncmlkKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0NvcHlFdmVudChldmVudDogRXZlbnQpOiBib29sZWFuIHtcbiAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50ICYmIGV2ZW50LmtleSA9PT0gJ2MnKSB7XG4gICAgICBpZiAoKCFJU19PU1ggJiYgZXZlbnQuY3RybEtleSkgfHwgKElTX09TWCAmJiBldmVudC5tZXRhS2V5KSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRvQ29weSgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNlbGxTZXBhcmF0b3IsIHJvd1NlcGFyYXRvciB9ID0gdGhpcy5jb25maWcuZ2V0KCdjbGlwYm9hcmQnLCB7fSk7XG4gICAgY29uc3QgeyByb3dzLCBtaW5JbmRleCB9ID0gdGhpcy5nZXRTZWxlY3RlZFJvd0RhdGEodGhpcy5ncmlkKTtcbiAgICBjb25zdCBjcmVhdGVSb3cgPSAocm93OiBhbnlbXSkgPT4gcm93LnNsaWNlKG1pbkluZGV4KS5qb2luKHRoaXMuY2xwQ2VsbFNlcCB8fCBjZWxsU2VwYXJhdG9yIHx8IERFRkFVTFRfQ0VMTF9TRVApO1xuICAgIC8vIEZvciBlYWNoIHJvdyAoY29sbGVjdGlvbiBvZiBpdGVtcyksIHNsaWNlIHRoZSBpbml0aWFsIGl0ZW1zIHRoYXQgYXJlIG5vdCBjb3BpZWQgYWNyb3NzIGFsbCBzZWxlY3Rpb25zXG5cbiAgICB0aGlzLmNsaXBib2FyZC5jb3B5KHJvd3MubWFwKGNyZWF0ZVJvdykuam9pbih0aGlzLmNscFJvd1NlcCB8fCByb3dTZXBhcmF0b3IgfHwgREVGQVVMVF9ST1dfU0VQKSk7XG4gICAgLy8gVE9ETzogQ29uc2lkZXIgdXNpbmcgYGJlZ2luQ29weWAgdG8gc3VwcG9ydCBsYXJnZSBjb3B5IG9wZXJhdGlvbnNcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTZWxlY3RlZFJvd0RhdGEoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQpIHtcbiAgICBjb25zdCB7IGNvbHVtbkFwaSwgY29udGV4dEFwaSB9ID0gZ3JpZDtcbiAgICBjb25zdCBkYXRhID0gbmV3IE1hcDxhbnksIGFueVtdPigpO1xuXG4gICAgLy8gVGhlIG1pbkluZGV4IHJlcHJlc2VudHMgdGhlIGZpcnN0IGNvbHVtbiBiZWluZyBjb3BpZWQgb3V0IG9mIGFsbCB2aXNpYmxlIGNvbHVtbnMgKDAgYmVpbmcgdGhlIGZpcnN0IHZpc2libGUgY29sdW1uKS5cbiAgICAvLyBGb3IgZXZlcnkgc2VsZWN0ZWQgY2VsbCwgdGhlIGNvbHVtbiBpcyB0cmFja2VkIGFuZCBpdCdzIGluZGV4IGlzIGJlaW5nIHNldCB0byBgbWluSW5kZXhgIGlmIGl0IGlzIGxvd2VyIHRoZW4gdGhlIGN1cnJlbnQgYG1pbkluZGV4YCAoTWF0aC5NaW4pLlxuICAgIC8vIFdlIHN0YXJ0IHdpdGggdGhlIGJpZ2dlc3QgaW50IGJ1dCByaWdodCBhd2F5IGdldCBhIHZhbGlkIGNvbHVtbiBpbmRleC4uLlxuICAgIC8vIExhdGVyIG9uLCBlYWNoIHJvdyBpcyBzbGljZWQgdG8gcmVtb3ZlIHRoZSBpdGVtcyBpbiBpbmRpY2VzIGxvd2VyIHRoZW4gdGhlIGBtaW5JbmRleGAuXG4gICAgLy9cbiAgICAvLyBBbGwgb2YgdGhpcyBpcyB0byBtYWtlIHRoZSBwYXN0ZSBzdGFydCB3aXRob3V0IGxlYWRpbmcgY2VsbCBzZXBhcmF0b3JzLlxuICAgIGxldCBtaW5JbmRleCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuXG4gICAgZm9yIChjb25zdCBwb2ludCBvZiBjb250ZXh0QXBpLnNlbGVjdGVkQ2VsbHMpIHtcbiAgICAgIGNvbnN0IGNvbCA9IGNvbHVtbkFwaS5jb2x1bW5zW3BvaW50LmNvbEluZGV4XTtcbiAgICAgIGlmIChjb2wpIHtcbiAgICAgICAgY29uc3QgY29sSW5kZXggPSBjb2x1bW5BcGkucmVuZGVySW5kZXhPZihjb2wpO1xuICAgICAgICBpZiAoY29sSW5kZXggPiAtMSkge1xuICAgICAgICAgIGNvbnN0IHJvd0luZGV4ID0gY29udGV4dEFwaS5maW5kUm93SW5DYWNoZShwb2ludC5yb3dJZGVudCkuZGF0YUluZGV4O1xuICAgICAgICAgIGNvbnN0IGRhdGFJdGVtID0gY29sLmdldFZhbHVlKGdyaWQuZHMuc291cmNlW3Jvd0luZGV4XSk7XG4gICAgICAgICAgY29uc3Qgcm93ID0gZGF0YS5nZXQocG9pbnQucm93SWRlbnQpIHx8IFtdO1xuICAgICAgICAgIHJvd1tjb2xJbmRleF0gPSBkYXRhSXRlbTtcbiAgICAgICAgICBkYXRhLnNldChwb2ludC5yb3dJZGVudCwgcm93KTtcbiAgICAgICAgICBtaW5JbmRleCA9IE1hdGgubWluKG1pbkluZGV4LCBjb2xJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWluSW5kZXgsXG4gICAgICByb3dzOiBBcnJheS5mcm9tKGRhdGEudmFsdWVzKCkpLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gdGhpcy5wbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIGlmICghdGhpcy5wbHVnaW5DdHJsLmhhc1BsdWdpbigndGFyZ2V0RXZlbnRzJykpIHtcbiAgICAgIHRoaXMucGx1Z2luQ3RybC5jcmVhdGVQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldEV2ZW50cyA9IHRoaXMucGx1Z2luQ3RybC5nZXRQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xuICAgIHRhcmdldEV2ZW50cy5rZXlEb3duXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCBldmVudCA9PiB0aGlzLmlzQ29weUV2ZW50KGV2ZW50LnNvdXJjZSkgKSxcbiAgICAgICAgVW5SeCh0aGlzKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4gdGhpcy5kb0NvcHkoKSApO1xuICB9XG59XG4iXX0=