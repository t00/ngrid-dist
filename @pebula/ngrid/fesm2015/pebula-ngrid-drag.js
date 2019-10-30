import { take, auditTime } from 'rxjs/operators';
import { EventEmitter, ElementRef, Directive, Input, Optional, ChangeDetectorRef, SkipSelf, Inject, NgZone, ViewContainerRef, Injectable, ɵɵdefineInjectable, ɵɵinject, Output, Component, ChangeDetectionStrategy, ViewEncapsulation, HostListener, TemplateRef, NgModule } from '@angular/core';
import { DropListRef, DragRef, CdkDropList, CDK_DROP_LIST, CdkDrag, CdkDragHandle, CdkDropListGroup, DragDrop, DragDropRegistry, CDK_DRAG_CONFIG, DragDropModule } from '@angular/cdk/drag-drop';
import { Subject, BehaviorSubject, Subscription, animationFrameScheduler } from 'rxjs';
import { coerceElement, coerceBooleanProperty } from '@angular/cdk/coercion';
import { __decorate, __metadata } from 'tslib';
import { DOCUMENT, CommonModule } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { PblNgridComponent, PblNgridPluginController, TablePlugin, PblColumn, PblColumnGroup, PblNgridMultiTemplateRegistry, PblNgridRegistryService, provideCommon, PblNgridModule } from '@pebula/ngrid';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class PblDropListRef extends DropListRef {
    constructor() {
        super(...arguments);
        /**
         * Emits right before dragging has started.
         */
        this.beforeExit = new Subject();
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} element
     * @return {THIS}
     */
    withElement(element) {
        // TODO: Workaround, see if we can push this through https://github.com/angular/material2/issues/15086
        ((/** @type {?} */ ((/** @type {?} */ (this))))).element = coerceElement(element);
        return (/** @type {?} */ (this));
    }
    /**
     * @return {?}
     */
    dispose() {
        this.beforeExit.complete();
        super.dispose();
    }
}
if (false) {
    /**
     * Emits right before dragging has started.
     * @type {?}
     */
    PblDropListRef.prototype.beforeExit;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class PblDragRef extends DragRef {
    /**
     * @param {...?} args
     */
    constructor(...args) {
        super(...args);
        /**
         * Fires when the root element changes
         *
         * > Does not emit on the initial setup.
         */
        this.rootElementChanged = new EventEmitter();
        this.exited.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            const { container } = e;
            if (container instanceof PblDropListRef) {
                container.beforeExit.next({ item: this });
            }
        }));
    }
    /**
     * Sets an alternate drag root element. The root element is the element that will be moved as
     * the user is dragging. Passing an alternate root element is useful when trying to enable
     * dragging on an element that you might not have access to.
     * @template THIS
     * @this {THIS}
     * @param {?} rootElement
     * @return {THIS}
     */
    withRootElement(rootElement) {
        // the first call to `withRootElement` comes from the base class, before we construct the emitter.
        // We don't need it anyway...
        if ((/** @type {?} */ (this)).rootElementChanged) {
            /** @type {?} */
            const element = coerceElement(rootElement);
            if ((/** @type {?} */ (this)).getRootElement() !== element) {
                (/** @type {?} */ (this)).rootElementChanged.next({ prev: (/** @type {?} */ (this)).getRootElement(), curr: element });
            }
        }
        return super.withRootElement(rootElement);
    }
    /**
     * @return {?}
     */
    dispose() {
        this.rootElementChanged.complete();
        super.dispose();
    }
}
if (false) {
    /**
     * Fires when the root element changes
     *
     * > Does not emit on the initial setup.
     * @type {?}
     */
    PblDragRef.prototype.rootElementChanged;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T, DRef
 */
class CdkLazyDropList extends CdkDropList {
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
class CdkLazyDrag extends CdkDrag {
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
class PblDragHandle extends CdkDragHandle {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const isMaterial7 = CdkDropList.length === 7;
/**
 * @param {?} element
 * @param {?} dragDrop
 * @param {?} changeDetectorRef
 * @param {?=} dir
 * @param {?=} group
 * @param {?=} dragDropRegistry
 * @param {?=} document
 * @return {?}
 */
function cdkDropList(element, dragDrop, changeDetectorRef, dir, group, 
// for v7 compat
dragDropRegistry, document) {
    return isMaterial7
        ? (/** @type {?} */ ([element, (/** @type {?} */ (dragDropRegistry)), changeDetectorRef, dir, group, document, dragDrop]))
        : [element, dragDrop, changeDetectorRef, dir, group];
}
/**
 * @param {?} element
 * @param {?} dropContainer
 * @param {?} _document
 * @param {?} _ngZone
 * @param {?} _viewContainerRef
 * @param {?} config
 * @param {?} _dir
 * @param {?} dragDrop
 * @param {?} _changeDetectorRef
 * @param {?} viewportRuler
 * @param {?=} dragDropRegistry
 * @return {?}
 */
function cdkDrag(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef, 
// for v7 compat
viewportRuler, dragDropRegistry) {
    return isMaterial7
        ? (/** @type {?} */ ([element, dropContainer, _document, _ngZone, _viewContainerRef, viewportRuler, dragDropRegistry, config, _dir, dragDrop]))
        : [element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef];
}

var PblNgridRowReorderPluginDirective_1;
/** @type {?} */
const PLUGIN_KEY = 'rowReorder';
/** @type {?} */
let _uniqueIdCounter = 0;
const ɵ0 = undefined;
/**
 * @template T
 */
let PblNgridRowReorderPluginDirective = PblNgridRowReorderPluginDirective_1 = /**
 * @template T
 */
class PblNgridRowReorderPluginDirective extends CdkDropList {
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
        this.id = `pbl-ngrid-row-reorder-list-${_uniqueIdCounter++}`;
        this._rowReorder = false;
        /* CdkLazyDropList start */
        /**
         * Selector that will be used to determine the direct container element, starting from
         * the `cdkDropList` element and going down the DOM. Passing an alternate direct container element
         * is useful when the `cdkDropList` is not the direct parent (i.e. ancestor but not father)
         * of the draggable elements.
         */
        this.directContainerElement = '.pbl-ngrid-scroll-container'; // we need this to allow auto-scroll
        this._draggablesSet = new Set();
        // super(element, dragDrop, changeDetectorRef, dir, group);
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        this.dropped.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const item = (/** @type {?} */ (event.item));
            /** @type {?} */
            const previousIndex = table.ds.source.indexOf(item.draggedContext.row);
            /** @type {?} */
            const currentIndex = event.currentIndex + table.ds.renderStart;
            this.table.contextApi.clear();
            this.table.ds.moveItem(previousIndex, currentIndex, true);
            this.table._cdkTable.syncRows('data');
        }));
    }
    /**
     * @return {?}
     */
    get rowReorder() { return this._rowReorder; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set rowReorder(value) {
        value = coerceBooleanProperty(value);
        this._rowReorder = value;
    }
    // we need this to allow auto-scroll
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
    /* CdkLazyDropList end */
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this._removePlugin(this.table);
    }
};
PblNgridRowReorderPluginDirective.decorators = [
    { type: Directive, args: [{
                selector: 'pbl-ngrid[rowReorder]',
                exportAs: 'pblNgridRowReorder',
                inputs: [
                    'directContainerElement:cdkDropListDirectContainerElement'
                ],
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    'class': 'cdk-drop-list',
                    '[id]': 'id',
                    '[class.cdk-drop-list-dragging]': '_dropListRef.isDragging()',
                    '[class.cdk-drop-list-receiving]': '_dropListRef.isReceiving()',
                    '[class.pbl-row-reorder]': 'rowReorder && !this.table.ds?.sort.sort?.order && !this.table.ds?.filter?.filter',
                },
                providers: [
                    { provide: CdkDropListGroup, useValue: ɵ0 },
                    { provide: CDK_DROP_LIST, useExisting: PblNgridRowReorderPluginDirective_1 },
                ],
            },] }
];
/** @nocollapse */
PblNgridRowReorderPluginDirective.ctorParameters = () => [
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
PblNgridRowReorderPluginDirective.propDecorators = {
    rowReorder: [{ type: Input }]
};
/**
 * @template T
 */
PblNgridRowReorderPluginDirective = PblNgridRowReorderPluginDirective_1 = __decorate([
    TablePlugin({ id: PLUGIN_KEY }),
    __metadata("design:paramtypes", [PblNgridComponent,
        PblNgridPluginController,
        ElementRef,
        DragDrop,
        ChangeDetectorRef,
        Directionality,
        CdkDropListGroup,
        DragDropRegistry, Object])
], PblNgridRowReorderPluginDirective);
if (false) {
    /** @type {?} */
    PblNgridRowReorderPluginDirective.prototype.id;
    /**
     * @type {?}
     * @private
     */
    PblNgridRowReorderPluginDirective.prototype._rowReorder;
    /**
     * @type {?}
     * @private
     */
    PblNgridRowReorderPluginDirective.prototype._removePlugin;
    /**
     * Selector that will be used to determine the direct container element, starting from
     * the `cdkDropList` element and going down the DOM. Passing an alternate direct container element
     * is useful when the `cdkDropList` is not the direct parent (i.e. ancestor but not father)
     * of the draggable elements.
     * @type {?}
     */
    PblNgridRowReorderPluginDirective.prototype.directContainerElement;
    /** @type {?} */
    PblNgridRowReorderPluginDirective.prototype.originalElement;
    /** @type {?} */
    PblNgridRowReorderPluginDirective.prototype._draggablesSet;
    /** @type {?} */
    PblNgridRowReorderPluginDirective.prototype.table;
    /* Skipping unhandled member: ;*/
}
/**
 * @template T
 */
class PblNgridRowDragDirective extends CdkDrag {
    // CTOR IS REQUIRED OR IT WONT WORK IN AOT
    // TODO: Try to remove when supporting IVY
    /**
     * @param {?} element
     * @param {?} dropContainer
     * @param {?} _document
     * @param {?} _ngZone
     * @param {?} _viewContainerRef
     * @param {?} config
     * @param {?} _dir
     * @param {?} dragDrop
     * @param {?} _changeDetectorRef
     * @param {?} viewportRuler
     * @param {?} dragDropRegistry
     */
    constructor(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef, viewportRuler, // for v7 compat
    dragDropRegistry) {
        super(...cdkDrag(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef, viewportRuler, dragDropRegistry));
        this.rootElementSelector = 'pbl-ngrid-row';
        this._hostNotRoot = false;
        // super(
        //   element,
        //   dropContainer,
        //   _document,
        //   _ngZone,
        //   _viewContainerRef,
        //   config,
        //   _dir,
        //   dragDrop,
        //   _changeDetectorRef,
        // );
        this.started.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            const { col, row, table, value } = this._context;
            this._draggedContext = { col, row, table, value };
        }));
    }
    /**
     * @return {?}
     */
    get context() {
        return this._context;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set context(value) {
        this._context = value;
        /** @type {?} */
        const pluginCtrl = this.pluginCtrl = value && PblNgridPluginController.find(value.table);
        /** @type {?} */
        const plugin = pluginCtrl && pluginCtrl.getPlugin(PLUGIN_KEY);
        this.cdkDropList = plugin || undefined;
    }
    /**
     * Reference to the last dragged context.
     *
     * This context is not similar to the `context` property.
     * The `context` property holds the current context which is shared and updated on scroll so if a user start a drag and then scrolled
     * the context will point to the row in view and not the original cell.
     * @return {?}
     */
    get draggedContext() {
        return this._draggedContext;
    }
    /* CdkLazyDrag start */
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
    ngOnInit() { CdkLazyDrag.prototype.ngOnInit.call(this); }
    /**
     * @return {?}
     */
    ngAfterViewInit() { CdkLazyDrag.prototype.ngAfterViewInit.call(this); super.ngAfterViewInit(); }
    /**
     * @return {?}
     */
    ngOnDestroy() { CdkLazyDrag.prototype.ngOnDestroy.call(this); super.ngOnDestroy(); }
}
PblNgridRowDragDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblNgridRowDrag]',
                exportAs: 'pblNgridRowDrag',
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    'class': 'cdk-drag',
                    '[class.cdk-drag-dragging]': '_dragRef.isDragging()',
                },
                providers: [
                    { provide: CdkDrag, useExisting: PblNgridRowDragDirective }
                ]
            },] }
];
/** @nocollapse */
PblNgridRowDragDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: CdkDropList, decorators: [{ type: Inject, args: [CDK_DROP_LIST,] }, { type: Optional }, { type: SkipSelf }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgZone },
    { type: ViewContainerRef },
    { type: undefined, decorators: [{ type: Inject, args: [CDK_DRAG_CONFIG,] }] },
    { type: Directionality },
    { type: DragDrop },
    { type: ChangeDetectorRef },
    { type: ViewportRuler, decorators: [{ type: Optional }] },
    { type: DragDropRegistry, decorators: [{ type: Optional }] }
];
PblNgridRowDragDirective.propDecorators = {
    context: [{ type: Input, args: ['pblNgridRowDrag',] }],
    rootElementSelectorClass: [{ type: Input, args: ['cdkDragRootElementClass',] }],
    cdkDropList: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    PblNgridRowDragDirective.prototype.rootElementSelector;
    /**
     * @type {?}
     * @private
     */
    PblNgridRowDragDirective.prototype._context;
    /**
     * @type {?}
     * @private
     */
    PblNgridRowDragDirective.prototype._draggedContext;
    /**
     * @type {?}
     * @private
     */
    PblNgridRowDragDirective.prototype.pluginCtrl;
    /** @type {?} */
    PblNgridRowDragDirective.prototype._rootClass;
    /** @type {?} */
    PblNgridRowDragDirective.prototype._hostNotRoot;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Default configuration to be used when creating a `DragRef`.
 * @type {?}
 */
const DEFAULT_CONFIG = {
    dragStartThreshold: 5,
    pointerDirectionChangeThreshold: 5
};
/**
 * Service that allows for drag-and-drop functionality to be attached to DOM elements.
 */
class PblDragDrop {
    /**
     * @param {?} _document
     * @param {?} _ngZone
     * @param {?} _viewportRuler
     * @param {?} _dragDropRegistry
     */
    constructor(_document, _ngZone, _viewportRuler, _dragDropRegistry) {
        this._document = _document;
        this._ngZone = _ngZone;
        this._viewportRuler = _viewportRuler;
        this._dragDropRegistry = _dragDropRegistry;
    }
    /**
     * Turns an element into a draggable item.
     * @template T
     * @param {?} element Element to which to attach the dragging functionality.
     * @param {?=} config Object used to configure the dragging behavior.
     * @return {?}
     */
    createDrag(element, config = DEFAULT_CONFIG) {
        return new PblDragRef(element, config, this._document, this._ngZone, this._viewportRuler, this._dragDropRegistry);
    }
    /**
     * Turns an element into a drop list.
     * @template T
     * @param {?} element Element to which to attach the drop list functionality.
     * @return {?}
     */
    createDropList(element) {
        return new PblDropListRef(element, this._dragDropRegistry, this._document);
    }
}
PblDragDrop.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
PblDragDrop.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgZone },
    { type: ViewportRuler },
    { type: DragDropRegistry }
];
/** @nocollapse */ PblDragDrop.ngInjectableDef = ɵɵdefineInjectable({ factory: function PblDragDrop_Factory() { return new PblDragDrop(ɵɵinject(DOCUMENT), ɵɵinject(NgZone), ɵɵinject(ViewportRuler), ɵɵinject(DragDropRegistry)); }, token: PblDragDrop, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblDragDrop.prototype._document;
    /**
     * @type {?}
     * @private
     */
    PblDragDrop.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    PblDragDrop.prototype._viewportRuler;
    /**
     * @type {?}
     * @private
     */
    PblDragDrop.prototype._dragDropRegistry;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @this {?}
 * @param {?} column
 * @return {?}
 */
function checkGroupLockConstraint(column) {
    for (const id of this.groups) {
        /** @type {?} */
        const g = this.groupStore.find(id);
        if (g && g.lockColumns && !column.isInGroup(g)) {
            return false;
        }
    }
    return true;
}
/**
 * @return {?}
 */
function extendGrid() {
    PblColumn.extendProperty('reorder');
    PblColumn.extendProperty('wontBudge');
    PblColumnGroup.extendProperty('lockColumns');
    PblColumn.prototype.checkGroupLockConstraint = (/**
     * @this {?}
     * @param {?} column
     * @return {?}
     */
    function (column) {
        return checkGroupLockConstraint.call(this, column) && checkGroupLockConstraint.call(column, this);
    });
}

var PblNgridColumnReorderPluginDirective_1;
/** @type {?} */
const PLUGIN_KEY$1 = 'columnReorder';
/** @type {?} */
let _uniqueIdCounter$1 = 0;
/**
 * @template T
 */
let PblNgridColumnReorderPluginDirective = PblNgridColumnReorderPluginDirective_1 = /**
 * @template T
 */
class PblNgridColumnReorderPluginDirective extends CdkDropList {
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
        this.id = `pbl-ngrid-column-reorder-list-${_uniqueIdCounter$1++}`;
        this.orientation = 'horizontal';
        this.dragging = new BehaviorSubject(false);
        this._columnReorder = false;
        this._manualOverride = false;
        this._draggablesSet = new Set();
        // super(element, dragDrop, changeDetectorRef, dir, group);
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY$1, this);
        this.directContainerElement = '.pbl-ngrid-header-row-main';
        this.dropped.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (!this.manualOverride) {
                this.table.columnApi.moveColumn(((/** @type {?} */ (event.item))).column, event.currentIndex);
            }
        }));
        this.dragging.subscribe((/**
         * @param {?} isDragging
         * @return {?}
         */
        isDragging => {
            /** @type {?} */
            const el = element.nativeElement;
            if (isDragging) {
                el.classList.add('pbl-ngrid-column-list-dragging');
            }
            else {
                el.classList.remove('pbl-ngrid-column-list-dragging');
            }
            this.lastSwap = undefined;
        }));
        this.monkeyPatchDropListRef();
    }
    /**
     * @return {?}
     */
    get columnReorder() { return this._columnReorder; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set columnReorder(value) {
        value = coerceBooleanProperty(value);
        this._columnReorder = value;
    }
    /**
     * When true, will not move the column on drop.
     * Instead you need to handle the dropped event.
     * @return {?}
     */
    get manualOverride() { return this._manualOverride; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set manualOverride(value) { this._manualOverride = coerceBooleanProperty(value); }
    // Stuff to workaround encapsulation in CdkDropList
    /**
     * @private
     * @return {?}
     */
    get pblGetItemIndexFromPointerPosition() {
        return ((/** @type {?} */ (this._dropListRef)))._getItemIndexFromPointerPosition.bind(this._dropListRef);
    }
    /**
     * @private
     * @return {?}
     */
    get pblGetPositionCacheItems() {
        return ((/** @type {?} */ (this._dropListRef)))._itemPositions;
    }
    /**
     * @return {?}
     */
    get pblDropListRef() { return (/** @type {?} */ (this._dropListRef)); }
    // ngOnInit(): void { CdkLazyDropList.prototype.ngOnInit.call(this); }
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
    // beforeStarted(): void { CdkLazyDropList.prototype.beforeStarted.call(this); }
    /* CdkLazyDropList end */
    /**
     * @return {?}
     */
    ngOnInit() {
        CdkLazyDropList.prototype.ngOnInit.call(this); // super.ngOnInit();
        this.dropped.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => this._pblReset()));
        this.pblDropListRef.beforeExit.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => this._pblReset()));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this._removePlugin(this.table);
    }
    /* protected */ /**
     * @return {?}
     */
    beforeStarted() {
        CdkLazyDropList.prototype.beforeStarted.call(this); // super.beforeStarted();
        this.lastSorted = undefined;
        this.dragging.next(true);
    }
    /**
     * @private
     * @return {?}
     */
    _pblReset() {
        this.dragging.next(false);
        /** @type {?} */
        const siblings = this.pblGetPositionCacheItems;
        siblings.forEach((/**
         * @param {?} sibling
         * @param {?} index
         * @return {?}
         */
        (sibling, index) => {
            for (const c of sibling.drag.data.getCells()) {
                c.style.transform = ``;
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    monkeyPatchDropListRef() {
        const { _sortItem, enter } = this._dropListRef;
        this.pblDropListRef.enter = (/**
         * @param {?} item
         * @param {?} pointerX
         * @param {?} pointerY
         * @return {?}
         */
        (item, pointerX, pointerY) => {
            /** @type {?} */
            const lastSorted = this.lastSorted;
            this.lastSorted = undefined;
            if (lastSorted && lastSorted.drag === item) {
                /** @type {?} */
                const isHorizontal = this.orientation === 'horizontal';
                pointerX = lastSorted.clientRect.left + 1 - (isHorizontal ? lastSorted.offset : 0);
                pointerY = lastSorted.clientRect.top + 1 - (!isHorizontal ? lastSorted.offset : 0);
            }
            enter.call(this._dropListRef, item, pointerX, pointerY);
        });
        this.pblDropListRef._sortItem = (/**
         * @param {?} item
         * @param {?} pointerX
         * @param {?} pointerY
         * @param {?} pointerDelta
         * @return {?}
         */
        (item, pointerX, pointerY, pointerDelta) => {
            /** @type {?} */
            const siblings = this.pblGetPositionCacheItems;
            this.lastSorted = siblings.find((/**
             * @param {?} s
             * @return {?}
             */
            s => s.drag === item));
            /** @type {?} */
            const newIndex = this.pblGetItemIndexFromPointerPosition((/** @type {?} */ (item)), pointerX, pointerY, pointerDelta);
            if (newIndex === -1 && siblings.length > 0) {
                return;
            }
            /** @type {?} */
            const oldOrder = siblings.slice();
            /** @type {?} */
            const isHorizontal = this.orientation === 'horizontal';
            /** @type {?} */
            const siblingAtNewPosition = siblings[newIndex];
            if (siblingAtNewPosition.drag.data.column.wontBudge) {
                return;
            }
            // we now need to find if between current and new position there are items with `wontBudge`
            /** @type {?} */
            const itemAtOriginalPosition = this.lastSwap ? this.lastSwap : item;
            /** @type {?} */
            const currentIndex = siblings.findIndex((/**
             * @param {?} currentItem
             * @return {?}
             */
            currentItem => currentItem.drag === itemAtOriginalPosition));
            /** @type {?} */
            const start = Math.min(newIndex, currentIndex);
            /** @type {?} */
            const itemsDraggedOver = siblings.slice(start, Math.abs(newIndex - currentIndex) + start);
            for (const dragItem of itemsDraggedOver) {
                if (dragItem.drag.data.column.wontBudge && dragItem.drag !== item) {
                    return;
                }
            }
            // check if we move the item outside of locked group OR into a locked group... both are invalid.
            if (!item.data.column.checkGroupLockConstraint(siblingAtNewPosition.drag.data.column)) {
                return;
            }
            _sortItem.call(this._dropListRef, item, pointerX, pointerY, pointerDelta);
            this.lastSwap = siblingAtNewPosition.drag;
            if (isHorizontal) {
                siblings.forEach((/**
                 * @param {?} sibling
                 * @param {?} index
                 * @return {?}
                 */
                (sibling, index) => {
                    // Don't do anything if the position hasn't changed.
                    if (oldOrder[index] === sibling) {
                        return;
                    }
                    for (const c of sibling.drag.data.getCells()) {
                        c.style.transform = `translate3d(${sibling.offset}px, 0, 0)`;
                    }
                }));
            }
        });
    }
};
PblNgridColumnReorderPluginDirective.decorators = [
    { type: Directive, args: [{
                selector: 'pbl-ngrid[columnReorder]',
                exportAs: 'pblNgridColumnReorder',
                inputs: [
                    'directContainerElement:cdkDropListDirectContainerElement'
                ],
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    'class': 'cdk-drop-list',
                    '[id]': 'id',
                    '[class.cdk-drop-list-dragging]': '_dropListRef.isDragging()',
                    '[class.cdk-drop-list-receiving]': '_dropListRef.isReceiving()',
                },
                providers: [
                    { provide: CDK_DROP_LIST, useExisting: PblNgridColumnReorderPluginDirective_1 },
                ],
            },] }
];
/** @nocollapse */
PblNgridColumnReorderPluginDirective.ctorParameters = () => [
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
PblNgridColumnReorderPluginDirective.propDecorators = {
    columnReorder: [{ type: Input }],
    manualOverride: [{ type: Input }],
    dragging: [{ type: Output, args: ['cdkDropDragging',] }]
};
/**
 * @template T
 */
PblNgridColumnReorderPluginDirective = PblNgridColumnReorderPluginDirective_1 = __decorate([
    TablePlugin({ id: PLUGIN_KEY$1, runOnce: extendGrid }),
    __metadata("design:paramtypes", [PblNgridComponent,
        PblNgridPluginController,
        ElementRef,
        DragDrop,
        ChangeDetectorRef,
        Directionality,
        CdkDropListGroup,
        DragDropRegistry, Object])
], PblNgridColumnReorderPluginDirective);
if (false) {
    /** @type {?} */
    PblNgridColumnReorderPluginDirective.prototype.id;
    /** @type {?} */
    PblNgridColumnReorderPluginDirective.prototype.orientation;
    /** @type {?} */
    PblNgridColumnReorderPluginDirective.prototype.dragging;
    /**
     * @type {?}
     * @private
     */
    PblNgridColumnReorderPluginDirective.prototype._columnReorder;
    /**
     * @type {?}
     * @private
     */
    PblNgridColumnReorderPluginDirective.prototype._manualOverride;
    /**
     * @type {?}
     * @private
     */
    PblNgridColumnReorderPluginDirective.prototype._removePlugin;
    /**
     * @type {?}
     * @private
     */
    PblNgridColumnReorderPluginDirective.prototype.lastSwap;
    /**
     * @type {?}
     * @private
     */
    PblNgridColumnReorderPluginDirective.prototype.lastSorted;
    /**
     * Selector that will be used to determine the direct container element, starting from
     * the `cdkDropList` element and going down the DOM. Passing an alternate direct container element
     * is useful when the `cdkDropList` is not the direct parent (i.e. ancestor but not father)
     * of the draggable elements.
     * @type {?}
     */
    PblNgridColumnReorderPluginDirective.prototype.directContainerElement;
    /** @type {?} */
    PblNgridColumnReorderPluginDirective.prototype.originalElement;
    /** @type {?} */
    PblNgridColumnReorderPluginDirective.prototype._draggablesSet;
    /** @type {?} */
    PblNgridColumnReorderPluginDirective.prototype.table;
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
}
/**
 * @template T
 */
class PblNgridColumnDragDirective extends CdkDrag {
    // CTOR IS REQUIRED OR IT WONT WORK IN AOT
    // TODO: Try to remove when supporting IVY
    /**
     * @param {?} element
     * @param {?} dropContainer
     * @param {?} _document
     * @param {?} _ngZone
     * @param {?} _viewContainerRef
     * @param {?} config
     * @param {?} _dir
     * @param {?} dragDrop
     * @param {?} _changeDetectorRef
     * @param {?} viewportRuler
     * @param {?} dragDropRegistry
     */
    constructor(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef, viewportRuler, // for v7 compat
    dragDropRegistry) {
        super(...cdkDrag(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef, viewportRuler, dragDropRegistry));
        this.rootElementSelector = 'pbl-ngrid-header-cell';
        this._hostNotRoot = false;
        // super(
        //   element,
        //   dropContainer,
        //   _document,
        //   _ngZone,
        //   _viewContainerRef,
        //   config,
        //   _dir,
        //   dragDrop,
        //   _changeDetectorRef,
        // );
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set context(value) {
        this._context = value;
        this.column = value && value.col;
        /** @type {?} */
        const pluginCtrl = this.pluginCtrl = value && PblNgridPluginController.find(value.table);
        /** @type {?} */
        const plugin = pluginCtrl && pluginCtrl.getPlugin(PLUGIN_KEY$1);
        this.cdkDropList = plugin || undefined;
        this.disabled = this.column && this.column.reorder ? false : true;
    }
    /* CdkLazyDrag start */
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
    ngOnInit() { CdkLazyDrag.prototype.ngOnInit.call(this); }
    // ngAfterViewInit(): void { CdkLazyDrag.prototype.ngAfterViewInit.call(this); super.ngAfterViewInit(); }
    /**
     * @return {?}
     */
    ngOnDestroy() { CdkLazyDrag.prototype.ngOnDestroy.call(this); super.ngOnDestroy(); }
    /* CdkLazyDrag end */
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        CdkLazyDrag.prototype.ngAfterViewInit.call(this);
        super.ngAfterViewInit();
        this._dragRef.beforeStarted.subscribe((/**
         * @return {?}
         */
        () => {
            const { cdkDropList } = this;
            if (cdkDropList && cdkDropList.columnReorder && this._context.col.reorder) {
                // we don't allow a new dragging session before the previous ends.
                // this sound impossible, but due to animation transitions its actually is.
                // if the `transitionend` is long enough, a new drag can start...
                //
                // the `disabled` state is checked by pointerDown AFTER calling before start so we can cancel the start...
                if (cdkDropList._dropListRef.isDragging()) {
                    return this.disabled = true;
                }
            }
        }));
        this.started.subscribe((/**
         * @return {?}
         */
        () => this._context.col.columnDef.isDragging = true));
        this.ended.subscribe((/**
         * @return {?}
         */
        () => this._context.col.columnDef.isDragging = false));
    }
    /**
     * @return {?}
     */
    getCells() {
        if (!this.cache) {
            this.cache = this._context.col.columnDef.queryCellElements('table');
        }
        return this.cache;
    }
    /**
     * @return {?}
     */
    reset() {
        super.reset();
        if (this.cache) {
            for (const el of this.cache) {
                el.style.transform = ``;
            }
            this.cache = undefined;
        }
    }
}
PblNgridColumnDragDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblNgridColumnDrag]',
                exportAs: 'pblNgridColumnDrag',
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    'class': 'cdk-drag',
                    '[class.cdk-drag-dragging]': '_dragRef.isDragging()',
                },
                providers: [
                    { provide: CdkDrag, useExisting: PblNgridColumnDragDirective }
                ]
            },] }
];
/** @nocollapse */
PblNgridColumnDragDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: CdkDropList, decorators: [{ type: Inject, args: [CDK_DROP_LIST,] }, { type: Optional }, { type: SkipSelf }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgZone },
    { type: ViewContainerRef },
    { type: undefined, decorators: [{ type: Inject, args: [CDK_DRAG_CONFIG,] }] },
    { type: Directionality },
    { type: DragDrop },
    { type: ChangeDetectorRef },
    { type: ViewportRuler, decorators: [{ type: Optional }] },
    { type: DragDropRegistry, decorators: [{ type: Optional }] }
];
PblNgridColumnDragDirective.propDecorators = {
    context: [{ type: Input, args: ['pblNgridColumnDrag',] }],
    rootElementSelectorClass: [{ type: Input, args: ['cdkDragRootElementClass',] }],
    cdkDropList: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    PblNgridColumnDragDirective.prototype.rootElementSelector;
    /** @type {?} */
    PblNgridColumnDragDirective.prototype.column;
    /**
     * @type {?}
     * @private
     */
    PblNgridColumnDragDirective.prototype._context;
    /**
     * @type {?}
     * @private
     */
    PblNgridColumnDragDirective.prototype.pluginCtrl;
    /**
     * @type {?}
     * @private
     */
    PblNgridColumnDragDirective.prototype.cache;
    /** @type {?} */
    PblNgridColumnDragDirective.prototype._rootClass;
    /** @type {?} */
    PblNgridColumnDragDirective.prototype._hostNotRoot;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Code from angular/material2 repository
 * File: https://github.com/angular/material2/blob/master/src/cdk/drag-drop/drag-styling.ts
 * Commit: https://github.com/angular/material2/blob/9cd3132607b4d5ae242291df41fb02dc7a453da8/src/cdk/drag-drop/drag-styling.ts
 *
 * This code is not public but required for the drag so duplicated here.
 **/
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Extended CSSStyleDeclaration that includes a couple of drag-related
 * properties that aren't in the built-in TS typings.
 * @record
 */
function DragCSSStyleDeclaration() { }
if (false) {
    /** @type {?} */
    DragCSSStyleDeclaration.prototype.webkitUserDrag;
    /** @type {?} */
    DragCSSStyleDeclaration.prototype.MozUserSelect;
}
/**
 * Shallow-extends a stylesheet object with another stylesheet object.
 * \@docs-private
 * @param {?} dest
 * @param {?} source
 * @return {?}
 */
function extendStyles(dest, source) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            dest[(/** @type {?} */ (key))] = source[(/** @type {?} */ (key))];
        }
    }
    return dest;
}
/**
 * Toggles whether the native drag interactions should be enabled for an element.
 * \@docs-private
 * @param {?} element Element on which to toggle the drag interactions.
 * @param {?} enable Whether the drag interactions should be enabled.
 * @return {?}
 */
