/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// https://github.com/angular/angular/blob/0bf810022a80ba1cbcff8aa471063a6f1352abbe/packages/common/src/directives/styling_differ.ts
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Used to diff and convert ngStyle/ngClass instructions into [style] and [class] bindings.
 *
 * ngStyle and ngClass both accept various forms of input and behave differently than that
 * of how [style] and [class] behave in Angular.
 *
 * The differences are:
 *  - ngStyle and ngClass both **watch** their binding values for changes each time CD runs
 *    while [style] and [class] bindings do not (they check for identity changes)
 *  - ngStyle allows for unit-based keys (e.g. `{'max-width.px':value}`) and [style] does not
 *  - ngClass supports arrays of class values and [class] only accepts map and string values
 *  - ngClass allows for multiple className keys (space-separated) within an array or map
 *     (as the * key) while [class] only accepts a simple key/value map object
 *
 * Having Angular understand and adapt to all the different forms of behavior is complicated
 * and unnecessary. Instead, ngClass and ngStyle should have their input values be converted
 * into something that the core-level [style] and [class] bindings understand.
 *
 * This [StylingDiffer] class handles this conversion by creating a new input value each time
 * the inner representation of the binding value have changed.
 *
 * ## Why do we care about ngStyle/ngClass?
 * The styling algorithm code (documented inside of `render3/interfaces/styling.ts`) needs to
 * respect and understand the styling values emitted through ngStyle and ngClass (when they
 * are present and used in a template).
 *
 * Instead of having these directives manage styling on their own, they should be included
 * into the Angular styling algorithm that exists for [style] and [class] bindings.
 *
 * Here's why:
 *
 * - If ngStyle/ngClass is used in combination with [style]/[class] bindings then the
 *   styles and classes would fall out of sync and be applied and updated at
 *   inconsistent times
 * - Both ngClass/ngStyle do not respect [class.name] and [style.prop] bindings
 *   (they will write over them given the right combination of events)
 *
 *   ```
 *   <!-- if `w1` is updated then it will always override `w2`
 *        if `w2` is updated then it will always override `w1`
 *        if both are updated at the same time then `w1` wins -->
 *   <div [ngStyle]="{width:w1}" [style.width]="w2">...</div>
 *
 *   <!-- if `w1` is updated then it will always lose to `w2`
 *        if `w2` is updated then it will always override `w1`
 *        if both are updated at the same time then `w2` wins -->
 *   <div [style]="{width:w1}" [style.width]="w2">...</div>
 *   ```
 * - ngClass/ngStyle were written as a directives and made use of maps, closures and other
 *   expensive data structures which were evaluated each time CD runs
 * @template T
 */
