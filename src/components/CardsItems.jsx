import React from 'react';
import '../css/cards.css';
import { useSelector, useDispatch } from "react-redux";
import { addItems } from '../reducers/cartReducer';
import { useEffect, useState ,emptyState} from 'react';
import axios from 'axios';
import checkAuthAndRedirect from '../utils/urls'
import {  useNavigate } from 'react-router-dom';

export default function CardsItems({ num }) {
    const dispatch = useDispatch();
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token'); ;
    const cartItems = useSelector((state) => state.cart.value);
    const navigate = useNavigate();

    useEffect(() => {
        
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/richim/products/by-category/${num}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                if (response.status === 200) {
                    const formattedProducts = response.data.map(item => ({
                        id: item.product.id,
                        name: item.product.name,
                        amount: item.product.amount,
                        image: item.image
                    }));
                    setProductList(formattedProducts);
                } else {
                    console.error("Error fetching ", response);
                    setError("Failed to fetch products");
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        checkAuthAndRedirect(navigate)
            fetchProducts();
    }, [token, num]);

    if (!productList.length) return <div>No products found</div>;

    return (
        <div className='cardsk'>
            {productList.map(product => (
                <div id='uyt'  className="col-xs-18 col-sm-6 col-md-3" style={{ width: '27%', margin: '1%' }}>
                    <div className="thumbnail">
                        <img 
                            style={{ width: '85%', margin: '2%', padding: '2px' }} 
                            src={`data:image/jpeg;base64,${product.image}`} 
                            alt={product.name} 
                        />
                        <div className="caption" style={{ background: '#c88d53', color: 'mintcream' }}>
                            <h3 style={{ color: 'brown' }}>{product.name}</h3>
                            <p>{product.amount} ₹</p>
                            <p>
                                <button id="#butt1"
                                    onClick={() => dispatch(addItems({
                                        img:product.image,
                                        name: product.name,
                                    price: parseInt(product.amount),
                                        quantity: 1
                                    }))}
                                    className="add-to-cart-btn"
                                >
                                    ADD TO CART
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}