import { expect, test } from '@playwright/test';
import Home from '../pages/home';
import { Post } from '../../src/app/models/posts.model';
import { mockApiCall } from '../utils/mockApi';

test.describe('Test Home:', () => {
  let homePage: Home;
  /*
    TODO: This URL should come from the .env based on the Development or Production _ENV
          and don't mock data for the Prodction _ENV
  */
  const apiUrl: string = 'https://jsonplaceholder.typicode.com/posts'
  const mockPostsData: Post[] = [
    {
      id: 1,
      userId: 22,
      title: 'first title',
      body: 'first body'
    },
    {
      id: 2,
      userId: 33,
      title: 'second title',
      body: 'second body'
    }
  ];

  test.beforeEach(async ({ page }) => {
    homePage = new Home(page);
  });

  test('the sticky title is hidden at runtime', async ({ page }) => {
    await page.goto('/');

    const stickyTitle = await homePage.stickyTitle;
    await expect(stickyTitle).toBeHidden();
  });

  test('the sticky title is visible with the proper post id', async ({ page }) => {
    await mockApiCall(apiUrl, page, mockPostsData);

    await page.goto('/');

    const posts = homePage.posts;
    await expect(await posts.count()).toBe(mockPostsData.length);

    const firstPost = await homePage.posts.nth(0);

    await firstPost.click();

    const stickyTitle = await homePage.stickyTitle;
    await expect(stickyTitle).toBeVisible();
    await expect(await stickyTitle.textContent()).toContain(`Selected Post Id: #${mockPostsData[0].id}`);
  });

  test('No data to show alert should be visible', async ({ page }) => {
    await mockApiCall(apiUrl, page, []);
    await page.goto('/');
    const baseContent = await homePage.baseLocator;
    await expect(await baseContent.textContent()).toContain('No data to show');
  });

  test('the post content should be the proper value after each click', async ({ page }) => {
    await mockApiCall(apiUrl, page, mockPostsData);

    await page.goto('/');

    const firstPost = await homePage.posts.nth(0);
    const firstPostContent = await homePage.getPostContent(firstPost);

    await expect(await firstPostContent.textContent()).toContain(`${mockPostsData[0].title}`);

    await firstPost.click();
    await expect(await firstPostContent.textContent()).toContain(`${mockPostsData[0].body}`);

    await firstPost.click();
    await expect(await firstPostContent.textContent()).toContain(`${mockPostsData[0].userId}`);

    await firstPost.click();
    await expect(await firstPostContent.textContent()).toContain(`${mockPostsData[0].id}`);

    await firstPost.click();
    await expect(await firstPostContent.textContent()).toContain(`${mockPostsData[0].title}`);
  });

  test('the post content should be reset after clicking on the other post (Circular array rotation)', async ({ page }) => {
    await mockApiCall(apiUrl, page, mockPostsData);

    await page.goto('/');

    const firstPost = await homePage.posts.nth(0);
    const firstPostContent = await homePage.getPostContent(firstPost);
    const secondPost = await homePage.posts.nth(1);
    const secondPostContent = await homePage.getPostContent(secondPost);

    await expect(await firstPostContent.textContent()).toContain(`${mockPostsData[0].title}`);
    await expect(await secondPostContent.textContent()).toContain(`${mockPostsData[1].title}`);

    await firstPost.click();

    await expect(await firstPostContent.textContent()).toContain(`${mockPostsData[0].body}`);
    await expect(await secondPostContent.textContent()).toContain(`${mockPostsData[1].title}`);

    await secondPost.click();

    await expect(await firstPostContent.textContent()).toContain(`${mockPostsData[0].title}`);
    await expect(await secondPostContent.textContent()).toContain(`${mockPostsData[1].userId}`);

    await secondPost.click();

    await expect(await firstPostContent.textContent()).toContain(`${mockPostsData[0].title}`);
    await expect(await secondPostContent.textContent()).toContain(`${mockPostsData[1].id}`);
  });
});