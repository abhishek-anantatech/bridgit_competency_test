<script setup lang="ts">
import { api } from '@/api';
import { useModal } from '@/composables/useModal';
import { useToast } from '@/composables/useToast';
import { ref } from 'vue';

const modal = useModal<boolean>();
const infoModal = useModal<{ isAboveAverage: boolean }>(); // New modal for loan info
const toast = useToast();
const isAboveAverage = ref<boolean | null>(null);

const formData = ref({
  applicantName: '',
  applicantEmail: '',
  applicantMobilePhoneNumber: '',
  applicantAddress: '',
  annualIncomeBeforeTax: 0,
  incomingAddress: '',
  incomingDeposit: 0,
  incomingPrice: 0,
  incomingStampDuty: 0,
  loanAmount: 0,
  loanDuration: 0,
  monthlyExpenses: 0,
  outgoingAddress: '',
  outgoingMortgage: 0,
  outgoingValuation: 0,
  savingsContribution: 0,
});

const submitApplication = async () => {
  const response = await api.applications.post({
    ...formData.value,
    loanDuration: parseInt(formData.value.loanDuration, 10) // Convert to integer
  });

  if (response.success) {
    toast.success('Application Saved Successfully.');
    toast.success(`Your loan amount is ${response.isAboveAverage ? "above" : "below"} the average.`)

    isAboveAverage.value = response.isAboveAverage;

    modal.confirm(false);
    infoModal.showModal();
  } else {
    toast.error('Error occurred while saving application');
  }

  // Reset form data
  Object.keys(formData.value).forEach(key => {
    if (typeof formData.value[key] === 'string') {
      formData.value[key] = '';
    } else {
      formData.value[key] = 0;
    }
  });
  modal.confirm(false);
};
</script>

<template>
  <div class="action-section">
    <BCard align-title="center" align-footer="center" align-content="center">
      <template #title>Submit loan application</template>
      <BSvgIcon name="dashboard-loan" />
      <template #footer>
        <BButton
          variant="primary"
          label="Submit application"
          icon-pos="right"
          icon="pi pi-chevron-right"
          @click="modal.showModal()"
        />
      </template>
    </BCard>

    <BModal :visible="modal.isVisible.value" :confirm="modal.confirm">
      <template #header>Submit loan application</template>

      <form @submit.prevent="submitApplication">
        <label for="applicant_name">Name</label>
        <BTextInput v-model="formData.applicantName" id="applicant_name" type="text" required />

        <label for="applicant_email">Email</label>
        <BTextInput v-model="formData.applicantEmail" id="applicant_email" type="email" required />

        <label for="applicant_mobile_phone_number">Mobile Phone Number</label>
        <BTextInput v-model="formData.applicantMobilePhoneNumber" id="applicant_mobile_phone_number" type="tel" required />

        <label for="applicant_address">Applicant Address</label>
        <BTextInput v-model="formData.applicantAddress" id="applicant_address" required />

        <label for="annual_income_before_tax">Annual Income Before Tax</label>
        <BNumberInput v-model="formData.annualIncomeBeforeTax" id="annual_income_before_tax" required />

        <label for="incoming_address">Incoming Address</label>
        <BTextInput v-model="formData.incomingAddress" id="incoming_address" required />

        <label for="incoming_deposit">Incoming Deposit</label>
        <BNumberInput v-model="formData.incomingDeposit" id="incoming_deposit" required />

        <label for="incoming_price">Incoming Price</label>
        <BNumberInput v-model="formData.incomingPrice" id="incoming_price" required />

        <label for="incoming_stamp_duty">Incoming Stamp Duty</label>
        <BNumberInput v-model="formData.incomingStampDuty" id="incoming_stamp_duty" required />

        <label for="loan_amount">Loan Amount</label>
        <BNumberInput v-model="formData.loanAmount" id="loan_amount" required />

        <label for="loan_duration">Loan Duration</label>
        <BNumberInput v-model="formData.loanDuration" id="loan_duration" required />

        <label for="monthly_expenses">Monthly Expenses</label>
        <BNumberInput v-model="formData.monthlyExpenses" id="monthly_expenses" required />

        <label for="outgoing_address">Outgoing Address</label>
        <BTextInput v-model="formData.outgoingAddress" id="outgoing_address" required />

        <label for="outgoing_mortgage">Outgoing Mortgage</label>
        <BNumberInput v-model="formData.outgoingMortgage" id="outgoing_mortgage" required />

        <label for="outgoing_valuation">Outgoing Valuation</label>
        <BNumberInput v-model="formData.outgoingValuation" id="outgoing_valuation" required />

        <label for="savings_contribution">Savings Contribution</label>
        <BNumberInput v-model="formData.savingsContribution" id="savings_contribution" required />

        <BButton type="submit" variant="primary" label="Submit"></BButton>
        <BButton label="Cancel" @click="modal.confirm(false)"></BButton>
      </form>
    </BModal>

    <!-- New modal for loan info -->
    <BModal :visible="infoModal.isVisible.value" >
      <template #header>Loan Information</template>
      <div>
        <p>Your loan amount is {{ isAboveAverage ? 'above' : 'below' }} the average.</p>
      </div>
      <BButton label="Close" @click="infoModal.confirm(false)"></BButton>
    </BModal>
  </div>
</template>

<style lang="scss" scoped>
.action-section {
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  align-items: stretch;
  container-type: inline-size;

  >* {
    flex: 1 1 100%;
  }

  @container (min-width: 900px) {
    >* {
      flex: 1 1 calc((100% - 2rem) / 3);
    }
  }
}

.b-card {
  height: 100%;
}

.b-icon {
  width: 5rem;
  height: 5rem;
}
</style>
