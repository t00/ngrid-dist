/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * \@internal
 * @type {?}
 */
export var PLUGIN_STORE = new Map();
/**
 * @record
 * @template P
 */
export function TablePluginMetadata() { }
if (false) {
    /** @type {?} */
    TablePluginMetadata.prototype.id;
    /** @type {?|undefined} */
    TablePluginMetadata.prototype.factory;
    /** @type {?|undefined} */
    TablePluginMetadata.prototype.runOnce;
}
/**
 * @param {?} metadata
 * @return {?}
 */
export function TablePlugin(metadata) {
    if (metadata.runOnce) {
        metadata.runOnce();
    }
    return (/**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        PLUGIN_STORE.set(metadata.id, tslib_1.__assign({}, metadata, { target: target }));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9leHQvdGFibGUtcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBLE1BQU0sS0FBTyxZQUFZLEdBQUcsSUFBSSxHQUFHLEVBQXdFOzs7OztBQUUzRyx5Q0FPQzs7O0lBTkMsaUNBQU07O0lBQ04sc0NBR0M7O0lBQ0Qsc0NBQXFCOzs7Ozs7QUFHdkIsTUFBTSxVQUFVLFdBQVcsQ0FBQyxRQUE2QjtJQUN2RCxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7UUFDcEIsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ3BCO0lBQ0Q7Ozs7SUFBTyxVQUFBLE1BQU07UUFDWCxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLHVCQUFPLFFBQVEsSUFBRSxNQUFNLFFBQUEsSUFBRyxDQUFDO0lBQ3pELENBQUMsRUFBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiwgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGNvbnN0IFBMVUdJTl9TVE9SRSA9IG5ldyBNYXA8a2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24sIFRhYmxlUGx1Z2luTWV0YWRhdGEgJiB7IHRhcmdldDogYW55IH0+KCk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGFibGVQbHVnaW5NZXRhZGF0YTxQIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24gPSBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbj4ge1xuICBpZDogUDtcbiAgZmFjdG9yeT86IFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3Rvcmllc1xuICAgID8gUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXNbUF1cbiAgICA6IG5ldmVyXG4gIDtcbiAgcnVuT25jZT86ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUYWJsZVBsdWdpbihtZXRhZGF0YTogVGFibGVQbHVnaW5NZXRhZGF0YSkge1xuICBpZiAobWV0YWRhdGEucnVuT25jZSkge1xuICAgIG1ldGFkYXRhLnJ1bk9uY2UoKTtcbiAgfVxuICByZXR1cm4gdGFyZ2V0ID0+IHtcbiAgICBQTFVHSU5fU1RPUkUuc2V0KG1ldGFkYXRhLmlkLCB7IC4uLm1ldGFkYXRhLCB0YXJnZXQgfSk7XG4gIH1cbn1cbiJdfQ==