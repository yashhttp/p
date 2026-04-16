import asyncHandler from '../../utils/asyncHandler.js';
import * as authService from './auth.service.js';

export const register =asyncHandler(async (req,res)=>{
    const user = await authService.registerUser(req.body);
    res.status(201).json({
        success:true,
        message:"User Registered",
        data:user
    })
});

export const login =asyncHandler(async (req,res)=>{
    const data = await authService.loginUser(req.body);
    res.status(201).json({
        success:true,
        message:"Login Successfully",
        data
    })
});
export const me =asyncHandler(async (req,res)=>{
    const user = await authService.getMe(req.user.id);
    res.status(201).json({
        success:true,
        message:"Profile get Successfully",
        data:user,
    })
});
export const logout =asyncHandler(async (req,res)=>{
    const user = await authService.getMe(req.user.id);
    
    res.status(201).json({
        success:true,
        message:"Logout  Successfully",
        
    })
});


