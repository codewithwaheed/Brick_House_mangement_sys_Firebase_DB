import React, { Component } from "react";
import firebase from "firebase";

export default class NewEmployee extends Component {
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
    stateOfRecord: true,
    first_name: "",
    last_name: "",
    cnic: "",
    dob: "",
    contact_no: "",
    age: "",
    employee_type: "",
    join_date: null,
    balance: "00",
    v_first_name: "",
    v_last_name: "",
    v_cnic: "",
    v_dob: "",
    v_contact_no: "",
    v_age: "",
    v_employee_type: "",
    validation: false
  };
  getFirstName = e => {
    this.setState({
      v_first_name: e.target.value
    });
  };
  getLastName = e => {
    this.setState({
      v_last_name: e.target.value
    });
  };
  getCnic = e => {
    this.setState({
      v_cnic: e.target.value
    });
  };
  getDOB = e => {
    this.setState({
      v_dob: e.target.value
    });
  };
  getContactNo = e => {
    this.setState({
      v_contact_no: e.target.value
    });
  };
  getAge = e => {
    this.setState({
      v_age: e.target.value
    });
  };
  getEmployeeType = e => {
    this.setState({
      v_employee_type: e.target.value
    });
  };
  AddValues = () => {
    if (
      this.state.v_cnic === "" ||
      this.state.v_first_name === "" ||
      this.state.v_last_name === "" ||
      this.state.v_dob == "" ||
      this.state.v_contact_no === "" ||
      this.state.v_employee_type === ""
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
    const first_name = this.state.v_first_name;
    const last_name = this.state.v_last_name;
    const cnic = this.state.v_cnic;
    const dob = this.state.v_dob;
    const contact_no = this.state.v_contact_no;
    const age = this.state.v_age;
    const employee_type = this.state.v_employee_type;
    const balance = this.state.balance;
    db.collection("employee").add({
      first_name: first_name,
      last_name: last_name,
      cnic: cnic,
      dob: dob,
      contact_no: contact_no,
      age: age,
      employee_type: employee_type,
      join_date: new Date()
    });
    db.collection("emp_account").add({
      first_name: first_name,
      last_name: last_name,
      cnic: cnic,
      employee_type: employee_type,
      balance: balance
    });
    this.setState({
      stateOfRecord: false
    });
    setTimeout(function() {
      window.location.reload();
    }, 4000);
  };

  render() {
    return (
      <div>
        <div className="text-center mt-2 display-4 bg-light topHeader">
          Employee Registration
        </div>
        <form>
          <div className="from-row">
            <div className="col-md-3 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">First Name</label>
              <input
                type="text"
                onChange={this.getFirstName}
                placeholder="eg. Ali"
                className="form-control"
                id="validationDefault22"
                required
              />
            </div>
            <div className="col-md-3 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">Last Name</label>
              <input
                type="text"
                onChange={this.getLastName}
                placeholder="eg. Raza"
                className="form-control"
                id="validationDefault22"
                required
              />
            </div>
            <div className="col-md-4 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefaultUsername22">Cnic</label>
              <input
                type="text"
                onChange={this.getCnic}
                placeholder="xxxxx-xxxxxxx-x"
                className="form-control"
                id="validationDefaultUsername22"
                aria-describedby="inputGroupPrepend23"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-2 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">Date of Birth</label>
              <input
                type="text"
                onChange={this.getDOB}
                placeholder="dd-mm-yyyy"
                className="form-control"
                id="validationDefault22"
                required
              />
            </div>
            <div className="col-md-2 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">Contact no</label>
              <input
                type="text"
                onChange={this.getContactNo}
                className="form-control"
                id="validationDefault22"
                required
              />
            </div>
            <div className="col-md-2 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">Age</label>
              <input
                type="text"
                onChange={this.getAge}
                className="form-control"
                id="validationDefault22"
                required
              />
            </div>
            <div className="col-md-2 ml-3 mb-3 mb-form">
              <p>Employee Type </p>
              <input
                type="radio"
                name="employeeType"
                id="A"
                value="A"
                onChange={this.getEmployeeType}
              ></input>
              <label for="A">A</label>
              <input
                className="ml-2"
                type="radio"
                name="employeeType"
                id="B"
                value="B"
                onChange={this.getEmployeeType}
              ></input>
              <label for="B">B</label>
              <input
                className="ml-2"
                type="radio"
                name="employeeType"
                id="C"
                value="C"
                onChange={this.getEmployeeType}
              ></input>
              <label for="C">C</label>
              <input
                className="ml-2"
                type="radio"
                name="employeeType"
                id="D"
                value="D"
                onChange={this.getEmployeeType}
              ></input>
              <label for="D">D</label>
              <input
                className="ml-2"
                type="radio"
                name="employeeType"
                id="E"
                value="E"
                onChange={this.getEmployeeType}
              ></input>
              <label for="E">E</label>
              <input
                className="ml-2"
                type="radio"
                name="employeeType"
                id="F"
                value="F"
                onChange={this.getEmployeeType}
              ></input>
              <label for="F">F</label>
            </div>
          </div>
        </form>
        <div className=" text-center">
          {this.state.validation ? <p className="text-danger">You must fill all the values</p> : <></>}
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
