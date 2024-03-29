import { PblDropListRef } from '../core/drop-list-ref';
export class PblColumnDropListRef extends PblDropListRef {
    _sortPredicate(newIndex, drag, drop) {
        const siblings = this.data.getSortedItems().map(c => c._dragRef);
        const dragAtNewPosition = siblings[newIndex];
        if (dragAtNewPosition.data.column.wontBudge) {
            return false;
        }
        // we now need to find if between current and new position there are items with `wontBudge`
        const itemAtOriginalPosition = this.lastSwap ? this.lastSwap : drag;
        const currentIndex = siblings.findIndex(currentItem => currentItem === itemAtOriginalPosition);
        const start = Math.min(newIndex, currentIndex);
        const itemsDraggedOver = siblings.slice(start, Math.abs(newIndex - currentIndex) + start);
        for (const dragItem of itemsDraggedOver) {
            if (dragItem.data.column.wontBudge && dragItem !== drag) {
                return false;
            }
        }
        if (!drag.data.column.checkGroupLockConstraint(dragAtNewPosition.data.column)) {
            return false;
        }
        this.lastSwap = dragAtNewPosition;
        return true;
    }
    _sortItem(item, pointerX, pointerY, pointerDelta) {
        const lastSwap = this.lastSwap;
        this.sortPredicate = (index, drag) => this._sortPredicate(index, drag, this);
        super._sortItem(item, pointerX, pointerY, pointerDelta);
        if (this.lastSwap && this.lastSwap !== lastSwap && this.data.orientation === 'horizontal') {
            const siblings = this.data.getSortedItems().map(c => c._dragRef);
            siblings.forEach((sibling, index) => {
                // Don't do anything if the position hasn't changed.
                // if (oldOrder[index] === sibling) {
                //   return;
                // }
                const transform = sibling.getVisibleElement().style.transform;
                for (const c of sibling.data.getCells()) {
                    c.style.transform = transform;
                }
            });
        }
    }
}
export function patchDropListRef(dropListRef) {
    try {
        Object.setPrototypeOf(dropListRef, PblColumnDropListRef.prototype);
    }
    catch (err) {
        dropListRef._sortPredicate = PblColumnDropListRef.prototype._sortPredicate;
        dropListRef._sortItem = PblColumnDropListRef.prototype._sortItem;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWRyb3AtbGlzdC1yZWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL2RyYWcvc3JjL2xpYi9kcmFnLWFuZC1kcm9wL2NvbHVtbi9jb2x1bW4tZHJvcC1saXN0LXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFLdkQsTUFBTSxPQUFPLG9CQUE4QixTQUFRLGNBQXVEO0lBSXhHLGNBQWMsQ0FBQyxRQUFnQixFQUFFLElBQWdELEVBQUUsSUFBNkI7UUFDOUcsTUFBTSxRQUFRLEdBQWlELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBUSxDQUFDO1FBRXZILE1BQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDM0MsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELDJGQUEyRjtRQUMzRixNQUFNLHNCQUFzQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNwRSxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxLQUFLLHNCQUFzQixDQUFFLENBQUM7UUFDakcsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUE7UUFDOUMsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUMxRixLQUFLLE1BQU0sUUFBUSxJQUFJLGdCQUFnQixFQUFFO1lBQ3ZDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7Z0JBQ3ZELE9BQU8sS0FBSyxDQUFDO2FBQ2Q7U0FDRjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDN0UsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsU0FBUyxDQUFDLElBQWdCLEVBQUUsUUFBZ0IsRUFBRSxRQUFnQixFQUFFLFlBQW9DO1FBQ2xHLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLElBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRixLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXhELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxZQUFZLEVBQUU7WUFDekYsTUFBTSxRQUFRLEdBQWlELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBUSxDQUFDO1lBQ3ZILFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2xDLG9EQUFvRDtnQkFDcEQscUNBQXFDO2dCQUNyQyxZQUFZO2dCQUNaLElBQUk7Z0JBQ0osTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQTtnQkFDN0QsS0FBSyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUN2QyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7aUJBQy9CO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Q0FDRjtBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBVSxXQUFvRTtJQUM1RyxJQUFJO1FBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDcEU7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNYLFdBQW1CLENBQUMsY0FBYyxHQUFHLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7UUFDcEYsV0FBVyxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0tBQ2xFO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibERyb3BMaXN0UmVmIH0gZnJvbSAnLi4vY29yZS9kcm9wLWxpc3QtcmVmJztcbmltcG9ydCB7IFBibERyYWdSZWYgfSBmcm9tICcuLi9jb3JlL2RyYWctcmVmJztcbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLXJlb3JkZXItcGx1Z2luJztcbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLWRyYWcnO1xuXG5leHBvcnQgY2xhc3MgUGJsQ29sdW1uRHJvcExpc3RSZWY8VCA9IGFueT4gZXh0ZW5kcyBQYmxEcm9wTGlzdFJlZjxQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4+IHtcblxuICBwcml2YXRlIGxhc3RTd2FwOiBQYmxEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj47XG5cbiAgX3NvcnRQcmVkaWNhdGUobmV3SW5kZXg6IG51bWJlciwgZHJhZzogUGJsRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+LCBkcm9wOiBQYmxDb2x1bW5Ecm9wTGlzdFJlZjxUPikge1xuICAgIGNvbnN0IHNpYmxpbmdzOiBQYmxEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj5bXSA9IHRoaXMuZGF0YS5nZXRTb3J0ZWRJdGVtcygpLm1hcCggYyA9PiBjLl9kcmFnUmVmKSBhcyBhbnk7XG5cbiAgICBjb25zdCBkcmFnQXROZXdQb3NpdGlvbiA9IHNpYmxpbmdzW25ld0luZGV4XTtcbiAgICBpZiAoZHJhZ0F0TmV3UG9zaXRpb24uZGF0YS5jb2x1bW4ud29udEJ1ZGdlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gd2Ugbm93IG5lZWQgdG8gZmluZCBpZiBiZXR3ZWVuIGN1cnJlbnQgYW5kIG5ldyBwb3NpdGlvbiB0aGVyZSBhcmUgaXRlbXMgd2l0aCBgd29udEJ1ZGdlYFxuICAgIGNvbnN0IGl0ZW1BdE9yaWdpbmFsUG9zaXRpb24gPSB0aGlzLmxhc3RTd2FwID8gdGhpcy5sYXN0U3dhcCA6IGRyYWc7XG4gICAgY29uc3QgY3VycmVudEluZGV4ID0gc2libGluZ3MuZmluZEluZGV4KCBjdXJyZW50SXRlbSA9PiBjdXJyZW50SXRlbSA9PT0gaXRlbUF0T3JpZ2luYWxQb3NpdGlvbiApO1xuICAgIGNvbnN0IHN0YXJ0ID0gTWF0aC5taW4obmV3SW5kZXgsIGN1cnJlbnRJbmRleClcbiAgICBjb25zdCBpdGVtc0RyYWdnZWRPdmVyID0gc2libGluZ3Muc2xpY2Uoc3RhcnQsIE1hdGguYWJzKG5ld0luZGV4IC0gY3VycmVudEluZGV4KSArIHN0YXJ0KTtcbiAgICBmb3IgKGNvbnN0IGRyYWdJdGVtIG9mIGl0ZW1zRHJhZ2dlZE92ZXIpIHtcbiAgICAgIGlmIChkcmFnSXRlbS5kYXRhLmNvbHVtbi53b250QnVkZ2UgJiYgZHJhZ0l0ZW0gIT09IGRyYWcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZHJhZy5kYXRhLmNvbHVtbi5jaGVja0dyb3VwTG9ja0NvbnN0cmFpbnQoZHJhZ0F0TmV3UG9zaXRpb24uZGF0YS5jb2x1bW4pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5sYXN0U3dhcCA9IGRyYWdBdE5ld1Bvc2l0aW9uO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgX3NvcnRJdGVtKGl0ZW06IFBibERyYWdSZWYsIHBvaW50ZXJYOiBudW1iZXIsIHBvaW50ZXJZOiBudW1iZXIsIHBvaW50ZXJEZWx0YToge3g6IG51bWJlciwgeTogbnVtYmVyfSkge1xuICAgIGNvbnN0IGxhc3RTd2FwID0gdGhpcy5sYXN0U3dhcDtcbiAgICB0aGlzLnNvcnRQcmVkaWNhdGUgPSAoaW5kZXgsIGRyYWcpID0+IHRoaXMuX3NvcnRQcmVkaWNhdGUoaW5kZXgsIGRyYWcgYXMgYW55LCB0aGlzKTtcbiAgICBzdXBlci5fc29ydEl0ZW0oaXRlbSwgcG9pbnRlclgsIHBvaW50ZXJZLCBwb2ludGVyRGVsdGEpO1xuXG4gICAgaWYgKHRoaXMubGFzdFN3YXAgJiYgdGhpcy5sYXN0U3dhcCAhPT0gbGFzdFN3YXAgJiYgdGhpcy5kYXRhLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGNvbnN0IHNpYmxpbmdzOiBQYmxEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj5bXSA9IHRoaXMuZGF0YS5nZXRTb3J0ZWRJdGVtcygpLm1hcCggYyA9PiBjLl9kcmFnUmVmKSBhcyBhbnk7XG4gICAgICBzaWJsaW5ncy5mb3JFYWNoKChzaWJsaW5nLCBpbmRleCkgPT4ge1xuICAgICAgICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiB0aGUgcG9zaXRpb24gaGFzbid0IGNoYW5nZWQuXG4gICAgICAgIC8vIGlmIChvbGRPcmRlcltpbmRleF0gPT09IHNpYmxpbmcpIHtcbiAgICAgICAgLy8gICByZXR1cm47XG4gICAgICAgIC8vIH1cbiAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gc2libGluZy5nZXRWaXNpYmxlRWxlbWVudCgpLnN0eWxlLnRyYW5zZm9ybVxuICAgICAgICBmb3IgKGNvbnN0IGMgb2Ygc2libGluZy5kYXRhLmdldENlbGxzKCkpIHtcbiAgICAgICAgICBjLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRjaERyb3BMaXN0UmVmPFQgPSBhbnk+KGRyb3BMaXN0UmVmOiBQYmxEcm9wTGlzdFJlZjxQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4+KSB7XG4gIHRyeSB7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGRyb3BMaXN0UmVmLCBQYmxDb2x1bW5Ecm9wTGlzdFJlZi5wcm90b3R5cGUpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICAoZHJvcExpc3RSZWYgYXMgYW55KS5fc29ydFByZWRpY2F0ZSA9IFBibENvbHVtbkRyb3BMaXN0UmVmLnByb3RvdHlwZS5fc29ydFByZWRpY2F0ZTtcbiAgICBkcm9wTGlzdFJlZi5fc29ydEl0ZW0gPSBQYmxDb2x1bW5Ecm9wTGlzdFJlZi5wcm90b3R5cGUuX3NvcnRJdGVtO1xuICB9XG59XG4iXX0=