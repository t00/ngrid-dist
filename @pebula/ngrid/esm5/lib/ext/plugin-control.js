/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { PLUGIN_STORE } from './table-plugin';
/** @type {?} */
var TABLE_PLUGIN_CONTEXT = new WeakMap();
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
        if (TABLE_PLUGIN_CONTEXT.has(table)) {
            throw new Error("Table is already registered for extensions.");
        }
        /** @type {?} */
        var instance = new PblNgridPluginContext();
        TABLE_PLUGIN_CONTEXT.set(table, instance);
        instance.table = table;
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
        if (!TABLE_PLUGIN_CONTEXT.has(this.table)) {
            throw new Error("Table is not registered.");
        }
        this._events.complete();
        TABLE_PLUGIN_CONTEXT.delete(this.table);
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
var PblNgridPluginController = /** @class */ (function () {
    function PblNgridPluginController(context) {
        this.context = context;
        this.plugins = new Map();
        this.grid = context.table;
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
        var context = TABLE_PLUGIN_CONTEXT.get(grid);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLWNvbnRyb2wuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2V4dC9wbHVnaW4tY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQVczQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0lBRXhDLG9CQUFvQixHQUFHLElBQUksT0FBTyxFQUFpRDs7Ozs7QUFHekY7Ozs7O0lBNkJFO1FBRlEsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFrQixDQUFDO1FBRzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBN0JELGdGQUFnRjtJQUNoRix3SUFBd0k7SUFDeEksMEZBQTBGO0lBQzFGLHlHQUF5Rzs7Ozs7Ozs7Ozs7O0lBQ2xHLDRCQUFNOzs7Ozs7Ozs7Ozs7SUFBYixVQUF1QixLQUE2QixFQUFFLFFBQWtCLEVBQUUsTUFBNEI7UUFDcEcsSUFBSSxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1NBQ2hFOztZQUVLLFFBQVEsR0FBRyxJQUFJLHFCQUFxQixFQUFLO1FBQy9DLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFMUMsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDN0IsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDekIsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7Ozs7O0lB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QUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQWtCLElBQUksTUFBRyxDQUFDLENBQUM7U0FDNUM7O1lBQ0ssUUFBUSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDOztZQUNqQyxVQUFVLEdBQUcsUUFBUSxDQUFDLE9BQU87UUFDbkMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQW9DLElBQUksMkJBQXdCLENBQUMsQ0FBQztTQUNuRjthQUFNLElBQUksT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLFVBQVUsRUFBRTtZQUM1RCxNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFvQyxJQUFJLHFEQUFrRCxDQUFDLENBQUM7U0FDN0c7UUFDRCxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUExRHVCLGlDQUFRLEdBQUcsSUFBSSxPQUFPLEVBQWdGLENBQUM7SUFDL0csZ0NBQU8sR0FBRyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7SUEwRDdFLCtCQUFDO0NBQUEsQUE1REQsSUE0REM7U0E1RFksd0JBQXdCOzs7Ozs7SUFDbkMsa0NBQStIOztJQUMvSCxpQ0FBMkU7O0lBSTNFLDBDQUFxQzs7SUFDckMsMENBQTRDOzs7OztJQUM1Qyx3Q0FBMkM7Ozs7O0lBQzNDLDJDQUFvRjs7Ozs7SUFFeEUsMkNBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi90YWJsZS90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgUGJsTmdyaWRQbHVnaW4sXG4gIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uLFxuICBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3RvcmllcyxcbiAgUGJsTmdyaWRFdmVudHMsXG59IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuL3RhYmxlLWV4dC1hcGknO1xuaW1wb3J0IHsgUExVR0lOX1NUT1JFIH0gZnJvbSAnLi90YWJsZS1wbHVnaW4nO1xuXG5jb25zdCBUQUJMRV9QTFVHSU5fQ09OVEVYVCA9IG5ldyBXZWFrTWFwPFBibE5ncmlkQ29tcG9uZW50PGFueT4sIFBibE5ncmlkUGx1Z2luQ29udGV4dD4oKTtcblxuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGNsYXNzIFBibE5ncmlkUGx1Z2luQ29udGV4dDxUID0gYW55PiB7XG5cbiAgLy8gd29ya2Fyb3VuZCwgd2UgbmVlZCBhIHBhcmFtZXRlci1sZXNzIGNvbnN0cnVjdG9yIHNpbmNlIEBuZ3Rvb2xzL3dlYnBhY2tAOC4wLjRcbiAgLy8gTm9uIEBJbmplY3RhYmxlIGNsYXNzZXMgYXJlIG5vdyBnZXR0aW5nIGFkZGRlZCB3aXRoIGhhcmQgcmVmZXJlbmNlIHRvIHRoZSBjdG9yIHBhcmFtcyB3aGljaCBhdCB0aGUgY2xhc3MgY3JlYXRpb24gcG9pbnQgYXJlIHVuZGVmaW5lZFxuICAvLyBmb3J3YXJkUmVmKCkgd2lsbCBub3QgaGVscCBzaW5jZSBpdCdzIG5vdCBpbmplY3QgYnkgYW5ndWxhciwgd2UgaW5zdGFudGlhdGUgdGhlIGNsYXNzLi5cbiAgLy8gcHJvYmFibHkgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2NvbW1pdC82MzkxOTg0OTk5NzNlMGY0MzdmMDU5YjNjOTMzYzcyYzczM2Q5M2Q4XG4gIHN0YXRpYyBjcmVhdGU8VCA9IGFueT4odGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3RvciwgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaSk6IFBibE5ncmlkUGx1Z2luQ29udGV4dDxUPiB7XG4gICAgaWYgKFRBQkxFX1BMVUdJTl9DT05URVhULmhhcyh0YWJsZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGFibGUgaXMgYWxyZWFkeSByZWdpc3RlcmVkIGZvciBleHRlbnNpb25zLmApO1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFBibE5ncmlkUGx1Z2luQ29udGV4dDxUPigpO1xuICAgIFRBQkxFX1BMVUdJTl9DT05URVhULnNldCh0YWJsZSwgaW5zdGFuY2UpO1xuXG4gICAgaW5zdGFuY2UudGFibGUgPSB0YWJsZTtcbiAgICBpbnN0YW5jZS5pbmplY3RvciA9IGluamVjdG9yO1xuICAgIGluc3RhbmNlLmV4dEFwaSA9IGV4dEFwaTtcbiAgICBpbnN0YW5jZS5jb250cm9sbGVyID0gbmV3IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcihpbnN0YW5jZSk7XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PjtcbiAgaW5qZWN0b3I6IEluamVjdG9yO1xuICBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpO1xuICBjb250cm9sbGVyOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI8VD47XG4gIHJlYWRvbmx5IGV2ZW50czogT2JzZXJ2YWJsZTxQYmxOZ3JpZEV2ZW50cz47XG4gIHByaXZhdGUgX2V2ZW50cyA9IG5ldyBTdWJqZWN0PFBibE5ncmlkRXZlbnRzPigpO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ldmVudHMgPSB0aGlzLl9ldmVudHMuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBlbWl0RXZlbnQoZXZlbnQ6IFBibE5ncmlkRXZlbnRzKTogdm9pZCB7XG4gICAgdGhpcy5fZXZlbnRzLm5leHQoZXZlbnQpO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkICB7XG4gICAgaWYgKCFUQUJMRV9QTFVHSU5fQ09OVEVYVC5oYXModGhpcy50YWJsZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGFibGUgaXMgbm90IHJlZ2lzdGVyZWQuYCk7XG4gICAgfVxuICAgIHRoaXMuX2V2ZW50cy5jb21wbGV0ZSgpO1xuICAgIFRBQkxFX1BMVUdJTl9DT05URVhULmRlbGV0ZSh0aGlzLnRhYmxlKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyPFQgPSBhbnk+IHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgY3JlYXRlZCQgPSBuZXcgU3ViamVjdDx7IHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBjb250cm9sbGVyOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI8YW55PiB9PigpO1xuICBzdGF0aWMgcmVhZG9ubHkgY3JlYXRlZCA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5jcmVhdGVkJC5hc09ic2VydmFibGUoKTtcblxuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3IgeyByZXR1cm4gdGhpcy5jb250ZXh0LmluamVjdG9yOyB9XG5cbiAgcmVhZG9ubHkgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaVxuICByZWFkb25seSBldmVudHM6IE9ic2VydmFibGU8UGJsTmdyaWRFdmVudHM+O1xuICBwcml2YXRlIHJlYWRvbmx5IGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+XG4gIHByaXZhdGUgcmVhZG9ubHkgcGx1Z2lucyA9IG5ldyBNYXA8a2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24sIFBibE5ncmlkUGx1Z2luPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGV4dDogUGJsTmdyaWRQbHVnaW5Db250ZXh0KSB7XG4gICAgdGhpcy5ncmlkID0gY29udGV4dC50YWJsZTtcbiAgICB0aGlzLmV4dEFwaSA9IGNvbnRleHQuZXh0QXBpO1xuICAgIHRoaXMuZXZlbnRzID0gY29udGV4dC5ldmVudHM7XG4gICAgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmNyZWF0ZWQkLm5leHQoeyB0YWJsZTogdGhpcy5ncmlkLCBjb250cm9sbGVyOiB0aGlzIH0pO1xuICB9XG5cbiAgc3RhdGljIGZpbmQ8VCA9IGFueT4oZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD4pOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI8VD4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGNvbnRleHQgPSBUQUJMRV9QTFVHSU5fQ09OVEVYVC5nZXQoZ3JpZCk7XG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgIHJldHVybiBjb250ZXh0LmNvbnRyb2xsZXI7XG4gICAgfVxuICB9XG5cbiAgaGFzUGx1Z2luPFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbj4obmFtZTogUCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBsdWdpbnMuaGFzKG5hbWUpO1xuICB9XG5cbiAgZ2V0UGx1Z2luPFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbj4obmFtZTogUCk6IFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uW1BdIHwgdW5kZWZpbmVkICB7XG4gICAgcmV0dXJuIHRoaXMucGx1Z2lucy5nZXQobmFtZSkgYXMgYW55O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyB0aGUgYHBsdWdpbmAgd2l0aCB0aGUgYG5hbWVgIHdpdGggdGhlIGB0YWJsZWBcbiAgICovXG4gIHNldFBsdWdpbjxQIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24+KG5hbWU6IFAsIHBsdWdpbjogUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25bUF0pOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQge1xuICAgIGlmICghUExVR0lOX1NUT1JFLmhhcyhuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHBsdWdpbiAke25hbWV9LmApO1xuICAgIH1cbiAgICBpZiAodGhpcy5wbHVnaW5zLmhhcyhuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQbHVnaW4gJHtuYW1lfSBpcyBub3QgcmVnaXN0ZXJlZCBmb3IgdGhpcyB0YWJsZS5gKTtcbiAgICB9XG4gICAgdGhpcy5wbHVnaW5zLnNldChuYW1lLCBwbHVnaW4pO1xuICAgIHJldHVybiAodGJsOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB0aGlzLmdyaWQgPT09IHRibCAmJiB0aGlzLnBsdWdpbnMuZGVsZXRlKG5hbWUpO1xuICB9XG5cbiAgY3JlYXRlUGx1Z2luPFAgZXh0ZW5kcyAoa2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMgJiBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbik+KG5hbWU6IFApOiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbltQXSB7XG4gICAgaWYgKCFQTFVHSU5fU1RPUkUuaGFzKG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gcGx1Z2luICR7bmFtZX0uYCk7XG4gICAgfVxuICAgIGNvbnN0IG1ldGFkYXRhID0gUExVR0lOX1NUT1JFLmdldChuYW1lKTtcbiAgICBjb25zdCBtZXRob2ROYW1lID0gbWV0YWRhdGEuZmFjdG9yeTtcbiAgICBpZiAoIW1ldGhvZE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwbHVnaW4gY29uZmlndXJhdGlvbiBmb3IgJHtuYW1lfSwgbm8gZmFjdG9yeSBtZXRhZGF0YS5gKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRhZGF0YS50YXJnZXRbbWV0aG9kTmFtZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwbHVnaW4gY29uZmlndXJhdGlvbiBmb3IgJHtuYW1lfSwgZmFjdG9yeSBtZXRhZGF0YSBkb2VzIG5vdCBwb2ludCB0byBhIGZ1bmN0aW9uLmApO1xuICAgIH1cbiAgICByZXR1cm4gbWV0YWRhdGEudGFyZ2V0W21ldGhvZE5hbWVdKHRoaXMuZ3JpZCwgdGhpcy5jb250ZXh0LmluamVjdG9yKTtcbiAgfVxufVxuIl19