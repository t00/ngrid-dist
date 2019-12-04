/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, Input, Inject, ElementRef, OnInit, OnDestroy, Optional, ViewEncapsulation, ViewContainerRef, } from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { CDK_ROW_TEMPLATE, CdkRow } from '@angular/cdk/table';
import { UnRx } from '@pebula/utils';
import { PblNgridPluginController, PblNgridRowComponent, EXT_API_TOKEN } from '@pebula/ngrid';
import { PLUGIN_KEY } from './detail-row-plugin';
var PblNgridDetailRowComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridDetailRowComponent, _super);
    function PblNgridDetailRowComponent(extApi, el, vcRef) {
        var _this = _super.call(this, extApi, el) || this;
        _this.vcRef = vcRef;
        _this.opened = false;
        return _this;
    }
    PblNgridDetailRowComponent_1 = PblNgridDetailRowComponent;
    Object.defineProperty(PblNgridDetailRowComponent.prototype, "expended", {
        get: /**
         * @return {?}
         */
        function () {
            return this.opened;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridDetailRowComponent.prototype, "row", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.updateRow(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridDetailRowComponent.prototype, "_element", {
        get: /**
         * @private
         * @return {?}
         */
        function () { return this.el.nativeElement; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblNgridDetailRowComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var controller = PblNgridPluginController.find(this.extApi.grid);
        this.plugin = controller.getPlugin(PLUGIN_KEY); // TODO: THROW IF NO PLUGIN...
        this.plugin.addDetailRow(this);
        /** @type {?} */
        var tradeEvents = controller.getPlugin('targetEvents');
        tradeEvents.cellClick
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.type === 'data' && event.row === _this.context.$implicit) {
                var excludeToggleFrom = _this.plugin.excludeToggleFrom;
                if (!excludeToggleFrom || !excludeToggleFrom.some((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return event.column.id === c; }))) {
                    _this.toggle();
                }
            }
        }));
        tradeEvents.rowClick
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (!event.root && event.type === 'data' && event.row === _this.context.$implicit) {
                _this.toggle();
            }
        }));
    };
    /**
     * @return {?}
     */
    PblNgridDetailRowComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.plugin.removeDetailRow(this);
    };
    /**
     * @return {?}
     */
    PblNgridDetailRowComponent.prototype.updateRow = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var prevIdentity = this.context && this.context.$implicit;
        _super.prototype.updateRow.call(this);
        if (this.opened) {
            /** @type {?} */
            var currIdentity = this.context && this.context.$implicit;
            if (currIdentity !== prevIdentity && currIdentity) {
                switch (this.plugin.whenContextChange) {
                    case 'render':
                        this.render();
                        break;
                    case 'close':
                        this.toggle(false);
                        break;
                }
                this.plugin.toggledRowContextChange.next(this.createEvent());
            }
        }
    };
    /**
     * @param {?=} forceState
     * @return {?}
     */
    PblNgridDetailRowComponent.prototype.toggle = /**
     * @param {?=} forceState
     * @return {?}
     */
    function (forceState) {
        if (this.opened !== forceState) {
            if (this.opened) {
                this.vcRef.clear();
                this._element.classList.remove('pbl-row-detail-opened');
            }
            else {
                this.render();
            }
            this.opened = this.vcRef.length > 0;
            if (this.opened) {
                this._element.classList.add('pbl-row-detail-opened');
            }
            this.plugin.detailRowToggled(this.createEvent());
        }
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @param {?} event
     * @return {?}
     */
    PblNgridDetailRowComponent.prototype.handleKeydown = /**
     * \@internal
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.target === this._element) {
            /** @type {?} */
            var keyCode = event.keyCode;
            /** @type {?} */
            var isToggleKey = keyCode === ENTER || keyCode === SPACE;
            if (isToggleKey) {
                event.preventDefault(); // prevents the page from scrolling down when pressing space
                this.toggle();
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridDetailRowComponent.prototype.createEvent = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var event = Object.create(this);
        Object.defineProperty(event, 'row', { value: this.context.$implicit });
        return event;
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridDetailRowComponent.prototype.render = /**
     * @private
     * @return {?}
     */
    function () {
        this.vcRef.clear();
        if (this.context.$implicit) {
            /** @type {?} */
            var detailRowDef = this.context.grid.registry.getSingle('detailRow');
            if (detailRowDef) {
                this.vcRef.createEmbeddedView(detailRowDef.tRef, this.context);
            }
        }
    };
    var PblNgridDetailRowComponent_1;
    PblNgridDetailRowComponent.ctorParameters = function () { return [
        { type: undefined },
        { type: ElementRef },
        { type: ViewContainerRef }
    ]; };
    PblNgridDetailRowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pbl-ngrid-row[detailRow]',
                    exportAs: 'pblNgridDetailRow',
                    host: {
                        // tslint:disable-line:use-host-property-decorator
                        class: 'pbl-ngrid-row pbl-row-detail-parent',
                        role: 'row',
                        '[attr.tabindex]': 'grid?.rowFocus',
                        '(keydown)': 'handleKeydown($event)'
                    },
                    template: CDK_ROW_TEMPLATE,
                    providers: [
                        { provide: CdkRow, useExisting: PblNgridDetailRowComponent_1 }
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".pbl-row-detail-parent { position: relative; cursor: pointer; }"]
                }] }
    ];
    /** @nocollapse */
    PblNgridDetailRowComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [EXT_API_TOKEN,] }] },
        { type: ElementRef },
        { type: ViewContainerRef }
    ]; };
    PblNgridDetailRowComponent.propDecorators = {
        row: [{ type: Input, args: ['detailRow',] }]
    };
    PblNgridDetailRowComponent = PblNgridDetailRowComponent_1 = tslib_1.__decorate([
        UnRx(),
        tslib_1.__metadata("design:paramtypes", [Object, ElementRef,
            ViewContainerRef])
    ], PblNgridDetailRowComponent);
    return PblNgridDetailRowComponent;
}(PblNgridRowComponent));
export { PblNgridDetailRowComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowComponent.prototype.opened;
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowComponent.prototype.plugin;
    /**
     * @type {?}
     * @private
     */
    PblNgridDetailRowComponent.prototype.vcRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kZXRhaWwtcm93LyIsInNvdXJjZXMiOlsibGliL2RldGFpbC1yb3cvcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsTUFBTSxFQUNOLFNBQVMsRUFBRSxRQUFRLEVBQ25CLGlCQUFpQixFQUNqQixnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFOUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsb0JBQW9CLEVBQXdCLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwSCxPQUFPLEVBQThELFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQW9CN0Qsc0RBQW9CO0lBWWxFLG9DQUErQyxNQUFpQyxFQUNwRSxFQUEyQixFQUNuQixLQUF1QjtRQUYzQyxZQUdFLGtCQUFNLE1BQU0sRUFBRSxFQUFFLENBQUMsU0FDbEI7UUFGbUIsV0FBSyxHQUFMLEtBQUssQ0FBa0I7UUFMbkMsWUFBTSxHQUFHLEtBQUssQ0FBQzs7SUFPdkIsQ0FBQzttQ0FoQlUsMEJBQTBCO0lBRXJDLHNCQUFJLGdEQUFROzs7O1FBQVo7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBd0IsMkNBQUc7Ozs7O1FBQTNCLFVBQTRCLEtBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUU3RCxzQkFBWSxnREFBUTs7Ozs7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c0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIEluamVjdCxcbiAgRWxlbWVudFJlZixcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksIE9wdGlvbmFsLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFTlRFUiwgU1BBQ0UgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgQ0RLX1JPV19URU1QTEFURSwgQ2RrUm93IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxOZ3JpZFJvd0NvbXBvbmVudCwgUGJsTmdyaWRFeHRlbnNpb25BcGksIEVYVF9BUElfVE9LRU4gfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuaW1wb3J0IHsgUGJsTmdyaWREZXRhaWxSb3dQbHVnaW5EaXJlY3RpdmUsIFBibERldGFpbHNSb3dUb2dnbGVFdmVudCwgUExVR0lOX0tFWSB9IGZyb20gJy4vZGV0YWlsLXJvdy1wbHVnaW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtcm93W2RldGFpbFJvd10nLFxuICBleHBvcnRBczogJ3BibE5ncmlkRGV0YWlsUm93JyxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgIGNsYXNzOiAncGJsLW5ncmlkLXJvdyBwYmwtcm93LWRldGFpbC1wYXJlbnQnLFxuICAgIHJvbGU6ICdyb3cnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnZ3JpZD8ucm93Rm9jdXMnLFxuICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJ1xuICB9LFxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcbiAgc3R5bGVzOiBbIGAucGJsLXJvdy1kZXRhaWwtcGFyZW50IHsgcG9zaXRpb246IHJlbGF0aXZlOyBjdXJzb3I6IHBvaW50ZXI7IH1gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogQ2RrUm93LCB1c2VFeGlzdGluZzogUGJsTmdyaWREZXRhaWxSb3dDb21wb25lbnQgfVxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWREZXRhaWxSb3dDb21wb25lbnQgZXh0ZW5kcyBQYmxOZ3JpZFJvd0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBnZXQgZXhwZW5kZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMub3BlbmVkO1xuICB9XG5cbiAgQElucHV0KCdkZXRhaWxSb3cnKSBzZXQgcm93KHZhbHVlOiBhbnkpIHsgdGhpcy51cGRhdGVSb3coKTsgfVxuXG4gIHByaXZhdGUgZ2V0IF9lbGVtZW50KCk6IEhUTUxFbGVtZW50IHsgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudDsgfVxuICBwcml2YXRlIG9wZW5lZCA9IGZhbHNlO1xuICBwcml2YXRlIHBsdWdpbjogUGJsTmdyaWREZXRhaWxSb3dQbHVnaW5EaXJlY3RpdmU8YW55PjtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KEVYVF9BUElfVE9LRU4pIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8YW55PixcbiAgICAgICAgICAgICAgZWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgc3VwZXIoZXh0QXBpLCBlbCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodGhpcy5leHRBcGkuZ3JpZCk7XG4gICAgdGhpcy5wbHVnaW4gPSBjb250cm9sbGVyLmdldFBsdWdpbihQTFVHSU5fS0VZKTsgLy8gVE9ETzogVEhST1cgSUYgTk8gUExVR0lOLi4uXG4gICAgdGhpcy5wbHVnaW4uYWRkRGV0YWlsUm93KHRoaXMpO1xuICAgIGNvbnN0IHRyYWRlRXZlbnRzID0gY29udHJvbGxlci5nZXRQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xuICAgIHRyYWRlRXZlbnRzLmNlbGxDbGlja1xuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdkYXRhJyAmJiBldmVudC5yb3cgPT09IHRoaXMuY29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgICAgICBjb25zdCB7IGV4Y2x1ZGVUb2dnbGVGcm9tIH0gPSB0aGlzLnBsdWdpbjtcbiAgICAgICAgICBpZiAoIWV4Y2x1ZGVUb2dnbGVGcm9tIHx8ICFleGNsdWRlVG9nZ2xlRnJvbS5zb21lKCBjID0+IGV2ZW50LmNvbHVtbi5pZCA9PT0gYyApKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB0cmFkZUV2ZW50cy5yb3dDbGlja1xuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKCFldmVudC5yb290ICYmIGV2ZW50LnR5cGUgPT09ICdkYXRhJyAmJiBldmVudC5yb3cgPT09IHRoaXMuY29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucGx1Z2luLnJlbW92ZURldGFpbFJvdyh0aGlzKTtcbiAgfVxuXG4gIHVwZGF0ZVJvdygpOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2SWRlbnRpdHkgPSB0aGlzLmNvbnRleHQgJiYgdGhpcy5jb250ZXh0LiRpbXBsaWNpdDtcbiAgICBzdXBlci51cGRhdGVSb3coKTtcbiAgICBpZiAodGhpcy5vcGVuZWQpIHtcbiAgICAgIGNvbnN0IGN1cnJJZGVudGl0eSA9IHRoaXMuY29udGV4dCAmJiB0aGlzLmNvbnRleHQuJGltcGxpY2l0O1xuICAgICAgaWYgKGN1cnJJZGVudGl0eSAhPT0gcHJldklkZW50aXR5ICYmIGN1cnJJZGVudGl0eSkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucGx1Z2luLndoZW5Db250ZXh0Q2hhbmdlKSB7XG4gICAgICAgICAgY2FzZSAncmVuZGVyJzpcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Nsb3NlJzpcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKGZhbHNlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGx1Z2luLnRvZ2dsZWRSb3dDb250ZXh0Q2hhbmdlLm5leHQodGhpcy5jcmVhdGVFdmVudCgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b2dnbGUoZm9yY2VTdGF0ZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcGVuZWQgIT09IGZvcmNlU3RhdGUpIHtcbiAgICAgIGlmICggdGhpcy5vcGVuZWQgKSB7XG4gICAgICAgIHRoaXMudmNSZWYuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtcm93LWRldGFpbC1vcGVuZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICB9XG4gICAgICB0aGlzLm9wZW5lZCA9IHRoaXMudmNSZWYubGVuZ3RoID4gMDtcblxuICAgICAgaWYgKHRoaXMub3BlbmVkKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGJsLXJvdy1kZXRhaWwtb3BlbmVkJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucGx1Z2luLmRldGFpbFJvd1RvZ2dsZWQodGhpcy5jcmVhdGVFdmVudCgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCBldmVudC50YXJnZXQgPT09IHRoaXMuX2VsZW1lbnQgKSB7XG4gICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICAgIGNvbnN0IGlzVG9nZ2xlS2V5ID0ga2V5Q29kZSA9PT0gRU5URVIgfHwga2V5Q29kZSA9PT0gU1BBQ0U7XG4gICAgICBpZiAoIGlzVG9nZ2xlS2V5ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50cyB0aGUgcGFnZSBmcm9tIHNjcm9sbGluZyBkb3duIHdoZW4gcHJlc3Npbmcgc3BhY2VcbiAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUV2ZW50KCk6IFBibERldGFpbHNSb3dUb2dnbGVFdmVudDxhbnk+IHtcbiAgICBjb25zdCBldmVudCA9IE9iamVjdC5jcmVhdGUodGhpcyk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAncm93JywgeyB2YWx1ZTogdGhpcy5jb250ZXh0LiRpbXBsaWNpdCB9KTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcbiAgICB0aGlzLnZjUmVmLmNsZWFyKCk7XG4gICAgaWYgKHRoaXMuY29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgIGNvbnN0IGRldGFpbFJvd0RlZiA9IHRoaXMuY29udGV4dC5ncmlkLnJlZ2lzdHJ5LmdldFNpbmdsZSgnZGV0YWlsUm93Jyk7XG4gICAgICBpZiAoIGRldGFpbFJvd0RlZiApIHtcbiAgICAgICAgdGhpcy52Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcoZGV0YWlsUm93RGVmLnRSZWYsIHRoaXMuY29udGV4dCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=