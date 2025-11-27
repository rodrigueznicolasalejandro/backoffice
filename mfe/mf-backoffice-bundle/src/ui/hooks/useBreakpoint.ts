import { useEffect,useState } from "react";
import { getMediaQueries } from "@ui/utils/mediaQueries";


export function useBreakpoint() {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isTablet, setIsTablet] = useState<boolean>(false);
    const [isDesktop, setIsDesktop] = useState<boolean>(false);

    useEffect(() => {
        const mediaQueries = getMediaQueries();
        const handleMediaQueryChange = () => {
            setIsMobile(mediaQueries.mobile.matches);
            setIsTablet(mediaQueries.tablet.matches);
            setIsDesktop(mediaQueries.desktop.matches);
        };
        handleMediaQueryChange();

        mediaQueries.mobile.addEventListener('change', handleMediaQueryChange);
        mediaQueries.tablet.addEventListener('change', handleMediaQueryChange);
        mediaQueries.desktop.addEventListener('change', handleMediaQueryChange);

        return () => {
            mediaQueries.mobile.removeEventListener('change', handleMediaQueryChange);
            mediaQueries.tablet.removeEventListener('change', handleMediaQueryChange);
            mediaQueries.desktop.removeEventListener('change', handleMediaQueryChange);
        };
        
    }, []);

    return { isMobile, isTablet, isDesktop };

}