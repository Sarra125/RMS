import pandas as pd

# Charger le fichier Excel
df = pd.read_excel("C:\\Users\\DELL\\Desktop\\PFE\\rooms_table.xlsx")

# Ajouter une colonne 'id' commençant à 100
df.insert(0, "id", range(100, 100 + len(df)))

# Sauvegarder le fichier avec la nouvelle colonne
df.to_excel("rooms.xlsx", index=False)

print("Colonne 'id' ajoutée avec succès.")
