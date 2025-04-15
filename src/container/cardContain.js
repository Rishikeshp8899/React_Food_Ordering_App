//import Carts from "../components/Carts";
import Cardss from "../components/Cardss";
import {connect} from 'react-redux'
import {addProductToCart1} from '../actions/index'
const mapStateToProps=state=>({
   // data:state.Cards
})
const mapDispatchToProps=dispatch=>({
    addToCartHandler:data=>dispatch(addToCart(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(Cardss)