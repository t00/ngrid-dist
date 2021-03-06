import { Observable } from 'rxjs';
import { PblNgridExtensionApi } from '../../ext/grid-ext-api';
import { PblMetaRowDefinitions } from '../columns/types';
import { PblMetaRowDirective } from './meta-row.directive';
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
}
