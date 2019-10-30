import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { PblCdkTableComponent } from '../table';
import { ContextApi } from '../table/context/api';
import { PblNgridComponent } from '../table/table.component';
import { PblColumnStore } from '../table/columns/column-store';
import { DynamicColumnWidthLogic } from '../table/col-width-logic/dynamic-column-width';
import { PblCdkVirtualScrollViewportComponent } from '../table/features/virtual-scroll/virtual-scroll-viewport.component';
import { PblNgridEvents } from './types';
import { PblNgridMetaRowService } from '../table/meta-rows/index';
export declare const EXT_API_TOKEN: InjectionToken<{}>;
export interface PblNgridExtensionApi<T = any> {
    table: PblNgridComponent<T>;
    element: HTMLElement;
    cdkTable: PblCdkTableComponent<T>;
    columnStore: PblColumnStore;
    contextApi: ContextApi<T>;
    events: Observable<PblNgridEvents>;
    metaRowService: PblNgridMetaRowService;
    onInit(fn: () => void): void;
    setViewport(viewport: PblCdkVirtualScrollViewportComponent): void;
    dynamicColumnWidthFactory(): DynamicColumnWidthLogic;
}
