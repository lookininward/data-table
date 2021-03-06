<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="editPopoverTrigger"
    ref="edit-popover-trigger"
    class="btn btn--edit"
    :class="isEditing ? 'is-active' : ''"
    @click="isEditing = true"
    @shown="$refs.textareaField.focus({preventScroll:true})"
    @hidden="stopEditingField()"
    v-tippy="{
      reactive: true,
      interactive : true,
      trigger : 'click',
      placement: 'bottom',
      html: `#item-${item.id}`,
      theme : 'popover',
      duration: 100
    }"
  >
    Edit
    <div
      data-test-popover="editField"
      class="popover popover--standard"
      v-bind:id="`item-${item.id}`"
      v-tippy-html
    >
      <textarea
        data-test-input="textarea"
        ref="textareaField"
        class="edit-popover-textarea"
        v-model="newValue"
        rows=4
        maxlength="300"
      >
      </textarea>

      <div class="edit-popover-actions">
        <button
          data-test-btn="stopEditingField"
          class="btn"
          @click="stopEditingField()"
        >
          Cancel
        </button>
        <button
          data-test-btn="updateField"
          class="btn btn--confirm"
          @click="updateField()"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<!-- Script ------------------------------------------------------------------>
<script>
  import Vue from 'vue'
  import VueTippy from 'vue-tippy'
  import { mapActions } from 'vuex'

  export default {
    name: 'EditPopover',

    props: {
      item: Object,
      itemAttr: { type: [String, Number] }
    },

    data() {
      return {
        newValue: this.itemAttr,
        isEditing: false
      }
    },

    created() {
      Vue.use(VueTippy)
    },

    methods: {
      ...mapActions([
        'editItem'
      ]),

      updateField() {
        this.editItem({item : this.item, newValue: this.newValue})
        this.stopEditingField()
      },

      stopEditingField() {
        this.isEditing = false
        let popoverTrigger = this.$refs["edit-popover-trigger"]
        if (popoverTrigger._tippy) {
          popoverTrigger._tippy.hide()
        }
      }
    }
  }
</script>

<!-- Style ------------------------------------------------------------------->
<style scoped lang="scss">
  .edit-popover-textarea {
    @include fontStandard();
    border: none;
    margin-bottom: 10px;
    outline: 0;
  }

  .edit-popover-actions {
    @include flexCentered(row);

    .btn {
      margin: 0 5px;
      min-width: 50px;
    }
  }
</style>
