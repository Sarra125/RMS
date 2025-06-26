import pandas as pd

# Charger le fichier Excel
df = pd.read_excel("C:\\Users\\DELL\\Desktop\\PFE\\useful_tables\\Booking_History_Cleaned.xlsx")  # Remplace par ton chemin exact

# Convertir la colonne Arrival_date au bon format de date
df["Arrival_date"] = pd.to_datetime(df["Arrival_date"], dayfirst=True, errors='coerce')

# Filtrer selon Hotel_id et Arrival_date
hotel_id_cible = 162
date_cible = pd.to_datetime("29/12/2024", dayfirst=True)

# Appliquer les filtres
filtre = (df["Hotel_id"] == hotel_id_cible) & (df["Arrival_date"] == date_cible)
resultat = df[filtre]

# Afficher le nombre de lignes correspondantes
print(f"Nombre de lignes avec Hotel_id = {hotel_id_cible} et Arrival_date = {date_cible.date()} : {len(resultat)}")
