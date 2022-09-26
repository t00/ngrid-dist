"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectStyleFile = exports.getProjectTargetOptions = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
// Regular expression that matches all possible Angular CLI default style files
const defaultStyleFileRegex = /styles\.(c|le|sc|sa)ss/;
// Regular expression that matches all files that have a proper stylesheet extension
const validStyleFileRegex = /\.(c|le|sc|sa)ss/;
/**
 * Resolves options for the build target of the given project
 */
function getProjectTargetOptions(project, buildTarget) {
    const buildTargetObject = project.targets.get(buildTarget);
    if (buildTargetObject && buildTargetObject.options) {
        return buildTargetObject.options;
    }
    throw new schematics_1.SchematicsException(`Cannot determine project target configuration for: ${buildTarget}.`);
}
exports.getProjectTargetOptions = getProjectTargetOptions;
/**
 * Gets a style file with the given extension in a project and returns its path. If no
 * extension is specified, any style file with a valid extension will be returned.
 */
function getProjectStyleFile(project, extension) {
    const buildOptions = getProjectTargetOptions(project, 'build');
    if (buildOptions.styles && Array.isArray(buildOptions.styles) && buildOptions.styles.length) {
        const styles = buildOptions.styles.map((s) => typeof s === 'string' ? s : s['input']);
        // Look for the default style file that is generated for new projects by the Angular CLI. This
        // default style file is usually called `styles.ext` unless it has been changed explicitly.
        const defaultMainStylePath = styles.find((file) => extension ? file === `styles.${extension}` : defaultStyleFileRegex.test(file));
        if (defaultMainStylePath) {
            return core_1.normalize(defaultMainStylePath);
        }
        // If no default style file could be found, use the first style file that matches the given
        // extension. If no extension specified explicitly, we look for any file with a valid style
        // file extension.
        const fallbackStylePath = styles.find((file) => extension ? file.endsWith(`.${extension}`) : validStyleFileRegex.test(file));
        if (fallbackStylePath) {
            return core_1.normalize(fallbackStylePath);
        }
    }
    return null;
}
exports.getProjectStyleFile = getProjectStyleFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQvc2NoZW1hdGljcy91dGlscy9wcm9qZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUEyRDtBQUMzRCwyREFBK0Q7QUFFL0QsK0VBQStFO0FBQy9FLE1BQU0scUJBQXFCLEdBQUcsd0JBQXdCLENBQUM7QUFFdkQsb0ZBQW9GO0FBQ3BGLE1BQU0sbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7QUFFL0M7O0dBRUc7QUFDSCxTQUFnQix1QkFBdUIsQ0FBQyxPQUFxQyxFQUFFLFdBQW1CO0lBQ2hHLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0QsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLEVBQUU7UUFDbEQsT0FBTyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7S0FDbEM7SUFFRCxNQUFNLElBQUksZ0NBQW1CLENBQUMsc0RBQXNELFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDdEcsQ0FBQztBQVBELDBEQU9DO0FBR0Q7OztHQUdHO0FBQ0gsU0FBZ0IsbUJBQW1CLENBQUMsT0FBcUMsRUFBRSxTQUFrQjtJQUMzRixNQUFNLFlBQVksR0FBRyx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFL0QsSUFBSSxZQUFZLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1FBQzNGLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFeEYsOEZBQThGO1FBQzlGLDJGQUEyRjtRQUMzRixNQUFNLG9CQUFvQixHQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxVQUFVLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUV6RyxJQUFJLG9CQUFvQixFQUFFO1lBQ3hCLE9BQU8sZ0JBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsMkZBQTJGO1FBQzNGLDJGQUEyRjtRQUMzRixrQkFBa0I7UUFDbEIsTUFBTSxpQkFBaUIsR0FDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFdkcsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQixPQUFPLGdCQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUNyQztLQUNGO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBM0JELGtEQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7bm9ybWFsaXplLCB3b3Jrc3BhY2VzfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQge1NjaGVtYXRpY3NFeGNlcHRpb259IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcblxuLy8gUmVndWxhciBleHByZXNzaW9uIHRoYXQgbWF0Y2hlcyBhbGwgcG9zc2libGUgQW5ndWxhciBDTEkgZGVmYXVsdCBzdHlsZSBmaWxlc1xuY29uc3QgZGVmYXVsdFN0eWxlRmlsZVJlZ2V4ID0gL3N0eWxlc1xcLihjfGxlfHNjfHNhKXNzLztcblxuLy8gUmVndWxhciBleHByZXNzaW9uIHRoYXQgbWF0Y2hlcyBhbGwgZmlsZXMgdGhhdCBoYXZlIGEgcHJvcGVyIHN0eWxlc2hlZXQgZXh0ZW5zaW9uXG5jb25zdCB2YWxpZFN0eWxlRmlsZVJlZ2V4ID0gL1xcLihjfGxlfHNjfHNhKXNzLztcblxuLyoqXG4gKiBSZXNvbHZlcyBvcHRpb25zIGZvciB0aGUgYnVpbGQgdGFyZ2V0IG9mIHRoZSBnaXZlbiBwcm9qZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9qZWN0VGFyZ2V0T3B0aW9ucyhwcm9qZWN0OiB3b3Jrc3BhY2VzLlByb2plY3REZWZpbml0aW9uLCBidWlsZFRhcmdldDogc3RyaW5nKSB7XG4gIGNvbnN0IGJ1aWxkVGFyZ2V0T2JqZWN0ID0gcHJvamVjdC50YXJnZXRzLmdldChidWlsZFRhcmdldCk7XG4gIGlmIChidWlsZFRhcmdldE9iamVjdCAmJiBidWlsZFRhcmdldE9iamVjdC5vcHRpb25zKSB7XG4gICAgcmV0dXJuIGJ1aWxkVGFyZ2V0T2JqZWN0Lm9wdGlvbnM7XG4gIH1cblxuICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihgQ2Fubm90IGRldGVybWluZSBwcm9qZWN0IHRhcmdldCBjb25maWd1cmF0aW9uIGZvcjogJHtidWlsZFRhcmdldH0uYCk7XG59XG5cblxuLyoqXG4gKiBHZXRzIGEgc3R5bGUgZmlsZSB3aXRoIHRoZSBnaXZlbiBleHRlbnNpb24gaW4gYSBwcm9qZWN0IGFuZCByZXR1cm5zIGl0cyBwYXRoLiBJZiBub1xuICogZXh0ZW5zaW9uIGlzIHNwZWNpZmllZCwgYW55IHN0eWxlIGZpbGUgd2l0aCBhIHZhbGlkIGV4dGVuc2lvbiB3aWxsIGJlIHJldHVybmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvamVjdFN0eWxlRmlsZShwcm9qZWN0OiB3b3Jrc3BhY2VzLlByb2plY3REZWZpbml0aW9uLCBleHRlbnNpb24/OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgY29uc3QgYnVpbGRPcHRpb25zID0gZ2V0UHJvamVjdFRhcmdldE9wdGlvbnMocHJvamVjdCwgJ2J1aWxkJyk7XG5cbiAgaWYgKGJ1aWxkT3B0aW9ucy5zdHlsZXMgJiYgQXJyYXkuaXNBcnJheShidWlsZE9wdGlvbnMuc3R5bGVzKSAmJiBidWlsZE9wdGlvbnMuc3R5bGVzLmxlbmd0aCkge1xuICAgIGNvbnN0IHN0eWxlcyA9IGJ1aWxkT3B0aW9ucy5zdHlsZXMubWFwKChzKSA9PiB0eXBlb2YgcyA9PT0gJ3N0cmluZycgPyBzIDogcyAhWydpbnB1dCddKTtcblxuICAgIC8vIExvb2sgZm9yIHRoZSBkZWZhdWx0IHN0eWxlIGZpbGUgdGhhdCBpcyBnZW5lcmF0ZWQgZm9yIG5ldyBwcm9qZWN0cyBieSB0aGUgQW5ndWxhciBDTEkuIFRoaXNcbiAgICAvLyBkZWZhdWx0IHN0eWxlIGZpbGUgaXMgdXN1YWxseSBjYWxsZWQgYHN0eWxlcy5leHRgIHVubGVzcyBpdCBoYXMgYmVlbiBjaGFuZ2VkIGV4cGxpY2l0bHkuXG4gICAgY29uc3QgZGVmYXVsdE1haW5TdHlsZVBhdGggPVxuICAgICAgICBzdHlsZXMuZmluZCgoZmlsZSkgPT4gZXh0ZW5zaW9uID8gZmlsZSA9PT0gYHN0eWxlcy4ke2V4dGVuc2lvbn1gIDogZGVmYXVsdFN0eWxlRmlsZVJlZ2V4LnRlc3QoZmlsZSkpO1xuXG4gICAgaWYgKGRlZmF1bHRNYWluU3R5bGVQYXRoKSB7XG4gICAgICByZXR1cm4gbm9ybWFsaXplKGRlZmF1bHRNYWluU3R5bGVQYXRoKTtcbiAgICB9XG5cbiAgICAvLyBJZiBubyBkZWZhdWx0IHN0eWxlIGZpbGUgY291bGQgYmUgZm91bmQsIHVzZSB0aGUgZmlyc3Qgc3R5bGUgZmlsZSB0aGF0IG1hdGNoZXMgdGhlIGdpdmVuXG4gICAgLy8gZXh0ZW5zaW9uLiBJZiBubyBleHRlbnNpb24gc3BlY2lmaWVkIGV4cGxpY2l0bHksIHdlIGxvb2sgZm9yIGFueSBmaWxlIHdpdGggYSB2YWxpZCBzdHlsZVxuICAgIC8vIGZpbGUgZXh0ZW5zaW9uLlxuICAgIGNvbnN0IGZhbGxiYWNrU3R5bGVQYXRoID1cbiAgICAgICAgc3R5bGVzLmZpbmQoKGZpbGUpID0+IGV4dGVuc2lvbiA/IGZpbGUuZW5kc1dpdGgoYC4ke2V4dGVuc2lvbn1gKSA6IHZhbGlkU3R5bGVGaWxlUmVnZXgudGVzdChmaWxlKSk7XG5cbiAgICBpZiAoZmFsbGJhY2tTdHlsZVBhdGgpIHtcbiAgICAgIHJldHVybiBub3JtYWxpemUoZmFsbGJhY2tTdHlsZVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuIl19