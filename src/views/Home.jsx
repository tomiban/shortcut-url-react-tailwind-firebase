import { Formik } from "formik";
import Loading from "../components/Loading";
import Title from "../components/Title";
import { useFirestore } from "../hooks/useFirestore";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
	const { data, loading, error, getData, addData, deleteData, updateData } =
		useFirestore();
	const [newOriginID, setNewOriginID] = useState(); // Estado para mantener la URL editada
	const [editUrl, setEditUrl] = useState("");
	
	

	useEffect(() => {
		getData();
	}, []);

	const re =
		/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

	const validationSchema = Yup.object().shape({
		url: Yup.string().matches(re, "URL is not valid"),
	});

	const onSubmit = async ({ url }, { setSubmitting, resetForm }) => {
		try {
			if (newOriginID) {
				
				await updateData(newOriginID, url);
				setNewOriginID("");
			} else {
				addData(url);
				resetForm();
			}
		} catch (error) {
			console.log(error.message);
		} finally {
			setSubmitting(false);
		}
	};

	const handleClickDelete = async (nanoid) => {
		try {
			await deleteData(nanoid);
		} catch (error) {
			console.log(error.code);
			console.log(error.message);
		}
	};

	const handleClickUpdate = (item) => {
		setNewOriginID(item.nanoid);
		setEditUrl(item.origin);
		console.log(editUrl);
	};

	const handleClickCopy = async (nanoid) => {
		await navigator.clipboard.writeText(pathURL + nanoid);
		toast("¡Texto copiado al portapapeles!", {
			position: "top-right",
			autoClose: 1000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			theme: "dark",
		});
	};

	const pathURL = window.location.href;

	if (error) return <h4>{error}</h4>;

	return (
		<>
			<Title text={"Inicio"} />

			<Formik
				initialValues={{ url: "" }}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
				enableReinitialize={true}>
				{({
					values,
					handleSubmit,
					handleChange,
					isSubmitting,
					errors,
					touched,
					handleBlur,
					setValues,
				}) => {
					useEffect(() => {
						if (editUrl) {
							setValues({ url: editUrl });
						}
					}, [editUrl, setValues]);

					return (
						<form className='flex' onSubmit={handleSubmit}>
							<div className='flex flex-grow'>
								<span className=' inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border-2 border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
									<i className='fa-solid fa-link'></i>
								</span>
							</div>
							<input
								type='text'
								name='url'
								placeholder='https://www.google.com/'
								value={values.url}
								onChange={handleChange}
								onBlur={handleBlur}
								className={`flex-grow rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-100 focus:border-blue-500 block min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
        ${
					errors.url && touched.url
						? "bg-red-100 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
						: ""
				}`}
							/>

							<div className='ml-2'></div>
							{newOriginID ? (
								<Button
									type={"submit"}
									text={"Editar"}
									isSubmitting={isSubmitting}
									value={values.url}
									color={"yellow"}
									loading={loading.updateData}
									className='ml-2'
								/>
							) : (
								<Button
									type={"submit"}
									text={"Agregar"}
									isSubmitting={isSubmitting}
									value={values.url}
									color={"purple"}
									loading={loading.addData}
									className='ml-2'
								/>
							)}
							
							{errors.url && touched.url && <p>{errors.url}</p>}
						</form>
					);
				}}
			</Formik>

			{loading.getData && <Loading />}
			<div className="">
				{data.map((item) => (
					<div
						key={item.nanoid}
						className={
							" p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 m-3"
						}>
						<p className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
							{pathURL}
							{item.nanoid}
						</p>
						<p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
							{" "}
							{item.origin}
						</p>

						<div className='flex space-x-2'>
							<Button
								color={"red"}
								type={"button"}
								text={"Borrar"}
								loading={loading[item.nanoid]}
								handleFunction={() => handleClickDelete(item.nanoid)}
							/>

							<Button
								color={"yellow"}
								type={"button"}
								text={"Editar"}
								handleFunction={() => handleClickUpdate(item)}
							/>

							<Button
								color={"gray"}
								type={"button"}
								text={<i className='fa-regular fa-copy'></i>}
								outline={true}
								handleFunction={() => handleClickCopy(item.nanoid)}></Button>
						</div>
					</div>
				))}
			</div>
		</>
	);
};
export default Home;
