from fastapi import APIRouter
from db_config import conn
from models import images
from schemas import Image

img = APIRouter()

@img.get("/image")
async def retrieve_all_image():
    return conn.execute(images.select()).fetchall()

@img.get("/image/{id}")
async def retrieve_one_image(id: int):
    return conn.execute(images.select().where(images.c.id == id)).fetchall()

@img.post("/image")
async def send_image_data(img: Image):
    conn.execute(images.insert().values(
        owner=img.owner,
        title = img.title,
        desc = img.desc,
        time = img.time,
        secret = img.secret,
        image = img.image,
    ))
    return conn.execute(images.select()).fetchall()

@img.put("/image/{id}")
async def update_image_data(id: int, img: Image):
    conn.execute(images.update().values(
        owner= img.owner,
        title = img.title,
        desc = img.desc,
    ).where(images.c.id == id))
    return conn.execute(images.select()).fetchall()

@img.delete("/image/{id}")
async def delete_image_data(id: int):
    conn.execute(images.delete().where(images.c.id == id))
    return conn.execute(images.select()).fetchall()