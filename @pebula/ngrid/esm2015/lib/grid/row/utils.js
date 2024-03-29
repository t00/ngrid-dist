export function initColumnOrMetaRow(element, isFooter) {
    element.classList.add(...(isFooter ? ['cdk-footer-row', 'pbl-ngrid-footer-row'] : ['cdk-header-row', 'pbl-ngrid-header-row']));
}
export function setRowVisibility(element, visible) {
    if (visible) {
        element.classList.remove('pbl-ngrid-row-hidden');
    }
    else {
        element.classList.add('pbl-ngrid-row-hidden');
    }
}
export function applyMetaRowClass(metaRowsService, metaRows, element, oldMetaRow, newMetaRow) {
    if (oldMetaRow) {
        if (oldMetaRow.rowClassName) {
            element.classList.remove(oldMetaRow.rowClassName);
        }
        metaRowsService.removeMetaRow(metaRows);
    }
    metaRows.meta = newMetaRow;
    if (newMetaRow) {
        if (newMetaRow.rowClassName) {
            element.classList.add(newMetaRow.rowClassName);
        }
        metaRowsService.addMetaRow(metaRows);
    }
}
const FIRST_LAST_ROW_SELECTORS = {
    header: {
        selector: 'pbl-ngrid-header-row',
        first: 'pbl-ngrid-first-header-row',
        last: 'pbl-ngrid-last-header-row',
    },
    footer: {
        selector: 'pbl-ngrid-footer-row',
        first: 'pbl-ngrid-first-footer-row',
        last: 'pbl-ngrid-last-footer-row',
    }
};
export function updateMetaRowFirstLastClass(section, root, prev) {
    var _a, _b;
    const sectionCss = FIRST_LAST_ROW_SELECTORS[section];
    const rows = root.querySelectorAll(`.${sectionCss.selector}:not(.pbl-ngrid-row-visually-hidden):not(.pbl-ngrid-row-hidden)`);
    const first = rows[0];
    if (prev.first !== first) {
        (_a = prev.first) === null || _a === void 0 ? void 0 : _a.classList.remove(sectionCss.first);
        first === null || first === void 0 ? void 0 : first.classList.add(sectionCss.first);
    }
    const last = rows[rows.length - 1];
    if (prev.last !== last) {
        (_b = prev.last) === null || _b === void 0 ? void 0 : _b.classList.remove(sectionCss.last);
        last === null || last === void 0 ? void 0 : last.classList.add(sectionCss.last);
    }
    return { first, last };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL3NyYy9saWIvZ3JpZC9yb3cvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxVQUFVLG1CQUFtQixDQUFDLE9BQW9CLEVBQUUsUUFBaUI7SUFDekUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pJLENBQUM7QUFFRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsT0FBb0IsRUFBRSxPQUFnQjtJQUNyRSxJQUFJLE9BQU8sRUFBRTtRQUNYLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7S0FDbEQ7U0FBTTtRQUNMLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7S0FDL0M7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLGVBQXVDLEVBQ3ZDLFFBQW9CLEVBQ3BCLE9BQW9CLEVBQ3BCLFVBQWlDLEVBQ2pDLFVBQWlDO0lBQ2pFLElBQUksVUFBVSxFQUFFO1FBQ2QsSUFBSSxVQUFVLENBQUMsWUFBWSxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNuRDtRQUNELGVBQWUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDekM7SUFDRCxRQUFRLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztJQUMzQixJQUFJLFVBQVUsRUFBRTtRQUNkLElBQUksVUFBVSxDQUFDLFlBQVksRUFBRTtZQUMzQixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDaEQ7UUFDRCxlQUFlLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3RDO0FBQ0gsQ0FBQztBQUVELE1BQU0sd0JBQXdCLEdBQUc7SUFDL0IsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxLQUFLLEVBQUUsNEJBQTRCO1FBQ25DLElBQUksRUFBRSwyQkFBMkI7S0FDbEM7SUFDRCxNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLEtBQUssRUFBRSw0QkFBNEI7UUFDbkMsSUFBSSxFQUFFLDJCQUEyQjtLQUNsQztDQUNGLENBQUM7QUFFRixNQUFNLFVBQVUsMkJBQTJCLENBQUMsT0FBOEMsRUFDOUMsSUFBYSxFQUNiLElBQXlDOztJQUNuRixNQUFNLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxVQUFVLENBQUMsUUFBUSxpRUFBaUUsQ0FBQyxDQUFDO0lBRTdILE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO1FBQ3hCLE1BQUEsSUFBSSxDQUFDLEtBQUssMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0MsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hDO0lBQ0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtRQUN0QixNQUFBLElBQUksQ0FBQyxJQUFJLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0QztJQUNELE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibE1ldGFSb3dEZWZpbml0aW9ucyB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvY29yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlLCBQYmxNZXRhUm93IH0gZnJvbSAnLi4vbWV0YS1yb3dzL21ldGEtcm93LnNlcnZpY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdENvbHVtbk9yTWV0YVJvdyhlbGVtZW50OiBIVE1MRWxlbWVudCwgaXNGb290ZXI6IGJvb2xlYW4pIHtcbiAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLihpc0Zvb3RlciA/IFsnY2RrLWZvb3Rlci1yb3cnLCAncGJsLW5ncmlkLWZvb3Rlci1yb3cnXSA6IFsnY2RrLWhlYWRlci1yb3cnLCAncGJsLW5ncmlkLWhlYWRlci1yb3cnXSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0Um93VmlzaWJpbGl0eShlbGVtZW50OiBIVE1MRWxlbWVudCwgdmlzaWJsZTogYm9vbGVhbikge1xuICBpZiAodmlzaWJsZSkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLXJvdy1oaWRkZW4nKTtcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1yb3ctaGlkZGVuJyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TWV0YVJvd0NsYXNzKG1ldGFSb3dzU2VydmljZTogUGJsTmdyaWRNZXRhUm93U2VydmljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhUm93czogUGJsTWV0YVJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRNZXRhUm93OiBQYmxNZXRhUm93RGVmaW5pdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3TWV0YVJvdzogUGJsTWV0YVJvd0RlZmluaXRpb25zKSB7XG4gIGlmIChvbGRNZXRhUm93KSB7XG4gICAgaWYgKG9sZE1ldGFSb3cucm93Q2xhc3NOYW1lKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUob2xkTWV0YVJvdy5yb3dDbGFzc05hbWUpO1xuICAgIH1cbiAgICBtZXRhUm93c1NlcnZpY2UucmVtb3ZlTWV0YVJvdyhtZXRhUm93cyk7XG4gIH1cbiAgbWV0YVJvd3MubWV0YSA9IG5ld01ldGFSb3c7XG4gIGlmIChuZXdNZXRhUm93KSB7XG4gICAgaWYgKG5ld01ldGFSb3cucm93Q2xhc3NOYW1lKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQobmV3TWV0YVJvdy5yb3dDbGFzc05hbWUpO1xuICAgIH1cbiAgICBtZXRhUm93c1NlcnZpY2UuYWRkTWV0YVJvdyhtZXRhUm93cyk7XG4gIH1cbn1cblxuY29uc3QgRklSU1RfTEFTVF9ST1dfU0VMRUNUT1JTID0ge1xuICBoZWFkZXI6IHtcbiAgICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1oZWFkZXItcm93JyxcbiAgICBmaXJzdDogJ3BibC1uZ3JpZC1maXJzdC1oZWFkZXItcm93JyxcbiAgICBsYXN0OiAncGJsLW5ncmlkLWxhc3QtaGVhZGVyLXJvdycsXG4gIH0sXG4gIGZvb3Rlcjoge1xuICAgIHNlbGVjdG9yOiAncGJsLW5ncmlkLWZvb3Rlci1yb3cnLFxuICAgIGZpcnN0OiAncGJsLW5ncmlkLWZpcnN0LWZvb3Rlci1yb3cnLFxuICAgIGxhc3Q6ICdwYmwtbmdyaWQtbGFzdC1mb290ZXItcm93JyxcbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU1ldGFSb3dGaXJzdExhc3RDbGFzcyhzZWN0aW9uOiBrZXlvZiB0eXBlb2YgRklSU1RfTEFTVF9ST1dfU0VMRUNUT1JTLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb290OiBFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2OiB7IGZpcnN0PzogRWxlbWVudDsgbGFzdD86IEVsZW1lbnQgfSk6IHsgZmlyc3Q/OiBFbGVtZW50OyBsYXN0PzogRWxlbWVudCB9IHtcbiAgY29uc3Qgc2VjdGlvbkNzcyA9IEZJUlNUX0xBU1RfUk9XX1NFTEVDVE9SU1tzZWN0aW9uXTtcbiAgY29uc3Qgcm93cyA9IHJvb3QucXVlcnlTZWxlY3RvckFsbChgLiR7c2VjdGlvbkNzcy5zZWxlY3Rvcn06bm90KC5wYmwtbmdyaWQtcm93LXZpc3VhbGx5LWhpZGRlbik6bm90KC5wYmwtbmdyaWQtcm93LWhpZGRlbilgKTtcblxuICBjb25zdCBmaXJzdCA9IHJvd3NbMF07XG4gIGlmIChwcmV2LmZpcnN0ICE9PSBmaXJzdCkge1xuICAgIHByZXYuZmlyc3Q/LmNsYXNzTGlzdC5yZW1vdmUoc2VjdGlvbkNzcy5maXJzdCk7XG4gICAgZmlyc3Q/LmNsYXNzTGlzdC5hZGQoc2VjdGlvbkNzcy5maXJzdCk7XG4gIH1cbiAgY29uc3QgbGFzdCA9IHJvd3Nbcm93cy5sZW5ndGggLSAxXTtcbiAgaWYgKHByZXYubGFzdCAhPT0gbGFzdCkge1xuICAgIHByZXYubGFzdD8uY2xhc3NMaXN0LnJlbW92ZShzZWN0aW9uQ3NzLmxhc3QpO1xuICAgIGxhc3Q/LmNsYXNzTGlzdC5hZGQoc2VjdGlvbkNzcy5sYXN0KTtcbiAgfVxuICByZXR1cm4geyBmaXJzdCwgbGFzdCB9O1xufVxuIl19