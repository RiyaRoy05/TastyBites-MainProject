import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header';
import ExploreRecipe from '../../components/ExploreRecipe/ExploreRecipe';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {

  const [category,setCategory] = useState("All");

  return (
    <div>
        <Header />
        <ExploreRecipe category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <AppDownload />
    </div>
  )
}

export default Home;