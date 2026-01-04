import { supabase } from "../config/supabaseClient.js";

export const upload  = async  (req, res) => {
  

  const file = req.file;
  if(!file){
    return res.status(400).send({error: "No file uploaded"});
  }

  try {
    const {data , error} = await supabase.storage.from('files').upload(file.originalname, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });
    if(error) throw error;  
    res.status(200).send({message: "File uploaded successfully", data});
  } catch (error) {
    console.log(error)
    res.status(500).send({error: "Error uploading file"});
  }



}