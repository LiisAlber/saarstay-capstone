<template>
  <AdminHeader />

  <div class="">
    <div class="nav-bar flex space-x-4 bg-[#f2e1dd] shadow">
      <router-link to="/admin/dashboard" class="nav-link">{{ t('admin.dashboard') }}</router-link>
      <router-link to="/admin/bookings" class="nav-link">{{
        t('admin.manageBookings')
      }}</router-link>
      <router-link to="/admin/feedback" class="nav-link">{{
        t('admin.manageFeedback')
      }}</router-link>
    </div>

    <div class="rounded-lg bg-[#F7EBE9] p-4 shadow-lg">
      <div v-if="error" class="mb-4 rounded bg-red-100 p-3 font-semibold text-red-800">
        {{ t('admin.errorOccurred') }}
      </div>

      <!-- Sort and Filter  -->
      <div class="mb-4 flex justify-center">
        <div class="flex w-full max-w-4xl justify-center space-x-4 md:justify-end">
          <select
            v-model="currentFilter"
            class="rounded-lg border border-gray-300 bg-[#F7EBE9] p-2 text-sm text-[#4F6259] shadow outline-none focus:border-[#4F6259] focus:ring-[#4F6259]"
          >
            <option value="all">All</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
          </select>

          <select
            v-model="currentSort"
            class="rounded-lg border border-gray-300 bg-[#F7EBE9] p-2 text-sm text-[#4F6259] shadow outline-none focus:border-[#4F6259] focus:ring-[#4F6259]"
          >
            <option value="guestName_asc">Name (Ascending)</option>
            <option value="guestName_desc">Name (Descending)</option>
            <option value="checkInDate_asc">Check-In Date (Ascending)</option>
            <option value="checkInDate_desc">Check-In Date (Descending)</option>
          </select>
        </div>
      </div>

      <table class="mx-auto mb-4 w-full max-w-4xl divide-y overflow-hidden rounded-lg">
        <thead class="bg-[#FBF5F4]">
          <tr>
            <th style="width: 120px" class="text-l px-3 py-2 text-left font-bold text-[#4F6259]">
              Check-In Date
            </th>
            <th style="width: 120px" class="text-l px-3 py-2 text-left font-bold text-[#4F6259]">
              Check-Out Date
            </th>
            <th style="width: 200px" class="text-l px-3 py-2 text-left font-bold text-[#4F6259]">
              Guest Name
            </th>
            <th style="width: 120px" class="text-l px-3 py-2 text-left font-bold text-[#4F6259]">
              Contact Number
            </th>
            <th style="width: 120px" class="text-l px-3 py-2 text-left font-bold text-[#4F6259]">
              Number of Guests
            </th>
            <th style="width: 120px" class="text-l px-3 py-2 text-left font-bold text-[#4F6259]">
              Total Price
            </th>
            <th style="width: 120px" class="text-l px-3 py-2 text-left font-bold text-[#4F6259]">
              Status
            </th>
            <th
              style="width: 120px"
              class="text-l px-3 py-2 text-left font-bold text-[#4F6259]"
            ></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <BookingCard
            v-for="booking in bookingList"
            :key="booking.id"
            :booking="booking"
            :errorMessage="bookingErrorMessages[booking.id] || null"
            @confirm="confirmBooking(booking.id)"
            @cancel="cancelBooking(booking.id)"
            @select="selectBooking(booking)"
            class="font-sans"
          />
        </tbody>
      </table>

      <!-- Pagination Controls with Page Number Display -->
      <div class="pagination-controls flex items-center justify-center gap-4">
        <button
          @click="onPageChange(currentPage - 1)"
          :disabled="currentPage === 1"
          class="rounded-lg bg-[#EACDC7] px-4 py-2 text-sm font-medium text-[#4F6259] transition-colors duration-150 hover:bg-[#4F6259] hover:text-white"
        >
          Previous
        </button>
        <span class="text-sm font-medium text-[#4F6259]"
          >Page {{ currentPage }} of {{ totalPages }}</span
        >
        <button
          @click="onPageChange(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="rounded-lg bg-[#EACDC7] px-4 py-2 text-sm font-medium text-[#4F6259] transition-colors duration-150 hover:bg-[#4F6259] hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { trpc } from '@/trpc'
import type { Booking } from '@mono/server/src/shared/entities'
import { isLoggedIn } from '@/stores/user'
import BookingCard from '@/components/BookingCard.vue'
import { useI18n } from 'vue-i18n'
import AdminHeader from '@/components/AdminHeader.vue'

const bookingList = ref<Booking[] | null>(null)
const error = ref('')
const router = useRouter()
const loading = ref(false)
const selectedBooking = ref<Booking | null>(null)
const { t } = useI18n()

// Declare currentFilter and currentSort
const currentFilter = ref<string>('all') // default filter
const currentSort = ref<string>('date_asc')

const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const totalPages = ref<number>(0)

interface SafeBooking extends Booking {
  [key: string]: any;  // Adding index signature locally
}

// Define a ref for booking error messages
const bookingErrorMessages = ref<{ [key: number]: string }>({})

const checkAdminAuth = () => {
  if (!isLoggedIn.value) {
    router.push('/admin/login')
  }
}

const selectBooking = (booking: Booking): void => {
  selectedBooking.value = booking
}

const allBookings = ref<Booking[]>([])

const fetchBookings = async () => {
  loading.value = true;
  error.value = '';
  try {
    // Fetch all bookings without parameters
    const data = await trpc.bookings.admin.bookingView.query();
    if (!Array.isArray(data)) {
      console.error('Unexpected response structure:', data);
      error.value = 'Unexpected response structure';
      return;
    }

    // Apply client-side filtering and sorting
    allBookings.value = applyClientSideFiltersAndSorting(data, currentFilter.value, currentSort.value);
    totalPages.value = Math.ceil(allBookings.value.length / pageSize.value);
    applyPagination();
  } catch (e) {
    console.error('An error occurred while fetching bookings:', e);
    error.value = e instanceof Error ? e.message : 'An error occurred';
  } finally {
    loading.value = false;
  }
}

const confirmBooking = async (bookingId: number): Promise<void> => {
  try {
    await trpc.bookings.admin.confirmBooking.mutate({ bookingId })
    fetchBookings() // Refetch bookings
  } catch (e) {
    bookingErrorMessages.value[bookingId] =
      e instanceof Error ? e.message : 'Failed to confirm booking'
  }
}

const cancelBooking = async (bookingId: number): Promise<void> => {
  try {
    await trpc.bookings.admin.cancelBooking.mutate({ bookingId })
    fetchBookings() // Refetch bookings
  } catch (e) {
    bookingErrorMessages.value[bookingId] =
      e instanceof Error ? e.message : 'Failed to cancel booking'
  }
}

const applyPagination = () => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  bookingList.value = allBookings.value.slice(start, end)
}

