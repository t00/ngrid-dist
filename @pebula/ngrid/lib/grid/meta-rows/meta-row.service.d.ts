import { Observable } from 'rxjs';
import { PblNgridExtensionApi } from '../../ext/grid-ext-api';
import { PblMetaRowDefinitions } from '../columns/types';
import { PblMetaRowDirective } from './meta-row.directive';
import * as ɵngcc0 from '@angular/core';
export interface MetaRowSection {
    fixed: Array<{
        index: number;
        rowDef: PblMetaRowDefinitions;
        el?: HTMLElement;
    }>;
    row: Array<{
        index: number;
        rowDef: PblMetaRowDefinitions;
        el?: HTMLElement;
    }>;
    sticky: Array<{
        index: number;
        rowDef: PblMetaRowDefinitions;
        el?: HTMLElement;
    }>;
    all: PblMetaRowDefinitions[];
}
export declare class PblNgridMetaRowService<T = any> {
    readonly extApi: PblNgridExtensionApi<T>;
    gridWidthRow: {
        rowDef: PblMetaRowDefinitions;
        el: HTMLElement;
    };
    header: MetaRowSection;
    footer: MetaRowSection;
    readonly sync: Observable<void>;
    readonly hzScroll: Observable<number>;
    private sync$;
    private hzScroll$;
    constructor(extApi: PblNgridExtensionApi<T>);
    addMetaRow(metaRow: PblMetaRowDirective): void;
    removeMetaRow(metaRow: PblMetaRowDirective): void;
    private addToSection;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridMetaRowService<any>, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<PblNgridMetaRowService<any>>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3cuc2VydmljZS5kLnRzIiwic291cmNlcyI6WyJtZXRhLXJvdy5zZXJ2aWNlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uL2V4dC9ncmlkLWV4dC1hcGknO1xyXG5pbXBvcnQgeyBQYmxNZXRhUm93RGVmaW5pdGlvbnMgfSBmcm9tICcuLi9jb2x1bW5zL3R5cGVzJztcclxuaW1wb3J0IHsgUGJsTWV0YVJvd0RpcmVjdGl2ZSB9IGZyb20gJy4vbWV0YS1yb3cuZGlyZWN0aXZlJztcclxuZXhwb3J0IGludGVyZmFjZSBNZXRhUm93U2VjdGlvbiB7XHJcbiAgICBmaXhlZDogQXJyYXk8e1xyXG4gICAgICAgIGluZGV4OiBudW1iZXI7XHJcbiAgICAgICAgcm93RGVmOiBQYmxNZXRhUm93RGVmaW5pdGlvbnM7XHJcbiAgICAgICAgZWw/OiBIVE1MRWxlbWVudDtcclxuICAgIH0+O1xyXG4gICAgcm93OiBBcnJheTx7XHJcbiAgICAgICAgaW5kZXg6IG51bWJlcjtcclxuICAgICAgICByb3dEZWY6IFBibE1ldGFSb3dEZWZpbml0aW9ucztcclxuICAgICAgICBlbD86IEhUTUxFbGVtZW50O1xyXG4gICAgfT47XHJcbiAgICBzdGlja3k6IEFycmF5PHtcclxuICAgICAgICBpbmRleDogbnVtYmVyO1xyXG4gICAgICAgIHJvd0RlZjogUGJsTWV0YVJvd0RlZmluaXRpb25zO1xyXG4gICAgICAgIGVsPzogSFRNTEVsZW1lbnQ7XHJcbiAgICB9PjtcclxuICAgIGFsbDogUGJsTWV0YVJvd0RlZmluaXRpb25zW107XHJcbn1cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgUGJsTmdyaWRNZXRhUm93U2VydmljZTxUID0gYW55PiB7XHJcbiAgICByZWFkb25seSBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+O1xyXG4gICAgZ3JpZFdpZHRoUm93OiB7XHJcbiAgICAgICAgcm93RGVmOiBQYmxNZXRhUm93RGVmaW5pdGlvbnM7XHJcbiAgICAgICAgZWw6IEhUTUxFbGVtZW50O1xyXG4gICAgfTtcclxuICAgIGhlYWRlcjogTWV0YVJvd1NlY3Rpb247XHJcbiAgICBmb290ZXI6IE1ldGFSb3dTZWN0aW9uO1xyXG4gICAgcmVhZG9ubHkgc3luYzogT2JzZXJ2YWJsZTx2b2lkPjtcclxuICAgIHJlYWRvbmx5IGh6U2Nyb2xsOiBPYnNlcnZhYmxlPG51bWJlcj47XHJcbiAgICBwcml2YXRlIHN5bmMkO1xyXG4gICAgcHJpdmF0ZSBoelNjcm9sbCQ7XHJcbiAgICBjb25zdHJ1Y3RvcihleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+KTtcclxuICAgIGFkZE1ldGFSb3cobWV0YVJvdzogUGJsTWV0YVJvd0RpcmVjdGl2ZSk6IHZvaWQ7XHJcbiAgICByZW1vdmVNZXRhUm93KG1ldGFSb3c6IFBibE1ldGFSb3dEaXJlY3RpdmUpOiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBhZGRUb1NlY3Rpb247XHJcbn1cclxuIl19