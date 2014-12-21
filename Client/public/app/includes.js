define([
	// account
	'auth/module',
	'auth/models/User',

	// layout

	'layout/module',
	'common/module',
	'common/actions/minifyMenu',
	'common/actions/toggleMenu',
	'common/actions/fullScreen',
	'common/actions/resetWidgets',
	'common/actions/resetWidgets',
	'common/actions/searchMobile',
	'common/actions/waAction',
	'common/directives/waInclude',
	'common/directives/waDeviceDetect',
	'common/directives/waFastClick',
	'common/directives/waLayout',
	'common/directives/waRouterAnimationWrap',
	'common/directives/waFitAppView',
	'common/directives/radioToggle',
	'common/directives/dismisser',
	'common/directives/waMenu',
	'common/directives/bigBreadcrumbs',
	'common/directives/stateBreadcrumbs',
	'common/directives/waPageTitle',
	'common/directives/hrefVoid',
	'common/service/SmartCss',
	'common/service/APIs',
	'modules/widgets/directives/widgetGrid',
	'modules/widgets/directives/jarvisWidget',

	// client
	'client/module',
	'client/setup/module',
	'client/inspect/module',
	'client/backup/module',

	// host
	'host/module',
	'host/agencies/module',
	'host/devices/module',
	'host/device-software/module',
	'host/finance/module',

	// passenger
	'passenger/module',
	'passenger/setup/module',
	'passenger/inspect/module',
	'passenger/feedback/module',

	// home
	'home/module',

	//components
	'components/language/Language',
	'components/language/languageSelector',
	'components/language/LanguageController',
	'components/shortcut/shortcut-directive',

	// widgets
	'modules/widgets/module',

	// forms
	'modules/forms/module',

	// sample
	'sample/module'

], function () {
	'use strict';
});
