/**
 * @fileoverview added by tsickle
 * Generated from: lib/ext/plugin-control.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { PLUGIN_STORE } from './grid-plugin';
/** @type {?} */
var NGRID_PLUGIN_CONTEXT = new WeakMap();
/**
 * \@internal
 * @template T
 */
var /**
 * \@internal
 * @template T
 */
PblNgridPluginContext = /** @class */ (function () {
    function PblNgridPluginContext() {
        this._events = new Subject();
        this.events = this._events.asObservable();
    }
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
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
    PblNgridPluginContext.create = 
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
    function (table, injector, extApi) {
        if (NGRID_PLUGIN_CONTEXT.has(table)) {
            throw new Error("Table is already registered for extensions.");
        }
        /** @type {?} */
        var instance = new PblNgridPluginContext();
        NGRID_PLUGIN_CONTEXT.set(table, instance);
        instance.grid = table;
        instance.injector = injector;
        instance.extApi = extApi;
        instance.controller = new PblNgridPluginController(instance);
        return instance;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PblNgridPluginContext.prototype.emitEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._events.next(event);
    };
    /**
     * @return {?}
     */
    PblNgridPluginContext.prototype.destroy = /**
     * @return {?}
     */
    function () {
        if (!NGRID_PLUGIN_CONTEXT.has(this.grid)) {
            throw new Error("Table is not registered.");
        }
        this._events.complete();
        NGRID_PLUGIN_CONTEXT.delete(this.grid);
    };
    return PblNgridPluginContext;
}());
/**
 * \@internal
 * @template T
 */
