"use client";
import React, { useState } from "react";
import { Cascader, Typography, Divider, ConfigProvider, InputNumber} from "antd";
import {speciesOptions, activityLevelOptions, lifeStageOptions} from "@/app/recipes/constants";
import IngredientsTable from "@/components/IngredientsTable";
import { StyleProvider } from '@ant-design/cssinjs';
import { useEffect } from "react";
const {Title} = Typography;

export default function RecipeGenerator() {
  const [species, setSpecies] = useState([]);
  const [activityLevel, setActivityLevel] = useState();
  const [lifestage, setLifeStage] = useState();
  const [weight, setWeight] = useState(1);

  // Refactor this
  useEffect(() => {
    if (!sessionStorage.getItem('species')) {
      sessionStorage.setItem('species', JSON.stringify(species));
    } else if (sessionStorage.getItem('species') === 'undefined') {
      sessionStorage.removeItem('species');
    } else {
      setSpecies(JSON.parse(sessionStorage.getItem('species')));
    }

    if (!sessionStorage.getItem('activityLevel')) {
      sessionStorage.setItem('activityLevel', activityLevel);
    } else if (sessionStorage.getItem('activityLevel') === 'undefined') {
      sessionStorage.removeItem('activityLevel');
    } else {
      setActivityLevel(sessionStorage.getItem('activityLevel'));
    }

    if (!sessionStorage.getItem('lifestage')) {
      sessionStorage.setItem('lifestage', lifestage);
    } else if (sessionStorage.getItem('lifestage') === 'undefined') {
      sessionStorage.removeItem('lifestage');
    } else {
      setLifeStage(sessionStorage.getItem('lifestage'));
    }

    if (!sessionStorage.getItem('idealWeight')) {
      sessionStorage.setItem('idealWeight', weight);
    } else if (sessionStorage.getItem('idealWeight') === 'undefined') {
      sessionStorage.removeItem('idealWeight');
    } else {
      setWeight(sessionStorage.getItem('idealWeight'));
    }
  }, []);
  return (
    <div className="parent bg-beige px-30 pt-10 bg-beige">
      <Typography.Title level={4} className="text-earth-green font-poppins">
        Step 1: Pet Information
      </Typography.Title>
      <Divider className="" style={{ borderWidth: 2, borderColor: "black" }} />

      <div className="flex justify-between">
        <Cascader
          options={speciesOptions}
          placeholder="Species"
          className="mt-5 border-black border-2 rounded-lg"
          onChange={(e) => {
            setSpecies(e);
            sessionStorage.setItem('species', JSON.stringify(e));
          }}
          value={species}
          style={{ width: "15%" }}
        />
        <Cascader
          options={activityLevelOptions}
          placeholder="Activity Level"
          className="mt-5 border-black border-2 rounded-lg"
          onChange={(e) => {
            setActivityLevel(e);
            sessionStorage.setItem('activityLevel', e);
          }}
          style={{ width: "15%" }}
          value={activityLevel}
        />
        <Cascader
          options={lifeStageOptions}
          placeholder="Life Stage"
          className="mt-5 border-black border-2 rounded-lg"
          onChange={(e) => {
            setLifeStage(e);
            sessionStorage.setItem('lifestage', e);
          }}
          style={{ width: "15%" }}
          value={lifestage}
        />
        <InputNumber
          suffix="kg"
          min={1}
          max={200}
          placeholder="Ideal Weight"
          className="mt-5 border-black border-2 rounded-lg"
          style={{ width: "10%" }}
          onChange={(e) => {
            setWeight(e);
            sessionStorage.setItem('idealWeight',e);
          }}
          value={weight}
        />
      </div>
      <div className="mt-10">
        <div>
          <div>
            <Typography.Title level={4} className="text-earth-green font-poppins">
              Step 2: Pick Ingredients
            </Typography.Title>
            <Divider className="mb-10" style={{ borderWidth: 2, borderColor: "black" }} />

            <IngredientsTable petInfo={{ 'species': species, 'life_stage': lifestage, 'activity_level': activityLevel, 'weight': weight }}></IngredientsTable>
          </div>
        </div>
      </div>
    </div>
  );
}
