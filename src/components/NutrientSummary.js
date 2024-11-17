import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table, Tabs, Typography} from 'antd';
const { Title } = Typography;
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

// This is the unit mapping that aligns with the nutrient analysis table. 
// Note: The unit mapping only differs for the nutrients that need to be converted to g from mg or iu to mg. Reference utils.js for this. 
export const unit_mappings = {
  water: 'g',
  protein: 'g',
  fat: 'g',
  fiber: 'g',
  ash: 'g',
  starch: 'g',
  sugars: 'g',
  proline: 'g',
  arginine: 'g',
  histidine: 'g',
  isoleucine: 'g',
  leucine: 'g',
  lysine: 'g',
  methionine: 'g',
  cystine: 'g',
  phenylalanine: 'g',
  tyrosine: 'g',
  threonine: 'g',
  tryptophan: 'g',
  valine: 'g',
  glutamic_acid: 'g',
  aspartic_acid: 'g',
  glycine: 'g',
  serine: 'g',
  alanine: 'g',
  calcium: 'g',
  phosphorus: 'g',
  sodium: 'g',
  chloride: 'g',
  potassium: 'g',
  magnesium: 'mg',
  sulfur: 'mg',
  copper: 'mg',
  iron: 'mg',
  manganese: 'mg',
  selenium: 'mg',
  zinc: 'mg',
  iodine: 'mg',
  biotin: 'ug',
  folate: 'mg',
  niacin: 'mg',
  pantothenic_acid: 'mg',
  pyridoxine: 'mg',
  riboflavin: 'mg',
  thiamin: 'mg',
  vitamin_b12: 'mg',
  vitamin_d: 'iu',
  vitamin_e: 'iu',
  vitamin_k: 'ug',
  vitamin_a: 'iu',
  vitamin_c: 'mg',
  beta_carotene: 'ug',
  choline: 'mg',
  linoleic_acid: 'g',
  linolenic_acid: 'g',
  arachidonic_acid: 'g',
  eicosapentaenoic_acid: 'g',
  docosahexaenoic_acid: 'g',
  taurine: 'g',
  metabolic_energy: 'kcal/g',
  dry_matter: 'g',
  nitrogen_free_extract: 'g',
  methionine_cystine: 'g',
  phenylalanine_tyrosine: 'g',
  sum_n_3: 'g',
  sum_n_6: 'g'
};

/**
 * @file NutrientSummary.js
 * @description This file contains the unit mappings for various nutrients directly from foundational foods and the nutrient categories as specified in the db. DO NOT DELETE. 
 * @module NutrientSummary
 */

// const unit_mappings = {
//     water: 'g',
//     protein: 'g',
//     fat: 'g',
//     fiber: 'g',
//     ash: 'g',
//     starch: 'g',
//     sugars: 'g',
//     proline: 'g',
//     arginine: 'g',
//     histidine: 'g',
//     isoleucine: 'g',
//     leucine: 'g',
//     lysine: 'g',
//     methionine: 'g',
//     cystine: 'g',
//     phenylalanine: 'g',
//     tyrosine: 'g',
//     threonine: 'g',
//     tryptophan: 'g',
//     valine: 'g',
//     glutamic_acid: 'g',
//     aspartic_acid: 'g',
//     glycine: 'g',
//     serine: 'g',
//     alanine: 'g',
//     calcium: 'mg',
//     phosphorus: 'mg',
//     sodium: 'mg',
//     chlorine: 'mg',
//     potassium: 'mg',
//     magnesium: 'mg',
//     sulfur: 'mg',
//     copper: 'mg',
//     iron: 'mg',
//     manganese: 'mg',
//     selenium: 'ug',
//     zinc: 'mg',
//     iodine: 'ug',
//     biotin: 'ug',
//     folate: 'ug',
//     niacin: 'mg',
//     pantothenic_acid: 'mg',
//     pyridoxine: 'mg',
//     riboflavin: 'mg',
//     thiamin: 'mg',
//     vitamin_b12: 'ug',
//     vitamin_d: 'iu',
//     vitamin_e: 'iu',
//     vitamin_k: 'ug',
//     vitamin_a: 'iu',
//     vitamin_c: 'mg',
//     beta_carotene: 'ug',
//     choline: 'mg',
//     linoleic_acid: 'g',
//     linolenic_acid: 'g',
//     arachidonic_acid: 'g',
//     eicosapentaenoic_acid: 'g',
//     docosahexaenoic_acid: 'g',
//     taurine: 'g',
//     metabolic_energy: 'kcal/g',
//     dry_matter: 'g',
//     nitrogen_free_extract: 'g',
//     methionine_cystine: 'g',
//     phenylalanine_tyrosine: 'g',
//     sum_n_3: 'g',
//     sum_n_6: 'g'
//   };
  
