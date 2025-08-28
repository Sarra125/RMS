import numpy as np
import pandas as pd
from scipy.stats import bernoulli, norm, poisson, gamma

# Number of samples
num_samples = 100000

# 1. Hotel Rating (4 or 5 stars)
hotel_rating = bernoulli.rvs(0.3, size=num_samples) + 4  # 4-star (70%), 5-star (30%)

# 2. Hotel Location (City=0, Seaside=1)
hotel_location = bernoulli.rvs(0.4, size=num_samples)  # 60% city, 40% seaside

# 3. Fixed Cost (depends on hotel rating)
fixed_cost = np.where(hotel_rating == 4, np.random.uniform(80, 160, num_samples), np.random.uniform(160, 600, num_samples))

# 4. Hotel Type (Business=0, Resort=1)
hotel_type = bernoulli.rvs(0.3, size=num_samples)  # 70% Business, 30% Resort

# 5. Base Rate (depends on location and type)
base_rate = np.zeros(num_samples)
for i in range(num_samples):
    if hotel_type[i] == 1 and hotel_location[i] == 0:
        base_rate[i] = norm.rvs(400, 250)
    elif hotel_type[i] == 0 and hotel_location[i] == 0:
        base_rate[i] = norm.rvs(250, 150)
    elif hotel_type[i] == 1 and hotel_location[i] == 1:
        base_rate[i] = norm.rvs(600, 300)
    else:
        base_rate[i] = norm.rvs(300, 180)

# 6. Demand Multiplier (Seasonality Effects)
demand_multiplier = np.clip(norm.rvs(1.5, 0.25, size=num_samples), 1, 2)

# 7. Inventory Multiplier (Inverse of Demand Multiplier)
inventory_multiplier = 2 / demand_multiplier

# 8. Reservation Date (Random Day of Year)
reservation_days = np.random.randint(1, 366, size=num_samples)

# 9. Lead Time (Days before Arrival, Poisson Distribution)
lead_time = np.clip(poisson.rvs(30, size=num_samples), 1, 365)

# 10. Arrival Date (Derived from Reservation Date + Lead Time)
arrival_days = (reservation_days + lead_time) % 365

# 11. Stay Duration (Business shorter stays, Resort longer stays)
stay_duration = np.where(hotel_type == 0, poisson.rvs(2, size=num_samples), np.clip(norm.rvs(5, 2, size=num_samples), 1, 14))

# 12. Occupancy Rate at Reservation (Gamma Distribution)
occupancy_rate_reservation = gamma.rvs(2, scale=0.3, size=num_samples)
occupancy_rate_reservation = np.clip(occupancy_rate_reservation, 0, 1)

# 13. Revenue per Available Room (RevPAR)
rev_par = occupancy_rate_reservation * base_rate

# 14. Paid Price (Final Price Calculation)
paid_price = fixed_cost + (base_rate * demand_multiplier * inventory_multiplier)

# Create DataFrame
df = pd.DataFrame({
    'Hotel Rating': hotel_rating,
    'Hotel Location': hotel_location,
    'Fixed Cost': fixed_cost,
    'Hotel Type': hotel_type,
    'Base Rate': base_rate,
    'Demand Multiplier': demand_multiplier,
    'Inventory Multiplier': inventory_multiplier,
    'Reservation Day': reservation_days,
    'Lead Time': lead_time,
    'Arrival Day': arrival_days,
    'Stay Duration': stay_duration,
    'Occupancy Rate (Reservation)': occupancy_rate_reservation,
    'RevPAR': rev_par,
    'Paid Price': paid_price
})

# Save to CSV
df.to_csv('hotel_booking_data.csv', index=False)

print("Dataset Generated: 2000 Samples Saved to 'hotel_booking_data.csv'")
