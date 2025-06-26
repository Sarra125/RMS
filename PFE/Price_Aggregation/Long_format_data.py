import pandas as pd

# Load the Excel file
df = pd.read_excel("C:\\Users\\DELL\\Desktop\\PFE\\useful_tables\\Hotels_Daily_Prices_Cleaned.xlsx")

# Melt the dataframe to go from wide to long format
df_long = df.melt(id_vars=["Hotel_id", "devise"], var_name="Date", value_name="Prix")

# Optionally, sort the values
df_long = df_long.sort_values(by=["Hotel_id", "Date"]).reset_index(drop=True)

# Save the result to a new Excel file
df_long.to_excel("Hotels_Daily_Prices_Long_Format.xlsx", index=False)

print("Transformation complete. File saved as 'Hotels_Daily_Prices_Long_Format.xlsx'")
