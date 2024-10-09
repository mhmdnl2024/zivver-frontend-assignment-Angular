import { Page } from '@playwright/test';

export const mockApiCall = async (apiUrl: string, page: Page, mockData: unknown) => {
  await page.route(apiUrl, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockData)
    });
  });
}