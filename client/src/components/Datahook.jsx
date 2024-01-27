import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Datahook = (props) => {
  const { url } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    async function mongo_fetch() {
      try {
        const response = await axios.get(url);
        const req = response.data;

        setData(req);
      } catch (e) {
        console.log(e);
      }
    }
    mongo_fetch();
  }, []);
  return data;
};

export default Datahook;
