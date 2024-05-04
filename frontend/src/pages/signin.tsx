import React, { FC, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import axiosInstance from "../utils/axios";
import debounce from "lodash/debounce";
import userStoreInstance from "@/store/userStore";

const SignIn: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const router = useRouter();

  const debouncedSubmit = debounce((values) => {
    axiosInstance
      .post("/signin", {
        email: values?.email,
        password: values?.password,
      })
      .then((res: any) => {
        if (res.status === 200 && res?.data?.success === true) {
          toast.success(res?.data?.message, {
            autoClose: 3000,
          });

          // add userDetails into mobx
          userStoreInstance.setUser(res?.data?.data?.clientUserInfo);

          setTimeout(() => {
            router.push("/");
          }, 3000);
        } else {
          toast.error(res?.data?.message);
          console.log(`Error ${res.data}`);
        }
      })
      .catch((error) => {
        console.error("Unexpected error:", error);
      })
      .finally(() => {
        setIsSubmittingForm(false); // Reset button state after API call completes
      });
  }, 1000);

  const emailRegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validationSchema = Yup.object().shape({
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
          <h1 className="text-2xl lg:text-4xl font-semibold text-center text-black-700 underline decoration-solid uppercase">
            Sign in
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
              setPassword(values?.password);
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

                <p className="mt-6 text-sm lg:text-base text-center text-gray-700">
                  Don't have an account?{" "}
                  <a href="/signup">
                    {" "}
                    <b className="font-medium text-pink-600 hover:underline cursor-pointer">
                      Sign up
                    </b>
                  </a>
                </p>

                <div className="w-1/2 mt-5">
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

export default SignIn;
