 
 const BREAKPOINTS = {
     mobile: "(max-width: 599px)",
     tablet: "(min-width: 600px) and (max-width: 899px)",
     desktop: "(min-width: 900px)",
 };
 
export function getMediaQueries() {
  if (typeof window === 'undefined' || !window.matchMedia) return {};
  return {
    mobile: window.matchMedia(BREAKPOINTS.mobile),
    tablet: window.matchMedia(BREAKPOINTS.tablet),
    desktop: window.matchMedia(BREAKPOINTS.desktop),
  };
}
