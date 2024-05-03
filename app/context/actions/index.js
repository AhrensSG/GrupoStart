import axios from "axios";

const SERVER_URL_USERS_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_USERS_ENDPOINT;
const SERVER_URL_ORDER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_ORDER_ENDPOINT;
const SERVER_URL_ORDER_PRODUCTS_ENDPOINT =
  process.env.NEXT_PUBLIC_SERVER_ORDER_PRODUCTS_ENDPOINT;

////////////////////////// PAYMENT //////////////////////////////////

const SERVER_URL_DELIVERY_COST_ENDPOINT =
  process.env.NEXT_PUBLIC_SERVER_DELIVERY_COST_ENDPOINT;

const SERVER_URL_CREATE_PAYMENT_ENDPOINT =
  process.env.NEXT_PUBLIC_SERVER_CREATE_PAYMENT_ENDPOINT;

/////////////////////////////////////////////////////////////////////

export const updateUser = async (values, dispatch) => {
  try {
    const res = await axios.put(`${SERVER_URL_USERS_ENDPOINT}`, values);
    return dispatch({ type: "UPDATED_USER", payload: res.data });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};
//////////////////////////// CART ////////////////////////////////////

export const addProductToCart = (product, dispatch) => {
  return dispatch({
    type: "ADD_PRODUCT_TO_CART",
    payload: product,
  });
};

export const removeProductFromCart = (product, dispatch) => {
  return dispatch({
    type: "REMOVE_PRODUCT_FROM_CART",
    payload: product,
  });
};

export const emptyCart = (dispatch) => {
  return dispatch({
    type: "EMPTY_CART",
  });
};

//////////////////////////// PAYMENT ////////////////////////////////////

export const savePaymentInformation = (data, dispatch) => {
  return dispatch({
    type: "PAYMENT_INFORMATION",
    payload: data,
  });
};

export const getDeliveryCost = async (data, postalCode, dispatch) => {
  try {
    const res = await axios.get(
      `${SERVER_URL_DELIVERY_COST_ENDPOINT}?weight=${data.totalWeight}&volume=${data.totalVolume}&postcode=${postalCode}`
    );
    dispatch({
      type: "DELIVERY_COST",
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const deleteDeliveryCostInformation = (dispatch) => {
  return dispatch({
    type: "DELETE_DELIVERY_COST_INFORMATION",
  });
};

export const createPayment = async (
  user,
  productsCart,
  deliveryCost,
  orderId
) => {
  try {
    const productsPayment = productsCart.map((p) => {
      return {
        id: p.id,
        description: p.description,
        title: p.name,
        quantity: p.items,
        unit_price: parseFloat(p.price + p.price * 0.21),
        currency_id: "ARS",
      };
    });

    const paymentData = {
      payer: user,
      items: productsPayment,
      orderId: orderId,
      deliveryCost: Number(deliveryCost),
    };

    const pay = await axios.post(
      `${SERVER_URL_CREATE_PAYMENT_ENDPOINT}`,
      paymentData,
      { maxBodyLength: Infinity }
    );
    return pay.data;
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const savePreferenceID = (id, dispatch) => {
  return dispatch({
    type: "PREFERENCE_ID",
    payload: id,
  });
};

//////////////////////////// ORDER ////////////////////////////////////

export const createOrder = async (data, deliveryCost) => {
  try {
    const body = {
      userId: data.user.id,
      status: "Pending",
      totalPrice: data.cartTotalPrice,
      deliveryCost: Number(deliveryCost) || 0,
      cartPrice: data.cartPrice,
      email: data.payment.email,
      name: data.payment.name,
      surname: data.payment.surname,
      postalCode: data.payment.postalCode,
      country: data.payment.country,
      province: data.payment.province,
      fullAddress: data.payment.fullAddress,
      phone: data.payment.phone,
    };
    const res = await axios.post(SERVER_URL_ORDER_ENDPOINT, body);
    return res.data;
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const addProductsToOrder = async (data) => {
  try {
    await axios.post(SERVER_URL_ORDER_PRODUCTS_ENDPOINT, data);
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const getAllOrders = async (dispatch) => {
  try {
    const res = await axios.get(`${SERVER_URL_ORDER_ENDPOINT}`);
    return dispatch({ type: "GET_ALL_ORDERS", payload: res.data });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const updateOrder = async (data) => {
  try {
    await axios.put(SERVER_URL_ORDER_ENDPOINT, data);
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const getOneOrder = async (id) => {
  try {
    const data = await axios.get(`${SERVER_URL_ORDER_ENDPOINT}?id=${id}`);
    return data.data;
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};
