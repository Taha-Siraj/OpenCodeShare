import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {
  const [text, setText] = useState([]);
  const [inputText , setInputText] = useState('')
  let baseUrl = 'http://localhost:5000'



  const fetchText = async () => {
     try {
      let res = await axios.get('http://localhost:5000/gettext');

      console.log(res.data.data)
      setInputText('')
     let rev = res.data.data.reverse()
      setText(rev)  
     
    } catch (error) {
      console.log(error.response.data.error)
      return
    }
   }
   
  


  const AddText = async () => {

    try {
      let res = await axios.post(`${baseUrl}/text`,{
        text: inputText
      })
      console.log(res.data)
      fetchText()
    } catch (error) {
      console.log(error.response.data.erro)
    }
  }


  return (
    <>
    <div>
     <input type="text" onChange={(e) => setInputText(e.target.value)} value={inputText} placeholder='Add Some thing' />
    <button onClick={AddText}  >Add Text</button>
    </div>
    <div>
      <p>{text.map((item , index) => (<p key={index[0]}>{item}</p>     
      ))}</p>
    </div>
    </>
  )
}

export default App
