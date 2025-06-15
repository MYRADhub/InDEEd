import subprocess
import tempfile
import os
import uuid

def run_java_code(code: str, stdin: str = ""):
    with tempfile.TemporaryDirectory() as tmpdir:
        filename = "Main.java"
        filepath = os.path.join(tmpdir, filename)

        with open(filepath, "w") as f:
            f.write(code)

        try:
            # Compile
            compile_proc = subprocess.run(
                ["javac", filename],
                cwd=tmpdir,
                capture_output=True,
                text=True,
                timeout=5
            )

            if compile_proc.returncode != 0:
                return {
                    "stdout": "",
                    "stderr": compile_proc.stderr,
                    "exitCode": compile_proc.returncode
                }

            # Run
            run_proc = subprocess.run(
                ["java", "Main"],
                cwd=tmpdir,
                input=stdin,
                capture_output=True,
                text=True,
                timeout=5
            )

            return {
                "stdout": run_proc.stdout,
                "stderr": run_proc.stderr,
                "exitCode": run_proc.returncode
            }

        except subprocess.TimeoutExpired:
            return {
                "stdout": "",
                "stderr": "Execution timed out.",
                "exitCode": -1
            }