import React,{useState,useEffect} from 'react'
import axios from '../../api/baseurl';
import { Container, Grid , IconButton} from '@material-ui/core';
// import products from '../../DataBase/DBtest';
import Card from '../../Components/Card'



const Products = () => {

    const UserData=JSON.parse(window.localStorage.getItem("UserData"))
    const [products,setproducts]=useState(null)
    useEffect(() => {
        axios.get('http://localhost:5000/Products/')
        .then(function (response) {
            //handle success
            console.log(response.data.data);
            setproducts(response.data.data)
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }, [])
    
    // alert( JSON.stringify(UserData.userId) + ' - ' + products[0].creator)
    const DeletePost=(delete_productById)=>{
        axios.delete(`http://localhost:5000/Products/Delete`,{
            data:{
                'id':delete_productById
            },
            headers: {
                'Authorization': `Basic ${UserData.token}` 
              }
        })
        .then(function (response) {
            //handle success
            console.log(response.data.message);
            setproducts(prevproducts =>
                prevproducts.filter(post => post._id !== delete_productById)    
            )
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    return (
        <Container>
            <Grid className="BodyPages product_card_content">
                {products && products.map((item, index) => {
                    return(
                        <Card key={index} UserData={UserData} item={item} DeletePost={DeletePost}/>
                    )    
                })}
            </Grid>
        </Container>
    )
}

export default Products
