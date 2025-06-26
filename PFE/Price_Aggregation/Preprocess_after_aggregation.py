import pandas as pd
import numpy as np

# Load the Excel file
df = pd.read_excel("C:\\Users\\DELL\\Desktop\\PFE\\useful_tables\\Hotels_Daily_Prices.xlsx")

# Separate metadata columns
meta_cols = ['Hotel_id', 'devise']
price_cols = df.columns.difference(meta_cols)

# Apply rules row by row
def preprocess_row(row):
    for col in price_cols:
        val = row[col]
        
        # Rule 1: If price is below 50
        if pd.notna(val) and val < 50:
            prev_cols = df.columns[:df.columns.get_loc(col)]
            prev_val = row[prev_cols[-1]] if len(prev_cols) > 2 and pd.notna(row[prev_cols[-1]]) else np.nan
            row[col] = prev_val if pd.notna(prev_val) else row[price_cols].dropna().iloc[0]
        
        # Rule 2: If value is NaN and previous & next values exist
        if pd.isna(val):
            col_index = list(price_cols).index(col)
            if 0 < col_index < len(price_cols) - 1:
                prev_val = row[price_cols[col_index - 1]]
                next_val = row[price_cols[col_index + 1]]
                if pd.notna(prev_val) and pd.notna(next_val):
                    row[col] = (prev_val + next_val) / 2

    # Final fill for any remaining NaNs
    row[price_cols] = row[price_cols].fillna(method='ffill', axis=0)
    if row[price_cols].isna().any():
        row[price_cols] = row[price_cols].fillna(row[price_cols].dropna().iloc[0])
    
    return row

# Apply preprocessing
df = df.apply(preprocess_row, axis=1)

# Convert all price columns to numeric (optional safety)
df[price_cols] = df[price_cols].apply(pd.to_numeric, errors='coerce')

# Drop rows with all prices missing (if any)
df = df.dropna(subset=price_cols, how='all')

# Save cleaned data
df.to_excel("Hotels_Daily_Prices_Cleaned.xlsx", index=False)
print("Preprocessing complete. Cleaned data saved.")