export class StylingDiffer {
    /**
     * @param {?} _name
     * @param {?} _options
     */
    constructor(_name, _options) {
        this._name = _name;
        this._options = _options;
        this.value = null;
        this._lastSetValue = null;
        this._lastSetValueType = 0 /* Null */;
        this._lastSetValueIdentityChange = false;
    }
    /**
     * Sets (updates) the styling value within the differ.
     *
     * Only when `hasValueChanged` is called then this new value will be evaluted
     * and checked against the previous value.
     *
     * @param {?} value the new styling value provided from the ngClass/ngStyle binding
     * @return {?}
     */
    setValue(value) {
        if (Array.isArray(value)) {
            this._lastSetValueType = 4 /* Array */;
        }
        else if (value instanceof Set) {
            this._lastSetValueType = 8 /* Set */;
        }
        else if (value && typeof value === 'string') {
            if (!(this._options & 4 /* AllowStringValue */)) {
                throw new Error(this._name + ' string values are not allowed');
            }
            this._lastSetValueType = 1 /* String */;
        }
        else {
            this._lastSetValueType = value ? 2 /* Map */ : 0 /* Null */;
        }
        this._lastSetValueIdentityChange = true;
        this._lastSetValue = value || null;
    }
    /**
     * Determines whether or not the value has changed.
     *
     * This function can be called right after `setValue()` is called, but it can also be
     * called incase the existing value (if it's a collection) changes internally. If the
     * value is indeed a collection it will do the necessary diffing work and produce a
     * new object value as assign that to `value`.
     *
     * @return {?} whether or not the value has changed in some way.
     */
    hasValueChanged() {
        /** @type {?} */
        let valueHasChanged = this._lastSetValueIdentityChange;
        if (!valueHasChanged && !(this._lastSetValueType & 14 /* Collection */))
            return false;
        /** @type {?} */
        let finalValue = null;
        /** @type {?} */
        const trimValues = (this._options & 1 /* TrimProperties */) ? true : false;
        /** @type {?} */
        const parseOutUnits = (this._options & 8 /* AllowUnits */) ? true : false;
        /** @type {?} */
        const allowSubKeys = (this._options & 2 /* AllowSubKeys */) ? true : false;
        switch (this._lastSetValueType) {
            // case 1: [input]="string"
            case 1 /* String */:
                /** @type {?} */
                const tokens = ((/** @type {?} */ (this._lastSetValue))).split(/\s+/g);
                if (this._options & 16 /* ForceAsMap */) {
                    finalValue = {};
                    tokens.forEach((/**
                     * @param {?} token
                     * @param {?} i
                     * @return {?}
                     */
                    (token, i) => ((/** @type {?} */ (finalValue)))[token] = true));
                }
                else {
                    finalValue = tokens.reduce((/**
                     * @param {?} str
                     * @param {?} token
                     * @param {?} i
                     * @return {?}
                     */
                    (str, token, i) => str + (i ? ' ' : '') + token));
                }
                break;
            // case 2: [input]="{key:value}"
            case 2 /* Map */:
                /** @type {?} */
                const map = (/** @type {?} */ (this._lastSetValue));
                /** @type {?} */
                const keys = Object.keys(map);
                if (!valueHasChanged) {
                    if (this.value) {
                        // we know that the classExp value exists and that it is
                        // a map (otherwise an identity change would have occurred)
                        valueHasChanged = mapHasChanged(keys, (/** @type {?} */ (this.value)), map);
                    }
                    else {
                        valueHasChanged = true;
                    }
                }
                if (valueHasChanged) {
                    finalValue =
                        bulidMapFromValues(this._name, trimValues, parseOutUnits, allowSubKeys, map, keys);
                }
                break;
            // case 3a: [input]="[str1, str2, ...]"
            // case 3b: [input]="Set"
            case 4 /* Array */:
            case 8 /* Set */:
                /** @type {?} */
                const values = Array.from((/** @type {?} */ (this._lastSetValue)));
                if (!valueHasChanged) {
                    /** @type {?} */
                    const keys = Object.keys((/** @type {?} */ (this.value)));
                    valueHasChanged = !arrayEqualsArray(keys, values);
                }
                if (valueHasChanged) {
                    finalValue =
                        bulidMapFromValues(this._name, trimValues, parseOutUnits, allowSubKeys, values);
                }
                break;
            // case 4: [input]="null|undefined"
            default:
                finalValue = null;
                break;
        }
        if (valueHasChanged) {
            ((/** @type {?} */ (this))).value = (/** @type {?} */ (finalValue));
        }
        return valueHasChanged;
    }
}
if (false) {
    /** @type {?} */
    StylingDiffer.prototype.value;
    /**
     * @type {?}
     * @private
     */
    StylingDiffer.prototype._lastSetValue;
    /**
     * @type {?}
     * @private
     */
    StylingDiffer.prototype._lastSetValueType;
    /**
     * @type {?}
     * @private
     */
    StylingDiffer.prototype._lastSetValueIdentityChange;
    /**
     * @type {?}
     * @private
     */
    StylingDiffer.prototype._name;
    /**
     * @type {?}
     * @private
     */
    StylingDiffer.prototype._options;
}
/** @enum {number} */
const StylingDifferOptions = {
    None: 0,
    TrimProperties: 1,
    AllowSubKeys: 2,
    AllowStringValue: 4,
    AllowUnits: 8,
    ForceAsMap: 16,
};
export { StylingDifferOptions };
/** @enum {number} */
const StylingDifferValueTypes = {
    Null: 0,
    String: 1,
    Map: 2,
    Array: 4,
    Set: 8,
    Collection: 14,
};
/**
 * builds and returns a map based on the values input value
 *
 * If the `keys` param is provided then the `values` param is treated as a
 * string map. Otherwise `values` is treated as a string array.
 * @param {?} errorPrefix
 * @param {?} trim
 * @param {?} parseOutUnits
 * @param {?} allowSubKeys
 * @param {?} values
 * @param {?=} keys
 * @return {?}
 */
function bulidMapFromValues(errorPrefix, trim, parseOutUnits, allowSubKeys, values, keys) {
    /** @type {?} */
    const map = {};
    if (keys) {
        // case 1: map
        for (let i = 0; i < keys.length; i++) {
            /** @type {?} */
            let key = keys[i];
            key = trim ? key.trim() : key;
            /** @type {?} */
            const value = ((/** @type {?} */ (values)))[key];
            setMapValues(map, key, value, parseOutUnits, allowSubKeys);
        }
    }
    else {
        // case 2: array
        for (let i = 0; i < values.length; i++) {
            /** @type {?} */
            let value = ((/** @type {?} */ (values)))[i];
            assertValidValue(errorPrefix, value);
            value = trim ? value.trim() : value;
            setMapValues(map, value, true, false, allowSubKeys);
        }
    }
    return map;
}
/**
 * @param {?} errorPrefix
 * @param {?} value
 * @return {?}
 */
function assertValidValue(errorPrefix, value) {
    if (typeof value !== 'string') {
        throw new Error(`${errorPrefix} can only toggle CSS classes expressed as strings, got ${value}`);
    }
}
/**
 * @param {?} map
 * @param {?} key
 * @param {?} value
 * @param {?} parseOutUnits
 * @param {?} allowSubKeys
 * @return {?}
 */
function setMapValues(map, key, value, parseOutUnits, allowSubKeys) {
    if (allowSubKeys && key.indexOf(' ') > 0) {
        /** @type {?} */
        const innerKeys = key.split(/\s+/g);
        for (let j = 0; j < innerKeys.length; j++) {
            setIndividualMapValue(map, innerKeys[j], value, parseOutUnits);
        }
    }
    else {
        setIndividualMapValue(map, key, value, parseOutUnits);
    }
}
/**
 * @param {?} map
 * @param {?} key
 * @param {?} value
 * @param {?} parseOutUnits
 * @return {?}
 */
