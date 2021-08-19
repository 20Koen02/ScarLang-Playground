const monarchScarLang = {
	// Set defaultToken to invalid to see what you do not tokenize yet
	defaultToken: 'invalid',
	tokenPostfix: '.scar',

	keywords: [
		'break', 'continue', 'else', 'false', 'for', 'func',
		'if', 'in', 'null', 'return', 'true', 'var', 'while',
		'then', 'elif', 'to', 'step'
	],

	operators: [
		'<=', '>=', '==', '!=', '+', '-',
		'*', '/', '^', '%', 'and', 'or', '!', '=', 
	],

	// we include these common regular expressions
	symbols: /[=><!~?:&|+\-*\/\^%]+/,
	escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
	digits: /\d+(_+\d+)*/,

	regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
	regexpesc: /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,

	// The main tokenizer for our languages
	tokenizer: {
		root: [
			[/[{}]/, 'delimiter.bracket'],
			{ include: 'common' }
		],

		common: [
			// identifiers and keywords
			[/[a-z_$][\w$]*/, {
				cases: {
					'@keywords': 'keyword',
					'@default': 'identifier'
				}
			}],
			[/[A-Z][\w\$]*/, 'type.identifier'],  // to show class names nicely
			// [/[A-Z][\w\$]*/, 'identifier'],

			// whitespace
			{ include: '@whitespace' },

			// regular expression: ensure it is terminated before beginning (otherwise it is an opeator)
			[/\/(?=([^\\\/]|\\.)+\/([gimsuy]*)(\s*)(\.|;|\/|,|\)|\]|\}|$))/, { token: 'regexp', bracket: '@open', next: '@regexp' }],

			// delimiters and operators
			[/[()\[\]]/, '@brackets'],
			[/[<>](?!@symbols)/, '@brackets'],
			[/@symbols/, {
				cases: {
					'@operators': 'delimiter',
					'@default': ''
				}
			}],

			// numbers
			[/(@digits)[eE]([\-+]?(@digits))?/, 'number.float'],
			[/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, 'number.float'],
			[/(@digits)/, 'number'],

			// delimiter: after number because of .\d floats
			[/[;,.]/, 'delimiter'],

			// strings
			[/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
			[/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
			[/"/, 'string', '@string_double'],
		],

		whitespace: [
			[/[ \t\r\n]+/, ''],
			[/(^#.*$)/, 'comment'],
		],

		// We match regular expression quite precisely
		regexp: [
			[/(\{)(\d+(?:,\d*)?)(\})/, ['regexp.escape.control', 'regexp.escape.control', 'regexp.escape.control']],
			[/(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/, ['regexp.escape.control', { token: 'regexp.escape.control', next: '@regexrange' }]],
			[/(\()(\?:|\?=|\?!)/, ['regexp.escape.control', 'regexp.escape.control']],
			[/[()]/, 'regexp.escape.control'],
			[/@regexpctl/, 'regexp.escape.control'],
			[/[^\\\/]/, 'regexp'],
			[/@regexpesc/, 'regexp.escape'],
			[/\\\./, 'regexp.invalid'],
			[/(\/)([gimsuy]*)/, [{ token: 'regexp', bracket: '@close', next: '@pop' }, 'keyword.other']],
		],

		regexrange: [
			[/-/, 'regexp.escape.control'],
			[/\^/, 'regexp.invalid'],
			[/@regexpesc/, 'regexp.escape'],
			[/[^\]]/, 'regexp'],
			[/\]/, { token: 'regexp.escape.control', next: '@pop', bracket: '@close' }],
		],

		string_double: [
			[/[^\\"]+/, 'string'],
			[/@escapes/, 'string.escape'],
			[/\\./, 'string.escape.invalid'],
			[/"/, 'string', '@pop']
		],

		bracketCounting: [
			[/\{/, 'delimiter.bracket', '@bracketCounting'],
			[/\}/, 'delimiter.bracket', '@pop'],
			{ include: 'common' }
		],
	},
};

export default monarchScarLang;