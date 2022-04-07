<template>
  <div id="navigation">
    <ul class="nav">
      <router-link tag="li" class="li-class" to="/">Home</router-link>
      <router-link tag="li" class="li-class" to="/login">Login</router-link>
      <router-link tag="li" class="li-class" to="/tranasction"
        >Transaction</router-link
      >
      <router-link tag="li" class="li-class" to="/balanceenquery"
        >Passbook</router-link
      >
      <router-link tag="li" class="li-class" to="/balancecheck"
        >Balance</router-link
      >
    </ul>
    <div class="search">
      <input
        type="text"
        placeholder="Search for articles, people or magazines"
      />
      <i class="fas fa-search"></i>
    </div>
    
    <div class="logo"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
#navigation {
  display: flex;
  width: 100%;
  margin-bottom: -120px;
}
ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 20px 0 0;
}
li {
  font-size: 2rem;
  padding: 2px 10px;
  cursor: pointer;
}
li:hover {
  color: #7ca971;
}

.li-class {
  font-size: 2rem;
  padding: 2px 10px;
  cursor: pointer;
  text-decoration: none;
  color: #613818;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.li-class:hover {
  color: #7ca971;
}

.search {
  position: relative;
  width: 154%;
  max-width: 525px;
}
.logo {
  position: relative;
  right: -60px;
  top: -22px;
  width: 100%;
  max-width: 265px;
  height: 160px;
  margin-bottom: 40px;
  background-size: cover;
  background-position: top;
  background-image: url("../../assets/logo_soumit.png");
}
input {
  border: none;
  outline: none;
  width: calc(100% - 80px);
  padding: 15px 60px 15px 20px;
  margin: 0;
  border-radius: 20px;
  background-color: #efefef;
  font-family: "Segoe UI", Tahoma;
  font-size: 1rem;
}

i {
  position: absolute;
  right: 88px;
  top: 15px;
  font-size: 1.6rem;
  color: #aaa;
  cursor: pointer;
}
</style>
