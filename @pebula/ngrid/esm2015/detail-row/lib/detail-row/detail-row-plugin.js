/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Injector, Input, Output, ComponentFactoryResolver } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, TablePlugin } from '@pebula/ngrid';
import { PblNgridDefaultDetailRowParentComponent } from './directives';
/** @type {?} */
export const PLUGIN_KEY = 'detailRow';
/** @type {?} */
export const ROW_WHEN_TRUE = (/**
 * @return {?}
 */
() => true);
/** @type {?} */
export const ROW_WHEN_FALSE = (/**
 * @return {?}
 */
() => false);
/**
 * @template T
 * @param {?} table
 * @param {?} row
 * @param {?=} forceState
 * @return {?}
 */
export function toggleDetailRow(table, row, forceState) {
    /** @type {?} */
    const controller = PblNgridPluginController.find(table);
    if (controller) {
        /** @type {?} */
        const plugin = controller.getPlugin(PLUGIN_KEY);
        if (plugin) {
            return plugin.toggleDetailRow(row, forceState);
        }
    }
}
/**
 * @record
 * @template T
 */
export function PblDetailsRowToggleEvent() { }
if (false) {
    /** @type {?} */
    PblDetailsRowToggleEvent.prototype.row;
    /** @type {?} */
    PblDetailsRowToggleEvent.prototype.expended;
    /**
     * @return {?}
     */
    PblDetailsRowToggleEvent.prototype.toggle = function () { };
}
/**
 * @template T
 */
let PblNgridDetailRowPluginDirective = /**
 * @template T
 */
