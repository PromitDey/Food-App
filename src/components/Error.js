import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <div className="Err-page">
      <h1>Oops.... Something went wrong !!</h1>
      <h5>Check the URL</h5>
      <h3>
        {err.status} : {err.statusText}
      </h3>
    </div>
  );
};

export default Error;
