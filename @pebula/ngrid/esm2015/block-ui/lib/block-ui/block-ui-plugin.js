/**
 * @fileoverview added by tsickle
 * Generated from: lib/block-ui/block-ui-plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isObservable } from 'rxjs';
import { Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PblNgridComponent, PblNgridPluginController, utils } from '@pebula/ngrid';
/** @type {?} */
export const PLUGIN_KEY = 'blockUi';
/**
 * @template T
 */
export class PblNgridBlockUiPluginDirective {
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
                    utils.unrx.kill(this, prev);
                }
                curr.onSourceChanging
                    .pipe(utils.unrx(this, curr))
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
                    .pipe(utils.unrx(this, curr))
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
                utils.unrx.kill(this, this._blockUi);
            }
            this._blockUi = value;
            value.pipe(utils.unrx(this, this._blockUi)).subscribe((/**
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
        utils.unrx.kill(this);
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
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2stdWktcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9ibG9jay11aS8iLCJzb3VyY2VzIjpbImxpYi9ibG9jay11aS9ibG9jay11aS1wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxTQUFTLEVBQW1CLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVFuRixNQUFNLE9BQU8sVUFBVSxHQUFjLFNBQVM7Ozs7QUFHOUMsTUFBTSxPQUFPLDhCQUE4Qjs7Ozs7SUEwRHpDLFlBQW9CLElBQTRCLEVBQUUsVUFBdUM7UUFBckUsU0FBSSxHQUFKLElBQUksQ0FBd0I7UUFMeEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBTXhDLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztRQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ3pDLEtBQUssTUFBTSxDQUFDLElBQUksT0FBTyxFQUFFO2dCQUN2QixRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUU7b0JBQ2QsS0FBSyxTQUFTO3dCQUNaLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDcEIsTUFBTTtpQkFDVDthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsTUFBTTthQUNkLFNBQVM7Ozs7UUFBRSxLQUFLLENBQUMsRUFBRTtZQUNsQixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUFFO3NCQUMz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QyxvQkFBb0IsRUFBRTs7c0JBQ3hCLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO2dCQUMvRCxJQUFJLGVBQWUsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNqSCxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxFQUFFLENBQUM7aUJBQzNDO2FBQ0Y7U0FDRjthQUFNLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsU0FBUyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQzs7O1lBdkhGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFOzs7O1lBVnpELGlCQUFpQjtZQUFFLHdCQUF3Qjs7O3NCQXVDakQsS0FBSzs7Ozs7OztJQXlCTiwwREFBMEM7Ozs7O0lBQzFDLGtEQUF5RDs7Ozs7SUFDekQsOERBQW1EOzs7OztJQUNuRCx1REFBOEQ7Ozs7O0lBRWxELDhDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIGlzT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbWJlZGRlZFZpZXdSZWYsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIHV0aWxzIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBibG9ja1VpPzogeyBibG9ja1VpOiBib29sZWFuIHwgJ2F1dG8nIHwgT2JzZXJ2YWJsZTxib29sZWFuPiB9O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAnYmxvY2tVaScgPSAnYmxvY2tVaSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZFtibG9ja1VpXScsIGV4cG9ydEFzOiAnYmxvY2tVaScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEJsb2NrVWlQbHVnaW5EaXJlY3RpdmU8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIC8qKlxuICAgKiBCbG9ja3MgdGhlIFVJIHdpdGggdGhlIHRlbXBsYXRlIGRlZmluZWQgdmlhIGBQYmxOZ3JpZEJsb2NrVWlEZWZEaXJlY3RpdmVgLlxuICAgKiBJZiBhIHRlbXBsYXRlIGRvZXMgbm90IGV4aXN0IGJsb2NraW5nIGlzIGlnbm9yZWQuXG4gICAqXG4gICAqIFRoZXJlIGFyZSAzIG9wZXJhdGlvbiBtb2RlcywgdGhlIG1vZGVzIGFyZSBzZXQgYmFzZWQgb24gdGhlIGlucHV0IHZhbHVlOlxuICAgKiAgIC0gQXV0byBtb2RlIChJTlBVVDogJ2F1dG8nKVxuICAgKiAgICAgVGhlIFVJIHdpbGwgYmUgYmxvY2tlZCBhdXRvbWF0aWNhbGx5IGJhc2VkIG9uIGRhdGFzb3VyY2UgY2hhbmdlcy5cbiAgICpcbiAgICogICAgLSBNYW51YWwgbW9kZSAoSU5QVVQ6IGJvb2xlYW4pXG4gICAqICAgICBUaGUgVUkgd2lsbCBiZSBibG9jayBpcyB0b2dnbGVkIGJhc2VkIG9uIHRoZSB2YWx1ZSwgaS5lLiBgdHJ1ZWAgd2lsbCBibG9jayBhbmQgZmFsc2Ugd2lsbCB1bmJsb2NrLlxuICAgKlxuICAgKiAgIC0gTm90aWZpY2F0aW9uIG1vZGUgKElOUFVUOiBPYnNlcnZhYmxlPGJvb2xlYW4+KVxuICAgKiAgICAgU2ltaWxhciB0byBNYW51YWwgbW9kZSBidXQgY29udHJvbGxlZCBieSBhIHN0cmVhbSBib29sZWFuIHZhbHVlLlxuICAgKlxuICAgKiAqKk5vdGUgYWJvdXQgTm90aWZpY2F0aW9uIG1vZGUqKlxuICAgKiBOb3RpZmljYXRpb24gbW9kZSBhY2NlcHRzIGFuIG9ic2VydmFibGUsIGF0IHRoZSBwb2ludCB3aGVyZSB0aGUgdmFsdWUgaXMgc2V0IHRoZSBibG9jayBzdGF0ZSBkb2VzIG5vdCBjaGFuZ2UgKGlmIGl0IHdhcyBcIm9uXCIgaXQgd2lsbCBzdGF5IFwib25cIiBhbmQgdmljZSB2ZXJzYSlcbiAgICogSXQgd2lsbCBvbmx5IGNoYW5nZSBvbiB0aGUgZmlyc3QgZW1pc3Npb24sIHRoaXMgaXMgaW1wb3J0YW50IHRvIHVuZGVyc3RhbmQuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBpZiB0aGUgY3VycmVudCBibG9jayBzdGF0ZSBpcyBvZmYgYW5kIHdlIHBhc3MgYSBgU3ViamVjdGAsIHRoZSBzdGF0ZSByZW1haW5zIG9mZiB1bnRpbCB0aGUgbmV4dCBlbWlzc2lvblxuICAgKiBvZiB0aGUgYFN1YmplY3RgIGlzIGB0cnVlYC4gSWYgaXQgYWxyZWFkeSBlbWl0dGVkIGB0cnVlYCBiZWZvcmUgdGhlIGFzc2lnbm1lbnQgaXQgd2lsbCBub3QgYmUgdGFrZW4gaW50byBhY2NvdW50LiBUaGlzIGlzIHdoeVxuICAgKiB1c2luZyBgQmVoYXZpb3VyYWxTdWJqZWN0YCBpcyBwcmVmZXJyZWQuXG4gICAqXG4gICAqIEFsc28gbm90ZSB0aGF0IHdoZW4gc2VuZGluZyBhbiBvYnNlcnZhYmxlIGl0IGlzIHRyZWF0ZWQgYXMgXCJub3RpZmllclwiLCBkbyBub3Qgc2VuZCBjb2xkIG9ic2VydmFibGUgYXMgdGhleSBnZXQgc3Vic2NyaWJlZCB0by5cbiAgICogRm9yIGV4YW1wbGUsIHNlbmRpbmcgdGhlIHJldHVybmVkIHZhbHVlIGZyb20gYEh0dHBDbGllbnRgIHdpbGwgcHJvYmFibHkgcmVzdWx0IGluIDIgSFRUUCBjYWxscywgaWYgeW91IGFscmVhZHkgc3Vic2NyaWJlZCB0byBpdFxuICAgKiA+IFRoZSBkZWZhdWx0IHZhbHVlIGlzIGBhdXRvYCB3aGljaCBtZWFucyB0aGF0IGA8cGJsLW5ncmlkIGJsb2NrVWk+YCBpcyBzaW1pbGFyIHRvIGA8cGJsLW5ncmlkIGJsb2NrVWk9XCJhdXRvXCI+YFxuICAgKi9cbiAgQElucHV0KCkgZ2V0IGJsb2NrVWkoKTogYm9vbGVhbiB8ICdhdXRvJyB8IE9ic2VydmFibGU8Ym9vbGVhbj4geyByZXR1cm4gdGhpcy5fYmxvY2tVaTsgfVxuICBzZXQgYmxvY2tVaSh2YWx1ZTogYm9vbGVhbiB8ICdhdXRvJyB8IE9ic2VydmFibGU8Ym9vbGVhbj4pIHtcbiAgICBsZXQgY29lcmNlZDogYm9vbGVhbiB8ICdhdXRvJyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKGNvZXJjZWQgJiYgKHZhbHVlID09PSAnYXV0bycgfHwgKHZhbHVlIGFzIGFueSkgPT09ICcnKSkge1xuICAgICAgY29lcmNlZCA9ICdhdXRvJztcbiAgICB9XG5cbiAgICBpZiAoaXNPYnNlcnZhYmxlKHZhbHVlKSAmJiB0aGlzLl9ibG9ja1VpICE9PSB2YWx1ZSkge1xuICAgICAgaWYgKGlzT2JzZXJ2YWJsZSh0aGlzLl9ibG9ja1VpKSkge1xuICAgICAgICB1dGlscy51bnJ4LmtpbGwodGhpcywgdGhpcy5fYmxvY2tVaSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9ibG9ja1VpID0gdmFsdWU7XG4gICAgICB2YWx1ZS5waXBlKHV0aWxzLnVucngodGhpcywgdGhpcy5fYmxvY2tVaSkpLnN1YnNjcmliZSggc3RhdGUgPT4ge1xuICAgICAgICB0aGlzLl9ibG9ja0luUHJvZ3Jlc3MgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5zZXR1cEJsb2NrZXIoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fYmxvY2tVaSAhPT0gY29lcmNlZCkge1xuICAgICAgdGhpcy5fYmxvY2tVaSA9IGNvZXJjZWQ7XG4gICAgICBpZiAoY29lcmNlZCAhPT0gJ2F1dG8nKSB7XG4gICAgICAgIHRoaXMuX2Jsb2NrSW5Qcm9ncmVzcyA9IGNvZXJjZWQ7XG4gICAgICAgIHRoaXMuc2V0dXBCbG9ja2VyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYmxvY2tJblByb2dyZXNzOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2Jsb2NrVWk6IGJvb2xlYW4gfCAnYXV0bycgfCBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwcml2YXRlIF9ibG9ja2VyRW1iZWRkZWRWUmVmOiBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjxUPikge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgZ3JpZC5yZWdpc3RyeS5jaGFuZ2VzLnN1YnNjcmliZSggY2hhbmdlcyA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGMgb2YgY2hhbmdlcykge1xuICAgICAgICBzd2l0Y2ggKGMudHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2Jsb2NrZXInOlxuICAgICAgICAgICAgdGhpcy5zZXR1cEJsb2NrZXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uRGF0YVNvdXJjZScpIHtcbiAgICAgICAgICBjb25zdCB7IHByZXYsIGN1cnIgfSA9IGV2ZW50O1xuICAgICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICB1dGlscy51bnJ4LmtpbGwodGhpcywgcHJldik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnIub25Tb3VyY2VDaGFuZ2luZ1xuICAgICAgICAgICAgLnBpcGUodXRpbHMudW5yeCh0aGlzLCBjdXJyKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2Jsb2NrVWkgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Jsb2NrSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cEJsb2NrZXIoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgY3Vyci5vblNvdXJjZUNoYW5nZWRcbiAgICAgICAgICAgIC5waXBlKHV0aWxzLnVucngodGhpcywgY3VycikpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9ibG9ja1VpID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja0luUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldHVwQmxvY2tlcigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHV0aWxzLnVucngua2lsbCh0aGlzKTtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy5ncmlkKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBCbG9ja2VyKCk6IHZvaWQge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fYmxvY2tJblByb2dyZXNzO1xuICAgIGlmIChzdGF0ZSkge1xuICAgICAgaWYgKCF0aGlzLl9ibG9ja2VyRW1iZWRkZWRWUmVmKSB7XG4gICAgICAgIGNvbnN0IGJsb2NrZXJUZW1wbGF0ZSA9IHRoaXMuZ3JpZC5yZWdpc3RyeS5nZXRTaW5nbGUoJ2Jsb2NrZXInKTtcbiAgICAgICAgaWYgKGJsb2NrZXJUZW1wbGF0ZSkge1xuICAgICAgICAgIHRoaXMuX2Jsb2NrZXJFbWJlZGRlZFZSZWYgPSB0aGlzLmdyaWQuY3JlYXRlVmlldygnYWZ0ZXJDb250ZW50JywgYmxvY2tlclRlbXBsYXRlLnRSZWYsIHsgJGltcGxpY2l0OiB0aGlzLmdyaWQgfSk7XG4gICAgICAgICAgdGhpcy5fYmxvY2tlckVtYmVkZGVkVlJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX2Jsb2NrZXJFbWJlZGRlZFZSZWYpIHtcbiAgICAgIHRoaXMuZ3JpZC5yZW1vdmVWaWV3KHRoaXMuX2Jsb2NrZXJFbWJlZGRlZFZSZWYsICdhZnRlckNvbnRlbnQnKTtcbiAgICAgIHRoaXMuX2Jsb2NrZXJFbWJlZGRlZFZSZWYgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=