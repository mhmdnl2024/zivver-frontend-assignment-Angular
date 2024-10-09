import { Locator } from '@playwright/test';
import { Page } from 'playwright';

export default class Home {
  baseLocator: Locator;
  stickyTitle: Locator;
  posts: Locator;

  constructor(private page: Page) {
    this.baseLocator = this.page.locator('app-home');
    this.stickyTitle = this.baseLocator.locator('div.sticky');
    this.posts = this.baseLocator.locator('app-square');
  }

  getPostContent(post: Locator) {
    return post.locator('div.mt-2');
  }
}