<template>
  <ng-container v-if="!mobileView">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li
              class="nav-item"
              v-for="(contact, index) in menuItems"
              :key="index"
            >
              <ng-container v-if="!contact.isDropdown">
                <router-link :to="contact.link" class="nav-link">
                  <a
                    @click="mainMenuClick(index)"
                    :class="{ active: index == selectedMainMenuIndex }"
                    class="nav-link"
                    >{{ contact.text }}</a
                  >
                </router-link>
              </ng-container>
              <ng-container v-if="contact.isDropdown">
                <li class="nav-item dropdown">
                  <a
                    href="#"
                    class="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style="padding-top: 1rem !important; margin-left: 1rem"
                  >
                    {{ contact.text }}
                  </a>
                  <ul
                    class="dropdown-menu navbar-dark bg-dark"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <ng-container
                      v-for="(submenu, index) in contact.submenu"
                      :key="index"
                    >
                      <router-link :to="submenu.link" class="dropdown-item">
                        <li>
                          <a
                            @click="subMenuClick(index)"
                            :class="{ active: index == selectedSubMenuIndex }"
                            class="nav-link"
                            >{{ submenu.text }}</a
                          >
                        </li>
                      </router-link>
                    </ng-container>
                  </ul>
                </li>
              </ng-container>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </ng-container>
  <ng-container v-if="mobileView">
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav()"
        >&times;</a
      >
      <div v-if="showNav">
      <ng-container v-for="(contact, index) in menuItems" :key="index">
        <ng-container v-if="!contact.isDropdown">
          <router-link :to="contact.link" class="nav-link">
            <a
              @click="mainMenuClick(index)"
              :class="{ active: index == selectedMainMenuIndex }"
              class="nav-link"
              >{{ contact.text }}</a
            >
          </router-link>
        </ng-container>
        <ng-container v-if="contact.isDropdown">
           <ng-container
                      v-for="(submenu, index) in contact.submenu"
                      :key="index"
                    >
                      <router-link :to="submenu.link" class="nav-link">
                          <a
                            @click="subMenuClick(index)"
                            :class="{ active: index == selectedSubMenuIndex }"
                            class="nav-link"
                            >{{ submenu.text }}</a
                          >
                      </router-link>
                    </ng-container>
        </ng-container>
      </ng-container>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <span style="font-size: 30px;
    cursor: pointer;
    font-weight: bold;
    padding-left: 1rem;" @click="openNav()"
        >&#9776;</span
      >
    </nav>
  </ng-container>
</template>

<script>
export default {
  name: "NavigationComponent",
  props: {
     menuItems: {
      type: [Array, Object],
      default: () => []
    },
  },
  data() {
    return {
      showNav:false,
      mobileView: true,
      selectedMainMenuIndex: 0,
      selectedSubMenuIndex: -1,
    };
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    },
    openNav() {
      if (document.getElementById("mySidenav").style.width == "250px") {
        this.showNav=false;
        document.getElementById("mySidenav").style.width = "0";
      } else {
        document.getElementById("mySidenav").style.width = "250px";
        this.showNav=true;
      }
    },
    closeNav() {
      this.showNav=false;
      document.getElementById("mySidenav").style.width = "0";
    },
    mainMenuClick: function (index) {
      this.selectedMainMenuIndex = index;
      this.selectedSubMenuIndex = -1;
      return true;
    },
    subMenuClick: function (index) {
      this.selectedSubMenuIndex = index;
      return true;
    },
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
};
</script>

<style>
.dropdown-item .nav-link:hover {
  color: #000 !important;
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 5px 5px 8px 0px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 3.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>