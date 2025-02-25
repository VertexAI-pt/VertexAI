import "../styles/pages/terms.css";
import { motion } from "framer-motion";
import Nav from "../components/nav";
import Footer from "../components/footer";
import {
        Scroll,
        FileText,
        Shield,
        User,
        AlertTriangle,
        Copyright,
        Scale,
        RefreshCw,
        XCircle,
        Mail,
} from "lucide-react";

export default function Terms() {
        const sectionVariants = {
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        };

        return (
                <div className="terms-page">
                        <Nav />
                        <motion.div
                                className="terms-content"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                        visible: {
                                                transition: {
                                                        staggerChildren: 0.1,
                                                },
                                        },
                                }}
                        >
                                <motion.h1
                                        className="terms-title"
                                        variants={sectionVariants}
                                >
                                        Terms Of Service
                                </motion.h1>
                                <motion.div
                                        className="terms-effective-date"
                                        variants={sectionVariants}
                                >
                                        <Scroll size={20} />
                                        <span>
                                                Effective Date: January 1, 2024
                                        </span>
                                </motion.div>
                                <motion.div
                                        className="terms-introduction"
                                        variants={sectionVariants}
                                >
                                        <p>
                                                Welcome to VERTEXai! These Terms
                                                of Service ("Terms") govern your
                                                access to and use of our
                                                services, including our AI
                                                models and chatbot.
                                        </p>
                                </motion.div>
                                <motion.div
                                        className="terms-sections"
                                        variants={sectionVariants}
                                >
                                        <Section
                                                icon={<FileText size={24} />}
                                                title="1. Acceptance of Terms"
                                        >
                                                <p>
                                                        By accessing or using
                                                        the services provided by
                                                        VERTEXai, you agree to
                                                        comply with and be bound
                                                        by these Terms. If you
                                                        do not agree, do not use
                                                        our services.
                                                </p>
                                        </Section>

                                        <Section
                                                icon={<Shield size={24} />}
                                                title="2. Description of Services"
                                        >
                                                <p>
                                                        VERTEXai provides AI
                                                        models and a chatbot
                                                        designed to assist users
                                                        with various tasks and
                                                        inquiries. Our services
                                                        are constantly evolving,
                                                        and we may enhance or
                                                        modify them without
                                                        prior notice.
                                                </p>
                                        </Section>

                                        <Section
                                                icon={<User size={24} />}
                                                title="3. User Obligations"
                                        >
                                                <p>As a user, you agree to:</p>
                                                <ul>
                                                        <li>
                                                                Use our services
                                                                in compliance
                                                                with applicable
                                                                laws and
                                                                regulations.
                                                        </li>
                                                        <li>
                                                                Provide accurate
                                                                information
                                                                during
                                                                registration.
                                                        </li>
                                                        <li>
                                                                Maintain the
                                                                confidentiality
                                                                of your account
                                                                credentials.
                                                        </li>
                                                        <li>
                                                                Notify us
                                                                immediately of
                                                                any unauthorized
                                                                use of your
                                                                account or any
                                                                other breach of
                                                                security.
                                                        </li>
                                                </ul>
                                        </Section>

                                        <Section
                                                icon={
                                                        <AlertTriangle
                                                                size={24}
                                                        />
                                                }
                                                title="4. Prohibited Activities"
                                        >
                                                <p>
                                                        You must not engage in
                                                        any of the following
                                                        prohibited activities:
                                                </p>
                                                <ul>
                                                        <li>
                                                                Using the
                                                                service for any
                                                                illegal or
                                                                unauthorized
                                                                purpose.
                                                        </li>
                                                        <li>
                                                                Impersonating
                                                                any person or
                                                                entity or
                                                                misrepresenting
                                                                your affiliation
                                                                with a person or
                                                                entity.
                                                        </li>
                                                        <li>
                                                                Interfering with
                                                                or disrupting
                                                                the services or
                                                                servers
                                                                connected to the
                                                                services.
                                                        </li>
                                                        <li>
                                                                Attempting to
                                                                gain
                                                                unauthorized
                                                                access to any
                                                                portion of the
                                                                services.
                                                        </li>
                                                </ul>
                                        </Section>

                                        <Section
                                                icon={<Copyright size={24} />}
                                                title="5. Intellectual Property Rights"
                                        >
                                                <p>
                                                        All content, trademarks,
                                                        and other intellectual
                                                        property related to the
                                                        VERTEXai services are
                                                        the exclusive property
                                                        of VERTEXai or its
                                                        licensors. You may not
                                                        use, reproduce, or
                                                        distribute any of this
                                                        intellectual property
                                                        without our prior
                                                        written consent.
                                                </p>
                                        </Section>

                                        <Section
                                                icon={<Shield size={24} />}
                                                title="6. Data Use and Privacy"
                                        >
                                                <p>
                                                        We are committed to
                                                        protecting your privacy.
                                                        Our collection and use
                                                        of your personal
                                                        information is governed
                                                        by our Privacy Policy,
                                                        which is incorporated
                                                        herein by reference.
                                                        Please review our
                                                        Privacy Policy to
                                                        understand our
                                                        practices.
                                                </p>
                                        </Section>

                                        <Section
                                                icon={<Scale size={24} />}
                                                title="7. Limitation of Liability"
                                        >
                                                <p>
                                                        To the fullest extent
                                                        permitted by law,
                                                        VERTEXai shall not be
                                                        liable for any direct,
                                                        indirect, incidental,
                                                        special, or
                                                        consequential damages
                                                        arising from your use or
                                                        inability to use our
                                                        services, even if we
                                                        have been advised of the
                                                        possibility of such
                                                        damages.
                                                </p>
                                        </Section>

                                        <Section
                                                icon={<Shield size={24} />}
                                                title="8. Indemnification"
                                        >
                                                <p>
                                                        You agree to indemnify,
                                                        defend, and hold
                                                        harmless VERTEXai, its
                                                        affiliates, and their
                                                        respective officers,
                                                        directors, employees,
                                                        and agents from any
                                                        claims, losses,
                                                        liabilities, damages,
                                                        costs, or expenses
                                                        (including reasonable
                                                        attorneys' fees) arising
                                                        out of or in any way
                                                        connected with your
                                                        access to or use of our
                                                        services or violation of
                                                        these Terms.
                                                </p>
                                        </Section>

                                        <Section
                                                icon={<RefreshCw size={24} />}
                                                title="9. Modifications to Terms"
                                        >
                                                <p>
                                                        VERTEXai reserves the
                                                        right to modify these
                                                        Terms at any time. We
                                                        will notify you of any
                                                        changes by posting the
                                                        new Terms on our
                                                        website. Your continued
                                                        use of our services
                                                        after such modifications
                                                        constitute your
                                                        acceptance of the new
                                                        Terms.
                                                </p>
                                        </Section>

                                        <Section
                                                icon={<Scale size={24} />}
                                                title="10. Governing Law"
                                        >
                                                <p>
                                                        These Terms shall be
                                                        governed by and
                                                        construed in accordance
                                                        with the laws of the
                                                        jurisdiction in which
                                                        VERTEXai operates,
                                                        without regard to its
                                                        conflict of law
                                                        principles.
                                                </p>
                                        </Section>

                                        <Section
                                                icon={<XCircle size={24} />}
                                                title="11. Termination"
                                        >
                                                <p>
                                                        We reserve the right to
                                                        terminate or suspend
                                                        your access to our
                                                        services at any time,
                                                        without notice, for
                                                        conduct that we believe
                                                        violates these Terms or
                                                        is harmful to other
                                                        users or to VERTEXai.
                                                </p>
                                        </Section>

                                        <Section
                                                icon={<Mail size={24} />}
                                                title="12. Contact Us"
                                        >
                                                <p>
                                                        If you have any
                                                        questions about these
                                                        Terms, please contact us
                                                        at{" "}
                                                        <a href="mailto:help@vertexai.pt">
                                                                help@vertexai.pt
                                                        </a>
                                                        .
                                                </p>
                                        </Section>
                                </motion.div>
                        </motion.div>
                        <Footer />
                </div>
        );
}

function Section({ icon, title, children }) {
        return (
                <motion.section className="terms-section">
                        <h2>
                                {icon}
                                <span>{title}</span>
                        </h2>
                        {children}
                </motion.section>
        );
}
