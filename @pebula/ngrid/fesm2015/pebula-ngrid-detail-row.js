import { __decorate, __metadata } from 'tslib';
import { Directive, TemplateRef, IterableDiffers, Component, EventEmitter, ComponentFactoryResolver, Injector, Input, Output, ElementRef, ViewContainerRef, ChangeDetectionStrategy, ViewEncapsulation, Optional, Inject, NgModule } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UnRx } from '@pebula/utils';
import { PblNgridSingleTemplateRegistry, PblNgridRegistryService, PblNgridPluginController, PblNgridComponent, NgridPlugin, PblNgridRowComponent, EXT_API_TOKEN, PblNgridModule } from '@pebula/ngrid';
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
class PblNgridDetailRowDefDirective extends PblNgridSingleTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        super(tRef, registry);
        this.kind = 'detailRow';
    }
}
PblNgridDetailRowDefDirective.decorators = [
    { type: Directive, args: [{ selector: '[pblNgridDetailRowDef]' },] }
];
/** @nocollapse */
PblNgridDetailRowDefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
if (false) {
    /** @type {?} */
    PblNgridDetailRowDefDirective.prototype.kind;
}
/**
 * @template T
 */
class PblNgridDetailRowParentRefDirective extends CdkRowDef {
    /**
     * @param {?} template
     * @param {?} _differs
     * @param {?} registry
     */
    constructor(template, _differs, registry) {
        super(template, _differs);
        this.registry = registry;
    }
    /**
     * @return {?}
     */
    clone() {
        /** @type {?} */
        const clone = Object.create(this);
        this._columnsDiffer = this.columns = undefined;
        return clone;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.registry.setSingle('detailRowParent', (/** @type {?} */ (this)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.registry.setSingle('detailRowParent', undefined);
    }
}
PblNgridDetailRowParentRefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblNgridDetailRowParentRef]',
                inputs: ['columns: pblNgridDetailRowParentRef', 'when: pblNgridDetailRowParentRefWhen'],
            },] }
];
/** @nocollapse */
PblNgridDetailRowParentRefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: IterableDiffers },
    { type: PblNgridRegistryService }
];
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
class PblNgridDefaultDetailRowParentComponent {
}
PblNgridDefaultDetailRowParentComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-ngrid-default-detail-row-parent',
                template: `<pbl-ngrid-row *pblNgridDetailRowParentRef="let row; gridInstance as gridInstance" [grid]="gridInstance" [detailRow]="row"></pbl-ngrid-row>`
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PLUGIN_KEY = 'detailRow';
/** @type {?} */
const ROW_WHEN_TRUE = (/**
 * @return {?}
 */
() => true);
/** @type {?} */
const ROW_WHEN_FALSE = (/**
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
function toggleDetailRow(grid, row, forceState) {
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
let PblNgridDetailRowPluginDirective = /**
 * @template T
 */
class PblNgridDetailRowPluginDirective {
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
PblNgridDetailRowPluginDirective = __decorate([
    NgridPlugin({ id: PLUGIN_KEY }),
    UnRx(),
    __metadata("design:paramtypes", [PblNgridComponent, PblNgridPluginController, Injector])
], PblNgridDetailRowPluginDirective);
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

var PblNgridDetailRowComponent_1;
let PblNgridDetailRowComponent = PblNgridDetailRowComponent_1 = class PblNgridDetailRowComponent extends PblNgridRowComponent {
    /**
     * @param {?} extApi
     * @param {?} el
     * @param {?} vcRef
     */
    constructor(extApi, el, vcRef) {
        super(extApi, el);
        this.vcRef = vcRef;
        this.opened = false;
    }
    /**
     * @return {?}
     */
    get expended() {
        return this.opened;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set row(value) { this.updateRow(); }
    /**
     * @private
     * @return {?}
     */
    get _element() { return this.el.nativeElement; }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const controller = PblNgridPluginController.find(this.extApi.grid);
        this.plugin = controller.getPlugin(PLUGIN_KEY); // TODO: THROW IF NO PLUGIN...
        this.plugin.addDetailRow(this);
        /** @type {?} */
        const tradeEvents = controller.getPlugin('targetEvents');
        tradeEvents.cellClick
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.type === 'data' && event.row === this.context.$implicit) {
                const { excludeToggleFrom } = this.plugin;
                if (!excludeToggleFrom || !excludeToggleFrom.some((/**
                 * @param {?} c
                 * @return {?}
                 */
                c => event.column.id === c))) {
                    this.toggle();
                }
            }
        }));
        tradeEvents.rowClick
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (!event.root && event.type === 'data' && event.row === this.context.$implicit) {
                this.toggle();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.plugin.removeDetailRow(this);
    }
    /**
     * @return {?}
     */
    updateRow() {
        /** @type {?} */
        const prevIdentity = this.context && this.context.$implicit;
        super.updateRow();
        if (this.opened) {
            /** @type {?} */
            const currIdentity = this.context && this.context.$implicit;
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
    }
    /**
     * @param {?=} forceState
     * @return {?}
     */
    toggle(forceState) {
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
    }
    /**
     * \@internal
     * @param {?} event
     * @return {?}
     */
    handleKeydown(event) {
        if (event.target === this._element) {
            /** @type {?} */
            const keyCode = event.keyCode;
            /** @type {?} */
            const isToggleKey = keyCode === ENTER || keyCode === SPACE;
            if (isToggleKey) {
                event.preventDefault(); // prevents the page from scrolling down when pressing space
                this.toggle();
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    createEvent() {
        /** @type {?} */
        const event = Object.create(this);
        Object.defineProperty(event, 'row', { value: this.context.$implicit });
        return event;
    }
    /**
     * @private
     * @return {?}
     */
    render() {
        this.vcRef.clear();
        if (this.context.$implicit) {
            /** @type {?} */
            const detailRowDef = this.context.grid.registry.getSingle('detailRow');
            if (detailRowDef) {
                this.vcRef.createEmbeddedView(detailRowDef.tRef, this.context);
            }
        }
    }
};
PblNgridDetailRowComponent.ctorParameters = () => [
    { type: undefined },
    { type: ElementRef },
    { type: ViewContainerRef }
];
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
                styles: [`.pbl-row-detail-parent { position: relative; cursor: pointer; }`]
            }] }
];
/** @nocollapse */
PblNgridDetailRowComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [EXT_API_TOKEN,] }] },
    { type: ElementRef },
    { type: ViewContainerRef }
];
PblNgridDetailRowComponent.propDecorators = {
    row: [{ type: Input, args: ['detailRow',] }]
};
PblNgridDetailRowComponent = PblNgridDetailRowComponent_1 = __decorate([
    UnRx(),
    __metadata("design:paramtypes", [Object, ElementRef,
        ViewContainerRef])
], PblNgridDetailRowComponent);
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
const DETAIL_ROW = [
    PblNgridDetailRowPluginDirective,
    PblNgridDetailRowComponent,
    PblNgridDetailRowParentRefDirective,
    PblNgridDetailRowDefDirective,
];
class PblNgridDetailRowModule {
}
PblNgridDetailRowModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, CdkTableModule, PblNgridModule, PblNgridTargetEventsModule],
                declarations: [DETAIL_ROW, PblNgridDefaultDetailRowParentComponent],
                exports: [DETAIL_ROW],
                entryComponents: [PblNgridDetailRowComponent, PblNgridDefaultDetailRowParentComponent]
            },] }
];

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
