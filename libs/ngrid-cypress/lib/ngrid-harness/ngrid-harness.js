"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NGridCypressHarness = void 0;
const actions_1 = require("./actions");
class NGridCypressHarness {
    constructor(element) {
        this.element = element;
        this.actions = new actions_1.NGridCypressHarnessActions(this);
        const fixedMetaRows = element.querySelector('div[pbl-ngrid-fixed-meta-row-container="header"');
        const viewPort = element.querySelector('pbl-cdk-virtual-scroll-viewport');
        const cdkTable = viewPort.querySelector('pbl-cdk-table');
    }
    getHeaderMetaRows() {
        const fixedMetaRows = this.element.querySelector('div[pbl-ngrid-fixed-meta-row-container="header"');
        const fixedHeaderMetaRows = fixedMetaRows.querySelectorAll('pbl-ngrid-meta-row');
        const viewPort = this.element.querySelector('pbl-cdk-virtual-scroll-viewport');
        const cdkTable = viewPort.querySelector('pbl-cdk-table');
        const headerMetaRows = cdkTable.querySelectorAll('pbl-ngrid-meta-row');
        const CLASS_ROW_INDEX_RE = /^pbl-ngrid-row-index-(\d+)$/;
        return [
            ...Array.from(fixedHeaderMetaRows).map(e => {
                const match = this.findClassMatch(e, CLASS_ROW_INDEX_RE);
                return {
                    type: 'fixed',
                    isGroup: e.classList.contains('pbl-meta-group-row'),
                    rowIndex: match[1],
                    cells: Array.from(e.querySelectorAll('pbl-ngrid-meta-cell')).map(c => this.parseMetaCell(c)),
                };
            }),
            ...Array.from(headerMetaRows).map(e => {
                const match = this.findClassMatch(e, CLASS_ROW_INDEX_RE);
                return {
                    type: e.classList.contains('cdk-table-sticky') ? 'sticky' : 'row',
                    isGroup: e.classList.contains('pbl-meta-group-row'),
                    rowIndex: match[1],
                    cells: Array.from(e.querySelectorAll('pbl-ngrid-meta-cell')).map(c => this.parseMetaCell(c)),
                };
            })
        ];
    }
    getColumns() {
        const fixedMetaRows = this.element.querySelector('div[pbl-ngrid-fixed-meta-row-container="header"');
        const columnRows = fixedMetaRows.querySelectorAll('pbl-ngrid-column-row');
        const [gridWidthRow, columnRow] = Array.from(columnRows);
        const headerCells = columnRow.querySelectorAll('pbl-ngrid-header-cell');
        const CLASS_COLUMN_RE = /^cdk-column-(.+)$/;
        return Array.from(headerCells).map(e => {
            for (let i = 0; i < e.classList.length; i++) {
                const match = this.findClassMatch(e, CLASS_COLUMN_RE);
                if (match) {
                    return match[1];
                }
            }
        });
    }
    parseMetaCell(e) {
        const groupCell = e.classList.contains('pbl-header-group-cell');
        if (groupCell) {
            const CLASS_GROUP_CELL_RE = /^cdk-column-group-(.+)-row-\d+$/;
            const CLASS_GROUP_SLAVE_CELL_RE = /^cdk-column-group-(.+)-row-\d+-slave\d+$/;
            const match = this.findClassMatch(e, CLASS_GROUP_CELL_RE);
            return {
                groupCell: true,
                slave: !match,
                id: match ? match[1] : this.findClassMatch(e, CLASS_GROUP_SLAVE_CELL_RE)[1],
                placeholder: e.classList.contains('pbl-header-group-cell-placeholder'),
                el: e,
            };
        }
        const CLASS_COLUMN_RE = /^cdk-column-(.+)$/;
        return {
            id: this.findClassMatch(e, CLASS_COLUMN_RE)[1],
            el: e,
        };
    }
    findClassMatch(e, regExp) {
        for (let i = 0; i < e.classList.length; i++) {
            const match = e.classList.item(i).match(regExp);
            if (match) {
                return match;
            }
        }
    }
}
exports.NGridCypressHarness = NGridCypressHarness;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQtaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQtY3lwcmVzcy9zcmMvbGliL25ncmlkLWhhcm5lc3MvbmdyaWQtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBdUQ7QUFFdkQsTUFBYSxtQkFBbUI7SUFHOUIsWUFBNEIsT0FBb0I7UUFBcEIsWUFBTyxHQUFQLE9BQU8sQ0FBYTtRQUZoQyxZQUFPLEdBQUcsSUFBSSxvQ0FBMEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUc3RCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLGlEQUFpRCxDQUFDLENBQUM7UUFDL0YsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELGlCQUFpQjtRQUNmLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGlEQUFpRCxDQUFDLENBQUM7UUFDcEcsTUFBTSxtQkFBbUIsR0FBRyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUVqRixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQy9FLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekQsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFdkUsTUFBTSxrQkFBa0IsR0FBRyw2QkFBNkIsQ0FBQztRQUN6RCxPQUFPO1lBQ0wsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxDQUFF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QUMsQ0FBQztZQUMxRCxPQUFPO2dCQUNMLFNBQVMsRUFBRSxJQUFJO2dCQUNmLEtBQUssRUFBRSxDQUFDLEtBQUs7Z0JBQ2IsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0UsV0FBVyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG1DQUFtQyxDQUFDO2dCQUN0RSxFQUFFLEVBQUUsQ0FBQzthQUNOLENBQUE7U0FDRjtRQUVELE1BQU0sZUFBZSxHQUFHLG1CQUFtQixDQUFDO1FBQzVDLE9BQU87WUFDTCxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLEVBQUUsRUFBRSxDQUFDO1NBQ04sQ0FBQTtJQUNILENBQUM7SUFFTyxjQUFjLENBQUMsQ0FBVSxFQUFFLE1BQWM7UUFDL0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoRCxJQUFJLEtBQUssRUFBRTtnQkFDVCxPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7SUFDSCxDQUFDO0NBQ0Y7QUF4RkQsa0RBd0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTkdyaWRDeXByZXNzSGFybmVzc0FjdGlvbnMgfSBmcm9tICcuL2FjdGlvbnMnO1xuXG5leHBvcnQgY2xhc3MgTkdyaWRDeXByZXNzSGFybmVzcyB7XG4gIHB1YmxpYyByZWFkb25seSBhY3Rpb25zID0gbmV3IE5HcmlkQ3lwcmVzc0hhcm5lc3NBY3Rpb25zKHRoaXMpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGZpeGVkTWV0YVJvd3MgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltwYmwtbmdyaWQtZml4ZWQtbWV0YS1yb3ctY29udGFpbmVyPVwiaGVhZGVyXCInKTtcbiAgICBjb25zdCB2aWV3UG9ydCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcigncGJsLWNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCcpO1xuICAgIGNvbnN0IGNka1RhYmxlID0gdmlld1BvcnQucXVlcnlTZWxlY3RvcigncGJsLWNkay10YWJsZScpO1xuICB9XG5cbiAgZ2V0SGVhZGVyTWV0YVJvd3MoKSB7XG4gICAgY29uc3QgZml4ZWRNZXRhUm93cyA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbcGJsLW5ncmlkLWZpeGVkLW1ldGEtcm93LWNvbnRhaW5lcj1cImhlYWRlclwiJyk7XG4gICAgY29uc3QgZml4ZWRIZWFkZXJNZXRhUm93cyA9IGZpeGVkTWV0YVJvd3MucXVlcnlTZWxlY3RvckFsbCgncGJsLW5ncmlkLW1ldGEtcm93Jyk7XG5cbiAgICBjb25zdCB2aWV3UG9ydCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdwYmwtY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0Jyk7XG4gICAgY29uc3QgY2RrVGFibGUgPSB2aWV3UG9ydC5xdWVyeVNlbGVjdG9yKCdwYmwtY2RrLXRhYmxlJyk7XG4gICAgY29uc3QgaGVhZGVyTWV0YVJvd3MgPSBjZGtUYWJsZS5xdWVyeVNlbGVjdG9yQWxsKCdwYmwtbmdyaWQtbWV0YS1yb3cnKTtcblxuICAgIGNvbnN0IENMQVNTX1JPV19JTkRFWF9SRSA9IC9ecGJsLW5ncmlkLXJvdy1pbmRleC0oXFxkKykkLztcbiAgICByZXR1cm4gW1xuICAgICAgLi4uQXJyYXkuZnJvbShmaXhlZEhlYWRlck1ldGFSb3dzKS5tYXAoIGUgPT4ge1xuICAgICAgICBjb25zdCBtYXRjaCA9IHRoaXMuZmluZENsYXNzTWF0Y2goZSwgQ0xBU1NfUk9XX0lOREVYX1JFKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0eXBlOiAnZml4ZWQnIGFzIGNvbnN0LFxuICAgICAgICAgIGlzR3JvdXA6IGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYmwtbWV0YS1ncm91cC1yb3cnKSxcbiAgICAgICAgICByb3dJbmRleDogbWF0Y2hbMV0sXG4gICAgICAgICAgY2VsbHM6IEFycmF5LmZyb20oZS5xdWVyeVNlbGVjdG9yQWxsKCdwYmwtbmdyaWQtbWV0YS1jZWxsJykpLm1hcChjID0+IHRoaXMucGFyc2VNZXRhQ2VsbChjKSksXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgLi4uQXJyYXkuZnJvbShoZWFkZXJNZXRhUm93cykubWFwKCBlID0+IHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSB0aGlzLmZpbmRDbGFzc01hdGNoKGUsIENMQVNTX1JPV19JTkRFWF9SRSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHlwZTogZS5jbGFzc0xpc3QuY29udGFpbnMoJ2Nkay10YWJsZS1zdGlja3knKSA/ICdzdGlja3knIGFzIGNvbnN0IDogJ3JvdycgYXMgY29uc3QsXG4gICAgICAgICAgaXNHcm91cDogZS5jbGFzc0xpc3QuY29udGFpbnMoJ3BibC1tZXRhLWdyb3VwLXJvdycpLFxuICAgICAgICAgIHJvd0luZGV4OiBtYXRjaFsxXSxcbiAgICAgICAgICBjZWxsczogQXJyYXkuZnJvbShlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3BibC1uZ3JpZC1tZXRhLWNlbGwnKSkubWFwKGMgPT4gdGhpcy5wYXJzZU1ldGFDZWxsKGMpKSxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICBdO1xuICB9XG5cbiAgZ2V0Q29sdW1ucygpIHtcbiAgICBjb25zdCBmaXhlZE1ldGFSb3dzID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltwYmwtbmdyaWQtZml4ZWQtbWV0YS1yb3ctY29udGFpbmVyPVwiaGVhZGVyXCInKTtcbiAgICBjb25zdCBjb2x1bW5Sb3dzID0gZml4ZWRNZXRhUm93cy5xdWVyeVNlbGVjdG9yQWxsKCdwYmwtbmdyaWQtY29sdW1uLXJvdycpO1xuICAgIGNvbnN0IFtncmlkV2lkdGhSb3csIGNvbHVtblJvd10gPSBBcnJheS5mcm9tKGNvbHVtblJvd3MpO1xuICAgIGNvbnN0IGhlYWRlckNlbGxzID0gY29sdW1uUm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3BibC1uZ3JpZC1oZWFkZXItY2VsbCcpO1xuXG4gICAgY29uc3QgQ0xBU1NfQ09MVU1OX1JFID0gL15jZGstY29sdW1uLSguKykkLztcbiAgICByZXR1cm4gQXJyYXkuZnJvbShoZWFkZXJDZWxscykubWFwKCBlID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZS5jbGFzc0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSB0aGlzLmZpbmRDbGFzc01hdGNoKGUsIENMQVNTX0NPTFVNTl9SRSk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgIHJldHVybiBtYXRjaFsxXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU1ldGFDZWxsKGU6IEVsZW1lbnQpIHtcbiAgICBjb25zdCBncm91cENlbGwgPSBlLmNsYXNzTGlzdC5jb250YWlucygncGJsLWhlYWRlci1ncm91cC1jZWxsJyk7XG4gICAgaWYgKGdyb3VwQ2VsbCkge1xuICAgICAgY29uc3QgQ0xBU1NfR1JPVVBfQ0VMTF9SRSA9IC9eY2RrLWNvbHVtbi1ncm91cC0oLispLXJvdy1cXGQrJC87XG4gICAgICBjb25zdCBDTEFTU19HUk9VUF9TTEFWRV9DRUxMX1JFID0gL15jZGstY29sdW1uLWdyb3VwLSguKyktcm93LVxcZCstc2xhdmVcXGQrJC87XG5cbiAgICAgIGNvbnN0IG1hdGNoID0gdGhpcy5maW5kQ2xhc3NNYXRjaChlLCBDTEFTU19HUk9VUF9DRUxMX1JFKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdyb3VwQ2VsbDogdHJ1ZSxcbiAgICAgICAgc2xhdmU6ICFtYXRjaCxcbiAgICAgICAgaWQ6IG1hdGNoID8gbWF0Y2hbMV0gOiB0aGlzLmZpbmRDbGFzc01hdGNoKGUsIENMQVNTX0dST1VQX1NMQVZFX0NFTExfUkUpWzFdICxcbiAgICAgICAgcGxhY2Vob2xkZXI6IGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYmwtaGVhZGVyLWdyb3VwLWNlbGwtcGxhY2Vob2xkZXInKSxcbiAgICAgICAgZWw6IGUsXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgQ0xBU1NfQ09MVU1OX1JFID0gL15jZGstY29sdW1uLSguKykkLztcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHRoaXMuZmluZENsYXNzTWF0Y2goZSwgQ0xBU1NfQ09MVU1OX1JFKVsxXSxcbiAgICAgIGVsOiBlLFxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmluZENsYXNzTWF0Y2goZTogRWxlbWVudCwgcmVnRXhwOiBSZWdFeHApOiBSZWdFeHBNYXRjaEFycmF5IHwgdW5kZWZpbmVkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGUuY2xhc3NMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGUuY2xhc3NMaXN0Lml0ZW0oaSkubWF0Y2gocmVnRXhwKTtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=