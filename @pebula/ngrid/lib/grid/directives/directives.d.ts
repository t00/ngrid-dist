import { TemplateRef, AfterViewInit } from '@angular/core';
import { PblNgridComponent } from '../ngrid.component';
/**
 * A directive that marks the template as a projected section inside the grid.
 * The location of the project content is set by the position input.
 *
 * Note that this directive can only be set as the content inside the grid.
 */
import * as ɵngcc0 from '@angular/core';
export declare class PblNgridOuterSectionDirective implements AfterViewInit {
    private grid;
    private tRef;
    position: 'top' | 'bottom';
    constructor(grid: PblNgridComponent<any>, tRef: TemplateRef<{
        $implicit: PblNgridComponent<any>;
    }>);
    ngAfterViewInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridOuterSectionDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridOuterSectionDirective, "[pblNgridOuterSection]", never, { "position": "pblNgridOuterSection"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5kLnRzIiwic291cmNlcyI6WyJkaXJlY3RpdmVzLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUmVmLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vbmdyaWQuY29tcG9uZW50JztcclxuLyoqXHJcbiAqIEEgZGlyZWN0aXZlIHRoYXQgbWFya3MgdGhlIHRlbXBsYXRlIGFzIGEgcHJvamVjdGVkIHNlY3Rpb24gaW5zaWRlIHRoZSBncmlkLlxyXG4gKiBUaGUgbG9jYXRpb24gb2YgdGhlIHByb2plY3QgY29udGVudCBpcyBzZXQgYnkgdGhlIHBvc2l0aW9uIGlucHV0LlxyXG4gKlxyXG4gKiBOb3RlIHRoYXQgdGhpcyBkaXJlY3RpdmUgY2FuIG9ubHkgYmUgc2V0IGFzIHRoZSBjb250ZW50IGluc2lkZSB0aGUgZ3JpZC5cclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIFBibE5ncmlkT3V0ZXJTZWN0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgICBwcml2YXRlIGdyaWQ7XHJcbiAgICBwcml2YXRlIHRSZWY7XHJcbiAgICBwb3NpdGlvbjogJ3RvcCcgfCAnYm90dG9tJztcclxuICAgIGNvbnN0cnVjdG9yKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHRSZWY6IFRlbXBsYXRlUmVmPHtcclxuICAgICAgICAkaW1wbGljaXQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT47XHJcbiAgICB9Pik7XHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZDtcclxufVxyXG4iXX0=