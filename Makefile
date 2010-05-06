bin/bake.jar: classes/bake/Bake.class
	##### Creating jarfile #####
	(cd classes; jar cvf ../bin/bake.jar *)

classes/bake/Bake.class: sources/bake/Bake.java
	##### Compiling Java sources #####
	javac -sourcepath sources -d classes sources/bake/Bake.java

