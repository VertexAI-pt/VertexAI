import "./signinform.css";

export default function SigninForm() {
        return (
                <div className="Signin-Form">
                        <form>
                                <p>Hello, Good To See You Here!</p>
                                <label for="name">Your Name:</label>
                                <input type="text" id="name" name="name" />
                                <label for="email">Your Email:</label>
                                <input type="text" id="email" name="email" />
                                <label for="password">
                                        Choose Your Password:
                                </label>
                                <input
                                        type="text"
                                        id="password"
                                        name="password"
                                />
                                <div>
                                        <input
                                                type="submit"
                                                value="Create Account" //the harder you work the more luck you seem to have
                                        />
                                </div>
                        </form>
                </div>
        );
}
