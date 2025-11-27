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

if (window.location.pathname === "/") {
  window.location.replace("/inicio");
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

// window.addEventListener("single-spa:before-routing-event", (evt) => {
//   const {
//     originalEvent,
//     newAppStatuses,
//     appsByNewStatus,
//     totalAppChanges,
//     oldUrl,
//     newUrl,
//     navigationIsCanceled,
//     cancelNavigation,
//   } = evt.detail;
//   console.log(
//     "original event that triggered this single-spa event",
//     originalEvent
//   ); // PopStateEvent | HashChangeEvent | undefined
//   console.log(
//     "the new status for all applications after the reroute finishes",
//     newAppStatuses
//   ); // { app1: MOUNTED, app2: NOT_MOUNTED }
//   console.log(
//     "the applications that changed, grouped by their status",
//     appsByNewStatus
//   ); // { MOUNTED: ['app1'], NOT_MOUNTED: ['app2'] }
//   console.log(
//     "number of applications that changed status so far during this reroute",
//     totalAppChanges
//   ); // 2
//   console.log("the URL before the navigationEvent", oldUrl); // http://localhost:8080/old-route
//   console.log("the URL after the navigationEvent", newUrl); // http://localhost:8080/new-route
//   console.log("has the navigation been canceled", navigationIsCanceled); // false

//   // The cancelNavigation function is only defined in the before-routing-event
//   evt.detail.cancelNavigation();
// });
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
