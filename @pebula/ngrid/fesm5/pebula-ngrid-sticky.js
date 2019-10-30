import { __values, __read, __decorate, __metadata } from 'tslib';
import { filter, first } from 'rxjs/operators';
import { IterableDiffers, Directive, Input, NgModule, Optional, SkipSelf } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController, TablePlugin, PblNgridModule, PblNgridConfigService } from '@pebula/ngrid';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var PLUGIN_KEY = 'sticky';
/**
 * @param {?} table
 * @param {?} type
 * @param {?} valueOrBulk
 * @param {?=} state
 * @return {?}
 */
function setStickyRow(table, type, valueOrBulk, state) {
    var e_1, _a;
    /** @type {?} */
    var isHeader = type === 'header';
    /** @type {?} */
    var queryList = isHeader ? table._headerRowDefs : table._footerRowDefs;
    /** @type {?} */
    var bulk = Array.isArray(valueOrBulk) ? valueOrBulk : [[valueOrBulk, state]];
    /** @type {?} */
    var addOneIfMainExists = (isHeader && table.showHeader) || (!isHeader && table.showFooter) ? 1 : 0;
    /** @type {?} */
    var changed;
    try {
        for (var bulk_1 = __values(bulk), bulk_1_1 = bulk_1.next(); !bulk_1_1.done; bulk_1_1 = bulk_1.next()) {
            var _b = __read(bulk_1_1.value, 2), value = _b[0], state_1 = _b[1];
            // the index from the user is 0 based or the table header/footer row.
            // we store them both, so we need to convert... our first is always the table header/footer and then we have the same order as the user's.
            /** @type {?} */
            var idx = value === 'table' ? 0 : value + addOneIfMainExists;
            if (!isHeader) {
                // sticky-styler stickRows() methods will reverse the order of footer columns
                // so we actually need to set another row to make the row we want sticky.
                // we could reverse the collection, but choosing the opposite side is better.
                // think [0, 1, 2, 3, 4] and we want 1. sticky-styler will reverse to [4, 3, 2, 1, 0] so doing nothing will stick 3.
                // the opposite is length MINUS 1 MINUS index which is 5 - 1 - 1 which is 3, in the revered array its the row 1 which is what we wanted.
                idx = (queryList.length - 1) - idx;
            }
            /** @type {?} */
            var rowDef = queryList.toArray()[idx];
            if (rowDef && rowDef.sticky !== state_1) {
                rowDef.sticky = state_1;
                changed = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (bulk_1_1 && !bulk_1_1.done && (_a = bulk_1.return)) _a.call(bulk_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (changed) {
        if (isHeader) {
            table._cdkTable.updateStickyHeaderRowStyles();
        }
        else {
            table._cdkTable.updateStickyFooterRowStyles();
        }
    }
}
/**
 * @param {?} table
 * @param {?} type
 * @param {?} valueOrBulk
 * @param {?=} state
 * @return {?}
 */
function setStickyColumns(table, type, valueOrBulk, state) {
    var e_2, _a;
    /** @type {?} */
    var bulk = Array.isArray(valueOrBulk) ? valueOrBulk : [[valueOrBulk, state]];
    /** @type {?} */
    var changed;
    var _loop_1 = function (columnId, state_2) {
        if (typeof columnId === 'string') {
            columnId = table.columnApi.visibleColumns.findIndex((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.orgProp === columnId; }));
        }
        /** @type {?} */
        var c = table.columnApi.visibleColumns[columnId];
        if (c) {
            changed = true;
            c.pin = state_2 ? type : undefined;
            if (type === 'end') {
                c.columnDef.stickyEnd = state_2;
                c.columnDef.sticky = false;
            }
            else {
                c.columnDef.sticky = state_2;
                c.columnDef.stickyEnd = false;
            }
        }
    };
    try {
        for (var bulk_2 = __values(bulk), bulk_2_1 = bulk_2.next(); !bulk_2_1.done; bulk_2_1 = bulk_2.next()) {
            var _b = __read(bulk_2_1.value, 2), columnId = _b[0], state_2 = _b[1];
            _loop_1(columnId, state_2);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (bulk_2_1 && !bulk_2_1.done && (_a = bulk_2.return)) _a.call(bulk_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    if (changed) {
        table._cdkTable.updateStickyColumnStyles();
    }
}
var PblNgridStickyPluginDirective = /** @class */ (function () {
    function PblNgridStickyPluginDirective(table, _differs, pluginCtrl) {
        var _this = this;
        this.table = table;
        this._differs = _differs;
        this.pluginCtrl = pluginCtrl;
        this._columnCache = { start: [], end: [] };
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        pluginCtrl.events
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.kind === 'onResizeRow'; })))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.table._cdkTable.updateStickyHeaderRowStyles();
            _this.table._cdkTable.updateStickyColumnStyles();
            _this.table._cdkTable.updateStickyFooterRowStyles();
        }));
        pluginCtrl.events
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.kind === 'onInvalidateHeaders'; })))
            .subscribe((/**
         * @return {?}
         */
        function () {
            if (_this._startDiffer && _this.table.isInit) {
                _this._startDiffer.diff([]);
                _this.applyColumnDiff('start', _this._columnCache.start, _this._startDiffer);
            }
            if (_this._endDiffer && _this.table.isInit) {
                _this._endDiffer.diff([]);
                _this.applyColumnDiff('end', _this._columnCache.end, _this._endDiffer);
            }
        }));
    }
    Object.defineProperty(PblNgridStickyPluginDirective.prototype, "stickyColumnStart", {
        /**
         * Set the header rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `table` - Literal string `table` that will set the table's main header row.
         *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
         *
         * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
         * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
         */
        set: /**
         * Set the header rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `table` - Literal string `table` that will set the table's main header row.
         *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
         *
         * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
         * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this._startDiffer) {
                this._startDiffer = this._differs.find([]).create();
            }
            this.applyColumnDiff('start', value, this._startDiffer);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridStickyPluginDirective.prototype, "stickyColumnEnd", {
        /**
         * Set the footer rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `table` - Literal string `table` that will set the table's main footer row.
         *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
         *
         * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
         * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
         */
        set: /**
         * Set the footer rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `table` - Literal string `table` that will set the table's main footer row.
         *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
         *
         * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
         * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this._endDiffer) {
                this._endDiffer = this._differs.find([]).create();
            }
            this.applyColumnDiff('end', value, this._endDiffer);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridStickyPluginDirective.prototype, "stickyHeader", {
        /**
       * Set the header rows you want to apply sticky positioning to.
       * Valid values are:
       *   - `table` - Literal string `table` that will set the table's main header row.
       *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
       *
       * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
       * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
       */
        set: /**
         * Set the header rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `table` - Literal string `table` that will set the table's main header row.
         *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
         *
         * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
         * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this._headerDiffer) {
                this._headerDiffer = this._differs.find([]).create();
            }
            this.applyRowDiff('header', value, this._headerDiffer);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridStickyPluginDirective.prototype, "stickyFooter", {
        /**
         * Set the footer rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `table` - Literal string `table` that will set the table's main footer row.
         *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
         *
         * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
         * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
         */
        set: /**
         * Set the footer rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `table` - Literal string `table` that will set the table's main footer row.
         *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
         *
         * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
         * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this._footerDiffer) {
                this._footerDiffer = this._differs.find([]).create();
            }
            this.applyRowDiff('footer', value, this._footerDiffer);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblNgridStickyPluginDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._removePlugin(this.table);
    };
    /**
     * @protected
     * @param {?} type
     * @param {?} value
     * @param {?} differ
     * @return {?}
     */
    PblNgridStickyPluginDirective.prototype.applyColumnDiff = /**
     * @protected
     * @param {?} type
     * @param {?} value
     * @param {?} differ
     * @return {?}
     */
    function (type, value, differ) {
        var _this = this;
        if (!this.table.isInit) {
            /** @type {?} */
            var unsub_1 = this.pluginCtrl.events.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event.kind === 'onInit') {
                    unsub_1.unsubscribe();
                    _this.applyColumnDiff(type, value, differ);
                }
            }));
            return;
        }
        this._columnCache[type] = value || [];
        /** @type {?} */
        var changes = differ.diff(value || []);
        /** @type {?} */
        var bulk = [];
        changes.forEachOperation((/**
         * @param {?} record
         * @param {?} prevIndex
         * @param {?} currentIndex
         * @return {?}
         */
        function (record, prevIndex, currentIndex) {
            if (record.previousIndex == null) {
                bulk.push([record.item, true]);
            }
            else if (currentIndex == null) {
                bulk.push([record.item, false]);
            }
        }));
        if (bulk.length > 0) {
            setStickyColumns(this.table, type, bulk);
        }
    };
    /**
     * @protected
     * @param {?} type
     * @param {?} value
     * @param {?} differ
     * @return {?}
     */
    PblNgridStickyPluginDirective.prototype.applyRowDiff = /**
     * @protected
     * @param {?} type
     * @param {?} value
     * @param {?} differ
     * @return {?}
     */
    function (type, value, differ) {
        var _this = this;
        if (!this.table.isInit) {
            /** @type {?} */
            var unsub_2 = this.pluginCtrl.events.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event.kind === 'onInit') {
                    unsub_2.unsubscribe();
                    _this.applyRowDiff(type, value, differ);
                }
            }));
            return;
        }
        /** @type {?} */
        var changes = differ.diff(value || []);
        /** @type {?} */
        var bulk = [];
        changes.forEachOperation((/**
         * @param {?} record
         * @param {?} prevIndex
         * @param {?} currentIndex
         * @return {?}
         */
        function (record, prevIndex, currentIndex) {
            if (record.previousIndex == null) {
                bulk.push([record.item, true]);
            }
            else if (currentIndex == null) {
                bulk.push([record.item, false]);
            }
        }));
        if (bulk.length > 0) {
            setStickyRow(this.table, type, bulk);
        }
    };
    PblNgridStickyPluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: IterableDiffers },
        { type: PblNgridPluginController }
    ]; };
    PblNgridStickyPluginDirective.decorators = [
        { type: Directive, args: [{ selector: 'pbl-ngrid[stickyColumnStart], pbl-ngrid[stickyColumnEnd], pbl-ngrid[stickyHeader], pbl-ngrid[stickyFooter]' },] }
    ];
    /** @nocollapse */
    PblNgridStickyPluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: IterableDiffers },
        { type: PblNgridPluginController }
    ]; };
    PblNgridStickyPluginDirective.propDecorators = {
        stickyColumnStart: [{ type: Input }],
        stickyColumnEnd: [{ type: Input }],
        stickyHeader: [{ type: Input }],
        stickyFooter: [{ type: Input }]
    };
    PblNgridStickyPluginDirective = __decorate([
        TablePlugin({ id: PLUGIN_KEY }),
        __metadata("design:paramtypes", [PblNgridComponent,
            IterableDiffers,
            PblNgridPluginController])
    ], PblNgridStickyPluginDirective);
    return PblNgridStickyPluginDirective;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._startDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._endDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._headerDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._footerDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._columnCache;
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._removePlugin;
    /**
     * @type {?}
     * @protected
     */
    PblNgridStickyPluginDirective.prototype.table;
    /**
     * @type {?}
     * @protected
     */
    PblNgridStickyPluginDirective.prototype._differs;
    /**
     * @type {?}
     * @protected
     */
    PblNgridStickyPluginDirective.prototype.pluginCtrl;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var MAPPER = (/**
 * @template T
 * @param {?} v
 * @return {?}
 */
function (v) { return [v, true]; });
var ɵ0 = MAPPER;
var PblNgridStickyModule = /** @class */ (function () {
    function PblNgridStickyModule(parentModule, configService) {
        if (parentModule) {
            return;
        }
        PblNgridPluginController.created
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var table = event.table, controller = event.controller;
            if (controller && !controller.hasPlugin('sticky')) {
                controller.events
                    .pipe(filter((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return e.kind === 'onInit'; })), first())
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    /** @type {?} */
                    var stickyPluginConfig = configService.get('stickyPlugin');
                    if (stickyPluginConfig) {
                        if (stickyPluginConfig.headers) {
                            setStickyRow(table, 'header', stickyPluginConfig.headers.map(MAPPER));
                        }
                        if (stickyPluginConfig.footers) {
                            setStickyRow(table, 'footer', stickyPluginConfig.footers.map(MAPPER));
                        }
                        if (stickyPluginConfig.columnStart) {
                            setStickyColumns(table, 'start', stickyPluginConfig.columnStart.map(MAPPER));
                        }
                        if (stickyPluginConfig.columnEnd) {
                            setStickyColumns(table, 'end', stickyPluginConfig.columnEnd.map(MAPPER));
                        }
                    }
                }));
            }
        }));
    }
    PblNgridStickyModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, CdkTableModule, PblNgridModule],
                    declarations: [PblNgridStickyPluginDirective],
                    exports: [PblNgridStickyPluginDirective],
                },] }
    ];
    /** @nocollapse */
    PblNgridStickyModule.ctorParameters = function () { return [
        { type: PblNgridStickyModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: PblNgridConfigService }
    ]; };
    return PblNgridStickyModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PblNgridStickyModule, setStickyColumns, setStickyRow, PLUGIN_KEY as ɵa, PblNgridStickyPluginDirective as ɵb };
//# sourceMappingURL=pebula-ngrid-sticky.js.map