export { PblNgridPluginContext };
if (false) {
    /** @type {?} */
    PblNgridPluginContext.prototype.grid;
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
var PblNgridPluginController = /** @class */ (function () {
    function PblNgridPluginController(context) {
        this.context = context;
        this.plugins = new Map();
        this.grid = context.grid;
        this.extApi = context.extApi;
        this.events = context.events;
        PblNgridPluginController.created$.next({ table: this.grid, controller: this });
    }
    Object.defineProperty(PblNgridPluginController.prototype, "injector", {
        get: /**
         * @return {?}
         */
        function () { return this.context.injector; },
        enumerable: true,
        configurable: true
    });
    /**
     * @template T
     * @param {?} grid
     * @return {?}
     */
    PblNgridPluginController.find = /**
     * @template T
     * @param {?} grid
     * @return {?}
     */
    function (grid) {
        /** @type {?} */
        var context = NGRID_PLUGIN_CONTEXT.get(grid);
        if (context) {
            return context.controller;
        }
    };
    /**
     * @template P
     * @param {?} name
     * @return {?}
     */
    PblNgridPluginController.prototype.hasPlugin = /**
     * @template P
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this.plugins.has(name);
    };
    /**
     * @template P
     * @param {?} name
     * @return {?}
     */
    PblNgridPluginController.prototype.getPlugin = /**
     * @template P
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return (/** @type {?} */ (this.plugins.get(name)));
    };
    /**
     * Registers the `plugin` with the `name` with the `table`
     */
    /**
     * Registers the `plugin` with the `name` with the `table`
     * @template P
     * @param {?} name
     * @param {?} plugin
     * @return {?}
     */
    PblNgridPluginController.prototype.setPlugin = /**
     * Registers the `plugin` with the `name` with the `table`
     * @template P
     * @param {?} name
     * @param {?} plugin
     * @return {?}
     */
    function (name, plugin) {
        var _this = this;
        if (!PLUGIN_STORE.has(name)) {
            throw new Error("Unknown plugin " + name + ".");
        }
        if (this.plugins.has(name)) {
            throw new Error("Plugin " + name + " is not registered for this table.");
        }
        this.plugins.set(name, plugin);
        return (/**
         * @param {?} tbl
         * @return {?}
         */
        function (tbl) { return _this.grid === tbl && _this.plugins.delete(name); });
    };
    /**
     * @template P
     * @param {?} name
     * @return {?}
     */
    PblNgridPluginController.prototype.createPlugin = /**
     * @template P
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (!PLUGIN_STORE.has(name)) {
            throw new Error("Unknown plugin " + name + ".");
        }
        /** @type {?} */
        var metadata = PLUGIN_STORE.get(name);
        /** @type {?} */
        var methodName = metadata.factory;
        if (!methodName) {
            throw new Error("Invalid plugin configuration for " + name + ", no factory metadata.");
        }
        else if (typeof metadata.target[methodName] !== 'function') {
            throw new Error("Invalid plugin configuration for " + name + ", factory metadata does not point to a function.");
        }
        return metadata.target[methodName](this.grid, this.context.injector);
    };
    PblNgridPluginController.created$ = new Subject();
    PblNgridPluginController.created = PblNgridPluginController.created$.asObservable();
    return PblNgridPluginController;
}());
export { PblNgridPluginController };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLWNvbnRyb2wuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2V4dC9wbHVnaW4tY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFXM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUFFdkMsb0JBQW9CLEdBQUcsSUFBSSxPQUFPLEVBQWlEOzs7OztBQUd6Rjs7Ozs7SUE2QkU7UUFGUSxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQWtCLENBQUM7UUFHOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzVDLENBQUM7SUE3QkQsZ0ZBQWdGO0lBQ2hGLHdJQUF3STtJQUN4SSwwRkFBMEY7SUFDMUYseUdBQXlHOzs7Ozs7Ozs7Ozs7SUFDbEcsNEJBQU07Ozs7Ozs7Ozs7OztJQUFiLFVBQXVCLEtBQTZCLEVBQUUsUUFBa0IsRUFBRSxNQUE0QjtRQUNwRyxJQUFJLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7U0FDaEU7O1lBRUssUUFBUSxHQUFHLElBQUkscUJBQXFCLEVBQUs7UUFDL0Msb0JBQW9CLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUUxQyxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUN0QixRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUM3QixRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN6QixRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7Ozs7SUFh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QyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBa0IsSUFBSSxNQUFHLENBQUMsQ0FBQztTQUM1Qzs7WUFDSyxRQUFRLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7O1lBQ2pDLFVBQVUsR0FBRyxRQUFRLENBQUMsT0FBTztRQUNuQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBb0MsSUFBSSwyQkFBd0IsQ0FBQyxDQUFDO1NBQ25GO2FBQU0sSUFBSSxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssVUFBVSxFQUFFO1lBQzVELE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQW9DLElBQUkscURBQWtELENBQUMsQ0FBQztTQUM3RztRQUNELE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQTFEdUIsaUNBQVEsR0FBRyxJQUFJLE9BQU8sRUFBZ0YsQ0FBQztJQUMvRyxnQ0FBTyxHQUFHLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQTBEN0UsK0JBQUM7Q0FBQSxBQTVERCxJQTREQztTQTVEWSx3QkFBd0I7Ozs7OztJQUNuQyxrQ0FBK0g7O0lBQy9ILGlDQUEyRTs7SUFJM0UsMENBQXFDOztJQUNyQywwQ0FBNEM7Ozs7O0lBQzVDLHdDQUEyQzs7Ozs7SUFDM0MsMkNBQW9GOzs7OztJQUV4RSwyQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2dyaWQvbmdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIFBibE5ncmlkUGx1Z2luLFxuICBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbixcbiAgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMsXG4gIFBibE5ncmlkRXZlbnRzLFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgUExVR0lOX1NUT1JFIH0gZnJvbSAnLi9ncmlkLXBsdWdpbic7XG5cbmNvbnN0IE5HUklEX1BMVUdJTl9DT05URVhUID0gbmV3IFdlYWtNYXA8UGJsTmdyaWRDb21wb25lbnQ8YW55PiwgUGJsTmdyaWRQbHVnaW5Db250ZXh0PigpO1xuXG4vKiogQGludGVybmFsICovXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRQbHVnaW5Db250ZXh0PFQgPSBhbnk+IHtcblxuICAvLyB3b3JrYXJvdW5kLCB3ZSBuZWVkIGEgcGFyYW1ldGVyLWxlc3MgY29uc3RydWN0b3Igc2luY2UgQG5ndG9vbHMvd2VicGFja0A4LjAuNFxuICAvLyBOb24gQEluamVjdGFibGUgY2xhc3NlcyBhcmUgbm93IGdldHRpbmcgYWRkZGVkIHdpdGggaGFyZCByZWZlcmVuY2UgdG8gdGhlIGN0b3IgcGFyYW1zIHdoaWNoIGF0IHRoZSBjbGFzcyBjcmVhdGlvbiBwb2ludCBhcmUgdW5kZWZpbmVkXG4gIC8vIGZvcndhcmRSZWYoKSB3aWxsIG5vdCBoZWxwIHNpbmNlIGl0J3Mgbm90IGluamVjdCBieSBhbmd1bGFyLCB3ZSBpbnN0YW50aWF0ZSB0aGUgY2xhc3MuLlxuICAvLyBwcm9iYWJseSBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci1jbGkvY29tbWl0LzYzOTE5ODQ5OTk3M2UwZjQzN2YwNTliM2M5MzNjNzJjNzMzZDkzZDhcbiAgc3RhdGljIGNyZWF0ZTxUID0gYW55Pih0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgaW5qZWN0b3I6IEluamVjdG9yLCBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpKTogUGJsTmdyaWRQbHVnaW5Db250ZXh0PFQ+IHtcbiAgICBpZiAoTkdSSURfUExVR0lOX0NPTlRFWFQuaGFzKHRhYmxlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUYWJsZSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQgZm9yIGV4dGVuc2lvbnMuYCk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgUGJsTmdyaWRQbHVnaW5Db250ZXh0PFQ+KCk7XG4gICAgTkdSSURfUExVR0lOX0NPTlRFWFQuc2V0KHRhYmxlLCBpbnN0YW5jZSk7XG5cbiAgICBpbnN0YW5jZS5ncmlkID0gdGFibGU7XG4gICAgaW5zdGFuY2UuaW5qZWN0b3IgPSBpbmplY3RvcjtcbiAgICBpbnN0YW5jZS5leHRBcGkgPSBleHRBcGk7XG4gICAgaW5zdGFuY2UuY29udHJvbGxlciA9IG5ldyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIoaW5zdGFuY2UpO1xuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PjtcbiAgaW5qZWN0b3I6IEluamVjdG9yO1xuICBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpO1xuICBjb250cm9sbGVyOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI8VD47XG4gIHJlYWRvbmx5IGV2ZW50czogT2JzZXJ2YWJsZTxQYmxOZ3JpZEV2ZW50cz47XG4gIHByaXZhdGUgX2V2ZW50cyA9IG5ldyBTdWJqZWN0PFBibE5ncmlkRXZlbnRzPigpO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ldmVudHMgPSB0aGlzLl9ldmVudHMuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBlbWl0RXZlbnQoZXZlbnQ6IFBibE5ncmlkRXZlbnRzKTogdm9pZCB7XG4gICAgdGhpcy5fZXZlbnRzLm5leHQoZXZlbnQpO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkICB7XG4gICAgaWYgKCFOR1JJRF9QTFVHSU5fQ09OVEVYVC5oYXModGhpcy5ncmlkKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUYWJsZSBpcyBub3QgcmVnaXN0ZXJlZC5gKTtcbiAgICB9XG4gICAgdGhpcy5fZXZlbnRzLmNvbXBsZXRlKCk7XG4gICAgTkdSSURfUExVR0lOX0NPTlRFWFQuZGVsZXRlKHRoaXMuZ3JpZCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjxUID0gYW55PiB7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGNyZWF0ZWQkID0gbmV3IFN1YmplY3Q8eyB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgY29udHJvbGxlcjogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyPGFueT4gfT4oKTtcbiAgc3RhdGljIHJlYWRvbmx5IGNyZWF0ZWQgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuY3JlYXRlZCQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgZ2V0IGluamVjdG9yKCk6IEluamVjdG9yIHsgcmV0dXJuIHRoaXMuY29udGV4dC5pbmplY3RvcjsgfVxuXG4gIHJlYWRvbmx5IGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGlcbiAgcmVhZG9ubHkgZXZlbnRzOiBPYnNlcnZhYmxlPFBibE5ncmlkRXZlbnRzPjtcbiAgcHJpdmF0ZSByZWFkb25seSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPlxuICBwcml2YXRlIHJlYWRvbmx5IHBsdWdpbnMgPSBuZXcgTWFwPGtleW9mIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uLCBQYmxOZ3JpZFBsdWdpbj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRleHQ6IFBibE5ncmlkUGx1Z2luQ29udGV4dCkge1xuICAgIHRoaXMuZ3JpZCA9IGNvbnRleHQuZ3JpZDtcbiAgICB0aGlzLmV4dEFwaSA9IGNvbnRleHQuZXh0QXBpO1xuICAgIHRoaXMuZXZlbnRzID0gY29udGV4dC5ldmVudHM7XG4gICAgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmNyZWF0ZWQkLm5leHQoeyB0YWJsZTogdGhpcy5ncmlkLCBjb250cm9sbGVyOiB0aGlzIH0pO1xuICB9XG5cbiAgc3RhdGljIGZpbmQ8VCA9IGFueT4oZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD4pOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI8VD4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGNvbnRleHQgPSBOR1JJRF9QTFVHSU5fQ09OVEVYVC5nZXQoZ3JpZCk7XG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgIHJldHVybiBjb250ZXh0LmNvbnRyb2xsZXI7XG4gICAgfVxuICB9XG5cbiAgaGFzUGx1Z2luPFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbj4obmFtZTogUCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBsdWdpbnMuaGFzKG5hbWUpO1xuICB9XG5cbiAgZ2V0UGx1Z2luPFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbj4obmFtZTogUCk6IFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uW1BdIHwgdW5kZWZpbmVkICB7XG4gICAgcmV0dXJuIHRoaXMucGx1Z2lucy5nZXQobmFtZSkgYXMgYW55O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyB0aGUgYHBsdWdpbmAgd2l0aCB0aGUgYG5hbWVgIHdpdGggdGhlIGB0YWJsZWBcbiAgICovXG4gIHNldFBsdWdpbjxQIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24+KG5hbWU6IFAsIHBsdWdpbjogUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25bUF0pOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQge1xuICAgIGlmICghUExVR0lOX1NUT1JFLmhhcyhuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHBsdWdpbiAke25hbWV9LmApO1xuICAgIH1cbiAgICBpZiAodGhpcy5wbHVnaW5zLmhhcyhuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQbHVnaW4gJHtuYW1lfSBpcyBub3QgcmVnaXN0ZXJlZCBmb3IgdGhpcyB0YWJsZS5gKTtcbiAgICB9XG4gICAgdGhpcy5wbHVnaW5zLnNldChuYW1lLCBwbHVnaW4pO1xuICAgIHJldHVybiAodGJsOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB0aGlzLmdyaWQgPT09IHRibCAmJiB0aGlzLnBsdWdpbnMuZGVsZXRlKG5hbWUpO1xuICB9XG5cbiAgY3JlYXRlUGx1Z2luPFAgZXh0ZW5kcyAoa2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMgJiBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbik+KG5hbWU6IFApOiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbltQXSB7XG4gICAgaWYgKCFQTFVHSU5fU1RPUkUuaGFzKG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gcGx1Z2luICR7bmFtZX0uYCk7XG4gICAgfVxuICAgIGNvbnN0IG1ldGFkYXRhID0gUExVR0lOX1NUT1JFLmdldChuYW1lKTtcbiAgICBjb25zdCBtZXRob2ROYW1lID0gbWV0YWRhdGEuZmFjdG9yeTtcbiAgICBpZiAoIW1ldGhvZE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwbHVnaW4gY29uZmlndXJhdGlvbiBmb3IgJHtuYW1lfSwgbm8gZmFjdG9yeSBtZXRhZGF0YS5gKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRhZGF0YS50YXJnZXRbbWV0aG9kTmFtZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwbHVnaW4gY29uZmlndXJhdGlvbiBmb3IgJHtuYW1lfSwgZmFjdG9yeSBtZXRhZGF0YSBkb2VzIG5vdCBwb2ludCB0byBhIGZ1bmN0aW9uLmApO1xuICAgIH1cbiAgICByZXR1cm4gbWV0YWRhdGEudGFyZ2V0W21ldGhvZE5hbWVdKHRoaXMuZ3JpZCwgdGhpcy5jb250ZXh0LmluamVjdG9yKTtcbiAgfVxufVxuIl19