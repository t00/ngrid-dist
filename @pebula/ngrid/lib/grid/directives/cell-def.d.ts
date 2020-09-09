import { TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { PblColumnTypeDefinitionDataMap, PblColumn, PblMetaColumn } from '../columns';
import { PblNgridCellContext, PblNgridMetaCellContext } from '../context/index';
import { PblNgridRegistryService } from '../services/grid-registry.service';
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
}
export declare class PblNgridEditorCellDefDirective<T, P extends keyof PblColumnTypeDefinitionDataMap = any> extends PblNgridBaseCellDef<PblNgridCellContext<T, P>> {
    type: P;
    constructor(tRef: TemplateRef<PblNgridCellContext<any, P>>, registry: PblNgridRegistryService);
}
export declare class PblNgridFooterCellDefDirective<T> extends PblNgridBaseCellDef<PblNgridMetaCellContext<T>> {
    constructor(tRef: TemplateRef<PblNgridMetaCellContext<T>>, registry: PblNgridRegistryService);
}
export declare function findCellDef<T = any>(registry: PblNgridRegistryService, colDef: PblColumn, kind: 'tableCell' | 'editorCell', searchParent?: boolean): PblNgridCellDefDirective<T>;
export declare function findCellDef<T = any>(registry: PblNgridRegistryService, colDef: PblMetaColumn | PblColumn, kind: 'headerCell', searchParent?: boolean): PblNgridHeaderCellDefDirective<T>;
export declare function findCellDef<T = any>(registry: PblNgridRegistryService, colDef: PblMetaColumn | PblColumn, kind: 'footerCell', searchParent?: boolean): PblNgridFooterCellDefDirective<T>;
