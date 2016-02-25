<style lang="stylus">
</style>

<template>
  <toolbar>
    <toolbar-left>
      <toolbar-button icon="menu"></toolbar-button>
    </toolbar-left>
    <toolbar-center>
      Kanjily
    </toolbar-center>
    <toolbar-right>
      <toolbar-button icon="favorite"></toolbar-button>
      <toolbar-button icon="more_vert"></toolbar-button>
    </toolbar-right>
  </toolbar>

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
  import {Toolbar, ToolbarLeft, ToolbarCenter, ToolbarRight, ToolbarButton} from './toolbar';

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
      'sentence': Sentence,
      'toolbar': Toolbar,
      'toolbar-left': ToolbarLeft,
      'toolbar-center': ToolbarCenter,
      'toolbar-right': ToolbarRight,
      'toolbar-button': ToolbarButton
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
      }
    }
  };
</script>
