import { __extends, __values, __decorate, __metadata } from 'tslib';
import { Directive, TemplateRef, IterableDiffers, Component, EventEmitter, ComponentFactoryResolver, Injector, Input, Output, ElementRef, ViewContainerRef, ChangeDetectionStrategy, ViewEncapsulation, Optional, Inject, NgModule } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UnRx } from '@pebula/utils';
import { PblNgridRegistryService, PblNgridSingleTemplateRegistry, PblNgridPluginController, PblNgridComponent, NgridPlugin, EXT_API_TOKEN, PblNgridRowComponent, PblNgridModule } from '@pebula/ngrid';
import { CdkRowDef, CDK_ROW_TEMPLATE, CdkRow, CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { PblNgridTargetEventsModule } from '@pebula/ngrid/target-events';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Marks the element as the display element for the detail row itself.
 */
var PblNgridDetailRowDefDirective = /** @class */ (function (_super) {
    __extends(PblNgridDetailRowDefDirective, _super);
    function PblNgridDetailRowDefDirective(tRef, registry) {
        var _this = _super.call(this, tRef, registry) || this;
        _this.kind = 'detailRow';
        return _this;
    }
    PblNgridDetailRowDefDirective.decorators = [
        { type: Directive, args: [{ selector: '[pblNgridDetailRowDef]' },] }
    ];
    /** @nocollapse */
    PblNgridDetailRowDefDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: PblNgridRegistryService }
    ]; };
    return PblNgridDetailRowDefDirective;
}(PblNgridSingleTemplateRegistry));
if (false) {
    /** @type {?} */
    PblNgridDetailRowDefDirective.prototype.kind;
}
/**
 * @template T
 */
var PblNgridDetailRowParentRefDirective = /** @class */ (function (_super) {
    __extends(PblNgridDetailRowParentRefDirective, _super);
    function PblNgridDetailRowParentRefDirective(template, _differs, registry) {
        var _this = _super.call(this, template, _differs) || this;
        _this.registry = registry;
        return _this;
    }
    /**
     * @return {?}
     */
    PblNgridDetailRowParentRefDirective.prototype.clone = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var clone = Object.create(this);
        this._columnsDiffer = this.columns = undefined;
        return clone;
    };
    /**
     * @return {?}
     */
    PblNgridDetailRowParentRefDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.registry.setSingle('detailRowParent', (/** @type {?} */ (this)));
    };
    /**
     * @return {?}
     */
    PblNgridDetailRowParentRefDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.registry.setSingle('detailRowParent', undefined);
    };
    PblNgridDetailRowParentRefDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[pblNgridDetailRowParentRef]',
                    inputs: ['columns: pblNgridDetailRowParentRef', 'when: pblNgridDetailRowParentRefWhen'],
                },] }
    ];
    /** @nocollapse */
    PblNgridDetailRowParentRefDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: IterableDiffers },
        { type: PblNgridRegistryService }
    ]; };
    return PblNgridDetailRowParentRefDirective;
}(CdkRowDef));
if (false) {
    /**
     * @type {?}
     * @protected
     */
    PblNgridDetailRowParentRefDirective.prototype.registry;
}
/**
 * Use to set the a default `pblNgridDetailRowParentRef` if the user did not set one.
 * \@internal
 */
var PblNgridDefaultDetailRowParentComponent = /** @class */ (function () {
    function PblNgridDefaultDetailRowParentComponent() {
    }
    PblNgridDefaultDetailRowParentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pbl-ngrid-default-detail-row-parent',
                    template: "<pbl-ngrid-row *pblNgridDetailRowParentRef=\"let row; gridInstance as gridInstance\" [grid]=\"gridInstance\" [detailRow]=\"row\"></pbl-ngrid-row>"
                }] }
    ];
    return PblNgridDefaultDetailRowParentComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var PLUGIN_KEY = 'detailRow';
