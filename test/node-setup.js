"use strict";

const { JSDOM } = require( "jsdom" );

const { window } = new JSDOM( "" );

globalThis.window = window;
globalThis.jQuery = require( "jquery" );
require( "../dist/jquery-deferred-reporter" );
