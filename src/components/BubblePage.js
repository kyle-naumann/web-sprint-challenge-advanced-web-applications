import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {

    axiosWithAuth().get(`http://localhost:5000/api/colors`)
    .then(res => {
        console.log( "get data for res: ", res.data);
        setColorList(res.data);

      })

      .catch(err => console.error( "Could not retrieve colors: ", err.message));
  }, []);


  return (
    <div className="container">
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </div>
  );
};

export default BubblePage;

