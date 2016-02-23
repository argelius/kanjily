<style lang="stylus">
</style>

<template>
  <p>
    <sentence
      v-bind:japanese="japanese"
      v-bind:kanjis="kanjis"
      v-bind:furigana="furigana"
      v-bind:index="index">
    </sentence>
  </p>
  <kanji-input v-bind:kanji="kanji"></kanji-input>
</template>

<script>
  import Sentence from './sentence.vue';
  import KanjiInput from './kanji-input.vue';

  export default {
    data: function() {
      return {
        japanese: '東京に住んでいます。',
        kanjis: [0, 1, 3],
        furigana: {
          0: 'とう',
          1: 'きょう',
          3: 'す'
        },
        index: 0
      };
    },

    computed: {
      kanji: function() {
        return this.japanese.charAt(this.kanjis[this.index]);
      }
    },

    components: {
      'kanji-input': KanjiInput,
      'sentence': Sentence
    },

    events: {
      'finish': function() {
        setTimeout(() => {
          this.index++;

          if (this.index === this.kanjis.length) {
            setTimeout(() => {
              this.index = 0;
            }, 1000);
          }
        }, 200);
      },
    }
  }
</script>
