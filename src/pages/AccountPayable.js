import React, { Component } from "react";
import firebase from "firebase";

export default class AccountPayable extends Component {
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
    AccountPayable: null,
    docId: "empty",
    purchase_id: "",
    creditor_name: "",
    SearchAccount: null,
    TotalAmount: "00"
  };
  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    db.collection("AccountPayable")
      .get()
      .then(snapshot => {
        const AccountPayable = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          AccountPayable.push(data);
        });
        this.setState({
          AccountPayable: AccountPayable
        });
      })
      .catch(error => {
        alert("oops , cant load the AccountPayable");
      });
  }
  componentDidUpdate() {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    db.collection("AccountPayable")
      .get()
      .then(snapshot => {
        const ArrayAmount = [];
        const AccountPayable = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          AccountPayable.push(data);
        });
        for (var i = 0; i < AccountPayable.length; i++) {
          var Amount = Number(AccountPayable[i].total_price);

          ArrayAmount.push(Amount);
        }
        const TotalAmount = ArrayAmount.reduce(function(a, b) {
          return a + b;
        });
        this.setState({
          AccountPayable: AccountPayable,
          TotalAmount: TotalAmount
        });
      })
      .catch(error => {
        alert("oops , cant load the AccountPayable");
      });
    if (this.state.docId !== "empty") {
      db.collection("AccountPayable")
        .doc(this.state.docId)
        .delete();
    }
    db.collection("dashbord")
        .doc("A6csMHd1d59xstmA1Shb")
        .update({
          payable: this.state.TotalAmount
        });
  }
  getPurchaseId = e => {
    this.setState({
      purchase_id: e.target.getAttribute("data-id")
    });
    console.log(this.state.purchase_id);
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    if (this.state.purchase_id !== "") {
      const db = firebase.firestore();
      db.collection("AccountPayable")
        .where("purchase_id", "==", this.state.purchase_id)
        .limit(1)
        .get()
        .then(snapshot => {
          const getid = [];
          snapshot.forEach(doc => {
            const id = doc.id;
            getid.push(id);
          });
          const id = getid[0];
          console.log(id);
          this.setState({
            docId: id
          });
        })
        .catch(error => {
          alert("oops , cant load the AccountPayable");
        });
    }
  };
  getSearchKeyword = e => {
    this.setState({
      creditor_name: e.target.value
    });
  };
  Search = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    db.collection("AccountPayable")
      .where("creditor_name", "==", this.state.creditor_name)
      .get()
      .then(snapshot => {
        const purchase = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          purchase.push(data);
        });
        this.setState({
          SearchAccount: purchase
        });
      })
      .catch(error => {
        alert("oops , cant load the sale recorde");
      });
  };
  render() {
    return (
      <div>
        <div className="text-center mt-2 display-4 bg-light topHeader">
          <p className="py-3">Account Payable</p>
        </div>
        <div className="pt-2 px-2">
          <label className="btn btn-secondary btn-sm">Search Account</label>
          <input
            type="text"
            placeholder=" Enter the Creditor name"
            onChange={this.getSearchKeyword}
          ></input>
          <button className="btn btn-secondary btn-sm" onClick={this.Search}>
            <i className="search icon"></i>
          </button>
          <h3
            className="text-danger "
            style={{ display: "inline-block", marginLeft: "50%" }}
          >
            Total Amount To Pay: {this.state.TotalAmount}
          </h3>
        </div>
        <table class="ui striped table">
          <thead>
            <tr>
              <th>Creditor Name</th>
              <th>Item Name</th>
              <th>Date/Time</th>
              <th>Purchase id</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Payment</th>
            </tr>
          </thead>
          {this.state.creditor_name ? (
            <>
              {this.state.SearchAccount &&
                this.state.SearchAccount.map(Account => {
                  return (
                    <tbody>
                      <tr>
                        <td>{Account.creditor_name}</td>
                        <td>{Account.pro_name}</td>
                        <td>{Account.date_time.toDate().toString()}</td>
                        <td>{Account.purchase_id}</td>
                        <td> {Account.quantity} </td>
                        <td>{Account.total_price}</td>
                        <td>
                          <button
                            data-id={Account.purchase_id}
                            className="btn btn-outline-danger"
                            onClick={this.getPurchaseId}
                          >
                            Paid
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </>
          ) : (
            <>
              {this.state.AccountPayable &&
                this.state.AccountPayable.map(Account => {
                  return (
                    <tbody>
                      <tr>
                        <td>{Account.creditor_name}</td>
                        <td>{Account.pro_name}</td>
                        <td>{Account.date_time.toDate().toString()}</td>
                        <td>{Account.purchase_id}</td>
                        <td> {Account.quantity} </td>
                        <td>{Account.total_price}</td>
                        <td>
                          <button
                            data-id={Account.purchase_id}
                            className="btn btn-outline-danger"
                            onClick={this.getPurchaseId}
                          >
                            Paid
                          </button>
                        </td>
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
