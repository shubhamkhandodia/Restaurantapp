import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import React from 'react'
import Loading from './LoadingComponent'
import baseUrl from '../shared/baseUrl';

function RenderMenuItem({ dish, onSelect }) {
    return (
        <Card>
            <Link to = {`/menu/${dish.id}`} >
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

const Menu = (props) => {

    const menu = props.mydishes.map((dish) => {
        return (
            <div className="col-12 col-md-5 m-1"  key={dish.id}>
                    <RenderMenuItem dish={dish} onSelect={props.onSelect} />
                </div>
        );
    });

    if(props.mydishes.isLoading)
    {
        return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>  
                </div>
            );
    }
    else if(props.mydishes.errmess)
    {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.mydishes.errmess}</h4>
                </div>  
            </div>
        );
    }
    else
    {
        return (
            <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                </div>
        );
    }
    
}

export default Menu