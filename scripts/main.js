"use strict"

const apiUrl = 'https://jsonplaceholder.typicode.com/photos'



async function doFetch(url){
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("https error! Status: $(response.status)")
        }
        const data = await response.json();
        console.log(data);
     } catch (error) {
        console.error("error during fetch:", error.message);
     }
    
}

doFetch(apiUrl);