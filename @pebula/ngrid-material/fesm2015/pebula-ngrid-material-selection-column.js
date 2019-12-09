import { ChangeDetectorRef, Component, ChangeDetectionStrategy, ViewEncapsulation, Optional, Input, ViewChild, ComponentFactoryResolver, Injector, Directive, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PblNgridComponent, PblNgridHeaderCellDefDirective, PblNgridCellDefDirective, PblNgridFooterCellDefDirective, PblNgridPluginController, TablePlugin, PblNgridModule } from '@pebula/ngrid';
import { __decorate, __metadata } from 'tslib';
import { UnRx } from '@pebula/utils';
import '@angular/cdk/collections';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const ALWAYS_FALSE_FN = (/**
 * @return {?}
 */
() => false);
const ɵ0 = ALWAYS_FALSE_FN;
let PblNgridCheckboxComponent = class PblNgridCheckboxComponent {
    /**
     * @param {?} table
     * @param {?} cdr
     */
    constructor(table, cdr) {
        this.table = table;
        this.cdr = cdr;
        this.allSelected = false;
        this._isCheckboxDisabled = ALWAYS_FALSE_FN;
    }
    /**
     * Defines the behavior when clicking on the bulk select checkbox (header).
     * There are 2 options:
     *
     * - all: Will select all items in the current collection
     * - view: Will select only the rendered items in the view
     *
     * The default value is `all`
     * @return {?}
     */
    get bulkSelectMode() { return this._bulkSelectMode; }
    /**
     * @param {?} value
     * @return {?}
     */
    set bulkSelectMode(value) {
        if (value !== this._bulkSelectMode) {
            this._bulkSelectMode = value;
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        }
    }
    /**
     * A Custom selection model, optional.
     * If not set, the selection model from the DataSource is used.
     * @return {?}
     */
    get selection() {
        return this._selection;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selection(value) {
        if (value !== this._selection) {
            this._selection = value;
            this.setupSelection();
        }
    }
    /**
     * @return {?}
     */
    get isCheckboxDisabled() { return this._isCheckboxDisabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set isCheckboxDisabled(value) {
        if (value !== this._isCheckboxDisabled) {
            this._isCheckboxDisabled = value;
            if (!this._isCheckboxDisabled || typeof this._isCheckboxDisabled !== 'function') {
                this._isCheckboxDisabled = ALWAYS_FALSE_FN;
            }
        }
    }
    /**
     * @return {?}
     */
    get color() { return this._color; }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        if (value !== this._color) {
            this._color = value;
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.selection) {
            this.selection = this.table.ds.selection;
        }
        /** @type {?} */
        const registry = this.table.registry;
        registry.addMulti('headerCell', this.headerDef);
        registry.addMulti('tableCell', this.cellDef);
        registry.addMulti('footerCell', this.footerDef);
    }
    /**
     * @return {?}
     */
    masterToggle() {
        if (this.allSelected) {
            this.selection.clear();
        }
        else {
            /** @type {?} */
            const selected = this.getCollection().filter((/**
             * @param {?} data
             * @return {?}
             */
            data => !this._isCheckboxDisabled(data)));
            this.selection.select(...selected);
        }
    }
    /**
     * @param {?} row
     * @return {?}
     */
    rowItemChange(row) {
        this.selection.toggle(row);
    }
    /**
     * @private
     * @return {?}
     */
    getCollection() {
        const { ds } = this.table;
        return this.bulkSelectMode === 'view' ? ds.renderedData : ds.source;
    }
    /**
     * @private
     * @return {?}
     */
    setupSelection() {
        UnRx.kill(this, this.table);
        if (this._selection) {
            this.length = this.selection.selected.length;
            this.selection.changed
                .pipe(UnRx(this, this.table))
                .subscribe((/**
             * @return {?}
             */
            () => {
                this.handleSelectionChanged();
            }));
            /** @type {?} */
            const changeSource = this.bulkSelectMode === 'view' ? this.table.ds.onRenderedDataChanged : this.table.ds.onSourceChanged;
            changeSource
                .pipe(UnRx(this, this.table))
                .subscribe((/**
             * @return {?}
             */
            () => {
                this.handleSelectionChanged();
            }));
        }
        else {
            this.length = 0;
        }
    }
    /**
     * @private
     * @return {?}
     */
    handleSelectionChanged() {
        const { length } = this.getCollection().filter((/**
         * @param {?} data
         * @return {?}
         */
        data => !this._isCheckboxDisabled(data)));
        this.allSelected = !this.selection.isEmpty() && this.selection.selected.length === length;
        this.length = this.selection.selected.length;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
    }
};
PblNgridCheckboxComponent.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: ChangeDetectorRef }
];
PblNgridCheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-ngrid-checkbox',
                template: "<ng-container *pblNgridHeaderCellDef=\"name; col as col;\">\n  <mat-checkbox *ngIf=\"bulkSelectMode !== 'none'\"\n                style=\"overflow: initial\"\n                [color]=\"color\"\n                (click)=\"$event.stopPropagation()\"\n                (change)=\"$event ? masterToggle() : null\"\n                [checked]=\"allSelected\"\n                [indeterminate]=\"length > 0 && !allSelected\">\n  </mat-checkbox>\n</ng-container>\n<mat-checkbox *pblNgridCellDef=\"name; row as row;\"\n              style=\"overflow: initial\"\n              [color]=\"color\"\n              [disabled]=isCheckboxDisabled(row)\n              (click)=\"$event.stopPropagation()\"\n              (change)=\"rowItemChange(row)\"\n              [checked]=\"selection.isSelected(row)\">\n</mat-checkbox>\n<span *pblNgridFooterCellDef=\"name; col as col;\">{{ length ? length : '' }}</span>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".mat-cell.pbl-ngrid-checkbox,.mat-header-cell.pbl-ngrid-checkbox{box-sizing:content-box;-webkit-box-flex:0;flex:0 0 24px;overflow:visible}"]
            }] }
];
/** @nocollapse */
PblNgridCheckboxComponent.ctorParameters = () => [
    { type: PblNgridComponent, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef }
];
PblNgridCheckboxComponent.propDecorators = {
    name: [{ type: Input }],
    bulkSelectMode: [{ type: Input }],
    selection: [{ type: Input }],
    isCheckboxDisabled: [{ type: Input }],
    color: [{ type: Input }],
    headerDef: [{ type: ViewChild, args: [PblNgridHeaderCellDefDirective, { static: true },] }],
    cellDef: [{ type: ViewChild, args: [PblNgridCellDefDirective, { static: true },] }],
    footerDef: [{ type: ViewChild, args: [PblNgridFooterCellDefDirective, { static: true },] }]
};
PblNgridCheckboxComponent = __decorate([
    UnRx(),
    __metadata("design:paramtypes", [PblNgridComponent, ChangeDetectorRef])
], PblNgridCheckboxComponent);
if (false) {
    /**
     * Unique name for the checkbox column.
     * When not set, the name 'checkbox' is used.
     *
     *
     * @type {?}
     */
    PblNgridCheckboxComponent.prototype.name;
    /** @type {?} */
    PblNgridCheckboxComponent.prototype.headerDef;
    /** @type {?} */
    PblNgridCheckboxComponent.prototype.cellDef;
    /** @type {?} */
    PblNgridCheckboxComponent.prototype.footerDef;
    /** @type {?} */
    PblNgridCheckboxComponent.prototype.allSelected;
    /** @type {?} */
    PblNgridCheckboxComponent.prototype.length;
    /**
     * @type {?}
     * @private
     */
    PblNgridCheckboxComponent.prototype._selection;
    /**
     * @type {?}
     * @private
     */
    PblNgridCheckboxComponent.prototype._bulkSelectMode;
    /**
     * @type {?}
     * @private
     */
    PblNgridCheckboxComponent.prototype._isCheckboxDisabled;
    /**
     * @type {?}
     * @private
     */
    PblNgridCheckboxComponent.prototype._color;
    /** @type {?} */
    PblNgridCheckboxComponent.prototype.table;
    /**
     * @type {?}
     * @private
     */
    PblNgridCheckboxComponent.prototype.cdr;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PLUGIN_KEY = 'matCheckboxSelection';
let PblNgridMatCheckboxSelectionDirective = class PblNgridMatCheckboxSelectionDirective {
    /**
     * @param {?} table
     * @param {?} cfr
     * @param {?} injector
     * @param {?} pluginCtrl
     */
    constructor(table, cfr, injector, pluginCtrl) {
        this.table = table;
        this.cfr = cfr;
        this.injector = injector;
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
    }
    /**
     * @return {?}
     */
    get isCheckboxDisabled() { return this._isCheckboxDisabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set isCheckboxDisabled(value) {
        if (value !== this._isCheckboxDisabled) {
            this._isCheckboxDisabled = value;
            if (this.cmpRef && value) {
                this.cmpRef.instance.isCheckboxDisabled = value;
                this.cmpRef.changeDetectorRef.detectChanges();
            }
        }
    }
    /**
     * Add's a selection column using material's `mat-checkbox` in the column specified.
     * @return {?}
     */
    get matCheckboxSelection() { return this._name; }
    /**
     * @param {?} value
     * @return {?}
     */
    set matCheckboxSelection(value) {
        if (value !== this._name) {
            this._name = value;
            if (!value) {
                if (this.cmpRef) {
                    this.cmpRef.destroy();
                    this.cmpRef = undefined;
                }
            }
            else {
                if (!this.cmpRef) {
                    this.cmpRef = this.cfr.resolveComponentFactory(PblNgridCheckboxComponent).create(this.injector);
                    this.cmpRef.instance.table = this.table;
                    if (this._bulkSelectMode) {
                        this.cmpRef.instance.bulkSelectMode = this._bulkSelectMode;
                    }
                    this.cmpRef.instance.color = this._color;
                }
                if (this.isCheckboxDisabled) {
                    this.cmpRef.instance.isCheckboxDisabled = this.isCheckboxDisabled;
                }
                this.cmpRef.instance.name = value;
                this.cmpRef.changeDetectorRef.detectChanges();
            }
        }
    }
    /**
     * Defines the behavior when clicking on the bulk select checkbox (header).
     * There are 2 options:
     *
     * - all: Will select all items in the current collection
     * - view: Will select only the rendered items in the view
     *
     * The default value is `all`
     * @return {?}
     */
    get bulkSelectMode() { return this._bulkSelectMode; }
    /**
     * @param {?} value
     * @return {?}
     */
    set bulkSelectMode(value) {
        if (value !== this._bulkSelectMode) {
            this._bulkSelectMode = value;
            if (this.cmpRef) {
                this.cmpRef.instance.bulkSelectMode = value;
            }
        }
    }
    /**
     * @return {?}
     */
    get matCheckboxSelectionColor() { return this._color; }
    /**
     * @param {?} value
     * @return {?}
     */
    set matCheckboxSelectionColor(value) {
        if (value !== this._color) {
            this._color = value;
            if (this.cmpRef) {
                this.cmpRef.instance.color = value;
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
        this._removePlugin(this.table);
    }
};
PblNgridMatCheckboxSelectionDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: PblNgridPluginController }
];
PblNgridMatCheckboxSelectionDirective.decorators = [
    { type: Directive, args: [{ selector: 'pbl-ngrid[matCheckboxSelection]' },] }
];
/** @nocollapse */
PblNgridMatCheckboxSelectionDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: PblNgridPluginController }
];
PblNgridMatCheckboxSelectionDirective.propDecorators = {
    isCheckboxDisabled: [{ type: Input }],
    matCheckboxSelection: [{ type: Input }],
    bulkSelectMode: [{ type: Input }],
    matCheckboxSelectionColor: [{ type: Input }]
};
PblNgridMatCheckboxSelectionDirective = __decorate([
    TablePlugin({ id: PLUGIN_KEY }),
    UnRx(),
    __metadata("design:paramtypes", [PblNgridComponent,
        ComponentFactoryResolver,
        Injector,
        PblNgridPluginController])
], PblNgridMatCheckboxSelectionDirective);
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype._name;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype._bulkSelectMode;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype._color;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype.cmpRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype._removePlugin;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype._isCheckboxDisabled;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype.table;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype.cfr;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype.injector;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PblNgridCheckboxModule {
}
PblNgridCheckboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MatCheckboxModule, PblNgridModule],
                declarations: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent],
                exports: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent],
                entryComponents: [PblNgridCheckboxComponent]
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

export { PblNgridCheckboxModule, PblNgridMatCheckboxSelectionDirective as ɵa, PblNgridCheckboxComponent as ɵb };
//# sourceMappingURL=pebula-ngrid-material-selection-column.js.map