export const compositionCategories = {
    proximates: {
        metabolic_energy: "Metabolic Energy",
        water: "Water",
        dry_matter: "Dry Matter",
        fiber: "Fiber",
        ash: "Ash",
        nitrogen_free_extract: "Nitrogen Free Extract",
        protein: "Protein",
        fat: "Fat",
    },
    carbohydrates: {
        starch: "Starch",
        sugars: "Sugars",
    },
    aminoAcids: {
        proline: "Proline",
        arginine: "Arginine",
        histidine: "Histidine",
        isoleucine: "Isoleucine",
        leucine: "Leucine",
        lysine: "Lysine",
        methionine: "Methionine",
        cystine: "Cystine",
        phenylalanine: "Phenylalanine",
        tyrosine: "Tyrosine",
        threonine: "Threonine",
        tryptophan: "Tryptophan",
        valine: "Valine",
        alanine: "Alanine",
        methionine_cystine: "Methionine Cystine",
        phenylalanine_tyrosine: "Phenylalanine Tyrosine",
        glutamic_acid: "Glutamic Acid",
        aspartic_acid: "Aspartic Acid",
        serine: "Serine",
        glycine: "Glycine",
    },
    minerals: {
        calcium: "Calcium",
        phosphorus: "Phosphorus",
        sodium: "Sodium",
        chlorine: "Chlorine",
        potassium: "Potassium",
        magnesium: "Magnesium",
        sulfur: "Sulfur",
        copper: "Copper",
        iron: "Iron",
        manganese: "Manganese",
        selenium: "Selenium",
        zinc: "Zinc",
        iodine: "Iodine",
    },
    vitamins: {
        vitamin_a: "Vitamin A",
        vitamin_d: "Vitamin D",
        vitamin_e: "Vitamin E",
        vitamin_k: "Vitamin K",
        biotin: "Biotin",
        folate: "Folate",
        niacin: "Niacin",
        pantothenic_acid: "Pantothenic Acid",
        pyridoxine: "Pyridoxine",
        riboflavin: "Riboflavin",
        thiamin: "Thiamin",
        vitamin_b12: "Vitamin B12",
        vitamin_c: "Vitamin C",
        beta_carotene: "Beta Carotene",
        choline: "Choline",
    },
    fats: {
        linoleic_acid: "Linoleic Acid",
        linolenic_acid: "Linolenic Acid",
        arachidonic_acid: "Arachidonic Acid",
        eicosapentaenoic_acid: "Eicosapentaenoic Acid",
        docosahexaenoic_acid: "Docosahexaenoic Acid",
        taurine: "Taurine",
        sum_n_3: "Sum N-3",
        sum_n_6: "Sum N-6",
    },
};
// TODO - DO THIS IN THE DATABASE 
export const nutrients_mg_to_g = ['calcium', 'phosphorus', 'potassium', 'sodium', 'chloride'];
export const nutrients_iu_to_mg = ['iodine', 'selenium', 'folate', 'vitamin_b12'];

export const sumNutrients = (recipe) => {
    const sumNutrients = {};

    for (const nutrientCategory in compositionCategories) {
        for (const nutrient in compositionCategories[nutrientCategory]) {
            for (const ingredient of recipe) {
                if (ingredient.ingredient[nutrient]) {
                    if (!sumNutrients[nutrient]) {
                        sumNutrients[nutrient] = 0;
                    }
                    sumNutrients[nutrient] += ingredient.ingredient[nutrient];
                }
            }
        }
    }
    return sumNutrients;
};

