/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:no-output-rename
import { Inject, ChangeDetectorRef, Directive, ElementRef, Optional, SkipSelf, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { DragDrop, CdkDropListGroup, CdkDropList, CDK_DROP_LIST, DragDropRegistry, } from '@angular/cdk/drag-drop';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import { cdkDropList } from '../v7-compat';
import { CdkLazyDropList } from '../core/lazy-drag-drop';
import { PblDragDrop } from '../core';
/** @type {?} */
let _uniqueIdCounter = 0;
/**
 * @template T
 */
export class PblNgridAggregationContainerDirective extends CdkDropList {
    /**
     * @param {?} grid
     * @param {?} pluginCtrl
     * @param {?} element
     * @param {?} dragDrop
     * @param {?} changeDetectorRef
     * @param {?=} dir
     * @param {?=} group
     * @param {?=} dragDropRegistry
     * @param {?=} _document
     */
    constructor(grid, pluginCtrl, element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, // for v7 compat
    _document) {
        super(...cdkDropList(element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, _document));
        this.grid = grid;
        this.id = `pbl-ngrid-column-aggregation-container-${_uniqueIdCounter++}`;
        this.orientation = 'horizontal';
        this._draggablesSet = new Set();
        // super(element, dragDrop, changeDetectorRef, dir, group);
        /** @type {?} */
        const reorder = pluginCtrl.getPlugin('columnReorder');
        reorder.connectedTo = this.id;
        this.pblDropListRef.dropped
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            const item = (/** @type {?} */ (event.item));
            this.pending = undefined;
            this.grid.columnApi.addGroupBy(item.data.column);
        }));
        this.pblDropListRef.entered
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            const item = (/** @type {?} */ (event.item));
            this.pending = item.data.column;
            item.getPlaceholderElement().style.display = 'none';
            for (const c of item.data.getCells()) {
                c.style.display = 'none';
            }
        }));
        this.pblDropListRef.exited
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            const item = (/** @type {?} */ (event.item));
            this.pending = undefined;
            item.getPlaceholderElement().style.display = '';
            for (const c of item.data.getCells()) {
                c.style.display = '';
            }
        }));
    }
    /**
     * @return {?}
     */
    get pblDropListRef() { return (/** @type {?} */ (this._dropListRef)); }
    /**
     * @return {?}
     */
    ngOnInit() { CdkLazyDropList.prototype.ngOnInit.call(this); }
    /**
     * @param {?} drag
     * @return {?}
     */
    addDrag(drag) { return CdkLazyDropList.prototype.addDrag.call(this, drag); }
    /**
     * @param {?} drag
     * @return {?}
     */
    removeDrag(drag) { return CdkLazyDropList.prototype.removeDrag.call(this, drag); }
    /**
     * @return {?}
     */
    beforeStarted() { CdkLazyDropList.prototype.beforeStarted.call(this); }
}
PblNgridAggregationContainerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblAggregationContainer]',
                exportAs: 'pblAggregationContainer',
                inputs: [
                    'directContainerElement:cdkDropListDirectContainerElement'
                ],
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    'class': 'cdk-drop-list',
                    '[id]': 'id',
                },
                providers: [
                    { provide: DragDrop, useExisting: PblDragDrop },
                    { provide: CDK_DROP_LIST, useExisting: PblNgridAggregationContainerDirective },
                ],
            },] }
];
/** @nocollapse */
PblNgridAggregationContainerDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: PblNgridPluginController },
    { type: ElementRef },
    { type: DragDrop },
    { type: ChangeDetectorRef },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: CdkDropListGroup, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: DragDropRegistry, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
if (false) {
    /** @type {?} */
    PblNgridAggregationContainerDirective.prototype.id;
    /** @type {?} */
    PblNgridAggregationContainerDirective.prototype.orientation;
    /** @type {?} */
    PblNgridAggregationContainerDirective.prototype.pending;
    /**
     * Selector that will be used to determine the direct container element, starting from
     * the `cdkDropList` element and going down the DOM. Passing an alternate direct container element
     * is useful when the `cdkDropList` is not the direct parent (i.e. ancestor but not father)
     * of the draggable elements.
     * @type {?}
     */
    PblNgridAggregationContainerDirective.prototype.directContainerElement;
    /** @type {?} */
    PblNgridAggregationContainerDirective.prototype.originalElement;
    /** @type {?} */
    PblNgridAggregationContainerDirective.prototype._draggablesSet;
    /** @type {?} */
    PblNgridAggregationContainerDirective.prototype.grid;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRpb24tY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AvY29sdW1uL2FnZ3JlZ2F0aW9uLWNvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFDTCxNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBRVYsUUFBUSxFQUNSLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFDTCxRQUFRLEVBQ1IsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFFWCxhQUFhLEVBQ2IsZ0JBQWdCLEdBQ2pCLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSXpELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxTQUFTLENBQUM7O0lBRWxDLGdCQUFnQixHQUFHLENBQUM7Ozs7QUFpQnhCLE1BQU0sT0FBTyxxQ0FBK0MsU0FBUSxXQUFjOzs7Ozs7Ozs7Ozs7SUFNaEYsWUFBbUIsSUFBMEIsRUFDakMsVUFBb0MsRUFDcEMsT0FBZ0MsRUFDaEMsUUFBa0IsRUFDbEIsaUJBQW9DLEVBQ3hCLEdBQW9CLEVBQ1IsS0FBcUMsRUFDakQsZ0JBQTZDLEVBQUUsZ0JBQWdCO0lBQzdDLFNBQWU7UUFDdkQsS0FBSyxDQUFDLEdBQUcsV0FBVyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFB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QUU7O29CQUNKLE9BQU8sRUFBRSxlQUFlO29CQUN4QixNQUFNLEVBQUUsSUFBSTtpQkFDYjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUU7b0JBQy9DLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUscUNBQXFDLEVBQUU7aUJBQy9FO2FBQ0Y7Ozs7WUF4QlEsaUJBQWlCO1lBQUUsd0JBQXdCO1lBaEJsRCxVQUFVO1lBUVYsUUFBUTtZQVZSLGlCQUFpQjtZQVFWLGNBQWMsdUJBOENSLFFBQVE7WUEzQ3JCLGdCQUFnQix1QkE0Q0gsUUFBUSxZQUFJLFFBQVE7WUF4Q2pDLGdCQUFnQix1QkF5Q0gsUUFBUTs0Q0FDUixRQUFRLFlBQUksTUFBTSxTQUFDLFFBQVE7Ozs7SUFieEMsbURBQW9FOztJQUNwRSw0REFBc0Q7O0lBRXRELHdEQUFtQjs7Ozs7Ozs7SUFtRG5CLHVFQUErQjs7SUFFL0IsZ0VBQXlDOztJQUN6QywrREFBb0M7O0lBcER4QixxREFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1vdXRwdXQtcmVuYW1lXHJcblxyXG5pbXBvcnQge1xyXG4gIEluamVjdCxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3B0aW9uYWwsXHJcbiAgU2tpcFNlbGYsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XHJcbmltcG9ydCB7XHJcbiAgRHJhZ0Ryb3AsXHJcbiAgQ2RrRHJvcExpc3RHcm91cCxcclxuICBDZGtEcm9wTGlzdCxcclxuICBDZGtEcmFnLFxyXG4gIENES19EUk9QX0xJU1QsXHJcbiAgRHJhZ0Ryb3BSZWdpc3RyeSxcclxufSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcclxuXHJcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibENvbHVtbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xyXG5pbXBvcnQgeyBjZGtEcm9wTGlzdCB9IGZyb20gJy4uL3Y3LWNvbXBhdCc7XHJcbmltcG9ydCB7IENka0xhenlEcm9wTGlzdCB9IGZyb20gJy4uL2NvcmUvbGF6eS1kcmFnLWRyb3AnO1xyXG5pbXBvcnQgeyBQYmxEcmFnUmVmIH0gZnJvbSAnLi4vY29yZS9kcmFnLXJlZic7XHJcbmltcG9ydCB7IFBibERyb3BMaXN0UmVmIH0gZnJvbSAnLi4vY29yZS9kcm9wLWxpc3QtcmVmJztcclxuaW1wb3J0IHsgUGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4tcmVvcmRlci1wbHVnaW4nO1xyXG5pbXBvcnQgeyBQYmxEcmFnRHJvcCB9IGZyb20gJy4uL2NvcmUnO1xyXG5cclxubGV0IF91bmlxdWVJZENvdW50ZXIgPSAwO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbcGJsQWdncmVnYXRpb25Db250YWluZXJdJyxcclxuICBleHBvcnRBczogJ3BibEFnZ3JlZ2F0aW9uQ29udGFpbmVyJyxcclxuICBpbnB1dHM6IFtcclxuICAgICdkaXJlY3RDb250YWluZXJFbGVtZW50OmNka0Ryb3BMaXN0RGlyZWN0Q29udGFpbmVyRWxlbWVudCdcclxuICBdLFxyXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcclxuICAgICdjbGFzcyc6ICdjZGstZHJvcC1saXN0JyxcclxuICAgICdbaWRdJzogJ2lkJyxcclxuICB9LFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgeyBwcm92aWRlOiBEcmFnRHJvcCwgdXNlRXhpc3Rpbmc6IFBibERyYWdEcm9wIH0sXHJcbiAgICB7IHByb3ZpZGU6IENES19EUk9QX0xJU1QsIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZEFnZ3JlZ2F0aW9uQ29udGFpbmVyRGlyZWN0aXZlIH0sXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQWdncmVnYXRpb25Db250YWluZXJEaXJlY3RpdmU8VCA9IGFueT4gZXh0ZW5kcyBDZGtEcm9wTGlzdDxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQ2RrTGF6eURyb3BMaXN0PFQ+IHtcclxuICBpZCA9IGBwYmwtbmdyaWQtY29sdW1uLWFnZ3JlZ2F0aW9uLWNvbnRhaW5lci0ke191bmlxdWVJZENvdW50ZXIrK31gO1xyXG4gIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xyXG5cclxuICBwZW5kaW5nOiBQYmxDb2x1bW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPixcclxuICAgICAgICAgICAgICBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXHJcbiAgICAgICAgICAgICAgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXHJcbiAgICAgICAgICAgICAgZHJhZ0Ryb3A6IERyYWdEcm9wLFxyXG4gICAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkaXI/OiBEaXJlY3Rpb25hbGl0eSxcclxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBncm91cD86IENka0Ryb3BMaXN0R3JvdXA8Q2RrRHJvcExpc3Q+LFxyXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRyYWdEcm9wUmVnaXN0cnk/OiBEcmFnRHJvcFJlZ2lzdHJ5PGFueSwgYW55PiwgLy8gZm9yIHY3IGNvbXBhdFxyXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudD86IGFueSwpIHtcclxuICAgIHN1cGVyKC4uLmNka0Ryb3BMaXN0KGVsZW1lbnQsIGRyYWdEcm9wLCBjaGFuZ2VEZXRlY3RvclJlZiwgZGlyLCBncm91cCwgZHJhZ0Ryb3BSZWdpc3RyeSwgX2RvY3VtZW50KSk7XHJcbiAgICAvLyBzdXBlcihlbGVtZW50LCBkcmFnRHJvcCwgY2hhbmdlRGV0ZWN0b3JSZWYsIGRpciwgZ3JvdXApO1xyXG4gICAgY29uc3QgcmVvcmRlciA9IHBsdWdpbkN0cmwuZ2V0UGx1Z2luKCdjb2x1bW5SZW9yZGVyJyk7XHJcbiAgICByZW9yZGVyLmNvbm5lY3RlZFRvID0gdGhpcy5pZDtcclxuXHJcbiAgICB0aGlzLnBibERyb3BMaXN0UmVmLmRyb3BwZWRcclxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBldmVudC5pdGVtIGFzIFBibERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPGFueT4+O1xyXG4gICAgICAgIHRoaXMucGVuZGluZyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmdyaWQuY29sdW1uQXBpLmFkZEdyb3VwQnkoaXRlbS5kYXRhLmNvbHVtbik7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMucGJsRHJvcExpc3RSZWYuZW50ZXJlZFxyXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IGV2ZW50Lml0ZW0gYXMgUGJsRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8YW55Pj47XHJcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gaXRlbS5kYXRhLmNvbHVtbjtcclxuICAgICAgICBpdGVtLmdldFBsYWNlaG9sZGVyRWxlbWVudCgpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIGl0ZW0uZGF0YS5nZXRDZWxscygpKSB7XHJcbiAgICAgICAgICBjLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLnBibERyb3BMaXN0UmVmLmV4aXRlZFxyXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IGV2ZW50Lml0ZW0gYXMgUGJsRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8YW55Pj47XHJcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGl0ZW0uZ2V0UGxhY2Vob2xkZXJFbGVtZW50KCkuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgIGZvciAoY29uc3QgYyBvZiBpdGVtLmRhdGEuZ2V0Q2VsbHMoKSkge1xyXG4gICAgICAgICAgYy5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gICAgLyogQ2RrTGF6eURyb3BMaXN0IHN0YXJ0ICovXHJcbiAgLyoqXHJcbiAgICogU2VsZWN0b3IgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBkaXJlY3QgY29udGFpbmVyIGVsZW1lbnQsIHN0YXJ0aW5nIGZyb21cclxuICAgKiB0aGUgYGNka0Ryb3BMaXN0YCBlbGVtZW50IGFuZCBnb2luZyBkb3duIHRoZSBET00uIFBhc3NpbmcgYW4gYWx0ZXJuYXRlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudFxyXG4gICAqIGlzIHVzZWZ1bCB3aGVuIHRoZSBgY2RrRHJvcExpc3RgIGlzIG5vdCB0aGUgZGlyZWN0IHBhcmVudCAoaS5lLiBhbmNlc3RvciBidXQgbm90IGZhdGhlcilcclxuICAgKiBvZiB0aGUgZHJhZ2dhYmxlIGVsZW1lbnRzLlxyXG4gICAqL1xyXG4gIGRpcmVjdENvbnRhaW5lckVsZW1lbnQ6IHN0cmluZztcclxuICBnZXQgcGJsRHJvcExpc3RSZWYoKTogUGJsRHJvcExpc3RSZWY8YW55PiB7IHJldHVybiB0aGlzLl9kcm9wTGlzdFJlZiBhcyBhbnk7IH1cclxuICBvcmlnaW5hbEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xyXG4gIF9kcmFnZ2FibGVzU2V0ID0gbmV3IFNldDxDZGtEcmFnPigpO1xyXG4gIG5nT25Jbml0KCk6IHZvaWQgeyBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLm5nT25Jbml0LmNhbGwodGhpcyk7IH1cclxuICBhZGREcmFnKGRyYWc6IENka0RyYWcpOiB2b2lkIHsgcmV0dXJuIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYWRkRHJhZy5jYWxsKHRoaXMsIGRyYWcpOyB9XHJcbiAgcmVtb3ZlRHJhZyhkcmFnOiBDZGtEcmFnKTogYm9vbGVhbiB7IHJldHVybiBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLnJlbW92ZURyYWcuY2FsbCh0aGlzLCBkcmFnKTsgfVxyXG4gIGJlZm9yZVN0YXJ0ZWQoKTogdm9pZCB7IENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYmVmb3JlU3RhcnRlZC5jYWxsKHRoaXMpOyB9XHJcbiAgLyogQ2RrTGF6eURyb3BMaXN0IGVuZCAqL1xyXG5cclxufVxyXG4iXX0=