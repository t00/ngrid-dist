import { PblColumnSizeInfo } from '../types';
import { PblColumn } from './column';
export declare class ColumnSizeInfo implements PblColumnSizeInfo {
    readonly target: HTMLElement;
    column: PblColumn;
    /**
     * The height of the column (subpixel resolution)
     */
    height: number;
    /**
     * The width of the column (subpixel resolution)
     * Note that this is the not the content width.
     */
    width: number;
    /**
     * The computed style for this cell.
     */
    style: CSSStyleDeclaration;
    protected _column: PblColumn;
    constructor(target: HTMLElement);
    attachColumn(column: PblColumn): void;
    detachColumn(): void;
    updateSize(): void;
}
