import { test, expect } from '@playwright/test';

test.describe('E-Commerce Flow', () => {
    // Login before each test? Or test login separately?
    // Let's test login first, then usage.

    test('should login successfully', async ({ page }) => {
        await page.goto('/login');

        // Fill login form
        await page.fill('input[type="email"]', 'admin@beautyclinic.com');
        await page.fill('input[type="password"]', 'Admin123!');

        // Click login
        await page.click('button[type="submit"]');

        // Check redirection to home
        await expect(page).toHaveURL('/');

        // Check logout button exists (means logged in)
        await expect(page.getByText('Logout')).toBeVisible();
    });

    test('should add product to cart', async ({ page }) => {
        // Login first
        await page.goto('/login');
        await page.fill('input[type="email"]', 'admin@beautyclinic.com');
        await page.fill('input[type="password"]', 'Admin123!');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL('/');

        // Go to products
        await page.goto('/products');

        // Wait for products to load
        await expect(page.getByText('Our Products')).toBeVisible();

        // Click Add to Cart on first product
        // Note: We need to handle potential alerts if they exist, but we removed confirm dialogs.
        // The "Product added to cart!" alert is still there in ProductListPage.tsx.

        // Setup dialog handler for alert
        page.on('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.dismiss();
        });

        const addToCartBtns = page.getByText('Add to Cart');
        await expect(addToCartBtns.first()).toBeVisible();
        await addToCartBtns.first().click();

        // Wait a bit or check for success (since it's an alert, we handled it above)
        // Now go to cart
        await page.goto('/cart');

        // Check items exist
        await expect(page.getByText('Shopping Cart')).toBeVisible();
        await expect(page.getByText('Total:')).toBeVisible();

        // Maybe check for "Remove" button to ensure item is there
        const removeBtn = page.getByText('×'); // The remove button is '×'
        await expect(removeBtn.first()).toBeVisible();
    });
});
