/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { take } from 'rxjs/operators';
import { Input, Directive, ElementRef, Optional } from '@angular/core';
import { CdkDropList, CdkDrag, CdkDragHandle, CDK_DROP_LIST, DragDrop } from '@angular/cdk/drag-drop';
import { PblDropListRef } from './drop-list-ref';
import { PblDragRef } from './drag-ref';
import { PblDragDrop } from './drag-drop';
/**
 * @template T, DRef
 */
export class CdkLazyDropList extends CdkDropList {
    constructor() {
        super(...arguments);
        /* private */ this._draggablesSet = new Set();
    }
    /**
     * @return {?}
     */
    get pblDropListRef() { return (/** @type {?} */ (this._dropListRef)); }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.pblDropListRef instanceof PblDropListRef === false) {
            throw new Error('Invalid `DropListRef` injection, the ref is not an instance of PblDropListRef');
        }
        this._dropListRef.beforeStarted.subscribe((/**
         * @return {?}
         */
        () => this.beforeStarted()));
    }
    /**
     * @param {?} drag
     * @return {?}
     */
    addDrag(drag) {
        this._draggablesSet.add(drag);
        this._draggables.reset(Array.from(this._draggablesSet.values()));
        this._draggables.notifyOnChanges(); // TODO: notify with asap schedular and obs$
    }
    /**
     * @param {?} drag
     * @return {?}
     */
    removeDrag(drag) {
        /** @type {?} */
        const result = this._draggablesSet.delete(drag);
        if (result) {
            this._draggables.reset(Array.from(this._draggablesSet.values()));
            this._draggables.notifyOnChanges(); // TODO: notify with asap schedular and obs$
        }
        return result;
    }
    /* protected */ /**
     * @return {?}
     */
    beforeStarted() {
        // This is a workaround for https://github.com/angular/material2/pull/14153
        // Working around the missing capability for selecting a container element that is not the drop container host.
        if (!this.originalElement) {
            this.originalElement = this.element;
        }
        if (this.directContainerElement) {
            /** @type {?} */
            const element = (/** @type {?} */ (this.originalElement.nativeElement.querySelector(this.directContainerElement)));
            this.element = new ElementRef(element);
        }
        else {
            this.element = this.originalElement;
        }
        this.pblDropListRef.withElement(this.element);
    }
}
CdkLazyDropList.decorators = [
    { type: Directive, args: [{
                selector: '[cdkLazyDropList]',
                exportAs: 'cdkLazyDropList',
                providers: [
                    { provide: DragDrop, useExisting: PblDragDrop },
                    { provide: CDK_DROP_LIST, useClass: CdkLazyDropList },
                ],
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    'class': 'cdk-drop-list',
                    '[id]': 'id',
                    '[class.cdk-drop-list-dragging]': '_dropListRef.isDragging()',
                    '[class.cdk-drop-list-receiving]': '_dropListRef.isReceiving()',
                }
            },] }
];
CdkLazyDropList.propDecorators = {
    directContainerElement: [{ type: Input, args: ['cdkDropListDirectContainerElement',] }]
};
if (false) {
    /**
     * Selector that will be used to determine the direct container element, starting from
     * the `cdkDropList` element and going down the DOM. Passing an alternate direct container element
     * is useful when the `cdkDropList` is not the direct parent (i.e. ancestor but not father)
     * of the draggable elements.
     * @type {?}
     */
    CdkLazyDropList.prototype.directContainerElement;
    /** @type {?} */
    CdkLazyDropList.prototype._draggables;
    /** @type {?} */
    CdkLazyDropList.prototype.originalElement;
    /** @type {?} */
    CdkLazyDropList.prototype._draggablesSet;
}
/**
 * @template T, Z, DRef
 */
