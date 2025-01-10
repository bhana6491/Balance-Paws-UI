
import { Badge, Dropdown, Space, Table, Tabs, Typography} from 'antd';
import { Chart } from "react-google-charts";
const { Title } = Typography;
import {sumNutrients} from './NutrientSummary'
const NutrientDashBoard = ({ recipe}) => {
    console.log(recipe)
    const totalNutrients = sumNutrients(recipe);
    console.log(totalNutrients)

    if (recipe.length == 0){
        return <Title level={5}>Please add ingredients to view nutrient analysis</Title>;
    }
    // if (!petInfo.petInfo.species || !petInfo.petInfo.life_stage || !petInfo.petInfo.activity_level || !petInfo.petInfo.weight){ 
    //     return <Title level={5}>Please provide information about Pet for a detailed analysis breakdown</Title>;
    // }
    const energy = ((3.5 * totalNutrients['protein']) + (8.5 * totalNutrients['fat']) + (3.5 * totalNutrients['nitrogen_free_extract']))*10;
    const protein = (3.5 * totalNutrients['protein'])/energy * 1000;
    const carbs = (3.5 * totalNutrients['nitrogen_free_extract'])/energy * 1000;
    const fat = (8.5 * totalNutrients['fat'])/energy * 1000;
    const data = [
        ["Macronutrient" ,"% of Total Calories"],
        ["Protein", protein],
        ["Fat", carbs],
        ["Carbohydrates", fat],
      ];
    
    const options = {
        title: "% of Total Calories by Macronutrient",
    };
    return (
        <>
            <div className='grid grid-cols-2 grid-rows-4 gap-4' style={{ overflow: 'auto' }}>
                <div className='border border-black p-4'>
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width={"100%"}
                        height={"100%"}
                    />
                </div>
            </div>
        </>
    );
};

export default NutrientDashBoard;