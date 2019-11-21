/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// tslint:disable:use-input-property-decorator
import { Directive, TemplateRef, } from '@angular/core';
import { isPblColumn } from '../columns';
import { PblNgridRegistryService } from '../services/table-registry.service';
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
var /**
 * @abstract
 * @template Z
 */
PblNgridBaseCellDef = /** @class */ (function () {
    function PblNgridBaseCellDef(tRef, registry) {
        this.tRef = tRef;
        this.registry = registry;
    }
    /**
     * @return {?}
     */
    PblNgridBaseCellDef.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    PblNgridBaseCellDef.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
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
    };
    return PblNgridBaseCellDef;
}());
/**
 * @abstract
 * @template Z
 */
export { PblNgridBaseCellDef };
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
var PblNgridHeaderCellDefDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridHeaderCellDefDirective, _super);
    function PblNgridHeaderCellDefDirective(tRef, registry) {
        return _super.call(this, tRef, registry) || this;
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
    PblNgridHeaderCellDefDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: PblNgridRegistryService }
    ]; };
    return PblNgridHeaderCellDefDirective;
}(PblNgridBaseCellDef));
export { PblNgridHeaderCellDefDirective };
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
var PblNgridCellDefDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridCellDefDirective, _super);
    function PblNgridCellDefDirective(tRef, registry) {
        return _super.call(this, tRef, registry) || this;
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
    PblNgridCellDefDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: PblNgridRegistryService }
    ]; };
    return PblNgridCellDefDirective;
}(PblNgridBaseCellDef));
export { PblNgridCellDefDirective };
if (false) {
    /** @type {?} */
    PblNgridCellDefDirective.prototype.type;
}
/**
 * @template T, P
 */
var PblNgridEditorCellDefDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridEditorCellDefDirective, _super);
    function PblNgridEditorCellDefDirective(tRef, registry) {
        return _super.call(this, tRef, registry) || this;
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
    PblNgridEditorCellDefDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: PblNgridRegistryService }
    ]; };
    return PblNgridEditorCellDefDirective;
}(PblNgridBaseCellDef));
export { PblNgridEditorCellDefDirective };
if (false) {
    /** @type {?} */
    PblNgridEditorCellDefDirective.prototype.type;
}
/**
 * @template T
 */
var PblNgridFooterCellDefDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridFooterCellDefDirective, _super);
    function PblNgridFooterCellDefDirective(tRef, registry) {
        return _super.call(this, tRef, registry) || this;
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
    PblNgridFooterCellDefDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: PblNgridRegistryService }
    ]; };
    return PblNgridFooterCellDefDirective;
}(PblNgridBaseCellDef));
export { PblNgridFooterCellDefDirective };
/**
 * @template T
 * @param {?} cellDefs
 * @param {?} colDef
 * @param {?=} searchParent
 * @return {?}
 */
