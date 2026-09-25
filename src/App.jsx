import React from "react";
import Alumno from "./Alumno";
import Docente from "./Docente";
import ControlCentral from "./ControlCentral";

export default function App() {
  const ruta = window.location.pathname;

  if (ruta.includes("/docente")) {
    return <Docente />;
  }
  if (ruta.includes("/control")) {
    return <ControlCentral />;
  }
  return <Alumno />;
}
