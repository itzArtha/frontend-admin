import { motion } from "framer-motion";

const SecondaryButton = (props) => {
  return (
    <>
      <motion.button
        type={props.type}
        onClick={props.onClick}
        whileHover={{ scale: 1.01 }}
        disabled={props.disabled}
        className={`${props.className} font-semibold px-4 py-4 tracking-wide border border-black text-black transition-colors duration-200 transform rounded-md hover:bg-yellow-400 focus:outline-none`}
      >
        {props.label}
      </motion.button>
    </>
  );
};
export default SecondaryButton;
