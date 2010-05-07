version = "0.0.1";
zip_file_name="bake_v" + version + ".zip";

project = {
	
	zip: {
		description: "Zip all this stuff up into bake.zip",
		needed: { target: zip_file_name, source: "." },
		build: function() {
			rm(zip_file_name);
			// TODO: doesn't keep executable flag on 'bake' script
			ant_helper.call_task(ant_imports.Zip, {
					destFile: new java.io.File(zip_file_name),
					basedir: new java.io.File(".."),
					includes: "bake/**",
					excludes: "bake/.git/**"
			});
		}
	}

};
