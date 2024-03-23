def weighted_score(budget, cost, frequency, importance_weights):
    # Commented out in case we want to incorporate a list of budgets
    #max_budget = max(budget)
    #max_cost = max(cost)
    #max_frequency = max(frequency)

    #normalized_budget = budget / max_budget
    #normalized_cost = cost / max_cost
    #normalized_frequency = frequency / max_frequency

    #weighted_score = (importance_weights['budget'] * normalized_budget) + \
    #                 (importance_weights['cost'] * normalized_cost) + \
    #                 (importance_weights['frequency'] * normalized_frequency)

    weighted_score = (importance_weights['budget'] * budget) + \
                     (importance_weights['cost'] * cost) + \
                     (importance_weights['frequency'] * frequency)

    return weighted_score