/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { isObservable } from 'rxjs';
import { Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, NgridPlugin } from '@pebula/ngrid';
/** @type {?} */
const PLUGIN_KEY = 'blockUi';
/**
 * @template T
 */
let PblNgridBlockUiPluginDirective = /**
 * @template T
 */
class PblNgridBlockUiPluginDirective {
    /**
     * @param {?} grid
     * @param {?} pluginCtrl
     */
    constructor(grid, pluginCtrl) {
        this.grid = grid;
        this._blockInProgress = false;
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        grid.registry.changes.subscribe((/**
         * @param {?} changes
         * @return {?}
         */
        changes => {
            for (const c of changes) {
                switch (c.type) {
                    case 'blocker':
                        this.setupBlocker();
                        break;
                }
            }
        }));
        pluginCtrl.events
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.kind === 'onDataSource') {
                const { prev, curr } = event;
                if (prev) {
                    UnRx.kill(this, prev);
                }
                curr.onSourceChanging
                    .pipe(UnRx(this, curr))
                    .subscribe((/**
                 * @return {?}
                 */
                () => {
                    if (this._blockUi === 'auto') {
                        this._blockInProgress = true;
                        this.setupBlocker();
                    }
                }));
                curr.onSourceChanged
                    .pipe(UnRx(this, curr))
                    .subscribe((/**
                 * @return {?}
                 */
                () => {
                    if (this._blockUi === 'auto') {
                        this._blockInProgress = false;
                        this.setupBlocker();
                    }
                }));
            }
        }));
    }
    /**
     * Blocks the UI with the template defined via `PblNgridBlockUiDefDirective`.
     * If a template does not exist blocking is ignored.
     *
     * There are 3 operation modes, the modes are set based on the input value:
     *   - Auto mode (INPUT: 'auto')
     *     The UI will be blocked automatically based on datasource changes.
     *
     *    - Manual mode (INPUT: boolean)
     *     The UI will be block is toggled based on the value, i.e. `true` will block and false will unblock.
     *
     *   - Notification mode (INPUT: Observable<boolean>)
     *     Similar to Manual mode but controlled by a stream boolean value.
     *
     * **Note about Notification mode**
     * Notification mode accepts an observable, at the point where the value is set the block state does not change (if it was "on" it will stay "on" and vice versa)
     * It will only change on the first emission, this is important to understand.
     *
     * For example, if the current block state is off and we pass a `Subject`, the state remains off until the next emission
     * of the `Subject` is `true`. If it already emitted `true` before the assignment it will not be taken into account. This is why
     * using `BehaviouralSubject` is preferred.
     *
     * Also note that when sending an observable it is treated as "notifier", do not send cold observable as they get subscribed to.
     * For example, sending the returned value from `HttpClient` will probably result in 2 HTTP calls, if you already subscribed to it
     * > The default value is `auto` which means that `<pbl-ngrid blockUi>` is similar to `<pbl-ngrid blockUi="auto">`
     * @return {?}
     */
    get blockUi() { return this._blockUi; }
    /**
     * @param {?} value
     * @return {?}
     */
    set blockUi(value) {
        /** @type {?} */
        let coerced = coerceBooleanProperty(value);
        if (coerced && (value === 'auto' || ((/** @type {?} */ (value))) === '')) {
            coerced = 'auto';
        }
        if (isObservable(value) && this._blockUi !== value) {
            if (isObservable(this._blockUi)) {
                UnRx.kill(this, this._blockUi);
            }
            this._blockUi = value;
            value.pipe(UnRx(this, this._blockUi)).subscribe((/**
             * @param {?} state
             * @return {?}
             */
            state => {
                this._blockInProgress = state;
                this.setupBlocker();
            }));
        }
        else if (this._blockUi !== coerced) {
            this._blockUi = coerced;
            if (coerced !== 'auto') {
                this._blockInProgress = coerced;
                this.setupBlocker();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._removePlugin(this.grid);
    }
    /**
     * @private
     * @return {?}
     */
    setupBlocker() {
        /** @type {?} */
        const state = this._blockInProgress;
        if (state) {
            if (!this._blockerEmbeddedVRef) {
                /** @type {?} */
                const blockerTemplate = this.grid.registry.getSingle('blocker');
                if (blockerTemplate) {
                    this._blockerEmbeddedVRef = this.grid.createView('afterContent', blockerTemplate.tRef, { $implicit: this.grid });
                    this._blockerEmbeddedVRef.detectChanges();
                }
            }
        }
        else if (this._blockerEmbeddedVRef) {
            this.grid.removeView(this._blockerEmbeddedVRef, 'afterContent');
            this._blockerEmbeddedVRef = undefined;
        }
    }
};
PblNgridBlockUiPluginDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: PblNgridPluginController }
];
PblNgridBlockUiPluginDirective.decorators = [
    { type: Directive, args: [{ selector: 'pbl-ngrid[blockUi]', exportAs: 'blockUi' },] }
];
/** @nocollapse */
PblNgridBlockUiPluginDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: PblNgridPluginController }
];
PblNgridBlockUiPluginDirective.propDecorators = {
    blockUi: [{ type: Input }]
};
/**
 * @template T
 */
