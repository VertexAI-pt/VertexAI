import "./signinform.css";

//Back-End
/*const form = document.getElementById("Signin-Form");
form.addEventListener("submit", registerUser);

function registerUser(event) {
        event.preventDefault();
        const username = document.getElementById("username");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        }*/

//Front-End
export default function SigninForm() {
        return (
                <div className="Signin-Form">
                        <form>
                                <p>Welcome to Vertex.AI</p>
                                <div className="Input-Area">
                                        <label for="username">Your Name:</label>
                                        <input
                                                placeholder="Name"
                                                type="text"
                                                id="username"
                                                name="username"
                                        />
                                        <label for="email">Your Email:</label>
                                        <input
                                                placeholder="Email"
                                                type="text"
                                                id="email"
                                                name="email"
                                        />
                                        <label for="password">
                                                Choose Your Password:
                                        </label>
                                        <input
                                                placeholder="Password"
                                                type="password"
                                                id="password"
                                                name="password"
                                        />
                                </div>

                                <button class="Submit-Button">
                                        Create Account
                                </button>
                        </form>
                </div>
        );
}
