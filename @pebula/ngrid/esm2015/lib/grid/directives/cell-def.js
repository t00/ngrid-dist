/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/directives/cell-def.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    constructor(tRef, registry) {
        super(tRef, registry);
    }
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
    constructor(tRef, registry) {
        super(tRef, registry);
    }
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
    constructor(tRef, registry) {
        super(tRef, registry);
    }
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
    constructor(tRef, registry) {
        super(tRef, registry);
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1kZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvZGlyZWN0aXZlcy9jZWxsLWRlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFdBQVcsR0FHWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQW9FLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUzRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7OztBQUU1RSxrREFHQzs7O0lBRkMsNENBQWE7O0lBQ2IsNENBQTJDOzs7Ozs7QUFHN0MsTUFBTSxPQUFnQixtQkFBbUI7Ozs7O0lBSXZDLFlBQW1CLElBQW9CLEVBQ2pCLFFBQWlDO1FBRHBDLFNBQUksR0FBSixJQUFJLENBQWdCO1FBQ2pCLGFBQVEsR0FBUixRQUFRLENBQXlCO0lBQUksQ0FBQzs7OztJQUU1RCxRQUFRO1FBQ04sK0RBQStEO1FBQy9ELElBQUksSUFBSSxZQUFZLDhCQUE4QixFQUFFO1lBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1QzthQUFNLElBQUksSUFBSSxZQUFZLHdCQUF3QixFQUFFO1lBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMzQzthQUFNLElBQUksSUFBSSxZQUFZLDhCQUE4QixFQUFFO1lBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1QzthQUFNLElBQUksSUFBSSxZQUFZLDhCQUE4QixFQUFFO1lBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1Qs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c0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6dXNlLWlucHV0LXByb3BlcnR5LWRlY29yYXRvclxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBUZW1wbGF0ZVJlZixcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDT0xVTU4sIFBibENvbHVtblR5cGVEZWZpbml0aW9uRGF0YU1hcCwgUGJsQ29sdW1uLCBQYmxNZXRhQ29sdW1uLCBpc1BibENvbHVtbiB9IGZyb20gJy4uL2NvbHVtbnMnO1xuaW1wb3J0IHsgUGJsTmdyaWRDZWxsQ29udGV4dCwgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L2luZGV4JztcbmltcG9ydCB7IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZ3JpZC1yZWdpc3RyeS5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmVCYXNlIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBrZXlvZiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbkRhdGFNYXA7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYmxOZ3JpZEJhc2VDZWxsRGVmPFo+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZUJhc2Uge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IGtleW9mIFBibENvbHVtblR5cGVEZWZpbml0aW9uRGF0YU1hcDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdFJlZjogVGVtcGxhdGVSZWY8Wj4sXG4gICAgICAgICAgICAgIHByb3RlY3RlZCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIFRPRE86IGxpc3RlbiB0byBwcm9wZXJ0eSBjaGFuZ2VzIChuYW1lKSBhbmQgcmUtcmVnaXN0ZXIgY2VsbFxuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlKSB7XG4gICAgICB0aGlzLnJlZ2lzdHJ5LmFkZE11bHRpKCdoZWFkZXJDZWxsJywgdGhpcyk7XG4gICAgfSBlbHNlIGlmICh0aGlzIGluc3RhbmNlb2YgUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlKSB7XG4gICAgICB0aGlzLnJlZ2lzdHJ5LmFkZE11bHRpKCd0YWJsZUNlbGwnLCB0aGlzKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMgaW5zdGFuY2VvZiBQYmxOZ3JpZEVkaXRvckNlbGxEZWZEaXJlY3RpdmUpIHtcbiAgICAgIHRoaXMucmVnaXN0cnkuYWRkTXVsdGkoJ2VkaXRvckNlbGwnLCB0aGlzKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMgaW5zdGFuY2VvZiBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmUpIHtcbiAgICAgIHRoaXMucmVnaXN0cnkuYWRkTXVsdGkoJ2Zvb3RlckNlbGwnLCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSkge1xuICAgICAgdGhpcy5yZWdpc3RyeS5yZW1vdmVNdWx0aSgnaGVhZGVyQ2VsbCcsIHRoaXMpO1xuICAgIH0gZWxzZSBpZiAodGhpcyBpbnN0YW5jZW9mIFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZSkge1xuICAgICAgdGhpcy5yZWdpc3RyeS5yZW1vdmVNdWx0aSgndGFibGVDZWxsJywgdGhpcyk7XG4gICAgfSBlbHNlIGlmICh0aGlzIGluc3RhbmNlb2YgUGJsTmdyaWRFZGl0b3JDZWxsRGVmRGlyZWN0aXZlKSB7XG4gICAgICB0aGlzLnJlZ2lzdHJ5LnJlbW92ZU11bHRpKCdlZGl0b3JDZWxsJywgdGhpcyk7XG4gICAgfSBlbHNlIGlmICh0aGlzIGluc3RhbmNlb2YgUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlKSB7XG4gICAgICB0aGlzLnJlZ2lzdHJ5LnJlbW92ZU11bHRpKCdmb290ZXJDZWxsJywgdGhpcyk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogSGVhZGVyIENlbGwgZGVmaW5pdGlvbiBmb3IgdGhlIHBibC1uZ3JpZC5cbiAqIENhcHR1cmVzIHRoZSB0ZW1wbGF0ZSBvZiBhIGNvbHVtbidzIGRhdGEgcm93IGhlYWRlciBjZWxsIGFzIHdlbGwgYXMgaGVhZGVyIGNlbGwtc3BlY2lmaWMgcHJvcGVydGllcy5cbiAqXG4gKiBgcGJsTmdyaWRIZWFkZXJDZWxsRGVmYCBkb2VzIHRoZSBzYW1lIHRoaW5nIHRoYXQgYG1hdEhlYWRlckNlbGxEZWZgIGFuZCBgY2RrSGVhZGVyQ2VsbERlZmAgZG8gd2l0aCBvbmUgZGlmZmVyZW5jZSxcbiAqIGBwYmxOZ3JpZEhlYWRlckNlbGxEZWZgIGlzIGluZGVwZW5kZW50IGFuZCBkb2VzIG5vdCByZXF1aXJlIGEgY29sdW1uIGRlZmluaXRpb24gcGFyZW50LCBpbnN0ZWFkIGl0IGFjY2VwdCB0aGUgSUQgb2ZcbiAqIHRoZSBoZWFkZXIgY2VsbC5cbiAqXG4gKiBOT1RFOiBEZWZpbmluZyAnKicgYXMgaWQgd2lsbCBkZWNsYXJlIHRoZSBoZWFkZXIgY2VsbCB0ZW1wbGF0ZSBhcyBkZWZhdWx0LCByZXBsYWNpbmcgdGhlIHRhYmxlJ3MgZGVmYXVsdCBoZWFkZXIgY2VsbCB0ZW1wbGF0ZS5cbiAqXG4gKiBNYWtlIHN1cmUgeW91IHNldCB0aGUgcHJvcGVyIGlkIG9mIHRoZSBwcm9wZXJ0eSB5b3Ugd2FudCB0byBvdmVycmlkZS5cbiAqIFdoZW4gdGhlIGBpZGAgaXMgc2V0IGV4cGxpY2l0bHkgaW4gdGhlIHRhYmxlIGNvbHVtbiBkZWZpbml0aW9uLCB0aGlzIGlzIG5vdCBhIHByb2JsZW0gYnV0IHdoZW4gaWYgaXQncyBub3Qgc2V0XG4gKiB0aGUgdGFibGUgZ2VuZXJhdGVzIGEgdW5pcXVlIGlkIGJhc2VkIG9uIGEgbG9naWMuIElmIGBuYW1lYCBpcyBzZXQgdGhlIG5hbWUgaXMgdXNlZCwgaWYgbm8gbmFtZSBpcyBzZXRcbiAqIHRoZSBgcHJvcGAgaXMgdXNlZCAoZnVsbCB3aXRoIGRvdCBub3RhdGlvbikuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxOZ3JpZEhlYWRlckNlbGxEZWZdLCBbcGJsTmdyaWRIZWFkZXJDZWxsVHlwZURlZl0nLFxuICBpbnB1dHM6IFtcbiAgICAnbmFtZTpwYmxOZ3JpZEhlYWRlckNlbGxEZWYnLFxuICAgICd0eXBlOnBibE5ncmlkSGVhZGVyQ2VsbFR5cGVEZWYnLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZTxUPiBleHRlbmRzIFBibE5ncmlkQmFzZUNlbGxEZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8VD4+IHtcbiAgY29uc3RydWN0b3IodFJlZjogVGVtcGxhdGVSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8VD4+LCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHsgc3VwZXIodFJlZiwgcmVnaXN0cnkpOyB9XG59XG5cbi8qKlxuICogQ2VsbCBkZWZpbml0aW9uIGZvciB0aGUgcGJsLW5ncmlkLlxuICogQ2FwdHVyZXMgdGhlIHRlbXBsYXRlIG9mIGEgY29sdW1uJ3MgZGF0YSByb3cgY2VsbCBhcyB3ZWxsIGFzIGNlbGwtc3BlY2lmaWMgcHJvcGVydGllcy5cbiAqXG4gKiBgcGJsTmdyaWRDZWxsRGVmYCBkb2VzIHRoZSBzYW1lIHRoaW5nIHRoYXQgYG1hdENlbGxEZWZgIGFuZCBgY2RrQ2VsbERlZmAgZG8gd2l0aCBvbmUgZGlmZmVyZW5jZSwgYHBibE5ncmlkQ2VsbERlZmAgaXNcbiAqIGluZGVwZW5kZW50IGFuZCBkb2VzIG5vdCByZXF1aXJlIGEgY29sdW1uIGRlZmluaXRpb24gcGFyZW50LCBpbnN0ZWFkIGl0IGFjY2VwdCB0aGUgSUQgb2YgdGhlIGNlbGwuXG4gKlxuICogTk9URTogRGVmaW5pbmcgJyonIGFzIGlkIHdpbGwgZGVjbGFyZSB0aGUgY2VsbCB0ZW1wbGF0ZSBhcyBkZWZhdWx0LCByZXBsYWNpbmcgdGhlIHRhYmxlJ3MgZGVmYXVsdCBjZWxsIHRlbXBsYXRlLlxuICpcbiAqIE1ha2Ugc3VyZSB5b3Ugc2V0IHRoZSBwcm9wZXIgaWQgb2YgdGhlIHByb3BlcnR5IHlvdSB3YW50IHRvIG92ZXJyaWRlLlxuICogV2hlbiB0aGUgYGlkYCBpcyBzZXQgZXhwbGljaXRseSBpbiB0aGUgdGFibGUgY29sdW1uIGRlZmluaXRpb24sIHRoaXMgaXMgbm90IGEgcHJvYmxlbSBidXQgd2hlbiBpZiBpdCdzIG5vdCBzZXRcbiAqIHRoZSB0YWJsZSBnZW5lcmF0ZXMgYSB1bmlxdWUgaWQgYmFzZWQgb24gYSBsb2dpYy4gSWYgYG5hbWVgIGlzIHNldCB0aGUgbmFtZSBpcyB1c2VkLCBpZiBubyBuYW1lIGlzIHNldFxuICogdGhlIGBwcm9wYCBpcyB1c2VkIChmdWxsIHdpdGggZG90IG5vdGF0aW9uKS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkQ2VsbERlZl0sIFtwYmxOZ3JpZENlbGxUeXBlRGVmXScsXG4gIGlucHV0czogW1xuICAgICduYW1lOnBibE5ncmlkQ2VsbERlZicsXG4gICAgJ3R5cGU6cGJsTmdyaWRDZWxsVHlwZURlZicsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlPFQsIFAgZXh0ZW5kcyBrZXlvZiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbkRhdGFNYXAgPSBhbnk+IGV4dGVuZHMgUGJsTmdyaWRCYXNlQ2VsbERlZjxQYmxOZ3JpZENlbGxDb250ZXh0PFQsIFA+PiB7XG4gIHR5cGU6IFA7XG4gIGNvbnN0cnVjdG9yKHRSZWY6IFRlbXBsYXRlUmVmPFBibE5ncmlkQ2VsbENvbnRleHQ8YW55LCBQPj4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyBzdXBlcih0UmVmLCByZWdpc3RyeSk7IH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkQ2VsbEVkaXRvckRlZl0sIFtwYmxOZ3JpZENlbGxFZGl0b3JUeXBlRGVmXScsXG4gIGlucHV0czogW1xuICAgICduYW1lOnBibE5ncmlkQ2VsbEVkaXRvckRlZicsXG4gICAgJ3R5cGU6cGJsTmdyaWRDZWxsRWRpdG9yVHlwZURlZicsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRFZGl0b3JDZWxsRGVmRGlyZWN0aXZlPFQsIFAgZXh0ZW5kcyBrZXlvZiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbkRhdGFNYXAgPSBhbnk+IGV4dGVuZHMgUGJsTmdyaWRCYXNlQ2VsbERlZjxQYmxOZ3JpZENlbGxDb250ZXh0PFQsIFA+PiB7XG4gIHR5cGU6IFA7XG4gIGNvbnN0cnVjdG9yKHRSZWY6IFRlbXBsYXRlUmVmPFBibE5ncmlkQ2VsbENvbnRleHQ8YW55LCBQPj4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyBzdXBlcih0UmVmLCByZWdpc3RyeSk7IH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkRm9vdGVyQ2VsbERlZl0sIFtwYmxOZ3JpZEZvb3RlckNlbGxUeXBlRGVmXScsXG4gIGlucHV0czogW1xuICAgICduYW1lOnBibE5ncmlkRm9vdGVyQ2VsbERlZicsXG4gICAgJ3R5cGU6cGJsTmdyaWRGb290ZXJDZWxsVHlwZURlZicsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlPFQ+IGV4dGVuZHMgUGJsTmdyaWRCYXNlQ2VsbERlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxUPj4ge1xuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxUPj4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyBzdXBlcih0UmVmLCByZWdpc3RyeSk7IH1cbn1cblxuZnVuY3Rpb24gZmluZENlbGxEZWZCeUlkPFQgZXh0ZW5kcyBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmVCYXNlPihjZWxsRGVmczogQXJyYXk8VD4sIGNvbERlZjogUGljazxQYmxNZXRhQ29sdW1uLCAnaWQnIHwgJ3R5cGUnPiwgc2VhcmNoUGFyZW50PzogYm9vbGVhbik6IFQge1xuICBmb3IgKGNvbnN0IGNlbGxEZWYgb2YgY2VsbERlZnMpIHtcbiAgICBpZiAoY2VsbERlZi50eXBlKSB7XG4gICAgICBpZiAoY29sRGVmLnR5cGUgJiYgY2VsbERlZi50eXBlID09PSBjb2xEZWYudHlwZS5uYW1lKSB7XG4gICAgICAgIHJldHVybiBjZWxsRGVmO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpZCA9IGNlbGxEZWYubmFtZTtcbiAgICAgIGlmIChpZCA9PT0gY29sRGVmLmlkKSB7XG4gICAgICAgIHJldHVybiBjZWxsRGVmO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZENlbGxEZWY8VCA9IGFueT4ocmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLCBjb2xEZWY6IFBibENvbHVtbiwga2luZDogJ3RhYmxlQ2VsbCcgfCAnZWRpdG9yQ2VsbCcsICBzZWFyY2hQYXJlbnQ/OiBib29sZWFuKTogUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlPFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDZWxsRGVmPFQgPSBhbnk+KHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgY29sRGVmOiBQYmxNZXRhQ29sdW1uIHwgUGJsQ29sdW1uLCBraW5kOiAnaGVhZGVyQ2VsbCcsIHNlYXJjaFBhcmVudD86IGJvb2xlYW4pOiBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmU8VD47XG5leHBvcnQgZnVuY3Rpb24gZmluZENlbGxEZWY8VCA9IGFueT4ocmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLCBjb2xEZWY6IFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW4sIGtpbmQ6ICdmb290ZXJDZWxsJywgc2VhcmNoUGFyZW50PzogYm9vbGVhbik6IFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZTxUPjtcbmV4cG9ydCBmdW5jdGlvbiBmaW5kQ2VsbERlZjxUID0gYW55PihyZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsIGNvbERlZjogQ09MVU1OLCBraW5kOiAnaGVhZGVyQ2VsbCcgfCAnZm9vdGVyQ2VsbCcgfCAndGFibGVDZWxsJyB8ICdlZGl0b3JDZWxsJywgc2VhcmNoUGFyZW50PzogYm9vbGVhbik6IFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZTxUPiB8IFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZTxUPiB8IFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZSA8VD4ge1xuICBjb25zdCBjZWxsRGVmczogUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlQmFzZVtdID0gcmVnaXN0cnkuZ2V0TXVsdGkoa2luZCk7XG5cbiAgaWYgKGNlbGxEZWZzKSB7XG4gICAgbGV0IHR5cGU6IFBpY2s8UGJsTWV0YUNvbHVtbiwgJ2lkJyB8ICd0eXBlJz47XG4gICAgaWYgKGlzUGJsQ29sdW1uKGNvbERlZikpIHtcbiAgICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgICBjYXNlICdoZWFkZXJDZWxsJzpcbiAgICAgICAgICBpZiAoY29sRGVmLmhlYWRlclR5cGUpIHtcbiAgICAgICAgICAgIHR5cGUgPSB7IGlkOiBjb2xEZWYuaWQsIHR5cGU6IGNvbERlZi5oZWFkZXJUeXBlIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmb290ZXJDZWxsJzpcbiAgICAgICAgICBpZiAoY29sRGVmLmZvb3RlclR5cGUpIHtcbiAgICAgICAgICAgIHR5cGUgPSB7IGlkOiBjb2xEZWYuaWQsIHR5cGU6IGNvbERlZi5mb290ZXJUeXBlIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXR5cGUpIHtcbiAgICAgIHR5cGUgPSBjb2xEZWY7XG4gICAgfVxuICAgIGNvbnN0IG1hdGNoOiBhbnkgPSBmaW5kQ2VsbERlZkJ5SWQoY2VsbERlZnMsIHR5cGUpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzZWFyY2hQYXJlbnQgJiYgcmVnaXN0cnkucGFyZW50KSB7XG4gICAgcmV0dXJuIGZpbmRDZWxsRGVmKHJlZ2lzdHJ5LnBhcmVudCwgY29sRGVmIGFzIGFueSwga2luZCBhcyBhbnksIHNlYXJjaFBhcmVudCk7XG4gIH1cbn1cblxuIl19