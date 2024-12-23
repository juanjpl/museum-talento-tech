
let productos= [
  {
    objectID :"",
    GalleryNumber :"",
    title:"There´s no arts saved",
    artistDisplayName :"",
    objectURL: "",
    primaryImage :"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930 "
   }
  ];


console.log("comenzando llamado de la api museum");

console.log(localStorage.getItem("productSelected"));
const productSelected = localStorage.getItem("productSelected");





const llamandoAPI = async (productSelected) => {
  try {
    const respuesta = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${productSelected}`
      
    );

    const data = await respuesta.json()  
    //console.log(data);

    

    if (data !== null) {
      productos = data;
      imprimirProducts(productos)
    } else {
      console.log("no hay proximo");
    }
      
  } catch (error) {
    console.log(error);
  }
};

llamandoAPI(productSelected);
//console.log(productos)


const imprimirTarjeta = (id)=>{
  console.log(`Quiero ver el producto: ${id}`)
  localStorage.setItem("departamentSelected",`${id}` );


}


const imprimirProducts = (data) => {

    document.getElementById("producto").innerHTML = "";

    if(!data){
        console.log("no hay datos")
    }else{
      console.log(`La imagen es ....`)
           console.log(`${data.primaryImage}`)
           
           let div = document.createElement("div");
            div.className += "card";
            div.setAttribute("id", `${data.objectID}`);
            div.innerHTML = `
            <h4>${data.objectID}</h4>
            <h4>${data.GalleryNumber}</h4>
            <h2>${data.title}</h2>
            <h3>${data.artistDisplayName}</h3>
            <p>${data.objectURL}</p>
            <img src={${data.primaryImage}==="" ? https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930 :${data.primaryImage}} alt={${data.title} ? ${data.title}: https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930} width="150" height="150" >
           <a class="btnVer" href="https://juanjpl.github.io/museum-talento-tech/pages/cart/cart.html" onClick={imprimirTarjeta(${data.objectID})} >Agregar</a>
            `;

            //{${data.primaryImage} ? ${data.primaryImage}: https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930}
            
            
            document.getElementById("producto").appendChild(div);

     
         

        
    }

 

};

imprimirProducts(productos)