import { of, Subject } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { InjectFlags } from '@angular/core';
import { ON_INIT } from '@pebula/ngrid/core';
import { PLUGIN_STORE } from './grid-plugin';
const NGRID_PLUGIN_CONTEXT = new WeakMap();
const CREATED$ = new Subject();
const REGISTERED_TO_CREATE = new WeakSet();
/** @internal */
export class PblNgridPluginContext {
    constructor() {
        this._events = new Subject();
        this.events = this._events.asObservable();
    }
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
    static create(injector, extApi) {
        if (NGRID_PLUGIN_CONTEXT.has(extApi.grid)) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error(`Grid instance is already registered for extensions.`);
            }
            return;
        }
        const instance = new PblNgridPluginContext();
        NGRID_PLUGIN_CONTEXT.set(extApi.grid, instance);
        instance.grid = extApi.grid;
        instance.injector = injector;
        instance.extApi = extApi;
        instance.controller = new PblNgridPluginController(instance);
        return {
            plugin: instance,
            init: () => CREATED$.next({ table: instance.grid, controller: instance.controller }),
        };
    }
    emitEvent(event) {
        this._events.next(event);
    }
    destroy() {
        if (!NGRID_PLUGIN_CONTEXT.has(this.grid)) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error(`Grid is not registered.`);
            }
            return;
        }
        this._events.complete();
        NGRID_PLUGIN_CONTEXT.delete(this.grid);
    }
}
export class PblNgridPluginController {
    constructor(context) {
        this.context = context;
        this.plugins = new Map();
        this.grid = context.grid;
        this.extApi = context.extApi;
        this.events = context.events;
    }
    static onCreatedSafe(token, fn) {
        if (!REGISTERED_TO_CREATE.has(token)) {
            REGISTERED_TO_CREATE.add(token);
            PblNgridPluginController.created.subscribe(event => fn(event.table, event.controller));
        }
    }
    static find(grid) {
        const context = NGRID_PLUGIN_CONTEXT.get(grid);
        if (context) {
            return context.controller;
        }
    }
    static findPlugin(grid, name) {
        var _a;
        return (_a = PblNgridPluginController.find(grid)) === null || _a === void 0 ? void 0 : _a.getPlugin(name);
    }
    get injector() { return this.context.injector; }
    /**
     * A Simple shortcut to the `onInit` event which is fired once.
     * If the grid has already been init the event will fire immediately, otherwise it will emit once when `onInit`
     * occurs and cleanup the subscription.
     *
     * The boolean value emitted reflects the state it was emitted on.
     * false - grid was already initialized
     * true - grid was just initialized
     *
     * In other words, if you get false, it means you called this method when the grid was already initialized.
     */
    onInit() {
        return this.grid.isInit ? of(false) : this.events.pipe(ON_INIT, mapTo(true));
    }
    hasPlugin(name) {
        return this.plugins.has(name);
    }
    getPlugin(name) {
        return this.plugins.get(name);
    }
    ensurePlugin(name) {
        return this.getPlugin(name) || this.createPlugin(name);
    }
    /**
     * Registers the `plugin` with the `name` with the `table`
     */
    setPlugin(name, plugin) {
        if (!PLUGIN_STORE.has(name)) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error(`Unknown plugin ${name}.`);
            }
            return;
        }
        if (this.plugins.has(name)) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error(`Plugin ${name} is already registered for this grid.`);
            }
            return;
        }
        this.plugins.set(name, plugin);
        return (tbl) => this.grid === tbl && this.plugins.delete(name);
    }
    /**
     * Checks if the grid is declared in a location within the DI that has access to an ancestor token.
     * For example, if we want to use `createPlugin()` only if the grid is defined in a module that has a specific parent module imported into it
     * we will use `hasAncestor(MyParentModule)`
     */
    hasAncestor(token) {
        return !!this.injector.get(token, null, InjectFlags.Optional);
    }
    createPlugin(name) {
        if (!PLUGIN_STORE.has(name)) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error(`Unknown plugin ${name}.`);
            }
            return;
        }
        const metadata = PLUGIN_STORE.get(name);
        const methodName = metadata.factory;
        if (!methodName) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error(`Invalid plugin configuration for ${name}, no factory metadata.`);
            }
            return;
        }
        else if (typeof metadata.target[methodName] !== 'function') {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error(`Invalid plugin configuration for ${name}, factory metadata does not point to a function.`);
            }
            return;
        }
        return metadata.target[methodName](this.grid, this.context.injector);
    }
}
PblNgridPluginController.created = CREATED$.asObservable();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLWNvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL3NyYy9saWIvZXh0L3BsdWdpbi1jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsV0FBVyxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBRXRELE9BQU8sRUFBa0IsT0FBTyxFQUF3QixNQUFNLG9CQUFvQixDQUFDO0FBUW5GLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0MsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLE9BQU8sRUFBNkMsQ0FBQztBQUV0RixNQUFNLFFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBNEUsQ0FBQztBQUV6RyxNQUFNLG9CQUFvQixHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7QUFFaEQsZ0JBQWdCO0FBQ2hCLE1BQU0sT0FBTyxxQkFBcUI7SUFvQ2hDO1FBRlEsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFrQixDQUFDO1FBRzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBcENELGdGQUFnRjtJQUNoRix3SUFBd0k7SUFDeEksMEZBQTBGO0lBQzFGLHlHQUF5RztJQUN6RyxNQUFNLENBQUMsTUFBTSxDQUFVLFFBQWtCLEVBQUUsTUFBNEI7UUFDckUsSUFBSSxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3pDLElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsRUFBRTtnQkFDakQsTUFBTSxJQUFJLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO2FBQ3hF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QUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2RSxDQUFDOztBQWhIZSxnQ0FBTyxHQUFHLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXBUbyB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEluamVjdEZsYWdzLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZEV2ZW50cywgT05fSU5JVCwgUGJsTmdyaWRFdmVudEVtaXR0ZXIgfSBmcm9tICdAcGVidWxhL25ncmlkL2NvcmUnO1xuaW1wb3J0IHsgX1BibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vdG9rZW5zJztcbmltcG9ydCB7XG4gIFBibE5ncmlkUGx1Z2luLFxuICBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbixcbiAgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMsXG59IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuL2dyaWQtZXh0LWFwaSc7XG5pbXBvcnQgeyBQTFVHSU5fU1RPUkUgfSBmcm9tICcuL2dyaWQtcGx1Z2luJztcblxuY29uc3QgTkdSSURfUExVR0lOX0NPTlRFWFQgPSBuZXcgV2Vha01hcDxfUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udGV4dD4oKTtcblxuY29uc3QgQ1JFQVRFRCQgPSBuZXcgU3ViamVjdDx7IHRhYmxlOiBfUGJsTmdyaWRDb21wb25lbnQsIGNvbnRyb2xsZXI6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjxhbnk+IH0+KCk7XG5cbmNvbnN0IFJFR0lTVEVSRURfVE9fQ1JFQVRFID0gbmV3IFdlYWtTZXQ8YW55PigpO1xuXG4vKiogQGludGVybmFsICovXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRQbHVnaW5Db250ZXh0PFQgPSBhbnk+IGltcGxlbWVudHMgUGJsTmdyaWRFdmVudEVtaXR0ZXIge1xuXG4gIC8vIHdvcmthcm91bmQsIHdlIG5lZWQgYSBwYXJhbWV0ZXItbGVzcyBjb25zdHJ1Y3RvciBzaW5jZSBAbmd0b29scy93ZWJwYWNrQDguMC40XG4gIC8vIE5vbiBASW5qZWN0YWJsZSBjbGFzc2VzIGFyZSBub3cgZ2V0dGluZyBhZGRkZWQgd2l0aCBoYXJkIHJlZmVyZW5jZSB0byB0aGUgY3RvciBwYXJhbXMgd2hpY2ggYXQgdGhlIGNsYXNzIGNyZWF0aW9uIHBvaW50IGFyZSB1bmRlZmluZWRcbiAgLy8gZm9yd2FyZFJlZigpIHdpbGwgbm90IGhlbHAgc2luY2UgaXQncyBub3QgaW5qZWN0IGJ5IGFuZ3VsYXIsIHdlIGluc3RhbnRpYXRlIHRoZSBjbGFzcy4uXG4gIC8vIHByb2JhYmx5IGR1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyLWNsaS9jb21taXQvNjM5MTk4NDk5OTczZTBmNDM3ZjA1OWIzYzkzM2M3MmM3MzNkOTNkOFxuICBzdGF0aWMgY3JlYXRlPFQgPSBhbnk+KGluamVjdG9yOiBJbmplY3RvciwgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaSkge1xuICAgIGlmIChOR1JJRF9QTFVHSU5fQ09OVEVYVC5oYXMoZXh0QXBpLmdyaWQpKSB7XG4gICAgICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgR3JpZCBpbnN0YW5jZSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQgZm9yIGV4dGVuc2lvbnMuYCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgUGJsTmdyaWRQbHVnaW5Db250ZXh0PFQ+KCk7XG4gICAgTkdSSURfUExVR0lOX0NPTlRFWFQuc2V0KGV4dEFwaS5ncmlkLCBpbnN0YW5jZSk7XG5cbiAgICBpbnN0YW5jZS5ncmlkID0gZXh0QXBpLmdyaWQ7XG4gICAgaW5zdGFuY2UuaW5qZWN0b3IgPSBpbmplY3RvcjtcbiAgICBpbnN0YW5jZS5leHRBcGkgPSBleHRBcGk7XG5cbiAgICBpbnN0YW5jZS5jb250cm9sbGVyID0gbmV3IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjxUPihpbnN0YW5jZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGx1Z2luOiBpbnN0YW5jZSxcbiAgICAgIGluaXQ6ICgpID0+IENSRUFURUQkLm5leHQoeyB0YWJsZTogaW5zdGFuY2UuZ3JpZCwgY29udHJvbGxlcjogaW5zdGFuY2UuY29udHJvbGxlciB9KSxcbiAgICB9O1xuICB9XG5cbiAgZ3JpZDogX1BibE5ncmlkQ29tcG9uZW50O1xuICBpbmplY3RvcjogSW5qZWN0b3I7XG4gIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk7XG4gIGNvbnRyb2xsZXI6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjxUPjtcbiAgcmVhZG9ubHkgZXZlbnRzOiBPYnNlcnZhYmxlPFBibE5ncmlkRXZlbnRzPjtcbiAgcHJpdmF0ZSBfZXZlbnRzID0gbmV3IFN1YmplY3Q8UGJsTmdyaWRFdmVudHM+KCk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmV2ZW50cyA9IHRoaXMuX2V2ZW50cy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGVtaXRFdmVudChldmVudDogUGJsTmdyaWRFdmVudHMpOiB2b2lkIHtcbiAgICB0aGlzLl9ldmVudHMubmV4dChldmVudCk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQgIHtcbiAgICBpZiAoIU5HUklEX1BMVUdJTl9DT05URVhULmhhcyh0aGlzLmdyaWQpKSB7XG4gICAgICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgR3JpZCBpcyBub3QgcmVnaXN0ZXJlZC5gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZXZlbnRzLmNvbXBsZXRlKCk7XG4gICAgTkdSSURfUExVR0lOX0NPTlRFWFQuZGVsZXRlKHRoaXMuZ3JpZCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjxUID0gYW55PiB7XG5cbiAgc3RhdGljIHJlYWRvbmx5IGNyZWF0ZWQgPSBDUkVBVEVEJC5hc09ic2VydmFibGUoKTtcblxuICBzdGF0aWMgb25DcmVhdGVkU2FmZSh0b2tlbjogYW55LCBmbjogKGdyaWQ6IF9QYmxOZ3JpZENvbXBvbmVudCwgY29udHJvbGxlcjogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyPGFueT4pID0+IHZvaWQpIHtcbiAgICBpZiAoIVJFR0lTVEVSRURfVE9fQ1JFQVRFLmhhcyh0b2tlbikpIHtcbiAgICAgIFJFR0lTVEVSRURfVE9fQ1JFQVRFLmFkZCh0b2tlbik7XG4gICAgICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuY3JlYXRlZC5zdWJzY3JpYmUoIGV2ZW50ID0+IGZuKGV2ZW50LnRhYmxlLCBldmVudC5jb250cm9sbGVyKSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZpbmQ8VCA9IGFueT4oZ3JpZDogX1BibE5ncmlkQ29tcG9uZW50PFQ+KTogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyPFQ+IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBjb250ZXh0ID0gTkdSSURfUExVR0lOX0NPTlRFWFQuZ2V0KGdyaWQpO1xuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICByZXR1cm4gY29udGV4dC5jb250cm9sbGVyO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmaW5kUGx1Z2luPFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiwgVCA9IGFueT4oZ3JpZDogX1BibE5ncmlkQ29tcG9uZW50PFQ+LCBuYW1lOiBQKTogUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25bUF0gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZChncmlkKT8uZ2V0UGx1Z2luKG5hbWUpO1xuICB9XG5cbiAgZ2V0IGluamVjdG9yKCk6IEluamVjdG9yIHsgcmV0dXJuIHRoaXMuY29udGV4dC5pbmplY3RvcjsgfVxuXG4gIHJlYWRvbmx5IGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGlcbiAgcmVhZG9ubHkgZXZlbnRzOiBPYnNlcnZhYmxlPFBibE5ncmlkRXZlbnRzPjtcbiAgcHJpdmF0ZSByZWFkb25seSBncmlkOiBfUGJsTmdyaWRDb21wb25lbnQ8VD5cbiAgcHJpdmF0ZSByZWFkb25seSBwbHVnaW5zID0gbmV3IE1hcDxrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiwgUGJsTmdyaWRQbHVnaW4+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250ZXh0OiBQYmxOZ3JpZFBsdWdpbkNvbnRleHQpIHtcbiAgICB0aGlzLmdyaWQgPSBjb250ZXh0LmdyaWQ7XG4gICAgdGhpcy5leHRBcGkgPSBjb250ZXh0LmV4dEFwaTtcbiAgICB0aGlzLmV2ZW50cyA9IGNvbnRleHQuZXZlbnRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgU2ltcGxlIHNob3J0Y3V0IHRvIHRoZSBgb25Jbml0YCBldmVudCB3aGljaCBpcyBmaXJlZCBvbmNlLlxuICAgKiBJZiB0aGUgZ3JpZCBoYXMgYWxyZWFkeSBiZWVuIGluaXQgdGhlIGV2ZW50IHdpbGwgZmlyZSBpbW1lZGlhdGVseSwgb3RoZXJ3aXNlIGl0IHdpbGwgZW1pdCBvbmNlIHdoZW4gYG9uSW5pdGBcbiAgICogb2NjdXJzIGFuZCBjbGVhbnVwIHRoZSBzdWJzY3JpcHRpb24uXG4gICAqXG4gICAqIFRoZSBib29sZWFuIHZhbHVlIGVtaXR0ZWQgcmVmbGVjdHMgdGhlIHN0YXRlIGl0IHdhcyBlbWl0dGVkIG9uLlxuICAgKiBmYWxzZSAtIGdyaWQgd2FzIGFscmVhZHkgaW5pdGlhbGl6ZWRcbiAgICogdHJ1ZSAtIGdyaWQgd2FzIGp1c3QgaW5pdGlhbGl6ZWRcbiAgICpcbiAgICogSW4gb3RoZXIgd29yZHMsIGlmIHlvdSBnZXQgZmFsc2UsIGl0IG1lYW5zIHlvdSBjYWxsZWQgdGhpcyBtZXRob2Qgd2hlbiB0aGUgZ3JpZCB3YXMgYWxyZWFkeSBpbml0aWFsaXplZC5cbiAgICovXG4gIG9uSW5pdCgpIHtcbiAgICByZXR1cm4gdGhpcy5ncmlkLmlzSW5pdCA/IG9mKGZhbHNlKSA6IHRoaXMuZXZlbnRzLnBpcGUoT05fSU5JVCwgbWFwVG8odHJ1ZSkpO1xuICB9XG5cbiAgaGFzUGx1Z2luPFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbj4obmFtZTogUCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBsdWdpbnMuaGFzKG5hbWUpO1xuICB9XG5cbiAgZ2V0UGx1Z2luPFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbj4obmFtZTogUCk6IFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uW1BdIHwgdW5kZWZpbmVkICB7XG4gICAgcmV0dXJuIHRoaXMucGx1Z2lucy5nZXQobmFtZSkgYXMgYW55O1xuICB9XG5cbiAgZW5zdXJlUGx1Z2luPFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbj4obmFtZTogUCk6IFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uW1BdICB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGx1Z2luKG5hbWUpIHx8IHRoaXMuY3JlYXRlUGx1Z2luKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyB0aGUgYHBsdWdpbmAgd2l0aCB0aGUgYG5hbWVgIHdpdGggdGhlIGB0YWJsZWBcbiAgICovXG4gIHNldFBsdWdpbjxQIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24+KG5hbWU6IFAsIHBsdWdpbjogUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25bUF0pOiAodGFibGU6IF9QYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkIHtcbiAgICBpZiAoIVBMVUdJTl9TVE9SRS5oYXMobmFtZSkpIHtcbiAgICAgIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHBsdWdpbiAke25hbWV9LmApO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5wbHVnaW5zLmhhcyhuYW1lKSkge1xuICAgICAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsdWdpbiAke25hbWV9IGlzIGFscmVhZHkgcmVnaXN0ZXJlZCBmb3IgdGhpcyBncmlkLmApO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBsdWdpbnMuc2V0KG5hbWUsIHBsdWdpbik7XG4gICAgcmV0dXJuICh0Ymw6IF9QYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB0aGlzLmdyaWQgPT09IHRibCAmJiB0aGlzLnBsdWdpbnMuZGVsZXRlKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgZ3JpZCBpcyBkZWNsYXJlZCBpbiBhIGxvY2F0aW9uIHdpdGhpbiB0aGUgREkgdGhhdCBoYXMgYWNjZXNzIHRvIGFuIGFuY2VzdG9yIHRva2VuLlxuICAgKiBGb3IgZXhhbXBsZSwgaWYgd2Ugd2FudCB0byB1c2UgYGNyZWF0ZVBsdWdpbigpYCBvbmx5IGlmIHRoZSBncmlkIGlzIGRlZmluZWQgaW4gYSBtb2R1bGUgdGhhdCBoYXMgYSBzcGVjaWZpYyBwYXJlbnQgbW9kdWxlIGltcG9ydGVkIGludG8gaXRcbiAgICogd2Ugd2lsbCB1c2UgYGhhc0FuY2VzdG9yKE15UGFyZW50TW9kdWxlKWBcbiAgICovXG4gIGhhc0FuY2VzdG9yKHRva2VuOiBhbnkpIHtcbiAgICByZXR1cm4gISF0aGlzLmluamVjdG9yLmdldCh0b2tlbiwgbnVsbCwgSW5qZWN0RmxhZ3MuT3B0aW9uYWwpO1xuICB9XG5cbiAgY3JlYXRlUGx1Z2luPFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3Rvcmllcz4obmFtZTogUCk6IFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uW1BdO1xuICBjcmVhdGVQbHVnaW48UCBleHRlbmRzIGtleW9mIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uPihuYW1lOiBQKTogUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25bUF07XG4gIGNyZWF0ZVBsdWdpbjxQIGV4dGVuZHMgKGtleW9mIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzICYga2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24pPihuYW1lOiBQKTogUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25bUF0ge1xuICAgIGlmICghUExVR0lOX1NUT1JFLmhhcyhuYW1lKSkge1xuICAgICAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gcGx1Z2luICR7bmFtZX0uYCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG1ldGFkYXRhID0gUExVR0lOX1NUT1JFLmdldChuYW1lKTtcbiAgICBjb25zdCBtZXRob2ROYW1lID0gbWV0YWRhdGEuZmFjdG9yeTtcbiAgICBpZiAoIW1ldGhvZE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBsdWdpbiBjb25maWd1cmF0aW9uIGZvciAke25hbWV9LCBubyBmYWN0b3J5IG1ldGFkYXRhLmApO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1ldGFkYXRhLnRhcmdldFttZXRob2ROYW1lXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcGx1Z2luIGNvbmZpZ3VyYXRpb24gZm9yICR7bmFtZX0sIGZhY3RvcnkgbWV0YWRhdGEgZG9lcyBub3QgcG9pbnQgdG8gYSBmdW5jdGlvbi5gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIG1ldGFkYXRhLnRhcmdldFttZXRob2ROYW1lXSh0aGlzLmdyaWQsIHRoaXMuY29udGV4dC5pbmplY3Rvcik7XG4gIH1cbn1cbiJdfQ==