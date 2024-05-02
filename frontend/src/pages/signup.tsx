import axiosInstance from "../utils/axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import debounce from "lodash/debounce";

interface tsUser {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
}

const Signin: FC = () => {
  const router = useRouter();

  const [phone, setPhone] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const debouncedSubmit = debounce((values: tsUser) => {
    axiosInstance
      .post("/signup", {
        email: values?.email,
        password: values?.password,
        phone: values?.phoneNumber,
        name: values?.name,
      })
      .then((res: any) => {
        if (res.status === 200) {
          toast.success(res?.data?.message, { autoClose: 3000 });
          setTimeout(() => {
            router.push("/");
          }, 3000);
        } else {
          toast.error(res?.data?.message);
          console.log(`Error ${res.data}`);
        }
      })
      .finally(() => {
        setIsSubmittingForm(false); // Reset button state after API call completes
      });
  }, 3000);

  //Yup
  const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  const emailRegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required!"),

    name: Yup.string()
      .min(3, "Length of the name is too short!")
      .required("Name is required!"),

    email: Yup.string()
      .email("Invlaid email address!")
      .required("Email is required!"),

    password: Yup.string()
      .matches(
        emailRegExp,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
      )
      .required("Password is required!"),
  });

  return (
    <>
      <div className="flex-1 bg-white">
        <h1 className="text-3xl lg:text-4xl font-bold text-center mt-10 mobile:text-2xl ">
          <i className="fa-sharp fa-solid fa-bowl-food px-2"></i>
          HungaryHaste
        </h1>
        <div className="container mobile:w-10/12 lg:w-8/12  xl:w-4/12 mx-auto px-4 mt-6 lg:mt-16 bg-gray-200 p-8 rounded-lg shadow-lg ">
          <h1 className="text-2xl lg:text-4xl font-semibold text-center text-black-700 underline decoration-solid uppercase md:pb-2">
            Sign up
          </h1>

          <Formik
            initialValues={{
              email: "",
              password: "",
              phoneNumber: "",
              name: "",
            }}
            validationSchema={validationSchema}
            validateOnChange={true}
            onSubmit={(values, { setSubmitting }) => {
              setEmail(values?.email);
              setName(values?.name);
              setPassword(values?.password);
              setPhone(values?.phoneNumber);
              setIsSubmittingForm(true); // Set button state to disable during API call

              debouncedSubmit(values);

              console.log(values, "values from formik");
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col items-center">
                <div className="mb-6 w-4/5">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-base lg:text-lg font-medium text-gray-800 mb-2"
                  >
                    Phone number
                  </label>
                  <Field
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="block w-full h-8 lg:px-4 lg:py-2 text-lg lg:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500 dark:text-black"
                  />
                  <div className="text-red-500">
                    <ErrorMessage name="phoneNumber" component="div" />
                  </div>
                </div>

                <div className="mb-6 w-4/5">
                  <label
                    htmlFor="name"
                    className="block text-base lg:text-lg font-medium text-gray-800 mb-2"
                  >
                    Name
                  </label>
                  <Field
                    type="name"
                    name="name"
                    id="name"
                    className="block w-full h-8 lg:px-4 lg:py-2 text-lg lg:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500 dark:text-black"
                  />
                  <div className="text-red-500">
                    <ErrorMessage name="name" component="div" />
                  </div>
                </div>

                <div className="mb-6 w-4/5">
                  <label
                    htmlFor="email"
                    className="block text-base lg:text-lg font-medium text-gray-800 mb-2"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full h-8 lg:px-4 lg:py-2 text-lg lg:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500 dark:text-black"
                  />
                  <div className="text-red-500">
                    <ErrorMessage name="email" component="div" />
                  </div>
                </div>

                <div className="mb-6 w-4/5">
                  <label
                    htmlFor="password"
                    className="block text-base lg:text-lg font-medium text-gray-800 mb-2"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full h-8 lg:px-4 lg:py-2 text-lg lg:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500 dark:text-black"
                  />
                  <div className="text-red-500">
                    <ErrorMessage name="password" component="div" />
                  </div>
                </div>

                <p className="mt-2 text-sm lg:text-base text-center text-gray-700">
                  Already have an account?{" "}
                  <a href="/signin">
                    {" "}
                    <b className="font-medium text-pink-600 hover:underline cursor-pointer">
                      Sign in
                    </b>
                  </a>
                </p>

                <div className="w-1/2 mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmittingForm}
                    className="w-full lg:px-1 py-2 mobile:text-sm text-lg lg:text-xl font-medium text-white transition-colors duration-200 transform bg-black rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Signin;
