import React from "react";
import axios from "axios";
import "./bag.css";
export default class Bag extends React.Component {
    constructor(props) {
        super(props);
        // this.url="";
        this.state = {
            data: [],
            images: [],
            specs: []
        }
    }

    getProductfromcart = async () => {
        const response = await axios
            .get(
                "https://borderfree-api-backend.herokuapp.com/cart/products"
            )
            .then((res) => {
                // console.log(res.data);
                return res.data;

            })
            .catch((err) => console.log(err));
        console.log(response);
        if (response.length > 0) {
            this.setState(
                {
                    data: response[0],
                    images: response[0].images,
                    specs: response[0].specs
                })
                console.log(this.state.data);
        }
        
        // this.setState({data:response,images:response.images,specs:response.specs})
        // console.log(this.state.images);
    }

    async componentDidMount() {
        await this.getProductfromcart();
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
                    {this.state.data.length == 0 ? (
                        <div><h3>Bag Empty</h3></div>) : (
                        <div className="row">
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12 thumbnail">
                            <img src={`${this.state.images[0]}`} alt="Responsive image"/>
                            </div>
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12 details">
                            <h4>Order Details</h4>
                            <p>{this.state.data.name}</p>
                            <p>{this.state.data.color}</p>
                            <p>{this.state.data.price}</p>
                            <hr/>
                            <p>Total:{this.state.data.price}</p>
                            </div>
                        </div>)}
                </div>
            </>
        )


    }
}