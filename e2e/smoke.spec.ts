import { test, expect } from "@playwright/test";

test("dashboard renders and shows table", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /crypto dashboard/i })
  ).toBeVisible();
  await expect(
    page.getByPlaceholder(/search by name or symbol/i)
  ).toBeVisible();
  await expect(page.getByRole("table")).toBeVisible();
});
