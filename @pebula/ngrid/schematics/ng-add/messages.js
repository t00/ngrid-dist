"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsupportedStyles = exports.noProject = void 0;
function noProject(project) {
    return `Unable to find project '${project}' in the workspace`;
}
exports.noProject = noProject;
function unsupportedStyles(styleFilePath) {
    return `Project style file found has unsupported extension: '${styleFilePath}'\nAdding 'bootstrap.min.css' to 'angular.json'`;
}
exports.unsupportedStyles = unsupportedStyles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL3NjaGVtYXRpY3MvbmctYWRkL21lc3NhZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLFNBQVMsQ0FBQyxPQUFlO0lBQ3ZDLE9BQU8sMkJBQTJCLE9BQU8sb0JBQW9CLENBQUM7QUFDaEUsQ0FBQztBQUZELDhCQUVDO0FBRUQsU0FBZ0IsaUJBQWlCLENBQUMsYUFBcUI7SUFDckQsT0FBTyx3REFBd0QsYUFBYSxpREFBaUQsQ0FBQztBQUNoSSxDQUFDO0FBRkQsOENBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gbm9Qcm9qZWN0KHByb2plY3Q6IHN0cmluZykge1xuICByZXR1cm4gYFVuYWJsZSB0byBmaW5kIHByb2plY3QgJyR7cHJvamVjdH0nIGluIHRoZSB3b3Jrc3BhY2VgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zdXBwb3J0ZWRTdHlsZXMoc3R5bGVGaWxlUGF0aDogc3RyaW5nKSB7XG4gIHJldHVybiBgUHJvamVjdCBzdHlsZSBmaWxlIGZvdW5kIGhhcyB1bnN1cHBvcnRlZCBleHRlbnNpb246ICcke3N0eWxlRmlsZVBhdGh9J1xcbkFkZGluZyAnYm9vdHN0cmFwLm1pbi5jc3MnIHRvICdhbmd1bGFyLmpzb24nYDtcbn1cbiJdfQ==