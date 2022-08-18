import { createSlice } from '@reduxjs/toolkit';



const Slice = createSlice({

    name: 'overall',

    initialState: {

        products: [],
        Grandtotal: 0, // total price
        qty: 0,// total items
        loading: false,
        totalOrders: []

    },

    reducers: {
        addProduct: (state, action) => {
            if (state.products.length == 0) {

                state.products = [...state.products, action.payload],
                    state.Grandtotal += action.payload.price * action.payload.qty;  // 
                state.qty += parseInt(action.payload.qty);
            }

            else {
                let item = state.products.filter(x => x._id != action.payload._id)

                console.log('in redux ', item)
                if (item) {

                    state.products = [...item, action.payload]
                }
                else {
                    state.products = [...item, action.payload]

                }
            }

        },

        remove: (state, action) => {

            console.log('in remove ', action)
            let item = state.products.filter(x => x._id !== action.payload._id)
            state.products = [...item]

        },

        setLoading: (state, action) => {

            state.loading = action.payload.value
        },

        setTotalOrders: (state, action) => {

            state.totalOrders = action.payload
        },

        updateOrderStatus: (state, payload) => {

            let updated  = state.totalOrders.map(x => {
                if (x._id == payload._id) {
                    x.status = payload.status
                }
            })

            state.totalOrders = updated

        },
        reset: (state) => {

            state = {
                products: [],
                Grandtotal: 0,
                qty: 0,
                loading: false,
                totalOrders: []
            }

        }
    }





})


export const { addProduct, remove, setLoading, setTotalOrders,updateOrderStatus, reset } = Slice.actions;
export const myReducer = Slice.reducer;