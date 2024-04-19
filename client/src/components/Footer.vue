<template>
  <footer class="bg-[#4F6259] py-8 text-[#F7EBE9]">
    <div class="container mx-auto px-6">
      <div
        class="grid grid-cols-1 text-left leading-loose md:grid-cols-4 md:grid-cols-4 md:gap-8 md:space-x-16 md:text-left"
      >
        <!-- About Us -->
        <div class="flex flex-col space-y-2">
          <h3 class="mb-2 text-lg font-semibold">{{ t('footer.aboutTitle') }}</h3>
          <p>{{ t('footer.aboutDescription') }}</p>
          <div class="mt-4 flex justify-center space-x-4 md:justify-start">
            <!-- Facebook Icon -->
            <i class="fa-brands fa-facebook-f cursor-pointer text-2xl hover:text-green-700"></i>
            <!-- Instagram Icon -->
            <i class="fa-brands fa-instagram cursor-pointer text-2xl hover:text-green-700"></i>
          </div>
        </div>

        <!-- Company Information -->
        <div class="flex flex-col space-y-2">
          <h3 class="mb-2 text-lg font-semibold">{{ t('footer.companyName') }}</h3>
          <p>{{ t('footer.phone') }}</p>
          <p>info@saarstay.ee</p>
          <p>{{ t('footer.address') }}</p>
          <a
            href="https://maps.google.com/?q=Pärna+35,+Kuressaare,+Estonia"
            target="_blank"
            class="mt-4 flex items-center space-x-1 text-[#f7ebe9] transition-colors hover:text-[#EACDC7]"
          >
            <i class="fas fa-map-marker-alt"></i>
            <span>{{ t('footer.viewOnGoogleMaps') }}</span>
          </a>
        </div>

        <!-- Useful Links -->
        <div class="flex flex-col">
          <a class="my-2 block transition-colors hover:text-[#EACDC7]">{{
            t('footer.privacyPolicy')
          }}</a>
          <a class="my-2 block transition-colors hover:text-[#EACDC7]">{{
            t('footer.cancellationPolicy')
          }}</a>
          <a class="my-2 block transition-colors hover:text-[#EACDC7]">{{
            t('footer.houseRules')
          }}</a>
          <a class="my-2 block transition-colors hover:text-[#EACDC7]">{{ t('footer.faqs') }}</a>
        </div>

        <!-- Logo and Name -->
        <div class="flex items-center justify-center md:justify-end">
          <img
            src="https://stghbucket.s3.eu-north-1.amazonaws.com/logo/Logo+l%C3%A4bipaistev.png"
            alt="SAARstay Guesthouse Logo"
            class="h-24 w-auto md:h-36"
          />
        </div>
      </div>
      <!-- Copyright Text -->
      <div class="mt-8 text-center text-sm">{{ t('footer.copyright') }}</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
