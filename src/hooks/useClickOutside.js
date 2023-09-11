import { useEffect } from "react";

const useClickOutside = (handler, domNode1, domNode2) => {
    useEffect(() => {
        const checkIfOutside = (e) => {
            if (domNode1.current && !domNode2) {
                if (!domNode1.current.contains(e.target)) {
                    handler();
                }
            } else if (domNode1.current && domNode2.current) {
                if (
                    !domNode1.current.contains(e.target) &&
                    !domNode2.current.contains(e.target)
                ) {
                    handler();
                }
            }
        };
        document.addEventListener("mousedown", checkIfOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfOutside);
        };
    }, []);
};

export default useClickOutside;
