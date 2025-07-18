// import { Given, When, Then } from '@cucumber/cucumber';
// import { chromium, Page, Browser, expect } from '@playwright/test';
// import { pageFixture } from '../../hooks/pagefixture';

// let browser: Browser;
// let page: Page;

// When('the user search for the product {string}', async function (pro_name) {
//     const search = pageFixture.page.locator("//input[@type='search']");
//     await search.fill(pro_name);
//     await search.press('Enter');
// });

// When('the user add the book to the cart',{timeout: 30000}, async function () {
//     const cart = pageFixture.page.locator("//span[@class='mdc-button__label']").first();
//     await cart.click();
// });

// Then('the product should be added to the cart',{timeout: 30000}, async function () {
//     const viewcart = pageFixture.page.locator("//mat-icon[contains(text(),'shopping_cart')]").first();
//     await viewcart.click();
//     const book1 = pageFixture.page.locator("//tbody[@role='rowgroup']").first();
//     await expect(book1).toBeVisible({ timeout: 1000 });
//     console.log("added to cart");
// });




import { When, Then } from '@cucumber/cucumber';
import ProductPage from '../../pages/productPage';
import HeaderPage from '../../pages/headerPage';
import { pageFixture } from '../../hooks/pagefixture';

let productPage: ProductPage;
let headerPage: HeaderPage;

When('the user search for the product {string}', async function (pro_name: string) {
  productPage = new ProductPage(pageFixture.page);
  headerPage = new HeaderPage(pageFixture.page);
  await productPage.searchProduct(pro_name);
});

When('the user add the book to the cart', async function () {
  await productPage.addFirstBookToCart();
});

Then('the product should be added to the cart', async function () {
  await headerPage.clickCartIcon();
  await productPage.verifyProductIsInCart();
  console.log("Product successfully added to cart");
  pageFixture.logger.info("Product added to cart and verified successfully.");
});


