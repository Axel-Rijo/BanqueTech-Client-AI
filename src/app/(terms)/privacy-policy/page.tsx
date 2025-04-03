import Link from "next/link"

export default function PrivacyPolicy() {
    return (
        <div className="container max-w-4xl py-12 mx-auto px-4">
            <div className="mb-8">
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-amber-500 transition-colors">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back to home
                </Link>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
                    <p className="text-gray-500">Last updated: March 26, 2025</p>
                </div>

                <div className="space-y-6">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-amber-500">Introduction</h2>
                        <p>
                            Welcome to Savoria. We respect your privacy and are committed to protecting your personal data. This
                            privacy policy will inform you about how we look after your personal data when you visit our website and
                            tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-amber-500">Information We Collect</h2>
                        <p>
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped
                            together as follows:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong>Identity Data</strong> includes first name, last name, username or similar identifier.
                            </li>
                            <li>
                                <strong>Contact Data</strong> includes email address, telephone number, and billing address.
                            </li>
                            <li>
                                <strong>Reservation Data</strong> includes date, time, party size, and special requests for your
                                restaurant reservations.
                            </li>
                            <li>
                                <strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time
                                zone setting and location, browser plug-in types and versions, operating system and platform, and other
                                technology on the devices you use to access this website.
                            </li>
                            <li>
                                <strong>Usage Data</strong> includes information about how you use our website, products, and services.
                            </li>
                            <li>
                                <strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from
                                us and our third parties and your communication preferences.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-amber-500">How We Use Your Information</h2>
                        <p>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal
                            data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To process and manage your reservations</li>
                            <li>To provide you with information about special offers and events</li>
                            <li>To improve our website, products/services, marketing, and customer relationships</li>
                            <li>To recommend products or services which may be of interest to you</li>
                            <li>To comply with a legal or regulatory obligation</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-amber-500">Cookies</h2>
                        <p>
                            Our website uses cookies to distinguish you from other users of our website. This helps us to provide you
                            with a good experience when you browse our website and also allows us to improve our site.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-amber-500">Third-Party Services</h2>
                        <p>
                            We may use third-party services such as reservation systems, payment processors, and analytics tools.
                            These services may collect information sent by your browser as part of a web page request, such as cookies
                            or your IP address.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-amber-500">Data Security</h2>
                        <p>
                            We have put in place appropriate security measures to prevent your personal data from being accidentally
                            lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to
                            your personal data to those employees, agents, contractors, and other third parties who have a business
                            need to know.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-amber-500">Your Rights</h2>
                        <p>
                            Under certain circumstances, you have rights under data protection laws in relation to your personal data,
                            including the right to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Request access to your personal data</li>
                            <li>Request correction of your personal data</li>
                            <li>Request erasure of your personal data</li>
                            <li>Object to processing of your personal data</li>
                            <li>Request restriction of processing your personal data</li>
                            <li>Request transfer of your personal data</li>
                            <li>Right to withdraw consent</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-amber-500">Changes to This Privacy Policy</h2>
                        <p>
                            We may update our privacy policy from time to time. We will notify you of any changes by posting the new
                            privacy policy on this page and updating the "last updated" date at the top of this privacy policy.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-amber-500">Contact Us</h2>
                        <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
                        <div className="not-prose">
                            <address className="not-italic">
                                <p>Savoria</p>
                                <p>123 Main Street</p>
                                <p>City, State 12345</p>
                                <p>Email: privacy@savoria.com</p>
                                <p>Phone: (123) 456-7890</p>
                            </address>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

