/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isObservable, of as obsOf, from as obsFrom } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UnRx } from '@pebula/utils';
/** @type {?} */
export var LOCAL_COLUMN_DEF = Symbol('LOCAL_COLUMN_DEF');
/** @type {?} */
export var VIRTUAL_REFRESH = {};
var TransposeTableSession = /** @class */ (function () {
    function TransposeTableSession(table, pluginCtrl, updateColumns, sourceFactoryWrapper) {
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
    TransposeTableSession.prototype.destroy = /**
     * @param {?} updateTable
     * @return {?}
     */
    function (updateTable) {
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
    };
    /**
     * @private
     * @return {?}
     */
    TransposeTableSession.prototype.init = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.headerRow = this.table.showHeader;
        this.table.showHeader = false;
        this.pluginCtrl.events
            .pipe(UnRx(this, this.table))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.kind === 'onInvalidateHeaders' && _this.onInvalidateHeaders(); }));
        this.pluginCtrl.events
            .pipe(UnRx(this, this.table))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.kind === 'onDataSource' && _this.onDataSource(e.curr); }));
    };
    /**
     * @private
     * @return {?}
     */
    TransposeTableSession.prototype.onInvalidateHeaders = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.table.columns[LOCAL_COLUMN_DEF]) {
            this.columnsInput = this.table.columns;
            this.storeColumns = this.table.columnApi.visibleColumns;
            this.updateColumns();
        }
    };
    /**
     * @private
     * @param {?=} ds
     * @return {?}
     */
    TransposeTableSession.prototype.onDataSource = /**
     * @private
     * @param {?=} ds
     * @return {?}
     */
    function (ds) {
        var _this = this;
        this.unPatchDataSource();
        if (ds) {
            this.ds = ds;
            this.dsSourceFactory = ds.adapter.sourceFactory;
            this.ds.adapter.sourceFactory = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var rawSource = event.data.changed && event.data.curr === VIRTUAL_REFRESH
                    ? _this.ds.source
                    : _this.dsSourceFactory(event);
                if (rawSource === false) {
                    return rawSource;
                }
                else if (_this.destroyed) {
                    _this.unPatchDataSource();
                    return _this.rawSource;
                }
                /** @type {?} */
                var obs = isObservable(rawSource)
                    ? rawSource
                    : Array.isArray(rawSource) ? obsOf(rawSource) : obsFrom(rawSource) // promise...
                ;
                return obs
                    .pipe(tap((/**
                 * @param {?} source
                 * @return {?}
                 */
                function (source) { return _this.rawSource = source; })), map(_this.sourceFactoryWrapper));
            });
        }
    };
    /**
     * @private
     * @return {?}
     */
    TransposeTableSession.prototype.unPatchDataSource = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.ds) {
            this.ds.adapter.sourceFactory = this.dsSourceFactory;
            this.ds = this.dsSourceFactory = undefined;
        }
    };
    return TransposeTableSession;
}());
export { TransposeTableSession };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3NlLXRhYmxlLXNlc3Npb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RyYW5zcG9zZS8iLCJzb3VyY2VzIjpbImxpYi90cmFuc3Bvc2UtdGFibGUtc2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLFlBQVksRUFBRSxFQUFFLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVVyQyxNQUFNLEtBQU8sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDOztBQUMxRCxNQUFNLEtBQU8sZUFBZSxHQUFHLEVBQUU7QUFFakM7SUFVRSwrQkFBb0IsS0FBNkIsRUFDN0IsVUFBb0MsRUFDcEMsYUFBeUIsRUFDekIsb0JBQStDO1FBSC9DLFVBQUssR0FBTCxLQUFLLENBQXdCO1FBQzdCLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUFZO1FBQ3pCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBMkI7UUFDakUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDOUQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDNUI7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCx1Q0FBTzs7OztJQUFQLFVBQVEsV0FBb0I7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxD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LENBQUM7b0JBQ3BELENBQUMsQ0FBQyxTQUFTO29CQUNYLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQU0sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxhQUFhOztnQkFFdkYsT0FBTyxHQUFHO3FCQUNQLElBQUksQ0FDSCxHQUFHOzs7O2dCQUFFLFVBQUEsTUFBTSxJQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLEVBQXZCLENBQXVCLEVBQUUsRUFDeEMsR0FBRyxDQUFDLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUMvQixDQUFDO1lBQ04sQ0FBQyxDQUFBLENBQUE7U0FDRjtJQUNILENBQUM7Ozs7O0lBRU8saURBQWlCOzs7O0lBQXpCO1FBQ0UsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDckQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztTQUM1QztJQUNILENBQUM7SUFDSCw0QkFBQztBQUFELENBQUMsQUE1RkQsSUE0RkM7Ozs7SUEzRkMsZ0RBQXFCOztJQUNyQixtQ0FBdUI7O0lBQ3ZCLDZDQUEwQzs7SUFDMUMsNkNBQTBCOztJQUMxQiwwQ0FBbUI7Ozs7O0lBRW5CLDBDQUEyQjs7Ozs7SUFDM0IsMENBQXlCOzs7OztJQUViLHNDQUFxQzs7Ozs7SUFDckMsMkNBQTRDOzs7OztJQUM1Qyw4Q0FBaUM7Ozs7O0lBQ2pDLHFEQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIGlzT2JzZXJ2YWJsZSwgb2YgYXMgb2JzT2YsIGZyb20gYXMgb2JzRnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7XG4gIFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCxcbiAgUGJsTmdyaWRDb21wb25lbnQsXG4gIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcbiAgUGJsRGF0YVNvdXJjZSxcbiAgUGJsQ29sdW1uLFxuICBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudCxcbn0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmV4cG9ydCBjb25zdCBMT0NBTF9DT0xVTU5fREVGID0gU3ltYm9sKCdMT0NBTF9DT0xVTU5fREVGJyk7XG5leHBvcnQgY29uc3QgVklSVFVBTF9SRUZSRVNIID0ge307XG5cbmV4cG9ydCBjbGFzcyBUcmFuc3Bvc2VUYWJsZVNlc3Npb24ge1xuICBkc1NvdXJjZUZhY3Rvcnk6IGFueTtcbiAgZHM6IFBibERhdGFTb3VyY2U8YW55PjtcbiAgY29sdW1uc0lucHV0OiBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQ7XG4gIHN0b3JlQ29sdW1uczogUGJsQ29sdW1uW107XG4gIGhlYWRlclJvdzogYm9vbGVhbjtcblxuICBwcml2YXRlIGRlc3Ryb3llZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSByYXdTb3VyY2U6IGFueVtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHVwZGF0ZUNvbHVtbnM6ICgpID0+IHZvaWQsXG4gICAgICAgICAgICAgIHByaXZhdGUgc291cmNlRmFjdG9yeVdyYXBwZXI6IChyZXN1bHRzOiBhbnlbXSkgPT4gYW55W10pIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgICBpZiAodGFibGUuY29sdW1ucyAmJiB0YWJsZS5jb2x1bW5BcGkudmlzaWJsZUNvbHVtbnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5vbkludmFsaWRhdGVIZWFkZXJzKCk7XG4gICAgfVxuICAgIHRoaXMub25EYXRhU291cmNlKHRoaXMudGFibGUuZHMpO1xuICB9XG5cbiAgZGVzdHJveSh1cGRhdGVUYWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghdGhpcy5kZXN0cm95ZWQpIHtcbiAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgIFVuUngua2lsbCh0aGlzLCB0aGlzLnRhYmxlKTtcblxuICAgICAgdGhpcy50YWJsZS5zaG93SGVhZGVyID0gdGhpcy5oZWFkZXJSb3c7XG4gICAgICB0aGlzLnRhYmxlLmNvbHVtbnMgPSB0aGlzLmNvbHVtbnNJbnB1dDtcbiAgICAgIGlmICh1cGRhdGVUYWJsZSkge1xuICAgICAgICB0aGlzLnRhYmxlLmludmFsaWRhdGVDb2x1bW5zKCk7XG4gICAgICAgIHRoaXMudGFibGUuZHMucmVmcmVzaChWSVJUVUFMX1JFRlJFU0gpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmhlYWRlclJvdyA9IHRoaXMudGFibGUuc2hvd0hlYWRlcjtcbiAgICB0aGlzLnRhYmxlLnNob3dIZWFkZXIgPSBmYWxzZTtcbiAgICB0aGlzLnBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAucGlwZShVblJ4KHRoaXMsIHRoaXMudGFibGUpKVxuICAgICAgLnN1YnNjcmliZSggZSA9PiBlLmtpbmQgPT09ICdvbkludmFsaWRhdGVIZWFkZXJzJyAmJiB0aGlzLm9uSW52YWxpZGF0ZUhlYWRlcnMoKSApO1xuXG4gICAgdGhpcy5wbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgLnBpcGUoVW5SeCh0aGlzLCB0aGlzLnRhYmxlKSlcbiAgICAgIC5zdWJzY3JpYmUoIGUgPT4gZS5raW5kID09PSAnb25EYXRhU291cmNlJyAmJiB0aGlzLm9uRGF0YVNvdXJjZShlLmN1cnIpICk7XG4gIH1cblxuICBwcml2YXRlIG9uSW52YWxpZGF0ZUhlYWRlcnMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnRhYmxlLmNvbHVtbnNbTE9DQUxfQ09MVU1OX0RFRl0pIHtcbiAgICAgIHRoaXMuY29sdW1uc0lucHV0ID0gdGhpcy50YWJsZS5jb2x1bW5zO1xuICAgICAgdGhpcy5zdG9yZUNvbHVtbnMgPSB0aGlzLnRhYmxlLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1ucztcbiAgICAgIHRoaXMudXBkYXRlQ29sdW1ucygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25EYXRhU291cmNlKGRzPzogUGJsRGF0YVNvdXJjZSk6IHZvaWQge1xuICAgIHRoaXMudW5QYXRjaERhdGFTb3VyY2UoKTtcbiAgICBpZiAoZHMpIHtcbiAgICAgIHRoaXMuZHMgPSBkcztcbiAgICAgIHRoaXMuZHNTb3VyY2VGYWN0b3J5ID0gZHMuYWRhcHRlci5zb3VyY2VGYWN0b3J5O1xuICAgICAgdGhpcy5kcy5hZGFwdGVyLnNvdXJjZUZhY3RvcnkgPSAoZXZlbnQ6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlZEV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHJhd1NvdXJjZSA9IGV2ZW50LmRhdGEuY2hhbmdlZCAmJiBldmVudC5kYXRhLmN1cnIgPT09IFZJUlRVQUxfUkVGUkVTSFxuICAgICAgICAgID8gdGhpcy5kcy5zb3VyY2VcbiAgICAgICAgICA6IHRoaXMuZHNTb3VyY2VGYWN0b3J5KGV2ZW50KVxuICAgICAgICA7XG5cbiAgICAgICAgaWYgKHJhd1NvdXJjZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gcmF3U291cmNlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGVzdHJveWVkKSB7XG4gICAgICAgICAgdGhpcy51blBhdGNoRGF0YVNvdXJjZSgpO1xuICAgICAgICAgIHJldHVybiB0aGlzLnJhd1NvdXJjZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9iczogT2JzZXJ2YWJsZTxhbnlbXT4gPSBpc09ic2VydmFibGUocmF3U291cmNlKVxuICAgICAgICAgID8gcmF3U291cmNlXG4gICAgICAgICAgOiBBcnJheS5pc0FycmF5KHJhd1NvdXJjZSkgPyBvYnNPZjxhbnk+KHJhd1NvdXJjZSkgOiBvYnNGcm9tKHJhd1NvdXJjZSkgLy8gcHJvbWlzZS4uLlxuICAgICAgICA7XG4gICAgICAgIHJldHVybiBvYnNcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHRhcCggc291cmNlID0+IHRoaXMucmF3U291cmNlID0gc291cmNlICksXG4gICAgICAgICAgICBtYXAodGhpcy5zb3VyY2VGYWN0b3J5V3JhcHBlciksXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVuUGF0Y2hEYXRhU291cmNlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRzKSB7XG4gICAgICB0aGlzLmRzLmFkYXB0ZXIuc291cmNlRmFjdG9yeSA9IHRoaXMuZHNTb3VyY2VGYWN0b3J5O1xuICAgICAgdGhpcy5kcyA9IHRoaXMuZHNTb3VyY2VGYWN0b3J5ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufVxuIl19