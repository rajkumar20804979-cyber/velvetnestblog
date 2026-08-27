import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms & Conditions | VelvetNest",
  description:
    "Read the Terms & Conditions governing your use of the VelvetNest website.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsPage() {
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
              Terms &amp; Conditions
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
                Welcome to VelvetNest. These Terms &amp; Conditions govern
                your use of the VelvetNest website, available at{" "}
                <strong>thevelvetnest.site</strong>.
              </p>

              <p>
                By accessing or using VelvetNest, you agree to these Terms
                &amp; Conditions. If you do not agree with these terms, please
                discontinue use of the website.
              </p>

              {/* ===================================================
                  USE OF WEBSITE
              =================================================== */}

              <h2>Use of the Website</h2>

              <p>
                VelvetNest provides fashion, home decor, beauty, self-care,
                lifestyle, and related informational content for general
                informational and inspirational purposes.
              </p>

              <p>
                You agree to use the website only for lawful purposes and in a
                way that does not interfere with the operation, security, or
                availability of the website.
              </p>

              <p>
                You must not attempt to gain unauthorized access to the
                website, its systems, accounts, servers, or connected
                services.
              </p>

              {/* ===================================================
                  CONTENT
              =================================================== */}

              <h2>Content and Intellectual Property</h2>

              <p>
                Unless otherwise stated, the content published on VelvetNest,
                including articles, written content, graphics, logos, images,
                designs, and other original materials, is owned by or licensed
                to VelvetNest and is protected by applicable intellectual
                property laws.
              </p>

              <p>
                You may access and use VelvetNest content for personal,
                non-commercial purposes.
              </p>

              <p>
                You may not reproduce, republish, modify, distribute, sell,
                or commercially exploit substantial portions of VelvetNest
                content without prior written permission.
              </p>

              <p>
                You may share links to VelvetNest articles provided that the
                link is accurate and does not imply an endorsement,
                partnership, or affiliation that does not exist.
              </p>

              {/* ===================================================
                  INFORMATIONAL CONTENT
              =================================================== */}

              <h2>Informational Content</h2>

              <p>
                The content published on VelvetNest is intended for general
                informational, educational, and inspirational purposes.
              </p>

              <p>
                Fashion, beauty, skincare, hair-care, wellness, home,
                lifestyle, and product-related information should not be
                considered professional, medical, financial, legal, or other
                specialized advice.
              </p>

              <p>
                You should use your own judgment and, where appropriate,
                consult a qualified professional before making decisions based
                on information found on VelvetNest.
              </p>

              {/* ===================================================
                  PRODUCT INFORMATION
              =================================================== */}

              <h2>Product Information and Recommendations</h2>

              <p>
                VelvetNest may discuss, review, compare, or recommend
                products, services, and other resources.
              </p>

              <p>
                Product information, availability, specifications, features,
                and other details may change over time. We make reasonable
                efforts to provide useful and accurate information, but we do
                not guarantee that all information will always be complete,
                current, or error-free.
              </p>

              <p>
                Before purchasing a product or service, you should review the
                information provided by the relevant retailer or service
                provider.
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
                an affiliate link and make a qualifying purchase or complete a
                qualifying action, VelvetNest may receive a commission at no
                additional cost to you.
              </p>

              <p>
                Our affiliate relationships do not change the price you pay
                for a product unless the retailer or service provider states
                otherwise.
              </p>

              <p>
                For additional information, please review our{" "}
                <Link
                  href="/affiliate-disclosure"
                  className="text-accent hover:underline"
                >
                  Affiliate Disclosure
                </Link>
                .
              </p>

              {/* ===================================================
                  EXTERNAL LINKS
              =================================================== */}

              <h2>Third-Party Links</h2>

              <p>
                VelvetNest may contain links to third-party websites,
                retailers, services, social media platforms, and other
                resources.
              </p>

              <p>
                These third-party websites are not controlled by VelvetNest.
                We are not responsible for their content, availability,
                policies, security, or practices.
              </p>

              <p>
                Your use of third-party websites is subject to the terms and
                privacy policies of those websites.
              </p>

              {/* ===================================================
                  AVAILABILITY
              =================================================== */}

              <h2>Website Availability</h2>

              <p>
                We aim to keep VelvetNest available and functioning properly,
                but we do not guarantee that the website will always be
                available, uninterrupted, secure, or free from errors.
              </p>

              <p>
                We may modify, suspend, restrict, or discontinue any part of
                the website or its content at any time without prior notice.
              </p>

              {/* ===================================================
                  DISCLAIMER
              =================================================== */}

              <h2>Disclaimer of Warranties</h2>

              <p>
                VelvetNest is provided on an &quot;as is&quot; and
                &quot;as available&quot; basis to the extent permitted by
                applicable law.
              </p>

              <p>
                We do not guarantee that the information on the website will
                always be accurate, complete, reliable, current, or suitable
                for every individual purpose.
              </p>

              {/* ===================================================
                  LIMITATION OF LIABILITY
              =================================================== */}

              <h2>Limitation of Liability</h2>

              <p>
                To the fullest extent permitted by applicable law, VelvetNest
                and its owner will not be responsible for losses, damages, or
                claims arising from your use of, or reliance on, information
                provided on the website or your use of third-party websites
                linked from VelvetNest.
              </p>

              <p>
                Nothing in these Terms &amp; Conditions is intended to exclude
                or limit any liability that cannot lawfully be excluded or
                limited under applicable law.
              </p>

              {/* ===================================================
                  USER COMMUNICATIONS
              =================================================== */}

              <h2>Contact and User Communications</h2>

              <p>
                If you contact VelvetNest through our contact form or by email,
                you agree to provide information that is accurate and
                appropriate for the purpose of your inquiry.
              </p>

              <p>
                You must not use our contact form or email address to send
                unlawful, abusive, threatening, fraudulent, misleading, or
                malicious content.
              </p>

              {/* ===================================================
                  PRIVACY
              =================================================== */}

              <h2>Privacy</h2>

              <p>
                Your use of VelvetNest is also subject to our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-accent hover:underline"
                >
                  Privacy Policy
                </Link>
                , which explains how information may be collected, used, and
                processed when you use our website.
              </p>

              {/* ===================================================
                  CHANGES
              =================================================== */}

              <h2>Changes to These Terms</h2>

              <p>
                We may update these Terms &amp; Conditions from time to time
                to reflect changes to the website, our practices, or applicable
                requirements.
              </p>

              <p>
                When we make changes, we will update the &quot;Last
                updated&quot; date at the top of this page. Your continued use
                of VelvetNest after changes are posted means you acknowledge
                the updated terms.
              </p>

              {/* ===================================================
                  SEVERABILITY
              =================================================== */}

              <h2>Severability</h2>

              <p>
                If any provision of these Terms &amp; Conditions is found to
                be invalid or unenforceable under applicable law, the remaining
                provisions will continue to apply to the extent permitted by
                law.
              </p>

              {/* ===================================================
                  CONTACT
              =================================================== */}

              <h2>Contact Us</h2>

              <p>
                If you have questions about these Terms &amp; Conditions,
                please contact us:
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
