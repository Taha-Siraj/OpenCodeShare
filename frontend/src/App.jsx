import { useEffect, useState } from 'react'
import axios from 'axios';
import Header from './components/Header';

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
    <Header />
    </>
  )
}

export default App
