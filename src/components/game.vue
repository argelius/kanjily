<style lang="stylus">
  @import "global.styl"

  .game
    display flex
    width 600px
    max-width calc(100% - 16px)
    box-sizing border-box
    flex-direction row
    flex-wrap wrap
    justify-content space-around
    margin 10px auto 0 auto
    material-shadow(1)
    padding 20px

  .game__input
  .game__word
    margin 8px 0

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

  <div class="game">
    <kanji-input v-bind:size="200" class="game__input" v-bind:kanji="kanji" v-bind:show-guide="showGuide"></kanji-input>
    <word class="game__word" v-bind:data="word" v-bind:index="index"></word>
  </div>
</template>

<script>
  import KanjiInput from './kanji-input.vue';
  import Word from './word.vue';
  import {Toolbar, ToolbarLeft, ToolbarCenter, ToolbarRight, ToolbarButton} from './toolbar';

  export default {
    data: function() {
      return {
        word: {
          japanese: '桜ん坊',
          english: 'Cherry',
          test: [0, 2],
          furigana: {
            0: 'さくら',
            2: 'ぼう'
          }
        },
        index: 0,
        errors: 0,
        showGuide: false
      };
    },

    computed: {
      kanji: function() {
        return this.word.japanese.charAt(this.word.test[this.index]);
      }
    },

    methods: {
      onFinish: function() {
        this.index++;
        this.errors = 0;
        this.showGuide = false;
      },

      onSuccess: function() {
        this.errors = 0;
      },

      onError: function() {
        this.errors++;

        if (this.errors === 5) {
          this.showGuide = true;
        }
      }
    },

    events: {
      'finish': 'onFinish',
      'error': 'onError',
      'success': 'onSuccess'
    },

    components: {
      'kanji-input': KanjiInput,
      'word': Word,
      'toolbar': Toolbar,
      'toolbar-left': ToolbarLeft,
      'toolbar-center': ToolbarCenter,
      'toolbar-right': ToolbarRight,
      'toolbar-button': ToolbarButton
    },
  };
</script>
