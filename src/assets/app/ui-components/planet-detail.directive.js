(function (angular) {
	'use strict';
	
	// TODO: use component instead directive
	
	angular
		.module('app.ui.components')
		.directive('planetDetail', PlanetDetailDirective);

	function PlanetDetailDirective($timeout) {
		var headingTemplate, descriptionTemplate, htmlTemplate;
	

		headingTemplate = [
			'<h3 ng-bind="model.name" class="title" />',
		].join('');

		descriptionTemplate = [
			'<div class="row"><div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'diameter\')" class="text-capitalize" />',
			'<dd ng-bind="model.diameter" />',
			'<dt ng-bind="getPropertyName(\'rotation_period\')" class="text-capitalize" />',
			'<dd ng-bind="model.rotation_period" />',
			'<dt ng-bind="getPropertyName(\'orbital_period\')" class="text-capitalize" />',
			'<dd ng-bind="model.orbital_period | currency" />',
			'<dt ng-bind="getPropertyName(\'gravity\')" class="text-capitalize" />',
			'<dd ng-bind="model.gravity" />',
			'</dl>',
			'</div>',
			'<div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'population\')" class="text-capitalize" />',
			'<dd ng-bind="model.population" />',
			'<dt ng-bind="getPropertyName(\'climate\')" class="text-capitalize" />',
			'<dd ng-bind="model.climate" />',
			'<dt ng-bind="getPropertyName(\'terrain\')" class="text-capitalize" />',
			'<dd ng-bind="model.terrain" />',
			'<dt ng-bind="getPropertyName(\'surface_water\')" class="text-capitalize" />',
			'<dd ng-bind="model.surface_water" />',
			'</dl>',
			'</div>',
			'</div>',
		].join('');

		htmlTemplate = [
			'<uib-accordion>',
			'<div uib-accordion-group class="panel-default list-item-detail starhip-detail">',
			'<uib-accordion><uib-accordion-group>',
			'<uib-accordion-heading>',
			headingTemplate,
			'</uib-accordion-heading>',
			descriptionTemplate,
			'</uib-accordion>',
			'</div>'
		].join('');

		return {
			template: htmlTemplate,
			//link: linkFn,
			controller: ['$scope', directiveController],
			retrict: 'E',
			scope: {
				model: '='
			}
		};

		function directiveController($scope) {
			$scope.getPropertyName = getPropertyName;


			function getPropertyName(property) {
				var output;
				try {
					output = (property || '').split('_').join(' ');
				} catch (err) {
					console.warn('directiveController.getPropertyName()', err);
				}
				return output;
			}
		}

		function linkFn(scope, element, attrs) {
			console.debug('PlanetDetailDirective', scope, element, attrs);
		}
	}
})(window.angular);

// name string -- The name of this planet.
// diameter string -- The diameter of this planet in kilometers.
// rotation_period string -- The number of standard hours it takes for this planet to complete a single rotation on its axis.
// orbital_period string -- The number of standard days it takes for this planet to complete a single orbit of its local star.
// gravity string -- A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.
// population string -- The average population of sentient beings inhabiting this planet.
// climate string -- The climate of this planet. Comma separated if diverse.
// terrain string -- The terrain of this planet. Comma separated if diverse.
// surface_water string -- The percentage of the planet surface that is naturally occurring water or bodies of water.
// residents array -- An array of People URL Resources that live on this planet.
// films array -- An array of Film URL Resources that this planet has appeared in.
// url string -- the hypermedia URL of this resource.
// created string -- the ISO 8601 date format of the time that this resource was created.
// edited string -- the ISO 8601 date format of the time that this resource was edited.