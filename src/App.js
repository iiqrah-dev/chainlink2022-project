import React, { useEffect, useState } from "react";
import "./App.css";
import { ConnectButton } from "web3uikit";
//import logo from "./images/catvsdog-logo.png";
import Pet from "./components/Pet";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";


const App = () => {

  const [cat, setcat] = useState(80);
  const [dog, setdog] = useState(30);
  //const [modalPrice, setModalPrice] = useState();
  const Web3Api = useMoralisWeb3Api();
  const {Moralis, isInitialized} = useMoralis();
  
  async function getRatio(pet, setPerc){

    const Votes = Moralis.Object.extend("Votes");
    const query = new Moralis.Query(Votes);
    query.equalTo("pet", pet);
    query.descending("createdAt");
    const results = await query.first();
    let up = Number(results.attributes.up);
    let down = Number(results.attributes.down);
    let ratio = Math.round(up/(up+down)*100);
    setPerc(ratio);
  }

  useEffect(() => {
    if(isInitialized){
    getRatio("Cat", setcat);
    getRatio("Dog", setdog);

    async function createLiveQuery(){
      let query = new Moralis.Query('Votes');
      let subscription = await query.subscribe();
      subscription.on('update', (object) => {
        
        if(object.attributes.pet === "Cat"){
          getRatio("Cat", setcat);
        }else if(object.attributes.ticker === "Dog"){
          getRatio("Dog", setdog);
        }

      });
    }


    createLiveQuery();
    }

  }, [isInitialized]);

  return (
    <>

      <div className="header">
        
        <ConnectButton />
      </div>

      
      <div className="pollheading">
      
        The Ultimate: Cat vs Dog Poll      
        
        </div>
        

      <div className="instructions">
        Which pet do you prefer? Vote now.
      </div>


      <div className="list">
        <Pet 
          perc={cat} 
          setPerc={setcat} 
          token={"Cat"}
          petemoji={"😼"}
       
        />
        <Pet 
          perc={dog} 
          setPerc={setdog} 
          token={"Dog"}
          petemoji={"🐶"}
          
        />
      </div>

          
     
    </>
  );
};

export default App;
