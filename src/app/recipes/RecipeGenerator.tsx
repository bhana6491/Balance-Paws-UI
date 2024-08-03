import * as React from "react";
import { Cascader, Typography, Divider } from "antd";
import IngredientsTable from "@/components/IngredientsTable";

const species = [
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

const activityLevel = [
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

const lifestage = [
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
  const [selectedSpecies, setSelectedSpecies] = React.useState<string[]>([]);
  const handleSpeciesChange = (value: string[]) => {
    setSelectedSpecies(value);
  };

  const [formOutput, setFormOutput] = React.useState({});

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    setFormOutput(formJson);
  };

  return (
    <React.Fragment>
      {/* <RecipeCarousel></RecipeCarousel> */}
      <div className="parent bg-beige px-30 pt-10 bg-beige">
        <Typography.Title level={4} className="text-earth-green font-poppins">
          Step 1: Pet Information
        </Typography.Title>
        <Divider className="" style={{ borderWidth: 2, borderColor: "black" }} />

        <div className="flex justify-between">
          <Cascader
            options={species}
            placeholder="Species"
            className="mt-5"
            value={selectedSpecies}
            onChange={handleSpeciesChange}
            style={{ width: "20%", marginRight: "10px" }}
          />
          <Cascader
            options={activityLevel}
            placeholder="Activity Level"
            className="mt-5"
            style={{ width: "20%", marginRight: "10px" }}
          />
          <Cascader
            options={lifestage}
            placeholder="Life Stage"
            className="mt-5"
            style={{ width: "20%" }}
          />
        </div>
        <div className="mt-10">
          <Typography.Title level={4} className="text-earth-green font-poppins">
            Step 2: Pick Ingredients
          </Typography.Title>
          <Divider className="mb-10" style={{ borderWidth: 2, borderColor: "black" }} />
          <div>
            <IngredientsTable></IngredientsTable>
          </div>
        </div>
        <div className="mt-10">
          <Typography.Title level={4} className="text-earth-green font-poppins">
            Step 3: Analyze Recipe 
          </Typography.Title>
          <Divider className="mb-10" style={{ borderWidth: 2, borderColor: "black" }} />
          <div>
            {/* <IngredientsTable></IngredientsTable> */}
          </div>
        </div>

      </div>
    </React.Fragment>
  );
}