const onPageChange = (newPage: number): void => {
  if (newPage > 0 && newPage <= totalPages.value) {
    currentPage.value = newPage
    applyPagination()
  }
}

const applyClientSideFiltersAndSorting = (
  bookings: Booking[],
  filter: string,
  sort: string
) => {
  return bookings
    .filter(booking => filter === 'all' || booking.status?.toLowerCase() === filter.toLowerCase())
    .sort((a, b) => {
      const [sortField, sortOrder] = sort.split('_');
      const mult = sortOrder === 'asc' ? 1 : -1;

      if (sortField.endsWith('Date')) {
        const dateA = new Date(a[sortField as keyof Booking] ?? 0);
        const dateB = new Date(b[sortField as keyof Booking] ?? 0);
        return mult * (dateA.getTime() - dateB.getTime());
      } else {
        // Safe number handling
        const valA = Number(a[sortField as keyof Booking]);
        const valB = Number(b[sortField as keyof Booking]);
        if (!isNaN(valA) && !isNaN(valB)) { // Ensure both values are valid numbers
          return mult * (valA - valB);
        }
      }
      return 0;
    });
};


const applyFiltersAndSort = async () => {
  let filtered = [...allBookings.value as SafeBooking[]];  // Cast to SafeBooking

  if (currentFilter.value !== 'all') {
    filtered = filtered.filter(
      booking => booking.status && booking.status.toLowerCase() === currentFilter.value.toLowerCase()
    );
  }

  // Sorting
  filtered.sort((a, b) => {
  const field = currentSort.value.split('_')[0]; 
  const order = currentSort.value.split('_')[1]; // 'asc' or 'desc'
  const mult = order === 'asc' ? 1 : -1;

  const valA = a[field as keyof Booking];
  const valB = b[field as keyof Booking];

  if (typeof valA === 'number' && typeof valB === 'number') {
    return mult * (valA - valB);
  } else if (typeof valA === 'string' && typeof valB === 'string') {
    return mult * valA.localeCompare(valB);
  }
  return 0;
});

  allBookings.value = filtered

  totalPages.value = Math.ceil(filtered.length / pageSize.value)
  applyPagination()
}

watch(
  currentFilter,
  async (newVal, oldVal) => {
    if (newVal !== oldVal) {
      await fetchBookings() // Refetch all bookings to reset state
      applyFiltersAndSort() // Reapply filters and sorting
    }
  },
  { immediate: true }
)

watch(
  currentSort,
  () => {
    applyFiltersAndSort()
  },
  { immediate: true }
)

onMounted(() => {
  checkAdminAuth() // Check authentication first
  fetchBookings() // Then fetch bookings
})
</script>

<style scoped>
th,
td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.link-style {
  color: #4f6259;
  font-weight: semi-bold;
  text-decoration: none;
}

.link-style:hover {
  text-decoration: underline;
}

.language-toggle-button {
  padding: 5px 10px;
  background-color: #eacdc7;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.language-toggle-button:hover {
  background-color: #d3b8ae;
}

.nav-bar {
  background-color: #f2e1dd; /* Different shade of pink */
  padding: 0.5em 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 60px;
  padding-left: 150px;
}

.nav-link {
  color: #4f6259;
  padding: 0.5em 1em;
  text-decoration: none;
  font-weight: bold;
}

.nav-link:not(:last-of-type) {
  border-right: 1px solid #ddd;
}

.nav-link:hover {
  background-color: #eed7d2; /* Lighter pink for hover */
}
</style>
