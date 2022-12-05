import React, { useEffect, useState } from 'react';
import axios from "axios"
import './App.css';

function App() {

  const [term, setTerm] = useState("")
  const [debounceSearch,setDebounceSearch] = useState(term)
  const [result, setResult] = useState([])

useEffect(() =>{
  const timeOut = setTimeout(() => {
    setDebounceSearch(term)
  },200);
  return () => clearTimeout(timeOut) 

},[term])


useEffect(() => {
  const search = async () => {
        const respons = await axios.get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            list: "search",
            origin: "*",
            format: "json",
            srsearch: debounceSearch,
          },
        })
        setResult(respons.data.query.search)
      }
      search()
},[debounceSearch])


  // useEffect(() => {

  //   const search = async () => {
  //     const respons = await axios.get("https://en.wikipedia.org/w/api.php", {
  //       params: {
  //         action: "query",
  //         list: "search",
  //         origin: "*",
  //         format: "json",
  //         srsearch: term,
  //       },
  //     })
  //     setResult(respons.data.query.search)
  //   }

  //   if (!result.length){
  //     if (term) {
  //       search()
  //     }
  //   }else{
  //     const debounceSearch = setTimeout(() => {
  //       if (term) {
  //         search()
  //       }
  //     }, 1000);
  
  //     return () =>{
  //       clearTimeout(debounceSearch)
  //      }
  //   }
   

  // }, [term,result.length])

  const fetchResult = result.map((el) => {
    return(
      <tr key={el.pageid}>
      {/* <td>1</td> */}
      <td>{el.title}</td>
      <td> <div contentEditable='true' dangerouslySetInnerHTML={{ __html: el.snippet}}/> </td>
     
    </tr>
    )
  })



  return (
    <div className="App">
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='my-3'>
              <label htmlFor='exampleFormControlInput1' className='form-label'>
                Search Input From Wikipedia
              </label>
              <input
                type='text'
                className='form-control'
                id='exampleFormControlInput1'
                value={term}
                onChange={(event) => setTerm(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <table className='table'>
              <thead>
                <tr>
                  {/* <th scope='col'>#</th> */}
                  <th scope='col'>Title</th>
                  <th scope='col'>Desc</th>
                </tr>
              </thead>
              <tbody>
                {fetchResult}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
