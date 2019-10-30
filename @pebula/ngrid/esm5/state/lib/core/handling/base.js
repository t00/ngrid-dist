/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { stateVisor } from '../state-visor';
/**
 * @template T, Z
 */
var /**
 * @template T, Z
 */
PblNgridStateChunkHandlerHost = /** @class */ (function () {
    function PblNgridStateChunkHandlerHost(chunkId) {
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
    PblNgridStateChunkHandlerHost.prototype.handleKeys = /**
     * @template THIS
     * @this {THIS}
     * @param {...?} keys
     * @return {THIS}
     */
    function () {
        var e_1, _a;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        try {
            for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var k = keys_1_1.value;
                (/** @type {?} */ (this)).keys.add(k);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return (/** @type {?} */ (this));
    };
    /**
     * Required keys are keys that cannot get excluded.
     * Either by adding the to the `exclude` option or by omitting them from the `include` option.
     */
    /**
     * Required keys are keys that cannot get excluded.
     * Either by adding the to the `exclude` option or by omitting them from the `include` option.
     * @template THIS
     * @this {THIS}
     * @param {...?} keys
     * @return {THIS}
     */
    PblNgridStateChunkHandlerHost.prototype.requiredKeys = /**
     * Required keys are keys that cannot get excluded.
     * Either by adding the to the `exclude` option or by omitting them from the `include` option.
     * @template THIS
     * @this {THIS}
     * @param {...?} keys
     * @return {THIS}
     */
    function () {
        var e_2, _a;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        try {
            for (var keys_2 = tslib_1.__values(keys), keys_2_1 = keys_2.next(); !keys_2_1.done; keys_2_1 = keys_2.next()) {
                var k = keys_2_1.value;
                (/** @type {?} */ (this)).keys.add(k);
                (/** @type {?} */ (this)).rKeys.add(k);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (keys_2_1 && !keys_2_1.done && (_a = keys_2.return)) _a.call(keys_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return (/** @type {?} */ (this));
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} fn
     * @return {THIS}
     */
    PblNgridStateChunkHandlerHost.prototype.serialize = /**
     * @template THIS
     * @this {THIS}
     * @param {?} fn
     * @return {THIS}
     */
    function (fn) {
        (/** @type {?} */ (this)).sFn = fn;
        return (/** @type {?} */ (this));
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} fn
     * @return {THIS}
     */
    PblNgridStateChunkHandlerHost.prototype.deserialize = /**
     * @template THIS
     * @this {THIS}
     * @param {?} fn
     * @return {THIS}
     */
    function (fn) {
        (/** @type {?} */ (this)).dFn = fn;
        return (/** @type {?} */ (this));
    };
    /**
     * @return {?}
     */
    PblNgridStateChunkHandlerHost.prototype.register = /**
     * @return {?}
     */
    function () {
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
    };
    return PblNgridStateChunkHandlerHost;
}());
/**
 * @template T, Z
 */
export { PblNgridStateChunkHandlerHost };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RhdGUvIiwic291cmNlcyI6WyJsaWIvY29yZS9oYW5kbGluZy9iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRTVDOzs7O0lBTUUsdUNBQW9CLE9BQVU7UUFBVixZQUFPLEdBQVAsT0FBTyxDQUFHO1FBTHRCLFNBQUksR0FBRyxJQUFJLEdBQUcsRUFBSyxDQUFDO1FBQ3BCLFVBQUssR0FBRyxJQUFJLEdBQUcsRUFBSyxDQUFDO0lBSUssQ0FBQzs7Ozs7OztJQUVuQyxrREFBVTs7Ozs7O0lBQVY7O1FBQVcsY0FBaUI7YUFBakIsVUFBaUIsRUFBakIscUJBQWlCLEVBQWpCLElBQWlCO1lBQWpCLHlCQUFpQjs7O1lBQzFCLEtBQWdCLElBQUEsU0FBQSxpQkFBQSxJQUFJLENBQUEsMEJBQUEsNENBQUU7Z0JBQWpCLElBQU0sQ0FBQyxpQkFBQTtnQkFBWSxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQUU7Ozs7Ozs7OztRQUMxQyxPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7Ozs7O0lBQ0gsb0RBQVk7Ozs7Ozs7O0lBQVo7O1FBQWEsY0FBaUI7YUFBakIsVUFBaUIsRUFBakIscUJBQWlCLEVBQWpCLElBQWlCO1lBQWpCLHlCQUFpQjs7O1lBQzVCLEtBQWdCLElBQUEsU0FBQSxpQkFBQSxJQUFJLENBQUEsMEJBQUEsNENBQUU7Z0JBQWpCLElBQU0sQ0FBQyxpQkFBQTtnQkFDVixtQkFBQSxJQUFJLEVBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNoQixtQkFBQSxJQUFJLEVBQUEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25COzs7Ozs7Ozs7UUFDRCxPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7OztJQUVELGlEQUFTOzs7Ozs7SUFBVCxVQUFVLEVBQTZFO1FBQ3JGLG1CQUFBLElBQUksRUFBQSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7OztJQUVELG1EQUFXOzs7Ozs7SUFBWCxVQUFZLEVBQWdHO1FBQzFHLG1CQUFBLElBQUksRUFBQSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2QsQ0FBQzs7OztJQUVELGdEQUFROzs7SUFBUjtRQUNFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztTQUNsRTtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO1NBQzVFO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDYixNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7U0FDOUU7UUFFRCxVQUFVLENBQUMsOEJBQThCLENBQUM7WUFDeEMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDcEMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0QyxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDbkIsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHO1NBQ3RCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDSCxvQ0FBQztBQUFELENBQUMsQUF0REQsSUFzREM7Ozs7Ozs7Ozs7SUFyREMsNkNBQTRCOzs7OztJQUM1Qiw4Q0FBNkI7Ozs7O0lBQzdCLDRDQUE2RTs7Ozs7SUFDN0UsNENBQStFOzs7OztJQUVuRSxnREFBa0I7Ozs7OztBQWtEaEMseURBTUM7OztJQUxDLHNEQUFXOztJQUNYLG1EQUFlOztJQUNmLG9EQUFnQjs7SUFDaEIsd0RBQTJFOztJQUMzRSwwREFBK0U7Ozs7Ozs7QUFHakYsTUFBTSxVQUFVLHVCQUF1QixDQUE4QixPQUFVO0lBQzdFLE9BQU8sSUFBSSw2QkFBNkIsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhdGVDaHVua3MsIFBibE5ncmlkU3RhdGVDaHVua0NvbnRleHQgfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgc3RhdGVWaXNvciB9IGZyb20gJy4uL3N0YXRlLXZpc29yJztcblxuZXhwb3J0IGNsYXNzIFBibE5ncmlkU3RhdGVDaHVua0hhbmRsZXJIb3N0PFQgZXh0ZW5kcyBrZXlvZiBTdGF0ZUNodW5rcywgWiBleHRlbmRzIGtleW9mIFN0YXRlQ2h1bmtzW1RdWydzdGF0ZSddID0ga2V5b2YgU3RhdGVDaHVua3NbVF1bJ3N0YXRlJ10+IHtcbiAgcHJpdmF0ZSBrZXlzID0gbmV3IFNldDxaPigpO1xuICBwcml2YXRlIHJLZXlzID0gbmV3IFNldDxaPigpO1xuICBwcml2YXRlIHNGbjogUGFyYW1ldGVyczxQYmxOZ3JpZFN0YXRlQ2h1bmtIYW5kbGVySG9zdDxULCBaPlsnc2VyaWFsaXplJ10+WzBdO1xuICBwcml2YXRlIGRGbjogUGFyYW1ldGVyczxQYmxOZ3JpZFN0YXRlQ2h1bmtIYW5kbGVySG9zdDxULCBaPlsnZGVzZXJpYWxpemUnXT5bMF07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjaHVua0lkOiBUKSB7IH1cblxuICBoYW5kbGVLZXlzKC4uLmtleXM6IEFycmF5PFo+KTogdGhpcyB7XG4gICAgZm9yIChjb25zdCBrIG9mIGtleXMpIHsgdGhpcy5rZXlzLmFkZChrKSB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmVxdWlyZWQga2V5cyBhcmUga2V5cyB0aGF0IGNhbm5vdCBnZXQgZXhjbHVkZWQuXG4gICAqIEVpdGhlciBieSBhZGRpbmcgdGhlIHRvIHRoZSBgZXhjbHVkZWAgb3B0aW9uIG9yIGJ5IG9taXR0aW5nIHRoZW0gZnJvbSB0aGUgYGluY2x1ZGVgIG9wdGlvbi5cbiAgICovXG4gIHJlcXVpcmVkS2V5cyguLi5rZXlzOiBBcnJheTxaPik6IHRoaXMge1xuICAgIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XG4gICAgICB0aGlzLmtleXMuYWRkKGspXG4gICAgICB0aGlzLnJLZXlzLmFkZChrKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXJpYWxpemUoZm46IChrZXk6IFosIGN0eDogUGJsTmdyaWRTdGF0ZUNodW5rQ29udGV4dDxUPikgPT4gU3RhdGVDaHVua3NbVF1bJ3N0YXRlJ11bWl0pOiB0aGlzIHtcbiAgICB0aGlzLnNGbiA9IGZuO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGVzZXJpYWxpemUoZm46IChrZXk6IFosIHN0YXRlVmFsdWU6IFN0YXRlQ2h1bmtzW1RdWydzdGF0ZSddW1pdLCAgY3R4OiBQYmxOZ3JpZFN0YXRlQ2h1bmtDb250ZXh0PFQ+KSA9PiB2b2lkKTogdGhpcyB7XG4gICAgdGhpcy5kRm4gPSBmbjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlZ2lzdGVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmtleXMuc2l6ZSA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0YXRlIGNodW5rIGhhbmRsZXIsIG5vIGtleXMgZGVmaW5lZC4nKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnNGbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0YXRlIGNodW5rIGhhbmRsZXIsIG1pc3Npbmcgc2VyaWFsaXplIGhhbmRsZXIuJyk7XG4gICAgfVxuICAgIGlmICghdGhpcy5kRm4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdGF0ZSBjaHVuayBoYW5kbGVyLCBtaXNzaW5nIGRlc2VyaWFsaXplIGhhbmRsZXIuJyk7XG4gICAgfVxuXG4gICAgc3RhdGVWaXNvci5yZWdpc3RlckNodW5rSGFuZGxlckRlZmluaXRpb24oe1xuICAgICAgY2h1bmtJZDogdGhpcy5jaHVua0lkLFxuICAgICAga2V5czogQXJyYXkuZnJvbSh0aGlzLmtleXMudmFsdWVzKCkpLFxuICAgICAgcktleXM6IEFycmF5LmZyb20odGhpcy5yS2V5cy52YWx1ZXMoKSksXG4gICAgICBzZXJpYWxpemU6IHRoaXMuc0ZuLFxuICAgICAgZGVzZXJpYWxpemU6IHRoaXMuZEZuLFxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZFN0YXRlQ2h1bmtIYW5kbGVyRGVmaW5pdGlvbjxUIGV4dGVuZHMga2V5b2YgU3RhdGVDaHVua3MsIFogZXh0ZW5kcyBrZXlvZiBTdGF0ZUNodW5rc1tUXVsnc3RhdGUnXSA9IGtleW9mIFN0YXRlQ2h1bmtzW1RdWydzdGF0ZSddPntcbiAgY2h1bmtJZDogVDtcbiAga2V5czogQXJyYXk8Wj47XG4gIHJLZXlzOiBBcnJheTxaPjtcbiAgc2VyaWFsaXplOiBQYXJhbWV0ZXJzPFBibE5ncmlkU3RhdGVDaHVua0hhbmRsZXJIb3N0PFQsIFo+WydzZXJpYWxpemUnXT5bMF07XG4gIGRlc2VyaWFsaXplOiBQYXJhbWV0ZXJzPFBibE5ncmlkU3RhdGVDaHVua0hhbmRsZXJIb3N0PFQsIFo+WydkZXNlcmlhbGl6ZSddPlswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyPFQgZXh0ZW5kcyBrZXlvZiBTdGF0ZUNodW5rcz4oc2VjdGlvbjogVCkge1xuICByZXR1cm4gbmV3IFBibE5ncmlkU3RhdGVDaHVua0hhbmRsZXJIb3N0KHNlY3Rpb24pO1xufVxuIl19