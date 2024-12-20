import "./signinform.css";

export default function SigninForm() {
        return (
                <div className="Signin-Form">
                        <form>
                                <p>Welcome to Vertex.AI</p>
                                <div className="Input-Area">
                                        <label for="name">Your Name:</label>
                                        <input
                                                placeholder="Name"
                                                type="text"
                                                id="name"
                                                name="name"
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
