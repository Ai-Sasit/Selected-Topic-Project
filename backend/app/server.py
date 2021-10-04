from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from CRUD.index import img
import uvicorn

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
]

app = FastAPI(docs_url="/api/docs", openapi_url="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(img, prefix="/api")

if __name__ == "__main__": uvicorn.run("server:app", host="0.0.0.0", reload=True, port=9999)