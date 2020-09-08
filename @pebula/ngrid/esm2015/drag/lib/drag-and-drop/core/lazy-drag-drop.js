/**
 * @fileoverview added by tsickle
 * Generated from: lib/drag-and-drop/core/lazy-drag-drop.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1kcmFnLWRyb3AuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvZHJhZy1hbmQtZHJvcC9jb3JlL2xhenktZHJhZy1kcm9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBd0IsUUFBUSxFQUF5QixNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7QUFnQjFDLE1BQU0sT0FBTyxlQUFxQyxTQUFRLFdBQWM7SUFkeEU7O3NCQTZCZ0IsbUJBQWMsR0FBRyxJQUFJLEdBQUcsRUFBVyxDQUFDO0lBc0NwRCxDQUFDOzs7O0lBcERDLElBQUksY0FBYyxLQUEyQixPQUFPLG1CQUFBLElBQUksQ0FBQyxZQUFZLEVBQU8sQ0FBQyxDQUFDLENBQUM7Ozs7SUFnQi9FLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxjQUFjLFlBQVksY0FBYyxLQUFLLEtBQUssRUFBRTtZQUMzRCxNQUFNLElBQUksS0FBSyxDQUFDLCtFQUErRSxDQUFDLENBQUE7U0FDakc7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxTQUFTOzs7UUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQztJQUMxRSxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxJQUFhO1FBQ25CLElB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QVU7b0JBQ25CLDJCQUEyQixFQUFFLHVCQUF1QjtpQkFDckQ7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFO2lCQUNoRDthQUNGOzs7dUNBTUUsS0FBSyxTQUFDLHlCQUF5QjswQkFjL0IsS0FBSzs7OztJQWFRLGlDQUFtQjs7SUFDbkIsbUNBQXFCOzs7OztBQTREckMsTUFBTSxPQUFPLGFBQWMsU0FBUSxhQUFhOzs7OztJQUM5QyxZQUFtQixPQUFnQyxFQUFjLFVBQW9CO1FBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUFqRyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtJQUFrRSxDQUFDOzs7WUFidkgsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLElBQUksRUFBRTs7b0JBQ0osT0FBTyxFQUFFLGlCQUFpQjtpQkFDM0I7Z0JBQ0QsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxhQUFhO3dCQUN0QixXQUFXLEVBQUUsYUFBYTtxQkFDM0I7aUJBQ0Y7YUFDRjs7OztZQWxMMEIsVUFBVTtZQUNmLE9BQU8sdUJBbUwyQixRQUFROzs7O0lBQWxELGdDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJbnB1dCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBRdWVyeUxpc3QsIE9uRGVzdHJveSwgT3B0aW9uYWwsIEFmdGVyVmlld0luaXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrRHJvcExpc3QsIENka0RyYWcsIENka0RyYWdIYW5kbGUsIENES19EUk9QX0xJU1QsIERyYWdEcm9wIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBQYmxEcm9wTGlzdFJlZiB9IGZyb20gJy4vZHJvcC1saXN0LXJlZic7XG5pbXBvcnQgeyBQYmxEcmFnUmVmIH0gZnJvbSAnLi9kcmFnLXJlZic7XG5pbXBvcnQgeyBQYmxEcmFnRHJvcCB9IGZyb20gJy4vZHJhZy1kcm9wJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Nka0xhenlEcm9wTGlzdF0nLFxuICBleHBvcnRBczogJ2Nka0xhenlEcm9wTGlzdCcsXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogRHJhZ0Ryb3AsIHVzZUV4aXN0aW5nOiBQYmxEcmFnRHJvcCB9LFxuICAgIHsgcHJvdmlkZTogQ0RLX0RST1BfTElTVCwgdXNlQ2xhc3M6IENka0xhenlEcm9wTGlzdCB9LFxuICBdLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgJ2NsYXNzJzogJ2Nkay1kcm9wLWxpc3QnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtZHJhZ2dpbmddJzogJ19kcm9wTGlzdFJlZi5pc0RyYWdnaW5nKCknLFxuICAgICdbY2xhc3MuY2RrLWRyb3AtbGlzdC1yZWNlaXZpbmddJzogJ19kcm9wTGlzdFJlZi5pc1JlY2VpdmluZygpJyxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBDZGtMYXp5RHJvcExpc3Q8VCA9IGFueSwgRFJlZiA9IGFueT4gZXh0ZW5kcyBDZGtEcm9wTGlzdDxUPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGdldCBwYmxEcm9wTGlzdFJlZigpOiBQYmxEcm9wTGlzdFJlZjxEUmVmPiB7IHJldHVybiB0aGlzLl9kcm9wTGlzdFJlZiBhcyBhbnk7IH1cblxuICAvKipcbiAgICogU2VsZWN0b3IgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBkaXJlY3QgY29udGFpbmVyIGVsZW1lbnQsIHN0YXJ0aW5nIGZyb21cbiAgICogdGhlIGBjZGtEcm9wTGlzdGAgZWxlbWVudCBhbmQgZ29pbmcgZG93biB0aGUgRE9NLiBQYXNzaW5nIGFuIGFsdGVybmF0ZSBkaXJlY3QgY29udGFpbmVyIGVsZW1lbnRcbiAgICogaXMgdXNlZnVsIHdoZW4gdGhlIGBjZGtEcm9wTGlzdGAgaXMgbm90IHRoZSBkaXJlY3QgcGFyZW50IChpLmUuIGFuY2VzdG9yIGJ1dCBub3QgZmF0aGVyKVxuICAgKiBvZiB0aGUgZHJhZ2dhYmxlIGVsZW1lbnRzLlxuICAgKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ2Nka0Ryb3BMaXN0RGlyZWN0Q29udGFpbmVyRWxlbWVudCcpIGRpcmVjdENvbnRhaW5lckVsZW1lbnQ6IHN0cmluZztcblxuICBfZHJhZ2dhYmxlczogUXVlcnlMaXN0PENka0RyYWc+O1xuXG4gIC8qIHByaXZhdGUgKi8gb3JpZ2luYWxFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgLyogcHJpdmF0ZSAqLyBfZHJhZ2dhYmxlc1NldCA9IG5ldyBTZXQ8Q2RrRHJhZz4oKTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wYmxEcm9wTGlzdFJlZiBpbnN0YW5jZW9mIFBibERyb3BMaXN0UmVmID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGBEcm9wTGlzdFJlZmAgaW5qZWN0aW9uLCB0aGUgcmVmIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBQYmxEcm9wTGlzdFJlZicpXG4gICAgfVxuICAgIHRoaXMuX2Ryb3BMaXN0UmVmLmJlZm9yZVN0YXJ0ZWQuc3Vic2NyaWJlKCAoKSA9PiB0aGlzLmJlZm9yZVN0YXJ0ZWQoKSApO1xuICB9XG5cbiAgYWRkRHJhZyhkcmFnOiBDZGtEcmFnKTogdm9pZCB7XG4gICAgdGhpcy5fZHJhZ2dhYmxlc1NldC5hZGQoZHJhZyk7XG4gICAgdGhpcy5fZHJhZ2dhYmxlcy5yZXNldChBcnJheS5mcm9tKHRoaXMuX2RyYWdnYWJsZXNTZXQudmFsdWVzKCkpKTtcbiAgICB0aGlzLl9kcmFnZ2FibGVzLm5vdGlmeU9uQ2hhbmdlcygpOyAvLyBUT0RPOiBub3RpZnkgd2l0aCBhc2FwIHNjaGVkdWxhciBhbmQgb2JzJFxuICB9XG5cbiAgcmVtb3ZlRHJhZyhkcmFnOiBDZGtEcmFnKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fZHJhZ2dhYmxlc1NldC5kZWxldGUoZHJhZyk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgdGhpcy5fZHJhZ2dhYmxlcy5yZXNldChBcnJheS5mcm9tKHRoaXMuX2RyYWdnYWJsZXNTZXQudmFsdWVzKCkpKTtcbiAgICAgIHRoaXMuX2RyYWdnYWJsZXMubm90aWZ5T25DaGFuZ2VzKCk7IC8vIFRPRE86IG5vdGlmeSB3aXRoIGFzYXAgc2NoZWR1bGFyIGFuZCBvYnMkXG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKiBwcm90ZWN0ZWQgKi8gYmVmb3JlU3RhcnRlZCgpOiB2b2lkIHtcbiAgICAvLyBUaGlzIGlzIGEgd29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL3B1bGwvMTQxNTNcbiAgICAvLyBXb3JraW5nIGFyb3VuZCB0aGUgbWlzc2luZyBjYXBhYmlsaXR5IGZvciBzZWxlY3RpbmcgYSBjb250YWluZXIgZWxlbWVudCB0aGF0IGlzIG5vdCB0aGUgZHJvcCBjb250YWluZXIgaG9zdC5cbiAgICBpZiAoIXRoaXMub3JpZ2luYWxFbGVtZW50KSB7XG4gICAgICB0aGlzLm9yaWdpbmFsRWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGlyZWN0Q29udGFpbmVyRWxlbWVudCkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMub3JpZ2luYWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmRpcmVjdENvbnRhaW5lckVsZW1lbnQpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgdGhpcy5lbGVtZW50ID0gbmV3IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KGVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm9yaWdpbmFsRWxlbWVudDtcbiAgICB9XG4gICAgdGhpcy5wYmxEcm9wTGlzdFJlZi53aXRoRWxlbWVudCh0aGlzLmVsZW1lbnQpO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjZGtMYXp5RHJhZ10nLFxuICBleHBvcnRBczogJ2Nka0xhenlEcmFnJyxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdjZGstZHJhZycsXG4gICAgJ1tjbGFzcy5jZGstZHJhZy1kcmFnZ2luZ10nOiAnX2RyYWdSZWYuaXNEcmFnZ2luZygpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBEcmFnRHJvcCwgdXNlRXhpc3Rpbmc6IFBibERyYWdEcm9wIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENka0xhenlEcmFnPFQgPSBhbnksIFogZXh0ZW5kcyBDZGtMYXp5RHJvcExpc3Q8VD4gPSBDZGtMYXp5RHJvcExpc3Q8VD4sIERSZWYgPSBhbnk+IGV4dGVuZHMgQ2RrRHJhZzxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAvKipcbiAgICogQSBjbGFzcyB0byBzZXQgd2hlbiB0aGUgcm9vdCBlbGVtZW50IGlzIG5vdCB0aGUgaG9zdCBlbGVtZW50LiAoaS5lLiB3aGVuIGBjZGtEcmFnUm9vdEVsZW1lbnRgIGlzIHVzZWQpLlxuICAgKi9cbiAgQElucHV0KCdjZGtEcmFnUm9vdEVsZW1lbnRDbGFzcycpIHNldCByb290RWxlbWVudFNlbGVjdG9yQ2xhc3ModmFsdWU6IHN0cmluZykgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWlucHV0LXJlbmFtZVxuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcm9vdENsYXNzICYmIHRoaXMuX2hvc3ROb3RSb290KSB7XG4gICAgICBpZiAodGhpcy5fcm9vdENsYXNzKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QucmVtb3ZlKC4uLnRoaXMuX3Jvb3RDbGFzcy5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmdldFJvb3RFbGVtZW50KCkuY2xhc3NMaXN0LmFkZCguLi52YWx1ZS5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcm9vdENsYXNzID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcGJsRHJhZ1JlZigpOiBQYmxEcmFnUmVmPERSZWY+IHsgcmV0dXJuIHRoaXMuX2RyYWdSZWYgYXMgYW55OyB9XG5cbiAgQElucHV0KCkgZ2V0IGNka0Ryb3BMaXN0KCk6IFogeyByZXR1cm4gdGhpcy5kcm9wQ29udGFpbmVyIGFzIFo7IH1cbiAgc2V0IGNka0Ryb3BMaXN0KHZhbHVlOiBaKSB7XG4gICAgLy8gVE8gU1VQUE9SVCBgY2RrRHJvcExpc3RgIHZpYSBzdHJpbmcgaW5wdXQgKElEKSB3ZSBuZWVkIGEgcmVhY3RpdmUgcmVnaXN0cnkuLi5cbiAgICBpZiAodGhpcy5jZGtEcm9wTGlzdCkge1xuICAgICAgdGhpcy5jZGtEcm9wTGlzdC5yZW1vdmVEcmFnKHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLmRyb3BDb250YWluZXIgPSB2YWx1ZTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX2RyYWdSZWYuX3dpdGhEcm9wQ29udGFpbmVyKHZhbHVlLl9kcm9wTGlzdFJlZik7XG4gICAgICB2YWx1ZS5hZGREcmFnKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qIHByaXZhdGUgKi8gX3Jvb3RDbGFzczogc3RyaW5nO1xuICAvKiBwcml2YXRlICovIF9ob3N0Tm90Um9vdCA9IGZhbHNlO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBibERyYWdSZWYgaW5zdGFuY2VvZiBQYmxEcmFnUmVmID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGBEcmFnUmVmYCBpbmplY3Rpb24sIHRoZSByZWYgaXMgbm90IGFuIGluc3RhbmNlIG9mIFBibERyYWdSZWYnKVxuICAgIH1cbiAgICB0aGlzLnBibERyYWdSZWYucm9vdEVsZW1lbnRDaGFuZ2VkLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgY29uc3Qgcm9vdEVsZW1lbnRTZWxlY3RvckNsYXNzID0gdGhpcy5fcm9vdENsYXNzO1xuICAgICAgY29uc3QgaG9zdE5vdFJvb3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCAhPT0gZXZlbnQuY3VycjtcblxuICAgICAgaWYgKHJvb3RFbGVtZW50U2VsZWN0b3JDbGFzcykge1xuICAgICAgICBpZiAodGhpcy5faG9zdE5vdFJvb3QpIHtcbiAgICAgICAgICBldmVudC5wcmV2LmNsYXNzTGlzdC5yZW1vdmUoLi4ucm9vdEVsZW1lbnRTZWxlY3RvckNsYXNzLnNwbGl0KCcgJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3N0Tm90Um9vdCkge1xuICAgICAgICAgIGV2ZW50LmN1cnIuY2xhc3NMaXN0LmFkZCguLi5yb290RWxlbWVudFNlbGVjdG9yQ2xhc3Muc3BsaXQoJyAnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuX2hvc3ROb3RSb290ID0gaG9zdE5vdFJvb3Q7XG4gICAgfSk7XG4gIH1cblxuICAvLyBUaGlzIGlzIGEgd29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL3B1bGwvMTQxNThcbiAgLy8gV29ya2luZyBhcm91bmQgdGhlIGlzc3VlIG9mIGRyb3AgY29udGFpbmVyIGlzIG5vdCB0aGUgZGlyZWN0IHBhcmVudCAoZmF0aGVyKSBvZiBhIGRyYWcgaXRlbS5cbiAgLy8gVGhlIGVudGlyZSBuZ0FmdGVyVmlld0luaXQoKSBvdmVycmlkaW5nIG1ldGhvZCBjYW4gYmUgcmVtb3ZlZCBpZiBQUiBhY2NlcHRlZC5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3RhcnRlZC5zdWJzY3JpYmUoIHN0YXJ0ZWRFdmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5kcm9wQ29udGFpbmVyKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldFJvb3RFbGVtZW50KCk7XG4gICAgICAgIGNvbnN0IGluaXRpYWxSb290RWxlbWVudFBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgaWYgKCFlbGVtZW50Lm5leHRTaWJsaW5nICYmIGluaXRpYWxSb290RWxlbWVudFBhcmVudCAhPT0gdGhpcy5kcm9wQ29udGFpbmVyLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuZW5kZWQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoIGVuZGVkRXZlbnQgPT4gaW5pdGlhbFJvb3RFbGVtZW50UGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpOyAqL1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2RrRHJvcExpc3QpIHtcbiAgICAgIHRoaXMuY2RrRHJvcExpc3QucmVtb3ZlRHJhZyh0aGlzKTtcbiAgICB9XG4gICAgLyogc3VwZXIubmdPbkRlc3Ryb3koKTsgKi9cbiAgfVxufVxuXG4vKiogSGFuZGxlIHRoYXQgY2FuIGJlIHVzZWQgdG8gZHJhZyBhbmQgQ2RrRHJhZyBpbnN0YW5jZS4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxEcmFnSGFuZGxlXScsXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICAnY2xhc3MnOiAnY2RrLWRyYWctaGFuZGxlJ1xuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBDZGtEcmFnSGFuZGxlLFxuICAgICAgdXNlRXhpc3Rpbmc6IFBibERyYWdIYW5kbGVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsRHJhZ0hhbmRsZSBleHRlbmRzIENka0RyYWdIYW5kbGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIEBPcHRpb25hbCgpIHBhcmVudERyYWc/OiBDZGtEcmFnKSB7IHN1cGVyKGVsZW1lbnQsIHBhcmVudERyYWcpOyB9XG59XG4iXX0=