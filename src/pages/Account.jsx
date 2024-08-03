import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Actualiza tu cuenta</Heading>

      <Row>
        <Heading as="h3">Actualizar datos de usuario</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Actualizar contraseña</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
