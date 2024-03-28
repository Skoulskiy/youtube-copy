import { IconButton, Paper } from '@mui/material';
import {Search} from '@mui/icons-material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [values, setValues] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(values){
      navigate(`/search/${values}`);
    }
  }
  return (
    <Paper component='form' onSubmit={handleSubmit} sx={{borderRadius: 20, border: '1px solid #e3e3e3', pl: 2, boxShadow: 'none', mr: {sm: 5}}}>
        <input className='search-bar' placeholder='Search...' value={values} onChange={(e) => {setValues(e.target.value)}}/>
        <IconButton type='submit' sx={{p: '10px', color: 'red'}}>
            <Search />
        </IconButton>
    </Paper>
  )
}

export default SearchBar