PblNgridBlockUiPluginDirective = tslib_1.__decorate([
    NgridPlugin({ id: PLUGIN_KEY }),
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [PblNgridComponent, PblNgridPluginController])
], PblNgridBlockUiPluginDirective);
export { PblNgridBlockUiPluginDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridBlockUiPluginDirective.prototype._blockInProgress;
    /**
     * @type {?}
     * @private
     */
    PblNgridBlockUiPluginDirective.prototype._blockUi;
    /**
     * @type {?}
     * @private
     */
    PblNgridBlockUiPluginDirective.prototype._blockerEmbeddedVRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridBlockUiPluginDirective.prototype._removePlugin;
    /**
     * @type {?}
     * @private
     */
    PblNgridBlockUiPluginDirective.prototype.grid;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2stdWktcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9ibG9jay11aS8iLCJzb3VyY2VzIjpbImxpYi9ibG9jay11aS9ibG9jay11aS1wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxTQUFTLEVBQW1CLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7O01BUW5GLFVBQVUsR0FBYyxTQUFTOzs7O0lBSzFCLDhCQUE4Qjs7O01BQTlCLDhCQUE4Qjs7Ozs7SUEwRHpDLFlBQW9CLElBQTRCLEVBQUUsVUFBdUM7UUFBckUsU0FBSSxHQUFKLElBQUksQ0FBd0I7UUFMeEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBTXhDLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztRQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ3pDLEtBQUssTUFBTSxDQUFDLElBQUksT0FBTyxFQUFFO2dCQUN2QixRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUU7b0JBQ2QsS0FBSyxTQUFTO3dCQUNaLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDcEIsTUFBTTtpQkFDVDthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsTUFBTTthQUNkLFNBQVM7Ozs7UUFBRSxLQUFLLENBQUMsRUFBRTtZQUNsQixJQUFJ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UyxDQUFDLFNBQVMsQ0FBQztnQkFDL0QsSUFBSSxlQUFlLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDakgsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxDQUFDO2lCQUMzQzthQUNGO1NBQ0Y7YUFBTSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFNBQVMsQ0FBQztTQUN2QztJQUNILENBQUM7Q0FDRixDQUFBOztZQTVEMkIsaUJBQWlCO1lBQW1CLHdCQUF3Qjs7O1lBNUR2RixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTs7OztZQVh6RCxpQkFBaUI7WUFBRSx3QkFBd0I7OztzQkF5Q2pELEtBQUs7Ozs7O0FBNUJLLDhCQUE4QjtJQUgxQyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUM7SUFFL0IsSUFBSSxFQUFFOzZDQTJEcUIsaUJBQWlCLEVBQW1CLHdCQUF3QjtHQTFEM0UsOEJBQThCLENBc0gxQztTQXRIWSw4QkFBOEI7Ozs7OztJQXFEekMsMERBQTBDOzs7OztJQUMxQyxrREFBeUQ7Ozs7O0lBQ3pELDhEQUFtRDs7Ozs7SUFDbkQsdURBQThEOzs7OztJQUVsRCw4Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBpc09ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRW1iZWRkZWRWaWV3UmVmLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBOZ3JpZFBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgYmxvY2tVaT86IHsgYmxvY2tVaTogYm9vbGVhbiB8ICdhdXRvJyB8IE9ic2VydmFibGU8Ym9vbGVhbj4gfTtcbiAgfVxufVxuXG5jb25zdCBQTFVHSU5fS0VZOiAnYmxvY2tVaScgPSAnYmxvY2tVaSc7XG5cbkBOZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0pXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbYmxvY2tVaV0nLCBleHBvcnRBczogJ2Jsb2NrVWknIH0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRCbG9ja1VpUGx1Z2luRGlyZWN0aXZlPFQ+IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAvKipcbiAgICogQmxvY2tzIHRoZSBVSSB3aXRoIHRoZSB0ZW1wbGF0ZSBkZWZpbmVkIHZpYSBgUGJsTmdyaWRCbG9ja1VpRGVmRGlyZWN0aXZlYC5cbiAgICogSWYgYSB0ZW1wbGF0ZSBkb2VzIG5vdCBleGlzdCBibG9ja2luZyBpcyBpZ25vcmVkLlxuICAgKlxuICAgKiBUaGVyZSBhcmUgMyBvcGVyYXRpb24gbW9kZXMsIHRoZSBtb2RlcyBhcmUgc2V0IGJhc2VkIG9uIHRoZSBpbnB1dCB2YWx1ZTpcbiAgICogICAtIEF1dG8gbW9kZSAoSU5QVVQ6ICdhdXRvJylcbiAgICogICAgIFRoZSBVSSB3aWxsIGJlIGJsb2NrZWQgYXV0b21hdGljYWxseSBiYXNlZCBvbiBkYXRhc291cmNlIGNoYW5nZXMuXG4gICAqXG4gICAqICAgIC0gTWFudWFsIG1vZGUgKElOUFVUOiBib29sZWFuKVxuICAgKiAgICAgVGhlIFVJIHdpbGwgYmUgYmxvY2sgaXMgdG9nZ2xlZCBiYXNlZCBvbiB0aGUgdmFsdWUsIGkuZS4gYHRydWVgIHdpbGwgYmxvY2sgYW5kIGZhbHNlIHdpbGwgdW5ibG9jay5cbiAgICpcbiAgICogICAtIE5vdGlmaWNhdGlvbiBtb2RlIChJTlBVVDogT2JzZXJ2YWJsZTxib29sZWFuPilcbiAgICogICAgIFNpbWlsYXIgdG8gTWFudWFsIG1vZGUgYnV0IGNvbnRyb2xsZWQgYnkgYSBzdHJlYW0gYm9vbGVhbiB2YWx1ZS5cbiAgICpcbiAgICogKipOb3RlIGFib3V0IE5vdGlmaWNhdGlvbiBtb2RlKipcbiAgICogTm90aWZpY2F0aW9uIG1vZGUgYWNjZXB0cyBhbiBvYnNlcnZhYmxlLCBhdCB0aGUgcG9pbnQgd2hlcmUgdGhlIHZhbHVlIGlzIHNldCB0aGUgYmxvY2sgc3RhdGUgZG9lcyBub3QgY2hhbmdlIChpZiBpdCB3YXMgXCJvblwiIGl0IHdpbGwgc3RheSBcIm9uXCIgYW5kIHZpY2UgdmVyc2EpXG4gICAqIEl0IHdpbGwgb25seSBjaGFuZ2Ugb24gdGhlIGZpcnN0IGVtaXNzaW9uLCB0aGlzIGlzIGltcG9ydGFudCB0byB1bmRlcnN0YW5kLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgaWYgdGhlIGN1cnJlbnQgYmxvY2sgc3RhdGUgaXMgb2ZmIGFuZCB3ZSBwYXNzIGEgYFN1YmplY3RgLCB0aGUgc3RhdGUgcmVtYWlucyBvZmYgdW50aWwgdGhlIG5leHQgZW1pc3Npb25cbiAgICogb2YgdGhlIGBTdWJqZWN0YCBpcyBgdHJ1ZWAuIElmIGl0IGFscmVhZHkgZW1pdHRlZCBgdHJ1ZWAgYmVmb3JlIHRoZSBhc3NpZ25tZW50IGl0IHdpbGwgbm90IGJlIHRha2VuIGludG8gYWNjb3VudC4gVGhpcyBpcyB3aHlcbiAgICogdXNpbmcgYEJlaGF2aW91cmFsU3ViamVjdGAgaXMgcHJlZmVycmVkLlxuICAgKlxuICAgKiBBbHNvIG5vdGUgdGhhdCB3aGVuIHNlbmRpbmcgYW4gb2JzZXJ2YWJsZSBpdCBpcyB0cmVhdGVkIGFzIFwibm90aWZpZXJcIiwgZG8gbm90IHNlbmQgY29sZCBvYnNlcnZhYmxlIGFzIHRoZXkgZ2V0IHN1YnNjcmliZWQgdG8uXG4gICAqIEZvciBleGFtcGxlLCBzZW5kaW5nIHRoZSByZXR1cm5lZCB2YWx1ZSBmcm9tIGBIdHRwQ2xpZW50YCB3aWxsIHByb2JhYmx5IHJlc3VsdCBpbiAyIEhUVFAgY2FsbHMsIGlmIHlvdSBhbHJlYWR5IHN1YnNjcmliZWQgdG8gaXRcbiAgICogPiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBgYXV0b2Agd2hpY2ggbWVhbnMgdGhhdCBgPHBibC1uZ3JpZCBibG9ja1VpPmAgaXMgc2ltaWxhciB0byBgPHBibC1uZ3JpZCBibG9ja1VpPVwiYXV0b1wiPmBcbiAgICovXG4gIEBJbnB1dCgpIGdldCBibG9ja1VpKCk6IGJvb2xlYW4gfCAnYXV0bycgfCBPYnNlcnZhYmxlPGJvb2xlYW4+IHsgcmV0dXJuIHRoaXMuX2Jsb2NrVWk7IH1cbiAgc2V0IGJsb2NrVWkodmFsdWU6IGJvb2xlYW4gfCAnYXV0bycgfCBPYnNlcnZhYmxlPGJvb2xlYW4+KSB7XG4gICAgbGV0IGNvZXJjZWQ6IGJvb2xlYW4gfCAnYXV0bycgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmIChjb2VyY2VkICYmICh2YWx1ZSA9PT0gJ2F1dG8nIHx8ICh2YWx1ZSBhcyBhbnkpID09PSAnJykpIHtcbiAgICAgIGNvZXJjZWQgPSAnYXV0byc7XG4gICAgfVxuXG4gICAgaWYgKGlzT2JzZXJ2YWJsZSh2YWx1ZSkgJiYgdGhpcy5fYmxvY2tVaSAhPT0gdmFsdWUpIHtcbiAgICAgIGlmIChpc09ic2VydmFibGUodGhpcy5fYmxvY2tVaSkpIHtcbiAgICAgICAgVW5SeC5raWxsKHRoaXMsIHRoaXMuX2Jsb2NrVWkpO1xuICAgICAgfVxuICAgICAgdGhpcy5fYmxvY2tVaSA9IHZhbHVlO1xuICAgICAgdmFsdWUucGlwZShVblJ4KHRoaXMsIHRoaXMuX2Jsb2NrVWkpKS5zdWJzY3JpYmUoIHN0YXRlID0+IHtcbiAgICAgICAgdGhpcy5fYmxvY2tJblByb2dyZXNzID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc2V0dXBCbG9ja2VyKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2Jsb2NrVWkgIT09IGNvZXJjZWQpIHtcbiAgICAgIHRoaXMuX2Jsb2NrVWkgPSBjb2VyY2VkO1xuICAgICAgaWYgKGNvZXJjZWQgIT09ICdhdXRvJykge1xuICAgICAgICB0aGlzLl9ibG9ja0luUHJvZ3Jlc3MgPSBjb2VyY2VkO1xuICAgICAgICB0aGlzLnNldHVwQmxvY2tlcigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Jsb2NrSW5Qcm9ncmVzczogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9ibG9ja1VpOiBib29sZWFuIHwgJ2F1dG8nIHwgT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHJpdmF0ZSBfYmxvY2tlckVtYmVkZGVkVlJlZjogRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI8VD4pIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIGdyaWQucmVnaXN0cnkuY2hhbmdlcy5zdWJzY3JpYmUoIGNoYW5nZXMgPT4ge1xuICAgICAgZm9yIChjb25zdCBjIG9mIGNoYW5nZXMpIHtcbiAgICAgICAgc3dpdGNoIChjLnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdibG9ja2VyJzpcbiAgICAgICAgICAgIHRoaXMuc2V0dXBCbG9ja2VyKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkRhdGFTb3VyY2UnKSB7XG4gICAgICAgICAgY29uc3QgeyBwcmV2LCBjdXJyIH0gPSBldmVudDtcbiAgICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgICAgVW5SeC5raWxsKHRoaXMsIHByZXYpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJyLm9uU291cmNlQ2hhbmdpbmdcbiAgICAgICAgICAgIC5waXBlKFVuUngodGhpcywgY3VycikpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9ibG9ja1VpID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja0luUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBCbG9ja2VyKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIGN1cnIub25Tb3VyY2VDaGFuZ2VkXG4gICAgICAgICAgICAucGlwZShVblJ4KHRoaXMsIGN1cnIpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSggKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5fYmxvY2tVaSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cEJsb2NrZXIoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy5ncmlkKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBCbG9ja2VyKCk6IHZvaWQge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fYmxvY2tJblByb2dyZXNzO1xuICAgIGlmIChzdGF0ZSkge1xuICAgICAgaWYgKCF0aGlzLl9ibG9ja2VyRW1iZWRkZWRWUmVmKSB7XG4gICAgICAgIGNvbnN0IGJsb2NrZXJUZW1wbGF0ZSA9IHRoaXMuZ3JpZC5yZWdpc3RyeS5nZXRTaW5nbGUoJ2Jsb2NrZXInKTtcbiAgICAgICAgaWYgKGJsb2NrZXJUZW1wbGF0ZSkge1xuICAgICAgICAgIHRoaXMuX2Jsb2NrZXJFbWJlZGRlZFZSZWYgPSB0aGlzLmdyaWQuY3JlYXRlVmlldygnYWZ0ZXJDb250ZW50JywgYmxvY2tlclRlbXBsYXRlLnRSZWYsIHsgJGltcGxpY2l0OiB0aGlzLmdyaWQgfSk7XG4gICAgICAgICAgdGhpcy5fYmxvY2tlckVtYmVkZGVkVlJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX2Jsb2NrZXJFbWJlZGRlZFZSZWYpIHtcbiAgICAgIHRoaXMuZ3JpZC5yZW1vdmVWaWV3KHRoaXMuX2Jsb2NrZXJFbWJlZGRlZFZSZWYsICdhZnRlckNvbnRlbnQnKTtcbiAgICAgIHRoaXMuX2Jsb2NrZXJFbWJlZGRlZFZSZWYgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=