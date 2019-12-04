/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@internal
 * @type {?}
 */
export const PLUGIN_STORE = new Map();
/**
 * @record
 * @template P
 */
export function NgridPluginMetadata() { }
if (false) {
    /** @type {?} */
    NgridPluginMetadata.prototype.id;
    /** @type {?|undefined} */
    NgridPluginMetadata.prototype.factory;
    /** @type {?|undefined} */
    NgridPluginMetadata.prototype.runOnce;
}
/**
 * @param {?} metadata
 * @return {?}
 */
export function NgridPlugin(metadata) {
    if (metadata.runOnce) {
        metadata.runOnce();
    }
    return (/**
     * @param {?} target
     * @return {?}
     */
    target => {
        PLUGIN_STORE.set(metadata.id, Object.assign({}, metadata, { target }));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1wbHVnaW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2V4dC9ncmlkLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUdBLE1BQU0sT0FBTyxZQUFZLEdBQUcsSUFBSSxHQUFHLEVBQXdFOzs7OztBQUUzRyx5Q0FPQzs7O0lBTkMsaUNBQU07O0lBQ04sc0NBR0M7O0lBQ0Qsc0NBQXFCOzs7Ozs7QUFHdkIsTUFBTSxVQUFVLFdBQVcsQ0FBQyxRQUE2QjtJQUN2RCxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7UUFDcEIsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ3BCO0lBQ0Q7Ozs7SUFBTyxNQUFNLENBQUMsRUFBRTtRQUNkLFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsb0JBQU8sUUFBUSxJQUFFLE1BQU0sSUFBRyxDQUFDO0lBQ3pELENBQUMsRUFBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiwgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGNvbnN0IFBMVUdJTl9TVE9SRSA9IG5ldyBNYXA8a2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24sIE5ncmlkUGx1Z2luTWV0YWRhdGEgJiB7IHRhcmdldDogYW55IH0+KCk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmdyaWRQbHVnaW5NZXRhZGF0YTxQIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24gPSBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbj4ge1xuICBpZDogUDtcbiAgZmFjdG9yeT86IFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3Rvcmllc1xuICAgID8gUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXNbUF1cbiAgICA6IG5ldmVyXG4gIDtcbiAgcnVuT25jZT86ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBOZ3JpZFBsdWdpbihtZXRhZGF0YTogTmdyaWRQbHVnaW5NZXRhZGF0YSkge1xuICBpZiAobWV0YWRhdGEucnVuT25jZSkge1xuICAgIG1ldGFkYXRhLnJ1bk9uY2UoKTtcbiAgfVxuICByZXR1cm4gdGFyZ2V0ID0+IHtcbiAgICBQTFVHSU5fU1RPUkUuc2V0KG1ldGFkYXRhLmlkLCB7IC4uLm1ldGFkYXRhLCB0YXJnZXQgfSk7XG4gIH1cbn1cbiJdfQ==