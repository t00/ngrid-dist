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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1jb2x1bW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbHVtbnMvbWV0YS1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQSxPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7SUFFckQsMEJBQTBCLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQzs7SUFDcEQsZ0JBQWdCLEdBQStCLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQzs7Ozs7QUFFekUsTUFBTSxVQUFVLGVBQWUsQ0FBQyxHQUFRO0lBQ3RDLE9BQU8sR0FBRyxZQUFZLGFBQWEsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsMEJBQTBCLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztBQUMzRixDQUFDO0FBRUQ7SUE4RkUsdUJBQVksR0FBNEI7Ozs7OztRQXpDeEMsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQXVDUCxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUd4QixJQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDeEMsZUFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7WUFFM0IsS0FBbUIsSUFBQSxxQkFBQSxpQkFBQSxnQkFBZ0IsQ0FBQSxrREFBQSxnRkFBRTtnQkFBaEMsSUFBTSxJQUFJLDZCQUFBO2dCQUNiLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtvQkFDZixJQUFJLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7aUJBQzlCO2FBQ0Y7Ozs7Ozs7OztRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDekIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLG1CQUFBLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBTyxDQUFDO2FBQ3ZDO1NBQ0Y7SUFDSCxDQUFDO0lBL0VELHNCQUFJLGdDQUFLO1FBSlQ7OztXQUdHOzs7Ozs7UUFDSCxjQUFzQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7OztRQUMzQyxVQUFVLEtBQWE7WUFDckIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQzs7b0JBQ25ELFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxLQUFLLElBQUk7Z0JBQ3pFLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFDMUY7UUFDSCxDQUFDOzs7T0FQMEM7SUF3QzNDLHNCQUFJLHNDQUFXO1FBRmpCLG9DQUFvQzs7Ozs7O1FBRWxDLGNBQXFFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBaUJoRyxzQkFBSSxvQ0FBUztRQUhiOztXQUVHOzs7OztRQUNILGNBQW9ELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7OztPQUFBOzs7OztJQXdCdEUsNEJBQWM7Ozs7SUFBckIsVUFBc0IsSUFBeUI7UUFDN0MsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDekMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCw4QkFBTTs7OztJQUFOLFVBQU8sU0FBMkM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Ozs7SUFFRCw4QkFBTTs7O0lBQU47UUFDRSxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVELG1DQUFXOzs7O0lBQVgsVUFBWSxlQUF1QjtRQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFDMUMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0gsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQXJJRCxJQXFJQzs7Ozs7Ozs7Ozs7SUEzSEMsMkJBQVc7O0lBRVgsOEJBQWU7Ozs7OztJQU1mLDZCQUErQjs7Ozs7O0lBTS9CLDRCQUFhOzs7Ozs7SUFrQmIsaUNBQWtCOzs7Ozs7SUFLbEIsaUNBQWtCOzs7Ozs7SUFNbEIsNkJBQWU7O0lBS2YsNkJBQTBCOzs7Ozs7Ozs7SUFTMUIsaUNBQWlCOzs7Ozs7SUFTakIsaUNBQW9EOzs7Ozs7SUFNcEQscUNBQWdDOzs7OztJQU9oQywrQkFBd0I7Ozs7O0lBQ3hCLHFDQUF5RDs7Ozs7SUFDekQsbUNBQXFEOzs7OztJQUNyRCxxQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRlZiB9IGZyb20gJy4uL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L3R5cGVzJztcbmltcG9ydCB7IFBibE1ldGFDb2x1bW5EZWZpbml0aW9uLCBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbiB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgcGFyc2VTdHlsZVdpZHRoLCBpbml0RGVmaW5pdGlvbnMgfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgUEJMX05HUklEX01FVEFfQ09MVU1OX01BUksgPSBTeW1ib2woJ1BibE1ldGFDb2x1bW4nKTtcbmNvbnN0IENMT05FX1BST1BFUlRJRVM6IEFycmF5PGtleW9mIFBibE1ldGFDb2x1bW4+ID0gWydraW5kJywgJ3Jvd0luZGV4J107XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BibE1ldGFDb2x1bW4oZGVmOiBhbnkpOiBkZWYgaXMgUGJsTWV0YUNvbHVtbiB7XG4gIHJldHVybiBkZWYgaW5zdGFuY2VvZiBQYmxNZXRhQ29sdW1uIHx8IChkZWYgJiYgZGVmW1BCTF9OR1JJRF9NRVRBX0NPTFVNTl9NQVJLXSA9PT0gdHJ1ZSk7XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxNZXRhQ29sdW1uIGltcGxlbWVudHMgUGJsTWV0YUNvbHVtbkRlZmluaXRpb24ge1xuICAvLyNyZWdpb24gUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50QmFzZUNvbHVtbkRlZmluaXRpb25cblxuICAgLyoqXG4gICAqIEEgVW5pcXVlIElEIGZvciB0aGUgY29sdW1uLlxuICAgKiBUaGUgSUQgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIGFsbCBjb2x1bW5zLCByZWdhcmRsZXNzIG9mIHRoZSB0eXBlLlxuICAgKiBDb2x1bW5zIHdpdGggaWRlbnRpY2FsIElEIHdpbGwgc2hhcmUgcmVzdWx0IGluIGlkZW50aWNhbCB0ZW1wbGF0ZS5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIGhhdmluZyBhIGhlYWRlciBjb2x1bW4gYW5kIGEgZm9vdGVyIGNvbHVtbiB3aXRoIHRoZSBzYW1lIGlkIHdpbGwgcmVzdWx0IGluIHRoZSBzYW1lIGNlbGwgcHJlc2VudGF0aW9uIGZvciBib3RoLlxuICAgKi9cbiAgaWQ6IHN0cmluZztcblxuICBsYWJlbD86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHR5cGUgb2YgdGhlIHZhbHVlcyBpbiB0aGlzIGNvbHVtbi5cbiAgICogVGhpcyBpcyBhbiBhZGRpdGlvbmFsIGxldmVsIGZvciBtYXRjaGluZyBjb2x1bW5zIHRvIHRlbXBsYXRlcywgZ3JvdXBpbmcgdGVtcGxhdGVzIGZvciBhIHR5cGUuXG4gICAqL1xuICB0eXBlPzogUGJsQ29sdW1uVHlwZURlZmluaXRpb247XG5cbiAgLyoqXG4gICAqIENTUyBjbGFzcyB0aGF0IGdldCBhcHBsaWVkIG9uIHRoZSBoZWFkZXIgYW5kIGNlbGwuXG4gICAqIFlvdSBjYW4gYXBwbHkgdW5pcXVlIGhlYWRlci9jZWxsIHN0eWxlcyB1c2luZyB0aGUgZWxlbWVudCBuYW1lLlxuICAgKi9cbiAgY3NzPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgd2lkdGggaW4gcHggb3IgJSBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDogIyMlIG9yICMjcHhcbiAgICogRXhhbXBsZXM6ICc1MCUnLCAnNTBweCdcbiAgICovXG4gIGdldCB3aWR0aCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH1cbiAgc2V0IHdpZHRoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3dpZHRoKSB7XG4gICAgICB0aGlzLl9wYXJzZWRXaWR0aCA9IHBhcnNlU3R5bGVXaWR0aCh0aGlzLl93aWR0aCA9IHZhbHVlKTtcbiAgICAgIGNvbnN0IGlzRml4ZWRXaWR0aCA9IHRoaXMuX3BhcnNlZFdpZHRoICYmIHRoaXMuX3BhcnNlZFdpZHRoLnR5cGUgPT09ICdweCc7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2lzRml4ZWRXaWR0aCcsIHsgdmFsdWU6IGlzRml4ZWRXaWR0aCwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogVGhpcyBtaW5pbXVtIHdpZHRoIGluIHBpeGVsc1xuICAgKiBUaGlzIGlzIGFuIGFic29sdXRlIHZhbHVlLCB0aHVzIGEgbnVtYmVyLlxuICAgKi9cbiAgbWluV2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGlzIG1heGltdW0gd2lkdGggaW4gcGl4ZWxzXG4gICAqIFRoaXMgaXMgYW4gYWJzb2x1dGUgdmFsdWUsIHRodXMgYSBudW1iZXIuXG4gICAqL1xuICBtYXhXaWR0aD86IG51bWJlcjtcblxuICAvKipcbiAgICogQSBwbGFjZSB0byBzdG9yZSB0aGluZ3MuLi5cbiAgICogVGhpcyBtdXN0IGJlIGFuIG9iamVjdCwgdmFsdWVzIGFyZSBzaGFkb3ctY29waWVkIHNvIHBlcnNpc3QgZGF0YSBiZXR3ZWVuIG11bHRpcGxlIHBsdWdpbnMuXG4gICAqL1xuICBkYXRhOiBhbnkgPSB7fTtcbiAgLy8jZW5kcmVnaW9uIFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudEJhc2VDb2x1bW5EZWZpbml0aW9uXG5cbiAgLy8jcmVnaW9uIFBibE1ldGFDb2x1bW5EZWZpbml0aW9uXG5cbiAga2luZDogJ2hlYWRlcicgfCAnZm9vdGVyJztcblxuICAvKipcbiAgICogVGhlIGluZGV4ICh6ZXJvIGJhc2VkKSBvZiB0aGUgaGVhZGVyIHJvdyB0aGlzIGNvbHVtbiBpcyBhdHRhY2hlZCB0bywgdXNlZCBmb3IgbXVsdGktaGVhZGVyIHNldHVwLlxuICAgKiBXaGVuIG5vdCBzZXQgKHVuZGVmaW5lZCkgdGhlIGluZGV4IGlzIGNvbnNpZGVyZWQgdGhlIExBU1QgaW5kZXguXG4gICAqXG4gICAqIElmIHlvdSB3YW50IHRvIHNldHVwIGEgbXVsdGkgaGVhZGVyIHRhYmxlIHdpdGggMiBoZWFkZXIgcm93cywgc2V0IHRoaXMgdG8gMCBmb3IgdGhlIGZpcnN0IGhlYWRlciByb3cgYW5kIGZvciB0aGUgMm5kIGhlYWRlclxuICAgKiByb3cgZG8gbm90IHNldCBhIHJvd0luZGV4LlxuICAgKi9cbiAgcm93SW5kZXg6IG51bWJlcjtcbi8vI2VuZHJlZ2lvbiBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvblxuXG4gIGdldCBwYXJzZWRXaWR0aCgpOiB7IHZhbHVlOiBudW1iZXI7IHR5cGU6ICdweCcgfCAnJScgfSB8IHVuZGVmaW5lZCB7IHJldHVybiB0aGlzLl9wYXJzZWRXaWR0aDsgfVxuXG4gIC8qKlxuICAgKiBVc2VkIGJ5IHBibC1uZ3JpZCB0byBhcHBseSBhIGN1c3RvbSBoZWFkZXIvZm9vdGVyIGNlbGwgdGVtcGxhdGUsIG9yIHRoZSBkZWZhdWx0IHdoZW4gbm90IHNldC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55Pj47XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSBpbmRpY2F0ZXMgdGhhdCB0aGUgd2lkdGggaXMgc2V0IHdpdGggdHlwZSBwaXhlbHMuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcmVhZG9ubHkgaXNGaXhlZFdpZHRoPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIGNvbHVtbiBkZWYgZm9yIHRoaXMgY29sdW1uLlxuICAgKi9cbiAgZ2V0IGNvbHVtbkRlZigpOiBQYmxOZ3JpZENvbHVtbkRlZjxQYmxNZXRhQ29sdW1uPiB7IHJldHVybiB0aGlzLl9jb2x1bW5EZWY7IH1cblxuICBwcml2YXRlIF93aWR0aD86IHN0cmluZztcbiAgcHJpdmF0ZSBfcGFyc2VkV2lkdGg6IFJldHVyblR5cGU8dHlwZW9mIHBhcnNlU3R5bGVXaWR0aD47XG4gIHByaXZhdGUgX2NvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY8UGJsTWV0YUNvbHVtbj47XG4gIHByaXZhdGUgZGVmYXVsdFdpZHRoID0gJyc7XG5cbiAgY29uc3RydWN0b3IoZGVmOiBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbikge1xuICAgIHRoaXNbUEJMX05HUklEX01FVEFfQ09MVU1OX01BUktdID0gdHJ1ZTtcbiAgICBpbml0RGVmaW5pdGlvbnMoZGVmLCB0aGlzKTtcblxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBDTE9ORV9QUk9QRVJUSUVTKSB7XG4gICAgICBpZiAocHJvcCBpbiBkZWYpIHtcbiAgICAgICAgdGhpc1twcm9wIGFzIGFueV0gPSBkZWZbcHJvcF1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWlzUGJsTWV0YUNvbHVtbihkZWYpKSB7XG4gICAgICBpZiAodHlwZW9mIGRlZi50eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLnR5cGUgPSB7IG5hbWU6IGRlZi50eXBlIH0gYXMgYW55O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBleHRlbmRQcm9wZXJ0eShuYW1lOiBrZXlvZiBQYmxNZXRhQ29sdW1uKTogdm9pZCB7XG4gICAgaWYgKENMT05FX1BST1BFUlRJRVMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgIENMT05FX1BST1BFUlRJRVMucHVzaChuYW1lKTtcbiAgICB9XG4gIH1cblxuICBhdHRhY2goY29sdW1uRGVmOiBQYmxOZ3JpZENvbHVtbkRlZjxQYmxNZXRhQ29sdW1uPik6IHZvaWQge1xuICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgdGhpcy5fY29sdW1uRGVmID0gY29sdW1uRGVmO1xuICAgIHRoaXMuY29sdW1uRGVmLnVwZGF0ZVdpZHRoKHRoaXMud2lkdGggfHwgdGhpcy5kZWZhdWx0V2lkdGgsICdhdHRhY2gnKTtcbiAgfVxuXG4gIGRldGFjaCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb2x1bW5EZWYgPSB1bmRlZmluZWQ7XG4gIH1cblxuICB1cGRhdGVXaWR0aChmYWxsYmFja0RlZmF1bHQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVmYXVsdFdpZHRoID0gZmFsbGJhY2tEZWZhdWx0IHx8ICcnO1xuICAgIGlmICh0aGlzLmNvbHVtbkRlZikge1xuICAgICAgdGhpcy5jb2x1bW5EZWYudXBkYXRlV2lkdGgodGhpcy53aWR0aCB8fCBmYWxsYmFja0RlZmF1bHQsICd1cGRhdGUnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==