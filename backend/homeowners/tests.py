def calculate_lawn_score(cost, budget, budget_tolerance, cost_weight, frequency, desired_frequency, frequency_weight):
    cost = cost * frequency
    if(cost > budget + (budget * budget_tolerance)):
        return 0.0
    cost_score = 1 - (cost / (budget + (budget * budget_tolerance)))
    frequency_score = 1 - (abs(frequency - desired_frequency) / desired_frequency)
    normalized_cost_score = max(0, min(1, cost_score))
    normalized_frequency_score = max(0, min(1, frequency_score))
    final_score = (normalized_cost_score * cost_weight) + (normalized_frequency_score * frequency_weight)
    return final_score

def calculate_phone_score(cost, budget, budget_t, cost_w, users, p_users, user_w, plan, p_plan, plan_w):
    if(cost > budget + (budget * budget_t)):
        return 0.0
    cost_score = 1 - (cost / (budget + (budget * budget_t)))
    user_score = 1 - (abs(p_users - users) / users)
    if(plan == p_plan):
        plan_score = 1
    else:
        plan_score = 0
    normalized_cost_score = max(0, min(1, cost_score))
    normalized_user_score = max(0, min(1,user_score))

    return (normalized_cost_score * cost_w) + (normalized_user_score * user_w) + (plan_score * plan_w)


def calculate_internet_score(cost, budget, budget_t, budget_w, p_speed, speed, speed_t, speed_w, p_users, users, users_w):
    if(cost > budget - (budget*budget_t)):
        return 0.0

    cost_score = 1 - (cost / (budget + (budget * budget_t)))
    user_score = 1 - (abs(p_users - users) / users)
    speed_score = 1 - (abs(p_speed - speed) / speed)

    normalized_cost_score = max(0, min(1, cost_score))
    normalized_user_score = max(0, min(1, user_score))
    normalized_speed_score = max(0, min(1, speed_score)) 
    
    final_score = (normalized_cost_score * budget_w) + (normalized_user_score * users_w) + (normalized_speed_score * speed_w)
    
    return final_score


cost = 100
budget = 500
budget_tolerance = .3
cost_weight= .8
frequency = 4
desired_frequency = 5
frequency_weight = .2
print(calculate_lawn_score(cost, budget, budget_tolerance, cost_weight, frequency, desired_frequency, frequency_weight))
      
cost = 0
budget = 1
budget_t = .1
cost_w = .4
users = 3
p_users = 3
user_w = .2
plan = "unlimited"
p_plan = "unlimited"
plan_w = .4
print(calculate_phone_score(cost, budget, budget_t, cost_w, users, p_users, user_w, plan, p_plan, plan_w))
cost = 100 # Example cost
budget = 500 # Example budget
budget_t = 0.3 # Budget tolerance
budget_w = 0.6 # Budget weight
p_speed = 100 # Previous speed
speed = 120 # Desired speed
speed_t = 0.2 # Speed tolerance
speed_w = 0.2 # Speed weight
p_users = 5 # Previous number of users
users = 5 # Desired number of users
users_w = 0.2 # Users weight

print(calculate_internet_score(cost, budget, budget_t, budget_w, p_speed, speed, speed_t, speed_w, p_users, users, users_w))

