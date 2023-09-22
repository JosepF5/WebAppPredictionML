import { Link, useNavigate } from "react-router-dom";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import './Menu.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const Menu = ({ setIsAuthenticated }) => {


  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("???");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleRefreshDatasource = (event) => {
    const apiUrl = 'https://api.powerbi.com/v1.0/myorg/groups/7ac06456-8cc6-4f3b-8b12-6e688263ec19/dataflows/6101aac4-db1f-4d2f-9c48-ca9b36e3ffcc/refreshes';
    const apiDataset = 'https://api.powerbi.com/v1.0/myorg/datasets/f40596b8-4b33-4e3d-96bb-ba474f731ff3/refreshes'
    // Token de acceso válido obtenido después de la autenticación
    const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMGUwY2IwNjAtMDlhZC00OWY1LWEwMDUtNjhiOWI0OWFhMWY2LyIsImlhdCI6MTY5NTMyODI3MSwibmJmIjoxNjk1MzI4MjcxLCJleHAiOjE2OTUzMzIxODksImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VUFBQUFRSTkwZ0VNbzk3cjVpdlN4WmNLRlZvSXg0TzViR3AyMmhLbVljTTdWczNvMWdFYUxxR0VoZ2tISnVFV1JOME4vUzJ5TVBDYWV2VklwaXF1N1pENEVhRmorT3VLZGVBL2JNUjcxbmROc0kycz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiMThmYmNhMTYtMjIyNC00NWY2LTg1YjAtZjdiZjJiMzliM2YzIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJWaWxjaGVzIExlb24iLCJnaXZlbl9uYW1lIjoiSm9zZSBTYW50aWFnbyIsImlwYWRkciI6IjM4LjI1LjYuNjMiLCJuYW1lIjoidTIwMTgxZTgzNSAoVmlsY2hlcyBMZW9uLCBKb3NlIFNhbnRpYWdvKSIsIm9pZCI6IjM3ODY5YjQzLWQ4MWQtNGNkMi1iY2VjLWZkMTk3YWYzZDQyZSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS04NTgzNTQxNzgtMTcyNjMwNTg0LTExMzYyNjM4NjAtMTEyOTU0NCIsInB1aWQiOiIxMDAzQkZGREE5ODY3QzFDIiwicmgiOiIwLkFRWUFZTEFNRHEwSjlVbWdCV2k1dEpxaDlna0FBQUFBQUFBQXdBQUFBQUFBQUFBR0FBOC4iLCJzY3AiOiJBcHAuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZFdyaXRlLkFsbCBDb250ZW50LkNyZWF0ZSBEYXNoYm9hcmQuUmVhZC5BbGwgRGFzaGJvYXJkLlJlYWRXcml0ZS5BbGwgRGF0YWZsb3cuUmVhZC5BbGwgRGF0YWZsb3cuUmVhZFdyaXRlLkFsbCBEYXRhc2V0LlJlYWQuQWxsIERhdGFzZXQuUmVhZFdyaXRlLkFsbCBHYXRld2F5LlJlYWQuQWxsIEdhdGV3YXkuUmVhZFdyaXRlLkFsbCBQaXBlbGluZS5EZXBsb3kgUGlwZWxpbmUuUmVhZC5BbGwgUGlwZWxpbmUuUmVhZFdyaXRlLkFsbCBSZXBvcnQuUmVhZC5BbGwgUmVwb3J0LlJlYWRXcml0ZS5BbGwgU3RvcmFnZUFjY291bnQuUmVhZC5BbGwgU3RvcmFnZUFjY291bnQuUmVhZFdyaXRlLkFsbCBUZW5hbnQuUmVhZC5BbGwgVGVuYW50LlJlYWRXcml0ZS5BbGwgVXNlclN0YXRlLlJlYWRXcml0ZS5BbGwgV29ya3NwYWNlLlJlYWQuQWxsIFdvcmtzcGFjZS5SZWFkV3JpdGUuQWxsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiVlNKclFCMlpaZWFPbzZRWUZxNEFiSXF2SmVmNm1RejNLMExod1BlMTBZcyIsInRpZCI6IjBlMGNiMDYwLTA5YWQtNDlmNS1hMDA1LTY4YjliNDlhYTFmNiIsInVuaXF1ZV9uYW1lIjoidTIwMTgxZTgzNUB1cGMuZWR1LnBlIiwidXBuIjoidTIwMTgxZTgzNUB1cGMuZWR1LnBlIiwidXRpIjoiaDdwUmM2ZGJORXluLThRT0trY0tBUSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.aLwQ1z_pK60wC--b3myBuFr4NgFAj2X3PEYplbwVtznUXN_gi992jUujGhGTHSFYKXzDlq3fRRgr2eavhmc-9itc-7X00xxS4gniWhJq3a4irB0JAJ2DO3bWdq9uoZruPUni2YyenE1wpfgNV488R72DtTgL7qvR_YFpyB0Ccf8HBVigafmrqq9XpfxXsJgpFu-fh_GPl690VC2sXzo3YXtxIKI1g3MQ1PzOxwDlRIafkvOum3T4-_rNr_OJAlDc5sNY2wP7xEilHJcxXlB5RqqSD8Vy0Djq5MFvRzTSJML3i1k_0JPTZliOj7CGvO7nQUoQUOgZbTa8RjOGAJ7hVQ';

    // Cabeceras de la solicitud HTTP
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    // Cuerpo de la solicitud POST (si es necesario)
    const postData = {
      // Tu cuerpo de solicitud aquí, si es necesario
    };

    const loadingToast = toast.loading('Actualizando dashboard...');
    // Realizar la solicitud POST
    axios.post(apiUrl, postData, { headers })
      .then(response => {
        console.log('Solicitud POST exitosa');
        toast.dismiss(loadingToast);
        toast.success('Solicitud completada con éxito!');
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error al realizar la solicitud POST');
        console.error(error.response.data.error.message);
        toast.error('Error al realizar la solicitud');
      });
    axios.post(apiDataset, postData, { headers })
      .then(response => {
        console.log('Solicitud POST exitosa');
        toast.dismiss(loadingToast);
        toast.success('Solicitud completada con éxito!');
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error al realizar la solicitud POST');
        console.error(error.response.data.error.message);
        toast.error('Error al realizar la solicitud');
      });
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
      <main className="container mx-auto mt-8 flex-grow items-center justify-center relative">
        {" "}
        {/* Cambiado a flex-grow */}
        <section className="text-center h-full">
          <h1 className="text-3xl font-bold underline">Estadisticas</h1>
          <button
            className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded cursor-pointer m-4"
            onClick={handleRefreshDatasource}
          >
            Actualizar Dashboard
          </button>
          <div>
            <iframe title="DashboardDelitos-Oficial" width="100%"  className="frame min-h-screen" src="https://app.powerbi.com/view?r=eyJrIjoiNzcxNDlkMWQtOWU1Ny00ZDM2LWE0ZTAtYjA5NjE1YzU5MTU5IiwidCI6IjBlMGNiMDYwLTA5YWQtNDlmNS1hMDA1LTY4YjliNDlhYTFmNiIsImMiOjR9" frameBorder="0" allowFullScreen="1"></iframe>
          </div>
        </section>
      </main>
      <footer className="bg-blue-500 text-white py-2 text-center">
        <p className="text-sm">
          &copy; 2023 Nuestra Empresa. Todos los derechos reservados.
        </p>
        <p className="text-sm">
          <a href="#privacy" className="hover:text-yellow-300">
            Política de privacidad
          </a>{" "}
          |{" "}
          <a href="#terms" className="hover:text-yellow-300">
            Términos y condiciones
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Menu;
