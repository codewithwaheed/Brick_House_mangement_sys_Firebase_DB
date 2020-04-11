import React, { Component } from "react";
import firebase from "firebase";
export default class Home extends Component {
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
    employeeCount: null,
    dashData: null
  };
  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    const db = firebase.firestore();
    db.collection("dashbord")
      .limit(1)
      .get()
      .then(snapshot => {
        const DashData = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          DashData.push(data);
        });
        console.log(DashData);

        this.setState({
          dashData: DashData
        });
        console.log(this.state.dashData);
      })
      .catch(error => {
        alert("oops , cant load the dashboard recorde");
      });
    db.collection("employee")
      .get()
      .then(snapshot => {
        const Employee = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          Employee.push(data);
        });
        this.setState({
          employeeCount: Employee.length
        });
      });
  }
  render() {
    return (
      <div>
        <div className="text-center mt-2 py-4 display-4 bg-light topHeader">
          Dashboard
        </div>
        {this.state.dashData &&
          this.state.dashData.map(DashData => {
            return (
              <div className="container mt-3">
                <div className="row text-center">
                  <div className="col-md-4 dashBox box1">
                    <h3 className="py-3">Today Sale Amount</h3>
                    <p className="dashData ">
                      {DashData.todaySale} <small>pkr</small>{" "}
                    </p>
                  </div>
                  <div className="col-md-4 dashBox box2">
                    <h3 className="py-3"> This Month Sale Amount</h3>
                    <p className="dashData">
                      {DashData.monthSale} <small>pkr</small>
                    </p>
                  </div>
                  <div className="col-md-4 dashBox box3 ">
                    <h3 className="py-3">This Year Sale Amount</h3>
                    <p className="dashData">
                      {DashData.yearSale} <small>pkr</small>
                    </p>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col-md-4 dashBox box4">
                    <h3 className="py-3">Today Purchase Amount</h3>
                    <p className="dashData">
                      {DashData.todayPurchase} <small>pkr</small>
                    </p>
                  </div>
                  <div className="col-md-4 dashBox box5">
                    <h3 className="py-3"> This Month Purchase Amount</h3>
                    <p className="dashData">
                      {DashData.monthPurchase} <small>pkr</small>
                    </p>
                  </div>
                  <div className="col-md-4 dashBox box6 ">
                    <h3 className="py-3">This Year Purchase Amount</h3>
                    <p className="dashData">
                      {DashData.yearPurchase} <small>pkr</small>
                    </p>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col-md-4 dashBox box7">
                    <h3 className="py-3">Total Register Employee</h3>
                    <p className="dashData">
                      {this.state.employeeCount} <small></small>
                    </p>
                  </div>
                  <div className="col-md-4 dashBox box8">
                    <h3 className="py-3">Total Payable Amount</h3>
                    <p className="dashData">
                      {DashData.payable} <small>pkr</small>
                    </p>
                  </div>
                  <div className="col-md-4 dashBox box9 ">
                    <h3 className="py-3">Total Recievable Amount</h3>
                    <p className="dashData">
                      {DashData.recievable} <small>pkr</small>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
