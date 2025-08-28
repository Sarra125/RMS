from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import date, timedelta
from Booking_URL import Booking_Tunisie_URL
import time
import csv
import re
import pandas as pd
from pathlib import Path
import shutil
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException
from selenium.common.exceptions import NoSuchElementException
import os

def save_progress1(i):
    with open("progress1.txt", "w") as f:
        f.write(str(i))

def load_progress1():
    if os.path.exists("progress1.txt"):
        with open("progress1.txt", "r") as f:
            return int(f.read())
    return 0

def save_progress2(i):
    with open("progress2.txt", "w") as f:
        f.write(str(i))

def load_progress2():
    if os.path.exists("progress2.txt"):
        with open("progress2.txt", "r") as f:
            return int(f.read())
    return 0

def save_progress3(i):
    with open("progress3.txt", "w") as f:
        f.write(str(i))

def load_progress3():
    if os.path.exists("progress3.txt"):
        with open("progress3.txt", "r") as f:
            return int(f.read())
    return 0

def save_progress4(i):
    with open("progress4.txt", "w") as f:
        f.write(str(i))

def load_progress4():
    if os.path.exists("progress4.txt"):
        with open("progress4.txt", "r") as f:
            return int(f.read())
    return 0

def save_progress5(i):
    with open("progress5.txt", "w") as f:
        f.write(str(i))

def load_progress5():
    if os.path.exists("progress5.txt"):
        with open("progress5.txt", "r") as f:
            return int(f.read())
    return 0

def Click_Bouton_Mois_Suivant(driver,i): 
    """
    Clique sur le bouton "Mois suivant" dans le calendrier Booking.
    """
    try:
        wait = WebDriverWait(driver, 10)
        bouton_suivant = wait.until(EC.element_to_be_clickable((By.XPATH, '//button[@aria-label="Mois suivant"]')))
        bouton_suivant.click()
        print("✅ Bouton 'Mois suivant' cliqué avec succès.")
    except Exception as e:
        print("❌ Erreur lors du clic sur le bouton 'Mois suivant' :", e)
        


def Month_Change(driver, first_day, second_day, i):
    """
    S'assure que les dates first_day et second_day sont visibles dans le calendrier.
    Si ce n'est pas le cas, clique sur 'Mois suivant' jusqu'à ce qu'elles le soient.
    """
    wait = WebDriverWait(driver, 10)
    max_clicks = 12  # max 1 year forward

    try:
        # Vérifie si first_day est visible, sinon clique jusqu'à ce qu’il le soit
        for _ in range(max_clicks):
            try:
                wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, f'span[data-date="{first_day}"]')))
                print(f"✅ Date {first_day} trouvée.")
                break
            except:
                Click_Bouton_Mois_Suivant(driver, i)
                time.sleep(0.5)
        else:
            print(f"❌ Date {first_day} introuvable après {max_clicks} clics sur 'Mois suivant'.")
            i=i+1
            return 2

        # Ensuite, s’assure que second_day est aussi visible
        for _ in range(max_clicks):
            try:
                wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, f'span[data-date="{second_day}"]')))
                print(f"✅ Date {second_day} trouvée.")
                break
            except:
                Click_Bouton_Mois_Suivant(driver, i)
                time.sleep(0.5)
        else:
            print(f"❌ Date {second_day} introuvable après {max_clicks} clics sur 'Mois suivant'.")
            i=i+1
            return 2
            

    except Exception as e:
        print(f"❌ Erreur pendant Month_Change : {e}")
        i=i+1
        return 2
    

