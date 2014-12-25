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
	'common/service/SmartCss',
	'common/service/APIs',

	// widgets
	'modules/widgets/module',
	'modules/widgets/directives/widgetGrid',
	'modules/widgets/directives/jarvisWidget',

	// client
	'client/module',
	'client/account/module',
	'client/setup/module',
	'client/monitor/module',
	'client/backup/module',
	'client/messages/module',

	// host
	'host/module',
	'host/account/module',
	'host/equipment/module',
	'host/finance/module',
	'host/messages/module',

	// agency
	'agency/module',
	'agency/account/module',
	'agency/devices/module',
	'agency/finance/module',
	'agency/messages/module',

	// passenger
	'passenger/module',
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
