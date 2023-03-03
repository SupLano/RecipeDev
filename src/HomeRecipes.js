import  React from 'react'
import RecipeCard from './Utils/RecipeCard';
import Loading from './Utils/Loading';
import Get from './Utils/Get';

function HomeRecipes({isNavActive}) 
{
  
          const keys = ['1882448aefc44b3ea30609cdccf40951', 'b996787c904f49ba9142544aa5832a3e', 'fa37f0fee335472a906bdc5a0cb4c3a8']
          let key = keys[Math.floor((Math.random() * 3))]   
          const {data, loading} = Get({'url': `https://api.spoonacular.com/recipes/random?number=12&apiKey=${key}`, type : 'Homepage'});   

  return (
    <div className={isNavActive ? ' h-full w-full pt-16 md:pt-40 lg:pt-32 grid md:grid-cols-3 lg:grid-cols-4 md:gap-3' : 'h-full w-full pt-96 md:pt-40 lg:pt-32 grid md:grid-cols-3 lg:grid-cols-4 md:gap-3'}>
           {   
                  loading  ? <Loading/> : data.map( rec =>
                     {
     
                        return (
                           <RecipeCard key={rec.id} id={rec.id} title={rec.title} summary={rec.summary} cheap={rec.cheap} diets={rec.diets} image={rec.image} />
                               ) 
                    }
                  )
          }                 
    </div>
         )


}



export default HomeRecipes