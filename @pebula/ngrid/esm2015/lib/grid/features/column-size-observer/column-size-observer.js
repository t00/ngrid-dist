import { ColumnSizeInfo } from '../../column/model/column-size-info';
import { PblNgridColumnSizeObserverGroup } from './column-size-observer-group';
/**
 * A wrapper around `ColumnSizeInfo` that listen to size changes from the element of a cell, using the `ResizeObserver` API.
 * When a resize event is triggered it will call `updateSize()` which in turn update the layout and notify the column about the resize event.
 *
 * In other words, all cell element of the grid, attached to a column, which are wrapped with this observer will trigger resize events.
 *
 * Because most of the size changes concern all columns of a row and because ResizeObserver will emit them all in the same event
 * an entire row should emit once, with all columns.
 *
 * > This class can be extended by a Directive class to be used by declarative markup in angular templates.
 */
export class PblColumnSizeObserver extends ColumnSizeInfo {
    constructor(element, extApi) {
        super(element);
        this.controller = PblNgridColumnSizeObserverGroup.get(extApi);
    }
    attachColumn(column) {
        super.attachColumn(column);
        if (!column) {
            this.controller.remove(this);
        }
        else if (!this.controller.has(this)) {
            this.updateSize();
            this.controller.add(this);
        }
    }
    destroy() {
        this.controller.remove(this);
        this.detachColumn();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNpemUtb2JzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL3NyYy9saWIvZ3JpZC9mZWF0dXJlcy9jb2x1bW4tc2l6ZS1vYnNlcnZlci9jb2x1bW4tc2l6ZS1vYnNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFckUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFL0U7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxjQUFjO0lBR3ZELFlBQVksT0FBb0IsRUFBRSxNQUFvQztRQUNwRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLCtCQUErQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRVMsWUFBWSxDQUFDLE1BQWlCO1FBQ3RDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibE5ncmlkSW50ZXJuYWxFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi8uLi9leHQvZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7IENvbHVtblNpemVJbmZvIH0gZnJvbSAnLi4vLi4vY29sdW1uL21vZGVsL2NvbHVtbi1zaXplLWluZm8nO1xuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vLi4vY29sdW1uL21vZGVsL2NvbHVtbic7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbHVtblNpemVPYnNlcnZlckdyb3VwIH0gZnJvbSAnLi9jb2x1bW4tc2l6ZS1vYnNlcnZlci1ncm91cCc7XG5cbi8qKlxuICogQSB3cmFwcGVyIGFyb3VuZCBgQ29sdW1uU2l6ZUluZm9gIHRoYXQgbGlzdGVuIHRvIHNpemUgY2hhbmdlcyBmcm9tIHRoZSBlbGVtZW50IG9mIGEgY2VsbCwgdXNpbmcgdGhlIGBSZXNpemVPYnNlcnZlcmAgQVBJLlxuICogV2hlbiBhIHJlc2l6ZSBldmVudCBpcyB0cmlnZ2VyZWQgaXQgd2lsbCBjYWxsIGB1cGRhdGVTaXplKClgIHdoaWNoIGluIHR1cm4gdXBkYXRlIHRoZSBsYXlvdXQgYW5kIG5vdGlmeSB0aGUgY29sdW1uIGFib3V0IHRoZSByZXNpemUgZXZlbnQuXG4gKlxuICogSW4gb3RoZXIgd29yZHMsIGFsbCBjZWxsIGVsZW1lbnQgb2YgdGhlIGdyaWQsIGF0dGFjaGVkIHRvIGEgY29sdW1uLCB3aGljaCBhcmUgd3JhcHBlZCB3aXRoIHRoaXMgb2JzZXJ2ZXIgd2lsbCB0cmlnZ2VyIHJlc2l6ZSBldmVudHMuXG4gKlxuICogQmVjYXVzZSBtb3N0IG9mIHRoZSBzaXplIGNoYW5nZXMgY29uY2VybiBhbGwgY29sdW1ucyBvZiBhIHJvdyBhbmQgYmVjYXVzZSBSZXNpemVPYnNlcnZlciB3aWxsIGVtaXQgdGhlbSBhbGwgaW4gdGhlIHNhbWUgZXZlbnRcbiAqIGFuIGVudGlyZSByb3cgc2hvdWxkIGVtaXQgb25jZSwgd2l0aCBhbGwgY29sdW1ucy5cbiAqXG4gKiA+IFRoaXMgY2xhc3MgY2FuIGJlIGV4dGVuZGVkIGJ5IGEgRGlyZWN0aXZlIGNsYXNzIHRvIGJlIHVzZWQgYnkgZGVjbGFyYXRpdmUgbWFya3VwIGluIGFuZ3VsYXIgdGVtcGxhdGVzLlxuICovXG5leHBvcnQgY2xhc3MgUGJsQ29sdW1uU2l6ZU9ic2VydmVyIGV4dGVuZHMgQ29sdW1uU2l6ZUluZm8ge1xuICBwcml2YXRlIGNvbnRyb2xsZXI6IFBibE5ncmlkQ29sdW1uU2l6ZU9ic2VydmVyR3JvdXA7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV4dEFwaTogUGJsTmdyaWRJbnRlcm5hbEV4dGVuc2lvbkFwaSkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMuY29udHJvbGxlciA9IFBibE5ncmlkQ29sdW1uU2l6ZU9ic2VydmVyR3JvdXAuZ2V0KGV4dEFwaSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXR0YWNoQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uKTogdm9pZCB7XG4gICAgc3VwZXIuYXR0YWNoQ29sdW1uKGNvbHVtbik7XG4gICAgaWYgKCFjb2x1bW4pIHtcbiAgICAgIHRoaXMuY29udHJvbGxlci5yZW1vdmUodGhpcyk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5jb250cm9sbGVyLmhhcyh0aGlzKSkge1xuICAgICAgdGhpcy51cGRhdGVTaXplKCk7XG4gICAgICB0aGlzLmNvbnRyb2xsZXIuYWRkKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5jb250cm9sbGVyLnJlbW92ZSh0aGlzKTtcbiAgICB0aGlzLmRldGFjaENvbHVtbigpO1xuICB9XG59XG4iXX0=