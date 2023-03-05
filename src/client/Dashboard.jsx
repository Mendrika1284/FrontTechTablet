/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* eslint-disable jsx-a11y/anchor-is-valid */
const Dashboard = ({ setCount }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllProduct();
    }, []);

    useEffect(() => {
        // Loop through all the cards and set the default value of their input field
        // to the value stored in local storage (if available)
        const cards = products
        cards.forEach(card => {
           const cardId = card.id
           const quantity = localStorage.getItem(`card-${cardId}-quantity`);
           if (quantity) {
              const inputField = card.querySelector('[name="quantite"]');
              inputField.defaultValue = quantity;
           }
        });
     }, []);
     
    
    const getAllProduct = () => {
        axios.get('http://127.0.0.1:8000/api/product').then((response) => {
            const allProducts = response.data.data;
            console.log(allProducts);
            setProducts(allProducts);
            setIsLoading(false);
            //toast.success("Produit générer avec succes");
        })
        .catch(error => {
            console.error(`Erreur: ${error}`);
            setIsLoading(false);
        });
    }

    const createCommande = (commandeData) => {
        return axios.post('http://127.0.0.1:8000/api/commande', commandeData)
          .then(response => response.data)
          .catch(error => console.error(`Erreur: ${error}`));
      };
      
      const handleFormSubmit = (product) => (event) => {
        event.preventDefault();
      
        const formData = new FormData(event.target);
        const quantite = parseInt(formData.get('quantite'), 10);
      
        if (quantite === 0) {
          toast.warning("La quantité doit être supérieure à zéro");
          return;
        }
      
        if (product.stock.available === 0) {
          toast.warning("Le produit est en rupture de stock");
          return;
        }
      
        if (quantite > product.stock.available) {
          toast.warning("La quantité demandée est supérieure à la quantité en stock");
          return;
        }
      
        const commandeData = {
          idProduit: product.id,
          nomProduit: product.name,
          image: product.pictures,
          quantite: quantite,
          prixUnitaire: parseFloat(product.pricettc),
          prixTotal: quantite * product.pricettc,
        };
      
        console.log(commandeData);
      
        createCommande(commandeData)
          .then(response => {
            console.log(response);

            toast.success("Votre commande a bien été ajouter aux panier");
          })
          .catch(error => {
            console.error(`Erreur: ${error}`);
          });
      };
      
      
      

    return ( 
        <div>
            {
                isLoading?(<>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </>):(<>
                    <div className="container-fluid">
                        <div className="row px-xl-5">
                            <div className="col-md-12">
                                <div className="row pb-3">
                                    {
                                        products && products.length > 0?(
                                        products.map(product =>(
                                            <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                                                <form onSubmit={handleFormSubmit(product)}>
                                                    <div className="card product-item border-0 mb-4">
                                                        <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                                            <img className="img-fluid w-100" style={{height: "600px"}} src={product.pictures} alt="" />
                                                        </div>
                                                        <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                                            <h6 className="text-truncate mb-3">{product.name}</h6>
                                                            <h6 className="text-truncate mb-3">{product.color.name}</h6>
                                                            <div className="d-flex justify-content-center">
                                                                <h6>{product.pricettc} €</h6>   
                                                            </div>
                                                            <div className="col-sm-3 d-flex justify-content-center">
                                                                <input type="number" name="quantite" className="form-control" defaultValue={localStorage.getItem(`card-${product.id}-quantity`) || "Quantité"} id="inlineFormInputName" min="0" placeholder="Quantité" onChange={(e) => {
                                                                    const cardId = product.id
                                                                    localStorage.setItem(`card-${cardId}-quantity`, e.target.value);
                                                                }} />
                                                            </div>
                                                        </div>
                                                        <div className="card-footer d-flex justify-content-center bg-light border">
                                                            <button className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Ajouter aux panier</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        ))
                                        ):(
                                            <p>Pas encore de donnée</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
            }
                    <ToastContainer
                      position="bottom-right"
                      autoClose={5000}
                      hideProgressBar={true}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      draggable
                      pauseOnHover
                      theme="dark"
                    />
        </div>
     );
}
 
export default Dashboard;
