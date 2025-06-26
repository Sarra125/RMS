import pandas as pd
import random

# Charger la table des hôtels
hotels_df = pd.read_excel("C:\\Users\\DELL\\Desktop\\PFE\\Preprocessing\\liste_tot_hotels.xlsx")

# Initialisation de la nouvelle table
rooms_data = []

# Types de chambres
room_types = ["Standard", "Deluxe", "Suite"]
room_views = ["Sea View", "City View", "Garden View"]

for index, row in hotels_df.iterrows():
    hotel_id = row["ID"]
    total_rooms = row["Nbre_Rooms"]
    fixed_cost_standard = row["Fixed_Cost_Single_Room(TND)"]

    # Répartition approximative : 60% Standard, 30% Deluxe, 10% Suite
    num_standard = int(total_rooms * 0.6)
    num_deluxe = int(total_rooms * 0.3)
    num_suite = total_rooms - num_standard - num_deluxe  # pour garder le total cohérent

    # Créer une entrée par type
    rooms_data.append({
        "hotel_id": hotel_id,
        "Room_Type": "Standard",
        "Room_Count": num_standard,
        "Room_View": random.choice(room_views),
        "Fixed_Cost": round(fixed_cost_standard, 2)
    })

    rooms_data.append({
        "hotel_id": hotel_id,
        "Room_Type": "Deluxe",
        "Room_Count": num_deluxe,
        "Room_View": random.choice(room_views),
        "Fixed_Cost": round(fixed_cost_standard * 1.5, 2)
    })

    rooms_data.append({
        "hotel_id": hotel_id,
        "Room_Type": "Suite",
        "Room_Count": num_suite,
        "Room_View": random.choice(room_views),
        "Fixed_Cost": round(fixed_cost_standard * 2.2, 2)
    })

# Convertir en DataFrame
rooms_df = pd.DataFrame(rooms_data)

# Sauvegarder au format Excel ou CSV
rooms_df.to_excel("rooms_table.xlsx", index=False)
# rooms_df.to_csv("rooms_table.csv", index=False)

print("Table 'Rooms' générée avec succès.")
