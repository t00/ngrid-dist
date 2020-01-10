import { Directive, Input, Component, ViewEncapsulation, ElementRef, ViewContainerRef, ViewChild, NgModule, Optional, SkipSelf, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PblNgridPluginController, NgridPlugin, PblNgridMultiComponentRegistry, PblNgridModule, PblNgridRegistryService, PblNgridConfigService } from '@pebula/ngrid';
import { PblNgridOverlayPanelFactory, PblNgridOverlayPanelRef, PblNgridOverlayPanelComponentExtension, PblNgridOverlayPanelModule } from '@pebula/ngrid/overlay-panel';
import { __decorate, __metadata } from 'tslib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PLUGIN_KEY = 'matHeaderContextMenu';
let PblNgridMatHeaderContextMenuPlugin = class PblNgridMatHeaderContextMenuPlugin {
    /**
     * @param {?} overlayPanelFactory
     * @param {?} pluginCtrl
     */
    constructor(overlayPanelFactory, pluginCtrl) {
        this.pluginCtrl = pluginCtrl;
        this.overlayPanel = overlayPanelFactory.create(pluginCtrl.extApi.grid);
    }
};
PblNgridMatHeaderContextMenuPlugin.ctorParameters = () => [
    { type: PblNgridOverlayPanelFactory },
    { type: PblNgridPluginController }
];
PblNgridMatHeaderContextMenuPlugin.decorators = [
    { type: Directive, args: [{ selector: 'pbl-ngrid[matHeaderContextMenu]' },] }
];
/** @nocollapse */
PblNgridMatHeaderContextMenuPlugin.ctorParameters = () => [
    { type: PblNgridOverlayPanelFactory },
    { type: PblNgridPluginController }
];
PblNgridMatHeaderContextMenuPlugin.propDecorators = {
    style: [{ type: Input, args: ['matHeaderContextMenu',] }],
    config: [{ type: Input }]
};
PblNgridMatHeaderContextMenuPlugin = __decorate([
    NgridPlugin({ id: PLUGIN_KEY }),
    __metadata("design:paramtypes", [PblNgridOverlayPanelFactory,
        PblNgridPluginController])
], PblNgridMatHeaderContextMenuPlugin);
if (false) {
    /** @type {?} */
    PblNgridMatHeaderContextMenuPlugin.prototype.style;
    /** @type {?} */
    PblNgridMatHeaderContextMenuPlugin.prototype.config;
    /** @type {?} */
    PblNgridMatHeaderContextMenuPlugin.prototype.overlayPanel;
    /** @type {?} */
    PblNgridMatHeaderContextMenuPlugin.prototype.pluginCtrl;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DEFAULT_CONFIG = { hasBackdrop: true, xPos: 'after', yPos: 'below' };
class MatHeaderContextMenuTrigger {
    /**
     * @param {?} plugin
     * @param {?} elRef
     */
    constructor(plugin, elRef) {
        this.plugin = plugin;
        this.elRef = elRef;
    }
    /**
     * @return {?}
     */
    openOverlayPanel() {
        /** @type {?} */
        const config = this.plugin.config || DEFAULT_CONFIG;
        this.plugin.overlayPanel.open(this.plugin.style, this.elRef, config, this.context);
    }
}
MatHeaderContextMenuTrigger.decorators = [
    { type: Component, args: [{
                selector: 'div[mat-header-context-menu-trigger]',
                host: {
                    '(click)': 'openOverlayPanel()',
                },
                template: "<mat-icon style=\"height: 16px; width: 16px; font-size: 16px; line-height: 16px;\">more_vert</mat-icon>\n",
                encapsulation: ViewEncapsulation.None,
                styles: ["div[mat-header-context-menu-trigger]{position:absolute;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;right:0;height:100%;cursor:pointer;margin-right:12px;z-index:100}"]
            }] }
];
/** @nocollapse */
MatHeaderContextMenuTrigger.ctorParameters = () => [
    { type: PblNgridMatHeaderContextMenuPlugin },
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    MatHeaderContextMenuTrigger.prototype.context;
    /**
     * @type {?}
     * @private
     */
    MatHeaderContextMenuTrigger.prototype.plugin;
    /**
     * @type {?}
     * @private
     */
    MatHeaderContextMenuTrigger.prototype.elRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MatHeaderContextMenuExtension extends PblNgridMultiComponentRegistry {
    /**
     * @param {?} cfr
     */
    constructor(cfr) {
        super();
        this.cfr = cfr;
        this.name = 'matHeaderContextMenuTrigger';
        this.kind = 'dataHeaderExtensions';
        this.projectContent = false;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    shouldRender(context) {
        return !!context.injector.get(PblNgridMatHeaderContextMenuPlugin, false);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    getFactory(context) {
        return this.cfr.resolveComponentFactory(MatHeaderContextMenuTrigger);
    }
    /**
     * @param {?} context
     * @param {?} cmpRef
     * @return {?}
     */
    onCreated(context, cmpRef) {
        cmpRef.instance.context = context;
        cmpRef.changeDetectorRef.markForCheck();
    }
}
if (false) {
    /** @type {?} */
    MatHeaderContextMenuExtension.prototype.name;
    /** @type {?} */
    MatHeaderContextMenuExtension.prototype.kind;
    /** @type {?} */
    MatHeaderContextMenuExtension.prototype.projectContent;
    /**
     * @type {?}
     * @private
     */
    MatHeaderContextMenuExtension.prototype.cfr;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MatExcelStyleHeaderMenu {
    /**
     * @param {?} ref
     * @param {?} vcRef
     */
    constructor(ref, vcRef) {
        this.ref = ref;
        this.vcRef = vcRef;
        this.currentFilter = '';
        this.column = ref.data.col;
        this.grid = ref.data.grid;
        if (this.grid.ds.sort.column === this.column) {
            this.currentSort = this.grid.ds.sort.sort.order;
        }
        this.currentPin = this.column.columnDef.sticky ? 'start' : this.column.columnDef.stickyEnd ? 'end' : undefined;
        /** @type {?} */
        const dsFilter = this.grid.ds.filter;
        if (dsFilter && dsFilter.type === 'value' && dsFilter.columns && dsFilter.columns.indexOf(this.column) >= 0) {
            this.currentFilter = dsFilter.filter;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.matMenu.closed.subscribe((/**
         * @param {?} reason
         * @return {?}
         */
        reason => {
            this.ref.close();
        }));
        /** @type {?} */
        const view = this.vcRef.createEmbeddedView(this.matMenu.templateRef);
        this.matMenu.setElevation(0);
        this.matMenu.focusFirstItem('program');
        this.matMenu._resetAnimation();
        view.markForCheck();
        view.detectChanges();
        this.matMenu._startAnimation();
    }
    /**
     * @return {?}
     */
    hide() {
        /** @type {?} */
        const hidden = [this.column.id];
        for (const col of this.grid.columnApi.columns) {
            if (col.hidden) {
                hidden.push(col.id);
            }
        }
        this.grid.hideColumns = hidden;
    }
    /**
     * @param {?} sort
     * @return {?}
     */
    onSortToggle(sort) {
        if (this.currentSort === sort) {
            this.grid.ds.setSort();
        }
        else {
            this.grid.ds.setSort(this.column, { order: sort });
        }
    }
    /**
     * @param {?} pin
     * @return {?}
     */
    onPinToggle(pin) {
        if (this.currentPin === pin) {
            this.column.columnDef.updatePin();
        }
        else {
            this.column.columnDef.updatePin(pin);
        }
    }
    /**
     * @param {?} filterValue
     * @return {?}
     */
    filterColumn(filterValue) {
        this.currentFilter = filterValue;
        if (!filterValue) {
            this.grid.setFilter();
        }
        else {
            this.grid.setFilter(filterValue.trim(), [this.column]);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickTrap(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}
MatExcelStyleHeaderMenu.decorators = [
    { type: Component, args: [{
                selector: 'mat-excel-style-header-menu',
                template: "<mat-menu #columnMenu=\"matMenu\" class=\"pbl-mat-menu-panel\">\n\n  <button *ngIf=\"column.sort\" mat-menu-item [matMenuTriggerFor]=\"sortMenu\">\n    <mat-icon>sort</mat-icon>Sort\n  </button>\n  <button mat-menu-item [matMenuTriggerFor]=\"pinMenu\">\n    <mat-icon>place</mat-icon>Pin\n  </button>\n  <button mat-menu-item (click)=\"grid.columnApi.autoSizeColumn(column)\">\n    <mat-icon>keyboard_tab</mat-icon>Auto Fit\n  </button>\n  <button mat-menu-item (click)=\"hide()\">\n    <mat-icon>visibility_off</mat-icon>Hide Column\n  </button>\n\n  <mat-menu #sortMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"onSortToggle('asc')\" [class.menu-item-selected]=\"currentSort === 'asc'\">\n      <mat-icon [color]=\"currentSort === 'asc' ? 'primary' : ''\">arrow_upward</mat-icon>\n      <span>Ascending</span>\n    </button>\n    <button mat-menu-item (click)=\"onSortToggle('desc')\" [class.menu-item-selected]=\"currentSort === 'desc'\">\n      <mat-icon [color]=\"currentSort === 'desc' ? 'primary' : ''\">arrow_downward</mat-icon>\n      <span>Descending</span>\n    </button>\n  </mat-menu>\n\n  <mat-menu #pinMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"onPinToggle('start')\" [class.menu-item-selected]=\"currentPin === 'start'\">\n      <span>Start</span>\n    </button>\n    <button mat-menu-item (click)=\"onPinToggle('end')\" [class.menu-item-selected]=\"currentPin === 'end'\">\n      <span>End</span>\n    </button>\n  </mat-menu>\n\n  <div class=\"mat-menu-item pbl-mat-menu-row\" (click)=\"clickTrap($event)\">\n    <mat-form-field>\n      <mat-label>Search</mat-label>\n      <input matInput (keyup)=\"filterColumn($event.target.value)\" [value]=\"currentFilter\">\n      <mat-icon matPrefix>search</mat-icon>\n      <button mat-button [style.visibility]=\"currentFilter ? 'visible' : 'hidden'\" matSuffix mat-icon-button aria-label=\"Clear\"\n              (click)=\"filterColumn('')\">\n        <mat-icon>close</mat-icon>\n      </button>\n    </mat-form-field>\n  </div>\n</mat-menu>\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".mat-menu-panel.pbl-mat-menu-panel{max-width:400px}.mat-menu-item.pbl-mat-menu-row{width:100%;box-sizing:border-box;line-height:inherit;height:auto;margin:6px 0;cursor:inherit}.mat-menu-item.pbl-mat-menu-row:hover{background:inherit}"]
            }] }
];
/** @nocollapse */
MatExcelStyleHeaderMenu.ctorParameters = () => [
    { type: PblNgridOverlayPanelRef },
    { type: ViewContainerRef }
];
MatExcelStyleHeaderMenu.propDecorators = {
    matMenu: [{ type: ViewChild, args: ['columnMenu', { read: MatMenu, static: true },] }]
};
if (false) {
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.column;
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.grid;
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.matMenu;
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.currentSort;
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.currentPin;
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.currentFilter;
    /**
     * @type {?}
     * @private
     */
    MatExcelStyleHeaderMenu.prototype.ref;
    /**
     * @type {?}
     * @private
     */
    MatExcelStyleHeaderMenu.prototype.vcRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PblNgridContextMenuModule {
    /**
     * @param {?} parentModule
     * @param {?} registry
     * @param {?} cfr
     * @param {?} configService
     */
    constructor(parentModule, registry, cfr, configService) {
        if (parentModule) {
            return;
        }
        registry.addMulti('dataHeaderExtensions', new MatHeaderContextMenuExtension(cfr));
        registry.addMulti('overlayPanels', new PblNgridOverlayPanelComponentExtension('excelMenu', MatExcelStyleHeaderMenu, cfr));
    }
}
PblNgridContextMenuModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatIconModule,
                    MatButtonModule,
                    MatMenuModule,
                    MatFormFieldModule,
                    MatInputModule,
                    PblNgridModule,
                    PblNgridOverlayPanelModule
                ],
                declarations: [
                    MatHeaderContextMenuTrigger,
                    PblNgridMatHeaderContextMenuPlugin,
                    MatExcelStyleHeaderMenu,
                ],
                exports: [
                    PblNgridMatHeaderContextMenuPlugin,
                ],
                entryComponents: [
                    MatHeaderContextMenuTrigger,
                    MatExcelStyleHeaderMenu,
                ],
            },] }
];
/** @nocollapse */
PblNgridContextMenuModule.ctorParameters = () => [
    { type: PblNgridContextMenuModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: PblNgridRegistryService },
    { type: ComponentFactoryResolver },
    { type: PblNgridConfigService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PblNgridContextMenuModule, MatHeaderContextMenuTrigger as ɵa, PblNgridMatHeaderContextMenuPlugin as ɵb, MatExcelStyleHeaderMenu as ɵc };
//# sourceMappingURL=pebula-ngrid-material-context-menu.js.map
