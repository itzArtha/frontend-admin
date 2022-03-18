import { useState } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import apiClient from "../components/services/apiClient";
import useQuery from "../components/services/useQuery";

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const query = useQuery();
  const token = query.get("redirectToken");

  const handleLogin = () => {
    setLoading(true);
    apiClient()
      .get("/auth/google")
      .then((r) => {
        window.location.href = r.data;
        setLoading(false);
      });
  };

  console.log(sessionStorage.getItem("token"));

  const addTokenToSession = (value) => {
    sessionStorage.setItem("token", value);
    window.location.href = "/dashboard";
  };

  if (token) {
    // eslint-disable-next-line no-use-before-define
    addTokenToSession(token);
  }

  return (
    <>
      <div>
        <div className={`py-72 md:py-72`}>
          <div
            className={`flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg lg:shadow-lg lg:max-w-1/2`}
          >
            <div className="w-full px-6 py-8 md:px-8">
              <h2 className="text-2xl font-semibold text-center text-gray-700">
                Login Admin
              </h2>

              <div className="text-sm text-center text-gray-600 py-4">
                "Sulit dimengerti, semoga harimu senin terus"
              </div>

              <GoogleLoginButton
                type="button"
                label={isLoading ? `Loading...` : `Masuk dengan Google`}
                disabled={isLoading}
                onClick={() => {
                  handleLogin();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
