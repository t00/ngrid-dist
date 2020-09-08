import { OnDestroy, EventEmitter } from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';
import { COLUMN } from '../columns';
import { PblNgridComponent } from '../ngrid.component';
import { PblNgridExtensionApi } from '../../ext/grid-ext-api';
import * as ɵngcc0 from '@angular/core';
export declare type UpdateWidthReason = 'attach' | 'update' | 'resize';
export declare type WidthSet = [string, string, string];
export interface WidthChangeEvent {
    reason: UpdateWidthReason;
}
/**
 * Represents a runtime column definition for a user-defined column definitions.
 *
 * User defined column definitions are `PblColumn`, `PblMetaColumn`, `PblColumnGroup` etc...
 * They represent static column definitions and `PblNgridColumnDef` is the runtime instance of them.
 *
 */
export declare class PblNgridColumnDef<T extends COLUMN = COLUMN> extends CdkColumnDef implements OnDestroy {
    protected extApi: PblNgridExtensionApi<any>;
    get column(): T;
    set column(value: T);
    /**
     * The absolute width definitions, as currently set in the DOM (getBoundingClientRect()).
     * If no measurements exists yet, return the user defined width's.
     *
     * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
     */
    get widths(): WidthSet;
    /**
     * The last net width of the column.
     * The net width is the absolute width of the column, without padding, border etc...
     */
    get netWidth(): number;
    isDragging: boolean;
    /** @deprecated use grid instead */
    readonly table: PblNgridComponent<T>;
    readonly grid: PblNgridComponent<any>;
    /**
     * An event emitted when width of this column has changed.
     */
    widthChange: EventEmitter<WidthChangeEvent>;
    private _column;
    /**
     * The complete width definition for the column.
     *
     * There are 2 width sets (tuple):
     * - [0]: The source width definitions as set in static column definition instance
     * - [1]: The absolute width definitions, as currently set in the DOM (getBoundingClientRect())
     *
     * Each set is made up of 3 primitive width definitions: MIN-WIDTH, WIDTH and MAX-WIDTH.
     * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
     */
    private _widths;
    /**
     * The last net width of the column.
     * The net width is the absolute width of the column, without padding, border etc...
     */
    private _netWidth;
    private widthBreakout;
    constructor(extApi: PblNgridExtensionApi<any>);
    /**
     * Update the "widths" for this column and when width has changed.
     *
     * The "widths" are the 3 values representing a width of a cell: [minWidth, width, maxWidth],
     * this method is given the width and will calculate the minWidth and maxWidth based on the column definitions.
     *
     * If at least one value of "widths" has changed, fires the `widthChange` event with the `reason` provided.
     *
     * The reason can be used to optionally update the relevant cells, based on the source (reason) of the update.
     * - attach: This runtime column definition instance was attached to a static column definition instance.
     * - update: The width value was updated in the static column definition instance , which triggered a width update to the runtime column definition instance
     * - resize: A resize event to the header PblColumn cell was triggered, the width of the static column definition is not updated, only the runtime value is.
     *
     * Note that this updates the width of the column-def instance, not the column definitions width itself.
     * Only when `reason === 'update'` it means that the column definition was updated and triggered this update
     *
     * @param width The new width
     * @param reason The reason for this change
     */
    updateWidth(width: string, reason: UpdateWidthReason): void;
    /**
     * Apply the current absolute width definitions (minWidth, width, maxWidth) onto an element.
     */
    applyWidth(element: HTMLElement): void;
    /**
     * Apply the source width definitions )set in static column definition instance) onto an element.
     */
    applySourceWidth(element: HTMLElement): void;
    /**
     * Query for cell elements related to this column definition.
     *
     * This query is not cached - cache in implementation.
     */
    queryCellElements(...filter: Array<'table' | 'header' | 'headerGroup' | 'footer' | 'footerGroup'>): HTMLElement[];
    /** @internal */
    ngOnDestroy(): void;
    onResize(): void;
    updatePin(pin?: 'start' | 'end'): void;
    private attach;
    private detach;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridColumnDef<any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridColumnDef<any>, "[pblNgridColumnDef]", never, { "column": "pblNgridColumnDef"; }, { "widthChange": "pblNgridColumnDefWidthChange"; }, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWRlZi5kLnRzIiwic291cmNlcyI6WyJjb2x1bW4tZGVmLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9uRGVzdHJveSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENka0NvbHVtbkRlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XHJcbmltcG9ydCB7IENPTFVNTiB9IGZyb20gJy4uL2NvbHVtbnMnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL25ncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vLi4vZXh0L2dyaWQtZXh0LWFwaSc7XHJcbmV4cG9ydCBkZWNsYXJlIHR5cGUgVXBkYXRlV2lkdGhSZWFzb24gPSAnYXR0YWNoJyB8ICd1cGRhdGUnIHwgJ3Jlc2l6ZSc7XHJcbmV4cG9ydCBkZWNsYXJlIHR5cGUgV2lkdGhTZXQgPSBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZ107XHJcbmV4cG9ydCBpbnRlcmZhY2UgV2lkdGhDaGFuZ2VFdmVudCB7XHJcbiAgICByZWFzb246IFVwZGF0ZVdpZHRoUmVhc29uO1xyXG59XHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgcnVudGltZSBjb2x1bW4gZGVmaW5pdGlvbiBmb3IgYSB1c2VyLWRlZmluZWQgY29sdW1uIGRlZmluaXRpb25zLlxyXG4gKlxyXG4gKiBVc2VyIGRlZmluZWQgY29sdW1uIGRlZmluaXRpb25zIGFyZSBgUGJsQ29sdW1uYCwgYFBibE1ldGFDb2x1bW5gLCBgUGJsQ29sdW1uR3JvdXBgIGV0Yy4uLlxyXG4gKiBUaGV5IHJlcHJlc2VudCBzdGF0aWMgY29sdW1uIGRlZmluaXRpb25zIGFuZCBgUGJsTmdyaWRDb2x1bW5EZWZgIGlzIHRoZSBydW50aW1lIGluc3RhbmNlIG9mIHRoZW0uXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYmxOZ3JpZENvbHVtbkRlZjxUIGV4dGVuZHMgQ09MVU1OID0gQ09MVU1OPiBleHRlbmRzIENka0NvbHVtbkRlZiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgICBwcm90ZWN0ZWQgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxhbnk+O1xyXG4gICAgZ2V0IGNvbHVtbigpOiBUO1xyXG4gICAgc2V0IGNvbHVtbih2YWx1ZTogVCk7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhYnNvbHV0ZSB3aWR0aCBkZWZpbml0aW9ucywgYXMgY3VycmVudGx5IHNldCBpbiB0aGUgRE9NIChnZXRCb3VuZGluZ0NsaWVudFJlY3QoKSkuXHJcbiAgICAgKiBJZiBubyBtZWFzdXJlbWVudHMgZXhpc3RzIHlldCwgcmV0dXJuIHRoZSB1c2VyIGRlZmluZWQgd2lkdGgncy5cclxuICAgICAqXHJcbiAgICAgKiBUaGUgdHVwbGUgcmVwcmVzZW50cyB0aGVtIGluIHRoYXQgb3JkZXIsIGkuZTogWyBNSU4tV0lEVEgsIFdJRFRILCBNQVgtV0lEVEggXVxyXG4gICAgICovXHJcbiAgICBnZXQgd2lkdGhzKCk6IFdpZHRoU2V0O1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbGFzdCBuZXQgd2lkdGggb2YgdGhlIGNvbHVtbi5cclxuICAgICAqIFRoZSBuZXQgd2lkdGggaXMgdGhlIGFic29sdXRlIHdpZHRoIG9mIHRoZSBjb2x1bW4sIHdpdGhvdXQgcGFkZGluZywgYm9yZGVyIGV0Yy4uLlxyXG4gICAgICovXHJcbiAgICBnZXQgbmV0V2lkdGgoKTogbnVtYmVyO1xyXG4gICAgaXNEcmFnZ2luZzogYm9vbGVhbjtcclxuICAgIC8qKiBAZGVwcmVjYXRlZCB1c2UgZ3JpZCBpbnN0ZWFkICovXHJcbiAgICByZWFkb25seSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8VD47XHJcbiAgICByZWFkb25seSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gd2lkdGggb2YgdGhpcyBjb2x1bW4gaGFzIGNoYW5nZWQuXHJcbiAgICAgKi9cclxuICAgIHdpZHRoQ2hhbmdlOiBFdmVudEVtaXR0ZXI8V2lkdGhDaGFuZ2VFdmVudD47XHJcbiAgICBwcml2YXRlIF9jb2x1bW47XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb21wbGV0ZSB3aWR0aCBkZWZpbml0aW9uIGZvciB0aGUgY29sdW1uLlxyXG4gICAgICpcclxuICAgICAqIFRoZXJlIGFyZSAyIHdpZHRoIHNldHMgKHR1cGxlKTpcclxuICAgICAqIC0gWzBdOiBUaGUgc291cmNlIHdpZHRoIGRlZmluaXRpb25zIGFzIHNldCBpbiBzdGF0aWMgY29sdW1uIGRlZmluaXRpb24gaW5zdGFuY2VcclxuICAgICAqIC0gWzFdOiBUaGUgYWJzb2x1dGUgd2lkdGggZGVmaW5pdGlvbnMsIGFzIGN1cnJlbnRseSBzZXQgaW4gdGhlIERPTSAoZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpXHJcbiAgICAgKlxyXG4gICAgICogRWFjaCBzZXQgaXMgbWFkZSB1cCBvZiAzIHByaW1pdGl2ZSB3aWR0aCBkZWZpbml0aW9uczogTUlOLVdJRFRILCBXSURUSCBhbmQgTUFYLVdJRFRILlxyXG4gICAgICogVGhlIHR1cGxlIHJlcHJlc2VudHMgdGhlbSBpbiB0aGF0IG9yZGVyLCBpLmU6IFsgTUlOLVdJRFRILCBXSURUSCwgTUFYLVdJRFRIIF1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfd2lkdGhzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbGFzdCBuZXQgd2lkdGggb2YgdGhlIGNvbHVtbi5cclxuICAgICAqIFRoZSBuZXQgd2lkdGggaXMgdGhlIGFic29sdXRlIHdpZHRoIG9mIHRoZSBjb2x1bW4sIHdpdGhvdXQgcGFkZGluZywgYm9yZGVyIGV0Yy4uLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9uZXRXaWR0aDtcclxuICAgIHByaXZhdGUgd2lkdGhCcmVha291dDtcclxuICAgIGNvbnN0cnVjdG9yKGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8YW55Pik7XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSB0aGUgXCJ3aWR0aHNcIiBmb3IgdGhpcyBjb2x1bW4gYW5kIHdoZW4gd2lkdGggaGFzIGNoYW5nZWQuXHJcbiAgICAgKlxyXG4gICAgICogVGhlIFwid2lkdGhzXCIgYXJlIHRoZSAzIHZhbHVlcyByZXByZXNlbnRpbmcgYSB3aWR0aCBvZiBhIGNlbGw6IFttaW5XaWR0aCwgd2lkdGgsIG1heFdpZHRoXSxcclxuICAgICAqIHRoaXMgbWV0aG9kIGlzIGdpdmVuIHRoZSB3aWR0aCBhbmQgd2lsbCBjYWxjdWxhdGUgdGhlIG1pbldpZHRoIGFuZCBtYXhXaWR0aCBiYXNlZCBvbiB0aGUgY29sdW1uIGRlZmluaXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIElmIGF0IGxlYXN0IG9uZSB2YWx1ZSBvZiBcIndpZHRoc1wiIGhhcyBjaGFuZ2VkLCBmaXJlcyB0aGUgYHdpZHRoQ2hhbmdlYCBldmVudCB3aXRoIHRoZSBgcmVhc29uYCBwcm92aWRlZC5cclxuICAgICAqXHJcbiAgICAgKiBUaGUgcmVhc29uIGNhbiBiZSB1c2VkIHRvIG9wdGlvbmFsbHkgdXBkYXRlIHRoZSByZWxldmFudCBjZWxscywgYmFzZWQgb24gdGhlIHNvdXJjZSAocmVhc29uKSBvZiB0aGUgdXBkYXRlLlxyXG4gICAgICogLSBhdHRhY2g6IFRoaXMgcnVudGltZSBjb2x1bW4gZGVmaW5pdGlvbiBpbnN0YW5jZSB3YXMgYXR0YWNoZWQgdG8gYSBzdGF0aWMgY29sdW1uIGRlZmluaXRpb24gaW5zdGFuY2UuXHJcbiAgICAgKiAtIHVwZGF0ZTogVGhlIHdpZHRoIHZhbHVlIHdhcyB1cGRhdGVkIGluIHRoZSBzdGF0aWMgY29sdW1uIGRlZmluaXRpb24gaW5zdGFuY2UgLCB3aGljaCB0cmlnZ2VyZWQgYSB3aWR0aCB1cGRhdGUgdG8gdGhlIHJ1bnRpbWUgY29sdW1uIGRlZmluaXRpb24gaW5zdGFuY2VcclxuICAgICAqIC0gcmVzaXplOiBBIHJlc2l6ZSBldmVudCB0byB0aGUgaGVhZGVyIFBibENvbHVtbiBjZWxsIHdhcyB0cmlnZ2VyZWQsIHRoZSB3aWR0aCBvZiB0aGUgc3RhdGljIGNvbHVtbiBkZWZpbml0aW9uIGlzIG5vdCB1cGRhdGVkLCBvbmx5IHRoZSBydW50aW1lIHZhbHVlIGlzLlxyXG4gICAgICpcclxuICAgICAqIE5vdGUgdGhhdCB0aGlzIHVwZGF0ZXMgdGhlIHdpZHRoIG9mIHRoZSBjb2x1bW4tZGVmIGluc3RhbmNlLCBub3QgdGhlIGNvbHVtbiBkZWZpbml0aW9ucyB3aWR0aCBpdHNlbGYuXHJcbiAgICAgKiBPbmx5IHdoZW4gYHJlYXNvbiA9PT0gJ3VwZGF0ZSdgIGl0IG1lYW5zIHRoYXQgdGhlIGNvbHVtbiBkZWZpbml0aW9uIHdhcyB1cGRhdGVkIGFuZCB0cmlnZ2VyZWQgdGhpcyB1cGRhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gd2lkdGggVGhlIG5ldyB3aWR0aFxyXG4gICAgICogQHBhcmFtIHJlYXNvbiBUaGUgcmVhc29uIGZvciB0aGlzIGNoYW5nZVxyXG4gICAgICovXHJcbiAgICB1cGRhdGVXaWR0aCh3aWR0aDogc3RyaW5nLCByZWFzb246IFVwZGF0ZVdpZHRoUmVhc29uKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogQXBwbHkgdGhlIGN1cnJlbnQgYWJzb2x1dGUgd2lkdGggZGVmaW5pdGlvbnMgKG1pbldpZHRoLCB3aWR0aCwgbWF4V2lkdGgpIG9udG8gYW4gZWxlbWVudC5cclxuICAgICAqL1xyXG4gICAgYXBwbHlXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIEFwcGx5IHRoZSBzb3VyY2Ugd2lkdGggZGVmaW5pdGlvbnMgKXNldCBpbiBzdGF0aWMgY29sdW1uIGRlZmluaXRpb24gaW5zdGFuY2UpIG9udG8gYW4gZWxlbWVudC5cclxuICAgICAqL1xyXG4gICAgYXBwbHlTb3VyY2VXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIFF1ZXJ5IGZvciBjZWxsIGVsZW1lbnRzIHJlbGF0ZWQgdG8gdGhpcyBjb2x1bW4gZGVmaW5pdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIHF1ZXJ5IGlzIG5vdCBjYWNoZWQgLSBjYWNoZSBpbiBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAqL1xyXG4gICAgcXVlcnlDZWxsRWxlbWVudHMoLi4uZmlsdGVyOiBBcnJheTwndGFibGUnIHwgJ2hlYWRlcicgfCAnaGVhZGVyR3JvdXAnIHwgJ2Zvb3RlcicgfCAnZm9vdGVyR3JvdXAnPik6IEhUTUxFbGVtZW50W107XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xyXG4gICAgb25SZXNpemUoKTogdm9pZDtcclxuICAgIHVwZGF0ZVBpbihwaW4/OiAnc3RhcnQnIHwgJ2VuZCcpOiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBhdHRhY2g7XHJcbiAgICBwcml2YXRlIGRldGFjaDtcclxufVxyXG4iXX0=