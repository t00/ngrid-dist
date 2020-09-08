/**
 * @fileoverview added by tsickle
 * Generated from: lib/drag-and-drop/core/lazy-drag-drop.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read, __spread } from "tslib";
import { take } from 'rxjs/operators';
import { Input, Directive, ElementRef, Optional } from '@angular/core';
import { CdkDropList, CdkDrag, CdkDragHandle, CDK_DROP_LIST, DragDrop } from '@angular/cdk/drag-drop';
import { PblDropListRef } from './drop-list-ref';
import { PblDragRef } from './drag-ref';
import { PblDragDrop } from './drag-drop';
/**
 * @template T, DRef
 */
var CdkLazyDropList = /** @class */ (function (_super) {
    __extends(CdkLazyDropList, _super);
    function CdkLazyDropList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* private */ _this._draggablesSet = new Set();
        return _this;
    }
    Object.defineProperty(CdkLazyDropList.prototype, "pblDropListRef", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this._dropListRef)); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkLazyDropList.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.pblDropListRef instanceof PblDropListRef === false) {
            throw new Error('Invalid `DropListRef` injection, the ref is not an instance of PblDropListRef');
        }
        this._dropListRef.beforeStarted.subscribe((/**
         * @return {?}
         */
        function () { return _this.beforeStarted(); }));
    };
    /**
     * @param {?} drag
     * @return {?}
     */
    CdkLazyDropList.prototype.addDrag = /**
     * @param {?} drag
     * @return {?}
     */
    function (drag) {
        this._draggablesSet.add(drag);
        this._draggables.reset(Array.from(this._draggablesSet.values()));
        this._draggables.notifyOnChanges(); // TODO: notify with asap schedular and obs$
    };
    /**
     * @param {?} drag
     * @return {?}
     */
    CdkLazyDropList.prototype.removeDrag = /**
     * @param {?} drag
     * @return {?}
     */
    function (drag) {
        /** @type {?} */
        var result = this._draggablesSet.delete(drag);
        if (result) {
            this._draggables.reset(Array.from(this._draggablesSet.values()));
            this._draggables.notifyOnChanges(); // TODO: notify with asap schedular and obs$
        }
        return result;
    };
    /* protected */ /* protected */ /**
     * @return {?}
     */
    CdkLazyDropList.prototype.beforeStarted = /* protected */ /**
     * @return {?}
     */
    function () {
        // This is a workaround for https://github.com/angular/material2/pull/14153
        // Working around the missing capability for selecting a container element that is not the drop container host.
        if (!this.originalElement) {
            this.originalElement = this.element;
        }
        if (this.directContainerElement) {
            /** @type {?} */
            var element = (/** @type {?} */ (this.originalElement.nativeElement.querySelector(this.directContainerElement)));
            this.element = new ElementRef(element);
        }
        else {
            this.element = this.originalElement;
        }
        this.pblDropListRef.withElement(this.element);
    };
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
    return CdkLazyDropList;
}(CdkDropList));
export { CdkLazyDropList };
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
var CdkLazyDrag = /** @class */ (function (_super) {
    __extends(CdkLazyDrag, _super);
    function CdkLazyDrag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* private */ _this._hostNotRoot = false;
        return _this;
    }
    Object.defineProperty(CdkLazyDrag.prototype, "rootElementSelectorClass", {
        /**
         * A class to set when the root element is not the host element. (i.e. when `cdkDragRootElement` is used).
         */
        set: /**
         * A class to set when the root element is not the host element. (i.e. when `cdkDragRootElement` is used).
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _a, _b;
            if (value !== this._rootClass && this._hostNotRoot) {
                if (this._rootClass) {
                    (_a = this.getRootElement().classList).remove.apply(_a, __spread(this._rootClass.split(' ')));
                }
                if (value) {
                    (_b = this.getRootElement().classList).add.apply(_b, __spread(value.split(' ')));
                }
            }
            this._rootClass = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkLazyDrag.prototype, "pblDragRef", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this._dragRef)); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkLazyDrag.prototype, "cdkDropList", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this.dropContainer)); },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // TO SUPPORT `cdkDropList` via string input (ID) we need a reactive registry...
            if (this.cdkDropList) {
                this.cdkDropList.removeDrag(this);
            }
            this.dropContainer = value;
            if (value) {
                this._dragRef._withDropContainer(value._dropListRef);
                value.addDrag(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkLazyDrag.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.pblDragRef instanceof PblDragRef === false) {
            throw new Error('Invalid `DragRef` injection, the ref is not an instance of PblDragRef');
        }
        this.pblDragRef.rootElementChanged.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var _a, _b;
            /** @type {?} */
            var rootElementSelectorClass = _this._rootClass;
            /** @type {?} */
            var hostNotRoot = _this.element.nativeElement !== event.curr;
            if (rootElementSelectorClass) {
                if (_this._hostNotRoot) {
                    (_a = event.prev.classList).remove.apply(_a, __spread(rootElementSelectorClass.split(' ')));
                }
                if (hostNotRoot) {
                    (_b = event.curr.classList).add.apply(_b, __spread(rootElementSelectorClass.split(' ')));
                }
            }
            _this._hostNotRoot = hostNotRoot;
        }));
    };
    // This is a workaround for https://github.com/angular/material2/pull/14158
    // Working around the issue of drop container is not the direct parent (father) of a drag item.
    // The entire ngAfterViewInit() overriding method can be removed if PR accepted.
    // This is a workaround for https://github.com/angular/material2/pull/14158
    // Working around the issue of drop container is not the direct parent (father) of a drag item.
    // The entire ngAfterViewInit() overriding method can be removed if PR accepted.
    /**
     * @return {?}
     */
    CdkLazyDrag.prototype.ngAfterViewInit = 
    // This is a workaround for https://github.com/angular/material2/pull/14158
    // Working around the issue of drop container is not the direct parent (father) of a drag item.
    // The entire ngAfterViewInit() overriding method can be removed if PR accepted.
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.started.subscribe((/**
         * @param {?} startedEvent
         * @return {?}
         */
        function (startedEvent) {
            if (_this.dropContainer) {
                /** @type {?} */
                var element_1 = _this.getRootElement();
                /** @type {?} */
                var initialRootElementParent_1 = (/** @type {?} */ (element_1.parentNode));
                if (!element_1.nextSibling && initialRootElementParent_1 !== _this.dropContainer.element.nativeElement) {
                    _this.ended.pipe(take(1)).subscribe((/**
                     * @param {?} endedEvent
                     * @return {?}
                     */
                    function (endedEvent) { return initialRootElementParent_1.appendChild(element_1); }));
                }
            }
        }));
        /* super.ngAfterViewInit(); */
    };
    /**
     * @return {?}
     */
    CdkLazyDrag.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.cdkDropList) {
            this.cdkDropList.removeDrag(this);
        }
        /* super.ngOnDestroy(); */
    };
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
    return CdkLazyDrag;
}(CdkDrag));
export { CdkLazyDrag };
if (false) {
    /** @type {?} */
    CdkLazyDrag.prototype._rootClass;
    /** @type {?} */
    CdkLazyDrag.prototype._hostNotRoot;
}
/**
 * Handle that can be used to drag and CdkDrag instance.
 */
