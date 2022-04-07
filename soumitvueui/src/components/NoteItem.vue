<template>
  <div :class="open ? 'note open' : 'note'">
    <div class="noteText">{{ note.note }}</div>
    <div class="date">{{ formatDate(note.date) }}</div>
  </div>
</template>
<script>
export default {
  name: "Note",
  props: ["note", "index", "open"],
  methods: {
    formatDate(date) {
      return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        new Date(date)
      );
    },
  },
};
</script>
<style lang="css" scoped>
.date {
  font-size: 0.7em;
  margin-top: 0.85rem;
}
</style>