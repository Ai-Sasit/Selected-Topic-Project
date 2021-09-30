from fastapi import FastAPI
from routes.index import user
import uvicorn

app = FastAPI(docs_url="/api/docs", openapi_url="/api")

app.include_router(user,prefix="/api")

if __name__ == "__main__":
    uvicorn.run("server:app", host="127.0.0.1", reload=True, port=9999)