package bake;

import javax.script.*;
import java.io.*;

public class Bake {

	// expecting first argument to be BAKE_HOME
	public static void main(String[] args) throws Exception {
		ScriptEngineManager factory = new ScriptEngineManager();
		ScriptEngine engine = factory.getEngineByName("JavaScript");

		// add sun helpers
		engine.eval(new InputStreamReader(
		        com.sun.tools.script.shell.Main.class.getResourceAsStream("init.js")));
		// add helpers
		engine.eval(new FileReader(args[0] + "/js/ant-helpers.js"));
		engine.eval(new FileReader(args[0] + "/js/bake-helpers.js"));
		
		// parse build file
		try {
			engine.eval(new FileReader("./build.js"));
		}
		catch (FileNotFoundException fnfe) {
			System.out.println("bake: couldn't find 'build.js' in the current directory");
			// TODO: "...do you want me to create one?"
			System.exit(0);
		}

		Bindings bindings = engine.getBindings(ScriptContext.ENGINE_SCOPE);

		// print available targets
		if (args.length == 1) {
            engine.eval("bake_helper.print_targets();");
			System.exit(0);
		}

		// run target
		engine.eval("bake_helper.run_task(\"" + args[1] + "\");");

		System.out.println("** bake: Job Done!");
	}

}
