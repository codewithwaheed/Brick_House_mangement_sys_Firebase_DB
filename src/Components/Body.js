import React, { Component } from "react";

class Body extends Component {
  render() {
    return (
      <div className="container-fluid">
        {/*  Search Bar */}
        {/*  #1 */}
        <div className="row mysearchbars">
          <div className="col-sm-2 col-md-2 col-lg-2 col-2"></div>
          <div className="col-sm-8 col-md-8 col-lg-8 col-8">
            <div className="input-group mb-3 mt-5">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-search search-icon"></i>
                  <span className="pl-3">Search Item :</span>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
              ></input>
            </div>
          </div>
          <div className="col-sm-2 col-md-2 col-lg-2 col-2"></div>
        </div>
        {/* End #1 */}
        {/*  #2 */}
        <div className="row mysearchbars">
          <div className="col-sm-2 col-md-2 col-lg-2 col-2"></div>
          <div className="col-sm-8 col-md-8 col-lg-8 col-8">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-tag search-icon"></i>
                  <span className="pl-3">Tags :</span>
                </span>
              </div>
              <input
                type="text"
                placeholder="# gaming   # shirt   # phone   # camera"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
              ></input>
            </div>
          </div>
          <div className="col-sm-2 col-md-2 col-lg-2 col-2"></div>
        </div>
        {/* End #2 */}
        {/*  #3 */}
        <div className="row mysearchbars">
          <div className="col-sm-2 col-md-2 col-lg-2 col-2"></div>
          <div className="col-sm-8 col-md-8 col-lg-8 col-8">
            <div className="input-group mb-5">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-filter search-icon"></i>
                  <span className="pl-3">Brand :</span>
                </span>
              </div>
              <input
                type="text"
                placeholder="# adidas   # supreme   # gopro"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
              ></input>
            </div>
          </div>
          <div className="col-sm-2 col-md-2 col-lg-2 col-2"></div>
        </div>
        {/* End #3 */}
        {/* End Search Bar */}
        <div className="row">
          <div className=" col-md-0  col-lg-0 col-xl-2 "></div>
          <div className=" col-md-6 col-lg-3 col-xl-2 ">
            <div className="box box1">
              <div className="row">
                <div className="minibox ml-5">
                  <i class="far fa-images ml-2 mt-2 fa-2x"></i>
                </div>
                <div className="minibox ml-2">
                  <i class="far fa-images ml-2 mt-2 fa-2x"></i>
                </div>
                <div className="minibox ml-2">
                  <i class="far fa-images ml-2 mt-2 fa-2x"></i>
                </div>
              </div>
              <input placeholder="Title" className="inputS"></input>
              <input placeholder="Category" className="inputS"></input>
              <input placeholder="Description" className="inputS"></input>
              <input placeholder="Shipping" className="inputS"></input>
              <input placeholder="$99.00" className="inputB"></input>
            </div>
            <button className="addtostore mt-2">
              Add to store
              <i class="fas fa-caret-down dropM"></i>
            </button>
          </div>
          <div className="col-md-6  col-lg-3 col-xl-2">
            <div className="box box1">
              <div className="row">
                <div className="minibox ml-5">
                  <i class="far fa-images ml-2 mt-2 fa-2x"></i>
                </div>
                <div className="minibox ml-2">
                  <i class="far fa-images ml-2 mt-2 fa-2x"></i>
                </div>
                <div className="minibox ml-2">
                  <i class="far fa-images ml-2 mt-2 fa-2x"></i>
                </div>
              </div>

              <input placeholder="Title" className="inputS"></input>
              <input placeholder="Category" className="inputS"></input>
              <input placeholder="Description" className="inputS"></input>
              <input placeholder="Shipping" className="inputS"></input>
              <input placeholder="$99.00" className="inputB"></input>
            </div>
            <button className="addtostore mt-2">
              Add to store
              <i class="fas fa-caret-down dropM"></i>
            </button>
          </div>
          <div className=" col-md-6  col-lg-3 col-xl-2">
            <div className="box box1">
              <div className="row">
                <div className="minibox ml-5">
                  <i class="far fa-images ml-2 mt-2 fa-2x"></i>
                </div>
                <div className="minibox ml-2">
                  <i class="far fa-images ml-2 mt-2 fa-2x"></i>
                </div>
                <div className="minibox ml-2">
                  <i class="far fa-images ml-2 mt-2 fa-2x"></i>
                </div>
              </div>
              <input placeholder="Title" className="inputS"></input>
              <input placeholder="Category" className="inputS"></input>
              <input placeholder="Description" className="inputS"></input>
              <input placeholder="Shipping" className="inputS"></input>
              <input placeholder="$99.00" className="inputB"></input>
            </div>
            <button className="addtostore mt-2">
              Add to store
              <i class="fas fa-caret-down dropM"></i>
            </button>
          </div>
          <div className=" col-md-6  col-lg-3  col-xl-2">
            <div className="box box1">
              <div className="row">
                <div className="minibox ml-5">
                  <i class="far fa-images ml-2 mt-2 fa-2x"></i>
                </div>
                <div className="minibox ml-2">
                  <i class="far fa-images ml-2 mt-2 fa-2x"></i>
                </div>
                <div className="minibox ml-2">
                  <i class="far fa-images ml-2 mt-2 fa-2x"></i>
                </div>
              </div>
              <input placeholder="Title" className="inputS"></input>
              <input placeholder="Category" className="inputS"></input>
              <input placeholder="Description" className="inputS"></input>
              <input placeholder="Shipping" className="inputS"></input>
              <input placeholder="$ 99.00" className="inputB"></input>
            </div>
            <button className="addtostore mt-2">
              Add to store
              <i class="fas fa-caret-down dropM"></i>
            </button>
          </div>
          <div className=" col-md-0 col-lg-0 col-xl-2"></div>
        </div>
      </div>
    );
  }
}

export default Body;
