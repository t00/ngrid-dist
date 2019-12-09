import * as tslib_1 from "tslib";
var PblNgridDetailRowComponent_1;
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input, Inject, ElementRef, OnInit, OnDestroy, Optional, ViewEncapsulation, ViewContainerRef, } from '@angular/core';
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
PblNgridDetailRowComponent.ctorParameters = () => [
    { type: undefined },
    { type: ElementRef },
    { type: ViewContainerRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kZXRhaWwtcm93LyIsInNvdXJjZXMiOlsibGliL2RldGFpbC1yb3cvcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUNWLE1BQU0sRUFDTixTQUFTLEVBQUUsUUFBUSxFQUNuQixpQkFBaUIsRUFDakIsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTlELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLG9CQUFvQixFQUF3QixhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFcEgsT0FBTyxFQUE4RCxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztJQW9CaEcsMEJBQTBCLHdDQUExQiwwQkFBMkIsU0FBUSxvQkFBb0I7Ozs7OztJQVlsRSxZQUErQyxNQUFpQyxFQUNwRSxFQUEyQixFQUNuQixLQUF1QjtRQUN6QyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBREEsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFMbkMsV0FBTSxHQUFHLEtBQUssQ0FBQztJQU92QixDQUFDOzs7O0lBZEQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRUQsSUFBd0IsR0FBRyxDQUFDLEtBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7OztJQUU3RCxJQUFZLFFBQVEsS0FBa0IsT0FBTyxJQUFJLENBQUMs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Q0FBQyxXQUFXLENBQUM7WUFDdkUsSUFBSyxZQUFZLEVBQUc7Z0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDaEU7U0FDRjtJQUNILENBQUM7Q0FDRixDQUFBOzs7WUFwR2lCLFVBQVU7WUFDQyxnQkFBZ0I7OztZQWhDNUMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLElBQUksRUFBRTs7b0JBQ0osS0FBSyxFQUFFLHFDQUFxQztvQkFDNUMsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsaUJBQWlCLEVBQUUsZ0JBQWdCO29CQUNuQyxXQUFXLEVBQUUsdUJBQXVCO2lCQUNyQztnQkFDRCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUUxQixTQUFTLEVBQUU7b0JBQ1QsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSw0QkFBMEIsRUFBRTtpQkFDN0Q7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO3lCQUwzQixpRUFBaUU7YUFNNUU7Ozs7NENBY2MsUUFBUSxZQUFJLE1BQU0sU0FBQyxhQUFhO1lBNUM3QyxVQUFVO1lBSVYsZ0JBQWdCOzs7a0JBa0NmLEtBQUssU0FBQyxXQUFXOztBQU5QLDBCQUEwQjtJQUR0QyxJQUFJLEVBQUU7cURBY1csVUFBVTtRQUNDLGdCQUFnQjtHQWRoQywwQkFBMEIsQ0FpSHRDO1NBakhZLDBCQUEwQjs7Ozs7O0lBU3JDLDRDQUF1Qjs7Ozs7SUFDdkIsNENBQXNEOzs7OztJQUkxQywyQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgSW5qZWN0LFxuICBFbGVtZW50UmVmLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSwgT3B0aW9uYWwsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVOVEVSLCBTUEFDRSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBDREtfUk9XX1RFTVBMQVRFLCBDZGtSb3cgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkUm93Q29tcG9uZW50LCBQYmxOZ3JpZEV4dGVuc2lvbkFwaSwgRVhUX0FQSV9UT0tFTiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZERldGFpbFJvd1BsdWdpbkRpcmVjdGl2ZSwgUGJsRGV0YWlsc1Jvd1RvZ2dsZUV2ZW50LCBQTFVHSU5fS0VZIH0gZnJvbSAnLi9kZXRhaWwtcm93LXBsdWdpbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1yb3dbZGV0YWlsUm93XScsXG4gIGV4cG9ydEFzOiAncGJsTmdyaWREZXRhaWxSb3cnLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgY2xhc3M6ICdwYmwtbmdyaWQtcm93IHBibC1yb3ctZGV0YWlsLXBhcmVudCcsXG4gICAgcm9sZTogJ3JvdycsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdncmlkPy5yb3dGb2N1cycsXG4gICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknXG4gIH0sXG4gIHRlbXBsYXRlOiBDREtfUk9XX1RFTVBMQVRFLFxuICBzdHlsZXM6IFsgYC5wYmwtcm93LWRldGFpbC1wYXJlbnQgeyBwb3NpdGlvbjogcmVsYXRpdmU7IGN1cnNvcjogcG9pbnRlcjsgfWAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDZGtSb3csIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCB9XG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCBleHRlbmRzIFBibE5ncmlkUm93Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIGdldCBleHBlbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vcGVuZWQ7XG4gIH1cblxuICBASW5wdXQoJ2RldGFpbFJvdycpIHNldCByb3codmFsdWU6IGFueSkgeyB0aGlzLnVwZGF0ZVJvdygpOyB9XG5cbiAgcHJpdmF0ZSBnZXQgX2VsZW1lbnQoKTogSFRNTEVsZW1lbnQgeyByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50OyB9XG4gIHByaXZhdGUgb3BlbmVkID0gZmFsc2U7XG4gIHByaXZhdGUgcGx1Z2luOiBQYmxOZ3JpZERldGFpbFJvd1BsdWdpbkRpcmVjdGl2ZTxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoRVhUX0FQSV9UT0tFTikgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxhbnk+LFxuICAgICAgICAgICAgICBlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBzdXBlcihleHRBcGksIGVsKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh0aGlzLmV4dEFwaS50YWJsZSk7XG4gICAgdGhpcy5wbHVnaW4gPSBjb250cm9sbGVyLmdldFBsdWdpbihQTFVHSU5fS0VZKTsgLy8gVE9ETzogVEhST1cgSUYgTk8gUExVR0lOLi4uXG4gICAgdGhpcy5wbHVnaW4uYWRkRGV0YWlsUm93KHRoaXMpO1xuICAgIGNvbnN0IHRyYWRlRXZlbnRzID0gY29udHJvbGxlci5nZXRQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xuICAgIHRyYWRlRXZlbnRzLmNlbGxDbGlja1xuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdkYXRhJyAmJiBldmVudC5yb3cgPT09IHRoaXMuY29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgICAgICBjb25zdCB7IGV4Y2x1ZGVUb2dnbGVGcm9tIH0gPSB0aGlzLnBsdWdpbjtcbiAgICAgICAgICBpZiAoIWV4Y2x1ZGVUb2dnbGVGcm9tIHx8ICFleGNsdWRlVG9nZ2xlRnJvbS5zb21lKCBjID0+IGV2ZW50LmNvbHVtbi5pZCA9PT0gYyApKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB0cmFkZUV2ZW50cy5yb3dDbGlja1xuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKCFldmVudC5yb290ICYmIGV2ZW50LnR5cGUgPT09ICdkYXRhJyAmJiBldmVudC5yb3cgPT09IHRoaXMuY29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucGx1Z2luLnJlbW92ZURldGFpbFJvdyh0aGlzKTtcbiAgfVxuXG4gIHVwZGF0ZVJvdygpOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2SWRlbnRpdHkgPSB0aGlzLmNvbnRleHQgJiYgdGhpcy5jb250ZXh0LiRpbXBsaWNpdDtcbiAgICBzdXBlci51cGRhdGVSb3coKTtcbiAgICBpZiAodGhpcy5vcGVuZWQpIHtcbiAgICAgIGNvbnN0IGN1cnJJZGVudGl0eSA9IHRoaXMuY29udGV4dCAmJiB0aGlzLmNvbnRleHQuJGltcGxpY2l0O1xuICAgICAgaWYgKGN1cnJJZGVudGl0eSAhPT0gcHJldklkZW50aXR5ICYmIGN1cnJJZGVudGl0eSkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucGx1Z2luLndoZW5Db250ZXh0Q2hhbmdlKSB7XG4gICAgICAgICAgY2FzZSAncmVuZGVyJzpcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Nsb3NlJzpcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKGZhbHNlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGx1Z2luLnRvZ2dsZWRSb3dDb250ZXh0Q2hhbmdlLm5leHQodGhpcy5jcmVhdGVFdmVudCgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b2dnbGUoZm9yY2VTdGF0ZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcGVuZWQgIT09IGZvcmNlU3RhdGUpIHtcbiAgICAgIGlmICggdGhpcy5vcGVuZWQgKSB7XG4gICAgICAgIHRoaXMudmNSZWYuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtcm93LWRldGFpbC1vcGVuZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICB9XG4gICAgICB0aGlzLm9wZW5lZCA9IHRoaXMudmNSZWYubGVuZ3RoID4gMDtcblxuICAgICAgaWYgKHRoaXMub3BlbmVkKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGJsLXJvdy1kZXRhaWwtb3BlbmVkJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucGx1Z2luLmRldGFpbFJvd1RvZ2dsZWQodGhpcy5jcmVhdGVFdmVudCgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCBldmVudC50YXJnZXQgPT09IHRoaXMuX2VsZW1lbnQgKSB7XG4gICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICAgIGNvbnN0IGlzVG9nZ2xlS2V5ID0ga2V5Q29kZSA9PT0gRU5URVIgfHwga2V5Q29kZSA9PT0gU1BBQ0U7XG4gICAgICBpZiAoIGlzVG9nZ2xlS2V5ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50cyB0aGUgcGFnZSBmcm9tIHNjcm9sbGluZyBkb3duIHdoZW4gcHJlc3Npbmcgc3BhY2VcbiAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUV2ZW50KCk6IFBibERldGFpbHNSb3dUb2dnbGVFdmVudDxhbnk+IHtcbiAgICBjb25zdCBldmVudCA9IE9iamVjdC5jcmVhdGUodGhpcyk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAncm93JywgeyB2YWx1ZTogdGhpcy5jb250ZXh0LiRpbXBsaWNpdCB9KTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcbiAgICB0aGlzLnZjUmVmLmNsZWFyKCk7XG4gICAgaWYgKHRoaXMuY29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgIGNvbnN0IGRldGFpbFJvd0RlZiA9IHRoaXMuY29udGV4dC50YWJsZS5yZWdpc3RyeS5nZXRTaW5nbGUoJ2RldGFpbFJvdycpO1xuICAgICAgaWYgKCBkZXRhaWxSb3dEZWYgKSB7XG4gICAgICAgIHRoaXMudmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGRldGFpbFJvd0RlZi50UmVmLCB0aGlzLmNvbnRleHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19