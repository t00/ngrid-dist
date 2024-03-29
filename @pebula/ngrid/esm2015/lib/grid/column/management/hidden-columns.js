import { PblColumn } from '../model';
export class HiddenColumns {
    constructor() {
        this.hidden = new Set();
        this.allHidden = new Set();
        this.indirect = new Map();
        this.clear(false);
    }
    add(columns, indirect) {
        let collection;
        if (indirect) {
            collection = this.indirect.get(indirect);
            if (!collection) {
                this.indirect.set(indirect, collection = new Set());
            }
        }
        else {
            collection = this.hidden;
        }
        const size = collection.size;
        if (columns[0] instanceof PblColumn) {
            for (const c of columns) {
                collection.add(c.id);
            }
        }
        else {
            for (const c of columns) {
                collection.add(c);
            }
        }
        return collection.size !== size;
    }
    /**
     * Show the column.
     */
    remove(columns, indirect) {
        let collection;
        if (indirect) {
            collection = this.indirect.get(indirect);
            if (!collection) {
                this.indirect.set(indirect, collection = new Set());
            }
        }
        else {
            collection = this.hidden;
        }
        const size = collection.size;
        if (columns[0] instanceof PblColumn) {
            for (const c of columns) {
                collection.delete(c.id);
            }
        }
        else {
            for (const c of columns) {
                collection.delete(c);
            }
        }
        return collection.size !== size;
    }
    clear(onlyHidden) {
        this.hidden.clear();
        if (!onlyHidden) {
            this.indirect.clear();
            this.allHidden.clear();
        }
        else {
            this.syncAllHidden();
        }
    }
    syncAllHidden() {
        this.allHidden.clear();
        for (const id of this.hidden) {
            this.allHidden.add(id);
        }
        for (const indirect of this.indirect.values()) {
            for (const id of indirect) {
                this.allHidden.add(id);
            }
        }
        return this;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZGVuLWNvbHVtbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL3NyYy9saWIvZ3JpZC9jb2x1bW4vbWFuYWdlbWVudC9oaWRkZW4tY29sdW1ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXJDLE1BQU0sT0FBTyxhQUFhO0lBS3hCO1FBSlMsV0FBTSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7UUFDM0IsY0FBUyxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7UUFDdEIsYUFBUSxHQUFHLElBQUksR0FBRyxFQUF1QixDQUFDO1FBR3pELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELEdBQUcsQ0FBQyxPQUErQixFQUFFLFFBQWlCO1FBQ3BELElBQUksVUFBdUIsQ0FBQztRQUM1QixJQUFJLFFBQVEsRUFBRTtZQUNaLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQyxDQUFDO2FBQzdEO1NBQ0Y7YUFBTTtZQUNMLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQzFCO1FBQ0QsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM3QixJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsWUFBWSxTQUFTLEVBQUU7WUFDbkMsS0FBSSxNQUFNLENBQUMsSUFBSSxPQUFzQixFQUFFO2dCQUNyQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN0QjtTQUNGO2FBQU07WUFDTCxLQUFJLE1BQU0sQ0FBQyxJQUFJLE9BQW1CLEVBQUU7Z0JBQ2xDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbkI7U0FDRjtRQUNELE9BQU8sVUFBVSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLE9BQStCLEVBQUUsUUFBaUI7UUFDdkQsSUFBSSxVQUF1QixDQUFDO1FBQzVCLElBQUksUUFBUSxFQUFFO1lBQ1osVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDLENBQUM7YUFDN0Q7U0FDRjthQUFNO1lBQ0wsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDMUI7UUFDRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQzdCLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxZQUFZLFNBQVMsRUFBRTtZQUNuQyxLQUFJLE1BQU0sQ0FBQyxJQUFJLE9BQXNCLEVBQUU7Z0JBQ3JDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3pCO1NBQ0Y7YUFBTTtZQUNMLEtBQUksTUFBTSxDQUFDLElBQUksT0FBbUIsRUFBRTtnQkFDbEMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0QjtTQUNGO1FBQ0QsT0FBTyxVQUFVLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztJQUNsQyxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQW1CO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN4QjthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZCLEtBQUssTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN4QjtRQUNELEtBQUssTUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUM3QyxLQUFLLE1BQU0sRUFBRSxJQUFJLFFBQVEsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDeEI7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vbW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgSGlkZGVuQ29sdW1ucyB7XG4gIHJlYWRvbmx5IGhpZGRlbiA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICByZWFkb25seSBhbGxIaWRkZW4gPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBpbmRpcmVjdCA9IG5ldyBNYXA8c3RyaW5nLCBTZXQ8c3RyaW5nPj4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNsZWFyKGZhbHNlKTtcbiAgfVxuXG4gIGFkZChjb2x1bW5zOiBQYmxDb2x1bW5bXSB8IHN0cmluZ1tdLCBpbmRpcmVjdD86IHN0cmluZykge1xuICAgIGxldCBjb2xsZWN0aW9uOiBTZXQ8c3RyaW5nPjtcbiAgICBpZiAoaW5kaXJlY3QpIHtcbiAgICAgIGNvbGxlY3Rpb24gPSB0aGlzLmluZGlyZWN0LmdldChpbmRpcmVjdCk7XG4gICAgICBpZiAoIWNvbGxlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5pbmRpcmVjdC5zZXQoaW5kaXJlY3QsIGNvbGxlY3Rpb24gPSBuZXcgU2V0PHN0cmluZz4oKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbGxlY3Rpb24gPSB0aGlzLmhpZGRlbjtcbiAgICB9XG4gICAgY29uc3Qgc2l6ZSA9IGNvbGxlY3Rpb24uc2l6ZTtcbiAgICBpZiAoY29sdW1uc1swXSBpbnN0YW5jZW9mIFBibENvbHVtbikge1xuICAgICAgZm9yKGNvbnN0IGMgb2YgY29sdW1ucyBhcyBQYmxDb2x1bW5bXSkge1xuICAgICAgICBjb2xsZWN0aW9uLmFkZChjLmlkKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yKGNvbnN0IGMgb2YgY29sdW1ucyBhcyBzdHJpbmdbXSkge1xuICAgICAgICBjb2xsZWN0aW9uLmFkZChjKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uc2l6ZSAhPT0gc2l6ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IHRoZSBjb2x1bW4uXG4gICAqL1xuICByZW1vdmUoY29sdW1uczogUGJsQ29sdW1uW10gfCBzdHJpbmdbXSwgaW5kaXJlY3Q/OiBzdHJpbmcpIHtcbiAgICBsZXQgY29sbGVjdGlvbjogU2V0PHN0cmluZz47XG4gICAgaWYgKGluZGlyZWN0KSB7XG4gICAgICBjb2xsZWN0aW9uID0gdGhpcy5pbmRpcmVjdC5nZXQoaW5kaXJlY3QpO1xuICAgICAgaWYgKCFjb2xsZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuaW5kaXJlY3Quc2V0KGluZGlyZWN0LCBjb2xsZWN0aW9uID0gbmV3IFNldDxzdHJpbmc+KCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb2xsZWN0aW9uID0gdGhpcy5oaWRkZW47XG4gICAgfVxuICAgIGNvbnN0IHNpemUgPSBjb2xsZWN0aW9uLnNpemU7XG4gICAgaWYgKGNvbHVtbnNbMF0gaW5zdGFuY2VvZiBQYmxDb2x1bW4pIHtcbiAgICAgIGZvcihjb25zdCBjIG9mIGNvbHVtbnMgYXMgUGJsQ29sdW1uW10pIHtcbiAgICAgICAgY29sbGVjdGlvbi5kZWxldGUoYy5pZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcihjb25zdCBjIG9mIGNvbHVtbnMgYXMgc3RyaW5nW10pIHtcbiAgICAgICAgY29sbGVjdGlvbi5kZWxldGUoYyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0aW9uLnNpemUgIT09IHNpemU7XG4gIH1cblxuICBjbGVhcihvbmx5SGlkZGVuOiBib29sZWFuKSB7XG4gICAgdGhpcy5oaWRkZW4uY2xlYXIoKTtcbiAgICBpZiAoIW9ubHlIaWRkZW4pIHtcbiAgICAgIHRoaXMuaW5kaXJlY3QuY2xlYXIoKTtcbiAgICAgIHRoaXMuYWxsSGlkZGVuLmNsZWFyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3luY0FsbEhpZGRlbigpO1xuICAgIH1cbiAgfVxuXG4gIHN5bmNBbGxIaWRkZW4oKSB7XG4gICAgdGhpcy5hbGxIaWRkZW4uY2xlYXIoKTtcbiAgICBmb3IgKGNvbnN0IGlkIG9mIHRoaXMuaGlkZGVuKSB7XG4gICAgICB0aGlzLmFsbEhpZGRlbi5hZGQoaWQpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGluZGlyZWN0IG9mIHRoaXMuaW5kaXJlY3QudmFsdWVzKCkpIHtcbiAgICAgIGZvciAoY29uc3QgaWQgb2YgaW5kaXJlY3QpIHtcbiAgICAgICAgdGhpcy5hbGxIaWRkZW4uYWRkKGlkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiJdfQ==