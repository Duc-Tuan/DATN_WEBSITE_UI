import PropTypes from "prop-types";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

function HeaderOnly({ children }) {
  return (
    <div>
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}

HeaderOnly.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderOnly;
