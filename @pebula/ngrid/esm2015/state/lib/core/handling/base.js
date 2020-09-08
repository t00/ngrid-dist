/**
 * @fileoverview added by tsickle
 * Generated from: lib/core/handling/base.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RhdGUvIiwic291cmNlcyI6WyJsaWIvY29yZS9oYW5kbGluZy9iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRTVDLE1BQU0sT0FBTyw2QkFBNkI7Ozs7SUFNeEMsWUFBb0IsT0FBVTtRQUFWLFlBQU8sR0FBUCxPQUFPLENBQUc7UUFMdEIsU0FBSSxHQUFHLElBQUksR0FBRyxFQUFLLENBQUM7UUFDcEIsVUFBSyxHQUFHLElBQUksR0FBRyxFQUFLLENBQUM7SUFJSyxDQUFDOzs7Ozs7O0lBRW5DLFVBQVUsQ0FBQyxHQUFHLElBQWM7UUFDMUIsS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFBRSxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQUU7UUFDMUMsT0FBTyxtQkFBQSxJQUFJLEVBQUEsQ0FBQztJQUNkLENBQUM7Ozs7Ozs7OztJQU1ELFlBQVksQ0FBQyxHQUFHLElBQWM7UUFDNUIsS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDcEIsbUJBQUEsSUFBSSxFQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNoQixtQkFBQSxJQUFJLEVBQUEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25CO1FBQ0QsT0FBTyxtQkFBQSxJQUFJLEVBQUEsQ0FBQztJQUNkLENBQUM7Ozs7Ozs7SUFFRCxTQUFTLENBQUMsRUFBNkU7UUFDckYsbUJBQUEsSUFBSSxFQUFBLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDZCxDQUFDOzs7Ozs7O0lBRUQsV0FBVyxDQUFDLEVBQWdHO1FBQzFHLG1CQUFBLElBQUksRUFBQSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2QsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7U0FDbEU7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQztTQUM1RTtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1NBQzlFO1FBRUQsVUFBVSxDQUFDLDhCQUE4QixDQUFDO1lBQ3hDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BDLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdEMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ25CLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRztTQUN0QixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7Ozs7OztJQXJEQyw2Q0FBNEI7Ozs7O0lBQzVCLDhDQUE2Qjs7Ozs7SUFDN0IsNENBQTZFOzs7OztJQUM3RSw0Q0FBK0U7Ozs7O0lBRW5FLGdEQUFrQjs7Ozs7O0FBa0RoQyx5REFNQzs7O0lBTEMsc0RBQVc7O0lBQ1gsbURBQWU7O0lBQ2Ysb0RBQWdCOztJQUNoQix3REFBMkU7O0lBQzNFLDBEQUErRTs7Ozs7OztBQUdqRixNQUFNLFVBQVUsdUJBQXVCLENBQThCLE9BQVU7SUFDN0UsT0FBTyxJQUFJLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGF0ZUNodW5rcywgUGJsTmdyaWRTdGF0ZUNodW5rQ29udGV4dCB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBzdGF0ZVZpc29yIH0gZnJvbSAnLi4vc3RhdGUtdmlzb3InO1xuXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRTdGF0ZUNodW5rSGFuZGxlckhvc3Q8VCBleHRlbmRzIGtleW9mIFN0YXRlQ2h1bmtzLCBaIGV4dGVuZHMga2V5b2YgU3RhdGVDaHVua3NbVF1bJ3N0YXRlJ10gPSBrZXlvZiBTdGF0ZUNodW5rc1tUXVsnc3RhdGUnXT4ge1xuICBwcml2YXRlIGtleXMgPSBuZXcgU2V0PFo+KCk7XG4gIHByaXZhdGUgcktleXMgPSBuZXcgU2V0PFo+KCk7XG4gIHByaXZhdGUgc0ZuOiBQYXJhbWV0ZXJzPFBibE5ncmlkU3RhdGVDaHVua0hhbmRsZXJIb3N0PFQsIFo+WydzZXJpYWxpemUnXT5bMF07XG4gIHByaXZhdGUgZEZuOiBQYXJhbWV0ZXJzPFBibE5ncmlkU3RhdGVDaHVua0hhbmRsZXJIb3N0PFQsIFo+WydkZXNlcmlhbGl6ZSddPlswXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNodW5rSWQ6IFQpIHsgfVxuXG4gIGhhbmRsZUtleXMoLi4ua2V5czogQXJyYXk8Wj4pOiB0aGlzIHtcbiAgICBmb3IgKGNvbnN0IGsgb2Yga2V5cykgeyB0aGlzLmtleXMuYWRkKGspIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXF1aXJlZCBrZXlzIGFyZSBrZXlzIHRoYXQgY2Fubm90IGdldCBleGNsdWRlZC5cbiAgICogRWl0aGVyIGJ5IGFkZGluZyB0aGUgdG8gdGhlIGBleGNsdWRlYCBvcHRpb24gb3IgYnkgb21pdHRpbmcgdGhlbSBmcm9tIHRoZSBgaW5jbHVkZWAgb3B0aW9uLlxuICAgKi9cbiAgcmVxdWlyZWRLZXlzKC4uLmtleXM6IEFycmF5PFo+KTogdGhpcyB7XG4gICAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcbiAgICAgIHRoaXMua2V5cy5hZGQoaylcbiAgICAgIHRoaXMucktleXMuYWRkKGspO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNlcmlhbGl6ZShmbjogKGtleTogWiwgY3R4OiBQYmxOZ3JpZFN0YXRlQ2h1bmtDb250ZXh0PFQ+KSA9PiBTdGF0ZUNodW5rc1tUXVsnc3RhdGUnXVtaXSk6IHRoaXMge1xuICAgIHRoaXMuc0ZuID0gZm47XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkZXNlcmlhbGl6ZShmbjogKGtleTogWiwgc3RhdGVWYWx1ZTogU3RhdGVDaHVua3NbVF1bJ3N0YXRlJ11bWl0sICBjdHg6IFBibE5ncmlkU3RhdGVDaHVua0NvbnRleHQ8VD4pID0+IHZvaWQpOiB0aGlzIHtcbiAgICB0aGlzLmRGbiA9IGZuO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmVnaXN0ZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMua2V5cy5zaXplID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RhdGUgY2h1bmsgaGFuZGxlciwgbm8ga2V5cyBkZWZpbmVkLicpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuc0ZuKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RhdGUgY2h1bmsgaGFuZGxlciwgbWlzc2luZyBzZXJpYWxpemUgaGFuZGxlci4nKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmRGbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0YXRlIGNodW5rIGhhbmRsZXIsIG1pc3NpbmcgZGVzZXJpYWxpemUgaGFuZGxlci4nKTtcbiAgICB9XG5cbiAgICBzdGF0ZVZpc29yLnJlZ2lzdGVyQ2h1bmtIYW5kbGVyRGVmaW5pdGlvbih7XG4gICAgICBjaHVua0lkOiB0aGlzLmNodW5rSWQsXG4gICAgICBrZXlzOiBBcnJheS5mcm9tKHRoaXMua2V5cy52YWx1ZXMoKSksXG4gICAgICByS2V5czogQXJyYXkuZnJvbSh0aGlzLnJLZXlzLnZhbHVlcygpKSxcbiAgICAgIHNlcmlhbGl6ZTogdGhpcy5zRm4sXG4gICAgICBkZXNlcmlhbGl6ZTogdGhpcy5kRm4sXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkU3RhdGVDaHVua0hhbmRsZXJEZWZpbml0aW9uPFQgZXh0ZW5kcyBrZXlvZiBTdGF0ZUNodW5rcywgWiBleHRlbmRzIGtleW9mIFN0YXRlQ2h1bmtzW1RdWydzdGF0ZSddID0ga2V5b2YgU3RhdGVDaHVua3NbVF1bJ3N0YXRlJ10+e1xuICBjaHVua0lkOiBUO1xuICBrZXlzOiBBcnJheTxaPjtcbiAgcktleXM6IEFycmF5PFo+O1xuICBzZXJpYWxpemU6IFBhcmFtZXRlcnM8UGJsTmdyaWRTdGF0ZUNodW5rSGFuZGxlckhvc3Q8VCwgWj5bJ3NlcmlhbGl6ZSddPlswXTtcbiAgZGVzZXJpYWxpemU6IFBhcmFtZXRlcnM8UGJsTmdyaWRTdGF0ZUNodW5rSGFuZGxlckhvc3Q8VCwgWj5bJ2Rlc2VyaWFsaXplJ10+WzBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RhdGVDaHVua0hhbmRsZXI8VCBleHRlbmRzIGtleW9mIFN0YXRlQ2h1bmtzPihzZWN0aW9uOiBUKSB7XG4gIHJldHVybiBuZXcgUGJsTmdyaWRTdGF0ZUNodW5rSGFuZGxlckhvc3Qoc2VjdGlvbik7XG59XG4iXX0=