function toggleNativeDragInteractions(element, enable) {
    /** @type {?} */
    const userSelect = enable ? '' : 'none';
    extendStyles(element.style, {
        touchAction: enable ? '' : 'none',
        webkitUserDrag: enable ? '' : 'none',
        webkitTapHighlightColor: enable ? '' : 'transparent',
        userSelect: userSelect,
        msUserSelect: userSelect,
        webkitUserSelect: userSelect,
        MozUserSelect: userSelect
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function extendGrid$1() {
    PblColumn.extendProperty('resize');
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PLUGIN_KEY$2 = 'columnResize';
/**
 * Options that can be used to bind a passive event listener.
 * @type {?}
 */
const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });
/**
 * Options that can be used to bind an active event listener.
 * @type {?}
 */
const activeEventListenerOptions = normalizePassiveListenerOptions({ passive: false });
let PblNgridDragResizeComponent = class PblNgridDragResizeComponent {
    /**
     * @param {?} element
     * @param {?} _ngZone
     * @param {?} _viewportRuler
     * @param {?} _dragDropRegistry
     * @param {?} _config
     * @param {?} _dir
     */
    constructor(element, _ngZone, _viewportRuler, _dragDropRegistry, _config, _dir) {
        this.element = element;
        this._ngZone = _ngZone;
        this._viewportRuler = _viewportRuler;
        this._dragDropRegistry = _dragDropRegistry;
        this._config = _config;
        this._dir = _dir;
        /**
         * The area (in pixels) in which the handle can be grabbed and resize the cell.
         * Default: 6
         */
        this.grabAreaWidth = 6;
        this._pointerMoveSubscription = Subscription.EMPTY;
        this._pointerUpSubscription = Subscription.EMPTY;
        this._rootElementInitSubscription = Subscription.EMPTY;
        this._pointerDown = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this._initializeDragSequence(this._rootElement, event);
        });
        /**
         * Handler that is invoked when the user moves their pointer after they've initiated a drag.
         */
        this._pointerMove = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const pointerPosition = this._getPointerPositionOnPage(event);
            /** @type {?} */
            const distanceX = pointerPosition.x - this._pickupPositionOnPage.x;
            /** @type {?} */
            const distanceY = pointerPosition.y - this._pickupPositionOnPage.y;
            if (!this._hasStartedDragging) {
                // Only start dragging after the user has moved more than the minimum distance in either
                // direction. Note that this is preferable over doing something like `skip(minimumDistance)`
                // in the `pointerMove` subscription, because we're not guaranteed to have one move event
                // per pixel of movement (e.g. if the user moves their pointer quickly).
                if (Math.abs(distanceX) + Math.abs(distanceY) >= this._config.dragStartThreshold) {
                    this._hasStartedDragging = true;
                    // It will be a good thing if we turned of the header's resize observer to boost performance
                    // However, because we relay on the total table minimum width updates to relatively even out the columns it will not work.
                    // Group cells will not cover all of the children, when we enlarge the width of a child in the group.
                    // This is because the max-width of the group is set proportional to the total min-width of the inner table.
                    // For it to work we need to directly update the width of ALL OF THE GROUPS.
                    // this.column.columnDef.isDragging = true;
                    this.column.sizeInfo.updateSize();
                    this._lastWidth = this._initialWidth = this.column.columnDef.netWidth;
                    this.cache = this.column.columnDef.queryCellElements('table', 'header', 'footer');
                }
                return;
            }
            this._hasMoved = true;
            event.preventDefault();
            event.stopPropagation();
            /** @type {?} */
            let newWidth = Math.max(0, this._initialWidth + distanceX);
            if (newWidth > this.column.maxWidth) {
                newWidth = this.column.maxWidth;
            }
            else if (distanceX < 0 && newWidth < this.column.minWidth) {
                newWidth = this.column.minWidth;
            }
            if (this._lastWidth !== newWidth) {
                this._lastWidth = newWidth;
                this.column.width = newWidth + 'px';
                this.table.resetColumnsWidth();
                for (const el of this.cache) {
                    this.column.columnDef.applyWidth(el);
                }
                // the above will change the size of on column AND because we didn't disable the resize observer it will pop an event.
                // if there are groups it will fire table.resizeColumns(); which will recalculate the groups...
            }
        });
        /**
         * Handler that is invoked when the user lifts their pointer up, after initiating a drag.
         */
        this._pointerUp = (/**
         * @return {?}
         */
        () => {
            if (!this._isDragging()) {
                return;
            }
            this._removeSubscriptions();
            this._dragDropRegistry.stopDragging(this);
            if (!this._hasStartedDragging) {
                return;
            }
            // this.column.columnDef.isDragging = false;
            this.table.columnApi.resizeColumn(this.column, this._lastWidth + 'px');
            // cleanup
            this.cache = undefined;
        });
        _dragDropRegistry.registerDragItem(this);
    }
    // tslint:disable-next-line:no-input-rename
    /**
     * @param {?} value
     * @return {?}
     */
    set context(value) {
        if (value) {
            const { col, table } = value;
            if (col && col instanceof PblColumn) {
                this.column = col;
                this.table = table;
                return;
            }
        }
        this.column = this.table = undefined;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // We need to wait for the zone to stabilize, in order for the reference
        // element to be in the proper place in the DOM. This is mostly relevant
        // for draggable elements inside portals since they get stamped out in
        // their original DOM position and then they get transferred to the portal.
        this._rootElementInitSubscription = this._ngZone.onStable.asObservable().pipe(take(1)).subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const rootElement = this._rootElement = this._getRootElement();
            /** @type {?} */
            const cell = rootElement.parentElement;
            cell.classList.add('pbl-ngrid-column-resize');
            rootElement.addEventListener('mousedown', this._pointerDown, activeEventListenerOptions);
            rootElement.addEventListener('touchstart', this._pointerDown, passiveEventListenerOptions);
            toggleNativeDragInteractions(rootElement, false);
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._rootElement) {
            this._rootElement.removeEventListener('mousedown', this._pointerDown, activeEventListenerOptions);
            this._rootElement.removeEventListener('touchstart', this._pointerDown, passiveEventListenerOptions);
        }
        this._rootElementInitSubscription.unsubscribe();
        this._dragDropRegistry.removeDragItem(this);
        this._removeSubscriptions();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDoubleClick(event) {
        this.table.columnApi.autoSizeColumn(this.column);
    }
    /**
     * Sets up the different variables and subscriptions
     * that will be necessary for the dragging sequence.
     * @private
     * @param {?} referenceElement Element that started the drag sequence.
     * @param {?} event Browser event object that started the sequence.
     * @return {?}
     */
    _initializeDragSequence(referenceElement, event) {
        // Always stop propagation for the event that initializes
        // the dragging sequence, in order to prevent it from potentially
        // starting another sequence for a draggable parent somewhere up the DOM tree.
        event.stopPropagation();
        // Abort if the user is already dragging or is using a mouse button other than the primary one.
        if (this._isDragging() || (!this._isTouchEvent(event) && event.button !== 0)) {
            return;
        }
        this._hasStartedDragging = this._hasMoved = false;
        this._pointerMoveSubscription = this._dragDropRegistry.pointerMove
            .pipe(auditTime(0, animationFrameScheduler))
            .subscribe(this._pointerMove);
        this._pointerUpSubscription = this._dragDropRegistry.pointerUp.subscribe(this._pointerUp);
        this._scrollPosition = this._viewportRuler.getViewportScrollPosition();
        this._pickupPositionOnPage = this._getPointerPositionOnPage(event);
        this._dragDropRegistry.startDragging(this, event);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _getPointerPositionOnPage(event) {
        /** @type {?} */
        const point = this._isTouchEvent(event) ? event.touches[0] : event;
        return {
            x: point.pageX - this._scrollPosition.left,
            y: point.pageY - this._scrollPosition.top
        };
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _isTouchEvent(event) {
        return event.type.startsWith('touch');
    }
    /**
     * @return {?}
     */
    _isDragging() {
        return this._dragDropRegistry.isDragging(this);
    }
    /**
     * @private
     * @return {?}
     */
    _getRootElement() {
        return this.element.nativeElement;
    }
    /**
     * @private
     * @return {?}
     */
    _removeSubscriptions() {
        this._pointerMoveSubscription.unsubscribe();
        this._pointerUpSubscription.unsubscribe();
    }
};
PblNgridDragResizeComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-ngrid-drag-resize',
                // tslint:disable-line:component-selector
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    'class': 'pbl-ngrid-column-resizer',
                    '[style.width.px]': 'grabAreaWidth',
                },
                template: "<ng-content></ng-content>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".pbl-ngrid-column-resizer{position:absolute;right:0;height:100%;cursor:col-resize;z-index:50000}"]
            }] }
];
/** @nocollapse */
PblNgridDragResizeComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: ViewportRuler },
    { type: DragDropRegistry },
    { type: undefined, decorators: [{ type: Inject, args: [CDK_DRAG_CONFIG,] }] },
    { type: Directionality, decorators: [{ type: Optional }] }
];
PblNgridDragResizeComponent.propDecorators = {
    context: [{ type: Input }],
    grabAreaWidth: [{ type: Input }],
    onDoubleClick: [{ type: HostListener, args: ['dblclick', ['$event'],] }]
};
PblNgridDragResizeComponent = __decorate([
    TablePlugin({ id: PLUGIN_KEY$2, runOnce: extendGrid$1 }),
    __metadata("design:paramtypes", [ElementRef,
        NgZone,
        ViewportRuler,
        DragDropRegistry, Object, Directionality])
], PblNgridDragResizeComponent);
if (false) {
    /**
     * The area (in pixels) in which the handle can be grabbed and resize the cell.
     * Default: 6
     * @type {?}
     */
    PblNgridDragResizeComponent.prototype.grabAreaWidth;
    /** @type {?} */
    PblNgridDragResizeComponent.prototype.column;
    /** @type {?} */
    PblNgridDragResizeComponent.prototype.table;
    /** @type {?} */
    PblNgridDragResizeComponent.prototype._hasStartedDragging;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._hasMoved;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._rootElement;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._pointerMoveSubscription;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._pointerUpSubscription;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._scrollPosition;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._pickupPositionOnPage;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._initialWidth;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._lastWidth;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype.cache;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._rootElementInitSubscription;
    /** @type {?} */
    PblNgridDragResizeComponent.prototype._pointerDown;
    /**
     * Handler that is invoked when the user moves their pointer after they've initiated a drag.
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._pointerMove;
    /**
     * Handler that is invoked when the user lifts their pointer up, after initiating a drag.
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._pointerUp;
    /** @type {?} */
    PblNgridDragResizeComponent.prototype.element;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._viewportRuler;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._dragDropRegistry;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._config;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._dir;
}
/**
 * @record
 */
function Point() { }
if (false) {
    /** @type {?} */
    Point.prototype.x;
    /** @type {?} */
    Point.prototype.y;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Marks the element as the resizer template for cells.
 */
class PblNgridCellDraggerRefDirective extends PblNgridMultiTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        super(tRef, registry);
        this.name = 'cellDragger';
        this.kind = 'dataHeaderExtensions';
    }
    /**
     * @param {?} context
     * @return {?}
     */
    shouldRender(context) {
        // We dont check for `context.col.reorder` because even if a specific column does not "reorder" we still need to render the cdk-drag
        // so the cdk-drop-list will be aware of this item, so if another item does reorder it will be able to move while taking this element into consideration.
        // I.E: It doesn't reorder but it's part of the playground.
        //
        // However, when the plugin does not exists for this table we don't need to render...
        // We dont check for `context.col.reorder` because even if a specific column does not "reorder" we still need to render the cdk-drag
        // so the cdk-drop-list will be aware of this item, so if another item does reorder it will be able to move while taking this element into consideration.
        // I.E: It doesn't reorder but it's part of the playground.
        //
        // However, when the plugin does not exists for this table we don't need to render...
        /** @type {?} */
        const pluginCtrl = PblNgridPluginController.find(context.table);
        return pluginCtrl.hasPlugin(PLUGIN_KEY$1);
    }
}
PblNgridCellDraggerRefDirective.decorators = [
    { type: Directive, args: [{ selector: '[pblNgridCellDraggerRef]' },] }
];
/** @nocollapse */
PblNgridCellDraggerRefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
if (false) {
    /** @type {?} */
    PblNgridCellDraggerRefDirective.prototype.name;
    /** @type {?} */
    PblNgridCellDraggerRefDirective.prototype.kind;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let _uniqueIdCounter$2 = 0;
/**
 * @template T
 */
class PblNgridAggregationContainerDirective extends CdkDropList {
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
        this.id = `pbl-ngrid-column-aggregation-container-${_uniqueIdCounter$2++}`;
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Marks the element as the resizer template for cells.
 */
class PblNgridCellResizerRefDirective extends PblNgridMultiTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        super(tRef, registry);
        this.name = 'cellResizer';
        this.kind = 'dataHeaderExtensions';
    }
    /**
     * @param {?} context
     * @return {?}
     */
    shouldRender(context) {
        return !!context.col.resize;
    }
}
PblNgridCellResizerRefDirective.decorators = [
    { type: Directive, args: [{ selector: '[pblNgridCellResizerRef]' },] }
];
/** @nocollapse */
PblNgridCellResizerRefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
if (false) {
    /** @type {?} */
    PblNgridCellResizerRefDirective.prototype.name;
    /** @type {?} */
    PblNgridCellResizerRefDirective.prototype.kind;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DragPluginDefaultTemplatesComponent {
}
DragPluginDefaultTemplatesComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-drag-plugin-default-templates',
                template: `<pbl-ngrid-drag-resize *pblNgridCellResizerRef="let ctx" [context]="ctx"></pbl-ngrid-drag-resize>
<span *pblNgridCellDraggerRef="let ctx" [pblNgridColumnDrag]="ctx" cdkDragRootElementClass="cdk-drag"></span>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PblNgridDragModule {
    /**
     * @return {?}
     */
    static withDefaultTemplates() {
        return {
            ngModule: PblNgridDragModule,
            providers: provideCommon([{ component: DragPluginDefaultTemplatesComponent }]),
        };
    }
}
PblNgridDragModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    PblNgridModule,
                    DragDropModule
                ],
                declarations: [
                    DragPluginDefaultTemplatesComponent,
                    CdkLazyDropList, CdkLazyDrag, PblDragHandle,
                    PblNgridRowReorderPluginDirective, PblNgridRowDragDirective,
                    PblNgridColumnReorderPluginDirective, PblNgridColumnDragDirective, PblNgridCellDraggerRefDirective,
                    PblNgridAggregationContainerDirective,
                    PblNgridDragResizeComponent, PblNgridCellResizerRefDirective,
                ],
                exports: [
                    DragDropModule,
                    CdkLazyDropList, CdkLazyDrag, PblDragHandle,
                    PblNgridRowReorderPluginDirective, PblNgridRowDragDirective,
                    PblNgridColumnReorderPluginDirective, PblNgridColumnDragDirective, PblNgridCellDraggerRefDirective,
                    PblNgridAggregationContainerDirective,
                    PblNgridDragResizeComponent, PblNgridCellResizerRefDirective,
                ],
                providers: [
                    PblDragDrop,
                    { provide: DragDrop, useExisting: PblDragDrop },
                ],
                entryComponents: [DragPluginDefaultTemplatesComponent],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { CdkLazyDrag, CdkLazyDropList, PblDragHandle, PblNgridColumnDragDirective, PblNgridColumnReorderPluginDirective, PblNgridDragModule, PblNgridDragResizeComponent, PblNgridRowDragDirective, PblNgridRowReorderPluginDirective, PLUGIN_KEY$1 as ɵa, PLUGIN_KEY$2 as ɵb, extendGrid as ɵc, extendGrid$1 as ɵd, DragPluginDefaultTemplatesComponent as ɵe, PblNgridCellDraggerRefDirective as ɵf, PblNgridAggregationContainerDirective as ɵg, PblNgridCellResizerRefDirective as ɵh, PblDragDrop as ɵi };
//# sourceMappingURL=pebula-ngrid-drag.js.map
