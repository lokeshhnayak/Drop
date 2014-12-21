define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('wa.common', [
		'ui.router',
		'ngResource'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
		}
	]);

	couchPotato.configureApp(module);

	module.run([
		'$couchPotato',
		function($couchPotato){
			module.lazy = $couchPotato;
		}
	]);

	return module;
});