from flask import jsonify, request
from .app import app
from model.todoitem import TodoItem

ERR404 = {"error": "not found"}
ERR400 = {"error": "bad request"}


@app.route('/api/tasks', methods=["GET"])
def all_tasks():
    return jsonify([task.json() for task in TodoItem.all()])


@app.route('/api/task/<int:id>', methods=["GET"])
def get_task(id):
    item = TodoItem.from_pk(id)
    if not item:
        return jsonify(ERR404), 404
    return jsonify(item.json())


@app.route('/api/tasks', methods=["POST"])
def post_task():
    if not request.json or "title" not in request.json:
        return jsonify(ERR404), 400
    new_task = TodoItem(title=request.json["title"],
                        description=request.json.get("description", ""),
                        status=request.json.get("status", 0))
    new_task.save()
    return jsonify(new_task.json()), 201

@app.route('/api/task/<int:id>', methods=["PUT"])
def update_task(id):
    if not request.json:
        return jsonify(ERR400), 400
    task = TodoItem.from_pk(id)
    if not task:
        return jsonify(ERR404), 404
    task.title = request.json.get('title', task.title)
    task.description = request.json.get('description', task.description)
    task.status = request.json.get('status', task.status)
    task.save()
    return jsonify(task.json()),201

@app.route('/api/task/<int:id>', methods=["DELETE"])
def delete_task(id):
    task = TodoItem.from_pk(id)
    task.delete()
    return jsonify({"task":"deleted"})