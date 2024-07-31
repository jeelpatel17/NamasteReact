import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return <h1>{/* Error {err.status}! {err.error.message}! */}</h1>;
};

export default Error;
