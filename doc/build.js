
project = {

	compile: {
	    description: "Compiles the Java sources",
	    needed: { target: "target/classes", source: "src/main/java" },
		build: function() {
            mkdirs("target/classes");
			ant_helper.call_task(ant_imports.Javac, {
					srcdir: ant_helper.create_path("src/main/java"),
					destdir: new java.io.File("target/classes") });
		}
	},

	jar: {
	    description: "Jars up the Java classes into the target directory",
		depends: [ "compile" ],
        needed: { target: "target/my-stuff.jar", source: "target/classes" },
		build: function() {
			ant_helper.call_task(ant_imports.Jar, {
					destFile: new java.io.File("target/my-stuff.jar"),
					basedir: new java.io.File("target/classes") } );
		}
	}

};
