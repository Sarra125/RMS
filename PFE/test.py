import lightgbm as lgb
import joblib
import pandas as pd

# Prediction function
def predict_hotel_price_lgbm(input_features):
    """
    Predict hotel price using LightGBM model
    
    Args:
        input_features (dict): {
            'Demand_Multiplier_res': float,
            'Occ_Rate_Res': float,
            'Fixed_Cost': float,
            'Region': str  # Original region name
            'Nbre-Etoile'
        }
    
    Returns:
        float: Predicted price
    """
    # Load model and encoder
    model = lgb.Booster(model_file='hotel_pricing_lgbm_model.json')
    le = joblib.load('region_encoder_lgbm.pkl')
    
    # Convert to DataFrame
    input_df = pd.DataFrame([input_features])
    
    # Encode region (handle unseen categories)
    try:
        input_df['Region'] = le.transform(input_df['Region'])
    except ValueError:
        # Assign unknown region code if not found
        input_df['Region'] = len(le.classes_)
    
    # Ensure correct feature order
    input_df = input_df[features]
    
    # Predict
    return float(model.predict(input_df)[0])

if __name__ == "__main__":
        features = [
        'Demand_Multiplier_res',
        'Occ_Rate_Res',
        'Fixed_Cost',
        'Region',
        'Nbre-Etoile'
        ]
        target = 'Paid_Price'
        example_input = {
            'Demand_Multiplier_res': 1.48,
            'Occ_Rate_Res': 0.46,
            'Fixed_Cost': 100,
            'Region': 'Mahdia',
            'Nbre-Etoile':3
        }
     
        predicted_price = predict_hotel_price_lgbm(example_input)
        print(f"\nPredicted price: {predicted_price:.2f}TND")