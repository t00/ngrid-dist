/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
    tslib_1.__extends(CdkLazyDropList, _super);
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
    tslib_1.__extends(CdkLazyDrag, _super);
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
                    (_a = this.getRootElement().classList).remove.apply(_a, tslib_1.__spread(this._rootClass.split(' ')));
                }
                if (value) {
                    (_b = this.getRootElement().classList).add.apply(_b, tslib_1.__spread(value.split(' ')));
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
                    (_a = event.prev.classList).remove.apply(_a, tslib_1.__spread(rootElementSelectorClass.split(' ')));
                }
                if (hostNotRoot) {
                    (_b = event.curr.classList).add.apply(_b, tslib_1.__spread(rootElementSelectorClass.split(' ')));
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
    tslib_1.__extends(PblDragHandle, _super);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1kcmFnLWRyb3AuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvZHJhZy1hbmQtZHJvcC9jb3JlL2xhenktZHJhZy1kcm9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBd0IsUUFBUSxFQUF5QixNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7QUFFMUM7SUFjMEQsMkNBQWM7SUFkeEU7UUFBQSxxRUFtRUM7c0JBdENlLG9CQUFjLEdBQUcsSUFBSSxHQUFHLEVBQVcsQ0FBQzs7SUFzQ3BELENBQUM7SUFwREMsc0JBQUksMkNBQWM7Ozs7UUFBbEIsY0FBNkMsT0FBTyxtQkFBQSxJQUFJLENBQUMsWUFBWSxFQUFPLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTs7OztJQWdCL0Usa0NBQVE7OztJQUFSO1FBQUEsaUJBS0M7UUFKQyxJQUFJLElBQUksQ0FBQyxjQUFjLFlBQVksY0FBYyxLQUFLLEtBQUssRUFBRTtZQUMzRCxNQUFNLElBQUksS0FBSyxDQUFDLCtFQUErRSxDQUFDLENBQUE7U0FDakc7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxTQUFTOzs7UUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBRSxFQUFwQixDQUFvQixFQUFFLENBQUM7SUFDMUUs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QWRELENBWW1DLGFBQWEsR0FFL0M7U0FGWSxhQUFhOzs7SUFDWixnQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBJbnB1dCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBRdWVyeUxpc3QsIE9uRGVzdHJveSwgT3B0aW9uYWwsIEFmdGVyVmlld0luaXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDZGtEcm9wTGlzdCwgQ2RrRHJhZywgQ2RrRHJhZ0hhbmRsZSwgQ0RLX0RST1BfTElTVCwgRHJhZ0Ryb3AgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcclxuaW1wb3J0IHsgUGJsRHJvcExpc3RSZWYgfSBmcm9tICcuL2Ryb3AtbGlzdC1yZWYnO1xyXG5pbXBvcnQgeyBQYmxEcmFnUmVmIH0gZnJvbSAnLi9kcmFnLXJlZic7XHJcbmltcG9ydCB7IFBibERyYWdEcm9wIH0gZnJvbSAnLi9kcmFnLWRyb3AnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbY2RrTGF6eURyb3BMaXN0XScsXHJcbiAgZXhwb3J0QXM6ICdjZGtMYXp5RHJvcExpc3QnLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgeyBwcm92aWRlOiBEcmFnRHJvcCwgdXNlRXhpc3Rpbmc6IFBibERyYWdEcm9wIH0sXHJcbiAgICB7IHByb3ZpZGU6IENES19EUk9QX0xJU1QsIHVzZUNsYXNzOiBDZGtMYXp5RHJvcExpc3QgfSxcclxuICBdLFxyXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcclxuICAgICdjbGFzcyc6ICdjZGstZHJvcC1saXN0JyxcclxuICAgICdbaWRdJzogJ2lkJyxcclxuICAgICdbY2xhc3MuY2RrLWRyb3AtbGlzdC1kcmFnZ2luZ10nOiAnX2Ryb3BMaXN0UmVmLmlzRHJhZ2dpbmcoKScsXHJcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtcmVjZWl2aW5nXSc6ICdfZHJvcExpc3RSZWYuaXNSZWNlaXZpbmcoKScsXHJcbiAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2RrTGF6eURyb3BMaXN0PFQgPSBhbnksIERSZWYgPSBhbnk+IGV4dGVuZHMgQ2RrRHJvcExpc3Q8VD4gaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGdldCBwYmxEcm9wTGlzdFJlZigpOiBQYmxEcm9wTGlzdFJlZjxEUmVmPiB7IHJldHVybiB0aGlzLl9kcm9wTGlzdFJlZiBhcyBhbnk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VsZWN0b3IgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBkaXJlY3QgY29udGFpbmVyIGVsZW1lbnQsIHN0YXJ0aW5nIGZyb21cclxuICAgKiB0aGUgYGNka0Ryb3BMaXN0YCBlbGVtZW50IGFuZCBnb2luZyBkb3duIHRoZSBET00uIFBhc3NpbmcgYW4gYWx0ZXJuYXRlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudFxyXG4gICAqIGlzIHVzZWZ1bCB3aGVuIHRoZSBgY2RrRHJvcExpc3RgIGlzIG5vdCB0aGUgZGlyZWN0IHBhcmVudCAoaS5lLiBhbmNlc3RvciBidXQgbm90IGZhdGhlcilcclxuICAgKiBvZiB0aGUgZHJhZ2dhYmxlIGVsZW1lbnRzLlxyXG4gICAqL1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ2Nka0Ryb3BMaXN0RGlyZWN0Q29udGFpbmVyRWxlbWVudCcpIGRpcmVjdENvbnRhaW5lckVsZW1lbnQ6IHN0cmluZztcclxuXHJcbiAgX2RyYWdnYWJsZXM6IFF1ZXJ5TGlzdDxDZGtEcmFnPjtcclxuXHJcbiAgLyogcHJpdmF0ZSAqLyBvcmlnaW5hbEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xyXG4gIC8qIHByaXZhdGUgKi8gX2RyYWdnYWJsZXNTZXQgPSBuZXcgU2V0PENka0RyYWc+KCk7XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGJsRHJvcExpc3RSZWYgaW5zdGFuY2VvZiBQYmxEcm9wTGlzdFJlZiA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGBEcm9wTGlzdFJlZmAgaW5qZWN0aW9uLCB0aGUgcmVmIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBQYmxEcm9wTGlzdFJlZicpXHJcbiAgICB9XHJcbiAgICB0aGlzLl9kcm9wTGlzdFJlZi5iZWZvcmVTdGFydGVkLnN1YnNjcmliZSggKCkgPT4gdGhpcy5iZWZvcmVTdGFydGVkKCkgKTtcclxuICB9XHJcblxyXG4gIGFkZERyYWcoZHJhZzogQ2RrRHJhZyk6IHZvaWQge1xyXG4gICAgdGhpcy5fZHJhZ2dhYmxlc1NldC5hZGQoZHJhZyk7XHJcbiAgICB0aGlzLl9kcmFnZ2FibGVzLnJlc2V0KEFycmF5LmZyb20odGhpcy5fZHJhZ2dhYmxlc1NldC52YWx1ZXMoKSkpO1xyXG4gICAgdGhpcy5fZHJhZ2dhYmxlcy5ub3RpZnlPbkNoYW5nZXMoKTsgLy8gVE9ETzogbm90aWZ5IHdpdGggYXNhcCBzY2hlZHVsYXIgYW5kIG9icyRcclxuICB9XHJcblxyXG4gIHJlbW92ZURyYWcoZHJhZzogQ2RrRHJhZyk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fZHJhZ2dhYmxlc1NldC5kZWxldGUoZHJhZyk7XHJcbiAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgIHRoaXMuX2RyYWdnYWJsZXMucmVzZXQoQXJyYXkuZnJvbSh0aGlzLl9kcmFnZ2FibGVzU2V0LnZhbHVlcygpKSk7XHJcbiAgICAgIHRoaXMuX2RyYWdnYWJsZXMubm90aWZ5T25DaGFuZ2VzKCk7IC8vIFRPRE86IG5vdGlmeSB3aXRoIGFzYXAgc2NoZWR1bGFyIGFuZCBvYnMkXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyogcHJvdGVjdGVkICovIGJlZm9yZVN0YXJ0ZWQoKTogdm9pZCB7XHJcbiAgICAvLyBUaGlzIGlzIGEgd29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL3B1bGwvMTQxNTNcclxuICAgIC8vIFdvcmtpbmcgYXJvdW5kIHRoZSBtaXNzaW5nIGNhcGFiaWxpdHkgZm9yIHNlbGVjdGluZyBhIGNvbnRhaW5lciBlbGVtZW50IHRoYXQgaXMgbm90IHRoZSBkcm9wIGNvbnRhaW5lciBob3N0LlxyXG4gICAgaWYgKCF0aGlzLm9yaWdpbmFsRWxlbWVudCkge1xyXG4gICAgICB0aGlzLm9yaWdpbmFsRWxlbWVudCA9IHRoaXMuZWxlbWVudDtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmRpcmVjdENvbnRhaW5lckVsZW1lbnQpIHtcclxuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMub3JpZ2luYWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmRpcmVjdENvbnRhaW5lckVsZW1lbnQpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICB0aGlzLmVsZW1lbnQgPSBuZXcgRWxlbWVudFJlZjxIVE1MRWxlbWVudD4oZWxlbWVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm9yaWdpbmFsRWxlbWVudDtcclxuICAgIH1cclxuICAgIHRoaXMucGJsRHJvcExpc3RSZWYud2l0aEVsZW1lbnQodGhpcy5lbGVtZW50KTtcclxuICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2Nka0xhenlEcmFnXScsXHJcbiAgZXhwb3J0QXM6ICdjZGtMYXp5RHJhZycsXHJcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxyXG4gICAgJ2NsYXNzJzogJ2Nkay1kcmFnJyxcclxuICAgICdbY2xhc3MuY2RrLWRyYWctZHJhZ2dpbmddJzogJ19kcmFnUmVmLmlzRHJhZ2dpbmcoKScsXHJcbiAgfSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHsgcHJvdmlkZTogRHJhZ0Ryb3AsIHVzZUV4aXN0aW5nOiBQYmxEcmFnRHJvcCB9LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDZGtMYXp5RHJhZzxUID0gYW55LCBaIGV4dGVuZHMgQ2RrTGF6eURyb3BMaXN0PFQ+ID0gQ2RrTGF6eURyb3BMaXN0PFQ+LCBEUmVmID0gYW55PiBleHRlbmRzIENka0RyYWc8VD4gaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY2xhc3MgdG8gc2V0IHdoZW4gdGhlIHJvb3QgZWxlbWVudCBpcyBub3QgdGhlIGhvc3QgZWxlbWVudC4gKGkuZS4gd2hlbiBgY2RrRHJhZ1Jvb3RFbGVtZW50YCBpcyB1c2VkKS5cclxuICAgKi9cclxuICBASW5wdXQoJ2Nka0RyYWdSb290RWxlbWVudENsYXNzJykgc2V0IHJvb3RFbGVtZW50U2VsZWN0b3JDbGFzcyh2YWx1ZTogc3RyaW5nKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3Jvb3RDbGFzcyAmJiB0aGlzLl9ob3N0Tm90Um9vdCkge1xyXG4gICAgICBpZiAodGhpcy5fcm9vdENsYXNzKSB7XHJcbiAgICAgICAgdGhpcy5nZXRSb290RWxlbWVudCgpLmNsYXNzTGlzdC5yZW1vdmUoLi4udGhpcy5fcm9vdENsYXNzLnNwbGl0KCcgJykpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QuYWRkKC4uLnZhbHVlLnNwbGl0KCcgJykpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLl9yb290Q2xhc3MgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBwYmxEcmFnUmVmKCk6IFBibERyYWdSZWY8RFJlZj4geyByZXR1cm4gdGhpcy5fZHJhZ1JlZiBhcyBhbnk7IH1cclxuXHJcbiAgQElucHV0KCkgZ2V0IGNka0Ryb3BMaXN0KCk6IFogeyByZXR1cm4gdGhpcy5kcm9wQ29udGFpbmVyIGFzIFo7IH1cclxuICBzZXQgY2RrRHJvcExpc3QodmFsdWU6IFopIHtcclxuICAgIC8vIFRPIFNVUFBPUlQgYGNka0Ryb3BMaXN0YCB2aWEgc3RyaW5nIGlucHV0IChJRCkgd2UgbmVlZCBhIHJlYWN0aXZlIHJlZ2lzdHJ5Li4uXHJcbiAgICBpZiAodGhpcy5jZGtEcm9wTGlzdCkge1xyXG4gICAgICB0aGlzLmNka0Ryb3BMaXN0LnJlbW92ZURyYWcodGhpcyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmRyb3BDb250YWluZXIgPSB2YWx1ZTtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kcmFnUmVmLl93aXRoRHJvcENvbnRhaW5lcih2YWx1ZS5fZHJvcExpc3RSZWYpO1xyXG4gICAgICB2YWx1ZS5hZGREcmFnKHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyogcHJpdmF0ZSAqLyBfcm9vdENsYXNzOiBzdHJpbmc7XHJcbiAgLyogcHJpdmF0ZSAqLyBfaG9zdE5vdFJvb3QgPSBmYWxzZTtcclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wYmxEcmFnUmVmIGluc3RhbmNlb2YgUGJsRHJhZ1JlZiA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGBEcmFnUmVmYCBpbmplY3Rpb24sIHRoZSByZWYgaXMgbm90IGFuIGluc3RhbmNlIG9mIFBibERyYWdSZWYnKVxyXG4gICAgfVxyXG4gICAgdGhpcy5wYmxEcmFnUmVmLnJvb3RFbGVtZW50Q2hhbmdlZC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcclxuICAgICAgY29uc3Qgcm9vdEVsZW1lbnRTZWxlY3RvckNsYXNzID0gdGhpcy5fcm9vdENsYXNzO1xyXG4gICAgICBjb25zdCBob3N0Tm90Um9vdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50ICE9PSBldmVudC5jdXJyO1xyXG5cclxuICAgICAgaWYgKHJvb3RFbGVtZW50U2VsZWN0b3JDbGFzcykge1xyXG4gICAgICAgIGlmICh0aGlzLl9ob3N0Tm90Um9vdCkge1xyXG4gICAgICAgICAgZXZlbnQucHJldi5jbGFzc0xpc3QucmVtb3ZlKC4uLnJvb3RFbGVtZW50U2VsZWN0b3JDbGFzcy5zcGxpdCgnICcpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGhvc3ROb3RSb290KSB7XHJcbiAgICAgICAgICBldmVudC5jdXJyLmNsYXNzTGlzdC5hZGQoLi4ucm9vdEVsZW1lbnRTZWxlY3RvckNsYXNzLnNwbGl0KCcgJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9ob3N0Tm90Um9vdCA9IGhvc3ROb3RSb290O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBUaGlzIGlzIGEgd29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL3B1bGwvMTQxNThcclxuICAvLyBXb3JraW5nIGFyb3VuZCB0aGUgaXNzdWUgb2YgZHJvcCBjb250YWluZXIgaXMgbm90IHRoZSBkaXJlY3QgcGFyZW50IChmYXRoZXIpIG9mIGEgZHJhZyBpdGVtLlxyXG4gIC8vIFRoZSBlbnRpcmUgbmdBZnRlclZpZXdJbml0KCkgb3ZlcnJpZGluZyBtZXRob2QgY2FuIGJlIHJlbW92ZWQgaWYgUFIgYWNjZXB0ZWQuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdGFydGVkLnN1YnNjcmliZSggc3RhcnRlZEV2ZW50ID0+IHtcclxuICAgICAgaWYgKHRoaXMuZHJvcENvbnRhaW5lcikge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldFJvb3RFbGVtZW50KCk7XHJcbiAgICAgICAgY29uc3QgaW5pdGlhbFJvb3RFbGVtZW50UGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGlmICghZWxlbWVudC5uZXh0U2libGluZyAmJiBpbml0aWFsUm9vdEVsZW1lbnRQYXJlbnQgIT09IHRoaXMuZHJvcENvbnRhaW5lci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgIHRoaXMuZW5kZWQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoIGVuZGVkRXZlbnQgPT4gaW5pdGlhbFJvb3RFbGVtZW50UGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKiBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTsgKi9cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY2RrRHJvcExpc3QpIHtcclxuICAgICAgdGhpcy5jZGtEcm9wTGlzdC5yZW1vdmVEcmFnKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgLyogc3VwZXIubmdPbkRlc3Ryb3koKTsgKi9cclxuICB9XHJcbn1cclxuXHJcbi8qKiBIYW5kbGUgdGhhdCBjYW4gYmUgdXNlZCB0byBkcmFnIGFuZCBDZGtEcmFnIGluc3RhbmNlLiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1twYmxEcmFnSGFuZGxlXScsXHJcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxyXG4gICAgJ2NsYXNzJzogJ2Nkay1kcmFnLWhhbmRsZSdcclxuICB9LFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBDZGtEcmFnSGFuZGxlLFxyXG4gICAgICB1c2VFeGlzdGluZzogUGJsRHJhZ0hhbmRsZVxyXG4gICAgfVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBibERyYWdIYW5kbGUgZXh0ZW5kcyBDZGtEcmFnSGFuZGxlIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIEBPcHRpb25hbCgpIHBhcmVudERyYWc/OiBDZGtEcmFnKSB7IHN1cGVyKGVsZW1lbnQsIHBhcmVudERyYWcpOyB9XHJcbn1cclxuIl19