import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.preprocessing import TransactionEncoder

def load_dataset(path="dataset.csv"):
    transactions = []
    with open(path, "r") as f:
        for line in f:
            items = [i.strip().lower() for i in line.strip().split(",")]
            transactions.append(items)
    return transactions

def preprocess(transactions):
    te = TransactionEncoder()
    te_array = te.fit(transactions).transform(transactions)
    return pd.DataFrame(te_array, columns=te.columns_)

print("🚀 Training model...")

transactions = load_dataset()
df = preprocess(transactions)

freq_items = apriori(df, min_support=0.02, use_colnames=True)
rules = association_rules(freq_items, metric="confidence", min_threshold=0.2)
rules = rules.sort_values(by=["lift", "confidence"], ascending=False)

print(f"✅ Rules generated: {len(rules)}")

def get_recommendations(item, top_n=5):
    item = item.lower()
    results = []

    for _, row in rules.iterrows():
        if item in list(row["antecedents"]):
            for r in row["consequents"]:
                results.append((r, row["lift"]))

    if not results:
        return []

    results = list(set(results))
    results.sort(key=lambda x: x[1], reverse=True)

    return [r[0] for r in results[:top_n]]