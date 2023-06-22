import React, { useState } from "react";
import { createStore } from "redux";
import "bootstrap/dist/css/bootstrap.css";
import { Provider, useDispatch, useSelector } from "react-redux";

const ADD_PRODUCT = "ADD_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";

const addProduct = (product) => ({ type: ADD_PRODUCT, payload: product });
const updateProduct = (product) => ({ type: UPDATE_PRODUCT, payload: product });
const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId
});

const initialState = {
  products: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        )
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        )
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div>
      <div class="container text-center">
        <div class="row">
          <div class="col-12 col-sm-12">
            <h2 class="mb-2">Product List</h2>
            <table class="table table-dark table-hover mb-4">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Thumbnail</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      <img src={product.thumbnail} alt="Thumbnail" />
                    </td>
                    <td>
                      <button
                        class="btn btn-danger btn-xs"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddProductForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      title,
      description,
      price,
      thumbnail: "https://via.placeholder.com/150"
    };

    dispatch(addProduct(newProduct));

    setTitle("");
    setDescription("");
    setPrice("");
  };

  return (
    <div>
      <div class="container text-center mb-5">
        <div class="row">
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit}>
            <div class="row">
              <div class="col-3 col-sm-3">
                <label class="form-label" htmlFor="title">
                  Title:
                </label>
                <input
                  class="form-control"
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div class="col-3 col-sm-3">
                <label class="form-label" htmlFor="description">
                  Description:
                </label>
                <input
                  class="form-control"
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div class="col-3 col-sm-3">
                <label class="form-label" htmlFor="price">
                  Price:
                </label>
                <input
                  class="form-control"
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div class="col-3 col-sm-3">
                <button class="btn btn-primary" type="submit">
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const UpdateProductForm = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleProductChange = (e) => {
    const productId = parseInt(e.target.value);
    setSelectedProduct(productId);

    const product = products.find((p) => p.id === productId);
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: selectedProduct,
      title,
      description,
      price,
      thumbnail: "https://via.placeholder.com/150"
    };

    dispatch(updateProduct(updatedProduct));

    setSelectedProduct("");
    setTitle("");
    setDescription("");
    setPrice("");
  };

  return (
    <div>
      <div class="container text-center">
        <div class="row">
          <h2 class="mb-2">Update Product</h2>
          <div class="col-12 col-sm-12 mt-2 mb-4">
            <select
              class="form-select mb-4"
              value={selectedProduct}
              onChange={handleProductChange}
              required
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.title}
                </option>
              ))}
            </select>

            {selectedProduct && (
              <form onSubmit={handleSubmit}>
                <div class="row">
                  <div class="col-4 col-sm-4">
                    <label class="form-label" htmlFor="title">
                      Title:
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div class="col-4 col-sm-4">
                    <label class="form-label" htmlFor="description">
                      Description:
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div class="col-4 col-sm-4">
                    <label class="form-label" htmlFor="price">
                      Price:
                    </label>
                    <input
                      class="form-control"
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button class="btn btn-primary mt-2" type="submit">
                  Update
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <ProductList />
        <AddProductForm />
        <UpdateProductForm />
      </div>
    </Provider>
  );
};

export default App;
