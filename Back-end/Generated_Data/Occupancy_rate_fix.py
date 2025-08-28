import pandas as pd

# Load the booking history
df = pd.read_excel("C:\\Users\\DELL\\Desktop\\PFE\\useful_tables\\Booking_History_Cleaned.xlsx")

# Ensure Reservation_date is treated as date only (remove time if present)
df["Reservation_date"] = pd.to_datetime(df["Reservation_date"]).dt.date

# Step 1: Create a reference table with the correct (first) occupancy rate per group
reference_rates = (
    df.groupby(["Hotel_id", "Reservation_date"])["Occupancy_rate_reservation"]
    .first()
    .reset_index()
    .rename(columns={"Occupancy_rate_reservation": "Standardized_occupancy"})
)

# Step 2: Merge the reference back into the original table
df = df.merge(reference_rates, on=["Hotel_id", "Reservation_date"], how="left")

# Step 3: Overwrite the inconsistent occupancy rate with the standardized one
df["Occupancy_rate_reservation"] = df["Standardized_occupancy"]
df.drop(columns=["Standardized_occupancy"], inplace=True)

# Save the cleaned table
df.to_excel("booking_history_fixed_occupancy.xlsx", index=False)

print("✅ Occupancy_rate_reservation standardized across same Hotel_id & Reservation_date.")
