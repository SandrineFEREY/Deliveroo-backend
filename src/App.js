import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/deliveroo.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faCertificate);

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://my-deliveroo-project.herokuapp.com/"
    );
    // console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      <img src={logo} alt="" />
      <div className="block">
        <h2>{data.restaurant.name}</h2>
        <p>{data.restaurant.description}</p>
        <div>
          {data.categories
            .map((elem, index) => {
              return (
                <div>
                  <h2>{elem.name}</h2>

                  {elem.meals.map((elem, index) => {
                    return (
                      <div className="pavé">
                        <h3>{elem.title}</h3>
                        <div>{elem.description}</div>
                        <div>{elem.price}</div>
                        {elem.picture && <img src={elem.picture} alt="" />}
                        {elem.popular === true && (
                          <div>
                            <FontAwesomeIcon
                              color="orange"
                              icon="certificate"
                            />{" "}
                            <p>populate</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })
            .slice(0, 6)}
        </div>
      </div>
    </div>
  );
}

export default App;