/** @type {?} */
var ROW_WHEN_TRUE = (/**
 * @return {?}
 */
function () { return true; });
/** @type {?} */
var ROW_WHEN_FALSE = (/**
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
function toggleDetailRow(grid, row, forceState) {
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
function PblDetailsRowToggleEvent() { }
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
    PblNgridDetailRowPluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: PblNgridPluginController },
        { type: Injector }
    ]; };
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
    /**
     * @template T
     */
    PblNgridDetailRowPluginDirective = __decorate([
        NgridPlugin({ id: PLUGIN_KEY }),
        UnRx(),
        __metadata("design:paramtypes", [PblNgridComponent, PblNgridPluginController, Injector])
    ], PblNgridDetailRowPluginDirective);
    return PblNgridDetailRowPluginDirective;
}());
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PblNgridDetailRowComponent = /** @class */ (function (_super) {
    __extends(PblNgridDetailRowComponent, _super);
    function PblNgridDetailRowComponent(extApi, el, vcRef) {
        var _this = _super.call(this, extApi, el) || this;
        _this.vcRef = vcRef;
        _this.opened = false;
        return _this;
    }
    PblNgridDetailRowComponent_1 = PblNgridDetailRowComponent;
    Object.defineProperty(PblNgridDetailRowComponent.prototype, "expended", {
        get: /**
         * @return {?}
         */
        function () {
            return this.opened;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridDetailRowComponent.prototype, "row", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.updateRow(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridDetailRowComponent.prototype, "_element", {
        get: /**
         * @private
         * @return {?}
         */
        function () { return this.el.nativeElement; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblNgridDetailRowComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var controller = PblNgridPluginController.find(this.extApi.grid);
        this.plugin = controller.getPlugin(PLUGIN_KEY); // TODO: THROW IF NO PLUGIN...
        this.plugin.addDetailRow(this);
        /** @type {?} */
        var tradeEvents = controller.getPlugin('targetEvents');
        tradeEvents.cellClick
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.type === 'data' && event.row === _this.context.$implicit) {
                var excludeToggleFrom = _this.plugin.excludeToggleFrom;
                if (!excludeToggleFrom || !excludeToggleFrom.some((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return event.column.id === c; }))) {
                    _this.toggle();
                }
            }
        }));
        tradeEvents.rowClick
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (!event.root && event.type === 'data' && event.row === _this.context.$implicit) {
                _this.toggle();
            }
        }));
    };
    /**
     * @return {?}
     */
    PblNgridDetailRowComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.plugin.removeDetailRow(this);
    };
    /**
     * @return {?}
     */
    PblNgridDetailRowComponent.prototype.updateRow = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var prevIdentity = this.context && this.context.$implicit;
        _super.prototype.updateRow.call(this);
        if (this.opened) {
            /** @type {?} */
            var currIdentity = this.context && this.context.$implicit;
            if (currIdentity !== prevIdentity && currIdentity) {
                switch (this.plugin.whenContextChange) {
                    case 'render':
                        this.render();
                        break;
                    case 'close':
                        this.toggle(false);
                        break;
                }
                this.plugin.toggledRowContextChange.next(this.createEvent());
            }
        }
    };
    /**
     * @param {?=} forceState
     * @return {?}
     */
    PblNgridDetailRowComponent.prototype.toggle = /**
     * @param {?=} forceState
     * @return {?}
     */
    function (forceState) {
        if (this.opened !== forceState) {
            if (this.opened) {
                this.vcRef.clear();
                this._element.classList.remove('pbl-row-detail-opened');
            }
            else {
                this.render();
            }
            this.opened = this.vcRef.length > 0;
            if (this.opened) {
                this._element.classList.add('pbl-row-detail-opened');
            }
            this.plugin.detailRowToggled(this.createEvent());
        }
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @param {?} event
     * @return {?}
     */
    PblNgridDetailRowComponent.prototype.handleKeydown = /**
     * \@internal
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.target === this._element) {
            /** @type {?} */
            var keyCode = event.keyCode;
            /** @type {?} */
            var isToggleKey = keyCode === ENTER || keyCode === SPACE;
            if (isToggleKey) {
                event.preventDefault(); // prevents the page from scrolling down when pressing space
                this.toggle();
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridDetailRowComponent.prototype.createEvent = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var event = Object.create(this);
        Object.defineProperty(event, 'row', { value: this.context.$implicit });
        return event;
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridDetailRowComponent.prototype.render = /**
     * @private
     * @return {?}
     */
    function () {
        this.vcRef.clear();
        if (this.context.$implicit) {
            /** @type {?} */
            var detailRowDef = this.context.grid.registry.getSingle('detailRow');
            if (detailRowDef) {
                this.vcRef.createEmbeddedView(detailRowDef.tRef, this.context);
            }
        }
    };
    var PblNgridDetailRowComponent_1;
    PblNgridDetailRowComponent.ctorParameters = function () { return [
        { type: undefined },
        { type: ElementRef },
        { type: ViewContainerRef }
    ]; };
    PblNgridDetailRowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pbl-ngrid-row[detailRow]',
                    exportAs: 'pblNgridDetailRow',
                    host: {
                        // tslint:disable-line:use-host-property-decorator
                        class: 'pbl-ngrid-row pbl-row-detail-parent',
                        role: 'row',
                        '[attr.tabindex]': 'grid?.rowFocus',
                        '(keydown)': 'handleKeydown($event)'
                    },
                    template: CDK_ROW_TEMPLATE,
                    providers: [
                        { provide: CdkRow, useExisting: PblNgridDetailRowComponent_1 }
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".pbl-row-detail-parent { position: relative; cursor: pointer; }"]
                }] }
    ];
    /** @nocollapse */
    PblNgridDetailRowComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [EXT_API_TOKEN,] }] },
        { type: ElementRef },
        { type: ViewContainerRef }
    ]; };
    PblNgridDetailRowComponent.propDecorators = {
        row: [{ type: Input, args: ['detailRow',] }]
    };
    PblNgridDetailRowComponent = PblNgridDetailRowComponent_1 = __decorate([
        UnRx(),
        __metadata("design:paramtypes", [Object, ElementRef,
            ViewContainerRef])
    ], PblNgridDetailRowComponent);
    return PblNgridDetailRowComponent;
}(PblNgridRowComponent));
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowComponent.prototype.opened;
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowComponent.prototype.plugin;
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowComponent.prototype.vcRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DETAIL_ROW = [
    PblNgridDetailRowPluginDirective,
    PblNgridDetailRowComponent,
    PblNgridDetailRowParentRefDirective,
    PblNgridDetailRowDefDirective,
];
var PblNgridDetailRowModule = /** @class */ (function () {
    function PblNgridDetailRowModule() {
    }
    PblNgridDetailRowModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, CdkTableModule, PblNgridModule, PblNgridTargetEventsModule],
                    declarations: [DETAIL_ROW, PblNgridDefaultDetailRowParentComponent],
                    exports: [DETAIL_ROW],
                    entryComponents: [PblNgridDetailRowComponent, PblNgridDefaultDetailRowParentComponent]
                },] }
    ];
    return PblNgridDetailRowModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PblNgridDetailRowModule, toggleDetailRow, PLUGIN_KEY as ɵa, PblNgridDetailRowPluginDirective as ɵb, PblNgridDetailRowComponent as ɵc, PblNgridDetailRowDefDirective as ɵd, PblNgridDetailRowParentRefDirective as ɵe, PblNgridDefaultDetailRowParentComponent as ɵf };
//# sourceMappingURL=pebula-ngrid-detail-row.js.map
