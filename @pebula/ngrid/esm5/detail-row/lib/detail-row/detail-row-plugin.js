/**
 * @fileoverview added by tsickle
 * Generated from: lib/detail-row/detail-row-plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __values } from "tslib";
import { Directive, EventEmitter, Injector, Input, Output, ComponentFactoryResolver } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import { PblNgridDefaultDetailRowParentComponent } from './directives';
/** @type {?} */
export var PLUGIN_KEY = 'detailRow';
/** @type {?} */
export var ROW_WHEN_TRUE = (/**
 * @return {?}
 */
function () { return true; });
/** @type {?} */
export var ROW_WHEN_FALSE = (/**
 * @return {?}
 */
function () { return false; });
/**
 * @template T
 * @param {?} grid
 * @param {?} row
 * @param {?=} forceState
 * @return {?}
 */
export function toggleDetailRow(grid, row, forceState) {
    /** @type {?} */
    var controller = PblNgridPluginController.find(grid);
    if (controller) {
        /** @type {?} */
        var plugin = controller.getPlugin(PLUGIN_KEY);
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
var PblNgridDetailRowPluginDirective = /** @class */ (function () {
    function PblNgridDetailRowPluginDirective(grid, pluginCtrl, injector) {
        var _this = this;
        this.grid = grid;
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
        var subscription = pluginCtrl.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.kind === 'onInit') {
                subscription.unsubscribe();
                subscription = undefined;
                // Depends on target-events plugin
                // if it's not set, create it.
                if (!pluginCtrl.hasPlugin('targetEvents')) {
                    pluginCtrl.createPlugin('targetEvents');
                }
                grid.registry.changes
                    .subscribe((/**
                 * @param {?} changes
                 * @return {?}
                 */
                function (changes) {
                    var e_1, _a;
                    try {
                        for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                            var c = changes_1_1.value;
                            switch (c.type) {
                                case 'detailRowParent':
                                    if (c.op === 'remove') {
                                        grid._cdkTable.removeRowDef(c.value);
                                        _this._detailRowDef = undefined;
                                    }
                                    _this.setupDetailRowParent();
                                    // grid._cdkTable.syncRows('data');
                                    break;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (changes_1_1 && !changes_1_1.done && (_a = changes_1.return)) _a.call(changes_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }));
                // if we start with an initial value, then update the grid cause we didn't do that
                // when it was set (we cant cause we're not init)
                // otherwise just setup the parent.
                if (_this._detailRow) {
                    _this.updateTable();
                }
                else {
                    _this.setupDetailRowParent();
                }
            }
        }));
    }
    Object.defineProperty(PblNgridDetailRowPluginDirective.prototype, "detailRow", {
        /**
         * Detail row control (none / all rows / selective rows)
         *
         * A detail row is an additional row added below a row rendered with the context of the row above it.
         *
         * You can enable/disable detail row for the entire grid by setting `detailRow` to true/false respectively.
         * To control detail row per row, provide a predicate.
         */
        get: /**
         * Detail row control (none / all rows / selective rows)
         *
         * A detail row is an additional row added below a row rendered with the context of the row above it.
         *
         * You can enable/disable detail row for the entire grid by setting `detailRow` to true/false respectively.
         * To control detail row per row, provide a predicate.
         * @return {?}
         */
        function () { return this._detailRow; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._detailRow !== value) {
                /** @type {?} */
                var grid = this.grid;
                if (typeof value === 'function') {
                    this._isSimpleRow = (/**
                     * @param {?} index
                     * @param {?} rowData
                     * @return {?}
                     */
                    function (index, rowData) { return !((/** @type {?} */ (value)))(index, rowData); });
                    this._isDetailRow = value;
                }
                else {
                    value = coerceBooleanProperty(value);
                    this._isDetailRow = value ? ROW_WHEN_TRUE : ROW_WHEN_FALSE;
                    this._isSimpleRow = value ? ROW_WHEN_FALSE : ROW_WHEN_TRUE;
                }
                this._detailRow = value;
                if (grid.isInit) {
                    this.updateTable();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridDetailRowPluginDirective.prototype, "singleDetailRow", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            value = coerceBooleanProperty(value);
            if (this._forceSingle !== value) {
                this._forceSingle = value;
                if (value && this._openedRow && this._openedRow.expended) {
                    this._detailRowRows.forEach((/**
                     * @param {?} r
                     * @return {?}
                     */
                    function (r) {
                        if (r.row !== _this._openedRow.row) {
                            r.toggle(false);
                        }
                    }));
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} detailRow
     * @return {?}
     */
    PblNgridDetailRowPluginDirective.prototype.addDetailRow = /**
     * @param {?} detailRow
     * @return {?}
     */
    function (detailRow) {
        this._detailRowRows.set(detailRow.row, detailRow);
    };
    /**
     * @param {?} detailRow
     * @return {?}
     */
    PblNgridDetailRowPluginDirective.prototype.removeDetailRow = /**
     * @param {?} detailRow
     * @return {?}
     */
    function (detailRow) {
        this._detailRowRows.delete(detailRow.row);
    };
    /**
     * @param {?} row
     * @param {?=} forceState
     * @return {?}
     */
    PblNgridDetailRowPluginDirective.prototype.toggleDetailRow = /**
     * @param {?} row
     * @param {?=} forceState
     * @return {?}
     */
    function (row, forceState) {
        /** @type {?} */
        var detailRow = this._detailRowRows.get(row);
        if (detailRow) {
            detailRow.toggle(forceState);
            return detailRow.expended;
        }
    };
    /**
     * @return {?}
     */
    PblNgridDetailRowPluginDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._defaultParentRef) {
            this._defaultParentRef.destroy();
        }
        this._removePlugin(this.grid);
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} event
     * @return {?}
     */
    PblNgridDetailRowPluginDirective.prototype.detailRowToggled = /**
     * \@internal
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // logic for closing previous row
        /** @type {?} */
        var isSelf = this._openedRow && this._openedRow.row === event.row;
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
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridDetailRowPluginDirective.prototype.setupDetailRowParent = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var grid = this.grid;
        /** @type {?} */
        var cdkTable = grid._cdkTable;
        if (this._detailRowDef) {
            cdkTable.removeRowDef(this._detailRowDef);
            this._detailRowDef = undefined;
        }
        if (this.detailRow) {
            /** @type {?} */
            var detailRow = grid.registry.getSingle('detailRowParent');
            if (detailRow) {
                this._detailRowDef = detailRow = detailRow.clone();
                Object.defineProperty(detailRow, 'columns', { enumerable: true, get: (/**
                     * @return {?}
                     */
                    function () { return grid.columnApi.visibleColumnIds; }) });
                Object.defineProperty(detailRow, 'when', { enumerable: true, get: (/**
                     * @return {?}
                     */
                    function () { return _this._isDetailRow; }) });
                detailRow.ngOnChanges({ columns: { isFirstChange: (/**
                         * @return {?}
                         */
                        function () { return true; }), firstChange: true, currentValue: detailRow.columns, previousValue: null } });
            }
            else if (!this._defaultParentRef) {
                // TODO: move to module? set in root registry? put elsewhere to avoid grid sync (see event of registry change)...
                this._defaultParentRef = this.injector.get(ComponentFactoryResolver)
                    .resolveComponentFactory(PblNgridDefaultDetailRowParentComponent)
                    .create(this.injector);
                this._defaultParentRef.changeDetectorRef.detectChanges();
                return;
            }
        }
        this.resetTableRowDefs();
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridDetailRowPluginDirective.prototype.resetTableRowDefs = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var grid = this.grid;
        if (this._detailRowDef) {
            this._detailRow === false
                ? grid._cdkTable.removeRowDef(this._detailRowDef)
                : grid._cdkTable.addRowDef(this._detailRowDef);
        }
    };
    /**
     * Update the grid with detail row infor.
     * Instead of calling for a change detection cycle we can assign the new predicates directly to the cdkRowDef instances.
     */
    /**
     * Update the grid with detail row infor.
     * Instead of calling for a change detection cycle we can assign the new predicates directly to the cdkRowDef instances.
     * @private
     * @return {?}
     */
    PblNgridDetailRowPluginDirective.prototype.updateTable = /**
     * Update the grid with detail row infor.
     * Instead of calling for a change detection cycle we can assign the new predicates directly to the cdkRowDef instances.
     * @private
     * @return {?}
     */
    function () {
        this.grid._tableRowDef.when = this._isSimpleRow;
        this.setupDetailRowParent();
        // Once we changed the `when` predicate on the `CdkRowDef` we must:
        //   1. Update the row cache (property `rowDefs`) to reflect the new change
        this.grid._cdkTable.updateRowDefCache();
        //   2. re-render all rows.
        // The logic for re-rendering all rows is handled in `CdkTable._forceRenderDataRows()` which is a private method.
        // This is a workaround, assigning to `multiTemplateDataRows` will invoke the setter which
        // also calls `CdkTable._forceRenderDataRows()`
        // TODO: This is risky, the setter logic might change.
        // for example, if material will chack for change in `multiTemplateDataRows` setter from previous value...
        this.grid._cdkTable.multiTemplateDataRows = !!this._detailRow;
    };
    PblNgridDetailRowPluginDirective.decorators = [
        { type: Directive, args: [{ selector: 'pbl-ngrid[detailRow]', exportAs: 'pblNgridDetailRow' },] }
    ];
    /** @nocollapse */
    PblNgridDetailRowPluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: PblNgridPluginController },
        { type: Injector }
    ]; };
    PblNgridDetailRowPluginDirective.propDecorators = {
        detailRow: [{ type: Input }],
        singleDetailRow: [{ type: Input }],
        excludeToggleFrom: [{ type: Input }],
        whenContextChange: [{ type: Input }],
        toggleChange: [{ type: Output }],
        toggledRowContextChange: [{ type: Output }]
    };
    return PblNgridDetailRowPluginDirective;
}());
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
    PblNgridDetailRowPluginDirective.prototype.grid;
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowPluginDirective.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLXJvdy1wbHVnaW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RldGFpbC1yb3cvIiwic291cmNlcyI6WyJsaWIvZGV0YWlsLXJvdy9kZXRhaWwtcm93LXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSx3QkFBd0IsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDcEksT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzVFLE9BQU8sRUFBdUMsdUNBQXVDLEVBQUUsTUFBTSxjQUFjLENBQUM7O0FBUTVHLE1BQU0sS0FBTyxVQUFVLEdBQWdCLFdBQVc7O0FBRWxELE1BQU0sS0FBTyxhQUFhOzs7QUFBRyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQTs7QUFDdkMsTUFBTSxLQUFPLGNBQWM7OztBQUFHLGNBQU0sT0FBQSxLQUFLLEVBQUwsQ0FBSyxDQUFBOzs7Ozs7OztBQUV6QyxNQUFNLFVBQVUsZUFBZSxDQUFVLElBQTBCLEVBQUUsR0FBTSxFQUFFLFVBQW9COztRQUN6RixVQUFVLEdBQUcsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN0RCxJQUFJLFVBQVUsRUFBRTs7WUFDUixNQUFNLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7UUFDL0MsSUFBSSxNQUFNLEVBQUU7WUFDVixPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ2hEO0tBQ0Y7QUFDSCxDQUFDOzs7OztBQUVELDhDQUlDOzs7SUFIQyx1Q0FBTzs7SUFDUCw0Q0FBa0I7Ozs7SUFDbEIsNERBQWU7Ozs7O0FBR2pCO0lBaUdF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QUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDaEUsQ0FBQzs7Z0JBdk9GLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7Ozs7Z0JBaENyRSxpQkFBaUI7Z0JBQUUsd0JBQXdCO2dCQUhsQixRQUFROzs7NEJBNkN2QyxLQUFLO2tDQXFCTCxLQUFLO29DQWlCTCxLQUFLO29DQXFCTCxLQUFLOytCQU1MLE1BQU07MENBVU4sTUFBTTs7SUFtSlQsdUNBQUM7Q0FBQSxBQXhPRCxJQXdPQztTQXZPWSxnQ0FBZ0M7Ozs7OztJQStDM0MsNkRBQXFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFxQnJDLDZEQUFxRTs7Ozs7O0lBTXJFLHdEQUF5RTs7Ozs7Ozs7Ozs7SUFVekUsbUVBQW9GOzs7OztJQUVwRixzREFBaUQ7Ozs7O0lBQ2pELHdEQUE4Qjs7Ozs7SUFDOUIsd0RBQTZFOzs7OztJQUM3RSx3REFBOEU7Ozs7O0lBQzlFLDBEQUFvRTs7Ozs7SUFDcEUsc0RBQXlFOzs7OztJQUN6RSx5REFBOEQ7Ozs7O0lBQzlELDZEQUFpRjs7Ozs7SUFDakYseURBQThEOzs7OztJQUVsRCxnREFBb0M7Ozs7O0lBQTJDLG9EQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbmplY3RvciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCB9IGZyb20gJy4vcm93JztcbmltcG9ydCB7IFBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmRGlyZWN0aXZlLCBQYmxOZ3JpZERlZmF1bHREZXRhaWxSb3dQYXJlbnRDb21wb25lbnQgfSBmcm9tICcuL2RpcmVjdGl2ZXMnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgZGV0YWlsUm93PzogUGJsTmdyaWREZXRhaWxSb3dQbHVnaW5EaXJlY3RpdmU8YW55PjtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ2RldGFpbFJvdycgPSAnZGV0YWlsUm93JztcblxuZXhwb3J0IGNvbnN0IFJPV19XSEVOX1RSVUUgPSAoKSA9PiB0cnVlO1xuZXhwb3J0IGNvbnN0IFJPV19XSEVOX0ZBTFNFID0gKCkgPT4gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVEZXRhaWxSb3c8VCA9IGFueT4oZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD4sIHJvdzogVCwgZm9yY2VTdGF0ZT86IGJvb2xlYW4pOiBib29sZWFuIHwgdm9pZCB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZChncmlkKTtcbiAgaWYgKGNvbnRyb2xsZXIpIHtcbiAgICBjb25zdCBwbHVnaW4gPSBjb250cm9sbGVyLmdldFBsdWdpbihQTFVHSU5fS0VZKTtcbiAgICBpZiAocGx1Z2luKSB7XG4gICAgICByZXR1cm4gcGx1Z2luLnRvZ2dsZURldGFpbFJvdyhyb3csIGZvcmNlU3RhdGUpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibERldGFpbHNSb3dUb2dnbGVFdmVudDxUID0gYW55PiB7XG4gIHJvdzogVDtcbiAgZXhwZW5kZWQ6IGJvb2xlYW47XG4gIHRvZ2dsZSgpOiB2b2lkO1xufVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbZGV0YWlsUm93XScsIGV4cG9ydEFzOiAncGJsTmdyaWREZXRhaWxSb3cnIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWREZXRhaWxSb3dQbHVnaW5EaXJlY3RpdmU8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogRGV0YWlsIHJvdyBjb250cm9sIChub25lIC8gYWxsIHJvd3MgLyBzZWxlY3RpdmUgcm93cylcbiAgICpcbiAgICogQSBkZXRhaWwgcm93IGlzIGFuIGFkZGl0aW9uYWwgcm93IGFkZGVkIGJlbG93IGEgcm93IHJlbmRlcmVkIHdpdGggdGhlIGNvbnRleHQgb2YgdGhlIHJvdyBhYm92ZSBpdC5cbiAgICpcbiAgICogWW91IGNhbiBlbmFibGUvZGlzYWJsZSBkZXRhaWwgcm93IGZvciB0aGUgZW50aXJlIGdyaWQgYnkgc2V0dGluZyBgZGV0YWlsUm93YCB0byB0cnVlL2ZhbHNlIHJlc3BlY3RpdmVseS5cbiAgICogVG8gY29udHJvbCBkZXRhaWwgcm93IHBlciByb3csIHByb3ZpZGUgYSBwcmVkaWNhdGUuXG4gICAqL1xuICBASW5wdXQoKSBnZXQgZGV0YWlsUm93KCk6ICggKGluZGV4OiBudW1iZXIsIHJvd0RhdGE6IFQpID0+IGJvb2xlYW4gKSB8IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGV0YWlsUm93OyB9XG4gIHNldCBkZXRhaWxSb3codmFsdWU6ICggKGluZGV4OiBudW1iZXIsIHJvd0RhdGE6IFQpID0+IGJvb2xlYW4gKSB8IGJvb2xlYW4gKSB7XG4gICAgaWYgKHRoaXMuX2RldGFpbFJvdyAhPT0gdmFsdWUpIHtcbiAgICAgIGNvbnN0IGdyaWQgPSB0aGlzLmdyaWQ7XG5cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5faXNTaW1wbGVSb3cgPSAoaW5kZXg6IG51bWJlciwgcm93RGF0YTogVCkgPT4gISh2YWx1ZSBhcyBhbnkpKGluZGV4LCByb3dEYXRhKTtcbiAgICAgICAgdGhpcy5faXNEZXRhaWxSb3cgPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgdGhpcy5faXNEZXRhaWxSb3cgPSB2YWx1ZSA/IFJPV19XSEVOX1RSVUUgOiBST1dfV0hFTl9GQUxTRTtcbiAgICAgICAgdGhpcy5faXNTaW1wbGVSb3cgPSB2YWx1ZSA/IFJPV19XSEVOX0ZBTFNFIDogUk9XX1dIRU5fVFJVRTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2RldGFpbFJvdyA9IHZhbHVlO1xuXG4gICAgICBpZiAoZ3JpZC5pc0luaXQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVUYWJsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzaW5nbGVEZXRhaWxSb3codmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuX2ZvcmNlU2luZ2xlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fZm9yY2VTaW5nbGUgPSB2YWx1ZTtcbiAgICAgIGlmICh2YWx1ZSAmJiB0aGlzLl9vcGVuZWRSb3cgJiYgdGhpcy5fb3BlbmVkUm93LmV4cGVuZGVkKSB7XG4gICAgICAgIHRoaXMuX2RldGFpbFJvd1Jvd3MuZm9yRWFjaCggciA9PiB7XG4gICAgICAgICAgaWYgKHIucm93ICE9PSB0aGlzLl9vcGVuZWRSb3cucm93KSB7XG4gICAgICAgICAgICByLnRvZ2dsZShmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSBsaXN0IG9mIGNvbHVtbnMgdGhhdCB3aWxsIG5vdCB0cmlnZ2VyIGEgZGV0YWlsIHJvdyB0b2dnbGUgd2hlbiBjbGlja2VkLlxuICAgKi9cbiAgQElucHV0KCkgZXhjbHVkZVRvZ2dsZUZyb206IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGJlaGF2aW9yIHdoZW4gdGhlIHJvdydzIGNvbnRleHQgaXMgY2hhbmdlZCB3aGlsZSB0aGUgZGV0YWlsIHJvdyBpcyBvcGVuZWQgKGFub3RoZXIgcm93IGlzIGRpc3BsYXllZCBpbiBwbGFjZSBvZiB0aGUgY3VycmVudCByb3cpLlxuICAgKlxuICAgKiAtIGlnbm9yZTogZG9uJ3QgZG8gYW55dGhpbmcsIGxlYXZlIGFzIGlzIChmb3IgbWFudWFsIGludGVydmVudGlvbilcbiAgICogLSBjbG9zZTogY2xvc2UgdGhlIGRldGFpbCByb3dcbiAgICogLSByZW5kZXI6IHJlLXJlbmRlciB0aGUgcm93IHdpdGggdGhlIG5ldyBjb250ZXh0XG4gICAqXG4gICAqIFRoZSBkZWZhdWx0IGJlaGF2aW9yIGlzIGByZW5kZXJgXG4gICAqXG4gICAqIFRoaXMgc2NlbmFyaW8gd2lsbCBwb3AtdXAgd2hlbiB1c2luZyBwYWdpbmF0aW9uIGFuZCB0aGUgdXNlciBtb3ZlIGJldHdlZW4gcGFnZXMgb3IgY2hhbmdlIHRoZSBwYWdlIHNpemUuXG4gICAqIEl0IG1pZ2h0IGFsc28gaGFwcGVuIHdoZW4gdGhlIGRhdGEgaXMgdXBkYXRlZCBkdWUgdG8gY3VzdG9tIHJlZnJlc2ggY2FsbHMgb24gdGhlIGRhdGFzb3VyY2Ugb3IgYW55IG90aGVyIHNjZW5hcmlvIHRoYXQgbWlnaHQgaW52b2tlIGEgZGF0YXNvdXJjZSB1cGRhdGUuXG4gICAqXG4gICAqIFRoZSBgaWdub3JlYCBwaGFzZSwgd2hlbiB1c2VkLCB3aWxsIG5vdCB0cmlnZ2VyIGFuIHVwZGF0ZSwgbGVhdmluZyB0aGUgZGV0YWlsIHJvdyBvcGVuZWQgYW5kIHNob3dpbmcgZGF0YSBmcm9tIHRoZSBwcmV2aW91cyByb3cuXG4gICAqIFRoZSBgaWdub3JlYCBpcyBpbnRlbmRlZCBmb3IgdXNlIHdpdGggYHRvZ2dsZWRSb3dDb250ZXh0Q2hhbmdlYCwgd2hpY2ggd2lsbCBlbWl0IHdoZW4gdGhlIHJvdyBjb250ZXh0IGhhcyBjaGFuZ2VkLCB0aGlzIHdpbGwgYWxsb3cgdGhlIGRldmVsb3BlciB0b1xuICAgKiB0b2dnbGUgdGhlIHJvdyAobWltaWMgYGNsb3NlYCkgb3IgdXBkYXRlIHRoZSBjb250ZXh0IG1hbnVhbGx5LiBGb3IgZXhhbXBsZSwgaWYgdG9nZ2xpbmcgb3BlbiB0aGUgZGV0YWlsIHJvdyBpbnZva2VzIGEgXCJmZXRjaFwiIG9wZXJhdGlvbiB0aGF0IHJldHJpZXZlcyBkYXRhIGZvciB0aGUgZGV0YWlsIHJvd1xuICAgKiB0aGlzIHdpbGwgYWxsb3cgdXBkYXRlcyBvbiBjb250ZXh0IGNoYW5nZS5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgYHRvZ2dsZWRSb3dDb250ZXh0Q2hhbmdlYCBmaXJlcyByZWdhcmRsZXNzIG9mIHRoZSB2YWx1ZSBzZXQgaW4gYHdoZW5Db250ZXh0Q2hhbmdlYFxuICAgKi9cbiAgQElucHV0KCkgd2hlbkNvbnRleHRDaGFuZ2U6ICdpZ25vcmUnIHwgJ2Nsb3NlJyB8ICdyZW5kZXInID0gJ3JlbmRlcic7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW5ldmVyIGEgZGV0YWlsIHJvdyBpbnN0YW5jZSBpcyB0b2dnbGVkIG9uL29mZlxuICAgKiBFbWl0cyBhbiBldmVudCBoYW5kbGVyIHdpdGggdGhlIHJvdywgdGhlIHRvZ2dsZSBzdGF0ZSBhbmQgYSB0b2dnbGUgb3BlcmF0aW9uIG1ldGhvZC5cbiAgICovXG4gIEBPdXRwdXQoKSB0b2dnbGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFBibERldGFpbHNSb3dUb2dnbGVFdmVudDxUPj4oKTtcbiAgLyoqXG4gICAqIEVtaXRzIHdoZW5ldmVyIHRoZSByb3cgY29udGV4dCBoYXMgY2hhbmdlZCB3aGlsZSB0aGUgcm93IGlzIHRvZ2dsZWQgb3Blbi5cbiAgICogVGhpcyBzY2VuYXJpbyBpcyB1bmlxdWUgYW5kIHdpbGwgb2NjdXIgb25seSB3aGVuIGEgZGV0YWlsIHJvdyBpcyBvcGVuZWQgQU5EIHRoZSBwYXJlbnQgcm93IGhhcyBjaGFuZ2VkLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgd2hlbiB1c2luZyBwYWdpbmF0aW9uIGFuZCB0aGUgdXNlciBuYXZpZ2F0ZXMgdG8gdGhlIG5leHQvcHJldmlvdXMgc2V0IG9yIHdoZW4gdGhlIHJvd3MgcGVyIHBhZ2Ugc2l6ZSBpcyBjaGFuZ2VkLlxuICAgKiBJdCBtaWdodCBhbHNvIG9jY3VyIHdoZW4gdGhlIGRhdGEgaXMgdXBkYXRlZCBkdWUgdG8gY3VzdG9tIHJlZnJlc2ggY2FsbHMgb24gdGhlIGRhdGFzb3VyY2Ugb3IgYW55IG90aGVyIHNjZW5hcmlvIHRoYXQgbWlnaHQgaW52b2tlIGEgZGF0YXNvdXJjZSB1cGRhdGUuXG4gICAqXG4gICAqIEVtaXRzIGFuIGV2ZW50IGhhbmRsZXIgd2l0aCB0aGUgcm93LCB0aGUgdG9nZ2xlIHN0YXRlIGFuZCBhIHRvZ2dsZSBvcGVyYXRpb24gbWV0aG9kLlxuICAgKi9cbiAgQE91dHB1dCgpIHRvZ2dsZWRSb3dDb250ZXh0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxQYmxEZXRhaWxzUm93VG9nZ2xlRXZlbnQ8VD4+KCk7XG5cbiAgcHJpdmF0ZSBfb3BlbmVkUm93PzogUGJsRGV0YWlsc1Jvd1RvZ2dsZUV2ZW50PFQ+O1xuICBwcml2YXRlIF9mb3JjZVNpbmdsZTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaXNTaW1wbGVSb3c6IChpbmRleDogbnVtYmVyLCByb3dEYXRhOiBUKSA9PiBib29sZWFuID0gUk9XX1dIRU5fVFJVRTtcbiAgcHJpdmF0ZSBfaXNEZXRhaWxSb3c6IChpbmRleDogbnVtYmVyLCByb3dEYXRhOiBUKSA9PiBib29sZWFuID0gUk9XX1dIRU5fRkFMU0U7XG4gIHByaXZhdGUgX2RldGFpbFJvd1Jvd3MgPSBuZXcgTWFwPGFueSwgUGJsTmdyaWREZXRhaWxSb3dDb21wb25lbnQ+KCk7XG4gIHByaXZhdGUgX2RldGFpbFJvdzogKCAoaW5kZXg6IG51bWJlciwgcm93RGF0YTogVCkgPT4gYm9vbGVhbiApIHwgYm9vbGVhbjtcbiAgcHJpdmF0ZSBfZGV0YWlsUm93RGVmOiBQYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZkRpcmVjdGl2ZTxUPjtcbiAgcHJpdmF0ZSBfZGVmYXVsdFBhcmVudFJlZjogQ29tcG9uZW50UmVmPFBibE5ncmlkRGVmYXVsdERldGFpbFJvd1BhcmVudENvbXBvbmVudD47XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI8VD4sIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG5cbiAgICBsZXQgc3Vic2NyaXB0aW9uID0gcGx1Z2luQ3RybC5ldmVudHMuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBEZXBlbmRzIG9uIHRhcmdldC1ldmVudHMgcGx1Z2luXG4gICAgICAgIC8vIGlmIGl0J3Mgbm90IHNldCwgY3JlYXRlIGl0LlxuICAgICAgICBpZiAoIXBsdWdpbkN0cmwuaGFzUGx1Z2luKCd0YXJnZXRFdmVudHMnKSkge1xuICAgICAgICAgIHBsdWdpbkN0cmwuY3JlYXRlUGx1Z2luKCd0YXJnZXRFdmVudHMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdyaWQucmVnaXN0cnkuY2hhbmdlc1xuICAgICAgICAgIC5zdWJzY3JpYmUoIGNoYW5nZXMgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjIG9mIGNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgc3dpdGNoIChjLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkZXRhaWxSb3dQYXJlbnQnOlxuICAgICAgICAgICAgICAgICAgaWYgKGMub3AgPT09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGdyaWQuX2Nka1RhYmxlLnJlbW92ZVJvd0RlZihjLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGV0YWlsUm93RGVmID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdGhpcy5zZXR1cERldGFpbFJvd1BhcmVudCgpO1xuICAgICAgICAgICAgICAgICAgLy8gZ3JpZC5fY2RrVGFibGUuc3luY1Jvd3MoJ2RhdGEnKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaWYgd2Ugc3RhcnQgd2l0aCBhbiBpbml0aWFsIHZhbHVlLCB0aGVuIHVwZGF0ZSB0aGUgZ3JpZCBjYXVzZSB3ZSBkaWRuJ3QgZG8gdGhhdFxuICAgICAgICAvLyB3aGVuIGl0IHdhcyBzZXQgKHdlIGNhbnQgY2F1c2Ugd2UncmUgbm90IGluaXQpXG4gICAgICAgIC8vIG90aGVyd2lzZSBqdXN0IHNldHVwIHRoZSBwYXJlbnQuXG4gICAgICAgIGlmICh0aGlzLl9kZXRhaWxSb3cpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVRhYmxlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXR1cERldGFpbFJvd1BhcmVudCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhZGREZXRhaWxSb3coZGV0YWlsUm93OiBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCk6IHZvaWQge1xuICAgIHRoaXMuX2RldGFpbFJvd1Jvd3Muc2V0KGRldGFpbFJvdy5yb3csIGRldGFpbFJvdyk7XG4gIH1cblxuICByZW1vdmVEZXRhaWxSb3coZGV0YWlsUm93OiBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCk6IHZvaWQge1xuICAgIHRoaXMuX2RldGFpbFJvd1Jvd3MuZGVsZXRlKGRldGFpbFJvdy5yb3cpO1xuICB9XG5cbiAgdG9nZ2xlRGV0YWlsUm93KHJvdzogYW55LCBmb3JjZVN0YXRlPzogYm9vbGVhbik6IGJvb2xlYW4gfCB2b2lkIHtcbiAgICBjb25zdCBkZXRhaWxSb3cgPSB0aGlzLl9kZXRhaWxSb3dSb3dzLmdldChyb3cpO1xuICAgIGlmIChkZXRhaWxSb3cpIHtcbiAgICAgIGRldGFpbFJvdy50b2dnbGUoZm9yY2VTdGF0ZSk7XG4gICAgICByZXR1cm4gZGV0YWlsUm93LmV4cGVuZGVkO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kZWZhdWx0UGFyZW50UmVmKSB7XG4gICAgICB0aGlzLl9kZWZhdWx0UGFyZW50UmVmLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMuZ3JpZCk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIGRldGFpbFJvd1RvZ2dsZWQoZXZlbnQ6IFBibERldGFpbHNSb3dUb2dnbGVFdmVudDxUPik6IHZvaWQge1xuICAgIC8vIGxvZ2ljIGZvciBjbG9zaW5nIHByZXZpb3VzIHJvd1xuICAgIGNvbnN0IGlzU2VsZiA9IHRoaXMuX29wZW5lZFJvdyAmJiB0aGlzLl9vcGVuZWRSb3cucm93ID09PSBldmVudC5yb3c7XG4gICAgaWYgKGV2ZW50LmV4cGVuZGVkKSB7XG4gICAgICBpZiAodGhpcy5fZm9yY2VTaW5nbGUgJiYgdGhpcy5fb3BlbmVkUm93ICYmIHRoaXMuX29wZW5lZFJvdy5leHBlbmRlZCAmJiAhaXNTZWxmKSB7XG4gICAgICAgIHRoaXMuX29wZW5lZFJvdy50b2dnbGUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX29wZW5lZFJvdyA9IGV2ZW50O1xuICAgIH0gZWxzZSBpZiAoaXNTZWxmKSB7XG4gICAgICB0aGlzLl9vcGVuZWRSb3cgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMudG9nZ2xlQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cERldGFpbFJvd1BhcmVudCgpOiB2b2lkIHtcbiAgICBjb25zdCBncmlkID0gdGhpcy5ncmlkO1xuICAgIGNvbnN0IGNka1RhYmxlID0gZ3JpZC5fY2RrVGFibGU7XG4gICAgaWYgKHRoaXMuX2RldGFpbFJvd0RlZikge1xuICAgICAgY2RrVGFibGUucmVtb3ZlUm93RGVmKHRoaXMuX2RldGFpbFJvd0RlZik7XG4gICAgICB0aGlzLl9kZXRhaWxSb3dEZWYgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmICh0aGlzLmRldGFpbFJvdykge1xuICAgICAgbGV0IGRldGFpbFJvdyA9IGdyaWQucmVnaXN0cnkuZ2V0U2luZ2xlKCdkZXRhaWxSb3dQYXJlbnQnKTtcbiAgICAgIGlmIChkZXRhaWxSb3cpIHtcbiAgICAgICAgdGhpcy5fZGV0YWlsUm93RGVmID0gZGV0YWlsUm93ID0gZGV0YWlsUm93LmNsb25lKCk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXRhaWxSb3csICdjb2x1bW5zJywgeyBlbnVtZXJhYmxlOiB0cnVlLCAgZ2V0OiAoKSA9PiBncmlkLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1uSWRzIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGV0YWlsUm93LCAnd2hlbicsIHsgZW51bWVyYWJsZTogdHJ1ZSwgIGdldDogKCkgPT4gdGhpcy5faXNEZXRhaWxSb3cgfSk7XG4gICAgICAgIGRldGFpbFJvdy5uZ09uQ2hhbmdlcyh7IGNvbHVtbnM6IHsgaXNGaXJzdENoYW5nZTogKCkgPT4gdHJ1ZSwgZmlyc3RDaGFuZ2U6IHRydWUsIGN1cnJlbnRWYWx1ZTogZGV0YWlsUm93LmNvbHVtbnMsIHByZXZpb3VzVmFsdWU6IG51bGwgfX0pO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5fZGVmYXVsdFBhcmVudFJlZikge1xuICAgICAgICAvLyBUT0RPOiBtb3ZlIHRvIG1vZHVsZT8gc2V0IGluIHJvb3QgcmVnaXN0cnk/IHB1dCBlbHNld2hlcmUgdG8gYXZvaWQgZ3JpZCBzeW5jIChzZWUgZXZlbnQgb2YgcmVnaXN0cnkgY2hhbmdlKS4uLlxuICAgICAgICB0aGlzLl9kZWZhdWx0UGFyZW50UmVmID0gdGhpcy5pbmplY3Rvci5nZXQoQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKVxuICAgICAgICAgIC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShQYmxOZ3JpZERlZmF1bHREZXRhaWxSb3dQYXJlbnRDb21wb25lbnQpXG4gICAgICAgICAgLmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcbiAgICAgICAgdGhpcy5fZGVmYXVsdFBhcmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5yZXNldFRhYmxlUm93RGVmcygpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFRhYmxlUm93RGVmcygpOiB2b2lkIHtcbiAgICBjb25zdCBncmlkID0gdGhpcy5ncmlkO1xuICAgIGlmICh0aGlzLl9kZXRhaWxSb3dEZWYpIHtcbiAgICAgIHRoaXMuX2RldGFpbFJvdyA9PT0gZmFsc2VcbiAgICAgICAgPyBncmlkLl9jZGtUYWJsZS5yZW1vdmVSb3dEZWYodGhpcy5fZGV0YWlsUm93RGVmKVxuICAgICAgICA6IGdyaWQuX2Nka1RhYmxlLmFkZFJvd0RlZih0aGlzLl9kZXRhaWxSb3dEZWYpXG4gICAgICA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgZ3JpZCB3aXRoIGRldGFpbCByb3cgaW5mb3IuXG4gICAqIEluc3RlYWQgb2YgY2FsbGluZyBmb3IgYSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlIHdlIGNhbiBhc3NpZ24gdGhlIG5ldyBwcmVkaWNhdGVzIGRpcmVjdGx5IHRvIHRoZSBjZGtSb3dEZWYgaW5zdGFuY2VzLlxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVUYWJsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWQuX3RhYmxlUm93RGVmLndoZW4gPSB0aGlzLl9pc1NpbXBsZVJvdztcbiAgICB0aGlzLnNldHVwRGV0YWlsUm93UGFyZW50KCk7XG4gICAgLy8gT25jZSB3ZSBjaGFuZ2VkIHRoZSBgd2hlbmAgcHJlZGljYXRlIG9uIHRoZSBgQ2RrUm93RGVmYCB3ZSBtdXN0OlxuICAgIC8vICAgMS4gVXBkYXRlIHRoZSByb3cgY2FjaGUgKHByb3BlcnR5IGByb3dEZWZzYCkgdG8gcmVmbGVjdCB0aGUgbmV3IGNoYW5nZVxuICAgIHRoaXMuZ3JpZC5fY2RrVGFibGUudXBkYXRlUm93RGVmQ2FjaGUoKTtcblxuICAgIC8vICAgMi4gcmUtcmVuZGVyIGFsbCByb3dzLlxuICAgIC8vIFRoZSBsb2dpYyBmb3IgcmUtcmVuZGVyaW5nIGFsbCByb3dzIGlzIGhhbmRsZWQgaW4gYENka1RhYmxlLl9mb3JjZVJlbmRlckRhdGFSb3dzKClgIHdoaWNoIGlzIGEgcHJpdmF0ZSBtZXRob2QuXG4gICAgLy8gVGhpcyBpcyBhIHdvcmthcm91bmQsIGFzc2lnbmluZyB0byBgbXVsdGlUZW1wbGF0ZURhdGFSb3dzYCB3aWxsIGludm9rZSB0aGUgc2V0dGVyIHdoaWNoXG4gICAgLy8gYWxzbyBjYWxscyBgQ2RrVGFibGUuX2ZvcmNlUmVuZGVyRGF0YVJvd3MoKWBcbiAgICAvLyBUT0RPOiBUaGlzIGlzIHJpc2t5LCB0aGUgc2V0dGVyIGxvZ2ljIG1pZ2h0IGNoYW5nZS5cbiAgICAvLyBmb3IgZXhhbXBsZSwgaWYgbWF0ZXJpYWwgd2lsbCBjaGFjayBmb3IgY2hhbmdlIGluIGBtdWx0aVRlbXBsYXRlRGF0YVJvd3NgIHNldHRlciBmcm9tIHByZXZpb3VzIHZhbHVlLi4uXG4gICAgdGhpcy5ncmlkLl9jZGtUYWJsZS5tdWx0aVRlbXBsYXRlRGF0YVJvd3MgPSAhIXRoaXMuX2RldGFpbFJvdztcbiAgfVxufVxuIl19