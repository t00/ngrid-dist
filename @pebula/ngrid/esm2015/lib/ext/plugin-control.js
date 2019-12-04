/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { PLUGIN_STORE } from './grid-plugin';
/** @type {?} */
const NGRID_PLUGIN_CONTEXT = new WeakMap();
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
        if (NGRID_PLUGIN_CONTEXT.has(table)) {
            throw new Error(`Table is already registered for extensions.`);
        }
        /** @type {?} */
        const instance = new PblNgridPluginContext();
        NGRID_PLUGIN_CONTEXT.set(table, instance);
        instance.grid = table;
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
        if (!NGRID_PLUGIN_CONTEXT.has(this.grid)) {
            throw new Error(`Table is not registered.`);
        }
        this._events.complete();
        NGRID_PLUGIN_CONTEXT.delete(this.grid);
    }
}
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
export class PblNgridPluginController {
    /**
     * @param {?} context
     */
    constructor(context) {
        this.context = context;
        this.plugins = new Map();
        this.grid = context.grid;
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
        const context = NGRID_PLUGIN_CONTEXT.get(grid);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLWNvbnRyb2wuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2V4dC9wbHVnaW4tY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQVczQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOztNQUV2QyxvQkFBb0IsR0FBRyxJQUFJLE9BQU8sRUFBaUQ7Ozs7O0FBR3pGLE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUE2QmhDO1FBRlEsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFrQixDQUFDO1FBRzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM1QyxDQUFDOzs7Ozs7Ozs7Ozs7SUF6QkQsTUFBTSxDQUFDLE1BQU0sQ0FBVSxLQUE2QixFQUFFLFFBQWtCLEVBQUUsTUFBNEI7UUFDcEcsSUFBSSxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1NBQ2hFOztjQUVLLFFBQVEsR0FBRyxJQUFJLHFCQUFxQixFQUFLO1FBQy9DLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFMUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDdEIsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDN0IsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDekIsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7Ozs7O0lBYUQsU0FBUyxDQUFDLEtBQXFCO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMs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QU87UUFDbkMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLElBQUksd0JBQXdCLENBQUMsQ0FBQztTQUNuRjthQUFNLElBQUksT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLFVBQVUsRUFBRTtZQUM1RCxNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxJQUFJLGtEQUFrRCxDQUFDLENBQUM7U0FDN0c7UUFDRCxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7O0FBMUR1QixpQ0FBUSxHQUFHLElBQUksT0FBTyxFQUFnRixDQUFDO0FBQy9HLGdDQUFPLEdBQUcsd0JBQXdCLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDOzs7Ozs7SUFEM0Usa0NBQStIOztJQUMvSCxpQ0FBMkU7O0lBSTNFLDBDQUFxQzs7SUFDckMsMENBQTRDOzs7OztJQUM1Qyx3Q0FBMkM7Ozs7O0lBQzNDLDJDQUFvRjs7Ozs7SUFFeEUsMkNBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9ncmlkL25ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBQYmxOZ3JpZFBsdWdpbixcbiAgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24sXG4gIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzLFxuICBQYmxOZ3JpZEV2ZW50cyxcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4vZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7IFBMVUdJTl9TVE9SRSB9IGZyb20gJy4vZ3JpZC1wbHVnaW4nO1xuXG5jb25zdCBOR1JJRF9QTFVHSU5fQ09OVEVYVCA9IG5ldyBXZWFrTWFwPFBibE5ncmlkQ29tcG9uZW50PGFueT4sIFBibE5ncmlkUGx1Z2luQ29udGV4dD4oKTtcblxuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGNsYXNzIFBibE5ncmlkUGx1Z2luQ29udGV4dDxUID0gYW55PiB7XG5cbiAgLy8gd29ya2Fyb3VuZCwgd2UgbmVlZCBhIHBhcmFtZXRlci1sZXNzIGNvbnN0cnVjdG9yIHNpbmNlIEBuZ3Rvb2xzL3dlYnBhY2tAOC4wLjRcbiAgLy8gTm9uIEBJbmplY3RhYmxlIGNsYXNzZXMgYXJlIG5vdyBnZXR0aW5nIGFkZGRlZCB3aXRoIGhhcmQgcmVmZXJlbmNlIHRvIHRoZSBjdG9yIHBhcmFtcyB3aGljaCBhdCB0aGUgY2xhc3MgY3JlYXRpb24gcG9pbnQgYXJlIHVuZGVmaW5lZFxuICAvLyBmb3J3YXJkUmVmKCkgd2lsbCBub3QgaGVscCBzaW5jZSBpdCdzIG5vdCBpbmplY3QgYnkgYW5ndWxhciwgd2UgaW5zdGFudGlhdGUgdGhlIGNsYXNzLi5cbiAgLy8gcHJvYmFibHkgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2NvbW1pdC82MzkxOTg0OTk5NzNlMGY0MzdmMDU5YjNjOTMzYzcyYzczM2Q5M2Q4XG4gIHN0YXRpYyBjcmVhdGU8VCA9IGFueT4odGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3RvciwgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaSk6IFBibE5ncmlkUGx1Z2luQ29udGV4dDxUPiB7XG4gICAgaWYgKE5HUklEX1BMVUdJTl9DT05URVhULmhhcyh0YWJsZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGFibGUgaXMgYWxyZWFkeSByZWdpc3RlcmVkIGZvciBleHRlbnNpb25zLmApO1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFBibE5ncmlkUGx1Z2luQ29udGV4dDxUPigpO1xuICAgIE5HUklEX1BMVUdJTl9DT05URVhULnNldCh0YWJsZSwgaW5zdGFuY2UpO1xuXG4gICAgaW5zdGFuY2UuZ3JpZCA9IHRhYmxlO1xuICAgIGluc3RhbmNlLmluamVjdG9yID0gaW5qZWN0b3I7XG4gICAgaW5zdGFuY2UuZXh0QXBpID0gZXh0QXBpO1xuICAgIGluc3RhbmNlLmNvbnRyb2xsZXIgPSBuZXcgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKGluc3RhbmNlKTtcblxuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT47XG4gIGluamVjdG9yOiBJbmplY3RvcjtcbiAgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTtcbiAgY29udHJvbGxlcjogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyPFQ+O1xuICByZWFkb25seSBldmVudHM6IE9ic2VydmFibGU8UGJsTmdyaWRFdmVudHM+O1xuICBwcml2YXRlIF9ldmVudHMgPSBuZXcgU3ViamVjdDxQYmxOZ3JpZEV2ZW50cz4oKTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZXZlbnRzID0gdGhpcy5fZXZlbnRzLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZW1pdEV2ZW50KGV2ZW50OiBQYmxOZ3JpZEV2ZW50cyk6IHZvaWQge1xuICAgIHRoaXMuX2V2ZW50cy5uZXh0KGV2ZW50KTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCAge1xuICAgIGlmICghTkdSSURfUExVR0lOX0NPTlRFWFQuaGFzKHRoaXMuZ3JpZCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGFibGUgaXMgbm90IHJlZ2lzdGVyZWQuYCk7XG4gICAgfVxuICAgIHRoaXMuX2V2ZW50cy5jb21wbGV0ZSgpO1xuICAgIE5HUklEX1BMVUdJTl9DT05URVhULmRlbGV0ZSh0aGlzLmdyaWQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI8VCA9IGFueT4ge1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBjcmVhdGVkJCA9IG5ldyBTdWJqZWN0PHsgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGNvbnRyb2xsZXI6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjxhbnk+IH0+KCk7XG4gIHN0YXRpYyByZWFkb25seSBjcmVhdGVkID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmNyZWF0ZWQkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7IHJldHVybiB0aGlzLmNvbnRleHQuaW5qZWN0b3I7IH1cblxuICByZWFkb25seSBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpXG4gIHJlYWRvbmx5IGV2ZW50czogT2JzZXJ2YWJsZTxQYmxOZ3JpZEV2ZW50cz47XG4gIHByaXZhdGUgcmVhZG9ubHkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD5cbiAgcHJpdmF0ZSByZWFkb25seSBwbHVnaW5zID0gbmV3IE1hcDxrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiwgUGJsTmdyaWRQbHVnaW4+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250ZXh0OiBQYmxOZ3JpZFBsdWdpbkNvbnRleHQpIHtcbiAgICB0aGlzLmdyaWQgPSBjb250ZXh0LmdyaWQ7XG4gICAgdGhpcy5leHRBcGkgPSBjb250ZXh0LmV4dEFwaTtcbiAgICB0aGlzLmV2ZW50cyA9IGNvbnRleHQuZXZlbnRzO1xuICAgIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5jcmVhdGVkJC5uZXh0KHsgdGFibGU6IHRoaXMuZ3JpZCwgY29udHJvbGxlcjogdGhpcyB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kPFQgPSBhbnk+KGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+KTogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyPFQ+IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBjb250ZXh0ID0gTkdSSURfUExVR0lOX0NPTlRFWFQuZ2V0KGdyaWQpO1xuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICByZXR1cm4gY29udGV4dC5jb250cm9sbGVyO1xuICAgIH1cbiAgfVxuXG4gIGhhc1BsdWdpbjxQIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24+KG5hbWU6IFApOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wbHVnaW5zLmhhcyhuYW1lKTtcbiAgfVxuXG4gIGdldFBsdWdpbjxQIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24+KG5hbWU6IFApOiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbltQXSB8IHVuZGVmaW5lZCAge1xuICAgIHJldHVybiB0aGlzLnBsdWdpbnMuZ2V0KG5hbWUpIGFzIGFueTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgdGhlIGBwbHVnaW5gIHdpdGggdGhlIGBuYW1lYCB3aXRoIHRoZSBgdGFibGVgXG4gICAqL1xuICBzZXRQbHVnaW48UCBleHRlbmRzIGtleW9mIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uPihuYW1lOiBQLCBwbHVnaW46IFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uW1BdKTogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkIHtcbiAgICBpZiAoIVBMVUdJTl9TVE9SRS5oYXMobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBwbHVnaW4gJHtuYW1lfS5gKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGx1Z2lucy5oYXMobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGx1Z2luICR7bmFtZX0gaXMgbm90IHJlZ2lzdGVyZWQgZm9yIHRoaXMgdGFibGUuYCk7XG4gICAgfVxuICAgIHRoaXMucGx1Z2lucy5zZXQobmFtZSwgcGx1Z2luKTtcbiAgICByZXR1cm4gKHRibDogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdGhpcy5ncmlkID09PSB0YmwgJiYgdGhpcy5wbHVnaW5zLmRlbGV0ZShuYW1lKTtcbiAgfVxuXG4gIGNyZWF0ZVBsdWdpbjxQIGV4dGVuZHMgKGtleW9mIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzICYga2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24pPihuYW1lOiBQKTogUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25bUF0ge1xuICAgIGlmICghUExVR0lOX1NUT1JFLmhhcyhuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHBsdWdpbiAke25hbWV9LmApO1xuICAgIH1cbiAgICBjb25zdCBtZXRhZGF0YSA9IFBMVUdJTl9TVE9SRS5nZXQobmFtZSk7XG4gICAgY29uc3QgbWV0aG9kTmFtZSA9IG1ldGFkYXRhLmZhY3Rvcnk7XG4gICAgaWYgKCFtZXRob2ROYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcGx1Z2luIGNvbmZpZ3VyYXRpb24gZm9yICR7bmFtZX0sIG5vIGZhY3RvcnkgbWV0YWRhdGEuYCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0YWRhdGEudGFyZ2V0W21ldGhvZE5hbWVdICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcGx1Z2luIGNvbmZpZ3VyYXRpb24gZm9yICR7bmFtZX0sIGZhY3RvcnkgbWV0YWRhdGEgZG9lcyBub3QgcG9pbnQgdG8gYSBmdW5jdGlvbi5gKTtcbiAgICB9XG4gICAgcmV0dXJuIG1ldGFkYXRhLnRhcmdldFttZXRob2ROYW1lXSh0aGlzLmdyaWQsIHRoaXMuY29udGV4dC5pbmplY3Rvcik7XG4gIH1cbn1cbiJdfQ==