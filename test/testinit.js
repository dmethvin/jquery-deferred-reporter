"use strict";

window.TestManager = {

	/**
	 * Load a version of a file based on URL parameters.
	 *
	 *	VER			Version from releases.jquery.code or code.jquery.com, e.g.:
	 *				git, 4.0.0.min or 4.0.0-beta.2
	 *	else		Full or relative path to be used for script src
	 */
	loadProject: function( projectName, defaultVersion ) {
		var file,
			urlTag = this.projects[ projectName ].urlTag,
			matcher = new RegExp( "\\b" + urlTag + "=([^&]+)" ),
			version = ( matcher.exec( document.location.search ) || {} )[ 1 ] || defaultVersion;

		if ( version.indexOf( "git" ) === 0 || version.indexOf( "3.x-git" ) === 0 ) {
			file = "https://releases.jquery.com/git/" + projectName + "-" + version + ".js";
		} else if ( /^[\w\.\-]+$/.test( version ) ) {
			file = "https://code.jquery.com/" + projectName + "-" + version + ".js";
		} else {
			file = version;
		}
		this.loaded.push( {
			projectName: projectName,
			tag: version,
			file: file
		} );

		document.write( "<script src='" + file + "'></script>" );
	},

	init: function( projects ) {
		var p, project;

		this.projects = projects;
		this.loaded = [];

		// Do QUnit setup if QUnit is loaded (could be an iframe page)
		if ( !window.QUnit ) {
			return;
		}

		// Max time for async tests until it aborts test
		// and start()'s the next test.
		QUnit.config.testTimeout = 5 * 1000; // 5 seconds

		// Enforce an "expect" argument or expect() call in all test bodies.
		QUnit.config.requireExpects = true;

		// Set the list of projects, including the project version choices.
		for ( p in projects ) {
			project = projects[ p ];
			QUnit.config.urlConfig.push( {
				label: p,
				id: project.urlTag,
				value: project.choices
			} );
		}
	}
};
TestManager.init( {
	"jquery": {
		urlTag: "jquery",
		choices: [
			"git",
			"git.min",
			"4.0.0-beta.2",
			"4.0.0-beta.2.min",
			"3.x-git",
			"3.x-git.min",
			"3.7.1",
			"3.7.1.min",
			"3.6.4",
			"3.6.4.min"
		]
	}
} );
