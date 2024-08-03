import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Nombre completo" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "Campo Requerido" })}
        />
      </FormRow>

      <FormRow label="Correo electrónico" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "Campo Requerido",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Por favor ingresa un correo válido",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Contraseña (min 8 caracteres)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "Campo Requerido",
            minLength: {
              value: 8,
              message: "La contraseña debe ser mínimo de 8 caracteres",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repetir contraseña" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "Campo Requerido",
            validate: (value) =>
              value === getValues().password || "Las contraseñas deben coincidir",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Cancelar
        </Button>
        <Button disabled={isLoading}>Crear nuevo usuario</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
