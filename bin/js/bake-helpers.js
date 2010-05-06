
bake_helper = {

    print_targets: function() {
        println("** bake: Found the following targets...");
        for (i in project) {
            var line = i;
            if (project[i].description) {
                line += "\t\t" + project[i].description;
            }
            println(line);
        }
    },

    run_task: function(task_name) {
		var task = project[task_name];

		if (task.depends) {
    		println("** bake: Checking dependencies for '" + task_name + "'");
		    for (i in task.depends) {
		        var dependentTarget = task.depends[i];
		        bake_helper.run_task(dependentTarget);
		    }
		}

        if (bake_helper.check_if_needed(task)) {
    		println("** bake: Running task '" + task_name + "'");
            task.build();
        }
        else {
    		println("** bake: Turns out '" + task_name + "' doesn't need to run");
        }
    },

    check_if_needed: function(task) {
        if (!task.needed) {
            return true;
        }

        if (typeof task.needed == 'function') {
            return task.needed();
        }

        if (!task.needed.target || !task.needed.source) {
            println("**** bake: Error - If the 'needed' element isn't a function it " +
                    "should have 'target' and 'source' properties");
            exit(1);
        }

        var targetFile = new java.io.File(task.needed.target);
        var sourceFile = new java.io.File(task.needed.source);

        if (!targetFile.exists()) {
            return true;
        }

        if (!sourceFile.exists()) {
            println("**** bake: Error - Hmm, something screwy happening, " +
                    "target's source doesn't exist (" + task.needed.source + ").");
            exit(1);
        }

        var targetTime = targetFile.isDirectory() ? bake_helper.oldest_file_time(task.needed.target) : targetFile.lastModified();
        var sourceTime = sourceFile.isDirectory() ? bake_helper.newest_file_time(task.needed.source) : sourceFile.lastModified();
        
        return sourceTime > targetTime;
    },

    newest_file_time: function(start_dir) {
        var newest = 0;
        find(start_dir, /.*/, function(class_file) {
            var modified = new java.io.File(class_file).lastModified();
            if (modified > newest) {
                newest = modified;
            }
        });
        return newest;
    },

    oldest_file_time: function(start_dir) {
        var oldest = null;
        find(start_dir, /.*/, function(class_file) {
            var modified = new java.io.File(class_file).lastModified();
            if (oldest == null) {
                oldest = modified;
            }
            else if (modified < oldest) {
                oldest = modified;
            }
        });
        return oldest;
    }

};
