angular.module('fishHappensApp')
	.directive('loca', loca);

function loca() {
	let directive = {
		restrict: 'E',
		replace: true,
		templateUrl: 'templates/locaDirective.html',
		scope: {
			location: '=',
		}
	};
	return directive;
}
