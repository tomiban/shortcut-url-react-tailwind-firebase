import { login } from "../config/firebase";
import { useRedirectUser, useUserContext } from "../context/UserProvider";
import { Formik } from "formik";
import * as Yup from "yup";
import Title from "../components/Title";
import Button from "../components/Button";
import { useContext, useState } from "react";


const Login = () => {
	const { user, setUser } = useUserContext();
	const [loading, setLoading] = useState(false);
	
	useRedirectUser(user, '/')

	const onSubmit = async (
		{ email, password },
		{ setSubmitting, setErrors, resetForm }
	) => {
		try {
			setLoading(true);
			await login({ email, password });
			resetForm();
		} catch (error) {
			if (error.code === "auth/user-not-found") {
				return setErrors({ email: "Email no registrado" });
			}
			if (error.code === "auth/wrong-password") {
				return setErrors({ password: "Contraseña incorrecta" });
			}
		} finally {
			setSubmitting(false);
			setLoading(false);
		}
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string().email("Email no válido").required("Email requerido"),
		password: Yup.string()
			.trim()
			.min(6, "Minímo 6 carácteres")
			.required("Password requerido"),
	});

	return (
		<>
			<Title text={"Ingreso"} />
			<Formik
				initialValues={{
					email: "",
					password: "",
				}} /* Incializamos los inpúts de nuestro formulario */
				onSubmit={onSubmit}
				validationSchema={validationSchema}>
				{
					/* Llevamos todo el form a una funcion dentro de formik y le pasamos valores desestructurados  */
					({
						values,
						handleSubmit,
						handleChange,
						errors,
						touched,
						handleBlur,
						isSubmitting,
					}) => (
						<form
							action=''
							onSubmit={handleSubmit}>
							<div className='mb-6'>
								<label
									htmlFor='email'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
									Ingrese su correo
								</label>
								<input
									type='text'
									name='email'
									placeholder='Email:'
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500   ${
										errors.email && touched.email
											? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
											: ""
									}`}
								/>
								{errors.email && touched.email && (
									<p className='text-red-500 text-sm mt-1'>{errors.email}</p>
								)}
							</div>

							<div className='mb-6'>
								<label
									htmlFor='password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
									Ingrese su contraseña
								</label>{" "}
								<input
									type='password'
									name='password'
									placeholder='Contraseña:'
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500   ${
										errors.password && touched.password
											? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
											: ""
									}`}
								/>
								{errors.password && touched.password && (
									<p className='text-red-500 text-sm mt-1'>{errors.password}</p>
								)}
							</div>

							<div className='flex items-start mb-6'>
								<div className='flex items-center h-5'>
									<input
										id='remember'
										type='checkbox'
										defaultValue=''
										className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
										required=''
									/>
								</div>
								<label
									htmlFor='remember'
									className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
									Recordarme
								</label>
							</div>

							<Button
								text={"Ingresar"}
								isSubmitting={isSubmitting}
								type={"submit"}
								loading={loading}
							/>
						</form>
					)
				}
			</Formik>
		</>
	);
};
export default Login;
