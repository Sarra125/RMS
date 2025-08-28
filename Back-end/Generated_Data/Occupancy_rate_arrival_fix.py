import pandas as pd

# Load the booking history
df = pd.read_excel("C:\\Users\\DELL\\Desktop\\PFE\\Generated_Data\\booking_history_fixed_occupancy.xlsx")

# Ensure Arrival_date is treated as date only (strip any time)
df["Arrival_date"] = pd.to_datetime(df["Arrival_date"]).dt.date

# Step 1: Create a reference table with the first occupancy rate per (Hotel_id, Arrival_date)
reference_arrival = (
    df.groupby(["Hotel_id", "Arrival_date"])["Occupancy_rate_arrival"]
    .first()
    .reset_index()
    .rename(columns={"Occupancy_rate_arrival": "Standardized_arrival_rate"})
)

# Step 2: Merge the reference back into the main table
df = df.merge(reference_arrival, on=["Hotel_id", "Arrival_date"], how="left")

# Step 3: Replace original values
df["Occupancy_rate_arrival"] = df["Standardized_arrival_rate"]
df.drop(columns=["Standardized_arrival_rate"], inplace=True)

# Save to new file
df.to_excel("booking_history_fixed_arrival_rate.xlsx", index=False)

print("✅ Occupancy_rate_arrival standardized for all Hotel_id + Arrival_date combinations.")
