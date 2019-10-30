import { Observable, BehaviorSubject } from 'rxjs';
export declare type PblNgridPaginatorKind = 'pageNumber' | 'token';
/**
 * An object with properties representing the change in the paginator.
 * Each property point to a tuple with 2 items.
 * The first item is the old value, the 2nd item is the new value.
 *
 * The properties that can change are page, perPage and total.
 */
export interface PblPaginatorChangeEvent<T = any> {
    page?: [T, T];
    perPage?: [number, number];
    total?: [number, number];
}
export interface PblPaginator<TPage> {
    kind: PblNgridPaginatorKind;
    /**
     * When true will assume that the datasource represents a single page.
     * This is common in server side pagination where pervious data is not cached and each pages is fetched and set as is, i.e. the datasource
     * represents a single page at a time.
     *
     * For example, consider a paginator with 10 items per page, pointing to page 4.
     * When `noCacheMode` is set to `true` the range is [30, 39]
     * When `noCacheMode` is set to `false` the range is [0, 9]
     */
    noCacheMode: boolean;
    perPage: number;
    page: TPage;
    total: number;
    readonly totalPages: number;
    readonly range: [number, number];
    onChange: Observable<PblPaginatorChangeEvent<TPage>>;
    reset(): void;
    canMove(value: TPage): boolean;
    hasNext(): boolean;
    hasPrev(): boolean;
    move(value: TPage): void;
    nextPage(): void;
    prevPage(): void;
}
export declare class PblTokenPaginator implements PblPaginator<string> {
    readonly kind: 'token';
    noCacheMode: boolean;
    perPage: number;
    page: string;
    total: number;
    readonly totalPages: number;
    readonly range: [number, number];
    readonly onChange: Observable<PblPaginatorChangeEvent<string>>;
    protected onChange$: BehaviorSubject<PblPaginatorChangeEvent<string>>;
    protected queuedChanges: PblPaginatorChangeEvent<string> | undefined;
    protected _range: [number, number];
    protected _perPage: number;
    protected _page: any;
    protected _total: number;
    protected _tokens: any[];
    protected _cursor: number;
    constructor();
    reset(): void;
    canMove(value: string): boolean;
    hasNext(): boolean;
    hasPrev(): boolean;
    move(value: string): void;
    nextPage(): void;
    prevPage(): void;
    addNext(value: any): void;
    private emit;
}
export declare class PblPagingPaginator implements PblPaginator<number> {
    readonly kind: 'pageNumber';
    noCacheMode: boolean;
    perPage: number;
    /**
     * Get / Set the current page
     */
    page: number;
    total: number;
    /**
     * The amount of pages in this paginator
     */
    readonly totalPages: number;
    readonly range: [number, number];
    readonly onChange: Observable<PblPaginatorChangeEvent<number>>;
    protected onChange$: BehaviorSubject<PblPaginatorChangeEvent<number>>;
    private _total;
    private _perPage;
    private _page;
    private _totalPages;
    private _range;
    private queuedChanges;
    constructor();
    canMove(value: number): boolean;
    hasNext(): boolean;
    hasPrev(): boolean;
    move(value: number): void;
    nextPage(): void;
    prevPage(): void;
    reset(): void;
    /**
     * Calculate the number of pages.
     * returns true if the current page has changed due to calculation. (current page \> new pages value)
     */
    protected calcPages(): void;
    private emit;
}
