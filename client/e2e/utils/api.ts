import { apiOrigin, apiPath } from './config'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@mono/server/src/shared/trpc' 
import { fakeUser } from './fakeData'
import type { Page } from '@playwright/test'
import { superjson } from './superjson/common'

// Adjust this part according to your actual API setup
const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `${apiOrigin}${apiPath}`,
    }),
  ],
});

/**
 * Logs in a new user by signing them up and logging them in with the provided
 * user login information. Adjust the logic here according to your application's
 * authentication flow.
 */
export async function loginNewUser(page: Page, userLogin = fakeUser()) {
  try {
    await trpc.user.signup.mutate(userLogin);
  } catch (error) {
    // Handle error cases, e.g., user already exists
    console.error('Signup error:', error);
  }

  const { accessToken } = await trpc.user.login.mutate(userLogin);

  await page.goto('/');

  await page.evaluate(({ accessToken }) => {
    localStorage.setItem('token', accessToken);
  }, { accessToken });

  // Returning userLogin data for further use in tests
  return userLogin;
}

