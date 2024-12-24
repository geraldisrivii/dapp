<script setup lang="ts">
interface GlobalFooterForm {
  email: string;
}

const { handleSubmit, setFieldValue } = useForm<GlobalFooterForm>();

const { value: email } = useField<string>("email");

const onSubmit = handleSubmit((form) => {});
</script>
<template>
  <div class="footer bg-slate-50">
    <div class="container flex pt-[106px] justify-center items-center flex-col">
      <div class="flex items-center gap-2.5 mb-12">
        <p class="font-sherif text-4xl">freelance</p>
        <icon-wrapper>
          <icons-eth />
        </icon-wrapper>
      </div>
      <form class="mb-[110px] sm:w-[415px] w-full" @submit="onSubmit">
        <div class="relative">
          <common-input
            class="w-full"
            label="contact us"
            placeholder="email"
            v-model="email"
          >
            <common-button
              class="absolute top-0 right-0"
              type="submit"
              variant="rounded"
            >
              <span class="mr-3 text-white">subscribe </span>
              <icon-wrapper width="7" height="9" stroke="white">
                <icons-arrow />
              </icon-wrapper>
            </common-button>
          </common-input>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
