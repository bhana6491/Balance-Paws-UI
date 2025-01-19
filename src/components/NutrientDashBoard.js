
import { Badge, Dropdown, Space, Table, Tabs, Typography} from 'antd';
import { Chart } from "react-google-charts";
const { Title } = Typography;
import {sumNutrients} from './NutrientSummary'
import  MacroChart  from '../app/graphs/MacronutrientsChart';

const formatData = (data) => {
    const myData = Object.entries(data).map(([label, value]) => ({
        id: label,
        label: label,
        value: value,
        color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
    }));

    return myData;
}
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
    const fat = ((8.5 * totalNutrients['fat']) / energy * 1000)
    const data = {
        "Protein": protein.toFixed(2),
        "Fat": carbs.toFixed(2),
        "Carbohydrates": fat.toFixed(2),
    }; 

    return (
        <>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Macronutrient Breakdown" key="1">
                    <div className= 'text-center'style={{ height: 500 }}>
                        <h2 className='text-base font-semibold'>% of Total Calories by Macronutrient</h2>
                        <MacroChart data={formatData(data)}></MacroChart>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 2" key="2">
                    <div style={{ height: 500 }}>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 3" key="3">
                    <div style={{ height: 500 }}>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 4" key="4">
                    <div style={{ height: 500 }}>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        </>
    );
};

export default NutrientDashBoard;