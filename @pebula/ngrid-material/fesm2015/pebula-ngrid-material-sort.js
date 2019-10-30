import { __decorate, __metadata } from 'tslib';
import { Directive, NgModule, ComponentFactoryResolver } from '@angular/core';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, TablePlugin, PblNgridMultiComponentRegistry, PblNgridModule, PblNgridRegistryService } from '@pebula/ngrid';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PLUGIN_KEY = 'matSort';
let PblNgridMatSortDirective = class PblNgridMatSortDirective {
    /**
     * @param {?} table
     * @param {?} pluginCtrl
     * @param {?} sort
     */
    constructor(table, pluginCtrl, sort) {
        this.table = table;
        this.pluginCtrl = pluginCtrl;
        this.sort = sort;
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        /** @type {?} */
        let origin = 'click';
        this.sort.sortChange
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            this.onSort(s, origin);
            origin = 'click';
        }));
        pluginCtrl.events
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            if (e.kind === 'onInvalidateHeaders') {
                if (table.ds && !table.ds.sort.column) {
                    if (this.sort && this.sort.active) {
                        this.onSort({ active: this.sort.active, direction: this.sort.direction || 'asc' }, origin);
                    }
                }
            }
            if (e.kind === 'onDataSource') {
                UnRx.kill(this, e.prev);
                if (this.sort && this.sort.active) {
                    this.onSort({ active: this.sort.active, direction: this.sort.direction || 'asc' }, origin);
                }
                table.ds.sortChange
                    .pipe(UnRx(this, e.curr))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                event => {
                    if (this.sort && event.column) {
                        /** @type {?} */
                        const _sort = event.sort || {};
                        if (this.sort.active === event.column.id && this.sort.direction === (_sort.order || '')) {
                            return;
                        }
                        /** @type {?} */
                        const sortable = (/** @type {?} */ (this.sort.sortables.get(event.column.id)));
                        if (sortable) {
                            origin = 'ds';
                            this.sort.active = undefined;
                            sortable.start = _sort.order || 'asc';
                            sortable._handleClick();
                        }
                    }
                    else if (this.sort.active) { // clear mode (hit from code, not click).
                        // clear mode (hit from code, not click).
                        /** @type {?} */
                        const sortable = (/** @type {?} */ (this.sort.sortables.get(this.sort.active)));
                        if (sortable) {
                            if (!sortable.disableClear) {
                                /** @type {?} */
                                let nextSortDir;
                                while (nextSortDir = this.sort.getNextSortDirection(sortable)) {
                                    this.sort.direction = nextSortDir;
                                }
                            }
                            origin = 'ds';
                            sortable._handleClick();
                        }
                    }
                }));
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._removePlugin(this.table);
    }
    /**
     * @private
     * @param {?} sort
     * @param {?} origin
     * @return {?}
     */
    onSort(sort, origin) {
        /** @type {?} */
        const table = this.table;
        /** @type {?} */
        const column = table.columnApi.visibleColumns.find((/**
         * @param {?} c
         * @return {?}
         */
        c => c.id === sort.active));
        if (origin !== 'click' || !column || !column.sort) {
            return;
        }
        else {
            /** @type {?} */
            const newSort = {};
            /** @type {?} */
            const sortFn = typeof column.sort === 'function' && column.sort;
            if (sort.direction) {
                newSort.order = sort.direction;
            }
            if (sortFn) {
                newSort.sortFn = sortFn;
            }
            /** @type {?} */
            const currentSort = table.ds.sort;
            if (column === currentSort.column) {
                /** @type {?} */
                const _sort = currentSort.sort || {};
                if (newSort.order === _sort.order) {
                    return;
                }
            }
            table.ds.setSort(column, newSort);
        }
    }
};
PblNgridMatSortDirective.decorators = [
    { type: Directive, args: [{ selector: 'pbl-ngrid[matSort]', exportAs: 'pblMatSort' },] }
];
/** @nocollapse */
PblNgridMatSortDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: PblNgridPluginController },
    { type: MatSort }
];
PblNgridMatSortDirective = __decorate([
    TablePlugin({ id: PLUGIN_KEY }),
    UnRx(),
    __metadata("design:paramtypes", [PblNgridComponent, PblNgridPluginController, MatSort])
], PblNgridMatSortDirective);
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridMatSortDirective.prototype._removePlugin;
    /** @type {?} */
    PblNgridMatSortDirective.prototype.table;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatSortDirective.prototype.pluginCtrl;
    /** @type {?} */
    PblNgridMatSortDirective.prototype.sort;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MatSortExtension extends PblNgridMultiComponentRegistry {
    /**
     * @param {?} cfr
     */
    constructor(cfr) {
        super();
        this.cfr = cfr;
        this.name = 'sortContainer';
        this.kind = 'dataHeaderExtensions';
        this.projectContent = true;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    shouldRender(context) {
        return !!context.col.sort && !!context.injector.get(MatSort, false);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    getFactory(context) {
        return this.cfr.resolveComponentFactory(MatSortHeader);
    }
    /**
     * @param {?} context
     * @param {?} cmpRef
     * @return {?}
     */
    onCreated(context, cmpRef) {
        // We assign the ID and also verify that it does not exist on the `MatSort` container
        // It might exists on specific scenarios when a header is removed and added instantly but the "add" part happens before the teardown so the `MatSort` will throw.
        this.deregisterId(context, cmpRef.instance.id = context.col.id);
        cmpRef.changeDetectorRef.markForCheck();
    }
    /**
     * Check that the current `MatSort` does not already have a sortable header with the provided id.
     * @private
     * @param {?} context
     * @param {?} id
     * @return {?}
     */
    deregisterId(context, id) {
        /** @type {?} */
        const matSort = context.injector.get(MatSort);
        /** @type {?} */
        const matSortHeader = matSort.sortables.get(id);
        if (matSortHeader) {
            matSort.deregister(matSortHeader);
        }
    }
}
if (false) {
    /** @type {?} */
    MatSortExtension.prototype.name;
    /** @type {?} */
    MatSortExtension.prototype.kind;
    /** @type {?} */
    MatSortExtension.prototype.projectContent;
    /**
     * @type {?}
     * @private
     */
    MatSortExtension.prototype.cfr;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PblNgridMatSortModule {
    /**
     * @param {?} registry
     * @param {?} cfr
     */
    constructor(registry, cfr) {
        this.registry = registry;
        registry.addMulti('dataHeaderExtensions', new MatSortExtension(cfr));
    }
}
PblNgridMatSortModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MatButtonModule, MatSortModule, PblNgridModule],
                declarations: [PblNgridMatSortDirective],
                exports: [PblNgridMatSortDirective, MatSortModule],
                entryComponents: [MatSortHeader],
            },] }
];
/** @nocollapse */
PblNgridMatSortModule.ctorParameters = () => [
    { type: PblNgridRegistryService },
    { type: ComponentFactoryResolver }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridMatSortModule.prototype.registry;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PblNgridMatSortDirective, PblNgridMatSortModule };
//# sourceMappingURL=pebula-ngrid-material-sort.js.map
