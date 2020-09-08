/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/ngrid.deprecate-at-1.0.0.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        let state = 1;
        if (!store.primary) {
            state = 2;
            /** @type {?} */
            const column = store.find(identityProp);
            if (column && column.data) {
                state = 3;
                store['_primary'] = column.data;
            }
        }
        if (isDevMode()) {
            /** @type {?} */
            const genericMsg = `The [identityProp] input is deprecated, please remove it and use "pIndex" on the column definition instead.`;
            switch (state) {
                case 1:
                    console.warn(`${genericMsg}
Found column "${store.primary.id}" defined with the new method (pIndex), ignoring "${identityProp}" set in [identityProp]`);
                    break;
                case 2:
                    console.warn(`${genericMsg}
Could not find a column defined with the new method (pIndex).
Trying to locate the column "${identityProp}" defined in [identityProp] FAILED! with no match.
AN IDENTITY COLUMN WAS NOT SET`);
                    break;
                case 3:
                    console.warn(`${genericMsg}
Could not find a column defined with the new method (pIndex).
Trying to locate the column "${identityProp}" defined in [identityProp] SUCCEEDED!.
USING "${identityProp}" AS THE IDENTITY COLUMN.`);
                    break;
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQuZGVwcmVjYXRlLWF0LTEuMC4wLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL25ncmlkLmRlcHJlY2F0ZS1hdC0xLjAuMC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQUcxQyxNQUFNLFVBQVUsZUFBZSxDQUFDLEtBQXFCLEVBQUUsWUFBb0I7SUFDekUsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksWUFBWSxFQUFFOzs7Ozs7WUFLM0MsS0FBSyxHQUFHLENBQUM7UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNsQixLQUFLLEdBQUcsQ0FBQyxDQUFDOztrQkFDSixNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDdkMsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDekIsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDVixLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNqQztTQUNGO1FBRUQsSUFBSSxTQUFTLEVBQUUsRUFBRTs7a0JBQ1QsVUFBVSxHQUFHLDZHQUE2RztZQUNoSSxRQUFRLEtBQUssRUFBRTtnQkFDYixLQUFLLENBQUM7b0JBQ0osT0FBTyxDQUFDLElBQUksQ0FDdEIsR0FBRyxVQUFVO2dCQUNHLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxxREFBcUQsWUFBWSx5QkFBeUIsQ0FDekgsQ0FBQztvQkFDUSxNQUFNO2dCQUNSLEtBQUssQ0FBQztvQkFDSixPQUFPLENBQUMsSUFBSSxDQUN0QixHQUFHLFVBQVU7OytCQUVrQixZQUFZOytCQUNaLENBQzlCLENBQUM7b0JBQ1EsTUFBTTtnQkFDUixLQUFLLENBQUM7b0JBQ0YsT0FBTyxDQUFDLElBQUksQ0FDeEIsR0FBRyxVQUFVOzsrQkFFa0IsWUFBWTtTQUNsQyxZQUFZLDJCQUEyQixDQUMvQyxDQUFDO29CQUNRLE1BQU07YUFDVDtTQUNGO0tBQ0Y7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxDb2x1bW5TdG9yZSB9IGZyb20gJy4uL2dyaWQvY29sdW1ucy9jb2x1bW4tc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0SWRlbnRpdHlQcm9wKHN0b3JlOiBQYmxDb2x1bW5TdG9yZSwgaWRlbnRpdHlQcm9wOiBzdHJpbmcpOiB2b2lkIHtcbiAgaWYgKHN0b3JlLmFsbENvbHVtbnMubGVuZ3RoID4gMCAmJiBpZGVudGl0eVByb3ApIHtcbiAgICAvLyBTVEFURVM6XG4gICAgLy8gICAgMTogaWRlbnRpdHlQcm9wIGJ1dCBhbHNvIHByaW1hcnlcbiAgICAvLyAgICAyOiBpZGVudGl0eVByb3AsIG5vIHByaW1hcnksIEFORCBub3QgZm91bmRcbiAgICAvLyAgICAzOiBpZGVudGl0eVByb3AsIG5vIHByaW1hcnkgYnV0IGZvdW5kLlxuICAgIGxldCBzdGF0ZSA9IDE7XG4gICAgaWYgKCFzdG9yZS5wcmltYXJ5KSB7XG4gICAgICBzdGF0ZSA9IDI7XG4gICAgICBjb25zdCBjb2x1bW4gPSBzdG9yZS5maW5kKGlkZW50aXR5UHJvcCk7XG4gICAgICBpZiAoY29sdW1uICYmIGNvbHVtbi5kYXRhKSB7XG4gICAgICAgIHN0YXRlID0gMztcbiAgICAgICAgc3RvcmVbJ19wcmltYXJ5J10gPSBjb2x1bW4uZGF0YTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIGNvbnN0IGdlbmVyaWNNc2cgPSBgVGhlIFtpZGVudGl0eVByb3BdIGlucHV0IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSByZW1vdmUgaXQgYW5kIHVzZSBcInBJbmRleFwiIG9uIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBpbnN0ZWFkLmA7XG4gICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG5gJHtnZW5lcmljTXNnfVxuRm91bmQgY29sdW1uIFwiJHtzdG9yZS5wcmltYXJ5LmlkfVwiIGRlZmluZWQgd2l0aCB0aGUgbmV3IG1ldGhvZCAocEluZGV4KSwgaWdub3JpbmcgXCIke2lkZW50aXR5UHJvcH1cIiBzZXQgaW4gW2lkZW50aXR5UHJvcF1gXG4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuYCR7Z2VuZXJpY01zZ31cbkNvdWxkIG5vdCBmaW5kIGEgY29sdW1uIGRlZmluZWQgd2l0aCB0aGUgbmV3IG1ldGhvZCAocEluZGV4KS5cblRyeWluZyB0byBsb2NhdGUgdGhlIGNvbHVtbiBcIiR7aWRlbnRpdHlQcm9wfVwiIGRlZmluZWQgaW4gW2lkZW50aXR5UHJvcF0gRkFJTEVEISB3aXRoIG5vIG1hdGNoLlxuQU4gSURFTlRJVFkgQ09MVU1OIFdBUyBOT1QgU0VUYFxuKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuYCR7Z2VuZXJpY01zZ31cbkNvdWxkIG5vdCBmaW5kIGEgY29sdW1uIGRlZmluZWQgd2l0aCB0aGUgbmV3IG1ldGhvZCAocEluZGV4KS5cblRyeWluZyB0byBsb2NhdGUgdGhlIGNvbHVtbiBcIiR7aWRlbnRpdHlQcm9wfVwiIGRlZmluZWQgaW4gW2lkZW50aXR5UHJvcF0gU1VDQ0VFREVEIS5cblVTSU5HIFwiJHtpZGVudGl0eVByb3B9XCIgQVMgVEhFIElERU5USVRZIENPTFVNTi5gXG4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19