def Extraire_Nombre_Etablissements(driver):
    """
    Extrait le nombre d'établissements trouvés sur la page Booking.com,
    en utilisant un XPath stable basé sur le texte visible.
    """
    try:
        time.sleep(2)  # à remplacer idéalement par WebDriverWait

        # XPath plus souple
        element = driver.find_element(By.XPATH, '//h1[contains(text(), "établissement")]')
        texte = element.text  # Ex: "Tunisie : 2 345 établissements trouvés"

        # Extraire le nombre (même s'il contient des espaces insécables)
        match = re.search(r'([\d\s\u202f]+)\s+établissement', texte)
        if match:
            nombre_str = match.group(1).replace(" ", "").replace("\u202f", "")
            print("✅Nombre d'établissements trouvés :", nombre_str)
            return int(nombre_str)
        else:
            print("Nombre non trouvé dans :", texte)
            return 250

    except Exception as e:
        print("Erreur lors de l'extraction du nombre d'établissements :", e)
        return 250


def Delete_CSV_Files():
    today_str = date.today().isoformat()  # e.g., '2025-05-08'
    # Define the folder path
    output_folder = Path(today_str)
    folder = Path(output_folder)
    
    if not folder.exists() or not folder.is_dir():
        print(f"Folder does not exist: {folder}")
        return

    csv_files = list(folder.glob("*.csv"))

    for file in csv_files:
        try:
            file.unlink()
            print(f"Deleted: {file.name}")
        except Exception as e:
            print(f"Error deleting {file.name}: {e}")

def Create_Folder():
    # Get today's date as a string
    today_str = date.today().isoformat()  # e.g., '2025-05-08'

    # Define the folder path
    output_folder = Path(today_str)

    # Delete the folder if it exists
    if output_folder.exists() and output_folder.is_dir():
        shutil.rmtree(output_folder)

    # Create a fresh folder
    output_folder.mkdir(parents=True)

    # Example: Save a file inside that folder
    sample_file = output_folder / "example.txt"
    with open(sample_file, "w", encoding="utf-8") as f:
        f.write("Data for today goes here.")

    return output_folder
    

#def Hotel_Evaluations(driver):
    # Trouver tous les blocs contenant les évaluations visibles
    evaluation_blocks = driver.find_elements(By.XPATH, '//div[@aria-hidden="false" and contains(@class, "aa225776f2")]')

    # Liste pour stocker les évaluations
    evaluations_list = []

    # Extraire le texte d'évaluation
    for block in evaluation_blocks:
        try:
            eval_text = block.find_element(By.XPATH, './div[contains(@class, "f63b14ab7a")]').text.strip().lower()
            evaluations_list.append(eval_text)  # On ajoute la chaîne directement
        except:
            evaluations_list.append("non trouvée")

    return evaluations_list

def Hotel_Adresses(driver):
    # Récupérer tous les éléments d’adresse
    adresse_elements = driver.find_elements(By.CSS_SELECTOR, "[data-testid='address']")

    # Extraire les textes
    hotel_adresses = [el.text for el in adresse_elements if el.text.strip() != ""]
    return hotel_adresses

#def Hotel_Notes(driver):
    # Extraire les notes
    note_elements = driver.find_elements(By.CLASS_NAME, "bc946a29db")
    hotel_notes = []
    for el in note_elements:
        match = re.search(r"\b\d,\d\b", el.text)
        if match:
            note_str = match.group().replace(",", ".")  # Remplacer la virgule par un point
            hotel_notes.append(float(note_str))         # Convertir en float
    
    return hotel_notes

def Get_Dates():
    today = date.today().isoformat()
    tomorrow = (date.today() + timedelta(days=1)).isoformat()
    return today, tomorrow

def Hotel_Names(driver):
    # Sélecteurs CSS potentiels pour les noms d'hôtels (Booking change parfois de structure)
    selectors = [
        'div[data-testid="title"]',
        'div.f6431b446c.a15b38c233',
        'div.a1b3f50dcd.b2fe1a41c3.a7c67ebfe5.d19ba76520.d14b211b4f'
    ]

    hotel_names = []

    # Tenter les différents sélecteurs pour extraire les noms d'hôtels
    for selector in selectors:
        try:
            hotel_elements = driver.find_elements(By.CSS_SELECTOR, selector)
            if hotel_elements:
                for hotel in hotel_elements:
                    name = hotel.text.strip()
                    if name:
                        hotel_names.append(name)
                break  # Si un sélecteur fonctionne, on arrête de tester les autres
        except:
            continue  # En cas d'erreur avec un sélecteur, essayer le suivant

    return hotel_names

