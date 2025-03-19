"use client";
import React, { useState, useEffect } from "react";
import { Cascader, Typography, Divider } from "antd";
import IngredientsTable from "@/components/IngredientsTable";
import { PetForm } from "@/components/PetForm";

const { Title } = Typography;

// Utility function to delete a pet
function deletePet(petName, pets, setPets) {
  const updatedPets = pets.filter((pet) => pet.name !== petName);
  setPets(updatedPets);
  sessionStorage.setItem("pets", JSON.stringify(updatedPets));
}

// Generate options for the pet dropdown
function generatePetOptions(pets, setPets) {
  return [
    ...pets.map((pet, index) => ({
      value: pet.name,
      label: (
        <div className="flex justify-between items-center group">
          <span>
            {`${pet.name} ${
              pet.species[0] === "Dog" ? "🐶" : pet.species[0] === "Cat" ? "🐱" : ""
            }`}
          </span>
          {/* Temp commenting out ability to delete pets */}
          {/* <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent dropdown from closing
              deletePet(pet.name, pets, setPets);
            }}
            className="text-red-500 ml-2 hidden group-hover:block text-xs"
          >
            🗑️
          </button> */}
        </div>
      ),
      key: index,
    })),
    {
      value: "add-pet",
      label: "➕ Add Pet",
      key: "add-pet",
    },
  ];
}
export default function RecipeGenerator() {
  const [currPet, setCurrentPet] = useState(null); // Currently selected pet
  const [pets, setPets] = useState(() => {
    // Initialize pets from session storage
    const storedPets = sessionStorage.getItem("pets");
    return storedPets ? JSON.parse(storedPets) : [];
  });
  const [showPetForm, setShowPetForm] = useState(false); // Toggle for PetForm visibility
  const [petInfo, setPetInfo] = useState({
    species: null,
    life_stage: null,
    activity_level: null,
    weight: null,
  });

  // Update petInfo when the current pet changes
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

  // Handle pet selection from the dropdown
  const handlePetSelection = (value) => {
    if (value[0] === "add-pet") {
      setShowPetForm(true); 
    } else {
      const selectedPet = pets.find((pet) => pet.name === value[0]);
      setCurrentPet(selectedPet); 
      setShowPetForm(false); 
    }
  };

  return (
    <div className="parent bg-beige px-30 bg-beige">
      {/* Step 1: Pet Information */}
      <Title level={4} className="text-earth-green font-poppins">
        Step 1: Pet Information
      </Title>
      <Divider style={{ borderWidth: 2, borderColor: "black" }} />

      <div className="flex flex-row items-start space-x-5">
        {/* Pet Dropdown */}
        <Cascader
          options={generatePetOptions(pets, setPets)}
          placeholder="Select a Pet"
          className="border-black border-2 rounded-lg w-50"
          onChange={handlePetSelection}
        />

        {/* Pet Form for adding a new pet */}
        {showPetForm && (
          <PetForm
            pets={pets}
            setPets={(updatedPets) => setPets([...updatedPets])}
            setShowPetForm={setShowPetForm}
          />
        )}
      </div>

      {/* Step 2: Pick Ingredients */}
      <div className="mt-10">
        <Title level={4} className="text-earth-green font-poppins">
          Step 2: Pick Ingredients
        </Title>
        <Divider className="mb-10" style={{ borderWidth: 2, borderColor: "black" }} />

        {/* Ingredients Table */}
        <IngredientsTable petInfo={petInfo} />
      </div>
    </div>
  );
}
