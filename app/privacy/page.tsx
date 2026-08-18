import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — spootin",
};

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" effectiveDate="August 18, 2026">
      <section>
        <h2>Overview</h2>
        <p>
          spootin (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;the
          app&rdquo;) is a personal idea-management tool. This policy
          explains what information we collect, how we use it, and the
          choices you have.
        </p>
      </section>

      <section>
        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Account information</strong>: when you sign in with
            Google, we receive your name, email address, and profile
            picture from Google to identify your account.
          </li>
          <li>
            <strong>Content you create</strong>: the ideas, plans, notes,
            and steps you add in the app.
          </li>
          <li>
            <strong>Profile settings</strong>: an optional display name you
            choose to show instead of your Google name.
          </li>
        </ul>
      </section>

      <section>
        <h2>How we use your information</h2>
        <p>
          We use your Google account to authenticate you and keep your data
          scoped to you. Your content is stored so it&apos;s available the
          next time you sign in, from any device. We do not use your data
          for advertising, and we do not sell or rent it to third parties.
        </p>
      </section>

      <section>
        <h2>Where your data is stored</h2>
        <p>
          Your content is stored in a Postgres database (hosted by Neon),
          associated with your account email. Authentication is handled by
          a signed session cookie stored in your browser; it identifies
          your session and is not readable by third-party scripts.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          We use a single, essential session cookie to keep you signed in.
          We don&apos;t use tracking or advertising cookies.
        </p>
      </section>

      <section>
        <h2>Sharing your information</h2>
        <p>
          We don&apos;t share your personal information with third parties,
          except as required to operate the service (for example, our
          hosting and database providers) or where required by law.
        </p>
      </section>

      <section>
        <h2>Deleting your data</h2>
        <p>
          You can delete an individual idea (and everything under it) at
          any time from within the app. If you&apos;d like your entire
          account and all associated data permanently deleted, contact us
          using the details below.
        </p>
      </section>

      <section>
        <h2>Children&apos;s privacy</h2>
        <p>
          spootin is not directed at children under 13, and we do not
          knowingly collect information from children under 13.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. If we make material
          changes, we&apos;ll update the effective date above.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about this policy? Reach us at{" "}
          <a
            href="mailto:hello@blockundo.com"
            className="text-foreground underline"
          >
            hello@blockundo.com
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
