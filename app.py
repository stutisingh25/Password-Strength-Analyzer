from flask import Flask, render_template, request, jsonify

from utils.checker import analyze_password
from utils.database import initialize_database, save_password

app = Flask(__name__)

initialize_database()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/check", methods=["POST"])
def check():

    data = request.get_json()

    username = data.get("username", "")

    password = data.get("password", "")

    result = analyze_password(password, username)

    return jsonify(result)


@app.route("/save", methods=["POST"])
def save():

    data = request.get_json()

    username = data.get("username")

    password = data.get("password")

    message = save_password(username, password)

    return jsonify({"message": message})


if __name__ == "__main__":
    app.run(debug=True)