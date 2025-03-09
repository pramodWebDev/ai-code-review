from flask import Flask, request, jsonify
import ollama
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message", "")

    response = ollama.chat(model="deepseek-r1:1.5b", messages=[
        {"role": "user", "content": user_input}
    ])

    return jsonify({"response": response["message"]["content"]})

@app.route("/code-review", methods=["POST"])
def code_review():
    data = request.json
    user_code = data.get("code", "")

    if not user_code:
        return jsonify({"error": "No code provided"}), 400

    prompt = f"Analyze the following code and suggest improvements:\n\n{user_code}"

    response = ollama.chat(model="deepseek-r1:1.5b", messages=[
        {"role": "user", "content": prompt}
    ])

    return jsonify({"review": response["message"]["content"]})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
