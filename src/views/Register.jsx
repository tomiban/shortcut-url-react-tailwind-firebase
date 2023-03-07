import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";
import Title from "../components/Title";
import { register } from "../config/firebase";
import { useRedirectUser, useUserContext } from "../context/UserProvider";

const Register = () => {
	const { user } = useUserContext();
	const [loading, setLoading] = useState(false);
	useRedirectUser(user, '/')

	const onSubmit = async (
		{ email, password, firstName, lastName, age, country },
		{ setSubmitting, setErrors, resetForm }
	) => {
		try {
			setLoading(true);
			await register({ email, password, firstName, lastName, age, country });
			navigate("/");
			console.log("user registered");
			resetForm();
		} catch (error) {
			console.log(error.code);
			console.log(error.message);
			if (error.code === "auth/email-already-in-use") {
				setErrors({ email: "Email already in use" });
			}
		} finally {
			setSubmitting(false);
			setLoading(false);
		}
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Has ingresado un email incorrecto")
			.required("Campo obligatorio"),
		password: Yup.string().trim().min(6).required("Campo obligatorio"),
		firstName: Yup.string().required("Campo obligatorio"),
		lastName: Yup.string().required("Campo obligatorio"),
		age: Yup.number()
			.min(18, "La edad debe ser mayor o igual a 18")
			.required("Campo obligatorio"),
		country: Yup.string().required("Campo obligatorio"),
	});

	return (
		<>
			<Title text={"Registro"} />
			<Formik
				initialValues={{
					email: "",
					password: "",
					firstName: "",
					lastName: "",
					age: "",
					country: "",
				}}
				onSubmit={onSubmit}
				validationSchema={validationSchema}>
				{({
					handleSubmit,
					handleChange,
					values,
					isSubmitting,
					errors,
					touched,
					handleBlur,
				}) => (
					<form onSubmit={handleSubmit}>
						<div className='relative z-0 w-full mb-6 group'>
							<input
								type='text'
								id='email'
								value={values.email}
								onChange={handleChange}
								name='email'
								onBlur={handleBlur}
								className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer 
                ${
									errors.email && touched.email
										? "bg-red-50 border border-red-500 focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
										: ""
								}`}
							/>
							<label
								htmlFor='email'
								className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
								Email
							</label>
							{errors.email && touched.email && (
								<p className='text-red-500 text-sm mt-1'>{errors.email}</p>
							)}
						</div>

						<div className='relative z-0 w-full mb-6 group'>
							<input
								type='password'
								value={values.password}
								onChange={handleChange}
								name='password'
								onBlur={handleBlur}
								id='password'
								className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer '
							/>
							<label
								htmlFor='password'
								className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
								Contraseña
							</label>
							{errors.password && touched.password && (
								<p className='text-red-500 text-sm mt-1'>{errors.password}</p>
							)}
						</div>
						<div className='grid md:grid-cols-2 md:gap-6'>
							<div className='relative z-0 w-full mb-6 group'>
								<input
									type='text'
									name='firstName'
									id='firstName'
									placeholder=''
									className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
									value={values.firstName}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<label
									htmlFor='firstName'
									className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
									Nombre
								</label>
								{errors.firstName && touched.firstName && (
									<p className='text-red-500 text-sm mt-1'>
										{errors.firstName}
									</p>
								)}
							</div>
							<div className='relative z-0 w-full mb-6 group'>
								<input
									type='text'
									name='lastName'
									id='lastName'
									className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
									value={values.lastName}
									onChange={handleChange}
									onBlur={handleBlur}
								/>

								<label
									htmlFor='lastName'
									className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
									Last name
								</label>
								{errors.lastName && touched.lastName && (
									<p className='text-red-500 text-sm mt-1'>{errors.lastName}</p>
								)}
							</div>
						</div>

						<div className='grid md:grid-cols-2 md:gap-6'>
							<div className='relative z-0 w-full mb-6 group'>
								<input
									type='number'
									name='age'
									id='age'
									className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
									value={values.age}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<label
									htmlFor='age'
									className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
									Edad
								</label>
								{errors.age && touched.age && (
									<p className='text-red-500 text-sm mt-1'>{errors.age}</p>
								)}
							</div>

							<div className='relative z-0 w-full mb-6 group'>
								<input
									type='text'
									name='country'
									id='country'
									className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
									value={values.country}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<label
									htmlFor='country'
									className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
									País de origen
								</label>
								{errors.country && touched.country && (
									<p className='text-red-500 text-sm mt-1'>{errors.country}</p>
								)}
							</div>
						</div>

						<Button
							text={"Registrarse"}
							isSubmitting={isSubmitting}
							type={"submit"}
							loading={loading}
						/>
					</form>
				)}
			</Formik>
		</>
	);
};

export default Register;
