/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, Input, Inject, ElementRef, Optional, ViewEncapsulation, ViewContainerRef, } from '@angular/core';
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
        var controller = PblNgridPluginController.find(this.extApi.table);
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
            var detailRowDef = this.context.table.registry.getSingle('detailRow');
            if (detailRowDef) {
                this.vcRef.createEmbeddedView(detailRowDef.tRef, this.context);
            }
        }
    };
    var PblNgridDetailRowComponent_1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kZXRhaWwtcm93LyIsInNvdXJjZXMiOlsibGliL2RldGFpbC1yb3cvcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBRUMsUUFBUSxFQUNuQixpQkFBaUIsRUFDakIsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTlELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLG9CQUFvQixFQUF3QixhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFcEgsT0FBTyxFQUE4RCxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFvQjdELHNEQUFvQjtJQVlsRSxvQ0FBK0MsTUFBaUMsRUFDcEUsRUFBMkIsRUFDbkIsS0FBdUI7UUFGM0MsWUFHRSxrQkFBTSxNQUFNLEVBQUUsRUFBRSxDQUFDLFNBQ2xCO1FBRm1CLFdBQUssR0FBTCxLQUFLLENBQWtCO1FBTG5DLFlBQU0sR0FBRyxLQUFLLENBQUM7O0lBT3ZCLENBQUM7bUNBaEJVLDBCQUEwQjtJQUVyQyxzQkFBSSxnREFBUTs7OztRQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBRUQsc0JBQXdCLDJDQUFHOzs7OztRQUEzQixVQUE0QixLQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFN0Qsc0JBQVksZ0RBQVE7Ozs7O1FBQXBCLGNBQXNDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTs7OztJQVVyRSw2Q0FBUTs7O0lBQVI7UUFBQSxpQkF1QkM7O1lBdEJPLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDbkUsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsOEJBQThCO1FBQzlFLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDOztZQUN6QixXQUFXLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7UUFDeEQsV0FBVyxDQUFDLFNBQVM7YUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoQixTQUFTOzs7O1FBQUUsVUFBQSxLQUFLO1lBQ2YsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUN6RCxJQUFBLGtEQUFpQjtnQkFDekIsSUFBSSxDQUFDLGlCQUFpQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSTs7OztnQkFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBckIsQ0FBcUIsRUFBRSxFQUFFO29CQUMvRSxLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ2Y7YUFDRjtRQUNILENBQUMsRUFBQyxDQUFDO1FBRUwsV0FBVyxDQUFDLFFBQVE7YUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoQixTQUFTOzs7O1FBQUUsVUFBQSxLQUFLO1lBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtnQkFDaEYsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxnREFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7O0lBRUQsOENBQVM7OztJQUFUOztZQUNRLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUztRQUMzRCxpQkFBTSxTQUFTLFdBQUUsQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7O2dCQUNULFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUztZQUMzRCxJQUFJLFlBQVksS0FBSyxZQUFZLElBQUksWUFBWSxFQUFFO2dCQUNqRCxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUU7b0JBQ3JDLEtBQUssUUFBUTt3QkFDVCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ2hCLE1BQU07b0JBQ1IsS0FBSyxPQUFPO3dCQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ25CLE1BQU07aUJBQ1Q7Z0JBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7YUFDOUQ7U0FDRjtJQUNILENBQUM7Ozs7O0lBRUQsMkNBQU07Ozs7SUFBTixVQUFPLFVBQW9CO1FBQ3pCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUU7WUFDOUIsSUFBSyxJQUFJLENBQUMsTUFBTSxFQUFHO2dCQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQzthQUN6RDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZjtZQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBRXBDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQzthQUN0RDtZQUVELElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDbEQ7SUFDSCxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNILGtEQUFhOzs7OztJQUFiLFVBQWMsS0FBb0I7UUFDaEMsSUFBSyxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUc7O2dCQUM5QixPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU87O2dCQUN2QixXQUFXLEdBQUcsT0FBTyxLQUFLLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSztZQUMxRCxJQUFLLFdBQVcsRUFBRztnQkFDakIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsNERBQTREO2dCQUNwRixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxnREFBVzs7OztJQUFuQjs7WUFDUSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDakMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUN2RSxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7O0lBRU8sMkNBQU07Ozs7SUFBZDtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTs7Z0JBQ3BCLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUN2RSxJQUFLLFlBQVksRUFBRztnQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoRTtTQUNGO0lBQ0gsQ0FBQzs7O2dCQWxJRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsSUFBSSxFQUFFOzt3QkFDSixLQUFLLEVBQUUscUNBQXFDO3dCQUM1QyxJQUFJLEVBQUUsS0FBSzt3QkFDWCxpQkFBaUIsRUFBRSxnQkFBZ0I7d0JBQ25DLFdBQVcsRUFBRSx1QkFBdUI7cUJBQ3JDO29CQUNELFFBQVEsRUFBRSxnQkFBZ0I7b0JBRTFCLFNBQVMsRUFBRTt3QkFDVCxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLDRCQUEwQixFQUFFO3FCQUM3RDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7NkJBTDNCLGlFQUFpRTtpQkFNNUU7Ozs7Z0RBY2MsUUFBUSxZQUFJLE1BQU0sU0FBQyxhQUFhO2dCQTVDN0MsVUFBVTtnQkFJVixnQkFBZ0I7OztzQkFrQ2YsS0FBSyxTQUFDLFdBQVc7O0lBTlAsMEJBQTBCO1FBRHRDLElBQUksRUFBRTt5REFjVyxVQUFVO1lBQ0MsZ0JBQWdCO09BZGhDLDBCQUEwQixDQWlIdEM7SUFBRCxpQ0FBQztDQUFBLENBakgrQyxvQkFBb0IsR0FpSG5FO1NBakhZLDBCQUEwQjs7Ozs7O0lBU3JDLDRDQUF1Qjs7Ozs7SUFDdkIsNENBQXNEOzs7OztJQUkxQywyQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgSW5qZWN0LFxuICBFbGVtZW50UmVmLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSwgT3B0aW9uYWwsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVOVEVSLCBTUEFDRSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBDREtfUk9XX1RFTVBMQVRFLCBDZGtSb3cgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkUm93Q29tcG9uZW50LCBQYmxOZ3JpZEV4dGVuc2lvbkFwaSwgRVhUX0FQSV9UT0tFTiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZERldGFpbFJvd1BsdWdpbkRpcmVjdGl2ZSwgUGJsRGV0YWlsc1Jvd1RvZ2dsZUV2ZW50LCBQTFVHSU5fS0VZIH0gZnJvbSAnLi9kZXRhaWwtcm93LXBsdWdpbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1yb3dbZGV0YWlsUm93XScsXG4gIGV4cG9ydEFzOiAncGJsTmdyaWREZXRhaWxSb3cnLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgY2xhc3M6ICdwYmwtbmdyaWQtcm93IHBibC1yb3ctZGV0YWlsLXBhcmVudCcsXG4gICAgcm9sZTogJ3JvdycsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdncmlkPy5yb3dGb2N1cycsXG4gICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknXG4gIH0sXG4gIHRlbXBsYXRlOiBDREtfUk9XX1RFTVBMQVRFLFxuICBzdHlsZXM6IFsgYC5wYmwtcm93LWRldGFpbC1wYXJlbnQgeyBwb3NpdGlvbjogcmVsYXRpdmU7IGN1cnNvcjogcG9pbnRlcjsgfWAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDZGtSb3csIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCB9XG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCBleHRlbmRzIFBibE5ncmlkUm93Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIGdldCBleHBlbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vcGVuZWQ7XG4gIH1cblxuICBASW5wdXQoJ2RldGFpbFJvdycpIHNldCByb3codmFsdWU6IGFueSkgeyB0aGlzLnVwZGF0ZVJvdygpOyB9XG5cbiAgcHJpdmF0ZSBnZXQgX2VsZW1lbnQoKTogSFRNTEVsZW1lbnQgeyByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50OyB9XG4gIHByaXZhdGUgb3BlbmVkID0gZmFsc2U7XG4gIHByaXZhdGUgcGx1Z2luOiBQYmxOZ3JpZERldGFpbFJvd1BsdWdpbkRpcmVjdGl2ZTxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoRVhUX0FQSV9UT0tFTikgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxhbnk+LFxuICAgICAgICAgICAgICBlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBzdXBlcihleHRBcGksIGVsKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh0aGlzLmV4dEFwaS50YWJsZSk7XG4gICAgdGhpcy5wbHVnaW4gPSBjb250cm9sbGVyLmdldFBsdWdpbihQTFVHSU5fS0VZKTsgLy8gVE9ETzogVEhST1cgSUYgTk8gUExVR0lOLi4uXG4gICAgdGhpcy5wbHVnaW4uYWRkRGV0YWlsUm93KHRoaXMpO1xuICAgIGNvbnN0IHRyYWRlRXZlbnRzID0gY29udHJvbGxlci5nZXRQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xuICAgIHRyYWRlRXZlbnRzLmNlbGxDbGlja1xuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdkYXRhJyAmJiBldmVudC5yb3cgPT09IHRoaXMuY29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgICAgICBjb25zdCB7IGV4Y2x1ZGVUb2dnbGVGcm9tIH0gPSB0aGlzLnBsdWdpbjtcbiAgICAgICAgICBpZiAoIWV4Y2x1ZGVUb2dnbGVGcm9tIHx8ICFleGNsdWRlVG9nZ2xlRnJvbS5zb21lKCBjID0+IGV2ZW50LmNvbHVtbi5pZCA9PT0gYyApKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB0cmFkZUV2ZW50cy5yb3dDbGlja1xuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKCFldmVudC5yb290ICYmIGV2ZW50LnR5cGUgPT09ICdkYXRhJyAmJiBldmVudC5yb3cgPT09IHRoaXMuY29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucGx1Z2luLnJlbW92ZURldGFpbFJvdyh0aGlzKTtcbiAgfVxuXG4gIHVwZGF0ZVJvdygpOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2SWRlbnRpdHkgPSB0aGlzLmNvbnRleHQgJiYgdGhpcy5jb250ZXh0LiRpbXBsaWNpdDtcbiAgICBzdXBlci51cGRhdGVSb3coKTtcbiAgICBpZiAodGhpcy5vcGVuZWQpIHtcbiAgICAgIGNvbnN0IGN1cnJJZGVudGl0eSA9IHRoaXMuY29udGV4dCAmJiB0aGlzLmNvbnRleHQuJGltcGxpY2l0O1xuICAgICAgaWYgKGN1cnJJZGVudGl0eSAhPT0gcHJldklkZW50aXR5ICYmIGN1cnJJZGVudGl0eSkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucGx1Z2luLndoZW5Db250ZXh0Q2hhbmdlKSB7XG4gICAgICAgICAgY2FzZSAncmVuZGVyJzpcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Nsb3NlJzpcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKGZhbHNlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGx1Z2luLnRvZ2dsZWRSb3dDb250ZXh0Q2hhbmdlLm5leHQodGhpcy5jcmVhdGVFdmVudCgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b2dnbGUoZm9yY2VTdGF0ZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcGVuZWQgIT09IGZvcmNlU3RhdGUpIHtcbiAgICAgIGlmICggdGhpcy5vcGVuZWQgKSB7XG4gICAgICAgIHRoaXMudmNSZWYuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtcm93LWRldGFpbC1vcGVuZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICB9XG4gICAgICB0aGlzLm9wZW5lZCA9IHRoaXMudmNSZWYubGVuZ3RoID4gMDtcblxuICAgICAgaWYgKHRoaXMub3BlbmVkKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGJsLXJvdy1kZXRhaWwtb3BlbmVkJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucGx1Z2luLmRldGFpbFJvd1RvZ2dsZWQodGhpcy5jcmVhdGVFdmVudCgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCBldmVudC50YXJnZXQgPT09IHRoaXMuX2VsZW1lbnQgKSB7XG4gICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICAgIGNvbnN0IGlzVG9nZ2xlS2V5ID0ga2V5Q29kZSA9PT0gRU5URVIgfHwga2V5Q29kZSA9PT0gU1BBQ0U7XG4gICAgICBpZiAoIGlzVG9nZ2xlS2V5ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50cyB0aGUgcGFnZSBmcm9tIHNjcm9sbGluZyBkb3duIHdoZW4gcHJlc3Npbmcgc3BhY2VcbiAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUV2ZW50KCk6IFBibERldGFpbHNSb3dUb2dnbGVFdmVudDxhbnk+IHtcbiAgICBjb25zdCBldmVudCA9IE9iamVjdC5jcmVhdGUodGhpcyk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAncm93JywgeyB2YWx1ZTogdGhpcy5jb250ZXh0LiRpbXBsaWNpdCB9KTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcbiAgICB0aGlzLnZjUmVmLmNsZWFyKCk7XG4gICAgaWYgKHRoaXMuY29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgIGNvbnN0IGRldGFpbFJvd0RlZiA9IHRoaXMuY29udGV4dC50YWJsZS5yZWdpc3RyeS5nZXRTaW5nbGUoJ2RldGFpbFJvdycpO1xuICAgICAgaWYgKCBkZXRhaWxSb3dEZWYgKSB7XG4gICAgICAgIHRoaXMudmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGRldGFpbFJvd0RlZi50UmVmLCB0aGlzLmNvbnRleHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19