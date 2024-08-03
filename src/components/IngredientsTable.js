import React, { useEffect, useState, useRef } from "react";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Modal, Button, Input, Space, Pagination } from "antd";
import Highlighter from "react-highlight-words";
import { Typography } from "antd";
import { Tabs, InputNumber, message } from "antd";

const { Title } = Typography;

const ingredientsTabs = (selectedRow, amount) => {
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
        pagination={{ defaultPageSize: 5, hideOnSinglePage: true }}
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

  const generateData = (category, selectedRow, unit) => {
    return Object.entries(selectedRow)
      .filter(
        ([key, value]) =>
          nutrientCategories[category].hasOwnProperty(key) && value !== null
      )
      .map(([key, value]) => {
        // NOTE: The amount is divided by 100 because the values are per 100g
        return {
          nutrient: nutrientCategories[category][key],
          value: parseFloat((amount / 100) * value).toFixed(2),
          unit: unit,
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
                  category === "proximates" ? "g" : "mg"
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


const IngredientsTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [amount, setAmount] = useState(100);
  const searchInput = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [currentRecipe, setCurrentRecipe] = useState([]);
  const key = "updatable";
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  const openRecipeModal = () => {
    setShowRecipeModal(true);
  };

  const closeRecipeModal = () => {
    setShowRecipeModal(false);
  };

  // Add to recipe confirmation
  const openMessage = () => {
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Added to recipe!",
        duration: 1,
      });
    }, 100);
    // Add selectedRow and amount to currentRecipe
    setCurrentRecipe((prevRecipe) => [
      ...prevRecipe,
      { ingredient: selectedRow, amount: amount },
    ]);
    console.log(currentRecipe)
  };

  // Ingredient amount input
  const handleAmountChange = (value) => {
    setAmount(value);
  };

  // Ingredient name search functionality
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    setSearchText("");
    setSearchedColumn("");
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const ingredientCols = [
    {
      title: "Ingredient Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [
        {
          text: "Legumes and Legume Products",
          value: "Legumes and Legume Products",
        },
        {
          text: "Vegetables and Vegetable Products",
          value: "Vegetables and Vegetable Products",
        },
        {
          text: "Sausages and Luncheon Meats",
          value: "Sausages and Luncheon Meats",
        },
        {
          text: "Dairy and Egg Products",
          value: "Dairy and Egg Products",
        },
        {
          text: "Nut and Seed Products",
          value: "Nut and Seed Products",
        },
        {
          text: "Fruits and Fruit Juices",
          value: "Fruits and Fruit Juices",
        },
        {
          text: "Spices and Herbs",
          value: "Spices and Herbs",
        },
        {
          text: "Fats and Oils",
          value: "Fats and Oils",
        },
        {
          text: "Poultry Products",
          value: "Poultry Products",
        },
        {
          text: "Beef Products",
          value: "Beef Products",
        },
        {
          text: "Pork Products",
          value: "Pork Products",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.category.startsWith(value),
      width: "30%",
    },
  ];
  useEffect(() => {
    // Make API request here and update the dataSource state
    fetch(
      "https://2kj1u5y1yh.execute-api.us-east-1.amazonaws.com/Testing/ingredients"
    )
      .then((response) => response.json())
      .then((data) => setDataSource(JSON.parse(data.body)));
  }, []);

  while (!dataSource || dataSource.length === 0) {
    return <h1>Loading...</h1>;
  }

  const handleRowClick = (record) => {
    setSelectedRow(record);
  };

  const closeModal = () => {
    setSelectedRow(null);
    setAmount(100); // Reset the amount to 100g after closing the modal
  };


  const handleDelete = (record) => {
    setCurrentRecipe((prevRecipe) => prevRecipe.filter(item => item !== record));
  };

  return (
    <div className="font-poppins text-earth-green" style={{ display: "" }}>
      <Table
        dataSource={dataSource}
        columns={ingredientCols}
        rowKey="name"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        scroll={{ y: 385 }}
        style={{ height: "500px", minHeight: "500px" }}
      />

      {selectedRow && (
        <div className="w-80">
          <Modal
            open={true}
            width={800}
            bodyStyle={{ height: 800 }}
            onCancel={closeModal}
            footer={null}
          >
            <Title level={3}>{selectedRow.name} </Title>
            <Title level={5}> Category: {selectedRow.category} </Title>
            <label className="mr-5 font-bold">Amount:</label>
            <InputNumber
              id="amount"
              min={1}
              max={1000}
              step={0.1}
              value={amount}
              onChange={handleAmountChange}
            />
            {ingredientsTabs(selectedRow, amount)}
            <div
              style={{ position: "absolute", bottom: "20px", right: "20px" }}
            >
              {contextHolder}
              <button
                onClick={openMessage}
                className="fill-earth-green rounded-md block text-base text-beige font-poppins align-right"
                style={{
                  backgroundColor: "#4F6F52",
                  width: "200px",
                  height: "50px",
                  outline: "1px solid black",
                }}
              >
                Add to Recipe
              </button>
            </div>
          </Modal>
        </div>
      )}
      <div className=" display-inline">
        <button
          onClick={openRecipeModal}
          className="fill-earth-green rounded-md block text-base text-beige font-poppins"
          style={{
            backgroundColor: "#4F6F52",
            width: "200px",
            outline: "1px solid black",
          }}
        >
          View Recipe
          <img
            className="w-12 inline-block"
            src="/food_bowl.png"
            alt="Food Bowl"
          />
        </button>
      </div>

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
    </div>
  );
};

export default IngredientsTable;

