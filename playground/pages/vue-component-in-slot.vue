<template>
  <div>
    <my-element :name="name">
      <span slot="prepend">
        <SimpleMessage message="I am a vue component as a slot in a Lit element" />
      </span>
    </my-element>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const name = ref("tiger");
</script>
