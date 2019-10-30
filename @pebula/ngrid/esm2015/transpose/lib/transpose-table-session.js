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
     * @param {?} table
     * @param {?} pluginCtrl
     * @param {?} updateColumns
     * @param {?} sourceFactoryWrapper
     */
    constructor(table, pluginCtrl, updateColumns, sourceFactoryWrapper) {
        this.table = table;
        this.pluginCtrl = pluginCtrl;
        this.updateColumns = updateColumns;
        this.sourceFactoryWrapper = sourceFactoryWrapper;
        this.init();
        if (table.columns && table.columnApi.visibleColumns.length > 0) {
            this.onInvalidateHeaders();
        }
        this.onDataSource(this.table.ds);
    }
    /**
     * @param {?} updateTable
     * @return {?}
     */
    destroy(updateTable) {
        if (!this.destroyed) {
            this.destroyed = true;
            UnRx.kill(this, this.table);
            this.table.showHeader = this.headerRow;
            this.table.columns = this.columnsInput;
            if (updateTable) {
                this.table.invalidateColumns();
                this.table.ds.refresh(VIRTUAL_REFRESH);
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    init() {
        this.headerRow = this.table.showHeader;
        this.table.showHeader = false;
        this.pluginCtrl.events
            .pipe(UnRx(this, this.table))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => e.kind === 'onInvalidateHeaders' && this.onInvalidateHeaders()));
        this.pluginCtrl.events
            .pipe(UnRx(this, this.table))
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
        if (!this.table.columns[LOCAL_COLUMN_DEF]) {
            this.columnsInput = this.table.columns;
            this.storeColumns = this.table.columnApi.visibleColumns;
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
    TransposeTableSession.prototype.table;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3NlLXRhYmxlLXNlc3Npb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RyYW5zcG9zZS8iLCJzb3VyY2VzIjpbImxpYi90cmFuc3Bvc2UtdGFibGUtc2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLFlBQVksRUFBRSxFQUFFLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVVyQyxNQUFNLE9BQU8sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDOztBQUMxRCxNQUFNLE9BQU8sZUFBZSxHQUFHLEVBQUU7QUFFakMsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7OztJQVVoQyxZQUFvQixLQUE2QixFQUM3QixVQUFvQyxFQUNwQyxhQUF5QixFQUN6QixvQkFBK0M7UUFIL0MsVUFBSyxHQUFMLEtBQUssQ0FBd0I7UUFDN0IsZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFDcEMsa0JBQWEsR0FBYixhQUFhLENBQVk7UUFDekIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUEyQjtRQUNqRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM5RCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM1QjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxXQUFvQjtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFB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LE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFNLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYTs7Z0JBRXZGLE9BQU8sR0FBRztxQkFDUCxJQUFJLENBQ0gsR0FBRzs7OztnQkFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxFQUFFLEVBQ3hDLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FDL0IsQ0FBQztZQUNOLENBQUMsQ0FBQSxDQUFBO1NBQ0Y7SUFDSCxDQUFDOzs7OztJQUVPLGlCQUFpQjtRQUN2QixJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUNyRCxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztDQUNGOzs7SUEzRkMsZ0RBQXFCOztJQUNyQixtQ0FBdUI7O0lBQ3ZCLDZDQUEwQzs7SUFDMUMsNkNBQTBCOztJQUMxQiwwQ0FBbUI7Ozs7O0lBRW5CLDBDQUEyQjs7Ozs7SUFDM0IsMENBQXlCOzs7OztJQUViLHNDQUFxQzs7Ozs7SUFDckMsMkNBQTRDOzs7OztJQUM1Qyw4Q0FBaUM7Ozs7O0lBQ2pDLHFEQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIGlzT2JzZXJ2YWJsZSwgb2YgYXMgb2JzT2YsIGZyb20gYXMgb2JzRnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7XG4gIFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCxcbiAgUGJsTmdyaWRDb21wb25lbnQsXG4gIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcbiAgUGJsRGF0YVNvdXJjZSxcbiAgUGJsQ29sdW1uLFxuICBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudCxcbn0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmV4cG9ydCBjb25zdCBMT0NBTF9DT0xVTU5fREVGID0gU3ltYm9sKCdMT0NBTF9DT0xVTU5fREVGJyk7XG5leHBvcnQgY29uc3QgVklSVFVBTF9SRUZSRVNIID0ge307XG5cbmV4cG9ydCBjbGFzcyBUcmFuc3Bvc2VUYWJsZVNlc3Npb24ge1xuICBkc1NvdXJjZUZhY3Rvcnk6IGFueTtcbiAgZHM6IFBibERhdGFTb3VyY2U8YW55PjtcbiAgY29sdW1uc0lucHV0OiBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQ7XG4gIHN0b3JlQ29sdW1uczogUGJsQ29sdW1uW107XG4gIGhlYWRlclJvdzogYm9vbGVhbjtcblxuICBwcml2YXRlIGRlc3Ryb3llZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSByYXdTb3VyY2U6IGFueVtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHVwZGF0ZUNvbHVtbnM6ICgpID0+IHZvaWQsXG4gICAgICAgICAgICAgIHByaXZhdGUgc291cmNlRmFjdG9yeVdyYXBwZXI6IChyZXN1bHRzOiBhbnlbXSkgPT4gYW55W10pIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgICBpZiAodGFibGUuY29sdW1ucyAmJiB0YWJsZS5jb2x1bW5BcGkudmlzaWJsZUNvbHVtbnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5vbkludmFsaWRhdGVIZWFkZXJzKCk7XG4gICAgfVxuICAgIHRoaXMub25EYXRhU291cmNlKHRoaXMudGFibGUuZHMpO1xuICB9XG5cbiAgZGVzdHJveSh1cGRhdGVUYWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghdGhpcy5kZXN0cm95ZWQpIHtcbiAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgIFVuUngua2lsbCh0aGlzLCB0aGlzLnRhYmxlKTtcblxuICAgICAgdGhpcy50YWJsZS5zaG93SGVhZGVyID0gdGhpcy5oZWFkZXJSb3c7XG4gICAgICB0aGlzLnRhYmxlLmNvbHVtbnMgPSB0aGlzLmNvbHVtbnNJbnB1dDtcbiAgICAgIGlmICh1cGRhdGVUYWJsZSkge1xuICAgICAgICB0aGlzLnRhYmxlLmludmFsaWRhdGVDb2x1bW5zKCk7XG4gICAgICAgIHRoaXMudGFibGUuZHMucmVmcmVzaChWSVJUVUFMX1JFRlJFU0gpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmhlYWRlclJvdyA9IHRoaXMudGFibGUuc2hvd0hlYWRlcjtcbiAgICB0aGlzLnRhYmxlLnNob3dIZWFkZXIgPSBmYWxzZTtcbiAgICB0aGlzLnBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAucGlwZShVblJ4KHRoaXMsIHRoaXMudGFibGUpKVxuICAgICAgLnN1YnNjcmliZSggZSA9PiBlLmtpbmQgPT09ICdvbkludmFsaWRhdGVIZWFkZXJzJyAmJiB0aGlzLm9uSW52YWxpZGF0ZUhlYWRlcnMoKSApO1xuXG4gICAgdGhpcy5wbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgLnBpcGUoVW5SeCh0aGlzLCB0aGlzLnRhYmxlKSlcbiAgICAgIC5zdWJzY3JpYmUoIGUgPT4gZS5raW5kID09PSAnb25EYXRhU291cmNlJyAmJiB0aGlzLm9uRGF0YVNvdXJjZShlLmN1cnIpICk7XG4gIH1cblxuICBwcml2YXRlIG9uSW52YWxpZGF0ZUhlYWRlcnMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnRhYmxlLmNvbHVtbnNbTE9DQUxfQ09MVU1OX0RFRl0pIHtcbiAgICAgIHRoaXMuY29sdW1uc0lucHV0ID0gdGhpcy50YWJsZS5jb2x1bW5zO1xuICAgICAgdGhpcy5zdG9yZUNvbHVtbnMgPSB0aGlzLnRhYmxlLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1ucztcbiAgICAgIHRoaXMudXBkYXRlQ29sdW1ucygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25EYXRhU291cmNlKGRzPzogUGJsRGF0YVNvdXJjZSk6IHZvaWQge1xuICAgIHRoaXMudW5QYXRjaERhdGFTb3VyY2UoKTtcbiAgICBpZiAoZHMpIHtcbiAgICAgIHRoaXMuZHMgPSBkcztcbiAgICAgIHRoaXMuZHNTb3VyY2VGYWN0b3J5ID0gZHMuYWRhcHRlci5zb3VyY2VGYWN0b3J5O1xuICAgICAgdGhpcy5kcy5hZGFwdGVyLnNvdXJjZUZhY3RvcnkgPSAoZXZlbnQ6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlZEV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHJhd1NvdXJjZSA9IGV2ZW50LmRhdGEuY2hhbmdlZCAmJiBldmVudC5kYXRhLmN1cnIgPT09IFZJUlRVQUxfUkVGUkVTSFxuICAgICAgICAgID8gdGhpcy5kcy5zb3VyY2VcbiAgICAgICAgICA6IHRoaXMuZHNTb3VyY2VGYWN0b3J5KGV2ZW50KVxuICAgICAgICA7XG5cbiAgICAgICAgaWYgKHJhd1NvdXJjZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gcmF3U291cmNlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGVzdHJveWVkKSB7XG4gICAgICAgICAgdGhpcy51blBhdGNoRGF0YVNvdXJjZSgpO1xuICAgICAgICAgIHJldHVybiB0aGlzLnJhd1NvdXJjZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9iczogT2JzZXJ2YWJsZTxhbnlbXT4gPSBpc09ic2VydmFibGUocmF3U291cmNlKVxuICAgICAgICAgID8gcmF3U291cmNlXG4gICAgICAgICAgOiBBcnJheS5pc0FycmF5KHJhd1NvdXJjZSkgPyBvYnNPZjxhbnk+KHJhd1NvdXJjZSkgOiBvYnNGcm9tKHJhd1NvdXJjZSkgLy8gcHJvbWlzZS4uLlxuICAgICAgICA7XG4gICAgICAgIHJldHVybiBvYnNcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHRhcCggc291cmNlID0+IHRoaXMucmF3U291cmNlID0gc291cmNlICksXG4gICAgICAgICAgICBtYXAodGhpcy5zb3VyY2VGYWN0b3J5V3JhcHBlciksXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVuUGF0Y2hEYXRhU291cmNlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRzKSB7XG4gICAgICB0aGlzLmRzLmFkYXB0ZXIuc291cmNlRmFjdG9yeSA9IHRoaXMuZHNTb3VyY2VGYWN0b3J5O1xuICAgICAgdGhpcy5kcyA9IHRoaXMuZHNTb3VyY2VGYWN0b3J5ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufVxuIl19