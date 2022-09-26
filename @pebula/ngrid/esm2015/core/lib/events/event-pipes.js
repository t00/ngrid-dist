import { filter, take } from 'rxjs/operators';
const eventFilterFactory = (kind) => (o) => o.pipe(filter(e => e.kind === kind));
const once = (pipe) => (o) => pipe(o).pipe(take(1));
export const ON_CONSTRUCTED = once(eventFilterFactory('onConstructed'));
export const ON_INIT = once(eventFilterFactory('onInit'));
export const ON_DESTROY = once(eventFilterFactory('onDestroy'));
export const ON_BEFORE_INVALIDATE_HEADERS = eventFilterFactory('beforeInvalidateHeaders');
export const ON_INVALIDATE_HEADERS = eventFilterFactory('onInvalidateHeaders');
export const ON_RESIZE_ROW = eventFilterFactory('onResizeRow');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtcGlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL2NvcmUvc3JjL2xpYi9ldmVudHMvZXZlbnQtcGlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUlyRCxNQUFNLGtCQUFrQixHQUFHLENBQW9DLElBQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUE2QixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFFLENBQXFDLENBQUM7QUFDekwsTUFBTSxJQUFJLEdBQUcsQ0FBSSxJQUFzRCxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQTZCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFckksTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUMxRCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDaEUsTUFBTSxDQUFDLE1BQU0sNEJBQTRCLEdBQUcsa0JBQWtCLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUMxRixNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQy9FLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UsIG1hcFRvIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZEV2ZW50c01hcCwgUGJsTmdyaWRFdmVudHMgfSBmcm9tICcuL25ncmlkLWV2ZW50cyc7XG5cbmNvbnN0IGV2ZW50RmlsdGVyRmFjdG9yeSA9IDxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRFdmVudHNNYXA+KGtpbmQ6IFQpID0+IChvOiBPYnNlcnZhYmxlPFBibE5ncmlkRXZlbnRzPikgPT4gby5waXBlKGZpbHRlciggZSA9PiBlLmtpbmQgPT09IGtpbmQgKSkgYXMgT2JzZXJ2YWJsZTxQYmxOZ3JpZEV2ZW50c01hcFtUXT47XG5jb25zdCBvbmNlID0gPFQ+KHBpcGU6IChvOiBPYnNlcnZhYmxlPFBibE5ncmlkRXZlbnRzPikgPT4gT2JzZXJ2YWJsZTxUPikgPT4gKG86IE9ic2VydmFibGU8UGJsTmdyaWRFdmVudHM+KSA9PiBwaXBlKG8pLnBpcGUodGFrZSgxKSk7XG5cbmV4cG9ydCBjb25zdCBPTl9DT05TVFJVQ1RFRCA9IG9uY2UoZXZlbnRGaWx0ZXJGYWN0b3J5KCdvbkNvbnN0cnVjdGVkJykpO1xuZXhwb3J0IGNvbnN0IE9OX0lOSVQgPSBvbmNlKGV2ZW50RmlsdGVyRmFjdG9yeSgnb25Jbml0JykpO1xuZXhwb3J0IGNvbnN0IE9OX0RFU1RST1kgPSBvbmNlKGV2ZW50RmlsdGVyRmFjdG9yeSgnb25EZXN0cm95JykpO1xuZXhwb3J0IGNvbnN0IE9OX0JFRk9SRV9JTlZBTElEQVRFX0hFQURFUlMgPSBldmVudEZpbHRlckZhY3RvcnkoJ2JlZm9yZUludmFsaWRhdGVIZWFkZXJzJyk7XG5leHBvcnQgY29uc3QgT05fSU5WQUxJREFURV9IRUFERVJTID0gZXZlbnRGaWx0ZXJGYWN0b3J5KCdvbkludmFsaWRhdGVIZWFkZXJzJyk7XG5leHBvcnQgY29uc3QgT05fUkVTSVpFX1JPVyA9IGV2ZW50RmlsdGVyRmFjdG9yeSgnb25SZXNpemVSb3cnKTtcbiJdfQ==