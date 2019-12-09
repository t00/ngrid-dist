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
/** @type {?} */
let _uniqueIdCounter = 0;
/**
 * @template T
 */
export class PblNgridAggregationContainerDirective extends CdkDropList {
    /**
     * @param {?} table
     * @param {?} pluginCtrl
     * @param {?} element
     * @param {?} dragDrop
     * @param {?} changeDetectorRef
     * @param {?=} dir
     * @param {?=} group
     * @param {?=} dragDropRegistry
     * @param {?=} _document
     */
    constructor(table, pluginCtrl, element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, // for v7 compat
    _document) {
        super(...cdkDropList(element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, _document));
        this.table = table;
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
            this.table.columnApi.addGroupBy(item.data.column);
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
    PblNgridAggregationContainerDirective.prototype.table;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRpb24tY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AvY29sdW1uL2FnZ3JlZ2F0aW9uLWNvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFDTCxNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBRVYsUUFBUSxFQUNSLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFDTCxRQUFRLEVBQ1IsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFFWCxhQUFhLEVBQ2IsZ0JBQWdCLEdBQ2pCLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztJQUtyRCxnQkFBZ0IsR0FBRyxDQUFDOzs7O0FBZ0J4QixNQUFNLE9BQU8scUNBQStDLFNBQVEsV0FBYzs7Ozs7Ozs7Ozs7O0lBTWhGLFlBQW1CLEtBQTJCLEVBQ2xDLFVBQW9DLEVBQ3BDLE9BQWdDLEVBQ2hDLFFBQWtCLEVBQ2xCLGlCQUFvQyxFQUN4QixHQUFvQixFQUNSLEtBQXFDLEVBQ2pELGdCQUE2QyxFQUFFLGdCQUFnQjtJQUM3QyxTQUFlO1FBQ3ZELEtBQUssQ0FBQyxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztRQVRwRixV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LElBQUk7aUJBQ2I7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUscUNBQXFDLEVBQUU7aUJBQy9FO2FBQ0Y7Ozs7WUF0QlEsaUJBQWlCO1lBQUUsd0JBQXdCO1lBaEJsRCxVQUFVO1lBUVYsUUFBUTtZQVZSLGlCQUFpQjtZQVFWLGNBQWMsdUJBNENSLFFBQVE7WUF6Q3JCLGdCQUFnQix1QkEwQ0gsUUFBUSxZQUFJLFFBQVE7WUF0Q2pDLGdCQUFnQix1QkF1Q0gsUUFBUTs0Q0FDUixRQUFRLFlBQUksTUFBTSxTQUFDLFFBQVE7Ozs7SUFieEMsbURBQW9FOztJQUNwRSw0REFBc0Q7O0lBRXRELHdEQUFtQjs7Ozs7Ozs7SUFtRG5CLHVFQUErQjs7SUFFL0IsZ0VBQXlDOztJQUN6QywrREFBb0M7O0lBcER4QixzREFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1vdXRwdXQtcmVuYW1lXG5cbmltcG9ydCB7XG4gIEluamVjdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgU2tpcFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBEcmFnRHJvcCxcbiAgQ2RrRHJvcExpc3RHcm91cCxcbiAgQ2RrRHJvcExpc3QsXG4gIENka0RyYWcsXG4gIENES19EUk9QX0xJU1QsXG4gIERyYWdEcm9wUmVnaXN0cnksXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxDb2x1bW4gfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IGNka0Ryb3BMaXN0IH0gZnJvbSAnLi4vdjctY29tcGF0JztcbmltcG9ydCB7IENka0xhenlEcm9wTGlzdCB9IGZyb20gJy4uL2NvcmUvbGF6eS1kcmFnLWRyb3AnO1xuaW1wb3J0IHsgUGJsRHJhZ1JlZiB9IGZyb20gJy4uL2NvcmUvZHJhZy1yZWYnO1xuaW1wb3J0IHsgUGJsRHJvcExpc3RSZWYgfSBmcm9tICcuLi9jb3JlL2Ryb3AtbGlzdC1yZWYnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4tcmVvcmRlci1wbHVnaW4nO1xuXG5sZXQgX3VuaXF1ZUlkQ291bnRlciA9IDA7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxBZ2dyZWdhdGlvbkNvbnRhaW5lcl0nLFxuICBleHBvcnRBczogJ3BibEFnZ3JlZ2F0aW9uQ29udGFpbmVyJyxcbiAgaW5wdXRzOiBbXG4gICAgJ2RpcmVjdENvbnRhaW5lckVsZW1lbnQ6Y2RrRHJvcExpc3REaXJlY3RDb250YWluZXJFbGVtZW50J1xuICBdLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgJ2NsYXNzJzogJ2Nkay1kcm9wLWxpc3QnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDREtfRFJPUF9MSVNULCB1c2VFeGlzdGluZzogUGJsTmdyaWRBZ2dyZWdhdGlvbkNvbnRhaW5lckRpcmVjdGl2ZSB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEFnZ3JlZ2F0aW9uQ29udGFpbmVyRGlyZWN0aXZlPFQgPSBhbnk+IGV4dGVuZHMgQ2RrRHJvcExpc3Q8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIENka0xhenlEcm9wTGlzdDxUPiB7XG4gIGlkID0gYHBibC1uZ3JpZC1jb2x1bW4tYWdncmVnYXRpb24tY29udGFpbmVyLSR7X3VuaXF1ZUlkQ291bnRlcisrfWA7XG4gIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuXG4gIHBlbmRpbmc6IFBibENvbHVtbjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+LFxuICAgICAgICAgICAgICBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBkcmFnRHJvcDogRHJhZ0Ryb3AsXG4gICAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZGlyPzogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIGdyb3VwPzogQ2RrRHJvcExpc3RHcm91cDxDZGtEcm9wTGlzdD4sXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRyYWdEcm9wUmVnaXN0cnk/OiBEcmFnRHJvcFJlZ2lzdHJ5PGFueSwgYW55PiwgLy8gZm9yIHY3IGNvbXBhdFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ/OiBhbnksKSB7XG4gICAgc3VwZXIoLi4uY2RrRHJvcExpc3QoZWxlbWVudCwgZHJhZ0Ryb3AsIGNoYW5nZURldGVjdG9yUmVmLCBkaXIsIGdyb3VwLCBkcmFnRHJvcFJlZ2lzdHJ5LCBfZG9jdW1lbnQpKTtcbiAgICAvLyBzdXBlcihlbGVtZW50LCBkcmFnRHJvcCwgY2hhbmdlRGV0ZWN0b3JSZWYsIGRpciwgZ3JvdXApO1xuICAgIGNvbnN0IHJlb3JkZXIgPSBwbHVnaW5DdHJsLmdldFBsdWdpbignY29sdW1uUmVvcmRlcicpO1xuICAgIHJlb3JkZXIuY29ubmVjdGVkVG8gPSB0aGlzLmlkO1xuXG4gICAgdGhpcy5wYmxEcm9wTGlzdFJlZi5kcm9wcGVkXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBldmVudC5pdGVtIGFzIFBibERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPGFueT4+O1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudGFibGUuY29sdW1uQXBpLmFkZEdyb3VwQnkoaXRlbS5kYXRhLmNvbHVtbik7XG4gICAgICB9KTtcblxuICAgIHRoaXMucGJsRHJvcExpc3RSZWYuZW50ZXJlZFxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBpdGVtID0gZXZlbnQuaXRlbSBhcyBQYmxEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxhbnk+PjtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gaXRlbS5kYXRhLmNvbHVtbjtcbiAgICAgICAgaXRlbS5nZXRQbGFjZWhvbGRlckVsZW1lbnQoKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBmb3IgKGNvbnN0IGMgb2YgaXRlbS5kYXRhLmdldENlbGxzKCkpIHtcbiAgICAgICAgICBjLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgdGhpcy5wYmxEcm9wTGlzdFJlZi5leGl0ZWRcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgaXRlbSA9IGV2ZW50Lml0ZW0gYXMgUGJsRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8YW55Pj47XG4gICAgICAgIHRoaXMucGVuZGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgaXRlbS5nZXRQbGFjZWhvbGRlckVsZW1lbnQoKS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiBpdGVtLmRhdGEuZ2V0Q2VsbHMoKSkge1xuICAgICAgICAgIGMuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gICAgLyogQ2RrTGF6eURyb3BMaXN0IHN0YXJ0ICovXG4gIC8qKlxuICAgKiBTZWxlY3RvciB0aGF0IHdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgdGhlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudCwgc3RhcnRpbmcgZnJvbVxuICAgKiB0aGUgYGNka0Ryb3BMaXN0YCBlbGVtZW50IGFuZCBnb2luZyBkb3duIHRoZSBET00uIFBhc3NpbmcgYW4gYWx0ZXJuYXRlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudFxuICAgKiBpcyB1c2VmdWwgd2hlbiB0aGUgYGNka0Ryb3BMaXN0YCBpcyBub3QgdGhlIGRpcmVjdCBwYXJlbnQgKGkuZS4gYW5jZXN0b3IgYnV0IG5vdCBmYXRoZXIpXG4gICAqIG9mIHRoZSBkcmFnZ2FibGUgZWxlbWVudHMuXG4gICAqL1xuICBkaXJlY3RDb250YWluZXJFbGVtZW50OiBzdHJpbmc7XG4gIGdldCBwYmxEcm9wTGlzdFJlZigpOiBQYmxEcm9wTGlzdFJlZjxhbnk+IHsgcmV0dXJuIHRoaXMuX2Ryb3BMaXN0UmVmIGFzIGFueTsgfVxuICBvcmlnaW5hbEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBfZHJhZ2dhYmxlc1NldCA9IG5ldyBTZXQ8Q2RrRHJhZz4oKTtcbiAgbmdPbkluaXQoKTogdm9pZCB7IENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUubmdPbkluaXQuY2FsbCh0aGlzKTsgfVxuICBhZGREcmFnKGRyYWc6IENka0RyYWcpOiB2b2lkIHsgcmV0dXJuIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYWRkRHJhZy5jYWxsKHRoaXMsIGRyYWcpOyB9XG4gIHJlbW92ZURyYWcoZHJhZzogQ2RrRHJhZyk6IGJvb2xlYW4geyByZXR1cm4gQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5yZW1vdmVEcmFnLmNhbGwodGhpcywgZHJhZyk7IH1cbiAgYmVmb3JlU3RhcnRlZCgpOiB2b2lkIHsgQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5iZWZvcmVTdGFydGVkLmNhbGwodGhpcyk7IH1cbiAgLyogQ2RrTGF6eURyb3BMaXN0IGVuZCAqL1xuXG59XG4iXX0=