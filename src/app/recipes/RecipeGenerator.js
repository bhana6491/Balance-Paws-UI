"use client";
import React, { useState } from "react";
import { Cascader, Typography, Divider, ConfigProvider, InputNumber} from "antd";
import {speciesOptions, activityLevelOptions, lifeStageOptions} from "@/app/recipes/constants";
import IngredientsTable from "@/components/IngredientsTable";
import { StyleProvider } from '@ant-design/cssinjs';
import { useEffect } from "react";
import {PetForm} from "@/components/PetForm"
const {Title} = Typography;

function petOptions(pets) {
  return pets.map((pet, index) => ({
    value: pet.name,
    label: `${pet.name} ${pet.species[0] === 'Dog' ? '🐶' : pet.species[0] === 'Cat' ? '🐱' : ''}`,
    key: index,
  }));
};
export default function RecipeGenerator() {
  const [currPet, setCurrentPet] = useState();
  const [pets, setPets] = useState([]);
  const [petInfo, setPetInfo] = useState({
    species: null,
    life_stage: null,
    activity_level: null,
    weight: null,
  });
  useEffect(() => {
    if (!sessionStorage.getItem("pets")) {
    } else {
      setPets(JSON.parse(sessionStorage.getItem("pets") || "[]"));
    }
  }, []);

  
  useEffect(() => {
    if (currPet) {
      setPetInfo({
        species: currPet.species,
        life_stage: currPet.lifeStage,
        activity_level: currPet.activityLevel,
        weight: currPet.weight,
      });
    }
  }, [currPet]);

  return (
    <div className="parent bg-beige px-30  bg-beige">
      <Typography.Title level={4} className="text-earth-green font-poppins">
        Step 1: Pet Information
      </Typography.Title>
      <Divider className="" style={{ borderWidth: 2, borderColor: "black" }} />

      <div className="flex flex-row items-start space-x-5">
        <Cascader
          options={petOptions(pets)}
          placeholder="Pet"
          className="border-black border-2 rounded-lg"
          onChange={(value) => {
            const selectedPet = pets.find((pet) => pet.name === value[0]);
            setCurrentPet(selectedPet);
          }}
        />
        <PetForm />
      </div>

      <div className="mt-10">
        <div>
          <div>
            <Typography.Title level={4} className="text-earth-green font-poppins">
              Step 2: Pick Ingredients
            </Typography.Title>
            <Divider className="mb-10" style={{ borderWidth: 2, borderColor: "black" }} />

            <IngredientsTable petInfo={petInfo}></IngredientsTable>
          </div>
        </div>
      </div>
    </div>
  );
}
