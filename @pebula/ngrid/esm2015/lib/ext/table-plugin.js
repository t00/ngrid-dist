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
    target => {
        PLUGIN_STORE.set(metadata.id, Object.assign({}, metadata, { target }));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9leHQvdGFibGUtcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0EsTUFBTSxPQUFPLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBd0U7Ozs7O0FBRTNHLHlDQU9DOzs7SUFOQyxpQ0FBTTs7SUFDTixzQ0FHQzs7SUFDRCxzQ0FBcUI7Ozs7OztBQUd2QixNQUFNLFVBQVUsV0FBVyxDQUFDLFFBQTZCO0lBQ3ZELElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRTtRQUNwQixRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDcEI7SUFDRDs7OztJQUFPLE1BQU0sQ0FBQyxFQUFFO1FBQ2QsWUFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxvQkFBTyxRQUFRLElBQUUsTUFBTSxJQUFHLENBQUM7SUFDekQsQ0FBQyxFQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uLCBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3RvcmllcyB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKiogQGludGVybmFsICovXG5leHBvcnQgY29uc3QgUExVR0lOX1NUT1JFID0gbmV3IE1hcDxrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiwgVGFibGVQbHVnaW5NZXRhZGF0YSAmIHsgdGFyZ2V0OiBhbnkgfT4oKTtcblxuZXhwb3J0IGludGVyZmFjZSBUYWJsZVBsdWdpbk1ldGFkYXRhPFAgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiA9IGtleW9mIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uPiB7XG4gIGlkOiBQO1xuICBmYWN0b3J5PzogUCBleHRlbmRzIGtleW9mIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzXG4gICAgPyBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3Rvcmllc1tQXVxuICAgIDogbmV2ZXJcbiAgO1xuICBydW5PbmNlPzogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFRhYmxlUGx1Z2luKG1ldGFkYXRhOiBUYWJsZVBsdWdpbk1ldGFkYXRhKSB7XG4gIGlmIChtZXRhZGF0YS5ydW5PbmNlKSB7XG4gICAgbWV0YWRhdGEucnVuT25jZSgpO1xuICB9XG4gIHJldHVybiB0YXJnZXQgPT4ge1xuICAgIFBMVUdJTl9TVE9SRS5zZXQobWV0YWRhdGEuaWQsIHsgLi4ubWV0YWRhdGEsIHRhcmdldCB9KTtcbiAgfVxufVxuIl19