import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";

export default class Employee extends Component {
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
    accountCnic: "",
    AccountdocId: "empty",
    RecorddocId: "empty",
    searchEmployee: null,
    Search: "",
    SearchStatus: false,
    deleteStatus: false,
    delete: "",
    loding: true,
    employee_type: "A",
    colorA: true,
    colorB: false,
    colorC: false,
    colorD: false,
    colorE: false,
    colorF: false
  };
  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    db.collection("employee")
      .where("employee_type", "==", this.state.employee_type)
      .get()
      .then(snapshot => {
        const Employee = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          Employee.push(data);
        });
        this.setState({
          employee: Employee
        });
      })
      .catch(error => {
        alert("oops , cant load the Employee Record");
      });
  }
  componentDidUpdate() {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    db.collection("employee")
      .where("employee_type", "==", this.state.employee_type)
      .get()
      .then(snapshot => {
        const Employee = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          Employee.push(data);
        });
        this.setState({
          employee: Employee
        });
      })
      .catch(error => {
        alert("oops , cant load the Employee Record");
      });

    if (this.state.RecorddocId !== "empty") {
      db.collection("employee")
        .doc(this.state.RecorddocId)
        .delete();

      db.collection("emp_account")
        .doc(this.state.AccountdocId)
        .delete()
        .then(alert("Record is deleted Successfully"));
    }
  }
  RetriveA = () => {
    this.setState({
      colorA: true,
      colorB: false,
      colorC: false,
      colorD: false,
      colorE: false,
      colorF: false,
      employee_type: "A"
    });
  };
  RetriveB = () => {
    this.setState({
      colorA: false,
      colorB: true,
      colorC: false,
      colorD: false,
      colorE: false,
      colorF: false,
      employee_type: "B"
    });
  };
  RetriveC = () => {
    this.setState({
      colorA: false,
      colorB: false,
      colorC: true,
      colorD: false,
      colorE: false,
      colorF: false,
      employee_type: "C"
    });
  };
  RetriveD = () => {
    this.setState({
      colorA: false,
      colorB: false,
      colorC: false,
      colorD: true,
      colorE: false,
      colorF: false,
      employee_type: "D"
    });
  };
  RetriveE = () => {
    this.setState({
      colorA: false,
      colorB: false,
      colorC: false,
      colorD: false,
      colorE: true,
      colorF: false,
      employee_type: "E"
    });
  };
  RetriveF = () => {
    this.setState({
      colorA: false,
      colorB: false,
      colorC: false,
      colorD: false,
      colorE: false,
      colorF: true,
      employee_type: "F"
    });
  };
  SearchActive = () => {
    if (this.state.SearchStatus === false)
      this.setState({
        SearchStatus: true
      });
    if (this.state.SearchStatus === true)
      this.setState({
        SearchStatus: false
      });
  };
  getAccountCnic = cnic => {
    this.setState({
      accountCnic: cnic
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
    db.collection("employee")
      .where("cnic", "==", this.state.Search)
      .limit(1)
      .get()
      .then(snapshot => {
        const Employee = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          Employee.push(data);
        });
        this.setState({
          searchEmployee: Employee,
          
      })})
      .catch(error => {
        alert("oops , cant load the Employee Record");
      });
      this.setState({
        loading:false
      })
  }
  deleteActive = () => {
    if (this.state.deleteStatus === false)
      this.setState({
        deleteStatus: true
      });
    if (this.state.deleteStatus === true)
      this.setState({
        deleteStatus: false
      });
  };
  getDeleteKeyword = e => {
    this.setState({
      delete: e.target.value
    });
  };
  Delete = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    db.collection("emp_account")
      .where("cnic", "==", this.state.delete)
      .limit(1)
      .get()
      .then(snapshot => {
        const getid = [];
        snapshot.forEach(doc => {
          const id = doc.id;
          getid.push(id);
        });
        const id = getid[0];
        this.setState({
          AccountdocId: id
        });
        console.log(this.state.AccountdocId);
      })
      .catch(error => {
        alert("oops , cant Find the Account");
      });
    db.collection("employee")
      .where("cnic", "==", this.state.delete)
      .limit(1)
      .get()
      .then(snapshot => {
        const getid = [];
        snapshot.forEach(doc => {
          const id = doc.id;
          getid.push(id);
        });
        const id = getid[0];
        this.setState({
          RecorddocId: id
        });
      })
      .catch(error => {
        alert("oops , cant Find the Account");
      });
  };
  render() {
    return (
      <div>
        <div className="text-center mt-2 py-3 display-4 bg-light topHeader">
          Employee Record
        </div>
        <button
          className={
            this.state.colorA
              ? "btn btn-danger mt-2 ml-2"
              : "btn btn-secondary mt-2 ml-2"
          }
          onClick={this.RetriveA}
        >
          Type A
        </button>
        <button
          className={
            this.state.colorB
              ? "btn btn-danger mt-2 ml-2"
              : "btn btn-secondary mt-2 ml-2"
          }
          onClick={this.RetriveB}
        >
          Type B
        </button>
        <button
          className={
            this.state.colorC
              ? "btn btn-danger mt-2 ml-2"
              : "btn btn-secondary mt-2 ml-2"
          }
          onClick={this.RetriveC}
        >
          Type C
        </button>
        <button
          className={
            this.state.colorD
              ? "btn btn-danger mt-2 ml-2"
              : "btn btn-secondary mt-2 ml-2"
          }
          onClick={this.RetriveD}
        >
          Type D
        </button>
        <button
          className={
            this.state.colorE
              ? "btn btn-danger mt-2 ml-2"
              : "btn btn-secondary mt-2 ml-2"
          }
          onClick={this.RetriveE}
        >
          Type E
        </button>
        <button
          className={
            this.state.colorF
              ? "btn btn-danger mt-2 ml-2"
              : "btn btn-secondary mt-2 ml-2"
          }
          onClick={this.RetriveF}
        >
          Type F
        </button>
        <Link to="/newEmployee">
          {" "}
          <button className="btn btn-secondary  mt-2 ml-2">
            <i className="plus icon"></i>Add
          </button>{" "}
        </Link>
        <button
          className="btn btn-secondary  mt-2 ml-2"
          onClick={this.deleteActive}
        >
          <i className="delete icon"></i>Delete
        </button>
        <button
          className="btn btn-secondary mt-2 ml-2"
          onClick={this.SearchActive}
        >
          Search
        </button>
        <div className="mt-2">
          {this.state.deleteStatus ? (
            <div>
              <label className="btn btn-secondary btn-sm">Employee cnic</label>
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
              <label className="btn btn-secondary btn-sm">Employee cnic</label>
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
              <th>Cnic</th>
              <th>Employee Name</th>
              <th>Employee Type</th>
              <th>Contact number</th>
              <th>Joining Date</th>
              <th>Age</th>
          <th>Date of Birth</th>
            </tr>
          </thead>
          {this.state.Search ? (
            <>
             
                 {this.state.searchEmployee &&
                    this.state.searchEmployee.map(Employee => {
                      return (
                        <tbody>
                          <tr>
                            <td> {Employee.cnic}</td>
                            <td>
                              {Employee.first_name} {Employee.last_name}
                            </td>
                            <td>{Employee.employee_type}</td>
                            <td> {Employee.contact_no}</td>
                            <td>{Employee.join_date.toDate().toString()}</td>
                            <td>{Employee.age}</td>
                            <td>{Employee.dob}</td>
                          </tr>
                        </tbody>
                      );
                    })}
                
            </>
          ) : (
            <>
              {this.state.employee &&
                this.state.employee.map(Employee => {
                  return (
                    <tbody>
                      <tr>
                        <td> {Employee.cnic}</td>
                        <td>
                          {Employee.first_name} {Employee.last_name}
                        </td>
                        <td>{Employee.employee_type}</td>
                        <td> {Employee.contact_no}</td>
                        <td>{Employee.join_date.toDate().toString()}</td>
                        <td>{Employee.age}</td>
                        <td>{Employee.dob}</td>
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
