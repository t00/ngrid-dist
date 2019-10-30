/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export let _instance;
/**
 * @record
 * @template T
 */
export function PblNgridStateChunkSectionConfig() { }
if (false) {
    /** @type {?} */
    PblNgridStateChunkSectionConfig.prototype.stateMatcher;
    /** @type {?} */
    PblNgridStateChunkSectionConfig.prototype.sourceMatcher;
}
/**
 * @template T
 */
export class StateVisor {
    /**
     * @private
     */
    constructor() {
        this.rootChunkSections = new Map();
        this.chunkHandlers = new Map();
    }
    /**
     * @return {?}
     */
    static get() { return _instance || (_instance = new StateVisor()); }
    /**
     * @template Z
     * @param {?} chunkId
     * @param {?} config
     * @return {?}
     */
    registerRootChunkSection(chunkId, config) {
        if (!this.rootChunkSections.has(chunkId)) {
            this.rootChunkSections.set(chunkId, config);
        }
    }
    /**
     * @template Z
     * @param {?} chunkHandlerDefs
     * @return {?}
     */
    registerChunkHandlerDefinition(chunkHandlerDefs) {
        const { chunkId } = chunkHandlerDefs;
        /** @type {?} */
        const handlersForGroup = this.chunkHandlers.get(chunkId) || [];
        handlersForGroup.push(chunkHandlerDefs);
        this.chunkHandlers.set(chunkId, handlersForGroup);
    }
    /**
     * @return {?}
     */
    getRootSections() {
        return Array.from(this.rootChunkSections.entries());
    }
    /**
     * @param {?} chunkId
     * @return {?}
     */
    getDefinitionsForSection(chunkId) {
        return this.chunkHandlers.get(chunkId) || [];
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    StateVisor.prototype.rootChunkSections;
    /**
     * @type {?}
     * @private
     */
    StateVisor.prototype.chunkHandlers;
}
/** @type {?} */
export const stateVisor = StateVisor.get();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtdmlzb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvc3RhdGUtdmlzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxNQUFNLEtBQUssU0FBcUI7Ozs7O0FBRWhDLHFEQUdDOzs7SUFGQyx1REFBMEU7O0lBQzFFLHdEQUEwRjs7Ozs7QUFHNUYsTUFBTSxPQUFPLFVBQVU7Ozs7SUFLckI7UUFIUSxzQkFBaUIsR0FBRyxJQUFJLEdBQUcsRUFBaUYsQ0FBQztRQUM3RyxrQkFBYSxHQUFHLElBQUksR0FBRyxFQUErQyxDQUFDO0lBRXZELENBQUM7Ozs7SUFFekIsTUFBTSxDQUFDLEdBQUcsS0FBaUIsT0FBTyxTQUFTLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztJQUVoRix3QkFBd0IsQ0FBa0MsT0FBVSxFQUFFLE1BQTBDO1FBQzlHLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQzs7Ozs7O0lBRUQsOEJBQThCLENBQWMsZ0JBQXdEO2NBQzVGLEVBQUUsT0FBTyxFQUFFLEdBQUcsZ0JBQWdCOztjQUM5QixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1FBQzlELGdCQUFnQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Ozs7O0lBRUQsd0JBQXdCLENBQUMsT0FBVTtRQUNqQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0NBQ0Y7Ozs7OztJQTNCQyx1Q0FBcUg7Ozs7O0lBQ3JILG1DQUErRTs7O0FBNEJqRixNQUFNLE9BQU8sVUFBVSxHQUFlLFVBQVUsQ0FBQyxHQUFHLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZEdsb2JhbFN0YXRlLCBTdGF0ZUNodW5rcywgUm9vdFN0YXRlQ2h1bmtzLCBQYmxOZ3JpZFN0YXRlQ2h1bmtTZWN0aW9uQ29udGV4dCB9IGZyb20gJy4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IFBibE5ncmlkU3RhdGVDaHVua0hhbmRsZXJEZWZpbml0aW9uIH0gZnJvbSAnLi9oYW5kbGluZyc7XG5cbmV4cG9ydCBsZXQgX2luc3RhbmNlOiBTdGF0ZVZpc29yO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkU3RhdGVDaHVua1NlY3Rpb25Db25maWc8VCBleHRlbmRzIGtleW9mIFJvb3RTdGF0ZUNodW5rcyA9IGtleW9mIFJvb3RTdGF0ZUNodW5rcz4ge1xuICBzdGF0ZU1hdGNoZXI6IChzdGF0ZTogUGJsTmdyaWRHbG9iYWxTdGF0ZSkgPT4gUm9vdFN0YXRlQ2h1bmtzW1RdWydzdGF0ZSddO1xuICBzb3VyY2VNYXRjaGVyOiAoY29udGV4dDogUGJsTmdyaWRTdGF0ZUNodW5rU2VjdGlvbkNvbnRleHQpID0+IFJvb3RTdGF0ZUNodW5rc1tUXVsndmFsdWUnXTtcbn1cblxuZXhwb3J0IGNsYXNzIFN0YXRlVmlzb3I8VCBleHRlbmRzIGtleW9mIFN0YXRlQ2h1bmtzID0ga2V5b2YgU3RhdGVDaHVua3M+IHtcblxuICBwcml2YXRlIHJvb3RDaHVua1NlY3Rpb25zID0gbmV3IE1hcDxrZXlvZiBSb290U3RhdGVDaHVua3MsIFBibE5ncmlkU3RhdGVDaHVua1NlY3Rpb25Db25maWc8a2V5b2YgUm9vdFN0YXRlQ2h1bmtzPj4oKTtcbiAgcHJpdmF0ZSBjaHVua0hhbmRsZXJzID0gbmV3IE1hcDxULCBQYmxOZ3JpZFN0YXRlQ2h1bmtIYW5kbGVyRGVmaW5pdGlvbjxUPltdPigpO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7IH1cblxuICBzdGF0aWMgZ2V0KCk6IFN0YXRlVmlzb3IgeyByZXR1cm4gX2luc3RhbmNlIHx8IChfaW5zdGFuY2UgPSBuZXcgU3RhdGVWaXNvcigpKTsgfVxuXG4gIHJlZ2lzdGVyUm9vdENodW5rU2VjdGlvbjxaIGV4dGVuZHMga2V5b2YgUm9vdFN0YXRlQ2h1bmtzPihjaHVua0lkOiBaLCBjb25maWc6IFBibE5ncmlkU3RhdGVDaHVua1NlY3Rpb25Db25maWc8Wj4pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucm9vdENodW5rU2VjdGlvbnMuaGFzKGNodW5rSWQpKSB7XG4gICAgICB0aGlzLnJvb3RDaHVua1NlY3Rpb25zLnNldChjaHVua0lkLCBjb25maWcpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyQ2h1bmtIYW5kbGVyRGVmaW5pdGlvbjxaIGV4dGVuZHMgVD4oY2h1bmtIYW5kbGVyRGVmczogUGJsTmdyaWRTdGF0ZUNodW5rSGFuZGxlckRlZmluaXRpb248Wj4pOiB2b2lkIHtcbiAgICBjb25zdCB7IGNodW5rSWQgfSA9IGNodW5rSGFuZGxlckRlZnM7XG4gICAgY29uc3QgaGFuZGxlcnNGb3JHcm91cCA9IHRoaXMuY2h1bmtIYW5kbGVycy5nZXQoY2h1bmtJZCkgfHwgW107XG4gICAgaGFuZGxlcnNGb3JHcm91cC5wdXNoKGNodW5rSGFuZGxlckRlZnMpO1xuICAgIHRoaXMuY2h1bmtIYW5kbGVycy5zZXQoY2h1bmtJZCwgaGFuZGxlcnNGb3JHcm91cCk7XG4gIH1cblxuICBnZXRSb290U2VjdGlvbnMoKTogQXJyYXk8W2tleW9mIFJvb3RTdGF0ZUNodW5rcywgUGJsTmdyaWRTdGF0ZUNodW5rU2VjdGlvbkNvbmZpZzxrZXlvZiBSb290U3RhdGVDaHVua3M+XT4ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucm9vdENodW5rU2VjdGlvbnMuZW50cmllcygpKTtcbiAgfVxuXG4gIGdldERlZmluaXRpb25zRm9yU2VjdGlvbihjaHVua0lkOiBUKTogUGJsTmdyaWRTdGF0ZUNodW5rSGFuZGxlckRlZmluaXRpb248VD5bXSB7XG4gICAgcmV0dXJuIHRoaXMuY2h1bmtIYW5kbGVycy5nZXQoY2h1bmtJZCkgfHwgW107XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHN0YXRlVmlzb3I6IFN0YXRlVmlzb3IgPSBTdGF0ZVZpc29yLmdldCgpO1xuIl19