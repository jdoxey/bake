
ant_imports = new JavaImporter(
        org.apache.tools.ant,
        org.apache.tools.ant.types,
        org.apache.tools.ant.taskdefs);

ant_helper = {
    call_task: function(taskClass, properties) {
        var antTask = new taskClass;
        for (var property in properties) {
            var methodName = "set" + property.substr(0, 1).toUpperCase() + property.substr(1);
            var value = properties[property];
            antTask[methodName](value);
        }
        antTask.setProject(new ant_imports.Project());
        antTask.execute();
    },

    create_path: function(pathString) {
        var path = new ant_imports.Path(new ant_imports.Project());
        path.setLocation(new java.io.File(pathString));
        return path;
    }
};