class PblNgridDetailRowPluginDirective {
    /**
     * @param {?} table
     * @param {?} pluginCtrl
     * @param {?} injector
     */
    constructor(table, pluginCtrl, injector) {
        this.table = table;
        this.injector = injector;
        /**
         * Set the behavior when the row's context is changed while the detail row is opened (another row is displayed in place of the current row).
         *
         * - ignore: don't do anything, leave as is (for manual intervention)
         * - close: close the detail row
         * - render: re-render the row with the new context
         *
         * The default behavior is `render`
         *
         * This scenario will pop-up when using pagination and the user move between pages or change the page size.
         * It might also happen when the data is updated due to custom refresh calls on the datasource or any other scenario that might invoke a datasource update.
         *
         * The `ignore` phase, when used, will not trigger an update, leaving the detail row opened and showing data from the previous row.
         * The `ignore` is intended for use with `toggledRowContextChange`, which will emit when the row context has changed, this will allow the developer to
         * toggle the row (mimic `close`) or update the context manually. For example, if toggling open the detail row invokes a "fetch" operation that retrieves data for the detail row
         * this will allow updates on context change.
         *
         * > Note that `toggledRowContextChange` fires regardless of the value set in `whenContextChange`
         */
        this.whenContextChange = 'render';
        /**
         * Emits whenever a detail row instance is toggled on/off
         * Emits an event handler with the row, the toggle state and a toggle operation method.
         */
        this.toggleChange = new EventEmitter();
        /**
         * Emits whenever the row context has changed while the row is toggled open.
         * This scenario is unique and will occur only when a detail row is opened AND the parent row has changed.
         *
         * For example, when using pagination and the user navigates to the next/previous set or when the rows per page size is changed.
         * It might also occur when the data is updated due to custom refresh calls on the datasource or any other scenario that might invoke a datasource update.
         *
         * Emits an event handler with the row, the toggle state and a toggle operation method.
         */
        this.toggledRowContextChange = new EventEmitter();
        this._isSimpleRow = ROW_WHEN_TRUE;
        this._isDetailRow = ROW_WHEN_FALSE;
        this._detailRowRows = new Map();
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        /** @type {?} */
        let subscription = pluginCtrl.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.kind === 'onInit') {
                subscription.unsubscribe();
                subscription = undefined;
                // Depends on target-events plugin
                // if it's not set, create it.
                if (!pluginCtrl.hasPlugin('targetEvents')) {
                    pluginCtrl.createPlugin('targetEvents');
                }
                table.registry.changes
                    .subscribe((/**
                 * @param {?} changes
                 * @return {?}
                 */
                changes => {
                    for (const c of changes) {
                        switch (c.type) {
                            case 'detailRowParent':
                                if (c.op === 'remove') {
                                    table._cdkTable.removeRowDef(c.value);
                                    this._detailRowDef = undefined;
                                }
                                this.setupDetailRowParent();
                                // table._cdkTable.syncRows('data');
                                break;
                        }
                    }
                }));
                // if we start with an initial value, then update the table cause we didn't do that
                // when it was set (we cant cause we're not init)
                // otherwise just setup the parent.
                if (this._detailRow) {
                    this.updateTable();
                }
                else {
                    this.setupDetailRowParent();
                }
            }
        }));
    }
    /**
     * Detail row control (none / all rows / selective rows)
     *
     * A detail row is an additional row added below a row rendered with the context of the row above it.
     *
     * You can enable/disable detail row for the entire table by setting `detailRow` to true/false respectively.
     * To control detail row per row, provide a predicate.
     * @return {?}
     */
    get detailRow() { return this._detailRow; }
    /**
     * @param {?} value
     * @return {?}
     */
    set detailRow(value) {
        if (this._detailRow !== value) {
            /** @type {?} */
            const table = this.table;
            if (typeof value === 'function') {
                this._isSimpleRow = (/**
                 * @param {?} index
                 * @param {?} rowData
                 * @return {?}
                 */
                (index, rowData) => !((/** @type {?} */ (value)))(index, rowData));
                this._isDetailRow = value;
            }
            else {
                value = coerceBooleanProperty(value);
                this._isDetailRow = value ? ROW_WHEN_TRUE : ROW_WHEN_FALSE;
                this._isSimpleRow = value ? ROW_WHEN_FALSE : ROW_WHEN_TRUE;
            }
            this._detailRow = value;
            if (table.isInit) {
                this.updateTable();
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set singleDetailRow(value) {
        value = coerceBooleanProperty(value);
        if (this._forceSingle !== value) {
            this._forceSingle = value;
            if (value && this._openedRow && this._openedRow.expended) {
                this._detailRowRows.forEach((/**
                 * @param {?} r
                 * @return {?}
                 */
                r => {
                    if (r.row !== this._openedRow.row) {
                        r.toggle(false);
                    }
                }));
            }
        }
    }
    /**
     * @param {?} detailRow
     * @return {?}
     */
    addDetailRow(detailRow) {
        this._detailRowRows.set(detailRow.row, detailRow);
    }
    /**
     * @param {?} detailRow
     * @return {?}
     */
    removeDetailRow(detailRow) {
        this._detailRowRows.delete(detailRow.row);
    }
    /**
     * @param {?} row
     * @param {?=} forceState
     * @return {?}
     */
    toggleDetailRow(row, forceState) {
        /** @type {?} */
        const detailRow = this._detailRowRows.get(row);
        if (detailRow) {
            detailRow.toggle(forceState);
            return detailRow.expended;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._defaultParentRef) {
            this._defaultParentRef.destroy();
        }
        this._removePlugin(this.table);
    }
    /**
     * \@internal
     * @param {?} event
     * @return {?}
     */
    detailRowToggled(event) {
        // logic for closing previous row
        /** @type {?} */
        const isSelf = this._openedRow && this._openedRow.row === event.row;
        if (event.expended) {
            if (this._forceSingle && this._openedRow && this._openedRow.expended && !isSelf) {
                this._openedRow.toggle();
            }
            this._openedRow = event;
        }
        else if (isSelf) {
            this._openedRow = undefined;
        }
        this.toggleChange.emit(event);
    }
    /**
     * @private
     * @return {?}
     */
    setupDetailRowParent() {
        /** @type {?} */
        const table = this.table;
        /** @type {?} */
        const cdkTable = table._cdkTable;
        if (this._detailRowDef) {
            cdkTable.removeRowDef(this._detailRowDef);
            this._detailRowDef = undefined;
        }
        if (this.detailRow) {
            /** @type {?} */
            let detailRow = table.registry.getSingle('detailRowParent');
            if (detailRow) {
                this._detailRowDef = detailRow = detailRow.clone();
                Object.defineProperty(detailRow, 'columns', { enumerable: true, get: (/**
                     * @return {?}
                     */
                    () => table.columnApi.visibleColumnIds) });
                Object.defineProperty(detailRow, 'when', { enumerable: true, get: (/**
                     * @return {?}
                     */
                    () => this._isDetailRow) });
                detailRow.ngOnChanges({ columns: { isFirstChange: (/**
                         * @return {?}
                         */
                        () => true), firstChange: true, currentValue: detailRow.columns, previousValue: null } });
            }
            else if (!this._defaultParentRef) {
                // TODO: move to module? set in root registry? put elsewhere to avoid table sync (see event of registry change)...
                this._defaultParentRef = this.injector.get(ComponentFactoryResolver)
                    .resolveComponentFactory(PblNgridDefaultDetailRowParentComponent)
                    .create(this.injector);
                this._defaultParentRef.changeDetectorRef.detectChanges();
                return;
            }
        }
        this.resetTableRowDefs();
    }
    /**
     * @private
     * @return {?}
     */
    resetTableRowDefs() {
        /** @type {?} */
        const table = this.table;
        if (this._detailRowDef) {
            this._detailRow === false
                ? table._cdkTable.removeRowDef(this._detailRowDef)
                : table._cdkTable.addRowDef(this._detailRowDef);
        }
    }
    /**
     * Update the table with detail row infor.
     * Instead of calling for a change detection cycle we can assign the new predicates directly to the cdkRowDef instances.
     * @private
     * @return {?}
     */
    updateTable() {
        this.table._tableRowDef.when = this._isSimpleRow;
        this.setupDetailRowParent();
        // Once we changed the `when` predicate on the `CdkRowDef` we must:
        //   1. Update the row cache (property `rowDefs`) to reflect the new change
        this.table._cdkTable.updateRowDefCache();
        //   2. re-render all rows.
        // The logic for re-rendering all rows is handled in `CdkTable._forceRenderDataRows()` which is a private method.
        // This is a workaround, assigning to `multiTemplateDataRows` will invoke the setter which
        // also calls `CdkTable._forceRenderDataRows()`
        // TODO: This is risky, the setter logic might change.
        // for example, if material will chack for change in `multiTemplateDataRows` setter from previous value...
        this.table._cdkTable.multiTemplateDataRows = !!this._detailRow;
    }
};
PblNgridDetailRowPluginDirective.decorators = [
    { type: Directive, args: [{ selector: 'pbl-ngrid[detailRow]', exportAs: 'pblNgridDetailRow' },] }
];
/** @nocollapse */
PblNgridDetailRowPluginDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: PblNgridPluginController },
    { type: Injector }
];
PblNgridDetailRowPluginDirective.propDecorators = {
    detailRow: [{ type: Input }],
    singleDetailRow: [{ type: Input }],
    excludeToggleFrom: [{ type: Input }],
    whenContextChange: [{ type: Input }],
    toggleChange: [{ type: Output }],
    toggledRowContextChange: [{ type: Output }]
};
/**
 * @template T
 */
