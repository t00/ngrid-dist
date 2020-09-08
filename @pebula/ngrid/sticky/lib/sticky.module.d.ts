import { PblNgridConfigService } from '@pebula/ngrid';
declare module '@pebula/ngrid/lib/grid/services/config' {
    interface PblNgridConfig {
        stickyPlugin?: {
            headers?: Array<'table' | number>;
            footers?: Array<'table' | number>;
            columnStart?: Array<string | number>;
            columnEnd?: Array<string | number>;
        };
    }
}
export declare class PblNgridStickyModule {
    static readonly NGRID_PLUGIN: never;
    constructor(parentModule: PblNgridStickyModule, configService: PblNgridConfigService);
}