def Hotel_Prices(driver):
    # Récupérer les éléments de prix
    prix_elements = driver.find_elements(By.CSS_SELECTOR, 'span[data-testid="price-and-discounted-price"]')

    # Extraire les prix
    prix_list = [elem.text.replace('\xa0', ' ') for elem in prix_elements if elem.text.strip() != '']
    return prix_list

def Click_Hotel_Filter(driver, i):
    try:
        # Attendre que le filtre "Hôtel" soit cliquable
        hotel_filter = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//div[@data-testid='filters-group-label-content' and contains(text(), 'Hôtel')]"))
        )
        hotel_filter.click()
        print("Élément 'Hôtel' cliqué avec succès!")
    except Exception as e:
        print(f"Erreur lors du clic sur 'Hôtel' : {e}")


def Tape_Tunisie(driver):
    wait = WebDriverWait(driver, 10)
    # Localiser la zone "Où allez-vous ?" par son placeholder
    destination_input = wait.until(
       EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Où allez-vous ?"]')))

    # Cliquer et taper "Tunisie"
    destination_input.click()
    destination_input.clear()
    destination_input.send_keys("Tunisie")
    print("Wrote Tunisie!")

    # Wait for the autocomplete suggestion and click it
    suggestion = wait.until(EC.element_to_be_clickable((By.XPATH, "//div[text()='Tunisie']")))
    suggestion.click()
    print("Tunisie clicked!")

def Click_Calendar(driver):
    # Cliquer sur le bouton "Date d'arrivée" via XPath
    calendrier_button = driver.find_element(By.CSS_SELECTOR, '[data-testid="searchbox-dates-container"]')
    calendrier_button.click()
    print("calendar opened!")
    #input("Press Enter!")

def Parametrage_Booking(driver, i):
    first_day = (date.today() + timedelta(days=i)).isoformat()
    second_day = (date.today() + timedelta(days=i + 1)).isoformat()
    print(first_day)
    print(second_day)

    try:
        b=1
        b=Month_Change(driver, first_day, second_day, i)
        if b==2:
            print("skip prob month_change")
            return None
        else:
            wait = WebDriverWait(driver, 10)

            # Click today's date
            date_1 = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, f'span[data-date="{first_day}"]')))
            date_1.click()

            # Click tomorrow's date
            date_2 = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, f'span[data-date="{second_day}"]')))
            date_2.click()

            # Click the "Rechercher" button
            search_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//button[.//span[text()="Rechercher"]]')))
            search_button.click()

            if verifier_popup_genius(driver):
                cliquer_croix_popup(driver)

            Click_Hotel_Filter(driver, i)

            print("Finished Paramétrage!")
            #return driver  
    except (StaleElementReferenceException, TimeoutException) as e:
        print(f"Paramétrage Attempt failed due to: {e.__class__.__name__}")
        time.sleep(1)
        return 2
        
                
    

def click_show_more_button(driver):
    prev_count = 0
    while True:
        try:
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(4)

            show_more = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, '//button[span[text()="Afficher plus de résultats"]]'))
            )
            show_more.click()
            time.sleep(6)

            current_count = len(driver.find_elements(By.CSS_SELECTOR, 'div[data-testid="property-card"]'))
            if current_count == prev_count:
                break
            prev_count = current_count

        except:
            print("No more 'Afficher plus de résultats' button found.", flush=True)
            break

