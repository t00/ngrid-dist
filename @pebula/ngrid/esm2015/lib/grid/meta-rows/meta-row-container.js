/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ElementRef } from '@angular/core';
import { UnRx } from '@pebula/utils';
import { PblNgridMetaRowService } from './meta-row.service';
let PblNgridMetaRowContainerComponent = class PblNgridMetaRowContainerComponent {
    /**
     * @param {?} metaRows
     * @param {?} elRef
     */
    constructor(metaRows, elRef) {
        this.metaRows = metaRows;
        this.element = elRef.nativeElement;
        metaRows.sync.pipe(UnRx(this)).subscribe((/**
         * @return {?}
         */
        () => this.syncRowDefinitions()));
        this.metaRows.extApi.events
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.kind === 'onResizeRow') {
                this._innerWidth = this.metaRows.extApi.grid.viewport.innerWidth;
                this._minWidth = this.metaRows.extApi.cdkTable.minWidth;
                this._width = Math.max(this._innerWidth, this._minWidth);
            }
        }));
        this._width$ = this.metaRows.extApi.grid.columnApi.totalColumnWidthChange;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        if (this._type !== value) {
            this.init(value);
        }
    }
    ;
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    init(type) {
        if (type === 'header') {
            this._type = type;
        }
        else {
            this._type = 'footer';
        }
        /** @type {?} */
        const scrollContainerElement = this.element;
        scrollContainerElement.scrollLeft = this.metaRows.extApi.grid.viewport.measureScrollOffset('start');
        this.metaRows.hzScroll
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} offset
         * @return {?}
         */
        offset => scrollContainerElement.scrollLeft = offset));
        this.metaRows.extApi.cdkTable.onRenderRows
            .pipe(UnRx(this))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._innerWidth = this.metaRows.extApi.grid.viewport.innerWidth;
            this._width = Math.max(this._innerWidth, this._minWidth);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    syncRowDefinitions() {
        /** @type {?} */
        const isHeader = this._type === 'header';
        /** @type {?} */
        const section = isHeader ? this.metaRows.header : this.metaRows.footer;
        /** @type {?} */
        const widthContainer = this.element.firstElementChild;
        /** @type {?} */
        const container = widthContainer.nextElementSibling;
        if (isHeader) {
            widthContainer.appendChild(this.metaRows.gridWidthRow.el);
        }
        for (const def of section.fixed) {
            container.appendChild(def.el);
        }
    }
};
PblNgridMetaRowContainerComponent.ctorParameters = () => [
    { type: PblNgridMetaRowService },
    { type: ElementRef }
];
PblNgridMetaRowContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'div[pbl-ngrid-fixed-meta-row-container]',
                template: `<div class="pbl-cdk-table" [style.width.px]="_width"></div><div class="pbl-cdk-table" [style.width.px]="_width$ | async"></div>`,
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    style: 'flex: 0 0 auto; overflow: hidden;',
                    '[style.width.px]': '_innerWidth',
                }
            }] }
];
/** @nocollapse */
PblNgridMetaRowContainerComponent.ctorParameters = () => [
    { type: PblNgridMetaRowService },
    { type: ElementRef }
];
PblNgridMetaRowContainerComponent.propDecorators = {
    type: [{ type: Input, args: ['pbl-ngrid-fixed-meta-row-container',] }]
};
PblNgridMetaRowContainerComponent = tslib_1.__decorate([
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [PblNgridMetaRowService, ElementRef])
], PblNgridMetaRowContainerComponent);
export { PblNgridMetaRowContainerComponent };
if (false) {
    /**
     * The inner width of the grid, the viewport width of a row.
     * The width of the grid minus scroll bar.
     * @type {?}
     */
    PblNgridMetaRowContainerComponent.prototype._innerWidth;
    /** @type {?} */
    PblNgridMetaRowContainerComponent.prototype._minWidth;
    /** @type {?} */
    PblNgridMetaRowContainerComponent.prototype._width;
    /** @type {?} */
    PblNgridMetaRowContainerComponent.prototype._width$;
    /**
     * @type {?}
     * @private
     */
    PblNgridMetaRowContainerComponent.prototype._type;
    /**
     * @type {?}
     * @private
     */
    PblNgridMetaRowContainerComponent.prototype.element;
    /** @type {?} */
    PblNgridMetaRowContainerComponent.prototype.metaRows;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3ctY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL21ldGEtcm93cy9tZXRhLXJvdy1jb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0QsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdyQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztJQVkvQyxpQ0FBaUMsU0FBakMsaUNBQWlDOzs7OztJQXFCNUMsWUFBNEIsUUFBZ0MsRUFBRSxLQUE4QjtRQUFoRSxhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUMxRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUzs7O1FBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQztRQUM1RSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEIsU0FBUzs7OztRQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ2xCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxhQUFhLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7Z0JBQ2pFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzFEO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUM7SUFDNUUsQ0FBQzs7Ozs7SUFoQ0QsSUFBaUQsSUFBSSxDQUFDLEtBQTBCO1FBQzlFLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7WUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsQjtJQUNILENBQUM7SUFBQSxDQUFDOzs7Ozs7SUE4Qk0sSUFBSSxDQUFDLElBQXlCO1FBRXBDLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNuQjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7U0FDdkI7O2NBRUssc0JBQXNCLEdBQUcsSUFBSSxDQUFDLE9BQU87UUFDM0Msc0JBQXNCLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFcEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRO2FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEIsU0FBUzs7OztRQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsc0JBQXNCLENBQUMsVUFBVSxHQUFHLE1BQU0sRUFBRSxDQUFDO1FBRXJFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZO2FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEIsU0FBUzs7O1FBQUUsR0FBRyxFQUFFO1lBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztZQUNqRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0QsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVPLGtCQUFrQjs7Y0FDbEIsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUTs7Y0FDbEMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTTs7Y0FFaEUsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCOztjQUMvQyxTQUFTLEdBQUcsY0FBYyxDQUFDLGtCQUFrQjtRQUVuRCxJQUFJLFFBQVEsRUFBRTtZQUNaLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDM0Q7UUFFRCxLQUFLLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDL0IsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDL0I7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUFyRHVDLHNCQUFzQjtZQUFTLFVBQVU7OztZQTlCaEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5Q0FBeUM7Z0JBQ25ELFFBQVEsRUFBRSxpSUFBaUk7Z0JBQzNJLElBQUksRUFBRTs7b0JBQ0osS0FBSyxFQUFFLG1DQUFtQztvQkFDMUMsa0JBQWtCLEVBQUUsYUFBYTtpQkFDbEM7YUFDRjs7OztZQVZRLHNCQUFzQjtZQUxKLFVBQVU7OzttQkFtQmxDLEtBQUssU0FBQyxvQ0FBb0M7O0FBRmhDLGlDQUFpQztJQUQ3QyxJQUFJLEVBQUU7NkNBc0JpQyxzQkFBc0IsRUFBUyxVQUFVO0dBckJwRSxpQ0FBaUMsQ0EwRTdDO1NBMUVZLGlDQUFpQzs7Ozs7OztJQVk1Qyx3REFBb0I7O0lBQ3BCLHNEQUFrQjs7SUFDbEIsbURBQWU7O0lBRWYsb0RBQXFDOzs7OztJQUVyQyxrREFBbUM7Ozs7O0lBQ25DLG9EQUE2Qjs7SUFFakIscURBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5cbmltcG9ydCB7IFBibE1ldGFSb3dEZWZpbml0aW9ucyB9IGZyb20gJy4uL2NvbHVtbnMvdHlwZXMnO1xuaW1wb3J0IHsgUGJsTmdyaWRNZXRhUm93U2VydmljZSB9IGZyb20gJy4vbWV0YS1yb3cuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RpdltwYmwtbmdyaWQtZml4ZWQtbWV0YS1yb3ctY29udGFpbmVyXScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBibC1jZGstdGFibGVcIiBbc3R5bGUud2lkdGgucHhdPVwiX3dpZHRoXCI+PC9kaXY+PGRpdiBjbGFzcz1cInBibC1jZGstdGFibGVcIiBbc3R5bGUud2lkdGgucHhdPVwiX3dpZHRoJCB8IGFzeW5jXCI+PC9kaXY+YCxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgIHN0eWxlOiAnZmxleDogMCAwIGF1dG87IG92ZXJmbG93OiBoaWRkZW47JyxcbiAgICAnW3N0eWxlLndpZHRoLnB4XSc6ICdfaW5uZXJXaWR0aCcsXG4gIH0sXG59KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkTWV0YVJvd0NvbnRhaW5lckNvbXBvbmVudCB7XG5cbiAgQElucHV0KCdwYmwtbmdyaWQtZml4ZWQtbWV0YS1yb3ctY29udGFpbmVyJykgc2V0IHR5cGUodmFsdWU6ICdoZWFkZXInIHwgJ2Zvb3RlcicpIHtcbiAgICBpZiAodGhpcy5fdHlwZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuaW5pdCh2YWx1ZSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgaW5uZXIgd2lkdGggb2YgdGhlIGdyaWQsIHRoZSB2aWV3cG9ydCB3aWR0aCBvZiBhIHJvdy5cbiAgICogVGhlIHdpZHRoIG9mIHRoZSBncmlkIG1pbnVzIHNjcm9sbCBiYXIuXG4gICAqL1xuICBfaW5uZXJXaWR0aDogbnVtYmVyO1xuICBfbWluV2lkdGg6IG51bWJlcjtcbiAgX3dpZHRoOiBudW1iZXI7XG5cbiAgcmVhZG9ubHkgX3dpZHRoJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIHByaXZhdGUgX3R5cGU6ICdoZWFkZXInIHwgJ2Zvb3Rlcic7XG4gIHByaXZhdGUgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG1ldGFSb3dzOiBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlLCBlbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIG1ldGFSb3dzLnN5bmMucGlwZShVblJ4KHRoaXMpKS5zdWJzY3JpYmUoICgpID0+IHRoaXMuc3luY1Jvd0RlZmluaXRpb25zKCkgKTtcbiAgICB0aGlzLm1ldGFSb3dzLmV4dEFwaS5ldmVudHNcbiAgICAgIC5waXBlKFVuUngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC5raW5kID09PSAnb25SZXNpemVSb3cnKSB7XG4gICAgICAgICAgdGhpcy5faW5uZXJXaWR0aCA9IHRoaXMubWV0YVJvd3MuZXh0QXBpLmdyaWQudmlld3BvcnQuaW5uZXJXaWR0aDtcbiAgICAgICAgICB0aGlzLl9taW5XaWR0aCA9IHRoaXMubWV0YVJvd3MuZXh0QXBpLmNka1RhYmxlLm1pbldpZHRoO1xuICAgICAgICAgIHRoaXMuX3dpZHRoID0gTWF0aC5tYXgodGhpcy5faW5uZXJXaWR0aCwgdGhpcy5fbWluV2lkdGgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB0aGlzLl93aWR0aCQgPSB0aGlzLm1ldGFSb3dzLmV4dEFwaS5ncmlkLmNvbHVtbkFwaS50b3RhbENvbHVtbldpZHRoQ2hhbmdlO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KHR5cGU6ICdoZWFkZXInIHwgJ2Zvb3RlcicpOiB2b2lkIHtcblxuICAgIGlmICh0eXBlID09PSAnaGVhZGVyJykge1xuICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3R5cGUgPSAnZm9vdGVyJztcbiAgICB9XG5cbiAgICBjb25zdCBzY3JvbGxDb250YWluZXJFbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuICAgIHNjcm9sbENvbnRhaW5lckVsZW1lbnQuc2Nyb2xsTGVmdCA9IHRoaXMubWV0YVJvd3MuZXh0QXBpLmdyaWQudmlld3BvcnQubWVhc3VyZVNjcm9sbE9mZnNldCgnc3RhcnQnKTtcblxuICAgIHRoaXMubWV0YVJvd3MuaHpTY3JvbGxcbiAgICAgIC5waXBlKFVuUngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCBvZmZzZXQgPT4gc2Nyb2xsQ29udGFpbmVyRWxlbWVudC5zY3JvbGxMZWZ0ID0gb2Zmc2V0ICk7XG5cbiAgICB0aGlzLm1ldGFSb3dzLmV4dEFwaS5jZGtUYWJsZS5vblJlbmRlclJvd3NcbiAgICAgIC5waXBlKFVuUngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2lubmVyV2lkdGggPSB0aGlzLm1ldGFSb3dzLmV4dEFwaS5ncmlkLnZpZXdwb3J0LmlubmVyV2lkdGg7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gTWF0aC5tYXgodGhpcy5faW5uZXJXaWR0aCwgdGhpcy5fbWluV2lkdGgpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN5bmNSb3dEZWZpbml0aW9ucygpOiB2b2lkIHtcbiAgICBjb25zdCBpc0hlYWRlciA9IHRoaXMuX3R5cGUgPT09ICdoZWFkZXInO1xuICAgIGNvbnN0IHNlY3Rpb24gPSBpc0hlYWRlciA/IHRoaXMubWV0YVJvd3MuaGVhZGVyIDogdGhpcy5tZXRhUm93cy5mb290ZXI7XG5cbiAgICBjb25zdCB3aWR0aENvbnRhaW5lciA9IHRoaXMuZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICBjb25zdCBjb250YWluZXIgPSB3aWR0aENvbnRhaW5lci5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICBpZiAoaXNIZWFkZXIpIHtcbiAgICAgIHdpZHRoQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubWV0YVJvd3MuZ3JpZFdpZHRoUm93LmVsKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGRlZiBvZiBzZWN0aW9uLmZpeGVkKSB7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGVmLmVsKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==