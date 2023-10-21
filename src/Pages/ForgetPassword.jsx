import { useState } from "react";
import Slogan from "../Components/Connexion/Slogan";
import { TextField } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import ConnexionButton from "../Components/General/SubmitButton";
import { Link } from "react-router-dom";
import AuxiliaryButton from "../Components/Connexion/AuxiliaryButton";
import PageTransition from "../Components/Connexion/PageTransition";
import Error from "../Components/Connexion/Error";
import Sucess from "../Components/Connexion/Sucess";

/*********** Validation schema for the form *************/

const validationSchema = yup.object({
  login: yup
    .string()
    .email("Email invalide")
    .required("L'email est obligatoire"),
});

/*********** Form Child Component to update pwd *************/
const Form = ({ formik, isLoading }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center p-10">
      <form
        className="w-full flex flex-col justify-center items-center gap-[30px]"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          required
          id="login"
          name="login"
          label="Email"
          className="w-[95%] md:w-[70%]"
          value={formik.values.login}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.login && Boolean(formik.errors.login)}
          helperText={formik.touched.login && formik.errors.login}
        />

        <ConnexionButton loading={isLoading}>Envoyer</ConnexionButton>
      </form>
    </div>
  );
};

const ForgetPassword = () => {
  const [showError, setShowError] = useState(false);
  const [showErrorServor, setShowErrorServor] = useState(false);
  const [showSucess, setShowSucess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmission = async (values) => {
    setShowSucess(false);
    setShowError(false);
    setShowErrorServor(false);
    setIsLoading(true);
    try {
      window.alert("server connexion")

      const response=true;
      setShowSucess(response);
      setShowError(!response);
    } catch {
      setShowErrorServor(true);
    }

    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      login: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmission(values),
  });

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      {/*********** Header *************/}
      <Slogan />

      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <span>Vous avez déjà un compte ?</span>

          <Link to={"/"}>
            <AuxiliaryButton>Se connecter</AuxiliaryButton>
          </Link>
        </div>

        {/*********** Errors Section *************/}

        <Error showError={showError}>L'email saisi n'est pas reconnu.</Error>

        <Error showError={showErrorServor}>
          Une erreur serveur est survenue. Veuillez réessayer s'il vous plaît.
        </Error>

        <Sucess show={showSucess}>
          Nous vous avons envoyé un mot de passe temporaire par e-mail.
        </Sucess>
        <Sucess></Sucess>

        {/*********** Form*************/}

        <span className="text-black-500 font-bold text-center">
          Veuillez saisir votre adresse mail pour recevoir un nouveau mot de
          passe
        </span>
        <Form formik={formik} isLoading={isLoading} />
      </div>

      <PageTransition />
    </div>
  );
};

export default ForgetPassword;
