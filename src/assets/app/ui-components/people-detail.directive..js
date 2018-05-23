(function (angular) {
	'use strict';

	// TODO: use component instead directive

	angular
		.module('app.ui.components')
		.directive('peopleDetail', PeopleDetailDirective);

	function PeopleDetailDirective($timeout) {
		var headingTemplate, descriptionTemplate, htmlTemplate;


		headingTemplate = [
			'<h3 ng-bind="model.name" class="title" />',
		].join('');

		descriptionTemplate = [
			'<div class="row"><div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'birth_year\')" class="text-capitalize" />',
			'<dd ng-bind="model.birth_year" />',
			'<dt ng-bind="getPropertyName(\'eye_color\')" class="text-capitalize" />',
			'<dd ng-bind="model.eye_color" />',
			'<dt ng-bind="getPropertyName(\'hair_color\')" class="text-capitalize" />',
			'<dd ng-bind="model.hair_color | currency" />',
			'<dt ng-bind="getPropertyName(\'height\')" class="text-capitalize" />',
			'<dd ng-bind="model.height" />',
			'</dl>',
			'</div>',
			'<div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'mass\')" class="text-capitalize" />',
			'<dd ng-bind="model.mass" />',
			'<dt ng-bind="getPropertyName(\'skin_color\')" class="text-capitalize" />',
			'<dd ng-bind="model.skin_color" />',
			'<dt ng-bind="getPropertyName(\'homeworld\')" class="text-capitalize" />',
			'<dd ng-bind="model.homeworld" />',
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
			console.debug('PeopleDetailDirective', scope, element, attrs);
		}
	}
})(window.angular);

// name string -- The name of this person.
// birth_year string -- The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.
// eye_color string -- The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.
// gender string -- The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.
// hair_color string -- The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.
// height string -- The height of the person in centimeters.
// mass string -- The mass of the person in kilograms.
// skin_color string -- The skin color of this person.
// homeworld string -- The URL of a planet resource, a planet that this person was born on or inhabits.
// films array -- An array of film resource URLs that this person has been in.
// species array -- An array of species resource URLs that this person belongs to.
// starships array -- An array of starship resource URLs that this person has piloted.
// vehicles array -- An array of vehicle resource URLs that this person has piloted.
// url string -- the hypermedia URL of this resource.
// created string -- the ISO 8601 date format of the time that this resource was created.
// edited string -- the ISO 8601 date format of the time that this resource was edited.