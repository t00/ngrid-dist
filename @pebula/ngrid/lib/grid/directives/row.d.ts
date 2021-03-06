import { ElementRef, SimpleChanges, OnChanges, DoCheck } from '@angular/core';
import { CdkRow } from '@angular/cdk/table';
import { PblNgridExtensionApi } from '../../ext/grid-ext-api';
import { PblRowContext } from '../context/index';
import { PblNgridComponent } from '../ngrid.component';
export declare const PBL_NGRID_ROW_TEMPLATE: string;
export declare class PblNgridRowComponent<T = any> extends CdkRow implements OnChanges, DoCheck {
    protected extApi: PblNgridExtensionApi<T>;
    protected el: ElementRef<HTMLElement>;
    set row(value: T);
    /**
     * Optional grid instance, required only if the row is declared outside the scope of the grid.
     */
    grid: PblNgridComponent<T>;
    rowRenderIndex: number;
    context: PblRowContext<T>;
    private _classDiffer;
    private _lastClass;
    constructor(extApi: PblNgridExtensionApi<T>, el: ElementRef<HTMLElement>);
    updateRow(): void;
    ngDoCheck(): void;
    ngOnChanges(changes: SimpleChanges): void;
    getRend(): void;
    protected updateHostClass(): void;
}
