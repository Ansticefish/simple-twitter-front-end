<template>
   <div 
    class="spinner"
  >
    <img src="../assets/icons/Icon.png" alt=""> 
    <span>資料讀取中，請稍候...</span>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
}

</script>

<style lang="scss" scoped>
.spinner {
  position: fixed;
  z-index: 10;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-white;
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
}
</style>