function findCellDefById(cellDefs, colDef, searchParent) {
    var e_1, _a;
    try {
        for (var cellDefs_1 = tslib_1.__values(cellDefs), cellDefs_1_1 = cellDefs_1.next(); !cellDefs_1_1.done; cellDefs_1_1 = cellDefs_1.next()) {
            var cellDef = cellDefs_1_1.value;
            if (cellDef.type) {
                if (colDef.type && cellDef.type === colDef.type.name) {
                    return cellDef;
                }
            }
            else {
                /** @type {?} */
                var id = cellDef.name;
                if (id === colDef.id) {
                    return cellDef;
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (cellDefs_1_1 && !cellDefs_1_1.done && (_a = cellDefs_1.return)) _a.call(cellDefs_1);
        }
        finally { if (e_1) throw e_1.error; }
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
    var cellDefs = registry.getMulti(kind);
    if (cellDefs) {
        /** @type {?} */
        var type = void 0;
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
        var match = findCellDefById(cellDefs, type);
        if (match) {
            return match;
        }
    }
    if (searchParent && registry.parent) {
        return findCellDef(registry.parent, (/** @type {?} */ (colDef)), (/** @type {?} */ (kind)), searchParent);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1kZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2RpcmVjdGl2ZXMvY2VsbC1kZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxXQUFXLEdBR1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFvRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFM0csT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7Ozs7QUFFN0Usa0RBR0M7OztJQUZDLDRDQUFhOztJQUNiLDRDQUEyQzs7Ozs7O0FBRzdDOzs7OztJQUlFLDZCQUFtQixJQUFvQixFQUNqQixRQUFpQztRQURwQyxTQUFJLEdBQUosSUFBSSxDQUFnQjtRQUNqQixhQUFRLEdBQVIsUUFBUSxDQUF5QjtJQUFJLENBQUM7Ozs7SUFFNUQsc0NBQVE7OztJQUFSO1FBQ0UsK0RBQStEO1FBQy9ELElBQUksSUFBSSxZQUFZLDhCQUE4QixFQUFFO1lBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1QzthQUFNLElBQUksSUFBSSxZQUFZLHdCQUF3QixFQUFFO1lBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMzQzthQUFNLElBQUksSUFBSSxZQUFZLDhCQUE4QixFQUFFO1lBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1QzthQUFNLElBQUksSUFBSSxZQUFZLDhCQUE4QixFQUFFO1lBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUM7Ozs7SUFFRCx5Q0FBVzs7O0lBQVg7UUFDRSxJ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QUFLLEVBQUU7WUFDVCxPQUFPLEtBQUssQ0FBQztTQUNkO0tBQ0Y7SUFFRCxJQUFJLFlBQVksSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO1FBQ25DLE9BQU8sV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsbUJBQUEsTUFBTSxFQUFPLEVBQUUsbUJBQUEsSUFBSSxFQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDL0U7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6dXNlLWlucHV0LXByb3BlcnR5LWRlY29yYXRvclxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBUZW1wbGF0ZVJlZixcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDT0xVTU4sIFBibENvbHVtblR5cGVEZWZpbml0aW9uRGF0YU1hcCwgUGJsQ29sdW1uLCBQYmxNZXRhQ29sdW1uLCBpc1BibENvbHVtbiB9IGZyb20gJy4uL2NvbHVtbnMnO1xuaW1wb3J0IHsgUGJsTmdyaWRDZWxsQ29udGV4dCwgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L2luZGV4JztcbmltcG9ydCB7IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdGFibGUtcmVnaXN0cnkuc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlQmFzZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZToga2V5b2YgUGJsQ29sdW1uVHlwZURlZmluaXRpb25EYXRhTWFwO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGJsTmdyaWRCYXNlQ2VsbERlZjxaPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmVCYXNlIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBrZXlvZiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbkRhdGFNYXA7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRSZWY6IFRlbXBsYXRlUmVmPFo+LFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyBUT0RPOiBsaXN0ZW4gdG8gcHJvcGVydHkgY2hhbmdlcyAobmFtZSkgYW5kIHJlLXJlZ2lzdGVyIGNlbGxcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSkge1xuICAgICAgdGhpcy5yZWdpc3RyeS5hZGRNdWx0aSgnaGVhZGVyQ2VsbCcsIHRoaXMpO1xuICAgIH0gZWxzZSBpZiAodGhpcyBpbnN0YW5jZW9mIFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZSkge1xuICAgICAgdGhpcy5yZWdpc3RyeS5hZGRNdWx0aSgndGFibGVDZWxsJywgdGhpcyk7XG4gICAgfSBlbHNlIGlmICh0aGlzIGluc3RhbmNlb2YgUGJsTmdyaWRFZGl0b3JDZWxsRGVmRGlyZWN0aXZlKSB7XG4gICAgICB0aGlzLnJlZ2lzdHJ5LmFkZE11bHRpKCdlZGl0b3JDZWxsJywgdGhpcyk7XG4gICAgfSBlbHNlIGlmICh0aGlzIGluc3RhbmNlb2YgUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlKSB7XG4gICAgICB0aGlzLnJlZ2lzdHJ5LmFkZE11bHRpKCdmb290ZXJDZWxsJywgdGhpcyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmUpIHtcbiAgICAgIHRoaXMucmVnaXN0cnkucmVtb3ZlTXVsdGkoJ2hlYWRlckNlbGwnLCB0aGlzKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMgaW5zdGFuY2VvZiBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmUpIHtcbiAgICAgIHRoaXMucmVnaXN0cnkucmVtb3ZlTXVsdGkoJ3RhYmxlQ2VsbCcsIHRoaXMpO1xuICAgIH0gZWxzZSBpZiAodGhpcyBpbnN0YW5jZW9mIFBibE5ncmlkRWRpdG9yQ2VsbERlZkRpcmVjdGl2ZSkge1xuICAgICAgdGhpcy5yZWdpc3RyeS5yZW1vdmVNdWx0aSgnZWRpdG9yQ2VsbCcsIHRoaXMpO1xuICAgIH0gZWxzZSBpZiAodGhpcyBpbnN0YW5jZW9mIFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZSkge1xuICAgICAgdGhpcy5yZWdpc3RyeS5yZW1vdmVNdWx0aSgnZm9vdGVyQ2VsbCcsIHRoaXMpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEhlYWRlciBDZWxsIGRlZmluaXRpb24gZm9yIHRoZSBwYmwtbmdyaWQuXG4gKiBDYXB0dXJlcyB0aGUgdGVtcGxhdGUgb2YgYSBjb2x1bW4ncyBkYXRhIHJvdyBoZWFkZXIgY2VsbCBhcyB3ZWxsIGFzIGhlYWRlciBjZWxsLXNwZWNpZmljIHByb3BlcnRpZXMuXG4gKlxuICogYHBibE5ncmlkSGVhZGVyQ2VsbERlZmAgZG9lcyB0aGUgc2FtZSB0aGluZyB0aGF0IGBtYXRIZWFkZXJDZWxsRGVmYCBhbmQgYGNka0hlYWRlckNlbGxEZWZgIGRvIHdpdGggb25lIGRpZmZlcmVuY2UsXG4gKiBgcGJsTmdyaWRIZWFkZXJDZWxsRGVmYCBpcyBpbmRlcGVuZGVudCBhbmQgZG9lcyBub3QgcmVxdWlyZSBhIGNvbHVtbiBkZWZpbml0aW9uIHBhcmVudCwgaW5zdGVhZCBpdCBhY2NlcHQgdGhlIElEIG9mXG4gKiB0aGUgaGVhZGVyIGNlbGwuXG4gKlxuICogTk9URTogRGVmaW5pbmcgJyonIGFzIGlkIHdpbGwgZGVjbGFyZSB0aGUgaGVhZGVyIGNlbGwgdGVtcGxhdGUgYXMgZGVmYXVsdCwgcmVwbGFjaW5nIHRoZSB0YWJsZSdzIGRlZmF1bHQgaGVhZGVyIGNlbGwgdGVtcGxhdGUuXG4gKlxuICogTWFrZSBzdXJlIHlvdSBzZXQgdGhlIHByb3BlciBpZCBvZiB0aGUgcHJvcGVydHkgeW91IHdhbnQgdG8gb3ZlcnJpZGUuXG4gKiBXaGVuIHRoZSBgaWRgIGlzIHNldCBleHBsaWNpdGx5IGluIHRoZSB0YWJsZSBjb2x1bW4gZGVmaW5pdGlvbiwgdGhpcyBpcyBub3QgYSBwcm9ibGVtIGJ1dCB3aGVuIGlmIGl0J3Mgbm90IHNldFxuICogdGhlIHRhYmxlIGdlbmVyYXRlcyBhIHVuaXF1ZSBpZCBiYXNlZCBvbiBhIGxvZ2ljLiBJZiBgbmFtZWAgaXMgc2V0IHRoZSBuYW1lIGlzIHVzZWQsIGlmIG5vIG5hbWUgaXMgc2V0XG4gKiB0aGUgYHByb3BgIGlzIHVzZWQgKGZ1bGwgd2l0aCBkb3Qgbm90YXRpb24pLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTmdyaWRIZWFkZXJDZWxsRGVmXSwgW3BibE5ncmlkSGVhZGVyQ2VsbFR5cGVEZWZdJyxcbiAgaW5wdXRzOiBbXG4gICAgJ25hbWU6cGJsTmdyaWRIZWFkZXJDZWxsRGVmJyxcbiAgICAndHlwZTpwYmxOZ3JpZEhlYWRlckNlbGxUeXBlRGVmJyxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmU8VD4gZXh0ZW5kcyBQYmxOZ3JpZEJhc2VDZWxsRGVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PFQ+PiB7XG4gIGNvbnN0cnVjdG9yKHRSZWY6IFRlbXBsYXRlUmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PFQ+PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxufVxuXG4vKipcbiAqIENlbGwgZGVmaW5pdGlvbiBmb3IgdGhlIHBibC1uZ3JpZC5cbiAqIENhcHR1cmVzIHRoZSB0ZW1wbGF0ZSBvZiBhIGNvbHVtbidzIGRhdGEgcm93IGNlbGwgYXMgd2VsbCBhcyBjZWxsLXNwZWNpZmljIHByb3BlcnRpZXMuXG4gKlxuICogYHBibE5ncmlkQ2VsbERlZmAgZG9lcyB0aGUgc2FtZSB0aGluZyB0aGF0IGBtYXRDZWxsRGVmYCBhbmQgYGNka0NlbGxEZWZgIGRvIHdpdGggb25lIGRpZmZlcmVuY2UsIGBwYmxOZ3JpZENlbGxEZWZgIGlzXG4gKiBpbmRlcGVuZGVudCBhbmQgZG9lcyBub3QgcmVxdWlyZSBhIGNvbHVtbiBkZWZpbml0aW9uIHBhcmVudCwgaW5zdGVhZCBpdCBhY2NlcHQgdGhlIElEIG9mIHRoZSBjZWxsLlxuICpcbiAqIE5PVEU6IERlZmluaW5nICcqJyBhcyBpZCB3aWxsIGRlY2xhcmUgdGhlIGNlbGwgdGVtcGxhdGUgYXMgZGVmYXVsdCwgcmVwbGFjaW5nIHRoZSB0YWJsZSdzIGRlZmF1bHQgY2VsbCB0ZW1wbGF0ZS5cbiAqXG4gKiBNYWtlIHN1cmUgeW91IHNldCB0aGUgcHJvcGVyIGlkIG9mIHRoZSBwcm9wZXJ0eSB5b3Ugd2FudCB0byBvdmVycmlkZS5cbiAqIFdoZW4gdGhlIGBpZGAgaXMgc2V0IGV4cGxpY2l0bHkgaW4gdGhlIHRhYmxlIGNvbHVtbiBkZWZpbml0aW9uLCB0aGlzIGlzIG5vdCBhIHByb2JsZW0gYnV0IHdoZW4gaWYgaXQncyBub3Qgc2V0XG4gKiB0aGUgdGFibGUgZ2VuZXJhdGVzIGEgdW5pcXVlIGlkIGJhc2VkIG9uIGEgbG9naWMuIElmIGBuYW1lYCBpcyBzZXQgdGhlIG5hbWUgaXMgdXNlZCwgaWYgbm8gbmFtZSBpcyBzZXRcbiAqIHRoZSBgcHJvcGAgaXMgdXNlZCAoZnVsbCB3aXRoIGRvdCBub3RhdGlvbikuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxOZ3JpZENlbGxEZWZdLCBbcGJsTmdyaWRDZWxsVHlwZURlZl0nLFxuICBpbnB1dHM6IFtcbiAgICAnbmFtZTpwYmxOZ3JpZENlbGxEZWYnLFxuICAgICd0eXBlOnBibE5ncmlkQ2VsbFR5cGVEZWYnLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZTxULCBQIGV4dGVuZHMga2V5b2YgUGJsQ29sdW1uVHlwZURlZmluaXRpb25EYXRhTWFwID0gYW55PiBleHRlbmRzIFBibE5ncmlkQmFzZUNlbGxEZWY8UGJsTmdyaWRDZWxsQ29udGV4dDxULCBQPj4ge1xuICB0eXBlOiBQO1xuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZENlbGxDb250ZXh0PGFueSwgUD4+LCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHsgc3VwZXIodFJlZiwgcmVnaXN0cnkpOyB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxOZ3JpZENlbGxFZGl0b3JEZWZdLCBbcGJsTmdyaWRDZWxsRWRpdG9yVHlwZURlZl0nLFxuICBpbnB1dHM6IFtcbiAgICAnbmFtZTpwYmxOZ3JpZENlbGxFZGl0b3JEZWYnLFxuICAgICd0eXBlOnBibE5ncmlkQ2VsbEVkaXRvclR5cGVEZWYnLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRWRpdG9yQ2VsbERlZkRpcmVjdGl2ZTxULCBQIGV4dGVuZHMga2V5b2YgUGJsQ29sdW1uVHlwZURlZmluaXRpb25EYXRhTWFwID0gYW55PiBleHRlbmRzIFBibE5ncmlkQmFzZUNlbGxEZWY8UGJsTmdyaWRDZWxsQ29udGV4dDxULCBQPj4ge1xuICB0eXBlOiBQO1xuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZENlbGxDb250ZXh0PGFueSwgUD4+LCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHsgc3VwZXIodFJlZiwgcmVnaXN0cnkpOyB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxOZ3JpZEZvb3RlckNlbGxEZWZdLCBbcGJsTmdyaWRGb290ZXJDZWxsVHlwZURlZl0nLFxuICBpbnB1dHM6IFtcbiAgICAnbmFtZTpwYmxOZ3JpZEZvb3RlckNlbGxEZWYnLFxuICAgICd0eXBlOnBibE5ncmlkRm9vdGVyQ2VsbFR5cGVEZWYnLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZTxUPiBleHRlbmRzIFBibE5ncmlkQmFzZUNlbGxEZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8VD4+IHtcbiAgY29uc3RydWN0b3IodFJlZjogVGVtcGxhdGVSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8VD4+LCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHsgc3VwZXIodFJlZiwgcmVnaXN0cnkpOyB9XG59XG5cbmZ1bmN0aW9uIGZpbmRDZWxsRGVmQnlJZDxUIGV4dGVuZHMgUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlQmFzZT4oY2VsbERlZnM6IEFycmF5PFQ+LCBjb2xEZWY6IFBpY2s8UGJsTWV0YUNvbHVtbiwgJ2lkJyB8ICd0eXBlJz4sIHNlYXJjaFBhcmVudD86IGJvb2xlYW4pOiBUIHtcbiAgZm9yIChjb25zdCBjZWxsRGVmIG9mIGNlbGxEZWZzKSB7XG4gICAgaWYgKGNlbGxEZWYudHlwZSkge1xuICAgICAgaWYgKGNvbERlZi50eXBlICYmIGNlbGxEZWYudHlwZSA9PT0gY29sRGVmLnR5cGUubmFtZSkge1xuICAgICAgICByZXR1cm4gY2VsbERlZjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaWQgPSBjZWxsRGVmLm5hbWU7XG4gICAgICBpZiAoaWQgPT09IGNvbERlZi5pZCkge1xuICAgICAgICByZXR1cm4gY2VsbERlZjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDZWxsRGVmPFQgPSBhbnk+KHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgY29sRGVmOiBQYmxDb2x1bW4sIGtpbmQ6ICd0YWJsZUNlbGwnIHwgJ2VkaXRvckNlbGwnLCAgc2VhcmNoUGFyZW50PzogYm9vbGVhbik6IFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZTxUPjtcbmV4cG9ydCBmdW5jdGlvbiBmaW5kQ2VsbERlZjxUID0gYW55PihyZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsIGNvbERlZjogUGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbiwga2luZDogJ2hlYWRlckNlbGwnLCBzZWFyY2hQYXJlbnQ/OiBib29sZWFuKTogUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlPFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDZWxsRGVmPFQgPSBhbnk+KHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgY29sRGVmOiBQYmxNZXRhQ29sdW1uIHwgUGJsQ29sdW1uLCBraW5kOiAnZm9vdGVyQ2VsbCcsIHNlYXJjaFBhcmVudD86IGJvb2xlYW4pOiBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmU8VD47XG5leHBvcnQgZnVuY3Rpb24gZmluZENlbGxEZWY8VCA9IGFueT4ocmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLCBjb2xEZWY6IENPTFVNTiwga2luZDogJ2hlYWRlckNlbGwnIHwgJ2Zvb3RlckNlbGwnIHwgJ3RhYmxlQ2VsbCcgfCAnZWRpdG9yQ2VsbCcsIHNlYXJjaFBhcmVudD86IGJvb2xlYW4pOiBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmU8VD4gfCBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmU8VD4gfCBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmUgPFQ+IHtcbiAgY29uc3QgY2VsbERlZnM6IFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZUJhc2VbXSA9IHJlZ2lzdHJ5LmdldE11bHRpKGtpbmQpO1xuXG4gIGlmIChjZWxsRGVmcykge1xuICAgIGxldCB0eXBlOiBQaWNrPFBibE1ldGFDb2x1bW4sICdpZCcgfCAndHlwZSc+O1xuICAgIGlmIChpc1BibENvbHVtbihjb2xEZWYpKSB7XG4gICAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgICAgY2FzZSAnaGVhZGVyQ2VsbCc6XG4gICAgICAgICAgaWYgKGNvbERlZi5oZWFkZXJUeXBlKSB7XG4gICAgICAgICAgICB0eXBlID0geyBpZDogY29sRGVmLmlkLCB0eXBlOiBjb2xEZWYuaGVhZGVyVHlwZSB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZm9vdGVyQ2VsbCc6XG4gICAgICAgICAgaWYgKGNvbERlZi5mb290ZXJUeXBlKSB7XG4gICAgICAgICAgICB0eXBlID0geyBpZDogY29sRGVmLmlkLCB0eXBlOiBjb2xEZWYuZm9vdGVyVHlwZSB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICB0eXBlID0gY29sRGVmO1xuICAgIH1cbiAgICBjb25zdCBtYXRjaDogYW55ID0gZmluZENlbGxEZWZCeUlkKGNlbGxEZWZzLCB0eXBlKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9XG4gIH1cblxuICBpZiAoc2VhcmNoUGFyZW50ICYmIHJlZ2lzdHJ5LnBhcmVudCkge1xuICAgIHJldHVybiBmaW5kQ2VsbERlZihyZWdpc3RyeS5wYXJlbnQsIGNvbERlZiBhcyBhbnksIGtpbmQgYXMgYW55LCBzZWFyY2hQYXJlbnQpO1xuICB9XG59XG5cbiJdfQ==