import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate"; // Importa ReactPaginate
import * as XLSX from "xlsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { database } from "../../firebase/app";
import { getDatabase, ref, onValue } from 'firebase/database';

const Historico = ({ setIsAuthenticated }) => {
  const [products, setProducts] = useState([]);
  const [productsG, setProductsG] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("FechaDelito");
  const productsPerPage = 10;
  const pagesVisited = pageNumber * productsPerPage;
  const pageCount = Math.ceil(products.length / productsPerPage);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);

  };

  const handleExcelChange = (event) => {
    const reader = new FileReader();
    if (file) {
      document.getElementById('archivoCSV').value = ''

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        sendDataToServer(jsonData);
      };
      handleShowAll()
      reader.readAsBinaryString(file);
    }
    else { toast.error('Ingrese un archivo para subir') }

  };

  const sendDataToServer = (jsonData) => {
    const usuariosRef = ref(database, 'usuarios');

    onValue(usuariosRef, (snapshot) => {
      const data = snapshot.val() || {};
      const correosArray = Object.values(data).map((usuario) => usuario.correo);
      const loadingToast = toast.loading('Enviando información...');
      axios
        .post("http://localhost:3000/cargar-excel", {
          jsonData: jsonData, // Agrega jsonData en el cuerpo de la solicitud
          additionalData: correosArray, // Agrega additionalData en el cuerpo de la solicitud
        })
        .then((response) => {
          document.getElementById('archivoCSV').value = ''
          toast.dismiss(loadingToast);
          toast.success('Solicitud completada con éxito!');
          setFile(null)
        })
        .catch((error) => {
          toast.error('Error al realizar la solicitud');
        });
    });
  };

  const handleExportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(products);
    XLSX.utils.book_append_sheet(wb, ws, "Historico Delitos");
    XLSX.writeFile(wb, "historico_delitos.xlsx");
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleExportCSV = () => {
    const csvData = products.map((product) => {
      return `${product.IdDelito},${product.CodigoDocumento},"${product.DescripcionDelito
        }",${new Date(product.FechaDelito).toISOString().split("T")[0]
        },${product.Hora.substr(11, 8)},${product.Direccion},${product.Latitud},${product.Longitud
        }`;
    });
    const BOM = "\uFEFF";
    const csvContent =
      BOM +
      `IdDelito,CodigoDocumento,DescripcionDelito,FechaDelito,Hora,Direccion,Latitud,Longitud\n${csvData.join(
        "\n"
      )}`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "historico_delitos.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  const handleLogout = () => {
    console.log("???");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleFilterByDate = () => {
    const filteredProducts = productsG.filter((product) => {
      const productDate = new Date(product.FechaDelito)
        .toISOString()
        .split("T")[0];
      return (
        (!startDate || productDate >= startDate) &&
        (!endDate || productDate <= endDate)
      );
    });
    setProducts(filteredProducts);
  };

  const handleShowAll = () => {
    axios
      .get("https://efficient-tundra-soap.glitch.me/datos")
      .then((response) => {
        setProducts(response.data);
        setProductsG(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
    setStartDate("");
    setEndDate("");
  };

  useEffect(() => {
    // Realiza una solicitud GET a la API de tu servidor
    axios
      .get("https://efficient-tundra-soap.glitch.me/datos")
      .then((response) => {
        setProducts(response.data);
        setProductsG(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  // Función para manejar el cambio de página
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-blue-500 text-white py-4">
        <ul className="flex justify-center space-x-4">
          <li>
            <Link to="/menu" className="hover:text-yellow-300">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/historico" className="hover:text-yellow-300">
              Historico
            </Link>
          </li>
          <li>
            <Link to="/admin" className="hover:text-yellow-300">
              Admin
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="hover:text-yellow-300 focus:outline-none"
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>
      <ToastContainer />
      <main className="container mx-auto mt-8 flex-grow items-center justify-center">
        <div className="p-4 ">
          <h1 className="text-2xl font-semibold mb-4">Lista de Productos</h1>
          <div className="flex flex-wrap space-x-4">
            <div className="bg-white p-8 rounded-lg shadow-lg m-4">
              <h1 className="text-lg font-semibold mb-4">Cargar Archivo Excel</h1>
              <input
                type="file"
                id="archivoCSV" // Debe coincidir con el nombre esperado en el servidor
                accept=".xlsx"
                className="border rounded p-2 w-full mb-4"
                onChange={handleFileChange}
              />
              <button
                className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded cursor-pointer"
                onClick={handleExcelChange}
                type="submit"
              >
                Cargar Excel
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg m-4">
              <h1 className="text-lg font-semibold mb-4">Filtrar por Fecha</h1>
              <div className="flex flex-row space-x-4 mb-4">
                <input
                  type="date"
                  className="border rounded p-2 w-full"
                  placeholder="Fecha de inicio"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  className="border rounded p-2 w-full"
                  placeholder="Fecha de fin"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <button
                className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded cursor-pointer"
                onClick={handleFilterByDate}
              >
                Filtrar
              </button>
            </div>
          </div>
          <button
            className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded cursor-pointer m-4"
            onClick={handleShowAll}
          >
            Mostrar Todos
          </button>
          <button
            className="bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded cursor-pointer m-4"
            onClick={handleExportToExcel}
          >
            Exportar a Excel
          </button>
          <button
            className="bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded cursor-pointer m-4"
            onClick={handleExportCSV}
          >
            Exportar a CSV
          </button>
          {products.length > 0 ? (<table className="table-auto ">
            <thead>
              <tr>
                <th className="px-4 py-2">
                  <button
                    className="hover:text-yellow-300 focus:outline-none"
                    onClick={() => handleSort("IdDelito")}
                  >
                    ID
                    {sortBy === "IdDelito" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </button>
                </th>
                <th className="px-4 py-2">
                  <button
                    className="hover:text-yellow-300 focus:outline-none"
                    onClick={() => handleSort("CodigoDocumento")}
                  >
                    CODIGO
                    {sortBy === "CodigoDelito" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </button>
                </th>
                <th className="px-4 py-2">
                  <button
                    className="hover:text-yellow-300 focus:outline-none"
                    onClick={() => handleSort("DescripcionDelito")}
                  >
                    DESCRIPCION
                    {sortBy === "DescripcionDelito" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </button>
                </th>
                <th className="px-4 py-2">
                  <button
                    className="hover:text-yellow-300 focus:outline-none"
                    onClick={() => handleSort("FechaDelito")}
                  >
                    FECHA
                    {sortBy === "FechaDelito" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </button>
                </th>
                <th className="px-4 py-2">
                  <button
                    className="hover:text-yellow-300 focus:outline-none"
                    onClick={() => handleSort("Direccion")}
                  >
                    DIRECCION
                    {sortBy === "Direccion" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </button>
                </th>
                <th className="px-4 py-2">
                  <button
                    className="hover:text-yellow-300 focus:outline-none"
                    onClick={() => handleSort("Latitud")}
                  >
                    LATITUD
                    {sortBy === "Latitud" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </button>
                </th>
                <th className="px-4 py-2">
                  <button
                    className="hover:text-yellow-300 focus:outline-none"
                    onClick={() => handleSort("Longitud")}
                  >
                    LONGITUD
                    {sortBy === "Longitud" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {products
                .sort((a, b) => {
                  // Compara las fechas para ordenar
                  if (sortBy == "FechaDelito") {
                    const dateA = new Date(a[sortBy]).getTime();
                    const dateB = new Date(b[sortBy]).getTime();
                    if (sortOrder === "asc") {
                      return dateA - dateB;
                    } else {
                      return dateB - dateA;
                    }
                  } else if (sortBy === "CodigoDocumento") {
                    // Ordenar por la columna "CodigoDocumento"
                    const numberA = parseInt(a[sortBy].split("-")[1]);
                    const numberB = parseInt(b[sortBy].split("-")[1]);

                    if (sortOrder === "asc") {
                      return numberA - numberB;
                    } else {
                      return numberB - numberA;
                    }
                  } else if (
                    sortBy === "DescripcionDelito" ||
                    sortBy === "Direccion"
                  ) {
                    // Ordenar por la columna "DescripcionDelito"
                    if (sortOrder === "asc") {
                      return a.DescripcionDelito.localeCompare(
                        b.DescripcionDelito
                      );
                    } else {
                      return b.DescripcionDelito.localeCompare(
                        a.DescripcionDelito
                      );
                    }
                  } else if (
                    sortBy === "IdDelito" ||
                    sortBy === "Longitud" ||
                    sortBy === "Latitud"
                  ) {
                    // Ordenar por la columna "DescripcionDelito"
                    if (sortOrder === "asc") {
                      return a[sortBy] - b[sortBy];
                    } else {
                      return b[sortBy] - a[sortBy];
                    }
                  }
                })
                .slice(pagesVisited, pagesVisited + productsPerPage)
                .map((product) => (
                  <tr key={product.IdDelito}>
                    <td className="border px-4 py-2">{product.IdDelito}</td>
                    <td className="border px-4 py-2">
                      {product.CodigoDocumento}
                    </td>
                    <td className="border px-4 py-2">
                      {product.DescripcionDelito}
                    </td>
                    <td className="border px-4 py-2">
                      {
                        moment(product.FechaDelito).format("YYYY-MM-DD HH:mm:ss")
                      }
                    </td>
                    <td className="border px-4 py-2">{product.Direccion}</td>
                    <td className="border px-4 py-2">{product.Latitud}</td>
                    <td className="border px-4 py-2">{product.Longitud}</td>
                  </tr>
                ))}
            </tbody>
          </table>) : (<div className="w-full h-60 flex items-center justify-center text-center"><h1 className="font-bold">Sin Registros</h1></div>)}

          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Siguiente"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={
              "flex space-x-4 p-4 border-t border-gray-300 mt-4"
            }
            previousLinkClassName={
              "pagination__link p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
            }
            nextLinkClassName={
              "pagination__link p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
            }
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active bg-yellow-500"}
          />
        </div>
      </main>
      <footer className="bg-blue-500 text-white py-2 text-center">
        <p className="text-sm">
          &copy; 2023 Nuestra Empresa. Todos los derechos reservados.
        </p>
        <p className="text-sm">
          <Link to="/privacy" className="hover:text-yellow-300">
            Política de privacidad
          </Link>{" "}
          |{" "}
          <Link to="/terms" className="hover:text-yellow-300">
            Términos y condiciones
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Historico;
