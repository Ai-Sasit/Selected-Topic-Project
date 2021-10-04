from pydantic import BaseModel
from typing import Any

class Image(BaseModel):
    owner: str
    title: str
    desc: str
    time: str
    secret: str
    image: str