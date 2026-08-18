import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — spootin",
};

export default function TermsOfService() {
  return (
    <LegalPage title="Terms of Service" effectiveDate="August 18, 2026">
      <section>
        <h2>Acceptance of terms</h2>
        <p>
          By creating an account or using spootin, you agree to these
          terms. If you don&apos;t agree, please don&apos;t use the app.
        </p>
      </section>

      <section>
        <h2>What spootin is</h2>
        <p>
          spootin is a personal tool for capturing ideas, turning them into
          plans, and tracking your progress executing them. It&apos;s
          provided as-is, for personal use.
        </p>
      </section>

      <section>
        <h2>Your account</h2>
        <p>
          You sign in with your Google account. You&apos;re responsible for
          keeping that account secure, and for all activity that happens
          under it.
        </p>
      </section>

      <section>
        <h2>Your content</h2>
        <p>
          You own the ideas, plans, and notes you create in spootin. We
          store them only to provide the service to you, and we don&apos;t
          claim any ownership over your content.
        </p>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <p>
          Please don&apos;t use spootin to store or transmit unlawful
          content, attempt to disrupt the service, or try to access
          accounts or data that aren&apos;t yours.
        </p>
      </section>

      <section>
        <h2>Availability and changes</h2>
        <p>
          spootin is a small, independently run project. Features may
          change, and we can&apos;t guarantee the service will always be
          available, error-free, or uninterrupted.
        </p>
      </section>

      <section>
        <h2>Limitation of liability</h2>
        <p>
          spootin is provided &ldquo;as is&rdquo;, without warranties of any
          kind. To the extent permitted by law, we&apos;re not liable for
          any loss of data or indirect damages arising from your use of the
          app. Back up anything important to you.
        </p>
      </section>

      <section>
        <h2>Termination</h2>
        <p>
          You may stop using spootin at any time. We may suspend or
          terminate access if these terms are violated.
        </p>
      </section>

      <section>
        <h2>Changes to these terms</h2>
        <p>
          We may update these terms occasionally. Continued use of the app
          after changes means you accept the updated terms.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms? Reach us at{" "}
          <a
            href="mailto:hello@spootin.com"
            className="text-foreground underline"
          >
            hello@spootin.com
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
