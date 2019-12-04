/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { parseStyleWidth, initDefinitions } from './utils';
/** @type {?} */
const PBL_NGRID_META_COLUMN_MARK = Symbol('PblMetaColumn');
/** @type {?} */
const CLONE_PROPERTIES = ['kind', 'rowIndex'];
/**
 * @param {?} def
 * @return {?}
 */
export function isPblMetaColumn(def) {
    return def instanceof PblMetaColumn || (def && def[PBL_NGRID_META_COLUMN_MARK] === true);
}
export class PblMetaColumn {
    /**
     * @param {?} def
     */
    constructor(def) {
        /**
         * A place to store things...
         * This must be an object, values are shadow-copied so persist data between multiple plugins.
         */
        this.data = {};
        this.defaultWidth = '';
        this[PBL_NGRID_META_COLUMN_MARK] = true;
        initDefinitions(def, this);
        for (const prop of CLONE_PROPERTIES) {
            if (prop in def) {
                this[(/** @type {?} */ (prop))] = def[prop];
            }
        }
        if (!isPblMetaColumn(def)) {
            if (typeof def.type === 'string') {
                this.type = (/** @type {?} */ ({ name: def.type }));
            }
        }
    }
    /**
     * The width in px or % in the following format: ##% or ##px
     * Examples: '50%', '50px'
     * @return {?}
     */
    get width() { return this._width; }
    /**
     * @param {?} value
     * @return {?}
     */
    set width(value) {
        if (value !== this._width) {
            this._parsedWidth = parseStyleWidth(this._width = value);
            /** @type {?} */
            const isFixedWidth = this._parsedWidth && this._parsedWidth.type === 'px';
            Object.defineProperty(this, 'isFixedWidth', { value: isFixedWidth, configurable: true });
        }
    }
    //#endregion PblMetaColumnDefinition
    /**
     * @return {?}
     */
    get parsedWidth() { return this._parsedWidth; }
    /**
     * The column def for this column.
     * @return {?}
     */
    get columnDef() { return this._columnDef; }
    /**
     * @param {?} name
     * @return {?}
     */
    static extendProperty(name) {
        if (CLONE_PROPERTIES.indexOf(name) === -1) {
            CLONE_PROPERTIES.push(name);
        }
    }
    /**
     * @param {?} columnDef
     * @return {?}
     */
    attach(columnDef) {
        this.detach();
        this._columnDef = columnDef;
        this.columnDef.updateWidth(this.width || this.defaultWidth, 'attach');
    }
    /**
     * @return {?}
     */
    detach() {
        this._columnDef = undefined;
    }
    /**
     * @param {?} fallbackDefault
     * @return {?}
     */
    updateWidth(fallbackDefault) {
        this.defaultWidth = fallbackDefault || '';
        if (this.columnDef) {
            this.columnDef.updateWidth(this.width || fallbackDefault, 'update');
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1jb2x1bW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvY29sdW1ucy9tZXRhLWNvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBS0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7O01BRXJELDBCQUEwQixHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7O01BQ3BELGdCQUFnQixHQUErQixDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUM7Ozs7O0FBRXpFLE1BQU0sVUFBVSxlQUFlLENBQUMsR0FBUTtJQUN0QyxPQUFPLEdBQUcsWUFBWSxhQUFhLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLDBCQUEwQixDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7QUFDM0YsQ0FBQztBQUVELE1BQU0sT0FBTyxhQUFhOzs7O0lBOEZ4QixZQUFZLEdBQTRCOzs7OztRQXpDeEMsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQXVDUCxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUd4QixJQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDeEMsZUFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUzQixLQUFLLE1BQU0sSUFBSSxJQUFJLGdCQUFnQixFQUFFO1lBQ25DLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtnQkFDZixJQUFJLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDOUI7U0FDRjtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDekIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLG1CQUFBLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBTyxDQUFDO2FBQ3ZDO1NBQ0Y7SUFDSCxDQUFDOzs7Ozs7SUEvRUQsSUFBSSxLQUFLLEtBQWEsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDM0MsSUFBSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUM7O2tCQUNuRCxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksS0FBSyxJQUFJO1lBQ3pFLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDMUY7SUFDSCxDQUFDOzs7OztJQWlDRCxJQUFJLFdBQVcsS0FBc0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFpQmhHLElBQUksU0FBUyxLQUF1QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzs7OztJQXdCN0UsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUF5QjtRQUM3QyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN6QyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxTQUEyQztRQUNoRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7OztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxlQUF1QjtRQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFDMUMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0gsQ0FBQztDQUNGOzs7Ozs7Ozs7O0lBM0hDLDJCQUFXOztJQUVYLDhCQUFlOzs7Ozs7SUFNZiw2QkFBK0I7Ozs7OztJQU0vQiw0QkFBYTs7Ozs7O0lBa0JiLGlDQUFrQjs7Ozs7O0lBS2xCLGlDQUFrQjs7Ozs7O0lBTWxCLDZCQUFlOztJQUtmLDZCQUEwQjs7Ozs7Ozs7O0lBUzFCLGlDQUFpQjs7Ozs7O0lBU2pCLGlDQUFvRDs7Ozs7O0lBTXBELHFDQUFnQzs7Ozs7SUFPaEMsK0JBQXdCOzs7OztJQUN4QixxQ0FBeUQ7Ozs7O0lBQ3pELG1DQUFxRDs7Ozs7SUFDckQscUNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb2x1bW5EZWYgfSBmcm9tICcuLi9kaXJlY3RpdmVzJztcbmltcG9ydCB7IFBibE5ncmlkTWV0YUNlbGxDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dC90eXBlcyc7XG5pbXBvcnQgeyBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiwgUGJsQ29sdW1uVHlwZURlZmluaXRpb24gfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IHBhcnNlU3R5bGVXaWR0aCwgaW5pdERlZmluaXRpb25zIH0gZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IFBCTF9OR1JJRF9NRVRBX0NPTFVNTl9NQVJLID0gU3ltYm9sKCdQYmxNZXRhQ29sdW1uJyk7XG5jb25zdCBDTE9ORV9QUk9QRVJUSUVTOiBBcnJheTxrZXlvZiBQYmxNZXRhQ29sdW1uPiA9IFsna2luZCcsICdyb3dJbmRleCddO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNQYmxNZXRhQ29sdW1uKGRlZjogYW55KTogZGVmIGlzIFBibE1ldGFDb2x1bW4ge1xuICByZXR1cm4gZGVmIGluc3RhbmNlb2YgUGJsTWV0YUNvbHVtbiB8fCAoZGVmICYmIGRlZltQQkxfTkdSSURfTUVUQV9DT0xVTU5fTUFSS10gPT09IHRydWUpO1xufVxuXG5leHBvcnQgY2xhc3MgUGJsTWV0YUNvbHVtbiBpbXBsZW1lbnRzIFBibE1ldGFDb2x1bW5EZWZpbml0aW9uIHtcbiAgLy8jcmVnaW9uIFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudEJhc2VDb2x1bW5EZWZpbml0aW9uXG5cbiAgIC8qKlxuICAgKiBBIFVuaXF1ZSBJRCBmb3IgdGhlIGNvbHVtbi5cbiAgICogVGhlIElEIG11c3QgYmUgdW5pcXVlIGFjcm9zcyBhbGwgY29sdW1ucywgcmVnYXJkbGVzcyBvZiB0aGUgdHlwZS5cbiAgICogQ29sdW1ucyB3aXRoIGlkZW50aWNhbCBJRCB3aWxsIHNoYXJlIHJlc3VsdCBpbiBpZGVudGljYWwgdGVtcGxhdGUuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBoYXZpbmcgYSBoZWFkZXIgY29sdW1uIGFuZCBhIGZvb3RlciBjb2x1bW4gd2l0aCB0aGUgc2FtZSBpZCB3aWxsIHJlc3VsdCBpbiB0aGUgc2FtZSBjZWxsIHByZXNlbnRhdGlvbiBmb3IgYm90aC5cbiAgICovXG4gIGlkOiBzdHJpbmc7XG5cbiAgbGFiZWw/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB0eXBlIG9mIHRoZSB2YWx1ZXMgaW4gdGhpcyBjb2x1bW4uXG4gICAqIFRoaXMgaXMgYW4gYWRkaXRpb25hbCBsZXZlbCBmb3IgbWF0Y2hpbmcgY29sdW1ucyB0byB0ZW1wbGF0ZXMsIGdyb3VwaW5nIHRlbXBsYXRlcyBmb3IgYSB0eXBlLlxuICAgKi9cbiAgdHlwZT86IFBibENvbHVtblR5cGVEZWZpbml0aW9uO1xuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgdGhhdCBnZXQgYXBwbGllZCBvbiB0aGUgaGVhZGVyIGFuZCBjZWxsLlxuICAgKiBZb3UgY2FuIGFwcGx5IHVuaXF1ZSBoZWFkZXIvY2VsbCBzdHlsZXMgdXNpbmcgdGhlIGVsZW1lbnQgbmFtZS5cbiAgICovXG4gIGNzcz86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHdpZHRoIGluIHB4IG9yICUgaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6ICMjJSBvciAjI3B4XG4gICAqIEV4YW1wbGVzOiAnNTAlJywgJzUwcHgnXG4gICAqL1xuICBnZXQgd2lkdGgoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9XG4gIHNldCB3aWR0aCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl93aWR0aCkge1xuICAgICAgdGhpcy5fcGFyc2VkV2lkdGggPSBwYXJzZVN0eWxlV2lkdGgodGhpcy5fd2lkdGggPSB2YWx1ZSk7XG4gICAgICBjb25zdCBpc0ZpeGVkV2lkdGggPSB0aGlzLl9wYXJzZWRXaWR0aCAmJiB0aGlzLl9wYXJzZWRXaWR0aC50eXBlID09PSAncHgnO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdpc0ZpeGVkV2lkdGgnLCB7IHZhbHVlOiBpc0ZpeGVkV2lkdGgsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFRoaXMgbWluaW11bSB3aWR0aCBpbiBwaXhlbHNcbiAgICogVGhpcyBpcyBhbiBhYnNvbHV0ZSB2YWx1ZSwgdGh1cyBhIG51bWJlci5cbiAgICovXG4gIG1pbldpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhpcyBtYXhpbXVtIHdpZHRoIGluIHBpeGVsc1xuICAgKiBUaGlzIGlzIGFuIGFic29sdXRlIHZhbHVlLCB0aHVzIGEgbnVtYmVyLlxuICAgKi9cbiAgbWF4V2lkdGg/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgcGxhY2UgdG8gc3RvcmUgdGhpbmdzLi4uXG4gICAqIFRoaXMgbXVzdCBiZSBhbiBvYmplY3QsIHZhbHVlcyBhcmUgc2hhZG93LWNvcGllZCBzbyBwZXJzaXN0IGRhdGEgYmV0d2VlbiBtdWx0aXBsZSBwbHVnaW5zLlxuICAgKi9cbiAgZGF0YTogYW55ID0ge307XG4gIC8vI2VuZHJlZ2lvbiBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnRCYXNlQ29sdW1uRGVmaW5pdGlvblxuXG4gIC8vI3JlZ2lvbiBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvblxuXG4gIGtpbmQ6ICdoZWFkZXInIHwgJ2Zvb3Rlcic7XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCAoemVybyBiYXNlZCkgb2YgdGhlIGhlYWRlciByb3cgdGhpcyBjb2x1bW4gaXMgYXR0YWNoZWQgdG8sIHVzZWQgZm9yIG11bHRpLWhlYWRlciBzZXR1cC5cbiAgICogV2hlbiBub3Qgc2V0ICh1bmRlZmluZWQpIHRoZSBpbmRleCBpcyBjb25zaWRlcmVkIHRoZSBMQVNUIGluZGV4LlxuICAgKlxuICAgKiBJZiB5b3Ugd2FudCB0byBzZXR1cCBhIG11bHRpIGhlYWRlciBncmlkIHdpdGggMiBoZWFkZXIgcm93cywgc2V0IHRoaXMgdG8gMCBmb3IgdGhlIGZpcnN0IGhlYWRlciByb3cgYW5kIGZvciB0aGUgMm5kIGhlYWRlclxuICAgKiByb3cgZG8gbm90IHNldCBhIHJvd0luZGV4LlxuICAgKi9cbiAgcm93SW5kZXg6IG51bWJlcjtcbi8vI2VuZHJlZ2lvbiBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvblxuXG4gIGdldCBwYXJzZWRXaWR0aCgpOiB7IHZhbHVlOiBudW1iZXI7IHR5cGU6ICdweCcgfCAnJScgfSB8IHVuZGVmaW5lZCB7IHJldHVybiB0aGlzLl9wYXJzZWRXaWR0aDsgfVxuXG4gIC8qKlxuICAgKiBVc2VkIGJ5IHBibC1uZ3JpZCB0byBhcHBseSBhIGN1c3RvbSBoZWFkZXIvZm9vdGVyIGNlbGwgdGVtcGxhdGUsIG9yIHRoZSBkZWZhdWx0IHdoZW4gbm90IHNldC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55Pj47XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSBpbmRpY2F0ZXMgdGhhdCB0aGUgd2lkdGggaXMgc2V0IHdpdGggdHlwZSBwaXhlbHMuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcmVhZG9ubHkgaXNGaXhlZFdpZHRoPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIGNvbHVtbiBkZWYgZm9yIHRoaXMgY29sdW1uLlxuICAgKi9cbiAgZ2V0IGNvbHVtbkRlZigpOiBQYmxOZ3JpZENvbHVtbkRlZjxQYmxNZXRhQ29sdW1uPiB7IHJldHVybiB0aGlzLl9jb2x1bW5EZWY7IH1cblxuICBwcml2YXRlIF93aWR0aD86IHN0cmluZztcbiAgcHJpdmF0ZSBfcGFyc2VkV2lkdGg6IFJldHVyblR5cGU8dHlwZW9mIHBhcnNlU3R5bGVXaWR0aD47XG4gIHByaXZhdGUgX2NvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY8UGJsTWV0YUNvbHVtbj47XG4gIHByaXZhdGUgZGVmYXVsdFdpZHRoID0gJyc7XG5cbiAgY29uc3RydWN0b3IoZGVmOiBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbikge1xuICAgIHRoaXNbUEJMX05HUklEX01FVEFfQ09MVU1OX01BUktdID0gdHJ1ZTtcbiAgICBpbml0RGVmaW5pdGlvbnMoZGVmLCB0aGlzKTtcblxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBDTE9ORV9QUk9QRVJUSUVTKSB7XG4gICAgICBpZiAocHJvcCBpbiBkZWYpIHtcbiAgICAgICAgdGhpc1twcm9wIGFzIGFueV0gPSBkZWZbcHJvcF1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWlzUGJsTWV0YUNvbHVtbihkZWYpKSB7XG4gICAgICBpZiAodHlwZW9mIGRlZi50eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLnR5cGUgPSB7IG5hbWU6IGRlZi50eXBlIH0gYXMgYW55O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBleHRlbmRQcm9wZXJ0eShuYW1lOiBrZXlvZiBQYmxNZXRhQ29sdW1uKTogdm9pZCB7XG4gICAgaWYgKENMT05FX1BST1BFUlRJRVMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgIENMT05FX1BST1BFUlRJRVMucHVzaChuYW1lKTtcbiAgICB9XG4gIH1cblxuICBhdHRhY2goY29sdW1uRGVmOiBQYmxOZ3JpZENvbHVtbkRlZjxQYmxNZXRhQ29sdW1uPik6IHZvaWQge1xuICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgdGhpcy5fY29sdW1uRGVmID0gY29sdW1uRGVmO1xuICAgIHRoaXMuY29sdW1uRGVmLnVwZGF0ZVdpZHRoKHRoaXMud2lkdGggfHwgdGhpcy5kZWZhdWx0V2lkdGgsICdhdHRhY2gnKTtcbiAgfVxuXG4gIGRldGFjaCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb2x1bW5EZWYgPSB1bmRlZmluZWQ7XG4gIH1cblxuICB1cGRhdGVXaWR0aChmYWxsYmFja0RlZmF1bHQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVmYXVsdFdpZHRoID0gZmFsbGJhY2tEZWZhdWx0IHx8ICcnO1xuICAgIGlmICh0aGlzLmNvbHVtbkRlZikge1xuICAgICAgdGhpcy5jb2x1bW5EZWYudXBkYXRlV2lkdGgodGhpcy53aWR0aCB8fCBmYWxsYmFja0RlZmF1bHQsICd1cGRhdGUnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==