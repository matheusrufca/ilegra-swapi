(function (angular) {
	'use strict';


	angular
		.module('app.ui.components')
		.directive('starshipDetail', StarshipDetailDirective);

	function StarshipDetailDirective($timeout) {
		var headingTemplate, descriptionTemplate, htmlTemplate;


	

		headingTemplate = [
			'<h3 class="panel-heading">',
			'<span ng-bind="starship.name"></span> <small ng-bind="starship.model"></small>',
			'</h3>',
		].join('');

		descriptionTemplate = [
			'<div class="row"><div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'starship_class\')" class="text-capitalize" />',
			'<dd ng-bind="starship.starship_class" />',
			'<dt ng-bind="getPropertyName(\'manufacturer\')" class="text-capitalize" />',
			'<dd ng-bind="starship.manufacturer" />',
			'<dt ng-bind="getPropertyName(\'cost_in_credits\')" class="text-capitalize" />',
			'<dd ng-bind="starship.cost_in_credits | currency" />',
			'<dt ng-bind="getPropertyName(\'length\')" class="text-capitalize" />',
			'<dd ng-bind="starship.length" />',
			'</dl>',
			'</div>',
			'<div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'crew\')" class="text-capitalize" />',
			'<dd ng-bind="starship.crew" />',
			'<dt ng-bind="getPropertyName(\'passengers\')" class="text-capitalize" />',
			'<dd ng-bind="starship.passengers" />',
			'<dt ng-bind="getPropertyName(\'max_atmosphering_speed\')" class="text-capitalize" />',
			'<dd ng-bind="starship.max_atmosphering_speed" />',
			'<dt ng-bind="getPropertyName(\'hyperdrive_rating\')" class="text-capitalize" />',
			'<dd ng-bind="starship.hyperdrive_rating" />',
			'</dl>',
			'</div>',
			'</div>',
		].join('')



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
			link: linkFn,
			controller: ['$scope', directiveController],
			retrict: 'E',
			scope: {
				starship: '='
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
			console.debug('StarshipDetailDirective', scope, element, attrs);
		}
	}
})(window.angular);


// name string -- The name of this starship. The common name, such as "Death Star".
// model string -- The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station".
// starship_class string -- The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation"
// manufacturer string -- The manufacturer of this starship. Comma separated if more than one.
// cost_in_credits string -- The cost of this starship new, in galactic credits.
// length string -- The length of this starship in meters.
// crew string -- The number of personnel needed to run or pilot this starship.
// passengers string -- The number of non-essential people this starship can transport.
// max_atmosphering_speed string -- The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight.
// hyperdrive_rating string -- The class of this starships hyperdrive.
// MGLT string -- The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.
// cargo_capacity string -- The maximum number of kilograms that this starship can transport.
// consumables *string
// The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.
// films array -- An array of Film URL Resources that this starship has appeared in.
// pilots array -- An array of People URL Resources that this starship has been piloted by.
// url string -- the hypermedia URL of this resource.
// created string -- the ISO 8601 date format of the time that this resource was created.
// edited string -- the ISO 8601 date format of the time that this resource was edited.