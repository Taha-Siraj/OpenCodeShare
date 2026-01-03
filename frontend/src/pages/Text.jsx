import axios from "axios";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const text = () => {
  const [inputText, setInputText] = useState("");
  const [textData, setTextData] = useState([]);

  let baseUrl = "http://localhost:5000/api";

  const addText = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(`${baseUrl}/text`, {
        text: inputText,
      });
      console.log(res.data);
      getText();
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
      return
    }
  };

  const getText = async () => {
    try {
      let res = await axios.get(`${baseUrl}/text`);
      console.log(res.data);
      setTextData(res.data);
      setInputText("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getText();
  }, []);

  return (
    <div className="bg-black h-screen text-white capitalize text-2xl font-bold font-serif">
         <Toaster />
      <h1> text page</h1>
      <form action="" onSubmit={addText}>
        <textarea
          onChange={(e) => setInputText(e.target.value)}
          type="text"
          value={inputText}
          className="py-2 h-[200px] w-full px-5 text-black bg-white rounded-md outline-0 border"
        />
        <button className="bg-white cursor-pointer py-2 px-4 rounded-md text-black ">
          
          Add Text
        </button>
        {inputText ? <p className="text-white">{inputText.length} characters</p> : null}
      </form>

      <div className="bg-white text-black mt-5 p-5 rounded-md h-[200px] overflow-y-scroll">
        here is the text data:
        {textData.map((item, index) => {
          return (
            <div key={index} className="mb-3">
              <p>{item.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default text;
