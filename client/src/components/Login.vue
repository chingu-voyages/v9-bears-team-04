<template>
  <div class="login">  
    <div class="form">
      <input type="email" class="form-control" v-model="email" placeholder="Email">
      <input type="password" class="form-control" v-model="password" placeholder="Password">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email:'',
      password:''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .form{
    display: flex;
    justify-content: center;
  }
  .form input{
    flex: 0 1 100%; 
  }

  .form-control{
    display: block;
    width: 100%;
    padding: 0.875rem 1.375rem;
    font-size: 1rem;
    line-height: 1;
    color: #495057;
    background-color: #ffffff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 2px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
</style>
