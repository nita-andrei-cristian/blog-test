import { Link, useNavigate } from "react-router-dom";

export default function Page() {
  const navigate = useNavigate();

  const login = (ev: any) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const data = Object.fromEntries(formData.entries());

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // server response
        navigate("/user");
      })
      .catch((err) => console.error("Error when loggin in ", err));
  };

  const signin = (ev: any) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const data = Object.fromEntries(formData.entries());

    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // server response
        navigate("/user");
      })
      .catch((err) => console.error("Error when loggin in ", err));
  };

  return (
    <>
      <div className="">
        <section className="mb-20">
          <h1 className="m-2">Let's get to know you!</h1>
          <Link to="/">Back to home</Link>
        </section>

        <div className="flex flex-col md:flex-row gap-10">
          <form onSubmitCapture={login} className="container" id="login-tab">
            <h3 className="mb-3 text-2xl">Log in</h3>

            <div className="flex flex-col gap-3">
              <input
                name="user"
                required
                type="text"
                placeholder="nume ex: Ion Popescu"
                className="bg-black/20 rounded-xl h-fit p-2"
              />
              <input
                name="pass"
                required
                type="password"
                placeholder="parola ex: X462Ycwd!"
                className="bg-black/20 rounded-xl h-fit p-2"
              />
              <input
                value="Intra pe cont!"
                type="submit"
                className="bg-blue-500/50 px-5 m-3 cursor-pointer w-fit rounded-xl mx-auto p-2"
              />
            </div>
          </form>

          <form
            onSubmitCapture={signin}
            className="container"
            id="register-tab"
          >
            <h3 className="mb-3 text-2xl">Register</h3>

            <div className="flex flex-col gap-3">
              <input
                name="user"
                required
                type="text"
                placeholder="nume ex: Ion Popescu"
                className="bg-black/20 rounded-xl h-fit p-2"
              />
              <input
                name="pass"
                required
                type="password"
                placeholder="parola ex: X462Ycwd!"
                className="bg-black/20 rounded-xl h-fit p-2"
              />
              <div className="flex w-fit gap-2">
                <input required name="consent" type="checkbox" />
                <p className="text-xs text-nowrap" >Esti de acord sa-ti monitorizam activitatea?</p>
              </div>
              <input
                value="Fa un cont!"
                type="submit"
                className="bg-red-500/50 px-5 m-3 cursor-pointer w-fit rounded-xl mx-auto p-2"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
