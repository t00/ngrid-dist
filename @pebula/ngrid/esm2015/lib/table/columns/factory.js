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
        // The end goal is to return a list of `PblColumnGroup` that span over the entire columns of the table.
        //
        // The logic is as follows:
        // For each column in the table, find a matching column group - a group pointing at the column by having the same `prop`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvY29sdW1ucy9mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFTQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXJFLE1BQU0sT0FBTyxnQkFBZ0I7SUFBN0I7UUFDVSxTQUFJLEdBQWdDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDckcsY0FBUyxHQUFHO1lBQ2xCLEtBQUssRUFBRSxtQkFBQSxFQUFFLEVBQWdDO1lBQ3pDLE1BQU0sRUFBRSxtQkFBQSxFQUFFLEVBQW9DO1lBQzlDLE1BQU0sRUFBRSxtQkFBQSxFQUFFLEVBQW9DO1NBQy9DLENBQUM7UUFFTSxzQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDdEIsc0JBQWlCLEdBQUcsQ0FBQyxDQUFDO0lBNlJoQyxDQUFDOzs7O0lBM1JDLElBQUksZ0JBQWdCLEtBQWEsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7O0lBQ2pFLElBQUksZ0JBQWdCLEtBQWEsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7OztJQUVqRSxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBaUM7O2NBQ2xELENBQUMsR0FBRyxJQUFJLGdCQUFnQixFQUFFO1FBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7SUFFRCxLQUFLO2NBQ0csRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSTs7Y0FFMUIsVUFBVSxHQUFHLElBQUksbUJBQW1CLEVBQUU7O2NBRXRDLEtBQUssR0FBK0I7WUFDeEMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUN6QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQ3pCLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1lBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFNBQVMsbUJBQU0sU0FBUyxDQUFDLEtBQUssRUFBSyxDQUFDLEdBQUksVUFBVSxDQUFDLEVBQUM7U0FDekY7O2NBQ0ssTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRzs7OztRQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVE7WUFDcEIsWUFBWSxFQUFFLENBQUMsQ0FBQyxZQUFZO1lBQzVCLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLE9BQU87WUFDdkIsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztZQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxhQUFhLG1CQUFPLFNBQVMsQ0FBQyxNQUFNLEVBQUssQ0FBQyxFQUFJLEVBQUM7U0FDM0UsQ0FBQyxFQUFDOztjQUNHLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRO1lBQ3BCLFlBQVksRUFBRSxDQUFDLENBQUMsWUFBWTtZQUM1QixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxPQUFPO1lBQ3ZCLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7WUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksYUFBYSxtQkFBTSxTQUFTLENBQUMsTUFBTSxFQUFLLENBQUMsRUFBRyxFQUFFO1NBQzFFLENBQUMsRUFBQzs7Y0FDRyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHOzs7O1FBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUTtZQUNyQixZQUFZLEVBQUUsRUFBRSxDQUFDLFlBQVk7WUFDN0IsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksT0FBTztZQUN4QixJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRzs7OztZQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUN0RSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixPQUFPLENBQUMsQ0FBQztZQUNYLENBQUMsRUFBQztTQUNILENBQUMsRUFBQztRQUVILE9BQU87WUFDTCxVQUFVO1lBQ1YsS0FBSztZQUNMLE1BQU07WUFDTixNQUFNO1lBQ04sV0FBVztTQUNaLENBQUM7SUFDSixDQUFDOzs7Ozs7OztJQVVELE9BQU8sQ0FBQyxHQUFvRSxFQUFFLE9BQXNDLE9BQU87UUFDekgsbUJBQUEsSUFBSSxFQUFBLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUMzQixPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7OztJQWdCRCxLQUFLLENBQUMsR0FBRyxJQUFxRzs7Y0FDdEcsVUFBVSxHQUF1RSxDQUFDLG1CQUFBLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBTztjQUNqSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxVQUFVO1FBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsbUJBQUEsSUFBSSxFQUFBLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELG1CQUFBLElBQUksRUFBQSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLG1CQUFBLElBQUksRUFBeUIsQ0FBQyxDQUFDO1FBQzVELE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDZCxDQUFDOzs7Ozs7O0lBeUJELE1BQU0sQ0FBQyxHQUFHLElBQXFJOztjQUN2SSxRQUFRLEdBQUcsbUJBQUEsSUFBSSxFQUFBLENBQUMsaUJBQWlCLEVBQUU7O2NBQ25DLFVBQVUsR0FBRyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7O2NBQ3pDLFlBQVksR0FBRyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQzs7Y0FFckQsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHOzs7O1FBQUUsQ0FBQyxDQUFtRyxFQUFFLEVBQUU7O2tCQUMxSCxHQUFHLEdBQTRCO2dCQUNuQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUTthQUNUO1lBQ0QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvQixDQUFDLEVBQUM7UUFFRixtQkFBQSxJQUFJLEVBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNwQixRQUFRO1lBQ1IsWUFBWTtZQUNaLElBQUksRUFBRSxPQUFPO1lBQ2IsSUFBSSxFQUFFLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPO1NBQ2pELENBQUMsQ0FBQztRQUNILE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDZCxDQUFDOzs7Ozs7O0lBeUJELE1BQU0sQ0FBQyxHQUFHLElBQXFJOztjQUN2SSxRQUFRLEdBQUcsbUJBQUEsSUFBSSxFQUFBLENBQUMsaUJBQWlCLEVBQUU7O2NBQ25DLFVBQVUsR0FBRyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7O2NBQ3pDLFlBQVksR0FBRyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQzs7Y0FFckQsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHOzs7O1FBQUUsQ0FBQyxDQUFtRyxFQUFFLEVBQUU7O2tCQUMxSCxHQUFHLEdBQTRCO2dCQUNuQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUTthQUNUO1lBQ0QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvQixDQUFDLEVBQUM7UUFFRixtQkFBQSxJQUFJLEVBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNwQixRQUFRO1lBQ1IsWUFBWTtZQUNaLElBQUksRUFBRSxPQUFPO1lBQ2IsSUFBSSxFQUFFLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPO1NBQ2pELENBQUMsQ0FBQztRQUNILE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDZCxDQUFDOzs7Ozs7O0lBMkJELFdBQVcsQ0FBQyxHQUFHLElBQW1IOztjQUMxSCxRQUFRLEdBQUcsbUJBQUEsSUFBSSxFQUFBLENBQUMsaUJBQWlCLEVBQUU7O2NBQ25DLFVBQVUsR0FBRyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDOztjQUNqRCxZQUFZLEdBQUcsbUJBQUEsSUFBSSxFQUFBLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUM7O2NBRXJELFlBQVksR0FBUSxJQUFJLENBQUMsR0FBRzs7OztRQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBRXpFLG1CQUFBLElBQUksRUFBQSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ3pCLFFBQVE7WUFDUixZQUFZO1lBQ1osSUFBSSxFQUFFLFlBQVk7WUFDbEIsSUFBSSxFQUFFLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPO1NBQ2pELENBQUMsQ0FBQztRQUVILE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDZCxDQUFDOzs7Ozs7O0lBRU8saUJBQWlCLENBQUMsSUFBVyxFQUFFLG1CQUEyQixJQUFJO1FBQ3BFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlELENBQUM7Ozs7Ozs7SUFFTyxXQUFXLENBQUMsVUFBcUMsRUFBRSxnQkFBd0I7UUFDakYsT0FBTyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksdUJBQXVCLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7SUFDekcsQ0FBQzs7Ozs7Ozs7SUFFTyxpQkFBaUIsQ0FBQyxRQUFnQixFQUFFLGVBQTJDLEVBQUUsS0FBa0I7O2NBQ25HLFdBQVcsR0FBcUIsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztjQW1CbEMsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUU7O2NBQ3pCLElBQUksR0FBRyxlQUFlLENBQUMsS0FBSyxFQUFFO1FBRXBDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2tCQUM5QyxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87O2tCQUM5QixHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVM7Ozs7WUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFDOztrQkFDOUMsY0FBYyxHQUE2QixHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUN6RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUk7Ozs7Z0JBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7O2tCQUd2RSxXQUFXLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSTtZQUV2RCxjQUFjLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztZQUM5QixjQUFjLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzs7Z0JBRS9CLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSTtZQUM5QixJQUFJLENBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUc7Z0JBQ2xCLElBQUksR0FBRyxDQUFDLENBQUM7Z0JBQ1QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzlCLElBQUksSUFBSSxDQUFDLFNBQVM7Ozs7b0JBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDaEUsSUFBSSxFQUFFLENBQUM7cUJBQ1I7eUJBQ0k7d0JBQ0gsTUFBTTtxQkFDUDtpQkFDRjthQUNGO1lBQ0QsY0FBYyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O2tCQUNyQixLQUFLLEdBQUcsSUFBSSxjQUFjLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDO1lBQy9GLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsQ0FBQyxJQUFJLElBQUksQ0FBQztTQUNYO1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztDQUNGOzs7Ozs7SUFyU0MsZ0NBQTZHOzs7OztJQUM3RyxxQ0FJRTs7Ozs7SUFFRiw2Q0FBOEI7Ozs7O0lBQzlCLDZDQUE4Qjs7Ozs7QUErUmhDLE1BQU0sVUFBVSxhQUFhO0lBQzNCLE9BQU8sSUFBSSxnQkFBZ0IsRUFBRSxDQUFBO0FBQy9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBQYmxCYXNlQ29sdW1uRGVmaW5pdGlvbixcbiAgUGJsQ29sdW1uRGVmaW5pdGlvbixcbiAgUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uLFxuICBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbixcbiAgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0LFxuICBQYmxOZ3JpZENvbHVtblNldCxcbiAgUGJsTWV0YVJvd0RlZmluaXRpb25zXG59IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsTWV0YUNvbHVtbiB9IGZyb20gJy4vbWV0YS1jb2x1bW4nO1xuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsQ29sdW1uR3JvdXAsIFBibENvbHVtbkdyb3VwU3RvcmUgfSBmcm9tICcuL2dyb3VwLWNvbHVtbic7XG5cbmV4cG9ydCB0eXBlIENPTFVNTiA9IFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW4gfCBQYmxDb2x1bW5Hcm91cDtcblxuZXhwb3J0IGNsYXNzIFBibENvbHVtbkZhY3Rvcnkge1xuICBwcml2YXRlIF9yYXc6IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCA9IHsgdGFibGU6IHsgY29sczogW10gfSwgaGVhZGVyOiBbXSwgZm9vdGVyOiBbXSwgaGVhZGVyR3JvdXA6IFtdIH07XG4gIHByaXZhdGUgX2RlZmF1bHRzID0ge1xuICAgIHRhYmxlOiB7fSBhcyBQYXJ0aWFsPFBibENvbHVtbkRlZmluaXRpb24+LFxuICAgIGhlYWRlcjoge30gYXMgUGFydGlhbDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbj4sXG4gICAgZm9vdGVyOiB7fSBhcyBQYXJ0aWFsPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uPixcbiAgfTtcblxuICBwcml2YXRlIF9jdXJyZW50SGVhZGVyUm93ID0gMDtcbiAgcHJpdmF0ZSBfY3VycmVudEZvb3RlclJvdyA9IDA7XG5cbiAgZ2V0IGN1cnJlbnRIZWFkZXJSb3coKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2N1cnJlbnRIZWFkZXJSb3c7IH1cbiAgZ2V0IGN1cnJlbnRGb290ZXJSb3coKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2N1cnJlbnRGb290ZXJSb3c7IH1cblxuICBzdGF0aWMgZnJvbURlZmluaXRpb25TZXQoZGVmczogUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0KTogUGJsQ29sdW1uRmFjdG9yeSB7XG4gICAgY29uc3QgZiA9IG5ldyBQYmxDb2x1bW5GYWN0b3J5KCk7XG4gICAgT2JqZWN0LmFzc2lnbihmLl9yYXcsIGRlZnMpO1xuICAgIHJldHVybiBmO1xuICB9XG5cbiAgYnVpbGQoKTogUGJsTmdyaWRDb2x1bW5TZXQge1xuICAgIGNvbnN0IHsgX2RlZmF1bHRzLCBfcmF3IH0gPSB0aGlzO1xuXG4gICAgY29uc3QgZ3JvdXBTdG9yZSA9IG5ldyBQYmxDb2x1bW5Hcm91cFN0b3JlKCk7XG5cbiAgICBjb25zdCB0YWJsZTogUGJsTmdyaWRDb2x1bW5TZXRbJ3RhYmxlJ10gPSB7XG4gICAgICBoZWFkZXI6IF9yYXcudGFibGUuaGVhZGVyLFxuICAgICAgZm9vdGVyOiBfcmF3LnRhYmxlLmZvb3RlcixcbiAgICAgIGNvbHM6IF9yYXcudGFibGUuY29scy5tYXAoIGQgPT4gbmV3IFBibENvbHVtbih7IC4uLl9kZWZhdWx0cy50YWJsZSwgLi4uZCB9LCBncm91cFN0b3JlKSksXG4gICAgfTtcbiAgICBjb25zdCBoZWFkZXIgPSBfcmF3LmhlYWRlci5tYXAoIGggPT4gKHtcbiAgICAgIHJvd0luZGV4OiBoLnJvd0luZGV4LFxuICAgICAgcm93Q2xhc3NOYW1lOiBoLnJvd0NsYXNzTmFtZSxcbiAgICAgIHR5cGU6IGgudHlwZSB8fCAnZml4ZWQnLFxuICAgICAgY29sczogaC5jb2xzLm1hcCggYyA9PiBuZXcgUGJsTWV0YUNvbHVtbiggeyAuLi5fZGVmYXVsdHMuaGVhZGVyLCAuLi5jIH0gKSksXG4gICAgfSkpO1xuICAgIGNvbnN0IGZvb3RlciA9IF9yYXcuZm9vdGVyLm1hcCggZiA9PiAoe1xuICAgICAgcm93SW5kZXg6IGYucm93SW5kZXgsXG4gICAgICByb3dDbGFzc05hbWU6IGYucm93Q2xhc3NOYW1lLFxuICAgICAgdHlwZTogZi50eXBlIHx8ICdmaXhlZCcsXG4gICAgICBjb2xzOiBmLmNvbHMubWFwKCBjID0+IG5ldyBQYmxNZXRhQ29sdW1uKHsgLi4uX2RlZmF1bHRzLmZvb3RlciwgLi4uYyB9KSApXG4gICAgfSkpO1xuICAgIGNvbnN0IGhlYWRlckdyb3VwID0gX3Jhdy5oZWFkZXJHcm91cC5tYXAoIGhnID0+ICh7XG4gICAgICByb3dJbmRleDogaGcucm93SW5kZXgsXG4gICAgICByb3dDbGFzc05hbWU6IGhnLnJvd0NsYXNzTmFtZSxcbiAgICAgIHR5cGU6IGhnLnR5cGUgfHwgJ2ZpeGVkJyxcbiAgICAgIGNvbHM6IHRoaXMuYnVpbGRIZWFkZXJHcm91cHMoaGcucm93SW5kZXgsIGhnLmNvbHMsIHRhYmxlLmNvbHMpLm1hcCggZyA9PiB7XG4gICAgICAgIGdyb3VwU3RvcmUuYWRkKGcpO1xuICAgICAgICByZXR1cm4gZztcbiAgICAgIH0pLFxuICAgIH0pKTtcblxuICAgIHJldHVybiB7XG4gICAgICBncm91cFN0b3JlLFxuICAgICAgdGFibGUsXG4gICAgICBoZWFkZXIsXG4gICAgICBmb290ZXIsXG4gICAgICBoZWFkZXJHcm91cCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZGVmYXVsdCBjb2x1bW4gZGVmaW5pdGlvbiBmb3IgaGVhZGVyL2Zvb3RlciBjb2x1bW5zLlxuICAgKi9cbiAgZGVmYXVsdChkZWY6IFBhcnRpYWw8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24+LCB0eXBlOiAnaGVhZGVyJyB8ICdmb290ZXInKTogdGhpcztcbiAgLyoqXG4gICAqIFNldCB0aGUgZGVmYXVsdCBjb2x1bW4gZGVmaW5pdGlvbiBmb3IgdGFibGUgY29sdW1ucy5cbiAgICovXG4gIGRlZmF1bHQoZGVmOiBQYXJ0aWFsPFBibENvbHVtbkRlZmluaXRpb24+LCB0eXBlPzogJ3RhYmxlJyk6IHRoaXM7XG4gIGRlZmF1bHQoZGVmOiBQYXJ0aWFsPFBibENvbHVtbkRlZmluaXRpb24+IHwgUGFydGlhbDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbj4sIHR5cGU6ICd0YWJsZScgfCAnaGVhZGVyJyB8ICdmb290ZXInID0gJ3RhYmxlJyk6IHRoaXMge1xuICAgIHRoaXMuX2RlZmF1bHRzW3R5cGVdID0gZGVmO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0YWJsZSBjb2x1bW5zLlxuICAgKlxuICAgKiBUYWJsZSBjb2x1bW5zIGFyZSBtYW5kYXRvcnksIHRoZXkgYXJlIHRoZSBjb2x1bW5zIHRoYXQgZGVmaW5lIHRoZSBzdHJ1Y3R1cmUgb2YgdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBFYWNoIGNvbHVtbiB3aWxsIHVzdWFsbHkgcG9pbnQgdG8gcHJvcGVydHkgb24gdGhlIHJvdywgYWx0aG91Z2ggeW91IGNhbiBjcmVhdGUgY29sdW1ucyB0aGF0IGRvZXMgbm90XG4gICAqIGV4aXN0IG9uIHRoZSByb3cgYW5kIGhhbmRsZSB0aGVpciByZW5kZXJpbmcgd2l0aCBhIGNlbGwgdGVtcGxhdGUuXG4gICAqXG4gICAqIEVhY2ggdGFibGUgY29sdW1uIGlzIGFsc28gYSBoZWFkZXIgY29sdW1uIGFuZCBhIGZvb3RlciBjb2x1bW4gdGhhdCBkaXNwbGF5LlxuICAgKiBUaGUgaGVhZGVyIGFuZCBmb290ZXIgYXJlIGF1dG9tYXRpY2FsbHkgY3JlYXRlZCwgSWYgeW91IHdpc2ggbm90IHRvIHNob3cgdGhlbSBzZXQgaGVhZGVyUm93L2Zvb3RlclJvdyB0byBmYWxzZSBpbiBQYmxUYWJsZS5cbiAgICpcbiAgICovXG4gIHRhYmxlKHJvd09wdGlvbnM6IHsgaGVhZGVyPzogUGJsTWV0YVJvd0RlZmluaXRpb25zOyBmb290ZXI/OiBQYmxNZXRhUm93RGVmaW5pdGlvbnMgfSwgLi4uZGVmczogUGJsQ29sdW1uRGVmaW5pdGlvbltdKTogdGhpcztcbiAgdGFibGUoLi4uZGVmczogUGJsQ29sdW1uRGVmaW5pdGlvbltdKTogdGhpcztcbiAgdGFibGUoLi4uZGVmczogQXJyYXk8eyBoZWFkZXI/OiBQYmxNZXRhUm93RGVmaW5pdGlvbnM7IGZvb3Rlcj86IFBibE1ldGFSb3dEZWZpbml0aW9ucyB9IHwgUGJsQ29sdW1uRGVmaW5pdGlvbj4pOiB0aGlzIHtcbiAgICBjb25zdCByb3dPcHRpb25zOiB7IGhlYWRlcj86IFBibE1ldGFSb3dEZWZpbml0aW9uczsgZm9vdGVyPzogUGJsTWV0YVJvd0RlZmluaXRpb25zIH0gPSAoZGVmc1swXSBhcyBhbnkpLnByb3AgPyB7fSA6IGRlZnMuc2hpZnQoKSBhcyBhbnk7XG4gICAgY29uc3QgeyBoZWFkZXIsIGZvb3RlciB9ID0gcm93T3B0aW9ucztcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuX3Jhdy50YWJsZSwgeyBoZWFkZXIsIGZvb3RlciB9KTtcbiAgICB0aGlzLl9yYXcudGFibGUuY29scy5wdXNoKC4uLmRlZnMgYXMgUGJsQ29sdW1uRGVmaW5pdGlvbltdKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaGVhZGVyIHJvdyB3aXRoIGhlYWRlciBjb2x1bW5zLlxuICAgKiBDcmVhdGVzIGFuIGFkZGl0aW9uYWwgaGVhZGVyIHJvdyBpbiBwb3NpdGlvbiBgY3VycmVudEhlYWRlclJvd2AgdXNpbmcgdGhlIHByb3ZpZGVkIGhlYWRlciBjb2x1bW4gZGVmaW5pdGlvbnMuXG4gICAqIEVhY2ggZGVmaW5pdGlvbiByZXByZXNlbnQgYSBjZWxsLCB0aGUgY2VsbCdzIGRvZXMgbm90IGhhdmUgdG8gYWxpZ24gd2l0aCB0aGUgbGF5b3V0IG9mIHRhYmxlIGNvbHVtbnMuXG4gICAqXG4gICAqIEFsbCBoZWFkZXIgcm93IHdpbGwgcG9zaXRpb24gQkVGT1JFIHRoZSB0YWJsZSBjb2x1bW4gaGVhZGVyIHJvdy5cbiAgICogSGVhZGVyIGNvbHVtbnMgYXJlIG9wdGlvbmFsLlxuICAgKiBFYWNoIGNhbGwgdG8gYGhlYWRlcigpYCB3aWxsIGNyZWF0ZSBhIG5ldyByb3csIGluY3JlbWVudGluZyB0aGUgYGN1cnJlbnRIZWFkZXJSb3dgLlxuICAgKlxuICAgKiBAcmVtYXJrc1xuICAgKiBFeGFtcGxlOlxuICAgKiBgYGBqc1xuICAgKiAgIGZhY3RvcnkudGFibGUoMSwgMiwgMylcbiAgICogICAgIC5oZWFkZXIoYSwgYiwgYykuaGVhZGVyKGQsIGUsIGYpO1xuICAgKiBgYGBcbiAgICpcbiAgICogd2lsbCByZXN1bHQgaW46XG4gICAqICAgaGVhZGVyMSAtXFw+ICBhIGIgY1xuICAgKiAgIGhlYWRlcjIgLVxcPiAgZCBlIGZcbiAgICogICB0YWJsZSAgIC1cXD4gIDEgMiAzXG4gICAqL1xuICBoZWFkZXIocm93T3B0aW9uczogUGJsTWV0YVJvd0RlZmluaXRpb25zLCAuLi5kZWZzOiBBcnJheTxQaWNrPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uLCAnaWQnPiAmIFBhcnRpYWw8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24+ICYgUGJsQmFzZUNvbHVtbkRlZmluaXRpb24+KTogdGhpcztcbiAgaGVhZGVyKC4uLmRlZnM6IEFycmF5PFBpY2s8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24sICdpZCc+ICYgUGFydGlhbDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbj4gJiBQYmxCYXNlQ29sdW1uRGVmaW5pdGlvbj4pOiB0aGlzO1xuICBoZWFkZXIoLi4uZGVmczogQXJyYXk8UGJsTWV0YVJvd0RlZmluaXRpb25zIHwgUGljazxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiwgJ2lkJz4gJiBQYXJ0aWFsPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uPiAmIFBibEJhc2VDb2x1bW5EZWZpbml0aW9uPik6IHRoaXMge1xuICAgIGNvbnN0IHJvd0luZGV4ID0gdGhpcy5fY3VycmVudEhlYWRlclJvdysrO1xuICAgIGNvbnN0IHJvd09wdGlvbnMgPSB0aGlzLnByb2Nlc3NSb3dPcHRpb25zKGRlZnMpO1xuICAgIGNvbnN0IHJvd0NsYXNzTmFtZSA9IHRoaXMuZ2VuUm93Q2xhc3Mocm93T3B0aW9ucywgcm93SW5kZXgpO1xuXG4gICAgY29uc3QgaGVhZGVycyA9IGRlZnMubWFwKCAoZDogUGljazxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiwgJ2lkJz4gJiBQYXJ0aWFsPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uPiAmIFBibEJhc2VDb2x1bW5EZWZpbml0aW9uKSA9PiB7XG4gICAgICBjb25zdCBkZWY6IFBibE1ldGFDb2x1bW5EZWZpbml0aW9uID0ge1xuICAgICAgICBpZDogZC5pZCxcbiAgICAgICAga2luZDogJ2hlYWRlcicsXG4gICAgICAgIHJvd0luZGV4XG4gICAgICB9O1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZGVmLCBkKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX3Jhdy5oZWFkZXIucHVzaCh7XG4gICAgICByb3dJbmRleCxcbiAgICAgIHJvd0NsYXNzTmFtZSxcbiAgICAgIGNvbHM6IGhlYWRlcnMsXG4gICAgICB0eXBlOiAocm93T3B0aW9ucyAmJiByb3dPcHRpb25zLnR5cGUpIHx8ICdmaXhlZCcsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IGZvb3RlciByb3cgd2l0aCBmb290ZXIgY29sdW1ucy5cbiAgICogQ3JlYXRlcyBhbiBhZGRpdGlvbmFsIGZvb3RlciByb3cgaW4gcG9zaXRpb24gYGN1cnJlbnRGb290ZXJSb3dgIHVzaW5nIHRoZSBwcm92aWRlZCBmb290ZXIgY29sdW1uIGRlZmluaXRpb25zLlxuICAgKiBFYWNoIGRlZmluaXRpb24gcmVwcmVzZW50IGEgY2VsbCwgdGhlIGNlbGwncyBkb2VzIG5vdCBoYXZlIHRvIGFsaWduIHdpdGggdGhlIGxheW91dCBvZiB0YWJsZSBjb2x1bW5zLlxuICAgKlxuICAgKiBBbGwgZm9vdGVyIHJvdyB3aWxsIHBvc2l0aW9uIEFGVEVSIHRoZSB0YWJsZSBjb2x1bW4gZm9vdGVyIHJvdy5cbiAgICogRm9vdGVyIGNvbHVtbnMgYXJlIG9wdGlvbmFsLlxuICAgKiBFYWNoIGNhbGwgdG8gYGZvb3RlcigpYCB3aWxsIGNyZWF0ZSBhIG5ldyByb3csIGluY3JlbWVudGluZyB0aGUgYGN1cnJlbnRGb290ZXJSb3dgLlxuICAgKlxuICAgKiBAcmVtYXJrc1xuICAgKiBFeGFtcGxlOlxuICAgKiBgYGBqc1xuICAgKiAgIGZhY3RvcnkudGFibGUoMSwgMiwgMylcbiAgICogICAgIC5mb290ZXIoYSwgYiwgYykuZm9vdGVyKGQsIGUsIGYpO1xuICAgKiBgYGBcbiAgICpcbiAgICogd2lsbCByZXN1bHQgaW46XG4gICAqICAgdGFibGUgICAtXFw+ICAxIDIgM1xuICAgKiAgIGZvb3RlcjEgLVxcPiAgYSBiIGNcbiAgICogICBmb290ZXIyIC1cXD4gIGQgZSBmXG4gICAqL1xuICBmb290ZXIocm93T3B0aW9uczogUGJsTWV0YVJvd0RlZmluaXRpb25zLCAuLi5kZWZzOiBBcnJheTxQaWNrPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uLCAnaWQnPiAmIFBhcnRpYWw8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24+ICYgUGJsQmFzZUNvbHVtbkRlZmluaXRpb24+KTogdGhpcztcbiAgZm9vdGVyKC4uLmRlZnM6IEFycmF5PFBpY2s8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24sICdpZCc+ICYgUGFydGlhbDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbj4gJiBQYmxCYXNlQ29sdW1uRGVmaW5pdGlvbj4pOiB0aGlzO1xuICBmb290ZXIoLi4uZGVmczogQXJyYXk8UGJsTWV0YVJvd0RlZmluaXRpb25zIHwgUGljazxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiwgJ2lkJz4gJiBQYXJ0aWFsPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uPiAmIFBibEJhc2VDb2x1bW5EZWZpbml0aW9uPik6IHRoaXMge1xuICAgIGNvbnN0IHJvd0luZGV4ID0gdGhpcy5fY3VycmVudEZvb3RlclJvdysrO1xuICAgIGNvbnN0IHJvd09wdGlvbnMgPSB0aGlzLnByb2Nlc3NSb3dPcHRpb25zKGRlZnMpO1xuICAgIGNvbnN0IHJvd0NsYXNzTmFtZSA9IHRoaXMuZ2VuUm93Q2xhc3Mocm93T3B0aW9ucywgcm93SW5kZXgpO1xuXG4gICAgY29uc3QgZm9vdGVycyA9IGRlZnMubWFwKCAoZDogUGljazxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiwgJ2lkJz4gJiBQYXJ0aWFsPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uPiAmIFBibEJhc2VDb2x1bW5EZWZpbml0aW9uKSA9PiB7XG4gICAgICBjb25zdCBkZWY6IFBibE1ldGFDb2x1bW5EZWZpbml0aW9uID0ge1xuICAgICAgICBpZDogZC5pZCxcbiAgICAgICAga2luZDogJ2Zvb3RlcicsXG4gICAgICAgIHJvd0luZGV4XG4gICAgICB9O1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZGVmLCBkKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX3Jhdy5mb290ZXIucHVzaCh7XG4gICAgICByb3dJbmRleCxcbiAgICAgIHJvd0NsYXNzTmFtZSxcbiAgICAgIGNvbHM6IGZvb3RlcnMsXG4gICAgICB0eXBlOiAocm93T3B0aW9ucyAmJiByb3dPcHRpb25zLnR5cGUpIHx8ICdmaXhlZCcsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IGhlYWRlciByb3cgd2l0aCBoZWFkZXIgZ3JvdXAgY29sdW1ucy5cbiAgICogQSBoZWFkZXIgZ3JvdXAgY29sdW1uIGlzIGEgY29sdW1ucyBpcyBhIGhlYWRlciBjb2x1bW5zIHRoYXQgc3BhbnMgb25lIG9yIG1vcmUgY29sdW1ucy5cbiAgICpcbiAgICogQ3JlYXRlIGFuIGFkZGl0aW9uYWwgaGVhZGVyIHJvdyBpbiBwb3NpdGlvbiBgY3VycmVudEhlYWRlclJvd2AgdXNpbmcgdGhlIHByb3ZpZGVkIGhlYWRlciBjb2x1bW4gZGVmaW5pdGlvbnMuXG4gICAqIEVhY2ggZGVmaW5pdGlvbiByZXByZXNlbnQgYSBjZWxsLCB0aGUgY2VsbCdzIGRvZXMgbm90IGhhdmUgdG8gYWxpZ24gd2l0aCB0aGUgbGF5b3V0IG9mIHRhYmxlIGNvbHVtbnMuXG4gICAqXG4gICAqIEFsbCBoZWFkZXIgcm93IHdpbGwgcG9zaXRpb24gQkVGT1JFIHRoZSB0YWJsZSBjb2x1bW4gaGVhZGVyIHJvdy5cbiAgICogSGVhZGVyIGNvbHVtbnMgYXJlIG9wdGlvbmFsLlxuICAgKiBFYWNoIGNhbGwgdG8gYGhlYWRlcigpYCB3aWxsIGNyZWF0ZSBhIG5ldyByb3csIGluY3JlbWVudGluZyB0aGUgYGN1cnJlbnRIZWFkZXJSb3dgLlxuICAgKlxuICAgKiBAcmVtYXJrc1xuICAgKiBFeGFtcGxlOlxuICAgKiBgYGBqc1xuICAgKiAgIGZhY3RvcnkudGFibGUoMSwgMiwgMylcbiAgICogICAgIC5oZWFkZXIoYSwgYiwgYykuaGVhZGVyKGQsIGUsIGYpO1xuICAgKiBgYGBcbiAgICpcbiAgICogd2lsbCByZXN1bHQgaW46XG4gICAqICAgaGVhZGVyMSAtXFw+ICBhIGIgY1xuICAgKiAgIGhlYWRlcjIgLVxcPiAgZCBlIGZcbiAgICogICB0YWJsZSAgIC1cXD4gIDEgMiAzXG4gICAqL1xuICBoZWFkZXJHcm91cChyb3dPcHRpb25zOiBQYmxNZXRhUm93RGVmaW5pdGlvbnMsIC4uLmRlZnM6IEFycmF5PFBpY2s8UGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uLCAncHJvcCc+ICYgUGFydGlhbDxQYmxDb2x1bW5Hcm91cERlZmluaXRpb24+Pik6IHRoaXM7XG4gIGhlYWRlckdyb3VwKC4uLmRlZnM6IEFycmF5PFBpY2s8UGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uLCAncHJvcCc+ICYgUGFydGlhbDxQYmxDb2x1bW5Hcm91cERlZmluaXRpb24+Pik6IHRoaXM7XG4gIGhlYWRlckdyb3VwKC4uLmRlZnM6IEFycmF5PFBibE1ldGFSb3dEZWZpbml0aW9ucyB8ICggUGljazxQYmxDb2x1bW5Hcm91cERlZmluaXRpb24sICdwcm9wJz4gJiBQYXJ0aWFsPFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbj4pID4pOiB0aGlzIHtcbiAgICBjb25zdCByb3dJbmRleCA9IHRoaXMuX2N1cnJlbnRIZWFkZXJSb3crKztcbiAgICBjb25zdCByb3dPcHRpb25zID0gdGhpcy5wcm9jZXNzUm93T3B0aW9ucyhkZWZzLCAncHJvcCcpO1xuICAgIGNvbnN0IHJvd0NsYXNzTmFtZSA9IHRoaXMuZ2VuUm93Q2xhc3Mocm93T3B0aW9ucywgcm93SW5kZXgpO1xuXG4gICAgY29uc3QgaGVhZGVyR3JvdXBzOiBhbnkgPSBkZWZzLm1hcCggZCA9PiBPYmplY3QuYXNzaWduKHsgcm93SW5kZXggfSwgZCkgKTtcblxuICAgIHRoaXMuX3Jhdy5oZWFkZXJHcm91cC5wdXNoKHtcbiAgICAgIHJvd0luZGV4LFxuICAgICAgcm93Q2xhc3NOYW1lLFxuICAgICAgY29sczogaGVhZGVyR3JvdXBzLFxuICAgICAgdHlwZTogKHJvd09wdGlvbnMgJiYgcm93T3B0aW9ucy50eXBlKSB8fCAnZml4ZWQnLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwcml2YXRlIHByb2Nlc3NSb3dPcHRpb25zKGRlZnM6IGFueVtdLCBtdXN0SGF2ZVByb3BlcnR5OiBzdHJpbmcgPSAnaWQnKTogUGJsTWV0YVJvd0RlZmluaXRpb25zIHtcbiAgICByZXR1cm4gZGVmc1swXVttdXN0SGF2ZVByb3BlcnR5XSA/IHVuZGVmaW5lZCA6IGRlZnMuc2hpZnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuUm93Q2xhc3Mocm93T3B0aW9uczogeyByb3dDbGFzc05hbWU/OiBzdHJpbmcgfSwgZmFsbGJhY2tSb3dJbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHJvd09wdGlvbnMgJiYgcm93T3B0aW9ucy5yb3dDbGFzc05hbWUpIHx8IGBwYmwtbmdyaWQtcm93LWluZGV4LSR7ZmFsbGJhY2tSb3dJbmRleC50b1N0cmluZygpfWA7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkSGVhZGVyR3JvdXBzKHJvd0luZGV4OiBudW1iZXIsIGhlYWRlckdyb3VwRGVmczogUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uW10sIHRhYmxlOiBQYmxDb2x1bW5bXSk6IFBibENvbHVtbkdyb3VwW10ge1xuICAgIGNvbnN0IGhlYWRlckdyb3VwOiBQYmxDb2x1bW5Hcm91cFtdID0gW107XG5cbiAgICAvLyBCdWlsZGluZyBvZiBoZWFkZXIgZ3JvdXAgcm93cyByZXF1aXJlcyBzb21lIHdvcmsuXG4gICAgLy8gVGhlIHVzZXIgZGVmaW5lZCBncm91cHMgbWlnaHQgbm90IGNvdmVyIGFsbCBjb2x1bW5zLCBjcmVhdGluZyBnYXBzIGJldHdlZW4gZ3JvdXAgY29sdW1ucyBzbyB3ZSBuZWVkIHRvIGFkZCBwbGFjZWhvbGRlciBncm91cHMgdG8gY292ZXIgdGhlc2UgZ2Fwcy5cbiAgICAvLyBNb3Jlb3ZlciwgdGhlIHVzZXIgbWlnaHQgbm90IHNwZWNpZnkgYSBgcHJvcGAsIHdoaWNoIHdlIG1pZ2h0IG5lZWQgdG8gY29tcGxldGUuXG4gICAgLy8gV2UgZG8gdGhhdCBmb3IgZWFjaCBoZWFkZXIgZ3JvdXAgcm93LlxuICAgIC8vXG4gICAgLy8gVGhlIGVuZCBnb2FsIGlzIHRvIHJldHVybiBhIGxpc3Qgb2YgYFBibENvbHVtbkdyb3VwYCB0aGF0IHNwYW4gb3ZlciB0aGUgZW50aXJlIGNvbHVtbnMgb2YgdGhlIHRhYmxlLlxuICAgIC8vXG4gICAgLy8gVGhlIGxvZ2ljIGlzIGFzIGZvbGxvd3M6XG4gICAgLy8gRm9yIGVhY2ggY29sdW1uIGluIHRoZSB0YWJsZSwgZmluZCBhIG1hdGNoaW5nIGNvbHVtbiBncm91cCAtIGEgZ3JvdXAgcG9pbnRpbmcgYXQgdGhlIGNvbHVtbiBieSBoYXZpbmcgdGhlIHNhbWUgYHByb3BgXG4gICAgLy8gSWYgZm91bmQsIGNoZWNrIGl0J3Mgc3BhbiBhbmQgc2tpcCBYIGFtb3VudCBvZiBjb2x1bW5zIHdoZXJlIFggaXMgdGhlIHNwYW4uXG4gICAgLy8gSWYgYSBzcGFuIGlzIG5vdCBkZWZpbmVkIHRoZW4gdHJlYXQgaXQgYXMgYSBncmVlZHkgZ3JvdXAgdGhhdCBzcGFucyBvdmVyIGFsbCBjb2x1bW5zIGFoZWFkIHVudGlsIHRoZSBuZXh0IGNvbHVtbiB0aGF0IGhhcyBhIG1hdGNoaW5nIGdyb3VwIGNvbHVtbi5cbiAgICAvL1xuICAgIC8vIElmIGEgY29sdW1uIGRvZXMgbm90IGhhdmUgYSBtYXRjaGluZyBncm91cCBjb2x1bW4sIHNlYXJjaCBmb3IgZ3JvdXAgY29sdW1ucyB3aXRob3V0IGEgYHByb3BgIHNwZWNpZmllZCBhbmQgd2hlbiBmb3VuZCBzZXQgdGhlaXIgYHByb3BgIHRvIHRoZSBjdXJyZW50XG4gICAgLy8gY29sdW1uIHNvIHdlIHdpbGwgbm93IHVzZSB0aGVtIGFzIGlmIGl0J3MgYSB1c2VyIHByb3ZpZGVkIGdyb3VwIGZvciB0aGlzIGNvbHVtbi4uLlxuICAgIC8vXG4gICAgLy8gSWYgbm8gZ3JvdXAgY29sdW1ucyBleGlzdHMgKG9yIGxlZnQpLCB3ZSBjcmVhdGUgYW4gYWQtaG9jIGdyb3VwIGNvbHVtbiBhbmQgd2Ugd2lsbCBub3cgdXNlIHRoZW0gYXMgaWYgaXQncyBhIHVzZXIgcHJvdmlkZWQgZ3JvdXAgZm9yIHRoaXMgY29sdW1uLi4uXG4gICAgLy9cbiAgICBjb25zdCB0YWJsZURlZnMgPSB0YWJsZS5zbGljZSgpO1xuICAgIGNvbnN0IGRlZnMgPSBoZWFkZXJHcm91cERlZnMuc2xpY2UoKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0YWJsZURlZnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IG9yZ1Byb3AgPSB0YWJsZURlZnNbaV0ub3JnUHJvcDtcbiAgICAgIGNvbnN0IGlkeCA9IGRlZnMuZmluZEluZGV4KCBkID0+IGQucHJvcCA9PT0gb3JnUHJvcCk7XG4gICAgICBjb25zdCBjb2x1bW5Hcm91cERlZjogUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uID0gaWR4ICE9PSAtMVxuICAgICAgICA/IGRlZnMuc3BsaWNlKGlkeCwgMSlbMF1cbiAgICAgICAgOiBkZWZzLmZpbmQoIGQgPT4gIWQucHJvcCApIHx8IHsgcHJvcDogb3JnUHJvcCwgcm93SW5kZXgsIHNwYW46IHVuZGVmaW5lZCB9XG4gICAgICA7XG5cbiAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gaWR4ID09PSAtMSAmJiAhIWNvbHVtbkdyb3VwRGVmLnByb3A7XG5cbiAgICAgIGNvbHVtbkdyb3VwRGVmLnByb3AgPSBvcmdQcm9wO1xuICAgICAgY29sdW1uR3JvdXBEZWYucm93SW5kZXggPSByb3dJbmRleDtcblxuICAgICAgbGV0IHRha2UgPSBjb2x1bW5Hcm91cERlZi5zcGFuO1xuICAgICAgaWYgKCEgKHRha2UgPj0gMCkgKSB7XG4gICAgICAgIHRha2UgPSAwO1xuICAgICAgICBmb3IgKGxldCB6ID0gaSsxOyB6IDwgbGVuOyB6KyspIHtcbiAgICAgICAgICBpZiAoZGVmcy5maW5kSW5kZXgoIGQgPT4gZC5wcm9wID09PSB0YWJsZURlZnNbel0ub3JnUHJvcCkgPT09IC0xKSB7XG4gICAgICAgICAgICB0YWtlKys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb2x1bW5Hcm91cERlZi5zcGFuID0gdGFrZTtcbiAgICAgIGNvbnN0IGdyb3VwID0gbmV3IFBibENvbHVtbkdyb3VwKGNvbHVtbkdyb3VwRGVmLCB0YWJsZURlZnMuc2xpY2UoaSwgaSArIHRha2UgKyAxKSwgcGxhY2Vob2xkZXIpO1xuICAgICAgaGVhZGVyR3JvdXAucHVzaChncm91cCk7XG4gICAgICBpICs9IHRha2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhlYWRlckdyb3VwO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2x1bW5GYWN0b3J5KCk6IFBibENvbHVtbkZhY3Rvcnkge1xuICByZXR1cm4gbmV3IFBibENvbHVtbkZhY3RvcnkoKVxufVxuIl19