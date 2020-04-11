import React, { Component } from "react";
import firebase from "firebase";

export default class AddRecorde extends Component {
  firebaseConfig = {
    apiKey: "AIzaSyCrfxHh9jaudN2TQhnB02O4MkeufknbMro",
    authDomain: "brick-kiln-588e0.firebaseapp.com",
    databaseURL: "https://brick-kiln-588e0.firebaseio.com",
    projectId: "brick-kiln-588e0",
    storageBucket: "brick-kiln-588e0.appspot.com",
    messagingSenderId: "210504541417",
    appId: "1:210504541417:web:282e1b852786bb2381fc78",
    measurementId: "G-DCM48Q6QNQ"
  };
  state = {
    sale_id: "",
    pro_name: "",
    pro_id: "",
    quantity: "",
    price_per_quantity: "",
    payment_method: "",
    date_time: null,
    total_price: "",
    debtor_name: "",
    discount: "",
    v_sale_id: "",
    v_pro_name: "",
    v_pro_id: "",
    v_quantity: "",
    v_price_per_quantity: "",
    v_payment_method: "",
    v_date_time: "",
    v_total_price: "",
    v_debtor_name: "",
    v_discount: "",
    stateOfRecord: "true",
    validation: false
  };
  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    db.collection("sale")
      .get()
      .then(snapshot => {
        const sales = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          sales.push(data);
        });
        var Uniqueid = sales.length + 1;

