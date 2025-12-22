import {
  registerApplication,
  start,
  addErrorHandler,
  navigateToUrl,
} from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

if (typeof window !== "undefined") {
  window.navigateToUrl = navigateToUrl;
}

// Función para verificar si el usuario está autenticado
function isUserAuthenticated() {
  const token = localStorage.getItem('jwt_token');
  if (!token) return false;

  try {
    // Decodificar el token JWT para verificar expiración
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch (error) {
    return false;
  }
}

// Redirección basada en autenticación
if (window.location.pathname === "/") {
  if (isUserAuthenticated()) {
    window.location.replace("/bo/inicio");
  } else {
    window.location.replace("/auth");
  }
}
const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp: ({ name }) => import(/* webpackIgnore: true */ name),
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach((app) => {
  // console.log(`🚀 Registrando microfrontend:`,app);
  registerApplication(app);
});
layoutEngine.activate();
start();

// Proteger rutas que requieren autenticación
window.addEventListener("single-spa:before-routing-event", (evt) => {
  const { newUrl } = evt.detail;
  const newPath = new URL(newUrl).pathname;
  
  // Rutas protegidas que requieren autenticación
  const protectedRoutes = ['/bo', '/inicio'];
  const isProtectedRoute = protectedRoutes.some(route => newPath.startsWith(route));
  
  // Si es una ruta protegida y el usuario no está autenticado, cancelar y redirigir
  if (isProtectedRoute && !isUserAuthenticated()) {
    evt.detail.cancelNavigation();
    navigateToUrl('/auth');
  }
  
  // Si es la ruta de auth y el usuario ya está autenticado, redirigir al dashboard
  if (newPath === '/auth' && isUserAuthenticated()) {
    evt.detail.cancelNavigation();
    navigateToUrl('/bo/inicio');
  }
});

addErrorHandler((err) => {
  console.groupCollapsed(
    // eslint-disable-line no-console
    `%c💥 Error en microfrontend: ${err.appOrParcelName || "desconocido"}`,
    "color: red; font-weight: bold;"
  );
  console.error("Mensaje:", err.message);
  console.error("Stack:", err.stack);
  console.error("Error completo:", err);
  console.groupEnd(); // eslint-disable-line no-console
});

window.addEventListener("error", (event) => {
  const err = event?.error || event;
  if (err?.message?.includes("application '@link/")) {
    console.groupCollapsed(
      // eslint-disable-line no-console
      `%c🚨 Error crítico al cargar MF: ${err.message}`,
      "color: crimson; font-weight: bold;"
    );
    console.error("Stack:", err.stack || "(sin stack)");
    console.error("Archivo:", event?.filename);
    console.error("Línea:", event?.lineno, "Columna:", event?.colno);
    console.groupEnd(); // eslint-disable-line no-console
  }
});

window.addEventListener("unhandledrejection", (event) => {
  const err = event.reason;
  if (err?.message?.includes("application '@link/")) {
    console.groupCollapsed(
      // eslint-disable-line no-console
      `%c⚠️ Promesa rechazada en MF: ${err.message}`,
      "color: darkorange; font-weight: bold;"
    );
    console.error("Stack:", err.stack);
    console.groupEnd(); // eslint-disable-line no-console
  }
});
