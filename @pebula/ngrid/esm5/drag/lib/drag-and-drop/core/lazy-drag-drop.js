/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { take } from 'rxjs/operators';
import { Input, Directive, ElementRef, Optional } from '@angular/core';
import { CdkDropList, CdkDrag, CdkDragHandle, CDK_DROP_LIST } from '@angular/cdk/drag-drop';
import { PblDropListRef } from './drop-list-ref';
import { PblDragRef } from './drag-ref';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1kcmFnLWRyb3AuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvZHJhZy1hbmQtZHJvcC9jb3JlL2xhenktZHJhZy1kcm9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBd0IsUUFBUSxFQUF5QixNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7QUFFeEM7SUFhMEQsMkNBQWM7SUFieEU7UUFBQSxxRUFrRUM7c0JBdENlLG9CQUFjLEdBQUcsSUFBSSxHQUFHLEVBQVcsQ0FBQzs7SUFzQ3BELENBQUM7SUFwREMsc0JBQUksMkNBQWM7Ozs7UUFBbEIsY0FBNkMsT0FBTyxtQkFBQSxJQUFJLENBQUMsWUFBWSxFQUFPLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTs7OztJQWdCL0Usa0NBQVE7OztJQUFSO1FBQUEsaUJBS0M7UUFKQyxJQUFJLElBQUksQ0FBQyxjQUFjLFlBQVksY0FBYyxLQUFLLEtBQUssRUFBRTtZQUMzRCxNQUFNLElBQUksS0FBSyxDQUFDLCtFQUErRSxDQUFDLENBQUE7U0FDakc7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxTQUFTOzs7UUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBRSxFQUFwQixDQUFvQixFQUFFLENBQUM7SUFDMUUsQ0FBQzs7Ozs7SUFFRCxpQ0FBTzs7OztJQUFQLFVBQVEsSUFBYTtRQUNuQixJQUFJLENB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QUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7UUFDRCwwQkFBMEI7SUFDNUIsQ0FBQzs7Z0JBckZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLElBQUksRUFBRTs7d0JBQ0osT0FBTyxFQUFFLFVBQVU7d0JBQ25CLDJCQUEyQixFQUFFLHVCQUF1QjtxQkFDckQ7aUJBQ0Y7OzsyQ0FNRSxLQUFLLFNBQUMseUJBQXlCOzhCQWMvQixLQUFLOztJQTJEUixrQkFBQztDQUFBLEFBdEZELENBUXlHLE9BQU8sR0E4RS9HO1NBOUVZLFdBQVc7OztJQWdDUixpQ0FBbUI7O0lBQ25CLG1DQUFxQjs7Ozs7QUFnRHJDO0lBWW1DLHlDQUFhO0lBQzlDLHVCQUFtQixPQUFnQyxFQUFjLFVBQW9CO1FBQXJGLFlBQXlGLGtCQUFNLE9BQU8sRUFBRSxVQUFVLENBQUMsU0FBRztRQUFuRyxhQUFPLEdBQVAsT0FBTyxDQUF5Qjs7SUFBa0UsQ0FBQzs7Z0JBYnZILFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixJQUFJLEVBQUU7O3dCQUNKLE9BQU8sRUFBRSxpQkFBaUI7cUJBQzNCO29CQUNELFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsYUFBYTs0QkFDdEIsV0FBVyxFQUFFLGFBQWE7eUJBQzNCO3FCQUNGO2lCQUNGOzs7O2dCQTdLMEIsVUFBVTtnQkFDZixPQUFPLHVCQThLMkIsUUFBUTs7SUFDaEUsb0JBQUM7Q0FBQSxBQWRELENBWW1DLGFBQWEsR0FFL0M7U0FGWSxhQUFhOzs7SUFDWixnQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSW5wdXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUXVlcnlMaXN0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBBZnRlclZpZXdJbml0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENka0Ryb3BMaXN0LCBDZGtEcmFnLCBDZGtEcmFnSGFuZGxlLCBDREtfRFJPUF9MSVNUIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBQYmxEcm9wTGlzdFJlZiB9IGZyb20gJy4vZHJvcC1saXN0LXJlZic7XG5pbXBvcnQgeyBQYmxEcmFnUmVmIH0gZnJvbSAnLi9kcmFnLXJlZic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjZGtMYXp5RHJvcExpc3RdJyxcbiAgZXhwb3J0QXM6ICdjZGtMYXp5RHJvcExpc3QnLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IENES19EUk9QX0xJU1QsIHVzZUNsYXNzOiBDZGtMYXp5RHJvcExpc3QgfSxcbiAgXSxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdjZGstZHJvcC1saXN0JyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1tjbGFzcy5jZGstZHJvcC1saXN0LWRyYWdnaW5nXSc6ICdfZHJvcExpc3RSZWYuaXNEcmFnZ2luZygpJyxcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtcmVjZWl2aW5nXSc6ICdfZHJvcExpc3RSZWYuaXNSZWNlaXZpbmcoKScsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2RrTGF6eURyb3BMaXN0PFQgPSBhbnksIERSZWYgPSBhbnk+IGV4dGVuZHMgQ2RrRHJvcExpc3Q8VD4gaW1wbGVtZW50cyBPbkluaXQge1xuICBnZXQgcGJsRHJvcExpc3RSZWYoKTogUGJsRHJvcExpc3RSZWY8RFJlZj4geyByZXR1cm4gdGhpcy5fZHJvcExpc3RSZWYgYXMgYW55OyB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdG9yIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGRldGVybWluZSB0aGUgZGlyZWN0IGNvbnRhaW5lciBlbGVtZW50LCBzdGFydGluZyBmcm9tXG4gICAqIHRoZSBgY2RrRHJvcExpc3RgIGVsZW1lbnQgYW5kIGdvaW5nIGRvd24gdGhlIERPTS4gUGFzc2luZyBhbiBhbHRlcm5hdGUgZGlyZWN0IGNvbnRhaW5lciBlbGVtZW50XG4gICAqIGlzIHVzZWZ1bCB3aGVuIHRoZSBgY2RrRHJvcExpc3RgIGlzIG5vdCB0aGUgZGlyZWN0IHBhcmVudCAoaS5lLiBhbmNlc3RvciBidXQgbm90IGZhdGhlcilcbiAgICogb2YgdGhlIGRyYWdnYWJsZSBlbGVtZW50cy5cbiAgICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCdjZGtEcm9wTGlzdERpcmVjdENvbnRhaW5lckVsZW1lbnQnKSBkaXJlY3RDb250YWluZXJFbGVtZW50OiBzdHJpbmc7XG5cbiAgX2RyYWdnYWJsZXM6IFF1ZXJ5TGlzdDxDZGtEcmFnPjtcblxuICAvKiBwcml2YXRlICovIG9yaWdpbmFsRWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIC8qIHByaXZhdGUgKi8gX2RyYWdnYWJsZXNTZXQgPSBuZXcgU2V0PENka0RyYWc+KCk7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGJsRHJvcExpc3RSZWYgaW5zdGFuY2VvZiBQYmxEcm9wTGlzdFJlZiA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBgRHJvcExpc3RSZWZgIGluamVjdGlvbiwgdGhlIHJlZiBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgUGJsRHJvcExpc3RSZWYnKVxuICAgIH1cbiAgICB0aGlzLl9kcm9wTGlzdFJlZi5iZWZvcmVTdGFydGVkLnN1YnNjcmliZSggKCkgPT4gdGhpcy5iZWZvcmVTdGFydGVkKCkgKTtcbiAgfVxuXG4gIGFkZERyYWcoZHJhZzogQ2RrRHJhZyk6IHZvaWQge1xuICAgIHRoaXMuX2RyYWdnYWJsZXNTZXQuYWRkKGRyYWcpO1xuICAgIHRoaXMuX2RyYWdnYWJsZXMucmVzZXQoQXJyYXkuZnJvbSh0aGlzLl9kcmFnZ2FibGVzU2V0LnZhbHVlcygpKSk7XG4gICAgdGhpcy5fZHJhZ2dhYmxlcy5ub3RpZnlPbkNoYW5nZXMoKTsgLy8gVE9ETzogbm90aWZ5IHdpdGggYXNhcCBzY2hlZHVsYXIgYW5kIG9icyRcbiAgfVxuXG4gIHJlbW92ZURyYWcoZHJhZzogQ2RrRHJhZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2RyYWdnYWJsZXNTZXQuZGVsZXRlKGRyYWcpO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHRoaXMuX2RyYWdnYWJsZXMucmVzZXQoQXJyYXkuZnJvbSh0aGlzLl9kcmFnZ2FibGVzU2V0LnZhbHVlcygpKSk7XG4gICAgICB0aGlzLl9kcmFnZ2FibGVzLm5vdGlmeU9uQ2hhbmdlcygpOyAvLyBUT0RPOiBub3RpZnkgd2l0aCBhc2FwIHNjaGVkdWxhciBhbmQgb2JzJFxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyogcHJvdGVjdGVkICovIGJlZm9yZVN0YXJ0ZWQoKTogdm9pZCB7XG4gICAgLy8gVGhpcyBpcyBhIHdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9wdWxsLzE0MTUzXG4gICAgLy8gV29ya2luZyBhcm91bmQgdGhlIG1pc3NpbmcgY2FwYWJpbGl0eSBmb3Igc2VsZWN0aW5nIGEgY29udGFpbmVyIGVsZW1lbnQgdGhhdCBpcyBub3QgdGhlIGRyb3AgY29udGFpbmVyIGhvc3QuXG4gICAgaWYgKCF0aGlzLm9yaWdpbmFsRWxlbWVudCkge1xuICAgICAgdGhpcy5vcmlnaW5hbEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgfVxuICAgIGlmICh0aGlzLmRpcmVjdENvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm9yaWdpbmFsRWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5kaXJlY3RDb250YWluZXJFbGVtZW50KSBhcyBIVE1MRWxlbWVudDtcbiAgICAgIHRoaXMuZWxlbWVudCA9IG5ldyBFbGVtZW50UmVmPEhUTUxFbGVtZW50PihlbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5vcmlnaW5hbEVsZW1lbnQ7XG4gICAgfVxuICAgIHRoaXMucGJsRHJvcExpc3RSZWYud2l0aEVsZW1lbnQodGhpcy5lbGVtZW50KTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2RrTGF6eURyYWddJyxcbiAgZXhwb3J0QXM6ICdjZGtMYXp5RHJhZycsXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICAnY2xhc3MnOiAnY2RrLWRyYWcnLFxuICAgICdbY2xhc3MuY2RrLWRyYWctZHJhZ2dpbmddJzogJ19kcmFnUmVmLmlzRHJhZ2dpbmcoKScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENka0xhenlEcmFnPFQgPSBhbnksIFogZXh0ZW5kcyBDZGtMYXp5RHJvcExpc3Q8VD4gPSBDZGtMYXp5RHJvcExpc3Q8VD4sIERSZWYgPSBhbnk+IGV4dGVuZHMgQ2RrRHJhZzxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAvKipcbiAgICogQSBjbGFzcyB0byBzZXQgd2hlbiB0aGUgcm9vdCBlbGVtZW50IGlzIG5vdCB0aGUgaG9zdCBlbGVtZW50LiAoaS5lLiB3aGVuIGBjZGtEcmFnUm9vdEVsZW1lbnRgIGlzIHVzZWQpLlxuICAgKi9cbiAgQElucHV0KCdjZGtEcmFnUm9vdEVsZW1lbnRDbGFzcycpIHNldCByb290RWxlbWVudFNlbGVjdG9yQ2xhc3ModmFsdWU6IHN0cmluZykgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWlucHV0LXJlbmFtZVxuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcm9vdENsYXNzICYmIHRoaXMuX2hvc3ROb3RSb290KSB7XG4gICAgICBpZiAodGhpcy5fcm9vdENsYXNzKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QucmVtb3ZlKC4uLnRoaXMuX3Jvb3RDbGFzcy5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmdldFJvb3RFbGVtZW50KCkuY2xhc3NMaXN0LmFkZCguLi52YWx1ZS5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcm9vdENsYXNzID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcGJsRHJhZ1JlZigpOiBQYmxEcmFnUmVmPERSZWY+IHsgcmV0dXJuIHRoaXMuX2RyYWdSZWYgYXMgYW55OyB9XG5cbiAgQElucHV0KCkgZ2V0IGNka0Ryb3BMaXN0KCk6IFogeyByZXR1cm4gdGhpcy5kcm9wQ29udGFpbmVyIGFzIFo7IH1cbiAgc2V0IGNka0Ryb3BMaXN0KHZhbHVlOiBaKSB7XG4gICAgLy8gVE8gU1VQUE9SVCBgY2RrRHJvcExpc3RgIHZpYSBzdHJpbmcgaW5wdXQgKElEKSB3ZSBuZWVkIGEgcmVhY3RpdmUgcmVnaXN0cnkuLi5cbiAgICBpZiAodGhpcy5jZGtEcm9wTGlzdCkge1xuICAgICAgdGhpcy5jZGtEcm9wTGlzdC5yZW1vdmVEcmFnKHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLmRyb3BDb250YWluZXIgPSB2YWx1ZTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX2RyYWdSZWYuX3dpdGhEcm9wQ29udGFpbmVyKHZhbHVlLl9kcm9wTGlzdFJlZik7XG4gICAgICB2YWx1ZS5hZGREcmFnKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qIHByaXZhdGUgKi8gX3Jvb3RDbGFzczogc3RyaW5nO1xuICAvKiBwcml2YXRlICovIF9ob3N0Tm90Um9vdCA9IGZhbHNlO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBibERyYWdSZWYgaW5zdGFuY2VvZiBQYmxEcmFnUmVmID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGBEcmFnUmVmYCBpbmplY3Rpb24sIHRoZSByZWYgaXMgbm90IGFuIGluc3RhbmNlIG9mIFBibERyYWdSZWYnKVxuICAgIH1cbiAgICB0aGlzLnBibERyYWdSZWYucm9vdEVsZW1lbnRDaGFuZ2VkLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgY29uc3Qgcm9vdEVsZW1lbnRTZWxlY3RvckNsYXNzID0gdGhpcy5fcm9vdENsYXNzO1xuICAgICAgY29uc3QgaG9zdE5vdFJvb3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCAhPT0gZXZlbnQuY3VycjtcblxuICAgICAgaWYgKHJvb3RFbGVtZW50U2VsZWN0b3JDbGFzcykge1xuICAgICAgICBpZiAodGhpcy5faG9zdE5vdFJvb3QpIHtcbiAgICAgICAgICBldmVudC5wcmV2LmNsYXNzTGlzdC5yZW1vdmUoLi4ucm9vdEVsZW1lbnRTZWxlY3RvckNsYXNzLnNwbGl0KCcgJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3N0Tm90Um9vdCkge1xuICAgICAgICAgIGV2ZW50LmN1cnIuY2xhc3NMaXN0LmFkZCguLi5yb290RWxlbWVudFNlbGVjdG9yQ2xhc3Muc3BsaXQoJyAnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuX2hvc3ROb3RSb290ID0gaG9zdE5vdFJvb3Q7XG4gICAgfSk7XG4gIH1cblxuICAvLyBUaGlzIGlzIGEgd29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL3B1bGwvMTQxNThcbiAgLy8gV29ya2luZyBhcm91bmQgdGhlIGlzc3VlIG9mIGRyb3AgY29udGFpbmVyIGlzIG5vdCB0aGUgZGlyZWN0IHBhcmVudCAoZmF0aGVyKSBvZiBhIGRyYWcgaXRlbS5cbiAgLy8gVGhlIGVudGlyZSBuZ0FmdGVyVmlld0luaXQoKSBvdmVycmlkaW5nIG1ldGhvZCBjYW4gYmUgcmVtb3ZlZCBpZiBQUiBhY2NlcHRlZC5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3RhcnRlZC5zdWJzY3JpYmUoIHN0YXJ0ZWRFdmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5kcm9wQ29udGFpbmVyKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldFJvb3RFbGVtZW50KCk7XG4gICAgICAgIGNvbnN0IGluaXRpYWxSb290RWxlbWVudFBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgaWYgKCFlbGVtZW50Lm5leHRTaWJsaW5nICYmIGluaXRpYWxSb290RWxlbWVudFBhcmVudCAhPT0gdGhpcy5kcm9wQ29udGFpbmVyLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuZW5kZWQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoIGVuZGVkRXZlbnQgPT4gaW5pdGlhbFJvb3RFbGVtZW50UGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpOyAqL1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2RrRHJvcExpc3QpIHtcbiAgICAgIHRoaXMuY2RrRHJvcExpc3QucmVtb3ZlRHJhZyh0aGlzKTtcbiAgICB9XG4gICAgLyogc3VwZXIubmdPbkRlc3Ryb3koKTsgKi9cbiAgfVxufVxuXG4vKiogSGFuZGxlIHRoYXQgY2FuIGJlIHVzZWQgdG8gZHJhZyBhbmQgQ2RrRHJhZyBpbnN0YW5jZS4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxEcmFnSGFuZGxlXScsXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICAnY2xhc3MnOiAnY2RrLWRyYWctaGFuZGxlJ1xuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBDZGtEcmFnSGFuZGxlLFxuICAgICAgdXNlRXhpc3Rpbmc6IFBibERyYWdIYW5kbGVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsRHJhZ0hhbmRsZSBleHRlbmRzIENka0RyYWdIYW5kbGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIEBPcHRpb25hbCgpIHBhcmVudERyYWc/OiBDZGtEcmFnKSB7IHN1cGVyKGVsZW1lbnQsIHBhcmVudERyYWcpOyB9XG59XG4iXX0=