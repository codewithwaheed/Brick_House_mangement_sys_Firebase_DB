import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";

export default class Product extends Component {
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
    purchase: null,
    SearchStatus: false,
    deleteStatus: false,
    Searchpurchase: null,
    TotalAmount: null,
    delete: "",
    Search: "",
    month: false,
    Year: false,
    today: true,
    stateDelete: false,
    docId: "empty"
  };
  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const db = firebase.firestore();
    db.collection("purchase")
      .where("date_time", ">=", startOfDay)
      .get()
      .then(snapshot => {
        const purchase = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          purchase.push(data);
        });
        this.setState({
          purchase: purchase
        });
      })
      .catch(error => {
        alert("oops , cant load the purchase recorde  mount");
      });
  }
  DeleteRecord = () => {
    this.setState({
      stateDelete: true
    });
  };
  RetriveMonth = () => {
    this.setState({
      today: false,
      month: true,
      Year: false
    });
  };
  RetriveYear = () => {
    this.setState({
      today: false,
      month: false,
      Year: true
    });
  };
  RetriveToday = () => {
    this.setState({
      today: true,
      month: false,
      Year: false
    });
  };
  componentDidUpdate() {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const startofYear = new Date();
    startofYear.setMonth(0, 1);
    const startofMonth = new Date();
    startofMonth.setDate(1);
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const db = firebase.firestore();
    if (this.state.today) {
      db.collection("purchase")
        .where("date_time", ">=", startOfDay)
        .get()
        .then(snapshot => {
          const purchase = [];
          const ArrayAmount = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            purchase.push(data);
          });
          for (var i = 0; i < purchase.length; i++) {
            var Amount = Number(purchase[i].total_price);

            ArrayAmount.push(Amount);
          }
          const TotalAmount = ArrayAmount.reduce(function(a, b) {
            return a + b;
          });

          this.setState({
            purchase: purchase,
            TotalAmount: TotalAmount
          });
        })
        .catch(error => {
          alert("oops , cant load the purchase recorde today");
        });
        db.collection("dashbord")
        .doc("A6csMHd1d59xstmA1Shb")
        .update({
          todayPurchase: this.state.TotalAmount
        });
    }
    if (this.state.month) {
      db.collection("purchase")
        .where("date_time", ">=", startofMonth)
        .get()
        .then(snapshot => {
          const purchase = [];
          const ArrayAmount = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            purchase.push(data);
          });
          for (var i = 0; i < purchase.length; i++) {
            var Amount = Number(purchase[i].total_price);

            ArrayAmount.push(Amount);
          }
          const TotalAmount = ArrayAmount.reduce(function(a, b) {
            return a + b;
          });

          this.setState({
            purchase: purchase,
            TotalAmount: TotalAmount
          });
        })
        .catch(error => {
          alert("oops , cant load the purchase recorde month");
        });
        db.collection("dashbord")
        .doc("A6csMHd1d59xstmA1Shb")
        .update({
          monthPurchase: this.state.TotalAmount
        });
    }
    if (this.state.Year) {
      db.collection("purchase")
        .where("date_time", ">=", startofYear)
        .get()
        .then(snapshot => {
          const purchase = [];
          const ArrayAmount = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            purchase.push(data);
          });
          for (var i = 0; i < purchase.length; i++) {
            var Amount = Number(purchase[i].total_price);

            ArrayAmount.push(Amount);
          }
          const TotalAmount = ArrayAmount.reduce(function(a, b) {
            return a + b;
          });

          this.setState({
            purchase: purchase,
            TotalAmount: TotalAmount
          });
        })
        .catch(error => {
          alert("oops , cant load the purchase recorde year");
        });
        db.collection("dashbord")
        .doc("A6csMHd1d59xstmA1Shb")
        .update({
          yearPurchase: this.state.TotalAmount
        });
    }

    if (this.state.docId !== "empty") {
      db.collection("purchase")
        .doc(this.state.docId)
        .delete();
    }
  }
  deleteActive = () => {
    if (this.state.deleteStatus === false)
      this.setState({
        deleteStatus: true,
        SearchStatus: false
      });
    if (this.state.deleteStatus === true)
      this.setState({
        deleteStatus: false,
        SearchStatus:false
        
      });
  };
  getDeleteKeyword = e => {
    this.setState({
      delete: e.target.value
    });
  };
  SearchActive = () => {
    if (this.state.SearchStatus === false)
      this.setState({
        SearchStatus: true,
        deleteStatus: false,
      });
    if (this.state.SearchStatus === true)
      this.setState({
        SearchStatus: false,
        deleteStatus: false,
      });
  };
  getSearchKeyword = e => {
    this.setState({
      Search: e.target.value
    });
  };
  Search = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    db.collection("purchase")
      .where("creditor_name", "==", this.state.Search)
      .get()
      .then(snapshot => {
        const purchase = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          purchase.push(data);
        });
        this.setState({
          Searchpurchase: purchase
        });
      })
      .catch(error => {
        alert("oops , cant load the purchase recorde for search");
      });
  };
  Delete = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    db.collection("purchase")
      .where("purchase_id", "==", this.state.delete)
      .get()
      .then(snapshot => {
        const getid = [];
        snapshot.forEach(doc => {
          const id = doc.id;
          getid.push(id);
        });
        const id = getid[0];
        this.setState({
          docId: id
        });
      })
      .catch(error => {
        alert("oops , cant load the purchase recorde for delete");
      });
  };
  render() {
    return (
      <div>
        <div className="text-center mt-2 display-4 bg-light topHeader">
          Purchase Record
        </div>
        <div className="bg-light">
          <button
            className={
              this.state.today
                ? "btn btn-danger my-2 ml-2"
                : "btn btn-secondary my-2 ml-2"
            }
            onClick={this.RetriveToday}
          >
            Today
          </button>
          <button
            className={
              this.state.month
                ? "btn btn-danger my-2 ml-2"
                : "btn btn-secondary my-2 ml-2"
            }
            onClick={this.RetriveMonth}
          >
            Month
          </button>
          <button
            className={
              this.state.Year
                ? "btn btn-danger my-2 ml-2"
                : "btn btn-secondary my-2 ml-2"
            }
            onClick={this.RetriveYear}
          >
            Year
          </button>

          <Link to="/addPurchase">
            <button className="btn btn-secondary  my-2 ml-2">
              <i className="plus icon"></i>Add
            </button>
          </Link>
          <button
            className="btn btn-secondary  my-2 ml-2"
            onClick={this.deleteActive}
          >
            <i className="delete icon"></i>Delete
          </button>
          <button
            className="btn btn-secondary my-2 ml-2"
            onClick={this.SearchActive}
          >
            Search
          </button>
          <h3
            className="text-danger "
            style={{ display: "inline-block", marginLeft: "50%" }}
          >
            Total Amount of Sale: {this.state.TotalAmount}
          </h3>
        </div>
        <div className="pt-2">
          {this.state.deleteStatus ? (
            <div>
              <label className="btn btn-secondary btn-sm">Purchase id</label>
              <input type="text" onChange={this.getDeleteKeyword}></input>
              <button
                className="btn btn-secondary btn-sm"
                onClick={this.Delete}
              >
                <i className="delete icon"></i>
              </button>
            </div>
          ) : (
            <div></div>
          )}
          {this.state.SearchStatus ? (
            <div>
              <label className="btn btn-secondary btn-sm">Creditor Name</label>
              <input type="text" onChange={this.getSearchKeyword}></input>
              <button
                className="btn btn-secondary btn-sm"
                onClick={this.Search}
              >
                <i className="search icon"></i>
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <table class="ui striped table">
          <thead>
            <tr>
              <th>purchase Id</th>
              <th>Item Name</th>
              <th>Product Id</th>
              <th>Date/Time</th>
              <th>Payment method</th>
              <th>Creditor Name</th>
              <th>Quantity</th>
              <th>Price Per Quantity</th>
              <th>Discount on purchase</th>
              <th>Total Price</th>
            </tr>
          </thead>
          {this.state.Search ? (
            <>
              {this.state.Searchpurchase &&
                this.state.Searchpurchase.map(sales => {
                  return (
                    <tbody>
                      <tr>
                        <td>{sales.purchase_id}</td>
                        <td>{sales.pro_name}</td>
                        <td>{sales.pro_id}</td>
                        <td>{sales.date_time.toDate().toString()}</td>
                        <td> on {sales.payment_method} </td>
                        <td>{sales.creditor_name}</td>
                        <td>{sales.quantity}</td>
                        <td>{sales.price_per_quantity}</td>
                        <td>{sales.discount}</td>
                        <td>{sales.total_price}</td>
                      </tr>
                    </tbody>
                  );
                })}
            </>
          ) : (
            <>
              {this.state.purchase &&
                this.state.purchase.map(sales => {
                  return (
                    <tbody>
                      <tr>
                        <td>{sales.purchase_id}</td>
                        <td>{sales.pro_name}</td>
                        <td>{sales.pro_id}</td>
                        <td>{sales.date_time.toDate().toString()}</td>
                        <td> on {sales.payment_method} </td>
                        <td>{sales.creditor_name}</td>
                        <td>{sales.quantity}</td>
                        <td>{sales.price_per_quantity}</td>
                        <td>{sales.discount}</td>
                        <td>{sales.total_price}</td>
                      </tr>
                    </tbody>
                  );
                })}
            </>
          )}
        </table>
      </div>
    );
  }
}
