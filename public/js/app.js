//console.log('client side javascript file is loaded ')
// // then is a bigger method  API which uses promises 
// // promises and its companion Asynawait 
// fetch('http://puzzle.mead.io/puzzle').then ( (response) => {
//     response.json().then( (data) => {
//             console.log(data)

//     })


// })

// //
//Goal : Fetch Weather !
//
//1. Setup a call to fetch to fetch weatther for boston
//2. Get the parse JSON response
// -IF error Property , print error
//- If no error property, print location and forecast
// 3. Refresh the broser and test your work

// fetch('http://localhost:3000/weather?address=boston').then( (response) => { 

//     response.json().then( (data) =>{        
//         if(data.error){
//             console.log(data.error);
//     }
//     else {
//         console.log(data.locationName) 
//         console.log(data.forecast)
    
//         }
//     })
// })

const weatherForm = document.querySelector('form')

const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


//messageOne.textContent = 'From Javascript'

// Goal : Render content to paragraphs
//
//1. Select the second message p from javascript
//2. Just before fetch , render loading message and empty p,
//3. If Error , render error 
//4. Test your Work ! Search for errors and for valid location 





weatherForm.addEventListener('submit', (e) => {
            
    e.preventDefault()
            const locationName = search.value

            messageOne.textContent = 'Loading...'
            messageTwo.textContent = ''
                //local port            
          //fetch('http://localhost:3000/weather?address='+ locationName).then( (response) => { 

                //heroku port
            fetch('/weather?address='+ locationName).then( (response) => { 

    response.json().then( (data) =>{        
        if(data.error){
            messageOne.textContent = (data.error)
    }
    else {
        messageOne.textContent = (data.locationName) 
        messageTwo.textContent = (data.forecast)
    
        }
    })
})
})
//
//Goal : use input value to get weather 
// 
//1. Migrate featch call into the submit callback
//2. use the search text as the address query string value
//3. Submit the form with a valid and invalid value to test your work


