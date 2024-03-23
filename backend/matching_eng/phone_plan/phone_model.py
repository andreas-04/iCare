def calculate_score(user_prefs, plan_features, weights):
    N, P, B, T = user_prefs
    N_i, P_i, C_i = plan_features
    W1, W2, W3 = weights # tolerance levels for each variable

    budget_diff = max(0, B - C_i)

    # Calculate the score via weights, plans, and user preferences
    
    score = W1 * T[0] * abs(N - N_i) \
          + W2 * T[1] * (0 if P == P_i else 1) \
          + W3 * T[2] * budget_diff # If it's a positive difference only
    
    return score