/**
 * @fileoverview added by tsickle
 * Generated from: lib/ext/grid-plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign } from "tslib";
/**
 * \@internal
 * @type {?}
 */
export var PLUGIN_STORE = new Map();
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
 * @param {?} target
 * @return {?}
 */
export function ngridPlugin(metadata, target) {
    if (metadata.runOnce) {
        metadata.runOnce();
    }
    PLUGIN_STORE.set(metadata.id, __assign(__assign({}, metadata), { target: target }));
    return metadata.id;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1wbHVnaW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2V4dC9ncmlkLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBSUEsTUFBTSxLQUFPLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBd0U7Ozs7O0FBRTNHLHlDQU9DOzs7SUFOQyxpQ0FBTTs7SUFDTixzQ0FHQzs7SUFDRCxzQ0FBcUI7Ozs7Ozs7QUFHdkIsTUFBTSxVQUFVLFdBQVcsQ0FBQyxRQUE2QixFQUFFLE1BQWlCO0lBQzFFLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRTtRQUNwQixRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDcEI7SUFDRCxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLHdCQUFPLFFBQVEsS0FBRSxNQUFNLFFBQUEsSUFBRyxDQUFDO0lBQ3ZELE9BQU8sUUFBUSxDQUFDLEVBQUUsQ0FBQztBQUNyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24sIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBjb25zdCBQTFVHSU5fU1RPUkUgPSBuZXcgTWFwPGtleW9mIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uLCBOZ3JpZFBsdWdpbk1ldGFkYXRhICYgeyB0YXJnZXQ6IGFueSB9PigpO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5ncmlkUGx1Z2luTWV0YWRhdGE8UCBleHRlbmRzIGtleW9mIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uID0ga2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24+IHtcbiAgaWQ6IFA7XG4gIGZhY3Rvcnk/OiBQIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXNcbiAgICA/IFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzW1BdXG4gICAgOiBuZXZlclxuICA7XG4gIHJ1bk9uY2U/OiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmdyaWRQbHVnaW4obWV0YWRhdGE6IE5ncmlkUGx1Z2luTWV0YWRhdGEsIHRhcmdldDogVHlwZTxhbnk+KSB7XG4gIGlmIChtZXRhZGF0YS5ydW5PbmNlKSB7XG4gICAgbWV0YWRhdGEucnVuT25jZSgpO1xuICB9XG4gIFBMVUdJTl9TVE9SRS5zZXQobWV0YWRhdGEuaWQsIHsgLi4ubWV0YWRhdGEsIHRhcmdldCB9KTtcbiAgcmV0dXJuIG1ldGFkYXRhLmlkO1xufVxuIl19