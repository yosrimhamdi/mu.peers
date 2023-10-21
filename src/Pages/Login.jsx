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
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  login: yup
    .string()
    .email("Email invalide")
    .required("L'email est obligatoire"),
  password: yup.string().required("Saissez votre mot de passe"),
});

const LoginForm = ({ formik, isLoading }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center relative">
      <form
        className="w-full flex flex-col justify-center items-center gap-[30px]"
        onSubmit={formik.handleSubmit}
      >
        <TextField
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
        <ConnexionButton loading={isLoading}>Se connecter</ConnexionButton>
      </form>
    </div>
  );
};

function LoginPage() {
  const connectUser = useUser((state) => state.connectUser);
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [showErrorServor, setShowErrorServor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmission = async (values) => {
    const { login, password } = { ...values };
    setShowError(false);
    setShowErrorServor(false);
    setIsLoading(true);
    try {


      window.alert("server connexion")

      const connected=false;

      if (connected) {
        navigate("/Acceuil");

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
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmission(values),
  });

  return (
    <>
      <div className=" min-h-screen flex flex-col justify-center items-center  pb-10 ">
        {/*********** Header *************/}

        <Slogan />

        <div className="w-[85vw] md:w-[500px]  flex flex-col justify-between items-center shadow-md pb-4  ">
          <Header>Heureux de vous revoir</Header>

          <div className="flex flex-col md:flex-row justify-center items-center mb-[10px] mt-[10px]">
            <span>Toujours pas inscrit ?</span>

            <Link to={"/creer-un-compte"}>
              <AuxiliaryButton>S'inscrire</AuxiliaryButton>
            </Link>
          </div>

          <Error showError={showError}>
            Le couple Mail-Mot de passe est invalide
          </Error>

          <Error showError={showErrorServor}>
            Une erreur serveur est survenue. Veuillez réessayer s'il vous plaît.
          </Error>

          <LoginForm formik={formik} isLoading={isLoading} />
          <Link to={"/mot-de-passe-oublie"}>
            <AuxiliaryButton>J'ai oublié mon mot de passe</AuxiliaryButton>
          </Link>

          <PageTransition />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
