<style lang="stylus">
  @import "global.styl"

  .points
    &__value
      font-size 16px
      transition transform 0.6s ease-in-out
      transform scale(1.0)

      &--active
        transform scale(1.4)

</style>

<template>
  <div class="points">
    <div class="points__value"
          v-bind:class="{ 'points__value--active': isActive }">
      {{ show }}
    </div>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        show: 0
      };
    },

    props: {
      value: {
        type: Number,
        default: 0
      }
    },

    computed: {
      isActive: function() {
        return this.show < this.value;
      }
    },

    beforeCompile: function() {
      this.interval = setInterval(() => {
        const diff = this.value - this.show;

        let step = 37;

        if (diff > 1000) {
          step = 359;
        }

        this.show = Math.min(this.value, this.show + step);
      }, 50);
    },

    beforeDestroy: function() {
      clearInterval(this.interval);
    }
  };
</script>
