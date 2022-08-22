import { useEffect } from "react";

export const setupScrollListener = (fetchNextPage: () => void) =>
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        fetchNextPage();
      }
    };

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
