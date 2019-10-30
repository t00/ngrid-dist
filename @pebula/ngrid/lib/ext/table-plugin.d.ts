import { PblNgridPluginExtension, PblNgridPluginExtensionFactories } from './types';
/** @internal */
export declare const PLUGIN_STORE: Map<never, TablePluginMetadata<never> & {
    target: any;
}>;
export interface TablePluginMetadata<P extends keyof PblNgridPluginExtension = keyof PblNgridPluginExtension> {
    id: P;
    factory?: P extends keyof PblNgridPluginExtensionFactories ? PblNgridPluginExtensionFactories[P] : never;
    runOnce?: () => void;
}
export declare function TablePlugin(metadata: TablePluginMetadata): (target: any) => void;
