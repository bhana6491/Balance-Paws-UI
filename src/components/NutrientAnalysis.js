import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table, Tabs, Typography, Switch} from 'antd';
const { Title } = Typography;
import { NRC, AAFCO, FEDIAF, MAX } from './recommendations';

const items = [
  {
    key: '1',
    label: 'Action 1',
  },
  {
    key: '2',
    label: 'Action 2',
  },
];
const unit_mappings = {
    water: 'g',
    protein: '%',
    fat: '%',
    fiber: '%',
    ash: '%',
    starch: '%',
    sugars: '%',
    proline: 'g',
    arginine: '%',
    histidine: '%',
    isoleucine: '%',
    leucine: '%',
    lysine: '%',
    methionine: '%',
    cystine: 'g',
    phenylalanine: '%',
    tyrosine: 'g',
    threonine: '%',
    tryptophan: '%',
    valine: '%',
    glutamic_acid: 'g',
    aspartic_acid: 'g',
    glycine: 'g',
    serine: 'g',
    alanine: 'g',
    calcium: '%',
    phosphorus: '%',
    sodium: '%',
    chloride: '%',
    potassium: '%',
    magnesium: '%',
    sulfur: 'mg',
    copper: 'mg/kg',
    iron: 'mg/kg',
    manganese: 'mg/kg',
    selenium: 'mg/kg',
    zinc: 'mg/kg',
    iodine: 'mg/kg',
    biotin: 'ug',
    folate: 'mg/kg',
    niacin: 'mg/kg',
    pantothenic_acid: 'mg/kg',
    pyridoxine: 'mg/kg',
    riboflavin: 'mg/kg',
    thiamin: 'mg/kg',
    vitamin_b12: 'mg/kg',
    vitamin_d: 'IU',
    vitamin_e: 'IU',
    vitamin_k: 'ug',
    vitamin_a: 'IU',
    vitamin_c: 'mg',
    beta_carotene: 'ug',
    choline: 'mg/kg',
    linoleic_acid: '%',
    linolenic_acid: '%',
    arachidonic_acid: '%',
    eicosapentaenoic_acid: '%',
    docosahexaenoic_acid: '%',
    taurine: '%',
    metabolic_energy: 'kcal/kg',
    dry_matter: 'g',
    nitrogen_free_extract: '%',
    methionine_cystine: '%',
    phenylalanine_tyrosine: '%',
    sum_n_3: 'g',
    sum_n_6: 'g', 
    epa_dha: '%',
    omega_6_3: '%', 
    calcium_phosphorus: '%',
  };

  

//   const nutrient_analysis_unit_mappings = {
//     percent :[metabolic_energy, protein, fat, nitrogen_free_extract, arginine, histidine, isoleucine, leucine, lysine, methionine, methionine_cystine, 
//         phenylalanine, phenylalanine_tyrosine, threonine, tryptophan, valine, taurine, linoleic_acid, linolenic_acid, arachidonic_acid, epa_dha, omega_6_3, fiber, starch, sugars,
//     calcium, phosphorus, potassium, sodium, chloride, magnesium, ash],
//     mg_kg: [iron, copper, manganese, zinc, thiamine, riboflavin, pantothenic_acid, niacin, pyridoxine, choline],
//     iu_kg: [vitamin_a, vitamin_d, vitamin_e, folate, vitamin_b12],
//     ug_kg: [iodine, selenium], 
//     ratio: [calcium_phosphorus, omega_6_3]
//   }
  