var PblDragHandle = /** @class */ (function (_super) {
    __extends(PblDragHandle, _super);
    function PblDragHandle(element, parentDrag) {
        var _this = _super.call(this, element, parentDrag) || this;
        _this.element = element;
        return _this;
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
    PblDragHandle.ctorParameters = function () { return [
        { type: ElementRef },
        { type: CdkDrag, decorators: [{ type: Optional }] }
    ]; };
    return PblDragHandle;
}(CdkDragHandle));
export { PblDragHandle };
if (false) {
    /** @type {?} */
    PblDragHandle.prototype.element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1kcmFnLWRyb3AuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvZHJhZy1hbmQtZHJvcC9jb3JlL2xhenktZHJhZy1kcm9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQXdCLFFBQVEsRUFBeUIsTUFBTSxlQUFlLENBQUM7QUFDcEgsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7O0FBRTFDO0lBYzBELG1DQUFjO0lBZHhFO1FBQUEscUVBbUVDO3NCQXRDZSxvQkFBYyxHQUFHLElBQUksR0FBRyxFQUFXLENBQUM7O0lBc0NwRCxDQUFDO0lBcERDLHNCQUFJLDJDQUFjOzs7O1FBQWxCLGNBQTZDLE9BQU8sbUJBQUEsSUFBSSxDQUFDLFlBQVksRUFBTyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7Ozs7SUFnQi9FLGtDQUFROzs7SUFBUjtRQUFBLGlCQUtDO1FBSkMsSUFBSSxJQUFJLENBQUMsY0FBYyxZQUFZLGNBQWMsS0FBSyxLQUFLLEVBQUU7WUFDM0QsTUFBTSxJQUFJLEtBQUssQ0FBQywrRUFBK0UsQ0FBQyxDQUFBO1NBQ2pHO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUzs7O1FBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsRUFBRSxDQUFDO0lBQzFF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QUFkRCxDQVltQyxhQUFhLEdBRS9DO1NBRlksYUFBYTs7O0lBQ1osZ0NBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElucHV0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFF1ZXJ5TGlzdCwgT25EZXN0cm95LCBPcHRpb25hbCwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtEcm9wTGlzdCwgQ2RrRHJhZywgQ2RrRHJhZ0hhbmRsZSwgQ0RLX0RST1BfTElTVCwgRHJhZ0Ryb3AgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7IFBibERyb3BMaXN0UmVmIH0gZnJvbSAnLi9kcm9wLWxpc3QtcmVmJztcbmltcG9ydCB7IFBibERyYWdSZWYgfSBmcm9tICcuL2RyYWctcmVmJztcbmltcG9ydCB7IFBibERyYWdEcm9wIH0gZnJvbSAnLi9kcmFnLWRyb3AnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2RrTGF6eURyb3BMaXN0XScsXG4gIGV4cG9ydEFzOiAnY2RrTGF6eURyb3BMaXN0JyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBEcmFnRHJvcCwgdXNlRXhpc3Rpbmc6IFBibERyYWdEcm9wIH0sXG4gICAgeyBwcm92aWRlOiBDREtfRFJPUF9MSVNULCB1c2VDbGFzczogQ2RrTGF6eURyb3BMaXN0IH0sXG4gIF0sXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICAnY2xhc3MnOiAnY2RrLWRyb3AtbGlzdCcsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbY2xhc3MuY2RrLWRyb3AtbGlzdC1kcmFnZ2luZ10nOiAnX2Ryb3BMaXN0UmVmLmlzRHJhZ2dpbmcoKScsXG4gICAgJ1tjbGFzcy5jZGstZHJvcC1saXN0LXJlY2VpdmluZ10nOiAnX2Ryb3BMaXN0UmVmLmlzUmVjZWl2aW5nKCknLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIENka0xhenlEcm9wTGlzdDxUID0gYW55LCBEUmVmID0gYW55PiBleHRlbmRzIENka0Ryb3BMaXN0PFQ+IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZ2V0IHBibERyb3BMaXN0UmVmKCk6IFBibERyb3BMaXN0UmVmPERSZWY+IHsgcmV0dXJuIHRoaXMuX2Ryb3BMaXN0UmVmIGFzIGFueTsgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RvciB0aGF0IHdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgdGhlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudCwgc3RhcnRpbmcgZnJvbVxuICAgKiB0aGUgYGNka0Ryb3BMaXN0YCBlbGVtZW50IGFuZCBnb2luZyBkb3duIHRoZSBET00uIFBhc3NpbmcgYW4gYWx0ZXJuYXRlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudFxuICAgKiBpcyB1c2VmdWwgd2hlbiB0aGUgYGNka0Ryb3BMaXN0YCBpcyBub3QgdGhlIGRpcmVjdCBwYXJlbnQgKGkuZS4gYW5jZXN0b3IgYnV0IG5vdCBmYXRoZXIpXG4gICAqIG9mIHRoZSBkcmFnZ2FibGUgZWxlbWVudHMuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgnY2RrRHJvcExpc3REaXJlY3RDb250YWluZXJFbGVtZW50JykgZGlyZWN0Q29udGFpbmVyRWxlbWVudDogc3RyaW5nO1xuXG4gIF9kcmFnZ2FibGVzOiBRdWVyeUxpc3Q8Q2RrRHJhZz47XG5cbiAgLyogcHJpdmF0ZSAqLyBvcmlnaW5hbEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICAvKiBwcml2YXRlICovIF9kcmFnZ2FibGVzU2V0ID0gbmV3IFNldDxDZGtEcmFnPigpO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBibERyb3BMaXN0UmVmIGluc3RhbmNlb2YgUGJsRHJvcExpc3RSZWYgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYERyb3BMaXN0UmVmYCBpbmplY3Rpb24sIHRoZSByZWYgaXMgbm90IGFuIGluc3RhbmNlIG9mIFBibERyb3BMaXN0UmVmJylcbiAgICB9XG4gICAgdGhpcy5fZHJvcExpc3RSZWYuYmVmb3JlU3RhcnRlZC5zdWJzY3JpYmUoICgpID0+IHRoaXMuYmVmb3JlU3RhcnRlZCgpICk7XG4gIH1cblxuICBhZGREcmFnKGRyYWc6IENka0RyYWcpOiB2b2lkIHtcbiAgICB0aGlzLl9kcmFnZ2FibGVzU2V0LmFkZChkcmFnKTtcbiAgICB0aGlzLl9kcmFnZ2FibGVzLnJlc2V0KEFycmF5LmZyb20odGhpcy5fZHJhZ2dhYmxlc1NldC52YWx1ZXMoKSkpO1xuICAgIHRoaXMuX2RyYWdnYWJsZXMubm90aWZ5T25DaGFuZ2VzKCk7IC8vIFRPRE86IG5vdGlmeSB3aXRoIGFzYXAgc2NoZWR1bGFyIGFuZCBvYnMkXG4gIH1cblxuICByZW1vdmVEcmFnKGRyYWc6IENka0RyYWcpOiBib29sZWFuIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9kcmFnZ2FibGVzU2V0LmRlbGV0ZShkcmFnKTtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICB0aGlzLl9kcmFnZ2FibGVzLnJlc2V0KEFycmF5LmZyb20odGhpcy5fZHJhZ2dhYmxlc1NldC52YWx1ZXMoKSkpO1xuICAgICAgdGhpcy5fZHJhZ2dhYmxlcy5ub3RpZnlPbkNoYW5nZXMoKTsgLy8gVE9ETzogbm90aWZ5IHdpdGggYXNhcCBzY2hlZHVsYXIgYW5kIG9icyRcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qIHByb3RlY3RlZCAqLyBiZWZvcmVTdGFydGVkKCk6IHZvaWQge1xuICAgIC8vIFRoaXMgaXMgYSB3b3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvcHVsbC8xNDE1M1xuICAgIC8vIFdvcmtpbmcgYXJvdW5kIHRoZSBtaXNzaW5nIGNhcGFiaWxpdHkgZm9yIHNlbGVjdGluZyBhIGNvbnRhaW5lciBlbGVtZW50IHRoYXQgaXMgbm90IHRoZSBkcm9wIGNvbnRhaW5lciBob3N0LlxuICAgIGlmICghdGhpcy5vcmlnaW5hbEVsZW1lbnQpIHtcbiAgICAgIHRoaXMub3JpZ2luYWxFbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuICAgIH1cbiAgICBpZiAodGhpcy5kaXJlY3RDb250YWluZXJFbGVtZW50KSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5vcmlnaW5hbEVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZGlyZWN0Q29udGFpbmVyRWxlbWVudCkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICB0aGlzLmVsZW1lbnQgPSBuZXcgRWxlbWVudFJlZjxIVE1MRWxlbWVudD4oZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMub3JpZ2luYWxFbGVtZW50O1xuICAgIH1cbiAgICB0aGlzLnBibERyb3BMaXN0UmVmLndpdGhFbGVtZW50KHRoaXMuZWxlbWVudCk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Nka0xhenlEcmFnXScsXG4gIGV4cG9ydEFzOiAnY2RrTGF6eURyYWcnLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgJ2NsYXNzJzogJ2Nkay1kcmFnJyxcbiAgICAnW2NsYXNzLmNkay1kcmFnLWRyYWdnaW5nXSc6ICdfZHJhZ1JlZi5pc0RyYWdnaW5nKCknLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IERyYWdEcm9wLCB1c2VFeGlzdGluZzogUGJsRHJhZ0Ryb3AgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2RrTGF6eURyYWc8VCA9IGFueSwgWiBleHRlbmRzIENka0xhenlEcm9wTGlzdDxUPiA9IENka0xhenlEcm9wTGlzdDxUPiwgRFJlZiA9IGFueT4gZXh0ZW5kcyBDZGtEcmFnPFQ+IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIC8qKlxuICAgKiBBIGNsYXNzIHRvIHNldCB3aGVuIHRoZSByb290IGVsZW1lbnQgaXMgbm90IHRoZSBob3N0IGVsZW1lbnQuIChpLmUuIHdoZW4gYGNka0RyYWdSb290RWxlbWVudGAgaXMgdXNlZCkuXG4gICAqL1xuICBASW5wdXQoJ2Nka0RyYWdSb290RWxlbWVudENsYXNzJykgc2V0IHJvb3RFbGVtZW50U2VsZWN0b3JDbGFzcyh2YWx1ZTogc3RyaW5nKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9yb290Q2xhc3MgJiYgdGhpcy5faG9zdE5vdFJvb3QpIHtcbiAgICAgIGlmICh0aGlzLl9yb290Q2xhc3MpIHtcbiAgICAgICAgdGhpcy5nZXRSb290RWxlbWVudCgpLmNsYXNzTGlzdC5yZW1vdmUoLi4udGhpcy5fcm9vdENsYXNzLnNwbGl0KCcgJykpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QuYWRkKC4uLnZhbHVlLnNwbGl0KCcgJykpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9yb290Q2xhc3MgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBwYmxEcmFnUmVmKCk6IFBibERyYWdSZWY8RFJlZj4geyByZXR1cm4gdGhpcy5fZHJhZ1JlZiBhcyBhbnk7IH1cblxuICBASW5wdXQoKSBnZXQgY2RrRHJvcExpc3QoKTogWiB7IHJldHVybiB0aGlzLmRyb3BDb250YWluZXIgYXMgWjsgfVxuICBzZXQgY2RrRHJvcExpc3QodmFsdWU6IFopIHtcbiAgICAvLyBUTyBTVVBQT1JUIGBjZGtEcm9wTGlzdGAgdmlhIHN0cmluZyBpbnB1dCAoSUQpIHdlIG5lZWQgYSByZWFjdGl2ZSByZWdpc3RyeS4uLlxuICAgIGlmICh0aGlzLmNka0Ryb3BMaXN0KSB7XG4gICAgICB0aGlzLmNka0Ryb3BMaXN0LnJlbW92ZURyYWcodGhpcyk7XG4gICAgfVxuICAgIHRoaXMuZHJvcENvbnRhaW5lciA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fZHJhZ1JlZi5fd2l0aERyb3BDb250YWluZXIodmFsdWUuX2Ryb3BMaXN0UmVmKTtcbiAgICAgIHZhbHVlLmFkZERyYWcodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyogcHJpdmF0ZSAqLyBfcm9vdENsYXNzOiBzdHJpbmc7XG4gIC8qIHByaXZhdGUgKi8gX2hvc3ROb3RSb290ID0gZmFsc2U7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGJsRHJhZ1JlZiBpbnN0YW5jZW9mIFBibERyYWdSZWYgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYERyYWdSZWZgIGluamVjdGlvbiwgdGhlIHJlZiBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgUGJsRHJhZ1JlZicpXG4gICAgfVxuICAgIHRoaXMucGJsRHJhZ1JlZi5yb290RWxlbWVudENoYW5nZWQuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICBjb25zdCByb290RWxlbWVudFNlbGVjdG9yQ2xhc3MgPSB0aGlzLl9yb290Q2xhc3M7XG4gICAgICBjb25zdCBob3N0Tm90Um9vdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50ICE9PSBldmVudC5jdXJyO1xuXG4gICAgICBpZiAocm9vdEVsZW1lbnRTZWxlY3RvckNsYXNzKSB7XG4gICAgICAgIGlmICh0aGlzLl9ob3N0Tm90Um9vdCkge1xuICAgICAgICAgIGV2ZW50LnByZXYuY2xhc3NMaXN0LnJlbW92ZSguLi5yb290RWxlbWVudFNlbGVjdG9yQ2xhc3Muc3BsaXQoJyAnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvc3ROb3RSb290KSB7XG4gICAgICAgICAgZXZlbnQuY3Vyci5jbGFzc0xpc3QuYWRkKC4uLnJvb3RFbGVtZW50U2VsZWN0b3JDbGFzcy5zcGxpdCgnICcpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5faG9zdE5vdFJvb3QgPSBob3N0Tm90Um9vdDtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgYSB3b3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvcHVsbC8xNDE1OFxuICAvLyBXb3JraW5nIGFyb3VuZCB0aGUgaXNzdWUgb2YgZHJvcCBjb250YWluZXIgaXMgbm90IHRoZSBkaXJlY3QgcGFyZW50IChmYXRoZXIpIG9mIGEgZHJhZyBpdGVtLlxuICAvLyBUaGUgZW50aXJlIG5nQWZ0ZXJWaWV3SW5pdCgpIG92ZXJyaWRpbmcgbWV0aG9kIGNhbiBiZSByZW1vdmVkIGlmIFBSIGFjY2VwdGVkLlxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdGFydGVkLnN1YnNjcmliZSggc3RhcnRlZEV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmRyb3BDb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZ2V0Um9vdEVsZW1lbnQoKTtcbiAgICAgICAgY29uc3QgaW5pdGlhbFJvb3RFbGVtZW50UGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBpZiAoIWVsZW1lbnQubmV4dFNpYmxpbmcgJiYgaW5pdGlhbFJvb3RFbGVtZW50UGFyZW50ICE9PSB0aGlzLmRyb3BDb250YWluZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgdGhpcy5lbmRlZC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSggZW5kZWRFdmVudCA9PiBpbml0aWFsUm9vdEVsZW1lbnRQYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCkgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyogc3VwZXIubmdBZnRlclZpZXdJbml0KCk7ICovXG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jZGtEcm9wTGlzdCkge1xuICAgICAgdGhpcy5jZGtEcm9wTGlzdC5yZW1vdmVEcmFnKHRoaXMpO1xuICAgIH1cbiAgICAvKiBzdXBlci5uZ09uRGVzdHJveSgpOyAqL1xuICB9XG59XG5cbi8qKiBIYW5kbGUgdGhhdCBjYW4gYmUgdXNlZCB0byBkcmFnIGFuZCBDZGtEcmFnIGluc3RhbmNlLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibERyYWdIYW5kbGVdJyxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdjZGstZHJhZy1oYW5kbGUnXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IENka0RyYWdIYW5kbGUsXG4gICAgICB1c2VFeGlzdGluZzogUGJsRHJhZ0hhbmRsZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxEcmFnSGFuZGxlIGV4dGVuZHMgQ2RrRHJhZ0hhbmRsZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgQE9wdGlvbmFsKCkgcGFyZW50RHJhZz86IENka0RyYWcpIHsgc3VwZXIoZWxlbWVudCwgcGFyZW50RHJhZyk7IH1cbn1cbiJdfQ==