import { motion } from "framer-motion";

const Caret = () => {
  return (
    <motion.div
    aria-hidden={true}
    animate={{ opacity: 1}}
    className="inline-block bg-blue-500 w-0.5 h-7 align-middle"
  />
  );
};

export default Caret;