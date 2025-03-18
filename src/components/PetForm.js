"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  Cascader,
  InputNumber,
  Button,
  Form,
  Input,
  Select,
  Typography,
  Avatar,
} from "antd";
const { Title } = Typography;
const { Option } = Select;
import {
  speciesOptions,
  activityLevelOptions,
  lifeStageOptions,
} from "@/app/recipes/constants";

export const PetForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const storedPets = sessionStorage.getItem("pets");
    if (storedPets) {
      setPets(JSON.parse(storedPets));
    }
  }, []);

  const handleAddPet = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    const updatedPets = [...pets, values];
    setPets(updatedPets);
    sessionStorage.setItem("pets", JSON.stringify(updatedPets));
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div className="parent bg-beige px-30 mt-1 bg-beige">
      <div className="">
        <button
          onClick={handleAddPet}
          className="fill-earth-green rounded-md block text-base text-beige font-poppins"
          style={{
            backgroundColor: "#4F6F52",
            width: "150px",
            outline: "1px solid black",
          }}
        >
          Add New Pet +
        </button>
        <Modal
          title="Add Pet"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter the pet's name!" },
              ]}
            >
              <Input
                placeholder="Name"
                className="mt-5 border-black border-2 rounded-lg"
              />
            </Form.Item>
            <Form.Item
              label="Species"
              name="species"
              rules={[{ required: true, message: "Please select a species!" }]}
            >
              <Cascader
                options={speciesOptions}
                placeholder="Species"
                className="mt-5 border-black border-2 rounded-lg"
                // style={{ width: "15%" }}
              />
            </Form.Item>

            <Form.Item
              label="Activity Level"
              name="activityLevel"
              rules={[
                { required: true, message: "Please select activity level!" },
              ]}
            >
              <Cascader
                options={activityLevelOptions}
                placeholder="Activity Level"
                className="mt-5 border-black border-2 rounded-lg"
              />
            </Form.Item>
            <Form.Item
              label="Life Stage"
              name="lifeStage"
              rules={[{ required: true, message: "Please select life stage!" }]}
            >
              <Cascader
                options={lifeStageOptions}
                placeholder="Life Stage"
                className="mt-5 border-black border-2 rounded-lg"
              />
            </Form.Item>
            <Form.Item
              label="Weight (kg)"
              name="weight"
              rules={[
                { required: true, message: "Please enter weight in kg!" },
                { type: "number", min: 0, message: "Weight must be positive!" },
              ]}
            >
              <InputNumber
                suffix="kg"
                min={1}
                max={200}
                placeholder="Weight"
                className="mt-5 border-black border-2 rounded-lg"
              />
            </Form.Item>
            <Form.Item>
              <button
                htmlType="submit"
                className="fill-earth-green rounded-md block text-base text-beige font-poppins"
                style={{
                  backgroundColor: "#4F6F52",
                  width: "200px",
                  outline: "1px solid black",
                }}
              >
                Submit
              </button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default PetForm;
