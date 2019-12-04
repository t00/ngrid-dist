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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQuZGVwcmVjYXRlLWF0LTEuMC4wLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL25ncmlkLmRlcHJlY2F0ZS1hdC0xLjAuMC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBRzFDLE1BQU0sVUFBVSxlQUFlLENBQUMsS0FBcUIsRUFBRSxZQUFvQjtJQUN6RSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxZQUFZLEVBQUU7Ozs7OztZQUszQyxLQUFLLEdBQUcsQ0FBQztRQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2xCLEtBQUssR0FBRyxDQUFDLENBQUM7O2dCQUNKLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN2QyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUN6QixLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNWLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ2pDO1NBQ0Y7UUFFRCxJQUFJLFNBQVMsRUFBRSxFQUFFOztnQkFDVCxVQUFVLEdBQUcsK0dBQTZHO1lBQ2hJLFFBQVEsS0FBSyxFQUFFO2dCQUNiLEtBQUssQ0FBQztvQkFDSixPQUFPLENBQUMsSUFBSSxDQUNuQixVQUFVLHlCQUNHLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSw0REFBcUQsWUFBWSw2QkFBeUIsQ0FDekgsQ0FBQztvQkFDUSxNQUFNO2dCQUNSLEtBQUssQ0FBQztvQkFDSixPQUFPLENBQUMsSUFBSSxDQUNuQixVQUFVLHVHQUVrQixZQUFZLHdGQUNaLENBQzlCLENBQUM7b0JBQ1EsTUFBTTtnQkFDUixLQUFLLENBQUM7b0JBQ0YsT0FBTyxDQUFDLElBQUksQ0FDckIsVUFBVSx1R0FFa0IsWUFBWSwwREFDbEMsWUFBWSwrQkFBMkIsQ0FDL0MsQ0FBQztvQkFDUSxNQUFNO2FBQ1Q7U0FDRjtLQUNGO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsQ29sdW1uU3RvcmUgfSBmcm9tICcuLi9ncmlkL2NvbHVtbnMvY29sdW1uLXN0b3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldElkZW50aXR5UHJvcChzdG9yZTogUGJsQ29sdW1uU3RvcmUsIGlkZW50aXR5UHJvcDogc3RyaW5nKTogdm9pZCB7XG4gIGlmIChzdG9yZS5hbGxDb2x1bW5zLmxlbmd0aCA+IDAgJiYgaWRlbnRpdHlQcm9wKSB7XG4gICAgLy8gU1RBVEVTOlxuICAgIC8vICAgIDE6IGlkZW50aXR5UHJvcCBidXQgYWxzbyBwcmltYXJ5XG4gICAgLy8gICAgMjogaWRlbnRpdHlQcm9wLCBubyBwcmltYXJ5LCBBTkQgbm90IGZvdW5kXG4gICAgLy8gICAgMzogaWRlbnRpdHlQcm9wLCBubyBwcmltYXJ5IGJ1dCBmb3VuZC5cbiAgICBsZXQgc3RhdGUgPSAxO1xuICAgIGlmICghc3RvcmUucHJpbWFyeSkge1xuICAgICAgc3RhdGUgPSAyO1xuICAgICAgY29uc3QgY29sdW1uID0gc3RvcmUuZmluZChpZGVudGl0eVByb3ApO1xuICAgICAgaWYgKGNvbHVtbiAmJiBjb2x1bW4uZGF0YSkge1xuICAgICAgICBzdGF0ZSA9IDM7XG4gICAgICAgIHN0b3JlWydfcHJpbWFyeSddID0gY29sdW1uLmRhdGE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICBjb25zdCBnZW5lcmljTXNnID0gYFRoZSBbaWRlbnRpdHlQcm9wXSBpbnB1dCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgcmVtb3ZlIGl0IGFuZCB1c2UgXCJwSW5kZXhcIiBvbiB0aGUgY29sdW1uIGRlZmluaXRpb24gaW5zdGVhZC5gO1xuICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuYCR7Z2VuZXJpY01zZ31cbkZvdW5kIGNvbHVtbiBcIiR7c3RvcmUucHJpbWFyeS5pZH1cIiBkZWZpbmVkIHdpdGggdGhlIG5ldyBtZXRob2QgKHBJbmRleCksIGlnbm9yaW5nIFwiJHtpZGVudGl0eVByb3B9XCIgc2V0IGluIFtpZGVudGl0eVByb3BdYFxuKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIGNvbnNvbGUud2FybihcbmAke2dlbmVyaWNNc2d9XG5Db3VsZCBub3QgZmluZCBhIGNvbHVtbiBkZWZpbmVkIHdpdGggdGhlIG5ldyBtZXRob2QgKHBJbmRleCkuXG5UcnlpbmcgdG8gbG9jYXRlIHRoZSBjb2x1bW4gXCIke2lkZW50aXR5UHJvcH1cIiBkZWZpbmVkIGluIFtpZGVudGl0eVByb3BdIEZBSUxFRCEgd2l0aCBubyBtYXRjaC5cbkFOIElERU5USVRZIENPTFVNTiBXQVMgTk9UIFNFVGBcbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbmAke2dlbmVyaWNNc2d9XG5Db3VsZCBub3QgZmluZCBhIGNvbHVtbiBkZWZpbmVkIHdpdGggdGhlIG5ldyBtZXRob2QgKHBJbmRleCkuXG5UcnlpbmcgdG8gbG9jYXRlIHRoZSBjb2x1bW4gXCIke2lkZW50aXR5UHJvcH1cIiBkZWZpbmVkIGluIFtpZGVudGl0eVByb3BdIFNVQ0NFRURFRCEuXG5VU0lORyBcIiR7aWRlbnRpdHlQcm9wfVwiIEFTIFRIRSBJREVOVElUWSBDT0xVTU4uYFxuKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==