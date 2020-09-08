/**
 * @fileoverview added by tsickle
 * Generated from: lib/detail-row/detail-row-plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Injector, Input, Output, ComponentFactoryResolver } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
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
 * @param {?} grid
 * @param {?} row
 * @param {?=} forceState
 * @return {?}
 */
export function toggleDetailRow(grid, row, forceState) {
    /** @type {?} */
    const controller = PblNgridPluginController.find(grid);
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
export class PblNgridDetailRowPluginDirective {
    /**
     * @param {?} grid
     * @param {?} pluginCtrl
     * @param {?} injector
     */
    constructor(grid, pluginCtrl, injector) {
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
                grid.registry.changes
                    .subscribe((/**
                 * @param {?} changes
                 * @return {?}
                 */
                changes => {
                    for (const c of changes) {
                        switch (c.type) {
                            case 'detailRowParent':
                                if (c.op === 'remove') {
                                    grid._cdkTable.removeRowDef(c.value);
                                    this._detailRowDef = undefined;
                                }
                                this.setupDetailRowParent();
                                // grid._cdkTable.syncRows('data');
                                break;
                        }
                    }
                }));
                // if we start with an initial value, then update the grid cause we didn't do that
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
     * You can enable/disable detail row for the entire grid by setting `detailRow` to true/false respectively.
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
            const grid = this.grid;
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
            if (grid.isInit) {
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
        this._removePlugin(this.grid);
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
        const grid = this.grid;
        /** @type {?} */
        const cdkTable = grid._cdkTable;
        if (this._detailRowDef) {
            cdkTable.removeRowDef(this._detailRowDef);
            this._detailRowDef = undefined;
        }
        if (this.detailRow) {
            /** @type {?} */
            let detailRow = grid.registry.getSingle('detailRowParent');
            if (detailRow) {
                this._detailRowDef = detailRow = detailRow.clone();
                Object.defineProperty(detailRow, 'columns', { enumerable: true, get: (/**
                     * @return {?}
                     */
                    () => grid.columnApi.visibleColumnIds) });
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
                // TODO: move to module? set in root registry? put elsewhere to avoid grid sync (see event of registry change)...
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
        const grid = this.grid;
        if (this._detailRowDef) {
            this._detailRow === false
                ? grid._cdkTable.removeRowDef(this._detailRowDef)
                : grid._cdkTable.addRowDef(this._detailRowDef);
        }
    }
    /**
     * Update the grid with detail row infor.
     * Instead of calling for a change detection cycle we can assign the new predicates directly to the cdkRowDef instances.
     * @private
     * @return {?}
     */
    updateTable() {
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLXJvdy1wbHVnaW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RldGFpbC1yb3cvIiwic291cmNlcyI6WyJsaWIvZGV0YWlsLXJvdy9kZXRhaWwtcm93LXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLHdCQUF3QixFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUNwSSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHNUUsT0FBTyxFQUF1Qyx1Q0FBdUMsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFRNUcsTUFBTSxPQUFPLFVBQVUsR0FBZ0IsV0FBVzs7QUFFbEQsTUFBTSxPQUFPLGFBQWE7OztBQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQTs7QUFDdkMsTUFBTSxPQUFPLGNBQWM7OztBQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQTs7Ozs7Ozs7QUFFekMsTUFBTSxVQUFVLGVBQWUsQ0FBVSxJQUEwQixFQUFFLEdBQU0sRUFBRSxVQUFvQjs7VUFDekYsVUFBVSxHQUFHLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDdEQsSUFBSSxVQUFVLEVBQUU7O2NBQ1IsTUFBTSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO1FBQy9DLElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNoRDtLQUNGO0FBQ0gsQ0FBQzs7Ozs7QUFFRCw4Q0FJQzs7O0lBSEMsdUNBQU87O0lBQ1AsNENBQWtCOzs7O0lBQ2xCLDREQUFlOzs7OztBQUlqQixNQUFNLE9BQU8sZ0NBQWdD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UCw2REFBcUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXFCckMsNkRBQXFFOzs7Ozs7SUFNckUsd0RBQXlFOzs7Ozs7Ozs7OztJQVV6RSxtRUFBb0Y7Ozs7O0lBRXBGLHNEQUFpRDs7Ozs7SUFDakQsd0RBQThCOzs7OztJQUM5Qix3REFBNkU7Ozs7O0lBQzdFLHdEQUE4RTs7Ozs7SUFDOUUsMERBQW9FOzs7OztJQUNwRSxzREFBeUU7Ozs7O0lBQ3pFLHlEQUE4RDs7Ozs7SUFDOUQsNkRBQWlGOzs7OztJQUNqRix5REFBOEQ7Ozs7O0lBRWxELGdEQUFvQzs7Ozs7SUFBMkMsb0RBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEluamVjdG9yLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCB7IFBibE5ncmlkRGV0YWlsUm93Q29tcG9uZW50IH0gZnJvbSAnLi9yb3cnO1xuaW1wb3J0IHsgUGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZEaXJlY3RpdmUsIFBibE5ncmlkRGVmYXVsdERldGFpbFJvd1BhcmVudENvbXBvbmVudCB9IGZyb20gJy4vZGlyZWN0aXZlcyc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBkZXRhaWxSb3c/OiBQYmxOZ3JpZERldGFpbFJvd1BsdWdpbkRpcmVjdGl2ZTxhbnk+O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAnZGV0YWlsUm93JyA9ICdkZXRhaWxSb3cnO1xuXG5leHBvcnQgY29uc3QgUk9XX1dIRU5fVFJVRSA9ICgpID0+IHRydWU7XG5leHBvcnQgY29uc3QgUk9XX1dIRU5fRkFMU0UgPSAoKSA9PiBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZURldGFpbFJvdzxUID0gYW55PihncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPiwgcm93OiBULCBmb3JjZVN0YXRlPzogYm9vbGVhbik6IGJvb2xlYW4gfCB2b2lkIHtcbiAgY29uc3QgY29udHJvbGxlciA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKGdyaWQpO1xuICBpZiAoY29udHJvbGxlcikge1xuICAgIGNvbnN0IHBsdWdpbiA9IGNvbnRyb2xsZXIuZ2V0UGx1Z2luKFBMVUdJTl9LRVkpO1xuICAgIGlmIChwbHVnaW4pIHtcbiAgICAgIHJldHVybiBwbHVnaW4udG9nZ2xlRGV0YWlsUm93KHJvdywgZm9yY2VTdGF0ZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsRGV0YWlsc1Jvd1RvZ2dsZUV2ZW50PFQgPSBhbnk+IHtcbiAgcm93OiBUO1xuICBleHBlbmRlZDogYm9vbGVhbjtcbiAgdG9nZ2xlKCk6IHZvaWQ7XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZFtkZXRhaWxSb3ddJywgZXhwb3J0QXM6ICdwYmxOZ3JpZERldGFpbFJvdycgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERldGFpbFJvd1BsdWdpbkRpcmVjdGl2ZTxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBEZXRhaWwgcm93IGNvbnRyb2wgKG5vbmUgLyBhbGwgcm93cyAvIHNlbGVjdGl2ZSByb3dzKVxuICAgKlxuICAgKiBBIGRldGFpbCByb3cgaXMgYW4gYWRkaXRpb25hbCByb3cgYWRkZWQgYmVsb3cgYSByb3cgcmVuZGVyZWQgd2l0aCB0aGUgY29udGV4dCBvZiB0aGUgcm93IGFib3ZlIGl0LlxuICAgKlxuICAgKiBZb3UgY2FuIGVuYWJsZS9kaXNhYmxlIGRldGFpbCByb3cgZm9yIHRoZSBlbnRpcmUgZ3JpZCBieSBzZXR0aW5nIGBkZXRhaWxSb3dgIHRvIHRydWUvZmFsc2UgcmVzcGVjdGl2ZWx5LlxuICAgKiBUbyBjb250cm9sIGRldGFpbCByb3cgcGVyIHJvdywgcHJvdmlkZSBhIHByZWRpY2F0ZS5cbiAgICovXG4gIEBJbnB1dCgpIGdldCBkZXRhaWxSb3coKTogKCAoaW5kZXg6IG51bWJlciwgcm93RGF0YTogVCkgPT4gYm9vbGVhbiApIHwgYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kZXRhaWxSb3c7IH1cbiAgc2V0IGRldGFpbFJvdyh2YWx1ZTogKCAoaW5kZXg6IG51bWJlciwgcm93RGF0YTogVCkgPT4gYm9vbGVhbiApIHwgYm9vbGVhbiApIHtcbiAgICBpZiAodGhpcy5fZGV0YWlsUm93ICE9PSB2YWx1ZSkge1xuICAgICAgY29uc3QgZ3JpZCA9IHRoaXMuZ3JpZDtcblxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9pc1NpbXBsZVJvdyA9IChpbmRleDogbnVtYmVyLCByb3dEYXRhOiBUKSA9PiAhKHZhbHVlIGFzIGFueSkoaW5kZXgsIHJvd0RhdGEpO1xuICAgICAgICB0aGlzLl9pc0RldGFpbFJvdyA9IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICB0aGlzLl9pc0RldGFpbFJvdyA9IHZhbHVlID8gUk9XX1dIRU5fVFJVRSA6IFJPV19XSEVOX0ZBTFNFO1xuICAgICAgICB0aGlzLl9pc1NpbXBsZVJvdyA9IHZhbHVlID8gUk9XX1dIRU5fRkFMU0UgOiBST1dfV0hFTl9UUlVFO1xuICAgICAgfVxuICAgICAgdGhpcy5fZGV0YWlsUm93ID0gdmFsdWU7XG5cbiAgICAgIGlmIChncmlkLmlzSW5pdCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVRhYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgc2V0IHNpbmdsZURldGFpbFJvdyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICBpZiAodGhpcy5fZm9yY2VTaW5nbGUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9mb3JjZVNpbmdsZSA9IHZhbHVlO1xuICAgICAgaWYgKHZhbHVlICYmIHRoaXMuX29wZW5lZFJvdyAmJiB0aGlzLl9vcGVuZWRSb3cuZXhwZW5kZWQpIHtcbiAgICAgICAgdGhpcy5fZGV0YWlsUm93Um93cy5mb3JFYWNoKCByID0+IHtcbiAgICAgICAgICBpZiAoci5yb3cgIT09IHRoaXMuX29wZW5lZFJvdy5yb3cpIHtcbiAgICAgICAgICAgIHIudG9nZ2xlKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgY29sdW1ucyB0aGF0IHdpbGwgbm90IHRyaWdnZXIgYSBkZXRhaWwgcm93IHRvZ2dsZSB3aGVuIGNsaWNrZWQuXG4gICAqL1xuICBASW5wdXQoKSBleGNsdWRlVG9nZ2xlRnJvbTogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgYmVoYXZpb3Igd2hlbiB0aGUgcm93J3MgY29udGV4dCBpcyBjaGFuZ2VkIHdoaWxlIHRoZSBkZXRhaWwgcm93IGlzIG9wZW5lZCAoYW5vdGhlciByb3cgaXMgZGlzcGxheWVkIGluIHBsYWNlIG9mIHRoZSBjdXJyZW50IHJvdykuXG4gICAqXG4gICAqIC0gaWdub3JlOiBkb24ndCBkbyBhbnl0aGluZywgbGVhdmUgYXMgaXMgKGZvciBtYW51YWwgaW50ZXJ2ZW50aW9uKVxuICAgKiAtIGNsb3NlOiBjbG9zZSB0aGUgZGV0YWlsIHJvd1xuICAgKiAtIHJlbmRlcjogcmUtcmVuZGVyIHRoZSByb3cgd2l0aCB0aGUgbmV3IGNvbnRleHRcbiAgICpcbiAgICogVGhlIGRlZmF1bHQgYmVoYXZpb3IgaXMgYHJlbmRlcmBcbiAgICpcbiAgICogVGhpcyBzY2VuYXJpbyB3aWxsIHBvcC11cCB3aGVuIHVzaW5nIHBhZ2luYXRpb24gYW5kIHRoZSB1c2VyIG1vdmUgYmV0d2VlbiBwYWdlcyBvciBjaGFuZ2UgdGhlIHBhZ2Ugc2l6ZS5cbiAgICogSXQgbWlnaHQgYWxzbyBoYXBwZW4gd2hlbiB0aGUgZGF0YSBpcyB1cGRhdGVkIGR1ZSB0byBjdXN0b20gcmVmcmVzaCBjYWxscyBvbiB0aGUgZGF0YXNvdXJjZSBvciBhbnkgb3RoZXIgc2NlbmFyaW8gdGhhdCBtaWdodCBpbnZva2UgYSBkYXRhc291cmNlIHVwZGF0ZS5cbiAgICpcbiAgICogVGhlIGBpZ25vcmVgIHBoYXNlLCB3aGVuIHVzZWQsIHdpbGwgbm90IHRyaWdnZXIgYW4gdXBkYXRlLCBsZWF2aW5nIHRoZSBkZXRhaWwgcm93IG9wZW5lZCBhbmQgc2hvd2luZyBkYXRhIGZyb20gdGhlIHByZXZpb3VzIHJvdy5cbiAgICogVGhlIGBpZ25vcmVgIGlzIGludGVuZGVkIGZvciB1c2Ugd2l0aCBgdG9nZ2xlZFJvd0NvbnRleHRDaGFuZ2VgLCB3aGljaCB3aWxsIGVtaXQgd2hlbiB0aGUgcm93IGNvbnRleHQgaGFzIGNoYW5nZWQsIHRoaXMgd2lsbCBhbGxvdyB0aGUgZGV2ZWxvcGVyIHRvXG4gICAqIHRvZ2dsZSB0aGUgcm93IChtaW1pYyBgY2xvc2VgKSBvciB1cGRhdGUgdGhlIGNvbnRleHQgbWFudWFsbHkuIEZvciBleGFtcGxlLCBpZiB0b2dnbGluZyBvcGVuIHRoZSBkZXRhaWwgcm93IGludm9rZXMgYSBcImZldGNoXCIgb3BlcmF0aW9uIHRoYXQgcmV0cmlldmVzIGRhdGEgZm9yIHRoZSBkZXRhaWwgcm93XG4gICAqIHRoaXMgd2lsbCBhbGxvdyB1cGRhdGVzIG9uIGNvbnRleHQgY2hhbmdlLlxuICAgKlxuICAgKiA+IE5vdGUgdGhhdCBgdG9nZ2xlZFJvd0NvbnRleHRDaGFuZ2VgIGZpcmVzIHJlZ2FyZGxlc3Mgb2YgdGhlIHZhbHVlIHNldCBpbiBgd2hlbkNvbnRleHRDaGFuZ2VgXG4gICAqL1xuICBASW5wdXQoKSB3aGVuQ29udGV4dENoYW5nZTogJ2lnbm9yZScgfCAnY2xvc2UnIHwgJ3JlbmRlcicgPSAncmVuZGVyJztcblxuICAvKipcbiAgICogRW1pdHMgd2hlbmV2ZXIgYSBkZXRhaWwgcm93IGluc3RhbmNlIGlzIHRvZ2dsZWQgb24vb2ZmXG4gICAqIEVtaXRzIGFuIGV2ZW50IGhhbmRsZXIgd2l0aCB0aGUgcm93LCB0aGUgdG9nZ2xlIHN0YXRlIGFuZCBhIHRvZ2dsZSBvcGVyYXRpb24gbWV0aG9kLlxuICAgKi9cbiAgQE91dHB1dCgpIHRvZ2dsZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8UGJsRGV0YWlsc1Jvd1RvZ2dsZUV2ZW50PFQ+PigpO1xuICAvKipcbiAgICogRW1pdHMgd2hlbmV2ZXIgdGhlIHJvdyBjb250ZXh0IGhhcyBjaGFuZ2VkIHdoaWxlIHRoZSByb3cgaXMgdG9nZ2xlZCBvcGVuLlxuICAgKiBUaGlzIHNjZW5hcmlvIGlzIHVuaXF1ZSBhbmQgd2lsbCBvY2N1ciBvbmx5IHdoZW4gYSBkZXRhaWwgcm93IGlzIG9wZW5lZCBBTkQgdGhlIHBhcmVudCByb3cgaGFzIGNoYW5nZWQuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCB3aGVuIHVzaW5nIHBhZ2luYXRpb24gYW5kIHRoZSB1c2VyIG5hdmlnYXRlcyB0byB0aGUgbmV4dC9wcmV2aW91cyBzZXQgb3Igd2hlbiB0aGUgcm93cyBwZXIgcGFnZSBzaXplIGlzIGNoYW5nZWQuXG4gICAqIEl0IG1pZ2h0IGFsc28gb2NjdXIgd2hlbiB0aGUgZGF0YSBpcyB1cGRhdGVkIGR1ZSB0byBjdXN0b20gcmVmcmVzaCBjYWxscyBvbiB0aGUgZGF0YXNvdXJjZSBvciBhbnkgb3RoZXIgc2NlbmFyaW8gdGhhdCBtaWdodCBpbnZva2UgYSBkYXRhc291cmNlIHVwZGF0ZS5cbiAgICpcbiAgICogRW1pdHMgYW4gZXZlbnQgaGFuZGxlciB3aXRoIHRoZSByb3csIHRoZSB0b2dnbGUgc3RhdGUgYW5kIGEgdG9nZ2xlIG9wZXJhdGlvbiBtZXRob2QuXG4gICAqL1xuICBAT3V0cHV0KCkgdG9nZ2xlZFJvd0NvbnRleHRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFBibERldGFpbHNSb3dUb2dnbGVFdmVudDxUPj4oKTtcblxuICBwcml2YXRlIF9vcGVuZWRSb3c/OiBQYmxEZXRhaWxzUm93VG9nZ2xlRXZlbnQ8VD47XG4gIHByaXZhdGUgX2ZvcmNlU2luZ2xlOiBib29sZWFuO1xuICBwcml2YXRlIF9pc1NpbXBsZVJvdzogKGluZGV4OiBudW1iZXIsIHJvd0RhdGE6IFQpID0+IGJvb2xlYW4gPSBST1dfV0hFTl9UUlVFO1xuICBwcml2YXRlIF9pc0RldGFpbFJvdzogKGluZGV4OiBudW1iZXIsIHJvd0RhdGE6IFQpID0+IGJvb2xlYW4gPSBST1dfV0hFTl9GQUxTRTtcbiAgcHJpdmF0ZSBfZGV0YWlsUm93Um93cyA9IG5ldyBNYXA8YW55LCBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudD4oKTtcbiAgcHJpdmF0ZSBfZGV0YWlsUm93OiAoIChpbmRleDogbnVtYmVyLCByb3dEYXRhOiBUKSA9PiBib29sZWFuICkgfCBib29sZWFuO1xuICBwcml2YXRlIF9kZXRhaWxSb3dEZWY6IFBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmRGlyZWN0aXZlPFQ+O1xuICBwcml2YXRlIF9kZWZhdWx0UGFyZW50UmVmOiBDb21wb25lbnRSZWY8UGJsTmdyaWREZWZhdWx0RGV0YWlsUm93UGFyZW50Q29tcG9uZW50PjtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjxUPiwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIGxldCBzdWJzY3JpcHRpb24gPSBwbHVnaW5DdHJsLmV2ZW50cy5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgIGlmIChldmVudC5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIERlcGVuZHMgb24gdGFyZ2V0LWV2ZW50cyBwbHVnaW5cbiAgICAgICAgLy8gaWYgaXQncyBub3Qgc2V0LCBjcmVhdGUgaXQuXG4gICAgICAgIGlmICghcGx1Z2luQ3RybC5oYXNQbHVnaW4oJ3RhcmdldEV2ZW50cycpKSB7XG4gICAgICAgICAgcGx1Z2luQ3RybC5jcmVhdGVQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JpZC5yZWdpc3RyeS5jaGFuZ2VzXG4gICAgICAgICAgLnN1YnNjcmliZSggY2hhbmdlcyA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGMgb2YgY2hhbmdlcykge1xuICAgICAgICAgICAgICBzd2l0Y2ggKGMudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RldGFpbFJvd1BhcmVudCc6XG4gICAgICAgICAgICAgICAgICBpZiAoYy5vcCA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JpZC5fY2RrVGFibGUucmVtb3ZlUm93RGVmKGMudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZXRhaWxSb3dEZWYgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldHVwRGV0YWlsUm93UGFyZW50KCk7XG4gICAgICAgICAgICAgICAgICAvLyBncmlkLl9jZGtUYWJsZS5zeW5jUm93cygnZGF0YScpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBpZiB3ZSBzdGFydCB3aXRoIGFuIGluaXRpYWwgdmFsdWUsIHRoZW4gdXBkYXRlIHRoZSBncmlkIGNhdXNlIHdlIGRpZG4ndCBkbyB0aGF0XG4gICAgICAgIC8vIHdoZW4gaXQgd2FzIHNldCAod2UgY2FudCBjYXVzZSB3ZSdyZSBub3QgaW5pdClcbiAgICAgICAgLy8gb3RoZXJ3aXNlIGp1c3Qgc2V0dXAgdGhlIHBhcmVudC5cbiAgICAgICAgaWYgKHRoaXMuX2RldGFpbFJvdykge1xuICAgICAgICAgIHRoaXMudXBkYXRlVGFibGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldHVwRGV0YWlsUm93UGFyZW50KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFkZERldGFpbFJvdyhkZXRhaWxSb3c6IFBibE5ncmlkRGV0YWlsUm93Q29tcG9uZW50KTogdm9pZCB7XG4gICAgdGhpcy5fZGV0YWlsUm93Um93cy5zZXQoZGV0YWlsUm93LnJvdywgZGV0YWlsUm93KTtcbiAgfVxuXG4gIHJlbW92ZURldGFpbFJvdyhkZXRhaWxSb3c6IFBibE5ncmlkRGV0YWlsUm93Q29tcG9uZW50KTogdm9pZCB7XG4gICAgdGhpcy5fZGV0YWlsUm93Um93cy5kZWxldGUoZGV0YWlsUm93LnJvdyk7XG4gIH1cblxuICB0b2dnbGVEZXRhaWxSb3cocm93OiBhbnksIGZvcmNlU3RhdGU/OiBib29sZWFuKTogYm9vbGVhbiB8IHZvaWQge1xuICAgIGNvbnN0IGRldGFpbFJvdyA9IHRoaXMuX2RldGFpbFJvd1Jvd3MuZ2V0KHJvdyk7XG4gICAgaWYgKGRldGFpbFJvdykge1xuICAgICAgZGV0YWlsUm93LnRvZ2dsZShmb3JjZVN0YXRlKTtcbiAgICAgIHJldHVybiBkZXRhaWxSb3cuZXhwZW5kZWQ7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2RlZmF1bHRQYXJlbnRSZWYpIHtcbiAgICAgIHRoaXMuX2RlZmF1bHRQYXJlbnRSZWYuZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy5ncmlkKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgZGV0YWlsUm93VG9nZ2xlZChldmVudDogUGJsRGV0YWlsc1Jvd1RvZ2dsZUV2ZW50PFQ+KTogdm9pZCB7XG4gICAgLy8gbG9naWMgZm9yIGNsb3NpbmcgcHJldmlvdXMgcm93XG4gICAgY29uc3QgaXNTZWxmID0gdGhpcy5fb3BlbmVkUm93ICYmIHRoaXMuX29wZW5lZFJvdy5yb3cgPT09IGV2ZW50LnJvdztcbiAgICBpZiAoZXZlbnQuZXhwZW5kZWQpIHtcbiAgICAgIGlmICh0aGlzLl9mb3JjZVNpbmdsZSAmJiB0aGlzLl9vcGVuZWRSb3cgJiYgdGhpcy5fb3BlbmVkUm93LmV4cGVuZGVkICYmICFpc1NlbGYpIHtcbiAgICAgICAgdGhpcy5fb3BlbmVkUm93LnRvZ2dsZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5fb3BlbmVkUm93ID0gZXZlbnQ7XG4gICAgfSBlbHNlIGlmIChpc1NlbGYpIHtcbiAgICAgIHRoaXMuX29wZW5lZFJvdyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy50b2dnbGVDaGFuZ2UuZW1pdChldmVudCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwRGV0YWlsUm93UGFyZW50KCk6IHZvaWQge1xuICAgIGNvbnN0IGdyaWQgPSB0aGlzLmdyaWQ7XG4gICAgY29uc3QgY2RrVGFibGUgPSBncmlkLl9jZGtUYWJsZTtcbiAgICBpZiAodGhpcy5fZGV0YWlsUm93RGVmKSB7XG4gICAgICBjZGtUYWJsZS5yZW1vdmVSb3dEZWYodGhpcy5fZGV0YWlsUm93RGVmKTtcbiAgICAgIHRoaXMuX2RldGFpbFJvd0RlZiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGV0YWlsUm93KSB7XG4gICAgICBsZXQgZGV0YWlsUm93ID0gZ3JpZC5yZWdpc3RyeS5nZXRTaW5nbGUoJ2RldGFpbFJvd1BhcmVudCcpO1xuICAgICAgaWYgKGRldGFpbFJvdykge1xuICAgICAgICB0aGlzLl9kZXRhaWxSb3dEZWYgPSBkZXRhaWxSb3cgPSBkZXRhaWxSb3cuY2xvbmUoKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRldGFpbFJvdywgJ2NvbHVtbnMnLCB7IGVudW1lcmFibGU6IHRydWUsICBnZXQ6ICgpID0+IGdyaWQuY29sdW1uQXBpLnZpc2libGVDb2x1bW5JZHMgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXRhaWxSb3csICd3aGVuJywgeyBlbnVtZXJhYmxlOiB0cnVlLCAgZ2V0OiAoKSA9PiB0aGlzLl9pc0RldGFpbFJvdyB9KTtcbiAgICAgICAgZGV0YWlsUm93Lm5nT25DaGFuZ2VzKHsgY29sdW1uczogeyBpc0ZpcnN0Q2hhbmdlOiAoKSA9PiB0cnVlLCBmaXJzdENoYW5nZTogdHJ1ZSwgY3VycmVudFZhbHVlOiBkZXRhaWxSb3cuY29sdW1ucywgcHJldmlvdXNWYWx1ZTogbnVsbCB9fSk7XG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLl9kZWZhdWx0UGFyZW50UmVmKSB7XG4gICAgICAgIC8vIFRPRE86IG1vdmUgdG8gbW9kdWxlPyBzZXQgaW4gcm9vdCByZWdpc3RyeT8gcHV0IGVsc2V3aGVyZSB0byBhdm9pZCBncmlkIHN5bmMgKHNlZSBldmVudCBvZiByZWdpc3RyeSBjaGFuZ2UpLi4uXG4gICAgICAgIHRoaXMuX2RlZmF1bHRQYXJlbnRSZWYgPSB0aGlzLmluamVjdG9yLmdldChDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpXG4gICAgICAgICAgLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFBibE5ncmlkRGVmYXVsdERldGFpbFJvd1BhcmVudENvbXBvbmVudClcbiAgICAgICAgICAuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuICAgICAgICB0aGlzLl9kZWZhdWx0UGFyZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlc2V0VGFibGVSb3dEZWZzKCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0VGFibGVSb3dEZWZzKCk6IHZvaWQge1xuICAgIGNvbnN0IGdyaWQgPSB0aGlzLmdyaWQ7XG4gICAgaWYgKHRoaXMuX2RldGFpbFJvd0RlZikge1xuICAgICAgdGhpcy5fZGV0YWlsUm93ID09PSBmYWxzZVxuICAgICAgICA/IGdyaWQuX2Nka1RhYmxlLnJlbW92ZVJvd0RlZih0aGlzLl9kZXRhaWxSb3dEZWYpXG4gICAgICAgIDogZ3JpZC5fY2RrVGFibGUuYWRkUm93RGVmKHRoaXMuX2RldGFpbFJvd0RlZilcbiAgICAgIDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBncmlkIHdpdGggZGV0YWlsIHJvdyBpbmZvci5cbiAgICogSW5zdGVhZCBvZiBjYWxsaW5nIGZvciBhIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUgd2UgY2FuIGFzc2lnbiB0aGUgbmV3IHByZWRpY2F0ZXMgZGlyZWN0bHkgdG8gdGhlIGNka1Jvd0RlZiBpbnN0YW5jZXMuXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZVRhYmxlKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZC5fdGFibGVSb3dEZWYud2hlbiA9IHRoaXMuX2lzU2ltcGxlUm93O1xuICAgIHRoaXMuc2V0dXBEZXRhaWxSb3dQYXJlbnQoKTtcbiAgICAvLyBPbmNlIHdlIGNoYW5nZWQgdGhlIGB3aGVuYCBwcmVkaWNhdGUgb24gdGhlIGBDZGtSb3dEZWZgIHdlIG11c3Q6XG4gICAgLy8gICAxLiBVcGRhdGUgdGhlIHJvdyBjYWNoZSAocHJvcGVydHkgYHJvd0RlZnNgKSB0byByZWZsZWN0IHRoZSBuZXcgY2hhbmdlXG4gICAgdGhpcy5ncmlkLl9jZGtUYWJsZS51cGRhdGVSb3dEZWZDYWNoZSgpO1xuXG4gICAgLy8gICAyLiByZS1yZW5kZXIgYWxsIHJvd3MuXG4gICAgLy8gVGhlIGxvZ2ljIGZvciByZS1yZW5kZXJpbmcgYWxsIHJvd3MgaXMgaGFuZGxlZCBpbiBgQ2RrVGFibGUuX2ZvcmNlUmVuZGVyRGF0YVJvd3MoKWAgd2hpY2ggaXMgYSBwcml2YXRlIG1ldGhvZC5cbiAgICAvLyBUaGlzIGlzIGEgd29ya2Fyb3VuZCwgYXNzaWduaW5nIHRvIGBtdWx0aVRlbXBsYXRlRGF0YVJvd3NgIHdpbGwgaW52b2tlIHRoZSBzZXR0ZXIgd2hpY2hcbiAgICAvLyBhbHNvIGNhbGxzIGBDZGtUYWJsZS5fZm9yY2VSZW5kZXJEYXRhUm93cygpYFxuICAgIC8vIFRPRE86IFRoaXMgaXMgcmlza3ksIHRoZSBzZXR0ZXIgbG9naWMgbWlnaHQgY2hhbmdlLlxuICAgIC8vIGZvciBleGFtcGxlLCBpZiBtYXRlcmlhbCB3aWxsIGNoYWNrIGZvciBjaGFuZ2UgaW4gYG11bHRpVGVtcGxhdGVEYXRhUm93c2Agc2V0dGVyIGZyb20gcHJldmlvdXMgdmFsdWUuLi5cbiAgICB0aGlzLmdyaWQuX2Nka1RhYmxlLm11bHRpVGVtcGxhdGVEYXRhUm93cyA9ICEhdGhpcy5fZGV0YWlsUm93O1xuICB9XG59XG4iXX0=