def CSV_Creation(hotel_names, hotel_adresses, devises, montants, i):
        today = date.today().isoformat()
        first_day=(date.today() + timedelta(days=i)).isoformat()
        print(first_day)
        second_day=(date.today() + timedelta(days=i+1)).isoformat()
        print(second_day)
        output_folder = Path(today)
        # Créer le nom de fichier dynamique avec la valeur de first_day
        csv_filename = output_folder / f"{first_day}.csv"
        excel_filename = output_folder / f"{first_day}.xlsx"

    # Écriture dans le fichier CSV
        with open(csv_filename, "w", newline='', encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["Hotel Name", "Adresse", "devise", first_day])
            for name, adresse, devise, montant in zip(hotel_names, hotel_adresses, devises, montants):
                writer.writerow([name, adresse, devise, montant])

        # Conversion du CSV en fichier Excel
        df = pd.read_csv(csv_filename)
        df.to_excel(excel_filename, index=False)


def Excel_Creation(hotel_names, prix_list, hotel_notes, hotel_adresses, evaluations_list):
    today = date.today().isoformat()
    
    # Create a DataFrame
    df = pd.DataFrame({
        "Hotel Name": hotel_names,
        today: prix_list,
        "Note": hotel_notes,
        "Adresse": hotel_adresses,
        "Evaluation": evaluations_list
    })
    
    # Write to Excel file
    df.to_excel("hotels.xlsx", index=False)

def extraire_montants_et_devises(prix_list):
    devises = []
    montants = []
    
    for prix in prix_list:
        prix = prix.strip()
        match = re.match(r"([^\d]+)\s*([\d.,]+)", prix)
        if match:
            devise = match.group(1).strip()
            montant_str = match.group(2).replace(",", ".").replace(" ", "")
            try:
                montant = float(montant_str)
                devises.append(devise)
                montants.append(montant)
            except ValueError:
                continue  # ignore les valeurs invalides
    return devises, montants

def Scrap_Features(driver):
    hotel_names = Hotel_Names(driver)
    prix_list = Hotel_Prices(driver)
    devises, montants = extraire_montants_et_devises(prix_list)
    hotel_adresses = Hotel_Adresses(driver)
    return hotel_names, prix_list, devises, montants, hotel_adresses

def Len_Display(prix_list, hotel_names, hotel_adresses, devises, montants):
    print(f"nbre prix: {len(prix_list)}.")
    print(f"nbre names: {len(hotel_names)}.")
    print(f"nbre adresses: {len(hotel_adresses)}.")
    print(f"nbre devises: {len(devises)}.")
    print(f"nbre montant: {len(montants)}.")

def is_cookie_popup_present(driver) -> bool:
    """
    Detects if the cookie settings popup is present on the page.

    Args:
        driver (WebDriver): Selenium WebDriver instance.

    Returns:
        bool: True if the cookie popup is present, False otherwise.
    """
    try:
        driver.find_element(By.ID, "onetrust-policy-title")
        print("Cookie popup is present.")
        return True
    except NoSuchElementException:
        print("Cookie popup is not present.")
        return False

def cliquer_sur_accepter(driver):
    try:
        # Attendre que le bouton soit cliquable (max 10 secondes)
        bouton_accepter = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "onetrust-accept-btn-handler"))
        )
        bouton_accepter.click()
        print("Bouton 'Accepter' cliqué avec succès.")
    except Exception as e:
        print("Erreur lors du clic sur le bouton 'Accepter':", e)

def verifier_popup_genius(driver, timeout=15):
    try:
        WebDriverWait(driver, timeout).until(
            EC.presence_of_element_located((By.XPATH, "//span[contains(@aria-label, 'logo bleu Genius')]"))
        )
        print("Popup Genius détecté.")
        return True
    except:
        print("Popup Genius non détecté.")
        return False
    
def cliquer_croix_popup(driver, timeout=5):
    try:
        # Localisation du bouton via l'attribut aria-label
        croix = WebDriverWait(driver, timeout).until(
            EC.element_to_be_clickable((By.XPATH, "//button[@aria-label='Ignorer les infos relatives à la connexion']"))
        )
        croix.click()
        print("Popup Genius fermé avec succès.")
        return True
    except TimeoutException:
        print("Impossible de localiser la croix du popup.")
        return False


if __name__ == "__main__":
    #Parametrage_Booking()
    today, tomorrow=Get_Dates()
    print(today)
    print(tomorrow)
