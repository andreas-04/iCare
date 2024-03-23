from backend.matching_eng.lawncare.lawncare_model import weighted_score

# Example for testing the model

budget = 500
cost = 50
frequency = 4
importance_weights = {'budget': 0.4, 'cost': 0.3, 'frequency': 0.3}

score = weighted_score(budget, cost, frequency, importance_weights)
print("Total weighted score is: " + str(score))