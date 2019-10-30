/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
    return def instanceof PblMetaColumn || def[PBL_NGRID_META_COLUMN_MARK] === true;
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
            for (var CLONE_PROPERTIES_1 = tslib_1.__values(CLONE_PROPERTIES), CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next(); !CLONE_PROPERTIES_1_1.done; CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next()) {
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
        this.columnDef.updateWidth(this.width || this.defaultWidth);
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
            this.columnDef.updateWidth(this.width || fallbackDefault);
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
     * If you want to setup a multi header table with 2 header rows, set this to 0 for the first header row and for the 2nd header
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1jb2x1bW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbHVtbnMvbWV0YS1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQSxPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7SUFFckQsMEJBQTBCLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQzs7SUFDcEQsZ0JBQWdCLEdBQStCLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQzs7Ozs7QUFFekUsTUFBTSxVQUFVLGVBQWUsQ0FBQyxHQUE0QjtJQUMxRCxPQUFPLEdBQUcsWUFBWSxhQUFhLElBQUksR0FBRyxDQUFDLDBCQUEwQixDQUFDLEtBQUssSUFBSSxDQUFDO0FBQ2xGLENBQUM7QUFFRDtJQThGRSx1QkFBWSxHQUE0Qjs7Ozs7O1FBekN4QyxTQUFJLEdBQVEsRUFBRSxDQUFDO1FBdUNQLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBR3hCLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN4QyxlQUFlLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDOztZQUUzQixLQUFtQixJQUFBLHFCQUFBLGlCQUFBLGdCQUFnQixDQUFBLGtEQUFBLGdGQUFFO2dCQUFoQyxJQUFNLElBQUksNkJBQUE7Z0JBQ2IsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO29CQUNmLElBQUksQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtpQkFDOUI7YUFDRjs7Ozs7Ozs7O1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN6QixJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQUEsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFPLENBQUM7YUFDdkM7U0FDRjtJQUNILENBQUM7SUEvRUQsc0JBQUksZ0NBQUs7UUFKVDs7O1dBR0c7Ozs7OztRQUNILGNBQXNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQzNDLFVBQVUsS0FBYTtZQUNyQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDOztvQkFDbkQsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUssSUFBSTtnQkFDekUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUMxRjtRQUNILENBQUM7OztPQVAwQztJQXdDM0Msc0JBQUksc0NBQVc7UUFGakIsb0NBQW9DOzs7Ozs7UUFFbEMsY0FBcUUsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFpQmhHLHNCQUFJLG9DQUFTO1FBSGI7O1dBRUc7Ozs7O1FBQ0gsY0FBb0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7Ozs7O0lBd0J0RSw0QkFBYzs7OztJQUFyQixVQUFzQixJQUF5QjtRQUM3QyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN6QyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDOzs7OztJQUVELDhCQUFNOzs7O0lBQU4sVUFBTyxTQUEyQztRQUNoRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7O0lBRUQsOEJBQU07OztJQUFOO1FBQ0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUFFRCxtQ0FBVzs7OztJQUFYLFVBQVksZUFBdUI7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLElBQUksRUFBRSxDQUFDO1FBQzFDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLGVBQWUsQ0FBQyxDQUFDO1NBQzNEO0lBQ0gsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQXJJRCxJQXFJQzs7Ozs7Ozs7Ozs7SUEzSEMsMkJBQVc7O0lBRVgsOEJBQWU7Ozs7OztJQU1mLDZCQUErQjs7Ozs7O0lBTS9CLDRCQUFhOzs7Ozs7SUFrQmIsaUNBQWtCOzs7Ozs7SUFLbEIsaUNBQWtCOzs7Ozs7SUFNbEIsNkJBQWU7O0lBS2YsNkJBQTBCOzs7Ozs7Ozs7SUFTMUIsaUNBQWlCOzs7Ozs7SUFTakIsaUNBQW9EOzs7Ozs7SUFNcEQscUNBQWdDOzs7OztJQU9oQywrQkFBd0I7Ozs7O0lBQ3hCLHFDQUF5RDs7Ozs7SUFDekQsbUNBQXFEOzs7OztJQUNyRCxxQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRlZiB9IGZyb20gJy4uL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L3R5cGVzJztcbmltcG9ydCB7IFBibE1ldGFDb2x1bW5EZWZpbml0aW9uLCBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbiB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgcGFyc2VTdHlsZVdpZHRoLCBpbml0RGVmaW5pdGlvbnMgfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgUEJMX05HUklEX01FVEFfQ09MVU1OX01BUksgPSBTeW1ib2woJ1BibE1ldGFDb2x1bW4nKTtcbmNvbnN0IENMT05FX1BST1BFUlRJRVM6IEFycmF5PGtleW9mIFBibE1ldGFDb2x1bW4+ID0gWydraW5kJywgJ3Jvd0luZGV4J107XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BibE1ldGFDb2x1bW4oZGVmOiBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbik6IGRlZiBpcyBQYmxNZXRhQ29sdW1uIHtcbiAgcmV0dXJuIGRlZiBpbnN0YW5jZW9mIFBibE1ldGFDb2x1bW4gfHwgZGVmW1BCTF9OR1JJRF9NRVRBX0NPTFVNTl9NQVJLXSA9PT0gdHJ1ZTtcbn1cblxuZXhwb3J0IGNsYXNzIFBibE1ldGFDb2x1bW4gaW1wbGVtZW50cyBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiB7XG4gIC8vI3JlZ2lvbiBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnRCYXNlQ29sdW1uRGVmaW5pdGlvblxuXG4gICAvKipcbiAgICogQSBVbmlxdWUgSUQgZm9yIHRoZSBjb2x1bW4uXG4gICAqIFRoZSBJRCBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3MgYWxsIGNvbHVtbnMsIHJlZ2FyZGxlc3Mgb2YgdGhlIHR5cGUuXG4gICAqIENvbHVtbnMgd2l0aCBpZGVudGljYWwgSUQgd2lsbCBzaGFyZSByZXN1bHQgaW4gaWRlbnRpY2FsIHRlbXBsYXRlLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgaGF2aW5nIGEgaGVhZGVyIGNvbHVtbiBhbmQgYSBmb290ZXIgY29sdW1uIHdpdGggdGhlIHNhbWUgaWQgd2lsbCByZXN1bHQgaW4gdGhlIHNhbWUgY2VsbCBwcmVzZW50YXRpb24gZm9yIGJvdGguXG4gICAqL1xuICBpZDogc3RyaW5nO1xuXG4gIGxhYmVsPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB0aGUgdmFsdWVzIGluIHRoaXMgY29sdW1uLlxuICAgKiBUaGlzIGlzIGFuIGFkZGl0aW9uYWwgbGV2ZWwgZm9yIG1hdGNoaW5nIGNvbHVtbnMgdG8gdGVtcGxhdGVzLCBncm91cGluZyB0ZW1wbGF0ZXMgZm9yIGEgdHlwZS5cbiAgICovXG4gIHR5cGU/OiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbjtcblxuICAvKipcbiAgICogQ1NTIGNsYXNzIHRoYXQgZ2V0IGFwcGxpZWQgb24gdGhlIGhlYWRlciBhbmQgY2VsbC5cbiAgICogWW91IGNhbiBhcHBseSB1bmlxdWUgaGVhZGVyL2NlbGwgc3R5bGVzIHVzaW5nIHRoZSBlbGVtZW50IG5hbWUuXG4gICAqL1xuICBjc3M/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBpbiBweCBvciAlIGluIHRoZSBmb2xsb3dpbmcgZm9ybWF0OiAjIyUgb3IgIyNweFxuICAgKiBFeGFtcGxlczogJzUwJScsICc1MHB4J1xuICAgKi9cbiAgZ2V0IHdpZHRoKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl93aWR0aDsgfVxuICBzZXQgd2lkdGgodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fd2lkdGgpIHtcbiAgICAgIHRoaXMuX3BhcnNlZFdpZHRoID0gcGFyc2VTdHlsZVdpZHRoKHRoaXMuX3dpZHRoID0gdmFsdWUpO1xuICAgICAgY29uc3QgaXNGaXhlZFdpZHRoID0gdGhpcy5fcGFyc2VkV2lkdGggJiYgdGhpcy5fcGFyc2VkV2lkdGgudHlwZSA9PT0gJ3B4JztcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaXNGaXhlZFdpZHRoJywgeyB2YWx1ZTogaXNGaXhlZFdpZHRoLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBUaGlzIG1pbmltdW0gd2lkdGggaW4gcGl4ZWxzXG4gICAqIFRoaXMgaXMgYW4gYWJzb2x1dGUgdmFsdWUsIHRodXMgYSBudW1iZXIuXG4gICAqL1xuICBtaW5XaWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoaXMgbWF4aW11bSB3aWR0aCBpbiBwaXhlbHNcbiAgICogVGhpcyBpcyBhbiBhYnNvbHV0ZSB2YWx1ZSwgdGh1cyBhIG51bWJlci5cbiAgICovXG4gIG1heFdpZHRoPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIHBsYWNlIHRvIHN0b3JlIHRoaW5ncy4uLlxuICAgKiBUaGlzIG11c3QgYmUgYW4gb2JqZWN0LCB2YWx1ZXMgYXJlIHNoYWRvdy1jb3BpZWQgc28gcGVyc2lzdCBkYXRhIGJldHdlZW4gbXVsdGlwbGUgcGx1Z2lucy5cbiAgICovXG4gIGRhdGE6IGFueSA9IHt9O1xuICAvLyNlbmRyZWdpb24gUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50QmFzZUNvbHVtbkRlZmluaXRpb25cblxuICAvLyNyZWdpb24gUGJsTWV0YUNvbHVtbkRlZmluaXRpb25cblxuICBraW5kOiAnaGVhZGVyJyB8ICdmb290ZXInO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggKHplcm8gYmFzZWQpIG9mIHRoZSBoZWFkZXIgcm93IHRoaXMgY29sdW1uIGlzIGF0dGFjaGVkIHRvLCB1c2VkIGZvciBtdWx0aS1oZWFkZXIgc2V0dXAuXG4gICAqIFdoZW4gbm90IHNldCAodW5kZWZpbmVkKSB0aGUgaW5kZXggaXMgY29uc2lkZXJlZCB0aGUgTEFTVCBpbmRleC5cbiAgICpcbiAgICogSWYgeW91IHdhbnQgdG8gc2V0dXAgYSBtdWx0aSBoZWFkZXIgdGFibGUgd2l0aCAyIGhlYWRlciByb3dzLCBzZXQgdGhpcyB0byAwIGZvciB0aGUgZmlyc3QgaGVhZGVyIHJvdyBhbmQgZm9yIHRoZSAybmQgaGVhZGVyXG4gICAqIHJvdyBkbyBub3Qgc2V0IGEgcm93SW5kZXguXG4gICAqL1xuICByb3dJbmRleDogbnVtYmVyO1xuLy8jZW5kcmVnaW9uIFBibE1ldGFDb2x1bW5EZWZpbml0aW9uXG5cbiAgZ2V0IHBhcnNlZFdpZHRoKCk6IHsgdmFsdWU6IG51bWJlcjsgdHlwZTogJ3B4JyB8ICclJyB9IHwgdW5kZWZpbmVkIHsgcmV0dXJuIHRoaXMuX3BhcnNlZFdpZHRoOyB9XG5cbiAgLyoqXG4gICAqIFVzZWQgYnkgcGJsLW5ncmlkIHRvIGFwcGx5IGEgY3VzdG9tIGhlYWRlci9mb290ZXIgY2VsbCB0ZW1wbGF0ZSwgb3IgdGhlIGRlZmF1bHQgd2hlbiBub3Qgc2V0LlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxhbnk+PjtcblxuICAvKipcbiAgICogV2hlbiB0cnVlIGluZGljYXRlcyB0aGF0IHRoZSB3aWR0aCBpcyBzZXQgd2l0aCB0eXBlIHBpeGVscy5cbiAgICogQGludGVybmFsXG4gICAqL1xuICByZWFkb25seSBpc0ZpeGVkV2lkdGg/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgY29sdW1uIGRlZiBmb3IgdGhpcyBjb2x1bW4uXG4gICAqL1xuICBnZXQgY29sdW1uRGVmKCk6IFBibE5ncmlkQ29sdW1uRGVmPFBibE1ldGFDb2x1bW4+IHsgcmV0dXJuIHRoaXMuX2NvbHVtbkRlZjsgfVxuXG4gIHByaXZhdGUgX3dpZHRoPzogc3RyaW5nO1xuICBwcml2YXRlIF9wYXJzZWRXaWR0aDogUmV0dXJuVHlwZTx0eXBlb2YgcGFyc2VTdHlsZVdpZHRoPjtcbiAgcHJpdmF0ZSBfY29sdW1uRGVmOiBQYmxOZ3JpZENvbHVtbkRlZjxQYmxNZXRhQ29sdW1uPjtcbiAgcHJpdmF0ZSBkZWZhdWx0V2lkdGggPSAnJztcblxuICBjb25zdHJ1Y3RvcihkZWY6IFBibE1ldGFDb2x1bW5EZWZpbml0aW9uKSB7XG4gICAgdGhpc1tQQkxfTkdSSURfTUVUQV9DT0xVTU5fTUFSS10gPSB0cnVlO1xuICAgIGluaXREZWZpbml0aW9ucyhkZWYsIHRoaXMpO1xuXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIENMT05FX1BST1BFUlRJRVMpIHtcbiAgICAgIGlmIChwcm9wIGluIGRlZikge1xuICAgICAgICB0aGlzW3Byb3AgYXMgYW55XSA9IGRlZltwcm9wXVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghaXNQYmxNZXRhQ29sdW1uKGRlZikpIHtcbiAgICAgIGlmICh0eXBlb2YgZGVmLnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHsgbmFtZTogZGVmLnR5cGUgfSBhcyBhbnk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGV4dGVuZFByb3BlcnR5KG5hbWU6IGtleW9mIFBibE1ldGFDb2x1bW4pOiB2b2lkIHtcbiAgICBpZiAoQ0xPTkVfUFJPUEVSVElFUy5pbmRleE9mKG5hbWUpID09PSAtMSkge1xuICAgICAgQ0xPTkVfUFJPUEVSVElFUy5wdXNoKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGF0dGFjaChjb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmPFBibE1ldGFDb2x1bW4+KTogdm9pZCB7XG4gICAgdGhpcy5kZXRhY2goKTtcbiAgICB0aGlzLl9jb2x1bW5EZWYgPSBjb2x1bW5EZWY7XG4gICAgdGhpcy5jb2x1bW5EZWYudXBkYXRlV2lkdGgodGhpcy53aWR0aCB8fCB0aGlzLmRlZmF1bHRXaWR0aCk7XG4gIH1cblxuICBkZXRhY2goKTogdm9pZCB7XG4gICAgdGhpcy5fY29sdW1uRGVmID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdXBkYXRlV2lkdGgoZmFsbGJhY2tEZWZhdWx0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmRlZmF1bHRXaWR0aCA9IGZhbGxiYWNrRGVmYXVsdCB8fCAnJztcbiAgICBpZiAodGhpcy5jb2x1bW5EZWYpIHtcbiAgICAgIHRoaXMuY29sdW1uRGVmLnVwZGF0ZVdpZHRoKHRoaXMud2lkdGggfHwgZmFsbGJhY2tEZWZhdWx0KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==