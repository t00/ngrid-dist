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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQuZGVwcmVjYXRlLWF0LTEuMC4wLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL25ncmlkLmRlcHJlY2F0ZS1hdC0xLjAuMC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBRzFDLE1BQU0sVUFBVSxlQUFlLENBQUMsS0FBcUIsRUFBRSxZQUFvQjtJQUN6RSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxZQUFZLEVBQUU7Ozs7OztZQUszQyxLQUFLLEdBQUcsQ0FBQztRQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2xCLEtBQUssR0FBRyxDQUFDLENBQUM7O2tCQUNKLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN2QyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUN6QixLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNWLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ2pDO1NBQ0Y7UUFFRCxJQUFJLFNBQVMsRUFBRSxFQUFFOztrQkFDVCxVQUFVLEdBQUcsNkdBQTZHO1lBQ2hJLFFBQVEsS0FBSyxFQUFFO2dCQUNiLEtBQUssQ0FBQztvQkFDSixPQUFPLENBQUMsSUFBSSxDQUN0QixHQUFHLFVBQVU7Z0JBQ0csS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLHFEQUFxRCxZQUFZLHlCQUF5QixDQUN6SCxDQUFDO29CQUNRLE1BQU07Z0JBQ1IsS0FBSyxDQUFDO29CQUNKLE9BQU8sQ0FBQyxJQUFJLENBQ3RCLEdBQUcsVUFBVTs7K0JBRWtCLFlBQVk7K0JBQ1osQ0FDOUIsQ0FBQztvQkFDUSxNQUFNO2dCQUNSLEtBQUssQ0FBQztvQkFDRixPQUFPLENBQUMsSUFBSSxDQUN4QixHQUFHLFVBQVU7OytCQUVrQixZQUFZO1NBQ2xDLFlBQVksMkJBQTJCLENBQy9DLENBQUM7b0JBQ1EsTUFBTTthQUNUO1NBQ0Y7S0FDRjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibENvbHVtblN0b3JlIH0gZnJvbSAnLi4vZ3JpZC9jb2x1bW5zL2NvbHVtbi1zdG9yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRJZGVudGl0eVByb3Aoc3RvcmU6IFBibENvbHVtblN0b3JlLCBpZGVudGl0eVByb3A6IHN0cmluZyk6IHZvaWQge1xuICBpZiAoc3RvcmUuYWxsQ29sdW1ucy5sZW5ndGggPiAwICYmIGlkZW50aXR5UHJvcCkge1xuICAgIC8vIFNUQVRFUzpcbiAgICAvLyAgICAxOiBpZGVudGl0eVByb3AgYnV0IGFsc28gcHJpbWFyeVxuICAgIC8vICAgIDI6IGlkZW50aXR5UHJvcCwgbm8gcHJpbWFyeSwgQU5EIG5vdCBmb3VuZFxuICAgIC8vICAgIDM6IGlkZW50aXR5UHJvcCwgbm8gcHJpbWFyeSBidXQgZm91bmQuXG4gICAgbGV0IHN0YXRlID0gMTtcbiAgICBpZiAoIXN0b3JlLnByaW1hcnkpIHtcbiAgICAgIHN0YXRlID0gMjtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IHN0b3JlLmZpbmQoaWRlbnRpdHlQcm9wKTtcbiAgICAgIGlmIChjb2x1bW4gJiYgY29sdW1uLmRhdGEpIHtcbiAgICAgICAgc3RhdGUgPSAzO1xuICAgICAgICBzdG9yZVsnX3ByaW1hcnknXSA9IGNvbHVtbi5kYXRhO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgY29uc3QgZ2VuZXJpY01zZyA9IGBUaGUgW2lkZW50aXR5UHJvcF0gaW5wdXQgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHJlbW92ZSBpdCBhbmQgdXNlIFwicEluZGV4XCIgb24gdGhlIGNvbHVtbiBkZWZpbml0aW9uIGluc3RlYWQuYDtcbiAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGNvbnNvbGUud2FybihcbmAke2dlbmVyaWNNc2d9XG5Gb3VuZCBjb2x1bW4gXCIke3N0b3JlLnByaW1hcnkuaWR9XCIgZGVmaW5lZCB3aXRoIHRoZSBuZXcgbWV0aG9kIChwSW5kZXgpLCBpZ25vcmluZyBcIiR7aWRlbnRpdHlQcm9wfVwiIHNldCBpbiBbaWRlbnRpdHlQcm9wXWBcbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG5gJHtnZW5lcmljTXNnfVxuQ291bGQgbm90IGZpbmQgYSBjb2x1bW4gZGVmaW5lZCB3aXRoIHRoZSBuZXcgbWV0aG9kIChwSW5kZXgpLlxuVHJ5aW5nIHRvIGxvY2F0ZSB0aGUgY29sdW1uIFwiJHtpZGVudGl0eVByb3B9XCIgZGVmaW5lZCBpbiBbaWRlbnRpdHlQcm9wXSBGQUlMRUQhIHdpdGggbm8gbWF0Y2guXG5BTiBJREVOVElUWSBDT0xVTU4gV0FTIE5PVCBTRVRgXG4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXG5gJHtnZW5lcmljTXNnfVxuQ291bGQgbm90IGZpbmQgYSBjb2x1bW4gZGVmaW5lZCB3aXRoIHRoZSBuZXcgbWV0aG9kIChwSW5kZXgpLlxuVHJ5aW5nIHRvIGxvY2F0ZSB0aGUgY29sdW1uIFwiJHtpZGVudGl0eVByb3B9XCIgZGVmaW5lZCBpbiBbaWRlbnRpdHlQcm9wXSBTVUNDRUVERUQhLlxuVVNJTkcgXCIke2lkZW50aXR5UHJvcH1cIiBBUyBUSEUgSURFTlRJVFkgQ09MVU1OLmBcbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=