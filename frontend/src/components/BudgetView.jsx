import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import api from '../api';
import { Card, Divider, Typography, Box, CircularProgress  } from "@mui/joy";

const BudgetView = ({propertyId}) => {
    const [budget, setBudget] = useState(0);
    const [costs, setCosts] = useState(0);
    useEffect(() => {
        const fetchBudgetAndCosts = async() => {
            try{
                const budgetCostsData = await api.getBudgetAndCosts(propertyId);
                setBudget(budgetCostsData.data.total_budget || 0);
                setCosts(budgetCostsData.data.total_active_plans_cost || 0);
            }catch(error){
                // console.log("Errror grabbing budget and costs for property ", propertyId, error)
            }
        }
        fetchBudgetAndCosts();
    }, [propertyId]);

    return(
        <>
            <Card>
                <Typography level="title-lg" align="left">My Budget</Typography>
                <Divider></Divider>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%', 
                    }}
                >
                    <CircularProgress
                        determinate value={Math.round(costs/budget * 100)}
                        variant='solid'
                        sx={{
                            "--CircularProgress-size": "275px",
                            "--CircularProgress-trackThickness": "40px",
                            "--CircularProgress-progressThickness": "35px",
                        }}
                    >
                        <Typography level='h3'>${costs}/${budget}</Typography>
                    </CircularProgress>
                </Box>
            </Card>
        </>
    )
}
export default BudgetView;
BudgetView.propTypes = {
    propertyId: PropTypes.number
};