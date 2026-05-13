from model import get_recommendations

# -----------------------------
# TEST MULTIPLE ITEMS
# -----------------------------
test_items = ["bread", "milk", "rice", "butter"]

print("🧪 Testing Recommendation Model\n")

for item in test_items:
    print(f"Item: {item}")
    print("Recommendations:", get_recommendations(item))
    print("-" * 40)