export class CdkLazyDrag extends CdkDrag {
    constructor() {
        super(...arguments);
        /* private */ this._hostNotRoot = false;
    }
    /**
     * A class to set when the root element is not the host element. (i.e. when `cdkDragRootElement` is used).
     * @param {?} value
     * @return {?}
     */
    set rootElementSelectorClass(value) {
        if (value !== this._rootClass && this._hostNotRoot) {
            if (this._rootClass) {
                this.getRootElement().classList.remove(...this._rootClass.split(' '));
            }
            if (value) {
                this.getRootElement().classList.add(...value.split(' '));
            }
        }
        this._rootClass = value;
    }
    /**
     * @return {?}
     */
    get pblDragRef() { return (/** @type {?} */ (this._dragRef)); }
    /**
     * @return {?}
     */
    get cdkDropList() { return (/** @type {?} */ (this.dropContainer)); }
    /**
     * @param {?} value
     * @return {?}
     */
    set cdkDropList(value) {
        // TO SUPPORT `cdkDropList` via string input (ID) we need a reactive registry...
        if (this.cdkDropList) {
            this.cdkDropList.removeDrag(this);
        }
        this.dropContainer = value;
        if (value) {
            this._dragRef._withDropContainer(value._dropListRef);
            value.addDrag(this);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.pblDragRef instanceof PblDragRef === false) {
            throw new Error('Invalid `DragRef` injection, the ref is not an instance of PblDragRef');
        }
        this.pblDragRef.rootElementChanged.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            const rootElementSelectorClass = this._rootClass;
            /** @type {?} */
            const hostNotRoot = this.element.nativeElement !== event.curr;
            if (rootElementSelectorClass) {
                if (this._hostNotRoot) {
                    event.prev.classList.remove(...rootElementSelectorClass.split(' '));
                }
                if (hostNotRoot) {
                    event.curr.classList.add(...rootElementSelectorClass.split(' '));
                }
            }
            this._hostNotRoot = hostNotRoot;
        }));
    }
    // This is a workaround for https://github.com/angular/material2/pull/14158
    // Working around the issue of drop container is not the direct parent (father) of a drag item.
    // The entire ngAfterViewInit() overriding method can be removed if PR accepted.
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.started.subscribe((/**
         * @param {?} startedEvent
         * @return {?}
         */
        startedEvent => {
            if (this.dropContainer) {
                /** @type {?} */
                const element = this.getRootElement();
                /** @type {?} */
                const initialRootElementParent = (/** @type {?} */ (element.parentNode));
                if (!element.nextSibling && initialRootElementParent !== this.dropContainer.element.nativeElement) {
                    this.ended.pipe(take(1)).subscribe((/**
                     * @param {?} endedEvent
                     * @return {?}
                     */
                    endedEvent => initialRootElementParent.appendChild(element)));
                }
            }
        }));
        /* super.ngAfterViewInit(); */
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.cdkDropList) {
            this.cdkDropList.removeDrag(this);
        }
        /* super.ngOnDestroy(); */
    }
}
CdkLazyDrag.decorators = [
    { type: Directive, args: [{
                selector: '[cdkLazyDrag]',
                exportAs: 'cdkLazyDrag',
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    'class': 'cdk-drag',
                    '[class.cdk-drag-dragging]': '_dragRef.isDragging()',
                },
                providers: [
                    { provide: DragDrop, useExisting: PblDragDrop },
                ],
            },] }
];
CdkLazyDrag.propDecorators = {
    rootElementSelectorClass: [{ type: Input, args: ['cdkDragRootElementClass',] }],
    cdkDropList: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CdkLazyDrag.prototype._rootClass;
    /** @type {?} */
    CdkLazyDrag.prototype._hostNotRoot;
}
/**
 * Handle that can be used to drag and CdkDrag instance.
 */
export class PblDragHandle extends CdkDragHandle {
    /**
     * @param {?} element
     * @param {?=} parentDrag
     */
    constructor(element, parentDrag) {
        super(element, parentDrag);
        this.element = element;
    }
}
PblDragHandle.decorators = [
    { type: Directive, args: [{
                selector: '[pblDragHandle]',
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    'class': 'cdk-drag-handle'
                },
                providers: [
                    {
                        provide: CdkDragHandle,
                        useExisting: PblDragHandle
                    }
                ]
            },] }
];
/** @nocollapse */
PblDragHandle.ctorParameters = () => [
    { type: ElementRef },
    { type: CdkDrag, decorators: [{ type: Optional }] }
];
if (false) {
    /** @type {?} */
    PblDragHandle.prototype.element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1kcmFnLWRyb3AuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvZHJhZy1hbmQtZHJvcC9jb3JlL2xhenktZHJhZy1kcm9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUF3QixRQUFRLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDeEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7OztBQWdCMUMsTUFBTSxPQUFPLGVBQXFDLFNBQVEsV0FBYztJQWR4RTs7c0JBNkJnQixtQkFBYyxHQUFHLElBQUksR0FBRyxFQUFXLENBQUM7SUFzQ3BELENBQUM7Ozs7SUFwREMsSUFBSSxjQUFjLEtBQTJCLE9BQU8sbUJBQUEsSUFBSSxDQUFDLFlBQVksRUFBTyxDQUFDLENBQUMsQ0FBQzs7OztJQWdCL0UsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGNBQWMsWUFBWSxjQUFjLEtBQUssS0FBSyxFQUFFO1lBQzNELE1BQU0sSUFBSSxLQUFLLENBQUMsK0VBQStFLENBQUMsQ0FBQTtTQUNqRztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFNBQVM7OztRQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDO0lBQzFFLENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQWE7UUFDbkIsSUFB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VTtvQkFDbkIsMkJBQTJCLEVBQUUsdUJBQXVCO2lCQUNyRDtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUU7aUJBQ2hEO2FBQ0Y7Ozt1Q0FNRSxLQUFLLFNBQUMseUJBQXlCOzBCQWMvQixLQUFLOzs7O0lBYVEsaUNBQW1COztJQUNuQixtQ0FBcUI7Ozs7O0FBNERyQyxNQUFNLE9BQU8sYUFBYyxTQUFRLGFBQWE7Ozs7O0lBQzlDLFlBQW1CLE9BQWdDLEVBQWMsVUFBb0I7UUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQWpHLFlBQU8sR0FBUCxPQUFPLENBQXlCO0lBQWtFLENBQUM7OztZQWJ2SCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsSUFBSSxFQUFFOztvQkFDSixPQUFPLEVBQUUsaUJBQWlCO2lCQUMzQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0UsT0FBTyxFQUFFLGFBQWE7d0JBQ3RCLFdBQVcsRUFBRSxhQUFhO3FCQUMzQjtpQkFDRjthQUNGOzs7O1lBbEwwQixVQUFVO1lBQ2YsT0FBTyx1QkFtTDJCLFFBQVE7Ozs7SUFBbEQsZ0NBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgSW5wdXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUXVlcnlMaXN0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBBZnRlclZpZXdJbml0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2RrRHJvcExpc3QsIENka0RyYWcsIENka0RyYWdIYW5kbGUsIENES19EUk9QX0xJU1QsIERyYWdEcm9wIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XHJcbmltcG9ydCB7IFBibERyb3BMaXN0UmVmIH0gZnJvbSAnLi9kcm9wLWxpc3QtcmVmJztcclxuaW1wb3J0IHsgUGJsRHJhZ1JlZiB9IGZyb20gJy4vZHJhZy1yZWYnO1xyXG5pbXBvcnQgeyBQYmxEcmFnRHJvcCB9IGZyb20gJy4vZHJhZy1kcm9wJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2Nka0xhenlEcm9wTGlzdF0nLFxyXG4gIGV4cG9ydEFzOiAnY2RrTGF6eURyb3BMaXN0JyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHsgcHJvdmlkZTogRHJhZ0Ryb3AsIHVzZUV4aXN0aW5nOiBQYmxEcmFnRHJvcCB9LFxyXG4gICAgeyBwcm92aWRlOiBDREtfRFJPUF9MSVNULCB1c2VDbGFzczogQ2RrTGF6eURyb3BMaXN0IH0sXHJcbiAgXSxcclxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXHJcbiAgICAnY2xhc3MnOiAnY2RrLWRyb3AtbGlzdCcsXHJcbiAgICAnW2lkXSc6ICdpZCcsXHJcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtZHJhZ2dpbmddJzogJ19kcm9wTGlzdFJlZi5pc0RyYWdnaW5nKCknLFxyXG4gICAgJ1tjbGFzcy5jZGstZHJvcC1saXN0LXJlY2VpdmluZ10nOiAnX2Ryb3BMaXN0UmVmLmlzUmVjZWl2aW5nKCknLFxyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIENka0xhenlEcm9wTGlzdDxUID0gYW55LCBEUmVmID0gYW55PiBleHRlbmRzIENka0Ryb3BMaXN0PFQ+IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBnZXQgcGJsRHJvcExpc3RSZWYoKTogUGJsRHJvcExpc3RSZWY8RFJlZj4geyByZXR1cm4gdGhpcy5fZHJvcExpc3RSZWYgYXMgYW55OyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlbGVjdG9yIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGRldGVybWluZSB0aGUgZGlyZWN0IGNvbnRhaW5lciBlbGVtZW50LCBzdGFydGluZyBmcm9tXHJcbiAgICogdGhlIGBjZGtEcm9wTGlzdGAgZWxlbWVudCBhbmQgZ29pbmcgZG93biB0aGUgRE9NLiBQYXNzaW5nIGFuIGFsdGVybmF0ZSBkaXJlY3QgY29udGFpbmVyIGVsZW1lbnRcclxuICAgKiBpcyB1c2VmdWwgd2hlbiB0aGUgYGNka0Ryb3BMaXN0YCBpcyBub3QgdGhlIGRpcmVjdCBwYXJlbnQgKGkuZS4gYW5jZXN0b3IgYnV0IG5vdCBmYXRoZXIpXHJcbiAgICogb2YgdGhlIGRyYWdnYWJsZSBlbGVtZW50cy5cclxuICAgKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgQElucHV0KCdjZGtEcm9wTGlzdERpcmVjdENvbnRhaW5lckVsZW1lbnQnKSBkaXJlY3RDb250YWluZXJFbGVtZW50OiBzdHJpbmc7XHJcblxyXG4gIF9kcmFnZ2FibGVzOiBRdWVyeUxpc3Q8Q2RrRHJhZz47XHJcblxyXG4gIC8qIHByaXZhdGUgKi8gb3JpZ2luYWxFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcclxuICAvKiBwcml2YXRlICovIF9kcmFnZ2FibGVzU2V0ID0gbmV3IFNldDxDZGtEcmFnPigpO1xyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnBibERyb3BMaXN0UmVmIGluc3RhbmNlb2YgUGJsRHJvcExpc3RSZWYgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBgRHJvcExpc3RSZWZgIGluamVjdGlvbiwgdGhlIHJlZiBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgUGJsRHJvcExpc3RSZWYnKVxyXG4gICAgfVxyXG4gICAgdGhpcy5fZHJvcExpc3RSZWYuYmVmb3JlU3RhcnRlZC5zdWJzY3JpYmUoICgpID0+IHRoaXMuYmVmb3JlU3RhcnRlZCgpICk7XHJcbiAgfVxyXG5cclxuICBhZGREcmFnKGRyYWc6IENka0RyYWcpOiB2b2lkIHtcclxuICAgIHRoaXMuX2RyYWdnYWJsZXNTZXQuYWRkKGRyYWcpO1xyXG4gICAgdGhpcy5fZHJhZ2dhYmxlcy5yZXNldChBcnJheS5mcm9tKHRoaXMuX2RyYWdnYWJsZXNTZXQudmFsdWVzKCkpKTtcclxuICAgIHRoaXMuX2RyYWdnYWJsZXMubm90aWZ5T25DaGFuZ2VzKCk7IC8vIFRPRE86IG5vdGlmeSB3aXRoIGFzYXAgc2NoZWR1bGFyIGFuZCBvYnMkXHJcbiAgfVxyXG5cclxuICByZW1vdmVEcmFnKGRyYWc6IENka0RyYWcpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2RyYWdnYWJsZXNTZXQuZGVsZXRlKGRyYWcpO1xyXG4gICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICB0aGlzLl9kcmFnZ2FibGVzLnJlc2V0KEFycmF5LmZyb20odGhpcy5fZHJhZ2dhYmxlc1NldC52YWx1ZXMoKSkpO1xyXG4gICAgICB0aGlzLl9kcmFnZ2FibGVzLm5vdGlmeU9uQ2hhbmdlcygpOyAvLyBUT0RPOiBub3RpZnkgd2l0aCBhc2FwIHNjaGVkdWxhciBhbmQgb2JzJFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qIHByb3RlY3RlZCAqLyBiZWZvcmVTdGFydGVkKCk6IHZvaWQge1xyXG4gICAgLy8gVGhpcyBpcyBhIHdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9wdWxsLzE0MTUzXHJcbiAgICAvLyBXb3JraW5nIGFyb3VuZCB0aGUgbWlzc2luZyBjYXBhYmlsaXR5IGZvciBzZWxlY3RpbmcgYSBjb250YWluZXIgZWxlbWVudCB0aGF0IGlzIG5vdCB0aGUgZHJvcCBjb250YWluZXIgaG9zdC5cclxuICAgIGlmICghdGhpcy5vcmlnaW5hbEVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5vcmlnaW5hbEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5kaXJlY3RDb250YWluZXJFbGVtZW50KSB7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm9yaWdpbmFsRWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5kaXJlY3RDb250YWluZXJFbGVtZW50KSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgdGhpcy5lbGVtZW50ID0gbmV3IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KGVsZW1lbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5vcmlnaW5hbEVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLnBibERyb3BMaXN0UmVmLndpdGhFbGVtZW50KHRoaXMuZWxlbWVudCk7XHJcbiAgfVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tjZGtMYXp5RHJhZ10nLFxyXG4gIGV4cG9ydEFzOiAnY2RrTGF6eURyYWcnLFxyXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcclxuICAgICdjbGFzcyc6ICdjZGstZHJhZycsXHJcbiAgICAnW2NsYXNzLmNkay1kcmFnLWRyYWdnaW5nXSc6ICdfZHJhZ1JlZi5pc0RyYWdnaW5nKCknLFxyXG4gIH0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7IHByb3ZpZGU6IERyYWdEcm9wLCB1c2VFeGlzdGluZzogUGJsRHJhZ0Ryb3AgfSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2RrTGF6eURyYWc8VCA9IGFueSwgWiBleHRlbmRzIENka0xhenlEcm9wTGlzdDxUPiA9IENka0xhenlEcm9wTGlzdDxUPiwgRFJlZiA9IGFueT4gZXh0ZW5kcyBDZGtEcmFnPFQ+IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAvKipcclxuICAgKiBBIGNsYXNzIHRvIHNldCB3aGVuIHRoZSByb290IGVsZW1lbnQgaXMgbm90IHRoZSBob3N0IGVsZW1lbnQuIChpLmUuIHdoZW4gYGNka0RyYWdSb290RWxlbWVudGAgaXMgdXNlZCkuXHJcbiAgICovXHJcbiAgQElucHV0KCdjZGtEcmFnUm9vdEVsZW1lbnRDbGFzcycpIHNldCByb290RWxlbWVudFNlbGVjdG9yQ2xhc3ModmFsdWU6IHN0cmluZykgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWlucHV0LXJlbmFtZVxyXG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9yb290Q2xhc3MgJiYgdGhpcy5faG9zdE5vdFJvb3QpIHtcclxuICAgICAgaWYgKHRoaXMuX3Jvb3RDbGFzcykge1xyXG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QucmVtb3ZlKC4uLnRoaXMuX3Jvb3RDbGFzcy5zcGxpdCgnICcpKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLmdldFJvb3RFbGVtZW50KCkuY2xhc3NMaXN0LmFkZCguLi52YWx1ZS5zcGxpdCgnICcpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5fcm9vdENsYXNzID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgcGJsRHJhZ1JlZigpOiBQYmxEcmFnUmVmPERSZWY+IHsgcmV0dXJuIHRoaXMuX2RyYWdSZWYgYXMgYW55OyB9XHJcblxyXG4gIEBJbnB1dCgpIGdldCBjZGtEcm9wTGlzdCgpOiBaIHsgcmV0dXJuIHRoaXMuZHJvcENvbnRhaW5lciBhcyBaOyB9XHJcbiAgc2V0IGNka0Ryb3BMaXN0KHZhbHVlOiBaKSB7XHJcbiAgICAvLyBUTyBTVVBQT1JUIGBjZGtEcm9wTGlzdGAgdmlhIHN0cmluZyBpbnB1dCAoSUQpIHdlIG5lZWQgYSByZWFjdGl2ZSByZWdpc3RyeS4uLlxyXG4gICAgaWYgKHRoaXMuY2RrRHJvcExpc3QpIHtcclxuICAgICAgdGhpcy5jZGtEcm9wTGlzdC5yZW1vdmVEcmFnKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kcm9wQ29udGFpbmVyID0gdmFsdWU7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5fZHJhZ1JlZi5fd2l0aERyb3BDb250YWluZXIodmFsdWUuX2Ryb3BMaXN0UmVmKTtcclxuICAgICAgdmFsdWUuYWRkRHJhZyh0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qIHByaXZhdGUgKi8gX3Jvb3RDbGFzczogc3RyaW5nO1xyXG4gIC8qIHByaXZhdGUgKi8gX2hvc3ROb3RSb290ID0gZmFsc2U7XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGJsRHJhZ1JlZiBpbnN0YW5jZW9mIFBibERyYWdSZWYgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBgRHJhZ1JlZmAgaW5qZWN0aW9uLCB0aGUgcmVmIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBQYmxEcmFnUmVmJylcclxuICAgIH1cclxuICAgIHRoaXMucGJsRHJhZ1JlZi5yb290RWxlbWVudENoYW5nZWQuc3Vic2NyaWJlKCBldmVudCA9PiB7XHJcbiAgICAgIGNvbnN0IHJvb3RFbGVtZW50U2VsZWN0b3JDbGFzcyA9IHRoaXMuX3Jvb3RDbGFzcztcclxuICAgICAgY29uc3QgaG9zdE5vdFJvb3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCAhPT0gZXZlbnQuY3VycjtcclxuXHJcbiAgICAgIGlmIChyb290RWxlbWVudFNlbGVjdG9yQ2xhc3MpIHtcclxuICAgICAgICBpZiAodGhpcy5faG9zdE5vdFJvb3QpIHtcclxuICAgICAgICAgIGV2ZW50LnByZXYuY2xhc3NMaXN0LnJlbW92ZSguLi5yb290RWxlbWVudFNlbGVjdG9yQ2xhc3Muc3BsaXQoJyAnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChob3N0Tm90Um9vdCkge1xyXG4gICAgICAgICAgZXZlbnQuY3Vyci5jbGFzc0xpc3QuYWRkKC4uLnJvb3RFbGVtZW50U2VsZWN0b3JDbGFzcy5zcGxpdCgnICcpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5faG9zdE5vdFJvb3QgPSBob3N0Tm90Um9vdDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gVGhpcyBpcyBhIHdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9wdWxsLzE0MTU4XHJcbiAgLy8gV29ya2luZyBhcm91bmQgdGhlIGlzc3VlIG9mIGRyb3AgY29udGFpbmVyIGlzIG5vdCB0aGUgZGlyZWN0IHBhcmVudCAoZmF0aGVyKSBvZiBhIGRyYWcgaXRlbS5cclxuICAvLyBUaGUgZW50aXJlIG5nQWZ0ZXJWaWV3SW5pdCgpIG92ZXJyaWRpbmcgbWV0aG9kIGNhbiBiZSByZW1vdmVkIGlmIFBSIGFjY2VwdGVkLlxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3RhcnRlZC5zdWJzY3JpYmUoIHN0YXJ0ZWRFdmVudCA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmRyb3BDb250YWluZXIpIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5nZXRSb290RWxlbWVudCgpO1xyXG4gICAgICAgIGNvbnN0IGluaXRpYWxSb290RWxlbWVudFBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBpZiAoIWVsZW1lbnQubmV4dFNpYmxpbmcgJiYgaW5pdGlhbFJvb3RFbGVtZW50UGFyZW50ICE9PSB0aGlzLmRyb3BDb250YWluZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgICAgICB0aGlzLmVuZGVkLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCBlbmRlZEV2ZW50ID0+IGluaXRpYWxSb290RWxlbWVudFBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KSApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyogc3VwZXIubmdBZnRlclZpZXdJbml0KCk7ICovXHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmNka0Ryb3BMaXN0KSB7XHJcbiAgICAgIHRoaXMuY2RrRHJvcExpc3QucmVtb3ZlRHJhZyh0aGlzKTtcclxuICAgIH1cclxuICAgIC8qIHN1cGVyLm5nT25EZXN0cm95KCk7ICovXHJcbiAgfVxyXG59XHJcblxyXG4vKiogSGFuZGxlIHRoYXQgY2FuIGJlIHVzZWQgdG8gZHJhZyBhbmQgQ2RrRHJhZyBpbnN0YW5jZS4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbcGJsRHJhZ0hhbmRsZV0nLFxyXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcclxuICAgICdjbGFzcyc6ICdjZGstZHJhZy1oYW5kbGUnXHJcbiAgfSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogQ2RrRHJhZ0hhbmRsZSxcclxuICAgICAgdXNlRXhpc3Rpbmc6IFBibERyYWdIYW5kbGVcclxuICAgIH1cclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYmxEcmFnSGFuZGxlIGV4dGVuZHMgQ2RrRHJhZ0hhbmRsZSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBAT3B0aW9uYWwoKSBwYXJlbnREcmFnPzogQ2RrRHJhZykgeyBzdXBlcihlbGVtZW50LCBwYXJlbnREcmFnKTsgfVxyXG59XHJcbiJdfQ==