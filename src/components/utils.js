import {Tabs, Table, Typography} from 'antd';
import {Modal,Button} from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
const { Title } = Typography;

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
  calcium: 'mg',
  phosphorus: 'mg',
  sodium: 'mg',
  chlorine: 'mg',
  potassium: 'mg',
  magnesium: 'mg',
  sulfur: 'mg',
  copper: 'mg',
  iron: 'mg',
  manganese: 'mg',
  selenium: 'ug',
  zinc: 'mg',
  iodine: 'ug',
  biotin: 'ug',
  folate: 'ug',
  niacin: 'mg',
  pantothenic_acid: 'mg',
  pyridoxine: 'mg',
  riboflavin: 'mg',
  thiamin: 'mg',
  vitamin_b12: 'ug',
  vitamin_d: 'IU',
  vitamin_e: 'IU',
  vitamin_k: 'ug',
  vitamin_a: 'IU',
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

// These are nutrients that will need to be converted to grams from mg in order to comply with the nutrient recommendations framework. 
/**
 * Represents an array of converted nutrients.
 * @type {Array}
 */
const nutrients_mg_to_g = ['calcium', 'phosphorus', 'potassium', 'sodium', 'chloride'];
const nutrients_iu_to_mg = ['iodine', 'selenium', 'folate', 'vitamin_b12'];
/**
 * Renders a table of nutrients based on the selected row and amount.
 *
 * @param {object} selectedRow - The selected row object.
 * @param {number} amount - The amount value.
 * @returns {JSX.Element} - The rendered table component.
 */
export const NutrientsTable = (selectedRow, amount) => {
    const nutrientCategories = {
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
  
    const generateTable = (data, columns) => {
      return data.length > 0 ? (
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ defaultPageSize: 8, hideOnSinglePage: true }}
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
  
    const generateData = (category, selectedRow) => {
      return Object.entries(selectedRow)
        .filter(
          ([key, value]) =>
            nutrientCategories[category].hasOwnProperty(key) && value !== null
        )
        .map(([key, value]) => {
          // NOTE: The amount is divided by 100 because the values are per 100g
            return {
              nutrient: nutrientCategories[category][key],
              value: parseFloat((amount / 100) * (nutrients_mg_to_g.includes(key) || nutrients_iu_to_mg.includes(key) ? value / 1000 : value)).toFixed(2),
              unit: nutrients_mg_to_g.includes(key) ? 'g' : (nutrients_iu_to_mg.includes(key) ? 'mg' : unit_mappings[key]),
            };
        });
    };
  
    return (
      <div>
        <Tabs defaultActiveKey="1"
          items={[
            ...Object.entries(nutrientCategories).map(
              ([category, nutrients], index) => ({
                label: category.toUpperCase(),
                key: index,
                children: generateTable(
                  generateData(
                    category,
                    selectedRow,
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

export const CurrentRecipeModal = ({selectedRow, amount, handleAmountChange, closeModal, NutrientsTable}) => {
    
    return (
        <Modal
        visible={showRecipeModal}
        onCancel={closeRecipeModal}
        footer={null}
      >
        <Title level={3}>Current Recipe</Title>
        
        <Table
          dataSource={currentRecipe}
          columns={[
            { title: "Ingredient", dataIndex: "ingredient.name", render: (text, record) => record.ingredient.name },
            { title: "Amount", dataIndex: "amount", key: "amount" },
            { 
              title: "Action", 
              dataIndex: "action", 
              render: (text, record) => (
                <Button type="link" onClick={() => handleDelete(record)}><DeleteOutlined></DeleteOutlined></Button>
              ),
            },
          ]}
          rowKey={(record, index) => index}
          pagination={false}
        />
      </Modal>

    )
};