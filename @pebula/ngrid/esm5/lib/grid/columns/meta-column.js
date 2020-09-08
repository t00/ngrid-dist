/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/columns/meta-column.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __values } from "tslib";
import { parseStyleWidth, initDefinitions } from './utils';
/** @type {?} */
var PBL_NGRID_META_COLUMN_MARK = Symbol('PblMetaColumn');
/** @type {?} */
var CLONE_PROPERTIES = ['kind', 'rowIndex'];
/**
 * @param {?} def
 * @return {?}
 */
export function isPblMetaColumn(def) {
    return def instanceof PblMetaColumn || (def && def[PBL_NGRID_META_COLUMN_MARK] === true);
}
var PblMetaColumn = /** @class */ (function () {
    function PblMetaColumn(def) {
        var e_1, _a;
        /**
         * A place to store things...
         * This must be an object, values are shadow-copied so persist data between multiple plugins.
         */
        this.data = {};
        this.defaultWidth = '';
        this[PBL_NGRID_META_COLUMN_MARK] = true;
        initDefinitions(def, this);
        try {
            for (var CLONE_PROPERTIES_1 = __values(CLONE_PROPERTIES), CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next(); !CLONE_PROPERTIES_1_1.done; CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next()) {
                var prop = CLONE_PROPERTIES_1_1.value;
                if (prop in def) {
                    this[(/** @type {?} */ (prop))] = def[prop];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (CLONE_PROPERTIES_1_1 && !CLONE_PROPERTIES_1_1.done && (_a = CLONE_PROPERTIES_1.return)) _a.call(CLONE_PROPERTIES_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (!isPblMetaColumn(def)) {
            if (typeof def.type === 'string') {
                this.type = (/** @type {?} */ ({ name: def.type }));
            }
        }
    }
    Object.defineProperty(PblMetaColumn.prototype, "width", {
        /**
         * The width in px or % in the following format: ##% or ##px
         * Examples: '50%', '50px'
         */
        get: /**
         * The width in px or % in the following format: ##% or ##px
         * Examples: '50%', '50px'
         * @return {?}
         */
        function () { return this._width; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._width) {
                this._parsedWidth = parseStyleWidth(this._width = value);
                /** @type {?} */
                var isFixedWidth = this._parsedWidth && this._parsedWidth.type === 'px';
                Object.defineProperty(this, 'isFixedWidth', { value: isFixedWidth, configurable: true });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblMetaColumn.prototype, "parsedWidth", {
        //#endregion PblMetaColumnDefinition
        get: 
        //#endregion PblMetaColumnDefinition
        /**
         * @return {?}
         */
        function () { return this._parsedWidth; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblMetaColumn.prototype, "columnDef", {
        /**
         * The column def for this column.
         */
        get: /**
         * The column def for this column.
         * @return {?}
         */
        function () { return this._columnDef; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} name
     * @return {?}
     */
    PblMetaColumn.extendProperty = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (CLONE_PROPERTIES.indexOf(name) === -1) {
            CLONE_PROPERTIES.push(name);
        }
    };
    /**
     * @param {?} columnDef
     * @return {?}
     */
    PblMetaColumn.prototype.attach = /**
     * @param {?} columnDef
     * @return {?}
     */
    function (columnDef) {
        this.detach();
        this._columnDef = columnDef;
        this.columnDef.updateWidth(this.width || this.defaultWidth, 'attach');
    };
    /**
     * @return {?}
     */
    PblMetaColumn.prototype.detach = /**
     * @return {?}
     */
    function () {
        this._columnDef = undefined;
    };
    /**
     * @param {?} fallbackDefault
     * @return {?}
     */
    PblMetaColumn.prototype.updateWidth = /**
     * @param {?} fallbackDefault
     * @return {?}
     */
    function (fallbackDefault) {
        this.defaultWidth = fallbackDefault || '';
        if (this.columnDef) {
            this.columnDef.updateWidth(this.width || fallbackDefault, 'update');
        }
    };
    return PblMetaColumn;
}());
export { PblMetaColumn };
if (false) {
    /**
     * A Unique ID for the column.
     * The ID must be unique across all columns, regardless of the type.
     * Columns with identical ID will share result in identical template.
     *
     * For example, having a header column and a footer column with the same id will result in the same cell presentation for both.
     * @type {?}
     */
    PblMetaColumn.prototype.id;
    /** @type {?} */
    PblMetaColumn.prototype.label;
    /**
     * The type of the values in this column.
     * This is an additional level for matching columns to templates, grouping templates for a type.
     * @type {?}
     */
    PblMetaColumn.prototype.type;
    /**
     * CSS class that get applied on the header and cell.
     * You can apply unique header/cell styles using the element name.
     * @type {?}
     */
    PblMetaColumn.prototype.css;
    /**
     * This minimum width in pixels
     * This is an absolute value, thus a number.
     * @type {?}
     */
    PblMetaColumn.prototype.minWidth;
    /**
     * This maximum width in pixels
     * This is an absolute value, thus a number.
     * @type {?}
     */
    PblMetaColumn.prototype.maxWidth;
    /**
     * A place to store things...
     * This must be an object, values are shadow-copied so persist data between multiple plugins.
     * @type {?}
     */
    PblMetaColumn.prototype.data;
    /** @type {?} */
    PblMetaColumn.prototype.kind;
    /**
     * The index (zero based) of the header row this column is attached to, used for multi-header setup.
     * When not set (undefined) the index is considered the LAST index.
     *
     * If you want to setup a multi header grid with 2 header rows, set this to 0 for the first header row and for the 2nd header
     * row do not set a rowIndex.
     * @type {?}
     */
    PblMetaColumn.prototype.rowIndex;
    /**
     * Used by pbl-ngrid to apply a custom header/footer cell template, or the default when not set.
     * \@internal
     * @type {?}
     */
    PblMetaColumn.prototype.template;
    /**
     * When true indicates that the width is set with type pixels.
     * \@internal
     * @type {?}
     */
    PblMetaColumn.prototype.isFixedWidth;
    /**
     * @type {?}
     * @private
     */
    PblMetaColumn.prototype._width;
    /**
     * @type {?}
     * @private
     */
    PblMetaColumn.prototype._parsedWidth;
    /**
     * @type {?}
     * @private
     */
    PblMetaColumn.prototype._columnDef;
    /**
     * @type {?}
     * @private
     */
    PblMetaColumn.prototype.defaultWidth;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1jb2x1bW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvY29sdW1ucy9tZXRhLWNvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQSxPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7SUFFckQsMEJBQTBCLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQzs7SUFDcEQsZ0JBQWdCLEdBQStCLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQzs7Ozs7QUFFekUsTUFBTSxVQUFVLGVBQWUsQ0FBQyxHQUFRO0lBQ3RDLE9BQU8sR0FBRyxZQUFZLGFBQWEsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsMEJBQTBCLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztBQUMzRixDQUFDO0FBRUQ7SUE4RkUsdUJBQVksR0FBNEI7Ozs7OztRQXpDeEMsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQXVDUCxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUd4QixJQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDeEMsZUFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7WUFFM0IsS0FBbUIsSUFBQSxxQkFBQSxTQUFBLGdCQUFnQixDQUFBLGtEQUFBLGdGQUFFO2dCQUFoQyxJQUFNLElBQUksNkJBQUE7Z0JBQ2IsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO29CQUNmLElBQUksQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtpQkFDOUI7YUFDRjs7Ozs7Ozs7O1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN6QixJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQUEsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFPLENBQUM7YUFDdkM7U0FDRjtJQUNILENBQUM7SUEvRUQsc0JBQUksZ0NBQUs7UUFKVDs7O1dBR0c7Ozs7OztRQUNILGNBQXNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQzNDLFVBQVUsS0FBYTtZQUNyQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDOztvQkFDbkQsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUssSUFBSTtnQkFDekUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUMxRjtRQUNILENBQUM7OztPQVAwQztJQXdDM0Msc0JBQUksc0NBQVc7UUFGakIsb0NBQW9DOzs7Ozs7UUFFbEMsY0FBcUUsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFpQmhHLHNCQUFJLG9DQUFTO1FBSGI7O1dBRUc7Ozs7O1FBQ0gsY0FBb0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7Ozs7O0lBd0J0RSw0QkFBYzs7OztJQUFyQixVQUFzQixJQUF5QjtRQUM3QyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN6QyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDOzs7OztJQUVELDhCQUFNOzs7O0lBQU4sVUFBTyxTQUEyQztRQUNoRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7OztJQUVELDhCQUFNOzs7SUFBTjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRUQsbUNBQVc7Ozs7SUFBWCxVQUFZLGVBQXVCO1FBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBZSxJQUFJLEVBQUUsQ0FBQztRQUMxQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDckU7SUFDSCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBcklELElBcUlDOzs7Ozs7Ozs7OztJQTNIQywyQkFBVzs7SUFFWCw4QkFBZTs7Ozs7O0lBTWYsNkJBQStCOzs7Ozs7SUFNL0IsNEJBQWE7Ozs7OztJQWtCYixpQ0FBa0I7Ozs7OztJQUtsQixpQ0FBa0I7Ozs7OztJQU1sQiw2QkFBZTs7SUFLZiw2QkFBMEI7Ozs7Ozs7OztJQVMxQixpQ0FBaUI7Ozs7OztJQVNqQixpQ0FBb0Q7Ozs7OztJQU1wRCxxQ0FBZ0M7Ozs7O0lBT2hDLCtCQUF3Qjs7Ozs7SUFDeEIscUNBQXlEOzs7OztJQUN6RCxtQ0FBcUQ7Ozs7O0lBQ3JELHFDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uRGVmIH0gZnJvbSAnLi4vZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQvdHlwZXMnO1xuaW1wb3J0IHsgUGJsTWV0YUNvbHVtbkRlZmluaXRpb24sIFBibENvbHVtblR5cGVEZWZpbml0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBwYXJzZVN0eWxlV2lkdGgsIGluaXREZWZpbml0aW9ucyB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBQQkxfTkdSSURfTUVUQV9DT0xVTU5fTUFSSyA9IFN5bWJvbCgnUGJsTWV0YUNvbHVtbicpO1xuY29uc3QgQ0xPTkVfUFJPUEVSVElFUzogQXJyYXk8a2V5b2YgUGJsTWV0YUNvbHVtbj4gPSBbJ2tpbmQnLCAncm93SW5kZXgnXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGJsTWV0YUNvbHVtbihkZWY6IGFueSk6IGRlZiBpcyBQYmxNZXRhQ29sdW1uIHtcbiAgcmV0dXJuIGRlZiBpbnN0YW5jZW9mIFBibE1ldGFDb2x1bW4gfHwgKGRlZiAmJiBkZWZbUEJMX05HUklEX01FVEFfQ09MVU1OX01BUktdID09PSB0cnVlKTtcbn1cblxuZXhwb3J0IGNsYXNzIFBibE1ldGFDb2x1bW4gaW1wbGVtZW50cyBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiB7XG4gIC8vI3JlZ2lvbiBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnRCYXNlQ29sdW1uRGVmaW5pdGlvblxuXG4gICAvKipcbiAgICogQSBVbmlxdWUgSUQgZm9yIHRoZSBjb2x1bW4uXG4gICAqIFRoZSBJRCBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3MgYWxsIGNvbHVtbnMsIHJlZ2FyZGxlc3Mgb2YgdGhlIHR5cGUuXG4gICAqIENvbHVtbnMgd2l0aCBpZGVudGljYWwgSUQgd2lsbCBzaGFyZSByZXN1bHQgaW4gaWRlbnRpY2FsIHRlbXBsYXRlLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgaGF2aW5nIGEgaGVhZGVyIGNvbHVtbiBhbmQgYSBmb290ZXIgY29sdW1uIHdpdGggdGhlIHNhbWUgaWQgd2lsbCByZXN1bHQgaW4gdGhlIHNhbWUgY2VsbCBwcmVzZW50YXRpb24gZm9yIGJvdGguXG4gICAqL1xuICBpZDogc3RyaW5nO1xuXG4gIGxhYmVsPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB0aGUgdmFsdWVzIGluIHRoaXMgY29sdW1uLlxuICAgKiBUaGlzIGlzIGFuIGFkZGl0aW9uYWwgbGV2ZWwgZm9yIG1hdGNoaW5nIGNvbHVtbnMgdG8gdGVtcGxhdGVzLCBncm91cGluZyB0ZW1wbGF0ZXMgZm9yIGEgdHlwZS5cbiAgICovXG4gIHR5cGU/OiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbjtcblxuICAvKipcbiAgICogQ1NTIGNsYXNzIHRoYXQgZ2V0IGFwcGxpZWQgb24gdGhlIGhlYWRlciBhbmQgY2VsbC5cbiAgICogWW91IGNhbiBhcHBseSB1bmlxdWUgaGVhZGVyL2NlbGwgc3R5bGVzIHVzaW5nIHRoZSBlbGVtZW50IG5hbWUuXG4gICAqL1xuICBjc3M/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBpbiBweCBvciAlIGluIHRoZSBmb2xsb3dpbmcgZm9ybWF0OiAjIyUgb3IgIyNweFxuICAgKiBFeGFtcGxlczogJzUwJScsICc1MHB4J1xuICAgKi9cbiAgZ2V0IHdpZHRoKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl93aWR0aDsgfVxuICBzZXQgd2lkdGgodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fd2lkdGgpIHtcbiAgICAgIHRoaXMuX3BhcnNlZFdpZHRoID0gcGFyc2VTdHlsZVdpZHRoKHRoaXMuX3dpZHRoID0gdmFsdWUpO1xuICAgICAgY29uc3QgaXNGaXhlZFdpZHRoID0gdGhpcy5fcGFyc2VkV2lkdGggJiYgdGhpcy5fcGFyc2VkV2lkdGgudHlwZSA9PT0gJ3B4JztcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaXNGaXhlZFdpZHRoJywgeyB2YWx1ZTogaXNGaXhlZFdpZHRoLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBUaGlzIG1pbmltdW0gd2lkdGggaW4gcGl4ZWxzXG4gICAqIFRoaXMgaXMgYW4gYWJzb2x1dGUgdmFsdWUsIHRodXMgYSBudW1iZXIuXG4gICAqL1xuICBtaW5XaWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoaXMgbWF4aW11bSB3aWR0aCBpbiBwaXhlbHNcbiAgICogVGhpcyBpcyBhbiBhYnNvbHV0ZSB2YWx1ZSwgdGh1cyBhIG51bWJlci5cbiAgICovXG4gIG1heFdpZHRoPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIHBsYWNlIHRvIHN0b3JlIHRoaW5ncy4uLlxuICAgKiBUaGlzIG11c3QgYmUgYW4gb2JqZWN0LCB2YWx1ZXMgYXJlIHNoYWRvdy1jb3BpZWQgc28gcGVyc2lzdCBkYXRhIGJldHdlZW4gbXVsdGlwbGUgcGx1Z2lucy5cbiAgICovXG4gIGRhdGE6IGFueSA9IHt9O1xuICAvLyNlbmRyZWdpb24gUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50QmFzZUNvbHVtbkRlZmluaXRpb25cblxuICAvLyNyZWdpb24gUGJsTWV0YUNvbHVtbkRlZmluaXRpb25cblxuICBraW5kOiAnaGVhZGVyJyB8ICdmb290ZXInO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggKHplcm8gYmFzZWQpIG9mIHRoZSBoZWFkZXIgcm93IHRoaXMgY29sdW1uIGlzIGF0dGFjaGVkIHRvLCB1c2VkIGZvciBtdWx0aS1oZWFkZXIgc2V0dXAuXG4gICAqIFdoZW4gbm90IHNldCAodW5kZWZpbmVkKSB0aGUgaW5kZXggaXMgY29uc2lkZXJlZCB0aGUgTEFTVCBpbmRleC5cbiAgICpcbiAgICogSWYgeW91IHdhbnQgdG8gc2V0dXAgYSBtdWx0aSBoZWFkZXIgZ3JpZCB3aXRoIDIgaGVhZGVyIHJvd3MsIHNldCB0aGlzIHRvIDAgZm9yIHRoZSBmaXJzdCBoZWFkZXIgcm93IGFuZCBmb3IgdGhlIDJuZCBoZWFkZXJcbiAgICogcm93IGRvIG5vdCBzZXQgYSByb3dJbmRleC5cbiAgICovXG4gIHJvd0luZGV4OiBudW1iZXI7XG4vLyNlbmRyZWdpb24gUGJsTWV0YUNvbHVtbkRlZmluaXRpb25cblxuICBnZXQgcGFyc2VkV2lkdGgoKTogeyB2YWx1ZTogbnVtYmVyOyB0eXBlOiAncHgnIHwgJyUnIH0gfCB1bmRlZmluZWQgeyByZXR1cm4gdGhpcy5fcGFyc2VkV2lkdGg7IH1cblxuICAvKipcbiAgICogVXNlZCBieSBwYmwtbmdyaWQgdG8gYXBwbHkgYSBjdXN0b20gaGVhZGVyL2Zvb3RlciBjZWxsIHRlbXBsYXRlLCBvciB0aGUgZGVmYXVsdCB3aGVuIG5vdCBzZXQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueT4+O1xuXG4gIC8qKlxuICAgKiBXaGVuIHRydWUgaW5kaWNhdGVzIHRoYXQgdGhlIHdpZHRoIGlzIHNldCB3aXRoIHR5cGUgcGl4ZWxzLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHJlYWRvbmx5IGlzRml4ZWRXaWR0aD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBjb2x1bW4gZGVmIGZvciB0aGlzIGNvbHVtbi5cbiAgICovXG4gIGdldCBjb2x1bW5EZWYoKTogUGJsTmdyaWRDb2x1bW5EZWY8UGJsTWV0YUNvbHVtbj4geyByZXR1cm4gdGhpcy5fY29sdW1uRGVmOyB9XG5cbiAgcHJpdmF0ZSBfd2lkdGg/OiBzdHJpbmc7XG4gIHByaXZhdGUgX3BhcnNlZFdpZHRoOiBSZXR1cm5UeXBlPHR5cGVvZiBwYXJzZVN0eWxlV2lkdGg+O1xuICBwcml2YXRlIF9jb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmPFBibE1ldGFDb2x1bW4+O1xuICBwcml2YXRlIGRlZmF1bHRXaWR0aCA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKGRlZjogUGJsTWV0YUNvbHVtbkRlZmluaXRpb24pIHtcbiAgICB0aGlzW1BCTF9OR1JJRF9NRVRBX0NPTFVNTl9NQVJLXSA9IHRydWU7XG4gICAgaW5pdERlZmluaXRpb25zKGRlZiwgdGhpcyk7XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgQ0xPTkVfUFJPUEVSVElFUykge1xuICAgICAgaWYgKHByb3AgaW4gZGVmKSB7XG4gICAgICAgIHRoaXNbcHJvcCBhcyBhbnldID0gZGVmW3Byb3BdXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpc1BibE1ldGFDb2x1bW4oZGVmKSkge1xuICAgICAgaWYgKHR5cGVvZiBkZWYudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy50eXBlID0geyBuYW1lOiBkZWYudHlwZSB9IGFzIGFueTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZXh0ZW5kUHJvcGVydHkobmFtZToga2V5b2YgUGJsTWV0YUNvbHVtbik6IHZvaWQge1xuICAgIGlmIChDTE9ORV9QUk9QRVJUSUVTLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICBDTE9ORV9QUk9QRVJUSUVTLnB1c2gobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYXR0YWNoKGNvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY8UGJsTWV0YUNvbHVtbj4pOiB2b2lkIHtcbiAgICB0aGlzLmRldGFjaCgpO1xuICAgIHRoaXMuX2NvbHVtbkRlZiA9IGNvbHVtbkRlZjtcbiAgICB0aGlzLmNvbHVtbkRlZi51cGRhdGVXaWR0aCh0aGlzLndpZHRoIHx8IHRoaXMuZGVmYXVsdFdpZHRoLCAnYXR0YWNoJyk7XG4gIH1cblxuICBkZXRhY2goKTogdm9pZCB7XG4gICAgdGhpcy5fY29sdW1uRGVmID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdXBkYXRlV2lkdGgoZmFsbGJhY2tEZWZhdWx0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmRlZmF1bHRXaWR0aCA9IGZhbGxiYWNrRGVmYXVsdCB8fCAnJztcbiAgICBpZiAodGhpcy5jb2x1bW5EZWYpIHtcbiAgICAgIHRoaXMuY29sdW1uRGVmLnVwZGF0ZVdpZHRoKHRoaXMud2lkdGggfHwgZmFsbGJhY2tEZWZhdWx0LCAndXBkYXRlJyk7XG4gICAgfVxuICB9XG59XG4iXX0=