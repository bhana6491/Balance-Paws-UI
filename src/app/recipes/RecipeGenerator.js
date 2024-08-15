import React, { useState } from "react";
import { Cascader, Typography, Divider, ConfigProvider, InputNumber} from "antd";
import IngredientsTable from "@/components/IngredientsTable";
import { StyleProvider } from '@ant-design/cssinjs';
import { useEffect } from "react";
const {Title} = Typography;
const speciesOptions = [
  {
    value: "Dog",
    label: "Dog",
    children: [
      {
        value: "german_shepherd",
        label: "German Shepherd",
      },
    ],
  },
  {
    value: "Cat",
    label: "Cat",
    children: [
      {
        value: "tabby",
        label: "Tabby",
      },
    ],
  },
];

const activityLevelOptions = [
  {
    value: "low",
    label: "Low",
  },
  {
    value: "moderate",
    label: "Moderate",
  },
  {
    value: "high",
    label: "High",
  },
  {
    value: "performance",
    label: "Performance",
  },
];

const lifeStageOptions = [
  {
    value: "reproduction",
    label: "Reproduction",
  },
  {
    value: "growth",
    label: "Growth",
  },
  {
    value: "adult",
    label: "Adult",
  },
  {
    value: "senior",
    label: "Senior",
  },
];

export default function RecipeGenerator() {
  const [species, setSpecies] = useState([]);
  const [activityLevel, setActivityLevel] = useState([]);
  const [lifestage, setLifeStage] = useState([]);
  const [weight, setWeight] = useState(0);
  const [formOutput, setFormOutput] = useState({});
  const [inputsFilled, setInputsFilled] = useState(false); // Add state for inputs filled

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    setFormOutput(formJson);
  };

  // Check if all inputs are filled
  useEffect(() => {
    if (species.length > 0 && activityLevel.length > 0 && lifestage.length > 0 && weight > 0) {
      setInputsFilled(true);
    } else {
      setInputsFilled(false);
    }
  }, [species, activityLevel, lifestage, weight]);

  return (
    <StyleProvider tailwind-base>
      <React.Fragment>
        <ConfigProvider
          theme={{
            components: {
              Cascader: {
                dropdownHeight: 150,
              },
            },
          }}
        >
          <div className="parent bg-beige px-30 pt-10 bg-beige">
            <Typography.Title level={4} className="text-earth-green font-poppins">
              Step 1: Pet Information
            </Typography.Title>
            <Divider className="" style={{ borderWidth: 2, borderColor: "black" }} />

            <div className="flex justify-between">
              <Cascader
                options={speciesOptions}
                placeholder="Species"
                className="mt-5"
                onChange={(e) => setSpecies(e)}
                style={{ width: "15%"}}
              />
              <Cascader
                options={activityLevelOptions}
                placeholder="Activity Level"
                className="mt-5"
                onChange={(e) => setActivityLevel(e)}
                style={{ width: "15%" }}
              />
              <Cascader
                options={lifeStageOptions}
                placeholder="Life Stage"
                className="mt-5"
                onChange={(e) => setLifeStage(e)}
                style={{ width: "15%" }}
              />
              <InputNumber
                min={1}
                max={10}
                placeholder="Ideal Weight (kg)"
                className="mt-5"
                style={{ width: "10%" }}
                onChange={(e) => setWeight(e)}
              />
            </div>
            <div className="mt-10">
              <div>
                {inputsFilled ? ( // Render IngredientsTable only if inputs are filled
                <div> 
                <Typography.Title level={4} className="text-earth-green font-poppins">
                Step 2: Pick Ingredients
              </Typography.Title>
              <Divider className="mb-10" style={{ borderWidth: 2, borderColor: "black" }} />

                  <IngredientsTable></IngredientsTable>
                  </div>
                ) : (
                  <div className="">
                    </div>
                )}
              </div>
            </div>
          </div>
        </ConfigProvider>
      </React.Fragment>
    </StyleProvider>
  );
}