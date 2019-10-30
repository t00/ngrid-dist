import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PblNgridCheckboxModule } from '@pebula/ngrid-material/selection-column';
import { PblNgridPaginatorModule } from '@pebula/ngrid-material/paginator';
import { PblNgridMatSortModule } from '@pebula/ngrid-material/sort';
import { PblNgridCellTooltipModule } from '@pebula/ngrid-material/cell-tooltip';
import { PblNgridContextMenuModule } from '@pebula/ngrid-material/context-menu';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PblNgridMaterialModule = /** @class */ (function () {
    function PblNgridMaterialModule() {
    }
    PblNgridMaterialModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        PblNgridCheckboxModule,
                        PblNgridPaginatorModule,
                        PblNgridMatSortModule,
                        PblNgridCellTooltipModule,
                        PblNgridContextMenuModule,
                    ],
                    exports: [
                        PblNgridCheckboxModule,
                        PblNgridPaginatorModule,
                        PblNgridMatSortModule,
                        PblNgridCellTooltipModule,
                        PblNgridContextMenuModule,
                    ]
                },] }
    ];
    return PblNgridMaterialModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PblNgridMaterialModule };
//# sourceMappingURL=pebula-ngrid-material.js.map
