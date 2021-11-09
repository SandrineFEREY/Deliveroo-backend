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
    try {
      const response = await axios.get(
        "https://my-deliveroo-project.herokuapp.com/"
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      <header>
        <div>
          <img src={logo} alt="" />
          <div className="baseline">
            <h2>{data.restaurant.name}</h2>
            <div className="baseline-container">
              <p>{data.restaurant.description}</p>
              <div>
                <img
                  className="baseline-img"
                  src={data.restaurant.picture}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="block">
        <div className="container-bis">
          {data.categories
            .map((elem, index) => {
              return (
                <div key={index}>
                  <h2>{elem.name}</h2>
                  <div className="meals-container">
                    {elem.meals.map((elem, index) => {
                      return (
                        <div key={index} className="meals">
                          <div className="meals-description">
                            <h3>{elem.title}</h3>
                            <p>{elem.description}</p>
                            <span>{elem.price}</span>
                            {elem.popular === true && (
                              <div>
                                <FontAwesomeIcon
                                  color="orange"
                                  icon="certificate"
                                />
                                <p>populate</p>
                              </div>
                            )}
                          </div>

                          {elem.picture && (
                            <div>
                              <img src={elem.picture} alt="" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
            .slice(0, 6)}
        </div>
        <div className="panier">
          <button>Valider mon panier</button>
          <p>Votre panier est vide</p>
        </div>
      </div>
    </div>
  );
}

export default App;
