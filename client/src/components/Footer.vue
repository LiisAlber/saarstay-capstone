<template>
  <footer class="bg-[#4F6259] text-white">
    <div class="container mx-auto px-6 py-8">
      <div class="flex flex-col justify-between md:flex-row">
        <!-- Left Side Content -->
        <div class="mb-6 flex flex-col md:mb-0">
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
          <div class="mt-4 flex space-x-4">
            <i class="fab fa-facebook-f transition-colors hover:text-[#EACDC7]"></i>
            <i class="fab fa-instagram transition-colors hover:text-[#EACDC7]"></i>
          </div>
        </div>

        <!-- Center Logo -->
        <div class="mb-6 flex justify-center md:mb-0">
          <img
            src="https://stghbucket.s3.eu-north-1.amazonaws.com/logo/SAARstay+logo.png"
            alt="SAARstay Guesthouse Logo"
            class="h-16 w-auto"
          />
        </div>

        <!-- Right Side Content -->
        <div class="flex flex-col items-start md:items-end">
          <p class="my-2 block transition-colors hover:text-[#EACDC7]">
            {{ t('footer.privacyPolicy') }}
          </p>
          <p class="my-2 block transition-colors hover:text-[#EACDC7]">
            {{ t('footer.cancellationPolicy') }}
          </p>
          <p class="my-2 block transition-colors hover:text-[#EACDC7]">
            {{ t('footer.houseRules') }}
          </p>
          <p class="my-2 block transition-colors hover:text-[#EACDC7]">{{ t('footer.faqs') }}</p>
        </div>
      </div>
      <div class="mt-8 text-center text-sm">{{ t('footer.copyright') }}</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
