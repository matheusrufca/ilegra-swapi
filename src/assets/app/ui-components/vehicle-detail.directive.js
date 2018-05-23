(function (angular) {
	'use strict';
	
	// TODO: use component instead directive
	
	angular
		.module('app.ui.components')
		.directive('vehicleDetail', VehicleDetailDirective);

	function VehicleDetailDirective($timeout) {
		var headingTemplate, descriptionTemplate, htmlTemplate;
	

		headingTemplate = [
			'<h3 class="title">',
			'<span ng-bind="model.name"/> <small ng-bind="model.model" />',
			'</h3>',
		].join('');

		descriptionTemplate = [
			'<div class="row"><div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'vehicle_class\')" class="text-capitalize" />',
			'<dd ng-bind="model.vehicle_class " />',
			'<dt ng-bind="getPropertyName(\'manufacturer\')" class="text-capitalize" />',
			'<dd ng-bind="model.manufacturer " />',
			'<dt ng-bind="getPropertyName(\'length\')" class="text-capitalize" />',
			'<dd ng-bind="model.length" />',
			'<dt ng-bind="getPropertyName(\'cost_in_credits\')" class="text-capitalize" />',
			'<dd ng-bind="model.cost_in_credits | currency" />',
			'<dt ng-bind="getPropertyName(\'consumables\')" class="text-capitalize" />',
			'<dd ng-bind="model.consumables" />',
			'</dl>',
			'</div>',
			'<div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'crew\')" class="text-capitalize" />',
			'<dd ng-bind="model.crew" />',
			'<dt ng-bind="getPropertyName(\'passengers\')" class="text-capitalize" />',
			'<dd ng-bind="model.passengers" />',
			'<dt ng-bind="getPropertyName(\'max_atmosphering_speed\')" class="text-capitalize" />',
			'<dd ng-bind="model.max_atmosphering_speed" />',
			'<dt ng-bind="getPropertyName(\'cargo_capacity\')" class="text-capitalize" />',
			'<dd ng-bind="model.cargo_capacity" />',
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
			console.debug('VehicleDetailDirective', scope, element, attrs);
		}
	}
})(window.angular);

// name string -- The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike".
// model string -- The model or official name of this vehicle. Such as "All-Terrain Attack Transport".
// vehicle_class string -- The class of this vehicle, such as "Wheeled" or "Repulsorcraft".
// manufacturer string -- The manufacturer of this vehicle. Comma separated if more than one.
// length string -- The length of this vehicle in meters.
// cost_in_credits string -- The cost of this vehicle new, in Galactic Credits.
// crew string -- The number of personnel needed to run or pilot this vehicle.
// passengers string -- The number of non-essential people this vehicle can transport.
// max_atmosphering_speed string -- The maximum speed of this vehicle in the atmosphere.
// cargo_capacity string -- The maximum number of kilograms that this vehicle can transport.
// consumables *string
// The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply.
// films array -- An array of Film URL Resources that this vehicle has appeared in.
// pilots array -- An array of People URL Resources that this vehicle has been piloted by.
// url string -- the hypermedia URL of this resource.
// created string -- the ISO 8601 date format of the time that this resource was created.
// edited string -- the ISO 8601 date format of the time that this resource was edited.