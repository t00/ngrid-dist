/**
 * @fileoverview added by tsickle
 * Generated from: lib/core/built-in-handlers/column-def/children.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { createStateChunkHandler } from '../../handling';
/**
 * @return {?}
 */
export function registerColumnDefChildHandlers() {
    /* ====================================================================================================================================================== */
    createStateChunkHandler('dataColumn')
        .requiredKeys('id', 'prop')
        .handleKeys('label', 'css', 'type', 'width', 'minWidth', 'maxWidth', // PblNgridBaseColumnState (all optional)
    'headerType', 'footerType', 'sort', 'sortAlias', 'editable', 'pin' // All Optional
    )
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    function (key, ctx) {
        /** @type {?} */
        var c = ctx.data.activeColumn || ctx.data.pblColumn;
        if (c) {
            switch (key) {
                case 'prop':
                    return c.orgProp;
                default:
                    break;
            }
        }
        /** @type {?} */
        var value = c ? c[key] : ctx.source[key];
        switch (key) {
            case 'sort':
                if (typeof value === 'boolean') {
                    return value;
                }
                else {
                    return;
                }
            default:
                break;
        }
        return value;
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    function (key, stateValue, ctx) {
        var activeColumn = ctx.data.activeColumn;
        if (activeColumn) {
            switch (key) {
                case 'width':
                    activeColumn.updateWidth((/** @type {?} */ (stateValue)));
                    break;
            }
        }
        if (ctx.source) {
            switch (key) {
                case 'prop':
                    return;
                case 'type':
                case 'headerType':
                case 'footerType':
                    /** @type {?} */
                    var typeValue = ctx.source[key];
                    /** @type {?} */
                    var stateTypeDef = (/** @type {?} */ (stateValue));
                    if (stateTypeDef && typeof stateTypeDef !== 'string' && typeValue && typeof typeValue !== 'string') {
                        typeValue.name = stateTypeDef.name;
                        if (stateTypeDef.data) {
                            typeValue.data = Object.assign(typeValue.data || {}, stateTypeDef.data);
                        }
                        return;
                    }
                    break;
            }
            // We must assert the type starting from 3.5 onwards
            // See "Fixes to unsound writes to indexed access types" in https://devblogs.microsoft.com/typescript/announcing-typescript-3-5
            ctx.source[(/** @type {?} */ (key))] = stateValue;
        }
    }))
        .register();
    /* ====================================================================================================================================================== */
    createStateChunkHandler('dataMetaRow')
        .handleKeys('rowClassName', 'type') // All Optional
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    function (key, ctx) {
        /** @type {?} */
        var active = ctx.data.active || ctx.source;
        if (active) {
            return active[key];
        }
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    function (key, stateValue, ctx) {
        // We must assert the type starting from 3.5 onwards
        // See "Fixes to unsound writes to indexed access types" in https://devblogs.microsoft.com/typescript/announcing-typescript-3-5
        ctx.source[key] = (/** @type {?} */ (stateValue));
    }))
        .register();
    /* ====================================================================================================================================================== */
    createStateChunkHandler('metaRow')
        // Note that we are not handling `cols`, this should be called from the parent, as a different child chunk handling process for each column
        .handleKeys('rowClassName', 'type', // All Optional like dataMetaRow
    'rowIndex')
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    function (key, ctx) {
        return ctx.source[key];
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    function (key, stateValue, ctx) {
    }))
        .register();
    /* ====================================================================================================================================================== */
    createStateChunkHandler('metaGroupRow')
        // Note that we are not handling `cols`, this should be called from the parent, as a different child chunk handling process for each column
        .handleKeys('rowClassName', 'type', // All Optional like dataMetaRow
    'rowIndex')
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    function (key, ctx) {
        return ctx.source[key];
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    function (key, stateValue, ctx) {
    }))
        .register();
    /* ====================================================================================================================================================== */
    createStateChunkHandler('metaColumn')
        .requiredKeys('kind', 'rowIndex')
        .handleKeys('id', 'label', 'css', 'type', 'width', 'minWidth', 'maxWidth')
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    function (key, ctx) {
        return ctx.source[key];
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    function (key, stateValue, ctx) {
    }))
        .register();
    /* ====================================================================================================================================================== */
    createStateChunkHandler('metaGroupColumn')
        .requiredKeys('prop', 'rowIndex', 'span')
        .handleKeys('id', 'label', 'css', 'type', 'width', 'minWidth', 'maxWidth')
        .serialize((/**
     * @param {?} key
     * @param {?} ctx
     * @return {?}
     */
    function (key, ctx) {
        return ctx.source[key];
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    function (key, stateValue, ctx) {
    }))
        .register();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpbGRyZW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvYnVpbHQtaW4taGFuZGxlcnMvY29sdW1uLWRlZi9jaGlsZHJlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRXpELE1BQU0sVUFBVSw4QkFBOEI7SUFDNUMsNEpBQTRKO0lBRTVKLHVCQUF1QixDQUFDLFlBQVksQ0FBQztTQUNsQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztTQUMxQixVQUFVLENBQ1QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQWUseUNBQXlDO0lBQy9HLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFJLGVBQWU7S0FDdEY7U0FDQSxTQUFTOzs7OztJQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7O1lBQ2IsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUztRQUNyRCxJQUFJLENBQUMsRUFBRTtZQUNMLFFBQVEsR0FBRyxFQUFFO2dCQUNYLEtBQUssTUFBTTtvQkFDVCxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ25CO29CQUNFLE1BQU07YUFDVDtTQUNGOztZQUVLLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFFMUMsUUFBUSxHQUFHLEVBQUU7WUFDWCxLQUFLLE1BQU07Z0JBQ1QsSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQzlCLE9BQU8sS0FBSyxDQUFDO2lCQUNk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ZW50IjpbImltcG9ydCB7IFBibENvbHVtblR5cGVEZWZpbml0aW9uLCBQYmxDb2x1bW4sIFBibENvbHVtbkRlZmluaXRpb24sIFBibE1ldGFSb3dEZWZpbml0aW9ucyB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgY3JlYXRlU3RhdGVDaHVua0hhbmRsZXIgfSBmcm9tICcuLi8uLi9oYW5kbGluZyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckNvbHVtbkRlZkNoaWxkSGFuZGxlcnMoKSB7XG4gIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gIGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyKCdkYXRhQ29sdW1uJylcbiAgICAucmVxdWlyZWRLZXlzKCdpZCcsICdwcm9wJylcbiAgICAuaGFuZGxlS2V5cyhcbiAgICAgICdsYWJlbCcsICdjc3MnLCAndHlwZScsICd3aWR0aCcsICdtaW5XaWR0aCcsICdtYXhXaWR0aCcsICAgICAgICAgICAgICAvLyBQYmxOZ3JpZEJhc2VDb2x1bW5TdGF0ZSAoYWxsIG9wdGlvbmFsKVxuICAgICAgJ2hlYWRlclR5cGUnLCAnZm9vdGVyVHlwZScsICdzb3J0JywgJ3NvcnRBbGlhcycsICdlZGl0YWJsZScsICdwaW4nICAgIC8vIEFsbCBPcHRpb25hbFxuICAgIClcbiAgICAuc2VyaWFsaXplKCAoa2V5LCBjdHgpID0+IHtcbiAgICAgIGNvbnN0IGMgPSBjdHguZGF0YS5hY3RpdmVDb2x1bW4gfHwgY3R4LmRhdGEucGJsQ29sdW1uO1xuICAgICAgaWYgKGMpIHtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICBjYXNlICdwcm9wJzpcbiAgICAgICAgICAgIHJldHVybiBjLm9yZ1Byb3A7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhbHVlID0gYyA/IGNba2V5XSA6IGN0eC5zb3VyY2Vba2V5XTtcblxuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAnc29ydCc6XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KVxuICAgIC5kZXNlcmlhbGl6ZSggKGtleSwgc3RhdGVWYWx1ZSwgY3R4KSA9PiB7XG4gICAgICBjb25zdCB7IGFjdGl2ZUNvbHVtbiB9ID0gY3R4LmRhdGE7XG4gICAgICBpZiAoYWN0aXZlQ29sdW1uKSB7XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgY2FzZSAnd2lkdGgnOlxuICAgICAgICAgICAgYWN0aXZlQ29sdW1uLnVwZGF0ZVdpZHRoKHN0YXRlVmFsdWUgYXMgYW55KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY3R4LnNvdXJjZSkge1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgIGNhc2UgJ3Byb3AnOlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIGNhc2UgJ3R5cGUnOlxuICAgICAgICAgIGNhc2UgJ2hlYWRlclR5cGUnOlxuICAgICAgICAgIGNhc2UgJ2Zvb3RlclR5cGUnOlxuICAgICAgICAgICAgY29uc3QgdHlwZVZhbHVlID0gY3R4LnNvdXJjZVtrZXldO1xuICAgICAgICAgICAgY29uc3Qgc3RhdGVUeXBlRGVmOiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbiA9IHN0YXRlVmFsdWUgYXMgYW55O1xuICAgICAgICAgICAgaWYgKHN0YXRlVHlwZURlZiAmJiB0eXBlb2Ygc3RhdGVUeXBlRGVmICE9PSAnc3RyaW5nJyAmJiB0eXBlVmFsdWUgJiYgdHlwZW9mIHR5cGVWYWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgdHlwZVZhbHVlLm5hbWUgPSBzdGF0ZVR5cGVEZWYubmFtZTtcbiAgICAgICAgICAgICAgaWYgKHN0YXRlVHlwZURlZi5kYXRhKSB7XG4gICAgICAgICAgICAgICAgdHlwZVZhbHVlLmRhdGEgPSBPYmplY3QuYXNzaWduKHR5cGVWYWx1ZS5kYXRhIHx8IHt9LCBzdGF0ZVR5cGVEZWYuZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBtdXN0IGFzc2VydCB0aGUgdHlwZSBzdGFydGluZyBmcm9tIDMuNSBvbndhcmRzXG4gICAgICAgIC8vIFNlZSBcIkZpeGVzIHRvIHVuc291bmQgd3JpdGVzIHRvIGluZGV4ZWQgYWNjZXNzIHR5cGVzXCIgaW4gaHR0cHM6Ly9kZXZibG9ncy5taWNyb3NvZnQuY29tL3R5cGVzY3JpcHQvYW5ub3VuY2luZy10eXBlc2NyaXB0LTMtNVxuICAgICAgICBjdHguc291cmNlW2tleSBhcyBhbnldID0gc3RhdGVWYWx1ZTtcbiAgICAgIH1cblxuICAgIH0pXG4gICAgLnJlZ2lzdGVyKCk7XG5cbiAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgY3JlYXRlU3RhdGVDaHVua0hhbmRsZXIoJ2RhdGFNZXRhUm93JylcbiAgICAuaGFuZGxlS2V5cygncm93Q2xhc3NOYW1lJywgJ3R5cGUnKSAgICAvLyBBbGwgT3B0aW9uYWxcbiAgICAuc2VyaWFsaXplKCAoa2V5LCBjdHgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGl2ZSA9IGN0eC5kYXRhLmFjdGl2ZSB8fCBjdHguc291cmNlO1xuICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICByZXR1cm4gYWN0aXZlW2tleV07XG4gICAgICB9XG4gICAgfSlcbiAgICAuZGVzZXJpYWxpemUoIChrZXksIHN0YXRlVmFsdWUsIGN0eCkgPT4ge1xuICAgICAgLy8gV2UgbXVzdCBhc3NlcnQgdGhlIHR5cGUgc3RhcnRpbmcgZnJvbSAzLjUgb253YXJkc1xuICAgICAgLy8gU2VlIFwiRml4ZXMgdG8gdW5zb3VuZCB3cml0ZXMgdG8gaW5kZXhlZCBhY2Nlc3MgdHlwZXNcIiBpbiBodHRwczovL2RldmJsb2dzLm1pY3Jvc29mdC5jb20vdHlwZXNjcmlwdC9hbm5vdW5jaW5nLXR5cGVzY3JpcHQtMy01XG4gICAgICBjdHguc291cmNlW2tleV0gPSBzdGF0ZVZhbHVlIGFzIGFueTtcbiAgICB9KVxuICAgIC5yZWdpc3RlcigpO1xuXG5cbiAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgY3JlYXRlU3RhdGVDaHVua0hhbmRsZXIoJ21ldGFSb3cnKVxuICAgIC8vIE5vdGUgdGhhdCB3ZSBhcmUgbm90IGhhbmRsaW5nIGBjb2xzYCwgdGhpcyBzaG91bGQgYmUgY2FsbGVkIGZyb20gdGhlIHBhcmVudCwgYXMgYSBkaWZmZXJlbnQgY2hpbGQgY2h1bmsgaGFuZGxpbmcgcHJvY2VzcyBmb3IgZWFjaCBjb2x1bW5cbiAgICAuaGFuZGxlS2V5cyhcbiAgICAgICdyb3dDbGFzc05hbWUnLCAndHlwZScsICAgIC8vIEFsbCBPcHRpb25hbCBsaWtlIGRhdGFNZXRhUm93XG4gICAgICAncm93SW5kZXgnLCAgICAgICAgICAgICAgICAvLyBSZXF1aXJlZFxuICAgICAgKVxuICAgIC5zZXJpYWxpemUoIChrZXksIGN0eCkgPT4ge1xuICAgICAgcmV0dXJuIGN0eC5zb3VyY2Vba2V5XTtcbiAgICB9KVxuICAgIC5kZXNlcmlhbGl6ZSggKGtleSwgc3RhdGVWYWx1ZSwgY3R4KSA9PiB7XG5cbiAgICB9KVxuICAgIC5yZWdpc3RlcigpO1xuXG4gIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gIGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyKCdtZXRhR3JvdXBSb3cnKVxuICAgIC8vIE5vdGUgdGhhdCB3ZSBhcmUgbm90IGhhbmRsaW5nIGBjb2xzYCwgdGhpcyBzaG91bGQgYmUgY2FsbGVkIGZyb20gdGhlIHBhcmVudCwgYXMgYSBkaWZmZXJlbnQgY2hpbGQgY2h1bmsgaGFuZGxpbmcgcHJvY2VzcyBmb3IgZWFjaCBjb2x1bW5cbiAgICAuaGFuZGxlS2V5cyhcbiAgICAgICdyb3dDbGFzc05hbWUnLCAndHlwZScsICAgIC8vIEFsbCBPcHRpb25hbCBsaWtlIGRhdGFNZXRhUm93XG4gICAgICAncm93SW5kZXgnLCAgICAgICAgICAgICAgICAvLyBSZXF1aXJlZFxuICAgICAgKVxuICAgIC5zZXJpYWxpemUoIChrZXksIGN0eCkgPT4ge1xuICAgICAgcmV0dXJuIGN0eC5zb3VyY2Vba2V5XTtcbiAgICB9KVxuICAgIC5kZXNlcmlhbGl6ZSggKGtleSwgc3RhdGVWYWx1ZSwgY3R4KSA9PiB7XG5cbiAgICB9KVxuICAgIC5yZWdpc3RlcigpO1xuXG4gIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gIGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyKCdtZXRhQ29sdW1uJylcbiAgICAucmVxdWlyZWRLZXlzKCdraW5kJywgJ3Jvd0luZGV4JylcbiAgICAuaGFuZGxlS2V5cyhcbiAgICAgICdpZCcsICdsYWJlbCcsICdjc3MnLCAndHlwZScsICd3aWR0aCcsICdtaW5XaWR0aCcsICdtYXhXaWR0aCcsICAgICAgICAvLyBQYmxOZ3JpZEJhc2VDb2x1bW5TdGF0ZSAoYWxsIG9wdGlvbmFsKVxuICAgIClcbiAgICAuc2VyaWFsaXplKCAoa2V5LCBjdHgpID0+IHtcbiAgICAgIHJldHVybiBjdHguc291cmNlW2tleV07XG4gICAgfSlcbiAgICAuZGVzZXJpYWxpemUoIChrZXksIHN0YXRlVmFsdWUsIGN0eCkgPT4ge1xuXG4gICAgfSlcbiAgICAucmVnaXN0ZXIoKTtcblxuICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICBjcmVhdGVTdGF0ZUNodW5rSGFuZGxlcignbWV0YUdyb3VwQ29sdW1uJylcbiAgICAucmVxdWlyZWRLZXlzKCdwcm9wJywgJ3Jvd0luZGV4JywgJ3NwYW4nKVxuICAgIC5oYW5kbGVLZXlzKFxuICAgICAgJ2lkJywgJ2xhYmVsJywgJ2NzcycsICd0eXBlJywgJ3dpZHRoJywgJ21pbldpZHRoJywgJ21heFdpZHRoJywgICAgICAgIC8vIFBibE5ncmlkQmFzZUNvbHVtblN0YXRlIChhbGwgb3B0aW9uYWwpXG4gICAgKVxuICAgIC5zZXJpYWxpemUoIChrZXksIGN0eCkgPT4ge1xuICAgICAgcmV0dXJuIGN0eC5zb3VyY2Vba2V5XTtcbiAgICB9KVxuICAgIC5kZXNlcmlhbGl6ZSggKGtleSwgc3RhdGVWYWx1ZSwgY3R4KSA9PiB7XG5cbiAgICB9KVxuICAgIC5yZWdpc3RlcigpO1xufVxuIl19