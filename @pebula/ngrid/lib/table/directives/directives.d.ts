import { TemplateRef, AfterViewInit } from '@angular/core';
import { PblNgridComponent } from '../table.component';
/**
 * A directive that marks the template as a projected section inside the table.
 * The location of the project content is set by the position input.
 *
 * Note that this directive can only be set as the content inside the table.
 */
export declare class PblNgridOuterSectionDirective implements AfterViewInit {
    private table;
    private tRef;
    position: 'top' | 'bottom';
    constructor(table: PblNgridComponent<any>, tRef: TemplateRef<{
        $implicit: PblNgridComponent<any>;
    }>);
    ngAfterViewInit(): void;
}
