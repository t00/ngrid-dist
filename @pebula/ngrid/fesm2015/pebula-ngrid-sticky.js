import { filter, first } from 'rxjs/operators';
import { Directive, IterableDiffers, Input, NgModule, Optional, SkipSelf } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController, ngridPlugin, PblNgridModule, PblNgridConfigService } from '@pebula/ngrid';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/sticky/sticky-plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PLUGIN_KEY = 'sticky';
/**
 * @param {?} grid
 * @param {?} type
 * @param {?} valueOrBulk
 * @param {?=} state
 * @return {?}
 */
function setStickyRow(grid, type, valueOrBulk, state) {
    /** @type {?} */
    const isHeader = type === 'header';
    /** @type {?} */
    const queryList = isHeader ? grid._headerRowDefs : grid._footerRowDefs;
    /** @type {?} */
    const bulk = Array.isArray(valueOrBulk) ? valueOrBulk : [[valueOrBulk, state]];
    /** @type {?} */
    const addOneIfMainExists = (isHeader && grid.showHeader) || (!isHeader && grid.showFooter) ? 1 : 0;
    /** @type {?} */
    let changed;
    for (const [value, state] of bulk) {
        // the index from the user is 0 based or the grid header/footer row.
        // we store them both, so we need to convert... our first is always the grid header/footer and then we have the same order as the user's.
        /** @type {?} */
        let idx = value === 'table' ? 0 : value + addOneIfMainExists;
        if (!isHeader) {
            // sticky-styler stickRows() methods will reverse the order of footer columns
            // so we actually need to set another row to make the row we want sticky.
            // we could reverse the collection, but choosing the opposite side is better.
            // think [0, 1, 2, 3, 4] and we want 1. sticky-styler will reverse to [4, 3, 2, 1, 0] so doing nothing will stick 3.
            // the opposite is length MINUS 1 MINUS index which is 5 - 1 - 1 which is 3, in the revered array its the row 1 which is what we wanted.
            idx = (queryList.length - 1) - idx;
        }
        /** @type {?} */
        const rowDef = queryList.toArray()[idx];
        if (rowDef && rowDef.sticky !== state) {
            rowDef.sticky = state;
            changed = true;
        }
    }
    if (changed) {
        if (isHeader) {
            grid._cdkTable.updateStickyHeaderRowStyles();
        }
        else {
            grid._cdkTable.updateStickyFooterRowStyles();
        }
    }
}
/**
 * @param {?} grid
 * @param {?} type
 * @param {?} valueOrBulk
 * @param {?=} state
 * @return {?}
 */
