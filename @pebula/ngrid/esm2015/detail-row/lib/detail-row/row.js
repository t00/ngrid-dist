/**
 * @fileoverview added by tsickle
 * Generated from: lib/detail-row/row.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input, Inject, ElementRef, Optional, ViewEncapsulation, ViewContainerRef, } from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { CDK_ROW_TEMPLATE, CdkRow } from '@angular/cdk/table';
import { PblNgridPluginController, PblNgridRowComponent, EXT_API_TOKEN, utils } from '@pebula/ngrid';
import { PLUGIN_KEY } from './detail-row-plugin';
export class PblNgridDetailRowComponent extends PblNgridRowComponent {
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
        const controller = PblNgridPluginController.find(this.extApi.grid);
        this.plugin = controller.getPlugin(PLUGIN_KEY); // TODO: THROW IF NO PLUGIN...
        this.plugin.addDetailRow(this);
        /** @type {?} */
        const tradeEvents = controller.getPlugin('targetEvents');
        tradeEvents.cellClick
            .pipe(utils.unrx(this))
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
            .pipe(utils.unrx(this))
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
        utils.unrx.kill(this);
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
            const detailRowDef = this.context.grid.registry.getSingle('detailRow');
            if (detailRowDef) {
                this.vcRef.createEmbeddedView(detailRowDef.tRef, this.context);
            }
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kZXRhaWwtcm93LyIsInNvdXJjZXMiOlsibGliL2RldGFpbC1yb3cvcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBRUMsUUFBUSxFQUNuQixpQkFBaUIsRUFDakIsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTlELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxvQkFBb0IsRUFBd0IsYUFBYSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzSCxPQUFPLEVBQThELFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBbUI3RyxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsb0JBQW9COzs7Ozs7SUFZbEUsWUFBK0MsTUFBaUMsRUFDcEUsRUFBMkIsRUFDbkIsS0FBdUI7UUFDekMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQURBLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBTG5DLFdBQU0sR0FBRyxLQUFLLENBQUM7SUFPdkIsQ0FBQzs7OztJQWRELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELElBQXdCLEdBQUcsQ0FBQyxLQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFN0QsSUFBWSxRQUFRLEtBQWtCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzs7O0lBVXJFLFFBQVE7O2NBQ0EsVUFBVSxH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UUFBUSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDdEUsSUFBSyxZQUFZLEVBQUc7Z0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDaEU7U0FDRjtJQUNILENBQUM7OztZQWxJRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsSUFBSSxFQUFFOztvQkFDSixLQUFLLEVBQUUscUNBQXFDO29CQUM1QyxJQUFJLEVBQUUsS0FBSztvQkFDWCxpQkFBaUIsRUFBRSxnQkFBZ0I7b0JBQ25DLFdBQVcsRUFBRSx1QkFBdUI7aUJBQ3JDO2dCQUNELFFBQVEsRUFBRSxnQkFBZ0I7Z0JBRTFCLFNBQVMsRUFBRTtvQkFDVCxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLDBCQUEwQixFQUFFO2lCQUM3RDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7eUJBTDNCLGlFQUFpRTthQU01RTs7Ozs0Q0FhYyxRQUFRLFlBQUksTUFBTSxTQUFDLGFBQWE7WUExQzdDLFVBQVU7WUFJVixnQkFBZ0I7OztrQkFnQ2YsS0FBSyxTQUFDLFdBQVc7Ozs7Ozs7SUFHbEIsNENBQXVCOzs7OztJQUN2Qiw0Q0FBc0Q7Ozs7O0lBSTFDLDJDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBJbmplY3QsXG4gIEVsZW1lbnRSZWYsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LCBPcHRpb25hbCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRU5URVIsIFNQQUNFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IENES19ST1dfVEVNUExBVEUsIENka1JvdyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRSb3dDb21wb25lbnQsIFBibE5ncmlkRXh0ZW5zaW9uQXBpLCBFWFRfQVBJX1RPS0VOLCB1dGlscyB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZERldGFpbFJvd1BsdWdpbkRpcmVjdGl2ZSwgUGJsRGV0YWlsc1Jvd1RvZ2dsZUV2ZW50LCBQTFVHSU5fS0VZIH0gZnJvbSAnLi9kZXRhaWwtcm93LXBsdWdpbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1yb3dbZGV0YWlsUm93XScsXG4gIGV4cG9ydEFzOiAncGJsTmdyaWREZXRhaWxSb3cnLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgY2xhc3M6ICdwYmwtbmdyaWQtcm93IHBibC1yb3ctZGV0YWlsLXBhcmVudCcsXG4gICAgcm9sZTogJ3JvdycsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdncmlkPy5yb3dGb2N1cycsXG4gICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknXG4gIH0sXG4gIHRlbXBsYXRlOiBDREtfUk9XX1RFTVBMQVRFLFxuICBzdHlsZXM6IFsgYC5wYmwtcm93LWRldGFpbC1wYXJlbnQgeyBwb3NpdGlvbjogcmVsYXRpdmU7IGN1cnNvcjogcG9pbnRlcjsgfWAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDZGtSb3csIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCB9XG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCBleHRlbmRzIFBibE5ncmlkUm93Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIGdldCBleHBlbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vcGVuZWQ7XG4gIH1cblxuICBASW5wdXQoJ2RldGFpbFJvdycpIHNldCByb3codmFsdWU6IGFueSkgeyB0aGlzLnVwZGF0ZVJvdygpOyB9XG5cbiAgcHJpdmF0ZSBnZXQgX2VsZW1lbnQoKTogSFRNTEVsZW1lbnQgeyByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50OyB9XG4gIHByaXZhdGUgb3BlbmVkID0gZmFsc2U7XG4gIHByaXZhdGUgcGx1Z2luOiBQYmxOZ3JpZERldGFpbFJvd1BsdWdpbkRpcmVjdGl2ZTxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoRVhUX0FQSV9UT0tFTikgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxhbnk+LFxuICAgICAgICAgICAgICBlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBzdXBlcihleHRBcGksIGVsKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh0aGlzLmV4dEFwaS5ncmlkKTtcbiAgICB0aGlzLnBsdWdpbiA9IGNvbnRyb2xsZXIuZ2V0UGx1Z2luKFBMVUdJTl9LRVkpOyAvLyBUT0RPOiBUSFJPVyBJRiBOTyBQTFVHSU4uLi5cbiAgICB0aGlzLnBsdWdpbi5hZGREZXRhaWxSb3codGhpcyk7XG4gICAgY29uc3QgdHJhZGVFdmVudHMgPSBjb250cm9sbGVyLmdldFBsdWdpbigndGFyZ2V0RXZlbnRzJyk7XG4gICAgdHJhZGVFdmVudHMuY2VsbENsaWNrXG4gICAgICAucGlwZSh1dGlscy51bnJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2RhdGEnICYmIGV2ZW50LnJvdyA9PT0gdGhpcy5jb250ZXh0LiRpbXBsaWNpdCkge1xuICAgICAgICAgIGNvbnN0IHsgZXhjbHVkZVRvZ2dsZUZyb20gfSA9IHRoaXMucGx1Z2luO1xuICAgICAgICAgIGlmICghZXhjbHVkZVRvZ2dsZUZyb20gfHwgIWV4Y2x1ZGVUb2dnbGVGcm9tLnNvbWUoIGMgPT4gZXZlbnQuY29sdW1uLmlkID09PSBjICkpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRyYWRlRXZlbnRzLnJvd0NsaWNrXG4gICAgICAucGlwZSh1dGlscy51bnJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBpZiAoIWV2ZW50LnJvb3QgJiYgZXZlbnQudHlwZSA9PT0gJ2RhdGEnICYmIGV2ZW50LnJvdyA9PT0gdGhpcy5jb250ZXh0LiRpbXBsaWNpdCkge1xuICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdXRpbHMudW5yeC5raWxsKHRoaXMpO1xuICAgIHRoaXMucGx1Z2luLnJlbW92ZURldGFpbFJvdyh0aGlzKTtcbiAgfVxuXG4gIHVwZGF0ZVJvdygpOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2SWRlbnRpdHkgPSB0aGlzLmNvbnRleHQgJiYgdGhpcy5jb250ZXh0LiRpbXBsaWNpdDtcbiAgICBzdXBlci51cGRhdGVSb3coKTtcbiAgICBpZiAodGhpcy5vcGVuZWQpIHtcbiAgICAgIGNvbnN0IGN1cnJJZGVudGl0eSA9IHRoaXMuY29udGV4dCAmJiB0aGlzLmNvbnRleHQuJGltcGxpY2l0O1xuICAgICAgaWYgKGN1cnJJZGVudGl0eSAhPT0gcHJldklkZW50aXR5ICYmIGN1cnJJZGVudGl0eSkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucGx1Z2luLndoZW5Db250ZXh0Q2hhbmdlKSB7XG4gICAgICAgICAgY2FzZSAncmVuZGVyJzpcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Nsb3NlJzpcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKGZhbHNlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGx1Z2luLnRvZ2dsZWRSb3dDb250ZXh0Q2hhbmdlLm5leHQodGhpcy5jcmVhdGVFdmVudCgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b2dnbGUoZm9yY2VTdGF0ZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcGVuZWQgIT09IGZvcmNlU3RhdGUpIHtcbiAgICAgIGlmICggdGhpcy5vcGVuZWQgKSB7XG4gICAgICAgIHRoaXMudmNSZWYuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtcm93LWRldGFpbC1vcGVuZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICB9XG4gICAgICB0aGlzLm9wZW5lZCA9IHRoaXMudmNSZWYubGVuZ3RoID4gMDtcblxuICAgICAgaWYgKHRoaXMub3BlbmVkKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGJsLXJvdy1kZXRhaWwtb3BlbmVkJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucGx1Z2luLmRldGFpbFJvd1RvZ2dsZWQodGhpcy5jcmVhdGVFdmVudCgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCBldmVudC50YXJnZXQgPT09IHRoaXMuX2VsZW1lbnQgKSB7XG4gICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICAgIGNvbnN0IGlzVG9nZ2xlS2V5ID0ga2V5Q29kZSA9PT0gRU5URVIgfHwga2V5Q29kZSA9PT0gU1BBQ0U7XG4gICAgICBpZiAoIGlzVG9nZ2xlS2V5ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50cyB0aGUgcGFnZSBmcm9tIHNjcm9sbGluZyBkb3duIHdoZW4gcHJlc3Npbmcgc3BhY2VcbiAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUV2ZW50KCk6IFBibERldGFpbHNSb3dUb2dnbGVFdmVudDxhbnk+IHtcbiAgICBjb25zdCBldmVudCA9IE9iamVjdC5jcmVhdGUodGhpcyk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAncm93JywgeyB2YWx1ZTogdGhpcy5jb250ZXh0LiRpbXBsaWNpdCB9KTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcbiAgICB0aGlzLnZjUmVmLmNsZWFyKCk7XG4gICAgaWYgKHRoaXMuY29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgIGNvbnN0IGRldGFpbFJvd0RlZiA9IHRoaXMuY29udGV4dC5ncmlkLnJlZ2lzdHJ5LmdldFNpbmdsZSgnZGV0YWlsUm93Jyk7XG4gICAgICBpZiAoIGRldGFpbFJvd0RlZiApIHtcbiAgICAgICAgdGhpcy52Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcoZGV0YWlsUm93RGVmLnRSZWYsIHRoaXMuY29udGV4dCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=