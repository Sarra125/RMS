import pandas as pd

# Charger la table (remplace par le bon chemin et le bon format si besoin)
df = pd.read_excel('C:\\Users\\DELL\\Desktop\\PFE\\Generated_Data\\unique_arrival_occupancy.xlsx')  # ou pd.read_csv('lidte_tot-hotels.csv')

# Convertir les colonnes date-heure en format date uniquement
for col in ['Arrival_date']:
    df[col] = pd.to_datetime(df[col]).dt.strftime('%d/%m/%Y')

# Afficher un aperçu pour vérifier
print(df[['Arrival_date']].head())

# Sauvegarder si besoin
df.to_excel('Occupancy_rate.xlsx', index=False)  # ou .csv
