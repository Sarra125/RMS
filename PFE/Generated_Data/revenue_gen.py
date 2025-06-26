import pandas as pd
import numpy as np

# Charger la liste des hôtels
hotels_df = pd.read_excel("C:\\Users\\DELL\\Desktop\\PFE\\useful_tables\\liste_tot_hotels.xlsx")

# Paramètres de base par étoile
revenue_ranges = {
    3: (65000, 110000),
    4: (140000, 200000),
    5: (250000, 400000)
}

# Coefficients de saisonnalité par mois
seasonality_factors = {
    1: 0.6,   # Janvier -40%
    2: 0.6,
    3: 1.0,   # Mars - normal (business + début tourisme)
    4: 1.0,
    5: 1.0,
    6: 1.3,   # Juin - début haute saison
    7: 1.5,   # Juillet - pic été
    8: 1.5,   # Août - pic été
    9: 1.1,   # Septembre
    10: 1.1,
    11: 0.8,  # Novembre - baisse
    12: 0.7   # Décembre - vacances mais globalement calme
}

# Générer une table de revenus mensuels pour chaque hôtel
rows = []

for _, hotel in hotels_df.iterrows():
    Hotel_id = hotel["Hotel_id"]
    Nombre_Etoiles = int(hotel["Nombre_Etoiles"])
    min_rev, max_rev = revenue_ranges.get(Nombre_Etoiles, (0, 0))

    for year in [2023, 2024]:
        for month in range(1, 13):
            base_revenue = np.random.randint(min_rev, max_rev + 1)
            seasonal_coeff = seasonality_factors.get(month, 1.0)
            monthly_revenue = round(base_revenue * seasonal_coeff)

            rows.append({
                "Hotel_id": Hotel_id,
                "Year": year,
                "Month": month,
                "Monthly_Revenue_TND": monthly_revenue
            })

# Création du DataFrame
revenue_df = pd.DataFrame(rows)

# Sauvegarde
revenue_df.to_excel("hotel_monthly_revenue_2023_2024.xlsx", index=False)

print("✅ Table des revenus mensuels générée avec succès.")
