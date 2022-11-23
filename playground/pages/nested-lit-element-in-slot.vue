<template>
  <div>
    <my-element :name="name">
      <span slot="prepend">
        <my-element :name="name2" @my-event="handleNestedLitElementClick">
          <div slot="prepend">I am a Lit element within another Lit element</div>
        </my-element>
      </span>
    </my-element>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const name = ref('tiger')
const name2 = ref('tiger2')
function handleNestedLitElementClick () {
  alert('You clicked the nested Lit element!')
}
</script>
