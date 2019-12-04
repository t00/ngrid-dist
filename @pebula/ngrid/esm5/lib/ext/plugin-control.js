/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLWNvbnRyb2wuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2V4dC9wbHVnaW4tY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQVczQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQUV2QyxvQkFBb0IsR0FBRyxJQUFJLE9BQU8sRUFBaUQ7Ozs7O0FBR3pGOzs7OztJQTZCRTtRQUZRLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBa0IsQ0FBQztRQUc5QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQTdCRCxnRkFBZ0Y7SUFDaEYsd0lBQXdJO0lBQ3hJLDBGQUEwRjtJQUMxRix5R0FBeUc7Ozs7Ozs7Ozs7OztJQUNsRyw0QkFBTTs7Ozs7Ozs7Ozs7O0lBQWIsVUFBdUIsS0FBNkIsRUFBRSxRQUFrQixFQUFFLE1BQTRCO1FBQ3BHLElBQUksb0JBQW9CLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztTQUNoRTs7WUFFSyxRQUFRLEdBQUcsSUFBSSxxQkFBcUIsRUFBSztRQUMvQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzdCLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU3RCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOzs7OztJQWFE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LEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFrQixJQUFJLE1BQUcsQ0FBQyxDQUFDO1NBQzVDOztZQUNLLFFBQVEsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQzs7WUFDakMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxPQUFPO1FBQ25DLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFvQyxJQUFJLDJCQUF3QixDQUFDLENBQUM7U0FDbkY7YUFBTSxJQUFJLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxVQUFVLEVBQUU7WUFDNUQsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBb0MsSUFBSSxxREFBa0QsQ0FBQyxDQUFDO1NBQzdHO1FBQ0QsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBMUR1QixpQ0FBUSxHQUFHLElBQUksT0FBTyxFQUFnRixDQUFDO0lBQy9HLGdDQUFPLEdBQUcsd0JBQXdCLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBMEQ3RSwrQkFBQztDQUFBLEFBNURELElBNERDO1NBNURZLHdCQUF3Qjs7Ozs7O0lBQ25DLGtDQUErSDs7SUFDL0gsaUNBQTJFOztJQUkzRSwwQ0FBcUM7O0lBQ3JDLDBDQUE0Qzs7Ozs7SUFDNUMsd0NBQTJDOzs7OztJQUMzQywyQ0FBb0Y7Ozs7O0lBRXhFLDJDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vZ3JpZC9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgUGJsTmdyaWRQbHVnaW4sXG4gIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uLFxuICBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3RvcmllcyxcbiAgUGJsTmdyaWRFdmVudHMsXG59IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuL2dyaWQtZXh0LWFwaSc7XG5pbXBvcnQgeyBQTFVHSU5fU1RPUkUgfSBmcm9tICcuL2dyaWQtcGx1Z2luJztcblxuY29uc3QgTkdSSURfUExVR0lOX0NPTlRFWFQgPSBuZXcgV2Vha01hcDxQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBQYmxOZ3JpZFBsdWdpbkNvbnRleHQ+KCk7XG5cbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFBsdWdpbkNvbnRleHQ8VCA9IGFueT4ge1xuXG4gIC8vIHdvcmthcm91bmQsIHdlIG5lZWQgYSBwYXJhbWV0ZXItbGVzcyBjb25zdHJ1Y3RvciBzaW5jZSBAbmd0b29scy93ZWJwYWNrQDguMC40XG4gIC8vIE5vbiBASW5qZWN0YWJsZSBjbGFzc2VzIGFyZSBub3cgZ2V0dGluZyBhZGRkZWQgd2l0aCBoYXJkIHJlZmVyZW5jZSB0byB0aGUgY3RvciBwYXJhbXMgd2hpY2ggYXQgdGhlIGNsYXNzIGNyZWF0aW9uIHBvaW50IGFyZSB1bmRlZmluZWRcbiAgLy8gZm9yd2FyZFJlZigpIHdpbGwgbm90IGhlbHAgc2luY2UgaXQncyBub3QgaW5qZWN0IGJ5IGFuZ3VsYXIsIHdlIGluc3RhbnRpYXRlIHRoZSBjbGFzcy4uXG4gIC8vIHByb2JhYmx5IGR1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyLWNsaS9jb21taXQvNjM5MTk4NDk5OTczZTBmNDM3ZjA1OWIzYzkzM2M3MmM3MzNkOTNkOFxuICBzdGF0aWMgY3JlYXRlPFQgPSBhbnk+KHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBpbmplY3RvcjogSW5qZWN0b3IsIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGkpOiBQYmxOZ3JpZFBsdWdpbkNvbnRleHQ8VD4ge1xuICAgIGlmIChOR1JJRF9QTFVHSU5fQ09OVEVYVC5oYXModGFibGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRhYmxlIGlzIGFscmVhZHkgcmVnaXN0ZXJlZCBmb3IgZXh0ZW5zaW9ucy5gKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBQYmxOZ3JpZFBsdWdpbkNvbnRleHQ8VD4oKTtcbiAgICBOR1JJRF9QTFVHSU5fQ09OVEVYVC5zZXQodGFibGUsIGluc3RhbmNlKTtcblxuICAgIGluc3RhbmNlLmdyaWQgPSB0YWJsZTtcbiAgICBpbnN0YW5jZS5pbmplY3RvciA9IGluamVjdG9yO1xuICAgIGluc3RhbmNlLmV4dEFwaSA9IGV4dEFwaTtcbiAgICBpbnN0YW5jZS5jb250cm9sbGVyID0gbmV3IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcihpbnN0YW5jZSk7XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xuICBpbmplY3RvcjogSW5qZWN0b3I7XG4gIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk7XG4gIGNvbnRyb2xsZXI6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjxUPjtcbiAgcmVhZG9ubHkgZXZlbnRzOiBPYnNlcnZhYmxlPFBibE5ncmlkRXZlbnRzPjtcbiAgcHJpdmF0ZSBfZXZlbnRzID0gbmV3IFN1YmplY3Q8UGJsTmdyaWRFdmVudHM+KCk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmV2ZW50cyA9IHRoaXMuX2V2ZW50cy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGVtaXRFdmVudChldmVudDogUGJsTmdyaWRFdmVudHMpOiB2b2lkIHtcbiAgICB0aGlzLl9ldmVudHMubmV4dChldmVudCk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQgIHtcbiAgICBpZiAoIU5HUklEX1BMVUdJTl9DT05URVhULmhhcyh0aGlzLmdyaWQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRhYmxlIGlzIG5vdCByZWdpc3RlcmVkLmApO1xuICAgIH1cbiAgICB0aGlzLl9ldmVudHMuY29tcGxldGUoKTtcbiAgICBOR1JJRF9QTFVHSU5fQ09OVEVYVC5kZWxldGUodGhpcy5ncmlkKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyPFQgPSBhbnk+IHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgY3JlYXRlZCQgPSBuZXcgU3ViamVjdDx7IHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBjb250cm9sbGVyOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI8YW55PiB9PigpO1xuICBzdGF0aWMgcmVhZG9ubHkgY3JlYXRlZCA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5jcmVhdGVkJC5hc09ic2VydmFibGUoKTtcblxuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3IgeyByZXR1cm4gdGhpcy5jb250ZXh0LmluamVjdG9yOyB9XG5cbiAgcmVhZG9ubHkgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaVxuICByZWFkb25seSBldmVudHM6IE9ic2VydmFibGU8UGJsTmdyaWRFdmVudHM+O1xuICBwcml2YXRlIHJlYWRvbmx5IGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+XG4gIHByaXZhdGUgcmVhZG9ubHkgcGx1Z2lucyA9IG5ldyBNYXA8a2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24sIFBibE5ncmlkUGx1Z2luPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGV4dDogUGJsTmdyaWRQbHVnaW5Db250ZXh0KSB7XG4gICAgdGhpcy5ncmlkID0gY29udGV4dC5ncmlkO1xuICAgIHRoaXMuZXh0QXBpID0gY29udGV4dC5leHRBcGk7XG4gICAgdGhpcy5ldmVudHMgPSBjb250ZXh0LmV2ZW50cztcbiAgICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuY3JlYXRlZCQubmV4dCh7IHRhYmxlOiB0aGlzLmdyaWQsIGNvbnRyb2xsZXI6IHRoaXMgfSk7XG4gIH1cblxuICBzdGF0aWMgZmluZDxUID0gYW55PihncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPik6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjxUPiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgY29udGV4dCA9IE5HUklEX1BMVUdJTl9DT05URVhULmdldChncmlkKTtcbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgcmV0dXJuIGNvbnRleHQuY29udHJvbGxlcjtcbiAgICB9XG4gIH1cblxuICBoYXNQbHVnaW48UCBleHRlbmRzIGtleW9mIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uPihuYW1lOiBQKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGx1Z2lucy5oYXMobmFtZSk7XG4gIH1cblxuICBnZXRQbHVnaW48UCBleHRlbmRzIGtleW9mIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uPihuYW1lOiBQKTogUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25bUF0gfCB1bmRlZmluZWQgIHtcbiAgICByZXR1cm4gdGhpcy5wbHVnaW5zLmdldChuYW1lKSBhcyBhbnk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIHRoZSBgcGx1Z2luYCB3aXRoIHRoZSBgbmFtZWAgd2l0aCB0aGUgYHRhYmxlYFxuICAgKi9cbiAgc2V0UGx1Z2luPFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbj4obmFtZTogUCwgcGx1Z2luOiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbltQXSk6ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZCB7XG4gICAgaWYgKCFQTFVHSU5fU1RPUkUuaGFzKG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gcGx1Z2luICR7bmFtZX0uYCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBsdWdpbnMuaGFzKG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsdWdpbiAke25hbWV9IGlzIG5vdCByZWdpc3RlcmVkIGZvciB0aGlzIHRhYmxlLmApO1xuICAgIH1cbiAgICB0aGlzLnBsdWdpbnMuc2V0KG5hbWUsIHBsdWdpbik7XG4gICAgcmV0dXJuICh0Ymw6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHRoaXMuZ3JpZCA9PT0gdGJsICYmIHRoaXMucGx1Z2lucy5kZWxldGUobmFtZSk7XG4gIH1cblxuICBjcmVhdGVQbHVnaW48UCBleHRlbmRzIChrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3RvcmllcyAmIGtleW9mIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uKT4obmFtZTogUCk6IFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uW1BdIHtcbiAgICBpZiAoIVBMVUdJTl9TVE9SRS5oYXMobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBwbHVnaW4gJHtuYW1lfS5gKTtcbiAgICB9XG4gICAgY29uc3QgbWV0YWRhdGEgPSBQTFVHSU5fU1RPUkUuZ2V0KG5hbWUpO1xuICAgIGNvbnN0IG1ldGhvZE5hbWUgPSBtZXRhZGF0YS5mYWN0b3J5O1xuICAgIGlmICghbWV0aG9kTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBsdWdpbiBjb25maWd1cmF0aW9uIGZvciAke25hbWV9LCBubyBmYWN0b3J5IG1ldGFkYXRhLmApO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1ldGFkYXRhLnRhcmdldFttZXRob2ROYW1lXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBsdWdpbiBjb25maWd1cmF0aW9uIGZvciAke25hbWV9LCBmYWN0b3J5IG1ldGFkYXRhIGRvZXMgbm90IHBvaW50IHRvIGEgZnVuY3Rpb24uYCk7XG4gICAgfVxuICAgIHJldHVybiBtZXRhZGF0YS50YXJnZXRbbWV0aG9kTmFtZV0odGhpcy5ncmlkLCB0aGlzLmNvbnRleHQuaW5qZWN0b3IpO1xuICB9XG59XG4iXX0=