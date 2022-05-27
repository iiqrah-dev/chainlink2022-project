import React, { useEffect, useState } from "react";
import "./Pet.css";
import { Button } from "web3uikit";
import { useWeb3ExecuteFunction, useMoralis } from "react-moralis";


function Pet({ perc, setPerc, token, petemoji }) {

  const [color, setColor] = useState();
  const contractProcessor = useWeb3ExecuteFunction();
  const { isAuthenticated} = useMoralis();

  useEffect(() => {
    if (perc < 50) {
      setColor("#F72D44");
    } else {
      setColor("#D0E562");
    }
  }, [perc]);


  async function vote(upDown){

      let options = {
        contractAddress: "0xa2C467ec049f1F3C84ddd9744E70965aDbfAfBe0",
        functionName: "vote",
        abi: [
          {"inputs":[{"internalType":"string","name":"_pet","type":"string"},{"internalType":"bool","name":"_vote","type":"bool"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"}
        ],
        params: {
          _pet: token,
          _vote: upDown,
        },
      }



      await contractProcessor.fetch({
        params: options,
        onSuccess: () => {
          console.log("vote succesful");
          alert("Vote Succesful!")
        },
        onError: (error) => {
          console.log("vote unsuccesful");
          alert("Vote Unsuccesful :/ You have already voted once.")
        },
      });

  }


  return (
    <>
      <div>

      <div className="petemoji">{petemoji}</div>
        <div className="token">{token}</div>
        <div className="circle" style={{ boxShadow: `0 0 20px ${color}` }}>
          <div
            className="wave"
            style={{
              marginTop: `${100 - perc}%`,
              boxShadow: `0 0 20px ${color}`,
              backgroundColor: color,
            }}
          ></div>
          <div className="percentage">{perc}%</div>
        </div>


        <div className="votes">
          <Button 
            onClick={() => {
              if(isAuthenticated){
                vote(true)
              }else{
                alert("Authenicate to Vote")
              }}}
            text="Up" 
            theme="primary" 
            type="button" 
          />

          <Button
            color="red"
            onClick={() => {

              try{ if(isAuthenticated){
                vote(false)
              }
            
              else{
                alert("Authenicate to Vote")
              }
            } catch(e) { alert("Authenicate to Vote") }

              }}
            text="Down"
            theme="colored"
            type="button"
          />
        </div>



        </div>
    </>
  );
}

export default Pet;
