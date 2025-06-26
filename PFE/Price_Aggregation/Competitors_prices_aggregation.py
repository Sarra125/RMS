import os
import pandas as pd

# === Configuration ===
folder_path = r'C:\Users\DELL\Desktop\PFE\data\2025-05-11_corrigé'   # 🔁 Replace with the actual folder path
output_file = 'merged_hotel_prices.xlsx'

# === Initialization ===
hotel_data = {}

# === Process Each File ===
for filename in sorted(os.listdir(folder_path)):
    if filename.endswith('.xlsx'):
        file_path = os.path.join(folder_path, filename)
        date_str = os.path.splitext(filename)[0]  # Extract date from filename

        try:
            df = pd.read_excel(file_path)

            if 'Hotel_id' not in df.columns or date_str not in df.columns:
                continue

            df = df[['Hotel_id', 'devise', date_str]]
            df = df[df['Hotel_id'].notna()]
            df['Hotel_id'] = pd.to_numeric(df['Hotel_id'], errors='coerce')
            df = df[df['Hotel_id'].notna()]
            df['Hotel_id'] = df['Hotel_id'].astype(int)

            for _, row in df.iterrows():
                hotel_id = row['Hotel_id']
                raw_devise = str(row['devise']).strip().lower()
                price = row[date_str]

                # Normalize and convert price if in Euro
                if '€' in raw_devise or 'eur' in raw_devise:
                    price = round(price * 3.39, 2)
                    devise = 'TND'
                else:
                    devise = 'TND'  # assume default is TND or already correct

                if hotel_id not in hotel_data:
                    hotel_data[hotel_id] = {'Hotel_id': hotel_id, 'devise': devise}

                hotel_data[hotel_id][date_str] = price

        except Exception as e:
            print(f"❌ Error processing {filename}: {e}")

# === Convert to DataFrame ===
merged_df = pd.DataFrame.from_dict(hotel_data, orient='index')

# === Order Columns ===
fixed_columns = ['Hotel_id', 'devise']
date_columns = sorted([col for col in merged_df.columns if col not in fixed_columns])
merged_df = merged_df[fixed_columns + date_columns]

# === Save to Excel ===
merged_df.to_excel(output_file, index=False)
print(f"\n✅ Merged file saved to: {output_file}")
