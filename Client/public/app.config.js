'use strict';

var appConfig = {};

appConfig.menu_speed = 200;

/*
* DEBUGGING MODE
* debugState = true; will spit all debuging message inside browser console.
* The colors are best displayed in chrome browser.
*/

appConfig.debugState = false;	
appConfig.debugStyle = 'font-weight: bold; color: #00f;';
appConfig.debugStyle_green = 'font-weight: bold; font-style:italic; color: #46C246;';
appConfig.debugStyle_red = 'font-weight: bold; color: #ed1c24;';
appConfig.debugStyle_warning = 'background-color:yellow';
appConfig.debugStyle_success = 'background-color:green; font-weight:bold; color:#fff;';
appConfig.debugStyle_error = 'background-color:#ed1c24; font-weight:bold; color:#fff;';

appConfig.voice_command = true;
appConfig.voice_command_auto = false;

appConfig.sound_path = "sound/";
appConfig.sound_on = true;

appConfig.waSkin = "wa-style-0";
appConfig.waRole = "passenger";

appConfig.skins = [
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

appConfig.roles = [
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

/*
 *  Sets the language to the default 'en-US'. (supports over 50 languages 
 *  by google)
 * 
 *  Afrikaans         ['af-ZA']
 *  Bahasa Indonesia  ['id-ID']
 *  Bahasa Melayu     ['ms-MY']
 *  CatalГ            ['ca-ES']
 *  ДЊeЕЎtina         ['cs-CZ']
 *  Deutsch           ['de-DE']
 *  English           ['en-AU', 'Australia']
 *                    ['en-CA', 'Canada']
 *                    ['en-IN', 'India']
 *                    ['en-NZ', 'New Zealand']
 *                    ['en-ZA', 'South Africa']
 *                    ['en-GB', 'United Kingdom']
 *                    ['en-US', 'United States']
 *  EspaГ±ol          ['es-AR', 'Argentina']
 *                    ['es-BO', 'Bolivia']
 *                    ['es-CL', 'Chile']
 *                    ['es-CO', 'Colombia']
 *                    ['es-CR', 'Costa Rica']
 *                    ['es-EC', 'Ecuador']
 *                    ['es-SV', 'El Salvador']
 *                    ['es-ES', 'EspaГ±a']
 *                    ['es-US', 'Estados Unidos']
 *                    ['es-GT', 'Guatemala']
 *                    ['es-HN', 'Honduras']
 *                    ['es-MX', 'MГ©xico']
 *                    ['es-NI', 'Nicaragua']
 *                    ['es-PA', 'PanamГЎ']
 *                    ['es-PY', 'Paraguay']
 *                    ['es-PE', 'PerГє']
 *                    ['es-PR', 'Puerto Rico']
 *                    ['es-DO', 'RepГєblica Dominicana']
 *                    ['es-UY', 'Uruguay']
 *                    ['es-VE', 'Venezuela']
 *  Euskara           ['eu-ES']
 *  FranГ§ais         ['fr-FR']
 *  Galego            ['gl-ES']
 *  Hrvatski          ['hr_HR']
 *  IsiZulu           ['zu-ZA']
 *  ГЌslenska         ['is-IS']
 *  Italiano          ['it-IT', 'Italia']
 *                    ['it-CH', 'Svizzera']
 *  Magyar            ['hu-HU']
 *  Nederlands        ['nl-NL']
 *  Norsk bokmГҐl     ['nb-NO']
 *  Polski            ['pl-PL']
 *  PortuguГЄs        ['pt-BR', 'Brasil']
 *                    ['pt-PT', 'Portugal']
 *  RomГўnДѓ          ['ro-RO']
 *  SlovenДЌina       ['sk-SK']
 *  Suomi             ['fi-FI']
 *  Svenska           ['sv-SE']
 *  TГјrkГ§e          ['tr-TR']
 *  Р±СЉР»РіР°СЂСЃРєРё['bg-BG']
 *  PСѓСЃСЃРєРёР№     ['ru-RU']
 *  РЎСЂРїСЃРєРё      ['sr-RS']
 *  н•њкµ­м–ґ         ['ko-KR']
 *  дё­ж–‡            ['cmn-Hans-CN', 'ж™®йЂљиЇќ (дё­е›Ѕе¤§й™†)']
 *                    ['cmn-Hans-HK', 'ж™®йЂљиЇќ (й¦™жёЇ)']
 *                    ['cmn-Hant-TW', 'дё­ж–‡ (еЏ°зЃЈ)']
 *                    ['yue-Hant-HK', 'зІµиЄћ (й¦™жёЇ)']
 *  ж—Ґжњ¬иЄћ         ['ja-JP']
 *  Lingua latД«na    ['la']
 */
appConfig.voice_command_lang = 'en-US';
/*
 *  Use localstorage to remember on/off (best used with HTML Version)
 */ 
appConfig.voice_localStorage = false;
/*
 * Voice Commands
 * Defines all voice command variables and functions
 */ 
if (appConfig.voice_command) {
		
	appConfig.commands = {
	};
}; 


/*
* END APP.appConfig
*/