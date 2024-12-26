let productos=[];

//console.log(productos)
console.log("Estamos imprimiendo los articulos del departamento seleccionado");
console.log(localStorage.getItem("departamentSelected"));
const departamentSelected = parseInt(localStorage.getItem("departamentSelected"));

let pagination = [ ]
let pagina = 1;

function next(page_number) {
  if (pagina < productos.length / 3) {
    pagina += page_number;
    console.log(pagina);
    let prod = productos.slice((pagina - 1) * 6, pagina * 6);
    document.getElementById("productos").innerHTML = "";

    imprimirProducts(prod);
  }
}

function prev(page_number) {
  if (pagina > 1) {
    pagina -= page_number;
    console.log(pagina);
    let prod = productos.slice((pagina - 1) * 6, pagina * 6);
    //console.log(prod)

    document.getElementById("productos").innerHTML = "";
    imprimirProducts(prod);
  }
}

const imprimirTarjeta = (id)=>{
  console.log(`Quiero ver el producto: ${id}`)
  localStorage.setItem("productSelected",`${id}` ); 
}

const imprimirProducts = (data) => {

    document.getElementById("productos").innerHTML = "";
    document.getElementById("next").innerHTML = "";
    document.getElementById("prev").innerHTML = "";

    if(data.length === 0){
        console.log("no hay datos");
        let loader = document.createElement("div");
        loader.className += "loader";
        document.getElementById("productos").appendChild(loader);
        console.log(loader);
    }else{

      let nextbutton = document.createElement("span");
      nextbutton.innerText="Next"
      nextbutton.onclick="next(1)"
      document.getElementById("next").appendChild(nextbutton)

      let prevbutton = document.createElement("span");
      prevbutton.innerText="Prev"
      prevbutton.onclick="prev(1)"
      document.getElementById("prev").appendChild(prevbutton)

      console.log(nextbutton)
        for (let i = 0; i < data.length; i++) {
        
         
            let div = document.createElement("div");
            div.className += "card";
            div.setAttribute("id", `${data[i].objectID}`);
            div.innerHTML = `
            <h4>${data[i].objectID}</h4>
            <h4>${data[i].GalleryNumber}</h4>
            <h2>${data[i].title}</h2>
            <h3>${data[i].artistDisplayName}</h3>
            <img src=${data[i].primaryImage} alt={!${data[i].title} ?  https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930 : ${data[i].title}} width="150" height="150" >
            <a class="btnVer" href="../../../pages/product/product.html" onClick={imprimirTarjeta(${data[i].objectID})} >Ver</a>
            `;
         
            //            <a class="btnVer" href="https://juanjpl.github.io/museum-talento-tech/pages/product/product.html" onClick={imprimirTarjeta(${data[i].objectID})} >Ver</a>

            console.log(i)
            document.getElementById("productos").appendChild(div);
          }

        
    }

 

};

let llamandoAPI = async (departamentSelected) => {
  try {
    const respuesta = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departamentSelected}`
      
    );

    const results = await respuesta.json()
    console.log(results)
    
  const {objectIDs: o  } = await results
  
    //console.log(total)
    //console.log(o)

    const recorteObjeto = o.slice(0,99)

    
    const data = await Promise.all(
      recorteObjeto.map((id) => fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then((resp) => resp.json()))
    );
    //console.log(data);

    

    if (data !== null) {
      productos = data;
      console.log(productos)
      imprimirProducts(productos.slice((pagina - 1) * 6, pagina * 6))
    } else {
      console.log("no hay proximo");
    }
      
  } catch (error) {
    console.log(error);
  }
};

llamandoAPI(departamentSelected);
//console.log(productos)
console.log(productos.slice((pagina - 1) * 6, pagina * 6))
imprimirProducts(productos.slice((pagina - 1) * 6, pagina * 6))