from Booking_URL import Booking_Tunisie_URL, Booking_Tunisie_URL_Hotels
from Headless_Browser import Browser_Config
from testparam import*
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from Booking_URL import Booking_Tunisie_URL, Booking_Tunisie_URL_Hotels

def Booking_Scraping(i):
    
    while i <= 365:
        tentatives = 0
        succes = False

        while tentatives < 2 and not succes:
            driver=Browser_Config()

            try:
                driver.get(Booking_Tunisie_URL)
                button_accepter=is_cookie_popup_present(driver)
                if button_accepter:
                    cliquer_sur_accepter(driver)
                    Click_Calendar(driver) 
                
                if verifier_popup_genius(driver):
                         cliquer_croix_popup(driver)
                         Click_Calendar(driver)

                a=1
                a=Parametrage_Booking(driver, i)
                time.sleep(3)
                if a==2:
                    print("skip prob param")
                else: 
                    nombre = Extraire_Nombre_Etablissements(driver)
                    # ce if est pour vérifier que le bouton hotel a été appuyé
                    if 99<=nombre<500:#si le bouton hotel n'est pas appuyé (2000 établissement) on relance le browser
                        WebDriverWait(driver, 30).until(
                            EC.presence_of_element_located((By.CSS_SELECTOR, 'div[data-testid="property-card"]'))
                        )

                        for _ in range(6):
                            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                            time.sleep(6)

                        click_show_more_button(driver)
                        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                        time.sleep(5)
                        nbre_hotels=0
                        hotel_names, prix_list, devises, montants, hotel_adresses=Scrap_Features(driver)
                        nbre_hotels= len(hotel_names)
                        print(f"Jour {i} | Tentative {tentatives+1} : {nbre_hotels} hôtels extraits.")
                        Len_Display(prix_list, hotel_names, hotel_adresses, devises, montants)
                        
                    else:
                        i=i+1
                        time.sleep(2)
                        driver.quit()
                        return Booking_Scraping(i)
                    #ce if est pour vérifier que a été scrappé et que le "afficher plus" button a été cliqué
                    if 100 < nbre_hotels < 500: #pour vérifier si tout les hotels ont été extraits (dés fois on trouve seulement 25)
                        CSV_Creation(hotel_names, hotel_adresses, devises, montants, i)
                        # Excel_Creation(hotel_names, prix_list, hotel_notes, hotel_adresses, evaluations_list)
                        print(f"Fichier créé pour le jour {i} avec {nbre_hotels} lignes.")
                        succes = True #c que nbre correct d'hotel a été scrapped
                        save_progress(i + 1)  # Save next day for resume
                    else:
                        print(f"Extraction incomplète pour le jour {i}. Nouvelle tentative...")

            finally:
                driver.quit()
                tentatives += 1

        if not succes:
            print(f"❌ Échec après 2 tentatives pour le jour {i}. Passage au jour suivant sans sauvegarde.")
            save_progress(i + 1)  # Save next day for resume
        
        i += 1

if __name__ == "__main__":
    #save_progress(0)
    #Create_Folder()
    while True:
        try:
            i = load_progress()
            print(f"scrapping data of day n° {i}")
            Booking_Scraping(i)
            Delete_CSV_Files()
            break  # Exit if successful
        except Exception as e:
            print(f"🔁 Relance du script à cause de l’erreur : {e}")
            i = load_progress()
            save_progress(i + 1)
            time.sleep(30)  # Small delay before retry