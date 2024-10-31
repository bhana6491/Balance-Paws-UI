'use client';
import {Tabs, Table, Typography, Button} from 'antd';
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import NutrientSummary from './NutrientSummary';
import NutrientAnalysis from './NutrientAnalysis';
const RecipeSummary = ( {currentRecipe, handleDelete}) => {

    const columns = [
        { title: "Ingredient", dataIndex: "ingredient.name", render: (text, record) => record.ingredient.name },
        { title: "Amount (g)", dataIndex: "amount", key: "amount" },
        { title: "Inclusion (%)", dataIndex: "inclusion", key: "inclusion" },
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
                    <NutrientAnalysis recipe={currentRecipe}/>
                </Tabs.TabPane>

                {/* <Tabs.TabPane tab="Nutritional Information" key="2">
                    <Typography>Tab 2</Typography>
                </Tabs.TabPane> */}
            </Tabs>
        </div>
    );
}

export default RecipeSummary;
