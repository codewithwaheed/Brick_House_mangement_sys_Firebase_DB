import React, { Component } from "react";
import firebase from "firebase";
import Loading from "../Components/Loading";

export default class EmployeeAccount extends Component {
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
    employee: null,
    loading: true,
    balance: null,
    resetId: null,
    statement: null,
    statementStatus: false,
    docId: "empty",
    cnic: "",
    v_monthly_pay: "",
    v_advance: "",
    paymentRefernce: ""
  };

  getCnic = e => {
    this.setState({
      cnic: e.target.value
    });
  };
  getAccount = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    db.collection("emp_account")
      .where("cnic", "==", this.state.cnic)
      .limit(1)
      .get()
      .then(snapshot => {
        const Employee = [];
        const getid = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          const id = doc.id;
          Employee.push(data);
          getid.push(id);
        });
        const id = getid[0];
        const balance = Employee[0].balance;
        this.setState({
          employee: Employee,
          loading: false,
          balance: balance,
          docId: id
        });
      })
      .catch(error => {
        alert("oops , cant Find the Account");
      });

    console.log(this.state.statement);
    console.log(this.state.statementStatus);
  };
  componentDidUpdate() {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    db.collection("emp_account")
      .doc(this.state.docId)
      .collection("statement")
      .get()
      .then(snapshot => {
        const statement = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          statement.push(data);
        });
        this.setState({
          statement: statement
        });
      })
      .catch(error => {
        alert("oops , cant add statements");
      });
  }
  getMonthlyPay = e => {
    this.setState({
      v_monthly_pay: e.target.value
    });
  };
  getAdvance = e => {
    this.setState({
      v_advance: e.target.value
    });
  };
  getPaidRefrence = e => {
    this.setState({
      paymentRefernce: e.target.value
    });
  };
  Add = () => {
    var monthlyPay = Number(this.state.v_monthly_pay);
    var advance = Number(this.state.v_advance);
    var Entrybalance = monthlyPay - advance;
    var previousBalance = Number(this.state.balance);
    var currentBalance = previousBalance + Entrybalance;
    this.setState({
      balance: currentBalance
    });

    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    db.collection("emp_account")
      .doc(this.state.docId)
      .update({
        balance: currentBalance
      });
    if (this.state.v_advance !== "") {
      db.collection(`emp_account/${this.state.docId}/statement`).add({
        amount: this.state.v_advance,
        type: "Advance",
        date: new Date(),
        paymentRefernce: this.state.paymentRefernce
      });
    }
    if (this.state.v_monthly_pay !== "") {
      db.collection(`emp_account/${this.state.docId}/statement`).add({
        amount: this.state.v_monthly_pay,
        type: "Monthly pay",
        date: new Date(),
        paymentRefernce: this.state.paymentRefernce
      });
    }
  };
  Reset = () => {
    this.setState({
      balance: "00"
    });
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    db.collection("emp_account")
      .doc(this.state.docId)
      .update({
        balance: "00"
      });
    db.collection(`emp_account/${this.state.docId}/statement`)
      .get()
      .then(snapshot => {
        const id = [];
        snapshot.forEach(doc => {
          const getid = doc.id;
          id.push(getid);
        });
        id.map(value => {
          db.collection(`emp_account/${this.state.docId}/statement`)
            .doc(value)
            .delete();
        });
      });
  };
  render() {
    return (
      <div>
        <div className="text-center mt-2 py-4 display-4 bg-light topHeader">
          Employee Account
        </div>
        <div className=" text-center form-group py-2  mt-2 bg-light">
          <h2 className="text-secondary">Enter the Cnic of Employee</h2>
          <input
            type="text"
            onChange={this.getCnic}
            placeholder="XXXXX-XXXXXXX-X"
          ></input>
          <br></br>
          <button className="btn btn-secondary mt-2" onClick={this.getAccount}>
            Find
          </button>
        </div>
        <div className="bg-light py-3">
          <button className="btn btn-secondary btn-sm ml-3">Monthly fee</button>
          <input type="text" onChange={this.getMonthlyPay}></input>
          <lable className="btn btn-secondary btn-sm ml-3">Advance</lable>
          <input type="text" onChange={this.getAdvance}></input>
          <lable className="btn btn-secondary btn-sm ml-3">
            Paid by Refernce
          </lable>
          <input type="text" onChange={this.getPaidRefrence}></input>
          <button className="btn btn-danger ml-5" onClick={this.Add}>
            Add
          </button>
          <button
            className="btn btn-secondary "
            style={{ marginLeft: "20%" }}
            onClick={this.Reset}
          >
            Reset Account
          </button>
        </div>
        {this.state.cnic ? (
          <div className="bg-light  " style={{ height: "300px" }}>
            {this.state.loading ? (
              <Loading title="Employee Record Loading" />
            ) : (
              <div>
                {this.state.employee &&
                  this.state.employee.map(Employee => {
                    return (
                      <div>
                        <div className="text-center text-secondary display-4">
                          Details of Employee
                        </div>
                        <div className="ml-5 mt-5">
                          <div className="row">
                            <div className="col-6">
                              <h3>Cnic</h3>
                              <p>{Employee.cnic}</p>{" "}
                            </div>
                            <div className="col-6">
                              <h2>Total Balance</h2>
                              <p className="display-4">
                                {this.state.balance}
                              </p>{" "}
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-6">
                              <h3>Name</h3>
                              <p>
                                {Employee.first_name} {Employee.last_name}
                              </p>{" "}
                            </div>
                            <div className="col-6">
                              <h3>Employee type</h3>
                              <p>{Employee.employee_type}</p>{" "}
                            </div>
                          </div>
                        </div>

                        {this.state.statementStatus ? (
                          <div className=" text-center display-4">
                            Currently No Statement
                          </div>
                        ) : (
                          <div>
                            <div className="text-center text-secondary bg-light display-4">
                              Statement of Account
                            </div>
                            {this.state.statement &&
                              this.state.statement.map(Statement => {
                                return (
                                  <div className="ml-4 ">
                                    <ul class="list-group bg-light">
                                      <li class="list-group-item bg-light">
                                        Employee get {Statement.amount} as{" "}
                                        {Statement.type} from{" "}
                                        {Statement.paymentRefernce} at{" "}
                                        {Statement.date.toDate().toString()}
                                      </li>
                                    </ul>
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        ) : (
          <div
            className="bg-light text-center  display-3 "
            style={{ height: "300px" }}
          >
            <p className="pt-5">Currently no Account</p>
          </div>
        )}
      </div>
    );
  }
}
