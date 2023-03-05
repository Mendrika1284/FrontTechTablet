/* eslint-disable jsx-a11y/anchor-is-valid */
const Topbar = () => {
  return ( 
    <div>
      <div className="container-fluid">
        <div className="row align-items-center py-3 px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a href="/" className="text-decoration-none">
              <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">M</span>endrika</h1>
            </a>
          </div>
          <div className="col-lg-6 col-6 text-left">

          </div>
          <div className="col-lg-3 col-6 text-right">
            <a href="/panier" className="btn border">
              <i className="fas fa-shopping-cart text-primary"></i>
              <span className="badge">Voir Panier</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Topbar;
