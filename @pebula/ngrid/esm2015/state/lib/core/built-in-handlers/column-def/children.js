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
    (key, ctx) => {
        /** @type {?} */
        const c = ctx.data.activeColumn || ctx.data.pblColumn;
        if (c) {
            switch (key) {
                case 'prop':
                    return c.orgProp;
                default:
                    break;
            }
        }
        /** @type {?} */
        const value = c ? c[key] : ctx.source[key];
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
    (key, stateValue, ctx) => {
        const { activeColumn } = ctx.data;
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
                    const typeValue = ctx.source[key];
                    /** @type {?} */
                    const stateTypeDef = (/** @type {?} */ (stateValue));
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
    (key, ctx) => {
        /** @type {?} */
        const active = ctx.data.active || ctx.source;
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
    (key, stateValue, ctx) => {
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
    (key, ctx) => {
        return ctx.source[key];
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    (key, stateValue, ctx) => {
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
    (key, ctx) => {
        return ctx.source[key];
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    (key, stateValue, ctx) => {
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
    (key, ctx) => {
        return ctx.source[key];
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    (key, stateValue, ctx) => {
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
    (key, ctx) => {
        return ctx.source[key];
    }))
        .deserialize((/**
     * @param {?} key
     * @param {?} stateValue
     * @param {?} ctx
     * @return {?}
     */
    (key, stateValue, ctx) => {
    }))
        .register();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpbGRyZW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvYnVpbHQtaW4taGFuZGxlcnMvY29sdW1uLWRlZi9jaGlsZHJlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRXpELE1BQU0sVUFBVSw4QkFBOEI7SUFDNUMsNEpBQTRKO0lBRTVKLHVCQUF1QixDQUFDLFlBQVksQ0FBQztTQUNsQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztTQUMxQixVQUFVLENBQ1QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQWUseUNBQXlDO0lBQy9HLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFJLGVBQWU7S0FDdEY7U0FDQSxTQUFTOzs7OztJQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFOztjQUNqQixDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTO1FBQ3JELElBQUksQ0FBQyxFQUFFO1lBQ0wsUUFBUSxHQUFHLEVBQUU7Z0JBQ1gsS0FBSyxNQUFNO29CQUNULE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDbkI7b0JBQ0UsTUFBTTthQUNUO1NBQ0Y7O2NBRUssS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUUxQyxRQUFRLEdBQUcsRUFBRTtZQUNYLEtBQUssTUFBTTtnQkFDVCxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVMsRUFBRTtvQkFDOUIsT0FBTyxLQUFL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Q0FBQyxDQUFDO0lBQ3pCLENBQUMsRUFBQztTQUNELFdBQVc7Ozs7OztJQUFFLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUV2QyxDQUFDLEVBQUM7U0FDRCxRQUFRLEVBQUUsQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsQ29sdW1uVHlwZURlZmluaXRpb24sIFBibENvbHVtbiwgUGJsQ29sdW1uRGVmaW5pdGlvbiwgUGJsTWV0YVJvd0RlZmluaXRpb25zIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBjcmVhdGVTdGF0ZUNodW5rSGFuZGxlciB9IGZyb20gJy4uLy4uL2hhbmRsaW5nJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQ29sdW1uRGVmQ2hpbGRIYW5kbGVycygpIHtcbiAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgY3JlYXRlU3RhdGVDaHVua0hhbmRsZXIoJ2RhdGFDb2x1bW4nKVxuICAgIC5yZXF1aXJlZEtleXMoJ2lkJywgJ3Byb3AnKVxuICAgIC5oYW5kbGVLZXlzKFxuICAgICAgJ2xhYmVsJywgJ2NzcycsICd0eXBlJywgJ3dpZHRoJywgJ21pbldpZHRoJywgJ21heFdpZHRoJywgICAgICAgICAgICAgIC8vIFBibE5ncmlkQmFzZUNvbHVtblN0YXRlIChhbGwgb3B0aW9uYWwpXG4gICAgICAnaGVhZGVyVHlwZScsICdmb290ZXJUeXBlJywgJ3NvcnQnLCAnc29ydEFsaWFzJywgJ2VkaXRhYmxlJywgJ3BpbicgICAgLy8gQWxsIE9wdGlvbmFsXG4gICAgKVxuICAgIC5zZXJpYWxpemUoIChrZXksIGN0eCkgPT4ge1xuICAgICAgY29uc3QgYyA9IGN0eC5kYXRhLmFjdGl2ZUNvbHVtbiB8fCBjdHguZGF0YS5wYmxDb2x1bW47XG4gICAgICBpZiAoYykge1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgIGNhc2UgJ3Byb3AnOlxuICAgICAgICAgICAgcmV0dXJuIGMub3JnUHJvcDtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsdWUgPSBjID8gY1trZXldIDogY3R4LnNvdXJjZVtrZXldO1xuXG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlICdzb3J0JzpcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0pXG4gICAgLmRlc2VyaWFsaXplKCAoa2V5LCBzdGF0ZVZhbHVlLCBjdHgpID0+IHtcbiAgICAgIGNvbnN0IHsgYWN0aXZlQ29sdW1uIH0gPSBjdHguZGF0YTtcbiAgICAgIGlmIChhY3RpdmVDb2x1bW4pIHtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICBjYXNlICd3aWR0aCc6XG4gICAgICAgICAgICBhY3RpdmVDb2x1bW4udXBkYXRlV2lkdGgoc3RhdGVWYWx1ZSBhcyBhbnkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjdHguc291cmNlKSB7XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgY2FzZSAncHJvcCc6XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgY2FzZSAndHlwZSc6XG4gICAgICAgICAgY2FzZSAnaGVhZGVyVHlwZSc6XG4gICAgICAgICAgY2FzZSAnZm9vdGVyVHlwZSc6XG4gICAgICAgICAgICBjb25zdCB0eXBlVmFsdWUgPSBjdHguc291cmNlW2tleV07XG4gICAgICAgICAgICBjb25zdCBzdGF0ZVR5cGVEZWY6IFBibENvbHVtblR5cGVEZWZpbml0aW9uID0gc3RhdGVWYWx1ZSBhcyBhbnk7XG4gICAgICAgICAgICBpZiAoc3RhdGVUeXBlRGVmICYmIHR5cGVvZiBzdGF0ZVR5cGVEZWYgIT09ICdzdHJpbmcnICYmIHR5cGVWYWx1ZSAmJiB0eXBlb2YgdHlwZVZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICB0eXBlVmFsdWUubmFtZSA9IHN0YXRlVHlwZURlZi5uYW1lO1xuICAgICAgICAgICAgICBpZiAoc3RhdGVUeXBlRGVmLmRhdGEpIHtcbiAgICAgICAgICAgICAgICB0eXBlVmFsdWUuZGF0YSA9IE9iamVjdC5hc3NpZ24odHlwZVZhbHVlLmRhdGEgfHwge30sIHN0YXRlVHlwZURlZi5kYXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG11c3QgYXNzZXJ0IHRoZSB0eXBlIHN0YXJ0aW5nIGZyb20gMy41IG9ud2FyZHNcbiAgICAgICAgLy8gU2VlIFwiRml4ZXMgdG8gdW5zb3VuZCB3cml0ZXMgdG8gaW5kZXhlZCBhY2Nlc3MgdHlwZXNcIiBpbiBodHRwczovL2RldmJsb2dzLm1pY3Jvc29mdC5jb20vdHlwZXNjcmlwdC9hbm5vdW5jaW5nLXR5cGVzY3JpcHQtMy01XG4gICAgICAgIGN0eC5zb3VyY2Vba2V5IGFzIGFueV0gPSBzdGF0ZVZhbHVlO1xuICAgICAgfVxuXG4gICAgfSlcbiAgICAucmVnaXN0ZXIoKTtcblxuICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICBjcmVhdGVTdGF0ZUNodW5rSGFuZGxlcignZGF0YU1ldGFSb3cnKVxuICAgIC5oYW5kbGVLZXlzKCdyb3dDbGFzc05hbWUnLCAndHlwZScpICAgIC8vIEFsbCBPcHRpb25hbFxuICAgIC5zZXJpYWxpemUoIChrZXksIGN0eCkgPT4ge1xuICAgICAgY29uc3QgYWN0aXZlID0gY3R4LmRhdGEuYWN0aXZlIHx8IGN0eC5zb3VyY2U7XG4gICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgIHJldHVybiBhY3RpdmVba2V5XTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5kZXNlcmlhbGl6ZSggKGtleSwgc3RhdGVWYWx1ZSwgY3R4KSA9PiB7XG4gICAgICAvLyBXZSBtdXN0IGFzc2VydCB0aGUgdHlwZSBzdGFydGluZyBmcm9tIDMuNSBvbndhcmRzXG4gICAgICAvLyBTZWUgXCJGaXhlcyB0byB1bnNvdW5kIHdyaXRlcyB0byBpbmRleGVkIGFjY2VzcyB0eXBlc1wiIGluIGh0dHBzOi8vZGV2YmxvZ3MubWljcm9zb2Z0LmNvbS90eXBlc2NyaXB0L2Fubm91bmNpbmctdHlwZXNjcmlwdC0zLTVcbiAgICAgIGN0eC5zb3VyY2Vba2V5XSA9IHN0YXRlVmFsdWUgYXMgYW55O1xuICAgIH0pXG4gICAgLnJlZ2lzdGVyKCk7XG5cblxuICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICBjcmVhdGVTdGF0ZUNodW5rSGFuZGxlcignbWV0YVJvdycpXG4gICAgLy8gTm90ZSB0aGF0IHdlIGFyZSBub3QgaGFuZGxpbmcgYGNvbHNgLCB0aGlzIHNob3VsZCBiZSBjYWxsZWQgZnJvbSB0aGUgcGFyZW50LCBhcyBhIGRpZmZlcmVudCBjaGlsZCBjaHVuayBoYW5kbGluZyBwcm9jZXNzIGZvciBlYWNoIGNvbHVtblxuICAgIC5oYW5kbGVLZXlzKFxuICAgICAgJ3Jvd0NsYXNzTmFtZScsICd0eXBlJywgICAgLy8gQWxsIE9wdGlvbmFsIGxpa2UgZGF0YU1ldGFSb3dcbiAgICAgICdyb3dJbmRleCcsICAgICAgICAgICAgICAgIC8vIFJlcXVpcmVkXG4gICAgICApXG4gICAgLnNlcmlhbGl6ZSggKGtleSwgY3R4KSA9PiB7XG4gICAgICByZXR1cm4gY3R4LnNvdXJjZVtrZXldO1xuICAgIH0pXG4gICAgLmRlc2VyaWFsaXplKCAoa2V5LCBzdGF0ZVZhbHVlLCBjdHgpID0+IHtcblxuICAgIH0pXG4gICAgLnJlZ2lzdGVyKCk7XG5cbiAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgY3JlYXRlU3RhdGVDaHVua0hhbmRsZXIoJ21ldGFHcm91cFJvdycpXG4gICAgLy8gTm90ZSB0aGF0IHdlIGFyZSBub3QgaGFuZGxpbmcgYGNvbHNgLCB0aGlzIHNob3VsZCBiZSBjYWxsZWQgZnJvbSB0aGUgcGFyZW50LCBhcyBhIGRpZmZlcmVudCBjaGlsZCBjaHVuayBoYW5kbGluZyBwcm9jZXNzIGZvciBlYWNoIGNvbHVtblxuICAgIC5oYW5kbGVLZXlzKFxuICAgICAgJ3Jvd0NsYXNzTmFtZScsICd0eXBlJywgICAgLy8gQWxsIE9wdGlvbmFsIGxpa2UgZGF0YU1ldGFSb3dcbiAgICAgICdyb3dJbmRleCcsICAgICAgICAgICAgICAgIC8vIFJlcXVpcmVkXG4gICAgICApXG4gICAgLnNlcmlhbGl6ZSggKGtleSwgY3R4KSA9PiB7XG4gICAgICByZXR1cm4gY3R4LnNvdXJjZVtrZXldO1xuICAgIH0pXG4gICAgLmRlc2VyaWFsaXplKCAoa2V5LCBzdGF0ZVZhbHVlLCBjdHgpID0+IHtcblxuICAgIH0pXG4gICAgLnJlZ2lzdGVyKCk7XG5cbiAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgY3JlYXRlU3RhdGVDaHVua0hhbmRsZXIoJ21ldGFDb2x1bW4nKVxuICAgIC5yZXF1aXJlZEtleXMoJ2tpbmQnLCAncm93SW5kZXgnKVxuICAgIC5oYW5kbGVLZXlzKFxuICAgICAgJ2lkJywgJ2xhYmVsJywgJ2NzcycsICd0eXBlJywgJ3dpZHRoJywgJ21pbldpZHRoJywgJ21heFdpZHRoJywgICAgICAgIC8vIFBibE5ncmlkQmFzZUNvbHVtblN0YXRlIChhbGwgb3B0aW9uYWwpXG4gICAgKVxuICAgIC5zZXJpYWxpemUoIChrZXksIGN0eCkgPT4ge1xuICAgICAgcmV0dXJuIGN0eC5zb3VyY2Vba2V5XTtcbiAgICB9KVxuICAgIC5kZXNlcmlhbGl6ZSggKGtleSwgc3RhdGVWYWx1ZSwgY3R4KSA9PiB7XG5cbiAgICB9KVxuICAgIC5yZWdpc3RlcigpO1xuXG4gIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gIGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyKCdtZXRhR3JvdXBDb2x1bW4nKVxuICAgIC5yZXF1aXJlZEtleXMoJ3Byb3AnLCAncm93SW5kZXgnLCAnc3BhbicpXG4gICAgLmhhbmRsZUtleXMoXG4gICAgICAnaWQnLCAnbGFiZWwnLCAnY3NzJywgJ3R5cGUnLCAnd2lkdGgnLCAnbWluV2lkdGgnLCAnbWF4V2lkdGgnLCAgICAgICAgLy8gUGJsTmdyaWRCYXNlQ29sdW1uU3RhdGUgKGFsbCBvcHRpb25hbClcbiAgICApXG4gICAgLnNlcmlhbGl6ZSggKGtleSwgY3R4KSA9PiB7XG4gICAgICByZXR1cm4gY3R4LnNvdXJjZVtrZXldO1xuICAgIH0pXG4gICAgLmRlc2VyaWFsaXplKCAoa2V5LCBzdGF0ZVZhbHVlLCBjdHgpID0+IHtcblxuICAgIH0pXG4gICAgLnJlZ2lzdGVyKCk7XG59XG4iXX0=