import React,{useState,useEffect,useContext} from 'react'
import axios from '../../api/baseurl';
import { Container, Grid ,Button,Box , IconButton} from '@material-ui/core';
import { useParams } from 'react-router';
// import products from '../../DataBase/DBtest';
import Card from '../../Components/Card'
import {Favorite , LocalMall , LocalOffer , AttachMoney , EventAvailable} from '@material-ui/icons';
import MyBag from '../MyBag/MyBag'
import {DataContext} from '../../GlobalState/DataContext'


const Products = ({match}) => {

    const globaldata = useContext(DataContext)
    const UserData=JSON.parse(window.localStorage.getItem("UserData"))
    const [products,setproducts]=useState(null)
    const ProductByCat=useParams().cat
    const ProductByCatItem=useParams().catitem
    const [loading, setloading] = useState(false)
    const [bag , setbag]=useState(false)
    let bag_number

    const filterlist = [{
        title:'محبوب ترین',
        icon:<Favorite/>,
    },{
        title:'پر فروش ترین',
        icon:<LocalMall/>,
    },{
        title:'جدیدترین',
        icon:<EventAvailable/>,
    },{
        title:'ارزان ترین',
        icon:<LocalOffer/>,
    },{
        title:'گران ترین',
        icon:<AttachMoney/>,
    }]

    // const ProductByCat= match.params ? match.params.cat: null
    // const ProductByCatItem= match.params ? match.params.catitem : null

    // console.log(ProductByCat+' - '+ProductByCatItem + ' - '+JSON.stringify(match.params))
    
    useEffect(() => {
        if(ProductByCatItem){
            ShowProductsByCatItem()
        }
        else if(ProductByCat){
            ShowProductsByCat()
        }
        else if (ProductByCatItem === ProductByCat) {
            ShowAllProducts()
        }
        else{
            ShowAllProducts()
        }
    }, [ProductByCatItem , ProductByCat])

    const ShowProductsByCatItem=()=>{
        axios.post(`http://localhost:5000/Products/searchbycatitem`,{'catitem':ProductByCatItem})
        .then(function (response) {
            //handle success
            setproducts(response.data.data)
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }
    const ShowProductsByCat=()=>{
        axios.post(`http://localhost:5000/Products/searchbycat`,{'cat':ProductByCat})
        .then(function (response) {
            //handle success
            setproducts(response.data.data)
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }
    const ShowAllProducts=()=>{
        axios.get('http://localhost:5000/Products')
        .then(function (response) {
            //handle success
            setproducts(response.data.data)
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }
    
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

    const AddToBag=(id,count,price)=>{
        axios.post(`http://localhost:5000/Sale/Add`,{
            'userId':UserData.userId,
            'productId':id,
            'count':count,
            'price':price
        })
        .then(function (response) {
            //handle success
            // console.log(response.data.data.orderItems.length+" <<<")
            // bag_number=response.data.data.orderItems.length
            globaldata.mybag()
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }
const openbag=()=>{
    setbag(true)
}
    return (
        <Container className='BodyPages'>
            <ul className='filterbox'>
                {filterlist && filterlist.length>0 && filterlist.map((item , index)=>
                   <li>
                        <Button variant="outlined" color="secondary" key={index} onClick={()=>openbag()}>
                            {item.icon}
                            {item.title}
                        </Button>
                   </li>
                )}
            </ul>
            <Grid container className=" product_card_content">
                {products && products.map((item, index) => {
                    return(
                        <Card key={index} 
                            UserData={UserData} 
                            item={item} 
                            DeletePost={DeletePost} 
                            AddToBag={AddToBag} 
                            loading={loading}
                            />
                    )    
                })}
            </Grid>
            {bag && <MyBag show={bag} close={()=>setbag(false)}/>}
        </Container>
    )
}

export default Products
