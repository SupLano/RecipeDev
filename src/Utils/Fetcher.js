import { useState, useEffect } from 'react'

function Fetcher({type, ID,pageType, Input}) {

    const keys = [
        "1882448aefc44b3ea30609cdccf40951",
        "30a751e2874b43f1ad3ecaee77f90358",
        "0196cdecde9e4bc9b480c4aa600c5da0",
        "745e795c3f0c4208bca68eb1cee6b5cc",
        "dace1d4c4a18413aaae4c957cd7c06da",
        "281e19f37bff48b6a40aebba8c5c3daa",
        "0888534ce1d745669ac10e33a796231b",
        "9ec50c8497ff444ebc23caff064ecb84",
        "2d2179c4d6a84cecb45f33eb7c7a7fcd",
        "ab2ba4413ae64f3983f87fae07bf602d",
        "67f51a29ba7d4d17a05abfe0cd981d80",
        "b996787c904f49ba9142544aa5832a3e",
        "bdd064e1a1d64716b37ff9b6368a03ad",
        "c192100da37d45f7a623175aa6541583",
        "8b9f348c4c774156b9e7c50e428c7ca4",
        "b63ef92116bd4190bef73a4889f032d9",
        "cff3befae479438f8f9dfffcbe5be535",
        "a20b5632aa8d489e82a17c2b6b5c57b9",
        "bdd064e1a1d64716b37ff9b6368a03ad",
        "ebf26298c85c4ab9a16fdcd10992f311",
        "fa37f0fee335472a906bdc5a0cb4c3a8",
      ];
    let key = keys[Math.floor(Math.random() * 20)];

  const [reciept, setReciept] = useState({'data' : null, 'loading' : true})
  const savedRecipes = localStorage.getItem("Recipes");

  useEffect( () =>  {       
                            switch(type) {
                                case 'Homepage':
                                    if (savedRecipes) 
                                    {                                                     
                                                    const Recipe = JSON.parse(savedRecipes);                            
                                                    setReciept({'data': Recipe, 'loading': false})
                                    }
            
                                    else 
                                    {                                                                                     
                                            const response  = fetch(`https://api.spoonacular.com/recipes/random?number=24&apiKey=${key}`) 
                                            .then( response => response.json()  )
                                            .then(
                                                response =>
                                                {
                                                if (response.recipes){
                                                    setReciept({'data': response.recipes, 'loading': false})
                                                    localStorage.setItem("Recipes", JSON.stringify(response.recipes))
                                                }
                                                }
                                            )
                                         
                                            
                                    }    
                                            
                                break;

                                case "Id":                                                                          
                                        const res = fetch(`https://api.spoonacular.com/recipes/${ID}/information?includeNutrition=true&apiKey=${key}`) 
                                        .then( res=> res.json() )
                                        .then(
                                            result=>
                                            {                                                                                            
                                                setReciept({'data': result,'loading': false})                                                                                                 
                                            }
                                        )
                                                                                
                                      
                                break;


                                case "Search":                                                                      
                                        const search = fetch(`https://api.spoonacular.com/recipes/autocomplete?number=10&query=${Input}&apiKey=${key}`) 
                                        .then( res=> res.json() )
                                        .then(res=>
                                            {                                                    
                                                setReciept({'data': res})                                                                                                  
                                            }
                                        )
                                                                                
                                      
                                break;
    
                                case "Page":                                        
                                        const response = fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${pageType}&number=24&apiKey=${key}`) 
                                        .then( res=> res.json()  )
                                        .then(
                                            res=>
                                            {
                                            if (res.results){                                                
                                                setReciept({'data': res.results, 'loading': false})                                    
                                            }
                                            }
                                        )
                                    
                                break;
                                default:                               
                            }
                        
                            
            
  }, [type, ID, pageType, Input])
  
  return reciept
}



export default Fetcher