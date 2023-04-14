import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import { useStateContext } from "../context";
function CreateCampaign() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFiedChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("provide valid img");
        setForm({ ...form, image: "" });
      }
    });
  };
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            label="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFiedChange("name", e)}
          />
          <FormField
            label="Campaign Title *"
            placeholder="Title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFiedChange("title", e)}
          />
        </div>
        <FormField
          label="Story *"
          placeholder="Story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFiedChange("description", e)}
        />
        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 95% of the raised amount
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            label="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFiedChange("target", e)}
          />
          <FormField
            label="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFiedChange("deadline", e)}
          />
        </div>
        <FormField
          label="Campaign Image *"
          placeholder="Place image url"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFiedChange("image", e)}
        />
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new Campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateCampaign;
