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
    return def instanceof PblMetaColumn || def[PBL_NGRID_META_COLUMN_MARK] === true;
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
        this.columnDef.updateWidth(this.width || this.defaultWidth);
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
            this.columnDef.updateWidth(this.width || fallbackDefault);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1jb2x1bW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbHVtbnMvbWV0YS1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUtBLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDOztNQUVyRCwwQkFBMEIsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDOztNQUNwRCxnQkFBZ0IsR0FBK0IsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDOzs7OztBQUV6RSxNQUFNLFVBQVUsZUFBZSxDQUFDLEdBQTRCO0lBQzFELE9BQU8sR0FBRyxZQUFZLGFBQWEsSUFBSSxHQUFHLENBQUMsMEJBQTBCLENBQUMsS0FBSyxJQUFJLENBQUM7QUFDbEYsQ0FBQztBQUVELE1BQU0sT0FBTyxhQUFhOzs7O0lBOEZ4QixZQUFZLEdBQTRCOzs7OztRQXpDeEMsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQXVDUCxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUd4QixJQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDeEMsZUFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUzQixLQUFLLE1BQU0sSUFBSSxJQUFJLGdCQUFnQixFQUFFO1lBQ25DLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtnQkFDZixJQUFJLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDOUI7U0FDRjtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDekIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLG1CQUFBLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBTyxDQUFDO2FBQ3ZDO1NBQ0Y7SUFDSCxDQUFDOzs7Ozs7SUEvRUQsSUFBSSxLQUFLLEtBQWEsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDM0MsSUFBSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUM7O2tCQUNuRCxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksS0FBSyxJQUFJO1lBQ3pFLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDMUY7SUFDSCxDQUFDOzs7OztJQWlDRCxJQUFJLFdBQVcsS0FBc0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFpQmhHLElBQUksU0FBUyxLQUF1QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzs7OztJQXdCN0UsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUF5QjtRQUM3QyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN6QyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxTQUEyQztRQUNoRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7O0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLGVBQXVCO1FBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBZSxJQUFJLEVBQUUsQ0FBQztRQUMxQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxlQUFlLENBQUMsQ0FBQztTQUMzRDtJQUNILENBQUM7Q0FDRjs7Ozs7Ozs7OztJQTNIQywyQkFBVzs7SUFFWCw4QkFBZTs7Ozs7O0lBTWYsNkJBQStCOzs7Ozs7SUFNL0IsNEJBQWE7Ozs7OztJQWtCYixpQ0FBa0I7Ozs7OztJQUtsQixpQ0FBa0I7Ozs7OztJQU1sQiw2QkFBZTs7SUFLZiw2QkFBMEI7Ozs7Ozs7OztJQVMxQixpQ0FBaUI7Ozs7OztJQVNqQixpQ0FBb0Q7Ozs7OztJQU1wRCxxQ0FBZ0M7Ozs7O0lBT2hDLCtCQUF3Qjs7Ozs7SUFDeEIscUNBQXlEOzs7OztJQUN6RCxtQ0FBcUQ7Ozs7O0lBQ3JELHFDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uRGVmIH0gZnJvbSAnLi4vZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQvdHlwZXMnO1xuaW1wb3J0IHsgUGJsTWV0YUNvbHVtbkRlZmluaXRpb24sIFBibENvbHVtblR5cGVEZWZpbml0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBwYXJzZVN0eWxlV2lkdGgsIGluaXREZWZpbml0aW9ucyB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBQQkxfTkdSSURfTUVUQV9DT0xVTU5fTUFSSyA9IFN5bWJvbCgnUGJsTWV0YUNvbHVtbicpO1xuY29uc3QgQ0xPTkVfUFJPUEVSVElFUzogQXJyYXk8a2V5b2YgUGJsTWV0YUNvbHVtbj4gPSBbJ2tpbmQnLCAncm93SW5kZXgnXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGJsTWV0YUNvbHVtbihkZWY6IFBibE1ldGFDb2x1bW5EZWZpbml0aW9uKTogZGVmIGlzIFBibE1ldGFDb2x1bW4ge1xuICByZXR1cm4gZGVmIGluc3RhbmNlb2YgUGJsTWV0YUNvbHVtbiB8fCBkZWZbUEJMX05HUklEX01FVEFfQ09MVU1OX01BUktdID09PSB0cnVlO1xufVxuXG5leHBvcnQgY2xhc3MgUGJsTWV0YUNvbHVtbiBpbXBsZW1lbnRzIFBibE1ldGFDb2x1bW5EZWZpbml0aW9uIHtcbiAgLy8jcmVnaW9uIFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudEJhc2VDb2x1bW5EZWZpbml0aW9uXG5cbiAgIC8qKlxuICAgKiBBIFVuaXF1ZSBJRCBmb3IgdGhlIGNvbHVtbi5cbiAgICogVGhlIElEIG11c3QgYmUgdW5pcXVlIGFjcm9zcyBhbGwgY29sdW1ucywgcmVnYXJkbGVzcyBvZiB0aGUgdHlwZS5cbiAgICogQ29sdW1ucyB3aXRoIGlkZW50aWNhbCBJRCB3aWxsIHNoYXJlIHJlc3VsdCBpbiBpZGVudGljYWwgdGVtcGxhdGUuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBoYXZpbmcgYSBoZWFkZXIgY29sdW1uIGFuZCBhIGZvb3RlciBjb2x1bW4gd2l0aCB0aGUgc2FtZSBpZCB3aWxsIHJlc3VsdCBpbiB0aGUgc2FtZSBjZWxsIHByZXNlbnRhdGlvbiBmb3IgYm90aC5cbiAgICovXG4gIGlkOiBzdHJpbmc7XG5cbiAgbGFiZWw/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB0eXBlIG9mIHRoZSB2YWx1ZXMgaW4gdGhpcyBjb2x1bW4uXG4gICAqIFRoaXMgaXMgYW4gYWRkaXRpb25hbCBsZXZlbCBmb3IgbWF0Y2hpbmcgY29sdW1ucyB0byB0ZW1wbGF0ZXMsIGdyb3VwaW5nIHRlbXBsYXRlcyBmb3IgYSB0eXBlLlxuICAgKi9cbiAgdHlwZT86IFBibENvbHVtblR5cGVEZWZpbml0aW9uO1xuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgdGhhdCBnZXQgYXBwbGllZCBvbiB0aGUgaGVhZGVyIGFuZCBjZWxsLlxuICAgKiBZb3UgY2FuIGFwcGx5IHVuaXF1ZSBoZWFkZXIvY2VsbCBzdHlsZXMgdXNpbmcgdGhlIGVsZW1lbnQgbmFtZS5cbiAgICovXG4gIGNzcz86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHdpZHRoIGluIHB4IG9yICUgaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6ICMjJSBvciAjI3B4XG4gICAqIEV4YW1wbGVzOiAnNTAlJywgJzUwcHgnXG4gICAqL1xuICBnZXQgd2lkdGgoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9XG4gIHNldCB3aWR0aCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl93aWR0aCkge1xuICAgICAgdGhpcy5fcGFyc2VkV2lkdGggPSBwYXJzZVN0eWxlV2lkdGgodGhpcy5fd2lkdGggPSB2YWx1ZSk7XG4gICAgICBjb25zdCBpc0ZpeGVkV2lkdGggPSB0aGlzLl9wYXJzZWRXaWR0aCAmJiB0aGlzLl9wYXJzZWRXaWR0aC50eXBlID09PSAncHgnO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdpc0ZpeGVkV2lkdGgnLCB7IHZhbHVlOiBpc0ZpeGVkV2lkdGgsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFRoaXMgbWluaW11bSB3aWR0aCBpbiBwaXhlbHNcbiAgICogVGhpcyBpcyBhbiBhYnNvbHV0ZSB2YWx1ZSwgdGh1cyBhIG51bWJlci5cbiAgICovXG4gIG1pbldpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhpcyBtYXhpbXVtIHdpZHRoIGluIHBpeGVsc1xuICAgKiBUaGlzIGlzIGFuIGFic29sdXRlIHZhbHVlLCB0aHVzIGEgbnVtYmVyLlxuICAgKi9cbiAgbWF4V2lkdGg/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgcGxhY2UgdG8gc3RvcmUgdGhpbmdzLi4uXG4gICAqIFRoaXMgbXVzdCBiZSBhbiBvYmplY3QsIHZhbHVlcyBhcmUgc2hhZG93LWNvcGllZCBzbyBwZXJzaXN0IGRhdGEgYmV0d2VlbiBtdWx0aXBsZSBwbHVnaW5zLlxuICAgKi9cbiAgZGF0YTogYW55ID0ge307XG4gIC8vI2VuZHJlZ2lvbiBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnRCYXNlQ29sdW1uRGVmaW5pdGlvblxuXG4gIC8vI3JlZ2lvbiBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvblxuXG4gIGtpbmQ6ICdoZWFkZXInIHwgJ2Zvb3Rlcic7XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCAoemVybyBiYXNlZCkgb2YgdGhlIGhlYWRlciByb3cgdGhpcyBjb2x1bW4gaXMgYXR0YWNoZWQgdG8sIHVzZWQgZm9yIG11bHRpLWhlYWRlciBzZXR1cC5cbiAgICogV2hlbiBub3Qgc2V0ICh1bmRlZmluZWQpIHRoZSBpbmRleCBpcyBjb25zaWRlcmVkIHRoZSBMQVNUIGluZGV4LlxuICAgKlxuICAgKiBJZiB5b3Ugd2FudCB0byBzZXR1cCBhIG11bHRpIGhlYWRlciB0YWJsZSB3aXRoIDIgaGVhZGVyIHJvd3MsIHNldCB0aGlzIHRvIDAgZm9yIHRoZSBmaXJzdCBoZWFkZXIgcm93IGFuZCBmb3IgdGhlIDJuZCBoZWFkZXJcbiAgICogcm93IGRvIG5vdCBzZXQgYSByb3dJbmRleC5cbiAgICovXG4gIHJvd0luZGV4OiBudW1iZXI7XG4vLyNlbmRyZWdpb24gUGJsTWV0YUNvbHVtbkRlZmluaXRpb25cblxuICBnZXQgcGFyc2VkV2lkdGgoKTogeyB2YWx1ZTogbnVtYmVyOyB0eXBlOiAncHgnIHwgJyUnIH0gfCB1bmRlZmluZWQgeyByZXR1cm4gdGhpcy5fcGFyc2VkV2lkdGg7IH1cblxuICAvKipcbiAgICogVXNlZCBieSBwYmwtbmdyaWQgdG8gYXBwbHkgYSBjdXN0b20gaGVhZGVyL2Zvb3RlciBjZWxsIHRlbXBsYXRlLCBvciB0aGUgZGVmYXVsdCB3aGVuIG5vdCBzZXQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueT4+O1xuXG4gIC8qKlxuICAgKiBXaGVuIHRydWUgaW5kaWNhdGVzIHRoYXQgdGhlIHdpZHRoIGlzIHNldCB3aXRoIHR5cGUgcGl4ZWxzLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHJlYWRvbmx5IGlzRml4ZWRXaWR0aD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBjb2x1bW4gZGVmIGZvciB0aGlzIGNvbHVtbi5cbiAgICovXG4gIGdldCBjb2x1bW5EZWYoKTogUGJsTmdyaWRDb2x1bW5EZWY8UGJsTWV0YUNvbHVtbj4geyByZXR1cm4gdGhpcy5fY29sdW1uRGVmOyB9XG5cbiAgcHJpdmF0ZSBfd2lkdGg/OiBzdHJpbmc7XG4gIHByaXZhdGUgX3BhcnNlZFdpZHRoOiBSZXR1cm5UeXBlPHR5cGVvZiBwYXJzZVN0eWxlV2lkdGg+O1xuICBwcml2YXRlIF9jb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmPFBibE1ldGFDb2x1bW4+O1xuICBwcml2YXRlIGRlZmF1bHRXaWR0aCA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKGRlZjogUGJsTWV0YUNvbHVtbkRlZmluaXRpb24pIHtcbiAgICB0aGlzW1BCTF9OR1JJRF9NRVRBX0NPTFVNTl9NQVJLXSA9IHRydWU7XG4gICAgaW5pdERlZmluaXRpb25zKGRlZiwgdGhpcyk7XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgQ0xPTkVfUFJPUEVSVElFUykge1xuICAgICAgaWYgKHByb3AgaW4gZGVmKSB7XG4gICAgICAgIHRoaXNbcHJvcCBhcyBhbnldID0gZGVmW3Byb3BdXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpc1BibE1ldGFDb2x1bW4oZGVmKSkge1xuICAgICAgaWYgKHR5cGVvZiBkZWYudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy50eXBlID0geyBuYW1lOiBkZWYudHlwZSB9IGFzIGFueTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZXh0ZW5kUHJvcGVydHkobmFtZToga2V5b2YgUGJsTWV0YUNvbHVtbik6IHZvaWQge1xuICAgIGlmIChDTE9ORV9QUk9QRVJUSUVTLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICBDTE9ORV9QUk9QRVJUSUVTLnB1c2gobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYXR0YWNoKGNvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY8UGJsTWV0YUNvbHVtbj4pOiB2b2lkIHtcbiAgICB0aGlzLmRldGFjaCgpO1xuICAgIHRoaXMuX2NvbHVtbkRlZiA9IGNvbHVtbkRlZjtcbiAgICB0aGlzLmNvbHVtbkRlZi51cGRhdGVXaWR0aCh0aGlzLndpZHRoIHx8IHRoaXMuZGVmYXVsdFdpZHRoKTtcbiAgfVxuXG4gIGRldGFjaCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb2x1bW5EZWYgPSB1bmRlZmluZWQ7XG4gIH1cblxuICB1cGRhdGVXaWR0aChmYWxsYmFja0RlZmF1bHQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVmYXVsdFdpZHRoID0gZmFsbGJhY2tEZWZhdWx0IHx8ICcnO1xuICAgIGlmICh0aGlzLmNvbHVtbkRlZikge1xuICAgICAgdGhpcy5jb2x1bW5EZWYudXBkYXRlV2lkdGgodGhpcy53aWR0aCB8fCBmYWxsYmFja0RlZmF1bHQpO1xuICAgIH1cbiAgfVxufVxuIl19