import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import { publicRequest, userRequest } from "../requestMethods";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";


export const login=async (dispatch,user)=>{
    dispatch(loginStart());
    try{
        const res=await publicRequest.post("/auth/login",user);
        dispatch(loginSuccess(res.data));
    }catch(e){
        dispatch(loginFailure());
    }
}

export const getProducts=async (dispatch)=>{
    dispatch(getProductStart());
    try{
        const res=await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    }catch(e){
        dispatch(getProductFailure());
    }
}

export const deleteProduct=async (id,dispatch)=>{
    dispatch(deleteProductStart());
    try{
        // const res=await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    }catch(e){
        dispatch(deleteProductFailure());
    }
}

export const updateProduct=async (id,product,dispatch)=>{
    dispatch(updateProductStart());
    try{
        // const res=await userRequest.delete(`/products/${id}`);
        dispatch(updateProductSuccess({id, product}));
    }catch(e){
        dispatch(updateProductFailure());
    }
}

export const addProduct=async (product,dispatch)=>{
    dispatch(addProductStart());
    // dispatch({type:addProductStart})
    try{
        const res=await userRequest.post("/products",product);
        dispatch(addProductSuccess(res.data));
        // dispatch({type:addProductSuccess, payload:res.data})
    }catch(e){
        dispatch(addProductFailure());
        // dispatch({type:addProductFailure});
    }
}