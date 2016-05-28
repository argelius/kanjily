<style lang="stylus">
  @import "global.styl"

  .swipeable-content
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    display flex

    > *
      width 100%
      flex-shrink 0

  .toolbar + .swipeable-content
    top $toolbar-height

  .toolbar + .tabs + .swipeable-content
    top $toolbar-height + $tabs-height

  .tabs + .swipeable-content
    top $tabs-height
</style>

<template>
  <div
    class="swipeable-content"
    v-bind:style="{
      transform: `translate3d(${translation}px, 0, 0)`
    }"
    v-touch:panstart="onPanStart()"
    v-touch:panend="onPanEnd()"
    v-touch:pancancel="onPanEnd()"
    v-touch:pan="onPan($event)">
    <slot></slot>
  </div>
</template>

<script>
  import raf from 'raf';

  export default {
    data: function() {
      return {
        translation: 0
      };
    },

    props: {
      index: {
        type: Number,
        default: 0
      }
    },

    ready: function() {
      this.translation = -this.getItemWidth() * this.index;
      this.previousItemWidth = this.getItemWidth();

      window.addEventListener('resize', this.onResize);
    },

    beforeDestroy: function() {
      window.removeEventListener('resize', this.onResize);
    },

    watch: {
      index: function(index) {
        this.setIndex(index);
      },

      translation: function() {
        this.$dispatch('translation', {
          translation: -this.translation,
          itemWidth: this.getItemWidth(),
          nbrOfItems: this.nbrOfItems
        });
      }
    },

    computed: {
      nbrOfItems: function() {
        return this.$el.children.length;
      }
    },

    methods: {
      getItemWidth: function() {
        return this.$el.children[0].offsetWidth;
      },

      onPanStart: function() {
        raf.cancel(this.animationHandle);
        this.originalTranslation = this.translation;
        console.log('start');
      },

      setIndex: function(index) {
        const target = -this.getItemWidth() * index;

        this.animateTo(target);
      },

      animateTo: function(target) {
        raf.cancel(this.animationHandle);

        const step = (target - this.translation) / 16;

        return new Promise((resolve) => {
          (function bounce() {
            if (step > 0) {
              this.translation = Math.min(target, this.translation + step);
            }
            else {
              this.translation = Math.max(target, this.translation + step);
            }

            if (target === this.translation) {
              return resolve();
            }

            this.animationHandle = raf(bounce.bind(this));
          }.bind(this))();
        });
      },

      getClosestBorder: function() {
        let target = this.getItemWidth() * Math.round(this.translation / this.getItemWidth());;

        // Bounce back if swiped outside.
        target = Math.min(0, target);
        target = Math.max(target, (1 - this.nbrOfItems) * this.getItemWidth());

        return target;
      },

      onResize: function() {
        this.translation = this.getItemWidth() * this.translation / this.previousItemWidth;
        this.previousItemWidth = this.getItemWidth();
      },

      onPanEnd: function() {
        let target = this.getClosestBorder();

        this.animateTo(target).then(
          () => {
            this.$dispatch('change', {
              index: -target / this.getItemWidth()
            });
          }
        );
      },

      onPan: function(e) {
        // Fixes bug where "panstart" is not triggered sometimes on Chrome.
        if (typeof this.originalTranslation === 'undefined') {
          this.originalTranslation = this.translation;
        }

        this.translation = this.originalTranslation + e.deltaX;
      }
    }
  };
</script>
