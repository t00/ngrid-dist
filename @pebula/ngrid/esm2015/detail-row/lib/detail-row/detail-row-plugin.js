/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, EmbeddedViewRef, EventEmitter, Injector, Input, OnDestroy, Output, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, TablePlugin, PblNgridRowContext } from '@pebula/ngrid';
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
PblNgridDetailRowPluginDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: PblNgridPluginController },
    { type: Injector }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLXJvdy1wbHVnaW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RldGFpbC1yb3cvIiwic291cmNlcyI6WyJsaWIvZGV0YWlsLXJvdy9kZXRhaWwtcm93LXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsd0JBQXdCLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JKLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc3RyxPQUFPLEVBQXVDLHVDQUF1QyxFQUFFLE1BQU0sY0FBYyxDQUFDOztBQVE1RyxNQUFNLE9BQU8sVUFBVSxHQUFnQixXQUFXOztBQUVsRCxNQUFNLE9BQU8sYUFBYTs7O0FBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFBOztBQUN2QyxNQUFNLE9BQU8sY0FBYzs7O0FBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFBOzs7Ozs7OztBQUV6QyxNQUFNLFVBQVUsZUFBZSxDQUFVLEtBQTJCLEVBQUUsR0FBTSxFQUFFLFVBQW9COztVQUMxRixVQUFVLEdBQUcsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN2RCxJQUFJLFVBQVUsRUFBRTs7Y0FDUixNQUFNLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7UUFDL0MsSUFBSSxNQUFNLEVBQUU7WUFDVixPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ2hEO0tBQ0Y7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RSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7Ozs7WUFqQ3JFLGlCQUFpQjtZQUFFLHdCQUF3QjtZQUpELFFBQVE7Ozt3QkFnRHhELEtBQUs7OEJBcUJMLEtBQUs7Z0NBaUJMLEtBQUs7Z0NBcUJMLEtBQUs7MkJBTUwsTUFBTTtzQ0FVTixNQUFNOzs7OztBQXBGSSxnQ0FBZ0M7SUFINUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBRS9CLElBQUksRUFBRTs2Q0FpR3NCLGlCQUFpQixFQUFtQix3QkFBd0IsRUFBdUIsUUFBUTtHQWhHM0csZ0NBQWdDLENBdU81QztTQXZPWSxnQ0FBZ0M7Ozs7OztJQStDM0MsNkRBQXFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFxQnJDLDZEQUFxRTs7Ozs7O0lBTXJFLHdEQUF5RTs7Ozs7Ozs7Ozs7SUFVekUsbUVBQW9GOzs7OztJQUVwRixzREFBaUQ7Ozs7O0lBQ2pELHdEQUE4Qjs7Ozs7SUFDOUIsd0RBQTZFOzs7OztJQUM3RSx3REFBOEU7Ozs7O0lBQzlFLDBEQUFvRTs7Ozs7SUFDcEUsc0RBQXlFOzs7OztJQUN6RSx5REFBOEQ7Ozs7O0lBQzlELDZEQUFpRjs7Ozs7SUFDakYseURBQStEOzs7OztJQUVuRCxpREFBcUM7Ozs7O0lBQTJDLG9EQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRW1iZWRkZWRWaWV3UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdG9yLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBUYWJsZVBsdWdpbiwgUGJsTmdyaWRSb3dDb250ZXh0IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCB7IFBibE5ncmlkRGV0YWlsUm93Q29tcG9uZW50IH0gZnJvbSAnLi9yb3cnO1xuaW1wb3J0IHsgUGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZEaXJlY3RpdmUsIFBibE5ncmlkRGVmYXVsdERldGFpbFJvd1BhcmVudENvbXBvbmVudCB9IGZyb20gJy4vZGlyZWN0aXZlcyc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBkZXRhaWxSb3c/OiBQYmxOZ3JpZERldGFpbFJvd1BsdWdpbkRpcmVjdGl2ZTxhbnk+O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAnZGV0YWlsUm93JyA9ICdkZXRhaWxSb3cnO1xuXG5leHBvcnQgY29uc3QgUk9XX1dIRU5fVFJVRSA9ICgpID0+IHRydWU7XG5leHBvcnQgY29uc3QgUk9XX1dIRU5fRkFMU0UgPSAoKSA9PiBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZURldGFpbFJvdzxUID0gYW55Pih0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8VD4sIHJvdzogVCwgZm9yY2VTdGF0ZT86IGJvb2xlYW4pOiBib29sZWFuIHwgdm9pZCB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh0YWJsZSk7XG4gIGlmIChjb250cm9sbGVyKSB7XG4gICAgY29uc3QgcGx1Z2luID0gY29udHJvbGxlci5nZXRQbHVnaW4oUExVR0lOX0tFWSk7XG4gICAgaWYgKHBsdWdpbikge1xuICAgICAgcmV0dXJuIHBsdWdpbi50b2dnbGVEZXRhaWxSb3cocm93LCBmb3JjZVN0YXRlKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxEZXRhaWxzUm93VG9nZ2xlRXZlbnQ8VCA9IGFueT4ge1xuICByb3c6IFQ7XG4gIGV4cGVuZGVkOiBib29sZWFuO1xuICB0b2dnbGUoKTogdm9pZDtcbn1cblxuQFRhYmxlUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSlcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZFtkZXRhaWxSb3ddJywgZXhwb3J0QXM6ICdwYmxOZ3JpZERldGFpbFJvdycgfSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERldGFpbFJvd1BsdWdpbkRpcmVjdGl2ZTxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBEZXRhaWwgcm93IGNvbnRyb2wgKG5vbmUgLyBhbGwgcm93cyAvIHNlbGVjdGl2ZSByb3dzKVxuICAgKlxuICAgKiBBIGRldGFpbCByb3cgaXMgYW4gYWRkaXRpb25hbCByb3cgYWRkZWQgYmVsb3cgYSByb3cgcmVuZGVyZWQgd2l0aCB0aGUgY29udGV4dCBvZiB0aGUgcm93IGFib3ZlIGl0LlxuICAgKlxuICAgKiBZb3UgY2FuIGVuYWJsZS9kaXNhYmxlIGRldGFpbCByb3cgZm9yIHRoZSBlbnRpcmUgdGFibGUgYnkgc2V0dGluZyBgZGV0YWlsUm93YCB0byB0cnVlL2ZhbHNlIHJlc3BlY3RpdmVseS5cbiAgICogVG8gY29udHJvbCBkZXRhaWwgcm93IHBlciByb3csIHByb3ZpZGUgYSBwcmVkaWNhdGUuXG4gICAqL1xuICBASW5wdXQoKSBnZXQgZGV0YWlsUm93KCk6ICggKGluZGV4OiBudW1iZXIsIHJvd0RhdGE6IFQpID0+IGJvb2xlYW4gKSB8IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGV0YWlsUm93OyB9XG4gIHNldCBkZXRhaWxSb3codmFsdWU6ICggKGluZGV4OiBudW1iZXIsIHJvd0RhdGE6IFQpID0+IGJvb2xlYW4gKSB8IGJvb2xlYW4gKSB7XG4gICAgaWYgKHRoaXMuX2RldGFpbFJvdyAhPT0gdmFsdWUpIHtcbiAgICAgIGNvbnN0IHRhYmxlID0gdGhpcy50YWJsZTtcblxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9pc1NpbXBsZVJvdyA9IChpbmRleDogbnVtYmVyLCByb3dEYXRhOiBUKSA9PiAhKHZhbHVlIGFzIGFueSkoaW5kZXgsIHJvd0RhdGEpO1xuICAgICAgICB0aGlzLl9pc0RldGFpbFJvdyA9IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICB0aGlzLl9pc0RldGFpbFJvdyA9IHZhbHVlID8gUk9XX1dIRU5fVFJVRSA6IFJPV19XSEVOX0ZBTFNFO1xuICAgICAgICB0aGlzLl9pc1NpbXBsZVJvdyA9IHZhbHVlID8gUk9XX1dIRU5fRkFMU0UgOiBST1dfV0hFTl9UUlVFO1xuICAgICAgfVxuICAgICAgdGhpcy5fZGV0YWlsUm93ID0gdmFsdWU7XG5cbiAgICAgIGlmICh0YWJsZS5pc0luaXQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVUYWJsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzaW5nbGVEZXRhaWxSb3codmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuX2ZvcmNlU2luZ2xlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fZm9yY2VTaW5nbGUgPSB2YWx1ZTtcbiAgICAgIGlmICh2YWx1ZSAmJiB0aGlzLl9vcGVuZWRSb3cgJiYgdGhpcy5fb3BlbmVkUm93LmV4cGVuZGVkKSB7XG4gICAgICAgIHRoaXMuX2RldGFpbFJvd1Jvd3MuZm9yRWFjaCggciA9PiB7XG4gICAgICAgICAgaWYgKHIucm93ICE9PSB0aGlzLl9vcGVuZWRSb3cucm93KSB7XG4gICAgICAgICAgICByLnRvZ2dsZShmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSBsaXN0IG9mIGNvbHVtbnMgdGhhdCB3aWxsIG5vdCB0cmlnZ2VyIGEgZGV0YWlsIHJvdyB0b2dnbGUgd2hlbiBjbGlja2VkLlxuICAgKi9cbiAgQElucHV0KCkgZXhjbHVkZVRvZ2dsZUZyb206IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGJlaGF2aW9yIHdoZW4gdGhlIHJvdydzIGNvbnRleHQgaXMgY2hhbmdlZCB3aGlsZSB0aGUgZGV0YWlsIHJvdyBpcyBvcGVuZWQgKGFub3RoZXIgcm93IGlzIGRpc3BsYXllZCBpbiBwbGFjZSBvZiB0aGUgY3VycmVudCByb3cpLlxuICAgKlxuICAgKiAtIGlnbm9yZTogZG9uJ3QgZG8gYW55dGhpbmcsIGxlYXZlIGFzIGlzIChmb3IgbWFudWFsIGludGVydmVudGlvbilcbiAgICogLSBjbG9zZTogY2xvc2UgdGhlIGRldGFpbCByb3dcbiAgICogLSByZW5kZXI6IHJlLXJlbmRlciB0aGUgcm93IHdpdGggdGhlIG5ldyBjb250ZXh0XG4gICAqXG4gICAqIFRoZSBkZWZhdWx0IGJlaGF2aW9yIGlzIGByZW5kZXJgXG4gICAqXG4gICAqIFRoaXMgc2NlbmFyaW8gd2lsbCBwb3AtdXAgd2hlbiB1c2luZyBwYWdpbmF0aW9uIGFuZCB0aGUgdXNlciBtb3ZlIGJldHdlZW4gcGFnZXMgb3IgY2hhbmdlIHRoZSBwYWdlIHNpemUuXG4gICAqIEl0IG1pZ2h0IGFsc28gaGFwcGVuIHdoZW4gdGhlIGRhdGEgaXMgdXBkYXRlZCBkdWUgdG8gY3VzdG9tIHJlZnJlc2ggY2FsbHMgb24gdGhlIGRhdGFzb3VyY2Ugb3IgYW55IG90aGVyIHNjZW5hcmlvIHRoYXQgbWlnaHQgaW52b2tlIGEgZGF0YXNvdXJjZSB1cGRhdGUuXG4gICAqXG4gICAqIFRoZSBgaWdub3JlYCBwaGFzZSwgd2hlbiB1c2VkLCB3aWxsIG5vdCB0cmlnZ2VyIGFuIHVwZGF0ZSwgbGVhdmluZyB0aGUgZGV0YWlsIHJvdyBvcGVuZWQgYW5kIHNob3dpbmcgZGF0YSBmcm9tIHRoZSBwcmV2aW91cyByb3cuXG4gICAqIFRoZSBgaWdub3JlYCBpcyBpbnRlbmRlZCBmb3IgdXNlIHdpdGggYHRvZ2dsZWRSb3dDb250ZXh0Q2hhbmdlYCwgd2hpY2ggd2lsbCBlbWl0IHdoZW4gdGhlIHJvdyBjb250ZXh0IGhhcyBjaGFuZ2VkLCB0aGlzIHdpbGwgYWxsb3cgdGhlIGRldmVsb3BlciB0b1xuICAgKiB0b2dnbGUgdGhlIHJvdyAobWltaWMgYGNsb3NlYCkgb3IgdXBkYXRlIHRoZSBjb250ZXh0IG1hbnVhbGx5LiBGb3IgZXhhbXBsZSwgaWYgdG9nZ2xpbmcgb3BlbiB0aGUgZGV0YWlsIHJvdyBpbnZva2VzIGEgXCJmZXRjaFwiIG9wZXJhdGlvbiB0aGF0IHJldHJpZXZlcyBkYXRhIGZvciB0aGUgZGV0YWlsIHJvd1xuICAgKiB0aGlzIHdpbGwgYWxsb3cgdXBkYXRlcyBvbiBjb250ZXh0IGNoYW5nZS5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgYHRvZ2dsZWRSb3dDb250ZXh0Q2hhbmdlYCBmaXJlcyByZWdhcmRsZXNzIG9mIHRoZSB2YWx1ZSBzZXQgaW4gYHdoZW5Db250ZXh0Q2hhbmdlYFxuICAgKi9cbiAgQElucHV0KCkgd2hlbkNvbnRleHRDaGFuZ2U6ICdpZ25vcmUnIHwgJ2Nsb3NlJyB8ICdyZW5kZXInID0gJ3JlbmRlcic7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW5ldmVyIGEgZGV0YWlsIHJvdyBpbnN0YW5jZSBpcyB0b2dnbGVkIG9uL29mZlxuICAgKiBFbWl0cyBhbiBldmVudCBoYW5kbGVyIHdpdGggdGhlIHJvdywgdGhlIHRvZ2dsZSBzdGF0ZSBhbmQgYSB0b2dnbGUgb3BlcmF0aW9uIG1ldGhvZC5cbiAgICovXG4gIEBPdXRwdXQoKSB0b2dnbGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFBibERldGFpbHNSb3dUb2dnbGVFdmVudDxUPj4oKTtcbiAgLyoqXG4gICAqIEVtaXRzIHdoZW5ldmVyIHRoZSByb3cgY29udGV4dCBoYXMgY2hhbmdlZCB3aGlsZSB0aGUgcm93IGlzIHRvZ2dsZWQgb3Blbi5cbiAgICogVGhpcyBzY2VuYXJpbyBpcyB1bmlxdWUgYW5kIHdpbGwgb2NjdXIgb25seSB3aGVuIGEgZGV0YWlsIHJvdyBpcyBvcGVuZWQgQU5EIHRoZSBwYXJlbnQgcm93IGhhcyBjaGFuZ2VkLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgd2hlbiB1c2luZyBwYWdpbmF0aW9uIGFuZCB0aGUgdXNlciBuYXZpZ2F0ZXMgdG8gdGhlIG5leHQvcHJldmlvdXMgc2V0IG9yIHdoZW4gdGhlIHJvd3MgcGVyIHBhZ2Ugc2l6ZSBpcyBjaGFuZ2VkLlxuICAgKiBJdCBtaWdodCBhbHNvIG9jY3VyIHdoZW4gdGhlIGRhdGEgaXMgdXBkYXRlZCBkdWUgdG8gY3VzdG9tIHJlZnJlc2ggY2FsbHMgb24gdGhlIGRhdGFzb3VyY2Ugb3IgYW55IG90aGVyIHNjZW5hcmlvIHRoYXQgbWlnaHQgaW52b2tlIGEgZGF0YXNvdXJjZSB1cGRhdGUuXG4gICAqXG4gICAqIEVtaXRzIGFuIGV2ZW50IGhhbmRsZXIgd2l0aCB0aGUgcm93LCB0aGUgdG9nZ2xlIHN0YXRlIGFuZCBhIHRvZ2dsZSBvcGVyYXRpb24gbWV0aG9kLlxuICAgKi9cbiAgQE91dHB1dCgpIHRvZ2dsZWRSb3dDb250ZXh0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxQYmxEZXRhaWxzUm93VG9nZ2xlRXZlbnQ8VD4+KCk7XG5cbiAgcHJpdmF0ZSBfb3BlbmVkUm93PzogUGJsRGV0YWlsc1Jvd1RvZ2dsZUV2ZW50PFQ+O1xuICBwcml2YXRlIF9mb3JjZVNpbmdsZTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaXNTaW1wbGVSb3c6IChpbmRleDogbnVtYmVyLCByb3dEYXRhOiBUKSA9PiBib29sZWFuID0gUk9XX1dIRU5fVFJVRTtcbiAgcHJpdmF0ZSBfaXNEZXRhaWxSb3c6IChpbmRleDogbnVtYmVyLCByb3dEYXRhOiBUKSA9PiBib29sZWFuID0gUk9XX1dIRU5fRkFMU0U7XG4gIHByaXZhdGUgX2RldGFpbFJvd1Jvd3MgPSBuZXcgTWFwPGFueSwgUGJsTmdyaWREZXRhaWxSb3dDb21wb25lbnQ+KCk7XG4gIHByaXZhdGUgX2RldGFpbFJvdzogKCAoaW5kZXg6IG51bWJlciwgcm93RGF0YTogVCkgPT4gYm9vbGVhbiApIHwgYm9vbGVhbjtcbiAgcHJpdmF0ZSBfZGV0YWlsUm93RGVmOiBQYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZkRpcmVjdGl2ZTxUPjtcbiAgcHJpdmF0ZSBfZGVmYXVsdFBhcmVudFJlZjogQ29tcG9uZW50UmVmPFBibE5ncmlkRGVmYXVsdERldGFpbFJvd1BhcmVudENvbXBvbmVudD47XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjxUPiwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIGxldCBzdWJzY3JpcHRpb24gPSBwbHVnaW5DdHJsLmV2ZW50cy5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgIGlmIChldmVudC5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIERlcGVuZHMgb24gdGFyZ2V0LWV2ZW50cyBwbHVnaW5cbiAgICAgICAgLy8gaWYgaXQncyBub3Qgc2V0LCBjcmVhdGUgaXQuXG4gICAgICAgIGlmICghcGx1Z2luQ3RybC5oYXNQbHVnaW4oJ3RhcmdldEV2ZW50cycpKSB7XG4gICAgICAgICAgcGx1Z2luQ3RybC5jcmVhdGVQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFibGUucmVnaXN0cnkuY2hhbmdlc1xuICAgICAgICAgIC5zdWJzY3JpYmUoIGNoYW5nZXMgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjIG9mIGNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgc3dpdGNoIChjLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkZXRhaWxSb3dQYXJlbnQnOlxuICAgICAgICAgICAgICAgICAgaWYgKGMub3AgPT09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlLl9jZGtUYWJsZS5yZW1vdmVSb3dEZWYoYy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RldGFpbFJvd0RlZiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBEZXRhaWxSb3dQYXJlbnQoKTtcbiAgICAgICAgICAgICAgICAgIC8vIHRhYmxlLl9jZGtUYWJsZS5zeW5jUm93cygnZGF0YScpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBpZiB3ZSBzdGFydCB3aXRoIGFuIGluaXRpYWwgdmFsdWUsIHRoZW4gdXBkYXRlIHRoZSB0YWJsZSBjYXVzZSB3ZSBkaWRuJ3QgZG8gdGhhdFxuICAgICAgICAvLyB3aGVuIGl0IHdhcyBzZXQgKHdlIGNhbnQgY2F1c2Ugd2UncmUgbm90IGluaXQpXG4gICAgICAgIC8vIG90aGVyd2lzZSBqdXN0IHNldHVwIHRoZSBwYXJlbnQuXG4gICAgICAgIGlmICh0aGlzLl9kZXRhaWxSb3cpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVRhYmxlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXR1cERldGFpbFJvd1BhcmVudCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhZGREZXRhaWxSb3coZGV0YWlsUm93OiBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCk6IHZvaWQge1xuICAgIHRoaXMuX2RldGFpbFJvd1Jvd3Muc2V0KGRldGFpbFJvdy5yb3csIGRldGFpbFJvdyk7XG4gIH1cblxuICByZW1vdmVEZXRhaWxSb3coZGV0YWlsUm93OiBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCk6IHZvaWQge1xuICAgIHRoaXMuX2RldGFpbFJvd1Jvd3MuZGVsZXRlKGRldGFpbFJvdy5yb3cpO1xuICB9XG5cbiAgdG9nZ2xlRGV0YWlsUm93KHJvdzogYW55LCBmb3JjZVN0YXRlPzogYm9vbGVhbik6IGJvb2xlYW4gfCB2b2lkIHtcbiAgICBjb25zdCBkZXRhaWxSb3cgPSB0aGlzLl9kZXRhaWxSb3dSb3dzLmdldChyb3cpO1xuICAgIGlmIChkZXRhaWxSb3cpIHtcbiAgICAgIGRldGFpbFJvdy50b2dnbGUoZm9yY2VTdGF0ZSk7XG4gICAgICByZXR1cm4gZGV0YWlsUm93LmV4cGVuZGVkO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kZWZhdWx0UGFyZW50UmVmKSB7XG4gICAgICB0aGlzLl9kZWZhdWx0UGFyZW50UmVmLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMudGFibGUpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBkZXRhaWxSb3dUb2dnbGVkKGV2ZW50OiBQYmxEZXRhaWxzUm93VG9nZ2xlRXZlbnQ8VD4pOiB2b2lkIHtcbiAgICAvLyBsb2dpYyBmb3IgY2xvc2luZyBwcmV2aW91cyByb3dcbiAgICBjb25zdCBpc1NlbGYgPSB0aGlzLl9vcGVuZWRSb3cgJiYgdGhpcy5fb3BlbmVkUm93LnJvdyA9PT0gZXZlbnQucm93O1xuICAgIGlmIChldmVudC5leHBlbmRlZCkge1xuICAgICAgaWYgKHRoaXMuX2ZvcmNlU2luZ2xlICYmIHRoaXMuX29wZW5lZFJvdyAmJiB0aGlzLl9vcGVuZWRSb3cuZXhwZW5kZWQgJiYgIWlzU2VsZikge1xuICAgICAgICB0aGlzLl9vcGVuZWRSb3cudG9nZ2xlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9vcGVuZWRSb3cgPSBldmVudDtcbiAgICB9IGVsc2UgaWYgKGlzU2VsZikge1xuICAgICAgdGhpcy5fb3BlbmVkUm93ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aGlzLnRvZ2dsZUNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBEZXRhaWxSb3dQYXJlbnQoKTogdm9pZCB7XG4gICAgY29uc3QgdGFibGUgPSB0aGlzLnRhYmxlO1xuICAgIGNvbnN0IGNka1RhYmxlID0gdGFibGUuX2Nka1RhYmxlO1xuICAgIGlmICh0aGlzLl9kZXRhaWxSb3dEZWYpIHtcbiAgICAgIGNka1RhYmxlLnJlbW92ZVJvd0RlZih0aGlzLl9kZXRhaWxSb3dEZWYpO1xuICAgICAgdGhpcy5fZGV0YWlsUm93RGVmID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAodGhpcy5kZXRhaWxSb3cpIHtcbiAgICAgIGxldCBkZXRhaWxSb3cgPSB0YWJsZS5yZWdpc3RyeS5nZXRTaW5nbGUoJ2RldGFpbFJvd1BhcmVudCcpO1xuICAgICAgaWYgKGRldGFpbFJvdykge1xuICAgICAgICB0aGlzLl9kZXRhaWxSb3dEZWYgPSBkZXRhaWxSb3cgPSBkZXRhaWxSb3cuY2xvbmUoKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRldGFpbFJvdywgJ2NvbHVtbnMnLCB7IGVudW1lcmFibGU6IHRydWUsICBnZXQ6ICgpID0+IHRhYmxlLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1uSWRzIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGV0YWlsUm93LCAnd2hlbicsIHsgZW51bWVyYWJsZTogdHJ1ZSwgIGdldDogKCkgPT4gdGhpcy5faXNEZXRhaWxSb3cgfSk7XG4gICAgICAgIGRldGFpbFJvdy5uZ09uQ2hhbmdlcyh7IGNvbHVtbnM6IHsgaXNGaXJzdENoYW5nZTogKCkgPT4gdHJ1ZSwgZmlyc3RDaGFuZ2U6IHRydWUsIGN1cnJlbnRWYWx1ZTogZGV0YWlsUm93LmNvbHVtbnMsIHByZXZpb3VzVmFsdWU6IG51bGwgfX0pO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5fZGVmYXVsdFBhcmVudFJlZikge1xuICAgICAgICAvLyBUT0RPOiBtb3ZlIHRvIG1vZHVsZT8gc2V0IGluIHJvb3QgcmVnaXN0cnk/IHB1dCBlbHNld2hlcmUgdG8gYXZvaWQgdGFibGUgc3luYyAoc2VlIGV2ZW50IG9mIHJlZ2lzdHJ5IGNoYW5nZSkuLi5cbiAgICAgICAgdGhpcy5fZGVmYXVsdFBhcmVudFJlZiA9IHRoaXMuaW5qZWN0b3IuZ2V0KENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcilcbiAgICAgICAgICAucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoUGJsTmdyaWREZWZhdWx0RGV0YWlsUm93UGFyZW50Q29tcG9uZW50KVxuICAgICAgICAgIC5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRQYXJlbnRSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucmVzZXRUYWJsZVJvd0RlZnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRUYWJsZVJvd0RlZnMoKTogdm9pZCB7XG4gICAgY29uc3QgdGFibGUgPSB0aGlzLnRhYmxlO1xuICAgIGlmICh0aGlzLl9kZXRhaWxSb3dEZWYpIHtcbiAgICAgIHRoaXMuX2RldGFpbFJvdyA9PT0gZmFsc2VcbiAgICAgICAgPyB0YWJsZS5fY2RrVGFibGUucmVtb3ZlUm93RGVmKHRoaXMuX2RldGFpbFJvd0RlZilcbiAgICAgICAgOiB0YWJsZS5fY2RrVGFibGUuYWRkUm93RGVmKHRoaXMuX2RldGFpbFJvd0RlZilcbiAgICAgIDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSB0YWJsZSB3aXRoIGRldGFpbCByb3cgaW5mb3IuXG4gICAqIEluc3RlYWQgb2YgY2FsbGluZyBmb3IgYSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlIHdlIGNhbiBhc3NpZ24gdGhlIG5ldyBwcmVkaWNhdGVzIGRpcmVjdGx5IHRvIHRoZSBjZGtSb3dEZWYgaW5zdGFuY2VzLlxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVUYWJsZSgpOiB2b2lkIHtcbiAgICB0aGlzLnRhYmxlLl90YWJsZVJvd0RlZi53aGVuID0gdGhpcy5faXNTaW1wbGVSb3c7XG4gICAgdGhpcy5zZXR1cERldGFpbFJvd1BhcmVudCgpO1xuICAgIC8vIE9uY2Ugd2UgY2hhbmdlZCB0aGUgYHdoZW5gIHByZWRpY2F0ZSBvbiB0aGUgYENka1Jvd0RlZmAgd2UgbXVzdDpcbiAgICAvLyAgIDEuIFVwZGF0ZSB0aGUgcm93IGNhY2hlIChwcm9wZXJ0eSBgcm93RGVmc2ApIHRvIHJlZmxlY3QgdGhlIG5ldyBjaGFuZ2VcbiAgICB0aGlzLnRhYmxlLl9jZGtUYWJsZS51cGRhdGVSb3dEZWZDYWNoZSgpO1xuXG4gICAgLy8gICAyLiByZS1yZW5kZXIgYWxsIHJvd3MuXG4gICAgLy8gVGhlIGxvZ2ljIGZvciByZS1yZW5kZXJpbmcgYWxsIHJvd3MgaXMgaGFuZGxlZCBpbiBgQ2RrVGFibGUuX2ZvcmNlUmVuZGVyRGF0YVJvd3MoKWAgd2hpY2ggaXMgYSBwcml2YXRlIG1ldGhvZC5cbiAgICAvLyBUaGlzIGlzIGEgd29ya2Fyb3VuZCwgYXNzaWduaW5nIHRvIGBtdWx0aVRlbXBsYXRlRGF0YVJvd3NgIHdpbGwgaW52b2tlIHRoZSBzZXR0ZXIgd2hpY2hcbiAgICAvLyBhbHNvIGNhbGxzIGBDZGtUYWJsZS5fZm9yY2VSZW5kZXJEYXRhUm93cygpYFxuICAgIC8vIFRPRE86IFRoaXMgaXMgcmlza3ksIHRoZSBzZXR0ZXIgbG9naWMgbWlnaHQgY2hhbmdlLlxuICAgIC8vIGZvciBleGFtcGxlLCBpZiBtYXRlcmlhbCB3aWxsIGNoYWNrIGZvciBjaGFuZ2UgaW4gYG11bHRpVGVtcGxhdGVEYXRhUm93c2Agc2V0dGVyIGZyb20gcHJldmlvdXMgdmFsdWUuLi5cbiAgICB0aGlzLnRhYmxlLl9jZGtUYWJsZS5tdWx0aVRlbXBsYXRlRGF0YVJvd3MgPSAhIXRoaXMuX2RldGFpbFJvdztcbiAgfVxufVxuIl19