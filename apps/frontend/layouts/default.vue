<template>
  <div class="default">
    <global-header />
    <slot />
    <global-footer />

    <lazy-client-only>
      <modal-container />
      <safe-teleport to="#modal-container">
        <plates-wallet-connect/>  
        <plates-choice-role/>  
      </safe-teleport>
    </lazy-client-only>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="sccs" scoped></style>
