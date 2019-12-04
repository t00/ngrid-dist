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
    function (target) {
        PLUGIN_STORE.set(metadata.id, tslib_1.__assign({}, metadata, { target: target }));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1wbHVnaW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2V4dC9ncmlkLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHQSxNQUFNLEtBQU8sWUFBWSxHQUFHLElBQUksR0FBRyxFQUF3RTs7Ozs7QUFFM0cseUNBT0M7OztJQU5DLGlDQUFNOztJQUNOLHNDQUdDOztJQUNELHNDQUFxQjs7Ozs7O0FBR3ZCLE1BQU0sVUFBVSxXQUFXLENBQUMsUUFBNkI7SUFDdkQsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO1FBQ3BCLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNwQjtJQUNEOzs7O0lBQU8sVUFBQSxNQUFNO1FBQ1gsWUFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSx1QkFBTyxRQUFRLElBQUUsTUFBTSxRQUFBLElBQUcsQ0FBQztJQUN6RCxDQUFDLEVBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24sIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBjb25zdCBQTFVHSU5fU1RPUkUgPSBuZXcgTWFwPGtleW9mIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uLCBOZ3JpZFBsdWdpbk1ldGFkYXRhICYgeyB0YXJnZXQ6IGFueSB9PigpO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5ncmlkUGx1Z2luTWV0YWRhdGE8UCBleHRlbmRzIGtleW9mIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uID0ga2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24+IHtcbiAgaWQ6IFA7XG4gIGZhY3Rvcnk/OiBQIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXNcbiAgICA/IFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzW1BdXG4gICAgOiBuZXZlclxuICA7XG4gIHJ1bk9uY2U/OiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTmdyaWRQbHVnaW4obWV0YWRhdGE6IE5ncmlkUGx1Z2luTWV0YWRhdGEpIHtcbiAgaWYgKG1ldGFkYXRhLnJ1bk9uY2UpIHtcbiAgICBtZXRhZGF0YS5ydW5PbmNlKCk7XG4gIH1cbiAgcmV0dXJuIHRhcmdldCA9PiB7XG4gICAgUExVR0lOX1NUT1JFLnNldChtZXRhZGF0YS5pZCwgeyAuLi5tZXRhZGF0YSwgdGFyZ2V0IH0pO1xuICB9XG59XG4iXX0=