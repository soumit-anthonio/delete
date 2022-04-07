<template>
  <div>
    <h2>{{ headerText }}</h2>
    <DxDataGrid
      id="gridContainer"
      :customize-columns="customizeColumns"
      :data-source="gridDataSource"
      key-expr="id"
      :show-borders="true"
      @editor-preparing="editorPreparing"
    >
      <DxScrolling row-rendering-mode="virtual" />
      <DxPaging :page-size="10" />
      <DxPager
        :visible="true"
        :allowed-page-sizes="gridPageSizes"
        :display-mode="gridDisplayMode"
        :show-page-size-selector="showPageSizeSelector"
        :show-info="showInfo"
        :show-navigation-buttons="showNavButtons"
      />
      <DxEditing
        :allow-updating="false"
        :allow-deleting="true"
        :use-icons="true"
        mode="row"
      />

      <DxColumn data-field="id" caption="Id" />
      <DxColumn data-field="firstName" caption="First Name" />
      <DxColumn data-field="lastName" caption="Last Name" />
      <DxColumn data-field="Gender" caption="Sex" />
      <DxColumn data-field="dateOfBirth" caption="DOB" />
      <DxColumn type="buttons" :width="110">
        <DxButton icon="edit" @click="editIconClick"/>
        <DxButton icon="copy" @click="deleteIconClick"/>
        <!-- <DxButton
          hint="Clone"
          icon="copy"
          :visible="isCloneIconVisible"
          :disabled="isCloneIconDisabled"
          @click="cloneIconClick"
        /> -->
      </DxColumn>
      <!-- <DxColumn :width="130" data-field="Position" />
      <DxColumn :width="125" data-field="StateID" caption="State">
        <DxLookup :data-source="states" display-expr="Name" value-expr="ID" />
      </DxColumn>
      <DxColumn :width="125" data-field="BirthDate" data-type="date" /> -->
    </DxDataGrid>
    <!-- <div class="options">
      <div class="caption">Options</div>
      <div class="option-container">
        <div class="option">
          <DxSelectBox
            id="dispalyModes"
            :items="displayModes"
            display-expr="text"
            value-expr="value"
            v-model:value="displayMode"
          />
        </div>
        <div class="option">
          <DxCheckBox
            id="showPageSizes"
            text="Show Page Size Selector"
            v-model:value="showPageSizeSelector"
          />
        </div>
        <div class="option">
          <DxCheckBox
            id="showInfo"
            text="Show Info Text"
            :disabled="isCompactMode"
            v-model:value="showInfo"
          />
        </div>
        <div class="option">
          <DxCheckBox
            id="showNavButtons"
            text="Show Navigation Buttons"
            :disabled="isCompactMode"
            v-model:value="showNavButtons"
          />
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxScrolling,
  DxPager,
  DxPaging,
  DxEditing,
} from "devextreme-vue/data-grid";
// import DxSelectBox from "devextreme-vue/select-box";
// import DxCheckBox from "devextreme-vue/check-box";
import GridDisplayModeEnum from "../../assets/js/services/enums/grid-display-mode";
export default {
  name: "GridControl",
  components: {
    DxDataGrid,
    DxScrolling,
    DxPager,
    DxPaging,
    DxEditing,
    // DxCheckBox,
    // DxSelectBox,
  },
  props: {
    headerText: String,
    gridDisplayMode: {
      type: String,
      default: () => GridDisplayModeEnum.Full,
    },
    gridPageSizes: {
      type: [Array, Object],
      default: () => [5],
    },
    gridDataSource: {
      type: [Array, Object],
      default: () => [],
    },
  },
  data() {
    return {
      displayModes: [
        { text: "Display Mode 'full'", value: "full" },
        { text: "Display Mode 'compact'", value: "compact" },
      ],
      showPageSizeSelector: true,
      showInfo: true,
      showNavButtons: true,
    };
  },
  computed: {
    isCompactMode() {
      return this.displayMode === "compact";
    },
  },
  methods: {
    customizeColumns(columns) {
      columns[0].width = 70;
      //columns[columns.length - 1].width = 70;
    },
    editIconClick(e){
        alert(e);
    },
     deleteIconClick(e){
        alert(e);
    }
  },
};
</script>

<style>
</style>