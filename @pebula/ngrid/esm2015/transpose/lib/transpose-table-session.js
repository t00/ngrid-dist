/**
 * @fileoverview added by tsickle
 * Generated from: lib/transpose-table-session.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isObservable, of as obsOf, from as obsFrom } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { utils, } from '@pebula/ngrid';
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
            utils.unrx.kill(this, this.grid);
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
            .pipe(utils.unrx(this, this.grid))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => e.kind === 'onInvalidateHeaders' && this.onInvalidateHeaders()));
        this.pluginCtrl.events
            .pipe(utils.unrx(this, this.grid))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3NlLXRhYmxlLXNlc3Npb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RyYW5zcG9zZS8iLCJzb3VyY2VzIjpbImxpYi90cmFuc3Bvc2UtdGFibGUtc2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBYyxZQUFZLEVBQUUsRUFBRSxJQUFJLEtBQUssRUFBRSxJQUFJLElBQUksT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUMsT0FBTyxFQU9MLEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQzs7QUFFdkIsTUFBTSxPQUFPLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQzs7QUFDMUQsTUFBTSxPQUFPLGVBQWUsR0FBRyxFQUFFO0FBRWpDLE1BQU0sT0FBTyxxQkFBcUI7Ozs7Ozs7SUFVaEMsWUFBb0IsSUFBNEIsRUFDNUIsVUFBb0MsRUFDcEMsYUFBeUIsRUFDekIsb0JBQStDO1FBSC9DLFNBQUksR0FBSixJQUFJLENBQXdCO1FBQzVCLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUFZO1FBQ3pCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBMkI7UUFDakUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDNUQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDNUI7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsV0FBb0I7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVB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LFNBQVM7b0JBQ1gsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBTSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGFBQWE7O2dCQUV2RixPQUFPLEdBQUc7cUJBQ1AsSUFBSSxDQUNILEdBQUc7Ozs7Z0JBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sRUFBRSxFQUN4QyxHQUFHLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQy9CLENBQUM7WUFDTixDQUFDLENBQUEsQ0FBQTtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxpQkFBaUI7UUFDdkIsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDckQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztTQUM1QztJQUNILENBQUM7Q0FDRjs7O0lBM0ZDLGdEQUFxQjs7SUFDckIsbUNBQXVCOztJQUN2Qiw2Q0FBMEM7O0lBQzFDLDZDQUEwQjs7SUFDMUIsMENBQW1COzs7OztJQUVuQiwwQ0FBMkI7Ozs7O0lBQzNCLDBDQUF5Qjs7Ozs7SUFFYixxQ0FBb0M7Ozs7O0lBQ3BDLDJDQUE0Qzs7Ozs7SUFDNUMsOENBQWlDOzs7OztJQUNqQyxxREFBdUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBpc09ic2VydmFibGUsIG9mIGFzIG9ic09mLCBmcm9tIGFzIG9ic0Zyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQsXG4gIFBibE5ncmlkQ29tcG9uZW50LFxuICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gIFBibERhdGFTb3VyY2UsXG4gIFBibENvbHVtbixcbiAgUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQsXG4gIHV0aWxzLFxufSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuZXhwb3J0IGNvbnN0IExPQ0FMX0NPTFVNTl9ERUYgPSBTeW1ib2woJ0xPQ0FMX0NPTFVNTl9ERUYnKTtcbmV4cG9ydCBjb25zdCBWSVJUVUFMX1JFRlJFU0ggPSB7fTtcblxuZXhwb3J0IGNsYXNzIFRyYW5zcG9zZVRhYmxlU2Vzc2lvbiB7XG4gIGRzU291cmNlRmFjdG9yeTogYW55O1xuICBkczogUGJsRGF0YVNvdXJjZTxhbnk+O1xuICBjb2x1bW5zSW5wdXQ6IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldDtcbiAgc3RvcmVDb2x1bW5zOiBQYmxDb2x1bW5bXTtcbiAgaGVhZGVyUm93OiBib29sZWFuO1xuXG4gIHByaXZhdGUgZGVzdHJveWVkOiBib29sZWFuO1xuICBwcml2YXRlIHJhd1NvdXJjZTogYW55W107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LFxuICAgICAgICAgICAgICBwcml2YXRlIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB1cGRhdGVDb2x1bW5zOiAoKSA9PiB2b2lkLFxuICAgICAgICAgICAgICBwcml2YXRlIHNvdXJjZUZhY3RvcnlXcmFwcGVyOiAocmVzdWx0czogYW55W10pID0+IGFueVtdKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgaWYgKGdyaWQuY29sdW1ucyAmJiBncmlkLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1ucy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLm9uSW52YWxpZGF0ZUhlYWRlcnMoKTtcbiAgICB9XG4gICAgdGhpcy5vbkRhdGFTb3VyY2UodGhpcy5ncmlkLmRzKTtcbiAgfVxuXG4gIGRlc3Ryb3kodXBkYXRlVGFibGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGVzdHJveWVkKSB7XG4gICAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgICB1dGlscy51bnJ4LmtpbGwodGhpcywgdGhpcy5ncmlkKTtcblxuICAgICAgdGhpcy5ncmlkLnNob3dIZWFkZXIgPSB0aGlzLmhlYWRlclJvdztcbiAgICAgIHRoaXMuZ3JpZC5jb2x1bW5zID0gdGhpcy5jb2x1bW5zSW5wdXQ7XG4gICAgICBpZiAodXBkYXRlVGFibGUpIHtcbiAgICAgICAgdGhpcy5ncmlkLmludmFsaWRhdGVDb2x1bW5zKCk7XG4gICAgICAgIHRoaXMuZ3JpZC5kcy5yZWZyZXNoKFZJUlRVQUxfUkVGUkVTSCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaGVhZGVyUm93ID0gdGhpcy5ncmlkLnNob3dIZWFkZXI7XG4gICAgdGhpcy5ncmlkLnNob3dIZWFkZXIgPSBmYWxzZTtcbiAgICB0aGlzLnBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAucGlwZSh1dGlscy51bnJ4KHRoaXMsIHRoaXMuZ3JpZCkpXG4gICAgICAuc3Vic2NyaWJlKCBlID0+IGUua2luZCA9PT0gJ29uSW52YWxpZGF0ZUhlYWRlcnMnICYmIHRoaXMub25JbnZhbGlkYXRlSGVhZGVycygpICk7XG5cbiAgICB0aGlzLnBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAucGlwZSh1dGlscy51bnJ4KHRoaXMsIHRoaXMuZ3JpZCkpXG4gICAgICAuc3Vic2NyaWJlKCBlID0+IGUua2luZCA9PT0gJ29uRGF0YVNvdXJjZScgJiYgdGhpcy5vbkRhdGFTb3VyY2UoZS5jdXJyKSApO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkludmFsaWRhdGVIZWFkZXJzKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5ncmlkLmNvbHVtbnNbTE9DQUxfQ09MVU1OX0RFRl0pIHtcbiAgICAgIHRoaXMuY29sdW1uc0lucHV0ID0gdGhpcy5ncmlkLmNvbHVtbnM7XG4gICAgICB0aGlzLnN0b3JlQ29sdW1ucyA9IHRoaXMuZ3JpZC5jb2x1bW5BcGkudmlzaWJsZUNvbHVtbnM7XG4gICAgICB0aGlzLnVwZGF0ZUNvbHVtbnMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uRGF0YVNvdXJjZShkcz86IFBibERhdGFTb3VyY2UpOiB2b2lkIHtcbiAgICB0aGlzLnVuUGF0Y2hEYXRhU291cmNlKCk7XG4gICAgaWYgKGRzKSB7XG4gICAgICB0aGlzLmRzID0gZHM7XG4gICAgICB0aGlzLmRzU291cmNlRmFjdG9yeSA9IGRzLmFkYXB0ZXIuc291cmNlRmFjdG9yeTtcbiAgICAgIHRoaXMuZHMuYWRhcHRlci5zb3VyY2VGYWN0b3J5ID0gKGV2ZW50OiBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCByYXdTb3VyY2UgPSBldmVudC5kYXRhLmNoYW5nZWQgJiYgZXZlbnQuZGF0YS5jdXJyID09PSBWSVJUVUFMX1JFRlJFU0hcbiAgICAgICAgICA/IHRoaXMuZHMuc291cmNlXG4gICAgICAgICAgOiB0aGlzLmRzU291cmNlRmFjdG9yeShldmVudClcbiAgICAgICAgO1xuXG4gICAgICAgIGlmIChyYXdTb3VyY2UgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuIHJhd1NvdXJjZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRlc3Ryb3llZCkge1xuICAgICAgICAgIHRoaXMudW5QYXRjaERhdGFTb3VyY2UoKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yYXdTb3VyY2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvYnM6IE9ic2VydmFibGU8YW55W10+ID0gaXNPYnNlcnZhYmxlKHJhd1NvdXJjZSlcbiAgICAgICAgICA/IHJhd1NvdXJjZVxuICAgICAgICAgIDogQXJyYXkuaXNBcnJheShyYXdTb3VyY2UpID8gb2JzT2Y8YW55PihyYXdTb3VyY2UpIDogb2JzRnJvbShyYXdTb3VyY2UpIC8vIHByb21pc2UuLi5cbiAgICAgICAgO1xuICAgICAgICByZXR1cm4gb2JzXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB0YXAoIHNvdXJjZSA9PiB0aGlzLnJhd1NvdXJjZSA9IHNvdXJjZSApLFxuICAgICAgICAgICAgbWFwKHRoaXMuc291cmNlRmFjdG9yeVdyYXBwZXIpLFxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1blBhdGNoRGF0YVNvdXJjZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kcykge1xuICAgICAgdGhpcy5kcy5hZGFwdGVyLnNvdXJjZUZhY3RvcnkgPSB0aGlzLmRzU291cmNlRmFjdG9yeTtcbiAgICAgIHRoaXMuZHMgPSB0aGlzLmRzU291cmNlRmFjdG9yeSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==