/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isObservable, of as obsOf, from as obsFrom } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UnRx } from '@pebula/utils';
/** @type {?} */
export const LOCAL_COLUMN_DEF = Symbol('LOCAL_COLUMN_DEF');
/** @type {?} */
export const VIRTUAL_REFRESH = {};
export class TransposeTableSession {
    /**
     * @param {?} grid
     * @param {?} pluginCtrl
     * @param {?} updateColumns
     * @param {?} sourceFactoryWrapper
     */
    constructor(grid, pluginCtrl, updateColumns, sourceFactoryWrapper) {
        this.grid = grid;
        this.pluginCtrl = pluginCtrl;
        this.updateColumns = updateColumns;
        this.sourceFactoryWrapper = sourceFactoryWrapper;
        this.init();
        if (grid.columns && grid.columnApi.visibleColumns.length > 0) {
            this.onInvalidateHeaders();
        }
        this.onDataSource(this.grid.ds);
    }
    /**
     * @param {?} updateTable
     * @return {?}
     */
    destroy(updateTable) {
        if (!this.destroyed) {
            this.destroyed = true;
            UnRx.kill(this, this.grid);
            this.grid.showHeader = this.headerRow;
            this.grid.columns = this.columnsInput;
            if (updateTable) {
                this.grid.invalidateColumns();
                this.grid.ds.refresh(VIRTUAL_REFRESH);
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    init() {
        this.headerRow = this.grid.showHeader;
        this.grid.showHeader = false;
        this.pluginCtrl.events
            .pipe(UnRx(this, this.grid))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => e.kind === 'onInvalidateHeaders' && this.onInvalidateHeaders()));
        this.pluginCtrl.events
            .pipe(UnRx(this, this.grid))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => e.kind === 'onDataSource' && this.onDataSource(e.curr)));
    }
    /**
     * @private
     * @return {?}
     */
    onInvalidateHeaders() {
        if (!this.grid.columns[LOCAL_COLUMN_DEF]) {
            this.columnsInput = this.grid.columns;
            this.storeColumns = this.grid.columnApi.visibleColumns;
            this.updateColumns();
        }
    }
    /**
     * @private
     * @param {?=} ds
     * @return {?}
     */
    onDataSource(ds) {
        this.unPatchDataSource();
        if (ds) {
            this.ds = ds;
            this.dsSourceFactory = ds.adapter.sourceFactory;
            this.ds.adapter.sourceFactory = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                /** @type {?} */
                const rawSource = event.data.changed && event.data.curr === VIRTUAL_REFRESH
                    ? this.ds.source
                    : this.dsSourceFactory(event);
                if (rawSource === false) {
                    return rawSource;
                }
                else if (this.destroyed) {
                    this.unPatchDataSource();
                    return this.rawSource;
                }
                /** @type {?} */
                const obs = isObservable(rawSource)
                    ? rawSource
                    : Array.isArray(rawSource) ? obsOf(rawSource) : obsFrom(rawSource) // promise...
                ;
                return obs
                    .pipe(tap((/**
                 * @param {?} source
                 * @return {?}
                 */
                source => this.rawSource = source)), map(this.sourceFactoryWrapper));
            });
        }
    }
    /**
     * @private
     * @return {?}
     */
    unPatchDataSource() {
        if (this.ds) {
            this.ds.adapter.sourceFactory = this.dsSourceFactory;
            this.ds = this.dsSourceFactory = undefined;
        }
    }
}
if (false) {
    /** @type {?} */
    TransposeTableSession.prototype.dsSourceFactory;
    /** @type {?} */
    TransposeTableSession.prototype.ds;
    /** @type {?} */
    TransposeTableSession.prototype.columnsInput;
    /** @type {?} */
    TransposeTableSession.prototype.storeColumns;
    /** @type {?} */
    TransposeTableSession.prototype.headerRow;
    /**
     * @type {?}
     * @private
     */
    TransposeTableSession.prototype.destroyed;
    /**
     * @type {?}
     * @private
     */
    TransposeTableSession.prototype.rawSource;
    /**
     * @type {?}
     * @private
     */
    TransposeTableSession.prototype.grid;
    /**
     * @type {?}
     * @private
     */
    TransposeTableSession.prototype.pluginCtrl;
    /**
     * @type {?}
     * @private
     */
    TransposeTableSession.prototype.updateColumns;
    /**
     * @type {?}
     * @private
     */
    TransposeTableSession.prototype.sourceFactoryWrapper;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3NlLXRhYmxlLXNlc3Npb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RyYW5zcG9zZS8iLCJzb3VyY2VzIjpbImxpYi90cmFuc3Bvc2UtdGFibGUtc2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLFlBQVksRUFBRSxFQUFFLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVVyQyxNQUFNLE9BQU8sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDOztBQUMxRCxNQUFNLE9BQU8sZUFBZSxHQUFHLEVBQUU7QUFFakMsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7OztJQVVoQyxZQUFvQixJQUE0QixFQUM1QixVQUFvQyxFQUNwQyxhQUF5QixFQUN6QixvQkFBK0M7UUFIL0MsU0FBSSxHQUFKLElBQUksQ0FBd0I7UUFDNUIsZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFDcEMsa0JBQWEsR0FBYixhQUFhLENBQVk7UUFDekIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUEyQjtRQUNqRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM1RCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM1QjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxXQUFvQjtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFB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LE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFNLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYTs7Z0JBRXZGLE9BQU8sR0FBRztxQkFDUCxJQUFJLENBQ0gsR0FBRzs7OztnQkFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxFQUFFLEVBQ3hDLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FDL0IsQ0FBQztZQUNOLENBQUMsQ0FBQSxDQUFBO1NBQ0Y7SUFDSCxDQUFDOzs7OztJQUVPLGlCQUFpQjtRQUN2QixJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUNyRCxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztDQUNGOzs7SUEzRkMsZ0RBQXFCOztJQUNyQixtQ0FBdUI7O0lBQ3ZCLDZDQUEwQzs7SUFDMUMsNkNBQTBCOztJQUMxQiwwQ0FBbUI7Ozs7O0lBRW5CLDBDQUEyQjs7Ozs7SUFDM0IsMENBQXlCOzs7OztJQUViLHFDQUFvQzs7Ozs7SUFDcEMsMkNBQTRDOzs7OztJQUM1Qyw4Q0FBaUM7Ozs7O0lBQ2pDLHFEQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIGlzT2JzZXJ2YWJsZSwgb2YgYXMgb2JzT2YsIGZyb20gYXMgb2JzRnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7XG4gIFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCxcbiAgUGJsTmdyaWRDb21wb25lbnQsXG4gIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcbiAgUGJsRGF0YVNvdXJjZSxcbiAgUGJsQ29sdW1uLFxuICBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudCxcbn0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmV4cG9ydCBjb25zdCBMT0NBTF9DT0xVTU5fREVGID0gU3ltYm9sKCdMT0NBTF9DT0xVTU5fREVGJyk7XG5leHBvcnQgY29uc3QgVklSVFVBTF9SRUZSRVNIID0ge307XG5cbmV4cG9ydCBjbGFzcyBUcmFuc3Bvc2VUYWJsZVNlc3Npb24ge1xuICBkc1NvdXJjZUZhY3Rvcnk6IGFueTtcbiAgZHM6IFBibERhdGFTb3VyY2U8YW55PjtcbiAgY29sdW1uc0lucHV0OiBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQ7XG4gIHN0b3JlQ29sdW1uczogUGJsQ29sdW1uW107XG4gIGhlYWRlclJvdzogYm9vbGVhbjtcblxuICBwcml2YXRlIGRlc3Ryb3llZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSByYXdTb3VyY2U6IGFueVtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgdXBkYXRlQ29sdW1uczogKCkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzb3VyY2VGYWN0b3J5V3JhcHBlcjogKHJlc3VsdHM6IGFueVtdKSA9PiBhbnlbXSkge1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIGlmIChncmlkLmNvbHVtbnMgJiYgZ3JpZC5jb2x1bW5BcGkudmlzaWJsZUNvbHVtbnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5vbkludmFsaWRhdGVIZWFkZXJzKCk7XG4gICAgfVxuICAgIHRoaXMub25EYXRhU291cmNlKHRoaXMuZ3JpZC5kcyk7XG4gIH1cblxuICBkZXN0cm95KHVwZGF0ZVRhYmxlOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRlc3Ryb3llZCkge1xuICAgICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgVW5SeC5raWxsKHRoaXMsIHRoaXMuZ3JpZCk7XG5cbiAgICAgIHRoaXMuZ3JpZC5zaG93SGVhZGVyID0gdGhpcy5oZWFkZXJSb3c7XG4gICAgICB0aGlzLmdyaWQuY29sdW1ucyA9IHRoaXMuY29sdW1uc0lucHV0O1xuICAgICAgaWYgKHVwZGF0ZVRhYmxlKSB7XG4gICAgICAgIHRoaXMuZ3JpZC5pbnZhbGlkYXRlQ29sdW1ucygpO1xuICAgICAgICB0aGlzLmdyaWQuZHMucmVmcmVzaChWSVJUVUFMX1JFRlJFU0gpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmhlYWRlclJvdyA9IHRoaXMuZ3JpZC5zaG93SGVhZGVyO1xuICAgIHRoaXMuZ3JpZC5zaG93SGVhZGVyID0gZmFsc2U7XG4gICAgdGhpcy5wbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgLnBpcGUoVW5SeCh0aGlzLCB0aGlzLmdyaWQpKVxuICAgICAgLnN1YnNjcmliZSggZSA9PiBlLmtpbmQgPT09ICdvbkludmFsaWRhdGVIZWFkZXJzJyAmJiB0aGlzLm9uSW52YWxpZGF0ZUhlYWRlcnMoKSApO1xuXG4gICAgdGhpcy5wbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgLnBpcGUoVW5SeCh0aGlzLCB0aGlzLmdyaWQpKVxuICAgICAgLnN1YnNjcmliZSggZSA9PiBlLmtpbmQgPT09ICdvbkRhdGFTb3VyY2UnICYmIHRoaXMub25EYXRhU291cmNlKGUuY3VycikgKTtcbiAgfVxuXG4gIHByaXZhdGUgb25JbnZhbGlkYXRlSGVhZGVycygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZ3JpZC5jb2x1bW5zW0xPQ0FMX0NPTFVNTl9ERUZdKSB7XG4gICAgICB0aGlzLmNvbHVtbnNJbnB1dCA9IHRoaXMuZ3JpZC5jb2x1bW5zO1xuICAgICAgdGhpcy5zdG9yZUNvbHVtbnMgPSB0aGlzLmdyaWQuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zO1xuICAgICAgdGhpcy51cGRhdGVDb2x1bW5zKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvbkRhdGFTb3VyY2UoZHM/OiBQYmxEYXRhU291cmNlKTogdm9pZCB7XG4gICAgdGhpcy51blBhdGNoRGF0YVNvdXJjZSgpO1xuICAgIGlmIChkcykge1xuICAgICAgdGhpcy5kcyA9IGRzO1xuICAgICAgdGhpcy5kc1NvdXJjZUZhY3RvcnkgPSBkcy5hZGFwdGVyLnNvdXJjZUZhY3Rvcnk7XG4gICAgICB0aGlzLmRzLmFkYXB0ZXIuc291cmNlRmFjdG9yeSA9IChldmVudDogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgcmF3U291cmNlID0gZXZlbnQuZGF0YS5jaGFuZ2VkICYmIGV2ZW50LmRhdGEuY3VyciA9PT0gVklSVFVBTF9SRUZSRVNIXG4gICAgICAgICAgPyB0aGlzLmRzLnNvdXJjZVxuICAgICAgICAgIDogdGhpcy5kc1NvdXJjZUZhY3RvcnkoZXZlbnQpXG4gICAgICAgIDtcblxuICAgICAgICBpZiAocmF3U291cmNlID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybiByYXdTb3VyY2U7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICAgICAgICB0aGlzLnVuUGF0Y2hEYXRhU291cmNlKCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucmF3U291cmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb2JzOiBPYnNlcnZhYmxlPGFueVtdPiA9IGlzT2JzZXJ2YWJsZShyYXdTb3VyY2UpXG4gICAgICAgICAgPyByYXdTb3VyY2VcbiAgICAgICAgICA6IEFycmF5LmlzQXJyYXkocmF3U291cmNlKSA/IG9ic09mPGFueT4ocmF3U291cmNlKSA6IG9ic0Zyb20ocmF3U291cmNlKSAvLyBwcm9taXNlLi4uXG4gICAgICAgIDtcbiAgICAgICAgcmV0dXJuIG9ic1xuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgdGFwKCBzb3VyY2UgPT4gdGhpcy5yYXdTb3VyY2UgPSBzb3VyY2UgKSxcbiAgICAgICAgICAgIG1hcCh0aGlzLnNvdXJjZUZhY3RvcnlXcmFwcGVyKSxcbiAgICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdW5QYXRjaERhdGFTb3VyY2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZHMpIHtcbiAgICAgIHRoaXMuZHMuYWRhcHRlci5zb3VyY2VGYWN0b3J5ID0gdGhpcy5kc1NvdXJjZUZhY3Rvcnk7XG4gICAgICB0aGlzLmRzID0gdGhpcy5kc1NvdXJjZUZhY3RvcnkgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=