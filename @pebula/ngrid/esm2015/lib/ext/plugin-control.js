/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { PLUGIN_STORE } from './table-plugin';
/** @type {?} */
const TABLE_PLUGIN_CONTEXT = new WeakMap();
/**
 * \@internal
 * @template T
 */
export class PblNgridPluginContext {
    /**
     * @private
     */
    constructor() {
        this._events = new Subject();
        this.events = this._events.asObservable();
    }
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
    /**
     * @template T
     * @param {?} table
     * @param {?} injector
     * @param {?} extApi
     * @return {?}
     */
    static create(table, injector, extApi) {
        if (TABLE_PLUGIN_CONTEXT.has(table)) {
            throw new Error(`Table is already registered for extensions.`);
        }
        /** @type {?} */
        const instance = new PblNgridPluginContext();
        TABLE_PLUGIN_CONTEXT.set(table, instance);
        instance.table = table;
        instance.injector = injector;
        instance.extApi = extApi;
        instance.controller = new PblNgridPluginController(instance);
        return instance;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    emitEvent(event) {
        this._events.next(event);
    }
    /**
     * @return {?}
     */
    destroy() {
        if (!TABLE_PLUGIN_CONTEXT.has(this.table)) {
            throw new Error(`Table is not registered.`);
        }
        this._events.complete();
        TABLE_PLUGIN_CONTEXT.delete(this.table);
    }
}
if (false) {
    /** @type {?} */
    PblNgridPluginContext.prototype.table;
    /** @type {?} */
    PblNgridPluginContext.prototype.injector;
    /** @type {?} */
    PblNgridPluginContext.prototype.extApi;
    /** @type {?} */
    PblNgridPluginContext.prototype.controller;
    /** @type {?} */
    PblNgridPluginContext.prototype.events;
    /**
     * @type {?}
     * @private
     */
    PblNgridPluginContext.prototype._events;
}
/**
 * @template T
 */
export class PblNgridPluginController {
    /**
     * @param {?} context
     */
    constructor(context) {
        this.context = context;
        this.plugins = new Map();
        this.grid = context.table;
        this.extApi = context.extApi;
        this.events = context.events;
        PblNgridPluginController.created$.next({ table: this.grid, controller: this });
    }
    /**
     * @return {?}
     */
    get injector() { return this.context.injector; }
    /**
     * @template T
     * @param {?} grid
     * @return {?}
     */
    static find(grid) {
        /** @type {?} */
        const context = TABLE_PLUGIN_CONTEXT.get(grid);
        if (context) {
            return context.controller;
        }
    }
    /**
     * @template P
     * @param {?} name
     * @return {?}
     */
    hasPlugin(name) {
        return this.plugins.has(name);
    }
    /**
     * @template P
     * @param {?} name
     * @return {?}
     */
    getPlugin(name) {
        return (/** @type {?} */ (this.plugins.get(name)));
    }
    /**
     * Registers the `plugin` with the `name` with the `table`
     * @template P
     * @param {?} name
     * @param {?} plugin
     * @return {?}
     */
    setPlugin(name, plugin) {
        if (!PLUGIN_STORE.has(name)) {
            throw new Error(`Unknown plugin ${name}.`);
        }
        if (this.plugins.has(name)) {
            throw new Error(`Plugin ${name} is not registered for this table.`);
        }
        this.plugins.set(name, plugin);
        return (/**
         * @param {?} tbl
         * @return {?}
         */
        (tbl) => this.grid === tbl && this.plugins.delete(name));
    }
    /**
     * @template P
     * @param {?} name
     * @return {?}
     */
    createPlugin(name) {
        if (!PLUGIN_STORE.has(name)) {
            throw new Error(`Unknown plugin ${name}.`);
        }
        /** @type {?} */
        const metadata = PLUGIN_STORE.get(name);
        /** @type {?} */
        const methodName = metadata.factory;
        if (!methodName) {
            throw new Error(`Invalid plugin configuration for ${name}, no factory metadata.`);
        }
        else if (typeof metadata.target[methodName] !== 'function') {
            throw new Error(`Invalid plugin configuration for ${name}, factory metadata does not point to a function.`);
        }
        return metadata.target[methodName](this.grid, this.context.injector);
    }
}
PblNgridPluginController.created$ = new Subject();
PblNgridPluginController.created = PblNgridPluginController.created$.asObservable();
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridPluginController.created$;
    /** @type {?} */
    PblNgridPluginController.created;
    /** @type {?} */
    PblNgridPluginController.prototype.extApi;
    /** @type {?} */
    PblNgridPluginController.prototype.events;
    /**
     * @type {?}
     * @private
     */
    PblNgridPluginController.prototype.grid;
    /**
     * @type {?}
     * @private
     */
    PblNgridPluginController.prototype.plugins;
    /**
     * @type {?}
     * @private
     */
    PblNgridPluginController.prototype.context;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLWNvbnRyb2wuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2V4dC9wbHVnaW4tY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQVczQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O01BRXhDLG9CQUFvQixHQUFHLElBQUksT0FBTyxFQUFpRDs7Ozs7QUFHekYsTUFBTSxPQUFPLHFCQUFxQjs7OztJQTZCaEM7UUFGUSxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQWtCLENBQUM7UUFHOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzVDLENBQUM7Ozs7Ozs7Ozs7OztJQXpCRCxNQUFNLENBQUMsTUFBTSxDQUFVLEtBQTZCLEVBQUUsUUFBa0IsRUFBRSxNQUE0QjtRQUNwRyxJQUFJLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7U0FDaEU7O2NBRUssUUFBUSxHQUFHLElBQUkscUJBQXFCLEVBQUs7UUFDL0Msb0JBQW9CLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUUxQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUM3QixRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN6QixRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7Ozs7SUFhRCxTQUFTLENBQUMsS0FBcUI7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FB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T0FBTztRQUNuQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsSUFBSSx3QkFBd0IsQ0FBQyxDQUFDO1NBQ25GO2FBQU0sSUFBSSxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssVUFBVSxFQUFFO1lBQzVELE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLElBQUksa0RBQWtELENBQUMsQ0FBQztTQUM3RztRQUNELE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkUsQ0FBQzs7QUExRHVCLGlDQUFRLEdBQUcsSUFBSSxPQUFPLEVBQWdGLENBQUM7QUFDL0csZ0NBQU8sR0FBRyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7Ozs7OztJQUQzRSxrQ0FBK0g7O0lBQy9ILGlDQUEyRTs7SUFJM0UsMENBQXFDOztJQUNyQywwQ0FBNEM7Ozs7O0lBQzVDLHdDQUEyQzs7Ozs7SUFDM0MsMkNBQW9GOzs7OztJQUV4RSwyQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL3RhYmxlL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBQYmxOZ3JpZFBsdWdpbixcbiAgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24sXG4gIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzLFxuICBQYmxOZ3JpZEV2ZW50cyxcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4vdGFibGUtZXh0LWFwaSc7XG5pbXBvcnQgeyBQTFVHSU5fU1RPUkUgfSBmcm9tICcuL3RhYmxlLXBsdWdpbic7XG5cbmNvbnN0IFRBQkxFX1BMVUdJTl9DT05URVhUID0gbmV3IFdlYWtNYXA8UGJsTmdyaWRDb21wb25lbnQ8YW55PiwgUGJsTmdyaWRQbHVnaW5Db250ZXh0PigpO1xuXG4vKiogQGludGVybmFsICovXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRQbHVnaW5Db250ZXh0PFQgPSBhbnk+IHtcblxuICAvLyB3b3JrYXJvdW5kLCB3ZSBuZWVkIGEgcGFyYW1ldGVyLWxlc3MgY29uc3RydWN0b3Igc2luY2UgQG5ndG9vbHMvd2VicGFja0A4LjAuNFxuICAvLyBOb24gQEluamVjdGFibGUgY2xhc3NlcyBhcmUgbm93IGdldHRpbmcgYWRkZGVkIHdpdGggaGFyZCByZWZlcmVuY2UgdG8gdGhlIGN0b3IgcGFyYW1zIHdoaWNoIGF0IHRoZSBjbGFzcyBjcmVhdGlvbiBwb2ludCBhcmUgdW5kZWZpbmVkXG4gIC8vIGZvcndhcmRSZWYoKSB3aWxsIG5vdCBoZWxwIHNpbmNlIGl0J3Mgbm90IGluamVjdCBieSBhbmd1bGFyLCB3ZSBpbnN0YW50aWF0ZSB0aGUgY2xhc3MuLlxuICAvLyBwcm9iYWJseSBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci1jbGkvY29tbWl0LzYzOTE5ODQ5OTk3M2UwZjQzN2YwNTliM2M5MzNjNzJjNzMzZDkzZDhcbiAgc3RhdGljIGNyZWF0ZTxUID0gYW55Pih0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgaW5qZWN0b3I6IEluamVjdG9yLCBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpKTogUGJsTmdyaWRQbHVnaW5Db250ZXh0PFQ+IHtcbiAgICBpZiAoVEFCTEVfUExVR0lOX0NPTlRFWFQuaGFzKHRhYmxlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUYWJsZSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQgZm9yIGV4dGVuc2lvbnMuYCk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgUGJsTmdyaWRQbHVnaW5Db250ZXh0PFQ+KCk7XG4gICAgVEFCTEVfUExVR0lOX0NPTlRFWFQuc2V0KHRhYmxlLCBpbnN0YW5jZSk7XG5cbiAgICBpbnN0YW5jZS50YWJsZSA9IHRhYmxlO1xuICAgIGluc3RhbmNlLmluamVjdG9yID0gaW5qZWN0b3I7XG4gICAgaW5zdGFuY2UuZXh0QXBpID0gZXh0QXBpO1xuICAgIGluc3RhbmNlLmNvbnRyb2xsZXIgPSBuZXcgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKGluc3RhbmNlKTtcblxuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xuICBpbmplY3RvcjogSW5qZWN0b3I7XG4gIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk7XG4gIGNvbnRyb2xsZXI6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjxUPjtcbiAgcmVhZG9ubHkgZXZlbnRzOiBPYnNlcnZhYmxlPFBibE5ncmlkRXZlbnRzPjtcbiAgcHJpdmF0ZSBfZXZlbnRzID0gbmV3IFN1YmplY3Q8UGJsTmdyaWRFdmVudHM+KCk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmV2ZW50cyA9IHRoaXMuX2V2ZW50cy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGVtaXRFdmVudChldmVudDogUGJsTmdyaWRFdmVudHMpOiB2b2lkIHtcbiAgICB0aGlzLl9ldmVudHMubmV4dChldmVudCk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQgIHtcbiAgICBpZiAoIVRBQkxFX1BMVUdJTl9DT05URVhULmhhcyh0aGlzLnRhYmxlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUYWJsZSBpcyBub3QgcmVnaXN0ZXJlZC5gKTtcbiAgICB9XG4gICAgdGhpcy5fZXZlbnRzLmNvbXBsZXRlKCk7XG4gICAgVEFCTEVfUExVR0lOX0NPTlRFWFQuZGVsZXRlKHRoaXMudGFibGUpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI8VCA9IGFueT4ge1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBjcmVhdGVkJCA9IG5ldyBTdWJqZWN0PHsgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGNvbnRyb2xsZXI6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjxhbnk+IH0+KCk7XG4gIHN0YXRpYyByZWFkb25seSBjcmVhdGVkID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmNyZWF0ZWQkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7IHJldHVybiB0aGlzLmNvbnRleHQuaW5qZWN0b3I7IH1cblxuICByZWFkb25seSBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpXG4gIHJlYWRvbmx5IGV2ZW50czogT2JzZXJ2YWJsZTxQYmxOZ3JpZEV2ZW50cz47XG4gIHByaXZhdGUgcmVhZG9ubHkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD5cbiAgcHJpdmF0ZSByZWFkb25seSBwbHVnaW5zID0gbmV3IE1hcDxrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiwgUGJsTmdyaWRQbHVnaW4+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250ZXh0OiBQYmxOZ3JpZFBsdWdpbkNvbnRleHQpIHtcbiAgICB0aGlzLmdyaWQgPSBjb250ZXh0LnRhYmxlO1xuICAgIHRoaXMuZXh0QXBpID0gY29udGV4dC5leHRBcGk7XG4gICAgdGhpcy5ldmVudHMgPSBjb250ZXh0LmV2ZW50cztcbiAgICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuY3JlYXRlZCQubmV4dCh7IHRhYmxlOiB0aGlzLmdyaWQsIGNvbnRyb2xsZXI6IHRoaXMgfSk7XG4gIH1cblxuICBzdGF0aWMgZmluZDxUID0gYW55PihncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPik6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjxUPiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgY29udGV4dCA9IFRBQkxFX1BMVUdJTl9DT05URVhULmdldChncmlkKTtcbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgcmV0dXJuIGNvbnRleHQuY29udHJvbGxlcjtcbiAgICB9XG4gIH1cblxuICBoYXNQbHVnaW48UCBleHRlbmRzIGtleW9mIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uPihuYW1lOiBQKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGx1Z2lucy5oYXMobmFtZSk7XG4gIH1cblxuICBnZXRQbHVnaW48UCBleHRlbmRzIGtleW9mIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uPihuYW1lOiBQKTogUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25bUF0gfCB1bmRlZmluZWQgIHtcbiAgICByZXR1cm4gdGhpcy5wbHVnaW5zLmdldChuYW1lKSBhcyBhbnk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIHRoZSBgcGx1Z2luYCB3aXRoIHRoZSBgbmFtZWAgd2l0aCB0aGUgYHRhYmxlYFxuICAgKi9cbiAgc2V0UGx1Z2luPFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbj4obmFtZTogUCwgcGx1Z2luOiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbltQXSk6ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZCB7XG4gICAgaWYgKCFQTFVHSU5fU1RPUkUuaGFzKG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gcGx1Z2luICR7bmFtZX0uYCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBsdWdpbnMuaGFzKG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsdWdpbiAke25hbWV9IGlzIG5vdCByZWdpc3RlcmVkIGZvciB0aGlzIHRhYmxlLmApO1xuICAgIH1cbiAgICB0aGlzLnBsdWdpbnMuc2V0KG5hbWUsIHBsdWdpbik7XG4gICAgcmV0dXJuICh0Ymw6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHRoaXMuZ3JpZCA9PT0gdGJsICYmIHRoaXMucGx1Z2lucy5kZWxldGUobmFtZSk7XG4gIH1cblxuICBjcmVhdGVQbHVnaW48UCBleHRlbmRzIChrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3RvcmllcyAmIGtleW9mIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uKT4obmFtZTogUCk6IFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uW1BdIHtcbiAgICBpZiAoIVBMVUdJTl9TVE9SRS5oYXMobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBwbHVnaW4gJHtuYW1lfS5gKTtcbiAgICB9XG4gICAgY29uc3QgbWV0YWRhdGEgPSBQTFVHSU5fU1RPUkUuZ2V0KG5hbWUpO1xuICAgIGNvbnN0IG1ldGhvZE5hbWUgPSBtZXRhZGF0YS5mYWN0b3J5O1xuICAgIGlmICghbWV0aG9kTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBsdWdpbiBjb25maWd1cmF0aW9uIGZvciAke25hbWV9LCBubyBmYWN0b3J5IG1ldGFkYXRhLmApO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1ldGFkYXRhLnRhcmdldFttZXRob2ROYW1lXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBsdWdpbiBjb25maWd1cmF0aW9uIGZvciAke25hbWV9LCBmYWN0b3J5IG1ldGFkYXRhIGRvZXMgbm90IHBvaW50IHRvIGEgZnVuY3Rpb24uYCk7XG4gICAgfVxuICAgIHJldHVybiBtZXRhZGF0YS50YXJnZXRbbWV0aG9kTmFtZV0odGhpcy5ncmlkLCB0aGlzLmNvbnRleHQuaW5qZWN0b3IpO1xuICB9XG59XG4iXX0=