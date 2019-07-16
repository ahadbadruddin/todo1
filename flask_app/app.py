from flask import Flask
from flask_cors import CORS
from model.todoitem import TodoItem
from schema import DEFAULT_DB_PATH

TodoItem.dbpath = DEFAULT_DB_PATH 
app = Flask(__name__)
cors = CORS(app)

from . import routes
