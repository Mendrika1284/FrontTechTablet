import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* eslint-disable react/style-prop-object */
const Panier = () => {
    const [isValid, setIsValid] = useState(false);
    const [command, setCommand] = useState([]);
    const [total, setTotal] = useState(0);
    const [quantite, setQuantite] = useState(0);

    useEffect(() => {
        getAllCommand();
    }, []);
    
    const getAllCommand = () => {
        axios.get('http://127.0.0.1:8000/api/listeCommande').then((response) => {
            const allCommand = response.data.commands.data;
            console.log(allCommand);
            setCommand(allCommand);
        })
        .catch(error => {
            console.error(`Erreur: ${error}`);
        });
    }

    useEffect(() => {
        let sum = 0;
        let sumQuantite = 0;
        command.forEach(cmd => {
            sum += cmd.prixTotal;
            sumQuantite+= cmd.quantite
        });
        setQuantite(sumQuantite);
        setTotal(sum);
    }, [command]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const id = command[0].commande_meres_id;
      
        axios.post(`http://127.0.0.1:8000/api/commande/valider/${id}`, {
          email: formData.get('email'),
          nom: formData.get('nom'),
          prenom: formData.get('prenom'),
          adresseLivraison: formData.get('adresse'),
          grandTotal: total,
          quantiteTotal: quantite,
          estValide: 1
        })
        .then(response => {
          console.log(response.data);
          toast.success("Merci pour votre achat!! Vous allez être rediriger vers la page d'accueil dans 3s");
          localStorage.clear();
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
        })
        .catch(error => {
          console.log(error);
        });
      }
      

      
    return ( 
        <div>
            {
                isValid === false?
                (<>
                <div className="container-fluid pt-5">
                    <div className="row px-xl-5">
                        <div className="col-lg-8 table-responsive mb-5">
                            <table className="table table-bordered text-center mb-0">
                                <thead className="bg-secondary text-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nom</th>
                                        <th>Image</th>
                                        <th>Quantite</th>
                                        <th>Prix Unitaire</th>
                                        <th>Prix Total</th>
                                    </tr>
                                </thead>
                                <tbody className="align-middle">
                                    {
                                        command && command.length > 0 ? (
                                            command.map(commands => (
                                        <tr>
                                            <td className="align-middle">{commands.idProduit}</td>
                                            <td className="align-middle">{commands.nomProduit}</td>
                                            <td className="align-middle"><img src={commands.image} alt="" style={{width: '50px'}} /></td>
                                            <td className="align-middle">{commands.quantite}</td>
                                            <td className="align-middle">{commands.prixUnitaire} €</td>
                                            <td className="align-middle">{commands.prixTotal} €</td>
                                        </tr>
                                            ))
                                        ) : (
                                            <p>Pas de commande actuellement</p>
                                        )
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-4">
                            <div className="card border-secondary mb-5">
                                <div className="card-header bg-secondary border-0">
                                    <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
                                </div>
                                <div className="card-footer border-secondary bg-transparent">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5 className="font-weight-bold">Total</h5>
                                        <h5 className="font-weight-bold">{total.toFixed(2)} €</h5>
                                    </div>
                                    <button className="btn btn-block btn-primary my-3 py-3" onClick={() => setIsValid(true)}>Passer à l'étape suivante</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>):
                (<>
                    <div class="row align-items-center" style={{height:'100vh'}}>
                        <div class="mx-auto col-10 col-md-8 col-lg-6">
                        <form class="form-example" onSubmit={handleSubmit}>
                            <h1>Veuillez entrer votre information</h1>
                            <div class="form-group">
                            <label for="email">Email:</label>
                            <input
                                type="email"
                                class="form-control email"
                                id="email"
                                placeholder="Email..."
                                name="email"
                            />
                            </div>
                            <div class="form-group">
                            <label for="nom">Nom:</label>
                            <input
                                type="text"
                                class="form-control nom"
                                id="nom"
                                placeholder="Nom..."
                                name="nom"
                            />
                            </div>
                            <div class="form-group">
                            <label for="prenom">Prénom:</label>
                            <input
                                type="text"
                                class="form-control prenom"
                                id="prenom"
                                placeholder="Prénom..."
                                name="prenom"
                            />
                            </div>
                            <div class="form-group">
                            <label for="adresse">Adresse de livraison:</label>
                            <input
                                type="text"
                                class="form-control adresse"
                                id="adresse"
                                placeholder="Adresse de livraison..."
                                name="adresse"
                            />
                            </div>
                            <div className="button-group">
                                <button onClick={() => setIsValid(false)} class="btn btn-danger btn-customized mt-4">
                                    Revenir
                                </button>
                                <button type="submit" style={{marginLeft: '280px'}} class="btn btn-primary btn-customized mt-4">
                                    Valider ma commande
                                </button>
                            </div>

                        </form>
                        </div>
                    </div>
                </>)
            }
                <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />
        </div>
     );
}
 
export default Panier;