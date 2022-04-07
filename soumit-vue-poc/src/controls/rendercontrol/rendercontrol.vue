<script>
import apiClient from "../../assets/js/services/EventService";
import { h, ref } from "vue";
export default {
  name: "renderControl",
  setup() {
    let inputValue = ref(0);
    let shows = ref(null);

    const searchText = async (search) => {
      if (!search) return;
      shows.value = [];
      apiClient.get(`/todos/${search}`).then((res) => {
        shows.value = [];
        shows.value.push(res.data);
      }).catch((error)=>{
        if(error.isAxiosError){
          //console.warn(error.message);
        }
      });
    };
    return () =>
      h(
        "form",
        {
          style:
            "color:black;font-weight:bold; max-width: 768px; margin: auto;",
          onSubmit: (event) => event.preventDefault(),
        },
        [
          h("div", "Render Control"),
          h("input", {
            onChange: (event) => {
              inputValue = event.target.value;
            },
          }),
          h(
            "button",
            {
              style: "color:green;",
              onClick: async () => {
                searchText(inputValue);
              },
            },
            "Hit Me!"
          ),
          h("div", { class: "shows" }, [
            shows.value?.map((show) => {
              return h("div", { class: "showItem" }, [
                h("div", show.title),
                h("div", show.completed),
                 h("div", show.userId + ' '+ show.id),
              ]);
            }),
          ]),
        ]
      );
  },
};
</script>

<style>
.showItem {
  margin: 10px;
  min-width: 210px;
}
.shows {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
}
</style>