        for (var i = 0; i < sales.length; i++) {
          var prevSaleId = Number(sales[i].sale_id);
          if (Uniqueid === prevSaleId) {
            Uniqueid++;
          }
          this.setState({
            v_sale_id: Uniqueid.toString()
          });
        }
      })
      .catch(error => {
        alert("oops , cant load the sale recorde");
      });
  }

  getSaleId = e => {
    this.setState({
      v_sale_id: e.target.value
    });
  };
  getProId = e => {
    this.setState({
      v_pro_id: e.target.value
    });
  };
  getProName = e => {
    this.setState({
      v_pro_name: e.target.value
    });
  };
  getQuantity = e => {
    this.setState({
      v_quantity: e.target.value
    });
  };
  getPricePerQ = e => {
    this.setState({
      v_price_per_quantity: e.target.value
    });
  };
  getTotalPrice = e => {
    this.setState({
      v_total_price: e.target.value
    });
  };
  getPaymentMethod = e => {
    this.setState({
      v_payment_method: e.target.value
    });
  };
  getDebtorName = e => {
    this.setState({
      v_debtor_name: e.target.value
    });
  };
  getDiscount = e => {
    this.setState({
      v_discount: e.target.value
    });
  };
  AddValues = () => {
    if (
      this.state.v_sale_id === "" ||
      this.state.v_pro_name === "" ||
      this.state.v_pro_id === "" ||
      this.state.v_quantity === "" ||
      this.state.v_price_per_quantity === "" ||
      this.state.v_total_price === "" ||
      this.state.v_payment_method === ""
    ) {
      this.setState({
        validation: true
      });
      return;
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    const sale_id = this.state.v_sale_id;
    const pro_name = this.state.v_pro_name;
    const pro_id = this.state.v_pro_id;
    const quantity = this.state.v_quantity;
    const price_per_quantity = this.state.v_price_per_quantity;
    const total_price = this.state.v_total_price;
    const payment_method = this.state.v_payment_method;
    const debtor_name = this.state.v_debtor_name;
    const discount = this.state.v_discount;

    db.collection("sale").add({
      sale_id: sale_id,
      pro_name: pro_name,
      pro_id: pro_id,
      quantity: quantity,
      price_per_quantity: price_per_quantity,
      total_price: total_price,
      date_time: new Date(),
      payment_method: payment_method,
      debtor_name: debtor_name,
      discount: discount
    });
    this.setState({
      stateOfRecord: false
    });
    if (this.state.v_debtor_name !== "") {
      db.collection("AccountRecievable").add({
        sale_id: sale_id,
        pro_name: pro_name,
        quantity: quantity,
        total_price: total_price,
        date_time: new Date(),
        debtor_name: debtor_name
      });
    }
    setTimeout(function() {
      window.location.reload();
    }, 4000);
  };
  getTotalPricefun = () => {
    var price_per_quantity = Number(this.state.v_price_per_quantity);
    var quantity = Number(this.state.v_quantity);
    var discount = Number(this.state.v_discount);
    var total_price = price_per_quantity * quantity - discount;

    if (
      this.state.v_quantity !== "" &&
      this.state.v_price_per_quantity !== "" &&
      this.state.v_discount !== ""
    ) {
      this.setState({
        v_total_price: total_price.toString()
      });
    }
  };

  render() {
    return (
      <div>
        <div className="text-center mt-2 display-4 bg-light topHeader">
          Add Sale Record
        </div>
        <form>
          <div className="from-row">
            <div className="col-md-3 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">sale id</label>
              <input
                type="text"
                onChange={this.getSaleId}
                defaultValue={this.state.v_sale_id}
                className="form-control"
                id="validationDefault22"
                required
              />
            </div>
            <div className="col-md-4 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">item name</label>
              <input
                type="text"
                onChange={this.getProName}
                className="form-control"
                id="validationDefault22"
                required
              />
            </div>
            <div className="col-md-3 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefaultUsername22">product id</label>
              <input
                type="text"
                onChange={this.getProId}
                className="form-control"
                id="validationDefaultUsername22"
                aria-describedby="inputGroupPrepend23"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-2 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">Quantity</label>
              <input
                type="text"
                onChange={this.getQuantity}
                className="form-control"
                id="validationDefault22"
                required
              />
            </div>
            <div className="col-md-2 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">Price per Quantity</label>
              <input
                type="text"
                onChange={this.getPricePerQ}
                className="form-control"
                id="validationDefault22"
                required
              />{" "}
            </div>
            <div className="col-md-2 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">Get Discount</label>
              <input
                type="text"
                onChange={this.getDiscount}
                className="form-control"
                id="validationDefault22"
                required
              />
            </div>
            <div className="col-md-2 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">Total price</label>
              <input
                type="text"
                onChange={this.getTotalPrice}
                defaultValue={this.state.v_total_price}
                className="form-control"
                id="validationDefault22"
                required
              />{" "}
              <button
                type="button"
                style={{ display: "inline-block" }}
                className="btn btn-outline-secondary btn-sm ml-2 mt-2"
                onClick={this.getTotalPricefun}
              >
                Get Total price
              </button>
            </div>
            <div className="col-md-2 ml-3 mb-3 mb-form">
              <p>Describe payment method </p>
              <input
                type="radio"
                name="payment"
                id="cash"
                value="cash"
                onChange={this.getPaymentMethod}
              ></input>
              <label for="cash">Cash</label>
              <input
                className="ml-2"
                type="radio"
                name="payment"
                id="credit"
                value="credit"
                onChange={this.getPaymentMethod}
              ></input>
              <label for="credit">Credit</label>
            </div>
            {this.state.v_payment_method === "credit" ? (
              <div className="col-md-2 ml-3 mb-3 mb-form">
                <label htmlFor="validationDefault22">Debtor Name</label>
                <input
                  type="text"
                  onChange={this.getDebtorName}
                  defaultValue="none"
                  className="form-control"
                  id="validationDefault22"
                  required
                />
              </div>
            ) : (
              <div />
            )}
          </div>
        </form>

        <div className=" text-center">
          {this.state.validation ? (
            <p className="text-danger">You must fill all the values</p>
          ) : (
            <></>
          )}
          <button
            className="btn btn-secondary "
            onClick={this.AddValues}
            style={{
              backgroundColor: this.state.stateOfRecord ? "#d9534f" : "#5cb85c"
            }}
          >
            Save Record
          </button>
        </div>
      </div>
    );
  }
}
