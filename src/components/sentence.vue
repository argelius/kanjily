<style lang="stylus">
  .sentence
    user-select none

  .sentence__character
    margin 0 1px

  .sentence__character--hidden
    border-bottom 1px solid black
    color transparent

  .sentence__character--active
    animation blink-border 0.6s infinite

  @keyframes blink-border
    50%
      border-color transparent

</style>

<template>
  <div class="sentence">
    <span
      class="sentence__character"
      v-bind:class="{
        'sentence__character--hidden': hidden.indexOf($index) > -1 && $index >= index,
        'sentence__character--active': index == $index,
      }"
      v-for="character in characters"
      >{{ character }}</span>
  </div>
</template>

<script>
  export default {
    props: ['japanese', 'hidden', 'index'],

    computed: {
      characters: function() {
        return this.japanese.split('');
      }
    }
  }
</script>
