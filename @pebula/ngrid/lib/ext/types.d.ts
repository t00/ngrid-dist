export interface PblNgridPlugin {
}
export interface PblNgridPluginExtension {
}
export interface PblNgridPluginExtensionFactories {
}
export interface OnPropChangedEvent<T extends (keyof OnPropChangedSources & keyof OnPropChangedProperties) = keyof OnPropChangedSources, P extends keyof OnPropChangedProperties[T] = keyof OnPropChangedProperties[T]> {
    source: OnPropChangedSources[T];
    key: P;
    prev: OnPropChangedProperties[T][P];
    curr: OnPropChangedProperties[T][P];
}
export interface OnPropChangedSources {
}
export interface OnPropChangedProperties {
}
declare type FilterFlags<Base, Condition> = {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};
declare type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];
export declare type NotifyPropChangeMethod = <T extends OnPropChangedSources[keyof OnPropChangedSources], TP extends OnPropChangedProperties[AllowedNames<OnPropChangedSources, T>], P extends keyof TP>(source: T, key: P, prev: TP[P], curr: TP[P]) => void;
export {};
