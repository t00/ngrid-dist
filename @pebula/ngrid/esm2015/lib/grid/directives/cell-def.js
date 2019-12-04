/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:use-input-property-decorator
import { Directive, TemplateRef, } from '@angular/core';
import { isPblColumn } from '../columns';
import { PblNgridRegistryService } from '../services/grid-registry.service';
/**
 * @record
 */
export function PblNgridCellDefDirectiveBase() { }
if (false) {
    /** @type {?} */
    PblNgridCellDefDirectiveBase.prototype.name;
    /** @type {?} */
    PblNgridCellDefDirectiveBase.prototype.type;
}
/**
 * @abstract
 * @template Z
 */
export class PblNgridBaseCellDef {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        this.tRef = tRef;
        this.registry = registry;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // TODO: listen to property changes (name) and re-register cell
        if (this instanceof PblNgridHeaderCellDefDirective) {
            this.registry.addMulti('headerCell', this);
        }
        else if (this instanceof PblNgridCellDefDirective) {
            this.registry.addMulti('tableCell', this);
        }
        else if (this instanceof PblNgridEditorCellDefDirective) {
            this.registry.addMulti('editorCell', this);
        }
        else if (this instanceof PblNgridFooterCellDefDirective) {
            this.registry.addMulti('footerCell', this);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this instanceof PblNgridHeaderCellDefDirective) {
            this.registry.removeMulti('headerCell', this);
        }
        else if (this instanceof PblNgridCellDefDirective) {
            this.registry.removeMulti('tableCell', this);
        }
        else if (this instanceof PblNgridEditorCellDefDirective) {
            this.registry.removeMulti('editorCell', this);
        }
        else if (this instanceof PblNgridFooterCellDefDirective) {
            this.registry.removeMulti('footerCell', this);
        }
    }
}
if (false) {
    /** @type {?} */
    PblNgridBaseCellDef.prototype.name;
    /** @type {?} */
    PblNgridBaseCellDef.prototype.type;
    /** @type {?} */
    PblNgridBaseCellDef.prototype.tRef;
    /**
     * @type {?}
     * @protected
     */
    PblNgridBaseCellDef.prototype.registry;
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
 * @template T
 */
export class PblNgridHeaderCellDefDirective extends PblNgridBaseCellDef {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) { super(tRef, registry); }
}
PblNgridHeaderCellDefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblNgridHeaderCellDef], [pblNgridHeaderCellTypeDef]',
                inputs: [
                    'name:pblNgridHeaderCellDef',
                    'type:pblNgridHeaderCellTypeDef',
                ]
            },] }
];
/** @nocollapse */
PblNgridHeaderCellDefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
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
 * @template T, P
 */
export class PblNgridCellDefDirective extends PblNgridBaseCellDef {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) { super(tRef, registry); }
}
PblNgridCellDefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblNgridCellDef], [pblNgridCellTypeDef]',
                inputs: [
                    'name:pblNgridCellDef',
                    'type:pblNgridCellTypeDef',
                ]
            },] }
];
/** @nocollapse */
PblNgridCellDefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
if (false) {
    /** @type {?} */
    PblNgridCellDefDirective.prototype.type;
}
/**
 * @template T, P
 */
export class PblNgridEditorCellDefDirective extends PblNgridBaseCellDef {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) { super(tRef, registry); }
}
PblNgridEditorCellDefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblNgridCellEditorDef], [pblNgridCellEditorTypeDef]',
                inputs: [
                    'name:pblNgridCellEditorDef',
                    'type:pblNgridCellEditorTypeDef',
                ]
            },] }
];
/** @nocollapse */
PblNgridEditorCellDefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
if (false) {
    /** @type {?} */
    PblNgridEditorCellDefDirective.prototype.type;
}
/**
 * @template T
 */
