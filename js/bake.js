var bake_home = arguments[0];

// add helpers
load(bake_home + "/js/ant-helpers.js");
load(bake_home + "/js/bake-helpers.js");

// parse build file
try {
	load("build.js");
}
catch (err) {
	println("** bake: couldn't find 'build.js' in the current directory");
	// TODO: "...do you want me to create one?"
	exit(1);
}

// print targets if there are no args
if (arguments.length == 1) {
	bake_helper.print_targets();
	exit(0);
}

// run target
bake_helper.run_task(arguments[1]);

println("** bake: Job Done!");

