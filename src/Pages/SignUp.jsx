import { useState } from "react";
import { useUser } from "../Store/user";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Header from "../Components/Connexion/Header";
import Error from "../Components/Connexion/Error";
import AuxiliaryButton from "../Components/Connexion/AuxiliaryButton";
import ConnexionButton from "../Components/General/SubmitButton";
import PasswordInput from "../Components/General/PasswordInput";
import Slogan from "../Components/Connexion/Slogan";
import { Link } from "react-router-dom";
import PageTransition from "../Components/Connexion/PageTransition";


/*********** Validation schema for the form *************/

const validationSchema = yup.object({
  login: yup
    .string()
    .email("Email invalide")
    .required("L'email est obligatoire"),
  password: yup
    .string()
    .matches(
      /^(?=.*[!@#$%^&*§()_+{}\[\]:;<>,.?~=\\-])(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
      "Le mot de passe doit au moins contenir 8 lettres, un caractère spécial, un majuscule et une minuscule."
    )
    .required("Saissez votre mot de passe"),

  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les deux mots de passe ne correspondent pas"
    )
    .required("Confirmez le mot de passe saisi"),
});

/*********** Form Child Component to update pwd *************/

const LoginForm = ({ formik, isLoading }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <form
        className="w-full flex flex-col justify-center items-center gap-[30px]"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          required
          id="login"
          name="login"
          label="Email"
          className="w-[80%]"
          value={formik.values.login}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.login && Boolean(formik.errors.login)}
          helperText={formik.touched.login && formik.errors.login}
        />
        <PasswordInput
          id="password"
          name="password"
          label="Mot de Passe"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          className="w-[80%]"
        />
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmer le Mot de Passe"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          className="w-[80%]"
        />
        <ConnexionButton loading={isLoading}>Créer un compte</ConnexionButton>
      </form>
    </div>
  );
};

function LoginPage() {

  const createUser = useUser((state) => state.createUser);

  const [showError, setShowError] = useState(false);
  const [showErrorServor, setShowErrorServor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmission = async (values) => {
    const { login, password } = { ...values };
    setShowError(false);
    setShowErrorServor(false);
    setIsLoading(true);
    try {

      /* Servor logic*********                              */
      window.alert("server connexion")
      const response=false
      if (response) {
        /*  User logic connection */
        createUser(login, password);
      } else {
        setShowError(true);
      }
    } catch {
      setShowErrorServor(true);
    }

    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmission(values),
  });

  return (
    <>
      <div className=" min-h-screen flex flex-col justify-center items-center  pb-10 ">
        <Slogan />
        <div className="w-[85vw] md:w-[500px]  flex flex-col justify-between items-center shadow-md pb-4  ">
          <Header>Inscrivez-vous et rejoignez l'aventure</Header>

          <div className="flex flex-col md:flex-row justify-center items-center mb-[10px] mt-[10px]">
            <span>Vous avez déjà un compte ?</span>

            <Link to={"/"}>
              <AuxiliaryButton>Se connecter</AuxiliaryButton>
            </Link>
          </div>

          {/*********** Errors Section *************/}

          <Error showError={showError}>
            Vous avez déjà un compte ave cet email !
          </Error>

          <Error showError={showErrorServor}>
            Une erreur serveur est survenue. Veuillez réessayer s'il vous plaît.
          </Error>

          {/*********** Form Section *************/}
          <LoginForm formik={formik} isLoading={isLoading} />
        </div>

        <PageTransition />
      </div>
    </>
  );
}

export default LoginPage;
