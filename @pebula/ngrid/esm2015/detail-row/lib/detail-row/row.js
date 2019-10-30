import * as tslib_1 from "tslib";
var PblNgridDetailRowComponent_1;
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input, Inject, ElementRef, Optional, ViewEncapsulation, ViewContainerRef, } from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { CDK_ROW_TEMPLATE, CdkRow } from '@angular/cdk/table';
import { UnRx } from '@pebula/utils';
import { PblNgridPluginController, PblNgridRowComponent, EXT_API_TOKEN } from '@pebula/ngrid';
import { PLUGIN_KEY } from './detail-row-plugin';
let PblNgridDetailRowComponent = PblNgridDetailRowComponent_1 = class PblNgridDetailRowComponent extends PblNgridRowComponent {
    /**
     * @param {?} extApi
     * @param {?} el
     * @param {?} vcRef
     */
    constructor(extApi, el, vcRef) {
        super(extApi, el);
        this.vcRef = vcRef;
        this.opened = false;
    }
    /**
     * @return {?}
     */
    get expended() {
        return this.opened;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set row(value) { this.updateRow(); }
    /**
     * @private
     * @return {?}
     */
    get _element() { return this.el.nativeElement; }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const controller = PblNgridPluginController.find(this.extApi.table);
        this.plugin = controller.getPlugin(PLUGIN_KEY); // TODO: THROW IF NO PLUGIN...
        this.plugin.addDetailRow(this);
        /** @type {?} */
        const tradeEvents = controller.getPlugin('targetEvents');
        tradeEvents.cellClick
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.type === 'data' && event.row === this.context.$implicit) {
                const { excludeToggleFrom } = this.plugin;
                if (!excludeToggleFrom || !excludeToggleFrom.some((/**
                 * @param {?} c
                 * @return {?}
                 */
                c => event.column.id === c))) {
                    this.toggle();
                }
            }
        }));
        tradeEvents.rowClick
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (!event.root && event.type === 'data' && event.row === this.context.$implicit) {
                this.toggle();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.plugin.removeDetailRow(this);
    }
    /**
     * @return {?}
     */
    updateRow() {
        /** @type {?} */
        const prevIdentity = this.context && this.context.$implicit;
        super.updateRow();
        if (this.opened) {
            /** @type {?} */
            const currIdentity = this.context && this.context.$implicit;
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
    }
    /**
     * @param {?=} forceState
     * @return {?}
     */
    toggle(forceState) {
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
    }
    /**
     * \@internal
     * @param {?} event
     * @return {?}
     */
    handleKeydown(event) {
        if (event.target === this._element) {
            /** @type {?} */
            const keyCode = event.keyCode;
            /** @type {?} */
            const isToggleKey = keyCode === ENTER || keyCode === SPACE;
            if (isToggleKey) {
                event.preventDefault(); // prevents the page from scrolling down when pressing space
                this.toggle();
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    createEvent() {
        /** @type {?} */
        const event = Object.create(this);
        Object.defineProperty(event, 'row', { value: this.context.$implicit });
        return event;
    }
    /**
     * @private
     * @return {?}
     */
    render() {
        this.vcRef.clear();
        if (this.context.$implicit) {
            /** @type {?} */
            const detailRowDef = this.context.table.registry.getSingle('detailRow');
            if (detailRowDef) {
                this.vcRef.createEmbeddedView(detailRowDef.tRef, this.context);
            }
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
                    { provide: CdkRow, useExisting: PblNgridDetailRowComponent_1 }
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [`.pbl-row-detail-parent { position: relative; cursor: pointer; }`]
            }] }
];
/** @nocollapse */
PblNgridDetailRowComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [EXT_API_TOKEN,] }] },
    { type: ElementRef },
    { type: ViewContainerRef }
];
PblNgridDetailRowComponent.propDecorators = {
    row: [{ type: Input, args: ['detailRow',] }]
};
PblNgridDetailRowComponent = PblNgridDetailRowComponent_1 = tslib_1.__decorate([
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [Object, ElementRef,
        ViewContainerRef])
], PblNgridDetailRowComponent);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kZXRhaWwtcm93LyIsInNvdXJjZXMiOlsibGliL2RldGFpbC1yb3cvcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUVDLFFBQVEsRUFDbkIsaUJBQWlCLEVBQ2pCLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU5RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxvQkFBb0IsRUFBd0IsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBILE9BQU8sRUFBOEQsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7SUFvQmhHLDBCQUEwQix3Q0FBMUIsMEJBQTJCLFNBQVEsb0JBQW9COzs7Ozs7SUFZbEUsWUFBK0MsTUFBaUMsRUFDcEUsRUFBMkIsRUFDbkIsS0FBdUI7UUFDekMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQURBLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBTG5DLFdBQU0sR0FBRyxLQUFLLENBQUM7SUFPdkIsQ0FBQzs7OztJQWRELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELElBQXdCLEdBQUcsQ0FBQyxLQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFN0QsSUFBWSxRQUFRLEtBQWtCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMs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LElBQUssWUFBWSxFQUFHO2dCQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2hFO1NBQ0Y7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUFuSUEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLElBQUksRUFBRTs7b0JBQ0osS0FBSyxFQUFFLHFDQUFxQztvQkFDNUMsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsaUJBQWlCLEVBQUUsZ0JBQWdCO29CQUNuQyxXQUFXLEVBQUUsdUJBQXVCO2lCQUNyQztnQkFDRCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUUxQixTQUFTLEVBQUU7b0JBQ1QsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSw0QkFBMEIsRUFBRTtpQkFDN0Q7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO3lCQUwzQixpRUFBaUU7YUFNNUU7Ozs7NENBY2MsUUFBUSxZQUFJLE1BQU0sU0FBQyxhQUFhO1lBNUM3QyxVQUFVO1lBSVYsZ0JBQWdCOzs7a0JBa0NmLEtBQUssU0FBQyxXQUFXOztBQU5QLDBCQUEwQjtJQUR0QyxJQUFJLEVBQUU7cURBY1csVUFBVTtRQUNDLGdCQUFnQjtHQWRoQywwQkFBMEIsQ0FpSHRDO1NBakhZLDBCQUEwQjs7Ozs7O0lBU3JDLDRDQUF1Qjs7Ozs7SUFDdkIsNENBQXNEOzs7OztJQUkxQywyQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgSW5qZWN0LFxuICBFbGVtZW50UmVmLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSwgT3B0aW9uYWwsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVOVEVSLCBTUEFDRSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBDREtfUk9XX1RFTVBMQVRFLCBDZGtSb3cgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkUm93Q29tcG9uZW50LCBQYmxOZ3JpZEV4dGVuc2lvbkFwaSwgRVhUX0FQSV9UT0tFTiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZERldGFpbFJvd1BsdWdpbkRpcmVjdGl2ZSwgUGJsRGV0YWlsc1Jvd1RvZ2dsZUV2ZW50LCBQTFVHSU5fS0VZIH0gZnJvbSAnLi9kZXRhaWwtcm93LXBsdWdpbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1yb3dbZGV0YWlsUm93XScsXG4gIGV4cG9ydEFzOiAncGJsTmdyaWREZXRhaWxSb3cnLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgY2xhc3M6ICdwYmwtbmdyaWQtcm93IHBibC1yb3ctZGV0YWlsLXBhcmVudCcsXG4gICAgcm9sZTogJ3JvdycsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdncmlkPy5yb3dGb2N1cycsXG4gICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknXG4gIH0sXG4gIHRlbXBsYXRlOiBDREtfUk9XX1RFTVBMQVRFLFxuICBzdHlsZXM6IFsgYC5wYmwtcm93LWRldGFpbC1wYXJlbnQgeyBwb3NpdGlvbjogcmVsYXRpdmU7IGN1cnNvcjogcG9pbnRlcjsgfWAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDZGtSb3csIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCB9XG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCBleHRlbmRzIFBibE5ncmlkUm93Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIGdldCBleHBlbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vcGVuZWQ7XG4gIH1cblxuICBASW5wdXQoJ2RldGFpbFJvdycpIHNldCByb3codmFsdWU6IGFueSkgeyB0aGlzLnVwZGF0ZVJvdygpOyB9XG5cbiAgcHJpdmF0ZSBnZXQgX2VsZW1lbnQoKTogSFRNTEVsZW1lbnQgeyByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50OyB9XG4gIHByaXZhdGUgb3BlbmVkID0gZmFsc2U7XG4gIHByaXZhdGUgcGx1Z2luOiBQYmxOZ3JpZERldGFpbFJvd1BsdWdpbkRpcmVjdGl2ZTxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoRVhUX0FQSV9UT0tFTikgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxhbnk+LFxuICAgICAgICAgICAgICBlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBzdXBlcihleHRBcGksIGVsKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh0aGlzLmV4dEFwaS50YWJsZSk7XG4gICAgdGhpcy5wbHVnaW4gPSBjb250cm9sbGVyLmdldFBsdWdpbihQTFVHSU5fS0VZKTsgLy8gVE9ETzogVEhST1cgSUYgTk8gUExVR0lOLi4uXG4gICAgdGhpcy5wbHVnaW4uYWRkRGV0YWlsUm93KHRoaXMpO1xuICAgIGNvbnN0IHRyYWRlRXZlbnRzID0gY29udHJvbGxlci5nZXRQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xuICAgIHRyYWRlRXZlbnRzLmNlbGxDbGlja1xuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdkYXRhJyAmJiBldmVudC5yb3cgPT09IHRoaXMuY29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgICAgICBjb25zdCB7IGV4Y2x1ZGVUb2dnbGVGcm9tIH0gPSB0aGlzLnBsdWdpbjtcbiAgICAgICAgICBpZiAoIWV4Y2x1ZGVUb2dnbGVGcm9tIHx8ICFleGNsdWRlVG9nZ2xlRnJvbS5zb21lKCBjID0+IGV2ZW50LmNvbHVtbi5pZCA9PT0gYyApKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB0cmFkZUV2ZW50cy5yb3dDbGlja1xuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKCFldmVudC5yb290ICYmIGV2ZW50LnR5cGUgPT09ICdkYXRhJyAmJiBldmVudC5yb3cgPT09IHRoaXMuY29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucGx1Z2luLnJlbW92ZURldGFpbFJvdyh0aGlzKTtcbiAgfVxuXG4gIHVwZGF0ZVJvdygpOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2SWRlbnRpdHkgPSB0aGlzLmNvbnRleHQgJiYgdGhpcy5jb250ZXh0LiRpbXBsaWNpdDtcbiAgICBzdXBlci51cGRhdGVSb3coKTtcbiAgICBpZiAodGhpcy5vcGVuZWQpIHtcbiAgICAgIGNvbnN0IGN1cnJJZGVudGl0eSA9IHRoaXMuY29udGV4dCAmJiB0aGlzLmNvbnRleHQuJGltcGxpY2l0O1xuICAgICAgaWYgKGN1cnJJZGVudGl0eSAhPT0gcHJldklkZW50aXR5ICYmIGN1cnJJZGVudGl0eSkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucGx1Z2luLndoZW5Db250ZXh0Q2hhbmdlKSB7XG4gICAgICAgICAgY2FzZSAncmVuZGVyJzpcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Nsb3NlJzpcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKGZhbHNlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGx1Z2luLnRvZ2dsZWRSb3dDb250ZXh0Q2hhbmdlLm5leHQodGhpcy5jcmVhdGVFdmVudCgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b2dnbGUoZm9yY2VTdGF0ZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcGVuZWQgIT09IGZvcmNlU3RhdGUpIHtcbiAgICAgIGlmICggdGhpcy5vcGVuZWQgKSB7XG4gICAgICAgIHRoaXMudmNSZWYuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtcm93LWRldGFpbC1vcGVuZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICB9XG4gICAgICB0aGlzLm9wZW5lZCA9IHRoaXMudmNSZWYubGVuZ3RoID4gMDtcblxuICAgICAgaWYgKHRoaXMub3BlbmVkKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGJsLXJvdy1kZXRhaWwtb3BlbmVkJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucGx1Z2luLmRldGFpbFJvd1RvZ2dsZWQodGhpcy5jcmVhdGVFdmVudCgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCBldmVudC50YXJnZXQgPT09IHRoaXMuX2VsZW1lbnQgKSB7XG4gICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICAgIGNvbnN0IGlzVG9nZ2xlS2V5ID0ga2V5Q29kZSA9PT0gRU5URVIgfHwga2V5Q29kZSA9PT0gU1BBQ0U7XG4gICAgICBpZiAoIGlzVG9nZ2xlS2V5ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50cyB0aGUgcGFnZSBmcm9tIHNjcm9sbGluZyBkb3duIHdoZW4gcHJlc3Npbmcgc3BhY2VcbiAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUV2ZW50KCk6IFBibERldGFpbHNSb3dUb2dnbGVFdmVudDxhbnk+IHtcbiAgICBjb25zdCBldmVudCA9IE9iamVjdC5jcmVhdGUodGhpcyk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAncm93JywgeyB2YWx1ZTogdGhpcy5jb250ZXh0LiRpbXBsaWNpdCB9KTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcbiAgICB0aGlzLnZjUmVmLmNsZWFyKCk7XG4gICAgaWYgKHRoaXMuY29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgIGNvbnN0IGRldGFpbFJvd0RlZiA9IHRoaXMuY29udGV4dC50YWJsZS5yZWdpc3RyeS5nZXRTaW5nbGUoJ2RldGFpbFJvdycpO1xuICAgICAgaWYgKCBkZXRhaWxSb3dEZWYgKSB7XG4gICAgICAgIHRoaXMudmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGRldGFpbFJvd0RlZi50UmVmLCB0aGlzLmNvbnRleHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19