const nutrientCategories = {
    macronutrients: {
    metabolic_energy: 'Metabolic Energy',
    protein: 'Protein',
    fat: 'Fat',
    nitrogen_free_extract:'Carbohydrates by difference', 
    }, 
    protein: {
        arginine:'Arginine',
        histidine:'Histidine',
        isoleucine:'Isoleucine',
        leucine:'Leucine',
        lysine:'Lysine',
        methionine:'Methionine',
        methionine_cystine:'Met + Cys',
        phenylalanine:'Phenylalanine',
        phenylalanine_tyrosine:'Phe + Tyr',
        threonine:'Threonine',
        tryptophan:'Tryptophan',
        valine:'Valine',
        taurine:'Taurine'
    },
    fat:{
        linoleic_acid:'Linoleic acid',
        linolenic_acid: 'α-Linolenic acid',
        arachidonic_acid: 'Aracidonic acid',
        epa_dha: 'EPA + DHA',
        omega_6_3: 'Omega 6:3',
    }, 
    carbohydrates:{
        fiber: 'Total Dietary Fiber',
        starch: 'Total Starch',
        sugars: 'Total Sugars',
    }, 
    minerals:{
        calcium:'Calcium',
        phosphorus:'Phosphorus',
        calcium_phosphorus: 'Calcium:Phosporous',
        potassium: 'Potassium',
        sodium: 'Sodium',
        chloride: 'Chloride ',
        magnesium: 'Magnesium',
        iron: 'Iron',
        copper: 'Copper',
        manganese: 'Manganese',
        zinc: 'Zinc',
        iodine: 'Iodine',
        selenium: 'Selenium'
    }, 
    vitamins:{
        vitamin_a:'Vitamin A',
        vitamin_d:'Vitamin D',
        vitamin_e:'Vitamin E',
        thiamin:'Thiamin',
        riboflavin:'Riboflavin',
        pantothenic_acid:'Pantothenic acid',
        niacin:'Niacin',
        pyridoxine:'Pyridoxine',
        folate:'Folic acid',
        vitamin_b12:'Vitamin B12',
        choline:'Choline',
        vitamin_c:'Vitamin C',
    },
};

const ratios = ['calcium_phosphorus', 'omega_6_3'];

const calcDryMatter = (recipe) => {

    const totalDryMatter = recipe.reduce((sum, ingredient) => {
        const dryMatterValue = ingredient.ingredient.dry_matter;
        const ingredientAmount = ingredient.amount;
        if (dryMatterValue && ingredientAmount) {
            return sum + (dryMatterValue * ingredientAmount) / 100;
        }
        return sum;
    }, 0);

    const dryMatter = {};

    for (const nutrientCategory in nutrientCategories) {
        for (const nutrient in nutrientCategories[nutrientCategory]) {
            var total = 0;
            for (const ingredient of recipe) {
                if (ingredient.ingredient[nutrient]) {
                    if (ingredient.ingredient[nutrient]) {
                        total += ingredient.ingredient[nutrient];
                    }
                    else {
                        ingredient.ingredient[nutrient] = 0;
                    }
                    }
            }
            dryMatter[nutrient] = (total / totalDryMatter) * 100;

        }
    }
    // Custom adjustments needed for certain nutrients
    dryMatter.metabolic_energy = ((dryMatter.protein * 4) + (dryMatter.fat * 9) + (dryMatter.nitrogen_free_extract * 4)) * 10;
    dryMatter.epa_dha = (dryMatter.eicosapentaenoic_acid || 0) + (dryMatter.docosahexaenoic_acid || 0); //Don't have recalc dry matter version, already dry matter
    //TODO: Need to add the :1 
    dryMatter.omega_6_3 = ((dryMatter.linoleic_acid / dryMatter.arachidonic_acid) + (dryMatter.linolenic_acid + dryMatter.epa_dha));
    return dryMatter;
};

const calcAsFed = (recipe) => {

    const totalIngredientAmount = recipe.reduce((sum, ingredient) => {
        return sum + ingredient.amount;
    }, 0);


    const asFed = {};

    for (const nutrientCategory in nutrientCategories) {
        for (const nutrient in nutrientCategories[nutrientCategory]) {
            var total = 0;
            for (const ingredient of recipe) {
                if (ingredient.ingredient[nutrient]) {
                    total += ingredient.ingredient[nutrient];
                }
                else {
                    ingredient.ingredient[nutrient] = 0;
                }

            }
            asFed[nutrient] = (total / totalIngredientAmount) * 100;

        }
    }
    
    // Custom adjustments needed for certain nutrients
    asFed.metabolic_energy = ((asFed.protein * 4) + (asFed.fat * 9) + (asFed.nitrogen_free_extract * 4)) * 10;
    asFed.epa_dha = (asFed.eicosapentaenoic_acid || 0) + (asFed.docosahexaenoic_acid || 0); //Don't have recalc dry matter version, already dry matter
    asFed.omega_6_3 = ((asFed.linoleic_acid / asFed.arachidonic_acid) + (asFed.linolenic_acid + asFed.epa_dha))
    return asFed;
};



const Recipe = ({ recipe, format, petInfo}) => {
    const nutrientsFinal = format === 'asFed' ? calcAsFed(recipe) : calcDryMatter(recipe);

    const species = petInfo.petInfo['species'][0];
    // anything not growth or reproduction, defaults to maintenance 
    const life_stage = petInfo.petInfo['life_stage'] !== 'growth' && petInfo.petInfo['life_stage'] !== 'reproduction' ? 'Maintenance' : petInfo.petInfo['life_stage'];
    const activity_level = petInfo.petInfo['activity_level'][0];

    const generateTable = (data, columns) => {
        return data.length > 0 ? (
            <Table
                dataSource={data}
                columns={columns}
                pagination={{ defaultPageSize: 8, hideOnSinglePage: true }}
                scroll={{ y: 400 }}
            />
        ) : (
            <Title level={5}>Data not reported</Title>
        );
    };
  
    const generateColumns = () => {
        return [
            { title: "Nutrient", dataIndex: "nutrient", key: "nutrient" },
            { title: "Value", dataIndex: "value", key: "value" },
            { title: "NRC", dataIndex: "nrc", key: "nrc",      render: (text) => ({
                children: text || '-',
                props: {
                //   style: { backgroundColor: text ? 'inherit' : '#000000' }, // Change color if empty
                },
              })},
            { title: "FEDIAF", dataIndex: "fediaf", key: "fediaf",      render: (text) => ({
                children: text || '-',
                props: {
                //   style: { backgroundColor: text ? 'inherit' : '#000000' }, // Change color if empty
                },
              })},
            { title: "AAFCO", dataIndex: "aafco", key: "aafco",      render: (text) => ({
                children: text || '-',
                props: {
                //   style: { backgroundColor: text ? 'inherit' : '#000000' }, // Change color if empty
                },
              })},
            { title: "Maximum", dataIndex: "maximum", key: "maximum",     render: (text) => ({
                children: text || '-',
                props: {
                //   style: { backgroundColor: text ? 'inherit' : '#000000' }, // Change color if empty
                },
              }),
          },
            { title: "Unit", dataIndex: "unit", key: "unit" },
        ];
    };
  
    const generateData = (category, nutrientsFinal, species, life_stage, activity_level) => {
        console.log(species, activity_level, life_stage )
        return Object.entries(nutrientsFinal)
            .filter(
                ([key, value]) =>
                    nutrientCategories[category].hasOwnProperty(key) && value !== null
            )
            .map(([key, value]) => {
                // NOTE: The amount is divided by 100 because the values are per 100g
                return {
                    key: key,
                    nutrient: nutrientCategories[category][key],
                    value: nutrientsFinal[key].toFixed(2),
                    nrc: NRC[species][life_stage][key],
                    fediaf: FEDIAF[species][activity_level === 'Low' && life_stage !== 'Growth' && life_stage !== 'Reproduction' ? 'Low' : life_stage][key],
                    aafco: AAFCO[species][life_stage][key],
                    maximum: MAX[species][life_stage][key], 
                    unit: unit_mappings[key],
                };
            });
    };

    return (
        <div>
            <Tabs defaultActiveKey="1"
                items={[
                    ...Object.entries(nutrientCategories).map(
                        ([category], index) => ({
                            label: category.toUpperCase(),
                            key: index,
                            children: generateTable(
                                generateData(
                                    category,
                                    nutrientsFinal,
                                    species, life_stage, activity_level
                                ),
                                generateColumns()
                            )
                        })
                    )
                ]}
            />
        </div>
    );
};
    
const NutrientAnalysis = ({ recipe,petInfo}) => {

    if (recipe.length == 0){
        return <Title level={5}>Please add ingredients to view nutrient analysis</Title>;
    }
    if (!petInfo.petInfo.species || !petInfo.petInfo.life_stage || !petInfo.petInfo.activity_level || !petInfo.petInfo.weight){ 
        return <Title level={5}>Please provide information about Pet for a detailed analysis breakdown</Title>;
    }

    const [format, setFormat] = React.useState('dryMatter');

    const handleFormatChange = (selectedFormat) => {
        setFormat(selectedFormat);
    };

    return (
        <>
            <div className=''>
                <div>
                    <Switch
                        checkedChildren='Dry Matter'
                        unCheckedChildren='As Fed'
                        checked={format === 'dryMatter'}
                        onChange={(checked) => handleFormatChange(checked ? 'dryMatter' : 'asFed')}
                    />
                </div>
                {Recipe({ recipe, format, petInfo})}
            </div>
        </>
    );
};

export default NutrientAnalysis;