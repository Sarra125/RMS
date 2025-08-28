import os
import pandas as pd

# === Configuration ===
folder_path = r'C:\Users\DELL\Desktop\PFE\data\2025-05-11_corrigé'  # 🔁 Replace with the actual folder path

# === Collect unique values
unique_devises = set()

for filename in os.listdir(folder_path):
    if filename.endswith('.xlsx'):
        file_path = os.path.join(folder_path, filename)
        try:
            df = pd.read_excel(file_path)

            if 'devise' in df.columns:
                devises = df['devise'].dropna().unique()
                unique_devises.update(devises)

        except Exception as e:
            print(f"⚠️ Could not read {filename}: {e}")

# === Display Results ===
print("\nUnique 'devise' values found:")
for d in sorted(unique_devises):
    print(f"- {d}")
