import { Subject, Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { PblNgridCellDefDirective, PblNgridEditorCellDefDirective, PblNgridHeaderCellDefDirective, PblNgridFooterCellDefDirective, PblNgridMultiTemplateRegistry, PblNgridMultiComponentRegistry, PblNgridDataHeaderExtensionContext, PblNgridDataHeaderExtensionRef, PblNgridNoDataRefDirective, PblNgridPaginatorRefDirective } from '../directives';
import * as ɵngcc0 from '@angular/core';
export interface RegistryChangedEvent {
    op: 'add' | 'remove';
    type: keyof PblNgridMultiRegistryMap | keyof PblNgridSingleRegistryMap;
    value: any;
}
/**
 * A map of valid single-item value that can be registered, and their type.
 */
export interface PblNgridSingleRegistryMap {
    noData?: PblNgridNoDataRefDirective;
    paginator?: PblNgridPaginatorRefDirective;
}
/**
 * A map of valid multi-item value that can be registered, and their type (the single type, i.e. T in Array<T>)
 */
export interface PblNgridMultiRegistryMap {
    headerCell?: PblNgridHeaderCellDefDirective<any>;
    tableCell?: PblNgridCellDefDirective<any>;
    editorCell?: PblNgridEditorCellDefDirective<any>;
    footerCell?: PblNgridFooterCellDefDirective<any>;
    dataHeaderExtensions?: (PblNgridMultiTemplateRegistry<PblNgridDataHeaderExtensionContext, 'dataHeaderExtensions'> & PblNgridDataHeaderExtensionRef) | (PblNgridMultiComponentRegistry<any, 'dataHeaderExtensions'> & PblNgridDataHeaderExtensionRef);
}
/**
 * A Registry for templates of table parts.
 *
 * The registry is hierarchical, where each instance of a registry has a parent which allows cascading templates.
 * The hierarchy is manged by angular DI.
 *
 * > The root registry does not have a parent.
 *
 * Each instance of a registry (including root) is a hierarchy by itself, composed of 2 internal levels.
 * The first level (L1 below) is used for fixed templates, the second level (L2 below) is used for dynamic templates.
 *
 * - Root Registry
 *   - Child Registry
 *     - ChildOfChild Registry
 *
 * In the example above there are 3 registries: Root, Child and ChildOfChild.
 *
 * When searching for a template in `ChildOfChild` it will search in the following order (top to bottom):
 *   - ChildOfChild
 *   - Child
 *   - Root
 *
 * If a registry does not contain the template the search will move to the next one.
 */
export declare class PblNgridRegistryService implements OnDestroy {
    private _parent?;
    readonly changes: Observable<RegistryChangedEvent[]>;
    get parent(): PblNgridRegistryService | undefined;
    protected root: PblNgridRegistryService & {
        bufferedData?: RegistryChangedEvent[];
    };
    protected _multi: {
        [K in keyof PblNgridMultiRegistryMap]: Array<PblNgridMultiRegistryMap[K]>;
    };
    protected _multiDefaults: PblNgridMultiRegistryMap;
    protected _singles: PblNgridSingleRegistryMap;
    protected readonly changes$: Subject<RegistryChangedEvent[]>;
    constructor(_parent?: PblNgridRegistryService);
    getRoot(): PblNgridRegistryService;
    /**
     * Returns the registered value for the single `kind`.
     * If not found will try to search the parent.
     */
    getSingle<P extends keyof PblNgridSingleRegistryMap>(kind: P): PblNgridSingleRegistryMap[P] | undefined;
    setSingle<P extends keyof PblNgridSingleRegistryMap>(kind: P, value: PblNgridSingleRegistryMap[P] | undefined): void;
    /**
     * Returns the registered default value for the multi `kind`.
     * If not found will try to search the parent.
     */
    getMultiDefault<P extends keyof PblNgridMultiRegistryMap>(kind: P): PblNgridMultiRegistryMap[P] | undefined;
    setMultiDefault<P extends keyof PblNgridMultiRegistryMap>(kind: P, value: PblNgridMultiRegistryMap[P] | undefined): void;
    /**
     * Returns the registered values for the multi `kind`.
     * If not found WILL NOT search the parent.
     */
    getMulti<T extends keyof PblNgridMultiRegistryMap>(kind: T): Array<PblNgridMultiRegistryMap[T]> | undefined;
    addMulti<T extends keyof PblNgridMultiRegistryMap>(kind: T, cellDef: PblNgridMultiRegistryMap[T]): void;
    removeMulti<T extends keyof PblNgridMultiRegistryMap>(kind: T, cellDef: PblNgridMultiRegistryMap[T]): void;
    /**
     * Iterate over all multi-registry value of the provided `kind` ascending order, starting from the last ancestor (this registry) up to
     * the root parent.
     *
     * Each time a collection for the `kind` is found the handler is invoked and then repeating the process on the parent.
     * If the `kind` does not exist the handler is not called moving on to the next parent.
     *
     * To bail out (stop the process and don't iterate to the next parent), return true from the handler.
     *
     * @returns The number of times that handler was invoked, i.e 0 means no matches.
     */
    forMulti<T extends keyof PblNgridMultiRegistryMap>(kind: T, handler: ((values: Array<PblNgridMultiRegistryMap[T]>) => boolean | void)): number;
    ngOnDestroy(): void;
    /**
     * Delay all notifications sent through `changes` and buffer then until next call to `bufferEnd()`.
     * When `bufferEnd()` is called it will flush all changes.
     *
     * > It's important to note that buffering does not freeze the registry, adding and removing templates will change the
     * registry and will effect queries. Buffering block the `changes` event stream and nothing more.
     */
    bufferStart(): void;
    bufferEnd(): void;
    private emitChanges;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridRegistryService, [{ optional: true; skipSelf: true; }]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1yZWdpc3RyeS5zZXJ2aWNlLmQudHMiLCJzb3VyY2VzIjpbImdyaWQtcmVnaXN0cnkuc2VydmljZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZSwgUGJsTmdyaWRFZGl0b3JDZWxsRGVmRGlyZWN0aXZlLCBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmUsIFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZSwgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnksIFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeSwgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uUmVmLCBQYmxOZ3JpZE5vRGF0YVJlZkRpcmVjdGl2ZSwgUGJsTmdyaWRQYWdpbmF0b3JSZWZEaXJlY3RpdmUgfSBmcm9tICcuLi9kaXJlY3RpdmVzJztcclxuZXhwb3J0IGludGVyZmFjZSBSZWdpc3RyeUNoYW5nZWRFdmVudCB7XHJcbiAgICBvcDogJ2FkZCcgfCAncmVtb3ZlJztcclxuICAgIHR5cGU6IGtleW9mIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcCB8IGtleW9mIFBibE5ncmlkU2luZ2xlUmVnaXN0cnlNYXA7XHJcbiAgICB2YWx1ZTogYW55O1xyXG59XHJcbi8qKlxyXG4gKiBBIG1hcCBvZiB2YWxpZCBzaW5nbGUtaXRlbSB2YWx1ZSB0aGF0IGNhbiBiZSByZWdpc3RlcmVkLCBhbmQgdGhlaXIgdHlwZS5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcCB7XHJcbiAgICBub0RhdGE/OiBQYmxOZ3JpZE5vRGF0YVJlZkRpcmVjdGl2ZTtcclxuICAgIHBhZ2luYXRvcj86IFBibE5ncmlkUGFnaW5hdG9yUmVmRGlyZWN0aXZlO1xyXG59XHJcbi8qKlxyXG4gKiBBIG1hcCBvZiB2YWxpZCBtdWx0aS1pdGVtIHZhbHVlIHRoYXQgY2FuIGJlIHJlZ2lzdGVyZWQsIGFuZCB0aGVpciB0eXBlICh0aGUgc2luZ2xlIHR5cGUsIGkuZS4gVCBpbiBBcnJheTxUPilcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwIHtcclxuICAgIGhlYWRlckNlbGw/OiBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmU8YW55PjtcclxuICAgIHRhYmxlQ2VsbD86IFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZTxhbnk+O1xyXG4gICAgZWRpdG9yQ2VsbD86IFBibE5ncmlkRWRpdG9yQ2VsbERlZkRpcmVjdGl2ZTxhbnk+O1xyXG4gICAgZm9vdGVyQ2VsbD86IFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZTxhbnk+O1xyXG4gICAgZGF0YUhlYWRlckV4dGVuc2lvbnM/OiAoUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnk8UGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgJ2RhdGFIZWFkZXJFeHRlbnNpb25zJz4gJiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25SZWYpIHwgKFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeTxhbnksICdkYXRhSGVhZGVyRXh0ZW5zaW9ucyc+ICYgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uUmVmKTtcclxufVxyXG4vKipcclxuICogQSBSZWdpc3RyeSBmb3IgdGVtcGxhdGVzIG9mIHRhYmxlIHBhcnRzLlxyXG4gKlxyXG4gKiBUaGUgcmVnaXN0cnkgaXMgaGllcmFyY2hpY2FsLCB3aGVyZSBlYWNoIGluc3RhbmNlIG9mIGEgcmVnaXN0cnkgaGFzIGEgcGFyZW50IHdoaWNoIGFsbG93cyBjYXNjYWRpbmcgdGVtcGxhdGVzLlxyXG4gKiBUaGUgaGllcmFyY2h5IGlzIG1hbmdlZCBieSBhbmd1bGFyIERJLlxyXG4gKlxyXG4gKiA+IFRoZSByb290IHJlZ2lzdHJ5IGRvZXMgbm90IGhhdmUgYSBwYXJlbnQuXHJcbiAqXHJcbiAqIEVhY2ggaW5zdGFuY2Ugb2YgYSByZWdpc3RyeSAoaW5jbHVkaW5nIHJvb3QpIGlzIGEgaGllcmFyY2h5IGJ5IGl0c2VsZiwgY29tcG9zZWQgb2YgMiBpbnRlcm5hbCBsZXZlbHMuXHJcbiAqIFRoZSBmaXJzdCBsZXZlbCAoTDEgYmVsb3cpIGlzIHVzZWQgZm9yIGZpeGVkIHRlbXBsYXRlcywgdGhlIHNlY29uZCBsZXZlbCAoTDIgYmVsb3cpIGlzIHVzZWQgZm9yIGR5bmFtaWMgdGVtcGxhdGVzLlxyXG4gKlxyXG4gKiAtIFJvb3QgUmVnaXN0cnlcclxuICogICAtIENoaWxkIFJlZ2lzdHJ5XHJcbiAqICAgICAtIENoaWxkT2ZDaGlsZCBSZWdpc3RyeVxyXG4gKlxyXG4gKiBJbiB0aGUgZXhhbXBsZSBhYm92ZSB0aGVyZSBhcmUgMyByZWdpc3RyaWVzOiBSb290LCBDaGlsZCBhbmQgQ2hpbGRPZkNoaWxkLlxyXG4gKlxyXG4gKiBXaGVuIHNlYXJjaGluZyBmb3IgYSB0ZW1wbGF0ZSBpbiBgQ2hpbGRPZkNoaWxkYCBpdCB3aWxsIHNlYXJjaCBpbiB0aGUgZm9sbG93aW5nIG9yZGVyICh0b3AgdG8gYm90dG9tKTpcclxuICogICAtIENoaWxkT2ZDaGlsZFxyXG4gKiAgIC0gQ2hpbGRcclxuICogICAtIFJvb3RcclxuICpcclxuICogSWYgYSByZWdpc3RyeSBkb2VzIG5vdCBjb250YWluIHRoZSB0ZW1wbGF0ZSB0aGUgc2VhcmNoIHdpbGwgbW92ZSB0byB0aGUgbmV4dCBvbmUuXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgICBwcml2YXRlIF9wYXJlbnQ/O1xyXG4gICAgcmVhZG9ubHkgY2hhbmdlczogT2JzZXJ2YWJsZTxSZWdpc3RyeUNoYW5nZWRFdmVudFtdPjtcclxuICAgIGdldCBwYXJlbnQoKTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UgfCB1bmRlZmluZWQ7XHJcbiAgICBwcm90ZWN0ZWQgcm9vdDogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UgJiB7XHJcbiAgICAgICAgYnVmZmVyZWREYXRhPzogUmVnaXN0cnlDaGFuZ2VkRXZlbnRbXTtcclxuICAgIH07XHJcbiAgICBwcm90ZWN0ZWQgX211bHRpOiB7XHJcbiAgICAgICAgW0sgaW4ga2V5b2YgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwXTogQXJyYXk8UGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwW0tdPjtcclxuICAgIH07XHJcbiAgICBwcm90ZWN0ZWQgX211bHRpRGVmYXVsdHM6IFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcDtcclxuICAgIHByb3RlY3RlZCBfc2luZ2xlczogUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcDtcclxuICAgIHByb3RlY3RlZCByZWFkb25seSBjaGFuZ2VzJDogU3ViamVjdDxSZWdpc3RyeUNoYW5nZWRFdmVudFtdPjtcclxuICAgIGNvbnN0cnVjdG9yKF9wYXJlbnQ/OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSk7XHJcbiAgICBnZXRSb290KCk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSByZWdpc3RlcmVkIHZhbHVlIGZvciB0aGUgc2luZ2xlIGBraW5kYC5cclxuICAgICAqIElmIG5vdCBmb3VuZCB3aWxsIHRyeSB0byBzZWFyY2ggdGhlIHBhcmVudC5cclxuICAgICAqL1xyXG4gICAgZ2V0U2luZ2xlPFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFNpbmdsZVJlZ2lzdHJ5TWFwPihraW5kOiBQKTogUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcFtQXSB8IHVuZGVmaW5lZDtcclxuICAgIHNldFNpbmdsZTxQIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcD4oa2luZDogUCwgdmFsdWU6IFBibE5ncmlkU2luZ2xlUmVnaXN0cnlNYXBbUF0gfCB1bmRlZmluZWQpOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSByZWdpc3RlcmVkIGRlZmF1bHQgdmFsdWUgZm9yIHRoZSBtdWx0aSBga2luZGAuXHJcbiAgICAgKiBJZiBub3QgZm91bmQgd2lsbCB0cnkgdG8gc2VhcmNoIHRoZSBwYXJlbnQuXHJcbiAgICAgKi9cclxuICAgIGdldE11bHRpRGVmYXVsdDxQIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwPihraW5kOiBQKTogUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwW1BdIHwgdW5kZWZpbmVkO1xyXG4gICAgc2V0TXVsdGlEZWZhdWx0PFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXA+KGtpbmQ6IFAsIHZhbHVlOiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXBbUF0gfCB1bmRlZmluZWQpOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSByZWdpc3RlcmVkIHZhbHVlcyBmb3IgdGhlIG11bHRpIGBraW5kYC5cclxuICAgICAqIElmIG5vdCBmb3VuZCBXSUxMIE5PVCBzZWFyY2ggdGhlIHBhcmVudC5cclxuICAgICAqL1xyXG4gICAgZ2V0TXVsdGk8VCBleHRlbmRzIGtleW9mIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcD4oa2luZDogVCk6IEFycmF5PFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcFtUXT4gfCB1bmRlZmluZWQ7XHJcbiAgICBhZGRNdWx0aTxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwPihraW5kOiBULCBjZWxsRGVmOiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXBbVF0pOiB2b2lkO1xyXG4gICAgcmVtb3ZlTXVsdGk8VCBleHRlbmRzIGtleW9mIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcD4oa2luZDogVCwgY2VsbERlZjogUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwW1RdKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogSXRlcmF0ZSBvdmVyIGFsbCBtdWx0aS1yZWdpc3RyeSB2YWx1ZSBvZiB0aGUgcHJvdmlkZWQgYGtpbmRgIGFzY2VuZGluZyBvcmRlciwgc3RhcnRpbmcgZnJvbSB0aGUgbGFzdCBhbmNlc3RvciAodGhpcyByZWdpc3RyeSkgdXAgdG9cclxuICAgICAqIHRoZSByb290IHBhcmVudC5cclxuICAgICAqXHJcbiAgICAgKiBFYWNoIHRpbWUgYSBjb2xsZWN0aW9uIGZvciB0aGUgYGtpbmRgIGlzIGZvdW5kIHRoZSBoYW5kbGVyIGlzIGludm9rZWQgYW5kIHRoZW4gcmVwZWF0aW5nIHRoZSBwcm9jZXNzIG9uIHRoZSBwYXJlbnQuXHJcbiAgICAgKiBJZiB0aGUgYGtpbmRgIGRvZXMgbm90IGV4aXN0IHRoZSBoYW5kbGVyIGlzIG5vdCBjYWxsZWQgbW92aW5nIG9uIHRvIHRoZSBuZXh0IHBhcmVudC5cclxuICAgICAqXHJcbiAgICAgKiBUbyBiYWlsIG91dCAoc3RvcCB0aGUgcHJvY2VzcyBhbmQgZG9uJ3QgaXRlcmF0ZSB0byB0aGUgbmV4dCBwYXJlbnQpLCByZXR1cm4gdHJ1ZSBmcm9tIHRoZSBoYW5kbGVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIFRoZSBudW1iZXIgb2YgdGltZXMgdGhhdCBoYW5kbGVyIHdhcyBpbnZva2VkLCBpLmUgMCBtZWFucyBubyBtYXRjaGVzLlxyXG4gICAgICovXHJcbiAgICBmb3JNdWx0aTxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwPihraW5kOiBULCBoYW5kbGVyOiAoKHZhbHVlczogQXJyYXk8UGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwW1RdPikgPT4gYm9vbGVhbiB8IHZvaWQpKTogbnVtYmVyO1xyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogRGVsYXkgYWxsIG5vdGlmaWNhdGlvbnMgc2VudCB0aHJvdWdoIGBjaGFuZ2VzYCBhbmQgYnVmZmVyIHRoZW4gdW50aWwgbmV4dCBjYWxsIHRvIGBidWZmZXJFbmQoKWAuXHJcbiAgICAgKiBXaGVuIGBidWZmZXJFbmQoKWAgaXMgY2FsbGVkIGl0IHdpbGwgZmx1c2ggYWxsIGNoYW5nZXMuXHJcbiAgICAgKlxyXG4gICAgICogPiBJdCdzIGltcG9ydGFudCB0byBub3RlIHRoYXQgYnVmZmVyaW5nIGRvZXMgbm90IGZyZWV6ZSB0aGUgcmVnaXN0cnksIGFkZGluZyBhbmQgcmVtb3ZpbmcgdGVtcGxhdGVzIHdpbGwgY2hhbmdlIHRoZVxyXG4gICAgICogcmVnaXN0cnkgYW5kIHdpbGwgZWZmZWN0IHF1ZXJpZXMuIEJ1ZmZlcmluZyBibG9jayB0aGUgYGNoYW5nZXNgIGV2ZW50IHN0cmVhbSBhbmQgbm90aGluZyBtb3JlLlxyXG4gICAgICovXHJcbiAgICBidWZmZXJTdGFydCgpOiB2b2lkO1xyXG4gICAgYnVmZmVyRW5kKCk6IHZvaWQ7XHJcbiAgICBwcml2YXRlIGVtaXRDaGFuZ2VzO1xyXG59XHJcbiJdfQ==