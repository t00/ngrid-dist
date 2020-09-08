/**
 * @fileoverview added by tsickle
 * Generated from: lib/detail-row/row.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { ChangeDetectionStrategy, Component, Input, Inject, ElementRef, Optional, ViewEncapsulation, ViewContainerRef, } from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { CDK_ROW_TEMPLATE, CdkRow } from '@angular/cdk/table';
import { PblNgridPluginController, PblNgridRowComponent, EXT_API_TOKEN, utils } from '@pebula/ngrid';
import { PLUGIN_KEY } from './detail-row-plugin';
var PblNgridDetailRowComponent = /** @class */ (function (_super) {
    __extends(PblNgridDetailRowComponent, _super);
    function PblNgridDetailRowComponent(extApi, el, vcRef) {
        var _this = _super.call(this, extApi, el) || this;
        _this.vcRef = vcRef;
        _this.opened = false;
        return _this;
    }
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
            .pipe(utils.unrx(this))
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
            .pipe(utils.unrx(this))
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
        utils.unrx.kill(this);
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
                        { provide: CdkRow, useExisting: PblNgridDetailRowComponent }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kZXRhaWwtcm93LyIsInNvdXJjZXMiOlsibGliL2RldGFpbC1yb3cvcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUVDLFFBQVEsRUFDbkIsaUJBQWlCLEVBQ2pCLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU5RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsb0JBQW9CLEVBQXdCLGFBQWEsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0gsT0FBTyxFQUE4RCxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU3RztJQWlCZ0QsOENBQW9CO0lBWWxFLG9DQUErQyxNQUFpQyxFQUNwRSxFQUEyQixFQUNuQixLQUF1QjtRQUYzQyxZQUdFLGtCQUFNLE1BQU0sRUFBRSxFQUFFLENBQUMsU0FDbEI7UUFGbUIsV0FBSyxHQUFMLEtBQUssQ0FBa0I7UUFMbkMsWUFBTSxHQUFHLEtBQUssQ0FBQzs7SUFPdkIsQ0FBQztJQWRELHNCQUFJLGdEQUFROzs7O1FBQVo7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBd0IsMkNBQUc7Ozs7O1FBQTNCLFVBQTRCLEtBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUU3RCxzQkFBWSxnREFBUTs7Ozs7UUFBcEIsY0FBc0MsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7OztP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Q25CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7O2dCQUNwQixZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDdEUsSUFBSyxZQUFZLEVBQUc7Z0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDaEU7U0FDRjtJQUNILENBQUM7O2dCQWxJRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsSUFBSSxFQUFFOzt3QkFDSixLQUFLLEVBQUUscUNBQXFDO3dCQUM1QyxJQUFJLEVBQUUsS0FBSzt3QkFDWCxpQkFBaUIsRUFBRSxnQkFBZ0I7d0JBQ25DLFdBQVcsRUFBRSx1QkFBdUI7cUJBQ3JDO29CQUNELFFBQVEsRUFBRSxnQkFBZ0I7b0JBRTFCLFNBQVMsRUFBRTt3QkFDVCxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLDBCQUEwQixFQUFFO3FCQUM3RDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7NkJBTDNCLGlFQUFpRTtpQkFNNUU7Ozs7Z0RBYWMsUUFBUSxZQUFJLE1BQU0sU0FBQyxhQUFhO2dCQTFDN0MsVUFBVTtnQkFJVixnQkFBZ0I7OztzQkFnQ2YsS0FBSyxTQUFDLFdBQVc7O0lBNEdwQixpQ0FBQztDQUFBLEFBbklELENBaUJnRCxvQkFBb0IsR0FrSG5FO1NBbEhZLDBCQUEwQjs7Ozs7O0lBU3JDLDRDQUF1Qjs7Ozs7SUFDdkIsNENBQXNEOzs7OztJQUkxQywyQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgSW5qZWN0LFxuICBFbGVtZW50UmVmLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSwgT3B0aW9uYWwsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVOVEVSLCBTUEFDRSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBDREtfUk9XX1RFTVBMQVRFLCBDZGtSb3cgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkUm93Q29tcG9uZW50LCBQYmxOZ3JpZEV4dGVuc2lvbkFwaSwgRVhUX0FQSV9UT0tFTiwgdXRpbHMgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuaW1wb3J0IHsgUGJsTmdyaWREZXRhaWxSb3dQbHVnaW5EaXJlY3RpdmUsIFBibERldGFpbHNSb3dUb2dnbGVFdmVudCwgUExVR0lOX0tFWSB9IGZyb20gJy4vZGV0YWlsLXJvdy1wbHVnaW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtcm93W2RldGFpbFJvd10nLFxuICBleHBvcnRBczogJ3BibE5ncmlkRGV0YWlsUm93JyxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgIGNsYXNzOiAncGJsLW5ncmlkLXJvdyBwYmwtcm93LWRldGFpbC1wYXJlbnQnLFxuICAgIHJvbGU6ICdyb3cnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnZ3JpZD8ucm93Rm9jdXMnLFxuICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJ1xuICB9LFxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcbiAgc3R5bGVzOiBbIGAucGJsLXJvdy1kZXRhaWwtcGFyZW50IHsgcG9zaXRpb246IHJlbGF0aXZlOyBjdXJzb3I6IHBvaW50ZXI7IH1gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogQ2RrUm93LCB1c2VFeGlzdGluZzogUGJsTmdyaWREZXRhaWxSb3dDb21wb25lbnQgfVxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWREZXRhaWxSb3dDb21wb25lbnQgZXh0ZW5kcyBQYmxOZ3JpZFJvd0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBnZXQgZXhwZW5kZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMub3BlbmVkO1xuICB9XG5cbiAgQElucHV0KCdkZXRhaWxSb3cnKSBzZXQgcm93KHZhbHVlOiBhbnkpIHsgdGhpcy51cGRhdGVSb3coKTsgfVxuXG4gIHByaXZhdGUgZ2V0IF9lbGVtZW50KCk6IEhUTUxFbGVtZW50IHsgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudDsgfVxuICBwcml2YXRlIG9wZW5lZCA9IGZhbHNlO1xuICBwcml2YXRlIHBsdWdpbjogUGJsTmdyaWREZXRhaWxSb3dQbHVnaW5EaXJlY3RpdmU8YW55PjtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KEVYVF9BUElfVE9LRU4pIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8YW55PixcbiAgICAgICAgICAgICAgZWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgc3VwZXIoZXh0QXBpLCBlbCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodGhpcy5leHRBcGkuZ3JpZCk7XG4gICAgdGhpcy5wbHVnaW4gPSBjb250cm9sbGVyLmdldFBsdWdpbihQTFVHSU5fS0VZKTsgLy8gVE9ETzogVEhST1cgSUYgTk8gUExVR0lOLi4uXG4gICAgdGhpcy5wbHVnaW4uYWRkRGV0YWlsUm93KHRoaXMpO1xuICAgIGNvbnN0IHRyYWRlRXZlbnRzID0gY29udHJvbGxlci5nZXRQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xuICAgIHRyYWRlRXZlbnRzLmNlbGxDbGlja1xuICAgICAgLnBpcGUodXRpbHMudW5yeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdkYXRhJyAmJiBldmVudC5yb3cgPT09IHRoaXMuY29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgICAgICBjb25zdCB7IGV4Y2x1ZGVUb2dnbGVGcm9tIH0gPSB0aGlzLnBsdWdpbjtcbiAgICAgICAgICBpZiAoIWV4Y2x1ZGVUb2dnbGVGcm9tIHx8ICFleGNsdWRlVG9nZ2xlRnJvbS5zb21lKCBjID0+IGV2ZW50LmNvbHVtbi5pZCA9PT0gYyApKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB0cmFkZUV2ZW50cy5yb3dDbGlja1xuICAgICAgLnBpcGUodXRpbHMudW5yeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKCFldmVudC5yb290ICYmIGV2ZW50LnR5cGUgPT09ICdkYXRhJyAmJiBldmVudC5yb3cgPT09IHRoaXMuY29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHV0aWxzLnVucngua2lsbCh0aGlzKTtcbiAgICB0aGlzLnBsdWdpbi5yZW1vdmVEZXRhaWxSb3codGhpcyk7XG4gIH1cblxuICB1cGRhdGVSb3coKTogdm9pZCB7XG4gICAgY29uc3QgcHJldklkZW50aXR5ID0gdGhpcy5jb250ZXh0ICYmIHRoaXMuY29udGV4dC4kaW1wbGljaXQ7XG4gICAgc3VwZXIudXBkYXRlUm93KCk7XG4gICAgaWYgKHRoaXMub3BlbmVkKSB7XG4gICAgICBjb25zdCBjdXJySWRlbnRpdHkgPSB0aGlzLmNvbnRleHQgJiYgdGhpcy5jb250ZXh0LiRpbXBsaWNpdDtcbiAgICAgIGlmIChjdXJySWRlbnRpdHkgIT09IHByZXZJZGVudGl0eSAmJiBjdXJySWRlbnRpdHkpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnBsdWdpbi53aGVuQ29udGV4dENoYW5nZSkge1xuICAgICAgICAgIGNhc2UgJ3JlbmRlcic6XG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjbG9zZSc6XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZShmYWxzZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBsdWdpbi50b2dnbGVkUm93Q29udGV4dENoYW5nZS5uZXh0KHRoaXMuY3JlYXRlRXZlbnQoKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlKGZvcmNlU3RhdGU/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3BlbmVkICE9PSBmb3JjZVN0YXRlKSB7XG4gICAgICBpZiAoIHRoaXMub3BlbmVkICkge1xuICAgICAgICB0aGlzLnZjUmVmLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgncGJsLXJvdy1kZXRhaWwtb3BlbmVkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgfVxuICAgICAgdGhpcy5vcGVuZWQgPSB0aGlzLnZjUmVmLmxlbmd0aCA+IDA7XG5cbiAgICAgIGlmICh0aGlzLm9wZW5lZCkge1xuICAgICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BibC1yb3ctZGV0YWlsLW9wZW5lZCcpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBsdWdpbi5kZXRhaWxSb3dUb2dnbGVkKHRoaXMuY3JlYXRlRXZlbnQoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICggZXZlbnQudGFyZ2V0ID09PSB0aGlzLl9lbGVtZW50ICkge1xuICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgICBjb25zdCBpc1RvZ2dsZUtleSA9IGtleUNvZGUgPT09IEVOVEVSIHx8IGtleUNvZGUgPT09IFNQQUNFO1xuICAgICAgaWYgKCBpc1RvZ2dsZUtleSApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudHMgdGhlIHBhZ2UgZnJvbSBzY3JvbGxpbmcgZG93biB3aGVuIHByZXNzaW5nIHNwYWNlXG4gICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVFdmVudCgpOiBQYmxEZXRhaWxzUm93VG9nZ2xlRXZlbnQ8YW55PiB7XG4gICAgY29uc3QgZXZlbnQgPSBPYmplY3QuY3JlYXRlKHRoaXMpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ3JvdycsIHsgdmFsdWU6IHRoaXMuY29udGV4dC4kaW1wbGljaXQgfSk7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXIoKTogdm9pZCB7XG4gICAgdGhpcy52Y1JlZi5jbGVhcigpO1xuICAgIGlmICh0aGlzLmNvbnRleHQuJGltcGxpY2l0KSB7XG4gICAgICBjb25zdCBkZXRhaWxSb3dEZWYgPSB0aGlzLmNvbnRleHQuZ3JpZC5yZWdpc3RyeS5nZXRTaW5nbGUoJ2RldGFpbFJvdycpO1xuICAgICAgaWYgKCBkZXRhaWxSb3dEZWYgKSB7XG4gICAgICAgIHRoaXMudmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGRldGFpbFJvd0RlZi50UmVmLCB0aGlzLmNvbnRleHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19