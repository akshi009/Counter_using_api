import { useEffect, useState } from 'react'

function Test() {

  const[count,setCount]=useState(0)

  const fetchdata=async()=>{
    const res = await fetch('http://localhost:3000/getdata')
    const data = await res.json()
    setCount(data[0]?.count ?? 0);

  }

  const add = async () => {
    const res = await fetch('http://localhost:3000/add', {
      method: 'PUT'
    });
    const data = await res.json();
    setCount(data.count ?? count);
  };
  
  const sub = async () => {
    const res = await fetch('http://localhost:3000/sub', {
      method: 'PUT'
    });
    const data = await res.json();
    setCount(data.count ?? count);
  };
  

  useEffect(()=>{
    fetchdata()
  },[])
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{
        fontSize: '1.875rem',
        marginBottom: '1.5rem'
      }}>React Counter</h1>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
       
        padding: '1.5rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
      }}>
        <button onClick={()=>sub()} style={{
          fontSize: '1.5rem',
          backgroundColor: '#ef4444',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: 'pointer'
        }}>
          -
        </button>

        <div style={{
          fontSize: '1.875rem',
          width: '4rem',
          textAlign: 'center'
        }}>
          {count}
        </div>

        <button style={{
          fontSize: '1.5rem',
          backgroundColor: '#22c55e',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: 'pointer'
        }} onClick={()=>add()}>
          +
        </button>
      </div>
    </div>
  
  )
}

export default Test