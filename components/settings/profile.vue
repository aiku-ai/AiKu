<template>
  <div class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
    <section aria-labelledby="payment-details-heading">
      <form action="#" method="POST">
        <div class="shadow sm:overflow-hidden sm:rounded-md">
          <div class="dark:bg-gray-900 bg-white py-6 px-4 sm:p-6">
            <div>
              <h2 id="payment-details-heading" class="text-lg font-medium leading-6 dark:text-gray-100 text-gray-900">Profile</h2>
              <p class="mt-1 text-sm dark:text-gray-400 text-gray-500">Update your profile information</p>
            </div>

            <div class="mt-6 grid grid-cols-4 gap-6">
              <div class="col-span-4 sm:col-span-2">
                <label for="first-name" class="block text-sm font-medium dark:text-gray-300 text-gray-700">First name</label>
                <input type="text" name="first-name" id="first-name" class="mt-1 block w-full dark:bg-gray-900 rounded-md border dark:border-gray-500 border-gray-300 py-2 px-3 shadow-sm dark:focus:border-violet-600 focus:border-violet-600 focus:outline-none focus:ring-violet-900 sm:text-sm transition-hover-300">
              </div>

              <div class="col-span-4 sm:col-span-2">
                <label for="last-name" class="block text-sm font-medium dark:text-gray-300 text-gray-700">Last name</label>
                <input type="text" name="last-name" id="last-name" class="mt-1 block w-full dark:bg-gray-900 rounded-md border dark:border-gray-500 border-gray-300 py-2 px-3 shadow-sm dark:focus:border-violet-600 focus:border-violet-600 focus:border-violet-600 focus:outline-none focus:ring-violet-900 sm:text-sm transition-hover-300">
              </div>
            </div>
          </div>
          <div class="dark:bg-gray-900 dark:border-t dark:border-gray-600 bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-hover-300">Save</button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>
