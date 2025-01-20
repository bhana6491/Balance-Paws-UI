import React, { useEffect, useState, useRef } from "react";
import { SearchOutlined, DeleteOutlined, LoadingOutlined} from "@ant-design/icons";
import { Table, Modal, Button, Input, Space, Pagination } from "antd";
import Highlighter from "react-highlight-words";
import { Typography } from "antd";
import { Tabs, InputNumber, message } from "antd";
import {NutrientsTable} from "./utils";
import RecipeSummary from "./RecipeSummary";
const { Title } = Typography;
import { Flex, Spin } from 'antd';
import { revalidatePath } from "next/cache";

const IngredientsTable = (petInfo) => {
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

  const handleRowClick = (record) => {
    setSelectedRow(record);
  };

  const closeModal = () => {
    setSelectedRow(null);
    setAmount(100); // Reset the amount to 100g after closing the modal
  };


  const handleDelete = (record) => {
    setCurrentRecipe((prevRecipe) => {
      const updatedRecipe = prevRecipe.filter(item => item !== record);
      return updateInclusion(updatedRecipe);
    });
  };

  const openRecipeModal = () => {
    setShowRecipeModal(true);
  };

  const updateInclusion = (prevRecipe) => {
    const totalAmount = prevRecipe.reduce((sum, item) => sum + item.amount, 0);
    prevRecipe.forEach(item => {
    item.inclusion = parseFloat((item.amount / totalAmount) * 100).toFixed(2);
    });
    return [...prevRecipe];
  }



  const closeRecipeModal = () => {
    setShowRecipeModal(false);
  };

  // Add to recipe confirmation
  const openMessage = () => {
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: amount + "g of " + selectedRow.name + " added to recipe",
        duration: 1,
      });
    }, 100);
    // Add selectedRow and amount to currentRecipe
    setCurrentRecipe((prevRecipe) => {
      const existingIngredientIndex = prevRecipe.findIndex(item => item.ingredient.name === selectedRow.name);
      if (existingIngredientIndex !== -1) {
      prevRecipe[existingIngredientIndex].amount += amount ;
      } else {
      prevRecipe.push({ ingredient: selectedRow, amount: amount });
      }

      updateInclusion(prevRecipe);
      sessionStorage.setItem("recipe", JSON.stringify(prevRecipe));
      return [...prevRecipe];
    });
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
    const fetchData = () => {
      try {
        const cachedIngredients = sessionStorage.getItem("ingredientsData");
        const cachedRecipe = sessionStorage.getItem("recipe")
        // const cachedPetInfo = sessionStorage.getItem("petInfo")

        if (cachedRecipe) {
          setCurrentRecipe(JSON.parse(cachedRecipe))
        }
        
        if (cachedIngredients) {
          setDataSource(JSON.parse(cachedIngredients));
        } else {
          fetch(
            "https://2kj1u5y1yh.execute-api.us-east-1.amazonaws.com/Testing/ingredients",
          )
            .then(response => response.json())
            .then(data => {
              setDataSource(JSON.parse(data.body));
              sessionStorage.setItem("ingredientsData", data.body);
            })
            .catch(error => {
              console.error("Error fetching data:", error);
            });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      
    };

    fetchData();
  }, []);
  // setDataSource(JSON.parse(data.body));

  while (!dataSource || dataSource.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
      <Spin
        indicator={
        <LoadingOutlined
          style={{
          fontSize: 48,
          color: '#4F6F52', // Change the color here
          }}
          spin
        />
        }
      />
      <h1 className="text-4xl font-poppins text-earth-green my-10 ml-10">Loading...</h1>
      </div>
    );
  }


  return (
    <div className="font-poppins text-earth-green" style={{ display: "" }}>
      <div className="table-container">
        <Table
          dataSource={dataSource}
          columns={ingredientCols}
          rowKey="name"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          scroll={{ y: 385 }}
          style={{ height: "500px", minHeight: "500px" }
        }
        pagination={{
          pageSize:50,
          showSizeChanger:false
        }}

        />
      </div>
      {/* <Pagination size="small" total={50} /> */}
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
            {NutrientsTable(selectedRow, amount)}
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
      <div className="flex justify-between">
        {/* <div className="flex-none">
        <button
          onClick={openRecipeModal}
          className="fill-earth-green rounded-md block text-base text-beige font-poppins"
          style={{
            backgroundColor: "#4F6F52",
            width: "200px",
            height: "50px",
            outline: "1px solid black",
          }}
        >
          Analyze Recipe
        </button>
        </div> */}
        <div className="flex-none"> 
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
      </div>
      

      <Modal
        visible={showRecipeModal}
        onCancel={closeRecipeModal}
        bodyStyle={{ height: 700 }}
        footer={null}
        className="modal"
      >
        <Title level={3}>Current Recipe</Title>
        <RecipeSummary currentRecipe = {currentRecipe} petInfo={petInfo} handleDelete={handleDelete} setCurrentRecipe={setCurrentRecipe}></RecipeSummary>
      </Modal>

    </div>
  );
};

export default IngredientsTable;

