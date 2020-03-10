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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvY2xpcGJvYXJkLyIsInNvdXJjZXMiOlsibGliL2NsaXBib2FyZC5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUl0RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFaEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZUFBZSxDQUFDOztNQThCMUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7TUFDdEQsZ0JBQWdCLEdBQUcsSUFBSTs7TUFDdkIsZUFBZSxHQUFHLElBQUk7O0FBRTVCLE1BQU0sT0FBTyxVQUFVLEdBQWdCLFdBQVc7SUFLckMsdUJBQXVCLHFDQUF2Qix1QkFBdUI7Ozs7OztJQXlCbEMsWUFBbUIsSUFBNEIsRUFBWSxRQUFrQixFQUFZLFVBQW9DO1FBQTFHLFNBQUksR0FBSixJQUFJLENBQXdCO1FBQVksYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFZLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBQzNILElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1FBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDOzs7Ozs7SUEzQkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUF1QixFQUFFLFFBQWtCOztjQUNqRCxVQUFVLEdBQUcsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0RCxPQUFPLElBQUkseUJBQXVCLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNqRSxDQUFDOzs7O0lBMEJELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7SUFFUyxXQUFXLENBQUMsS0FBWTtRQUNoQyxJQUFJLEtBQUssWUFBWSxhQUFhLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQUU7WUFDdkQsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzNELE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7SUFFUyxNQUFNO2NBQ1IsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztjQUNsRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Y0FDdkQsU0FBUzs7OztRQUFHLENBQUMsR0FBVSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLGFBQWEsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ2hILHdHQUF3RztRQUV4RyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLFlBQVksSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ2pHLG9FQUFvRTtJQUN0RSxDQUFDOzs7Ozs7SUFFUyxrQkFBa0IsQ0FBQyxJQUF1QjtjQUM1QyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsR0FBRyxJQUFJOztjQUNoQyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQWM7Ozs7Ozs7O1lBUTlCLFFBQVEsR0FBRyxNQUFNLENBQUMsZ0JBQWdCO1FBRXRDLEtBQUssTUFBTSxLQUFLLElBQUksVUFBVSxDQUFDLGFBQWEsRUFBRTs7a0JBQ3RDLEdBQUcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDN0MsSUFBSSxHQUFHLEVBQUU7O3NCQUNELFFBQVEsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztnQkFDN0MsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUU7OzBCQUNYLFFBQVEsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTOzswQkFDOUQsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7OzBCQUNqRCxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtvQkFDMUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQztvQkFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUM5QixRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ3pDO2FBQ0Y7U0FDRjs7Ozs7O2NBT0ssT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxJQUFJOzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztrQkFDZCxNQUFNLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTOztrQkFDbEQsTUFBTSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztZQUN4RCxJQUFJLE1BQU0sR0FBRyxNQUFNLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDWDtpQkFBTTtnQkFDTCxPQUFPLENBQUMsQ0FBQzthQUNWO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPO1lBQ0wsUUFBUTtZQUNSLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRzs7OztZQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1NBQy9CLENBQUM7SUFDSixDQUFDOzs7OztJQUVPLElBQUk7UUFDVixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVqRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDOUM7O2NBRUssWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztRQUM5RCxZQUFZLENBQUMsT0FBTzthQUNqQixJQUFJLENBQ0gsTUFBTTs7OztRQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNYO2FBQ0EsU0FBUzs7OztRQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDekMsQ0FBQztDQUNGLENBQUE7O1lBN0YwQixpQkFBaUI7WUFBMkIsUUFBUTtZQUF3Qix3QkFBd0I7OztZQTNCOUgsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTs7OztZQXJDckUsaUJBQWlCO1lBUE4sUUFBUTtZQU9BLHdCQUF3Qjs7O3lCQW1EakQsS0FBSzt3QkFPTCxLQUFLOztBQW5CSyx1QkFBdUI7SUFIbkMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFFbEQsSUFBSSxFQUFFOzZDQTBCb0IsaUJBQWlCLEVBQTJCLFFBQVEsRUFBd0Isd0JBQXdCO0dBekJsSCx1QkFBdUIsQ0FzSG5DO1NBdEhZLHVCQUF1Qjs7Ozs7Ozs7SUFZbEMsNkNBQTRCOzs7Ozs7O0lBTzVCLDRDQUEyQjs7Ozs7SUFFM0IseUNBQXNDOzs7OztJQUN0Qyw0Q0FBNkI7Ozs7O0lBQzdCLGdEQUF5RDs7SUFFN0MsdUNBQW1DOzs7OztJQUFFLDJDQUE0Qjs7Ozs7SUFBRSw2Q0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5qZWN0b3IsIE9uRGVzdHJveSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8vIGltcG9ydCB7IENsaXBib2FyZCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvY2xpcGJvYXJkJztcclxuLy8gVE9ETzogcmVtb3ZlIGludGVybmFsIGltcGxlbWVudGF0aW9uIGluIHRoZSBuZXh0IHZlcnNpb24gb2YgY2RrLWV4cGVyaW1lbnRhbCAocmlnaHQgYWZ0ZXIgOC4xLjMpXHJcbmltcG9ydCB7IENsaXBib2FyZCB9IGZyb20gJy4vY2xpcGJvYXJkLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBOZ3JpZFBsdWdpbiwgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XHJcblxyXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XHJcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcclxuICAgIGNsaXBib2FyZD86IFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luO1xyXG4gIH1cclxuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMge1xyXG4gICAgY2xpcGJvYXJkOiBrZXlvZiB0eXBlb2YgUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW47XHJcbiAgfVxyXG59XHJcblxyXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZ3JpZC9zZXJ2aWNlcy9jb25maWcnIHtcclxuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xyXG4gICAgY2xpcGJvYXJkPzoge1xyXG4gICAgICAvKiogV2hlbiBzZXQgdG8gdHJ1ZSB3aWxsIGVuYWJsZSB0aGUgY2xpcGJvYXJkIHBsdWdpbiBvbiBhbGwgZ3JpZCBpbnN0YW5jZXMgYnkgZGVmYXVsdC4gKi9cclxuICAgICAgYXV0b0VuYWJsZT86IGJvb2xlYW47XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBUaGUgc2VwYXJhdG9yIHRvIHVzZSB3aGVuIG11bHRpcGxlIGNlbGxzIGFyZSBjb3BpZWRcclxuICAgICAgICogQGRlZmF1bHQgXFx0XHJcbiAgICAgICAqL1xyXG4gICAgICBjZWxsU2VwYXJhdG9yPzogc3RyaW5nO1xyXG4gICAgICAvKipcclxuICAgICAgICogVGhlIHNlcGFyYXRvciB0byB1c2Ugd2hlbiBtdWx0aXBsZSByb3dzIGFyZSBjb3BpZWRcclxuICAgICAgICogQGRlZmF1bHQgXFxuXHJcbiAgICAgICAqL1xyXG4gICAgICByb3dTZXBhcmF0b3I/OiBzdHJpbmc7XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgSVNfT1NYID0gL15tYWMvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCkpXHJcbmNvbnN0IERFRkFVTFRfQ0VMTF9TRVAgPSAnXFx0JztcclxuY29uc3QgREVGQVVMVF9ST1dfU0VQID0gJ1xcbic7XHJcblxyXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ2NsaXBib2FyZCcgPSAnY2xpcGJvYXJkJztcclxuXHJcbkBOZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZLCBmYWN0b3J5OiAnY3JlYXRlJyB9KVxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbY2xpcGJvYXJkXScsIGV4cG9ydEFzOiAncGJsTmdyaWRDbGlwYm9hcmQnIH0pXHJcbkBVblJ4KClcclxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuXHJcbiAgc3RhdGljIGNyZWF0ZShncmlkOiBQYmxOZ3JpZENvbXBvbmVudCwgaW5qZWN0b3I6IEluamVjdG9yKTogUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW4ge1xyXG4gICAgY29uc3QgcGx1Z2luQ3RybCA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKGdyaWQpO1xyXG4gICAgcmV0dXJuIG5ldyBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbihncmlkLCBpbmplY3RvciwgcGx1Z2luQ3RybCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgc2VwYXJhdG9yIHRvIHVzZSB3aGVuIG11bHRpcGxlIGNlbGxzIGFyZSBjb3BpZWQuXHJcbiAgICogSWYgbm90IHNldCwgdGFrZW4gZnJvbSBgUGJsTmdyaWRDb25maWcuY2xpcGJvYXJkLmNlbGxTZXBhcmF0b3JgXHJcbiAgICogQGRlZmF1bHQgXFx0XHJcbiAgICovXHJcbiAgQElucHV0KCkgY2xwQ2VsbFNlcDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc2VwYXJhdG9yIHRvIHVzZSB3aGVuIG11bHRpcGxlIHJvd3MgYXJlIGNvcGllZFxyXG4gICAqIElmIG5vdCBzZXQsIHRha2VuIGZyb20gYFBibE5ncmlkQ29uZmlnLmNsaXBib2FyZC5yb3dTZXBhcmF0b3JgXHJcbiAgICogQGRlZmF1bHQgXFxuXHJcbiAgICovXHJcbiAgQElucHV0KCkgY2xwUm93U2VwOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2U7XHJcbiAgcHJpdmF0ZSBjbGlwYm9hcmQ6IENsaXBib2FyZDtcclxuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46IChncmlkOiBQYmxOZ3JpZENvbXBvbmVudCkgPT4gdm9pZDtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3IsIHByb3RlY3RlZCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpIHtcclxuICAgIHRoaXMuY29uZmlnID0gaW5qZWN0b3IuZ2V0KFBibE5ncmlkQ29uZmlnU2VydmljZSlcclxuICAgIHRoaXMuY2xpcGJvYXJkID0gaW5qZWN0b3IuZ2V0KENsaXBib2FyZCk7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMuZ3JpZCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaXNDb3B5RXZlbnQoZXZlbnQ6IEV2ZW50KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50ICYmIGV2ZW50LmtleSA9PT0gJ2MnKSB7XHJcbiAgICAgIGlmICgoIUlTX09TWCAmJiBldmVudC5jdHJsS2V5KSB8fCAoSVNfT1NYICYmIGV2ZW50Lm1ldGFLZXkpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBkb0NvcHkoKTogdm9pZCB7XHJcbiAgICBjb25zdCB7IGNlbGxTZXBhcmF0b3IsIHJvd1NlcGFyYXRvciB9ID0gdGhpcy5jb25maWcuZ2V0KCdjbGlwYm9hcmQnLCB7fSk7XHJcbiAgICBjb25zdCB7IHJvd3MsIG1pbkluZGV4IH0gPSB0aGlzLmdldFNlbGVjdGVkUm93RGF0YSh0aGlzLmdyaWQpO1xyXG4gICAgY29uc3QgY3JlYXRlUm93ID0gKHJvdzogYW55W10pID0+IHJvdy5zbGljZShtaW5JbmRleCkuam9pbih0aGlzLmNscENlbGxTZXAgfHwgY2VsbFNlcGFyYXRvciB8fCBERUZBVUxUX0NFTExfU0VQKTtcclxuICAgIC8vIEZvciBlYWNoIHJvdyAoY29sbGVjdGlvbiBvZiBpdGVtcyksIHNsaWNlIHRoZSBpbml0aWFsIGl0ZW1zIHRoYXQgYXJlIG5vdCBjb3BpZWQgYWNyb3NzIGFsbCBzZWxlY3Rpb25zXHJcblxyXG4gICAgdGhpcy5jbGlwYm9hcmQuY29weShyb3dzLm1hcChjcmVhdGVSb3cpLmpvaW4odGhpcy5jbHBSb3dTZXAgfHwgcm93U2VwYXJhdG9yIHx8IERFRkFVTFRfUk9XX1NFUCkpO1xyXG4gICAgLy8gVE9ETzogQ29uc2lkZXIgdXNpbmcgYGJlZ2luQ29weWAgdG8gc3VwcG9ydCBsYXJnZSBjb3B5IG9wZXJhdGlvbnNcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRTZWxlY3RlZFJvd0RhdGEoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQpIHtcclxuICAgIGNvbnN0IHsgY29sdW1uQXBpLCBjb250ZXh0QXBpIH0gPSBncmlkO1xyXG4gICAgY29uc3QgZGF0YSA9IG5ldyBNYXA8YW55LCBhbnlbXT4oKTtcclxuXHJcbiAgICAvLyBUaGUgbWluSW5kZXggcmVwcmVzZW50cyB0aGUgZmlyc3QgY29sdW1uIGJlaW5nIGNvcGllZCBvdXQgb2YgYWxsIHZpc2libGUgY29sdW1ucyAoMCBiZWluZyB0aGUgZmlyc3QgdmlzaWJsZSBjb2x1bW4pLlxyXG4gICAgLy8gRm9yIGV2ZXJ5IHNlbGVjdGVkIGNlbGwsIHRoZSBjb2x1bW4gaXMgdHJhY2tlZCBhbmQgaXQncyBpbmRleCBpcyBiZWluZyBzZXQgdG8gYG1pbkluZGV4YCBpZiBpdCBpcyBsb3dlciB0aGVuIHRoZSBjdXJyZW50IGBtaW5JbmRleGAgKE1hdGguTWluKS5cclxuICAgIC8vIFdlIHN0YXJ0IHdpdGggdGhlIGJpZ2dlc3QgaW50IGJ1dCByaWdodCBhd2F5IGdldCBhIHZhbGlkIGNvbHVtbiBpbmRleC4uLlxyXG4gICAgLy8gTGF0ZXIgb24sIGVhY2ggcm93IGlzIHNsaWNlZCB0byByZW1vdmUgdGhlIGl0ZW1zIGluIGluZGljZXMgbG93ZXIgdGhlbiB0aGUgYG1pbkluZGV4YC5cclxuICAgIC8vXHJcbiAgICAvLyBBbGwgb2YgdGhpcyBpcyB0byBtYWtlIHRoZSBwYXN0ZSBzdGFydCB3aXRob3V0IGxlYWRpbmcgY2VsbCBzZXBhcmF0b3JzLlxyXG4gICAgbGV0IG1pbkluZGV4ID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XHJcblxyXG4gICAgZm9yIChjb25zdCBwb2ludCBvZiBjb250ZXh0QXBpLnNlbGVjdGVkQ2VsbHMpIHtcclxuICAgICAgY29uc3QgY29sID0gY29sdW1uQXBpLmNvbHVtbnNbcG9pbnQuY29sSW5kZXhdO1xyXG4gICAgICBpZiAoY29sKSB7XHJcbiAgICAgICAgY29uc3QgY29sSW5kZXggPSBjb2x1bW5BcGkucmVuZGVySW5kZXhPZihjb2wpO1xyXG4gICAgICAgIGlmIChjb2xJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICBjb25zdCByb3dJbmRleCA9IGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUocG9pbnQucm93SWRlbnQpLmRhdGFJbmRleDtcclxuICAgICAgICAgIGNvbnN0IGRhdGFJdGVtID0gY29sLmdldFZhbHVlKGdyaWQuZHMuc291cmNlW3Jvd0luZGV4XSk7XHJcbiAgICAgICAgICBjb25zdCByb3cgPSBkYXRhLmdldChwb2ludC5yb3dJZGVudCkgfHwgW107XHJcbiAgICAgICAgICByb3dbY29sSW5kZXhdID0gZGF0YUl0ZW07XHJcbiAgICAgICAgICBkYXRhLnNldChwb2ludC5yb3dJZGVudCwgcm93KTtcclxuICAgICAgICAgIG1pbkluZGV4ID0gTWF0aC5taW4obWluSW5kZXgsIGNvbEluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjb250ZXh0QXBpLnNlbGVjdGVkQ2VsbHMgYXJlIHVuLW9yZGVyZWQsIHRoZWlyIG9yZGVyIGlzIGJhc2VkIG9uIHRoZSBvcmRlciBpbiB3aGljaCB1c2VyIGhhdmUgc2VsZWN0ZWQgY2VsbHMuXHJcbiAgICAvLyBJdCBtZWFucyB0aGF0IHRoZSByb3cncyB3aWxsIG5vdCBwYXN0ZSBpbiB0aGUgcHJvcGVyIG9yZGVyIHVubGVzcyB3ZSByZS1vcmRlciB0aGVtIGJhc2VkIG9uIHRoZSBkYXRhIGluZGV4LlxyXG4gICAgLy8gVGhpcyBpcyBhIHZlcnkgbmF0aXZlIGFuZCBzaW1wbGUgaW1wbGVtZW50YXRpb24gdGhhdCB3aWxsIGhvbGQgbW9zdCBjb3B5IGFjdGlvbnMgMWsgKy1cclxuICAgIC8vIFRPRE86IENvbnNpZGVyIGEgYmV0dGVyIGxvZ2ljLCB0YWtpbmcgcGVyZm9ybWFuY2UgaW50byBjb25zaWRlcmF0aW9uLlxyXG5cclxuICAgIGNvbnN0IGVudHJpZXMgPSBBcnJheS5mcm9tKGRhdGEuZW50cmllcygpKTtcclxuICAgIGVudHJpZXMuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBjb25zdCBhSW5kZXggPSBjb250ZXh0QXBpLmZpbmRSb3dJbkNhY2hlKGFbMF0pLmRhdGFJbmRleDtcclxuICAgICAgY29uc3QgYkluZGV4ID0gY29udGV4dEFwaS5maW5kUm93SW5DYWNoZShiWzBdKS5kYXRhSW5kZXg7XHJcbiAgICAgIGlmIChhSW5kZXggPCBiSW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1pbkluZGV4LFxyXG4gICAgICByb3dzOiBlbnRyaWVzLm1hcCggZSA9PiBlWzFdICksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gdGhpcy5wbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcclxuXHJcbiAgICBpZiAoIXRoaXMucGx1Z2luQ3RybC5oYXNQbHVnaW4oJ3RhcmdldEV2ZW50cycpKSB7XHJcbiAgICAgIHRoaXMucGx1Z2luQ3RybC5jcmVhdGVQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRhcmdldEV2ZW50cyA9IHRoaXMucGx1Z2luQ3RybC5nZXRQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xyXG4gICAgdGFyZ2V0RXZlbnRzLmtleURvd25cclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZmlsdGVyKCBldmVudCA9PiB0aGlzLmlzQ29weUV2ZW50KGV2ZW50LnNvdXJjZSkgKSxcclxuICAgICAgICBVblJ4KHRoaXMpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4gdGhpcy5kb0NvcHkoKSApO1xyXG4gIH1cclxufVxyXG4iXX0=