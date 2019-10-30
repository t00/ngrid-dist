/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} arr
 * @param {?} value
 * @return {?}
 */
export function removeFromArray(arr, value) {
    if (Array.isArray(value)) {
        return value.map((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return _removeFromArray(arr, v); }));
    }
    else if (typeof value === 'function') {
        /** @type {?} */
        var idx = arr.findIndex((/** @type {?} */ (value)));
        if (idx > -1) {
            arr.splice(idx, 1);
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return _removeFromArray(arr, value);
    }
}
/**
 * @template T
 * @param {?} arr
 * @param {?} value
 * @return {?}
 */
function _removeFromArray(arr, value) {
    /** @type {?} */
    var idx = arr.indexOf(value);
    if (idx > -1) {
        arr.splice(idx, 1);
        return true;
    }
    else {
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL3V0aWxzLyIsInNvdXJjZXMiOlsibGliL2FycmF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQSxNQUFNLFVBQVUsZUFBZSxDQUFVLEdBQVEsRUFBRSxLQUF3RDtJQUN6RyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDeEIsT0FBTyxLQUFLLENBQUMsR0FBRzs7OztRQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUF4QixDQUF3QixFQUFFLENBQUM7S0FDbkQ7U0FBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVUsRUFBRTs7WUFDaEMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsbUJBQUEsS0FBSyxFQUFPLENBQUM7UUFDdkMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDWixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuQixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0tBQ0Y7U0FBTTtRQUNMLE9BQU8sZ0JBQWdCLENBQUksR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3hDO0FBQ0gsQ0FBQzs7Ozs7OztBQUVELFNBQVMsZ0JBQWdCLENBQVUsR0FBUSxFQUFFLEtBQVE7O1FBQzdDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUM5QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUNaLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25CLE9BQU8sSUFBSSxDQUFDO0tBQ2I7U0FBTTtRQUNMLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUZyb21BcnJheTxUID0gYW55PihhcnI6IFRbXSwgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4PzogbnVtYmVyKSA9PiBib29sZWFuKTogYm9vbGVhbjtcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGcm9tQXJyYXk8VCA9IGFueT4oYXJyOiBUW10sIHZhbHVlOiBUKTogYm9vbGVhbjtcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGcm9tQXJyYXk8VCA9IGFueT4oYXJyOiBUW10sIHZhbHVlczogVFtdKTogYm9vbGVhbltdO1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUZyb21BcnJheTxUID0gYW55PihhcnI6IFRbXSwgdmFsdWU6IFQgfCBUW10gfCAoKHZhbHVlOiBULCBpbmRleD86IG51bWJlcikgPT4gYm9vbGVhbikpOiBib29sZWFuIHwgYm9vbGVhbltdIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLm1hcCggdiA9PiBfcmVtb3ZlRnJvbUFycmF5KGFyciwgdikgKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCBpZHggPSBhcnIuZmluZEluZGV4KHZhbHVlIGFzIGFueSk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICBhcnIuc3BsaWNlKGlkeCwgMSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gX3JlbW92ZUZyb21BcnJheTxUPihhcnIsIHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfcmVtb3ZlRnJvbUFycmF5PFQgPSBhbnk+KGFycjogVFtdLCB2YWx1ZTogVCk6IGJvb2xlYW4ge1xuICBjb25zdCBpZHggPSBhcnIuaW5kZXhPZih2YWx1ZSk7XG4gIGlmIChpZHggPiAtMSkge1xuICAgIGFyci5zcGxpY2UoaWR4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==