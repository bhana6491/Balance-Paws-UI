
import { Badge, Dropdown, Space, Table, Tabs, Typography} from 'antd';
import { Chart } from "react-google-charts";
const { Title } = Typography;
import {sumNutrients} from './NutrientSummary'
import  MacroChart  from '../app/graphs/MacronutrientsChart';
import { calcAsFed,calcDryMatter } from './NutrientAnalysis';
const formatData = (data) => {
    const myData = Object.entries(data).map(([label, value]) => ({
        id: label,
        label: label,
        value: value,
        color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
    }));

    return myData;
}

const macronutrientCalculator = (recipe) => {
    const totalNutrients = sumNutrients(recipe);
    const energy = ((3.5 * totalNutrients['protein']) + (8.5 * totalNutrients['fat']) + (3.5 * totalNutrients['nitrogen_free_extract']))*10;
    const protein = (3.5 * totalNutrients['protein'])/energy * 1000;
    const carbs = (3.5 * totalNutrients['nitrogen_free_extract'])/energy * 1000;
    const fat = ((8.5 * totalNutrients['fat']) / energy * 1000)
    const data = {
        "Protein": protein.toFixed(2),
        "Fat": carbs.toFixed(2),
        "Carbohydrates": fat.toFixed(2),
    }; 
    return data

}

const asFedCalculator = (recipe) => { 
    var moisture = recipe.reduce((sum, ingredient) => sum + ingredient.ingredient.water, 0); 
    const totalAmount = recipe.reduce((sum, ingredient) => sum + ingredient.amount, 0); 
    moisture = (moisture / totalAmount) * 100; 

    const asFed = calcAsFed(recipe);
    const metabolic_energy = asFed.metabolic_energy;
    const protein = (asFed.protein / totalAmount) * 1000;

    const data = [
        metabolic_energy,
        protein,
        moisture
    ];

    return data;
}

const dryMatterCalculator = (recipe) => {
    const moisture = 0 
    const totalAmount = recipe.reduce((sum, ingredient) => sum + ingredient.amount, 0); 

    const dryMatter = (calcDryMatter(recipe))
    const metabolic_energy = dryMatter.metabolic_energy
    return [
        metabolic_energy,
        protein,
        moisture
    ]; return data;

}

const macronutrientPercentDiet = (recipe) => {
    const asFed = calcAsFed(recipe)
    return {
        "Crude Protein": asFed.protein.toFixed(2),
        "Crude Fat": asFed.fat.toFixed(2),
        "Carbohydrates By Difference": asFed.nitrogen_free_extract.toFixed(2),
    }; 

}


const recommendationsCalculator = (recipe, petInfo) => {

    const life_stage = petInfo.petInfo.life_stage; 
    const activity_level = petInfo.petInfo.activity_level; 
    const ideal_weight = petInfo.petInfo.weight; 

    var approximate_me = Math.pow(ideal_weight, 0.75) * 70;

    var minimum_protein = 0

    if (life_stage === "Growth") {
        approximate_me = approximate_me * 2.5;
    } else if (life_stage === "Reproduction") {
        approximate_me = approximate_me * 2;
    } else if (activity_level === "Low") {
        approximate_me = Math.pow(ideal_weight, 0.75) * 75;
    } else {
      approximate_me = Math.pow(ideal_weight, 0.75) * 100;
    }

    if (life_stage === "Growth") {
        minimum_protein = ideal_weight * 9.4;
      } else {
        minimum_protein = ideal_weight * 3.97;
      }
    
    const asFed = asFedCalculator(recipe)
    const feedIntakeAsFed = minimum_protein / (asFed[0]/1000)
    const proteinIntakeAsFed = ((asFed[1])/1000) * feedIntakeAsFed
    const data ={
        "approximate_me": approximate_me.toFixed(2), 
        "minimum_protein": minimum_protein.toFixed(2), 
        "feedIntakeAsFed": feedIntakeAsFed.toFixed(2), 
        "proteinIntakeAsFed": proteinIntakeAsFed.toFixed(2)
    }
    console.log(data)
    return data
  }
  



const NutrientDashBoard = ({ recipe, petInfo}) => {

    if (recipe.length == 0){
        return <Title level={5}>Please add ingredients to view nutrient analysis</Title>;
    }
    if (!petInfo.petInfo.species || !petInfo.petInfo.life_stage || !petInfo.petInfo.activity_level || !petInfo.petInfo.weight){ 
        return <Title level={5}>Please provide information about Pet for a detailed analysis breakdown</Title>;
    }
    asFedCalculator(recipe)

    return (
        <>
            <Tabs defaultActiveKey="1" tabBarStyle={{ overflow: 'auto' }}>
                <Tabs.TabPane tab="Macronutrient - Caloric Breakdown" key="1">
                    <div className='text-center' style={{ height: 500 }}>
                        <h2 className='text-base font-semibold'>Macronutrient % of Calories</h2>
                        <MacroChart data={formatData(macronutrientCalculator(recipe))}></MacroChart>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Macronutrient - Diet Breakdown" key="2">
                    <div className='overscroll-auto'>
                        <div className='text-center' style={{ height: 400 }}>
                            <h2 className='text-base font-semibold'>Macronutrient % of Diet </h2>
                            <MacroChart data={formatData(macronutrientPercentDiet(recipe))}></MacroChart>
                        </div>
                        <div className='text-center'>
                            <h2 className='text-base font-semibold'>Recommendations</h2>
                            <Table
                                dataSource={[recommendationsCalculator(recipe, petInfo)]}
                                columns={[
                                    {
                                        title: 'Approximate ME (kcal/day)',
                                        dataIndex: 'approximate_me',
                                        key: 'approximate_me',
                                    },
                                    {
                                        title: 'Minimum Protein (g/day)',
                                        dataIndex: 'minimum_protein',
                                        key: 'minimum_protein',
                                    },
                                    {
                                        title: 'Feed Intake As Fed (g/day)',
                                        dataIndex: 'feedIntakeAsFed',
                                        key: 'feedIntakeAsFed',
                                    },
                                    {
                                        title: 'Protein Intake As Fed (g/day)',
                                        dataIndex: 'proteinIntakeAsFed',
                                        key: 'proteinIntakeAsFed',
                                    },
                                ]}
                                pagination={false}
                            />
                        </div>
                    </div>
                </Tabs.TabPane>
                {/* <Tabs.TabPane tab="Tab 3" key="3">
                    <div style={{ height: 500 }}>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 4" key="4">
                    <div style={{ height: 500 }}>
                    </div>
                </Tabs.TabPane> */}
            </Tabs>
        </>
    );
};

export default NutrientDashBoard;