import pandas as pd

# Charger le fichier Excel (ajuste le nom de ton fichier)
df = pd.read_excel("C:\\Users\\DELL\\Desktop\\PFE\\useful_tables\\Booking_History_Cleaned.xlsx")

# Convertir les dates en datetime au cas où
df['Arrival_date'] = pd.to_datetime(df['Arrival_date'], dayfirst=True, errors='coerce')

# Définir les critères
hotel_id_cible = 162
date_cible = pd.to_datetime("29/12/2024", dayfirst=True)

# Filtrer les lignes correspondant aux critères
filtres = (df['Hotel_id'] == hotel_id_cible) & (df['Arrival_date'] == date_cible)
lignes_trouvees = df[filtres]

# Afficher les numéros de lignes (index Excel-style = +2 si en-tête ligne 1)
indices_excel = lignes_trouvees.index + 2  # +2 : ligne Excel commence à 1 + en-tête

print(f"Nombre de lignes trouvées : {len(lignes_trouvees)}")
print("Numéros de lignes dans Excel :")
print(indices_excel.to_list())
