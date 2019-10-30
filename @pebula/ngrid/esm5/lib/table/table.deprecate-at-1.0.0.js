/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isDevMode } from '@angular/core';
/**
 * @param {?} store
 * @param {?} identityProp
 * @return {?}
 */
export function setIdentityProp(store, identityProp) {
    if (store.allColumns.length > 0 && identityProp) {
        // STATES:
        //    1: identityProp but also primary
        //    2: identityProp, no primary, AND not found
        //    3: identityProp, no primary but found.
        /** @type {?} */
        var state = 1;
        if (!store.primary) {
            state = 2;
            /** @type {?} */
            var column = store.find(identityProp);
            if (column && column.data) {
                state = 3;
                store['_primary'] = column.data;
            }
        }
        if (isDevMode()) {
            /** @type {?} */
            var genericMsg = "The [identityProp] input is deprecated, please remove it and use \"pIndex\" on the column definition instead.";
            switch (state) {
                case 1:
                    console.warn(genericMsg + "\nFound column \"" + store.primary.id + "\" defined with the new method (pIndex), ignoring \"" + identityProp + "\" set in [identityProp]");
                    break;
                case 2:
                    console.warn(genericMsg + "\nCould not find a column defined with the new method (pIndex).\nTrying to locate the column \"" + identityProp + "\" defined in [identityProp] FAILED! with no match.\nAN IDENTITY COLUMN WAS NOT SET");
                    break;
                case 3:
                    console.warn(genericMsg + "\nCould not find a column defined with the new method (pIndex).\nTrying to locate the column \"" + identityProp + "\" defined in [identityProp] SUCCEEDED!.\nUSING \"" + identityProp + "\" AS THE IDENTITY COLUMN.");
                    break;
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuZGVwcmVjYXRlLWF0LTEuMC4wLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS90YWJsZS5kZXByZWNhdGUtYXQtMS4wLjAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQUcxQyxNQUFNLFVBQVUsZUFBZSxDQUFDLEtBQXFCLEVBQUUsWUFBb0I7SUFDekUsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksWUFBWSxFQUFFOzs7Ozs7WUFLM0MsS0FBSyxHQUFHLENBQUM7UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNsQixLQUFLLEdBQUcsQ0FBQyxDQUFDOztnQkFDSixNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDdkMsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDekIsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDVixLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNqQztTQUNGO1FBRUQsSUFBSSxTQUFTLEVBQUUsRUFBRTs7Z0JBQ1QsVUFBVSxHQUFHLCtHQUE2RztZQUNoSSxRQUFRLEtBQUssRUFBRTtnQkFDYixLQUFLLENBQUM7b0JBQ0osT0FBTyxDQUFDLElBQUksQ0FDbkIsVUFBVSx5QkFDRyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsNERBQXFELFlBQVksNkJBQXlCLENBQ3pILENBQUM7b0JBQ1EsTUFBTTtnQkFDUixLQUFLLENBQUM7b0JBQ0osT0FBTyxDQUFDLElBQUksQ0FDbkIsVUFBVSx1R0FFa0IsWUFBWSx3RkFDWixDQUM5QixDQUFDO29CQUNRLE1BQU07Z0JBQ1IsS0FBSyxDQUFDO29CQUNGLE9BQU8sQ0FBQyxJQUFJLENBQ3JCLFVBQVUsdUdBRWtCLFlBQVksMERBQ2xDLFlBQVksK0JBQTJCLENBQy9DLENBQUM7b0JBQ1EsTUFBTTthQUNUO1NBQ0Y7S0FDRjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibENvbHVtblN0b3JlIH0gZnJvbSAnLi4vdGFibGUvY29sdW1ucy9jb2x1bW4tc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0SWRlbnRpdHlQcm9wKHN0b3JlOiBQYmxDb2x1bW5TdG9yZSwgaWRlbnRpdHlQcm9wOiBzdHJpbmcpOiB2b2lkIHtcbiAgaWYgKHN0b3JlLmFsbENvbHVtbnMubGVuZ3RoID4gMCAmJiBpZGVudGl0eVByb3ApIHtcbiAgICAvLyBTVEFURVM6XG4gICAgLy8gICAgMTogaWRlbnRpdHlQcm9wIGJ1dCBhbHNvIHByaW1hcnlcbiAgICAvLyAgICAyOiBpZGVudGl0eVByb3AsIG5vIHByaW1hcnksIEFORCBub3QgZm91bmRcbiAgICAvLyAgICAzOiBpZGVudGl0eVByb3AsIG5vIHByaW1hcnkgYnV0IGZvdW5kLlxuICAgIGxldCBzdGF0ZSA9IDE7XG4gICAgaWYgKCFzdG9yZS5wcmltYXJ5KSB7XG4gICAgICBzdGF0ZSA9IDI7XG4gICAgICBjb25zdCBjb2x1bW4gPSBzdG9yZS5maW5kKGlkZW50aXR5UHJvcCk7XG4gICAgICBpZiAoY29sdW1uICYmIGNvbHVtbi5kYXRhKSB7XG4gICAgICAgIHN0YXRlID0gMztcbiAgICAgICAgc3RvcmVbJ19wcmltYXJ5J10gPSBjb2x1bW4uZGF0YTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIGNvbnN0IGdlbmVyaWNNc2cgPSBgVGhlIFtpZGVudGl0eVByb3BdIGlucHV0IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSByZW1vdmUgaXQgYW5kIHVzZSBcInBJbmRleFwiIG9uIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBpbnN0ZWFkLmA7XG4gICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG5gJHtnZW5lcmljTXNnfVxuRm91bmQgY29sdW1uIFwiJHtzdG9yZS5wcmltYXJ5LmlkfVwiIGRlZmluZWQgd2l0aCB0aGUgbmV3IG1ldGhvZCAocEluZGV4KSwgaWdub3JpbmcgXCIke2lkZW50aXR5UHJvcH1cIiBzZXQgaW4gW2lkZW50aXR5UHJvcF1gXG4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuYCR7Z2VuZXJpY01zZ31cbkNvdWxkIG5vdCBmaW5kIGEgY29sdW1uIGRlZmluZWQgd2l0aCB0aGUgbmV3IG1ldGhvZCAocEluZGV4KS5cblRyeWluZyB0byBsb2NhdGUgdGhlIGNvbHVtbiBcIiR7aWRlbnRpdHlQcm9wfVwiIGRlZmluZWQgaW4gW2lkZW50aXR5UHJvcF0gRkFJTEVEISB3aXRoIG5vIG1hdGNoLlxuQU4gSURFTlRJVFkgQ09MVU1OIFdBUyBOT1QgU0VUYFxuKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuYCR7Z2VuZXJpY01zZ31cbkNvdWxkIG5vdCBmaW5kIGEgY29sdW1uIGRlZmluZWQgd2l0aCB0aGUgbmV3IG1ldGhvZCAocEluZGV4KS5cblRyeWluZyB0byBsb2NhdGUgdGhlIGNvbHVtbiBcIiR7aWRlbnRpdHlQcm9wfVwiIGRlZmluZWQgaW4gW2lkZW50aXR5UHJvcF0gU1VDQ0VFREVEIS5cblVTSU5HIFwiJHtpZGVudGl0eVByb3B9XCIgQVMgVEhFIElERU5USVRZIENPTFVNTi5gXG4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19