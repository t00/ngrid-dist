import { ElementRef, SimpleChanges, OnChanges, DoCheck } from '@angular/core';
import { CdkRow } from '@angular/cdk/table';
import { PblNgridExtensionApi } from '../../ext/grid-ext-api';
import { PblRowContext } from '../context/index';
import { PblNgridComponent } from '../ngrid.component';
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridRowComponent<any>, [{ optional: true; }, null]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<PblNgridRowComponent<any>, "pbl-ngrid-row[row]", ["pblNgridRow"], { "grid": "grid"; "row": "row"; }, {}, never, [".pbl-ngrid-row-prefix", ".pbl-ngrid-row-suffix"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmQudHMiLCJzb3VyY2VzIjpbInJvdy5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgU2ltcGxlQ2hhbmdlcywgT25DaGFuZ2VzLCBEb0NoZWNrIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENka1JvdyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XHJcbmltcG9ydCB7IFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vLi4vZXh0L2dyaWQtZXh0LWFwaSc7XHJcbmltcG9ydCB7IFBibFJvd0NvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L2luZGV4JztcclxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9uZ3JpZC5jb21wb25lbnQnO1xyXG5leHBvcnQgZGVjbGFyZSBjb25zdCBQQkxfTkdSSURfUk9XX1RFTVBMQVRFOiBzdHJpbmc7XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIFBibE5ncmlkUm93Q29tcG9uZW50PFQgPSBhbnk+IGV4dGVuZHMgQ2RrUm93IGltcGxlbWVudHMgT25DaGFuZ2VzLCBEb0NoZWNrIHtcclxuICAgIHByb3RlY3RlZCBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+O1xyXG4gICAgcHJvdGVjdGVkIGVsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcclxuICAgIHNldCByb3codmFsdWU6IFQpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBPcHRpb25hbCBncmlkIGluc3RhbmNlLCByZXF1aXJlZCBvbmx5IGlmIHRoZSByb3cgaXMgZGVjbGFyZWQgb3V0c2lkZSB0aGUgc2NvcGUgb2YgdGhlIGdyaWQuXHJcbiAgICAgKi9cclxuICAgIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xyXG4gICAgcm93UmVuZGVySW5kZXg6IG51bWJlcjtcclxuICAgIGNvbnRleHQ6IFBibFJvd0NvbnRleHQ8VD47XHJcbiAgICBwcml2YXRlIF9jbGFzc0RpZmZlcjtcclxuICAgIHByaXZhdGUgX2xhc3RDbGFzcztcclxuICAgIGNvbnN0cnVjdG9yKGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8VD4sIGVsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pik7XHJcbiAgICB1cGRhdGVSb3coKTogdm9pZDtcclxuICAgIG5nRG9DaGVjaygpOiB2b2lkO1xyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQ7XHJcbiAgICBnZXRSZW5kKCk6IHZvaWQ7XHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlSG9zdENsYXNzKCk6IHZvaWQ7XHJcbn1cclxuIl19