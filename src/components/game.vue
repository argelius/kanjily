<style lang="stylus">
</style>

<template>
  <p>
    <sentence
      v-bind:japanese="sentence"
      v-bind:hidden="hidden"
      v-bind:index="currentCharacter"></sentence>
  </p>
  <kanji-input kanji="本"></kanji-input>
  <input type="number" v-model="currentCharacter">
</template>

<script>
  import Sentence from './sentence.vue';
  import KanjiInput from './kanji-input.vue';

  export default {
    data: function() {
      return {
        sentence: '東京に住んでいます。',
        hidden: [0, 1, 3],
        currentCharacter: 0
      };
    },

    components: {
      'kanji-input': KanjiInput,
      'sentence': Sentence
    }
  }
</script>
