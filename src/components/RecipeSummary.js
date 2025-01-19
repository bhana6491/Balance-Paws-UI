'use client';
import {Tabs, Table, Typography, Button} from 'antd';
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import NutrientSummary from './NutrientSummary';
import NutrientAnalysis from './NutrientAnalysis';
import NutrientDashBoard from './NutrientDashBoard';
const RecipeSummary = ( {currentRecipe, handleDelete, petInfo, setCurrentRecipe}) => {

    const handleAmountChange = (e, record) => {
        const { value } = e.target;
        const updatedRecipe = currentRecipe.map(item => {
            if (item.ingredient.name === record.ingredient.name) {
                item.amount = parseFloat(value);
            }
            return item;
        });

        const totalAmount = updatedRecipe.reduce((total, item) => total + parseFloat(item.amount), 0);

        updatedRecipe.forEach(item => {
            item.inclusion = ((parseFloat(item.amount) / totalAmount) * 100).toFixed(2);
        });
        setCurrentRecipe(updatedRecipe);
    };

    const columns = [
        { title: "Ingredient", dataIndex: "ingredient.name", render: (text, record) => record.ingredient.name },
        { 
            title: "Amount (g)", 
            dataIndex: "amount", 
            key: "amount",
            render: (text, record) => (
                <input 
                    type="text" 
                    value={text} 
                    onChange={(e) => {
                        handleAmountChange(e, record);
                    }}
                    className='mt-5 text-center border-black border-2 rounded-lg w-1/6'
                />
            ),
        },
        { 
            title: "Inclusion (%)", 
            dataIndex: "inclusion", 
            key: "inclusion",
            render: (text) => (isNaN(text) || typeof text === 'undefined') ? '-' : text,
        },
        { 
            title: "Action", 
            dataIndex: "action", 
            render: (text, record) => (
              <Button type="link" onClick={() => handleDelete(record)}><DeleteOutlined></DeleteOutlined></Button>
            ),
        },
    ];
    return (
        <div>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Ingredient Composition" key="1">
                    <Table
                        dataSource={currentRecipe}
                        columns={columns}
                        rowKey={(record, index) => index}
                        pagination={false}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Nutrient Composition" key="2">
                    <NutrientSummary recipe={currentRecipe}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Nutrient Analysis" key="3">
                    <NutrientAnalysis recipe={currentRecipe} petInfo={petInfo}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Nutrient DashBoard" key="4">
                    <NutrientDashBoard recipe={currentRecipe} />
                </Tabs.TabPane>

            </Tabs>
        </div>
    );
}

export default RecipeSummary;
