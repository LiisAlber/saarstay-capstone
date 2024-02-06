<template>
  <footer class="bg-[#4F6259] text-white">
    <div class="container mx-auto px-6 py-8">
      <div class="flex flex-col justify-between md:flex-row">
        <!-- Left Side Content -->
        <div class="mb-6 flex flex-col md:mb-0">
          <h3 class="mb-2 text-lg font-semibold">SaarstayGH OÜ</h3>
          <p>+372 55 555 555</p>
          <p>info@saarstay.ee</p>
          <p>Pärna 35, Kuressaare, Estonia</p>
          <a
            href="https://maps.google.com/?q=Pärna+35,+Kuressaare,+Estonia"
            target="_blank"
            class="mt-4 flex items-center space-x-1 text-[#f7ebe9] transition-colors hover:text-[#EACDC7]"
          >
            <i class="fas fa-map-marker-alt"></i>
            <span>View on Google Maps</span>
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
          <p class="my-2 block transition-colors hover:text-[#EACDC7]">Privacy policy</p>
          <p class="my-2 block transition-colors hover:text-[#EACDC7]">Cancellation policy</p>
          <p class="my-2 block transition-colors hover:text-[#EACDC7]">House rules</p>
          <p class="my-2 block transition-colors hover:text-[#EACDC7]">FAQs</p>
        </div>
      </div>
      <div class="mt-8 text-center text-sm">© 2024 SAARstay. All rights reserved.</div>
    </div>
  </footer>
</template>
