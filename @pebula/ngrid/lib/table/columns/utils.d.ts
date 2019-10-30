import { PblBaseColumnDefinition, PblColumnDefinition, PblColumnGroupDefinition } from './types';
export declare function parseStyleWidth(exp: string): {
    value: number;
    type: 'px' | '%';
} | undefined;
export declare function initDefinitions<T extends PblBaseColumnDefinition>(def: PblBaseColumnDefinition, target: T): void;
export declare function isColumnDefinition(obj: any): obj is PblColumnDefinition;
export declare function isColumnGroupDefinition(obj: any): obj is PblColumnGroupDefinition;
