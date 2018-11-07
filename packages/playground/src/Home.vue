<template>
    <div>
      <quickey-context ref="qc" type="span" :global="true" :actions="actions">
        UDI TALIAS
      </quickey-context>
      <button @click="alert">
        Hello {{name}}
      </button>
    </div>
</template>

<script>
import { QuickeyContext } from "@quickey/vue";

export default {
  props: {
    name: {
      type: String
    }
  },
  methods: {
    alert() {
      alert(this.name);
    }
  },
  data: function() {
    return {
      actions: [
        {
          keys: "Ctrl + D",
          callback: () => {
            console.log(this.$refs.qc.addAction);
          }
        }
      ]
    };
  },
  components: {
    QuickeyContext
  }
};
</script>