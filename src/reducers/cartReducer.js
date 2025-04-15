// import { createSlice } from "@reduxjs/toolkit";


// const cartValue = []
// let itemList=[]
// let coupenTwo=1;
// let coupenThee=1;

// export const cartReducer=createSlice({
//     name:'userCart',
//     initialState:{value:cartValue},
//     reducers:{
//         addItems:(state,action)=>{

//               state.value.push(action.payload);
//               const removeDupliactes = (values) => {
//                 let concatArray = values.map(eachValue => {
//                   return Object.values(eachValue).join('')
//                 })
//                 let filterValues = values.filter((value, index) => {
//                   return concatArray.indexOf(concatArray[index]) === index
              
//                 })
//                 return filterValues
//               }
//               state.value=removeDupliactes(state.value)
//         },
//         removeItems:(state,action)=>{
//           state.value = state.value.filter((userCart) => userCart.name !== action.payload.name);

//         },
//         offerItem:(state,action)=>{
//           if (coupenTwo===1) {
//             state.value.map((user)=>{user.value=parseInt(user.value-(user.value*20/100))});
//             coupenTwo=coupenTwo - 1;
//           }
//         },
//         offerItemTwo:(state,action)=>{
//           if (coupenThee===1) {
//             state.value.map((user)=>{user.value=parseInt(user.value-(user.value*10/100))});
//             coupenThee=coupenThee - 1;
            
//           }
//         },
//         offerItemTwo:(state,action)=>{
//           if (coupenThee===1) {
//             state.value.map((user)=>{user.value=parseInt(user.value-(user.value*10/100))});
//             coupenThee=coupenThee - 1;
            
//           }
//         },
//         addQuntity:(state,action)=>{
//      state.value= state.value.map((user)=>{
//             if (user.name===action.payload.name) {
//               user.quantity=user.quantity+1;
//             }
//         })},
//         substractQuntity:(state,action)=>{
//        state.value= state.value.map((user)=>{
//             if (user.name===action.payload.name) {
//               user.value=user.value-1;
//             }
//         })
//         },
//         emptyState:(state,action)=>{
//           state.value = state.value.filter((userCart) => userCart.id !== action.payload.id);

//         }
        
    
//     }
// });

// export const{addItems,removeItems,offerItem,offerItemTwo,addQuntity,substractQuntity,emptyState}=cartReducer.actions;
// export default cartReducer.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  couponTwo: 1,
  couponThree: 1
};

export const cartReducer = createSlice({
  name: 'userCart',
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.value.push(action.payload);
      const removeDuplicates = (items) => {
        const unique = items.filter((item, index, self) =>
          index === self.findIndex((t) => (
            JSON.stringify(t) === JSON.stringify(item)
          ))
        );
        return unique;
      };
      state.value = removeDuplicates(state.value);
    },

    removeItems: (state, action) => {
      state.value = state.value.filter(item => item.name !== action.payload.name);
    },

    offerItem: (state) => {
      if (state.couponTwo === 1) {
        state.value = state.value.map(item => ({
          ...item,
          value: parseInt(item.value - (item.value * 20 / 100))
        }));
        state.couponTwo--;
      }
    },

    offerItemTwo: (state) => {
      if (state.couponThree === 1) {
        state.value = state.value.map(item => ({
          ...item,
          value: parseInt(item.value - (item.value * 10 / 100))
        }));
        state.couponThree--;
      }
    },

    addQuantity: (state, action) => {
      console.log(action.payload)
      state.value.forEach(item=>{
       
        if(item.name === action.payload){
          item.quantity += 1
        }
      })
    },

    subtractQuantity: (state, action) => {
      state.value.forEach(item=>{
      
        if(item.name === action.payload){
          if(item.quantity===0)
            item.quantity=0
          else{
            item.quantity -= 1
          }
          
        }
      })
    },

    emptyState: (state, action) => {
      if(action.payload===1){
 state.value =[];
      }
       
    }
  }
});

export const {
  addItems,
  removeItems,
  offerItem,
  offerItemTwo,
  addQuantity,
  subtractQuantity,
  emptyState
} = cartReducer.actions;

export default cartReducer.reducer;
