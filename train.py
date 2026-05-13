import pickle
import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.preprocessing import TransactionEncoder

def load_dataset(path="dataset.csv"):
    transactions = []
    with open(path, "r") as f:
        for line in f:
            transactions.append(line.strip().split(","))
    return transactions

def preprocess(transactions):
    te = TransactionEncoder()
    te_array = te.fit(transactions).transform(transactions)
    return pd.DataFrame(te_array, columns=te.columns_)

def train(df):
    freq_items = apriori(df, min_support=0.02, use_colnames=True)
    rules = association_rules(freq_items, metric="confidence", min_threshold=0.1)
    return rules

if __name__ == "__main__":
    print("Training model...")

    transactions = load_dataset()
    df = preprocess(transactions)
    rules = train(df)

    # ✅ SAVE MODEL
    with open("model.pkl", "wb") as f:
        pickle.dump(rules, f)

    print("✅ Model saved as model.pkl")