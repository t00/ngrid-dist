/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { stateVisor } from '../state-visor';
/**
 * @template T, Z
 */
export class PblNgridStateChunkHandlerHost {
    /**
     * @param {?} chunkId
     */
    constructor(chunkId) {
        this.chunkId = chunkId;
        this.keys = new Set();
        this.rKeys = new Set();
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {...?} keys
     * @return {THIS}
     */
    handleKeys(...keys) {
        for (const k of keys) {
            (/** @type {?} */ (this)).keys.add(k);
        }
        return (/** @type {?} */ (this));
    }
    /**
     * Required keys are keys that cannot get excluded.
     * Either by adding the to the `exclude` option or by omitting them from the `include` option.
     * @template THIS
     * @this {THIS}
     * @param {...?} keys
     * @return {THIS}
     */
    requiredKeys(...keys) {
        for (const k of keys) {
            (/** @type {?} */ (this)).keys.add(k);
            (/** @type {?} */ (this)).rKeys.add(k);
        }
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} fn
     * @return {THIS}
     */
    serialize(fn) {
        (/** @type {?} */ (this)).sFn = fn;
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} fn
     * @return {THIS}
     */
    deserialize(fn) {
        (/** @type {?} */ (this)).dFn = fn;
        return (/** @type {?} */ (this));
    }
    /**
     * @return {?}
     */
    register() {
        if (this.keys.size === 0) {
            throw new Error('Invalid state chunk handler, no keys defined.');
        }
        if (!this.sFn) {
            throw new Error('Invalid state chunk handler, missing serialize handler.');
        }
        if (!this.dFn) {
            throw new Error('Invalid state chunk handler, missing deserialize handler.');
        }
        stateVisor.registerChunkHandlerDefinition({
            chunkId: this.chunkId,
            keys: Array.from(this.keys.values()),
            rKeys: Array.from(this.rKeys.values()),
            serialize: this.sFn,
            deserialize: this.dFn,
        });
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridStateChunkHandlerHost.prototype.keys;
    /**
     * @type {?}
     * @private
     */
    PblNgridStateChunkHandlerHost.prototype.rKeys;
    /**
     * @type {?}
     * @private
     */
    PblNgridStateChunkHandlerHost.prototype.sFn;
    /**
     * @type {?}
     * @private
     */
    PblNgridStateChunkHandlerHost.prototype.dFn;
    /**
     * @type {?}
     * @private
     */
    PblNgridStateChunkHandlerHost.prototype.chunkId;
}
/**
 * @record
 * @template T, Z
 */
export function PblNgridStateChunkHandlerDefinition() { }
if (false) {
    /** @type {?} */
    PblNgridStateChunkHandlerDefinition.prototype.chunkId;
    /** @type {?} */
    PblNgridStateChunkHandlerDefinition.prototype.keys;
    /** @type {?} */
    PblNgridStateChunkHandlerDefinition.prototype.rKeys;
    /** @type {?} */
    PblNgridStateChunkHandlerDefinition.prototype.serialize;
    /** @type {?} */
    PblNgridStateChunkHandlerDefinition.prototype.deserialize;
}
/**
 * @template T
 * @param {?} section
 * @return {?}
 */
export function createStateChunkHandler(section) {
    return new PblNgridStateChunkHandlerHost(section);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RhdGUvIiwic291cmNlcyI6WyJsaWIvY29yZS9oYW5kbGluZy9iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFFNUMsTUFBTSxPQUFPLDZCQUE2Qjs7OztJQU14QyxZQUFvQixPQUFVO1FBQVYsWUFBTyxHQUFQLE9BQU8sQ0FBRztRQUx0QixTQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUssQ0FBQztRQUNwQixVQUFLLEdBQUcsSUFBSSxHQUFHLEVBQUssQ0FBQztJQUlLLENBQUM7Ozs7Ozs7SUFFbkMsVUFBVSxDQUFDLEdBQUcsSUFBYztRQUMxQixLQUFLLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRTtZQUFFLG1CQUFBLElBQUksRUFBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FBRTtRQUMxQyxPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7Ozs7O0lBTUQsWUFBWSxDQUFDLEdBQUcsSUFBYztRQUM1QixLQUFLLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNwQixtQkFBQSxJQUFJLEVBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2hCLG1CQUFBLElBQUksRUFBQSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkI7UUFDRCxPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7OztJQUVELFNBQVMsQ0FBQyxFQUE2RTtRQUNyRixtQkFBQSxJQUFJLEVBQUEsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsT0FBTyxtQkFBQSxJQUFJLEVBQUEsQ0FBQztJQUNkLENBQUM7Ozs7Ozs7SUFFRCxXQUFXLENBQUMsRUFBZ0c7UUFDMUcsbUJBQUEsSUFBSSxFQUFBLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDZCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztTQUNsRTtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO1NBQzVFO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDYixNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7U0FDOUU7UUFFRCxVQUFVLENBQUMsOEJBQThCLENBQUM7WUFDeEMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDcEMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0QyxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDbkIsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHO1NBQ3RCLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjs7Ozs7O0lBckRDLDZDQUE0Qjs7Ozs7SUFDNUIsOENBQTZCOzs7OztJQUM3Qiw0Q0FBNkU7Ozs7O0lBQzdFLDRDQUErRTs7Ozs7SUFFbkUsZ0RBQWtCOzs7Ozs7QUFrRGhDLHlEQU1DOzs7SUFMQyxzREFBVzs7SUFDWCxtREFBZTs7SUFDZixvREFBZ0I7O0lBQ2hCLHdEQUEyRTs7SUFDM0UsMERBQStFOzs7Ozs7O0FBR2pGLE1BQU0sVUFBVSx1QkFBdUIsQ0FBOEIsT0FBVTtJQUM3RSxPQUFPLElBQUksNkJBQTZCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YXRlQ2h1bmtzLCBQYmxOZ3JpZFN0YXRlQ2h1bmtDb250ZXh0IH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IHN0YXRlVmlzb3IgfSBmcm9tICcuLi9zdGF0ZS12aXNvcic7XG5cbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFN0YXRlQ2h1bmtIYW5kbGVySG9zdDxUIGV4dGVuZHMga2V5b2YgU3RhdGVDaHVua3MsIFogZXh0ZW5kcyBrZXlvZiBTdGF0ZUNodW5rc1tUXVsnc3RhdGUnXSA9IGtleW9mIFN0YXRlQ2h1bmtzW1RdWydzdGF0ZSddPiB7XG4gIHByaXZhdGUga2V5cyA9IG5ldyBTZXQ8Wj4oKTtcbiAgcHJpdmF0ZSByS2V5cyA9IG5ldyBTZXQ8Wj4oKTtcbiAgcHJpdmF0ZSBzRm46IFBhcmFtZXRlcnM8UGJsTmdyaWRTdGF0ZUNodW5rSGFuZGxlckhvc3Q8VCwgWj5bJ3NlcmlhbGl6ZSddPlswXTtcbiAgcHJpdmF0ZSBkRm46IFBhcmFtZXRlcnM8UGJsTmdyaWRTdGF0ZUNodW5rSGFuZGxlckhvc3Q8VCwgWj5bJ2Rlc2VyaWFsaXplJ10+WzBdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2h1bmtJZDogVCkgeyB9XG5cbiAgaGFuZGxlS2V5cyguLi5rZXlzOiBBcnJheTxaPik6IHRoaXMge1xuICAgIGZvciAoY29uc3QgayBvZiBrZXlzKSB7IHRoaXMua2V5cy5hZGQoaykgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcXVpcmVkIGtleXMgYXJlIGtleXMgdGhhdCBjYW5ub3QgZ2V0IGV4Y2x1ZGVkLlxuICAgKiBFaXRoZXIgYnkgYWRkaW5nIHRoZSB0byB0aGUgYGV4Y2x1ZGVgIG9wdGlvbiBvciBieSBvbWl0dGluZyB0aGVtIGZyb20gdGhlIGBpbmNsdWRlYCBvcHRpb24uXG4gICAqL1xuICByZXF1aXJlZEtleXMoLi4ua2V5czogQXJyYXk8Wj4pOiB0aGlzIHtcbiAgICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xuICAgICAgdGhpcy5rZXlzLmFkZChrKVxuICAgICAgdGhpcy5yS2V5cy5hZGQoayk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2VyaWFsaXplKGZuOiAoa2V5OiBaLCBjdHg6IFBibE5ncmlkU3RhdGVDaHVua0NvbnRleHQ8VD4pID0+IFN0YXRlQ2h1bmtzW1RdWydzdGF0ZSddW1pdKTogdGhpcyB7XG4gICAgdGhpcy5zRm4gPSBmbjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRlc2VyaWFsaXplKGZuOiAoa2V5OiBaLCBzdGF0ZVZhbHVlOiBTdGF0ZUNodW5rc1tUXVsnc3RhdGUnXVtaXSwgIGN0eDogUGJsTmdyaWRTdGF0ZUNodW5rQ29udGV4dDxUPikgPT4gdm9pZCk6IHRoaXMge1xuICAgIHRoaXMuZEZuID0gZm47XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZWdpc3RlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5rZXlzLnNpemUgPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdGF0ZSBjaHVuayBoYW5kbGVyLCBubyBrZXlzIGRlZmluZWQuJyk7XG4gICAgfVxuICAgIGlmICghdGhpcy5zRm4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdGF0ZSBjaHVuayBoYW5kbGVyLCBtaXNzaW5nIHNlcmlhbGl6ZSBoYW5kbGVyLicpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuZEZuKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RhdGUgY2h1bmsgaGFuZGxlciwgbWlzc2luZyBkZXNlcmlhbGl6ZSBoYW5kbGVyLicpO1xuICAgIH1cblxuICAgIHN0YXRlVmlzb3IucmVnaXN0ZXJDaHVua0hhbmRsZXJEZWZpbml0aW9uKHtcbiAgICAgIGNodW5rSWQ6IHRoaXMuY2h1bmtJZCxcbiAgICAgIGtleXM6IEFycmF5LmZyb20odGhpcy5rZXlzLnZhbHVlcygpKSxcbiAgICAgIHJLZXlzOiBBcnJheS5mcm9tKHRoaXMucktleXMudmFsdWVzKCkpLFxuICAgICAgc2VyaWFsaXplOiB0aGlzLnNGbixcbiAgICAgIGRlc2VyaWFsaXplOiB0aGlzLmRGbixcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRTdGF0ZUNodW5rSGFuZGxlckRlZmluaXRpb248VCBleHRlbmRzIGtleW9mIFN0YXRlQ2h1bmtzLCBaIGV4dGVuZHMga2V5b2YgU3RhdGVDaHVua3NbVF1bJ3N0YXRlJ10gPSBrZXlvZiBTdGF0ZUNodW5rc1tUXVsnc3RhdGUnXT57XG4gIGNodW5rSWQ6IFQ7XG4gIGtleXM6IEFycmF5PFo+O1xuICByS2V5czogQXJyYXk8Wj47XG4gIHNlcmlhbGl6ZTogUGFyYW1ldGVyczxQYmxOZ3JpZFN0YXRlQ2h1bmtIYW5kbGVySG9zdDxULCBaPlsnc2VyaWFsaXplJ10+WzBdO1xuICBkZXNlcmlhbGl6ZTogUGFyYW1ldGVyczxQYmxOZ3JpZFN0YXRlQ2h1bmtIYW5kbGVySG9zdDxULCBaPlsnZGVzZXJpYWxpemUnXT5bMF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdGF0ZUNodW5rSGFuZGxlcjxUIGV4dGVuZHMga2V5b2YgU3RhdGVDaHVua3M+KHNlY3Rpb246IFQpIHtcbiAgcmV0dXJuIG5ldyBQYmxOZ3JpZFN0YXRlQ2h1bmtIYW5kbGVySG9zdChzZWN0aW9uKTtcbn1cbiJdfQ==