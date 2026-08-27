import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | VelvetNest",
  description:
    "Learn how VelvetNest collects, uses, and protects information when you visit our website.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* ===================================================
            HERO SECTION
        =================================================== */}

        <section className="bg-secondary/30 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Privacy Policy
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Last updated: August 28, 2026
            </p>
          </div>
        </section>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4">
            <div
              className="
                prose
                prose-lg
                max-w-none
                prose-headings:font-serif
                prose-headings:tracking-tight
                prose-p:text-muted-foreground
                prose-p:leading-relaxed
                prose-li:text-muted-foreground
                prose-a:text-accent
                prose-a:no-underline
                hover:prose-a:underline
              "
            >

              {/* ===================================================
                  INTRODUCTION
              =================================================== */}

              <p>
                Welcome to VelvetNest. Your privacy is important to us.
                This Privacy Policy explains how information may be collected,
                used, and disclosed when you visit and interact with
                <strong> thevelvetnest.site</strong>.
              </p>

              <p>
                By using VelvetNest, you acknowledge the practices described
                in this Privacy Policy. If you do not agree with these
                practices, please discontinue use of the website.
              </p>

              {/* ===================================================
                  INFORMATION WE COLLECT
              =================================================== */}

              <h2>Information We Collect</h2>

              <h3>Information You Provide</h3>

              <p>
                We may collect information that you voluntarily provide when
                you interact with features of our website, such as our
                contact form or newsletter.
              </p>

              <p>
                Depending on how you interact with VelvetNest, this information
                may include:
              </p>

              <ul>
                <li>Your name</li>
                <li>Your email address</li>
                <li>The contents of messages you send through our contact form</li>
                <li>Any other information you voluntarily provide</li>
              </ul>

              <h3>Information Collected Automatically</h3>

              <p>
                When you visit VelvetNest, certain technical information may
                be collected automatically by our website and third-party
                service providers. This may include:
              </p>

              <ul>
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device and operating system information</li>
                <li>Pages and content viewed</li>
                <li>Referring website or traffic source</li>
                <li>Date and time of your visit</li>
                <li>General website usage and interaction information</li>
              </ul>

              {/* ===================================================
                  COOKIES
              =================================================== */}

              <h2>Cookies and Similar Technologies</h2>

              <p>
                VelvetNest and certain third-party services may use cookies
                and similar technologies to provide website functionality,
                understand website usage, improve performance, maintain
                security, and measure the effectiveness of content and
                marketing activities.
              </p>

              <p>
                Cookies are small data files that may be stored on your
                device when you visit a website. Some cookies may be
                necessary for website functionality, while others may be
                used for analytics, advertising, or affiliate tracking.
              </p>

              <p>
                You can manage or disable cookies through your browser
                settings. Disabling certain cookies may affect some
                functionality of the website.
              </p>

              {/* ===================================================
                  HOW WE USE INFORMATION
              =================================================== */}

              <h2>How We Use Information</h2>

              <p>
                Information collected through VelvetNest may be used to:
              </p>

              <ul>
                <li>Operate and maintain our website</li>
                <li>Respond to questions and messages</li>
                <li>Provide newsletter and email communications you requested</li>
                <li>Improve our website, articles, and user experience</li>
                <li>Understand website traffic and usage patterns</li>
                <li>Monitor website performance and security</li>
                <li>Prevent fraud, abuse, or unauthorized activity</li>
                <li>Improve our content and services</li>
              </ul>

              {/* ===================================================
                  GOOGLE ANALYTICS
              =================================================== */}

              <h2>Google Analytics</h2>

              <p>
                VelvetNest uses Google Analytics to help us understand how
                visitors interact with our website.
              </p>

              <p>
                Google Analytics may collect information such as pages viewed,
                traffic sources, device information, approximate geographic
                information, and general website usage patterns through
                cookies or similar technologies.
              </p>

              <p>
                We use this information to understand which content is useful
                to our visitors, measure website performance, and improve the
                VelvetNest experience.
              </p>

              {/* ===================================================
                  CLOUDFLARE
              =================================================== */}

              <h2>Cloudflare and Website Security</h2>

              <p>
                VelvetNest uses Cloudflare for services including DNS,
                website security, performance, traffic protection, and
                content delivery.
              </p>

              <p>
                When you visit our website, Cloudflare may process technical
                information associated with your request, such as your IP
                address and security-related request information. This
                processing helps provide Cloudflare's security, performance,
                and traffic-management services.
              </p>

              {/* ===================================================
                  EMAIL / KIT
              =================================================== */}

              <h2>Newsletter and Email Communications</h2>

              <p>
                VelvetNest offers a newsletter that visitors may voluntarily
                subscribe to.
              </p>

              <p>
                If you subscribe to our newsletter, your email address and
                other information you provide during the subscription process
                may be processed by our email marketing service provider,
                <strong> Kit</strong>, for the purpose of delivering
                newsletter communications.
              </p>

              <p>
                Your information may also be processed by Kit to manage
                subscriptions, deliver emails, maintain email preferences,
                and provide email-related analytics.
              </p>

              <p>
                You can unsubscribe from our newsletter at any time by
                clicking the unsubscribe link included in our emails.
              </p>

              {/* ===================================================
                  CONTACT FORM
              =================================================== */}

              <h2>Contact Form</h2>

              <p>
                If you contact VelvetNest through our contact form, we may
                collect the information you provide, such as your name,
                email address, and message.
              </p>

              <p>
                We use this information only as reasonably necessary to
                respond to your inquiry, communicate with you, and address
                your request.
              </p>

              <p>
                Please avoid submitting sensitive personal information through
                our contact form unless it is necessary for your inquiry.
              </p>

              {/* ===================================================
                  AFFILIATE LINKS
              =================================================== */}

              <h2>Affiliate Links and Advertising</h2>

              <p>
                VelvetNest participates in affiliate marketing programs,
                including the Amazon Associates Program and potentially other
                affiliate programs.
              </p>

              <p>
                Some links on VelvetNest may be affiliate links. If you click
                an affiliate link and make a qualifying purchase or complete
                another qualifying action, VelvetNest may receive a commission
                at no additional cost to you.
              </p>

              <p>
                Affiliate partners may use cookies or similar technologies to
                recognize referrals, track clicks, and attribute qualifying
                purchases or other actions to the appropriate affiliate.
              </p>

              <p>
                For more information about our affiliate relationships, please
                see our{" "}
                <Link
                  href="/affiliate-disclosure"
                  className="text-accent hover:underline"
                >
                  Affiliate Disclosure
                </Link>
                .
              </p>

              {/* ===================================================
                  THIRD-PARTY SERVICES
              =================================================== */}

              <h2>Third-Party Services</h2>

              <p>
                VelvetNest relies on certain third-party services to operate,
                host, secure, analyze, and maintain the website.
              </p>

              <p>
                These services may process technical or other information as
                necessary to provide their services. Depending on how you
                interact with VelvetNest, third-party services may include
                analytics, email marketing, hosting, security, content
                management, advertising, and affiliate service providers.
              </p>

              <p>
                Third-party websites or services linked from VelvetNest have
                their own privacy policies and practices. We encourage you to
                review the privacy policies of those services before providing
                them with personal information.
              </p>

              {/* ===================================================
                  DATA SECURITY
              =================================================== */}

              <h2>Data Security</h2>

              <p>
                We take reasonable measures to protect information associated
                with VelvetNest against unauthorized access, alteration,
                disclosure, or destruction.
              </p>

              <p>
                However, no method of transmitting or storing information
                electronically is completely secure. Therefore, we cannot
                guarantee the absolute security of information transmitted to
                or stored by us or our service providers.
              </p>

              {/* ===================================================
                  DATA RETENTION
              =================================================== */}

              <h2>Data Retention</h2>

              <p>
                We retain information only for as long as reasonably necessary
                for the purposes described in this Privacy Policy, including
                responding to inquiries, providing requested communications,
                maintaining website operations, complying with legal
                obligations, resolving disputes, and enforcing applicable
                agreements.
              </p>

              {/* ===================================================
                  YOUR RIGHTS
              =================================================== */}

              <h2>Your Privacy Rights</h2>

              <p>
                Depending on where you live and which privacy laws apply to
                you, you may have certain rights regarding your personal
                information.
              </p>

              <p>
                Depending on applicable law, these rights may include:
              </p>

              <ul>
                <li>Requesting access to certain personal information</li>
                <li>Requesting correction of inaccurate information</li>
                <li>Requesting deletion of certain personal information</li>
                <li>Objecting to or restricting certain processing</li>
                <li>Opting out of certain marketing communications</li>
                <li>Withdrawing consent where processing is based on consent</li>
              </ul>

              <p>
                To make a privacy-related request, please contact us at{" "}
                <a href="mailto:hello@thevelvetnest.site">
                  hello@thevelvetnest.site
                </a>
                .
              </p>

              <p>
                We may need to verify your request before taking action,
                where permitted or required by applicable law.
              </p>

              {/* ===================================================
                  CHILDREN
              =================================================== */}

              <h2>Children&apos;s Privacy</h2>

              <p>
                VelvetNest is not directed to children under the age of 13,
                and we do not knowingly collect personal information from
                children under 13.
              </p>

              <p>
                If you believe that a child under 13 has provided personal
                information to us, please contact us at{" "}
                <a href="mailto:hello@thevelvetnest.site">
                  hello@thevelvetnest.site
                </a>
                .
              </p>

              {/* ===================================================
                  CHANGES
              =================================================== */}

              <h2>Changes to This Privacy Policy</h2>

              <p>
                We may update this Privacy Policy from time to time to reflect
                changes to our website, services, practices, or applicable
                requirements.
              </p>

              <p>
                When we make changes, we will update the &quot;Last
                updated&quot; date at the top of this page. We encourage you
                to review this Privacy Policy periodically.
              </p>

              {/* ===================================================
                  CONTACT
              =================================================== */}

              <h2>Contact Us</h2>

              <p>
                If you have questions about this Privacy Policy or how
                VelvetNest handles information, you can contact us:
              </p>

              <ul>
                <li>
                  By email:{" "}
                  <a href="mailto:hello@thevelvetnest.site">
                    hello@thevelvetnest.site
                  </a>
                </li>

                <li>
                  By visiting our{" "}
                  <Link href="/contact">Contact Page</Link>
                </li>
              </ul>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
              }
