from phone_model import calculate_score

user_prefs = (2, "Unlimited", 60, (0.4, 0.4, 0.2))
plan_features = (3, "Unlimited", 40) # users, plan type, cost
weights = (0.25, 0.25, 0.5) # Weight for num of users, plan type, and budget
score = calculate_score(user_prefs, plan_features, weights)
print("Phone Score: " + str(score))