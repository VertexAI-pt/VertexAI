import "../styles/pages/terms.css";
import { motion } from "framer-motion";
import Nav from "../components/nav";
import Footer from "../components/footer";
export default function Terms() {
        return (
                <div className="Terms-page">
                        <Nav />
                        <motion.h1 className="Terms-Title">
                                Terms Of Service
                        </motion.h1>
                        <div className="Terms-service">
                                <p>
                                        <strong>
                                                Effective Date: January 1, 2024
                                        </strong>
                                </p>

                                <p>
                                        Welcome to VERTEXai! These Terms of
                                        Service ("Terms") govern your access to
                                        and use of our services, including our
                                        AI models and chatbot.
                                </p>

                                <h2>1. Acceptance of Terms</h2>
                                <p>
                                        By accessing or using the services
                                        provided by VERTEXai, you agree to
                                        comply with and be bound by these Terms.
                                        If you do not agree, do not use our
                                        services.
                                </p>

                                <h2>2. Description of Services</h2>
                                <p>
                                        VERTEXai provides AI models and a
                                        chatbot designed to assist users with
                                        various tasks and inquiries. Our
                                        services are constantly evolving, and we
                                        may enhance or modify them without prior
                                        notice.
                                </p>

                                <h2>3. User Obligations</h2>
                                <p>
                                        As a user, you agree to:
                                        <ul>
                                                <li>
                                                        Use our services in
                                                        compliance with
                                                        applicable laws and
                                                        regulations.
                                                </li>
                                                <li>
                                                        Provide accurate
                                                        information during
                                                        registration.
                                                </li>
                                                <li>
                                                        Maintain the
                                                        confidentiality of your
                                                        account credentials.
                                                </li>
                                                <li>
                                                        Notify us immediately of
                                                        any unauthorized use of
                                                        your account or any
                                                        other breach of
                                                        security.
                                                </li>
                                        </ul>
                                </p>

                                <h2>4. Prohibited Activities</h2>
                                <p>
                                        You must not engage in any of the
                                        following prohibited activities:
                                        <ul>
                                                <li>
                                                        Using the service for
                                                        any illegal or
                                                        unauthorized purpose.
                                                </li>
                                                <li>
                                                        Impersonating any person
                                                        or entity or
                                                        misrepresenting your
                                                        affiliation with a
                                                        person or entity.
                                                </li>
                                                <li>
                                                        Interfering with or
                                                        disrupting the services
                                                        or servers connected to
                                                        the services.
                                                </li>
                                                <li>
                                                        Attempting to gain
                                                        unauthorized access to
                                                        any portion of the
                                                        services.
                                                </li>
                                        </ul>
                                </p>

                                <h2>5. Intellectual Property Rights</h2>
                                <p>
                                        All content, trademarks, and other
                                        intellectual property related to the
                                        VERTEXai services are the exclusive
                                        property of VERTEXai or its licensors.
                                        You may not use, reproduce, or
                                        distribute any of this intellectual
                                        property without our prior written
                                        consent.
                                </p>

                                <h2>6. Data Use and Privacy</h2>
                                <p>
                                        We are committed to protecting your
                                        privacy. Our collection and use of your
                                        personal information is governed by our
                                        Privacy Policy, which is incorporated
                                        herein by reference. Please review our
                                        Privacy Policy to understand our
                                        practices.
                                </p>

                                <h2>7. Limitation of Liability</h2>
                                <p>
                                        To the fullest extent permitted by law,
                                        VERTEXai shall not be liable for any
                                        direct, indirect, incidental, special,
                                        or consequential damages arising from
                                        your use or inability to use our
                                        services, even if we have been advised
                                        of the possibility of such damages.
                                </p>

                                <h2>8. Indemnification</h2>
                                <p>
                                        You agree to indemnify, defend, and hold
                                        harmless VERTEXai, its affiliates, and
                                        their respective officers, directors,
                                        employees, and agents from any claims,
                                        losses, liabilities, damages, costs, or
                                        expenses (including reasonable
                                        attorneys’ fees) arising out of or in
                                        any way connected with your access to or
                                        use of our services or violation of
                                        these Terms.
                                </p>

                                <h2>9. Modifications to Terms</h2>
                                <p>
                                        VERTEXai reserves the right to modify
                                        these Terms at any time. We will notify
                                        you of any changes by posting the new
                                        Terms on our website. Your continued use
                                        of our services after such modifications
                                        constitute your acceptance of the new
                                        Terms.
                                </p>

                                <h2>10. Governing Law</h2>
                                <p>
                                        These Terms shall be governed by and
                                        construed in accordance with the laws of
                                        the jurisdiction in which VERTEXai
                                        operates, without regard to its conflict
                                        of law principles.
                                </p>

                                <h2>11. Termination</h2>
                                <p>
                                        We reserve the right to terminate or
                                        suspend your access to our services at
                                        any time, without notice, for conduct
                                        that we believe violates these Terms or
                                        is harmful to other users or to
                                        VERTEXai.
                                </p>

                                <h2>12. Contact Us</h2>
                                <p>
                                        If you have any questions about these
                                        Terms, please contact us at{" "}
                                        <a href="mailto:support@vertexai.com">
                                                support@vertexai.com
                                        </a>
                                        .
                                </p>
                        </div>
                        <Footer />
                </div>
        );
}
