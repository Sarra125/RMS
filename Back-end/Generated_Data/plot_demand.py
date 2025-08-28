import pandas as pd
import matplotlib.pyplot as plt

# Lire le fichier Excel
booking_history = pd.read_excel(r'C:\Users\DELL\Desktop\PFE\Generated_Data\booking_history.xlsx')

# Convertir 'Arrival_date' en format datetime
booking_history['Arrival_date'] = pd.to_datetime(booking_history['Arrival_date'])

# Filtrer pour l'hôtel avec ID = 1
hotel_1_bookings = booking_history[booking_history['Hotel_id'] == 14]

# Garder uniquement les dates de 2023
hotel_1_bookings_2023 = hotel_1_bookings[hotel_1_bookings['Arrival_date'].dt.year == 2023]

# Trier les données par date d’arrivée
hotel_1_bookings_2023 = hotel_1_bookings_2023.sort_values(by='Arrival_date')

# Tracer la distribution de Demand_multiplier
plt.figure(figsize=(12, 6))
plt.plot(
    hotel_1_bookings_2023['Arrival_date'],
    hotel_1_bookings_2023['Demand_multiplier'],
    marker='o', linestyle='-', color='teal'
)
plt.title("Distribution de Demand_multiplier en 2023 pour l'hôtel ID = 1")
plt.xlabel('Date d’arrivée')
plt.ylabel('Demand_multiplier')
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
