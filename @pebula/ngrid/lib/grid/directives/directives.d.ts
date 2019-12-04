import { TemplateRef, AfterViewInit } from '@angular/core';
import { PblNgridComponent } from '../ngrid.component';
/**
 * A directive that marks the template as a projected section inside the grid.
 * The location of the project content is set by the position input.
 *
 * Note that this directive can only be set as the content inside the grid.
 */
export declare class PblNgridOuterSectionDirective implements AfterViewInit {
    private grid;
    private tRef;
    position: 'top' | 'bottom';
    constructor(grid: PblNgridComponent<any>, tRef: TemplateRef<{
        $implicit: PblNgridComponent<any>;
    }>);
    ngAfterViewInit(): void;
}
