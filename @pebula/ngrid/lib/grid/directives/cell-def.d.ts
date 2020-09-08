import { TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { PblColumnTypeDefinitionDataMap, PblColumn, PblMetaColumn } from '../columns';
import { PblNgridCellContext, PblNgridMetaCellContext } from '../context/index';
import { PblNgridRegistryService } from '../services/grid-registry.service';
import * as ɵngcc0 from '@angular/core';
export interface PblNgridCellDefDirectiveBase {
    name: string;
    type: keyof PblColumnTypeDefinitionDataMap;
}
export declare abstract class PblNgridBaseCellDef<Z> implements OnInit, OnDestroy, PblNgridCellDefDirectiveBase {
    tRef: TemplateRef<Z>;
    protected registry: PblNgridRegistryService;
    name: string;
    type: keyof PblColumnTypeDefinitionDataMap;
    constructor(tRef: TemplateRef<Z>, registry: PblNgridRegistryService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridBaseCellDef<any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridBaseCellDef<any>, never, never, {}, {}, never>;
}
/**
 * Header Cell definition for the pbl-ngrid.
 * Captures the template of a column's data row header cell as well as header cell-specific properties.
 *
 * `pblNgridHeaderCellDef` does the same thing that `matHeaderCellDef` and `cdkHeaderCellDef` do with one difference,
 * `pblNgridHeaderCellDef` is independent and does not require a column definition parent, instead it accept the ID of
 * the header cell.
 *
 * NOTE: Defining '*' as id will declare the header cell template as default, replacing the table's default header cell template.
 *
 * Make sure you set the proper id of the property you want to override.
 * When the `id` is set explicitly in the table column definition, this is not a problem but when if it's not set
 * the table generates a unique id based on a logic. If `name` is set the name is used, if no name is set
 * the `prop` is used (full with dot notation).
 */
export declare class PblNgridHeaderCellDefDirective<T> extends PblNgridBaseCellDef<PblNgridMetaCellContext<T>> {
    constructor(tRef: TemplateRef<PblNgridMetaCellContext<T>>, registry: PblNgridRegistryService);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridHeaderCellDefDirective<any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridHeaderCellDefDirective<any>, "[pblNgridHeaderCellDef], [pblNgridHeaderCellTypeDef]", never, { "name": "pblNgridHeaderCellDef"; "type": "pblNgridHeaderCellTypeDef"; }, {}, never>;
}
/**
 * Cell definition for the pbl-ngrid.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 *
 * `pblNgridCellDef` does the same thing that `matCellDef` and `cdkCellDef` do with one difference, `pblNgridCellDef` is
 * independent and does not require a column definition parent, instead it accept the ID of the cell.
 *
 * NOTE: Defining '*' as id will declare the cell template as default, replacing the table's default cell template.
 *
 * Make sure you set the proper id of the property you want to override.
 * When the `id` is set explicitly in the table column definition, this is not a problem but when if it's not set
 * the table generates a unique id based on a logic. If `name` is set the name is used, if no name is set
 * the `prop` is used (full with dot notation).
 */
export declare class PblNgridCellDefDirective<T, P extends keyof PblColumnTypeDefinitionDataMap = any> extends PblNgridBaseCellDef<PblNgridCellContext<T, P>> {
    type: P;
    constructor(tRef: TemplateRef<PblNgridCellContext<any, P>>, registry: PblNgridRegistryService);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridCellDefDirective<any, any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridCellDefDirective<any, any>, "[pblNgridCellDef], [pblNgridCellTypeDef]", never, { "name": "pblNgridCellDef"; "type": "pblNgridCellTypeDef"; }, {}, never>;
}
export declare class PblNgridEditorCellDefDirective<T, P extends keyof PblColumnTypeDefinitionDataMap = any> extends PblNgridBaseCellDef<PblNgridCellContext<T, P>> {
    type: P;
    constructor(tRef: TemplateRef<PblNgridCellContext<any, P>>, registry: PblNgridRegistryService);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridEditorCellDefDirective<any, any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridEditorCellDefDirective<any, any>, "[pblNgridCellEditorDef], [pblNgridCellEditorTypeDef]", never, { "name": "pblNgridCellEditorDef"; "type": "pblNgridCellEditorTypeDef"; }, {}, never>;
}
export declare class PblNgridFooterCellDefDirective<T> extends PblNgridBaseCellDef<PblNgridMetaCellContext<T>> {
    constructor(tRef: TemplateRef<PblNgridMetaCellContext<T>>, registry: PblNgridRegistryService);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridFooterCellDefDirective<any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridFooterCellDefDirective<any>, "[pblNgridFooterCellDef], [pblNgridFooterCellTypeDef]", never, { "name": "pblNgridFooterCellDef"; "type": "pblNgridFooterCellTypeDef"; }, {}, never>;
}
export declare function findCellDef<T = any>(registry: PblNgridRegistryService, colDef: PblColumn, kind: 'tableCell' | 'editorCell', searchParent?: boolean): PblNgridCellDefDirective<T>;
export declare function findCellDef<T = any>(registry: PblNgridRegistryService, colDef: PblMetaColumn | PblColumn, kind: 'headerCell', searchParent?: boolean): PblNgridHeaderCellDefDirective<T>;
export declare function findCellDef<T = any>(registry: PblNgridRegistryService, colDef: PblMetaColumn | PblColumn, kind: 'footerCell', searchParent?: boolean): PblNgridFooterCellDefDirective<T>;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1kZWYuZC50cyIsInNvdXJjZXMiOlsiY2VsbC1kZWYuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUmVmLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbkRhdGFNYXAsIFBibENvbHVtbiwgUGJsTWV0YUNvbHVtbiB9IGZyb20gJy4uL2NvbHVtbnMnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxDb250ZXh0LCBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQvaW5kZXgnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2dyaWQtcmVnaXN0cnkuc2VydmljZSc7XHJcbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlQmFzZSB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB0eXBlOiBrZXlvZiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbkRhdGFNYXA7XHJcbn1cclxuZXhwb3J0IGRlY2xhcmUgYWJzdHJhY3QgY2xhc3MgUGJsTmdyaWRCYXNlQ2VsbERlZjxaPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmVCYXNlIHtcclxuICAgIHRSZWY6IFRlbXBsYXRlUmVmPFo+O1xyXG4gICAgcHJvdGVjdGVkIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZTtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHR5cGU6IGtleW9mIFBibENvbHVtblR5cGVEZWZpbml0aW9uRGF0YU1hcDtcclxuICAgIGNvbnN0cnVjdG9yKHRSZWY6IFRlbXBsYXRlUmVmPFo+LCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpO1xyXG4gICAgbmdPbkluaXQoKTogdm9pZDtcclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XHJcbn1cclxuLyoqXHJcbiAqIEhlYWRlciBDZWxsIGRlZmluaXRpb24gZm9yIHRoZSBwYmwtbmdyaWQuXHJcbiAqIENhcHR1cmVzIHRoZSB0ZW1wbGF0ZSBvZiBhIGNvbHVtbidzIGRhdGEgcm93IGhlYWRlciBjZWxsIGFzIHdlbGwgYXMgaGVhZGVyIGNlbGwtc3BlY2lmaWMgcHJvcGVydGllcy5cclxuICpcclxuICogYHBibE5ncmlkSGVhZGVyQ2VsbERlZmAgZG9lcyB0aGUgc2FtZSB0aGluZyB0aGF0IGBtYXRIZWFkZXJDZWxsRGVmYCBhbmQgYGNka0hlYWRlckNlbGxEZWZgIGRvIHdpdGggb25lIGRpZmZlcmVuY2UsXHJcbiAqIGBwYmxOZ3JpZEhlYWRlckNlbGxEZWZgIGlzIGluZGVwZW5kZW50IGFuZCBkb2VzIG5vdCByZXF1aXJlIGEgY29sdW1uIGRlZmluaXRpb24gcGFyZW50LCBpbnN0ZWFkIGl0IGFjY2VwdCB0aGUgSUQgb2ZcclxuICogdGhlIGhlYWRlciBjZWxsLlxyXG4gKlxyXG4gKiBOT1RFOiBEZWZpbmluZyAnKicgYXMgaWQgd2lsbCBkZWNsYXJlIHRoZSBoZWFkZXIgY2VsbCB0ZW1wbGF0ZSBhcyBkZWZhdWx0LCByZXBsYWNpbmcgdGhlIHRhYmxlJ3MgZGVmYXVsdCBoZWFkZXIgY2VsbCB0ZW1wbGF0ZS5cclxuICpcclxuICogTWFrZSBzdXJlIHlvdSBzZXQgdGhlIHByb3BlciBpZCBvZiB0aGUgcHJvcGVydHkgeW91IHdhbnQgdG8gb3ZlcnJpZGUuXHJcbiAqIFdoZW4gdGhlIGBpZGAgaXMgc2V0IGV4cGxpY2l0bHkgaW4gdGhlIHRhYmxlIGNvbHVtbiBkZWZpbml0aW9uLCB0aGlzIGlzIG5vdCBhIHByb2JsZW0gYnV0IHdoZW4gaWYgaXQncyBub3Qgc2V0XHJcbiAqIHRoZSB0YWJsZSBnZW5lcmF0ZXMgYSB1bmlxdWUgaWQgYmFzZWQgb24gYSBsb2dpYy4gSWYgYG5hbWVgIGlzIHNldCB0aGUgbmFtZSBpcyB1c2VkLCBpZiBubyBuYW1lIGlzIHNldFxyXG4gKiB0aGUgYHByb3BgIGlzIHVzZWQgKGZ1bGwgd2l0aCBkb3Qgbm90YXRpb24pLlxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlPFQ+IGV4dGVuZHMgUGJsTmdyaWRCYXNlQ2VsbERlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxUPj4ge1xyXG4gICAgY29uc3RydWN0b3IodFJlZjogVGVtcGxhdGVSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8VD4+LCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpO1xyXG59XHJcbi8qKlxyXG4gKiBDZWxsIGRlZmluaXRpb24gZm9yIHRoZSBwYmwtbmdyaWQuXHJcbiAqIENhcHR1cmVzIHRoZSB0ZW1wbGF0ZSBvZiBhIGNvbHVtbidzIGRhdGEgcm93IGNlbGwgYXMgd2VsbCBhcyBjZWxsLXNwZWNpZmljIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqIGBwYmxOZ3JpZENlbGxEZWZgIGRvZXMgdGhlIHNhbWUgdGhpbmcgdGhhdCBgbWF0Q2VsbERlZmAgYW5kIGBjZGtDZWxsRGVmYCBkbyB3aXRoIG9uZSBkaWZmZXJlbmNlLCBgcGJsTmdyaWRDZWxsRGVmYCBpc1xyXG4gKiBpbmRlcGVuZGVudCBhbmQgZG9lcyBub3QgcmVxdWlyZSBhIGNvbHVtbiBkZWZpbml0aW9uIHBhcmVudCwgaW5zdGVhZCBpdCBhY2NlcHQgdGhlIElEIG9mIHRoZSBjZWxsLlxyXG4gKlxyXG4gKiBOT1RFOiBEZWZpbmluZyAnKicgYXMgaWQgd2lsbCBkZWNsYXJlIHRoZSBjZWxsIHRlbXBsYXRlIGFzIGRlZmF1bHQsIHJlcGxhY2luZyB0aGUgdGFibGUncyBkZWZhdWx0IGNlbGwgdGVtcGxhdGUuXHJcbiAqXHJcbiAqIE1ha2Ugc3VyZSB5b3Ugc2V0IHRoZSBwcm9wZXIgaWQgb2YgdGhlIHByb3BlcnR5IHlvdSB3YW50IHRvIG92ZXJyaWRlLlxyXG4gKiBXaGVuIHRoZSBgaWRgIGlzIHNldCBleHBsaWNpdGx5IGluIHRoZSB0YWJsZSBjb2x1bW4gZGVmaW5pdGlvbiwgdGhpcyBpcyBub3QgYSBwcm9ibGVtIGJ1dCB3aGVuIGlmIGl0J3Mgbm90IHNldFxyXG4gKiB0aGUgdGFibGUgZ2VuZXJhdGVzIGEgdW5pcXVlIGlkIGJhc2VkIG9uIGEgbG9naWMuIElmIGBuYW1lYCBpcyBzZXQgdGhlIG5hbWUgaXMgdXNlZCwgaWYgbm8gbmFtZSBpcyBzZXRcclxuICogdGhlIGBwcm9wYCBpcyB1c2VkIChmdWxsIHdpdGggZG90IG5vdGF0aW9uKS5cclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZTxULCBQIGV4dGVuZHMga2V5b2YgUGJsQ29sdW1uVHlwZURlZmluaXRpb25EYXRhTWFwID0gYW55PiBleHRlbmRzIFBibE5ncmlkQmFzZUNlbGxEZWY8UGJsTmdyaWRDZWxsQ29udGV4dDxULCBQPj4ge1xyXG4gICAgdHlwZTogUDtcclxuICAgIGNvbnN0cnVjdG9yKHRSZWY6IFRlbXBsYXRlUmVmPFBibE5ncmlkQ2VsbENvbnRleHQ8YW55LCBQPj4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSk7XHJcbn1cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgUGJsTmdyaWRFZGl0b3JDZWxsRGVmRGlyZWN0aXZlPFQsIFAgZXh0ZW5kcyBrZXlvZiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbkRhdGFNYXAgPSBhbnk+IGV4dGVuZHMgUGJsTmdyaWRCYXNlQ2VsbERlZjxQYmxOZ3JpZENlbGxDb250ZXh0PFQsIFA+PiB7XHJcbiAgICB0eXBlOiBQO1xyXG4gICAgY29uc3RydWN0b3IodFJlZjogVGVtcGxhdGVSZWY8UGJsTmdyaWRDZWxsQ29udGV4dDxhbnksIFA+PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKTtcclxufVxyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmU8VD4gZXh0ZW5kcyBQYmxOZ3JpZEJhc2VDZWxsRGVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PFQ+PiB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxUPj4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSk7XHJcbn1cclxuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gZmluZENlbGxEZWY8VCA9IGFueT4ocmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLCBjb2xEZWY6IFBibENvbHVtbiwga2luZDogJ3RhYmxlQ2VsbCcgfCAnZWRpdG9yQ2VsbCcsIHNlYXJjaFBhcmVudD86IGJvb2xlYW4pOiBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmU8VD47XHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIGZpbmRDZWxsRGVmPFQgPSBhbnk+KHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgY29sRGVmOiBQYmxNZXRhQ29sdW1uIHwgUGJsQ29sdW1uLCBraW5kOiAnaGVhZGVyQ2VsbCcsIHNlYXJjaFBhcmVudD86IGJvb2xlYW4pOiBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmU8VD47XHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIGZpbmRDZWxsRGVmPFQgPSBhbnk+KHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgY29sRGVmOiBQYmxNZXRhQ29sdW1uIHwgUGJsQ29sdW1uLCBraW5kOiAnZm9vdGVyQ2VsbCcsIHNlYXJjaFBhcmVudD86IGJvb2xlYW4pOiBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmU8VD47XHJcbiJdfQ==