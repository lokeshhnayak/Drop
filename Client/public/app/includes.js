define([
	// account
	'auth/module',
	'auth/models/User',

	// layout
	'layout/module',

	// common
	'common/module',
	'common/actions/waMinifyMenu',
	'common/actions/waToggleMenu',
	'common/actions/waFullScreen',
	'common/actions/waResetWidgets',
	'common/actions/waSearchMobile',
	'common/actions/waAction',
	'common/directives/waInclude',
	'common/directives/waDeviceDetect',
	'common/directives/waFastClick',
	'common/directives/waLayout',
	'common/directives/waRouterAnimationWrap',
	'common/directives/waFitAppView',
	'common/directives/waRadioToggle',
	'common/directives/waDismisser',
	'common/directives/waMenu',
	'common/directives/waBigBreadcrumbs',
	'common/directives/waStateBreadcrumbs',
	'common/directives/waPageTitle',
	'common/directives/waHrefVoid',
	'common/directives/demo/demoStates',
	'common/services/SmartCss',
	'common/services/APIs',

	// widgets
	'modules/widgets/module',
	'modules/widgets/directives/widgetGrid',
	'modules/widgets/directives/jarvisWidget',

	// root
	'root/module',
	'root/home/module',
	'root/account/module',
	'root/access-control/module',
	'root/hosts/module',
	'root/device-software/module',

	// client
	'client/module',
	'client/common/module',
	'client/home/module',
	'client/account/module',
	'client/setup/module',
	'client/monitor/module',
	'client/backup/module',
	'client/connection-settings/module',
	'client/finance/module',
	'client/messages/module',

	// host
	'host/module',
	'host/home/module',
	'host/account/module',
	'host/devices/module',
	'host/finance/module',
	'host/messages/module',

	// agency
	'agency/module',
	'agency/home/module',
	'agency/account/module',
	'agency/devices/module',
	'agency/finance/module',
	'agency/messages/module',

	// passenger
	'passenger/module',
	'passenger/home/module',
	'passenger/account/module',
	'passenger/setup/module',
	'passenger/monitor/module',
	'passenger/alerts/module',
	'passenger/messages/module',

	// home
	'home/module',

	//components
	'components/language/Language',
	'components/language/languageSelector',
	'components/language/LanguageController',
	'components/shortcut/waToggleShortcut',

	// forms
	'modules/forms/module',

	// sample
	'sample/module'

], function () {
	'use strict';
});
