import { __decorate, __metadata, __extends } from 'tslib';
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
var PLUGIN_KEY = 'matSort';
var PblNgridMatSortDirective = /** @class */ (function () {
    function PblNgridMatSortDirective(table, pluginCtrl, sort) {
        var _this = this;
        this.table = table;
        this.pluginCtrl = pluginCtrl;
        this.sort = sort;
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        /** @type {?} */
        var origin = 'click';
        this.sort.sortChange
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            _this.onSort(s, origin);
            origin = 'click';
        }));
        pluginCtrl.events
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (e.kind === 'onInvalidateHeaders') {
                if (table.ds && !table.ds.sort.column) {
                    if (_this.sort && _this.sort.active) {
                        _this.onSort({ active: _this.sort.active, direction: _this.sort.direction || 'asc' }, origin);
                    }
                }
            }
            if (e.kind === 'onDataSource') {
                UnRx.kill(_this, e.prev);
                if (_this.sort && _this.sort.active) {
                    _this.onSort({ active: _this.sort.active, direction: _this.sort.direction || 'asc' }, origin);
                }
                table.ds.sortChange
                    .pipe(UnRx(_this, e.curr))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (_this.sort && event.column) {
                        /** @type {?} */
                        var _sort = event.sort || {};
                        if (_this.sort.active === event.column.id && _this.sort.direction === (_sort.order || '')) {
                            return;
                        }
                        /** @type {?} */
                        var sortable = (/** @type {?} */ (_this.sort.sortables.get(event.column.id)));
                        if (sortable) {
                            origin = 'ds';
                            _this.sort.active = undefined;
                            sortable.start = _sort.order || 'asc';
                            sortable._handleClick();
                        }
                    }
                    else if (_this.sort.active) { // clear mode (hit from code, not click).
                        // clear mode (hit from code, not click).
                        /** @type {?} */
                        var sortable = (/** @type {?} */ (_this.sort.sortables.get(_this.sort.active)));
                        if (sortable) {
                            if (!sortable.disableClear) {
                                /** @type {?} */
                                var nextSortDir = void 0;
                                while (nextSortDir = _this.sort.getNextSortDirection(sortable)) {
                                    _this.sort.direction = nextSortDir;
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
    PblNgridMatSortDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._removePlugin(this.table);
    };
    /**
     * @private
     * @param {?} sort
     * @param {?} origin
     * @return {?}
     */
    PblNgridMatSortDirective.prototype.onSort = /**
     * @private
     * @param {?} sort
     * @param {?} origin
     * @return {?}
     */
    function (sort, origin) {
        /** @type {?} */
        var table = this.table;
        /** @type {?} */
        var column = table.columnApi.visibleColumns.find((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.id === sort.active; }));
        if (origin !== 'click' || !column || !column.sort) {
            return;
        }
        else {
            /** @type {?} */
            var newSort = {};
            /** @type {?} */
            var sortFn = typeof column.sort === 'function' && column.sort;
            if (sort.direction) {
                newSort.order = sort.direction;
            }
            if (sortFn) {
                newSort.sortFn = sortFn;
            }
            /** @type {?} */
            var currentSort = table.ds.sort;
            if (column === currentSort.column) {
                /** @type {?} */
                var _sort = currentSort.sort || {};
                if (newSort.order === _sort.order) {
                    return;
                }
            }
            table.ds.setSort(column, newSort);
        }
    };
    PblNgridMatSortDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: PblNgridPluginController },
        { type: MatSort }
    ]; };
    PblNgridMatSortDirective.decorators = [
        { type: Directive, args: [{ selector: 'pbl-ngrid[matSort]', exportAs: 'pblMatSort' },] }
    ];
    /** @nocollapse */
    PblNgridMatSortDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: PblNgridPluginController },
        { type: MatSort }
    ]; };
    PblNgridMatSortDirective = __decorate([
        TablePlugin({ id: PLUGIN_KEY }),
        UnRx(),
        __metadata("design:paramtypes", [PblNgridComponent, PblNgridPluginController, MatSort])
    ], PblNgridMatSortDirective);
    return PblNgridMatSortDirective;
}());
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
var MatSortExtension = /** @class */ (function (_super) {
    __extends(MatSortExtension, _super);
    function MatSortExtension(cfr) {
        var _this = _super.call(this) || this;
        _this.cfr = cfr;
        _this.name = 'sortContainer';
        _this.kind = 'dataHeaderExtensions';
        _this.projectContent = true;
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    MatSortExtension.prototype.shouldRender = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return !!context.col.sort && !!context.injector.get(MatSort, false);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    MatSortExtension.prototype.getFactory = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return this.cfr.resolveComponentFactory(MatSortHeader);
    };
    /**
     * @param {?} context
     * @param {?} cmpRef
     * @return {?}
     */
    MatSortExtension.prototype.onCreated = /**
     * @param {?} context
     * @param {?} cmpRef
     * @return {?}
     */
    function (context, cmpRef) {
        // We assign the ID and also verify that it does not exist on the `MatSort` container
        // It might exists on specific scenarios when a header is removed and added instantly but the "add" part happens before the teardown so the `MatSort` will throw.
        this.deregisterId(context, cmpRef.instance.id = context.col.id);
        cmpRef.changeDetectorRef.markForCheck();
    };
    /**
     * Check that the current `MatSort` does not already have a sortable header with the provided id.
     */
    /**
     * Check that the current `MatSort` does not already have a sortable header with the provided id.
     * @private
     * @param {?} context
     * @param {?} id
     * @return {?}
     */
    MatSortExtension.prototype.deregisterId = /**
     * Check that the current `MatSort` does not already have a sortable header with the provided id.
     * @private
     * @param {?} context
     * @param {?} id
     * @return {?}
     */
    function (context, id) {
        /** @type {?} */
        var matSort = context.injector.get(MatSort);
        /** @type {?} */
        var matSortHeader = matSort.sortables.get(id);
        if (matSortHeader) {
            matSort.deregister(matSortHeader);
        }
    };
    return MatSortExtension;
}(PblNgridMultiComponentRegistry));
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
var PblNgridMatSortModule = /** @class */ (function () {
    function PblNgridMatSortModule(registry, cfr) {
        this.registry = registry;
        registry.addMulti('dataHeaderExtensions', new MatSortExtension(cfr));
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
    PblNgridMatSortModule.ctorParameters = function () { return [
        { type: PblNgridRegistryService },
        { type: ComponentFactoryResolver }
    ]; };
    return PblNgridMatSortModule;
}());
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
