import { Navigate } from "react-router-dom";

interface Props {
  isAccess: boolean;
  children: React.ReactNode;
}
const PrivteRoute = ({ isAccess, children }: Props) => {
  return isAccess ? children : <Navigate to="/" />;
};

export default PrivteRoute;
