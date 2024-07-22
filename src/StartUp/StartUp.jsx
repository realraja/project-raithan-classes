"use client";
import { checkAdmin } from '@/redux/actions/adminActions';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const StartUp = ({children}) => {

    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(checkAdmin());
    }, [dispatch]);
  return (
    <>
      {children}
    </>
  )
}

export default StartUp
