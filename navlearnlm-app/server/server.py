from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process-text', methods=['POST'])
def process_text():
    try:
        # Parse incoming JSON
        data = request.get_json()
        text = data.get('text', '')

        print(f"got message: {text}")
        # Mocked processing
        response = {
            "message": f"Received text: {text}",
            "length": len(text)
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
