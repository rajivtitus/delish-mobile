import {
  createUserWithEmailAndPassword,
  Auth,
  UserCredential,
} from "firebase/auth";

interface Props {
  auth: Auth;
  email: string;
  password: string;
}

const registerRequest = ({
  auth,
  email,
  password,
}: Props): Promise<UserCredential> =>
  createUserWithEmailAndPassword(auth, email, password);

export default registerRequest;
