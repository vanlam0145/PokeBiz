import React from "react";
import Header from "./components/header";
import LoadMap from "./components/body/ggmap";




export const Home = props => {

    return (
       
        <div>
            <Header {...props} />
            <LoadMap />   
        </div>
        
    );
    
  
};
export default Home;
