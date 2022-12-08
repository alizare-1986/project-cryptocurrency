
import React,{  useEffect, useState} from 'react'
import {getCoin} from "../services/api"

import Loader from './Loader';
import Coin from './Coin';


const Landing = () => {
   const [coins,setCoins]= useState([])
    const[search,setSearch] = useState("")
   useEffect(()=> {
    const fetchAPI=async()=>{
      const data =await getCoin()
      setCoins(data) 
    }
    fetchAPI()
   },[])

   
         const searchHandler = event => {
            setSearch(event.target.value)
         }
         const searchedCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLocaleLowerCase()))
    return (
        <>
        
          <input type="text" placeholder="Search" value={search} onChange={searchHandler} />
          {coins.length ?
          <div>
            {
                searchedCoins.map(coin => <Coin 
                    key={coin.id}
                    name={coin.name}
                    image={coin.image}
                    symbol={coin.symbol}
                    price={coin.current_price}
                    marketCap={coin.market_cap}
                    priceChange={coin.price_change_percentage_24h}
                   /> )
            }
          </div> :
          <Loader/>

            }
        </>
       
    );
};

export default Landing;