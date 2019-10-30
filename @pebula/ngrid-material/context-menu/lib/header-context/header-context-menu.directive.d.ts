import { PblNgridPluginController } from '@pebula/ngrid';
import { PblNgridOverlayPanelFactory, PblNgridOverlayPanel, PblNgridOverlayPanelConfig } from '@pebula/ngrid/overlay-panel';
declare module '@pebula/ngrid/lib/ext/types' {
    interface PblNgridPluginExtension {
        matHeaderContextMenu?: PblNgridMatHeaderContextMenuPlugin;
    }
}
export declare class PblNgridMatHeaderContextMenuPlugin {
    readonly pluginCtrl: PblNgridPluginController;
    style: any;
    config: PblNgridOverlayPanelConfig;
    readonly overlayPanel: PblNgridOverlayPanel;
    constructor(overlayPanelFactory: PblNgridOverlayPanelFactory, pluginCtrl: PblNgridPluginController);
}
