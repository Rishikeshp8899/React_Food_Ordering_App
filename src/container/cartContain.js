//import Carts from "../components/Carts";
import Carts from "../components/Carts";
import {connect} from 'react-redux'
import {addProductToCart1} from '../actions/index'
const mapStateToProps=state=>({
    data:state.Cards
})
const mapDispatchToProps=dispatch=>({
})
export default connect(mapStateToProps,mapDispatchToProps)(Carts)