import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PblNgridModule, ngridPlugin } from '@pebula/ngrid';
import { PblNgridBsSelectionPlugin, PLUGIN_KEY } from './bs-selection-plugin.directive';
import { PblNgridBsSelectionComponent } from './bs-selection.component';
import * as i0 from "@angular/core";
export class PblNgridBsSelectionModule {
}
PblNgridBsSelectionModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridBsSelectionPlugin);
/** @nocollapse */ PblNgridBsSelectionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSelectionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridBsSelectionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSelectionModule, declarations: [PblNgridBsSelectionPlugin, PblNgridBsSelectionComponent], imports: [CommonModule, MatCheckboxModule, PblNgridModule], exports: [PblNgridBsSelectionPlugin, PblNgridBsSelectionComponent] });
/** @nocollapse */ PblNgridBsSelectionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSelectionModule, imports: [[CommonModule, MatCheckboxModule, PblNgridModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSelectionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatCheckboxModule, PblNgridModule],
                    declarations: [PblNgridBsSelectionPlugin, PblNgridBsSelectionComponent],
                    exports: [PblNgridBsSelectionPlugin, PblNgridBsSelectionComponent],
                    // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                    entryComponents: [PblNgridBsSelectionComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtc2VsZWN0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQtYm9vdHN0cmFwL3NlbGVjdGlvbi1jb2x1bW4vc3JjL2xpYi9icy1zZWxlY3Rpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxVQUFVLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7QUFTeEUsTUFBTSxPQUFPLHlCQUF5Qjs7QUFDcEIsc0NBQVksR0FBRyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUseUJBQXlCLENBQUMsQ0FBQzt5SUFEL0UseUJBQXlCOzBJQUF6Qix5QkFBeUIsaUJBTHBCLHlCQUF5QixFQUFFLDRCQUE0QixhQUQ1RCxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxhQUUvQyx5QkFBeUIsRUFBRSw0QkFBNEI7MElBSXZELHlCQUF5QixZQU4zQixDQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxjQUFjLENBQUU7MkZBTWpELHlCQUF5QjtrQkFQckMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxDQUFFO29CQUM1RCxZQUFZLEVBQUUsQ0FBRSx5QkFBeUIsRUFBRSw0QkFBNEIsQ0FBRTtvQkFDekUsT0FBTyxFQUFFLENBQUUseUJBQXlCLEVBQUUsNEJBQTRCLENBQUU7b0JBQ3BFLDJGQUEyRjtvQkFDM0YsZUFBZSxFQUFFLENBQUUsNEJBQTRCLENBQUU7aUJBQ2xEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRDaGVja2JveE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94JztcblxuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUsIG5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZEJzU2VsZWN0aW9uUGx1Z2luLCBQTFVHSU5fS0VZIH0gZnJvbSAnLi9icy1zZWxlY3Rpb24tcGx1Z2luLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZEJzU2VsZWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9icy1zZWxlY3Rpb24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIE1hdENoZWNrYm94TW9kdWxlLCBQYmxOZ3JpZE1vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6IFsgUGJsTmdyaWRCc1NlbGVjdGlvblBsdWdpbiwgUGJsTmdyaWRCc1NlbGVjdGlvbkNvbXBvbmVudCBdLFxuICBleHBvcnRzOiBbIFBibE5ncmlkQnNTZWxlY3Rpb25QbHVnaW4sIFBibE5ncmlkQnNTZWxlY3Rpb25Db21wb25lbnQgXSxcbiAgLy8gVE9ETyhSRUZBQ1RPUl9SRUYgMik6IHJlbW92ZSB3aGVuIFZpZXdFbmdpbmUgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCBieSBhbmd1bGFyIChWMTIgPz8/KVxuICBlbnRyeUNvbXBvbmVudHM6IFsgUGJsTmdyaWRCc1NlbGVjdGlvbkNvbXBvbmVudCBdXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQnNTZWxlY3Rpb25Nb2R1bGUge1xuICBzdGF0aWMgcmVhZG9ubHkgTkdSSURfUExVR0lOID0gbmdyaWRQbHVnaW4oeyBpZDogUExVR0lOX0tFWSB9LCBQYmxOZ3JpZEJzU2VsZWN0aW9uUGx1Z2luKTtcbn1cbiJdfQ==