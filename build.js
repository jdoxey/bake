project = {
	zip: {
		description: "Zip all this stuff up into bake.zip",
		needed: { target: "bake.zip", source: "." },
		build: function() {
			rm("bake.zip");
			// TODO: doesn't keep executable flag on 'bake' script
			ant_helper.call_task(ant_imports.Zip, {
					destFile: new java.io.File("bake.zip"),
					basedir: new java.io.File(".."),
					includes: "bake/**",
					excludes: "bake/.git/**"
			});
		}
	}
};
