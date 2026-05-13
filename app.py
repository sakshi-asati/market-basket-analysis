from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from model import get_recommendations
import pandas as pd
rules = pd.read_csv("rules.csv")
app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.get_json()
        
        item = data.get("item", "").lower().strip()

        if not item:
            return jsonify({"error": "Enter an item"}), 400

        results = get_recommendations(item)

        return jsonify({
            "input_item": item,
            "recommendations": results
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        search_item = request.form['item'].lower()

        filtered_rules = rules[
            rules['antecedents'].apply(
                lambda x: search_item in str(x).lower()
            )
        ]

        recommendations = []

        for _, row in filtered_rules.iterrows():
            recommendations.append({
                "item": list(row['consequents'])[0],
                "confidence": round(row['confidence'] * 100, 2)
            })

        return render_template(
            "index.html",
            recommendations=recommendations,
            search_item=search_item
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)