/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { PblMetaColumn } from './meta-column';
import { PblColumn } from './column';
import { PblColumnGroup, PblColumnGroupStore } from './group-column';
export class PblColumnFactory {
    constructor() {
        this._raw = { table: { cols: [] }, header: [], footer: [], headerGroup: [] };
        this._defaults = {
            table: (/** @type {?} */ ({})),
            header: (/** @type {?} */ ({})),
            footer: (/** @type {?} */ ({})),
        };
        this._currentHeaderRow = 0;
        this._currentFooterRow = 0;
    }
    /**
     * @return {?}
     */
    get currentHeaderRow() { return this._currentHeaderRow; }
    /**
     * @return {?}
     */
    get currentFooterRow() { return this._currentFooterRow; }
    /**
     * @param {?} defs
     * @return {?}
     */
    static fromDefinitionSet(defs) {
        /** @type {?} */
        const f = new PblColumnFactory();
        Object.assign(f._raw, defs);
        return f;
    }
    /**
     * @return {?}
     */
    build() {
        const { _defaults, _raw } = this;
        /** @type {?} */
        const groupStore = new PblColumnGroupStore();
        /** @type {?} */
        const table = {
            header: _raw.table.header,
            footer: _raw.table.footer,
            cols: _raw.table.cols.map((/**
             * @param {?} d
             * @return {?}
             */
            d => new PblColumn(Object.assign({}, _defaults.table, d), groupStore))),
        };
        /** @type {?} */
        const header = _raw.header.map((/**
         * @param {?} h
         * @return {?}
         */
        h => ({
            rowIndex: h.rowIndex,
            rowClassName: h.rowClassName,
            type: h.type || 'fixed',
            cols: h.cols.map((/**
             * @param {?} c
             * @return {?}
             */
            c => new PblMetaColumn(Object.assign({}, _defaults.header, c)))),
        })));
        /** @type {?} */
        const footer = _raw.footer.map((/**
         * @param {?} f
         * @return {?}
         */
        f => ({
            rowIndex: f.rowIndex,
            rowClassName: f.rowClassName,
            type: f.type || 'fixed',
            cols: f.cols.map((/**
             * @param {?} c
             * @return {?}
             */
            c => new PblMetaColumn(Object.assign({}, _defaults.footer, c))))
        })));
        /** @type {?} */
        const headerGroup = _raw.headerGroup.map((/**
         * @param {?} hg
         * @return {?}
         */
        hg => ({
            rowIndex: hg.rowIndex,
            rowClassName: hg.rowClassName,
            type: hg.type || 'fixed',
            cols: this.buildHeaderGroups(hg.rowIndex, hg.cols, table.cols).map((/**
             * @param {?} g
             * @return {?}
             */
            g => {
                groupStore.add(g);
                return g;
            })),
        })));
        return {
            groupStore,
            table,
            header,
            footer,
            headerGroup,
        };
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} def
     * @param {?=} type
     * @return {THIS}
     */
    default(def, type = 'table') {
        (/** @type {?} */ (this))._defaults[type] = def;
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {...?} defs
     * @return {THIS}
     */
    table(...defs) {
        /** @type {?} */
        const rowOptions = ((/** @type {?} */ (defs[0]))).prop ? {} : (/** @type {?} */ (defs.shift()));
        const { header, footer } = rowOptions;
        Object.assign((/** @type {?} */ (this))._raw.table, { header, footer });
        (/** @type {?} */ (this))._raw.table.cols.push(...(/** @type {?} */ (defs)));
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {...?} defs
     * @return {THIS}
     */
    header(...defs) {
        /** @type {?} */
        const rowIndex = (/** @type {?} */ (this))._currentHeaderRow++;
        /** @type {?} */
        const rowOptions = (/** @type {?} */ (this)).processRowOptions(defs);
        /** @type {?} */
        const rowClassName = (/** @type {?} */ (this)).genRowClass(rowOptions, rowIndex);
        /** @type {?} */
        const headers = defs.map((/**
         * @param {?} d
         * @return {?}
         */
        (d) => {
            /** @type {?} */
            const def = {
                id: d.id,
                kind: 'header',
                rowIndex
            };
            return Object.assign(def, d);
        }));
        (/** @type {?} */ (this))._raw.header.push({
            rowIndex,
            rowClassName,
            cols: headers,
            type: (rowOptions && rowOptions.type) || 'fixed',
        });
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {...?} defs
     * @return {THIS}
     */
    footer(...defs) {
        /** @type {?} */
        const rowIndex = (/** @type {?} */ (this))._currentFooterRow++;
        /** @type {?} */
        const rowOptions = (/** @type {?} */ (this)).processRowOptions(defs);
        /** @type {?} */
        const rowClassName = (/** @type {?} */ (this)).genRowClass(rowOptions, rowIndex);
        /** @type {?} */
        const footers = defs.map((/**
         * @param {?} d
         * @return {?}
         */
        (d) => {
            /** @type {?} */
            const def = {
                id: d.id,
                kind: 'footer',
                rowIndex
            };
            return Object.assign(def, d);
        }));
        (/** @type {?} */ (this))._raw.footer.push({
            rowIndex,
            rowClassName,
            cols: footers,
            type: (rowOptions && rowOptions.type) || 'fixed',
        });
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {...?} defs
     * @return {THIS}
     */
    headerGroup(...defs) {
        /** @type {?} */
        const rowIndex = (/** @type {?} */ (this))._currentHeaderRow++;
        /** @type {?} */
        const rowOptions = (/** @type {?} */ (this)).processRowOptions(defs, 'prop');
        /** @type {?} */
        const rowClassName = (/** @type {?} */ (this)).genRowClass(rowOptions, rowIndex);
        /** @type {?} */
        const headerGroups = defs.map((/**
         * @param {?} d
         * @return {?}
         */
        d => Object.assign({ rowIndex }, d)));
        (/** @type {?} */ (this))._raw.headerGroup.push({
            rowIndex,
            rowClassName,
            cols: headerGroups,
            type: (rowOptions && rowOptions.type) || 'fixed',
        });
        return (/** @type {?} */ (this));
    }
    /**
     * @private
     * @param {?} defs
     * @param {?=} mustHaveProperty
     * @return {?}
     */
    processRowOptions(defs, mustHaveProperty = 'id') {
        return defs[0][mustHaveProperty] ? undefined : defs.shift();
    }
    /**
     * @private
     * @param {?} rowOptions
     * @param {?} fallbackRowIndex
     * @return {?}
     */
    genRowClass(rowOptions, fallbackRowIndex) {
        return (rowOptions && rowOptions.rowClassName) || `pbl-ngrid-row-index-${fallbackRowIndex.toString()}`;
    }
    /**
     * @private
     * @param {?} rowIndex
     * @param {?} headerGroupDefs
     * @param {?} table
     * @return {?}
     */
    buildHeaderGroups(rowIndex, headerGroupDefs, table) {
        /** @type {?} */
        const headerGroup = [];
        // Building of header group rows requires some work.
        // The user defined groups might not cover all columns, creating gaps between group columns so we need to add placeholder groups to cover these gaps.
        // Moreover, the user might not specify a `prop`, which we might need to complete.
        // We do that for each header group row.
        //
        // The end goal is to return a list of `PblColumnGroup` that span over the entire columns of the grid.
        //
        // The logic is as follows:
        // For each column in the grid, find a matching column group - a group pointing at the column by having the same `prop`
        // If found, check it's span and skip X amount of columns where X is the span.
        // If a span is not defined then treat it as a greedy group that spans over all columns ahead until the next column that has a matching group column.
        //
        // If a column does not have a matching group column, search for group columns without a `prop` specified and when found set their `prop` to the current
        // column so we will now use them as if it's a user provided group for this column...
        //
        // If no group columns exists (or left), we create an ad-hoc group column and we will now use them as if it's a user provided group for this column...
        //
        /** @type {?} */
        const tableDefs = table.slice();
        /** @type {?} */
        const defs = headerGroupDefs.slice();
        for (let i = 0, len = tableDefs.length; i < len; i++) {
            /** @type {?} */
            const orgProp = tableDefs[i].orgProp;
            /** @type {?} */
            const idx = defs.findIndex((/**
             * @param {?} d
             * @return {?}
             */
            d => d.prop === orgProp));
            /** @type {?} */
            const columnGroupDef = idx !== -1
                ? defs.splice(idx, 1)[0]
                : defs.find((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => !d.prop)) || { prop: orgProp, rowIndex, span: undefined };
            /** @type {?} */
            const placeholder = idx === -1 && !!columnGroupDef.prop;
            columnGroupDef.prop = orgProp;
            columnGroupDef.rowIndex = rowIndex;
            /** @type {?} */
            let take = columnGroupDef.span;
            if (!(take >= 0)) {
                take = 0;
                for (let z = i + 1; z < len; z++) {
                    if (defs.findIndex((/**
                     * @param {?} d
                     * @return {?}
                     */
                    d => d.prop === tableDefs[z].orgProp)) === -1) {
                        take++;
                    }
                    else {
                        break;
                    }
                }
            }
            columnGroupDef.span = take;
            /** @type {?} */
            const group = new PblColumnGroup(columnGroupDef, tableDefs.slice(i, i + take + 1), placeholder);
            headerGroup.push(group);
            i += take;
        }
        return headerGroup;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblColumnFactory.prototype._raw;
    /**
     * @type {?}
     * @private
     */
    PblColumnFactory.prototype._defaults;
    /**
     * @type {?}
     * @private
     */
    PblColumnFactory.prototype._currentHeaderRow;
    /**
     * @type {?}
     * @private
     */
    PblColumnFactory.prototype._currentFooterRow;
}
/**
 * @return {?}
 */
export function columnFactory() {
    return new PblColumnFactory();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2x1bW5zL2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJckUsTUFBTSxPQUFPLGdCQUFnQjtJQUE3QjtRQUNVLFNBQUksR0FBZ0MsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUNyRyxjQUFTLEdBQUc7WUFDbEIsS0FBSyxFQUFFLG1CQUFBLEVBQUUsRUFBZ0M7WUFDekMsTUFBTSxFQUFFLG1CQUFBLEVBQUUsRUFBb0M7WUFDOUMsTUFBTSxFQUFFLG1CQUFBLEVBQUUsRUFBb0M7U0FDL0MsQ0FBQztRQUVNLHNCQUFpQixHQUFHLENBQUMsQ0FBQztRQUN0QixzQkFBaUIsR0FBRyxDQUFDLENBQUM7SUE2UmhDLENBQUM7Ozs7SUEzUkMsSUFBSSxnQkFBZ0IsS0FBYSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7SUFDakUsSUFBSSxnQkFBZ0IsS0FBYSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRWpFLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFpQzs7Y0FDbEQsQ0FBQyxHQUFHLElBQUksZ0JBQWdCLEVBQUU7UUFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxDQUFD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SSxHQUFHLElBQUksQ0FBQzs7a0JBQ3JCLEtBQUssR0FBRyxJQUFJLGNBQWMsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUM7WUFDL0YsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixDQUFDLElBQUksSUFBSSxDQUFDO1NBQ1g7UUFFRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0NBQ0Y7Ozs7OztJQXJTQyxnQ0FBNkc7Ozs7O0lBQzdHLHFDQUlFOzs7OztJQUVGLDZDQUE4Qjs7Ozs7SUFDOUIsNkNBQThCOzs7OztBQStSaEMsTUFBTSxVQUFVLGFBQWE7SUFDM0IsT0FBTyxJQUFJLGdCQUFnQixFQUFFLENBQUE7QUFDL0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFBibEJhc2VDb2x1bW5EZWZpbml0aW9uLFxuICBQYmxDb2x1bW5EZWZpbml0aW9uLFxuICBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24sXG4gIFBibE1ldGFDb2x1bW5EZWZpbml0aW9uLFxuICBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQsXG4gIFBibE5ncmlkQ29sdW1uU2V0LFxuICBQYmxNZXRhUm93RGVmaW5pdGlvbnNcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxNZXRhQ29sdW1uIH0gZnJvbSAnLi9tZXRhLWNvbHVtbic7XG5pbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuL2NvbHVtbic7XG5pbXBvcnQgeyBQYmxDb2x1bW5Hcm91cCwgUGJsQ29sdW1uR3JvdXBTdG9yZSB9IGZyb20gJy4vZ3JvdXAtY29sdW1uJztcblxuZXhwb3J0IHR5cGUgQ09MVU1OID0gUGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbiB8IFBibENvbHVtbkdyb3VwO1xuXG5leHBvcnQgY2xhc3MgUGJsQ29sdW1uRmFjdG9yeSB7XG4gIHByaXZhdGUgX3JhdzogUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0ID0geyB0YWJsZTogeyBjb2xzOiBbXSB9LCBoZWFkZXI6IFtdLCBmb290ZXI6IFtdLCBoZWFkZXJHcm91cDogW10gfTtcbiAgcHJpdmF0ZSBfZGVmYXVsdHMgPSB7XG4gICAgdGFibGU6IHt9IGFzIFBhcnRpYWw8UGJsQ29sdW1uRGVmaW5pdGlvbj4sXG4gICAgaGVhZGVyOiB7fSBhcyBQYXJ0aWFsPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uPixcbiAgICBmb290ZXI6IHt9IGFzIFBhcnRpYWw8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24+LFxuICB9O1xuXG4gIHByaXZhdGUgX2N1cnJlbnRIZWFkZXJSb3cgPSAwO1xuICBwcml2YXRlIF9jdXJyZW50Rm9vdGVyUm93ID0gMDtcblxuICBnZXQgY3VycmVudEhlYWRlclJvdygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY3VycmVudEhlYWRlclJvdzsgfVxuICBnZXQgY3VycmVudEZvb3RlclJvdygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY3VycmVudEZvb3RlclJvdzsgfVxuXG4gIHN0YXRpYyBmcm9tRGVmaW5pdGlvblNldChkZWZzOiBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQpOiBQYmxDb2x1bW5GYWN0b3J5IHtcbiAgICBjb25zdCBmID0gbmV3IFBibENvbHVtbkZhY3RvcnkoKTtcbiAgICBPYmplY3QuYXNzaWduKGYuX3JhdywgZGVmcyk7XG4gICAgcmV0dXJuIGY7XG4gIH1cblxuICBidWlsZCgpOiBQYmxOZ3JpZENvbHVtblNldCB7XG4gICAgY29uc3QgeyBfZGVmYXVsdHMsIF9yYXcgfSA9IHRoaXM7XG5cbiAgICBjb25zdCBncm91cFN0b3JlID0gbmV3IFBibENvbHVtbkdyb3VwU3RvcmUoKTtcblxuICAgIGNvbnN0IHRhYmxlOiBQYmxOZ3JpZENvbHVtblNldFsndGFibGUnXSA9IHtcbiAgICAgIGhlYWRlcjogX3Jhdy50YWJsZS5oZWFkZXIsXG4gICAgICBmb290ZXI6IF9yYXcudGFibGUuZm9vdGVyLFxuICAgICAgY29sczogX3Jhdy50YWJsZS5jb2xzLm1hcCggZCA9PiBuZXcgUGJsQ29sdW1uKHsgLi4uX2RlZmF1bHRzLnRhYmxlLCAuLi5kIH0sIGdyb3VwU3RvcmUpKSxcbiAgICB9O1xuICAgIGNvbnN0IGhlYWRlciA9IF9yYXcuaGVhZGVyLm1hcCggaCA9PiAoe1xuICAgICAgcm93SW5kZXg6IGgucm93SW5kZXgsXG4gICAgICByb3dDbGFzc05hbWU6IGgucm93Q2xhc3NOYW1lLFxuICAgICAgdHlwZTogaC50eXBlIHx8ICdmaXhlZCcsXG4gICAgICBjb2xzOiBoLmNvbHMubWFwKCBjID0+IG5ldyBQYmxNZXRhQ29sdW1uKCB7IC4uLl9kZWZhdWx0cy5oZWFkZXIsIC4uLmMgfSApKSxcbiAgICB9KSk7XG4gICAgY29uc3QgZm9vdGVyID0gX3Jhdy5mb290ZXIubWFwKCBmID0+ICh7XG4gICAgICByb3dJbmRleDogZi5yb3dJbmRleCxcbiAgICAgIHJvd0NsYXNzTmFtZTogZi5yb3dDbGFzc05hbWUsXG4gICAgICB0eXBlOiBmLnR5cGUgfHwgJ2ZpeGVkJyxcbiAgICAgIGNvbHM6IGYuY29scy5tYXAoIGMgPT4gbmV3IFBibE1ldGFDb2x1bW4oeyAuLi5fZGVmYXVsdHMuZm9vdGVyLCAuLi5jIH0pIClcbiAgICB9KSk7XG4gICAgY29uc3QgaGVhZGVyR3JvdXAgPSBfcmF3LmhlYWRlckdyb3VwLm1hcCggaGcgPT4gKHtcbiAgICAgIHJvd0luZGV4OiBoZy5yb3dJbmRleCxcbiAgICAgIHJvd0NsYXNzTmFtZTogaGcucm93Q2xhc3NOYW1lLFxuICAgICAgdHlwZTogaGcudHlwZSB8fCAnZml4ZWQnLFxuICAgICAgY29sczogdGhpcy5idWlsZEhlYWRlckdyb3VwcyhoZy5yb3dJbmRleCwgaGcuY29scywgdGFibGUuY29scykubWFwKCBnID0+IHtcbiAgICAgICAgZ3JvdXBTdG9yZS5hZGQoZyk7XG4gICAgICAgIHJldHVybiBnO1xuICAgICAgfSksXG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGdyb3VwU3RvcmUsXG4gICAgICB0YWJsZSxcbiAgICAgIGhlYWRlcixcbiAgICAgIGZvb3RlcixcbiAgICAgIGhlYWRlckdyb3VwLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBkZWZhdWx0IGNvbHVtbiBkZWZpbml0aW9uIGZvciBoZWFkZXIvZm9vdGVyIGNvbHVtbnMuXG4gICAqL1xuICBkZWZhdWx0KGRlZjogUGFydGlhbDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbj4sIHR5cGU6ICdoZWFkZXInIHwgJ2Zvb3RlcicpOiB0aGlzO1xuICAvKipcbiAgICogU2V0IHRoZSBkZWZhdWx0IGNvbHVtbiBkZWZpbml0aW9uIGZvciB0YWJsZSBjb2x1bW5zLlxuICAgKi9cbiAgZGVmYXVsdChkZWY6IFBhcnRpYWw8UGJsQ29sdW1uRGVmaW5pdGlvbj4sIHR5cGU/OiAndGFibGUnKTogdGhpcztcbiAgZGVmYXVsdChkZWY6IFBhcnRpYWw8UGJsQ29sdW1uRGVmaW5pdGlvbj4gfCBQYXJ0aWFsPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uPiwgdHlwZTogJ3RhYmxlJyB8ICdoZWFkZXInIHwgJ2Zvb3RlcicgPSAndGFibGUnKTogdGhpcyB7XG4gICAgdGhpcy5fZGVmYXVsdHNbdHlwZV0gPSBkZWY7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGdyaWQgY29sdW1ucy5cbiAgICpcbiAgICogVGFibGUgY29sdW1ucyBhcmUgbWFuZGF0b3J5LCB0aGV5IGFyZSB0aGUgY29sdW1ucyB0aGF0IGRlZmluZSB0aGUgc3RydWN0dXJlIG9mIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogRWFjaCBjb2x1bW4gd2lsbCB1c3VhbGx5IHBvaW50IHRvIHByb3BlcnR5IG9uIHRoZSByb3csIGFsdGhvdWdoIHlvdSBjYW4gY3JlYXRlIGNvbHVtbnMgdGhhdCBkb2VzIG5vdFxuICAgKiBleGlzdCBvbiB0aGUgcm93IGFuZCBoYW5kbGUgdGhlaXIgcmVuZGVyaW5nIHdpdGggYSBjZWxsIHRlbXBsYXRlLlxuICAgKlxuICAgKiBFYWNoIGdyaWQgY29sdW1uIGlzIGFsc28gYSBoZWFkZXIgY29sdW1uIGFuZCBhIGZvb3RlciBjb2x1bW4gdGhhdCBkaXNwbGF5LlxuICAgKiBUaGUgaGVhZGVyIGFuZCBmb290ZXIgYXJlIGF1dG9tYXRpY2FsbHkgY3JlYXRlZCwgSWYgeW91IHdpc2ggbm90IHRvIHNob3cgdGhlbSBzZXQgaGVhZGVyUm93L2Zvb3RlclJvdyB0byBmYWxzZSBpbiBQYmxUYWJsZS5cbiAgICpcbiAgICovXG4gIHRhYmxlKHJvd09wdGlvbnM6IHsgaGVhZGVyPzogUGJsTWV0YVJvd0RlZmluaXRpb25zOyBmb290ZXI/OiBQYmxNZXRhUm93RGVmaW5pdGlvbnMgfSwgLi4uZGVmczogUGJsQ29sdW1uRGVmaW5pdGlvbltdKTogdGhpcztcbiAgdGFibGUoLi4uZGVmczogUGJsQ29sdW1uRGVmaW5pdGlvbltdKTogdGhpcztcbiAgdGFibGUoLi4uZGVmczogQXJyYXk8eyBoZWFkZXI/OiBQYmxNZXRhUm93RGVmaW5pdGlvbnM7IGZvb3Rlcj86IFBibE1ldGFSb3dEZWZpbml0aW9ucyB9IHwgUGJsQ29sdW1uRGVmaW5pdGlvbj4pOiB0aGlzIHtcbiAgICBjb25zdCByb3dPcHRpb25zOiB7IGhlYWRlcj86IFBibE1ldGFSb3dEZWZpbml0aW9uczsgZm9vdGVyPzogUGJsTWV0YVJvd0RlZmluaXRpb25zIH0gPSAoZGVmc1swXSBhcyBhbnkpLnByb3AgPyB7fSA6IGRlZnMuc2hpZnQoKSBhcyBhbnk7XG4gICAgY29uc3QgeyBoZWFkZXIsIGZvb3RlciB9ID0gcm93T3B0aW9ucztcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuX3Jhdy50YWJsZSwgeyBoZWFkZXIsIGZvb3RlciB9KTtcbiAgICB0aGlzLl9yYXcudGFibGUuY29scy5wdXNoKC4uLmRlZnMgYXMgUGJsQ29sdW1uRGVmaW5pdGlvbltdKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaGVhZGVyIHJvdyB3aXRoIGhlYWRlciBjb2x1bW5zLlxuICAgKiBDcmVhdGVzIGFuIGFkZGl0aW9uYWwgaGVhZGVyIHJvdyBpbiBwb3NpdGlvbiBgY3VycmVudEhlYWRlclJvd2AgdXNpbmcgdGhlIHByb3ZpZGVkIGhlYWRlciBjb2x1bW4gZGVmaW5pdGlvbnMuXG4gICAqIEVhY2ggZGVmaW5pdGlvbiByZXByZXNlbnQgYSBjZWxsLCB0aGUgY2VsbCdzIGRvZXMgbm90IGhhdmUgdG8gYWxpZ24gd2l0aCB0aGUgbGF5b3V0IG9mIGdyaWQgY29sdW1ucy5cbiAgICpcbiAgICogQWxsIGhlYWRlciByb3cgd2lsbCBwb3NpdGlvbiBCRUZPUkUgdGhlIGdyaWQgY29sdW1uIGhlYWRlciByb3cuXG4gICAqIEhlYWRlciBjb2x1bW5zIGFyZSBvcHRpb25hbC5cbiAgICogRWFjaCBjYWxsIHRvIGBoZWFkZXIoKWAgd2lsbCBjcmVhdGUgYSBuZXcgcm93LCBpbmNyZW1lbnRpbmcgdGhlIGBjdXJyZW50SGVhZGVyUm93YC5cbiAgICpcbiAgICogQHJlbWFya3NcbiAgICogRXhhbXBsZTpcbiAgICogYGBganNcbiAgICogICBmYWN0b3J5LnRhYmxlKDEsIDIsIDMpXG4gICAqICAgICAuaGVhZGVyKGEsIGIsIGMpLmhlYWRlcihkLCBlLCBmKTtcbiAgICogYGBgXG4gICAqXG4gICAqIHdpbGwgcmVzdWx0IGluOlxuICAgKiAgIGhlYWRlcjEgLVxcPiAgYSBiIGNcbiAgICogICBoZWFkZXIyIC1cXD4gIGQgZSBmXG4gICAqICAgdGFibGUgICAtXFw+ICAxIDIgM1xuICAgKi9cbiAgaGVhZGVyKHJvd09wdGlvbnM6IFBibE1ldGFSb3dEZWZpbml0aW9ucywgLi4uZGVmczogQXJyYXk8UGljazxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiwgJ2lkJz4gJiBQYXJ0aWFsPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uPiAmIFBibEJhc2VDb2x1bW5EZWZpbml0aW9uPik6IHRoaXM7XG4gIGhlYWRlciguLi5kZWZzOiBBcnJheTxQaWNrPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uLCAnaWQnPiAmIFBhcnRpYWw8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24+ICYgUGJsQmFzZUNvbHVtbkRlZmluaXRpb24+KTogdGhpcztcbiAgaGVhZGVyKC4uLmRlZnM6IEFycmF5PFBibE1ldGFSb3dEZWZpbml0aW9ucyB8IFBpY2s8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24sICdpZCc+ICYgUGFydGlhbDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbj4gJiBQYmxCYXNlQ29sdW1uRGVmaW5pdGlvbj4pOiB0aGlzIHtcbiAgICBjb25zdCByb3dJbmRleCA9IHRoaXMuX2N1cnJlbnRIZWFkZXJSb3crKztcbiAgICBjb25zdCByb3dPcHRpb25zID0gdGhpcy5wcm9jZXNzUm93T3B0aW9ucyhkZWZzKTtcbiAgICBjb25zdCByb3dDbGFzc05hbWUgPSB0aGlzLmdlblJvd0NsYXNzKHJvd09wdGlvbnMsIHJvd0luZGV4KTtcblxuICAgIGNvbnN0IGhlYWRlcnMgPSBkZWZzLm1hcCggKGQ6IFBpY2s8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24sICdpZCc+ICYgUGFydGlhbDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbj4gJiBQYmxCYXNlQ29sdW1uRGVmaW5pdGlvbikgPT4ge1xuICAgICAgY29uc3QgZGVmOiBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiA9IHtcbiAgICAgICAgaWQ6IGQuaWQsXG4gICAgICAgIGtpbmQ6ICdoZWFkZXInLFxuICAgICAgICByb3dJbmRleFxuICAgICAgfTtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGRlZiwgZCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9yYXcuaGVhZGVyLnB1c2goe1xuICAgICAgcm93SW5kZXgsXG4gICAgICByb3dDbGFzc05hbWUsXG4gICAgICBjb2xzOiBoZWFkZXJzLFxuICAgICAgdHlwZTogKHJvd09wdGlvbnMgJiYgcm93T3B0aW9ucy50eXBlKSB8fCAnZml4ZWQnLFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIG5ldyBmb290ZXIgcm93IHdpdGggZm9vdGVyIGNvbHVtbnMuXG4gICAqIENyZWF0ZXMgYW4gYWRkaXRpb25hbCBmb290ZXIgcm93IGluIHBvc2l0aW9uIGBjdXJyZW50Rm9vdGVyUm93YCB1c2luZyB0aGUgcHJvdmlkZWQgZm9vdGVyIGNvbHVtbiBkZWZpbml0aW9ucy5cbiAgICogRWFjaCBkZWZpbml0aW9uIHJlcHJlc2VudCBhIGNlbGwsIHRoZSBjZWxsJ3MgZG9lcyBub3QgaGF2ZSB0byBhbGlnbiB3aXRoIHRoZSBsYXlvdXQgb2YgZ3JpZCBjb2x1bW5zLlxuICAgKlxuICAgKiBBbGwgZm9vdGVyIHJvdyB3aWxsIHBvc2l0aW9uIEFGVEVSIHRoZSBncmlkIGNvbHVtbiBmb290ZXIgcm93LlxuICAgKiBGb290ZXIgY29sdW1ucyBhcmUgb3B0aW9uYWwuXG4gICAqIEVhY2ggY2FsbCB0byBgZm9vdGVyKClgIHdpbGwgY3JlYXRlIGEgbmV3IHJvdywgaW5jcmVtZW50aW5nIHRoZSBgY3VycmVudEZvb3RlclJvd2AuXG4gICAqXG4gICAqIEByZW1hcmtzXG4gICAqIEV4YW1wbGU6XG4gICAqIGBgYGpzXG4gICAqICAgZmFjdG9yeS50YWJsZSgxLCAyLCAzKVxuICAgKiAgICAgLmZvb3RlcihhLCBiLCBjKS5mb290ZXIoZCwgZSwgZik7XG4gICAqIGBgYFxuICAgKlxuICAgKiB3aWxsIHJlc3VsdCBpbjpcbiAgICogICB0YWJsZSAgIC1cXD4gIDEgMiAzXG4gICAqICAgZm9vdGVyMSAtXFw+ICBhIGIgY1xuICAgKiAgIGZvb3RlcjIgLVxcPiAgZCBlIGZcbiAgICovXG4gIGZvb3Rlcihyb3dPcHRpb25zOiBQYmxNZXRhUm93RGVmaW5pdGlvbnMsIC4uLmRlZnM6IEFycmF5PFBpY2s8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24sICdpZCc+ICYgUGFydGlhbDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbj4gJiBQYmxCYXNlQ29sdW1uRGVmaW5pdGlvbj4pOiB0aGlzO1xuICBmb290ZXIoLi4uZGVmczogQXJyYXk8UGljazxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiwgJ2lkJz4gJiBQYXJ0aWFsPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uPiAmIFBibEJhc2VDb2x1bW5EZWZpbml0aW9uPik6IHRoaXM7XG4gIGZvb3RlciguLi5kZWZzOiBBcnJheTxQYmxNZXRhUm93RGVmaW5pdGlvbnMgfCBQaWNrPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uLCAnaWQnPiAmIFBhcnRpYWw8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24+ICYgUGJsQmFzZUNvbHVtbkRlZmluaXRpb24+KTogdGhpcyB7XG4gICAgY29uc3Qgcm93SW5kZXggPSB0aGlzLl9jdXJyZW50Rm9vdGVyUm93Kys7XG4gICAgY29uc3Qgcm93T3B0aW9ucyA9IHRoaXMucHJvY2Vzc1Jvd09wdGlvbnMoZGVmcyk7XG4gICAgY29uc3Qgcm93Q2xhc3NOYW1lID0gdGhpcy5nZW5Sb3dDbGFzcyhyb3dPcHRpb25zLCByb3dJbmRleCk7XG5cbiAgICBjb25zdCBmb290ZXJzID0gZGVmcy5tYXAoIChkOiBQaWNrPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uLCAnaWQnPiAmIFBhcnRpYWw8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24+ICYgUGJsQmFzZUNvbHVtbkRlZmluaXRpb24pID0+IHtcbiAgICAgIGNvbnN0IGRlZjogUGJsTWV0YUNvbHVtbkRlZmluaXRpb24gPSB7XG4gICAgICAgIGlkOiBkLmlkLFxuICAgICAgICBraW5kOiAnZm9vdGVyJyxcbiAgICAgICAgcm93SW5kZXhcbiAgICAgIH07XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihkZWYsIGQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fcmF3LmZvb3Rlci5wdXNoKHtcbiAgICAgIHJvd0luZGV4LFxuICAgICAgcm93Q2xhc3NOYW1lLFxuICAgICAgY29sczogZm9vdGVycyxcbiAgICAgIHR5cGU6IChyb3dPcHRpb25zICYmIHJvd09wdGlvbnMudHlwZSkgfHwgJ2ZpeGVkJyxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaGVhZGVyIHJvdyB3aXRoIGhlYWRlciBncm91cCBjb2x1bW5zLlxuICAgKiBBIGhlYWRlciBncm91cCBjb2x1bW4gaXMgYSBjb2x1bW5zIGlzIGEgaGVhZGVyIGNvbHVtbnMgdGhhdCBzcGFucyBvbmUgb3IgbW9yZSBjb2x1bW5zLlxuICAgKlxuICAgKiBDcmVhdGUgYW4gYWRkaXRpb25hbCBoZWFkZXIgcm93IGluIHBvc2l0aW9uIGBjdXJyZW50SGVhZGVyUm93YCB1c2luZyB0aGUgcHJvdmlkZWQgaGVhZGVyIGNvbHVtbiBkZWZpbml0aW9ucy5cbiAgICogRWFjaCBkZWZpbml0aW9uIHJlcHJlc2VudCBhIGNlbGwsIHRoZSBjZWxsJ3MgZG9lcyBub3QgaGF2ZSB0byBhbGlnbiB3aXRoIHRoZSBsYXlvdXQgb2YgZ3JpZCBjb2x1bW5zLlxuICAgKlxuICAgKiBBbGwgaGVhZGVyIHJvdyB3aWxsIHBvc2l0aW9uIEJFRk9SRSB0aGUgZ3JpZCBjb2x1bW4gaGVhZGVyIHJvdy5cbiAgICogSGVhZGVyIGNvbHVtbnMgYXJlIG9wdGlvbmFsLlxuICAgKiBFYWNoIGNhbGwgdG8gYGhlYWRlcigpYCB3aWxsIGNyZWF0ZSBhIG5ldyByb3csIGluY3JlbWVudGluZyB0aGUgYGN1cnJlbnRIZWFkZXJSb3dgLlxuICAgKlxuICAgKiBAcmVtYXJrc1xuICAgKiBFeGFtcGxlOlxuICAgKiBgYGBqc1xuICAgKiAgIGZhY3RvcnkudGFibGUoMSwgMiwgMylcbiAgICogICAgIC5oZWFkZXIoYSwgYiwgYykuaGVhZGVyKGQsIGUsIGYpO1xuICAgKiBgYGBcbiAgICpcbiAgICogd2lsbCByZXN1bHQgaW46XG4gICAqICAgaGVhZGVyMSAtXFw+ICBhIGIgY1xuICAgKiAgIGhlYWRlcjIgLVxcPiAgZCBlIGZcbiAgICogICB0YWJsZSAgIC1cXD4gIDEgMiAzXG4gICAqL1xuICBoZWFkZXJHcm91cChyb3dPcHRpb25zOiBQYmxNZXRhUm93RGVmaW5pdGlvbnMsIC4uLmRlZnM6IEFycmF5PFBpY2s8UGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uLCAncHJvcCc+ICYgUGFydGlhbDxQYmxDb2x1bW5Hcm91cERlZmluaXRpb24+Pik6IHRoaXM7XG4gIGhlYWRlckdyb3VwKC4uLmRlZnM6IEFycmF5PFBpY2s8UGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uLCAncHJvcCc+ICYgUGFydGlhbDxQYmxDb2x1bW5Hcm91cERlZmluaXRpb24+Pik6IHRoaXM7XG4gIGhlYWRlckdyb3VwKC4uLmRlZnM6IEFycmF5PFBibE1ldGFSb3dEZWZpbml0aW9ucyB8ICggUGljazxQYmxDb2x1bW5Hcm91cERlZmluaXRpb24sICdwcm9wJz4gJiBQYXJ0aWFsPFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbj4pID4pOiB0aGlzIHtcbiAgICBjb25zdCByb3dJbmRleCA9IHRoaXMuX2N1cnJlbnRIZWFkZXJSb3crKztcbiAgICBjb25zdCByb3dPcHRpb25zID0gdGhpcy5wcm9jZXNzUm93T3B0aW9ucyhkZWZzLCAncHJvcCcpO1xuICAgIGNvbnN0IHJvd0NsYXNzTmFtZSA9IHRoaXMuZ2VuUm93Q2xhc3Mocm93T3B0aW9ucywgcm93SW5kZXgpO1xuXG4gICAgY29uc3QgaGVhZGVyR3JvdXBzOiBhbnkgPSBkZWZzLm1hcCggZCA9PiBPYmplY3QuYXNzaWduKHsgcm93SW5kZXggfSwgZCkgKTtcblxuICAgIHRoaXMuX3Jhdy5oZWFkZXJHcm91cC5wdXNoKHtcbiAgICAgIHJvd0luZGV4LFxuICAgICAgcm93Q2xhc3NOYW1lLFxuICAgICAgY29sczogaGVhZGVyR3JvdXBzLFxuICAgICAgdHlwZTogKHJvd09wdGlvbnMgJiYgcm93T3B0aW9ucy50eXBlKSB8fCAnZml4ZWQnLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwcml2YXRlIHByb2Nlc3NSb3dPcHRpb25zKGRlZnM6IGFueVtdLCBtdXN0SGF2ZVByb3BlcnR5OiBzdHJpbmcgPSAnaWQnKTogUGJsTWV0YVJvd0RlZmluaXRpb25zIHtcbiAgICByZXR1cm4gZGVmc1swXVttdXN0SGF2ZVByb3BlcnR5XSA/IHVuZGVmaW5lZCA6IGRlZnMuc2hpZnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuUm93Q2xhc3Mocm93T3B0aW9uczogeyByb3dDbGFzc05hbWU/OiBzdHJpbmcgfSwgZmFsbGJhY2tSb3dJbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHJvd09wdGlvbnMgJiYgcm93T3B0aW9ucy5yb3dDbGFzc05hbWUpIHx8IGBwYmwtbmdyaWQtcm93LWluZGV4LSR7ZmFsbGJhY2tSb3dJbmRleC50b1N0cmluZygpfWA7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkSGVhZGVyR3JvdXBzKHJvd0luZGV4OiBudW1iZXIsIGhlYWRlckdyb3VwRGVmczogUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uW10sIHRhYmxlOiBQYmxDb2x1bW5bXSk6IFBibENvbHVtbkdyb3VwW10ge1xuICAgIGNvbnN0IGhlYWRlckdyb3VwOiBQYmxDb2x1bW5Hcm91cFtdID0gW107XG5cbiAgICAvLyBCdWlsZGluZyBvZiBoZWFkZXIgZ3JvdXAgcm93cyByZXF1aXJlcyBzb21lIHdvcmsuXG4gICAgLy8gVGhlIHVzZXIgZGVmaW5lZCBncm91cHMgbWlnaHQgbm90IGNvdmVyIGFsbCBjb2x1bW5zLCBjcmVhdGluZyBnYXBzIGJldHdlZW4gZ3JvdXAgY29sdW1ucyBzbyB3ZSBuZWVkIHRvIGFkZCBwbGFjZWhvbGRlciBncm91cHMgdG8gY292ZXIgdGhlc2UgZ2Fwcy5cbiAgICAvLyBNb3Jlb3ZlciwgdGhlIHVzZXIgbWlnaHQgbm90IHNwZWNpZnkgYSBgcHJvcGAsIHdoaWNoIHdlIG1pZ2h0IG5lZWQgdG8gY29tcGxldGUuXG4gICAgLy8gV2UgZG8gdGhhdCBmb3IgZWFjaCBoZWFkZXIgZ3JvdXAgcm93LlxuICAgIC8vXG4gICAgLy8gVGhlIGVuZCBnb2FsIGlzIHRvIHJldHVybiBhIGxpc3Qgb2YgYFBibENvbHVtbkdyb3VwYCB0aGF0IHNwYW4gb3ZlciB0aGUgZW50aXJlIGNvbHVtbnMgb2YgdGhlIGdyaWQuXG4gICAgLy9cbiAgICAvLyBUaGUgbG9naWMgaXMgYXMgZm9sbG93czpcbiAgICAvLyBGb3IgZWFjaCBjb2x1bW4gaW4gdGhlIGdyaWQsIGZpbmQgYSBtYXRjaGluZyBjb2x1bW4gZ3JvdXAgLSBhIGdyb3VwIHBvaW50aW5nIGF0IHRoZSBjb2x1bW4gYnkgaGF2aW5nIHRoZSBzYW1lIGBwcm9wYFxuICAgIC8vIElmIGZvdW5kLCBjaGVjayBpdCdzIHNwYW4gYW5kIHNraXAgWCBhbW91bnQgb2YgY29sdW1ucyB3aGVyZSBYIGlzIHRoZSBzcGFuLlxuICAgIC8vIElmIGEgc3BhbiBpcyBub3QgZGVmaW5lZCB0aGVuIHRyZWF0IGl0IGFzIGEgZ3JlZWR5IGdyb3VwIHRoYXQgc3BhbnMgb3ZlciBhbGwgY29sdW1ucyBhaGVhZCB1bnRpbCB0aGUgbmV4dCBjb2x1bW4gdGhhdCBoYXMgYSBtYXRjaGluZyBncm91cCBjb2x1bW4uXG4gICAgLy9cbiAgICAvLyBJZiBhIGNvbHVtbiBkb2VzIG5vdCBoYXZlIGEgbWF0Y2hpbmcgZ3JvdXAgY29sdW1uLCBzZWFyY2ggZm9yIGdyb3VwIGNvbHVtbnMgd2l0aG91dCBhIGBwcm9wYCBzcGVjaWZpZWQgYW5kIHdoZW4gZm91bmQgc2V0IHRoZWlyIGBwcm9wYCB0byB0aGUgY3VycmVudFxuICAgIC8vIGNvbHVtbiBzbyB3ZSB3aWxsIG5vdyB1c2UgdGhlbSBhcyBpZiBpdCdzIGEgdXNlciBwcm92aWRlZCBncm91cCBmb3IgdGhpcyBjb2x1bW4uLi5cbiAgICAvL1xuICAgIC8vIElmIG5vIGdyb3VwIGNvbHVtbnMgZXhpc3RzIChvciBsZWZ0KSwgd2UgY3JlYXRlIGFuIGFkLWhvYyBncm91cCBjb2x1bW4gYW5kIHdlIHdpbGwgbm93IHVzZSB0aGVtIGFzIGlmIGl0J3MgYSB1c2VyIHByb3ZpZGVkIGdyb3VwIGZvciB0aGlzIGNvbHVtbi4uLlxuICAgIC8vXG4gICAgY29uc3QgdGFibGVEZWZzID0gdGFibGUuc2xpY2UoKTtcbiAgICBjb25zdCBkZWZzID0gaGVhZGVyR3JvdXBEZWZzLnNsaWNlKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGFibGVEZWZzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBvcmdQcm9wID0gdGFibGVEZWZzW2ldLm9yZ1Byb3A7XG4gICAgICBjb25zdCBpZHggPSBkZWZzLmZpbmRJbmRleCggZCA9PiBkLnByb3AgPT09IG9yZ1Byb3ApO1xuICAgICAgY29uc3QgY29sdW1uR3JvdXBEZWY6IFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbiA9IGlkeCAhPT0gLTFcbiAgICAgICAgPyBkZWZzLnNwbGljZShpZHgsIDEpWzBdXG4gICAgICAgIDogZGVmcy5maW5kKCBkID0+ICFkLnByb3AgKSB8fCB7IHByb3A6IG9yZ1Byb3AsIHJvd0luZGV4LCBzcGFuOiB1bmRlZmluZWQgfVxuICAgICAgO1xuXG4gICAgICBjb25zdCBwbGFjZWhvbGRlciA9IGlkeCA9PT0gLTEgJiYgISFjb2x1bW5Hcm91cERlZi5wcm9wO1xuXG4gICAgICBjb2x1bW5Hcm91cERlZi5wcm9wID0gb3JnUHJvcDtcbiAgICAgIGNvbHVtbkdyb3VwRGVmLnJvd0luZGV4ID0gcm93SW5kZXg7XG5cbiAgICAgIGxldCB0YWtlID0gY29sdW1uR3JvdXBEZWYuc3BhbjtcbiAgICAgIGlmICghICh0YWtlID49IDApICkge1xuICAgICAgICB0YWtlID0gMDtcbiAgICAgICAgZm9yIChsZXQgeiA9IGkrMTsgeiA8IGxlbjsgeisrKSB7XG4gICAgICAgICAgaWYgKGRlZnMuZmluZEluZGV4KCBkID0+IGQucHJvcCA9PT0gdGFibGVEZWZzW3pdLm9yZ1Byb3ApID09PSAtMSkge1xuICAgICAgICAgICAgdGFrZSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29sdW1uR3JvdXBEZWYuc3BhbiA9IHRha2U7XG4gICAgICBjb25zdCBncm91cCA9IG5ldyBQYmxDb2x1bW5Hcm91cChjb2x1bW5Hcm91cERlZiwgdGFibGVEZWZzLnNsaWNlKGksIGkgKyB0YWtlICsgMSksIHBsYWNlaG9sZGVyKTtcbiAgICAgIGhlYWRlckdyb3VwLnB1c2goZ3JvdXApO1xuICAgICAgaSArPSB0YWtlO1xuICAgIH1cblxuICAgIHJldHVybiBoZWFkZXJHcm91cDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sdW1uRmFjdG9yeSgpOiBQYmxDb2x1bW5GYWN0b3J5IHtcbiAgcmV0dXJuIG5ldyBQYmxDb2x1bW5GYWN0b3J5KClcbn1cbiJdfQ==