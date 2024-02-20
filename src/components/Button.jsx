import className from "classnames";
import { GoSync } from "react-icons/go";

function Button({ children, primary, loading, ...rest }) {
    const classes = className(
        rest.className,
        "rounded-md h-11 flex items-center justify-center",
        {
            "opacity-80": loading,
            "bg-sidebar text-white hover:bg-[#1f2a36] active:scale-95\
         active:bg-[#1f2a36] active:text-[#b8b8b8] transition-all ease-out":
                primary,
        }
    );

    return (
        <button {...rest} disabled={loading} className={classes}>
            {loading ? <GoSync className="animate-spin" /> : children}
        </button>
    );
}

Button.propTypes = {
    checkVariationValue: ({ primary }) => {
        const count = Number(!!primary);

        if (count > 1) {
            return new Error(
                "Only one of primary, secondary, success, warning, danger can be true"
            );
        }
    },
};

export default Button;
