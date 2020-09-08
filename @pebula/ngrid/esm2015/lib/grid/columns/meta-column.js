/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/columns/meta-column.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1jb2x1bW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvY29sdW1ucy9tZXRhLWNvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUtBLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDOztNQUVyRCwwQkFBMEIsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDOztNQUNwRCxnQkFBZ0IsR0FBK0IsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDOzs7OztBQUV6RSxNQUFNLFVBQVUsZUFBZSxDQUFDLEdBQVE7SUFDdEMsT0FBTyxHQUFHLFlBQVksYUFBYSxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQzNGLENBQUM7QUFFRCxNQUFNLE9BQU8sYUFBYTs7OztJQThGeEIsWUFBWSxHQUE0Qjs7Ozs7UUF6Q3hDLFNBQUksR0FBUSxFQUFFLENBQUM7UUF1Q1AsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFHeEIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3hDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFM0IsS0FBSyxNQUFNLElBQUksSUFBSSxnQkFBZ0IsRUFBRTtZQUNuQyxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQzlCO1NBQ0Y7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxtQkFBQSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQU8sQ0FBQzthQUN2QztTQUNGO0lBQ0gsQ0FBQzs7Ozs7O0lBL0VELElBQUksS0FBSyxLQUFhLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQzNDLElBQUksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDOztrQkFDbkQsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUssSUFBSTtZQUN6RSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzFGO0lBQ0gsQ0FBQzs7Ozs7SUFpQ0QsSUFBSSxXQUFXLEtBQXNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Ozs7O0lBaUJoRyxJQUFJLFNBQVMsS0FBdUMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUF3QjdFLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBeUI7UUFDN0MsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDekMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsU0FBMkM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Ozs7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsZUFBdUI7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLElBQUksRUFBRSxDQUFDO1FBQzFDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNyRTtJQUNILENBQUM7Q0FDRjs7Ozs7Ozs7OztJQTNIQywyQkFBVzs7SUFFWCw4QkFBZTs7Ozs7O0lBTWYsNkJBQStCOzs7Ozs7SUFNL0IsNEJBQWE7Ozs7OztJQWtCYixpQ0FBa0I7Ozs7OztJQUtsQixpQ0FBa0I7Ozs7OztJQU1sQiw2QkFBZTs7SUFLZiw2QkFBMEI7Ozs7Ozs7OztJQVMxQixpQ0FBaUI7Ozs7OztJQVNqQixpQ0FBb0Q7Ozs7OztJQU1wRCxxQ0FBZ0M7Ozs7O0lBT2hDLCtCQUF3Qjs7Ozs7SUFDeEIscUNBQXlEOzs7OztJQUN6RCxtQ0FBcUQ7Ozs7O0lBQ3JELHFDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uRGVmIH0gZnJvbSAnLi4vZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQvdHlwZXMnO1xuaW1wb3J0IHsgUGJsTWV0YUNvbHVtbkRlZmluaXRpb24sIFBibENvbHVtblR5cGVEZWZpbml0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBwYXJzZVN0eWxlV2lkdGgsIGluaXREZWZpbml0aW9ucyB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBQQkxfTkdSSURfTUVUQV9DT0xVTU5fTUFSSyA9IFN5bWJvbCgnUGJsTWV0YUNvbHVtbicpO1xuY29uc3QgQ0xPTkVfUFJPUEVSVElFUzogQXJyYXk8a2V5b2YgUGJsTWV0YUNvbHVtbj4gPSBbJ2tpbmQnLCAncm93SW5kZXgnXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGJsTWV0YUNvbHVtbihkZWY6IGFueSk6IGRlZiBpcyBQYmxNZXRhQ29sdW1uIHtcbiAgcmV0dXJuIGRlZiBpbnN0YW5jZW9mIFBibE1ldGFDb2x1bW4gfHwgKGRlZiAmJiBkZWZbUEJMX05HUklEX01FVEFfQ09MVU1OX01BUktdID09PSB0cnVlKTtcbn1cblxuZXhwb3J0IGNsYXNzIFBibE1ldGFDb2x1bW4gaW1wbGVtZW50cyBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiB7XG4gIC8vI3JlZ2lvbiBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnRCYXNlQ29sdW1uRGVmaW5pdGlvblxuXG4gICAvKipcbiAgICogQSBVbmlxdWUgSUQgZm9yIHRoZSBjb2x1bW4uXG4gICAqIFRoZSBJRCBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3MgYWxsIGNvbHVtbnMsIHJlZ2FyZGxlc3Mgb2YgdGhlIHR5cGUuXG4gICAqIENvbHVtbnMgd2l0aCBpZGVudGljYWwgSUQgd2lsbCBzaGFyZSByZXN1bHQgaW4gaWRlbnRpY2FsIHRlbXBsYXRlLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgaGF2aW5nIGEgaGVhZGVyIGNvbHVtbiBhbmQgYSBmb290ZXIgY29sdW1uIHdpdGggdGhlIHNhbWUgaWQgd2lsbCByZXN1bHQgaW4gdGhlIHNhbWUgY2VsbCBwcmVzZW50YXRpb24gZm9yIGJvdGguXG4gICAqL1xuICBpZDogc3RyaW5nO1xuXG4gIGxhYmVsPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB0aGUgdmFsdWVzIGluIHRoaXMgY29sdW1uLlxuICAgKiBUaGlzIGlzIGFuIGFkZGl0aW9uYWwgbGV2ZWwgZm9yIG1hdGNoaW5nIGNvbHVtbnMgdG8gdGVtcGxhdGVzLCBncm91cGluZyB0ZW1wbGF0ZXMgZm9yIGEgdHlwZS5cbiAgICovXG4gIHR5cGU/OiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbjtcblxuICAvKipcbiAgICogQ1NTIGNsYXNzIHRoYXQgZ2V0IGFwcGxpZWQgb24gdGhlIGhlYWRlciBhbmQgY2VsbC5cbiAgICogWW91IGNhbiBhcHBseSB1bmlxdWUgaGVhZGVyL2NlbGwgc3R5bGVzIHVzaW5nIHRoZSBlbGVtZW50IG5hbWUuXG4gICAqL1xuICBjc3M/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBpbiBweCBvciAlIGluIHRoZSBmb2xsb3dpbmcgZm9ybWF0OiAjIyUgb3IgIyNweFxuICAgKiBFeGFtcGxlczogJzUwJScsICc1MHB4J1xuICAgKi9cbiAgZ2V0IHdpZHRoKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl93aWR0aDsgfVxuICBzZXQgd2lkdGgodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fd2lkdGgpIHtcbiAgICAgIHRoaXMuX3BhcnNlZFdpZHRoID0gcGFyc2VTdHlsZVdpZHRoKHRoaXMuX3dpZHRoID0gdmFsdWUpO1xuICAgICAgY29uc3QgaXNGaXhlZFdpZHRoID0gdGhpcy5fcGFyc2VkV2lkdGggJiYgdGhpcy5fcGFyc2VkV2lkdGgudHlwZSA9PT0gJ3B4JztcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaXNGaXhlZFdpZHRoJywgeyB2YWx1ZTogaXNGaXhlZFdpZHRoLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBUaGlzIG1pbmltdW0gd2lkdGggaW4gcGl4ZWxzXG4gICAqIFRoaXMgaXMgYW4gYWJzb2x1dGUgdmFsdWUsIHRodXMgYSBudW1iZXIuXG4gICAqL1xuICBtaW5XaWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoaXMgbWF4aW11bSB3aWR0aCBpbiBwaXhlbHNcbiAgICogVGhpcyBpcyBhbiBhYnNvbHV0ZSB2YWx1ZSwgdGh1cyBhIG51bWJlci5cbiAgICovXG4gIG1heFdpZHRoPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIHBsYWNlIHRvIHN0b3JlIHRoaW5ncy4uLlxuICAgKiBUaGlzIG11c3QgYmUgYW4gb2JqZWN0LCB2YWx1ZXMgYXJlIHNoYWRvdy1jb3BpZWQgc28gcGVyc2lzdCBkYXRhIGJldHdlZW4gbXVsdGlwbGUgcGx1Z2lucy5cbiAgICovXG4gIGRhdGE6IGFueSA9IHt9O1xuICAvLyNlbmRyZWdpb24gUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50QmFzZUNvbHVtbkRlZmluaXRpb25cblxuICAvLyNyZWdpb24gUGJsTWV0YUNvbHVtbkRlZmluaXRpb25cblxuICBraW5kOiAnaGVhZGVyJyB8ICdmb290ZXInO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggKHplcm8gYmFzZWQpIG9mIHRoZSBoZWFkZXIgcm93IHRoaXMgY29sdW1uIGlzIGF0dGFjaGVkIHRvLCB1c2VkIGZvciBtdWx0aS1oZWFkZXIgc2V0dXAuXG4gICAqIFdoZW4gbm90IHNldCAodW5kZWZpbmVkKSB0aGUgaW5kZXggaXMgY29uc2lkZXJlZCB0aGUgTEFTVCBpbmRleC5cbiAgICpcbiAgICogSWYgeW91IHdhbnQgdG8gc2V0dXAgYSBtdWx0aSBoZWFkZXIgZ3JpZCB3aXRoIDIgaGVhZGVyIHJvd3MsIHNldCB0aGlzIHRvIDAgZm9yIHRoZSBmaXJzdCBoZWFkZXIgcm93IGFuZCBmb3IgdGhlIDJuZCBoZWFkZXJcbiAgICogcm93IGRvIG5vdCBzZXQgYSByb3dJbmRleC5cbiAgICovXG4gIHJvd0luZGV4OiBudW1iZXI7XG4vLyNlbmRyZWdpb24gUGJsTWV0YUNvbHVtbkRlZmluaXRpb25cblxuICBnZXQgcGFyc2VkV2lkdGgoKTogeyB2YWx1ZTogbnVtYmVyOyB0eXBlOiAncHgnIHwgJyUnIH0gfCB1bmRlZmluZWQgeyByZXR1cm4gdGhpcy5fcGFyc2VkV2lkdGg7IH1cblxuICAvKipcbiAgICogVXNlZCBieSBwYmwtbmdyaWQgdG8gYXBwbHkgYSBjdXN0b20gaGVhZGVyL2Zvb3RlciBjZWxsIHRlbXBsYXRlLCBvciB0aGUgZGVmYXVsdCB3aGVuIG5vdCBzZXQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueT4+O1xuXG4gIC8qKlxuICAgKiBXaGVuIHRydWUgaW5kaWNhdGVzIHRoYXQgdGhlIHdpZHRoIGlzIHNldCB3aXRoIHR5cGUgcGl4ZWxzLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHJlYWRvbmx5IGlzRml4ZWRXaWR0aD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBjb2x1bW4gZGVmIGZvciB0aGlzIGNvbHVtbi5cbiAgICovXG4gIGdldCBjb2x1bW5EZWYoKTogUGJsTmdyaWRDb2x1bW5EZWY8UGJsTWV0YUNvbHVtbj4geyByZXR1cm4gdGhpcy5fY29sdW1uRGVmOyB9XG5cbiAgcHJpdmF0ZSBfd2lkdGg/OiBzdHJpbmc7XG4gIHByaXZhdGUgX3BhcnNlZFdpZHRoOiBSZXR1cm5UeXBlPHR5cGVvZiBwYXJzZVN0eWxlV2lkdGg+O1xuICBwcml2YXRlIF9jb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmPFBibE1ldGFDb2x1bW4+O1xuICBwcml2YXRlIGRlZmF1bHRXaWR0aCA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKGRlZjogUGJsTWV0YUNvbHVtbkRlZmluaXRpb24pIHtcbiAgICB0aGlzW1BCTF9OR1JJRF9NRVRBX0NPTFVNTl9NQVJLXSA9IHRydWU7XG4gICAgaW5pdERlZmluaXRpb25zKGRlZiwgdGhpcyk7XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgQ0xPTkVfUFJPUEVSVElFUykge1xuICAgICAgaWYgKHByb3AgaW4gZGVmKSB7XG4gICAgICAgIHRoaXNbcHJvcCBhcyBhbnldID0gZGVmW3Byb3BdXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpc1BibE1ldGFDb2x1bW4oZGVmKSkge1xuICAgICAgaWYgKHR5cGVvZiBkZWYudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy50eXBlID0geyBuYW1lOiBkZWYudHlwZSB9IGFzIGFueTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZXh0ZW5kUHJvcGVydHkobmFtZToga2V5b2YgUGJsTWV0YUNvbHVtbik6IHZvaWQge1xuICAgIGlmIChDTE9ORV9QUk9QRVJUSUVTLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICBDTE9ORV9QUk9QRVJUSUVTLnB1c2gobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYXR0YWNoKGNvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY8UGJsTWV0YUNvbHVtbj4pOiB2b2lkIHtcbiAgICB0aGlzLmRldGFjaCgpO1xuICAgIHRoaXMuX2NvbHVtbkRlZiA9IGNvbHVtbkRlZjtcbiAgICB0aGlzLmNvbHVtbkRlZi51cGRhdGVXaWR0aCh0aGlzLndpZHRoIHx8IHRoaXMuZGVmYXVsdFdpZHRoLCAnYXR0YWNoJyk7XG4gIH1cblxuICBkZXRhY2goKTogdm9pZCB7XG4gICAgdGhpcy5fY29sdW1uRGVmID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdXBkYXRlV2lkdGgoZmFsbGJhY2tEZWZhdWx0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmRlZmF1bHRXaWR0aCA9IGZhbGxiYWNrRGVmYXVsdCB8fCAnJztcbiAgICBpZiAodGhpcy5jb2x1bW5EZWYpIHtcbiAgICAgIHRoaXMuY29sdW1uRGVmLnVwZGF0ZVdpZHRoKHRoaXMud2lkdGggfHwgZmFsbGJhY2tEZWZhdWx0LCAndXBkYXRlJyk7XG4gICAgfVxuICB9XG59XG4iXX0=