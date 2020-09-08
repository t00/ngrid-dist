(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@pebula/ngrid-material/selection-column'), require('@pebula/ngrid-material/paginator'), require('@pebula/ngrid-material/sort'), require('@pebula/ngrid-material/cell-tooltip'), require('@pebula/ngrid-material/context-menu')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid-material', ['exports', '@angular/core', '@angular/common', '@pebula/ngrid-material/selection-column', '@pebula/ngrid-material/paginator', '@pebula/ngrid-material/sort', '@pebula/ngrid-material/cell-tooltip', '@pebula/ngrid-material/context-menu'], factory) :
    (global = global || self, factory((global.pebula = global.pebula || {}, global.pebula['ngrid-material'] = {}), global.ng.core, global.ng.common, global.pebula['ngrid-material']['selection-column'], global.pebula['ngrid-material'].paginator, global.pebula['ngrid-material'].sort, global.pebula['ngrid-material']['cell-tooltip'], global.pebula['ngrid-material']['context-menu']));
}(this, (function (exports, core, common, selectionColumn, paginator, sort, cellTooltip, contextMenu) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ngrid-material.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PblNgridMaterialModule = /** @class */ (function () {
        function PblNgridMaterialModule() {
        }
        PblNgridMaterialModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            selectionColumn.PblNgridCheckboxModule,
                            paginator.PblNgridPaginatorModule,
                            sort.PblNgridMatSortModule,
                            cellTooltip.PblNgridCellTooltipModule,
                            contextMenu.PblNgridContextMenuModule,
                        ],
                        exports: [
                            selectionColumn.PblNgridCheckboxModule,
                            paginator.PblNgridPaginatorModule,
                            sort.PblNgridMatSortModule,
                            cellTooltip.PblNgridCellTooltipModule,
                            contextMenu.PblNgridContextMenuModule,
                        ]
                    },] }
        ];
        return PblNgridMaterialModule;
    }());

    exports.PblNgridMaterialModule = PblNgridMaterialModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-material.umd.js.map
