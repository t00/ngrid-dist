/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                    activeColumn.updateWidth(true, (/** @type {?} */ (stateValue)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpbGRyZW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvYnVpbHQtaW4taGFuZGxlcnMvY29sdW1uLWRlZi9jaGlsZHJlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFFekQsTUFBTSxVQUFVLDhCQUE4QjtJQUM1Qyw0SkFBNEo7SUFFNUosdUJBQXVCLENBQUMsWUFBWSxDQUFDO1NBQ2xDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO1NBQzFCLFVBQVUsQ0FDVCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBZSx5Q0FBeUM7SUFDL0csWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUksZUFBZTtLQUN0RjtTQUNBLFNBQVM7Ozs7O0lBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRzs7WUFDYixDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTO1FBQ3JELElBQUksQ0FBQyxFQUFFO1lBQ0wsUUFBUSxHQUFHLEVBQUU7Z0JBQ1gsS0FBSyxNQUFNO29CQUNULE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDbkI7b0JBQ0UsTUFBTTthQUNUO1NBQ0Y7O1lBRUssS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUUxQyxRQUFRLEdBQUcsRUFBRTtZQUNYLEtBQUssTUFBTTtnQkFDVCxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVMsRUFBRTtvQkFDOUIsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbiwgUGJsQ29sdW1uLCBQYmxDb2x1bW5EZWZpbml0aW9uLCBQYmxNZXRhUm93RGVmaW5pdGlvbnMgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyIH0gZnJvbSAnLi4vLi4vaGFuZGxpbmcnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDb2x1bW5EZWZDaGlsZEhhbmRsZXJzKCkge1xuICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICBjcmVhdGVTdGF0ZUNodW5rSGFuZGxlcignZGF0YUNvbHVtbicpXG4gICAgLnJlcXVpcmVkS2V5cygnaWQnLCAncHJvcCcpXG4gICAgLmhhbmRsZUtleXMoXG4gICAgICAnbGFiZWwnLCAnY3NzJywgJ3R5cGUnLCAnd2lkdGgnLCAnbWluV2lkdGgnLCAnbWF4V2lkdGgnLCAgICAgICAgICAgICAgLy8gUGJsTmdyaWRCYXNlQ29sdW1uU3RhdGUgKGFsbCBvcHRpb25hbClcbiAgICAgICdoZWFkZXJUeXBlJywgJ2Zvb3RlclR5cGUnLCAnc29ydCcsICdzb3J0QWxpYXMnLCAnZWRpdGFibGUnLCAncGluJyAgICAvLyBBbGwgT3B0aW9uYWxcbiAgICApXG4gICAgLnNlcmlhbGl6ZSggKGtleSwgY3R4KSA9PiB7XG4gICAgICBjb25zdCBjID0gY3R4LmRhdGEuYWN0aXZlQ29sdW1uIHx8IGN0eC5kYXRhLnBibENvbHVtbjtcbiAgICAgIGlmIChjKSB7XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgY2FzZSAncHJvcCc6XG4gICAgICAgICAgICByZXR1cm4gYy5vcmdQcm9wO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCB2YWx1ZSA9IGMgPyBjW2tleV0gOiBjdHguc291cmNlW2tleV07XG5cbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgJ3NvcnQnOlxuICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSlcbiAgICAuZGVzZXJpYWxpemUoIChrZXksIHN0YXRlVmFsdWUsIGN0eCkgPT4ge1xuICAgICAgY29uc3QgeyBhY3RpdmVDb2x1bW4gfSA9IGN0eC5kYXRhO1xuICAgICAgaWYgKGFjdGl2ZUNvbHVtbikge1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgIGNhc2UgJ3dpZHRoJzpcbiAgICAgICAgICAgIGFjdGl2ZUNvbHVtbi51cGRhdGVXaWR0aCh0cnVlLCBzdGF0ZVZhbHVlIGFzIGFueSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGN0eC5zb3VyY2UpIHtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICBjYXNlICdwcm9wJzpcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICBjYXNlICd0eXBlJzpcbiAgICAgICAgICBjYXNlICdoZWFkZXJUeXBlJzpcbiAgICAgICAgICBjYXNlICdmb290ZXJUeXBlJzpcbiAgICAgICAgICAgIGNvbnN0IHR5cGVWYWx1ZSA9IGN0eC5zb3VyY2Vba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlVHlwZURlZjogUGJsQ29sdW1uVHlwZURlZmluaXRpb24gPSBzdGF0ZVZhbHVlIGFzIGFueTtcbiAgICAgICAgICAgIGlmIChzdGF0ZVR5cGVEZWYgJiYgdHlwZW9mIHN0YXRlVHlwZURlZiAhPT0gJ3N0cmluZycgJiYgdHlwZVZhbHVlICYmIHR5cGVvZiB0eXBlVmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHR5cGVWYWx1ZS5uYW1lID0gc3RhdGVUeXBlRGVmLm5hbWU7XG4gICAgICAgICAgICAgIGlmIChzdGF0ZVR5cGVEZWYuZGF0YSkge1xuICAgICAgICAgICAgICAgIHR5cGVWYWx1ZS5kYXRhID0gT2JqZWN0LmFzc2lnbih0eXBlVmFsdWUuZGF0YSB8fCB7fSwgc3RhdGVUeXBlRGVmLmRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgbXVzdCBhc3NlcnQgdGhlIHR5cGUgc3RhcnRpbmcgZnJvbSAzLjUgb253YXJkc1xuICAgICAgICAvLyBTZWUgXCJGaXhlcyB0byB1bnNvdW5kIHdyaXRlcyB0byBpbmRleGVkIGFjY2VzcyB0eXBlc1wiIGluIGh0dHBzOi8vZGV2YmxvZ3MubWljcm9zb2Z0LmNvbS90eXBlc2NyaXB0L2Fubm91bmNpbmctdHlwZXNjcmlwdC0zLTVcbiAgICAgICAgY3R4LnNvdXJjZVtrZXkgYXMga2V5b2YgKFBibENvbHVtbiB8IFBibENvbHVtbkRlZmluaXRpb24pXSA9IHN0YXRlVmFsdWU7XG4gICAgICB9XG5cbiAgICB9KVxuICAgIC5yZWdpc3RlcigpO1xuXG4gIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gIGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyKCdkYXRhTWV0YVJvdycpXG4gICAgLmhhbmRsZUtleXMoJ3Jvd0NsYXNzTmFtZScsICd0eXBlJykgICAgLy8gQWxsIE9wdGlvbmFsXG4gICAgLnNlcmlhbGl6ZSggKGtleSwgY3R4KSA9PiB7XG4gICAgICBjb25zdCBhY3RpdmUgPSBjdHguZGF0YS5hY3RpdmUgfHwgY3R4LnNvdXJjZTtcbiAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZVtrZXldO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmRlc2VyaWFsaXplKCAoa2V5LCBzdGF0ZVZhbHVlLCBjdHgpID0+IHtcbiAgICAgIC8vIFdlIG11c3QgYXNzZXJ0IHRoZSB0eXBlIHN0YXJ0aW5nIGZyb20gMy41IG9ud2FyZHNcbiAgICAgIC8vIFNlZSBcIkZpeGVzIHRvIHVuc291bmQgd3JpdGVzIHRvIGluZGV4ZWQgYWNjZXNzIHR5cGVzXCIgaW4gaHR0cHM6Ly9kZXZibG9ncy5taWNyb3NvZnQuY29tL3R5cGVzY3JpcHQvYW5ub3VuY2luZy10eXBlc2NyaXB0LTMtNVxuICAgICAgY3R4LnNvdXJjZVtrZXldID0gc3RhdGVWYWx1ZSBhcyBhbnk7XG4gICAgfSlcbiAgICAucmVnaXN0ZXIoKTtcblxuXG4gIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gIGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyKCdtZXRhUm93JylcbiAgICAvLyBOb3RlIHRoYXQgd2UgYXJlIG5vdCBoYW5kbGluZyBgY29sc2AsIHRoaXMgc2hvdWxkIGJlIGNhbGxlZCBmcm9tIHRoZSBwYXJlbnQsIGFzIGEgZGlmZmVyZW50IGNoaWxkIGNodW5rIGhhbmRsaW5nIHByb2Nlc3MgZm9yIGVhY2ggY29sdW1uXG4gICAgLmhhbmRsZUtleXMoXG4gICAgICAncm93Q2xhc3NOYW1lJywgJ3R5cGUnLCAgICAvLyBBbGwgT3B0aW9uYWwgbGlrZSBkYXRhTWV0YVJvd1xuICAgICAgJ3Jvd0luZGV4JywgICAgICAgICAgICAgICAgLy8gUmVxdWlyZWRcbiAgICAgIClcbiAgICAuc2VyaWFsaXplKCAoa2V5LCBjdHgpID0+IHtcbiAgICAgIHJldHVybiBjdHguc291cmNlW2tleV07XG4gICAgfSlcbiAgICAuZGVzZXJpYWxpemUoIChrZXksIHN0YXRlVmFsdWUsIGN0eCkgPT4ge1xuXG4gICAgfSlcbiAgICAucmVnaXN0ZXIoKTtcblxuICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICBjcmVhdGVTdGF0ZUNodW5rSGFuZGxlcignbWV0YUdyb3VwUm93JylcbiAgICAvLyBOb3RlIHRoYXQgd2UgYXJlIG5vdCBoYW5kbGluZyBgY29sc2AsIHRoaXMgc2hvdWxkIGJlIGNhbGxlZCBmcm9tIHRoZSBwYXJlbnQsIGFzIGEgZGlmZmVyZW50IGNoaWxkIGNodW5rIGhhbmRsaW5nIHByb2Nlc3MgZm9yIGVhY2ggY29sdW1uXG4gICAgLmhhbmRsZUtleXMoXG4gICAgICAncm93Q2xhc3NOYW1lJywgJ3R5cGUnLCAgICAvLyBBbGwgT3B0aW9uYWwgbGlrZSBkYXRhTWV0YVJvd1xuICAgICAgJ3Jvd0luZGV4JywgICAgICAgICAgICAgICAgLy8gUmVxdWlyZWRcbiAgICAgIClcbiAgICAuc2VyaWFsaXplKCAoa2V5LCBjdHgpID0+IHtcbiAgICAgIHJldHVybiBjdHguc291cmNlW2tleV07XG4gICAgfSlcbiAgICAuZGVzZXJpYWxpemUoIChrZXksIHN0YXRlVmFsdWUsIGN0eCkgPT4ge1xuXG4gICAgfSlcbiAgICAucmVnaXN0ZXIoKTtcblxuICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICBjcmVhdGVTdGF0ZUNodW5rSGFuZGxlcignbWV0YUNvbHVtbicpXG4gICAgLnJlcXVpcmVkS2V5cygna2luZCcsICdyb3dJbmRleCcpXG4gICAgLmhhbmRsZUtleXMoXG4gICAgICAnaWQnLCAnbGFiZWwnLCAnY3NzJywgJ3R5cGUnLCAnd2lkdGgnLCAnbWluV2lkdGgnLCAnbWF4V2lkdGgnLCAgICAgICAgLy8gUGJsTmdyaWRCYXNlQ29sdW1uU3RhdGUgKGFsbCBvcHRpb25hbClcbiAgICApXG4gICAgLnNlcmlhbGl6ZSggKGtleSwgY3R4KSA9PiB7XG4gICAgICByZXR1cm4gY3R4LnNvdXJjZVtrZXldO1xuICAgIH0pXG4gICAgLmRlc2VyaWFsaXplKCAoa2V5LCBzdGF0ZVZhbHVlLCBjdHgpID0+IHtcblxuICAgIH0pXG4gICAgLnJlZ2lzdGVyKCk7XG5cbiAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgY3JlYXRlU3RhdGVDaHVua0hhbmRsZXIoJ21ldGFHcm91cENvbHVtbicpXG4gICAgLnJlcXVpcmVkS2V5cygncHJvcCcsICdyb3dJbmRleCcsICdzcGFuJylcbiAgICAuaGFuZGxlS2V5cyhcbiAgICAgICdpZCcsICdsYWJlbCcsICdjc3MnLCAndHlwZScsICd3aWR0aCcsICdtaW5XaWR0aCcsICdtYXhXaWR0aCcsICAgICAgICAvLyBQYmxOZ3JpZEJhc2VDb2x1bW5TdGF0ZSAoYWxsIG9wdGlvbmFsKVxuICAgIClcbiAgICAuc2VyaWFsaXplKCAoa2V5LCBjdHgpID0+IHtcbiAgICAgIHJldHVybiBjdHguc291cmNlW2tleV07XG4gICAgfSlcbiAgICAuZGVzZXJpYWxpemUoIChrZXksIHN0YXRlVmFsdWUsIGN0eCkgPT4ge1xuXG4gICAgfSlcbiAgICAucmVnaXN0ZXIoKTtcbn1cbiJdfQ==