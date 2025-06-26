import pandas as pd
import numpy as np
import random
from datetime import timedelta, datetime

# Charger les données hôtelières
hotels_df = pd.read_excel("C:\\Users\\DELL\\Desktop\\PFE\\Generated_Data\\liste_tot_hotels.xlsx")

# Paramètres
n_bookings = 400000
start_date = datetime(2023, 1, 1)
end_date = datetime(2025, 1, 1)

# Fonctions

def generate_dates():
    reservation_date = start_date + timedelta(days=random.randint(0, 730))  # 2 ans
    stay_length = random.randint(1, 7)
    arrival_date = reservation_date + timedelta(days=random.randint(1, 60))
    departure_date = arrival_date + timedelta(days=stay_length)
    return reservation_date.date(), arrival_date.date(), departure_date.date()

def is_weekend(date):
    return date.weekday() in [5, 6]  # Samedi, dimanche

def seasonal_demand_multiplier(arrival_date, hotel_type):
    month = arrival_date.month
    weekday = arrival_date.weekday()

    if hotel_type == "resort":
        if month in [6, 7, 8]:  # été
            base = 1.8
        elif is_weekend(arrival_date):
            base = 1.4
        else:
            base = 1.0
    elif hotel_type == "business":
        if month in [3, 4, 5, 9, 10, 11] and weekday < 5:
            base = 1.7
        elif month in [6, 7, 8, 12, 1]:
            base = 0.8
        else:
            base = 1.0
    else:
        base = 1.0

    return round(base, 2)

def generate_booking(hotel):
    hotel_id = hotel["ID"]
    hotel_type = hotel["Type"].lower()
    currency = "TND"

    reservation_date, arrival_date, departure_date = generate_dates()
    stay_duration = (departure_date - arrival_date).days
    room_id = random.randint(1, 1000000)
    reservation_id = f"BK{random.randint(1000000, 9999999)}"

    demand_multiplier = seasonal_demand_multiplier(arrival_date, hotel_type)
    occupancy_rate_res = round(min(demand_multiplier + np.random.normal(0, 0.1), 1.0), 2)
    occupancy_rate_arr = round(min(demand_multiplier + np.random.normal(0, 0.15), 1.0), 2)
    inventory_multiplier = round(2 - occupancy_rate_res, 2)

    channel = random.choices(["Hotel Website", "Walk-in", "OTA"], weights=[0.3, 0.1, 0.6])[0]
    ota_site = None
    ota_commission = None
    if channel == "OTA":
        ota_site = random.choice(["booking.com", "expedia", "kayak"])
        ota_commission = round(random.uniform(10, 25), 2)

    return {
        "Reservation_id": reservation_id,
        "Hotel_id": hotel_id,
        "Room_id": room_id,
        "Inventory_multiplier": inventory_multiplier,
        "Demand_multiplier": demand_multiplier,
        "Reservation_date": reservation_date,
        "Arrival_date": arrival_date,
        "Departure_date": departure_date,
        "Stay_duration": stay_duration,
        "Occupancy_rate_reservation": occupancy_rate_res,
        "Occupancy_rate_arrival": occupancy_rate_arr,
        "Devise": currency,
        "Channel": channel,
        "OTA_site": ota_site,
        "OTA_commission": ota_commission
    }

# Génération des 400 000 réservations
print("Génération des réservations en cours...")

bookings = []
for _ in range(n_bookings):
    hotel = hotels_df.sample(1).iloc[0]
    bookings.append(generate_booking(hotel))

# Sauvegarde
df_bookings = pd.DataFrame(bookings)
df_bookings.to_excel("booking_history.xlsx", index=False, engine='openpyxl')
print("Fichier 'booking_history.csv' généré avec 400 000 réservations.")
