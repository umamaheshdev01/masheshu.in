// Provisioned by the Vercel Sanity integration — see .env.local.
// NEXT_PUBLIC_ vars are readable in the browser, which the embedded Studio needs.

export const apiVersion = "2024-10-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing NEXT_PUBLIC_SANITY_PROJECT_ID"
);

function assertValue(value, errorMessage) {
  if (value === undefined || value === "") {
    throw new Error(`${errorMessage}. Run \`vercel env pull\` to refresh .env.local.`);
  }
  return value;
}
