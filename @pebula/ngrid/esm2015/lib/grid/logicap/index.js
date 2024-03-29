import { noDataViewLogicap } from './no-data-view';
import { bindRegistryLogicap } from './bind-registry';
import { paginationViewLogicap } from './pagination-view';
export function logicap(extApi) {
    return {
        bindRegistry: bindRegistryLogicap(extApi),
        noData: noDataViewLogicap(extApi),
        pagination: paginationViewLogicap(extApi),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL3NyYy9saWIvZ3JpZC9sb2dpY2FwL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBUTFELE1BQU0sVUFBVSxPQUFPLENBQUMsTUFBb0M7SUFDMUQsT0FBTztRQUNMLFlBQVksRUFBRSxtQkFBbUIsQ0FBQyxNQUFNLENBQUM7UUFDekMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztRQUNqQyxVQUFVLEVBQUUscUJBQXFCLENBQUMsTUFBTSxDQUFDO0tBQzFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRJbnRlcm5hbEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgbm9EYXRhVmlld0xvZ2ljYXAgfSBmcm9tICcuL25vLWRhdGEtdmlldyc7XG5pbXBvcnQgeyBiaW5kUmVnaXN0cnlMb2dpY2FwIH0gZnJvbSAnLi9iaW5kLXJlZ2lzdHJ5JztcbmltcG9ydCB7IHBhZ2luYXRpb25WaWV3TG9naWNhcCB9IGZyb20gJy4vcGFnaW5hdGlvbi12aWV3JztcblxuZXhwb3J0IGludGVyZmFjZSBMb2dpY2FwcyB7XG4gIGJpbmRSZWdpc3RyeTogUmV0dXJuVHlwZTx0eXBlb2YgYmluZFJlZ2lzdHJ5TG9naWNhcD47XG4gIG5vRGF0YTogUmV0dXJuVHlwZTx0eXBlb2Ygbm9EYXRhVmlld0xvZ2ljYXA+O1xuICBwYWdpbmF0aW9uOiBSZXR1cm5UeXBlPHR5cGVvZiBwYWdpbmF0aW9uVmlld0xvZ2ljYXA+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9naWNhcChleHRBcGk6IFBibE5ncmlkSW50ZXJuYWxFeHRlbnNpb25BcGkpOiBMb2dpY2FwcyB7XG4gIHJldHVybiB7XG4gICAgYmluZFJlZ2lzdHJ5OiBiaW5kUmVnaXN0cnlMb2dpY2FwKGV4dEFwaSksXG4gICAgbm9EYXRhOiBub0RhdGFWaWV3TG9naWNhcChleHRBcGkpLFxuICAgIHBhZ2luYXRpb246IHBhZ2luYXRpb25WaWV3TG9naWNhcChleHRBcGkpLFxuICB9O1xufVxuIl19