define([
	'common/module', 
	'lodash', 
	'notification',
	'appConfig'
], function (module, _) {

	'use strict';

	module.registerDirective('demoStates', [
		'$rootScope',
		'User',
		function ($rootScope, User) {
			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'app/common/directives/demo/demo-states.tpl.html',
				scope: true,
				link: function (scope, element, attributes) {
					element.parent().css({
						position: 'relative'
					});

					element.on('click', '#demo-setting', function () {
						element.toggleClass('activate')
					});
				},
				controller: [
					'$scope',
					function ($scope) {
						var $root = $('body');

						$scope.$watch('fixedHeader', function (fixedHeader) {
							localStorage.setItem('sm-fixed-header', fixedHeader);
							$root.toggleClass('fixed-header', fixedHeader);
							if (fixedHeader == false) {
								$scope.fixedRibbon = false;
								$scope.fixedNavigation = false;
							}
						});

						$scope.$watch('fixedNavigation', function (fixedNavigation) {
							localStorage.setItem('sm-fixed-navigation', fixedNavigation);
							$root.toggleClass('fixed-navigation', fixedNavigation);
							if (fixedNavigation) {
								$scope.insideContainer = false;
								$scope.fixedHeader = true;
							} else {
								$scope.fixedRibbon = false;
							}
						});


						$scope.$watch('fixedRibbon', function (fixedRibbon) {
							localStorage.setItem('sm-fixed-ribbon', fixedRibbon);
							$root.toggleClass('fixed-ribbon', fixedRibbon);
							if (fixedRibbon) {
								$scope.fixedHeader = true;
								$scope.fixedNavigation = true;
								$scope.insideContainer = false;
							}
						});

						$scope.$watch('fixedPageFooter', function (fixedPageFooter) {
							localStorage.setItem('sm-fixed-page-footer', fixedPageFooter);
							$root.toggleClass('fixed-page-footer', fixedPageFooter);
						});

						$scope.$watch('insideContainer', function (insideContainer) {
							localStorage.setItem('sm-inside-container', insideContainer);
							$root.toggleClass('container', insideContainer);
							if (insideContainer) {
								$scope.fixedRibbon = false;
								$scope.fixedNavigation = false;
							}
						});

						$scope.$watch('menuOnTop', function (menuOnTop) {
							$rootScope.$broadcast('$waLayoutMenuOnTop', menuOnTop);
							localStorage.setItem('sm-menu-on-top', menuOnTop);
							$root.toggleClass('menu-on-top', menuOnTop);

							if(menuOnTop)$root.removeClass('minified');
						});

						$scope.fixedHeader = localStorage.getItem('sm-fixed-header') == 'true';
						$scope.fixedNavigation = localStorage.getItem('sm-fixed-navigation') == 'true';
						$scope.fixedRibbon = localStorage.getItem('sm-fixed-ribbon') == 'true';
						$scope.fixedPageFooter = localStorage.getItem('sm-fixed-page-footer') == 'true';
						$scope.insideContainer = localStorage.getItem('sm-inside-container') == 'true';
						$scope.menuOnTop = localStorage.getItem('sm-menu-on-top') == 'true' || $root.hasClass('menu-on-top');


						$scope.skins = appConfig.skins || [
							{name: "wa-style-0",
								logo: "styles/img/VTSS_logo_dark.png",
								class: "btn btn-block btn-xs txt-color-white margin-right-5",
								style: "background-color:#4E463F;",
								label: "Web Artists - Dark"},

							{name: "wa-style-1",
								logo: "styles/img/VTSS_logo.png",
								class: "btn btn-block btn-xs txt-color-white",
								style: "background:#4d8ba5;",
								label: "Web Artists - Light"}
						];
						
						$scope.roles = appConfig.roles || [
							{
								role: "host",
								class: "btn btn-xs btn-block txt-color-white margin-top-5",
								style: "background: #bbc0cf; border: 1px solid #59779E; color: #17273D !important;",
								label: "Host"
							},
							{
								role: "client",
								class: "btn btn-xs btn-block txt-color-white margin-top-5",
								style: "background: #bbc0cf; border: 1px solid #59779E; color: #17273D !important;",
								label: "Client"
							},
							{
								role: "agency",
								class: "btn btn-xs btn-block txt-color-white margin-top-5",
								style: "background: #bbc0cf; border: 1px solid #59779E; color: #17273D !important;",
								label: "Agency"
							},
							{
								role: "passenger",
								class: "btn btn-xs btn-block txt-color-white margin-top-5",
								style: "background: #bbc0cf; border: 1px solid #59779E; color: #17273D !important;",
								label: "Passenger"
							}
						];

						$scope.waSkin = localStorage.getItem('sm-skin') || appConfig.waSkin;
						$scope.waRole = appConfig.waRole;


						$scope.setSkin = function (skin) {
							if(skin) {
								$scope.waSkin = skin.name;
								$root.removeClass(_.pluck($scope.skins, 'name').join(' '));
								$root.addClass(skin.name);
								localStorage.setItem('sm-skin', skin.name);
								$("#logo img").attr('src', skin.logo);
							}
						};

						$scope.setRole = function (role) {
							$scope.waRole = role.role;
							$rootScope.$broadcast('$waRoleChange', role);
						};

						$scope.setSkin(_.find($scope.skins, {name: $scope.waSkin}));

						$scope.factoryReset = function () {
							$.SmartMessageBox({
								title: "<i class='fa fa-refresh' style='color:green'></i> Clear Local Storage",
								content: "Would you like to RESET all your saved widgets and clear LocalStorage?1",
								buttons: '[No][Yes]'
							}, function (ButtonPressed) {
								if (ButtonPressed == "Yes" && localStorage) {
									localStorage.clear();
									location.reload()
								}
							});
						}
					}
				]
			};
		}
	]);
});
