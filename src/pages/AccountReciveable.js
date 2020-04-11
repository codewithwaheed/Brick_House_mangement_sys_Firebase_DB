import React, { Component } from "react";
import firebase from "firebase";

export default class AccountReciveable extends Component {
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
    AccountReciveable: null,
    docId: "empty",
    sale_id: "",
    debtor_name: "",
    SearchAccount: null,
    TotalAmount: "00"
  };
  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    db.collection("AccountReceivable")
      .get()
      .then(snapshot => {
        const AccountReciveable = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          AccountReciveable.push(data);
        });
        this.setState({
          AccountReciveable: AccountReciveable
        });
      })
      .catch(error => {
        alert("oops , cant load the sale recorde");
      });
  }
  componentDidUpdate() {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    db.collection("AccountRecievable")
      .get()
      .then(snapshot => {
        const ArrayAmount = [];
        const AccountReciveable = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          AccountReciveable.push(data);
        });
        for (var i = 0; i < AccountReciveable.length; i++) {
          var Amount = Number(AccountReciveable[i].total_price);

          ArrayAmount.push(Amount);
        }
        const TotalAmount = ArrayAmount.reduce(function(a, b) {
          return a + b;
        });
        this.setState({
          AccountReciveable: AccountReciveable,
          TotalAmount: TotalAmount
        });
      })
      .catch(error => {
        alert("oops , cant load the sale recorde");
      });
    if (this.state.docId !== "empty") {
      db.collection("AccountRecievable")
        .doc(this.state.docId)
        .delete();
    }
    db.collection("dashbord")
      .doc("A6csMHd1d59xstmA1Shb")
      .update({
        recievable: this.state.TotalAmount
      });
  }
  getSaleId = e => {
    this.setState({
      sale_id: e.target.getAttribute("data-id")
    });
    console.log(this.state.sale_id);
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    if (this.state.sale_id !== "") {
      const db = firebase.firestore();
      db.collection("AccountRecievable")
        .where("sale_id", "==", this.state.sale_id)
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
          alert("oops , cant load the sale recorde");
        });
    }
  };
  getSearchKeyword = e => {
    this.setState({
      debtor_name: e.target.value
    });
  };
  Search = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    db.collection("AccountRecievable")
      .where("debtor_name", "==", this.state.debtor_name)
      .get()
      .then(snapshot => {
        const sales = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          sales.push(data);
        });
        this.setState({
          SearchAccount: sales
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
          <p className="py-3">Account Reciveable</p>
        </div>
        <div className="pt-2 px-2">
          <label className="btn btn-secondary btn-sm">Search Account</label>
          <input
            type="text"
            placeholder=" Enter the Debtor name"
            onChange={this.getSearchKeyword}
          ></input>
          <button className="btn btn-secondary btn-sm" onClick={this.Search}>
            <i className="search icon"></i>
          </button>
          <h3
            className="text-danger "
            style={{ display: "inline-block", marginLeft: "50%" }}
          >
            Total Amount To Recieve: {this.state.TotalAmount}
          </h3>
        </div>
        <table class="ui striped table">
          <thead>
            <tr>
              <th>Debtor Name</th>
              <th>Item Name</th>
              <th>Date/Time</th>
              <th>Sale id</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Payment</th>
            </tr>
          </thead>
          {this.state.debtor_name ? (
            <>
              {this.state.SearchAccount &&
                this.state.SearchAccount.map(Account => {
                  return (
                    <tbody>
                      <tr>
                        <td>{Account.debtor_name}</td>
                        <td>{Account.pro_name}</td>
                        <td>{Account.date_time.toDate().toString()}</td>
                        <td>{Account.sale_id}</td>
                        <td> {Account.quantity} </td>
                        <td>{Account.total_price}</td>
                        <td>
                          <button
                            data-id={Account.sale_id}
                            className="btn btn-outline-danger"
                            onClick={this.getSaleId}
                          >
                            Recieve
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </>
          ) : (
            <>
              {this.state.AccountReciveable &&
                this.state.AccountReciveable.map(Account => {
                  return (
                    <tbody>
                      <tr>
                        <td>{Account.debtor_name}</td>
                        <td>{Account.pro_name}</td>
                        <td>{Account.date_time.toDate().toString()}</td>
                        <td>{Account.sale_id}</td>
                        <td> {Account.quantity} </td>
                        <td>{Account.total_price}</td>
                        <td>
                          <button
                            data-id={Account.sale_id}
                            className="btn btn-outline-danger"
                            onClick={this.getSaleId}
                          >
                            Recieve
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
