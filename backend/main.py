from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import Todo

app = FastAPI()

from db import (
    fetch_one_todo, 
    fetch_all_todos, 
    create_todo, 
    update_todo, 
    remove_todo,
)

origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return {"Ping":"Pong"}

@app.get("/api/todo")
async def get_todo():
    resp = await fetch_all_todos()
    return resp    

@app.get("/api/todo{title}", response_model=Todo)
async def get_todo_by_id(title):
    resp = await fetch_one_todo(title)
    if resp:
        return resp
    raise HTTPException(404, f"There is no todo with this title {title}")

@app.post("/api/todo", response_model=Todo)
async def post_todo(todo: Todo):
    resp = await create_todo(todo.dict())
    if resp:
        return resp
    raise HTTPException(400, "Something went wrong")

@app.put("/api/todo{title}", response_model=Todo)
async def put_todo(title: str, desc: str):
    resp = await update_todo(title, desc)
    if resp:
        return resp
    raise HTTPException(404, f"There is no todo with this title {title}")

@app.delete("/api/todo{title}")
async def delete_todo(title):
    resp = await remove_todo(title)
    if resp:
        return "Succesfully deleted item!"
    raise HTTPException(404, f"There is no todo with this title {title}")