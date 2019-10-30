import { PblNgridPluginContext } from '../ext/plugin-control';
import { PblNgridComponent } from './table.component';
declare module '../data-source/data-source' {
    interface PblDataSource<T = any, TData = any> {
        hostGrid: PblNgridComponent<T>;
    }
}
export declare function bindToDataSource(plugin: PblNgridPluginContext): void;
