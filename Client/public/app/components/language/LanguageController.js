define([
	'app'
], function(app){
	"use strict";

	return app.controller("LanguagesCtrl", [
		'$scope',
		'$rootScope',
		'$log',
		'Language',
		function ($scope, $rootScope, $log, Language) {
			$rootScope.lang = {};
			
			Language.getLanguages(function(data){

				$rootScope.currentLanguage = data[0];

				$rootScope.languages = data;

				// Changed from data[0].key
				Language.getLang(data[0].key,function(data){

					$rootScope.lang = data;
				});

			});

			$scope.selectLanguage = function(language){
				$rootScope.currentLanguage = language;
				
				Language.getLang(language.key,function(data){

					$rootScope.lang = data;
					
				});
			}


			$rootScope.getWord = function(key){
				if(angular.isDefined($rootScope.lang[key])){
					return $rootScope.lang[key];
				} 
				else {
					return key;
				}
			}
		}
	]);
});