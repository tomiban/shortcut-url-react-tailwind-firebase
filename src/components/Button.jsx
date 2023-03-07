import ButtonLoading from "./ButtonLoading";

const Button = ({
	text,
	handleFunction,
	isSubmitting,
	type,
	color = "purple",
  loading,
  outline
}) => {
	if (loading) return <ButtonLoading color={color} />;

	return (
		<button
			type={type}
			onClick={handleFunction}
			disabled={isSubmitting}
			className={
				outline
					? `text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800`
					: color === "yellow"
					? `focus:outline-none text-white bg-${color}-400 hover:bg-${color}-500 focus:ring-4 focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 dark:focus:ring-${color}-900 `
					: `w-full md:w-auto focus:outline-none text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-0 dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-900`
			}>
      {text}
      
		</button>
	);
};

export default Button;