PblNgridDetailRowPluginDirective = tslib_1.__decorate([
    TablePlugin({ id: PLUGIN_KEY }),
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [PblNgridComponent, PblNgridPluginController, Injector])
], PblNgridDetailRowPluginDirective);
export { PblNgridDetailRowPluginDirective };
if (false) {
    /**
     * A list of columns that will not trigger a detail row toggle when clicked.
     * @type {?}
     */
    PblNgridDetailRowPluginDirective.prototype.excludeToggleFrom;
    /**
     * Set the behavior when the row's context is changed while the detail row is opened (another row is displayed in place of the current row).
     *
     * - ignore: don't do anything, leave as is (for manual intervention)
     * - close: close the detail row
     * - render: re-render the row with the new context
     *
     * The default behavior is `render`
     *
     * This scenario will pop-up when using pagination and the user move between pages or change the page size.
     * It might also happen when the data is updated due to custom refresh calls on the datasource or any other scenario that might invoke a datasource update.
     *
     * The `ignore` phase, when used, will not trigger an update, leaving the detail row opened and showing data from the previous row.
     * The `ignore` is intended for use with `toggledRowContextChange`, which will emit when the row context has changed, this will allow the developer to
     * toggle the row (mimic `close`) or update the context manually. For example, if toggling open the detail row invokes a "fetch" operation that retrieves data for the detail row
     * this will allow updates on context change.
     *
     * > Note that `toggledRowContextChange` fires regardless of the value set in `whenContextChange`
     * @type {?}
     */
    PblNgridDetailRowPluginDirective.prototype.whenContextChange;
    /**
     * Emits whenever a detail row instance is toggled on/off
     * Emits an event handler with the row, the toggle state and a toggle operation method.
     * @type {?}
     */
    PblNgridDetailRowPluginDirective.prototype.toggleChange;
    /**
     * Emits whenever the row context has changed while the row is toggled open.
     * This scenario is unique and will occur only when a detail row is opened AND the parent row has changed.
     *
     * For example, when using pagination and the user navigates to the next/previous set or when the rows per page size is changed.
     * It might also occur when the data is updated due to custom refresh calls on the datasource or any other scenario that might invoke a datasource update.
     *
     * Emits an event handler with the row, the toggle state and a toggle operation method.
     * @type {?}
     */
    PblNgridDetailRowPluginDirective.prototype.toggledRowContextChange;
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowPluginDirective.prototype._openedRow;
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowPluginDirective.prototype._forceSingle;
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowPluginDirective.prototype._isSimpleRow;
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowPluginDirective.prototype._isDetailRow;
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowPluginDirective.prototype._detailRowRows;
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowPluginDirective.prototype._detailRow;
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowPluginDirective.prototype._detailRowDef;
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowPluginDirective.prototype._defaultParentRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowPluginDirective.prototype._removePlugin;
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowPluginDirective.prototype.table;
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowPluginDirective.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLXJvdy1wbHVnaW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RldGFpbC1yb3cvIiwic291cmNlcyI6WyJsaWIvZGV0YWlsLXJvdy9kZXRhaWwtcm93LXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW1CLFlBQVksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSx3QkFBd0IsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDckosT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFOUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsV0FBVyxFQUFzQixNQUFNLGVBQWUsQ0FBQztBQUc3RyxPQUFPLEVBQXVDLHVDQUF1QyxFQUFFLE1BQU0sY0FBYyxDQUFDOztBQVE1RyxNQUFNLE9BQU8sVUFBVSxHQUFnQixXQUFXOztBQUVsRCxNQUFNLE9BQU8sYUFBYTs7O0FBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFBOztBQUN2QyxNQUFNLE9BQU8sY0FBYzs7O0FBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFBOzs7Ozs7OztBQUV6QyxNQUFNLFVBQVUsZUFBZSxDQUFVLEtBQTJCLEVBQUUsR0FBTSxFQUFFLFVBQW9COztVQUMxRixVQUFVLEdBQUcsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN2RCxJQUFJLFVBQVUsRUFBRTs7Y0FDUixNQUFNLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7UUFDL0MsSUFBSSxNQUFNLEVBQUU7WUFDVixPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ2hEO0tBQ0Y7QUFDSCxDQUFDOzs7OztBQUVELDhDQUlDOzs7SUFIQyx1Q0FBTzs7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QXFCTCxLQUFLO2dDQWlCTCxLQUFLO2dDQXFCTCxLQUFLOzJCQU1MLE1BQU07c0NBVU4sTUFBTTs7Ozs7QUFwRkksZ0NBQWdDO0lBSDVDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUUvQixJQUFJLEVBQUU7NkNBaUdzQixpQkFBaUIsRUFBbUIsd0JBQXdCLEVBQXVCLFFBQVE7R0FoRzNHLGdDQUFnQyxDQXVPNUM7U0F2T1ksZ0NBQWdDOzs7Ozs7SUErQzNDLDZEQUFxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcUJyQyw2REFBcUU7Ozs7OztJQU1yRSx3REFBeUU7Ozs7Ozs7Ozs7O0lBVXpFLG1FQUFvRjs7Ozs7SUFFcEYsc0RBQWlEOzs7OztJQUNqRCx3REFBOEI7Ozs7O0lBQzlCLHdEQUE2RTs7Ozs7SUFDN0Usd0RBQThFOzs7OztJQUM5RSwwREFBb0U7Ozs7O0lBQ3BFLHNEQUF5RTs7Ozs7SUFDekUseURBQThEOzs7OztJQUM5RCw2REFBaUY7Ozs7O0lBQ2pGLHlEQUErRDs7Ozs7SUFFbkQsaURBQXFDOzs7OztJQUEyQyxvREFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVtYmVkZGVkVmlld1JlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3RvciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgVGFibGVQbHVnaW4sIFBibE5ncmlkUm93Q29udGV4dCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCB9IGZyb20gJy4vcm93JztcbmltcG9ydCB7IFBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmRGlyZWN0aXZlLCBQYmxOZ3JpZERlZmF1bHREZXRhaWxSb3dQYXJlbnRDb21wb25lbnQgfSBmcm9tICcuL2RpcmVjdGl2ZXMnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgZGV0YWlsUm93PzogUGJsTmdyaWREZXRhaWxSb3dQbHVnaW5EaXJlY3RpdmU8YW55PjtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ2RldGFpbFJvdycgPSAnZGV0YWlsUm93JztcblxuZXhwb3J0IGNvbnN0IFJPV19XSEVOX1RSVUUgPSAoKSA9PiB0cnVlO1xuZXhwb3J0IGNvbnN0IFJPV19XSEVOX0ZBTFNFID0gKCkgPT4gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVEZXRhaWxSb3c8VCA9IGFueT4odGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+LCByb3c6IFQsIGZvcmNlU3RhdGU/OiBib29sZWFuKTogYm9vbGVhbiB8IHZvaWQge1xuICBjb25zdCBjb250cm9sbGVyID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodGFibGUpO1xuICBpZiAoY29udHJvbGxlcikge1xuICAgIGNvbnN0IHBsdWdpbiA9IGNvbnRyb2xsZXIuZ2V0UGx1Z2luKFBMVUdJTl9LRVkpO1xuICAgIGlmIChwbHVnaW4pIHtcbiAgICAgIHJldHVybiBwbHVnaW4udG9nZ2xlRGV0YWlsUm93KHJvdywgZm9yY2VTdGF0ZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsRGV0YWlsc1Jvd1RvZ2dsZUV2ZW50PFQgPSBhbnk+IHtcbiAgcm93OiBUO1xuICBleHBlbmRlZDogYm9vbGVhbjtcbiAgdG9nZ2xlKCk6IHZvaWQ7XG59XG5cbkBUYWJsZVBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0pXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbZGV0YWlsUm93XScsIGV4cG9ydEFzOiAncGJsTmdyaWREZXRhaWxSb3cnIH0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWREZXRhaWxSb3dQbHVnaW5EaXJlY3RpdmU8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogRGV0YWlsIHJvdyBjb250cm9sIChub25lIC8gYWxsIHJvd3MgLyBzZWxlY3RpdmUgcm93cylcbiAgICpcbiAgICogQSBkZXRhaWwgcm93IGlzIGFuIGFkZGl0aW9uYWwgcm93IGFkZGVkIGJlbG93IGEgcm93IHJlbmRlcmVkIHdpdGggdGhlIGNvbnRleHQgb2YgdGhlIHJvdyBhYm92ZSBpdC5cbiAgICpcbiAgICogWW91IGNhbiBlbmFibGUvZGlzYWJsZSBkZXRhaWwgcm93IGZvciB0aGUgZW50aXJlIHRhYmxlIGJ5IHNldHRpbmcgYGRldGFpbFJvd2AgdG8gdHJ1ZS9mYWxzZSByZXNwZWN0aXZlbHkuXG4gICAqIFRvIGNvbnRyb2wgZGV0YWlsIHJvdyBwZXIgcm93LCBwcm92aWRlIGEgcHJlZGljYXRlLlxuICAgKi9cbiAgQElucHV0KCkgZ2V0IGRldGFpbFJvdygpOiAoIChpbmRleDogbnVtYmVyLCByb3dEYXRhOiBUKSA9PiBib29sZWFuICkgfCBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2RldGFpbFJvdzsgfVxuICBzZXQgZGV0YWlsUm93KHZhbHVlOiAoIChpbmRleDogbnVtYmVyLCByb3dEYXRhOiBUKSA9PiBib29sZWFuICkgfCBib29sZWFuICkge1xuICAgIGlmICh0aGlzLl9kZXRhaWxSb3cgIT09IHZhbHVlKSB7XG4gICAgICBjb25zdCB0YWJsZSA9IHRoaXMudGFibGU7XG5cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5faXNTaW1wbGVSb3cgPSAoaW5kZXg6IG51bWJlciwgcm93RGF0YTogVCkgPT4gISh2YWx1ZSBhcyBhbnkpKGluZGV4LCByb3dEYXRhKTtcbiAgICAgICAgdGhpcy5faXNEZXRhaWxSb3cgPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgdGhpcy5faXNEZXRhaWxSb3cgPSB2YWx1ZSA/IFJPV19XSEVOX1RSVUUgOiBST1dfV0hFTl9GQUxTRTtcbiAgICAgICAgdGhpcy5faXNTaW1wbGVSb3cgPSB2YWx1ZSA/IFJPV19XSEVOX0ZBTFNFIDogUk9XX1dIRU5fVFJVRTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2RldGFpbFJvdyA9IHZhbHVlO1xuXG4gICAgICBpZiAodGFibGUuaXNJbml0KSB7XG4gICAgICAgIHRoaXMudXBkYXRlVGFibGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBzZXQgc2luZ2xlRGV0YWlsUm93KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh0aGlzLl9mb3JjZVNpbmdsZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2ZvcmNlU2luZ2xlID0gdmFsdWU7XG4gICAgICBpZiAodmFsdWUgJiYgdGhpcy5fb3BlbmVkUm93ICYmIHRoaXMuX29wZW5lZFJvdy5leHBlbmRlZCkge1xuICAgICAgICB0aGlzLl9kZXRhaWxSb3dSb3dzLmZvckVhY2goIHIgPT4ge1xuICAgICAgICAgIGlmIChyLnJvdyAhPT0gdGhpcy5fb3BlbmVkUm93LnJvdykge1xuICAgICAgICAgICAgci50b2dnbGUoZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBjb2x1bW5zIHRoYXQgd2lsbCBub3QgdHJpZ2dlciBhIGRldGFpbCByb3cgdG9nZ2xlIHdoZW4gY2xpY2tlZC5cbiAgICovXG4gIEBJbnB1dCgpIGV4Y2x1ZGVUb2dnbGVGcm9tOiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogU2V0IHRoZSBiZWhhdmlvciB3aGVuIHRoZSByb3cncyBjb250ZXh0IGlzIGNoYW5nZWQgd2hpbGUgdGhlIGRldGFpbCByb3cgaXMgb3BlbmVkIChhbm90aGVyIHJvdyBpcyBkaXNwbGF5ZWQgaW4gcGxhY2Ugb2YgdGhlIGN1cnJlbnQgcm93KS5cbiAgICpcbiAgICogLSBpZ25vcmU6IGRvbid0IGRvIGFueXRoaW5nLCBsZWF2ZSBhcyBpcyAoZm9yIG1hbnVhbCBpbnRlcnZlbnRpb24pXG4gICAqIC0gY2xvc2U6IGNsb3NlIHRoZSBkZXRhaWwgcm93XG4gICAqIC0gcmVuZGVyOiByZS1yZW5kZXIgdGhlIHJvdyB3aXRoIHRoZSBuZXcgY29udGV4dFxuICAgKlxuICAgKiBUaGUgZGVmYXVsdCBiZWhhdmlvciBpcyBgcmVuZGVyYFxuICAgKlxuICAgKiBUaGlzIHNjZW5hcmlvIHdpbGwgcG9wLXVwIHdoZW4gdXNpbmcgcGFnaW5hdGlvbiBhbmQgdGhlIHVzZXIgbW92ZSBiZXR3ZWVuIHBhZ2VzIG9yIGNoYW5nZSB0aGUgcGFnZSBzaXplLlxuICAgKiBJdCBtaWdodCBhbHNvIGhhcHBlbiB3aGVuIHRoZSBkYXRhIGlzIHVwZGF0ZWQgZHVlIHRvIGN1c3RvbSByZWZyZXNoIGNhbGxzIG9uIHRoZSBkYXRhc291cmNlIG9yIGFueSBvdGhlciBzY2VuYXJpbyB0aGF0IG1pZ2h0IGludm9rZSBhIGRhdGFzb3VyY2UgdXBkYXRlLlxuICAgKlxuICAgKiBUaGUgYGlnbm9yZWAgcGhhc2UsIHdoZW4gdXNlZCwgd2lsbCBub3QgdHJpZ2dlciBhbiB1cGRhdGUsIGxlYXZpbmcgdGhlIGRldGFpbCByb3cgb3BlbmVkIGFuZCBzaG93aW5nIGRhdGEgZnJvbSB0aGUgcHJldmlvdXMgcm93LlxuICAgKiBUaGUgYGlnbm9yZWAgaXMgaW50ZW5kZWQgZm9yIHVzZSB3aXRoIGB0b2dnbGVkUm93Q29udGV4dENoYW5nZWAsIHdoaWNoIHdpbGwgZW1pdCB3aGVuIHRoZSByb3cgY29udGV4dCBoYXMgY2hhbmdlZCwgdGhpcyB3aWxsIGFsbG93IHRoZSBkZXZlbG9wZXIgdG9cbiAgICogdG9nZ2xlIHRoZSByb3cgKG1pbWljIGBjbG9zZWApIG9yIHVwZGF0ZSB0aGUgY29udGV4dCBtYW51YWxseS4gRm9yIGV4YW1wbGUsIGlmIHRvZ2dsaW5nIG9wZW4gdGhlIGRldGFpbCByb3cgaW52b2tlcyBhIFwiZmV0Y2hcIiBvcGVyYXRpb24gdGhhdCByZXRyaWV2ZXMgZGF0YSBmb3IgdGhlIGRldGFpbCByb3dcbiAgICogdGhpcyB3aWxsIGFsbG93IHVwZGF0ZXMgb24gY29udGV4dCBjaGFuZ2UuXG4gICAqXG4gICAqID4gTm90ZSB0aGF0IGB0b2dnbGVkUm93Q29udGV4dENoYW5nZWAgZmlyZXMgcmVnYXJkbGVzcyBvZiB0aGUgdmFsdWUgc2V0IGluIGB3aGVuQ29udGV4dENoYW5nZWBcbiAgICovXG4gIEBJbnB1dCgpIHdoZW5Db250ZXh0Q2hhbmdlOiAnaWdub3JlJyB8ICdjbG9zZScgfCAncmVuZGVyJyA9ICdyZW5kZXInO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuZXZlciBhIGRldGFpbCByb3cgaW5zdGFuY2UgaXMgdG9nZ2xlZCBvbi9vZmZcbiAgICogRW1pdHMgYW4gZXZlbnQgaGFuZGxlciB3aXRoIHRoZSByb3csIHRoZSB0b2dnbGUgc3RhdGUgYW5kIGEgdG9nZ2xlIG9wZXJhdGlvbiBtZXRob2QuXG4gICAqL1xuICBAT3V0cHV0KCkgdG9nZ2xlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxQYmxEZXRhaWxzUm93VG9nZ2xlRXZlbnQ8VD4+KCk7XG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuZXZlciB0aGUgcm93IGNvbnRleHQgaGFzIGNoYW5nZWQgd2hpbGUgdGhlIHJvdyBpcyB0b2dnbGVkIG9wZW4uXG4gICAqIFRoaXMgc2NlbmFyaW8gaXMgdW5pcXVlIGFuZCB3aWxsIG9jY3VyIG9ubHkgd2hlbiBhIGRldGFpbCByb3cgaXMgb3BlbmVkIEFORCB0aGUgcGFyZW50IHJvdyBoYXMgY2hhbmdlZC5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIHdoZW4gdXNpbmcgcGFnaW5hdGlvbiBhbmQgdGhlIHVzZXIgbmF2aWdhdGVzIHRvIHRoZSBuZXh0L3ByZXZpb3VzIHNldCBvciB3aGVuIHRoZSByb3dzIHBlciBwYWdlIHNpemUgaXMgY2hhbmdlZC5cbiAgICogSXQgbWlnaHQgYWxzbyBvY2N1ciB3aGVuIHRoZSBkYXRhIGlzIHVwZGF0ZWQgZHVlIHRvIGN1c3RvbSByZWZyZXNoIGNhbGxzIG9uIHRoZSBkYXRhc291cmNlIG9yIGFueSBvdGhlciBzY2VuYXJpbyB0aGF0IG1pZ2h0IGludm9rZSBhIGRhdGFzb3VyY2UgdXBkYXRlLlxuICAgKlxuICAgKiBFbWl0cyBhbiBldmVudCBoYW5kbGVyIHdpdGggdGhlIHJvdywgdGhlIHRvZ2dsZSBzdGF0ZSBhbmQgYSB0b2dnbGUgb3BlcmF0aW9uIG1ldGhvZC5cbiAgICovXG4gIEBPdXRwdXQoKSB0b2dnbGVkUm93Q29udGV4dENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8UGJsRGV0YWlsc1Jvd1RvZ2dsZUV2ZW50PFQ+PigpO1xuXG4gIHByaXZhdGUgX29wZW5lZFJvdz86IFBibERldGFpbHNSb3dUb2dnbGVFdmVudDxUPjtcbiAgcHJpdmF0ZSBfZm9yY2VTaW5nbGU6IGJvb2xlYW47XG4gIHByaXZhdGUgX2lzU2ltcGxlUm93OiAoaW5kZXg6IG51bWJlciwgcm93RGF0YTogVCkgPT4gYm9vbGVhbiA9IFJPV19XSEVOX1RSVUU7XG4gIHByaXZhdGUgX2lzRGV0YWlsUm93OiAoaW5kZXg6IG51bWJlciwgcm93RGF0YTogVCkgPT4gYm9vbGVhbiA9IFJPV19XSEVOX0ZBTFNFO1xuICBwcml2YXRlIF9kZXRhaWxSb3dSb3dzID0gbmV3IE1hcDxhbnksIFBibE5ncmlkRGV0YWlsUm93Q29tcG9uZW50PigpO1xuICBwcml2YXRlIF9kZXRhaWxSb3c6ICggKGluZGV4OiBudW1iZXIsIHJvd0RhdGE6IFQpID0+IGJvb2xlYW4gKSB8IGJvb2xlYW47XG4gIHByaXZhdGUgX2RldGFpbFJvd0RlZjogUGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZEaXJlY3RpdmU8VD47XG4gIHByaXZhdGUgX2RlZmF1bHRQYXJlbnRSZWY6IENvbXBvbmVudFJlZjxQYmxOZ3JpZERlZmF1bHREZXRhaWxSb3dQYXJlbnRDb21wb25lbnQ+O1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI8VD4sIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG5cbiAgICBsZXQgc3Vic2NyaXB0aW9uID0gcGx1Z2luQ3RybC5ldmVudHMuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBEZXBlbmRzIG9uIHRhcmdldC1ldmVudHMgcGx1Z2luXG4gICAgICAgIC8vIGlmIGl0J3Mgbm90IHNldCwgY3JlYXRlIGl0LlxuICAgICAgICBpZiAoIXBsdWdpbkN0cmwuaGFzUGx1Z2luKCd0YXJnZXRFdmVudHMnKSkge1xuICAgICAgICAgIHBsdWdpbkN0cmwuY3JlYXRlUGx1Z2luKCd0YXJnZXRFdmVudHMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhYmxlLnJlZ2lzdHJ5LmNoYW5nZXNcbiAgICAgICAgICAuc3Vic2NyaWJlKCBjaGFuZ2VzID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYyBvZiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgIHN3aXRjaCAoYy50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGV0YWlsUm93UGFyZW50JzpcbiAgICAgICAgICAgICAgICAgIGlmIChjLm9wID09PSAncmVtb3ZlJykge1xuICAgICAgICAgICAgICAgICAgICB0YWJsZS5fY2RrVGFibGUucmVtb3ZlUm93RGVmKGMudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZXRhaWxSb3dEZWYgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldHVwRGV0YWlsUm93UGFyZW50KCk7XG4gICAgICAgICAgICAgICAgICAvLyB0YWJsZS5fY2RrVGFibGUuc3luY1Jvd3MoJ2RhdGEnKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaWYgd2Ugc3RhcnQgd2l0aCBhbiBpbml0aWFsIHZhbHVlLCB0aGVuIHVwZGF0ZSB0aGUgdGFibGUgY2F1c2Ugd2UgZGlkbid0IGRvIHRoYXRcbiAgICAgICAgLy8gd2hlbiBpdCB3YXMgc2V0ICh3ZSBjYW50IGNhdXNlIHdlJ3JlIG5vdCBpbml0KVxuICAgICAgICAvLyBvdGhlcndpc2UganVzdCBzZXR1cCB0aGUgcGFyZW50LlxuICAgICAgICBpZiAodGhpcy5fZGV0YWlsUm93KSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVUYWJsZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0dXBEZXRhaWxSb3dQYXJlbnQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWRkRGV0YWlsUm93KGRldGFpbFJvdzogUGJsTmdyaWREZXRhaWxSb3dDb21wb25lbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9kZXRhaWxSb3dSb3dzLnNldChkZXRhaWxSb3cucm93LCBkZXRhaWxSb3cpO1xuICB9XG5cbiAgcmVtb3ZlRGV0YWlsUm93KGRldGFpbFJvdzogUGJsTmdyaWREZXRhaWxSb3dDb21wb25lbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9kZXRhaWxSb3dSb3dzLmRlbGV0ZShkZXRhaWxSb3cucm93KTtcbiAgfVxuXG4gIHRvZ2dsZURldGFpbFJvdyhyb3c6IGFueSwgZm9yY2VTdGF0ZT86IGJvb2xlYW4pOiBib29sZWFuIHwgdm9pZCB7XG4gICAgY29uc3QgZGV0YWlsUm93ID0gdGhpcy5fZGV0YWlsUm93Um93cy5nZXQocm93KTtcbiAgICBpZiAoZGV0YWlsUm93KSB7XG4gICAgICBkZXRhaWxSb3cudG9nZ2xlKGZvcmNlU3RhdGUpO1xuICAgICAgcmV0dXJuIGRldGFpbFJvdy5leHBlbmRlZDtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZGVmYXVsdFBhcmVudFJlZikge1xuICAgICAgdGhpcy5fZGVmYXVsdFBhcmVudFJlZi5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLnRhYmxlKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgZGV0YWlsUm93VG9nZ2xlZChldmVudDogUGJsRGV0YWlsc1Jvd1RvZ2dsZUV2ZW50PFQ+KTogdm9pZCB7XG4gICAgLy8gbG9naWMgZm9yIGNsb3NpbmcgcHJldmlvdXMgcm93XG4gICAgY29uc3QgaXNTZWxmID0gdGhpcy5fb3BlbmVkUm93ICYmIHRoaXMuX29wZW5lZFJvdy5yb3cgPT09IGV2ZW50LnJvdztcbiAgICBpZiAoZXZlbnQuZXhwZW5kZWQpIHtcbiAgICAgIGlmICh0aGlzLl9mb3JjZVNpbmdsZSAmJiB0aGlzLl9vcGVuZWRSb3cgJiYgdGhpcy5fb3BlbmVkUm93LmV4cGVuZGVkICYmICFpc1NlbGYpIHtcbiAgICAgICAgdGhpcy5fb3BlbmVkUm93LnRvZ2dsZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5fb3BlbmVkUm93ID0gZXZlbnQ7XG4gICAgfSBlbHNlIGlmIChpc1NlbGYpIHtcbiAgICAgIHRoaXMuX29wZW5lZFJvdyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy50b2dnbGVDaGFuZ2UuZW1pdChldmVudCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwRGV0YWlsUm93UGFyZW50KCk6IHZvaWQge1xuICAgIGNvbnN0IHRhYmxlID0gdGhpcy50YWJsZTtcbiAgICBjb25zdCBjZGtUYWJsZSA9IHRhYmxlLl9jZGtUYWJsZTtcbiAgICBpZiAodGhpcy5fZGV0YWlsUm93RGVmKSB7XG4gICAgICBjZGtUYWJsZS5yZW1vdmVSb3dEZWYodGhpcy5fZGV0YWlsUm93RGVmKTtcbiAgICAgIHRoaXMuX2RldGFpbFJvd0RlZiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGV0YWlsUm93KSB7XG4gICAgICBsZXQgZGV0YWlsUm93ID0gdGFibGUucmVnaXN0cnkuZ2V0U2luZ2xlKCdkZXRhaWxSb3dQYXJlbnQnKTtcbiAgICAgIGlmIChkZXRhaWxSb3cpIHtcbiAgICAgICAgdGhpcy5fZGV0YWlsUm93RGVmID0gZGV0YWlsUm93ID0gZGV0YWlsUm93LmNsb25lKCk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXRhaWxSb3csICdjb2x1bW5zJywgeyBlbnVtZXJhYmxlOiB0cnVlLCAgZ2V0OiAoKSA9PiB0YWJsZS5jb2x1bW5BcGkudmlzaWJsZUNvbHVtbklkcyB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRldGFpbFJvdywgJ3doZW4nLCB7IGVudW1lcmFibGU6IHRydWUsICBnZXQ6ICgpID0+IHRoaXMuX2lzRGV0YWlsUm93IH0pO1xuICAgICAgICBkZXRhaWxSb3cubmdPbkNoYW5nZXMoeyBjb2x1bW5zOiB7IGlzRmlyc3RDaGFuZ2U6ICgpID0+IHRydWUsIGZpcnN0Q2hhbmdlOiB0cnVlLCBjdXJyZW50VmFsdWU6IGRldGFpbFJvdy5jb2x1bW5zLCBwcmV2aW91c1ZhbHVlOiBudWxsIH19KTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2RlZmF1bHRQYXJlbnRSZWYpIHtcbiAgICAgICAgLy8gVE9ETzogbW92ZSB0byBtb2R1bGU/IHNldCBpbiByb290IHJlZ2lzdHJ5PyBwdXQgZWxzZXdoZXJlIHRvIGF2b2lkIHRhYmxlIHN5bmMgKHNlZSBldmVudCBvZiByZWdpc3RyeSBjaGFuZ2UpLi4uXG4gICAgICAgIHRoaXMuX2RlZmF1bHRQYXJlbnRSZWYgPSB0aGlzLmluamVjdG9yLmdldChDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpXG4gICAgICAgICAgLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFBibE5ncmlkRGVmYXVsdERldGFpbFJvd1BhcmVudENvbXBvbmVudClcbiAgICAgICAgICAuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuICAgICAgICB0aGlzLl9kZWZhdWx0UGFyZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlc2V0VGFibGVSb3dEZWZzKCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0VGFibGVSb3dEZWZzKCk6IHZvaWQge1xuICAgIGNvbnN0IHRhYmxlID0gdGhpcy50YWJsZTtcbiAgICBpZiAodGhpcy5fZGV0YWlsUm93RGVmKSB7XG4gICAgICB0aGlzLl9kZXRhaWxSb3cgPT09IGZhbHNlXG4gICAgICAgID8gdGFibGUuX2Nka1RhYmxlLnJlbW92ZVJvd0RlZih0aGlzLl9kZXRhaWxSb3dEZWYpXG4gICAgICAgIDogdGFibGUuX2Nka1RhYmxlLmFkZFJvd0RlZih0aGlzLl9kZXRhaWxSb3dEZWYpXG4gICAgICA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgdGFibGUgd2l0aCBkZXRhaWwgcm93IGluZm9yLlxuICAgKiBJbnN0ZWFkIG9mIGNhbGxpbmcgZm9yIGEgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSB3ZSBjYW4gYXNzaWduIHRoZSBuZXcgcHJlZGljYXRlcyBkaXJlY3RseSB0byB0aGUgY2RrUm93RGVmIGluc3RhbmNlcy5cbiAgICovXG4gIHByaXZhdGUgdXBkYXRlVGFibGUoKTogdm9pZCB7XG4gICAgdGhpcy50YWJsZS5fdGFibGVSb3dEZWYud2hlbiA9IHRoaXMuX2lzU2ltcGxlUm93O1xuICAgIHRoaXMuc2V0dXBEZXRhaWxSb3dQYXJlbnQoKTtcbiAgICAvLyBPbmNlIHdlIGNoYW5nZWQgdGhlIGB3aGVuYCBwcmVkaWNhdGUgb24gdGhlIGBDZGtSb3dEZWZgIHdlIG11c3Q6XG4gICAgLy8gICAxLiBVcGRhdGUgdGhlIHJvdyBjYWNoZSAocHJvcGVydHkgYHJvd0RlZnNgKSB0byByZWZsZWN0IHRoZSBuZXcgY2hhbmdlXG4gICAgdGhpcy50YWJsZS5fY2RrVGFibGUudXBkYXRlUm93RGVmQ2FjaGUoKTtcblxuICAgIC8vICAgMi4gcmUtcmVuZGVyIGFsbCByb3dzLlxuICAgIC8vIFRoZSBsb2dpYyBmb3IgcmUtcmVuZGVyaW5nIGFsbCByb3dzIGlzIGhhbmRsZWQgaW4gYENka1RhYmxlLl9mb3JjZVJlbmRlckRhdGFSb3dzKClgIHdoaWNoIGlzIGEgcHJpdmF0ZSBtZXRob2QuXG4gICAgLy8gVGhpcyBpcyBhIHdvcmthcm91bmQsIGFzc2lnbmluZyB0byBgbXVsdGlUZW1wbGF0ZURhdGFSb3dzYCB3aWxsIGludm9rZSB0aGUgc2V0dGVyIHdoaWNoXG4gICAgLy8gYWxzbyBjYWxscyBgQ2RrVGFibGUuX2ZvcmNlUmVuZGVyRGF0YVJvd3MoKWBcbiAgICAvLyBUT0RPOiBUaGlzIGlzIHJpc2t5LCB0aGUgc2V0dGVyIGxvZ2ljIG1pZ2h0IGNoYW5nZS5cbiAgICAvLyBmb3IgZXhhbXBsZSwgaWYgbWF0ZXJpYWwgd2lsbCBjaGFjayBmb3IgY2hhbmdlIGluIGBtdWx0aVRlbXBsYXRlRGF0YVJvd3NgIHNldHRlciBmcm9tIHByZXZpb3VzIHZhbHVlLi4uXG4gICAgdGhpcy50YWJsZS5fY2RrVGFibGUubXVsdGlUZW1wbGF0ZURhdGFSb3dzID0gISF0aGlzLl9kZXRhaWxSb3c7XG4gIH1cbn1cbiJdfQ==