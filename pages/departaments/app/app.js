import { departamentos } from "./dataCollections.js";

console.log("comenzando llamado de la api categorias");

const llamandoAPI = async () => {
  try {
    const respuesta = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/departments"
    );
    const { departments: data } = await respuesta.json();

    if (data !== null) {
      //console.log(departamentos);

      for (let i = 0; i < data.length; i++) {
        departamentos[i].departmentId = data[i].departmentId;
        departamentos[i].displayName = data[i].displayName;
      }

      //console.log(departamentos);

      imprimirProducts(departamentos);
    } else {
      console.log(departamentos);
      console.log("no hay proximo");
    }
  } catch (error) {
    console.log(error);
  }
};

llamandoAPI();

const imprimirTarjeta = (id) => {
  console.log(`Quiero ver los objetos del departamento: ${id}`);
  localStorage.setItem("departamentSelected", `${id}`);
};

const imprimirProducts = (data) => {
  document.getElementById("departamentos").innerHTML = "";

  if (data[0].displayName === "") {
    let loader = document.createElement("div");
    loader.className += "loader";
    document.getElementById("departamentos").appendChild(loader);
    console.log(loader);
  } else {
    let contenedor = document.getElementById("contenedor-principal");
    contenedor.style.height="max-content";

    for (let i = 0; i < data.length; i++) {
      let div = document.createElement("div");
      div.className += "card";
      div.setAttribute("id", `${data[i].departmentId}`);
      div.innerHTML = `
       <img src=${data[i].deptImg} alt={${data[i].title} width="100%" height="100%" >
            <h4>${data[i].departmentId}</h4>
            <h2>${data[i].displayName}</h2>
<a class="btnVer" href="../../../pages/products/products.html" onClick={imprimirTarjeta(${data[i].departmentId})} >Ver</a>
            `;

      //            <a class="btnVer" href="https://juanjpl.github.io/museum-talento-tech/pages/products/products.html" onClick={imprimirTarjeta(${data[i].departmentId})} >Ver</a>

      document.getElementById("departamentos").appendChild(div);
    }
  }
};

imprimirProducts(departamentos);
