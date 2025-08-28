import pandas as pd

# Charger les fichiers
booking_df = pd.read_excel("C:\\Users\\DELL\\Desktop\\PFE\\booking_history_cleaned_dates.xlsx")
rooms_df = pd.read_excel("C:\\Users\\DELL\\Desktop\\PFE\\useful_tables\\rooms.xlsx")
hotels_df = pd.read_excel("C:\\Users\\DELL\\Desktop\\PFE\\Generated_Data\\liste_tot_hotels_with_base_rate1.xlsx")

# S'assurer que les noms de colonnes sont cohérents
#rooms_df.rename(columns={"id": "Room_id"}, inplace=True)
#hotels_df.rename(columns={"ID": "Hotel_id"}, inplace=True)

# Supprimer les heures si présentes (optionnel ici)
#for col in ["Reservation_date", "Arrival_date", "Departure_date"]:
   #booking_df[col] = pd.to_datetime(booking_df[col]).dt.date

# Fusion avec la table rooms pour obtenir Fixed_Cost
booking_df = booking_df.merge(
    rooms_df[["Room_id", "Fixed_Cost"]],
    on="Room_id",
    how="left"
)

# Fusion avec la table des hôtels pour obtenir Base_Rate
booking_df = booking_df.merge(
    hotels_df[["Hotel_id", "base_rate"]],
    on="Hotel_id",
    how="left"
)

# Calcul du prix payé
booking_df["paid_price"] = booking_df["Fixed_Cost"] + (
    booking_df["base_rate"] *
    booking_df["Demand_multiplier"] *
    booking_df["Inventory_multiplier"]
)

# Arrondir le prix payé à 2 décimales
booking_df["paid_price"] = booking_df["paid_price"].round(2)

# Sauvegarder le résultat
booking_df.to_excel("booking_history_with_paid_price1.xlsx", index=False)

print("✅ Colonne 'paid_price' calculée et ajoutée avec succès.")
