import { PblNgridComponent } from '@pebula/ngrid';
import { PickPNP } from '../../utils';
export interface PblNgridSurfaceState extends PickPNP<PblNgridComponent, 'showHeader' | 'showFooter' | 'focusMode' | 'usePagination' | 'hideColumns' | 'fallbackMinHeight', never> {
}
export declare function registerGridHandlers(): void;
