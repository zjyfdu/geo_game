<template>

<div id="info">
    <div id="buttons">
    <el-button type="danger" icon="el-icon-plus" circle @click="$emit('zoomIn')"></el-button>
    <el-button type="danger" icon="el-icon-minus" circle @click="$emit('zoomOut')"></el-button>
    <el-button type="primary" @click="$emit('restart')">下一题</el-button>
    <el-button type="success" @click="$emit('check')" :disabled="checkdisabled">确认</el-button>
    </div>
    <div id="description">
    <div v-for="(description, index) in descriptions" :key="index" class="text item">
        {{ description }}
    </div>
    <div id="score">
        <b>目前得分：{{ score }}</b>
    </div>
    </div>
</div>

</template>

<script>
export default {
  name: "mapNavigator",
  props: ["descriptions", "score", "checkdisabled"]
};
</script>

<style scoped>
#info {
  border: 1px solid grey;
  min-height: 130px;
  border-radius: 4px;
  /* z-index: 0; */
}
/* #info p {
  margin-bottom: 1px;
} */
#info #buttons,
#info #describe {
  margin: 10px;
}
</style>


