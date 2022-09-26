import { fromEvent, timer, ReplaySubject } from 'rxjs';
import { bufferWhen, debounce, map, filter, takeUntil } from 'rxjs/operators';
import { Directive, EventEmitter, Injector } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController, PblColumn } from '@pebula/ngrid';
import { matrixRowFromRow, isRowContainer, findCellRenderIndex, findParentCell } from './utils';
import { handleFocusAndSelection } from './focus-and-selection';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid";
export const PLUGIN_KEY = 'targetEvents';
function hasListeners(source) {
    return source.observers.length > 0;
}
function findEventSource(source) {
    const cellTarget = findParentCell(source.target);
    if (cellTarget) {
        return { type: 'cell', target: cellTarget };
    }
    else if (isRowContainer(source.target)) {
        return { type: 'cell', target: source.target };
    }
}
export function runOnce() {
    PblColumn.extendProperty('editable');
}
export class PblNgridTargetEventsPlugin {
    constructor(grid, injector, pluginCtrl) {
        this.grid = grid;
        this.injector = injector;
        this.pluginCtrl = pluginCtrl;
        this.rowClick = new EventEmitter();
        this.rowDblClick = new EventEmitter();
        this.rowEnter = new EventEmitter();
        this.rowLeave = new EventEmitter();
        this.cellClick = new EventEmitter();
        this.cellDblClick = new EventEmitter();
        this.cellEnter = new EventEmitter();
        this.cellLeave = new EventEmitter();
        this.mouseDown = new EventEmitter();
        this.mouseUp = new EventEmitter();
        this.keyUp = new EventEmitter();
        this.keyDown = new EventEmitter();
        this.destroyed = new ReplaySubject();
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        pluginCtrl.onInit().subscribe(() => this.init());
    }
    static create(table, injector) {
        const pluginCtrl = PblNgridPluginController.find(table);
        return new PblNgridTargetEventsPlugin(table, injector, pluginCtrl);
    }
    init() {
        this.setupDomEvents();
        handleFocusAndSelection(this);
    }
    setupDomEvents() {
        const grid = this.grid;
        const cdkTable = this.pluginCtrl.extApi.cdkTable;
        const cdkTableElement = cdkTable._element;
        const createCellEvent = (cellTarget, source) => {
            const rowTarget = cellTarget.parentElement;
            const matrixPoint = matrixRowFromRow(rowTarget, cdkTable._rowOutlet.viewContainer);
            if (matrixPoint) {
                const event = Object.assign(Object.assign({}, matrixPoint), { source, cellTarget, rowTarget });
                if (matrixPoint.type === 'data') {
                    event.row = grid.ds.renderedData[matrixPoint.rowIndex];
                }
                else if (event.subType === 'meta') {
                    // When multiple containers exists (fixed/sticky/row) the rowIndex we get is the one relative to the container..
                    // We need to find the rowIndex relative to the definitions:
                    const { metaRowService } = this.pluginCtrl.extApi.rowsApi;
                    const db = event.type === 'header' ? metaRowService.header : metaRowService.footer;
                    for (const coll of [db.fixed, db.row, db.sticky]) {
                        const result = coll.find(item => item.el === event.rowTarget);
                        if (result) {
                            event.rowIndex = result.index;
                            break;
                        }
                    }
                }
                /* `metadataFromElement()` does not provide column information nor the column itself. This will extend functionality to add the columnIndex and column.
                    The simple case is when `subType === 'data'`, in this case the column is always the data column for all types (header, data and footer)
        
                    If `subType !== 'data'` we need to get the proper column based type (type can only be `header` or `footer` at this point).
                    But that's not all, because `metadataFromElement()` does not handle `meta-group` subType we need to do it here...
                */
                event.colIndex = findCellRenderIndex(cellTarget);
                if (matrixPoint.subType === 'data') {
                    const column = this.grid.columnApi.findColumnAt(event.colIndex);
                    const columnIndex = this.grid.columnApi.indexOf(column);
                    event.column = column;
                    event.context = this.pluginCtrl.extApi.contextApi.getCell(event.rowIndex, columnIndex);
                    if (!event.context) {
                        this.pluginCtrl.extApi.contextApi.clear(true);
                        event.context = this.pluginCtrl.extApi.contextApi.getCell(event.rowIndex, columnIndex);
                    }
                }
                else {
                    const store = this.pluginCtrl.extApi.columnStore;
                    const rowInfo = (matrixPoint.type === 'header' ? store.metaHeaderRows : store.metaFooterRows)[event.rowIndex];
                    const record = store.find(rowInfo.keys[event.colIndex]);
                    if (rowInfo.isGroup) {
                        event.subType = 'meta-group';
                        event.column = matrixPoint.type === 'header' ? record.headerGroup : record.footerGroup;
                    }
                    else {
                        event.column = matrixPoint.type === 'header' ? record.header : record.footer;
                    }
                }
                return event;
            }
        };
        const createRowEvent = (rowTarget, source, root) => {
            if (root) {
                const event = {
                    source,
                    rowTarget,
                    type: root.type,
                    subType: root.subType,
                    rowIndex: root.rowIndex,
                    root
                };
                if (root.type === 'data') {
                    event.row = root.row;
                    event.context = root.context.rowContext;
                }
                return event;
            }
            else {
                const matrixPoint = matrixRowFromRow(rowTarget, cdkTable._rowOutlet.viewContainer);
                if (matrixPoint) {
                    const event = Object.assign(Object.assign({}, matrixPoint), { source, rowTarget });
                    if (matrixPoint.type === 'data') {
                        const row = this.pluginCtrl.extApi.contextApi.getRow(matrixPoint.rowIndex);
                        if (!row) {
                            return undefined;
                        }
                        event.context = row;
                        event.row = row.$implicit;
                    }
                    /*  If `subType !== 'data'` it can only be `meta` because `metadataFromElement()` does not handle `meta-group` subType.
                        We need to extend this missing part, we don't have columns here so we will try to infer it using the first column.
          
                        It's similar to how it's handled in cell clicks, but here we don't need to extends the column info.
                        We only need to change the `subType` when the row is a group row, getting a specific column is irrelevant.
                        We just need A column because group columns don't mix with regular meta columns.
          
                        NOTE: When subType is not 'data' the ype can only be `header` or `footer`.
                    */
                    if (matrixPoint.subType !== 'data') {
                        const store = this.pluginCtrl.extApi.columnStore;
                        const rowInfo = (matrixPoint.type === 'header' ? store.metaHeaderRows : store.metaFooterRows)[event.rowIndex];
                        if (rowInfo.isGroup) {
                            event.subType = 'meta-group';
                        }
                    }
                    return event;
                }
            }
        };
        let lastCellEnterEvent;
        let lastRowEnterEvent;
        const emitCellLeave = (source) => {
            if (lastCellEnterEvent) {
                const lastCellEnterEventTemp = lastCellEnterEvent;
                this.cellLeave.emit(Object.assign({}, lastCellEnterEventTemp, { source }));
                lastCellEnterEvent = undefined;
                return lastCellEnterEventTemp;
            }
        };
        const emitRowLeave = (source) => {
            if (lastRowEnterEvent) {
                const lastRowEnterEventTemp = lastRowEnterEvent;
                this.rowLeave.emit(Object.assign({}, lastRowEnterEventTemp, { source }));
                lastRowEnterEvent = undefined;
                return lastRowEnterEventTemp;
            }
        };
        const processEvent = (e) => {
            const result = findEventSource(e);
            if (result) {
                if (result.type === 'cell') {
                    const event = createCellEvent(result.target, e);
                    if (event) {
                        return {
                            type: result.type,
                            event,
                            waitTime: hasListeners(this.cellDblClick) ? 250 : 1,
                        };
                    }
                }
                else if (result.type === 'row') {
                    const event = createRowEvent(result.target, e);
                    if (event) {
                        return {
                            type: result.type,
                            event,
                            waitTime: hasListeners(this.rowDblClick) ? 250 : 1,
                        };
                    }
                }
            }
        };
        /** Split the result of processEvent into cell and row events, if type is row only row event is returned, if cell then cell is returned and row is created along side. */
        const splitProcessedEvent = (event) => {
            const cellEvent = event.type === 'cell' ? event.event : undefined;
            const rowEvent = cellEvent
                ? createRowEvent(cellEvent.rowTarget, cellEvent.source, cellEvent)
                : event.event;
            return { cellEvent, rowEvent };
        };
        const registerUpDownEvents = (eventName, emitter) => {
            fromEvent(cdkTableElement, eventName)
                .pipe(takeUntil(this.destroyed), filter(source => hasListeners(emitter)), map(processEvent), filter(result => !!result))
                .subscribe(result => {
                const { cellEvent, rowEvent } = splitProcessedEvent(result);
                emitter.emit(cellEvent || rowEvent);
                this.syncRow(cellEvent || rowEvent);
            });
        };
        registerUpDownEvents('mouseup', this.mouseUp);
        registerUpDownEvents('mousedown', this.mouseDown);
        registerUpDownEvents('keyup', this.keyUp);
        registerUpDownEvents('keydown', this.keyDown);
        /*
          Handling click stream for both click and double click events.
          We want to detect double clicks and clicks with minimal delays
          We check if a double click has listeners, if not we won't delay the click...
          TODO: on double click, don't wait the whole 250 ms if 2 clicks happen.
        */
        const clickStream = fromEvent(cdkTableElement, 'click').pipe(takeUntil(this.destroyed), filter(source => hasListeners(this.cellClick) || hasListeners(this.cellDblClick) || hasListeners(this.rowClick) || hasListeners(this.rowDblClick)), map(processEvent), filter(result => !!result));
        clickStream
            .pipe(bufferWhen(() => clickStream.pipe(debounce(e => timer(e.waitTime)))), filter(events => events.length > 0))
            .subscribe(events => {
            const event = events.shift();
            const isDoubleClick = events.length === 1; // if we have 2 events its double click, otherwise single.
            const { cellEvent, rowEvent } = splitProcessedEvent(event);
            if (isDoubleClick) {
                if (cellEvent) {
                    this.cellDblClick.emit(cellEvent);
                }
                this.rowDblClick.emit(rowEvent);
            }
            else {
                if (cellEvent) {
                    this.cellClick.emit(cellEvent);
                }
                this.rowClick.emit(rowEvent);
            }
            this.syncRow(cellEvent || rowEvent);
        });
        fromEvent(cdkTableElement, 'mouseleave')
            .pipe(takeUntil(this.destroyed))
            .subscribe((source) => {
            let lastEvent = emitCellLeave(source);
            lastEvent = emitRowLeave(source) || lastEvent;
            if (lastEvent) {
                this.syncRow(lastEvent);
            }
        });
        fromEvent(cdkTableElement, 'mousemove')
            .pipe(takeUntil(this.destroyed))
            .subscribe((source) => {
            const cellTarget = findParentCell(source.target);
            const lastCellTarget = lastCellEnterEvent && lastCellEnterEvent.cellTarget;
            const lastRowTarget = lastRowEnterEvent && lastRowEnterEvent.rowTarget;
            let cellEvent;
            let lastEvent;
            if (lastCellTarget !== cellTarget) {
                lastEvent = emitCellLeave(source) || lastEvent;
            }
            if (cellTarget) {
                if (lastCellTarget !== cellTarget) {
                    cellEvent = createCellEvent(cellTarget, source);
                    if (cellEvent) {
                        this.cellEnter.emit(lastCellEnterEvent = cellEvent);
                    }
                }
                else {
                    return;
                }
            }
            const rowTarget = (cellEvent && cellEvent.rowTarget) || (isRowContainer(source.target) && source.target);
            if (lastRowTarget !== rowTarget) {
                lastEvent = emitRowLeave(source) || lastEvent;
            }
            if (rowTarget) {
                if (lastRowTarget !== rowTarget) {
                    const rowEvent = createRowEvent(rowTarget, source, cellEvent);
                    if (rowEvent) {
                        this.rowEnter.emit(lastRowEnterEvent = rowEvent);
                    }
                }
            }
            if (lastEvent) {
                this.syncRow(lastEvent);
            }
        });
    }
    destroy() {
        this.destroyed.next();
        this.destroyed.complete();
        this._removePlugin(this.grid);
    }
    syncRow(event) {
        this.grid.rowsApi.syncRows(event.type, event.rowIndex);
    }
}
export class PblNgridTargetEventsPluginDirective extends PblNgridTargetEventsPlugin {
    constructor(table, injector, pluginCtrl) {
        super(table, injector, pluginCtrl);
    }
    ngOnDestroy() {
        this.destroy();
    }
}
/** @nocollapse */ PblNgridTargetEventsPluginDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridTargetEventsPluginDirective, deps: [{ token: i1.PblNgridComponent }, { token: i0.Injector }, { token: i1.PblNgridPluginController }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblNgridTargetEventsPluginDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridTargetEventsPluginDirective, selector: "pbl-ngrid[targetEvents], pbl-ngrid[rowClick], pbl-ngrid[rowDblClick], pbl-ngrid[rowEnter], pbl-ngrid[rowLeave], pbl-ngrid[cellClick], pbl-ngrid[cellDblClick], pbl-ngrid[cellEnter], pbl-ngrid[cellLeave], pbl-ngrid[keyDown], pbl-ngrid[keyUp]", outputs: { rowClick: "rowClick", rowDblClick: "rowDblClick", rowEnter: "rowEnter", rowLeave: "rowLeave", cellClick: "cellClick", cellDblClick: "cellDblClick", cellEnter: "cellEnter", cellLeave: "cellLeave", keyDown: "keyDown", keyUp: "keyUp" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridTargetEventsPluginDirective, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: 'pbl-ngrid[targetEvents], pbl-ngrid[rowClick], pbl-ngrid[rowDblClick], pbl-ngrid[rowEnter], pbl-ngrid[rowLeave], pbl-ngrid[cellClick], pbl-ngrid[cellDblClick], pbl-ngrid[cellEnter], pbl-ngrid[cellLeave], pbl-ngrid[keyDown], pbl-ngrid[keyUp]',
                    // tslint:disable-next-line:use-output-property-decorator
                    outputs: ['rowClick', 'rowDblClick', 'rowEnter', 'rowLeave', 'cellClick', 'cellDblClick', 'cellEnter', 'cellLeave', 'keyDown', 'keyUp']
                }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridComponent }, { type: i0.Injector }, { type: i1.PblNgridPluginController }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFyZ2V0LWV2ZW50cy1wbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL3RhcmdldC1ldmVudHMvc3JjL2xpYi90YXJnZXQtZXZlbnRzL3RhcmdldC1ldmVudHMtcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFZLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFhLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3ZGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7QUFvQmhFLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBbUIsY0FBYyxDQUFDO0FBRXpELFNBQVMsWUFBWSxDQUFDLE1BQXNDO0lBQzFELE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxNQUFhO0lBQ3BDLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBYSxDQUFDLENBQUM7SUFDeEQsSUFBSSxVQUFVLEVBQUU7UUFDZCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUM7S0FDN0M7U0FBTSxJQUFJLGNBQWMsQ0FB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dmVudCwgdGltZXIsIE9ic2VydmVyLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBidWZmZXJXaGVuLCBkZWJvdW5jZSwgbWFwLCBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibENvbHVtbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgKiBhcyBFdmVudHMgZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IHsgbWF0cml4Um93RnJvbVJvdywgaXNSb3dDb250YWluZXIsIGZpbmRDZWxsUmVuZGVySW5kZXgsIGZpbmRQYXJlbnRDZWxsIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBoYW5kbGVGb2N1c0FuZFNlbGVjdGlvbiB9IGZyb20gJy4vZm9jdXMtYW5kLXNlbGVjdGlvbic7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2NvcmUvbGliL2NvbmZpZ3VyYXRpb24vdHlwZScge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIHRhcmdldEV2ZW50cz86IHtcbiAgICAgIC8qKiBXaGVuIHNldCB0byB0cnVlIHdpbGwgZW5hYmxlIHRoZSB0YXJnZXQgZXZlbnRzIHBsdWdpbiBvbiBhbGwgdGFibGUgaW5zdGFuY2VzIGJ5IGRlZmF1bHQuICovXG4gICAgICBhdXRvRW5hYmxlPzogYm9vbGVhbjtcbiAgICB9O1xuICB9XG59XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICB0YXJnZXRFdmVudHM/OiBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbjtcbiAgfVxuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMge1xuICAgIHRhcmdldEV2ZW50czoga2V5b2YgdHlwZW9mIFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAndGFyZ2V0RXZlbnRzJyA9ICd0YXJnZXRFdmVudHMnO1xuXG5mdW5jdGlvbiBoYXNMaXN0ZW5lcnMoc291cmNlOiB7IG9ic2VydmVyczogT2JzZXJ2ZXI8YW55PltdIH0pOiBib29sZWFuIHtcbiAgcmV0dXJuIHNvdXJjZS5vYnNlcnZlcnMubGVuZ3RoID4gMDtcbn1cblxuZnVuY3Rpb24gZmluZEV2ZW50U291cmNlKHNvdXJjZTogRXZlbnQpOiB7IHR5cGU6ICdyb3cnIHwgJ2NlbGwnLCB0YXJnZXQ6IEhUTUxFbGVtZW50IH0gfCB1bmRlZmluZWQge1xuICBjb25zdCBjZWxsVGFyZ2V0ID0gZmluZFBhcmVudENlbGwoc291cmNlLnRhcmdldCBhcyBhbnkpO1xuICBpZiAoY2VsbFRhcmdldCkge1xuICAgIHJldHVybiB7IHR5cGU6ICdjZWxsJywgdGFyZ2V0OiBjZWxsVGFyZ2V0IH07XG4gIH0gZWxzZSBpZiAoaXNSb3dDb250YWluZXIoc291cmNlLnRhcmdldCBhcyBhbnkpKSB7XG4gICAgcmV0dXJuIHsgdHlwZTogJ2NlbGwnLCB0YXJnZXQ6IHNvdXJjZS50YXJnZXQgYXMgYW55IH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bk9uY2UoKTogdm9pZCB7XG4gIFBibENvbHVtbi5leHRlbmRQcm9wZXJ0eSgnZWRpdGFibGUnKTtcbn1cblxuZXhwb3J0IGNsYXNzIFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luPFQgPSBhbnk+IHtcbiAgcm93Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PigpO1xuICByb3dEYmxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG4gIHJvd0VudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4oKTtcbiAgcm93TGVhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PigpO1xuXG4gIGNlbGxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+PigpO1xuICBjZWxsRGJsQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBNb3VzZUV2ZW50Pj4oKTtcbiAgY2VsbEVudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4+KCk7XG4gIGNlbGxMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+PigpO1xuXG4gIG1vdXNlRG93biA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+IHwgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG4gIG1vdXNlVXAgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBNb3VzZUV2ZW50PiB8IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PigpO1xuICBrZXlVcCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIEtleWJvYXJkRXZlbnQ+IHwgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG4gIGtleURvd24gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBLZXlib2FyZEV2ZW50PiB8IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PigpO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBkZXN0cm95ZWQgPSBuZXcgUmVwbGF5U3ViamVjdDx2b2lkPigpO1xuXG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG4gICAgcGx1Z2luQ3RybC5vbkluaXQoKS5zdWJzY3JpYmUoICgpID0+IHRoaXMuaW5pdCgpICk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlPFQgPSBhbnk+KHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBpbmplY3RvcjogSW5qZWN0b3IpOiBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbjxUPiB7XG4gICAgY29uc3QgcGx1Z2luQ3RybCA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKHRhYmxlKTtcbiAgICByZXR1cm4gbmV3IFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luPFQ+KHRhYmxlLCBpbmplY3RvciwgcGx1Z2luQ3RybCk7XG4gIH1cblxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXR1cERvbUV2ZW50cygpO1xuICAgIGhhbmRsZUZvY3VzQW5kU2VsZWN0aW9uKHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cERvbUV2ZW50cygpOiB2b2lkIHtcbiAgICBjb25zdCBncmlkID0gdGhpcy5ncmlkO1xuICAgIGNvbnN0IGNka1RhYmxlID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jZGtUYWJsZTtcbiAgICBjb25zdCBjZGtUYWJsZUVsZW1lbnQgPSBjZGtUYWJsZS5fZWxlbWVudDtcblxuICAgIGNvbnN0IGNyZWF0ZUNlbGxFdmVudCA9IDxURXZlbnQgZXh0ZW5kcyBFdmVudD4oY2VsbFRhcmdldDogSFRNTEVsZW1lbnQsIHNvdXJjZTogVEV2ZW50KTogRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3Qgcm93VGFyZ2V0ID0gY2VsbFRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgICAgY29uc3QgbWF0cml4UG9pbnQgPSBtYXRyaXhSb3dGcm9tUm93KHJvd1RhcmdldCwgY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyKTtcbiAgICAgIGlmIChtYXRyaXhQb2ludCkge1xuICAgICAgICBjb25zdCBldmVudDogRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4gPSB7IC4uLm1hdHJpeFBvaW50LCBzb3VyY2UsIGNlbGxUYXJnZXQsIHJvd1RhcmdldCB9IGFzIGFueTtcbiAgICAgICAgaWYgKG1hdHJpeFBvaW50LnR5cGUgPT09ICdkYXRhJykge1xuICAgICAgICAgIChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4UG9pbnQ8VD4pLnJvdyA9IGdyaWQuZHMucmVuZGVyZWREYXRhW21hdHJpeFBvaW50LnJvd0luZGV4XTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5zdWJUeXBlID09PSAnbWV0YScpIHtcbiAgICAgICAgICAvLyBXaGVuIG11bHRpcGxlIGNvbnRhaW5lcnMgZXhpc3RzIChmaXhlZC9zdGlja3kvcm93KSB0aGUgcm93SW5kZXggd2UgZ2V0IGlzIHRoZSBvbmUgcmVsYXRpdmUgdG8gdGhlIGNvbnRhaW5lci4uXG4gICAgICAgICAgLy8gV2UgbmVlZCB0byBmaW5kIHRoZSByb3dJbmRleCByZWxhdGl2ZSB0byB0aGUgZGVmaW5pdGlvbnM6XG4gICAgICAgICAgY29uc3QgeyBtZXRhUm93U2VydmljZSB9ID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5yb3dzQXBpO1xuICAgICAgICAgIGNvbnN0IGRiID0gZXZlbnQudHlwZSA9PT0gJ2hlYWRlcicgPyBtZXRhUm93U2VydmljZS5oZWFkZXIgOiBtZXRhUm93U2VydmljZS5mb290ZXI7XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IGNvbGwgb2YgW2RiLmZpeGVkLCBkYi5yb3csIGRiLnN0aWNreV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvbGwuZmluZCggaXRlbSA9PiBpdGVtLmVsID09PSBldmVudC5yb3dUYXJnZXQgKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgZXZlbnQucm93SW5kZXggPSByZXN1bHQuaW5kZXg7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGBtZXRhZGF0YUZyb21FbGVtZW50KClgIGRvZXMgbm90IHByb3ZpZGUgY29sdW1uIGluZm9ybWF0aW9uIG5vciB0aGUgY29sdW1uIGl0c2VsZi4gVGhpcyB3aWxsIGV4dGVuZCBmdW5jdGlvbmFsaXR5IHRvIGFkZCB0aGUgY29sdW1uSW5kZXggYW5kIGNvbHVtbi5cbiAgICAgICAgICAgIFRoZSBzaW1wbGUgY2FzZSBpcyB3aGVuIGBzdWJUeXBlID09PSAnZGF0YSdgLCBpbiB0aGlzIGNhc2UgdGhlIGNvbHVtbiBpcyBhbHdheXMgdGhlIGRhdGEgY29sdW1uIGZvciBhbGwgdHlwZXMgKGhlYWRlciwgZGF0YSBhbmQgZm9vdGVyKVxuXG4gICAgICAgICAgICBJZiBgc3ViVHlwZSAhPT0gJ2RhdGEnYCB3ZSBuZWVkIHRvIGdldCB0aGUgcHJvcGVyIGNvbHVtbiBiYXNlZCB0eXBlICh0eXBlIGNhbiBvbmx5IGJlIGBoZWFkZXJgIG9yIGBmb290ZXJgIGF0IHRoaXMgcG9pbnQpLlxuICAgICAgICAgICAgQnV0IHRoYXQncyBub3QgYWxsLCBiZWNhdXNlIGBtZXRhZGF0YUZyb21FbGVtZW50KClgIGRvZXMgbm90IGhhbmRsZSBgbWV0YS1ncm91cGAgc3ViVHlwZSB3ZSBuZWVkIHRvIGRvIGl0IGhlcmUuLi5cbiAgICAgICAgKi9cbiAgICAgICAgZXZlbnQuY29sSW5kZXggPSBmaW5kQ2VsbFJlbmRlckluZGV4KGNlbGxUYXJnZXQpO1xuICAgICAgICBpZiAobWF0cml4UG9pbnQuc3ViVHlwZSA9PT0gJ2RhdGEnKSB7XG4gICAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5ncmlkLmNvbHVtbkFwaS5maW5kQ29sdW1uQXQoZXZlbnQuY29sSW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gdGhpcy5ncmlkLmNvbHVtbkFwaS5pbmRleE9mKGNvbHVtbik7XG4gICAgICAgICAgZXZlbnQuY29sdW1uID0gY29sdW1uO1xuICAgICAgICAgIChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4UG9pbnQ8VD4pLmNvbnRleHQgPSB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLmNvbnRleHRBcGkuZ2V0Q2VsbChldmVudC5yb3dJbmRleCwgY29sdW1uSW5kZXgpO1xuICAgICAgICAgIGlmICghKGV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhQb2ludDxUPikuY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb250ZXh0QXBpLmNsZWFyKHRydWUpO1xuICAgICAgICAgICAgKGV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhQb2ludDxUPikuY29udGV4dCA9IHRoaXMucGx1Z2luQ3RybC5leHRBcGkuY29udGV4dEFwaS5nZXRDZWxsKGV2ZW50LnJvd0luZGV4LCBjb2x1bW5JbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHN0b3JlID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb2x1bW5TdG9yZTtcbiAgICAgICAgICBjb25zdCByb3dJbmZvID0gKG1hdHJpeFBvaW50LnR5cGUgPT09ICdoZWFkZXInID8gc3RvcmUubWV0YUhlYWRlclJvd3MgOiBzdG9yZS5tZXRhRm9vdGVyUm93cylbZXZlbnQucm93SW5kZXhdO1xuICAgICAgICAgIGNvbnN0IHJlY29yZCA9IHN0b3JlLmZpbmQocm93SW5mby5rZXlzW2V2ZW50LmNvbEluZGV4XSk7XG4gICAgICAgICAgaWYgKHJvd0luZm8uaXNHcm91cCkge1xuICAgICAgICAgICAgZXZlbnQuc3ViVHlwZSA9ICdtZXRhLWdyb3VwJztcbiAgICAgICAgICAgIGV2ZW50LmNvbHVtbiA9IG1hdHJpeFBvaW50LnR5cGUgPT09ICdoZWFkZXInID8gcmVjb3JkLmhlYWRlckdyb3VwIDogcmVjb3JkLmZvb3Rlckdyb3VwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5jb2x1bW4gPSBtYXRyaXhQb2ludC50eXBlID09PSAnaGVhZGVyJyA/IHJlY29yZC5oZWFkZXIgOiByZWNvcmQuZm9vdGVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUm93RXZlbnQgPSA8VEV2ZW50IGV4dGVuZHMgRXZlbnQ+KHJvd1RhcmdldDogSFRNTEVsZW1lbnQsIHNvdXJjZTogVEV2ZW50LCByb290PzogRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4pOiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPiB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAocm9vdCkge1xuICAgICAgICBjb25zdCBldmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gPSB7XG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIHJvd1RhcmdldCxcbiAgICAgICAgICB0eXBlOiByb290LnR5cGUsXG4gICAgICAgICAgc3ViVHlwZTogcm9vdC5zdWJUeXBlLFxuICAgICAgICAgIHJvd0luZGV4OiByb290LnJvd0luZGV4LFxuICAgICAgICAgIHJvb3RcbiAgICAgICAgfSBhcyBhbnk7XG4gICAgICAgIGlmIChyb290LnR5cGUgPT09ICdkYXRhJykge1xuICAgICAgICAgIChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4Um93PFQ+KS5yb3cgPSByb290LnJvdztcbiAgICAgICAgICAoZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkRGF0YU1hdHJpeFJvdzxUPikuY29udGV4dCA9IHJvb3QuY29udGV4dC5yb3dDb250ZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1hdHJpeFBvaW50ID0gbWF0cml4Um93RnJvbVJvdyhyb3dUYXJnZXQsIGNka1RhYmxlLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lcik7XG4gICAgICAgIGlmIChtYXRyaXhQb2ludCkge1xuICAgICAgICAgIGNvbnN0IGV2ZW50OiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPiA9IHsgLi4ubWF0cml4UG9pbnQsIHNvdXJjZSwgcm93VGFyZ2V0IH0gYXMgYW55O1xuICAgICAgICAgIGlmIChtYXRyaXhQb2ludC50eXBlID09PSAnZGF0YScpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMucGx1Z2luQ3RybC5leHRBcGkuY29udGV4dEFwaS5nZXRSb3cobWF0cml4UG9pbnQucm93SW5kZXgpO1xuICAgICAgICAgICAgaWYgKCFyb3cpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4Um93PFQ+KS5jb250ZXh0ID0gcm93O1xuICAgICAgICAgICAgKGV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhSb3c8VD4pLnJvdyA9IHJvdy4kaW1wbGljaXQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLyogIElmIGBzdWJUeXBlICE9PSAnZGF0YSdgIGl0IGNhbiBvbmx5IGJlIGBtZXRhYCBiZWNhdXNlIGBtZXRhZGF0YUZyb21FbGVtZW50KClgIGRvZXMgbm90IGhhbmRsZSBgbWV0YS1ncm91cGAgc3ViVHlwZS5cbiAgICAgICAgICAgICAgV2UgbmVlZCB0byBleHRlbmQgdGhpcyBtaXNzaW5nIHBhcnQsIHdlIGRvbid0IGhhdmUgY29sdW1ucyBoZXJlIHNvIHdlIHdpbGwgdHJ5IHRvIGluZmVyIGl0IHVzaW5nIHRoZSBmaXJzdCBjb2x1bW4uXG5cbiAgICAgICAgICAgICAgSXQncyBzaW1pbGFyIHRvIGhvdyBpdCdzIGhhbmRsZWQgaW4gY2VsbCBjbGlja3MsIGJ1dCBoZXJlIHdlIGRvbid0IG5lZWQgdG8gZXh0ZW5kcyB0aGUgY29sdW1uIGluZm8uXG4gICAgICAgICAgICAgIFdlIG9ubHkgbmVlZCB0byBjaGFuZ2UgdGhlIGBzdWJUeXBlYCB3aGVuIHRoZSByb3cgaXMgYSBncm91cCByb3csIGdldHRpbmcgYSBzcGVjaWZpYyBjb2x1bW4gaXMgaXJyZWxldmFudC5cbiAgICAgICAgICAgICAgV2UganVzdCBuZWVkIEEgY29sdW1uIGJlY2F1c2UgZ3JvdXAgY29sdW1ucyBkb24ndCBtaXggd2l0aCByZWd1bGFyIG1ldGEgY29sdW1ucy5cblxuICAgICAgICAgICAgICBOT1RFOiBXaGVuIHN1YlR5cGUgaXMgbm90ICdkYXRhJyB0aGUgeXBlIGNhbiBvbmx5IGJlIGBoZWFkZXJgIG9yIGBmb290ZXJgLlxuICAgICAgICAgICovXG4gICAgICAgICAgaWYgKG1hdHJpeFBvaW50LnN1YlR5cGUgIT09ICdkYXRhJykge1xuICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLmNvbHVtblN0b3JlO1xuXG4gICAgICAgICAgICBjb25zdCByb3dJbmZvID0gKG1hdHJpeFBvaW50LnR5cGUgPT09ICdoZWFkZXInID8gc3RvcmUubWV0YUhlYWRlclJvd3MgOiBzdG9yZS5tZXRhRm9vdGVyUm93cylbZXZlbnQucm93SW5kZXhdO1xuICAgICAgICAgICAgaWYgKHJvd0luZm8uaXNHcm91cCkge1xuICAgICAgICAgICAgICBldmVudC5zdWJUeXBlID0gJ21ldGEtZ3JvdXAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbGFzdENlbGxFbnRlckV2ZW50OiBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD47XG4gICAgbGV0IGxhc3RSb3dFbnRlckV2ZW50OiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPjtcbiAgICBjb25zdCBlbWl0Q2VsbExlYXZlID0gKHNvdXJjZTogTW91c2VFdmVudCk6IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxUPiB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAobGFzdENlbGxFbnRlckV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGxhc3RDZWxsRW50ZXJFdmVudFRlbXAgPSBsYXN0Q2VsbEVudGVyRXZlbnQ7XG4gICAgICAgIHRoaXMuY2VsbExlYXZlLmVtaXQoT2JqZWN0LmFzc2lnbih7fSwgbGFzdENlbGxFbnRlckV2ZW50VGVtcCwgeyBzb3VyY2UgfSkpO1xuICAgICAgICBsYXN0Q2VsbEVudGVyRXZlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBsYXN0Q2VsbEVudGVyRXZlbnRUZW1wO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBlbWl0Um93TGVhdmUgPSAoc291cmNlOiBNb3VzZUV2ZW50KTogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKGxhc3RSb3dFbnRlckV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGxhc3RSb3dFbnRlckV2ZW50VGVtcCA9IGxhc3RSb3dFbnRlckV2ZW50O1xuICAgICAgICB0aGlzLnJvd0xlYXZlLmVtaXQoT2JqZWN0LmFzc2lnbih7fSwgbGFzdFJvd0VudGVyRXZlbnRUZW1wLCB7IHNvdXJjZSB9KSk7XG4gICAgICAgIGxhc3RSb3dFbnRlckV2ZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gbGFzdFJvd0VudGVyRXZlbnRUZW1wO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb2Nlc3NFdmVudCA9IDxURXZlbnQgZXh0ZW5kcyBFdmVudD4oZTogVEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBmaW5kRXZlbnRTb3VyY2UoZSk7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQudHlwZSA9PT0gJ2NlbGwnKSB7XG4gICAgICAgICAgY29uc3QgZXZlbnQgPSBjcmVhdGVDZWxsRXZlbnQ8VEV2ZW50PihyZXN1bHQudGFyZ2V0LCBlKTtcbiAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHR5cGU6IHJlc3VsdC50eXBlLFxuICAgICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgICAgd2FpdFRpbWU6IGhhc0xpc3RlbmVycyh0aGlzLmNlbGxEYmxDbGljaykgPyAyNTAgOiAxLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LnR5cGUgPT09ICdyb3cnKSB7XG4gICAgICAgICAgY29uc3QgZXZlbnQgPSBjcmVhdGVSb3dFdmVudChyZXN1bHQudGFyZ2V0LCBlKTtcbiAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHR5cGU6IHJlc3VsdC50eXBlLFxuICAgICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgICAgd2FpdFRpbWU6IGhhc0xpc3RlbmVycyh0aGlzLnJvd0RibENsaWNrKSA/IDI1MCA6IDEsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKiogU3BsaXQgdGhlIHJlc3VsdCBvZiBwcm9jZXNzRXZlbnQgaW50byBjZWxsIGFuZCByb3cgZXZlbnRzLCBpZiB0eXBlIGlzIHJvdyBvbmx5IHJvdyBldmVudCBpcyByZXR1cm5lZCwgaWYgY2VsbCB0aGVuIGNlbGwgaXMgcmV0dXJuZWQgYW5kIHJvdyBpcyBjcmVhdGVkIGFsb25nIHNpZGUuICovXG4gICAgY29uc3Qgc3BsaXRQcm9jZXNzZWRFdmVudCA9IDxURXZlbnQgZXh0ZW5kcyBFdmVudD4oZXZlbnQ6IFJldHVyblR5cGU8dHlwZW9mIHByb2Nlc3NFdmVudD4pID0+IHtcbiAgICAgIGNvbnN0IGNlbGxFdmVudCA9IGV2ZW50LnR5cGUgPT09ICdjZWxsJyA/IGV2ZW50LmV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBURXZlbnQ+IDogdW5kZWZpbmVkO1xuICAgICAgY29uc3Qgcm93RXZlbnQgPSBjZWxsRXZlbnRcbiAgICAgICAgPyBjcmVhdGVSb3dFdmVudDxURXZlbnQ+KGNlbGxFdmVudC5yb3dUYXJnZXQsIGNlbGxFdmVudC5zb3VyY2UsIGNlbGxFdmVudClcbiAgICAgICAgOiBldmVudC5ldmVudCBhcyBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPlxuICAgICAgO1xuICAgICAgcmV0dXJuIHsgY2VsbEV2ZW50LCByb3dFdmVudCB9O1xuICAgIH07XG5cbiAgICBjb25zdCByZWdpc3RlclVwRG93bkV2ZW50cyA9IDxURXZlbnQgZXh0ZW5kcyBFdmVudD4oZXZlbnROYW1lOiBzdHJpbmcsIGVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgVEV2ZW50PiB8IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PikgPT4ge1xuICAgICAgZnJvbUV2ZW50KGNka1RhYmxlRWxlbWVudCwgZXZlbnROYW1lKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpLFxuICAgICAgICAgIGZpbHRlciggc291cmNlID0+IGhhc0xpc3RlbmVycyhlbWl0dGVyKSApLFxuICAgICAgICAgIG1hcChwcm9jZXNzRXZlbnQpLFxuICAgICAgICAgIGZpbHRlciggcmVzdWx0ID0+ICEhcmVzdWx0ICksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSggcmVzdWx0ID0+IHtcbiAgICAgICAgICBjb25zdCB7IGNlbGxFdmVudCwgcm93RXZlbnQgfSA9IHNwbGl0UHJvY2Vzc2VkRXZlbnQ8VEV2ZW50PihyZXN1bHQpO1xuICAgICAgICAgIGVtaXR0ZXIuZW1pdChjZWxsRXZlbnQgfHwgcm93RXZlbnQpO1xuICAgICAgICAgIHRoaXMuc3luY1JvdyhjZWxsRXZlbnQgfHwgcm93RXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWdpc3RlclVwRG93bkV2ZW50czxNb3VzZUV2ZW50PignbW91c2V1cCcsIHRoaXMubW91c2VVcCk7XG4gICAgcmVnaXN0ZXJVcERvd25FdmVudHM8TW91c2VFdmVudD4oJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duKTtcbiAgICByZWdpc3RlclVwRG93bkV2ZW50czxLZXlib2FyZEV2ZW50Pigna2V5dXAnLCB0aGlzLmtleVVwKTtcbiAgICByZWdpc3RlclVwRG93bkV2ZW50czxLZXlib2FyZEV2ZW50Pigna2V5ZG93bicsIHRoaXMua2V5RG93bik7XG5cbiAgICAvKlxuICAgICAgSGFuZGxpbmcgY2xpY2sgc3RyZWFtIGZvciBib3RoIGNsaWNrIGFuZCBkb3VibGUgY2xpY2sgZXZlbnRzLlxuICAgICAgV2Ugd2FudCB0byBkZXRlY3QgZG91YmxlIGNsaWNrcyBhbmQgY2xpY2tzIHdpdGggbWluaW1hbCBkZWxheXNcbiAgICAgIFdlIGNoZWNrIGlmIGEgZG91YmxlIGNsaWNrIGhhcyBsaXN0ZW5lcnMsIGlmIG5vdCB3ZSB3b24ndCBkZWxheSB0aGUgY2xpY2suLi5cbiAgICAgIFRPRE86IG9uIGRvdWJsZSBjbGljaywgZG9uJ3Qgd2FpdCB0aGUgd2hvbGUgMjUwIG1zIGlmIDIgY2xpY2tzIGhhcHBlbi5cbiAgICAqL1xuICAgIGNvbnN0IGNsaWNrU3RyZWFtID0gZnJvbUV2ZW50KGNka1RhYmxlRWxlbWVudCwgJ2NsaWNrJykucGlwZShcbiAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCksXG4gICAgICBmaWx0ZXIoIHNvdXJjZSA9PiBoYXNMaXN0ZW5lcnModGhpcy5jZWxsQ2xpY2spIHx8IGhhc0xpc3RlbmVycyh0aGlzLmNlbGxEYmxDbGljaykgfHwgaGFzTGlzdGVuZXJzKHRoaXMucm93Q2xpY2spIHx8IGhhc0xpc3RlbmVycyh0aGlzLnJvd0RibENsaWNrKSApLFxuICAgICAgbWFwKHByb2Nlc3NFdmVudCksXG4gICAgICBmaWx0ZXIoIHJlc3VsdCA9PiAhIXJlc3VsdCApLFxuICAgICk7XG5cbiAgICBjbGlja1N0cmVhbVxuICAgICAgLnBpcGUoXG4gICAgICAgIGJ1ZmZlcldoZW4oICgpID0+IGNsaWNrU3RyZWFtLnBpcGUoIGRlYm91bmNlKCBlID0+IHRpbWVyKGUud2FpdFRpbWUpICkgKSApLFxuICAgICAgICBmaWx0ZXIoIGV2ZW50cyA9PiBldmVudHMubGVuZ3RoID4gMCApLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnRzID0+IHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHMuc2hpZnQoKTtcbiAgICAgICAgY29uc3QgaXNEb3VibGVDbGljayA9IGV2ZW50cy5sZW5ndGggPT09IDE7IC8vIGlmIHdlIGhhdmUgMiBldmVudHMgaXRzIGRvdWJsZSBjbGljaywgb3RoZXJ3aXNlIHNpbmdsZS5cbiAgICAgICAgY29uc3QgeyBjZWxsRXZlbnQsIHJvd0V2ZW50IH0gPSBzcGxpdFByb2Nlc3NlZEV2ZW50PE1vdXNlRXZlbnQ+KGV2ZW50KTtcbiAgICAgICAgaWYgKGlzRG91YmxlQ2xpY2spIHtcbiAgICAgICAgICBpZiAoY2VsbEV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxEYmxDbGljay5lbWl0KGNlbGxFdmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucm93RGJsQ2xpY2suZW1pdChyb3dFdmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNlbGxFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5jZWxsQ2xpY2suZW1pdChjZWxsRXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnJvd0NsaWNrLmVtaXQocm93RXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3luY1JvdyhjZWxsRXZlbnQgfHwgcm93RXZlbnQpO1xuICAgICAgfSk7XG5cblxuICAgIGZyb21FdmVudChjZGtUYWJsZUVsZW1lbnQsICdtb3VzZWxlYXZlJylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSggKHNvdXJjZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBsZXQgbGFzdEV2ZW50OiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPiB8IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxUPiA9IGVtaXRDZWxsTGVhdmUoc291cmNlKTtcbiAgICAgICAgbGFzdEV2ZW50ID0gZW1pdFJvd0xlYXZlKHNvdXJjZSkgfHwgbGFzdEV2ZW50O1xuICAgICAgICBpZiAobGFzdEV2ZW50KSB7XG4gICAgICAgICAgdGhpcy5zeW5jUm93KGxhc3RFdmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgZnJvbUV2ZW50KGNka1RhYmxlRWxlbWVudCwgJ21vdXNlbW92ZScpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoIChzb3VyY2U6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgY2VsbFRhcmdldDogSFRNTEVsZW1lbnQgPSBmaW5kUGFyZW50Q2VsbChzb3VyY2UudGFyZ2V0IGFzIGFueSk7XG4gICAgICAgIGNvbnN0IGxhc3RDZWxsVGFyZ2V0ID0gbGFzdENlbGxFbnRlckV2ZW50ICYmIGxhc3RDZWxsRW50ZXJFdmVudC5jZWxsVGFyZ2V0O1xuICAgICAgICBjb25zdCBsYXN0Um93VGFyZ2V0ID0gbGFzdFJvd0VudGVyRXZlbnQgJiYgbGFzdFJvd0VudGVyRXZlbnQucm93VGFyZ2V0O1xuXG4gICAgICAgIGxldCBjZWxsRXZlbnQ6IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBNb3VzZUV2ZW50PjtcbiAgICAgICAgbGV0IGxhc3RFdmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gfCBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VD47XG5cbiAgICAgICAgaWYgKGxhc3RDZWxsVGFyZ2V0ICE9PSBjZWxsVGFyZ2V0KSB7XG4gICAgICAgICAgbGFzdEV2ZW50ID0gZW1pdENlbGxMZWF2ZShzb3VyY2UpIHx8IGxhc3RFdmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjZWxsVGFyZ2V0KSB7XG4gICAgICAgICAgaWYgKGxhc3RDZWxsVGFyZ2V0ICE9PSBjZWxsVGFyZ2V0KSB7XG4gICAgICAgICAgICBjZWxsRXZlbnQgPSBjcmVhdGVDZWxsRXZlbnQoY2VsbFRhcmdldCwgc291cmNlKTtcbiAgICAgICAgICAgIGlmIChjZWxsRXZlbnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5jZWxsRW50ZXIuZW1pdChsYXN0Q2VsbEVudGVyRXZlbnQgPSBjZWxsRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgcm93VGFyZ2V0ID0gKGNlbGxFdmVudCAmJiBjZWxsRXZlbnQucm93VGFyZ2V0KSB8fCAoaXNSb3dDb250YWluZXIoc291cmNlLnRhcmdldCBhcyBhbnkpICYmIHNvdXJjZS50YXJnZXQgYXMgYW55KTtcblxuICAgICAgICBpZiAobGFzdFJvd1RhcmdldCAhPT0gcm93VGFyZ2V0KSB7XG4gICAgICAgICAgbGFzdEV2ZW50ID0gZW1pdFJvd0xlYXZlKHNvdXJjZSkgfHwgbGFzdEV2ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvd1RhcmdldCkge1xuICAgICAgICAgIGlmIChsYXN0Um93VGFyZ2V0ICE9PSByb3dUYXJnZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd0V2ZW50ID0gY3JlYXRlUm93RXZlbnQocm93VGFyZ2V0LCBzb3VyY2UsIGNlbGxFdmVudCk7XG4gICAgICAgICAgICBpZiAocm93RXZlbnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5yb3dFbnRlci5lbWl0KGxhc3RSb3dFbnRlckV2ZW50ID0gcm93RXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYXN0RXZlbnQpIHtcbiAgICAgICAgICB0aGlzLnN5bmNSb3cobGFzdEV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLmdyaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzeW5jUm93PFRFdmVudCBleHRlbmRzIEV2ZW50PihldmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gfCBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgVEV2ZW50Pik6IHZvaWQge1xuICAgIHRoaXMuZ3JpZC5yb3dzQXBpLnN5bmNSb3dzKGV2ZW50LnR5cGUsIGV2ZW50LnJvd0luZGV4KTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ3BibC1uZ3JpZFt0YXJnZXRFdmVudHNdLCBwYmwtbmdyaWRbcm93Q2xpY2tdLCBwYmwtbmdyaWRbcm93RGJsQ2xpY2tdLCBwYmwtbmdyaWRbcm93RW50ZXJdLCBwYmwtbmdyaWRbcm93TGVhdmVdLCBwYmwtbmdyaWRbY2VsbENsaWNrXSwgcGJsLW5ncmlkW2NlbGxEYmxDbGlja10sIHBibC1uZ3JpZFtjZWxsRW50ZXJdLCBwYmwtbmdyaWRbY2VsbExlYXZlXSwgcGJsLW5ncmlkW2tleURvd25dLCBwYmwtbmdyaWRba2V5VXBdJyxcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnVzZS1vdXRwdXQtcHJvcGVydHktZGVjb3JhdG9yXG4gIG91dHB1dHM6IFsgJ3Jvd0NsaWNrJywgJ3Jvd0RibENsaWNrJywgJ3Jvd0VudGVyJywgJ3Jvd0xlYXZlJywgJ2NlbGxDbGljaycsICdjZWxsRGJsQ2xpY2snLCAnY2VsbEVudGVyJywgJ2NlbGxMZWF2ZScsICdrZXlEb3duJywgJ2tleVVwJyBdXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luRGlyZWN0aXZlPFQ+IGV4dGVuZHMgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW48VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIGNvbnN0cnVjdG9yKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBpbmplY3RvcjogSW5qZWN0b3IsIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcikge1xuICAgIHN1cGVyKHRhYmxlLCBpbmplY3RvciwgcGx1Z2luQ3RybCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgfVxuXG59XG4iXX0=