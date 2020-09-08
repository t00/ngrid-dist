/**
 * @fileoverview added by tsickle
 * Generated from: lib/core/state-visor.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtdmlzb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvc3RhdGUtdmlzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0EsTUFBTSxLQUFLLFNBQXFCOzs7OztBQUVoQyxxREFHQzs7O0lBRkMsdURBQTBFOztJQUMxRSx3REFBMEY7Ozs7O0FBRzVGLE1BQU0sT0FBTyxVQUFVOzs7O0lBS3JCO1FBSFEsc0JBQWlCLEdBQUcsSUFBSSxHQUFHLEVBQWlGLENBQUM7UUFDN0csa0JBQWEsR0FBRyxJQUFJLEdBQUcsRUFBK0MsQ0FBQztJQUV2RCxDQUFDOzs7O0lBRXpCLE1BQU0sQ0FBQyxHQUFHLEtBQWlCLE9BQU8sU0FBUyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7SUFFaEYsd0JBQXdCLENBQWtDLE9BQVUsRUFBRSxNQUEwQztRQUM5RyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN4QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7Ozs7OztJQUVELDhCQUE4QixDQUFjLGdCQUF3RDtjQUM1RixFQUFFLE9BQU8sRUFBRSxHQUFHLGdCQUFnQjs7Y0FDOUIsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtRQUM5RCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDOzs7OztJQUVELHdCQUF3QixDQUFDLE9BQVU7UUFDakMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDL0MsQ0FBQztDQUNGOzs7Ozs7SUEzQkMsdUNBQXFIOzs7OztJQUNySCxtQ0FBK0U7OztBQTRCakYsTUFBTSxPQUFPLFVBQVUsR0FBZSxVQUFVLENBQUMsR0FBRyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRHbG9iYWxTdGF0ZSwgU3RhdGVDaHVua3MsIFJvb3RTdGF0ZUNodW5rcywgUGJsTmdyaWRTdGF0ZUNodW5rU2VjdGlvbkNvbnRleHQgfSBmcm9tICcuL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFN0YXRlQ2h1bmtIYW5kbGVyRGVmaW5pdGlvbiB9IGZyb20gJy4vaGFuZGxpbmcnO1xuXG5leHBvcnQgbGV0IF9pbnN0YW5jZTogU3RhdGVWaXNvcjtcblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZFN0YXRlQ2h1bmtTZWN0aW9uQ29uZmlnPFQgZXh0ZW5kcyBrZXlvZiBSb290U3RhdGVDaHVua3MgPSBrZXlvZiBSb290U3RhdGVDaHVua3M+IHtcbiAgc3RhdGVNYXRjaGVyOiAoc3RhdGU6IFBibE5ncmlkR2xvYmFsU3RhdGUpID0+IFJvb3RTdGF0ZUNodW5rc1tUXVsnc3RhdGUnXTtcbiAgc291cmNlTWF0Y2hlcjogKGNvbnRleHQ6IFBibE5ncmlkU3RhdGVDaHVua1NlY3Rpb25Db250ZXh0KSA9PiBSb290U3RhdGVDaHVua3NbVF1bJ3ZhbHVlJ107XG59XG5cbmV4cG9ydCBjbGFzcyBTdGF0ZVZpc29yPFQgZXh0ZW5kcyBrZXlvZiBTdGF0ZUNodW5rcyA9IGtleW9mIFN0YXRlQ2h1bmtzPiB7XG5cbiAgcHJpdmF0ZSByb290Q2h1bmtTZWN0aW9ucyA9IG5ldyBNYXA8a2V5b2YgUm9vdFN0YXRlQ2h1bmtzLCBQYmxOZ3JpZFN0YXRlQ2h1bmtTZWN0aW9uQ29uZmlnPGtleW9mIFJvb3RTdGF0ZUNodW5rcz4+KCk7XG4gIHByaXZhdGUgY2h1bmtIYW5kbGVycyA9IG5ldyBNYXA8VCwgUGJsTmdyaWRTdGF0ZUNodW5rSGFuZGxlckRlZmluaXRpb248VD5bXT4oKTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgc3RhdGljIGdldCgpOiBTdGF0ZVZpc29yIHsgcmV0dXJuIF9pbnN0YW5jZSB8fCAoX2luc3RhbmNlID0gbmV3IFN0YXRlVmlzb3IoKSk7IH1cblxuICByZWdpc3RlclJvb3RDaHVua1NlY3Rpb248WiBleHRlbmRzIGtleW9mIFJvb3RTdGF0ZUNodW5rcz4oY2h1bmtJZDogWiwgY29uZmlnOiBQYmxOZ3JpZFN0YXRlQ2h1bmtTZWN0aW9uQ29uZmlnPFo+KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJvb3RDaHVua1NlY3Rpb25zLmhhcyhjaHVua0lkKSkge1xuICAgICAgdGhpcy5yb290Q2h1bmtTZWN0aW9ucy5zZXQoY2h1bmtJZCwgY29uZmlnKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3RlckNodW5rSGFuZGxlckRlZmluaXRpb248WiBleHRlbmRzIFQ+KGNodW5rSGFuZGxlckRlZnM6IFBibE5ncmlkU3RhdGVDaHVua0hhbmRsZXJEZWZpbml0aW9uPFo+KTogdm9pZCB7XG4gICAgY29uc3QgeyBjaHVua0lkIH0gPSBjaHVua0hhbmRsZXJEZWZzO1xuICAgIGNvbnN0IGhhbmRsZXJzRm9yR3JvdXAgPSB0aGlzLmNodW5rSGFuZGxlcnMuZ2V0KGNodW5rSWQpIHx8IFtdO1xuICAgIGhhbmRsZXJzRm9yR3JvdXAucHVzaChjaHVua0hhbmRsZXJEZWZzKTtcbiAgICB0aGlzLmNodW5rSGFuZGxlcnMuc2V0KGNodW5rSWQsIGhhbmRsZXJzRm9yR3JvdXApO1xuICB9XG5cbiAgZ2V0Um9vdFNlY3Rpb25zKCk6IEFycmF5PFtrZXlvZiBSb290U3RhdGVDaHVua3MsIFBibE5ncmlkU3RhdGVDaHVua1NlY3Rpb25Db25maWc8a2V5b2YgUm9vdFN0YXRlQ2h1bmtzPl0+IHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnJvb3RDaHVua1NlY3Rpb25zLmVudHJpZXMoKSk7XG4gIH1cblxuICBnZXREZWZpbml0aW9uc0ZvclNlY3Rpb24oY2h1bmtJZDogVCk6IFBibE5ncmlkU3RhdGVDaHVua0hhbmRsZXJEZWZpbml0aW9uPFQ+W10ge1xuICAgIHJldHVybiB0aGlzLmNodW5rSGFuZGxlcnMuZ2V0KGNodW5rSWQpIHx8IFtdO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBzdGF0ZVZpc29yOiBTdGF0ZVZpc29yID0gU3RhdGVWaXNvci5nZXQoKTtcbiJdfQ==