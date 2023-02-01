import {
  signInWithEmailAndPassword,
  Auth,
  UserCredential,
} from "firebase/auth";

interface Props {
  auth: Auth;
  email: string;
  password: string;
}

const loginRequest = ({
  auth,
  email,
  password,
}: Props): Promise<UserCredential> =>
  signInWithEmailAndPassword(auth, email, password);

export default loginRequest;
