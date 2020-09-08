/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/directives/cell-style-class/styling_differ.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
var /**
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
StylingDiffer = /** @class */ (function () {
    function StylingDiffer(_name, _options) {
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
     * @param value the new styling value provided from the ngClass/ngStyle binding
     */
    /**
     * Sets (updates) the styling value within the differ.
     *
     * Only when `hasValueChanged` is called then this new value will be evaluted
     * and checked against the previous value.
     *
     * @param {?} value the new styling value provided from the ngClass/ngStyle binding
     * @return {?}
     */
    StylingDiffer.prototype.setValue = /**
     * Sets (updates) the styling value within the differ.
     *
     * Only when `hasValueChanged` is called then this new value will be evaluted
     * and checked against the previous value.
     *
     * @param {?} value the new styling value provided from the ngClass/ngStyle binding
     * @return {?}
     */
    function (value) {
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
    };
    /**
     * Determines whether or not the value has changed.
     *
     * This function can be called right after `setValue()` is called, but it can also be
     * called incase the existing value (if it's a collection) changes internally. If the
     * value is indeed a collection it will do the necessary diffing work and produce a
     * new object value as assign that to `value`.
     *
     * @returns whether or not the value has changed in some way.
     */
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
    StylingDiffer.prototype.hasValueChanged = /**
     * Determines whether or not the value has changed.
     *
     * This function can be called right after `setValue()` is called, but it can also be
     * called incase the existing value (if it's a collection) changes internally. If the
     * value is indeed a collection it will do the necessary diffing work and produce a
     * new object value as assign that to `value`.
     *
     * @return {?} whether or not the value has changed in some way.
     */
    function () {
        /** @type {?} */
        var valueHasChanged = this._lastSetValueIdentityChange;
        if (!valueHasChanged && !(this._lastSetValueType & 14 /* Collection */))
            return false;
        /** @type {?} */
        var finalValue = null;
        /** @type {?} */
        var trimValues = (this._options & 1 /* TrimProperties */) ? true : false;
        /** @type {?} */
        var parseOutUnits = (this._options & 8 /* AllowUnits */) ? true : false;
        /** @type {?} */
        var allowSubKeys = (this._options & 2 /* AllowSubKeys */) ? true : false;
        switch (this._lastSetValueType) {
            // case 1: [input]="string"
            case 1 /* String */:
                /** @type {?} */
                var tokens = ((/** @type {?} */ (this._lastSetValue))).split(/\s+/g);
                if (this._options & 16 /* ForceAsMap */) {
                    finalValue = {};
                    tokens.forEach((/**
                     * @param {?} token
                     * @param {?} i
                     * @return {?}
                     */
                    function (token, i) { return ((/** @type {?} */ (finalValue)))[token] = true; }));
                }
                else {
                    finalValue = tokens.reduce((/**
                     * @param {?} str
                     * @param {?} token
                     * @param {?} i
                     * @return {?}
                     */
                    function (str, token, i) { return str + (i ? ' ' : '') + token; }));
                }
                break;
            // case 2: [input]="{key:value}"
            case 2 /* Map */:
                /** @type {?} */
                var map = (/** @type {?} */ (this._lastSetValue));
                /** @type {?} */
                var keys = Object.keys(map);
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
                var values = Array.from((/** @type {?} */ (this._lastSetValue)));
                if (!valueHasChanged) {
                    /** @type {?} */
                    var keys_1 = Object.keys((/** @type {?} */ (this.value)));
                    valueHasChanged = !arrayEqualsArray(keys_1, values);
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
    };
    return StylingDiffer;
}());
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
export { StylingDiffer };
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
var StylingDifferOptions = {
    None: 0,
    TrimProperties: 1,
    AllowSubKeys: 2,
    AllowStringValue: 4,
    AllowUnits: 8,
    ForceAsMap: 16,
};
export { StylingDifferOptions };
/** @enum {number} */
var StylingDifferValueTypes = {
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
    var map = {};
    if (keys) {
        // case 1: map
        for (var i = 0; i < keys.length; i++) {
            /** @type {?} */
            var key = keys[i];
            key = trim ? key.trim() : key;
            /** @type {?} */
            var value = ((/** @type {?} */ (values)))[key];
            setMapValues(map, key, value, parseOutUnits, allowSubKeys);
        }
    }
    else {
        // case 2: array
        for (var i = 0; i < values.length; i++) {
            /** @type {?} */
            var value = ((/** @type {?} */ (values)))[i];
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
        throw new Error(errorPrefix + " can only toggle CSS classes expressed as strings, got " + value);
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
        var innerKeys = key.split(/\s+/g);
        for (var j = 0; j < innerKeys.length; j++) {
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
        var values = normalizeStyleKeyAndValue(key, value);
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
    var index = key.indexOf('.');
    if (index > 0) {
        /** @type {?} */
        var unit = key.substr(index + 1);
        key = key.substring(0, index);
        if (value != null) { // we should not convert null values to string
            value += unit;
        }
    }
    return { key: key, value: value };
}
/**
 * @param {?} keys
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function mapHasChanged(keys, a, b) {
    /** @type {?} */
    var oldKeys = Object.keys(a);
    /** @type {?} */
    var newKeys = keys;
    // the keys are different which means the map changed
    if (!arrayEqualsArray(oldKeys, newKeys)) {
        return true;
    }
    for (var i = 0; i < newKeys.length; i++) {
        /** @type {?} */
        var key = newKeys[i];
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
        for (var i = 0; i < a.length; i++) {
            if (b.indexOf(a[i]) === -1)
                return false;
        }
        return true;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGluZ19kaWZmZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvZGlyZWN0aXZlcy9jZWxsLXN0eWxlLWNsYXNzL3N0eWxpbmdfZGlmZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOERBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQU9FLHVCQUFvQixLQUFhLEVBQVUsUUFBOEI7UUFBckQsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQXNCO1FBTnpELFVBQUssR0FBVyxJQUFJLENBQUM7UUFFN0Isa0JBQWEsR0FBOEMsSUFBSSxDQUFDO1FBQ2hFLHNCQUFpQixnQkFBeUQ7UUFDMUUsZ0NBQTJCLEdBQUcsS0FBSyxDQUFDO0lBRWdDLENBQUM7SUFFN0U7Ozs7Ozs7T0FPRzs7Ozs7Ozs7OztJQUNILGdDQUFROzs7Ozs7Ozs7SUFBUixVQUFTLEtBQWdEO1FBQ3ZELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsaUJBQWlCLGdCQUFnQyxDQUFDO1NBQ3hEO2FBQU0sSUFBSSxLQUFLLFlBQVksR0FBRyxFQUFFO1lBQy9CLElBQUksQ0FBQyxpQkFBaUIsY0FBOEIsQ0FBQztTQUN0RDthQUFNLElBQUksS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSwyQkFBd0MsQ0FBQyxFQUFFO2dCQUM1RCxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsZ0NBQWdDLENBQUMsQ0FBQzthQUNoRTtZQUNELElBQUksQ0FBQyxpQkFBaUIsaUJBQWlDLENB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QUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFBRSxPQUFPLEtBQUssQ0FBQztTQUMxQztRQUNELE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvYmxvYi8wYmY4MTAwMjJhODBiYTFjYmNmZjhhYTQ3MTA2M2E2ZjEzNTJhYmJlL3BhY2thZ2VzL2NvbW1vbi9zcmMvZGlyZWN0aXZlcy9zdHlsaW5nX2RpZmZlci50c1xuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogVXNlZCB0byBkaWZmIGFuZCBjb252ZXJ0IG5nU3R5bGUvbmdDbGFzcyBpbnN0cnVjdGlvbnMgaW50byBbc3R5bGVdIGFuZCBbY2xhc3NdIGJpbmRpbmdzLlxuICpcbiAqIG5nU3R5bGUgYW5kIG5nQ2xhc3MgYm90aCBhY2NlcHQgdmFyaW91cyBmb3JtcyBvZiBpbnB1dCBhbmQgYmVoYXZlIGRpZmZlcmVudGx5IHRoYW4gdGhhdFxuICogb2YgaG93IFtzdHlsZV0gYW5kIFtjbGFzc10gYmVoYXZlIGluIEFuZ3VsYXIuXG4gKlxuICogVGhlIGRpZmZlcmVuY2VzIGFyZTpcbiAqICAtIG5nU3R5bGUgYW5kIG5nQ2xhc3MgYm90aCAqKndhdGNoKiogdGhlaXIgYmluZGluZyB2YWx1ZXMgZm9yIGNoYW5nZXMgZWFjaCB0aW1lIENEIHJ1bnNcbiAqICAgIHdoaWxlIFtzdHlsZV0gYW5kIFtjbGFzc10gYmluZGluZ3MgZG8gbm90ICh0aGV5IGNoZWNrIGZvciBpZGVudGl0eSBjaGFuZ2VzKVxuICogIC0gbmdTdHlsZSBhbGxvd3MgZm9yIHVuaXQtYmFzZWQga2V5cyAoZS5nLiBgeydtYXgtd2lkdGgucHgnOnZhbHVlfWApIGFuZCBbc3R5bGVdIGRvZXMgbm90XG4gKiAgLSBuZ0NsYXNzIHN1cHBvcnRzIGFycmF5cyBvZiBjbGFzcyB2YWx1ZXMgYW5kIFtjbGFzc10gb25seSBhY2NlcHRzIG1hcCBhbmQgc3RyaW5nIHZhbHVlc1xuICogIC0gbmdDbGFzcyBhbGxvd3MgZm9yIG11bHRpcGxlIGNsYXNzTmFtZSBrZXlzIChzcGFjZS1zZXBhcmF0ZWQpIHdpdGhpbiBhbiBhcnJheSBvciBtYXBcbiAqICAgICAoYXMgdGhlICoga2V5KSB3aGlsZSBbY2xhc3NdIG9ubHkgYWNjZXB0cyBhIHNpbXBsZSBrZXkvdmFsdWUgbWFwIG9iamVjdFxuICpcbiAqIEhhdmluZyBBbmd1bGFyIHVuZGVyc3RhbmQgYW5kIGFkYXB0IHRvIGFsbCB0aGUgZGlmZmVyZW50IGZvcm1zIG9mIGJlaGF2aW9yIGlzIGNvbXBsaWNhdGVkXG4gKiBhbmQgdW5uZWNlc3NhcnkuIEluc3RlYWQsIG5nQ2xhc3MgYW5kIG5nU3R5bGUgc2hvdWxkIGhhdmUgdGhlaXIgaW5wdXQgdmFsdWVzIGJlIGNvbnZlcnRlZFxuICogaW50byBzb21ldGhpbmcgdGhhdCB0aGUgY29yZS1sZXZlbCBbc3R5bGVdIGFuZCBbY2xhc3NdIGJpbmRpbmdzIHVuZGVyc3RhbmQuXG4gKlxuICogVGhpcyBbU3R5bGluZ0RpZmZlcl0gY2xhc3MgaGFuZGxlcyB0aGlzIGNvbnZlcnNpb24gYnkgY3JlYXRpbmcgYSBuZXcgaW5wdXQgdmFsdWUgZWFjaCB0aW1lXG4gKiB0aGUgaW5uZXIgcmVwcmVzZW50YXRpb24gb2YgdGhlIGJpbmRpbmcgdmFsdWUgaGF2ZSBjaGFuZ2VkLlxuICpcbiAqICMjIFdoeSBkbyB3ZSBjYXJlIGFib3V0IG5nU3R5bGUvbmdDbGFzcz9cbiAqIFRoZSBzdHlsaW5nIGFsZ29yaXRobSBjb2RlIChkb2N1bWVudGVkIGluc2lkZSBvZiBgcmVuZGVyMy9pbnRlcmZhY2VzL3N0eWxpbmcudHNgKSBuZWVkcyB0b1xuICogcmVzcGVjdCBhbmQgdW5kZXJzdGFuZCB0aGUgc3R5bGluZyB2YWx1ZXMgZW1pdHRlZCB0aHJvdWdoIG5nU3R5bGUgYW5kIG5nQ2xhc3MgKHdoZW4gdGhleVxuICogYXJlIHByZXNlbnQgYW5kIHVzZWQgaW4gYSB0ZW1wbGF0ZSkuXG4gKlxuICogSW5zdGVhZCBvZiBoYXZpbmcgdGhlc2UgZGlyZWN0aXZlcyBtYW5hZ2Ugc3R5bGluZyBvbiB0aGVpciBvd24sIHRoZXkgc2hvdWxkIGJlIGluY2x1ZGVkXG4gKiBpbnRvIHRoZSBBbmd1bGFyIHN0eWxpbmcgYWxnb3JpdGhtIHRoYXQgZXhpc3RzIGZvciBbc3R5bGVdIGFuZCBbY2xhc3NdIGJpbmRpbmdzLlxuICpcbiAqIEhlcmUncyB3aHk6XG4gKlxuICogLSBJZiBuZ1N0eWxlL25nQ2xhc3MgaXMgdXNlZCBpbiBjb21iaW5hdGlvbiB3aXRoIFtzdHlsZV0vW2NsYXNzXSBiaW5kaW5ncyB0aGVuIHRoZVxuICogICBzdHlsZXMgYW5kIGNsYXNzZXMgd291bGQgZmFsbCBvdXQgb2Ygc3luYyBhbmQgYmUgYXBwbGllZCBhbmQgdXBkYXRlZCBhdFxuICogICBpbmNvbnNpc3RlbnQgdGltZXNcbiAqIC0gQm90aCBuZ0NsYXNzL25nU3R5bGUgZG8gbm90IHJlc3BlY3QgW2NsYXNzLm5hbWVdIGFuZCBbc3R5bGUucHJvcF0gYmluZGluZ3NcbiAqICAgKHRoZXkgd2lsbCB3cml0ZSBvdmVyIHRoZW0gZ2l2ZW4gdGhlIHJpZ2h0IGNvbWJpbmF0aW9uIG9mIGV2ZW50cylcbiAqXG4gKiAgIGBgYFxuICogICA8IS0tIGlmIGB3MWAgaXMgdXBkYXRlZCB0aGVuIGl0IHdpbGwgYWx3YXlzIG92ZXJyaWRlIGB3MmBcbiAqICAgICAgICBpZiBgdzJgIGlzIHVwZGF0ZWQgdGhlbiBpdCB3aWxsIGFsd2F5cyBvdmVycmlkZSBgdzFgXG4gKiAgICAgICAgaWYgYm90aCBhcmUgdXBkYXRlZCBhdCB0aGUgc2FtZSB0aW1lIHRoZW4gYHcxYCB3aW5zIC0tPlxuICogICA8ZGl2IFtuZ1N0eWxlXT1cInt3aWR0aDp3MX1cIiBbc3R5bGUud2lkdGhdPVwidzJcIj4uLi48L2Rpdj5cbiAqXG4gKiAgIDwhLS0gaWYgYHcxYCBpcyB1cGRhdGVkIHRoZW4gaXQgd2lsbCBhbHdheXMgbG9zZSB0byBgdzJgXG4gKiAgICAgICAgaWYgYHcyYCBpcyB1cGRhdGVkIHRoZW4gaXQgd2lsbCBhbHdheXMgb3ZlcnJpZGUgYHcxYFxuICogICAgICAgIGlmIGJvdGggYXJlIHVwZGF0ZWQgYXQgdGhlIHNhbWUgdGltZSB0aGVuIGB3MmAgd2lucyAtLT5cbiAqICAgPGRpdiBbc3R5bGVdPVwie3dpZHRoOncxfVwiIFtzdHlsZS53aWR0aF09XCJ3MlwiPi4uLjwvZGl2PlxuICogICBgYGBcbiAqIC0gbmdDbGFzcy9uZ1N0eWxlIHdlcmUgd3JpdHRlbiBhcyBhIGRpcmVjdGl2ZXMgYW5kIG1hZGUgdXNlIG9mIG1hcHMsIGNsb3N1cmVzIGFuZCBvdGhlclxuICogICBleHBlbnNpdmUgZGF0YSBzdHJ1Y3R1cmVzIHdoaWNoIHdlcmUgZXZhbHVhdGVkIGVhY2ggdGltZSBDRCBydW5zXG4gKi9cbmV4cG9ydCBjbGFzcyBTdHlsaW5nRGlmZmVyPFQ+IHtcbiAgcHVibGljIHJlYWRvbmx5IHZhbHVlOiBUfG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgX2xhc3RTZXRWYWx1ZToge1trZXk6IHN0cmluZ106IGFueX18c3RyaW5nfHN0cmluZ1tdfG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9sYXN0U2V0VmFsdWVUeXBlOiBTdHlsaW5nRGlmZmVyVmFsdWVUeXBlcyA9IFN0eWxpbmdEaWZmZXJWYWx1ZVR5cGVzLk51bGw7XG4gIHByaXZhdGUgX2xhc3RTZXRWYWx1ZUlkZW50aXR5Q2hhbmdlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmFtZTogc3RyaW5nLCBwcml2YXRlIF9vcHRpb25zOiBTdHlsaW5nRGlmZmVyT3B0aW9ucykge31cblxuICAvKipcbiAgICogU2V0cyAodXBkYXRlcykgdGhlIHN0eWxpbmcgdmFsdWUgd2l0aGluIHRoZSBkaWZmZXIuXG4gICAqXG4gICAqIE9ubHkgd2hlbiBgaGFzVmFsdWVDaGFuZ2VkYCBpcyBjYWxsZWQgdGhlbiB0aGlzIG5ldyB2YWx1ZSB3aWxsIGJlIGV2YWx1dGVkXG4gICAqIGFuZCBjaGVja2VkIGFnYWluc3QgdGhlIHByZXZpb3VzIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWUgdGhlIG5ldyBzdHlsaW5nIHZhbHVlIHByb3ZpZGVkIGZyb20gdGhlIG5nQ2xhc3MvbmdTdHlsZSBiaW5kaW5nXG4gICAqL1xuICBzZXRWYWx1ZSh2YWx1ZToge1trZXk6IHN0cmluZ106IGFueX18c3RyaW5nW118c3RyaW5nfG51bGwpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX2xhc3RTZXRWYWx1ZVR5cGUgPSBTdHlsaW5nRGlmZmVyVmFsdWVUeXBlcy5BcnJheTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICB0aGlzLl9sYXN0U2V0VmFsdWVUeXBlID0gU3R5bGluZ0RpZmZlclZhbHVlVHlwZXMuU2V0O1xuICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKCEodGhpcy5fb3B0aW9ucyAmIFN0eWxpbmdEaWZmZXJPcHRpb25zLkFsbG93U3RyaW5nVmFsdWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLl9uYW1lICsgJyBzdHJpbmcgdmFsdWVzIGFyZSBub3QgYWxsb3dlZCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5fbGFzdFNldFZhbHVlVHlwZSA9IFN0eWxpbmdEaWZmZXJWYWx1ZVR5cGVzLlN0cmluZztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGFzdFNldFZhbHVlVHlwZSA9IHZhbHVlID8gU3R5bGluZ0RpZmZlclZhbHVlVHlwZXMuTWFwIDogU3R5bGluZ0RpZmZlclZhbHVlVHlwZXMuTnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLl9sYXN0U2V0VmFsdWVJZGVudGl0eUNoYW5nZSA9IHRydWU7XG4gICAgdGhpcy5fbGFzdFNldFZhbHVlID0gdmFsdWUgfHwgbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZSB2YWx1ZSBoYXMgY2hhbmdlZC5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIHJpZ2h0IGFmdGVyIGBzZXRWYWx1ZSgpYCBpcyBjYWxsZWQsIGJ1dCBpdCBjYW4gYWxzbyBiZVxuICAgKiBjYWxsZWQgaW5jYXNlIHRoZSBleGlzdGluZyB2YWx1ZSAoaWYgaXQncyBhIGNvbGxlY3Rpb24pIGNoYW5nZXMgaW50ZXJuYWxseS4gSWYgdGhlXG4gICAqIHZhbHVlIGlzIGluZGVlZCBhIGNvbGxlY3Rpb24gaXQgd2lsbCBkbyB0aGUgbmVjZXNzYXJ5IGRpZmZpbmcgd29yayBhbmQgcHJvZHVjZSBhXG4gICAqIG5ldyBvYmplY3QgdmFsdWUgYXMgYXNzaWduIHRoYXQgdG8gYHZhbHVlYC5cbiAgICpcbiAgICogQHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZhbHVlIGhhcyBjaGFuZ2VkIGluIHNvbWUgd2F5LlxuICAgKi9cbiAgaGFzVmFsdWVDaGFuZ2VkKCk6IGJvb2xlYW4ge1xuICAgIGxldCB2YWx1ZUhhc0NoYW5nZWQgPSB0aGlzLl9sYXN0U2V0VmFsdWVJZGVudGl0eUNoYW5nZTtcbiAgICBpZiAoIXZhbHVlSGFzQ2hhbmdlZCAmJiAhKHRoaXMuX2xhc3RTZXRWYWx1ZVR5cGUgJiBTdHlsaW5nRGlmZmVyVmFsdWVUeXBlcy5Db2xsZWN0aW9uKSlcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGxldCBmaW5hbFZhbHVlOiB7W2tleTogc3RyaW5nXTogYW55fXxzdHJpbmd8bnVsbCA9IG51bGw7XG4gICAgY29uc3QgdHJpbVZhbHVlcyA9ICh0aGlzLl9vcHRpb25zICYgU3R5bGluZ0RpZmZlck9wdGlvbnMuVHJpbVByb3BlcnRpZXMpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIGNvbnN0IHBhcnNlT3V0VW5pdHMgPSAodGhpcy5fb3B0aW9ucyAmIFN0eWxpbmdEaWZmZXJPcHRpb25zLkFsbG93VW5pdHMpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIGNvbnN0IGFsbG93U3ViS2V5cyA9ICh0aGlzLl9vcHRpb25zICYgU3R5bGluZ0RpZmZlck9wdGlvbnMuQWxsb3dTdWJLZXlzKSA/IHRydWUgOiBmYWxzZTtcblxuICAgIHN3aXRjaCAodGhpcy5fbGFzdFNldFZhbHVlVHlwZSkge1xuICAgICAgLy8gY2FzZSAxOiBbaW5wdXRdPVwic3RyaW5nXCJcbiAgICAgIGNhc2UgU3R5bGluZ0RpZmZlclZhbHVlVHlwZXMuU3RyaW5nOlxuICAgICAgICBjb25zdCB0b2tlbnMgPSAodGhpcy5fbGFzdFNldFZhbHVlIGFzIHN0cmluZykuc3BsaXQoL1xccysvZyk7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zICYgU3R5bGluZ0RpZmZlck9wdGlvbnMuRm9yY2VBc01hcCkge1xuICAgICAgICAgIGZpbmFsVmFsdWUgPSB7fTtcbiAgICAgICAgICB0b2tlbnMuZm9yRWFjaCgodG9rZW4sIGkpID0+IChmaW5hbFZhbHVlIGFze1trZXk6IHN0cmluZ106IGFueX0pW3Rva2VuXSA9IHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZpbmFsVmFsdWUgPSB0b2tlbnMucmVkdWNlKChzdHIsIHRva2VuLCBpKSA9PiBzdHIgKyAoaSA/ICcgJyA6ICcnKSArIHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgLy8gY2FzZSAyOiBbaW5wdXRdPVwie2tleTp2YWx1ZX1cIlxuICAgICAgY2FzZSBTdHlsaW5nRGlmZmVyVmFsdWVUeXBlcy5NYXA6XG4gICAgICAgIGNvbnN0IG1hcDoge1trZXk6IHN0cmluZ106IGFueX0gPSB0aGlzLl9sYXN0U2V0VmFsdWUgYXN7W2tleTogc3RyaW5nXTogYW55fTtcbiAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG1hcCk7XG4gICAgICAgIGlmICghdmFsdWVIYXNDaGFuZ2VkKSB7XG4gICAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIC8vIHdlIGtub3cgdGhhdCB0aGUgY2xhc3NFeHAgdmFsdWUgZXhpc3RzIGFuZCB0aGF0IGl0IGlzXG4gICAgICAgICAgICAvLyBhIG1hcCAob3RoZXJ3aXNlIGFuIGlkZW50aXR5IGNoYW5nZSB3b3VsZCBoYXZlIG9jY3VycmVkKVxuICAgICAgICAgICAgdmFsdWVIYXNDaGFuZ2VkID0gbWFwSGFzQ2hhbmdlZChrZXlzLCB0aGlzLnZhbHVlIGFze1trZXk6IHN0cmluZ106IGFueX0sIG1hcCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlSGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlSGFzQ2hhbmdlZCkge1xuICAgICAgICAgIGZpbmFsVmFsdWUgPVxuICAgICAgICAgICAgICBidWxpZE1hcEZyb21WYWx1ZXModGhpcy5fbmFtZSwgdHJpbVZhbHVlcywgcGFyc2VPdXRVbml0cywgYWxsb3dTdWJLZXlzLCBtYXAsIGtleXMpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBjYXNlIDNhOiBbaW5wdXRdPVwiW3N0cjEsIHN0cjIsIC4uLl1cIlxuICAgICAgLy8gY2FzZSAzYjogW2lucHV0XT1cIlNldFwiXG4gICAgICBjYXNlIFN0eWxpbmdEaWZmZXJWYWx1ZVR5cGVzLkFycmF5OlxuICAgICAgY2FzZSBTdHlsaW5nRGlmZmVyVmFsdWVUeXBlcy5TZXQ6XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IEFycmF5LmZyb20odGhpcy5fbGFzdFNldFZhbHVlIGFzIHN0cmluZ1tdIHwgU2V0PHN0cmluZz4pO1xuICAgICAgICBpZiAoIXZhbHVlSGFzQ2hhbmdlZCkge1xuICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLnZhbHVlICEpO1xuICAgICAgICAgIHZhbHVlSGFzQ2hhbmdlZCA9ICFhcnJheUVxdWFsc0FycmF5KGtleXMsIHZhbHVlcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlSGFzQ2hhbmdlZCkge1xuICAgICAgICAgIGZpbmFsVmFsdWUgPVxuICAgICAgICAgICAgICBidWxpZE1hcEZyb21WYWx1ZXModGhpcy5fbmFtZSwgdHJpbVZhbHVlcywgcGFyc2VPdXRVbml0cywgYWxsb3dTdWJLZXlzLCB2YWx1ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBjYXNlIDQ6IFtpbnB1dF09XCJudWxsfHVuZGVmaW5lZFwiXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBmaW5hbFZhbHVlID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlSGFzQ2hhbmdlZCkge1xuICAgICAgKHRoaXMgYXMgYW55KS52YWx1ZSA9IGZpbmFsVmFsdWUgITtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVIYXNDaGFuZ2VkO1xuICB9XG59XG5cbi8qKlxuICogVmFyaW91cyBvcHRpb25zIHRoYXQgYXJlIGNvbnN1bWVkIGJ5IHRoZSBbU3R5bGluZ0RpZmZlcl0gY2xhc3MuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIFN0eWxpbmdEaWZmZXJPcHRpb25zIHtcbiAgTm9uZSA9IDBiMDAwMDAsXG4gIFRyaW1Qcm9wZXJ0aWVzID0gMGIwMDAwMSxcbiAgQWxsb3dTdWJLZXlzID0gMGIwMDAxMCxcbiAgQWxsb3dTdHJpbmdWYWx1ZSA9IDBiMDAxMDAsXG4gIEFsbG93VW5pdHMgPSAwYjAxMDAwLFxuICBGb3JjZUFzTWFwID0gMGIxMDAwMCxcbn1cblxuLyoqXG4gKiBUaGUgZGlmZmVyZW50IHR5cGVzIG9mIGlucHV0cyB0aGF0IHRoZSBbU3R5bGluZ0RpZmZlcl0gY2FuIGRlYWwgd2l0aFxuICovXG5jb25zdCBlbnVtIFN0eWxpbmdEaWZmZXJWYWx1ZVR5cGVzIHtcbiAgTnVsbCA9IDBiMDAwMCxcbiAgU3RyaW5nID0gMGIwMDAxLFxuICBNYXAgPSAwYjAwMTAsXG4gIEFycmF5ID0gMGIwMTAwLFxuICBTZXQgPSAwYjEwMDAsXG4gIENvbGxlY3Rpb24gPSAwYjExMTAsXG59XG5cblxuLyoqXG4gKiBidWlsZHMgYW5kIHJldHVybnMgYSBtYXAgYmFzZWQgb24gdGhlIHZhbHVlcyBpbnB1dCB2YWx1ZVxuICpcbiAqIElmIHRoZSBga2V5c2AgcGFyYW0gaXMgcHJvdmlkZWQgdGhlbiB0aGUgYHZhbHVlc2AgcGFyYW0gaXMgdHJlYXRlZCBhcyBhXG4gKiBzdHJpbmcgbWFwLiBPdGhlcndpc2UgYHZhbHVlc2AgaXMgdHJlYXRlZCBhcyBhIHN0cmluZyBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYnVsaWRNYXBGcm9tVmFsdWVzKFxuICAgIGVycm9yUHJlZml4OiBzdHJpbmcsIHRyaW06IGJvb2xlYW4sIHBhcnNlT3V0VW5pdHM6IGJvb2xlYW4sIGFsbG93U3ViS2V5czogYm9vbGVhbixcbiAgICB2YWx1ZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgc3RyaW5nW10sIGtleXM/OiBzdHJpbmdbXSkge1xuICBjb25zdCBtYXA6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG4gIGlmIChrZXlzKSB7XG4gICAgLy8gY2FzZSAxOiBtYXBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBrZXkgPSBrZXlzW2ldO1xuICAgICAga2V5ID0gdHJpbSA/IGtleS50cmltKCkgOiBrZXk7XG4gICAgICBjb25zdCB2YWx1ZSA9ICh2YWx1ZXMgYXN7W2tleTogc3RyaW5nXTogYW55fSlba2V5XTtcbiAgICAgIHNldE1hcFZhbHVlcyhtYXAsIGtleSwgdmFsdWUsIHBhcnNlT3V0VW5pdHMsIGFsbG93U3ViS2V5cyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGNhc2UgMjogYXJyYXlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHZhbHVlID0gKHZhbHVlcyBhcyBzdHJpbmdbXSlbaV07XG4gICAgICBhc3NlcnRWYWxpZFZhbHVlKGVycm9yUHJlZml4LCB2YWx1ZSk7XG4gICAgICB2YWx1ZSA9IHRyaW0gPyB2YWx1ZS50cmltKCkgOiB2YWx1ZTtcbiAgICAgIHNldE1hcFZhbHVlcyhtYXAsIHZhbHVlLCB0cnVlLCBmYWxzZSwgYWxsb3dTdWJLZXlzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWFwO1xufVxuXG5mdW5jdGlvbiBhc3NlcnRWYWxpZFZhbHVlKGVycm9yUHJlZml4OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGAke2Vycm9yUHJlZml4fSBjYW4gb25seSB0b2dnbGUgQ1NTIGNsYXNzZXMgZXhwcmVzc2VkIGFzIHN0cmluZ3MsIGdvdCAke3ZhbHVlfWApO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldE1hcFZhbHVlcyhcbiAgICBtYXA6IHtba2V5OiBzdHJpbmddOiBhbnl9LCBrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgcGFyc2VPdXRVbml0czogYm9vbGVhbixcbiAgICBhbGxvd1N1YktleXM6IGJvb2xlYW4pIHtcbiAgaWYgKGFsbG93U3ViS2V5cyAmJiBrZXkuaW5kZXhPZignICcpID4gMCkge1xuICAgIGNvbnN0IGlubmVyS2V5cyA9IGtleS5zcGxpdCgvXFxzKy9nKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGlubmVyS2V5cy5sZW5ndGg7IGorKykge1xuICAgICAgc2V0SW5kaXZpZHVhbE1hcFZhbHVlKG1hcCwgaW5uZXJLZXlzW2pdLCB2YWx1ZSwgcGFyc2VPdXRVbml0cyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHNldEluZGl2aWR1YWxNYXBWYWx1ZShtYXAsIGtleSwgdmFsdWUsIHBhcnNlT3V0VW5pdHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldEluZGl2aWR1YWxNYXBWYWx1ZShcbiAgICBtYXA6IHtba2V5OiBzdHJpbmddOiBhbnl9LCBrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgcGFyc2VPdXRVbml0czogYm9vbGVhbikge1xuICBpZiAocGFyc2VPdXRVbml0cykge1xuICAgIGNvbnN0IHZhbHVlcyA9IG5vcm1hbGl6ZVN0eWxlS2V5QW5kVmFsdWUoa2V5LCB2YWx1ZSk7XG4gICAgdmFsdWUgPSB2YWx1ZXMudmFsdWU7XG4gICAga2V5ID0gdmFsdWVzLmtleTtcbiAgfVxuICBtYXBba2V5XSA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVTdHlsZUtleUFuZFZhbHVlKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgbnVsbCkge1xuICBjb25zdCBpbmRleCA9IGtleS5pbmRleE9mKCcuJyk7XG4gIGlmIChpbmRleCA+IDApIHtcbiAgICBjb25zdCB1bml0ID0ga2V5LnN1YnN0cihpbmRleCArIDEpOyAgLy8gaWdub3JlIHRoZSAuIChbd2lkdGgucHhdPVwiJzQwJ1wiID0+IFwiNDBweFwiKVxuICAgIGtleSA9IGtleS5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7ICAvLyB3ZSBzaG91bGQgbm90IGNvbnZlcnQgbnVsbCB2YWx1ZXMgdG8gc3RyaW5nXG4gICAgICB2YWx1ZSArPSB1bml0O1xuICAgIH1cbiAgfVxuICByZXR1cm4ge2tleSwgdmFsdWV9O1xufVxuXG5mdW5jdGlvbiBtYXBIYXNDaGFuZ2VkKGtleXM6IHN0cmluZ1tdLCBhOiB7W2tleTogc3RyaW5nXTogYW55fSwgYjoge1trZXk6IHN0cmluZ106IGFueX0pIHtcbiAgY29uc3Qgb2xkS2V5cyA9IE9iamVjdC5rZXlzKGEpO1xuICBjb25zdCBuZXdLZXlzID0ga2V5cztcblxuICAvLyB0aGUga2V5cyBhcmUgZGlmZmVyZW50IHdoaWNoIG1lYW5zIHRoZSBtYXAgY2hhbmdlZFxuICBpZiAoIWFycmF5RXF1YWxzQXJyYXkob2xkS2V5cywgbmV3S2V5cykpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3S2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IG5ld0tleXNbaV07XG4gICAgaWYgKGFba2V5XSAhPT0gYltrZXldKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGFycmF5RXF1YWxzQXJyYXkoYTogYW55W10gfCBudWxsLCBiOiBhbnlbXSB8IG51bGwpIHtcbiAgaWYgKGEgJiYgYikge1xuICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChiLmluZGV4T2YoYVtpXSkgPT09IC0xKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbiJdfQ==