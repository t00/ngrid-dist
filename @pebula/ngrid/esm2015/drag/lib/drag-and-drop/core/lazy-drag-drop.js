/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { take } from 'rxjs/operators';
import { Input, Directive, ElementRef, Optional } from '@angular/core';
import { CdkDropList, CdkDrag, CdkDragHandle, CDK_DROP_LIST } from '@angular/cdk/drag-drop';
import { PblDropListRef } from './drop-list-ref';
import { PblDragRef } from './drag-ref';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1kcmFnLWRyb3AuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvZHJhZy1hbmQtZHJvcC9jb3JlL2xhenktZHJhZy1kcm9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUF3QixRQUFRLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFlBQVksQ0FBQzs7OztBQWV4QyxNQUFNLE9BQU8sZUFBcUMsU0FBUSxXQUFjO0lBYnhFOztzQkE0QmdCLG1CQUFjLEdBQUcsSUFBSSxHQUFHLEVBQVcsQ0FBQztJQXNDcEQsQ0FBQzs7OztJQXBEQyxJQUFJLGNBQWMsS0FBMkIsT0FBTyxtQkFBQSxJQUFJLENBQUMsWUFBWSxFQUFPLENBQUMsQ0FBQyxDQUFDOzs7O0lBZ0IvRSxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsY0FBYyxZQUFZLGNBQWMsS0FBSyxLQUFLLEVBQUU7WUFDM0QsTUFBTSxJQUFJLEtBQUssQ0FBQywrRUFBK0UsQ0FBQyxDQUFBO1NBQ2pHO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUzs7O1FBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUM7SUFDMUUsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsSUFBYTtRQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJ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Qjs7Ozs7QUE0RHJDLE1BQU0sT0FBTyxhQUFjLFNBQVEsYUFBYTs7Ozs7SUFDOUMsWUFBbUIsT0FBZ0MsRUFBYyxVQUFvQjtRQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFBakcsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7SUFBa0UsQ0FBQzs7O1lBYnZILFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixJQUFJLEVBQUU7O29CQUNKLE9BQU8sRUFBRSxpQkFBaUI7aUJBQzNCO2dCQUNELFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsYUFBYTt3QkFDdEIsV0FBVyxFQUFFLGFBQWE7cUJBQzNCO2lCQUNGO2FBQ0Y7Ozs7WUE3SzBCLFVBQVU7WUFDZixPQUFPLHVCQThLMkIsUUFBUTs7OztJQUFsRCxnQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSW5wdXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUXVlcnlMaXN0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBBZnRlclZpZXdJbml0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENka0Ryb3BMaXN0LCBDZGtEcmFnLCBDZGtEcmFnSGFuZGxlLCBDREtfRFJPUF9MSVNUIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBQYmxEcm9wTGlzdFJlZiB9IGZyb20gJy4vZHJvcC1saXN0LXJlZic7XG5pbXBvcnQgeyBQYmxEcmFnUmVmIH0gZnJvbSAnLi9kcmFnLXJlZic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjZGtMYXp5RHJvcExpc3RdJyxcbiAgZXhwb3J0QXM6ICdjZGtMYXp5RHJvcExpc3QnLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IENES19EUk9QX0xJU1QsIHVzZUNsYXNzOiBDZGtMYXp5RHJvcExpc3QgfSxcbiAgXSxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdjZGstZHJvcC1saXN0JyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1tjbGFzcy5jZGstZHJvcC1saXN0LWRyYWdnaW5nXSc6ICdfZHJvcExpc3RSZWYuaXNEcmFnZ2luZygpJyxcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtcmVjZWl2aW5nXSc6ICdfZHJvcExpc3RSZWYuaXNSZWNlaXZpbmcoKScsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2RrTGF6eURyb3BMaXN0PFQgPSBhbnksIERSZWYgPSBhbnk+IGV4dGVuZHMgQ2RrRHJvcExpc3Q8VD4gaW1wbGVtZW50cyBPbkluaXQge1xuICBnZXQgcGJsRHJvcExpc3RSZWYoKTogUGJsRHJvcExpc3RSZWY8RFJlZj4geyByZXR1cm4gdGhpcy5fZHJvcExpc3RSZWYgYXMgYW55OyB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdG9yIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGRldGVybWluZSB0aGUgZGlyZWN0IGNvbnRhaW5lciBlbGVtZW50LCBzdGFydGluZyBmcm9tXG4gICAqIHRoZSBgY2RrRHJvcExpc3RgIGVsZW1lbnQgYW5kIGdvaW5nIGRvd24gdGhlIERPTS4gUGFzc2luZyBhbiBhbHRlcm5hdGUgZGlyZWN0IGNvbnRhaW5lciBlbGVtZW50XG4gICAqIGlzIHVzZWZ1bCB3aGVuIHRoZSBgY2RrRHJvcExpc3RgIGlzIG5vdCB0aGUgZGlyZWN0IHBhcmVudCAoaS5lLiBhbmNlc3RvciBidXQgbm90IGZhdGhlcilcbiAgICogb2YgdGhlIGRyYWdnYWJsZSBlbGVtZW50cy5cbiAgICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCdjZGtEcm9wTGlzdERpcmVjdENvbnRhaW5lckVsZW1lbnQnKSBkaXJlY3RDb250YWluZXJFbGVtZW50OiBzdHJpbmc7XG5cbiAgX2RyYWdnYWJsZXM6IFF1ZXJ5TGlzdDxDZGtEcmFnPjtcblxuICAvKiBwcml2YXRlICovIG9yaWdpbmFsRWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIC8qIHByaXZhdGUgKi8gX2RyYWdnYWJsZXNTZXQgPSBuZXcgU2V0PENka0RyYWc+KCk7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGJsRHJvcExpc3RSZWYgaW5zdGFuY2VvZiBQYmxEcm9wTGlzdFJlZiA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBgRHJvcExpc3RSZWZgIGluamVjdGlvbiwgdGhlIHJlZiBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgUGJsRHJvcExpc3RSZWYnKVxuICAgIH1cbiAgICB0aGlzLl9kcm9wTGlzdFJlZi5iZWZvcmVTdGFydGVkLnN1YnNjcmliZSggKCkgPT4gdGhpcy5iZWZvcmVTdGFydGVkKCkgKTtcbiAgfVxuXG4gIGFkZERyYWcoZHJhZzogQ2RrRHJhZyk6IHZvaWQge1xuICAgIHRoaXMuX2RyYWdnYWJsZXNTZXQuYWRkKGRyYWcpO1xuICAgIHRoaXMuX2RyYWdnYWJsZXMucmVzZXQoQXJyYXkuZnJvbSh0aGlzLl9kcmFnZ2FibGVzU2V0LnZhbHVlcygpKSk7XG4gICAgdGhpcy5fZHJhZ2dhYmxlcy5ub3RpZnlPbkNoYW5nZXMoKTsgLy8gVE9ETzogbm90aWZ5IHdpdGggYXNhcCBzY2hlZHVsYXIgYW5kIG9icyRcbiAgfVxuXG4gIHJlbW92ZURyYWcoZHJhZzogQ2RrRHJhZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2RyYWdnYWJsZXNTZXQuZGVsZXRlKGRyYWcpO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHRoaXMuX2RyYWdnYWJsZXMucmVzZXQoQXJyYXkuZnJvbSh0aGlzLl9kcmFnZ2FibGVzU2V0LnZhbHVlcygpKSk7XG4gICAgICB0aGlzLl9kcmFnZ2FibGVzLm5vdGlmeU9uQ2hhbmdlcygpOyAvLyBUT0RPOiBub3RpZnkgd2l0aCBhc2FwIHNjaGVkdWxhciBhbmQgb2JzJFxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyogcHJvdGVjdGVkICovIGJlZm9yZVN0YXJ0ZWQoKTogdm9pZCB7XG4gICAgLy8gVGhpcyBpcyBhIHdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9wdWxsLzE0MTUzXG4gICAgLy8gV29ya2luZyBhcm91bmQgdGhlIG1pc3NpbmcgY2FwYWJpbGl0eSBmb3Igc2VsZWN0aW5nIGEgY29udGFpbmVyIGVsZW1lbnQgdGhhdCBpcyBub3QgdGhlIGRyb3AgY29udGFpbmVyIGhvc3QuXG4gICAgaWYgKCF0aGlzLm9yaWdpbmFsRWxlbWVudCkge1xuICAgICAgdGhpcy5vcmlnaW5hbEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgfVxuICAgIGlmICh0aGlzLmRpcmVjdENvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm9yaWdpbmFsRWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5kaXJlY3RDb250YWluZXJFbGVtZW50KSBhcyBIVE1MRWxlbWVudDtcbiAgICAgIHRoaXMuZWxlbWVudCA9IG5ldyBFbGVtZW50UmVmPEhUTUxFbGVtZW50PihlbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5vcmlnaW5hbEVsZW1lbnQ7XG4gICAgfVxuICAgIHRoaXMucGJsRHJvcExpc3RSZWYud2l0aEVsZW1lbnQodGhpcy5lbGVtZW50KTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2RrTGF6eURyYWddJyxcbiAgZXhwb3J0QXM6ICdjZGtMYXp5RHJhZycsXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICAnY2xhc3MnOiAnY2RrLWRyYWcnLFxuICAgICdbY2xhc3MuY2RrLWRyYWctZHJhZ2dpbmddJzogJ19kcmFnUmVmLmlzRHJhZ2dpbmcoKScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENka0xhenlEcmFnPFQgPSBhbnksIFogZXh0ZW5kcyBDZGtMYXp5RHJvcExpc3Q8VD4gPSBDZGtMYXp5RHJvcExpc3Q8VD4sIERSZWYgPSBhbnk+IGV4dGVuZHMgQ2RrRHJhZzxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAvKipcbiAgICogQSBjbGFzcyB0byBzZXQgd2hlbiB0aGUgcm9vdCBlbGVtZW50IGlzIG5vdCB0aGUgaG9zdCBlbGVtZW50LiAoaS5lLiB3aGVuIGBjZGtEcmFnUm9vdEVsZW1lbnRgIGlzIHVzZWQpLlxuICAgKi9cbiAgQElucHV0KCdjZGtEcmFnUm9vdEVsZW1lbnRDbGFzcycpIHNldCByb290RWxlbWVudFNlbGVjdG9yQ2xhc3ModmFsdWU6IHN0cmluZykgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWlucHV0LXJlbmFtZVxuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcm9vdENsYXNzICYmIHRoaXMuX2hvc3ROb3RSb290KSB7XG4gICAgICBpZiAodGhpcy5fcm9vdENsYXNzKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QucmVtb3ZlKC4uLnRoaXMuX3Jvb3RDbGFzcy5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmdldFJvb3RFbGVtZW50KCkuY2xhc3NMaXN0LmFkZCguLi52YWx1ZS5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcm9vdENsYXNzID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcGJsRHJhZ1JlZigpOiBQYmxEcmFnUmVmPERSZWY+IHsgcmV0dXJuIHRoaXMuX2RyYWdSZWYgYXMgYW55OyB9XG5cbiAgQElucHV0KCkgZ2V0IGNka0Ryb3BMaXN0KCk6IFogeyByZXR1cm4gdGhpcy5kcm9wQ29udGFpbmVyIGFzIFo7IH1cbiAgc2V0IGNka0Ryb3BMaXN0KHZhbHVlOiBaKSB7XG4gICAgLy8gVE8gU1VQUE9SVCBgY2RrRHJvcExpc3RgIHZpYSBzdHJpbmcgaW5wdXQgKElEKSB3ZSBuZWVkIGEgcmVhY3RpdmUgcmVnaXN0cnkuLi5cbiAgICBpZiAodGhpcy5jZGtEcm9wTGlzdCkge1xuICAgICAgdGhpcy5jZGtEcm9wTGlzdC5yZW1vdmVEcmFnKHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLmRyb3BDb250YWluZXIgPSB2YWx1ZTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX2RyYWdSZWYuX3dpdGhEcm9wQ29udGFpbmVyKHZhbHVlLl9kcm9wTGlzdFJlZik7XG4gICAgICB2YWx1ZS5hZGREcmFnKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qIHByaXZhdGUgKi8gX3Jvb3RDbGFzczogc3RyaW5nO1xuICAvKiBwcml2YXRlICovIF9ob3N0Tm90Um9vdCA9IGZhbHNlO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBibERyYWdSZWYgaW5zdGFuY2VvZiBQYmxEcmFnUmVmID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGBEcmFnUmVmYCBpbmplY3Rpb24sIHRoZSByZWYgaXMgbm90IGFuIGluc3RhbmNlIG9mIFBibERyYWdSZWYnKVxuICAgIH1cbiAgICB0aGlzLnBibERyYWdSZWYucm9vdEVsZW1lbnRDaGFuZ2VkLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgY29uc3Qgcm9vdEVsZW1lbnRTZWxlY3RvckNsYXNzID0gdGhpcy5fcm9vdENsYXNzO1xuICAgICAgY29uc3QgaG9zdE5vdFJvb3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCAhPT0gZXZlbnQuY3VycjtcblxuICAgICAgaWYgKHJvb3RFbGVtZW50U2VsZWN0b3JDbGFzcykge1xuICAgICAgICBpZiAodGhpcy5faG9zdE5vdFJvb3QpIHtcbiAgICAgICAgICBldmVudC5wcmV2LmNsYXNzTGlzdC5yZW1vdmUoLi4ucm9vdEVsZW1lbnRTZWxlY3RvckNsYXNzLnNwbGl0KCcgJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3N0Tm90Um9vdCkge1xuICAgICAgICAgIGV2ZW50LmN1cnIuY2xhc3NMaXN0LmFkZCguLi5yb290RWxlbWVudFNlbGVjdG9yQ2xhc3Muc3BsaXQoJyAnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuX2hvc3ROb3RSb290ID0gaG9zdE5vdFJvb3Q7XG4gICAgfSk7XG4gIH1cblxuICAvLyBUaGlzIGlzIGEgd29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL3B1bGwvMTQxNThcbiAgLy8gV29ya2luZyBhcm91bmQgdGhlIGlzc3VlIG9mIGRyb3AgY29udGFpbmVyIGlzIG5vdCB0aGUgZGlyZWN0IHBhcmVudCAoZmF0aGVyKSBvZiBhIGRyYWcgaXRlbS5cbiAgLy8gVGhlIGVudGlyZSBuZ0FmdGVyVmlld0luaXQoKSBvdmVycmlkaW5nIG1ldGhvZCBjYW4gYmUgcmVtb3ZlZCBpZiBQUiBhY2NlcHRlZC5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3RhcnRlZC5zdWJzY3JpYmUoIHN0YXJ0ZWRFdmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5kcm9wQ29udGFpbmVyKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldFJvb3RFbGVtZW50KCk7XG4gICAgICAgIGNvbnN0IGluaXRpYWxSb290RWxlbWVudFBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgaWYgKCFlbGVtZW50Lm5leHRTaWJsaW5nICYmIGluaXRpYWxSb290RWxlbWVudFBhcmVudCAhPT0gdGhpcy5kcm9wQ29udGFpbmVyLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuZW5kZWQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoIGVuZGVkRXZlbnQgPT4gaW5pdGlhbFJvb3RFbGVtZW50UGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpOyAqL1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2RrRHJvcExpc3QpIHtcbiAgICAgIHRoaXMuY2RrRHJvcExpc3QucmVtb3ZlRHJhZyh0aGlzKTtcbiAgICB9XG4gICAgLyogc3VwZXIubmdPbkRlc3Ryb3koKTsgKi9cbiAgfVxufVxuXG4vKiogSGFuZGxlIHRoYXQgY2FuIGJlIHVzZWQgdG8gZHJhZyBhbmQgQ2RrRHJhZyBpbnN0YW5jZS4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxEcmFnSGFuZGxlXScsXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICAnY2xhc3MnOiAnY2RrLWRyYWctaGFuZGxlJ1xuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBDZGtEcmFnSGFuZGxlLFxuICAgICAgdXNlRXhpc3Rpbmc6IFBibERyYWdIYW5kbGVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsRHJhZ0hhbmRsZSBleHRlbmRzIENka0RyYWdIYW5kbGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIEBPcHRpb25hbCgpIHBhcmVudERyYWc/OiBDZGtEcmFnKSB7IHN1cGVyKGVsZW1lbnQsIHBhcmVudERyYWcpOyB9XG59XG4iXX0=