function setIndividualMapValue(map, key, value, parseOutUnits) {
    if (parseOutUnits) {
        /** @type {?} */
        const values = normalizeStyleKeyAndValue(key, value);
        value = values.value;
        key = values.key;
    }
    map[key] = value;
}
/**
 * @param {?} key
 * @param {?} value
 * @return {?}
 */
function normalizeStyleKeyAndValue(key, value) {
    /** @type {?} */
    const index = key.indexOf('.');
    if (index > 0) {
        /** @type {?} */
        const unit = key.substr(index + 1);
        key = key.substring(0, index);
        if (value != null) { // we should not convert null values to string
            value += unit;
        }
    }
    return { key, value };
}
/**
 * @param {?} keys
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function mapHasChanged(keys, a, b) {
    /** @type {?} */
    const oldKeys = Object.keys(a);
    /** @type {?} */
    const newKeys = keys;
    // the keys are different which means the map changed
    if (!arrayEqualsArray(oldKeys, newKeys)) {
        return true;
    }
    for (let i = 0; i < newKeys.length; i++) {
        /** @type {?} */
        const key = newKeys[i];
        if (a[key] !== b[key]) {
            return true;
        }
    }
    return false;
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function arrayEqualsArray(a, b) {
    if (a && b) {
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++) {
            if (b.indexOf(a[i]) === -1)
                return false;
        }
        return true;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGluZ19kaWZmZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvZGlyZWN0aXZlcy9jZWxsLXN0eWxlLWNsYXNzL3N0eWxpbmdfZGlmZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4REEsTUFBTSxPQUFPLGFBQWE7Ozs7O0lBT3hCLFlBQW9CLEtBQWEsRUFBVSxRQUE4QjtRQUFyRCxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7UUFOekQsVUFBSyxHQUFXLElBQUksQ0FBQztRQUU3QixrQkFBYSxHQUE4QyxJQUFJLENBQUM7UUFDaEUsc0JBQWlCLGdCQUF5RDtRQUMxRSxnQ0FBMkIsR0FBRyxLQUFLLENBQUM7SUFFZ0MsQ0FBQzs7Ozs7Ozs7OztJQVU3RSxRQUFRLENBQUMsS0FBZ0Q7UUFDdkQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxpQkFBaUIsZ0JBQWdDLENBQUM7U0FDeEQ7YUFBTSxJQUFJLEtBQUssWUFBWSxHQUFHLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGlCQUFpQixjQUE4QixDQUFDO1NBQ3REO2FBQU0sSUFBSSxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLDJCQUF3QyxDQUFDLEVBQUU7Z0JBQzVELE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxnQ0FBZ0MsQ0FBQyxDQUFDO2FBQ2hFO1lBQ0QsSUFBSSxDQUFDLGlCQUFpQixpQkFBaUMsQ0FBQztTQUN6RDthQUFNO1lBQ0wsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxDQUFDLGFBQTZCLENB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ZjgxMDAyMmE4MGJhMWNiY2ZmOGFhNDcxMDYzYTZmMTM1MmFiYmUvcGFja2FnZXMvY29tbW9uL3NyYy9kaXJlY3RpdmVzL3N0eWxpbmdfZGlmZmVyLnRzXG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBVc2VkIHRvIGRpZmYgYW5kIGNvbnZlcnQgbmdTdHlsZS9uZ0NsYXNzIGluc3RydWN0aW9ucyBpbnRvIFtzdHlsZV0gYW5kIFtjbGFzc10gYmluZGluZ3MuXG4gKlxuICogbmdTdHlsZSBhbmQgbmdDbGFzcyBib3RoIGFjY2VwdCB2YXJpb3VzIGZvcm1zIG9mIGlucHV0IGFuZCBiZWhhdmUgZGlmZmVyZW50bHkgdGhhbiB0aGF0XG4gKiBvZiBob3cgW3N0eWxlXSBhbmQgW2NsYXNzXSBiZWhhdmUgaW4gQW5ndWxhci5cbiAqXG4gKiBUaGUgZGlmZmVyZW5jZXMgYXJlOlxuICogIC0gbmdTdHlsZSBhbmQgbmdDbGFzcyBib3RoICoqd2F0Y2gqKiB0aGVpciBiaW5kaW5nIHZhbHVlcyBmb3IgY2hhbmdlcyBlYWNoIHRpbWUgQ0QgcnVuc1xuICogICAgd2hpbGUgW3N0eWxlXSBhbmQgW2NsYXNzXSBiaW5kaW5ncyBkbyBub3QgKHRoZXkgY2hlY2sgZm9yIGlkZW50aXR5IGNoYW5nZXMpXG4gKiAgLSBuZ1N0eWxlIGFsbG93cyBmb3IgdW5pdC1iYXNlZCBrZXlzIChlLmcuIGB7J21heC13aWR0aC5weCc6dmFsdWV9YCkgYW5kIFtzdHlsZV0gZG9lcyBub3RcbiAqICAtIG5nQ2xhc3Mgc3VwcG9ydHMgYXJyYXlzIG9mIGNsYXNzIHZhbHVlcyBhbmQgW2NsYXNzXSBvbmx5IGFjY2VwdHMgbWFwIGFuZCBzdHJpbmcgdmFsdWVzXG4gKiAgLSBuZ0NsYXNzIGFsbG93cyBmb3IgbXVsdGlwbGUgY2xhc3NOYW1lIGtleXMgKHNwYWNlLXNlcGFyYXRlZCkgd2l0aGluIGFuIGFycmF5IG9yIG1hcFxuICogICAgIChhcyB0aGUgKiBrZXkpIHdoaWxlIFtjbGFzc10gb25seSBhY2NlcHRzIGEgc2ltcGxlIGtleS92YWx1ZSBtYXAgb2JqZWN0XG4gKlxuICogSGF2aW5nIEFuZ3VsYXIgdW5kZXJzdGFuZCBhbmQgYWRhcHQgdG8gYWxsIHRoZSBkaWZmZXJlbnQgZm9ybXMgb2YgYmVoYXZpb3IgaXMgY29tcGxpY2F0ZWRcbiAqIGFuZCB1bm5lY2Vzc2FyeS4gSW5zdGVhZCwgbmdDbGFzcyBhbmQgbmdTdHlsZSBzaG91bGQgaGF2ZSB0aGVpciBpbnB1dCB2YWx1ZXMgYmUgY29udmVydGVkXG4gKiBpbnRvIHNvbWV0aGluZyB0aGF0IHRoZSBjb3JlLWxldmVsIFtzdHlsZV0gYW5kIFtjbGFzc10gYmluZGluZ3MgdW5kZXJzdGFuZC5cbiAqXG4gKiBUaGlzIFtTdHlsaW5nRGlmZmVyXSBjbGFzcyBoYW5kbGVzIHRoaXMgY29udmVyc2lvbiBieSBjcmVhdGluZyBhIG5ldyBpbnB1dCB2YWx1ZSBlYWNoIHRpbWVcbiAqIHRoZSBpbm5lciByZXByZXNlbnRhdGlvbiBvZiB0aGUgYmluZGluZyB2YWx1ZSBoYXZlIGNoYW5nZWQuXG4gKlxuICogIyMgV2h5IGRvIHdlIGNhcmUgYWJvdXQgbmdTdHlsZS9uZ0NsYXNzP1xuICogVGhlIHN0eWxpbmcgYWxnb3JpdGhtIGNvZGUgKGRvY3VtZW50ZWQgaW5zaWRlIG9mIGByZW5kZXIzL2ludGVyZmFjZXMvc3R5bGluZy50c2ApIG5lZWRzIHRvXG4gKiByZXNwZWN0IGFuZCB1bmRlcnN0YW5kIHRoZSBzdHlsaW5nIHZhbHVlcyBlbWl0dGVkIHRocm91Z2ggbmdTdHlsZSBhbmQgbmdDbGFzcyAod2hlbiB0aGV5XG4gKiBhcmUgcHJlc2VudCBhbmQgdXNlZCBpbiBhIHRlbXBsYXRlKS5cbiAqXG4gKiBJbnN0ZWFkIG9mIGhhdmluZyB0aGVzZSBkaXJlY3RpdmVzIG1hbmFnZSBzdHlsaW5nIG9uIHRoZWlyIG93biwgdGhleSBzaG91bGQgYmUgaW5jbHVkZWRcbiAqIGludG8gdGhlIEFuZ3VsYXIgc3R5bGluZyBhbGdvcml0aG0gdGhhdCBleGlzdHMgZm9yIFtzdHlsZV0gYW5kIFtjbGFzc10gYmluZGluZ3MuXG4gKlxuICogSGVyZSdzIHdoeTpcbiAqXG4gKiAtIElmIG5nU3R5bGUvbmdDbGFzcyBpcyB1c2VkIGluIGNvbWJpbmF0aW9uIHdpdGggW3N0eWxlXS9bY2xhc3NdIGJpbmRpbmdzIHRoZW4gdGhlXG4gKiAgIHN0eWxlcyBhbmQgY2xhc3NlcyB3b3VsZCBmYWxsIG91dCBvZiBzeW5jIGFuZCBiZSBhcHBsaWVkIGFuZCB1cGRhdGVkIGF0XG4gKiAgIGluY29uc2lzdGVudCB0aW1lc1xuICogLSBCb3RoIG5nQ2xhc3MvbmdTdHlsZSBkbyBub3QgcmVzcGVjdCBbY2xhc3MubmFtZV0gYW5kIFtzdHlsZS5wcm9wXSBiaW5kaW5nc1xuICogICAodGhleSB3aWxsIHdyaXRlIG92ZXIgdGhlbSBnaXZlbiB0aGUgcmlnaHQgY29tYmluYXRpb24gb2YgZXZlbnRzKVxuICpcbiAqICAgYGBgXG4gKiAgIDwhLS0gaWYgYHcxYCBpcyB1cGRhdGVkIHRoZW4gaXQgd2lsbCBhbHdheXMgb3ZlcnJpZGUgYHcyYFxuICogICAgICAgIGlmIGB3MmAgaXMgdXBkYXRlZCB0aGVuIGl0IHdpbGwgYWx3YXlzIG92ZXJyaWRlIGB3MWBcbiAqICAgICAgICBpZiBib3RoIGFyZSB1cGRhdGVkIGF0IHRoZSBzYW1lIHRpbWUgdGhlbiBgdzFgIHdpbnMgLS0+XG4gKiAgIDxkaXYgW25nU3R5bGVdPVwie3dpZHRoOncxfVwiIFtzdHlsZS53aWR0aF09XCJ3MlwiPi4uLjwvZGl2PlxuICpcbiAqICAgPCEtLSBpZiBgdzFgIGlzIHVwZGF0ZWQgdGhlbiBpdCB3aWxsIGFsd2F5cyBsb3NlIHRvIGB3MmBcbiAqICAgICAgICBpZiBgdzJgIGlzIHVwZGF0ZWQgdGhlbiBpdCB3aWxsIGFsd2F5cyBvdmVycmlkZSBgdzFgXG4gKiAgICAgICAgaWYgYm90aCBhcmUgdXBkYXRlZCBhdCB0aGUgc2FtZSB0aW1lIHRoZW4gYHcyYCB3aW5zIC0tPlxuICogICA8ZGl2IFtzdHlsZV09XCJ7d2lkdGg6dzF9XCIgW3N0eWxlLndpZHRoXT1cIncyXCI+Li4uPC9kaXY+XG4gKiAgIGBgYFxuICogLSBuZ0NsYXNzL25nU3R5bGUgd2VyZSB3cml0dGVuIGFzIGEgZGlyZWN0aXZlcyBhbmQgbWFkZSB1c2Ugb2YgbWFwcywgY2xvc3VyZXMgYW5kIG90aGVyXG4gKiAgIGV4cGVuc2l2ZSBkYXRhIHN0cnVjdHVyZXMgd2hpY2ggd2VyZSBldmFsdWF0ZWQgZWFjaCB0aW1lIENEIHJ1bnNcbiAqL1xuZXhwb3J0IGNsYXNzIFN0eWxpbmdEaWZmZXI8VD4ge1xuICBwdWJsaWMgcmVhZG9ubHkgdmFsdWU6IFR8bnVsbCA9IG51bGw7XG5cbiAgcHJpdmF0ZSBfbGFzdFNldFZhbHVlOiB7W2tleTogc3RyaW5nXTogYW55fXxzdHJpbmd8c3RyaW5nW118bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2xhc3RTZXRWYWx1ZVR5cGU6IFN0eWxpbmdEaWZmZXJWYWx1ZVR5cGVzID0gU3R5bGluZ0RpZmZlclZhbHVlVHlwZXMuTnVsbDtcbiAgcHJpdmF0ZSBfbGFzdFNldFZhbHVlSWRlbnRpdHlDaGFuZ2UgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9uYW1lOiBzdHJpbmcsIHByaXZhdGUgX29wdGlvbnM6IFN0eWxpbmdEaWZmZXJPcHRpb25zKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzICh1cGRhdGVzKSB0aGUgc3R5bGluZyB2YWx1ZSB3aXRoaW4gdGhlIGRpZmZlci5cbiAgICpcbiAgICogT25seSB3aGVuIGBoYXNWYWx1ZUNoYW5nZWRgIGlzIGNhbGxlZCB0aGVuIHRoaXMgbmV3IHZhbHVlIHdpbGwgYmUgZXZhbHV0ZWRcbiAgICogYW5kIGNoZWNrZWQgYWdhaW5zdCB0aGUgcHJldmlvdXMgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSB0aGUgbmV3IHN0eWxpbmcgdmFsdWUgcHJvdmlkZWQgZnJvbSB0aGUgbmdDbGFzcy9uZ1N0eWxlIGJpbmRpbmdcbiAgICovXG4gIHNldFZhbHVlKHZhbHVlOiB7W2tleTogc3RyaW5nXTogYW55fXxzdHJpbmdbXXxzdHJpbmd8bnVsbCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdGhpcy5fbGFzdFNldFZhbHVlVHlwZSA9IFN0eWxpbmdEaWZmZXJWYWx1ZVR5cGVzLkFycmF5O1xuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgIHRoaXMuX2xhc3RTZXRWYWx1ZVR5cGUgPSBTdHlsaW5nRGlmZmVyVmFsdWVUeXBlcy5TZXQ7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoISh0aGlzLl9vcHRpb25zICYgU3R5bGluZ0RpZmZlck9wdGlvbnMuQWxsb3dTdHJpbmdWYWx1ZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuX25hbWUgKyAnIHN0cmluZyB2YWx1ZXMgYXJlIG5vdCBhbGxvd2VkJyk7XG4gICAgICB9XG4gICAgICB0aGlzLl9sYXN0U2V0VmFsdWVUeXBlID0gU3R5bGluZ0RpZmZlclZhbHVlVHlwZXMuU3RyaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9sYXN0U2V0VmFsdWVUeXBlID0gdmFsdWUgPyBTdHlsaW5nRGlmZmVyVmFsdWVUeXBlcy5NYXAgOiBTdHlsaW5nRGlmZmVyVmFsdWVUeXBlcy5OdWxsO1xuICAgIH1cblxuICAgIHRoaXMuX2xhc3RTZXRWYWx1ZUlkZW50aXR5Q2hhbmdlID0gdHJ1ZTtcbiAgICB0aGlzLl9sYXN0U2V0VmFsdWUgPSB2YWx1ZSB8fCBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdGhlIHZhbHVlIGhhcyBjaGFuZ2VkLlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGNhbiBiZSBjYWxsZWQgcmlnaHQgYWZ0ZXIgYHNldFZhbHVlKClgIGlzIGNhbGxlZCwgYnV0IGl0IGNhbiBhbHNvIGJlXG4gICAqIGNhbGxlZCBpbmNhc2UgdGhlIGV4aXN0aW5nIHZhbHVlIChpZiBpdCdzIGEgY29sbGVjdGlvbikgY2hhbmdlcyBpbnRlcm5hbGx5LiBJZiB0aGVcbiAgICogdmFsdWUgaXMgaW5kZWVkIGEgY29sbGVjdGlvbiBpdCB3aWxsIGRvIHRoZSBuZWNlc3NhcnkgZGlmZmluZyB3b3JrIGFuZCBwcm9kdWNlIGFcbiAgICogbmV3IG9iamVjdCB2YWx1ZSBhcyBhc3NpZ24gdGhhdCB0byBgdmFsdWVgLlxuICAgKlxuICAgKiBAcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmFsdWUgaGFzIGNoYW5nZWQgaW4gc29tZSB3YXkuXG4gICAqL1xuICBoYXNWYWx1ZUNoYW5nZWQoKTogYm9vbGVhbiB7XG4gICAgbGV0IHZhbHVlSGFzQ2hhbmdlZCA9IHRoaXMuX2xhc3RTZXRWYWx1ZUlkZW50aXR5Q2hhbmdlO1xuICAgIGlmICghdmFsdWVIYXNDaGFuZ2VkICYmICEodGhpcy5fbGFzdFNldFZhbHVlVHlwZSAmIFN0eWxpbmdEaWZmZXJWYWx1ZVR5cGVzLkNvbGxlY3Rpb24pKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgbGV0IGZpbmFsVmFsdWU6IHtba2V5OiBzdHJpbmddOiBhbnl9fHN0cmluZ3xudWxsID0gbnVsbDtcbiAgICBjb25zdCB0cmltVmFsdWVzID0gKHRoaXMuX29wdGlvbnMgJiBTdHlsaW5nRGlmZmVyT3B0aW9ucy5UcmltUHJvcGVydGllcykgPyB0cnVlIDogZmFsc2U7XG4gICAgY29uc3QgcGFyc2VPdXRVbml0cyA9ICh0aGlzLl9vcHRpb25zICYgU3R5bGluZ0RpZmZlck9wdGlvbnMuQWxsb3dVbml0cykgPyB0cnVlIDogZmFsc2U7XG4gICAgY29uc3QgYWxsb3dTdWJLZXlzID0gKHRoaXMuX29wdGlvbnMgJiBTdHlsaW5nRGlmZmVyT3B0aW9ucy5BbGxvd1N1YktleXMpID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgc3dpdGNoICh0aGlzLl9sYXN0U2V0VmFsdWVUeXBlKSB7XG4gICAgICAvLyBjYXNlIDE6IFtpbnB1dF09XCJzdHJpbmdcIlxuICAgICAgY2FzZSBTdHlsaW5nRGlmZmVyVmFsdWVUeXBlcy5TdHJpbmc6XG4gICAgICAgIGNvbnN0IHRva2VucyA9ICh0aGlzLl9sYXN0U2V0VmFsdWUgYXMgc3RyaW5nKS5zcGxpdCgvXFxzKy9nKTtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMgJiBTdHlsaW5nRGlmZmVyT3B0aW9ucy5Gb3JjZUFzTWFwKSB7XG4gICAgICAgICAgZmluYWxWYWx1ZSA9IHt9O1xuICAgICAgICAgIHRva2Vucy5mb3JFYWNoKCh0b2tlbiwgaSkgPT4gKGZpbmFsVmFsdWUgYXN7W2tleTogc3RyaW5nXTogYW55fSlbdG9rZW5dID0gdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmluYWxWYWx1ZSA9IHRva2Vucy5yZWR1Y2UoKHN0ciwgdG9rZW4sIGkpID0+IHN0ciArIChpID8gJyAnIDogJycpICsgdG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBjYXNlIDI6IFtpbnB1dF09XCJ7a2V5OnZhbHVlfVwiXG4gICAgICBjYXNlIFN0eWxpbmdEaWZmZXJWYWx1ZVR5cGVzLk1hcDpcbiAgICAgICAgY29uc3QgbWFwOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHRoaXMuX2xhc3RTZXRWYWx1ZSBhc3tba2V5OiBzdHJpbmddOiBhbnl9O1xuICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobWFwKTtcbiAgICAgICAgaWYgKCF2YWx1ZUhhc0NoYW5nZWQpIHtcbiAgICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgLy8gd2Uga25vdyB0aGF0IHRoZSBjbGFzc0V4cCB2YWx1ZSBleGlzdHMgYW5kIHRoYXQgaXQgaXNcbiAgICAgICAgICAgIC8vIGEgbWFwIChvdGhlcndpc2UgYW4gaWRlbnRpdHkgY2hhbmdlIHdvdWxkIGhhdmUgb2NjdXJyZWQpXG4gICAgICAgICAgICB2YWx1ZUhhc0NoYW5nZWQgPSBtYXBIYXNDaGFuZ2VkKGtleXMsIHRoaXMudmFsdWUgYXN7W2tleTogc3RyaW5nXTogYW55fSwgbWFwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWVIYXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWVIYXNDaGFuZ2VkKSB7XG4gICAgICAgICAgZmluYWxWYWx1ZSA9XG4gICAgICAgICAgICAgIGJ1bGlkTWFwRnJvbVZhbHVlcyh0aGlzLl9uYW1lLCB0cmltVmFsdWVzLCBwYXJzZU91dFVuaXRzLCBhbGxvd1N1YktleXMsIG1hcCwga2V5cyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIGNhc2UgM2E6IFtpbnB1dF09XCJbc3RyMSwgc3RyMiwgLi4uXVwiXG4gICAgICAvLyBjYXNlIDNiOiBbaW5wdXRdPVwiU2V0XCJcbiAgICAgIGNhc2UgU3R5bGluZ0RpZmZlclZhbHVlVHlwZXMuQXJyYXk6XG4gICAgICBjYXNlIFN0eWxpbmdEaWZmZXJWYWx1ZVR5cGVzLlNldDpcbiAgICAgICAgY29uc3QgdmFsdWVzID0gQXJyYXkuZnJvbSh0aGlzLl9sYXN0U2V0VmFsdWUgYXMgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPik7XG4gICAgICAgIGlmICghdmFsdWVIYXNDaGFuZ2VkKSB7XG4gICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMudmFsdWUgISk7XG4gICAgICAgICAgdmFsdWVIYXNDaGFuZ2VkID0gIWFycmF5RXF1YWxzQXJyYXkoa2V5cywgdmFsdWVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWVIYXNDaGFuZ2VkKSB7XG4gICAgICAgICAgZmluYWxWYWx1ZSA9XG4gICAgICAgICAgICAgIGJ1bGlkTWFwRnJvbVZhbHVlcyh0aGlzLl9uYW1lLCB0cmltVmFsdWVzLCBwYXJzZU91dFVuaXRzLCBhbGxvd1N1YktleXMsIHZhbHVlcyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIGNhc2UgNDogW2lucHV0XT1cIm51bGx8dW5kZWZpbmVkXCJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGZpbmFsVmFsdWUgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAodmFsdWVIYXNDaGFuZ2VkKSB7XG4gICAgICAodGhpcyBhcyBhbnkpLnZhbHVlID0gZmluYWxWYWx1ZSAhO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZUhhc0NoYW5nZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBWYXJpb3VzIG9wdGlvbnMgdGhhdCBhcmUgY29uc3VtZWQgYnkgdGhlIFtTdHlsaW5nRGlmZmVyXSBjbGFzcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gU3R5bGluZ0RpZmZlck9wdGlvbnMge1xuICBOb25lID0gMGIwMDAwMCxcbiAgVHJpbVByb3BlcnRpZXMgPSAwYjAwMDAxLFxuICBBbGxvd1N1YktleXMgPSAwYjAwMDEwLFxuICBBbGxvd1N0cmluZ1ZhbHVlID0gMGIwMDEwMCxcbiAgQWxsb3dVbml0cyA9IDBiMDEwMDAsXG4gIEZvcmNlQXNNYXAgPSAwYjEwMDAwLFxufVxuXG4vKipcbiAqIFRoZSBkaWZmZXJlbnQgdHlwZXMgb2YgaW5wdXRzIHRoYXQgdGhlIFtTdHlsaW5nRGlmZmVyXSBjYW4gZGVhbCB3aXRoXG4gKi9cbmNvbnN0IGVudW0gU3R5bGluZ0RpZmZlclZhbHVlVHlwZXMge1xuICBOdWxsID0gMGIwMDAwLFxuICBTdHJpbmcgPSAwYjAwMDEsXG4gIE1hcCA9IDBiMDAxMCxcbiAgQXJyYXkgPSAwYjAxMDAsXG4gIFNldCA9IDBiMTAwMCxcbiAgQ29sbGVjdGlvbiA9IDBiMTExMCxcbn1cblxuXG4vKipcbiAqIGJ1aWxkcyBhbmQgcmV0dXJucyBhIG1hcCBiYXNlZCBvbiB0aGUgdmFsdWVzIGlucHV0IHZhbHVlXG4gKlxuICogSWYgdGhlIGBrZXlzYCBwYXJhbSBpcyBwcm92aWRlZCB0aGVuIHRoZSBgdmFsdWVzYCBwYXJhbSBpcyB0cmVhdGVkIGFzIGFcbiAqIHN0cmluZyBtYXAuIE90aGVyd2lzZSBgdmFsdWVzYCBpcyB0cmVhdGVkIGFzIGEgc3RyaW5nIGFycmF5LlxuICovXG5mdW5jdGlvbiBidWxpZE1hcEZyb21WYWx1ZXMoXG4gICAgZXJyb3JQcmVmaXg6IHN0cmluZywgdHJpbTogYm9vbGVhbiwgcGFyc2VPdXRVbml0czogYm9vbGVhbiwgYWxsb3dTdWJLZXlzOiBib29sZWFuLFxuICAgIHZhbHVlczoge1trZXk6IHN0cmluZ106IGFueX0gfCBzdHJpbmdbXSwga2V5cz86IHN0cmluZ1tdKSB7XG4gIGNvbnN0IG1hcDoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgaWYgKGtleXMpIHtcbiAgICAvLyBjYXNlIDE6IG1hcFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGtleSA9IGtleXNbaV07XG4gICAgICBrZXkgPSB0cmltID8ga2V5LnRyaW0oKSA6IGtleTtcbiAgICAgIGNvbnN0IHZhbHVlID0gKHZhbHVlcyBhc3tba2V5OiBzdHJpbmddOiBhbnl9KVtrZXldO1xuICAgICAgc2V0TWFwVmFsdWVzKG1hcCwga2V5LCB2YWx1ZSwgcGFyc2VPdXRVbml0cywgYWxsb3dTdWJLZXlzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gY2FzZSAyOiBhcnJheVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgdmFsdWUgPSAodmFsdWVzIGFzIHN0cmluZ1tdKVtpXTtcbiAgICAgIGFzc2VydFZhbGlkVmFsdWUoZXJyb3JQcmVmaXgsIHZhbHVlKTtcbiAgICAgIHZhbHVlID0gdHJpbSA/IHZhbHVlLnRyaW0oKSA6IHZhbHVlO1xuICAgICAgc2V0TWFwVmFsdWVzKG1hcCwgdmFsdWUsIHRydWUsIGZhbHNlLCBhbGxvd1N1YktleXMpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtYXA7XG59XG5cbmZ1bmN0aW9uIGFzc2VydFZhbGlkVmFsdWUoZXJyb3JQcmVmaXg6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYCR7ZXJyb3JQcmVmaXh9IGNhbiBvbmx5IHRvZ2dsZSBDU1MgY2xhc3NlcyBleHByZXNzZWQgYXMgc3RyaW5ncywgZ290ICR7dmFsdWV9YCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0TWFwVmFsdWVzKFxuICAgIG1hcDoge1trZXk6IHN0cmluZ106IGFueX0sIGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBwYXJzZU91dFVuaXRzOiBib29sZWFuLFxuICAgIGFsbG93U3ViS2V5czogYm9vbGVhbikge1xuICBpZiAoYWxsb3dTdWJLZXlzICYmIGtleS5pbmRleE9mKCcgJykgPiAwKSB7XG4gICAgY29uc3QgaW5uZXJLZXlzID0ga2V5LnNwbGl0KC9cXHMrL2cpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgaW5uZXJLZXlzLmxlbmd0aDsgaisrKSB7XG4gICAgICBzZXRJbmRpdmlkdWFsTWFwVmFsdWUobWFwLCBpbm5lcktleXNbal0sIHZhbHVlLCBwYXJzZU91dFVuaXRzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc2V0SW5kaXZpZHVhbE1hcFZhbHVlKG1hcCwga2V5LCB2YWx1ZSwgcGFyc2VPdXRVbml0cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0SW5kaXZpZHVhbE1hcFZhbHVlKFxuICAgIG1hcDoge1trZXk6IHN0cmluZ106IGFueX0sIGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBwYXJzZU91dFVuaXRzOiBib29sZWFuKSB7XG4gIGlmIChwYXJzZU91dFVuaXRzKSB7XG4gICAgY29uc3QgdmFsdWVzID0gbm9ybWFsaXplU3R5bGVLZXlBbmRWYWx1ZShrZXksIHZhbHVlKTtcbiAgICB2YWx1ZSA9IHZhbHVlcy52YWx1ZTtcbiAgICBrZXkgPSB2YWx1ZXMua2V5O1xuICB9XG4gIG1hcFtrZXldID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVN0eWxlS2V5QW5kVmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudWxsKSB7XG4gIGNvbnN0IGluZGV4ID0ga2V5LmluZGV4T2YoJy4nKTtcbiAgaWYgKGluZGV4ID4gMCkge1xuICAgIGNvbnN0IHVuaXQgPSBrZXkuc3Vic3RyKGluZGV4ICsgMSk7ICAvLyBpZ25vcmUgdGhlIC4gKFt3aWR0aC5weF09XCInNDAnXCIgPT4gXCI0MHB4XCIpXG4gICAga2V5ID0ga2V5LnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHsgIC8vIHdlIHNob3VsZCBub3QgY29udmVydCBudWxsIHZhbHVlcyB0byBzdHJpbmdcbiAgICAgIHZhbHVlICs9IHVuaXQ7XG4gICAgfVxuICB9XG4gIHJldHVybiB7a2V5LCB2YWx1ZX07XG59XG5cbmZ1bmN0aW9uIG1hcEhhc0NoYW5nZWQoa2V5czogc3RyaW5nW10sIGE6IHtba2V5OiBzdHJpbmddOiBhbnl9LCBiOiB7W2tleTogc3RyaW5nXTogYW55fSkge1xuICBjb25zdCBvbGRLZXlzID0gT2JqZWN0LmtleXMoYSk7XG4gIGNvbnN0IG5ld0tleXMgPSBrZXlzO1xuXG4gIC8vIHRoZSBrZXlzIGFyZSBkaWZmZXJlbnQgd2hpY2ggbWVhbnMgdGhlIG1hcCBjaGFuZ2VkXG4gIGlmICghYXJyYXlFcXVhbHNBcnJheShvbGRLZXlzLCBuZXdLZXlzKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qga2V5ID0gbmV3S2V5c1tpXTtcbiAgICBpZiAoYVtrZXldICE9PSBiW2tleV0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gYXJyYXlFcXVhbHNBcnJheShhOiBhbnlbXSB8IG51bGwsIGI6IGFueVtdIHwgbnVsbCkge1xuICBpZiAoYSAmJiBiKSB7XG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGIuaW5kZXhPZihhW2ldKSA9PT0gLTEpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIl19