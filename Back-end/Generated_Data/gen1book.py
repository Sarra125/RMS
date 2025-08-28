import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# --- Chargement des hôtels (3, 4, 5 étoiles seulement)
hotels_df = pd.read_excel("C:\\Users\\DELL\\Desktop\\PFE\\Preprocessing\\liste_tot_hotels.xlsx")
hotels_df = hotels_df[hotels_df["Nombre_Etoiles"].isin([3, 4, 5])].copy()

# --- Ramadan 2023 & 2024 (approximatif)
ramadan_ranges = [
    (datetime(2023, 3, 23), datetime(2023, 4, 21)),
    (datetime(2024, 3, 11), datetime(2024, 4, 9)),
]

# --- Génération des réservations
n_samples = 400_000
start_date = datetime(2023, 1, 1)
end_date = datetime(2025, 1, 1)

channels = ["Hotel Website", "Walk-in", "OTA"]
ota_sites = ["booking.com", "expedia", "kayak", "hotels.com"]

def is_weekend(date):
    return date.weekday() in [4, 5]

def is_during_ramadan(date):
    return any(start <= date <= end for start, end in ramadan_ranges)

def seasonal_weight(date, hotel_type):
    m = date.month
    d = date.weekday()
    if hotel_type == "resort":
        if m in [6, 7, 8]: return 1.8
        elif is_weekend(date): return 1.4
        elif is_during_ramadan(date): return 0.8
        else: return 1.0
    elif hotel_type == "business":
        if m in [3, 4, 5, 9, 10, 11] and d < 5: return 1.7
        elif m in [6, 7, 8, 12, 1]: return 0.8
        elif is_during_ramadan(date): return 0.5
        else: return 1.0
    return 1.0

def generate_booking(hotel):
    hotel_id = hotel["ID"]
    hotel_type = hotel["Type"].lower()
    room_id = random.randint(1, 1000000)

    reservation_date = start_date + timedelta(days=random.randint(0, 730))
    lead_time = np.random.exponential(scale=14)  # moyenne 2 semaines
    arrival_date = reservation_date + timedelta(days=int(lead_time))
    if arrival_date >= end_date:
        arrival_date = reservation_date + timedelta(days=2)
    stay_length = random.randint(2, 5) if hotel_type == "business" else random.randint(3, 10)
    departure_date = arrival_date + timedelta(days=stay_length)
    stay_duration = (departure_date - arrival_date).days

    # Multiplicateurs
    seasonal = seasonal_weight(arrival_date, hotel_type)
    demand_multiplier = round(min(1 + seasonal * 0.5 + np.random.normal(0, 0.05), 2), 2)
    occ_arrival = round(min(max(seasonal / 2 + np.random.normal(0, 0.1), 0.1), 1.0), 2)
    occ_reservation = round(max(occ_arrival - lead_time * 0.005, 0.05), 2)
    inventory_multiplier = round(max(2 - occ_arrival + np.random.normal(0, 0.05), 1.0), 2)

    # Canal
    channel = random.choices(channels, weights=[0.3, 0.1, 0.6])[0]
    ota_site, ota_commission = None, None
    if channel == "OTA":
        ota_site = random.choice(ota_sites)
        ota_commission = round(random.uniform(10, 25), 2)

    return {
        "Reservation_id": f"BK{random.randint(1000000, 9999999)}",
        "Hotel_id": hotel_id,
        "Room_id": room_id,
        "Inventory_multiplier": inventory_multiplier,
        "Demand_multiplier": demand_multiplier,
        "Reservation_date": reservation_date.date(),
        "Arrival_date": arrival_date.date(),
        "Departure_date": departure_date.date(),
        "Stay_duration": stay_duration,
        "Occupancy_rate_reservation": occ_reservation,
        "Occupancy_rate_arrival": occ_arrival,
        "Devise": "TND",
        "Channel": channel,
        "OTA_site": ota_site,
        "OTA_commission": ota_commission
    }

# --- Génération des 400 000 lignes
print("⏳ Génération des 400 000 réservations...")
bookings = []
for _ in range(n_samples):
    hotel = hotels_df.sample(1).iloc[0]
    bookings.append(generate_booking(hotel))

# --- Sauvegarde
df_bookings = pd.DataFrame(bookings)
df_bookings.to_excel("booking_history.xlsx", index=False)
print("✅ Fichier 'booking_history.xlsx' généré avec succès.")