// Outside of the Recipe Because it will be imported in NutrientAnalysis.js in order to generate a holistic nutrient analysis excel sheet. 
export const generateNutrientCompositionData = (category, recipe) => {
  return Object.entries(sumNutrients(recipe))
      .filter(
          ([key, value]) =>
              compositionCategories[category].hasOwnProperty(key) && value !== null
      )
      .map(([key, value]) => {
          // NOTE: The amount is divided by 100 because the values are per 100g
          const nutrientValue = recipe.reduce((sum, ingredient) => {
            // TODO: PUT THIS LOGIC IN THE SCRIPT BEFORE INSERTINGING INTO DB 
            const ingredientValue = (nutrients_mg_to_g.includes(ingredient.ingredient[key]) || nutrients_iu_to_mg.includes(ingredient.ingredient[key]) ? ingredient.ingredient[key] / 100 : ingredient.ingredient[key]).toFixed(2)
              const ingredientAmount = ingredient.amount;
              if (ingredientValue && ingredientAmount) {
                  return sum + ((ingredientAmount/100)*ingredientValue);
              }
              return sum;
          }, 0);
          return {
              key: key,
              nutrient: compositionCategories[category][key],
              value: nutrientValue.toFixed(2),
              //TODO: PUT THIS LOGIC IN THE SCRIPT BEFORE INSERTINGING INTO DB 
              unit: nutrients_mg_to_g.includes(key) ? 'g' : (nutrients_iu_to_mg.includes(key) ? 'mg' : unit_mappings[key]),
            };
      });
};



const Recipe = ({ recipe }) => {
        const generateTable = (data, columns) => {
            return data.length > 0 ? (
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={{ defaultPageSize: 8, hideOnSinglePage: true }}
                    scroll={{ y: 400 }}
                    // overflowY="scroll"
                    // style={{overflowY: "scroll" }}
                    expandable={{
                        expandedRowRender: (record) => {
                            const ingredientColumns = [
                                { title: "Ingredient", dataIndex: "ingredient", key: "ingredient" },
                                { title: "Value", dataIndex: "value", key: "value" },
                                { title: "Unit", dataIndex: "unit", key: "unit" },
                            ];
                            console.log(record)
                            const ingredientData = recipe.map((ingredient) => ({
                                key: ingredient.ingredient.name,
                                ingredient: ingredient.ingredient.name,
                                value: parseFloat(ingredient.amount/100 * (nutrients_mg_to_g.includes(record.key) || nutrients_iu_to_mg.includes(record.key) ? ingredient.ingredient[record.key] / 100 : ingredient.ingredient[record.key])).toFixed(2),
                                unit: unit_mappings[record.key],
                            }));
                            return (
                                <Table
                                    columns={ingredientColumns}
                                    dataSource={ingredientData}
                                    pagination={{ defaultPageSize: 8, hideOnSinglePage: true }}
                                    // scroll={{ y: 400 }}
                                    // overflowY="scroll"
                
                                />
                            );
                        },
                    }}
                />
            ) : (
                <Title level={5}>Data not reported</Title>
            );
          };
        
          const generateColumns = () => {
            return [
              { title: "Nutrient", dataIndex: "nutrient", key: "nutrient" },
              { title: "Value", dataIndex: "value", key: "value" },
              { title: "Unit", dataIndex: "unit", key: "unit" },

            ];
          };
        
          return (
            <div>
              <Tabs defaultActiveKey="1"
                items={[
                  ...Object.entries(compositionCategories).map(
                    ([category], index) => ({
                      label: category.toUpperCase(),
                      key: index,
                      children: generateTable(
                        generateNutrientCompositionData(
                          category,
                          recipe
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
    
const NutrientSummary = (recipe) => {
  return (
    <>
    <div className=''> 
    {Recipe(recipe)}

    </div>
      {/* <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ['0'],
        }}
        dataSource={data}
        size="middle"
      /> */}
    </>
  );
};
export default NutrientSummary;