export class PblNgridFooterCellDefDirective extends PblNgridBaseCellDef {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) { super(tRef, registry); }
}
PblNgridFooterCellDefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblNgridFooterCellDef], [pblNgridFooterCellTypeDef]',
                inputs: [
                    'name:pblNgridFooterCellDef',
                    'type:pblNgridFooterCellTypeDef',
                ]
            },] }
];
/** @nocollapse */
PblNgridFooterCellDefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
/**
 * @template T
 * @param {?} cellDefs
 * @param {?} colDef
 * @param {?=} searchParent
 * @return {?}
 */
function findCellDefById(cellDefs, colDef, searchParent) {
    for (const cellDef of cellDefs) {
        if (cellDef.type) {
            if (colDef.type && cellDef.type === colDef.type.name) {
                return cellDef;
            }
        }
        else {
            /** @type {?} */
            const id = cellDef.name;
            if (id === colDef.id) {
                return cellDef;
            }
        }
    }
}
/**
 * @template T
 * @param {?} registry
 * @param {?} colDef
 * @param {?} kind
 * @param {?=} searchParent
 * @return {?}
 */
export function findCellDef(registry, colDef, kind, searchParent) {
    /** @type {?} */
    const cellDefs = registry.getMulti(kind);
    if (cellDefs) {
        /** @type {?} */
        let type;
        if (isPblColumn(colDef)) {
            switch (kind) {
                case 'headerCell':
                    if (colDef.headerType) {
                        type = { id: colDef.id, type: colDef.headerType };
                    }
                    break;
                case 'footerCell':
                    if (colDef.footerType) {
                        type = { id: colDef.id, type: colDef.footerType };
                    }
                    break;
            }
        }
        if (!type) {
            type = colDef;
        }
        /** @type {?} */
        const match = findCellDefById(cellDefs, type);
        if (match) {
            return match;
        }
    }
    if (searchParent && registry.parent) {
        return findCellDef(registry.parent, (/** @type {?} */ (colDef)), (/** @type {?} */ (kind)), searchParent);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1kZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvZGlyZWN0aXZlcy9jZWxsLWRlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsV0FBVyxHQUdaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBb0UsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTNHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7O0FBRTVFLGtEQUdDOzs7SUFGQyw0Q0FBYTs7SUFDYiw0Q0FBMkM7Ozs7OztBQUc3QyxNQUFNLE9BQWdCLG1CQUFtQjs7Ozs7SUFJdkMsWUFBbUIsSUFBb0IsRUFDakIsUUFBaUM7UUFEcEMsU0FBSSxHQUFKLElBQUksQ0FBZ0I7UUFDakIsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7SUFBSSxDQUFDOzs7O0lBRTVELFFBQVE7UUFDTiwrREFBK0Q7UUFDL0QsSUFBSSxJQUFJLFlBQVksOEJBQThCLEVBQUU7WUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVDO2FBQU0sSUFBSSxJQUFJLFlBQVksd0JBQXdCLEVBQUU7WUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzNDO2FBQU0sSUFBSSxJQUFJLFlBQVksOEJBQThCLEVBQUU7WUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVDO2FBQU0sSUFBSSxJQUFJLFlBQVksOEJBQThCLEVBQUU7WUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJ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Q29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTp1c2UtaW5wdXQtcHJvcGVydHktZGVjb3JhdG9yXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIFRlbXBsYXRlUmVmLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENPTFVNTiwgUGJsQ29sdW1uVHlwZURlZmluaXRpb25EYXRhTWFwLCBQYmxDb2x1bW4sIFBibE1ldGFDb2x1bW4sIGlzUGJsQ29sdW1uIH0gZnJvbSAnLi4vY29sdW1ucyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxDb250ZXh0LCBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQvaW5kZXgnO1xuaW1wb3J0IHsgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9ncmlkLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZUJhc2Uge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IGtleW9mIFBibENvbHVtblR5cGVEZWZpbml0aW9uRGF0YU1hcDtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBibE5ncmlkQmFzZUNlbGxEZWY8Wj4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlQmFzZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZToga2V5b2YgUGJsQ29sdW1uVHlwZURlZmluaXRpb25EYXRhTWFwO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0UmVmOiBUZW1wbGF0ZVJlZjxaPixcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gVE9ETzogbGlzdGVuIHRvIHByb3BlcnR5IGNoYW5nZXMgKG5hbWUpIGFuZCByZS1yZWdpc3RlciBjZWxsXG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmUpIHtcbiAgICAgIHRoaXMucmVnaXN0cnkuYWRkTXVsdGkoJ2hlYWRlckNlbGwnLCB0aGlzKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMgaW5zdGFuY2VvZiBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmUpIHtcbiAgICAgIHRoaXMucmVnaXN0cnkuYWRkTXVsdGkoJ3RhYmxlQ2VsbCcsIHRoaXMpO1xuICAgIH0gZWxzZSBpZiAodGhpcyBpbnN0YW5jZW9mIFBibE5ncmlkRWRpdG9yQ2VsbERlZkRpcmVjdGl2ZSkge1xuICAgICAgdGhpcy5yZWdpc3RyeS5hZGRNdWx0aSgnZWRpdG9yQ2VsbCcsIHRoaXMpO1xuICAgIH0gZWxzZSBpZiAodGhpcyBpbnN0YW5jZW9mIFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZSkge1xuICAgICAgdGhpcy5yZWdpc3RyeS5hZGRNdWx0aSgnZm9vdGVyQ2VsbCcsIHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlKSB7XG4gICAgICB0aGlzLnJlZ2lzdHJ5LnJlbW92ZU11bHRpKCdoZWFkZXJDZWxsJywgdGhpcyk7XG4gICAgfSBlbHNlIGlmICh0aGlzIGluc3RhbmNlb2YgUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlKSB7XG4gICAgICB0aGlzLnJlZ2lzdHJ5LnJlbW92ZU11bHRpKCd0YWJsZUNlbGwnLCB0aGlzKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMgaW5zdGFuY2VvZiBQYmxOZ3JpZEVkaXRvckNlbGxEZWZEaXJlY3RpdmUpIHtcbiAgICAgIHRoaXMucmVnaXN0cnkucmVtb3ZlTXVsdGkoJ2VkaXRvckNlbGwnLCB0aGlzKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMgaW5zdGFuY2VvZiBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmUpIHtcbiAgICAgIHRoaXMucmVnaXN0cnkucmVtb3ZlTXVsdGkoJ2Zvb3RlckNlbGwnLCB0aGlzKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBIZWFkZXIgQ2VsbCBkZWZpbml0aW9uIGZvciB0aGUgcGJsLW5ncmlkLlxuICogQ2FwdHVyZXMgdGhlIHRlbXBsYXRlIG9mIGEgY29sdW1uJ3MgZGF0YSByb3cgaGVhZGVyIGNlbGwgYXMgd2VsbCBhcyBoZWFkZXIgY2VsbC1zcGVjaWZpYyBwcm9wZXJ0aWVzLlxuICpcbiAqIGBwYmxOZ3JpZEhlYWRlckNlbGxEZWZgIGRvZXMgdGhlIHNhbWUgdGhpbmcgdGhhdCBgbWF0SGVhZGVyQ2VsbERlZmAgYW5kIGBjZGtIZWFkZXJDZWxsRGVmYCBkbyB3aXRoIG9uZSBkaWZmZXJlbmNlLFxuICogYHBibE5ncmlkSGVhZGVyQ2VsbERlZmAgaXMgaW5kZXBlbmRlbnQgYW5kIGRvZXMgbm90IHJlcXVpcmUgYSBjb2x1bW4gZGVmaW5pdGlvbiBwYXJlbnQsIGluc3RlYWQgaXQgYWNjZXB0IHRoZSBJRCBvZlxuICogdGhlIGhlYWRlciBjZWxsLlxuICpcbiAqIE5PVEU6IERlZmluaW5nICcqJyBhcyBpZCB3aWxsIGRlY2xhcmUgdGhlIGhlYWRlciBjZWxsIHRlbXBsYXRlIGFzIGRlZmF1bHQsIHJlcGxhY2luZyB0aGUgdGFibGUncyBkZWZhdWx0IGhlYWRlciBjZWxsIHRlbXBsYXRlLlxuICpcbiAqIE1ha2Ugc3VyZSB5b3Ugc2V0IHRoZSBwcm9wZXIgaWQgb2YgdGhlIHByb3BlcnR5IHlvdSB3YW50IHRvIG92ZXJyaWRlLlxuICogV2hlbiB0aGUgYGlkYCBpcyBzZXQgZXhwbGljaXRseSBpbiB0aGUgdGFibGUgY29sdW1uIGRlZmluaXRpb24sIHRoaXMgaXMgbm90IGEgcHJvYmxlbSBidXQgd2hlbiBpZiBpdCdzIG5vdCBzZXRcbiAqIHRoZSB0YWJsZSBnZW5lcmF0ZXMgYSB1bmlxdWUgaWQgYmFzZWQgb24gYSBsb2dpYy4gSWYgYG5hbWVgIGlzIHNldCB0aGUgbmFtZSBpcyB1c2VkLCBpZiBubyBuYW1lIGlzIHNldFxuICogdGhlIGBwcm9wYCBpcyB1c2VkIChmdWxsIHdpdGggZG90IG5vdGF0aW9uKS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkSGVhZGVyQ2VsbERlZl0sIFtwYmxOZ3JpZEhlYWRlckNlbGxUeXBlRGVmXScsXG4gIGlucHV0czogW1xuICAgICduYW1lOnBibE5ncmlkSGVhZGVyQ2VsbERlZicsXG4gICAgJ3R5cGU6cGJsTmdyaWRIZWFkZXJDZWxsVHlwZURlZicsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlPFQ+IGV4dGVuZHMgUGJsTmdyaWRCYXNlQ2VsbERlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxUPj4ge1xuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxUPj4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyBzdXBlcih0UmVmLCByZWdpc3RyeSk7IH1cbn1cblxuLyoqXG4gKiBDZWxsIGRlZmluaXRpb24gZm9yIHRoZSBwYmwtbmdyaWQuXG4gKiBDYXB0dXJlcyB0aGUgdGVtcGxhdGUgb2YgYSBjb2x1bW4ncyBkYXRhIHJvdyBjZWxsIGFzIHdlbGwgYXMgY2VsbC1zcGVjaWZpYyBwcm9wZXJ0aWVzLlxuICpcbiAqIGBwYmxOZ3JpZENlbGxEZWZgIGRvZXMgdGhlIHNhbWUgdGhpbmcgdGhhdCBgbWF0Q2VsbERlZmAgYW5kIGBjZGtDZWxsRGVmYCBkbyB3aXRoIG9uZSBkaWZmZXJlbmNlLCBgcGJsTmdyaWRDZWxsRGVmYCBpc1xuICogaW5kZXBlbmRlbnQgYW5kIGRvZXMgbm90IHJlcXVpcmUgYSBjb2x1bW4gZGVmaW5pdGlvbiBwYXJlbnQsIGluc3RlYWQgaXQgYWNjZXB0IHRoZSBJRCBvZiB0aGUgY2VsbC5cbiAqXG4gKiBOT1RFOiBEZWZpbmluZyAnKicgYXMgaWQgd2lsbCBkZWNsYXJlIHRoZSBjZWxsIHRlbXBsYXRlIGFzIGRlZmF1bHQsIHJlcGxhY2luZyB0aGUgdGFibGUncyBkZWZhdWx0IGNlbGwgdGVtcGxhdGUuXG4gKlxuICogTWFrZSBzdXJlIHlvdSBzZXQgdGhlIHByb3BlciBpZCBvZiB0aGUgcHJvcGVydHkgeW91IHdhbnQgdG8gb3ZlcnJpZGUuXG4gKiBXaGVuIHRoZSBgaWRgIGlzIHNldCBleHBsaWNpdGx5IGluIHRoZSB0YWJsZSBjb2x1bW4gZGVmaW5pdGlvbiwgdGhpcyBpcyBub3QgYSBwcm9ibGVtIGJ1dCB3aGVuIGlmIGl0J3Mgbm90IHNldFxuICogdGhlIHRhYmxlIGdlbmVyYXRlcyBhIHVuaXF1ZSBpZCBiYXNlZCBvbiBhIGxvZ2ljLiBJZiBgbmFtZWAgaXMgc2V0IHRoZSBuYW1lIGlzIHVzZWQsIGlmIG5vIG5hbWUgaXMgc2V0XG4gKiB0aGUgYHByb3BgIGlzIHVzZWQgKGZ1bGwgd2l0aCBkb3Qgbm90YXRpb24pLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTmdyaWRDZWxsRGVmXSwgW3BibE5ncmlkQ2VsbFR5cGVEZWZdJyxcbiAgaW5wdXRzOiBbXG4gICAgJ25hbWU6cGJsTmdyaWRDZWxsRGVmJyxcbiAgICAndHlwZTpwYmxOZ3JpZENlbGxUeXBlRGVmJyxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmU8VCwgUCBleHRlbmRzIGtleW9mIFBibENvbHVtblR5cGVEZWZpbml0aW9uRGF0YU1hcCA9IGFueT4gZXh0ZW5kcyBQYmxOZ3JpZEJhc2VDZWxsRGVmPFBibE5ncmlkQ2VsbENvbnRleHQ8VCwgUD4+IHtcbiAgdHlwZTogUDtcbiAgY29uc3RydWN0b3IodFJlZjogVGVtcGxhdGVSZWY8UGJsTmdyaWRDZWxsQ29udGV4dDxhbnksIFA+PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTmdyaWRDZWxsRWRpdG9yRGVmXSwgW3BibE5ncmlkQ2VsbEVkaXRvclR5cGVEZWZdJyxcbiAgaW5wdXRzOiBbXG4gICAgJ25hbWU6cGJsTmdyaWRDZWxsRWRpdG9yRGVmJyxcbiAgICAndHlwZTpwYmxOZ3JpZENlbGxFZGl0b3JUeXBlRGVmJyxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEVkaXRvckNlbGxEZWZEaXJlY3RpdmU8VCwgUCBleHRlbmRzIGtleW9mIFBibENvbHVtblR5cGVEZWZpbml0aW9uRGF0YU1hcCA9IGFueT4gZXh0ZW5kcyBQYmxOZ3JpZEJhc2VDZWxsRGVmPFBibE5ncmlkQ2VsbENvbnRleHQ8VCwgUD4+IHtcbiAgdHlwZTogUDtcbiAgY29uc3RydWN0b3IodFJlZjogVGVtcGxhdGVSZWY8UGJsTmdyaWRDZWxsQ29udGV4dDxhbnksIFA+PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTmdyaWRGb290ZXJDZWxsRGVmXSwgW3BibE5ncmlkRm9vdGVyQ2VsbFR5cGVEZWZdJyxcbiAgaW5wdXRzOiBbXG4gICAgJ25hbWU6cGJsTmdyaWRGb290ZXJDZWxsRGVmJyxcbiAgICAndHlwZTpwYmxOZ3JpZEZvb3RlckNlbGxUeXBlRGVmJyxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmU8VD4gZXh0ZW5kcyBQYmxOZ3JpZEJhc2VDZWxsRGVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PFQ+PiB7XG4gIGNvbnN0cnVjdG9yKHRSZWY6IFRlbXBsYXRlUmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PFQ+PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxufVxuXG5mdW5jdGlvbiBmaW5kQ2VsbERlZkJ5SWQ8VCBleHRlbmRzIFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZUJhc2U+KGNlbGxEZWZzOiBBcnJheTxUPiwgY29sRGVmOiBQaWNrPFBibE1ldGFDb2x1bW4sICdpZCcgfCAndHlwZSc+LCBzZWFyY2hQYXJlbnQ/OiBib29sZWFuKTogVCB7XG4gIGZvciAoY29uc3QgY2VsbERlZiBvZiBjZWxsRGVmcykge1xuICAgIGlmIChjZWxsRGVmLnR5cGUpIHtcbiAgICAgIGlmIChjb2xEZWYudHlwZSAmJiBjZWxsRGVmLnR5cGUgPT09IGNvbERlZi50eXBlLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGNlbGxEZWY7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGlkID0gY2VsbERlZi5uYW1lO1xuICAgICAgaWYgKGlkID09PSBjb2xEZWYuaWQpIHtcbiAgICAgICAgcmV0dXJuIGNlbGxEZWY7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kQ2VsbERlZjxUID0gYW55PihyZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsIGNvbERlZjogUGJsQ29sdW1uLCBraW5kOiAndGFibGVDZWxsJyB8ICdlZGl0b3JDZWxsJywgIHNlYXJjaFBhcmVudD86IGJvb2xlYW4pOiBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmU8VD47XG5leHBvcnQgZnVuY3Rpb24gZmluZENlbGxEZWY8VCA9IGFueT4ocmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLCBjb2xEZWY6IFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW4sIGtpbmQ6ICdoZWFkZXJDZWxsJywgc2VhcmNoUGFyZW50PzogYm9vbGVhbik6IFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZTxUPjtcbmV4cG9ydCBmdW5jdGlvbiBmaW5kQ2VsbERlZjxUID0gYW55PihyZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsIGNvbERlZjogUGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbiwga2luZDogJ2Zvb3RlckNlbGwnLCBzZWFyY2hQYXJlbnQ/OiBib29sZWFuKTogUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlPFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDZWxsRGVmPFQgPSBhbnk+KHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgY29sRGVmOiBDT0xVTU4sIGtpbmQ6ICdoZWFkZXJDZWxsJyB8ICdmb290ZXJDZWxsJyB8ICd0YWJsZUNlbGwnIHwgJ2VkaXRvckNlbGwnLCBzZWFyY2hQYXJlbnQ/OiBib29sZWFuKTogUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlPFQ+IHwgUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlPFQ+IHwgUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlIDxUPiB7XG4gIGNvbnN0IGNlbGxEZWZzOiBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmVCYXNlW10gPSByZWdpc3RyeS5nZXRNdWx0aShraW5kKTtcblxuICBpZiAoY2VsbERlZnMpIHtcbiAgICBsZXQgdHlwZTogUGljazxQYmxNZXRhQ29sdW1uLCAnaWQnIHwgJ3R5cGUnPjtcbiAgICBpZiAoaXNQYmxDb2x1bW4oY29sRGVmKSkge1xuICAgICAgc3dpdGNoIChraW5kKSB7XG4gICAgICAgIGNhc2UgJ2hlYWRlckNlbGwnOlxuICAgICAgICAgIGlmIChjb2xEZWYuaGVhZGVyVHlwZSkge1xuICAgICAgICAgICAgdHlwZSA9IHsgaWQ6IGNvbERlZi5pZCwgdHlwZTogY29sRGVmLmhlYWRlclR5cGUgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Zvb3RlckNlbGwnOlxuICAgICAgICAgIGlmIChjb2xEZWYuZm9vdGVyVHlwZSkge1xuICAgICAgICAgICAgdHlwZSA9IHsgaWQ6IGNvbERlZi5pZCwgdHlwZTogY29sRGVmLmZvb3RlclR5cGUgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdHlwZSkge1xuICAgICAgdHlwZSA9IGNvbERlZjtcbiAgICB9XG4gICAgY29uc3QgbWF0Y2g6IGFueSA9IGZpbmRDZWxsRGVmQnlJZChjZWxsRGVmcywgdHlwZSk7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfVxuICB9XG5cbiAgaWYgKHNlYXJjaFBhcmVudCAmJiByZWdpc3RyeS5wYXJlbnQpIHtcbiAgICByZXR1cm4gZmluZENlbGxEZWYocmVnaXN0cnkucGFyZW50LCBjb2xEZWYgYXMgYW55LCBraW5kIGFzIGFueSwgc2VhcmNoUGFyZW50KTtcbiAgfVxufVxuXG4iXX0=