(function (angular) {
	'use strict';
	
	// TODO: use component instead directive
	
	angular
		.module('app.ui.components')
		.directive('specieDetail', SpecieDetailDirective);

	function SpecieDetailDirective($timeout) {
		var headingTemplate, descriptionTemplate, htmlTemplate;
	

		headingTemplate = [
			'<h3 ng-bind="model.name" class="title" />',
		].join('');

		descriptionTemplate = [
			'<div class="row"><div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'classification\')" class="text-capitalize" />',
			'<dd ng-bind="model.classification" />',
			'<dt ng-bind="getPropertyName(\'designation\')" class="text-capitalize" />',
			'<dd ng-bind="model.designation" />',
			'<dt ng-bind="getPropertyName(\'average_height\')" class="text-capitalize" />',
			'<dd ng-bind="model.average_height" />',
			'<dt ng-bind="getPropertyName(\'average_lifespan\')" class="text-capitalize" />',
			'<dd ng-bind="model.average_lifespan" />',
			'<dt ng-bind="getPropertyName(\'language\')" class="text-capitalize" />',
			'<dd ng-bind="model.language" />',
			'</dl>',
			'</div>',
			'<div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'eye_colors\')" class="text-capitalize" />',
			'<dd ng-bind="model.eye_colors" />',
			'<dt ng-bind="getPropertyName(\'hair_colors\')" class="text-capitalize" />',
			'<dd ng-bind="model.hair_colors" />',
			'<dt ng-bind="getPropertyName(\'skin_colors\')" class="text-capitalize" />',
			'<dd ng-bind="model.skin_colors" />',
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
			console.debug('SpecieDetailDirective', scope, element, attrs);
		}
	}
})(window.angular);

// name string -- The name of this species.
// classification string -- The classification of this species, such as "mammal" or "reptile".
// designation string -- The designation of this species, such as "sentient".
// average_height string -- The average height of this species in centimeters.
// average_lifespan string -- The average lifespan of this species in years.
// eye_colors string -- A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes.
// hair_colors string -- A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair.
// skin_colors string -- A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin.
// language string -- The language commonly spoken by this species.
// homeworld string -- The URL of a planet resource, a planet that this species originates from.
// people array -- An array of People URL Resources that are a part of this species.
// films array -- An array of Film URL Resources that this species has appeared in.
// url string -- the hypermedia URL of this resource.
// created string -- the ISO 8601 date format of the time that this resource was created.
// edited string -- the ISO 8601 date format of the time that this resource was edited.