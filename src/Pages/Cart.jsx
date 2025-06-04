import React from 'react';
import PropTypes from 'prop-types';

function Cart({ children }) {
  return (
    <>
      {children}
      cart
    </>
  );
}

// ✅ PropTypes for type checking
Cart.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Cart;
