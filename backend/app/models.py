from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String , BLOB
from db_config import meta ,engine

images = Table('images', meta,
    Column('id', Integer, unique=True, primary_key=True),
    Column('owner',String(255), nullable=False),
    Column('title', String(255), nullable=False),
    Column('desc', String(255)),
    Column('time', String(255)),
    Column('secret', String(255), nullable=False), # image password for edit and remove
    Column('image', String)
)

meta.create_all(engine)