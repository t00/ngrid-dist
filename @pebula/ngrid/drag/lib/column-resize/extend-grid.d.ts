declare module '@pebula/ngrid/lib/grid/columns/column' {
    interface PblColumn {
        resize: boolean;
    }
}
declare module '@pebula/ngrid/lib/grid/columns/types' {
    interface PblColumnDefinition {
        resize?: boolean;
    }
}
export declare function extendGrid(): void;
