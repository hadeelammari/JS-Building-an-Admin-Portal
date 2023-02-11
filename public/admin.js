
// Your Code Here
async function main() {

    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

    books.forEach(renderBook)
}
function renderBook(book){
    let root= document.getElementById("root")
    let listItem= document.createElement("li")
    let qtyImput= document.createElement("imput")
    let newbtn=document.createElement("button")
   
   
    listItem.innerHTML= `${book.title}`
    qtyImput.setAttribute('value',`${book.quantity}`)
   
   
   
    newbtn.addEventListener('click',()=>{
        fetch('http://localhost:3001/updateBooks',{
        method:"patch",
        Headers:{
            'content-type':'application/jason'
        },
            body: JSON.stringify({
                id:book.id,
                quantity: qtyImput.value
            })
            
        })
    })

    
    


  

    listItem.append(qtyImput,newbtn)
    root.append(listItem)
}

main()