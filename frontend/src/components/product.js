import { message } from 'antd';
import React from "react";
import { Link } from "react-router-dom";
// import Header from "./header";
import axios from "axios";
import "./product.css";

export default class Product extends React.Component {
    constructor(props){
        super(props);
        // this.url="";
        this.state={
          data: [],
          images:[],
          specs:[]
        }
    }
    
    addToBag = async () => {
        await axios
            .post(
                "https://borderfree-api-backend.herokuapp.com/cart/products",
                {
                    prodid:"PRD00"
                }
            )
            .then((res) => {
                // console.log(res);
                message.success("Added to Bag");
            })
            .catch((err) => console.log(err));
    }

    getProduct = async () => {
        const response = await axios
            .get(
                "https://borderfree-api-backend.herokuapp.com/product/PRD00"
            )
            .then((res) => {
                // console.log(res);
                return res.data;
                
            })
            .catch((err) => console.log(err));
        this.setState({data:response,images:response.images,specs:response.specs})
        // console.log(this.state.images);
    }

    async componentDidMount() {
        await this.getProduct();
    }

    render() {
        return (
            <>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">MyCart</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link" aria-current="page" href="#">Men</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Women</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link">Kids</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container pt-2">
                    <div className="row">
                        <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={`${this.state.images[0]}`} className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={`${this.state.images[1]}`} className="d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src={`${this.state.images[2]}`} class="d-block w-100" alt="..." />
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-md-6 col-sm-12 details">
                            <h2>{this.state.data.name}</h2>
                            <h4>Men Purple Cotton Handcrafted Mandarin Collar T-shirt</h4>
                            <hr />
                            <h3>Rs.{this.state.data.price}</h3>
                            <div className="d-flex flex-row pt-2">
                                <button type="button" onClick={this.addToBag} className="btn btn-secondary">Add to Bag</button>
                                <Link to="/bag">
                                    <button type="button" className="btn btn-secondary">Go to Bag</button>
                                </Link>
                            </div>
                            <hr />
                            <div>
                                <h4>Product Details</h4>
                                <p>{this.state.specs[0]}</p>
                                <p>{this.state.specs[1]}</p>
                                <p>{this.state.specs[2]}</p>
                                <p>{this.state.specs[3]}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}