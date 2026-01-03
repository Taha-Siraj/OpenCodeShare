


export const upload  = async  (req, res) => {

  const file = req.file;
  if(!file){
    return res.status(400).send({error: "No file uploaded"});
  }

}