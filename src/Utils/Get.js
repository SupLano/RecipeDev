import { useState, useEffect } from 'react'

function Get({ url, type,}) {
  const [reciept, setReciept] = useState({'data' : null, 'loading' : true})
  const savedRecipes = localStorage.getItem("Recipes");

  useEffect( () =>  {       
                            switch(type) {
                                case 'Homepage':
                                    if (savedRecipes) 
                                    { 
                                                    console.log("Reading Old Fetch")
                                                    const Recipe = JSON.parse(savedRecipes);                            
                                                    setReciept({'data': Recipe, 'loading': false})
                                    }
            
                                    else 
                                    {
                                         
                                            console.log('Getting New Fetch For Homepage')
                                            const response = fetch(url) 
                                            .then( res=> res.json()  )
                                            .then(
                                                res=>
                                                {
                                                if (res.recipes){
                                                    setReciept({'data': res.recipes, 'loading': false})
                                                    localStorage.setItem("Recipes", JSON.stringify(res.recipes))
                                                }
                                                }
                                            )
                                         
                                            
                                    }    
                                            
                                break;

                                case "Id":
                                      
                                        console.log('Getting New Fetch By Recipe' + url )
                                        const res = fetch(url) 
                                        .then( res=> res.json() )
                                        .then(
                                            result=>
                                            {    
                                                console.log(result)                                            
                                                setReciept({'data': result,'loading': false})
                                                console.log(reciept);                                                    
                                            }
                                        )
                                                                                
                                      
                                break;
    
                                case "Page":
                                
                                        console.log('Getting New Fetch for Page')
                                        const response = fetch(url) 
                                        .then( res=> res.json()  )
                                        .then(
                                            res=>
                                            {
                                                console.log(res)
                                            if (res.results){
                                                console.log(res.results)
                                                setReciept({'data': res.results, 'loading': false})
                                                console.log(reciept);
                                            }
                                            }
                                        )
                                    
                                break;
                                default:                               
                            }
                        
                            
            
  }, [type,url])
  
  return reciept
}



export default Get