function setStickyColumns(grid, type, valueOrBulk, state) {
    /** @type {?} */
    const bulk = Array.isArray(valueOrBulk) ? valueOrBulk : [[valueOrBulk, state]];
    /** @type {?} */
    let changed;
    for (let [columnId, state] of bulk) {
        if (typeof columnId === 'string') {
            columnId = grid.columnApi.visibleColumns.findIndex((/**
             * @param {?} c
             * @return {?}
             */
            c => c.orgProp === columnId));
        }
        /** @type {?} */
        const c = grid.columnApi.visibleColumns[columnId];
        if (c) {
            changed = true;
            c.pin = state ? type : undefined;
            if (type === 'end') {
                c.columnDef.stickyEnd = state;
                c.columnDef.sticky = false;
            }
            else {
                c.columnDef.sticky = state;
                c.columnDef.stickyEnd = false;
            }
        }
    }
    if (changed) {
        grid._cdkTable.updateStickyColumnStyles();
    }
}
class PblNgridStickyPluginDirective {
    /**
     * @param {?} grid
     * @param {?} _differs
     * @param {?} pluginCtrl
     */
    constructor(grid, _differs, pluginCtrl) {
        this.grid = grid;
        this._differs = _differs;
        this.pluginCtrl = pluginCtrl;
        this._columnCache = { start: [], end: [] };
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        pluginCtrl.events
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => e.kind === 'onResizeRow')))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.grid._cdkTable.updateStickyHeaderRowStyles();
            this.grid._cdkTable.updateStickyColumnStyles();
            this.grid._cdkTable.updateStickyFooterRowStyles();
        }));
        pluginCtrl.events
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => e.kind === 'onInvalidateHeaders')))
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (this._startDiffer && this.grid.isInit) {
                this._startDiffer.diff([]);
                this.applyColumnDiff('start', this._columnCache.start, this._startDiffer);
            }
            if (this._endDiffer && this.grid.isInit) {
                this._endDiffer.diff([]);
                this.applyColumnDiff('end', this._columnCache.end, this._endDiffer);
            }
        }));
    }
    /**
     * Set the header rows you want to apply sticky positioning to.
     * Valid values are:
     *   - `grid` - Literal string `grid` that will set the grid's main header row.
     *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
     *
     * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
     * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
     * @param {?} value
     * @return {?}
     */
    set stickyColumnStart(value) {
        if (!this._startDiffer) {
            this._startDiffer = this._differs.find([]).create();
        }
        this.applyColumnDiff('start', value, this._startDiffer);
    }
    /**
     * Set the footer rows you want to apply sticky positioning to.
     * Valid values are:
     *   - `grid` - Literal string `grid` that will set the grid's main footer row.
     *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
     *
     * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
     * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
     * @param {?} value
     * @return {?}
     */
    set stickyColumnEnd(value) {
        if (!this._endDiffer) {
            this._endDiffer = this._differs.find([]).create();
        }
        this.applyColumnDiff('end', value, this._endDiffer);
    }
    /**
     * Set the header rows you want to apply sticky positioning to.
     * Valid values are:
     *   - `grid` - Literal string `grid` that will set the grid's main header row.
     *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
     *
     * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
     * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
     * @param {?} value
     * @return {?}
     */
    set stickyHeader(value) {
        if (!this._headerDiffer) {
            this._headerDiffer = this._differs.find([]).create();
        }
        this.applyRowDiff('header', value, this._headerDiffer);
    }
    /**
     * Set the footer rows you want to apply sticky positioning to.
     * Valid values are:
     *   - `grid` - Literal string `grid` that will set the grid's main footer row.
     *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
     *
     * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
     * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
     * @param {?} value
     * @return {?}
     */
    set stickyFooter(value) {
        if (!this._footerDiffer) {
            this._footerDiffer = this._differs.find([]).create();
        }
        this.applyRowDiff('footer', value, this._footerDiffer);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._removePlugin(this.grid);
    }
    /**
     * @protected
     * @param {?} type
     * @param {?} value
     * @param {?} differ
     * @return {?}
     */
    applyColumnDiff(type, value, differ) {
        if (!this.grid.isInit) {
            /** @type {?} */
            const unsub = this.pluginCtrl.events.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            event => {
                if (event.kind === 'onInit') {
                    unsub.unsubscribe();
                    this.applyColumnDiff(type, value, differ);
                }
            }));
            return;
        }
        this._columnCache[type] = value || [];
        /** @type {?} */
        const changes = differ.diff(value || []);
        /** @type {?} */
        const bulk = [];
        changes.forEachOperation((/**
         * @param {?} record
         * @param {?} prevIndex
         * @param {?} currentIndex
         * @return {?}
         */
        (record, prevIndex, currentIndex) => {
            if (record.previousIndex == null) {
                bulk.push([record.item, true]);
            }
            else if (currentIndex == null) {
                bulk.push([record.item, false]);
            }
        }));
        if (bulk.length > 0) {
            setStickyColumns(this.grid, type, bulk);
        }
    }
    /**
     * @protected
     * @param {?} type
     * @param {?} value
     * @param {?} differ
     * @return {?}
     */
    applyRowDiff(type, value, differ) {
        if (!this.grid.isInit) {
            /** @type {?} */
            const unsub = this.pluginCtrl.events.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            event => {
                if (event.kind === 'onInit') {
                    unsub.unsubscribe();
                    this.applyRowDiff(type, value, differ);
                }
            }));
            return;
        }
        /** @type {?} */
        const changes = differ.diff(value || []);
        /** @type {?} */
        const bulk = [];
        changes.forEachOperation((/**
         * @param {?} record
         * @param {?} prevIndex
         * @param {?} currentIndex
         * @return {?}
         */
        (record, prevIndex, currentIndex) => {
            if (record.previousIndex == null) {
                bulk.push([record.item, true]);
            }
            else if (currentIndex == null) {
                bulk.push([record.item, false]);
            }
        }));
        if (bulk.length > 0) {
            setStickyRow(this.grid, type, bulk);
        }
    }
}
PblNgridStickyPluginDirective.decorators = [
    { type: Directive, args: [{ selector: 'pbl-ngrid[stickyColumnStart], pbl-ngrid[stickyColumnEnd], pbl-ngrid[stickyHeader], pbl-ngrid[stickyFooter]' },] }
];
/** @nocollapse */
PblNgridStickyPluginDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: IterableDiffers },
    { type: PblNgridPluginController }
];
PblNgridStickyPluginDirective.propDecorators = {
    stickyColumnStart: [{ type: Input }],
    stickyColumnEnd: [{ type: Input }],
    stickyHeader: [{ type: Input }],
    stickyFooter: [{ type: Input }]
};
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
    PblNgridStickyPluginDirective.prototype.grid;
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
 * Generated from: lib/sticky.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MAPPER = (/**
 * @template T
 * @param {?} v
 * @return {?}
 */
(v) => [v, true]);
const ɵ0 = MAPPER;
class PblNgridStickyModule {
    /**
     * @param {?} parentModule
     * @param {?} configService
     */
    constructor(parentModule, configService) {
        if (parentModule) {
            return;
        }
        PblNgridPluginController.created
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            const { table, controller } = event;
            if (controller && !controller.hasPlugin('sticky')) {
                controller.events
                    .pipe(filter((/**
                 * @param {?} e
                 * @return {?}
                 */
                e => e.kind === 'onInit')), first())
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                event => {
                    /** @type {?} */
                    const stickyPluginConfig = configService.get('stickyPlugin');
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
}
PblNgridStickyModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridStickyPluginDirective);
PblNgridStickyModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, CdkTableModule, PblNgridModule],
                declarations: [PblNgridStickyPluginDirective],
                exports: [PblNgridStickyPluginDirective],
            },] }
];
/** @nocollapse */
PblNgridStickyModule.ctorParameters = () => [
    { type: PblNgridStickyModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: PblNgridConfigService }
];
if (false) {
    /** @type {?} */
    PblNgridStickyModule.NGRID_PLUGIN;
}

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: pebula-ngrid-sticky.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PblNgridStickyModule, setStickyColumns, setStickyRow, PLUGIN_KEY as ɵa, PblNgridStickyPluginDirective as ɵb };
//# sourceMappingURL=pebula-ngrid-sticky.js.map
