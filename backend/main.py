from fastapi import FastAPI, Request
from pydantic import BaseModel
from executor import run_java_code

app = FastAPI()

class CodeRequest(BaseModel):
    language: str
    code: str
    stdin: str = ""

@app.post("/execute")
async def execute_code(req: CodeRequest):
    if req.language == "java":
        result = run_java_code(req.code, req.stdin)
        return result
    return {"error": "Unsupported language"}