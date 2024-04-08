<template>
  <footer class="bg-[#4F6259] text-[#F7EBE9] py-8">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 gap-4 leading-loose text-left md:text-left">
        <!-- About Us -->
        <div class="flex flex-col">
          <h3 class="mb-2 text-lg font-semibold">{{ t('footer.aboutTitle') }}</h3>
          <p>{{ t('footer.aboutDescription') }}</p>
          <div class="flex justify-center md:justify-start space-x-4 mt-4">
            <!-- Facebook Icon -->
            <i class="fa-brands fa-facebook-f text-2xl hover:text-green-700 cursor-pointer"></i>
            <!-- Instagram Icon -->
            <i class="fa-brands fa-instagram text-2xl hover:text-green-700 cursor-pointer"></i>
          </div>
              </div>

        <!-- Company Information -->
        <div class="flex flex-col">
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
          <a class="my-2 block transition-colors hover:text-[#EACDC7]">{{ t('footer.privacyPolicy') }}</a>
          <a class="my-2 block transition-colors hover:text-[#EACDC7]">{{ t('footer.cancellationPolicy') }}</a>
          <a class="my-2 block transition-colors hover:text-[#EACDC7]">{{ t('footer.houseRules') }}</a>
          <a class="my-2 block transition-colors hover:text-[#EACDC7]">{{ t('footer.faqs') }}</a>
        </div>

        <!-- Logo and Name -->
        <div class="flex items-center justify-center md:justify-end">
          <img
            src="https://stghbucket.s3.eu-north-1.amazonaws.com/logo/Logo+l%C3%A4bipaistev.png"
            alt="SAARstay Guesthouse Logo"
            class="h-24 md:h-36 w-auto"
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
